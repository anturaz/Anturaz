(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["2d0e5d5e"],{"95d0":function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"row flex-center q-gutter-md"},[s("div",{staticClass:"col-11",staticStyle:{height:"70px"}}),s("div",{staticClass:"q-pa-md",staticStyle:{width:"400px"}},[s("q-card",{staticClass:"row"},[s("q-card-section",{staticClass:"col-12",staticStyle:{height:"40%"},attrs:{align:"center"}},[s("img",{staticStyle:{width:"80px"},attrs:{src:t.$appLink+"/uploads/admin/logo.png"}}),s("div",{staticClass:"text-h4"},[t._v("Anturaz Admin")]),s("div",{staticClass:"text-subtitle1"},[t._v("A One-stop-shop Online Event Marketplace")]),s("br"),0!=t.error.length?s("q-banner",{staticClass:"bg-red text-white",attrs:{rounded:""}},[s("ul",{staticClass:"text-caption text-left"},t._l(t.error,function(e,i){return s("li",{key:i},[t._v(t._s(e))])}),0)]):t._e(),s("div",{staticClass:"q-gutter-sm",staticStyle:{width:"80%"}},[s("q-input",{attrs:{label:"Email Address"},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}}),s("q-input",{attrs:{type:"password",label:"System Generated Password"},model:{value:t.system_pw,callback:function(e){t.system_pw=e},expression:"system_pw"}}),s("q-input",{attrs:{type:"password",label:"New Password"},model:{value:t.new_pw,callback:function(e){t.new_pw=e},expression:"new_pw"}}),s("q-input",{attrs:{type:"password",label:"Confirm Password"},model:{value:t.confirm_pw,callback:function(e){t.confirm_pw=e},expression:"confirm_pw"}}),s("br"),s("q-btn",{staticClass:"full-width",attrs:{label:"Verify account",color:"primary"},on:{click:t.validate}}),s("br")],1)],1)],1)],1)])},r=[],a=s("a34a"),n=s.n(a),o=(s("7514"),s("96cf"),s("c973")),l=s.n(o),d={data:function(){return{email:this.$route.query.email,system_pw:"",new_pw:"",confirm_pw:"",error:[]}},methods:{validate:function(){this.error=[],""==this.email.trim()&&this.error.push("Email Address field is required."),""==this.system_pw.trim()&&this.error.push("System Generated Password field is required."),""==this.new_pw.trim()&&this.error.push("New Password field is required."),""==this.confirm_pw.trim()&&this.error.push("Confirm Password field is required."),0==this.error&&this.verify()},verify:function(){var t=l()(n.a.mark(function t(){var e=this;return n.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$dbCon.service("users").find({query:{email:this.email,password:this.system_pw}}).then(function(t){1==t.total?e.new_pw!=e.confirm_pw?e.error.push("New Password and Confirm Password doesn't match."):"Verified"==t.data[0].status?e.$q.dialog({title:"Account has already verified!",message:"Login to continue."}).onOk(function(){e.$router.push("/Admin/Login")}):(t.data[0].password=e.new_pw,t.data[0].status="Verified",e.$dbCon.service("users").update(t.data[0]._id,t.data[0]).then(function(){e.$q.loading.show(),e.$axios({method:"GET",url:e.$appLink+"/ConfirmationSystemUserVerification?id="+t.data[0]._id}).then(function(){e.$q.loading.hide(),e.$q.dialog({title:"Account Verified!",message:"Login to continue."}).onOk(function(){e.$router.push("/Admin/Login")})})})):e.error.push("Credentials doesn't match any account.")});case 2:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()},mounted:function(){}},c=d,u=s("2877"),p=Object(u["a"])(c,i,r,!1,null,null,null);e["default"]=p.exports}}]);