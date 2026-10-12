/* ZIPLAN · 상단 내비게이션 유리 패널
   liquid-glass-js(vendor/liquid-glass/container.js)의 Container를 상속해서
   (1) 페이지를 축소 캡처해 GPU 텍스처 한계(4096px) 안에 넣고, 셰이더의 크기 유니폼만 CSS 픽셀로 되돌려 좌표를 맞추며
   (2) 화면(해시)이 바뀌거나 창 크기가 바뀌면 다시 캡처하고
   (3) WebGL·캡처가 안 되면 원래 CSS 블러 글래스로 조용히 돌아갑니다.
   라이브러리 파일은 수정하지 않습니다. 움직임은 스크롤에 따른 굴절뿐이라 prefers-reduced-motion에서도 그대로 둡니다. */
(function () {
  'use strict';
  if (typeof Container !== 'function' || typeof html2canvas !== 'function') {
    console.warn('[nav-glass] liquid-glass-js 또는 html2canvas가 로드되지 않아 CSS 글래스를 유지합니다.');
    return;
  }
  var nav = document.querySelector('nav');
  if (!nav) return;

  var probe = document.createElement('canvas');
  var probeGl = probe.getContext('webgl') || probe.getContext('experimental-webgl');
  if (!probeGl) { console.warn('[nav-glass] WebGL을 쓸 수 없어 CSS 글래스를 유지합니다.'); return; }
  var MAX_TEX = Math.min(probeGl.getParameter(probeGl.MAX_TEXTURE_SIZE) || 4096, 4096); // 메모리·구형 폰 고려 상한

  function pageSize() {
    var d = document.documentElement, b = document.body;
    return { w: Math.max(d.scrollWidth, b.scrollWidth, d.clientWidth), h: Math.max(d.scrollHeight, b.scrollHeight) };
  }

  class NavGlass extends Container {
    capturePageSnapshot() { this.capture(false); }

    // 캡처: 처음(initial=true)엔 라이브러리 흐름대로 initWebGL, 그 뒤엔 텍스처만 교체
    capture(refresh) {
      var self = this;
      var ps = pageSize();
      // 아주 긴 화면(홈: 스크롤 장면들)은 캡처 비용이 커서 CSS 글래스로 둔다 — 짧은 방에서만 WebGL 패널
      if (ps.h > 9000) { Container.isCapturing = false; nav.classList.remove('lg-on'); return; }
      var scale = Math.min(1, MAX_TEX / ps.h, MAX_TEX / ps.w);
      this.cssSize = { w: ps.w, h: ps.h };
      var seq = ++NavGlass.seq;
      html2canvas(document.body, {
        scale: scale,
        useCORS: true,
        allowTaint: true,
        backgroundColor: getComputedStyle(document.body).backgroundColor || '#ffffff',
        ignoreElements: function (el) {
          return el === nav || el.classList.contains('glass-container') ||
                 el.classList.contains('glass-button') || el.classList.contains('glass-button-text');
        }
      }).then(function (snapshot) {
        if (seq !== NavGlass.seq) return; // 더 새로운 캡처가 진행 중이면 버림
        Container.pageSnapshot = snapshot;
        Container.isCapturing = false;
        if (refresh && self.webglInitialized) { self.replaceTexture(snapshot); return; }
        var waiting = Container.waitingForSnapshot.slice();
        Container.waitingForSnapshot = [];
        waiting.forEach(function (c) { if (!c.webglInitialized) c.initWebGL(); });
      }).catch(function (err) {
        console.warn('[nav-glass] 캡처 실패, CSS 글래스로 돌아갑니다:', err && err.message);
        Container.isCapturing = false;
        Container.waitingForSnapshot = [];
        // 처음부터 실패면 패널을 걷어내고, 재캡처 실패면 CSS 글래스로 두었다가 다음 화면에서 다시 시도
        if (refresh && self.webglInitialized) nav.classList.remove('lg-on'); else self.teardown();
      });
    }

    // 라이브러리 setupShader 뒤에 u_textureSize를 CSS 픽셀 크기로 되돌림 (축소 캡처 보정)
    setupShader(image) {
      super.setupShader(image);
      this.fixTextureSize();
      if (this.gl_refs.gl) { nav.classList.add('lg-on'); this.render(); }
    }
    fixTextureSize() {
      var r = this.gl_refs; if (!r.gl || !this.cssSize) return;
      r.gl.uniform2f(r.textureSizeLoc, this.cssSize.w, this.cssSize.h);
    }
    replaceTexture(snapshot) {
      var self = this, r = this.gl_refs; if (!r.gl) return;
      var img = new Image();
      img.onload = function () {
        var gl = r.gl;
        gl.bindTexture(gl.TEXTURE_2D, r.texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        self.fixTextureSize();
        var ph = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        gl.uniform1f(r.pageHeightLoc, ph);
        gl.uniform1f(r.viewportHeightLoc, window.innerHeight);
        self.render();
        nav.classList.add('lg-on'); // 새 캡처가 준비되면 다시 WebGL 패널로
      };
      img.src = snapshot.toDataURL();
    }
    // 다시 캡처하는 동안은 옛 화면이 비치지 않도록 CSS 글래스로 잠깐 돌아감
    refresh() { if (this.webglInitialized) nav.classList.remove('lg-on'); this.capture(true); }
    teardown() {
      nav.classList.remove('lg-on');
      if (this.element && this.element.parentNode) this.element.parentNode.removeChild(this.element);
      this.gl_refs = {};
    }
  }
  NavGlass.seq = 0;

  // 라이브러리가 setupShader 때 읽는 전역 설정 — 바에는 굴절·물결을 약하게, 흐림은 조금 강하게 (글자 가독성)
  window.glassControls = Object.assign({
    edgeIntensity: 0.006, rimIntensity: 0.03, baseIntensity: 0.005,
    edgeDistance: 0.15, rimDistance: 0.8, baseDistance: 0.1,
    cornerBoost: 0.001, rippleEffect: 0.02, blurRadius: 9
  }, window.glassControls || {});

  var glass = null;
  function create() {
    if (glass) return;
    glass = new NavGlass({ type: 'rounded', borderRadius: 1, tintOpacity: 0.3 });
    glass.element.classList.add('nav-glass');
    glass.element.setAttribute('aria-hidden', 'true');
    nav.insertBefore(glass.element, nav.firstChild);
    glass.updateSizeFromDOM();

    // 화면(해시)이 바뀌면 그 화면을 다시 캡처 — 라우터가 뷰를 바꾸고 scrollTo를 끝낸 뒤
    window.addEventListener('hashchange', function () { setTimeout(function () { glass.refresh(); }, 350); });
    // 창 크기 변경: 패널 크기 갱신 + 다시 캡처 (디바운스)
    var t = 0;
    window.addEventListener('resize', function () {
      glass.updateSizeFromDOM();
      clearTimeout(t); t = setTimeout(function () { glass.refresh(); }, 500);
    });
    // 시스템 라이트/다크 전환: 배경색이 바뀌므로 다시 캡처
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () { setTimeout(function () { glass.refresh(); }, 100); });
  }
  // 폰트·마크 등장 애니메이션이 끝난 뒤 한 번 생성
  if (document.readyState === 'complete') setTimeout(create, 900);
  else window.addEventListener('load', function () { setTimeout(create, 900); });
})();
