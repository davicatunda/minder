(this.webpackJsonpminder=this.webpackJsonpminder||[]).push([[5],{103:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var r=n(0),a=n(1),o=n(43),u=n(11),i=n(15),c=n(85),l=function(e){function t(t){var n=t.options,r=t.context,a=t.result,o=t.setResult,u=e.call(this,n,r)||this;return u.runMutation=function(e){void 0===e&&(e={}),u.onMutationStart();var t=u.generateNewMutationId();return u.mutate(e).then((function(e){return u.onMutationCompleted(e,t),e})).catch((function(e){if(u.onMutationError(e,t),!u.getOptions().onError)throw e}))},u.verifyDocumentType(n.mutation,c.a.Mutation),u.result=a,u.setResult=o,u.mostRecentMutationId=0,u}return Object(r.c)(t,e),t.prototype.execute=function(e){return this.isMounted=!0,this.verifyDocumentType(this.getOptions().mutation,c.a.Mutation),[this.runMutation,Object(r.a)(Object(r.a)({},e),{client:this.refreshClient().client})]},t.prototype.afterExecute=function(){return this.isMounted=!0,this.unmount.bind(this)},t.prototype.cleanup=function(){},t.prototype.mutate=function(e){return this.refreshClient().client.mutate(Object(r.a)(Object(r.a)({},this.getOptions()||{}),e||{}))},t.prototype.onMutationStart=function(){this.result.loading||this.getOptions().ignoreResults||this.updateResult({loading:!0,error:void 0,data:void 0,called:!0})},t.prototype.onMutationCompleted=function(e,t){var n=this.getOptions(),r=n.onCompleted,a=n.ignoreResults,o=e.data,u=e.errors,c=u&&u.length>0?new i.a({graphQLErrors:u}):void 0;this.isMostRecentMutation(t)&&!a&&this.updateResult({called:!0,loading:!1,data:o,error:c}),r&&r(o)},t.prototype.onMutationError=function(e,t){var n=this.getOptions().onError;this.isMostRecentMutation(t)&&this.updateResult({loading:!1,error:e,data:void 0,called:!0}),n&&n(e)},t.prototype.generateNewMutationId=function(){return++this.mostRecentMutationId},t.prototype.isMostRecentMutation=function(e){return this.mostRecentMutationId===e},t.prototype.updateResult=function(e){!this.isMounted||this.previousResult&&Object(u.a)(this.previousResult,e)||(this.setResult(e),this.previousResult=e)},t}(n(101).a);function s(e,t){var n=Object(a.useContext)(Object(o.a)()),u=Object(a.useState)({called:!1,loading:!1}),i=u[0],c=u[1],s=t?Object(r.a)(Object(r.a)({},t),{mutation:e}):{mutation:e},f=Object(a.useRef)();var d=(f.current||(f.current=new l({options:s,context:n,result:i,setResult:c})),f.current);return d.setOptions(s),d.context=n,Object(a.useEffect)((function(){return d.afterExecute()})),d.execute(i)}},111:function(e,t,n){"use strict";n.r(t);var r=n(82),a=n(100),o=n(1),u=n.n(o),i=n(92),c=n(80),l=n(103),s=n(102),f=n(90),d=n(23);function p(){var e=Object(a.a)(["\n  query StandardPage {\n    latestStandard {\n      version\n      data\n    }\n    proposals {\n      uuid\n    }\n  }\n"]);return p=function(){return e},e}function m(){var e=Object(a.a)(["\n  mutation Adding($proposal: String!) {\n    addProposal(proposal: $proposal) {\n      uuid\n    }\n  }\n"]);return m=function(){return e},e}var b=Object(c.a)(m()),v=Object(c.a)(p()),h={"?Parent field":{"Proposed Field":{type:"text",description:"# in markdown","?subfields":["more fields"]}}};t.default=function(){var e=Object(d.f)(),t=Object(l.a)(b),n=Object(r.a)(t,1)[0],a=Object(o.useState)(h),c=Object(r.a)(a,2),p=c[0],m=c[1],E=Object(s.a)(v).data;if(null==E)return null;var g=E.latestStandard,y=E.proposals;return u.a.createElement("div",null,u.a.createElement("h2",null," Proposed API ",g.version),u.a.createElement(i.a,{node:JSON.parse(g.data),setParentValue:function(e){return null}}),u.a.createElement("h2",null," Make a Proposal "),u.a.createElement(i.a,{node:p,setParentValue:m}),u.a.createElement(f.b,{onClick:function(){n({variables:{proposal:JSON.stringify(p)}})}},"Send"),u.a.createElement("h2",null," All Proposals "),u.a.createElement("ul",null,y.map((function(t){var n=t.uuid;return u.a.createElement("li",{key:n},"Proposal ",n,":",u.a.createElement(f.b,{onClick:function(){return e.push("/minder/proposal/".concat(n))}},"Check it out"))}))))}},83:function(e,t,n){"use strict";var r=n(1),a=n.n(r);t.a=function(e){var t=e.fontSize,n=e.children;return a.a.createElement("svg",{style:{fill:"currentColor",width:"1em",height:"1em",display:"inline-block",transition:"fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",flexShrink:0,fontSize:null!==t&&void 0!==t?t:"1.5rem"},focusable:"false",viewBox:"0 0 24 24","aria-hidden":"true",role:"presentation"},n)}},87:function(e,t,n){"use strict";var r=n(1),a=n.n(r),o=n(83);t.a=function(e){var t=e.size;return a.a.createElement(o.a,{fontSize:t},a.a.createElement("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"}))}},90:function(e,t,n){"use strict";n.d(t,"a",(function(){return u}));var r=n(84),a=n(1),o=n.n(a),u={border:0,padding:"6px 16px",minWidth:64,boxSizing:"border-box",boxShadow:"\n    0px 3px 1px -2px rgba(0,0,0,0.2),\n    0px 2px 2px 0px rgba(0,0,0,0.14),\n    0px 1px 5px 0px rgba(0,0,0,0.12)\n  ",borderRadius:4,display:"inline-flex",alignItems:"center",color:"#fff",fontWeight:500,lineHeight:1.75,textTransform:"uppercase",fontSize:"0.875rem",letterSpacing:"0.02857em",backgroundColor:"#1976d2",cursor:"pointer"},i=Object(r.a)({},u,{backgroundColor:"#e0e0e0",cursor:"not-allowed",color:"rgba(0, 0, 0, 0.4)"});t.b=function(e){return!0===e.disabled?o.a.createElement("button",{style:i,disabled:!0},e.children):o.a.createElement("button",{onClick:e.onClick,style:u},e.children)}},92:function(e,t,n){"use strict";var r=n(84),a=n(93),o=n(86),u=n(1),i=n.n(u),c=n(82),l=function(e){return i.a.createElement("button",Object.assign({},e,{style:{background:"none",border:0,padding:0,margin:0,cursor:"pointer"}}))},s=n(83),f=function(e){var t=e.size;return i.a.createElement(s.a,{fontSize:t},i.a.createElement("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"}))},d=function(e){var t=e.name,n=e.value,r=e.setValue,a=Object(u.useState)(!1),o=Object(c.a)(a,2),s=o[0],d=o[1];return s?i.a.createElement("div",{style:{display:"flex",alignItems:"center"}},i.a.createElement("input",{type:"text",name:t,onChange:function(e){return r(e.target.value)},value:n,onBlur:function(){return d(!1)},ref:function(e){e&&e.focus()},onKeyDown:function(e){"Enter"===e.key&&d(!1)}}),i.a.createElement(l,{onMouseDown:function(){return r(void 0)}},i.a.createElement(f,{size:20}))):i.a.createElement("span",{onClick:function(){return d(!0)},style:{minWidth:40,display:"inline-block",cursor:"pointer"}},""===n?"?":n)},p=function(e){var t=e.name,n=e.value,r=e.setValue,a=Object(u.useState)(!1),o=Object(c.a)(a,2),s=o[0],d=o[1];return s?i.a.createElement("div",{style:{display:"flex",alignItems:"center"}},i.a.createElement("input",{type:"checkbox",checked:n,name:t,onChange:function(e){return r(!n)},ref:function(e){e&&e.focus()},onBlur:function(){return d(!1)},style:{cursor:"pointer"}}),i.a.createElement(l,{onMouseDown:function(){return r(void 0)}},i.a.createElement(f,{size:20}))):i.a.createElement("span",{onClick:function(){return d(!0)},style:{cursor:"pointer"}},n?"yes":"no")},m=function(e){var t=e.name,n=e.value,r=e.setValue,a=Object(u.useState)(!1),o=Object(c.a)(a,2),s=o[0],d=o[1];return s?i.a.createElement("div",{style:{display:"flex",alignItems:"center"}},i.a.createElement("input",{type:"number",name:t,onChange:function(e){return!isNaN(Number(e.target.value))&&r(Number(e.target.value))},value:n,onBlur:function(){return d(!1)},ref:function(e){e&&e.focus()},onKeyDown:function(e){"Enter"===e.key&&d(!1)}}),i.a.createElement(l,{onMouseDown:function(){return r(void 0)}},i.a.createElement(f,{size:20}))):i.a.createElement("span",{onClick:function(){return d(!0)},style:{cursor:"pointer"}},n)};function b(e){var t=e.getFullYear().toString(),n=(e.getMonth()+1).toString().padStart(2,"0"),r=e.getDate().toString().padStart(2,"0");return"".concat(t,"-").concat(n,"-").concat(r)}var v=function(e){var t=e.name,n=e.value,r=e.setValue,a=Object(u.useState)(!1),o=Object(c.a)(a,2),s=o[0],d=o[1];return s?i.a.createElement("div",{style:{display:"flex",alignItems:"center"}},i.a.createElement("input",{type:"date",name:t,onBlur:function(){return d(!1)},onChange:function(e){return r(function(e){var t=e.split("-"),n=Object(c.a)(t,3),r=n[0],a=n[1],o=n[2];return new Date(Number(r),Number(a)-1,Number(o))}(e.target.value))},value:b(n),ref:function(e){e&&e.focus()},onKeyDown:function(e){"Enter"===e.key&&d(!1)}}),i.a.createElement(l,{onMouseDown:function(){return r(void 0)}},i.a.createElement(f,{size:20}))):i.a.createElement("span",{onClick:function(){return d(!0)}},function(e){var t=e.getFullYear().toString(),n=(e.getMonth()+1).toString().padStart(2,"0"),r=e.getDate().toString().padStart(2,"0");return"".concat(n,"-").concat(r,"-").concat(t)}(n))},h=n(87),E=function(e){var t=Object(u.useState)(!1),n=Object(c.a)(t,2),r=n[0],a=n[1];return r?i.a.createElement(i.a.Fragment,null,i.a.createElement("button",{onClick:function(){return e.setValue(!1)}},"checkbox"),i.a.createElement("button",{onClick:function(){return e.setValue(0)}},"number"),i.a.createElement("button",{onClick:function(){return e.setValue("")}},"text"),i.a.createElement("button",{onClick:function(){return e.setValue(new Date)}},"date"),i.a.createElement("button",{onClick:function(){return e.setValue([])}},"list"),i.a.createElement("button",{onClick:function(){return e.setValue({})}},"object")):i.a.createElement("div",{style:{display:"flex",alignItems:"center"}},i.a.createElement(l,{onClick:function(){return a(!0)}},i.a.createElement(h.a,{size:20})),i.a.createElement(l,{onMouseDown:function(){return e.setValue(void 0)}},i.a.createElement(f,{size:20})))},g={marginRight:12,width:120,boxSizing:"border-box"},y=function(e){var t=e.name,n=e.setName,a=e.isValid,o=Object(u.useState)(!1),l=Object(c.a)(o,2),s=l[0],f=l[1],d=Object(u.useState)(t),p=Object(c.a)(d,2),m=p[0],b=p[1],v=function(){a(m)&&(n(m),f(!1))};return s?i.a.createElement("input",{type:"text",name:m,style:g,onChange:function(e){return b(e.target.value)},value:m,onBlur:v,ref:function(e){e&&e.focus()},onKeyDown:function(e){"Enter"===e.key&&v()}}):i.a.createElement("span",{onClick:function(){return f(!0)},style:Object(r.a)({fontWeight:"bold",cursor:"pointer",lineHeight:"28px"},g)},""===m?"?":m)},O=function(e){var t=e.size;return i.a.createElement(s.a,{fontSize:t},i.a.createElement("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"}))},j={listStyle:"none",paddingLeft:12,borderLeft:"1px solid #00000030",margin:"4px 0 8px 0"},x={padding:4,display:"flex",alignItems:"center"};t.a=function e(t){var n=t.node,u=t.setParentValue;return i.a.createElement("ul",{style:j},Object.keys(n).map((function(t,r){return i.a.createElement("li",{style:x,key:t},!(n instanceof Array)&&i.a.createElement(y,{name:t,setName:function(e){var r=Object.keys(n).reduce((function(r,a){return a===t?r[e]=n[a]:r[a]=n[a],r}),{});u(r)},isValid:function(e){return e===t||void 0===n[e]}}),function(){var r=n[t],a=function(e){var r=Object.assign({},n,Object(o.a)({},t,e));if(n instanceof Array){var a=Object.values(r);return u(a.filter((function(e){return void 0!==e})))}return u(r)};switch(typeof r){case"string":return function(e){return RegExp(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/).test(e)}(r)?i.a.createElement(v,{name:t,value:new Date(r),setValue:a}):i.a.createElement(d,{name:t,value:r,setValue:a});case"number":return i.a.createElement(m,{name:t,value:r,setValue:a});case"boolean":return i.a.createElement(p,{name:t,value:r,setValue:a});case"object":default:return r instanceof Date?null:null==r?i.a.createElement(E,{name:t,setValue:a}):i.a.createElement(e,{node:r,setParentValue:a})}}())})),i.a.createElement("li",{style:x},i.a.createElement(l,{onClick:function(){if(n instanceof Array)return u([].concat(Object(a.a)(n),[null]));var e=Object.keys(n).reverse().find((function(e){return RegExp(/field:[0-9]+/).test(e)})),t=e?Number(e.split(":")[1]):0;return u(Object(r.a)({},n,Object(o.a)({},"field:".concat(t+1),null)))}},i.a.createElement(O,{size:20})),0===Object.keys(n).length&&i.a.createElement(l,{onClick:function(){return u(void 0)}},i.a.createElement(f,{size:20}))))}}}]);
//# sourceMappingURL=5.f49bc3cc.chunk.js.map