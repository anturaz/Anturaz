(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["2d0e2191"],{"7cf5":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"q-pa-md "},[a("q-breadcrumbs",[a("q-breadcrumbs-el",{attrs:{icon:"home",to:"/Admin"}}),a("q-breadcrumbs-el",{attrs:{label:"Maintenance",icon:"widgets"}}),a("q-breadcrumbs-el",{attrs:{label:"Social Media",icon:"share"}})],1)],1),a("div",{staticClass:"q-pa-md"},[a("q-list",{staticClass:"bg-white",attrs:{bordered:"",separator:""}},[a("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],attrs:{clickable:""}},[a("q-item-section",[e._v("General Sharing Feature")]),a("q-item-section",{attrs:{side:""}},[a("q-toggle",{attrs:{value:e.general_sharing_feature,color:"primary"},nativeOn:{click:function(t){return e.changeGeneralSharingFeature()}}})],1)],1)],1),a("br"),1==e.general_sharing_feature?a("PerStoreSharingFeature"):e._e()],1)])},r=[],i=(a("7514"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("q-table",{attrs:{dense:e.$q.screen.lt.md,data:e.data,columns:e.columns,filter:e.filter,"row-key":"name"},scopedSlots:e._u([0!=e.selected.length?{key:"top-left",fn:function(){return[a("q-btn",{attrs:{label:"Enable",color:"primary",disable:0==e.selected.length},on:{click:e.enable_selected}}),e._v(" \n      "),a("q-btn",{attrs:{label:"Disable",disable:0==e.selected.length,color:"grey",outline:""},on:{click:e.disable_selected}})]},proxy:!0}:null,{key:"top-right",fn:function(){return[a("q-input",{attrs:{borderless:"",dense:"",debounce:"300",placeholder:"Search"},scopedSlots:e._u([{key:"append",fn:function(){return[a("q-icon",{attrs:{name:"search"}})]},proxy:!0}]),model:{value:e.filter,callback:function(t){e.filter=t},expression:"filter"}})]},proxy:!0},{key:"body",fn:function(t){return a("q-tr",{attrs:{props:t}},[a("q-td",{key:"check_box",attrs:{props:t}},[a("q-checkbox",{attrs:{value:e.selected.includes(t.row._id)},nativeOn:{click:function(a){return e.selection(t.row._id)}}})],1),a("q-td",{key:"shop_name",attrs:{props:t}},[e._v(e._s(t.row.shop_name))]),a("q-td",{key:"email",attrs:{props:t}},[e._v(e._s(t.row.email))]),a("q-td",{key:"categories_market_areas",attrs:{props:t}},[a("ViewStore",{attrs:{store:t.row}})],1),a("q-td",{key:"sharing_feature",attrs:{props:t}},[a("q-toggle",{attrs:{value:t.row.sharing_feature,color:"primary"},nativeOn:{click:function(a){return e.changeSharingFeature(t.row)}}}),a("font",{attrs:{color:"grey"}},[e._v(e._s((t.row.sharing_feature+"").toUpperCase()))])],1)],1)}}],null,!0)})],1)}),s=[],l=(a("ac6a"),a("20d6"),a("6762"),a("2fdb"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("q-btn",{attrs:{dense:"",flat:"",color:"primary",icon:"remove_red_eye"},on:{click:function(t){e.opened=!0}}}),a("q-dialog",{attrs:{persistent:""},model:{value:e.opened,callback:function(t){e.opened=t},expression:"opened"}},[a("q-card",{staticStyle:{width:"600px"}},[a("q-card-section",{staticClass:"bg-primary"},[a("div",{staticClass:"text-h6 text-white"},[e._v(e._s(e.store.shop_name))]),a("div",{staticClass:"text-h7 text-white"},[e._v(e._s(e.store.email))])]),a("q-separator"),a("q-card-section",[a("q-field",{attrs:{outlined:"",color:"black",label:"Categories","stack-label":""},scopedSlots:e._u([{key:"control",fn:function(){return[a("ol",e._l(e.store.categories,function(t,n){return a("li",{key:n},[e._v(e._s(t))])}),0)]},proxy:!0}])}),a("br"),a("q-field",{attrs:{outlined:"",color:"black",label:"Market Areas","stack-label":""},scopedSlots:e._u([{key:"control",fn:function(){return[a("ol",e._l(e.store.market_areas,function(t,n){return a("li",{key:n},[e._v(e._s(t))])}),0)]},proxy:!0}])})],1),a("q-separator"),a("q-card-actions",{attrs:{align:"right"}},[a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"Close",color:"primary"}})],1)],1)],1)],1)}),o=[],c={props:["store"],data:function(){return{opened:!1}}},u=c,d=a("2877"),h=Object(d["a"])(u,l,o,!1,null,null,null),f=h.exports,p={components:{ViewStore:f},data:function(){return{selected:[],filter:"",columns:[{name:"check_box",label:"",align:"center"},{name:"shop_name",label:"Store Name",field:"shop_name",align:"center"},{name:"email",label:"Email",field:"email",align:"center"},{name:"categories_market_areas",label:"Categories/Market Areas",align:"center"},{name:"sharing_feature",label:"Sharing Feature",field:"sharing_feature",align:"center"}],data:[]}},methods:{selection:function(e){if(this.selected.includes(e)){var t=this.selected.findIndex(function(t){return t==e});this.selected.splice(t,1)}else this.selected.push(e)},enable_selected:function(){var e=this;this.$q.dialog({title:"Confirmation",message:"Do you want to Enable all selected?",cancel:{push:!0,color:"grey",flat:!0}}).onOk(function(){e.selected.forEach(function(t){e.$dbCon.service("shop").patch(t,{sharing_feature:!0}),e.selected=[]})})},disable_selected:function(){var e=this;this.$q.dialog({title:"Confirmation",message:"Do you want to Disable all selected?",cancel:{push:!0,color:"grey",flat:!0}}).onOk(function(){e.selected.forEach(function(t){e.$dbCon.service("shop").patch(t,{sharing_feature:!1}),e.selected=[]})})},getData:function(){var e=this;this.$dbCon.service("shop").find({}).then(function(t){e.data=t.data})},changeSharingFeature:function(e){var t=this;this.$q.dialog({title:"Confirm",message:"Would you like to enable/disable this Store's Sharing Feature?",cancel:{push:!0,color:"grey",flat:!0},persistent:!0}).onOk(function(){var a=_.cloneDeep(e);a.sharing_feature=1!=a.sharing_feature,t.$dbCon.service("shop").update(e._id,a)})}},mounted:function(){var e=this;this.$dbCon.service("shop").onDataChange(function(){e.getData()})}},g=p,m=Object(d["a"])(g,i,s,!1,null,null,null),b=m.exports,v={components:{PerStoreSharingFeature:b},data:function(){return{general_sharing_feature:null,id:null}},methods:{getData:function(){var e=this;this.$dbCon.service("social-media-management").find({}).then(function(t){e.general_sharing_feature=t.data[0].general_sharing_feature,e.id=t.data[0]._id})},changeGeneralSharingFeature:function(){var e=this;this.$q.dialog({title:"Confirm",message:"Would you like to enable/disable the Sharing Feature?",cancel:{push:!0,color:"grey",flat:!0},persistent:!0}).onOk(function(){e.$dbCon.service("social-media-management").update(e.id,{general_sharing_feature:1!=e.general_sharing_feature})})}},mounted:function(){var e=this;this.$dbCon.service("social-media-management").onDataChange(function(){e.getData()})}},k=v,q=Object(d["a"])(k,n,r,!1,null,null,null);t["default"]=q.exports}}]);