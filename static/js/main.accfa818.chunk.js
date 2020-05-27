(this["webpackJsonpcommunity-builder"]=this["webpackJsonpcommunity-builder"]||[]).push([[0],{102:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(12),l=a.n(o),i=a(159),c=a(158),m=a(19),s=a(31),u=a(35),f=a(24),p=a(79),d=a(80),b=new u.a({link:f.a.from([new p.a({uri:"".concat("https://cofacts-api.g0v.tw","/graphql")})]),cache:new d.a}),E=a(77),g=a(76),v=a.n(g),h=Object(E.a)({palette:{primary:{main:"#ffb600",50:"#fff890",100:"#fff000",200:"#ffe200",300:"#ffd300",400:"#ffc500",500:"#ffb600",600:"#ffa300",700:"#ff9200",800:"#ff7f00",900:"#ff6d00",light:"#fafafa",dark:"#e8e8e8"},secondary:{main:"#333333",50:"#f5f5f5",100:"#d6d6d6",200:"#adadad",300:"#858585",400:"#5c5c5c",500:"#333333",600:"#2e2e2e",700:"#292929",800:"#242424",900:"#1f1f1f"},error:{main:v.a.A400},background:{default:"#f5f5f5"}},typography:{fontFamily:'"Noto Sans TC", "Helvetica", "Arial", sans-serif'}}),y=(a(98),a(14)),w=a(142),S=a(155),A=a(156),k=a(104),O=a(157),j=a(144),N=a(146),C=a(147),L=a(148),x=Object(w.a)({link:{textDecoration:"none"}}),T=function(e){var t=e.to,a=e.title,n=e.description,o=x();return r.a.createElement(j.a,{item:!0,xs:12,sm:6},r.a.createElement(s.b,{className:o.link,to:t},r.a.createElement(N.a,null,r.a.createElement(C.a,null,r.a.createElement(L.a,null,r.a.createElement(k.a,{variant:"h5",gutterBottom:!0},a),r.a.createElement(k.a,{variant:"body1"},n))))))},R=function(){return r.a.createElement(j.a,{container:!0,spacing:2},r.a.createElement(T,{to:"/stats",title:"Statistics",description:"Real-time statistics from Cofacts API"}),r.a.createElement(T,{to:"/editorworks",title:"Thank you editors",description:"List of recent works from editors"}),r.a.createElement(T,{to:"/bignum/setup",title:"Big Numbers",description:"Instant number display to project in meetups"}))},B=a(47),z=a(48),P=a.n(z),W=a(43);function D(e){return e.toString().replace(/(\d{1,3})(?=(\d{3})+$)/,"$1,")}var I=a(149);function q(){var e=Object(B.a)(["\n  query LOAD_API_STATS {\n    allArticles: ListArticles {\n      totalCount\n    }\n    allRepliedArticles: ListArticles(filter: { replyCount: { GTE: 1 } }) {\n      totalCount\n    }\n    articlesHasUsefulReplies: ListArticles(\n      filter: { hasArticleReplyWithMorePositiveFeedback: true }\n    ) {\n      totalCount\n    }\n  }\n"]);return q=function(){return e},e}var $,F=P()(q()),U=function(e){var t=e.name,a=e.value;return r.a.createElement(j.a,{item:!0,xs:12,sm:4},r.a.createElement(N.a,null,r.a.createElement(L.a,null,r.a.createElement(k.a,{variant:"body1",gutterBottom:!0},t),r.a.createElement(k.a,{variant:"h5"},a))))},H=function(){var e,t,a,n=Object(W.a)(F,{pollInterval:5e3}),o=n.data;return n.loading?r.a.createElement(k.a,{align:"center",component:"div"},r.a.createElement(I.a,{size:64})):r.a.createElement(j.a,{container:!0,spacing:2},r.a.createElement(U,{name:"All messages",value:D(+(null===o||void 0===o||null===(e=o.allArticles)||void 0===e?void 0:e.totalCount))}),r.a.createElement(U,{name:"Replied messages",value:D(+(null===o||void 0===o||null===(t=o.allRepliedArticles)||void 0===t?void 0:t.totalCount))}),r.a.createElement(U,{name:"Has useful replies",value:D(+(null===o||void 0===o||null===(a=o.articlesHasUsefulReplies)||void 0===a?void 0:a.totalCount))}))},M=function(){return r.a.createElement("div",null,"Thanks editor")},G=a(153),J=a(154),_=a(160),K=a(150),Q=a(151),V=a(152),X=a(161),Y=a(78),Z=a(61),ee={7:{top:"Lucky"},17:{bottom:"8+9"},21:{top:"\u6bcf\u5929\u53ea\u6709",bottom:"\u5c0f\u6642\uff0c\u5269\u4e0b 3 \u5c0f\u6642\u662f\u7528\u4f86\u7761\u89ba\u7684"},30:{bottom:"\u800c\u7acb"},38:{bottom:"\u5a66\u5973\u7bc0"},40:{bottom:"\u4e0d\u60d1"},44:{bottom:"\u96bb\u77f3\u7345\u5b50"},50:{bottom:"\u77e5\u5929\u547d"},56:{bottom:"\u4e0d\u80fd\u4ea1"},60:{top:"\u5728\u975e\u6d32\u6bcf\u904e\u4e86",bottom:"\u79d2\uff0c\u5c31\u6709\u4e00\u5206\u9418\u904e\u53bb"},64:{top:"\u52ff\u5fd8"},70:{bottom:"\u96a8\u5fc3\u6240\u6b32\u800c\u4e0d\u8e30\u77e9"},77:{top:"\u68ee"},87:{bottom:"\u4e0d\u80fd\u518d\u9ad8\u4e86"},92:{top:"\u6c92\u6709\u5171\u8b58\u7684",bottom:"\u5171\u8b58"},94:{bottom:"\u72c2"},101:{bottom:"\u5927\u6a13"},104:{bottom:"\u67e5\u865f\u53f0"},113:{top:"\u885b\u798f\u90e8",bottom:"\u4fdd\u8b77\u5c08\u7dda"},118:{top:"\u770b\u5230",bottom:"\u5c31\u8dea\u4e86"},123:{bottom:"\u6728\u982d\u4eba"},128:{top:"2\u76847\u6b21\u65b9"},144:{top:"12\xd712="},165:{top:"\u8b66\u653f\u7f72",bottom:"\u53cd\u8a50\u9a19\u5c08\u7dda"},183:{bottom:"CLUB"},193:{bottom:"\u7e23\u9053"},200:{top:"\u610f\u5916\u64bf\u5230",bottom:"\u5143"},228:{bottom:"\u4e8c\u4e8c\u516b"},318:{bottom:"\u5b78\u904b"},377:{bottom:"\u68ee\u4e03\u4e03"},500:{top:"\u4e0b\u53bb\u9818"}};function te(){var e=Object(B.a)(["\n      query BigNumOfUseful($startTime: String) {\n        ListArticles(filter: { repliedAt: { GTE: $startTime } }) {\n          totalCount\n        }\n      }\n    "]);return te=function(){return e},e}function ae(){var e=Object(B.a)(["\n      query BigNumOfReplied($startTime: String) {\n        ListArticles(filter: { repliedAt: { GTE: $startTime } }) {\n          totalCount\n        }\n      }\n    "]);return ae=function(){return e},e}var ne;!function(e){e.replied="replied",e.useful="useful"}(ne||(ne={}));var re=($={},Object(Z.a)($,ne.replied,{top:"\u56de\u8986\u4e86",bottom:"\u5247\u8a0a\u606f",query:P()(ae())}),Object(Z.a)($,ne.useful,{top:"\u65b0\u589e\u4e86",bottom:"\u5247\u8a0a\u606f\u88ab\u6709\u7528\u56de\u61c9\u8986\u84cb",query:P()(te())}),$),oe=Object(w.a)({displays:{position:"fixed",top:0,right:0,bottom:0,left:0,display:"flex",background:"#fff"},resizer:{flex:1,position:"relative"},display:{position:"absolute",width:768,height:768,left:"50%",top:"50%",display:"flex",flexFlow:"column",justifyContent:"space-around",textAlign:"center","& > p":{margin:0}},time:{fontSize:36,fontWeight:200},top:{fontSize:64,fontWeight:600},bottom:{fontSize:44,fontWeight:600},number:{fontSize:360,lineHeight:1,fontWeight:400},funNumber:{fontSize:360,fontWeight:100},funParagraph:{fontSize:84,fontWeight:600},border:{position:"absolute",border:"8px solid rgba(0,0,0,0.64)",top:24,right:24,bottom:24,left:24}}),le=function(e){var t,a=e.rootProps,n=e.start,o=e.panelType,l=oe(),i=re[o],c=i.top,m=i.bottom,s=i.query,u=Object(W.a)(s,{pollInterval:5e3,variables:{startTime:n.toISOString()}}),f=u.data,p=u.loading,d=u.error;if(p)return r.a.createElement("div",a,"Loading");if(d)return r.a.createElement("div",a,d.toString());var b=null===(t=f.ListArticles)||void 0===t?void 0:t.totalCount,E=null===b?"":b.toString();if(b&&b in ee){var g=ee[b],v=g.top,h=g.bottom;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",a,v&&r.a.createElement("p",{className:l.funParagraph},v),r.a.createElement("p",{className:l.funNumber},E),h&&r.a.createElement("p",{className:l.funParagraph},h)),r.a.createElement("div",{className:l.border}))}return r.a.createElement("div",a,r.a.createElement("p",{className:l.time},"\u81ea ",n.toLocaleString()," \u8d77"),r.a.createElement("p",{className:l.top},c),r.a.createElement("p",{className:l.number},E),r.a.createElement("p",{className:l.bottom},m))},ie=function(e){var t=e.children,a=oe(),o=Object(n.useState)(1),l=Object(Y.a)(o,2),i=l[0],c=l[1],m=Object(n.useRef)(null);return Object(n.useEffect)((function(){function e(){if(null!==m.current){var e=m.current.getBoundingClientRect(),t=e.width,a=e.height,n=Math.max(t-80,0)/768,r=Math.max(a-80,0)/768;c(Math.min(n,r))}}return window.addEventListener("resize",e),e(),function(){window.removeEventListener("resize",e)}}),[]),r.a.createElement("div",{className:a.resizer,ref:m},t({className:a.display,style:{transform:"translate(-50%, -50%) scale(".concat(i,")")}}))},ce=function(){var e=Object(y.g)().search,t=oe(),a=new URLSearchParams(e),n=a.get("start"),o=a.getAll("panels"),l=n?new Date(n):new Date;return r.a.createElement("div",{className:t.displays},o.map((function(e){return r.a.createElement(ie,{key:e},(function(t){return r.a.createElement(le,{rootProps:t,panelType:e,start:l})}))})))},me=Object(w.a)((function(e){return{setup:{margin:"".concat(e.spacing(2),"px auto")},panelsetup:{marginTop:e.spacing(4),marginBottom:e.spacing(1)}}})),se=function(){var e=me(),t=Object(y.f)();return r.a.createElement("form",{onSubmit:function(e){e.preventDefault();var a=new URLSearchParams(new FormData(e.target)).toString();t.push("/bignum?"+a)}},r.a.createElement(N.a,{classes:{root:e.setup}},r.a.createElement(L.a,null,r.a.createElement(k.a,{variant:"h4",gutterBottom:!0},"Display settings"),r.a.createElement(_.a,{name:"start",label:"Time to start counting",type:"datetime-local",InputLabelProps:{shrink:!0}}),r.a.createElement(K.a,{component:"legend",classes:{root:e.panelsetup}},"Numbers to show"),r.a.createElement(Q.a,null,r.a.createElement(V.a,{control:r.a.createElement(X.a,{name:"panels",value:ne.replied}),label:"Replied articles"}),r.a.createElement(V.a,{control:r.a.createElement(X.a,{name:"panels",value:ne.useful}),label:"Article with useful feedback"}))),r.a.createElement(G.a,null,r.a.createElement(J.a,{color:"primary",type:"submit"},"Start"))))},ue=Object(w.a)((function(e){return{titleLink:{color:"inherit",textDecoration:"none","&:hover":{textDecoration:"underline"}},gridContainer:{marginTop:e.spacing(2)}}})),fe=function(){var e=ue();return r.a.createElement(r.a.Fragment,null,r.a.createElement(S.a,{color:"secondary",position:"static"},r.a.createElement(A.a,null,r.a.createElement(s.b,{to:"/",className:e.titleLink},r.a.createElement(k.a,{variant:"h6"},"Cofacts Community Builder")))),r.a.createElement(O.a,{classes:{root:e.gridContainer},maxWidth:"lg"},r.a.createElement(y.c,null,r.a.createElement(y.a,{exact:!0,path:"/"},r.a.createElement(R,null)),r.a.createElement(y.a,{path:"/stats"},r.a.createElement(H,null)),r.a.createElement(y.a,{path:"/editorworks"},r.a.createElement(M,null)),r.a.createElement(y.a,{path:"/bignum/setup"},r.a.createElement(se,null)),r.a.createElement(y.a,{path:"/bignum"},r.a.createElement(ce,null)))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(c.a,{theme:h},r.a.createElement(i.a,null),r.a.createElement(m.a,{client:b},r.a.createElement(s.a,null,r.a.createElement(fe,null))))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},89:function(e,t,a){e.exports=a(102)},98:function(e,t,a){}},[[89,1,2]]]);
//# sourceMappingURL=main.accfa818.chunk.js.map