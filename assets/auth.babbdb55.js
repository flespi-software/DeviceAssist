import{r as L,v as O,o as h,k as H,n as b,t as P,S as k,h as W,g as C,u as y,U as M,V as Q,W as N,X as R}from"./index.a61d42eb.js";import{g as V,c as S}from"./QBtn.e35bdd87.js";function D(){const e=L(!O.value);return e.value===!1&&h(()=>{e.value=!0}),{isHydrated:e}}const $=typeof ResizeObserver!="undefined",T=$===!0?{}:{style:"display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",url:"about:blank"};var _=H({name:"QResizeObserver",props:{debounce:{type:[String,Number],default:100}},emits:["resize"],setup(e,{emit:o}){let t=null,n,s={width:-1,height:-1};function l(i){i===!0||e.debounce===0||e.debounce==="0"?r():t===null&&(t=setTimeout(r,e.debounce))}function r(){if(t!==null&&(clearTimeout(t),t=null),n){const{offsetWidth:i,offsetHeight:c}=n;(i!==s.width||c!==s.height)&&(s={width:i,height:c},o("resize",s))}}const{proxy:d}=C();if(d.trigger=l,$===!0){let i;const c=a=>{n=d.$el.parentNode,n?(i=new ResizeObserver(l),i.observe(n),r()):a!==!0&&k(()=>{c(!0)})};return h(()=>{c()}),b(()=>{t!==null&&clearTimeout(t),i!==void 0&&(i.disconnect!==void 0?i.disconnect():n&&i.unobserve(n))}),P}else{let a=function(){t!==null&&(clearTimeout(t),t=null),c!==void 0&&(c.removeEventListener!==void 0&&c.removeEventListener("resize",l,y.passive),c=void 0)},v=function(){a(),n&&n.contentDocument&&(c=n.contentDocument.defaultView,c.addEventListener("resize",l,y.passive),r())};const{isHydrated:i}=D();let c;return h(()=>{k(()=>{n=d.$el,n&&v()})}),b(a),()=>{if(i.value===!0)return W("object",{class:"q--avoid-card-border",style:T.style,tabindex:-1,type:"text/html",data:T.url,"aria-hidden":"true",onLoad:v})}}}});const G=[Element,String],X=[null,document,document.body,document.scrollingElement,document.documentElement];function F(e,o){let t=V(o);if(t===void 0){if(e==null)return window;t=e.closest(".scroll,.scroll-y,.overflow-auto")}return X.includes(t)?window:t}function I(e){return(e===window?document.body:e).scrollHeight}function Y(e){return(e===window?document.body:e).scrollWidth}function E(e){return e===window?window.pageYOffset||window.scrollY||document.body.scrollTop||0:e.scrollTop}function z(e){return e===window?window.pageXOffset||window.scrollX||document.body.scrollLeft||0:e.scrollLeft}function w(e,o,t=0){const n=arguments[3]===void 0?performance.now():arguments[3],s=E(e);if(t<=0){s!==o&&g(e,o);return}requestAnimationFrame(l=>{const r=l-n,d=s+(o-s)/Math.max(r,t)*r;g(e,d),d!==o&&w(e,o,t-r,l)})}function p(e,o,t=0){const n=arguments[3]===void 0?performance.now():arguments[3],s=z(e);if(t<=0){s!==o&&m(e,o);return}requestAnimationFrame(l=>{const r=l-n,d=s+(o-s)/Math.max(r,t)*r;m(e,d),d!==o&&p(e,o,t-r,l)})}function g(e,o){if(e===window){window.scrollTo(window.pageXOffset||window.scrollX||document.body.scrollLeft||0,o);return}e.scrollTop=o}function m(e,o){if(e===window){window.scrollTo(o,window.pageYOffset||window.scrollY||document.body.scrollTop||0);return}e.scrollLeft=o}function j(e,o,t){if(t){w(e,o,t);return}g(e,o)}function q(e,o,t){if(t){p(e,o,t);return}m(e,o)}let u;function A(){if(u!==void 0)return u;const e=document.createElement("p"),o=document.createElement("div");S(e,{width:"100%",height:"200px"}),S(o,{position:"absolute",top:"0px",left:"0px",visibility:"hidden",width:"200px",height:"150px",overflow:"hidden"}),o.appendChild(e),document.body.appendChild(o);const t=e.offsetWidth;o.style.overflow="scroll";let n=e.offsetWidth;return t===n&&(n=o.clientWidth),o.remove(),u=t-n,u}function B(e,o=!0){return!e||e.nodeType!==Node.ELEMENT_NODE?!1:o?e.scrollHeight>e.clientHeight&&(e.classList.contains("scroll")||e.classList.contains("overflow-auto")||["auto","scroll"].includes(window.getComputedStyle(e)["overflow-y"])):e.scrollWidth>e.clientWidth&&(e.classList.contains("scroll")||e.classList.contains("overflow-auto")||["auto","scroll"].includes(window.getComputedStyle(e)["overflow-x"]))}var K={getScrollTarget:F,getScrollHeight:I,getScrollWidth:Y,getVerticalScrollPosition:E,getHorizontalScrollPosition:z,animVerticalScrollTo:w,animHorizontalScrollTo:p,setVerticalScrollPosition:j,setHorizontalScrollPosition:q,getScrollbarWidth:A,hasScrollbar:B};const x=M.has.webStorage===!1?Q():N("session"),f={install({$q:e}){e.sessionStorage=x}};Object.assign(f,x);const Z=()=>{const o=R("auth",{state:()=>({token:"",info:null,blocked:!1,region:null,connected:!1}),getters:{},actions:{setBlocked(n){this.blocked=n},setTokenInfo(n){this.info=n},loginRedirect(){},restorePath(){},init(){console.log(this),this.region=this.$region},setToken(n){this.region=this.$region,this.$connector.socket.off("error"),this.$connector.socket.on("error",s=>{s&&(s.code===2||s.code===135||s.code===134)&&(this.blocked=!1),s&&(s.code===138||s.code===151)&&(this.blocked=!0),this.connected=!1}),this.$connector.socket.off("close"),this.$connector.socket.on("close",s=>{console.log("Close MQTT"),this.connected=!1}),this.$connector.socket.off("disconnect"),this.$connector.socket.on("disconnect",s=>{console.log("Disconnect MQTT"),this.connected=!1}),this.$connector.socket.off("end"),this.$connector.socket.on("end",s=>{console.log("End MQTT"),this.connected=!1}),this.$connector.socket.off("connect"),this.$connector.socket.on("connect",s=>{console.log("Connected MQTT"),this.info=JSON.parse(s.properties.userProperties.token),this.blocked=!1,this.connected=!0}),n.length===0?(console.log("Logout setToken"),f.remove("token"),this.token="",this.$connector.socket.end()):(n.indexOf("FlespiToken")>=0?(this.$connector.token=n,this.token=n):(this.$connector.token=`FlespiToken ${n}`,this.token=n),f.set("token",this.token),console.log(this.$connector.auth.getInfo().then(s=>{console.log(s)})))}}})(),t=f.getItem("token");return t&&!o.token&&o.setToken(t),o};export{_ as Q,E as a,z as b,A as c,K as d,F as g,B as h,G as s,Z as u};
