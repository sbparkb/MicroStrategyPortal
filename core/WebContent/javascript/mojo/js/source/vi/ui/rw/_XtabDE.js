(function(){mstrmojo.requiresCls("mstrmojo.hash","mstrmojo.array","mstrmojo.DocDataService");mstrmojo.requiresDescs(5421,5422);var $HASH=mstrmojo.hash,$ARR=mstrmojo.array,$DESC=mstrmojo.desc,$DDS=mstrmojo.DocDataService,$STR=mstrmojo.string;function createDEParam(w,cell,isEdit,funcVal){var selCells=w.selCells,elemsStr=[],titleInfo=w.model.getCellTitleInfo(cell).title,dpt,order,processCell=function(cell){var cInfo=w.getCellForNode(cell);elemsStr.push(w.getCellUnitIndex(cInfo));dpt=cInfo.dpt;},switchFlag;if(typeof funcVal==="string"&&funcVal.indexOf(";")>0){order=parseInt(funcVal.substring(funcVal.indexOf(";")+1),10);funcVal=parseInt(funcVal.substring(0,funcVal.indexOf(";")),10);}if(order===1&&!isEdit){selCells.reverse().forEach(processCell);}else{if(order===1){switchFlag=1;selCells.forEach(processCell);}else{selCells.forEach(processCell);}}return{oId:titleInfo.id,oTp:titleInfo.otp,depth:dpt,ordinals:elemsStr.join(","),sliceId:w.sid,viewKey:w.k,funcVal:funcVal,switchOrder:switchFlag};}function createDE(w,cell,funcVal){var deInfo=w.getDEInfo(cell),deItems=deInfo&&deInfo.deObject&&deInfo.deObject.des,newItemTag=1,newItemName=funcVal===-1?$DESC(5187,"Group"):$DESC(5188,"Calculation"),hasSameName=function(item){return item.n===newItemName+" "+newItemTag;};while(true&&deItems){if(deItems.some(hasSameName)){newItemTag++;}else{break;}}w.controller.onAddQuickDE(w,$HASH.copy(createDEParam(w,cell,false,funcVal),{act:"addQuickDE",deName:newItemName+" "+newItemTag}));}function findDSID(datasets,aid){for(did in datasets){if($ARR.find(datasets[did].att,"did",aid)>-1){return did;}}return undefined;}function addToGroup(xtab,deObject,group,index,selObjects){var groupElements=group.es,groupId=group.id,cellObj;selObjects.forEach(function(cell){cellObj=cell[0];if(cellObj.eid.indexOf(groupId)<0){groupElements.push({n:$STR.decodeHtmlString(cellObj.v,true),t:mstrmojo.vi.enums.EnumDerivedElementType.LIST,v:cellObj.eid.split(";")[0].slice(1)});}});var controller=xtab.controller,docModel=xtab.model&&xtab.model.docModel,callback=controller._getXtabCallback(xtab),act={act:"applyDEChanges",deId:deObject.did,attId:deObject.attId,attName:deObject.attName,dsId:deObject.dsId,k:xtab&&xtab.k,actions:[updateDEAction(group,index)]};docModel.addUpdateObjects(act,{id:act.deId||act.attId,type:47,flag:$DDS.PARTIAL_UPDATE_FLAGS.DATA_CHANGE});callback=mstrmojo.func.wrapMethods(callback,docModel.getDatasetsUpdateCallback(),{success:function(){docModel.callOnNDECreated([group]);}});controller.submitUndoRedoUpdates(act,{},callback);}function updateDEAction(de,idx){return{act:"update",position:idx+1,item:de};}function setDEHierachyOptions(w,cell,de,splice,expand){var titleInfo=w.model.getCellTitleInfo(cell).title;w.controller.onSetDEHierachyOptions(w,{act:"setDEHierarchyOptions",oId:titleInfo.id,eId:de.id,splice:splice,expand:expand});}function getAllCandidates(zonesModel,item){var templateUnits=[],itemType=item.t,itemID=item.did;zonesModel.getDropZones().zones.forEach(function(zone){((zone&&zone.items)||[]).forEach(function(obj){var objectTp=obj.t,objectId=obj.did;if(objectTp!==21&&objectId!=="-1"&&objectId!=="00000000000000000000000000000000"&&((objectTp===4&&itemType===4)||(objectTp!==4&&itemType!==4))&&objectId!==itemID&&$ARR.find(templateUnits,"did",objectId)===-1){templateUnits.push(obj);}});});zonesModel.docModel.getDatasetUnits(itemType===4?["mx"]:["att"]).forEach(function(obj){if($ARR.find(templateUnits,"did",obj.did)===-1&&obj.did!==itemID&&!obj.hide){templateUnits.push(obj);}});return mstrmojo.vi.ui.DatasetUnitMenuUtils.getSortedDatasetUnits(templateUnits);}mstrmojo.vi.ui.rw._XtabDE=mstrmojo.provide("mstrmojo.vi.ui.rw._XtabDE",{scriptClass:"mstrmojo.vi.ui.rw._XtabDE",derivedElementGroup:function derivedElementGroup(data){createDE(this,data,-1);},addElementsToGroup:function addElementsToGroup(deObj,group,index,selObjects){addToGroup(this,deObj,group,index,selObjects);},derivedElementCalculation:function derivedElementCalculation(data,funcVal){createDE(this,data,funcVal);},separateOthers:function separateOthers(data,de){setDEHierachyOptions(this,data,de,1,1);},renameDEList:function renameDEList(data){this.controller.onEditQuickDEList(this,$HASH.copy(createDEParam(this,data,true,-1),{act:"editQuickDEList",deName:data.v}));},editQuickDECalculationNumberFormat:function editQuickDECalculationNumberFormat(data,prop){var action=createDEParam(this,data);action.deId=prop.de.id;action.act="editQuickDECalculationNumberFormat";this.controller.editQuickDECalculationNumberFormat(this,$HASH.copy(action,this.model.docModel.createNumberFormatParams(prop)));},editDECalculation:function editDECalculation(data,funcVal){if(funcVal!==undefined&&funcVal!==null){this.controller.editQuickDECalculation(this,$HASH.copy(createDEParam(this,data,true,funcVal),{act:"editQuickDECalculation"}));}else{this.controller.onEditQuickDECalculation(this,$HASH.copy(createDEParam(this,data,true),{act:"editQuickDECalculation",deName:data.v}));}},removeQuickDE:function removeQuickDE(data,args){var deObject=args&&args.deObject,groups=(deObject&&deObject.des)||[],me=this,minGroupLimit=2,filteredGroups=$ARR.filter(groups,function(item){return !item.ido;},{max:minGroupLimit+1}),unloadLayoutsCallback={success:function(res){var layouts=me.controller.view.getLayouts(),layoutCount=layouts.length,i;for(i=0;i<layoutCount;i++){me.controller.model.data.layouts[i].loaded=false;layouts[i].defn.loaded=false;}}};if(deObject&&(groups.length<=minGroupLimit||filteredGroups.length<=minGroupLimit)){var actions=[],zone=this.zonesModel.getZoneForObject(deObject.did),origList=getAllCandidates(this.zonesModel,deObject),origIdx=$ARR.find(origList,"did",deObject.attId),origAttr=origIdx>=0?origList[origIdx]:null,callbacks={};if(origAttr&&zone){actions.push(this.model.getAddTemplateUnitAction(origAttr,deObject.dsId,zone.id,$ARR.find(zone.items,"dsId",deObject.dsId)));actions=[this.zonesModel.getUpdateTemplateAction(actions)];callbacks=this.controller._getXtabCallback(this);}actions.push({act:"removeNDEFromDS",dsid:deObject.dsId,oid:deObject.did,partialRetrieval:{nodes:this.model.docModel.getSourceFilterKeys(this.zonesModel.getHost().k)}});callbacks=mstrmojo.func.wrapMethods(callbacks,this.controller.model.getDatasetsUpdateCallback(),this.controller.getReloadLayoutViewCallback(),unloadLayoutsCallback);this.controller.submitUndoRedoUpdates(actions,null,callbacks,$DDS.REQUEST_DEFN_DATA);}else{this.controller.removeQuickDE(this,$HASH.copy(createDEParam(this,data),{act:"removeQuickDE"}));}},derivedElementsEdit:function derivedElementsEdit(cell,deInfo){if(!deInfo){deInfo=this.getDEInfo(cell);}var model=this.model,ttlCell=model.getCellTitleInfo(cell).title,deObj=deInfo&&deInfo.deObject,de=deInfo&&deInfo.de,dsId,attId,attName;if(!deObj){dsId=this.gridData.datasetId||findDSID(model.docModel.datasets,ttlCell.id);attId=ttlCell.id;attName=ttlCell.n;}this.controller.openDEEditor(this,{dsId:dsId,attId:attId,attName:attName,deObj:deObj,elemId:de&&de.id,dispName:cell.n});},getDEInfo:function getDEInfo(cell){var model=this.model,ttl=model.getCellTitleInfo(cell).title,dei=cell.dei,deObject,de;if(ttl.ost!==12033){return null;}deObject=model.docModel.getDEObject(ttl.id);if(deObject&&dei!==undefined){de=deObject.des[dei];}return{deObject:deObject,de:de,ttl:ttl};},getOthersDEInfo:function getOthersDEInfo(deObject){var res;$ARR.forEach(deObject.des,function(de){if(de.t===4){res=de;return false;}});return res;}});}());