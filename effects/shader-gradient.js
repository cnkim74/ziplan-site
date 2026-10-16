/* ZIPLAN · ShaderGradient 바닐라 포트 (의존성 없음, WebGL 1)
   원본: ruucm/shadergradient (MIT, © ruucm & stone-skipper) — packages/shadergradient/src/shaders/defaults/{plane,waterPlane,sphere}
   원본은 React Three Fiber + three.js(≈700KB)가 필요해서 한 파일짜리 사이트에는 무겁다.
   그래서 셰이더 수식(클래식 펄린 노이즈로 면을 법선 방향으로 밀고, x축으로 색1→색2, 높이 z로 색3을 섞음)과
   카메라 규칙(camera-controls: 원점을 바라보는 방위각·고도각·거리, fov 45)을 그대로 옮겨 적었다.
   같은 프리셋 값(shadergradient.co/customize 의 URL 파라미터)을 넣으면 같은 그림이 나온다.

   사용:
     ShaderGradient.mount(el, { ...ShaderGradient.presets.halo, color1:'#ff5005', color2:'#dbba95', color3:'#d0bce1' })
     g.set({ cAzimuthAngle: 200, rotationZ: 30 })    // 스크롤에 맞춰 카메라·면을 돌리기
   옵션(원본 이름 그대로): type plane|waterPlane|sphere, color1..3, uDensity, uStrength, uSpeed, uTime,
     cAzimuthAngle, cPolarAngle, cDistance, cameraZoom, fov, positionX/Y/Z, rotationX/Y/Z(도),
     brightness, grain on|off, reflection, pixelDensity, animate on|off
   추가: background '#rrggbb' | 'transparent'(면 밖은 투명 → 어두운 바탕에 떠 있는 판처럼), maxWidth, segments
   화면 밖이면 멈추고, prefers-reduced-motion이면 한 프레임만 그린다. */
(function () {
  'use strict';
  var NOISE = [
    'vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}',
    'vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}',
    'vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}',
    'vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}',
    'vec3 fade(vec3 t){return t*t*t*(t*(t*6.-15.)+10.);}',
    'float cnoise(vec3 P){',
    ' vec3 Pi0=floor(P); vec3 Pi1=Pi0+vec3(1.); Pi0=mod289(Pi0); Pi1=mod289(Pi1);',
    ' vec3 Pf0=fract(P); vec3 Pf1=Pf0-vec3(1.);',
    ' vec4 ix=vec4(Pi0.x,Pi1.x,Pi0.x,Pi1.x); vec4 iy=vec4(Pi0.yy,Pi1.yy); vec4 iz0=Pi0.zzzz; vec4 iz1=Pi1.zzzz;',
    ' vec4 ixy=permute(permute(ix)+iy); vec4 ixy0=permute(ixy+iz0); vec4 ixy1=permute(ixy+iz1);',
    ' vec4 gx0=ixy0*(1./7.); vec4 gy0=fract(floor(gx0)*(1./7.))-.5; gx0=fract(gx0); vec4 gz0=vec4(.5)-abs(gx0)-abs(gy0); vec4 sz0=step(gz0,vec4(0.)); gx0-=sz0*(step(0.,gx0)-.5); gy0-=sz0*(step(0.,gy0)-.5);',
    ' vec4 gx1=ixy1*(1./7.); vec4 gy1=fract(floor(gx1)*(1./7.))-.5; gx1=fract(gx1); vec4 gz1=vec4(.5)-abs(gx1)-abs(gy1); vec4 sz1=step(gz1,vec4(0.)); gx1-=sz1*(step(0.,gx1)-.5); gy1-=sz1*(step(0.,gy1)-.5);',
    ' vec3 g000=vec3(gx0.x,gy0.x,gz0.x); vec3 g100=vec3(gx0.y,gy0.y,gz0.y); vec3 g010=vec3(gx0.z,gy0.z,gz0.z); vec3 g110=vec3(gx0.w,gy0.w,gz0.w);',
    ' vec3 g001=vec3(gx1.x,gy1.x,gz1.x); vec3 g101=vec3(gx1.y,gy1.y,gz1.y); vec3 g011=vec3(gx1.z,gy1.z,gz1.z); vec3 g111=vec3(gx1.w,gy1.w,gz1.w);',
    ' vec4 norm0=taylorInvSqrt(vec4(dot(g000,g000),dot(g010,g010),dot(g100,g100),dot(g110,g110))); g000*=norm0.x; g010*=norm0.y; g100*=norm0.z; g110*=norm0.w;',
    ' vec4 norm1=taylorInvSqrt(vec4(dot(g001,g001),dot(g011,g011),dot(g101,g101),dot(g111,g111))); g001*=norm1.x; g011*=norm1.y; g101*=norm1.z; g111*=norm1.w;',
    ' float n000=dot(g000,Pf0); float n100=dot(g100,vec3(Pf1.x,Pf0.yz)); float n010=dot(g010,vec3(Pf0.x,Pf1.y,Pf0.z)); float n110=dot(g110,vec3(Pf1.xy,Pf0.z));',
    ' float n001=dot(g001,vec3(Pf0.xy,Pf1.z)); float n101=dot(g101,vec3(Pf1.x,Pf0.y,Pf1.z)); float n011=dot(g011,vec3(Pf0.x,Pf1.yz)); float n111=dot(g111,Pf1);',
    ' vec3 f=fade(Pf0); vec4 n_z=mix(vec4(n000,n100,n010,n110),vec4(n001,n101,n011,n111),f.z); vec2 n_yz=mix(n_z.xy,n_z.zw,f.y); return 2.2*mix(n_yz.x,n_yz.y,f.x);}'
  ].join('\n');
  var VS = [
    'attribute vec3 position; attribute vec3 normal; attribute vec3 tangent;',
    'uniform mat4 uMVP; uniform mat4 uModel; uniform vec3 uEye;',
    'uniform float uTime,uSpeed,uDensity,uStrength;',
    'varying vec3 vPos; varying vec3 vN; varying vec3 vV;',
    NOISE,
    'vec3 disp(vec3 p, vec3 n, float t){ return p + n*(0.75*cnoise(0.43*p*uDensity + t))*uStrength; }',
    'void main(){ float t=uTime*uSpeed;',
    ' vec3 pos=disp(position,normal,t); vPos=pos;',
    ' // 변형 뒤의 법선: 접선 방향으로 조금 떨어진 점 두 개로 (반사광·림라이트용)',
    ' vec3 b=cross(normal,tangent); float e=0.05;',
    ' vec3 px=disp(position+tangent*e,normal,t); vec3 py=disp(position+b*e,normal,t);',
    ' vec3 n=normalize(cross(px-pos,py-pos)); vN=mat3(uModel)*n;',
    ' vec4 w=uModel*vec4(pos,1.); vV=uEye-w.xyz;',
    ' gl_Position=uMVP*vec4(pos,1.);}'
  ].join('\n');
  var FS = [
    'precision highp float;',
    'varying vec3 vPos; varying vec3 vN; varying vec3 vV;',
    'uniform vec3 uC1,uC2,uC3; uniform float uBright,uGrain,uRefl,uT;',
    'float hash(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}',
    'void main(){',
    ' // 원본 그대로: x축으로 색1→색2, 변형 높이 z로 색3 (mix는 z>1에서 바깥으로 뻗어 하이라이트가 하얗게 타는 것이 특징)',
    ' vec3 col=mix(mix(uC1,uC2,smoothstep(-3.,3.,vPos.x)),uC3,vPos.z);',
    ' // MeshPhysicalMaterial(금속성 .2, 거칠기 .9) + ambient(brightness·π) 를 한 줄로',
    ' col=(0.78*col+0.05)*uBright;',
    ' vec3 n=normalize(vN); if(!gl_FrontFacing) n=-n; vec3 v=normalize(vV);',
    ' float fres=pow(1.-max(dot(n,v),0.),3.); vec3 L=normalize(vec3(.35,.8,.5)); vec3 h=normalize(L+v); float spec=pow(max(dot(n,h),0.),28.);',
    ' col+=(fres*.22+spec*.55)*uRefl;',
    ' col+=(hash(gl_FragCoord.xy+fract(uT)*37.)-.5)*uGrain;',
    ' gl_FragColor=vec4(clamp(col,0.,1.),1.);}'
  ].join('\n');

  function hex(c) { var s = String(c).replace('#', ''); if (s.length === 3) s = s.replace(/(.)/g, '$1$1'); var n = parseInt(s, 16); return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]; }
  var D2R = Math.PI / 180;
  // ---- 작은 행렬 도구 (column-major, three.js와 같은 규약) ----
  function m4() { return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]); }
  function mul(a, b) { var o = new Float32Array(16); for (var i = 0; i < 4; i++) for (var j = 0; j < 4; j++) { var s = 0; for (var k = 0; k < 4; k++) s += a[k * 4 + i] * b[j * 4 + k]; o[j * 4 + i] = s; } return o; }
  function rotX(a) { var c = Math.cos(a), s = Math.sin(a), m = m4(); m[5] = c; m[6] = s; m[9] = -s; m[10] = c; return m; }
  function rotY(a) { var c = Math.cos(a), s = Math.sin(a), m = m4(); m[0] = c; m[2] = -s; m[8] = s; m[10] = c; return m; }
  function rotZ(a) { var c = Math.cos(a), s = Math.sin(a), m = m4(); m[0] = c; m[1] = s; m[4] = -s; m[5] = c; return m; }
  function trans(x, y, z) { var m = m4(); m[12] = x; m[13] = y; m[14] = z; return m; }
  function persp(fov, aspect, near, far, zoom) { var top = near * Math.tan(fov * D2R / 2) / (zoom || 1), h = 2 * top, w = aspect * h, left = -w / 2; var m = new Float32Array(16); m[0] = 2 * near / w; m[5] = 2 * near / h; m[8] = (left + w + left) / w; m[9] = (top + (top - h)) / h; m[10] = -(far + near) / (far - near); m[11] = -1; m[14] = -2 * far * near / (far - near); return m; }
  function lookAt(eye, target, up) { var zx = eye[0] - target[0], zy = eye[1] - target[1], zz = eye[2] - target[2]; var l = Math.hypot(zx, zy, zz) || 1; zx /= l; zy /= l; zz /= l;
    var xx = up[1] * zz - up[2] * zy, xy = up[2] * zx - up[0] * zz, xz = up[0] * zy - up[1] * zx; l = Math.hypot(xx, xy, xz); if (l < 1e-6) { xx = 1; xy = 0; xz = 0; l = 1; } xx /= l; xy /= l; xz /= l;
    var yx = zy * xz - zz * xy, yy = zz * xx - zx * xz, yz = zx * xy - zy * xx;
    var m = new Float32Array(16); m[0] = xx; m[1] = yx; m[2] = zx; m[4] = xy; m[5] = yy; m[6] = zy; m[8] = xz; m[9] = yz; m[10] = zz;
    m[12] = -(xx * eye[0] + xy * eye[1] + xz * eye[2]); m[13] = -(yx * eye[0] + yy * eye[1] + yz * eye[2]); m[14] = -(zx * eye[0] + zy * eye[1] + zz * eye[2]); m[15] = 1; return m; }

  // ---- 지오메트리: three.js PlaneGeometry(10,10,sx,sy) / 구는 UV sphere(반지름 1) ----
  function planeGeo(sx, sy) { var P = [], N = [], T = [], I = []; for (var iy = 0; iy <= sy; iy++) { var y = 5 - iy * 10 / sy; for (var ix = 0; ix <= sx; ix++) { var x = -5 + ix * 10 / sx; P.push(x, y, 0); N.push(0, 0, 1); T.push(1, 0, 0); } }
    for (var j = 0; j < sy; j++) for (var i = 0; i < sx; i++) { var a = i + (sx + 1) * j, b = i + (sx + 1) * (j + 1), c = (i + 1) + (sx + 1) * (j + 1), d = (i + 1) + (sx + 1) * j; I.push(a, b, d, b, c, d); }
    return { P: P, N: N, T: T, I: I }; }
  function sphereGeo(seg) { var P = [], N = [], T = [], I = []; for (var iy = 0; iy <= seg; iy++) { var v = iy / seg, th = v * Math.PI; for (var ix = 0; ix <= seg; ix++) { var u = ix / seg, ph = u * Math.PI * 2; var x = -Math.cos(ph) * Math.sin(th), y = Math.cos(th), z = Math.sin(ph) * Math.sin(th); P.push(x, y, z); N.push(x, y, z); T.push(Math.sin(ph), 0, Math.cos(ph)); } }
    for (var j = 0; j < seg; j++) for (var i = 0; i < seg; i++) { var a = i + (seg + 1) * j, b = i + (seg + 1) * (j + 1), c = (i + 1) + (seg + 1) * (j + 1), d = (i + 1) + (seg + 1) * j; I.push(a, b, d, b, c, d); }
    return { P: P, N: N, T: T, I: I }; }

  var DEF = { type: 'plane', color1: '#ff5005', color2: '#dbba95', color3: '#d0bce1', uDensity: 1.3, uStrength: 4, uSpeed: 0.4, uTime: 0,
    cAzimuthAngle: 180, cPolarAngle: 90, cDistance: 3.6, cameraZoom: 1, fov: 45,
    positionX: -1.4, positionY: 0, positionZ: 0, rotationX: 0, rotationY: 10, rotationZ: 50,
    brightness: 1.2, grain: 'on', reflection: 0.1, pixelDensity: 1, animate: 'on',
    background: 'transparent', maxWidth: 1400, segments: 0 };

  // shadergradient.co/customize?… URL → 옵션 (숫자는 숫자로)
  function parseURL(u) { var o = {}; var q = String(u).indexOf('?'); if (q < 0) return o; String(u).slice(q + 1).split('&').forEach(function (kv) { var p = kv.split('='); if (!p[0]) return; var v = decodeURIComponent((p[1] || '').replace(/\+/g, ' ')); if (v === '') return; var n = Number(v); o[p[0]] = isNaN(n) ? v : n; }); return o; }
  function ShaderGradient(canvas, opts) {
    opts = opts || {}; this.c = canvas; this.o = Object.assign({}, DEF, opts.url ? parseURL(opts.url) : {}, opts); delete this.o.url; if (this.o.bg !== undefined) this.o.background = this.o.bg; if (window.ZLITE) { this.o.maxWidth = Math.min(this.o.maxWidth || 1400, 720); this.o.pixelDensity = Math.min(this.o.pixelDensity || 1, 1); }
    var transparent = this.o.background === 'transparent';
    var gl = this.gl = canvas.getContext('webgl', { antialias: true, alpha: transparent, premultipliedAlpha: true, powerPreference: 'low-power' }) || canvas.getContext('experimental-webgl', { alpha: transparent });
    if (!gl) { this.ok = false; return; }
    var prog = gl.createProgram();
    var sh = function (type, src) { var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn('[shader-gradient]', gl.getShaderInfoLog(s)); return null; } return s; };
    var v = sh(gl.VERTEX_SHADER, VS), f = sh(gl.FRAGMENT_SHADER, FS); if (!v || !f) { this.ok = false; return; }
    gl.attachShader(prog, v); gl.attachShader(prog, f); gl.bindAttribLocation(prog, 0, 'position'); gl.bindAttribLocation(prog, 1, 'normal'); gl.bindAttribLocation(prog, 2, 'tangent'); gl.linkProgram(prog); gl.useProgram(prog); this.prog = prog;
    this.u = {}; ['uMVP', 'uModel', 'uEye', 'uTime', 'uSpeed', 'uDensity', 'uStrength', 'uC1', 'uC2', 'uC3', 'uBright', 'uGrain', 'uRefl', 'uT'].forEach(function (n) { this.u[n] = gl.getUniformLocation(prog, n); }, this);
    this.bufP = gl.createBuffer(); this.bufN = gl.createBuffer(); this.bufT = gl.createBuffer(); this.bufI = gl.createBuffer();
    gl.enable(gl.DEPTH_TEST); gl.disable(gl.CULL_FACE);
    this.ok = true; this.t0 = performance.now(); this.visible = true; this.raf = 0; this.rm = matchMedia('(prefers-reduced-motion: reduce)').matches; this.pausedAt = 0;
    this.geoType = null; this.buildGeo(); this.apply(); this.resize();
    var self = this;
    if ('IntersectionObserver' in window) { new IntersectionObserver(function (es) { es.forEach(function (e) { self.visible = e.isIntersecting; if (self.visible) self.start(); }); }, { threshold: 0 }).observe(canvas); }
    if ('ResizeObserver' in window) { new ResizeObserver(function () { self.resize(); if (self.rm || self.o.animate !== 'on') self.frame(); }).observe(canvas); }
    else window.addEventListener('resize', function () { self.resize(); if (self.rm) self.frame(); });
    this.start();
  }
  ShaderGradient.prototype.buildGeo = function () { var o = this.o, gl = this.gl; if (this.geoType === o.type + o.segments) return; this.geoType = o.type + o.segments;
    var n = o.segments || 192, g = o.type === 'sphere' ? sphereGeo(Math.min(n, 128)) : o.type === 'plane' ? planeGeo(1, n) : planeGeo(n, n);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.bufP); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(g.P), gl.STATIC_DRAW); gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.bufN); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(g.N), gl.STATIC_DRAW); gl.enableVertexAttribArray(1); gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.bufT); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(g.T), gl.STATIC_DRAW); gl.enableVertexAttribArray(2); gl.vertexAttribPointer(2, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufI); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(g.I), gl.STATIC_DRAW); this.count = g.I.length; };
  ShaderGradient.prototype.apply = function () { var gl = this.gl, o = this.o, u = this.u; gl.useProgram(this.prog);
    gl.uniform3fv(u.uC1, hex(o.color1)); gl.uniform3fv(u.uC2, hex(o.color2)); gl.uniform3fv(u.uC3, hex(o.color3));
    gl.uniform1f(u.uSpeed, +o.uSpeed); gl.uniform1f(u.uDensity, +o.uDensity); gl.uniform1f(u.uStrength, +o.uStrength);
    gl.uniform1f(u.uBright, +o.brightness); gl.uniform1f(u.uGrain, (o.grain === 'off' || o.grain === false ? 0 : (typeof o.grain === 'number' ? o.grain : 0.07)) * (o.grainMix === undefined ? 1 : +o.grainMix)); gl.uniform1f(u.uRefl, +o.reflection);
    if (o.background !== 'transparent') { var b = hex(o.background); gl.clearColor(b[0], b[1], b[2], 1); } else gl.clearColor(0, 0, 0, 0);
    this.camDirty = true; };
  ShaderGradient.prototype.camera = function () { var o = this.o, gl = this.gl, w = this.c.width, h = this.c.height;
    var az = o.cAzimuthAngle * D2R, po = o.cPolarAngle * D2R, d = o.type === 'sphere' ? 14 : o.cDistance; // camera-controls: 구는 거리 14 고정 + zoom, 면은 거리로 조절
    var eye = [d * Math.sin(po) * Math.sin(az), d * Math.cos(po), d * Math.sin(po) * Math.cos(az)];
    var V = lookAt(eye, [0, 0, 0], [0, 1, 0]);
    var P = persp(o.fov, w / h, 0.1, 1000, o.type === 'sphere' ? o.cameraZoom : 1);
    var M = mul(trans(o.positionX, o.positionY, o.positionZ), mul(rotX(o.rotationX * D2R), mul(rotY(o.rotationY * D2R), rotZ(o.rotationZ * D2R)))); // three Euler 'XYZ'
    gl.uniformMatrix4fv(this.u.uMVP, false, mul(P, mul(V, M))); gl.uniformMatrix4fv(this.u.uModel, false, M); gl.uniform3fv(this.u.uEye, eye); this.camDirty = false; };
  ShaderGradient.prototype.set = function (opts) { var o = this.o; if (opts && opts.url) { opts = Object.assign({}, parseURL(opts.url), opts); delete opts.url; } var geo = opts.type !== undefined && opts.type !== o.type || opts.segments !== undefined && opts.segments !== o.segments; Object.assign(o, opts); if (geo) this.buildGeo(); this.apply(); if (this.rm || o.animate !== 'on') this.frame(); else this.start(); };
  ShaderGradient.prototype.resize = function () { var r = this.c.getBoundingClientRect(); var s = Math.min(window.devicePixelRatio || 1, this.o.pixelDensity) * Math.min(1, this.o.maxWidth / Math.max(1, r.width)); var w = Math.max(2, Math.round(r.width * s)), h = Math.max(2, Math.round(r.height * s)); if (this.c.width !== w || this.c.height !== h) { this.c.width = w; this.c.height = h; this.gl.viewport(0, 0, w, h); this.camDirty = true; } };
  ShaderGradient.prototype.time = function () { return this.o.uTime + (this.o.animate === 'on' ? (performance.now() - this.t0) / 1000 : 0); };
  ShaderGradient.prototype.frame = function () { var gl = this.gl; if (this.camDirty) this.camera(); var t = this.time(); gl.uniform1f(this.u.uTime, t); gl.uniform1f(this.u.uT, t); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); gl.drawElements(gl.TRIANGLES, this.count, gl.UNSIGNED_SHORT, 0); };
  ShaderGradient.prototype.start = function () { var self = this; if (!this.ok) return; if (this.rm || this.o.animate !== 'on') { this.frame(); return; } if (this.raf) return; var last = 0, gap = window.ZLITE ? 33 : 0; var loop = function (now) { self.raf = 0; if (!self.visible || document.hidden) return; if (!gap || !now || now - last >= gap) { last = now || 0; self.frame(); } self.raf = requestAnimationFrame(loop); }; this.raf = requestAnimationFrame(loop); };
  ShaderGradient.prototype.stop = function () { if (this.raf) cancelAnimationFrame(this.raf); this.raf = 0; };
  document.addEventListener('visibilitychange', function () { if (!document.hidden) ShaderGradient.all.forEach(function (g) { g.start(); }); });
  ShaderGradient.all = [];
  ShaderGradient.mount = function (el, opts) { var cv = document.createElement('canvas'); cv.className = 'sgbg'; cv.setAttribute('aria-hidden', 'true'); el.insertBefore(cv, el.firstChild); var g = new ShaderGradient(cv, opts); if (g.ok) ShaderGradient.all.push(g); else cv.remove(); return g; };
  // shadergradient.co 의 프리셋 (원본 presets.ts). 색만 바꿔 쓰면 분위기는 그대로 온다.
  ShaderGradient.presets = {
    halo: { type: 'plane', color1: '#ff5005', color2: '#dbba95', color3: '#d0bce1', uDensity: 1.3, uStrength: 4, uSpeed: 0.4, cAzimuthAngle: 180, cPolarAngle: 90, cDistance: 3.6, positionX: -1.4, positionY: 0, positionZ: 0, rotationX: 0, rotationY: 10, rotationZ: 50, brightness: 1.2, grain: 'on', reflection: 0.1 },
    mint: { type: 'waterPlane', color1: '#94ffd1', color2: '#6bf5ff', color3: '#ffffff', uDensity: 1.2, uStrength: 3.4, uSpeed: 0.2, cAzimuthAngle: 170, cPolarAngle: 70, cDistance: 4.4, positionX: 0, positionY: 0.9, positionZ: -0.3, rotationX: 45, rotationY: 0, rotationZ: 0, brightness: 1.2, grain: 'off', reflection: 0.1 },
    nighty: { type: 'waterPlane', color1: '#606080', color2: '#8d7dca', color3: '#212121', uDensity: 1.5, uStrength: 1.5, uSpeed: 0.3, cAzimuthAngle: 180, cPolarAngle: 80, cDistance: 2.8, positionX: 0, positionY: 0, positionZ: 0, rotationX: 50, rotationY: 0, rotationZ: -60, brightness: 1, grain: 'on', reflection: 0.1 },
    universe: { type: 'waterPlane', color1: '#5606ff', color2: '#fe8989', color3: '#000000', uDensity: 1.1, uStrength: 2.4, uSpeed: 0.1, cAzimuthAngle: 180, cPolarAngle: 115, cDistance: 3.9, positionX: -0.5, positionY: 0.1, positionZ: 0, rotationX: 0, rotationY: 0, rotationZ: 235, brightness: 1.1, grain: 'off', reflection: 0.1 },
    mandarin: { type: 'waterPlane', color1: '#ff6a1a', color2: '#c73c00', color3: '#FD4912', uDensity: 1.8, uStrength: 3, uSpeed: 0.2, cAzimuthAngle: 180, cPolarAngle: 95, cDistance: 2.4, positionX: 0, positionY: -2.1, positionZ: 0, rotationX: 0, rotationY: 0, rotationZ: 225, brightness: 1.2, grain: 'off', reflection: 0.1 },
    cottonCandy: { type: 'waterPlane', color1: '#ebedff', color2: '#f3f2f8', color3: '#dbf8ff', uDensity: 1, uStrength: 3, uSpeed: 0.3, cAzimuthAngle: 180, cPolarAngle: 120, cDistance: 2.9, positionX: 0, positionY: 1.8, positionZ: 0, rotationX: 0, rotationY: 0, rotationZ: -90, brightness: 1.2, grain: 'off', reflection: 0.1 },
    pensive: { type: 'sphere', color1: '#809bd6', color2: '#910aff', color3: '#af38ff', uDensity: 0.8, uStrength: 0.4, uSpeed: 0.3, cAzimuthAngle: 250, cPolarAngle: 140, cameraZoom: 12.5, positionX: 0, positionY: 0, positionZ: 0, rotationX: 0, rotationY: 0, rotationZ: 140, brightness: 1.5, grain: 'on', reflection: 0.5 }
  };
  // 두 옵션 사이를 섞는다 (숫자·#색 보간, 그 외는 t<.5면 a) — 스크롤에 따라 카메라·색을 옮길 때
  ShaderGradient.lerp = function (a, b, t) { var o = {}; Object.keys(b).forEach(function (k) { var x = a[k], y = b[k]; if (typeof y === 'number' && typeof x === 'number') o[k] = x + (y - x) * t; else if (typeof y === 'string' && /^#/.test(y) && typeof x === 'string' && /^#/.test(x)) { var p = hex(x), q = hex(y); o[k] = '#' + [0, 1, 2].map(function (i) { var v = Math.round((p[i] + (q[i] - p[i]) * t) * 255); return ('0' + v.toString(16)).slice(-2); }).join(''); } else o[k] = t < .5 ? x : y; }); return o; };
  ShaderGradient.parseURL = parseURL; ShaderGradient.DEFAULTS = DEF;
  window.ShaderGradient = ShaderGradient;
})();
