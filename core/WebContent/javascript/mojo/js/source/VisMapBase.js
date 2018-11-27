(function(){mstrmojo.requiresCls("mstrmojo.VisBase","mstrmojo.array","mstrmojo.gmaps.MapLegend","mstrmojo.VisEnum","mstrmojo.gmaps.MapEnums","mstrmojo.vi.viz.EnumDSSDropZones");var $ARR=mstrmojo.array,$VIS_ENUM=mstrmojo.VisEnum,LEGEND_DATA_TYPE=$VIS_ENUM.GMLegendDataType,MAPS_PROPERTIES=$VIS_ENUM.MAPS_PROPERTIES,$LEGEND=mstrmojo.gmaps.MapLegend,$EDZ=mstrmojo.vi.viz.EnumDSSDropZones,$EnumDataLabel=mstrmojo.gmaps.EnumDataLabel,REG_SPLIT32=new RegExp(".{32}","g");var DEFAULT_DATA_LABEL_PROPS={dlShw:[0],dlShwAll:[false],dlFntFml:["Arial"],dlFntSz:["8pt"],dlFntStyle:[0],dlFntClr:[0]};function getUnitsById(did,data){var gsi=data.gsi||{},r=[];if(did){$ARR.forEach((gsi.rows||[]).concat(gsi.cols||[]),function(item){if(item.did===did){r=[{id:did,t:item.t}];return false;}});if(!r.length){$ARR.forEach(gsi.mx||[],function(m){if(m.did===did){r=[{id:did,t:4}];return false;}});}}return r;}function getGridData(k){var data=this.getData();if(!k||!data.k||data.k===k){return data;}else{return(!!data.sdp?data.sdp[k]:{});}}function getDz(k){return getGridData.call(this,k).dz;}function getVp(k){var data=this.getData();if(!k||!data.k||data.k===k){return data.vp;}else{return(!!data.vp&&!!data.vp.sgProps?data.vp.sgProps[k]:{});}}function getIDFromDropZoneItems(items){if(!!items&&items.length>0){return items[0].id;}return null;}function getIDListFromDropZoneItems(items){if(!!items&&items.length>0){var itemCount=items.length,item,result=[],index;for(index=0;index<itemCount;index++){item=items[index];result.push(item.id);}return result;}return null;}mstrmojo.VisMapBase=mstrmojo.declare(mstrmojo.VisBase,null,{scriptClass:"mstrmojo.VisMapBase",vpNameMappings:{ga:"ma",lat:"lat",lng:"lng",atf:"atf",mtp:"mtp"},canOnlyDragOnTitleBar:true,observableModel:null,getDropZoneItems:function getDropZoneItems(zoneId,k){var data=getGridData.call(this,k),nmp=this.vpNameMappings,dz=getDz.call(this,k),vp=getVp.call(this,k),r=[];switch(zoneId){case $EDZ.GeoAttribute:if(dz&&dz.Geo){r=dz.Geo.TemplateUnit||[];}else{var EnumMarkerType={MARKER:"1",BUBBLE:"2",AREA:"3",DENSITY:"4"},atId=(!!vp&&vp[nmp.mtp]===EnumMarkerType.AREA&&vp[nmp.atf])?vp[nmp.atf]:(!!vp&&vp[nmp.ga]);r=getUnitsById.call(this,atId,data);}break;case $EDZ.Latitude:if(dz&&dz.Lat){r=dz.Lat.TemplateUnit||[];}else{var latId=!!vp&&vp[nmp.lat],lat=getUnitsById.call(this,latId,data);if(latId){r=lat.length?lat:[{id:latId,t:21}];}}break;case $EDZ.Longitude:if(dz&&dz.Long){r=dz.Long.TemplateUnit||[];}else{var lngId=!!vp&&vp[nmp.lng],lng=getUnitsById.call(this,lngId,data);if(lngId){r=lng.length?lng:[{id:lngId,t:21}];}}break;case $EDZ.Angle:if(dz&&dz.AngleBy){r=dz.AngleBy.TemplateMetric||[];}else{r=getUnitsById.call(this,!!vp&&vp.amt,data);}break;case $EDZ.ColorBy:if(dz&&dz.ColorBy){r=dz.ColorBy.TemplateMetric||[];}else{r=getUnitsById.call(this,!!vp&&vp.cmt,data);}break;case $EDZ.SizeBy:if(dz&&dz.SizeBy){r=dz.SizeBy.TemplateMetric||[];}else{r=getUnitsById.call(this,!!vp&&vp.smt,data);}break;case $EDZ.AdditionalMetrics:var tooltips=dz&&dz.AdditionalMetrics;if(tooltips){r=(tooltips.TemplateMetric||[]).concat(tooltips.TemplateUnit||[]).sort(function(a,b){return a.idx-b.idx;});}else{var me=this;var ids=!!vp&&vp.tooltip;ids=ids?ids.match(REG_SPLIT32):[];$ARR.forEach(ids,function(id){var units=getUnitsById.call(me,id,data);if(units.length){r=r.concat(units);}});}break;}$ARR.forEach(r,function(x){if(!x.did){x.did=x.id;}});return r;},getDropZones:function getDropZones(k){var dropZones={};var geoItems=this.getDropZoneItems($EDZ.GeoAttribute,k);dropZones.geoAttribute=getIDFromDropZoneItems(geoItems);var latitudeItems=this.getDropZoneItems($EDZ.Latitude,k);dropZones.latitude=getIDFromDropZoneItems(latitudeItems);var longitudeItems=this.getDropZoneItems($EDZ.Longitude,k);dropZones.longitude=getIDFromDropZoneItems(longitudeItems);var angleItems=this.getDropZoneItems($EDZ.Angle,k);dropZones.angle=getIDFromDropZoneItems(angleItems);var colorByItems=this.getDropZoneItems($EDZ.ColorBy,k);dropZones.colorBy=getIDFromDropZoneItems(colorByItems);var sizeByItems=this.getDropZoneItems($EDZ.SizeBy,k);dropZones.sizeBy=getIDFromDropZoneItems(sizeByItems);var tooltipItems=this.getDropZoneItems($EDZ.AdditionalMetrics,k);dropZones.tooltips=getIDListFromDropZoneItems(tooltipItems);return dropZones;},findSelectorControl:function findSelectorControl(){var sc;if(this._super){sc=this._super();}var mapViewers=this.gridDataViewer,i,mapViewer;if(mapViewers){for(i=0;i<mapViewers.length;i++){mapViewer=mapViewers[i];if(mapViewer.findSelectorControl){mapViewer.findSelectorControl();}}}return sc;},isClearAllDisabled:function isClearAllDisabled(){var sc=this.findSelectorControl();if(!!sc&&!sc.showall){return true;}return false;},clearSelections:function clearSelections(){if(this._super){this._super();}var mapViewers=this.gridDataViewer,i,mapViewer;if(mapViewers){for(i=0;i<mapViewers.length;i++){mapViewer=mapViewers[i];if(mapViewer.clearSelections){mapViewer.clearSelections();}}}},showWait:function showWait(){if(mstrApp&&mstrApp.showWait){mstrApp.showWait();}else{if(microstrategy&&microstrategy.showWait){microstrategy.showWait(true);}}},hideWait:function hideWait(force){if(mstrApp&&mstrApp.hideWait){mstrApp.hideWait(force);}else{if(microstrategy&&microstrategy.showWait){microstrategy.showWait(false);}}},getLegendBoundaryNode:function(){return this.domNode;},hasColorByOrSizeBy:function(){var colorByItems=this.getDropZoneItems($EDZ.ColorBy),sizeByItems=this.getDropZoneItems($EDZ.SizeBy),hasColorByItems=colorByItems&&colorByItems.length>0,hasSizeByItems=sizeByItems&&sizeByItems.length>0;return hasColorByItems||hasSizeByItems;},renderLegend:function(){try{var lph=this.legendPlaceholder,dataViewer=this.getPrimaryGridViewer();if(!this.hasColorByOrSizeBy()||!dataViewer.getLegendProperty(MAPS_PROPERTIES.SHOW_LEGEND)){lph.style.display="none";return ;}$LEGEND.applyHTML5Props(dataViewer.getLegendStyles());dataViewer.hEvalSize4Legend();var legendSize=dataViewer.getLegendSize();lph.style.width=legendSize.width+"px";lph.style.height=legendSize.height+"px";var legend=this.legend=new $LEGEND({widget:this,placeholder:lph,cutBy:legendSize.cutBy,cssClass:"gm-legend vis-map-legend",styles:dataViewer.getLegendStyles()});legend.render();legend.parent=this;legend.cutBy=legendSize.cutBy;legend.updateContainerSize(this.getWidth(),this.getHeight());this.legendPlaceholder=this.legend.domNode;this.attachLegendListeners();legend.feedData([{dataType:LEGEND_DATA_TYPE.COLOR_BY,dataObj:dataViewer.colorByInfo},{dataType:LEGEND_DATA_TYPE.SIZE_BY,dataObj:dataViewer.sizeByInfo}],dataViewer.isLegendMinimized());}catch(ex){window.console.log(ex);}},attachLegendListeners:function(){var me=this,id=me.id,legend=me.legend;if(legend){me.legendClickListener=legend.attachEventListener("gm-legend-clicked",id,function(evt){me.onLegendClicked(evt);});me.legendResizeListener=legend.attachEventListener("gm-legend-resized",id,function(evt){me.onLegendResized(evt.position);});}},toggleLegend:function(show){if(!(mstrApp&&mstrApp.isVI)){return ;}var legend=this.legend,lds=legend&&legend.domNode.style;if(show){if(lds&&lds.display!=="block"){lds.display="block";}else{if(!legend){this.renderLegend();}}}else{if(lds){lds.display="none";}}},onLegendClicked:function(evt){var action=evt.action,dataViewer=this.getPrimaryGridViewer();switch(action){case"close":dataViewer.setLegendProperty("showLegend",false);this.toggleLegend(false);return ;}},updateLegend:function(){if(this.legend){var legend=this.legend,dataViewer=this.getPrimaryGridViewer(),legendSize=dataViewer.getLegendSize(),lph=this.legendPlaceholder;lph.style.width=legendSize.width+"px";lph.style.height=legendSize.height+"px";legend.width=legendSize.width;legend.height=legendSize.height;legend.cutBy=legendSize.cutBy;legend.updateContainerSize(this.getWidth(),this.getHeight());legend.feedData([{dataType:LEGEND_DATA_TYPE.COLOR_BY,dataObj:dataViewer.colorByInfo},{dataType:LEGEND_DATA_TYPE.SIZE_BY,dataObj:dataViewer.sizeByInfo}],dataViewer.isLegendMinimized());legend.updateAfterResize();}},onLegendResized:function(delta){var dataViewer=this.getPrimaryGridViewer();dataViewer.resizeLegend(this.legend,delta);this.updateLegend();},removeEventListeners:function removeEventListeners(listeners){var listener;if(!!listeners){for(var j=0;j<listeners.length;j++){listener=listeners[j];if(!listener){continue;}if(!!listener.remove){listener.remove();}else{dojo.disconnect(listener);}}listeners.length=0;}},unrender:function(){if(this.legendClickListener){this.legendClickListener.clear();this.legendClickListener=null;}if(this.legendResizeListener){this.legendResizeListener.clear();this.legendResizeListener=null;}if(!!this.legend){this.legend.destroy();delete this.legend;}this._super();},createOldFormatWidgetPropsXML:mstrmojo.emptyFn,createNewFormatWidgetPropsXML:function createNewFormatWidgetPropsXML(){var widgetPropsXml="<widgetProps><fmt>";var k,wps=this.getPrimaryGridViewer().getWidgetProps();for(k in wps){if(k==="sgProps"){continue;}widgetPropsXml+="<"+k+' value="'+this.encode(this.encode(wps[k]))+'" />';}widgetPropsXml+='<sgProps value="';var gridsValue="<sgProps>";for(var i=0;i<this.gridDataViewer.length;i++){if(i===this._primaryGridIndex){continue;}wps=this.gridDataViewer[i].getWidgetProps();gridsValue+='<g k="'+this.gridDataViewer[i].data.k+'">';for(k in wps){gridsValue+="<"+k+' value="'+wps[k]+'" />';}gridsValue+="</g>";}gridsValue+="</sgProps>";widgetPropsXml+=this.encode(this.encode(gridsValue));widgetPropsXml+='"/>';widgetPropsXml+="</fmt></widgetProps>";return widgetPropsXml;},createWidgetPropsXML:function createWidgetPropsXML(){if(!this.widgetProps){return null;}if(!this.widgetProps.sgProps){return this.createOldFormatWidgetPropsXML();}return this.createNewFormatWidgetPropsXML();},isVI:function isVI(){return mstrApp&&mstrApp.isVI;},getVisProps:function getVisProps(key){var primaryModel=this.getData();if(!key||primaryModel.k===key){if(!primaryModel.vp){primaryModel.vp={};}return primaryModel.vp;}var sgProps=primaryModel.vp.sgProps;if(sgProps){if(!sgProps[key]){sgProps[key]={};}return sgProps[key];}return{};},getObservableModel:function getObservableModel(key){return this.observableModel.getModel(key);},replaceSpace:function replaceSpace(str,replaceStr){var replace=replaceStr;if(replace===undefined){replace="_";}return str.replace(/ /g,replace);},updatePropertiesEditor:function updatePropertiesEditor(){var i,listener,listenerCount=this.gridParamDownloadListener?this.gridParamDownloadListener.length:0;for(i=0;i<listenerCount;i++){listener=this.gridParamDownloadListener[i];listener.callback.call(listener.listener);}this.gridParamDownloadListener=null;},parseDataLabelProperties:function(){var key,widgetProps=this.widgetProps;for(key in DEFAULT_DATA_LABEL_PROPS){if(DEFAULT_DATA_LABEL_PROPS.hasOwnProperty(key)){if(!widgetProps[key]){widgetProps[key]=DEFAULT_DATA_LABEL_PROPS[key][0];}if(key===$EnumDataLabel.DATA_LABEL_FONT_COLOR&&!isNaN(widgetProps[key])){widgetProps[key]=parseInt(widgetProps[key]);}else{if(key===$EnumDataLabel.DATA_LABEL_FONT_STYLE||key===$EnumDataLabel.DATA_LABEL_SHOW){widgetProps[key]=parseInt(widgetProps[key]);}else{if(key===$EnumDataLabel.DATA_LABEL_SHOW_ALL){widgetProps[key]=widgetProps[key]===true||widgetProps[key]==="true";}}}}}},updateDataLabelLayer:function(){var i,n=(this.gridDataViewer&&this.gridDataViewer.length)||0;for(i=0;i<n;i++){this.gridDataViewer[i].buildDataLabelLayer();}},showDataLabelOption:function(){var i,n=(this.gridDataViewer&&this.gridDataViewer.length)||0;for(i=0;i<n;i++){if(this.gridDataViewer[i].supportDataLabel()){return true;}}return false;},showDataLabelText:function(){return !!this.getDropZoneItems($EDZ.GeoAttribute)[0];},showDataLabelValue:function(){return this.dataLabelMetricConfig!==undefined;},getDataLabelMetricConfig:function(){var i,n,metrics,data=this.getData(),col=data.gts&&data.gts.col,colorByMetric=this.getDropZoneItems($EDZ.ColorBy)[0];this.dataLabelMetricConfig=undefined;if(colorByMetric&&col&&col.length===1&&col[0].otp===-1){metrics=col[0].es;n=metrics.length;for(i=0;i<n;i++){if(metrics[i].oid===colorByMetric.id){this.dataLabelMetricConfig={index:i,name:this.replaceSpace(metrics[i].n)};return ;}}}},persistDataLabelFormatting:function(propName,newValue){var widgetId=this.id,oldValue=this.widgetProps[propName],updateCallback=this.zonesModel&&this.zonesModel.getUpdateCallback(),updateAndRefresh=function(value){var host=mstrmojo.all[widgetId];host.widgetProps[propName]=value;host.updateDataLabelLayer();if(updateCallback){updateCallback.success();}},undoRedoConfig={silent:true,undo:function(){updateAndRefresh(oldValue);},redo:function(){updateAndRefresh(newValue);}};updateAndRefresh(newValue);this.updateAfterPropertiesChange(undefined,true,false,undoRedoConfig);},getAttributeName:function(index){var attr,form,fn,an,gsiAttrs,data=this.model.data,disFtp=data.lnm,gtsAttrs=data.gts.row||[];attr=gtsAttrs[index];if(attr){if(this.isOIVM()){return attr.n;}form=attr.fs&&attr.fs[0];fn=(form&&form.n)||"";if(disFtp===2){return fn;}gsiAttrs=(data.gsi.rows||[]).concat(data.gsi.cols||[]);$ARR.forEach(gsiAttrs,function(item){if(item.did===attr.id){an=item.n;return false;}});if(an===undefined){an=attr.dn||attr.n;}if(disFtp===1){return fn?an+" "+fn:an;}return an;}return"";}});})();