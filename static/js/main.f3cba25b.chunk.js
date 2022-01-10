(this["webpackJsonpcommunity-builder"]=this["webpackJsonpcommunity-builder"]||[]).push([[0],{188:function(e,t,a){e.exports=a(202)},199:function(e,t,a){},202:function(e,t,a){"use strict";a.r(t);var n,r,o,l,i,c,u,s,d,m,f=a(0),p=a.n(f),E=a(20),b=a.n(E),g=a(262),v=a(253),h=a(14),y=a(58),R=a(162),w=a(3),A=new h.ApolloClient({link:h.ApolloLink.from([new R.a({uri:"".concat("https://api.cofacts.tw","/graphql"),headers:{"x-app-id":"RUMORS_SITE"}})]),cache:new h.InMemoryCache({typePolicies:{Query:{fields:{ListReplies:Object(w.H)(["filter"]),ListReplyRequests:Object(w.H)(["filter"]),ListArticleReplyFeedbacks:Object(w.H)(["filter"])}}}})}),O=a(67),L=a(159),C=a.n(L),S=Object(O.a)({palette:{primary:{main:"#ffb600",50:"#fff890",100:"#fff000",200:"#ffe200",300:"#ffd300",400:"#ffc500",500:"#ffb600",600:"#ffa300",700:"#ff9200",800:"#ff7f00",900:"#ff6d00",light:"#fafafa",dark:"#e8e8e8"},secondary:{main:"#333333",50:"#f5f5f5",100:"#d6d6d6",200:"#adadad",300:"#858585",400:"#5c5c5c",500:"#333333",600:"#2e2e2e",700:"#292929",800:"#242424",900:"#1f1f1f"},error:{main:C.a.A400},background:{default:"#f5f5f5"}},typography:{fontFamily:'"Noto Sans TC", "Helvetica", "Arial", sans-serif'}}),k=(a(199),a(25)),N=a(151),T=a(260),j=a(256),P=a(165),q=a(261),D=a(249),x=a(250),I=a(251),$=a(252),B=Object(N.a)({link:{textDecoration:"none"}}),F=function(e){var t=e.to,a=e.title,n=e.description,r=B();return p.a.createElement(D.a,{item:!0,xs:12,sm:6},p.a.createElement(y.b,{className:r.link,to:t},p.a.createElement(x.a,null,p.a.createElement(I.a,null,p.a.createElement($.a,null,p.a.createElement(P.a,{variant:"h5",gutterBottom:!0},a),p.a.createElement(P.a,{variant:"body1"},n))))))},U=function(){return p.a.createElement(D.a,{container:!0,spacing:2},p.a.createElement(F,{to:"/stats",title:"Statistics",description:"Real-time statistics from Cofacts API"}),p.a.createElement(F,{to:"/need-to-check/setup",title:"Message to check",description:"View list of messages that needs to be checked by editors"}),p.a.createElement(F,{to:"/editorworks",title:"Thank you editors",description:"List of recent works from editors"}),p.a.createElement(F,{to:"/bignum/setup",title:"Big Numbers",description:"Instant number display to project in meetups"}))},M=a(45);function z(){var e=Object(M.a)(["\n    query ReplyListInReplyTable($after: String, $pageSize: Int, $createdAt: TimeRangeInput) {\n  ListReplies(filter: {createdAt: $createdAt}, orderBy: [{createdAt: DESC}], after: $after, first: $pageSize) {\n    edges {\n      cursor\n      node {\n        id\n        text\n        user {\n          id\n          name\n        }\n        createdAt\n      }\n    }\n  }\n}\n    "]);return z=function(){return e},e}function _(){var e=Object(M.a)(["\n    query ReplyListStatInReplyTable($createdAt: TimeRangeInput) {\n  ListReplies(filter: {createdAt: $createdAt}) {\n    totalCount\n    pageInfo {\n      firstCursor\n      lastCursor\n    }\n  }\n}\n    "]);return _=function(){return e},e}function G(){var e=Object(M.a)(["\n    query ReplyRequestListInReplyRequestTable($after: String, $pageSize: Int, $createdAt: TimeRangeInput) {\n  ListReplyRequests(filter: {createdAt: $createdAt}, orderBy: [{createdAt: DESC}], after: $after, first: $pageSize) {\n    edges {\n      cursor\n      node {\n        id\n        reason\n        updatedAt\n        user {\n          id\n          name\n        }\n      }\n    }\n  }\n}\n    "]);return G=function(){return e},e}function H(){var e=Object(M.a)(["\n    query ReplyRequestListStatInReplyRequestTable($createdAt: TimeRangeInput) {\n  ListReplyRequests(filter: {createdAt: $createdAt}) {\n    totalCount\n    pageInfo {\n      firstCursor\n      lastCursor\n    }\n  }\n}\n    "]);return H=function(){return e},e}function Y(){var e=Object(M.a)(["\n    query FeedbackListInFeedbackTable($after: String, $pageSize: Int, $createdAt: TimeRangeInput) {\n  ListArticleReplyFeedbacks(filter: {createdAt: $createdAt}, orderBy: [{createdAt: DESC}], after: $after, first: $pageSize) {\n    edges {\n      cursor\n      node {\n        id\n        comment\n        vote\n        article {\n          id\n          text\n        }\n        reply {\n          id\n          text\n        }\n        user {\n          id\n          name\n        }\n        createdAt\n      }\n    }\n  }\n}\n    "]);return Y=function(){return e},e}function Q(){var e=Object(M.a)(["\n    query FeedbackListStatInFeedbackTable($createdAt: TimeRangeInput) {\n  ListArticleReplyFeedbacks(filter: {createdAt: $createdAt}) {\n    totalCount\n    pageInfo {\n      firstCursor\n      lastCursor\n    }\n  }\n}\n    "]);return Q=function(){return e},e}function V(){var e=Object(M.a)(["\n    query BigNumOfFeedbacks($startTime: String) {\n  query: ListArticleReplyFeedbacks(filter: {createdAt: {GTE: $startTime}}) {\n    totalCount\n  }\n}\n    "]);return V=function(){return e},e}function W(){var e=Object(M.a)(["\n    query BigNumOfReplied($startTime: String) {\n  query: ListArticles(filter: {repliedAt: {GTE: $startTime}}) {\n    totalCount\n  }\n}\n    "]);return W=function(){return e},e}function K(){var e=Object(M.a)(["\n    query LoadAPIStats {\n  allArticles: ListArticles {\n    totalCount\n  }\n  allRepliedArticles: ListArticles(filter: {replyCount: {GTE: 1}}) {\n    totalCount\n  }\n  articlesHasUsefulReplies: ListArticles(filter: {hasArticleReplyWithMorePositiveFeedback: true}) {\n    totalCount\n  }\n}\n    "]);return K=function(){return e},e}!function(e){e.Url="URL",e.Line="LINE"}(n||(n={})),function(e){e.OpenPeeps="OpenPeeps",e.Gravatar="Gravatar",e.Facebook="Facebook",e.Github="Github"}(r||(r={})),function(e){e.Rumor="RUMOR",e.NotRumor="NOT_RUMOR",e.NotArticle="NOT_ARTICLE",e.Opinionated="OPINIONATED"}(o||(o={})),function(e){e.Normal="NORMAL",e.Deleted="DELETED",e.Blocked="BLOCKED"}(l||(l={})),function(e){e.Asc="ASC",e.Desc="DESC"}(i||(i={})),function(e){e.Normal="NORMAL",e.Blocked="BLOCKED"}(c||(c={})),function(e){e.Upvote="UPVOTE",e.Neutral="NEUTRAL",e.Downvote="DOWNVOTE"}(u||(u={})),function(e){e.Normal="NORMAL",e.Deleted="DELETED",e.Blocked="BLOCKED"}(s||(s={})),function(e){e.Normal="NORMAL",e.Blocked="BLOCKED"}(d||(d={})),function(e){e.Empty="EMPTY",e.NotTrimmed="NOT_TRIMMED",e.HasUriComponent="HAS_URI_COMPONENT",e.Taken="TAKEN"}(m||(m={}));var J=Object(h.gql)(K());Object(h.gql)(W());Object(h.gql)(V());var X=Object(h.gql)(Q());var Z=Object(h.gql)(Y());var ee=Object(h.gql)(H());var te=Object(h.gql)(G());var ae=Object(h.gql)(_());var ne=Object(h.gql)(z());function re(e){return e.toString().replace(/(\d{1,3})(?=(\d{3})+$)/,"$1,")}var oe,le=a(207),ie=function(e){var t=e.name,a=e.value;return p.a.createElement(D.a,{item:!0,xs:12,sm:4},p.a.createElement(x.a,null,p.a.createElement($.a,null,p.a.createElement(P.a,{variant:"body1",gutterBottom:!0},t),p.a.createElement(P.a,{variant:"h5"},a))))},ce=function(){var e,t,a,n,r=(n={pollInterval:5e3},h.useQuery(J,n)),o=r.data;return r.loading?p.a.createElement(P.a,{align:"center",component:"div"},p.a.createElement(le.a,{size:64})):p.a.createElement(D.a,{container:!0,spacing:2},p.a.createElement(ie,{name:"All messages",value:re((null===o||void 0===o||null===(e=o.allArticles)||void 0===e?void 0:e.totalCount)||0)}),p.a.createElement(ie,{name:"Replied messages",value:re((null===o||void 0===o||null===(t=o.allRepliedArticles)||void 0===t?void 0:t.totalCount)||0)}),p.a.createElement(ie,{name:"Has useful replies",value:re((null===o||void 0===o||null===(a=o.articlesHasUsefulReplies)||void 0===a?void 0:a.totalCount)||0)}))},ue=function(){return p.a.createElement("div",null,"Need-to-check form")};!function(e){e.desc="desc",e.asc="asc"}(oe||(oe={}));var se,de=function(){var e=Object(k.g)().search,t=new URLSearchParams(e);t.get("notRepliedCount"),t.get("notRepliedSortBy"),t.get("notRepliedSortOrder"),t.get("noUsefulCount"),t.get("noUsefulSortBy"),t.get("noUsefulSortOrder");return p.a.createElement("div",null,"Need-to-check table")},me=a(10),fe=a(109),pe=a(129),Ee=a(54),be=a(155),ge=a(257),ve=a(163),he=a(160),ye=function(e){var t=e.currentlyLoadedRows,a=e.onNewPageRequest,n=e.loading,r=Object(ve.a)(e,["currentlyLoadedRows","onNewPageRequest","loading"]),o=Object(f.useState)(0),l=Object(me.a)(o,2),i=l[0],c=l[1],u=Object(f.useState)((function(){return Math.floor(t.length/50)-1})),s=Object(me.a)(u,2),d=s[0],m=s[1];return p.a.createElement(he.a,Object.assign({},r,{rows:t.slice(50*i),pagination:!0,disableSelectionOnClick:!0,page:i,pageSize:50,paginationMode:"server",rowsPerPageOptions:[50],onPageChange:function(e){c(e),e<=d||(a(e),m(e))},loading:n,hideFooterPagination:n}))},Re=Object(be.a)("div")({width:"100%",overflow:"hidden",display:"-webkit-box",whiteSpace:"normal",lineHeight:1.2,"-webkit-box-orient":"vertical","-webkit-line-clamp":3}),we=[{field:"author",headerName:"Author",width:120,renderCell:function(e){var t=e.getValue(e.id,"user");return t?p.a.createElement(ge.a,{href:"".concat("https://cofacts.tw","/user?id=").concat(t.id),color:"textPrimary",variant:"body2"},t.name):p.a.createElement("div",null)}},{field:"text",headerName:"Text",width:480,renderCell:function(e){var t=e.getValue(e.id,"text"),a=e.getValue(e.id,"id");return a&&t?p.a.createElement(Re,null,p.a.createElement(ge.a,{href:"".concat("https://cofacts.tw","/reply/").concat(a),color:"textPrimary",variant:"body2"},t)):p.a.createElement("div",null)}},{field:"createdAt",headerName:"Created At",width:200,valueGetter:function(e){var t=e.value;return t?new Date(t).toLocaleString():""}}],Ae=function(e){var t,a,n,r={GTE:e.startDate,LTE:e.endDate},o=(n={variables:{createdAt:r}},h.useQuery(ae,n)),l=o.data,i=o.loading,c=o.error,u=function(e){return h.useQuery(ne,e)}({notifyOnNetworkStatusChange:!0,variables:{pageSize:50,createdAt:r}}),s=u.data,d=u.loading,m=u.error,f=u.fetchMore;if(m)return p.a.createElement("p",null,"Error: ",m);if(c)return p.a.createElement("p",null,"Error: ",c);var E=(null===s||void 0===s||null===(t=s.ListReplies)||void 0===t?void 0:t.edges)||[];return p.a.createElement(ye,{currentlyLoadedRows:E.map((function(e){return e.node})),columns:we,rowHeight:64,rowCount:(null===l||void 0===l||null===(a=l.ListReplies)||void 0===a?void 0:a.totalCount)||0,onNewPageRequest:function(){return f({variables:{after:E[E.length-1].cursor}})},loading:d||i})},Oe=Object(be.a)("div")({width:"100%",overflow:"hidden",display:"-webkit-box",whiteSpace:"normal",lineHeight:1.2,"-webkit-box-orient":"vertical","-webkit-line-clamp":3}),Le=[{field:"author",headerName:"Author",width:160,renderCell:function(e){var t=e.getValue(e.id,"user");return t?p.a.createElement(ge.a,{href:"".concat("https://cofacts.tw","/user?id=").concat(t.id),color:"textPrimary",variant:"body2"},t.name):p.a.createElement("div",null)}},{field:"vote",headerName:"Vote",width:48,valueGetter:function(e){switch(e.value){case u.Upvote:return"\ud83d\udc4d";case u.Downvote:return"\ud83d\udc4e";default:return"--"}}},{field:"comment",headerName:"Comment",width:300,renderCell:function(e){var t=e.value;return p.a.createElement(Oe,null,t)}},{field:"target",headerName:"Article & Reply",width:480,renderCell:function(e){var t=e.getValue(e.id,"article"),a=e.getValue(e.id,"reply");return p.a.createElement("div",null,t&&p.a.createElement(ge.a,{href:"".concat("https://cofacts.tw","/article/").concat(t.id),color:"textPrimary",variant:"body2"},p.a.createElement(P.a,{variant:"body2"},t.text||"")),a&&p.a.createElement(ge.a,{href:"".concat("https://cofacts.tw","/reply/").concat(a.id),color:"textPrimary",variant:"body2"},p.a.createElement(P.a,{variant:"body2"},a.text||"")))}},{field:"createdAt",headerName:"Created At",width:200,valueGetter:function(e){var t=e.value;return t?new Date(t).toLocaleString():""}}],Ce=function(e){var t,a,n,r={GTE:e.startDate,LTE:e.endDate},o=(n={variables:{createdAt:r}},h.useQuery(X,n)),l=o.data,i=o.loading,c=o.error,u=function(e){return h.useQuery(Z,e)}({notifyOnNetworkStatusChange:!0,variables:{pageSize:50,createdAt:r}}),s=u.data,d=u.loading,m=u.error,f=u.fetchMore;if(m)return p.a.createElement("p",null,"Error: ",m);if(c)return p.a.createElement("p",null,"Error: ",c);var E=(null===s||void 0===s||null===(t=s.ListArticleReplyFeedbacks)||void 0===t?void 0:t.edges)||[];return p.a.createElement(ye,{currentlyLoadedRows:E.map((function(e){return e.node})),columns:Le,rowHeight:64,rowCount:(null===l||void 0===l||null===(a=l.ListArticleReplyFeedbacks)||void 0===a?void 0:a.totalCount)||0,onNewPageRequest:function(){return f({variables:{after:E[E.length-1].cursor}})},loading:d||i})},Se=Object(be.a)("div")({width:"100%",overflow:"hidden",display:"-webkit-box",whiteSpace:"normal",lineHeight:1.2,"-webkit-box-orient":"vertical","-webkit-line-clamp":3}),ke=[{field:"author",headerName:"Author",width:160,renderCell:function(e){var t=e.getValue(e.id,"user");return t?p.a.createElement(ge.a,{href:"".concat("https://cofacts.tw","/user?id=").concat(t.id),color:"textPrimary",variant:"body2"},t.name):p.a.createElement("div",null)}},{field:"reason",headerName:"Reason",width:300,renderCell:function(e){var t=e.value;return p.a.createElement(Se,null,t)}},{field:"updatedAt",headerName:"Updated At",width:200,valueGetter:function(e){var t=e.value;return t?new Date(t).toLocaleString():""}}],Ne=function(e){var t,a,n,r={GTE:e.startDate,LTE:e.endDate},o=(n={variables:{createdAt:r}},h.useQuery(ee,n)),l=o.data,i=o.loading,c=o.error,u=function(e){return h.useQuery(te,e)}({notifyOnNetworkStatusChange:!0,variables:{pageSize:50,createdAt:r}}),s=u.data,d=u.loading,m=u.error,f=u.fetchMore;if(m)return p.a.createElement("p",null,"Error: ",m);if(c)return p.a.createElement("p",null,"Error: ",c);var E=(null===s||void 0===s||null===(t=s.ListReplyRequests)||void 0===t?void 0:t.edges)||[];return p.a.createElement(ye,{currentlyLoadedRows:E.map((function(e){return e.node})),columns:ke,rowHeight:64,rowCount:(null===l||void 0===l||null===(a=l.ListReplyRequests)||void 0===a?void 0:a.totalCount)||0,onNewPageRequest:function(){return f({variables:{after:E[E.length-1].cursor}})},loading:d||i})},Te=Object(N.a)((function(e){return{controls:{marginBottom:e.spacing(2)},controlContent:{display:"flex",alignItems:"center",gap:"8px"}}}));!function(e){e[e.REPLY=0]="REPLY",e[e.ARTICLE_REPLY_FEEDBACK=1]="ARTICLE_REPLY_FEEDBACK",e[e.REPLY_REQUEST=2]="REPLY_REQUEST"}(se||(se={}));var je,Pe=function(){var e=Te(),t=Object(f.useState)(se.REPLY),a=Object(me.a)(t,2),n=a[0],r=a[1],o=Object(f.useState)(7),l=Object(me.a)(o,2),i=l[0],c=l[1];return p.a.createElement(p.a.Fragment,null,p.a.createElement(x.a,{classes:{root:e.controls}},p.a.createElement($.a,{classes:{root:e.controlContent}},p.a.createElement(pe.a,{select:!0,value:n,onChange:function(e){return r(+e.target.value)}},p.a.createElement(Ee.a,{value:se.REPLY},"Replies"),p.a.createElement(Ee.a,{value:se.ARTICLE_REPLY_FEEDBACK},"Feedbacks"),p.a.createElement(Ee.a,{value:se.REPLY_REQUEST},"Comments"))," ","in the last"," ",p.a.createElement("input",{type:"number",defaultValue:i,onBlur:function(e){return c(+e.target.value)}})," ","days")),p.a.createElement(fe.a,{style:{height:700}},n===se.REPLY?p.a.createElement(Ae,{startDate:"now-".concat(i,"d")}):n===se.ARTICLE_REPLY_FEEDBACK?p.a.createElement(Ce,{startDate:"now-".concat(i,"d")}):n===se.REPLY_REQUEST?p.a.createElement(Ne,{startDate:"now-".concat(i,"d")}):null))},qe=a(259),De=a(72),xe=a(208),Ie=a(258),$e=a(212),Be=a(168),Fe=a(8),Ue={7:{top:"Lucky"},17:{bottom:"8+9"},21:{top:"\u6bcf\u5929\u53ea\u6709",bottom:"\u5c0f\u6642\uff0c\u5269\u4e0b 3 \u5c0f\u6642\u662f\u7528\u4f86\u7761\u89ba\u7684"},30:{bottom:"\u800c\u7acb"},38:{bottom:"\u5a66\u5973\u7bc0"},40:{bottom:"\u4e0d\u60d1"},44:{bottom:"\u96bb\u77f3\u7345\u5b50"},50:{bottom:"\u77e5\u5929\u547d"},56:{bottom:"\u4e0d\u80fd\u4ea1"},60:{top:"\u5728\u975e\u6d32\u6bcf\u904e\u4e86",bottom:"\u79d2\uff0c\u5c31\u6709\u4e00\u5206\u9418\u904e\u53bb"},64:{top:"\u52ff\u5fd8"},70:{bottom:"\u96a8\u5fc3\u6240\u6b32\u800c\u4e0d\u8e30\u77e9"},77:{top:"\u68ee"},87:{bottom:"\u4e0d\u80fd\u518d\u9ad8\u4e86"},92:{top:"\u6c92\u6709\u5171\u8b58\u7684",bottom:"\u5171\u8b58"},94:{bottom:"\u72c2"},101:{bottom:"\u5927\u6a13"},104:{bottom:"\u67e5\u865f\u53f0"},113:{top:"\u885b\u798f\u90e8",bottom:"\u4fdd\u8b77\u5c08\u7dda"},118:{top:"\u770b\u5230",bottom:"\u5c31\u8dea\u4e86"},123:{bottom:"\u6728\u982d\u4eba"},128:{top:"2\u76847\u6b21\u65b9"},144:{top:"12\xd712="},165:{top:"\u8b66\u653f\u7f72",bottom:"\u53cd\u8a50\u9a19\u5c08\u7dda"},183:{bottom:"CLUB"},193:{bottom:"\u7e23\u9053"},200:{top:"\u610f\u5916\u64bf\u5230",bottom:"\u5143"},228:{bottom:"\u4e8c\u4e8c\u516b"},318:{bottom:"\u5b78\u904b"},377:{bottom:"\u68ee\u4e03\u4e03"},500:{top:"\u4e0b\u53bb\u9818"}};function Me(){var e=Object(M.a)(["\n      query BigNumOfFeedbacks($startTime: String) {\n        query: ListArticleReplyFeedbacks(\n          filter: { createdAt: { GTE: $startTime } }\n        ) {\n          totalCount\n        }\n      }\n    "]);return Me=function(){return e},e}function ze(){var e=Object(M.a)(["\n      query BigNumOfReplied($startTime: String) {\n        query: ListArticles(filter: { repliedAt: { GTE: $startTime } }) {\n          totalCount\n        }\n      }\n    "]);return ze=function(){return e},e}var _e;!function(e){e.replied="replied",e.feedback="feedback"}(_e||(_e={}));var Ge=(je={},Object(Fe.a)(je,_e.replied,{top:"\u56de\u8986\u4e86",bottom:"\u5247\u8a0a\u606f",query:Object(h.gql)(ze())}),Object(Fe.a)(je,_e.feedback,{top:"\u65b0\u589e\u4e86",bottom:"\u5247\u8a55\u50f9",query:Object(h.gql)(Me())}),je),He=Object(N.a)({displays:{position:"fixed",top:0,right:0,bottom:0,left:0,display:"flex",background:"#fff"},resizer:{flex:1,position:"relative"},display:{position:"absolute",width:768,height:768,left:"50%",top:"50%",display:"flex",flexFlow:"column",justifyContent:"space-around",textAlign:"center","& > p":{margin:0}},time:{fontSize:36,fontWeight:200},top:{fontSize:64,fontWeight:600},bottom:{fontSize:44,fontWeight:600},number:{fontSize:360,lineHeight:1,fontWeight:400},funNumber:{fontSize:360,fontWeight:100},funParagraph:{fontSize:84,fontWeight:600},border:{position:"absolute",border:"8px solid rgba(0,0,0,0.64)",top:24,right:24,bottom:24,left:24}}),Ye=function(e){var t,a=e.rootProps,n=e.start,r=e.panelType,o=He(),l=Ge[r],i=l.top,c=l.bottom,u=l.query,s=Object(h.useQuery)(u,{pollInterval:5e3,variables:{startTime:n.toISOString()}}),d=s.data,m=s.loading,f=s.error;if(m)return p.a.createElement("div",a,"Loading");if(f)return p.a.createElement("div",a,f.toString());var E=null===(t=d.query)||void 0===t?void 0:t.totalCount,b=null===E?"":E.toString();if(E&&E in Ue){var g=Ue[E],v=g.top,y=g.bottom;return p.a.createElement(p.a.Fragment,null,p.a.createElement("div",a,v&&p.a.createElement("p",{className:o.funParagraph},v),p.a.createElement("p",{className:o.funNumber},b),y&&p.a.createElement("p",{className:o.funParagraph},y)),p.a.createElement("div",{className:o.border}))}return p.a.createElement("div",a,p.a.createElement("p",{className:o.time},"\u81ea ",n.toLocaleString()," \u8d77"),p.a.createElement("p",{className:o.top},i),p.a.createElement("p",{className:o.number},b),p.a.createElement("p",{className:o.bottom},c))},Qe=function(e){var t=e.children,a=He(),n=Object(f.useState)(1),r=Object(me.a)(n,2),o=r[0],l=r[1],i=Object(f.useRef)(null);return Object(f.useEffect)((function(){function e(){if(null!==i.current){var e=i.current.getBoundingClientRect(),t=e.width,a=e.height,n=Math.max(t-80,0)/768,r=Math.max(a-80,0)/768;l(Math.min(n,r))}}return window.addEventListener("resize",e),e(),function(){window.removeEventListener("resize",e)}}),[]),p.a.createElement("div",{className:a.resizer,ref:i},t({className:a.display,style:{transform:"translate(-50%, -50%) scale(".concat(o,")")}}))},Ve=function(){var e=Object(k.g)().search,t=He(),a=new URLSearchParams(e),n=a.get("start"),r=a.getAll("panels"),o=n?new Date(n):new Date,l=r.map((function(e){if(!(t=_e,function(e){return Object.values(t).includes(e)})(e))throw new Error("panels must be one of PanelType.");var t;return _e[e]}));return p.a.createElement("div",{className:t.displays},l.map((function(e){return p.a.createElement(Qe,{key:e},(function(t){return p.a.createElement(Ye,{rootProps:t,panelType:e,start:o})}))})))},We=Object(N.a)((function(e){return{setup:{margin:"".concat(e.spacing(2),"px auto")},panelsetup:{marginTop:e.spacing(4),marginBottom:e.spacing(1)}}})),Ke=function(){var e=We(),t=Object(k.f)();return p.a.createElement("form",{onSubmit:function(e){e.preventDefault();var a=new URLSearchParams(new FormData(e.target)).toString();t.push("/bignum?"+a)}},p.a.createElement(x.a,{classes:{root:e.setup}},p.a.createElement($.a,null,p.a.createElement(P.a,{variant:"h4",gutterBottom:!0},"Display settings"),p.a.createElement(pe.a,{name:"start",label:"Time to start counting",type:"datetime-local",InputLabelProps:{shrink:!0}}),p.a.createElement(xe.a,{component:"legend",classes:{root:e.panelsetup}},"Numbers to show"),p.a.createElement(Ie.a,null,p.a.createElement($e.a,{control:p.a.createElement(Be.a,{name:"panels",value:_e.replied,defaultChecked:!0}),label:"Replied articles"}),p.a.createElement($e.a,{control:p.a.createElement(Be.a,{name:"panels",value:_e.feedback,defaultChecked:!0}),label:"Feedbacks"}))),p.a.createElement(qe.a,null,p.a.createElement(De.a,{color:"primary",type:"submit"},"Start"))))},Je=Object(N.a)((function(e){return{titleLink:{color:"inherit",textDecoration:"none","&:hover":{textDecoration:"underline"}},gridContainer:{marginTop:e.spacing(2)}}})),Xe=function(){var e=Je();return p.a.createElement(p.a.Fragment,null,p.a.createElement(T.a,{color:"secondary",position:"static"},p.a.createElement(j.a,null,p.a.createElement(y.b,{to:"/",className:e.titleLink},p.a.createElement(P.a,{variant:"h6"},"Cofacts Community Builder")))),p.a.createElement(q.a,{classes:{root:e.gridContainer},maxWidth:"lg"},p.a.createElement(k.c,null,p.a.createElement(k.a,{exact:!0,path:"/"},p.a.createElement(U,null)),p.a.createElement(k.a,{path:"/stats"},p.a.createElement(ce,null)),p.a.createElement(k.a,{path:"/need-to-check/setup"},p.a.createElement(ue,null)),p.a.createElement(k.a,{path:"/need-to-check"},p.a.createElement(de,null)),p.a.createElement(k.a,{path:"/editorworks"},p.a.createElement(Pe,null)),p.a.createElement(k.a,{path:"/bignum/setup"},p.a.createElement(Ke,null)),p.a.createElement(k.a,{path:"/bignum"},p.a.createElement(Ve,null)))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));b.a.render(p.a.createElement(p.a.StrictMode,null,p.a.createElement(v.a,{theme:S},p.a.createElement(g.a,null),p.a.createElement(h.ApolloProvider,{client:A},p.a.createElement(y.a,null,p.a.createElement(Xe,null))))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[188,1,2]]]);
//# sourceMappingURL=main.f3cba25b.chunk.js.map