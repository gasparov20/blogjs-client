(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{163:function(e,t,n){},168:function(e,t,n){},284:function(e,t,n){},287:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(28),i=n.n(c),s=(n(163),n(8)),o=(n(164),n(165),n(166),n(167),n(168),n(14)),l=n(34),u=n(15),j=n.n(u),d=n(18),b=n(342),m=n(353),p=n(1),x=function(e){return Object(p.jsx)("div",{children:Object(p.jsx)(m.a,{elevation:2,children:Object(p.jsx)("p",{style:{fontSize:"1.25rem",padding:"2rem"},children:e.text})})})},f=n(132),O=n(338),h=n(354),g=function(){var e=Object(a.useState)(!1),t=Object(s.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)(),i=Object(s.a)(c,2),o=i[0],l=i[1],u=Object(a.useRef)([]),b=Object(a.useCallback)(function(){var e=Object(d.a)(j.a.mark((function e(t){var n,a,c,i,s,o,d=arguments;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=d.length>1&&void 0!==d[1]?d[1]:"GET",a=d.length>2&&void 0!==d[2]?d[2]:null,c=d.length>3&&void 0!==d[3]?d[3]:{},r(!0),i=new AbortController,u.current.push(i),e.prev=6,e.next=9,fetch(t,{method:n,body:a,headers:c,signal:i.signal});case 9:return s=e.sent,e.next=12,s.json();case 12:if(o=e.sent,s.ok){e.next=16;break}throw console.log(s),new Error(o.message);case 16:return r(!1),e.abrupt("return",o);case 20:throw e.prev=20,e.t0=e.catch(6),l(e.t0.message),e.t0;case 24:r(!1);case 25:case"end":return e.stop()}}),e,null,[[6,20]])})));return function(t){return e.apply(this,arguments)}}(),[]);return Object(a.useEffect)((function(){return function(){u.current.forEach((function(e){return e.abort()}))}}),[]),{isLoading:n,error:o,sendRequest:b,clearError:function(){l(null)}}},v=Object(a.createContext)({userName:null,fullName:null,userId:null,userType:null,isLoggedIn:!1,token:null,login:function(){},logout:function(){}}),y=n(131),w=n.n(y),C=function(e){var t=Object(a.useContext)(v),n=g(),r=(n.isLoading,n.error,n.sendRequest),c=(n.clearError,function(){var t=Object(d.a)(j.a.mark((function t(){var n;return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,r("".concat("/api","/posts/").concat(e.postID,"/comments/").concat(e.id),"DELETE");case 2:n=t.sent,e.refreshComments(n);case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}());return Object(p.jsxs)("div",{style:{justifyItems:"center"},children:[Object(p.jsxs)("p",{style:{display:"inline-block"},children:[Object(p.jsxs)("strong",{children:[e.creator,": "]}),e.comment]}),Object(p.jsx)("p",{style:{display:"inline-block",float:"right"},children:e.createdAt}),("admin"===t.userType||t.fullName===e.creator)&&Object(p.jsx)(w.a,{onClick:c,style:{display:"inline-block",float:"right"}})]},e.id)},S=function(e){return Object(p.jsx)("div",{children:e.comments.map((function(t){return Object(p.jsx)(C,{refreshComments:e.refreshComments,postID:e.postID,id:t.id,comment:t.comment,creator:t.creator,creatorID:t.creatorID},t.id)}))})},k=function(e){var t=g(),n=(t.isLoading,t.error,t.sendRequest),r=(t.clearError,Object(a.useState)([])),c=Object(s.a)(r,2),i=c[0],o=c[1],l=Object(a.useState)(""),u=Object(s.a)(l,2),b=u[0],x=u[1],f=Object(a.useState)(!1),y=Object(s.a)(f,2),w=y[0],C=y[1],k=Object(a.useContext)(v);Object(a.useEffect)((function(){var t=function(){var t=Object(d.a)(j.a.mark((function t(){var a;return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n("".concat("/api","/posts/").concat(e.id,"/comments"),"GET");case 2:a=t.sent,o(a);case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();t()}),[i.length,e.id]);var T=function(){var e=Object(d.a)(j.a.mark((function e(t){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:o(t);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),E=function(){var t=Object(d.a)(j.a.mark((function t(a){var r;return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(13!==a.keyCode){t.next=6;break}return t.next=3,n("".concat("/api","/posts/").concat(e.id,"/comments/add"),"POST",JSON.stringify({comment:b,creator:k.fullName,creatorID:k.userId}),{"Content-Type":"application/json"});case 3:r=t.sent,x(""),o(r);case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return Object(p.jsx)("div",{style:{marginBottom:"2rem"},children:Object(p.jsxs)(m.a,{style:{padding:"2rem",paddingBottom:"1rem"},elevation:2,children:[Object(p.jsxs)("div",{style:{paddingBottom:"1rem"},children:[Object(p.jsx)("div",{style:{display:"inline-block",fontSize:"1.5rem",fontWeight:"bold"},children:e.title}),Object(p.jsx)("div",{style:{fontStyle:"italic",display:"inline-block",fontSize:"0.75rem",marginLeft:"3rem"},children:e.author}),Object(p.jsx)("div",{style:{display:"inline-block",fontSize:"1.5rem",float:"right"},children:function(e){var t=e.substring(11,16),n=e.substring(0,4),a=e.substring(5,7),r=e.substring(8,10);return"".concat(t," ").concat(a,"/").concat(r,"/").concat(n)}(e.date)})]}),Object(p.jsx)("div",{style:{paddingBottom:"1rem"},children:e.postBody}),Object(p.jsx)(h.a,{}),Object(p.jsx)("div",{style:{display:"inline-block",marginTop:"0.5rem"},children:Object(p.jsxs)("p",{onMouseEnter:function(){document.getElementById("root").style.cursor="pointer"},onMouseLeave:function(){document.getElementById("root").style.cursor=null},onClick:function(){C(!w)},children:["Comments (",i.length,")"]})}),Object(p.jsx)("div",{style:{display:"inline-block",marginTop:"0.5rem",float:"right"},children:"2 min read"}),w&&Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)(S,{refreshComments:T,postID:e.id,comments:i}),k.isLoggedIn&&Object(p.jsx)(O.a,{onKeyDown:E,value:b,onChange:function(e){x(e.target.value)},fullWidth:!0,placeholder:"Type your comment and hit enter",style:{display:"inline-flex"}})]})]})})},T=function(e){var t=e.posts.reverse();return Object(p.jsx)("div",{style:{marginTop:"3rem"},children:t.map((function(e){return Object(p.jsx)(k,{id:e.id,title:e.title,postBody:Object(p.jsx)(f.a,{content:e.postBody}),date:e.createdAt,author:e.creator},e.id)}))})},E=function(){var e=g(),t=(e.isLoading,e.error,e.sendRequest),n=(e.clearError,Object(a.useState)([])),r=Object(s.a)(n,2),c=r[0],i=r[1],l=Object(a.useContext)(v),u=Object(o.f)();function m(){return(m=Object(d.a)(j.a.mark((function e(){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:u("/create");case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function f(){return(f=Object(d.a)(j.a.mark((function e(){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t("".concat("/api","/posts/"),"DELETE");case 2:e.sent,i([]);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}Object(a.useEffect)((function(){var e=function(){var e=Object(d.a)(j.a.mark((function e(){var n;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t("".concat("/api","/posts/all"),"GET");case 3:n=e.sent,i(n),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0.message);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}();e()}),[c.length]);return Object(p.jsx)(p.Fragment,{children:Object(p.jsxs)("div",{children:[l.isLoggedIn&&Object(p.jsx)(b.a,{onClick:function(){return m.apply(this,arguments)},children:"Create Post"}),Object(p.jsx)(x,{text:"Vitae tortor condimentum lacinia quis vel eros donec ac. Duis at consectetur lorem donec massa. Sollicitudin ac orci phasellus egestas tellus rutrum tellus. Elit ut aliquam purus sit. Quisque egestas diam in arcu cursus euismod."}),Object(p.jsx)(T,{posts:c}),l.isLoggedIn&&"admin"===l.userType&&Object(p.jsx)(b.a,{onClick:function(){return f.apply(this,arguments)},children:"Delete All Posts"})]})})},I=n(346),N=n(347),D=n(348),L=n(137),q=n(345),F=Object(L.a)({palette:{primary:{main:"#ffffff"}}}),B=Object(L.a)({palette:{primary:{main:"#ffffff"}}}),P=function(){var e=Object(a.useContext)(v);return Object(p.jsx)(I.a,{position:"absolute",display:"flex",children:Object(p.jsxs)(N.a,{children:[Object(p.jsx)("div",{style:{display:"contents",float:"left"},children:Object(p.jsx)(q.a,{theme:F,children:Object(p.jsx)(D.a,{color:"primary",component:l.b,to:"/",style:{textDecoration:"none",flex:1,padding:"1rem",paddingLeft:"0"},variant:"h3",children:"blog.js"})})}),Object(p.jsxs)("div",{style:{display:"flex",float:"right"},children:[!e.isLoggedIn&&Object(p.jsxs)(r.a.Fragment,{children:[Object(p.jsx)(q.a,{theme:F,children:Object(p.jsx)(l.b,{to:"/login",children:Object(p.jsx)(b.a,{style:{float:"right"},color:"primary",children:"Login"})})}),Object(p.jsx)(q.a,{theme:B,children:Object(p.jsx)(l.b,{to:"/register",children:Object(p.jsx)(b.a,{style:{float:"right"},color:"primary",children:"Register"})})})]}),e.isLoggedIn&&Object(p.jsxs)(r.a.Fragment,{children:[Object(p.jsxs)("div",{style:{display:"inline-block",paddingRight:"5rem",justifyContent:"center"},children:["Hello, ",e.firstName]}),Object(p.jsx)(q.a,{theme:F,children:Object(p.jsx)(l.b,{to:"/logout",children:Object(p.jsx)(b.a,{style:{float:"right"},color:"primary",children:"Logout"})})})]})]})]})})},W=n(53),R=n(343),A=n(337),z=n(351),J=n(339),G=n(352),M=n(344),U=n(350),V=n(82),Y=n.n(V),H=n(349);function K(e){return Object(p.jsxs)(D.a,Object(W.a)(Object(W.a)({variant:"body2",color:"text.secondary",align:"center"},e),{},{children:["Copyright \xa9 ","Andrew Gasparovich"," ",(new Date).getFullYear(),"."]}))}var Q=Object(L.a)(),X=function(){var e=Object(a.useState)(""),t=Object(s.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)(""),i=Object(s.a)(c,2),l=i[0],u=i[1],m=Object(a.useContext)(v),x=g(),f=(x.isLoading,x.error,x.sendRequest),h=(x.clearError,Object(o.f)()),y=function(){var e=Object(d.a)(j.a.mark((function e(t){var a;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,f("".concat("/api","/users/login"),"POST",JSON.stringify({email:n,password:l}),{"Content-Type":"application/json"});case 4:a=e.sent,m.login(a.userId,a.token,a.userName,a.userType,a.fullName),h("/"),e.next=11;break;case 9:e.prev=9,e.t0=e.catch(1);case 11:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(t){return e.apply(this,arguments)}}();return Object(p.jsx)(q.a,{theme:Q,children:Object(p.jsxs)(H.a,{className:"mainBody",component:"main",maxWidth:"xs",children:[Object(p.jsx)(A.a,{}),Object(p.jsxs)(U.a,{sx:{marginTop:8,display:"flex",flexDirection:"column",alignItems:"center"},children:[Object(p.jsx)(R.a,{sx:{m:1,bgcolor:"secondary.main"},children:Object(p.jsx)(Y.a,{})}),Object(p.jsx)(D.a,{component:"h1",variant:"h5",children:"Sign in"}),Object(p.jsxs)(U.a,{component:"form",onSubmit:y,noValidate:!0,sx:{mt:1},children:[Object(p.jsx)(O.a,{margin:"normal",required:!0,fullWidth:!0,id:"email",label:"Email Address",name:"email",autoComplete:"email",autoFocus:!0,onChange:function(e){r(e.target.value)}}),Object(p.jsx)(O.a,{margin:"normal",required:!0,fullWidth:!0,name:"password",label:"Password",type:"password",id:"password",autoComplete:"current-password",onChange:function(e){u(e.target.value)}}),Object(p.jsx)(z.a,{control:Object(p.jsx)(J.a,{value:"remember",color:"primary"}),label:"Remember me"}),Object(p.jsx)(b.a,{type:"submit",fullWidth:!0,variant:"contained",sx:{mt:3,mb:2},children:"Sign In"}),Object(p.jsxs)(M.a,{container:!0,children:[Object(p.jsx)(M.a,{item:!0,xs:!0,children:Object(p.jsx)(G.a,{href:"#",variant:"body2",children:"Forgot password?"})}),Object(p.jsx)(M.a,{item:!0,children:Object(p.jsx)(G.a,{href:"../register",variant:"body2",children:"Don't have an account? Sign Up"})})]})]})]}),Object(p.jsx)(K,{sx:{mt:8,mb:4}})]})})};function Z(e){return Object(p.jsxs)(D.a,Object(W.a)(Object(W.a)({variant:"body2",color:"text.secondary",align:"center"},e),{},{children:["Copyright \xa9 ",Object(p.jsx)(G.a,{color:"inherit",href:"https://mui.com/",children:"Your Website"})," ",(new Date).getFullYear(),"."]}))}var $,_,ee,te,ne,ae,re=Object(L.a)(),ce=function(){var e=Object(a.useState)(""),t=Object(s.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)(""),i=Object(s.a)(c,2),l=i[0],u=i[1],m=Object(a.useState)(""),x=Object(s.a)(m,2),f=x[0],h=x[1],y=Object(a.useState)(""),w=Object(s.a)(y,2),C=w[0],S=w[1],k=Object(a.useContext)(v),T=g(),E=(T.isLoading,T.error,T.sendRequest),I=(T.clearError,Object(o.f)()),N=function(){var e=Object(d.a)(j.a.mark((function e(t){var a,r;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),a=new FormData(t.currentTarget),console.log(a.values),e.prev=3,e.next=6,E("http://localhost:5000/api/users/register","POST",JSON.stringify({firstName:n,lastName:l,email:f,password:C,userType:"user"}),{"Content-Type":"application/json"});case 6:return e.sent,e.next=9,E("".concat("/api","/users/login"),"POST",JSON.stringify({email:f,password:C}),{"Content-Type":"application/json"});case 9:r=e.sent,k.login(r.userId,r.token,r.userName,r.userType),e.next=15;break;case 13:e.prev=13,e.t0=e.catch(3);case 15:I("/");case 16:case"end":return e.stop()}}),e,null,[[3,13]])})));return function(t){return e.apply(this,arguments)}}();return Object(p.jsx)(q.a,{theme:re,children:Object(p.jsxs)(H.a,{component:"main",maxWidth:"xs",children:[Object(p.jsx)(A.a,{}),Object(p.jsxs)(U.a,{sx:{marginTop:8,display:"flex",flexDirection:"column",alignItems:"center"},children:[Object(p.jsx)(R.a,{sx:{m:1,bgcolor:"secondary.main"},children:Object(p.jsx)(Y.a,{})}),Object(p.jsx)(D.a,{component:"h1",variant:"h5",children:"Sign up"}),Object(p.jsxs)(U.a,{component:"form",noValidate:!0,onSubmit:N,sx:{mt:3},children:[Object(p.jsxs)(M.a,{container:!0,spacing:2,children:[Object(p.jsx)(M.a,{item:!0,xs:12,sm:6,children:Object(p.jsx)(O.a,{autoComplete:"given-name",name:"firstName",required:!0,fullWidth:!0,id:"firstName",label:"First Name",autoFocus:!0,value:n,onChange:function(e){r(e.target.value)}})}),Object(p.jsx)(M.a,{item:!0,xs:12,sm:6,children:Object(p.jsx)(O.a,{required:!0,fullWidth:!0,id:"lastName",label:"Last Name",name:"lastName",autoComplete:"family-name",value:l,onChange:function(e){u(e.target.value)}})}),Object(p.jsx)(M.a,{item:!0,xs:12,children:Object(p.jsx)(O.a,{required:!0,fullWidth:!0,id:"email",label:"Email Address",name:"email",autoComplete:"email",value:f,onChange:function(e){h(e.target.value)}})}),Object(p.jsx)(M.a,{item:!0,xs:12,children:Object(p.jsx)(O.a,{required:!0,fullWidth:!0,name:"password",label:"Password",type:"password",id:"password",autoComplete:"new-password",value:C,onChange:function(e){S(e.target.value)}})}),Object(p.jsx)(M.a,{item:!0,xs:12,children:Object(p.jsx)(z.a,{control:Object(p.jsx)(J.a,{value:"allowExtraEmails",color:"primary"}),label:"I want to receive inspiration, marketing promotions and updates via email."})})]}),Object(p.jsx)(b.a,{type:"submit",fullWidth:!0,variant:"contained",sx:{mt:3,mb:2},children:"Sign Up"}),Object(p.jsx)(M.a,{container:!0,justifyContent:"flex-end",children:Object(p.jsx)(M.a,{item:!0,children:Object(p.jsx)(G.a,{href:"#",variant:"body2",children:"Already have an account? Sign in"})})})]})]}),Object(p.jsx)(Z,{sx:{mt:5}})]})})},ie=n(134),se=n.n(ie),oe=(n(283),n(284),function(){var e=Object(a.useState)(""),t=Object(s.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)(""),i=Object(s.a)(c,2),l=i[0],u=i[1],m=g(),f=(m.isLoading,m.error,m.sendRequest),h=(m.clearError,Object(o.f)()),y=Object(a.useContext)(v),w=function(){var e=Object(d.a)(j.a.mark((function e(t){var a;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,f("".concat("/api","/users/").concat(y.userId),"GET");case 4:return a=e.sent,e.next=7,f("".concat("/api","/posts/create"),"POST",JSON.stringify({title:""===l?"Test Post":l,postBody:""===n?"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.":n,creator:a.name,creatorID:y.userId,comments:[],reactions:[]}),{"Content-Type":"application/json"});case 7:e.sent,e.next=12;break;case 10:e.prev=10,e.t0=e.catch(1);case 12:h("/");case 13:case"end":return e.stop()}}),e,null,[[1,10]])})));return function(t){return e.apply(this,arguments)}}();return Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)(x,{text:""}),Object(p.jsxs)("form",{onSubmit:w,children:[Object(p.jsx)("div",{style:{backgroundColor:"white"},children:Object(p.jsx)(O.a,{autoFocus:!0,type:"text",style:{display:"flex",marginBottom:"1rem"},id:"outlined-basic",variant:"outlined",placeholder:"Post title...",value:l,onChange:function(e){u(e.target.value)}})}),Object(p.jsx)("div",{style:{backgroundColor:"white"},children:Object(p.jsx)(se.a,{theme:"snow",placeholder:"Start creating your masterpiece...",value:n,onChange:function(e){r(e)}})}),Object(p.jsx)("div",{className:"container",children:Object(p.jsx)(b.a,{type:"submit",variant:"contained",size:"large",children:"Submit Post"})})]})]})}),le=n(26),ue=n(43),je=(ue.a.div($||($=Object(le.a)(["\n  padding: 80px 60px;\n  background: black;\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n  \n   \n  @media (max-width: 1000px) {\n    padding: 70px 30px;\n  }\n"]))),ue.a.div(_||(_=Object(le.a)(["\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    max-width: 1000px;\n    margin: 0 auto;\n    /* background: red; */\n"]))),ue.a.div(ee||(ee=Object(le.a)(["\n  display: flex;\n  flex-direction: column;\n  text-align: left;\n  margin-left: 60px;\n"]))),ue.a.div(te||(te=Object(le.a)(["\n  display: grid;\n  grid-template-columns: repeat(auto-fill, \n                         minmax(185px, 1fr));\n  grid-gap: 20px;\n   \n  @media (max-width: 1000px) {\n    grid-template-columns: repeat(auto-fill, \n                           minmax(200px, 1fr));\n  }\n"]))),ue.a.a(ne||(ne=Object(le.a)(["\n  color: #fff;\n  margin-bottom: 20px;\n  font-size: 18px;\n  text-decoration: none;\n   \n  &:hover {\n      color: green;\n      transition: 200ms ease-in;\n  }\n"]))),ue.a.p(ae||(ae=Object(le.a)(["\n  font-size: 24px;\n  color: #fff;\n  margin-bottom: 40px;\n  font-weight: bold;\n"]))),function(){var e,t=Object(a.useState)(!1),n=Object(s.a)(t,2),r=n[0],c=n[1],i=Object(a.useState)(!1),u=Object(s.a)(i,2),j=u[0],d=u[1],b=Object(a.useState)(""),m=Object(s.a)(b,2),x=m[0],f=m[1],O=Object(a.useState)(""),h=Object(s.a)(O,2),g=h[0],y=h[1],w=Object(a.useState)(""),C=Object(s.a)(w,2),S=C[0],k=C[1],T=Object(a.useCallback)((function(e,t,n,a,r){c(t),d(e),f(n),y(a),k(r)}),[]),I=Object(a.useCallback)((function(){c(null),d(null),f(null),y(null)}),[]);return e=r?Object(p.jsx)(a.Fragment,{children:Object(p.jsxs)(o.c,{children:[Object(p.jsx)(o.a,{path:"/",element:Object(p.jsx)(E,{}),exact:!0}),Object(p.jsx)(o.a,{path:"/create",element:Object(p.jsx)(oe,{}),exact:!0})]})}):Object(p.jsx)(a.Fragment,{children:Object(p.jsxs)(o.c,{children:[Object(p.jsx)(o.a,{path:"/",element:Object(p.jsx)(E,{}),exact:!0}),Object(p.jsx)(o.a,{path:"/login",element:Object(p.jsx)(X,{}),exact:!0}),Object(p.jsx)(o.a,{path:"/register",element:Object(p.jsx)(ce,{}),exact:!0})]})}),Object(p.jsx)(v.Provider,{value:{userId:j,fullName:S,firstName:x,userType:g,isLoggedIn:!!r,token:r,login:T,logout:I},children:Object(p.jsxs)(l.a,{children:[Object(p.jsxs)("div",{className:"mainBody",children:[Object(p.jsx)(P,{}),e]}),Object(p.jsx)("div",{style:{display:"flex",justifyContent:"center"},children:"2021 Andrew Gasparovich"})]})})}),de=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,355)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,c=t.getLCP,i=t.getTTFB;n(e),a(e),r(e),c(e),i(e)}))};i.a.render(Object(p.jsx)(r.a.StrictMode,{children:Object(p.jsx)(je,{})}),document.getElementById("root")),de()}},[[287,1,2]]]);
//# sourceMappingURL=main.ad0cfb5c.chunk.js.map