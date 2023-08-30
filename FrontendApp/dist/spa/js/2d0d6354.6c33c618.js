(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["2d0d6354"],{7225:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"row"},[e._data&&e._data[e.current_count]?r("div",{staticClass:"col-9 text-right self-center q-pr-md"},[e._v(e._s(e._data[e.current_count].length))]):e._e(),r("div",{staticClass:"col-3"},[r("q-btn",{attrs:{icon:"pageview",size:"lg",dense:"",flat:"",color:"grey"},on:{click:function(t){e.opened=!0}}})],1),r("q-dialog",{staticClass:"column",attrs:{"full-height":"","full-width":"",maximized:e.$q.screen.lt.md},model:{value:e.opened,callback:function(t){e.opened=t},expression:"opened"}},[r("q-card",{staticClass:"col-12",staticStyle:{width:"800px","max-width":"80vw"}},[r("q-bar",[r("q-space"),r("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{dense:"",flat:"",icon:"close"},on:{click:function(t){e.opened=!1}}},[r("q-tooltip",{attrs:{"content-class":"bg-white text-primary"}},[e._v("Close")])],1)],1),r("q-card-section",[r("q-breadcrumbs",{staticClass:"text-grey"},[r("q-breadcrumbs-el",{attrs:{label:"Store",icon:"store"}}),r("q-breadcrumbs-el",{attrs:{label:"Orders",icon:"list"}})],1),r("br"),r("q-card",{staticClass:"col-12",attrs:{flat:""}},[r("q-card-section",[r("q-card",{attrs:{flat:"",bordered:""}},[r("q-tabs",{staticClass:"text-grey",attrs:{dense:"","active-color":"primary","indicator-color":"primary",align:"left","narrow-indicator":""},model:{value:e.tab,callback:function(t){e.tab=t},expression:"tab"}},[r("q-tab",{attrs:{name:"Pending Payment",label:"Pending Payment"}},[e.pendingPayment?r("q-badge",{attrs:{color:"primary",label:e.pendingPayment.length}}):e._e()],1),r("q-tab",{attrs:{name:"For Acknowledgement",label:"For Acknowledgement"}},[e.forAcknowledgement?r("q-badge",{attrs:{color:"primary",label:e.forAcknowledgement.length}}):e._e()],1),r("q-tab",{attrs:{name:"For Packaging",label:"For Packaging"}},[e.forPackaging?r("q-badge",{attrs:{color:"primary",label:e.forPackaging.length}}):e._e()],1),r("q-tab",{attrs:{name:"For Shipping",label:"For Shipping"}},[e.forShipping?r("q-badge",{attrs:{color:"primary",label:e.forShipping.length}}):e._e()],1),r("q-tab",{attrs:{name:"For Pickup",label:"For Pickup"}},[e.forPickup?r("q-badge",{attrs:{color:"primary",label:e.forPickup.length}}):e._e()],1),r("q-tab",{attrs:{name:"Completed",label:"Completed"}},[e.completed?r("q-badge",{attrs:{color:"primary",label:e.completed.length}}):e._e()],1)],1),r("q-separator"),r("q-tab-panels",{attrs:{animated:""},model:{value:e.tab,callback:function(t){e.tab=t},expression:"tab"}},[r("q-tab-panel",{attrs:{name:"Pending Payment"}},e._l(e.pendingPayment,function(e){return r("q-list",{key:e._id,attrs:{bordered:""}},[r("PendingPayment",{attrs:{order:e}})],1)}),1),r("q-tab-panel",{attrs:{name:"For Acknowledgement"}},e._l(e.forAcknowledgement,function(e){return r("q-list",{key:e._id,attrs:{bordered:""}},[r("ForAcknowledgement",{attrs:{order:e}})],1)}),1),r("q-tab-panel",{attrs:{name:"For Packaging"}},e._l(e.forPackaging,function(e){return r("q-list",{key:e._id,attrs:{bordered:""}},[r("ForPackaging",{attrs:{order:e}})],1)}),1),r("q-tab-panel",{attrs:{name:"For Shipping"}},e._l(e.forShipping,function(e){return r("q-list",{key:e._id,attrs:{bordered:""}},[r("ForShipping",{attrs:{order:e}})],1)}),1),r("q-tab-panel",{attrs:{name:"For Pickup"}},e._l(e.forPickup,function(e){return r("q-list",{key:e._id,attrs:{bordered:""}},[r("ForPickup",{attrs:{order:e}})],1)}),1),r("q-tab-panel",{attrs:{name:"Completed"}},e._l(e.completed,function(e){return r("q-list",{key:e._id,attrs:{bordered:""}},[r("ForPickup",{attrs:{order:e}})],1)}),1)],1)],1)],1)],1)],1)],1)],1)],1)},a=[],o=(r("28a5"),r("a34a")),i=r.n(o),s=(r("7514"),r("96cf"),r("c973")),c=r.n(s),l=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("ProductDetails",{attrs:{order:e.order,buttonVisible:!1}})],1)},d=[],u=r("2234"),p={props:["order"],components:{ProductDetails:u["a"]}},g=p,b=r("2877"),m=Object(b["a"])(g,l,d,!1,null,null,null),h=m.exports,f=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("ProductDetails",{attrs:{order:e.order,buttonLabel:"Acknowledge",buttonVisible:!0,updateFunction:e.update}})],1)},k=[],_={props:["order"],components:{ProductDetails:u["a"]},methods:{update:function(){var e=this;this.$q.dialog({title:"Mark as Acknowledged",message:"Are you sure you want to proceed?",cancel:{push:!0,color:"grey",flat:!0}}).onOk(function(){e.order.status="For Packaging",e.order.logs.push({event:"Acknowledged",date:new Date}),e.$dbCon.service("product-transactions").patch(e.order._id,e.order).then(function(){e.opened=!1})})}}},q=_,P=Object(b["a"])(q,f,k,!1,null,null,null),v=P.exports,y=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("ProductDetails",{attrs:{order:e.order,buttonLabel:"Package",buttonVisible:!0,updateFunction:e.update}})],1)},w=[],x={props:["order"],components:{ProductDetails:u["a"]},methods:{update:function(){var e=this;this.$q.dialog({title:"Mark as Packaged",message:"Are you sure you want to proceed?",cancel:{push:!0,color:"grey",flat:!0}}).onOk(function(){"Shipping"==e.order.mode_of_delivery?e.order.status="For Shipping":"Pickup"==e.order.mode_of_delivery&&(e.order.status="For Pickup"),e.order.logs.push({event:"Packaged",date:new Date}),e.$dbCon.service("product-transactions").patch(e.order._id,e.order).then(function(){e.opened=!1})})}}},F=x,C=Object(b["a"])(F,y,w,!1,null,null,null),S=C.exports,A=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("ProductDetails",{attrs:{order:e.order,buttonLabel:"SHIP OUT",buttonVisible:!0,updateFunction:function(){e.opened=!0}}}),r("q-dialog",{model:{value:e.opened,callback:function(t){e.opened=t},expression:"opened"}},[r("q-card",{staticStyle:{width:"600px"}},[r("q-card-section",{staticClass:"text-h6 text-white bg-primary"},[r("div",[e._v("Shipping Information")])]),r("q-separator"),r("q-card-section",{staticClass:"scroll",staticStyle:{"max-height":"70vh"}},[r("q-input",{staticClass:"q-pa-sm",attrs:{outlined:"",label:"Tracking Number"},model:{value:e.tracking_number,callback:function(t){e.tracking_number=t},expression:"tracking_number"}}),r("q-input",{staticClass:"q-pa-sm",attrs:{outlined:"",label:"Courier"},model:{value:e.courier,callback:function(t){e.courier=t},expression:"courier"}}),r("q-input",{staticClass:"q-pa-sm",attrs:{outlined:"",label:"Estimated Time of Arrival",type:"textarea"},model:{value:e.eta,callback:function(t){e.eta=t},expression:"eta"}})],1),r("q-separator"),r("q-card-actions",{attrs:{align:"right"}},[r("q-btn",{attrs:{flat:"",label:"Cancel",color:"grey"},on:{click:function(t){e.opened=!1}}}),r("q-btn",{attrs:{flat:"",label:"Submit",color:"primary"},on:{click:e.update}})],1)],1)],1)],1)},O=[],$={props:["order"],components:{ProductDetails:u["a"]},data:function(){return{opened:!1,tracking_number:"",courier:"",eta:""}},methods:{update:function(){var e=this;this.$q.dialog({title:"Mark as Ship out",message:"Are you sure you want to proceed?",cancel:{push:!0,color:"grey",flat:!0}}).onOk(function(){e.order.status="For Receiving",e.order.shipping_details={tracking_number:e.tracking_number,courier:e.courier,eta:e.eta},e.order.logs.push({event:"Ship-out",date:new Date}),e.$dbCon.service("product-transactions").patch(e.order._id,e.order).then(function(){e.opened=!1})})}}},D=$,j=Object(b["a"])(D,A,O,!1,null,null,null),E=j.exports,V=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("ProductDetails",{attrs:{order:e.order,buttonLabel:"Pickup",buttonVisible:!0,updateFunction:e.update}})],1)},L=[],M={props:["order"],components:{ProductDetails:u["a"]},methods:{update:function(){var e=this;this.$q.dialog({title:"Mark as Picked Up",message:"Are you sure you want to proceed?",cancel:{push:!0,color:"grey",flat:!0}}).onOk(function(){e.order.status="For Rating",e.order.logs.push({event:"Picked up",date:new Date}),e.order.logs.push({event:"Received",date:new Date}),e.$dbCon.service("product-transactions").patch(e.order._id,e.order).then(function(){e.opened=!1})})}}},I=M,R=Object(b["a"])(I,V,L,!1,null,null,null),T=R.exports,z=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("ProductDetails",{attrs:{order:e.order,buttonVisible:!1}})],1)},J=[],N={props:["order"],components:{ProductDetails:u["a"]},methods:{}},U=N,H=Object(b["a"])(U,z,J,!1,null,null,null),B=H.exports,G={props:["tab"],components:{PendingPayment:h,ForAcknowledgement:v,ForPackaging:S,ForShipping:E,ForPickup:T,Completed:B},data:function(){return{pendingPayment:[],forAcknowledgement:[],forPackaging:[],forShipping:[],forPickup:[],completed:[],opened:!1,current_count:""}},methods:{getOrder:function(){var e=c()(i.a.mark(function e(t){var r;return i.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$dbCon.service("product-transactions").find({query:{store_id:this.$local.getItem("store_token"),status:t}});case 2:return r=e.sent,e.abrupt("return",r.data);case 4:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},mounted:function(){var e=c()(i.a.mark(function e(){var t=this;return i.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return this.current_count=this.tab.split(" ").join(""),this.current_count=this.current_count.charAt(0).toLowerCase()+this.current_count.substring(1),e.next=4,this.$dbCon.service("product-transactions").onDataChange(c()(i.a.mark(function e(){return i.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.getOrder("Pending Payment");case 2:return t.pendingPayment=e.sent,e.next=5,t.getOrder("For Acknowledgement");case 5:return t.forAcknowledgement=e.sent,e.next=8,t.getOrder("For Packaging");case 8:return t.forPackaging=e.sent,e.next=11,t.getOrder("For Shipping");case 11:return t.forShipping=e.sent,e.next=14,t.getOrder("For Pickup");case 14:return t.forPickup=e.sent,e.next=17,t.getOrder("Completed");case 17:t.completed=e.sent;case 18:case"end":return e.stop()}},e)})));case 4:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},K=G,Q=Object(b["a"])(K,n,a,!1,null,null,null);t["default"]=Q.exports}}]);