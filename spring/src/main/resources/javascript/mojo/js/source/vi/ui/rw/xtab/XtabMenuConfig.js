(function(){mstrmojo.requiresCls("mstrmojo.hash","mstrmojo.array","mstrmojo.elementHelper","mstrmojo.mstr.EnumFunction","mstrmojo.rw.xtab.XtabMenuConfig","mstrmojo.vi.ui.DatasetUnitMenuUtils","mstrmojo.vi.ui.NumberFormatterEditor","mstrmojo.vi.ui.CalculationMenuEditor","mstrmojo.vi.enums.EnumDerivedElementType","mstrmojo.array");mstrmojo.requiresDescs(14388,14717);var $HASH=mstrmojo.hash,$ARR=mstrmojo.array,$EH=mstrmojo.elementHelper,$DET=mstrmojo.vi.enums.EnumDerivedElementType,$DU=mstrmojo.vi.ui.DatasetUnitMenuUtils,$FN_TP=mstrmojo.mstr.EnumFunction;var ACTION_TYPES=mstrmojo.rw.xtab.XtabMenuConfig.ACTION_TYPES,ACTION_GROUP=ACTION_TYPES.GROUP,ACTION_CALCULATION=ACTION_TYPES.CALCULATION,SUBTOTAL_POSITION_FIRST=2,SUBTOTAL_POSITION_LAST=3,ROW_AXIS=1;function isAppInPresentationMode(){return(mstrApp.appState===mstrmojo.vi.VisualInsightApp.APP_STATES.PRESENTATION);}function getDrillSubMenu(ctx){if(!ctx||!ctx.items||!ctx.data||!ctx.xtab){return{};}var menuCfg=new mstrmojo.ui.menus.MenuConfig({supportsScroll:true,isHostedWithin:false,alignWithAnchor:true,maxHeight:350}),items=ctx.items,data=ctx.data,xtab=ctx.xtab,drillItems=[];if(mstrApp.rootCtrl.resolveFeature("sort-drill-paths")){items.sort(function(a,b){if(a.n>b.n){return 1;}if(a.n<b.n){return -1;}return 0;});}items.forEach(function(item,idx){if(drillItems.indexOf(item.id)===-1){drillItems.push(item.id);if(item.att){menuCfg.addPopupMenuItem(item.n,this.id,getDrillSubMenu,"xt",{items:items[idx].att,data:data,xtab:xtab});}else{menuCfg.addMenuItem(item.n,"xt",function(){xtab.drill(data,items[idx]);});}}});return menuCfg;}function getDrillMenu(cellContext){var xtab=cellContext.xtab,data=cellContext.data,model=xtab.model,dwp=model.getAllDrillWithinPathsForCell(data,undefined,true),len=dwp.length,dm=model.docModel,ds=dm.datasets[model.data.datasetId],table,items=[],dIdx=-1,hIdx,idx,newDim,newHier;if(ds&&dm.isMDXDataset(ds)){dwp.sort(function(a,b){a.did=a.id;b.did=b.id;if(a.id<b.id){return -1;}if(a.id>b.id){return 1;}return 0;});table=ds.tables[0];table.dimensions.forEach(function(dim){newDim=true;hIdx=-1;dim.hierarchies.forEach(function(hier){newHier=true;hier.att.forEach(function(att){idx=$ARR.findBin(dwp,att,"did",len);if(idx!==-1){if(newDim){items.push({id:dim.did,n:dim.n,att:[]});dIdx++;newDim=false;}if(newHier){items[dIdx].att.push({id:hier.did,n:hier.n,att:[]});hIdx++;newHier=false;}items[dIdx].att[hIdx].att.push(dwp[idx]);}});});});}else{items=dwp;}return getDrillSubMenu({items:items,data:data,xtab:xtab});}function getGroupMenu(customObj){var menuCfg=new mstrmojo.ui.menus.MenuConfig({supportsScroll:true,maxHeight:250});var xtab=customObj.xtab,deObj=customObj.deObject,groups=customObj.groups;groups.forEach(function(group,index){if(group.t===$DET.LIST&&!group.ido){menuCfg.addMenuItem(group.n,"",function(){xtab.addElementsToGroup(deObj,groups[index],index,xtab.getSelections());});}});return menuCfg;}function isGroupPresent(deObject){var groups=deObject&&deObject.des;return !!groups&&groups.some(function(derivedElement){return(derivedElement.t===$DET.LIST&&!derivedElement.ido);});}function isAddToGroupAvailable(cellContext,isSingleSelection,sameCol){var isAddToGroupSupported=false,group=undefined;if(isSingleSelection){isAddToGroupSupported=!$EH.isNonGroupNull(cellContext.data)&&this.isActionAvailable(cellContext.data,ACTION_GROUP)&&cellContext.de===undefined;}else{if(sameCol){var obj=doSelectionsSupportGroupActions.call(this,cellContext);isAddToGroupSupported=obj.isActionAvailable;group=obj.group;}}return{isAddToGroupSupported:isAddToGroupSupported,group:group};}function doSelectionsSupportGroupActions(cellContext,isUngroup){var isActionSupported,group=undefined,xtab=cellContext.xtab,groupCount=0,selCells=xtab.selCells;var uniqSelCells=selCells.filter(function(elem,pos){return selCells.indexOf(elem)===pos;});isActionSupported=!uniqSelCells.some(function(cell){var cellInfo=xtab.getCellForNode(cell);if(!$EH.isNonGroupNull(cellInfo)&&this.isActionAvailable(cellInfo,ACTION_GROUP)){if(cellInfo.dei!==undefined){group=xtab.getDEInfo(cellInfo).de;if(group.t!==$DET.LIST||++groupCount>1){return true;}}return false;}else{return true;}},this);if(isUngroup){isActionSupported=(isActionSupported)?!!group:isActionSupported;}return{isActionAvailable:isActionSupported,group:(isActionSupported)?group:undefined};}function isGroupActionSupported(cellContext){var xtab=cellContext.xtab;return !xtab.selCells.some(function(cell){var cellInfo=xtab.getCellForNode(cell);return $EH.isNonGroupNull(cellInfo)||!this.isActionAvailable(cellInfo,ACTION_GROUP)||cellInfo.dei!==undefined;},this);}function isCalculationActionSupported(xtab){var cellInfo;return !xtab.selCells.some(function(cell){cellInfo=xtab.getCellForNode(cell);return($EH.isNonGroupNull(cellInfo)||!this.isActionAvailable(cellInfo,ACTION_CALCULATION));},this);}function getFormatCalculationEditorConfig(deCellContext){var formatValue=$DU.generateNumberFormat(deCellContext&&deCellContext.de&&deCellContext.de.nf),myData=$HASH.clone(formatValue),oldData=$HASH.clone(formatValue),editorConfig=new mstrmojo.ui.menus.EditorConfig({contents:new mstrmojo.vi.ui.NumberFormatter({myData:myData,oldData:oldData,formatValue:formatValue}),data:myData}),delegateActionToXtab=this.delegateActionToXtab;$HASH.make(myData,mstrmojo.Obj);$HASH.make(oldData,mstrmojo.Obj);editorConfig.fnOk=function fnOk(){delegateActionToXtab(deCellContext,"editQuickDECalculationNumberFormat",$HASH.copy(this.data,{de:deCellContext.de}));};return editorConfig;}function getCalculationMenuConfig(deCellContext){var menuCfg=new mstrmojo.ui.menus.MenuConfig(),IDX_A_MINUS_B=4,IDX_B_MINUS_A=5,IDX_A_DIV_B=6,IDX_B_DIV_A=7,HYPHEN_SEP=" - ",FORWARD_SLASH_SEP=" / ",CALC_ITEMS={SINGLE:[{n:mstrmojo.desc(358,"Absolute"),v:$FN_TP.FunctionAbs}],PAIR:[{n:mstrmojo.desc(6017,"Add"),v:$FN_TP.FunctionAdd},{n:mstrmojo.desc(2122,"Average"),v:$FN_TP.FunctionAverage},{n:mstrmojo.desc(5868,"Least"),v:$FN_TP.FunctionLeast},{n:mstrmojo.desc(5869,"Greatest"),v:$FN_TP.FunctionGreatest},{n:"A-B",v:$FN_TP.FunctionMinus+";0"},{n:"B-A",v:$FN_TP.FunctionMinus+";1"},{n:"A/B",v:$FN_TP.FunctionDivide+";0"},{n:"B/A",v:$FN_TP.FunctionDivide+";1"}],MORE:[{n:mstrmojo.desc(6017,"Add"),v:$FN_TP.FunctionAdd},{n:mstrmojo.desc(2122,"Average"),v:$FN_TP.FunctionAverage},{n:mstrmojo.desc(5868,"Least"),v:$FN_TP.FunctionLeast},{n:mstrmojo.desc(5869,"Greatest"),v:$FN_TP.FunctionGreatest}]},isEdit=deCellContext.isEdit,de=isEdit&&deCellContext.de,data=deCellContext.data,es=de&&de.es,xtab=deCellContext.xtab,n=isEdit?(es&&es.length):xtab.getSelectionSize(),cellsNum=(n===1)?"SINGLE":((n===2)?"PAIR":"MORE"),items=CALC_ITEMS[cellsNum],func=(de&&de.func),selections;if(cellsNum==="PAIR"){if(isEdit&&de){items[IDX_A_MINUS_B].n=es[0].n+HYPHEN_SEP+es[1].n;items[IDX_B_MINUS_A].n=es[1].n+HYPHEN_SEP+es[0].n;items[IDX_A_DIV_B].n=es[0].n+FORWARD_SLASH_SEP+es[1].n;items[IDX_B_DIV_A].n=es[1].n+FORWARD_SLASH_SEP+es[0].n;}else{selections=this.xtab.selCells;var firstSelectionInnerText=selections[0].innerText||selections[0].textContent,secondSelectionInnerText=selections[1].innerText||selections[1].textContent;items[IDX_A_MINUS_B].n=firstSelectionInnerText+HYPHEN_SEP+secondSelectionInnerText;items[IDX_B_MINUS_A].n=secondSelectionInnerText+HYPHEN_SEP+firstSelectionInnerText;items[IDX_A_DIV_B].n=firstSelectionInnerText+FORWARD_SLASH_SEP+secondSelectionInnerText;items[IDX_B_DIV_A].n=secondSelectionInnerText+FORWARD_SLASH_SEP+firstSelectionInnerText;}}items.forEach(function(item){var funcType=item.v,isChecked=isEdit&&((typeof funcType==="string"&&funcType.indexOf(func)===0&&funcType.indexOf(";0")>0)||funcType===func);menuCfg.addMenuItem(item.n,"xt "+(isChecked?"checked":""),function(){var xtab=deCellContext.xtab,derivedElementFunctionType=de&&de.func;if((de&&derivedElementFunctionType===funcType)||(typeof funcType==="string"&&funcType.indexOf(derivedElementFunctionType)===0&&funcType.indexOf(";0")>0)){return ;}if(deCellContext.isEdit===true){xtab.editDECalculation(data,funcType);}else{xtab.derivedElementCalculation(data,funcType);}});},this);return menuCfg;}function addCalculationMenuOptions(initConfig){var xtab=initConfig.xtab,data=initConfig.data,deInfo=xtab.getDEInfo(data),deObject=deInfo&&deInfo.deObject,de=deInfo&&deInfo.de,derivedElementType=de&&de.t,othersDE=deObject&&xtab.getOthersDEInfo(deObject),isValueCellClick=initConfig.singleCellClick,sameCol=xtab.isSingleAttrSelection(),canDoCalculation=true,selections=xtab.getSelections(),isSingleSelection=xtab.isSingleSelection(),deCellContext={de:de,xtab:xtab,data:data,td:initConfig.td,singleClick:isValueCellClick};if(othersDE&&!isSingleSelection&&sameCol){selections.forEach(function(elements){if(elements[0]&&elements[0].eid.indexOf(othersDE.id)>-1){canDoCalculation=false;return false;}});}if(!(isSingleSelection&&derivedElementType===$DET.RESIDUE)&&(isValueCellClick||sameCol)&&this.isActionAvailable(data,ACTION_CALCULATION)&&isCalculationActionSupported.call(this,xtab)&&canDoCalculation){this.addSubMenuItem(mstrmojo.desc(5188,"Calculation"),"",this.id,getCalculationMenuConfig,$HASH.copy(deCellContext,{isEdit:false}));}}function doSelectionsSupportViewFilterActions(){var xtab=this.xtab,model=xtab.model,data=this.selectedData,selections=xtab.getSelections(),supportsViewFilterAction=!data.olap;if(selections.length>0){selections.forEach(function(selectionsArray){selectionsArray.forEach(function(selectionInfo){supportsViewFilterAction=supportsViewFilterAction&&model.supportsViewFilterActions(selectionInfo.tid);});});}else{supportsViewFilterAction=supportsViewFilterAction&&model.supportsViewFilterActions(model.getCellTitleInfo(data).title.id);}if(data.mix!==undefined){supportsViewFilterAction=supportsViewFilterAction&&model.getCellDataUnion(data).every(function(headerInfo){return model.supportsViewFilterActions(headerInfo.tid);});}return supportsViewFilterAction;}function isMetricHeader(data){return data&&data.mix!==undefined&&!!data._e;}function isAttributeHeader(data){return data&&data.otp===12;}function getNumberFormatTarget(cellContext){var data=cellContext.data,xtab=this.xtab,model=xtab.model,isMH=isMetricHeader(data),item=isMH?data._e:model.getCellTitleInfo(data).title,isMValue=!isMH&&item.otp===-1,res;if(isMValue){$ARR.forEach([data._lp,data._tp],function(currentParent){var parent=currentParent;while(parent&&parent!==parent._p&&!res){if(parent.stt){continue;}var titleInfo=model.getCellTitleInfo(parent),title=titleInfo.title,titleId=title&&title.id;if(titleId&&title.ost===12033){var deInfo=xtab.getDEInfo(parent),de=deInfo&&deInfo.de;if(de&&de.t===$DET.CALCULATION&&de.nf&&Object.keys(de.nf).length>0){res={de:de,xtab:xtab,data:parent,td:cellContext.td,singleClick:cellContext.singleClick};break;}}parent=parent._p;}return !res;});}if(!res){if(isMValue){item={oid:model.data.gsi.mx[data.mix].did,otp:4};}res={did:item.oid||item.id,t:item.otp,stp:item.ost,fs:item.fs};}return res;}function getConfigData(xtab,cfg){var data=xtab&&cfg.td&&xtab.getCellForNode(cfg.td);if(isMetricHeader(data)){data.id=data._e.oid;data.otp=data._e.otp;}return data;}function addNumberFormatOption(cellContext){var target=cellContext.de?cellContext:getNumberFormatTarget.call(this,cellContext),de=target.de,xtab=cellContext.xtab,model=xtab.model,showNumberFormat,configFn,cContext,scope=model.id;if(de){if(xtab.isSingleSelection()&&de.t===$DET.CALCULATION){showNumberFormat=true;cContext=target;configFn=getFormatCalculationEditorConfig;scope=this.id;}}else{showNumberFormat=model.showNumberFormat(target);cContext={item:target};configFn=model.getNumberFormatEditorCfg;}if(showNumberFormat){this.addEditorMenuItem(mstrmojo.desc(13237,"Number Format"),scope,configFn,cContext);}}mstrmojo.vi.ui.rw.xtab.XtabMenuConfig=mstrmojo.declare(mstrmojo.rw.xtab.XtabMenuConfig,null,{scriptClass:"mstrmojo.vi.ui.rw.xtab.XtabMenuConfig",buildXtabMenuConfig:function buildXtabMenuConfig(cfg){var xtab=this.xtab=cfg.xtab,isInPresentationMode=isAppInPresentationMode(),model=xtab.model,data=this.selectedData=cfg.data=cfg.data||getConfigData(xtab,cfg),dataset=$DU.getDatasetFromAttributeId(model.docModel.datasets,data.id),isTotalCell=!!data.stt,objectType=data.otp,objectSubType=data.ost,titleInfo=model.getCellTitleInfo(data),zonesModel=xtab.zonesModel,zonesModelID=zonesModel.id,docModel=zonesModel.docModel,item={did:data.id,t:objectType},delegateActionToXtab=this.delegateActionToXtab,sameCol=xtab.isSingleAttrSelection(),isValueCellClick=cfg.singleCellClick,supportsViewFilterActions=doSelectionsSupportViewFilterActions.call(this),deInfo=xtab.getDEInfo(data),deObject=deInfo&&deInfo.deObject,derivedElementInfo=deInfo&&deInfo.de,derivedElementType=derivedElementInfo&&derivedElementInfo.t,isRecursiveAttribute=model.isRecursiveAttribute(data.id||titleInfo.title.id),isSingleSelection=xtab.isSingleSelection(),cellContext={de:derivedElementInfo,xtab:xtab,data:data,cfg:cfg,td:cfg.td,singleClick:isValueCellClick},txtRemove=mstrmojo.desc(190,"Remove"),fnRemove,fnRename,notMDXDataset=!dataset||!docModel.isMDXDataset(dataset);this.selectedNode=cfg.td;if(cfg.onClose){this.addPopupHandlers(xtab.id,mstrmojo.emptyFn,cfg.onClose);}var formCount=xtab.model.getAttributeFormsInTemplate(data.id||titleInfo.title.id).length,formIndex=data.fix;if(formCount>1&&!deInfo){var methodName="pivot";if(!isAttributeHeader(data)){formIndex=titleInfo.title.fix||(cellContext.data.fi||0)+1;methodName+="Form";}if(formIndex){if(formIndex>1){this.addMenuItem(mstrmojo.desc(5362,"Move Left"),"",function(){delegateActionToXtab(cellContext,methodName,["l"]);});}if(formIndex<formCount){this.addMenuItem(mstrmojo.desc(5363,"Move Right"),"",function(){delegateActionToXtab(cellContext,methodName,["r"]);});}this.addSeparator();}}if(isRecursiveAttribute&&!isTotalCell){if(isAttributeHeader(data)){this.addMenuItem(mstrmojo.desc(14655,"Expand All Levels"),"",function(){delegateActionToXtab(cellContext,"raExpandAll",[true]);});this.addMenuItem(mstrmojo.desc(14656,"Collapse All Levels"),"",function(){delegateActionToXtab(cellContext,"raExpandAll",[false]);});}else{this.addMenuItem(mstrmojo.desc(14669,"Expand All Lower Levels"),"",function(){delegateActionToXtab(cellContext,"raExpandDescendants");});}}if(!isInPresentationMode){if(isMetricHeader(data)&&data.um){this.addMenuItem(mstrmojo.desc(3224,"Edit..."),"",function(){delegateActionToXtab(cellContext,"derivedMetric",["edit"]);});}if(isAttributeHeader(data)){if(xtab.getDerivedAttribute(data.id)&&notMDXDataset){this.addMenuItem(mstrmojo.desc(3224,"Edit..."),"",function(){zonesModel.editDerivedAttribute({item:{did:item.did,t:item.t,n:data.n}});});}}if(this.isActionAvailable(data,ACTION_TYPES.GROUP_EDIT)&&deObject){this.addMenuItem(mstrmojo.desc(13296,"Edit Groups..."),"",function(){delegateActionToXtab(cellContext,"derivedElementsEdit",[deInfo]);});}if(isSingleSelection&&derivedElementType===$DET.CALCULATION){this.addSubMenuItem(mstrmojo.desc(12196,"Edit Calculation"),"",this.id,getCalculationMenuConfig,$HASH.copy(cellContext,{isEdit:true}));}}this.addSeparator();this.addSortMenuItem(cellContext);if(xtab.model.getAllDrillPathsForCell(data).length>1){this.addSeparator();}if(!isInPresentationMode){if(isSingleSelection&&derivedElementType===$DET.LIST){this.addSeparator();this.addMenuItem(mstrmojo.desc(13395,"Edit Group..."),"",function(){delegateActionToXtab(cellContext,"derivedElementsEdit",deInfo);});}if((isSingleSelection&&derivedElementType===$DET.LIST)||(sameCol&&!isSingleSelection&&doSelectionsSupportGroupActions.call(this,cellContext,true).isActionAvailable)){this.addMenuItem(mstrmojo.desc(12195,"Ungroup"),"",function(){delegateActionToXtab(cellContext,"removeQuickDE",deInfo);});}if(isSingleSelection&&derivedElementType===$DET.RESIDUE){this.addMenuItem(mstrmojo.desc(12195,"Ungroup"),"",function(){delegateActionToXtab(cellContext,"separateOthers",[derivedElementInfo]);});}if(isAttributeHeader(data)&&!zonesModel.isDynamicLink(item)){this.addSeparator();if((!dataset||!$DU.hasCGorCon(dataset))&&notMDXDataset){this.addMenuItem(mstrmojo.desc(13625,"Create Attribute..."),"",function(){delegateActionToXtab(cellContext,"newDerivedAttribute");});this.addMenuItem(mstrmojo.desc(14717,"Create Links..."),"",function(){delegateActionToXtab(cellContext,"newDynamicLinkAttr");});}if(this.isActionAvailable(data,ACTION_TYPES.GROUP_EDIT)&&!deObject&&!isRecursiveAttribute){this.addMenuItem(mstrmojo.desc(13295,"Create Groups..."),"",function(){delegateActionToXtab(cellContext,"derivedElementsEdit",[deInfo]);});}this.addSeparator();}}if(!isTotalCell&&this.isActionAvailable(data,ACTION_TYPES.KEEP_ONLY)&&supportsViewFilterActions){this.addSeparator();var fnGetKeepOrExcludeFn=function(isKeep){return function(){delegateActionToXtab(cellContext,"keepOnlyOrExclude",[isKeep]);};};this.addMenuItem(mstrmojo.desc(11701,"Keep Only"),"",fnGetKeepOrExcludeFn(true));this.addMenuItem(mstrmojo.desc(3946,"Exclude"),"",fnGetKeepOrExcludeFn(false));}if(!isTotalCell){this.addDrillMenuItem(cellContext);}if(data&&data.mix===undefined&&titleInfo.isSrcTitle&&objectType!==-1&&objectType!==1&&!(objectType===47&&objectSubType===12032)){this.addShowTotalMenuItem(cellContext);}var axis=data.axis;if(!isInPresentationMode){if(zonesModel.shouldShowDisplayFormsMenu(item)){this.addPopupMenuItem(mstrmojo.desc(11908,"Display Attribute Forms"),this.id,function(){return $DU.getDisplayFormsMenu(item,xtab,xtab.model.docModel.datasets,function(actions){zonesModel.submitDropZoneUpdates(actions);});});}this.addSeparator();if((isValueCellClick||sameCol)&&this.isActionAvailable(data,ACTION_GROUP)&&isGroupActionSupported.call(this,cellContext)&&!isRecursiveAttribute){this.addMenuItem(mstrmojo.desc(1911,"Group"),"",function(){delegateActionToXtab(cellContext,"derivedElementGroup");});}var customObj=isGroupPresent(deObject)&&isAddToGroupAvailable.call(this,cellContext,isSingleSelection,sameCol);if(!!customObj.isAddToGroupSupported){this.addAddToGroupMenuItem(cellContext.xtab,deObject,customObj.group);}if(isMetricHeader(data)){var tdData=xtab&&cfg.td&&xtab.getCellForNode(cfg.td)._e,headerItem={did:tdData.oid,t:tdData.otp},itemContext={zone:{id:-1,items:xtab.model.data.gsi.mx},axis:axis,idx:data.idx,item:headerItem};this.addSeparator();if(docModel.findDatasetIdFromUnit(headerItem.did)&&!docModel.isFromSolrCube(headerItem.did)&&!docModel.isFromMDXCube(headerItem.did)){this.addSubMenuItem(mstrmojo.desc(11806,"Aggregate By"),"",zonesModelID,zonesModel.getAggregateByMetricSubMenu,itemContext);this.addSeparator();}this.addSubMenuItem(mstrmojo.desc(5188,"Calculation"),"",zonesModelID,zonesModel.getCalculationEditorCfg,itemContext);this.addSubMenuItem(mstrmojo.desc(12287,"Shortcut Metric"),"",zonesModelID,zonesModel.getShortcutMetricSubMenu,itemContext);this.addMenuItem(mstrmojo.desc(13624,"Create Metric..."),"",function(){delegateActionToXtab(cellContext,"derivedMetric",["editNew"]);});}if(!isMetricHeader(data)&&!objectType&&!isRecursiveAttribute){addCalculationMenuOptions.call(this,cfg);}this.addSeparator();if(!isTotalCell){addNumberFormatOption.call(this,cellContext);}if(isMetricHeader(data)||isAttributeHeader(data)){this.addThresholdMenuOptions(cellContext);}}if(isMetricHeader(data)){this.addToggleMenuItem(mstrmojo.desc(6193,"Show Totals"),"",function(){zonesModel.showQuickSubtotals();},function(){zonesModel.hideDefinedSubtotals();},null,zonesModel.hasVisibleSubtotals());}if(!isTotalCell&&this.isActionAvailable(data,ACTION_TYPES.KEEP_ONLY)&&supportsViewFilterActions){this.addSeparator();this.addMenuItem(mstrmojo.desc(13537,"Show Data..."),"",function(){mstrmojo.vi.ui.ViewDataDialog.open(xtab.parent,true);});}var gts=xtab.gridData.gts,menuStr,positions=[gts.rowSubPos,gts.colSubPos],currentPos,isRowAxis;if(isTotalCell){isRowAxis=axis===ROW_AXIS;currentPos=positions[axis-1];if(currentPos===SUBTOTAL_POSITION_FIRST){menuStr=isRowAxis?mstrmojo.desc(12206,"Move to Bottom"):mstrmojo.desc(13900,"Move to Right");positions[axis-1]=SUBTOTAL_POSITION_LAST;}else{menuStr=isRowAxis?mstrmojo.desc(12205,"Move to Top"):mstrmojo.desc(13901,"Move to Left");positions[axis-1]=SUBTOTAL_POSITION_FIRST;}this.addMenuItem(menuStr,"",function(){model.moveSubTotals(cellContext,positions);});}if(this.isActionAvailable(data,ACTION_TYPES.TOTAL_HEADER)&&data.mix===undefined){fnRemove=function(){delegateActionToXtab(cellContext,"removeTotal");};}if(!isInPresentationMode&&isSingleSelection&&derivedElementType===$DET.LIST){fnRename=function(){delegateActionToXtab(cellContext,"renameDEList",deInfo);};}if(isSingleSelection&&derivedElementType===$DET.CALCULATION){fnRename=function(){this.delegateActionToXtab(cellContext,"editDECalculation");}.bind(this);fnRemove=function(){this.delegateActionToXtab(cellContext,"removeQuickDE",deInfo);}.bind(this);txtRemove=mstrmojo.desc(12197,"Delete Calculation");}this.addSeparator();if(!isInPresentationMode&&!isTotalCell){var unitContainer=xtab.parent;if(unitContainer.addFormatMenuItem){unitContainer.addFormatMenuItem(this,{info:titleInfo,isMetricHeader:isMetricHeader(data)},function(fmtTarget){var previousSelections=xtab.highlightFormatTarget(fmtTarget);xtab.openPopup(xtab.edtModel.getFormattingToolbar(fmtTarget,cfg.td,{onClose:function(){xtab.restoreHighlights(previousSelections);}}));});}}if((titleInfo&&titleInfo.isSrcTitle)||isMetricHeader(data)){this.addPopupMenuItem(mstrmojo.desc(14003,"Replace with"),zonesModelID,zonesModel.getReplaceSubMenu,"",{zone:zonesModel.getZoneForObject(titleInfo.title.id||data.id),item:item});}if(fnRename){this.addMenuItem(mstrmojo.desc(2453,"Rename..."),"",fnRename);}if(fnRemove){this.addMenuItem(txtRemove,"",fnRemove);}if(!isInPresentationMode){if((titleInfo&&titleInfo.isSrcTitle)||isMetricHeader(data)){if(!fnRename){this.addMenuItem(mstrmojo.desc(2453,"Rename..."),"",function(){delegateActionToXtab(cellContext,"renameUnit");});}if(!fnRemove){this.addMenuItem(txtRemove,"",function(){delegateActionToXtab(cellContext,"removeUnit");});}}}if(xtab.isCopySupported&&!isTotalCell&&!isAttributeHeader(data)&&!isMetricHeader(data)){this.addSeparator();this.addMenuItem(mstrmojo.desc(14388,"Copy Rows"),"",function(){delegateActionToXtab(cellContext,"copyRowsFromXtab",[xtab.selCells]);});}},addAddToGroupMenuItem:function(xtab,deObject,group){var groups=(deObject&&deObject.des)||[];this.addPopupMenuItem(mstrmojo.desc(14553,"Add to Group"),this.id,getGroupMenu,"",{xtab:xtab,deObject:deObject,groups:group?[group]:groups});},addDrillMenuItem:function addDrillMenuItem(cellContext){var xtab=cellContext.xtab,data=cellContext.data,drillWithinPaths=xtab.model.getUnHiddenDrillPathsForCell(data),drillWithinPathCount=drillWithinPaths.length;if(!(isMetricHeader(data)||data.mix!==undefined)){if(drillWithinPathCount>1){this.addSubMenuItem(mstrmojo.desc(145,"Drill"),"",this.id,getDrillMenu,cellContext);}else{if(drillWithinPathCount===1){this._super(cellContext,drillWithinPaths[0]);}else{this.addNonInteractiveMenuItem(mstrmojo.desc(145,"Drill"),"",true);}}}},getSubtotalEditorConfig:function getSubtotalEditorConfig(cellContext){var cfgEditor=this._super(cellContext),data=cellContext.data,xtab=cellContext.xtab;cfgEditor.fnOk=xtab.getOnSubtotalsChangeFn(cfgEditor,data);return cfgEditor;},addThresholdMenuOptions:function addThresholdMenuOptions(cellContext){var _e=cellContext.data._e||cellContext.data,item={did:_e.oid||_e.id,t:_e.otp,n:_e.n};this.xtab.model.buildThresholdMenuOptions(this,{item:item},false,true);}});}());