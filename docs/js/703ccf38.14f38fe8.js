(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["703ccf38"],{"4d91":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("q-card-section",{staticClass:"column items-center"},[a("img",{staticStyle:{width:"80px"},attrs:{src:t.$appLink+"/uploads/admin/sample_logo.png"}}),a("div",{staticClass:"text-h5 text-black col-12"},[t._v("Anturaz Shopper")]),a("div",{staticClass:"text-subtitle2 text-black col-12"},[t._v("Login")])]),a("q-card-section",[a("q-input",{attrs:{color:"primary",label:"Email"},scopedSlots:t._u([{key:"prepend",fn:function(){return[a("q-icon",{attrs:{name:"email"}})]},proxy:!0}]),model:{value:t.email,callback:function(e){t.email=e},expression:"email"}}),a("q-input",{attrs:{color:"primary",type:"password",label:"Password"},scopedSlots:t._u([{key:"prepend",fn:function(){return[a("q-icon",{attrs:{name:"lock"}})]},proxy:!0}]),model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1),a("q-card-actions",{staticClass:"q-px-md"},[a("q-btn",{staticClass:"full-width",attrs:{unelevated:"",color:"primary",size:"lg",label:"Login"},on:{click:t.validate}})],1),a("q-card-section",{staticClass:"text-center q-pa-none",staticStyle:{cursor:"pointer"},on:{click:function(e){return t.$router.push("/ShopperSignUp")}}},[a("p",{staticClass:"text-grey-6"},[t._v("Don't have an account? Sign up here!")])])],1)},n=[],i=a("a34a"),r=a.n(i),o=(a("96cf"),a("c973")),c=a.n(o),l={props:{afterLogin:{type:Function}},data:function(){return{email:"",password:""}},methods:{validate:function(){""==this.email||""==this.password?(console.log("validate method"),this.$q.dialog({title:"Invalid Credentials",message:"The Email and Password you've entered doesn't match any account."})):this.login()},login:function(){var t=this;this.$q.loading.show(),console.log(this.email),console.log(this.password,"hey"),this.$dbCon.authenticate({email:this.email,password:this.password,strategy:"local"}).then(function(){var e=c()(r.a.mark(function e(a){var s,n;return r.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return console.log("jwt pogi"),e.next=3,t.$dbCon.passport.verifyJWT(t.$local.getItem(t.$appLink+"-jwt"));case 3:return s=e.sent,e.next=6,t.$dbCon.services.users.get(s.userId);case 6:n=e.sent,"Shopper"!=n.system_user_type?(console.log("shopper type?"),t.$q.loading.hide(),t.$q.dialog({title:"Invalid Credentials",message:"The credentials is of a Shopper."})):0==n.access?(t.$q.loading.hide(),t.$q.dialog({title:"Access Turned Off",message:"Your access to the app is turned off. Kindly contact Anturaz Team for this issue."}),t.$dbCon.logout()):(t.$q.loading.hide(),t.$local.set("user_token",n._id),t.$EventBus.$emit("logged-in",n),t.afterLogin());case 8:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()).catch(function(e){console.log("catch",e),t.$q.loading.hide(),t.$q.dialog({title:"Invalid Credentials",message:"The Email and Password you've entered doesn't match any account."})})}}},u=l,d=a("2877"),p=Object(d["a"])(u,s,n,!1,null,null,null);e["a"]=p.exports},a019:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"q-pa-lg row"},[a("div",{staticClass:"col-12"},[a("q-breadcrumbs",{staticClass:"q-pb-md text-primary",scopedSlots:t._u([{key:"separator",fn:function(){return[a("q-icon",{attrs:{size:"1.5em",name:"chevron_right",color:"primary"}})]},proxy:!0}])},[a("q-breadcrumbs-el",{attrs:{label:"Home",icon:"home"}}),a("q-breadcrumbs-el",{attrs:{label:"Shopping Cart",icon:"shopping_cart"}})],1),a("q-separator")],1),a("div",{staticClass:"col-1"}),a("q-card",{staticClass:"col-10",attrs:{flat:""}},[a("q-card-section",[a("q-list",{attrs:{bordered:"",separator:""}},[0==t.cart.length?a("div",{staticClass:"q-pa-md",attrs:{align:"center"}},[a("div",[a("q-icon",{attrs:{name:"shopping_cart",color:"grey",size:"200px"}})],1),a("div",{staticClass:"text-grey"},[t._v("No items found")]),a("div",[a("q-btn",{attrs:{unelevated:"",color:"primary",label:"Continue Shopping"},on:{click:function(e){return t.$router.push("/")}}})],1)]):t._e(),t._l(t.cart,function(t,e){return a("CartItem",{key:t,attrs:{item:t,index:e}})}),a("q-separator")],2)],1)],1)],1)},n=[],i=a("a34a"),r=a.n(i),o=(a("7514"),a("96cf"),a("c973")),c=a.n(o),l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("q-item",[a("q-item-section",{attrs:{avatar:""}},[a("q-avatar",{attrs:{size:"100px",square:""}},[a("img",{attrs:{ratio:1,src:t.data.photos[0]}})])],1),a("q-item-section",[a("q-item-label",{staticClass:"text-title",attrs:{lines:"1"}},[t._v(t._s("products"==t.item.type?t.data.product_name:t.data.service_name))]),a("q-item-label",{attrs:{caption:"",lines:"2"}},[a("span",{staticClass:"text-weight-bold"},[t._v("Category:")]),t._v("\n        "+t._s(t.data.category)+"\n      ")]),a("q-item-label",{attrs:{caption:"",lines:"2"}},[a("span",{staticClass:"text-weight-bold"},[t._v("Type:")]),t._v("\n        "+t._s("products"==t.item.type?"Product":"Service")+"\n      ")]),"products"==t.item.type?a("div",[a("q-item-label",{attrs:{caption:"",lines:"2"}},[void 0!=t.item.size?a("span",{staticClass:"text-weight-bold"},[t._v("Size:")]):t._e(),t._v("\n          "+t._s(t.item.size)+"\n        ")]),a("q-item-label",{attrs:{caption:"",lines:"2"}},[void 0!=t.item.color?a("span",{staticClass:"text-weight-bold"},[t._v("Color:")]):t._e(),t._v("\n          "+t._s(t.item.color)+"\n        ")]),a("q-item-label",{attrs:{caption:"",lines:"2"}},[void 0!=t.item.material?a("span",{staticClass:"text-weight-bold"},[t._v("Material:")]):t._e(),t._v("\n          "+t._s(t.item.material)+"\n        ")])],1):t._e()],1),a("q-item-section",{attrs:{side:"",top:""}},[a("div",[a("span",{staticClass:"text-primary text-title text-bold"},[t._v(t._s(t.$prettyMoney(t.data.sale_price))+" ")]),a("strike",[t._v(t._s(t.$prettyMoney(t.data.regular_price)))])],1),a("div",[t._v("Qty "+t._s(t.item.quantity))]),a("q-space"),a("div",[a("q-btn",{attrs:{label:"Remove",color:"red-2",flat:""},on:{click:function(e){return t.removeItem()}}}),a("q-btn",{staticClass:"col-md-7",attrs:{unelevated:"",color:"primary",size:"lg",label:"Proceed to checkout"},on:{click:t.checkLogin}})],1)],1)],1),a("q-dialog",{attrs:{persistent:""},model:{value:t.loginForm,callback:function(e){t.loginForm=e},expression:"loginForm"}},[a("q-card",[a("q-card-section",{staticClass:"row items-center"},[a("q-space"),a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{icon:"close",flat:"",round:"",dense:"",size:"xs"}})],1),a("q-card-section",[a("ShopperLoginForm",{attrs:{afterLogin:t.afterLogin}})],1)],1)],1)],1)},u=[],d=a("4d91"),p={props:["item","index"],components:{ShopperLoginForm:d["a"]},data:function(){return{loginForm:!1,data:{}}},methods:{removeItem:function(){var t=this;this.$q.dialog({title:"Remove Item From Cart?",message:"Are you sure you want to remove this item for cart?",cancel:{push:!0,color:"grey",flat:!0}}).onOk(function(){if(void 0==t.item._id){var e=t.$session.get("cart");e.splice(t.index,1),t.$session.set("cart",e),t.$EventBus.$emit("modify-cart",null)}else t.$dbCon.service("cart").remove(t.item._id)})},checkLogin:function(){var t=c()(r.a.mark(function t(){var e=this;return r.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:this.$dbCon.authenticate().then(function(){"products"==e.item.type?e.$router.push("/checkoutProduct/"+e.item._id):e.$router.push("/checkoutService/"+e.item._id)}).catch(function(){e.loginForm=!0});case 1:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),afterLogin:function(){this.loginForm=!1,this.checkLogin()}},mounted:function(){var t=this;this.$dbCon.service("products"==this.item.type?"products":"services").find({query:{_id:this.item.item_id}}).then(function(e){t.data=e.data[0]})}},m=p,h=a("2877"),v=Object(h["a"])(m,l,u,!1,null,null,null),g=v.exports,f={components:{CartItem:g},data:function(){return{cart:[],user:{}}},methods:{getData:function(){var t=this;this.$dbCon.authenticate().then(c()(r.a.mark(function e(){return r.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$getUser();case 2:return t.user=e.sent,e.next=5,t.$dbCon.service("cart").find({query:{shopper_id:t.user._id}}).then(function(e){t.cart=e.data});case 5:case"end":return e.stop()}},e)}))).catch(function(e){t.cart=t.$session.get("cart")})}},mounted:function(){var t=c()(r.a.mark(function t(){var e=this;return r.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:this.$dbCon.service("cart").onDataChange(c()(r.a.mark(function t(){return r.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.getData();case 2:e.$forceUpdate();case 3:case"end":return t.stop()}},t)}))),this.$EventBus.$on("logged-in",c()(r.a.mark(function t(){return r.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:e.getData();case 1:case"end":return t.stop()}},t)})));case 2:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()},_=f,q=Object(h["a"])(_,s,n,!1,null,null,null);e["default"]=q.exports}}]);