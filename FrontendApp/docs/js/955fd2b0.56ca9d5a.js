(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["955fd2b0"],{abcd:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("q-btn",{attrs:{unelevated:"",color:"primary"},on:{click:function(e){t.opened=!0}}},[t._v("Evaluate")]),s("q-dialog",{attrs:{persistent:""},model:{value:t.opened,callback:function(e){t.opened=e},expression:"opened"}},[s("q-card",{staticStyle:{width:"600px"}},[s("q-card-section",{staticClass:"bg-primary"},[s("div",{staticClass:"text-h6 text-white"},[t._v("Evaluate Bank Deposit")])]),s("q-separator"),s("q-card-section",{staticClass:"row"},[s("div",{staticClass:"col-md-5 col-sm-12 q-pa-sm"},[s("div",{staticClass:"text-h6"},[t._v("Store Details")]),s("q-separator"),s("div",{staticClass:"q-pa-sm"},[s("div",[s("b",[t._v("Store:")]),t._v("\n              "+t._s(t.store.store_name)+"\n            ")]),s("div",[s("b",[t._v("Mobile Number:")]),t._v("\n              "+t._s(t.store.mobile_number)+"\n            ")]),s("div",[s("b",[t._v("Landline Number:")]),t._v("\n              "+t._s(t.store.landline_number)+"\n            ")])]),s("div",{staticClass:"text-h6"},[t._v("Order Details")]),s("q-separator"),s("div",{staticClass:"q-pa-sm"},[s("div",[s("b",[t._v("Type:")]),t._v("\n              "+t._s(t.type)+"\n            ")]),s("div",[s("b",[t._v("Date Ordered:")]),t._v("\n              "+t._s(t.orderDetails.date_ordered)+"\n            ")]),s("div",[s("b",[t._v("Month/s:")]),t._v("\n              "+t._s(t.orderDetails.months)+"\n            ")]),s("div",[s("b",[t._v("Total Amount:")]),t._v("\n              "+t._s(t.orderDetails.months*t.orderDetails.total_amount)+"\n            ")])])],1),s("div",{staticClass:"col-md-7 col-sm-12 q-pa-sm"},[s("div",{staticClass:"text-h6"},[t._v("Deposit Slip")]),s("q-separator"),s("div",{staticClass:"q-pa-sm"},[s("q-list",{staticClass:"rounded-borders",attrs:{padding:"",bordered:""}},t._l(t.deposits,function(e,a){return s("q-expansion-item",{key:a,attrs:{group:"somegroup",dense:"","default-opened":0==a,"dense-toggle":"","expand-separator":"",label:t.$formatDate_DateOnly(e.date_uploaded)}},[s("q-card",[s("q-card-section",[s("q-img",{attrs:{ratio:16/9,src:e.path}}),s("div",{attrs:{align:"right"}},[s("a",{attrs:{href:e.path,target:"_blank"}},[s("q-btn",{attrs:{unelevated:"",color:"primary",icon:"remove_red_eye",label:"view",outline:"",dense:"",size:"sm"}})],1),t._v("  \n                      "),s("a",{attrs:{href:e.path,target:"_blank"}},[s("q-btn",{attrs:{unelevated:"",color:"primary",icon:"get_app",label:"download",outline:"",dense:"",size:"sm"}})],1)]),s("div",[s("b",[t._v("Reference Number:")]),t._v("\n                      "+t._s(e.reference_number)+"\n                    ")]),s("div",[s("b",[t._v("Total Amount:")]),t._v("\n                      "+t._s(t.$prettyMoney(e.total_amount))+"\n                    ")]),s("div",[s("b",[t._v("Date Deposited:")]),t._v("\n                      "+t._s(e.date_deposited)+"\n                    ")]),s("div",[s("b",[t._v("Store Owner Remarks:")]),t._v("\n                      "+t._s(e.remarks)+"\n                    ")]),0!=a?s("div",[s("b",[t._v("Comments:")]),t._v("\n                      "+t._s(e.comments)+"\n                    ")]):t._e()],1)],1)],1)}),1)],1)],1)]),s("q-separator"),s("q-card-actions",{attrs:{align:"right"}},[s("q-btn",{attrs:{unelevated:"",color:"grey",label:"Disapprove"},on:{click:t.disapprove}}),s("q-btn",{attrs:{unelevated:"",color:"primary",label:"Approve"},on:{click:t.approve}})],1)],1)],1)],1)},r=[],i=s("a34a"),n=s.n(i),o=(s("7514"),s("96cf"),s("c973")),d=s.n(o),p={props:{storeId:String,type:String,orderDetails:Object,depositDetails:Array},data:function(){return{opened:!1,store:{},deposits:[]}},methods:{successPrompt:function(){var t=this;this.$q.dialog({title:"Order Approved!",message:"You have successfully approve an order."}).onOk(function(){t.opened=!1})},disapprovePrompt:function(){var t=this;this.$q.dialog({title:"Order Disapproved!",message:"You have successfully disapprove an order."}).onOk(function(){t.opened=!1})},approve:function(){var t=this;this.$q.dialog({title:"Order Approval",message:"Are you sure you want to approve this order?",cancel:{push:!0,color:"grey",flat:!0}}).onOk(function(){"Store Advertisment"==t.type?t.storeAdvertismentApproval():"Product Advertisment"==t.type?t.productAdvertismentApproval():"Service Advertisment"==t.type?t.serviceAdvertismentApproval():"Product Subscriptions"==t.type?t.productSubscriptionsApproval():"Service Subscriptions"==t.type&&t.serviceSubscriptionsApproval()})},disapprove:function(){var t=this;this.$q.dialog({title:"Order Disapproval",message:"Are you sure you want to disapprove this order?",cancel:{push:!0,color:"grey",flat:!0}}).onOk(function(){t.$q.dialog({title:"Comments for Dissapproval",message:"To inform the Store Owner regarding this disapproved order",prompt:{model:"",type:"text"},cancel:!0,persistent:!0}).onOk(function(e){"Store Advertisment"==t.type?t.storeAdvertismentDisapproval(e):"Product Advertisment"==t.type?t.productAdvertismentDisapproval(e):"Service Advertisment"==t.type?t.serviceAdvertismentDisapproval(e):"Product Subscriptions"==t.type?t.productSubscriptionsDisapproval(e):"Service Subscriptions"==t.type&&t.serviceSubscriptionsDisapproval(e)})})},storeAdvertismentApproval:function(){var t=d()(n.a.mark(function t(){var e,s=this;return n.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return e=null,t.next=3,this.$dbCon.service("store-advertisment").find({query:{store_id:this.storeId}}).then(function(t){var a=t.data[0],r=a.subscriptions[t.data[0].subscriptions.length-1];r.date_paid=new Date,r.status="Paid",r.date_started=new Date,r.date_end=s.$addToDate(new Date,0,r.months),r.deposit_details[r.deposit_details.length-1].date_reviewed=new Date,r.deposit_details[r.deposit_details.length-1].status="Approved",a.subscriptions[t.data[0].subscriptions.length-1]=r,e=t.data[0].subscriptions.length-1,s.$dbCon.service("store-advertisment").patch(a._id,a)});case 3:return t.next=5,this.$dbCon.service("store-payments").create({related_id:e,store_id:this.storeId,amount:this.orderDetails.months*this.orderDetails.total_amount,date_paid:new Date,payment_for:"Store Advertisment",payment_type:"Bank Deposit",payment_details:[]});case 5:this.successPrompt();case 6:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),storeAdvertismentDisapproval:function(){var t=d()(n.a.mark(function t(e){var s=this;return n.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$dbCon.service("store-advertisment").find({query:{store_id:this.storeId}}).then(function(t){var a=t.data[0],r=a.subscriptions[t.data[0].subscriptions.length-1];r.status="Pending",r.deposit_details[r.deposit_details.length-1].date_reviewed=new Date,r.deposit_details[r.deposit_details.length-1].status="Disapproved",r.deposit_details[r.deposit_details.length-1].comments=e,a.subscriptions[t.data[0].subscriptions.length-1]=r,s.$dbCon.service("store-advertisment").patch(a._id,a)});case 2:this.disapprovePrompt();case 3:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),productAdvertismentApproval:function(){var t=d()(n.a.mark(function t(){var e,s=this;return n.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return e=null,t.next=3,this.$dbCon.service("product-advertisment").find({query:{_id:this.orderDetails._id}}).then(function(t){var a=t.data[0],r=a;r.date_paid=new Date,r.status="Paid",r.date_started=new Date,r.date_end=s.$addToDate(new Date,0,r.months),r.deposit_details[r.deposit_details.length-1].date_reviewed=new Date,r.deposit_details[r.deposit_details.length-1].status="Approved",a=r,e=a._id,s.$dbCon.service("product-advertisment").patch(a._id,a)});case 3:return t.next=5,this.$dbCon.service("store-payments").create({related_id:e,store_id:this.storeId,amount:this.orderDetails.months*this.orderDetails.total_amount,date_paid:new Date,payment_for:"Product Advertisment",payment_type:"Bank Deposit",payment_details:[]});case 5:this.successPrompt();case 6:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),productSubscriptionsApproval:function(){var t=d()(n.a.mark(function t(){var e,s=this;return n.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return e=null,t.next=3,this.$dbCon.service("product-subscriptions").find({query:{_id:this.orderDetails._id}}).then(function(t){var a=t.data[0],r=a;r.date_paid=new Date,r.status="Paid",r.date_started=new Date,r.date_end=s.$addToDate(new Date,0,r.months),r.deposit_details[r.deposit_details.length-1].date_reviewed=new Date,r.deposit_details[r.deposit_details.length-1].status="Approved",a=r,e=a._id,s.$dbCon.service("product-subscriptions").patch(a._id,a)});case 3:return t.next=5,this.$dbCon.service("store-payments").create({related_id:e,store_id:this.storeId,amount:this.orderDetails.months*this.orderDetails.total_amount,date_paid:new Date,payment_for:"Product Subscriptions",payment_type:"Bank Deposit",payment_details:[]});case 5:this.successPrompt();case 6:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),productSubscriptionsDisapproval:function(){var t=d()(n.a.mark(function t(e){return n.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:case"end":return t.stop()}},t)}));function e(e){return t.apply(this,arguments)}return e}(),serviceSubscriptionsApproval:function(){var t=d()(n.a.mark(function t(){var e,s=this;return n.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return e=null,t.next=3,this.$dbCon.service("service-subscriptions").find({query:{_id:this.orderDetails._id}}).then(function(t){var a=t.data[0],r=a;r.date_paid=new Date,r.status="Paid",r.date_started=new Date,r.date_end=s.$addToDate(new Date,0,r.months),r.deposit_details[r.deposit_details.length-1].date_reviewed=new Date,r.deposit_details[r.deposit_details.length-1].status="Approved",a=r,e=a._id,s.$dbCon.service("service-subscriptions").patch(a._id,a)});case 3:return t.next=5,this.$dbCon.service("store-payments").create({related_id:e,store_id:this.storeId,amount:this.orderDetails.months*this.orderDetails.total_amount,date_paid:new Date,payment_for:"Service Subscriptions",payment_type:"Bank Deposit",payment_details:[]});case 5:this.successPrompt();case 6:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),serviceSubscriptionsDisapproval:function(){var t=d()(n.a.mark(function t(e){return n.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:case"end":return t.stop()}},t)}));function e(e){return t.apply(this,arguments)}return e}(),productAdvertismentDisapproval:function(){var t=d()(n.a.mark(function t(e){return n.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:case"end":return t.stop()}},t)}));function e(e){return t.apply(this,arguments)}return e}(),serviceAdvertismentApproval:function(){var t=d()(n.a.mark(function t(){var e,s=this;return n.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return e=null,t.next=3,this.$dbCon.service("service-advertisment").find({query:{_id:this.orderDetails._id}}).then(function(t){var a=t.data[0],r=a;r.date_paid=new Date,r.status="Paid",r.date_started=new Date,r.date_end=s.$addToDate(new Date,0,r.months),r.deposit_details[r.deposit_details.length-1].date_reviewed=new Date,r.deposit_details[r.deposit_details.length-1].status="Approved",a=r,e=a._id,s.$dbCon.service("service-advertisment").patch(a._id,a)});case 3:return t.next=5,this.$dbCon.service("store-payments").create({related_id:e,store_id:this.storeId,amount:this.orderDetails.months*this.orderDetails.total_amount,date_paid:new Date,payment_for:"Product Advertisment",payment_type:"Bank Deposit",payment_details:[]});case 5:this.successPrompt();case 6:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()},mounted:function(){var t=this;this.deposits=this.orderDetails.deposit_details,this.deposits.reverse(),this.$dbCon.service("store").find({query:{_id:this.storeId}}).then(function(e){t.store=e.data[0]})}},c=p,u=s("2877"),l=Object(u["a"])(c,a,r,!1,null,null,null);e["a"]=l.exports},bdba:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"q-pa-md"},[s("q-breadcrumbs",[s("q-breadcrumbs-el",{attrs:{icon:"home",to:"/Admin"}}),s("q-breadcrumbs-el",{attrs:{label:"Bank Deposit",icon:"account_balance"}}),s("q-breadcrumbs-el",{attrs:{label:"Product Advertisment",icon:"list"}})],1)],1),s("div",{staticClass:"q-pa-md row"},t._l(t.data,function(e){return s("q-card",{key:e._id,staticClass:"col-xs-12 col-md-3 q-ma-sm"},[s("q-card-section",[s("div",[s("b",[t._v("Date Ordered:")]),t._v("\n          "+t._s(t.$formatDate_DateOnly(e.date_ordered))+"\n        ")]),s("div",[s("b",[t._v("Month/s:")]),t._v("\n          "+t._s(e.months)+"\n        ")]),s("div",[s("b",[t._v("Total Amount:")]),t._v("\n          "+t._s(e.months*e.total_amount)+"\n        ")])]),s("q-card-actions",{attrs:{align:"right"}},[s("Evaluation",{attrs:{storeId:e.store_id,type:"Product Advertisment",orderDetails:e,depositDetails:[]}})],1)],1)}),1)])},r=[],i=(s("7514"),s("abcd")),n={components:{Evaluation:i["a"]},data:function(){return{data:[]}},mounted:function(){var t=this;this.$dbCon.service("product-advertisment").onDataChange(function(){t.$dbCon.service("product-advertisment").find({query:{status:"For Approval"}}).then(function(e){console.log(e),t.data=e.data})})}},o=n,d=s("2877"),p=Object(d["a"])(o,a,r,!1,null,null,null);e["default"]=p.exports}}]);