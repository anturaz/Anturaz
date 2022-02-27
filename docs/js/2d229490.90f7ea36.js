(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["2d229490"],{dd93:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"q-pt-xl flex flex-center"},[r("q-card",{staticStyle:{"max-width":"500px"},attrs:{flat:"",bordered:!e.$q.screen.lt.sm}},[r("q-card-section",[r("div",{staticClass:"text-h6"},[e._v("Sign Up")])]),r("q-card-section",[0!=e.error.length?r("q-banner",{staticClass:"bg-red text-white",attrs:{rounded:""},scopedSlots:e._u([{key:"avatar",fn:function(){return[r("q-icon",{attrs:{name:"error",color:"white"}})]},proxy:!0}],null,!1,3709320977)},[r("ul",e._l(e.error,function(t,a){return r("li",{key:a},[e._v(e._s(t))])}),0)]):e._e()],1),r("q-card-section",[r("div",{class:e.$q.screen.lt.sm?"":"row"},[r("q-input",{staticClass:"col-5",attrs:{label:"First Name"},model:{value:e.fname,callback:function(t){e.fname=t},expression:"fname"}}),r("div",{staticClass:"col-1"}),r("q-input",{staticClass:"col-6",attrs:{label:"Last Name"},model:{value:e.lname,callback:function(t){e.lname=t},expression:"lname"}})],1),r("q-input",{attrs:{label:"Mobile Number"},model:{value:e.mobile_number,callback:function(t){e.mobile_number=t},expression:"mobile_number"}}),r("q-input",{attrs:{label:"Email Address"},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}}),r("q-input",{attrs:{label:"Password",type:"password"},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}}),r("div",{on:{click:function(t){return e.$refs.qDateProxy.show()}}},[r("q-input",{attrs:{mask:"date",label:"Birthday",readonly:""},on:{click:function(t){return e.$refs.qDateProxy.show()}},scopedSlots:e._u([{key:"append",fn:function(){return[r("q-icon",{staticClass:"cursor-pointer",attrs:{name:"event"}},[r("q-popup-proxy",{ref:"qDateProxy",attrs:{"transition-show":"scale","transition-hide":"scale"}},[r("q-date",{on:{input:function(){return e.$refs.qDateProxy.hide()}},model:{value:e.birthday,callback:function(t){e.birthday=t},expression:"birthday"}})],1)],1)]},proxy:!0}]),model:{value:e.birthday,callback:function(t){e.birthday=t},expression:"birthday"}})],1),r("br"),r("p",{staticClass:"caption"},[e._v("Gender")]),r("div",{staticClass:"row q-px-md"},[r("q-radio",{staticClass:"col",attrs:{dense:"",val:"Male",label:"Male"},model:{value:e.gender,callback:function(t){e.gender=t},expression:"gender"}}),r("q-radio",{staticClass:"col",attrs:{dense:"",val:"Female",label:"Female"},model:{value:e.gender,callback:function(t){e.gender=t},expression:"gender"}})],1)],1),r("q-card-section",{staticClass:"flex justify-between"},[r("p",{staticClass:"text-italic text-grey"},[e._v("By clicking Sign Up, you agree to our Terms, Data Policy and Cookies Policy. You may receive SMS Notification from us and can opt out any time.")])]),r("q-card-section",{attrs:{align:"right"}},[r("q-btn",{attrs:{color:"primary",label:"SIGN UP"},on:{click:function(t){return e.validate()}}})],1)],1)],1)},i=[],s=r("a34a"),n=r.n(s),o=(r("7514"),r("96cf"),r("c973")),l=r.n(o),c={data:function(){return{fname:"",lname:"",mobile_number:"",email:"",password:"",birthday:"",gender:"Male",error:[]}},methods:{validate:function(){var e=l()(n.a.mark(function e(){var t=this;return n.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(this.error=[],""==this.fname.trim()&&this.error.push("First Name field is required."),""==this.lname.trim()&&this.error.push("Last Name field is required."),""!=this.mobile_number.trim()){e.next=7;break}this.error.push("Mobile Number field is required."),e.next=9;break;case 7:return e.next=9,this.$dbCon.service("shopper").find({query:{mobile_number:this.mobile_number}}).then(function(e){0!=e.data.length&&t.error.push("Mobile Number has been taken.")});case 9:if(""!=this.email.trim()){e.next=13;break}this.error.push("Email field is required."),e.next=15;break;case 13:return e.next=15,this.$dbCon.service("shopper").find({query:{email:this.email}}).then(function(e){0!=e.data.length&&t.error.push("Email Address has been taken.")});case 15:""==this.password.trim()&&this.error.push("Password field is required."),""==this.birthday.trim()&&this.error.push("Birthday field is required."),0==this.error.length&&this.$q.dialog({title:"Confirmation",message:"Do you want to proceed to your registration?",cancel:{push:!0,color:"grey",flat:!0}}).onOk(function(){t.submit()});case 18:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),submit:function(){var e=l()(n.a.mark(function e(){var t,r=this;return n.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$dbCon.service("users").create({fname:this.fname,lname:this.lname,mobile_number:this.mobile_number,email:this.email,password:this.password,birthday:this.birthday,gender:this.gender,address:{house_bldg_st:"",barangay_district:"",city_municipality:"",state_province:"",zip_code:"",country:"Philippines"},access:!0,system_user_type:"Shopper"});case 2:return t=e.sent,e.next=5,this.$axios({method:"GET",url:this.$appLink+"/ShopperRegistrationConfirmation?id="+t._id});case 5:this.$q.dialog({title:"Success!",message:"Please login to continue."}).onOk(function(){r.$router.push("/ShopperLogin")});case 6:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()}},u=c,d=r("2877"),m=Object(d["a"])(u,a,i,!1,null,null,null);t["default"]=m.exports}}]);