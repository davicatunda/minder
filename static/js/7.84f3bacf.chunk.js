(this.webpackJsonpminder=this.webpackJsonpminder||[]).push([[7],{189:function(t,e,n){"use strict";n.d(e,"a",(function(){return x})),n.d(e,"b",(function(){return g}));var r=n(211),a=n.n(r),c=n(33),i=n(67),o=n(212),l=n(167);function u(t){return String.fromCharCode.apply(null,new Uint16Array(t))}function s(t){for(var e=new ArrayBuffer(2*t.length),n=new Uint16Array(e),r=0,a=t.length;r<a;r++)n[r]=t.charCodeAt(r);return e}function d(t){return String.fromCharCode.apply(null,new Uint8Array(t))}function j(t){return function(t){var e=new Uint8Array(t.length);return Array.prototype.forEach.call(e,(function(e,n,r){r[n]=t.charCodeAt(n)})),btoa(d(e.buffer))}(d(t))}function b(t){return function(t){for(var e=new ArrayBuffer(t.length),n=new Uint8Array(e),r=0,a=t.length;r<a;r++)n[r]=t.charCodeAt(r);return e}(function(t){var e=atob(t),n=new Uint8Array(e.length);return Array.prototype.forEach.call(n,(function(t,n,r){r[n]=e.charCodeAt(n)})),d(n.buffer)}(t))}function p(t){return function(t){var e=new Uint16Array(t.length);return Array.prototype.forEach.call(e,(function(e,n,r){r[n]=t.charCodeAt(n)})),btoa(d(e.buffer))}(u(t))}function O(t){return s(function(t){var e=atob(t),n=new Uint8Array(e.length);return Array.prototype.forEach.call(n,(function(t,n,r){r[n]=e.charCodeAt(n)})),u(n.buffer)}(t))}var f=n(0);function y(){return(y=Object(o.a)(a.a.mark((function t(e,n){var r,c,i;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=window.crypto.getRandomValues(new Uint8Array(12)),t.next=3,window.crypto.subtle.importKey("raw",O(n),{name:"AES-GCM",length:256},!0,["encrypt","decrypt"]);case 3:return c=t.sent,t.next=6,window.crypto.subtle.encrypt({name:"AES-GCM",iv:r},c,s(e));case 6:return i=t.sent,t.abrupt("return","".concat(j(r),"!").concat(p(i)));case 8:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function h(){return(h=Object(o.a)(a.a.mark((function t(e,n){var r,c,o,l,s,d;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.split("!"),c=Object(i.a)(r,2),o=c[0],l=c[1],t.next=3,window.crypto.subtle.importKey("raw",O(n),{name:"AES-GCM",length:256},!0,["encrypt","decrypt"]);case 3:return s=t.sent,t.next=6,window.crypto.subtle.decrypt({name:"AES-GCM",iv:b(o)},s,O(l));case 6:return d=t.sent,t.abrupt("return",u(d));case 8:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function x(){return v.apply(this,arguments)}function v(){return(v=Object(o.a)(a.a.mark((function t(){var e,n;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,window.crypto.subtle.generateKey({name:"AES-GCM",length:256},!0,["encrypt","decrypt"]);case 2:return e=t.sent,t.next=5,window.crypto.subtle.exportKey("raw",e);case 5:return n=t.sent,t.abrupt("return",p(n));case 7:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function g(t,e,n){var r="{"===n[0],a=r?function(){return Object(l.d)(n,{title:t,encryptionKey:e})}:null,o=Object(f.useState)(a),u=Object(i.a)(o,2),s=u[0],d=u[1],j=r?null:n;Object(f.useEffect)((function(){null!=j&&function(t,e){return h.apply(this,arguments)}(j,e).then((function(n){d(Object(l.d)(n,{title:t,encryptionKey:e}))}))}),[j,e,t]);var b=Object(f.useState)(null),p=Object(i.a)(b,2),O=p[0],x=p[1];return Object(f.useEffect)((function(){null!=s&&function(t,e){return y.apply(this,arguments)}(Object(l.c)(s),e).then(x)}),[s,e]),null===s||null===O?null:{store:s,updateNodes:function(t){var e=Object(c.a)({},s.nodes);t.forEach((function(t){return e[t.key]=t}));var n={rootNode:Object(c.a)(Object(c.a)({},s.rootNode),{},{updated:new Date}),nodes:e};d(n)},encryptedData:O}}},198:function(t,e,n){"use strict";n.d(e,"a",(function(){return S}));var r=n(5),a=n(133),c=n(132),i=n(300),o=n(158),l=n(157),u=n(194),s=n(67),d=n(255),j=n(256),b=n(257),p=n(260),O=n(161),f=n(0),y=n(195),h=n(181);function x(t){var e=t.rootNode,n=t.encryptedData,a=Object(f.useState)(!0),c=Object(s.a)(a,2),o=c[0],u=c[1];return Object(r.jsxs)(d.a,{style:{maxWidth:400},variant:"outlined",children:[Object(r.jsx)(j.a,{title:"Details"}),Object(r.jsxs)(b.a,{children:[Object(r.jsx)(l.a,{variant:"body2",children:"Title"}),Object(r.jsx)(l.a,{variant:"body2",color:"textSecondary",gutterBottom:!0,children:e.title}),Object(r.jsx)(l.a,{variant:"body2",children:"Encrypted key"}),Object(r.jsx)(i.a,{title:"double click to show",placement:"top",children:Object(r.jsx)(l.a,{variant:"body2",color:"textSecondary",gutterBottom:!0,onDoubleClick:function(){return u((function(t){return!t}))},children:o?Object(r.jsx)(y.a,{style:{height:12,width:"100%",marginTop:8}}):e.encryptionKey})}),Object(r.jsx)(l.a,{variant:"body2",children:"Created"}),Object(r.jsx)(l.a,{variant:"body2",color:"textSecondary",gutterBottom:!0,children:Object(h.a)(e.created)}),Object(r.jsx)(l.a,{variant:"body2",children:"Last Updated"}),Object(r.jsx)(l.a,{variant:"body2",color:"textSecondary",gutterBottom:!0,children:Object(h.a)(e.updated)})]}),Object(r.jsxs)(p.a,{children:[Object(r.jsx)(O.a,{size:"small",color:"primary",href:"data:text/plain;charset=base64,".concat(e.encryptionKey),download:"key.ish",children:"Save Key"}),Object(r.jsx)(O.a,{size:"small",color:"primary",disabled:null==n,href:"data:text/plain;charset=base64,".concat(n),download:"data.ish",children:"Save Data"})]})]})}var v=n(187),g=n(280),m=n(168),w=n(189);function S(t){var e=t.children,n=t.title,s=t.initialValues,d=s.encryptionKey,j=s.initialData,b=t.onClose,p=Object(a.a)(),O=Object(u.b)(),f=Object(w.b)(n,d,j);if(!f)return null;var y=f.store,h=f.updateNodes,S=f.encryptedData;return Object(r.jsx)(u.a.Provider,{value:O,children:Object(r.jsx)(m.a.Provider,{value:{store:y,updateNodes:h},children:Object(r.jsxs)(c.a,{style:{position:"relative",padding:p.spacing(3)},children:[Object(r.jsx)("div",{style:{position:"absolute",right:p.spacing(1),top:p.spacing(1)},children:Object(r.jsx)(i.a,{title:"Did you save? Just checking",arrow:!0,children:Object(r.jsx)(o.a,{"aria-label":"close card",onClick:b,children:Object(r.jsx)(g.a,{})})})}),Object(r.jsx)(x,{rootNode:y.rootNode,encryptedData:S}),Object(r.jsx)("div",{style:{height:p.spacing(3)}}),Object(r.jsx)(l.a,{variant:"h2",children:"Data"}),Object(r.jsx)(v.a,{nodeKey:y.rootNode.value}),e&&e(y)]})})})}},297:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return Y}));var r=n(188),a=n(33),c=n(67),i=n(5),o=n(133),l=n(161),u=n(198),s=n(0),d=n(281),j=n(80),b=n(282),p=n(283),O=n(284),f=n(285),y=n(288),h=n(289),x=n(132),v=n(303),g=n(157),m=n(299),w=n(270),S=n(300),C=n(158),A=n(286),D=n(265),T=n(304),E=n(287),K=n(294),k=n(34);function M(t){var e=t.children,n=t.onDrop;return Object(i.jsx)("div",{onDrop:function(t){function e(e){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}((function(t){t.preventDefault(),n(t.dataTransfer.files[0])})),onDragOver:function(t){t.preventDefault()},onDragEnter:function(t){t.preventDefault()},children:e})}var U=n(189);function N(){var t=Object(j.a)(["\n  query OfflinePage {\n    standardProposal {\n      version\n      data\n    }\n  }\n"]);return N=function(){return t},t}var P,I=Object(k.gql)(N());function W(t){var e=t.onSubmit,n=Object(o.a)(),r=Object(s.useState)(null),a=Object(c.a)(r,2),u=a[0],j=a[1],b=Object(s.useState)(""),p=Object(c.a)(b,2),O=p[0],f=p[1],y=Object(s.useState)(""),h=Object(c.a)(y,2),v=h[0],g=h[1],m=Object(k.useQuery)(I,{onCompleted:function(t){j(t.standardProposal.data)}}).data;return null==m?null:Object(i.jsxs)(x.a,{style:{padding:n.spacing(2),margin:"auto",maxWidth:380},children:[Object(i.jsx)(R,{}),Object(i.jsx)(B,{title:O,setTitle:f}),Object(i.jsx)(G,{encryptionKey:v,setEncryptionKey:g}),Object(i.jsx)(V,{standardProposal:m.standardProposal,setInitialData:j}),Object(i.jsx)("div",{style:{height:n.spacing(1)}}),Object(i.jsx)(l.a,{fullWidth:!0,variant:"contained",disabled:""===v||null===u,color:"primary",startIcon:Object(i.jsx)(d.a,{}),onClick:function(){e({title:""!==O?O:"Primary",initialValues:{encryptionKey:v,initialData:u}})},children:"Open"})]})}function R(){return Object(i.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},children:[Object(i.jsx)(v.a,{children:Object(i.jsx)(b.a,{})}),Object(i.jsx)(g.a,{variant:"h5",children:"Start"})]})}function B(t){var e=t.title,n=t.setTitle;return Object(i.jsx)(m.a,{variant:"outlined",margin:"normal",fullWidth:!0,label:"Title",autoComplete:"title",value:e,onChange:function(t){return n(t.target.value)},autoFocus:!0})}function G(t){var e=t.encryptionKey,n=t.setEncryptionKey;return Object(i.jsx)(M,{onDrop:function(t){return F(t,n)},children:Object(i.jsx)(m.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,label:"Encryption Key",type:"password",autoComplete:"current-encryption-key",value:e,onChange:function(t){return n(t.target.value)},InputProps:{endAdornment:Object(i.jsx)(w.a,{position:"end",children:Object(i.jsx)(S.a,{title:"Generate new key",arrow:!0,children:Object(i.jsx)(C.a,{"aria-label":"generate new encryption Key",onClick:function(){return Object(U.a)().then(n)},children:Object(i.jsx)(p.a,{})})})})}})})}function V(t){var e=t.standardProposal,n=t.setInitialData,r=Object(o.a)(),a=Object(s.useState)(!1),u=Object(c.a)(a,2),d=u[0],j=u[1],b=Object(s.useState)(P.STANDARD),p=Object(c.a)(b,2),x=p[0],v=p[1],m=Object(s.useState)(null),w=Object(c.a)(m,2),S=w[0],k=w[1];return Object(i.jsxs)(i.Fragment,{children:[Object(i.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[Object(i.jsx)(g.a,{variant:"body1",children:"Data Options"}),Object(i.jsx)(C.a,{onClick:function(){return j((function(t){return!t}))},"aria-expanded":d,"aria-label":"show more",children:d?Object(i.jsx)(O.a,{}):Object(i.jsx)(f.a,{})})]}),Object(i.jsxs)(A.a,{in:d,timeout:"auto",unmountOnExit:!0,children:[Object(i.jsx)(D.a,{component:"legend",children:"Initial Data"}),Object(i.jsxs)(T.a,{"aria-label":"Initial data",value:x,onChange:function(t){var r=t.target.value;switch(v(r),r){case P.CUSTOM:return n(S);case P.EMPTY:return n("{}");case P.STANDARD:return n(e.data)}},children:[Object(i.jsx)(E.a,{value:P.STANDARD,control:Object(i.jsx)(K.a,{}),label:"Standard v".concat(e.version)}),Object(i.jsx)(E.a,{value:P.EMPTY,control:Object(i.jsx)(K.a,{}),label:"Empty"}),Object(i.jsx)(E.a,{value:P.CUSTOM,control:Object(i.jsx)(K.a,{}),label:"My own"})]}),P.CUSTOM===x&&Object(i.jsx)(M,{onDrop:function(t){return F(t,(function(t){k(t),x===P.CUSTOM&&n(t)}))},children:Object(i.jsxs)(l.a,{component:"label",fullWidth:!0,style:{textTransform:"none",outlineWidth:2,outlineStyle:"dashed",outlineColor:r.palette.secondary.main},startIcon:null===S?Object(i.jsx)(y.a,{}):Object(i.jsx)(h.a,{}),children:[Object(i.jsx)("input",{hidden:!0,type:"file",onChange:function(t){var e;return F(null===(e=t.target.files)||void 0===e?void 0:e[0],(function(t){k(t),x===P.CUSTOM&&n(t)}))}}),null===S?Object(i.jsx)(g.a,{variant:"body1",children:"Drag or upload your encrypted data"}):Object(i.jsx)(g.a,{variant:"body1",children:"Done"})]})})]})]})}function F(t,e){if(t){var n=new FileReader;n.onloadend=function(){"string"===typeof n.result&&e(n.result)},n.readAsText(t)}}function Y(){var t=Object(o.a)(),e=Object(s.useState)([]),n=Object(c.a)(e,2),j=n[0],b=n[1],p=Object(s.useState)(!0),O=Object(c.a)(p,2),f=O[0],y=O[1];return Object(i.jsxs)(i.Fragment,{children:[j.map((function(e){return Object(i.jsxs)("div",{children:[Object(i.jsx)(u.a,Object(a.a)(Object(a.a)({},e),{},{onClose:function(){return b(j.filter((function(t){return e.initialValues.encryptionKey!==t.initialValues.encryptionKey})))}})),Object(i.jsx)("div",{style:{height:t.spacing(2)}})]},e.initialValues.encryptionKey)})),f||0===j.length?Object(i.jsx)(W,{onSubmit:function(t){y(!1),b((function(e){return[].concat(Object(r.a)(e),[t])}))}}):Object(i.jsx)(l.a,{fullWidth:!0,variant:"outlined",color:"primary",startIcon:Object(i.jsx)(d.a,{}),onClick:function(){return y(!0)},children:"Open"})]})}!function(t){t.STANDARD="STANDARD",t.EMPTY="EMPTY",t.CUSTOM="CUSTOM"}(P||(P={}))}}]);
//# sourceMappingURL=7.84f3bacf.chunk.js.map