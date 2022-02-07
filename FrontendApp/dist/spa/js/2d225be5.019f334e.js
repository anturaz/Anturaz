(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["2d225be5"],{e664:function(e,t,s){"use strict";s.r(t);var i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("div",{staticClass:"q-pa-md"},[s("q-breadcrumbs",[s("q-breadcrumbs-el",{attrs:{icon:"home",to:"/Admin"}}),s("q-breadcrumbs-el",{attrs:{label:"Maintenance",icon:"widgets"}}),s("q-breadcrumbs-el",{attrs:{label:"System User",icon:"people"}})],1)],1),s("q-page-sticky",{staticStyle:{"z-index":"999"},attrs:{position:"bottom-right",offset:[30,30]}},[s("AddSystemUser")],1),s("div",{},[s("q-table",{attrs:{data:e.data,columns:e.columns,filter:e.filter,"row-key":"name"},scopedSlots:e._u([{key:"top-right",fn:function(){return[s("q-input",{attrs:{borderless:"",dense:"",debounce:"300",placeholder:"Search"},scopedSlots:e._u([{key:"append",fn:function(){return[s("q-icon",{attrs:{name:"search"}})]},proxy:!0}]),model:{value:e.filter,callback:function(t){e.filter=t},expression:"filter"}})]},proxy:!0},{key:"body",fn:function(t){return s("q-tr",{attrs:{props:t}},[s("q-td",{key:"name",attrs:{props:t}},[e._v(e._s(t.row.fname+" "+t.row.lname))]),s("q-td",{key:"email",attrs:{props:t}},[e._v(e._s(t.row.email))]),s("q-td",{key:"position",attrs:{props:t}},[e._v(e._s(t.row.position))]),s("q-td",{key:"user_classification",attrs:{props:t}},[e._v(e._s(t.row.user_classification))]),s("q-td",{key:"status",attrs:{props:t}},[e._v(e._s(t.row.status))]),s("q-td",{key:"actions",staticClass:"row items-center",attrs:{props:t}},[s("ViewSystemUser",{staticClass:"col",attrs:{systemUser:t.row}}),s("EditSystemUser",{staticClass:"col",attrs:{systemUser:t.row}}),s("DeleteSystemUser",{staticClass:"col",attrs:{systemUser:t.row}}),"Pending"==t.row.status?s("Others",{staticClass:"col",attrs:{userId:t.row._id}}):e._e()],1)],1)}}])})],1)],1)},a=[],n=(s("7514"),function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("q-btn",{attrs:{icon:"add",color:"primary",size:"lg",round:""},on:{click:function(t){e.opened=!0}}}),s("q-dialog",{attrs:{persistent:"","transition-show":"scale","transition-hide":"scale"},model:{value:e.opened,callback:function(t){e.opened=t},expression:"opened"}},[s("q-card",{staticClass:"bg-primary text-white",staticStyle:{width:"700px","max-width":"80vw"},attrs:{flat:""}},[s("q-card-section",[s("div",{staticClass:"row"},[s("div",{staticClass:"text-h6 col-11"},[e._v("Add System User")]),s("div",{staticClass:"col-1"},[s("q-btn",{attrs:{flat:"",icon:"close",size:"xs"},on:{click:function(t){return e.close()}}})],1)])]),s("q-card-section",{staticClass:"bg-white"},[s("div",{staticClass:"q-pa-md"},[0!=e.error.length?s("q-banner",{staticClass:"bg-red text-white",attrs:{rounded:""},scopedSlots:e._u([{key:"avatar",fn:function(){return[s("q-icon",{attrs:{name:"error",color:"white"}})]},proxy:!0}],null,!1,3709320977)},[s("ul",e._l(e.error,function(t,i){return s("li",{key:i},[e._v(e._s(t))])}),0)]):e._e(),s("q-input",{staticClass:"q-pa-sm",attrs:{label:"First Name*"},model:{value:e.fname,callback:function(t){e.fname=t},expression:"fname"}}),s("q-input",{staticClass:"q-pa-sm",attrs:{label:"Last Name*"},model:{value:e.lname,callback:function(t){e.lname=t},expression:"lname"}}),s("q-input",{staticClass:"q-pa-sm",attrs:{label:"Email Address*"},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}}),s("q-input",{staticClass:"q-pa-sm",attrs:{label:"Position*"},model:{value:e.position,callback:function(t){e.position=t},expression:"position"}}),s("q-select",{staticClass:"q-pa-sm",attrs:{options:e.user_classification_options,label:"User Classification*"},model:{value:e.user_classification,callback:function(t){e.user_classification=t},expression:"user_classification"}}),s("q-select",{staticClass:"q-pa-sm",attrs:{multiple:"","use-chips":"",options:e.permissions_options,label:"Permissions*"},model:{value:e.permissions,callback:function(t){e.permissions=t},expression:"permissions"}})],1),s("div",{staticClass:"q-pa-md",attrs:{align:"right"}},[s("q-btn",{attrs:{label:"submit",outline:"",color:"primary"},on:{click:e.validate}})],1)])],1)],1)],1)}),r=[],o=s("a34a"),l=s.n(o),c=(s("96cf"),s("c973")),u=s.n(c),m={data:function(){return{opened:!1,fname:"",lname:"",email:"",position:"",user_classification_options:["Admin","Accounting","Marketing"],user_classification:"Admin",permissions_options:["Category Management","Payment Management","Accounting Dashboard","Social Media Management","Rating & Review Management","Store Management","Shopper Management","Blogs Management","Page Management","Layout Management","System User Management"],permissions:["Category Management","Payment Management","Accounting Dashboard","Social Media Management","Rating & Review Management","Store Management","Shopper Management","Blogs Management","Page Management","Layout Management","System User Management"],error:[]}},methods:{validate:function(){var e=u()(l.a.mark(function e(){var t=this;return l.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(this.error=[],0==this.fname.trim()&&this.error.push("First Name field is required."),0==this.lname.trim()&&this.error.push("Last Name field is required"),0!=this.email.trim()){e.next=7;break}this.error.push("Email Address field is required."),e.next=9;break;case 7:return e.next=9,this.$dbCon.service("users").find({query:{email:this.email}}).then(function(e){0!=e.data.length&&t.error.push("Email Address has been taken.")});case 9:0==this.position.trim()&&this.error.push("Position field is required."),0==this.permissions.length&&this.error.push("Choose atleast one(1) permission."),0==this.error.length&&this.submit();case 12:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),submit:function(){var e=this;this.$q.dialog({title:"Confirm",message:"Add this System User?",cancel:{push:!0,color:"grey",flat:!0}}).onOk(function(){e.$dbCon.service("users").create({fname:e.fname,lname:e.lname,email:e.email,password:e.password_generator(),position:e.position,user_classification:e.user_classification,permissions:e.permissions,status:"Pending"}).then(function(t){e.$q.loading.show(),e.$axios({method:"GET",url:e.$appLink+"/SystemUserVerification?id="+t._id}).then(function(t){e.$q.loading.hide(),e.close()})})})},password_generator:function(){for(var e=8,t="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",s="",i=0,a=t.length;i<e;++i)s+=t.charAt(Math.floor(Math.random()*a));return s},close:function(){this.fname="",this.lname="",this.email="",this.position="",this.user_classification="",this.permissions="",this.opened=!1}},watch:{user_classification:function(){"Admin"==this.user_classification?this.permissions=["Category Management","Payment Management","Accounting Dashboard","Social Media Management","Rating & Review Management","Store Management","Shopper Management","Blogs Management","Page Management","Layout Management","System User Management"]:"Accounting"==this.user_classification?this.permissions=["Accounting Dashboard"]:"Marketing"==this.user_classification&&(this.permissions=["Social Media Management","Rating & Review Management","Blogs Management"])}}},d=m,p=s("2877"),h=Object(p["a"])(d,n,r,!1,null,null,null),f=h.exports,g=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("q-btn",{attrs:{color:"primary",flat:"",dense:"",size:"sm",icon:"remove_red_eye"},on:{click:function(t){e.opened=!0}}}),s("q-dialog",{attrs:{persistent:"","transition-show":"scale","transition-hide":"scale"},model:{value:e.opened,callback:function(t){e.opened=t},expression:"opened"}},[s("q-card",{staticClass:"bg-primary text-white",staticStyle:{width:"700px","max-width":"80vw"},attrs:{flat:""}},[s("q-card-section",[s("div",{staticClass:"row"},[s("div",{staticClass:"text-h6 col-11"},[e._v("View System User ")]),s("div",{staticClass:"col-1"},[s("q-btn",{attrs:{flat:"",icon:"close",size:"xs"},on:{click:function(t){e.opened=!1}}})],1)])]),s("q-card-section",{staticClass:"bg-white text-black"},[s("div",{staticClass:"q-pa-md"},[s("b",[e._v("Name: ")]),e._v(e._s(e.user.fname+" "+e.user.lname)),s("br"),s("b",[e._v("Position: ")]),e._v(e._s(e.user.position)),s("br"),s("b",[e._v("Email: ")]),e._v(e._s(e.user.email)),s("br"),s("b",[e._v("User Classification: ")]),e._v(e._s(e.user.user_classification)),s("br"),s("br"),s("q-field",{attrs:{outlined:"",label:"Permissions",color:"black","stack-label":""},scopedSlots:e._u([{key:"control",fn:function(){return[s("ol",e._l(e.user.permissions,function(t,i){return s("li",{key:i},[e._v(e._s(t))])}),0)]},proxy:!0}])}),s("br"),s("div",{attrs:{align:"right"}},[s("q-btn",{attrs:{color:"primary",outline:"",label:"close"},on:{click:function(t){e.opened=!1}}})],1)],1)])],1)],1)],1)},b=[],v={props:["systemUser"],data:function(){return{opened:!1,user:{}}},mounted:function(){this.user=_.cloneDeep(this.systemUser)}},q=v,y=Object(p["a"])(q,g,b,!1,null,null,null),k=y.exports,w=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("q-btn",{attrs:{color:"grey-7",round:"",flat:"",size:"sm",dense:"",icon:"edit"},on:{click:function(t){e.opened=!0}}}),s("q-dialog",{attrs:{persistent:"","transition-show":"scale","transition-hide":"scale"},model:{value:e.opened,callback:function(t){e.opened=t},expression:"opened"}},[s("q-card",{staticClass:"bg-primary text-white",staticStyle:{width:"700px","max-width":"80vw"},attrs:{flat:""}},[s("q-card-section",[s("div",{staticClass:"row"},[s("div",{staticClass:"text-h6 col-11"},[e._v("Edit System User")]),s("div",{staticClass:"col-1"},[s("q-btn",{attrs:{flat:"",icon:"close",size:"xs"},on:{click:function(t){e.opened=!1}}})],1)])]),s("q-card-section",{staticClass:"bg-white text-black"},[s("div",{staticClass:"q-pa-md"},[0!=e.error.length?s("q-banner",{staticClass:"bg-red text-white",attrs:{rounded:""},scopedSlots:e._u([{key:"avatar",fn:function(){return[s("q-icon",{attrs:{name:"error",color:"white"}})]},proxy:!0}],null,!1,3709320977)},[s("ul",e._l(e.error,function(t,i){return s("li",{key:i},[e._v(e._s(t))])}),0)]):e._e(),"Pending"==e.user.status?s("div",[s("q-input",{staticClass:"q-pa-sm",attrs:{label:"First Name*"},model:{value:e.user.fname,callback:function(t){e.$set(e.user,"fname",t)},expression:"user.fname"}}),s("q-input",{staticClass:"q-pa-sm",attrs:{label:"Last Name*"},model:{value:e.user.lname,callback:function(t){e.$set(e.user,"lname",t)},expression:"user.lname"}}),s("q-input",{staticClass:"q-pa-sm",attrs:{label:"Email Address*"},model:{value:e.user.email,callback:function(t){e.$set(e.user,"email",t)},expression:"user.email"}}),s("q-input",{staticClass:"q-pa-sm",attrs:{label:"Position*"},model:{value:e.user.position,callback:function(t){e.$set(e.user,"position",t)},expression:"user.position"}})],1):e._e(),s("q-select",{staticClass:"q-pa-sm",attrs:{options:e.user_classification_options,label:"User Classification*"},model:{value:e.user.user_classification,callback:function(t){e.$set(e.user,"user_classification",t)},expression:"user.user_classification"}}),s("q-select",{staticClass:"q-pa-sm",attrs:{multiple:"","use-chips":"",options:e.permissions_options,label:"Permissions*"},model:{value:e.user.permissions,callback:function(t){e.$set(e.user,"permissions",t)},expression:"user.permissions"}})],1),s("div",{staticClass:"q-pa-md",attrs:{align:"right"}},[s("q-btn",{attrs:{label:"submit",outline:"",color:"primary"},on:{click:e.validate}})],1)])],1)],1)],1)},C=[],x={props:["systemUser"],data:function(){return{opened:!1,user_classification_options:["Admin","Accounting","Marketing"],permissions_options:["Category Management","Payment Management","Accounting Dashboard","Social Media Management","Rating & Review Management","Store Management","Shopper Management","Blogs Management","Page Management","Layout Management","System User Management"],user:{},error:[]}},methods:{validate:function(){var e=u()(l.a.mark(function e(){var t=this;return l.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(this.error=[],0==this.user.fname.trim()&&this.error.push("First Name field is required."),0==this.user.lname.trim()&&this.error.push("Last Name field is required"),0!=this.user.email.trim()){e.next=7;break}this.error.push("Email Address field is required."),e.next=9;break;case 7:return e.next=9,this.$dbCon.service("users").find({query:{email:this.user.email,_id:{$ne:this.user._id}}}).then(function(e){0!=e.data.length&&t.error.push("Email Address has been taken.")});case 9:0==this.user.position.trim()&&this.error.push("Position field is required."),0==this.user.permissions.length&&this.error.push("Choose atleast one(1) permission."),0==this.error.length&&this.submit();case 12:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),submit:function(){var e=this;this.$q.dialog({title:"Confirm",message:"Update this System User?",cancel:{push:!0,color:"grey",flat:!0}}).onOk(function(){e.$dbCon.service("users").update(e.user._id,e.user).then(function(t){e.opened=!1})})}},mounted:function(){this.user=this.systemUser}},M=x,S=Object(p["a"])(M,w,C,!1,null,null,null),U=S.exports,$=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("q-btn",{attrs:{icon:"delete",color:"primary",dense:"",flat:"",round:""},on:{click:e.deleteSystemUser}})],1)},A=[],E={props:["systemUser"],methods:{deleteSystemUser:function(){var e=this;this.$q.dialog({title:"Confirmation",message:"Do you really want to delete this user permanently?",cancel:{push:!0,color:"grey",flat:!0}}).onOk(function(){e.$dbCon.service("users").remove(e.systemUser._id)})}}},P=E,D=Object(p["a"])(P,$,A,!1,null,null,null),L=D.exports,O=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("q-btn",{attrs:{color:"grey-7",round:"",flat:"",size:"sm",dense:"",icon:"more_vert"}},[s("q-menu",{attrs:{cover:"","auto-close":""}},[s("q-list",[s("q-item",{attrs:{clickable:""},on:{click:e.confirmation}},[s("q-item-section",[e._v("Account Confirmation")])],1)],1)],1)],1)],1)},N=[],R={props:["userId"],methods:{confirmation:function(){var e=this;this.$q.loading.show(),this.$axios({method:"GET",url:this.$appLink+"/SystemUserVerification?id="+this.userId}).then(function(t){e.$q.loading.hide(),console.log(t.data),"SUCCESSFUL"==t.data?e.$q.dialog({title:"Success!",message:"Verification Email has been sent."}):e.$q.dialog({title:"Error!",message:"Verification Email hasn't been sent."})})}}},z=R,V=Object(p["a"])(z,O,N,!1,null,null,null),j=V.exports,B={components:{AddSystemUser:f,ViewSystemUser:k,EditSystemUser:U,DeleteSystemUser:L,Others:j},data:function(){return{filter:"",data:[],columns:[{name:"name",label:"Name",field:"name",align:"center"},{name:"email",label:"Email",field:"email",align:"center"},{name:"position",label:"Position",field:"position",align:"center"},{name:"user_classification",label:"User Classification",field:"user_classification",align:"center"},{name:"status",label:"Status",field:"status",align:"center"},{name:"actions",label:"Actions",field:"actions",align:"center"}]}},methods:{getData:function(){var e=this;this.$dbCon.service("users").find({query:{system_user_type:"Admin"}}).then(function(t){e.data=t.data})}},mounted:function(){var e=this;this.$dbCon.services.users.onDataChange(function(){e.getData()})}},F=B,I=Object(p["a"])(F,i,a,!1,null,null,null);t["default"]=I.exports}}]);