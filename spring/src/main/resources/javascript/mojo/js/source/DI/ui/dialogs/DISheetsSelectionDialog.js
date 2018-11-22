(function(){mstrmojo.requiresCls("mstrmojo.Label","mstrmojo.WidgetList","mstrmojo.HBox","mstrmojo.VBox","mstrmojo.ui.CheckList","mstrmojo.RadioList","mstrmojo.StackContainer","mstrmojo.Editor");mstrmojo.requiresDescs(373,547,12724,12909);var $ARR=mstrmojo.array,$HASH=mstrmojo.hash,HELPER=mstrmojo.DI.DIHelpers;mstrmojo.DI.ui.dialogs.DISheetsSelectionDialog=mstrmojo.declare(mstrmojo.Editor,null,{scriptClass:"mstrmojo.DI.ui.dialogs.DISheetsSelectionDialog",cssClass:"mstrmojo-di-sheets-selection-dialog",title:mstrmojo.desc(12724,"Select Worksheets"),items:null,onBack:mstrmojo.func.emptyFn,onOK:function(){this.close();},noButtonCls:true,children:[{scriptClass:"mstrmojo.HBox",cssClass:"mstrmojo-di-ssd-file-content",alias:"filesAndSheets",children:[{scriptClass:"mstrmojo.VBox",alias:"leftPanel",cssClass:"mstrmojo-di-ssd-left-panel",children:[{scriptClass:"mstrmojo.WidgetList",alias:"fileList",cssClass:"mstrmojo-di-ssd-file-list",selectedIndex:0,itemFunction:function(item,idx,list){var name=HELPER.truncate(item.n,30);var iw=new mstrmojo.Button({text:name,title:item.n,sheets:item.sheets,widget:list,onclick:function(){list.updateSheetsList(item,false);}});return iw;},bindings:{items:"this.parent.parent.parent.items"},onitemsChange:function(){if(this.items&&this.items.length>0){this.set("selectedIndex",0);this.updateSheetsList(this.items[0],true);}},updateSheetsList:function(item,isItemChanged){var sheetsSelectionDialog=this.parent.parent.parent;var rightPanel=this.parent.parent.rightPanel;var sheetsStack=rightPanel.sheets;var sheetsWidget,i;if(!item.sheets||item.sheets.length<=0){sheetsStack.set("selected",null);rightPanel.fileName.set("text",mstrmojo.desc(12909,"There are no sheets in this file."));return ;}if(sheetsStack.children){for(i=0;i<sheetsStack.children.length;i++){if(sheetsStack.children[i].id===item.id){sheetsWidget=sheetsStack.children[i];}}}if(!sheetsWidget){sheetsWidget=sheetsStack.addChildren([mstrmojo.insert({scriptClass:"mstrmojo.ui.CheckList",cssClass:"mstrmojo-di-ssd-sheets-list",alias:"list",items:item.sheets,list:item.sheets,id:item.id,multiSelect:item.multiSelection,sheetsSelectionDialog:sheetsSelectionDialog,selectedIndex:item.defaultSheetsIndex||0,getItemMarkup:function getItemMarkup(){return'<{@tag} class="item {@cls}" idx="{@idx}" style="{@style}" title="{@n}"><span>{@en@n}</span></{@tag}>';},postBuildRendering:function(){if(this._super){this._super();}this.onchange();},onchange:function(){var items=this.items,sel=this.selectedIndices;$ARR.forEach(items,function(item){item.selected=false;});$HASH.forEach(sel,function(v,k){if(k){items[k].selected=v;}});var hasSelected=false;mstrmojo.array.forEach(this.items,function(item){hasSelected=hasSelected||item.selected;});this.parent.parent.parent.parent.btnHbox.selectBtn.set("enabled",hasSelected);}})])[0];}else{if(isItemChanged){sheetsWidget.set("list",item.sheets);sheetsWidget.set("items",item.sheets);sheetsWidget.set("selectedIndex",item.defaultSheetsIndex||0);}}var name=HELPER.truncate(item.n,42);rightPanel.fileName.set("text",name);sheetsStack.set("selected",sheetsWidget);}}]},{scriptClass:"mstrmojo.VBox",alias:"rightPanel",cssClass:"mstrmojo-di-ssd-right-panel",children:[{scriptClass:"mstrmojo.Label",alias:"fileName"},{scriptClass:"mstrmojo.TextBox",cssClass:"mstrmojo-di-ssd-search",cssText:"font-size:10pt;",alias:"searchBox",visible:false,onkeyup:function(){var input=this.value;var items=this.parent.sheets.list.list;var k,index,result=[];for(k=0;k<items.length;k++){index=items[k].n.toLowerCase().search(input.toLowerCase());if(index>-1){result.push(items[k]);}}this.parent.sheets.list.set("items",result);}},{scriptClass:"mstrmojo.StackContainer",cssClass:"mappingpage-bottom",alias:"sheets"}]}]}],buttons:[{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-di-button mstrmojo-WebButton",text:mstrmojo.desc(373,"Back"),alias:"backBtn",onclick:function(){var editor=this.parent.parent;if(editor.onBack){editor.onBack();}editor.close();}},{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-di-button mstrmojo-WebButton hot",text:mstrmojo.desc(547,"Select"),alias:"selectBtn",enabled:true,onclick:function(){var e=this.parent.parent;if(e.onOK){e.onOK();}else{e.close();}}}],postBuildRendering:function postBuildRendering(){if(this._super){this._super();}this.closeNode.style.display="none";}});}());