(function(){mstrmojo.requiresCls("mstrmojo.DocXtabModel","mstrmojo.array","mstrmojo.func");var SELECTOR_ACTION=2;var ROW_AXIS=1,COL_AXIS=2;mstrmojo.DocVisModel=mstrmojo.declare(mstrmojo.DocXtabModel,null,{scriptClass:"mstrmojo.DocVisModel",getAction:function getAction(cells){var cell=cells[0],actionType=cell&&cell.at;var action;if(actionType){if(actionType&SELECTOR_ACTION){action={h:"onVisSelector",a:this.getSelectAction(cell)};}}if(!action){action=this._super(cells);}return action;},getSelectAction:function getSelectAction(actionObj){var scObjList=actionObj.scObjList,scObjListLength=scObjList.length,action=null;if(scObjListLength>1){action={multiSelect:true,type:mstrmojo.EnumRWUnitType.GRID,src:actionObj.k,sliceId:1,sid:1,anchor:actionObj.anchor,selectorObjects:[]};var scTks={};var strTks="";for(var i=0;i<scObjListLength;i++){var scObj=scObjList[i];var tksList=scObj.sc.tks.split("\x1E");for(var j=0;j<tksList.length;j++){var target=tksList[j];if(!scTks[target]){scTks[target]=true;if(strTks.length>0){strTks=strTks+"\x1E"+target;}else{strTks=target;}}}}for(var i=0;i<scObjListLength;i++){var scObj=scObjList[i];action.selectorObjects.push({ck:scObj.sc.ck,ctlKey:scObj.sc.ckey,tks:scObj.sc.tks,eid:scObj.eid});}if(!action.tks){action.tks=strTks;}}else{if(scObjListLength===1){var scObj=scObjList[0];action={type:mstrmojo.EnumRWUnitType.GRID,src:actionObj.k,sliceId:1,sid:1,ck:scObj.sc.ck,ctlKey:scObj.sc.ckey,tks:scObj.sc.tks,eid:scObj.eid,anchor:actionObj.anchor};}}return action;}});})();