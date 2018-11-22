(function(){mstrmojo.requiresCls("mstrmojo.array","mstrmojo.hash","mstrmojo.vi.ui.DatasetUnitMenuUtils","mstrmojo.models.template.DataInterface","mstrmojo.chart.model.enums.EnumDSSObjectType","mstrmojo.ui.menus.MenuConfig","mstrmojo.ui.menus.EditorConfig","mstrmojo.Button","mstrmojo.Label","mstrmojo.ui.CheckList","mstrmojo.ui.Pulldown","mstrmojo.models.datasets.DataInterface","mstrmojo.vi.models.VIComponentMap","mstrmojo.threshold.ThresholdController","mstrmojo.threshold.ThresholdModel","mstrmojo.chart.model.enums.EnumDSSAxisName","mstrmojo.chart.model.enums.EnumDSSDynamicShortcut","mstrmojo.chart.model.enums.EnumDSSXMLAxesBitMap","mstrmojo.mstr.EnumDSSXMLBaseFormType","mstrmojo.mstr.EnumDSSXMLObjectTypes");var $MOJO=mstrmojo,$ARR=$MOJO.array,$HASH=$MOJO.hash,$OBJ_TYPES=mstrmojo.chart.model.enums.EnumDSSObjectType,$DU=$MOJO.vi.ui.DatasetUnitMenuUtils,$DATASET_INTERFACE=mstrmojo.models.datasets.DataInterface,$VI_COMPMAP=$MOJO.vi.models.VIComponentMap,ROWS=1,COLUMNS=2,XAXIS=3,YAXIS=4,BREAKBY=5,SLICEBY=6,COLORBY=7,SIZEBY=8,TOOLTIP=9,ANGLEBY=10,HORIZONTAL=11,VERTICAL=12,METRIC_NAMES_ID="00000000000000000000000000000000",METRICS=-1,ENUM_AXIS_BIT_MAP=mstrmojo.chart.model.enums.EnumDSSXMLAxesBitMap,ENUM_AXIS_NAME=mstrmojo.chart.model.enums.EnumDSSAxisName,ENUM_DYNAMIC_SHORTCUT=mstrmojo.chart.model.enums.EnumDSSDynamicShortcut,ENUM_FORM_TYPE=mstrmojo.mstr.EnumDSSXMLBaseFormType,ENUM_OBJECT_TYPE=mstrmojo.mstr.EnumDSSXMLObjectTypes;function getTemplateUnitsByType(t){var host=this.getHost(),gsi=host.model.data.gsi;return gsi.cols.concat(gsi.rows).filter(function(unit){return unit.t===t;});}function getUpdateTemplateAction(viz,actions,skipPartialRetrieval){return{act:"updateTemplate",keyContext:viz.k,partialRetrieval:{nodes:skipPartialRetrieval?null:[viz.k]},actions:actions};}function wrapDropzoneAction(action,itemContext,extras){var actions=[];if(itemContext.useDropzone){action.useDropzone=true;action.dropzoneId=itemContext.zone.id;if(itemContext.item.ax!==undefined){action.ax=itemContext.item.ax;}}action.position=itemContext.idx+1+(extras.offset||0);if(extras.replaceSourceId){action.replaceSourceId=extras.replaceSourceId;}action.partialRetrieval={nodes:[action.nodeKey]};actions.push(action);var GUID="$GUID_115",thresholdActions=[],needThreshold=this.checkAndAddThresholdAction(itemContext.zone.id,{did:GUID,t:4},thresholdActions);if(needThreshold){action.newObjectIds=[GUID];actions.push(this.getUpdateTemplateAction(thresholdActions));}return actions;}function getDatasetIdForNewShortcut(mids){var dsId=this.getHost().model.data.datasetId,metricIds=$ARR.ensureArray(mids),helpFind=$ARR.hash(metricIds);if(!dsId){$HASH.forEach(this.docModel.datasets,function(ds,id){var units=(ds.att||[]).concat(ds.mx||[]),containAny=units.some(function(unit){return helpFind[unit.did];});if(containAny){dsId=id;return false;}});}return dsId;}function openDerivedMetricEditor(itemContext,cmd,replace){var me=this,docModel=this.docModel,simpleItem=itemContext.item,unit=$DU.getUnitFromDataset(me.docModel.datasets,simpleItem.did,simpleItem.t)||simpleItem,host=this.getHost(),dataService=me.docModel.getDataService(),isEdit=cmd==="edit",config,actionParams={dsid:isEdit?docModel.findDatasetIdFromUnit(unit.did):getDatasetIdForNewShortcut.call(me,unit.did),alias:unit.alias||unit.n},callback=null;if(unit.t===4){if(isEdit){config={metricId:unit.did,action:{cmd:cmd,n:unit.n,alias:simpleItem.n}};actionParams.did=unit.did;actionParams.nodeKey=host.k;callback=dataService.getEditDerivedMetricSubmitFunc(actionParams);}else{config={metricId:"",action:{cmd:cmd,refOi:{did:unit.did,n:unit.n}}};actionParams.nodeKey=host.k;actionParams.idx=itemContext.idx;actionParams.host=host;actionParams.zoneid=itemContext.zone.id;if(replace){actionParams.replace={did:unit.did,t:unit.t};}if(itemContext.useDropzone){callback=dataService.getAddNewDerivedMetricToDropzoneSubmitFunc(actionParams);}else{callback=dataService.getAddNewDerivedMetricToXtabSubmitFunc(actionParams);}}if(me.docModel.isFromSolrCube(unit.did)||me.docModel.isFromMDXCube(unit.did)){config.disableAFB=true;}me.docModel.controller.openDME(host,config,callback);}}mstrmojo.vi.models._DropZoneCommon=mstrmojo.provide("mstrmojo.vi.models._DropZoneCommon",{_mixinName:"mstrmojo.vi.models._DropZoneCommon",isMetric:function isMetric(item){return item&&item.t===ENUM_OBJECT_TYPE.Metric&&item.id!==METRIC_NAMES_ID;},isAttribute:function isAttribute(item){return item&&item.t===ENUM_OBJECT_TYPE.Attribute;},isRecursiveAttribute:function isRecursiveAttribute(item){return item&&item.t===ENUM_OBJECT_TYPE.Attribute&&item.st===3076;},isNewDerivedElement:function isNewDerivedElement(item){return item.t===ENUM_OBJECT_TYPE.Consolidation&&item.st===12033;},isConsolidation:function isConsolidation(item){return item.t===ENUM_OBJECT_TYPE.Consolidation&&item.st===12032;},isCustomGroup:function isCustomGroup(item){return item.t===ENUM_OBJECT_TYPE.Filter;},isAttrCategory:function isAttrCategory(item){return item&&(item.t===ENUM_OBJECT_TYPE.Attribute||item.t===ENUM_OBJECT_TYPE.Filter||item.t===ENUM_OBJECT_TYPE.Consolidation);},isMetricName:function isMetricName(item){return item&&(item.id===METRIC_NAMES_ID||item.did===METRIC_NAMES_ID);},differInType:function differInType(itemA,itemB){return(this.isMetric(itemA)&&this.isAttrCategory(itemB))||(this.isAttrCategory(itemA)&&this.isMetric(itemB));},isDynamicLink:function isDynamicLink(item){if(this.isAttribute(item)){var forms=item.fs||$DATASET_INTERFACE.getFormsByAttrId(item.did,this.docModel.datasets);return forms.length===2&&forms[1].bftp===ENUM_FORM_TYPE.DssXmlBaseFormHTMLTag&&forms[1].fnm==="DYNAMICLINK";}return false;},getZoneModelByZoneId:function(zoneId){var zones=this.dropZones,resZone;$ARR.forEach(zones,function(zone){if(zone.id===zoneId){resZone=zone;return false;}});return resZone;},hGetItemOccurrence:function(item,zoneIds){zoneIds=zoneIds||[];if(zoneIds.length===0){zoneIds=[ROWS,COLUMNS,XAXIS,YAXIS,COLORBY,BREAKBY,SIZEBY,TOOLTIP,SLICEBY,ANGLEBY];}var i,idx,zone,n=zoneIds.length,rtn=[];for(i=0;i<n;i++){zone=this.getZoneModelByZoneId(zoneIds[i]);if(!zone){continue;}idx=this.getUnitIndexInZone(zone,item);if(idx!==-1){rtn.push({zoneId:zoneIds[i],itemIndex:idx});}}return rtn;},removeColorByItemFromBreakByIfExists:function removeItemFromBreakByIfExists(item,actions){var occurrences,foundOccurrence,zone,breakByItem;occurrences=this.hGetItemOccurrence(item,[ROWS,COLUMNS,XAXIS,YAXIS,BREAKBY,SIZEBY,SLICEBY]);if((occurrences.length===1)&&(occurrences[0].zoneId===BREAKBY||occurrences[0].zoneId===SLICEBY)){foundOccurrence=occurrences[0];zone=this.getZoneModelByZoneId(foundOccurrence.zoneId);breakByItem=zone.items[foundOccurrence.itemIndex];if(breakByItem.hidden){actions.push(this.getRemoveDropZoneUnitAction(zone,breakByItem));}}},updateBreakByAndSliceUnits:function updateBreakByUnits(){var ths=this,zonesToSearch=[ROWS,COLUMNS,XAXIS,YAXIS,COLORBY,SIZEBY,HORIZONTAL,VERTICAL],specialZone=this.getZoneModelByZoneId(SLICEBY)||this.getZoneModelByZoneId(BREAKBY),occurrences;specialZone.items.forEach(function(unit){if(ths.isAttrCategory(unit)||ths.isMetricName(unit)){occurrences=ths.hGetItemOccurrence(unit,zonesToSearch);if((occurrences.length===1)&&(occurrences[0].zoneId===COLORBY)){unit.hidden=true;}}});},getAxisSummary:function getAxisSummary(){var rtn={};rtn[XAXIS]=this.getItemCountInZone(XAXIS);rtn[YAXIS]=this.getItemCountInZone(YAXIS);rtn[ANGLEBY]=this.getItemCountInZone(ANGLEBY);return rtn;},getItemCountInZone:function(zoneId){var zone=this.getZoneModelByZoneId(zoneId);if(zone){return zone.items.length;}return 0;},isOnlyMetricZone:function isOnlyMetricZone(zoneId){var i,n,zoneItems,zone=this.getZoneModelByZoneId(zoneId);if(!zone){return false;}zoneItems=zone.items;n=zoneItems.length;if(n===0){return false;}for(i=0;i<n;i++){if(!this.isMetric(zoneItems[i])){return false;}}return true;},isMetricZone:function isMetricZone(zoneId){var i,n,zoneItems,zone=this.getZoneModelByZoneId(zoneId);if(!zone){return false;}zoneItems=zone.items;n=zoneItems.length;if(n===0){return false;}for(i=0;i<n;i++){if(!this.isMetric(zoneItems[i])){if(this.isMetricName(zoneItems[i])){continue;}else{return false;}}}return true;},getMetricCntInZone:function(zoneId){var me=this,zone=this.getZoneModelByZoneId(zoneId),zoneItems=zone.items,metricCnt=0;$ARR.forEach(zoneItems,function(item){if(me.isMetric(item)){metricCnt++;}});return metricCnt;},isAttrCategoryZone:function(zoneId){var i,n,zoneItems,zone=this.getZoneModelByZoneId(zoneId);if(!zone){return false;}zoneItems=zone.items;n=zoneItems.length;if(n===0){return false;}for(i=0;i<n;i++){if(!this.isAttrCategory(zoneItems[i])&&!this.isMetricName(zoneItems[i])){return false;}}return true;},showNumberFormat:function(item){return mstrmojo.all[this.hostId].model.showNumberFormat(item);},renameItem:function(editableLabelNode,item){var id=this.id;$DU.renameItem(editableLabelNode,item,function(renameWidget){var me=mstrmojo.all[id],viz=me.getHost(),gi=me.getHostModel().gsi,newName=renameWidget.text.trim(),isMetric=item.t===4,units=isMetric?gi.mx:gi.rows.concat(gi.cols),fnRename=function(){me.submitDropZoneUpdates(getUpdateTemplateAction(viz,[{act:"renameUnit",id:item.did,type:item.t,name:newName,isDynamicAlias:item.t===4}]));},fnRevert=function(){renameWidget.set("text",item.n);},hasConflict=units.some(function(u){return u.did!==item.did&&(isMetric||u.t===item.t)&&u.n===newName;});if(hasConflict){mstrmojo.warn(mstrmojo.desc(11664,'"##" already exists in the visualization. Do you want to proceed?').replace("##",newName),{confirmBtn:{fn:fnRename},cancelBtn:{fn:fnRevert}});}else{fnRename();}},{allowEmptyText:true,cssClass:editableLabelNode.className});},getPageByUnit:function getPageByUnit(){var host=this.getHost(),pageByPanel=host.builder.getLayoutVIMap(host.defn._lkz).getComponent($VI_COMPMAP.TYPES.PAGEBY_PANEL);return pageByPanel&&pageByPanel.unit;},shouldShowDisplayFormsMenu:function shouldShowDisplayFormsMenu(item){if(!this.isAttribute(item)||this.isDynamicLink(item)){return false;}var fs=$DATASET_INTERFACE.getFormsByAttrId(item.did,this.docModel.datasets),data=this.getHost().model.data,gts=data.gts,r=fs.length>1;if(fs.length===1){var find=false;$ARR.forEach((gts.row||[]).concat(gts.col||[]),function(obj){if(obj.id===item.did&&$ARR.find(obj.fs||[],"id",fs[0].fid)>-1){find=true;return false;}});if(!find){r=true;}}return r;},getDisplayFormsMenu:function(item){var me=this;return $DU.getDisplayFormsMenu(item,me.getHost(),me.docModel.datasets,function(actions){me.submitDropZoneUpdates(actions);});},editDerivedMetric:function(itemContext){openDerivedMetricEditor.call(this,itemContext,"edit");},newDerivedMetric:function(itemContext){var allowMultiMetrics=mstrmojo.all[this.hostId].zonesModel.allowInsertNewMetric(itemContext.zone);if(itemContext.zone.id===COLORBY){allowMultiMetrics=false;}openDerivedMetricEditor.call(this,itemContext,"editNew",!allowMultiMetrics);},newDerivedAttribute:function newDerivedAttribute(itemContext,replace){var simpleItem=itemContext.item,unit=$DU.getUnitFromDataset(this.docModel.datasets,simpleItem.did,simpleItem.t)||simpleItem,host=this.getHost(),me=this,config={forceRefresh:true,alias:"New Attribute",precreate:function(params){if(me.getAddItemActions){var addActs=me.getAddItemActions(itemContext.zone,[{did:"$GUID_1",t:12}]);params.newObjectIds=["$GUID_1"];if(replace){addActs=[me.getRemoveDropZoneUnitAction(itemContext.zone,unit)].concat(addActs);}params=[params,{act:"updateTemplate",keyContext:host.k,actions:addActs}];}else{params=$HASH.copy({act:"addDAToTemplate",nodeKey:host.k,treeType:host.defn.tt},params);if(itemContext.useDropzone){params.useDropzone=true;params.dropzoneId=itemContext.zone.id;if(itemContext.item.ax!==undefined){params.ax=itemContext.item.ax;}if(replace){params.replaceSourceId=unit.did;}}else{params.axis=itemContext.axis;}}return params;}};this.docModel.controller.openDAE(this,config,mstrmojo.emptyFn,unit);},newDynamicLinkAttr:function newDynamicLinkAttr(itemContext,replace){var simpleItem=itemContext.item,unit=$DU.getUnitFromDataset(this.docModel.datasets,simpleItem.did,simpleItem.t)||simpleItem,host=this.getHost(),me=this,config={forceRefresh:true,alias:"New Link",precreate:function(params){if(me.getAddItemActions){var addActs=me.getAddItemActions(itemContext.zone,[{did:"$GUID_1",t:12}]);params.newObjectIds=["$GUID_1"];if(replace){addActs=[me.getRemoveDropZoneUnitAction(itemContext.zone,unit)].concat(addActs);}params=[params,{act:"updateTemplate",keyContext:host.k,actions:addActs}];}else{params=$HASH.copy({act:"addDAToTemplate",nodeKey:host.k,treeType:host.defn.tt},params);if(itemContext.useDropzone){params.useDropzone=true;params.dropzoneId=itemContext.zone.id;if(itemContext.item.ax!==undefined){params.ax=itemContext.item.ax;}if(replace){params.replaceSourceId=unit.did;}}else{params.axis=itemContext.axis;params.pos=itemContext.idx+2;}}return params;}};this.docModel.controller.openDynamicLinkEditor(this,config,mstrmojo.emptyFn,unit);},editDerivedAttribute:function(itemContext){var host=this.getHost(),simpleItem=itemContext.item,unit=$DU.getUnitFromDataset(this.docModel.datasets,simpleItem.did,simpleItem.t)||simpleItem,dsid=this.docModel.findDatasetIdFromUnit(unit.did),config={dsid:dsid,did:unit.did,n:unit.n,alias:simpleItem.n,forms:unit.fs,preupdate:function(params){var alias=params.name;params.name=unit.n;params=[params,getUpdateTemplateAction(host,[{act:"renameUnit",id:unit.did,type:12,name:alias}],true)];return params;}};var event=window&&window.event,isCtrlDown=!!(event.ctrlKey&&event.altKey),forms=config.forms||[];if(this.isDynamicLink(simpleItem)&&!isCtrlDown){this.docModel.controller.openDynamicLinkEditor(this,config,mstrmojo.emptyFn);}else{this.docModel.controller.openDAE(this,config,mstrmojo.emptyFn);}},getTemplateAttributes:function getTemplateAttributes(){return getTemplateUnitsByType.call(this,12);},getTemplateHierarchies:function getTemplateHierarchies(){return getTemplateUnitsByType.call(this,14);},getTemplateDEs:function getTemplateDEs(){var host=this.getHost(),gsi=host.model.data.gsi;return gsi.cols.concat(gsi.rows).filter(function(unit){return unit.st===12033;});},getUnitInfoInTemplate:function getAttributeInfoInTempalte(unitdid){var info={},gts=this.getHost().model.data.gts;[{axis:ROWS,name:"row"},{axis:COLUMNS,name:"col"}].forEach(function(opt){$ARR.forEach(gts[opt.name],function(unit,idx){if(unit.id===unitdid){info.axis=opt.axis;info.axisName=opt.name;info.tplIdx=idx;info.unit=unit;return false;}});});return info;},sortGrid:function sortGrid(item,isAsc){var host=this.getHost(),itemType=item.t,itemId=item.did,tplAttInfo=null,sortKey=null;if(itemType===$OBJ_TYPES.DssTypeMetric){sortKey=["","","",1];}else{tplAttInfo=this.getUnitInfoInTemplate(item.did);sortKey=[tplAttInfo.unit.fid||(tplAttInfo.unit.fs&&tplAttInfo.unit.fs[0].id),"21","",tplAttInfo.axis];}var sortAxis=tplAttInfo?tplAttInfo.axis:ROWS,subPos=host.model.data.gts[(sortAxis===ROWS?"row":"col")+"SubPos"];host.controller.onSort(host,host.model.getSortGridAction(subPos,[itemType,itemId].concat(sortKey).join("!"),sortAxis,isAsc));},addSortMenu:function addSortMenu(itemContext,menuCfg,hasAdvancedSort){var me=this,host=this.getHost(),item=itemContext.item,data=host.model.data,metricsAxis=data.gsi.tma,sortItem=$HASH.copy(item);if(item.t===$OBJ_TYPES.DssTypeFilter){return ;}if(item.t===$OBJ_TYPES.DssTypeDimension){$ARR.forEach((data.gts.row||[]).concat(data.gts.col||[]),function(t){if(t.hid===sortItem.did){sortItem.did=t.id;sortItem.t=t.otp;return false;}});}if(itemContext.axis!==METRICS||metricsAxis!==ROWS){menuCfg.addMenuItem(mstrmojo.desc(7974,"Sort Ascending"),"xt",function(){me.sortGrid(sortItem,true);});menuCfg.addMenuItem(mstrmojo.desc(7975,"Sort Descending"),"xt",function(){me.sortGrid(sortItem,false);});}if(hasAdvancedSort){menuCfg.addMenuItem(mstrmojo.desc(11099,"Advanced Sort..."),"xt",function(){var srcAxis=itemContext.axis;if(srcAxis===METRICS){srcAxis=metricsAxis;}host.controller.onGetAdvSortData(host,srcAxis,sortItem.t);});}else{var hasSorts=data.gsi.sorts.some(function(axisSorts){return !!axisSorts.length;}),menuText=mstrmojo.desc(11699,"Clear Sort");if(hasSorts){menuCfg.addMenuItem(menuText,"",function(){me.submitDropZoneTemplateUpdates([{act:"clearSort"}]);});}}},convertToMetric:function convertToMetric(itemContext){var host=this.getHost(),targetDatasetId=host.model&&host.model.data&&host.model.data.datasetId,nodeKey=host.k,treeType=host.defn.tt,unit=itemContext.item;if(!targetDatasetId){mstrmojo.hash.forEach(this.docModel.datasets,function(ds,id){if(mstrmojo.array.find((ds.att||[]),"did",unit.did)!==-1){targetDatasetId=id;return false;}});}var EF=mstrmojo.mstr.EnumFunction,actions=wrapDropzoneAction.call(this,{act:"addShortcutMetric",nodeKey:nodeKey,treeType:treeType,funcType:unit.formType===2?EF.FunctionSum:EF.FunctionCount,units:[{id:unit.did,type:unit.t}],dsid:targetDatasetId,replaceSourceId:unit.did},itemContext);this.submitActionForDatasetUpdate(actions);},getAddMetricNameAction:function(host,topZoneId){if(!this.gmZones){return null;}var me=this,metricCnt=0,showMetricName=false,action,bottomZone=me.gmZones.getZoneModelByZoneId((topZoneId===ROWS)?YAXIS:XAXIS),METRIC_NAMES_ITEM={n:"Metric Names",did:METRIC_NAMES_ID,t:0},fakedItem=$HASH.clone(METRIC_NAMES_ITEM),occurrences=me.gmZones.hGetItemOccurrence(fakedItem,[ROWS,COLUMNS,XAXIS,YAXIS,COLORBY]);$ARR.forEach(bottomZone.items,function(itm){if(me.isMetric(itm)){metricCnt++;}});if(occurrences.length===0&&metricCnt<=1){showMetricName=true;}if(showMetricName){action={act:"updateTemplate",keyContext:host.k,actions:me.gmZones.getUpdateMetricNameUnitActions(showMetricName,topZoneId)};}return action;},getAggregateByMetricSubMenu:function(itemContext){var me=this,simpleItem=itemContext.item,item=$DU.getUnitFromDataset(this.docModel.datasets,simpleItem.did,simpleItem.t)||simpleItem,id=this.id,host=this.getHost(),nodeKey=host.k,treeType=host.defn.tt,onClick=this.submitActionForDatasetUpdate;return $DU.getAggregateByMenu(item,function(baseUnit,func){var allowMultiMetrics=me.allowInsertNewMetric(itemContext.zone),actions=[];if(itemContext.zone.id===COLORBY){allowMultiMetrics=false;}if(allowMultiMetrics&&itemContext.useDropzone&&me.gmZones){var topZone=me.gmZones.getZoneModelByZoneId((itemContext.zone.id===YAXIS)?ROWS:COLUMNS);var action=me.getAddMetricNameAction(host,topZone.id);if(action){actions.push(action);}action=me.gmZones.getUpdateGroupInfoActionForNewMetric(itemContext.zone.id,itemContext.idx+1,simpleItem.ax===0);if(action){actions.push(action);}}onClick.call(mstrmojo.all[id],actions.concat(wrapDropzoneAction.call(me,{act:"addShortcutMetric",dsid:getDatasetIdForNewShortcut.call(me,item.did),nodeKey:nodeKey,treeType:treeType,funcType:func,units:[{id:baseUnit.did,type:baseUnit.t}]},itemContext,{offset:allowMultiMetrics?1:0,replaceSourceId:allowMultiMetrics?null:item.did})));});},getCalculationEditorCfg:function getMetricCalculationEditorCfg(itemContext){var me=this,host=this.getHost(),submit=this.submitActionForDatasetUpdate.bind(this),nodeKey=host.k,gsi=host.model.data.gsi,treeType=host.defn.tt,allowMultiMetrics=me.allowInsertNewMetric(itemContext.zone),actions=[];if(itemContext.zone.id===COLORBY){allowMultiMetrics=false;}return $DU.getCalculationMetricEditor(gsi.mx,itemContext.item,function(m1,m2,op,op2){if(allowMultiMetrics&&itemContext.useDropzone&&me.gmZones){var topZone=me.gmZones.getZoneModelByZoneId((itemContext.zone.id===YAXIS)?ROWS:COLUMNS);var action=me.getAddMetricNameAction(host,topZone.id);if(action){actions.push(action);}action=me.gmZones.getUpdateGroupInfoActionForNewMetric(itemContext.zone.id,itemContext.idx+1,itemContext.item.ax===0);if(action){actions.push(action);}}submit(actions.concat(wrapDropzoneAction.call(me,{act:"addShortcutMetric",dsid:getDatasetIdForNewShortcut.call(me,itemContext.item.did),nodeKey:nodeKey,treeType:treeType,funcType:op,funcType2:op2,units:[m1,m2]},itemContext,{offset:allowMultiMetrics?1:0,replaceSourceId:allowMultiMetrics?null:itemContext.item.did})));});},submitAddShortcutMetric:function(itemContext,params){var me=this,id=me.id,host=this.getHost(),nodeKey=host.k,treeType=host.defn.tt,onOk=me.submitActionForDatasetUpdate,allowMultiMetrics=me.allowInsertNewMetric(itemContext.zone),actions=[];if(itemContext.zone.id===COLORBY){allowMultiMetrics=false;}if(allowMultiMetrics&&itemContext.useDropzone&&me.gmZones){var topZone=me.gmZones.getZoneModelByZoneId((itemContext.zone.id===YAXIS)?ROWS:COLUMNS);var action=me.getAddMetricNameAction(host,topZone.id);if(action){actions.push(action);}action=me.gmZones.getUpdateGroupInfoActionForNewMetric(itemContext.zone.id,itemContext.idx+1,itemContext.item.ax===0);if(action){actions.push(action);}}var item=params.item,extraItem=params.extraItem,funcType=params.funcType,funcType2=params.funcType2,breakBys=params.breakBys,sortBys=params.sortBys,prs=params.prs,units=[{id:item.did,type:item.t}],basicAction;if(extraItem){units.push(extraItem);}basicAction={act:"addShortcutMetric",dsid:getDatasetIdForNewShortcut.call(me,item.did),nodeKey:nodeKey,treeType:treeType,funcType:funcType,units:units,breakBys:breakBys,sortBys:sortBys};if(funcType2){basicAction.funcType2=funcType2;}if(prs){basicAction.prs=prs;}actions=actions.concat(wrapDropzoneAction.call(me,basicAction,itemContext,{offset:allowMultiMetrics?1:0,replaceSourceId:allowMultiMetrics?null:item.did}));onOk.call(mstrmojo.all[id],actions);},getDynamicBreakByAxisOptions:function(useAsMenuOptions){var me=this,host=me.getHost(),gsi=host.model.data.gsi,entries=[],hasAttribute=function hasAttribute(axis){return axis.some(function(item){return me.isAttribute(item)||me.isNewDerivedElement(item)||me.isCustomGroup(item)||me.isConsolidation(item);});};if(hasAttribute(gsi.rows)){entries.push({n:useAsMenuOptions?mstrmojo.desc(3326,"By Columns"):mstrmojo.desc(122,"Columns"),axes_bitmap:ENUM_AXIS_BIT_MAP.DssXmlAxisRowsBit,dmy:"@cols"});}if(hasAttribute(gsi.cols)){entries.push({n:useAsMenuOptions?mstrmojo.desc(3327,"By Rows"):mstrmojo.desc(2968,"Rows"),axes_bitmap:ENUM_AXIS_BIT_MAP.DssXmlAxisColumnsBit,dmy:"@rows"});}return entries;},getBreakByAxisOptions:function(useAsMenuOptions){var entries=[{n:mstrmojo.desc(4531,"Automatic"),axes_bitmap:ENUM_AXIS_NAME.DssAxisDynamicShortcutRoot+ENUM_DYNAMIC_SHORTCUT.DssDynamicShortcutAuto,dmy:"@auto"},{n:useAsMenuOptions?mstrmojo.desc(13408,"By None"):mstrmojo.desc(2057,"None"),axes_bitmap:ENUM_AXIS_BIT_MAP.DssXmlAxisPagesBit,dmy:"@p"}];if(useAsMenuOptions){entries.splice(1,0,{isSeparator:true});}return entries.concat(this.getDynamicBreakByAxisOptions(useAsMenuOptions));},getBreakByAttributeOptions:function(){var me=this,attrEntries=[],atts=me.getTemplateAttributes().concat(me.getTemplateDEs()),pbUnit=me.getPageByUnit();attrEntries=attrEntries.concat(atts);if(pbUnit&&pbUnit.srcid){if($ARR.find(attrEntries,"did",pbUnit.srcid)===-1){attrEntries.push({n:pbUnit.n,did:pbUnit.srcid,t:pbUnit.srct});}}return attrEntries;},getDynamicBreakByOptions:function(useAsMenuOptions){var me=this,attrEntries=me.getBreakByAttributeOptions();if(useAsMenuOptions&&attrEntries.length){attrEntries.unshift({isSeparator:true});}return me.getBreakByAxisOptions(useAsMenuOptions).concat(attrEntries);},getDynamicLevelOptions:function(){var me=this,levels=me.getBreakByAxisOptions(true),attrEntries=me.getBreakByAttributeOptions();levels.some(function(item){if(item.axes_bitmap===ENUM_AXIS_BIT_MAP.DssXmlAxisPagesBit){item.n=mstrmojo.desc(3329,"Grand Total");return true;}});if(attrEntries.length){attrEntries.unshift({isSeparator:true});}return levels.concat(attrEntries);},getShortcutMetricSubMenu:function(itemContext){var me=this,cfg=new mstrmojo.ui.menus.MenuConfig(),simpleItem=itemContext.item,item=$DU.getUnitFromDataset(this.docModel.datasets,simpleItem.did,simpleItem.t)||simpleItem,allowMultiMetrics=me.allowInsertNewMetric(itemContext.zone);if(item.t===4){me.addRankShortcutMenu(itemContext,cfg);me.addPercentileShortcutMenu(itemContext,cfg);me.addPercentToTotalShortcutMenu(itemContext,cfg);cfg.addSeparator();me.addPercentOfShortcutMenu(itemContext,cfg);me.addPercentChangeShortcutMenu(itemContext,cfg);me.addDifferenceShortcutMenu(itemContext,cfg);cfg.addSeparator();me.addMovingTotalShortcutMenu(itemContext,cfg);me.addRunningTotalShortcutMenu(itemContext,cfg);me.addPercentRunningTotalShortcutMenu(itemContext,cfg);}cfg.addSeparator();cfg.addMenuItem(mstrmojo.desc(11491,"More Functions..."),"",function(){openDerivedMetricEditor.call(me,itemContext,"add",!allowMultiMetrics);},item);return cfg;},hasReplaceCandidates:function(itemContext){var candidates=this.getReplaceCandidates(itemContext.zone,itemContext.item);return candidates&&candidates.length>0;},getReplaceSubMenu:function(itemContext,titleContent){var menuContent,item=itemContext.item,zone=itemContext.zone,candidates=this.getReplaceCandidates(zone,item),me=this;menuContent=titleContent?[titleContent]:[];menuContent.push({scriptClass:"mstrmojo.ui.ScrollableContainer",alias:"scrollableContainer",children:[{scriptClass:"mstrmojo.vi.ui.InteractiveUnitList",draggable:false,CLS_HAS_MENU:"",items:candidates,listHooks:{select:function select(el,unit){me.unitsDropped(zone,{src:{data:{item:unit,items:[unit],dsid:unit.dsId}},getCtxtDragData:function(){var src=this.src;return(src&&src.data)||{};}},{allowedItems:[unit],idx:$ARR.find(zone.items,"did",item.did)===-1?item._renderIdx:$ARR.find(zone.items,"did",item.did),edge:mstrmojo.vi.models.DropZonesModel.ENUM_TARGET_POSITION.ON,removeReplaced:true});if(this.parent&&this.parent.parent&&this.parent.parent.closeAllMenus){this.parent.parent.closeAllMenus();}}}}]});return new mstrmojo.ui.menus.EditorConfig({data:{},cssClass:"replaceReference",okVisible:false,cancelVisible:false,contents:menuContent,onOpen:function opOpen(){this.scrollableContainer.updateScrollbars();}});},addRankShortcutMenu:function addRankShortcutMenu(itemContext,cfg){var me=this,id=this.id;function submitRankShortcut(item,asc,breakBys){me.submitAddShortcutMetric(itemContext,{item:item,funcType:mstrmojo.mstr.EnumFunction.FunctionRank,prs:[{n:"ASC",v:asc}],breakBys:breakBys});}function getRankMetricEditorCfg(itemContext){return $DU.getRankMetricEditor(itemContext.item,me.getDynamicBreakByOptions(),submitRankShortcut);}cfg.addActionPopupMenuItem(mstrmojo.desc(2789,"Rank"),id,function(){submitRankShortcut(itemContext.item,"0",[{dmy:"@auto"}]);},getRankMetricEditorCfg,"",itemContext);},addPercentileShortcutMenu:function addPercentileShortcutMenu(itemContext,cfg){var me=this,id=this.id;function submitPercentileShortcut(entry){var breakBy;if(entry.dmy){breakBy={dmy:entry.dmy};}else{breakBy={id:entry.did,type:entry.t};}me.submitAddShortcutMetric(itemContext,{item:itemContext.item,funcType:mstrmojo.mstr.EnumFunction.FunctionPercentRank,breakBys:[breakBy],prs:[{n:"inclusive",v:"False"}]});}function getPercentileMenuCfg(){var submenucfg=new mstrmojo.ui.menus.MenuConfig(),entries=me.getDynamicBreakByOptions(true);entries.forEach(function(entry){if(entry.isSeparator){submenucfg.addSeparator();return ;}submenucfg.addMenuItem(entry.n,"",function(){submitPercentileShortcut(entry);});});return submenucfg;}cfg.addActionPopupMenuItem(mstrmojo.desc(13409,"Percentile Rank"),id,function(){submitPercentileShortcut({dmy:"@auto"});},getPercentileMenuCfg,"",itemContext);},addPercentToTotalShortcutMenu:function addPercentToTotalShortcutMenu(itemContext,cfg){var me=this,id=this.id,item=itemContext.item,host=me.getHost(),submit=me.submitActionForDatasetUpdate.bind(me),entries=me.getDynamicLevelOptions(),nodeKey=host.k,treeType=host.defn.tt,allowMultiMetrics=me.allowInsertNewMetric(itemContext.zone),actions=[];if(itemContext.zone.id===COLORBY){allowMultiMetrics=false;}function submitPercentToTotal(entry){if(allowMultiMetrics&&itemContext.useDropzone&&me.gmZones){var topZone=me.gmZones.getZoneModelByZoneId((itemContext.zone.id===YAXIS)?ROWS:COLUMNS);var action=me.getAddMetricNameAction(host,topZone.id);if(action){actions.push(action);}action=me.gmZones.getUpdateGroupInfoActionForNewMetric(itemContext.zone.id,itemContext.idx+1,itemContext.item.ax===0);if(action){actions.push(action);}}submit(actions.concat(wrapDropzoneAction.call(me,{act:"addPercentToTotalMetric",nodeKey:nodeKey,treeType:treeType,metric_id:item.did,axes_bitmap:entry.axes_bitmap||0,units:entry.did&&[{id:entry.did,type:entry.t}]},itemContext,{offset:allowMultiMetrics?1:0,replaceSourceId:allowMultiMetrics?null:itemContext.item.did})));}function getPercentToTotalMenuCfg(){var subMenuCfg=new mstrmojo.ui.menus.MenuConfig();entries.forEach(function(entry){if(entry.isSeparator){subMenuCfg.addSeparator();return ;}subMenuCfg.addMenuItem(entry.n,"",function(){submitPercentToTotal(entry);});});return subMenuCfg;}cfg.addActionPopupMenuItem(mstrmojo.desc(3323,"Percent to Total"),id,function(){submitPercentToTotal({axes_bitmap:ENUM_AXIS_NAME.DssAxisDynamicShortcutRoot+ENUM_DYNAMIC_SHORTCUT.DssDynamicShortcutAuto});},getPercentToTotalMenuCfg,"",itemContext);},addPercentOfShortcutMenu:function addPercentOfShortcutMenu(itemContext,cfg){var me=this,id=this.id;function submitPercentOfShortcut(item,funcType,breakBys){me.submitAddShortcutMetric(itemContext,{item:item,funcType:funcType,funcType2:mstrmojo.mstr.EnumFunction.FunctionDivide,breakBys:breakBys,sortBys:[{dmy:"@auto"}]});}function getPercentOfMenuCfg(itemContext){return $DU.getRelativeReferenceMenu(itemContext.item,mstrmojo.desc(13394,"Percent of:"),me.getDynamicBreakByOptions(),submitPercentOfShortcut);}cfg.addActionPopupMenuItem(mstrmojo.desc(13390,"Percent Of"),id,function(){submitPercentOfShortcut(itemContext.item,mstrmojo.mstr.EnumFunction.FunctionLag,[{dmy:"@auto"}]);},getPercentOfMenuCfg,"",itemContext);},addPercentChangeShortcutMenu:function addPercentChangeShortcutMenu(itemContext,cfg){var me=this,id=this.id;function submitPercentChangeShortcut(item,funcType,breakBys){me.submitAddShortcutMetric(itemContext,{item:item,funcType:funcType,funcType2:mstrmojo.mstr.EnumFunction.FunctionVar,breakBys:breakBys,sortBys:[{dmy:"@auto"}]});}function getPercentChangeMenuCfg(itemContext){return $DU.getRelativeReferenceMenu(itemContext.item,mstrmojo.desc(146,"From:"),me.getDynamicBreakByOptions(),submitPercentChangeShortcut);}cfg.addActionPopupMenuItem(mstrmojo.desc(13391,"Percent Change"),id,function(){submitPercentChangeShortcut(itemContext.item,mstrmojo.mstr.EnumFunction.FunctionLag,[{dmy:"@auto"}]);},getPercentChangeMenuCfg,"",itemContext);},addDifferenceShortcutMenu:function addDifferenceShortcutMenu(itemContext,cfg){var me=this,id=this.id;function submitDifferenceShortcut(item,funcType,breakBys){me.submitAddShortcutMetric(itemContext,{item:item,funcType:funcType,funcType2:mstrmojo.mstr.EnumFunction.FunctionMinus,breakBys:breakBys,sortBys:[{dmy:"@auto"}]});}function getDifferenceMenuCfg(itemContext){return $DU.getRelativeReferenceMenu(itemContext.item,mstrmojo.desc(146,"From:"),me.getDynamicBreakByOptions(),submitDifferenceShortcut);}cfg.addActionPopupMenuItem(mstrmojo.desc(11495,"Difference"),id,function(){submitDifferenceShortcut(itemContext.item,mstrmojo.mstr.EnumFunction.FunctionLag,[{dmy:"@auto"}]);},getDifferenceMenuCfg,"",itemContext);},addMovingTotalShortcutMenu:function addMovingTotalShortcutMenu(itemContext,cfg){var me=this,id=this.id;function submitMovingTotalShortcut(item,func,winSz,breakBys){me.submitAddShortcutMetric(itemContext,{item:item,funcType:func,breakBys:breakBys,sortBys:[{dmy:"@auto"}],prs:[{n:"OLAPWinStType",v:"3"},{n:"OLAPWinStOffset",v:winSz.toString()},{n:"OLAPWinEndType",v:"2"}]});}function getMovingTotalMenuCfg(itemContext){return $DU.getMovingTotalMenu(itemContext.item,me.getDynamicBreakByOptions(),submitMovingTotalShortcut);}cfg.addActionPopupMenuItem(mstrmojo.desc(13392,"Moving Average"),id,function(){submitMovingTotalShortcut(itemContext.item,mstrmojo.mstr.EnumFunction.FunctionOLAPAvg,1,[{dmy:"@auto"}]);},getMovingTotalMenuCfg,"",itemContext);},addRunningTotalShortcutMenu:function addRunningTotalShortcutMenu(itemContext,cfg){var me=this,id=this.id;function submitRunningTotalShortcut(item,func,breakBys){me.submitAddShortcutMetric(itemContext,{item:item,funcType:func,breakBys:breakBys,sortBys:[{dmy:"@auto"}],prs:[{n:"OLAPWinStType",v:"0"},{n:"OLAPWinEndType",v:"2"}]});}function getRunningTotalMenuCfg(itemContext){return $DU.getRunningTotalMenu(itemContext.item,me.getDynamicBreakByOptions(),submitRunningTotalShortcut);}cfg.addActionPopupMenuItem(mstrmojo.desc(11906,"Running Total"),id,function(){submitRunningTotalShortcut(itemContext.item,mstrmojo.mstr.EnumFunction.FunctionOLAPSum,[{dmy:"@auto"}]);},getRunningTotalMenuCfg,"",itemContext);},addPercentRunningTotalShortcutMenu:function addPercentRunningTotalShortcutMenu(itemContext,cfg){var me=this,id=this.id;function submitPercentRunningTotalShortcut(item,entries){var breakBys=[];entries.forEach(function(entry){if(entry.dmy){breakBys.push({dmy:entry.dmy});}else{breakBys.push({id:entry.did,type:entry.t});}});me.submitAddShortcutMetric(itemContext,{item:item,funcType:mstrmojo.mstr.EnumFunction.FunctionOLAPSum,funcType2:mstrmojo.mstr.EnumFunction.FunctionDivide,breakBys:breakBys,sortBys:[{dmy:"@auto"}],prs:[{n:"OLAPWinStType",v:"0"},{n:"OLAPWinEndType",v:"2"}]});}function getPercentRunningTotalMenuCfg(itemContext){var subMenuCfg=new mstrmojo.ui.menus.MenuConfig(),entries=me.getDynamicLevelOptions();entries.forEach(function(entry){if(entry.isSeparator){subMenuCfg.addSeparator();return ;}subMenuCfg.addMenuItem(entry.n,"",function(){submitPercentRunningTotalShortcut(itemContext.item,[entry]);});});return subMenuCfg;}cfg.addActionPopupMenuItem(mstrmojo.desc(13393,"Percent Running Total"),id,function(){submitPercentRunningTotalShortcut(itemContext.item,[{dmy:"@auto"}]);},getPercentRunningTotalMenuCfg,"",itemContext);},getMultipleMetricsCalcMenus:function getMultipleMetricsCalcMenus(zone,items,useDropzone){var me=this,host=this.getHost(),submit=this.submitActionForDatasetUpdate.bind(this),nodeKey=host.k,treeType=host.defn.tt,selectedMetricIds=items.map(function(item){return item.did;}),allZoneMetricIds=zone.items.map(function(item){return item.did;}),maxIdx=-1;selectedMetricIds.forEach(function(selectedId){var metricIdx=$ARR.indexOf(allZoneMetricIds,selectedId);if(metricIdx>maxIdx){maxIdx=metricIdx;}});return $DU.getMultipleMetricsCalculationMenus(items,host.model.data.datasetId,function(data){var act={act:"addShortcutMetric",dsid:getDatasetIdForNewShortcut.call(me,selectedMetricIds),nodeKey:nodeKey,treeType:treeType,funcType:data.funcType,funcType2:data.funcType2,units:data.items.map(function(item){return{id:item.did,type:item.t};}),position:maxIdx+2,partialRetrieval:{nodes:[nodeKey]}},actions=[],act2;if(useDropzone){act.useDropzone=useDropzone;act.dropzoneId=zone.id;}actions.push(act);if(me.gmZones){act2=me.gmZones.getUpdateGroupInfoActionForNewMetric(zone.id,maxIdx+1,true);}if(act2){actions.push(act2);}submit(actions);});},getCreateOrEditElementGroupFunc:function getCreateOrEditElementGroupFunc(itemContext){var me=this;return function(){var host=me.getHost(),hostModel=host.model,item=itemContext.item,did=item.did,tplUnitInfo=me.getUnitInfoInTemplate(did),newDeId="$GUID_1",mngdDE=tplUnitInfo.unit.ost===12033&&hostModel.docModel.getDEObject(did);host.controller.openDEEditor(host,mngdDE?{deObj:mngdDE}:{dsId:hostModel.data.datasetId,attId:did,attName:item.n,deId:newDeId,getExtraSaveActions:function(){var zone=itemContext.zone;return me.getUpdateTemplateAction([me.getRemoveDropZoneUnitAction(zone,item),me.getAddDropZoneUnitAction(zone,{did:newDeId,t:$OBJ_TYPES.DssTypeConsolidation},itemContext.idx)]);}});};},buildThresholdMenuOptions:function buildThresholdMenuOptions(cfg,itemContext,isColorBy){mstrmojo.all[this.hostId].model.buildThresholdMenuOptions(cfg,itemContext,isColorBy,this.canSupportImageThreshold());},canSupportImageThreshold:function canSupportImageThreshold(){return false;},getNumberFormatEditorCfg:function getNumberFormatEditorCfg(itemContext){return mstrmojo.all[this.hostId].model.getNumberFormatEditorCfg(itemContext);},submitUpdatesAndPersistWidgetXMLIfNecessary:function submitUpdatesAndPersistWidgetXMLIfNecessary(gm,templateUpdateActions,callbacks){var docModel=gm.model.docModel,dataService=docModel.getDataService(),persistXMLAction,updateTemplateMacroAction;if(!gm.isXMLDirty()){gm.controller.onSubmitTemplateUpdates(gm,templateUpdateActions,callbacks);}else{updateTemplateMacroAction={act:"updateTemplate",keyContext:gm.k,actions:templateUpdateActions};persistXMLAction=gm.getPersistAction();dataService.submitUpdates([updateTemplateMacroAction,persistXMLAction],mstrmojo.func.wrapMethods(gm.controller._getXtabCallback(gm),callbacks));gm.resetXMLDirtyFlag();}},submitActionForDatasetUpdate:function submitActionForDatasetUpdate(action){var model=this.docModel;this.submitDropZoneUpdates(action,mstrmojo.func.wrapMethods(model.getDatasetsUpdateCallback(),model.controller._getXtabCallback(this.getHost())));}});}());