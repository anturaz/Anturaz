(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["7b3f8d91"],{2309:function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"q-pa-lg"},[a("p",{staticClass:"text-h5 text-center text-bold"},[t._v("Recommended Products")]),a("div",{staticStyle:{height:"330px"}},[a("q-scroll-area",{staticStyle:{height:"100%",width:"100%"},attrs:{horizontal:""}},[a("div",{staticClass:"row no-wrap"},t._l(t.data,function(e,r){return a("q-card",{key:e._id,staticClass:"q-ma-sm",staticStyle:{cursor:"pointer"},style:"border-color:"+(t.currentItem==r?t.$primaryColor:"white"),attrs:{bordered:"",square:""},on:{mouseover:function(e){t.currentItem=r},mouseleave:function(e){t.currentItem="none"},click:function(a){return t.$router.replace({path:"/ProductDetails/"+e._id})}}},[""!=e.sale_price?a("q-card",{staticClass:"bg-primary text-white text-bold text-center absolute",staticStyle:{width:"80px",height:"40px","z-index":"1"},attrs:{square:"",flat:""}},[a("p",{staticClass:"q-pa-xs q-mt-xs"},[t._v(t._s(((e.regular_price-e.sale_price)/e.regular_price*100).toFixed(0))+"% OFF")])]):t._e(),a("q-card-section",{staticStyle:{height:"180px",width:"200px"}},[a("q-img",{attrs:{ratio:1,src:e.photos[0]}})],1),a("q-card-section",{staticStyle:{height:"75px",width:"200px"},attrs:{align:"center"}},[a("br"),"product_name"in e?a("div",{staticClass:"text-subtitle1"},[t._v("\n              "+t._s(e.product_name)+"\n            ")]):t._e(),"service_name"in e?a("div",{staticClass:"text-title text-bold"},[t._v("\n              "+t._s(e.service_name)+"\n            ")]):t._e(),a("div",[""!=e.sale_price?a("font",{staticClass:"text-grey q-pr-sm"},[a("strike",[t._v(t._s(t.$prettyMoney(e.regular_price)))])],1):t._e(),a("font",{staticClass:"text-bold text-primary"},[t._v(t._s(""!=e.sale_price?t.$prettyMoney(e.sale_price):t.$prettyMoney(e.regular_price)))])],1)]),a("q-card-section",{staticStyle:{height:"55px",width:"200px"}},[a("transition",{attrs:{appear:"","enter-active-class":"animated slideInUp","leave-active-class":"animated fadeOut"}},["product_name"in e&&t.currentItem==r?a("q-btn",{staticClass:"full-width",attrs:{color:"primary",label:"View >",unelevated:""},on:{click:function(a){return t.$router.replace({path:"/ProductDetails/"+e._id})}}}):t._e()],1),"service_name"in e?a("q-btn",{attrs:{color:"primary",label:"Views >",unelevated:""},on:{click:function(a){return t.$router.replace({path:"/ServiceDetails/"+e._id})}}}):t._e()],1)],1)}),1)])],1)])},i=[],s=a("a34a"),n=a.n(s),c=(a("ac6a"),a("7514"),a("96cf"),a("c973")),l=a.n(c),o={data:function(){return{data:[],currentItem:"none"}},mounted:function(){var t=l()(n.a.mark(function t(){var e=this;return n.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$dbCon.service("product-advertisment").find({query:{$select:["related_id"],date_end:{$gte:new Date}}}).then(function(t){var e=[];return t.data.forEach(function(t){e.push(t.related_id)}),e});case 2:return t.sent,t.next=5,this.$dbCon.service("products").find({query:{}}).then(function(t){e.data=t.data});case 5:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()},d=o,u=a("2877"),p=Object(u["a"])(d,r,i,!1,null,null,null);e["a"]=p.exports},"298d":function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"q-pa-lg"},[a("p",{staticClass:"text-h5 text-center text-bold"},[t._v("Recommended Services")]),a("div",{staticStyle:{height:"330px"}},[a("q-scroll-area",{staticStyle:{height:"100%",width:"100%"},attrs:{horizontal:""}},[a("div",{staticClass:"row no-wrap"},t._l(t.data,function(e,r){return a("q-card",{key:e._id,staticClass:"q-ma-sm",staticStyle:{cursor:"pointer"},style:"border-color:"+(t.currentItem==r?t.$primaryColor:"white"),attrs:{bordered:"",square:""},on:{mouseover:function(e){t.currentItem=r},mouseleave:function(e){t.currentItem="none"},click:function(a){return t.$router.replace({path:"/ServiceDetails/"+e._id})}}},[""!=e.sale_price?a("q-card",{staticClass:"bg-primary text-white text-bold text-center absolute",staticStyle:{width:"80px",height:"40px","z-index":"1"},attrs:{square:"",flat:""}},[a("p",{staticClass:"q-pa-xs q-mt-xs"},[t._v("\n              "+t._s(((e.regular_price-e.sale_price)/e.regular_price*100).toFixed(0))+"% OFF\n            ")])]):t._e(),a("q-card-section",{staticStyle:{height:"180px",width:"200px"}},[a("q-img",{attrs:{ratio:1,src:e.photos[0]}})],1),a("q-card-section",{staticStyle:{height:"75px",width:"200px"},attrs:{align:"center"}},[a("br"),"service_name"in e?a("div",{staticClass:"text-subtitle1"},[t._v("\n              "+t._s(e.service_name)+"\n            ")]):t._e(),a("div",[""!=e.sale_price?a("font",{staticClass:"text-grey q-pr-sm"},[a("strike",[t._v(t._s(t.$prettyMoney(e.regular_price)))])],1):t._e(),a("font",{staticClass:"text-bold text-primary"},[t._v(t._s(""!=e.sale_price?t.$prettyMoney(e.sale_price):t.$prettyMoney(e.regular_price)))])],1)]),a("q-card-section",{staticStyle:{height:"55px",width:"200px"}},[a("transition",{attrs:{appear:"","enter-active-class":"animated slideInUp","leave-active-class":"animated fadeOut"}},["service_name"in e&&t.currentItem==r?a("q-btn",{staticClass:"full-width",attrs:{color:"primary",label:"View >",unelevated:""},on:{click:function(a){return t.$router.replace({path:"/ServiceDetails/"+e._id})}}}):t._e()],1)],1)],1)}),1)])],1)])},i=[],s=a("a34a"),n=a.n(s),c=(a("ac6a"),a("7514"),a("96cf"),a("c973")),l=a.n(c),o={data:function(){return{data:[],currentItem:"none"}},mounted:function(){var t=l()(n.a.mark(function t(){var e=this;return n.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$dbCon.service("service-advertisment").find({query:{$select:["related_id"],date_end:{$gte:new Date}}}).then(function(t){var e=[];return t.data.forEach(function(t){e.push(t.related_id)}),e});case 2:return t.sent,t.next=5,this.$dbCon.service("services").find({query:{}}).then(function(t){e.data=t.data});case 5:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()},d=o,u=a("2877"),p=Object(u["a"])(d,r,i,!1,null,null,null);e["a"]=p.exports},a531:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",[t.$q.screen.lt.md?t._e():a("FeaturedPhotosSection"),a("CategoriesSection",{style:t.$q.screen.lt.md?"":"position: absolute; left:100px; top: 280px; max-width:510px"}),a("FeaturedStoresSection"),a("RecommendedServices"),a("RecommendedProducts")],1)])},i=[],s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"q-pa-lg"},[a("q-carousel",{attrs:{height:"600px",animated:"",arrows:"",navigation:"",infinite:""},model:{value:t.slide,callback:function(e){t.slide=e},expression:"slide"}},t._l(t.data,function(t,e){return a("q-carousel-slide",{key:e,attrs:{name:e+1,"img-src":t.path}})}),1)],1)},n=[],c=(a("7514"),{data:function(){return{slide:1,data:[]}},mounted:function(){var t=this;this.$dbCon.service("featured-photos").find({}).then(function(e){t.data=e.data})}}),l=c,o=a("2877"),d=Object(o["a"])(l,s,n,!1,null,null,null),u=d.exports,p=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"q-pa-lg"},[t.$q.screen.lt.md?a("div",{staticClass:"q-gutter-sm q-pb-sm"},[a("q-input",{attrs:{outlined:"",dense:"",placeholder:"What are you looking for?"}}),a("q-input",{attrs:{outlined:"",dense:"",placeholder:"Location"}}),a("div",{attrs:{align:"right"}},[a("q-btn",{attrs:{unelevated:"",color:"primary",label:"Search",icon:"search"}})],1)],1):t._e(),a("q-card",{staticStyle:{border:"1px solid primary","background-color":"rgb(255,255,255,0.7)"},attrs:{bordered:"",square:"",flat:"",align:"center"}},[a("q-card-section",[a("b",{staticClass:"text-primary"},[t._v("CATEGORIES")])]),a("q-card-section",{staticClass:"row"},t._l(t.data,function(e,r){return r<9?a("q-list",{key:e._id,staticClass:"col-12 q-ma-sm rounded-borders",class:r%2==0?"bg-primary":"bg-grey",style:t.$q.screen.lt.md?"":"min-width:120px;max-width:120px;min-height:50px",attrs:{bordered:"",separator:""}},[a("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],attrs:{clickable:""}},[a("q-item-section",[a("q-item-label",{staticClass:"text-white",attrs:{caption:"",lines:"2",align:"center"}},[t._v(t._s(e.category_name))])],1)],1)],1):t._e()}),1)],1)],1)},h=[],m={data:function(){return{data:[]}},mounted:function(){var t=this;this.$dbCon.service("categories").find({}).then(function(e){t.data=e.data})}},_=m,v=Object(o["a"])(_,p,h,!1,null,null,null),f=v.exports,x=function(){var t=this,e=t.$createElement,a=t._self._c||e;return 0!=t.data.length?a("div",{staticClass:"q-pa-lg"},[a("q-card",{staticClass:"bg-primary text-white",attrs:{flat:""}},[a("q-card-section",{staticClass:"row"},[a("div",{staticClass:"col-2"},[a("p",{staticClass:"text-h5"},[t._v("Featured Stores")]),a("p",{staticClass:"text-title"},[t._v("Check out our most popular stores!")]),a("q-btn",{staticClass:"text-primary bg-white",attrs:{label:"Shop Now"}})],1),a("div",{staticClass:"col-10 q-pl-md text-black",staticStyle:{height:"330px"}},[a("q-scroll-area",{staticClass:"bg-grey-1",staticStyle:{height:"100%",width:"100%"},attrs:{horizontal:""}},[a("div",{staticClass:"row no-wrap"},t._l(t.data,function(e){return a("q-card",{key:e._id,staticClass:"q-ma-sm",attrs:{flat:"",bordered:""}},[a("q-card-section",{staticStyle:{height:"220px",width:"200px"}},[""==e.logo?a("q-icon",{attrs:{name:"store",color:"primary",size:"170px"}}):t._e()],1),a("q-card-section",{staticClass:"text-bold",staticStyle:{height:"35px",width:"200px"}},[t._v(t._s(e.store_name))]),a("q-card-section",{staticStyle:{height:"55px",width:"200px"},attrs:{align:"right"}},[a("q-btn",{attrs:{color:"primary",label:"View >",unelevated:""},on:{click:function(a){return t.$router.push("/store/"+e.unique_link)}}})],1)],1)}),1)])],1)])],1)],1):t._e()},q=[],y=a("a34a"),b=a.n(y),g=(a("ac6a"),a("96cf"),a("c973")),w=a.n(g),C={data:function(){return{slide:"1",data:[]}},mounted:function(){var t=w()(b.a.mark(function t(){var e,a=this;return b.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$dbCon.service("store-advertisment").find({query:{$select:["store_id"],"subscriptions.date_end":{$gte:new Date}}}).then(function(t){var e=[];return t.data.forEach(function(t){console.log("IDD",t),e.push(t.store_id)}),e});case 2:return e=t.sent,t.next=5,this.$dbCon.service("store").find({query:{_id:{$in:e}}}).then(function(t){a.data=t.data});case 5:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()},$=C,S=Object(o["a"])($,x,q,!1,null,null,null),k=S.exports,I=a("298d"),E=a("2309"),F={components:{FeaturedPhotosSection:u,CategoriesSection:f,FeaturedStoresSection:k,RecommendedServices:I["a"],RecommendedProducts:E["a"]}},O=F,D=Object(o["a"])(O,r,i,!1,null,null,null);e["default"]=D.exports}}]);