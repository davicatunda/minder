(this.webpackJsonpminder=this.webpackJsonpminder||[]).push([[12],{321:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return p}));var a=n(79),i=n(42),r=n(5),o=n(58),s=n(123),c=n(183),l=n(327),u=n(181),d=n(0),g=n(33),j=n(17);function b(){var e=Object(a.a)(["\n      mutation Login($username: String!, $password: String!) {\n        login(username: $username, password: $password)\n      }\n    "]);return b=function(){return e},e}function p(){var e=Object(o.a)(),t=Object(g.useApolloClient)(),n=Object(j.f)(),a=Object(d.useState)(!1),p=Object(i.a)(a,2),h=p[0],m=p[1],O=Object(d.useState)(""),v=Object(i.a)(O,2),f=v[0],y=v[1],x=Object(d.useState)(""),w=Object(i.a)(x,2),S=w[0],k=w[1],C=Object(g.useMutation)(Object(g.gql)(b())),W=Object(i.a)(C,1)[0];return Object(r.jsx)("div",{style:{margin:"auto"},children:Object(r.jsxs)(s.a,{style:{paddingTop:e.spacing(4),paddingLeft:e.spacing(4),paddingRight:e.spacing(4),paddingBottom:e.spacing(2),margin:"auto",maxWidth:480,width:"100%"},children:[Object(r.jsx)(c.a,{align:"center",variant:"h3",gutterBottom:!0,children:"Minder"}),Object(r.jsx)("div",{style:{height:e.spacing(2)}}),Object(r.jsx)(l.a,{variant:"outlined",margin:"normal",fullWidth:!0,label:"Username or email",autoComplete:"username",value:f,onChange:function(e){y(e.target.value),m(!1)},autoFocus:!0}),Object(r.jsx)(l.a,{variant:"outlined",margin:"normal",fullWidth:!0,label:"Password",type:"password",autoComplete:"current-encryption-key",value:S,onChange:function(e){k(e.target.value),m(!1)}}),Object(r.jsx)("div",{style:{height:e.spacing(1)}}),Object(r.jsx)(u.a,{fullWidth:!0,variant:"contained",disabled:""===f||""===S||h,color:"primary",size:"large",onClick:function(){W({variables:{username:f,password:S}}).then((function(e){var a=e.data;if(null==(null===a||void 0===a?void 0:a.login))return m(!0);localStorage.setItem("token",a.login),n.push("/minder/memories"),t.resetStore()}))},children:"Log in"}),Object(r.jsx)("div",{style:{height:e.spacing(2)}}),Object(r.jsx)(c.a,{variant:"body2",color:"error",align:"center",style:{visibility:h?"initial":"hidden"},children:"That's not the droid you're looking for"})]})})}}}]);
//# sourceMappingURL=12.b332d564.chunk.js.map