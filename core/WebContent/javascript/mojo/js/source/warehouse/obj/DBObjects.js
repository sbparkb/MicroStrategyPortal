(function(){mstrmojo.requiresCls("mstrmojo.Obj");var $A=mstrmojo.array,$H=mstrmojo.hash,$WRAP=mstrmojo.func.wrapMethods;function filterSupportedDBs(DBs){var supportedDBs=[],displayOption=mstrApp.getRootController().model.dbObjectsDisplayOptions,connType=mstrApp.getRootController().model.dbObjectsConnectionType,$this=this,typeFilter=this.dbmsTypeFilter;$A.forEach(DBs,function(db){if((db.disp&displayOption)===displayOption&&(typeFilter.length===0||$A.indexOf(typeFilter,db.dbType)>-1)){if((db.connType&4)===4){supportedDBs.push(db);}else{if((db.connType&connType)===connType){supportedDBs.push(db);}}}});if(!$this.dbVersion2dbId){$this.dbVersion2dbId={};$A.forEach(supportedDBs,function(db){$A.forEach(db.dbVersions,function(version){$this.dbVersion2dbId[version.v]=db.id;});});}this.dsnMapDBs=DBs;this.supportedDBs=supportedDBs;}function filterCatalogSQLSupport(){var $this=this;$H.forEach($this.dbTypes,function(dbType){if(dbType.catSQL===1){$this.catalogDbTypes.push(dbType);}});}function processDSNs(dsns){dsns=dsns.sort(function(a,b){return a.n.toLowerCase().localeCompare(b.n.toLowerCase());});dsns.unshift({n:mstrmojo.desc(8526,"select a dsn"),nU:mstrmojo.desc(8526,"select a dsn").toUpperCase(),des:0});return dsns;}function processDrivers(drivers){drivers=drivers.sort(function(a,b){return a.n.toLowerCase().localeCompare(b.n.toLowerCase());});return drivers;}function cleanDriverNames(res){if(!(res.DBInfo&&res.DBInfo.Preferences)){return res;}var index,json=JSON.stringify(res),suffix,suffixes=res.DBInfo.Preferences.driverNameSuffix;if(mstrApp.isSingleTier){if(navigator.platform.indexOf("Win")===-1){index=$A.find(suffixes,"n","DesktopMac");}else{index=$A.find(suffixes,"n","DesktopWin");}}else{index=$A.find(suffixes,"n","Platform");}suffix=suffixes[index];return JSON.parse(json.replace(/!#DRIVERSUFFIX#!/g,suffix.value));}function loadAllDBObjects(callback){var $this=this;if($this.loaded){callback.success();}else{if(this.dbmsTypeFilter.length>0){this.dbmsTypeFilter.push(1100);}mstrApp.getRootController().model.submitRequest($WRAP({success:function(res){res=cleanDriverNames(res);var dbms=(res.DBMS.dbmss.dbms?[].concat(res.DBMS.dbmss.dbms):[]);$this.dbms=dbms;$this.dbms.sort(function(a,b){var verA=a.db_ver;var verB=b.db_ver;if(verA<verB){return 1;}if(verA>verB){return -1;}return 0;});$this.dsndbms=dbms.sort(function(a,b){return a.n.toLowerCase().localeCompare(b.n.toLowerCase());});filterSupportedDBs.call($this,res.DBInfo.DBS);$this.dbVersions=res.DBInfo.dbVersions;$this.dbTypes=res.DBInfo.dbTypes;filterCatalogSQLSupport.call($this);$this.dbIDs=res.DBInfo.dbIDs;$this.drivers=processDrivers(res.Drivers.Drivers);$this.preferences=res.DBInfo.Preferences;$this.dsns=processDSNs(res.DSNs.Dsns);$this.loaded=true;}},callback),{taskId:"arch.getDBObjects",skipSchemaIDCheck:true,showWait:true,typeFilter:this.dbmsTypeFilter,versionFilter:this.dbmsVersionFilter,typeExcludeFilter:$this.dbmsTypeExcludeFilter.join(","),versionExcludeFilter:$this.dbmsVersionExcludeFilter.join(","),flags:15});}}function getDBPropertiesFileInfo(flags,callback){var $this=this;mstrApp.getRootController().model.submitRequest($WRAP({success:function(res){res=cleanDriverNames(res);if(res.DBInfo){filterSupportedDBs.call($this,res.DBInfo.DBS);$this.dbVersions=res.DBInfo.dbVersions;$this.dbTypes=res.DBInfo.dbTypes;filterCatalogSQLSupport.call($this);$this.dbIDs=res.DBInfo.dbIDs;$this.preferences=res.DBInfo.Preferences;}if(res.Drivers){$this.drivers=processDrivers(res.Drivers.Drivers);}if(res.DSNs){$this.dsns=processDSNs(res.DSNs.Dsns);}}},callback),{taskId:"arch.getDBObjects",skipSchemaIDCheck:true,showWait:true,flags:flags});}mstrmojo.warehouse.obj.DBObjects=mstrmojo.declare(mstrmojo.Obj,null,{scriptClass:"mstrmojo.warehouse.obj.DBObjects",dbms:[],dsndbms:[],supportedDBs:[],dsnMapDBs:[],drivers:[],dsns:[],dbVersions:undefined,dbTypes:undefined,catalogDbTypes:[],dbIDs:undefined,preferences:undefined,dbmsTypeFilter:[],dbmsVersionFilter:[],dbmsTypeExcludeFilter:[],dbmsVersionExcludeFilter:[],DBInfo:undefined,DBS:undefined,DSNs:undefined,Dsns:undefined,Preferences:undefined,Drivers:undefined,DBMS:undefined,dbmss:undefined,disp:undefined,dbVersion2dbId:undefined,load:function load(dbmsTypeFilter,dbmsVersionFilter,callback){this.dbmsTypeFilter=dbmsTypeFilter;this.dbmsVersionFilter=dbmsVersionFilter;loadAllDBObjects.call(this,callback);},populateDBProperties:function populateDBProperties(callback){if(this.supportedDBs.length>0){callback.success();}else{getDBPropertiesFileInfo.call(this,8,callback);}},reloadDrivers:function reloadDrivers(callback){getDBPropertiesFileInfo.call(this,2,callback);},reloadDSNs:function reloadDSNs(callback){getDBPropertiesFileInfo.call(this,4,callback);},loaded:false});}());