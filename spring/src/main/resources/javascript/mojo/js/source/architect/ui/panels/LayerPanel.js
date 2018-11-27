(function(){mstrmojo.requiresCls("mstrmojo._HasEditableText","mstrmojo.array","mstrmojo.Box","mstrmojo.css","mstrmojo.dom","mstrmojo.architect.EnumDataChangeEvents","mstrmojo.warehouse.ui.BasePanel","mstrmojo.architect.ui.TableContainer");var $A=mstrmojo.array,CSS_PREFIX="mstrmojo-ar-",CSS_PREFIX_TB_BTN="tbbtn",$DOM=mstrmojo.dom,$PX="px",$ENUM_OT=mstrmojo.warehouse.EnumObjectTypes,$ENUM_DATA_CHANGE_EVENTS=mstrmojo.architect.EnumDataChangeEvents,STR_SHOW_LAYERS=mstrmojo.desc(11385,"Show layers"),STR_HIDE_LAYERS=mstrmojo.desc(12225,"Hide layers"),STR_CLOSE=mstrmojo.desc(12226,"Close layer"),STR_INSTRUCTIONS=mstrmojo.desc(12227,"Please select a layer or create a new one");function showContents(isVisible){this.parent.showBottomPanel(!isVisible);this.tableContainer.set("visible",isVisible);this.set("instructionsVisible",!isVisible);}function updateOpenLayerItem(allLayerItems,newLayerID){var index=$A.find(allLayerItems,"did",newLayerID),currentLayerItem=allLayerItems[index],hasOpenLayers=index>=0,currentLayerName=hasOpenLayers?currentLayerItem.n:"";this.layerId=newLayerID;this.setEditableTitle(currentLayerName);showContents.call(this,hasOpenLayers);}function updateLayerItems(evt){var allLayerItems=evt.layers,tableContainerWidget=this.tableContainer,newLayerId=evt.value;tableContainerWidget.removeChildren();this.items=allLayerItems;updateOpenLayerItem.call(this,allLayerItems,newLayerId);if(newLayerId){tableContainerWidget.refresh();}this.onwidthChange({value:this.width});}mstrmojo.architect.ui.panels.LayerPanel=mstrmojo.declare(mstrmojo.warehouse.ui.BasePanel,[mstrmojo._HasEditableText],{scriptClass:"mstrmojo.architect.ui.panels.LayerPanel",cssClass:"ContentsInfoPanel",editableSlot:"titleNode",instructionsText:STR_INSTRUCTIONS,allowEmptyText:true,icntp:$ENUM_OT.LAYER,showList:undefined,tableContainer:undefined,viewListVisible:true,init:function init(props){var $this=this;this._super(props);var controller=mstrApp.getRootController(),evtConfig={},panelConfig=evtConfig[this.id]={};this.addNewTitleButton({title:STR_CLOSE,cssClass:CSS_PREFIX+CSS_PREFIX_TB_BTN+" closeObject",onclick:function(){mstrApp.getRootController().closeViewObject();}});this.addNewTitleButton({title:STR_SHOW_LAYERS,alias:"showList",cssClass:CSS_PREFIX+CSS_PREFIX_TB_BTN+" showList",onclick:function(){$this.viewListVisible=!$this.viewListVisible;mstrApp.getRootController().toggleViewList();}});panelConfig[$ENUM_DATA_CHANGE_EVENTS.LAYER_CHANGE]=updateLayerItems;controller.attachDataChangeListeners(evtConfig);},postBuildRendering:function postBuildRendering(){this._super();showContents.call(this,!!this.layerId);},closeObject:function closeObject(){mstrApp.getRootController().switchLayer("");this.setEditableTitle("");this.layerId="";showContents.call(this,false);},beforeLeave:function beforeLeave(){this.tableContainer.updateTablePositionCache();mstrApp.getRootController().model.forceReloadLayer=true;},updateViewObjectName:function updateViewObjectName(itemID,itemName){if((!!(this.layerId))&&(itemID===this.layerId)){this.setEditableTitle(itemName);}},onTextEditComplete:function onTextEditComplete(textChanged,originalText){var rootController=mstrApp.rootController;if(textChanged){var layerId=this.layerId,layerName=this.text,isValid=rootController.renameLayer(layerId,layerName);if(isValid!==true){this.setEditableTitle(originalText);}else{rootController.updateViewListItem(layerId,layerName);}}},onheightChange:function onheightChange(evt){var h=parseInt(evt.value,10),headerHeight=this.headerHeight=this.headerHeight||(this.hasRendered?this.headerNode.clientHeight:36),contentHeight=(Math.max(parseInt(h,10)-headerHeight,0))+$PX;this.height=h+$PX;this.tableContainer.set("height",contentHeight);this.set("instructionsHeight",this.height);},onwidthChange:function onwidthChange(evt){var $this=this,w=parseInt(evt.value,10),contentWidth=Math.max(w,0),textWidth=contentWidth-(this.titleIconsNode?$DOM.position(this.titleIconsNode).w:0)-25;if(this.showList.domNode){this.showList.set("title",($this.viewListVisible)?STR_HIDE_LAYERS:STR_SHOW_LAYERS);}this.width=w+$PX;this.tableContainer.set("width",contentWidth+$PX);if(this.titleNode){this.titleNode.style.width=textWidth+$PX;}},children:[{scriptClass:"mstrmojo.architect.ui.TableContainer",alias:"tableContainer",visible:false}]});}());