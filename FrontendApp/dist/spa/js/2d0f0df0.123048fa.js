(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["2d0f0df0"],{"9de4":function(e,a,n){"use strict";n.r(a);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"row"},[a("q-card",{staticClass:"col-xs-6 col-md-3",attrs:{flat:"",bordered:""}},[a("q-card-section",[a("q-icon",{staticClass:"q-mr-md",attrs:{name:"shopping_cart",color:"primary",size:"50px"}}),a("span",{staticClass:"text-h5 text-bold"},[e._v("Shoppers")])],1),a("q-card-section",{staticClass:"q-pt-none text-h4",attrs:{align:"right"}},[e._v(e._s(e.shoppers))])],1),a("q-card",{staticClass:"col-xs-6 col-md-3",attrs:{flat:"",bordered:""}},[a("q-card-section",[a("q-icon",{staticClass:"q-mr-md",attrs:{name:"store",color:"primary",size:"50px"}}),a("span",{staticClass:"text-h5 text-bold"},[e._v("Store")])],1),a("q-card-section",{staticClass:"q-pt-none text-h4",attrs:{align:"right"}},[e._v(e._s(e.store))])],1),a("q-card",{staticClass:"col-xs-6 col-md-3",attrs:{flat:"",bordered:""}},[a("q-card-section",[a("q-icon",{staticClass:"q-mr-md",attrs:{name:"assessment",color:"primary",size:"50px"}}),a("span",{staticClass:"text-h5 text-bold"},[e._v("Transactions")])],1),a("q-card-section",{staticClass:"q-pt-none text-h4",attrs:{align:"right"}},[e._v(e._s(e.transactions))])],1),a("q-card",{staticClass:"col-xs-6 col-md-3",attrs:{flat:"",bordered:""}},[a("q-card-section",[a("q-icon",{staticClass:"q-mr-md",attrs:{name:"find_in_page",color:"primary",size:"50px"}}),a("span",{staticClass:"text-h5 text-bold"},[e._v("Page Views")])],1),a("q-card-section",{staticClass:"q-pt-none text-h4",attrs:{align:"right"}},[e._v("0")])],1)],1),a("div",{staticClass:"q-pt-md"},[a("q-tabs",{staticClass:"bg-primary text-white shadow-2",attrs:{"inline-label":""},model:{value:e.dashboard_tab,callback:function(t){e.dashboard_tab=t},expression:"dashboard_tab"}},[a("q-tab",{attrs:{name:"accounting",icon:"payment",label:"Accounting Dashboard"}}),a("q-tab",{attrs:{name:"marketing",icon:"insert_chart_outlined",label:"Marketing Dashboard"}})],1),"accounting"==e.dashboard_tab?a("AccountingDashboard"):e._e(),"marketing"==e.dashboard_tab?a("MarketingDashboard"):e._e()],1)])},s=[],o=n("a34a"),i=n.n(o),c=(n("7514"),n("96cf"),n("c973")),d=n.n(c),l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"q-pt-md"},[a("q-select",{staticClass:"q-pr-xl q-pl-xl",attrs:{filled:"",options:["Store Statement of Account","Sales Report"],label:"Type of Report"},model:{value:e.type_of_report,callback:function(t){e.type_of_report=t},expression:"type_of_report"}}),"Sales Report"==e.type_of_report?a("SalesReport"):"Store Statement of Account"==e.type_of_report?a("StoreStatementOfAccount"):e._e()],1)},u=[],p=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("Reports",{attrs:{start_date:e.start_date,end_date:e.end_date,header:e.header,data:e.data,generateExcel:"",generatePDF:""}})],1)},_=[],f=n("9ffa"),m={components:{Reports:f["a"]},data:function(){return{header:[{label:"Store Name",align:"left",field:"store_name"},{label:"Gross Sales",field:"gross_sales"},{label:"Account Name",field:"account_name"},{label:"Bank Name",field:"bank_name"},{label:"Account Number",field:"account_number"}],data:[],start_date:"2019/11/15",end_date:"2019/11/30"}},mounted:function(){var e=d()(i.a.mark(function e(){var a,n=this;return i.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$dbCon.service("store").find({query:{$select:["_id","store_name","account_name","bank_name","account_number"]}}).then(function(e){return e.data});case 2:a=e.sent,a.map(function(){var e=d()(i.a.mark(function e(t,r){var s,o,c,l;return i.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return console.log("STORE",t),s=0,e.next=4,n.$dbCon.service("product-transactions").find({query:{store_id:t._id}}).then(function(e){return e.data});case 4:return o=e.sent,e.next=7,n.$dbCon.service("service-transactions").find({query:{store_id:t._id}}).then(function(e){return e.data});case 7:c=e.sent,l=o.concat(c),l.map(function(){var e=d()(i.a.mark(function e(t,o){return i.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,n.$dbCon.service("shopper-payments").find({query:{related_id:t._id}}).then(function(e){s+=e.data[0].total,console.log(s)});case 2:o==l.length-1&&(a[r].gross_sales=s,delete a[r]._id,console.log("HIIII",a[r]),n.data=a);case 3:case"end":return e.stop()}},e)}));return function(t,a){return e.apply(this,arguments)}}());case 10:case"end":return e.stop()}},e)}));return function(t,a){return e.apply(this,arguments)}}()),t;case 5:case"end":return e.stop()}},e,this)}));function a(){return e.apply(this,arguments)}return a}()},h=m,b=n("2877"),v=Object(b["a"])(h,p,_,!1,null,null,null),x=v.exports,y=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"q-pt-md"},[a("q-select",{staticClass:"q-pr-xl q-pl-xl",attrs:{filled:"","use-input":"","input-debounce":"0",label:"Stores",options:e.stores},on:{filter:e.filterFn},scopedSlots:e._u([{key:"no-option",fn:function(){return[a("q-item",[a("q-item-section",{staticClass:"text-grey"},[e._v("No results")])],1)]},proxy:!0}]),model:{value:e.selectedStore,callback:function(t){e.selectedStore=t},expression:"selectedStore"}}),a("Reports",{attrs:{start_date:e.start_date,end_date:e.end_date,header:e.header,data:e.data,generateExcel:"",generatePDF:""}})],1)},q=[],g={components:{Reports:f["a"]},data:function(){return{header:[{label:"Transaction Date",align:"left",field:"transaction_date"},{label:"SKU",field:"SKU"},{label:"Description",field:"description"},{label:"Regular Price",field:"regular_price"},{label:"Sale Price",field:"sale_price"},{label:"Type",field:"type"},{label:"Quantity",field:"quantity"},{label:"Gross Sales",field:"gross_sales"},{label:"MDR",field:"mdr"},{label:"Service Fees",field:"service_fee"},{label:"Net Sales",field:"net_sales"},{label:"Convenience Fee",field:"convenience_fee"},{label:"Revenue",field:"revenue"}],stores:[],stringOptions:[],selectedStore:{},data:[],start_date:"2019/11/15",end_date:"2019/11/30"}},mounted:function(){var e=d()(i.a.mark(function e(){var t=this;return i.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$dbCon.service("store").find({query:{$select:["_id","store_name","account_name","bank_name","account_number"]}}).then(function(e){return e.data.map(function(e){t.stores.push({label:e.store_name,value:e._id,account_name:e.account_name,bank_name:e.bank_name,account_number:e.account_number}),t.stringOptions.push({label:e.store_name,value:e._id,account_name:e.account_name,bank_name:e.bank_name,account_number:e.account_number})}),t.selectedStore=t.stores[0],e.data});case 2:e.sent;case 3:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),methods:{filterFn:function(e,t){var a=this;t(""!==e?function(){var t=e.toLowerCase();a.stores=a.stringOptions.filter(function(e){return JSON.stringify(e).toLowerCase().indexOf(t)>-1})}:function(){a.stores=a.stringOptions})},getData:function(){var e=d()(i.a.mark(function e(){var t=this;return i.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:this.data=[],this.$dbCon.service("report-sales").find({query:{store_id:this.selectedStore.value}}).then(function(e){t.data=e.data,t.data.map(function(e,a){t.data[a].transaction_date=t.$formatDate(t.data[a].transaction_date),delete t.data[0].store_id,delete t.data[a]._id})});case 2:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},watch:{selectedStore:function(){this.getData()}}},S=g,C=Object(b["a"])(S,y,q,!1,null,null,null),w=C.exports,k={components:{SalesReport:x,StoreStatementOfAccount:w},data:function(){return{type_of_report:"Store Statement of Account"}}},$=k,D=Object(b["a"])($,l,u,!1,null,null,null),R=D.exports,O=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"q-pt-md"},[a("q-select",{staticClass:"q-pr-xl q-pl-xl",attrs:{filled:"",options:["Store Ads Subscription","Item Subscription","Storage Subscription","User Access Subscription"],label:"Type of Report"},model:{value:e.type_of_report,callback:function(t){e.type_of_report=t},expression:"type_of_report"}}),"Store Ads Subscription"==e.type_of_report?a("FeaturedStore"):"Store Ads Subscription"!=e.type_of_report?a("RecommendedItems"):e._e()],1)},A=[],E=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"q-pt-md"},[a("Reports",{attrs:{start_date:e.start_date,end_date:e.end_date,header:e.header,data:e.data,generateExcel:"",generatePDF:""}})],1)},P=[],F={components:{Reports:f["a"]},data:function(){return{header:[{label:"Store Name",align:"left",field:"store_name"},{label:"Month/s",field:"months"},{label:"Date Ordered",field:"date_ordered"},{label:"Date Paid",field:"date_paid"},{label:"Date End",field:"date_end"},{label:"Amount",field:"amount"}],data:[],start_date:"2019/11/15",end_date:"2019/11/30"}},mounted:function(){var e=d()(i.a.mark(function e(){var t=this;return i.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:this.$dbCon.service("store-advertisment").find({query:{}}).then(function(e){e.data.map(function(e){e.subscriptions.map(function(a){"Paid"==a.status&&t.$dbCon.service("store").find({query:{_id:e.store_id}}).then(function(e){t.data.push({store_name:e.data[0].store_name||"",months:a.months||"",date_ordered:a.date_ordered||"",date_paid:a.date_paid||"",date_end:a.date_end||"",amount:a.total_amount||""})})})})});case 1:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},I=F,N=Object(b["a"])(I,E,P,!1,null,null,null),j=N.exports,T=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"q-pt-md"},[a("Reports",{attrs:{start_date:e.start_date,end_date:e.end_date,header:e.header,data:e.data,generateExcel:"",generatePDF:""}})],1)},M=[],z={components:{Reports:f["a"]},data:function(){return{header:[{label:"Store Name",align:"left",field:"store_name"},{label:"Item",field:"item"},{label:"Item Type",field:"item_type"},{label:"Month/s",field:"months"},{label:"Date Ordered",field:"date_ordered"},{label:"Date Paid",field:"date_paid"},{label:"Date End",field:"date_end"},{label:"Amount",field:"amount"}],data:[],start_date:"2019/11/15",end_date:"2019/11/30"}},mounted:function(){var e=d()(i.a.mark(function e(){var t,a,n=this;return i.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$dbCon.service("product-advertisment").find({query:{status:"Paid",$select:["store_id","related_id","date_ordered","date_paid","date_end","months","total_amount"]}}).then(function(e){return e.data});case 2:return t=e.sent,t.map(function(e,a){n.$dbCon.service("store").find({query:{_id:e.store_id}}).then(function(){var e=d()(i.a.mark(function e(n){return i.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:t[a].store_name=n.data[0].store_name||"";case 1:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),n.$dbCon.service("products").find({query:{_id:e.related_id}}).then(function(e){t[a].item=e.data[0].product_name||"",t[a].item_type="Product",t[a].amount=t[a].total_amount||"",delete t[a].store_id,delete t[a].related_id})}),e.next=6,this.$dbCon.service("service-advertisment").find({query:{status:"Paid",$select:["store_id","related_id","date_ordered","date_paid","date_end","months","total_amount"]}}).then(function(e){return e.data});case 6:a=e.sent,a.map(function(){var e=d()(i.a.mark(function e(r,s){return i.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,n.$dbCon.service("store").find({query:{_id:r.store_id}}).then(function(){var e=d()(i.a.mark(function e(t){return i.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:a[s].store_name=t.data[0].store_name||"";case 1:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}());case 2:return e.next=4,n.$dbCon.service("services").find({query:{_id:r.related_id}}).then(function(e){a[s].item=e.data[0].service_name||"",a[s].item_type="Service",a[s].amount=a[s].total_amount||"",delete a[s].store_id,delete a[s].related_id});case 4:s==a.length-1&&(n.data=t.concat(a));case 5:case"end":return e.stop()}},e)}));return function(t,a){return e.apply(this,arguments)}}());case 8:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},J=z,U=Object(b["a"])(J,T,M,!1,null,null,null),G=U.exports,K={components:{FeaturedStore:j,RecommendedItems:G},data:function(){return{type_of_report:"Store Ads Subscription"}}},L=K,B=Object(b["a"])(L,O,A,!1,null,null,null),H=B.exports,Q={components:{AccountingDashboard:R,MarketingDashboard:H},data:function(){return{shoppers:0,store:0,transactions:0,dashboard_tab:"accounting"}},mounted:function(){var e=d()(i.a.mark(function e(){return i.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$dbCon.service("users").find({query:{system_user_type:"Shopper"}}).then(function(e){return e.total});case 2:return this.shoppers=e.sent,e.next=5,this.$dbCon.service("store").find({}).then(function(e){return e.total});case 5:return this.store=e.sent,e.t0=this.transactions,e.next=9,this.$dbCon.service("product-transactions").find({}).then(function(e){return e.total});case 9:return this.transactions=e.t0+=e.sent,e.t1=this.transactions,e.next=13,this.$dbCon.service("service-transactions").find({}).then(function(e){return e.total});case 13:this.transactions=e.t1+=e.sent;case 14:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},V=Q,W=Object(b["a"])(V,r,s,!1,null,null,null);a["default"]=W.exports}}]);