(function(){mstrmojo.requiresCls("mstrmojo.qb.QBPreview","mstrmojo.DI.DIMappingPreview","mstrmojo._HasLayout","mstrmojo.DI.DIConstants","mstrmojo.Container","mstrmojo.ui.Checkbox","mstrmojo.DI.ui.dialogs.DIAggregationDialog","mstrmojo.DI.ui.dialogs.DIParseDataDialog","mstrmojo.DI.DIHelpers");mstrmojo.requiresDescs(221,1442,1995,2969,8972,9117,9118,9119,9120,9121,13899,14661);var $ARR=mstrmojo.array,$CSS=mstrmojo.css,$DOM=mstrmojo.dom,$HASH=mstrmojo.hash;var previewMode={raw:0,xtab:1},constants=mstrmojo.DI.DIConstants;var SHOW_PREVIEW=mstrmojo.desc(8972,"Expand")+" "+mstrmojo.desc(3389,"Preview");var HIDE_PREVIEW=mstrmojo.desc(8973,"Collapse")+" "+mstrmojo.desc(3389,"Preview");function openAggregationEditor(){var aggEditorID="aggEditor",editor=aggEditorID&&window.mstrmojo&&mstrmojo.all[aggEditorID],controller,zIndex=mstrApp.getRootController().getDialogController().getNextZIndex(),msgID=mstrApp.getRootController().dataService.messageID,tableID,item,isRefined,hasAggFilter,sourceInfo,launchEditor=function launchEditor(){var launchingApp=window.launchingApp=mstrApp;window.mstrApp=new mstrmojo.qb.QBApp();mstrApp.sessionState=launchingApp.sessionState;mstrApp.msgid=msgID;mstrApp.isSingleTier=launchingApp.isSingleTier;mstrApp.serverProxy=launchingApp.serverProxy;mstrApp.sessionManager=launchingApp.sessionManager;mstrApp.enableAutomaticSessionRecovery=launchingApp.enableAutomaticSessionRecovery;mstrApp.maxSessionIdleTime=launchingApp.maxSessionIdleTime;mstrApp.timeBeforeSessionTimeoutWarning=launchingApp.timeBeforeSessionTimeoutWarning;mstrApp.enableWarningSessionTimeout=launchingApp.enableWarningSessionTimeout;mstrApp.projectName=launchingApp.projectName;mstrApp.serverName=launchingApp.serverName;mstrApp.serverPort=launchingApp.serverPort;mstrApp.authMode=launchingApp.authMode;mstrApp.name=launchingApp.name;mstrApp.persistTaskParams=launchingApp.persistTaskParams;mstrApp.helpUrl=launchingApp.helpUrl;mstrApp.userHelpPage=launchingApp.userHelpPage;mstrApp.autocomplete=launchingApp.autocomplete;controller=mstrApp.rootController=mstrmojo.insert({scriptClass:"mstrmojo.qb.EmmaController"});controller.dataService=mstrmojo.qb.DataService;controller.model=new mstrmojo.qb.EmmaModel({tableID:tableID});controller.model.set("id","QBuilderModel");controller.isBDE=true;if(!editor){editor=mstrmojo.insert({id:aggEditorID,scriptClass:"mstrmojo.DI.ui.dialogs.DIAggregationDialog",onClose:function onClose(){var qbApp=window.mstrApp;msgID=mstrApp.msgid;window.mstrApp=window.launchingApp;controller.model.destroy();controller.destroy();qbApp.destroy();mstrApp.getRootController().dataService.messageID=msgID;mstrApp.getRootController().getImportedDataEMMA(constants.actions.importSource,constants.requestFlag.mapping|constants.requestFlag.sourceInfo|constants.requestFlag.relationship|constants.requestFlag.preview,null,null,tableID);}});}editor.hasAggFilter=hasAggFilter;controller.rootView=editor;controller.zIndex=zIndex;editor.model=controller.model;editor.tableID=tableID;editor.controller=controller;editor.open(null,{zIndex:zIndex});};item=mstrApp.getRootController().model.currentSource;tableID=item.tableID;sourceInfo=item.sourceInfo;isRefined=sourceInfo.isRefined;hasAggFilter=sourceInfo.hasAggFilter;if(isRefined){mstrmojo.confirm(mstrmojo.desc(12717,"Previous changes made in wrangle will be discarded. Would you like to continue?"),{confirmBtn:{fn:function(){mstrApp.getRootController().dataService.cancelRefineStage({success:function success(res){msgID=res.msgid;mstrApp.getRootController().dataService.set("messageID",msgID);var source=mstrApp.getRootController().model.currentSource;delete source.projectID;launchEditor();}},{did:tableID,automap:1,dbr:sourceInfo.dbRoleId});}}});}else{launchEditor();}}function checkSourceTableKey(){var diPreview=this;var bMatch=true;if(!diPreview.model.currentSource){bMatch=false;}else{if(diPreview.sourceTableKey&&diPreview.sourceTableKey!==diPreview.model.currentSource.key){bMatch=false;}}return bMatch;}mstrmojo.DI.DIPreview=mstrmojo.declare(mstrmojo.Container,[mstrmojo._HasLayout],{scriptClass:"mstrmojo.DI.DIPreview",markupString:'<div id="{@id}" class="mstrmojo-di-datapreview {@cssClass}" style="overflow-y: hidden; {@cssText}"><div class="cf di-preview-options"></div><div class="di-preview-container"></div></div>',markupSlots:{containerNode:function(){return this.domNode;},sheetsNode:function(){return this.domNode.children[0];},previewNode:function(){return this.domNode.children[1];}},markupMethods:{onvisibleChange:function(){this.domNode.style.display=(this.visible)?this.cssDisplay:"none";}},widgetResized:function widgetResized(){if(this._super){this._super();}if(this.preGrid&&this.preGrid.hasRendered){this.preGrid.widgetResized();}},mode:previewMode.raw,preBuildRendering:function preBuildRendering(){if(this.parent.scriptClass!=="mstrmojo.StackContainer"){this.setDimensions(parseInt(this.parent.layoutNode.offsetHeight,10),this.parent.layoutNode.offsetWidth);}if(this._super){this._super();}},setDimensions:function setDimensions(h,w){var height=parseInt(h,10);var width=parseInt(w,10);if(isNaN(height)||isNaN(width)){return ;}if(!this.layoutConfig){this.layoutConfig={h:{},w:{}};}this.layoutConfig.h.previewNode=Math.max((height-68),0)+"px";this.layoutConfig.w.previewNode=Math.max((width-36),0)+"px";if(this._super){this._super(height+"px",width-36+"px");}},onBackButtonClick:function(){var handled=false;if(this.mode===previewMode.xtab){this.set("mode",previewMode.raw);mstrApp.getRootController().setModalNodes([this.domNode]);handled=true;}return handled;},onNextButtonClick:function(){mstrApp.getRootController().saveAndPublish();},children:[{scriptClass:"mstrmojo.Box",slot:"sheetsNode",alias:"sheets",cssClass:"di-preview-options-left",children:[{scriptClass:"mstrmojo.ui.Checkbox",cssClass:"preview-toggle",alias:"previewToggler",markupString:'<div id="{@id}" class="mstrmojo-ui-Checkbox {@cssClass}" mstrAttach:click,mousedown,mouseup></div>',checked:true,useRichTooltip:true,isDynamicTooltip:true,postCreate:function pc(){var mappingPage=mstrApp.getRootController().rootView.currentPage;this.checked=mappingPage.isPreviewMaximized;mappingPage.attachEventListener("isPreviewMaximizedChange",this.id,"onPreviewChange");},updateTooltipConfig:function(e){var position=$DOM.getMousePosition(e);var tooltip={cssClass:"vi-regular vi-tooltip-V",posType:mstrmojo.tooltip.POS_TOPLEFT,top:Math.max(position.y-40,0),left:Math.max(position.x-16,0)};tooltip.content=this.checked?HIDE_PREVIEW:SHOW_PREVIEW;this.set("richTooltip",tooltip);},moveTooltip:function moveTooltip(evt,win){if(this._tooltipTimeOut){window.clearTimeout(this._tooltipTimeOut);this._tooltipTimeOut=null;if(this.hideTooltip){this.hideTooltip();}else{mstrmojo.tooltip.close();}}var _this=this,_evt=evt,_win=win;this._tooltipTimeOut=setTimeout(function(){_this.showTooltip(_evt,_win);},this.tooltipOpenDelay);},oncheckedChange:function onchange(evt){var mappingPage=mstrApp.getRootController().rootView.currentPage;if(mappingPage){mappingPage.togglePreviewMaximized(evt.value);}},onmousedown:function onmousedown(){$CSS.toggleClass(this.domNode,"hit",true);},onmouseup:function onmouseup(){$CSS.toggleClass(this.domNode,"hit",false);},onPreviewChange:function(evt){this.set("checked",evt.value);}},{scriptClass:"mstrmojo.Label",cssClass:"table-name",alias:"tableName",useRichTooltip:true,isDynamicTooltip:true,markupString:'<div id="{@id}" class="mstrmojo-Label {@cssClass}" style="{@cssText}" title="{@title} "mstrAttach:click,mouseenter,mouseleave></div>',updateTooltipConfig:function(e){var tip=this.parent.previewToggler.checked?HIDE_PREVIEW:SHOW_PREVIEW;var position=$DOM.getMousePosition(e);var tooltip={cssClass:"vi-regular vi-tooltip-V",posType:mstrmojo.tooltip.POS_TOPLEFT,content:tip,top:Math.max(position.y-40,0),left:Math.max(position.x-16,0)};this.set("richTooltip",tooltip);},moveTooltip:function moveTooltip(evt,win){if(this._tooltipTimeOut){window.clearTimeout(this._tooltipTimeOut);this._tooltipTimeOut=null;if(this.hideTooltip){this.hideTooltip();}else{mstrmojo.tooltip.close();}}var _this=this,_evt=evt,_win=win;this._tooltipTimeOut=setTimeout(function(){_this.showTooltip(_evt,_win);},this.tooltipOpenDelay);},postCreate:function preBuildRendering(){var model=mstrmojo.all.DIModel;model.attachEventListener("SourceInfoFetched",this.id,"update");model.attachEventListener("CurrentSourceChanged",this.id,"update");this.update();},update:function(){var diPreview=this.parent.parent;var model=diPreview.model;if(!checkSourceTableKey.call(diPreview)){return ;}var text=model.currentSource.sourceInfo.name;this.set("text",text);},onclick:function(){var toggle=this.parent.previewToggler;toggle.set("checked",!toggle.checked);},onmouseenter:function(){var toggle=this.parent.previewToggler;$CSS.addClass(toggle.domNode,"highlight");},onmouseleave:function(){var toggle=this.parent.previewToggler;$CSS.removeClass(toggle.domNode,"highlight");}},{scriptClass:"mstrmojo.Label",cssClass:"preview-label",alias:"tableName",text:mstrmojo.desc(3389,"Preview")},{scriptClass:"mstrmojo.Label",cssClass:"subTitle",alias:"subTitle",bindings:{visible:function(){return mstrApp.getRootController().rootView.currentPage.isPreviewOn;}},postBuildRendering:function preBuildRendering(){var model=mstrmojo.all.DIModel;this.update();model.attachEventListener("CurrentSourceChanged",this.id,"update");model.attachEventListener("MappingsFetched",this.id,"update");var mappingPage=mstrApp.getRootController().rootView.currentPage;mappingPage.attachEventListener("isPreviewOnChange",this.id,"onPreviewChange");},update:function(){var diPreview=this.parent.parent;var model=mstrmojo.all.DIModel;var text;if(!checkSourceTableKey.call(diPreview)){return ;}if(model.currentSource.currentPreview){var numOfRows=model.currentSource.currentPreview.numOfRows;if(numOfRows<50){text=mstrmojo.desc(13025,"(shows ## rows of data)").replace("##",numOfRows);}else{text=mstrmojo.desc(12418," (shows first 50 rows of data)");}this.set("text",text);}},onPreviewChange:function onPreviewChange(evt){this.set("visible",evt.value);}},{scriptClass:"mstrmojo.Label",cssClass:"refresh-time",alias:"timeStamp",postBuildRendering:function(){var model=mstrmojo.all.DIModel;model.attachEventListener("PreviewFetched",this.id,"update");model.attachEventListener("TransformedPreviewFetched",this.id,"update");model.attachEventListener("CurrentSourceChanged",this.id,"update");var mappingPage=mstrApp.getRootController().rootView.currentPage;mappingPage.attachEventListener("isPreviewOnChange",this.id,"onPreviewChange");this.update();},update:function(){var text=mstrmojo.desc(12718,"Data Refreshed at");var diPreview=this.parent.parent;var model=diPreview.model;if(!checkSourceTableKey.call(diPreview)){return ;}if(model.currentSource&&model.currentSource.lastRefreshedTime){text+=" ";text+=model.currentSource.lastRefreshedTime.toLocaleString();this.set("text",text);}},bindings:{visible:function(){var isEdit=(this.parent.parent.model.operationMode===constants.operationMode.edit);var isPreviewOn=mstrApp.getRootController().rootView.currentPage.isPreviewOn;return isEdit&isPreviewOn;}},onPreviewChange:function onPreviewChange(evt){this.set("visible",evt.value);}},{scriptClass:"mstrmojo.HBox",visible:false,cssClass:"di-preview-options-title",alias:"rightOptions",postCreate:function(){this.model=mstrmojo.all.DIModel;this.model.attachEventListener("PreviewFetched",this.id,"makeVisible");this.model.attachEventListener("CurrentSourceChanged",this.id,"makeVisible");this.parent.parent.attachEventListener("modeChange",this.id,"makeVisible");var mappingPage=mstrApp.getRootController().rootView.currentPage;mappingPage.attachEventListener("isPreviewOnChange",this.id,"makeVisible");this.makeVisible();},makeVisible:function(){var diPreview=this.parent.parent;if(!checkSourceTableKey.call(diPreview)){return ;}if(diPreview.mode===previewMode.raw){this.set("visible",true);return ;}this.set("visible",false);},children:[{scriptClass:"mstrmojo.Button",text:"Aggregation",cssClass:"refresh-options",onclick:function(){openAggregationEditor();},postCreate:function(){this.model=mstrmojo.all.DIModel;this.model.attachEventListener("CurrentSourceChanged",this.id,"makeVisible");this.makeVisible();},makeVisible:function(){var model=mstrmojo.all.DIModel;var source=model.currentSource;var visible=false;if(source&&source.type===constants.sourceType.hadoop&&source.subtype===constants.sourceSubtype.hadoop&&!model.isDirectDataAccess){visible=true;}this.set("visible",visible);}},{scriptClass:"mstrmojo.Button",text:mstrmojo.desc(13023,"Wrangle..."),cssClass:"refresh-options",useRichTooltip:true,updateTooltipConfig:function(){var position=mstrmojo.dom.position(this.domNode);this.richTooltip={cssClass:"vi-regular vi-tooltip-D",posType:mstrmojo.tooltip.POS_TOPRIGHT,content:this.title,top:position.y-10,left:position.x-10};},onclick:function(){var controller=mstrApp.getRootController(),source=controller.model.currentSource;if(source.canLaunchWrangler()){controller.launchWranglerDialog(source);}else{if(mstrmojo.DI.DIHelpers.isRefreshable(controller.model)){controller.model.isAddingNewTable=false;controller.model.refreshToWrangle=source.tableID;controller.refreshSourceTable(source.tableID);}else{controller.displayError(mstrmojo.desc(14661,"Administrator has disabled importing a file from a URL. Hence we cannot proceed to wrangle the table."));}}},postCreate:function postCreate(){var model=mstrApp.getRootController().model;model.attachEventListener("SourceInfoFetched",this.id,"update");model.attachEventListener("CurrentSourceChanged",this.id,"update");this.update();},update:function(){var diPreview=this.parent.parent.parent;var model=diPreview.model;var source=model.currentSource;var controller=mstrApp.getRootController();var support;if(!checkSourceTableKey.call(diPreview)){return ;}this.set("enabled",true);this.title=mstrmojo.desc(13899,"Transform your data with Data Wrangler");support=source.canRefine();this.set("visible",support);if(model.refreshToWrangle){controller.launchWranglerDialog(model.importSources[model.refreshToWrangle]);model.refreshToWrangle=null;}}}]}]},{slot:"previewNode",scriptClass:"mstrmojo.DI.DIMappingPreview",alias:"preGrid",columns:null,initialRendering:null,postCreate:function(){var m=this.parent.model;this.columns=[];m.attachEventListener("MappingsFetched",this.id,"initPreview");if(mstrApp.isEMMACube){m.attachEventListener("CurrentSourceChanged",this.id,"initPreview");}this.initialRendering=true;},postBuildRendering:function postBuildRendering(){if(mstrmojo.DI.DIMappingPreview.prototype.postBuildRendering){mstrmojo.DI.DIMappingPreview.prototype.postBuildRendering.call(this);}if(this.initialRendering){this.initialRendering=false;this.initPreview();}},initPreview:function(){var diModel=this.parent.model,subColumns,mapTemp=[],newColumn,newSubColumns,newSubColumnsNum,preview;if(!checkSourceTableKey.call(this.parent)){return ;}if(!diModel.currentSource){this.set("visible",false);return ;}var map,dataPreview,headers;var hasDataFn=function(headers,column){var ret=false;if(headers&&headers.length){if(headers[0].hasOwnProperty("clix")){ret=$ARR.find(headers,"clix",column.ix)>=0;}if(headers[0].hasOwnProperty("did")){ret=$ARR.find(headers,"did",column.did)>=0;}}return ret;};if(!diModel.currentSource.currentTransformations||!diModel.currentSource.currentTransformations.xtab||!diModel.currentSource.currentTransformations.xtab.isCrosstab){map=diModel.currentSource.currentMapping;if(!map){return ;}if(!diModel.currentSource.currentPreview){return ;}dataPreview=diModel.currentSource.currentPreview.data;headers=diModel.currentSource.currentPreview.dcns;}else{map=diModel.currentSource.transformedMapping||diModel.currentSource.currentMapping;if(!map){return ;}preview=diModel.currentSource.transformedPreview||diModel.currentSource.currentPreview;if(!preview){return ;}dataPreview=preview.data;headers=preview.dcns;}$ARR.forEach(map,function(column){subColumns=column.subColumns;if(subColumns&&subColumns.length>=1){newSubColumns=[];$ARR.forEach(subColumns,function(subColumn){if(subColumn.columnState!==4&&(subColumn.type!=="cmps"||hasDataFn(headers,subColumn))){newSubColumns.push(subColumn);}});newSubColumnsNum=newSubColumns.length;if(newSubColumnsNum>1){newColumn={};$HASH.copy(column,newColumn);newColumn.subColumns=newSubColumns;mapTemp.push(newColumn);}else{if(newSubColumnsNum===1){mapTemp.push(newSubColumns[0]);}}}else{if(column.columnState!==4&&(column.type!=="cmps"||hasDataFn(headers,column))){mapTemp.push(column);}}});mstrmojo.DI.DIHelpers.setDataIdx(mapTemp,headers,"dataIdx");var model={mappings:mapTemp,dataset:dataPreview,supportTimeGeo:true,shapeKeys:diModel.shapeKeys,renameMapped:function(did,cIndex,v){var mdl=this,mp=mdl.mappings,found=false,i,len;for(i=0,len=mp.length;i<len;i++){if(i!==cIndex){if(v===mp[i].alias&&mp[cIndex].tp===mp[i].tp){found=true;break;}}}if(found){var msg=mstrmojo.desc(12532,"The name ## has been used by another column. Please give a new name.");mstrApp.getRootController().displayError(msg.replace("##",v),null,mdl.alertTitle);return ;}mdl.mappings[cIndex].alias=v;mstrApp.getRootController().model.raiseEvent({name:"MappingsFetched"});}};this.set("model",model);if(!model.mappings){return ;}this.populatePreview();},bindings:{visible:function(){return this.parent.mode===previewMode.raw;}}}]});}());