(function(){mstrmojo.requiresCls("mstrmojo.Table","mstrmojo.Label","mstrmojo.Box","mstrmojo.array","mstrmojo.CheckList","mstrmojo.fx","mstrmojo.dom","mstrmojo.DI.DIConstants","mstrmojo.ui.CheckList");mstrmojo.requiresDescs(12725);var $DOM=mstrmojo.dom;var constants=mstrmojo.DI.DIConstants;mstrmojo.DI.DIShowAllColumns=mstrmojo.declare(mstrmojo.Container,null,{scriptClass:"mstrmojo.DI.DIShowAllColumns",markupString:'<div id="{@id}"  class="{@cssClass}" style="top:{@top};left:{@left};"><div style="z-index:{@zIndex};{@cssText}" mstrAttach:mousedown,click><div class="mstrmojo-di-mapping-title"></div><div class="mstrmojo-di-mapping-columns"></div></div></div>',markupSlots:{titleNode:function(){return this.domNode.firstChild.childNodes[0];},contentNode:function(){return this.domNode.firstChild.childNodes[1];}},top:"0px",left:"0px",onOK:function(){var selectedItems=this.allColumns.getSelectedItems();var items=this.allColumns.items,controller=mstrApp.getRootController();for(var k in items){if(mstrmojo.array.indexOf(selectedItems,items[k])===-1){items[k].selected=false;}else{items[k].selected=true;}}controller.setMultipleImport(items);},onCancel:function(){this._close();},children:[{scriptClass:"mstrmojo.Label",slot:"titleNode",alias:"title",text:mstrmojo.desc(12725,"Include Columns:")},{scriptClass:"mstrmojo.ui.CheckList",multiSelect:true,orientation:"v",slot:"contentNode",alias:"allColumns",itemDisplayField:"alias",cssClass:"mstrmojo-di-all-columns",preBuildRendering:function preBuildRendering(){var parent=this.parent,data=parent.data,m=mstrApp.getRootController().model,source=m.getImportSource(data.id);if(source.currentTransformations&&source.currentTransformations.xtab&&source.currentTransformations.xtab.isCrosstab){this.items=source.transformedMapping;}else{this.items=source.currentMapping;}if(source.xdaType===constants.xdaType.querybuilder||source.xdaType===constants.xdaType.googleBigQuery||source.xdaType===constants.xdaType.dataImportCustomSQL||source.sourceInfo.hasAggFilter){this.set("enabled",false);}},postBuildRendering:function postBuildRendering(){if(this._super){this._super();}var menuItems=this.itemsContainerNode.childNodes;if(!menuItems){return ;}if(!this._ontooltipover){var id=this.id;this._ontooltipover=function(evt){var me=mstrmojo.all[id];$DOM.stopPropogation(self,evt);var item=$DOM.findAncestorByAttr(evt.target,"idx",true,me.itemsContainerNode);if(!!item&&!!item.node&&item.node.clientWidth<item.node.scrollWidth){me.set("richTooltip",{cssClass:"vi-regular vi-tooltip-V",refNode:item.node,posType:mstrmojo.tooltip.POS_BOTTOMLEFT,content:item.node.innerText});me.showTooltip(evt,self);}};this._ontooltipout=function(evt){var me=mstrmojo.all[id];me.hideTooltip(evt,self);};}$DOM.attachEvent(this.itemsContainerNode,"mouseover",this._ontooltipover);$DOM.attachEvent(this.itemsContainerNode,"mouseout",this._ontooltipout);},onRender:function(){var items=this.items,selections=[],i,len;for(i=0,len=items.length;i<len;i++){if(items[i].selected){selections.push(items[i]);}}if(selections.length){this.setSelectedItems(selections,true);}}}]});}());