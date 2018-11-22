(function(){mstrmojo.requiresCls("mstrmojo.Container","mstrmojo.Label","mstrmojo.TextBox","mstrmojo.RadioList","mstrmojo.ImageCheckBox","mstrmojo.DI.DIConstants","mstrmojo.DI.FileDragDropBox","mstrmojo.DI.DIHelpers","mstrmojo.DI.DIDragFiles");mstrmojo.requiresDescs(531,12444,12512,12691,12733,12734,12811,12812,13133);var constants=mstrmojo.DI.DIConstants,helpers=mstrmojo.DI.DIHelpers,isOperationMode=helpers.isOperationMode,URL_UPLOAD=0,NETWORK_BROWSING=1,$ARR=mstrmojo.array;function isValidProtocol(urlText){urlText=urlText.toLowerCase();urlText=urlText.replace(/\s+/g," ");return(urlText.indexOf("file://")===0)||(urlText.indexOf("ftp://")===0)||(urlText.indexOf("http://")===0)||(urlText.indexOf("https://")===0)||(urlText.indexOf("hdfs://")===0);}function isURLSupported(urlText){var support={protocolDisabled:false,protocol:""};if(!mstrApp.diParams.EnableURLImport){support.protocolDisabled=true;support.protocol="url";}else{urlText.toLowerCase();urlText.replace(/\s+/g," ");if(!mstrApp.diParams.EnableFileImport&&(urlText.indexOf("file://")===0)){support.protocolDisabled=true;support.protocol+="file://";}if(!mstrApp.diParams.EnableFTPImport&&(urlText.indexOf("ftp://")===0)){support.protocolDisabled=true;support.protocol+="ftp://";}if(!mstrApp.diParams.EnableHttpImport&&(urlText.indexOf("http://")===0)){support.protocolDisabled=true;support.protocol+="http://";}if(!mstrApp.diParams.EnableHttpImport&&(urlText.indexOf("https://")===0)){support.protocolDisabled=true;support.protocol+="https://";}}return support;}function doImport(action){var i;var urls=[];var component;if(this.mode===URL_UPLOAD){mstrmojo.hash.copy(this.urlList.urls,urls);}else{mstrmojo.hash.copy(this.urlBrowse.getDropZone().urls,urls);}var controller=mstrApp.getRootController();var urlSupport,msg,url;if(typeof String.prototype.trim!=="function"){String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"");};}if(this.mode===URL_UPLOAD){if(this.urlInput.value&&this.urlInput.value.length>0){urls.push(this.urlInput.value);}}for(i=0;i<urls.length;i++){url=urls[i].trim();urls[i]=url;if(!isValidProtocol.call(this,url)){controller.displayError(mstrmojo.desc(12512,"We do not support the URL protocol you provided."),false);return ;}urlSupport=isURLSupported.call(this,url);if(urlSupport.protocolDisabled){msg=mstrmojo.desc(12811,"Unable to fetch data. Importing files using #### has been disabled by the administrator.").replace("####",urlSupport.protocol);controller.displayError(msg,false);return ;}}if(this.mode===URL_UPLOAD){component=this.urlList;}else{component=this.urlBrowse.getDropZone();}controller.importURLEMMA(component,urls,true,!controller.model.hasEMMAReportInstance(),this.id,true,action,this.id);}mstrmojo.DI.DIURLUpload=mstrmojo.declare(mstrmojo.Container,null,{scriptClass:"mstrmojo.DI.DIURLUpload",cssClass:"mstrmojo-di-fu",markupString:'<div id="{@id}" class="mstrmojo-di-fileUpload {@cssClass}" ><div class="mstrmojo-di-URLUpload-networkBrowser"></div><div class="mstrmojo-di-URLUpload-label"></div><div class="mstrmojo-di-URLUpload-urlInput"></div><div class="mstrmojo-di-URLUpload-urlList"></div><div class="mstrmojo-di-URLUpload-info"></div></div>',markupSlots:{containerNode:function(){return this.domNode;},networkBrowserNode:function(){return this.domNode.children[0];},labelNode:function(){return this.domNode.children[1];},urlInputNode:function(){return this.domNode.children[2];},urlListNode:function(){return this.domNode.children[3];},infoNode:function(){return this.domNode.children[4];}},markupMethods:{onvisibleChange:function(){this.domNode.style.display=this.visible?"block":"none";}},oriFileExt:"",mode:URL_UPLOAD,singleURL:false,isRefreshPartition:false,init:function init(props){if(this._super){this._super(props);}var evtConfig={},cfg=evtConfig[this.id]={};cfg.windowSizeChanged=this.adjustSize;mstrApp.getRootController().attachDataChangeListeners(evtConfig);},adjustSize:function adjustSize(evt){var width=parseInt(evt.size.w,10),children,margin=width/2-260,leftPanelWidth;if(isNaN(width)){return ;}children=this.urlInputNode.children;children[0].style.marginLeft=margin+"px";children[1].style.left=-margin+"px";this.urlList.dnDNode.style.marginLeft=margin+"px";this.urlList.countNode.style.right=(margin+10)+"px";leftPanelWidth=Math.round(width*0.482);children[2].style.width=leftPanelWidth-127+"px";this.urlBrowse.adjustSize(evt.size);},preBuildRendering:function preBuildRendering(){if(this._super){this._super();}this.urlBrowse.multiSelect=!this.singleURL;},onclick:function(evt){var src=mstrmojo.dom.eventTarget(evt.hWin,evt.e);var urlInput=this.urlInput;if(src!==urlInput.domNode){urlInput.blur();}},postBuildRendering:function(){mstrmojo.dom.attachMarkupEvent(this.id,this.containerNode,"click");if(this._super){return this._super();}},onHelpButtonClick:function onHelpButtonClick(){return"importing_data_from_a_file.htm";},onNextButtonClick:function onNextButtonClick(){doImport.call(this,this.tableID?constants.actions.refreshData:constants.actions.importSource);},onFinishButtonClick:function(){doImport.call(this,constants.actions.savePublish);},onBackButtonClick:function onBackButtonClick(){var controller=mstrApp.getRootController();controller.showPage(constants.pageType.dataSelection);},updatePageConfig:function(config){var page=this,tableId,currentSource,urls=[],urlList=this.urlList,urlInput=this.urlInput;if(config&&config.properties){mstrmojo.hash.forEach(config.properties,function(value,key){page.set(key,value);});}this.set("isRefreshPartition",this.isRefreshPartitionTable());if(this.isRefreshPartition){tableId=this.tableID;currentSource=this.model.importSources[tableId];$ARR.forEach(currentSource.sourceInfo.partition.tables,function(partitionTable){urls.push(partitionTable.name||"");});}if(urls.length>1){urlInput.set("value","");if(urlList.visible===false){urlList.set("visible",true);}$ARR.forEach(urls,function(url){urlList.addURL(url);});}else{urlInput.set("value",config.name);}},setFilesObject:function(files){if(files.length>0){if(this.mode===URL_UPLOAD){var value=mstrmojo.string.trim(this.urlInput.value);var idx=mstrmojo.array.indexOf(files,value);if(idx>=0){files.splice(idx,1);this.urlList.setURLsObject(files);}else{this.urlInput.set("value","");this.urlList.setURLsObject(files);}}else{this.urlBrowse.setURLsObject(files);}}},onforceEnableChange:function(){mstrApp.getRootController().sourceSelected(this.forceEnable);},getOperationMode:function(){var r=this.model.operationMode;if(isOperationMode(this.operationMode)){r=this.operationMode;}return r;},enableImport:function enableImport(){var controller=mstrApp.getRootController();if(this.urlList.urls.length>0||(this.urlInput.value&&this.urlInput.value!==""&&this.mode===URL_UPLOAD)||this.forceEnable===true){controller.sourceSelected(true);}else{controller.sourceSelected(false);}},onmodeChange:function onmodeChange(){var i;if(this.mode===URL_UPLOAD){this.urlList.urls=[];this.urlList.removeChildren();for(i=0;i<this.urlBrowse.getDropZone().urls.length;i++){this.urlList.addURL(this.urlBrowse.getDropZone().urls[i]);}if(this.urlList.urls.length>0){if(this.urlList.visible===false){this.urlList.set("visible",true);}}}else{this.urlList.set("visible",false);this.urlBrowse.getDropZone().urls=[];this.urlBrowse.getDropZone().removeChildren();for(i=0;i<this.urlList.urls.length;i++){this.urlBrowse.getDropZone().addURL(this.urlList.urls[i],this.urlList.urls[i].substr(this.urlList.urls[i].lastIndexOf("/")+1));}}this.enableImport();},getURLs:function getURLs(){var urls=[];if(this.mode===URL_UPLOAD){urls=this.urlList.urls.concat();if(this.urlInput.value.length>0){urls.push(this.urlInput.value);}}else{urls=this.urlBrowse.getDropZone().urls.concat();}$ARR.forEach(urls,function(url,i){urls[i]=url.trim();});return urls;},isRefreshPartitionTable:function isRefreshPartitionTable(){var mode=this.getOperationMode(),tableId,currentSource,partition,isRefresh=false;if(mode===constants.operationMode.edit){tableId=this.tableID;currentSource=this.model.importSources[tableId];partition=currentSource.sourceInfo.partition;isRefresh=!!partition&&partition.isPartition&&currentSource.xdaType===constants.xdaType.text;}return isRefresh;},children:[{slot:"networkBrowserNode",scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-di-fu-link",text:mstrmojo.desc(12733,"Network Browser"),alias:"urlRadioList",onclick:function(){if(this.parent.mode===URL_UPLOAD){this.parent.set("mode",NETWORK_BROWSING);this.set("text",mstrmojo.desc(12444,"File from URL"));}else{this.parent.set("mode",URL_UPLOAD);this.set("text",mstrmojo.desc(12733,"Network Browser"));}},bindings:{text:function(){if(this.parent.mode===NETWORK_BROWSING){return mstrmojo.desc(12444,"File from URL");}else{return mstrmojo.desc(12733,"Network Browser");}}}},{slot:"labelNode",scriptClass:"mstrmojo.Image",cssClass:"mstrmojo-di-fu-img",src:"../javascript/mojo/css/images/DI/crosstab.png",bindings:{visible:function(){return this.parent.mode===URL_UPLOAD;}}},{slot:"labelNode",scriptClass:"mstrmojo.Label",cssClass:"mstrmojo-di-fu-title",text:mstrmojo.desc(12691,"Data can be in crosstab or tabular format"),bindings:{visible:function(){return this.parent.mode===URL_UPLOAD;}}},{slot:"urlInputNode",scriptClass:"mstrmojo.TextBox",cssClass:"upload-url",alias:"urlInput",initValue:false,onvalueChange:function(){if(this._super){this._super();}this.parent.enableImport();},bindings:{visible:function(){return this.parent.mode===URL_UPLOAD;}},postBuildRendering:function(){this.emptyText=mstrmojo.desc(12812,"Supported URL format: #### ").replace("####",mstrmojo.DI.DIHelpers.getURLCaption());if(this._super){return this._super();}}},{slot:"infoNode",scriptClass:"mstrmojo.Label",cssDisplay:"inline-block",cssClass:"mstrmojo-di-fu-url-supported",bindings:{text:function(){return"Use original URL or update with a new URL to refresh this table.";},visible:function(){return this.parent.mode===URL_UPLOAD&&this.parent.getOperationMode()!==constants.operationMode.create;}}},{slot:"infoNode",scriptClass:"mstrmojo.Label",cssDisplay:"inline-block",text:"",cssClass:"mstrmojo-di-fu-url-previously",bindings:{visible:function(){return this.text!==""&&!this.parent.isRefreshPartition&&this.parent.mode===URL_UPLOAD;}},postBuildRendering:function postBuildRendering(){if((isOperationMode(this.parent.operationMode)?this.parent.operationMode:this.parent.model.operationMode)!==constants.operationMode.create){this.set("text",mstrmojo.desc(13133,"Previously uploaded URL:"));}}},{slot:"infoNode",scriptClass:"mstrmojo.Label",cssDisplay:"inline-block",text:"",cssClass:"mstrmojo-di-fu-url-info",bindings:{visible:function(){return this.text!==""&&!this.parent.isRefreshPartition&&this.parent.mode===URL_UPLOAD;}},postBuildRendering:function postBuildRendering(){var m=this.parent.model;var tableId=this.parent.tableID;var source;if(this.currentSource){source=this.currentSource;}else{source=m.importSources[tableId];}if((isOperationMode(this.parent.operationMode)?this.parent.operationMode:this.parent.model.operationMode)!==constants.operationMode.create){var url=source.sourceInfo.url;if(url.length>90){this.set("text",url.substring(0,65)+"..."+url.substring(url.length-20));}else{this.set("text",url);}this.set("title",url);}}},{slot:"infoNode",scriptClass:"mstrmojo.Label",text:"",cssClass:"mstrmojo-di-url-browser-info",bindings:{visible:function(){return this.text!==""&&!this.parent.isRefreshPartition&&this.parent.mode===NETWORK_BROWSING;}},postBuildRendering:function postBuildRendering(){var m=this.parent.model;var tableId=this.parent.tableID;var source;if(this.currentSource){source=this.currentSource;}else{source=m.importSources[tableId];}if((isOperationMode(this.parent.operationMode)?this.parent.operationMode:this.parent.model.operationMode)!==constants.operationMode.create){var url=source.sourceInfo.url;if(url.length>75){this.set("text",mstrmojo.desc(13133,"Previously uploaded URL:")+" "+url.substring(0,50)+"..."+url.substring(url.length-20));}else{this.set("text",mstrmojo.desc(13133,"Previously uploaded URL:")+" "+url);}this.set("title",url);}}},{slot:"urlInputNode",scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-di-add-url-button mstrmojo-di-button mstrmojo-WebButton",text:mstrmojo.desc(531,"Add"),onclick:function(){var url=this.parent.urlInput.value;if(url.length===0){return ;}if(this.parent.urlList.visible===false){this.parent.urlList.set("visible",true);}this.parent.urlList.addURL(url);this.parent.urlInput.set("value","");},bindings:{visible:function(){var parent=this.parent;var operationMode=parent.getOperationMode();var visible=true;if(operationMode===constants.operationMode.create){visible=true;}else{visible=parent.isRefreshPartitionTable();}return(this.parent.mode===URL_UPLOAD&&visible&&!parent.singleURL);}}},{slot:"urlInputNode",scriptClass:"mstrmojo.TextBox",alias:"urlBrowseInput",cssClass:"mstrmojo-di-url-browse-input",initValue:false,onvalueChange:function(){if(this._super){this._super();}this.parent.enableImport();},bindings:{visible:function(){return this.parent.mode===NETWORK_BROWSING;}},preBuildRendering:function(){if(this._super){this._super();}this.emptyText=mstrmojo.desc(12812,"Supported URL format: #### ").replace("####",mstrmojo.DI.DIHelpers.getURLCaption());}},{slot:"urlInputNode",scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-di-add-url-browse-button mstrmojo-di-button mstrmojo-WebButton",text:mstrmojo.desc(12734,"Enter"),onclick:function(){var ob=this.parent.urlBrowse.getObjectBrowser();ob.clickedNode=ob.fileTree;mstrApp.getRootController().browseURLPath(this.parent.urlBrowseInput.value,this.parent.urlBrowse);},bindings:{visible:function(){return this.parent.mode===NETWORK_BROWSING;}}},{slot:"urlListNode",scriptClass:"mstrmojo.DI.FileDragDropBox",alias:"urlList",text:"",draggable:false,fileUpload:false,cssClass:"mstrmojo-di-url-box",bindings:{visible:function(){var parent=this.parent,mode=parent.getOperationMode(),isVisible=this.urls.length>0&&parent.mode===URL_UPLOAD;isVisible=isVisible&&(mode===constants.operationMode.create||parent.isRefreshPartitionTable());return isVisible;}},getFilesCnt:function(){var cnt=0;if(this.parent.urlInput.value&&this.parent.urlInput.value!==""){cnt=this.urls?this.urls.length+1:1;}else{cnt=this.urls?this.urls.length:0;}return cnt;},getFileUrl:function(idx){if(idx<this.urls.length){return mstrmojo.string.trim(this.urls[idx]);}if(this.parent.urlInput.value!==""){return mstrmojo.string.trim(this.parent.urlInput.value);}return"";},onurlsChange:function(){if(this._super){this._super();}this.parent.enableImport();if(this.updateItemsCount){this.updateItemsCount(this.getURLCnt());var cnt=this.getURLCnt();this.updateItemsCount(cnt);if(cnt>1&&cnt<5){this.countNode.style.marginTop=cnt*(-33)+"px";}else{if(cnt>=5){this.countNode.style.marginTop="-140px";}}}}},{slot:"urlListNode",scriptClass:"mstrmojo.DI.DIDragFiles",alias:"urlBrowse",supportFolderDrag:false,bindings:{visible:function(){return(this.parent.mode===NETWORK_BROWSING);}},postBuildRendering:function(){var parent=this.parent,mode=parent.getOperationMode(),multiSelect=mode===constants.operationMode.create||parent.isRefreshPartitionTable();if(mstrmojo.DI.DIDragFiles.prototype.postBuildRendering){mstrmojo.DI.DIDragFiles.prototype.postBuildRendering.call(this);}this.set("multiSelect",multiSelect);},ondrop:function ondrop(evt){if(!this.droppable){return ;}var selectedNodes=evt.src.data,i;for(i=0;i<selectedNodes.length;i++){this.addURL(selectedNodes[i].data.address,selectedNodes[i].text,undefined,selectedNodes[i].data.address);}mstrmojo.css.removeClass(this.dnDNode,"dragging");},browseFunction:function browseFunction(node){mstrApp.getRootController().urlBrowserFunction(node);},setURLsObject:function setURLsObject(urls){var i,child,cnt;var toRemovedChild=[];var urlPanel=this.mainPage.content.urlList;for(i=0;urlPanel.children&&i<urlPanel.children.length;i++){child=urlPanel.children[i];toRemovedChild.push(child);}cnt=toRemovedChild.length;for(i=0;i<cnt;i++){urlPanel.removeChildren(toRemovedChild[i]);}urlPanel.urls=[];for(i=0;i<urls.length;i++){var url=decodeURI(urls[i].substr(urls[i].lastIndexOf("/")+1));urlPanel.addURL(null,url);}}}]});}());