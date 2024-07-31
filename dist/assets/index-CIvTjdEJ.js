var Hg=Object.defineProperty;var Vg=(r,e,t)=>e in r?Hg(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var Ii=(r,e,t)=>(Vg(r,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();function mp(r,e,t){return Math.max(r,Math.min(e,t))}class Gg{advance(e){var a;if(!this.isRunning)return;let t=!1;if(this.lerp)this.value=(n=this.value,i=this.to,s=60*this.lerp,o=e,function(l,u,h){return(1-h)*l+h*u}(n,i,1-Math.exp(-s*o))),Math.round(this.value)===this.to&&(this.value=this.to,t=!0);else{this.currentTime+=e;const l=mp(0,this.currentTime/this.duration,1);t=l>=1;const u=t?1:this.easing(l);this.value=this.from+(this.to-this.from)*u}var n,i,s,o;(a=this.onUpdate)==null||a.call(this,this.value,t),t&&this.stop()}stop(){this.isRunning=!1}fromTo(e,t,{lerp:n=.1,duration:i=1,easing:s=l=>l,onStart:o,onUpdate:a}){this.from=this.value=e,this.to=t,this.lerp=n,this.duration=i,this.easing=s,this.currentTime=0,this.isRunning=!0,o==null||o(),this.onUpdate=a}}class Wg{constructor({wrapper:e,content:t,autoResize:n=!0,debounce:i=250}={}){Ii(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});Ii(this,"onWrapperResize",()=>{this.wrapper===window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});Ii(this,"onContentResize",()=>{this.wrapper===window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)});this.wrapper=e,this.content=t,n&&(this.debouncedResize=function(s,o){let a;return function(){let l=arguments,u=this;clearTimeout(a),a=setTimeout(function(){s.apply(u,l)},o)}}(this.resize,i),this.wrapper===window?window.addEventListener("resize",this.debouncedResize,!1):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){var e,t;(e=this.wrapperResizeObserver)==null||e.disconnect(),(t=this.contentResizeObserver)==null||t.disconnect(),window.removeEventListener("resize",this.debouncedResize,!1)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}}class gp{constructor(){this.events={}}emit(e,...t){let n=this.events[e]||[];for(let i=0,s=n.length;i<s;i++)n[i](...t)}on(e,t){var n;return(n=this.events[e])!=null&&n.push(t)||(this.events[e]=[t]),()=>{var i;this.events[e]=(i=this.events[e])==null?void 0:i.filter(s=>t!==s)}}off(e,t){var n;this.events[e]=(n=this.events[e])==null?void 0:n.filter(i=>t!==i)}destroy(){this.events={}}}const Yh=100/6;class Xg{constructor(e,{wheelMultiplier:t=1,touchMultiplier:n=1}){Ii(this,"onTouchStart",e=>{const{clientX:t,clientY:n}=e.targetTouches?e.targetTouches[0]:e;this.touchStart.x=t,this.touchStart.y=n,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:e})});Ii(this,"onTouchMove",e=>{const{clientX:t,clientY:n}=e.targetTouches?e.targetTouches[0]:e,i=-(t-this.touchStart.x)*this.touchMultiplier,s=-(n-this.touchStart.y)*this.touchMultiplier;this.touchStart.x=t,this.touchStart.y=n,this.lastDelta={x:i,y:s},this.emitter.emit("scroll",{deltaX:i,deltaY:s,event:e})});Ii(this,"onTouchEnd",e=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:e})});Ii(this,"onWheel",e=>{let{deltaX:t,deltaY:n,deltaMode:i}=e;t*=i===1?Yh:i===2?this.windowWidth:1,n*=i===1?Yh:i===2?this.windowHeight:1,t*=this.wheelMultiplier,n*=this.wheelMultiplier,this.emitter.emit("scroll",{deltaX:t,deltaY:n,event:e})});Ii(this,"onWindowResize",()=>{this.windowWidth=window.innerWidth,this.windowHeight=window.innerHeight});this.element=e,this.wheelMultiplier=t,this.touchMultiplier=n,this.touchStart={x:null,y:null},this.emitter=new gp,window.addEventListener("resize",this.onWindowResize,!1),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,{passive:!1}),this.element.addEventListener("touchstart",this.onTouchStart,{passive:!1}),this.element.addEventListener("touchmove",this.onTouchMove,{passive:!1}),this.element.addEventListener("touchend",this.onTouchEnd,{passive:!1})}on(e,t){return this.emitter.on(e,t)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize,!1),this.element.removeEventListener("wheel",this.onWheel,{passive:!1}),this.element.removeEventListener("touchstart",this.onTouchStart,{passive:!1}),this.element.removeEventListener("touchmove",this.onTouchMove,{passive:!1}),this.element.removeEventListener("touchend",this.onTouchEnd,{passive:!1})}}class Yg{constructor({wrapper:e=window,content:t=document.documentElement,wheelEventsTarget:n=e,eventsTarget:i=n,smoothWheel:s=!0,syncTouch:o=!1,syncTouchLerp:a=.075,touchInertiaMultiplier:l=35,duration:u,easing:h=x=>Math.min(1,1.001-Math.pow(2,-10*x)),lerp:f=!u&&.1,infinite:d=!1,orientation:c="vertical",gestureOrientation:_="vertical",touchMultiplier:g=1,wheelMultiplier:p=1,autoResize:m=!0,__experimental__naiveDimensions:M=!1}={}){this.__isSmooth=!1,this.__isScrolling=!1,this.__isStopped=!1,this.__isLocked=!1,this.onVirtualScroll=({deltaX:x,deltaY:E,event:R})=>{if(R.ctrlKey)return;const A=R.type.includes("touch"),T=R.type.includes("wheel");if(this.options.syncTouch&&A&&R.type==="touchstart"&&!this.isStopped&&!this.isLocked)return void this.reset();const C=x===0&&E===0,S=this.options.gestureOrientation==="vertical"&&E===0||this.options.gestureOrientation==="horizontal"&&x===0;if(C||S)return;let v=R.composedPath();if(v=v.slice(0,v.indexOf(this.rootElement)),v.find(X=>{var K,ee,j,V,re;return((K=X.hasAttribute)===null||K===void 0?void 0:K.call(X,"data-lenis-prevent"))||A&&((ee=X.hasAttribute)===null||ee===void 0?void 0:ee.call(X,"data-lenis-prevent-touch"))||T&&((j=X.hasAttribute)===null||j===void 0?void 0:j.call(X,"data-lenis-prevent-wheel"))||((V=X.classList)===null||V===void 0?void 0:V.contains("lenis"))&&!(!((re=X.classList)===null||re===void 0)&&re.contains("lenis-stopped"))}))return;if(this.isStopped||this.isLocked)return void R.preventDefault();if(this.isSmooth=this.options.syncTouch&&A||this.options.smoothWheel&&T,!this.isSmooth)return this.isScrolling=!1,void this.animate.stop();R.preventDefault();let I=E;this.options.gestureOrientation==="both"?I=Math.abs(E)>Math.abs(x)?E:x:this.options.gestureOrientation==="horizontal"&&(I=x);const O=A&&this.options.syncTouch,L=A&&R.type==="touchend"&&Math.abs(I)>5;L&&(I=this.velocity*this.options.touchInertiaMultiplier),this.scrollTo(this.targetScroll+I,Object.assign({programmatic:!1},O?{lerp:L?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}))},this.onNativeScroll=()=>{if(!this.__preventNextScrollEvent&&!this.isScrolling){const x=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.velocity=0,this.direction=Math.sign(this.animatedScroll-x),this.emit()}},window.lenisVersion="1.0.42",e!==document.documentElement&&e!==document.body||(e=window),this.options={wrapper:e,content:t,wheelEventsTarget:n,eventsTarget:i,smoothWheel:s,syncTouch:o,syncTouchLerp:a,touchInertiaMultiplier:l,duration:u,easing:h,lerp:f,infinite:d,gestureOrientation:_,orientation:c,touchMultiplier:g,wheelMultiplier:p,autoResize:m,__experimental__naiveDimensions:M},this.animate=new Gg,this.emitter=new gp,this.dimensions=new Wg({wrapper:e,content:t,autoResize:m}),this.toggleClassName("lenis",!0),this.velocity=0,this.isLocked=!1,this.isStopped=!1,this.isSmooth=o||s,this.isScrolling=!1,this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll,!1),this.virtualScroll=new Xg(i,{touchMultiplier:g,wheelMultiplier:p}),this.virtualScroll.on("scroll",this.onVirtualScroll)}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll,!1),this.virtualScroll.destroy(),this.dimensions.destroy(),this.toggleClassName("lenis",!1),this.toggleClassName("lenis-smooth",!1),this.toggleClassName("lenis-scrolling",!1),this.toggleClassName("lenis-stopped",!1),this.toggleClassName("lenis-locked",!1)}on(e,t){return this.emitter.on(e,t)}off(e,t){return this.emitter.off(e,t)}setScroll(e){this.isHorizontal?this.rootElement.scrollLeft=e:this.rootElement.scrollTop=e}resize(){this.dimensions.resize()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.velocity=0,this.animate.stop()}start(){this.isStopped&&(this.isStopped=!1,this.reset())}stop(){this.isStopped||(this.isStopped=!0,this.animate.stop(),this.reset())}raf(e){const t=e-(this.time||e);this.time=e,this.animate.advance(.001*t)}scrollTo(e,{offset:t=0,immediate:n=!1,lock:i=!1,duration:s=this.options.duration,easing:o=this.options.easing,lerp:a=!s&&this.options.lerp,onComplete:l,force:u=!1,programmatic:h=!0}={}){if(!this.isStopped&&!this.isLocked||u){if(["top","left","start"].includes(e))e=0;else if(["bottom","right","end"].includes(e))e=this.limit;else{let f;if(typeof e=="string"?f=document.querySelector(e):e!=null&&e.nodeType&&(f=e),f){if(this.options.wrapper!==window){const c=this.options.wrapper.getBoundingClientRect();t-=this.isHorizontal?c.left:c.top}const d=f.getBoundingClientRect();e=(this.isHorizontal?d.left:d.top)+this.animatedScroll}}if(typeof e=="number"){if(e+=t,e=Math.round(e),this.options.infinite?h&&(this.targetScroll=this.animatedScroll=this.scroll):e=mp(0,e,this.limit),n)return this.animatedScroll=this.targetScroll=e,this.setScroll(this.scroll),this.reset(),void(l==null||l(this));if(!h){if(e===this.targetScroll)return;this.targetScroll=e}this.animate.fromTo(this.animatedScroll,e,{duration:s,easing:o,lerp:a,onStart:()=>{i&&(this.isLocked=!0),this.isScrolling=!0},onUpdate:(f,d)=>{this.isScrolling=!0,this.velocity=f-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=f,this.setScroll(this.scroll),h&&(this.targetScroll=f),d||this.emit(),d&&(this.reset(),this.emit(),l==null||l(this),this.__preventNextScrollEvent=!0,requestAnimationFrame(()=>{delete this.__preventNextScrollEvent}))}})}}}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.__experimental__naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){return this.isHorizontal?this.rootElement.scrollLeft:this.rootElement.scrollTop}get scroll(){return this.options.infinite?(e=this.animatedScroll,t=this.limit,(e%t+t)%t):this.animatedScroll;var e,t}get progress(){return this.limit===0?1:this.scroll/this.limit}get isSmooth(){return this.__isSmooth}set isSmooth(e){this.__isSmooth!==e&&(this.__isSmooth=e,this.toggleClassName("lenis-smooth",e))}get isScrolling(){return this.__isScrolling}set isScrolling(e){this.__isScrolling!==e&&(this.__isScrolling=e,this.toggleClassName("lenis-scrolling",e))}get isStopped(){return this.__isStopped}set isStopped(e){this.__isStopped!==e&&(this.__isStopped=e,this.toggleClassName("lenis-stopped",e))}get isLocked(){return this.__isLocked}set isLocked(e){this.__isLocked!==e&&(this.__isLocked=e,this.toggleClassName("lenis-locked",e))}get className(){let e="lenis";return this.isStopped&&(e+=" lenis-stopped"),this.isLocked&&(e+=" lenis-locked"),this.isScrolling&&(e+=" lenis-scrolling"),this.isSmooth&&(e+=" lenis-smooth"),e}toggleClassName(e,t){this.rootElement.classList.toggle(e,t),this.emitter.emit("className change",this)}}function Gi(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function _p(r,e){r.prototype=Object.create(e.prototype),r.prototype.constructor=r,r.__proto__=e}/*!
 * GSAP 3.12.5
 * https://gsap.com
 *
 * @license Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Hn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Mo={duration:.5,overwrite:!1,delay:0},ah,un,Rt,ei=1e8,bt=1/ei,Eu=Math.PI*2,qg=Eu/4,$g=0,vp=Math.sqrt,Kg=Math.cos,jg=Math.sin,Jt=function(e){return typeof e=="string"},Dt=function(e){return typeof e=="function"},nr=function(e){return typeof e=="number"},lh=function(e){return typeof e>"u"},Di=function(e){return typeof e=="object"},wn=function(e){return e!==!1},ch=function(){return typeof window<"u"},Wa=function(e){return Dt(e)||Jt(e)},xp=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},hn=Array.isArray,Tu=/(?:-?\.?\d|\.)+/gi,yp=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,so=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Mc=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Sp=/[+-]=-?[.\d]+/,Mp=/[^,'"\[\]\s]+/gi,Zg=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Pt,vi,bu,uh,Gn={},Vl={},Ep,Tp=function(e){return(Vl=ys(e,Gn))&&Ln},hh=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},Ma=function(e,t){return!t&&console.warn(e)},bp=function(e,t){return e&&(Gn[e]=t)&&Vl&&(Vl[e]=t)||Gn},Ea=function(){return 0},Jg={suppressEvents:!0,isStart:!0,kill:!1},Cl={suppressEvents:!0,kill:!1},Qg={suppressEvents:!0},fh={},Ar=[],wu={},wp,On={},Ec={},qh=30,Pl=[],dh="",ph=function(e){var t=e[0],n,i;if(Di(t)||Dt(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(i=Pl.length;i--&&!Pl[i].targetTest(t););n=Pl[i]}for(i=e.length;i--;)e[i]&&(e[i]._gsap||(e[i]._gsap=new jp(e[i],n)))||e.splice(i,1);return e},hs=function(e){return e._gsap||ph(ti(e))[0]._gsap},Ap=function(e,t,n){return(n=e[t])&&Dt(n)?e[t]():lh(n)&&e.getAttribute&&e.getAttribute(t)||n},An=function(e,t){return(e=e.split(",")).forEach(t)||e},Nt=function(e){return Math.round(e*1e5)/1e5||0},Zt=function(e){return Math.round(e*1e7)/1e7||0},co=function(e,t){var n=t.charAt(0),i=parseFloat(t.substr(2));return e=parseFloat(e),n==="+"?e+i:n==="-"?e-i:n==="*"?e*i:e/i},e_=function(e,t){for(var n=t.length,i=0;e.indexOf(t[i])<0&&++i<n;);return i<n},Gl=function(){var e=Ar.length,t=Ar.slice(0),n,i;for(wu={},Ar.length=0,n=0;n<e;n++)i=t[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},Rp=function(e,t,n,i){Ar.length&&!un&&Gl(),e.render(t,n,un&&t<0&&(e._initted||e._startAt)),Ar.length&&!un&&Gl()},Cp=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(Mp).length<2?t:Jt(e)?e.trim():e},Pp=function(e){return e},ri=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},t_=function(e){return function(t,n){for(var i in n)i in t||i==="duration"&&e||i==="ease"||(t[i]=n[i])}},ys=function(e,t){for(var n in t)e[n]=t[n];return e},$h=function r(e,t){for(var n in t)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(e[n]=Di(t[n])?r(e[n]||(e[n]={}),t[n]):t[n]);return e},Wl=function(e,t){var n={},i;for(i in e)i in t||(n[i]=e[i]);return n},ra=function(e){var t=e.parent||Pt,n=e.keyframes?t_(hn(e.keyframes)):ri;if(wn(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},n_=function(e,t){for(var n=e.length,i=n===t.length;i&&n--&&e[n]===t[n];);return n<0},Lp=function(e,t,n,i,s){var o=e[i],a;if(s)for(a=t[s];o&&o[s]>a;)o=o._prev;return o?(t._next=o._next,o._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[i]=t,t._prev=o,t.parent=t._dp=e,t},lc=function(e,t,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var s=t._prev,o=t._next;s?s._next=o:e[n]===t&&(e[n]=o),o?o._prev=s:e[i]===t&&(e[i]=s),t._next=t._prev=t.parent=null},Ir=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},fs=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},i_=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},Au=function(e,t,n,i){return e._startAt&&(un?e._startAt.revert(Cl):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,i))},r_=function r(e){return!e||e._ts&&r(e.parent)},Kh=function(e){return e._repeat?Eo(e._tTime,e=e.duration()+e._rDelay)*e:0},Eo=function(e,t){var n=Math.floor(e/=t);return e&&n===e?n-1:n},Xl=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},cc=function(e){return e._end=Zt(e._start+(e._tDur/Math.abs(e._ts||e._rts||bt)||0))},uc=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=Zt(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),cc(e),n._dirty||fs(n,e)),e},Dp=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=Xl(e.rawTime(),t),(!t._dur||za(0,t.totalDuration(),n)-t._tTime>bt)&&t.render(n,!0)),fs(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-bt}},Si=function(e,t,n,i){return t.parent&&Ir(t),t._start=Zt((nr(n)?n:n||e!==Pt?$n(e,n,t):e._time)+t._delay),t._end=Zt(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),Lp(e,t,"_first","_last",e._sort?"_start":0),Ru(t)||(e._recent=t),i||Dp(e,t),e._ts<0&&uc(e,e._tTime),e},Ip=function(e,t){return(Gn.ScrollTrigger||hh("scrollTrigger",t))&&Gn.ScrollTrigger.create(t,e)},Up=function(e,t,n,i,s){if(gh(e,t,s),!e._initted)return 1;if(!n&&e._pt&&!un&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&wp!==Fn.frame)return Ar.push(e),e._lazy=[s,i],1},s_=function r(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||r(t))},Ru=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},o_=function(e,t,n,i){var s=e.ratio,o=t<0||!t&&(!e._start&&s_(e)&&!(!e._initted&&Ru(e))||(e._ts<0||e._dp._ts<0)&&!Ru(e))?0:1,a=e._rDelay,l=0,u,h,f;if(a&&e._repeat&&(l=za(0,e._tDur,t),h=Eo(l,a),e._yoyo&&h&1&&(o=1-o),h!==Eo(e._tTime,a)&&(s=1-o,e.vars.repeatRefresh&&e._initted&&e.invalidate())),o!==s||un||i||e._zTime===bt||!t&&e._zTime){if(!e._initted&&Up(e,t,i,n,l))return;for(f=e._zTime,e._zTime=t||(n?bt:0),n||(n=t&&!f),e.ratio=o,e._from&&(o=1-o),e._time=0,e._tTime=l,u=e._pt;u;)u.r(o,u.d),u=u._next;t<0&&Au(e,t,n,!0),e._onUpdate&&!n&&kn(e,"onUpdate"),l&&e._repeat&&!n&&e.parent&&kn(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===o&&(o&&Ir(e,1),!n&&!un&&(kn(e,o?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},a_=function(e,t,n){var i;if(n>t)for(i=e._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>t)return i;i=i._next}else for(i=e._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<t)return i;i=i._prev}},To=function(e,t,n,i){var s=e._repeat,o=Zt(t)||0,a=e._tTime/e._tDur;return a&&!i&&(e._time*=o/e._dur),e._dur=o,e._tDur=s?s<0?1e10:Zt(o*(s+1)+e._rDelay*s):o,a>0&&!i&&uc(e,e._tTime=e._tDur*a),e.parent&&cc(e),n||fs(e.parent,e),e},jh=function(e){return e instanceof yn?fs(e):To(e,e._dur)},l_={_start:0,endTime:Ea,totalDuration:Ea},$n=function r(e,t,n){var i=e.labels,s=e._recent||l_,o=e.duration()>=ei?s.endTime(!1):e._dur,a,l,u;return Jt(t)&&(isNaN(t)||t in i)?(l=t.charAt(0),u=t.substr(-1)==="%",a=t.indexOf("="),l==="<"||l===">"?(a>=0&&(t=t.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(t.substr(1))||0)*(u?(a<0?s:n).totalDuration()/100:1)):a<0?(t in i||(i[t]=o),i[t]):(l=parseFloat(t.charAt(a-1)+t.substr(a+1)),u&&n&&(l=l/100*(hn(n)?n[0]:n).totalDuration()),a>1?r(e,t.substr(0,a-1),n)+l:o+l)):t==null?o:+t},sa=function(e,t,n){var i=nr(t[1]),s=(i?2:1)+(e<2?0:1),o=t[s],a,l;if(i&&(o.duration=t[1]),o.parent=n,e){for(a=o,l=n;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=wn(l.vars.inherit)&&l.parent;o.immediateRender=wn(a.immediateRender),e<2?o.runBackwards=1:o.startAt=t[s-1]}return new Ht(t[0],o,t[s+1])},Br=function(e,t){return e||e===0?t(e):t},za=function(e,t,n){return n<e?e:n>t?t:n},cn=function(e,t){return!Jt(e)||!(t=Zg.exec(e))?"":t[1]},c_=function(e,t,n){return Br(n,function(i){return za(e,t,i)})},Cu=[].slice,Np=function(e,t){return e&&Di(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&Di(e[0]))&&!e.nodeType&&e!==vi},u_=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(i){var s;return Jt(i)&&!t||Np(i,1)?(s=n).push.apply(s,ti(i)):n.push(i)})||n},ti=function(e,t,n){return Rt&&!t&&Rt.selector?Rt.selector(e):Jt(e)&&!n&&(bu||!bo())?Cu.call((t||uh).querySelectorAll(e),0):hn(e)?u_(e,n):Np(e)?Cu.call(e,0):e?[e]:[]},Pu=function(e){return e=ti(e)[0]||Ma("Invalid scope")||{},function(t){var n=e.current||e.nativeElement||e;return ti(t,n.querySelectorAll?n:n===e?Ma("Invalid scope")||uh.createElement("div"):e)}},Op=function(e){return e.sort(function(){return .5-Math.random()})},Fp=function(e){if(Dt(e))return e;var t=Di(e)?e:{each:e},n=ds(t.ease),i=t.from||0,s=parseFloat(t.base)||0,o={},a=i>0&&i<1,l=isNaN(i)||a,u=t.axis,h=i,f=i;return Jt(i)?h=f={center:.5,edges:.5,end:1}[i]||0:!a&&l&&(h=i[0],f=i[1]),function(d,c,_){var g=(_||t).length,p=o[g],m,M,x,E,R,A,T,C,S;if(!p){if(S=t.grid==="auto"?0:(t.grid||[1,ei])[1],!S){for(T=-ei;T<(T=_[S++].getBoundingClientRect().left)&&S<g;);S<g&&S--}for(p=o[g]=[],m=l?Math.min(S,g)*h-.5:i%S,M=S===ei?0:l?g*f/S-.5:i/S|0,T=0,C=ei,A=0;A<g;A++)x=A%S-m,E=M-(A/S|0),p[A]=R=u?Math.abs(u==="y"?E:x):vp(x*x+E*E),R>T&&(T=R),R<C&&(C=R);i==="random"&&Op(p),p.max=T-C,p.min=C,p.v=g=(parseFloat(t.amount)||parseFloat(t.each)*(S>g?g-1:u?u==="y"?g/S:S:Math.max(S,g/S))||0)*(i==="edges"?-1:1),p.b=g<0?s-g:s,p.u=cn(t.amount||t.each)||0,n=n&&g<0?qp(n):n}return g=(p[d]-p.min)/p.max||0,Zt(p.b+(n?n(g):g)*p.v)+p.u}},Lu=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(n){var i=Zt(Math.round(parseFloat(n)/e)*e*t);return(i-i%1)/t+(nr(n)?0:cn(n))}},Bp=function(e,t){var n=hn(e),i,s;return!n&&Di(e)&&(i=n=e.radius||ei,e.values?(e=ti(e.values),(s=!nr(e[0]))&&(i*=i)):e=Lu(e.increment)),Br(t,n?Dt(e)?function(o){return s=e(o),Math.abs(s-o)<=i?s:o}:function(o){for(var a=parseFloat(s?o.x:o),l=parseFloat(s?o.y:0),u=ei,h=0,f=e.length,d,c;f--;)s?(d=e[f].x-a,c=e[f].y-l,d=d*d+c*c):d=Math.abs(e[f]-a),d<u&&(u=d,h=f);return h=!i||u<=i?e[h]:o,s||h===o||nr(o)?h:h+cn(o)}:Lu(e))},zp=function(e,t,n,i){return Br(hn(e)?!t:n===!0?!!(n=0):!i,function(){return hn(e)?e[~~(Math.random()*e.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*i)/i})},h_=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(i){return t.reduce(function(s,o){return o(s)},i)}},f_=function(e,t){return function(n){return e(parseFloat(n))+(t||cn(n))}},d_=function(e,t,n){return Hp(e,t,0,1,n)},kp=function(e,t,n){return Br(n,function(i){return e[~~t(i)]})},p_=function r(e,t,n){var i=t-e;return hn(e)?kp(e,r(0,e.length),t):Br(n,function(s){return(i+(s-e)%i)%i+e})},m_=function r(e,t,n){var i=t-e,s=i*2;return hn(e)?kp(e,r(0,e.length-1),t):Br(n,function(o){return o=(s+(o-e)%s)%s||0,e+(o>i?s-o:o)})},Ta=function(e){for(var t=0,n="",i,s,o,a;~(i=e.indexOf("random(",t));)o=e.indexOf(")",i),a=e.charAt(i+7)==="[",s=e.substr(i+7,o-i-7).match(a?Mp:Tu),n+=e.substr(t,i-t)+zp(a?s:+s[0],a?0:+s[1],+s[2]||1e-5),t=o+1;return n+e.substr(t,e.length-t)},Hp=function(e,t,n,i,s){var o=t-e,a=i-n;return Br(s,function(l){return n+((l-e)/o*a||0)})},g_=function r(e,t,n,i){var s=isNaN(e+t)?0:function(c){return(1-c)*e+c*t};if(!s){var o=Jt(e),a={},l,u,h,f,d;if(n===!0&&(i=1)&&(n=null),o)e={p:e},t={p:t};else if(hn(e)&&!hn(t)){for(h=[],f=e.length,d=f-2,u=1;u<f;u++)h.push(r(e[u-1],e[u]));f--,s=function(_){_*=f;var g=Math.min(d,~~_);return h[g](_-g)},n=t}else i||(e=ys(hn(e)?[]:{},e));if(!h){for(l in t)mh.call(a,e,l,"get",t[l]);s=function(_){return xh(_,a)||(o?e.p:e)}}}return Br(n,s)},Zh=function(e,t,n){var i=e.labels,s=ei,o,a,l;for(o in i)a=i[o]-t,a<0==!!n&&a&&s>(a=Math.abs(a))&&(l=o,s=a);return l},kn=function(e,t,n){var i=e.vars,s=i[t],o=Rt,a=e._ctx,l,u,h;if(s)return l=i[t+"Params"],u=i.callbackScope||e,n&&Ar.length&&Gl(),a&&(Rt=a),h=l?s.apply(u,l):s.call(u),Rt=o,h},Xo=function(e){return Ir(e),e.scrollTrigger&&e.scrollTrigger.kill(!!un),e.progress()<1&&kn(e,"onInterrupt"),e},oo,Vp=[],Gp=function(e){if(e)if(e=!e.name&&e.default||e,ch()||e.headless){var t=e.name,n=Dt(e),i=t&&!n&&e.init?function(){this._props=[]}:e,s={init:Ea,render:xh,add:mh,kill:D_,modifier:L_,rawVars:0},o={targetTest:0,get:0,getSetter:vh,aliases:{},register:0};if(bo(),e!==i){if(On[t])return;ri(i,ri(Wl(e,s),o)),ys(i.prototype,ys(s,Wl(e,o))),On[i.prop=t]=i,e.targetTest&&(Pl.push(i),fh[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}bp(t,i),e.register&&e.register(Ln,i,Rn)}else Vp.push(e)},Et=255,Yo={aqua:[0,Et,Et],lime:[0,Et,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Et],navy:[0,0,128],white:[Et,Et,Et],olive:[128,128,0],yellow:[Et,Et,0],orange:[Et,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Et,0,0],pink:[Et,192,203],cyan:[0,Et,Et],transparent:[Et,Et,Et,0]},Tc=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*Et+.5|0},Wp=function(e,t,n){var i=e?nr(e)?[e>>16,e>>8&Et,e&Et]:0:Yo.black,s,o,a,l,u,h,f,d,c,_;if(!i){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),Yo[e])i=Yo[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),o=e.charAt(2),a=e.charAt(3),e="#"+s+s+o+o+a+a+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return i=parseInt(e.substr(1,6),16),[i>>16,i>>8&Et,i&Et,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),i=[e>>16,e>>8&Et,e&Et]}else if(e.substr(0,3)==="hsl"){if(i=_=e.match(Tu),!t)l=+i[0]%360/360,u=+i[1]/100,h=+i[2]/100,o=h<=.5?h*(u+1):h+u-h*u,s=h*2-o,i.length>3&&(i[3]*=1),i[0]=Tc(l+1/3,s,o),i[1]=Tc(l,s,o),i[2]=Tc(l-1/3,s,o);else if(~e.indexOf("="))return i=e.match(yp),n&&i.length<4&&(i[3]=1),i}else i=e.match(Tu)||Yo.transparent;i=i.map(Number)}return t&&!_&&(s=i[0]/Et,o=i[1]/Et,a=i[2]/Et,f=Math.max(s,o,a),d=Math.min(s,o,a),h=(f+d)/2,f===d?l=u=0:(c=f-d,u=h>.5?c/(2-f-d):c/(f+d),l=f===s?(o-a)/c+(o<a?6:0):f===o?(a-s)/c+2:(s-o)/c+4,l*=60),i[0]=~~(l+.5),i[1]=~~(u*100+.5),i[2]=~~(h*100+.5)),n&&i.length<4&&(i[3]=1),i},Xp=function(e){var t=[],n=[],i=-1;return e.split(Rr).forEach(function(s){var o=s.match(so)||[];t.push.apply(t,o),n.push(i+=o.length+1)}),t.c=n,t},Jh=function(e,t,n){var i="",s=(e+i).match(Rr),o=t?"hsla(":"rgba(",a=0,l,u,h,f;if(!s)return e;if(s=s.map(function(d){return(d=Wp(d,t,1))&&o+(t?d[0]+","+d[1]+"%,"+d[2]+"%,"+d[3]:d.join(","))+")"}),n&&(h=Xp(e),l=n.c,l.join(i)!==h.c.join(i)))for(u=e.replace(Rr,"1").split(so),f=u.length-1;a<f;a++)i+=u[a]+(~l.indexOf(a)?s.shift()||o+"0,0,0,0)":(h.length?h:s.length?s:n).shift());if(!u)for(u=e.split(Rr),f=u.length-1;a<f;a++)i+=u[a]+s[a];return i+u[f]},Rr=function(){var r="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in Yo)r+="|"+e+"\\b";return new RegExp(r+")","gi")}(),__=/hsl[a]?\(/,Yp=function(e){var t=e.join(" "),n;if(Rr.lastIndex=0,Rr.test(t))return n=__.test(t),e[1]=Jh(e[1],n),e[0]=Jh(e[0],n,Xp(e[1])),!0},ba,Fn=function(){var r=Date.now,e=500,t=33,n=r(),i=n,s=1e3/240,o=s,a=[],l,u,h,f,d,c,_=function g(p){var m=r()-i,M=p===!0,x,E,R,A;if((m>e||m<0)&&(n+=m-t),i+=m,R=i-n,x=R-o,(x>0||M)&&(A=++f.frame,d=R-f.time*1e3,f.time=R=R/1e3,o+=x+(x>=s?4:s-x),E=1),M||(l=u(g)),E)for(c=0;c<a.length;c++)a[c](R,d,A,p)};return f={time:0,frame:0,tick:function(){_(!0)},deltaRatio:function(p){return d/(1e3/(p||60))},wake:function(){Ep&&(!bu&&ch()&&(vi=bu=window,uh=vi.document||{},Gn.gsap=Ln,(vi.gsapVersions||(vi.gsapVersions=[])).push(Ln.version),Tp(Vl||vi.GreenSockGlobals||!vi.gsap&&vi||{}),Vp.forEach(Gp)),h=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&f.sleep(),u=h||function(p){return setTimeout(p,o-f.time*1e3+1|0)},ba=1,_(2))},sleep:function(){(h?cancelAnimationFrame:clearTimeout)(l),ba=0,u=Ea},lagSmoothing:function(p,m){e=p||1/0,t=Math.min(m||33,e)},fps:function(p){s=1e3/(p||240),o=f.time*1e3+s},add:function(p,m,M){var x=m?function(E,R,A,T){p(E,R,A,T),f.remove(x)}:p;return f.remove(p),a[M?"unshift":"push"](x),bo(),x},remove:function(p,m){~(m=a.indexOf(p))&&a.splice(m,1)&&c>=m&&c--},_listeners:a},f}(),bo=function(){return!ba&&Fn.wake()},gt={},v_=/^[\d.\-M][\d.\-,\s]/,x_=/["']/g,y_=function(e){for(var t={},n=e.substr(1,e.length-3).split(":"),i=n[0],s=1,o=n.length,a,l,u;s<o;s++)l=n[s],a=s!==o-1?l.lastIndexOf(","):l.length,u=l.substr(0,a),t[i]=isNaN(u)?u.replace(x_,"").trim():+u,i=l.substr(a+1).trim();return t},S_=function(e){var t=e.indexOf("(")+1,n=e.indexOf(")"),i=e.indexOf("(",t);return e.substring(t,~i&&i<n?e.indexOf(")",n+1):n)},M_=function(e){var t=(e+"").split("("),n=gt[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf("{")?[y_(t[1])]:S_(e).split(",").map(Cp)):gt._CE&&v_.test(e)?gt._CE("",e):n},qp=function(e){return function(t){return 1-e(1-t)}},$p=function r(e,t){for(var n=e._first,i;n;)n instanceof yn?r(n,t):n.vars.yoyoEase&&(!n._yoyo||!n._repeat)&&n._yoyo!==t&&(n.timeline?r(n.timeline,t):(i=n._ease,n._ease=n._yEase,n._yEase=i,n._yoyo=t)),n=n._next},ds=function(e,t){return e&&(Dt(e)?e:gt[e]||M_(e))||t},Rs=function(e,t,n,i){n===void 0&&(n=function(l){return 1-t(1-l)}),i===void 0&&(i=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var s={easeIn:t,easeOut:n,easeInOut:i},o;return An(e,function(a){gt[a]=Gn[a]=s,gt[o=a.toLowerCase()]=n;for(var l in s)gt[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=gt[a+"."+l]=s[l]}),s},Kp=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},bc=function r(e,t,n){var i=t>=1?t:1,s=(n||(e?.3:.45))/(t<1?t:1),o=s/Eu*(Math.asin(1/i)||0),a=function(h){return h===1?1:i*Math.pow(2,-10*h)*jg((h-o)*s)+1},l=e==="out"?a:e==="in"?function(u){return 1-a(1-u)}:Kp(a);return s=Eu/s,l.config=function(u,h){return r(e,u,h)},l},wc=function r(e,t){t===void 0&&(t=1.70158);var n=function(o){return o?--o*o*((t+1)*o+t)+1:0},i=e==="out"?n:e==="in"?function(s){return 1-n(1-s)}:Kp(n);return i.config=function(s){return r(e,s)},i};An("Linear,Quad,Cubic,Quart,Quint,Strong",function(r,e){var t=e<5?e+1:e;Rs(r+",Power"+(t-1),e?function(n){return Math.pow(n,t)}:function(n){return n},function(n){return 1-Math.pow(1-n,t)},function(n){return n<.5?Math.pow(n*2,t)/2:1-Math.pow((1-n)*2,t)/2})});gt.Linear.easeNone=gt.none=gt.Linear.easeIn;Rs("Elastic",bc("in"),bc("out"),bc());(function(r,e){var t=1/e,n=2*t,i=2.5*t,s=function(a){return a<t?r*a*a:a<n?r*Math.pow(a-1.5/e,2)+.75:a<i?r*(a-=2.25/e)*a+.9375:r*Math.pow(a-2.625/e,2)+.984375};Rs("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);Rs("Expo",function(r){return r?Math.pow(2,10*(r-1)):0});Rs("Circ",function(r){return-(vp(1-r*r)-1)});Rs("Sine",function(r){return r===1?1:-Kg(r*qg)+1});Rs("Back",wc("in"),wc("out"),wc());gt.SteppedEase=gt.steps=Gn.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,i=e+(t?0:1),s=t?1:0,o=1-bt;return function(a){return((i*za(0,o,a)|0)+s)*n}}};Mo.ease=gt["quad.out"];An("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(r){return dh+=r+","+r+"Params,"});var jp=function(e,t){this.id=$g++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:Ap,this.set=t?t.getSetter:vh},wa=function(){function r(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,To(this,+t.duration,1,1),this.data=t.data,Rt&&(this._ctx=Rt,Rt.data.push(this)),ba||Fn.wake()}var e=r.prototype;return e.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},e.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},e.totalDuration=function(n){return arguments.length?(this._dirty=0,To(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(n,i){if(bo(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(uc(this,n),!s._dp||s.parent||Dp(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&Si(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===bt||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),Rp(this,n,i)),this},e.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+Kh(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},e.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>0?1:0},e.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+Kh(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(n,i){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,i):this._repeat?Eo(this._tTime,s)+1:1},e.timeScale=function(n,i){if(!arguments.length)return this._rts===-bt?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?Xl(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-bt?0:this._rts,this.totalTime(za(-Math.abs(this._delay),this._tDur,s),i!==!1),cc(this),i_(this)},e.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(bo(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==bt&&(this._tTime-=bt)))),this):this._ps},e.startTime=function(n){if(arguments.length){this._start=n;var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&Si(i,this,n-this._delay),this}return this._start},e.endTime=function(n){return this._start+(wn(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Xl(i.rawTime(n),this):this._tTime:this._tTime},e.revert=function(n){n===void 0&&(n=Qg);var i=un;return un=n,(this._initted||this._startAt)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),un=i,this},e.globalTime=function(n){for(var i=this,s=arguments.length?n:i.rawTime();i;)s=i._start+s/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},e.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,jh(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,jh(this),i?this.time(i):this}return this._rDelay},e.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},e.seek=function(n,i){return this.totalTime($n(this,n),wn(i))},e.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,wn(i))},e.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},e.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},e.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-bt:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-bt,this},e.isActive=function(){var n=this.parent||this._dp,i=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=i&&s<this.endTime(!0)-bt)},e.eventCallback=function(n,i,s){var o=this.vars;return arguments.length>1?(i?(o[n]=i,s&&(o[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=i)):delete o[n],this):o[n]},e.then=function(n){var i=this;return new Promise(function(s){var o=Dt(n)?n:Pp,a=function(){var u=i.then;i.then=null,Dt(o)&&(o=o(i))&&(o.then||o===i)&&(i.then=u),s(o),i.then=u};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?a():i._prom=a})},e.kill=function(){Xo(this)},r}();ri(wa.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-bt,_prom:0,_ps:!1,_rts:1});var yn=function(r){_p(e,r);function e(n,i){var s;return n===void 0&&(n={}),s=r.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=wn(n.sortChildren),Pt&&Si(n.parent||Pt,Gi(s),i),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&Ip(Gi(s),n.scrollTrigger),s}var t=e.prototype;return t.to=function(i,s,o){return sa(0,arguments,this),this},t.from=function(i,s,o){return sa(1,arguments,this),this},t.fromTo=function(i,s,o,a){return sa(2,arguments,this),this},t.set=function(i,s,o){return s.duration=0,s.parent=this,ra(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new Ht(i,s,$n(this,o),1),this},t.call=function(i,s,o){return Si(this,Ht.delayedCall(0,i,s),o)},t.staggerTo=function(i,s,o,a,l,u,h){return o.duration=s,o.stagger=o.stagger||a,o.onComplete=u,o.onCompleteParams=h,o.parent=this,new Ht(i,o,$n(this,l)),this},t.staggerFrom=function(i,s,o,a,l,u,h){return o.runBackwards=1,ra(o).immediateRender=wn(o.immediateRender),this.staggerTo(i,s,o,a,l,u,h)},t.staggerFromTo=function(i,s,o,a,l,u,h,f){return a.startAt=o,ra(a).immediateRender=wn(a.immediateRender),this.staggerTo(i,s,a,l,u,h,f)},t.render=function(i,s,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,u=this._dur,h=i<=0?0:Zt(i),f=this._zTime<0!=i<0&&(this._initted||!u),d,c,_,g,p,m,M,x,E,R,A,T;if(this!==Pt&&h>l&&i>=0&&(h=l),h!==this._tTime||o||f){if(a!==this._time&&u&&(h+=this._time-a,i+=this._time-a),d=h,E=this._start,x=this._ts,m=!x,f&&(u||(a=this._zTime),(i||!s)&&(this._zTime=i)),this._repeat){if(A=this._yoyo,p=u+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(p*100+i,s,o);if(d=Zt(h%p),h===l?(g=this._repeat,d=u):(g=~~(h/p),g&&g===h/p&&(d=u,g--),d>u&&(d=u)),R=Eo(this._tTime,p),!a&&this._tTime&&R!==g&&this._tTime-R*p-this._dur<=0&&(R=g),A&&g&1&&(d=u-d,T=1),g!==R&&!this._lock){var C=A&&R&1,S=C===(A&&g&1);if(g<R&&(C=!C),a=C?0:h%u?u:h,this._lock=1,this.render(a||(T?0:Zt(g*p)),s,!u)._lock=0,this._tTime=h,!s&&this.parent&&kn(this,"onRepeat"),this.vars.repeatRefresh&&!T&&(this.invalidate()._lock=1),a&&a!==this._time||m!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(u=this._dur,l=this._tDur,S&&(this._lock=2,a=C?u:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!T&&this.invalidate()),this._lock=0,!this._ts&&!m)return this;$p(this,T)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(M=a_(this,Zt(a),Zt(d)),M&&(h-=d-(d=M._start))),this._tTime=h,this._time=d,this._act=!x,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,a=0),!a&&d&&!s&&!g&&(kn(this,"onStart"),this._tTime!==h))return this;if(d>=a&&i>=0)for(c=this._first;c;){if(_=c._next,(c._act||d>=c._start)&&c._ts&&M!==c){if(c.parent!==this)return this.render(i,s,o);if(c.render(c._ts>0?(d-c._start)*c._ts:(c._dirty?c.totalDuration():c._tDur)+(d-c._start)*c._ts,s,o),d!==this._time||!this._ts&&!m){M=0,_&&(h+=this._zTime=-bt);break}}c=_}else{c=this._last;for(var v=i<0?i:d;c;){if(_=c._prev,(c._act||v<=c._end)&&c._ts&&M!==c){if(c.parent!==this)return this.render(i,s,o);if(c.render(c._ts>0?(v-c._start)*c._ts:(c._dirty?c.totalDuration():c._tDur)+(v-c._start)*c._ts,s,o||un&&(c._initted||c._startAt)),d!==this._time||!this._ts&&!m){M=0,_&&(h+=this._zTime=v?-bt:bt);break}}c=_}}if(M&&!s&&(this.pause(),M.render(d>=a?0:-bt)._zTime=d>=a?1:-1,this._ts))return this._start=E,cc(this),this.render(i,s,o);this._onUpdate&&!s&&kn(this,"onUpdate",!0),(h===l&&this._tTime>=this.totalDuration()||!h&&a)&&(E===this._start||Math.abs(x)!==Math.abs(this._ts))&&(this._lock||((i||!u)&&(h===l&&this._ts>0||!h&&this._ts<0)&&Ir(this,1),!s&&!(i<0&&!a)&&(h||a||!l)&&(kn(this,h===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(h<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(i,s){var o=this;if(nr(s)||(s=$n(this,s,i)),!(i instanceof wa)){if(hn(i))return i.forEach(function(a){return o.add(a,s)}),this;if(Jt(i))return this.addLabel(i,s);if(Dt(i))i=Ht.delayedCall(0,i);else return this}return this!==i?Si(this,i,s):this},t.getChildren=function(i,s,o,a){i===void 0&&(i=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),a===void 0&&(a=-ei);for(var l=[],u=this._first;u;)u._start>=a&&(u instanceof Ht?s&&l.push(u):(o&&l.push(u),i&&l.push.apply(l,u.getChildren(!0,s,o)))),u=u._next;return l},t.getById=function(i){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===i)return s[o]},t.remove=function(i){return Jt(i)?this.removeLabel(i):Dt(i)?this.killTweensOf(i):(lc(this,i),i===this._recent&&(this._recent=this._last),fs(this))},t.totalTime=function(i,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Zt(Fn.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),r.prototype.totalTime.call(this,i,s),this._forcing=0,this):this._tTime},t.addLabel=function(i,s){return this.labels[i]=$n(this,s),this},t.removeLabel=function(i){return delete this.labels[i],this},t.addPause=function(i,s,o){var a=Ht.delayedCall(0,s||Ea,o);return a.data="isPause",this._hasPause=1,Si(this,a,$n(this,i))},t.removePause=function(i){var s=this._first;for(i=$n(this,i);s;)s._start===i&&s.data==="isPause"&&Ir(s),s=s._next},t.killTweensOf=function(i,s,o){for(var a=this.getTweensOf(i,o),l=a.length;l--;)xr!==a[l]&&a[l].kill(i,s);return this},t.getTweensOf=function(i,s){for(var o=[],a=ti(i),l=this._first,u=nr(s),h;l;)l instanceof Ht?e_(l._targets,a)&&(u?(!xr||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&o.push(l):(h=l.getTweensOf(a,s)).length&&o.push.apply(o,h),l=l._next;return o},t.tweenTo=function(i,s){s=s||{};var o=this,a=$n(o,i),l=s,u=l.startAt,h=l.onStart,f=l.onStartParams,d=l.immediateRender,c,_=Ht.to(o,ri({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:s.duration||Math.abs((a-(u&&"time"in u?u.time:o._time))/o.timeScale())||bt,onStart:function(){if(o.pause(),!c){var p=s.duration||Math.abs((a-(u&&"time"in u?u.time:o._time))/o.timeScale());_._dur!==p&&To(_,p,0,1).render(_._time,!0,!0),c=1}h&&h.apply(_,f||[])}},s));return d?_.render(0):_},t.tweenFromTo=function(i,s,o){return this.tweenTo(s,ri({startAt:{time:$n(this,i)}},o))},t.recent=function(){return this._recent},t.nextLabel=function(i){return i===void 0&&(i=this._time),Zh(this,$n(this,i))},t.previousLabel=function(i){return i===void 0&&(i=this._time),Zh(this,$n(this,i),1)},t.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+bt)},t.shiftChildren=function(i,s,o){o===void 0&&(o=0);for(var a=this._first,l=this.labels,u;a;)a._start>=o&&(a._start+=i,a._end+=i),a=a._next;if(s)for(u in l)l[u]>=o&&(l[u]+=i);return fs(this)},t.invalidate=function(i){var s=this._first;for(this._lock=0;s;)s.invalidate(i),s=s._next;return r.prototype.invalidate.call(this,i)},t.clear=function(i){i===void 0&&(i=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),fs(this)},t.totalDuration=function(i){var s=0,o=this,a=o._last,l=ei,u,h,f;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-i:i));if(o._dirty){for(f=o.parent;a;)u=a._prev,a._dirty&&a.totalDuration(),h=a._start,h>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,Si(o,a,h-a._delay,1)._lock=0):l=h,h<0&&a._ts&&(s-=h,(!f&&!o._dp||f&&f.smoothChildTiming)&&(o._start+=h/o._ts,o._time-=h,o._tTime-=h),o.shiftChildren(-h,!1,-1/0),l=0),a._end>s&&a._ts&&(s=a._end),a=u;To(o,o===Pt&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},e.updateRoot=function(i){if(Pt._ts&&(Rp(Pt,Xl(i,Pt)),wp=Fn.frame),Fn.frame>=qh){qh+=Hn.autoSleep||120;var s=Pt._first;if((!s||!s._ts)&&Hn.autoSleep&&Fn._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||Fn.sleep()}}},e}(wa);ri(yn.prototype,{_lock:0,_hasPause:0,_forcing:0});var E_=function(e,t,n,i,s,o,a){var l=new Rn(this._pt,e,t,0,1,nm,null,s),u=0,h=0,f,d,c,_,g,p,m,M;for(l.b=n,l.e=i,n+="",i+="",(m=~i.indexOf("random("))&&(i=Ta(i)),o&&(M=[n,i],o(M,e,t),n=M[0],i=M[1]),d=n.match(Mc)||[];f=Mc.exec(i);)_=f[0],g=i.substring(u,f.index),c?c=(c+1)%5:g.substr(-5)==="rgba("&&(c=1),_!==d[h++]&&(p=parseFloat(d[h-1])||0,l._pt={_next:l._pt,p:g||h===1?g:",",s:p,c:_.charAt(1)==="="?co(p,_)-p:parseFloat(_)-p,m:c&&c<4?Math.round:0},u=Mc.lastIndex);return l.c=u<i.length?i.substring(u,i.length):"",l.fp=a,(Sp.test(i)||m)&&(l.e=0),this._pt=l,l},mh=function(e,t,n,i,s,o,a,l,u,h){Dt(i)&&(i=i(s||0,e,o));var f=e[t],d=n!=="get"?n:Dt(f)?u?e[t.indexOf("set")||!Dt(e["get"+t.substr(3)])?t:"get"+t.substr(3)](u):e[t]():f,c=Dt(f)?u?R_:em:_h,_;if(Jt(i)&&(~i.indexOf("random(")&&(i=Ta(i)),i.charAt(1)==="="&&(_=co(d,i)+(cn(d)||0),(_||_===0)&&(i=_))),!h||d!==i||Du)return!isNaN(d*i)&&i!==""?(_=new Rn(this._pt,e,t,+d||0,i-(d||0),typeof f=="boolean"?P_:tm,0,c),u&&(_.fp=u),a&&_.modifier(a,this,e),this._pt=_):(!f&&!(t in e)&&hh(t,i),E_.call(this,e,t,d,i,c,l||Hn.stringFilter,u))},T_=function(e,t,n,i,s){if(Dt(e)&&(e=oa(e,s,t,n,i)),!Di(e)||e.style&&e.nodeType||hn(e)||xp(e))return Jt(e)?oa(e,s,t,n,i):e;var o={},a;for(a in e)o[a]=oa(e[a],s,t,n,i);return o},Zp=function(e,t,n,i,s,o){var a,l,u,h;if(On[e]&&(a=new On[e]).init(s,a.rawVars?t[e]:T_(t[e],i,s,o,n),n,i,o)!==!1&&(n._pt=l=new Rn(n._pt,s,e,0,1,a.render,a,0,a.priority),n!==oo))for(u=n._ptLookup[n._targets.indexOf(s)],h=a._props.length;h--;)u[a._props[h]]=l;return a},xr,Du,gh=function r(e,t,n){var i=e.vars,s=i.ease,o=i.startAt,a=i.immediateRender,l=i.lazy,u=i.onUpdate,h=i.runBackwards,f=i.yoyoEase,d=i.keyframes,c=i.autoRevert,_=e._dur,g=e._startAt,p=e._targets,m=e.parent,M=m&&m.data==="nested"?m.vars.targets:p,x=e._overwrite==="auto"&&!ah,E=e.timeline,R,A,T,C,S,v,I,O,L,X,K,ee,j;if(E&&(!d||!s)&&(s="none"),e._ease=ds(s,Mo.ease),e._yEase=f?qp(ds(f===!0?s:f,Mo.ease)):0,f&&e._yoyo&&!e._repeat&&(f=e._yEase,e._yEase=e._ease,e._ease=f),e._from=!E&&!!i.runBackwards,!E||d&&!i.stagger){if(O=p[0]?hs(p[0]).harness:0,ee=O&&i[O.prop],R=Wl(i,fh),g&&(g._zTime<0&&g.progress(1),t<0&&h&&a&&!c?g.render(-1,!0):g.revert(h&&_?Cl:Jg),g._lazy=0),o){if(Ir(e._startAt=Ht.set(p,ri({data:"isStart",overwrite:!1,parent:m,immediateRender:!0,lazy:!g&&wn(l),startAt:null,delay:0,onUpdate:u&&function(){return kn(e,"onUpdate")},stagger:0},o))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(un||!a&&!c)&&e._startAt.revert(Cl),a&&_&&t<=0&&n<=0){t&&(e._zTime=t);return}}else if(h&&_&&!g){if(t&&(a=!1),T=ri({overwrite:!1,data:"isFromStart",lazy:a&&!g&&wn(l),immediateRender:a,stagger:0,parent:m},R),ee&&(T[O.prop]=ee),Ir(e._startAt=Ht.set(p,T)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(un?e._startAt.revert(Cl):e._startAt.render(-1,!0)),e._zTime=t,!a)r(e._startAt,bt,bt);else if(!t)return}for(e._pt=e._ptCache=0,l=_&&wn(l)||l&&!_,A=0;A<p.length;A++){if(S=p[A],I=S._gsap||ph(p)[A]._gsap,e._ptLookup[A]=X={},wu[I.id]&&Ar.length&&Gl(),K=M===p?A:M.indexOf(S),O&&(L=new O).init(S,ee||R,e,K,M)!==!1&&(e._pt=C=new Rn(e._pt,S,L.name,0,1,L.render,L,0,L.priority),L._props.forEach(function(V){X[V]=C}),L.priority&&(v=1)),!O||ee)for(T in R)On[T]&&(L=Zp(T,R,e,K,S,M))?L.priority&&(v=1):X[T]=C=mh.call(e,S,T,"get",R[T],K,M,0,i.stringFilter);e._op&&e._op[A]&&e.kill(S,e._op[A]),x&&e._pt&&(xr=e,Pt.killTweensOf(S,X,e.globalTime(t)),j=!e.parent,xr=0),e._pt&&l&&(wu[I.id]=1)}v&&im(e),e._onInit&&e._onInit(e)}e._onUpdate=u,e._initted=(!e._op||e._pt)&&!j,d&&t<=0&&E.render(ei,!0,!0)},b_=function(e,t,n,i,s,o,a,l){var u=(e._pt&&e._ptCache||(e._ptCache={}))[t],h,f,d,c;if(!u)for(u=e._ptCache[t]=[],d=e._ptLookup,c=e._targets.length;c--;){if(h=d[c][t],h&&h.d&&h.d._pt)for(h=h.d._pt;h&&h.p!==t&&h.fp!==t;)h=h._next;if(!h)return Du=1,e.vars[t]="+=0",gh(e,a),Du=0,l?Ma(t+" not eligible for reset"):1;u.push(h)}for(c=u.length;c--;)f=u[c],h=f._pt||f,h.s=(i||i===0)&&!s?i:h.s+(i||0)+o*h.c,h.c=n-h.s,f.e&&(f.e=Nt(n)+cn(f.e)),f.b&&(f.b=h.s+cn(f.b))},w_=function(e,t){var n=e[0]?hs(e[0]).harness:0,i=n&&n.aliases,s,o,a,l;if(!i)return t;s=ys({},t);for(o in i)if(o in s)for(l=i[o].split(","),a=l.length;a--;)s[l[a]]=s[o];return s},A_=function(e,t,n,i){var s=t.ease||i||"power1.inOut",o,a;if(hn(t))a=n[e]||(n[e]=[]),t.forEach(function(l,u){return a.push({t:u/(t.length-1)*100,v:l,e:s})});else for(o in t)a=n[o]||(n[o]=[]),o==="ease"||a.push({t:parseFloat(e),v:t[o],e:s})},oa=function(e,t,n,i,s){return Dt(e)?e.call(t,n,i,s):Jt(e)&&~e.indexOf("random(")?Ta(e):e},Jp=dh+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",Qp={};An(Jp+",id,stagger,delay,duration,paused,scrollTrigger",function(r){return Qp[r]=1});var Ht=function(r){_p(e,r);function e(n,i,s,o){var a;typeof i=="number"&&(s.duration=i,i=s,s=null),a=r.call(this,o?i:ra(i))||this;var l=a.vars,u=l.duration,h=l.delay,f=l.immediateRender,d=l.stagger,c=l.overwrite,_=l.keyframes,g=l.defaults,p=l.scrollTrigger,m=l.yoyoEase,M=i.parent||Pt,x=(hn(n)||xp(n)?nr(n[0]):"length"in i)?[n]:ti(n),E,R,A,T,C,S,v,I;if(a._targets=x.length?ph(x):Ma("GSAP target "+n+" not found. https://gsap.com",!Hn.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=c,_||d||Wa(u)||Wa(h)){if(i=a.vars,E=a.timeline=new yn({data:"nested",defaults:g||{},targets:M&&M.data==="nested"?M.vars.targets:x}),E.kill(),E.parent=E._dp=Gi(a),E._start=0,d||Wa(u)||Wa(h)){if(T=x.length,v=d&&Fp(d),Di(d))for(C in d)~Jp.indexOf(C)&&(I||(I={}),I[C]=d[C]);for(R=0;R<T;R++)A=Wl(i,Qp),A.stagger=0,m&&(A.yoyoEase=m),I&&ys(A,I),S=x[R],A.duration=+oa(u,Gi(a),R,S,x),A.delay=(+oa(h,Gi(a),R,S,x)||0)-a._delay,!d&&T===1&&A.delay&&(a._delay=h=A.delay,a._start+=h,A.delay=0),E.to(S,A,v?v(R,S,x):0),E._ease=gt.none;E.duration()?u=h=0:a.timeline=0}else if(_){ra(ri(E.vars.defaults,{ease:"none"})),E._ease=ds(_.ease||i.ease||"none");var O=0,L,X,K;if(hn(_))_.forEach(function(ee){return E.to(x,ee,">")}),E.duration();else{A={};for(C in _)C==="ease"||C==="easeEach"||A_(C,_[C],A,_.easeEach);for(C in A)for(L=A[C].sort(function(ee,j){return ee.t-j.t}),O=0,R=0;R<L.length;R++)X=L[R],K={ease:X.e,duration:(X.t-(R?L[R-1].t:0))/100*u},K[C]=X.v,E.to(x,K,O),O+=K.duration;E.duration()<u&&E.to({},{duration:u-E.duration()})}}u||a.duration(u=E.duration())}else a.timeline=0;return c===!0&&!ah&&(xr=Gi(a),Pt.killTweensOf(x),xr=0),Si(M,Gi(a),s),i.reversed&&a.reverse(),i.paused&&a.paused(!0),(f||!u&&!_&&a._start===Zt(M._time)&&wn(f)&&r_(Gi(a))&&M.data!=="nested")&&(a._tTime=-bt,a.render(Math.max(0,-h)||0)),p&&Ip(Gi(a),p),a}var t=e.prototype;return t.render=function(i,s,o){var a=this._time,l=this._tDur,u=this._dur,h=i<0,f=i>l-bt&&!h?l:i<bt?0:i,d,c,_,g,p,m,M,x,E;if(!u)o_(this,i,s,o);else if(f!==this._tTime||!i||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==h){if(d=f,x=this.timeline,this._repeat){if(g=u+this._rDelay,this._repeat<-1&&h)return this.totalTime(g*100+i,s,o);if(d=Zt(f%g),f===l?(_=this._repeat,d=u):(_=~~(f/g),_&&_===Zt(f/g)&&(d=u,_--),d>u&&(d=u)),m=this._yoyo&&_&1,m&&(E=this._yEase,d=u-d),p=Eo(this._tTime,g),d===a&&!o&&this._initted&&_===p)return this._tTime=f,this;_!==p&&(x&&this._yEase&&$p(x,m),this.vars.repeatRefresh&&!m&&!this._lock&&this._time!==g&&this._initted&&(this._lock=o=1,this.render(Zt(g*_),!0).invalidate()._lock=0))}if(!this._initted){if(Up(this,h?i:d,o,s,f))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&_!==p))return this;if(u!==this._dur)return this.render(i,s,o)}if(this._tTime=f,this._time=d,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=M=(E||this._ease)(d/u),this._from&&(this.ratio=M=1-M),d&&!a&&!s&&!_&&(kn(this,"onStart"),this._tTime!==f))return this;for(c=this._pt;c;)c.r(M,c.d),c=c._next;x&&x.render(i<0?i:x._dur*x._ease(d/this._dur),s,o)||this._startAt&&(this._zTime=i),this._onUpdate&&!s&&(h&&Au(this,i,s,o),kn(this,"onUpdate")),this._repeat&&_!==p&&this.vars.onRepeat&&!s&&this.parent&&kn(this,"onRepeat"),(f===this._tDur||!f)&&this._tTime===f&&(h&&!this._onUpdate&&Au(this,i,!0,!0),(i||!u)&&(f===this._tDur&&this._ts>0||!f&&this._ts<0)&&Ir(this,1),!s&&!(h&&!a)&&(f||a||m)&&(kn(this,f===l?"onComplete":"onReverseComplete",!0),this._prom&&!(f<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),r.prototype.invalidate.call(this,i)},t.resetTo=function(i,s,o,a,l){ba||Fn.wake(),this._ts||this.play();var u=Math.min(this._dur,(this._dp._time-this._start)*this._ts),h;return this._initted||gh(this,u),h=this._ease(u/this._dur),b_(this,i,s,o,a,h,u,l)?this.resetTo(i,s,o,a,1):(uc(this,0),this.parent||Lp(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(i,s){if(s===void 0&&(s="all"),!i&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?Xo(this):this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(i,s,xr&&xr.vars.overwrite!==!0)._first||Xo(this),this.parent&&o!==this.timeline.totalDuration()&&To(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=i?ti(i):a,u=this._ptLookup,h=this._pt,f,d,c,_,g,p,m;if((!s||s==="all")&&n_(a,l))return s==="all"&&(this._pt=0),Xo(this);for(f=this._op=this._op||[],s!=="all"&&(Jt(s)&&(g={},An(s,function(M){return g[M]=1}),s=g),s=w_(a,s)),m=a.length;m--;)if(~l.indexOf(a[m])){d=u[m],s==="all"?(f[m]=s,_=d,c={}):(c=f[m]=f[m]||{},_=s);for(g in _)p=d&&d[g],p&&((!("kill"in p.d)||p.d.kill(g)===!0)&&lc(this,p,"_pt"),delete d[g]),c!=="all"&&(c[g]=1)}return this._initted&&!this._pt&&h&&Xo(this),this},e.to=function(i,s){return new e(i,s,arguments[2])},e.from=function(i,s){return sa(1,arguments)},e.delayedCall=function(i,s,o,a){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},e.fromTo=function(i,s,o){return sa(2,arguments)},e.set=function(i,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(i,s)},e.killTweensOf=function(i,s,o){return Pt.killTweensOf(i,s,o)},e}(wa);ri(Ht.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});An("staggerTo,staggerFrom,staggerFromTo",function(r){Ht[r]=function(){var e=new yn,t=Cu.call(arguments,0);return t.splice(r==="staggerFromTo"?5:4,0,0),e[r].apply(e,t)}});var _h=function(e,t,n){return e[t]=n},em=function(e,t,n){return e[t](n)},R_=function(e,t,n,i){return e[t](i.fp,n)},C_=function(e,t,n){return e.setAttribute(t,n)},vh=function(e,t){return Dt(e[t])?em:lh(e[t])&&e.setAttribute?C_:_h},tm=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},P_=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},nm=function(e,t){var n=t._pt,i="";if(!e&&t.b)i=t.b;else if(e===1&&t.e)i=t.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+i,n=n._next;i+=t.c}t.set(t.t,t.p,i,t)},xh=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},L_=function(e,t,n,i){for(var s=this._pt,o;s;)o=s._next,s.p===i&&s.modifier(e,t,n),s=o},D_=function(e){for(var t=this._pt,n,i;t;)i=t._next,t.p===e&&!t.op||t.op===e?lc(this,t,"_pt"):t.dep||(n=1),t=i;return!n},I_=function(e,t,n,i){i.mSet(e,t,i.m.call(i.tween,n,i.mt),i)},im=function(e){for(var t=e._pt,n,i,s,o;t;){for(n=t._next,i=s;i&&i.pr>t.pr;)i=i._next;(t._prev=i?i._prev:o)?t._prev._next=t:s=t,(t._next=i)?i._prev=t:o=t,t=n}e._pt=s},Rn=function(){function r(t,n,i,s,o,a,l,u,h){this.t=n,this.s=s,this.c=o,this.p=i,this.r=a||tm,this.d=l||this,this.set=u||_h,this.pr=h||0,this._next=t,t&&(t._prev=this)}var e=r.prototype;return e.modifier=function(n,i,s){this.mSet=this.mSet||this.set,this.set=I_,this.m=n,this.mt=s,this.tween=i},r}();An(dh+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(r){return fh[r]=1});Gn.TweenMax=Gn.TweenLite=Ht;Gn.TimelineLite=Gn.TimelineMax=yn;Pt=new yn({sortChildren:!1,defaults:Mo,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});Hn.stringFilter=Yp;var ps=[],Ll={},U_=[],Qh=0,N_=0,Ac=function(e){return(Ll[e]||U_).map(function(t){return t()})},Iu=function(){var e=Date.now(),t=[];e-Qh>2&&(Ac("matchMediaInit"),ps.forEach(function(n){var i=n.queries,s=n.conditions,o,a,l,u;for(a in i)o=vi.matchMedia(i[a]).matches,o&&(l=1),o!==s[a]&&(s[a]=o,u=1);u&&(n.revert(),l&&t.push(n))}),Ac("matchMediaRevert"),t.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),Qh=e,Ac("matchMedia"))},rm=function(){function r(t,n){this.selector=n&&Pu(n),this.data=[],this._r=[],this.isReverted=!1,this.id=N_++,t&&this.add(t)}var e=r.prototype;return e.add=function(n,i,s){Dt(n)&&(s=i,i=n,n=Dt);var o=this,a=function(){var u=Rt,h=o.selector,f;return u&&u!==o&&u.data.push(o),s&&(o.selector=Pu(s)),Rt=o,f=i.apply(o,arguments),Dt(f)&&o._r.push(f),Rt=u,o.selector=h,o.isReverted=!1,f};return o.last=a,n===Dt?a(o,function(l){return o.add(null,l)}):n?o[n]=a:a},e.ignore=function(n){var i=Rt;Rt=null,n(this),Rt=i},e.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof r?n.push.apply(n,i.getTweens()):i instanceof Ht&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(n,i){var s=this;if(n?function(){for(var a=s.getTweens(),l=s.data.length,u;l--;)u=s.data[l],u.data==="isFlip"&&(u.revert(),u.getChildren(!0,!0,!1).forEach(function(h){return a.splice(a.indexOf(h),1)}));for(a.map(function(h){return{g:h._dur||h._delay||h._sat&&!h._sat.vars.immediateRender?h.globalTime(0):-1/0,t:h}}).sort(function(h,f){return f.g-h.g||-1/0}).forEach(function(h){return h.t.revert(n)}),l=s.data.length;l--;)u=s.data[l],u instanceof yn?u.data!=="nested"&&(u.scrollTrigger&&u.scrollTrigger.revert(),u.kill()):!(u instanceof Ht)&&u.revert&&u.revert(n);s._r.forEach(function(h){return h(n,s)}),s.isReverted=!0}():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),i)for(var o=ps.length;o--;)ps[o].id===this.id&&ps.splice(o,1)},e.revert=function(n){this.kill(n||{})},r}(),O_=function(){function r(t){this.contexts=[],this.scope=t,Rt&&Rt.data.push(this)}var e=r.prototype;return e.add=function(n,i,s){Di(n)||(n={matches:n});var o=new rm(0,s||this.scope),a=o.conditions={},l,u,h;Rt&&!o.selector&&(o.selector=Rt.selector),this.contexts.push(o),i=o.add("onMatch",i),o.queries=n;for(u in n)u==="all"?h=1:(l=vi.matchMedia(n[u]),l&&(ps.indexOf(o)<0&&ps.push(o),(a[u]=l.matches)&&(h=1),l.addListener?l.addListener(Iu):l.addEventListener("change",Iu)));return h&&i(o,function(f){return o.add(null,f)}),this},e.revert=function(n){this.kill(n||{})},e.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},r}(),Yl={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.forEach(function(i){return Gp(i)})},timeline:function(e){return new yn(e)},getTweensOf:function(e,t){return Pt.getTweensOf(e,t)},getProperty:function(e,t,n,i){Jt(e)&&(e=ti(e)[0]);var s=hs(e||{}).get,o=n?Pp:Cp;return n==="native"&&(n=""),e&&(t?o((On[t]&&On[t].get||s)(e,t,n,i)):function(a,l,u){return o((On[a]&&On[a].get||s)(e,a,l,u))})},quickSetter:function(e,t,n){if(e=ti(e),e.length>1){var i=e.map(function(h){return Ln.quickSetter(h,t,n)}),s=i.length;return function(h){for(var f=s;f--;)i[f](h)}}e=e[0]||{};var o=On[t],a=hs(e),l=a.harness&&(a.harness.aliases||{})[t]||t,u=o?function(h){var f=new o;oo._pt=0,f.init(e,n?h+n:h,oo,0,[e]),f.render(1,f),oo._pt&&xh(1,oo)}:a.set(e,l);return o?u:function(h){return u(e,l,n?h+n:h,a,1)}},quickTo:function(e,t,n){var i,s=Ln.to(e,ys((i={},i[t]="+=0.1",i.paused=!0,i),n||{})),o=function(l,u,h){return s.resetTo(t,l,u,h)};return o.tween=s,o},isTweening:function(e){return Pt.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=ds(e.ease,Mo.ease)),$h(Mo,e||{})},config:function(e){return $h(Hn,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,i=e.plugins,s=e.defaults,o=e.extendTimeline;(i||"").split(",").forEach(function(a){return a&&!On[a]&&!Gn[a]&&Ma(t+" effect requires "+a+" plugin.")}),Ec[t]=function(a,l,u){return n(ti(a),ri(l||{},s),u)},o&&(yn.prototype[t]=function(a,l,u){return this.add(Ec[t](a,Di(l)?l:(u=l)&&{},this),u)})},registerEase:function(e,t){gt[e]=ds(t)},parseEase:function(e,t){return arguments.length?ds(e,t):gt},getById:function(e){return Pt.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new yn(e),i,s;for(n.smoothChildTiming=wn(e.smoothChildTiming),Pt.remove(n),n._dp=0,n._time=n._tTime=Pt._time,i=Pt._first;i;)s=i._next,(t||!(!i._dur&&i instanceof Ht&&i.vars.onComplete===i._targets[0]))&&Si(n,i,i._start-i._delay),i=s;return Si(Pt,n,0),n},context:function(e,t){return e?new rm(e,t):Rt},matchMedia:function(e){return new O_(e)},matchMediaRefresh:function(){return ps.forEach(function(e){var t=e.conditions,n,i;for(i in t)t[i]&&(t[i]=!1,n=1);n&&e.revert()})||Iu()},addEventListener:function(e,t){var n=Ll[e]||(Ll[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=Ll[e],i=n&&n.indexOf(t);i>=0&&n.splice(i,1)},utils:{wrap:p_,wrapYoyo:m_,distribute:Fp,random:zp,snap:Bp,normalize:d_,getUnit:cn,clamp:c_,splitColor:Wp,toArray:ti,selector:Pu,mapRange:Hp,pipe:h_,unitize:f_,interpolate:g_,shuffle:Op},install:Tp,effects:Ec,ticker:Fn,updateRoot:yn.updateRoot,plugins:On,globalTimeline:Pt,core:{PropTween:Rn,globals:bp,Tween:Ht,Timeline:yn,Animation:wa,getCache:hs,_removeLinkedListItem:lc,reverting:function(){return un},context:function(e){return e&&Rt&&(Rt.data.push(e),e._ctx=Rt),Rt},suppressOverwrites:function(e){return ah=e}}};An("to,from,fromTo,delayedCall,set,killTweensOf",function(r){return Yl[r]=Ht[r]});Fn.add(yn.updateRoot);oo=Yl.to({},{duration:0});var F_=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},B_=function(e,t){var n=e._targets,i,s,o;for(i in t)for(s=n.length;s--;)o=e._ptLookup[s][i],o&&(o=o.d)&&(o._pt&&(o=F_(o,i)),o&&o.modifier&&o.modifier(t[i],e,n[s],i))},Rc=function(e,t){return{name:e,rawVars:1,init:function(i,s,o){o._onInit=function(a){var l,u;if(Jt(s)&&(l={},An(s,function(h){return l[h]=1}),s=l),t){l={};for(u in s)l[u]=t(s[u]);s=l}B_(a,s)}}}},Ln=Yl.registerPlugin({name:"attr",init:function(e,t,n,i,s){var o,a,l;this.tween=n;for(o in t)l=e.getAttribute(o)||"",a=this.add(e,"setAttribute",(l||0)+"",t[o],i,s,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(e,t){for(var n=t._pt;n;)un?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:"endArray",init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},Rc("roundProps",Lu),Rc("modifiers"),Rc("snap",Bp))||Yl;Ht.version=yn.version=Ln.version="3.12.5";Ep=1;ch()&&bo();gt.Power0;gt.Power1;gt.Power2;gt.Power3;gt.Power4;gt.Linear;gt.Quad;gt.Cubic;gt.Quart;gt.Quint;gt.Strong;gt.Elastic;gt.Back;gt.SteppedEase;gt.Bounce;gt.Sine;gt.Expo;gt.Circ;/*!
 * CSSPlugin 3.12.5
 * https://gsap.com
 *
 * Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var ef,yr,uo,yh,os,tf,Sh,z_=function(){return typeof window<"u"},ir={},Qr=180/Math.PI,ho=Math.PI/180,Ds=Math.atan2,nf=1e8,Mh=/([A-Z])/g,k_=/(left|right|width|margin|padding|x)/i,H_=/[\s,\(]\S/,Ei={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Uu=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},V_=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},G_=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},W_=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},sm=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},om=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},X_=function(e,t,n){return e.style[t]=n},Y_=function(e,t,n){return e.style.setProperty(t,n)},q_=function(e,t,n){return e._gsap[t]=n},$_=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},K_=function(e,t,n,i,s){var o=e._gsap;o.scaleX=o.scaleY=n,o.renderTransform(s,o)},j_=function(e,t,n,i,s){var o=e._gsap;o[t]=n,o.renderTransform(s,o)},Lt="transform",Cn=Lt+"Origin",Z_=function r(e,t){var n=this,i=this.target,s=i.style,o=i._gsap;if(e in ir&&s){if(this.tfm=this.tfm||{},e!=="transform")e=Ei[e]||e,~e.indexOf(",")?e.split(",").forEach(function(a){return n.tfm[a]=Wi(i,a)}):this.tfm[e]=o.x?o[e]:Wi(i,e),e===Cn&&(this.tfm.zOrigin=o.zOrigin);else return Ei.transform.split(",").forEach(function(a){return r.call(n,a,t)});if(this.props.indexOf(Lt)>=0)return;o.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(Cn,t,"")),e=Lt}(s||t)&&this.props.push(e,t,s[e])},am=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},J_=function(){var e=this.props,t=this.target,n=t.style,i=t._gsap,s,o;for(s=0;s<e.length;s+=3)e[s+1]?t[e[s]]=e[s+2]:e[s+2]?n[e[s]]=e[s+2]:n.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace(Mh,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)i[o]=this.tfm[o];i.svg&&(i.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),s=Sh(),(!s||!s.isStart)&&!n[Lt]&&(am(n),i.zOrigin&&n[Cn]&&(n[Cn]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},lm=function(e,t){var n={target:e,props:[],revert:J_,save:Z_};return e._gsap||Ln.core.getCache(e),t&&t.split(",").forEach(function(i){return n.save(i)}),n},cm,Nu=function(e,t){var n=yr.createElementNS?yr.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):yr.createElement(e);return n&&n.style?n:yr.createElement(e)},Ri=function r(e,t,n){var i=getComputedStyle(e);return i[t]||i.getPropertyValue(t.replace(Mh,"-$1").toLowerCase())||i.getPropertyValue(t)||!n&&r(e,wo(t)||t,1)||""},rf="O,Moz,ms,Ms,Webkit".split(","),wo=function(e,t,n){var i=t||os,s=i.style,o=5;if(e in s&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);o--&&!(rf[o]+e in s););return o<0?null:(o===3?"ms":o>=0?rf[o]:"")+e},Ou=function(){z_()&&window.document&&(ef=window,yr=ef.document,uo=yr.documentElement,os=Nu("div")||{style:{}},Nu("div"),Lt=wo(Lt),Cn=Lt+"Origin",os.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",cm=!!wo("perspective"),Sh=Ln.core.reverting,yh=1)},Cc=function r(e){var t=Nu("svg",this.ownerSVGElement&&this.ownerSVGElement.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),n=this.parentNode,i=this.nextSibling,s=this.style.cssText,o;if(uo.appendChild(t),t.appendChild(this),this.style.display="block",e)try{o=this.getBBox(),this._gsapBBox=this.getBBox,this.getBBox=r}catch{}else this._gsapBBox&&(o=this._gsapBBox());return n&&(i?n.insertBefore(this,i):n.appendChild(this)),uo.removeChild(t),this.style.cssText=s,o},sf=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},um=function(e){var t;try{t=e.getBBox()}catch{t=Cc.call(e,!0)}return t&&(t.width||t.height)||e.getBBox===Cc||(t=Cc.call(e,!0)),t&&!t.width&&!t.x&&!t.y?{x:+sf(e,["x","cx","x1"])||0,y:+sf(e,["y","cy","y1"])||0,width:0,height:0}:t},hm=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&um(e))},Ss=function(e,t){if(t){var n=e.style,i;t in ir&&t!==Cn&&(t=Lt),n.removeProperty?(i=t.substr(0,2),(i==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),n.removeProperty(i==="--"?t:t.replace(Mh,"-$1").toLowerCase())):n.removeAttribute(t)}},Sr=function(e,t,n,i,s,o){var a=new Rn(e._pt,t,n,0,1,o?om:sm);return e._pt=a,a.b=i,a.e=s,e._props.push(n),a},of={deg:1,rad:1,turn:1},Q_={grid:1,flex:1},Ur=function r(e,t,n,i){var s=parseFloat(n)||0,o=(n+"").trim().substr((s+"").length)||"px",a=os.style,l=k_.test(t),u=e.tagName.toLowerCase()==="svg",h=(u?"client":"offset")+(l?"Width":"Height"),f=100,d=i==="px",c=i==="%",_,g,p,m;if(i===o||!s||of[i]||of[o])return s;if(o!=="px"&&!d&&(s=r(e,t,n,"px")),m=e.getCTM&&hm(e),(c||o==="%")&&(ir[t]||~t.indexOf("adius")))return _=m?e.getBBox()[l?"width":"height"]:e[h],Nt(c?s/_*f:s/100*_);if(a[l?"width":"height"]=f+(d?o:i),g=~t.indexOf("adius")||i==="em"&&e.appendChild&&!u?e:e.parentNode,m&&(g=(e.ownerSVGElement||{}).parentNode),(!g||g===yr||!g.appendChild)&&(g=yr.body),p=g._gsap,p&&c&&p.width&&l&&p.time===Fn.time&&!p.uncache)return Nt(s/p.width*f);if(c&&(t==="height"||t==="width")){var M=e.style[t];e.style[t]=f+i,_=e[h],M?e.style[t]=M:Ss(e,t)}else(c||o==="%")&&!Q_[Ri(g,"display")]&&(a.position=Ri(e,"position")),g===e&&(a.position="static"),g.appendChild(os),_=os[h],g.removeChild(os),a.position="absolute";return l&&c&&(p=hs(g),p.time=Fn.time,p.width=g[h]),Nt(d?_*s/f:_&&s?f/_*s:0)},Wi=function(e,t,n,i){var s;return yh||Ou(),t in Ei&&t!=="transform"&&(t=Ei[t],~t.indexOf(",")&&(t=t.split(",")[0])),ir[t]&&t!=="transform"?(s=Ra(e,i),s=t!=="transformOrigin"?s[t]:s.svg?s.origin:$l(Ri(e,Cn))+" "+s.zOrigin+"px"):(s=e.style[t],(!s||s==="auto"||i||~(s+"").indexOf("calc("))&&(s=ql[t]&&ql[t](e,t,n)||Ri(e,t)||Ap(e,t)||(t==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?Ur(e,t,s,n)+n:s},e0=function(e,t,n,i){if(!n||n==="none"){var s=wo(t,e,1),o=s&&Ri(e,s,1);o&&o!==n?(t=s,n=o):t==="borderColor"&&(n=Ri(e,"borderTopColor"))}var a=new Rn(this._pt,e.style,t,0,1,nm),l=0,u=0,h,f,d,c,_,g,p,m,M,x,E,R;if(a.b=n,a.e=i,n+="",i+="",i==="auto"&&(g=e.style[t],e.style[t]=i,i=Ri(e,t)||i,g?e.style[t]=g:Ss(e,t)),h=[n,i],Yp(h),n=h[0],i=h[1],d=n.match(so)||[],R=i.match(so)||[],R.length){for(;f=so.exec(i);)p=f[0],M=i.substring(l,f.index),_?_=(_+1)%5:(M.substr(-5)==="rgba("||M.substr(-5)==="hsla(")&&(_=1),p!==(g=d[u++]||"")&&(c=parseFloat(g)||0,E=g.substr((c+"").length),p.charAt(1)==="="&&(p=co(c,p)+E),m=parseFloat(p),x=p.substr((m+"").length),l=so.lastIndex-x.length,x||(x=x||Hn.units[t]||E,l===i.length&&(i+=x,a.e+=x)),E!==x&&(c=Ur(e,t,g,x)||0),a._pt={_next:a._pt,p:M||u===1?M:",",s:c,c:m-c,m:_&&_<4||t==="zIndex"?Math.round:0});a.c=l<i.length?i.substring(l,i.length):""}else a.r=t==="display"&&i==="none"?om:sm;return Sp.test(i)&&(a.e=0),this._pt=a,a},af={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},t0=function(e){var t=e.split(" "),n=t[0],i=t[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(e=n,n=i,i=e),t[0]=af[n]||n,t[1]=af[i]||i,t.join(" ")},n0=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,i=n.style,s=t.u,o=n._gsap,a,l,u;if(s==="all"||s===!0)i.cssText="",l=1;else for(s=s.split(","),u=s.length;--u>-1;)a=s[u],ir[a]&&(l=1,a=a==="transformOrigin"?Cn:Lt),Ss(n,a);l&&(Ss(n,Lt),o&&(o.svg&&n.removeAttribute("transform"),Ra(n,1),o.uncache=1,am(i)))}},ql={clearProps:function(e,t,n,i,s){if(s.data!=="isFromStart"){var o=e._pt=new Rn(e._pt,t,n,0,0,n0);return o.u=i,o.pr=-10,o.tween=s,e._props.push(n),1}}},Aa=[1,0,0,1,0,0],fm={},dm=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},lf=function(e){var t=Ri(e,Lt);return dm(t)?Aa:t.substr(7).match(yp).map(Nt)},Eh=function(e,t){var n=e._gsap||hs(e),i=e.style,s=lf(e),o,a,l,u;return n.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?Aa:s):(s===Aa&&!e.offsetParent&&e!==uo&&!n.svg&&(l=i.display,i.display="block",o=e.parentNode,(!o||!e.offsetParent)&&(u=1,a=e.nextElementSibling,uo.appendChild(e)),s=lf(e),l?i.display=l:Ss(e,"display"),u&&(a?o.insertBefore(e,a):o?o.appendChild(e):uo.removeChild(e))),t&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},Fu=function(e,t,n,i,s,o){var a=e._gsap,l=s||Eh(e,!0),u=a.xOrigin||0,h=a.yOrigin||0,f=a.xOffset||0,d=a.yOffset||0,c=l[0],_=l[1],g=l[2],p=l[3],m=l[4],M=l[5],x=t.split(" "),E=parseFloat(x[0])||0,R=parseFloat(x[1])||0,A,T,C,S;n?l!==Aa&&(T=c*p-_*g)&&(C=E*(p/T)+R*(-g/T)+(g*M-p*m)/T,S=E*(-_/T)+R*(c/T)-(c*M-_*m)/T,E=C,R=S):(A=um(e),E=A.x+(~x[0].indexOf("%")?E/100*A.width:E),R=A.y+(~(x[1]||x[0]).indexOf("%")?R/100*A.height:R)),i||i!==!1&&a.smooth?(m=E-u,M=R-h,a.xOffset=f+(m*c+M*g)-m,a.yOffset=d+(m*_+M*p)-M):a.xOffset=a.yOffset=0,a.xOrigin=E,a.yOrigin=R,a.smooth=!!i,a.origin=t,a.originIsAbsolute=!!n,e.style[Cn]="0px 0px",o&&(Sr(o,a,"xOrigin",u,E),Sr(o,a,"yOrigin",h,R),Sr(o,a,"xOffset",f,a.xOffset),Sr(o,a,"yOffset",d,a.yOffset)),e.setAttribute("data-svg-origin",E+" "+R)},Ra=function(e,t){var n=e._gsap||new jp(e);if("x"in n&&!t&&!n.uncache)return n;var i=e.style,s=n.scaleX<0,o="px",a="deg",l=getComputedStyle(e),u=Ri(e,Cn)||"0",h,f,d,c,_,g,p,m,M,x,E,R,A,T,C,S,v,I,O,L,X,K,ee,j,V,re,P,ce,Te,Fe,Y,ue;return h=f=d=g=p=m=M=x=E=0,c=_=1,n.svg=!!(e.getCTM&&hm(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[Lt]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[Lt]!=="none"?l[Lt]:"")),i.scale=i.rotate=i.translate="none"),T=Eh(e,n.svg),n.svg&&(n.uncache?(V=e.getBBox(),u=n.xOrigin-V.x+"px "+(n.yOrigin-V.y)+"px",j=""):j=!t&&e.getAttribute("data-svg-origin"),Fu(e,j||u,!!j||n.originIsAbsolute,n.smooth!==!1,T)),R=n.xOrigin||0,A=n.yOrigin||0,T!==Aa&&(I=T[0],O=T[1],L=T[2],X=T[3],h=K=T[4],f=ee=T[5],T.length===6?(c=Math.sqrt(I*I+O*O),_=Math.sqrt(X*X+L*L),g=I||O?Ds(O,I)*Qr:0,M=L||X?Ds(L,X)*Qr+g:0,M&&(_*=Math.abs(Math.cos(M*ho))),n.svg&&(h-=R-(R*I+A*L),f-=A-(R*O+A*X))):(ue=T[6],Fe=T[7],P=T[8],ce=T[9],Te=T[10],Y=T[11],h=T[12],f=T[13],d=T[14],C=Ds(ue,Te),p=C*Qr,C&&(S=Math.cos(-C),v=Math.sin(-C),j=K*S+P*v,V=ee*S+ce*v,re=ue*S+Te*v,P=K*-v+P*S,ce=ee*-v+ce*S,Te=ue*-v+Te*S,Y=Fe*-v+Y*S,K=j,ee=V,ue=re),C=Ds(-L,Te),m=C*Qr,C&&(S=Math.cos(-C),v=Math.sin(-C),j=I*S-P*v,V=O*S-ce*v,re=L*S-Te*v,Y=X*v+Y*S,I=j,O=V,L=re),C=Ds(O,I),g=C*Qr,C&&(S=Math.cos(C),v=Math.sin(C),j=I*S+O*v,V=K*S+ee*v,O=O*S-I*v,ee=ee*S-K*v,I=j,K=V),p&&Math.abs(p)+Math.abs(g)>359.9&&(p=g=0,m=180-m),c=Nt(Math.sqrt(I*I+O*O+L*L)),_=Nt(Math.sqrt(ee*ee+ue*ue)),C=Ds(K,ee),M=Math.abs(C)>2e-4?C*Qr:0,E=Y?1/(Y<0?-Y:Y):0),n.svg&&(j=e.getAttribute("transform"),n.forceCSS=e.setAttribute("transform","")||!dm(Ri(e,Lt)),j&&e.setAttribute("transform",j))),Math.abs(M)>90&&Math.abs(M)<270&&(s?(c*=-1,M+=g<=0?180:-180,g+=g<=0?180:-180):(_*=-1,M+=M<=0?180:-180)),t=t||n.uncache,n.x=h-((n.xPercent=h&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-h)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+o,n.y=f-((n.yPercent=f&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-f)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+o,n.z=d+o,n.scaleX=Nt(c),n.scaleY=Nt(_),n.rotation=Nt(g)+a,n.rotationX=Nt(p)+a,n.rotationY=Nt(m)+a,n.skewX=M+a,n.skewY=x+a,n.transformPerspective=E+o,(n.zOrigin=parseFloat(u.split(" ")[2])||!t&&n.zOrigin||0)&&(i[Cn]=$l(u)),n.xOffset=n.yOffset=0,n.force3D=Hn.force3D,n.renderTransform=n.svg?r0:cm?pm:i0,n.uncache=0,n},$l=function(e){return(e=e.split(" "))[0]+" "+e[1]},Pc=function(e,t,n){var i=cn(t);return Nt(parseFloat(t)+parseFloat(Ur(e,"x",n+"px",i)))+i},i0=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,pm(e,t)},Gr="0deg",Fo="0px",Wr=") ",pm=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.z,u=n.rotation,h=n.rotationY,f=n.rotationX,d=n.skewX,c=n.skewY,_=n.scaleX,g=n.scaleY,p=n.transformPerspective,m=n.force3D,M=n.target,x=n.zOrigin,E="",R=m==="auto"&&e&&e!==1||m===!0;if(x&&(f!==Gr||h!==Gr)){var A=parseFloat(h)*ho,T=Math.sin(A),C=Math.cos(A),S;A=parseFloat(f)*ho,S=Math.cos(A),o=Pc(M,o,T*S*-x),a=Pc(M,a,-Math.sin(A)*-x),l=Pc(M,l,C*S*-x+x)}p!==Fo&&(E+="perspective("+p+Wr),(i||s)&&(E+="translate("+i+"%, "+s+"%) "),(R||o!==Fo||a!==Fo||l!==Fo)&&(E+=l!==Fo||R?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+Wr),u!==Gr&&(E+="rotate("+u+Wr),h!==Gr&&(E+="rotateY("+h+Wr),f!==Gr&&(E+="rotateX("+f+Wr),(d!==Gr||c!==Gr)&&(E+="skew("+d+", "+c+Wr),(_!==1||g!==1)&&(E+="scale("+_+", "+g+Wr),M.style[Lt]=E||"translate(0, 0)"},r0=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.rotation,u=n.skewX,h=n.skewY,f=n.scaleX,d=n.scaleY,c=n.target,_=n.xOrigin,g=n.yOrigin,p=n.xOffset,m=n.yOffset,M=n.forceCSS,x=parseFloat(o),E=parseFloat(a),R,A,T,C,S;l=parseFloat(l),u=parseFloat(u),h=parseFloat(h),h&&(h=parseFloat(h),u+=h,l+=h),l||u?(l*=ho,u*=ho,R=Math.cos(l)*f,A=Math.sin(l)*f,T=Math.sin(l-u)*-d,C=Math.cos(l-u)*d,u&&(h*=ho,S=Math.tan(u-h),S=Math.sqrt(1+S*S),T*=S,C*=S,h&&(S=Math.tan(h),S=Math.sqrt(1+S*S),R*=S,A*=S)),R=Nt(R),A=Nt(A),T=Nt(T),C=Nt(C)):(R=f,C=d,A=T=0),(x&&!~(o+"").indexOf("px")||E&&!~(a+"").indexOf("px"))&&(x=Ur(c,"x",o,"px"),E=Ur(c,"y",a,"px")),(_||g||p||m)&&(x=Nt(x+_-(_*R+g*T)+p),E=Nt(E+g-(_*A+g*C)+m)),(i||s)&&(S=c.getBBox(),x=Nt(x+i/100*S.width),E=Nt(E+s/100*S.height)),S="matrix("+R+","+A+","+T+","+C+","+x+","+E+")",c.setAttribute("transform",S),M&&(c.style[Lt]=S)},s0=function(e,t,n,i,s){var o=360,a=Jt(s),l=parseFloat(s)*(a&&~s.indexOf("rad")?Qr:1),u=l-i,h=i+u+"deg",f,d;return a&&(f=s.split("_")[1],f==="short"&&(u%=o,u!==u%(o/2)&&(u+=u<0?o:-o)),f==="cw"&&u<0?u=(u+o*nf)%o-~~(u/o)*o:f==="ccw"&&u>0&&(u=(u-o*nf)%o-~~(u/o)*o)),e._pt=d=new Rn(e._pt,t,n,i,u,V_),d.e=h,d.u="deg",e._props.push(n),d},cf=function(e,t){for(var n in t)e[n]=t[n];return e},o0=function(e,t,n){var i=cf({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=n.style,a,l,u,h,f,d,c,_;i.svg?(u=n.getAttribute("transform"),n.setAttribute("transform",""),o[Lt]=t,a=Ra(n,1),Ss(n,Lt),n.setAttribute("transform",u)):(u=getComputedStyle(n)[Lt],o[Lt]=t,a=Ra(n,1),o[Lt]=u);for(l in ir)u=i[l],h=a[l],u!==h&&s.indexOf(l)<0&&(c=cn(u),_=cn(h),f=c!==_?Ur(n,l,u,_):parseFloat(u),d=parseFloat(h),e._pt=new Rn(e._pt,a,l,f,d-f,Uu),e._pt.u=_||0,e._props.push(l));cf(a,i)};An("padding,margin,Width,Radius",function(r,e){var t="Top",n="Right",i="Bottom",s="Left",o=(e<3?[t,n,i,s]:[t+s,t+n,i+n,i+s]).map(function(a){return e<2?r+a:"border"+a+r});ql[e>1?"border"+r:r]=function(a,l,u,h,f){var d,c;if(arguments.length<4)return d=o.map(function(_){return Wi(a,_,u)}),c=d.join(" "),c.split(d[0]).length===5?d[0]:c;d=(h+"").split(" "),c={},o.forEach(function(_,g){return c[_]=d[g]=d[g]||d[(g-1)/2|0]}),a.init(l,c,f)}});var mm={name:"css",register:Ou,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,i,s){var o=this._props,a=e.style,l=n.vars.startAt,u,h,f,d,c,_,g,p,m,M,x,E,R,A,T,C;yh||Ou(),this.styles=this.styles||lm(e),C=this.styles.props,this.tween=n;for(g in t)if(g!=="autoRound"&&(h=t[g],!(On[g]&&Zp(g,t,n,i,e,s)))){if(c=typeof h,_=ql[g],c==="function"&&(h=h.call(n,i,e,s),c=typeof h),c==="string"&&~h.indexOf("random(")&&(h=Ta(h)),_)_(this,e,g,h,n)&&(T=1);else if(g.substr(0,2)==="--")u=(getComputedStyle(e).getPropertyValue(g)+"").trim(),h+="",Rr.lastIndex=0,Rr.test(u)||(p=cn(u),m=cn(h)),m?p!==m&&(u=Ur(e,g,u,m)+m):p&&(h+=p),this.add(a,"setProperty",u,h,i,s,0,0,g),o.push(g),C.push(g,0,a[g]);else if(c!=="undefined"){if(l&&g in l?(u=typeof l[g]=="function"?l[g].call(n,i,e,s):l[g],Jt(u)&&~u.indexOf("random(")&&(u=Ta(u)),cn(u+"")||u==="auto"||(u+=Hn.units[g]||cn(Wi(e,g))||""),(u+"").charAt(1)==="="&&(u=Wi(e,g))):u=Wi(e,g),d=parseFloat(u),M=c==="string"&&h.charAt(1)==="="&&h.substr(0,2),M&&(h=h.substr(2)),f=parseFloat(h),g in Ei&&(g==="autoAlpha"&&(d===1&&Wi(e,"visibility")==="hidden"&&f&&(d=0),C.push("visibility",0,a.visibility),Sr(this,a,"visibility",d?"inherit":"hidden",f?"inherit":"hidden",!f)),g!=="scale"&&g!=="transform"&&(g=Ei[g],~g.indexOf(",")&&(g=g.split(",")[0]))),x=g in ir,x){if(this.styles.save(g),E||(R=e._gsap,R.renderTransform&&!t.parseTransform||Ra(e,t.parseTransform),A=t.smoothOrigin!==!1&&R.smooth,E=this._pt=new Rn(this._pt,a,Lt,0,1,R.renderTransform,R,0,-1),E.dep=1),g==="scale")this._pt=new Rn(this._pt,R,"scaleY",R.scaleY,(M?co(R.scaleY,M+f):f)-R.scaleY||0,Uu),this._pt.u=0,o.push("scaleY",g),g+="X";else if(g==="transformOrigin"){C.push(Cn,0,a[Cn]),h=t0(h),R.svg?Fu(e,h,0,A,0,this):(m=parseFloat(h.split(" ")[2])||0,m!==R.zOrigin&&Sr(this,R,"zOrigin",R.zOrigin,m),Sr(this,a,g,$l(u),$l(h)));continue}else if(g==="svgOrigin"){Fu(e,h,1,A,0,this);continue}else if(g in fm){s0(this,R,g,d,M?co(d,M+h):h);continue}else if(g==="smoothOrigin"){Sr(this,R,"smooth",R.smooth,h);continue}else if(g==="force3D"){R[g]=h;continue}else if(g==="transform"){o0(this,h,e);continue}}else g in a||(g=wo(g)||g);if(x||(f||f===0)&&(d||d===0)&&!H_.test(h)&&g in a)p=(u+"").substr((d+"").length),f||(f=0),m=cn(h)||(g in Hn.units?Hn.units[g]:p),p!==m&&(d=Ur(e,g,u,m)),this._pt=new Rn(this._pt,x?R:a,g,d,(M?co(d,M+f):f)-d,!x&&(m==="px"||g==="zIndex")&&t.autoRound!==!1?W_:Uu),this._pt.u=m||0,p!==m&&m!=="%"&&(this._pt.b=u,this._pt.r=G_);else if(g in a)e0.call(this,e,g,u,M?M+h:h);else if(g in e)this.add(e,g,u||e[g],M?M+h:h,i,s);else if(g!=="parseTransform"){hh(g,h);continue}x||(g in a?C.push(g,0,a[g]):C.push(g,1,u||e[g])),o.push(g)}}T&&im(this)},render:function(e,t){if(t.tween._time||!Sh())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:Wi,aliases:Ei,getSetter:function(e,t,n){var i=Ei[t];return i&&i.indexOf(",")<0&&(t=i),t in ir&&t!==Cn&&(e._gsap.x||Wi(e,"x"))?n&&tf===n?t==="scale"?$_:q_:(tf=n||{})&&(t==="scale"?K_:j_):e.style&&!lh(e.style[t])?X_:~t.indexOf("-")?Y_:vh(e,t)},core:{_removeProperty:Ss,_getMatrix:Eh}};Ln.utils.checkPrefix=wo;Ln.core.getStyleSaver=lm;(function(r,e,t,n){var i=An(r+","+e+","+t,function(s){ir[s]=1});An(e,function(s){Hn.units[s]="deg",fm[s]=1}),Ei[i[13]]=r+","+e,An(n,function(s){var o=s.split(":");Ei[o[1]]=i[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");An("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(r){Hn.units[r]="px"});Ln.registerPlugin(mm);var et=Ln.registerPlugin(mm)||Ln;et.core.Tween;function a0(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function l0(r,e,t){return e&&a0(r.prototype,e),r}/*!
 * Observer 3.12.5
 * https://gsap.com
 *
 * @license Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Qt,Dl,Bn,Mr,Er,fo,gm,es,aa,_m,$i,li,vm,xm=function(){return Qt||typeof window<"u"&&(Qt=window.gsap)&&Qt.registerPlugin&&Qt},ym=1,ao=[],ft=[],Ci=[],la=Date.now,Bu=function(e,t){return t},c0=function(){var e=aa.core,t=e.bridge||{},n=e._scrollers,i=e._proxies;n.push.apply(n,ft),i.push.apply(i,Ci),ft=n,Ci=i,Bu=function(o,a){return t[o](a)}},Cr=function(e,t){return~Ci.indexOf(e)&&Ci[Ci.indexOf(e)+1][t]},ca=function(e){return!!~_m.indexOf(e)},pn=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:i!==!1,capture:!!s})},dn=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},Xa="scrollLeft",Ya="scrollTop",zu=function(){return $i&&$i.isPressed||ft.cache++},Kl=function(e,t){var n=function i(s){if(s||s===0){ym&&(Bn.history.scrollRestoration="manual");var o=$i&&$i.isPressed;s=i.v=Math.round(s)||($i&&$i.iOS?1:0),e(s),i.cacheID=ft.cache,o&&Bu("ss",s)}else(t||ft.cache!==i.cacheID||Bu("ref"))&&(i.cacheID=ft.cache,i.v=e());return i.v+i.offset};return n.offset=0,e&&n},Sn={s:Xa,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:Kl(function(r){return arguments.length?Bn.scrollTo(r,Wt.sc()):Bn.pageXOffset||Mr[Xa]||Er[Xa]||fo[Xa]||0})},Wt={s:Ya,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:Sn,sc:Kl(function(r){return arguments.length?Bn.scrollTo(Sn.sc(),r):Bn.pageYOffset||Mr[Ya]||Er[Ya]||fo[Ya]||0})},bn=function(e,t){return(t&&t._ctx&&t._ctx.selector||Qt.utils.toArray)(e)[0]||(typeof e=="string"&&Qt.config().nullTargetWarn!==!1?console.warn("Element not found:",e):null)},Nr=function(e,t){var n=t.s,i=t.sc;ca(e)&&(e=Mr.scrollingElement||Er);var s=ft.indexOf(e),o=i===Wt.sc?1:2;!~s&&(s=ft.push(e)-1),ft[s+o]||pn(e,"scroll",zu);var a=ft[s+o],l=a||(ft[s+o]=Kl(Cr(e,n),!0)||(ca(e)?i:Kl(function(u){return arguments.length?e[n]=u:e[n]})));return l.target=e,a||(l.smooth=Qt.getProperty(e,"scrollBehavior")==="smooth"),l},ku=function(e,t,n){var i=e,s=e,o=la(),a=o,l=t||50,u=Math.max(500,l*3),h=function(_,g){var p=la();g||p-o>l?(s=i,i=_,a=o,o=p):n?i+=_:i=s+(_-s)/(p-a)*(o-a)},f=function(){s=i=n?0:i,a=o=0},d=function(_){var g=a,p=s,m=la();return(_||_===0)&&_!==i&&h(_),o===a||m-a>u?0:(i+(n?p:-p))/((n?m:o)-g)*1e3};return{update:h,reset:f,getVelocity:d}},Bo=function(e,t){return t&&!e._gsapAllow&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},uf=function(e){var t=Math.max.apply(Math,e),n=Math.min.apply(Math,e);return Math.abs(t)>=Math.abs(n)?t:n},Sm=function(){aa=Qt.core.globals().ScrollTrigger,aa&&aa.core&&c0()},Mm=function(e){return Qt=e||xm(),!Dl&&Qt&&typeof document<"u"&&document.body&&(Bn=window,Mr=document,Er=Mr.documentElement,fo=Mr.body,_m=[Bn,Mr,Er,fo],Qt.utils.clamp,vm=Qt.core.context||function(){},es="onpointerenter"in fo?"pointer":"mouse",gm=Ot.isTouch=Bn.matchMedia&&Bn.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in Bn||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,li=Ot.eventTypes=("ontouchstart"in Er?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in Er?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return ym=0},500),Sm(),Dl=1),Dl};Sn.op=Wt;ft.cache=0;var Ot=function(){function r(t){this.init(t)}var e=r.prototype;return e.init=function(n){Dl||Mm(Qt)||console.warn("Please gsap.registerPlugin(Observer)"),aa||Sm();var i=n.tolerance,s=n.dragMinimum,o=n.type,a=n.target,l=n.lineHeight,u=n.debounce,h=n.preventDefault,f=n.onStop,d=n.onStopDelay,c=n.ignore,_=n.wheelSpeed,g=n.event,p=n.onDragStart,m=n.onDragEnd,M=n.onDrag,x=n.onPress,E=n.onRelease,R=n.onRight,A=n.onLeft,T=n.onUp,C=n.onDown,S=n.onChangeX,v=n.onChangeY,I=n.onChange,O=n.onToggleX,L=n.onToggleY,X=n.onHover,K=n.onHoverEnd,ee=n.onMove,j=n.ignoreCheck,V=n.isNormalizer,re=n.onGestureStart,P=n.onGestureEnd,ce=n.onWheel,Te=n.onEnable,Fe=n.onDisable,Y=n.onClick,ue=n.scrollSpeed,ve=n.capture,fe=n.allowClicks,Le=n.lockAxis,Be=n.onLockAxis;this.target=a=bn(a)||Er,this.vars=n,c&&(c=Qt.utils.toArray(c)),i=i||1e-9,s=s||0,_=_||1,ue=ue||1,o=o||"wheel,touch,pointer",u=u!==!1,l||(l=parseFloat(Bn.getComputedStyle(fo).lineHeight)||22);var H,Ye,De,Ue,ye,Me,ke,k=this,Ke=0,D=0,b=n.passive||!h,J=Nr(a,Sn),ne=Nr(a,Wt),ae=J(),le=ne(),we=~o.indexOf("touch")&&!~o.indexOf("pointer")&&li[0]==="pointerdown",me=ca(a),he=a.ownerDocument||Mr,ze=[0,0,0],pe=[0,0,0],Ie=0,nt=function(){return Ie=la()},Ce=function(W,oe){return(k.event=W)&&c&&~c.indexOf(W.target)||oe&&we&&W.pointerType!=="touch"||j&&j(W,oe)},Re=function(){k._vx.reset(),k._vy.reset(),Ye.pause(),f&&f(k)},qe=function(){var W=k.deltaX=uf(ze),oe=k.deltaY=uf(pe),Q=Math.abs(W)>=i,_e=Math.abs(oe)>=i;I&&(Q||_e)&&I(k,W,oe,ze,pe),Q&&(R&&k.deltaX>0&&R(k),A&&k.deltaX<0&&A(k),S&&S(k),O&&k.deltaX<0!=Ke<0&&O(k),Ke=k.deltaX,ze[0]=ze[1]=ze[2]=0),_e&&(C&&k.deltaY>0&&C(k),T&&k.deltaY<0&&T(k),v&&v(k),L&&k.deltaY<0!=D<0&&L(k),D=k.deltaY,pe[0]=pe[1]=pe[2]=0),(Ue||De)&&(ee&&ee(k),De&&(M(k),De=!1),Ue=!1),Me&&!(Me=!1)&&Be&&Be(k),ye&&(ce(k),ye=!1),H=0},je=function(W,oe,Q){ze[Q]+=W,pe[Q]+=oe,k._vx.update(W),k._vy.update(oe),u?H||(H=requestAnimationFrame(qe)):qe()},rt=function(W,oe){Le&&!ke&&(k.axis=ke=Math.abs(W)>Math.abs(oe)?"x":"y",Me=!0),ke!=="y"&&(ze[2]+=W,k._vx.update(W,!0)),ke!=="x"&&(pe[2]+=oe,k._vy.update(oe,!0)),u?H||(H=requestAnimationFrame(qe)):qe()},$e=function(W){if(!Ce(W,1)){W=Bo(W,h);var oe=W.clientX,Q=W.clientY,_e=oe-k.x,se=Q-k.y,Ee=k.isDragging;k.x=oe,k.y=Q,(Ee||Math.abs(k.startX-oe)>=s||Math.abs(k.startY-Q)>=s)&&(M&&(De=!0),Ee||(k.isDragging=!0),rt(_e,se),Ee||p&&p(k))}},y=k.onPress=function(F){Ce(F,1)||F&&F.button||(k.axis=ke=null,Ye.pause(),k.isPressed=!0,F=Bo(F),Ke=D=0,k.startX=k.x=F.clientX,k.startY=k.y=F.clientY,k._vx.reset(),k._vy.reset(),pn(V?a:he,li[1],$e,b,!0),k.deltaX=k.deltaY=0,x&&x(k))},N=k.onRelease=function(F){if(!Ce(F,1)){dn(V?a:he,li[1],$e,!0);var W=!isNaN(k.y-k.startY),oe=k.isDragging,Q=oe&&(Math.abs(k.x-k.startX)>3||Math.abs(k.y-k.startY)>3),_e=Bo(F);!Q&&W&&(k._vx.reset(),k._vy.reset(),h&&fe&&Qt.delayedCall(.08,function(){if(la()-Ie>300&&!F.defaultPrevented){if(F.target.click)F.target.click();else if(he.createEvent){var se=he.createEvent("MouseEvents");se.initMouseEvent("click",!0,!0,Bn,1,_e.screenX,_e.screenY,_e.clientX,_e.clientY,!1,!1,!1,!1,0,null),F.target.dispatchEvent(se)}}})),k.isDragging=k.isGesturing=k.isPressed=!1,f&&oe&&!V&&Ye.restart(!0),m&&oe&&m(k),E&&E(k,Q)}},q=function(W){return W.touches&&W.touches.length>1&&(k.isGesturing=!0)&&re(W,k.isDragging)},ie=function(){return(k.isGesturing=!1)||P(k)},de=function(W){if(!Ce(W)){var oe=J(),Q=ne();je((oe-ae)*ue,(Q-le)*ue,1),ae=oe,le=Q,f&&Ye.restart(!0)}},We=function(W){if(!Ce(W)){W=Bo(W,h),ce&&(ye=!0);var oe=(W.deltaMode===1?l:W.deltaMode===2?Bn.innerHeight:1)*_;je(W.deltaX*oe,W.deltaY*oe,0),f&&!V&&Ye.restart(!0)}},Ze=function(W){if(!Ce(W)){var oe=W.clientX,Q=W.clientY,_e=oe-k.x,se=Q-k.y;k.x=oe,k.y=Q,Ue=!0,f&&Ye.restart(!0),(_e||se)&&rt(_e,se)}},Se=function(W){k.event=W,X(k)},U=function(W){k.event=W,K(k)},te=function(W){return Ce(W)||Bo(W,h)&&Y(k)};Ye=k._dc=Qt.delayedCall(d||.25,Re).pause(),k.deltaX=k.deltaY=0,k._vx=ku(0,50,!0),k._vy=ku(0,50,!0),k.scrollX=J,k.scrollY=ne,k.isDragging=k.isGesturing=k.isPressed=!1,vm(this),k.enable=function(F){return k.isEnabled||(pn(me?he:a,"scroll",zu),o.indexOf("scroll")>=0&&pn(me?he:a,"scroll",de,b,ve),o.indexOf("wheel")>=0&&pn(a,"wheel",We,b,ve),(o.indexOf("touch")>=0&&gm||o.indexOf("pointer")>=0)&&(pn(a,li[0],y,b,ve),pn(he,li[2],N),pn(he,li[3],N),fe&&pn(a,"click",nt,!0,!0),Y&&pn(a,"click",te),re&&pn(he,"gesturestart",q),P&&pn(he,"gestureend",ie),X&&pn(a,es+"enter",Se),K&&pn(a,es+"leave",U),ee&&pn(a,es+"move",Ze)),k.isEnabled=!0,F&&F.type&&y(F),Te&&Te(k)),k},k.disable=function(){k.isEnabled&&(ao.filter(function(F){return F!==k&&ca(F.target)}).length||dn(me?he:a,"scroll",zu),k.isPressed&&(k._vx.reset(),k._vy.reset(),dn(V?a:he,li[1],$e,!0)),dn(me?he:a,"scroll",de,ve),dn(a,"wheel",We,ve),dn(a,li[0],y,ve),dn(he,li[2],N),dn(he,li[3],N),dn(a,"click",nt,!0),dn(a,"click",te),dn(he,"gesturestart",q),dn(he,"gestureend",ie),dn(a,es+"enter",Se),dn(a,es+"leave",U),dn(a,es+"move",Ze),k.isEnabled=k.isPressed=k.isDragging=!1,Fe&&Fe(k))},k.kill=k.revert=function(){k.disable();var F=ao.indexOf(k);F>=0&&ao.splice(F,1),$i===k&&($i=0)},ao.push(k),V&&ca(a)&&($i=k),k.enable(g)},l0(r,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),r}();Ot.version="3.12.5";Ot.create=function(r){return new Ot(r)};Ot.register=Mm;Ot.getAll=function(){return ao.slice()};Ot.getById=function(r){return ao.filter(function(e){return e.vars.id===r})[0]};xm()&&Qt.registerPlugin(Ot);/*!
 * ScrollTrigger 3.12.5
 * https://gsap.com
 *
 * @license Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Oe,no,pt,Ct,ui,At,Em,jl,Ca,ua,qo,qa,on,hc,Hu,vn,hf,ff,io,Tm,Lc,bm,_n,Vu,wm,Am,mr,Gu,Th,po,bh,Zl,Wu,Dc,$a=1,an=Date.now,Ic=an(),ii=0,$o=0,df=function(e,t,n){var i=Nn(e)&&(e.substr(0,6)==="clamp("||e.indexOf("max")>-1);return n["_"+t+"Clamp"]=i,i?e.substr(6,e.length-7):e},pf=function(e,t){return t&&(!Nn(e)||e.substr(0,6)!=="clamp(")?"clamp("+e+")":e},u0=function r(){return $o&&requestAnimationFrame(r)},mf=function(){return hc=1},gf=function(){return hc=0},xi=function(e){return e},Ko=function(e){return Math.round(e*1e5)/1e5||0},Rm=function(){return typeof window<"u"},Cm=function(){return Oe||Rm()&&(Oe=window.gsap)&&Oe.registerPlugin&&Oe},Ms=function(e){return!!~Em.indexOf(e)},Pm=function(e){return(e==="Height"?bh:pt["inner"+e])||ui["client"+e]||At["client"+e]},Lm=function(e){return Cr(e,"getBoundingClientRect")||(Ms(e)?function(){return Fl.width=pt.innerWidth,Fl.height=bh,Fl}:function(){return Yi(e)})},h0=function(e,t,n){var i=n.d,s=n.d2,o=n.a;return(o=Cr(e,"getBoundingClientRect"))?function(){return o()[i]}:function(){return(t?Pm(s):e["client"+s])||0}},f0=function(e,t){return!t||~Ci.indexOf(e)?Lm(e):function(){return Fl}},Ti=function(e,t){var n=t.s,i=t.d2,s=t.d,o=t.a;return Math.max(0,(n="scroll"+i)&&(o=Cr(e,n))?o()-Lm(e)()[s]:Ms(e)?(ui[n]||At[n])-Pm(i):e[n]-e["offset"+i])},Ka=function(e,t){for(var n=0;n<io.length;n+=3)(!t||~t.indexOf(io[n+1]))&&e(io[n],io[n+1],io[n+2])},Nn=function(e){return typeof e=="string"},Mn=function(e){return typeof e=="function"},jo=function(e){return typeof e=="number"},ts=function(e){return typeof e=="object"},zo=function(e,t,n){return e&&e.progress(t?0:1)&&n&&e.pause()},Uc=function(e,t){if(e.enabled){var n=e._ctx?e._ctx.add(function(){return t(e)}):t(e);n&&n.totalTime&&(e.callbackAnimation=n)}},Is=Math.abs,Dm="left",Im="top",wh="right",Ah="bottom",ms="width",gs="height",ha="Right",fa="Left",da="Top",pa="Bottom",kt="padding",jn="margin",Ao="Width",Rh="Height",Vt="px",Zn=function(e){return pt.getComputedStyle(e)},d0=function(e){var t=Zn(e).position;e.style.position=t==="absolute"||t==="fixed"?t:"relative"},_f=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},Yi=function(e,t){var n=t&&Zn(e)[Hu]!=="matrix(1, 0, 0, 1, 0, 0)"&&Oe.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),i=e.getBoundingClientRect();return n&&n.progress(0).kill(),i},Jl=function(e,t){var n=t.d2;return e["offset"+n]||e["client"+n]||0},Um=function(e){var t=[],n=e.labels,i=e.duration(),s;for(s in n)t.push(n[s]/i);return t},p0=function(e){return function(t){return Oe.utils.snap(Um(e),t)}},Ch=function(e){var t=Oe.utils.snap(e),n=Array.isArray(e)&&e.slice(0).sort(function(i,s){return i-s});return n?function(i,s,o){o===void 0&&(o=.001);var a;if(!s)return t(i);if(s>0){for(i-=o,a=0;a<n.length;a++)if(n[a]>=i)return n[a];return n[a-1]}else for(a=n.length,i+=o;a--;)if(n[a]<=i)return n[a];return n[0]}:function(i,s,o){o===void 0&&(o=.001);var a=t(i);return!s||Math.abs(a-i)<o||a-i<0==s<0?a:t(s<0?i-e:i+e)}},m0=function(e){return function(t,n){return Ch(Um(e))(t,n.direction)}},ja=function(e,t,n,i){return n.split(",").forEach(function(s){return e(t,s,i)})},jt=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:!i,capture:!!s})},Kt=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},Za=function(e,t,n){n=n&&n.wheelHandler,n&&(e(t,"wheel",n),e(t,"touchmove",n))},vf={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},Ja={toggleActions:"play",anticipatePin:0},Ql={top:0,left:0,center:.5,bottom:1,right:1},Il=function(e,t){if(Nn(e)){var n=e.indexOf("="),i=~n?+(e.charAt(n-1)+1)*parseFloat(e.substr(n+1)):0;~n&&(e.indexOf("%")>n&&(i*=t/100),e=e.substr(0,n-1)),e=i+(e in Ql?Ql[e]*t:~e.indexOf("%")?parseFloat(e)*t/100:parseFloat(e)||0)}return e},Qa=function(e,t,n,i,s,o,a,l){var u=s.startColor,h=s.endColor,f=s.fontSize,d=s.indent,c=s.fontWeight,_=Ct.createElement("div"),g=Ms(n)||Cr(n,"pinType")==="fixed",p=e.indexOf("scroller")!==-1,m=g?At:n,M=e.indexOf("start")!==-1,x=M?u:h,E="border-color:"+x+";font-size:"+f+";color:"+x+";font-weight:"+c+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return E+="position:"+((p||l)&&g?"fixed;":"absolute;"),(p||l||!g)&&(E+=(i===Wt?wh:Ah)+":"+(o+parseFloat(d))+"px;"),a&&(E+="box-sizing:border-box;text-align:left;width:"+a.offsetWidth+"px;"),_._isStart=M,_.setAttribute("class","gsap-marker-"+e+(t?" marker-"+t:"")),_.style.cssText=E,_.innerText=t||t===0?e+"-"+t:e,m.children[0]?m.insertBefore(_,m.children[0]):m.appendChild(_),_._offset=_["offset"+i.op.d2],Ul(_,0,i,M),_},Ul=function(e,t,n,i){var s={display:"block"},o=n[i?"os2":"p2"],a=n[i?"p2":"os2"];e._isFlipped=i,s[n.a+"Percent"]=i?-100:0,s[n.a]=i?"1px":0,s["border"+o+Ao]=1,s["border"+a+Ao]=0,s[n.p]=t+"px",Oe.set(e,s)},ut=[],Xu={},Pa,xf=function(){return an()-ii>34&&(Pa||(Pa=requestAnimationFrame(er)))},Us=function(){(!_n||!_n.isPressed||_n.startX>At.clientWidth)&&(ft.cache++,_n?Pa||(Pa=requestAnimationFrame(er)):er(),ii||Ts("scrollStart"),ii=an())},Nc=function(){Am=pt.innerWidth,wm=pt.innerHeight},Zo=function(){ft.cache++,!on&&!bm&&!Ct.fullscreenElement&&!Ct.webkitFullscreenElement&&(!Vu||Am!==pt.innerWidth||Math.abs(pt.innerHeight-wm)>pt.innerHeight*.25)&&jl.restart(!0)},Es={},g0=[],Nm=function r(){return Kt(ot,"scrollEnd",r)||as(!0)},Ts=function(e){return Es[e]&&Es[e].map(function(t){return t()})||g0},Un=[],Om=function(e){for(var t=0;t<Un.length;t+=5)(!e||Un[t+4]&&Un[t+4].query===e)&&(Un[t].style.cssText=Un[t+1],Un[t].getBBox&&Un[t].setAttribute("transform",Un[t+2]||""),Un[t+3].uncache=1)},Ph=function(e,t){var n;for(vn=0;vn<ut.length;vn++)n=ut[vn],n&&(!t||n._ctx===t)&&(e?n.kill(1):n.revert(!0,!0));Zl=!0,t&&Om(t),t||Ts("revert")},Fm=function(e,t){ft.cache++,(t||!xn)&&ft.forEach(function(n){return Mn(n)&&n.cacheID++&&(n.rec=0)}),Nn(e)&&(pt.history.scrollRestoration=Th=e)},xn,_s=0,yf,_0=function(){if(yf!==_s){var e=yf=_s;requestAnimationFrame(function(){return e===_s&&as(!0)})}},Bm=function(){At.appendChild(po),bh=!_n&&po.offsetHeight||pt.innerHeight,At.removeChild(po)},Sf=function(e){return Ca(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(t){return t.style.display=e?"none":"block"})},as=function(e,t){if(ii&&!e&&!Zl){jt(ot,"scrollEnd",Nm);return}Bm(),xn=ot.isRefreshing=!0,ft.forEach(function(i){return Mn(i)&&++i.cacheID&&(i.rec=i())});var n=Ts("refreshInit");Tm&&ot.sort(),t||Ph(),ft.forEach(function(i){Mn(i)&&(i.smooth&&(i.target.style.scrollBehavior="auto"),i(0))}),ut.slice(0).forEach(function(i){return i.refresh()}),Zl=!1,ut.forEach(function(i){if(i._subPinOffset&&i.pin){var s=i.vars.horizontal?"offsetWidth":"offsetHeight",o=i.pin[s];i.revert(!0,1),i.adjustPinSpacing(i.pin[s]-o),i.refresh()}}),Wu=1,Sf(!0),ut.forEach(function(i){var s=Ti(i.scroller,i._dir),o=i.vars.end==="max"||i._endClamp&&i.end>s,a=i._startClamp&&i.start>=s;(o||a)&&i.setPositions(a?s-1:i.start,o?Math.max(a?s:i.start+1,s):i.end,!0)}),Sf(!1),Wu=0,n.forEach(function(i){return i&&i.render&&i.render(-1)}),ft.forEach(function(i){Mn(i)&&(i.smooth&&requestAnimationFrame(function(){return i.target.style.scrollBehavior="smooth"}),i.rec&&i(i.rec))}),Fm(Th,1),jl.pause(),_s++,xn=2,er(2),ut.forEach(function(i){return Mn(i.vars.onRefresh)&&i.vars.onRefresh(i)}),xn=ot.isRefreshing=!1,Ts("refresh")},Yu=0,Nl=1,ma,er=function(e){if(e===2||!xn&&!Zl){ot.isUpdating=!0,ma&&ma.update(0);var t=ut.length,n=an(),i=n-Ic>=50,s=t&&ut[0].scroll();if(Nl=Yu>s?-1:1,xn||(Yu=s),i&&(ii&&!hc&&n-ii>200&&(ii=0,Ts("scrollEnd")),qo=Ic,Ic=n),Nl<0){for(vn=t;vn-- >0;)ut[vn]&&ut[vn].update(0,i);Nl=1}else for(vn=0;vn<t;vn++)ut[vn]&&ut[vn].update(0,i);ot.isUpdating=!1}Pa=0},qu=[Dm,Im,Ah,wh,jn+pa,jn+ha,jn+da,jn+fa,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],Ol=qu.concat([ms,gs,"boxSizing","max"+Ao,"max"+Rh,"position",jn,kt,kt+da,kt+ha,kt+pa,kt+fa]),v0=function(e,t,n){mo(n);var i=e._gsap;if(i.spacerIsNative)mo(i.spacerState);else if(e._gsap.swappedIn){var s=t.parentNode;s&&(s.insertBefore(e,t),s.removeChild(t))}e._gsap.swappedIn=!1},Oc=function(e,t,n,i){if(!e._gsap.swappedIn){for(var s=qu.length,o=t.style,a=e.style,l;s--;)l=qu[s],o[l]=n[l];o.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(o.display="inline-block"),a[Ah]=a[wh]="auto",o.flexBasis=n.flexBasis||"auto",o.overflow="visible",o.boxSizing="border-box",o[ms]=Jl(e,Sn)+Vt,o[gs]=Jl(e,Wt)+Vt,o[kt]=a[jn]=a[Im]=a[Dm]="0",mo(i),a[ms]=a["max"+Ao]=n[ms],a[gs]=a["max"+Rh]=n[gs],a[kt]=n[kt],e.parentNode!==t&&(e.parentNode.insertBefore(t,e),t.appendChild(e)),e._gsap.swappedIn=!0}},x0=/([A-Z])/g,mo=function(e){if(e){var t=e.t.style,n=e.length,i=0,s,o;for((e.t._gsap||Oe.core.getCache(e.t)).uncache=1;i<n;i+=2)o=e[i+1],s=e[i],o?t[s]=o:t[s]&&t.removeProperty(s.replace(x0,"-$1").toLowerCase())}},el=function(e){for(var t=Ol.length,n=e.style,i=[],s=0;s<t;s++)i.push(Ol[s],n[Ol[s]]);return i.t=e,i},y0=function(e,t,n){for(var i=[],s=e.length,o=n?8:0,a;o<s;o+=2)a=e[o],i.push(a,a in t?t[a]:e[o+1]);return i.t=e.t,i},Fl={left:0,top:0},Mf=function(e,t,n,i,s,o,a,l,u,h,f,d,c,_){Mn(e)&&(e=e(l)),Nn(e)&&e.substr(0,3)==="max"&&(e=d+(e.charAt(4)==="="?Il("0"+e.substr(3),n):0));var g=c?c.time():0,p,m,M;if(c&&c.seek(0),isNaN(e)||(e=+e),jo(e))c&&(e=Oe.utils.mapRange(c.scrollTrigger.start,c.scrollTrigger.end,0,d,e)),a&&Ul(a,n,i,!0);else{Mn(t)&&(t=t(l));var x=(e||"0").split(" "),E,R,A,T;M=bn(t,l)||At,E=Yi(M)||{},(!E||!E.left&&!E.top)&&Zn(M).display==="none"&&(T=M.style.display,M.style.display="block",E=Yi(M),T?M.style.display=T:M.style.removeProperty("display")),R=Il(x[0],E[i.d]),A=Il(x[1]||"0",n),e=E[i.p]-u[i.p]-h+R+s-A,a&&Ul(a,A,i,n-A<20||a._isStart&&A>20),n-=n-A}if(_&&(l[_]=e||-.001,e<0&&(e=0)),o){var C=e+n,S=o._isStart;p="scroll"+i.d2,Ul(o,C,i,S&&C>20||!S&&(f?Math.max(At[p],ui[p]):o.parentNode[p])<=C+1),f&&(u=Yi(a),f&&(o.style[i.op.p]=u[i.op.p]-i.op.m-o._offset+Vt))}return c&&M&&(p=Yi(M),c.seek(d),m=Yi(M),c._caScrollDist=p[i.p]-m[i.p],e=e/c._caScrollDist*d),c&&c.seek(g),c?e:Math.round(e)},S0=/(webkit|moz|length|cssText|inset)/i,Ef=function(e,t,n,i){if(e.parentNode!==t){var s=e.style,o,a;if(t===At){e._stOrig=s.cssText,a=Zn(e);for(o in a)!+o&&!S0.test(o)&&a[o]&&typeof s[o]=="string"&&o!=="0"&&(s[o]=a[o]);s.top=n,s.left=i}else s.cssText=e._stOrig;Oe.core.getCache(e).uncache=1,t.appendChild(e)}},zm=function(e,t,n){var i=t,s=i;return function(o){var a=Math.round(e());return a!==i&&a!==s&&Math.abs(a-i)>3&&Math.abs(a-s)>3&&(o=a,n&&n()),s=i,i=o,o}},tl=function(e,t,n){var i={};i[t.p]="+="+n,Oe.set(e,i)},Tf=function(e,t){var n=Nr(e,t),i="_scroll"+t.p2,s=function o(a,l,u,h,f){var d=o.tween,c=l.onComplete,_={};u=u||n();var g=zm(n,u,function(){d.kill(),o.tween=0});return f=h&&f||0,h=h||a-u,d&&d.kill(),l[i]=a,l.inherit=!1,l.modifiers=_,_[i]=function(){return g(u+h*d.ratio+f*d.ratio*d.ratio)},l.onUpdate=function(){ft.cache++,o.tween&&er()},l.onComplete=function(){o.tween=0,c&&c.call(d)},d=o.tween=Oe.to(e,l),d};return e[i]=n,n.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},jt(e,"wheel",n.wheelHandler),ot.isTouch&&jt(e,"touchmove",n.wheelHandler),s},ot=function(){function r(t,n){no||r.register(Oe)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),Gu(this),this.init(t,n)}var e=r.prototype;return e.init=function(n,i){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!$o){this.update=this.refresh=this.kill=xi;return}n=_f(Nn(n)||jo(n)||n.nodeType?{trigger:n}:n,Ja);var s=n,o=s.onUpdate,a=s.toggleClass,l=s.id,u=s.onToggle,h=s.onRefresh,f=s.scrub,d=s.trigger,c=s.pin,_=s.pinSpacing,g=s.invalidateOnRefresh,p=s.anticipatePin,m=s.onScrubComplete,M=s.onSnapComplete,x=s.once,E=s.snap,R=s.pinReparent,A=s.pinSpacer,T=s.containerAnimation,C=s.fastScrollEnd,S=s.preventOverlaps,v=n.horizontal||n.containerAnimation&&n.horizontal!==!1?Sn:Wt,I=!f&&f!==0,O=bn(n.scroller||pt),L=Oe.core.getCache(O),X=Ms(O),K=("pinType"in n?n.pinType:Cr(O,"pinType")||X&&"fixed")==="fixed",ee=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],j=I&&n.toggleActions.split(" "),V="markers"in n?n.markers:Ja.markers,re=X?0:parseFloat(Zn(O)["border"+v.p2+Ao])||0,P=this,ce=n.onRefreshInit&&function(){return n.onRefreshInit(P)},Te=h0(O,X,v),Fe=f0(O,X),Y=0,ue=0,ve=0,fe=Nr(O,v),Le,Be,H,Ye,De,Ue,ye,Me,ke,k,Ke,D,b,J,ne,ae,le,we,me,he,ze,pe,Ie,nt,Ce,Re,qe,je,rt,$e,y,N,q,ie,de,We,Ze,Se,U;if(P._startClamp=P._endClamp=!1,P._dir=v,p*=45,P.scroller=O,P.scroll=T?T.time.bind(T):fe,Ye=fe(),P.vars=n,i=i||n.animation,"refreshPriority"in n&&(Tm=1,n.refreshPriority===-9999&&(ma=P)),L.tweenScroll=L.tweenScroll||{top:Tf(O,Wt),left:Tf(O,Sn)},P.tweenTo=Le=L.tweenScroll[v.p],P.scrubDuration=function(Q){q=jo(Q)&&Q,q?N?N.duration(Q):N=Oe.to(i,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:q,paused:!0,onComplete:function(){return m&&m(P)}}):(N&&N.progress(1).kill(),N=0)},i&&(i.vars.lazy=!1,i._initted&&!P.isReverted||i.vars.immediateRender!==!1&&n.immediateRender!==!1&&i.duration()&&i.render(0,!0,!0),P.animation=i.pause(),i.scrollTrigger=P,P.scrubDuration(f),$e=0,l||(l=i.vars.id)),E&&((!ts(E)||E.push)&&(E={snapTo:E}),"scrollBehavior"in At.style&&Oe.set(X?[At,ui]:O,{scrollBehavior:"auto"}),ft.forEach(function(Q){return Mn(Q)&&Q.target===(X?Ct.scrollingElement||ui:O)&&(Q.smooth=!1)}),H=Mn(E.snapTo)?E.snapTo:E.snapTo==="labels"?p0(i):E.snapTo==="labelsDirectional"?m0(i):E.directional!==!1?function(Q,_e){return Ch(E.snapTo)(Q,an()-ue<500?0:_e.direction)}:Oe.utils.snap(E.snapTo),ie=E.duration||{min:.1,max:2},ie=ts(ie)?ua(ie.min,ie.max):ua(ie,ie),de=Oe.delayedCall(E.delay||q/2||.1,function(){var Q=fe(),_e=an()-ue<500,se=Le.tween;if((_e||Math.abs(P.getVelocity())<10)&&!se&&!hc&&Y!==Q){var Ee=(Q-Ue)/J,He=i&&!I?i.totalProgress():Ee,Ne=_e?0:(He-y)/(an()-qo)*1e3||0,tt=Oe.utils.clamp(-Ee,1-Ee,Is(Ne/2)*Ne/.185),dt=Ee+(E.inertia===!1?0:tt),_t,ct,w=E,B=w.onStart,z=w.onInterrupt,$=w.onComplete;if(_t=H(dt,P),jo(_t)||(_t=dt),ct=Math.round(Ue+_t*J),Q<=ye&&Q>=Ue&&ct!==Q){if(se&&!se._initted&&se.data<=Is(ct-Q))return;E.inertia===!1&&(tt=_t-Ee),Le(ct,{duration:ie(Is(Math.max(Is(dt-He),Is(_t-He))*.185/Ne/.05||0)),ease:E.ease||"power3",data:Is(ct-Q),onInterrupt:function(){return de.restart(!0)&&z&&z(P)},onComplete:function(){P.update(),Y=fe(),i&&(N?N.resetTo("totalProgress",_t,i._tTime/i._tDur):i.progress(_t)),$e=y=i&&!I?i.totalProgress():P.progress,M&&M(P),$&&$(P)}},Q,tt*J,ct-Q-tt*J),B&&B(P,Le.tween)}}else P.isActive&&Y!==Q&&de.restart(!0)}).pause()),l&&(Xu[l]=P),d=P.trigger=bn(d||c!==!0&&c),U=d&&d._gsap&&d._gsap.stRevert,U&&(U=U(P)),c=c===!0?d:bn(c),Nn(a)&&(a={targets:d,className:a}),c&&(_===!1||_===jn||(_=!_&&c.parentNode&&c.parentNode.style&&Zn(c.parentNode).display==="flex"?!1:kt),P.pin=c,Be=Oe.core.getCache(c),Be.spacer?ne=Be.pinState:(A&&(A=bn(A),A&&!A.nodeType&&(A=A.current||A.nativeElement),Be.spacerIsNative=!!A,A&&(Be.spacerState=el(A))),Be.spacer=we=A||Ct.createElement("div"),we.classList.add("pin-spacer"),l&&we.classList.add("pin-spacer-"+l),Be.pinState=ne=el(c)),n.force3D!==!1&&Oe.set(c,{force3D:!0}),P.spacer=we=Be.spacer,rt=Zn(c),nt=rt[_+v.os2],he=Oe.getProperty(c),ze=Oe.quickSetter(c,v.a,Vt),Oc(c,we,rt),le=el(c)),V){D=ts(V)?_f(V,vf):vf,k=Qa("scroller-start",l,O,v,D,0),Ke=Qa("scroller-end",l,O,v,D,0,k),me=k["offset"+v.op.d2];var te=bn(Cr(O,"content")||O);Me=this.markerStart=Qa("start",l,te,v,D,me,0,T),ke=this.markerEnd=Qa("end",l,te,v,D,me,0,T),T&&(Se=Oe.quickSetter([Me,ke],v.a,Vt)),!K&&!(Ci.length&&Cr(O,"fixedMarkers")===!0)&&(d0(X?At:O),Oe.set([k,Ke],{force3D:!0}),Re=Oe.quickSetter(k,v.a,Vt),je=Oe.quickSetter(Ke,v.a,Vt))}if(T){var F=T.vars.onUpdate,W=T.vars.onUpdateParams;T.eventCallback("onUpdate",function(){P.update(0,0,1),F&&F.apply(T,W||[])})}if(P.previous=function(){return ut[ut.indexOf(P)-1]},P.next=function(){return ut[ut.indexOf(P)+1]},P.revert=function(Q,_e){if(!_e)return P.kill(!0);var se=Q!==!1||!P.enabled,Ee=on;se!==P.isReverted&&(se&&(We=Math.max(fe(),P.scroll.rec||0),ve=P.progress,Ze=i&&i.progress()),Me&&[Me,ke,k,Ke].forEach(function(He){return He.style.display=se?"none":"block"}),se&&(on=P,P.update(se)),c&&(!R||!P.isActive)&&(se?v0(c,we,ne):Oc(c,we,Zn(c),Ce)),se||P.update(se),on=Ee,P.isReverted=se)},P.refresh=function(Q,_e,se,Ee){if(!((on||!P.enabled)&&!_e)){if(c&&Q&&ii){jt(r,"scrollEnd",Nm);return}!xn&&ce&&ce(P),on=P,Le.tween&&!se&&(Le.tween.kill(),Le.tween=0),N&&N.pause(),g&&i&&i.revert({kill:!1}).invalidate(),P.isReverted||P.revert(!0,!0),P._subPinOffset=!1;var He=Te(),Ne=Fe(),tt=T?T.duration():Ti(O,v),dt=J<=.01,_t=0,ct=Ee||0,w=ts(se)?se.end:n.end,B=n.endTrigger||d,z=ts(se)?se.start:n.start||(n.start===0||!d?0:c?"0 0":"0 100%"),$=P.pinnedContainer=n.pinnedContainer&&bn(n.pinnedContainer,P),G=d&&Math.max(0,ut.indexOf(P))||0,xe=G,be,Pe,Xe,Qe,Ge,Ve,xt,Ft,tn,fn,st,Je,_i;for(V&&ts(se)&&(Je=Oe.getProperty(k,v.p),_i=Oe.getProperty(Ke,v.p));xe--;)Ve=ut[xe],Ve.end||Ve.refresh(0,1)||(on=P),xt=Ve.pin,xt&&(xt===d||xt===c||xt===$)&&!Ve.isReverted&&(fn||(fn=[]),fn.unshift(Ve),Ve.revert(!0,!0)),Ve!==ut[xe]&&(G--,xe--);for(Mn(z)&&(z=z(P)),z=df(z,"start",P),Ue=Mf(z,d,He,v,fe(),Me,k,P,Ne,re,K,tt,T,P._startClamp&&"_startClamp")||(c?-.001:0),Mn(w)&&(w=w(P)),Nn(w)&&!w.indexOf("+=")&&(~w.indexOf(" ")?w=(Nn(z)?z.split(" ")[0]:"")+w:(_t=Il(w.substr(2),He),w=Nn(z)?z:(T?Oe.utils.mapRange(0,T.duration(),T.scrollTrigger.start,T.scrollTrigger.end,Ue):Ue)+_t,B=d)),w=df(w,"end",P),ye=Math.max(Ue,Mf(w||(B?"100% 0":tt),B,He,v,fe()+_t,ke,Ke,P,Ne,re,K,tt,T,P._endClamp&&"_endClamp"))||-.001,_t=0,xe=G;xe--;)Ve=ut[xe],xt=Ve.pin,xt&&Ve.start-Ve._pinPush<=Ue&&!T&&Ve.end>0&&(be=Ve.end-(P._startClamp?Math.max(0,Ve.start):Ve.start),(xt===d&&Ve.start-Ve._pinPush<Ue||xt===$)&&isNaN(z)&&(_t+=be*(1-Ve.progress)),xt===c&&(ct+=be));if(Ue+=_t,ye+=_t,P._startClamp&&(P._startClamp+=_t),P._endClamp&&!xn&&(P._endClamp=ye||-.001,ye=Math.min(ye,Ti(O,v))),J=ye-Ue||(Ue-=.01)&&.001,dt&&(ve=Oe.utils.clamp(0,1,Oe.utils.normalize(Ue,ye,We))),P._pinPush=ct,Me&&_t&&(be={},be[v.a]="+="+_t,$&&(be[v.p]="-="+fe()),Oe.set([Me,ke],be)),c&&!(Wu&&P.end>=Ti(O,v)))be=Zn(c),Qe=v===Wt,Xe=fe(),pe=parseFloat(he(v.a))+ct,!tt&&ye>1&&(st=(X?Ct.scrollingElement||ui:O).style,st={style:st,value:st["overflow"+v.a.toUpperCase()]},X&&Zn(At)["overflow"+v.a.toUpperCase()]!=="scroll"&&(st.style["overflow"+v.a.toUpperCase()]="scroll")),Oc(c,we,be),le=el(c),Pe=Yi(c,!0),Ft=K&&Nr(O,Qe?Sn:Wt)(),_?(Ce=[_+v.os2,J+ct+Vt],Ce.t=we,xe=_===kt?Jl(c,v)+J+ct:0,xe&&(Ce.push(v.d,xe+Vt),we.style.flexBasis!=="auto"&&(we.style.flexBasis=xe+Vt)),mo(Ce),$&&ut.forEach(function(yt){yt.pin===$&&yt.vars.pinSpacing!==!1&&(yt._subPinOffset=!0)}),K&&fe(We)):(xe=Jl(c,v),xe&&we.style.flexBasis!=="auto"&&(we.style.flexBasis=xe+Vt)),K&&(Ge={top:Pe.top+(Qe?Xe-Ue:Ft)+Vt,left:Pe.left+(Qe?Ft:Xe-Ue)+Vt,boxSizing:"border-box",position:"fixed"},Ge[ms]=Ge["max"+Ao]=Math.ceil(Pe.width)+Vt,Ge[gs]=Ge["max"+Rh]=Math.ceil(Pe.height)+Vt,Ge[jn]=Ge[jn+da]=Ge[jn+ha]=Ge[jn+pa]=Ge[jn+fa]="0",Ge[kt]=be[kt],Ge[kt+da]=be[kt+da],Ge[kt+ha]=be[kt+ha],Ge[kt+pa]=be[kt+pa],Ge[kt+fa]=be[kt+fa],ae=y0(ne,Ge,R),xn&&fe(0)),i?(tn=i._initted,Lc(1),i.render(i.duration(),!0,!0),Ie=he(v.a)-pe+J+ct,qe=Math.abs(J-Ie)>1,K&&qe&&ae.splice(ae.length-2,2),i.render(0,!0,!0),tn||i.invalidate(!0),i.parent||i.totalTime(i.totalTime()),Lc(0)):Ie=J,st&&(st.value?st.style["overflow"+v.a.toUpperCase()]=st.value:st.style.removeProperty("overflow-"+v.a));else if(d&&fe()&&!T)for(Pe=d.parentNode;Pe&&Pe!==At;)Pe._pinOffset&&(Ue-=Pe._pinOffset,ye-=Pe._pinOffset),Pe=Pe.parentNode;fn&&fn.forEach(function(yt){return yt.revert(!1,!0)}),P.start=Ue,P.end=ye,Ye=De=xn?We:fe(),!T&&!xn&&(Ye<We&&fe(We),P.scroll.rec=0),P.revert(!1,!0),ue=an(),de&&(Y=-1,de.restart(!0)),on=0,i&&I&&(i._initted||Ze)&&i.progress()!==Ze&&i.progress(Ze||0,!0).render(i.time(),!0,!0),(dt||ve!==P.progress||T||g)&&(i&&!I&&i.totalProgress(T&&Ue<-.001&&!ve?Oe.utils.normalize(Ue,ye,0):ve,!0),P.progress=dt||(Ye-Ue)/J===ve?0:ve),c&&_&&(we._pinOffset=Math.round(P.progress*Ie)),N&&N.invalidate(),isNaN(Je)||(Je-=Oe.getProperty(k,v.p),_i-=Oe.getProperty(Ke,v.p),tl(k,v,Je),tl(Me,v,Je-(Ee||0)),tl(Ke,v,_i),tl(ke,v,_i-(Ee||0))),dt&&!xn&&P.update(),h&&!xn&&!b&&(b=!0,h(P),b=!1)}},P.getVelocity=function(){return(fe()-De)/(an()-qo)*1e3||0},P.endAnimation=function(){zo(P.callbackAnimation),i&&(N?N.progress(1):i.paused()?I||zo(i,P.direction<0,1):zo(i,i.reversed()))},P.labelToScroll=function(Q){return i&&i.labels&&(Ue||P.refresh()||Ue)+i.labels[Q]/i.duration()*J||0},P.getTrailing=function(Q){var _e=ut.indexOf(P),se=P.direction>0?ut.slice(0,_e).reverse():ut.slice(_e+1);return(Nn(Q)?se.filter(function(Ee){return Ee.vars.preventOverlaps===Q}):se).filter(function(Ee){return P.direction>0?Ee.end<=Ue:Ee.start>=ye})},P.update=function(Q,_e,se){if(!(T&&!se&&!Q)){var Ee=xn===!0?We:P.scroll(),He=Q?0:(Ee-Ue)/J,Ne=He<0?0:He>1?1:He||0,tt=P.progress,dt,_t,ct,w,B,z,$,G;if(_e&&(De=Ye,Ye=T?fe():Ee,E&&(y=$e,$e=i&&!I?i.totalProgress():Ne)),p&&c&&!on&&!$a&&ii&&(!Ne&&Ue<Ee+(Ee-De)/(an()-qo)*p?Ne=1e-4:Ne===1&&ye>Ee+(Ee-De)/(an()-qo)*p&&(Ne=.9999)),Ne!==tt&&P.enabled){if(dt=P.isActive=!!Ne&&Ne<1,_t=!!tt&&tt<1,z=dt!==_t,B=z||!!Ne!=!!tt,P.direction=Ne>tt?1:-1,P.progress=Ne,B&&!on&&(ct=Ne&&!tt?0:Ne===1?1:tt===1?2:3,I&&(w=!z&&j[ct+1]!=="none"&&j[ct+1]||j[ct],G=i&&(w==="complete"||w==="reset"||w in i))),S&&(z||G)&&(G||f||!i)&&(Mn(S)?S(P):P.getTrailing(S).forEach(function(Xe){return Xe.endAnimation()})),I||(N&&!on&&!$a?(N._dp._time-N._start!==N._time&&N.render(N._dp._time-N._start),N.resetTo?N.resetTo("totalProgress",Ne,i._tTime/i._tDur):(N.vars.totalProgress=Ne,N.invalidate().restart())):i&&i.totalProgress(Ne,!!(on&&(ue||Q)))),c){if(Q&&_&&(we.style[_+v.os2]=nt),!K)ze(Ko(pe+Ie*Ne));else if(B){if($=!Q&&Ne>tt&&ye+1>Ee&&Ee+1>=Ti(O,v),R)if(!Q&&(dt||$)){var xe=Yi(c,!0),be=Ee-Ue;Ef(c,At,xe.top+(v===Wt?be:0)+Vt,xe.left+(v===Wt?0:be)+Vt)}else Ef(c,we);mo(dt||$?ae:le),qe&&Ne<1&&dt||ze(pe+(Ne===1&&!$?Ie:0))}}E&&!Le.tween&&!on&&!$a&&de.restart(!0),a&&(z||x&&Ne&&(Ne<1||!Dc))&&Ca(a.targets).forEach(function(Xe){return Xe.classList[dt||x?"add":"remove"](a.className)}),o&&!I&&!Q&&o(P),B&&!on?(I&&(G&&(w==="complete"?i.pause().totalProgress(1):w==="reset"?i.restart(!0).pause():w==="restart"?i.restart(!0):i[w]()),o&&o(P)),(z||!Dc)&&(u&&z&&Uc(P,u),ee[ct]&&Uc(P,ee[ct]),x&&(Ne===1?P.kill(!1,1):ee[ct]=0),z||(ct=Ne===1?1:3,ee[ct]&&Uc(P,ee[ct]))),C&&!dt&&Math.abs(P.getVelocity())>(jo(C)?C:2500)&&(zo(P.callbackAnimation),N?N.progress(1):zo(i,w==="reverse"?1:!Ne,1))):I&&o&&!on&&o(P)}if(je){var Pe=T?Ee/T.duration()*(T._caScrollDist||0):Ee;Re(Pe+(k._isFlipped?1:0)),je(Pe)}Se&&Se(-Ee/T.duration()*(T._caScrollDist||0))}},P.enable=function(Q,_e){P.enabled||(P.enabled=!0,jt(O,"resize",Zo),X||jt(O,"scroll",Us),ce&&jt(r,"refreshInit",ce),Q!==!1&&(P.progress=ve=0,Ye=De=Y=fe()),_e!==!1&&P.refresh())},P.getTween=function(Q){return Q&&Le?Le.tween:N},P.setPositions=function(Q,_e,se,Ee){if(T){var He=T.scrollTrigger,Ne=T.duration(),tt=He.end-He.start;Q=He.start+tt*Q/Ne,_e=He.start+tt*_e/Ne}P.refresh(!1,!1,{start:pf(Q,se&&!!P._startClamp),end:pf(_e,se&&!!P._endClamp)},Ee),P.update()},P.adjustPinSpacing=function(Q){if(Ce&&Q){var _e=Ce.indexOf(v.d)+1;Ce[_e]=parseFloat(Ce[_e])+Q+Vt,Ce[1]=parseFloat(Ce[1])+Q+Vt,mo(Ce)}},P.disable=function(Q,_e){if(P.enabled&&(Q!==!1&&P.revert(!0,!0),P.enabled=P.isActive=!1,_e||N&&N.pause(),We=0,Be&&(Be.uncache=1),ce&&Kt(r,"refreshInit",ce),de&&(de.pause(),Le.tween&&Le.tween.kill()&&(Le.tween=0)),!X)){for(var se=ut.length;se--;)if(ut[se].scroller===O&&ut[se]!==P)return;Kt(O,"resize",Zo),X||Kt(O,"scroll",Us)}},P.kill=function(Q,_e){P.disable(Q,_e),N&&!_e&&N.kill(),l&&delete Xu[l];var se=ut.indexOf(P);se>=0&&ut.splice(se,1),se===vn&&Nl>0&&vn--,se=0,ut.forEach(function(Ee){return Ee.scroller===P.scroller&&(se=1)}),se||xn||(P.scroll.rec=0),i&&(i.scrollTrigger=null,Q&&i.revert({kill:!1}),_e||i.kill()),Me&&[Me,ke,k,Ke].forEach(function(Ee){return Ee.parentNode&&Ee.parentNode.removeChild(Ee)}),ma===P&&(ma=0),c&&(Be&&(Be.uncache=1),se=0,ut.forEach(function(Ee){return Ee.pin===c&&se++}),se||(Be.spacer=0)),n.onKill&&n.onKill(P)},ut.push(P),P.enable(!1,!1),U&&U(P),i&&i.add&&!J){var oe=P.update;P.update=function(){P.update=oe,Ue||ye||P.refresh()},Oe.delayedCall(.01,P.update),J=.01,Ue=ye=0}else P.refresh();c&&_0()},r.register=function(n){return no||(Oe=n||Cm(),Rm()&&window.document&&r.enable(),no=$o),no},r.defaults=function(n){if(n)for(var i in n)Ja[i]=n[i];return Ja},r.disable=function(n,i){$o=0,ut.forEach(function(o){return o[i?"kill":"disable"](n)}),Kt(pt,"wheel",Us),Kt(Ct,"scroll",Us),clearInterval(qa),Kt(Ct,"touchcancel",xi),Kt(At,"touchstart",xi),ja(Kt,Ct,"pointerdown,touchstart,mousedown",mf),ja(Kt,Ct,"pointerup,touchend,mouseup",gf),jl.kill(),Ka(Kt);for(var s=0;s<ft.length;s+=3)Za(Kt,ft[s],ft[s+1]),Za(Kt,ft[s],ft[s+2])},r.enable=function(){if(pt=window,Ct=document,ui=Ct.documentElement,At=Ct.body,Oe&&(Ca=Oe.utils.toArray,ua=Oe.utils.clamp,Gu=Oe.core.context||xi,Lc=Oe.core.suppressOverwrites||xi,Th=pt.history.scrollRestoration||"auto",Yu=pt.pageYOffset,Oe.core.globals("ScrollTrigger",r),At)){$o=1,po=document.createElement("div"),po.style.height="100vh",po.style.position="absolute",Bm(),u0(),Ot.register(Oe),r.isTouch=Ot.isTouch,mr=Ot.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),Vu=Ot.isTouch===1,jt(pt,"wheel",Us),Em=[pt,Ct,ui,At],Oe.matchMedia?(r.matchMedia=function(l){var u=Oe.matchMedia(),h;for(h in l)u.add(h,l[h]);return u},Oe.addEventListener("matchMediaInit",function(){return Ph()}),Oe.addEventListener("matchMediaRevert",function(){return Om()}),Oe.addEventListener("matchMedia",function(){as(0,1),Ts("matchMedia")}),Oe.matchMedia("(orientation: portrait)",function(){return Nc(),Nc})):console.warn("Requires GSAP 3.11.0 or later"),Nc(),jt(Ct,"scroll",Us);var n=At.style,i=n.borderTopStyle,s=Oe.core.Animation.prototype,o,a;for(s.revert||Object.defineProperty(s,"revert",{value:function(){return this.time(-.01,!0)}}),n.borderTopStyle="solid",o=Yi(At),Wt.m=Math.round(o.top+Wt.sc())||0,Sn.m=Math.round(o.left+Sn.sc())||0,i?n.borderTopStyle=i:n.removeProperty("border-top-style"),qa=setInterval(xf,250),Oe.delayedCall(.5,function(){return $a=0}),jt(Ct,"touchcancel",xi),jt(At,"touchstart",xi),ja(jt,Ct,"pointerdown,touchstart,mousedown",mf),ja(jt,Ct,"pointerup,touchend,mouseup",gf),Hu=Oe.utils.checkPrefix("transform"),Ol.push(Hu),no=an(),jl=Oe.delayedCall(.2,as).pause(),io=[Ct,"visibilitychange",function(){var l=pt.innerWidth,u=pt.innerHeight;Ct.hidden?(hf=l,ff=u):(hf!==l||ff!==u)&&Zo()},Ct,"DOMContentLoaded",as,pt,"load",as,pt,"resize",Zo],Ka(jt),ut.forEach(function(l){return l.enable(0,1)}),a=0;a<ft.length;a+=3)Za(Kt,ft[a],ft[a+1]),Za(Kt,ft[a],ft[a+2])}},r.config=function(n){"limitCallbacks"in n&&(Dc=!!n.limitCallbacks);var i=n.syncInterval;i&&clearInterval(qa)||(qa=i)&&setInterval(xf,i),"ignoreMobileResize"in n&&(Vu=r.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(Ka(Kt)||Ka(jt,n.autoRefreshEvents||"none"),bm=(n.autoRefreshEvents+"").indexOf("resize")===-1)},r.scrollerProxy=function(n,i){var s=bn(n),o=ft.indexOf(s),a=Ms(s);~o&&ft.splice(o,a?6:2),i&&(a?Ci.unshift(pt,i,At,i,ui,i):Ci.unshift(s,i))},r.clearMatchMedia=function(n){ut.forEach(function(i){return i._ctx&&i._ctx.query===n&&i._ctx.kill(!0,!0)})},r.isInViewport=function(n,i,s){var o=(Nn(n)?bn(n):n).getBoundingClientRect(),a=o[s?ms:gs]*i||0;return s?o.right-a>0&&o.left+a<pt.innerWidth:o.bottom-a>0&&o.top+a<pt.innerHeight},r.positionInViewport=function(n,i,s){Nn(n)&&(n=bn(n));var o=n.getBoundingClientRect(),a=o[s?ms:gs],l=i==null?a/2:i in Ql?Ql[i]*a:~i.indexOf("%")?parseFloat(i)*a/100:parseFloat(i)||0;return s?(o.left+l)/pt.innerWidth:(o.top+l)/pt.innerHeight},r.killAll=function(n){if(ut.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),n!==!0){var i=Es.killAll||[];Es={},i.forEach(function(s){return s()})}},r}();ot.version="3.12.5";ot.saveStyles=function(r){return r?Ca(r).forEach(function(e){if(e&&e.style){var t=Un.indexOf(e);t>=0&&Un.splice(t,5),Un.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),Oe.core.getCache(e),Gu())}}):Un};ot.revert=function(r,e){return Ph(!r,e)};ot.create=function(r,e){return new ot(r,e)};ot.refresh=function(r){return r?Zo():(no||ot.register())&&as(!0)};ot.update=function(r){return++ft.cache&&er(r===!0?2:0)};ot.clearScrollMemory=Fm;ot.maxScroll=function(r,e){return Ti(r,e?Sn:Wt)};ot.getScrollFunc=function(r,e){return Nr(bn(r),e?Sn:Wt)};ot.getById=function(r){return Xu[r]};ot.getAll=function(){return ut.filter(function(r){return r.vars.id!=="ScrollSmoother"})};ot.isScrolling=function(){return!!ii};ot.snapDirectional=Ch;ot.addEventListener=function(r,e){var t=Es[r]||(Es[r]=[]);~t.indexOf(e)||t.push(e)};ot.removeEventListener=function(r,e){var t=Es[r],n=t&&t.indexOf(e);n>=0&&t.splice(n,1)};ot.batch=function(r,e){var t=[],n={},i=e.interval||.016,s=e.batchMax||1e9,o=function(u,h){var f=[],d=[],c=Oe.delayedCall(i,function(){h(f,d),f=[],d=[]}).pause();return function(_){f.length||c.restart(!0),f.push(_.trigger),d.push(_),s<=f.length&&c.progress(1)}},a;for(a in e)n[a]=a.substr(0,2)==="on"&&Mn(e[a])&&a!=="onRefreshInit"?o(a,e[a]):e[a];return Mn(s)&&(s=s(),jt(ot,"refresh",function(){return s=e.batchMax()})),Ca(r).forEach(function(l){var u={};for(a in n)u[a]=n[a];u.trigger=l,t.push(ot.create(u))}),t};var bf=function(e,t,n,i){return t>i?e(i):t<0&&e(0),n>i?(i-t)/(n-t):n<0?t/(t-n):1},Fc=function r(e,t){t===!0?e.style.removeProperty("touch-action"):e.style.touchAction=t===!0?"auto":t?"pan-"+t+(Ot.isTouch?" pinch-zoom":""):"none",e===ui&&r(At,t)},nl={auto:1,scroll:1},M0=function(e){var t=e.event,n=e.target,i=e.axis,s=(t.changedTouches?t.changedTouches[0]:t).target,o=s._gsap||Oe.core.getCache(s),a=an(),l;if(!o._isScrollT||a-o._isScrollT>2e3){for(;s&&s!==At&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(nl[(l=Zn(s)).overflowY]||nl[l.overflowX]));)s=s.parentNode;o._isScroll=s&&s!==n&&!Ms(s)&&(nl[(l=Zn(s)).overflowY]||nl[l.overflowX]),o._isScrollT=a}(o._isScroll||i==="x")&&(t.stopPropagation(),t._gsapAllow=!0)},km=function(e,t,n,i){return Ot.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:t,onWheel:i=i&&M0,onPress:i,onDrag:i,onScroll:i,onEnable:function(){return n&&jt(Ct,Ot.eventTypes[0],Af,!1,!0)},onDisable:function(){return Kt(Ct,Ot.eventTypes[0],Af,!0)}})},E0=/(input|label|select|textarea)/i,wf,Af=function(e){var t=E0.test(e.target.tagName);(t||wf)&&(e._gsapAllow=!0,wf=t)},T0=function(e){ts(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";var t=e,n=t.normalizeScrollX,i=t.momentum,s=t.allowNestedScroll,o=t.onRelease,a,l,u=bn(e.target)||ui,h=Oe.core.globals().ScrollSmoother,f=h&&h.get(),d=mr&&(e.content&&bn(e.content)||f&&e.content!==!1&&!f.smooth()&&f.content()),c=Nr(u,Wt),_=Nr(u,Sn),g=1,p=(Ot.isTouch&&pt.visualViewport?pt.visualViewport.scale*pt.visualViewport.width:pt.outerWidth)/pt.innerWidth,m=0,M=Mn(i)?function(){return i(a)}:function(){return i||2.8},x,E,R=km(u,e.type,!0,s),A=function(){return E=!1},T=xi,C=xi,S=function(){l=Ti(u,Wt),C=ua(mr?1:0,l),n&&(T=ua(0,Ti(u,Sn))),x=_s},v=function(){d._gsap.y=Ko(parseFloat(d._gsap.y)+c.offset)+"px",d.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(d._gsap.y)+", 0, 1)",c.offset=c.cacheID=0},I=function(){if(E){requestAnimationFrame(A);var V=Ko(a.deltaY/2),re=C(c.v-V);if(d&&re!==c.v+c.offset){c.offset=re-c.v;var P=Ko((parseFloat(d&&d._gsap.y)||0)-c.offset);d.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+P+", 0, 1)",d._gsap.y=P+"px",c.cacheID=ft.cache,er()}return!0}c.offset&&v(),E=!0},O,L,X,K,ee=function(){S(),O.isActive()&&O.vars.scrollY>l&&(c()>l?O.progress(1)&&c(l):O.resetTo("scrollY",l))};return d&&Oe.set(d,{y:"+=0"}),e.ignoreCheck=function(j){return mr&&j.type==="touchmove"&&I()||g>1.05&&j.type!=="touchstart"||a.isGesturing||j.touches&&j.touches.length>1},e.onPress=function(){E=!1;var j=g;g=Ko((pt.visualViewport&&pt.visualViewport.scale||1)/p),O.pause(),j!==g&&Fc(u,g>1.01?!0:n?!1:"x"),L=_(),X=c(),S(),x=_s},e.onRelease=e.onGestureStart=function(j,V){if(c.offset&&v(),!V)K.restart(!0);else{ft.cache++;var re=M(),P,ce;n&&(P=_(),ce=P+re*.05*-j.velocityX/.227,re*=bf(_,P,ce,Ti(u,Sn)),O.vars.scrollX=T(ce)),P=c(),ce=P+re*.05*-j.velocityY/.227,re*=bf(c,P,ce,Ti(u,Wt)),O.vars.scrollY=C(ce),O.invalidate().duration(re).play(.01),(mr&&O.vars.scrollY>=l||P>=l-1)&&Oe.to({},{onUpdate:ee,duration:re})}o&&o(j)},e.onWheel=function(){O._ts&&O.pause(),an()-m>1e3&&(x=0,m=an())},e.onChange=function(j,V,re,P,ce){if(_s!==x&&S(),V&&n&&_(T(P[2]===V?L+(j.startX-j.x):_()+V-P[1])),re){c.offset&&v();var Te=ce[2]===re,Fe=Te?X+j.startY-j.y:c()+re-ce[1],Y=C(Fe);Te&&Fe!==Y&&(X+=Y-Fe),c(Y)}(re||V)&&er()},e.onEnable=function(){Fc(u,n?!1:"x"),ot.addEventListener("refresh",ee),jt(pt,"resize",ee),c.smooth&&(c.target.style.scrollBehavior="auto",c.smooth=_.smooth=!1),R.enable()},e.onDisable=function(){Fc(u,!0),Kt(pt,"resize",ee),ot.removeEventListener("refresh",ee),R.kill()},e.lockAxis=e.lockAxis!==!1,a=new Ot(e),a.iOS=mr,mr&&!c()&&c(1),mr&&Oe.ticker.add(xi),K=a._dc,O=Oe.to(a,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:zm(c,c(),function(){return O.pause()})},onUpdate:er,onComplete:K.vars.onComplete}),a};ot.sort=function(r){return ut.sort(r||function(e,t){return(e.vars.refreshPriority||0)*-1e6+e.start-(t.start+(t.vars.refreshPriority||0)*-1e6)})};ot.observe=function(r){return new Ot(r)};ot.normalizeScroll=function(r){if(typeof r>"u")return _n;if(r===!0&&_n)return _n.enable();if(r===!1){_n&&_n.kill(),_n=r;return}var e=r instanceof Ot?r:T0(r);return _n&&_n.target===e.target&&_n.kill(),Ms(e.target)&&(_n=e),e};ot.core={_getVelocityProp:ku,_inputObserver:km,_scrollers:ft,_proxies:Ci,bridge:{ss:function(){ii||Ts("scrollStart"),ii=an()},ref:function(){return on}}};Cm()&&Oe.registerPlugin(ot);/*!
 * matrix 3.12.5
 * https://gsap.com
 *
 * Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Ki,vs,Lh,fc,Jo,Bl,ec,ga,pi="transform",$u=pi+"Origin",Hm,Vm=function(e){var t=e.ownerDocument||e;for(!(pi in e.style)&&("msTransform"in e.style)&&(pi="msTransform",$u=pi+"Origin");t.parentNode&&(t=t.parentNode););if(vs=window,ec=new bs,t){Ki=t,Lh=t.documentElement,fc=t.body,ga=Ki.createElementNS("http://www.w3.org/2000/svg","g"),ga.style.transform="none";var n=t.createElement("div"),i=t.createElement("div"),s=t&&(t.body||t.firstElementChild);s&&s.appendChild&&(s.appendChild(n),n.appendChild(i),n.setAttribute("style","position:static;transform:translate3d(0,0,1px)"),Hm=i.offsetParent!==n,s.removeChild(n))}return t},b0=function(e){for(var t,n;e&&e!==fc;)n=e._gsap,n&&n.uncache&&n.get(e,"x"),n&&!n.scaleX&&!n.scaleY&&n.renderTransform&&(n.scaleX=n.scaleY=1e-4,n.renderTransform(1,n),t?t.push(n):t=[n]),e=e.parentNode;return t},Gm=[],Wm=[],w0=function(){return vs.pageYOffset||Ki.scrollTop||Lh.scrollTop||fc.scrollTop||0},A0=function(){return vs.pageXOffset||Ki.scrollLeft||Lh.scrollLeft||fc.scrollLeft||0},Dh=function(e){return e.ownerSVGElement||((e.tagName+"").toLowerCase()==="svg"?e:null)},R0=function r(e){if(vs.getComputedStyle(e).position==="fixed")return!0;if(e=e.parentNode,e&&e.nodeType===1)return r(e)},Bc=function r(e,t){if(e.parentNode&&(Ki||Vm(e))){var n=Dh(e),i=n?n.getAttribute("xmlns")||"http://www.w3.org/2000/svg":"http://www.w3.org/1999/xhtml",s=n?t?"rect":"g":"div",o=t!==2?0:100,a=t===3?100:0,l="position:absolute;display:block;pointer-events:none;margin:0;padding:0;",u=Ki.createElementNS?Ki.createElementNS(i.replace(/^https/,"http"),s):Ki.createElement(s);return t&&(n?(Bl||(Bl=r(e)),u.setAttribute("width",.01),u.setAttribute("height",.01),u.setAttribute("transform","translate("+o+","+a+")"),Bl.appendChild(u)):(Jo||(Jo=r(e),Jo.style.cssText=l),u.style.cssText=l+"width:0.1px;height:0.1px;top:"+a+"px;left:"+o+"px",Jo.appendChild(u))),u}throw"Need document and parent."},C0=function(e){for(var t=new bs,n=0;n<e.numberOfItems;n++)t.multiply(e.getItem(n).matrix);return t},P0=function(e){var t=e.getCTM(),n;return t||(n=e.style[pi],e.style[pi]="none",e.appendChild(ga),t=ga.getCTM(),e.removeChild(ga),n?e.style[pi]=n:e.style.removeProperty(pi.replace(/([A-Z])/g,"-$1").toLowerCase())),t||ec.clone()},L0=function(e,t){var n=Dh(e),i=e===n,s=n?Gm:Wm,o=e.parentNode,a,l,u,h,f,d;if(e===vs)return e;if(s.length||s.push(Bc(e,1),Bc(e,2),Bc(e,3)),a=n?Bl:Jo,n)i?(u=P0(e),h=-u.e/u.a,f=-u.f/u.d,l=ec):e.getBBox?(u=e.getBBox(),l=e.transform?e.transform.baseVal:{},l=l.numberOfItems?l.numberOfItems>1?C0(l):l.getItem(0).matrix:ec,h=l.a*u.x+l.c*u.y,f=l.b*u.x+l.d*u.y):(l=new bs,h=f=0),(i?n:o).appendChild(a),a.setAttribute("transform","matrix("+l.a+","+l.b+","+l.c+","+l.d+","+(l.e+h)+","+(l.f+f)+")");else{if(h=f=0,Hm)for(l=e.offsetParent,u=e;u&&(u=u.parentNode)&&u!==l&&u.parentNode;)(vs.getComputedStyle(u)[pi]+"").length>4&&(h=u.offsetLeft,f=u.offsetTop,u=0);if(d=vs.getComputedStyle(e),d.position!=="absolute"&&d.position!=="fixed")for(l=e.offsetParent;o&&o!==l;)h+=o.scrollLeft||0,f+=o.scrollTop||0,o=o.parentNode;u=a.style,u.top=e.offsetTop-f+"px",u.left=e.offsetLeft-h+"px",u[pi]=d[pi],u[$u]=d[$u],u.position=d.position==="fixed"?"fixed":"absolute",e.parentNode.appendChild(a)}return a},zc=function(e,t,n,i,s,o,a){return e.a=t,e.b=n,e.c=i,e.d=s,e.e=o,e.f=a,e},bs=function(){function r(t,n,i,s,o,a){t===void 0&&(t=1),n===void 0&&(n=0),i===void 0&&(i=0),s===void 0&&(s=1),o===void 0&&(o=0),a===void 0&&(a=0),zc(this,t,n,i,s,o,a)}var e=r.prototype;return e.inverse=function(){var n=this.a,i=this.b,s=this.c,o=this.d,a=this.e,l=this.f,u=n*o-i*s||1e-10;return zc(this,o/u,-i/u,-s/u,n/u,(s*l-o*a)/u,-(n*l-i*a)/u)},e.multiply=function(n){var i=this.a,s=this.b,o=this.c,a=this.d,l=this.e,u=this.f,h=n.a,f=n.c,d=n.b,c=n.d,_=n.e,g=n.f;return zc(this,h*i+d*o,h*s+d*a,f*i+c*o,f*s+c*a,l+_*i+g*o,u+_*s+g*a)},e.clone=function(){return new r(this.a,this.b,this.c,this.d,this.e,this.f)},e.equals=function(n){var i=this.a,s=this.b,o=this.c,a=this.d,l=this.e,u=this.f;return i===n.a&&s===n.b&&o===n.c&&a===n.d&&l===n.e&&u===n.f},e.apply=function(n,i){i===void 0&&(i={});var s=n.x,o=n.y,a=this.a,l=this.b,u=this.c,h=this.d,f=this.e,d=this.f;return i.x=s*a+o*u+f||0,i.y=s*l+o*h+d||0,i},r}();function is(r,e,t,n){if(!r||!r.parentNode||(Ki||Vm(r)).documentElement===r)return new bs;var i=b0(r),s=Dh(r),o=s?Gm:Wm,a=L0(r),l=o[0].getBoundingClientRect(),u=o[1].getBoundingClientRect(),h=o[2].getBoundingClientRect(),f=a.parentNode,d=R0(r),c=new bs((u.left-l.left)/100,(u.top-l.top)/100,(h.left-l.left)/100,(h.top-l.top)/100,l.left+(d?0:A0()),l.top+(d?0:w0()));if(f.removeChild(a),i)for(l=i.length;l--;)u=i[l],u.scaleX=u.scaleY=0,u.renderTransform(1,u);return e?c.inverse():c}function Rf(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function D0(r,e){r.prototype=Object.create(e.prototype),r.prototype.constructor=r,r.__proto__=e}var mt,Tt,zn,gi,ji,kc,Xi,Ku,Qo,Tr,Xm,ju,La,Ih,ea,ci,ta,zl,Ym,Zu,tc=0,qm=function(){return typeof window<"u"},$m=function(){return mt||qm()&&(mt=window.gsap)&&mt.registerPlugin&&mt},gr=function(e){return typeof e=="function"},_a=function(e){return typeof e=="object"},hi=function(e){return typeof e>"u"},kl=function(){return!1},va="transform",Ju="transformOrigin",ar=function(e){return Math.round(e*1e4)/1e4},ko=Array.isArray,il=function(e,t){var n=zn.createElementNS?zn.createElementNS("http://www.w3.org/1999/xhtml".replace(/^https/,"http"),e):zn.createElement(e);return n.style?n:zn.createElement(e)},Cf=180/Math.PI,Xr=1e20,I0=new bs,lr=Date.now||function(){return new Date().getTime()},xs=[],go={},U0=0,N0=/^(?:a|input|textarea|button|select)$/i,Pf=0,Ns={},Hi={},Km=function(e,t){var n={},i;for(i in e)n[i]=t?e[i]*t:e[i];return n},O0=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},Lf=function r(e,t){for(var n=e.length,i;n--;)t?e[n].style.touchAction=t:e[n].style.removeProperty("touch-action"),i=e[n].children,i&&i.length&&r(i,t)},jm=function(){return xs.forEach(function(e){return e()})},F0=function(e){xs.push(e),xs.length===1&&mt.ticker.add(jm)},Df=function(){return!xs.length&&mt.ticker.remove(jm)},If=function(e){for(var t=xs.length;t--;)xs[t]===e&&xs.splice(t,1);mt.to(Df,{overwrite:!0,delay:15,duration:0,onComplete:Df,data:"_draggable"})},B0=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},Gt=function(e,t,n,i){if(e.addEventListener){var s=La[t];i=i||(Xm?{passive:!1}:null),e.addEventListener(s||t,n,i),s&&t!==s&&e.addEventListener(t,n,i)}},zt=function(e,t,n,i){if(e.removeEventListener){var s=La[t];e.removeEventListener(s||t,n,i),s&&t!==s&&e.removeEventListener(t,n,i)}},Xn=function(e){e.preventDefault&&e.preventDefault(),e.preventManipulation&&e.preventManipulation()},z0=function(e,t){for(var n=e.length;n--;)if(e[n].identifier===t)return!0},k0=function r(e){Ih=e.touches&&tc<e.touches.length,zt(e.target,"touchend",r)},Uf=function(e){Ih=e.touches&&tc<e.touches.length,Gt(e.target,"touchend",k0)},_o=function(e){return Tt.pageYOffset||e.scrollTop||e.documentElement.scrollTop||e.body.scrollTop||0},vo=function(e){return Tt.pageXOffset||e.scrollLeft||e.documentElement.scrollLeft||e.body.scrollLeft||0},Nf=function r(e,t){Gt(e,"scroll",t),Ro(e.parentNode)||r(e.parentNode,t)},Of=function r(e,t){zt(e,"scroll",t),Ro(e.parentNode)||r(e.parentNode,t)},Ro=function(e){return!e||e===gi||e.nodeType===9||e===zn.body||e===Tt||!e.nodeType||!e.parentNode},Ff=function(e,t){var n=t==="x"?"Width":"Height",i="scroll"+n,s="client"+n;return Math.max(0,Ro(e)?Math.max(gi[i],ji[i])-(Tt["inner"+n]||gi[s]||ji[s]):e[i]-e[s])},Hc=function r(e,t){var n=Ff(e,"x"),i=Ff(e,"y");Ro(e)?e=Hi:r(e.parentNode,t),e._gsMaxScrollX=n,e._gsMaxScrollY=i,t||(e._gsScrollX=e.scrollLeft||0,e._gsScrollY=e.scrollTop||0)},Vc=function(e,t,n){var i=e.style;i&&(hi(i[t])&&(t=Qo(t,e)||t),n==null?i.removeProperty&&i.removeProperty(t.replace(/([A-Z])/g,"-$1").toLowerCase()):i[t]=n)},Da=function(e){return Tt.getComputedStyle(e instanceof Element?e:e.host||(e.parentNode||{}).host||e)},Yr={},Os=function(e){if(e===Tt)return Yr.left=Yr.top=0,Yr.width=Yr.right=gi.clientWidth||e.innerWidth||ji.clientWidth||0,Yr.height=Yr.bottom=(e.innerHeight||0)-20<gi.clientHeight?gi.clientHeight:e.innerHeight||ji.clientHeight||0,Yr;var t=e.ownerDocument||zn,n=hi(e.pageX)?!e.nodeType&&!hi(e.left)&&!hi(e.top)?e:Tr(e)[0].getBoundingClientRect():{left:e.pageX-vo(t),top:e.pageY-_o(t),right:e.pageX-vo(t)+1,bottom:e.pageY-_o(t)+1};return hi(n.right)&&!hi(n.width)?(n.right=n.left+n.width,n.bottom=n.top+n.height):hi(n.width)&&(n={width:n.right-n.left,height:n.bottom-n.top,right:n.right,left:n.left,bottom:n.bottom,top:n.top}),n},It=function(e,t,n){var i=e.vars,s=i[n],o=e._listeners[t],a;return gr(s)&&(a=s.apply(i.callbackScope||e,i[n+"Params"]||[e.pointerEvent])),o&&e.dispatchEvent(t)===!1&&(a=!1),a},Bf=function(e,t){var n=Tr(e)[0],i,s,o;return!n.nodeType&&n!==Tt?hi(e.left)?(s=e.min||e.minX||e.minRotation||0,i=e.min||e.minY||0,{left:s,top:i,width:(e.max||e.maxX||e.maxRotation||0)-s,height:(e.max||e.maxY||0)-i}):(o={x:0,y:0},{left:e.left-o.x,top:e.top-o.y,width:e.width,height:e.height}):H0(n,t)},Yn={},H0=function(e,t){t=Tr(t)[0];var n=e.getBBox&&e.ownerSVGElement,i=e.ownerDocument||zn,s,o,a,l,u,h,f,d,c,_,g,p,m;if(e===Tt)a=_o(i),s=vo(i),o=s+(i.documentElement.clientWidth||e.innerWidth||i.body.clientWidth||0),l=a+((e.innerHeight||0)-20<i.documentElement.clientHeight?i.documentElement.clientHeight:e.innerHeight||i.body.clientHeight||0);else{if(t===Tt||hi(t))return e.getBoundingClientRect();s=a=0,n?(_=e.getBBox(),g=_.width,p=_.height):(e.viewBox&&(_=e.viewBox.baseVal)&&(s=_.x||0,a=_.y||0,g=_.width,p=_.height),g||(m=Da(e),_=m.boxSizing==="border-box",g=(parseFloat(m.width)||e.clientWidth||0)+(_?0:parseFloat(m.borderLeftWidth)+parseFloat(m.borderRightWidth)),p=(parseFloat(m.height)||e.clientHeight||0)+(_?0:parseFloat(m.borderTopWidth)+parseFloat(m.borderBottomWidth)))),o=g,l=p}return e===t?{left:s,top:a,width:o-s,height:l-a}:(u=is(t,!0).multiply(is(e)),h=u.apply({x:s,y:a}),f=u.apply({x:o,y:a}),d=u.apply({x:o,y:l}),c=u.apply({x:s,y:l}),s=Math.min(h.x,f.x,d.x,c.x),a=Math.min(h.y,f.y,d.y,c.y),{left:s,top:a,width:Math.max(h.x,f.x,d.x,c.x)-s,height:Math.max(h.y,f.y,d.y,c.y)-a})},Gc=function(e,t,n,i,s,o){var a={},l,u,h;if(t)if(s!==1&&t instanceof Array){if(a.end=l=[],h=t.length,_a(t[0]))for(u=0;u<h;u++)l[u]=Km(t[u],s);else for(u=0;u<h;u++)l[u]=t[u]*s;n+=1.1,i-=1.1}else gr(t)?a.end=function(f){var d=t.call(e,f),c,_;if(s!==1)if(_a(d)){c={};for(_ in d)c[_]=d[_]*s;d=c}else d*=s;return d}:a.end=t;return(n||n===0)&&(a.max=n),(i||i===0)&&(a.min=i),o&&(a.velocity=0),a},V0=function r(e){var t;return!e||!e.getAttribute||e===ji?!1:(t=e.getAttribute("data-clickable"))==="true"||t!=="false"&&(N0.test(e.nodeName+"")||e.getAttribute("contentEditable")==="true")?!0:r(e.parentNode)},rl=function(e,t){for(var n=e.length,i;n--;)i=e[n],i.ondragstart=i.onselectstart=t?null:kl,mt.set(i,{lazy:!0,userSelect:t?"text":"none"})},G0=function r(e){if(Da(e).position==="fixed")return!0;if(e=e.parentNode,e&&e.nodeType===1)return r(e)},Zm,Qu,W0=function(e,t){e=mt.utils.toArray(e)[0],t=t||{};var n=document.createElement("div"),i=n.style,s=e.firstChild,o=0,a=0,l=e.scrollTop,u=e.scrollLeft,h=e.scrollWidth,f=e.scrollHeight,d=0,c=0,_=0,g,p,m,M,x,E;Zm&&t.force3D!==!1?(x="translate3d(",E="px,0px)"):va&&(x="translate(",E="px)"),this.scrollTop=function(R,A){if(!arguments.length)return-this.top();this.top(-R,A)},this.scrollLeft=function(R,A){if(!arguments.length)return-this.left();this.left(-R,A)},this.left=function(R,A){if(!arguments.length)return-(e.scrollLeft+a);var T=e.scrollLeft-u,C=a;if((T>2||T<-2)&&!A){u=e.scrollLeft,mt.killTweensOf(this,{left:1,scrollLeft:1}),this.left(-u),t.onKill&&t.onKill();return}R=-R,R<0?(a=R-.5|0,R=0):R>c?(a=R-c|0,R=c):a=0,(a||C)&&(this._skip||(i[va]=x+-a+"px,"+-o+E),a+d>=0&&(i.paddingRight=a+d+"px")),e.scrollLeft=R|0,u=e.scrollLeft},this.top=function(R,A){if(!arguments.length)return-(e.scrollTop+o);var T=e.scrollTop-l,C=o;if((T>2||T<-2)&&!A){l=e.scrollTop,mt.killTweensOf(this,{top:1,scrollTop:1}),this.top(-l),t.onKill&&t.onKill();return}R=-R,R<0?(o=R-.5|0,R=0):R>_?(o=R-_|0,R=_):o=0,(o||C)&&(this._skip||(i[va]=x+-a+"px,"+-o+E)),e.scrollTop=R|0,l=e.scrollTop},this.maxScrollTop=function(){return _},this.maxScrollLeft=function(){return c},this.disable=function(){for(s=n.firstChild;s;)M=s.nextSibling,e.appendChild(s),s=M;e===n.parentNode&&e.removeChild(n)},this.enable=function(){if(s=e.firstChild,s!==n){for(;s;)M=s.nextSibling,n.appendChild(s),s=M;e.appendChild(n),this.calibrate()}},this.calibrate=function(R){var A=e.clientWidth===g,T,C,S;l=e.scrollTop,u=e.scrollLeft,!(A&&e.clientHeight===p&&n.offsetHeight===m&&h===e.scrollWidth&&f===e.scrollHeight&&!R)&&((o||a)&&(C=this.left(),S=this.top(),this.left(-e.scrollLeft),this.top(-e.scrollTop)),T=Da(e),(!A||R)&&(i.display="block",i.width="auto",i.paddingRight="0px",d=Math.max(0,e.scrollWidth-e.clientWidth),d&&(d+=parseFloat(T.paddingLeft)+(Qu?parseFloat(T.paddingRight):0))),i.display="inline-block",i.position="relative",i.overflow="visible",i.verticalAlign="top",i.boxSizing="content-box",i.width="100%",i.paddingRight=d+"px",Qu&&(i.paddingBottom=T.paddingBottom),g=e.clientWidth,p=e.clientHeight,h=e.scrollWidth,f=e.scrollHeight,c=e.scrollWidth-g,_=e.scrollHeight-p,m=n.offsetHeight,i.display="block",(C||S)&&(this.left(C),this.top(S)))},this.content=n,this.element=e,this._skip=!1,this.enable()},Wc=function(e){if(qm()&&document.body){var t=window&&window.navigator;Tt=window,zn=document,gi=zn.documentElement,ji=zn.body,kc=il("div"),zl=!!window.PointerEvent,Xi=il("div"),Xi.style.cssText="visibility:hidden;height:1px;top:-1px;pointer-events:none;position:relative;clear:both;cursor:grab",ta=Xi.style.cursor==="grab"?"grab":"move",ea=t&&t.userAgent.toLowerCase().indexOf("android")!==-1,ju="ontouchstart"in gi&&"orientation"in Tt||t&&(t.MaxTouchPoints>0||t.msMaxTouchPoints>0),Qu=function(){var n=il("div"),i=il("div"),s=i.style,o=ji,a;return s.display="inline-block",s.position="relative",n.style.cssText="width:90px;height:40px;padding:10px;overflow:auto;visibility:hidden",n.appendChild(i),o.appendChild(n),a=i.offsetHeight+18>n.scrollHeight,o.removeChild(n),a}(),La=function(n){for(var i=n.split(","),s=("onpointerdown"in kc?"pointerdown,pointermove,pointerup,pointercancel":"onmspointerdown"in kc?"MSPointerDown,MSPointerMove,MSPointerUp,MSPointerCancel":n).split(","),o={},a=4;--a>-1;)o[i[a]]=s[a],o[s[a]]=i[a];try{gi.addEventListener("test",null,Object.defineProperty({},"passive",{get:function(){Xm=1}}))}catch{}return o}("touchstart,touchmove,touchend,touchcancel"),Gt(zn,"touchcancel",kl),Gt(Tt,"touchmove",kl),ji&&ji.addEventListener("touchstart",kl),Gt(zn,"contextmenu",function(){for(var n in go)go[n].isPressed&&go[n].endDrag()}),mt=Ku=$m()}mt?(ci=mt.plugins.inertia,Ym=mt.core.context||function(){},Qo=mt.utils.checkPrefix,va=Qo(va),Ju=Qo(Ju),Tr=mt.utils.toArray,Zu=mt.core.getStyleSaver,Zm=!!Qo("perspective")):e&&console.warn("Please gsap.registerPlugin(Draggable)")},X0=function(){function r(t){this._listeners={},this.target=t||this}var e=r.prototype;return e.addEventListener=function(n,i){var s=this._listeners[n]||(this._listeners[n]=[]);~s.indexOf(i)||s.push(i)},e.removeEventListener=function(n,i){var s=this._listeners[n],o=s&&s.indexOf(i);o>=0&&s.splice(o,1)},e.dispatchEvent=function(n){var i=this,s;return(this._listeners[n]||[]).forEach(function(o){return o.call(i,{type:n,target:i.target})===!1&&(s=!1)}),s},r}(),zr=function(r){D0(e,r);function e(t,n){var i;i=r.call(this)||this,Ku||Wc(1),t=Tr(t)[0],i.styles=Zu&&Zu(t,"transform,left,top"),ci||(ci=mt.plugins.inertia),i.vars=n=Km(n||{}),i.target=t,i.x=i.y=i.rotation=0,i.dragResistance=parseFloat(n.dragResistance)||0,i.edgeResistance=isNaN(n.edgeResistance)?1:parseFloat(n.edgeResistance)||0,i.lockAxis=n.lockAxis,i.autoScroll=n.autoScroll||0,i.lockedAxis=null,i.allowEventDefault=!!n.allowEventDefault,mt.getProperty(t,"x");var s=(n.type||"x,y").toLowerCase(),o=~s.indexOf("x")||~s.indexOf("y"),a=s.indexOf("rotation")!==-1,l=a?"rotation":o?"x":"left",u=o?"y":"top",h=!!(~s.indexOf("x")||~s.indexOf("left")||s==="scroll"),f=!!(~s.indexOf("y")||~s.indexOf("top")||s==="scroll"),d=n.minimumMovement||2,c=Rf(i),_=Tr(n.trigger||n.handle||t),g={},p=0,m=!1,M=n.autoScrollMarginTop||40,x=n.autoScrollMarginRight||40,E=n.autoScrollMarginBottom||40,R=n.autoScrollMarginLeft||40,A=n.clickableTest||V0,T=0,C=t._gsap||mt.core.getCache(t),S=G0(t),v=function(U,te){return parseFloat(C.get(t,U,te))},I=t.ownerDocument||zn,O,L,X,K,ee,j,V,re,P,ce,Te,Fe,Y,ue,ve,fe,Le,Be,H,Ye,De,Ue,ye,Me,ke,k,Ke,D,b,J,ne,ae,le,we=function(U){return Xn(U),U.stopImmediatePropagation&&U.stopImmediatePropagation(),!1},me=function Se(U){if(c.autoScroll&&c.isDragging&&(m||Le)){var te=t,F=c.autoScroll*15,W,oe,Q,_e,se,Ee,He,Ne;for(m=!1,Hi.scrollTop=Tt.pageYOffset!=null?Tt.pageYOffset:I.documentElement.scrollTop!=null?I.documentElement.scrollTop:I.body.scrollTop,Hi.scrollLeft=Tt.pageXOffset!=null?Tt.pageXOffset:I.documentElement.scrollLeft!=null?I.documentElement.scrollLeft:I.body.scrollLeft,_e=c.pointerX-Hi.scrollLeft,se=c.pointerY-Hi.scrollTop;te&&!oe;)oe=Ro(te.parentNode),W=oe?Hi:te.parentNode,Q=oe?{bottom:Math.max(gi.clientHeight,Tt.innerHeight||0),right:Math.max(gi.clientWidth,Tt.innerWidth||0),left:0,top:0}:W.getBoundingClientRect(),Ee=He=0,f&&(Ne=W._gsMaxScrollY-W.scrollTop,Ne<0?He=Ne:se>Q.bottom-E&&Ne?(m=!0,He=Math.min(Ne,F*(1-Math.max(0,Q.bottom-se)/E)|0)):se<Q.top+M&&W.scrollTop&&(m=!0,He=-Math.min(W.scrollTop,F*(1-Math.max(0,se-Q.top)/M)|0)),He&&(W.scrollTop+=He)),h&&(Ne=W._gsMaxScrollX-W.scrollLeft,Ne<0?Ee=Ne:_e>Q.right-x&&Ne?(m=!0,Ee=Math.min(Ne,F*(1-Math.max(0,Q.right-_e)/x)|0)):_e<Q.left+R&&W.scrollLeft&&(m=!0,Ee=-Math.min(W.scrollLeft,F*(1-Math.max(0,_e-Q.left)/R)|0)),Ee&&(W.scrollLeft+=Ee)),oe&&(Ee||He)&&(Tt.scrollTo(W.scrollLeft,W.scrollTop),q(c.pointerX+Ee,c.pointerY+He)),te=W}if(Le){var tt=c.x,dt=c.y;a?(c.deltaX=tt-parseFloat(C.rotation),c.rotation=tt,C.rotation=tt+"deg",C.renderTransform(1,C)):L?(f&&(c.deltaY=dt-L.top(),L.top(dt)),h&&(c.deltaX=tt-L.left(),L.left(tt))):o?(f&&(c.deltaY=dt-parseFloat(C.y),C.y=dt+"px"),h&&(c.deltaX=tt-parseFloat(C.x),C.x=tt+"px"),C.renderTransform(1,C)):(f&&(c.deltaY=dt-parseFloat(t.style.top||0),t.style.top=dt+"px"),h&&(c.deltaX=tt-parseFloat(t.style.left||0),t.style.left=tt+"px")),re&&!U&&!D&&(D=!0,It(c,"drag","onDrag")===!1&&(h&&(c.x-=c.deltaX),f&&(c.y-=c.deltaY),Se(!0)),D=!1)}Le=!1},he=function(U,te){var F=c.x,W=c.y,oe,Q;t._gsap||(C=mt.core.getCache(t)),C.uncache&&mt.getProperty(t,"x"),o?(c.x=parseFloat(C.x),c.y=parseFloat(C.y)):a?c.x=c.rotation=parseFloat(C.rotation):L?(c.y=L.top(),c.x=L.left()):(c.y=parseFloat(t.style.top||(Q=Da(t))&&Q.top)||0,c.x=parseFloat(t.style.left||(Q||{}).left)||0),(H||Ye||De)&&!te&&(c.isDragging||c.isThrowing)&&(De&&(Ns.x=c.x,Ns.y=c.y,oe=De(Ns),oe.x!==c.x&&(c.x=oe.x,Le=!0),oe.y!==c.y&&(c.y=oe.y,Le=!0)),H&&(oe=H(c.x),oe!==c.x&&(c.x=oe,a&&(c.rotation=oe),Le=!0)),Ye&&(oe=Ye(c.y),oe!==c.y&&(c.y=oe),Le=!0)),Le&&me(!0),U||(c.deltaX=c.x-F,c.deltaY=c.y-W,It(c,"throwupdate","onThrowUpdate"))},ze=function(U,te,F,W){return te==null&&(te=-Xr),F==null&&(F=Xr),gr(U)?function(oe){var Q=c.isPressed?1-c.edgeResistance:1;return U.call(c,(oe>F?F+(oe-F)*Q:oe<te?te+(oe-te)*Q:oe)*W)*W}:ko(U)?function(oe){for(var Q=U.length,_e=0,se=Xr,Ee,He;--Q>-1;)Ee=U[Q],He=Ee-oe,He<0&&(He=-He),He<se&&Ee>=te&&Ee<=F&&(_e=Q,se=He);return U[_e]}:isNaN(U)?function(oe){return oe}:function(){return U*W}},pe=function(U,te,F,W,oe,Q,_e){return Q=Q&&Q<Xr?Q*Q:Xr,gr(U)?function(se){var Ee=c.isPressed?1-c.edgeResistance:1,He=se.x,Ne=se.y,tt,dt,_t;return se.x=He=He>F?F+(He-F)*Ee:He<te?te+(He-te)*Ee:He,se.y=Ne=Ne>oe?oe+(Ne-oe)*Ee:Ne<W?W+(Ne-W)*Ee:Ne,tt=U.call(c,se),tt!==se&&(se.x=tt.x,se.y=tt.y),_e!==1&&(se.x*=_e,se.y*=_e),Q<Xr&&(dt=se.x-He,_t=se.y-Ne,dt*dt+_t*_t>Q&&(se.x=He,se.y=Ne)),se}:ko(U)?function(se){for(var Ee=U.length,He=0,Ne=Xr,tt,dt,_t,ct;--Ee>-1;)_t=U[Ee],tt=_t.x-se.x,dt=_t.y-se.y,ct=tt*tt+dt*dt,ct<Ne&&(He=Ee,Ne=ct);return Ne<=Q?U[He]:se}:function(se){return se}},Ie=function(){var U,te,F,W;V=!1,L?(L.calibrate(),c.minX=Te=-L.maxScrollLeft(),c.minY=Y=-L.maxScrollTop(),c.maxX=ce=c.maxY=Fe=0,V=!0):n.bounds&&(U=Bf(n.bounds,t.parentNode),a?(c.minX=Te=U.left,c.maxX=ce=U.left+U.width,c.minY=Y=c.maxY=Fe=0):!hi(n.bounds.maxX)||!hi(n.bounds.maxY)?(U=n.bounds,c.minX=Te=U.minX,c.minY=Y=U.minY,c.maxX=ce=U.maxX,c.maxY=Fe=U.maxY):(te=Bf(t,t.parentNode),c.minX=Te=Math.round(v(l,"px")+U.left-te.left),c.minY=Y=Math.round(v(u,"px")+U.top-te.top),c.maxX=ce=Math.round(Te+(U.width-te.width)),c.maxY=Fe=Math.round(Y+(U.height-te.height))),Te>ce&&(c.minX=ce,c.maxX=ce=Te,Te=c.minX),Y>Fe&&(c.minY=Fe,c.maxY=Fe=Y,Y=c.minY),a&&(c.minRotation=Te,c.maxRotation=ce),V=!0),n.liveSnap&&(F=n.liveSnap===!0?n.snap||{}:n.liveSnap,W=ko(F)||gr(F),a?(H=ze(W?F:F.rotation,Te,ce,1),Ye=null):F.points?De=pe(W?F:F.points,Te,ce,Y,Fe,F.radius,L?-1:1):(h&&(H=ze(W?F:F.x||F.left||F.scrollLeft,Te,ce,L?-1:1)),f&&(Ye=ze(W?F:F.y||F.top||F.scrollTop,Y,Fe,L?-1:1))))},nt=function(){c.isThrowing=!1,It(c,"throwcomplete","onThrowComplete")},Ce=function(){c.isThrowing=!1},Re=function(U,te){var F,W,oe,Q;U&&ci?(U===!0&&(F=n.snap||n.liveSnap||{},W=ko(F)||gr(F),U={resistance:(n.throwResistance||n.resistance||1e3)/(a?10:1)},a?U.rotation=Gc(c,W?F:F.rotation,ce,Te,1,te):(h&&(U[l]=Gc(c,W?F:F.points||F.x||F.left,ce,Te,L?-1:1,te||c.lockedAxis==="x")),f&&(U[u]=Gc(c,W?F:F.points||F.y||F.top,Fe,Y,L?-1:1,te||c.lockedAxis==="y")),(F.points||ko(F)&&_a(F[0]))&&(U.linkedProps=l+","+u,U.radius=F.radius))),c.isThrowing=!0,Q=isNaN(n.overshootTolerance)?n.edgeResistance===1?0:1-c.edgeResistance+.2:n.overshootTolerance,U.duration||(U.duration={max:Math.max(n.minDuration||0,"maxDuration"in n?n.maxDuration:2),min:isNaN(n.minDuration)?Q===0||_a(U)&&U.resistance>1e3?0:.5:n.minDuration,overshoot:Q}),c.tween=oe=mt.to(L||t,{inertia:U,data:"_draggable",inherit:!1,onComplete:nt,onInterrupt:Ce,onUpdate:n.fastMode?It:he,onUpdateParams:n.fastMode?[c,"onthrowupdate","onThrowUpdate"]:F&&F.radius?[!1,!0]:[]}),n.fastMode||(L&&(L._skip=!0),oe.render(1e9,!0,!0),he(!0,!0),c.endX=c.x,c.endY=c.y,a&&(c.endRotation=c.x),oe.play(0),he(!0,!0),L&&(L._skip=!1))):V&&c.applyBounds()},qe=function(U){var te=Me,F;Me=is(t.parentNode,!0),U&&c.isPressed&&!Me.equals(te||new bs)&&(F=te.inverse().apply({x:X,y:K}),Me.apply(F,F),X=F.x,K=F.y),Me.equals(I0)&&(Me=null)},je=function(){var U=1-c.edgeResistance,te=S?vo(I):0,F=S?_o(I):0,W,oe,Q;o&&(C.x=v(l,"px")+"px",C.y=v(u,"px")+"px",C.renderTransform()),qe(!1),Yn.x=c.pointerX-te,Yn.y=c.pointerY-F,Me&&Me.apply(Yn,Yn),X=Yn.x,K=Yn.y,Le&&(q(c.pointerX,c.pointerY),me(!0)),ae=is(t),L?(Ie(),j=L.top(),ee=L.left()):(rt()?(he(!0,!0),Ie()):c.applyBounds(),a?(W=t.ownerSVGElement?[C.xOrigin-t.getBBox().x,C.yOrigin-t.getBBox().y]:(Da(t)[Ju]||"0 0").split(" "),fe=c.rotationOrigin=is(t).apply({x:parseFloat(W[0])||0,y:parseFloat(W[1])||0}),he(!0,!0),oe=c.pointerX-fe.x-te,Q=fe.y-c.pointerY+F,ee=c.x,j=c.y=Math.atan2(Q,oe)*Cf):(j=v(u,"px"),ee=v(l,"px"))),V&&U&&(ee>ce?ee=ce+(ee-ce)/U:ee<Te&&(ee=Te-(Te-ee)/U),a||(j>Fe?j=Fe+(j-Fe)/U:j<Y&&(j=Y-(Y-j)/U))),c.startX=ee=ar(ee),c.startY=j=ar(j)},rt=function(){return c.tween&&c.tween.isActive()},$e=function(){Xi.parentNode&&!rt()&&!c.isDragging&&Xi.parentNode.removeChild(Xi)},y=function(U,te){var F;if(!O||c.isPressed||!U||(U.type==="mousedown"||U.type==="pointerdown")&&!te&&lr()-T<30&&La[c.pointerEvent.type]){ne&&U&&O&&Xn(U);return}if(ke=rt(),le=!1,c.pointerEvent=U,La[U.type]?(ye=~U.type.indexOf("touch")?U.currentTarget||U.target:I,Gt(ye,"touchend",ie),Gt(ye,"touchmove",N),Gt(ye,"touchcancel",ie),Gt(I,"touchstart",Uf)):(ye=null,Gt(I,"mousemove",N)),Ke=null,(!zl||!ye)&&(Gt(I,"mouseup",ie),U&&U.target&&Gt(U.target,"mouseup",ie)),Ue=A.call(c,U.target)&&n.dragClickables===!1&&!te,Ue){Gt(U.target,"change",ie),It(c,"pressInit","onPressInit"),It(c,"press","onPress"),rl(_,!0),ne=!1;return}if(k=!ye||h===f||c.vars.allowNativeTouchScrolling===!1||c.vars.allowContextMenu&&U&&(U.ctrlKey||U.which>2)?!1:h?"y":"x",ne=!k&&!c.allowEventDefault,ne&&(Xn(U),Gt(Tt,"touchforcechange",Xn)),U.changedTouches?(U=ue=U.changedTouches[0],ve=U.identifier):U.pointerId?ve=U.pointerId:ue=ve=null,tc++,F0(me),K=c.pointerY=U.pageY,X=c.pointerX=U.pageX,It(c,"pressInit","onPressInit"),(k||c.autoScroll)&&Hc(t.parentNode),t.parentNode&&c.autoScroll&&!L&&!a&&t.parentNode._gsMaxScrollX&&!Xi.parentNode&&!t.getBBox&&(Xi.style.width=t.parentNode.scrollWidth+"px",t.parentNode.appendChild(Xi)),je(),c.tween&&c.tween.kill(),c.isThrowing=!1,mt.killTweensOf(L||t,g,!0),L&&mt.killTweensOf(t,{scrollTo:1},!0),c.tween=c.lockedAxis=null,(n.zIndexBoost||!a&&!L&&n.zIndexBoost!==!1)&&(t.style.zIndex=e.zIndex++),c.isPressed=!0,re=!!(n.onDrag||c._listeners.drag),P=!!(n.onMove||c._listeners.move),n.cursor!==!1||n.activeCursor)for(F=_.length;--F>-1;)mt.set(_[F],{cursor:n.activeCursor||n.cursor||(ta==="grab"?"grabbing":ta)});It(c,"press","onPress")},N=function(U){var te=U,F,W,oe,Q,_e,se;if(!O||Ih||!c.isPressed||!U){ne&&U&&O&&Xn(U);return}if(c.pointerEvent=U,F=U.changedTouches,F){if(U=F[0],U!==ue&&U.identifier!==ve){for(Q=F.length;--Q>-1&&(U=F[Q]).identifier!==ve&&U.target!==t;);if(Q<0)return}}else if(U.pointerId&&ve&&U.pointerId!==ve)return;if(ye&&k&&!Ke&&(Yn.x=U.pageX-(S?vo(I):0),Yn.y=U.pageY-(S?_o(I):0),Me&&Me.apply(Yn,Yn),W=Yn.x,oe=Yn.y,_e=Math.abs(W-X),se=Math.abs(oe-K),(_e!==se&&(_e>d||se>d)||ea&&k===Ke)&&(Ke=_e>se&&h?"x":"y",k&&Ke!==k&&Gt(Tt,"touchforcechange",Xn),c.vars.lockAxisOnTouchScroll!==!1&&h&&f&&(c.lockedAxis=Ke==="x"?"y":"x",gr(c.vars.onLockAxis)&&c.vars.onLockAxis.call(c,te)),ea&&k===Ke))){ie(te);return}!c.allowEventDefault&&(!k||Ke&&k!==Ke)&&te.cancelable!==!1?(Xn(te),ne=!0):ne&&(ne=!1),c.autoScroll&&(m=!0),q(U.pageX,U.pageY,P)},q=function(U,te,F){var W=1-c.dragResistance,oe=1-c.edgeResistance,Q=c.pointerX,_e=c.pointerY,se=j,Ee=c.x,He=c.y,Ne=c.endX,tt=c.endY,dt=c.endRotation,_t=Le,ct,w,B,z,$,G;c.pointerX=U,c.pointerY=te,S&&(U-=vo(I),te-=_o(I)),a?(z=Math.atan2(fe.y-te,U-fe.x)*Cf,$=c.y-z,$>180?(j-=360,c.y=z):$<-180&&(j+=360,c.y=z),c.x!==ee||Math.abs(j-z)>d?(c.y=z,B=ee+(j-z)*W):B=ee):(Me&&(G=U*Me.a+te*Me.c+Me.e,te=U*Me.b+te*Me.d+Me.f,U=G),w=te-K,ct=U-X,w<d&&w>-d&&(w=0),ct<d&&ct>-d&&(ct=0),(c.lockAxis||c.lockedAxis)&&(ct||w)&&(G=c.lockedAxis,G||(c.lockedAxis=G=h&&Math.abs(ct)>Math.abs(w)?"y":f?"x":null,G&&gr(c.vars.onLockAxis)&&c.vars.onLockAxis.call(c,c.pointerEvent)),G==="y"?w=0:G==="x"&&(ct=0)),B=ar(ee+ct*W),z=ar(j+w*W)),(H||Ye||De)&&(c.x!==B||c.y!==z&&!a)&&(De&&(Ns.x=B,Ns.y=z,G=De(Ns),B=ar(G.x),z=ar(G.y)),H&&(B=ar(H(B))),Ye&&(z=ar(Ye(z)))),V&&(B>ce?B=ce+Math.round((B-ce)*oe):B<Te&&(B=Te+Math.round((B-Te)*oe)),a||(z>Fe?z=Math.round(Fe+(z-Fe)*oe):z<Y&&(z=Math.round(Y+(z-Y)*oe)))),(c.x!==B||c.y!==z&&!a)&&(a?(c.endRotation=c.x=c.endX=B,Le=!0):(f&&(c.y=c.endY=z,Le=!0),h&&(c.x=c.endX=B,Le=!0)),!F||It(c,"move","onMove")!==!1?!c.isDragging&&c.isPressed&&(c.isDragging=le=!0,It(c,"dragstart","onDragStart")):(c.pointerX=Q,c.pointerY=_e,j=se,c.x=Ee,c.y=He,c.endX=Ne,c.endY=tt,c.endRotation=dt,Le=_t))},ie=function Se(U,te){if(!O||!c.isPressed||U&&ve!=null&&!te&&(U.pointerId&&U.pointerId!==ve&&U.target!==t||U.changedTouches&&!z0(U.changedTouches,ve))){ne&&U&&O&&Xn(U);return}c.isPressed=!1;var F=U,W=c.isDragging,oe=c.vars.allowContextMenu&&U&&(U.ctrlKey||U.which>2),Q=mt.delayedCall(.001,$e),_e,se,Ee,He,Ne;if(ye?(zt(ye,"touchend",Se),zt(ye,"touchmove",N),zt(ye,"touchcancel",Se),zt(I,"touchstart",Uf)):zt(I,"mousemove",N),zt(Tt,"touchforcechange",Xn),(!zl||!ye)&&(zt(I,"mouseup",Se),U&&U.target&&zt(U.target,"mouseup",Se)),Le=!1,W&&(p=Pf=lr(),c.isDragging=!1),If(me),Ue&&!oe){U&&(zt(U.target,"change",Se),c.pointerEvent=F),rl(_,!1),It(c,"release","onRelease"),It(c,"click","onClick"),Ue=!1;return}for(se=_.length;--se>-1;)Vc(_[se],"cursor",n.cursor||(n.cursor!==!1?ta:null));if(tc--,U){if(_e=U.changedTouches,_e&&(U=_e[0],U!==ue&&U.identifier!==ve)){for(se=_e.length;--se>-1&&(U=_e[se]).identifier!==ve&&U.target!==t;);if(se<0&&!te)return}c.pointerEvent=F,c.pointerX=U.pageX,c.pointerY=U.pageY}return oe&&F?(Xn(F),ne=!0,It(c,"release","onRelease")):F&&!W?(ne=!1,ke&&(n.snap||n.bounds)&&Re(n.inertia||n.throwProps),It(c,"release","onRelease"),(!ea||F.type!=="touchmove")&&F.type.indexOf("cancel")===-1&&(It(c,"click","onClick"),lr()-T<300&&It(c,"doubleclick","onDoubleClick"),He=F.target||t,T=lr(),Ne=function(){T!==b&&c.enabled()&&!c.isPressed&&!F.defaultPrevented&&(He.click?He.click():I.createEvent&&(Ee=I.createEvent("MouseEvents"),Ee.initMouseEvent("click",!0,!0,Tt,1,c.pointerEvent.screenX,c.pointerEvent.screenY,c.pointerX,c.pointerY,!1,!1,!1,!1,0,null),He.dispatchEvent(Ee)))},!ea&&!F.defaultPrevented&&mt.delayedCall(.05,Ne))):(Re(n.inertia||n.throwProps),!c.allowEventDefault&&F&&(n.dragClickables!==!1||!A.call(c,F.target))&&W&&(!k||Ke&&k===Ke)&&F.cancelable!==!1?(ne=!0,Xn(F)):ne=!1,It(c,"release","onRelease")),rt()&&Q.duration(c.tween.duration()),W&&It(c,"dragend","onDragEnd"),!0},de=function(U){if(U&&c.isDragging&&!L){var te=U.target||t.parentNode,F=te.scrollLeft-te._gsScrollX,W=te.scrollTop-te._gsScrollY;(F||W)&&(Me?(X-=F*Me.a+W*Me.c,K-=W*Me.d+F*Me.b):(X-=F,K-=W),te._gsScrollX+=F,te._gsScrollY+=W,q(c.pointerX,c.pointerY))}},We=function(U){var te=lr(),F=te-T<100,W=te-p<50,oe=F&&b===T,Q=c.pointerEvent&&c.pointerEvent.defaultPrevented,_e=F&&J===T,se=U.isTrusted||U.isTrusted==null&&F&&oe;if((oe||W&&c.vars.suppressClickOnDrag!==!1)&&U.stopImmediatePropagation&&U.stopImmediatePropagation(),F&&!(c.pointerEvent&&c.pointerEvent.defaultPrevented)&&(!oe||se&&!_e)){se&&oe&&(J=T),b=T;return}(c.isPressed||W||F)&&(!se||!U.detail||!F||Q)&&Xn(U),!F&&!W&&!le&&(U&&U.target&&(c.pointerEvent=U),It(c,"click","onClick"))},Ze=function(U){return Me?{x:U.x*Me.a+U.y*Me.c+Me.e,y:U.x*Me.b+U.y*Me.d+Me.f}:{x:U.x,y:U.y}};return Be=e.get(t),Be&&Be.kill(),i.startDrag=function(Se,U){var te,F,W,oe;y(Se||c.pointerEvent,!0),U&&!c.hitTest(Se||c.pointerEvent)&&(te=Os(Se||c.pointerEvent),F=Os(t),W=Ze({x:te.left+te.width/2,y:te.top+te.height/2}),oe=Ze({x:F.left+F.width/2,y:F.top+F.height/2}),X-=W.x-oe.x,K-=W.y-oe.y),c.isDragging||(c.isDragging=le=!0,It(c,"dragstart","onDragStart"))},i.drag=N,i.endDrag=function(Se){return ie(Se||c.pointerEvent,!0)},i.timeSinceDrag=function(){return c.isDragging?0:(lr()-p)/1e3},i.timeSinceClick=function(){return(lr()-T)/1e3},i.hitTest=function(Se,U){return e.hitTest(c.target,Se,U)},i.getDirection=function(Se,U){var te=Se==="velocity"&&ci?Se:_a(Se)&&!a?"element":"start",F,W,oe,Q,_e,se;return te==="element"&&(_e=Os(c.target),se=Os(Se)),F=te==="start"?c.x-ee:te==="velocity"?ci.getVelocity(t,l):_e.left+_e.width/2-(se.left+se.width/2),a?F<0?"counter-clockwise":"clockwise":(U=U||2,W=te==="start"?c.y-j:te==="velocity"?ci.getVelocity(t,u):_e.top+_e.height/2-(se.top+se.height/2),oe=Math.abs(F/W),Q=oe<1/U?"":F<0?"left":"right",oe<U&&(Q!==""&&(Q+="-"),Q+=W<0?"up":"down"),Q)},i.applyBounds=function(Se,U){var te,F,W,oe,Q,_e;if(Se&&n.bounds!==Se)return n.bounds=Se,c.update(!0,U);if(he(!0),Ie(),V&&!rt()){if(te=c.x,F=c.y,te>ce?te=ce:te<Te&&(te=Te),F>Fe?F=Fe:F<Y&&(F=Y),(c.x!==te||c.y!==F)&&(W=!0,c.x=c.endX=te,a?c.endRotation=te:c.y=c.endY=F,Le=!0,me(!0),c.autoScroll&&!c.isDragging))for(Hc(t.parentNode),oe=t,Hi.scrollTop=Tt.pageYOffset!=null?Tt.pageYOffset:I.documentElement.scrollTop!=null?I.documentElement.scrollTop:I.body.scrollTop,Hi.scrollLeft=Tt.pageXOffset!=null?Tt.pageXOffset:I.documentElement.scrollLeft!=null?I.documentElement.scrollLeft:I.body.scrollLeft;oe&&!_e;)_e=Ro(oe.parentNode),Q=_e?Hi:oe.parentNode,f&&Q.scrollTop>Q._gsMaxScrollY&&(Q.scrollTop=Q._gsMaxScrollY),h&&Q.scrollLeft>Q._gsMaxScrollX&&(Q.scrollLeft=Q._gsMaxScrollX),oe=Q;c.isThrowing&&(W||c.endX>ce||c.endX<Te||c.endY>Fe||c.endY<Y)&&Re(n.inertia||n.throwProps,W)}return c},i.update=function(Se,U,te){if(U&&c.isPressed){var F=is(t),W=ae.apply({x:c.x-ee,y:c.y-j}),oe=is(t.parentNode,!0);oe.apply({x:F.e-W.x,y:F.f-W.y},W),c.x-=W.x-oe.e,c.y-=W.y-oe.f,me(!0),je()}var Q=c.x,_e=c.y;return qe(!U),Se?c.applyBounds():(Le&&te&&me(!0),he(!0)),U&&(q(c.pointerX,c.pointerY),Le&&me(!0)),c.isPressed&&!U&&(h&&Math.abs(Q-c.x)>.01||f&&Math.abs(_e-c.y)>.01&&!a)&&je(),c.autoScroll&&(Hc(t.parentNode,c.isDragging),m=c.isDragging,me(!0),Of(t,de),Nf(t,de)),c},i.enable=function(Se){var U={lazy:!0},te,F,W;if(n.cursor!==!1&&(U.cursor=n.cursor||ta),mt.utils.checkPrefix("touchCallout")&&(U.touchCallout="none"),Se!=="soft"){for(Lf(_,h===f?"none":n.allowNativeTouchScrolling&&t.scrollHeight===t.clientHeight==(t.scrollWidth===t.clientHeight)||n.allowEventDefault?"manipulation":h?"pan-y":"pan-x"),F=_.length;--F>-1;)W=_[F],zl||Gt(W,"mousedown",y),Gt(W,"touchstart",y),Gt(W,"click",We,!0),mt.set(W,U),W.getBBox&&W.ownerSVGElement&&h!==f&&mt.set(W.ownerSVGElement,{touchAction:n.allowNativeTouchScrolling||n.allowEventDefault?"manipulation":h?"pan-y":"pan-x"}),n.allowContextMenu||Gt(W,"contextmenu",we);rl(_,!1)}return Nf(t,de),O=!0,ci&&Se!=="soft"&&ci.track(L||t,o?"x,y":a?"rotation":"top,left"),t._gsDragID=te="d"+U0++,go[te]=c,L&&(L.enable(),L.element._gsDragID=te),(n.bounds||a)&&je(),n.bounds&&c.applyBounds(),c},i.disable=function(Se){for(var U=c.isDragging,te=_.length,F;--te>-1;)Vc(_[te],"cursor",null);if(Se!=="soft"){for(Lf(_,null),te=_.length;--te>-1;)F=_[te],Vc(F,"touchCallout",null),zt(F,"mousedown",y),zt(F,"touchstart",y),zt(F,"click",We,!0),zt(F,"contextmenu",we);rl(_,!0),ye&&(zt(ye,"touchcancel",ie),zt(ye,"touchend",ie),zt(ye,"touchmove",N)),zt(I,"mouseup",ie),zt(I,"mousemove",N)}return Of(t,de),O=!1,ci&&Se!=="soft"&&(ci.untrack(L||t,o?"x,y":a?"rotation":"top,left"),c.tween&&c.tween.kill()),L&&L.disable(),If(me),c.isDragging=c.isPressed=Ue=!1,U&&It(c,"dragend","onDragEnd"),c},i.enabled=function(Se,U){return arguments.length?Se?c.enable(U):c.disable(U):O},i.kill=function(){return c.isThrowing=!1,c.tween&&c.tween.kill(),c.disable(),mt.set(_,{clearProps:"userSelect"}),delete go[t._gsDragID],c},i.revert=function(){this.kill(),this.styles&&this.styles.revert()},~s.indexOf("scroll")&&(L=i.scrollProxy=new W0(t,O0({onKill:function(){c.isPressed&&ie(null)}},n)),t.style.overflowY=f&&!ju?"auto":"hidden",t.style.overflowX=h&&!ju?"auto":"hidden",t=L.content),a?g.rotation=1:(h&&(g[l]=1),f&&(g[u]=1)),C.force3D="force3D"in n?n.force3D:!0,Ym(Rf(i)),i.enable(),i}return e.register=function(n){mt=n,Wc()},e.create=function(n,i){return Ku||Wc(!0),Tr(n).map(function(s){return new e(s,i)})},e.get=function(n){return go[(Tr(n)[0]||{})._gsDragID]},e.timeSinceDrag=function(){return(lr()-Pf)/1e3},e.hitTest=function(n,i,s){if(n===i)return!1;var o=Os(n),a=Os(i),l=o.top,u=o.left,h=o.right,f=o.bottom,d=o.width,c=o.height,_=a.left>h||a.right<u||a.top>f||a.bottom<l,g,p,m;return _||!s?!_:(m=(s+"").indexOf("%")!==-1,s=parseFloat(s)||0,g={left:Math.max(u,a.left),top:Math.max(l,a.top)},g.width=Math.min(h,a.right)-g.left,g.height=Math.min(f,a.bottom)-g.top,g.width<0||g.height<0?!1:m?(s*=.01,p=g.width*g.height,p>=d*c*s||p>=a.width*a.height*s):g.width>s&&g.height>s)},e}(X0);B0(zr.prototype,{pointerX:0,pointerY:0,startX:0,startY:0,deltaX:0,deltaY:0,isDragging:!1,isPressed:!1});zr.zIndex=1e3;zr.version="3.12.5";$m()&&mt.registerPlugin(zr);/*!
 * ScrollToPlugin 3.12.5
 * https://gsap.com
 *
 * @license Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var En,Jm,tr,bi,Pr,Qm,eg,sl,tg=function(){return typeof window<"u"},ng=function(){return En||tg()&&(En=window.gsap)&&En.registerPlugin&&En},ig=function(e){return typeof e=="string"},zf=function(e){return typeof e=="function"},Ia=function(e,t){var n=t==="x"?"Width":"Height",i="scroll"+n,s="client"+n;return e===tr||e===bi||e===Pr?Math.max(bi[i],Pr[i])-(tr["inner"+n]||bi[s]||Pr[s]):e[i]-e["offset"+n]},Ua=function(e,t){var n="scroll"+(t==="x"?"Left":"Top");return e===tr&&(e.pageXOffset!=null?n="page"+t.toUpperCase()+"Offset":e=bi[n]!=null?bi:Pr),function(){return e[n]}},Y0=function(e,t,n,i){if(zf(e)&&(e=e(t,n,i)),typeof e!="object")return ig(e)&&e!=="max"&&e.charAt(1)!=="="?{x:e,y:e}:{y:e};if(e.nodeType)return{y:e,x:e};var s={},o;for(o in e)s[o]=o!=="onAutoKill"&&zf(e[o])?e[o](t,n,i):e[o];return s},rg=function(e,t){if(e=Qm(e)[0],!e||!e.getBoundingClientRect)return console.warn("scrollTo target doesn't exist. Using 0")||{x:0,y:0};var n=e.getBoundingClientRect(),i=!t||t===tr||t===Pr,s=i?{top:bi.clientTop-(tr.pageYOffset||bi.scrollTop||Pr.scrollTop||0),left:bi.clientLeft-(tr.pageXOffset||bi.scrollLeft||Pr.scrollLeft||0)}:t.getBoundingClientRect(),o={x:n.left-s.left,y:n.top-s.top};return!i&&t&&(o.x+=Ua(t,"x")(),o.y+=Ua(t,"y")()),o},kf=function(e,t,n,i,s){return!isNaN(e)&&typeof e!="object"?parseFloat(e)-s:ig(e)&&e.charAt(1)==="="?parseFloat(e.substr(2))*(e.charAt(0)==="-"?-1:1)+i-s:e==="max"?Ia(t,n)-s:Math.min(Ia(t,n),rg(e,t)[n]-s)},Hf=function(){En=ng(),tg()&&En&&typeof document<"u"&&document.body&&(tr=window,Pr=document.body,bi=document.documentElement,Qm=En.utils.toArray,En.config({autoKillThreshold:7}),eg=En.config(),Jm=1)},ka={version:"3.12.5",name:"scrollTo",rawVars:1,register:function(e){En=e,Hf()},init:function(e,t,n,i,s){Jm||Hf();var o=this,a=En.getProperty(e,"scrollSnapType");o.isWin=e===tr,o.target=e,o.tween=n,t=Y0(t,i,e,s),o.vars=t,o.autoKill=!!t.autoKill,o.getX=Ua(e,"x"),o.getY=Ua(e,"y"),o.x=o.xPrev=o.getX(),o.y=o.yPrev=o.getY(),sl||(sl=En.core.globals().ScrollTrigger),En.getProperty(e,"scrollBehavior")==="smooth"&&En.set(e,{scrollBehavior:"auto"}),a&&a!=="none"&&(o.snap=1,o.snapInline=e.style.scrollSnapType,e.style.scrollSnapType="none"),t.x!=null?(o.add(o,"x",o.x,kf(t.x,e,"x",o.x,t.offsetX||0),i,s),o._props.push("scrollTo_x")):o.skipX=1,t.y!=null?(o.add(o,"y",o.y,kf(t.y,e,"y",o.y,t.offsetY||0),i,s),o._props.push("scrollTo_y")):o.skipY=1},render:function(e,t){for(var n=t._pt,i=t.target,s=t.tween,o=t.autoKill,a=t.xPrev,l=t.yPrev,u=t.isWin,h=t.snap,f=t.snapInline,d,c,_,g,p;n;)n.r(e,n.d),n=n._next;d=u||!t.skipX?t.getX():a,c=u||!t.skipY?t.getY():l,_=c-l,g=d-a,p=eg.autoKillThreshold,t.x<0&&(t.x=0),t.y<0&&(t.y=0),o&&(!t.skipX&&(g>p||g<-p)&&d<Ia(i,"x")&&(t.skipX=1),!t.skipY&&(_>p||_<-p)&&c<Ia(i,"y")&&(t.skipY=1),t.skipX&&t.skipY&&(s.kill(),t.vars.onAutoKill&&t.vars.onAutoKill.apply(s,t.vars.onAutoKillParams||[]))),u?tr.scrollTo(t.skipX?d:t.x,t.skipY?c:t.y):(t.skipY||(i.scrollTop=t.y),t.skipX||(i.scrollLeft=t.x)),h&&(e===1||e===0)&&(c=i.scrollTop,d=i.scrollLeft,f?i.style.scrollSnapType=f:i.style.removeProperty("scroll-snap-type"),i.scrollTop=c+1,i.scrollLeft=d+1,i.scrollTop=c,i.scrollLeft=d),t.xPrev=t.x,t.yPrev=t.y,sl&&sl.update()},kill:function(e){var t=e==="scrollTo",n=this._props.indexOf(e);return(t||e==="scrollTo_x")&&(this.skipX=1),(t||e==="scrollTo_y")&&(this.skipY=1),n>-1&&this._props.splice(n,1),!this._props.length}};ka.max=Ia;ka.getOffset=rg;ka.buildGetter=Ua;ng()&&En.registerPlugin(ka);et.registerPlugin(ot,zr,ka);function q0(r,e,t){var n=r.getBoundingClientRect(),i=n.left,s=0,o=window.innerWidth,a=(i-s)/(o-s)*(t-e)+e;return a=Math.round(a),a}zr.create(".main-circle",{type:"x",bounds:".interval-loader",onDrag:()=>{const r=document.querySelector(".main-circle");q0(r,-2,24)}});window.onbeforeunload=function(){window.scrollTo(0,0)};const $0=()=>{const r=new Yg;r.on("scroll",e=>{}),r.on("scroll",ot.update),et.ticker.add(e=>{r.raf(e*600)}),et.ticker.lagSmoothing(0)};$0();const Ut=r=>{const e=document.querySelector(r);let t="";e.textContent.split("").forEach(n=>{t+=`<div class="inline-block">${n}</div>`}),e.innerHTML=t},K0=()=>{Ut(".page1-main-line1>h1"),Ut(".page1-main-line2>h1");const r=et.timeline();r.from(".page1-main-line1>h1>div",{y:30,opacity:0,ease:"power3.in",stagger:{amount:1},onComplete:()=>{}},"main"),r.from(".page1-main-line2>h1>div",{opacity:0,y:30,ease:"power3.in",stagger:{amount:1},onComplete:()=>{et.to(window,{duration:3,scrollTo:820})}},"main")};K0();const j0=()=>{const e=document.querySelector(".page1 canvas").getContext("2d"),t=213;let n="";for(let h=0;h<t;h++)n+=`canvas1/canvas2/frame1 (${h}).png
    `;function i(h){var f=n;return f.split(`
`)[h]}const s=[],o={frame:1};for(let h=0;h<t;h++){const f=new Image;f.src=i(h),s.push(f)}et.to(o,{frame:t-1,snap:"frame",ease:"none",scrollTrigger:{scrub:.15,trigger:".page1 canvas",start:"top top",end:"top -200%",scroller:"body"},onUpdate:l}),s[1].onload=l,(()=>{const h=et.timeline({scrollTrigger:{scrub:.15,trigger:".page1 canvas",start:"top top",end:"top -180%",scroller:"body"}});Ut(".page1-para1-line1>h3"),Ut(".page1-para1-line2>h3"),h.to(".scroll-down",{opacity:0}),h.from(".page1-para1-line1>h3>div",{y:15,opacity:0,delay:.8,stagger:{amount:1}},"para1"),h.from(".scroll-down",{opacity:0}),h.from(".page1-para1-line2>h3>div",{y:15,delay:1.2,opacity:0,stagger:{amount:1}},"para1"),h.to(".page1-para1-line1>h3>div",{y:15,delay:-.1,stagger:{amount:-1}},"para1-p"),h.to(".page1-para1-line2>h3>div",{y:15,delay:-.1,opacity:0,stagger:{amount:-1}},"para1-p"),Ut(".page1-para2-line1>h3"),Ut(".page1-para2-line2>h3"),h.to(".page1-para2",{opacity:1}),h.from(".page1-para2-line1>h3>div",{y:15,opacity:0,delay:-.4,stagger:{amount:1.2}},"para2"),h.from(".page1-para2-line2>h3>div",{y:15,opacity:0,delay:-.2,stagger:{amount:1.2}},"para2"),h.to(".page1-main-line1>h1>div",{y:15,opacity:0,delay:3,stagger:{amount:-1},onComplete:()=>{}},"main"),h.to(".page1-main-line2>h1>div",{y:15,opacity:0,delay:3,stagger:{amount:-1}},"main"),h.to(".page1-para2-line1>h3>div",{y:15,opacity:0,delay:-.1,stagger:{amount:-1.2}},"para2-out"),h.to(".page1-para2-line2>h3>div",{y:15,opacity:0,delay:-.1,stagger:{amount:-1.2}},"para2-out"),h.to(".scroll-down",{opacity:0})})();function l(){u(s[o.frame],e)}function u(h,f){var d=f.canvas,c=d.width/h.width,_=d.height/h.height,g=Math.max(c,_),p=(d.width-h.width*g)/2,m=(d.height-h.height*g)/2;f.clearRect(0,0,d.width,d.height),f.drawImage(h,0,0,h.width,h.height,p,m,h.width*g,h.height*g)}ot.create({trigger:".page1",pin:!0,scroller:"body",start:"top top",end:"top -250%"})};j0();const Z0=()=>{Ut(".page2-heading-line1>h1"),Ut(".page2-heading-line2>h1"),Ut(".page2-heading-line3>h1");const r=et.timeline({scrollTrigger:{trigger:".page2",scroller:"body",start:"top 0%",end:"top -300%",scrub:1,pin:!0}});r.from(".page2-heading-line1>h1>div",{y:30,ease:"power3.in",opacity:0,delay:3.5,stagger:{amount:1,from:"x"}},"line1"),r.from(".page2-heading-line2>h1>div",{y:30,ease:"power3.in",opacity:0,delay:3.5,stagger:{amount:1,from:"x"}},"line1"),r.from(".page2-heading-line3>h1>div",{opacity:0,y:30,ease:"power3.in",delay:3.5,stagger:{amount:1,from:"x"}},"line1"),r.from(".c1",{opacity:0}),r.from(".main-circle",{opacity:0}),r.from(".interval-line",{width:"0"},"from"),r.from(".dot",{opacity:"0",stagger:{amount:.5}},"from"),r.from(".c2",{opacity:"0"}),Ut(".y2024>h3"),Ut(".y2030>h3"),Ut(".y2040>h3"),Ut(".y2050>h3"),Ut(".y2060>h3"),Ut(".y2070>h3"),Ut(".y2080>h3"),Ut(".y2090>h3"),Ut(".y2100>h3"),r.from(".y2024>h3>div",{y:30,ease:"power3.in",opacity:0,delay:-1,stagger:{amount:.5,from:"x"}},"from"),r.from(".y2030>h3>div",{y:30,ease:"power3.in",opacity:0,delay:-.9,stagger:{amount:.5,from:"x"}},"from"),r.from(".y2040>h3>div",{y:30,ease:"power3.in",opacity:0,delay:-.8,stagger:{amount:.5,from:"x"}},"from"),r.from(".y2050>h3>div",{y:30,ease:"power3.in",opacity:0,delay:-.7,stagger:{amount:.5,from:"x"}},"from"),r.from(".y2060>h3>div",{y:30,ease:"power3.in",opacity:0,delay:-.6,stagger:{amount:.5,from:"x"}},"from"),r.from(".y2070>h3>div",{y:30,ease:"power3.in",opacity:0,delay:-.5,stagger:{amount:.5,from:"x"}},"from"),r.from(".y2080>h3>div",{y:30,ease:"power3.in",opacity:0,delay:-.4,stagger:{amount:.5,from:"x"}},"from"),r.from(".y2090>h3>div",{y:30,ease:"power3.in",opacity:0,delay:-.3,stagger:{amount:.5,from:"x"}},"from"),r.from(".y2100>h3>div",{y:30,ease:"power3.in",opacity:0,delay:-.2,stagger:{amount:.5,from:"x"}},"from"),Ut(".switch-heat>h1"),Ut(".switch-co2>h1"),r.from(".switch-heat>h1>div",{y:30,ease:"power3.in",opacity:0,stagger:{amount:.5,from:"x"}},"blue-line"),r.from(".switch-heat-bar",{width:"0"},"blue-line"),r.from(".bar",{y:15,opacity:0}),r.from(".switch-co2>h1>div",{y:30,ease:"power3.in",opacity:0,stagger:{amount:.5,from:"x"}}),r.from(".switch-co2>small",{y:30,ease:"power3.in",opacity:0}),Ut(".legend-text>h3"),r.from(".legend-text>h3>div",{y:30,ease:"power3.in",opacity:0,stagger:{amount:.5,from:"x"}}),r.from(".legend-bar",{width:"0"}),r.from(".value h3",{x:15,ease:"power3.in",opacity:0,stagger:{amount:.5,from:"x"},onComplete:()=>{et.to(".scrub > div>h3",{opacity:1,stagger:.1}),et.to(".scrub-line",{height:"100%"})}}),document.querySelector(".main-circle").addEventListener("mousedown",()=>{et.to(".scrub >div > h3",{opacity:0,stagger:-.1}),et.to(".scrub-line",{height:"0%"})}),r.to(".page2",{backgroundColor:"#fff",delay:6}),r.to(".page2-heading-line1>h1>div",{opacity:0,y:30,ease:"power3.in",stagger:{amount:-1,from:"x"}},"line1-to"),r.to(".page2-heading-line2>h1>div",{opacity:0,y:30,ease:"power3.in",stagger:{amount:-1,from:"x"}},"line1-to"),r.to(".page2-heading-line3>h1>div",{opacity:0,y:30,ease:"power3.in",stagger:{amount:-1,from:"x"}},"line1-to"),r.to(".c1",{opacity:0}),r.to(".main-circle",{opacity:0}),r.to(".interval-line",{width:"0"},"to"),r.to(".dot",{opacity:"0",stagger:{amount:.5}},"to"),r.to(".c2",{opacity:"0"}),r.to(".y2100>h3>div",{y:30,ease:"power3.in",opacity:0,delay:-1,stagger:{amount:-.5,from:"x"}},"to"),r.to(".y2090>h3>div",{y:30,ease:"power3.in",opacity:0,delay:-.9,stagger:{amount:-.5,from:"x"}},"to"),r.to(".y2080>h3>div",{y:30,ease:"power3.in",opacity:0,delay:-.8,stagger:{amount:-.5,from:"x"}},"to"),r.to(".y2070>h3>div",{y:30,ease:"power3.in",opacity:0,delay:-.7,stagger:{amount:-.5,from:"x"}},"to"),r.to(".y2060>h3>div",{y:30,ease:"power3.in",opacity:0,delay:-.6,stagger:{amount:-.5,from:"x"}},"to"),r.to(".y2050>h3>div",{y:30,ease:"power3.in",opacity:0,delay:-.5,stagger:{amount:-.5,from:"x"}},"to"),r.to(".y2040>h3>div",{y:30,ease:"power3.in",opacity:0,delay:-.4,stagger:{amount:-.5,from:"x"}},"to"),r.to(".y2030>h3>div",{y:30,ease:"power3.in",opacity:0,delay:-.3,stagger:{amount:-.5,from:"x"}},"to"),r.to(".y2024>h3>div",{y:30,ease:"power3.in",opacity:0,delay:-.2,stagger:{amount:-.5,from:"x"}},"to"),r.to(".scrub-line",{height:"0%"}),r.to(".scrub >div> h3",{opacity:0,stagger:-.1}),r.to(".switch-co2>small",{y:30,ease:"power3.in",opacity:0,stagger:{amount:-.5,from:"x"}}),r.to(".switch-co2>h1>div",{y:30,ease:"power3.in",opacity:0,stagger:{amount:-.5,from:"x"}}),r.to(".bar",{y:15,opacity:0}),r.to(".switch-heat>h1>div",{y:30,ease:"power3.in",opacity:0,stagger:{amount:-.5,from:"x"}},"blue-line-to"),r.to(".switch-heat-bar",{width:"0"},"blue-line-to"),r.to(".switch-co2-bar",{width:"0"},"blue-line-to"),r.to(".legend-text>h3>div",{y:30,ease:"power3.in",opacity:0,stagger:{amount:-.5,from:"x"}}),r.to(".legend-bar",{width:"0"}),r.to(".value h3",{x:15,ease:"power3.in",opacity:0,stagger:{amount:-.5,from:"x"}}),r.to(".page2",{backgroundColor:"#fff"}),r.to(".globe-model",{left:"20%",duration:8});const e=et.timeline({repeat:-1});e.to(".ani-line",{top:"125%",duration:1}),e.to(".ani-line",{opacity:0,duration:.5}),e.to(".ani-line",{top:"-25%",duration:1}),e.to(".ani-line",{opacity:1,duration:.5})};Z0();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Uh="164",Fs={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Bs={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},J0=0,Vf=1,Q0=2,sg=1,ev=2,Vi=3,Or=0,Pn=1,qi=2,Lr=0,xo=1,Gf=2,Wf=3,Xf=4,tv=5,rs=100,nv=101,iv=102,rv=103,sv=104,ov=200,av=201,lv=202,cv=203,eh=204,th=205,uv=206,hv=207,fv=208,dv=209,pv=210,mv=211,gv=212,_v=213,vv=214,xv=0,yv=1,Sv=2,nc=3,Mv=4,Ev=5,Tv=6,bv=7,og=0,wv=1,Av=2,Dr=0,Rv=1,Cv=2,Pv=3,Lv=4,Dv=5,Iv=6,Uv=7,ag=300,Co=301,Po=302,nh=303,ih=304,dc=306,rh=1e3,ls=1001,sh=1002,ni=1003,Nv=1004,ol=1005,di=1006,Xc=1007,cs=1008,Fr=1009,Ov=1010,Fv=1011,lg=1012,cg=1013,Lo=1014,br=1015,pc=1016,ug=1017,hg=1018,Ha=1020,Bv=35902,zv=1021,kv=1022,wi=1023,Hv=1024,Vv=1025,yo=1026,Na=1027,Gv=1028,fg=1029,Wv=1030,dg=1031,pg=1033,Yc=33776,qc=33777,$c=33778,Kc=33779,Yf=35840,qf=35841,$f=35842,Kf=35843,jf=36196,Zf=37492,Jf=37496,Qf=37808,ed=37809,td=37810,nd=37811,id=37812,rd=37813,sd=37814,od=37815,ad=37816,ld=37817,cd=37818,ud=37819,hd=37820,fd=37821,jc=36492,dd=36494,pd=36495,Xv=36283,md=36284,gd=36285,_d=36286,Yv=3200,qv=3201,$v=0,Kv=1,vr="",Kn="srgb",kr="srgb-linear",Nh="display-p3",mc="display-p3-linear",ic="linear",wt="srgb",rc="rec709",sc="p3",zs=7680,vd=519,jv=512,Zv=513,Jv=514,mg=515,Qv=516,ex=517,tx=518,nx=519,xd=35044,yd="300 es",Zi=2e3,oc=2001;class Cs{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,e);e.target=null}}}const rn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Sd=1234567;const xa=Math.PI/180,Oa=180/Math.PI;function Uo(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(rn[r&255]+rn[r>>8&255]+rn[r>>16&255]+rn[r>>24&255]+"-"+rn[e&255]+rn[e>>8&255]+"-"+rn[e>>16&15|64]+rn[e>>24&255]+"-"+rn[t&63|128]+rn[t>>8&255]+"-"+rn[t>>16&255]+rn[t>>24&255]+rn[n&255]+rn[n>>8&255]+rn[n>>16&255]+rn[n>>24&255]).toLowerCase()}function ln(r,e,t){return Math.max(e,Math.min(t,r))}function Oh(r,e){return(r%e+e)%e}function ix(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function rx(r,e,t){return r!==e?(t-r)/(e-r):0}function ya(r,e,t){return(1-t)*r+t*e}function sx(r,e,t,n){return ya(r,e,1-Math.exp(-t*n))}function ox(r,e=1){return e-Math.abs(Oh(r,e*2)-e)}function ax(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function lx(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function cx(r,e){return r+Math.floor(Math.random()*(e-r+1))}function ux(r,e){return r+Math.random()*(e-r)}function hx(r){return r*(.5-Math.random())}function fx(r){r!==void 0&&(Sd=r);let e=Sd+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function dx(r){return r*xa}function px(r){return r*Oa}function mx(r){return(r&r-1)===0&&r!==0}function gx(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function _x(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function vx(r,e,t,n,i){const s=Math.cos,o=Math.sin,a=s(t/2),l=o(t/2),u=s((e+n)/2),h=o((e+n)/2),f=s((e-n)/2),d=o((e-n)/2),c=s((n-e)/2),_=o((n-e)/2);switch(i){case"XYX":r.set(a*h,l*f,l*d,a*u);break;case"YZY":r.set(l*d,a*h,l*f,a*u);break;case"ZXZ":r.set(l*f,l*d,a*h,a*u);break;case"XZX":r.set(a*h,l*_,l*c,a*u);break;case"YXY":r.set(l*c,a*h,l*_,a*u);break;case"ZYZ":r.set(l*_,l*c,a*h,a*u);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function ro(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function mn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const xx={DEG2RAD:xa,RAD2DEG:Oa,generateUUID:Uo,clamp:ln,euclideanModulo:Oh,mapLinear:ix,inverseLerp:rx,lerp:ya,damp:sx,pingpong:ox,smoothstep:ax,smootherstep:lx,randInt:cx,randFloat:ux,randFloatSpread:hx,seededRandom:fx,degToRad:dx,radToDeg:px,isPowerOfTwo:mx,ceilPowerOfTwo:gx,floorPowerOfTwo:_x,setQuaternionFromProperEuler:vx,normalize:mn,denormalize:ro};class it{constructor(e=0,t=0){it.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ln(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*i+e.x,this.y=s*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class lt{constructor(e,t,n,i,s,o,a,l,u){lt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,u)}set(e,t,n,i,s,o,a,l,u){const h=this.elements;return h[0]=e,h[1]=i,h[2]=a,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=o,h[8]=u,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[3],l=n[6],u=n[1],h=n[4],f=n[7],d=n[2],c=n[5],_=n[8],g=i[0],p=i[3],m=i[6],M=i[1],x=i[4],E=i[7],R=i[2],A=i[5],T=i[8];return s[0]=o*g+a*M+l*R,s[3]=o*p+a*x+l*A,s[6]=o*m+a*E+l*T,s[1]=u*g+h*M+f*R,s[4]=u*p+h*x+f*A,s[7]=u*m+h*E+f*T,s[2]=d*g+c*M+_*R,s[5]=d*p+c*x+_*A,s[8]=d*m+c*E+_*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],u=e[7],h=e[8];return t*o*h-t*a*u-n*s*h+n*a*l+i*s*u-i*o*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],u=e[7],h=e[8],f=h*o-a*u,d=a*l-h*s,c=u*s-o*l,_=t*f+n*d+i*c;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return e[0]=f*g,e[1]=(i*u-h*n)*g,e[2]=(a*n-i*o)*g,e[3]=d*g,e[4]=(h*t-i*l)*g,e[5]=(i*s-a*t)*g,e[6]=c*g,e[7]=(n*l-u*t)*g,e[8]=(o*t-n*s)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,o,a){const l=Math.cos(s),u=Math.sin(s);return this.set(n*l,n*u,-n*(l*o+u*a)+o+e,-i*u,i*l,-i*(-u*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Zc.makeScale(e,t)),this}rotate(e){return this.premultiply(Zc.makeRotation(-e)),this}translate(e,t){return this.premultiply(Zc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Zc=new lt;function gg(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Fa(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function yx(){const r=Fa("canvas");return r.style.display="block",r}const Md={};function Sx(r){r in Md||(Md[r]=!0,console.warn(r))}const Ed=new lt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Td=new lt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),al={[kr]:{transfer:ic,primaries:rc,toReference:r=>r,fromReference:r=>r},[Kn]:{transfer:wt,primaries:rc,toReference:r=>r.convertSRGBToLinear(),fromReference:r=>r.convertLinearToSRGB()},[mc]:{transfer:ic,primaries:sc,toReference:r=>r.applyMatrix3(Td),fromReference:r=>r.applyMatrix3(Ed)},[Nh]:{transfer:wt,primaries:sc,toReference:r=>r.convertSRGBToLinear().applyMatrix3(Td),fromReference:r=>r.applyMatrix3(Ed).convertLinearToSRGB()}},Mx=new Set([kr,mc]),St={enabled:!0,_workingColorSpace:kr,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(r){if(!Mx.has(r))throw new Error(`Unsupported working color space, "${r}".`);this._workingColorSpace=r},convert:function(r,e,t){if(this.enabled===!1||e===t||!e||!t)return r;const n=al[e].toReference,i=al[t].fromReference;return i(n(r))},fromWorkingColorSpace:function(r,e){return this.convert(r,this._workingColorSpace,e)},toWorkingColorSpace:function(r,e){return this.convert(r,e,this._workingColorSpace)},getPrimaries:function(r){return al[r].primaries},getTransfer:function(r){return r===vr?ic:al[r].transfer}};function So(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Jc(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let ks;class Ex{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ks===void 0&&(ks=Fa("canvas")),ks.width=e.width,ks.height=e.height;const n=ks.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=ks}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Fa("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=So(s[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(So(t[n]/255)*255):t[n]=So(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Tx=0;class _g{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Tx++}),this.uuid=Uo(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(Qc(i[o].image)):s.push(Qc(i[o]))}else s=Qc(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function Qc(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Ex.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let bx=0;class Tn extends Cs{constructor(e=Tn.DEFAULT_IMAGE,t=Tn.DEFAULT_MAPPING,n=ls,i=ls,s=di,o=cs,a=wi,l=Fr,u=Tn.DEFAULT_ANISOTROPY,h=vr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:bx++}),this.uuid=Uo(),this.name="",this.source=new _g(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=u,this.format=a,this.internalFormat=null,this.type=l,this.offset=new it(0,0),this.repeat=new it(1,1),this.center=new it(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new lt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ag)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case rh:e.x=e.x-Math.floor(e.x);break;case ls:e.x=e.x<0?0:1;break;case sh:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case rh:e.y=e.y-Math.floor(e.y);break;case ls:e.y=e.y<0?0:1;break;case sh:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Tn.DEFAULT_IMAGE=null;Tn.DEFAULT_MAPPING=ag;Tn.DEFAULT_ANISOTROPY=1;class en{constructor(e=0,t=0,n=0,i=1){en.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,u=l[0],h=l[4],f=l[8],d=l[1],c=l[5],_=l[9],g=l[2],p=l[6],m=l[10];if(Math.abs(h-d)<.01&&Math.abs(f-g)<.01&&Math.abs(_-p)<.01){if(Math.abs(h+d)<.1&&Math.abs(f+g)<.1&&Math.abs(_+p)<.1&&Math.abs(u+c+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(u+1)/2,E=(c+1)/2,R=(m+1)/2,A=(h+d)/4,T=(f+g)/4,C=(_+p)/4;return x>E&&x>R?x<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(x),i=A/n,s=T/n):E>R?E<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(E),n=A/i,s=C/i):R<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(R),n=T/s,i=C/s),this.set(n,i,s,t),this}let M=Math.sqrt((p-_)*(p-_)+(f-g)*(f-g)+(d-h)*(d-h));return Math.abs(M)<.001&&(M=1),this.x=(p-_)/M,this.y=(f-g)/M,this.z=(d-h)/M,this.w=Math.acos((u+c+m-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class wx extends Cs{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new en(0,0,e,t),this.scissorTest=!1,this.viewport=new en(0,0,e,t);const i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:di,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new Tn(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new _g(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ws extends wx{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class vg extends Tn{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=ni,this.minFilter=ni,this.wrapR=ls,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ax extends Tn{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=ni,this.minFilter=ni,this.wrapR=ls,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class As{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,o,a){let l=n[i+0],u=n[i+1],h=n[i+2],f=n[i+3];const d=s[o+0],c=s[o+1],_=s[o+2],g=s[o+3];if(a===0){e[t+0]=l,e[t+1]=u,e[t+2]=h,e[t+3]=f;return}if(a===1){e[t+0]=d,e[t+1]=c,e[t+2]=_,e[t+3]=g;return}if(f!==g||l!==d||u!==c||h!==_){let p=1-a;const m=l*d+u*c+h*_+f*g,M=m>=0?1:-1,x=1-m*m;if(x>Number.EPSILON){const R=Math.sqrt(x),A=Math.atan2(R,m*M);p=Math.sin(p*A)/R,a=Math.sin(a*A)/R}const E=a*M;if(l=l*p+d*E,u=u*p+c*E,h=h*p+_*E,f=f*p+g*E,p===1-a){const R=1/Math.sqrt(l*l+u*u+h*h+f*f);l*=R,u*=R,h*=R,f*=R}}e[t]=l,e[t+1]=u,e[t+2]=h,e[t+3]=f}static multiplyQuaternionsFlat(e,t,n,i,s,o){const a=n[i],l=n[i+1],u=n[i+2],h=n[i+3],f=s[o],d=s[o+1],c=s[o+2],_=s[o+3];return e[t]=a*_+h*f+l*c-u*d,e[t+1]=l*_+h*d+u*f-a*c,e[t+2]=u*_+h*c+a*d-l*f,e[t+3]=h*_-a*f-l*d-u*c,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,u=a(n/2),h=a(i/2),f=a(s/2),d=l(n/2),c=l(i/2),_=l(s/2);switch(o){case"XYZ":this._x=d*h*f+u*c*_,this._y=u*c*f-d*h*_,this._z=u*h*_+d*c*f,this._w=u*h*f-d*c*_;break;case"YXZ":this._x=d*h*f+u*c*_,this._y=u*c*f-d*h*_,this._z=u*h*_-d*c*f,this._w=u*h*f+d*c*_;break;case"ZXY":this._x=d*h*f-u*c*_,this._y=u*c*f+d*h*_,this._z=u*h*_+d*c*f,this._w=u*h*f-d*c*_;break;case"ZYX":this._x=d*h*f-u*c*_,this._y=u*c*f+d*h*_,this._z=u*h*_-d*c*f,this._w=u*h*f+d*c*_;break;case"YZX":this._x=d*h*f+u*c*_,this._y=u*c*f+d*h*_,this._z=u*h*_-d*c*f,this._w=u*h*f-d*c*_;break;case"XZY":this._x=d*h*f-u*c*_,this._y=u*c*f-d*h*_,this._z=u*h*_+d*c*f,this._w=u*h*f+d*c*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],o=t[1],a=t[5],l=t[9],u=t[2],h=t[6],f=t[10],d=n+a+f;if(d>0){const c=.5/Math.sqrt(d+1);this._w=.25/c,this._x=(h-l)*c,this._y=(s-u)*c,this._z=(o-i)*c}else if(n>a&&n>f){const c=2*Math.sqrt(1+n-a-f);this._w=(h-l)/c,this._x=.25*c,this._y=(i+o)/c,this._z=(s+u)/c}else if(a>f){const c=2*Math.sqrt(1+a-n-f);this._w=(s-u)/c,this._x=(i+o)/c,this._y=.25*c,this._z=(l+h)/c}else{const c=2*Math.sqrt(1+f-n-a);this._w=(o-i)/c,this._x=(s+u)/c,this._y=(l+h)/c,this._z=.25*c}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ln(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,o=e._w,a=t._x,l=t._y,u=t._z,h=t._w;return this._x=n*h+o*a+i*u-s*l,this._y=i*h+o*l+s*a-n*u,this._z=s*h+o*u+n*l-i*a,this._w=o*h-n*a-i*l-s*u,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,s=this._z,o=this._w;let a=o*e._w+n*e._x+i*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const c=1-t;return this._w=c*o+t*this._w,this._x=c*n+t*this._x,this._y=c*i+t*this._y,this._z=c*s+t*this._z,this.normalize(),this}const u=Math.sqrt(l),h=Math.atan2(u,a),f=Math.sin((1-t)*h)/u,d=Math.sin(t*h)/u;return this._w=o*f+this._w*d,this._x=n*f+this._x*d,this._y=i*f+this._y*d,this._z=s*f+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class Z{constructor(e=0,t=0,n=0){Z.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(bd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(bd.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,o=e.y,a=e.z,l=e.w,u=2*(o*i-a*n),h=2*(a*t-s*i),f=2*(s*n-o*t);return this.x=t+l*u+o*f-a*h,this.y=n+l*h+a*u-s*f,this.z=i+l*f+s*h-o*u,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-s*a,this.y=s*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return eu.copy(this).projectOnVector(e),this.sub(eu)}reflect(e){return this.sub(eu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ln(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const eu=new Z,bd=new As;class Va{constructor(e=new Z(1/0,1/0,1/0),t=new Z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(si.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(si.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=si.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,si):si.fromBufferAttribute(s,o),si.applyMatrix4(e.matrixWorld),this.expandByPoint(si);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ll.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ll.copy(n.boundingBox)),ll.applyMatrix4(e.matrixWorld),this.union(ll)}const i=e.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,si),si.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ho),cl.subVectors(this.max,Ho),Hs.subVectors(e.a,Ho),Vs.subVectors(e.b,Ho),Gs.subVectors(e.c,Ho),cr.subVectors(Vs,Hs),ur.subVectors(Gs,Vs),qr.subVectors(Hs,Gs);let t=[0,-cr.z,cr.y,0,-ur.z,ur.y,0,-qr.z,qr.y,cr.z,0,-cr.x,ur.z,0,-ur.x,qr.z,0,-qr.x,-cr.y,cr.x,0,-ur.y,ur.x,0,-qr.y,qr.x,0];return!tu(t,Hs,Vs,Gs,cl)||(t=[1,0,0,0,1,0,0,0,1],!tu(t,Hs,Vs,Gs,cl))?!1:(ul.crossVectors(cr,ur),t=[ul.x,ul.y,ul.z],tu(t,Hs,Vs,Gs,cl))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,si).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(si).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ui[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ui[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ui[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ui[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ui[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ui[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ui[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ui[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ui),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Ui=[new Z,new Z,new Z,new Z,new Z,new Z,new Z,new Z],si=new Z,ll=new Va,Hs=new Z,Vs=new Z,Gs=new Z,cr=new Z,ur=new Z,qr=new Z,Ho=new Z,cl=new Z,ul=new Z,$r=new Z;function tu(r,e,t,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){$r.fromArray(r,s);const a=i.x*Math.abs($r.x)+i.y*Math.abs($r.y)+i.z*Math.abs($r.z),l=e.dot($r),u=t.dot($r),h=n.dot($r);if(Math.max(-Math.max(l,u,h),Math.min(l,u,h))>a)return!1}return!0}const Rx=new Va,Vo=new Z,nu=new Z;class Fh{constructor(e=new Z,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Rx.setFromPoints(e).getCenter(n);let i=0;for(let s=0,o=e.length;s<o;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Vo.subVectors(e,this.center);const t=Vo.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Vo,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(nu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Vo.copy(e.center).add(nu)),this.expandByPoint(Vo.copy(e.center).sub(nu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Ni=new Z,iu=new Z,hl=new Z,hr=new Z,ru=new Z,fl=new Z,su=new Z;class xg{constructor(e=new Z,t=new Z(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ni)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Ni.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ni.copy(this.origin).addScaledVector(this.direction,t),Ni.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){iu.copy(e).add(t).multiplyScalar(.5),hl.copy(t).sub(e).normalize(),hr.copy(this.origin).sub(iu);const s=e.distanceTo(t)*.5,o=-this.direction.dot(hl),a=hr.dot(this.direction),l=-hr.dot(hl),u=hr.lengthSq(),h=Math.abs(1-o*o);let f,d,c,_;if(h>0)if(f=o*l-a,d=o*a-l,_=s*h,f>=0)if(d>=-_)if(d<=_){const g=1/h;f*=g,d*=g,c=f*(f+o*d+2*a)+d*(o*f+d+2*l)+u}else d=s,f=Math.max(0,-(o*d+a)),c=-f*f+d*(d+2*l)+u;else d=-s,f=Math.max(0,-(o*d+a)),c=-f*f+d*(d+2*l)+u;else d<=-_?(f=Math.max(0,-(-o*s+a)),d=f>0?-s:Math.min(Math.max(-s,-l),s),c=-f*f+d*(d+2*l)+u):d<=_?(f=0,d=Math.min(Math.max(-s,-l),s),c=d*(d+2*l)+u):(f=Math.max(0,-(o*s+a)),d=f>0?s:Math.min(Math.max(-s,-l),s),c=-f*f+d*(d+2*l)+u);else d=o>0?-s:s,f=Math.max(0,-(o*d+a)),c=-f*f+d*(d+2*l)+u;return n&&n.copy(this.origin).addScaledVector(this.direction,f),i&&i.copy(iu).addScaledVector(hl,d),c}intersectSphere(e,t){Ni.subVectors(e.center,this.origin);const n=Ni.dot(this.direction),i=Ni.dot(Ni)-n*n,s=e.radius*e.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,o,a,l;const u=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,d=this.origin;return u>=0?(n=(e.min.x-d.x)*u,i=(e.max.x-d.x)*u):(n=(e.max.x-d.x)*u,i=(e.min.x-d.x)*u),h>=0?(s=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),f>=0?(a=(e.min.z-d.z)*f,l=(e.max.z-d.z)*f):(a=(e.max.z-d.z)*f,l=(e.min.z-d.z)*f),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Ni)!==null}intersectTriangle(e,t,n,i,s){ru.subVectors(t,e),fl.subVectors(n,e),su.crossVectors(ru,fl);let o=this.direction.dot(su),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;hr.subVectors(this.origin,e);const l=a*this.direction.dot(fl.crossVectors(hr,fl));if(l<0)return null;const u=a*this.direction.dot(ru.cross(hr));if(u<0||l+u>o)return null;const h=-a*hr.dot(su);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Xt{constructor(e,t,n,i,s,o,a,l,u,h,f,d,c,_,g,p){Xt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,u,h,f,d,c,_,g,p)}set(e,t,n,i,s,o,a,l,u,h,f,d,c,_,g,p){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=i,m[1]=s,m[5]=o,m[9]=a,m[13]=l,m[2]=u,m[6]=h,m[10]=f,m[14]=d,m[3]=c,m[7]=_,m[11]=g,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Xt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/Ws.setFromMatrixColumn(e,0).length(),s=1/Ws.setFromMatrixColumn(e,1).length(),o=1/Ws.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),u=Math.sin(i),h=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const d=o*h,c=o*f,_=a*h,g=a*f;t[0]=l*h,t[4]=-l*f,t[8]=u,t[1]=c+_*u,t[5]=d-g*u,t[9]=-a*l,t[2]=g-d*u,t[6]=_+c*u,t[10]=o*l}else if(e.order==="YXZ"){const d=l*h,c=l*f,_=u*h,g=u*f;t[0]=d+g*a,t[4]=_*a-c,t[8]=o*u,t[1]=o*f,t[5]=o*h,t[9]=-a,t[2]=c*a-_,t[6]=g+d*a,t[10]=o*l}else if(e.order==="ZXY"){const d=l*h,c=l*f,_=u*h,g=u*f;t[0]=d-g*a,t[4]=-o*f,t[8]=_+c*a,t[1]=c+_*a,t[5]=o*h,t[9]=g-d*a,t[2]=-o*u,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const d=o*h,c=o*f,_=a*h,g=a*f;t[0]=l*h,t[4]=_*u-c,t[8]=d*u+g,t[1]=l*f,t[5]=g*u+d,t[9]=c*u-_,t[2]=-u,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const d=o*l,c=o*u,_=a*l,g=a*u;t[0]=l*h,t[4]=g-d*f,t[8]=_*f+c,t[1]=f,t[5]=o*h,t[9]=-a*h,t[2]=-u*h,t[6]=c*f+_,t[10]=d-g*f}else if(e.order==="XZY"){const d=o*l,c=o*u,_=a*l,g=a*u;t[0]=l*h,t[4]=-f,t[8]=u*h,t[1]=d*f+g,t[5]=o*h,t[9]=c*f-_,t[2]=_*f-c,t[6]=a*h,t[10]=g*f+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Cx,e,Px)}lookAt(e,t,n){const i=this.elements;return Dn.subVectors(e,t),Dn.lengthSq()===0&&(Dn.z=1),Dn.normalize(),fr.crossVectors(n,Dn),fr.lengthSq()===0&&(Math.abs(n.z)===1?Dn.x+=1e-4:Dn.z+=1e-4,Dn.normalize(),fr.crossVectors(n,Dn)),fr.normalize(),dl.crossVectors(Dn,fr),i[0]=fr.x,i[4]=dl.x,i[8]=Dn.x,i[1]=fr.y,i[5]=dl.y,i[9]=Dn.y,i[2]=fr.z,i[6]=dl.z,i[10]=Dn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[4],l=n[8],u=n[12],h=n[1],f=n[5],d=n[9],c=n[13],_=n[2],g=n[6],p=n[10],m=n[14],M=n[3],x=n[7],E=n[11],R=n[15],A=i[0],T=i[4],C=i[8],S=i[12],v=i[1],I=i[5],O=i[9],L=i[13],X=i[2],K=i[6],ee=i[10],j=i[14],V=i[3],re=i[7],P=i[11],ce=i[15];return s[0]=o*A+a*v+l*X+u*V,s[4]=o*T+a*I+l*K+u*re,s[8]=o*C+a*O+l*ee+u*P,s[12]=o*S+a*L+l*j+u*ce,s[1]=h*A+f*v+d*X+c*V,s[5]=h*T+f*I+d*K+c*re,s[9]=h*C+f*O+d*ee+c*P,s[13]=h*S+f*L+d*j+c*ce,s[2]=_*A+g*v+p*X+m*V,s[6]=_*T+g*I+p*K+m*re,s[10]=_*C+g*O+p*ee+m*P,s[14]=_*S+g*L+p*j+m*ce,s[3]=M*A+x*v+E*X+R*V,s[7]=M*T+x*I+E*K+R*re,s[11]=M*C+x*O+E*ee+R*P,s[15]=M*S+x*L+E*j+R*ce,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],o=e[1],a=e[5],l=e[9],u=e[13],h=e[2],f=e[6],d=e[10],c=e[14],_=e[3],g=e[7],p=e[11],m=e[15];return _*(+s*l*f-i*u*f-s*a*d+n*u*d+i*a*c-n*l*c)+g*(+t*l*c-t*u*d+s*o*d-i*o*c+i*u*h-s*l*h)+p*(+t*u*f-t*a*c-s*o*f+n*o*c+s*a*h-n*u*h)+m*(-i*a*h-t*l*f+t*a*d+i*o*f-n*o*d+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],u=e[7],h=e[8],f=e[9],d=e[10],c=e[11],_=e[12],g=e[13],p=e[14],m=e[15],M=f*p*u-g*d*u+g*l*c-a*p*c-f*l*m+a*d*m,x=_*d*u-h*p*u-_*l*c+o*p*c+h*l*m-o*d*m,E=h*g*u-_*f*u+_*a*c-o*g*c-h*a*m+o*f*m,R=_*f*l-h*g*l-_*a*d+o*g*d+h*a*p-o*f*p,A=t*M+n*x+i*E+s*R;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/A;return e[0]=M*T,e[1]=(g*d*s-f*p*s-g*i*c+n*p*c+f*i*m-n*d*m)*T,e[2]=(a*p*s-g*l*s+g*i*u-n*p*u-a*i*m+n*l*m)*T,e[3]=(f*l*s-a*d*s-f*i*u+n*d*u+a*i*c-n*l*c)*T,e[4]=x*T,e[5]=(h*p*s-_*d*s+_*i*c-t*p*c-h*i*m+t*d*m)*T,e[6]=(_*l*s-o*p*s-_*i*u+t*p*u+o*i*m-t*l*m)*T,e[7]=(o*d*s-h*l*s+h*i*u-t*d*u-o*i*c+t*l*c)*T,e[8]=E*T,e[9]=(_*f*s-h*g*s-_*n*c+t*g*c+h*n*m-t*f*m)*T,e[10]=(o*g*s-_*a*s+_*n*u-t*g*u-o*n*m+t*a*m)*T,e[11]=(h*a*s-o*f*s-h*n*u+t*f*u+o*n*c-t*a*c)*T,e[12]=R*T,e[13]=(h*g*i-_*f*i+_*n*d-t*g*d-h*n*p+t*f*p)*T,e[14]=(_*a*i-o*g*i-_*n*l+t*g*l+o*n*p-t*a*p)*T,e[15]=(o*f*i-h*a*i+h*n*l-t*f*l-o*n*d+t*a*d)*T,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,o=e.x,a=e.y,l=e.z,u=s*o,h=s*a;return this.set(u*o+n,u*a-i*l,u*l+i*a,0,u*a+i*l,h*a+n,h*l-i*o,0,u*l-i*a,h*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,o){return this.set(1,n,s,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,u=s+s,h=o+o,f=a+a,d=s*u,c=s*h,_=s*f,g=o*h,p=o*f,m=a*f,M=l*u,x=l*h,E=l*f,R=n.x,A=n.y,T=n.z;return i[0]=(1-(g+m))*R,i[1]=(c+E)*R,i[2]=(_-x)*R,i[3]=0,i[4]=(c-E)*A,i[5]=(1-(d+m))*A,i[6]=(p+M)*A,i[7]=0,i[8]=(_+x)*T,i[9]=(p-M)*T,i[10]=(1-(d+g))*T,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=Ws.set(i[0],i[1],i[2]).length();const o=Ws.set(i[4],i[5],i[6]).length(),a=Ws.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],oi.copy(this);const u=1/s,h=1/o,f=1/a;return oi.elements[0]*=u,oi.elements[1]*=u,oi.elements[2]*=u,oi.elements[4]*=h,oi.elements[5]*=h,oi.elements[6]*=h,oi.elements[8]*=f,oi.elements[9]*=f,oi.elements[10]*=f,t.setFromRotationMatrix(oi),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,i,s,o,a=Zi){const l=this.elements,u=2*s/(t-e),h=2*s/(n-i),f=(t+e)/(t-e),d=(n+i)/(n-i);let c,_;if(a===Zi)c=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===oc)c=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=c,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,o,a=Zi){const l=this.elements,u=1/(t-e),h=1/(n-i),f=1/(o-s),d=(t+e)*u,c=(n+i)*h;let _,g;if(a===Zi)_=(o+s)*f,g=-2*f;else if(a===oc)_=s*f,g=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*u,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-c,l[2]=0,l[6]=0,l[10]=g,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Ws=new Z,oi=new Xt,Cx=new Z(0,0,0),Px=new Z(1,1,1),fr=new Z,dl=new Z,Dn=new Z,wd=new Xt,Ad=new As;class rr{constructor(e=0,t=0,n=0,i=rr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],o=i[4],a=i[8],l=i[1],u=i[5],h=i[9],f=i[2],d=i[6],c=i[10];switch(t){case"XYZ":this._y=Math.asin(ln(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,c),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,u),this._z=0);break;case"YXZ":this._x=Math.asin(-ln(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,c),this._z=Math.atan2(l,u)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(ln(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,c),this._z=Math.atan2(-o,u)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-ln(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,c),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,u));break;case"YZX":this._z=Math.asin(ln(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,u),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(a,c));break;case"XZY":this._z=Math.asin(-ln(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,u),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,c),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return wd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(wd,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ad.setFromEuler(this),this.setFromQuaternion(Ad,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}rr.DEFAULT_ORDER="XYZ";class yg{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Lx=0;const Rd=new Z,Xs=new As,Oi=new Xt,pl=new Z,Go=new Z,Dx=new Z,Ix=new As,Cd=new Z(1,0,0),Pd=new Z(0,1,0),Ld=new Z(0,0,1),Dd={type:"added"},Ux={type:"removed"},Ys={type:"childadded",child:null},ou={type:"childremoved",child:null};class Vn extends Cs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Lx++}),this.uuid=Uo(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Vn.DEFAULT_UP.clone();const e=new Z,t=new rr,n=new As,i=new Z(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Xt},normalMatrix:{value:new lt}}),this.matrix=new Xt,this.matrixWorld=new Xt,this.matrixAutoUpdate=Vn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Vn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new yg,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Xs.setFromAxisAngle(e,t),this.quaternion.multiply(Xs),this}rotateOnWorldAxis(e,t){return Xs.setFromAxisAngle(e,t),this.quaternion.premultiply(Xs),this}rotateX(e){return this.rotateOnAxis(Cd,e)}rotateY(e){return this.rotateOnAxis(Pd,e)}rotateZ(e){return this.rotateOnAxis(Ld,e)}translateOnAxis(e,t){return Rd.copy(e).applyQuaternion(this.quaternion),this.position.add(Rd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Cd,e)}translateY(e){return this.translateOnAxis(Pd,e)}translateZ(e){return this.translateOnAxis(Ld,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Oi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?pl.copy(e):pl.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Go.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Oi.lookAt(Go,pl,this.up):Oi.lookAt(pl,Go,this.up),this.quaternion.setFromRotationMatrix(Oi),i&&(Oi.extractRotation(i.matrixWorld),Xs.setFromRotationMatrix(Oi),this.quaternion.premultiply(Xs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Dd),Ys.child=e,this.dispatchEvent(Ys),Ys.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Ux),ou.child=e,this.dispatchEvent(ou),ou.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Oi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Oi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Oi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Dd),Ys.child=e,this.dispatchEvent(Ys),Ys.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Go,e,Dx),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Go,Ix,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++){const s=t[n];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++){const a=i[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let u=0,h=l.length;u<h;u++){const f=l[u];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,u=this.material.length;l<u;l++)a.push(s(e.materials,this.material[l]));i.material=a}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),u=o(e.textures),h=o(e.images),f=o(e.shapes),d=o(e.skeletons),c=o(e.animations),_=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),u.length>0&&(n.textures=u),h.length>0&&(n.images=h),f.length>0&&(n.shapes=f),d.length>0&&(n.skeletons=d),c.length>0&&(n.animations=c),_.length>0&&(n.nodes=_)}return n.object=i,n;function o(a){const l=[];for(const u in a){const h=a[u];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}Vn.DEFAULT_UP=new Z(0,1,0);Vn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Vn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ai=new Z,Fi=new Z,au=new Z,Bi=new Z,qs=new Z,$s=new Z,Id=new Z,lu=new Z,cu=new Z,uu=new Z;class Mi{constructor(e=new Z,t=new Z,n=new Z){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),ai.subVectors(e,t),i.cross(ai);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){ai.subVectors(i,t),Fi.subVectors(n,t),au.subVectors(e,t);const o=ai.dot(ai),a=ai.dot(Fi),l=ai.dot(au),u=Fi.dot(Fi),h=Fi.dot(au),f=o*u-a*a;if(f===0)return s.set(0,0,0),null;const d=1/f,c=(u*l-a*h)*d,_=(o*h-a*l)*d;return s.set(1-c-_,_,c)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Bi)===null?!1:Bi.x>=0&&Bi.y>=0&&Bi.x+Bi.y<=1}static getInterpolation(e,t,n,i,s,o,a,l){return this.getBarycoord(e,t,n,i,Bi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Bi.x),l.addScaledVector(o,Bi.y),l.addScaledVector(a,Bi.z),l)}static isFrontFacing(e,t,n,i){return ai.subVectors(n,t),Fi.subVectors(e,t),ai.cross(Fi).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ai.subVectors(this.c,this.b),Fi.subVectors(this.a,this.b),ai.cross(Fi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Mi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Mi.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return Mi.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return Mi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Mi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let o,a;qs.subVectors(i,n),$s.subVectors(s,n),lu.subVectors(e,n);const l=qs.dot(lu),u=$s.dot(lu);if(l<=0&&u<=0)return t.copy(n);cu.subVectors(e,i);const h=qs.dot(cu),f=$s.dot(cu);if(h>=0&&f<=h)return t.copy(i);const d=l*f-h*u;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(n).addScaledVector(qs,o);uu.subVectors(e,s);const c=qs.dot(uu),_=$s.dot(uu);if(_>=0&&c<=_)return t.copy(s);const g=c*u-l*_;if(g<=0&&u>=0&&_<=0)return a=u/(u-_),t.copy(n).addScaledVector($s,a);const p=h*_-c*f;if(p<=0&&f-h>=0&&c-_>=0)return Id.subVectors(s,i),a=(f-h)/(f-h+(c-_)),t.copy(i).addScaledVector(Id,a);const m=1/(p+g+d);return o=g*m,a=d*m,t.copy(n).addScaledVector(qs,o).addScaledVector($s,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Sg={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},dr={h:0,s:0,l:0},ml={h:0,s:0,l:0};function hu(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class Mt{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Kn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,St.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=St.workingColorSpace){return this.r=e,this.g=t,this.b=n,St.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=St.workingColorSpace){if(e=Oh(e,1),t=ln(t,0,1),n=ln(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=hu(o,s,e+1/3),this.g=hu(o,s,e),this.b=hu(o,s,e-1/3)}return St.toWorkingColorSpace(this,i),this}setStyle(e,t=Kn){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Kn){const n=Sg[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=So(e.r),this.g=So(e.g),this.b=So(e.b),this}copyLinearToSRGB(e){return this.r=Jc(e.r),this.g=Jc(e.g),this.b=Jc(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Kn){return St.fromWorkingColorSpace(sn.copy(this),e),Math.round(ln(sn.r*255,0,255))*65536+Math.round(ln(sn.g*255,0,255))*256+Math.round(ln(sn.b*255,0,255))}getHexString(e=Kn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=St.workingColorSpace){St.fromWorkingColorSpace(sn.copy(this),t);const n=sn.r,i=sn.g,s=sn.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let l,u;const h=(a+o)/2;if(a===o)l=0,u=0;else{const f=o-a;switch(u=h<=.5?f/(o+a):f/(2-o-a),o){case n:l=(i-s)/f+(i<s?6:0);break;case i:l=(s-n)/f+2;break;case s:l=(n-i)/f+4;break}l/=6}return e.h=l,e.s=u,e.l=h,e}getRGB(e,t=St.workingColorSpace){return St.fromWorkingColorSpace(sn.copy(this),t),e.r=sn.r,e.g=sn.g,e.b=sn.b,e}getStyle(e=Kn){St.fromWorkingColorSpace(sn.copy(this),e);const t=sn.r,n=sn.g,i=sn.b;return e!==Kn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(dr),this.setHSL(dr.h+e,dr.s+t,dr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(dr),e.getHSL(ml);const n=ya(dr.h,ml.h,t),i=ya(dr.s,ml.s,t),s=ya(dr.l,ml.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const sn=new Mt;Mt.NAMES=Sg;let Nx=0;class gc extends Cs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Nx++}),this.uuid=Uo(),this.name="",this.type="Material",this.blending=xo,this.side=Or,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=eh,this.blendDst=th,this.blendEquation=rs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Mt(0,0,0),this.blendAlpha=0,this.depthFunc=nc,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=vd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=zs,this.stencilZFail=zs,this.stencilZPass=zs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==xo&&(n.blending=this.blending),this.side!==Or&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==eh&&(n.blendSrc=this.blendSrc),this.blendDst!==th&&(n.blendDst=this.blendDst),this.blendEquation!==rs&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==nc&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==vd&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==zs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==zs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==zs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=i(e.textures),o=i(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Mg extends gc{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Mt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new rr,this.combine=og,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Bt=new Z,gl=new it;class Pi{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=xd,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=br,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return Sx("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)gl.fromBufferAttribute(this,t),gl.applyMatrix3(e),this.setXY(t,gl.x,gl.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyMatrix3(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyMatrix4(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyNormalMatrix(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.transformDirection(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=ro(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=mn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ro(t,this.array)),t}setX(e,t){return this.normalized&&(t=mn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ro(t,this.array)),t}setY(e,t){return this.normalized&&(t=mn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ro(t,this.array)),t}setZ(e,t){return this.normalized&&(t=mn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ro(t,this.array)),t}setW(e,t){return this.normalized&&(t=mn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=mn(t,this.array),n=mn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=mn(t,this.array),n=mn(n,this.array),i=mn(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=mn(t,this.array),n=mn(n,this.array),i=mn(i,this.array),s=mn(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==xd&&(e.usage=this.usage),e}}class Eg extends Pi{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Tg extends Pi{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Li extends Pi{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Ox=0;const qn=new Xt,fu=new Vn,Ks=new Z,In=new Va,Wo=new Va,$t=new Z;class Hr extends Cs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ox++}),this.uuid=Uo(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(gg(e)?Tg:Eg)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new lt().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return qn.makeRotationFromQuaternion(e),this.applyMatrix4(qn),this}rotateX(e){return qn.makeRotationX(e),this.applyMatrix4(qn),this}rotateY(e){return qn.makeRotationY(e),this.applyMatrix4(qn),this}rotateZ(e){return qn.makeRotationZ(e),this.applyMatrix4(qn),this}translate(e,t,n){return qn.makeTranslation(e,t,n),this.applyMatrix4(qn),this}scale(e,t,n){return qn.makeScale(e,t,n),this.applyMatrix4(qn),this}lookAt(e){return fu.lookAt(e),fu.updateMatrix(),this.applyMatrix4(fu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ks).negate(),this.translate(Ks.x,Ks.y,Ks.z),this}setFromPoints(e){const t=[];for(let n=0,i=e.length;n<i;n++){const s=e[n];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Li(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Va);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new Z(-1/0,-1/0,-1/0),new Z(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];In.setFromBufferAttribute(s),this.morphTargetsRelative?($t.addVectors(this.boundingBox.min,In.min),this.boundingBox.expandByPoint($t),$t.addVectors(this.boundingBox.max,In.max),this.boundingBox.expandByPoint($t)):(this.boundingBox.expandByPoint(In.min),this.boundingBox.expandByPoint(In.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Fh);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new Z,1/0);return}if(e){const n=this.boundingSphere.center;if(In.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];Wo.setFromBufferAttribute(a),this.morphTargetsRelative?($t.addVectors(In.min,Wo.min),In.expandByPoint($t),$t.addVectors(In.max,Wo.max),In.expandByPoint($t)):(In.expandByPoint(Wo.min),In.expandByPoint(Wo.max))}In.getCenter(n);let i=0;for(let s=0,o=e.count;s<o;s++)$t.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared($t));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let u=0,h=a.count;u<h;u++)$t.fromBufferAttribute(a,u),l&&(Ks.fromBufferAttribute(e,u),$t.add(Ks)),i=Math.max(i,n.distanceToSquared($t))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Pi(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let C=0;C<n.count;C++)a[C]=new Z,l[C]=new Z;const u=new Z,h=new Z,f=new Z,d=new it,c=new it,_=new it,g=new Z,p=new Z;function m(C,S,v){u.fromBufferAttribute(n,C),h.fromBufferAttribute(n,S),f.fromBufferAttribute(n,v),d.fromBufferAttribute(s,C),c.fromBufferAttribute(s,S),_.fromBufferAttribute(s,v),h.sub(u),f.sub(u),c.sub(d),_.sub(d);const I=1/(c.x*_.y-_.x*c.y);isFinite(I)&&(g.copy(h).multiplyScalar(_.y).addScaledVector(f,-c.y).multiplyScalar(I),p.copy(f).multiplyScalar(c.x).addScaledVector(h,-_.x).multiplyScalar(I),a[C].add(g),a[S].add(g),a[v].add(g),l[C].add(p),l[S].add(p),l[v].add(p))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let C=0,S=M.length;C<S;++C){const v=M[C],I=v.start,O=v.count;for(let L=I,X=I+O;L<X;L+=3)m(e.getX(L+0),e.getX(L+1),e.getX(L+2))}const x=new Z,E=new Z,R=new Z,A=new Z;function T(C){R.fromBufferAttribute(i,C),A.copy(R);const S=a[C];x.copy(S),x.sub(R.multiplyScalar(R.dot(S))).normalize(),E.crossVectors(A,S);const I=E.dot(l[C])<0?-1:1;o.setXYZW(C,x.x,x.y,x.z,I)}for(let C=0,S=M.length;C<S;++C){const v=M[C],I=v.start,O=v.count;for(let L=I,X=I+O;L<X;L+=3)T(e.getX(L+0)),T(e.getX(L+1)),T(e.getX(L+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Pi(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,c=n.count;d<c;d++)n.setXYZ(d,0,0,0);const i=new Z,s=new Z,o=new Z,a=new Z,l=new Z,u=new Z,h=new Z,f=new Z;if(e)for(let d=0,c=e.count;d<c;d+=3){const _=e.getX(d+0),g=e.getX(d+1),p=e.getX(d+2);i.fromBufferAttribute(t,_),s.fromBufferAttribute(t,g),o.fromBufferAttribute(t,p),h.subVectors(o,s),f.subVectors(i,s),h.cross(f),a.fromBufferAttribute(n,_),l.fromBufferAttribute(n,g),u.fromBufferAttribute(n,p),a.add(h),l.add(h),u.add(h),n.setXYZ(_,a.x,a.y,a.z),n.setXYZ(g,l.x,l.y,l.z),n.setXYZ(p,u.x,u.y,u.z)}else for(let d=0,c=t.count;d<c;d+=3)i.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,s),f.subVectors(i,s),h.cross(f),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)$t.fromBufferAttribute(e,t),$t.normalize(),e.setXYZ(t,$t.x,$t.y,$t.z)}toNonIndexed(){function e(a,l){const u=a.array,h=a.itemSize,f=a.normalized,d=new u.constructor(l.length*h);let c=0,_=0;for(let g=0,p=l.length;g<p;g++){a.isInterleavedBufferAttribute?c=l[g]*a.data.stride+a.offset:c=l[g]*h;for(let m=0;m<h;m++)d[_++]=u[c++]}return new Pi(d,h,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Hr,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],u=e(l,n);t.setAttribute(a,u)}const s=this.morphAttributes;for(const a in s){const l=[],u=s[a];for(let h=0,f=u.length;h<f;h++){const d=u[h],c=e(d,n);l.push(c)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const u=o[a];t.addGroup(u.start,u.count,u.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const u in l)l[u]!==void 0&&(e[u]=l[u]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const u=n[l];e.data.attributes[l]=u.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const u=this.morphAttributes[l],h=[];for(let f=0,d=u.length;f<d;f++){const c=u[f];h.push(c.toJSON(e.data))}h.length>0&&(i[l]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const u in i){const h=i[u];this.setAttribute(u,h.clone(t))}const s=e.morphAttributes;for(const u in s){const h=[],f=s[u];for(let d=0,c=f.length;d<c;d++)h.push(f[d].clone(t));this.morphAttributes[u]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let u=0,h=o.length;u<h;u++){const f=o[u];this.addGroup(f.start,f.count,f.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ud=new Xt,Kr=new xg,_l=new Fh,Nd=new Z,js=new Z,Zs=new Z,Js=new Z,du=new Z,vl=new Z,xl=new it,yl=new it,Sl=new it,Od=new Z,Fd=new Z,Bd=new Z,Ml=new Z,El=new Z;class Ai extends Vn{constructor(e=new Hr,t=new Mg){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(s&&a){vl.set(0,0,0);for(let l=0,u=s.length;l<u;l++){const h=a[l],f=s[l];h!==0&&(du.fromBufferAttribute(f,e),o?vl.addScaledVector(du,h):vl.addScaledVector(du.sub(t),h))}t.add(vl)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),_l.copy(n.boundingSphere),_l.applyMatrix4(s),Kr.copy(e.ray).recast(e.near),!(_l.containsPoint(Kr.origin)===!1&&(Kr.intersectSphere(_l,Nd)===null||Kr.origin.distanceToSquared(Nd)>(e.far-e.near)**2))&&(Ud.copy(s).invert(),Kr.copy(e.ray).applyMatrix4(Ud),!(n.boundingBox!==null&&Kr.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Kr)))}_computeIntersections(e,t,n){let i;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,u=s.attributes.uv,h=s.attributes.uv1,f=s.attributes.normal,d=s.groups,c=s.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,g=d.length;_<g;_++){const p=d[_],m=o[p.materialIndex],M=Math.max(p.start,c.start),x=Math.min(a.count,Math.min(p.start+p.count,c.start+c.count));for(let E=M,R=x;E<R;E+=3){const A=a.getX(E),T=a.getX(E+1),C=a.getX(E+2);i=Tl(this,m,e,n,u,h,f,A,T,C),i&&(i.faceIndex=Math.floor(E/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{const _=Math.max(0,c.start),g=Math.min(a.count,c.start+c.count);for(let p=_,m=g;p<m;p+=3){const M=a.getX(p),x=a.getX(p+1),E=a.getX(p+2);i=Tl(this,o,e,n,u,h,f,M,x,E),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let _=0,g=d.length;_<g;_++){const p=d[_],m=o[p.materialIndex],M=Math.max(p.start,c.start),x=Math.min(l.count,Math.min(p.start+p.count,c.start+c.count));for(let E=M,R=x;E<R;E+=3){const A=E,T=E+1,C=E+2;i=Tl(this,m,e,n,u,h,f,A,T,C),i&&(i.faceIndex=Math.floor(E/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{const _=Math.max(0,c.start),g=Math.min(l.count,c.start+c.count);for(let p=_,m=g;p<m;p+=3){const M=p,x=p+1,E=p+2;i=Tl(this,o,e,n,u,h,f,M,x,E),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}}}function Fx(r,e,t,n,i,s,o,a){let l;if(e.side===Pn?l=n.intersectTriangle(o,s,i,!0,a):l=n.intersectTriangle(i,s,o,e.side===Or,a),l===null)return null;El.copy(a),El.applyMatrix4(r.matrixWorld);const u=t.ray.origin.distanceTo(El);return u<t.near||u>t.far?null:{distance:u,point:El.clone(),object:r}}function Tl(r,e,t,n,i,s,o,a,l,u){r.getVertexPosition(a,js),r.getVertexPosition(l,Zs),r.getVertexPosition(u,Js);const h=Fx(r,e,t,n,js,Zs,Js,Ml);if(h){i&&(xl.fromBufferAttribute(i,a),yl.fromBufferAttribute(i,l),Sl.fromBufferAttribute(i,u),h.uv=Mi.getInterpolation(Ml,js,Zs,Js,xl,yl,Sl,new it)),s&&(xl.fromBufferAttribute(s,a),yl.fromBufferAttribute(s,l),Sl.fromBufferAttribute(s,u),h.uv1=Mi.getInterpolation(Ml,js,Zs,Js,xl,yl,Sl,new it)),o&&(Od.fromBufferAttribute(o,a),Fd.fromBufferAttribute(o,l),Bd.fromBufferAttribute(o,u),h.normal=Mi.getInterpolation(Ml,js,Zs,Js,Od,Fd,Bd,new Z),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a,b:l,c:u,normal:new Z,materialIndex:0};Mi.getNormal(js,Zs,Js,f.normal),h.face=f}return h}class Ga extends Hr{constructor(e=1,t=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const l=[],u=[],h=[],f=[];let d=0,c=0;_("z","y","x",-1,-1,n,t,e,o,s,0),_("z","y","x",1,-1,n,t,-e,o,s,1),_("x","z","y",1,1,e,n,t,i,o,2),_("x","z","y",1,-1,e,n,-t,i,o,3),_("x","y","z",1,-1,e,t,n,i,s,4),_("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new Li(u,3)),this.setAttribute("normal",new Li(h,3)),this.setAttribute("uv",new Li(f,2));function _(g,p,m,M,x,E,R,A,T,C,S){const v=E/T,I=R/C,O=E/2,L=R/2,X=A/2,K=T+1,ee=C+1;let j=0,V=0;const re=new Z;for(let P=0;P<ee;P++){const ce=P*I-L;for(let Te=0;Te<K;Te++){const Fe=Te*v-O;re[g]=Fe*M,re[p]=ce*x,re[m]=X,u.push(re.x,re.y,re.z),re[g]=0,re[p]=0,re[m]=A>0?1:-1,h.push(re.x,re.y,re.z),f.push(Te/T),f.push(1-P/C),j+=1}}for(let P=0;P<C;P++)for(let ce=0;ce<T;ce++){const Te=d+ce+K*P,Fe=d+ce+K*(P+1),Y=d+(ce+1)+K*(P+1),ue=d+(ce+1)+K*P;l.push(Te,Fe,ue),l.push(Fe,Y,ue),V+=6}a.addGroup(c,V,S),c+=V,d+=j}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ga(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Do(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function gn(r){const e={};for(let t=0;t<r.length;t++){const n=Do(r[t]);for(const i in n)e[i]=n[i]}return e}function Bx(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function bg(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:St.workingColorSpace}const zx={clone:Do,merge:gn};var kx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Hx=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class sr extends gc{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=kx,this.fragmentShader=Hx,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Do(e.uniforms),this.uniformsGroups=Bx(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class wg extends Vn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Xt,this.projectionMatrix=new Xt,this.projectionMatrixInverse=new Xt,this.coordinateSystem=Zi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const pr=new Z,zd=new it,kd=new it;class Jn extends wg{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Oa*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(xa*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Oa*2*Math.atan(Math.tan(xa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){pr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(pr.x,pr.y).multiplyScalar(-e/pr.z),pr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(pr.x,pr.y).multiplyScalar(-e/pr.z)}getViewSize(e,t){return this.getViewBounds(e,zd,kd),t.subVectors(kd,zd)}setViewOffset(e,t,n,i,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(xa*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,u=o.fullHeight;s+=o.offsetX*i/l,t-=o.offsetY*n/u,i*=o.width/l,n*=o.height/u}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Qs=-90,eo=1;class Vx extends Vn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Jn(Qs,eo,e,t);i.layers=this.layers,this.add(i);const s=new Jn(Qs,eo,e,t);s.layers=this.layers,this.add(s);const o=new Jn(Qs,eo,e,t);o.layers=this.layers,this.add(o);const a=new Jn(Qs,eo,e,t);a.layers=this.layers,this.add(a);const l=new Jn(Qs,eo,e,t);l.layers=this.layers,this.add(l);const u=new Jn(Qs,eo,e,t);u.layers=this.layers,this.add(u)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,o,a,l]=t;for(const u of t)this.remove(u);if(e===Zi)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===oc)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const u of t)this.add(u),u.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,u,h]=this.children,f=e.getRenderTarget(),d=e.getActiveCubeFace(),c=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,u),n.texture.generateMipmaps=g,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(f,d,c),e.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class Ag extends Tn{constructor(e,t,n,i,s,o,a,l,u,h){e=e!==void 0?e:[],t=t!==void 0?t:Co,super(e,t,n,i,s,o,a,l,u,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Gx extends ws{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Ag(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:di}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Ga(5,5,5),s=new sr({name:"CubemapFromEquirect",uniforms:Do(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Pn,blending:Lr});s.uniforms.tEquirect.value=t;const o=new Ai(i,s),a=t.minFilter;return t.minFilter===cs&&(t.minFilter=di),new Vx(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,i){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(s)}}const pu=new Z,Wx=new Z,Xx=new lt;class _r{constructor(e=new Z(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=pu.subVectors(n,t).cross(Wx.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(pu),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Xx.getNormalMatrix(e),i=this.coplanarPoint(pu).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const jr=new Fh,bl=new Z;class Rg{constructor(e=new _r,t=new _r,n=new _r,i=new _r,s=new _r,o=new _r){this.planes=[e,t,n,i,s,o]}set(e,t,n,i,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Zi){const n=this.planes,i=e.elements,s=i[0],o=i[1],a=i[2],l=i[3],u=i[4],h=i[5],f=i[6],d=i[7],c=i[8],_=i[9],g=i[10],p=i[11],m=i[12],M=i[13],x=i[14],E=i[15];if(n[0].setComponents(l-s,d-u,p-c,E-m).normalize(),n[1].setComponents(l+s,d+u,p+c,E+m).normalize(),n[2].setComponents(l+o,d+h,p+_,E+M).normalize(),n[3].setComponents(l-o,d-h,p-_,E-M).normalize(),n[4].setComponents(l-a,d-f,p-g,E-x).normalize(),t===Zi)n[5].setComponents(l+a,d+f,p+g,E+x).normalize();else if(t===oc)n[5].setComponents(a,f,g,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),jr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),jr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(jr)}intersectsSprite(e){return jr.center.set(0,0,0),jr.radius=.7071067811865476,jr.applyMatrix4(e.matrixWorld),this.intersectsSphere(jr)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(bl.x=i.normal.x>0?e.max.x:e.min.x,bl.y=i.normal.y>0?e.max.y:e.min.y,bl.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(bl)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Cg(){let r=null,e=!1,t=null,n=null;function i(s,o){t(s,o),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function Yx(r){const e=new WeakMap;function t(a,l){const u=a.array,h=a.usage,f=u.byteLength,d=r.createBuffer();r.bindBuffer(l,d),r.bufferData(l,u,h),a.onUploadCallback();let c;if(u instanceof Float32Array)c=r.FLOAT;else if(u instanceof Uint16Array)a.isFloat16BufferAttribute?c=r.HALF_FLOAT:c=r.UNSIGNED_SHORT;else if(u instanceof Int16Array)c=r.SHORT;else if(u instanceof Uint32Array)c=r.UNSIGNED_INT;else if(u instanceof Int32Array)c=r.INT;else if(u instanceof Int8Array)c=r.BYTE;else if(u instanceof Uint8Array)c=r.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)c=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:d,type:c,bytesPerElement:u.BYTES_PER_ELEMENT,version:a.version,size:f}}function n(a,l,u){const h=l.array,f=l._updateRange,d=l.updateRanges;if(r.bindBuffer(u,a),f.count===-1&&d.length===0&&r.bufferSubData(u,0,h),d.length!==0){for(let c=0,_=d.length;c<_;c++){const g=d[c];r.bufferSubData(u,g.start*h.BYTES_PER_ELEMENT,h,g.start,g.count)}l.clearUpdateRanges()}f.count!==-1&&(r.bufferSubData(u,f.offset*h.BYTES_PER_ELEMENT,h,f.offset,f.count),f.count=-1),l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(r.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}a.isInterleavedBufferAttribute&&(a=a.data);const u=e.get(a);if(u===void 0)e.set(a,t(a,l));else if(u.version<a.version){if(u.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(u.buffer,a,l),u.version=a.version}}return{get:i,remove:s,update:o}}class _c extends Hr{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),u=a+1,h=l+1,f=e/a,d=t/l,c=[],_=[],g=[],p=[];for(let m=0;m<h;m++){const M=m*d-o;for(let x=0;x<u;x++){const E=x*f-s;_.push(E,-M,0),g.push(0,0,1),p.push(x/a),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let M=0;M<a;M++){const x=M+u*m,E=M+u*(m+1),R=M+1+u*(m+1),A=M+1+u*m;c.push(x,E,A),c.push(E,R,A)}this.setIndex(c),this.setAttribute("position",new Li(_,3)),this.setAttribute("normal",new Li(g,3)),this.setAttribute("uv",new Li(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _c(e.width,e.height,e.widthSegments,e.heightSegments)}}var qx=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,$x=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Kx=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,jx=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Zx=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Jx=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Qx=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,ey=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ty=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,ny=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,iy=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ry=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,sy=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,oy=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,ay=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,ly=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,cy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,uy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,hy=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,fy=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,dy=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,py=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,my=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,gy=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,_y=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,vy=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,xy=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,yy=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Sy=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,My=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ey="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ty=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,by=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,wy=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Ay=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Ry=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Cy=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Py=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ly=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Dy=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Iy=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Uy=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Ny=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Oy=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Fy=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,By=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,zy=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,ky=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Hy=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Vy=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Gy=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Wy=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Xy=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Yy=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,qy=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,$y=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ky=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,jy=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Zy=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Jy=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Qy=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,eS=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,tS=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,nS=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,iS=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,rS=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,sS=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[MORPHTARGETS_COUNT];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,oS=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,aS=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,lS=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
	#endif
	#ifdef MORPHTARGETS_TEXTURE
		#ifndef USE_INSTANCING_MORPH
			uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		#endif
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,cS=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,uS=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,hS=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,fS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,dS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,pS=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,mS=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,gS=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,_S=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,vS=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,xS=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,yS=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,SS=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,MS=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ES=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,TS=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,bS=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,wS=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,AS=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,RS=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return shadow;
	}
#endif`,CS=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,PS=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,LS=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,DS=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,IS=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,US=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,NS=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,OS=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,FS=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,BS=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,zS=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,kS=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,HS=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,VS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,GS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,WS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,XS=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const YS=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,qS=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$S=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,KS=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ZS=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,JS=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,QS=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,eM=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,tM=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,nM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,iM=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rM=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sM=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,oM=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,aM=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lM=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,cM=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,uM=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,hM=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fM=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,dM=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,pM=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,mM=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gM=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,_M=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vM=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,xM=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yM=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,SM=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,MM=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,EM=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,TM=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,bM=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,at={alphahash_fragment:qx,alphahash_pars_fragment:$x,alphamap_fragment:Kx,alphamap_pars_fragment:jx,alphatest_fragment:Zx,alphatest_pars_fragment:Jx,aomap_fragment:Qx,aomap_pars_fragment:ey,batching_pars_vertex:ty,batching_vertex:ny,begin_vertex:iy,beginnormal_vertex:ry,bsdfs:sy,iridescence_fragment:oy,bumpmap_pars_fragment:ay,clipping_planes_fragment:ly,clipping_planes_pars_fragment:cy,clipping_planes_pars_vertex:uy,clipping_planes_vertex:hy,color_fragment:fy,color_pars_fragment:dy,color_pars_vertex:py,color_vertex:my,common:gy,cube_uv_reflection_fragment:_y,defaultnormal_vertex:vy,displacementmap_pars_vertex:xy,displacementmap_vertex:yy,emissivemap_fragment:Sy,emissivemap_pars_fragment:My,colorspace_fragment:Ey,colorspace_pars_fragment:Ty,envmap_fragment:by,envmap_common_pars_fragment:wy,envmap_pars_fragment:Ay,envmap_pars_vertex:Ry,envmap_physical_pars_fragment:zy,envmap_vertex:Cy,fog_vertex:Py,fog_pars_vertex:Ly,fog_fragment:Dy,fog_pars_fragment:Iy,gradientmap_pars_fragment:Uy,lightmap_pars_fragment:Ny,lights_lambert_fragment:Oy,lights_lambert_pars_fragment:Fy,lights_pars_begin:By,lights_toon_fragment:ky,lights_toon_pars_fragment:Hy,lights_phong_fragment:Vy,lights_phong_pars_fragment:Gy,lights_physical_fragment:Wy,lights_physical_pars_fragment:Xy,lights_fragment_begin:Yy,lights_fragment_maps:qy,lights_fragment_end:$y,logdepthbuf_fragment:Ky,logdepthbuf_pars_fragment:jy,logdepthbuf_pars_vertex:Zy,logdepthbuf_vertex:Jy,map_fragment:Qy,map_pars_fragment:eS,map_particle_fragment:tS,map_particle_pars_fragment:nS,metalnessmap_fragment:iS,metalnessmap_pars_fragment:rS,morphinstance_vertex:sS,morphcolor_vertex:oS,morphnormal_vertex:aS,morphtarget_pars_vertex:lS,morphtarget_vertex:cS,normal_fragment_begin:uS,normal_fragment_maps:hS,normal_pars_fragment:fS,normal_pars_vertex:dS,normal_vertex:pS,normalmap_pars_fragment:mS,clearcoat_normal_fragment_begin:gS,clearcoat_normal_fragment_maps:_S,clearcoat_pars_fragment:vS,iridescence_pars_fragment:xS,opaque_fragment:yS,packing:SS,premultiplied_alpha_fragment:MS,project_vertex:ES,dithering_fragment:TS,dithering_pars_fragment:bS,roughnessmap_fragment:wS,roughnessmap_pars_fragment:AS,shadowmap_pars_fragment:RS,shadowmap_pars_vertex:CS,shadowmap_vertex:PS,shadowmask_pars_fragment:LS,skinbase_vertex:DS,skinning_pars_vertex:IS,skinning_vertex:US,skinnormal_vertex:NS,specularmap_fragment:OS,specularmap_pars_fragment:FS,tonemapping_fragment:BS,tonemapping_pars_fragment:zS,transmission_fragment:kS,transmission_pars_fragment:HS,uv_pars_fragment:VS,uv_pars_vertex:GS,uv_vertex:WS,worldpos_vertex:XS,background_vert:YS,background_frag:qS,backgroundCube_vert:$S,backgroundCube_frag:KS,cube_vert:jS,cube_frag:ZS,depth_vert:JS,depth_frag:QS,distanceRGBA_vert:eM,distanceRGBA_frag:tM,equirect_vert:nM,equirect_frag:iM,linedashed_vert:rM,linedashed_frag:sM,meshbasic_vert:oM,meshbasic_frag:aM,meshlambert_vert:lM,meshlambert_frag:cM,meshmatcap_vert:uM,meshmatcap_frag:hM,meshnormal_vert:fM,meshnormal_frag:dM,meshphong_vert:pM,meshphong_frag:mM,meshphysical_vert:gM,meshphysical_frag:_M,meshtoon_vert:vM,meshtoon_frag:xM,points_vert:yM,points_frag:SM,shadow_vert:MM,shadow_frag:EM,sprite_vert:TM,sprite_frag:bM},Ae={common:{diffuse:{value:new Mt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new lt},alphaMap:{value:null},alphaMapTransform:{value:new lt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new lt}},envmap:{envMap:{value:null},envMapRotation:{value:new lt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new lt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new lt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new lt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new lt},normalScale:{value:new it(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new lt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new lt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new lt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new lt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Mt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Mt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new lt},alphaTest:{value:0},uvTransform:{value:new lt}},sprite:{diffuse:{value:new Mt(16777215)},opacity:{value:1},center:{value:new it(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new lt},alphaMap:{value:null},alphaMapTransform:{value:new lt},alphaTest:{value:0}}},yi={basic:{uniforms:gn([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.fog]),vertexShader:at.meshbasic_vert,fragmentShader:at.meshbasic_frag},lambert:{uniforms:gn([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,Ae.lights,{emissive:{value:new Mt(0)}}]),vertexShader:at.meshlambert_vert,fragmentShader:at.meshlambert_frag},phong:{uniforms:gn([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,Ae.lights,{emissive:{value:new Mt(0)},specular:{value:new Mt(1118481)},shininess:{value:30}}]),vertexShader:at.meshphong_vert,fragmentShader:at.meshphong_frag},standard:{uniforms:gn([Ae.common,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.roughnessmap,Ae.metalnessmap,Ae.fog,Ae.lights,{emissive:{value:new Mt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:at.meshphysical_vert,fragmentShader:at.meshphysical_frag},toon:{uniforms:gn([Ae.common,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.gradientmap,Ae.fog,Ae.lights,{emissive:{value:new Mt(0)}}]),vertexShader:at.meshtoon_vert,fragmentShader:at.meshtoon_frag},matcap:{uniforms:gn([Ae.common,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,{matcap:{value:null}}]),vertexShader:at.meshmatcap_vert,fragmentShader:at.meshmatcap_frag},points:{uniforms:gn([Ae.points,Ae.fog]),vertexShader:at.points_vert,fragmentShader:at.points_frag},dashed:{uniforms:gn([Ae.common,Ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:at.linedashed_vert,fragmentShader:at.linedashed_frag},depth:{uniforms:gn([Ae.common,Ae.displacementmap]),vertexShader:at.depth_vert,fragmentShader:at.depth_frag},normal:{uniforms:gn([Ae.common,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,{opacity:{value:1}}]),vertexShader:at.meshnormal_vert,fragmentShader:at.meshnormal_frag},sprite:{uniforms:gn([Ae.sprite,Ae.fog]),vertexShader:at.sprite_vert,fragmentShader:at.sprite_frag},background:{uniforms:{uvTransform:{value:new lt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:at.background_vert,fragmentShader:at.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new lt}},vertexShader:at.backgroundCube_vert,fragmentShader:at.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:at.cube_vert,fragmentShader:at.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:at.equirect_vert,fragmentShader:at.equirect_frag},distanceRGBA:{uniforms:gn([Ae.common,Ae.displacementmap,{referencePosition:{value:new Z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:at.distanceRGBA_vert,fragmentShader:at.distanceRGBA_frag},shadow:{uniforms:gn([Ae.lights,Ae.fog,{color:{value:new Mt(0)},opacity:{value:1}}]),vertexShader:at.shadow_vert,fragmentShader:at.shadow_frag}};yi.physical={uniforms:gn([yi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new lt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new lt},clearcoatNormalScale:{value:new it(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new lt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new lt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new lt},sheen:{value:0},sheenColor:{value:new Mt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new lt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new lt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new lt},transmissionSamplerSize:{value:new it},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new lt},attenuationDistance:{value:0},attenuationColor:{value:new Mt(0)},specularColor:{value:new Mt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new lt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new lt},anisotropyVector:{value:new it},anisotropyMap:{value:null},anisotropyMapTransform:{value:new lt}}]),vertexShader:at.meshphysical_vert,fragmentShader:at.meshphysical_frag};const wl={r:0,b:0,g:0},Zr=new rr,wM=new Xt;function AM(r,e,t,n,i,s,o){const a=new Mt(0);let l=s===!0?0:1,u,h,f=null,d=0,c=null;function _(M){let x=M.isScene===!0?M.background:null;return x&&x.isTexture&&(x=(M.backgroundBlurriness>0?t:e).get(x)),x}function g(M){let x=!1;const E=_(M);E===null?m(a,l):E&&E.isColor&&(m(E,1),x=!0);const R=r.xr.getEnvironmentBlendMode();R==="additive"?n.buffers.color.setClear(0,0,0,1,o):R==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||x)&&r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil)}function p(M,x){const E=_(x);E&&(E.isCubeTexture||E.mapping===dc)?(h===void 0&&(h=new Ai(new Ga(1,1,1),new sr({name:"BackgroundCubeMaterial",uniforms:Do(yi.backgroundCube.uniforms),vertexShader:yi.backgroundCube.vertexShader,fragmentShader:yi.backgroundCube.fragmentShader,side:Pn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(R,A,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),Zr.copy(x.backgroundRotation),Zr.x*=-1,Zr.y*=-1,Zr.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(Zr.y*=-1,Zr.z*=-1),h.material.uniforms.envMap.value=E,h.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(wM.makeRotationFromEuler(Zr)),h.material.toneMapped=St.getTransfer(E.colorSpace)!==wt,(f!==E||d!==E.version||c!==r.toneMapping)&&(h.material.needsUpdate=!0,f=E,d=E.version,c=r.toneMapping),h.layers.enableAll(),M.unshift(h,h.geometry,h.material,0,0,null)):E&&E.isTexture&&(u===void 0&&(u=new Ai(new _c(2,2),new sr({name:"BackgroundMaterial",uniforms:Do(yi.background.uniforms),vertexShader:yi.background.vertexShader,fragmentShader:yi.background.fragmentShader,side:Or,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),Object.defineProperty(u.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(u)),u.material.uniforms.t2D.value=E,u.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,u.material.toneMapped=St.getTransfer(E.colorSpace)!==wt,E.matrixAutoUpdate===!0&&E.updateMatrix(),u.material.uniforms.uvTransform.value.copy(E.matrix),(f!==E||d!==E.version||c!==r.toneMapping)&&(u.material.needsUpdate=!0,f=E,d=E.version,c=r.toneMapping),u.layers.enableAll(),M.unshift(u,u.geometry,u.material,0,0,null))}function m(M,x){M.getRGB(wl,bg(r)),n.buffers.color.setClear(wl.r,wl.g,wl.b,x,o)}return{getClearColor:function(){return a},setClearColor:function(M,x=1){a.set(M),l=x,m(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(M){l=M,m(a,l)},render:g,addToRenderList:p}}function RM(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=d(null);let s=i,o=!1;function a(v,I,O,L,X){let K=!1;const ee=f(L,O,I);s!==ee&&(s=ee,u(s.object)),K=c(v,L,O,X),K&&_(v,L,O,X),X!==null&&e.update(X,r.ELEMENT_ARRAY_BUFFER),(K||o)&&(o=!1,E(v,I,O,L),X!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(X).buffer))}function l(){return r.createVertexArray()}function u(v){return r.bindVertexArray(v)}function h(v){return r.deleteVertexArray(v)}function f(v,I,O){const L=O.wireframe===!0;let X=n[v.id];X===void 0&&(X={},n[v.id]=X);let K=X[I.id];K===void 0&&(K={},X[I.id]=K);let ee=K[L];return ee===void 0&&(ee=d(l()),K[L]=ee),ee}function d(v){const I=[],O=[],L=[];for(let X=0;X<t;X++)I[X]=0,O[X]=0,L[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:O,attributeDivisors:L,object:v,attributes:{},index:null}}function c(v,I,O,L){const X=s.attributes,K=I.attributes;let ee=0;const j=O.getAttributes();for(const V in j)if(j[V].location>=0){const P=X[V];let ce=K[V];if(ce===void 0&&(V==="instanceMatrix"&&v.instanceMatrix&&(ce=v.instanceMatrix),V==="instanceColor"&&v.instanceColor&&(ce=v.instanceColor)),P===void 0||P.attribute!==ce||ce&&P.data!==ce.data)return!0;ee++}return s.attributesNum!==ee||s.index!==L}function _(v,I,O,L){const X={},K=I.attributes;let ee=0;const j=O.getAttributes();for(const V in j)if(j[V].location>=0){let P=K[V];P===void 0&&(V==="instanceMatrix"&&v.instanceMatrix&&(P=v.instanceMatrix),V==="instanceColor"&&v.instanceColor&&(P=v.instanceColor));const ce={};ce.attribute=P,P&&P.data&&(ce.data=P.data),X[V]=ce,ee++}s.attributes=X,s.attributesNum=ee,s.index=L}function g(){const v=s.newAttributes;for(let I=0,O=v.length;I<O;I++)v[I]=0}function p(v){m(v,0)}function m(v,I){const O=s.newAttributes,L=s.enabledAttributes,X=s.attributeDivisors;O[v]=1,L[v]===0&&(r.enableVertexAttribArray(v),L[v]=1),X[v]!==I&&(r.vertexAttribDivisor(v,I),X[v]=I)}function M(){const v=s.newAttributes,I=s.enabledAttributes;for(let O=0,L=I.length;O<L;O++)I[O]!==v[O]&&(r.disableVertexAttribArray(O),I[O]=0)}function x(v,I,O,L,X,K,ee){ee===!0?r.vertexAttribIPointer(v,I,O,X,K):r.vertexAttribPointer(v,I,O,L,X,K)}function E(v,I,O,L){g();const X=L.attributes,K=O.getAttributes(),ee=I.defaultAttributeValues;for(const j in K){const V=K[j];if(V.location>=0){let re=X[j];if(re===void 0&&(j==="instanceMatrix"&&v.instanceMatrix&&(re=v.instanceMatrix),j==="instanceColor"&&v.instanceColor&&(re=v.instanceColor)),re!==void 0){const P=re.normalized,ce=re.itemSize,Te=e.get(re);if(Te===void 0)continue;const Fe=Te.buffer,Y=Te.type,ue=Te.bytesPerElement,ve=Y===r.INT||Y===r.UNSIGNED_INT||re.gpuType===cg;if(re.isInterleavedBufferAttribute){const fe=re.data,Le=fe.stride,Be=re.offset;if(fe.isInstancedInterleavedBuffer){for(let H=0;H<V.locationSize;H++)m(V.location+H,fe.meshPerAttribute);v.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=fe.meshPerAttribute*fe.count)}else for(let H=0;H<V.locationSize;H++)p(V.location+H);r.bindBuffer(r.ARRAY_BUFFER,Fe);for(let H=0;H<V.locationSize;H++)x(V.location+H,ce/V.locationSize,Y,P,Le*ue,(Be+ce/V.locationSize*H)*ue,ve)}else{if(re.isInstancedBufferAttribute){for(let fe=0;fe<V.locationSize;fe++)m(V.location+fe,re.meshPerAttribute);v.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let fe=0;fe<V.locationSize;fe++)p(V.location+fe);r.bindBuffer(r.ARRAY_BUFFER,Fe);for(let fe=0;fe<V.locationSize;fe++)x(V.location+fe,ce/V.locationSize,Y,P,ce*ue,ce/V.locationSize*fe*ue,ve)}}else if(ee!==void 0){const P=ee[j];if(P!==void 0)switch(P.length){case 2:r.vertexAttrib2fv(V.location,P);break;case 3:r.vertexAttrib3fv(V.location,P);break;case 4:r.vertexAttrib4fv(V.location,P);break;default:r.vertexAttrib1fv(V.location,P)}}}}M()}function R(){C();for(const v in n){const I=n[v];for(const O in I){const L=I[O];for(const X in L)h(L[X].object),delete L[X];delete I[O]}delete n[v]}}function A(v){if(n[v.id]===void 0)return;const I=n[v.id];for(const O in I){const L=I[O];for(const X in L)h(L[X].object),delete L[X];delete I[O]}delete n[v.id]}function T(v){for(const I in n){const O=n[I];if(O[v.id]===void 0)continue;const L=O[v.id];for(const X in L)h(L[X].object),delete L[X];delete O[v.id]}}function C(){S(),o=!0,s!==i&&(s=i,u(s.object))}function S(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:C,resetDefaultState:S,dispose:R,releaseStatesOfGeometry:A,releaseStatesOfProgram:T,initAttributes:g,enableAttribute:p,disableUnusedAttributes:M}}function CM(r,e,t){let n;function i(u){n=u}function s(u,h){r.drawArrays(n,u,h),t.update(h,n,1)}function o(u,h,f){f!==0&&(r.drawArraysInstanced(n,u,h,f),t.update(h,n,f))}function a(u,h,f){if(f===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let c=0;c<f;c++)this.render(u[c],h[c]);else{d.multiDrawArraysWEBGL(n,u,0,h,0,f);let c=0;for(let _=0;_<f;_++)c+=h[_];t.update(c,n,1)}}function l(u,h,f,d){if(f===0)return;const c=e.get("WEBGL_multi_draw");if(c===null)for(let _=0;_<u.length;_++)o(u[_],h[_],d[_]);else{c.multiDrawArraysInstancedWEBGL(n,u,0,h,0,d,0,f);let _=0;for(let g=0;g<f;g++)_+=h[g];for(let g=0;g<d.length;g++)t.update(_,n,d[g])}}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function PM(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(A){return!(A!==wi&&n.convert(A)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){const T=A===pc&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==Fr&&n.convert(A)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==br&&!T)}function l(A){if(A==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let u=t.precision!==void 0?t.precision:"highp";const h=l(u);h!==u&&(console.warn("THREE.WebGLRenderer:",u,"not supported, using",h,"instead."),u=h);const f=t.logarithmicDepthBuffer===!0,d=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),c=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_TEXTURE_SIZE),g=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),p=r.getParameter(r.MAX_VERTEX_ATTRIBS),m=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),M=r.getParameter(r.MAX_VARYING_VECTORS),x=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),E=c>0,R=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:u,logarithmicDepthBuffer:f,maxTextures:d,maxVertexTextures:c,maxTextureSize:_,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:m,maxVaryings:M,maxFragmentUniforms:x,vertexTextures:E,maxSamples:R}}function LM(r){const e=this;let t=null,n=0,i=!1,s=!1;const o=new _r,a=new lt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){const c=f.length!==0||d||n!==0||i;return i=d,n=f.length,c},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,d){t=h(f,d,0)},this.setState=function(f,d,c){const _=f.clippingPlanes,g=f.clipIntersection,p=f.clipShadows,m=r.get(f);if(!i||_===null||_.length===0||s&&!p)s?h(null):u();else{const M=s?0:n,x=M*4;let E=m.clippingState||null;l.value=E,E=h(_,d,x,c);for(let R=0;R!==x;++R)E[R]=t[R];m.clippingState=E,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=M}};function u(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(f,d,c,_){const g=f!==null?f.length:0;let p=null;if(g!==0){if(p=l.value,_!==!0||p===null){const m=c+g*4,M=d.matrixWorldInverse;a.getNormalMatrix(M),(p===null||p.length<m)&&(p=new Float32Array(m));for(let x=0,E=c;x!==g;++x,E+=4)o.copy(f[x]).applyMatrix4(M,a),o.normal.toArray(p,E),p[E+3]=o.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,p}}function DM(r){let e=new WeakMap;function t(o,a){return a===nh?o.mapping=Co:a===ih&&(o.mapping=Po),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===nh||a===ih)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const u=new Gx(l.height);return u.fromEquirectangularTexture(r,o),e.set(o,u),o.addEventListener("dispose",i),t(u.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class IM extends wg{constructor(e=-1,t=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const u=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=u*this.view.offsetX,o=s+u*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const lo=4,Hd=[.125,.215,.35,.446,.526,.582],ss=20,mu=new IM,Vd=new Mt;let gu=null,_u=0,vu=0,xu=!1;const ns=(1+Math.sqrt(5))/2,to=1/ns,Gd=[new Z(-ns,to,0),new Z(ns,to,0),new Z(-to,0,ns),new Z(to,0,ns),new Z(0,ns,-to),new Z(0,ns,to),new Z(-1,1,-1),new Z(1,1,-1),new Z(-1,1,1),new Z(1,1,1)];class Wd{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){gu=this._renderer.getRenderTarget(),_u=this._renderer.getActiveCubeFace(),vu=this._renderer.getActiveMipmapLevel(),xu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,i,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=qd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Yd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(gu,_u,vu),this._renderer.xr.enabled=xu,e.scissorTest=!1,Al(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Co||e.mapping===Po?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),gu=this._renderer.getRenderTarget(),_u=this._renderer.getActiveCubeFace(),vu=this._renderer.getActiveMipmapLevel(),xu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:di,minFilter:di,generateMipmaps:!1,type:pc,format:wi,colorSpace:kr,depthBuffer:!1},i=Xd(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Xd(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=UM(s)),this._blurMaterial=NM(s,e,t)}return i}_compileMaterial(e){const t=new Ai(this._lodPlanes[0],e);this._renderer.compile(t,mu)}_sceneToCubeUV(e,t,n,i){const a=new Jn(90,1,t,n),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,d=h.toneMapping;h.getClearColor(Vd),h.toneMapping=Dr,h.autoClear=!1;const c=new Mg({name:"PMREM.Background",side:Pn,depthWrite:!1,depthTest:!1}),_=new Ai(new Ga,c);let g=!1;const p=e.background;p?p.isColor&&(c.color.copy(p),e.background=null,g=!0):(c.color.copy(Vd),g=!0);for(let m=0;m<6;m++){const M=m%3;M===0?(a.up.set(0,l[m],0),a.lookAt(u[m],0,0)):M===1?(a.up.set(0,0,l[m]),a.lookAt(0,u[m],0)):(a.up.set(0,l[m],0),a.lookAt(0,0,u[m]));const x=this._cubeSize;Al(i,M*x,m>2?x:0,x,x),h.setRenderTarget(i),g&&h.render(_,a),h.render(e,a)}_.geometry.dispose(),_.material.dispose(),h.toneMapping=d,h.autoClear=f,e.background=p}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Co||e.mapping===Po;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=qd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Yd());const s=i?this._cubemapMaterial:this._equirectMaterial,o=new Ai(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;Al(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,mu)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let s=1;s<i;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Gd[(i-s-1)%Gd.length];this._blur(e,s-1,s,o,a)}t.autoClear=n}_blur(e,t,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",s),this._halfBlur(o,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,o,a){const l=this._renderer,u=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,f=new Ai(this._lodPlanes[i],u),d=u.uniforms,c=this._sizeLods[n]-1,_=isFinite(s)?Math.PI/(2*c):2*Math.PI/(2*ss-1),g=s/_,p=isFinite(s)?1+Math.floor(h*g):ss;p>ss&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${ss}`);const m=[];let M=0;for(let T=0;T<ss;++T){const C=T/g,S=Math.exp(-C*C/2);m.push(S),T===0?M+=S:T<p&&(M+=2*S)}for(let T=0;T<m.length;T++)m[T]=m[T]/M;d.envMap.value=e.texture,d.samples.value=p,d.weights.value=m,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:x}=this;d.dTheta.value=_,d.mipInt.value=x-n;const E=this._sizeLods[i],R=3*E*(i>x-lo?i-x+lo:0),A=4*(this._cubeSize-E);Al(t,R,A,3*E,2*E),l.setRenderTarget(t),l.render(f,mu)}}function UM(r){const e=[],t=[],n=[];let i=r;const s=r-lo+1+Hd.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);t.push(a);let l=1/a;o>r-lo?l=Hd[o-r+lo-1]:o===0&&(l=0),n.push(l);const u=1/(a-2),h=-u,f=1+u,d=[h,h,f,h,f,f,h,h,f,f,h,f],c=6,_=6,g=3,p=2,m=1,M=new Float32Array(g*_*c),x=new Float32Array(p*_*c),E=new Float32Array(m*_*c);for(let A=0;A<c;A++){const T=A%3*2/3-1,C=A>2?0:-1,S=[T,C,0,T+2/3,C,0,T+2/3,C+1,0,T,C,0,T+2/3,C+1,0,T,C+1,0];M.set(S,g*_*A),x.set(d,p*_*A);const v=[A,A,A,A,A,A];E.set(v,m*_*A)}const R=new Hr;R.setAttribute("position",new Pi(M,g)),R.setAttribute("uv",new Pi(x,p)),R.setAttribute("faceIndex",new Pi(E,m)),e.push(R),i>lo&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Xd(r,e,t){const n=new ws(r,e,t);return n.texture.mapping=dc,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Al(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function NM(r,e,t){const n=new Float32Array(ss),i=new Z(0,1,0);return new sr({name:"SphericalGaussianBlur",defines:{n:ss,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Bh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Lr,depthTest:!1,depthWrite:!1})}function Yd(){return new sr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Bh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Lr,depthTest:!1,depthWrite:!1})}function qd(){return new sr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Bh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Lr,depthTest:!1,depthWrite:!1})}function Bh(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function OM(r){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,u=l===nh||l===ih,h=l===Co||l===Po;if(u||h){let f=e.get(a);const d=f!==void 0?f.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new Wd(r)),f=u?t.fromEquirectangular(a,f):t.fromCubemap(a,f),f.texture.pmremVersion=a.pmremVersion,e.set(a,f),f.texture;if(f!==void 0)return f.texture;{const c=a.image;return u&&c&&c.height>0||h&&c&&i(c)?(t===null&&(t=new Wd(r)),f=u?t.fromEquirectangular(a):t.fromCubemap(a),f.texture.pmremVersion=a.pmremVersion,e.set(a,f),a.addEventListener("dispose",s),f.texture):null}}}return a}function i(a){let l=0;const u=6;for(let h=0;h<u;h++)a[h]!==void 0&&l++;return l===u}function s(a){const l=a.target;l.removeEventListener("dispose",s);const u=e.get(l);u!==void 0&&(e.delete(l),u.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function FM(r){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function BM(r,e,t,n){const i={},s=new WeakMap;function o(f){const d=f.target;d.index!==null&&e.remove(d.index);for(const _ in d.attributes)e.remove(d.attributes[_]);for(const _ in d.morphAttributes){const g=d.morphAttributes[_];for(let p=0,m=g.length;p<m;p++)e.remove(g[p])}d.removeEventListener("dispose",o),delete i[d.id];const c=s.get(d);c&&(e.remove(c),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(f,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,t.memory.geometries++),d}function l(f){const d=f.attributes;for(const _ in d)e.update(d[_],r.ARRAY_BUFFER);const c=f.morphAttributes;for(const _ in c){const g=c[_];for(let p=0,m=g.length;p<m;p++)e.update(g[p],r.ARRAY_BUFFER)}}function u(f){const d=[],c=f.index,_=f.attributes.position;let g=0;if(c!==null){const M=c.array;g=c.version;for(let x=0,E=M.length;x<E;x+=3){const R=M[x+0],A=M[x+1],T=M[x+2];d.push(R,A,A,T,T,R)}}else if(_!==void 0){const M=_.array;g=_.version;for(let x=0,E=M.length/3-1;x<E;x+=3){const R=x+0,A=x+1,T=x+2;d.push(R,A,A,T,T,R)}}else return;const p=new(gg(d)?Tg:Eg)(d,1);p.version=g;const m=s.get(f);m&&e.remove(m),s.set(f,p)}function h(f){const d=s.get(f);if(d){const c=f.index;c!==null&&d.version<c.version&&u(f)}else u(f);return s.get(f)}return{get:a,update:l,getWireframeAttribute:h}}function zM(r,e,t){let n;function i(d){n=d}let s,o;function a(d){s=d.type,o=d.bytesPerElement}function l(d,c){r.drawElements(n,c,s,d*o),t.update(c,n,1)}function u(d,c,_){_!==0&&(r.drawElementsInstanced(n,c,s,d*o,_),t.update(c,n,_))}function h(d,c,_){if(_===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<_;p++)this.render(d[p]/o,c[p]);else{g.multiDrawElementsWEBGL(n,c,0,s,d,0,_);let p=0;for(let m=0;m<_;m++)p+=c[m];t.update(p,n,1)}}function f(d,c,_,g){if(_===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<d.length;m++)u(d[m]/o,c[m],g[m]);else{p.multiDrawElementsInstancedWEBGL(n,c,0,s,d,0,g,0,_);let m=0;for(let M=0;M<_;M++)m+=c[M];for(let M=0;M<g.length;M++)t.update(m,n,g[M])}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=u,this.renderMultiDraw=h,this.renderMultiDrawInstances=f}function kM(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case r.TRIANGLES:t.triangles+=a*(s/3);break;case r.LINES:t.lines+=a*(s/2);break;case r.LINE_STRIP:t.lines+=a*(s-1);break;case r.LINE_LOOP:t.lines+=a*s;break;case r.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function HM(r,e,t){const n=new WeakMap,i=new en;function s(o,a,l){const u=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==f){let v=function(){C.dispose(),n.delete(a),a.removeEventListener("dispose",v)};var c=v;d!==void 0&&d.texture.dispose();const _=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,p=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],M=a.morphAttributes.normal||[],x=a.morphAttributes.color||[];let E=0;_===!0&&(E=1),g===!0&&(E=2),p===!0&&(E=3);let R=a.attributes.position.count*E,A=1;R>e.maxTextureSize&&(A=Math.ceil(R/e.maxTextureSize),R=e.maxTextureSize);const T=new Float32Array(R*A*4*f),C=new vg(T,R,A,f);C.type=br,C.needsUpdate=!0;const S=E*4;for(let I=0;I<f;I++){const O=m[I],L=M[I],X=x[I],K=R*A*4*I;for(let ee=0;ee<O.count;ee++){const j=ee*S;_===!0&&(i.fromBufferAttribute(O,ee),T[K+j+0]=i.x,T[K+j+1]=i.y,T[K+j+2]=i.z,T[K+j+3]=0),g===!0&&(i.fromBufferAttribute(L,ee),T[K+j+4]=i.x,T[K+j+5]=i.y,T[K+j+6]=i.z,T[K+j+7]=0),p===!0&&(i.fromBufferAttribute(X,ee),T[K+j+8]=i.x,T[K+j+9]=i.y,T[K+j+10]=i.z,T[K+j+11]=X.itemSize===4?i.w:1)}}d={count:f,texture:C,size:new it(R,A)},n.set(a,d),a.addEventListener("dispose",v)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",o.morphTexture,t);else{let _=0;for(let p=0;p<u.length;p++)_+=u[p];const g=a.morphTargetsRelative?1:1-_;l.getUniforms().setValue(r,"morphTargetBaseInfluence",g),l.getUniforms().setValue(r,"morphTargetInfluences",u)}l.getUniforms().setValue(r,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(r,"morphTargetsTextureSize",d.size)}return{update:s}}function VM(r,e,t,n){let i=new WeakMap;function s(l){const u=n.render.frame,h=l.geometry,f=e.get(l,h);if(i.get(f)!==u&&(e.update(f),i.set(f,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==u&&(t.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,u))),l.isSkinnedMesh){const d=l.skeleton;i.get(d)!==u&&(d.update(),i.set(d,u))}return f}function o(){i=new WeakMap}function a(l){const u=l.target;u.removeEventListener("dispose",a),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:s,dispose:o}}class Pg extends Tn{constructor(e,t,n,i,s,o,a,l,u,h){if(h=h!==void 0?h:yo,h!==yo&&h!==Na)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===yo&&(n=Lo),n===void 0&&h===Na&&(n=Ha),super(null,i,s,o,a,l,h,n,u),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:ni,this.minFilter=l!==void 0?l:ni,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Lg=new Tn,Dg=new Pg(1,1);Dg.compareFunction=mg;const Ig=new vg,Ug=new Ax,Ng=new Ag,$d=[],Kd=[],jd=new Float32Array(16),Zd=new Float32Array(9),Jd=new Float32Array(4);function No(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=$d[i];if(s===void 0&&(s=new Float32Array(i),$d[i]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,r[o].toArray(s,a)}return s}function Yt(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function qt(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function vc(r,e){let t=Kd[e];t===void 0&&(t=new Int32Array(e),Kd[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function GM(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function WM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;r.uniform2fv(this.addr,e),qt(t,e)}}function XM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Yt(t,e))return;r.uniform3fv(this.addr,e),qt(t,e)}}function YM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;r.uniform4fv(this.addr,e),qt(t,e)}}function qM(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Yt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),qt(t,e)}else{if(Yt(t,n))return;Jd.set(n),r.uniformMatrix2fv(this.addr,!1,Jd),qt(t,n)}}function $M(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Yt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),qt(t,e)}else{if(Yt(t,n))return;Zd.set(n),r.uniformMatrix3fv(this.addr,!1,Zd),qt(t,n)}}function KM(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Yt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),qt(t,e)}else{if(Yt(t,n))return;jd.set(n),r.uniformMatrix4fv(this.addr,!1,jd),qt(t,n)}}function jM(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function ZM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;r.uniform2iv(this.addr,e),qt(t,e)}}function JM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Yt(t,e))return;r.uniform3iv(this.addr,e),qt(t,e)}}function QM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;r.uniform4iv(this.addr,e),qt(t,e)}}function eE(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function tE(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;r.uniform2uiv(this.addr,e),qt(t,e)}}function nE(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Yt(t,e))return;r.uniform3uiv(this.addr,e),qt(t,e)}}function iE(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;r.uniform4uiv(this.addr,e),qt(t,e)}}function rE(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);const s=this.type===r.SAMPLER_2D_SHADOW?Dg:Lg;t.setTexture2D(e||s,i)}function sE(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Ug,i)}function oE(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Ng,i)}function aE(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Ig,i)}function lE(r){switch(r){case 5126:return GM;case 35664:return WM;case 35665:return XM;case 35666:return YM;case 35674:return qM;case 35675:return $M;case 35676:return KM;case 5124:case 35670:return jM;case 35667:case 35671:return ZM;case 35668:case 35672:return JM;case 35669:case 35673:return QM;case 5125:return eE;case 36294:return tE;case 36295:return nE;case 36296:return iE;case 35678:case 36198:case 36298:case 36306:case 35682:return rE;case 35679:case 36299:case 36307:return sE;case 35680:case 36300:case 36308:case 36293:return oE;case 36289:case 36303:case 36311:case 36292:return aE}}function cE(r,e){r.uniform1fv(this.addr,e)}function uE(r,e){const t=No(e,this.size,2);r.uniform2fv(this.addr,t)}function hE(r,e){const t=No(e,this.size,3);r.uniform3fv(this.addr,t)}function fE(r,e){const t=No(e,this.size,4);r.uniform4fv(this.addr,t)}function dE(r,e){const t=No(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function pE(r,e){const t=No(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function mE(r,e){const t=No(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function gE(r,e){r.uniform1iv(this.addr,e)}function _E(r,e){r.uniform2iv(this.addr,e)}function vE(r,e){r.uniform3iv(this.addr,e)}function xE(r,e){r.uniform4iv(this.addr,e)}function yE(r,e){r.uniform1uiv(this.addr,e)}function SE(r,e){r.uniform2uiv(this.addr,e)}function ME(r,e){r.uniform3uiv(this.addr,e)}function EE(r,e){r.uniform4uiv(this.addr,e)}function TE(r,e,t){const n=this.cache,i=e.length,s=vc(t,i);Yt(n,s)||(r.uniform1iv(this.addr,s),qt(n,s));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||Lg,s[o])}function bE(r,e,t){const n=this.cache,i=e.length,s=vc(t,i);Yt(n,s)||(r.uniform1iv(this.addr,s),qt(n,s));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||Ug,s[o])}function wE(r,e,t){const n=this.cache,i=e.length,s=vc(t,i);Yt(n,s)||(r.uniform1iv(this.addr,s),qt(n,s));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||Ng,s[o])}function AE(r,e,t){const n=this.cache,i=e.length,s=vc(t,i);Yt(n,s)||(r.uniform1iv(this.addr,s),qt(n,s));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||Ig,s[o])}function RE(r){switch(r){case 5126:return cE;case 35664:return uE;case 35665:return hE;case 35666:return fE;case 35674:return dE;case 35675:return pE;case 35676:return mE;case 5124:case 35670:return gE;case 35667:case 35671:return _E;case 35668:case 35672:return vE;case 35669:case 35673:return xE;case 5125:return yE;case 36294:return SE;case 36295:return ME;case 36296:return EE;case 35678:case 36198:case 36298:case 36306:case 35682:return TE;case 35679:case 36299:case 36307:return bE;case 35680:case 36300:case 36308:case 36293:return wE;case 36289:case 36303:case 36311:case 36292:return AE}}class CE{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=lE(t.type)}}class PE{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=RE(t.type)}}class LE{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(e,t[a.id],n)}}}const yu=/(\w+)(\])?(\[|\.)?/g;function Qd(r,e){r.seq.push(e),r.map[e.id]=e}function DE(r,e,t){const n=r.name,i=n.length;for(yu.lastIndex=0;;){const s=yu.exec(n),o=yu.lastIndex;let a=s[1];const l=s[2]==="]",u=s[3];if(l&&(a=a|0),u===void 0||u==="["&&o+2===i){Qd(t,u===void 0?new CE(a,r,e):new PE(a,r,e));break}else{let f=t.map[a];f===void 0&&(f=new LE(a),Qd(t,f)),t=f}}}class Hl{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),o=e.getUniformLocation(t,s.name);DE(s,o,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function ep(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const IE=37297;let UE=0;function NE(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function OE(r){const e=St.getPrimaries(St.workingColorSpace),t=St.getPrimaries(r);let n;switch(e===t?n="":e===sc&&t===rc?n="LinearDisplayP3ToLinearSRGB":e===rc&&t===sc&&(n="LinearSRGBToLinearDisplayP3"),r){case kr:case mc:return[n,"LinearTransferOETF"];case Kn:case Nh:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",r),[n,"LinearTransferOETF"]}}function tp(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),i=r.getShaderInfoLog(e).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+NE(r.getShaderSource(e),o)}else return i}function FE(r,e){const t=OE(e);return`vec4 ${r}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function BE(r,e){let t;switch(e){case Rv:t="Linear";break;case Cv:t="Reinhard";break;case Pv:t="OptimizedCineon";break;case Lv:t="ACESFilmic";break;case Iv:t="AgX";break;case Uv:t="Neutral";break;case Dv:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function zE(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(na).join(`
`)}function kE(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function HE(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:r.getAttribLocation(e,o),locationSize:a}}return t}function na(r){return r!==""}function np(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ip(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const VE=/^[ \t]*#include +<([\w\d./]+)>/gm;function oh(r){return r.replace(VE,WE)}const GE=new Map;function WE(r,e){let t=at[e];if(t===void 0){const n=GE.get(e);if(n!==void 0)t=at[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return oh(t)}const XE=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function rp(r){return r.replace(XE,YE)}function YE(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function sp(r){let e=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function qE(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===sg?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===ev?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Vi&&(e="SHADOWMAP_TYPE_VSM"),e}function $E(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Co:case Po:e="ENVMAP_TYPE_CUBE";break;case dc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function KE(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Po:e="ENVMAP_MODE_REFRACTION";break}return e}function jE(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case og:e="ENVMAP_BLENDING_MULTIPLY";break;case wv:e="ENVMAP_BLENDING_MIX";break;case Av:e="ENVMAP_BLENDING_ADD";break}return e}function ZE(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function JE(r,e,t,n){const i=r.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=qE(t),u=$E(t),h=KE(t),f=jE(t),d=ZE(t),c=zE(t),_=kE(s),g=i.createProgram();let p,m,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(na).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(na).join(`
`),m.length>0&&(m+=`
`)):(p=[sp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(na).join(`
`),m=[sp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",t.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Dr?"#define TONE_MAPPING":"",t.toneMapping!==Dr?at.tonemapping_pars_fragment:"",t.toneMapping!==Dr?BE("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",at.colorspace_pars_fragment,FE("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(na).join(`
`)),o=oh(o),o=np(o,t),o=ip(o,t),a=oh(a),a=np(a,t),a=ip(a,t),o=rp(o),a=rp(a),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,p=[c,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",t.glslVersion===yd?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===yd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const x=M+p+o,E=M+m+a,R=ep(i,i.VERTEX_SHADER,x),A=ep(i,i.FRAGMENT_SHADER,E);i.attachShader(g,R),i.attachShader(g,A),t.index0AttributeName!==void 0?i.bindAttribLocation(g,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(g,0,"position"),i.linkProgram(g);function T(I){if(r.debug.checkShaderErrors){const O=i.getProgramInfoLog(g).trim(),L=i.getShaderInfoLog(R).trim(),X=i.getShaderInfoLog(A).trim();let K=!0,ee=!0;if(i.getProgramParameter(g,i.LINK_STATUS)===!1)if(K=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,g,R,A);else{const j=tp(i,R,"vertex"),V=tp(i,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(g,i.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+O+`
`+j+`
`+V)}else O!==""?console.warn("THREE.WebGLProgram: Program Info Log:",O):(L===""||X==="")&&(ee=!1);ee&&(I.diagnostics={runnable:K,programLog:O,vertexShader:{log:L,prefix:p},fragmentShader:{log:X,prefix:m}})}i.deleteShader(R),i.deleteShader(A),C=new Hl(i,g),S=HE(i,g)}let C;this.getUniforms=function(){return C===void 0&&T(this),C};let S;this.getAttributes=function(){return S===void 0&&T(this),S};let v=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=i.getProgramParameter(g,IE)),v},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=UE++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=R,this.fragmentShader=A,this}let QE=0;class eT{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new tT(e),t.set(e,n)),n}}class tT{constructor(e){this.id=QE++,this.code=e,this.usedTimes=0}}function nT(r,e,t,n,i,s,o){const a=new yg,l=new eT,u=new Set,h=[],f=i.logarithmicDepthBuffer,d=i.vertexTextures;let c=i.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(S){return u.add(S),S===0?"uv":`uv${S}`}function p(S,v,I,O,L){const X=O.fog,K=L.geometry,ee=S.isMeshStandardMaterial?O.environment:null,j=(S.isMeshStandardMaterial?t:e).get(S.envMap||ee),V=j&&j.mapping===dc?j.image.height:null,re=_[S.type];S.precision!==null&&(c=i.getMaxPrecision(S.precision),c!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",c,"instead."));const P=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,ce=P!==void 0?P.length:0;let Te=0;K.morphAttributes.position!==void 0&&(Te=1),K.morphAttributes.normal!==void 0&&(Te=2),K.morphAttributes.color!==void 0&&(Te=3);let Fe,Y,ue,ve;if(re){const te=yi[re];Fe=te.vertexShader,Y=te.fragmentShader}else Fe=S.vertexShader,Y=S.fragmentShader,l.update(S),ue=l.getVertexShaderID(S),ve=l.getFragmentShaderID(S);const fe=r.getRenderTarget(),Le=L.isInstancedMesh===!0,Be=L.isBatchedMesh===!0,H=!!S.map,Ye=!!S.matcap,De=!!j,Ue=!!S.aoMap,ye=!!S.lightMap,Me=!!S.bumpMap,ke=!!S.normalMap,k=!!S.displacementMap,Ke=!!S.emissiveMap,D=!!S.metalnessMap,b=!!S.roughnessMap,J=S.anisotropy>0,ne=S.clearcoat>0,ae=S.dispersion>0,le=S.iridescence>0,we=S.sheen>0,me=S.transmission>0,he=J&&!!S.anisotropyMap,ze=ne&&!!S.clearcoatMap,pe=ne&&!!S.clearcoatNormalMap,Ie=ne&&!!S.clearcoatRoughnessMap,nt=le&&!!S.iridescenceMap,Ce=le&&!!S.iridescenceThicknessMap,Re=we&&!!S.sheenColorMap,qe=we&&!!S.sheenRoughnessMap,je=!!S.specularMap,rt=!!S.specularColorMap,$e=!!S.specularIntensityMap,y=me&&!!S.transmissionMap,N=me&&!!S.thicknessMap,q=!!S.gradientMap,ie=!!S.alphaMap,de=S.alphaTest>0,We=!!S.alphaHash,Ze=!!S.extensions;let Se=Dr;S.toneMapped&&(fe===null||fe.isXRRenderTarget===!0)&&(Se=r.toneMapping);const U={shaderID:re,shaderType:S.type,shaderName:S.name,vertexShader:Fe,fragmentShader:Y,defines:S.defines,customVertexShaderID:ue,customFragmentShaderID:ve,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:c,batching:Be,instancing:Le,instancingColor:Le&&L.instanceColor!==null,instancingMorph:Le&&L.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:fe===null?r.outputColorSpace:fe.isXRRenderTarget===!0?fe.texture.colorSpace:kr,alphaToCoverage:!!S.alphaToCoverage,map:H,matcap:Ye,envMap:De,envMapMode:De&&j.mapping,envMapCubeUVHeight:V,aoMap:Ue,lightMap:ye,bumpMap:Me,normalMap:ke,displacementMap:d&&k,emissiveMap:Ke,normalMapObjectSpace:ke&&S.normalMapType===Kv,normalMapTangentSpace:ke&&S.normalMapType===$v,metalnessMap:D,roughnessMap:b,anisotropy:J,anisotropyMap:he,clearcoat:ne,clearcoatMap:ze,clearcoatNormalMap:pe,clearcoatRoughnessMap:Ie,dispersion:ae,iridescence:le,iridescenceMap:nt,iridescenceThicknessMap:Ce,sheen:we,sheenColorMap:Re,sheenRoughnessMap:qe,specularMap:je,specularColorMap:rt,specularIntensityMap:$e,transmission:me,transmissionMap:y,thicknessMap:N,gradientMap:q,opaque:S.transparent===!1&&S.blending===xo&&S.alphaToCoverage===!1,alphaMap:ie,alphaTest:de,alphaHash:We,combine:S.combine,mapUv:H&&g(S.map.channel),aoMapUv:Ue&&g(S.aoMap.channel),lightMapUv:ye&&g(S.lightMap.channel),bumpMapUv:Me&&g(S.bumpMap.channel),normalMapUv:ke&&g(S.normalMap.channel),displacementMapUv:k&&g(S.displacementMap.channel),emissiveMapUv:Ke&&g(S.emissiveMap.channel),metalnessMapUv:D&&g(S.metalnessMap.channel),roughnessMapUv:b&&g(S.roughnessMap.channel),anisotropyMapUv:he&&g(S.anisotropyMap.channel),clearcoatMapUv:ze&&g(S.clearcoatMap.channel),clearcoatNormalMapUv:pe&&g(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ie&&g(S.clearcoatRoughnessMap.channel),iridescenceMapUv:nt&&g(S.iridescenceMap.channel),iridescenceThicknessMapUv:Ce&&g(S.iridescenceThicknessMap.channel),sheenColorMapUv:Re&&g(S.sheenColorMap.channel),sheenRoughnessMapUv:qe&&g(S.sheenRoughnessMap.channel),specularMapUv:je&&g(S.specularMap.channel),specularColorMapUv:rt&&g(S.specularColorMap.channel),specularIntensityMapUv:$e&&g(S.specularIntensityMap.channel),transmissionMapUv:y&&g(S.transmissionMap.channel),thicknessMapUv:N&&g(S.thicknessMap.channel),alphaMapUv:ie&&g(S.alphaMap.channel),vertexTangents:!!K.attributes.tangent&&(ke||J),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!K.attributes.uv&&(H||ie),fog:!!X,useFog:S.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:f,skinning:L.isSkinnedMesh===!0,morphTargets:K.morphAttributes.position!==void 0,morphNormals:K.morphAttributes.normal!==void 0,morphColors:K.morphAttributes.color!==void 0,morphTargetsCount:ce,morphTextureStride:Te,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:r.shadowMap.enabled&&I.length>0,shadowMapType:r.shadowMap.type,toneMapping:Se,useLegacyLights:r._useLegacyLights,decodeVideoTexture:H&&S.map.isVideoTexture===!0&&St.getTransfer(S.map.colorSpace)===wt,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===qi,flipSided:S.side===Pn,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Ze&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:Ze&&S.extensions.multiDraw===!0&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return U.vertexUv1s=u.has(1),U.vertexUv2s=u.has(2),U.vertexUv3s=u.has(3),u.clear(),U}function m(S){const v=[];if(S.shaderID?v.push(S.shaderID):(v.push(S.customVertexShaderID),v.push(S.customFragmentShaderID)),S.defines!==void 0)for(const I in S.defines)v.push(I),v.push(S.defines[I]);return S.isRawShaderMaterial===!1&&(M(v,S),x(v,S),v.push(r.outputColorSpace)),v.push(S.customProgramCacheKey),v.join()}function M(S,v){S.push(v.precision),S.push(v.outputColorSpace),S.push(v.envMapMode),S.push(v.envMapCubeUVHeight),S.push(v.mapUv),S.push(v.alphaMapUv),S.push(v.lightMapUv),S.push(v.aoMapUv),S.push(v.bumpMapUv),S.push(v.normalMapUv),S.push(v.displacementMapUv),S.push(v.emissiveMapUv),S.push(v.metalnessMapUv),S.push(v.roughnessMapUv),S.push(v.anisotropyMapUv),S.push(v.clearcoatMapUv),S.push(v.clearcoatNormalMapUv),S.push(v.clearcoatRoughnessMapUv),S.push(v.iridescenceMapUv),S.push(v.iridescenceThicknessMapUv),S.push(v.sheenColorMapUv),S.push(v.sheenRoughnessMapUv),S.push(v.specularMapUv),S.push(v.specularColorMapUv),S.push(v.specularIntensityMapUv),S.push(v.transmissionMapUv),S.push(v.thicknessMapUv),S.push(v.combine),S.push(v.fogExp2),S.push(v.sizeAttenuation),S.push(v.morphTargetsCount),S.push(v.morphAttributeCount),S.push(v.numDirLights),S.push(v.numPointLights),S.push(v.numSpotLights),S.push(v.numSpotLightMaps),S.push(v.numHemiLights),S.push(v.numRectAreaLights),S.push(v.numDirLightShadows),S.push(v.numPointLightShadows),S.push(v.numSpotLightShadows),S.push(v.numSpotLightShadowsWithMaps),S.push(v.numLightProbes),S.push(v.shadowMapType),S.push(v.toneMapping),S.push(v.numClippingPlanes),S.push(v.numClipIntersection),S.push(v.depthPacking)}function x(S,v){a.disableAll(),v.supportsVertexTextures&&a.enable(0),v.instancing&&a.enable(1),v.instancingColor&&a.enable(2),v.instancingMorph&&a.enable(3),v.matcap&&a.enable(4),v.envMap&&a.enable(5),v.normalMapObjectSpace&&a.enable(6),v.normalMapTangentSpace&&a.enable(7),v.clearcoat&&a.enable(8),v.iridescence&&a.enable(9),v.alphaTest&&a.enable(10),v.vertexColors&&a.enable(11),v.vertexAlphas&&a.enable(12),v.vertexUv1s&&a.enable(13),v.vertexUv2s&&a.enable(14),v.vertexUv3s&&a.enable(15),v.vertexTangents&&a.enable(16),v.anisotropy&&a.enable(17),v.alphaHash&&a.enable(18),v.batching&&a.enable(19),v.dispersion&&a.enable(20),S.push(a.mask),a.disableAll(),v.fog&&a.enable(0),v.useFog&&a.enable(1),v.flatShading&&a.enable(2),v.logarithmicDepthBuffer&&a.enable(3),v.skinning&&a.enable(4),v.morphTargets&&a.enable(5),v.morphNormals&&a.enable(6),v.morphColors&&a.enable(7),v.premultipliedAlpha&&a.enable(8),v.shadowMapEnabled&&a.enable(9),v.useLegacyLights&&a.enable(10),v.doubleSided&&a.enable(11),v.flipSided&&a.enable(12),v.useDepthPacking&&a.enable(13),v.dithering&&a.enable(14),v.transmission&&a.enable(15),v.sheen&&a.enable(16),v.opaque&&a.enable(17),v.pointsUvs&&a.enable(18),v.decodeVideoTexture&&a.enable(19),v.alphaToCoverage&&a.enable(20),S.push(a.mask)}function E(S){const v=_[S.type];let I;if(v){const O=yi[v];I=zx.clone(O.uniforms)}else I=S.uniforms;return I}function R(S,v){let I;for(let O=0,L=h.length;O<L;O++){const X=h[O];if(X.cacheKey===v){I=X,++I.usedTimes;break}}return I===void 0&&(I=new JE(r,v,S,s),h.push(I)),I}function A(S){if(--S.usedTimes===0){const v=h.indexOf(S);h[v]=h[h.length-1],h.pop(),S.destroy()}}function T(S){l.remove(S)}function C(){l.dispose()}return{getParameters:p,getProgramCacheKey:m,getUniforms:E,acquireProgram:R,releaseProgram:A,releaseShaderCache:T,programs:h,dispose:C}}function iT(){let r=new WeakMap;function e(s){let o=r.get(s);return o===void 0&&(o={},r.set(s,o)),o}function t(s){r.delete(s)}function n(s,o,a){r.get(s)[o]=a}function i(){r=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function rT(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function op(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function ap(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function o(f,d,c,_,g,p){let m=r[e];return m===void 0?(m={id:f.id,object:f,geometry:d,material:c,groupOrder:_,renderOrder:f.renderOrder,z:g,group:p},r[e]=m):(m.id=f.id,m.object=f,m.geometry=d,m.material=c,m.groupOrder=_,m.renderOrder=f.renderOrder,m.z=g,m.group=p),e++,m}function a(f,d,c,_,g,p){const m=o(f,d,c,_,g,p);c.transmission>0?n.push(m):c.transparent===!0?i.push(m):t.push(m)}function l(f,d,c,_,g,p){const m=o(f,d,c,_,g,p);c.transmission>0?n.unshift(m):c.transparent===!0?i.unshift(m):t.unshift(m)}function u(f,d){t.length>1&&t.sort(f||rT),n.length>1&&n.sort(d||op),i.length>1&&i.sort(d||op)}function h(){for(let f=e,d=r.length;f<d;f++){const c=r[f];if(c.id===null)break;c.id=null,c.object=null,c.geometry=null,c.material=null,c.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:h,sort:u}}function sT(){let r=new WeakMap;function e(n,i){const s=r.get(n);let o;return s===void 0?(o=new ap,r.set(n,[o])):i>=s.length?(o=new ap,s.push(o)):o=s[i],o}function t(){r=new WeakMap}return{get:e,dispose:t}}function oT(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new Z,color:new Mt};break;case"SpotLight":t={position:new Z,direction:new Z,color:new Mt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new Z,color:new Mt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new Z,skyColor:new Mt,groundColor:new Mt};break;case"RectAreaLight":t={color:new Mt,position:new Z,halfWidth:new Z,halfHeight:new Z};break}return r[e.id]=t,t}}}function aT(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let lT=0;function cT(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function uT(r){const e=new oT,t=aT(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)n.probe.push(new Z);const i=new Z,s=new Xt,o=new Xt;function a(u,h){let f=0,d=0,c=0;for(let I=0;I<9;I++)n.probe[I].set(0,0,0);let _=0,g=0,p=0,m=0,M=0,x=0,E=0,R=0,A=0,T=0,C=0;u.sort(cT);const S=h===!0?Math.PI:1;for(let I=0,O=u.length;I<O;I++){const L=u[I],X=L.color,K=L.intensity,ee=L.distance,j=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)f+=X.r*K*S,d+=X.g*K*S,c+=X.b*K*S;else if(L.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(L.sh.coefficients[V],K);C++}else if(L.isDirectionalLight){const V=e.get(L);if(V.color.copy(L.color).multiplyScalar(L.intensity*S),L.castShadow){const re=L.shadow,P=t.get(L);P.shadowBias=re.bias,P.shadowNormalBias=re.normalBias,P.shadowRadius=re.radius,P.shadowMapSize=re.mapSize,n.directionalShadow[_]=P,n.directionalShadowMap[_]=j,n.directionalShadowMatrix[_]=L.shadow.matrix,x++}n.directional[_]=V,_++}else if(L.isSpotLight){const V=e.get(L);V.position.setFromMatrixPosition(L.matrixWorld),V.color.copy(X).multiplyScalar(K*S),V.distance=ee,V.coneCos=Math.cos(L.angle),V.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),V.decay=L.decay,n.spot[p]=V;const re=L.shadow;if(L.map&&(n.spotLightMap[A]=L.map,A++,re.updateMatrices(L),L.castShadow&&T++),n.spotLightMatrix[p]=re.matrix,L.castShadow){const P=t.get(L);P.shadowBias=re.bias,P.shadowNormalBias=re.normalBias,P.shadowRadius=re.radius,P.shadowMapSize=re.mapSize,n.spotShadow[p]=P,n.spotShadowMap[p]=j,R++}p++}else if(L.isRectAreaLight){const V=e.get(L);V.color.copy(X).multiplyScalar(K),V.halfWidth.set(L.width*.5,0,0),V.halfHeight.set(0,L.height*.5,0),n.rectArea[m]=V,m++}else if(L.isPointLight){const V=e.get(L);if(V.color.copy(L.color).multiplyScalar(L.intensity*S),V.distance=L.distance,V.decay=L.decay,L.castShadow){const re=L.shadow,P=t.get(L);P.shadowBias=re.bias,P.shadowNormalBias=re.normalBias,P.shadowRadius=re.radius,P.shadowMapSize=re.mapSize,P.shadowCameraNear=re.camera.near,P.shadowCameraFar=re.camera.far,n.pointShadow[g]=P,n.pointShadowMap[g]=j,n.pointShadowMatrix[g]=L.shadow.matrix,E++}n.point[g]=V,g++}else if(L.isHemisphereLight){const V=e.get(L);V.skyColor.copy(L.color).multiplyScalar(K*S),V.groundColor.copy(L.groundColor).multiplyScalar(K*S),n.hemi[M]=V,M++}}m>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ae.LTC_FLOAT_1,n.rectAreaLTC2=Ae.LTC_FLOAT_2):(n.rectAreaLTC1=Ae.LTC_HALF_1,n.rectAreaLTC2=Ae.LTC_HALF_2)),n.ambient[0]=f,n.ambient[1]=d,n.ambient[2]=c;const v=n.hash;(v.directionalLength!==_||v.pointLength!==g||v.spotLength!==p||v.rectAreaLength!==m||v.hemiLength!==M||v.numDirectionalShadows!==x||v.numPointShadows!==E||v.numSpotShadows!==R||v.numSpotMaps!==A||v.numLightProbes!==C)&&(n.directional.length=_,n.spot.length=p,n.rectArea.length=m,n.point.length=g,n.hemi.length=M,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=R,n.spotShadowMap.length=R,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=R+A-T,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=C,v.directionalLength=_,v.pointLength=g,v.spotLength=p,v.rectAreaLength=m,v.hemiLength=M,v.numDirectionalShadows=x,v.numPointShadows=E,v.numSpotShadows=R,v.numSpotMaps=A,v.numLightProbes=C,n.version=lT++)}function l(u,h){let f=0,d=0,c=0,_=0,g=0;const p=h.matrixWorldInverse;for(let m=0,M=u.length;m<M;m++){const x=u[m];if(x.isDirectionalLight){const E=n.directional[f];E.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),E.direction.sub(i),E.direction.transformDirection(p),f++}else if(x.isSpotLight){const E=n.spot[c];E.position.setFromMatrixPosition(x.matrixWorld),E.position.applyMatrix4(p),E.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),E.direction.sub(i),E.direction.transformDirection(p),c++}else if(x.isRectAreaLight){const E=n.rectArea[_];E.position.setFromMatrixPosition(x.matrixWorld),E.position.applyMatrix4(p),o.identity(),s.copy(x.matrixWorld),s.premultiply(p),o.extractRotation(s),E.halfWidth.set(x.width*.5,0,0),E.halfHeight.set(0,x.height*.5,0),E.halfWidth.applyMatrix4(o),E.halfHeight.applyMatrix4(o),_++}else if(x.isPointLight){const E=n.point[d];E.position.setFromMatrixPosition(x.matrixWorld),E.position.applyMatrix4(p),d++}else if(x.isHemisphereLight){const E=n.hemi[g];E.direction.setFromMatrixPosition(x.matrixWorld),E.direction.transformDirection(p),g++}}}return{setup:a,setupView:l,state:n}}function lp(r){const e=new uT(r),t=[],n=[];function i(h){u.camera=h,t.length=0,n.length=0}function s(h){t.push(h)}function o(h){n.push(h)}function a(h){e.setup(t,h)}function l(h){e.setupView(t,h)}const u={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:u,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function hT(r){let e=new WeakMap;function t(i,s=0){const o=e.get(i);let a;return o===void 0?(a=new lp(r),e.set(i,[a])):s>=o.length?(a=new lp(r),o.push(a)):a=o[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}class fT extends gc{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Yv,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class dT extends gc{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const pT=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,mT=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function gT(r,e,t){let n=new Rg;const i=new it,s=new it,o=new en,a=new fT({depthPacking:qv}),l=new dT,u={},h=t.maxTextureSize,f={[Or]:Pn,[Pn]:Or,[qi]:qi},d=new sr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new it},radius:{value:4}},vertexShader:pT,fragmentShader:mT}),c=d.clone();c.defines.HORIZONTAL_PASS=1;const _=new Hr;_.setAttribute("position",new Pi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new Ai(_,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=sg;let m=this.type;this.render=function(A,T,C){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||A.length===0)return;const S=r.getRenderTarget(),v=r.getActiveCubeFace(),I=r.getActiveMipmapLevel(),O=r.state;O.setBlending(Lr),O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const L=m!==Vi&&this.type===Vi,X=m===Vi&&this.type!==Vi;for(let K=0,ee=A.length;K<ee;K++){const j=A[K],V=j.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;i.copy(V.mapSize);const re=V.getFrameExtents();if(i.multiply(re),s.copy(V.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/re.x),i.x=s.x*re.x,V.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/re.y),i.y=s.y*re.y,V.mapSize.y=s.y)),V.map===null||L===!0||X===!0){const ce=this.type!==Vi?{minFilter:ni,magFilter:ni}:{};V.map!==null&&V.map.dispose(),V.map=new ws(i.x,i.y,ce),V.map.texture.name=j.name+".shadowMap",V.camera.updateProjectionMatrix()}r.setRenderTarget(V.map),r.clear();const P=V.getViewportCount();for(let ce=0;ce<P;ce++){const Te=V.getViewport(ce);o.set(s.x*Te.x,s.y*Te.y,s.x*Te.z,s.y*Te.w),O.viewport(o),V.updateMatrices(j,ce),n=V.getFrustum(),E(T,C,V.camera,j,this.type)}V.isPointLightShadow!==!0&&this.type===Vi&&M(V,C),V.needsUpdate=!1}m=this.type,p.needsUpdate=!1,r.setRenderTarget(S,v,I)};function M(A,T){const C=e.update(g);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,c.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,c.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new ws(i.x,i.y)),d.uniforms.shadow_pass.value=A.map.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,r.setRenderTarget(A.mapPass),r.clear(),r.renderBufferDirect(T,null,C,d,g,null),c.uniforms.shadow_pass.value=A.mapPass.texture,c.uniforms.resolution.value=A.mapSize,c.uniforms.radius.value=A.radius,r.setRenderTarget(A.map),r.clear(),r.renderBufferDirect(T,null,C,c,g,null)}function x(A,T,C,S){let v=null;const I=C.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(I!==void 0)v=I;else if(v=C.isPointLight===!0?l:a,r.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const O=v.uuid,L=T.uuid;let X=u[O];X===void 0&&(X={},u[O]=X);let K=X[L];K===void 0&&(K=v.clone(),X[L]=K,T.addEventListener("dispose",R)),v=K}if(v.visible=T.visible,v.wireframe=T.wireframe,S===Vi?v.side=T.shadowSide!==null?T.shadowSide:T.side:v.side=T.shadowSide!==null?T.shadowSide:f[T.side],v.alphaMap=T.alphaMap,v.alphaTest=T.alphaTest,v.map=T.map,v.clipShadows=T.clipShadows,v.clippingPlanes=T.clippingPlanes,v.clipIntersection=T.clipIntersection,v.displacementMap=T.displacementMap,v.displacementScale=T.displacementScale,v.displacementBias=T.displacementBias,v.wireframeLinewidth=T.wireframeLinewidth,v.linewidth=T.linewidth,C.isPointLight===!0&&v.isMeshDistanceMaterial===!0){const O=r.properties.get(v);O.light=C}return v}function E(A,T,C,S,v){if(A.visible===!1)return;if(A.layers.test(T.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&v===Vi)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,A.matrixWorld);const L=e.update(A),X=A.material;if(Array.isArray(X)){const K=L.groups;for(let ee=0,j=K.length;ee<j;ee++){const V=K[ee],re=X[V.materialIndex];if(re&&re.visible){const P=x(A,re,S,v);A.onBeforeShadow(r,A,T,C,L,P,V),r.renderBufferDirect(C,null,L,P,A,V),A.onAfterShadow(r,A,T,C,L,P,V)}}}else if(X.visible){const K=x(A,X,S,v);A.onBeforeShadow(r,A,T,C,L,K,null),r.renderBufferDirect(C,null,L,K,A,null),A.onAfterShadow(r,A,T,C,L,K,null)}}const O=A.children;for(let L=0,X=O.length;L<X;L++)E(O[L],T,C,S,v)}function R(A){A.target.removeEventListener("dispose",R);for(const C in u){const S=u[C],v=A.target.uuid;v in S&&(S[v].dispose(),delete S[v])}}}function _T(r){function e(){let y=!1;const N=new en;let q=null;const ie=new en(0,0,0,0);return{setMask:function(de){q!==de&&!y&&(r.colorMask(de,de,de,de),q=de)},setLocked:function(de){y=de},setClear:function(de,We,Ze,Se,U){U===!0&&(de*=Se,We*=Se,Ze*=Se),N.set(de,We,Ze,Se),ie.equals(N)===!1&&(r.clearColor(de,We,Ze,Se),ie.copy(N))},reset:function(){y=!1,q=null,ie.set(-1,0,0,0)}}}function t(){let y=!1,N=null,q=null,ie=null;return{setTest:function(de){de?ve(r.DEPTH_TEST):fe(r.DEPTH_TEST)},setMask:function(de){N!==de&&!y&&(r.depthMask(de),N=de)},setFunc:function(de){if(q!==de){switch(de){case xv:r.depthFunc(r.NEVER);break;case yv:r.depthFunc(r.ALWAYS);break;case Sv:r.depthFunc(r.LESS);break;case nc:r.depthFunc(r.LEQUAL);break;case Mv:r.depthFunc(r.EQUAL);break;case Ev:r.depthFunc(r.GEQUAL);break;case Tv:r.depthFunc(r.GREATER);break;case bv:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}q=de}},setLocked:function(de){y=de},setClear:function(de){ie!==de&&(r.clearDepth(de),ie=de)},reset:function(){y=!1,N=null,q=null,ie=null}}}function n(){let y=!1,N=null,q=null,ie=null,de=null,We=null,Ze=null,Se=null,U=null;return{setTest:function(te){y||(te?ve(r.STENCIL_TEST):fe(r.STENCIL_TEST))},setMask:function(te){N!==te&&!y&&(r.stencilMask(te),N=te)},setFunc:function(te,F,W){(q!==te||ie!==F||de!==W)&&(r.stencilFunc(te,F,W),q=te,ie=F,de=W)},setOp:function(te,F,W){(We!==te||Ze!==F||Se!==W)&&(r.stencilOp(te,F,W),We=te,Ze=F,Se=W)},setLocked:function(te){y=te},setClear:function(te){U!==te&&(r.clearStencil(te),U=te)},reset:function(){y=!1,N=null,q=null,ie=null,de=null,We=null,Ze=null,Se=null,U=null}}}const i=new e,s=new t,o=new n,a=new WeakMap,l=new WeakMap;let u={},h={},f=new WeakMap,d=[],c=null,_=!1,g=null,p=null,m=null,M=null,x=null,E=null,R=null,A=new Mt(0,0,0),T=0,C=!1,S=null,v=null,I=null,O=null,L=null;const X=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let K=!1,ee=0;const j=r.getParameter(r.VERSION);j.indexOf("WebGL")!==-1?(ee=parseFloat(/^WebGL (\d)/.exec(j)[1]),K=ee>=1):j.indexOf("OpenGL ES")!==-1&&(ee=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),K=ee>=2);let V=null,re={};const P=r.getParameter(r.SCISSOR_BOX),ce=r.getParameter(r.VIEWPORT),Te=new en().fromArray(P),Fe=new en().fromArray(ce);function Y(y,N,q,ie){const de=new Uint8Array(4),We=r.createTexture();r.bindTexture(y,We),r.texParameteri(y,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(y,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Ze=0;Ze<q;Ze++)y===r.TEXTURE_3D||y===r.TEXTURE_2D_ARRAY?r.texImage3D(N,0,r.RGBA,1,1,ie,0,r.RGBA,r.UNSIGNED_BYTE,de):r.texImage2D(N+Ze,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,de);return We}const ue={};ue[r.TEXTURE_2D]=Y(r.TEXTURE_2D,r.TEXTURE_2D,1),ue[r.TEXTURE_CUBE_MAP]=Y(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),ue[r.TEXTURE_2D_ARRAY]=Y(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),ue[r.TEXTURE_3D]=Y(r.TEXTURE_3D,r.TEXTURE_3D,1,1),i.setClear(0,0,0,1),s.setClear(1),o.setClear(0),ve(r.DEPTH_TEST),s.setFunc(nc),Me(!1),ke(Vf),ve(r.CULL_FACE),Ue(Lr);function ve(y){u[y]!==!0&&(r.enable(y),u[y]=!0)}function fe(y){u[y]!==!1&&(r.disable(y),u[y]=!1)}function Le(y,N){return h[y]!==N?(r.bindFramebuffer(y,N),h[y]=N,y===r.DRAW_FRAMEBUFFER&&(h[r.FRAMEBUFFER]=N),y===r.FRAMEBUFFER&&(h[r.DRAW_FRAMEBUFFER]=N),!0):!1}function Be(y,N){let q=d,ie=!1;if(y){q=f.get(N),q===void 0&&(q=[],f.set(N,q));const de=y.textures;if(q.length!==de.length||q[0]!==r.COLOR_ATTACHMENT0){for(let We=0,Ze=de.length;We<Ze;We++)q[We]=r.COLOR_ATTACHMENT0+We;q.length=de.length,ie=!0}}else q[0]!==r.BACK&&(q[0]=r.BACK,ie=!0);ie&&r.drawBuffers(q)}function H(y){return c!==y?(r.useProgram(y),c=y,!0):!1}const Ye={[rs]:r.FUNC_ADD,[nv]:r.FUNC_SUBTRACT,[iv]:r.FUNC_REVERSE_SUBTRACT};Ye[rv]=r.MIN,Ye[sv]=r.MAX;const De={[ov]:r.ZERO,[av]:r.ONE,[lv]:r.SRC_COLOR,[eh]:r.SRC_ALPHA,[pv]:r.SRC_ALPHA_SATURATE,[fv]:r.DST_COLOR,[uv]:r.DST_ALPHA,[cv]:r.ONE_MINUS_SRC_COLOR,[th]:r.ONE_MINUS_SRC_ALPHA,[dv]:r.ONE_MINUS_DST_COLOR,[hv]:r.ONE_MINUS_DST_ALPHA,[mv]:r.CONSTANT_COLOR,[gv]:r.ONE_MINUS_CONSTANT_COLOR,[_v]:r.CONSTANT_ALPHA,[vv]:r.ONE_MINUS_CONSTANT_ALPHA};function Ue(y,N,q,ie,de,We,Ze,Se,U,te){if(y===Lr){_===!0&&(fe(r.BLEND),_=!1);return}if(_===!1&&(ve(r.BLEND),_=!0),y!==tv){if(y!==g||te!==C){if((p!==rs||x!==rs)&&(r.blendEquation(r.FUNC_ADD),p=rs,x=rs),te)switch(y){case xo:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Gf:r.blendFunc(r.ONE,r.ONE);break;case Wf:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Xf:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",y);break}else switch(y){case xo:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Gf:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case Wf:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Xf:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",y);break}m=null,M=null,E=null,R=null,A.set(0,0,0),T=0,g=y,C=te}return}de=de||N,We=We||q,Ze=Ze||ie,(N!==p||de!==x)&&(r.blendEquationSeparate(Ye[N],Ye[de]),p=N,x=de),(q!==m||ie!==M||We!==E||Ze!==R)&&(r.blendFuncSeparate(De[q],De[ie],De[We],De[Ze]),m=q,M=ie,E=We,R=Ze),(Se.equals(A)===!1||U!==T)&&(r.blendColor(Se.r,Se.g,Se.b,U),A.copy(Se),T=U),g=y,C=!1}function ye(y,N){y.side===qi?fe(r.CULL_FACE):ve(r.CULL_FACE);let q=y.side===Pn;N&&(q=!q),Me(q),y.blending===xo&&y.transparent===!1?Ue(Lr):Ue(y.blending,y.blendEquation,y.blendSrc,y.blendDst,y.blendEquationAlpha,y.blendSrcAlpha,y.blendDstAlpha,y.blendColor,y.blendAlpha,y.premultipliedAlpha),s.setFunc(y.depthFunc),s.setTest(y.depthTest),s.setMask(y.depthWrite),i.setMask(y.colorWrite);const ie=y.stencilWrite;o.setTest(ie),ie&&(o.setMask(y.stencilWriteMask),o.setFunc(y.stencilFunc,y.stencilRef,y.stencilFuncMask),o.setOp(y.stencilFail,y.stencilZFail,y.stencilZPass)),Ke(y.polygonOffset,y.polygonOffsetFactor,y.polygonOffsetUnits),y.alphaToCoverage===!0?ve(r.SAMPLE_ALPHA_TO_COVERAGE):fe(r.SAMPLE_ALPHA_TO_COVERAGE)}function Me(y){S!==y&&(y?r.frontFace(r.CW):r.frontFace(r.CCW),S=y)}function ke(y){y!==J0?(ve(r.CULL_FACE),y!==v&&(y===Vf?r.cullFace(r.BACK):y===Q0?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):fe(r.CULL_FACE),v=y}function k(y){y!==I&&(K&&r.lineWidth(y),I=y)}function Ke(y,N,q){y?(ve(r.POLYGON_OFFSET_FILL),(O!==N||L!==q)&&(r.polygonOffset(N,q),O=N,L=q)):fe(r.POLYGON_OFFSET_FILL)}function D(y){y?ve(r.SCISSOR_TEST):fe(r.SCISSOR_TEST)}function b(y){y===void 0&&(y=r.TEXTURE0+X-1),V!==y&&(r.activeTexture(y),V=y)}function J(y,N,q){q===void 0&&(V===null?q=r.TEXTURE0+X-1:q=V);let ie=re[q];ie===void 0&&(ie={type:void 0,texture:void 0},re[q]=ie),(ie.type!==y||ie.texture!==N)&&(V!==q&&(r.activeTexture(q),V=q),r.bindTexture(y,N||ue[y]),ie.type=y,ie.texture=N)}function ne(){const y=re[V];y!==void 0&&y.type!==void 0&&(r.bindTexture(y.type,null),y.type=void 0,y.texture=void 0)}function ae(){try{r.compressedTexImage2D.apply(r,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function le(){try{r.compressedTexImage3D.apply(r,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function we(){try{r.texSubImage2D.apply(r,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function me(){try{r.texSubImage3D.apply(r,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function he(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function ze(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function pe(){try{r.texStorage2D.apply(r,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function Ie(){try{r.texStorage3D.apply(r,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function nt(){try{r.texImage2D.apply(r,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function Ce(){try{r.texImage3D.apply(r,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function Re(y){Te.equals(y)===!1&&(r.scissor(y.x,y.y,y.z,y.w),Te.copy(y))}function qe(y){Fe.equals(y)===!1&&(r.viewport(y.x,y.y,y.z,y.w),Fe.copy(y))}function je(y,N){let q=l.get(N);q===void 0&&(q=new WeakMap,l.set(N,q));let ie=q.get(y);ie===void 0&&(ie=r.getUniformBlockIndex(N,y.name),q.set(y,ie))}function rt(y,N){const ie=l.get(N).get(y);a.get(N)!==ie&&(r.uniformBlockBinding(N,ie,y.__bindingPointIndex),a.set(N,ie))}function $e(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),u={},V=null,re={},h={},f=new WeakMap,d=[],c=null,_=!1,g=null,p=null,m=null,M=null,x=null,E=null,R=null,A=new Mt(0,0,0),T=0,C=!1,S=null,v=null,I=null,O=null,L=null,Te.set(0,0,r.canvas.width,r.canvas.height),Fe.set(0,0,r.canvas.width,r.canvas.height),i.reset(),s.reset(),o.reset()}return{buffers:{color:i,depth:s,stencil:o},enable:ve,disable:fe,bindFramebuffer:Le,drawBuffers:Be,useProgram:H,setBlending:Ue,setMaterial:ye,setFlipSided:Me,setCullFace:ke,setLineWidth:k,setPolygonOffset:Ke,setScissorTest:D,activeTexture:b,bindTexture:J,unbindTexture:ne,compressedTexImage2D:ae,compressedTexImage3D:le,texImage2D:nt,texImage3D:Ce,updateUBOMapping:je,uniformBlockBinding:rt,texStorage2D:pe,texStorage3D:Ie,texSubImage2D:we,texSubImage3D:me,compressedTexSubImage2D:he,compressedTexSubImage3D:ze,scissor:Re,viewport:qe,reset:$e}}function vT(r,e,t,n,i,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new it,h=new WeakMap;let f;const d=new WeakMap;let c=!1;try{c=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(D,b){return c?new OffscreenCanvas(D,b):Fa("canvas")}function g(D,b,J){let ne=1;const ae=Ke(D);if((ae.width>J||ae.height>J)&&(ne=J/Math.max(ae.width,ae.height)),ne<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){const le=Math.floor(ne*ae.width),we=Math.floor(ne*ae.height);f===void 0&&(f=_(le,we));const me=b?_(le,we):f;return me.width=le,me.height=we,me.getContext("2d").drawImage(D,0,0,le,we),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ae.width+"x"+ae.height+") to ("+le+"x"+we+")."),me}else return"data"in D&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ae.width+"x"+ae.height+")."),D;return D}function p(D){return D.generateMipmaps&&D.minFilter!==ni&&D.minFilter!==di}function m(D){r.generateMipmap(D)}function M(D,b,J,ne,ae=!1){if(D!==null){if(r[D]!==void 0)return r[D];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let le=b;if(b===r.RED&&(J===r.FLOAT&&(le=r.R32F),J===r.HALF_FLOAT&&(le=r.R16F),J===r.UNSIGNED_BYTE&&(le=r.R8)),b===r.RED_INTEGER&&(J===r.UNSIGNED_BYTE&&(le=r.R8UI),J===r.UNSIGNED_SHORT&&(le=r.R16UI),J===r.UNSIGNED_INT&&(le=r.R32UI),J===r.BYTE&&(le=r.R8I),J===r.SHORT&&(le=r.R16I),J===r.INT&&(le=r.R32I)),b===r.RG&&(J===r.FLOAT&&(le=r.RG32F),J===r.HALF_FLOAT&&(le=r.RG16F),J===r.UNSIGNED_BYTE&&(le=r.RG8)),b===r.RG_INTEGER&&(J===r.UNSIGNED_BYTE&&(le=r.RG8UI),J===r.UNSIGNED_SHORT&&(le=r.RG16UI),J===r.UNSIGNED_INT&&(le=r.RG32UI),J===r.BYTE&&(le=r.RG8I),J===r.SHORT&&(le=r.RG16I),J===r.INT&&(le=r.RG32I)),b===r.RGB&&J===r.UNSIGNED_INT_5_9_9_9_REV&&(le=r.RGB9_E5),b===r.RGBA){const we=ae?ic:St.getTransfer(ne);J===r.FLOAT&&(le=r.RGBA32F),J===r.HALF_FLOAT&&(le=r.RGBA16F),J===r.UNSIGNED_BYTE&&(le=we===wt?r.SRGB8_ALPHA8:r.RGBA8),J===r.UNSIGNED_SHORT_4_4_4_4&&(le=r.RGBA4),J===r.UNSIGNED_SHORT_5_5_5_1&&(le=r.RGB5_A1)}return(le===r.R16F||le===r.R32F||le===r.RG16F||le===r.RG32F||le===r.RGBA16F||le===r.RGBA32F)&&e.get("EXT_color_buffer_float"),le}function x(D,b){return p(D)===!0||D.isFramebufferTexture&&D.minFilter!==ni&&D.minFilter!==di?Math.log2(Math.max(b.width,b.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?b.mipmaps.length:1}function E(D){const b=D.target;b.removeEventListener("dispose",E),A(b),b.isVideoTexture&&h.delete(b)}function R(D){const b=D.target;b.removeEventListener("dispose",R),C(b)}function A(D){const b=n.get(D);if(b.__webglInit===void 0)return;const J=D.source,ne=d.get(J);if(ne){const ae=ne[b.__cacheKey];ae.usedTimes--,ae.usedTimes===0&&T(D),Object.keys(ne).length===0&&d.delete(J)}n.remove(D)}function T(D){const b=n.get(D);r.deleteTexture(b.__webglTexture);const J=D.source,ne=d.get(J);delete ne[b.__cacheKey],o.memory.textures--}function C(D){const b=n.get(D);if(D.depthTexture&&D.depthTexture.dispose(),D.isWebGLCubeRenderTarget)for(let ne=0;ne<6;ne++){if(Array.isArray(b.__webglFramebuffer[ne]))for(let ae=0;ae<b.__webglFramebuffer[ne].length;ae++)r.deleteFramebuffer(b.__webglFramebuffer[ne][ae]);else r.deleteFramebuffer(b.__webglFramebuffer[ne]);b.__webglDepthbuffer&&r.deleteRenderbuffer(b.__webglDepthbuffer[ne])}else{if(Array.isArray(b.__webglFramebuffer))for(let ne=0;ne<b.__webglFramebuffer.length;ne++)r.deleteFramebuffer(b.__webglFramebuffer[ne]);else r.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&r.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&r.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let ne=0;ne<b.__webglColorRenderbuffer.length;ne++)b.__webglColorRenderbuffer[ne]&&r.deleteRenderbuffer(b.__webglColorRenderbuffer[ne]);b.__webglDepthRenderbuffer&&r.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const J=D.textures;for(let ne=0,ae=J.length;ne<ae;ne++){const le=n.get(J[ne]);le.__webglTexture&&(r.deleteTexture(le.__webglTexture),o.memory.textures--),n.remove(J[ne])}n.remove(D)}let S=0;function v(){S=0}function I(){const D=S;return D>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+i.maxTextures),S+=1,D}function O(D){const b=[];return b.push(D.wrapS),b.push(D.wrapT),b.push(D.wrapR||0),b.push(D.magFilter),b.push(D.minFilter),b.push(D.anisotropy),b.push(D.internalFormat),b.push(D.format),b.push(D.type),b.push(D.generateMipmaps),b.push(D.premultiplyAlpha),b.push(D.flipY),b.push(D.unpackAlignment),b.push(D.colorSpace),b.join()}function L(D,b){const J=n.get(D);if(D.isVideoTexture&&ke(D),D.isRenderTargetTexture===!1&&D.version>0&&J.__version!==D.version){const ne=D.image;if(ne===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ne.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Te(J,D,b);return}}t.bindTexture(r.TEXTURE_2D,J.__webglTexture,r.TEXTURE0+b)}function X(D,b){const J=n.get(D);if(D.version>0&&J.__version!==D.version){Te(J,D,b);return}t.bindTexture(r.TEXTURE_2D_ARRAY,J.__webglTexture,r.TEXTURE0+b)}function K(D,b){const J=n.get(D);if(D.version>0&&J.__version!==D.version){Te(J,D,b);return}t.bindTexture(r.TEXTURE_3D,J.__webglTexture,r.TEXTURE0+b)}function ee(D,b){const J=n.get(D);if(D.version>0&&J.__version!==D.version){Fe(J,D,b);return}t.bindTexture(r.TEXTURE_CUBE_MAP,J.__webglTexture,r.TEXTURE0+b)}const j={[rh]:r.REPEAT,[ls]:r.CLAMP_TO_EDGE,[sh]:r.MIRRORED_REPEAT},V={[ni]:r.NEAREST,[Nv]:r.NEAREST_MIPMAP_NEAREST,[ol]:r.NEAREST_MIPMAP_LINEAR,[di]:r.LINEAR,[Xc]:r.LINEAR_MIPMAP_NEAREST,[cs]:r.LINEAR_MIPMAP_LINEAR},re={[jv]:r.NEVER,[nx]:r.ALWAYS,[Zv]:r.LESS,[mg]:r.LEQUAL,[Jv]:r.EQUAL,[tx]:r.GEQUAL,[Qv]:r.GREATER,[ex]:r.NOTEQUAL};function P(D,b){if(b.type===br&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===di||b.magFilter===Xc||b.magFilter===ol||b.magFilter===cs||b.minFilter===di||b.minFilter===Xc||b.minFilter===ol||b.minFilter===cs)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(D,r.TEXTURE_WRAP_S,j[b.wrapS]),r.texParameteri(D,r.TEXTURE_WRAP_T,j[b.wrapT]),(D===r.TEXTURE_3D||D===r.TEXTURE_2D_ARRAY)&&r.texParameteri(D,r.TEXTURE_WRAP_R,j[b.wrapR]),r.texParameteri(D,r.TEXTURE_MAG_FILTER,V[b.magFilter]),r.texParameteri(D,r.TEXTURE_MIN_FILTER,V[b.minFilter]),b.compareFunction&&(r.texParameteri(D,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(D,r.TEXTURE_COMPARE_FUNC,re[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===ni||b.minFilter!==ol&&b.minFilter!==cs||b.type===br&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){const J=e.get("EXT_texture_filter_anisotropic");r.texParameterf(D,J.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,i.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function ce(D,b){let J=!1;D.__webglInit===void 0&&(D.__webglInit=!0,b.addEventListener("dispose",E));const ne=b.source;let ae=d.get(ne);ae===void 0&&(ae={},d.set(ne,ae));const le=O(b);if(le!==D.__cacheKey){ae[le]===void 0&&(ae[le]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,J=!0),ae[le].usedTimes++;const we=ae[D.__cacheKey];we!==void 0&&(ae[D.__cacheKey].usedTimes--,we.usedTimes===0&&T(b)),D.__cacheKey=le,D.__webglTexture=ae[le].texture}return J}function Te(D,b,J){let ne=r.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(ne=r.TEXTURE_2D_ARRAY),b.isData3DTexture&&(ne=r.TEXTURE_3D);const ae=ce(D,b),le=b.source;t.bindTexture(ne,D.__webglTexture,r.TEXTURE0+J);const we=n.get(le);if(le.version!==we.__version||ae===!0){t.activeTexture(r.TEXTURE0+J);const me=St.getPrimaries(St.workingColorSpace),he=b.colorSpace===vr?null:St.getPrimaries(b.colorSpace),ze=b.colorSpace===vr||me===he?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,b.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,b.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,ze);let pe=g(b.image,!1,i.maxTextureSize);pe=k(b,pe);const Ie=s.convert(b.format,b.colorSpace),nt=s.convert(b.type);let Ce=M(b.internalFormat,Ie,nt,b.colorSpace,b.isVideoTexture);P(ne,b);let Re;const qe=b.mipmaps,je=b.isVideoTexture!==!0,rt=we.__version===void 0||ae===!0,$e=le.dataReady,y=x(b,pe);if(b.isDepthTexture)Ce=r.DEPTH_COMPONENT16,b.type===br?Ce=r.DEPTH_COMPONENT32F:b.type===Lo?Ce=r.DEPTH_COMPONENT24:b.type===Ha&&(Ce=r.DEPTH24_STENCIL8),rt&&(je?t.texStorage2D(r.TEXTURE_2D,1,Ce,pe.width,pe.height):t.texImage2D(r.TEXTURE_2D,0,Ce,pe.width,pe.height,0,Ie,nt,null));else if(b.isDataTexture)if(qe.length>0){je&&rt&&t.texStorage2D(r.TEXTURE_2D,y,Ce,qe[0].width,qe[0].height);for(let N=0,q=qe.length;N<q;N++)Re=qe[N],je?$e&&t.texSubImage2D(r.TEXTURE_2D,N,0,0,Re.width,Re.height,Ie,nt,Re.data):t.texImage2D(r.TEXTURE_2D,N,Ce,Re.width,Re.height,0,Ie,nt,Re.data);b.generateMipmaps=!1}else je?(rt&&t.texStorage2D(r.TEXTURE_2D,y,Ce,pe.width,pe.height),$e&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,pe.width,pe.height,Ie,nt,pe.data)):t.texImage2D(r.TEXTURE_2D,0,Ce,pe.width,pe.height,0,Ie,nt,pe.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){je&&rt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,y,Ce,qe[0].width,qe[0].height,pe.depth);for(let N=0,q=qe.length;N<q;N++)Re=qe[N],b.format!==wi?Ie!==null?je?$e&&t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,N,0,0,0,Re.width,Re.height,pe.depth,Ie,Re.data,0,0):t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,N,Ce,Re.width,Re.height,pe.depth,0,Re.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):je?$e&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,N,0,0,0,Re.width,Re.height,pe.depth,Ie,nt,Re.data):t.texImage3D(r.TEXTURE_2D_ARRAY,N,Ce,Re.width,Re.height,pe.depth,0,Ie,nt,Re.data)}else{je&&rt&&t.texStorage2D(r.TEXTURE_2D,y,Ce,qe[0].width,qe[0].height);for(let N=0,q=qe.length;N<q;N++)Re=qe[N],b.format!==wi?Ie!==null?je?$e&&t.compressedTexSubImage2D(r.TEXTURE_2D,N,0,0,Re.width,Re.height,Ie,Re.data):t.compressedTexImage2D(r.TEXTURE_2D,N,Ce,Re.width,Re.height,0,Re.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):je?$e&&t.texSubImage2D(r.TEXTURE_2D,N,0,0,Re.width,Re.height,Ie,nt,Re.data):t.texImage2D(r.TEXTURE_2D,N,Ce,Re.width,Re.height,0,Ie,nt,Re.data)}else if(b.isDataArrayTexture)je?(rt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,y,Ce,pe.width,pe.height,pe.depth),$e&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,pe.width,pe.height,pe.depth,Ie,nt,pe.data)):t.texImage3D(r.TEXTURE_2D_ARRAY,0,Ce,pe.width,pe.height,pe.depth,0,Ie,nt,pe.data);else if(b.isData3DTexture)je?(rt&&t.texStorage3D(r.TEXTURE_3D,y,Ce,pe.width,pe.height,pe.depth),$e&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,pe.width,pe.height,pe.depth,Ie,nt,pe.data)):t.texImage3D(r.TEXTURE_3D,0,Ce,pe.width,pe.height,pe.depth,0,Ie,nt,pe.data);else if(b.isFramebufferTexture){if(rt)if(je)t.texStorage2D(r.TEXTURE_2D,y,Ce,pe.width,pe.height);else{let N=pe.width,q=pe.height;for(let ie=0;ie<y;ie++)t.texImage2D(r.TEXTURE_2D,ie,Ce,N,q,0,Ie,nt,null),N>>=1,q>>=1}}else if(qe.length>0){if(je&&rt){const N=Ke(qe[0]);t.texStorage2D(r.TEXTURE_2D,y,Ce,N.width,N.height)}for(let N=0,q=qe.length;N<q;N++)Re=qe[N],je?$e&&t.texSubImage2D(r.TEXTURE_2D,N,0,0,Ie,nt,Re):t.texImage2D(r.TEXTURE_2D,N,Ce,Ie,nt,Re);b.generateMipmaps=!1}else if(je){if(rt){const N=Ke(pe);t.texStorage2D(r.TEXTURE_2D,y,Ce,N.width,N.height)}$e&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,Ie,nt,pe)}else t.texImage2D(r.TEXTURE_2D,0,Ce,Ie,nt,pe);p(b)&&m(ne),we.__version=le.version,b.onUpdate&&b.onUpdate(b)}D.__version=b.version}function Fe(D,b,J){if(b.image.length!==6)return;const ne=ce(D,b),ae=b.source;t.bindTexture(r.TEXTURE_CUBE_MAP,D.__webglTexture,r.TEXTURE0+J);const le=n.get(ae);if(ae.version!==le.__version||ne===!0){t.activeTexture(r.TEXTURE0+J);const we=St.getPrimaries(St.workingColorSpace),me=b.colorSpace===vr?null:St.getPrimaries(b.colorSpace),he=b.colorSpace===vr||we===me?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,b.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,b.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,he);const ze=b.isCompressedTexture||b.image[0].isCompressedTexture,pe=b.image[0]&&b.image[0].isDataTexture,Ie=[];for(let q=0;q<6;q++)!ze&&!pe?Ie[q]=g(b.image[q],!0,i.maxCubemapSize):Ie[q]=pe?b.image[q].image:b.image[q],Ie[q]=k(b,Ie[q]);const nt=Ie[0],Ce=s.convert(b.format,b.colorSpace),Re=s.convert(b.type),qe=M(b.internalFormat,Ce,Re,b.colorSpace),je=b.isVideoTexture!==!0,rt=le.__version===void 0||ne===!0,$e=ae.dataReady;let y=x(b,nt);P(r.TEXTURE_CUBE_MAP,b);let N;if(ze){je&&rt&&t.texStorage2D(r.TEXTURE_CUBE_MAP,y,qe,nt.width,nt.height);for(let q=0;q<6;q++){N=Ie[q].mipmaps;for(let ie=0;ie<N.length;ie++){const de=N[ie];b.format!==wi?Ce!==null?je?$e&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,ie,0,0,de.width,de.height,Ce,de.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,ie,qe,de.width,de.height,0,de.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):je?$e&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,ie,0,0,de.width,de.height,Ce,Re,de.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,ie,qe,de.width,de.height,0,Ce,Re,de.data)}}}else{if(N=b.mipmaps,je&&rt){N.length>0&&y++;const q=Ke(Ie[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,y,qe,q.width,q.height)}for(let q=0;q<6;q++)if(pe){je?$e&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,Ie[q].width,Ie[q].height,Ce,Re,Ie[q].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,qe,Ie[q].width,Ie[q].height,0,Ce,Re,Ie[q].data);for(let ie=0;ie<N.length;ie++){const We=N[ie].image[q].image;je?$e&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,ie+1,0,0,We.width,We.height,Ce,Re,We.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,ie+1,qe,We.width,We.height,0,Ce,Re,We.data)}}else{je?$e&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,Ce,Re,Ie[q]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,qe,Ce,Re,Ie[q]);for(let ie=0;ie<N.length;ie++){const de=N[ie];je?$e&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,ie+1,0,0,Ce,Re,de.image[q]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,ie+1,qe,Ce,Re,de.image[q])}}}p(b)&&m(r.TEXTURE_CUBE_MAP),le.__version=ae.version,b.onUpdate&&b.onUpdate(b)}D.__version=b.version}function Y(D,b,J,ne,ae,le){const we=s.convert(J.format,J.colorSpace),me=s.convert(J.type),he=M(J.internalFormat,we,me,J.colorSpace);if(!n.get(b).__hasExternalTextures){const pe=Math.max(1,b.width>>le),Ie=Math.max(1,b.height>>le);ae===r.TEXTURE_3D||ae===r.TEXTURE_2D_ARRAY?t.texImage3D(ae,le,he,pe,Ie,b.depth,0,we,me,null):t.texImage2D(ae,le,he,pe,Ie,0,we,me,null)}t.bindFramebuffer(r.FRAMEBUFFER,D),Me(b)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,ne,ae,n.get(J).__webglTexture,0,ye(b)):(ae===r.TEXTURE_2D||ae>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&ae<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,ne,ae,n.get(J).__webglTexture,le),t.bindFramebuffer(r.FRAMEBUFFER,null)}function ue(D,b,J){if(r.bindRenderbuffer(r.RENDERBUFFER,D),b.depthBuffer&&!b.stencilBuffer){let ne=r.DEPTH_COMPONENT24;if(J||Me(b)){const ae=b.depthTexture;ae&&ae.isDepthTexture&&(ae.type===br?ne=r.DEPTH_COMPONENT32F:ae.type===Lo&&(ne=r.DEPTH_COMPONENT24));const le=ye(b);Me(b)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,le,ne,b.width,b.height):r.renderbufferStorageMultisample(r.RENDERBUFFER,le,ne,b.width,b.height)}else r.renderbufferStorage(r.RENDERBUFFER,ne,b.width,b.height);r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.RENDERBUFFER,D)}else if(b.depthBuffer&&b.stencilBuffer){const ne=ye(b);J&&Me(b)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,ne,r.DEPTH24_STENCIL8,b.width,b.height):Me(b)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ne,r.DEPTH24_STENCIL8,b.width,b.height):r.renderbufferStorage(r.RENDERBUFFER,r.DEPTH_STENCIL,b.width,b.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.RENDERBUFFER,D)}else{const ne=b.textures;for(let ae=0;ae<ne.length;ae++){const le=ne[ae],we=s.convert(le.format,le.colorSpace),me=s.convert(le.type),he=M(le.internalFormat,we,me,le.colorSpace),ze=ye(b);J&&Me(b)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,ze,he,b.width,b.height):Me(b)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ze,he,b.width,b.height):r.renderbufferStorage(r.RENDERBUFFER,he,b.width,b.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function ve(D,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,D),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(b.depthTexture).__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),L(b.depthTexture,0);const ne=n.get(b.depthTexture).__webglTexture,ae=ye(b);if(b.depthTexture.format===yo)Me(b)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ne,0,ae):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ne,0);else if(b.depthTexture.format===Na)Me(b)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ne,0,ae):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ne,0);else throw new Error("Unknown depthTexture format")}function fe(D){const b=n.get(D),J=D.isWebGLCubeRenderTarget===!0;if(D.depthTexture&&!b.__autoAllocateDepthBuffer){if(J)throw new Error("target.depthTexture not supported in Cube render targets");ve(b.__webglFramebuffer,D)}else if(J){b.__webglDepthbuffer=[];for(let ne=0;ne<6;ne++)t.bindFramebuffer(r.FRAMEBUFFER,b.__webglFramebuffer[ne]),b.__webglDepthbuffer[ne]=r.createRenderbuffer(),ue(b.__webglDepthbuffer[ne],D,!1)}else t.bindFramebuffer(r.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer=r.createRenderbuffer(),ue(b.__webglDepthbuffer,D,!1);t.bindFramebuffer(r.FRAMEBUFFER,null)}function Le(D,b,J){const ne=n.get(D);b!==void 0&&Y(ne.__webglFramebuffer,D,D.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),J!==void 0&&fe(D)}function Be(D){const b=D.texture,J=n.get(D),ne=n.get(b);D.addEventListener("dispose",R);const ae=D.textures,le=D.isWebGLCubeRenderTarget===!0,we=ae.length>1;if(we||(ne.__webglTexture===void 0&&(ne.__webglTexture=r.createTexture()),ne.__version=b.version,o.memory.textures++),le){J.__webglFramebuffer=[];for(let me=0;me<6;me++)if(b.mipmaps&&b.mipmaps.length>0){J.__webglFramebuffer[me]=[];for(let he=0;he<b.mipmaps.length;he++)J.__webglFramebuffer[me][he]=r.createFramebuffer()}else J.__webglFramebuffer[me]=r.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){J.__webglFramebuffer=[];for(let me=0;me<b.mipmaps.length;me++)J.__webglFramebuffer[me]=r.createFramebuffer()}else J.__webglFramebuffer=r.createFramebuffer();if(we)for(let me=0,he=ae.length;me<he;me++){const ze=n.get(ae[me]);ze.__webglTexture===void 0&&(ze.__webglTexture=r.createTexture(),o.memory.textures++)}if(D.samples>0&&Me(D)===!1){J.__webglMultisampledFramebuffer=r.createFramebuffer(),J.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,J.__webglMultisampledFramebuffer);for(let me=0;me<ae.length;me++){const he=ae[me];J.__webglColorRenderbuffer[me]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,J.__webglColorRenderbuffer[me]);const ze=s.convert(he.format,he.colorSpace),pe=s.convert(he.type),Ie=M(he.internalFormat,ze,pe,he.colorSpace,D.isXRRenderTarget===!0),nt=ye(D);r.renderbufferStorageMultisample(r.RENDERBUFFER,nt,Ie,D.width,D.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+me,r.RENDERBUFFER,J.__webglColorRenderbuffer[me])}r.bindRenderbuffer(r.RENDERBUFFER,null),D.depthBuffer&&(J.__webglDepthRenderbuffer=r.createRenderbuffer(),ue(J.__webglDepthRenderbuffer,D,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(le){t.bindTexture(r.TEXTURE_CUBE_MAP,ne.__webglTexture),P(r.TEXTURE_CUBE_MAP,b);for(let me=0;me<6;me++)if(b.mipmaps&&b.mipmaps.length>0)for(let he=0;he<b.mipmaps.length;he++)Y(J.__webglFramebuffer[me][he],D,b,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+me,he);else Y(J.__webglFramebuffer[me],D,b,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+me,0);p(b)&&m(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(we){for(let me=0,he=ae.length;me<he;me++){const ze=ae[me],pe=n.get(ze);t.bindTexture(r.TEXTURE_2D,pe.__webglTexture),P(r.TEXTURE_2D,ze),Y(J.__webglFramebuffer,D,ze,r.COLOR_ATTACHMENT0+me,r.TEXTURE_2D,0),p(ze)&&m(r.TEXTURE_2D)}t.unbindTexture()}else{let me=r.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(me=D.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(me,ne.__webglTexture),P(me,b),b.mipmaps&&b.mipmaps.length>0)for(let he=0;he<b.mipmaps.length;he++)Y(J.__webglFramebuffer[he],D,b,r.COLOR_ATTACHMENT0,me,he);else Y(J.__webglFramebuffer,D,b,r.COLOR_ATTACHMENT0,me,0);p(b)&&m(me),t.unbindTexture()}D.depthBuffer&&fe(D)}function H(D){const b=D.textures;for(let J=0,ne=b.length;J<ne;J++){const ae=b[J];if(p(ae)){const le=D.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:r.TEXTURE_2D,we=n.get(ae).__webglTexture;t.bindTexture(le,we),m(le),t.unbindTexture()}}}const Ye=[],De=[];function Ue(D){if(D.samples>0){if(Me(D)===!1){const b=D.textures,J=D.width,ne=D.height;let ae=r.COLOR_BUFFER_BIT;const le=D.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,we=n.get(D),me=b.length>1;if(me)for(let he=0;he<b.length;he++)t.bindFramebuffer(r.FRAMEBUFFER,we.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+he,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,we.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+he,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,we.__webglMultisampledFramebuffer),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,we.__webglFramebuffer);for(let he=0;he<b.length;he++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(ae|=r.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(ae|=r.STENCIL_BUFFER_BIT)),me){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,we.__webglColorRenderbuffer[he]);const ze=n.get(b[he]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,ze,0)}r.blitFramebuffer(0,0,J,ne,0,0,J,ne,ae,r.NEAREST),l===!0&&(Ye.length=0,De.length=0,Ye.push(r.COLOR_ATTACHMENT0+he),D.depthBuffer&&D.resolveDepthBuffer===!1&&(Ye.push(le),De.push(le),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,De)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Ye))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),me)for(let he=0;he<b.length;he++){t.bindFramebuffer(r.FRAMEBUFFER,we.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+he,r.RENDERBUFFER,we.__webglColorRenderbuffer[he]);const ze=n.get(b[he]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,we.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+he,r.TEXTURE_2D,ze,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,we.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.resolveDepthBuffer===!1&&l){const b=D.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[b])}}}function ye(D){return Math.min(i.maxSamples,D.samples)}function Me(D){const b=n.get(D);return D.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function ke(D){const b=o.render.frame;h.get(D)!==b&&(h.set(D,b),D.update())}function k(D,b){const J=D.colorSpace,ne=D.format,ae=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||J!==kr&&J!==vr&&(St.getTransfer(J)===wt?(ne!==wi||ae!==Fr)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",J)),b}function Ke(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(u.width=D.naturalWidth||D.width,u.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(u.width=D.displayWidth,u.height=D.displayHeight):(u.width=D.width,u.height=D.height),u}this.allocateTextureUnit=I,this.resetTextureUnits=v,this.setTexture2D=L,this.setTexture2DArray=X,this.setTexture3D=K,this.setTextureCube=ee,this.rebindTextures=Le,this.setupRenderTarget=Be,this.updateRenderTargetMipmap=H,this.updateMultisampleRenderTarget=Ue,this.setupDepthRenderbuffer=fe,this.setupFrameBufferTexture=Y,this.useMultisampledRTT=Me}function xT(r,e){function t(n,i=vr){let s;const o=St.getTransfer(i);if(n===Fr)return r.UNSIGNED_BYTE;if(n===ug)return r.UNSIGNED_SHORT_4_4_4_4;if(n===hg)return r.UNSIGNED_SHORT_5_5_5_1;if(n===Bv)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===Ov)return r.BYTE;if(n===Fv)return r.SHORT;if(n===lg)return r.UNSIGNED_SHORT;if(n===cg)return r.INT;if(n===Lo)return r.UNSIGNED_INT;if(n===br)return r.FLOAT;if(n===pc)return r.HALF_FLOAT;if(n===zv)return r.ALPHA;if(n===kv)return r.RGB;if(n===wi)return r.RGBA;if(n===Hv)return r.LUMINANCE;if(n===Vv)return r.LUMINANCE_ALPHA;if(n===yo)return r.DEPTH_COMPONENT;if(n===Na)return r.DEPTH_STENCIL;if(n===Gv)return r.RED;if(n===fg)return r.RED_INTEGER;if(n===Wv)return r.RG;if(n===dg)return r.RG_INTEGER;if(n===pg)return r.RGBA_INTEGER;if(n===Yc||n===qc||n===$c||n===Kc)if(o===wt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Yc)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===qc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===$c)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Kc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Yc)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===qc)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===$c)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Kc)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Yf||n===qf||n===$f||n===Kf)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Yf)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===qf)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===$f)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Kf)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===jf||n===Zf||n===Jf)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===jf||n===Zf)return o===wt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Jf)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Qf||n===ed||n===td||n===nd||n===id||n===rd||n===sd||n===od||n===ad||n===ld||n===cd||n===ud||n===hd||n===fd)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Qf)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ed)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===td)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===nd)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===id)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===rd)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===sd)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===od)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ad)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ld)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===cd)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ud)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===hd)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===fd)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===jc||n===dd||n===pd)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===jc)return o===wt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===dd)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===pd)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Xv||n===md||n===gd||n===_d)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===jc)return s.COMPRESSED_RED_RGTC1_EXT;if(n===md)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===gd)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===_d)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ha?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}class yT extends Jn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class ia extends Vn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const ST={type:"move"};class Su{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ia,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ia,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ia,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Z),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,o=null;const a=this._targetRay,l=this._grip,u=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(u&&e.hand){o=!0;for(const g of e.hand.values()){const p=t.getJointPose(g,n),m=this._getHandJoint(u,g);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const h=u.joints["index-finger-tip"],f=u.joints["thumb-tip"],d=h.position.distanceTo(f.position),c=.02,_=.005;u.inputState.pinching&&d>c+_?(u.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!u.inputState.pinching&&d<=c-_&&(u.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(ST)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),u!==null&&(u.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new ia;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const MT=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ET=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class TT{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new Tn,s=e.properties.get(i);s.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}render(e,t){if(this.texture!==null){if(this.mesh===null){const n=t.cameras[0].viewport,i=new sr({vertexShader:MT,fragmentShader:ET,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Ai(new _c(20,20),i)}e.render(this.mesh,t)}}reset(){this.texture=null,this.mesh=null}}class bT extends Cs{constructor(e,t){super();const n=this;let i=null,s=1,o=null,a="local-floor",l=1,u=null,h=null,f=null,d=null,c=null,_=null;const g=new TT,p=t.getContextAttributes();let m=null,M=null;const x=[],E=[],R=new it;let A=null;const T=new Jn;T.layers.enable(1),T.viewport=new en;const C=new Jn;C.layers.enable(2),C.viewport=new en;const S=[T,C],v=new yT;v.layers.enable(1),v.layers.enable(2);let I=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let ue=x[Y];return ue===void 0&&(ue=new Su,x[Y]=ue),ue.getTargetRaySpace()},this.getControllerGrip=function(Y){let ue=x[Y];return ue===void 0&&(ue=new Su,x[Y]=ue),ue.getGripSpace()},this.getHand=function(Y){let ue=x[Y];return ue===void 0&&(ue=new Su,x[Y]=ue),ue.getHandSpace()};function L(Y){const ue=E.indexOf(Y.inputSource);if(ue===-1)return;const ve=x[ue];ve!==void 0&&(ve.update(Y.inputSource,Y.frame,u||o),ve.dispatchEvent({type:Y.type,data:Y.inputSource}))}function X(){i.removeEventListener("select",L),i.removeEventListener("selectstart",L),i.removeEventListener("selectend",L),i.removeEventListener("squeeze",L),i.removeEventListener("squeezestart",L),i.removeEventListener("squeezeend",L),i.removeEventListener("end",X),i.removeEventListener("inputsourceschange",K);for(let Y=0;Y<x.length;Y++){const ue=E[Y];ue!==null&&(E[Y]=null,x[Y].disconnect(ue))}I=null,O=null,g.reset(),e.setRenderTarget(m),c=null,d=null,f=null,i=null,M=null,Fe.stop(),n.isPresenting=!1,e.setPixelRatio(A),e.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){s=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return u||o},this.setReferenceSpace=function(Y){u=Y},this.getBaseLayer=function(){return d!==null?d:c},this.getBinding=function(){return f},this.getFrame=function(){return _},this.getSession=function(){return i},this.setSession=async function(Y){if(i=Y,i!==null){if(m=e.getRenderTarget(),i.addEventListener("select",L),i.addEventListener("selectstart",L),i.addEventListener("selectend",L),i.addEventListener("squeeze",L),i.addEventListener("squeezestart",L),i.addEventListener("squeezeend",L),i.addEventListener("end",X),i.addEventListener("inputsourceschange",K),p.xrCompatible!==!0&&await t.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(R),i.renderState.layers===void 0){const ue={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:s};c=new XRWebGLLayer(i,t,ue),i.updateRenderState({baseLayer:c}),e.setPixelRatio(1),e.setSize(c.framebufferWidth,c.framebufferHeight,!1),M=new ws(c.framebufferWidth,c.framebufferHeight,{format:wi,type:Fr,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil})}else{let ue=null,ve=null,fe=null;p.depth&&(fe=p.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ue=p.stencil?Na:yo,ve=p.stencil?Ha:Lo);const Le={colorFormat:t.RGBA8,depthFormat:fe,scaleFactor:s};f=new XRWebGLBinding(i,t),d=f.createProjectionLayer(Le),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),M=new ws(d.textureWidth,d.textureHeight,{format:wi,type:Fr,depthTexture:new Pg(d.textureWidth,d.textureHeight,ve,void 0,void 0,void 0,void 0,void 0,void 0,ue),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),u=null,o=await i.requestReferenceSpace(a),Fe.setContext(i),Fe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function K(Y){for(let ue=0;ue<Y.removed.length;ue++){const ve=Y.removed[ue],fe=E.indexOf(ve);fe>=0&&(E[fe]=null,x[fe].disconnect(ve))}for(let ue=0;ue<Y.added.length;ue++){const ve=Y.added[ue];let fe=E.indexOf(ve);if(fe===-1){for(let Be=0;Be<x.length;Be++)if(Be>=E.length){E.push(ve),fe=Be;break}else if(E[Be]===null){E[Be]=ve,fe=Be;break}if(fe===-1)break}const Le=x[fe];Le&&Le.connect(ve)}}const ee=new Z,j=new Z;function V(Y,ue,ve){ee.setFromMatrixPosition(ue.matrixWorld),j.setFromMatrixPosition(ve.matrixWorld);const fe=ee.distanceTo(j),Le=ue.projectionMatrix.elements,Be=ve.projectionMatrix.elements,H=Le[14]/(Le[10]-1),Ye=Le[14]/(Le[10]+1),De=(Le[9]+1)/Le[5],Ue=(Le[9]-1)/Le[5],ye=(Le[8]-1)/Le[0],Me=(Be[8]+1)/Be[0],ke=H*ye,k=H*Me,Ke=fe/(-ye+Me),D=Ke*-ye;ue.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(D),Y.translateZ(Ke),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert();const b=H+Ke,J=Ye+Ke,ne=ke-D,ae=k+(fe-D),le=De*Ye/J*b,we=Ue*Ye/J*b;Y.projectionMatrix.makePerspective(ne,ae,le,we,b,J),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}function re(Y,ue){ue===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(ue.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(i===null)return;g.texture!==null&&(Y.near=g.depthNear,Y.far=g.depthFar),v.near=C.near=T.near=Y.near,v.far=C.far=T.far=Y.far,(I!==v.near||O!==v.far)&&(i.updateRenderState({depthNear:v.near,depthFar:v.far}),I=v.near,O=v.far,T.near=I,T.far=O,C.near=I,C.far=O,T.updateProjectionMatrix(),C.updateProjectionMatrix(),Y.updateProjectionMatrix());const ue=Y.parent,ve=v.cameras;re(v,ue);for(let fe=0;fe<ve.length;fe++)re(ve[fe],ue);ve.length===2?V(v,T,C):v.projectionMatrix.copy(T.projectionMatrix),P(Y,v,ue)};function P(Y,ue,ve){ve===null?Y.matrix.copy(ue.matrixWorld):(Y.matrix.copy(ve.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(ue.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(ue.projectionMatrix),Y.projectionMatrixInverse.copy(ue.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Oa*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(d===null&&c===null))return l},this.setFoveation=function(Y){l=Y,d!==null&&(d.fixedFoveation=Y),c!==null&&c.fixedFoveation!==void 0&&(c.fixedFoveation=Y)},this.hasDepthSensing=function(){return g.texture!==null};let ce=null;function Te(Y,ue){if(h=ue.getViewerPose(u||o),_=ue,h!==null){const ve=h.views;c!==null&&(e.setRenderTargetFramebuffer(M,c.framebuffer),e.setRenderTarget(M));let fe=!1;ve.length!==v.cameras.length&&(v.cameras.length=0,fe=!0);for(let Be=0;Be<ve.length;Be++){const H=ve[Be];let Ye=null;if(c!==null)Ye=c.getViewport(H);else{const Ue=f.getViewSubImage(d,H);Ye=Ue.viewport,Be===0&&(e.setRenderTargetTextures(M,Ue.colorTexture,d.ignoreDepthValues?void 0:Ue.depthStencilTexture),e.setRenderTarget(M))}let De=S[Be];De===void 0&&(De=new Jn,De.layers.enable(Be),De.viewport=new en,S[Be]=De),De.matrix.fromArray(H.transform.matrix),De.matrix.decompose(De.position,De.quaternion,De.scale),De.projectionMatrix.fromArray(H.projectionMatrix),De.projectionMatrixInverse.copy(De.projectionMatrix).invert(),De.viewport.set(Ye.x,Ye.y,Ye.width,Ye.height),Be===0&&(v.matrix.copy(De.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),fe===!0&&v.cameras.push(De)}const Le=i.enabledFeatures;if(Le&&Le.includes("depth-sensing")){const Be=f.getDepthInformation(ve[0]);Be&&Be.isValid&&Be.texture&&g.init(e,Be,i.renderState)}}for(let ve=0;ve<x.length;ve++){const fe=E[ve],Le=x[ve];fe!==null&&Le!==void 0&&Le.update(fe,ue,u||o)}g.render(e,v),ce&&ce(Y,ue),ue.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ue}),_=null}const Fe=new Cg;Fe.setAnimationLoop(Te),this.setAnimationLoop=function(Y){ce=Y},this.dispose=function(){}}}const Jr=new rr,wT=new Xt;function AT(r,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,bg(r)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function i(p,m,M,x,E){m.isMeshBasicMaterial||m.isMeshLambertMaterial?s(p,m):m.isMeshToonMaterial?(s(p,m),f(p,m)):m.isMeshPhongMaterial?(s(p,m),h(p,m)):m.isMeshStandardMaterial?(s(p,m),d(p,m),m.isMeshPhysicalMaterial&&c(p,m,E)):m.isMeshMatcapMaterial?(s(p,m),_(p,m)):m.isMeshDepthMaterial?s(p,m):m.isMeshDistanceMaterial?(s(p,m),g(p,m)):m.isMeshNormalMaterial?s(p,m):m.isLineBasicMaterial?(o(p,m),m.isLineDashedMaterial&&a(p,m)):m.isPointsMaterial?l(p,m,M,x):m.isSpriteMaterial?u(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===Pn&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===Pn&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const M=e.get(m),x=M.envMap,E=M.envMapRotation;if(x&&(p.envMap.value=x,Jr.copy(E),Jr.x*=-1,Jr.y*=-1,Jr.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Jr.y*=-1,Jr.z*=-1),p.envMapRotation.value.setFromMatrix4(wT.makeRotationFromEuler(Jr)),p.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap){p.lightMap.value=m.lightMap;const R=r._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=m.lightMapIntensity*R,t(m.lightMap,p.lightMapTransform)}m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function o(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function a(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,M,x){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*M,p.scale.value=x*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function u(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function h(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function f(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function d(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function c(p,m,M){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Pn&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=M.texture,p.transmissionSamplerSize.value.set(M.width,M.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function _(p,m){m.matcap&&(p.matcap.value=m.matcap)}function g(p,m){const M=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(M.matrixWorld),p.nearDistance.value=M.shadow.camera.near,p.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function RT(r,e,t,n){let i={},s={},o=[];const a=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,x){const E=x.program;n.uniformBlockBinding(M,E)}function u(M,x){let E=i[M.id];E===void 0&&(_(M),E=h(M),i[M.id]=E,M.addEventListener("dispose",p));const R=x.program;n.updateUBOMapping(M,R);const A=e.render.frame;s[M.id]!==A&&(d(M),s[M.id]=A)}function h(M){const x=f();M.__bindingPointIndex=x;const E=r.createBuffer(),R=M.__size,A=M.usage;return r.bindBuffer(r.UNIFORM_BUFFER,E),r.bufferData(r.UNIFORM_BUFFER,R,A),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,x,E),E}function f(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(M){const x=i[M.id],E=M.uniforms,R=M.__cache;r.bindBuffer(r.UNIFORM_BUFFER,x);for(let A=0,T=E.length;A<T;A++){const C=Array.isArray(E[A])?E[A]:[E[A]];for(let S=0,v=C.length;S<v;S++){const I=C[S];if(c(I,A,S,R)===!0){const O=I.__offset,L=Array.isArray(I.value)?I.value:[I.value];let X=0;for(let K=0;K<L.length;K++){const ee=L[K],j=g(ee);typeof ee=="number"||typeof ee=="boolean"?(I.__data[0]=ee,r.bufferSubData(r.UNIFORM_BUFFER,O+X,I.__data)):ee.isMatrix3?(I.__data[0]=ee.elements[0],I.__data[1]=ee.elements[1],I.__data[2]=ee.elements[2],I.__data[3]=0,I.__data[4]=ee.elements[3],I.__data[5]=ee.elements[4],I.__data[6]=ee.elements[5],I.__data[7]=0,I.__data[8]=ee.elements[6],I.__data[9]=ee.elements[7],I.__data[10]=ee.elements[8],I.__data[11]=0):(ee.toArray(I.__data,X),X+=j.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,O,I.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function c(M,x,E,R){const A=M.value,T=x+"_"+E;if(R[T]===void 0)return typeof A=="number"||typeof A=="boolean"?R[T]=A:R[T]=A.clone(),!0;{const C=R[T];if(typeof A=="number"||typeof A=="boolean"){if(C!==A)return R[T]=A,!0}else if(C.equals(A)===!1)return C.copy(A),!0}return!1}function _(M){const x=M.uniforms;let E=0;const R=16;for(let T=0,C=x.length;T<C;T++){const S=Array.isArray(x[T])?x[T]:[x[T]];for(let v=0,I=S.length;v<I;v++){const O=S[v],L=Array.isArray(O.value)?O.value:[O.value];for(let X=0,K=L.length;X<K;X++){const ee=L[X],j=g(ee),V=E%R;V!==0&&R-V<j.boundary&&(E+=R-V),O.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=E,E+=j.storage}}}const A=E%R;return A>0&&(E+=R-A),M.__size=E,M.__cache={},this}function g(M){const x={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(x.boundary=4,x.storage=4):M.isVector2?(x.boundary=8,x.storage=8):M.isVector3||M.isColor?(x.boundary=16,x.storage=12):M.isVector4?(x.boundary=16,x.storage=16):M.isMatrix3?(x.boundary=48,x.storage=48):M.isMatrix4?(x.boundary=64,x.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),x}function p(M){const x=M.target;x.removeEventListener("dispose",p);const E=o.indexOf(x.__bindingPointIndex);o.splice(E,1),r.deleteBuffer(i[x.id]),delete i[x.id],delete s[x.id]}function m(){for(const M in i)r.deleteBuffer(i[M]);o=[],i={},s={}}return{bind:l,update:u,dispose:m}}class CT{constructor(e={}){const{canvas:t=yx(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:u=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1}=e;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const c=new Uint32Array(4),_=new Int32Array(4);let g=null,p=null;const m=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Kn,this._useLegacyLights=!1,this.toneMapping=Dr,this.toneMappingExposure=1;const x=this;let E=!1,R=0,A=0,T=null,C=-1,S=null;const v=new en,I=new en;let O=null;const L=new Mt(0);let X=0,K=t.width,ee=t.height,j=1,V=null,re=null;const P=new en(0,0,K,ee),ce=new en(0,0,K,ee);let Te=!1;const Fe=new Rg;let Y=!1,ue=!1;const ve=new Xt,fe=new Z,Le={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Be(){return T===null?j:1}let H=n;function Ye(w,B){return t.getContext(w,B)}try{const w={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:u,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Uh}`),t.addEventListener("webglcontextlost",y,!1),t.addEventListener("webglcontextrestored",N,!1),t.addEventListener("webglcontextcreationerror",q,!1),H===null){const B="webgl2";if(H=Ye(B,w),H===null)throw Ye(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let De,Ue,ye,Me,ke,k,Ke,D,b,J,ne,ae,le,we,me,he,ze,pe,Ie,nt,Ce,Re,qe,je;function rt(){De=new FM(H),De.init(),Re=new xT(H,De),Ue=new PM(H,De,e,Re),ye=new _T(H),Me=new kM(H),ke=new iT,k=new vT(H,De,ye,ke,Ue,Re,Me),Ke=new DM(x),D=new OM(x),b=new Yx(H),qe=new RM(H,b),J=new BM(H,b,Me,qe),ne=new VM(H,J,b,Me),Ie=new HM(H,Ue,k),he=new LM(ke),ae=new nT(x,Ke,D,De,Ue,qe,he),le=new AT(x,ke),we=new sT,me=new hT(De),pe=new AM(x,Ke,D,ye,ne,d,l),ze=new gT(x,ne,Ue),je=new RT(H,Me,Ue,ye),nt=new CM(H,De,Me),Ce=new zM(H,De,Me),Me.programs=ae.programs,x.capabilities=Ue,x.extensions=De,x.properties=ke,x.renderLists=we,x.shadowMap=ze,x.state=ye,x.info=Me}rt();const $e=new bT(x,H);this.xr=$e,this.getContext=function(){return H},this.getContextAttributes=function(){return H.getContextAttributes()},this.forceContextLoss=function(){const w=De.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=De.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return j},this.setPixelRatio=function(w){w!==void 0&&(j=w,this.setSize(K,ee,!1))},this.getSize=function(w){return w.set(K,ee)},this.setSize=function(w,B,z=!0){if($e.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}K=w,ee=B,t.width=Math.floor(w*j),t.height=Math.floor(B*j),z===!0&&(t.style.width=w+"px",t.style.height=B+"px"),this.setViewport(0,0,w,B)},this.getDrawingBufferSize=function(w){return w.set(K*j,ee*j).floor()},this.setDrawingBufferSize=function(w,B,z){K=w,ee=B,j=z,t.width=Math.floor(w*z),t.height=Math.floor(B*z),this.setViewport(0,0,w,B)},this.getCurrentViewport=function(w){return w.copy(v)},this.getViewport=function(w){return w.copy(P)},this.setViewport=function(w,B,z,$){w.isVector4?P.set(w.x,w.y,w.z,w.w):P.set(w,B,z,$),ye.viewport(v.copy(P).multiplyScalar(j).round())},this.getScissor=function(w){return w.copy(ce)},this.setScissor=function(w,B,z,$){w.isVector4?ce.set(w.x,w.y,w.z,w.w):ce.set(w,B,z,$),ye.scissor(I.copy(ce).multiplyScalar(j).round())},this.getScissorTest=function(){return Te},this.setScissorTest=function(w){ye.setScissorTest(Te=w)},this.setOpaqueSort=function(w){V=w},this.setTransparentSort=function(w){re=w},this.getClearColor=function(w){return w.copy(pe.getClearColor())},this.setClearColor=function(){pe.setClearColor.apply(pe,arguments)},this.getClearAlpha=function(){return pe.getClearAlpha()},this.setClearAlpha=function(){pe.setClearAlpha.apply(pe,arguments)},this.clear=function(w=!0,B=!0,z=!0){let $=0;if(w){let G=!1;if(T!==null){const xe=T.texture.format;G=xe===pg||xe===dg||xe===fg}if(G){const xe=T.texture.type,be=xe===Fr||xe===Lo||xe===lg||xe===Ha||xe===ug||xe===hg,Pe=pe.getClearColor(),Xe=pe.getClearAlpha(),Qe=Pe.r,Ge=Pe.g,Ve=Pe.b;be?(c[0]=Qe,c[1]=Ge,c[2]=Ve,c[3]=Xe,H.clearBufferuiv(H.COLOR,0,c)):(_[0]=Qe,_[1]=Ge,_[2]=Ve,_[3]=Xe,H.clearBufferiv(H.COLOR,0,_))}else $|=H.COLOR_BUFFER_BIT}B&&($|=H.DEPTH_BUFFER_BIT),z&&($|=H.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",y,!1),t.removeEventListener("webglcontextrestored",N,!1),t.removeEventListener("webglcontextcreationerror",q,!1),we.dispose(),me.dispose(),ke.dispose(),Ke.dispose(),D.dispose(),ne.dispose(),qe.dispose(),je.dispose(),ae.dispose(),$e.dispose(),$e.removeEventListener("sessionstart",te),$e.removeEventListener("sessionend",F),W.stop()};function y(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function N(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const w=Me.autoReset,B=ze.enabled,z=ze.autoUpdate,$=ze.needsUpdate,G=ze.type;rt(),Me.autoReset=w,ze.enabled=B,ze.autoUpdate=z,ze.needsUpdate=$,ze.type=G}function q(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function ie(w){const B=w.target;B.removeEventListener("dispose",ie),de(B)}function de(w){We(w),ke.remove(w)}function We(w){const B=ke.get(w).programs;B!==void 0&&(B.forEach(function(z){ae.releaseProgram(z)}),w.isShaderMaterial&&ae.releaseShaderCache(w))}this.renderBufferDirect=function(w,B,z,$,G,xe){B===null&&(B=Le);const be=G.isMesh&&G.matrixWorld.determinant()<0,Pe=dt(w,B,z,$,G);ye.setMaterial($,be);let Xe=z.index,Qe=1;if($.wireframe===!0){if(Xe=J.getWireframeAttribute(z),Xe===void 0)return;Qe=2}const Ge=z.drawRange,Ve=z.attributes.position;let xt=Ge.start*Qe,Ft=(Ge.start+Ge.count)*Qe;xe!==null&&(xt=Math.max(xt,xe.start*Qe),Ft=Math.min(Ft,(xe.start+xe.count)*Qe)),Xe!==null?(xt=Math.max(xt,0),Ft=Math.min(Ft,Xe.count)):Ve!=null&&(xt=Math.max(xt,0),Ft=Math.min(Ft,Ve.count));const tn=Ft-xt;if(tn<0||tn===1/0)return;qe.setup(G,$,Pe,z,Xe);let fn,st=nt;if(Xe!==null&&(fn=b.get(Xe),st=Ce,st.setIndex(fn)),G.isMesh)$.wireframe===!0?(ye.setLineWidth($.wireframeLinewidth*Be()),st.setMode(H.LINES)):st.setMode(H.TRIANGLES);else if(G.isLine){let Je=$.linewidth;Je===void 0&&(Je=1),ye.setLineWidth(Je*Be()),G.isLineSegments?st.setMode(H.LINES):G.isLineLoop?st.setMode(H.LINE_LOOP):st.setMode(H.LINE_STRIP)}else G.isPoints?st.setMode(H.POINTS):G.isSprite&&st.setMode(H.TRIANGLES);if(G.isBatchedMesh)G._multiDrawInstances!==null?st.renderMultiDrawInstances(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount,G._multiDrawInstances):st.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else if(G.isInstancedMesh)st.renderInstances(xt,tn,G.count);else if(z.isInstancedBufferGeometry){const Je=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,_i=Math.min(z.instanceCount,Je);st.renderInstances(xt,tn,_i)}else st.render(xt,tn)};function Ze(w,B,z){w.transparent===!0&&w.side===qi&&w.forceSinglePass===!1?(w.side=Pn,w.needsUpdate=!0,He(w,B,z),w.side=Or,w.needsUpdate=!0,He(w,B,z),w.side=qi):He(w,B,z)}this.compile=function(w,B,z=null){z===null&&(z=w),p=me.get(z),p.init(B),M.push(p),z.traverseVisible(function(G){G.isLight&&G.layers.test(B.layers)&&(p.pushLight(G),G.castShadow&&p.pushShadow(G))}),w!==z&&w.traverseVisible(function(G){G.isLight&&G.layers.test(B.layers)&&(p.pushLight(G),G.castShadow&&p.pushShadow(G))}),p.setupLights(x._useLegacyLights);const $=new Set;return w.traverse(function(G){const xe=G.material;if(xe)if(Array.isArray(xe))for(let be=0;be<xe.length;be++){const Pe=xe[be];Ze(Pe,z,G),$.add(Pe)}else Ze(xe,z,G),$.add(xe)}),M.pop(),p=null,$},this.compileAsync=function(w,B,z=null){const $=this.compile(w,B,z);return new Promise(G=>{function xe(){if($.forEach(function(be){ke.get(be).currentProgram.isReady()&&$.delete(be)}),$.size===0){G(w);return}setTimeout(xe,10)}De.get("KHR_parallel_shader_compile")!==null?xe():setTimeout(xe,10)})};let Se=null;function U(w){Se&&Se(w)}function te(){W.stop()}function F(){W.start()}const W=new Cg;W.setAnimationLoop(U),typeof self<"u"&&W.setContext(self),this.setAnimationLoop=function(w){Se=w,$e.setAnimationLoop(w),w===null?W.stop():W.start()},$e.addEventListener("sessionstart",te),$e.addEventListener("sessionend",F),this.render=function(w,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),$e.enabled===!0&&$e.isPresenting===!0&&($e.cameraAutoUpdate===!0&&$e.updateCamera(B),B=$e.getCamera()),w.isScene===!0&&w.onBeforeRender(x,w,B,T),p=me.get(w,M.length),p.init(B),M.push(p),ve.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),Fe.setFromProjectionMatrix(ve),ue=this.localClippingEnabled,Y=he.init(this.clippingPlanes,ue),g=we.get(w,m.length),g.init(),m.push(g),oe(w,B,0,x.sortObjects),g.finish(),x.sortObjects===!0&&g.sort(V,re);const z=$e.enabled===!1||$e.isPresenting===!1||$e.hasDepthSensing()===!1;z&&pe.addToRenderList(g,w),this.info.render.frame++,Y===!0&&he.beginShadows();const $=p.state.shadowsArray;ze.render($,w,B),Y===!0&&he.endShadows(),this.info.autoReset===!0&&this.info.reset();const G=g.opaque,xe=g.transmissive;if(p.setupLights(x._useLegacyLights),B.isArrayCamera){const be=B.cameras;if(xe.length>0)for(let Pe=0,Xe=be.length;Pe<Xe;Pe++){const Qe=be[Pe];_e(G,xe,w,Qe)}z&&pe.render(w);for(let Pe=0,Xe=be.length;Pe<Xe;Pe++){const Qe=be[Pe];Q(g,w,Qe,Qe.viewport)}}else xe.length>0&&_e(G,xe,w,B),z&&pe.render(w),Q(g,w,B);T!==null&&(k.updateMultisampleRenderTarget(T),k.updateRenderTargetMipmap(T)),w.isScene===!0&&w.onAfterRender(x,w,B),qe.resetDefaultState(),C=-1,S=null,M.pop(),M.length>0?(p=M[M.length-1],Y===!0&&he.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,m.pop(),m.length>0?g=m[m.length-1]:g=null};function oe(w,B,z,$){if(w.visible===!1)return;if(w.layers.test(B.layers)){if(w.isGroup)z=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(B);else if(w.isLight)p.pushLight(w),w.castShadow&&p.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||Fe.intersectsSprite(w)){$&&fe.setFromMatrixPosition(w.matrixWorld).applyMatrix4(ve);const be=ne.update(w),Pe=w.material;Pe.visible&&g.push(w,be,Pe,z,fe.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||Fe.intersectsObject(w))){const be=ne.update(w),Pe=w.material;if($&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),fe.copy(w.boundingSphere.center)):(be.boundingSphere===null&&be.computeBoundingSphere(),fe.copy(be.boundingSphere.center)),fe.applyMatrix4(w.matrixWorld).applyMatrix4(ve)),Array.isArray(Pe)){const Xe=be.groups;for(let Qe=0,Ge=Xe.length;Qe<Ge;Qe++){const Ve=Xe[Qe],xt=Pe[Ve.materialIndex];xt&&xt.visible&&g.push(w,be,xt,z,fe.z,Ve)}}else Pe.visible&&g.push(w,be,Pe,z,fe.z,null)}}const xe=w.children;for(let be=0,Pe=xe.length;be<Pe;be++)oe(xe[be],B,z,$)}function Q(w,B,z,$){const G=w.opaque,xe=w.transmissive,be=w.transparent;p.setupLightsView(z),Y===!0&&he.setGlobalState(x.clippingPlanes,z),$&&ye.viewport(v.copy($)),G.length>0&&se(G,B,z),xe.length>0&&se(xe,B,z),be.length>0&&se(be,B,z),ye.buffers.depth.setTest(!0),ye.buffers.depth.setMask(!0),ye.buffers.color.setMask(!0),ye.setPolygonOffset(!1)}function _e(w,B,z,$){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[$.id]===void 0&&(p.state.transmissionRenderTarget[$.id]=new ws(1,1,{generateMipmaps:!0,type:De.has("EXT_color_buffer_half_float")||De.has("EXT_color_buffer_float")?pc:Fr,minFilter:cs,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1}));const xe=p.state.transmissionRenderTarget[$.id],be=$.viewport||v;xe.setSize(be.z,be.w);const Pe=x.getRenderTarget();x.setRenderTarget(xe),x.getClearColor(L),X=x.getClearAlpha(),X<1&&x.setClearColor(16777215,.5),x.clear();const Xe=x.toneMapping;x.toneMapping=Dr;const Qe=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),p.setupLightsView($),Y===!0&&he.setGlobalState(x.clippingPlanes,$),se(w,z,$),k.updateMultisampleRenderTarget(xe),k.updateRenderTargetMipmap(xe),De.has("WEBGL_multisampled_render_to_texture")===!1){let Ge=!1;for(let Ve=0,xt=B.length;Ve<xt;Ve++){const Ft=B[Ve],tn=Ft.object,fn=Ft.geometry,st=Ft.material,Je=Ft.group;if(st.side===qi&&tn.layers.test($.layers)){const _i=st.side;st.side=Pn,st.needsUpdate=!0,Ee(tn,z,$,fn,st,Je),st.side=_i,st.needsUpdate=!0,Ge=!0}}Ge===!0&&(k.updateMultisampleRenderTarget(xe),k.updateRenderTargetMipmap(xe))}x.setRenderTarget(Pe),x.setClearColor(L,X),Qe!==void 0&&($.viewport=Qe),x.toneMapping=Xe}function se(w,B,z){const $=B.isScene===!0?B.overrideMaterial:null;for(let G=0,xe=w.length;G<xe;G++){const be=w[G],Pe=be.object,Xe=be.geometry,Qe=$===null?be.material:$,Ge=be.group;Pe.layers.test(z.layers)&&Ee(Pe,B,z,Xe,Qe,Ge)}}function Ee(w,B,z,$,G,xe){w.onBeforeRender(x,B,z,$,G,xe),w.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),G.onBeforeRender(x,B,z,$,w,xe),G.transparent===!0&&G.side===qi&&G.forceSinglePass===!1?(G.side=Pn,G.needsUpdate=!0,x.renderBufferDirect(z,B,$,G,w,xe),G.side=Or,G.needsUpdate=!0,x.renderBufferDirect(z,B,$,G,w,xe),G.side=qi):x.renderBufferDirect(z,B,$,G,w,xe),w.onAfterRender(x,B,z,$,G,xe)}function He(w,B,z){B.isScene!==!0&&(B=Le);const $=ke.get(w),G=p.state.lights,xe=p.state.shadowsArray,be=G.state.version,Pe=ae.getParameters(w,G.state,xe,B,z),Xe=ae.getProgramCacheKey(Pe);let Qe=$.programs;$.environment=w.isMeshStandardMaterial?B.environment:null,$.fog=B.fog,$.envMap=(w.isMeshStandardMaterial?D:Ke).get(w.envMap||$.environment),$.envMapRotation=$.environment!==null&&w.envMap===null?B.environmentRotation:w.envMapRotation,Qe===void 0&&(w.addEventListener("dispose",ie),Qe=new Map,$.programs=Qe);let Ge=Qe.get(Xe);if(Ge!==void 0){if($.currentProgram===Ge&&$.lightsStateVersion===be)return tt(w,Pe),Ge}else Pe.uniforms=ae.getUniforms(w),w.onBuild(z,Pe,x),w.onBeforeCompile(Pe,x),Ge=ae.acquireProgram(Pe,Xe),Qe.set(Xe,Ge),$.uniforms=Pe.uniforms;const Ve=$.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Ve.clippingPlanes=he.uniform),tt(w,Pe),$.needsLights=ct(w),$.lightsStateVersion=be,$.needsLights&&(Ve.ambientLightColor.value=G.state.ambient,Ve.lightProbe.value=G.state.probe,Ve.directionalLights.value=G.state.directional,Ve.directionalLightShadows.value=G.state.directionalShadow,Ve.spotLights.value=G.state.spot,Ve.spotLightShadows.value=G.state.spotShadow,Ve.rectAreaLights.value=G.state.rectArea,Ve.ltc_1.value=G.state.rectAreaLTC1,Ve.ltc_2.value=G.state.rectAreaLTC2,Ve.pointLights.value=G.state.point,Ve.pointLightShadows.value=G.state.pointShadow,Ve.hemisphereLights.value=G.state.hemi,Ve.directionalShadowMap.value=G.state.directionalShadowMap,Ve.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Ve.spotShadowMap.value=G.state.spotShadowMap,Ve.spotLightMatrix.value=G.state.spotLightMatrix,Ve.spotLightMap.value=G.state.spotLightMap,Ve.pointShadowMap.value=G.state.pointShadowMap,Ve.pointShadowMatrix.value=G.state.pointShadowMatrix),$.currentProgram=Ge,$.uniformsList=null,Ge}function Ne(w){if(w.uniformsList===null){const B=w.currentProgram.getUniforms();w.uniformsList=Hl.seqWithValue(B.seq,w.uniforms)}return w.uniformsList}function tt(w,B){const z=ke.get(w);z.outputColorSpace=B.outputColorSpace,z.batching=B.batching,z.instancing=B.instancing,z.instancingColor=B.instancingColor,z.instancingMorph=B.instancingMorph,z.skinning=B.skinning,z.morphTargets=B.morphTargets,z.morphNormals=B.morphNormals,z.morphColors=B.morphColors,z.morphTargetsCount=B.morphTargetsCount,z.numClippingPlanes=B.numClippingPlanes,z.numIntersection=B.numClipIntersection,z.vertexAlphas=B.vertexAlphas,z.vertexTangents=B.vertexTangents,z.toneMapping=B.toneMapping}function dt(w,B,z,$,G){B.isScene!==!0&&(B=Le),k.resetTextureUnits();const xe=B.fog,be=$.isMeshStandardMaterial?B.environment:null,Pe=T===null?x.outputColorSpace:T.isXRRenderTarget===!0?T.texture.colorSpace:kr,Xe=($.isMeshStandardMaterial?D:Ke).get($.envMap||be),Qe=$.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,Ge=!!z.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),Ve=!!z.morphAttributes.position,xt=!!z.morphAttributes.normal,Ft=!!z.morphAttributes.color;let tn=Dr;$.toneMapped&&(T===null||T.isXRRenderTarget===!0)&&(tn=x.toneMapping);const fn=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,st=fn!==void 0?fn.length:0,Je=ke.get($),_i=p.state.lights;if(Y===!0&&(ue===!0||w!==S)){const Wn=w===S&&$.id===C;he.setState($,w,Wn)}let yt=!1;$.version===Je.__version?(Je.needsLights&&Je.lightsStateVersion!==_i.state.version||Je.outputColorSpace!==Pe||G.isBatchedMesh&&Je.batching===!1||!G.isBatchedMesh&&Je.batching===!0||G.isInstancedMesh&&Je.instancing===!1||!G.isInstancedMesh&&Je.instancing===!0||G.isSkinnedMesh&&Je.skinning===!1||!G.isSkinnedMesh&&Je.skinning===!0||G.isInstancedMesh&&Je.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&Je.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&Je.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&Je.instancingMorph===!1&&G.morphTexture!==null||Je.envMap!==Xe||$.fog===!0&&Je.fog!==xe||Je.numClippingPlanes!==void 0&&(Je.numClippingPlanes!==he.numPlanes||Je.numIntersection!==he.numIntersection)||Je.vertexAlphas!==Qe||Je.vertexTangents!==Ge||Je.morphTargets!==Ve||Je.morphNormals!==xt||Je.morphColors!==Ft||Je.toneMapping!==tn||Je.morphTargetsCount!==st)&&(yt=!0):(yt=!0,Je.__version=$.version);let Vr=Je.currentProgram;yt===!0&&(Vr=He($,B,G));let Wh=!1,Oo=!1,xc=!1;const nn=Vr.getUniforms(),or=Je.uniforms;if(ye.useProgram(Vr.program)&&(Wh=!0,Oo=!0,xc=!0),$.id!==C&&(C=$.id,Oo=!0),Wh||S!==w){nn.setValue(H,"projectionMatrix",w.projectionMatrix),nn.setValue(H,"viewMatrix",w.matrixWorldInverse);const Wn=nn.map.cameraPosition;Wn!==void 0&&Wn.setValue(H,fe.setFromMatrixPosition(w.matrixWorld)),Ue.logarithmicDepthBuffer&&nn.setValue(H,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&nn.setValue(H,"isOrthographic",w.isOrthographicCamera===!0),S!==w&&(S=w,Oo=!0,xc=!0)}if(G.isSkinnedMesh){nn.setOptional(H,G,"bindMatrix"),nn.setOptional(H,G,"bindMatrixInverse");const Wn=G.skeleton;Wn&&(Wn.boneTexture===null&&Wn.computeBoneTexture(),nn.setValue(H,"boneTexture",Wn.boneTexture,k))}G.isBatchedMesh&&(nn.setOptional(H,G,"batchingTexture"),nn.setValue(H,"batchingTexture",G._matricesTexture,k));const yc=z.morphAttributes;if((yc.position!==void 0||yc.normal!==void 0||yc.color!==void 0)&&Ie.update(G,z,Vr),(Oo||Je.receiveShadow!==G.receiveShadow)&&(Je.receiveShadow=G.receiveShadow,nn.setValue(H,"receiveShadow",G.receiveShadow)),$.isMeshGouraudMaterial&&$.envMap!==null&&(or.envMap.value=Xe,or.flipEnvMap.value=Xe.isCubeTexture&&Xe.isRenderTargetTexture===!1?-1:1),$.isMeshStandardMaterial&&$.envMap===null&&B.environment!==null&&(or.envMapIntensity.value=B.environmentIntensity),Oo&&(nn.setValue(H,"toneMappingExposure",x.toneMappingExposure),Je.needsLights&&_t(or,xc),xe&&$.fog===!0&&le.refreshFogUniforms(or,xe),le.refreshMaterialUniforms(or,$,j,ee,p.state.transmissionRenderTarget[w.id]),Hl.upload(H,Ne(Je),or,k)),$.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(Hl.upload(H,Ne(Je),or,k),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&nn.setValue(H,"center",G.center),nn.setValue(H,"modelViewMatrix",G.modelViewMatrix),nn.setValue(H,"normalMatrix",G.normalMatrix),nn.setValue(H,"modelMatrix",G.matrixWorld),$.isShaderMaterial||$.isRawShaderMaterial){const Wn=$.uniformsGroups;for(let Sc=0,kg=Wn.length;Sc<kg;Sc++){const Xh=Wn[Sc];je.update(Xh,Vr),je.bind(Xh,Vr)}}return Vr}function _t(w,B){w.ambientLightColor.needsUpdate=B,w.lightProbe.needsUpdate=B,w.directionalLights.needsUpdate=B,w.directionalLightShadows.needsUpdate=B,w.pointLights.needsUpdate=B,w.pointLightShadows.needsUpdate=B,w.spotLights.needsUpdate=B,w.spotLightShadows.needsUpdate=B,w.rectAreaLights.needsUpdate=B,w.hemisphereLights.needsUpdate=B}function ct(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return T},this.setRenderTargetTextures=function(w,B,z){ke.get(w.texture).__webglTexture=B,ke.get(w.depthTexture).__webglTexture=z;const $=ke.get(w);$.__hasExternalTextures=!0,$.__autoAllocateDepthBuffer=z===void 0,$.__autoAllocateDepthBuffer||De.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),$.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,B){const z=ke.get(w);z.__webglFramebuffer=B,z.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(w,B=0,z=0){T=w,R=B,A=z;let $=!0,G=null,xe=!1,be=!1;if(w){const Xe=ke.get(w);Xe.__useDefaultFramebuffer!==void 0?(ye.bindFramebuffer(H.FRAMEBUFFER,null),$=!1):Xe.__webglFramebuffer===void 0?k.setupRenderTarget(w):Xe.__hasExternalTextures&&k.rebindTextures(w,ke.get(w.texture).__webglTexture,ke.get(w.depthTexture).__webglTexture);const Qe=w.texture;(Qe.isData3DTexture||Qe.isDataArrayTexture||Qe.isCompressedArrayTexture)&&(be=!0);const Ge=ke.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Ge[B])?G=Ge[B][z]:G=Ge[B],xe=!0):w.samples>0&&k.useMultisampledRTT(w)===!1?G=ke.get(w).__webglMultisampledFramebuffer:Array.isArray(Ge)?G=Ge[z]:G=Ge,v.copy(w.viewport),I.copy(w.scissor),O=w.scissorTest}else v.copy(P).multiplyScalar(j).floor(),I.copy(ce).multiplyScalar(j).floor(),O=Te;if(ye.bindFramebuffer(H.FRAMEBUFFER,G)&&$&&ye.drawBuffers(w,G),ye.viewport(v),ye.scissor(I),ye.setScissorTest(O),xe){const Xe=ke.get(w.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_CUBE_MAP_POSITIVE_X+B,Xe.__webglTexture,z)}else if(be){const Xe=ke.get(w.texture),Qe=B||0;H.framebufferTextureLayer(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,Xe.__webglTexture,z||0,Qe)}C=-1},this.readRenderTargetPixels=function(w,B,z,$,G,xe,be){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Pe=ke.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&be!==void 0&&(Pe=Pe[be]),Pe){ye.bindFramebuffer(H.FRAMEBUFFER,Pe);try{const Xe=w.texture,Qe=Xe.format,Ge=Xe.type;if(!Ue.textureFormatReadable(Qe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ue.textureTypeReadable(Ge)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=w.width-$&&z>=0&&z<=w.height-G&&H.readPixels(B,z,$,G,Re.convert(Qe),Re.convert(Ge),xe)}finally{const Xe=T!==null?ke.get(T).__webglFramebuffer:null;ye.bindFramebuffer(H.FRAMEBUFFER,Xe)}}},this.copyFramebufferToTexture=function(w,B,z=0){const $=Math.pow(2,-z),G=Math.floor(B.image.width*$),xe=Math.floor(B.image.height*$);k.setTexture2D(B,0),H.copyTexSubImage2D(H.TEXTURE_2D,z,0,0,w.x,w.y,G,xe),ye.unbindTexture()},this.copyTextureToTexture=function(w,B,z,$=0){const G=B.image.width,xe=B.image.height,be=Re.convert(z.format),Pe=Re.convert(z.type);k.setTexture2D(z,0),H.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,z.flipY),H.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),H.pixelStorei(H.UNPACK_ALIGNMENT,z.unpackAlignment),B.isDataTexture?H.texSubImage2D(H.TEXTURE_2D,$,w.x,w.y,G,xe,be,Pe,B.image.data):B.isCompressedTexture?H.compressedTexSubImage2D(H.TEXTURE_2D,$,w.x,w.y,B.mipmaps[0].width,B.mipmaps[0].height,be,B.mipmaps[0].data):H.texSubImage2D(H.TEXTURE_2D,$,w.x,w.y,be,Pe,B.image),$===0&&z.generateMipmaps&&H.generateMipmap(H.TEXTURE_2D),ye.unbindTexture()},this.copyTextureToTexture3D=function(w,B,z,$,G=0){const xe=w.max.x-w.min.x,be=w.max.y-w.min.y,Pe=w.max.z-w.min.z,Xe=Re.convert($.format),Qe=Re.convert($.type);let Ge;if($.isData3DTexture)k.setTexture3D($,0),Ge=H.TEXTURE_3D;else if($.isDataArrayTexture||$.isCompressedArrayTexture)k.setTexture2DArray($,0),Ge=H.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}H.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,$.flipY),H.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,$.premultiplyAlpha),H.pixelStorei(H.UNPACK_ALIGNMENT,$.unpackAlignment);const Ve=H.getParameter(H.UNPACK_ROW_LENGTH),xt=H.getParameter(H.UNPACK_IMAGE_HEIGHT),Ft=H.getParameter(H.UNPACK_SKIP_PIXELS),tn=H.getParameter(H.UNPACK_SKIP_ROWS),fn=H.getParameter(H.UNPACK_SKIP_IMAGES),st=z.isCompressedTexture?z.mipmaps[G]:z.image;H.pixelStorei(H.UNPACK_ROW_LENGTH,st.width),H.pixelStorei(H.UNPACK_IMAGE_HEIGHT,st.height),H.pixelStorei(H.UNPACK_SKIP_PIXELS,w.min.x),H.pixelStorei(H.UNPACK_SKIP_ROWS,w.min.y),H.pixelStorei(H.UNPACK_SKIP_IMAGES,w.min.z),z.isDataTexture||z.isData3DTexture?H.texSubImage3D(Ge,G,B.x,B.y,B.z,xe,be,Pe,Xe,Qe,st.data):$.isCompressedArrayTexture?H.compressedTexSubImage3D(Ge,G,B.x,B.y,B.z,xe,be,Pe,Xe,st.data):H.texSubImage3D(Ge,G,B.x,B.y,B.z,xe,be,Pe,Xe,Qe,st),H.pixelStorei(H.UNPACK_ROW_LENGTH,Ve),H.pixelStorei(H.UNPACK_IMAGE_HEIGHT,xt),H.pixelStorei(H.UNPACK_SKIP_PIXELS,Ft),H.pixelStorei(H.UNPACK_SKIP_ROWS,tn),H.pixelStorei(H.UNPACK_SKIP_IMAGES,fn),G===0&&$.generateMipmaps&&H.generateMipmap(Ge),ye.unbindTexture()},this.initTexture=function(w){w.isCubeTexture?k.setTextureCube(w,0):w.isData3DTexture?k.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?k.setTexture2DArray(w,0):k.setTexture2D(w,0),ye.unbindTexture()},this.resetState=function(){R=0,A=0,T=null,ye.reset(),qe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Zi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Nh?"display-p3":"srgb",t.unpackColorSpace=St.workingColorSpace===mc?"display-p3":"srgb"}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class PT extends Vn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new rr,this.environmentIntensity=1,this.environmentRotation=new rr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class zh extends Hr{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const s=[],o=[];a(i),u(n),h(),this.setAttribute("position",new Li(s,3)),this.setAttribute("normal",new Li(s.slice(),3)),this.setAttribute("uv",new Li(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(M){const x=new Z,E=new Z,R=new Z;for(let A=0;A<t.length;A+=3)c(t[A+0],x),c(t[A+1],E),c(t[A+2],R),l(x,E,R,M)}function l(M,x,E,R){const A=R+1,T=[];for(let C=0;C<=A;C++){T[C]=[];const S=M.clone().lerp(E,C/A),v=x.clone().lerp(E,C/A),I=A-C;for(let O=0;O<=I;O++)O===0&&C===A?T[C][O]=S:T[C][O]=S.clone().lerp(v,O/I)}for(let C=0;C<A;C++)for(let S=0;S<2*(A-C)-1;S++){const v=Math.floor(S/2);S%2===0?(d(T[C][v+1]),d(T[C+1][v]),d(T[C][v])):(d(T[C][v+1]),d(T[C+1][v+1]),d(T[C+1][v]))}}function u(M){const x=new Z;for(let E=0;E<s.length;E+=3)x.x=s[E+0],x.y=s[E+1],x.z=s[E+2],x.normalize().multiplyScalar(M),s[E+0]=x.x,s[E+1]=x.y,s[E+2]=x.z}function h(){const M=new Z;for(let x=0;x<s.length;x+=3){M.x=s[x+0],M.y=s[x+1],M.z=s[x+2];const E=p(M)/2/Math.PI+.5,R=m(M)/Math.PI+.5;o.push(E,1-R)}_(),f()}function f(){for(let M=0;M<o.length;M+=6){const x=o[M+0],E=o[M+2],R=o[M+4],A=Math.max(x,E,R),T=Math.min(x,E,R);A>.9&&T<.1&&(x<.2&&(o[M+0]+=1),E<.2&&(o[M+2]+=1),R<.2&&(o[M+4]+=1))}}function d(M){s.push(M.x,M.y,M.z)}function c(M,x){const E=M*3;x.x=e[E+0],x.y=e[E+1],x.z=e[E+2]}function _(){const M=new Z,x=new Z,E=new Z,R=new Z,A=new it,T=new it,C=new it;for(let S=0,v=0;S<s.length;S+=9,v+=6){M.set(s[S+0],s[S+1],s[S+2]),x.set(s[S+3],s[S+4],s[S+5]),E.set(s[S+6],s[S+7],s[S+8]),A.set(o[v+0],o[v+1]),T.set(o[v+2],o[v+3]),C.set(o[v+4],o[v+5]),R.copy(M).add(x).add(E).divideScalar(3);const I=p(R);g(A,v+0,M,I),g(T,v+2,x,I),g(C,v+4,E,I)}}function g(M,x,E,R){R<0&&M.x===1&&(o[x]=M.x-1),E.x===0&&E.z===0&&(o[x]=R/2/Math.PI+.5)}function p(M){return Math.atan2(M.z,-M.x)}function m(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zh(e.vertices,e.indices,e.radius,e.details)}}class kh extends zh{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new kh(e.radius,e.detail)}}const cp={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class LT{constructor(e,t,n){const i=this;let s=!1,o=0,a=0,l;const u=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){a++,s===!1&&i.onStart!==void 0&&i.onStart(h,o,a),s=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,f){return u.push(h,f),this},this.removeHandler=function(h){const f=u.indexOf(h);return f!==-1&&u.splice(f,2),this},this.getHandler=function(h){for(let f=0,d=u.length;f<d;f+=2){const c=u[f],_=u[f+1];if(c.global&&(c.lastIndex=0),c.test(h))return _}return null}}}const DT=new LT;class Hh{constructor(e){this.manager=e!==void 0?e:DT,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Hh.DEFAULT_MATERIAL_NAME="__DEFAULT";class IT extends Hh{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=cp.get(e);if(o!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o;const a=Fa("img");function l(){h(),cp.add(e,this),t&&t(this),s.manager.itemEnd(e)}function u(f){h(),i&&i(f),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",u,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",u,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(e),a.src=e,a}}class UT extends Hh{constructor(e){super(e)}load(e,t,n,i){const s=new Tn,o=new IT(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class NT{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=up(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=up();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function up(){return(typeof performance>"u"?Date:performance).now()}class Sa{constructor(e){this.value=e}clone(){return new Sa(this.value.clone===void 0?this.value:this.value.clone())}}class hp{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(ln(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Uh}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Uh);const fp={type:"change"},Mu={type:"start"},dp={type:"end"},Rl=new xg,pp=new _r,OT=Math.cos(70*xx.DEG2RAD);class FT extends Cs{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new Z,this.cursor=new Z,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Fs.ROTATE,MIDDLE:Fs.DOLLY,RIGHT:Fs.PAN},this.touches={ONE:Bs.ROTATE,TWO:Bs.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return a.phi},this.getAzimuthalAngle=function(){return a.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(y){y.addEventListener("keydown",ze),this._domElementKeyEvents=y},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",ze),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(fp),n.update(),s=i.NONE},this.update=function(){const y=new Z,N=new As().setFromUnitVectors(e.up,new Z(0,1,0)),q=N.clone().invert(),ie=new Z,de=new As,We=new Z,Ze=2*Math.PI;return function(U=null){const te=n.object.position;y.copy(te).sub(n.target),y.applyQuaternion(N),a.setFromVector3(y),n.autoRotate&&s===i.NONE&&O(v(U)),n.enableDamping?(a.theta+=l.theta*n.dampingFactor,a.phi+=l.phi*n.dampingFactor):(a.theta+=l.theta,a.phi+=l.phi);let F=n.minAzimuthAngle,W=n.maxAzimuthAngle;isFinite(F)&&isFinite(W)&&(F<-Math.PI?F+=Ze:F>Math.PI&&(F-=Ze),W<-Math.PI?W+=Ze:W>Math.PI&&(W-=Ze),F<=W?a.theta=Math.max(F,Math.min(W,a.theta)):a.theta=a.theta>(F+W)/2?Math.max(F,a.theta):Math.min(W,a.theta)),a.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,a.phi)),a.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(h,n.dampingFactor):n.target.add(h),n.target.sub(n.cursor),n.target.clampLength(n.minTargetRadius,n.maxTargetRadius),n.target.add(n.cursor);let oe=!1;if(n.zoomToCursor&&A||n.object.isOrthographicCamera)a.radius=P(a.radius);else{const Q=a.radius;a.radius=P(a.radius*u),oe=Q!=a.radius}if(y.setFromSpherical(a),y.applyQuaternion(q),te.copy(n.target).add(y),n.object.lookAt(n.target),n.enableDamping===!0?(l.theta*=1-n.dampingFactor,l.phi*=1-n.dampingFactor,h.multiplyScalar(1-n.dampingFactor)):(l.set(0,0,0),h.set(0,0,0)),n.zoomToCursor&&A){let Q=null;if(n.object.isPerspectiveCamera){const _e=y.length();Q=P(_e*u);const se=_e-Q;n.object.position.addScaledVector(E,se),n.object.updateMatrixWorld(),oe=!!se}else if(n.object.isOrthographicCamera){const _e=new Z(R.x,R.y,0);_e.unproject(n.object);const se=n.object.zoom;n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/u)),n.object.updateProjectionMatrix(),oe=se!==n.object.zoom;const Ee=new Z(R.x,R.y,0);Ee.unproject(n.object),n.object.position.sub(Ee).add(_e),n.object.updateMatrixWorld(),Q=y.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;Q!==null&&(this.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(Q).add(n.object.position):(Rl.origin.copy(n.object.position),Rl.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(Rl.direction))<OT?e.lookAt(n.target):(pp.setFromNormalAndCoplanarPoint(n.object.up,n.target),Rl.intersectPlane(pp,n.target))))}else if(n.object.isOrthographicCamera){const Q=n.object.zoom;n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/u)),Q!==n.object.zoom&&(n.object.updateProjectionMatrix(),oe=!0)}return u=1,A=!1,oe||ie.distanceToSquared(n.object.position)>o||8*(1-de.dot(n.object.quaternion))>o||We.distanceToSquared(n.target)>o?(n.dispatchEvent(fp),ie.copy(n.object.position),de.copy(n.object.quaternion),We.copy(n.target),!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",nt),n.domElement.removeEventListener("pointerdown",D),n.domElement.removeEventListener("pointercancel",J),n.domElement.removeEventListener("wheel",le),n.domElement.removeEventListener("pointermove",b),n.domElement.removeEventListener("pointerup",J),n.domElement.getRootNode().removeEventListener("keydown",me,{capture:!0}),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",ze),n._domElementKeyEvents=null)};const n=this,i={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let s=i.NONE;const o=1e-6,a=new hp,l=new hp;let u=1;const h=new Z,f=new it,d=new it,c=new it,_=new it,g=new it,p=new it,m=new it,M=new it,x=new it,E=new Z,R=new it;let A=!1;const T=[],C={};let S=!1;function v(y){return y!==null?2*Math.PI/60*n.autoRotateSpeed*y:2*Math.PI/60/60*n.autoRotateSpeed}function I(y){const N=Math.abs(y*.01);return Math.pow(.95,n.zoomSpeed*N)}function O(y){l.theta-=y}function L(y){l.phi-=y}const X=function(){const y=new Z;return function(q,ie){y.setFromMatrixColumn(ie,0),y.multiplyScalar(-q),h.add(y)}}(),K=function(){const y=new Z;return function(q,ie){n.screenSpacePanning===!0?y.setFromMatrixColumn(ie,1):(y.setFromMatrixColumn(ie,0),y.crossVectors(n.object.up,y)),y.multiplyScalar(q),h.add(y)}}(),ee=function(){const y=new Z;return function(q,ie){const de=n.domElement;if(n.object.isPerspectiveCamera){const We=n.object.position;y.copy(We).sub(n.target);let Ze=y.length();Ze*=Math.tan(n.object.fov/2*Math.PI/180),X(2*q*Ze/de.clientHeight,n.object.matrix),K(2*ie*Ze/de.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(X(q*(n.object.right-n.object.left)/n.object.zoom/de.clientWidth,n.object.matrix),K(ie*(n.object.top-n.object.bottom)/n.object.zoom/de.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function j(y){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?u/=y:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function V(y){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?u*=y:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function re(y,N){if(!n.zoomToCursor)return;A=!0;const q=n.domElement.getBoundingClientRect(),ie=y-q.left,de=N-q.top,We=q.width,Ze=q.height;R.x=ie/We*2-1,R.y=-(de/Ze)*2+1,E.set(R.x,R.y,1).unproject(n.object).sub(n.object.position).normalize()}function P(y){return Math.max(n.minDistance,Math.min(n.maxDistance,y))}function ce(y){f.set(y.clientX,y.clientY)}function Te(y){re(y.clientX,y.clientX),m.set(y.clientX,y.clientY)}function Fe(y){_.set(y.clientX,y.clientY)}function Y(y){d.set(y.clientX,y.clientY),c.subVectors(d,f).multiplyScalar(n.rotateSpeed);const N=n.domElement;O(2*Math.PI*c.x/N.clientHeight),L(2*Math.PI*c.y/N.clientHeight),f.copy(d),n.update()}function ue(y){M.set(y.clientX,y.clientY),x.subVectors(M,m),x.y>0?j(I(x.y)):x.y<0&&V(I(x.y)),m.copy(M),n.update()}function ve(y){g.set(y.clientX,y.clientY),p.subVectors(g,_).multiplyScalar(n.panSpeed),ee(p.x,p.y),_.copy(g),n.update()}function fe(y){re(y.clientX,y.clientY),y.deltaY<0?V(I(y.deltaY)):y.deltaY>0&&j(I(y.deltaY)),n.update()}function Le(y){let N=!1;switch(y.code){case n.keys.UP:y.ctrlKey||y.metaKey||y.shiftKey?L(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):ee(0,n.keyPanSpeed),N=!0;break;case n.keys.BOTTOM:y.ctrlKey||y.metaKey||y.shiftKey?L(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):ee(0,-n.keyPanSpeed),N=!0;break;case n.keys.LEFT:y.ctrlKey||y.metaKey||y.shiftKey?O(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):ee(n.keyPanSpeed,0),N=!0;break;case n.keys.RIGHT:y.ctrlKey||y.metaKey||y.shiftKey?O(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):ee(-n.keyPanSpeed,0),N=!0;break}N&&(y.preventDefault(),n.update())}function Be(y){if(T.length===1)f.set(y.pageX,y.pageY);else{const N=rt(y),q=.5*(y.pageX+N.x),ie=.5*(y.pageY+N.y);f.set(q,ie)}}function H(y){if(T.length===1)_.set(y.pageX,y.pageY);else{const N=rt(y),q=.5*(y.pageX+N.x),ie=.5*(y.pageY+N.y);_.set(q,ie)}}function Ye(y){const N=rt(y),q=y.pageX-N.x,ie=y.pageY-N.y,de=Math.sqrt(q*q+ie*ie);m.set(0,de)}function De(y){n.enableZoom&&Ye(y),n.enablePan&&H(y)}function Ue(y){n.enableZoom&&Ye(y),n.enableRotate&&Be(y)}function ye(y){if(T.length==1)d.set(y.pageX,y.pageY);else{const q=rt(y),ie=.5*(y.pageX+q.x),de=.5*(y.pageY+q.y);d.set(ie,de)}c.subVectors(d,f).multiplyScalar(n.rotateSpeed);const N=n.domElement;O(2*Math.PI*c.x/N.clientHeight),L(2*Math.PI*c.y/N.clientHeight),f.copy(d)}function Me(y){if(T.length===1)g.set(y.pageX,y.pageY);else{const N=rt(y),q=.5*(y.pageX+N.x),ie=.5*(y.pageY+N.y);g.set(q,ie)}p.subVectors(g,_).multiplyScalar(n.panSpeed),ee(p.x,p.y),_.copy(g)}function ke(y){const N=rt(y),q=y.pageX-N.x,ie=y.pageY-N.y,de=Math.sqrt(q*q+ie*ie);M.set(0,de),x.set(0,Math.pow(M.y/m.y,n.zoomSpeed)),j(x.y),m.copy(M);const We=(y.pageX+N.x)*.5,Ze=(y.pageY+N.y)*.5;re(We,Ze)}function k(y){n.enableZoom&&ke(y),n.enablePan&&Me(y)}function Ke(y){n.enableZoom&&ke(y),n.enableRotate&&ye(y)}function D(y){n.enabled!==!1&&(T.length===0&&(n.domElement.setPointerCapture(y.pointerId),n.domElement.addEventListener("pointermove",b),n.domElement.addEventListener("pointerup",J)),!qe(y)&&(Ce(y),y.pointerType==="touch"?pe(y):ne(y)))}function b(y){n.enabled!==!1&&(y.pointerType==="touch"?Ie(y):ae(y))}function J(y){switch(Re(y),T.length){case 0:n.domElement.releasePointerCapture(y.pointerId),n.domElement.removeEventListener("pointermove",b),n.domElement.removeEventListener("pointerup",J),n.dispatchEvent(dp),s=i.NONE;break;case 1:const N=T[0],q=C[N];pe({pointerId:N,pageX:q.x,pageY:q.y});break}}function ne(y){let N;switch(y.button){case 0:N=n.mouseButtons.LEFT;break;case 1:N=n.mouseButtons.MIDDLE;break;case 2:N=n.mouseButtons.RIGHT;break;default:N=-1}switch(N){case Fs.DOLLY:if(n.enableZoom===!1)return;Te(y),s=i.DOLLY;break;case Fs.ROTATE:if(y.ctrlKey||y.metaKey||y.shiftKey){if(n.enablePan===!1)return;Fe(y),s=i.PAN}else{if(n.enableRotate===!1)return;ce(y),s=i.ROTATE}break;case Fs.PAN:if(y.ctrlKey||y.metaKey||y.shiftKey){if(n.enableRotate===!1)return;ce(y),s=i.ROTATE}else{if(n.enablePan===!1)return;Fe(y),s=i.PAN}break;default:s=i.NONE}s!==i.NONE&&n.dispatchEvent(Mu)}function ae(y){switch(s){case i.ROTATE:if(n.enableRotate===!1)return;Y(y);break;case i.DOLLY:if(n.enableZoom===!1)return;ue(y);break;case i.PAN:if(n.enablePan===!1)return;ve(y);break}}function le(y){n.enabled===!1||n.enableZoom===!1||s!==i.NONE||(y.preventDefault(),n.dispatchEvent(Mu),fe(we(y)),n.dispatchEvent(dp))}function we(y){const N=y.deltaMode,q={clientX:y.clientX,clientY:y.clientY,deltaY:y.deltaY};switch(N){case 1:q.deltaY*=16;break;case 2:q.deltaY*=100;break}return y.ctrlKey&&!S&&(q.deltaY*=10),q}function me(y){y.key==="Control"&&(S=!0,n.domElement.getRootNode().addEventListener("keyup",he,{passive:!0,capture:!0}))}function he(y){y.key==="Control"&&(S=!1,n.domElement.getRootNode().removeEventListener("keyup",he,{passive:!0,capture:!0}))}function ze(y){n.enabled===!1||n.enablePan===!1||Le(y)}function pe(y){switch(je(y),T.length){case 1:switch(n.touches.ONE){case Bs.ROTATE:if(n.enableRotate===!1)return;Be(y),s=i.TOUCH_ROTATE;break;case Bs.PAN:if(n.enablePan===!1)return;H(y),s=i.TOUCH_PAN;break;default:s=i.NONE}break;case 2:switch(n.touches.TWO){case Bs.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;De(y),s=i.TOUCH_DOLLY_PAN;break;case Bs.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;Ue(y),s=i.TOUCH_DOLLY_ROTATE;break;default:s=i.NONE}break;default:s=i.NONE}s!==i.NONE&&n.dispatchEvent(Mu)}function Ie(y){switch(je(y),s){case i.TOUCH_ROTATE:if(n.enableRotate===!1)return;ye(y),n.update();break;case i.TOUCH_PAN:if(n.enablePan===!1)return;Me(y),n.update();break;case i.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;k(y),n.update();break;case i.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;Ke(y),n.update();break;default:s=i.NONE}}function nt(y){n.enabled!==!1&&y.preventDefault()}function Ce(y){T.push(y.pointerId)}function Re(y){delete C[y.pointerId];for(let N=0;N<T.length;N++)if(T[N]==y.pointerId){T.splice(N,1);return}}function qe(y){for(let N=0;N<T.length;N++)if(T[N]==y.pointerId)return!0;return!1}function je(y){let N=C[y.pointerId];N===void 0&&(N=new it,C[y.pointerId]=N),N.set(y.pageX,y.pageY)}function rt(y){const N=y.pointerId===T[0]?T[1]:T[0];return C[N]}n.domElement.addEventListener("contextmenu",nt),n.domElement.addEventListener("pointerdown",D),n.domElement.addEventListener("pointercancel",J),n.domElement.addEventListener("wheel",le,{passive:!1}),n.domElement.getRootNode().addEventListener("keydown",me,{passive:!0,capture:!0}),this.update()}}var BT=`varying vec2 vUv;

void main()\r
{\r
    vec4 modelPosition = modelMatrix * vec4(position,1.0);\r
    vec4 viewPosition = viewMatrix * modelPosition;\r
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;

    vUv = uv;\r
}`,zT=`uniform sampler2D uTextures;\r
uniform sampler2D uPrevTextures;\r
uniform float uAlpha;

varying vec2 vUv;

void main()\r
{\r
    
    vec4 prevTexture = texture(uPrevTextures,vUv);\r
    vec4 newTexture = texture(uTextures,vUv);

    
    vec4 mixed = mix(prevTexture,newTexture,uAlpha);\r
    \r
    gl_FragColor = mixed;\r
}`;et.registerPlugin(ot,zr);const fi=r=>{const e=document.querySelector(r);let t="";e.textContent.trim().split("").forEach(n=>{t+=`<div class="inline-block">${n}</div>`}),e.innerHTML=t};et.registerPlugin(ot);const Vh=new PT,Og=new ia;Vh.add(Og);const Fg=document.querySelector(".webgl"),Gh=new UT,vt=Gh.load("textures/heathy.jpg"),kT=["textures/Heat/2024.png","textures/Heat/2030.png","textures/Heat/2040.png","textures/Heat/2050.png","textures/Heat/2060.png","textures/Heat/2070.png","textures/Heat/2080.png","textures/Heat/2090.png","textures/Heat/2100.png"],mi=kT.map(r=>{const e=Gh.load(r);return e.colorSpace=Kn,e.anisotropy=8,e}),HT=["textures/CO2/2024.png","textures/CO2/2030.png","textures/CO2/2040.png","textures/CO2/2050.png","textures/CO2/2060.png","textures/CO2/2070.png","textures/CO2/2080.png","textures/CO2/2090.png","textures/CO2/2100.png"],Ji=HT.map(r=>{const e=Gh.load(r);return e.colorSpace=Kn,e.anisotropy=8,e}),VT=new kh(1.6,32),ge=new sr({vertexShader:BT,fragmentShader:zT,uniforms:{uTextures:new Sa(mi[0]),uPrevTextures:new Sa(mi[0]),uAlpha:new Sa(1)}}),Ps=new Ai(VT,ge);Ps.scale.set(.8,.8,.8);Ps.position.x=0;Og.add(Ps);Ps.rotation.z=.4;const ac=document.querySelector(".globe-model"),Qn={};Qn.width=ac.offsetWidth;Qn.height=ac.offsetHeight;const Io=new Jn(75,Qn.width/Qn.height,.1,100);Io.position.z=4.5;Vh.add(Io);window.addEventListener("resize",()=>{Qn.width=ac.offsetWidth,Qn.height=ac.offsetHeight,Io.aspect=Qn.width/Qn.height,Io.updateProjectionMatrix(),Ba.setPixelRatio(Math.min(2,window.devicePixelRatio)),Ba.setSize(Qn.width,Qn.height)});const Ba=new CT({canvas:Fg,alpha:!0,antialias:!0});Ba.setPixelRatio(Math.min(2,window.devicePixelRatio));Ba.setSize(Qn.width,Qn.height);const Ls=new FT(Io,Fg);Ls.enableZoom=!1;Ls.enablePan=!1;Ls.enableDamping=!0;Ls.minPolarAngle=.4*Math.PI;Ls.maxPolarAngle=.4*Math.PI;Ls.dampingFactor=.05;const GT=new NT,Bg=()=>{const r=GT.getElapsedTime();Ps.rotation.y=r*.4,Ba.render(Vh,Io),Ls.update(),requestAnimationFrame(Bg)};Bg();const zg=et.timeline({scrollTrigger:{trigger:".page2",scroller:"body",start:"top 0",end:"top -50%",scrub:1}});zg.from(Ps.position,{x:2},"g");zg.from(Ps.scale,{x:0,y:0,z:0},"g");let Qi="heat",us=0,wr=0;const WT=()=>{document.querySelector(".heat").addEventListener("click",()=>{console.log(wr,us),et.from(ge.uniforms.uAlpha,{value:0,duration:1}),ge.uniforms.uPrevTextures.value=mi[wr],ge.uniforms.uTextures.value=mi[us];const i=et.timeline();i.to(".switch-co2-bar",{width:"0"}),i.to(".switch-heat-bar",{width:"100%"}),Qi="heat"}),document.querySelector(".co2").addEventListener("click",()=>{console.log(wr,us),et.from(ge.uniforms.uAlpha,{value:0,duration:1}),ge.uniforms.uPrevTextures.value=Ji[wr],ge.uniforms.uTextures.value=Ji[us];const i=et.timeline();i.to(".switch-heat-bar",{width:"0%"}),i.to(".switch-co2-bar",{width:"100%"}),Qi="co2"}),document.querySelector(".heat2").addEventListener("click",()=>{ge.uniforms.uTextures.value=mi[ht],ht===0?(ge.uniforms.uTextures.value=mi[0],ge.uniforms.uAlpha.value=1):ht===1?(ge.uniforms.uTextures.value=vt,ge.uniforms.uAlpha.value=.3):ht===2?(ge.uniforms.uTextures.value=vt,ge.uniforms.uAlpha.value=.4):ht===3?(ge.uniforms.uTextures.value=vt,ge.uniforms.uAlpha.value=.5):ht===4?(ge.uniforms.uTextures.value=vt,ge.uniforms.uAlpha.value=.6):ht===5?(ge.uniforms.uTextures.value=vt,ge.uniforms.uAlpha.value=.7):ht===6?(ge.uniforms.uTextures.value=vt,ge.uniforms.uAlpha.value=.8):ht===7?(ge.uniforms.uTextures.value=vt,ge.uniforms.uAlpha.value=.9):ht===8&&(ge.uniforms.uTextures.value=vt,ge.uniforms.uAlpha.value=1);const i=et.timeline();i.to(".switch-co2-bar2",{width:"0"}),i.to(".switch-heat-bar2",{width:"100%"}),Qi="heat"}),document.querySelector(".co22").addEventListener("click",()=>{ge.uniforms.uTextures.value=Ji[ht],ht===0?(ge.uniforms.uTextures.value=Ji[0],ge.uniforms.uAlpha.value=1):ht===1?(ge.uniforms.uTextures.value=vt,ge.uniforms.uAlpha.value=.3):ht===2?(ge.uniforms.uTextures.value=vt,ge.uniforms.uAlpha.value=.4):ht===3?(ge.uniforms.uTextures.value=vt,ge.uniforms.uAlpha.value=.5):ht===4?(ge.uniforms.uTextures.value=vt,ge.uniforms.uAlpha.value=.6):ht===5?(ge.uniforms.uTextures.value=vt,ge.uniforms.uAlpha.value=.7):ht===6?(ge.uniforms.uTextures.value=vt,ge.uniforms.uAlpha.value=.8):ht===7?(ge.uniforms.uTextures.value=vt,ge.uniforms.uAlpha.value=.9):ht===8&&(ge.uniforms.uTextures.value=vt,ge.uniforms.uAlpha.value=1);const i=et.timeline();i.to(".switch-heat-bar2",{width:"0%"}),i.to(".switch-co2-bar2",{width:"100%"}),Qi="co2"})};WT();const XT=()=>{function r(e,t,n){var i=e.getBoundingClientRect(),s=i.left,o=0,a=window.innerWidth,l=(s-o)/(a-o)*(n-t)+t;return l=Math.round(l),l}zr.create(".main-circle",{type:"x",bounds:".bound",onDrag:()=>{const e=document.querySelector(".main-circle");console.log(e.style.transform);var t=r(e,-2,24);Qi==="heat"?(et.from(ge.uniforms.uAlpha,{value:0,duration:1}),ge.uniforms.uPrevTextures.value=mi[Math.abs(t)],ge.uniforms.uTextures.value=mi[Math.abs(t-1)]):Qi==="co2"&&(et.from(ge.uniforms.uAlpha,{value:0,duration:1}),ge.uniforms.uPrevTextures.value=Ji[Math.abs(t)],ge.uniforms.uTextures.value=Ji[Math.abs(t-1)]),wr=Math.abs(t-1),us=Math.abs(t)}})};XT();const zi=()=>{const r=et.timeline();r.to(".main-circle",{scale:.3,ease:"linear",duration:.5}),r.to(".main-circle",{scale:1,ease:"linear",duration:.5},"same"),r.from(".inner-circle",{height:"300%",width:"300%",opacity:1,ease:"power3.out",duration:.5},"same"),r.to(".main-circle",{scale:.3,ease:"linear",duration:.5}),r.to(".main-circle",{scale:1,ease:"linear",duration:.5}),r.from(".inner-circle",{height:"300%",width:"300%",opacity:1,ease:"power3.out",duration:.5},"same"),r.to(".main-circle",{scale:.3,ease:"linear",duration:.5}),r.to(".main-circle",{scale:1,ease:"linear",duration:.5}),r.from(".inner-circle",{height:"300%",width:"300%",opacity:1,ease:"power3.out",duration:.5},"same"),r.to(".inner-circle",{opacity:0})},ki=()=>{const r=et.timeline();r.to(".main-circle",{scale:.3,ease:"linear",duration:.5}),r.to(".main-circle",{scale:1,ease:"linear",duration:.5},"same"),r.to(".main-circle",{scale:.3,ease:"linear",duration:.5}),r.to(".main-circle",{scale:1,ease:"linear",duration:.5}),r.to(".main-circle",{scale:.3,ease:"linear",duration:.5}),r.to(".main-circle",{scale:1,ease:"linear",duration:.5}),r.to(".inner-circle",{opacity:0})},YT=()=>{document.querySelectorAll(".years > div").forEach((e,t)=>{e.addEventListener("click",()=>{wr=us,t===0?et.to(".main-circle",{transform:"translate3d(1px, 0px, 0px)",onComplete:()=>{t===0||t===8?ki():zi()}}):t===1?et.to(".main-circle",{transform:"translate3d(78px, 0px, 0px)",onComplete:()=>{t===0||t===8?ki():zi()}}):t===2?et.to(".main-circle",{transform:"translate3d(154px, 0px, 0px)",onComplete:()=>{t===0||t===8?ki():zi()}}):t===3?et.to(".main-circle",{transform:"translate3d(230px, 0px, 0px)",onComplete:()=>{t===0||t===8?ki():zi()}}):t===4?et.to(".main-circle",{transform:"translate3d(308px, 0px, 0px)",onComplete:()=>{t===0||t===8?ki():zi()}}):t===5?et.to(".main-circle",{transform:"translate3d(385px, 0px, 0px)",onComplete:()=>{t===0||t===8?ki():zi()}}):t===6?et.to(".main-circle",{transform:"translate3d(461px, 0px, 0px)",onComplete:()=>{t===0||t===8?ki():zi()}}):t===7?et.to(".main-circle",{transform:"translate3d(538px, 0px, 0px)",onComplete:()=>{t===0||t===8?ki():zi()}}):t===8&&et.to(".main-circle",{transform:"translate3d(615px, 0px, 0px)",onComplete:()=>{t===0||t===8?ki():zi()}}),Qi==="heat"&&(et.from(ge.uniforms.uAlpha,{value:0,duration:1.5}),ge.uniforms.uPrevTextures.value=mi[wr],ge.uniforms.uTextures.value=mi[t]),Qi==="co2"&&(et.from(ge.uniforms.uAlpha,{value:0,duration:1.5}),ge.uniforms.uPrevTextures.value=Ji[wr],ge.uniforms.uTextures.value=Ji[t]),us=t})})};YT();let ht=0;const qT=()=>{const r=document.querySelector(".page3 canvas"),e=r.getContext("2d"),t=document.querySelector(".page3-right").getBoundingClientRect(),n=window.matchMedia("(max-width: 768px)");function i(_){_.matches?console.log("Viewport is 768px or less"):console.log("Viewport is wider than 768px")}n.matches?(r.width=t.width+750,r.height=t.height+100):(r.width=t.width+350,r.height=t.height+100),n.addEventListener("change",i),window.addEventListener("resize",function(){r.width=t.width+350,r.height=t.height+100,d()});let s="";const o=320;for(let _=0;_<o;_++)s+=`temp/frame${_}.png
    `;function a(_){var g=s;return g.split(`
`)[_]}const l=[],u={frame:1};for(let _=0;_<o;_++){const g=new Image;g.src=a(_),l.push(g)}et.to(u,{frame:o-1,snap:"frame",ease:"none",scrollTrigger:{scrub:.15,trigger:".page3 canvas",start:"top top",end:"top -250%",scroller:"body"},onUpdate:d}),et.to(".page3-line",{width:"0%",scrollTrigger:{scrub:.15,trigger:".page3 canvas",start:"top top",end:"top -250%",scroller:"body"}}),l[1].onload=d,fi(".page3-right-point1>h3"),fi(".page3-right-point2>.para2-text>.f"),fi(".page3-right-point2>.para2-text>.s"),fi(".page3-right-point2>.para2-text>.j"),fi(".page3-right-para1>h3");const h=et.timeline({scrollTrigger:{scrub:.15,trigger:".page3 canvas",start:"top -30%",end:"top -50%",scroller:"body"}});h.from(".page3-right-para1>h3>div",{opacity:0,stagger:{amount:.8,from:"x"}}),h.to(".page3-line-point1",{scale:1}),h.to(".page3-right-point1>h3>div",{opacity:1,scale:1,stagger:{amount:.5}});const f=et.timeline({scrollTrigger:{scrub:.15,trigger:".page3 canvas",start:"top -170%",end:"top -200%",scroller:"body"}});f.to(".page3-line-point2",{scale:1}),f.to(".page3-right-point2>.para2-text>.f>div",{opacity:1,scale:1,stagger:{amount:.5}},"k"),f.to(".page3-right-point2>.para2-text>.s>div",{opacity:1,scale:1,stagger:{amount:.5}},"k"),f.to(".page3-right-point2>.para2-text>.j>div",{opacity:1,scale:1,stagger:{amount:.5}},"k");function d(){c(l[u.frame],e),Qi==="heat"?u.frame<36?(ht=0,ge.uniforms.uTextures.value=mi[0],ge.uniforms.uAlpha.value=1):u.frame<72?(ht=1,ge.uniforms.uTextures.value=vt,ge.uniforms.uAlpha.value=.3):u.frame<108?(ht=2,ge.uniforms.uTextures.value=vt,ge.uniforms.uAlpha.value=.4):u.frame<144?(ht=3,ge.uniforms.uTextures.value=vt,ge.uniforms.uAlpha.value=.5):u.frame<180?(ht=4,ge.uniforms.uTextures.value=vt,ge.uniforms.uAlpha.value=.6):u.frame<216?(ht=5,ge.uniforms.uTextures.value=vt,ge.uniforms.uAlpha.value=.7):u.frame<252?(ht=6,ge.uniforms.uTextures.value=vt,ge.uniforms.uAlpha.value=.8):u.frame<288?(ht=7,ge.uniforms.uTextures.value=vt,ge.uniforms.uAlpha.value=.9):(ht=8,ge.uniforms.uTextures.value=vt,ge.uniforms.uAlpha.value=1):u.frame<36?(ht=0,ge.uniforms.uTextures.value=Ji[0],ge.uniforms.uAlpha.value=1):u.frame<72?(ht=1,ge.uniforms.uTextures.value=vt,ge.uniforms.uAlpha.value=.3):u.frame<108?(ht=2,ge.uniforms.uTextures.value=vt,ge.uniforms.uAlpha.value=.4):u.frame<144?(ht=3,ge.uniforms.uTextures.value=vt,ge.uniforms.uAlpha.value=.5):u.frame<180?(ht=4,ge.uniforms.uTextures.value=vt,ge.uniforms.uAlpha.value=.6):u.frame<216?(ht=5,ge.uniforms.uTextures.value=vt,ge.uniforms.uAlpha.value=.7):u.frame<252?(ht=6,ge.uniforms.uTextures.value=vt,ge.uniforms.uAlpha.value=.8):u.frame<288?(ht=7,ge.uniforms.uTextures.value=vt,ge.uniforms.uAlpha.value=.9):(ht=8,ge.uniforms.uTextures.value=vt,ge.uniforms.uAlpha.value=1)}function c(_,g){var p=g.canvas,m=p.width/_.width,M=p.height/_.height,x=Math.max(m,M),E=(p.width-_.width*x)/2,R=(p.height-_.height*x)/2;g.clearRect(0,0,p.width,p.height),g.drawImage(_,0,0,_.width,_.height,E,R,_.width*x,_.height*x)}ot.create({trigger:".page3",pin:!0,scroller:"body",start:"top top",end:"top -250%"})};qT();const $T=()=>{fi(".page3-left-headline>h1"),fi(".page3-left-headline>.p3-text2");const r=et.timeline();et.from(".page3-left-headline>h1>div",{opacity:0,y:15,stagger:{amount:1},scrollTrigger:{scroller:"body",trigger:".page3",start:"top 0%",end:"top -30%",scrub:1}}),et.from(".page3-left-headline>.p3-text2>div",{opacity:0,y:15,stagger:{amount:1},scrollTrigger:{scroller:"body",trigger:".page3",start:"top 0%",end:"top -20%",scrub:1}}),fi(".heat2"),fi(".co22"),r.from(".switch2>.heat2-switch>h1>div,.switch2>h1:nth-child(2),.co22>div,.switch-co22 small",{opacity:0,y:15,stagger:{amount:.5},scrollTrigger:{scroller:"body",trigger:".page3",start:"top 0%",end:"top -30%",scrub:1}}),r.from(".switch-heat-bar2",{width:"0",scrollTrigger:{scroller:"body",trigger:".page3",start:"top 0%",end:"top -30%",scrub:1}}),r.to(".globe-model",{top:"5%",zIndex:101,scrollTrigger:{scroller:"body",trigger:".page3",start:"top 100%",end:"top 0%",scrub:1}}),fi(".page3-right-para1>h3"),fi(".page3-right-end>h3"),et.from(".page3-right-para1>h3>div,.page3-right-end>h3>div",{opacity:0,y:15,stagger:{amount:1},scrollTrigger:{scroller:"body",trigger:".page3",start:"top 0%",end:"top -30%",scrub:1}}),et.from(".page3-line",{scale:0,scrollTrigger:{scroller:"body",trigger:".page3",start:"top 0%",end:"top -30%",scrub:1}})};$T();
//# sourceMappingURL=index-CIvTjdEJ.js.map
