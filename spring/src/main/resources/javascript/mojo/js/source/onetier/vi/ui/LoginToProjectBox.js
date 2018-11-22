(function(){mstrmojo.requiresCls("mstrmojo.Box","mstrmojo.hash","mstrmojo.Editor","mstrmojo.dom","mstrmojo.string","mstrmojo.css","mstrmojo.array","mstrmojo.func","mstrmojo.onetier.vi.ui.LoginBox");var $HASH=mstrmojo.hash,$STR=mstrmojo.string,$DOM=mstrmojo.dom,$CSS=mstrmojo.css,$ALERT=mstrmojo.alert,$ARRAY=mstrmojo.array,$FUNC=mstrmojo.func,$ERROR=mstrmojo.onetier.vi.prefs.handleErrorMessage,loginToProjectBoxOpened=false;_toggleFields=function _toggleFields(state){this.loginBox.set("loginVisible",state==="login");if(this.parent){this.parent.toggleFields(state);}},checkForSession=function checkForSession(info,callback){_toggleFields.call(this,"loading");var cp=this.connectivityProxy,cid=info.webServer.connection.id,is;if(info.webServer.loginFirst){cp.getLoginFirstSessionState(cid,callback);}else{is=info.iServer;cp.getLoginFirstSessionState(cid,{success:function(res){if(res.code===401){cp.getSessionState(cid,is.name,is.port,info.project.name,callback);}else{cp.login({connectionId:cid,server:is.name,project:info.project.name,port:is.port,lfs:res.sessionState,authMode:(info.webServer&&info.webServer.loginFirstAuthMode)||info.project.loginInfo.defaultAuthMode},$FUNC.override({success:function(lfRes){lfRes.lfSessionState=res.sessionState;this._super(lfRes);}},callback));}},failure:function(){cp.getSessionState(cid,is.name,is.port,info.project.name,callback);}});}},_logout=function _logout(callLogout){var lsi=this.currentProject,ps=this.projectBox.projectSelector,refresh=function(){delete ps.lastSelectedItem;this.populateProjects();mstrApp.rootCtrl.set("dataProvider",null);mstrApp.rootCtrl.set("selectedProject",null);if(mstrApp.rootCtrl.datasetsPanel&&mstrApp.rootCtrl.datasetsPanel.objectBrowser){mstrApp.rootCtrl.datasetsPanel.objectBrowser.set("dataProvider",null);}mstrApp.set("browseAllObjects",true);}.bind(this),logoutProject=function(onSuccess){this.connectivityProxy.logout({sessionState:this.sessionState,connectionId:this.connectionId,port:lsi.iServer.port,server:lsi.iServer.name,project:lsi.project.name},{success:onSuccess,failure:$ERROR});}.bind(this);mstrApp.rootCtrl.datasetsPanel.onLogout(this.sessionState);if(callLogout){if(this.lfsessionState){this.connectivityProxy.logout({sessionState:this.lfsessionState,connectionId:this.connectionId},{success:function(){logoutProject(refresh);},failure:$ERROR});}else{logoutProject(refresh);}}else{refresh();}},validateProject=function(projectInfo,callback){if(!this.validateConnectedServer||projectInfo.loginFirst){callback.success();return ;}var connInfo,msgDatasets=mstrmojo.desc(14393,'A dashboard can be connected to only one project at a time. Datasets in this dashboard are currently connected to "#". Please edit or remove these datasets before connecting to "##".')+"<br>"+mstrmojo.desc(14585,"Alternatively, create a new dashboard."),msgSchema=mstrmojo.desc(14164,'A dashboard can be connected to only one project at a time. Currently you are browsing the schema of "#". Please logout from that project before connecting to "##".')+"<br>"+mstrmojo.desc(14585,"Alternatively, create a new dashboard."),connected,toConnect=projectInfo.n,datasetNames=[],showErrorDatasets=function(){datasetNames.unshift(mstrmojo.desc(14165,'The following datasets are connected to "#":').replace("#",connected));mstrmojo.error({shortDesc:msgDatasets.replace("##",toConnect).replace("#",connected),longDesc:datasetNames.join("<br>")},undefined,{zIndex:100000,title:mstrmojo.desc(1695,"Warning")});},showErrorSchema=function(currentProjectName){mstrmojo.error({shortDesc:msgSchema.replace("##",toConnect).replace("#",currentProjectName),longDesc:mstrmojo.desc(14166,'Please disconnect from "#"').replace("#",currentProjectName)},undefined,{zIndex:100000});};$HASH.forEach(this.docModel.datasets,function(dataset){connInfo=dataset.connInfo;if(connInfo){connected=connInfo.pn;datasetNames.push(dataset.name);}}.bind(this));var projName=projectInfo.n,iServerHostName=projectInfo.iServer.hostName,iServerPort=projectInfo.iServer.port;this.connectivityProxy.isCurrentProject({project:{name:projName},iServer:{name:iServerHostName,port:iServerPort}},{success:function(isCurrent){if(isCurrent){var dp=mstrApp.rootCtrl.dataProvider,cp=dp&&dp.currentProject;if(cp&&(projName!==cp.n||iServerHostName!==cp.iServer.hostName||iServerPort!==cp.iServer.port)){showErrorSchema(cp.n);callback.failure();}else{callback.success();}}else{var editorId=mstrApp.rootCtrl.connectToServerEditorId;if(mstrmojo.all[editorId]){mstrmojo.all[editorId].close();}showErrorDatasets();callback.failure();}}});};mstrmojo.onetier.vi.ui.LoginToProjectBox=mstrmojo.declare(mstrmojo.Box,null,{scriptClass:"mstrmojo.onetier.vi.ui.LoginToProjectBox",cssClass:"mstrmojo-loginToProjectBox",connectivityProxy:null,callback:{},sessionState:null,canLogout:true,projectChanged:mstrmojo.emptyFn,validateConnectedServer:false,ifNoWebProjects:mstrmojo.emptyFn,getSession:function getSession(){this.loginBox.getSession();},onError:function onError(res){$ERROR(res);},logout:function logout(){_logout.call(this);},getWebServerProjects:function(callback){this.connectivityProxy.getWebServersProjects(callback);},onsessionStateChange:function onSessionStateChange(){if(this.loginBox.isLoginFirst){this.populateProjects(this.currentProject.webServer.connection.id,{webServer:this.currentProject.webServer,authMode:this.loginBox&&this.loginBox.authMode&&this.loginBox.authMode.v});}else{this.authMode=this.loginBox.authMode;mstrApp.rootCtrl.authMode=this.loginBox.authMode;mstrApp.rootCtrl.selectedProject=this.currentProject;(this.callback.success||mstrmojo.emptyFn)({sessionState:this.sessionState,connectionId:this.connectionId});}},populateProjects:function populateProjects(connId,loginFirstProjectInfo){var box=this,docModelOperation=box.docModel&&box.docModel.operation,connectivityProxy=this.connectivityProxy,items=[{n:mstrmojo.desc(14167,"Select a project..."),cls:"selectProj",isSelectProjectItem:true}],noWS=function(){var preferencesLinkCssClass="mstrmojo-ot-prefs-link",alertEdt=$ALERT(mstrmojo.desc(14071,"No server defined. You can add a server at ##Preferences###.").replace("##",'<span class="mstrmojo-ot-prefs-link">').replace("###","</span>"),null,mstrmojo.desc(13799,"Server connection missing"),null,null,{allowHTML:true});$DOM.attachOneTimeEvent(alertEdt.domNode.getElementsByClassName(preferencesLinkCssClass)[0],"click",function(){alertEdt.close();alertEdt.destroy();if(docModelOperation==="inputConnectionDetails"){connectivityProxy.showPreferencesEditor({inputConnectionDetails:true});}else{if(docModelOperation==="browseAllObjects"){connectivityProxy.showPreferencesEditor({browseAllObjects:true});}else{if(docModelOperation==="addDataset"){connectivityProxy.showPreferencesEditor({addDataset:true});}else{if(docModelOperation==="uploadDashboard"){connectivityProxy.showPreferencesEditor({uploadDashboard:true});}else{if(docModelOperation==="downloadDashboard"){connectivityProxy.showPreferencesEditor({downloadDashboard:true});}else{connectivityProxy.showPreferencesEditor();}}}}}});},projectSelector=this.projectBox.projectSelector;this.getWebServerProjects({success:function(webServers,skipErrors){var first,selectedIndex=0,hasActiveProjects=false,index,projects;if($HASH.keyarray(webServers).length===0){box.ifNoWebProjects();if(!skipErrors){noWS();}return ;}$HASH.forEach(webServers,function(webServer){if(webServer.loginFirst||webServer.clusters.length){hasActiveProjects=true;return false;}});if(!hasActiveProjects){box.ifNoWebProjects();mstrmojo.warn(mstrmojo.desc(13800,"The configured servers do not have any active projects."),{cancelBtn:{t:"Edit Connection",fn:function(){if(docModelOperation==="inputConnectionDetails"){this.connectivityProxy.showPreferencesEditor({inputConnectionDetails:true});}else{if(docModelOperation==="browseAllObjects"){this.connectivityProxy.showPreferencesEditor({browseAllObjects:true});}else{if(docModelOperation==="addDataset"){this.connectivityProxy.showPreferencesEditor({addDataset:true});}else{if(docModelOperation==="uploadDashboard"){this.connectivityProxy.showPreferencesEditor({uploadDashboard:true});}else{if(docModelOperation==="downloadDashboard"){this.connectivityProxy.showPreferencesEditor({downloadDashboard:true});}else{this.connectivityProxy.showPreferencesEditor();}}}}}}.bind(this)},confirmBtn:{t:mstrmojo.desc(2397,"OK"),fn:null}});return ;}$HASH.forEach(webServers,function(webServer,k){first=true;if(webServer.loginFirst){items.push({n:webServer.connection.n+" ("+webServer.connection.wsn+")",cls:"serverName loginFirst",webServer:webServer,loginFirst:true});}else{if(loginFirstProjectInfo&&loginFirstProjectInfo.webServer.connection.id===webServer.connection.id){webServer.loginFirstAuthMode=loginFirstProjectInfo.authMode;}webServer.clusters.forEach(function(cluster){if(first){items.push({n:webServer.connection.n+" ("+webServer.connection.wsn+")",cls:"serverName",isServerLabel:true});first=false;}projects=[];cluster.forEach(function(iServer){(iServer.projects||[]).forEach(function(project){index=$ARRAY.find(projects,"n",project.name);if(index<0){projects.push({n:project.name,cls:"projectName",webServer:webServer,iServer:$HASH.copy(iServer,{clusterName:iServer.name}),project:project});}else{projects[index].iServer.clusterName=projects[index].iServer.clusterName+"/"+iServer.name;}}.bind(this));});items=items.concat(projects);}.bind(this));}});projectSelector.selectedIndex=selectedIndex;projectSelector.items=items;projectSelector.refresh();}.bind(this),failure:function(res){if(res){box.onError(res);}box.parent.close();}.bind(this)});},oncurrentProjectChange:function oncurrentProjectChange(){var loginBox=this.loginBox,item=this.currentProject,webServer=item.webServer,connectionId=webServer.connection.id,iServer=item.iServer,loginFirst=webServer.loginFirst,project=item.project,loginInfo=(loginFirst?webServer.loginInfo:project.loginInfo),enabledAuthModes=loginInfo.enabledAuthModes,defaultAuthMode=loginInfo.defaultAuthMode,usherLogin=loginInfo.usherLogin,has2FA=loginInfo.has2FA;loginBox.set("isLoginFirst",!!loginFirst);loginBox.set("connectionId",connectionId);if(!loginFirst){loginBox.set("iServerName",iServer&&iServer.name);loginBox.set("port",iServer&&iServer.port);loginBox.set("projectName",project&&project.name);}else{loginBox.set("iServerName","");loginBox.set("port","");loginBox.set("projectName","");}delete loginBox.usherLogin;delete loginBox.has2FA;loginBox.set("usherLogin",((enabledAuthModes&mstrmojo.onetier.vi.ui.LoginBox.AUTH_MODES.authTrusted.v)>0)&&usherLogin||((loginInfo.defaultAuthMode&mstrmojo.onetier.vi.ui.LoginBox.AUTH_MODES.authUsher.v)>0));loginBox.set("has2FA",has2FA);loginBox.updateAuthModes(enabledAuthModes,defaultAuthMode);loginBox.loginConfigUpdated();this.projectChanged();},_set_sessionState:function(n,v){this.sessionState=v;return true;},children:[{alias:"projectBox",scriptClass:"mstrmojo.HBox",cssClass:"projectBox",children:[{scriptClass:"mstrmojo.Label",cssClass:"projectLabel",text:mstrmojo.desc(15,"Server:")},{alias:"projectSelector",scriptClass:"mstrmojo.ui.Pulldown",cssClass:"projectSelector",isHostedWithin:true,useRichTooltip:true,getLabelNode:function getLabelNode(target){var n=$DOM.findAncestorByAttr(target,"idx",true,this.domNode);return n&&n.node;},getItemFromTarget:function getItemFromTarget(target){var t=this.getLabelNode(target);return t&&this.items[t.getAttribute("idx")];},getItemTooltip:function(item,itemNode){if(item.iServer&&item.iServer.clusterName){var labelNode=this.getLabelNode(itemNode),position=$DOM.position(labelNode),content="<div>"+$STR.encodeHtmlString(item.iServer.clusterName,true)+"</div>";return{areaId:item._renderIdx+"text",cssClass:"vi-regular vi-tooltip-C",content:content,top:position.y-2,left:position.x+position.w+9,enableHover:false};}return null;},showTooltip:function showTooltip(evt,win){var target=evt.target||$DOM.eventTarget(evt.hWin,evt.e),item=this.getItemFromTarget(target);if(item&&item.n){this.richTooltip=this.getItemTooltip(item,target);if(this.richTooltip){this.constructor.prototype.showTooltip.call(this,evt,win);}}},onitemSelected:function(item,idx,reselect){var editor=this.parent.parent,selectDelayed=function(index){window.setTimeout(function(){this.set("selectedIndex",index);}.bind(this),0);}.bind(this);if(!item){return ;}if(item.isSelectProjectItem){if(this.lastSelectedItem&&!this.lastSelectedItem.loginFirst){selectDelayed(this.items.indexOf(this.lastSelectedItem));}else{this.lastSelectedItem=undefined;_toggleFields.call(editor,"selectingProject");}return ;}if(item.isServerLabel&&!item.loginFirst){if(this.lastSelectedItem&&!this.lastSelectedItem.loginFirst){selectDelayed(this.items.indexOf(this.lastSelectedItem));}else{this.lastSelectedItem=undefined;selectDelayed(0);_toggleFields.call(editor,"selectingProject");}return ;}validateProject.call(editor,item,{success:function(){var webServer=item.webServer,connectionId=webServer&&webServer.connection.id,getSession=function(){_toggleFields.call(editor,"login");editor.loginBox.tryGetSession(reselect);};editor.set("currentProject",item);editor.set("connectionId",connectionId);editor.set("lfsessionState",null);if(reselect||this.lastSelectedItem!==item){checkForSession.call(editor,item,{success:function(res){if(res.code===401){getSession();}else{if(item&&item.project&&item.project.loginInfo){editor.loginBox.updateAuthModes(item.project.loginInfo.enabledAuthModes,res.authModeValue);}editor.set("lfsessionState",res.lfSessionState);editor.set("sessionState",res.sessionState);if(!!mstrApp.rootCtrl.dataProvider){mstrApp.rootCtrl.dataProvider.sessionState=res.sessionState;}mstrApp.rootCtrl.selectedProject=item;mstrApp.set("browseAllObjects",!res.disableAllObjects);}},failure:function(){getSession();}});}this.lastSelectedItem=item;}.bind(this),failure:function(){window.setTimeout(function(){if(this.selectedIndex!==0){this.set("selectedIndex",0);}}.bind(this),0);return ;}.bind(this)});}},{alias:"logoutButton",scriptClass:"mstrmojo.Button",cssClass:"logoutButton",text:mstrmojo.desc(8,"Logout"),useRichTooltip:true,onclick:function(){_logout.call(this.parent.parent,true);},updateTooltipConfig:function(){this.richTooltip={posType:mstrmojo.tooltip.POS_BOTTOMLEFT,cssClass:"vi-regular vi-tooltip-C",left:this.domNode.offsetWidth+12,top:this.domNode.offsetHeight+5,refNode:this.domNode,content:mstrmojo.desc(8,"Logout")};},bindings:{visible:"this.parent.parent.canLogout"}}]},{alias:"loginBox",scriptClass:"mstrmojo.onetier.vi.ui.LoginBox",onSessionObtained:function(sessionState){this.parent.set("sessionState",sessionState);mstrApp.rootCtrl.set("dataProvider",new mstrmojo.onetier.vi.ui.ObjectBrowserDataProvider({connectivityProxy:this.parent.connectivityProxy,sessionState:sessionState,connectionId:this.connectionId}));}}]});mstrmojo.onetier.vi.ui.LoginToProjectBox.isBoxOpen=function(){return loginToProjectBoxOpened;};mstrmojo.onetier.vi.ui.LoginToProjectBox.openDialog=function(config,connectivityProxy,callback){config=config||{};var getConnectivityProxy=function(){return connectivityProxy||(mstrApp.isSingleTier?new mstrmojo.onetier.vi.prefs.DesktopConnectivityProxy():new mstrmojo.onetier.vi.prefs.HostedDesktopConnectivityProxy());},ed=(new mstrmojo.Editor({cssClass:"mstrmojo-onetier-loginToProjectDialog login",title:mstrmojo.desc(26,"Login"),toggleFields:function _toggleFields(state){$CSS.toggleClass(this.editorNode,"loading",false);switch(state){case"loading":$CSS.toggleClass(this.editorNode,"loading",true);break;case"selectingProject":$CSS.toggleClass(this.editorNode,"selectingProject",true);break;case"login":$CSS.toggleClass(this.editorNode,"selectingProject",false);break;}if(this.hasRendered){this.positionDialog();}},onOpen:function onOpen(){loginToProjectBoxOpened=true;this.loginToProjectBox.populateProjects();if(!this.loginButtonListener){this.loginButtonListener=mstrApp.attachEventListener("loginButtonDisplay",this.id,function(e){this.buttonBox.loginButton.domNode.style.display=!e.value?"none":"block";}.bind(this));}},onClose:function onClose(){loginToProjectBoxOpened=false;if(this.loginButtonListener){mstrApp.detachEventListener(this.loginButtonListener);delete this.loginButtonListener;}window.setTimeout(function(){ed.destroy();},100);},children:[{alias:"label",scriptClass:"mstrmojo.Label",cssClass:"label",text:config.label,visible:!!config.label},{alias:"loginToProjectBox",scriptClass:"mstrmojo.onetier.vi.ui.LoginToProjectBox",canLogout:false,docModel:config.docModel||null,connectivityProxy:getConnectivityProxy(),ifNoWebProjects:function(){ed.close();},validateConnectedServer:config.validateConnectedServer||false,callback:{success:function(res){callback.success(res,ed.loginToProjectBox.currentProject);ed.close();},failure:function(){callback.failure();}}},{scriptClass:"mstrmojo.HBox",alias:"buttonBox",slot:"buttonNode",cssClass:"mstrmojo-Editor-buttonBar",children:[{alias:"addConnection",scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-WebButton",text:mstrmojo.desc(14394,"Edit Connections"),onclick:function onclick(){ed.close();config.docModel.operation="none";if(config.docModel.operation==="inputConnectionDetails"){getConnectivityProxy().showPreferencesEditor({inputConnectionDetails:true});}else{if(config.docModel.operation==="browseAllObjects"){getConnectivityProxy().showPreferencesEditor({browseAllObjects:true});}else{if(config.docModel.operation==="addDataset"){getConnectivityProxy().showPreferencesEditor({addDataset:true});}else{if(config.docModel.operation==="uploadDashboard"){getConnectivityProxy().showPreferencesEditor({uploadDashboard:true});}else{if(config.docModel.operation==="downloadDashboard"){getConnectivityProxy().showPreferencesEditor({downloadDashboard:true});}else{getConnectivityProxy().showPreferencesEditor();}}}}}}},{alias:"loginButton",scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-Button mstrmojo-Editor-button mstrmojo-WebButton hot loginButton",text:mstrmojo.desc(26,"Login"),onclick:function(){ed.loginToProjectBox.getSession();}},{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-WebButton",alias:"cancel",text:mstrmojo.desc(221,"Cancel"),onclick:function(){(callback.failure||mstrmojo.emptyFn)();this.parent.parent.close();}}]},{alias:"loadingBox",scriptClass:"mstrmojo.Box",cssClass:"loadingBox"}]}));ed.open();};}());