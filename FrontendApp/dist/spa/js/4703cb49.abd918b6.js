(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["4703cb49"],{2309:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"q-pa-lg"},[t._m(0),a("div",{staticStyle:{height:"340px"}},[a("q-scroll-area",{staticStyle:{height:"100%",width:"100%"},attrs:{horizontal:"",visible:!0}},[a("div",{staticClass:"q-pa-md row no-wrap items-start col-lg-3 q-gutter-md "},t._l(t.data,function(e,s){return a("q-card",{key:e._id,staticClass:"q-ma-sm",staticStyle:{cursor:"pointer"},style:"border-color:"+(t.currentItem==s?t.$primaryColor:"white"),attrs:{bordered:""},on:{mouseover:function(e){t.currentItem=s},mouseleave:function(e){t.currentItem="none"},click:function(a){return t.$router.replace({path:"/ProductDetails/"+e._id})}}},[a("q-card-section",{staticClass:"col-auto",staticStyle:{height:"180px",width:"200px"}},[a("q-img",{attrs:{ratio:1,src:e.photos[0]}}),""!=e.sale_price?a("q-card",{staticClass:"bg-primary text-white text-bold text-center absolute",staticStyle:{right:"0px",height:"40px",width:"80px",top:"160px"},attrs:{flat:""}},[a("p",{staticClass:"q-pa-xs q-mt-xs"},[t._v(t._s(((e.regular_price-e.sale_price)/e.regular_price*100).toFixed(0))+"% OFF")])]):t._e()],1),a("q-card-section",{staticStyle:{height:"120px",width:"200px"}},[a("div",{staticStyle:{margin:"10px"}},[a("br"),"product_name"in e?a("div",{staticClass:"text-subtitle1"},[a("p",{staticClass:"ellipsis"},[t._v(t._s(e.product_name))])]):t._e(),a("div",[a("font",{directives:[{name:"show",rawName:"v-show",value:!e.sale_price,expression:"!item.sale_price"}],staticClass:"q-pr-sm text-black"},[t._v(t._s(t.$prettyMoney(0)))]),a("font",{directives:[{name:"show",rawName:"v-show",value:e.sale_price,expression:"item.sale_price"}],staticClass:"q-pr-sm text-black"},[t._v(t._s(""!=e.sale_price?t.$prettyMoney(e.sale_price):t.$prettyMoney(e.regular_price)))]),""!=e.sale_price?a("font",{staticClass:"text-primary q-pr-sm"},[a("strike",[t._v(t._s(t.$prettyMoney(e.regular_price)))])],1):t._e(),0==e.regular_price?a("font",{staticClass:"text-bold text-black"},[t._v(t._s(e.regular_price))]):t._e()],1),a("font",{staticClass:"q-pr-md text-primary"},[t._v("\n\n                "+t._s(t.finalStore[s])+"\n              ")])],1)])],1)}),1)])],1)])},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("h6",[a("span",[t._v("Made for you")])])}],r=a("a34a"),n=a.n(r),o=(a("ac6a"),a("7514"),a("96cf"),a("c973")),c=a.n(o),l={data:function(){return{data:[],currentItem:"none",store:[],finalStore:[]}},mounted:function(){var t=c()(n.a.mark(function t(){var e=this;return n.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$dbCon.service("product-advertisment").find({query:{$select:["related_id"],date_end:{$gte:new Date}}}).then(function(t){var e=[];return t.data.forEach(function(t){e.push(t.related_id)}),e});case 2:return t.sent,t.next=5,this.$dbCon.service("products").find({query:{}}).then(function(t){e.data=t.data});case 5:return t.next=7,this.$dbCon.service("store").find({}).then(function(t){console.log("results",t),e.store=t.data});case 7:this.data.forEach(function(t){e.store.forEach(function(a){a._id==t.store_id&&e.finalStore.push(a.store_name)})});case 8:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()},d=l,u=(a("3ff7"),a("2877")),p=Object(u["a"])(d,s,i,!1,null,"f06eea38",null);e["a"]=p.exports},2374:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=this,a=e.$createElement,s=e._self._c||a;return s("div",{staticClass:"q-pa-lg row justify-center"},[s("div",{staticClass:"col-md-8 col-sm-12 row"},[s("div",{staticClass:"col-12"},[s("q-breadcrumbs",{staticClass:"q-pb-md text-grey",scopedSlots:e._u([{key:"separator",fn:function(){return[s("q-icon",{attrs:{size:"1.5em",name:"chevron_right",color:"grey"}})]},proxy:!0}])},[s("q-breadcrumbs-el",{staticClass:"text-grey",attrs:{label:"Anturaz"}}),s("q-breadcrumbs-el",{staticClass:"text-grey",attrs:{label:"Products"}}),s("q-breadcrumbs-el",{staticClass:"text-grey",attrs:{label:e.data.category}}),s("q-breadcrumbs-el",{staticClass:"text-grey",attrs:{label:e.data.product_name}})],1),s("q-separator")],1),s("div",{staticClass:"col-md-6 col-sm-12 q-pt-md"},[s("div",{staticStyle:{overflow:"hidden",height:"400px"}},[s("q-img",{attrs:{src:e.currentPicture,ratio:1}})],1),s("div",{staticClass:"q-pt-sm row"},[s("q-card",{staticClass:"col-3",staticStyle:{overflow:"hidden",height:"100px",cursor:"pointer"},style:"border-width:medium;border-color:"+(0==e.currentIndexPicture?e.$primaryColor:"white"),attrs:{flat:"",bordered:"",square:"",outline:"",color:"grey"},on:{click:function(t){e.currentPicture=e.data.photos[0],e.currentIndexPicture=0}}},[s("q-img",{attrs:{src:e.data.photos[0],ratio:1}})],1),s("q-card",{staticClass:"col-3",staticStyle:{overflow:"hidden",height:"100px",cursor:"pointer"},style:"border-width:medium;border-color:"+(1==e.currentIndexPicture?e.$primaryColor:"white"),attrs:{flat:"",bordered:"",square:"",outline:"",color:"grey"},on:{click:function(t){e.currentPicture=e.data.photos[1],e.currentIndexPicture=1}}},[s("q-img",{attrs:{src:e.data.photos[1],ratio:1}})],1),s("q-card",{staticClass:"col-3",staticStyle:{overflow:"hidden",height:"100px",cursor:"pointer"},style:"border-width:medium;border-color:"+(2==e.currentIndexPicture?e.$primaryColor:"white"),attrs:{flat:"",bordered:"",square:"",outline:"",color:"grey"},on:{click:function(t){e.currentPicture=e.data.photos[2],e.currentIndexPicture=2}}},[s("q-img",{attrs:{src:e.data.photos[2],ratio:1}})],1),s("q-card",{staticClass:"col-3",staticStyle:{overflow:"hidden",height:"100px",cursor:"pointer"},style:"border-width:medium;border-color:"+(3==e.currentIndexPicture?e.$primaryColor:"white"),attrs:{flat:"",bordered:"",square:"",outline:"",color:"grey"},on:{click:function(t){e.currentPicture=e.data.photos[3],e.currentIndexPicture=3}}},[s("q-img",{attrs:{src:e.data.photos[3],ratio:1}})],1)],1)]),s("div",{staticClass:"col-6 q-pt-md q-pl-md"},[s("div",{staticClass:"text-h5 text-primary"},[e._v(e._s(e.data.product_name))]),s("q-rating",{attrs:{value:2,size:"1em",max:5,color:"primary"}}),e._v("100 Rating\n\n      "),s("div",{staticClass:"row"},[s("div",{staticClass:"q-pr-sm text-title self-center"},[s("strike",{staticClass:"text-grey"},[e._v("₱"+e._s(e.data.regular_price))]),e._v(" \n        ")],1),s("div",{staticClass:"q-pr-sm text-primary text-bold text-h4 self-center"},[e._v("\n          ₱"+e._s(e.data.sale_price)+"\n        ")]),s("q-chip",{staticClass:"self-center",attrs:{color:"primary",dense:"","text-color":"white"}},[e._v("\n          "+e._s(Math.round(100-e.data.sale_price/e.data.regular_price*100))+"% OFF\n        ")])],1),s("q-list",{staticClass:"q-mt-sm q-mb-sm full-width",attrs:{bordered:""}},[s("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],attrs:{clickable:""},on:{click:function(t){return e.$router.push("/StoreDetails?store="+e.store._id)}}},[s("q-item-section",{attrs:{avatar:""}},[""==e.store.logo?s("q-icon",{attrs:{name:"store",color:"grey"}}):e._e(),""!=e.store.logo?s("q-img",{attrs:{src:e.data.photos[3],ratio:1}}):e._e()],1),s("q-item-section",{staticClass:"text-grey"},[e._v(e._s(e.store.store_name))])],1)],1),s("q-card",{attrs:{flat:"",bordered:"",square:""}},[s("q-card-section",{staticClass:"row justify-center"},[0!=e.data.size.length?s("div",{staticClass:"col-8"},[s("span",{staticClass:"text-bold"},[e._v("Size:")]),s("q-space"),e._l(e.data.size,function(t){return s("q-chip",{key:t,class:e.size==t?"bg-primary text-white":"grey",attrs:{disable:0==e.data.stock,clickable:"",square:""},on:{click:function(a){e.size=t}}},[e._v(e._s(t))])})],2):e._e(),0!=e.data.color.length?s("div",{staticClass:"col-8"},[s("span",{staticClass:"text-bold"},[e._v("Color:")]),s("q-space"),e._l(e.data.color,function(t){return s("q-chip",{key:t,class:e.color==t?"bg-primary text-white":"grey",attrs:{disable:0==e.data.stock,clickable:"",square:""},on:{click:function(a){e.color=t}}},[e._v(e._s(t))])})],2):e._e(),0!=e.data.material.length?s("div",{staticClass:"col-8"},[s("span",{staticClass:"text-bold"},[e._v("Material:")]),s("q-space"),e._l(e.data.material,function(t){return s("q-chip",{key:t,class:e.material==t?"bg-primary text-white":"grey",attrs:{disable:0==e.data.stock,clickable:"",square:""},on:{click:function(a){e.material=t}}},[e._v(e._s(t))])})],2):e._e(),s("div",{staticClass:"col-8"},[s("span",{staticClass:"text-title text-bold"},[e._v("Quantity:")]),s("q-input",{staticClass:"col-1",attrs:{type:"number",disable:0==e.data.stock,debounce:"200",outlined:"",squared:"",dense:""},model:{value:e.quantity,callback:function(t){e.quantity=t},expression:"quantity"}}),s("div",{attrs:{align:"right"}},[s("span",{staticClass:"text-grey"},[e._v("Only "+e._s(e.data.stock)+" items left!")])])],1),s("div",{staticClass:"col-8"},[s("span",{staticClass:"text-bold"},[e._v("Gift wrapping:")]),s("div",[s("q-checkbox",{attrs:{label:"Gift wrap the item"},model:{value:e.giftwrapping,callback:function(t){e.giftwrapping=t},expression:"giftwrapping"}})],1),e.giftwrapping?s("div",{staticClass:"q-pl-md"},[s("div",{staticClass:"text-grey"},[e._v("Gift wrap color:")]),s("div",e._l(e.store.giftwrapping.colors,function(t){return s("q-btn",{key:t,staticClass:"q-mr-sm",attrs:{rounded:"",unelevated:"",color:e.giftwrapping_color==t?"primary":"grey-4"},on:{click:function(a){e.giftwrapping_color=t}}},[s("span",{staticStyle:{height:"25px",width:"25px","border-radius":"50%",display:"inline-block"},style:{"background-color":t}})])}),1)]):e._e()]),s("div",{staticClass:"col-8"},[s("span",{staticClass:"text-title text-bold"},[e._v("Date Needed:")]),s("br"),s("div",{staticClass:"q-pl-sm"},[s("span",{staticClass:"text-grey text-subtitle2"},[e._v("*Should be at least 5 days prior to the date of\n                purchase")]),e.$getDateDiff(e.date_needed,this.$addToDate(new Date,5,0),"months")<3?s("span",{staticClass:"text-red text-subtitle2 q-pt-xs"},[s("br"),e._v("*Only "),s("b",[e._v("Full Payment")]),e._v(" is applicable with the\n                selected date needed\n              ")]):e._e()]),s("br"),s("div",{attrs:{align:"center"}},[s("q-input",{staticClass:"col-12 q-pt-sm",attrs:{outlined:"",disable:0==e.data.stock,value:e.$formatDate_DateOnly(e.date_needed)},scopedSlots:e._u([{key:"append",fn:function(){return[s("q-icon",{staticClass:"cursor-pointer",attrs:{name:"event"}})]},proxy:!0}])},[s("q-popup-proxy",{attrs:{"transition-show":"scale","transition-hide":"scale"}},[s("q-date",{attrs:{disable:0==e.data.stock,options:function(e){return e>=t.$formatDateForPicker(t.$addToDate(new Date,5,0))}},model:{value:e.date_needed,callback:function(t){e.date_needed=t},expression:"date_needed"}})],1)],1)],1)]),s("div",{staticClass:"q-pt-sm row justify-center"},[s("q-btn",{staticClass:"col-10",attrs:{unelevated:"",color:"primary",size:"md",label:"Proceed to checkout"},on:{click:e.checkLogin}}),s("q-btn",{staticClass:"col-10",attrs:{flat:"",color:"grey",size:"md",label:"Add to cart",icon:"add_shopping_cart"},on:{click:e.addToCart}})],1)])],1)],1),s("div",{staticClass:"col-12 q-pt-md"},[s("q-card",{attrs:{flat:"",bordered:""}},[s("q-tabs",{staticClass:"shadow-2",attrs:{"inline-label":""},model:{value:e.tab,callback:function(t){e.tab=t},expression:"tab"}},[s("q-tab",{attrs:{name:"description",icon:"description",label:"Description"}}),s("q-tab",{attrs:{name:"reviews",icon:"star",label:"Reviews"}})],1),s("q-separator"),s("q-tab-panels",{attrs:{animated:""},model:{value:e.tab,callback:function(t){e.tab=t},expression:"tab"}},[s("q-tab-panel",{attrs:{name:"description"}},[s("div",{domProps:{innerHTML:e._s(e.data.description)}})]),s("q-tab-panel",{attrs:{name:"payment"}}),s("q-tab-panel",{attrs:{name:"reviews"}},e._l(e.service_transactions,function(t){return s("q-card",{key:t._id,attrs:{flat:"",bordered:""}},[s("q-card-section",[s("q-icon",{attrs:{name:"schedule"}}),e._v("\n                "+e._s(e.$formatDate(t.logs[t.logs.length-1].date))+"\n                "),s("div",[s("font",{staticClass:"text-grey"},[e._v(e._s(t.remarks))])],1),s("q-rating",{attrs:{value:t.rate,size:"1em",max:5,color:"primary"}})],1)],1)}),1)],1)],1)],1)]),s("div",{staticClass:"col-12"},[s("RecommendedProducts")],1),s("q-dialog",{attrs:{persistent:""},model:{value:e.loginForm,callback:function(t){e.loginForm=t},expression:"loginForm"}},[s("q-card",[s("q-card-section",{staticClass:"row items-center"},[s("q-space"),s("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{icon:"close",flat:"",round:"",dense:"",size:"xs"}})],1),s("q-card-section",[s("ShopperLoginForm",{attrs:{afterLogin:e.afterLogin}})],1)],1)],1),s("q-dialog",{model:{value:e.checkout,callback:function(t){e.checkout=t},expression:"checkout"}},[s("q-card",{staticStyle:{width:"700px","max-width":"80vw"}},[s("q-card-section",{staticClass:"row items-center"},[s("div",{staticClass:"text-h6"},[e._v("Checkout")]),s("q-space"),s("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{icon:"close",flat:"",round:"",dense:""}})],1),s("q-card-section")],1)],1)],1)},i=[],r=a("a34a"),n=a.n(r),o=(a("7514"),a("96cf"),a("c973")),c=a.n(o),l=a("4d91"),d=a("2309"),u=a("30ce"),p={components:{ShopperLoginForm:l["a"],RecommendedProducts:d["a"],CheckoutProduct:u["default"]},data:function(){return{tab:"description",data:{},store:{},product_transactions:[],currentPicture:"",currentIndexPicture:0,size:null,color:null,material:null,giftwrapping:!1,giftwrapping_color:"",giftwrapping_size:"small",date_needed:this.$formatDateForPicker(this.$addToDate(new Date,5,0)),payment_option:"",quantity:"1",loginForm:!1,checkout:!1}},methods:{afterLogin:function(){this.loginForm=!1,this.checkLogin()},checkIfLoggedIn:function(){var t=c()(n.a.mark(function t(){var e,a=this;return n.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return e=!0,t.next=3,this.$dbCon.authenticate().then(function(t){a.$local.has("user_token")?a.$dbCon.service("users").find({query:{_id:a.$local.getItem("user_token")}}).then(function(t){e="Shopper"==t.data[0].system_user_type}):e=!1}).catch(function(t){e=!1});case 3:return t.abrupt("return",e);case 4:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),addToCart:function(){var t=c()(n.a.mark(function t(){return n.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.checkIfLoggedIn();case 2:if(!t.sent){t.next=6;break}this.addToCartSignedIn(),t.next=7;break;case 6:this.addToCartNotSignedIn();case 7:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),addToCartSignedIn:function(){var t=c()(n.a.mark(function t(){var e=this;return n.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:this.$dbCon.service("cart").create({item_id:this.data._id,store_id:this.data.store_id,shopper_id:this.$local.getItem("user_token"),type:"products",quantity:this.quantity,size:this.size,color:this.color,material:this.material,date_needed:this.date_needed,giftwrapping:this.giftwrapping,giftwrapping_details:{color:this.giftwrapping_color,size:this.giftwrapping_size,price:this.store.giftwrapping.charges[this.giftwrapping_size]}}).then(function(){e.$q.notify({message:"Item Added To Cart!",position:"top-right",color:"green",timeout:700,icon:"shopping_cart"})});case 1:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),addToCartNotSignedIn:function(){var t=[];this.$session.has("cart")?t=this.$session.get("cart"):this.$session.set("cart",[]),t.push({item_id:this.data._id,store_id:this.data.store_id,type:"products",quantity:this.quantity,size:this.size,color:this.color,material:this.material,date_needed:this.date_needed,giftwrapping:this.giftwrapping,giftwrapping_details:{color:this.giftwrapping_color,size:this.giftwrapping_size,price:this.store.giftwrapping.charges[this.giftwrapping_size]}}),this.$session.set("cart",t),this.$q.notify({message:"Item Added To Cart!",position:"top-right",color:"green",timeout:700,icon:"shopping_cart"}),this.$EventBus.$emit("modify-cart",null)},checkoutSignedIn:function(){var t=c()(n.a.mark(function t(){var e=this;return n.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:this.$dbCon.service("cart").create({item_id:this.data._id,store_id:this.data.store_id,shopper_id:this.$local.getItem("user_token"),type:"products",quantity:this.quantity,size:this.size,color:this.color,material:this.material,date_needed:this.date_needed,giftwrapping:this.giftwrapping,giftwrapping_details:{color:this.giftwrapping_color,size:this.giftwrapping_size,price:this.store.giftwrapping.charges[this.giftwrapping_size]}}).then(function(t){e.$router.push("/CheckoutProduct/"+t._id)});case 1:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),checkLogin:function(){var t=c()(n.a.mark(function t(){var e=this;return n.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:this.$dbCon.authenticate().then(function(){e.checkoutSignedIn()}).catch(function(){e.loginForm=!0});case 1:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()},watch:{quantity:function(){this.quantity<1&&(this.quantity=1),this.quantity%2==0&&(this.quantity=this.quantity-this.quantity%2),this.quantity>this.data.stock&&(this.quantity=this.data.stock)}},mounted:function(){var t=c()(n.a.mark(function t(){var e=this;return n.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return this.$dbCon.service("product-transactions").find({query:{item_id:this.$route.params.product,status:"Done"}}).then(function(t){e.product_transactions=t.data}),t.next=3,this.$dbCon.service("products").find({query:{_id:this.$route.params.product}}).then(function(t){e.data=t.data[0],e.currentPicture=e.data.photos[0]});case 3:return t.next=5,this.$dbCon.service("store").find({query:{_id:this.data.store_id}}).then(function(t){e.store=t.data[0],e.giftwrapping_color=e.store.giftwrapping.colors[0]});case 5:this.$router.push(this.$route.path);case 6:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()},h=p,m=a("2877"),g=Object(m["a"])(h,s,i,!1,null,null,null);e["default"]=g.exports},"36d1":function(t,e,a){},"3ff7":function(t,e,a){"use strict";var s=a("36d1"),i=a.n(s);i.a},"4d91":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("q-card-section",{staticClass:"column items-center"},[a("img",{staticStyle:{width:"80px"},attrs:{src:t.$appLink+"/uploads/admin/sample_logo.png"}}),a("div",{staticClass:"text-h5 text-black col-12"},[t._v("Anturaz Shopper")]),a("div",{staticClass:"text-subtitle2 text-black col-12"},[t._v("Login")])]),a("q-card-section",[a("q-input",{attrs:{color:"primary",label:"Email"},scopedSlots:t._u([{key:"prepend",fn:function(){return[a("q-icon",{attrs:{name:"email"}})]},proxy:!0}]),model:{value:t.email,callback:function(e){t.email=e},expression:"email"}}),a("q-input",{attrs:{color:"primary",type:"password",label:"Password"},scopedSlots:t._u([{key:"prepend",fn:function(){return[a("q-icon",{attrs:{name:"lock"}})]},proxy:!0}]),model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1),a("q-card-actions",{staticClass:"q-px-md"},[a("q-btn",{staticClass:"full-width",attrs:{unelevated:"",color:"primary",size:"lg",label:"Login"},on:{click:t.validate}})],1),a("q-card-section",{staticClass:"text-center q-pa-none",staticStyle:{cursor:"pointer"},on:{click:function(e){return t.$router.push("/ShopperSignUp")}}},[a("p",{staticClass:"text-grey-6"},[t._v("Don't have an account? Sign up here!")])])],1)},i=[],r=a("a34a"),n=a.n(r),o=(a("96cf"),a("c973")),c=a.n(o),l={props:{afterLogin:{type:Function}},data:function(){return{email:"",password:""}},methods:{validate:function(){""==this.email||""==this.password?(console.log("validate method"),this.$q.dialog({title:"Invalid Credentials",message:"The Email and Password you've entered doesn't match any account."})):this.login()},login:function(){var t=this;this.$q.loading.show(),console.log(this.email),console.log(this.password,"hey"),this.$dbCon.authenticate({email:this.email,password:this.password,strategy:"local"}).then(function(){var e=c()(n.a.mark(function e(a){var s,i;return n.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$dbCon.passport.verifyJWT(t.$local.getItem(t.$appLink+"-jwt"));case 2:return s=e.sent,e.next=5,t.$dbCon.services.users.get(s.userId);case 5:i=e.sent,"Shopper"!=i.system_user_type?(console.log("shopper type?"),t.$q.loading.hide(),t.$q.dialog({title:"Invalid Credentials",message:"The credentials is of a Shopper."})):0==i.access?(t.$q.loading.hide(),t.$q.dialog({title:"Access Turned Off",message:"Your access to the app is turned off. Kindly contact Anturaz Team for this issue."}),t.$dbCon.logout()):(t.$q.loading.hide(),t.$local.set("user_token",i._id),t.$EventBus.$emit("logged-in",i),t.afterLogin());case 7:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()).catch(function(e){console.log("catch",e),t.$q.loading.hide(),t.$q.dialog({title:"Invalid Credentials",message:"The Email and Password you've entered doesn't match any account."})})}}},d=l,u=a("2877"),p=Object(u["a"])(d,s,i,!1,null,null,null);e["a"]=p.exports}}]);