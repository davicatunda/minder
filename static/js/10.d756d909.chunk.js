(this.webpackJsonpminder=this.webpackJsonpminder||[]).push([[10],{291:function(e,r,a){"use strict";a.r(r);var t=a(80),n=a(5),u=a(132),s=a(157),l=(a(0),a(34)),o=a(187),d=a(168),i=a(167),c=a(15);function p(){var e=Object(t.a)(["\n  query Proposal($uuid: String!) {\n    proposal(uuid: $uuid) {\n      data\n    }\n  }\n"]);return p=function(){return e},e}var b=Object(l.gql)(p());r.default=function(){var e,r=Object(c.g)().proposalId,a=Object(l.useQuery)(b,{variables:{uuid:r}}).data;if(null==a||(e=a.proposal.data,!/^[\],:{}\s]*$/.test(e.replace(/\\["\\/bfnrtu]/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))))return null;var t=Object(i.d)(a.proposal.data,{});return Object(n.jsx)(d.a.Provider,{value:{store:t,updateNodes:null},children:Object(n.jsxs)(u.a,{style:{position:"relative",padding:24},children:[Object(n.jsxs)(s.a,{variant:"h3",children:["Proposals ",r]}),Object(n.jsx)(o.a,{nodeKey:t.rootNode.value})]})})}}}]);
//# sourceMappingURL=10.d756d909.chunk.js.map