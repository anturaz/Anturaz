(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["392efeae"],{"2b67":function(e,t,r){"use strict";var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("q-item",[r("q-item-section",{attrs:{avatar:""}},[r("q-avatar",{attrs:{size:"100px",square:""}},[r("img",{attrs:{ratio:1,src:e.product.photos[0]}})])],1),r("q-item-section",[r("q-item-label",{staticClass:"text-title",attrs:{lines:"1"}},[e._v(e._s(e.product.service_name))]),r("q-item-label",{attrs:{caption:"",lines:"2"}},[r("span",{staticClass:"text-weight-bold"},[e._v("Category:")]),e._v("\n        "+e._s(e.product.category)+"\n      ")]),r("q-item-label",{attrs:{caption:"",lines:"2"}},[r("span",{staticClass:"text-weight-bold"},[e._v("Date Needed:")]),e._v("\n        "+e._s(e.$formatDate_DateOnly(e.order.date_needed))+"\n      ")]),void 0!=e.order.mode_of_delivery?r("q-item-label",{attrs:{caption:"",lines:"2"}},[r("span",{staticClass:"text-weight-bold"},[e._v("Mode of Delivery:")]),e._v("\n        "+e._s(e.order.mode_of_delivery)+"\n      ")]):e._e()],1),r("q-item-section",{attrs:{side:"",top:""}},[void 0!=e.order.order_number?r("span",{staticClass:"text-primary text-title text-bold"},[e._v("RESERVATION# "+e._s(e.order.order_number)+" ")]):e._e(),r("div",[r("span",{staticClass:"text-primary text-title text-bold"},[e._v(e._s(e.$prettyMoney(e.payment.total))+" ")])]),r("div",[e._v("Qty "+e._s(e.order.quantity))]),r("q-space"),r("div",[e.buttonVisible?r("q-btn",{attrs:{label:e.buttonLabel,color:"primary",unelevated:""},on:{click:e.updateFunction}}):e._e()],1)],1)],1)],1)},n=[],o=(r("7514"),{props:{order:Object,updateFunction:Function,buttonLabel:String,buttonVisible:Boolean},data:function(){return{product:{},shopper:{},payment:{}}},mounted:function(){var e=this;this.$dbCon.service("services").get(this.order.item_id).then(function(t){e.product=t}),this.$dbCon.service("users").get(this.order.shopper_id).then(function(t){e.shopper=t}),this.$dbCon.service("shopper-payments").find({query:{related_id:this.order._id}}).then(function(t){console.log(t),e.payment=t.data[0]})}}),s=o,i=r("2877"),l=Object(i["a"])(s,a,n,!1,null,null,null);t["a"]=l.exports},"653e":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"row"},[r("div",{staticClass:"col-9 text-right self-center q-pr-md"},[e._v(e._s(e._data[e.current_count].length))]),r("div",{staticClass:"col-3"},[r("q-btn",{attrs:{icon:"pageview",size:"lg",dense:"",flat:"",color:"grey"},on:{click:function(t){e.opened=!0}}})],1),r("q-dialog",{staticClass:"column",attrs:{"full-height":"","full-width":"",maximized:e.$q.screen.lt.md},model:{value:e.opened,callback:function(t){e.opened=t},expression:"opened"}},[r("q-card",{staticClass:"col-12",staticStyle:{width:"800px","max-width":"80vw"}},[r("q-bar",[r("q-space"),r("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{dense:"",flat:"",icon:"close"},on:{click:function(t){e.opened=!1}}},[r("q-tooltip",{attrs:{"content-class":"bg-white text-primary"}},[e._v("Close")])],1)],1),r("q-card-section",[r("q-breadcrumbs",{staticClass:"text-grey"},[r("q-breadcrumbs-el",{attrs:{label:"Store",icon:"store"}}),r("q-breadcrumbs-el",{attrs:{label:"Reservations",icon:"menu_book"}})],1),r("br"),r("q-card",{staticClass:"col-12",attrs:{flat:""}},[r("q-card-section",[r("q-card",{attrs:{flat:"",bordered:""}},[r("q-tabs",{staticClass:"text-grey",attrs:{dense:"","active-color":"primary","indicator-color":"primary",align:"left","narrow-indicator":""},model:{value:e.tab,callback:function(t){e.tab=t},expression:"tab"}},[r("q-tab",{attrs:{name:"Pending Payment",label:"Pending Payment"}},[r("q-badge",{attrs:{color:"primary",label:e.pendingPayment.length}})],1),r("q-tab",{attrs:{name:"To Acknowledge",label:"To Acknowledge"}},[r("q-badge",{attrs:{color:"primary",label:e.toAcknowledge.length}})],1),r("q-tab",{attrs:{name:"Status",label:"Status"}},[r("q-badge",{attrs:{color:"primary",label:e.status.length}})],1),r("q-tab",{attrs:{name:"Completed",label:"Completed"}},[r("q-badge",{attrs:{color:"primary",label:e.completed.length}})],1)],1),r("q-separator"),r("q-tab-panels",{attrs:{animated:""},model:{value:e.tab,callback:function(t){e.tab=t},expression:"tab"}},[r("q-tab-panel",{attrs:{name:"Pending Payment"}},e._l(e.pendingPayment,function(e){return r("q-list",{key:e._id,attrs:{bordered:""}},[r("PendingPayment",{attrs:{order:e}})],1)}),1),r("q-tab-panel",{attrs:{name:"To Acknowledge"}},e._l(e.toAcknowledge,function(e){return r("q-list",{key:e._id,attrs:{bordered:""}},[r("ToAcknowledge",{attrs:{order:e}})],1)}),1),r("q-tab-panel",{attrs:{name:"Status"}},e._l(e.status,function(e){return r("q-list",{key:e._id,attrs:{bordered:""}},[r("Status",{attrs:{order:e}})],1)}),1),r("q-tab-panel",{attrs:{name:"Completed"}},e._l(e.completed,function(e){return r("q-list",{key:e._id,attrs:{bordered:""}},[r("Status",{attrs:{order:e}})],1)}),1)],1)],1)],1)],1)],1)],1)],1)],1)},n=[],o=(r("28a5"),r("a34a")),s=r.n(o),i=(r("7514"),r("96cf"),r("c973")),l=r.n(i),c=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("ServiceDetails",{attrs:{order:e.order,buttonVisible:!1}})],1)},d=[],u=r("2b67"),p={props:["order"],components:{ServiceDetails:u["a"]}},b=p,m=r("2877"),v=Object(m["a"])(b,c,d,!1,null,null,null),h=v.exports,_=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("ServiceDetails",{attrs:{order:e.order,updateFunction:e.update,buttonLabel:"Review",buttonVisible:!0}})],1)},g=[],f={props:["order"],components:{ServiceDetails:u["a"]},methods:{update:function(){var e=this;this.$q.dialog({title:"Mark as Reviewed",message:"Are you sure you want to proceed?",cancel:{push:!0,color:"grey",flat:!0}}).onOk(function(){e.order.status="To Acknowledge",e.order.logs.push({event:"Reviewed",date:new Date}),e.$dbCon.service("service-transactions").patch(e.order._id,e.order).then(function(){e.opened=!1})})}}},y=f,q=Object(m["a"])(y,_,g,!1,null,null,null),w=q.exports,k=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("ServiceDetails",{attrs:{order:e.order,updateFunction:e.update,buttonVisible:!1}})],1)},x=[],C={props:["order"],components:{ServiceDetails:u["a"]},methods:{update:function(){var e=this;this.$q.dialog({title:"Mark as Prepared",message:"Are you sure you want to proceed?",cancel:{push:!0,color:"grey",flat:!0}}).onOk(function(){"Shipping"==e.order.mode_of_delivery?e.order.status="For Shipping":"Pickup"==e.order.mode_of_delivery&&(e.order.status="For Pickup"),e.order.logs.push({event:"Packaged",date:new Date}),e.$dbCon.service("service-transactions").patch(e.order._id,e.order).then(function(){e.opened=!1})})}}},D=C,P=Object(m["a"])(D,k,x,!1,null,null,null),S=P.exports,$=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("ServiceDetails",{attrs:{order:e.order,buttonVisible:!1}})],1)},A=[],O={props:["order"],components:{ServiceDetails:u["a"]},methods:{}},T=O,j=Object(m["a"])(T,$,A,!1,null,null,null),E=j.exports,F={props:["tab"],components:{PendingPayment:h,ToAcknowledge:w,Status:S,Completed:E},data:function(){return{pendingPayment:[],toAcknowledge:[],status:[],completed:[],tab:"To Acknowledge",opened:!1,current_count:""}},methods:{getData:function(){var e=l()(s.a.mark(function e(t){var r;return s.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$dbCon.service("service-transactions").find({query:{store_id:this.$local.getItem("store_token"),status:t}});case 2:return r=e.sent,e.abrupt("return",r.data);case 4:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},mounted:function(){var e=l()(s.a.mark(function e(){var t=this;return s.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:this.current_count=this.tab.split(" ").join(""),this.current_count=this.current_count.charAt(0).toLowerCase()+this.current_count.substring(1),this.$dbCon.service("service-transactions").onDataChange(l()(s.a.mark(function e(){return s.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.getData("Pending Payment");case 2:return t.pendingPayment=e.sent,e.next=5,t.getData("For Acknowledgement");case 5:return t.toAcknowledge=e.sent,e.next=8,t.getData("To Acknowledge");case 8:return t.status=e.sent,e.next=11,t.getData("Completed");case 11:t.completed=e.sent;case 12:case"end":return e.stop()}},e)})));case 3:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},V=F,R=Object(m["a"])(V,a,n,!1,null,null,null);t["default"]=R.exports}}]);