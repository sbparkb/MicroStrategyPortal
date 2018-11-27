(function(){mstrmojo.requiresCls("mstrmojo.Obj","mstrmojo.DI.DIModel","mstrmojo.DI.DIConstants");mstrmojo.requiresDescs(12792,12804);var $ARR=mstrmojo.array,$HASH=mstrmojo.hash,constants=mstrmojo.DI.DIConstants,actions=mstrmojo.DI.DIConstants.actions;function extractFormsForLinkedAttr(attr1,attr2){var res=attr2;if(attr1.isMultiForm){if(!attr2.isMultiForm){res=attr1;}else{var subCols1=attr1.subColumns,subCols2=attr2.subColumns.concat();$ARR.forEach(subCols1,function(searchedCol){var idx=$ARR.find(subCols2,"afid",searchedCol.afid);if(idx<0){subCols2.push(searchedCol);}});res=$HASH.copy(attr2);res.subColumns=subCols2;}}if(!res.linkedTbs){res.linkedTbs={};res.linkedTbs[attr2.tableId]=true;res.linkedTbs[attr1.tableId]=true;}else{res.linkedTbs[attr1.tableId]=true;}return res;}function getChangedDistKey(cubeConfig){var initSet=cubeConfig.initialSet.distInfo,newSet=cubeConfig.distInfo;if(initSet.keyId===newSet.keyId&&initSet.pf===newSet.pf){return null;}else{return newSet;}}function getChangedSearchIdx(cubeConfig){var initSet=cubeConfig.initialSet.sidxes,newSet=cubeConfig.sidxes,idxMap={},isChanged=false;if(newSet.length<initSet.length){isChanged=true;}else{$ARR.forEach(initSet,function add2Set(index){idxMap[index.atid+index.afid]=true;});$ARR.forEach(newSet,function add2Set(index){if(idxMap[index.atid+index.afid]!==true){isChanged=true;return false;}});}return isChanged?newSet:null;}mstrmojo.DI.controller.DIAllObjectsViewController=mstrmojo.declare(mstrmojo.Obj,null,{scriptClass:"mstrmojo.DI.controller.DIAllObjectsViewController",controller:null,init:function init(props){this._super(props);this.controller=mstrApp.getRootController();},getAllMappings:function(){var i,j,source,map,maps;var allMaps=[],importSources=this.controller.model.importSources;for(i in importSources){source=importSources[i];if(source.currentTransformations&&source.currentTransformations.xtab&&source.currentTransformations.xtab.isCrosstab){maps=source.transformedMapping;}else{maps=source.currentMapping;}if(maps){for(j=0;maps&&j<maps.length;j++){map=maps[j];var index=mstrmojo.array.find(allMaps,"id",map.id);if(index<0){allMaps.push(mstrmojo.hash.copy(map));}else{allMaps[index]=extractFormsForLinkedAttr(map,allMaps[index]);}}}}return allMaps;},getAllImportSources:function(){return this.controller.model.importSources;},getCubeConfig:function getCubeConfig(){var controller=this.controller;var m=controller.model;var params={browsetype:constants.browseFlag.cubeConfig,previewflag:constants.requestFlag.mapping};var callback={success:function(res){m.populateCubeConfig(res);},failure:function(res){controller.displayError(mstrmojo.desc(12792,"Cannot retrieve cube config info.")+res);}};controller.dataService.getImportedData(callback,params);},isCubeConfigEnabled:function isCubeConfigEnabled(){var model=this.controller.model;if(mstrApp.isSingleTier){return false;}else{if(model.isDirectDataAccess&&model.weakDDA!==true){return false;}else{return true;}}},persistCubeConfig:function persistCubeConfig(cubeConfig){var controller=this.controller,changedDistKey=getChangedDistKey(cubeConfig),changedSearchIdx=getChangedSearchIdx(cubeConfig),statid=[],stafid=[],params={};if(!changedDistKey&&!changedSearchIdx){return ;}if(changedSearchIdx){$ARR.forEach(changedSearchIdx,function(item){statid.push(item.atid);stafid.push(item.afid);});params.statid=statid.join();params.stafid=stafid.join();params.stic=true;}if(changedDistKey){params.keyid=changedDistKey.keyId;params.n=changedDistKey.pf;}var cb={success:function(){delete cubeConfig.initialSet;cubeConfig.initialSet=$HASH.clone(cubeConfig);controller.model.set("isDirectDataAccess",false);var flags=constants.requestFlag.mapping|constants.requestFlag.sourceInfo|constants.requestFlag.relationship;controller.getImportedDataEMMA(actions.none,flags);},failure:function(res){var errMsg=mstrmojo.desc(12804,"Persist cube configurations failed:");controller.displayError(errMsg,false,res.message);}};controller.dataService.persistCubeConfigInfo(cb,params);},showAllObjects:function showAllObjects(){var controller=this.controller;controller.model.attachEventListener("CubeConfigFetched",this.id,function(){controller.showDialog(constants.dialogType.allObjectsViewDialog,null);});this.getCubeConfig();}});}());