(function(){mstrmojo.requiresCls("mstrmojo.array","mstrmojo.hash","mstrmojo.func","mstrmojo.vi.models.DropZonesModel","mstrmojo.vi.viz.EnumDSSDropZones","mstrmojo.chart.model.enums.EnumDSSObjectType");mstrmojo.requiresClsP("mstrmojo.vi.models","EnumDragSources","_DropZoneCommon");mstrmojo.requiresClsP("mstrmojo.vi.util","TemplateUtils","ThresholdUtils");var $ARR=mstrmojo.array,$HASH=mstrmojo.hash,$FUNC=mstrmojo.func,$EDZ=mstrmojo.vi.viz.EnumDSSDropZones,$EOT=mstrmojo.chart.model.enums.EnumDSSObjectType,$DU=mstrmojo.vi.ui.DatasetUnitMenuUtils,$VI_UTILS=mstrmojo.vi.util,$THRESHOLD_UTILS=$VI_UTILS.ThresholdUtils,$TEMPLATE_UTILS=$VI_UTILS.TemplateUtils,$MH=mstrmojo.vi.viz.MapHelper,ENUM_TARGET=mstrmojo.vi.models.DropZonesModel.ENUM_TARGET_POSITION,ENUM_SOURCE=mstrmojo.vi.models.EnumDragSources;function updateVP(vp,context,action){$ARR.forEach(this.zonesCfg,function(z){if(z.id===context.zone.id){z[action](vp,context);return false;}});this.dirtyVP=true;}mstrmojo.vi.models.MapDropZones=mstrmojo.declare(mstrmojo.vi.models.DropZonesModel,[mstrmojo.vi.models._DropZoneCommon],{zonesCfg:[],dirtyVP:false,getDropZones:function getDropZones(skipVisibleCheck){var zoneModel=[],me=this,getTitle=function(id){switch(id){case $EDZ.GeoAttribute:return mstrmojo.desc(13830);case $EDZ.Latitude:return mstrmojo.desc(13831);case $EDZ.Longitude:return mstrmojo.desc(13832);case $EDZ.Angle:case $EDZ.ColorBy:case $EDZ.SizeBy:return mstrmojo.desc(13829);case $EDZ.AdditionalMetrics:return mstrmojo.desc(11668);}return"";};$HASH.forEach(this.zonesCfg,function(z){if(skipVisibleCheck||z.show(me.getHostModel().vp)){zoneModel.push(me.getZone(z.n,z.id,me.getHost().getDropZoneItems(z.id),false,{allowSingle:z.id!==$EDZ.AdditionalMetrics,title:getTitle(z.id)}));}});this.dropZones=zoneModel;return{n:this.getHost().node.defn.ttl,zones:zoneModel};},getAllZones:function(){return this.getDropZones(true).zones||[];},getZone:function getZone(n,id,src,disabled,extraParas){if((id===$EDZ.Latitude||id===$EDZ.Longitude)&&src[0]&&(src[0].t===21)){var geoDZ=this.getHost().getDropZoneItems($EDZ.GeoAttribute),geoId=geoDZ.length>0?geoDZ[0].id:null,geo=$TEMPLATE_UTILS.findUnitsById(this.getHostModel().gsi,geoId)[0];if(geo){return this._super(n,id,[{did:src[0].id,t:21,n:geo.n+"@"+((id===$EDZ.Latitude)?mstrmojo.desc(7696,"Latitude"):mstrmojo.desc(7697,"Longitude"))}],disabled,extraParas);}}return this._super(n,id,src,disabled,extraParas);},getUnitMenuItems:function getUnitMenuItems(cfg,zone,item,editableLabelNode){if(!item){throw new Error(this.scriptClass+"::getUnitMenuItems: Item must be provided.");}var items=zone.items,cnt=items.length,zid=zone.id,itemContext={zone:zone,idx:$ARR.indexOf(items,item),cnt:cnt,item:item,useDropzone:true},me=this,id=this.id,dataset=$DU.getDatasetFromAttributeId(this.docModel.datasets,item.did);if(item.t!==21){var needSep=false;if(item.t===4){if(item.um){cfg.addMenuItem(mstrmojo.desc(3224,"Edit..."),"",function(){me.editDerivedMetric(itemContext,"edit");},itemContext);cfg.addSeparator();}if(this.docModel.findDatasetIdFromUnit(item.did)&&!this.docModel.isFromSolrCube(item.did)&&!this.docModel.isFromMDXCube(item.did)){cfg.addSubMenuItem(mstrmojo.desc(11806,"Aggregate By"),"",id,me.getAggregateByMetricSubMenu,itemContext);cfg.addSeparator();}cfg.addEditorMenuItem(mstrmojo.desc(5188,"Calculation"),id,me.getCalculationEditorCfg,itemContext);cfg.addMenuItem(mstrmojo.desc(13624,"Create Metric..."),"",function(){me.newDerivedMetric(itemContext);},itemContext);}else{if(!dataset||!this.docModel.isMDXDataset(dataset)){if(item.da){cfg.addMenuItem(mstrmojo.desc(3224,"Edit..."),"",function(){me.editDerivedAttribute(itemContext);},itemContext);cfg.addSeparator();}if(item.t===12){if(this.allowInsertNewAttribute(zone)&&!this.isDynamicLink(item)){cfg.addMenuItem(mstrmojo.desc(13625,"Create Attribute..."),"",function(){me.newDerivedAttribute(itemContext);},itemContext);}}}if(zone.id===$EDZ.AdditionalMetrics&&this.shouldShowDisplayFormsMenu(item)){var geo=this.getZoneModelByZoneId($EDZ.GeoAttribute)||{},lat=this.getZoneModelByZoneId($EDZ.Latitude)||{},lng=this.getZoneModelByZoneId($EDZ.Longitude)||{};if($ARR.find((geo.items||[]).concat(lat.items||[]).concat(lng.items),"did",item.did)<0){cfg.addEditorMenuItem(mstrmojo.desc(11908,"Display Attribute Forms"),id,function(){return me.getDisplayFormsMenu(item);});}}}cfg.addSeparator();if(this.showNumberFormat(item)){cfg.addEditorMenuItem(mstrmojo.desc(13237,"Number Format"),id,this.getNumberFormatEditorCfg,itemContext);needSep=true;}if(item.t===4&&zid===$EDZ.ColorBy){this.buildThresholdMenuOptions(cfg,itemContext,true);needSep=true;}if(needSep){cfg.addSeparator();}if(me.hasReplaceCandidates(itemContext)){cfg.addSubMenuItem(mstrmojo.desc(14003,"Replace With"),"",id,me.getReplaceSubMenu,itemContext);}cfg.addMenuItem(mstrmojo.desc(1388,"Rename"),id,function(){mstrmojo.all[id].renameItem(editableLabelNode,item);});cfg.addMenuItem(mstrmojo.desc(190,"Remove"),"xt",function(){mstrmojo.all[id].deleteItem(zone,itemContext.idx);});}},getAllowDropInfo:function getAllowDropInfo(zone,dragItems,idx,edge,context){var baseInfo=this._super(zone,dragItems,idx,edge,context),candidates=baseInfo.allowedItems,isReplacing=edge===ENUM_TARGET.ON,allowOnlyOne=true,filterCandidates=function(type,checkUnequal){return $ARR.filter(candidates,function(item){return checkUnequal?(item.t!==type):(item.t===type);},allowOnlyOne?{max:1}:null);};switch(zone.id){case $EDZ.GeoAttribute:case $EDZ.Latitude:case $EDZ.Longitude:candidates=filterCandidates($EOT.DssTypeAttribute);break;case $EDZ.Angle:case $EDZ.SizeBy:case $EDZ.ColorBy:candidates=filterCandidates($EOT.DssTypeMetric);break;case $EDZ.AdditionalMetrics:allowOnlyOne=false;candidates=filterCandidates($EOT.DssTypeAttributeForm,true);break;}return $HASH.copy({allowedItems:(allowOnlyOne&&!(zone.items.length===0||isReplacing))?[]:candidates,removeReplaced:isReplacing&&($ARR.find(allowOnlyOne?candidates:dragItems,"did",zone.items[idx].did)===-1)},baseInfo);},getDropActions:function getDropActions(zone,dropInfo,dsid){var items=dropInfo.allowedItems,idx=dropInfo.idx,firstItem=items[0],zid=zone.id,actions=[],getLatitudeForm=function(attr){var r=null;$ARR.forEach(attr.fs||[],function(f){if($MH.isLatitude(f.fnm,f.fgr)&&f.obf){r=f;return false;}});return r;},getLongitudeForm=function(attr){var r=null;$ARR.forEach(attr.fs||[],function(f){if($MH.isLongitude(f.fnm,f.fgr)&&f.obf){r=f;return false;}});return r;};if(zid===$EDZ.Angle&&(this.getHost().getData().dz.AngleBy===undefined)){actions=actions.concat(this.getCreateDropZoneAction($EDZ.Angle,3,4,1));}if(zid===$EDZ.GeoAttribute){var lat=getLatitudeForm(firstItem),lng=getLongitudeForm(firstItem);if(!lat||!lng){if(lat&&$MH.isLatitude(firstItem.n)){zid=$EDZ.Latitude;zone=this.getZoneModelByZoneId(zid);}else{if(lng&&$MH.isLongitude(firstItem.n)){zid=$EDZ.Longitude;zone=this.getZoneModelByZoneId(zid);}}}}if(dropInfo.edge===ENUM_TARGET.ON&&dropInfo.removeReplaced){var del=this.getRemoveDropZoneUnitAction(zone,zone.items[idx]);if(del){actions.push(del);if((zid===$EDZ.Latitude||zid===$EDZ.Longitude)&&zone.items[0].t===21){actions.push(this.getRemoveDropZoneUnitAction({id:$EDZ.GeoAttribute},this.getZoneModelByZoneId($EDZ.GeoAttribute).items[0]));var delZone=this.getZoneModelByZoneId(zone.id===$EDZ.Latitude?$EDZ.Longitude:$EDZ.Latitude);if(delZone&&delZone.items[0].t===21){actions.push(this.getRemoveDropZoneUnitAction(delZone,delZone.items[0]));}}}}var tgtIdx=this.getDropTargetIndex(zone,dropInfo);$ARR.insert(actions,null,this.getAddDropZoneUnitsActions(zone,items,tgtIdx,{datasetId:dsid}));this.checkTooltipAngleColorBySizeByMetric(zid,items,actions);this.checkAndAddThresholdAction(zid,firstItem,actions);var clearZone=function(zoneId,me){var zone=me.getZoneModelByZoneId(zoneId);if(zone&&zone.items.length){var act=me.getRemoveDropZoneUnitAction(zone,zone.items[0]);if(act){actions.push(act);}}},addForm=function(form){actions.push({act:"addForm",unitId:firstItem.did,attFormId:form.fid,unitPos:1});};if(zid===$EDZ.GeoAttribute){clearZone($EDZ.Latitude,this);clearZone($EDZ.Longitude,this);var latForm=getLatitudeForm(firstItem),longiForm=getLongitudeForm(firstItem);if(latForm){addForm(latForm);actions=actions.concat(this.getAddDropZoneUnitsActions({id:$EDZ.Latitude},[{did:latForm.fid,t:21}],0,{datasetId:dsid}));}if(longiForm){addForm(longiForm);actions=actions.concat(this.getAddDropZoneUnitsActions({id:$EDZ.Longitude},[{did:longiForm.fid,t:21}],0,{datasetId:dsid}));}}return actions.length?this.getUpdateTemplateAction(actions):[];},unitsDropped:function unitsDropped(zone,context,dropInfo,isPrimary,splitMetric){var data=context.src.data,actions=context.actions||[];this.submitDropZoneUpdates(actions.concat(this.getDropActions(zone,dropInfo,data.dsid)),$FUNC.wrapMethods(context.callback,this.getHost().model.docModel.controller._getXtabCallback(this.getHost())));},checkAndAddThresholdAction:function checkAndAddThresholdAction(zoneID,item,actions){var host=this.getHost();if(this.isMetric(item)&&zoneID===$EDZ.ColorBy){$THRESHOLD_UTILS.addThresholds(host.model,host,host.node,item,actions);return true;}return false;},checkTooltipAngleColorBySizeByMetric:function checkTooltipAngleColorBySizeByMetric(zoneID,items,actions){var host=this.getHost(),agz=this.getZoneModelByZoneId($EDZ.Angle),cbz=this.getZoneModelByZoneId($EDZ.ColorBy),sbz=this.getZoneModelByZoneId($EDZ.SizeBy),tz=this.getZoneModelByZoneId($EDZ.AdditionalMetrics),agi=agz&&agz.items.length&&agz.items[0],cbi=cbz&&cbz.items.length&&cbz.items[0],sbi=sbz&&sbz.items.length&&sbz.items[0],tis=tz&&tz.items.length&&tz.items,isSameMetric=function(item,m){if(!m){return false;}return item.did===m.did&&item.n===m.n;},act,i,item,ti;if(zoneID===$EDZ.AdditionalMetrics){for(i=0;i<items.length;i++){item=items[i];if(this.isMetric(item)){if(cbi&&isSameMetric(item,cbi)){act=this.getRemoveDropZoneUnitAction(cbz,cbi);if(act){actions.push(act);}}if(sbi&&isSameMetric(item,sbi)){act=this.getRemoveDropZoneUnitAction(sbz,sbi);if(act){actions.push(act);}}if(agi&&isSameMetric(item,agi)){act=this.getRemoveDropZoneUnitAction(agz,agi);if(act){actions.push(act);}}}}}else{if(zoneID===$EDZ.ColorBy||zoneID===$EDZ.SizeBy||zoneID===$EDZ.Angle){item=items[0];if(this.isMetric(item)&&tis){for(i=0;i<tis.length;i++){ti=tis[i];if(isSameMetric(item,ti)){act=this.getRemoveDropZoneUnitAction(tz,ti);if(act){actions.push(act);}}}}}}},getAvatarIconClass:function getAvatarIconClass(){return"";},deleteItem:function deleteItem(zone,idx){var actions=[this.getRemoveDropZoneUnitAction(zone,zone.items[idx])];if(zone.id===$EDZ.GeoAttribute){var latZone=this.getZoneModelByZoneId($EDZ.Latitude),lat=latZone&&latZone.items&&latZone.items[0],lngZone=this.getZoneModelByZoneId($EDZ.Longitude),lng=lngZone&&lngZone.items&&lngZone.items[0];if(lat){actions.push(this.getRemoveDropZoneUnitAction({id:$EDZ.Latitude},lat));}if(lng){actions.push(this.getRemoveDropZoneUnitAction({id:$EDZ.Longitude},lng));}}this.submitDropZoneTemplateUpdates(actions);},deleteItems:function deleteItem(zone,items){var actions=[],id=this.id;items.forEach(function(item){var act=mstrmojo.all[id].getRemoveDropZoneUnitAction(zone,item);if(act){actions.push(act);}});this.submitDropZoneTemplateUpdates(actions||[]);},getWidgetPropsAction:function(){var viz=this.getHost(),model=this.docModel;return model.getUnitFormatAction(viz,1,{FormattingWidget:{WidgetProps:$MH.getXmlFromJson(this.getHostModel().vp)}});},getHostModel:function(){return this.getHost().model.data;},getAddDropZoneUnitsActions:function getAddDropZoneUnitsActions(zone,items,idx,extras){var actions=[],me=this;items.reverse().forEach(function(item){updateVP.call(me,me.getHostModel().vp,{item:item,idx:idx,zone:zone},"onAdd");actions.push(me.getAddDropZoneUnitAction(zone,item,idx,extras));});return actions;},getRemoveDropZoneUnitAction:function getRemoveDropZoneUnitAction(zone,item){var action=this._super(zone,item),idx=$ARR.find(zone.items,"did",item.did);updateVP.call(this,this.getHostModel().vp,{item:item,idx:idx,zone:zone},"onDel");return action;},submitDropZoneUpdates:function submitDropZoneUpdates(actions,callback){actions=actions||[];if(this.dirtyVP){actions.push(this.getWidgetPropsAction());this.dirtyVP=false;}this._super(actions,callback);},canSupportImageThreshold:function getShowImageFlag(){var vp=this.getHostModel().vp;return $MH.supportImageThreshold(vp&&vp.mtp);},getCreateDropZoneAction:function getCreateDropZoneAction(zoneId,idx,dropzone_types,sizelimit){var host=this.getHost(),nodeKey=host.getData().k,treeType=host.defn.tt;return{act:"createDefaultDropZone",treeType:treeType,nodeKey:nodeKey,zoneId:zoneId,dropzone_index:idx,dropzone_types:dropzone_types,dropzone_sizelimit:sizelimit};}});}());