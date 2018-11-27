(function(){mstrmojo.requiresCls("mstrmojo.hash");var _H=mstrmojo.hash;mstrmojo.esrimap.ESRIDensityLayerAdaptee=null;function deferredESRIDensityLayerAdapteeClassDefinition(){if(!!mstrmojo.esrimap.ESRIDensityLayerAdaptee){return ;}mstrmojo.esrimap.ESRIDensityLayerAdaptee=mstrmojo.declare(esri.layers.Layer,[mstrmojo._CanDrawHeatMap],{scriptClass:"mstrmojo.esrimap.ESRIDensityLayerAdaptee",div_:null,mapViewer:null,_connects:null,visible:true,init:function init(props){_H.copy(props,this);if(props.map){this._map=props.map;this.loaded=true;}},_setMap:function(map,container){this.div_=document.createElement("DIV");if(!this.div_){return ;}this.div_.id="canvasparent";this.div_.style.border="none";this.div_.style.borderWidth="0px";this.div_.style.margin="0px";this.div_.style.cursor="pointer";this.visible?this.showLayer():this.hideLayer();container.appendChild(this.div_);this._connects=[];this._connects.push(dojo.connect(map,"onPan",this,this._panHandler));this._connects.push(dojo.connect(map,"onExtentChange",this,this._extentChangeHandler));this._connects.push(dojo.connect(map,"onZoomStart",this,this.clearDensity));this._connects.push(dojo.connect(map,"onClick",this,this.handleMouseClick));this._connects.push(dojo.connect(map,"onMouseMove",this,this.handleMouseMove));this.drawDensity();return this.div_;},_unsetMap:function(map,container){dojo.forEach(this._connects,function(item){dojo.disconnect(item);});if(this.div_){this.div_.parentNode.removeChild(this.div_);this.div_=null;}this._map=this.canvas=this._connects=null;},showLayer:function showLayer(){if(!this.div_){return ;}this.div_.style.visibility="visible";this.show();},hideLayer:function hideLayer(){if(!this.div_){return ;}this.div_.style.visibility="hidden";this.hide();},_panHandler:function(extent,delta){this.positionCanvas(delta);},_extentChangeHandler:function(extent,delta,levelChange,lod){if(!levelChange&&this.canvas){this.positionCanvas({x:0,y:0});this.clearDensity();}this.drawDensity();},cluster:null,handleMouseClick:function handleMouseClick(event){var pixLL=event.screenPoint;this.cluster=this.getAttrsFromLocationMapRange(Math.ceil(pixLL.x),Math.ceil(pixLL.y),5);if(this.cluster.length>0){var pixel=this.cluster[0];if(this.mapViewer.parent.enableClickSelect){this.mapViewer.handleDensitySelection(this.cluster);this.mapViewer.parent.handleSingleSelection(true);}}else{this.mapViewer.hideInfoWindow();this.mapViewer.onMapClick();}},handleMouseMove:function(evt){var pixLL=event.screenPoint;this.cluster=this.getAttrsFromLocationMapRange(Math.ceil(pixLL.x),Math.ceil(pixLL.y),5);if(this.cluster.length>0){var pixel=this.cluster[0];if(this.mapViewer.parent.enablePopup){this.mapViewer.showTooltip(evt,pixel);this.mapViewer.infoWindowVisible=true;}}else{if(this.mapViewer.infoWindowVisible){this.mapViewer.hideTooltip();this.mapViewer.infoWindowVisible=false;}}},handleMouseMove:function(evt){var pixLL=event.screenPoint;this.cluster=this.getAttrsFromLocationMapRange(Math.ceil(pixLL.x),Math.ceil(pixLL.y),5);if(this.cluster.length>0){var pixel=this.cluster[0];if(this.mapViewer.parent.enablePopup){this.mapViewer.showTooltip(evt,pixel);this.mapViewer.infoWindowVisible=true;}}else{if(this.mapViewer.infoWindowVisible){this.mapViewer.hideTooltip();this.mapViewer.infoWindowVisible=false;}}},getTopLeft:function getTopLeft(){if(!this._map&&!!this.mapViewer.parent){return new esri.geometry.Point(0,0,this.mapViewer.parent.esriMap.spatialReference);}return this._map.position;},getScreenPointForLocation:function getScreenPointForLocation(position){return esri.geometry.toScreenGeometry(this._map.extent,this._map.width,this._map.height,position);},getBounds:function getBounds(){var newBounds=this._map&&this._map.extent;return newBounds;},hasMapBoundsChanged:function hasMapBoundsChanged(){return true;}});}mstrmojo.esrimap.ESRIDensityLayer=mstrmojo.declare(mstrmojo.Obj,null,{scriptClass:"mstrmojo.esrimap.ESRIDensityLayer",densityLayer:null,init:function init(props){this._super(props);deferredESRIDensityLayerAdapteeClassDefinition();this.densityLayer=this.addDisposable(new mstrmojo.esrimap.ESRIDensityLayerAdaptee(props));},showLayer:function showLayer(){this.densityLayer.showLayer();},hideLayer:function hideLayer(){this.densityLayer.hideLayer();},addLayer:function addLayer(esriMap){esriMap.addLayer(this.densityLayer);},removeLayer:function removeLayer(esriMap){esriMap.removeLayer(this.densityLayer);}});}());