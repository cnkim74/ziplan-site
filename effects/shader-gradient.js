/* ZIPLAN · 움직이는 그라데이션 (shadergradient.co 느낌을 의존성 없이)
   WebGL 프래그먼트 셰이더 하나: 세 가지 색을 노이즈로 섞은 물결치는 면(plane / waterPlane) + 3D 조명 + 필름 그레인.
   사용: new ShaderGradient(canvas, { colors:['#0b1026','#2a3f8f','#9fc5ff'], speed:.35, strength:1.2, density:1.1, frequency:1.6, amplitude:1, grain:.06, tilt:.55, light:.9 })
   화면 밖이면 멈추고, prefers-reduced-motion이면 한 프레임만 그린다. */
(function () {
  'use strict';
  var VS = 'attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}';
  var FS = [
    'precision highp float;',
    'uniform vec2 uRes;uniform float uTime;uniform vec3 uC1,uC2,uC3;uniform float uStr,uDen,uFreq,uAmp,uGrain,uTilt,uLight,uSat;',
    'vec3 hash3(vec3 p){p=vec3(dot(p,vec3(127.1,311.7,74.7)),dot(p,vec3(269.5,183.3,246.1)),dot(p,vec3(113.5,271.9,124.6)));return -1.+2.*fract(sin(p)*43758.5453123);}',
    'float noise(vec3 p){vec3 i=floor(p);vec3 f=fract(p);vec3 u=f*f*(3.-2.*f);',
    ' return mix(mix(mix(dot(hash3(i+vec3(0,0,0)),f-vec3(0,0,0)),dot(hash3(i+vec3(1,0,0)),f-vec3(1,0,0)),u.x),mix(dot(hash3(i+vec3(0,1,0)),f-vec3(0,1,0)),dot(hash3(i+vec3(1,1,0)),f-vec3(1,1,0)),u.x),u.y),',
    ' mix(mix(dot(hash3(i+vec3(0,0,1)),f-vec3(0,0,1)),dot(hash3(i+vec3(1,0,1)),f-vec3(1,0,1)),u.x),mix(dot(hash3(i+vec3(0,1,1)),f-vec3(0,1,1)),dot(hash3(i+vec3(1,1,1)),f-vec3(1,1,1)),u.x),u.y),u.z);}',
    'float fbm(vec3 p){float v=0.,a=.6;for(int i=0;i<3;i++){v+=a*noise(p);p=p*1.9+vec3(1.7,9.2,0.);a*=.42;}return v;}',
    'float hgt(vec2 q,float t){return fbm(vec3(q*uFreq,t))*uAmp;}',
    'float grain(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}',
    'void main(){',
    ' vec2 uv=gl_FragCoord.xy/uRes; float ar=uRes.x/uRes.y;',
    ' // 기울어진 면: 위로 갈수록 멀어지며 좁아진다 (waterPlane)',
    ' float persp=1.+uTilt*(uv.y);',
    ' vec2 q=vec2((uv.x-.5)*ar*persp, (uv.y-.35)*(1.+uTilt*1.6))*uDen;',
    ' float t=uTime;',
    ' float h=hgt(q,t);',
    ' float e=.035; float hx=hgt(q+vec2(e,0.),t)-h, hy=hgt(q+vec2(0.,e),t)-h;',
    ' vec3 n=normalize(vec3(-hx*uStr*2.6, -hy*uStr*2.6, 1.));',
    ' vec3 L=normalize(vec3(-.45,.6,.65)); float dif=clamp(dot(n,L),0.,1.);',
    ' vec3 V=vec3(0.,0.,1.); vec3 H=normalize(L+V); float spec=pow(clamp(dot(n,H),0.,1.),40.);',
    ' // 세 색: 높이와 두 번째 노이즈로 섞는다',
    ' float m1=smoothstep(-.35,.45,h*uStr+fbm(vec3(q*.7+3.1,t*.6))*.35);',
    ' float m2=smoothstep(.15,.95,fbm(vec3(q*1.3-5.2,t*.8+2.))*uStr+ (uv.y-.5)*.6);',
    ' vec3 col=mix(uC1,uC2,m1); col=mix(col,uC3,m2*.9);',
    ' col*= .78+.4*dif*uLight; col+= spec*.12*uLight;',
    ' float lum=dot(col,vec3(.299,.587,.114)); col=mix(vec3(lum),col,uSat);',
    ' col+= (grain(uv*uRes*.5+fract(t))-.5)*uGrain;',
    ' gl_FragColor=vec4(col,1.);}'
  ].join('\n');
  function hex(c) { var s = c.replace('#', ''); if (s.length === 3) s = s.replace(/(.)/g, '$1$1'); var n = parseInt(s, 16); return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]; }
  function ShaderGradient(canvas, opts) {
    this.c = canvas; this.o = Object.assign({ colors: ['#0b1026', '#2a3f8f', '#9fc5ff'], speed: .3, strength: 1.2, density: 1.1, frequency: 1.6, amplitude: 1, grain: .06, tilt: .55, light: .9, sat: 1, maxWidth: 1280, scale: 1 }, opts || {});
    var gl = this.gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' }) || canvas.getContext('experimental-webgl');
    if (!gl) { this.ok = false; return; }
    var prog = gl.createProgram();
    var sh = function (type, src) { var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn('[shader-gradient]', gl.getShaderInfoLog(s)); return null; } return s; };
    var v = sh(gl.VERTEX_SHADER, VS), f = sh(gl.FRAGMENT_SHADER, FS); if (!v || !f) { this.ok = false; return; }
    gl.attachShader(prog, v); gl.attachShader(prog, f); gl.linkProgram(prog); gl.useProgram(prog); this.prog = prog;
    var buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    var a = gl.getAttribLocation(prog, 'a'); gl.enableVertexAttribArray(a); gl.vertexAttribPointer(a, 2, gl.FLOAT, false, 0, 0);
    this.u = {}; ['uRes', 'uTime', 'uC1', 'uC2', 'uC3', 'uStr', 'uDen', 'uFreq', 'uAmp', 'uGrain', 'uTilt', 'uLight', 'uSat'].forEach(function (n) { this.u[n] = gl.getUniformLocation(prog, n); }, this);
    this.ok = true; this.t0 = performance.now(); this.visible = true; this.raf = 0; this.rm = matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.apply(); this.resize();
    var self = this;
    if ('IntersectionObserver' in window) { new IntersectionObserver(function (es) { es.forEach(function (e) { self.visible = e.isIntersecting; if (self.visible) self.start(); }); }, { threshold: 0 }).observe(canvas); }
    window.addEventListener('resize', function () { self.resize(); if (self.rm) self.frame(); });
    this.start();
  }
  ShaderGradient.prototype.apply = function () { var gl = this.gl, o = this.o, u = this.u; gl.useProgram(this.prog); var c = o.colors.map(hex);
    gl.uniform3fv(u.uC1, c[0]); gl.uniform3fv(u.uC2, c[1]); gl.uniform3fv(u.uC3, c[2]); gl.uniform1f(u.uStr, o.strength); gl.uniform1f(u.uDen, o.density); gl.uniform1f(u.uFreq, o.frequency); gl.uniform1f(u.uAmp, o.amplitude); gl.uniform1f(u.uGrain, o.grain); gl.uniform1f(u.uTilt, o.tilt); gl.uniform1f(u.uLight, o.light); gl.uniform1f(u.uSat, o.sat); };
  ShaderGradient.prototype.set = function (opts) { Object.assign(this.o, opts); this.apply(); if (this.rm) this.frame(); };
  ShaderGradient.prototype.resize = function () { var r = this.c.getBoundingClientRect(); var s = Math.min(1, this.o.maxWidth / Math.max(1, r.width)) * this.o.scale; var w = Math.max(2, Math.round(r.width * s)), h = Math.max(2, Math.round(r.height * s)); if (this.c.width !== w || this.c.height !== h) { this.c.width = w; this.c.height = h; this.gl.viewport(0, 0, w, h); } this.gl.uniform2f(this.u.uRes, w, h); };
  ShaderGradient.prototype.frame = function () { var gl = this.gl; gl.uniform1f(this.u.uTime, (performance.now() - this.t0) / 1000 * this.o.speed); gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); };
  ShaderGradient.prototype.start = function () { var self = this; if (!this.ok) return; if (this.rm) { this.frame(); return; } if (this.raf) return; var loop = function () { self.raf = 0; if (!self.visible || document.hidden) return; self.frame(); self.raf = requestAnimationFrame(loop); }; this.raf = requestAnimationFrame(loop); };
  document.addEventListener('visibilitychange', function () { if (!document.hidden) (ShaderGradient.all || []).forEach(function (g) { g.start(); }); });
  ShaderGradient.all = [];
  ShaderGradient.mount = function (el, opts) { var cv = document.createElement('canvas'); cv.className = 'sgbg'; cv.setAttribute('aria-hidden', 'true'); el.insertBefore(cv, el.firstChild); var g = new ShaderGradient(cv, opts); if (g.ok) ShaderGradient.all.push(g); else cv.remove(); return g; };
  window.ShaderGradient = ShaderGradient;
})();
