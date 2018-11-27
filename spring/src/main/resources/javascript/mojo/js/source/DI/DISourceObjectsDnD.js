(function(){mstrmojo.requiresCls("mstrmojo.DI.DIConstants","mstrmojo.DI.DIModel","mstrmojo.DI.DIDragFiles");mstrmojo.requiresDescs(12729,12741);var isOperationMode=mstrmojo.DI.DIHelpers.isOperationMode,constants=mstrmojo.DI.DIConstants,$ARR=mstrmojo.array;function wrapQuery(query,path){return query+"###path:"+path;}function doImport(action){var rootController=mstrApp.getRootController(),urlList=this.getDropZone(),list=urlList.urls,items=[],item=null,selectedObject=null,tableID=this.tableID||null,i;if(tableID&&list&&list.length>1){rootController.displayError(mstrmojo.desc(12741,"You can upload only one file when refresh a table."));return ;}for(i=0;list&&i<list.length;i++){item=list[i];selectedObject={n:item.n,desc:item.desc,query:wrapQuery(item.address,(item.folderPath===undefined?"":item.folderPath)+"/"+item.n),type:item.type};if(!mstrApp.isSingleTier){selectedObject.data=item;}items.push(selectedObject);}if(!tableID){rootController.importMultiOAuthReports(this.sourceObjectsInfo.type,items,true,!rootController.model.hasEMMAReportInstance(),action,this.sourceObjectsInfo.subtype,this.id);}else{rootController.refreshDataOAuthReport(this.sourceObjectsInfo.type,this.sourceObjectsInfo.subtype,tableID,items[0],action);}}mstrmojo.DI.DISourceObjectsDnD=mstrmojo.declare(mstrmojo.DI.DIDragFiles,null,{scriptClass:"mstrmojo.DI.DISourceObjectsDnD",supportFolderDrag:false,canRefresh:true,userDisplayName:null,sizeTooltip:true,createTitleWidget:function(){var me=this,sourceType=this.sourceObjectsInfo.type;var cfg={cssClass:"DISourceObjectsDnd-titleWidget cf",children:[{scriptClass:"mstrmojo.Label",cssClass:"userInfo",postBuildRendering:function(){this.update();me.model.externalSources[me.sourceObjectsInfo.type].attachEventListener("oAuthReportsFetched",this.id,this.update);},update:function(){var source=me.model.externalSources[me.sourceObjectsInfo.type],msg=source&&source.userDisplayName;if(!source){return ;}if(source.userEmail){msg+=" ("+source.userEmail+")";}this.set("text",msg);this.set("title",msg);}},{scriptClass:"mstrmojo.Button",cssClass:"refresh",title:mstrmojo.desc(773,"Refresh"),onclick:function(){var source=me.model.externalSources[me.sourceObjectsInfo.type],browser=me.getObjectBrowser();mstrApp.getRootController().getOAuthSourceReports(sourceType,false,null,null,{success:function(res){browser.clickedNode=browser.fileTree;source.populateReports(res,true);}});}},{scriptClass:"mstrmojo.Label",cssClass:"signOut",text:mstrmojo.desc(12729,"Sign Out..."),onclick:function(){mstrApp.getRootController().oAuthSignOut(sourceType);}}]};return new mstrmojo.Box(cfg);},ondrop:function(evt){var selectedNodes=evt.src.data,i=0,fullPath,type=this.parent.parent.parent.sourceObjectsInfo.type,data;for(i=0;selectedNodes&&i<selectedNodes.length;i++){data=selectedNodes[i].data;switch(type){case constants.sourceType.salesforce:fullPath="/"+(data.folderPath?data.folderPath+"/":"")+data.n;break;default:fullPath=data.address;break;}this.addURL(data,data.n,undefined,fullPath);}mstrmojo.css.removeClass(this.dnDNode,"dragging");},browseFunction:function(node){return mstrApp.getRootController().oAuthSourceBrowserFunction(this.sourceObjectsInfo.type,node);},autoSelectNode:function(node,path,address){var me=this.container;if(node.data.isFolder){node.data.browser.clickedNode=node;mstrApp.getRootController().oAuthSourceBrowserFunction(this.sourceObjectsInfo.type,node,path,address);}else{me.getDropZone().addURL(node.data,node.data.n);node.selectThisNode();mstrApp.getRootController().sourceSelected(true);}},postBuildRendering:function(){if(this._super){this._super();}this.model.externalSources[this.sourceObjectsInfo.type].attachEventListener("oAuthReportsFetched",this.id,this.populate);this.model.attachEventListener("windowSizeChanged",this.id,this.changeSize);},populate:function(evt){var res=this.model.externalSources[this.sourceObjectsInfo.type].reports,list=mstrApp.getRootController().parseOAuthSourceFolder(this.sourceObjectsInfo.type,res),operationMode=this.model.operationMode,sourceType=constants.sourceType,dropZone=this.getDropZone(),browser=this.getObjectBrowser(),path,address,index,folderName,fileName,source,folders,reports,report,i,j;if(evt&&evt.targetPageId){if(evt.targetPageId!==this.id){return ;}}browser.set("fileList",list);if(evt&&evt.isRefresh){return ;}if(isOperationMode(this.operationMode)){operationMode=this.operationMode;}if(operationMode===constants.operationMode.refresh||operationMode===constants.operationMode.edit){source=null;if(this.tableID){source=this.model.getImportSource(this.tableID);}if(this.currentSource){source=this.currentSource;}if(source){this.set("multiSelect",false);if(this.sourceObjectsInfo.type===sourceType.salesforce){if(source&&source.sourceInfo&&source.sourceInfo.url){path=source.sourceInfo.url;address=path.substr(0,path.indexOf("###"));path=path.substr(path.indexOf("###")+"###path:".length);if(path.indexOf("undefined/")===0){path=path.substr("undefined/".length-1);}fileName=path.substr(path.lastIndexOf("/")+1);folders=browser.fileTree.items;for(i=0;i<folders.length;i++){reports=folders[i].items;for(j=0;j<reports.length;j++){report=reports[j];if(report.n===fileName&&report.address===address){folders[i].node.set("state",1);dropZone.addURL(report.node.data,report.node.data.n);report.node.selectThisNode();}}}}}if(this.sourceObjectsInfo.type===sourceType.dropbox){if(source&&source.sourceInfo&&source.sourceInfo.url){reports=folders=browser.fileTree.items;path=source.sourceInfo.url;path=path.substr(path.indexOf("###")+"###path:".length);if(path.indexOf("undefined/")===0){path=path.substr("undefined/".length-1);}index=path.indexOf("/",1);if(index!==-1){folderName=path.substring(1,index);for(i=0;i<folders.length;i++){if(folders[i].isFolder===true&&folders[i].n===folderName){browser.autoSelectNode(folders[i].node,path.substring(index));folders[i].fetched=true;folders[i].node.set("state",1);}}}else{fileName=path.substring(1);for(i=0;i<reports.length;i++){if(reports[i].isFolder!==true&&reports[i].n===fileName){dropZone.addURL(reports[i].node.data,reports[i].node.data.n);reports[i].node.selectThisNode();}}}}}if(this.sourceObjectsInfo.type===sourceType.googleDrive){if(source&&source.sourceInfo&&source.sourceInfo.url){reports=folders=browser.fileTree.items;path=source.sourceInfo.url;address=path.substr(0,path.indexOf("###"));path=path.substr(path.indexOf("###")+"###path:".length);index=path.indexOf("/",1);while(index!==-1){folderName=path.substring(1,index);for(i=0;i<folders.length;i++){if(folders[i].isFolder===true&&folders[i].n===folderName){browser.autoSelectNode(folders[i].node,path.substring(index),address);folders[i].fetched=true;folders[i].node.set("state",1);}}path=path.substr(index);index=path.indexOf("/",1);}fileName=path.substring(1);for(i=0;i<reports.length;i++){if(reports[i].isFolder!==true&&reports[i].n===fileName&&reports[i].address===address){dropZone.addURL(reports[i].node.data,reports[i].node.data.n);reports[i].node.selectThisNode();}}}}}}},onHelpButtonClick:function onHelpButtonClick(){var sourceType=this.sourceObjectsInfo.type,helpLink;switch(sourceType){case constants.sourceType.dropbox:helpLink="importing_data_from_dropbox.htm";break;case constants.sourceType.salesforce:helpLink="Importing_data_from_salesforce.htm";break;case constants.sourceType.googleDrive:helpLink="importing_data_from_google_drive.htm";break;}return helpLink;},onNextButtonClick:function(){doImport.call(this,this.tableID?constants.actions.refreshData:constants.actions.importSource);},onFinishButtonClick:function(){doImport.call(this,constants.actions.savePublish);},onBackButtonClick:function onBackButtonClick(){var controller=mstrApp.getRootController();controller.showPage(constants.pageType.dataSelection);},handleImportError:function(reports,status,allFailed){var urlList=this.getDropZone();urlList.set("forceEnable",!allFailed);$ARR.forEach(reports,function(report,idx){if(status[idx].success===true){urlList.removeURL(report.data);}});return true;}});}());