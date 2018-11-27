(function(){mstrmojo.requiresCls("mstrmojo.DI.DIConstants");var constants=mstrmojo.DI.DIConstants;mstrmojo.DI.model._ConnectLive=mstrmojo.provide("mstrmojo.DI.model._ConnectLive",{isDirectDataAccess:false,origIsDirectDataAccess:false,connectLiveSupport:constants.connectLiveSupport.connectLiveSupportUnknown,isSupportedDDASource:function isSupportedDDASource(type){var canSupport;switch(type){case constants.sourceSubtype.querybuilder:case constants.sourceSubtype.googleBigQuery:case constants.sourceSubtype.googleBigQueryFFSQL:case constants.sourceSubtype.googleBigQuerySingleTable:case constants.sourceSubtype.searchOnSource:case constants.sourceSubtype.hadoop:case constants.sourceSubtype.mdx:case constants.sourceSubtype.remoteProject:case constants.sourceSubtype.hanaSingleTable:canSupport=true;break;default:canSupport=false;break;}return canSupport;},isDDAOnlySource:function isSupportedDDASource(type){var shouldSupport;switch(type){case constants.sourceSubtype.searchOnSource:case constants.sourceSubtype.mdx:case constants.sourceSubtype.remoteProject:case constants.sourceSubtype.hanaSingleTable:shouldSupport=true;break;default:shouldSupport=false;break;}return shouldSupport;},canAddToDDACube:function canAddToDDACube(sourceSubtype,dbType){var canSupport,subtype=-1,databaseType=-1,table;if(!this.isDirectDataAccess){return true;}canSupport=this.isSupportedDDASource(sourceSubtype);var ids=this.getAllTableID();if(ids.length>0){table=this.importSources[ids[0]];subtype=table.subtype;databaseType=table.databaseType;if(sourceSubtype!==subtype){canSupport=false;}if(dbType&&dbType!==databaseType){canSupport=false;}}return canSupport;}});}());