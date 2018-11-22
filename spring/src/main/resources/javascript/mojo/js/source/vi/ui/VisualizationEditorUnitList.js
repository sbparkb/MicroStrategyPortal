(function(){mstrmojo.requiresCls("mstrmojo.vi.ui.InteractiveUnitList","mstrmojo.vi.ui._IsDropTarget","mstrmojo.ui.menus.MenuConfig","mstrmojo.ui.menus.EditorConfig","mstrmojo.vi.models.DropZonesModel","mstrmojo.vi.models.EnumDragSources","mstrmojo.vi.viz.EnumDSSDropZones","mstrmojo.dom","mstrmojo.hash","mstrmojo.css","mstrmojo.array","mstrmojo.gm.GMEnums","mstrmojo.vi.viz.DropZoneHelper");var $DOM=mstrmojo.dom,$CSS=mstrmojo.css,$HASH=mstrmojo.hash,$ARR=mstrmojo.array,$EDZ=mstrmojo.vi.viz.EnumDSSDropZones,ENUM_TARGET=mstrmojo.vi.models.DropZonesModel.ENUM_TARGET_POSITION,TARGET_ABOVE=ENUM_TARGET.ABOVE,TARGET_MIDDLE=ENUM_TARGET.ON,TARGET_BELOW=ENUM_TARGET.BELOW,ENUM_DRAG_SOURCES=mstrmojo.vi.models.EnumDragSources,CLS_IS_METRIC_HEADER="is-mh",ICON_CLASS="icon",ZONE_CLASS="zone",FORM_CLASS="form",ENUM_DZID=mstrmojo.vi.viz.EnumDSSDropZones,XAXIS=ENUM_DZID.XAxis,YAXIS=ENUM_DZID.YAxis,COLORBY=ENUM_DZID.ColorBy,VI_EDITOR_UNIT_LIST_CLS="mstrmojo-VIVizEditor-Menu",$SAB=mstrmojo.gm.DualAxisSubAxisBit,AXIS_SECONDARY=$SAB.SECONDARY,isMetricNames=mstrmojo.vi.viz.DropZoneHelper.isMetricNames;var TARGET_BORDERS={};TARGET_BORDERS[TARGET_ABOVE]="Top";TARGET_BORDERS[TARGET_MIDDLE]="";TARGET_BORDERS[TARGET_BELOW]="Bottom";var itemMarkup='<{@tag} class="item {@cls}" idx="{@idx}" style="{@style}"><div class="outer-wrap"><div unselectable="on" class="inner-wrap"><span unselectable="on" class="txt">{@en@n}</span><div class="'+ICON_CLASS+'"></div><div class="'+ZONE_CLASS+'"></div></div></div></{@tag}>';var highlightTargets=[];function clearBorderClasses(node){var cl=function(n){$HASH.keyarray(TARGET_BORDERS).forEach(function(border){$CSS.removeClass(n,"dragIn"+TARGET_BORDERS[border]);});};highlightTargets.forEach(cl);highlightTargets=[];cl(node);}function getTargetEdge(targetPosition,e,context){var yTarget=targetPosition.y,zoneHeight=targetPosition.h*this.zonesModel.getTargetEdgePortion(context),yPosition=$DOM.getMousePosition(e).y,targetEdge=TARGET_MIDDLE;if((yPosition>=yTarget)&&(yPosition<yTarget+zoneHeight)){targetEdge=TARGET_ABOVE;}else{if(yPosition>=yTarget+targetPosition.h-zoneHeight){targetEdge=TARGET_BELOW;}}return targetEdge;}function showReplaceMenu(item,position){if(!isMetricNames(item)){var itemContext={zone:this.zonesSource,item:item};if(this.zonesModel.hasReplaceCandidates(itemContext)){var menuCfg=this.zonesModel.getReplaceSubMenu(itemContext,{scriptClass:"mstrmojo.Label",text:mstrmojo.desc(11703,"Replace with:"),cssClass:"mstrmojo-menu-replaceLabel"});menuCfg.position=position;menuCfg.isHostedWithin=false;menuCfg.hostId=this.id;this.openPopup(menuCfg.newInstance());}}}function showSelectGeoFormMenu(item,position){var zid=this.zonesSource.id;if(zid===$EDZ.Latitude||zid===$EDZ.Longitude){var itemContext={zone:this.zonesSource,item:item};if(this.zonesModel.getSelectGeoFormMenu){var menuCfg=this.zonesModel.getSelectGeoFormMenu(itemContext);if(menuCfg){menuCfg.position=position;menuCfg.isHostedWithin=false;menuCfg.hostId=this.id;this.openPopup(menuCfg.newInstance());}}}}function getTargetEdgeAndIndex(targetPosition,e,context,target){if($DOM.contains(this.itemsContainerNode,target,true,this.domNode)){var tgtItem=context.tgtData.item,targetIdx=(this.items||[]).length-1,targetEdge=getTargetEdge.call(this,targetPosition,e,context);if(tgtItem){targetIdx=tgtItem._renderIdx;}else{targetEdge=targetIdx>=0?TARGET_BELOW:TARGET_ABOVE;}return{item:context.getCtxtDragData().item,edge:targetEdge,idx:Math.max(targetIdx,0)};}return null;}function setAsActiveZone(){mstrmojo.all[this.panelId].set("activeZoneId",this.id);}function isActiveZone(){var az=mstrmojo.all[this.panelId].activeZoneId;return !az||(az===this.id);}function openMenu(el,position,updateMenuItems){var menuCfg=new mstrmojo.ui.menus.MenuConfig({menuCssClass:VI_EDITOR_UNIT_LIST_CLS}),editableLabelNode=this.getLabelNode(el);updateMenuItems.call(this,menuCfg,editableLabelNode);if(menuCfg.hasMenuItems()){menuCfg.position=position;menuCfg.isHostedWithin=false;menuCfg.hostId=this.id;this.openPopup(menuCfg.newInstance());}}mstrmojo.vi.ui.VisualizationEditorUnitList=mstrmojo.declare(mstrmojo.vi.ui.InteractiveUnitList,[mstrmojo.vi.ui._IsDropTarget],{scriptClass:"mstrmojo.vi.ui.VisualizationEditorUnitList",zonesModel:null,zonesSource:null,multiSelect:true,useListModKeys:true,useRichTooltip:true,getItemTooltip:function(item,itemNode,target){var position=$DOM.position(target);if(target===this.getIconNode(itemNode)&&!isMetricNames(item)){return{areaId:item._renderIdx+"icon",cssClass:"vi-regular vi-tooltip-V",contentNodeCssClass:"regular-unitlist-tooltips",posType:mstrmojo.tooltip.POS_BOTTOMLEFT,content:mstrmojo.desc(11687,"Click to replace"),top:position.y-8,left:position.x-4};}else{if(target===this.getZoneNode(itemNode)&&item.geoWarning){return{areaId:item._renderIdx+"zone",cssClass:"vi-regular vi-tooltip-A",contentNodeCssClass:"regular-unitlist-tooltips",posType:mstrmojo.tooltip.POS_TOPLEFT,content:mstrmojo.desc(14113,"Select an attribute form as geographic role"),top:position.y+28,left:position.x-4};}}return this._super(item,itemNode,target);},doItemSelect:function(item,evt){var hWin=evt.hWin,e=evt.e;if(isActiveZone.call(this)||(!$DOM.shiftKey(hWin,e)&&!$DOM.isMetaKey(hWin,e))){setAsActiveZone.call(this);this._super(item,evt);}},isDragValid:function isDragValid(context){var e=context.src.e;return !(!isActiveZone.call(this)&&(e.ctrlKey||e.shiftKey||e.metaKey))||this._super(context)||false;},ondragstart:function ondragstart(context){this.selectDragNode(context);this._super(context);},onItemContextMenu:function onItemContextMenu(item,evt){var e=evt.e,itemNode=this.getItemNodeFromTarget(evt.getTarget()),hWin=evt.hWin,targetSelected=this.getSelectedItems().some(function(obj){return obj.itemNode===itemNode;});if(item&&!targetSelected){this.doItemSelect(item,evt);}var target=evt.getTarget(),items=this.getSelectedItems();if(items.length){this.closePopup();var multi=items&&items.length>1,method=multi?"showMultiSelectionMenu":"showItemMenu";this[method](multi?items:item,this.getItemNodeFromTarget(target),$DOM.getMousePosition(e,hWin));return true;}},showItemMenu:function showItemMenu(item,el,position){openMenu.call(this,el,position,function(cfg,editableLabelNode){this.zonesModel.getUnitMenuItems(cfg,this.zonesSource,item,editableLabelNode);});},showMultiSelectionMenu:function showMultiSelectionMenu(items,el,position){openMenu.call(this,el,position,function(cfg){this.zonesModel.getMultiUnitsMenuItems(cfg,this.zonesSource,items,null);});},deleteItem:function deleteItem(item){this.zonesModel.deleteItem(this.zonesSource,item._renderIdx);},deleteItems:function deleteItems(items){this.zonesModel.deleteItems(this.zonesSource,items);},getItemProps:function getItemProps(item,idx){var props=this._super(item,idx);props.n=props.n||"&nbsp; ";if(item.t===4&&isMetricNames(item)){props.addCls(CLS_IS_METRIC_HEADER);props.n=mstrmojo.desc(11808,"Metric Names");}var zoneCss=item.zone;if(!this.zonesModel||this.zonesModel.shouldMetricNameShowIcon(item,item.zone)){if(zoneCss!==undefined){zoneCss="icz"+zoneCss;if(item.ax===AXIS_SECONDARY){zoneCss+="s";}props.addCls(zoneCss);}}if(item.hidden){props.addCls("hidden");}if(item.attn&&item.fnm){props.attn=item.attn;props.fnm=item.fnm;}if(item.geoWarning){props.addCls(item.geoWarning);}return props;},getItemMarkup:function getItemMarkup(item){if(item&&item.attn&&item.fnm){return itemMarkup.replace("{@en@n}",'{@en@attn}@<span unselectable="on" class="'+FORM_CLASS+'">{@en@fnm}</span>');}return itemMarkup;},getDragData:function getDragData(context){this.selectDragNode(context);var info=this._super(context),me=this;info.itemIdx=context.src.node.getAttribute("idx");info.item=this.items[info.itemIdx];if(info.items===undefined){info.items=[];}if($ARR.find(info.items,"did",info.item.did)===-1){info.items.push(info.item);}info.src=ENUM_DRAG_SOURCES.VIZ_EDITOR;info.srcZoneId=this.zonesSource.id;info.onRemove=function(items){if(items.length>1){me.deleteItems(items);}else{me.deleteItem(items);}};info.allowDropOnTarget=function(info,targetId){var result=true;if(this.allowDropOnTarget){result&=this.allowDropOnTarget(targetId,info);}return result;}.bind(me.zonesModel,info);return info;},createAvatar:function createAvatar(target,context){var avatar=this._super(target,context);Array.prototype.slice.call((avatar&&avatar.childNodes)||[]).forEach(function(node){$CSS.removeClass(node,mstrmojo.vi.ui.InteractiveUnitList.CLS_HAS_X);$CSS.addClass(node,mstrApp.rootCtrl.view.themeClassName);},this);return avatar;},getIconNode:function getIconNode(itemNode){var cns=itemNode.firstElementChild.firstElementChild.childNodes;return cns&&cns[1];},getZoneNode:function getZoneNode(itemNode){var cns=itemNode.firstElementChild.firstElementChild.childNodes;return cns&&cns[2];},ondragover:function ondragover(context){var me=this,target=context.tgt,tgtNode=me.getItemNodeFromTarget(target.node)||target.node,tgtData=context.tgtData,existingTgtNode=tgtData&&tgtData.node,targetItems=target.widget&&target.widget.items;if(!tgtData||existingTgtNode!==tgtNode){tgtData=context.tgtData={item:me.zonesSource.items[parseInt(tgtNode.getAttribute("idx"),10)],node:tgtNode,pos:$DOM.position(tgtNode,true)};if(existingTgtNode){clearBorderClasses(existingTgtNode);}}clearBorderClasses(tgtNode);var dropPos=getTargetEdgeAndIndex.call(this,tgtData.pos,target.e,context,tgtNode),targetEdge=dropPos&&dropPos.edge,dragData=this.getContextDragData(context),zonesModel=this.zonesModel,zonesSource=this.zonesSource,dropInfo=dropPos&&$HASH.copy(dropPos,zonesModel.getAllowDropInfo(zonesSource,dragData.items,dropPos.idx,dropPos.edge,context));if(dropInfo&&dropInfo.allowedItems.length){var itemsContainerNode=this.itemsContainerNode,itemNodes=Array.prototype.slice.apply(itemsContainerNode.childNodes);if(!itemNodes.length||itemNodes.every(function(node){return(node.className||"").indexOf("hidden")>-1;})){$CSS.addClass(itemsContainerNode,"dragIn");this.raiseHLToggle(true);}else{zonesModel.getHighlightTargets(zonesSource,dropInfo).forEach(function(tgt){var target=itemNodes[tgt.idx];highlightTargets.push(target);$CSS.addClass(target,"dragIn"+TARGET_BORDERS[tgt.edge]);});this.raiseHLToggle(true);}if(dragData.setAvatarClass){var src=dragData.src,avatarCssClass="";if(src===ENUM_DRAG_SOURCES.DATASETS||src===ENUM_DRAG_SOURCES.ALL_OBJECT_LIST){avatarCssClass=targetEdge===TARGET_MIDDLE?"replace":"add";$ARR.forEach(targetItems,function(item){if(item.zone===COLORBY){var metricCnt=0,attrCnt=0;$ARR.forEach(dragData.items,function(item){if(zonesModel.isMetric(item)){metricCnt++;}else{if(zonesModel.isAttrCategory(item)){attrCnt++;}}});if(!(metricCnt&&attrCnt)&&(zonesModel.differInType(item,dragData.item)||zonesModel.isMetric(dragData.item))){avatarCssClass="replace";}}if((item.zone===XAXIS||item.zone===YAXIS)&&zonesModel.differInType(item,dragData.item)){avatarCssClass="replace";}});}else{if(src===ENUM_DRAG_SOURCES.VIZ_EDITOR||src===ENUM_DRAG_SOURCES.VIZ){avatarCssClass=(targetEdge===TARGET_ABOVE||targetEdge===TARGET_BELOW||target.node===itemsContainerNode)?"move":(targetEdge===TARGET_MIDDLE?"replace":"");}}dragData.setAvatarClass(avatarCssClass);}}else{if(dragData.setInvalidAvatarClass){dragData.setInvalidAvatarClass();}}},getDropAvatarIcon:function getDropAvatarIcon(context){var dragData=context.getCtxtDragData(),dragSource=dragData.src,iconCls=this.zonesSource.getDropIconCls(dragData);if(dragSource===ENUM_DRAG_SOURCES.DATASETS||dragSource===ENUM_DRAG_SOURCES.ALL_OBJECT_LIST){iconCls="add";}return iconCls;},ondrop:function ondrop(context){this.ondragover(context);var target=context.tgt,dragData=context.src&&context.src.data,dragSource=dragData&&dragData.src,dropPos=getTargetEdgeAndIndex.call(this,context.tgtData.pos,target.e,context,this.getItemNodeFromTarget(target.node)||target.node),zonesModel=this.zonesModel,zonesSource=this.zonesSource,dropInfo=dropPos&&$HASH.copy(dropPos,zonesModel.getAllowDropInfo(zonesSource,context.getCtxtDragData().items,dropPos.idx,dropPos.edge,context));if(dropInfo&&dropInfo.allowedItems.length){zonesModel.getHost().model.addEditNodeForDatasetAction(context,zonesModel.getHost().k);var add2DZ=function(){zonesModel.unitsDropped(zonesSource,context,dropInfo);};if(dragSource===ENUM_DRAG_SOURCES.ALL_OBJECT_LIST){var widget=context.src.widget,dp=widget&&widget.dataProvider;if(dp){dp.loadObjects(dropInfo.allowedItems,{success:add2DZ},true);}}else{add2DZ();}}this._super(context);},allowDrop:function allowDrop(context){var dragData=context.getCtxtDragData(),dragSource=dragData.src;if(dragSource===ENUM_DRAG_SOURCES.DATASETS||dragSource===ENUM_DRAG_SOURCES.VIZ_EDITOR||dragSource===ENUM_DRAG_SOURCES.ALL_OBJECT_LIST||dragSource===ENUM_DRAG_SOURCES.VIZ){return this.zonesModel.isZoneDropAllowed(this.zonesSource,dragData);}return false;},onclick:function onclick(evt){var target=evt.target||$DOM.eventTarget(evt.hWin,evt.e),item=this.getItemFromTarget(target);if(item!==undefined){switch(target.className){case ICON_CLASS:$DOM.preventDefault(window,evt.e);target=evt.getTarget();item=this.getItemFromTarget(target);if(item){evt.cancel();this.closePopup();showReplaceMenu.call(this,item,$DOM.getMousePosition(evt.e,evt.hWin));}break;case ZONE_CLASS:case FORM_CLASS:$DOM.preventDefault(window,evt.e);target=evt.getTarget();item=this.getItemFromTarget(target);if(item&&(item.geoWarning||(item.attn&&item.fnm))){evt.cancel();this.closePopup();showSelectGeoFormMenu.call(this,item,$DOM.getMousePosition(evt.e,evt.hWin));break;}default:this._super(evt);}}},cleanUpAfterTarget:function cleanUpAfterTarget(context){var targetData=context.tgtData;if(targetData){clearBorderClasses(targetData.node);this.raiseHLToggle(false);}this._super(context);},raiseHLToggle:function raiseHLToggle(dragIn){var item;this.parent.parent.parent.model.raiseEvent($HASH.copy({name:"viVizEditorDrag",isIn:dragIn,id:this.parent.parent.parent.viPanelType},item));}});}());