(function(){mstrmojo.requiresCls("mstrmojo.vi.models.DocXtabModel","mstrmojo.array","mstrmojo.func","mstrmojo.EnumRWUnitType");var $ARRAY=mstrmojo.array;var MX="Metrics",SELECTOR_ACTION=2;mstrmojo.vi.models.DocVisModel=mstrmojo.declare(mstrmojo.vi.models.DocXtabModel,null,{scriptClass:"mstrmojo.vi.models.DocVisModel",getSelectedAttributeElementIdStr:function(cells){var cell=cells[0],titleId=cell.tid,elementIdStr,selections=cell.selections,scSels=[],eids=[];$ARRAY.forEach(selections||[],function(selection){scSels=scSels.concat($ARRAY.filter(selection,function(item){return item.tid===titleId;}));});scSels=$ARRAY.distinct(scSels,"eid");(scSels||[]).forEach(function(item){eids.push(item.eid);});elementIdStr=eids.join("\u001E");var selectorControlMap=this.scm,sc=(titleId&&selectorControlMap[titleId]);if(sc){if(sc.showall){if(eids.length===0){elementIdStr="OA:(All)";}}}return elementIdStr;},getAction:function getAction(cells){var cell=cells[0],actionType=cell&&cell.at,domNode=cell.anchor,isClearAll=cell.isClearAll,titleId=cell.tid,elementIdStr,selections=cell.selections,eids=[];elementIdStr=this.getSelectedAttributeElementIdStr(cells);if(selections.length!==0&&elementIdStr===""){return null;}var action;if(actionType){if((actionType&SELECTOR_ACTION)>0){var selectorControlMap=this.scm;var sc=(titleId&&selectorControlMap[titleId])||selectorControlMap[MX];if(sc){var xtab=this.xtab;if(elementIdStr!==""){action={h:"onGridSelector",a:{type:mstrmojo.EnumRWUnitType.GRID,anchor:domNode,ck:sc.ck,tks:sc.tks,eid:elementIdStr,ctlKey:sc.ckey,sliceId:xtab.sid,isUConDS:sc.isUConDS,isDocVis:true}};}}}}return action;}});}());