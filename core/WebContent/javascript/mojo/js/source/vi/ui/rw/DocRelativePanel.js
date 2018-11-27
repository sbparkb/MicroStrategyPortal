(function(){mstrmojo.requiresCls("mstrmojo.DocPanel","mstrmojo.vi.ui._HasBoxLayout","mstrmojo.ui._HasScroller","mstrmojo.vi._MonitorsAppState","mstrmojo.vi.ui.BoxLayoutConfig","mstrmojo.vi.ui.rw.VizBox","mstrmojo.vi.ui.rw.FilterBox","mstrmojo.func","mstrmojo.hash","mstrmojo.string","mstrmojo.boxmodel","mstrmojo.models.FormatModel","mstrmojo.vi.models.EnumDragSources","mstrmojo.css");var $FUNC=mstrmojo.func,$HASH=mstrmojo.hash,$CSS=mstrmojo.css,$STR=mstrmojo.string,$DRAG_SRC=mstrmojo.vi.models.EnumDragSources,$PORTAL_STATES=mstrmojo.vi.ui.rw.VizBox.ENUM_PORTAL_STATE,$FORMAT_MODEL=mstrmojo.models.FormatModel,$GET_FORMAT_OBJ=$FORMAT_MODEL.getFormatUpdate,$ENUM_FORMAT_PROPERTIES=$FORMAT_MODEL.ENUM_PROPERTY_NAMES;function addBoxFormatActions(actions,skipPartialRetrieval){actions=actions||[];(this.children||[]).forEach(function(child){var childPositionProps=child.addFormatProps(undefined,skipPartialRetrieval);if(childPositionProps){actions.push(childPositionProps);}});return actions;}function addBoxLayoutAction(actions,skipPartialRetrieval){actions.push(this.model.getUnitFormatAction(this,1,$GET_FORMAT_OBJ($ENUM_FORMAT_PROPERTIES.LAYOUT_XML,this.boxLayoutConfig.getBoxState()),skipPartialRetrieval));return actions;}function generateChildToolbars(){(this.children||[]).forEach(function(child){child.generateToolbar();});}function raisePanelDisplaying(){if(this.visible){this.raiseEvent({name:"panelDisplaying"});}}function toggleDragAllowedStatus(show){$CSS.toggleClass(this.domNode,"undraggable-uc",show);}function toggleHighlight(){var appStates=mstrmojo.vi.VisualInsightApp.APP_STATES,presentationMode=appStates.PRESENTATION,isPresentationMode=mstrApp.appState===presentationMode,dNode=this.domNode;$CSS.toggleClass(this.domNode,"pulse",!isPresentationMode);setTimeout(function(){$CSS.toggleClass(dNode,"pulse",false);},500);}mstrmojo.vi.ui.rw.DocRelativePanel=mstrmojo.declare(mstrmojo.DocPanel,[mstrmojo.vi.ui._HasBoxLayout,mstrmojo.ui._HasScroller,mstrmojo.vi._MonitorsAppState],{scriptClass:"mstrmojo.vi.ui.rw.DocRelativePanel",formatHandlers:null,childPadding:4,allowPanelEdgeTargeting:true,children:null,model:null,titleText:null,subPanelCssText:"position:absolute;",markupString:'<div id="{@id}" class="mstrmojo-DocPanel {@cssClass}" style="{@cssText}{@domNodeCssText}"><div class="mstrmojo-DocSubPanel-content" style="{@containerNodeCssText}{@subPanelCssText}"><div></div></div></div>',markupSlots:{containerNode:function(){return this.domNode.firstChild.firstChild;}},init:function init(props){this._super(props);$CSS.addWidgetCssClass(this,"mstrmojo-VIDocRelativePanel");var id=this.id;this.controller.view.getLayout(this.node.defn._lkz).attachEventListener("layoutRedisplay",id,function(){if(this.selected){raisePanelDisplaying.call(this);}});this.markupMethods=$FUNC.override({onvisibleChange:function(){this._super();if(this.visible){generateChildToolbars.call(this);}raisePanelDisplaying.call(this);}},$HASH.copy(this.markupMethods));this.boxLayoutConfig=new mstrmojo.vi.ui.BoxLayoutConfig({hostId:id,padding:this.childPadding,needsValidation:true,getBoxChildClass:function(boxChild){return mstrmojo.all[id].getBoxLayoutChild(boxChild).scriptClass;}});this.model.attachEventListener("viIconTabClicked",id,function(evt){var hgl=this.model.hgl;if(evt.id=="vi_flt"&&!!hgl==0){toggleHighlight.call(this);}});},onremoveChild:function onremoveChild(){toggleDragAllowedStatus.call(this,!this.hasMultipleChildren());},onaddChild:function onaddChild(){toggleDragAllowedStatus.call(this,!this.hasMultipleChildren());},setupScrollNodes:function setupScrollNodes(){this.scrollNode=null;this.scrollbarHostNode=null;},isPanelDisplaying:function(){return this.selected&&this.node.defn._lkz===this.model.getCurrentLayoutKey();},getLayoutOffsets:function getLayoutOffsets(){return{h:8,w:8};},getBoxLayoutChild:function getBoxLayoutChild(boxChild){var box=this._super(boxChild);if(!box){return this.getUnitByKey(boxChild.k);}return box;},addChildren:function addChildren(children,idx,silent){this._super(children,idx,silent);var model=this.model,keyMap=model.findKeyMap(this.node);if(keyMap){var isReplaced=this.boxLayoutConfig.replaceLayoutXmlKeys(keyMap);if(isReplaced){var keyBoxes=model.replaceKeyBoxes=model.replaceKeyBoxes||[];keyBoxes.push(this);}}this.buildBoxLayout();},refresh:function refresh(){this.boxLayoutConfig.dirty=true;this._super();this.buildBoxLayout();},update:function update(node){var defn=node.defn,layoutXML=defn&&defn.layoutXML,boxLayoutConfig=this.boxLayoutConfig;if(layoutXML){boxLayoutConfig.box=layoutXML;}else{this.defn.layoutXML=boxLayoutConfig.useDefaultBox(node.data.objects||[]);}this.title=defn&&defn.ttl;this.titleText=$STR.decodeHtmlString(this.title);},hasMultipleChildren:function hasMultipleChildren(){return(this.children.length>1);},getSplitterHost:function getSplitterHost(){return this.containerNode;},getTargetKeysByType:function getTargetKeysByType(types){return(this.children||[]).filter(function(child){return(types||[]).indexOf(parseInt(child.defn.t,10))>-1;}).map(function(child){return child.k;});},getTargetKeysExcludingTypes:function getTargetKeysExcludingTypes(types){return(this.children||[]).filter(function(child){return(types||[]).indexOf(parseInt(child.defn.t,10))<0;}).map(function(child){return child.k;});},insertNewBoxAndSaveDeferred:function(update,box,actions,callback,targetBox,edge){var id=this.id;this.addChildren([box]);this._super(update,box,actions,$FUNC.wrapMethods({failure:function(){mstrmojo.all[id].removeChildren(box);box.destroy();}},callback),targetBox,edge);},addUnit:function addUnit(unit,targetBox,edge,update,skipPartialRetrieval){this.addChildren([unit]);var newChild=this.insertNewBox(unit,targetBox,edge,update);if(update){this.addSaveBoxLayoutActions(update,skipPartialRetrieval);}return newChild;},setPortalState:function setPortalState(box,state,silent){var id=this.id,model=this.model,boxDefn=box.defn,oldState=boxDefn.ds,portalChangeCallback=function(currentState){var relativePanel=mstrmojo.all[id];if(!mstrmojo.all[box.id]){var boxKey=box.k;mstrmojo.array.forEach(relativePanel.children,function(child){if(child.k===boxKey){box=child;return false;}});}if(!mstrmojo.all[box.id]){return ;}var isStateMaximized=box.isMaxed=currentState===$PORTAL_STATES.MAXIMIZE,newZIndex=isStateMaximized?2:1;if(isStateMaximized){relativePanel.maximizedBox=box;}else{if(currentState===$PORTAL_STATES.RESTORE){delete relativePanel.maximizedBox;}}toggleDragAllowedStatus.call(this,box.isMaxed);box.set("zIndex",newZIndex);boxDefn.ds=currentState;relativePanel.buildBoxLayout();box.generateToolbar();};if(!silent){model.controller.cmdMgr.execute({execute:function execute(){var relativePanel=mstrmojo.all[id],isStateMaximized=state===$PORTAL_STATES.MAXIMIZE,newZIndex=isStateMaximized?2:1,actions=[model.getUnitFormatAction(box,1,{FormattingOrder:{ZIndex:newZIndex},FormattingView:{WindowState:state}})];addBoxFormatActions.call(relativePanel,actions);this.submit(actions,{failure:function failure(){portalChangeCallback(oldState);}},{params:{suppressData:true}});portalChangeCallback(state);},urInfo:{silent:true,undo:function undo(){portalChangeCallback(oldState);},redo:function redo(){portalChangeCallback(state);}}});}else{portalChangeCallback(state);}},buildBoxLayout:function buildBoxLayout(animate,newBoxState){if(!this.visible){return ;}if(!this.children){return ;}var boxLayoutConfig=this.boxLayoutConfig;if(boxLayoutConfig.needsValidation){var children=this.children;if(!boxLayoutConfig.validateBoxLayout(children)){this.defn.layoutXML=boxLayoutConfig.useDefaultBox(children);}boxLayoutConfig.needsValidation=false;}this._super(animate,newBoxState);var maximizedBox=this.maximizedBox;if(maximizedBox){maximizedBox.updateLayout({left:"0px",top:"0px",height:this.height,width:this.width});}},endBoxMove:function endBoxMove(context,boxChild){this._super(context,boxChild);this.getSplitterHost().appendChild(boxChild.domNode);},getChildPositionActions:function getChildPositionActions(skipPartialRetrieval){return addBoxFormatActions.call(this,[],skipPartialRetrieval);},getBoxLayoutActions:function getBoxLayoutActions(skipPartialRetrieval){return addBoxLayoutAction.call(this,[],skipPartialRetrieval);},getBoxLayoutSaveCallback:function getBoxLayoutSaveCallback(){var id=this.id;return{success:function(){generateChildToolbars.call(mstrmojo.all[id]);}};},addSaveBoxLayoutActions:function addSaveBoxLayoutActions(update,skipPartialRetrieval){var id=this.id,actions=update.actions;addBoxFormatActions.call(this,actions,skipPartialRetrieval);addBoxLayoutAction.call(this,actions,skipPartialRetrieval);update.addCallbacks({success:function(){generateChildToolbars.call(mstrmojo.all[id]);}});},saveBoxLayout:function saveBoxLayout(cmd,stage,callback,update,skipPartialRetrieval){this._super(cmd,stage,callback,update,skipPartialRetrieval);this.defn.layoutXML=this.boxLayoutConfig.box;if(update){update.addCallbacks(this.getBoxLayoutSaveCallback());}},postBuildBoxLayout:function postBuildBoxLayout(){var selectedUnitKey=this.model.getLatestSelectedViUnitKey(),unit=selectedUnitKey&&this.getUnitByKey(selectedUnitKey);if(unit){this.model.selectVIUnit(unit.id);}else{this.selectFirstBox();}},selectFirstBox:function selectFirstBox(){var firstBoxId=this.firstBoxId;if(this.visible&&firstBoxId){this.model.selectVIUnit(firstBoxId);}},selectVIUnit:function selectVIUnit(viUnit,forceSelection){var tgtSelections=this._tgtSelections,rtn=true;if(tgtSelections){if(viUnit.id===tgtSelections.id){rtn=false;}else{rtn=tgtSelections.toggleSelection(viUnit.k);tgtSelections.notify();}}else{this.model.selectVIUnit(viUnit.id,forceSelection);}return rtn;},getUnitByKey:function getUnitByKey(key){return(this.children||[]).filter(function(unit){return unit.k===key;})[0];},enterTargetSelectionMode:function enterTargetSelectionMode(fnCallback,filterId,targetKeys){if(!this._tgtSelections){this.children.forEach(function(child){child.set("enabled",child.id===filterId||child instanceof mstrmojo.vi.ui.rw.VizBox||child instanceof mstrmojo.vi.ui.rw.FilterBox);});var model=this.model,origId=model.getSelectedViUnit().id,unitCache={},fnGetKeys=function(){return $HASH.keyarray(unitCache).filter(function(key){return unitCache[key];});};this._tgtSelections={id:filterId,notify:function(isDone){fnCallback(fnGetKeys(),!!isDone);},toggleSelection:function(id){unitCache[id]=!unitCache[id];return unitCache[id];},restore:function(){model.selectVIUnit(origId,true);}};model.selectVIUnit("");(targetKeys||[]).forEach(function(tgtKey){model.getUnitInstance(tgtKey,1).parent.selectVIUnit();},this);}},exitTargetSelectionMode:function exitTargetSelectionMode(isDone){var tgtSelections=this._tgtSelections;if(tgtSelections){delete this._tgtSelections;this.children.forEach(function(child){child.set("enabled",true);});tgtSelections.restore();if(isDone){tgtSelections.notify(isDone);}}},unload:function unload(){this.destroyChildren();this.defn.l=false;this.builtChildren=false;},getPanelTargetEdge:function getPanelTargetEdge(context){if(context.src.widget.parent!==this&&context.getCtxtDragData().src!==$DRAG_SRC.FILTERS){return"";}return this._super(context);},dropBox:function dropBox(context,targetBox,edge,saveLayout){saveLayout=false;this._super(context,targetBox,edge,saveLayout);var panel=this,model=panel.model,dataService=mstrmojo.DocDataService;var uiState=model.getUIState();uiState[$HASH.keyarray(uiState)[0]].boxState=$HASH.clone(context.box.initState);model.execute({execute:function(){panel.saveBoxLayout(this);},urInfo:{callback:dataService.EMPTY_CALLBACK,extras:dataService.SUPPRESS_DATA},undoUIState:uiState});}});mstrmojo._HasMarkup.addMarkupMethods(mstrmojo.vi.ui.rw.DocRelativePanel,{onheightChange:mstrmojo.Widget.heightMarkupMethod,onwidthChange:mstrmojo.Widget.widthMarkupMethod});}());