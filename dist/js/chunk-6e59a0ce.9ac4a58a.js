(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6e59a0ce"],{"33a6":function(t,e,a){},c0a4:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-layout",{staticClass:"nvmanage-image",attrs:{row:"",wrap:""}},[a("div",{staticClass:"page-toolbar"},[a("a-upload",{attrs:{name:"file",multiple:!0,action:"/newview/manage/uploadCarousel"},on:{change:t.uploadImages}},[a("a-button",[a("a-icon",{attrs:{type:"upload"}}),t._v(" Click to Upload\n      ")],1)],1)],1),a("a-table",{attrs:{columns:t.columns,dataSource:t.carousels,bordered:""},scopedSlots:t._u([{key:"filePath",fn:function(e){return[a("v-img",{staticStyle:{cursor:"pointer"},attrs:{src:e.filePath,"lazy-src":e.smFilePath,width:144,height:81},on:{click:function(a){t.previewImage(e.filePath)}}})]}},{key:"imageTitle",fn:function(e){return[a("editable-cell",{attrs:{text:e.title},on:{change:function(a){t.onCellChange(e._id,a)}}})]}},{key:"action",fn:function(e){return a("span",{staticClass:"table-action"},[a("a-upload",{attrs:{name:"file",action:"/newview/manage/reuploadCarousel",data:{id:e._id}},on:{change:function(a){t.reuploadImage(e,a)}}},[a("a-tooltip",{attrs:{placement:"top",title:"重新上传图片"}},[a("a-icon",{attrs:{type:"upload"}})],1)],1),a("a-divider",{attrs:{type:"vertical"}}),a("a-tooltip",{attrs:{placement:"top",title:"删除记录"}},[a("a-icon",{attrs:{type:"delete"},on:{click:function(a){t.removeRecord(e)}}})],1)],1)}}])}),a("v-dialog",{attrs:{scrollable:"","content-class":"image-pre-dialog"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[a("v-img",{attrs:{src:t.previewSrc,contain:""},on:{click:function(e){t.dialog=!1}}})],1)],1)},r=[],i=(a("96cf"),a("1da1")),o=(a("cadf"),a("551c"),a("097d"),a("3640")),c=[{title:"Image",scopedSlots:{customRender:"filePath"}},{title:"Action",width:"300px",scopedSlots:{customRender:"action"}}],s={data:function(){return{carousels:[],columns:c,dialog:!1,previewSrc:""}},methods:{init:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,o["a"].get("/manage/fetchCarousel");case 2:this.carousels=t.sent;case 3:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),previewImage:function(t){this.previewSrc=t,this.dialog=!0},uploadImages:function(t){var e=t.file,a=t.file.status;if("done"===a){var n=e.response,r=n.code,i=n.msg;"0"===r?this.$message.success("上传成功"):this.$message.error(i),this.init()}else"error"===a&&this.$message.error("上传失败")},reuploadImage:function(t,e){var a=e.file,n=e.file.status;if("done"===n){var r=a.response,i=r.code,o=r.msg;"0"===i?this.$message.success("修改成功"):this.$message.error(o),this.init()}else"error"===n&&this.$message.error("修改失败")},removeRecord:function(t){var e=this;this.$confirm({title:"删除照片",content:"是否确定要删除？",okText:"删除",okType:"danger",cancelText:"取消",onOk:function(){var a=Object(i["a"])(regeneratorRuntime.mark(function a(){return regeneratorRuntime.wrap(function(a){while(1)switch(a.prev=a.next){case 0:return a.abrupt("return",new Promise(function(){var a=Object(i["a"])(regeneratorRuntime.mark(function a(n,r){return regeneratorRuntime.wrap(function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,o["a"].post("/manage/removeCarousel",{id:t._id});case 2:e.$message.success("删除成功"),e.carousels.splice(e.carousels.indexOf(t),1),n();case 5:case"end":return a.stop()}},a,this)}));return function(t,e){return a.apply(this,arguments)}}()));case 1:case"end":return a.stop()}},a,this)}));function n(){return a.apply(this,arguments)}return n}()})}},mounted:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:this.init();case 1:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()},u=s,l=(a("f2b1"),a("2877")),p=a("6544"),d=a.n(p),m=a("169a"),h=a("adda"),g=a("a722"),f=Object(l["a"])(u,n,r,!1,null,null,null);f.options.__file="Carousel.vue";e["default"]=f.exports;d()(f,{VDialog:m["a"],VImg:h["a"],VLayout:g["a"]})},f2b1:function(t,e,a){"use strict";var n=a("33a6"),r=a.n(n);r.a}}]);
//# sourceMappingURL=chunk-6e59a0ce.9ac4a58a.js.map