(function(){mstrmojo.requiresCls("mstrmojo.func","mstrmojo.hash","mstrmojo.dom","mstrmojo.color","mstrmojo.boxmodel","mstrmojo.array","mstrmojo.Label","mstrmojo.DocDataService","mstrmojo.Xtab","mstrmojo._HasOwnAvatar","mstrmojo._HasPopup","mstrmojo.vi.ui._IsDropTarget","mstrmojo.rw.xtab._XtabColResize","mstrmojo.vi.ui._XtabCellHoverMgr","mstrmojo.ui._HasScroller","mstrmojo.vi.ui.VIDragUnit","mstrmojo.vi.ui.rw.selectors._IsMultiUnitControl","mstrmojo.vi.ui.rw.selectors._BrushesAndHighlights","mstrmojo.ui.editors.RenameEditor","mstrmojo.models.FormatModel","mstrmojo.models.template.DataInterface","mstrmojo.vi.models.editors.XtabEditorModel","mstrmojo.vi.models.EnumDragSources","mstrmojo.vi.ui.rw.xtab._SupportXtabCopyPaste");mstrmojo.requiresClsP("mstrmojo.vi.ui.rw","_IsMultiselectXtab","_HasVisSelections","_XtabHighlights","_XtabDE","_XtabRA","VizDropCue");mstrmojo.requiresClsP("mstrmojo.vi.viz","EnumVisualizationTemplates");mstrmojo.requiresDescs(11664,11668,13766,13767,14668);var $MOJO=mstrmojo,$ARRAY=$MOJO.array,$FUNC=$MOJO.func,$HASH=$MOJO.hash,$DOM=$MOJO.dom,$MODELS=$MOJO.models,$VI_MODELS=$MOJO.vi.models,$VIZ=$MOJO.vi.viz,$DATA_INTERFACE=$MODELS.template.DataInterface,$FMT_MODEL=$MODELS.FormatModel,$FMT_PROPERTIES=$FMT_MODEL.ENUM_PROPERTY_NAMES,$GET_FORMAT_OBJ=$FMT_MODEL.getFormatUpdate,SUPPRESS_DATA_PROPS=mstrmojo.DocDataService.SUPPRESS_DATA,fnReduce=$ARRAY.fnReduceNumber,PX="px",$VIZ_TEMPLATES=$VIZ.EnumVisualizationTemplates,ENUM_SOURCE=mstrmojo.vi.models.EnumDragSources;var $ENUM_GRID_RESIZE=$DATA_INTERFACE.ENUM_GRID_RESIZE,$FIXED_SCENARIO=$ENUM_GRID_RESIZE.FIXED,$FIT_TO_WIN_SCENARIO=$ENUM_GRID_RESIZE.FIT_TO_WINDOW,$FIT_TO_CON_SCENARIO=$ENUM_GRID_RESIZE.FIT_TO_CONTENTS,$DRAG_SOURCES=$VI_MODELS.EnumDragSources,$EDITOR_TARGETS=$VI_MODELS.editors.XtabEditorModel.ENUM_EDITOR_TARGETS,FMT_TARGET_COLUMNS=$EDITOR_TARGETS.COLUMNS,FMT_TARGET_ROWS=$EDITOR_TARGETS.ROWS,FMT_TARGET_VALUES=$EDITOR_TARGETS.VALUES,TYPE_METRIC=4,METRIC_NAMES_ID="00000000000000000000000000000000";function submitUndoRedoTemplateUpdates(actions){this.submitUndoRedoActionsWithCallback(this.controller.dataService().getUpdateTemplateAction(this.k,actions));}function getRebuildGridCallback(){var id=this.id,docModel=this.model.docModel;return{success:function success(response){var xtab=mstrmojo.all[id],unit=xtab.parent,scrollPosition=xtab.getScrollPos();unit=docModel.partialUpdateAndRebuildChild(unit,response)||unit;window.setTimeout(function(){docModel.selectVIUnit(unit.id,true);unit.boxContent.scrollTo(scrollPosition,true);},0);}};}function updateOverlay(){this.raiseEvent({name:"toggleCtrlOverlay",visible:(!this.gridData||this.gridData.eg===""),controls:[{scriptClass:"mstrmojo.Label",cssClass:"dropMsg",text:mstrmojo.desc(11668,"Drag objects here.")}]});}function createHiddenTextArea(){var hiddenTextArea=document.createElement("textarea");hiddenTextArea.className="xTabHiddenTextArea";this.domNode.appendChild(hiddenTextArea);this.xTabHiddenTextArea=hiddenTextArea;}function addAreaPoint(points,x,y){points.push({x:x,y:y});}function addMapArea(areaX,areaY,axis,areaDepth,points,cueOffset,sizeInfo,areas){var cueOrientation=sizeInfo.o,cueBasePosition=0,cue={or:cueOrientation,size:sizeInfo.cueSize+PX},fnGetPosition=function(){return Math.max(cueBasePosition+cueOffset-6,sizeInfo.cueMinPos)+PX;};if(cueOrientation==="v"){cueBasePosition=areaX;cue.top=areaY+PX;cue.left=fnGetPosition();}else{cueBasePosition=areaY;cue.top=fnGetPosition();cue.left=areaX+PX;}areas.push({id:axis+"|"+areaDepth,points:points,cue:cue});}function getFirstDropZone(areaX,areaY,areaSize,sizeInfo){var areaVertices=[],halfAreaSize=areaSize/2,areaEnd=sizeInfo.end;addAreaPoint(areaVertices,areaX,areaY);if(sizeInfo.o==="v"){addAreaPoint(areaVertices,areaX,areaEnd);addAreaPoint(areaVertices,areaX+halfAreaSize,areaEnd);addAreaPoint(areaVertices,areaX+halfAreaSize,areaY);}else{addAreaPoint(areaVertices,areaX,areaY+halfAreaSize);addAreaPoint(areaVertices,areaEnd,areaY+halfAreaSize);addAreaPoint(areaVertices,areaEnd,areaY);}return areaVertices;}function getSecondDropZone(areaX,areaY,areaSize,sizeInfo,isLastArea){var halfAreaSize=areaSize/2,areaEnd=sizeInfo.end,areaVertices=[];if(sizeInfo.o==="v"){addAreaPoint(areaVertices,areaX+halfAreaSize,areaY);addAreaPoint(areaVertices,areaX+halfAreaSize,areaEnd);if(isLastArea){addAreaPoint(areaVertices,sizeInfo.side,areaEnd);addAreaPoint(areaVertices,areaX+areaSize,sizeInfo.header);}else{addAreaPoint(areaVertices,areaX+areaSize,areaEnd);}addAreaPoint(areaVertices,areaX+areaSize,areaY);}else{addAreaPoint(areaVertices,areaX,areaY+halfAreaSize);addAreaPoint(areaVertices,areaX,areaY+areaSize);if(isLastArea){addAreaPoint(areaVertices,areaEnd,sizeInfo.side);addAreaPoint(areaVertices,areaEnd,areaY+areaSize);}else{addAreaPoint(areaVertices,areaEnd,areaY+areaSize);}addAreaPoint(areaVertices,areaEnd,areaY+halfAreaSize);}return areaVertices;}function getSingleDropZoneAreas(origin,areaSize,isLastArea,axis,depth,sizeInfo,areas){var areaX=origin.x,areaY=origin.y;addMapArea(areaX,areaY,axis,depth,getFirstDropZone(areaX,areaY,areaSize,sizeInfo),0,sizeInfo,areas);addMapArea(areaX,areaY,axis,depth+1,getSecondDropZone(areaX,areaY,areaSize,sizeInfo,isLastArea),areaSize,sizeInfo,areas);}function addMetricDropZone(metricIndices,sizeArray,position,sizeInfo,fnGetSize,fnGetOrigin,areas){var unitCount=0,currentDepth=metricIndices[0],fnAddArea=function(){var areaSize=sizeArray.splice(0,unitCount).map(fnGetSize).reduce(fnReduce,0);getSingleDropZoneAreas(fnGetOrigin(position),areaSize,false,-1,currentDepth+1,sizeInfo,areas);return areaSize;};metricIndices.forEach(function(metricDepth){if(metricDepth===currentDepth){unitCount++;}else{position+=fnAddArea();currentDepth=metricDepth;unitCount=1;}});fnAddArea();}function addAttributeArea(units,position,axis,sizeInfo,fnGetOrigin,areas){var lastIdx=units.length-1;units.forEach(function(size,idx){getSingleDropZoneAreas(fnGetOrigin(position,axis),size,idx===lastIdx,axis,idx+1,sizeInfo,areas);position+=size;});}function compressTitleForms(titles,collection,fnGetValue){var titleFormCounts={order:[]};titles.forEach(function(title){var titleId=title.id||"metrics",formCnt=titleFormCounts[titleId];if(!formCnt){titleFormCounts.order.push(titleId);}titleFormCounts[titleId]=(formCnt&&formCnt+1)||(title.fs&&title.fs.length)||1;});return titleFormCounts.order.map(function(id){return collection.splice(0,titleFormCounts[id]).map(fnGetValue).reduce(fnReduce,0);});}function getDropAreas(context){var dataInterface=new mstrmojo.models.template.DataInterface(this.gridData),xtabTablePosition=$DOM.position(this.zone.tableNode),gridInfo=this.gridInfo,gridData=this.gridData,colWidths=gridData.twm.bottom.map(function(col){return parseInt(col.w,10);}),rowColumnsWidths=compressTitleForms(dataInterface.getRowTitles().titles,colWidths,function(width){return width;}),trNodes=Array.prototype.slice.call(this.zone.domNode.getElementsByTagName("tr"),0),totalRowColumnWidth=rowColumnsWidths.reduce(fnReduce,0),headerRowHeights=compressTitleForms(dataInterface.getColTitles().titles,trNodes,function(tr){return tr.offsetHeight;}),tableTopEdge=xtabTablePosition.y,headerBottomY=tableTopEdge+headerRowHeights.reduce(fnReduce,0),tableRightEdge=xtabTablePosition.x+xtabTablePosition.w,tableBottomEdge=xtabTablePosition.y+xtabTablePosition.h,tableLeftEdge=xtabTablePosition.x,xtabContainerPosition=$DOM.position(this.domNode.parentNode),verticalSizeInfo={cueSize:Math.min(xtabContainerPosition.h,xtabTablePosition.h),cueMinPos:xtabContainerPosition.x,header:headerBottomY,side:tableRightEdge,end:tableBottomEdge,o:"v"},horizontalSizeInfo={cueSize:Math.min(xtabContainerPosition.w,xtabTablePosition.w),cueMinPos:xtabContainerPosition.y,header:headerBottomY,side:tableBottomEdge,end:tableRightEdge,o:"h"},fnGetVerticalOrigin=function(position){return{x:position,y:tableTopEdge};},fnGetHorizontalOrigin=function(position,axis){var rtn={x:tableLeftEdge,y:position};if(axis===2){rtn.x+=totalRowColumnWidth;}return rtn;},areas=[];if(context.getCtxtDragData().item.t===TYPE_METRIC&&gridInfo.mx&&gridInfo.mx.length){var gridValueItems=gridData.gvs.items;if(gridInfo.tma===2){addMetricDropZone(gridValueItems[0].items.map(function(cell){return cell.mix;}),colWidths,tableLeftEdge+totalRowColumnWidth,verticalSizeInfo,function(colWidth){return colWidth;},fnGetVerticalOrigin,areas);}else{addMetricDropZone(gridValueItems.map(function(row){return row.items[0].mix;}),trNodes,headerBottomY,horizontalSizeInfo,function(tr){return tr.offsetHeight;},fnGetHorizontalOrigin,areas);}}else{horizontalSizeInfo.cueSize-=totalRowColumnWidth;addAttributeArea(rowColumnsWidths,tableLeftEdge,1,verticalSizeInfo,fnGetVerticalOrigin,areas);addAttributeArea(headerRowHeights,tableTopEdge,2,horizontalSizeInfo,fnGetHorizontalOrigin,areas);}return areas;}function isSingleSelect(){var model=this.model;return !!(model.getSelectorControlMapInfo?model.getSelectorControlMapInfo():[]).length;}function getFormatTarget(formatData){if(!formatData){return $EDITOR_TARGETS.GENERAL;}var titleInfo=formatData.info;if(!titleInfo){return undefined;}if(titleInfo.isSrcTitle){return FMT_TARGET_COLUMNS;}var title=titleInfo.title;if(title.otp===-1&&!formatData.isMetricHeader){return FMT_TARGET_VALUES;}return title.axis===1?FMT_TARGET_ROWS:FMT_TARGET_COLUMNS;}function updateMessageTextColor(){var msgNode=this.msgNode,backgroundColor=this.getFormats()["background-color"];if(msgNode&&backgroundColor){msgNode.style.color=mstrmojo.color.getContrastingColor(backgroundColor,"#cdcdcd","#444649");}}mstrmojo.vi.ui.rw.Xtab=mstrmojo.declare(mstrmojo.Xtab,[mstrmojo._HasOwnAvatar,mstrmojo.rw.xtab._XtabColResize,mstrmojo.ui._HasScroller,mstrmojo.vi.ui.rw._IsMultiselectXtab,mstrmojo.vi.ui.rw._HasVisSelections,mstrmojo.vi.ui.rw.selectors._IsMultiUnitControl,mstrmojo.vi.ui.rw.selectors._BrushesAndHighlights,mstrmojo.vi.ui.rw._XtabHighlights,mstrmojo.vi.ui.rw._XtabDE,mstrmojo._HasPopup,mstrmojo.vi.ui._IsDropTarget,mstrmojo.vi.ui.rw.xtab._SupportXtabCopyPaste,mstrmojo.vi.ui.rw._XtabRA],{scriptClass:"mstrmojo.vi.ui.rw.Xtab",controller:null,formatHandlers:{msgNode:["height"],viewport:["D"]},dropZone:true,isMultiSelect:true,cellHoverMgr:"mstrmojo.vi.ui._XtabCellHoverMgr",CELL_HIGHLIGHT:"xtabSel",isVIXtab:true,supportsEditorClickSwitching:true,_set_edtModel:function _set_edtModel(_,edtModel){var edtModelListener=this._edtModelListener;if(edtModelListener){edtModelListener.clear();}this.edtModel=this.addDisposable(edtModel);this._edtModelListener=edtModel.attachEventListener("BEMFormatChange",this.id,function(evt){if(evt.propertyName===$FMT_PROPERTIES.BACKGROUND_COLOR){updateMessageTextColor.call(this);}});return true;},handlesMultiSelection:function handlesMultiSelection(){return true;},getVisType:function getVisType(){return{s:"VisGrid",vt:$VIZ_TEMPLATES.GRID};},_set_gridData:function _set_gridData(n,v){this.gridData=v;this.raiseEvent({name:"regenerateToolbar"});return true;},submitUndoRedoActionsWithCallback:function submitUndoRedoActionsWithCallback(actions,callback){this.controller.submitUndoRedoTemplateWithCallback(this,actions,callback);},updateForPU:function(node){this.node=node;this.update(node);},update:function update(node){var gridData=this.gridData,gridFmts=gridData&&gridData.gsi&&gridData.gsi.fmts;if(gridFmts){var nodeData=node.data,newGridData=nodeData[0]||nodeData,newGridFmts=newGridData&&newGridData.gsi&&newGridData.gsi.fmts;if(newGridFmts){$HASH.keyarray(newGridFmts).forEach(function(area){if(newGridFmts[area].empty){newGridFmts[area]=gridFmts[area];}});}}this._super(node);updateOverlay.call(this);},postBuildRendering:function postBuildRendering(){this._super();this.shouldClipLockableXtab=false;updateMessageTextColor.call(this);updateOverlay.call(this);createHiddenTextArea.call(this);},supportsContextMenu:function supportsContextMenu(){return true;},setupScrollNodes:function setupScrollNodes(){this.scrollNode=this.scrollboxNode;this.scrollbarHostNode=this.domNode;},drill:function drill(cell,drillToPath){var action,model=this.model,me=this;if(!cell._e){action=model.getDrillAction(this.getActionCells(cell),drillToPath);}else{action=model.getDrillAction($ARRAY.map(this.selCells,function(td){return me.getCellForNode(td);}),drillToPath);}this.controller.onDrill(this,action);},pivot:function pivot(cell,btn){var me=this,model=this.model,cb=function(){submitUndoRedoTemplateUpdates.call(me,model.getPivotAction(cell,btn));};if(btn==="2"){model.xtab.zonesModel.checkAndWarnLargeItemsForAddUnits([cell],cb,null,true);return ;}cb();},pivotForm:function pivotForm(cell,btn){if(btn==="l"||btn==="r"){submitUndoRedoTemplateUpdates.call(this,this.model.getPivotFormAction(cell,btn));}},showTotal:function showTotal(cell,subtotalTypes,clearSubtotalTypes){submitUndoRedoTemplateUpdates.call(this,this.model.getTotalsAction(cell,subtotalTypes,clearSubtotalTypes));},renameUnit:function renameUnit(cell){var isMH=cell&&cell.mix!==undefined&&!!cell._e,unitId=(isMH?cell._e.oid:cell.id),unitType=isMH?4:cell.otp,model=this.model,gridInfo=this.gridInfo,cellName=gridInfo.rows.concat(gridInfo.cols).concat(gridInfo.mx).filter(function(item){return item.did===unitId;})[0],nameInDataSet=model.getUnitNameInDataSet(unitId),cellText=(cellName&&cellName.n)||cell.n||cell.v;(new mstrmojo.ui.editors.RenameEditor({renameText:cellText,helpText:nameInDataSet&&cellText!==nameInDataSet?mstrmojo.desc(14668,"Original Name: ##").replace("##",nameInDataSet):null,onRename:function(renameText){var fnRename=function(){submitUndoRedoTemplateUpdates.call(this,model.getRenameTemplateUnitAction(unitId,unitType,renameText,unitType===TYPE_METRIC));}.bind(this);if(model.doesNameExistOnTemplate(this,unitId,unitType,renameText)){mstrmojo.confirm(mstrmojo.desc(11664,'"##" already exists in the visualization. Do you want to proceed?').replace("##",renameText),{confirmBtn:{fn:fnRename}});}else{fnRename();}}.bind(this)})).open();},removeUnit:function removeUnit(cell){var isMH=cell&&cell.mix!==undefined&&!!cell._e;submitUndoRedoTemplateUpdates.call(this,this.model.getRemoveTemplateUnitAction({did:isMH?cell._e.oid:cell.id,t:isMH?4:cell.otp}));},removeTotal:function removeTotal(cell){var headerSubtotalType=cell.hst;if(headerSubtotalType!==undefined){var model=this.model,cellTitle=model.getCellTitleInfo(cell).title;var isAxisTotal=![].concat(cellTitle.ast||[]).some(function(totalObj){return totalObj.t===headerSubtotalType;});if(isAxisTotal){submitUndoRedoTemplateUpdates.call(this,model.getRemoveAxisTotalsAction(headerSubtotalType,cell.axis));}else{this.showTotal(cellTitle,[],[headerSubtotalType]);}}},formatGridZone:function formatGridZone(zone,formats){submitUndoRedoTemplateUpdates.call(this,this.model.getZoneFormatAction(zone,formats,this.k));},batchFormatGridZones:function formatGridZones(zones,formats){var me=this;submitUndoRedoTemplateUpdates.call(this,zones.map(function(zone,idx){return me.model.getZoneFormatAction(zone,formats[idx],me.k);}));},formatPadding:function formatPadding(horizontal,vertical){var formatObj=$GET_FORMAT_OBJ($FMT_PROPERTIES.GRID_HORIZONTAL_PADDING,horizontal,$GET_FORMAT_OBJ($FMT_PROPERTIES.GRID_VERTICAL_PADDING,vertical));submitUndoRedoTemplateUpdates.call(this,["ch","rh","va"].map(function(zone){return this.model.getZoneFormatAction(zone,formatObj,this.k);},this));},keepOnlyOrExclude:function keepOnly(cell,isKeepOnly){var controller=this.controller,xtabSelections=this.getSelections(),callback=$FUNC.wrapMethods(controller._getXtabCallback(this));controller.applyKeepOnly(this,callback,{keepOnly:isKeepOnly,data:xtabSelections.length>0?xtabSelections:[this.model.getCellDataUnion(cell)]});if(!isKeepOnly){this.clearSelections();this.endSelections();}},setAllXtabWidths:function setAllXtabWidths(width){var tabularWidthModel=this.gridData.twm||{},topWidths=tabularWidthModel.top,bottomWidths=tabularWidthModel.bottom;(bottomWidths||[]).forEach(function(bottomWidthObj,index){topWidths[index].w=bottomWidthObj.w=width?(width+PX):width;});},changeResizeScenario:function changeResizeScenario(scenario,isColumns,changedColumnSize,silent){var templateInterface=new mstrmojo.models.template.DataInterface(this.gridData),rowResizeInfo=templateInterface.getRowResizeInfo(),tabularWidthModel=this.gridData.twm||{},bottomWidths=tabularWidthModel.bottom,columnsData=templateInterface.getColumnHeaderData(),me=this,model=this.model,id=this.id,key=this.k,actions=[],currentValues=[],previousValues=[],currentFormIndex=1,previousScenario=isColumns?templateInterface.getColResizeScenario():rowResizeInfo.v,distinctCols=[];if(previousScenario===scenario){return ;}if(isColumns){actions.push({act:"changeXtabColWidthScenario",value:scenario});if(scenario===$FIXED_SCENARIO||previousScenario===$FIXED_SCENARIO){columnsData.forEach(function(col,index){var id=col.oid||col.id,fnRedundant=function(item){return item.unitId===id&&item.depth===currentFormIndex;},previousCol=columnsData[index-1];if(!(col.fs&&col.fs.length>0)||(previousCol&&id!==(previousCol.oid||previousCol.id))){currentFormIndex=1;}var isTarget=id===(changedColumnSize&&changedColumnSize.did)&&currentFormIndex===changedColumnSize.depth;if(!distinctCols.some(fnRedundant)){distinctCols.push({unitId:id,depth:currentFormIndex});currentValues.push({colIndex:index,value:isTarget?changedColumnSize.width+PX:bottomWidths[index].w});previousValues.push({colIndex:index,value:bottomWidths[index].w});if(scenario===$FIXED_SCENARIO){actions.push(model.getColumnResizeAction(id,col.otp,isTarget?changedColumnSize.width:parseInt((bottomWidths[index].w)||0,10),currentFormIndex,isTarget?changedColumnSize.isExtra:false));}}currentFormIndex++;});}var updateWidths=function updateWidths(scenario,colValues){var xtab=mstrmojo.all[id];if(scenario===$FIXED_SCENARIO){me.updateRelatedColWidths(colValues);}me.updateScenario(scenario);};if(!silent){this.controller.cmdMgr.execute({execute:function execute(){updateWidths(scenario,currentValues);this.submit(model.getDataService().getUpdateTemplateAction(key,actions),getRebuildGridCallback.call(mstrmojo.all[id]),SUPPRESS_DATA_PROPS);},urInfo:{undo:function undo(){updateWidths(previousScenario,previousValues);},redo:function redo(){updateWidths(scenario,currentValues);},callback:getRebuildGridCallback.call(this)}});}else{updateWidths(scenario,currentValues);}}else{actions.push({act:"changeXtabRowHeightScenario",value:scenario,height:rowResizeInfo.height});if(!silent){submitUndoRedoTemplateUpdates.call(this,actions);}}return silent?actions:undefined;},submitColumnWidthChange:function submitColumnWidthChange(actions,silent,previousValues,currentValues){var me=this;if(!silent){this.controller.cmdMgr.execute({execute:function execute(){this.submit(me.model.getDataService().getUpdateTemplateAction(me.k,actions),getRebuildGridCallback.call(me),SUPPRESS_DATA_PROPS);},urInfo:{undo:function undo(){me.updateRelatedColWidths(previousValues);},redo:function redo(){me.updateRelatedColWidths(currentValues);},callback:getRebuildGridCallback.call(this),extras:SUPPRESS_DATA_PROPS}});}},changeColumnWidth:function changeColumnWidth(unitId,unitType,width,formIndex,isExtraColumn,silent){var templateInterface=new mstrmojo.models.template.DataInterface(this.gridData),tabularWidthModel=this.gridData.twm||{},bottomWidths=tabularWidthModel.bottom,columnsData=templateInterface.getColumnHeaderData(),me=this,model=this.model,actions=[],currentValues=[],previousValues=[],currentFormIndex=1,currentColIndex=-1,distinctCols=[];if(templateInterface.getColResizeScenario()!==$FIXED_SCENARIO){actions=this.changeResizeScenario($FIXED_SCENARIO,true,{did:unitId,t:unitType,width:width,depth:formIndex,isExtra:isExtraColumn},silent);return silent?actions:undefined;}if(unitId==="all"){columnsData.forEach(function(col,index){var id=col.oid||col.id,fnRedundant=function(item){return item.unitId===id&&item.depth===currentFormIndex;},previousCol=columnsData[index-1];if(!(col.fs&&col.fs.length>0)||(previousCol&&id!==(previousCol.oid||previousCol.id))){currentFormIndex=1;}if(!distinctCols.some(fnRedundant)){distinctCols.push({unitId:id,depth:currentFormIndex});currentValues.push({colIndex:index,value:width+PX});previousValues.push({colIndex:index,value:bottomWidths[index].w});actions.push(model.getColumnResizeAction(id,col.otp,width,currentFormIndex,false));}currentFormIndex++;});}else{columnsData.every(function(col,index){var isItem=(col.oid===unitId||col.id===unitId);if(isItem){currentColIndex=index+formIndex-1;}return !isItem;});if(currentColIndex>=0){currentValues.push({colIndex:currentColIndex,value:width+PX});previousValues.push({colIndex:currentColIndex,value:bottomWidths[currentColIndex].w});actions.push(model.getColumnResizeAction(unitId,unitType,width,formIndex,isExtraColumn));}}me.updateRelatedColWidths(currentValues);me.submitColumnWidthChange(actions,silent,previousValues,currentValues);return silent?actions:undefined;},changeRowHeight:function changeRowHeight(height){submitUndoRedoTemplateUpdates.call(this,{act:"changeXtabRowHeightScenario",value:$FIXED_SCENARIO,height:height});},showBanding:function showBanding(show){this.controller.submitUndoRedoUpdates(this.model.getDataService().getUpdateTemplateAction(this.k,{act:"showBanding",show:!!show}),{},getRebuildGridCallback.call(this));},getDragData:function getDragData(context){var srcNode=context.src.node,me=this;if(!this.isColResizeNode(srcNode)&&!this.isDraggingScrollBar(context)){var model=this.model,cell=this.getCellForNode(srcNode),cellInfo=model.getCellInfo(cell),isTitle=cellInfo.isTitle,isMetricHeader=(cellInfo.isMetric&&cellInfo.isHeader);if(isTitle||isMetricHeader){var objectId=isTitle?model.getCellTitleInfo(cell).title.id:cell._e.oid,item=model.getObjectInfo(objectId);item.cell=cell;var info=(context.dragUnitHelper=new mstrmojo.vi.ui.VIDragUnit()).getUnitDragData(context,[item]);info.src=ENUM_SOURCE.VIZ;info.onRemove=function(item){me.removeUnit(item.cell);};info.allowDropOnTarget=function(tgt){if(tgt===ENUM_SOURCE.DATASETS){return true;}return false;};return info;}}return this._super(context);},isDragValid:function isDragValid(context){var srcNode=context.src.node,cellInfo={};if(!this.isColResizeNode(srcNode)&&!this.isDraggingScrollBar(context)){cellInfo=this.model.getCellInfo(this.getCellForNode(srcNode));}return cellInfo.isTitle||(cellInfo.isMetric&&cellInfo.isHeader)||this._super(context);},createAvatar:function createAvatar(srcNode,context){if(context.dragUnitHelper&&!this.isColResizeNode(srcNode)){return context.dragUnitHelper.getUnitAvatar(context);}return this._super(srcNode,context);},positionAvatar:function positionAvatar(pos,context){if(context.dragUnitHelper){context.dragOffsets=context.dragUnitHelper.getDragUnitOffsets();}this._super(pos,context);},allowBoxDropFromDataset:function allowBoxDropFromDataset(context){var gridData=this.gridData;return !gridData||gridData.egt!==undefined;},allowDrop:function allowDrop(context){var dragData=context.getCtxtDragData(),items=dragData&&dragData.items;return context.dragUnitHelper||context.src===this||context.src===this||((items&&items.length===1)&&dragData.src===$DRAG_SOURCES.DATASETS);},getDropData:function getDropData(context){var item=context.getCtxtDragData().item,unit=item&&(new mstrmojo.models.template.DataInterface(this.gridData)).getUnitById(item.did),tip=!!unit?mstrmojo.desc(13766,"Move ##"):mstrmojo.desc(13767,"Add ##");return{cue:new mstrmojo.vi.ui.rw.VizDropCue(),unit:unit,tip:tip.replace("##",item.n),avatar:!!unit?"move":"add"};},ondragenter:function ondragenter(context){var xtabMaps=context.xtabMaps=context.xtabMaps||{};if(!xtabMaps[this.id]){xtabMaps[this.id]=getDropAreas.call(this,context);}this.openPopup(context.getCtxtDropData().cue);this.ignoreHover=true;},ondragover:function ondragover(context){var dropMap=context.xtabMaps[this.id],dropData=context.getCtxtDropData(),targetArea;dropMap.every(function(area){if(mstrmojo.boxmodel.isPtInPolygon(context.tgt.pos,area.points)){targetArea=area;return false;}return true;});var targetAreaId=(targetArea&&targetArea.id)||"";if(dropData.areaId!==targetAreaId){var dragData=context.getCtxtDragData(),cueConfig=null,avatarClass="",cueData=targetArea&&targetArea.cue;if(cueData){cueConfig={tip:dropData.tip,or:cueData.or,size:cueData.size,top:cueData.top,left:cueData.left};avatarClass=dropData.avatar;}else{if(dragData.src===$DRAG_SOURCES.DATASETS){avatarClass=dropData.unit?"no-op":"add";}}dropData.cue.set("cueConfig",cueConfig);dropData.areaId=targetAreaId;dragData.setAvatarClass(avatarClass);}},ondrop:function ondrop(context){var areaId=context.getCtxtDropData().areaId,dragData=context.getCtxtDragData();if(areaId){var tgtInfo=areaId.split("|"),targetAxis=parseInt(tgtInfo[0],10),targetDepth=parseInt(tgtInfo[1],10),dropItem=dragData.items[0],model=this.model,unitId=dropItem.did,currentUnitPosition=model.getCurrentUnitAxisAndPosition(unitId),action;if(context.src===this||currentUnitPosition){var currentAxis=currentUnitPosition.axis,currentDepth=currentUnitPosition.depth;if(targetAxis!==currentAxis||(targetDepth!==currentDepth&&targetDepth!==currentDepth+1)){if(targetAxis===currentAxis&&currentDepth<targetDepth){targetDepth--;}action=model.getPivotUnitAction(targetAxis,targetDepth-1,unitId,dropItem.t);}}else{model.addEditNodeForDatasetAction(context,this.k);action=model.getAddTemplateUnitAction(dropItem,dragData.dsid,targetAxis,targetDepth-1);}if(action){var me=this,controller=this.controller,cbFunc=function(){var actions=context.actions||[],updTmplAction;updTmplAction=controller.dataService().getUpdateTemplateAction(me.k,[action]);if(updTmplAction&&updTmplAction.actions){var hasMetric=false,newFmtUnits=[],isMetric;$ARRAY.forEach(context.getCtxtDragData().items,function(item){isMetric=(item.t===TYPE_METRIC&&item.id!==METRIC_NAMES_ID);hasMetric=isMetric||hasMetric;if(isMetric){newFmtUnits.push(item);}});if(hasMetric){updTmplAction.actions.push(me.model.getValuesDefaultFormatGridZoneAction(newFmtUnits));}}actions.push(updTmplAction);me.submitUndoRedoActionsWithCallback(actions,context.callback);},altCbFunc=function(){var actions=context.actions||[];me.submitUndoRedoActionsWithCallback(actions,context.callback);};if(targetAxis===2){model.xtab.zonesModel.checkAndWarnLargeItemsForAddUnits([dropItem],cbFunc,altCbFunc,true);return this._super(context);}if(dragData.src===$DRAG_SOURCES.ALL_OBJECT_LIST){var widget=context.src.widget,dp=widget&&widget.dataProvider;if(dp){dp.loadObjects([dropItem],{success:cbFunc});}}else{cbFunc();}}}else{if(dragData.dsid){this.zonesModel.addUnitsFromDataSource(dragData.items,dragData.dsid,context.actions,context.callback);}}this._super(context);},cleanUpAfterTarget:function cleanUpAfterTarget(context){this._super(context);var cue=context.getCtxtDropData().cue;if(cue){this.closePopup();cue.destroy();}this.ignoreHover=false;},getFormatMenuItemTarget:getFormatTarget,getFormatTargetFromCell:function getFormatTargetFromCell(cell){return getFormatTarget({info:this.model.getCellTitleInfo(cell),isMetricHeader:cell&&cell.mix!==undefined&&!!cell._e});},highlightFormatTarget:function highlightFormatTarget(formatTarget){var selectionType=mstrmojo.vi.ui.rw.SelectionType,highlightTarget=selectionType.METRIC_VALUES,isFiltering=!!(this.hasAssociatedNodes()&&this.getSelections()),currentHighlights=(this.highlights||[]).slice();if(formatTarget===FMT_TARGET_COLUMNS){highlightTarget=selectionType.COL_HEADERS;}else{if(formatTarget===FMT_TARGET_ROWS){highlightTarget=selectionType.ROW_HEADERS;}}this.highlightRange(highlightTarget,isFiltering);return isFiltering?currentHighlights:null;},highlightNumberFormatTarget:function highlightNumberFormatTarget(item){var currentHighlights=(this.highlights||[]).slice();if(item&&item.did){this.highlightCellsById(item.did,item.t);}else{if(item&&item._e){this.highlightCellsById(item._e.id,12,true);}}return currentHighlights;},restoreHighlights:function restoreHighlights(nodes){if(nodes){this.clearHighlights();this.highlightCells(nodes);}else{this.highlight(this.getSelectionType(),this.getSelectionHash(),true);}},onclick:function onclick(evt){this._super(evt);if($DOM.isPrimaryMouseBtn(evt.e)&&!evt.ctrlKey&&!evt.shiftKey&&!evt.metaKey){var data=this.getCellForNode(evt.getTarget());if(data){var target=this.getFormatTargetFromCell(data);if(target){evt.e.ptvSelected=true;if(this.edtModel){this.edtModel.selectTargetByValue(target);}}}}},editDerivedAttribute:function editDerivedAttribute(data){var m=this.model.docModel,da=this.getDerivedAttribute(data.id),config;if(da){config={dsid:da.dsid,did:data.id,n:data.n,alias:data.n,forms:da.fs,datasets:m.datasets};this.controller.openDAE(this,config,mstrmojo.emptyFn,null);}},newDerivedAttribute:function newDerivedAttribute(data){var m=this.model.docModel,me=this,config={forceRefresh:true,alias:"New Attribute",datasets:m.datasets,precreate:function precreate(params){params=$HASH.copy({act:"addDAToTemplate",nodeKey:me.k,treeType:me.defn.tt,axis:data.axis},params);if(data.ui!==undefined){params.pos=data.ui+2;}return params;}};this.controller.openDAE(this,config,mstrmojo.emptyFn,null);},newDynamicLinkAttr:function newDynamicLinkAttr(data){var m=this.model.docModel,me=this,config={forceRefresh:true,alias:"New Link",datasets:m.datasets,precreate:function precreate(params){params=$HASH.copy({act:"addDAToTemplate",nodeKey:me.k,treeType:me.defn.tt,axis:data.axis},params);if(data.ui!==undefined){params.pos=data.ui+2;}return params;}};var fnFilter=function fnFilter(unit){return unit.did===data.id;};var attr=m.getDatasetUnits(["att"],fnFilter)[0]||null;this.controller.openDynamicLinkEditor(this,config,mstrmojo.emptyFn,attr);},getDerivedAttribute:function getDerivedAttribute(did){var m=this.model.docModel,dss=m.datasets,da=null;$HASH.forEach(dss,function(ds,dsId){var idx=$ARRAY.find(ds.att,"did",did);if(idx>=0&&ds.att[idx].da){da=ds.att[idx];da.dsid=dsId;return false;}});return da;},isStatusBarPositioned:true,doSelection:function doSelection(e,hWin,td){var evt=mstrmojo._HasMarkup.newDomEvent("click",hWin,e);evt.getTarget=function(){return td;};this.onclick(evt);},selectSiblings:function selectSiblings(cell){return !(!(this.selectorControl||isSingleSelect.call(this))||this.isSelectAllCell(cell));},onNDECreated:function(){this.clearSelections();this.clearSelectionsCache();},getOnSubtotalsChangeFn:function(cfgEditor,data,callback){return function(){var types=cfgEditor.contents.getSubtotalTypes(),model=this.model,subtotalsToAdd=types[0],subtotalsToRemove=types[1],actions=[];if(model.data.gsi.hidesb){if(data.ast){subtotalsToRemove=data.ast.map(function(item){return item.t;});subtotalsToRemove=$ARRAY.filter(subtotalsToRemove,function(item){return $ARRAY.indexOf(subtotalsToAdd,item)===-1;});}actions.push(model.getShowDefinedSubtotalsAction());}actions.push(model.getShowTotalsUnitAction(data.id,data.otp,subtotalsToAdd,subtotalsToRemove));this.controller.submitUndoRedoTemplateUpdates(this,actions,callback);}.bind(this);},onPageRendered:function onPageRendered(tbody,idx,phase,bFilled){if(this._super){this._super(tbody,idx,phase,bFilled);}this.updateScrollbars();}});}());