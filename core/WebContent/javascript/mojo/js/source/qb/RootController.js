(function(){mstrmojo.requiresCls("mstrmojo.Obj","mstrmojo.hash","mstrmojo.Serializer","mstrmojo.array","mstrmojo.qb.QBuilderPage","mstrmojo.qb.QBuilderModel","mstrmojo.warehouse.WHController","mstrmojo.qb.QBHelpers","mstrmojo.DI.DIConstants");mstrmojo.requiresDescs(218,219,221,1442,3179,3377,7985,7986,8041,9114,9139,9523,9915,11299,12379,12380,12922,13137);var $H=mstrmojo.hash,$A=mstrmojo.array,$STR=mstrmojo.string,$ENUM_DATA_CHANGE_EVENTS=mstrmojo.warehouse.EnumDataChangeEvents,$QBHelpers=mstrmojo.qb.QBHelpers,$DIConstants=mstrmojo.DI.DIConstants,$DESC=mstrmojo.desc;var DDA_ERR_MSGS={1:$DESC(12379,"We cannot convert the cube to a DDA cube because you are importing some tables that cannot support it. Remove them to enable this feature."),2:$DESC(12380,"The cube has to be a direct data access cube due to some of the sources selected. You will have to delete them if you want to change this.")};var typeOf=function(v){if(v===null){return"null";}var t=typeof (v);if(t!=="object"){return t;}else{if(v.length===undefined){return"object";}else{return"array";}}};function toggleFinishButton(isVisible){var showFooter=mstrApp.diShowFooterFunction;if(showFooter){showFooter({finish:{visible:isVisible}});}}function getDefaultName(model){var name=model.FFSQLMode?"Type Query":"Build Query";return{name:name};}mstrmojo.qb.RootController=mstrmojo.declare(mstrmojo.warehouse.WHController,null,{ddaController:null,start:function start(xdatype,connectorType){var rootView=this.rootView,model=this.model,me=this,rootViewID,header,footerID,footer,contButton,finishButton;this.dataService=mstrmojo.qb.DataService;rootView.render();if(mstrApp.isCloudPro){mstrApp.docID=mstrApp.docID||"";}else{mstrApp.docID=mstrApp.docID||mstrApp.analysisID||"";}if(mstrApp.isFFSQL){this.raiseEvent({name:"reportModeChange",mode:2,value:""});}this.toggleDatabaseView(true);rootView.loadView();var loadDBRoles=function loadDBRoles(){me.loadDBRoles({success:function success(){model.createReportInstance(xdatype,connectorType);var isVisible;isVisible=(model.isNew&&mstrApp.emmaTablesNum===0);toggleFinishButton(isVisible);}});};if(model.specifyDBTypes){model.dbObjects.populateDBProperties({success:function success(){loadDBRoles();}});}else{model.loadDBTypeFilters({success:function success(){loadDBRoles();}});}rootViewID=mstrApp.diRootViewID;this.header=header=(rootViewID?(mstrmojo.all[rootViewID]&&mstrmojo.all[rootViewID].header):undefined);if(header){header.closeBtn.set("visible",!mstrApp.tableID);}model.attachEventListener("dataPreview",this.id,function(){me.enableButton(model.SQLstmt);});footerID=mstrApp.diFooterID;footer=footerID?mstrmojo.all[footerID]:undefined;if(footer){contButton=footer.next;finishButton=footer.finish;me.attachEventListener("allowSave",contButton.id,footer.enableButton);me.attachEventListener("allowSave",finishButton.id,footer.enableButton);}},getDataService:function getDataService(){return this.dataService;},toggleDatabaseView:function toggleDatabaseView(show){this.rootView.toggleDatabaseView(show);},toggleDataPreview:function toggleDataPreview(show){var rootView=this.rootView,isFFSQLMode=this.model.FFSQLMode;rootView.toggleDataPreview(show);if(!isFFSQLMode){rootView.showQBPreview=show;}if(show){this.raiseEvent({name:"dataPreview"});}},openConditionDialog:function openConditionDialog(){var model=this.model,curZIndex=mstrApp.diCurrentZIndex,popUpZIndex=curZIndex?curZIndex+1:(this.zIndex||10)+1;if(model.dbtables.length===0){mstrmojo.alert(mstrmojo.desc(9114,"Cannot add Filter without any Tables being added, please add some Tables first"));return ;}var CONDITION_EDITOR_ID="qbcondition",conditionEditor=mstrmojo.all[CONDITION_EDITOR_ID]||mstrmojo.insert({scriptClass:"mstrmojo.qb.ConditionEditor",id:CONDITION_EDITOR_ID});conditionEditor.set("zIndex",popUpZIndex);if(!conditionEditor.hasRendered){conditionEditor.render();}conditionEditor.domNode.style.zIndex=conditionEditor.zIndex;conditionEditor.set("data",$H.clone(model.getConditions()));conditionEditor.set("visible",true);},refreshConditionDialog:function refreshConditionDialog(){var model=this.model,CONDITION_EDITOR_ID="qbcondition",conditionEditor=mstrmojo.all[CONDITION_EDITOR_ID];if(conditionEditor&&conditionEditor.visible){conditionEditor.set("data",$H.copy(model.getConditions()));}},openHelp:function openHelp(){var url=(mstrApp.helpUrl||"../help/")+"WebUser/WebHelp/Lang_"+(mstrApp.helpLocaleId?mstrApp.helpLocaleId:mstrApp.localeId)+"/MicroStrategy_Web_Help.htm#"+(mstrApp.isFFSQL?"freeform_import_page.htm":"database_import_page.htm");window.open(url);},openExpressionEditor:function openExpressionEditor(obj){var me=this,callback={success:function success(){var curZIndex=mstrApp.diCurrentZIndex,popupZIndex=curZIndex?curZIndex+3:me.zIndex;me.rootView.openExpressionEditor(obj,popupZIndex);}};if(this.getFunctionList()){callback.success();return ;}this.model.getFunctions(false,{success:function success(){callback.success();}},{showWait:true});},getFunctionList:function getFunctionList(){return this.model.getFunctionList();},getSuggestionItems:function getSuggestionItems(isFFSQLMode){return this.model.getSuggestionItems(isFFSQLMode);},exprjson2xml:function exprjson2xml(nodeName,jsons,config){if(!(jsons instanceof Array)){jsons=[jsons];}var serial=config&&config.isSerializable,convertBoolean=(config.convertBoolean===false)?false:true;var att=[],ch=[],n,v;for(var ji=0,jlen=jsons.length;ji<jlen;ji++){var json=jsons[ji];for(n in json){if(serial){var ret=serial(n,jsons,ji);if(ret!==true){if(ret===false){continue;}else{if(ret.att){att.push(ret.att);}if(ret.child){ch.push(ret.child);}continue;}}}v=json[n];switch(typeOf(v)){case"array":var i,len,cn;if(n!=="omit"){ch.push(["<",n,">"].join(""));for(i=0,len=v.length;i<len;i++){cn=config.getArrItemName(n,v,i)||i;ch.push(this.exprjson2xml(cn,v[i],config));}ch.push("</"+n+">");}else{for(i=0,len=v.length;i<len;i++){cn=config.getArrItemName(n,v,i)||i;ch.push(this.exprjson2xml(cn,v[i],config));}}break;case"object":ch.push(this.exprjson2xml(n,v,config));break;case"string":att.push([n,'="',mstrmojo.string.encodeXMLAttribute(v),'"'].join(""));break;case"boolean":att.push([n,'="',((convertBoolean)?(v?"-1":"0"):v),'"'].join(""));break;case"null":if(!config.skipNull){att.push([n,'="',config.nullValue,'"'].join(""));}break;default:att.push([n,'="',v,'"'].join(""));break;}}}return["<",nodeName," ",att.join(" "),">",ch.join(""),"</",nodeName,">"].join("");},parseExpression:function parseExpression(params,callbacks){this.model.validateExpr(params,callbacks);},autoMap:function autoMap(){var me=this;if(!me.hasDBConnection()){return ;}me.model.autoMap({success:function(){me.toggleDataPreview(true);}},false,false);},autoMapFFSQL:function autoMapFFSQL(sqlstatement){var me=this;if(!me.hasDBConnection()){return ;}me.model.autoMapFFSQL(sqlstatement,{success:function success(){me.enableButton(sqlstatement);}});},getSQLPreview:function getSQLPreview(callback){this.model.getSQL(callback);},convertMode:function convertMode(fromQB){var me=this,curZIndex=mstrApp.diCurrentZIndex,popUpZIndex=curZIndex?curZIndex+1:1000;me.model.connectLiveSupport=undefined;if(fromQB){this.model.getSQL({success:function success(sqlstmt){me.model.convertToFFSQL(sqlstmt,{success:function suc(){me.toggleDataPreview(false);me.raiseEvent({name:"reportModeChange",mode:2,value:sqlstmt});}});}});}else{var showPreview=me.rootView.showQBPreview,callback={success:function(){me.toggleDataPreview(showPreview);me.raiseEvent({name:"reportModeChange",mode:1,showPreview:showPreview});}},ff=mstrmojo.all.FFsql;if(ff.oriSQL===ff.getSQLstmt()){me.model.convertToQueryBuilder(callback);}else{mstrmojo.confirm(mstrmojo.desc(9139,"All changes performed in FFSQL mode will be lost. Do you want to leave FFSQL mode?"),{confirmBtn:{fn:function(){me.model.convertToQueryBuilder(callback);}}},{zIndex:popUpZIndex});}}},editSQL:function editSQL(stmt,callback){this.model.editFFSQL(callback,stmt);},addTable:function addTable(t,cls){this.model.addTable(t,cls);},addTables:function addTables(tables){var me=this,model=me.model;$A.forEach(tables,function(tableObj){me.getColumnsForDBTable({data:tableObj},{success:function success(res){if(model.FFSQLMode){me.addTableSQL(tableObj,res.items);me.enableButton();}else{me.addTable(tableObj,res.items);}}});});},addSQLFromTable:function addSQLFromTable(ns,tbn,cls){this.rootView.addSQLFromTable(ns,tbn,cls);},addSQLFromColumn:function addSQLFromColumn(data){this.rootView.addSQLFromColumn(data);},addSelectedColumns:function addSelectedColumns(rows,tbIdx,funIndex,callbacks){this.model.addSelectedColumns(rows,tbIdx,funIndex,callbacks);},addColumnWithExpression:function addColumnWithExpression(colrow,expr,tokens,callbacks){this.model.addColumnWithExpression(colrow,expr,tokens,callbacks);},editColumnExpression:function editColumnExpression(index,expr,tokens,callbacks){this.model.editColumnExpression(index,expr,tokens,callbacks);},gettIndex:function gettIndex(tid){return this.model.gettIndex(tid);},updateTableViewWithExpression:function updateTableViewWithExpression(cIndex,exprTokens,isNewAdd){var model=this.model,scl=model.selectedClns[cIndex],ws=scl.wid,w,oi;scl.expr=exprTokens;$A.forEach(ws,function(id){w=mstrmojo.all[id];if(w&&!isNewAdd){if(w.count>0){w.count--;}w.updateState(0);}});ws=[];$A.forEach(exprTokens,function(token){oi=token.oi;if(oi&&oi.tp===26){w=model.getRowWidget(oi.tn,oi.rn);if(w){w.count++;w.updateState(1);ws.push(w.id);}}});scl.wid=ws;model.updateExpression(cIndex);},updateFilters:function updateFilters(filterItem,aggfilterItem){this.model.updateConditions(filterItem,aggfilterItem);},addNewFilter:function addNewFilter(condition){this.model.appendCondition(condition);},cancel:function cancel(){var pageNumber=mstrApp.origin?(mstrApp.isBigQuery?"-3":"-2"):"-1";mstrmojo.form.send({evt:"3124",src:mstrApp.name+".qbuilder.3124",relativePageNumber:pageNumber},mstrApp.name,"POST",null,null,false);},onCancelButtonClick:function onCancelButtonClick(){var messageID;this.model.cleanDuplicateRI(true);messageID=mstrApp.msgid;mstrApp.container.unloadQB();mstrApp.messageID=messageID;mstrApp.getRootController().onCancelButtonClick();},onNextButtonClick:function onNextButtonClick(){var me=this;this.commit({success:function success(){var messageID,model=mstrApp.getRootController().model,isDDA=model.isDDA,isManagedCube=model.isManagedCube;if(me.header&&me.header.closeBtn){me.header.closeBtn.set("visible",true);}model.cleanDuplicateRI(false);messageID=mstrApp.msgid;mstrApp.container.unloadQB();mstrApp.messageID=messageID;mstrApp.isDDA=isDDA;mstrApp.isManagedCube=isManagedCube;mstrApp.getRootController().afterQBProcess();}});},saveDDACube:function saveDDACube(saveCubeParams){var model=this.model,params={},callback;callback={success:function(res){var messageID,isDDA=model.isDDA,diController,diModel,diparams,dicallback,postMergeDupIDCallback,isManagedCube=model.isManagedCube;model.cleanDuplicateRI(false);messageID=mstrApp.msgid;mstrApp.container.unloadQB();mstrApp.messageID=messageID;mstrApp.isDDA=isDDA;mstrApp.isManagedCube=isManagedCube;diController=mstrApp.getRootController();diModel=diController.model;diController.getDDAController().setDirectDataAccess(mstrApp.isDDA);diController.dataService.set("messageID",mstrApp.messageID);diController.model.isManagedCube=mstrApp.isManagedCube;diModel.cubeName=getDefaultName(model).name;if(mstrApp.isSingleTier){diparams={isDirectDataAccess:diModel.isDirectDataAccess,name:diModel.cubeName};dicallback={success:function(res){if(res.objectId){diModel.cubeID=res.objectId;}diController.wrapUpDataImport();},failure:function(res){mstrApp.hideProgress();diController.displayError(mstrmojo.desc(13061,"Error in creating the dataset."),false,res&&res.message);}};postMergeDupIDCallback={success:function(){diController.dataService.createOneTierDoc(dicallback,diparams);},failure:function(res){mstrApp.hideProgress();diController.displayError(mstrmojo.desc(13062,"Error in merging the duplicate report instance."),false,res&&res.message);}};if(diModel.operationMode===$DIConstants.operationMode.edit||diModel.operationMode===$DIConstants.operationMode.refresh){diController.dataService.duplicateReportInstance(postMergeDupIDCallback,{messageID:diModel.analysisID,datasetID:diModel.cubeID,duplicateRIMsgID:diController.dataService.messageID});}else{diController.dataService.createOneTierDoc(dicallback,diparams);}return ;}if(isManagedCube){diController.wrapUpDataImport();return ;}diModel=diController.model;if(res&&res.objectId){diModel.cubeID=res.objectId;}diModel.path=saveCubeParams&&saveCubeParams.objPath;diController.wrapUpDataImport();}};function continueSave(){if(model.isManagedCube){callback.success();return ;}params.displayMode=12;params.shouldRefresh=false;if(model.isDDA){params.shouldRefresh=false;params.saveAsFlags=$DIConstants.saveAsFlags.saveAsDDA|$DIConstants.saveAsFlags.saveAsOverWrite;}else{params.saveAsFlags=$DIConstants.saveAsFlags.saveAsInMemory|$DIConstants.saveAsFlags.saveAsOverWrite;}params.taskId="saveAndPublishCube";params.showWait=true;params=$H.copy(saveCubeParams,params);params.saveAsOverwrite=true;delete params.objPath;mstrApp.getRootController().model.submitRequest(callback,params);}mstrApp.getRootController().model.submitRequest({success:function(){if(model.operationMode!==2){mstrApp.getRootController().model.submitRequest({success:function(){continueSave();}},{taskId:"DIClearRelationshipEMMASourceTable",showWait:true});}else{continueSave();}}},{taskId:"DIToggleDatasetServeMode",serveMode:model.isDDA?$DIConstants.datasetServeMode.dda:$DIConstants.datasetServeMode.inMemory,showWait:true});},handleFinish:function handleFinish(){var model=this.model,me=this,operationMode=model.operationMode,callback={};callback.onOK=function(params){me.commit({success:function success(){var messageID,isDDA=model.isDDA,isManagedCube=model.isManagedCube;if(isDDA&&operationMode!==1){me.saveDDACube(params);}else{model.cleanDuplicateRI(false);messageID=mstrApp.msgid;mstrApp.container.unloadQB();mstrApp.messageID=messageID;mstrApp.isDDA=isDDA;mstrApp.saveCubeParams=params;mstrApp.isManagedCube=isManagedCube;mstrApp.getRootController().afterQBProcess(true);}}});};if(operationMode===1){callback.onOK();}else{if(!model.isManagedCube&&!mstrApp.isSingleTier){$QBHelpers.showSaveAsDialog(callback,getDefaultName(this.model));}else{callback.onOK();}}},onBackButtonClick:function onBackButtonClick(){var model=this.model,tableID=model.tableID,controller=this,callback;callback={success:function success(){var messageID=mstrApp.msgid,diController;mstrApp.container.unloadQB();mstrApp.messageID=messageID;diController=mstrApp.getRootController();if(messageID){diController.dataService.set("messageID",messageID);}diController.backFromQB();}};if(model.isNew&&tableID){controller.getDataService().removeEmmaTable(callback,{did:tableID});}else{callback.success();}},onFinishButtonClick:function onFinishButtonClick(){var rootController=this,model=this.model,ddaController=rootController.getDDAController(),callback,dialogConfig,curZIndex=mstrApp.diCurrentZIndex,popupZIndex=curZIndex?curZIndex+1:10;if(!model.origIsDDA&&ddaController.allowDDA()){callback={onOK:function(){rootController.handleFinish();}};dialogConfig={callback:callback,selectedIndex:model.isDDA?0:1,zIndex:popupZIndex};ddaController.showDDAConfirmDialog(dialogConfig);return ;}this.handleFinish();},exitApplication:function exitApplication(){mstrApp.container.unloadQB();mstrApp.getRootController().exitApplication();},addSQLCandidateTables:function addSQLCandidateTables(tables){this.model.raiseEvent({name:"addCandidateTables",value:tables});},hasDBConnection:function hasDBConnection(){if(this.model.SelDBRoleID){return true;}mstrmojo.alert(mstrmojo.desc(9915,"Please select a database connection first."));return false;},publish:function publish(){var model=this.model,stmt=model.FFSQLMode?this.rootView.getSQLStatement():"",isNew=model.isNew,folderID=mstrApp.folderID,controller=this,scb={success:function(res){if(mstrApp.analysisID||mstrApp.msgID){var targetEvent=mstrApp.analysisID?[3169,mstrApp.name+".3169","messageID",mstrApp.analysisID]:[3104,mstrApp.name+".3104","messageID",mstrApp.msgID,"rwDesignMode",1,"executionMode",2],events=[targetEvent,[2048007,mstrApp.name+".rwd.rwframe.rwb.2048007","dsObjectID",res.did,"dsType",3,"isDatasetAdded",false,"isDefault",false]];mstrApp.redirectToPage({evt:"1024001",events:mstrmojo.Serializer.serializeValueGroup(events),src:mstrApp.name+"."+mstrApp.pageName+".1024001","1024001":"1",evtorder:"1024001"});}else{if(mstrApp.isCloudPro){mstrApp.redirectToPage({evt:"3104",src:mstrApp.name+".3104",executionMode:"1",rwDesignMode:"0",objectType:"3",objectID:res.did,rwCreateFlags:"16",rwViewMode:"2048"});}else{controller.gotoRedirectionPage(res.did,res.path);}}}};if(!this.hasDBConnection()){return ;}model.recoverMode=0;if(folderID||!isNew){var isCloudNew=isNew&&mstrApp.isCloudPro;model.save((isCloudNew?model.getAutoReportName():null),null,folderID,!isNew,isCloudNew,stmt,{success:function(res){var analysisID=mstrApp.analysisID,isEDD=!model.isCubeReport,folderID=mstrApp.folderID,reportID=mstrApp.reportID,refreshInDoc=mstrApp.refreshInDoc;if(!isNew&&analysisID){mstrApp.hideWait(true);if(refreshInDoc){if(rrLockAndRunDashboard){rrLockAndRunDashboard(analysisID);}else{mstrApp.redirectToPage({evt:"3104",rwDesignMode:"0",rwViewMode:"2048",executionMode:"1",objectType:"55",objectID:analysisID});}}else{var pop=mstrmojo.insert({scriptClass:"mstrmojo.Editor",cssClass:"mstrmojo-qb-ObjectInfoEditor run-dashboard",showTitle:false,analysisID:analysisID,cssText:"width: 260px",children:[{scriptClass:"mstrmojo.Label",text:isEDD?mstrmojo.desc(13137,"Edit data successfully!"):mstrmojo.desc(11299,"Data refresh successful!"),cssClass:"mstrmojo-AttCreator-Text"},{scriptClass:"mstrmojo.HBox",cssClass:"mstrmojo-Editor-buttonBox",slot:"buttonNode",children:[{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-Editor-button mstrmojo-Editor-button-RunDashboard",onclick:function(evt){var popup=this.parent.parent;popup.close();if(rrLockAndRunDashboard){rrLockAndRunDashboard(analysisID);}else{mstrApp.redirectToPage({evt:"3104",rwDesignMode:"0",rwViewMode:"2048",executionMode:"1",objectType:"55",objectID:analysisID});}}},{scriptClass:"mstrmojo.Button",id:"RefreshData",cssClass:"mstrmojo-Editor-button mstrmojo-Editor-button-"+(isEDD?"EditData":"RefreshData"),cssDisplay:"none",onclick:function(){if(isEDD){refreshCube(analysisID,folderID,"0",reportID,RRDIExtentedType.DATAIMPORT_DATABASE,false,true);}else{openCubeRefreshStatus(analysisID,folderID);}}},{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-Editor-button mstrmojo-Editor-button-Exit",onclick:function(){var popup=this.parent.parent;popup.close();mstrApp.showWait();if(mstrApp.isCloud){rrOpenHomePage&&rrOpenHomePage();}else{mstrApp.redirectToPage({evt:3010});}}}]}]});pop.open();}}else{scb.success(res);}}});}else{var rootView=this.rootView,showPopup=function showPopup(){rootView.openPopup("saveasRef",{folderLinksContextId:mstrConfig.hasProfileReports?28:1,name:mstrmojo.desc(8041,"New Cube"),saveAs:function(){var me=this,panel=me.contPanel,name=panel.name.value,currentFolder=me.ob.currentFolder,folderId=currentFolder.did,saveAsCallback={success:function sucess(res){scb.success(res);},failure:function failure(res){var ec=parseInt(res.getResponseHeader("X-MSTR-TaskErrorCode"),10)+4294967296;if(ec===2147749923){mstrmojo.confirm(mstrmojo.desc(7986,"The ## '###' already exists. Do you want to replace the existing one?").replace("##",mstrmojo.desc(3377)).replace("###",name),{confirmBtn:{fn:function(){saveCube(true);}}},{title:mstrmojo.desc(3179,"Confirm Overwrite")});}else{mstrmojo.alert(mstrmojo.desc(7985,"Error while saving: ")+res.getResponseHeader("X-MSTR-TaskFailureMsg"));}}};if(!name){mstrmojo.alert(mstrmojo.desc(9523,"Enter a Name"));return ;}var saveCube=function saveCube(overwrite){model.save(name||"",panel.desc.value||"",folderId,overwrite,mstrApp.isCloudPro,stmt,saveAsCallback);me.close();};saveCube();}});};showPopup();}},updateTableStructure:function updateTableStructure(){var model=this.model;model.compareDBTables({success:function(){if(model.hasMissingUsedDBColumns()){mstrmojo.confirm(mstrmojo.desc(12922,"There are missing columns used in expressions. Do you want to update?"),null,{buttons:[mstrmojo.Button.newInteractiveButton(mstrmojo.desc(219),function(){model.updateDBTables(true);},null,{iconClass:"mstrmojo-Editor-button-Yes"}),mstrmojo.Button.newInteractiveButton(mstrmojo.desc(218),null,null,{iconClass:"mstrmojo-Editor-button-No"})],title:mstrmojo.desc(3179)});}else{model.updateDBTables();}}});},gotoRedirectionPage:function gotoRedirectionPage(reportid,path){if(mstrApp.isNewAnalysis){mstrApp.redirectToPage({evt:"3104",src:mstrApp.name+".3104",executionMode:"1",rwDesignMode:"0",objectType:"3",objectID:reportid,rwCreateFlags:"16",rwViewMode:"2048"});return ;}if(mstrApp.msgID){mstrApp.redirectToPage({evt:"3104",src:mstrApp.name+".3104",executionMode:"2",rwDesignMode:"1",objectType:"3",objectID:reportid});return ;}this.rootView.showRedirectionPage(reportid,path);},save:function save(){this.model.save();},enableButton:function(statement){var allowSave=this.model.getAllowSave(statement);this.raiseEvent({name:"allowSave",value:allowSave});},addWHTable:function addWHTable(tableItems){var model=this.model,index=0,x=tableItems.x,y=tableItems.y;$A.forEach(tableItems,function(tableObj){model.getColumnsForDBTable({data:tableObj},{success:function success(res){tableObj.x=x+index*15;tableObj.y=y+index*15;index++;model.addTable(tableObj,res.items);}},this);});},canAddTableSQL:function canAddTableSQL(notRaiseError,statement){return this.model.canAddTableSQL(notRaiseError,statement);},addTableSQL:function addTableSQL(table,columns){this.model.addTableSQL(table,columns);},getFFsqlComp:function getFFsqlComp(){return this.model.FFsqlComp;},getOperationMode:function getOperationMode(){return(this.model.isNew)?0:1;},checkDBTables:function checkDBTables(){this.model.checkDBTables();},markFailureLabel:function markFailureLabel(passNumber){this.raiseEvent({name:"failureLabel",value:passNumber});},attachDataChangeListeners:function attachDataChangeListeners(eventsConfig){var model=this.model;$H.forEach(eventsConfig,function(config,id){$H.forEach(config,function(callback,eventName){model.attachEventListener(eventName,id,callback);});});},editColumn:function editColumn(data){var ENUM_EXPRESSION_TYPE_EXISTING_COLUMN=3,columnIndex=data.columnIndex,model=this.model,column=model.selectedClns[columnIndex];this.openExpressionEditor({type:ENUM_EXPRESSION_TYPE_EXISTING_COLUMN,w:column,tkn:column.expr,cIndex:columnIndex});},deleteColumn:function deleteColumn(data){var columnIndex=data.columnIndex,model=this.model;if(model.removeSelectedColumn){model.removeSelectedColumn(columnIndex);}},deleteAllColumns:function deleteAllColumns(){this.model.removeAllColumns();},enableAvailableTables:function enableAvailableTables(){this.model.raiseEvent({name:$ENUM_DATA_CHANGE_EVENTS.DBTABLES_ENABLED,value:true});mstrApp.getRootController().enableButton();},getDDAController:function getDDAController(){if(this.ddaController===null){this.ddaController={shouldAskUser:true,allowDDA:function allowDDA(){var rootController=mstrApp.getRootController(),model=rootController.model,rootView=rootController.rootView,canSupport=!!model.canSupportDDA,dbridForDDA,statement,connectLiveSupport=model.connectLiveSupport,dbr,isXqueryDbRole;if(!canSupport||(connectLiveSupport===$DIConstants.connectLiveSupport.connectLiveSupportInMemoryOnly)){return false;}else{if(connectLiveSupport===undefined||!mstrApp.isFFSQLMode){dbr=model.getDBRole(model.SelDBRoleID);isXqueryDbRole=dbr&&dbr.mdDBRole&&dbr.mdDBRole.db_type===3000;if(isXqueryDbRole){return false;}}}dbridForDDA=model.dbridForDDA;if(dbridForDDA){if(!mstrApp.isFFSQLMode&&model.dbtables.length>0&&dbridForDDA!==model.prevDBRoleID){canSupport=false;}else{if(mstrApp.isFFSQLMode){statement=rootView.getSQLStatement();if(model.prevDBRoleID&&$STR.trim(statement)&&dbridForDDA!==model.prevDBRoleID){canSupport=false;}}}}return canSupport&&!(mstrApp.isFFSQLMode&&model.isMultiPassSQL(rootView.getSQLStatement()));},onlyAllowDDA:function onlyAllowDDA(){return !!mstrApp.getRootController().model.shouldSupportDDA;},onToggleDDA:function onToggleDDA(value){var model=mstrApp.getRootController().model,errCode=0,checked;if(model.isDDA===value){return ;}if(value){model.set("isDDA",true);if(!this.allowDDA()){errCode=1;checked=false;}}else{model.set("isDDA",false);if(this.onlyAllowDDA()){errCode=2;checked=true;}}if(errCode){mstrmojo.qb.alert(DDA_ERR_MSGS[errCode]);model.set("isDDA",checked);}},checkDDACheckbox:function checkDDACheckbox(value){var ddaCheckboxID=mstrApp.getRootController().model.ddaCheckboxID,ddaCheckbox;if(ddaCheckboxID){ddaCheckbox=mstrmojo.all[ddaCheckboxID];if(ddaCheckbox){ddaCheckbox.set("checked",value);}}},tryEnableDDACheckbox:function tryEnableDDACheckbox(isEnabled){var ddaCheckboxID=mstrApp.getRootController().model.ddaCheckboxID,ddaCheckbox;if(ddaCheckboxID){ddaCheckbox=mstrmojo.all[ddaCheckboxID];}if(!ddaCheckbox||!ddaCheckbox.visible){return ;}if(!isEnabled){if(ddaCheckbox.enabled&&!ddaCheckbox.checked&&!this.allowDDA()){ddaCheckbox.set("enabled",false);}}else{if(!ddaCheckbox.enabled&&!ddaCheckbox.checked&&this.allowDDA()){ddaCheckbox.set("enabled",true);}}},askUserAboutDDA:function askUserAboutDDA(alreadyAsked){if(alreadyAsked){this.shouldAskUser=false;}return this.shouldAskUser;},showDDAConfirmDialog:function showDDAConfirmDialog(config){var dialog=new mstrmojo.DI.ui.dialogs.DIDirectAccessConfirmDialog(config||{});dialog.open();}};}return this.ddaController;},onHelpButtonClick:function onHelpButtonClick(){mstrApp.showHelpTopic(this.model.getHelpTopic());},selectDBRole:function selectDBRole(dbRoleID){var connList,index;if(!dbRoleID){return ;}connList=this.rootView.getDBConnectionList&&this.rootView.getDBConnectionList();if(!connList){return ;}index=$A.find(connList.items,"did",dbRoleID);if(index>=0){connList.set("selectedIndex",index);connList.adjustScrollPosition(index);}},hasTableJoin:function hasTableJoin(tableID){var table=this.model.tables[tableID];return(table&&table.njoins>0)?true:false;}});}());