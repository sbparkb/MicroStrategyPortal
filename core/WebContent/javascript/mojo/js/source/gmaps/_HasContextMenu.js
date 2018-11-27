(function(){mstrmojo.requiresCls("mstrmojo.dom","mstrmojo.array","mstrmojo.hash","mstrmojo.vi.viz.EnumDSSDropZones","mstrmojo.ui.menus.MenuConfig","mstrmojo.vi.viz.MapHelper");mstrmojo.requiresDescs(11701,3946,11476,13272,13273,5752);var $ARR=mstrmojo.array,$H=mstrmojo.hash,$MH=mstrmojo.vi.viz.MapHelper,GEOZONE_ID=mstrmojo.vi.viz.EnumDSSDropZones.GeoAttribute,TOOLTIP_ID=mstrmojo.vi.viz.EnumDSSDropZones.AdditionalMetrics,GEOROLE_LAT=5,GEOROLE_LNG=6,DRILL_DOWN=1,ROLE_HIERARCHY={3:2,2:9,9:8};function getDrillTargetRole(drillDirection,curRole){if(drillDirection===DRILL_DOWN){return ROLE_HIERARCHY[curRole];}else{var p;$H.forEach(ROLE_HIERARCHY,function(v,k){if(v===curRole){p=k;return false;}});return parseInt(p,10);}}function onMenuClose(config){var host=mstrmojo.all[this.popupConfig.hostId],gridDataViewers=host.getGridDataViewers(),i,viewer,count=gridDataViewers?gridDataViewers.length:0,me=this;for(i=0;i<count;i++){viewer=gridDataViewers[i];viewer.clearTempSelections();}if(!this.processed){host.restoreSelectionDataOnly();window.setTimeout(function(){if(host.contextMenu!==me&&!!host.contextMenu.mouseOnUnSelectedGraphic){return ;}host.restoreSelectionEffects();host.clearSelectionBackup();},200);}else{host.clearSelectionBackup();}}function validGeoAttribute(attr,isESRIMap){var validGeoRole=0,hasLat=false,hasLng=false,fgr,fnm;$ARR.forEach(attr.fs,function(form){fgr=form.fgr;fnm=form.fnm;if(fgr>0&&fgr!==GEOROLE_LAT&&fgr!==GEOROLE_LNG&&isESRIMap){validGeoRole=fgr;return false;}else{if(fgr===GEOROLE_LAT||(fnm&&fnm.toLowerCase().indexOf("latitude")>-1)){hasLat=true;}else{if(fgr===GEOROLE_LNG||(fnm&&fnm.toLowerCase().indexOf("longitude")>-1)){hasLng=true;}}}});return !!validGeoRole||(hasLat&&hasLng);}function findDrillableGeoUnits(datasets,datasetId){var i,n,dataset=datasets[datasetId],atts=dataset.att,currentGeoAttId,dzModel=this.zonesModel,zone=dzModel.getZoneModelByZoneId(GEOZONE_ID),rtn=[],isESRIMap=this.isESRIMap;zone.items.forEach(function(it){currentGeoAttId=it.did;return false;});for(i=0,n=atts.length;i<n;i++){if((currentGeoAttId&&atts[i].did!==currentGeoAttId)&&validGeoAttribute(atts[i],isESRIMap)){rtn.push(atts[i]);}}return rtn;}function getDrillUnitGeoRole(drillUnit,isAreaGeoRole){var geoRole=0;if(drillUnit){if(drillUnit.fgr){return drillUnit.fgr;}else{if(drillUnit.fs){$ARR.forEach(drillUnit.fs,function(form){if(form.fgr>0){if(isAreaGeoRole){if($MH.isGeoRoleSupportArea(form.fgr)){geoRole=form.fgr;return false;}}else{geoRole=form.fgr;return false;}}});return geoRole;}}}}function getGeoRoleUnit(datasets,datasetId,geoRole){var dataset=datasets[datasetId],atts=dataset.att,unit,i,len,form;$ARR.forEach(atts,function(att){for(i=0,len=att.fs.length;i<len;i++){form=att.fs[i];if(parseInt(form.fgr)===parseInt(geoRole)){unit={did:att.did,t:att.t,fgr:geoRole};break;}}if(unit){return false;}});return unit;}mstrmojo.gmaps._HasContextMenu={_mixinName:"mstrmojo.gmaps._HasContextMenu",EnumContextMenuTargetType:{GeoGraphic:1,BlankSpace:2,DensityGraphic:3,SelectionArea:4},contextMenu:null,selectionBackUp:null,showMenu:function showMenu(event,targetConfig){var cfg=this.getMenuConfig(targetConfig),contextObj,i,selected=false,gridViewers=this.getGridDataViewers(),gridViewer,contextObjLayerKey;if(!cfg.hasMenuItems()){return false;}else{cfg.hostId=this.id;cfg.isHostedWithin=false;cfg.position=this.getMousePositionFromEvent(event);var menu=cfg.newInstance();menu.onClose=onMenuClose;menu.processed=false;this.contextMenu=menu;if(targetConfig&&targetConfig.type===this.EnumContextMenuTargetType.GeoGraphic){contextObj=targetConfig.object;selected=this.isObjectSelected(contextObj);contextObjLayerKey=contextObj.attributes.layerKey;}else{if(targetConfig&&targetConfig.type===this.EnumContextMenuTargetType.DensityGraphic){contextObj=targetConfig.object;for(i=0;i<contextObj.length;i++){selected=this.isObjectSelected(contextObj[i]);contextObjLayerKey=contextObj[i].attributes.layerKey;if(selected){break;}}}}if(targetConfig&&(targetConfig.type===this.EnumContextMenuTargetType.GeoGraphic||targetConfig.type===this.EnumContextMenuTargetType.DensityGraphic)&&!selected){this.backupSelections();this.clearOldSelections();if(gridViewers){for(i=0;i<gridViewers.length;i++){gridViewer=gridViewers[i];if(contextObjLayerKey===gridViewer.k){gridViewer.addTempSelections(targetConfig.object);}}}this.contextMenu.mouseOnUnSelectedGraphic=true;}}this.openPopup(this.contextMenu);return true;},getMenuConfig:function getMenuConfig(targetConfig){var gridViewers=this.getGridDataViewers(),gridViewer,i,selectedRowIndices,hasSelection=false;if(gridViewers){for(i=0;i<gridViewers.length;i++){gridViewer=gridViewers[i];selectedRowIndices=gridViewer.getSelectedRowIndices(gridViewer.getGeoColumnIndex());if(selectedRowIndices&&selectedRowIndices.length>0){hasSelection=true;break;}}}var cfg=new mstrmojo.ui.menus.MenuConfig(),me=this,drillableUnits;if((targetConfig&&targetConfig.type===this.EnumContextMenuTargetType.GeoGraphic)||(targetConfig&&targetConfig.type===this.EnumContextMenuTargetType.DensityGraphic)){if(mstrApp&&mstrApp.isVI){if(this.canDoMultiSelect()){cfg.addMenuItem(mstrmojo.desc(11701,"Keep only"),"xt",this.getMenuHandler("keepOnly"));cfg.addMenuItem(mstrmojo.desc(3946,"Exclude"),"xt",this.getMenuHandler("exclude"));drillableUnits=findDrillableGeoUnits.call(this,this.model.docModel.datasets,me.model.data.datasetId);if(drillableUnits&&drillableUnits.length>0){cfg.addPopupMenuItem(mstrmojo.desc(145,"Drill"),this.id,function(){var n=drillableUnits.length,subMenu=new mstrmojo.ui.menus.MenuConfig(),i;for(i=0;i<n;i++){subMenu.addMenuItem(drillableUnits[i].n,"xt",me.getMenuHandler("drill"),{drillUnit:drillableUnits[i]});}return subMenu;},"xt");}cfg.addSeparator();}cfg.addMenuItem(mstrmojo.desc(11476,"Show Data"),"xt",this.getMenuHandler("showData"));}}if(this.isMapEnabledAffinityLine()){if(cfg.hasMenuItems()){cfg.addSeparator();}if(targetConfig&&targetConfig.type===this.EnumContextMenuTargetType.GeoGraphic){cfg.addMenuItem(mstrmojo.desc(13650,"Hide affinity lines"),"xt",this.getMenuHandler("drawAffinityLines",targetConfig.object));}else{cfg.addMenuItem(mstrmojo.desc(13651,"Show affinity lines"),"xt",this.getMenuHandler("showAllAffinityLines"));}}if((hasSelection||(targetConfig&&targetConfig.type===this.EnumContextMenuTargetType.GeoGraphic)||(targetConfig&&targetConfig.type===this.EnumContextMenuTargetType.DensityGraphic))&&!(mstrApp&&mstrApp.isVI)){if(this.isMapDrillEnabled()){if(cfg.hasMenuItems()){cfg.addSeparator();}cfg.addMenuItem(mstrmojo.desc(5752,"Links"),"xt",this.getMenuHandler("linkDrill"));}}if(hasSelection&&targetConfig&&targetConfig.type===this.EnumContextMenuTargetType.BlankSpace){cfg.addMenuItem(mstrmojo.desc(1763,"Clear All"),"xt",this.getMenuHandler("clearAll"));}return cfg;},getMenuHandler:function(name,targetObj){var handler;if(this._super){handler=this._super(name,targetObj);}if(handler!==mstrmojo.emptyFn){return handler;}var _this=this,param=targetObj,handlers={keepOnly:function selectionKeepOnly(){_this.processCommon();_this.processKeepOnly();},drill:function drillWithin(menuItem){_this.processCommon();_this.processDrillWithin(menuItem);},exclude:function selectionExclude(){_this.processCommon();_this.processExclude();},showData:function showData(){_this.processCommon();_this.processShowData();},linkDrill:function linkDrill(){_this.processCommon();_this.processDrill();},drawAffinityLines:function drawAffinityLines(){_this.processCommon();_this.drawAffinityLines(param);},showAllAffinityLines:function showAllAffinityLines(){_this.processCommon();_this.drawAllAffinityLines();},clearAll:function removeAllSelections(){_this.processCommon();_this.processRemoveAllSelections();}};if(handlers.hasOwnProperty(name)){return handlers[name];}return mstrmojo.emptyFn;},getMousePositionFromEvent:function getMousePositionFromEvent(event){return{x:0,y:0};},getGridDataViewers:function getGridDataViewer(){return null;},processCommon:function processCommon(){this.contextMenu.processed=true;},processKeepOnly:function processKeepOnly(){this.updateAfterKeepOnly(true);},processDrillTo:function processDrillTo(drillDirection){var dzModel=this.zonesModel,zone=dzModel.getZoneModelByZoneId(GEOZONE_ID),geoRole=getDrillUnitGeoRole(zone.items[0]),xtabData=this.model.data,datasetId=xtabData.datasetId,xtabData=this.model.data,shapeConfig=mstrmojo.gmaps.MapPropertiesHelper.getMatchingShape(this.gridParams.config.shapes,null,geoRole),targetRole=getDrillTargetRole(drillDirection,geoRole),unit;if(targetRole&&shapeConfig){unit=getGeoRoleUnit(this.model.docModel.datasets,datasetId,targetRole);}if(unit){this.processDrillWithin({ctxt:{drillUnit:unit}});}},processDrillWithin:function processDrillWithin(menuItem){var drillUnit=menuItem.ctxt.drillUnit,selections=this.getSelections(),xtabData=this.model.data,actions=[],dzModel=this.zonesModel,unitItem={did:drillUnit.did,t:drillUnit.t},geoAttrZone={id:GEOZONE_ID},tooltipZone={id:TOOLTIP_ID},callback=this.model.docModel.controller._getXtabCallback(this),datasetId=xtabData.datasetId,METRIC_NAMES_ID="00000000000000000000000000000000",METRIC_NAMES_UNIT_TYPE=0,DATASET_TYPE=3,key=this.k,shapeConfig,geoRole,extras={datasetId:datasetId,datasetType:datasetId===METRIC_NAMES_ID?METRIC_NAMES_UNIT_TYPE:DATASET_TYPE},widgetProp=xtabData.vp;if(selections.length>0){var fromUnitItem=null,zone=dzModel.getZoneModelByZoneId(GEOZONE_ID),fromUnitID=selections[selections.length-1][0].tid;$ARR.forEach(zone.items,function(it){if(it.did===fromUnitID){fromUnitItem=it;return false;}});if(fromUnitItem){var dropInfo={allowedItems:[drillUnit],idx:0,edge:1,item:drillUnit,removeReplaced:true};var updateTemplateActions=this.zonesModel.getDropActions(zone,dropInfo,datasetId);if(updateTemplateActions&&updateTemplateActions.actions&&updateTemplateActions.actions.length>0){actions=actions.concat(updateTemplateActions.actions);}}}else{return ;}geoRole=getDrillUnitGeoRole(drillUnit,true);if(this.gridParams&&this.gridParams.config&&geoRole){shapeConfig=mstrmojo.gmaps.MapPropertiesHelper.getMatchingShape(this.gridParams.config.shapes,null,geoRole);if(shapeConfig&&shapeConfig.sfr){unitItem=getGeoRoleUnit(this.model.docModel.datasets,datasetId,shapeConfig.sfr);if(unitItem){$ARR.insert(actions,null,dzModel.getAddDropZoneUnitsActions(tooltipZone,[unitItem],dzModel.getItemCountInZone(TOOLTIP_ID),extras));}}}if(!!widgetProp.sa){widgetProp.sa=undefined;}if(!!widgetProp.mtp){widgetProp.mtp=undefined;}if(!!widgetProp.sm){widgetProp.sm=undefined;}if(geoRole&&this.isESRIMap){widgetProp.sa="1";}var actionList=[{act:"updateTemplate",keyContext:key,actions:actions}];actionList.push(dzModel.getWidgetPropsAction());this.updateAfterDrill(actionList,callback);},processExclude:function processExclude(){this.updateAfterKeepOnly(false);},processShowData:function processShowData(){var viewers=this.getGridDataViewers(),viewerCount=viewers?viewers.length:0;for(var i=0;i<viewerCount;i++){var grid=viewers[i];grid.showData();}},processRemoveAllSelections:function processRemoveAllSelections(){if(this.clearMarkerSelections){this.clearMarkerSelections();}},processDrill:function processDrill(){var viewers=this.getGridDataViewers(),viewerCount=viewers?viewers.length:0;for(var i=0;i<viewerCount;i++){viewers[i].processDrill();}},isMapEnabledAffinityLine:function isMapEnabledAffinityLine(){for(var i=0;i<this.gridDataViewer.length;i++){if(this.gridDataViewer[i].isAffinityLinesEnabled()){return true;}}return false;},isMapDrillEnabled:function isMapDrillEnabled(){for(var i=0;i<this.gridDataViewer.length;i++){if(this.gridDataViewer[i].isViewerDrillable()){return true;}}return false;},drawAffinityLines:function drawAffinityLines(marker){if(!marker||!marker.attributes||!marker.attributes.id){return ;}var i,sourceIds={},id=marker.attributes.id,viewers=this.getGridDataViewers(),viewerCount=viewers?viewers.length:0;for(i=0;i<viewerCount;i++){var grid=viewers[i];if(marker.attributes.layerKey===grid.k){sourceIds[grid.getElementIdWithoutAttributeID(id)]=id;grid.startAffinityLinesAnimation(sourceIds);}}},drawAllAffinityLines:function drawAllAffinityLines(){var viewers=this.getGridDataViewers(),viewerCount=viewers?viewers.length:0;for(var i=0;i<viewerCount;i++){var grid=viewers[i];grid.drawAffinityLinesUsingSecondaryDataProvider();}},canDoMultiSelect:function canDoMultiSelect(){var gridDataViewers=this.getGridDataViewers(),count,i,viewer,attributeId,supportsViewFilter=false;if(!!gridDataViewers){count=gridDataViewers.length;for(i=0;i<count;i++){viewer=gridDataViewers[i];attributeId=viewer.getGeoColumnAttribute();if(!!attributeId){supportsViewFilter=viewer.model.supportsViewFilterActions(attributeId);}if(!supportsViewFilter){return false;}}}return true;},isObjectSelected:function isObjectSelected(obj){var i,viewers=this.getGridDataViewers(),viewerCount=viewers?viewers.length:0,selected=false;for(i=0;i<viewerCount;i++){var grid=viewers[i];if(obj.attributes.layerKey===grid.k){if(grid.isSelected(obj)){selected=true;break;}}}return selected;},backupSelections:function backupSelections(){var gridDataViewers=this.gridDataViewer,viewerCount=gridDataViewers?gridDataViewers.length:0,gridDataViewer;this.backupToolBarSelections();this.backupSelectionAreas();for(var i=0;i<viewerCount;i++){gridDataViewer=gridDataViewers[i];gridDataViewer.backupSelections();}},restoreSelectionDataOnly:function restoreSelectionDataOnly(){if(!this.selectionBackUp){return ;}this.restoreMapSelectionDataOnly();var gridDataViewers=this.gridDataViewer,viewerCount=gridDataViewers?gridDataViewers.length:0,gridDataViewer;for(var i=0;i<viewerCount;i++){gridDataViewer=gridDataViewers[i];gridDataViewer.restoreSelectionDataOnly();}},restoreSelectionEffects:function restoreSelectionEffects(){if(!this.selectionBackUp){return ;}this.restoreToolbarSelectionEffects();var gridDataViewers=this.gridDataViewer,viewerCount=gridDataViewers?gridDataViewers.length:0,gridDataViewer;for(var i=0;i<viewerCount;i++){gridDataViewer=gridDataViewers[i];gridDataViewer.restoreSelectionEffects();}this.restoreSelectionAreas();},clearOldSelections:function clearOldSelections(){var gridDataViewers=this.gridDataViewer,viewerCount=gridDataViewers?gridDataViewers.length:0,gridDataViewer;for(var i=0;i<viewerCount;i++){gridDataViewer=gridDataViewers[i];gridDataViewer.clearSelections();}},clearSelectionBackup:function clearSelectionBackup(){var gridDataViewers=this.gridDataViewer,viewerCount=gridDataViewers?gridDataViewers.length:0,gridDataViewer;this.selectionBackUp=null;for(var i=0;i<viewerCount;i++){gridDataViewer=gridDataViewers[i];gridDataViewer.clearSelectionBackup();}},backupToolBarSelections:mstrmojo.emptyFn,restoreMapSelectionDataOnly:mstrmojo.emptyFn,restoreToolbarSelectionEffects:mstrmojo.emptyFn,backupSelectionAreas:mstrmojo.emptyFn,restoreSelectionAreas:mstrmojo.emptyFn};})();