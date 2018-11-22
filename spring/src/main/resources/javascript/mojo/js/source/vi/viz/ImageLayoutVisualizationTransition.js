(function(){mstrmojo.requiresClsP("mstrmojo.chart.model.enums","EnumDSSObjectType","EnumDSSAxisName");mstrmojo.requiresCls("mstrmojo.hash","mstrmojo.array");mstrmojo.requiresClsP("mstrmojo.vi.viz","KnownVisualizations","EnumVisualizationTemplates","VisualizationTransition","HeatMapVisualizationHelper","NetworkVisualizationHelper","ImageLayoutHelper","ESRIMapHelper","GoogleMapHelper","GraphMatrixHelper");var $MOJO=mstrmojo,$HASH=$MOJO.hash,$ARR=$MOJO.array,$VIZ=$MOJO.vi.viz,$KNOWN_VIZ=$VIZ.KnownVisualizations,$VIZTEMPLATES=$VIZ.EnumVisualizationTemplates,$CHART_ENUMS=$MOJO.chart.model.enums,$DSSOBJ_TYPES=$CHART_ENUMS.EnumDSSObjectType,$AXIS_NAMES=$CHART_ENUMS.EnumDSSAxisName,$GRID="Grid",THRESHOLD_BANDS=[0.1,0.3,0.5,0.7,0.9],BAND_COLORS=["#CC2525","#E34B4B","#E97D7D","#79D479","#57BA57","#2CA02C"];function getTemplateInfo(node){var gsi=$HASH.copy(node.data.gsi),whichMetricsAxis=gsi.tma===1?"rows":"cols",metricsAxis=gsi[whichMetricsAxis],mx=gsi.mx;gsi[whichMetricsAxis]=metricsAxis.filter(function(unit){return unit.t!==-1&&unit.did!=="-1";});if(mx){mx.forEach(function(m){m.t=4;});}return gsi;}function isMetricsUnit(u){return u.did==="-1"||u.t===4;}function combineDropZoneActions(node,imageLayoutHelper,actions,templateActions,thresholdActions){var dzActions=imageLayoutHelper.getAddDropZonesAction();if(imageLayoutHelper.colorByMetric){var cbUnit=imageLayoutHelper.colorByMetric;if(isMetricsUnit(cbUnit)){this.addThresholds(node,cbUnit,thresholdActions,BAND_COLORS,THRESHOLD_BANDS);}}dzActions.actions=templateActions.concat(dzActions.actions).concat(thresholdActions);if(dzActions.actions.length){actions.push(dzActions);}return imageLayoutHelper.getXml();}function addRemainingMetrics(gsi,imageLayoutHelper){var i,len,metrics=gsi.mx;if(metrics.length>0){for(i=0,len=metrics.length;i<len;i++){var m=metrics[i];if(m.t!==4){continue;}if(!imageLayoutHelper.colorByMetric){imageLayoutHelper.colorByMetric=m;}else{if((!imageLayoutHelper.sizeByMetric||(m.did!==imageLayoutHelper.sizeByMetric.did))&&(m.did!==imageLayoutHelper.colorByMetric.did)&&m.t===$DSSOBJ_TYPES.DssTypeMetric){imageLayoutHelper.tooltipMetrics.push(m);}}}}}function searchAttr(axisName,node,formNameLowerCase,exclude){var gts=node.data.gts,attr=null,axis=(axisName.toLowerCase()==="row")?gts&&gts.row:gts&&gts.col,n,found,ret;$ARR.forEach(axis,function(u){if(u.otp===12){if(!!formNameLowerCase){found=false;$ARR.forEach(u.fs,function(form){n=form.n;n=n!==undefined?n:"";if(n.toLowerCase()===formNameLowerCase){found=true;return false;}});if(found&&!exclude){attr=u;return false;}if(!found&&exclude){attr=u;return false;}}else{attr=u;return false;}}});if(attr){ret={did:attr.id,t:attr.otp};}return ret;}function searchGeoAttr(axisName,node){return searchAttr(axisName,node,"shapefile",true);}function searchPathToMapAttr(axisName,node){return searchAttr(axisName,node,"shapefile",false);}function emptyTransition(node){var imageLayoutHelper=new $VIZ.ImageLayoutHelper({node:node});return imageLayoutHelper.getXml();}function basicTransition(actions,node,colorBy,sizeBy,mx){var imageLayoutHelper=new $VIZ.ImageLayoutHelper({node:node}),templateActions=[],thresholdActions=[];imageLayoutHelper.geoAttribute=searchGeoAttr("row",node)||searchGeoAttr("col",node);mx.forEach(function(m){m.t=4;});if(colorBy){imageLayoutHelper.colorByMetric=colorBy;}if(sizeBy){imageLayoutHelper.sizeByMetric=sizeBy;}addRemainingMetrics.call(this,{mx:mx},imageLayoutHelper);return combineDropZoneActions.call(this,node,imageLayoutHelper,actions,templateActions,thresholdActions);}function transitionMapToImageLayout(actions,node,oldVisId){var oldHelper,anObj,helperCls=(oldVisId===$VIZTEMPLATES.ESRIMAP)?$VIZ.ESRIMapHelper:$VIZ.GoogleMapHelper,imageLayoutHelper=new $VIZ.ImageLayoutHelper({node:node}),templateActions=[],thresholdActions=[];oldHelper=new helperCls({data:node.data});oldHelper.setWidget(this.vis);anObj=oldHelper.getGeoUnit();if(anObj){imageLayoutHelper.geoAttribute=anObj;}else{var theTooltips=oldHelper.getTooltipUnits();$ARR.forEach(theTooltips,function(ele){if(ele.t===12){imageLayoutHelper.geoAttribute=ele;return false;}});if(!imageLayoutHelper.geoAttribute){imageLayoutHelper.geoAttribute=searchAttr("row",node)||searchAttr("col",node);}if(!imageLayoutHelper.geoAttribute){return emptyTransition(node);}}var colorBy=oldHelper.getColorByUnit(),sizeBy=oldHelper.getSizeByUnit(),tooltips=oldHelper.getTooltipUnits();anObj=colorBy;if(anObj){imageLayoutHelper.colorByMetric=anObj;}anObj=sizeBy;if(anObj){imageLayoutHelper.sizeByMetric=anObj;}addRemainingMetrics.call(this,{mx:tooltips},imageLayoutHelper);return combineDropZoneActions.call(this,node,imageLayoutHelper,actions,templateActions,thresholdActions);}function transitionGraphMatrixToImageLayout(actions,node){var mx=node.data.gsi.mx||[],graphMatrixHelper=new $VIZ.GraphMatrixHelper({node:node}),colorBy,sizeBy;mx=this.filterGMTrainingMetric(node.data.dz,mx);graphMatrixHelper.setData(node.data.dz);$ARR.forEach(graphMatrixHelper.colorByObjects,function(obj){if(graphMatrixHelper.isMetric(obj)){colorBy=obj;return false;}});$ARR.forEach(graphMatrixHelper.sizeByObjects,function(obj){if(graphMatrixHelper.isMetric(obj)){sizeBy=obj;return false;}});return basicTransition.call(this,actions,node,colorBy,sizeBy,mx);}function transitionHeatMapToImageLayout(actions,node){var mx=node.data.gsi.mx||[],heatmapHelper=new $VIZ.HeatMapVisualizationHelper({node:node}),colorBy,sizeBy;heatmapHelper.setData(node.data.dz);$ARR.forEach($ARR.ensureArray(heatmapHelper.colorBy),function(obj){if(heatmapHelper.isMetric(obj)){colorBy=obj;return false;}});$ARR.forEach($ARR.ensureArray(heatmapHelper.sizeByMetric),function(obj){if(heatmapHelper.isMetric(obj)){sizeBy=obj;return false;}});return basicTransition.call(this,actions,node,colorBy,sizeBy,mx);}function transitionNetworkToImageLayout(actions,node){var mx=node.data.gsi.mx||[],networkHelper=new $VIZ.NetworkVisualizationHelper({node:node}),colorBy,sizeBy;networkHelper.setData(node.data.dz);$ARR.forEach($ARR.ensureArray(networkHelper.edgeColorMetric),function(obj){if(networkHelper.isMetric(obj)){colorBy=obj;return false;}});$ARR.forEach($ARR.ensureArray(networkHelper.nodeSizeMetric).concat($ARR.ensureArray(networkHelper.edgeSizeMetric)),function(obj){if(networkHelper.isMetric(obj)){sizeBy=obj;return false;}});return basicTransition.call(this,actions,node,colorBy,sizeBy,mx);}function transitionGridToImageLayout(actions,node){var mx=node.data.gsi.mx||[];return basicTransition.call(this,actions,node,null,null,mx);}mstrmojo.vi.viz.ImageLayoutVisualizationTransition=mstrmojo.declare(mstrmojo.vi.viz.VisualizationTransition,null,{scriptClass:"mstrmojo.vi.viz.ImageLayoutVisualizationTransition",transitionDropZones:function transitionDropZones(actions,vt){var newWidgetProp="";var vis=this.vis,data=vis.node.data,curVisName=data.visName?data.visName:$GRID,curVisId=$KNOWN_VIZ.getDefinition(curVisName).id;switch(curVisId){case $KNOWN_VIZ.GRAPHMATRIX:newWidgetProp=transitionGraphMatrixToImageLayout.call(this,actions,vis.node);break;case $KNOWN_VIZ.GOOGLEMAP:newWidgetProp=transitionMapToImageLayout.call(this,actions,vis.node,curVisId);break;case $KNOWN_VIZ.ESRIMAP:newWidgetProp=transitionMapToImageLayout.call(this,actions,vis.node,curVisId);break;case $KNOWN_VIZ.HEATMAP:newWidgetProp=transitionHeatMapToImageLayout.call(this,actions,vis.node);break;case $KNOWN_VIZ.NETWORK:newWidgetProp=transitionNetworkToImageLayout.call(this,actions,vis.node);break;case $KNOWN_VIZ.IMAGELAYOUT:break;default:newWidgetProp=transitionGridToImageLayout.call(this,actions,vis.node);break;}return{wp:newWidgetProp,handled:false};}});})();