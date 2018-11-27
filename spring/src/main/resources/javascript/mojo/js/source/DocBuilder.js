(function(){mstrmojo.requiresCls("mstrmojo.EnumRWUnitType","mstrmojo.hash","mstrmojo.Button","mstrmojo.css");var $UNIT_TYPES=mstrmojo.EnumRWUnitType,$HASH=mstrmojo.hash,clsMap={},$NWB=mstrmojo.Button.newWebButton,$ARR=mstrmojo.array;clsMap[$UNIT_TYPES.HEADER]=clsMap[$UNIT_TYPES.FOOTER]=clsMap[$UNIT_TYPES.PAGEHEADER]=clsMap[$UNIT_TYPES.PAGEFOOTER]=clsMap[$UNIT_TYPES.DETAILS]={n:"Section"};clsMap[$UNIT_TYPES.HTMLCONTAINER]={n:"HTMLContainer"};clsMap[$UNIT_TYPES.SELECTOR]={n:"Selector"};clsMap[$UNIT_TYPES.GRID]={n:"Xtab"};clsMap[$UNIT_TYPES.MOJOVISUALIZATION]={n:"MojoVisualization"};function getNodeType(nodeDefn){return(nodeDefn&&nodeDefn.t)||mstrmojo.EnumRWUnitType.LAYOUT;}mstrmojo.DocBuilder=mstrmojo.declare(mstrmojo.Obj,null,{scriptClass:"mstrmojo.DocBuilder",visList:null,selectorFactory:null,classMap:null,init:function init(props){this._super(props);var selectorFactory=this.selectorFactory=this.createSelectorFactory();this.addDisposable(selectorFactory);this.classMap=this.createClassMap();},createSelectorFactory:function createSelectorFactory(){this.throwAbstractMethodError("getSelectorFactory");},createClassMap:function createClassMap(){return $HASH.copy(clsMap);},getMojoVisName:function getMojoVisName(node){var visName="",nodeData=node.data,nodeType=getNodeType(node.defn),v=nodeData&&nodeData.vis;if(v&&(nodeType===$UNIT_TYPES.GRID||nodeType===$UNIT_TYPES.GRAPH||nodeType===$UNIT_TYPES.GRIDGRAPH)){if(v.vn&&v.ve&&v.vm===51){visName=v.vn;}else{if(v.we&&v.wcn){visName=this.visList.findVisName(v.wcn);}}}return visName;},build:function build(nodes,model,buildConfig){var classMap=this.classMap,arr=[],len=((nodes&&nodes.length)||0),i,node,nodeDefn,nodeData,nodeType,config,visName,fn,w;for(i=0;i<len;i++){node=nodes[i];nodeDefn=node&&node.defn;nodeData=node&&node.data;nodeType=getNodeType(nodeDefn);config=classMap[nodeType];if(nodeType===$UNIT_TYPES.TEXTFIELD&&((nodeDefn&&nodeDefn.dpst))){config=classMap[nodeType+"B"];}visName=nodeData&&(nodeData.visName||nodeData.vis&&this.getMojoVisName(node));if(visName){nodeData.visName=visName;config=clsMap[$UNIT_TYPES.MOJOVISUALIZATION];}fn=(config&&config.n)?"new"+config.n:"";w=undefined;if(this[fn]){w=this[fn](model,node,config,buildConfig);}else{if(config&&config.scriptClass){var clazz=config.cls;if(!clazz){clazz=$HASH.walk(config.scriptClass,window);}if(clazz){w=this.newRWUnitInstance(model,node,clazz);}}}if(w){w.k=node.k;w.builder=this;w.tooltip=nodeData.tooltip||nodeDefn.tooltip||"";if(!w.defn){w.defn=nodeDefn;w.disposables.push(w.defn);}if(w.update){w.update(node);}if(this.isPortlet(nodeDefn)){w=this.createPortlet(nodeType,node,w,buildConfig);}if(!this.extractWidget(w,node)){arr.push(w);}}}return arr;},createPortlet:function createPortlet(type,node,w,buildConfig){return w;},newRWUnitInstance:function newRWUnitInstance(model,node,Clazz,props){return new Clazz($HASH.copy(props||{},{id:node.id,node:node,controller:this.parent.controller,model:model}));},newSection:function newSection(model,node){this.throwAbstractMethodError("newSection");},newSelector:function newSelector(model,node,config,buildConfig){var cls=this.selectorFactory.newDocSelector(model,node,config,buildConfig);cls.controller=this.parent.controller;return cls;},isPortlet:function isPortlet(nodeDefn){return !!((nodeDefn.t!==$UNIT_TYPES.PANEL&&nodeDefn.ttl!==undefined)||nodeDefn.qsm);},extractWidget:function extractWidget(widget,node){return !widget;},getDefaultMojoVisModel:function getDefaultMojoVisModel(){this.throwAbstractMethodError("getDefaultMojoVisModel");},newMojoVisualization:function(model,node){var visList=this.visList,nodeData=node.data,visInfo=visList.getVis(nodeData.visName),viewClassName=visInfo&&((visInfo.dc!==undefined)?visInfo.dc:visInfo.c),me=this;if(!visInfo){var className=nodeData.className,exist=false;if(!className){if(!this.widgetNotFound){this.widgetNotFound=[];}$ARR.forEach(this.widgetNotFound,function(item){if(item.key===nodeData.k){exist=true;}});if(!exist){this.widgetNotFound.push({key:nodeData.k,name:nodeData.visName});}else{this.widgetNotFound=[];this.widgetNotFound.push({key:nodeData.k,name:nodeData.visName});}var pluginLen=this.widgetNotFound.length,descId=pluginLen>1?14642:14643,desc=pluginLen>1?"The following custom visualization plug-ins are missing and will be displayed as grids: ##.":"The following custom visualization plug-in is missing and will be displayed as a grid: ##.";if(!showWarning){var showWarning=window.setTimeout(function(){var widget=[];$ARR.forEach(this.widgetNotFound,function(item){widget.push(item.name);});mstrmojo.warn(mstrmojo.desc(descId,desc).replace("##",widget),{},{buttons:[$NWB(mstrmojo.desc(1442,"OK"),function(){})]});}.bind(this),0);}var xtab=this.newXtab(model,node);xtab.cssDefault=!!xtab.cssDefault?xtab.cssDefault+" noVis":"noVis";return xtab;}visInfo={dc:className};}var fqcn="mstrmojo."+viewClassName,bundleName=visInfo.b;if(mstrApp.isVI&&visInfo.vib){bundleName=visInfo.vib;}else{if(mstrApp.isExpress&&visInfo.oivmb){bundleName=visInfo.oivmb;}}if(bundleName&&!mstrmojo.loader.isLoaded(fqcn)){mstrmojo.requiresBundle(bundleName);}mstrmojo.requiresCls(fqcn);var vizModelName=this.visList.getVis(node.data.visName).m,ViewClass=$HASH.walk(viewClassName,mstrmojo),ModelClass=vizModelName?$HASH.walk(vizModelName,mstrmojo):this.getDefaultMojoVisModel();if(!ViewClass||!ModelClass){throw new Error("Missing visualization class.");}ViewClass=visList.getVisClass(ViewClass,node.defn);var vis=new ViewClass($HASH.copy(nodeData.extProps,{id:node.id,node:node,n:node.defn.title,controller:this.parent.controller,gb:nodeData.gbys}));var visModel=new ModelClass({xtab:vis,controller:this.parent.controller,docModel:model});vis.setModel(visModel);visModel.set("data",nodeData);if(!!node.data.sdp){var sdpKey;for(sdpKey in node.data.sdp){node.data.sdp[sdpKey].defn={};var obj=this.newXtab(model,node.data.sdp[sdpKey]);obj.setModel(new ModelClass({xtab:obj,controller:this.parent.controller,docModel:model,data:node.data.sdp[sdpKey]}));obj.k=sdpKey;}}return vis;},getEditableXtab:function getEditableXtab(node){this.throwAbstractMethodError("getEditableXtab");},getDefaultXtab:function getDefaultXtab(node){this.throwAbstractMethodError("getDefaultXtab");},newXtab:function newXtab(model,node,config,buildConfig){var xtab=mstrmojo.all[node.id];if(!xtab){xtab=this.newRWUnitInstance(model,node,node.defn.txi?this.getEditableXtab(node):this.getDefaultXtab(buildConfig));xtab.model=this.newXtabModel({xtab:xtab,docModel:model});}else{xtab.set("node",node);xtab.model.set("docModel",model);}return xtab;},newXtabModel:function newXtabModel(params){this.throwAbstractMethodError("newXtabModel");}});mstrmojo.DocBuilder.ClassMapItemType=null;}());