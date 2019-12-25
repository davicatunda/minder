(this.webpackJsonpminder=this.webpackJsonpminder||[]).push([[0],{14:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(6),c=n.n(o),i=n(1);var l=function(e){var t=e.fontSize,n=e.children;return a.a.createElement("svg",{style:{fill:"currentColor",width:"1em",height:"1em",display:"inline-block",transition:"fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",flexShrink:0,fontSize:null!==t&&void 0!==t?t:"1.5rem"},focusable:"false",viewBox:"0 0 24 24","aria-hidden":"true",role:"presentation"},n)};var u=function(e){var t=e.size;return a.a.createElement(l,{fontSize:t},a.a.createElement("path",{d:"M21 3.01H3c-1.1 0-2 .9-2 2V9h2V4.99h18v14.03H3V15H1v4.01c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98v-14c0-1.11-.9-2-2-2zM11 16l4-4-4-4v3H1v2h10v3z"}))},s=n(3),f={border:0,padding:"6px 16px",minWidth:64,boxSizing:"border-box",boxShadow:"\n    0px 3px 1px -2px rgba(0,0,0,0.2),\n    0px 2px 2px 0px rgba(0,0,0,0.14),\n    0px 1px 5px 0px rgba(0,0,0,0.12)\n  ",borderRadius:4,display:"inline-flex",alignItems:"center",color:"#fff",fontWeight:500,lineHeight:1.75,textTransform:"uppercase",fontSize:"0.875rem",letterSpacing:"0.02857em",backgroundColor:"#1976d2",cursor:"pointer"},d=Object(s.a)({},f,{backgroundColor:"#e0e0e0",cursor:"not-allowed",color:"rgba(0, 0, 0, 0.4)"});var p=function(e){return!0===e.disabled?a.a.createElement("button",{style:d,disabled:!0},e.children):a.a.createElement("button",{onClick:e.onClick,style:f},e.children)};var m=function(e){return a.a.createElement("label",{style:f},a.a.createElement("input",{style:{display:"none"},type:"file",onChange:e.onChange}),a.a.createElement("span",{style:{display:"flex",marginRight:8,height:20,width:20}},a.a.createElement(u,{size:20})),e.label)};var h=function(e){var t=e.size;return a.a.createElement(l,{fontSize:t},a.a.createElement("path",{d:"M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"}))};function b(e){var t=e.children;return a.a.createElement(a.a.Fragment,null,a.a.createElement("span",{style:{display:"flex",marginRight:8,height:20,width:20}},a.a.createElement(h,{size:20})),t)}var v=function(e){if(null==e.data)return a.a.createElement(p,{disabled:!0},a.a.createElement(b,null,e.children));var t=Object(s.a)({},f,{textDecoration:"inherit"}),n="data:text/plain;charset=base64,".concat(e.data);return a.a.createElement("a",{style:t,href:n,download:e.fileName},a.a.createElement(b,null,e.children))},y=n(7),g=n(4);var E=function(e){var t=e.name,n=e.value,o=e.setValue,c=Object(r.useState)(!1),l=Object(i.a)(c,2),u=l[0],s=l[1];return u?a.a.createElement("input",{type:"text",name:t,onChange:function(e){return o(e.target.value)},value:n,onBlur:function(){return s(!1)},ref:function(e){e&&e.focus()},onKeyDown:function(e){"Enter"===e.key&&s(!1)}}):a.a.createElement("span",{onClick:function(){return s(!0)},style:{minWidth:40,display:"inline-block",cursor:"pointer"}},""===n?"?":n)};var w=function(e){var t=e.name,n=e.value,r=e.setValue;return a.a.createElement("input",{type:"checkbox",checked:n,name:t,onChange:function(e){return r(!n)},value:n,style:{cursor:"pointer"}})};var x=function(e){var t=e.name,n=e.value,o=e.setValue,c=Object(r.useState)(!1),l=Object(i.a)(c,2),u=l[0],s=l[1];return u?a.a.createElement("input",{type:"number",name:t,onChange:function(e){return!isNaN(e.target.value)&&o(Number(e.target.value))},value:n,onBlur:function(){return s(!1)},ref:function(e){e&&e.focus()},onKeyDown:function(e){"Enter"===e.key&&s(!1)}}):a.a.createElement("span",{onClick:function(){return s(!0)},style:{cursor:"pointer"}},n)};function C(e){var t=e.getFullYear().toString(),n=(e.getMonth()+1).toString().padStart(2,"0"),r=e.getDate().toString().padStart(2,"0");return"".concat(t,"-").concat(n,"-").concat(r)}var S=function(e){var t=e.name,n=e.value,o=e.setValue,c=Object(r.useState)(!1),l=Object(i.a)(c,2),u=l[0],s=l[1];return u?a.a.createElement("input",{type:"date",name:t,onBlur:function(){return s(!1)},onChange:function(e){return o(function(e){var t=e.split("-"),n=Object(i.a)(t,3),r=n[0],a=n[1],o=n[2];return new Date(Number(r),Number(a)-1,Number(o))}(e.target.value))},value:C(n),onKeyDown:function(e){"Enter"===e.key&&s(!1)}}):a.a.createElement("span",{onClick:function(){return s(!0)}},function(e){var t=e.getFullYear().toString(),n=(e.getMonth()+1).toString().padStart(2,"0"),r=e.getDate().toString().padStart(2,"0");return"".concat(n,"-").concat(r,"-").concat(t)}(n))};var k=function(e){var t=e.size;return a.a.createElement(l,{fontSize:t},a.a.createElement("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"}))};var j=function(e){return a.a.createElement("button",{onClick:e.onAddItem,style:{background:"none",border:0,padding:0,margin:0,cursor:"pointer"}},a.a.createElement(k,{size:20}))};var A=function(e){var t=e.size;return a.a.createElement(l,{fontSize:t},a.a.createElement("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"}))};var O=function(e){var t=Object(r.useState)(!1),n=Object(i.a)(t,2),o=n[0],c=n[1];return o?a.a.createElement(a.a.Fragment,null,a.a.createElement("button",{onClick:function(){return e.setValue(!1)}},"checkbox"),a.a.createElement("button",{onClick:function(){return e.setValue(0)}},"number"),a.a.createElement("button",{onClick:function(){return e.setValue("")}},"text"),a.a.createElement("button",{onClick:function(){return e.setValue(new Date)}},"date"),a.a.createElement("button",{onClick:function(){return e.setValue([])}},"list"),a.a.createElement("button",{onClick:function(){return e.setValue({})}},"object")):a.a.createElement("button",{onClick:function(){return c(!0)},style:{background:"none",border:0,padding:0,margin:0,cursor:"pointer"}},a.a.createElement(A,{size:20}))};var z=function(e){var t=e.name,n=e.setName,o=Object(r.useState)(!1),c=Object(i.a)(o,2),l=c[0],u=c[1],f={marginRight:12,width:80,boxSizing:"border-box"};return l?a.a.createElement("input",{type:"text",name:"name",style:f,onChange:function(e){return n(e.target.value)},value:t,onBlur:function(){return u(!1)},ref:function(e){e&&e.focus()},onKeyDown:function(e){"Enter"===e.key&&u(!1)}}):a.a.createElement("span",{onClick:function(){return u(!0)},style:Object(s.a)({fontWeight:"bold",cursor:"pointer"},f)},""===t?"?":t)},V={listStyle:"none",paddingLeft:24,borderLeft:"1px solid #00000030",margin:"4px 0 8px 0"},N={padding:4,display:"flex",alignItems:"center"};var R=function e(t){var n=t.node,r=t.setParentValue;return a.a.createElement("ul",{style:V},Object.keys(n).map((function(t,o){return a.a.createElement("li",{style:N,key:o},!(n instanceof Array)&&a.a.createElement(z,{name:t,setName:function(e){var a=Object.keys(n).reduce((function(r,a){return a===t?r[e]=n[a]:r[a]=n[a],r}),{});r(a)}}),function(){var o=n[t],c=n instanceof Array?function(e){return r(n.map((function(n,r){return r===Number(t)?e:n})))}:function(e){return r(Object(s.a)({},n,Object(g.a)({},t,e)))};if(null===o)return a.a.createElement(O,{name:t,setValue:c});switch(typeof o){case"string":return function(e){return RegExp(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/).test(e)}(o)?a.a.createElement(S,{name:t,value:new Date(o),setValue:c}):a.a.createElement(E,{name:t,value:o,setValue:c});case"number":return a.a.createElement(x,{name:t,value:o,setValue:c});case"boolean":return a.a.createElement(w,{name:t,value:o,setValue:c});case"object":default:return a.a.createElement(e,{node:o,setParentValue:c})}}())})),a.a.createElement("li",{style:N},a.a.createElement(j,{onAddItem:function(){if(n instanceof Array)return r([].concat(Object(y.a)(n),[null]));var e=Object.keys(n).reverse().find((function(e){return RegExp(/field:[0-9]+/).test(e)})),t=e?Number(e.split(":")[1]):0;return r(Object(s.a)({},n,Object(g.a)({},"field:".concat(t+1),null)))}})))},M=n(2),U=n.n(M);function D(e){return String.fromCharCode.apply(null,new Uint16Array(e))}function W(e){for(var t=new ArrayBuffer(2*e.length),n=new Uint16Array(t),r=0,a=e.length;r<a;r++)n[r]=e.charCodeAt(r);return t}function K(e){return String.fromCharCode.apply(null,new Uint8Array(e))}function B(e){return function(e){var t=new Uint8Array(e.length);return Array.prototype.forEach.call(t,(function(t,n,r){r[n]=e.charCodeAt(n)})),btoa(K(t.buffer))}(K(e))}function H(e){return function(e){for(var t=new ArrayBuffer(e.length),n=new Uint8Array(t),r=0,a=e.length;r<a;r++)n[r]=e.charCodeAt(r);return t}(function(e){var t=atob(e),n=new Uint8Array(t.length);return Array.prototype.forEach.call(n,(function(e,n,r){r[n]=t.charCodeAt(n)})),K(n.buffer)}(e))}function I(e){return function(e){var t=new Uint16Array(e.length);return Array.prototype.forEach.call(t,(function(t,n,r){r[n]=e.charCodeAt(n)})),btoa(K(t.buffer))}(D(e))}function L(e){return W(function(e){var t=atob(e),n=new Uint8Array(t.length);return Array.prototype.forEach.call(n,(function(e,n,r){r[n]=t.charCodeAt(n)})),D(n.buffer)}(e))}var F='{\n  "boolean": true,\n  "text": "text",\n  "number": 10,\n  "array": [\n    "zero",\n    "first",\n    "second",\n    "third",\n    "forth"\n  ],\n  "null": null,\n  "object2": {\n    "string": "test",\n    "null": null\n  },\n  "object": {\n    "prop": false\n  }\n}';var P=function(){var e=Object(r.useState)(null),t=Object(i.a)(e,2),n=t[0],o=t[1],c=Object(r.useState)(!1),l=Object(i.a)(c,2),u=(l[0],l[1]),s=Object(r.useState)(null),f=Object(i.a)(s,2),d=f[0],h=f[1],b=Object(r.useState)(!1),y=Object(i.a)(b,2),g=(y[0],y[1]),E=Object(r.useState)(null),w=Object(i.a)(E,2),x=w[0],C=w[1];return Object(r.useEffect)((function(){null!=d&&null!=n&&(g(!0),function(e,t){var n,r,a,o,c,l;return U.a.async((function(u){for(;;)switch(u.prev=u.next){case 0:return n=e.split("!"),r=Object(i.a)(n,2),a=r[0],o=r[1],u.next=3,U.a.awrap(window.crypto.subtle.importKey("raw",L(t),{name:"AES-GCM",length:256},!0,["encrypt","decrypt"]));case 3:return c=u.sent,u.next=6,U.a.awrap(window.crypto.subtle.decrypt({name:"AES-GCM",iv:H(a)},c,L(o)));case 6:return l=u.sent,u.abrupt("return",D(l));case 8:case"end":return u.stop()}}))}(d,n).then((function(e){C(e),g(!1)})))}),[d,n]),Object(r.useEffect)((function(){null!=x&&null!=n&&(u(!0),function(e,t){var n,r,a;return U.a.async((function(o){for(;;)switch(o.prev=o.next){case 0:return n=window.crypto.getRandomValues(new Uint8Array(12)),o.next=3,U.a.awrap(window.crypto.subtle.importKey("raw",L(t),{name:"AES-GCM",length:256},!0,["encrypt","decrypt"]));case 3:return r=o.sent,o.next=6,U.a.awrap(window.crypto.subtle.encrypt({name:"AES-GCM",iv:n},r,W(e)));case 6:return a=o.sent,o.abrupt("return","".concat(B(n),"!").concat(I(a)));case 8:case"end":return o.stop()}}))}(x,n).then((function(e){h(e),u(!1)})))}),[x,n]),a.a.createElement("div",null,a.a.createElement("div",{style:{maxWidth:500,boxShadow:"rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px",borderRadius:4,padding:12}},a.a.createElement("h1",null,"Primary"),a.a.createElement("div",null,a.a.createElement("div",null,a.a.createElement("h2",null," Key "),a.a.createElement("div",{style:{display:"flex",justifyContent:"space-evenly",alignItems:"center"}},a.a.createElement(p,{onClick:function(){(function(){var e,t;return U.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,U.a.awrap(window.crypto.subtle.generateKey({name:"AES-GCM",length:256},!0,["encrypt","decrypt"]));case 2:return e=n.sent,n.next=5,U.a.awrap(window.crypto.subtle.exportKey("raw",e));case 5:return t=n.sent,n.abrupt("return",I(t));case 7:case"end":return n.stop()}}))})().then(o)}},a.a.createElement("span",{style:{display:"flex",marginRight:8,height:20,width:20}},a.a.createElement(A,{size:20})),"Create Key"),a.a.createElement(m,{label:"Upload key",onChange:function(e){var t=e.target.files[0];if(t){var n=new FileReader;n.onloadend=function(){"string"===typeof n.result&&o(n.result)},n.readAsText(t)}}}),a.a.createElement(v,{data:n,fileName:"key.ish"},"Save key")),a.a.createElement("p",{style:{paddingLeft:20}},n)),a.a.createElement("div",null,a.a.createElement("h2",null," Data "),a.a.createElement("div",{style:{display:"flex",justifyContent:"space-evenly",alignItems:"center"}},a.a.createElement(p,{onClick:function(){return C(F)}},a.a.createElement("span",{style:{display:"flex",marginRight:8,height:20,width:20}},a.a.createElement(A,{size:20})),"Create Data"),a.a.createElement(m,{label:"Upload data",onChange:function(e){var t=e.target.files[0];if(t){var n=new FileReader;n.onloadend=function(){"string"===typeof n.result&&h(n.result)},n.readAsText(t)}}}),a.a.createElement(v,{data:d,fileName:"data.ish"},"Save Data")))),a.a.createElement("div",{style:{margin:12}},x&&a.a.createElement(R,{node:JSON.parse(x),setParentValue:function(e){C(JSON.stringify(e))}}))))},T=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function G(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}c.a.render(a.a.createElement(P,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/minder",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/minder","/service-worker.js");T?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var r=n.headers.get("content-type");404===n.status||null!=r&&-1===r.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):G(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):G(t,e)}))}}()},8:function(e,t,n){e.exports=n(14)}},[[8,1,2]]]);
//# sourceMappingURL=main.425a2eba.chunk.js.map