(function(){mstrmojo.requiresCls("mstrmojo.qb.QBApp","mstrmojo.Container","mstrmojo.hash");mstrmojo.qb.QBContainer=mstrmojo.declare(mstrmojo.Container,null,{scriptClass:"mstrmojo.qb.QBContainer",markupString:'<div id="QBContainer"><div id="QBApp"></div></div>',launchingApp:null,init:function init(props){if(this._super){this._super(props);}this.QBParams={placeholder:"QBApp",Privs:'<uaps><pris pgd="67070C7C481676FC38A28595E71ED85D"><pri>-1</pri><pri>-1</pri><pri>-1</pri><pri>-1</pri><pri>-1</pri><pri>-1</pri><pri>-1</pri><pri>-2130706433</pri></pris></uaps>',msgID:"",type:"368",reportID:"",folderID:"",docID:"",isFFSQL:"",isCloud:false,saveAsCube:"",analysisID:"",isNewAnalysis:"",isEMMACube:true,FlashResBundleURL:"../resBundles/DashboardViewerBundle_1033.xml",name:"mstrWeb",pageName:"qbuilder",helpUrl:"",helpTopics:{mainDB:"database_import_page.htm",mainSQL:"freeform_import_page.htm",tableJoin:"join_options_dialog_box.htm",filterValue:"Enter_Value_dialog_box.htm",expression:"expression_dialog_box.htm",condition:"new_condition_dialog_box.htm"},localeId:mstrApp.localeId,displayLocaleId:"1033",jsRoot:"../javascript/",jsMojoRoot:"../javascript/mojo/js/source/",persistTaskParams:{},getPersistParams:function(){return this.persistTaskParams;},isOIVM:function(){return true;},isTouchApp:function(){return false;}};},loadQB:function loadQB(){var qbParams=this.QBParams;if(qbParams.shouldSupportDDA&&!qbParams.canSupportDDA){return ;}this.launchingApp=mstrApp;window.mstrApp=new mstrmojo.qb.QBApp();mstrmojo.hash.copy(qbParams,mstrApp);mstrApp.sessionState=this.launchingApp.sessionState;mstrApp.msgID=mstrApp.messageID;mstrApp.docID=mstrApp.messageID;mstrApp.isSingleTier=this.launchingApp.isSingleTier;mstrApp.serverProxy=this.launchingApp.serverProxy;delete mstrApp.messageID;mstrApp.container=this;qbParams.dbTypes=this.launchingApp.dbTypes;qbParams.dbObjects=this.launchingApp.supportDBObjects;qbParams.dbIds=this.launchingApp.dbIds;qbParams.dbVersions=this.launchingApp.dbVersions;if(this.launchingApp.dbObjectsDisplayOptions){qbParams.dbObjectsDisplayOptions=this.launchingApp.dbObjectsDisplayOptions;if(this.launchingApp.dbObjectsDisplayOptions===16){qbParams.dbRolesVersionExcludeFilter=this.launchingApp.dbRolesVersionExcludeFilter;}}qbParams.hasNonRADataset=this.launchingApp.diParams&&this.launchingApp.diParams.hasNonRADataset;delete this.launchingApp.dbTypes;delete this.launchingApp.supportDBObjects;delete this.launchingApp.dbIds;delete this.launchingApp.dbVersions;delete this.launchingApp.dbObjectsDisplayOptions;this.domNode.style.display="block";mstrApp.sessionManager=this.launchingApp.sessionManager;mstrApp.enableAutomaticSessionRecovery=this.launchingApp.enableAutomaticSessionRecovery;mstrApp.maxSessionIdleTime=this.launchingApp.maxSessionIdleTime;mstrApp.timeBeforeSessionTimeoutWarning=this.launchingApp.timeBeforeSessionTimeoutWarning;mstrApp.enableWarningSessionTimeout=this.launchingApp.enableWarningSessionTimeout;mstrApp.projectName=this.launchingApp.projectName;mstrApp.serverName=this.launchingApp.serverName;mstrApp.serverPort=this.launchingApp.serverPort;mstrApp.authMode=this.launchingApp.authMode;mstrApp.name=this.launchingApp.name;mstrApp.persistTaskParams=this.launchingApp.persistTaskParams;mstrApp.helpUrl=this.launchingApp.helpUrl;mstrApp.userHelpPage=this.launchingApp.userHelpPage;mstrApp.autocomplete=this.launchingApp.autocomplete;if(this.launchingApp.cubeSaveFolderId){mstrApp.cubeSaveFolderId=this.launchingApp.cubeSaveFolderId;}mstrApp.dbRoles=this.launchingApp.dbRoles;mstrApp.start(mstrApp.type,qbParams);},unloadQB:function unloadQB(){var controller=mstrApp.getRootController();var rootView=controller.rootView;var model=controller.model;if(model){model.destroy();}if(rootView){rootView.destroy();}controller.destroy();var qbApp=window.mstrApp;window.mstrApp=this.launchingApp;mstrApp.size=qbApp.size;qbApp.destroy();this.domNode.style.display="none";this.destroy();}});}());