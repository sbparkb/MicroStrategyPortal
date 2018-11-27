(function(){mstrmojo.requiresCls("mstrmojo.Container","mstrmojo._HasLayout","mstrmojo.SearchWidget","mstrmojo.dom","mstrmojo.Label","mstrmojo.VBox","mstrmojo.func","mstrmojo.hash","mstrmojo.vi._MonitorsAppState");mstrmojo.requiresClsP("mstrmojo.ui","_HasScroller","ScrollableList","Pulldown");mstrmojo.requiresClsP("mstrmojo.ui.menus","_HasMenuPopup","MenuConfig");mstrmojo.requiresClsP("mstrmojo.vi.ui","_IsDropTarget","_IsViPanel","_HasMask","PanelContents","PanelPortlet","DatasetPortlet","DatasetTableView","DatasetMDXView","DatasetUnitList","CollapsibleTitleBar");mstrmojo.requiresDescs(221,1158,1388,2461,3303,3581,5903,8708,11241,11307,11308);var $HASH=mstrmojo.hash,$DOM=mstrmojo.dom,ENUM_SOURCE=mstrmojo.vi.models.EnumDragSources;var datasetGroupPrefix="dsGroup_",$TEXT_ALL=mstrmojo.desc(2461,"All");function generateFilterNode(){var datasetPanel=this,pulldown=this.filter,datasetCount=this.getDatasetCount(),data=this.data,sourceGrid=this.gridSource,items=[{n:$TEXT_ALL,dsId:"",fScope:"",cls:"all"}],selectedIndex=0;if(datasetPanel.filterNodeConfig.att){items.push({n:mstrmojo.desc(3581,"Attributes"),dsId:"",fScope:"att",cls:"att"});}if(datasetPanel.filterNodeConfig.mx){items.push({n:mstrmojo.desc(1158,"Metrics"),dsId:"",fScope:"mx",cls:"mx"});}if(datasetCount>1){items.push({isSeparator:true,cls:"separator"});$HASH.forEach(data,function(dataset,id){items.push({n:dataset.name,dsId:id,fScope:"ds",cls:" ds "+(sourceGrid===id?"grid-source":"")});});}items.some(function(item,idx){if(!item.isSeparator&&datasetPanel._filterSelection===(item.dsId||item.fScope)){selectedIndex=idx;return true;}return false;});pulldown.set("items",items);pulldown.set("selectedIndex",selectedIndex);}function generateDatasetPortlets(){var data=this.data,children=[],panelId=this.id,panel=this;$HASH.forEach(data,function(dataset,id){children.push(this.getDatasetPortlet(dataset,id,panel,panelId));},this);var datasetsContainer=this.contents;var oldChildren=[].concat(datasetsContainer.children||[]);datasetsContainer.removeChildren();oldChildren.forEach(function(oldChild){oldChild.destroy();});datasetsContainer.addChildren(children);this.doLayout();}function delayUpdateScrollbars(){var me=this;window.setTimeout(function(){me.updateScrollbars();},0);}mstrmojo.vi.ui.DatasetObjects=mstrmojo.declare(mstrmojo.Container,[mstrmojo._HasLayout,mstrmojo.ui.menus._HasMenuPopup,mstrmojo.vi.ui._IsDropTarget,mstrmojo.vi.ui._IsViPanel,mstrmojo.ui._HasScroller,mstrmojo.vi.ui._HasMask,mstrmojo.vi._MonitorsAppState],{scriptClass:"mstrmojo.vi.ui.DatasetObjects",importDataBox:null,markupString:'<div id="{@id}" class="mstrmojo-VIPanel mstrmojo-VIDatasetObjects {@cssClass}" style="{@cssText}"><div class="mstrmojo-VIPanel-titlebar"></div><div class="mstrmojo-VIPanel-search"><div><div><div class="filter-box" mstrAttach:click><div class="pdl"></div></div></div><div><div class = "search-box"></div></div></div></div><div class="mstrmojo-VIEditor-divider"></div><div class="mstrmojo-VIPanel-content-wrapper" style="overflow:hidden;"><div class="mstrmojo-VIPanel-content"></div></div><div class="mstrmojo-VIDND-mask"></div><div class="mstrmojo-object-browser-content"></div><div class="mstrmojo-VIPanel-handle splitter v"></div></div>',markupSlots:{titlebarNode:function titlebarNode(){return this.domNode.firstChild;},searchNode:function searchNode(){return this.domNode.childNodes[1];},filterNode:function filterNode(){return this.domNode.childNodes[1].firstChild.firstChild.firstChild;},searchBox:function searchBox(){return this.domNode.childNodes[1].firstChild.childNodes[1].firstChild;},dividerNode:function dividerNode(){return this.domNode.childNodes[2];},containerNode:function containerNode(){return this.domNode.childNodes[3].firstChild;},maskNode:function maskNode(){return this.domNode.childNodes[4];},browserNode:function browserNode(){return this.domNode.childNodes[5];},handleNode:function handleNode(){return this.domNode.lastChild;}},layoutConfig:{h:{titlebarNode:"19px",searchNode:"39px",containerNode:"100%",browserNode:"0"},w:{titlebarNode:"100%",searchNode:"100%",containerNode:"100%",browserNode:"0"},xt:true},filterNodeConfig:{att:true,mx:true},getLinksForEmptyData:function getLinksForEmptyData(){return[];},markupMethods:{onvisibleChange:function onvisibleChange(){this.domNode.style.display=(this.visible)?this.cssDisplay:"none";if(this.visible){this.raiseEvent({name:"showPanel"});}},ondataChange:function ondataChange(){var data=this.data,importDataBox=this.importDataBox;if(!data||!Object.keys(data).length){if(!importDataBox){var children=this.getLinksForEmptyData();if(children.length){this.addChildren([{scriptClass:"mstrmojo.VBox",alias:"importDataBox",cssClass:"importDataBox",children:children}]);}}}else{if(importDataBox){this.removeChildren(importDataBox);importDataBox.destroy();}}generateDatasetPortlets.call(this);generateFilterNode.call(this);}},onAppStateChange:function onAppStateChange(evt){this._super(evt);this.set("isMasked",evt.value===mstrmojo.vi.VisualInsightApp.APP_STATES.SELECTOR_TARGETING);},doubleClickItemHandler:mstrmojo.emptyFn,datasetUnitListScriptClass:"mstrmojo.vi.ui.DatasetUnitList",onuseTableViewChange:function(){if(this.hasRendered){generateDatasetPortlets.call(this);}},getDatasetTableView:function getDatasetTableView(dataset,dsid){var me=this;return{alias:"tableView",scriptClass:"mstrmojo.vi.ui.DatasetTableView",panelId:this.id,docModel:this.model,unitListScriptClass:this.datasetUnitListScriptClass,dataset:{id:dsid,set:dataset},bindings:{filterScope:"this.parent.parent.filterScope",filterExpr:"this.parent.parent.filterExpr",level:"this.parent.level"},onTableCollapsedChange:function(){delayUpdateScrollbars.call(me);}};},getDatasetMDXView:function(dataset){var me=this;return{alias:"mdxView",scriptClass:"mstrmojo.vi.ui.DatasetMDXView",docModel:this.model,datasetsPanelId:this.id,unitListScriptClass:this.datasetUnitListScriptClass,data:dataset,bindings:{filterScope:"this.parent.parent.filterScope",filterExpr:"this.parent.parent.filterExpr",filterFunc:"this.parent.parent.parent.filterFunc",level:"this.parent.level"},onNodeCollapsedChange:function(){delayUpdateScrollbars.call(me);}};},getDatasetPortlet:function getDatasetPortlet(dataset,dsid,panel,panelId){var datasetObjects=this,fnGetDatasetUnits=function(){return[].concat(dataset.att).concat(dataset.mx);},fnUnitList=function(cfg){return $HASH.copy(cfg,{scriptClass:datasetObjects.datasetUnitListScriptClass,panelId:panelId,docModel:panel.model,bindings:{filterScope:"this.parent.parent.filterScope",filterExpr:"this.parent.parent.filterExpr",filterFunc:"this.parent.parent.parent.filterFunc",level:"this.parent.level + 1"},dataset:{id:dsid,set:dataset},postCreate:function postCreate(){this.doubleClickItem=mstrmojo.func.composite([this.doubleClickItem,datasetObjects.doubleClickItemHandler]);}});};var panelConfig={scriptClass:"mstrmojo.vi.ui.DatasetPortlet",dataset:dataset,title:dataset.name,alias:datasetGroupPrefix+dsid,did:dsid,level:0,panelId:panelId,useTableView:datasetObjects.useTableView&&dataset.tables&&dataset.tables.length>1,layoutConfig:{h:{titlebarNode:"35px",containerNode:"100%"},w:{titlebarNode:"100%",containerNode:"100%"},xt:true},getLayoutOffsets:function(){return{h:0,w:4};},onisCollapsedChange:function onisCollapsedChange(){delayUpdateScrollbars.call(datasetObjects);},getTitleBarCfg:function getTitleBarCfg(){return datasetObjects.getDatasetTitleBarCfg(this);}};if(this.model.isMDXDataset(dataset)){$HASH.copy({children:[this.getDatasetMDXView(dataset,dsid)],getSelectedItems:function(){return this.mdxView.getSelectedItems();},clearSelect:function(){this.mdxView.clearSelect();}},panelConfig);}else{if(panelConfig.useTableView){$HASH.copy({children:[this.getDatasetTableView(dataset,dsid)],getSelectedItems:function(){return this.tableView.getSelectedItems();},clearSelect:function(){this.tableView.clearSelect();}},panelConfig);}else{$HASH.copy({children:[fnUnitList({alias:"ulist",getAllItems:function getAllItems(){return fnGetDatasetUnits();}}),{scriptClass:"mstrmojo.Label",cssClass:"emptyIndicator",bindings:{visible:"!this.parent.ulist.items.length",text:function(){if(!this.visible){return"";}return this.parent.ulist.filterExpr?mstrmojo.desc(11904,"No matched object"):mstrmojo.desc(11905,"No object");}}}],getSelectedItems:function(){var list=this.ulist;return list.getSelectedItems();},clearSelect:function(){this.ulist.clearSelect();}},panelConfig);}}return panelConfig;},getDatasetTitleBarCfg:function(datasetPortlet){return datasetPortlet.constructor.prototype.getTitleBarCfg.call(datasetPortlet);},title:mstrmojo.desc(13965,"Dashboard Datasets"),titleBar:null,titlebarNode:null,containerNode:null,maskNode:null,filterNode:null,contents:null,data:null,model:null,dropZone:true,isSearching:false,init:function(props){this.children=[{scriptClass:"mstrmojo.vi.ui.CollapsibleTitleBar",slot:"titlebarNode",alias:"titleBar",editTitleOnDoubleClick:false,close:function close(){this.parent.setOpenStatus(false);},onclick:function(){this.parent.clickOnCollapsibleTitleBar();},bindings:{title:"this.parent.title"}},{scriptClass:"mstrmojo.vi.ui.PanelContents",alias:"contents",slot:"containerNode"},{scriptClass:"mstrmojo.SearchWidget",slot:"searchBox",alias:"search",quickSearch:true,onsearch:function onsearch(pattern){this.parent.contents.set("filterExpr",pattern);this.parent.toggleAllNodesCollapsed(false,false);this.parent.isSearching=true;},onclear:function onclear(){this.parent.contents.set("filterExpr","");this.parent.recoverAllNodesCollapsed();this.parent.isSearching=false;}},{scriptClass:"mstrmojo.ui.Pulldown",slot:"filterNode",alias:"filter",onitemSelected:function onitemSelected(){var datasetId=this.getSelectedItem().dsId,filterScope=this.getSelectedItem().fScope,textNode=this.selectedNode,parent=this.parent,contents=parent.contents;if(textNode){textNode.className="mstrmojo-ui-Pulldown-text "+filterScope;}$HASH.forEach(parent.data,function(dataset,key){var unitList=contents[datasetGroupPrefix+key];if(unitList){unitList.set("visible",!datasetId||key===datasetId);if(key===datasetId){unitList.togglePortlet(false);}}});contents.set("filterScope",filterScope);parent._filterSelection=datasetId||filterScope;parent.onDatasetFilterChange(datasetId);},getPopupListConfig:function getPopupListConfig(){return $HASH.copy({useRichTooltip:true,showTooltip:function showTooltip(e,win){var target=$DOM.eventTarget(win,e),node=this.getItemNodeFromTarget(target);if(node&&(node.scrollWidth>node.clientWidth)){this.constructor.prototype.showTooltip.call(this,e,win);}}},this.constructor.prototype.getPopupListConfig.call(this));}}];this._super(props);},allowDrop:function allowDrop(context){var dragData=context.src.data,result=!!(dragData&&dragData.src===ENUM_SOURCE.VIZ_EDITOR)||!!(dragData&&dragData.src===ENUM_SOURCE.FILTERS)||!!(dragData&&dragData.src===ENUM_SOURCE.VIZ);if(dragData!==undefined&&dragData.allowDropOnTarget!==undefined){result&=dragData.allowDropOnTarget(ENUM_SOURCE.DATASETS);}return result;},ondrop:function ondrop(context){var data=context.src.data,items=data.items;if(data){data.onRemove(items&&items.length>1?items:data.item);}},getDropAvatarIcon:function getDropAvatarIcon(context){var dragData=context.src.data,iconCls="unselectable";if(dragData.src===ENUM_SOURCE.VIZ_EDITOR||dragData.src===ENUM_SOURCE.FILTERS||dragData.src===ENUM_SOURCE.VIZ){iconCls="remove";}return iconCls;},ongridSourceChange:function(){generateFilterNode.call(this);},clickOnCollapsibleTitleBar:mstrmojo.emptyFn,getPanelSelectedItems:function getPanelSelectedItems(){var contents=this.contents;return $HASH.keyarray(this.data).reduce(function(items,dsid){var dsPortlet=contents[datasetGroupPrefix+dsid];return items.concat(dsPortlet.getSelectedItems(dsid));},[]);},doLayout:function doLayout(){if(!this.visible){return ;}this._super();},getLayoutOffsets:function getLayoutOffsets(){return{h:0,w:($DOM.isChrome||$DOM.isFF)?2:1};},updateDatasets:function updateDatasets(datasetsInfo){var contents=this.contents,data=this.data;$HASH.forEach(datasetsInfo,function(dataset,key){var unitList=contents[datasetGroupPrefix+key].ulist,newData=datasetsInfo[key];if(unitList&&newData){unitList.set("dataset",{id:key,set:dataset});data[key]=dataset;}});},getDatasetPanel:function(dsid){return this.contents[datasetGroupPrefix+dsid];},addPopupHandlers:function addPopupHandlers(config,fnOpen,fnClose){config.addPopupHandlers(this.id,fnOpen,fnClose);},setupScrollNodes:function setupScrollNodes(){this.scrollNode=this.containerNode;},getDatasetCount:function getDatasetCount(){return $HASH.keyarray(this.data).length;},onDatasetFilterChange:function(){this.updateScrollbars();},toggleAllNodesCollapsed:function(isCollapsed,changeSetting){var panel=mstrmojo.all[this.id],dsoSettings=panel.settings,hasSingleDataset=(panel.contents.children||[]).length===1;(panel.contents.children||[]).forEach(function(child){var dsInfo=dsoSettings&&dsoSettings.dataset(child.did),view=child.tableView||child.mdxView;if(changeSetting){dsInfo.isCollapsed=hasSingleDataset?false:isCollapsed;}child.togglePortlet(hasSingleDataset?false:isCollapsed);if(view){view.toggleAllNodesCollapsed(isCollapsed,changeSetting);}});this.updateScrollbars();if(changeSetting){panel.saveSettings();}},recoverAllNodesCollapsed:function(){var panel=mstrmojo.all[this.id],dsoSettings=panel.settings;(panel.contents.children||[]).forEach(function(child){var dsInfo=dsoSettings&&dsoSettings.dataset(child.did),view=child.tableView||child.mdxView;child.togglePortlet(dsInfo?dsInfo.getCollapsed():child.defaultCollapsed?child.defaultCollapsed:false);if(view){view.toggleAllNodesCollapsed(null,null,true);}});this.updateScrollbars();}});}());