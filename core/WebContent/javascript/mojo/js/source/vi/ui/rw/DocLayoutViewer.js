(function(){mstrmojo.requiresCls("mstrmojo.EnumRWUnitType","mstrmojo.Container","mstrmojo.vi._MonitorsAppState","mstrmojo.models.FormatModel","mstrmojo.vi.ui.rw._SavesChildPositions","mstrmojo.vi.ui._HasBoxLayout","mstrmojo.vi.ui.BoxPanelContainer","mstrmojo.vi.ui.BoxPanel","mstrmojo.vi.ui.VisualizationEditor","mstrmojo.vi.ui.VIBoxPropertyEditor","mstrmojo.DocDataService","mstrmojo.boxmodel","mstrmojo.dom","mstrmojo.array","mstrmojo.func","mstrmojo.hash");mstrmojo.requiresClsP("mstrmojo.vi.models","VIComponentMap","EnumPanelTypes");mstrmojo.requiresClsP("mstrmojo.vi.ui","_HasBoxLayout","BoxPanelContainer","BoxPanel","VisualizationEditor","VIBoxPropertyEditor");var MARGIN=8,$MOJO=mstrmojo,$VI_MODELS=$MOJO.vi.models,$ARR=$MOJO.array,$FUNC=$MOJO.func,$BOX=$MOJO.boxmodel,$DOM=$MOJO.dom,$HASH=$MOJO.hash,$FORMAT_MODEL=$MOJO.models.FormatModel,$GET_FORMAT_OBJ=$FORMAT_MODEL.getFormatUpdate,$ENUM_FORMAT_PROPERTIES=$FORMAT_MODEL.ENUM_PROPERTY_NAMES,LAYOUT_ID="layout",BOX_CHILD_TYPE="c",$COMPONENT_TYPES=$VI_MODELS.VIComponentMap.TYPES,PANEL_TYPES=$MOJO.vi.ui.BoxPanel.PANEL_TYPES,VI_DROP_ZONES=PANEL_TYPES.DROP_ZONES,VI_PROPERTIES=PANEL_TYPES.PROPS,VI_FILTERS=PANEL_TYPES.FILTERS,SUPPRESS_DATA=$MOJO.DocDataService.SUPPRESS_DATA,$UNIT_TYPES=$MOJO.EnumRWUnitType,$ENUM_PANEL_TYPES=$VI_MODELS.EnumPanelTypes,IS_FILTER_PANEL_OPEN;var PANEL_ITEMS={};PANEL_ITEMS[VI_DROP_ZONES]={n:mstrmojo.desc(11312,"Editor"),cls:"edt",id:VI_DROP_ZONES};PANEL_ITEMS[VI_PROPERTIES]={n:mstrmojo.desc(7558,"Properties"),cls:"prp",id:VI_PROPERTIES};PANEL_ITEMS[VI_FILTERS]={n:mstrmojo.desc(6189,"Filter"),cls:"flt",id:VI_FILTERS};function getPanelKeyFromType(type){if(type==="filterPanel"){return VI_FILTERS;}return type==="editPanel"?VI_DROP_ZONES:VI_PROPERTIES;}function getTabInfo(context){return context.src.data.tabInfo;}function updateBoxKey(box){if(box.t===BOX_CHILD_TYPE){box.k=mstrmojo.all[box.id].getIdentifier();}else{$ARR.forEach(box.children,function(child){updateBoxKey(child);});}return box;}function getComponent(model,builder,type){return builder.getLayoutVIMap(model.getCurrentLayoutKey()).getComponent(type);}function getFilterStack(model,builder){return getComponent(model,builder,$COMPONENT_TYPES.FILTER_STACK);}function createPanelEditor(item,model,builder){var itemId=item.id,props={model:model,viPanelType:itemId,layoutKey:model.currlaykey};switch(itemId){case VI_DROP_ZONES:return new mstrmojo.vi.ui.VisualizationEditor(props);case VI_PROPERTIES:if(!mstrApp.allowWebDashboardDesign()){return null;}return new mstrmojo.vi.ui.VIBoxPropertyEditor(props);default:var filterStack=getFilterStack(model,builder);if(filterStack){filterStack.viPanelType=itemId;return filterStack;}return null;}}function createPanelContainers(box,model,builder,docLayout){if(box.t===BOX_CHILD_TYPE){var key=box.k;if(key===LAYOUT_ID){box.id=docLayout.id;}else{var panelContainer=new mstrmojo.vi.ui.BoxPanelContainer({model:model});box.id=panelContainer.id;key.split("|").forEach(function(panelKey,idx){var selectedPosition=panelKey.length-1,isSelected=panelKey.charAt(selectedPosition)==="*";if(isSelected){panelKey=panelKey.substr(0,selectedPosition);}var panelItem=PANEL_ITEMS[panelKey],panelEditor=createPanelEditor(panelItem,model,builder);if(panelEditor){panelEditor.setOpenStatus(true,true,null);panelContainer.addPanel(panelItem,panelEditor,idx,isSelected);}});return[panelContainer];}}else{var panelContainers=[];$ARR.forEach(box.children,function(child){panelContainers=panelContainers.concat(createPanelContainers(child,model,builder,docLayout));});return panelContainers;}return[];}function getPanelContainers(){return $ARR.filter(this.children,function(child){return child instanceof mstrmojo.vi.ui.BoxPanelContainer;});}function createLayoutXml(panels){var boxCfg=this.boxLayoutConfig;boxCfg.useDefaultBox([{},this.docLayout],["185",100]);var boxChildren=boxCfg.box.children;boxChildren[0].k=panels.map(function(panelId,idx){return panelId+(!idx?"*":"");}).join("|");boxChildren[1].k=LAYOUT_ID;if(!boxChildren[0].k){boxChildren.shift();}}function applyBoxLayoutXML(layoutXml){var model=this.model,builder=this.builder,layoutXmlString=JSON.stringify(layoutXml);if(layoutXml&&layoutXmlString.match('"k":"(1|2|3)')){layoutXml=null;}layoutXml=layoutXml&&JSON.parse(layoutXmlString.replace(/vi_edt/g,VI_DROP_ZONES));var boxCfg=this.boxLayoutConfig=new mstrmojo.vi.ui.BoxLayoutConfig({hostId:this.id,identifier:"id",box:layoutXml});if(!layoutXml){var defaultPanels=[],panelKey=model.getVIPanelKeyFromUnits(mstrmojo.vi.models.EnumPanelTypes.VISUALIZATION),panelDef=model.getUnitDefinitions(panelKey);panelDef=panelDef&&panelDef[panelKey];if(!(panelDef&&!panelDef.dzv)){defaultPanels.push(VI_DROP_ZONES);}if(getFilterStack(model,builder)){defaultPanels.push(VI_FILTERS);}if(defaultPanels.length>0){defaultPanels.push(VI_PROPERTIES);}createLayoutXml.call(this,defaultPanels);boxCfg.box.go=true;}getPanelContainers.call(this).forEach(function(child){this.removeChildren(child);child.unrender();},this);this.addChildren(createPanelContainers(boxCfg.box,model,builder,this.docLayout));}mstrmojo.vi.ui.rw.DocLayoutViewer=mstrmojo.declare(mstrmojo.Container,[mstrmojo.vi.ui._HasBoxLayout,mstrmojo.vi._MonitorsAppState,mstrmojo.vi.ui.rw._SavesChildPositions],{scriptClass:"mstrmojo.vi.ui.rw.DocLayoutViewer",markupString:'<div id="{@id}" class="mstrmojo-VIDocLayoutViewer {@cssClass}" style="{@cssText}"></div>',markupSlots:{containerNode:function(){return this.domNode;}},markupMethods:{onheightChange:mstrmojo.Widget.heightMarkupMethod,onwidthChange:mstrmojo.Widget.widthMarkupMethod},docLayout:null,editorPanel:null,model:null,builder:null,init:function init(props){this._super(props);if(mstrApp.appState===mstrmojo.vi.VisualInsightApp.APP_STATES.PRESENTATION){this.isBoxLayoutDirty=true;}this.model.attachEventListener("updateRootDefn",this.id,function(){if(!this.parent){this.isBoxLayoutDirty=true;}});},updateRootBoxLayout:function updateRootBoxLayout(){applyBoxLayoutXML.call(this,this.model.getRootNode().defn.layoutXML);},onAppStateChange:function onAppStateChange(evt){if(this.model.getCurrentLayoutKey()===this.k){IS_FILTER_PANEL_OPEN=!!this.getViPanel("filterPanel");this.changePanelsVisibility();}this._super(evt);},shouldSaveSplitterMoves:function shouldSaveSplitterMoves(){return false;},getSplitterHost:function getSplitterHost(){return this.containerNode;},preBuildRendering:function preBuildRendering(){var parent=this.parent;if(parent){var parentStyle=parent[this.slot].style,h=this.height,w=this.width;this.height=parseInt((h&&h!=="auto")?h:parentStyle.height,10)-MARGIN+"px";this.width=parseInt((w&&w!=="auto")?w:parentStyle.width,10)-MARGIN+"px";}this.bs=this.model.bs;return this._super();},onRender:function onRender(){this._super();this.updateRootBoxLayout();this.buildBoxLayout();delete this.isBoxLayoutDirty;},destroy:function destroy(){this._super();this.controller.view.raiseEvent({name:"destroyLayout",key:this.k});},getLayoutOffsets:function getLayoutOffsets(){return{h:MARGIN,w:MARGIN};},beginBoxMove:function beginBoxMove(context,boxChild,noDelete){var tabInfo=getTabInfo(context);this._super(context,boxChild,!!(tabInfo&&!tabInfo.isSingleTab)||noDelete);},endBoxMove:function endBoxMove(context,boxChild){this._super(context,boxChild);if(!getTabInfo(context)){this.getSplitterHost().appendChild(boxChild.domNode);}},getBoxLayoutSaveAction:function getBoxLayoutSaveAction(boxLayout){var model=this.model,layoutFormatUpdate={};$GET_FORMAT_OBJ($ENUM_FORMAT_PROPERTIES.USE_PAGE_WIDTH_AS_LAYOUT_WIDTH,true,layoutFormatUpdate);$GET_FORMAT_OBJ($ENUM_FORMAT_PROPERTIES.MARGIN_LEFT,0,layoutFormatUpdate);$GET_FORMAT_OBJ($ENUM_FORMAT_PROPERTIES.MARGIN_RIGHT,0,layoutFormatUpdate);var layoutSaveActions=[model.getUnitFormatAction(model.getRootNode(),1,$GET_FORMAT_OBJ($ENUM_FORMAT_PROPERTIES.LAYOUT_XML,updateBoxKey(boxLayout)))];model.defn.layouts.forEach(function(layoutDefn){layoutSaveActions.push(model.getUnitFormatAction({k:layoutDefn.k,defn:layoutDefn},1,JSON.parse(JSON.stringify(layoutFormatUpdate))));});return layoutSaveActions;},getChildPositionActions:function getChildPositionActions(){var actions=this._super(),builder=this.builder,model=this.model,filterStack=getFilterStack(model,builder),mainStack=getComponent(model,builder,$COMPONENT_TYPES.MAIN_CONTENT),pageByStack=getComponent(model,builder,$COMPONENT_TYPES.PAGEBY_STACK),vizStack=getComponent(model,builder,$COMPONENT_TYPES.VIZ_CONTENT),filterStackPos=$DOM.position(filterStack&&filterStack.domNode),mainStackPos=$DOM.position(mainStack.domNode),pageByStackPos=$DOM.position(pageByStack&&pageByStack.domNode),vizStackPos=$DOM.position(vizStack.domNode),ERROR_MARGIN=5,isFilterStackAlignedHorizontally=Math.abs(filterStackPos.x-mainStackPos.x)>ERROR_MARGIN,dim=isFilterStackAlignedHorizontally?"x":"y",isFilterStackFirst=filterStackPos[dim]<mainStackPos[dim],isFilterStackVisible=(filterStack&&filterStack.getFilters().length>0),pageWidth=$DOM.position(mstrApp.rootCtrl.view.domNode).w,BORDER_OFFSET=2,HEADER_OFFSET=19;filterStackPos.x=filterStackPos.y=0;mainStackPos.x=mainStackPos.y=0;pageByStackPos.x=pageByStackPos.y=0;vizStackPos.x=vizStackPos.y=0;if(filterStack){filterStackPos.w=filterStackPos.w||parseInt(filterStack.width,10);filterStackPos.h=filterStackPos.h||parseInt(filterStack.height,10);}if(isFilterStackFirst&&isFilterStackVisible){mainStackPos[dim]=filterStackPos[dim==="x"?"w":"h"];}else{if(!isFilterStackFirst){filterStackPos[dim]=mainStackPos[dim==="x"?"w":"h"];}}if(pageByStack&&pageByStack.visible){vizStackPos.y+=pageByStackPos.h;var pbUnit=pageByStack.unit;if(pbUnit){var pbSelectorKey=pbUnit.ckey;actions.push(model.getDimensionAndPositionAction({k:pbSelectorKey,defn:model.getCurrentLayoutDef().units[pbSelectorKey]},pageByStackPos));}}if(isFilterStackVisible){if(isFilterStackAlignedHorizontally){mainStackPos.w=vizStackPos.w=pageWidth-filterStackPos.w;}}else{mainStackPos.w=vizStackPos.w=pageWidth;}vizStackPos.w-=BORDER_OFFSET;vizStackPos.h-=BORDER_OFFSET;var posInfo=[undefined,filterStackPos,mainStackPos,pageByStackPos,vizStackPos];model.defn.layouts.forEach(function(layoutDefn){actions.push(model.getUnitFormatAction({k:layoutDefn.k,defn:layoutDefn},1,$GET_FORMAT_OBJ($ENUM_FORMAT_PROPERTIES.PAGE_WIDTH,$BOX.px2Inches(model.getZoomProps(),pageWidth))));Object.keys($ENUM_PANEL_TYPES).forEach(function(viType){var stackKey=model.getVIPanelKeyFromUnits($ENUM_PANEL_TYPES[viType],layoutDefn.k);actions.push(model.getDimensionAndPositionAction({k:stackKey,defn:layoutDefn.units[stackKey]},posInfo[$ENUM_PANEL_TYPES[viType]]));});});model.defn.layouts.forEach(function(layoutDefn){Object.keys(layoutDefn.units).forEach(function(unitKey){var units=layoutDefn.units,unitDefn=units[unitKey],t=(unitDefn&&unitDefn.t)||$UNIT_TYPES.LAYOUT,layoutXML=unitDefn.layoutXML;if(unitDefn&&unitDefn._isDeleted){return ;}if(t===$UNIT_TYPES.SUBSECTION){var subsectionHeight=$HASH.copy(mainStackPos);subsectionHeight.h+=2;actions.push(model.getDimensionAction({k:unitKey,defn:unitDefn},subsectionHeight));}else{if(t===$UNIT_TYPES.GRID||t===$UNIT_TYPES.GRAPH||t===$UNIT_TYPES.GRIDGRAPH){var vis=unitDefn&&unitDefn.vis;if(vis){if(vis.we&&vis.wcn){var visName=this.builder.visList.findVisName(vis.wcn);if(visName){actions.push(model.getUnitChangeVizAction(visName,vis.wcn,{k:unitKey,defn:unitDefn}));}}}}}if(layoutXML!==undefined){var boxLayoutConfig=new mstrmojo.vi.ui.BoxLayoutConfig({box:layoutXML,padding:0,getBoxChildClass:function(boxChild){var scriptClass=mstrmojo.vi.ui.BoxLayoutConfig.prototype.getBoxChildClass(boxChild);if(scriptClass){return scriptClass;}return builder.getPortletClass(units[boxChild.k]);}}),boxInfo=this.calculateBoxLayout(boxLayoutConfig,{height:vizStackPos.h-BORDER_OFFSET-HEADER_OFFSET,width:vizStackPos.w-BORDER_OFFSET,top:vizStackPos.y,left:vizStackPos.x}).box;Object.keys(boxInfo).forEach(function(boxUnitKey){var boxDimensions=boxInfo[boxUnitKey].dim;actions.push(model.getDimensionAndPositionAction({k:boxUnitKey,defn:units[boxUnitKey]},{h:(parseInt(boxDimensions.height,10)-BORDER_OFFSET)+"px",w:(parseInt(boxDimensions.width,10)-BORDER_OFFSET)+"px",x:boxDimensions.left,y:boxDimensions.top}));});}},this);},this);return actions;},getViPanel:function getViPanel(type){var panel=this.docLayout.getViPanel(type);if(!panel){var panelId=getPanelKeyFromType(type);getPanelContainers.call(this).every(function(child){panel=child.getPanelByType(panelId);return !panel;});}return panel;},openViPanel:function openViPanel(type,callback,skipServerRequest,skipReLayout){var panelKey=getPanelKeyFromType(type),panelContainer=getPanelContainers.call(this)[0],model=this.model,builder=this.builder,id=this.id,fnShowPanel=function(){var layoutViewer=mstrmojo.all[id],update=model.getDataService().newUpdateWithoutCmd();if(panelContainer){var panelItem=PANEL_ITEMS[panelKey],panel=createPanelEditor(panelItem,model,builder);panelContainer.addPanel(panelItem,panel,NaN,true);if(panel){panel.setOpenStatus(true,false,update);}}else{createLayoutXml.call(layoutViewer,[panelKey]);var newContainers=createPanelContainers(layoutViewer.boxLayoutConfig.box,model,builder,layoutViewer.docLayout);layoutViewer.addChildren(newContainers);newContainers.forEach(function(container){var panel=container&&container[panelKey];if(panel){panel.setOpenStatus(true,false,update);}});if(!skipReLayout){layoutViewer.buildBoxLayout();}}if(!skipServerRequest){layoutViewer.saveBoxLayout(undefined,undefined,callback,update);update.addExtras(SUPPRESS_DATA);update.submit();}mstrApp.rootCtrl.generateToolbar();};if(panelKey!==VI_FILTERS||getFilterStack(model,builder)){fnShowPanel();}else{model.loadHiddenFilterStack(builder,function(){fnShowPanel();});}},changePanelsVisibility:function changePanelsVisibility(){var controller=this.controller,oldBoxLayout=controller._oldBoxLayout,panelNames=["propertiesPanel","editPanel"],panel,fnClosePanels=function(panels){panels.forEach(function(panelName){var panel=this.getViPanel(panelName);if(panel){panel.setOpenStatus(false,true,undefined,true);}},this);};if(mstrApp.isAppStatePresentation()){controller._oldBoxLayout=$HASH.clone(this.getBoxLayoutConfig().box);fnClosePanels.call(this,panelNames);if(IS_FILTER_PANEL_OPEN){controller._oldBoxLayoutWithFilter=$HASH.clone(this.getBoxLayoutConfig().box);}panel=this.getViPanel("filterPanel");var filterContents=panel&&panel.contents;if(filterContents&&filterContents.empty){panel.setOpenStatus(false,true,undefined,true);}this.model.updateRootDefn({root:{layoutXML:this.getBoxLayoutConfig().box}});}else{if(mstrApp.isAppStatePrintPreview()){controller._oldBoxLayout=$HASH.clone(this.getBoxLayoutConfig().box);fnClosePanels.call(this,["propertiesPanel","editPanel","filterPanel"]);this.model.updateRootDefn({root:{layoutXML:this.getBoxLayoutConfig().box}});}else{if(oldBoxLayout){this.model.updateRootDefn({root:{layoutXML:oldBoxLayout}});this.updateRootBoxLayout();delete controller._oldBoxLayout;delete controller._oldBoxLayoutWithFilter;}}}},syncFilterPanelStack:function syncFilterPanelStack(){var filterPanelStack=this.model.getVIComponent(mstrmojo.vi.models.VIComponentMap.TYPES.FILTER_STACK),filterPanel=this.getViPanel("filterPanel"),hasFilter=filterPanelStack&&filterPanelStack.isEmpty();if(IS_FILTER_PANEL_OPEN){if(hasFilter&&!filterPanel){applyBoxLayoutXML.call(this,this.controller._oldBoxLayoutWithFilter);this.buildBoxLayout();}if(!hasFilter&&filterPanel){filterPanel.setOpenStatus(false,true,undefined);}}},getBoxLayoutConfig:function getBoxLayoutConfig(){var boxLayoutConfig=this.boxLayoutConfig;if(boxLayoutConfig){updateBoxKey(boxLayoutConfig.box);}return boxLayoutConfig;},saveBoxLayout:function saveBoxLayout(cmd,stage,callback,update,extra){var model=this.model,boxLayoutConfig=this.getBoxLayoutConfig();if(boxLayoutConfig){callback=callback||{};$FUNC.wrapMethods({success:function(){model.updateRootDefn({root:{layoutXML:boxLayoutConfig.box}});}},callback);}this._super(cmd,stage,callback,update,undefined,extra);}});mstrmojo.vi.ui.rw.DocLayoutViewer.getViPanelType=function(type){return getPanelKeyFromType(type);};}());