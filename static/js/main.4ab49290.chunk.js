(this.webpackJsonpminder=this.webpackJsonpminder||[]).push([[0],{14:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(6),o=n.n(c),l=n(1);var i=function(e){var t=e.fontSize,n=e.children;return a.a.createElement("svg",{style:{fill:"currentColor",width:"1em",height:"1em",display:"inline-block",transition:"fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",flexShrink:0,fontSize:null!==t&&void 0!==t?t:"1.5rem"},focusable:"false",viewBox:"0 0 24 24","aria-hidden":"true",role:"presentation"},n)};var u=function(e){var t=e.size;return a.a.createElement(i,{fontSize:t},a.a.createElement("path",{d:"M21 3.01H3c-1.1 0-2 .9-2 2V9h2V4.99h18v14.03H3V15H1v4.01c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98v-14c0-1.11-.9-2-2-2zM11 16l4-4-4-4v3H1v2h10v3z"}))},s=n(3),f={border:0,padding:"6px 16px",minWidth:64,boxSizing:"border-box",boxShadow:"\n    0px 3px 1px -2px rgba(0,0,0,0.2),\n    0px 2px 2px 0px rgba(0,0,0,0.14),\n    0px 1px 5px 0px rgba(0,0,0,0.12)\n  ",borderRadius:4,display:"inline-flex",alignItems:"center",color:"#fff",fontWeight:500,lineHeight:1.75,textTransform:"uppercase",fontSize:"0.875rem",letterSpacing:"0.02857em",backgroundColor:"#1976d2",cursor:"pointer"},d=Object(s.a)({},f,{backgroundColor:"#e0e0e0",cursor:"not-allowed",color:"rgba(0, 0, 0, 0.4)"});var m=function(e){return!0===e.disabled?a.a.createElement("button",{style:d,disabled:!0},e.children):a.a.createElement("button",{onClick:e.onClick,style:f},e.children)};var p=function(e){return a.a.createElement("label",{style:f},a.a.createElement("input",{style:{display:"none"},type:"file",onChange:e.onChange}),a.a.createElement("span",{style:{display:"flex",marginRight:8,height:20,width:20}},a.a.createElement(u,{size:20})),e.label)};var h=function(e){var t=e.size;return a.a.createElement(i,{fontSize:t},a.a.createElement("path",{d:"M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"}))};function v(e){var t=e.children;return a.a.createElement(a.a.Fragment,null,a.a.createElement("span",{style:{display:"flex",marginRight:8,height:20,width:20}},a.a.createElement(h,{size:20})),t)}var b=function(e){if(null==e.data)return a.a.createElement(m,{disabled:!0},a.a.createElement(v,null,e.children));var t=Object(s.a)({},f,{textDecoration:"inherit"}),n="data:text/plain;charset=base64,".concat(e.data);return a.a.createElement("a",{style:t,href:n,download:e.fileName},a.a.createElement(v,null,e.children))},y=n(7),g=n(4);var E=function(e){var t=e.name,n=e.value,c=e.setValue,o=Object(r.useState)(!1),i=Object(l.a)(o,2),u=i[0],s=i[1];return u?a.a.createElement("input",{type:"text",name:t,onChange:function(e){return c(e.target.value)},value:n,onBlur:function(){return s(!1)},ref:function(e){e&&e.focus()},onKeyDown:function(e){"Enter"===e.key&&s(!1)}}):a.a.createElement("span",{onClick:function(){return s(!0)}},n)};var w=function(e){var t=e.name,n=e.value,r=e.setValue;return a.a.createElement("input",{type:"checkbox",checked:n,name:t,onChange:function(e){return r(!n)},value:n})};var x=function(e){var t=e.name,n=e.value,c=e.setValue,o=Object(r.useState)(!1),i=Object(l.a)(o,2),u=i[0],s=i[1];return u?a.a.createElement("input",{type:"number",name:t,onChange:function(e){return c(e.target.value)},value:n,onBlur:function(){return s(!1)},ref:function(e){e&&e.focus()},onKeyDown:function(e){"Enter"===e.key&&s(!1)}}):a.a.createElement("span",{onClick:function(){return s(!0)}},n)};function C(e){var t=e.getFullYear().toString(),n=(e.getMonth()+1).toString().padStart(2,"0"),r=e.getDate().toString().padStart(2,"0");return"".concat(t,"-").concat(n,"-").concat(r)}var k=function(e){var t=e.name,n=e.value,c=e.setValue,o=Object(r.useState)(!1),i=Object(l.a)(o,2),u=i[0],s=i[1];return u?a.a.createElement("input",{type:"date",name:t,onBlur:function(){return s(!1)},onChange:function(e){return c(function(e){var t=e.split("-"),n=Object(l.a)(t,3),r=n[0],a=n[1],c=n[2];return new Date(Number(r),Number(a)-1,Number(c))}(e.target.value))},value:C(n),onKeyDown:function(e){"Enter"===e.key&&s(!1)}}):a.a.createElement("span",{onClick:function(){return s(!0)}},function(e){var t=e.getFullYear().toString(),n=(e.getMonth()+1).toString().padStart(2,"0"),r=e.getDate().toString().padStart(2,"0");return"".concat(n,"-").concat(r,"-").concat(t)}(n))};var S=function(e){return a.a.createElement("button",{onClick:e.onAddItem}," + ")};var j=function(e){var t=e.size;return a.a.createElement(i,{fontSize:t},a.a.createElement("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"}))};var A=function(e){var t=Object(r.useState)(!1),n=Object(l.a)(t,2),c=n[0],o=n[1];return c?a.a.createElement(a.a.Fragment,null,a.a.createElement("button",{onClick:function(){return e.setValue(!1)}},"boolean"),a.a.createElement("button",{onClick:function(){return e.setValue(0)}},"number"),a.a.createElement("button",{onClick:function(){return e.setValue("")}},"string"),a.a.createElement("button",{onClick:function(){return e.setValue(new Date)}},"date"),a.a.createElement("button",{onClick:function(){return e.setValue([])}},"array"),a.a.createElement("button",{onClick:function(){return e.setValue({})}},"object")):a.a.createElement("button",{onClick:function(){return o(!0)}},a.a.createElement(j,{size:12}))};var O=function(e){var t=e.name,n=e.setName,c=Object(r.useState)(!1),o=Object(l.a)(c,2),i=o[0],u=o[1];return i?a.a.createElement("input",{type:"text",name:"name",onChange:function(e){return n(e.target.value)},value:t,onBlur:function(){return u(!1)},ref:function(e){e&&e.focus()},onKeyDown:function(e){"Enter"===e.key&&u(!1)}}):a.a.createElement("span",{onClick:function(){return u(!0)}},"[".concat(t,"]: "))};var V=function e(t){var n=t.node,r=t.setParentValue;return a.a.createElement("ul",null,Object.keys(n).map((function(t,c){return a.a.createElement("li",{key:c},!(n instanceof Array)&&a.a.createElement(O,{name:t,setName:function(e){var a=Object.keys(n).reduce((function(r,a){return a===t?r[e]=n[a]:r[a]=n[a],r}),{});r(a)}}),function(){var c=n[t],o=n instanceof Array?function(e){return r(n.map((function(n,r){return r===Number(t)?e:n})))}:function(e){return r(Object(s.a)({},n,Object(g.a)({},t,e)))};if(null===c)return a.a.createElement(A,{name:t,setValue:o});switch(typeof c){case"string":return function(e){return RegExp(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/).test(e)}(c)?a.a.createElement(k,{name:t,value:new Date(c),setValue:o}):a.a.createElement(E,{name:t,value:c,setValue:o});case"number":return a.a.createElement(x,{name:t,value:c,setValue:o});case"boolean":return a.a.createElement(w,{name:t,value:c,setValue:o});case"object":default:return a.a.createElement(e,{node:c,setParentValue:o})}}())})),a.a.createElement("li",null,a.a.createElement(S,{onAddItem:function(){if(n instanceof Array)return r([].concat(Object(y.a)(n),[null]));var e=Object.keys(n).reverse().find((function(e){return RegExp(/field:[0-9]+/).test(e)})),t=e?Number(e.split(":")[1]):0;return r(Object(s.a)({},n,Object(g.a)({},"field:".concat(t+1),null)))}})))},z=n(2),N=n.n(z);function U(e){return String.fromCharCode.apply(null,new Uint16Array(e))}function D(e){for(var t=new ArrayBuffer(2*e.length),n=new Uint16Array(t),r=0,a=e.length;r<a;r++)n[r]=e.charCodeAt(r);return t}function M(e){return String.fromCharCode.apply(null,new Uint8Array(e))}function R(e){return function(e){var t=new Uint8Array(e.length);return Array.prototype.forEach.call(t,(function(t,n,r){r[n]=e.charCodeAt(n)})),btoa(M(t.buffer))}(M(e))}function W(e){return function(e){for(var t=new ArrayBuffer(e.length),n=new Uint8Array(t),r=0,a=e.length;r<a;r++)n[r]=e.charCodeAt(r);return t}(function(e){var t=atob(e),n=new Uint8Array(t.length);return Array.prototype.forEach.call(n,(function(e,n,r){r[n]=t.charCodeAt(n)})),M(n.buffer)}(e))}function K(e){return function(e){var t=new Uint16Array(e.length);return Array.prototype.forEach.call(t,(function(t,n,r){r[n]=e.charCodeAt(n)})),btoa(M(t.buffer))}(U(e))}function B(e){return D(function(e){var t=atob(e),n=new Uint8Array(t.length);return Array.prototype.forEach.call(n,(function(e,n,r){r[n]=t.charCodeAt(n)})),U(n.buffer)}(e))}var H='{\n  "boolean": true,\n  "text": "text",\n  "number": 10,\n  "array": [\n    "zero",\n    "first",\n    "second",\n    "third",\n    "forth"\n  ],\n  "null": null,\n  "object2": {\n    "string": "test",\n    "null": null\n  },\n  "object": {\n    "prop": false\n  }\n}';var F=function(){var e=Object(r.useState)(null),t=Object(l.a)(e,2),n=t[0],c=t[1],o=Object(r.useState)(!1),i=Object(l.a)(o,2),u=(i[0],i[1]),s=Object(r.useState)(null),f=Object(l.a)(s,2),d=f[0],h=f[1],v=Object(r.useState)(!1),y=Object(l.a)(v,2),g=(y[0],y[1]),E=Object(r.useState)(null),w=Object(l.a)(E,2),x=w[0],C=w[1];return Object(r.useEffect)((function(){null!=d&&null!=n&&(g(!0),function(e,t){var n,r,a,c,o,i;return N.a.async((function(u){for(;;)switch(u.prev=u.next){case 0:return n=e.split("!"),r=Object(l.a)(n,2),a=r[0],c=r[1],u.next=3,N.a.awrap(window.crypto.subtle.importKey("raw",B(t),{name:"AES-GCM",length:256},!0,["encrypt","decrypt"]));case 3:return o=u.sent,u.next=6,N.a.awrap(window.crypto.subtle.decrypt({name:"AES-GCM",iv:W(a)},o,B(c)));case 6:return i=u.sent,u.abrupt("return",U(i));case 8:case"end":return u.stop()}}))}(d,n).then((function(e){C(e),g(!1)})))}),[d,n]),Object(r.useEffect)((function(){null!=x&&null!=n&&(u(!0),function(e,t){var n,r,a;return N.a.async((function(c){for(;;)switch(c.prev=c.next){case 0:return n=window.crypto.getRandomValues(new Uint8Array(12)),c.next=3,N.a.awrap(window.crypto.subtle.importKey("raw",B(t),{name:"AES-GCM",length:256},!0,["encrypt","decrypt"]));case 3:return r=c.sent,c.next=6,N.a.awrap(window.crypto.subtle.encrypt({name:"AES-GCM",iv:n},r,D(e)));case 6:return a=c.sent,c.abrupt("return","".concat(R(n),"!").concat(K(a)));case 8:case"end":return c.stop()}}))}(x,n).then((function(e){h(e),u(!1)})))}),[x,n]),a.a.createElement("div",null,a.a.createElement("div",{style:{border:"1px solid black",maxWidth:500}},a.a.createElement("div",null,a.a.createElement("div",null,a.a.createElement("h2",null," Key "),a.a.createElement("div",{style:{display:"flex",justifyContent:"space-evenly",alignItems:"center"}},a.a.createElement(m,{onClick:function(){(function(){var e,t;return N.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,N.a.awrap(window.crypto.subtle.generateKey({name:"AES-GCM",length:256},!0,["encrypt","decrypt"]));case 2:return e=n.sent,n.next=5,N.a.awrap(window.crypto.subtle.exportKey("raw",e));case 5:return t=n.sent,n.abrupt("return",K(t));case 7:case"end":return n.stop()}}))})().then(c)}},a.a.createElement("span",{style:{display:"flex",marginRight:8,height:20,width:20}},a.a.createElement(j,{size:20})),"Create Key"),a.a.createElement(p,{label:"Upload key",onChange:function(e){var t=e.target.files[0];if(t){var n=new FileReader;n.onloadend=function(){"string"===typeof n.result&&c(n.result)},n.readAsText(t)}}}),a.a.createElement(b,{data:n,fileName:"key.ish"},"Save key")),a.a.createElement("p",{style:{paddingLeft:20}},n)),a.a.createElement("div",null,a.a.createElement("h2",null," Data "),a.a.createElement("div",{style:{display:"flex",justifyContent:"space-evenly",alignItems:"center"}},a.a.createElement(m,{onClick:function(){return C(H)}},a.a.createElement("span",{style:{display:"flex",marginRight:8,height:20,width:20}},a.a.createElement(j,{size:20})),"Create Data"),a.a.createElement(p,{label:"Upload data",onChange:function(e){var t=e.target.files[0];if(t){var n=new FileReader;n.onloadend=function(){"string"===typeof n.result&&h(n.result)},n.readAsText(t)}}}),a.a.createElement(b,{data:d,fileName:"data.ish"},"Save Data")))),a.a.createElement("div",null,x&&a.a.createElement(V,{node:JSON.parse(x),setParentValue:function(e){C(JSON.stringify(e))}}))))},I=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function T(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}o.a.render(a.a.createElement(F,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/minder",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/minder","/service-worker.js");I?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var r=n.headers.get("content-type");404===n.status||null!=r&&-1===r.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):T(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):T(t,e)}))}}()},8:function(e,t,n){e.exports=n(14)}},[[8,1,2]]]);
//# sourceMappingURL=main.4ab49290.chunk.js.map