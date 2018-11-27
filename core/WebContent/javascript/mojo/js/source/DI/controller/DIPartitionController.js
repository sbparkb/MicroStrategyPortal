(function(){mstrmojo.requiresCls("mstrmojo.Obj","mstrmojo.DI.DIConstants","mstrmojo.DI.DIPartitionGroupDialog");mstrmojo.requiresDescs(12390,12391,12392);var constants=mstrmojo.DI.DIConstants,actions=constants.actions,$ARR=mstrmojo.array,$DESC=mstrmojo.desc,changePartitionMode={UPDATE_SINGLE_PARTITION:0,ADD_MULTI_PARTITION:1,SET_SINGLE_PARTITION:2,SET_SINGLE_PARTITION_URL:3,SET_SINGLE_PARTITION_EMMA:4,SET_SINGLE_PARTITION_EXCEL:5};mstrmojo.DI.controller.DIPartitionController=mstrmojo.declare(mstrmojo.Obj,null,{scriptClass:"mstrmojo.DI.controller.DIPartitionController",getAllPartitionTables:function getAllPartitionTables(sourceId,memberTables){var rootController=mstrApp.getRootController();return rootController.model.getAllPartitionTables(sourceId,memberTables);},changePartition:function changePartition(partitionId,addTables,delTables,callback){var controller=mstrApp.getRootController(),cb,params,source;source=controller.model.getImportSource(partitionId);source.invalidPreview();cb={success:function(res){var flags=constants.requestFlag.mapping|constants.requestFlag.sourceInfo|constants.requestFlag.relationship;controller.dataService.set("messageID",res.msgid);controller.getImportedDataEMMA(actions.none,flags);},failure:function(res){controller.displayError($DESC(12390,"Cannot change partition group."),false,res.message||"");}};params={mode:changePartitionMode.UPDATE_SINGLE_PARTITION,partitionId:partitionId,addTables:JSON.stringify(addTables),delTables:JSON.stringify(delTables)};controller.dataService.changePartition(callback||cb,params);},setPartition:function setPartition(partitionId,addTables,callback){var controller=mstrApp.getRootController(),cb,params,source;source=controller.model.getImportSource(partitionId);source.invalidPreview();cb={success:function(res){var flags=constants.requestFlag.mapping|constants.requestFlag.sourceInfo|constants.requestFlag.relationship;controller.dataService.set("messageID",res.msgid);controller.getImportedDataEMMA(actions.none,flags);},failure:function(res){controller.displayError($DESC(12390,"Cannot change partition group."),false,res.message||"");}};params={mode:changePartitionMode.SET_SINGLE_PARTITION,partitionId:partitionId,addTables:JSON.stringify(addTables)};controller.dataService.changePartition(callback||cb,params);},addMultiPartitions:function addMultiPartitions(partitions,callback){var controller=mstrApp.getRootController(),model=controller.model,params,partitionParam=[],cb,source;$ARR.forEach(partitions,function(partition){partitionParam.push(partition.tableIds.join(","));source=model.getImportSource(partition.tableIds[0]);source.invalidPreview();});params={mode:changePartitionMode.ADD_MULTI_PARTITION,partitions:partitionParam.join("|")};cb={success:function(res){var flags=constants.requestFlag.mapping|constants.requestFlag.sourceInfo|constants.requestFlag.relationship;controller.dataService.set("messageID",res.msgid);if(callback&&callback.onOK){callback.onOK();}else{controller.getImportedDataEMMA(actions.none,flags);}},failure:function(res){controller.displayError($DESC(12391,"Cannot group partitions."),false,res.message||"",callback&&callback.onCancel);}};controller.dataService.changePartition(cb,params);},setPartitionURL:function setPartitionURL(partitionId,addTables,callback){var controller=mstrApp.getRootController(),cb,params,source;source=controller.model.getImportSource(partitionId);source.invalidPreview();cb={success:function(res){var msgid=res.msgid,params={};if(msgid){controller.dataService.set("messageID",msgid);}params.url=addTables[0];controller.autoMappingSourceTable(null,partitionId,params);},failure:function(){controller.displayError($DESC(12392,"Encounter error when set partition!"));}};params={mode:changePartitionMode.SET_SINGLE_PARTITION_URL,partitionId:partitionId,addTables:JSON.stringify(addTables)};controller.dataService.changePartition(callback||cb,params);},setPartitionExcel:function setPartitionExcel(partitionId,sheetsName,sheetsIndex){var controller=mstrApp.getRootController(),cb,params,source;if(sheetsIndex.length<=0){return ;}source=controller.model.getImportSource(partitionId);source.invalidPreview();cb={success:function(res){var params={shtIx:sheetsIndex[0]};controller.autoMappingSourceTable(null,partitionId,params,partitionId);},failure:function(){controller.displayError($DESC(12392,"Encounter error when set partition!"));}};params={mode:changePartitionMode.SET_SINGLE_PARTITION_EXCEL,partitionId:partitionId,addSheetsName:JSON.stringify(sheetsName),addsheetsIndex:sheetsIndex.join(",")};controller.dataService.changePartition(cb,params);},openPartitionGroupDialog:function openPartitionGroupDialog(groups,callback){mstrApp.getRootController().showDialog(constants.dialogType.partitionGroupDialog,{groups:groups,callback:callback});},isSamePartitionGroups:function isSamePartitionGroups(groups1,groups2){var tables={},isSame=true,groupNum1=groups1?groups1.length:0,groupNum2=groups2?groups2.length:0,tableNum1=0,tableNum2=0;if(groupNum1!==groupNum2){return false;}$ARR.forEach(groups1,function(group){$ARR.forEach(group.tableIds,function(tableID){tables[tableID]=true;tableNum1++;});});$ARR.forEach(groups2,function(group){$ARR.forEach(group.tableIds,function(tableID){if(!tables[tableID]){isSame=false;return false;}tableNum2++;});if(!isSame){return false;}});isSame=isSame&&(tableNum1===tableNum2);return isSame;}});}());