(this.webpackJsonpminder=this.webpackJsonpminder||[]).push([[5],{85:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var r=n(87);function a(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var n=[],r=!0,a=!1,u=void 0;try{for(var c,o=e[Symbol.iterator]();!(r=(c=o.next()).done)&&(n.push(c.value),!t||n.length!==t);r=!0);}catch(i){a=!0,u=i}finally{try{r||null==o.return||o.return()}finally{if(a)throw u}}return n}}(e,t)||Object(r.a)(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},86:function(e,t,n){"use strict";var r=n(2),a=n.n(r);t.a=function(e){var t=e.fontSize,n=e.children;return a.a.createElement("svg",{style:{fill:"currentColor",width:"1em",height:"1em",display:"inline-block",transition:"fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",flexShrink:0,fontSize:null!==t&&void 0!==t?t:"1.5rem"},focusable:"false",viewBox:"0 0 24 24","aria-hidden":"true",role:"presentation"},n)}},87:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var r=n(88);function a(e,t){if(e){if("string"===typeof e)return Object(r.a)(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(r.a)(e,t):void 0}}},88:function(e,t,n){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}n.d(t,"a",(function(){return r}))},89:function(e,t,n){"use strict";var r=n(2),a=n.n(r),u=n(86);t.a=function(e){var t=e.size;return a.a.createElement(u.a,{fontSize:t},a.a.createElement("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"}))}},91:function(e,t,n){"use strict";var r=n(42),a=n(88);var u=n(87);function c(e){return function(e){if(Array.isArray(e))return Object(a.a)(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||Object(u.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var o=n(47),i=n(2),l=n.n(i),s=n(85),f=function(e){return l.a.createElement("button",Object.assign({},e,{style:{background:"none",border:0,padding:0,margin:0,cursor:"pointer"}}))},m=n(86),d=function(e){var t=e.size;return l.a.createElement(m.a,{fontSize:t},l.a.createElement("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"}))},b=function(e){var t=e.name,n=e.value,r=e.setValue,a=Object(i.useState)(!1),u=Object(s.a)(a,2),c=u[0],o=u[1];return c?l.a.createElement("div",{style:{display:"flex",alignItems:"center"}},l.a.createElement("input",{type:"text",name:t,onChange:function(e){return r(e.target.value)},value:n,onBlur:function(){return o(!1)},ref:function(e){e&&e.focus()},onKeyDown:function(e){"Enter"===e.key&&o(!1)}}),l.a.createElement(f,{onMouseDown:function(){return r(void 0)}},l.a.createElement(d,{size:20}))):l.a.createElement("span",{onClick:function(){return o(!0)},style:{minWidth:40,display:"inline-block",cursor:"pointer"}},""===n?"?":n)},v=function(e){var t=e.name,n=e.value,r=e.setValue,a=Object(i.useState)(!1),u=Object(s.a)(a,2),c=u[0],o=u[1];return c?l.a.createElement("div",{style:{display:"flex",alignItems:"center"}},l.a.createElement("input",{type:"checkbox",checked:n,name:t,onChange:function(e){return r(!n)},ref:function(e){e&&e.focus()},onBlur:function(){return o(!1)},style:{cursor:"pointer"}}),l.a.createElement(f,{onMouseDown:function(){return r(void 0)}},l.a.createElement(d,{size:20}))):l.a.createElement("span",{onClick:function(){return o(!0)},style:{cursor:"pointer"}},n?"yes":"no")},p=function(e){var t=e.name,n=e.value,r=e.setValue,a=Object(i.useState)(!1),u=Object(s.a)(a,2),c=u[0],o=u[1];return c?l.a.createElement("div",{style:{display:"flex",alignItems:"center"}},l.a.createElement("input",{type:"number",name:t,onChange:function(e){return!isNaN(Number(e.target.value))&&r(Number(e.target.value))},value:n,onBlur:function(){return o(!1)},ref:function(e){e&&e.focus()},onKeyDown:function(e){"Enter"===e.key&&o(!1)}}),l.a.createElement(f,{onMouseDown:function(){return r(void 0)}},l.a.createElement(d,{size:20}))):l.a.createElement("span",{onClick:function(){return o(!0)},style:{cursor:"pointer"}},n)};function y(e){var t=e.getFullYear().toString(),n=(e.getMonth()+1).toString().padStart(2,"0"),r=e.getDate().toString().padStart(2,"0");return"".concat(t,"-").concat(n,"-").concat(r)}var E=function(e){var t=e.name,n=e.value,r=e.setValue,a=Object(i.useState)(!1),u=Object(s.a)(a,2),c=u[0],o=u[1];return c?l.a.createElement("div",{style:{display:"flex",alignItems:"center"}},l.a.createElement("input",{type:"date",name:t,onBlur:function(){return o(!1)},onChange:function(e){return r(function(e){var t=e.split("-"),n=Object(s.a)(t,3),r=n[0],a=n[1],u=n[2];return new Date(Number(r),Number(a)-1,Number(u))}(e.target.value))},value:y(n),ref:function(e){e&&e.focus()},onKeyDown:function(e){"Enter"===e.key&&o(!1)}}),l.a.createElement(f,{onMouseDown:function(){return r(void 0)}},l.a.createElement(d,{size:20}))):l.a.createElement("span",{onClick:function(){return o(!0)}},function(e){var t=e.getFullYear().toString(),n=(e.getMonth()+1).toString().padStart(2,"0"),r=e.getDate().toString().padStart(2,"0");return"".concat(n,"-").concat(r,"-").concat(t)}(n))},g=n(89),h=function(e){var t=Object(i.useState)(!1),n=Object(s.a)(t,2),r=n[0],a=n[1];return r?l.a.createElement(l.a.Fragment,null,l.a.createElement("button",{onClick:function(){return e.setValue(!1)}},"checkbox"),l.a.createElement("button",{onClick:function(){return e.setValue(0)}},"number"),l.a.createElement("button",{onClick:function(){return e.setValue("")}},"text"),l.a.createElement("button",{onClick:function(){return e.setValue(new Date)}},"date"),l.a.createElement("button",{onClick:function(){return e.setValue([])}},"list"),l.a.createElement("button",{onClick:function(){return e.setValue({})}},"object")):l.a.createElement("div",{style:{display:"flex",alignItems:"center"}},l.a.createElement(f,{onClick:function(){return a(!0)}},l.a.createElement(g.a,{size:20})),l.a.createElement(f,{onMouseDown:function(){return e.setValue(void 0)}},l.a.createElement(d,{size:20})))},j={marginRight:12,width:120,boxSizing:"border-box"},O=function(e){var t=e.name,n=e.setName,a=e.isValid,u=Object(i.useState)(!1),c=Object(s.a)(u,2),o=c[0],f=c[1],m=Object(i.useState)(t),d=Object(s.a)(m,2),b=d[0],v=d[1],p=function(){a(b)&&(n(b),f(!1))};return o?l.a.createElement("input",{type:"text",name:b,style:j,onChange:function(e){return v(e.target.value)},value:b,onBlur:p,ref:function(e){e&&e.focus()},onKeyDown:function(e){"Enter"===e.key&&p()}}):l.a.createElement("span",{onClick:function(){return f(!0)},style:Object(r.a)({fontWeight:"bold",cursor:"pointer",lineHeight:"28px"},j)},""===b?"?":b)},S=function(e){var t=e.size;return l.a.createElement(m.a,{fontSize:t},l.a.createElement("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"}))},k={listStyle:"none",paddingLeft:12,borderLeft:"1px solid #00000030",margin:"4px 0 8px 0"},V={padding:4,display:"flex",alignItems:"center"};t.a=function e(t){var n=t.node,a=t.setParentValue;return l.a.createElement("ul",{style:k},Object.keys(n).map((function(t,r){return l.a.createElement("li",{style:V,key:t},!(n instanceof Array)&&l.a.createElement(O,{name:t,setName:function(e){var r=Object.keys(n).reduce((function(r,a){return a===t?r[e]=n[a]:r[a]=n[a],r}),{});a(r)},isValid:function(e){return e===t||void 0===n[e]}}),function(){var r=n[t],u=function(e){var r=Object.assign({},n,Object(o.a)({},t,e));if(n instanceof Array){var u=Object.values(r);return a(u.filter((function(e){return void 0!==e})))}return a(r)};switch(typeof r){case"string":return function(e){return RegExp(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/).test(e)}(r)?l.a.createElement(E,{name:t,value:new Date(r),setValue:u}):l.a.createElement(b,{name:t,value:r,setValue:u});case"number":return l.a.createElement(p,{name:t,value:r,setValue:u});case"boolean":return l.a.createElement(v,{name:t,value:r,setValue:u});case"object":default:return r instanceof Date?null:null==r?l.a.createElement(h,{name:t,setValue:u}):l.a.createElement(e,{node:r,setParentValue:u})}}())})),l.a.createElement("li",{style:V},l.a.createElement(f,{onClick:function(){if(n instanceof Array)return a([].concat(c(n),[null]));var e=Object.keys(n).reverse().find((function(e){return RegExp(/field:[0-9]+/).test(e)})),t=e?Number(e.split(":")[1]):0;return a(Object(r.a)(Object(r.a)({},n),{},Object(o.a)({},"field:".concat(t+1),null)))}},l.a.createElement(S,{size:20})),0===Object.keys(n).length&&l.a.createElement(f,{onClick:function(){return a(void 0)}},l.a.createElement(d,{size:20}))))}},96:function(e,t,n){"use strict";n.r(t);var r=n(48),a=n(2),u=n.n(a),c=n(91),o=n(23),i=n(8);function l(){var e=Object(r.a)(["\n  query Proposal($uuid: String!) {\n    proposal(uuid: $uuid) {\n      data\n    }\n  }\n"]);return l=function(){return e},e}var s=Object(o.gql)(l());t.default=function(){var e,t=Object(i.g)().proposalId,n=Object(o.useQuery)(s,{variables:{uuid:t}}).data;return null==n?null:u.a.createElement("div",null,u.a.createElement("h3",null," Proposals ",t," "),(e=n.proposal.data,/^[\],:{}\s]*$/.test(e.replace(/\\["\\/bfnrtu]/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))?u.a.createElement(c.a,{node:JSON.parse(n.proposal.data),setParentValue:function(e){return null}}):null))}}}]);
//# sourceMappingURL=5.81ae6737.chunk.js.map