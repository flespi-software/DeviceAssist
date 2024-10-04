import{r as T,v as H,o as f,k as O,n as g,t as P,Y as b,h as W,g as C,u as y}from"./index.cbc58bbc.js";import{g as N,c as S}from"./QBtn.1592474c.js";function R(){const e=T(!H.value);return e.value===!1&&f(()=>{e.value=!0}),{isHydrated:e}}const E=typeof ResizeObserver<"u",z=E===!0?{}:{style:"display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",url:"about:blank"};var F=O({name:"QResizeObserver",props:{debounce:{type:[String,Number],default:100}},emits:["resize"],setup(e,{emit:t}){let o=null,n,r={width:-1,height:-1};function c(i){i===!0||e.debounce===0||e.debounce==="0"?s():o===null&&(o=setTimeout(s,e.debounce))}function s(){if(o!==null&&(clearTimeout(o),o=null),n){const{offsetWidth:i,offsetHeight:l}=n;(i!==r.width||l!==r.height)&&(r={width:i,height:l},t("resize",r))}}const{proxy:u}=C();if(u.trigger=c,E===!0){let i;const l=d=>{n=u.$el.parentNode,n?(i=new ResizeObserver(c),i.observe(n),s()):d!==!0&&b(()=>{l(!0)})};return f(()=>{l()}),g(()=>{o!==null&&clearTimeout(o),i!==void 0&&(i.disconnect!==void 0?i.disconnect():n&&i.unobserve(n))}),P}else{let d=function(){o!==null&&(clearTimeout(o),o=null),l!==void 0&&(l.removeEventListener!==void 0&&l.removeEventListener("resize",c,y.passive),l=void 0)},h=function(){d(),n&&n.contentDocument&&(l=n.contentDocument.defaultView,l.addEventListener("resize",c,y.passive),s())};const{isHydrated:i}=R();let l;return f(()=>{b(()=>{n=u.$el,n&&h()})}),g(d),()=>{if(i.value===!0)return W("object",{class:"q--avoid-card-border",style:z.style,tabindex:-1,type:"text/html",data:z.url,"aria-hidden":"true",onLoad:h})}}}});const $=[Element,String],V=[null,document,document.body,document.scrollingElement,document.documentElement];function Y(e,t){let o=N(t);if(o===void 0){if(e==null)return window;o=e.closest(".scroll,.scroll-y,.overflow-auto")}return V.includes(o)?window:o}function k(e){return(e===window?document.body:e).scrollHeight}function D(e){return(e===window?document.body:e).scrollWidth}function x(e){return e===window?window.pageYOffset||window.scrollY||document.body.scrollTop||0:e.scrollTop}function L(e){return e===window?window.pageXOffset||window.scrollX||document.body.scrollLeft||0:e.scrollLeft}function p(e,t,o=0){const n=arguments[3]===void 0?performance.now():arguments[3],r=x(e);if(o<=0){r!==t&&m(e,t);return}requestAnimationFrame(c=>{const s=c-n,u=r+(t-r)/Math.max(s,o)*s;m(e,u),u!==t&&p(e,t,o-s,c)})}function v(e,t,o=0){const n=arguments[3]===void 0?performance.now():arguments[3],r=L(e);if(o<=0){r!==t&&w(e,t);return}requestAnimationFrame(c=>{const s=c-n,u=r+(t-r)/Math.max(s,o)*s;w(e,u),u!==t&&v(e,t,o-s,c)})}function m(e,t){if(e===window){window.scrollTo(window.pageXOffset||window.scrollX||document.body.scrollLeft||0,t);return}e.scrollTop=t}function w(e,t){if(e===window){window.scrollTo(t,window.pageYOffset||window.scrollY||document.body.scrollTop||0);return}e.scrollLeft=t}function M(e,t,o){if(o){p(e,t,o);return}m(e,t)}function X(e,t,o){if(o){v(e,t,o);return}w(e,t)}let a;function q(){if(a!==void 0)return a;const e=document.createElement("p"),t=document.createElement("div");S(e,{width:"100%",height:"200px"}),S(t,{position:"absolute",top:"0px",left:"0px",visibility:"hidden",width:"200px",height:"150px",overflow:"hidden"}),t.appendChild(e),document.body.appendChild(t);const o=e.offsetWidth;t.style.overflow="scroll";let n=e.offsetWidth;return o===n&&(n=t.clientWidth),t.remove(),a=o-n,a}function Q(e,t=!0){return!e||e.nodeType!==Node.ELEMENT_NODE?!1:t?e.scrollHeight>e.clientHeight&&(e.classList.contains("scroll")||e.classList.contains("overflow-auto")||["auto","scroll"].includes(window.getComputedStyle(e)["overflow-y"])):e.scrollWidth>e.clientWidth&&(e.classList.contains("scroll")||e.classList.contains("overflow-auto")||["auto","scroll"].includes(window.getComputedStyle(e)["overflow-x"]))}var B={getScrollTarget:Y,getScrollHeight:k,getScrollWidth:D,getVerticalScrollPosition:x,getHorizontalScrollPosition:L,animVerticalScrollTo:p,animHorizontalScrollTo:v,setVerticalScrollPosition:M,setHorizontalScrollPosition:X,getScrollbarWidth:q,hasScrollbar:Q};export{F as Q,x as a,L as b,q as c,B as d,Y as g,$ as s};
