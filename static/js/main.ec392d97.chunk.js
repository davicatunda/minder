(this.webpackJsonpminder=this.webpackJsonpminder||[]).push([[0],{69:function(e,n,t){e.exports=t(84)},84:function(e,n,t){"use strict";t.r(n);var a=t(42),r=t(2),o=t.n(r),i=t(65),l=t.n(i),c=t(26),s=t(8),u=t(32),d=t(48),m=t(23);function f(){var e=Object(d.a)(["\n  query NavBarLoggedIn {\n    user {\n      username\n    }\n  }\n"]);return f=function(){return e},e}var h=Object(m.gql)(f()),p={display:"flex",justifyContent:"space-between",background:"#24292e",padding:20},v={display:"flex",listStyle:"none",padding:0,margin:0},g={fontWeight:600,color:"white",whiteSpace:"nowrap",marginInlineEnd:20,textDecoration:"none"},w=function(){var e=Object(m.useQuery)(h).data;return o.a.createElement("div",{style:p},o.a.createElement("ul",{style:v},o.a.createElement("li",null,o.a.createElement(c.b,{style:g,to:"/minder"},"Home")),o.a.createElement("li",null,o.a.createElement(c.b,{style:g,to:"/minder/offline"},"Offline Mode")),o.a.createElement("li",null,o.a.createElement(c.b,{style:g,to:"/minder/standard"},"Standard"))),null!=(null===e||void 0===e?void 0:e.user)&&o.a.createElement("div",{style:g},e.user.username))},b=Object(u.a)((function(){return t.e(6).then(t.bind(null,94))})),E=Object(u.a)((function(){return t.e(3).then(t.bind(null,97))})),y=Object(u.a)((function(){return t.e(4).then(t.bind(null,95))})),k=Object(u.a)((function(){return t.e(5).then(t.bind(null,96))})),j=function(){return o.a.createElement(c.a,null,o.a.createElement(w,null),o.a.createElement("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"}},o.a.createElement("div",{style:{maxWidth:800,width:"100%"}},o.a.createElement(s.c,null,o.a.createElement(s.a,{exact:!0,path:"/minder/"},o.a.createElement(b,null)),o.a.createElement(s.a,{exact:!0,path:"/minder/offline"},o.a.createElement(E,null)),o.a.createElement(s.a,{path:"/minder/standard"},o.a.createElement(y,null)),o.a.createElement(s.a,{path:"/minder/proposal/:proposalId"},o.a.createElement(k,null))))))},O=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function x(e,n){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var t=e.installing;null!=t&&(t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),n&&n.onUpdate&&n.onUpdate(e)):(console.log("Content is cached for offline use."),n&&n.onSuccess&&n.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}var W=t(68),S=Object(W.a)((function(e,n){var t,r=n.headers;return{headers:Object(a.a)(Object(a.a)({},r),{},{authorization:null!==(t=localStorage.getItem("token"))&&void 0!==t?t:""})}})),A=new m.ApolloClient({link:S.concat(Object(m.createHttpLink)({uri:"https://thawing-wildwood-69808.herokuapp.com/graphql"})),cache:new m.InMemoryCache});l.a.render(o.a.createElement(m.ApolloProvider,{client:A},o.a.createElement(j,null)),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/minder",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var n="".concat("/minder","/service-worker.js");O?(!function(e,n){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(t){var a=t.headers.get("content-type");404===t.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):x(e,n)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(n,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):x(n,e)}))}}({})}},[[69,1,2]]]);
//# sourceMappingURL=main.ec392d97.chunk.js.map