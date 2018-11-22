(function(){mstrmojo.requiresCls("mstrmojo.DI.DIMappingMenu");var constants=mstrmojo.DI.DIConstants,menuItems=constants.menuItems,$H=mstrmojo.hash,$A=mstrmojo.array;function findShareTables(map,curTables){var arr=[];if(!curTables){if(map.linkedTbs){$H.forEach(map.linkedTbs,function(v,id){if(v){arr.push(id);}});}else{arr.push(map.tableId);}}else{$A.forEach(curTables,function(id){var add=false;if(map.linkedTbs){if(map.linkedTbs[id]){add=true;}}else{if(id===map.tableId){add=true;}}if(add){if($A.indexOf(arr,id)<0){arr.push(id);}}});}return arr;}mstrmojo.DI.DIAllObjectsMappingMenu=mstrmojo.declare(mstrmojo.DI.DIMappingMenu,null,{scriptClass:"mstrmojo.DI.DIAllObjectsMappingMenu",queryEnabled:function queryEnabled(item){var enable=true;if(item.did===menuItems.CREATE_MULTIFORM_ATTRIBUTE||item.did===menuItems.MAP_TO_PROJECT_ATTRIBUTE){var i,data=this.data,commonTableIds;commonTableIds=data[0].linkedTbs?$H.keyarray(data[0].linkedTbs):[data[0].tableId];for(i=1;i<data.length;i++){commonTableIds=$A.intersection(commonTableIds,data[i].linkedTbs?$H.keyarray(data[i].linkedTbs):[data[i].tableId]);}if(commonTableIds.length){data[0].tableId=commonTableIds[0];}else{enable=false;}}else{enable=this._super(item);}return enable;},executeCommand:function(item){var data=this.data,tableIds,tableId,i;if(item.did===menuItems.CREATE_MULTIFORM_ATTRIBUTE||item.did===menuItems.EDIT_MULTIFORM_ATTRIBUTE||item.did===menuItems.ADDTO_MULTIFORM_ATTRIBUTE||item.did===menuItems.MAP_TO_PROJECT_ATTRIBUTE){for(i=0;i<data.length;i++){if(i===0){tableIds=findShareTables(data[0]);}else{tableIds=findShareTables(data[i],tableIds);}}if(tableIds.length){tableId=tableIds[0];}switch(item.did){case menuItems.CREATE_MULTIFORM_ATTRIBUTE:mstrApp.getRootController().formsController.onClick(constants.formsOptions.CREATE_MULTIFORM_ATTRIBUTE,tableId,this.data[this.data.length-1],this.data);break;case menuItems.EDIT_MULTIFORM_ATTRIBUTE:mstrApp.getRootController().formsController.onClick(constants.formsOptions.EDIT_MULTIFORM_ATTRIBUTE,tableId,this.data[this.data.length-1],this.data);break;case menuItems.ADDTO_MULTIFORM_ATTRIBUTE:mstrApp.getRootController().formsController.onClick(constants.formsOptions.ADDTO_MULTIFORM_ATTRIBUTE,tableId,null,this.data);break;case menuItems.MAP_TO_PROJECT_ATTRIBUTE:mstrApp.getRootController().toProjectAttribute(this,tableId);break;}}else{if(item.did===menuItems.UNLINK_ALL){mstrApp.getRootController().unlinkAllCubeLevel(this);}else{return this._super(item);}}}});}());