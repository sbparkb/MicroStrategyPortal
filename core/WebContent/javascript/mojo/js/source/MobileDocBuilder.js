(function(){mstrmojo.requiresCls("mstrmojo.Obj","mstrmojo.DocBuilder","mstrmojo.rw._IsReportServicesDocBuilder","mstrmojo.MobileDocLayoutViewer","mstrmojo.MobileDocXtabGraph","mstrmojo._XtabSeamlessIncrementalFetch","mstrmojo._HasScrollbox","mstrmojo.MobileXtab","mstrmojo.graph.MobileDocXtabCanvasGraph","mstrmojo.DynamicClassFactory","mstrmojo.android.DocSelectorViewFactory","mstrmojo.android.DocPanelStack","mstrmojo.android.AndroidDocPanel","mstrmojo.android.ui.DocButton","mstrmojo.android.HTMLContainer","mstrmojo._HasRelativeUrls","mstrmojo._Formattable","mstrmojo._IsDocXtab","mstrmojo._IsSelectorTarget","mstrmojo._IsInteractiveGrid","mstrmojo.DocInfoWindow","mstrmojo.android.AndroidDICConfig","mstrmojo.AndroidVisList","mstrmojo.array","mstrmojo.hash","mstrmojo.maps.AndroidDocMap","mstrmojo.maps.MobileMapInfoWindowLayoutViewer","mstrmojo.android.ui._IsTouchLink","mstrmojo.android.DocTextfield","mstrmojo.DocVisModel","mstrmojo._CanSupportTransaction","mstrmojo._IsEditableXtab","mstrmojo._HasDrillLinks");var $CFC=mstrmojo.DynamicClassFactory.newComponent,$HRU=mstrmojo._HasRelativeUrls,$FREE=mstrmojo.Obj.free,$EN=mstrmojo.EnumRWUnitType,$ARR=mstrmojo.array,$HASH=mstrmojo.hash;mstrmojo.DocXtab=$CFC(mstrmojo.MobileXtab,[mstrmojo._Formattable,mstrmojo._IsSelectorTarget,mstrmojo._IsDocXtab],{scriptClass:"mstrmojo.DocXtab",scrollerConfig:{scrollPast:false}});var mapSuperPkg=(!!mstrMobileApp&&!!mstrMobileApp.useNativeMap&&mstrMobileApp.useNativeMap())?"androidmap":"jsmap";mstrmojo.maps.AndroidDocLayoutMap=$CFC(mstrmojo.maps[mapSuperPkg].AndroidDocMap,null,{scriptClass:"mstrmojo.maps.AndroidDocLayoutMap"});mstrmojo.MobileDocImage=$CFC(mstrmojo.DocImage,[$HRU],{scriptClass:"mstrmojo.MobileDocImage",relativeUrls:["v"]});mstrmojo.MobileDocHTMLContainer=$CFC(mstrmojo.DocHTMLContainer,[$HRU],{scriptClass:"mstrmojo.MobileDocHTMLContainer",relativeUrls:["v"]});var fh=mstrmojo.DocLayout.prototype.formatHandlers.domNode;$ARR.removeItem(fh,"border");$ARR.removeItem(fh,"background-color");mstrmojo.MobileDocBuilder=mstrmojo.declare(mstrmojo.DocBuilder,[mstrmojo.rw._IsReportServicesDocBuilder],{scriptClass:"mstrmojo.MobileDocBuilder",visList:mstrmojo.AndroidVisList,createSelectorFactory:function createSelectorFactory(){return new mstrmojo.android.DocSelectorViewFactory();},createClassMap:function createClassMap(){var clsMap=this._super();clsMap[$EN.TEXTFIELD+"B"]={n:"Button",scriptClass:"mstrmojo.android.ui.DocButton"};clsMap[$EN.HTMLCONTAINER]={n:"HTMLContainer"};clsMap[$EN.GRAPH]=(mstrApp.onMobileDevice()&&mstrApp.useBinaryFormat)?{n:"graph.MobileDocXtabCanvasGraph",scriptClass:"mstrmojo.graph.MobileDocXtabCanvasGraph"}:{n:"MobileDocXtabGraph",scriptClass:"mstrmojo.MobileDocXtabGraph"};clsMap[$EN.IMAGE]={n:"MobileDocImage",scriptClass:"mstrmojo.MobileDocImage"};clsMap[$EN.PANELSTACK]={n:"PanelStack",scriptClass:"mstrmojo.android.DocPanelStack"};clsMap[$EN.PANEL]={n:"Panel",scriptClass:"mstrmojo.android.AndroidDocPanel"};clsMap[$EN.TEXTFIELD]={n:"Textfield",scriptClass:"mstrmojo.android.DocTextfield"};return clsMap;},getDefaultMojoVisModel:function getDefaultMojoVisModel(){return mstrmojo.DocVisModel;},getLayoutViewerClass:function getLayoutViewerClass(node){if(node.defn.iw){var className="MapInfoWindowLayoutViewer";if(mstrApp.onMobileDevice()){className="Mobile"+className;}return mstrmojo.maps[className];}return mstrmojo.MobileDocLayoutViewer;},newLayout:function newLayout(model,node){var vis=node.defn.visName;if(vis){var groupByInfo=node.data.gbys;var layoutModel=model,layoutNode=$HASH.clone(node);var visGrid=mstrmojo.Vis.getVisGrid(model,node,node.defn.visGK);if(visGrid){node.data=visGrid.data;if(node.defn.vp&&Object.keys(node.defn.vp).length>0){visGrid.data.vp=node.defn.vp;}node.data.layoutModel=layoutModel;node.data.layoutNode=layoutNode;node.data.gbys=groupByInfo;}if(node.data.gts!==undefined||node.data.series!==undefined){node.defn=model.makeObservable(node.defn);this.addDisposable(node.defn);var visObj=this.visList.getVis(vis),viewClassName=(visObj.dc!==undefined)?visObj.dc:visObj.c,xtab,xtabModel;try{if(/AndroidDocMap/.test(viewClassName)){viewClassName="maps.AndroidDocLayoutMap";}var ViewClass=$HASH.walk(viewClassName,mstrmojo),ModelClass=$HASH.walk(visObj.m||"DocVisModel",mstrmojo),controller=this.parent.controller;xtab=new ViewClass({id:(visGrid&&visGrid.id)||node.id,node:node,n:node.defn.title,controller:controller,gb:node.data.gbys,isFullScreenWidget:true});xtabModel=new ModelClass({xtab:xtab,controller:controller,docModel:model});xtab.setModel(xtabModel);}catch(e){xtab=$FREE(xtab);xtabModel=$FREE(xtabModel);throw e;}return xtab;}}return this._super(model,node);},newHTMLContainer:function(model,node){var clsName=(node.defn.ht===0)?"MobileDocHTMLContainer":"android.HTMLContainer",Cls=mstrmojo.hash.walk(clsName,mstrmojo);return new Cls({id:node.id,node:node,model:model});},newInfoWindow:function newInfoWindow(cfg){return new mstrmojo.DocInfoWindow(cfg);},getLinkDrillMixins:function getLinkDrillMixins(){return[mstrmojo.android.ui._IsTouchLink,mstrmojo._HasDrillLinks];},createPortlet:function createPortlet(t,node,w){if(node.defn.ifw){var selPanelKey=w.selectedKey,selPanelDef=(w.model.getUnitDefinitions(selPanelKey)||{})[selPanelKey],selPanelTitle=selPanelDef&&selPanelDef.ttl;w.defn.ttl=((w.titleSrc===w.TTL_SRC_PANEL)?selPanelTitle:w.defn.ttl)||"";if(!mstrApp.isTablet()){w.title=w.defn.ttl;return w;}}return this._super(t,node,w);},getEditableXtab:function getEditableXtab(){if(!mstrmojo.EditableXtab){mstrmojo.EditableXtab=$CFC(mstrmojo.DocXtab,[mstrmojo._CanSupportTransaction,mstrmojo._IsEditableXtab],{scriptClass:"mstrmojo.EditableXtab"});}return mstrmojo.EditableXtab;},getDefaultXtab:function getDefaultXtab(){return mstrmojo.DocXtab;}});}());