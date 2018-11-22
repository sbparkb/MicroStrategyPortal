(function(){mstrmojo.requiresCls("mstrmojo.vi.viz.GraphMatrixHelper","mstrmojo.vi.viz.GoogleMapHelper","mstrmojo.vi.viz.ESRIMapHelper","mstrmojo.vi.viz.KnownVisualizations","mstrmojo.vi.util.ThresholdUtils","mstrmojo.gm.GMEnums");var $MOJO=mstrmojo,$ARR=$MOJO.array,$VIZ=$MOJO.vi.viz,$GMH=$VIZ.GraphMatrixHelper,$EDZ=$VIZ.EnumDSSDropZones,$KNOWN_VIZ=$VIZ.KnownVisualizations,$THRESHOLD_UTILS=$MOJO.vi.util.ThresholdUtils,DIRC=mstrmojo.gm.EnumABLDirection;function getVizData(dz){return dz&&dz.getHostModel&&dz.getHostModel();}function isDateTime(item){var r=false;if(item.t!==4){$ARR.forEach(item.fs||[],function(f){if(f.ftr||f.bftp===1||f.bftp===8||f.bftp===9){r=true;return false;}});}return r;}function addToGraphMatrix(item,datasetId,data,dz,updateWidgetProps){var dataDZ=data.dz,gsi=data.gsi||{},zoneActions=[],added=false,addToAdditionalMetrics=false,addToColorBy=false,isPieRing=function(gmh){return gmh.shape==="Pie"||gmh.shape==="Ring";},isBubbleOrScatter=function(){var viz=dz.getHost();return viz&&viz.GMController&&viz.GMController.isBubbleOrScatter();},add2Zone=function(zoneId,pos){zoneActions.push({act:"addDropZoneUnit",zoneId:zoneId,datasetId:datasetId,unitId:item.did,unitType:item.t,unitPos:pos||0});added=true;addToColorBy=(zoneId===$EDZ.ColorBy);addToAdditionalMetrics=(zoneId===$EDZ.AdditionalMetrics);var ID2DropZoneName=["Reserved","Rows","Columns","XAxis","YAxis","BreakBy","SliceBy","ColorBy","SizeBy"],zoneName=ID2DropZoneName[zoneId],templateUnit=item.t===4?"TemplateMetric":"TemplateUnit";if(dataDZ[zoneName]){if(!dataDZ[zoneName][templateUnit]){dataDZ[zoneName][templateUnit]=[];}dataDZ[zoneName][templateUnit].push(item);}},removeFromZone=function(zoneId,item){zoneActions.push({act:"removeDropZoneUnit",zoneId:zoneId,unitId:item.did,unitType:item.t});},addMetricsTag=function(zoneId){zoneActions.push({act:"addDropZoneUnit",zoneId:zoneId,unitId:"00000000000000000000000000000000",unitType:0});},gmh=new $VIZ.GraphMatrixHelper({data:data}),updateShape=function(shape){if(!gmh.shape){gmh.shape=shape;updateWidgetProps=true;}},addMX2ZoneXY=function(zoneId,pos){add2Zone(zoneId,pos);if(!gmh.metricsDropZone){if(zoneId===$EDZ.XAxis&&gmh.xAxisObjects.length){addMetricsTag($EDZ.Columns);}else{if(zoneId===$EDZ.YAxis&&gmh.yAxisObjects.length){addMetricsTag($EDZ.Rows);}}}var host=dz.getHost(),gmCtr=host.GMController,groupInfo,chtInfo=gmCtr.getChartInfo(),context={dndGM:false};if(gmCtr.shallWeUseGroupInfo){groupInfo=gmCtr.getGroupInfo();if((chtInfo.dirc===DIRC.VERTICAL&&zoneId===$EDZ.YAxis)||(chtInfo.dirc===DIRC.HORIZONTAL&&zoneId===$EDZ.XAxis)){groupInfo=dz.fillGroupInfo(context,groupInfo,item.did,true);}gmCtr.setGroupInfo(groupInfo);updateWidgetProps=true;}};gmh.setData(data.dz);gmh.setMetricsDropZone(data.dz);if(item.t===4){if(gmh.exists(item,"yAxisObjects")||gmh.exists(item,"xAxisObjects")||gmh.exists(item,"sizeByObjects")||gmh.exists(item,"colorByObjects")||gmh.exists(item,"angleObjects")){var notExistsInXY=!gmh.exists(item,"yAxisObjects")&&!gmh.exists(item,"xAxisObjects");if(notExistsInXY&&(!gmh.yAxisObjects.length||gmh.yAxisObjects[0].t===4)){addMX2ZoneXY($EDZ.YAxis);}else{if(notExistsInXY&&(!gmh.xAxisObjects.length||gmh.xAxisObjects[0].t===4)){addMX2ZoneXY($EDZ.XAxis);}else{if(!gmh.angleObjects.length&&isPieRing(gmh)){add2Zone($EDZ.Angle);}else{if(!gmh.colorByObjects.length){add2Zone($EDZ.ColorBy);}else{if(!gmh.sizeByObjects.length||(!gmh.exists(item,"sizeByObjects")&&isBubbleOrScatter())){add2Zone($EDZ.SizeBy);}}}}}}else{if(!gmh.angleObjects.length&&isPieRing(gmh)){add2Zone($EDZ.Angle);}else{if((!gmh.yAxisObjects.length)&&(!gmh.xAxisObjects.length)){addMX2ZoneXY($EDZ.YAxis);updateShape($GMH.PROP_SHAPE_BAR);}else{if(gmh.yAxisObjects.length&&!gmh.xAxisObjects.length){if(!gmh.exists(item,"yAxisObjects")){addMX2ZoneXY($EDZ.XAxis);updateShape(dz.isMetricZone($EDZ.YAxis)?$GMH.PROP_SHAPE_CIRCLE:$GMH.PROP_SHAPE_BAR);}}else{if((!gmh.yAxisObjects.length)&&gmh.xAxisObjects.length){if(!gmh.exists(item,"xAxisObjects")){addMX2ZoneXY($EDZ.YAxis);updateShape(dz.isMetricZone($EDZ.XAxis)?$GMH.PROP_SHAPE_CIRCLE:$GMH.PROP_SHAPE_BAR);}}else{if((gmh.xAxisObjects[0].t!==4)&&(gmh.yAxisObjects[0].t===4)&&!gmh.exists(item,"yAxisObjects")&&!gmh.exists(item,"sizeByObjects")&&!gmh.exists(item,"colorByObjects")){addMX2ZoneXY($EDZ.YAxis);if(gmh.metricsDropZone!==$GMH.PROP_COLUMNS&&gmh.metricsDropZone!==$GMH.PROP_ROWS&&(!gmh.colorByObjects.length||gmh.colorByObjects[0].t!==4)){addMetricsTag($EDZ.ColorBy);}}else{if((gmh.xAxisObjects[0].t===4)&&(gmh.yAxisObjects[0].t!==4)&&!gmh.exists(item,"xAxisObjects")&&!gmh.exists(item,"sizeByObjects")&&!gmh.exists(item,"colorByObjects")){addMX2ZoneXY($EDZ.XAxis);if(gmh.metricsDropZone!==$GMH.PROP_COLUMNS&&gmh.metricsDropZone!==$GMH.PROP_ROWS&&(!gmh.colorByObjects.length||gmh.colorByObjects[0].t!==4)){addMetricsTag($EDZ.ColorBy);}}else{if((gmh.xAxisObjects[0].t===4)&&(gmh.yAxisObjects[0].t===4)&&!gmh.exists(item,"xAxisObjects")&&!gmh.exists(item,"yAxisObjects")&&!gmh.exists(item,"sizeByObjects")&&!gmh.exists(item,"colorByObjects")){if(!gmh.colorByObjects.length&&gmh.metricsDropZone!==$GMH.PROP_COLORBY){add2Zone($EDZ.ColorBy);}else{if(!gmh.sizeByObjects.length&&gmh.shape!=="Area"){add2Zone($EDZ.SizeBy);}else{if(gmh.xAxisObjects.length===1){addMX2ZoneXY($EDZ.XAxis);}else{if(gmh.yAxisObjects.length===1){addMX2ZoneXY($EDZ.YAxis);}else{if(gmh.sizeByObjects.length===1&&gmh.shape!=="Area"){add2Zone($EDZ.SizeBy);}else{if(!gmh.exists(item,"tooltipMetrics")){add2Zone($EDZ.AdditionalMetrics);}}}}}}}else{if(!gmh.colorByObjects.length&&gmh.metricsDropZone!==$GMH.PROP_COLORBY){add2Zone($EDZ.ColorBy);}else{if(!gmh.sizeByObjects.length){add2Zone($EDZ.SizeBy);}else{if(!gmh.exists(item,"tooltipMetrics")){add2Zone($EDZ.AdditionalMetrics);}}}}}}}}}}if((!addToAdditionalMetrics)&&added){if(gmh.exists(item,"tooltipMetrics")){var idx=$ARR.find(gmh.tooltipMetrics,"did",item.did);if(idx>-1){gmh.tooltipMetrics.splice(idx,1);removeFromZone($EDZ.AdditionalMetrics,item);}}}}if(added&&addToColorBy){var host=dz.getHost();$THRESHOLD_UTILS.addThresholds(host.model,host,host.node,item,zoneActions);}}else{if((gsi.rows||[]).concat(gsi.cols||[]).some(function(a){return a.did===item.did;})){if(!gmh.colorByObjects.length||(gmh.colorByObjects[0].t!==4&&!gmh.exists(item,"colorByObjects"))){add2Zone($EDZ.ColorBy);}}else{if(!gmh.sliceObjects.length&&isPieRing(gmh)){add2Zone($EDZ.SliceBy);if(!gmh.colorByObjects.length){add2Zone($EDZ.ColorBy);}}else{if((!gmh.yAxisObjects.length)&&(!gmh.xAxisObjects.length)){add2Zone($EDZ.XAxis);updateShape(isDateTime(item)?$GMH.PROP_SHAPE_LINE:$GMH.PROP_SHAPE_BAR);}else{if((gmh.yAxisObjects.length)&&(!gmh.xAxisObjects.length)){add2Zone($EDZ.XAxis);updateShape(isDateTime(item)&&gmh.yAxisObjects[0]===4?$GMH.PROP_SHAPE_LINE:$GMH.PROP_SHAPE_BAR);}else{if((!gmh.yAxisObjects.length)&&(gmh.xAxisObjects.length)){add2Zone($EDZ.YAxis);updateShape(isDateTime(item)&&gmh.xAxisObjects[0]===4?$GMH.PROP_SHAPE_LINE:$GMH.PROP_SHAPE_BAR);}else{if((gmh.xAxisObjects[0].t!==4)&&(gmh.yAxisObjects[0].t===4)){if(!gmh.colorByObjects.length){add2Zone($EDZ.ColorBy);if(!gmh.exists(item,"breakByObjects")){add2Zone($EDZ.BreakBy);}}else{add2Zone($EDZ.Columns);}}else{if((gmh.xAxisObjects[0].t===4)&&(gmh.yAxisObjects[0].t!==4)){if(!gmh.colorByObjects.length){add2Zone($EDZ.ColorBy);if(!gmh.exists(item,"breakByObjects")){add2Zone($EDZ.BreakBy);}}else{add2Zone($EDZ.Rows);}}else{if((gmh.xAxisObjects[0].t!==4)&&(gmh.yAxisObjects[0].t!==4)){add2Zone($EDZ.Columns);}else{if((gmh.xAxisObjects[0].t===4)&&(gmh.yAxisObjects[0].t===4)){if(!gmh.colorByObjects.length){add2Zone($EDZ.ColorBy);if(!gmh.exists(item,"breakByObjects")){add2Zone($EDZ.BreakBy);}}else{if(!gmh.columnObjects.length&&gmh.rowObjects.length&&gmh.rowObjects[0].t!==4){add2Zone($EDZ.Rows);}else{add2Zone($EDZ.Columns);}}}}}}}}}}}}var actions=[];if(zoneActions.length){var updAct=dz.getUpdateTemplateAction(zoneActions);var model=dz.docModel,builder=model.controller.view.builder,filterStack=builder.getLayoutVIMap(model.getCurrentLayoutKey()).getComponent(mstrmojo.vi.models.VIComponentMap.TYPES.FILTER_STACK);if(filterStack){updAct.partialRetrieval.nodes.push(filterStack.k);}actions.push(updAct);}if(updateWidgetProps){actions.push({act:"setProperty",nodeKey:data.k,prs:"FormattingWidget",pri:4,v:mstrmojo.string.encodeXMLAttribute(gmh.getXml())});}if(actions.length){dz.clearCardinalityFlags();dz.findLargeItemsForAddUnits([item]);}return actions;}function addToHeatmap(item,datasetId,data,dz){var templateActions,res=true;function checkAndAddToZone(zoneId,isReplace,fnCheck){var zone=dz.getZoneModelByZoneId(zoneId);if(dz.getUnitIndexInZone(zone,item)===-1&&(!fnCheck||fnCheck(zone))){var idx=isReplace?0:zone.items.length;templateActions=dz.getAddItemActions(zone,[item],idx,false,isReplace?zone.items[idx]:null,datasetId);zone.items.push(item);return false;}return true;}function isEmpty(zone){return zone.items.length===0;}if(!dz.isMetric(item)){res=checkAndAddToZone($EDZ.ColorBy,false,function(zone){return isEmpty(zone)&&dz.getItemCountInZone($EDZ.Grouping)>=2;});res=res&&checkAndAddToZone($EDZ.Grouping);if(templateActions){dz.clearCardinalityFlags();dz.findLargeItemsForAddUnits([item]);}}else{res=checkAndAddToZone($EDZ.ColorBy,false,isEmpty);res=res&&checkAndAddToZone($EDZ.SizeBy,false,isEmpty);res=res&&checkAndAddToZone($EDZ.SizeBy,true,function(zone){return zone.items[0].did===dz.getZoneModelByZoneId($EDZ.ColorBy).items[0].did;});res=res&&checkAndAddToZone($EDZ.AdditionalMetrics,false,function(){return dz.getUnitIndexInZone(dz.getZoneModelByZoneId($EDZ.SizeBy),item)===-1&&dz.getUnitIndexInZone(dz.getZoneModelByZoneId($EDZ.ColorBy),item)===-1;});}return templateActions?[dz.docModel.getDataService().getUpdateTemplateAction(dz.getHost().k,templateActions)]:[];}function addToNetwork(item,datasetId,data,dz){var templateActions=null,checkSequence=!dz.isMetric(item)?[$EDZ.FromItem,$EDZ.ToItem]:[$EDZ.ColorBy,$EDZ.ItemSize,$EDZ.SizeBy];$ARR.forEach(checkSequence,function(zoneId){var zone=dz.getZoneModelByZoneId(zoneId);if(zone.items.length===0){templateActions=dz.getAddItemActions(zone,[item],0,datasetId);zone.items.push(item);return false;}});if(templateActions){dz.clearCardinalityFlags();dz.findLargeItemsForAddUnits([item]);return[dz.docModel.getDataService().getUpdateTemplateAction(dz.getHost().k,templateActions)];}return[];}function addToImageLayout(item,datasetId,data,dz){var templateActions=null,checkSequence=!dz.isMetric(item)?[$EDZ.GeoAttribute,$EDZ.Layout]:[$EDZ.ColorBy,$EDZ.SizeBy,$EDZ.AdditionalMetrics];$ARR.forEach(checkSequence,function(zoneId){var zone=dz.getZoneModelByZoneId(zoneId);if((zoneId===$EDZ.AdditionalMetrics||zone.items.length===0)&&dz.isZoneAvalaible(zoneId)){templateActions=dz.getAddDropZoneUnitsActions(zone,[item],0,{datasetId:datasetId});return false;}});return templateActions?[dz.docModel.getDataService().getUpdateTemplateAction(dz.getHost().k,templateActions)]:[];}function addToMap(item,datasetId,data,dz,mapHelper){var gsi=data.gsi||{},viz=dz.getHost(),actions=[],find=false,colorBy=dz.getZoneModelByZoneId($EDZ.ColorBy),sizeBy=dz.getZoneModelByZoneId($EDZ.SizeBy),tooltip=dz.getZoneModelByZoneId($EDZ.AdditionalMetrics),$VIZ=mstrmojo.vi.viz,$MH=$VIZ.MapHelper,added=false,add2DropZone=function(did,t,zoneId,datasetId){if(did){actions.push(dz.getUpdateTemplateAction([{act:"addDropZoneUnit",zoneId:zoneId,unitId:did,unitType:t,datasetId:datasetId}]));if(zoneId===$EDZ.ColorBy){actions.push(dz.getUpdateTemplateAction($THRESHOLD_UTILS.addThresholds(viz.model,viz,viz.node,item)));}}switch(zoneId){case $EDZ.GeoAttribute:mapHelper.geoAttribute=did;break;case $EDZ.Latitude:mapHelper.latitude=did;break;case $EDZ.Longitude:mapHelper.longitude=did;break;case $EDZ.ColorBy:mapHelper.colorBy=did;break;case $EDZ.SizeBy:mapHelper.sizeBy=did;break;case $EDZ.AdditionalMetrics:mapHelper.tooltip.push(did);break;}added=true;},removeFromDropZone=function(did,t,zoneId){if(did){actions.push(dz.getUpdateTemplateAction([{act:"removeDropZoneUnit",zoneId:zoneId,unitId:did,unitType:t}]));}switch(zoneId){case $EDZ.geoAttribute:mapHelper.geoAttribute="";break;case $EDZ.Latitude:mapHelper.latitude="";break;case $EDZ.Longitude:mapHelper.longitude="";break;case $EDZ.ColorBy:mapHelper.colorBy="";break;case $EDZ.SizeBy:mapHelper.sizeBy="";break;case $EDZ.AdditionalMetrics:mapHelper.tooltip=$ARR.filter(mapHelper.tooltip,function(tid){return tid!==did;},{max:mapHelper.tooltip.length});break;}},addForm=function(did,fid){actions.push(dz.getUpdateTemplateAction({act:"addForm",unitId:did,attFormId:fid,unitPos:1}));};mapHelper.setWidget(viz);$ARR.forEach((gsi.rows||[]).concat(gsi.cols||[]),function(o){if(o.did===item.did){find=true;return false;}});if(find){return[];}switch(item.t){case 4:if(colorBy&&!colorBy.items.length){add2DropZone(item.did,item.t,$EDZ.ColorBy,datasetId);}else{if(sizeBy&&!sizeBy.items.length){add2DropZone(item.did,item.t,$EDZ.SizeBy,datasetId);}else{if(tooltip){add2DropZone(item.did,item.t,$EDZ.AdditionalMetrics,datasetId);}}}break;default:var emptyGeo=!mapHelper.geoAttribute&&!mapHelper.latitude&&!mapHelper.longitude,areaForm=mapHelper.getGeoForm(item,function(f){return $MH.isGeoRoleSupportArea(f.fgr);}),moveSizeByColorBy=function(){var mtp=mapHelper.mapType,tooltips=mapHelper.tooltip;if(!$MH.canShowSizeByZone(mtp)&&mapHelper.sizeBy&&tooltips.indexOf(mapHelper.sizeBy)<0){add2DropZone(mapHelper.sizeBy,4,$EDZ.AdditionalMetrics);removeFromDropZone(mapHelper.sizeBy,4,$EDZ.SizeBy);}if(!$MH.canShowColorByZone(mtp)&&mapHelper.colorBy&&tooltips.indexOf(mapHelper.colorBy)<0){add2DropZone(mapHelper.colorBy,4,$EDZ.AdditionalMetrics);removeFromDropZone(mapHelper.colorBy,4,$EDZ.ColorBy);}};if(emptyGeo&&mapHelper.supportAreaMap&&areaForm){mapHelper.setMapType($MH.MTP_AREA);mapHelper.setUseAttributeForm(false);add2DropZone(item.did,item.t,$EDZ.GeoAttribute,datasetId);addForm(item.did,areaForm.fid);}else{var lat=mapHelper.getLatitudeForm(item),lng=mapHelper.getLongitudeForm(item);if(lat&&lng&&emptyGeo){add2DropZone(item.did,item.t,$EDZ.GeoAttribute,datasetId);mapHelper.setMapType($MH.getMapTypeByElementCount(item.card));mapHelper.setUseAttributeForm(true);addForm(item.did,lat.fid);addForm(item.did,lng.fid);add2DropZone(lat.fid,21,$EDZ.Latitude,datasetId);add2DropZone(lng.fid,21,$EDZ.Longitude,datasetId);}else{if((lat||$MH.isLatitude(item.n))&&(!lng&&!$MH.isLongitude(item.n))&&!mapHelper.geoAttribute&&!mapHelper.latitude){add2DropZone(item.did,item.t,$EDZ.Latitude,datasetId);mapHelper.setMapType($MH.getMapTypeByElementCount(item.card));mapHelper.setUseAttributeForm(false);}else{if((!lat&&!$MH.isLatitude(item.n))&&(lng||$MH.isLongitude(item.n))&&!mapHelper.geoAttribute&&!mapHelper.longitude){add2DropZone(item.did,item.t,$EDZ.Longitude,datasetId);mapHelper.setMapType($MH.getMapTypeByElementCount(item.card));mapHelper.setUseAttributeForm(false);}else{if(mapHelper.tooltip.indexOf(item.did)<0){add2DropZone(item.did,item.t,$EDZ.AdditionalMetrics,datasetId);}}}}}if(added){moveSizeByColorBy();}break;}if(added){actions.push({act:"setProperty",nodeKey:data.k,prs:"FormattingWidget",pri:4,v:mstrmojo.string.encodeXMLAttribute(mapHelper.getXml())});}return actions;}function addToGrid(item,datasetId,data,dz){var gsi=data.gsi||{},rows=gsi.rows||[],cols=gsi.cols||[],metrics=gsi.mx||[],actions=[],axis,idx,attInRows,attInCols;dz.clearCardinalityFlags();if($ARR.find(rows.concat(cols).concat(metrics),"did",item.did)===-1){attInCols=!!$ARR.filterOne(cols,function(o){return o.t!==4;});attInRows=!!$ARR.filterOne(rows,function(o){return o.t!==4;});if(item.t===4){axis=-1;if(metrics.length===0){if(!attInRows&&!!attInCols){axis=1;idx=rows.length;}else{axis=2;idx=cols.length;}}idx=metrics.length;}else{if(attInCols&&!attInRows){axis=2;idx=cols.length;dz.findLargeItemsForAddUnits([item]);dz.findTotalColumnCount([item],null);}else{axis=1;idx=rows.length;}}actions.push({act:"updateTemplate",keyContext:data.k,actions:[dz.getHost().model.getAddTemplateUnitAction(item,datasetId,axis,idx)]});}return actions;}mstrmojo.vi.models.DatasetDoubleClick=mstrmojo.provide("mstrmojo.vi.models.DatasetDoubleClick",{addObject:function(item,datasetId,dz){var data=getVizData(dz),actions=[],viz=dz.getHost();if(!item||!data){return actions;}var curVisName=data.visName||"Grid";switch($KNOWN_VIZ.getDefinition(curVisName).id){case $KNOWN_VIZ.GRAPHMATRIX:actions=addToGraphMatrix(item,datasetId,data,dz);break;case $KNOWN_VIZ.ESRIMAP:actions=addToMap(item,datasetId,data,dz,new $VIZ.ESRIMapHelper({data:data}));break;case $KNOWN_VIZ.GOOGLEMAP:actions=addToMap(item,datasetId,data,dz,new $VIZ.GoogleMapHelper({data:data}));break;case $KNOWN_VIZ.HEATMAP:actions=addToHeatmap(item,datasetId,data,dz);break;case $KNOWN_VIZ.NETWORK:actions=addToNetwork(item,datasetId,data,dz);break;case $KNOWN_VIZ.IMAGELAYOUT:actions=addToImageLayout(item,datasetId,data,dz);break;case $KNOWN_VIZ.CUSTOM:actions=(dz.getCustomDropZones&&dz.getCustomDropZones())?[]:addToGrid(item,datasetId,data,dz);break;default:actions=addToGrid(item,datasetId,data,dz);break;}if(datasetId!==data.datasetId){var gsi=dz.getHost().model.data.gsi;var units=gsi?(gsi.rows||[]).concat(gsi.cols||[]).concat(gsi.mx||[]):[];if(datasetId&&(actions.length||mstrmojo.array.find(units,"did",item.did)!==-1)){actions.push({act:"editNode",nodeKey:viz.k,datasetId:datasetId});}}return actions;}});}());