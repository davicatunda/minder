(this.webpackJsonpminder=this.webpackJsonpminder||[]).push([[10],{223:function(t,e,n){"use strict";n.d(e,"a",(function(){return v})),n.d(e,"b",(function(){return g}));var r=n(239),a=n.n(r),c=n(38),o=n(42),i=n(240),l=n(194);function u(t){return String.fromCharCode.apply(null,new Uint16Array(t))}function s(t){for(var e=new ArrayBuffer(2*t.length),n=new Uint16Array(e),r=0,a=t.length;r<a;r++)n[r]=t.charCodeAt(r);return e}function d(t){return String.fromCharCode.apply(null,new Uint8Array(t))}function p(t){return function(t){var e=new Uint8Array(t.length);return Array.prototype.forEach.call(e,(function(e,n,r){r[n]=t.charCodeAt(n)})),btoa(d(e.buffer))}(d(t))}function j(t){return function(t){for(var e=new ArrayBuffer(t.length),n=new Uint8Array(e),r=0,a=t.length;r<a;r++)n[r]=t.charCodeAt(r);return e}(function(t){var e=atob(t),n=new Uint8Array(e.length);return Array.prototype.forEach.call(n,(function(t,n,r){r[n]=e.charCodeAt(n)})),d(n.buffer)}(t))}function b(t){return function(t){var e=new Uint16Array(t.length);return Array.prototype.forEach.call(e,(function(e,n,r){r[n]=t.charCodeAt(n)})),btoa(d(e.buffer))}(u(t))}function f(t){return s(function(t){var e=atob(t),n=new Uint8Array(e.length);return Array.prototype.forEach.call(n,(function(t,n,r){r[n]=e.charCodeAt(n)})),u(n.buffer)}(t))}var y=n(0);function h(){return(h=Object(i.a)(a.a.mark((function t(e,n){var r,c,o;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=window.crypto.getRandomValues(new Uint8Array(12)),t.next=3,window.crypto.subtle.importKey("raw",f(n),{name:"AES-GCM",length:256},!0,["encrypt","decrypt"]);case 3:return c=t.sent,t.next=6,window.crypto.subtle.encrypt({name:"AES-GCM",iv:r},c,s(e));case 6:return o=t.sent,t.abrupt("return","".concat(p(r),"!").concat(b(o)));case 8:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function O(){return(O=Object(i.a)(a.a.mark((function t(e,n){var r,c,i,l,s,d;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.split("!"),c=Object(o.a)(r,2),i=c[0],l=c[1],t.next=3,window.crypto.subtle.importKey("raw",f(n),{name:"AES-GCM",length:256},!0,["encrypt","decrypt"]);case 3:return s=t.sent,t.next=6,window.crypto.subtle.decrypt({name:"AES-GCM",iv:j(i)},s,f(l));case 6:return d=t.sent,t.abrupt("return",u(d));case 8:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function v(){return x.apply(this,arguments)}function x(){return(x=Object(i.a)(a.a.mark((function t(){var e,n;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,window.crypto.subtle.generateKey({name:"AES-GCM",length:256},!0,["encrypt","decrypt"]);case 2:return e=t.sent,t.next=5,window.crypto.subtle.exportKey("raw",e);case 5:return n=t.sent,t.abrupt("return",b(n));case 7:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function g(t,e,n){var r="{"===n[0],a=r?function(){return Object(l.d)(n,{title:t,encryptionKey:e})}:null,i=Object(y.useState)(a),u=Object(o.a)(i,2),s=u[0],d=u[1],p=r?null:n;Object(y.useEffect)((function(){null!=p&&function(t,e){return O.apply(this,arguments)}(p,e).then((function(n){d(Object(l.d)(n,{title:t,encryptionKey:e}))}))}),[p,e,t]);var j=Object(y.useState)(null),b=Object(o.a)(j,2),f=b[0],v=b[1];return Object(y.useEffect)((function(){null!=s&&function(t,e){return h.apply(this,arguments)}(Object(l.c)(s),e).then(v)}),[s,e]),null===s||null===f?null:{store:s,updateNodes:function(t){var e=Object(c.a)({},s.nodes);t.forEach((function(t){return e[t.key]=t}));var n={rootNode:Object(c.a)(Object(c.a)({},s.rootNode),{},{updated:new Date}),nodes:e};d(n)},encryptedData:f}}},228:function(t,e,n){"use strict";n.d(e,"a",(function(){return A}));var r=n(5),a=n(58),c=n(123),o=n(301),i=n(179),l=n(183),u=n(213),s=n(42),d=n(265),p=n(266),j=n(267),b=n(268),f=n(181),y=n(0),h=n(214),O=n(205);function v(t){var e=t.rootNode,n=t.encryptedData,a=Object(y.useState)(!0),c=Object(s.a)(a,2),i=c[0],u=c[1];return Object(r.jsxs)(d.a,{style:{maxWidth:400},variant:"outlined",children:[Object(r.jsx)(p.a,{title:"Details"}),Object(r.jsxs)(j.a,{children:[Object(r.jsx)(l.a,{variant:"body2",children:"Title"}),Object(r.jsx)(l.a,{variant:"body2",color:"textSecondary",gutterBottom:!0,children:e.title}),Object(r.jsx)(l.a,{variant:"body2",children:"Encrypted key"}),Object(r.jsx)(o.a,{title:"double click to show",placement:"top",children:Object(r.jsx)(l.a,{variant:"body2",color:"textSecondary",gutterBottom:!0,onDoubleClick:function(){return u((function(t){return!t}))},children:i?Object(r.jsx)(h.a,{style:{height:12,width:"100%",marginTop:8}}):e.encryptionKey})}),Object(r.jsx)(l.a,{variant:"body2",children:"Created"}),Object(r.jsx)(l.a,{variant:"body2",color:"textSecondary",gutterBottom:!0,children:Object(O.a)(e.created)}),Object(r.jsx)(l.a,{variant:"body2",children:"Last Updated"}),Object(r.jsx)(l.a,{variant:"body2",color:"textSecondary",gutterBottom:!0,children:Object(O.a)(e.updated)})]}),Object(r.jsxs)(b.a,{children:[Object(r.jsx)(f.a,{size:"small",color:"primary",href:"data:text/plain;charset=base64,".concat(e.encryptionKey),download:"key.ish",children:"Save Key"}),Object(r.jsx)(f.a,{size:"small",color:"primary",disabled:null==n,href:"data:text/plain;charset=base64,".concat(n),download:"data.ish",children:"Save Data"})]})]})}var x=n(215),g=n(280),m=n(195),w=n(223);function A(t){var e=t.children,n=t.title,s=t.initialValues,d=s.encryptionKey,p=s.initialData,j=t.onClose,b=Object(a.a)(),f=Object(u.b)(),y=Object(w.b)(n,d,p);if(!y)return null;var h=y.store,O=y.updateNodes,A=y.encryptedData;return Object(r.jsx)(u.a.Provider,{value:f,children:Object(r.jsx)(m.a.Provider,{value:{store:h,updateNodes:O},children:Object(r.jsxs)(c.a,{style:{position:"relative",padding:b.spacing(3)},children:[Object(r.jsx)("div",{style:{position:"absolute",right:b.spacing(1),top:b.spacing(1)},children:Object(r.jsx)(o.a,{title:"Did you save? Just checking",arrow:!0,children:Object(r.jsx)(i.a,{"aria-label":"close card",onClick:j,children:Object(r.jsx)(g.a,{})})})}),Object(r.jsx)(v,{rootNode:h.rootNode,encryptedData:A}),Object(r.jsx)("div",{style:{height:b.spacing(3)}}),Object(r.jsx)(l.a,{variant:"h2",children:"Data"}),Object(r.jsx)(x.a,{nodeKey:h.rootNode.value}),e&&e(h)]})})})}},290:function(t,e,n){"use strict";n.r(e);var r=n(42),a=n(79),c=n(5),o=n(123),i=n(183),l=n(58),u=n(300),s=n(181),d=n(0),p=n(194),j=n(33),b=n(215),f=n(228),y=n(195),h=n(17);function O(){var t=Object(a.a)(["\n  query StandardPage {\n    user {\n      uuid\n    }\n    standardProposal {\n      version\n      data\n    }\n    proposals {\n      uuid\n    }\n  }\n"]);return O=function(){return t},t}function v(){var t=Object(a.a)(["\n  mutation Adding($proposal: String!) {\n    addProposal(proposal: $proposal) {\n      uuid\n    }\n  }\n"]);return v=function(){return t},t}var x=Object(j.gql)(v()),g=Object(j.gql)(O());function m(t){var e=t.standardProposal,n=Object(p.d)(e.data,{});return Object(c.jsx)(y.a.Provider,{value:{store:n,updateNodes:null},children:Object(c.jsxs)(o.a,{style:{position:"relative",padding:24},children:[Object(c.jsxs)(i.a,{variant:"h2",children:["Proposed API ",e.version]}),Object(c.jsx)(b.a,{nodeKey:n.rootNode.value})]})})}var w={"?Parent field":{"Proposed Field":{type:"text",description:"# in markdown","?subfields":["more fields"]}}};function A(){var t=Object(d.useState)(!1),e=Object(r.a)(t,2),n=e[0],a=e[1],b=Object(l.a)(),y=Object(d.useState)(""),h=Object(r.a)(y,2),O=h[0],v=h[1],g=Object(j.useMutation)(x),m=Object(r.a)(g,1)[0];return n?Object(c.jsx)(f.a,{initialValues:{encryptionKey:"1Qd1fIUBT6KuzgM9mQOIkk8k77mkXz/4BGMnttcdY1c=",initialData:JSON.stringify(w)},title:O,onClose:function(){return a(!1)},children:function(t){return Object(c.jsx)(s.a,{fullWidth:!0,variant:"contained",color:"primary",onClick:function(){m({variables:{proposal:Object(p.c)(t)}}),a(!1),v("")},style:{marginTop:b.spacing(2)},children:"Make new proposal"})}}):Object(c.jsxs)(o.a,{style:{padding:b.spacing(2),margin:"".concat(b.spacing(2),"px auto"),maxWidth:380},children:[Object(c.jsx)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},children:Object(c.jsx)(i.a,{variant:"h5",children:"Start"})}),Object(c.jsx)(u.a,{variant:"outlined",margin:"normal",fullWidth:!0,label:"Title",value:O,onChange:function(t){return v(t.target.value)},autoFocus:!0,style:{marginBottom:b.spacing(2)}}),Object(c.jsx)(s.a,{fullWidth:!0,variant:"contained",color:"primary",onClick:function(){return a(!0)},children:"Make new proposal"})]})}function C(t){var e=t.proposals,n=Object(h.f)();return Object(c.jsxs)(o.a,{style:{position:"relative",padding:24},children:[Object(c.jsx)(i.a,{variant:"h2",children:"All Proposals"}),Object(c.jsx)("ul",{children:e.map((function(t){var e=t.uuid;return Object(c.jsxs)("li",{children:["Proposal ",e,":",Object(c.jsx)(s.a,{variant:"contained",color:"primary",onClick:function(){return n.push("/minder/proposal/".concat(e))},children:"Check it out"})]},e)}))})]})}e.default=function(){var t,e=Object(j.useQuery)(g).data;if(null==e)return null;var n=e.standardProposal,r=e.proposals;return Object(c.jsxs)("div",{children:[Object(c.jsx)(m,{standardProposal:n}),null!=(null===(t=e.user)||void 0===t?void 0:t.uuid)&&Object(c.jsx)(A,{}),Object(c.jsx)(C,{proposals:r})]})}}}]);
//# sourceMappingURL=10.7288472e.chunk.js.map