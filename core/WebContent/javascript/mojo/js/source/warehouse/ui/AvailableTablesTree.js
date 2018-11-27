(function(){mstrmojo.requiresCls("mstrmojo.array","mstrmojo.hash","mstrmojo.string","mstrmojo.architect.EnumDragActions","mstrmojo.warehouse.EnumObjectTypes","mstrmojo.warehouse.ui.TablesTree","mstrmojo.warehouse.menu.AvailableTablesMenu");mstrmojo.requiresDescs(2901);var $A=mstrmojo.array,$H=mstrmojo.hash,$STR=mstrmojo.string,$CSS=mstrmojo.css,CLASS_LOADING="loading",$DOM=mstrmojo.dom,$ENUM_DATA_CHANGE_EVENTS=mstrmojo.warehouse.EnumDataChangeEvents,$ENUM_DRAG_ACTIONS=mstrmojo.architect.EnumDragActions,$ENUM_TYPES=mstrmojo.warehouse.EnumObjectTypes,STR_LOADING=mstrmojo.desc(2901,"Loading..."),$AVAILABLE_TABLES_TREE;mstrmojo.warehouse.ui.AvailableTablesTree=mstrmojo.declare(mstrmojo.warehouse.ui.TablesTree,null,{scriptClass:"mstrmojo.architect.ui.AvailableTablesTree",cssClass:"mstrmojo-wh-AvailableTablesTree",tablesTreeHooks:{addItem:function(el,item){var rootController=mstrApp.getRootController();rootController.addTables([].concat(item));},isTable:function isTable(itemData){return itemData&&itemData.tp===$ENUM_TYPES.TABLE;}},createAvatarFunc:undefined,positionAvatarFunc:undefined,useRichTooltip:true,showTooltip:function showTooltip(evt,win){var target=evt.target||$DOM.eventTarget(evt.hWin,evt.e);if(target.className&&(target.className.indexOf("item-n")>-1)){target=target.parentNode;}if(target.className.indexOf("item tp")>-1&&(target.scrollWidth>target.clientWidth)){var position=$DOM.position(target);this.richTooltip={posType:mstrmojo.tooltip.POS_TOPLEFT,cssClass:"vi-regular vi-tooltip-A",content:target.textContent,top:position.y+position.h+5,left:position.x};this._super(evt,win);}},init:function init(props){this._super(props);var evtConfig={},rootController=mstrApp.getRootController(),tablesTreeConfig=evtConfig[this.id]={};tablesTreeConfig[$ENUM_DATA_CHANGE_EVENTS.DBTABLES_CHANGED]=function onDBTablesChanged(evt){if(!((this.sourceInfo===evt.sourceInfo)||(evt.sourceInfo==="")||(evt.sourceInfo===undefined))){return ;}this.cleanUp();var selectedItems=evt.selectedItems||[],selectedIndices=this.selectedIndices={},newItems=evt.items;$A.forEach(selectedItems,function(tableName){selectedIndices[$A.find(newItems,"n",tableName)]=true;});this.expandedIndices=evt.expandedIndices||{};this.set("items",newItems);if(this.domNode){this.domNode.onmousedown=function(e){$DOM.preventDefault(window,e);};}};tablesTreeConfig[$ENUM_DATA_CHANGE_EVENTS.DBTABLES_REQUESTED]=function onDBTablesRequested(evt){if(!((this.sourceInfo===evt.sourceInfo)||(evt.sourceInfo===""))){return ;}this.cleanUp();var newItems=[];newItems.push({n:STR_LOADING,tp:"0",isVisible:function isVisible(){return true;}});this.set("items",newItems);$CSS.toggleClass(this.getLeafNode(0),CLASS_LOADING,true);};tablesTreeConfig[$ENUM_DATA_CHANGE_EVENTS.DBTABLE_UPDATED]=function onDBTablesUpdated(evt){$A.forEach(this.getItemWithPropName(this.items,"did",evt.item.did),function(item){this.updateChild(item._renderIdx,evt.item);},this);};tablesTreeConfig[$ENUM_DATA_CHANGE_EVENTS.DBTABLES_USED]=function onDBTablesUsed(evt){var selectedItems=evt.items||[],items=this.items;$H.forEach(this.selectedIndices,function(boolValue,index){this.toggleChildSelection(String(index),false);},this);$A.forEach(selectedItems,function(tableName){this.toggleChildSelection(String($A.find(items,"n",tableName)),true);},this);};rootController.attachDataChangeListeners(evtConfig);this.dataHelper={fetch:function fetch(item,callback){if(item.tp===$ENUM_TYPES.TABLE){rootController.getColumnsForDBTable({data:item},callback);}else{callback.success({items:[]});}}};},createAvatar:function createAvatar(sourceNode){if(this.createAvatarFunc){return this.createAvatarFunc.call(this,sourceNode);}else{return this._super(sourceNode);}},positionAvatar:function positionAvatar(pos,context){if(this.positionAvatarFunc){this.positionAvatarFunc.call(this,pos,context);}else{this._super(pos,context);}},cleanUp:function cleanUp(){this.expandedIndices={};this.selectedIndices={};this.userSelections={};},onitemsChange:function onitemsChange(evt){if(this._super){this._super(evt);}delete this._oldItems;},getItemProps:function getItemProps(item,level,index){var name=$STR.encodeHtmlString((item.n&&(item.n+""))||"");return{tag:"div",cls:"item "+(item.tp?("tp"+item.tp):""),n:name,idx:index};},getMenuHelper:function getMenuHelper(){$AVAILABLE_TABLES_TREE.menuHelper=$AVAILABLE_TABLES_TREE.menuHelper||new mstrmojo.warehouse.menu.AvailableTablesMenu();return $AVAILABLE_TABLES_TREE.menuHelper;},getDragAction:function getDragAction(context){var nodeAttributes=this.getNodeAttributes(context.src.node),nodeData=nodeAttributes&&this.getTreeItem(nodeAttributes.index);switch(nodeData&&nodeData.tp){case $ENUM_TYPES.TABLE:return $ENUM_DRAG_ACTIONS.ADD_TABLE;}}});$AVAILABLE_TABLES_TREE=mstrmojo.warehouse.ui.AvailableTablesTree;}());