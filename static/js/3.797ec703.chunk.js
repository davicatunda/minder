(this.webpackJsonpminder=this.webpackJsonpminder||[]).push([[3],{85:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var r=n(87);function a(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var n=[],r=!0,a=!1,o=void 0;try{for(var i,c=e[Symbol.iterator]();!(r=(i=c.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(u){a=!0,o=u}finally{try{r||null==c.return||c.return()}finally{if(a)throw o}}return n}}(e,t)||Object(r.a)(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},86:function(e,t,n){"use strict";var r=n(2),a=n.n(r);t.a=function(e){var t=e.fontSize,n=e.children;return a.a.createElement("svg",{style:{fill:"currentColor",width:"1em",height:"1em",display:"inline-block",transition:"fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",flexShrink:0,fontSize:null!==t&&void 0!==t?t:"1.5rem"},focusable:"false",viewBox:"0 0 24 24","aria-hidden":"true",role:"presentation"},n)}},87:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var r=n(88);function a(e,t){if(e){if("string"===typeof e)return Object(r.a)(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(r.a)(e,t):void 0}}},88:function(e,t,n){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}n.d(t,"a",(function(){return r}))},89:function(e,t,n){"use strict";var r=n(2),a=n.n(r),o=n(86);t.a=function(e){var t=e.size;return a.a.createElement(o.a,{fontSize:t},a.a.createElement("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"}))}},90:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var r=n(42),a=n(2),o=n.n(a),i={border:0,padding:"6px 16px",minWidth:64,boxSizing:"border-box",boxShadow:"\n    0px 3px 1px -2px rgba(0,0,0,0.2),\n    0px 2px 2px 0px rgba(0,0,0,0.14),\n    0px 1px 5px 0px rgba(0,0,0,0.12)\n  ",borderRadius:4,display:"inline-flex",alignItems:"center",color:"#fff",fontWeight:500,lineHeight:1.75,textTransform:"uppercase",fontSize:"0.875rem",letterSpacing:"0.02857em",backgroundColor:"#1976d2",cursor:"pointer"},c=Object(r.a)(Object(r.a)({},i),{},{backgroundColor:"#e0e0e0",cursor:"not-allowed",color:"rgba(0, 0, 0, 0.4)"});t.b=function(e){return!0===e.disabled?o.a.createElement("button",{style:c,disabled:!0},e.children):o.a.createElement("button",{onClick:e.onClick,style:i},e.children)}},91:function(e,t,n){"use strict";var r=n(42),a=n(88);var o=n(87);function i(e){return function(e){if(Array.isArray(e))return Object(a.a)(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||Object(o.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var c=n(47),u=n(2),l=n.n(u),s=n(85),f=function(e){return l.a.createElement("button",Object.assign({},e,{style:{background:"none",border:0,padding:0,margin:0,cursor:"pointer"}}))},d=n(86),p=function(e){var t=e.size;return l.a.createElement(d.a,{fontSize:t},l.a.createElement("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"}))},h=function(e){var t=e.name,n=e.value,r=e.setValue,a=Object(u.useState)(!1),o=Object(s.a)(a,2),i=o[0],c=o[1];return i?l.a.createElement("div",{style:{display:"flex",alignItems:"center"}},l.a.createElement("input",{type:"text",name:t,onChange:function(e){return r(e.target.value)},value:n,onBlur:function(){return c(!1)},ref:function(e){e&&e.focus()},onKeyDown:function(e){"Enter"===e.key&&c(!1)}}),l.a.createElement(f,{onMouseDown:function(){return r(void 0)}},l.a.createElement(p,{size:20}))):l.a.createElement("span",{onClick:function(){return c(!0)},style:{minWidth:40,display:"inline-block",cursor:"pointer"}},""===n?"?":n)},m=function(e){var t=e.name,n=e.value,r=e.setValue,a=Object(u.useState)(!1),o=Object(s.a)(a,2),i=o[0],c=o[1];return i?l.a.createElement("div",{style:{display:"flex",alignItems:"center"}},l.a.createElement("input",{type:"checkbox",checked:n,name:t,onChange:function(e){return r(!n)},ref:function(e){e&&e.focus()},onBlur:function(){return c(!1)},style:{cursor:"pointer"}}),l.a.createElement(f,{onMouseDown:function(){return r(void 0)}},l.a.createElement(p,{size:20}))):l.a.createElement("span",{onClick:function(){return c(!0)},style:{cursor:"pointer"}},n?"yes":"no")},y=function(e){var t=e.name,n=e.value,r=e.setValue,a=Object(u.useState)(!1),o=Object(s.a)(a,2),i=o[0],c=o[1];return i?l.a.createElement("div",{style:{display:"flex",alignItems:"center"}},l.a.createElement("input",{type:"number",name:t,onChange:function(e){return!isNaN(Number(e.target.value))&&r(Number(e.target.value))},value:n,onBlur:function(){return c(!1)},ref:function(e){e&&e.focus()},onKeyDown:function(e){"Enter"===e.key&&c(!1)}}),l.a.createElement(f,{onMouseDown:function(){return r(void 0)}},l.a.createElement(p,{size:20}))):l.a.createElement("span",{onClick:function(){return c(!0)},style:{cursor:"pointer"}},n)};function v(e){var t=e.getFullYear().toString(),n=(e.getMonth()+1).toString().padStart(2,"0"),r=e.getDate().toString().padStart(2,"0");return"".concat(t,"-").concat(n,"-").concat(r)}var b=function(e){var t=e.name,n=e.value,r=e.setValue,a=Object(u.useState)(!1),o=Object(s.a)(a,2),i=o[0],c=o[1];return i?l.a.createElement("div",{style:{display:"flex",alignItems:"center"}},l.a.createElement("input",{type:"date",name:t,onBlur:function(){return c(!1)},onChange:function(e){return r(function(e){var t=e.split("-"),n=Object(s.a)(t,3),r=n[0],a=n[1],o=n[2];return new Date(Number(r),Number(a)-1,Number(o))}(e.target.value))},value:v(n),ref:function(e){e&&e.focus()},onKeyDown:function(e){"Enter"===e.key&&c(!1)}}),l.a.createElement(f,{onMouseDown:function(){return r(void 0)}},l.a.createElement(p,{size:20}))):l.a.createElement("span",{onClick:function(){return c(!0)}},function(e){var t=e.getFullYear().toString(),n=(e.getMonth()+1).toString().padStart(2,"0"),r=e.getDate().toString().padStart(2,"0");return"".concat(n,"-").concat(r,"-").concat(t)}(n))},g=n(89),E=function(e){var t=Object(u.useState)(!1),n=Object(s.a)(t,2),r=n[0],a=n[1];return r?l.a.createElement(l.a.Fragment,null,l.a.createElement("button",{onClick:function(){return e.setValue(!1)}},"checkbox"),l.a.createElement("button",{onClick:function(){return e.setValue(0)}},"number"),l.a.createElement("button",{onClick:function(){return e.setValue("")}},"text"),l.a.createElement("button",{onClick:function(){return e.setValue(new Date)}},"date"),l.a.createElement("button",{onClick:function(){return e.setValue([])}},"list"),l.a.createElement("button",{onClick:function(){return e.setValue({})}},"object")):l.a.createElement("div",{style:{display:"flex",alignItems:"center"}},l.a.createElement(f,{onClick:function(){return a(!0)}},l.a.createElement(g.a,{size:20})),l.a.createElement(f,{onMouseDown:function(){return e.setValue(void 0)}},l.a.createElement(p,{size:20})))},w={marginRight:12,width:120,boxSizing:"border-box"},x=function(e){var t=e.name,n=e.setName,a=e.isValid,o=Object(u.useState)(!1),i=Object(s.a)(o,2),c=i[0],f=i[1],d=Object(u.useState)(t),p=Object(s.a)(d,2),h=p[0],m=p[1],y=function(){a(h)&&(n(h),f(!1))};return c?l.a.createElement("input",{type:"text",name:h,style:w,onChange:function(e){return m(e.target.value)},value:h,onBlur:y,ref:function(e){e&&e.focus()},onKeyDown:function(e){"Enter"===e.key&&y()}}):l.a.createElement("span",{onClick:function(){return f(!0)},style:Object(r.a)({fontWeight:"bold",cursor:"pointer",lineHeight:"28px"},w)},""===h?"?":h)},j=function(e){var t=e.size;return l.a.createElement(d.a,{fontSize:t},l.a.createElement("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"}))},O={listStyle:"none",paddingLeft:12,borderLeft:"1px solid #00000030",margin:"4px 0 8px 0"},S={padding:4,display:"flex",alignItems:"center"};t.a=function e(t){var n=t.node,a=t.setParentValue;return l.a.createElement("ul",{style:O},Object.keys(n).map((function(t,r){return l.a.createElement("li",{style:S,key:t},!(n instanceof Array)&&l.a.createElement(x,{name:t,setName:function(e){var r=Object.keys(n).reduce((function(r,a){return a===t?r[e]=n[a]:r[a]=n[a],r}),{});a(r)},isValid:function(e){return e===t||void 0===n[e]}}),function(){var r=n[t],o=function(e){var r=Object.assign({},n,Object(c.a)({},t,e));if(n instanceof Array){var o=Object.values(r);return a(o.filter((function(e){return void 0!==e})))}return a(r)};switch(typeof r){case"string":return function(e){return RegExp(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/).test(e)}(r)?l.a.createElement(b,{name:t,value:new Date(r),setValue:o}):l.a.createElement(h,{name:t,value:r,setValue:o});case"number":return l.a.createElement(y,{name:t,value:r,setValue:o});case"boolean":return l.a.createElement(m,{name:t,value:r,setValue:o});case"object":default:return r instanceof Date?null:null==r?l.a.createElement(E,{name:t,setValue:o}):l.a.createElement(e,{node:r,setParentValue:o})}}())})),l.a.createElement("li",{style:S},l.a.createElement(f,{onClick:function(){if(n instanceof Array)return a([].concat(i(n),[null]));var e=Object.keys(n).reverse().find((function(e){return RegExp(/field:[0-9]+/).test(e)})),t=e?Number(e.split(":")[1]):0;return a(Object(r.a)(Object(r.a)({},n),{},Object(c.a)({},"field:".concat(t+1),null)))}},l.a.createElement(j,{size:20})),0===Object.keys(n).length&&l.a.createElement(f,{onClick:function(){return a(void 0)}},l.a.createElement(p,{size:20}))))}},92:function(e,t,n){e.exports=n(93)},93:function(e,t,n){var r=function(e){"use strict";var t=Object.prototype,n=t.hasOwnProperty,r="function"===typeof Symbol?Symbol:{},a=r.iterator||"@@iterator",o=r.asyncIterator||"@@asyncIterator",i=r.toStringTag||"@@toStringTag";function c(e,t,n){return Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{c({},"")}catch(k){c=function(e,t,n){return e[t]=n}}function u(e,t,n,r){var a=t&&t.prototype instanceof f?t:f,o=Object.create(a.prototype),i=new j(r||[]);return o._invoke=function(e,t,n){var r="suspendedStart";return function(a,o){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===a)throw o;return S()}for(n.method=a,n.arg=o;;){var i=n.delegate;if(i){var c=E(i,n);if(c){if(c===s)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var u=l(e,t,n);if("normal"===u.type){if(r=n.done?"completed":"suspendedYield",u.arg===s)continue;return{value:u.arg,done:n.done}}"throw"===u.type&&(r="completed",n.method="throw",n.arg=u.arg)}}}(e,n,i),o}function l(e,t,n){try{return{type:"normal",arg:e.call(t,n)}}catch(k){return{type:"throw",arg:k}}}e.wrap=u;var s={};function f(){}function d(){}function p(){}var h={};h[a]=function(){return this};var m=Object.getPrototypeOf,y=m&&m(m(O([])));y&&y!==t&&n.call(y,a)&&(h=y);var v=p.prototype=f.prototype=Object.create(h);function b(e){["next","throw","return"].forEach((function(t){c(e,t,(function(e){return this._invoke(t,e)}))}))}function g(e,t){var r;this._invoke=function(a,o){function i(){return new t((function(r,i){!function r(a,o,i,c){var u=l(e[a],e,o);if("throw"!==u.type){var s=u.arg,f=s.value;return f&&"object"===typeof f&&n.call(f,"__await")?t.resolve(f.__await).then((function(e){r("next",e,i,c)}),(function(e){r("throw",e,i,c)})):t.resolve(f).then((function(e){s.value=e,i(s)}),(function(e){return r("throw",e,i,c)}))}c(u.arg)}(a,o,r,i)}))}return r=r?r.then(i,i):i()}}function E(e,t){var n=e.iterator[t.method];if(void 0===n){if(t.delegate=null,"throw"===t.method){if(e.iterator.return&&(t.method="return",t.arg=void 0,E(e,t),"throw"===t.method))return s;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method")}return s}var r=l(n,e.iterator,t.arg);if("throw"===r.type)return t.method="throw",t.arg=r.arg,t.delegate=null,s;var a=r.arg;return a?a.done?(t[e.resultName]=a.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,s):a:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,s)}function w(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function x(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function j(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(w,this),this.reset(!0)}function O(e){if(e){var t=e[a];if(t)return t.call(e);if("function"===typeof e.next)return e;if(!isNaN(e.length)){var r=-1,o=function t(){for(;++r<e.length;)if(n.call(e,r))return t.value=e[r],t.done=!1,t;return t.value=void 0,t.done=!0,t};return o.next=o}}return{next:S}}function S(){return{value:void 0,done:!0}}return d.prototype=v.constructor=p,p.constructor=d,d.displayName=c(p,i,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"===typeof e&&e.constructor;return!!t&&(t===d||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,p):(e.__proto__=p,c(e,i,"GeneratorFunction")),e.prototype=Object.create(v),e},e.awrap=function(e){return{__await:e}},b(g.prototype),g.prototype[o]=function(){return this},e.AsyncIterator=g,e.async=function(t,n,r,a,o){void 0===o&&(o=Promise);var i=new g(u(t,n,r,a),o);return e.isGeneratorFunction(n)?i:i.next().then((function(e){return e.done?e.value:i.next()}))},b(v),c(v,i,"Generator"),v[a]=function(){return this},v.toString=function(){return"[object Generator]"},e.keys=function(e){var t=[];for(var n in e)t.push(n);return t.reverse(),function n(){for(;t.length;){var r=t.pop();if(r in e)return n.value=r,n.done=!1,n}return n.done=!0,n}},e.values=O,j.prototype={constructor:j,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(x),!e)for(var t in this)"t"===t.charAt(0)&&n.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function r(n,r){return i.type="throw",i.arg=e,t.next=n,r&&(t.method="next",t.arg=void 0),!!r}for(var a=this.tryEntries.length-1;a>=0;--a){var o=this.tryEntries[a],i=o.completion;if("root"===o.tryLoc)return r("end");if(o.tryLoc<=this.prev){var c=n.call(o,"catchLoc"),u=n.call(o,"finallyLoc");if(c&&u){if(this.prev<o.catchLoc)return r(o.catchLoc,!0);if(this.prev<o.finallyLoc)return r(o.finallyLoc)}else if(c){if(this.prev<o.catchLoc)return r(o.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return r(o.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var a=this.tryEntries[r];if(a.tryLoc<=this.prev&&n.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var o=a;break}}o&&("break"===e||"continue"===e)&&o.tryLoc<=t&&t<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=e,i.arg=t,o?(this.method="next",this.next=o.finallyLoc,s):this.complete(i)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),s},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.finallyLoc===e)return this.complete(n.completion,n.afterLoc),x(n),s}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc===e){var r=n.completion;if("throw"===r.type){var a=r.arg;x(n)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,n){return this.delegate={iterator:O(e),resultName:t,nextLoc:n},"next"===this.method&&(this.arg=void 0),s}},e}(e.exports);try{regeneratorRuntime=r}catch(a){Function("r","regeneratorRuntime = r")(r)}},97:function(e,t,n){"use strict";n.r(t);var r=n(85),a=n(48),o=n(2),i=n.n(o),c=n(86),u=function(e){var t=e.size;return i.a.createElement(c.a,{fontSize:t},i.a.createElement("path",{d:"M21 3.01H3c-1.1 0-2 .9-2 2V9h2V4.99h18v14.03H3V15H1v4.01c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98v-14c0-1.11-.9-2-2-2zM11 16l4-4-4-4v3H1v2h10v3z"}))},l=n(90),s=function(e){return i.a.createElement("label",{style:l.a},i.a.createElement("input",{style:{display:"none"},type:"file",onChange:e.onChange}),i.a.createElement("span",{style:{display:"flex",marginRight:8,height:20,width:20}},i.a.createElement(u,{size:20})),e.label)},f=n(42),d=function(e){var t=e.size;return i.a.createElement(c.a,{fontSize:t},i.a.createElement("path",{d:"M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"}))},p=function(e){var t=e.children;return i.a.createElement(i.a.Fragment,null,i.a.createElement("span",{style:{display:"flex",marginRight:8,height:20,width:20}},i.a.createElement(d,{size:20})),t)},h=function(e){if(null==e.data)return i.a.createElement(l.b,{disabled:!0},i.a.createElement(p,null,e.children));var t=Object(f.a)(Object(f.a)({},l.a),{},{textDecoration:"inherit"}),n="data:text/plain;charset=base64,".concat(e.data);return i.a.createElement("a",{style:t,href:n,download:e.fileName},i.a.createElement(p,null,e.children))},m=n(91),y=n(89),v=n(23),b=n(92),g=n.n(b);function E(e,t,n,r,a,o,i){try{var c=e[o](i),u=c.value}catch(l){return void n(l)}c.done?t(u):Promise.resolve(u).then(r,a)}function w(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var o=e.apply(t,n);function i(e){E(o,r,a,i,c,"next",e)}function c(e){E(o,r,a,i,c,"throw",e)}i(void 0)}))}}function x(e){return String.fromCharCode.apply(null,new Uint16Array(e))}function j(e){for(var t=new ArrayBuffer(2*e.length),n=new Uint16Array(t),r=0,a=e.length;r<a;r++)n[r]=e.charCodeAt(r);return t}function O(e){return String.fromCharCode.apply(null,new Uint8Array(e))}function S(e){return function(e){var t=new Uint8Array(e.length);return Array.prototype.forEach.call(t,(function(t,n,r){r[n]=e.charCodeAt(n)})),btoa(O(t.buffer))}(O(e))}function k(e){return function(e){for(var t=new ArrayBuffer(e.length),n=new Uint8Array(t),r=0,a=e.length;r<a;r++)n[r]=e.charCodeAt(r);return t}(function(e){var t=atob(e),n=new Uint8Array(t.length);return Array.prototype.forEach.call(n,(function(e,n,r){r[n]=t.charCodeAt(n)})),O(n.buffer)}(e))}function C(e){return function(e){var t=new Uint16Array(e.length);return Array.prototype.forEach.call(t,(function(t,n,r){r[n]=e.charCodeAt(n)})),btoa(O(t.buffer))}(x(e))}function A(e){return j(function(e){var t=atob(e),n=new Uint8Array(t.length);return Array.prototype.forEach.call(n,(function(e,n,r){r[n]=t.charCodeAt(n)})),x(n.buffer)}(e))}function z(){return(z=w(g.a.mark((function e(t,n){var r,a,o;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=window.crypto.getRandomValues(new Uint8Array(12)),e.next=3,window.crypto.subtle.importKey("raw",A(n),{name:"AES-GCM",length:256},!0,["encrypt","decrypt"]);case 3:return a=e.sent,e.next=6,window.crypto.subtle.encrypt({name:"AES-GCM",iv:r},a,j(t));case 6:return o=e.sent,e.abrupt("return","".concat(S(r),"!").concat(C(o)));case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function L(){return(L=w(g.a.mark((function e(t,n){var a,o,i,c,u,l;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.split("!"),o=Object(r.a)(a,2),i=o[0],c=o[1],e.next=3,window.crypto.subtle.importKey("raw",A(n),{name:"AES-GCM",length:256},!0,["encrypt","decrypt"]);case 3:return u=e.sent,e.next=6,window.crypto.subtle.decrypt({name:"AES-GCM",iv:k(i)},u,A(c));case 6:return l=e.sent,e.abrupt("return",x(l));case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function V(){return(V=w(g.a.mark((function e(){var t,n;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,window.crypto.subtle.generateKey({name:"AES-GCM",length:256},!0,["encrypt","decrypt"]);case 2:return t=e.sent,e.next=5,window.crypto.subtle.exportKey("raw",t);case 5:return n=e.sent,e.abrupt("return",C(n));case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var N=JSON.stringify({Personal:{},Community:{},Education:{},Work:{},Health:{}});function M(){var e=Object(a.a)(["\n  query OfflinePage {\n    latestStandard {\n      data\n    }\n  }\n"]);return M=function(){return e},e}var D=Object(v.gql)(M());t.default=function(){var e,t=Object(v.useQuery)(D).data,n=null!==(e=null===t||void 0===t?void 0:t.latestStandard.data)&&void 0!==e?e:N,a=Object(o.useState)(null),c=Object(r.a)(a,2),u=c[0],f=c[1],d=Object(o.useState)(!1),p=Object(r.a)(d,2)[1],b=Object(o.useState)(null),g=Object(r.a)(b,2),E=g[0],w=g[1],x=Object(o.useState)(!1),j=Object(r.a)(x,2)[1],O=Object(o.useState)(null),S=Object(r.a)(O,2),k=S[0],C=S[1];return Object(o.useEffect)((function(){null!=E&&null!=u&&(j(!0),function(e,t){return L.apply(this,arguments)}(E,u).then((function(e){C(e),j(!1)})))}),[E,u]),Object(o.useEffect)((function(){null!=k&&null!=u&&(p(!0),function(e,t){return z.apply(this,arguments)}(k,u).then((function(e){w(e),p(!1)})))}),[k,u]),i.a.createElement("div",null,i.a.createElement("div",{style:{boxShadow:"rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px",borderRadius:4,padding:12}},i.a.createElement("h1",null,"Primary"),i.a.createElement("div",null,i.a.createElement("div",null,i.a.createElement("h2",null," Key "),i.a.createElement("div",{style:{display:"flex",justifyContent:"space-evenly",alignItems:"center"}},i.a.createElement(l.b,{onClick:function(){(function(){return V.apply(this,arguments)})().then(f)}},i.a.createElement("span",{style:{display:"flex",marginRight:8,height:20,width:20}},i.a.createElement(y.a,{size:20})),"Create Key"),i.a.createElement(s,{label:"Upload key",onChange:function(e){var t,n,r=null===e||void 0===e||null===(t=e.target)||void 0===t||null===(n=t.files)||void 0===n?void 0:n[0];if(r){var a=new FileReader;a.onloadend=function(){"string"===typeof a.result&&f(a.result)},a.readAsText(r)}}}),i.a.createElement(h,{data:u,fileName:"key.ish"},"Save key")),i.a.createElement("p",{style:{paddingLeft:20}},u)),i.a.createElement("div",null,i.a.createElement("h2",null," Data "),i.a.createElement("div",{style:{display:"flex",justifyContent:"space-evenly",alignItems:"center"}},i.a.createElement(l.b,{onClick:function(){return C(n)}},i.a.createElement("span",{style:{display:"flex",marginRight:8,height:20,width:20}},i.a.createElement(y.a,{size:20})),"Create Data"),i.a.createElement(s,{label:"Upload data",onChange:function(e){var t,n,r=null===e||void 0===e||null===(t=e.target)||void 0===t||null===(n=t.files)||void 0===n?void 0:n[0];if(r){var a=new FileReader;a.onloadend=function(){"string"===typeof a.result&&w(a.result)},a.readAsText(r)}}}),i.a.createElement(h,{data:E,fileName:"data.ish"},"Save Data")))),i.a.createElement("div",{style:{margin:12}},k&&i.a.createElement(m.a,{node:JSON.parse(k),setParentValue:function(e){C(JSON.stringify(e))}}))))}}}]);
//# sourceMappingURL=3.797ec703.chunk.js.map