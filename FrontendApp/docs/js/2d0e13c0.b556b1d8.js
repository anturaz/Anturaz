(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["2d0e13c0"],{"7a22":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"q-pa-md"},[n("q-breadcrumbs",[n("q-breadcrumbs-el",{attrs:{icon:"home",to:"/Admin"}}),n("q-breadcrumbs-el",{attrs:{label:"Maintenance",icon:"widgets"}}),n("q-breadcrumbs-el",{attrs:{label:"Shopper",icon:"shopping_cart"}})],1)],1),n("q-table",{attrs:{data:e.data,columns:e.columns,filter:e.filter,"row-key":"name"},scopedSlots:e._u([{key:"top-right",fn:function(){return[n("q-input",{attrs:{borderless:"",dense:"",debounce:"300",placeholder:"Search"},scopedSlots:e._u([{key:"append",fn:function(){return[n("q-icon",{attrs:{name:"search"}})]},proxy:!0}]),model:{value:e.filter,callback:function(t){e.filter=t},expression:"filter"}})]},proxy:!0},{key:"body",fn:function(t){return n("q-tr",{attrs:{props:t}},[n("q-td",{key:"name",attrs:{props:t}},[e._v(e._s(t.row.fname+" "+t.row.lname))]),n("q-td",{key:"email",attrs:{props:t}},[e._v(e._s(t.row.email))]),n("q-td",{key:"mobile_number",attrs:{props:t}},[e._v(e._s(t.row.mobile_number))]),n("q-td",{key:"gender",attrs:{props:t}},[e._v(e._s(t.row.gender))]),n("q-td",{key:"status",attrs:{props:t}},[n("q-toggle",{attrs:{value:t.row.access,color:"primary"},on:{input:function(n){return e.changeStatus(t.row.access,t.row._id,t.row)}}})],1)],1)}}])})],1)},r=[],s=(n("7514"),{data:function(){return{data:[],columns:[{name:"name",label:"Name",field:"name",align:"center"},{name:"email",label:"Email Address",field:"email",align:"center"},{name:"mobile_number",label:"Mobile Number",field:"mobile_number",align:"center"},{name:"gender",label:"Gender",field:"gender",align:"center"},{name:"status",label:"Status",field:"status",align:"center"}]}},mounted:function(){var e=this;this.$dbCon.services.users.onDataChange(function(){e.getData()})},methods:{changeStatus:function(e,t,n){var a=this;this.$q.dialog({title:"Confirmation",message:"Are you sure you want to Turn "+(1==e?"Off":"On")+" the access of this shopper?",cancel:!0,persistent:!0}).onOk(function(){n.access=!e,a.$dbCon.service("users").patch(t,n).then(function(){a.$q.dialog({title:"Success",message:"Accessibility of this user is updated!",cancel:!1,persistent:!0})})})},getData:function(){var e=this;this.$dbCon.service("users").find({query:{system_user_type:"Shopper"}}).then(function(t){e.data=t.data})}}}),o=s,i=n("2877"),l=Object(i["a"])(o,a,r,!1,null,null,null);t["default"]=l.exports}}]);