(function(){mstrmojo.requiresCls("mstrmojo.func");var rwResultCache={};mstrmojo.CMS.CMSDataService=mstrmojo.provide("mstrmojo.CMS.CMSDataService",{getRWResult:function(params,callbacks){var docId=params.docId,cache=rwResultCache[docId];if(cache){callbacks.success(cache);return ;}else{callbacks.success=mstrmojo.func.composite([callbacks.success,function(res){rwResultCache[docId]=res;}]);}var taskParams={taskId:"RWExecute",objectID:docId,currentViewMedia:1,visMode:0,styleName:"RWDocumentMojoStyle",useTerseElementId:1,maxWait:-1};mstrmojo.xhr.request("POST",mstrmojo.App.taskURL,callbacks,taskParams);}});})();