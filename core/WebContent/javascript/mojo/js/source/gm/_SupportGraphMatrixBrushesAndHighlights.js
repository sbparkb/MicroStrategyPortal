(function(){mstrmojo.requiresCls("mstrmojo.array","mstrmojo.EnumRWUnitType");var $ARRAY=mstrmojo.array;var SELECTOR_ACTION=2;var TEMPLATE_UNIT_SELECT_TYPE={attribute:"attribute",metric:"metric",empty:"empty;"};function getRowAndCol(){var gts=this.model.data.gts,row=(gts&&gts.row)||[],col=(gts&&gts.col)||[],rowAndCol=row.concat(col);return rowAndCol;}function findUnitIdWithSC(){var scm=this.model.scm,scmKeys=Object.keys(scm||{}),unitId=(scmKeys&&scmKeys[0])||"",row=this.model.data.gts.row,col=this.model.data.gts.col;$ARRAY.forEach(row.concat(col),function(unit){if(scmKeys.indexOf(unit.id)!==-1){unitId=unit.id;return false;}});return unitId;}mstrmojo.gm._SupportGraphMatrixBrushesAndHighlights=mstrmojo.provide("mstrmojo.gm._SupportGraphMatrixBrushesAndHighlights",{_mixinName:"mstrmojo.netviz._SupportNetworkBrushesAndHighlights",selectedMetricIds:null,TUSType:TEMPLATE_UNIT_SELECT_TYPE.empty,init:function init(props){this.selectedMetricIds=[];if(this._super){this._super(props);}},addAttributeSelection:function(attId,elementId,value){this.TUSType=TEMPLATE_UNIT_SELECT_TYPE.attribute;this._super(attId,elementId,value);},addMetricValueSelection:function(candidate){this.TUSType=TEMPLATE_UNIT_SELECT_TYPE.attribute;this._super(candidate);},getTUSType:function(){return this.TUSType;},precessSelectedAttributes:function(clickOnAttribute,clickOnMetric,ctrlKey){if(!ctrlKey){var attributeSC=this.getSingleAttributeSelectorControl();if(!attributeSC){this.interactor.clearSelectedTargets();this.interactor.clearSelectRules();this.clearSelections(true);}}},processSelectedMetricIds:function(clickOnAttribute,clickOnMetric,ctrlKey){if(!ctrlKey){var metricSC=this.getMetricSelectorControl();if(metricSC){this.interactor.clearMetricSelectorHighlight();this.selectedMetricIds=[];}}},highlight:function(type,data){if(this._super){this._super.apply(this,arguments);}if(this.noHighlightAfterKeepOnlyExcludeDrill){return ;}var interactor=this.interactor;if(interactor){interactor.doHighlight(type,data);}},singleUnitSelect:function singleUnitSelect(){var doMetricSelector=this.selectedMetricIds.length>0&&this.hasMetricSelector(),doAttributeSelector=(this.getSelections().length>0||this.clearSelectionsFlag)&&this.hasAttributeSelector();if(this.clearSelectionsFlag){delete this.clearSelectionsFlag;}doMetricSelector=false;if(doAttributeSelector&&doMetricSelector){var action={multiSelect:true,type:mstrmojo.EnumRWUnitType.GRID,src:this.model.k,sliceId:1,sid:1,anchor:this.domNode,selectorObjects:[]};var attributeSC=this.getSingleAttributeSelectorControl(),attributeEidStr=this.model.getSelectedAttributeElementIdStr();action.selectorObjects.push({ck:attributeSC.ck,ctlKey:attributeSC.ckey,tks:attributeSC.tks,eid:attributeEidStr});var metricSC=this.getMetricSelectorControl(),metricEidStr=this.getSelectedMetricIdStr();action.selectorObjects.push({ck:metricSC.ck,ctlKey:metricSC.ckey,tks:metricSC.tks,eid:metricEidStr});this.controller.onGridSelector(this,action);}else{if(doMetricSelector){var metricSelectorUnit=this.getMetricSelectorControl();this.singleMetricSelect(metricSelectorUnit);}else{if(doAttributeSelector){var prepareCell=function(){var selectionInfo={};selectionInfo.tid=findUnitIdWithSC.call(this);selectionInfo.eid="";selectionInfo.isClearAll=false;selectionInfo.anchor=this.domNode;selectionInfo.at=SELECTOR_ACTION;selectionInfo.selections=this.getSelections();selectionInfo.selectionType=this.getSelectionType();return selectionInfo;};var selctionInfo=prepareCell.call(this);this.performAction([selctionInfo]);}}}},getSelectedMetricIdStr:function(metricSelectorUnit){var selectedMetricsIds=this.selectedMetricIds,selectedMetricsIdsStr=selectedMetricsIds.join("\u001E"),sc=metricSelectorUnit.sc,selectAllElements=sc.showall&&selectedMetricsIds.length===0,eid=selectAllElements?"OA:(All)":selectedMetricsIdsStr;return eid;},singleMetricSelect:function singleMetricSelect(metricSelectorUnit){var sc=metricSelectorUnit.sc,eid=this.getSelectedMetricIdStr(metricSelectorUnit),action={type:mstrmojo.EnumRWUnitType.GRID,anchor:this.domNode,ck:sc.ck,tks:sc.tks,eid:eid,ctlKey:sc.ckey,sliceId:this.sid,isUConDS:sc.isUConDS,isDocVis:true};this.controller.onGridSelector(this,action);},getSingleAttributeSelectorControl:function(){var sc=null;if(this.hasAttributeSelector()){var unitId=findUnitIdWithSC.call(this);sc=this.model.scm[unitId];}return sc;},getMetricSelectorControl:function getMetricSelectorControl(){var rowAndCol=getRowAndCol.call(this),metricSelectorUnit=null;$ARRAY.forEach(rowAndCol,function(unit){if(unit.otp===-1&&unit.hasOwnProperty("sc")){metricSelectorUnit=unit;return false;}});return metricSelectorUnit;},hasAttributeSelector:function hasAttributeSelector(){var rowAndCol=getRowAndCol.call(this),hasSelector=false;$ARRAY.forEach(rowAndCol,function(unit){if(unit.otp!==-1&&unit.hasOwnProperty("sc")){hasSelector=true;return false;}});return hasSelector;},hasMetricSelector:function hasMetricSelector(){var rowAndCol=getRowAndCol.call(this),hasSelector=false;$ARRAY.forEach(rowAndCol,function(unit){if(unit.otp===-1&&unit.hasOwnProperty("sc")){hasSelector=true;return false;}});return hasSelector;},hasRSSelector:function(){return this.hasAttributeSelector()||this.hasMetricSelector();},postBuildRendering:function(){if(this.cetSelectors){var attrs=this.cetSelectors.attrs,metrics=this.cetSelectors.metrics,me=this;if(attrs.length>0){attrs.forEach(function(elem){me.addAttributeSelection(elem.tid,elem.id,elem.n);});}if(metrics.length>0){metrics.forEach(function(elem){me.addMetricValueSelection(elem.tid,elem.id,elem.n);});}}this._super();},clearSelections:function(flag,fromDoHight){this.clearSelectionsFlag=true;this.TUSType=TEMPLATE_UNIT_SELECT_TYPE.empty;if(this._super){this._super();}if(flag){this.clearSelectedHighlights(fromDoHight);}}});}());