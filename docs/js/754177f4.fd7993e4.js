(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["754177f4"],{2234:function(t,e,r){"use strict";var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("q-item",[r("q-item-section",{attrs:{avatar:""}},[r("q-avatar",{attrs:{size:"100px",square:""}},[r("img",{attrs:{ratio:1,src:t.product.photos[0]}})])],1),r("q-item-section",[r("q-item-label",{staticClass:"text-title",attrs:{lines:"1"}},[t._v(t._s(t.product.product_name))]),r("q-item-label",{attrs:{caption:"",lines:"2"}},[r("span",{staticClass:"text-weight-bold"},[t._v("Category:")]),t._v("\n        "+t._s(t.product.category)+"\n      ")]),r("q-item-label",{attrs:{caption:"",lines:"2"}},[r("span",{staticClass:"text-weight-bold"},[t._v("Date Needed:")]),t._v("\n        "+t._s(t.$formatDate_DateOnly(t.order.date_needed))+"\n      ")]),r("q-item-label",{attrs:{caption:"",lines:"2"}},[void 0!=t.order.mode_of_delivery?r("span",{staticClass:"text-weight-bold"},[t._v("Mode of Delivery:")]):t._e(),t._v("\n        "+t._s(t.order.mode_of_delivery)+"\n      ")]),null!=t.order.size&&""!=t.order.size?r("q-item-label",{attrs:{caption:"",lines:"2"}},[r("span",{staticClass:"text-weight-bold"},[t._v("Size:")]),t._v("\n        "+t._s(t.order.size)+"\n      ")]):t._e(),null!=t.order.color&&""!=t.order.color?r("q-item-label",{attrs:{caption:"",lines:"2"}},[r("span",{staticClass:"text-weight-bold"},[t._v("Color:")]),t._v("\n        "+t._s(t.order.color)+"\n      ")]):t._e(),null!=t.order.material&&""!=t.order.material?r("q-item-label",{attrs:{caption:"",lines:"2"}},[r("span",{staticClass:"text-weight-bold"},[t._v("Material:")]),t._v("\n        "+t._s(t.order.material)+"\n      ")]):t._e()],1),r("q-item-section",{attrs:{side:"",top:""}},[void 0!=t.order.order_number?r("span",{staticClass:"text-primary text-title text-bold"},[t._v("ORDER# "+t._s(t.order.order_number)+" ")]):t._e(),r("div",[r("span",{staticClass:"text-primary text-title text-bold"},[t._v(t._s(t.$prettyMoney(t.payment.total))+" ")])]),r("div",[t._v("Qty "+t._s(t.order.quantity))]),r("q-space"),r("div",[t.buttonVisible?r("q-btn",{attrs:{label:t.buttonLabel,color:"primary",unelevated:""},on:{click:t.updateFunction}}):t._e()],1)],1)],1)],1)},n=[],o=(r("7514"),{props:{order:Object,updateFunction:Function,buttonLabel:String,buttonVisible:Boolean},data:function(){return{product:{},shopper:{},payment:{}}},mounted:function(){var t=this;this.$dbCon.service("products").get(this.order.item_id).then(function(e){t.product=e}),this.$dbCon.service("users").get(this.order.shopper_id).then(function(e){t.shopper=e}),this.$dbCon.service("shopper-payments").find({query:{related_id:this.order._id}}).then(function(e){console.log(e),t.payment=e.data[0]})}}),i=o,s=r("2877"),l=Object(s["a"])(i,a,n,!1,null,null,null);e["a"]=l.exports},7225:function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"row"},[t._data&&t._data[t.current_count]?r("div",{staticClass:"col-9 text-right self-center q-pr-md"},[t._v(t._s(t._data[t.current_count].length))]):t._e(),r("div",{staticClass:"col-3"},[r("q-btn",{attrs:{icon:"pageview",size:"lg",dense:"",flat:"",color:"grey"},on:{click:function(e){t.opened=!0}}})],1),r("q-dialog",{staticClass:"column",attrs:{"full-height":"","full-width":"",maximized:t.$q.screen.lt.md},model:{value:t.opened,callback:function(e){t.opened=e},expression:"opened"}},[r("q-card",{staticClass:"col-12",staticStyle:{width:"800px","max-width":"80vw"}},[r("q-bar",[r("q-space"),r("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{dense:"",flat:"",icon:"close"},on:{click:function(e){t.opened=!1}}},[r("q-tooltip",{attrs:{"content-class":"bg-white text-primary"}},[t._v("Close")])],1)],1),r("q-card-section",[r("q-breadcrumbs",{staticClass:"text-grey"},[r("q-breadcrumbs-el",{attrs:{label:"Store",icon:"store"}}),r("q-breadcrumbs-el",{attrs:{label:"Orders",icon:"list"}})],1),r("br"),r("q-card",{staticClass:"col-12",attrs:{flat:""}},[r("q-card-section",[r("q-card",{attrs:{flat:"",bordered:""}},[r("q-tabs",{staticClass:"text-grey",attrs:{dense:"","active-color":"primary","indicator-color":"primary",align:"left","narrow-indicator":""},model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},[r("q-tab",{attrs:{name:"Pending Payment",label:"Pending Payment"}},[t.pendingPayment?r("q-badge",{attrs:{color:"primary",label:t.pendingPayment.length}}):t._e()],1),r("q-tab",{attrs:{name:"For Acknowledgement",label:"For Acknowledgement"}},[t.forAcknowledgement?r("q-badge",{attrs:{color:"primary",label:t.forAcknowledgement.length}}):t._e()],1),r("q-tab",{attrs:{name:"For Packaging",label:"For Packaging"}},[t.forPackaging?r("q-badge",{attrs:{color:"primary",label:t.forPackaging.length}}):t._e()],1),r("q-tab",{attrs:{name:"For Shipping",label:"For Shipping"}},[t.forShipping?r("q-badge",{attrs:{color:"primary",label:t.forShipping.length}}):t._e()],1),r("q-tab",{attrs:{name:"For Pickup",label:"For Pickup"}},[t.forPickup?r("q-badge",{attrs:{color:"primary",label:t.forPickup.length}}):t._e()],1),r("q-tab",{attrs:{name:"Completed",label:"Completed"}},[t.completed?r("q-badge",{attrs:{color:"primary",label:t.completed.length}}):t._e()],1)],1),r("q-separator"),r("q-tab-panels",{attrs:{animated:""},model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},[r("q-tab-panel",{attrs:{name:"Pending Payment"}},t._l(t.pendingPayment,function(t){return r("q-list",{key:t._id,attrs:{bordered:""}},[r("PendingPayment",{attrs:{order:t}})],1)}),1),r("q-tab-panel",{attrs:{name:"For Acknowledgement"}},t._l(t.forAcknowledgement,function(t){return r("q-list",{key:t._id,attrs:{bordered:""}},[r("ForAcknowledgement",{attrs:{order:t}})],1)}),1),r("q-tab-panel",{attrs:{name:"For Packaging"}},t._l(t.forPackaging,function(t){return r("q-list",{key:t._id,attrs:{bordered:""}},[r("ForPackaging",{attrs:{order:t}})],1)}),1),r("q-tab-panel",{attrs:{name:"For Shipping"}},t._l(t.forShipping,function(t){return r("q-list",{key:t._id,attrs:{bordered:""}},[r("ForShipping",{attrs:{order:t}})],1)}),1),r("q-tab-panel",{attrs:{name:"For Pickup"}},t._l(t.forPickup,function(t){return r("q-list",{key:t._id,attrs:{bordered:""}},[r("ForPickup",{attrs:{order:t}})],1)}),1),r("q-tab-panel",{attrs:{name:"Completed"}},t._l(t.completed,function(t){return r("q-list",{key:t._id,attrs:{bordered:""}},[r("ForPickup",{attrs:{order:t}})],1)}),1)],1)],1)],1)],1)],1)],1)],1)],1)},n=[],o=(r("28a5"),r("a34a")),i=r.n(o),s=(r("7514"),r("96cf"),r("c973")),l=r.n(s),c=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("ProductDetails",{attrs:{order:t.order,buttonVisible:!1}})],1)},d=[],u=r("2234"),p={props:["order"],components:{ProductDetails:u["a"]}},b=p,m=r("2877"),g=Object(m["a"])(b,c,d,!1,null,null,null),h=g.exports,f=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("ProductDetails",{attrs:{order:t.order,buttonLabel:"Acknowledge",buttonVisible:!0,updateFunction:t.update}})],1)},_=[],v={props:["order"],components:{ProductDetails:u["a"]},methods:{update:function(){var t=this;this.$q.dialog({title:"Mark as Acknowledged",message:"Are you sure you want to proceed?",cancel:{push:!0,color:"grey",flat:!0}}).onOk(function(){t.order.status="For Packaging",t.order.logs.push({event:"Acknowledged",date:new Date}),t.$dbCon.service("product-transactions").patch(t.order._id,t.order).then(function(){t.opened=!1})})}}},k=v,q=Object(m["a"])(k,f,_,!1,null,null,null),y=q.exports,P=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("ProductDetails",{attrs:{order:t.order,buttonLabel:"Package",buttonVisible:!0,updateFunction:t.update}})],1)},w=[],x={props:["order"],components:{ProductDetails:u["a"]},methods:{update:function(){var t=this;this.$q.dialog({title:"Mark as Packaged",message:"Are you sure you want to proceed?",cancel:{push:!0,color:"grey",flat:!0}}).onOk(function(){"Shipping"==t.order.mode_of_delivery?t.order.status="For Shipping":"Pickup"==t.order.mode_of_delivery&&(t.order.status="For Pickup"),t.order.logs.push({event:"Packaged",date:new Date}),t.$dbCon.service("product-transactions").patch(t.order._id,t.order).then(function(){t.opened=!1})})}}},C=x,F=Object(m["a"])(C,P,w,!1,null,null,null),$=F.exports,O=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("ProductDetails",{attrs:{order:t.order,buttonLabel:"SHIP OUT",buttonVisible:!0,updateFunction:function(){t.opened=!0}}}),r("q-dialog",{model:{value:t.opened,callback:function(e){t.opened=e},expression:"opened"}},[r("q-card",{staticStyle:{width:"600px"}},[r("q-card-section",{staticClass:"text-h6 text-white bg-primary"},[r("div",[t._v("Shipping Information")])]),r("q-separator"),r("q-card-section",{staticClass:"scroll",staticStyle:{"max-height":"70vh"}},[r("q-input",{staticClass:"q-pa-sm",attrs:{outlined:"",label:"Tracking Number"},model:{value:t.tracking_number,callback:function(e){t.tracking_number=e},expression:"tracking_number"}}),r("q-input",{staticClass:"q-pa-sm",attrs:{outlined:"",label:"Courier"},model:{value:t.courier,callback:function(e){t.courier=e},expression:"courier"}}),r("q-input",{staticClass:"q-pa-sm",attrs:{outlined:"",label:"Estimated Time of Arrival",type:"textarea"},model:{value:t.eta,callback:function(e){t.eta=e},expression:"eta"}})],1),r("q-separator"),r("q-card-actions",{attrs:{align:"right"}},[r("q-btn",{attrs:{flat:"",label:"Cancel",color:"grey"},on:{click:function(e){t.opened=!1}}}),r("q-btn",{attrs:{flat:"",label:"Submit",color:"primary"},on:{click:t.update}})],1)],1)],1)],1)},S=[],D={props:["order"],components:{ProductDetails:u["a"]},data:function(){return{opened:!1,tracking_number:"",courier:"",eta:""}},methods:{update:function(){var t=this;this.$q.dialog({title:"Mark as Ship out",message:"Are you sure you want to proceed?",cancel:{push:!0,color:"grey",flat:!0}}).onOk(function(){t.order.status="For Receiving",t.order.shipping_details={tracking_number:t.tracking_number,courier:t.courier,eta:t.eta},t.order.logs.push({event:"Ship-out",date:new Date}),t.$dbCon.service("product-transactions").patch(t.order._id,t.order).then(function(){t.opened=!1})})}}},A=D,j=Object(m["a"])(A,O,S,!1,null,null,null),E=j.exports,V=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("ProductDetails",{attrs:{order:t.order,buttonLabel:"Pickup",buttonVisible:!0,updateFunction:t.update}})],1)},z=[],L={props:["order"],components:{ProductDetails:u["a"]},methods:{update:function(){var t=this;this.$q.dialog({title:"Mark as Picked Up",message:"Are you sure you want to proceed?",cancel:{push:!0,color:"grey",flat:!0}}).onOk(function(){t.order.status="For Rating",t.order.logs.push({event:"Picked up",date:new Date}),t.order.logs.push({event:"Received",date:new Date}),t.$dbCon.service("product-transactions").patch(t.order._id,t.order).then(function(){t.opened=!1})})}}},M=L,R=Object(m["a"])(M,V,z,!1,null,null,null),I=R.exports,N=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("ProductDetails",{attrs:{order:t.order,buttonVisible:!1}})],1)},T=[],J={props:["order"],components:{ProductDetails:u["a"]},methods:{}},U=J,B=Object(m["a"])(U,N,T,!1,null,null,null),H=B.exports,Q={props:["tab"],components:{PendingPayment:h,ForAcknowledgement:y,ForPackaging:$,ForShipping:E,ForPickup:I,Completed:H},data:function(){return{pendingPayment:[],forAcknowledgement:[],forPackaging:[],forShipping:[],forPickup:[],completed:[],opened:!1,current_count:""}},methods:{getOrder:function(){var t=l()(i.a.mark(function t(e){var r;return i.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$dbCon.service("product-transactions").find({query:{store_id:this.$local.getItem("store_token"),status:e}});case 2:return r=t.sent,t.abrupt("return",r.data);case 4:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}()},mounted:function(){var t=l()(i.a.mark(function t(){var e=this;return i.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return this.current_count=this.tab.split(" ").join(""),this.current_count=this.current_count.charAt(0).toLowerCase()+this.current_count.substring(1),t.next=4,this.$dbCon.service("product-transactions").onDataChange(l()(i.a.mark(function t(){return i.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.getOrder("Pending Payment");case 2:return e.pendingPayment=t.sent,t.next=5,e.getOrder("For Acknowledgement");case 5:return e.forAcknowledgement=t.sent,t.next=8,e.getOrder("For Packaging");case 8:return e.forPackaging=t.sent,t.next=11,e.getOrder("For Shipping");case 11:return e.forShipping=t.sent,t.next=14,e.getOrder("For Pickup");case 14:return e.forPickup=t.sent,t.next=17,e.getOrder("Completed");case 17:e.completed=t.sent;case 18:case"end":return t.stop()}},t)})));case 4:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()},G=Q,K=Object(m["a"])(G,a,n,!1,null,null,null);e["default"]=K.exports}}]);