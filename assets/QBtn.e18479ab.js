import{I as ee,J as te,K as I,L as ne,M as ae,N as F,O as re,c as o,g as J,k as ue,r as D,n as le,h as L,P as ie,Q as oe,R as T,S as se,u as ce}from"./index.1d1cb023.js";import{u as de,c as fe,Q as z,b as ve,d as ge}from"./QSpinner.b99e2045.js";function me(e,t){const r=e.style;for(const n in t)r[n]=t[n]}function Me(e){if(e==null)return;if(typeof e=="string")try{return document.querySelector(e)||void 0}catch{return}const t=ee(e);if(t)return t.$el||t}function be(e,t=250){let r=!1,n;return function(){return r===!1&&(r=!0,setTimeout(()=>{r=!1},t),n=e.apply(this,arguments)),n}}function Q(e,t,r,n){r.modifiers.stop===!0&&F(e);const l=r.modifiers.color;let m=r.modifiers.center;m=m===!0||n===!0;const f=document.createElement("span"),d=document.createElement("span"),S=re(e),{left:h,top:v,width:x,height:u}=t.getBoundingClientRect(),y=Math.sqrt(x*x+u*u),g=y/2,k=`${(x-y)/2}px`,i=m?k:`${S.left-h-g}px`,b=`${(u-y)/2}px`,B=m?b:`${S.top-v-g}px`;d.className="q-ripple__inner",me(d,{height:`${y}px`,width:`${y}px`,transform:`translate3d(${i},${B},0) scale3d(.2,.2,1)`,opacity:0}),f.className=`q-ripple${l?" text-"+l:""}`,f.setAttribute("dir","ltr"),f.appendChild(d),t.appendChild(f);const R=()=>{f.remove(),clearTimeout(w)};r.abort.push(R);let w=setTimeout(()=>{d.classList.add("q-ripple__inner--enter"),d.style.transform=`translate3d(${k},${b},0) scale3d(1,1,1)`,d.style.opacity=.2,w=setTimeout(()=>{d.classList.remove("q-ripple__inner--enter"),d.classList.add("q-ripple__inner--leave"),d.style.opacity=0,w=setTimeout(()=>{f.remove(),r.abort.splice(r.abort.indexOf(R),1)},275)},250)},50)}function V(e,{modifiers:t,value:r,arg:n}){const l=Object.assign({},e.cfg.ripple,t,r);e.modifiers={early:l.early===!0,stop:l.stop===!0,center:l.center===!0,color:l.color||n,keyCodes:[].concat(l.keyCodes||13)}}var he=te({name:"ripple",beforeMount(e,t){const r=t.instance.$.appContext.config.globalProperties.$q.config||{};if(r.ripple===!1)return;const n={cfg:r,enabled:t.value!==!1,modifiers:{},abort:[],start(l){n.enabled===!0&&l.qSkipRipple!==!0&&l.type===(n.modifiers.early===!0?"pointerdown":"click")&&Q(l,e,n,l.qKeyEvent===!0)},keystart:be(l=>{n.enabled===!0&&l.qSkipRipple!==!0&&I(l,n.modifiers.keyCodes)===!0&&l.type===`key${n.modifiers.early===!0?"down":"up"}`&&Q(l,e,n,!0)},300)};V(n,t),e.__qripple=n,ne(n,"main",[[e,"pointerdown","start","passive"],[e,"click","start","passive"],[e,"keydown","keystart","passive"],[e,"keyup","keystart","passive"]])},updated(e,t){if(t.oldValue!==t.value){const r=e.__qripple;r!==void 0&&(r.enabled=t.value!==!1,r.enabled===!0&&Object(t.value)===t.value&&V(r,t))}},beforeUnmount(e){const t=e.__qripple;t!==void 0&&(t.abort.forEach(r=>{r()}),ae(t,"main"),delete e._qripple)}});const Y={left:"start",center:"center",right:"end",between:"between",around:"around",evenly:"evenly",stretch:"stretch"},ye=Object.keys(Y),ke={align:{type:String,validator:e=>ye.includes(e)}};function pe(e){return o(()=>{const t=e.align===void 0?e.vertical===!0?"stretch":"left":e.align;return`${e.vertical===!0?"items":"justify"}-${Y[t]}`})}function G(e,t){typeof t.type=="symbol"?Array.isArray(t.children)===!0&&t.children.forEach(r=>{G(e,r)}):e.add(t)}function je(e){const t=new Set;return e.forEach(r=>{G(t,r)}),Array.from(t)}function qe(e){return e.appContext.config.globalProperties.$router!==void 0}function Ke(e){return e.isUnmounted===!0||e.isDeactivated===!0}function H(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}function U(e,t){return(e.aliasOf||e)===(t.aliasOf||t)}function xe(e,t){for(const r in t){const n=t[r],l=e[r];if(typeof n=="string"){if(n!==l)return!1}else if(Array.isArray(l)===!1||l.length!==n.length||n.some((m,f)=>m!==l[f]))return!1}return!0}function W(e,t){return Array.isArray(t)===!0?e.length===t.length&&e.every((r,n)=>r===t[n]):e.length===1&&e[0]===t}function Le(e,t){return Array.isArray(e)===!0?W(e,t):Array.isArray(t)===!0?W(t,e):e===t}function Ee(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const r in e)if(Le(e[r],t[r])===!1)return!1;return!0}const Z={to:[String,Object],replace:Boolean,href:String,target:String,disable:Boolean},Ne={...Z,exact:Boolean,activeClass:{type:String,default:"q-router-link--active"},exactActiveClass:{type:String,default:"q-router-link--exact-active"}};function Ce({fallbackTag:e,useDisableForRouterLinkProps:t=!0}={}){const r=J(),{props:n,proxy:l,emit:m}=r,f=qe(r),d=o(()=>n.disable!==!0&&n.href!==void 0),S=t===!0?o(()=>f===!0&&n.disable!==!0&&d.value!==!0&&n.to!==void 0&&n.to!==null&&n.to!==""):o(()=>f===!0&&d.value!==!0&&n.to!==void 0&&n.to!==null&&n.to!==""),h=o(()=>S.value===!0?B(n.to):null),v=o(()=>h.value!==null),x=o(()=>d.value===!0||v.value===!0),u=o(()=>n.type==="a"||x.value===!0?"a":n.tag||e||"div"),y=o(()=>d.value===!0?{href:n.href,target:n.target}:v.value===!0?{href:h.value.href,target:n.target}:{}),g=o(()=>{if(v.value===!1)return-1;const{matched:s}=h.value,{length:p}=s,E=s[p-1];if(E===void 0)return-1;const $=l.$route.matched;if($.length===0)return-1;const P=$.findIndex(U.bind(null,E));if(P!==-1)return P;const K=H(s[p-2]);return p>1&&H(E)===K&&$[$.length-1].path!==K?$.findIndex(U.bind(null,s[p-2])):P}),k=o(()=>v.value===!0&&g.value!==-1&&xe(l.$route.params,h.value.params)),i=o(()=>k.value===!0&&g.value===l.$route.matched.length-1&&Ee(l.$route.params,h.value.params)),b=o(()=>v.value===!0?i.value===!0?` ${n.exactActiveClass} ${n.activeClass}`:n.exact===!0?"":k.value===!0?` ${n.activeClass}`:"":"");function B(s){try{return l.$router.resolve(s)}catch{}return null}function R(s,{returnRouterError:p,to:E=n.to,replace:$=n.replace}={}){if(n.disable===!0)return s.preventDefault(),Promise.resolve(!1);if(s.metaKey||s.altKey||s.ctrlKey||s.shiftKey||s.button!==void 0&&s.button!==0||n.target==="_blank")return Promise.resolve(!1);s.preventDefault();const P=l.$router[$===!0?"replace":"push"](E);return p===!0?P:P.then(()=>{}).catch(()=>{})}function w(s){if(v.value===!0){const p=E=>R(s,E);m("click",s,p),s.defaultPrevented!==!0&&p()}else m("click",s)}return{hasRouterLink:v,hasHrefLink:d,hasLink:x,linkTag:u,resolvedLink:h,linkIsActive:k,linkIsExactActive:i,linkClass:b,linkAttrs:y,getLink:B,navigateToRouterLink:R,navigateOnClick:w}}const X={none:0,xs:4,sm:8,md:16,lg:24,xl:32},$e={xs:8,sm:10,md:14,lg:20,xl:24},Se=["button","submit","reset"],Pe=/[^\s]\/[^\s]/,Re=["flat","outline","push","unelevated"];function we(e,t){return e.flat===!0?"flat":e.outline===!0?"outline":e.push===!0?"push":e.unelevated===!0?"unelevated":t}const Be={...de,...Z,type:{type:String,default:"button"},label:[Number,String],icon:String,iconRight:String,...Re.reduce((e,t)=>(e[t]=Boolean)&&e,{}),square:Boolean,rounded:Boolean,glossy:Boolean,size:String,fab:Boolean,fabMini:Boolean,padding:String,color:String,textColor:String,noCaps:Boolean,noWrap:Boolean,dense:Boolean,tabindex:[Number,String],ripple:{type:[Boolean,Object],default:!0},align:{...ke.align,default:"center"},stack:Boolean,stretch:Boolean,loading:{type:Boolean,default:null},disable:Boolean},Te={...Be,round:Boolean};function Ae(e){const t=fe(e,$e),r=pe(e),{hasRouterLink:n,hasLink:l,linkTag:m,linkAttrs:f,navigateOnClick:d}=Ce({fallbackTag:"button"}),S=o(()=>{const i=e.fab===!1&&e.fabMini===!1?t.value:{};return e.padding!==void 0?Object.assign({},i,{padding:e.padding.split(/\s+/).map(b=>b in X?X[b]+"px":b).join(" "),minWidth:"0",minHeight:"0"}):i}),h=o(()=>e.rounded===!0||e.fab===!0||e.fabMini===!0),v=o(()=>e.disable!==!0&&e.loading!==!0),x=o(()=>v.value===!0?e.tabindex||0:-1),u=o(()=>we(e,"standard")),y=o(()=>{const i={tabindex:x.value};return l.value===!0?Object.assign(i,f.value):Se.includes(e.type)===!0&&(i.type=e.type),m.value==="a"?(e.disable===!0?i["aria-disabled"]="true":i.href===void 0&&(i.role="button"),n.value!==!0&&Pe.test(e.type)===!0&&(i.type=e.type)):e.disable===!0&&(i.disabled="",i["aria-disabled"]="true"),e.loading===!0&&e.percentage!==void 0&&Object.assign(i,{role:"progressbar","aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":e.percentage}),i}),g=o(()=>{let i;e.color!==void 0?e.flat===!0||e.outline===!0?i=`text-${e.textColor||e.color}`:i=`bg-${e.color} text-${e.textColor||"white"}`:e.textColor&&(i=`text-${e.textColor}`);const b=e.round===!0?"round":`rectangle${h.value===!0?" q-btn--rounded":e.square===!0?" q-btn--square":""}`;return`q-btn--${u.value} q-btn--${b}`+(i!==void 0?" "+i:"")+(v.value===!0?" q-btn--actionable q-focusable q-hoverable":e.disable===!0?" disabled":"")+(e.fab===!0?" q-btn--fab":e.fabMini===!0?" q-btn--fab-mini":"")+(e.noCaps===!0?" q-btn--no-uppercase":"")+(e.dense===!0?" q-btn--dense":"")+(e.stretch===!0?" no-border-radius self-stretch":"")+(e.glossy===!0?" glossy":"")+(e.square?" q-btn--square":"")}),k=o(()=>r.value+(e.stack===!0?" column":" row")+(e.noWrap===!0?" no-wrap text-no-wrap":"")+(e.loading===!0?" q-btn__content--hidden":""));return{classes:g,style:S,innerClasses:k,attributes:y,hasLink:l,linkTag:m,navigateOnClick:d,isActionable:v}}const{passiveCapture:q}=ce;let A=null,_=null,O=null;var Ie=ue({name:"QBtn",props:{...Te,percentage:Number,darkPercentage:Boolean,onTouchstart:[Function,Array]},emits:["click","keydown","mousedown","keyup"],setup(e,{slots:t,emit:r}){const{proxy:n}=J(),{classes:l,style:m,innerClasses:f,attributes:d,hasLink:S,linkTag:h,navigateOnClick:v,isActionable:x}=Ae(e),u=D(null),y=D(null);let g=null,k,i=null;const b=o(()=>e.label!==void 0&&e.label!==null&&e.label!==""),B=o(()=>e.disable===!0||e.ripple===!1?!1:{keyCodes:S.value===!0?[13,32]:[13],...e.ripple===!0?{}:e.ripple}),R=o(()=>({center:e.round})),w=o(()=>{const a=Math.max(0,Math.min(100,e.percentage));return a>0?{transition:"transform 0.6s",transform:`translateX(${a-100}%)`}:{}}),s=o(()=>{if(e.loading===!0)return{onMousedown:j,onTouchstart:j,onClick:j,onKeydown:j,onKeyup:j};if(x.value===!0){const a={onClick:E,onKeydown:$,onMousedown:K};if(n.$q.platform.has.touch===!0){const c=e.onTouchstart!==void 0?"":"Passive";a[`onTouchstart${c}`]=P}return a}return{onClick:T}}),p=o(()=>({ref:u,class:"q-btn q-btn-item non-selectable no-outline "+l.value,style:m.value,...d.value,...s.value}));function E(a){if(u.value!==null){if(a!==void 0){if(a.defaultPrevented===!0)return;const c=document.activeElement;if(e.type==="submit"&&c!==document.body&&u.value.contains(c)===!1&&c.contains(u.value)===!1){u.value.focus();const N=()=>{document.removeEventListener("keydown",T,!0),document.removeEventListener("keyup",N,q),u.value!==null&&u.value.removeEventListener("blur",N,q)};document.addEventListener("keydown",T,!0),document.addEventListener("keyup",N,q),u.value.addEventListener("blur",N,q)}}v(a)}}function $(a){u.value!==null&&(r("keydown",a),I(a,[13,32])===!0&&_!==u.value&&(_!==null&&M(),a.defaultPrevented!==!0&&(u.value.focus(),_=u.value,u.value.classList.add("q-btn--active"),document.addEventListener("keyup",C,!0),u.value.addEventListener("blur",C,q)),T(a)))}function P(a){u.value!==null&&(r("touchstart",a),a.defaultPrevented!==!0&&(A!==u.value&&(A!==null&&M(),A=u.value,g=a.target,g.addEventListener("touchcancel",C,q),g.addEventListener("touchend",C,q)),k=!0,i!==null&&clearTimeout(i),i=setTimeout(()=>{i=null,k=!1},200)))}function K(a){u.value!==null&&(a.qSkipRipple=k===!0,r("mousedown",a),a.defaultPrevented!==!0&&O!==u.value&&(O!==null&&M(),O=u.value,u.value.classList.add("q-btn--active"),document.addEventListener("mouseup",C,q)))}function C(a){if(u.value!==null&&!(a!==void 0&&a.type==="blur"&&document.activeElement===u.value)){if(a!==void 0&&a.type==="keyup"){if(_===u.value&&I(a,[13,32])===!0){const c=new MouseEvent("click",a);c.qKeyEvent=!0,a.defaultPrevented===!0&&se(c),a.cancelBubble===!0&&F(c),u.value.dispatchEvent(c),T(a),a.qKeyEvent=!0}r("keyup",a)}M()}}function M(a){const c=y.value;a!==!0&&(A===u.value||O===u.value)&&c!==null&&c!==document.activeElement&&(c.setAttribute("tabindex",-1),c.focus()),A===u.value&&(g!==null&&(g.removeEventListener("touchcancel",C,q),g.removeEventListener("touchend",C,q)),A=g=null),O===u.value&&(document.removeEventListener("mouseup",C,q),O=null),_===u.value&&(document.removeEventListener("keyup",C,!0),u.value!==null&&u.value.removeEventListener("blur",C,q),_=null),u.value!==null&&u.value.classList.remove("q-btn--active")}function j(a){T(a),a.qSkipRipple=!0}return le(()=>{M(!0)}),Object.assign(n,{click:a=>{x.value===!0&&E(a)}}),()=>{let a=[];e.icon!==void 0&&a.push(L(z,{name:e.icon,left:e.stack!==!0&&b.value===!0,role:"img","aria-hidden":"true"})),b.value===!0&&a.push(L("span",{class:"block"},[e.label])),a=ve(t.default,a),e.iconRight!==void 0&&e.round===!1&&a.push(L(z,{name:e.iconRight,right:e.stack!==!0&&b.value===!0,role:"img","aria-hidden":"true"}));const c=[L("span",{class:"q-focus-helper",ref:y})];return e.loading===!0&&e.percentage!==void 0&&c.push(L("span",{class:"q-btn__progress absolute-full overflow-hidden"+(e.darkPercentage===!0?" q-btn__progress--dark":"")},[L("span",{class:"q-btn__progress-indicator fit block",style:w.value})])),c.push(L("span",{class:"q-btn__content text-center col items-center q-anchor--skip "+f.value},a)),e.loading!==null&&c.push(L(ie,{name:"q-transition--fade"},()=>e.loading===!0?[L("span",{key:"loading",class:"absolute-full flex flex-center"},t.loading!==void 0?t.loading():[L(ge)])]:null)),oe(L(h.value,p.value,c),[[he,B.value,void 0,R.value]])}}});export{Ie as Q,je as a,Ce as b,me as c,Ke as d,Me as g,be as t,Ne as u,qe as v};
