(function(){mstrmojo.requiresCls("mstrmojo.func","mstrmojo.string","mstrmojo.Obj","mstrmojo.date","mstrmojo.hash","mstrmojo.array","mstrmojo.architect.menu.EnumMenuActions","mstrmojo.warehouse.EnumDatabaseType","mstrmojo.warehouse.EnumDataChangeEvents","mstrmojo.warehouse.EnumNamespaceMode","mstrmojo.warehouse.EnumObjectTypes","mstrmojo.warehouse.obj.DBObjects","mstrmojo.warehouse.obj.DBRole");mstrmojo.requiresDescs(12934,5160,11426,11427,11429,11430,11436,11437,11432,11434,12935,12936,11442,12942,10068,12943,12944,12945,12946);var $M=mstrmojo,$WRAP=$M.func.wrapMethods,$DT=$M.date,$H=$M.hash,$A=$M.array,$S=$M.string,$MNU_ACTIONS=$M.architect.menu.EnumMenuActions,$ENUM_DATA_CHANGE_EVENTS=mstrmojo.warehouse.EnumDataChangeEvents,DBTABLES_CHANGED=$ENUM_DATA_CHANGE_EVENTS.DBTABLES_CHANGED,DBTABLES_REQUESTED=$ENUM_DATA_CHANGE_EVENTS.DBTABLES_REQUESTED,DBRoleWithoutTableretrieval=3000,DBRole_TP_SAPHana=mstrmojo.warehouse.EnumDatabaseType.SAPHana,nsModeAll=mstrmojo.warehouse.EnumNamespaceMode.ALL,nsModeCurrent=mstrmojo.warehouse.EnumNamespaceMode.CURRENT,$ENUM_OT=$M.warehouse.EnumObjectTypes,ENUM_OT_ATTRIBUTE=$ENUM_OT.ATTRIBUTE,ENUM_OT_FACT=$ENUM_OT.FACT,ENUM_OT_TABLE=$ENUM_OT.TABLE,ENUM_OT_COLUMN=$ENUM_OT.COLUMN,ENUM_OT_FORM=$ENUM_OT.FORM,ENUM_OT_LAYER=$ENUM_OT.LAYER,ENUM_OT_DIMENSION=$ENUM_OT.DIMENSION,ENUM_OT_PROJECT=$ENUM_OT.PROJECT,ENUM_OT_TRANSFORMATION=$ENUM_OT.TRANSFORMATION,ENUM_OT_DBROLE=$ENUM_OT.DBROLE;var DssCatalogFlags={DssCatalogDefault:0,DssCatalogGetTables:1,DssCatalogGetColumns:2,DssCatalogGetTablePrimaryKeys:4,DssCatalogGetTableForeignKeys:8,DssCatalogGetTableKeys:12,DssCatalogGetTableSize:16,DssCatalogGetTableContent:32,DssCatalogGetColumnCardinality:64,DssCatalogGetColumnContent:128,DssCatalogGetFullCatalog:255,DssCatalogSelectedOnly:256,DssCatalogApplyConnectionMapping:512,DssCatalogAllNamespaces:1024,DssCatalogGetFresh:4096,DssCatalogIgnoreNamespace:8192,DssCatalogIgnoreCase:16384,DssCatalogIgnoreInvalidNames:32768,DssCatalogReuseMatching:65536,DssCatalogReuseCompatible:131072,DssCatalogReuseAny:262144,DssCatalogAugmentExisting:524288,DssCatalogSortDescending:1048576,DssCatalogSortTableNameFirst:2097152,DssCatalogGetNamespaces:16777216,DssCatalogCompareWithMetadata:134217728};var DSSCatalogStateFlags={DssCatalogStateDefault:0,DssCatalogStateSelected:1,DssCatalogStateFresh:2,DssCatalogStateMissing:4,DssCatalogStateUnexpected:8,DssCatalogStateCompatibleSmaller:16,DssCatalogStateCompatibleLarger:32,DssCatalogStateCompatible:64,DssCatalogStateIncompatible:128,DssCatalogStateCompatibilityMask:240,DssCatalogStateFreshTables:256,DssCatalogStateMissingTables:512,DssCatalogStateFreshColumns:1024,DssCatalogStateMissingColumns:2048,DssCatalogStatePartitionMappingTable:65536,DssCatalogStateDummyPartitionMappingTable:131072,DssCatalogStateDummyPartitionSliceTable:262144};function decodeHTMLString(input){return $S.decodeHtmlString(input).replace(/&apos;/g,"'");}function getTimestamp(){var d=new Date();return" - "+[("00"+d.getHours()).slice(-2),("00"+d.getMinutes()).slice(-2),("00"+d.getSeconds()).slice(-2)].join(":");}function getDateObject(modifiedtime){var SEP_SPACE=" ",SEP_DASH="-",SEP_COLUMN=":",value=modifiedtime.split(SEP_SPACE),dateValue=value[0].split(SEP_DASH),timeValue=value[1].split(SEP_COLUMN);return new Date(Date.UTC(dateValue[0],parseInt(dateValue[1],10)-1,dateValue[2],timeValue[0],timeValue[1],timeValue[2]));}function submitR(callback,params,fn){mstrApp.getRootController().getDataService()[fn||"submitRequest"](callback,params);}function submitRequest(callback,params,showWait){params.showWait=showWait;mstrApp.getRootController().getDataService().submitRequest(callback,params);}function processVLDB(vldbProps){var propSets={},properties=[];$A.forEach(vldbProps,function(vldbProp){propSets[vldbProp.propset]=vldbProp.propset;properties.push(vldbProp.propset+","+vldbProp.prop);});return $H.valarray(propSets).join(",,")+";"+properties.join(",,");}function getDatabaseId(dbRole){var dbId=dbRole.ab;if(dbId===0){dbId=this.dbObjects.dbVersion2dbId[dbRole.db_ver];}return dbId;}function checkFilter(value,filter,excludeFilter){var passed=true;$A.forEach(excludeFilter,function(v){if(v===value){passed=false;return false;}});if(!passed){return false;}if(!filter||!filter.length){return true;}passed=false;$A.forEach(filter,function(v){if(v===value){passed=true;return false;}});return passed;}mstrmojo.warehouse.WHModel=mstrmojo.declare(mstrmojo.Obj,null,{scriptClass:"mstrmojo.warehouse.WHModel",schemaInstanceID:"",dbtbls:{},dbtables:[],cachedStamp:{},dbrs:[],dbObjects:undefined,namespaces:[],catalogStamp:"",SelDBRoleID:null,SelNameSpaceID:null,catalogRefresh:false,privileges:{},dbRolesTypeFilter:[],dbRolesVersionFilter:[],dbmsTypeFilter:[],dbmsVersionFilter:[],dbRolesTypeExcludeFilter:[],dbRolesVersionExcludeFilter:[],dbmsTypeExcludeFilter:[],dbmsVersionExcludeFilter:[],dbObjectsDisplayOptions:1,dbObjectsConnectionType:1,showAddDriver:false,usingCookieNamespace:false,currentDBRole:undefined,allDBRoleNames:undefined,cas:undefined,tis:undefined,xrc:undefined,vldbProperties:undefined,propset:undefined,ns:undefined,did:undefined,clis:undefined,cln:undefined,dbRoleEditorCfg:{},databaseType:undefined,isDataImport:undefined,postCreate:function postCreate(){var $this=this;this.dbObjects=new mstrmojo.warehouse.obj.DBObjects();if(mstrApp.isSingleTier){if(navigator.platform.indexOf("Win")===-1){this.dbObjectsConnectionType=2;this.showAddDriver=true;}return ;}submitRequest({success:function(res){$this.privileges=res.privileges;}},{taskId:"arch.checkPrivileges",skipSchemaIDCheck:true},true);},loadDBTypeFilters:function loadDBTypeFilters(callback){var $this=this;$this.dbObjects.populateDBProperties($WRAP({success:function success(){var filterTypes=[],disp=$this.dbObjectsDisplayOptions;$H.forEach($this.dbObjects.dbTypes,function(dbType){if((dbType.disp&disp)===disp){filterTypes.push(dbType.v);}});$this.dbmsTypeFilter=filterTypes;$this.dbRolesTypeFilter=filterTypes.slice(0);}},callback));},loadDBRoles:function loadDBRoles(callback,refresh){var $this=this,xdaType;$this.raiseEvent({name:$ENUM_DATA_CHANGE_EVENTS.DBROLES_REQUESTED});var params={taskId:"arch.search",objecttypes:ENUM_OT_DBROLE,skipSchemaIDCheck:true,flags:1+2+256+512+8192+16384,domain:4,specialparse:"getDBRoles",xmlflags:1,typeFilter:$this.dbRolesTypeFilter.join(","),versionFilter:$this.dbRolesVersionFilter.join(","),typeExcludeFilter:$this.dbRolesTypeExcludeFilter.join(","),versionExcludeFilter:$this.dbRolesVersionExcludeFilter.join(",")};var newCallback=$WRAP({success:function success(res,needFilter){var dbRoleItems=[],currentItem=$this.currentDBRole,dbroleIndex=0,filterSpecific=($this.dbIds&&$this.dbIds.length===1),dbId;$A.forEach(res.dbRoles,function(dbRole,i){if(needFilter){if(!checkFilter(dbRole.db_type,$this.dbRolesTypeFilter,$this.dbRolesTypeExcludeFilter)||!checkFilter(dbRole.db_ver,$this.dbRolesVersionFilter,$this.dbRolesVersionExcludeFilter)){return ;}}if(filterSpecific){dbId=getDatabaseId.call($this,dbRole);if(dbRole.ab===0&&(dbId===9||dbId===125)&&($this.dbIds[0]===9||$this.dbIds[0]===125)){dbRoleItems.push(new mstrmojo.warehouse.obj.DBRole({mdDBRole:dbRole,mdl:$this}));}else{if($this.dbIds[0]===dbId||dbRole.db_ver===-1){dbRoleItems.push(new mstrmojo.warehouse.obj.DBRole({mdDBRole:dbRole,mdl:$this}));}else{if($this.dbObjectsDisplayOptions===1&&dbRole.ab===0&&dbId===undefined){dbRoleItems.push(new mstrmojo.warehouse.obj.DBRole({mdDBRole:dbRole,mdl:$this}));}else{if($this.dbObjectsDisplayOptions===16&&dbRole.ab===0){dbRoleItems.push(new mstrmojo.warehouse.obj.DBRole({mdDBRole:dbRole,mdl:$this}));}}}}}else{dbRoleItems.push(new mstrmojo.warehouse.obj.DBRole({mdDBRole:dbRole,mdl:$this}));}if(currentItem&&dbRole.did===currentItem.did){dbroleIndex=i;}});$this.currentDBRole=undefined;$this.set("dbrs",dbRoleItems);$this.raiseEvent({name:$ENUM_DATA_CHANGE_EVENTS.DBROLES_LOADED,items:dbRoleItems,offset:dbroleIndex});$this.allDBRoleNames={};$A.forEach(res.allNames||[],function(dbr){$this.allDBRoleNames[dbr.did]=dbr;});}},callback);if($this.isDataImport!==undefined){params.isDataImport=$this.isDataImport;}if(!mstrApp.isSingleTier&&mstrApp.placeholder==="QBApp"&&!refresh&&$this.isDataImport){xdaType=mstrApp.type;var APP_TYPE=mstrmojo.qb.EnumQBAppType;if((xdaType===APP_TYPE.QueryBuilder||xdaType===APP_TYPE.FFSQL||xdaType===APP_TYPE.EmmaSingleTable)&&$this.dbObjectsDisplayOptions!==16&&$this.dbObjectsDisplayOptions!==4){if(mstrApp.dbRoles){newCallback.success(mstrApp.dbRoles,true);}else{mstrApp.serverRequestParallel(params,newCallback,true);}return ;}}if(!mstrApp.isSingleTier&&refresh&&mstrApp.dbRoles){mstrApp.dbRoles=undefined;if(mstrApp.container&&mstrApp.container.launchingApp){mstrApp.container.launchingApp.dbRoles=undefined;}}submitR(newCallback,params,"search");},loadDBObjects:function loadDBObjects(callback){this.dbObjects.load(this.dbmsTypeFilter,this.dbmsVersionFilter,callback);},_set_SelDBRoleID:function _set_SelDBRoleID(n,dbRoleID){var model=this,dbr=this.getDBRole(dbRoleID);model.SelDBRoleID=dbRoleID;model.SelNameSpaceID=undefined;if(dbr&&dbr.mdDBRole){model.getNameSpaces({sourceInfo:"tablesPanel"});}else{if(!dbRoleID){model.raiseEvent({name:DBTABLES_CHANGED,items:[],selectedItems:[],sourceInfo:""});model.raiseEvent({name:$ENUM_DATA_CHANGE_EVENTS.NAMESPACES_CHANGED,namespaces:[],namespaceMode:nsModeCurrent,dbRoleID:dbRoleID,error:true});}}model.raiseEvent({name:$ENUM_DATA_CHANGE_EVENTS.DBROLE_SELECTION,value:model.SelDBRoleID});},onSelNameSpaceIDChange:function onSelNameSpaceIDChange(evt){this.SelNameSpaceID=evt.value;this.getSelectedDBRoleTables({blockBegin:0,blockCount:1000,filterText:""},{failure:function failure(res){if(res){$M.alert(res.getResponseHeader("X-MSTR-TaskFailureMsg"));}}});var wls=window.localStorage;if(wls){wls.setItem(this.SelDBRoleID,this.SelNameSpaceID);}},getDBRole:function getDBRole(dbrid){var GUIDNULL="00000000000000000000000000000000";var index=$A.find(this.dbrs,"did",(dbrid===GUIDNULL)?this.projPrimaryDBRoleID:dbrid);if(index>=0){return this.dbrs[index];}return null;},getNameSpaces:function getNameSpaces(params){var $this=this,dbRoleID=params.dbRoleID||$this.SelDBRoleID,flags=DssCatalogFlags.DssCatalogGetNamespaces|DssCatalogFlags.DssCatalogApplyConnectionMapping,dbr=this.getDBRole(dbRoleID),isHanaDBRole=false,isXquery=false,dbType=dbr&&dbr.mdDBRole&&dbr.mdDBRole.db_type,callback;switch(dbType){case 4000:isHanaDBRole=true;break;case 3000:isXquery=true;break;default:break;}if(params.getFresh){flags=(flags|DssCatalogFlags.DssCatalogGetFresh);}$this.raiseEvent({name:DBTABLES_CHANGED,items:[],selectedItems:[],sourceInfo:params.sourceInfo||""});callback={success:function(res){$this.namespaces=res.ns;$this.raiseEvent({name:$ENUM_DATA_CHANGE_EVENTS.NAMESPACES_CHANGED,namespaces:isHanaDBRole?[]:$this.namespaces,namespaceMode:nsModeAll,dbRoleID:dbRoleID,namespace:$this.SelNameSpaceID,sourceInfo:params.sourceInfo||""});},failure:function(res){$this.raiseEvent({name:$ENUM_DATA_CHANGE_EVENTS.NAMESPACES_CHANGED,namespaces:[],namespaceMode:nsModeCurrent,dbRoleID:dbRoleID,sourceInfo:params.sourceInfo||"",error:true});if(res){$M.alert(res.getResponseHeader("X-MSTR-TaskFailureMsg"));}}};if(isXquery){callback.success({ns:[]});return ;}if(!isHanaDBRole){$this.raiseEvent({name:$ENUM_DATA_CHANGE_EVENTS.NAMESPACES_REQUESTED,sourceInfo:params.sourceInfo||""});}submitRequest(callback,{taskId:"arch.catalogAction",dbrid:dbRoleID,flags:flags},false);},getSelectedDBRoleTables:function getSelectedDBRoleTables(params,callback){var model=this,getFresh=params.getFresh||false,dbRoleID=params.dbRoleID||model.SelDBRoleID||model.projPrimaryDBRoleID,cachedStamp=model.cachedStamp,dbts=model.dbtbls,filterText=params.filterText.toString(),dbRole=model.getDBRole(dbRoleID);if(getFresh){model.catalogRefresh=true;}if(!dbRole||dbRole.mdDBRole.db_type===DBRoleWithoutTableretrieval){model.raiseEvent({name:DBTABLES_CHANGED,items:[],selectedItems:[],sourceInfo:params.sourceInfo||""});return ;}var namespaces=(dbts[dbRoleID]=dbts[dbRoleID]||{}),cachedStampPerDBRole=(cachedStamp[dbRoleID]=cachedStamp[dbRoleID]||{}),currentNamespace=$S.decodeHtmlString(params.nameSpace||model.SelNameSpaceID||""),isPopulated=false,filteredArray=[],fullTableList=[],item,cachedDBTables=namespaces[currentNamespace],isSapHana=(dbRole.mdDBRole.db_type===DBRole_TP_SAPHana);if(!model.catalogRefresh&&namespaces&&(cachedDBTables!==undefined)){$H.forEach(cachedDBTables,function(table,tablename){isPopulated=true;item=new mstrmojo.warehouse.obj.TableData({id:tablename,n:tablename,tp:ENUM_OT_TABLE,model:model,ns:table.ns,did:tablename,sta:parseInt(table.sta,10),items:[],dbtn:table.tbn});if(isSapHana){item.extt=table.extt;item.hanai=table.hanai;}if(filterText!==""&&tablename.toUpperCase().indexOf(filterText.toUpperCase())>-1){filteredArray.push(item);}fullTableList.push(item);});if(isPopulated){model.set("catalogStamp",cachedStampPerDBRole[currentNamespace]);model.raiseEvent({name:DBTABLES_CHANGED,items:(filterText!=="")?filteredArray:fullTableList,selectedItems:model.getDBRoleTablesInUse(dbRoleID)||[],sourceInfo:params.sourceInfo||""});if(callback&&callback.success){callback.success({items:(filterText!=="")?filteredArray:fullTableList});}return ;}}cachedDBTables=(namespaces[currentNamespace]={});cachedStampPerDBRole[currentNamespace]=null;var flags=DssCatalogFlags.DssCatalogGetTables|DssCatalogFlags.DssCatalogApplyConnectionMapping;flags=model.catalogRefresh?(flags|DssCatalogFlags.DssCatalogGetFresh):flags;model.raiseEvent({name:DBTABLES_REQUESTED,sourceInfo:params.sourceInfo||""});submitRequest($WRAP({success:function(res){var cas=res.xrc.cas[0],timestamp=cas.timestamp,dbtables=cas.tis,name,namespace;if(timestamp){var di=$DT.getDateJson(getDateObject(timestamp.replace(/&apos;/,"")));timestamp=[$DT.formatDateInfo(di,"yyyy-MM-dd")," ",$DT.formatTimeInfo(di,"hh:mm a")].join("");}cachedStampPerDBRole[currentNamespace]=timestamp;model.set("catalogStamp",timestamp);model.catalogRefresh=false;$A.forEach(dbtables,function(dbtable){name=dbtable.tbn=decodeHTMLString(dbtable.tbn);namespace=dbtable.ns=decodeHTMLString(dbtable.ns);if(!cachedDBTables[name]){cachedDBTables[name]=dbtable;namespaces[namespace]=namespaces[namespace]||{};namespaces[namespace][name]=dbtable;}});$H.forEach(cachedDBTables,function(dbtable,name){item=new mstrmojo.warehouse.obj.TableData({id:name,n:name,tp:ENUM_OT_TABLE,model:model,ns:dbtable.ns,did:name,sta:parseInt(dbtable.sta,10),items:[],dbtn:dbtable.tbn});if(isSapHana){item.extt=dbtable.extt;item.hanai=dbtable.hanai;}fullTableList.push(item);});model.raiseEvent({name:DBTABLES_CHANGED,items:fullTableList,selectedItems:model.getDBRoleTablesInUse(dbRoleID)||[],sourceInfo:params.sourceInfo||""});},failure:function(){model.raiseEvent({name:DBTABLES_CHANGED,items:fullTableList,selectedItems:model.getDBRoleTablesInUse(dbRoleID)||[],sourceInfo:params.sourceInfo||""});}},callback),{taskId:"arch.catalogAction",dbrid:dbRoleID,flags:flags,ns:currentNamespace},false);},getDBRoleTablesAndColumns:function getDBRoleTablesAndColumns(params,callback){var model=this;if(!params.dbRoleID){return ;}submitRequest($WRAP({success:function(res){var cas=res.xrc.cas[0],dbtables=cas.tis,tableList=[],columnList={},name,namespace;$A.forEach(dbtables,function(dbtable){namespace=decodeHTMLString(dbtable.ns);name=decodeHTMLString(dbtable.tbn);tableList.push({n:(namespace?namespace+"."+name:name),tp:ENUM_OT_TABLE});$A.forEach(dbtable.clis,function(dbCol){columnList[dbCol.cln]={n:dbCol.cln,tp:ENUM_OT_COLUMN};});});res.tables=tableList;res.columns=$H.valarray(columnList);}},callback),{taskId:"arch.catalogAction",dbrid:params.dbRoleID,flags:DssCatalogFlags.DssCatalogGetTables+DssCatalogFlags.DssCatalogGetColumns,ns:$S.decodeHtmlString(model.SelNameSpaceID||"")},true);},getDBRoleTablesInUse:mstrmojo.emptyFn,getColumnsForDBTable:function getColumnsForDBTable(params,callbacks){var model=this,dbRoleID=params.data.dbrole||model.SelDBRoleID,data=params.data,getFresh=params.getFresh||false,dbTableName=data.n,namespace=data.ns,dbtableId=data.tableId,columns,flags=DssCatalogFlags.DssCatalogGetColumns+DssCatalogFlags.DssCatalogApplyConnectionMapping+DssCatalogFlags.DssCatalogIgnoreCase+(params.compareWithMD?DssCatalogFlags.DssCatalogCompareWithMetadata:0),table;if(dbRoleID){if(!getFresh){if(namespace){table=model.dbtbls[dbRoleID][namespace][dbTableName];columns=table.columns;}else{table=model.dbtbls[dbRoleID][dbTableName];if(table){columns=table.columns;}}if(columns){callbacks.success({src:params,items:columns,selDBRole:dbRoleID,hanaInfo:table.hanaInfo});if(callbacks&&callbacks.complete){callbacks.complete();}return ;}}flags=getFresh?(flags|DssCatalogFlags.DssCatalogGetFresh):flags;submitRequest($WRAP({success:function success(res){var tableInfo=res.xrc.cas[0].tis[0],result=[],hanaInfo=tableInfo.hanai;columns=tableInfo.clis;$A.forEach(columns,function(colInfo){result.push(new mstrmojo.architect.obj.Column({dbInfo:colInfo}));});table=model.dbtbls[dbRoleID][namespace][dbTableName];if(result.length>0){table.columns=result;}table.hanaInfo=mstrmojo.hash.clone(hanaInfo);res.items=result;res.hanaInfo=table.hanaInfo;}},callbacks),{taskId:"arch.catalogAction",dbrid:dbRoleID,schemaid:model.schemaInstanceID,ns:namespace,dbts:JSON.stringify([{tbn:data.dbtn,ns:namespace,tbid:dbtableId}]),flags:flags},true);}},saveDBRole:function saveDBRole(dbRole,isNew,callback){var $this=this;submitRequest($WRAP({success:function success(res){if(!isNew){var dbr=$this.getDBRole(res.dbr.did);dbr.populated=false;dbr.populate(function success(){$this.raiseEvent({name:isNew?$ENUM_DATA_CHANGE_EVENTS.DBROLES_ADD:$ENUM_DATA_CHANGE_EVENTS.DBROLES_RENAME,item:dbr});});}else{$this.currentDBRole=res.dbr;$this.loadDBRoles(undefined,true);}}},callback),{skipSchemaIDCheck:true,taskId:"arch.saveDBRole",dbroleinfo:JSON.stringify(dbRole),showWait:true},true);},deleteDBRole:function deleteDBRole(dbRoleID,callback){var $this=this;submitRequest($WRAP(callback,{success:function success(){var idx=$A.find($this.dbrs,"did",dbRoleID);if(idx>-1){$this.dbrs.splice(idx,1);}delete $this.allDBRoleNames[dbRoleID];if($this.SelDBRoleID===dbRoleID){$this.set("SelDBRoleID",$this.projPrimaryDBRoleID);}$this.raiseEvent({name:$ENUM_DATA_CHANGE_EVENTS.DBROLES_DELETE,item:{did:dbRoleID}});}}),{taskId:"arch.deleteObject",schemaid:$this.schemaInstanceID,objectid:dbRoleID,objecttype:29,showWait:true},true);},populateDBRole:function populateDBRole(dbRoleID,callback){submitRequest(callback,{isDataImport:false,reverseOrder:true,verbose:true,taskId:"getDBInstances",vldbProperties:processVLDB(this.dbObjects.preferences.vldbProperties),objectID:dbRoleID,skipSchemaIDCheck:true,showWait:false},false);},handleEnabledAction:function handleEnabledAction(){return true;},handleVisibleAction:function handleVisibleAction(data,item){if(!item){return true;}switch(item.action){case $MNU_ACTIONS.SET_AS_PRIMARY:return mstrApp.isArchitect&&!data.isPrimary;case $MNU_ACTIONS.IS_PRIMARY:return mstrApp.isArchitect&&data.isPrimary;case $MNU_ACTIONS.UPSTRUCT:return true;case $MNU_ACTIONS.CATALOG_SQL:var dbRole=this.getDBRole(data.did);return(mstrApp.getRootController().canDisplayCatalogSQL(this.dbObjects.dbTypes,dbRole.mdDBRole.db_type));}return true;},handleCheckAction:function handleCheckAction(data,item){switch(item.action){case $MNU_ACTIONS.IS_PRIMARY:return data.isPrimary;}return false;},findNameInHash:function findNameInHash(collection,newName){var found=false,name="";$H.forEach(collection,function(obj){name=obj.name||obj.n;if(name.toString().toUpperCase()===newName){found=true;return false;}return true;});return found;},validateName:function validateName(type,newName,oldName,list){var model=this,zIndex=10000,collection={},STR_EMPTY_NAME,STR_NAME_USED,STR_NAME_TOO_LONG=$M.desc(12934,"Object names need to be less than 250 characters"),STR_NAME_INVALID_CHAR=$M.desc(5160,'An object name cannot contain the following characters " \\ [ ]');switch(type){case ENUM_OT_ATTRIBUTE:case ENUM_OT_FORM:collection=model.getAttributes();STR_EMPTY_NAME=$M.desc(11426,"The attribute name cannot be empty.");STR_NAME_USED=$M.desc(11427,"The name is currently in use by another attribute.");break;case ENUM_OT_FACT:collection=model.getFacts();STR_EMPTY_NAME=$M.desc(11429,"The fact name cannot be empty.");STR_NAME_USED=$M.desc(11430,"The name is currently in use by another fact.");break;case ENUM_OT_TABLE:collection=model.tables;STR_EMPTY_NAME=$M.desc(11436,"The table name cannot be empty.");STR_NAME_USED=$M.desc(11437,"The name is currently in use by another table.");break;case ENUM_OT_LAYER:collection=model.layers;STR_EMPTY_NAME=$M.desc(11432,"The layer name cannot be empty.");STR_NAME_USED=$M.desc(11434,"The name is currently in use by another layer.");break;case ENUM_OT_DIMENSION:collection=model.userHierarchies;STR_EMPTY_NAME=$M.desc(12935,"The hierarchy name cannot be empty.");STR_NAME_USED=$M.desc(12936,"The name is currently in use by another hierarchy.");break;case ENUM_OT_PROJECT:collection=list;STR_EMPTY_NAME=$M.desc(11442,"The project name cannot be empty.");STR_NAME_USED=$M.desc(12942,"The project name already exists.");break;case ENUM_OT_DBROLE:collection=model.allDBRoleNames;$A.forEach(model.dbrs,function(dbr){collection[dbr.did]=dbr;});STR_EMPTY_NAME=$M.desc(10068,"The Database Connection name can't be empty");STR_NAME_USED=$M.desc(12943,"The database connection name already exists.");break;case ENUM_OT_TRANSFORMATION:collection=model.transformations;STR_EMPTY_NAME=$M.desc(12944,"The transformation name cannot be empty.");STR_NAME_USED=$M.desc(12945,"The transformation name already exists.");break;default:$M.alert($M.desc(12946,"object type cannot be validated, it's not defined yet"),undefined,undefined,zIndex);return false;}if(newName===""){$M.alert(STR_EMPTY_NAME,undefined,undefined,zIndex);return false;}if(oldName){if(oldName.toString().toUpperCase()===newName.toString().toUpperCase()){return true;}}if(newName.length>250){$M.alert(STR_NAME_TOO_LONG,undefined,undefined,zIndex);return false;}var invalidNameReg=/[\[\]\\"]/;if(invalidNameReg.test(newName)){$M.alert(STR_NAME_INVALID_CHAR,undefined,undefined,zIndex);return false;}if(this.findNameInHash(collection,newName.toUpperCase())){$M.alert(STR_NAME_USED,undefined,undefined,zIndex);return false;}return true;},findinArray:function findinArray(arr,n,v){var upper=v.toUpperCase(),len=(arr&&arr.length)||0,i,obj;for(i=0;i<len;i++){obj=arr[i];if(obj&&obj[n].toUpperCase()===upper){return i;}}return -1;},findNextName:function findNextName(originalName,list,prop){originalName+=(getTimestamp());var count=1,name=originalName,upperName=name.toUpperCase();do{if(this.findinArray(list,prop,upperName)>=0){name=originalName+" "+count++;upperName=name.toUpperCase();}else{return name;}}while(count<100);return"Temp Object";}});var $WHMODEL=mstrmojo.warehouse.WHModel;$WHMODEL.DssCatalogFlags=DssCatalogFlags;$WHMODEL.DSSCatalogStateFlags=DSSCatalogStateFlags;}());