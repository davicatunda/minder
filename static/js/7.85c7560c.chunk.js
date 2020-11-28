(this.webpackJsonpminder=this.webpackJsonpminder||[]).push([[7],{294:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return J}));var a=n(190),r=n(60),i=n(167),c=n(5),l=n(130),o=n(155),s=n(166),u=n(0),j=n(279),d=n(73),b=n(280),O=n(281),f=n(282),p=n(283),x=n(285),h=n(286),y=n(126),v=n(300),g=n(153),m=n(296),D=n(268),S=n(297),T=n(267),C=n(284),A=n(262),M=n(301),P=n(269),w=n(291),E=n(33);function I(t){var e=t.children,n=t.onDrop;return Object(c.jsx)("div",{onDrop:function(t){function e(e){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}((function(t){t.preventDefault(),n(t.dataTransfer.files[0])})),onDragOver:function(t){t.preventDefault()},onDragEnter:function(t){t.preventDefault()},children:e})}var K=n(191);function k(){var t=Object(d.a)(["\n  query OfflinePage {\n    standardProposal {\n      version\n      data\n    }\n  }\n"]);return k=function(){return t},t}var U,W=Object(E.gql)(k());function R(t){var e=t.onSubmit,n=Object(l.a)(),a=Object(u.useState)(null),r=Object(i.a)(a,2),s=r[0],d=r[1],b=Object(u.useState)(""),O=Object(i.a)(b,2),f=O[0],p=O[1],x=Object(u.useState)(""),h=Object(i.a)(x,2),v=h[0],g=h[1],m=Object(E.useQuery)(W,{onCompleted:function(t){d(t.standardProposal.data)}}).data;return null==m?null:Object(c.jsxs)(y.a,{style:{padding:n.spacing(2),margin:"auto",maxWidth:380},children:[Object(c.jsx)(N,{}),Object(c.jsx)(F,{title:f,setTitle:p}),Object(c.jsx)(V,{encryptionKey:v,setEncryptionKey:g}),Object(c.jsx)(Y,{standardProposal:m.standardProposal,setInitialData:d}),Object(c.jsx)("div",{style:{height:n.spacing(1)}}),Object(c.jsx)(o.a,{fullWidth:!0,variant:"contained",disabled:""===v||null===s,color:"primary",startIcon:Object(c.jsx)(j.a,{}),onClick:function(){e({title:""!==f?f:"Primary",initialValues:{encryptionKey:v,initialData:s}})},children:"Open"})]})}function N(){return Object(c.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},children:[Object(c.jsx)(v.a,{children:Object(c.jsx)(b.a,{})}),Object(c.jsx)(g.a,{variant:"h5",children:"Start"})]})}function F(t){var e=t.title,n=t.setTitle;return Object(c.jsx)(m.a,{variant:"outlined",margin:"normal",fullWidth:!0,label:"Title",autoComplete:"title",value:e,onChange:function(t){return n(t.target.value)},autoFocus:!0})}function V(t){var e=t.encryptionKey,n=t.setEncryptionKey;return Object(c.jsx)(I,{onDrop:function(t){return q(t,n)},children:Object(c.jsx)(m.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,label:"Encryption Key",type:"password",autoComplete:"current-encryption-key",value:e,onChange:function(t){return n(t.target.value)},InputProps:{endAdornment:Object(c.jsx)(D.a,{position:"end",children:Object(c.jsx)(S.a,{title:"Generate new key",arrow:!0,children:Object(c.jsx)(T.a,{"aria-label":"generate new encryption Key",onClick:function(){return Object(K.a)().then(n)},children:Object(c.jsx)(O.a,{})})})})}})})}function Y(t){var e=t.standardProposal,n=t.setInitialData,a=Object(l.a)(),r=Object(u.useState)(!1),s=Object(i.a)(r,2),j=s[0],d=s[1],b=Object(u.useState)(U.STANDARD),O=Object(i.a)(b,2),y=O[0],v=O[1],m=Object(u.useState)(null),D=Object(i.a)(m,2),S=D[0],E=D[1];return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[Object(c.jsx)(g.a,{variant:"body1",children:"Data Options"}),Object(c.jsx)(T.a,{onClick:function(){return d((function(t){return!t}))},"aria-expanded":j,"aria-label":"show more",children:j?Object(c.jsx)(f.a,{}):Object(c.jsx)(p.a,{})})]}),Object(c.jsxs)(C.a,{in:j,timeout:"auto",unmountOnExit:!0,children:[Object(c.jsx)(A.a,{component:"legend",children:"Initial Data"}),Object(c.jsxs)(M.a,{"aria-label":"Initial data",value:y,onChange:function(t){var a=t.target.value;switch(v(a),a){case U.CUSTOM:return n(S);case U.EMPTY:return n("{}");case U.STANDARD:return n(e.data)}},children:[Object(c.jsx)(P.a,{value:U.STANDARD,control:Object(c.jsx)(w.a,{}),label:"Standard v".concat(e.version)}),Object(c.jsx)(P.a,{value:U.EMPTY,control:Object(c.jsx)(w.a,{}),label:"Empty"}),Object(c.jsx)(P.a,{value:U.CUSTOM,control:Object(c.jsx)(w.a,{}),label:"My own"})]}),U.CUSTOM===y&&Object(c.jsx)(I,{onDrop:function(t){return q(t,(function(t){E(t),y===U.CUSTOM&&n(t)}))},children:Object(c.jsxs)(o.a,{component:"label",fullWidth:!0,style:{textTransform:"none",outlineWidth:2,outlineStyle:"dashed",outlineColor:a.palette.secondary.main},startIcon:null===S?Object(c.jsx)(x.a,{}):Object(c.jsx)(h.a,{}),children:[Object(c.jsx)("input",{hidden:!0,type:"file",onChange:function(t){var e;return q(null===(e=t.target.files)||void 0===e?void 0:e[0],(function(t){E(t),y===U.CUSTOM&&n(t)}))}}),null===S?Object(c.jsx)(g.a,{variant:"body1",children:"Drag or upload your encrypted data"}):Object(c.jsx)(g.a,{variant:"body1",children:"Done"})]})})]})]})}function q(t,e){if(t){var n=new FileReader;n.onloadend=function(){"string"===typeof n.result&&e(n.result)},n.readAsText(t)}}function J(){var t=Object(l.a)(),e=Object(u.useState)([]),n=Object(i.a)(e,2),d=n[0],b=n[1],O=Object(u.useState)(!0),f=Object(i.a)(O,2),p=f[0],x=f[1];return Object(c.jsxs)(c.Fragment,{children:[d.map((function(e){return Object(c.jsxs)("div",{children:[Object(c.jsx)(s.b,Object(r.a)(Object(r.a)({},e),{},{onClose:function(){return b(d.filter((function(t){return e.initialValues.encryptionKey!==t.initialValues.encryptionKey})))}})),Object(c.jsx)("div",{style:{height:t.spacing(2)}})]},e.initialValues.encryptionKey)})),p||0===d.length?Object(c.jsx)(R,{onSubmit:function(t){x(!1),b((function(e){return[].concat(Object(a.a)(e),[t])}))}}):Object(c.jsx)(o.a,{fullWidth:!0,variant:"outlined",color:"primary",startIcon:Object(c.jsx)(j.a,{}),onClick:function(){return x(!0)},children:"Open"})]})}!function(t){t.STANDARD="STANDARD",t.EMPTY="EMPTY",t.CUSTOM="CUSTOM"}(U||(U={}))}}]);
//# sourceMappingURL=7.85c7560c.chunk.js.map