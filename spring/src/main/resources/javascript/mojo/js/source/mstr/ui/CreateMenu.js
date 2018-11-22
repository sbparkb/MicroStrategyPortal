(function(){mstrmojo.requiresCls("mstrmojo.Widget","mstrmojo.ui.menus.MenuConfig","mstrmojo.mstr.ui.EnumWebPromptsList","mstrmojo.form","mstrmojo.IVEDatasetPicker","mstrmojo.mstr.MDXCubeBrowser","mstrmojo.NewFolderEditor","mstrmojo.mstr._ObjectActions","mstrmojo.mstr.ui.MstrFileUploadHelper");var $tstid=mstrmojo.tstid;var DSSID={BLANK:"05B202B9999F4C1AB960DA6208CADF3D",XDA:"1ADEAA2C4754E2DE5DFEC08022DAFDC6",ICUBE:"DB8D5B064BBE3C24F541DAA81A507FDC"};function submitForm(params,action,method,target){if(window.iframe){window.iframe.showWaitPage(true);}mstrmojo.form.send(params,action,method,target);}function addSaveFolderID(params){if(mstrApp.currentFolderId){params.saveFolderId=mstrApp.currentFolderId();}}function getReportSubMenuConfig(submenuConfig,subItems){function fnItemCallBack(item){function handleFormSubmit(config){if(config){submitForm(config.params,null,"post");}}var config=item.config;if(item.config.did===DSSID.ICUBE){var id="mstr-create-objectExpl",editor=mstrmojo.all[id];if(!editor){editor=new mstrmojo.IVEDatasetPicker({id:id,cssClass:"mstr-create-menu-cubePicker",title:mstrmojo.desc(4354,"Select Intelligent Cube"),help:"Select_Intelligent_Cube_dialog_box.htm",onOk:function(){config.params={evt:3005,src:servletName+".3005",srcType:2,srcID:this.item.did,reportDesignMode:1,name:"editReport"};addSaveFolderID(config.params);handleFormSubmit(config);},onCancel:function(){editor.close();},onRender:function(){var importVisible=false,that=this;this.btnImport.set("visible",importVisible);this.newLabel.set("visible",importVisible);this.useExistingLabel.set("visible",importVisible);this.ob.set("scrollableIncFetch",false);this.btnHBox.destroyChildren();var btnOk=mstrmojo.Button.newWebButton(mstrmojo.desc(547,"Select"),function(){if(this.enabled){that.onOk();that.onCancel();}},true);btnOk.bindings={enabled:function(){return this.parent.parent.multiSelect?!!this.parent.parent.selectedItems.length:!!this.parent.parent.item;}};this.btnHBox.addChildren([btnOk,mstrmojo.Button.newWebButton(mstrmojo.desc(221,"Cancel"),function(){that.onCancel();},false)]);}});}if(config.title){editor.set("title",config.title);}if(config.cssClass){editor.set("cssClass",config.cssClass);}editor.open();}else{if(item.config.did===DSSID.XDA){(new mstrmojo.mstr.MDXCubeBrowser({onClose:function(){this.destroy();},onOK:function(item){var params={evt:3005,src:(mstrApp.servletName||mstrApp.name)+".3005",srcType:1,srcID:item.did,reportDesignMode:1};addSaveFolderID(params);submitForm(params);}})).open();}else{if(config.did){handleFormSubmit(config);}}}if(item.menuOpener.createMenu&&item.menuOpener.createMenu.close){item.menuOpener.createMenu.close();}return true;}function fnGetItemMarkup(item,idx){var config=item.config,markup='<a class="mstrMenuItem subMenuItem '+config.name+' {@cls} {@newGroup}" idx="{@idx}" value="'+config.value+'"title="'+config.desc+'"><span class=""></span><span class="label">{@n}</span></a>';return markup;}var menu=this,reportTemplates=mstrmojo.hash.clone(subItems||menu.createMenuData.rl),servletName=mstrApp.servletName||mstrApp.name;for(var i=0;i<reportTemplates.length;i++){if(reportTemplates[i].did===DSSID.BLANK){var val=reportTemplates[i];reportTemplates.splice(i,1);reportTemplates.splice(0,0,val);continue;}if(reportTemplates[i].did===DSSID.XDA||reportTemplates[i].did===DSSID.ICUBE){var val=reportTemplates[i];reportTemplates.splice(i,1);reportTemplates.splice(1,0,val);continue;}}for(var i=0;i<reportTemplates.length;i++){var canCreate=false;var did=reportTemplates[i].did;if(did===DSSID.ICUBE){if(mstrmojo.resolveFeature("web-define-view-report")){canCreate=true;}}else{canCreate=true;if(!mstrmojo.resolveFeature("template-reports")||(did===DSSID.BLANK&&(!mstrmojo.resolveFeature("design-mode")||!mstrmojo.resolveFeature("modify-report-list")))||(did===DSSID.XDA&&(!mstrmojo.resolveFeature("dhtml")||!mstrmojo.resolveFeature("web-define-view-report")||!mstrmojo.resolveFeature("define-query-report-builder")))){canCreate=false;}}if(!canCreate){continue;}var item;if(reportTemplates[i].t===8){item=getSubmenuConfig4Folder(reportTemplates[i],menu,submenuConfig,getReportSubMenuConfig);}else{item=submenuConfig.addCustomMenuItem(reportTemplates[i].n,"",fnItemCallBack,fnGetItemMarkup);reportTemplates[i].params={reportID:reportTemplates[i].did,blank_reportDesignMode:1,reportDesignMode:4,evt:3005,src:servletName+".3005",reportViewMode:1,promptStyle:"PromptsTransformCreateReport",promptsExecuteStyle:"PromptsTransformClassicSave",promptsCreateStyle:""};addSaveFolderID(reportTemplates[i].params);if(reportTemplates[i].did===DSSID.BLANK){reportTemplates[i].params.reportDesignMode=1;}item.config=reportTemplates[i];item.menuOpener=menu;}}}function getDocumentSubMenuConfig(submenuConfig){function getMostPowerfulAvailableMode(avm){var viewMode={DssXmlViewMediaViewStatic:1,DssXmlViewMediaViewInteractive:2,DssXmlViewMediaViewEditable:4};var result=viewMode.DssXmlViewMediaViewStatic;if(avm!==0){if((avm&viewMode.DssXmlViewMediaViewEditable)>0){result=viewMode.DssXmlViewMediaViewEditable;}else{if((avm&viewMode.DssXmlViewMediaViewInteractive)>0){result=viewMode.DssXmlViewMediaViewInteractive;}else{if((avm&viewMode.DssXmlViewMediaViewStatic)>0){result=viewMode.DssXmlViewMediaViewStatic;}}}}return result;}var menu=this,dash=menu.createMenuData.dl,doc=menu.createMenuData.docList,servletName=mstrApp.servletName||mstrApp.name;function getTemplateBoxes(items){var boxesMarkup="";if(!items){return boxesMarkup;}for(var i=0;i<items.length;i++){boxesMarkup+='<a title="'+items[i].n+" - "+items[i].desc+'" id = vt_'+items[i].did+' class="dashboardStyleTemplate mstrMenuItem subMenuItem" idx="{@idx}" rwviewmode = "'+getMostPowerfulAvailableMode(items[i].avm)+'" data-id = "'+items[i].did+'"></a>';}return boxesMarkup;}function getDocumentItems(items){if(!items){return"";}var itemsMarkup="";for(var i=0;i<items.length;i++){itemsMarkup+='<a class="mstrMenuItem subMenuItem {@cls}" title = "'+items[i].desc+'" idx="{@idx}" data-id = '+items[i].did+' rwviewmode = "'+getMostPowerfulAvailableMode(items[i].avm)+'" >'+items[i].n+"</a>";}return itemsMarkup;}function getSubmenuTemplate(){var dashboardTemplate='<div class = "mstr-dashboard-subMenu dashboardTemplates">'+getTemplateBoxes(dash)+"</div>";var documentTemplate='<div class = "mstr-dashboard-subMenu docList" >'+getDocumentItems(doc)+"</div>";var submenuTemplate="";if(dash){submenuTemplate+=dashboardTemplate;}if(doc){submenuTemplate+="<hr>"+documentTemplate;}return submenuTemplate;}function handleTemplateSelection(item,idx){var params={blank_rwDesignMode:1,rwDesignMode:1,evt:3104,src:servletName+".3104",createDocument:"*-1.*-1.0.0.0"};params.rwViewMode=idx._evtTarget.getAttribute("rwviewmode");params.objectID=idx._evtTarget.getAttribute("data-id");addSaveFolderID(params);submitForm(params,null,"post");return true;}submenuConfig.addCustomMenuItem("DashDoc Templates","",handleTemplateSelection,getSubmenuTemplate);}function getPromptSubMenuConfig(submenuConfig){function fnItemCallBack(item){submitForm(item.config.params);return true;}function fnGetItemMarkup(item,idx){var config=item.config;return"<a "+$tstid(config.name+"Item")+' class="mstrMenuItem subMenuItem '+config.name+' {@cls} {@newGroup}" idx="{@idx}" value="'+config.value+'"><span class=""></span><span class="label">{@n}</span></a>';}var prompts=mstrmojo.mstr.ui.EnumWebPromptsList.get();for(var i=0;i<prompts.length;i++){var itm=prompts[i],n=mstrmojo.desc(itm.descId)||itm.n,item=submenuConfig.addCustomMenuItem(n,"",fnItemCallBack,fnGetItemMarkup);item.config=itm;}}function getSubmenuConfig4Folder(folderObject,menu,menuConfig,fnMenuConfigBuilder){if(!folderObject.items&&!folderObject.loading){folderObject.loading=true;var xhr=new mstrmojo.SimpleXHR({async:false});xhr.request("POST",mstrConfig.taskURL,{success:function success(res){var itms=res.items||[];if(itms.length===0){itms.push({n:mstrmojo.desc(3693,"(None)")});}folderObject.items=itms;delete folderObject.loading;}},{folderID:folderObject.did,taskId:"folderBrowse",styleName:menu.folderBrowsingStyle,includeObjectDesc:true});}return menuConfig.addPopupMenuItem(folderObject.n,"",function getItemsInFolder(){var subMnuConfig=new mstrmojo.ui.menus.MenuConfig({menuCssClass:"mstr-create-menu"});fnMenuConfigBuilder.call(menu,subMnuConfig,folderObject.items);return subMnuConfig;});}function getCreateSubmenuConfig(type){var menu=this,objectType=type;return function(){var submenuConfig=mstrmojo.insert({scriptClass:"mstrmojo.ui.menus.MenuConfig",menuCssClass:"mstr-create-menu",hostProxyCssClass:"mstrmojo-create-menu-host",tstid:type+"Sbm"});switch(objectType){case"template":getReportSubMenuConfig.call(menu,submenuConfig);break;case"templateDoc":submenuConfig.menuCssClass=submenuConfig.menuCssClass+" mstr-dashboard-subMenu collapse";getDocumentSubMenuConfig.call(menu,submenuConfig);break;case"prompt":getPromptSubMenuConfig.call(menu,submenuConfig);break;}return submenuConfig;};}function showCL(opener){var menu=this,data=menu.createMenuData.sl;var createMenu=mstrmojo.all["mscld-create-menuList"],servletName=mstrApp.servletName||mstrApp.name;if(!createMenu){var menuConfig=mstrmojo.insert({scriptClass:"mstrmojo.ui.menus.MenuConfig",menuCssClass:menu.cssClassName+" collapse",hostProxyCssClass:menu.hostCssClassName,anchorElement:opener.domNode,hostId:opener.id,isHostedWithin:false,includeScroll:false,tstid:"createMenu"});if(menu.alignMenuToRight){menuConfig.setAlignment(mstrmojo.ui.PopupConfig.ENUM_CORNERS.BOTTOM_RIGHT,mstrmojo.ui.PopupConfig.ENUM_CORNERS.TOP_RIGHT);}function fnGetItemMarkup(item,idx){var config=item.config;var markup="<a "+$tstid(config.name+"Item")+' class="mstrMenuItem '+config.name+' {@cls} {@newGroup}" idx="{@idx}" onclick=" mstrmojo.all[\''+menu.id+"'].onclick('"+item.name+'\',event)" href="'+config.href+'" useIframe="'+config.iframe+'"';if(config.accept!==undefined){markup+=' accept = "'+config.accept+'"';}markup+=' name="'+config.name+'"><span class="micn"></span><span>{@n}</span></a>';return markup;}function fnGetItemMarkupUpload(item,idx){var config=item.config;var markup="<label "+$tstid(config.name+"Item")+' for ="myFile" class="mstrMenuItem '+config.name+' {@cls} {@newGroup}" idx="{@idx}" onclick=" mstrmojo.all[\''+menu.id+"'].onclick('"+item.name+'\',event)" href="'+config.href+'" target="'+config.target+'" useIframe='+config.iframe+'"';if(config.accept!==undefined){markup+=' accept = "'+config.accept+'"';}markup+='name="'+config.name+'"><span class="micn"></span><span>{@n}</span></label>';return markup;}function fnItemCallBack(item){if(item.config.name==="folder"){var newFolderEditor=mstrmojo.insert({scriptClass:"mstrmojo.NewFolderEditor",fId:mstrApp.currentFolderId?mstrApp.currentFolderId():"",Index:createMenu.domNode.style.zIndex+10,navigateAfter:true,okFn:function(){var me=this,params={evt:2001,src:servletName+"."+mstrApp.pageName+".fbb.fb.2001",folderID:me.fId};submitForm(params,mstrApp.name,"POST");},onClose:function(){this.destroy();}});newFolderEditor.open();}if(createMenu&&createMenu.close){window.setTimeout(function(){createMenu.close();},10);}return true;}var groupAdded=false;for(var i=0;i<data.sl.length;i++){var sl=data.sl[i];if(sl.grp){menuConfig.addSeparator();}var item={},expandClass=groupAdded===false?"":"collapsable ";if(sl.name==="prompt"||sl.name==="template"||sl.name==="templateDoc"){item=menuConfig.addPopupMenuItem(sl.n,menuConfig.id,getCreateSubmenuConfig.call(menu,sl.name));item.cls=item.cls+expandClass+sl.name;item.tstid=sl.name+"Item";}else{if(sl.name==="myFile"){item=menuConfig.addCustomMenuItem(sl.n,expandClass,fnItemCallBack,fnGetItemMarkupUpload);var markup='<form id="import_form" class="mstrmojo-FileUploadBox" target="hidden_import_iframe" enctype="multipart/form-data" method="post" action="'+mstrConfig.taskURL+'"><input id="myFile" name="myFile" type="file" class="mstrmojo-FileUploadBox-file mstr-create-menu-fileUpload" size="30" onchange="mstrApp.uploadMstrFileFn.upload(\'import_form\');" accept=".mstr" title=""><input type="hidden" name="fileFieldName" value="myFile"><input type="hidden" name="taskId" value="importAsyncSaveRWD"><input type="hidden" name="taskEnv" value="jsonp2"><input type="hidden" name="jsonp" value="parent.mstrApp.uploadMstrFileFn.callback(@R@)"><input type="hidden" name="myfile" value=""><input type="hidden" name="folderID" value="" id="import_folderID"></form>';markup+='<iframe name="hidden_import_iframe" style="display:none;" src="about:blank"></iframe>';if(!document.getElementById("import_form")){var formSpan=document.createElement("SPAN");formSpan.innerHTML=markup;document.body.appendChild(formSpan);}}else{item=menuConfig.addCustomMenuItem(sl.n,expandClass,fnItemCallBack,fnGetItemMarkup);item.tstid=sl.name;}item.config=sl;if(sl.name==="folder"){item.config.params={evt:17001,src:servletName+"."+mstrApp.pageName+".OMDCreateFolder.17001",targetName:"fb",iframe:true,target:"frameManager"};}}item.name=sl.name;}createMenu=menuConfig.newInstance({id:"mscld-create-menuList"});}createMenu.set("includeScroll",false);createMenu.open(opener);menu.createMenu=createMenu;createMenu.onClose=function(){opener.toggleButtonClass(false);};}function showCreateMenu(opener){var menu=this,data=menu.createMenuData;function loadDocumentData(menu){mstrmojo.xhr.request("POST",mstrConfig.taskURL,{success:function success(res){menu.createMenuData.dl=res.items;menu.createMenuData.loadData.dlLoaded=true;checkAllDataLoaded();}},{folderID:"FCA4BAFE4AF0D00088028989D7497A4F",taskId:"folderBrowse",styleName:menu.folderBrowsingStyle,includeObjectDesc:true,objectType:"55"});mstrmojo.xhr.request("POST",mstrConfig.taskURL,{success:function success(res){menu.createMenuData.docList=res.items;menu.createMenuData.loadData.dlLoaded=true;checkAllDataLoaded();}},{folderID:"6C87013036D94E65B9FD227CF919327E",taskId:"searchMetadata",styleName:menu.folderBrowsingStyle,recursive:1,includeAncestorInfo:false,includeObjectDesc:true,objectType:"14081"});}function loadReportData(menu){mstrmojo.xhr.request("POST",mstrConfig.taskURL,{success:function success(res){menu.createMenuData.rl=res.items;menu.createMenuData.loadData.rlLoaded=true;checkAllDataLoaded();}},{taskId:"folderBrowse",systemFolder:"16",styleName:menu.folderBrowsingStyle,includeObjectDesc:true,objectType:"55"});}function checkAllDataLoaded(){if(menu.createMenuData.sl&&checkDataLoaded(menu.createMenuData.loadData)){showCL.call(menu,opener);}}if(!data){menu.createMenuData={};mstrmojo.xhr.request("POST",mstrConfig.taskURL,{success:function(res){var i;menu.createMenuData.sl=res;menu.createMenuData.loadData={};for(i=0;i<res.sl.length;i++){var feature=res.sl[i]["feature-id"];switch(feature){case"create-view-reports":menu.createMenuData.loadData.rlLoaded=false;loadReportData(menu);break;case"template-documents;dhtml;documents-design-mode":menu.createMenuData.loadData.dlLoaded=false;loadDocumentData(menu);break;}}checkAllDataLoaded();}},{taskId:"getShortcutsList",pageName:"createOptions"});}else{checkAllDataLoaded();}function checkDataLoaded(data){if(!data){return true;}var dataLoaded=true;for(var k in data){dataLoaded=dataLoaded&&data[k];}return dataLoaded;}}mstrmojo.mstr.ui.CreateMenu=mstrmojo.declare(mstrmojo.Widget,[mstrmojo.mstr._ObjectActions],{scriptClass:"mstrmojo.mstr.ui.CreateMenu",hostCssClassName:"mstrmojo-create-menu-host",cssClassName:"mstr-create-menu",opener:null,folderBrowsingStyle:"MobileFolderStyle",onclick:function(name,event){if(name!=="myFile"){mstrmojo.dom.preventDefault(window,event);}switch(name){case"customGroup":this.openCustomGroupEditor({});break;case"metric":this.openMetricEditor({});break;case"queryBuilder":this.openDataImport({});break;case"filter":this.createFilter();break;case"scNewIVE":this.createDashboard();break;}},loadCreateMenu:function(){if(!this.opener){return ;}showCreateMenu.call(this,this.opener);}});}());