(this.webpackJsonpminder=this.webpackJsonpminder||[]).push([[9],{202:function(t,e,n){"use strict";n.d(e,"a",(function(){return v})),n.d(e,"c",(function(){return m})),n.d(e,"d",(function(){return g})),n.d(e,"e",(function(){return w})),n.d(e,"b",(function(){return A}));var r=n(79),a=n.n(r),c=n(38),o=n(41),i=n(91),u=n(197);function s(t){return String.fromCharCode.apply(null,new Uint16Array(t))}function l(t){for(var e=new ArrayBuffer(2*t.length),n=new Uint16Array(e),r=0,a=t.length;r<a;r++)n[r]=t.charCodeAt(r);return e}function d(t){return String.fromCharCode.apply(null,new Uint8Array(t))}function p(t){return function(t){var e=new Uint8Array(t.length);return Array.prototype.forEach.call(e,(function(e,n,r){r[n]=t.charCodeAt(n)})),btoa(d(e.buffer))}(d(t))}function j(t){return function(t){for(var e=new ArrayBuffer(t.length),n=new Uint8Array(e),r=0,a=t.length;r<a;r++)n[r]=t.charCodeAt(r);return e}(function(t){var e=atob(t),n=new Uint8Array(e.length);return Array.prototype.forEach.call(n,(function(t,n,r){r[n]=e.charCodeAt(n)})),d(n.buffer)}(t))}function b(t){return function(t){var e=new Uint16Array(t.length);return Array.prototype.forEach.call(e,(function(e,n,r){r[n]=t.charCodeAt(n)})),btoa(d(e.buffer))}(s(t))}function f(t){return l(function(t){var e=atob(t),n=new Uint8Array(e.length);return Array.prototype.forEach.call(n,(function(t,n,r){r[n]=e.charCodeAt(n)})),s(n.buffer)}(t))}var h=n(0);function y(){return(y=Object(i.a)(a.a.mark((function t(e,n){var r,c,o;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=window.crypto.getRandomValues(new Uint8Array(12)),t.next=3,window.crypto.subtle.importKey("raw",f(n),{name:"AES-GCM",length:256},!0,["encrypt","decrypt"]);case 3:return c=t.sent,t.next=6,window.crypto.subtle.encrypt({name:"AES-GCM",iv:r},c,l(e));case 6:return o=t.sent,t.abrupt("return","".concat(p(r),"!").concat(b(o)));case 8:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function O(){return(O=Object(i.a)(a.a.mark((function t(e,n){var r,c,i,u,l,d;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.split("!"),c=Object(o.a)(r,2),i=c[0],u=c[1],t.next=3,window.crypto.subtle.importKey("raw",f(n),{name:"AES-GCM",length:256},!0,["encrypt","decrypt"]);case 3:return l=t.sent,t.next=6,window.crypto.subtle.decrypt({name:"AES-GCM",iv:j(i)},l,f(u));case 6:return d=t.sent,t.abrupt("return",s(d));case 8:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function v(){return x.apply(this,arguments)}function x(){return(x=Object(i.a)(a.a.mark((function t(){var e,n;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,window.crypto.subtle.generateKey({name:"AES-GCM",length:256},!0,["encrypt","decrypt"]);case 2:return e=t.sent,t.next=5,window.crypto.subtle.exportKey("raw",e);case 5:return n=t.sent,t.abrupt("return",b(n));case 7:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function m(t){return/^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/.test(t)&&44===t.length}function g(t,e,n){var r=Object(h.useState)(null),a=Object(o.a)(r,2),i=a[0],s=a[1];return Object(h.useEffect)((function(){null!==t&&s(Object(u.d)(t,{title:n,encryptionKey:e}))}),[t,e,n]),null===i?null:{store:i,updateNodes:function(t){var e=Object(c.a)({},i.nodes);t.forEach((function(t){return e[t.key]=t}));var n={rootNode:Object(c.a)(Object(c.a)({},i.rootNode),{},{updated:new Date}),nodes:e};s(n)}}}function w(t,e){var n=Object(h.useState)(null),r=Object(o.a)(n,2),a=r[0],c=r[1],i=Object(h.useState)(!1),u=Object(o.a)(i,2),s=u[0],l=u[1];return Object(h.useEffect)((function(){"{"===t[0]?(c(t),l(!1)):function(t,e){return O.apply(this,arguments)}(t,e).then((function(t){c(t),l(!1)})).catch((function(){l(!0),c("{}")}))}),[t,e]),{decryptedData:a,hasFailed:s}}function A(t,e){(function(t,e){return y.apply(this,arguments)})(Object(u.c)(t),t.rootNode.encryptionKey).then(e)}},213:function(t,e,n){"use strict";n.d(e,"a",(function(){return O}));var r=n(41),a=n(5),c=n(292),o=n(293),i=n(328),u=n(192),s=n(294),l=n(246),d=n(295),p=n(193),j=n(0),b=n(223),f=n(214),h=n(202),y=n(198);function O(){var t=Object(j.useState)(!0),e=Object(r.a)(t,2),n=e[0],O=e[1],v=Object(y.b)().store;return Object(a.jsxs)(c.a,{style:{maxWidth:400},variant:"outlined",children:[Object(a.jsx)(o.a,{title:v.rootNode.title,subheader:Object(a.jsx)(i.a,{title:"double click to show",placement:"top",children:Object(a.jsx)(u.a,{variant:"body2",color:"textSecondary",gutterBottom:!0,onDoubleClick:function(){return O((function(t){return!t}))},children:n?Object(a.jsx)(b.a,{style:{height:12,width:"100%",marginTop:8,display:"block"}}):v.rootNode.encryptionKey})})}),Object(a.jsx)(s.a,{children:Object(a.jsxs)(l.a,{container:!0,spacing:1,children:[Object(a.jsxs)(l.a,{item:!0,xs:6,children:[Object(a.jsx)(u.a,{variant:"body2",children:"Created"}),Object(a.jsx)(u.a,{variant:"body2",color:"textSecondary",gutterBottom:!0,children:Object(f.a)(v.rootNode.created)})]}),Object(a.jsxs)(l.a,{item:!0,xs:6,children:[Object(a.jsx)(u.a,{variant:"body2",children:"Last Updated"}),Object(a.jsx)(u.a,{variant:"body2",color:"textSecondary",gutterBottom:!0,children:Object(f.a)(v.rootNode.updated)})]})]})}),Object(a.jsxs)(d.a,{children:[Object(a.jsx)(p.a,{size:"small",color:"primary",href:"data:text/plain;charset=base64,".concat(v.rootNode.encryptionKey),download:"key.ish",children:"Save Key"}),Object(a.jsx)(p.a,{size:"small",color:"primary",onClick:function(){Object(h.b)(v,(function(t){var e=document.createElement("a");e.setAttribute("href","data:text/plain;charset=base64,"+encodeURIComponent(t)),e.setAttribute("download","data.ish"),e.style.display="none",document.body.appendChild(e),e.click(),document.body.removeChild(e)}))},children:"Save Data"})]})]})}},221:function(t,e,n){"use strict";n.d(e,"a",(function(){return b}));var r=n(5),a=n(58),c=n(125),o=n(328),i=n(183),u=n(202),s=n(222),l=n(213),d=n(208),p=n(307),j=n(198);n(0);function b(t){var e=t.children,n=t.title,b=t.isReadOnly,f=void 0!==b&&b,h=t.initialValues,y=h.encryptionKey,O=h.initialData,v=t.onClose,x=Object(a.a)(),m=Object(s.b)(),g=Object(u.e)(O,y).decryptedData,w=Object(u.d)(g,y,n);if(!w)return null;var A=w.store,C=w.updateNodes;return Object(r.jsx)(s.a.Provider,{value:m,children:Object(r.jsx)(j.a.Provider,{value:{store:A,updateNodes:f?null:C},children:Object(r.jsxs)(c.a,{style:{position:"relative",padding:x.spacing(3)},children:[Object(r.jsx)("div",{style:{position:"absolute",right:x.spacing(1),top:x.spacing(1)},children:Object(r.jsx)(o.a,{title:"Did you save? Just checking",arrow:!0,children:Object(r.jsx)(i.a,{"aria-label":"close card",onClick:v,children:Object(r.jsx)(p.a,{})})})}),Object(r.jsx)(l.a,{}),Object(r.jsx)("div",{style:{height:x.spacing(3)}}),Object(r.jsx)(d.a,{nodeKey:A.rootNode.value}),e&&e(A)]})})})}},320:function(t,e,n){"use strict";n.r(e);var r=n(41),a=n(89),c=n(5),o=n(125),i=n(192),u=n(58),s=n(327),l=n(193),d=n(0),p=n(197),j=n(37),b=n(221),f=n(208),h=n(198),y=n(16);function O(){var t=Object(a.a)(["\n  query StandardPage {\n    user {\n      uuid\n    }\n    standardProposal {\n      version\n      data\n    }\n    proposals {\n      uuid\n    }\n  }\n"]);return O=function(){return t},t}function v(){var t=Object(a.a)(["\n  mutation Adding($proposal: String!) {\n    addProposal(proposal: $proposal) {\n      uuid\n    }\n  }\n"]);return v=function(){return t},t}var x=Object(j.gql)(v()),m=Object(j.gql)(O());function g(t){var e=t.standardProposal,n=Object(p.d)(e.data,{});return Object(c.jsx)(h.a.Provider,{value:{store:n,updateNodes:null},children:Object(c.jsxs)(o.a,{style:{position:"relative",padding:24},children:[Object(c.jsxs)(i.a,{variant:"h2",children:["Proposed API ",e.version]}),Object(c.jsx)(f.a,{nodeKey:n.rootNode.value})]})})}var w={"?Parent field":{"Proposed Field":{type:"text",description:"# in markdown","?subfields":["more fields"]}}};function A(){var t=Object(d.useState)(!1),e=Object(r.a)(t,2),n=e[0],a=e[1],f=Object(u.a)(),h=Object(d.useState)(""),y=Object(r.a)(h,2),O=y[0],v=y[1],m=Object(j.useMutation)(x),g=Object(r.a)(m,1)[0];return n?Object(c.jsx)(b.a,{initialValues:{encryptionKey:"1Qd1fIUBT6KuzgM9mQOIkk8k77mkXz/4BGMnttcdY1c=",initialData:JSON.stringify(w)},title:O,onClose:function(){return a(!1)},children:function(t){return Object(c.jsx)(l.a,{fullWidth:!0,variant:"contained",color:"primary",onClick:function(){g({variables:{proposal:Object(p.c)(t)}}),a(!1),v("")},style:{marginTop:f.spacing(2)},children:"Make new proposal"})}}):Object(c.jsxs)(o.a,{style:{padding:f.spacing(2),margin:"".concat(f.spacing(2),"px auto"),maxWidth:380},children:[Object(c.jsx)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},children:Object(c.jsx)(i.a,{variant:"h5",children:"Start"})}),Object(c.jsx)(s.a,{variant:"outlined",margin:"normal",fullWidth:!0,label:"Title",value:O,onChange:function(t){return v(t.target.value)},autoFocus:!0,style:{marginBottom:f.spacing(2)}}),Object(c.jsx)(l.a,{fullWidth:!0,variant:"contained",color:"primary",onClick:function(){return a(!0)},children:"Make new proposal"})]})}function C(t){var e=t.proposals,n=Object(y.f)();return Object(c.jsxs)(o.a,{style:{position:"relative",padding:24},children:[Object(c.jsx)(i.a,{variant:"h2",children:"All Proposals"}),Object(c.jsx)("ul",{children:e.map((function(t){var e=t.uuid;return Object(c.jsxs)("li",{children:["Proposal ",e,":",Object(c.jsx)(l.a,{variant:"contained",color:"primary",onClick:function(){return n.push("/minder/proposal/".concat(e))},children:"Check it out"})]},e)}))})]})}e.default=function(){var t,e=Object(j.useQuery)(m).data;if(null==e)return null;var n=e.standardProposal,r=e.proposals;return Object(c.jsxs)("div",{children:[Object(c.jsx)(g,{standardProposal:n}),null!=(null===(t=e.user)||void 0===t?void 0:t.uuid)&&Object(c.jsx)(A,{}),Object(c.jsx)(C,{proposals:r})]})}}}]);
//# sourceMappingURL=9.52213512.chunk.js.map