import{h as m,Q as h}from"./QSpinner.b99e2045.js";import{u as g,a as y,Q as f,b as u,c as v}from"./devices.ccc8c389.js";import{k as _,c as b,h as k,g as x,_ as q,d as w,y as p,z as C,B as s,C as D,D as l,E as B,Z as o,H as i,f as d,F as I,$ as Q,G as $,a0 as S}from"./index.1d1cb023.js";import{u as V}from"./auth.731078b1.js";var T=_({name:"QCard",props:{...g,tag:{type:String,default:"div"},square:Boolean,flat:Boolean,bordered:Boolean},setup(e,{slots:t}){const{proxy:{$q:r}}=x(),c=y(e,r),n=b(()=>"q-card"+(c.value===!0?" q-card--dark q-dark":"")+(e.bordered===!0?" q-card--bordered":"")+(e.square===!0?" q-card--square no-border-radius":"")+(e.flat===!0?" q-card--flat no-shadow":""));return()=>k(e.tag,{class:n.value},m(t.default))}}),z="./assets/device.77e1f7a1.svg";const P=w({name:"IndexPage",data(){return{colors:{grey:"white"},color:"grey",filter:""}},computed:{...p(u,{deviceTypeId:e=>e.deviceTypeId,devicetypes:e=>e.devicetypes,devicetypesloading:e=>e.devicetypesloading,descriptions:e=>e.descriptions}),...p(V,{region:e=>e.region,token:e=>e.token,connected:e=>e.connected}),devicelist(){let e=[...Object.values(this.devicetypes).map(t=>({value:t.id,label:t.title,sublabel:t.name}))].sort((t,r)=>t.label.localeCompare(r.label));return this.filter&&(e=e.filter(t=>t.label.toLowerCase().indexOf(this.filter)>-1)),e}},watch:{connected(){this.getDeviceTypes()}},methods:{...C(u,["getDeviceTypes","getDeviceDesc","setDeviceTypeId"])}}),F={key:0,class:"text-white",style:{"max-width":"100%",width:"800px",margin:"10px auto"}},N={class:"row"},A={class:"col-12"},E=["href"],L={class:"q-pa-md text-center",style:{height:"170px"}},O=["src"],j={key:1,loading:"lazy",src:z,style:{"max-height":"150px","max-width":"100%",opacity:".1"}},G={class:"absolute-bottom text-center",style:{background:"rgba(0,0,0,.5)"}};function H(e,t,r,c,n,U){return s(),D(f,{style:{height:"100%"},class:B("q-pa-md ai-chat")},{default:l(()=>[e.connected?(s(),o("div",F,[i("div",N,[i("div",A,[d(v,{modelValue:e.filter,"onUpdate:modelValue":t[0]||(t[0]=a=>e.filter=a),autofocus:"",debounce:"500",filled:"",type:"search",hint:"Filter"},{append:l(()=>[d(h,{name:"mdi-magnify"})]),_:1},8,["modelValue"])]),(s(!0),o(I,null,Q(e.devicelist,a=>(s(),o("div",{key:a.value,class:"col-md-3 col-sm-4 col-12"},[i("a",{href:`#/chat?devicetype=${a.value}`,class:"text-white"},[d(T,{class:"my-card q-ma-xs",style:{height:"170px"},title:e.descriptions[a.value]&&e.descriptions[a.value].meta_description},{default:l(()=>[i("div",L,[e.descriptions[a.value]&&e.descriptions[a.value].image!==""?(s(),o("img",{key:0,loading:"lazy",src:e.descriptions[a.value].image,style:{"max-height":"150px","max-width":"100%"}},null,8,O)):(s(),o("img",j))]),i("div",G,S(a.label),1)]),_:2},1032,["title"])],8,E)]))),128))])])):$("",!0)]),_:1})}var R=q(P,[["render",H]]);export{R as default};
