(function(){mstrmojo.requiresCls("mstrmojo.Editor");mstrmojo.requiresDescs(373,12460,12856,12857,12858,12859);var DATABASE_IMPORT_DIALOG_ID="databaseImportDialog";var DIConstants=mstrmojo.DI.DIConstants;mstrmojo.DI.DIDatabaseImportOption=mstrmojo.declare(mstrmojo.Editor,null,{scriptClass:"mstrmojo.Editor",id:DATABASE_IMPORT_DIALOG_ID,showTitle:false,cssClass:"mstrmojo-di-database-import",zIndex:999,positionDialog:function positionDialog(){var pos=mstrmojo.dom.position(this.domSrc,true);this.editorNode.style.left=Math.round(pos.x)+"px";this.editorNode.style.top=Math.round(pos.y+pos.h)+"px";},children:[{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-di-table-sources-icons",iconClass:"Database"},{scriptClass:"mstrmojo.Label",text:mstrmojo.desc(12856,"Import from Database"),cssClass:"mstrmojo-di-database-import-title"},{scriptClass:"mstrmojo.Button",text:mstrmojo.desc(12857,"Individual Tables"),cssClass:"mstrmojo-di-table-sources-icons",iconClass:"Database1",onclick:function(){this.parent.set("visible",false);mstrApp.getRootController().showPage(DIConstants.pageType.database,{sourceType:DIConstants.sourceType.querybuilder,name:"Database",step2:mstrmojo.desc(12460,"Select one or more tables"),type:DIConstants.xdaType.qbSingleTable});}},{scriptClass:"mstrmojo.Button",text:mstrmojo.desc(12858,"Build a Query using Multiple Tables"),cssClass:"mstrmojo-di-table-sources-icons",iconClass:"Database2",onclick:function(){this.parent.set("visible",false);mstrApp.getRootController().showPage(DIConstants.pageType.database,{sourceType:DIConstants.sourceType.querybuilder,name:"Database",step2:mstrmojo.desc(12460,"Select one or more tables"),type:DIConstants.xdaType.querybuilder});}},{scriptClass:"mstrmojo.Button",text:mstrmojo.desc(12859,"Type your own Query script"),cssClass:"mstrmojo-di-table-sources-icons",iconClass:"Database3",onclick:function(){this.parent.set("visible",false);mstrApp.getRootController().showPage(DIConstants.pageType.database,{sourceType:DIConstants.sourceType.querybuilder,name:"Database",step2:mstrmojo.desc(12460,"Select one or more tables"),type:DIConstants.xdaType.ffsql});}},{scriptClass:"mstrmojo.Button",alias:"closeBtn",text:mstrmojo.desc(373,"Back"),innerIconClass:"mstrmojo-di-ts-close-btn",onclick:function(){if(this.parent.onPreClose()){this.parent.close();}}}]});}());