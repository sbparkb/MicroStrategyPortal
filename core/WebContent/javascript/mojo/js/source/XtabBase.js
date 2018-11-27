(function(){mstrmojo.requiresCls("mstrmojo.Container","mstrmojo._HasScrollbox","mstrmojo.XtabZone","mstrmojo._ShowsStatus","mstrmojo.boxmodel","mstrmojo._IsLockableXtab","mstrmojo._IsDocumentTemplate","mstrmojo.hash","mstrmojo.dom","mstrmojo.chart.model.enums.EnumDSSBaseFormType");var ROW_AXIS=1,COL_AXIS=2,LOCK_OFF=0,LOCK_ROW=1,LOCK_COL=2,LOCK_BOTH=3;var CP_TITLE=1;var CP_COL_HEADERS=2;var CP_ROW_HEADERS=4;var CP_VALUES=8;var $D=mstrmojo.dom,UNSET;function onDemandCPAgg(cpList){var vCP=null;if(cpList&&cpList.length>1){vCP=new mstrmojo.XtabVACP();vCP.cps=cpList;}return vCP;}function addOnDemandCPs(rw){if(!rw||this._onDemandCP){return null;}var blockCount=rw.bc,totalRows=rw.tc,rowsRemaining=totalRows-blockCount,numCPs=Math.ceil(rowsRemaining/blockCount),rhsCPList=[],valuesCPList=[],i;for(i=0;i<numCPs;++i){var rc=Math.min(rowsRemaining,blockCount);rhsCPList.push(this.createOnDemandCP(i+1,rc,CP_ROW_HEADERS));valuesCPList.push(this.createOnDemandCP(i+1,rc,CP_VALUES));rowsRemaining-=blockCount;}this._onDemandCP={rhs:rhsCPList,vls:valuesCPList};return this._onDemandCP;}mstrmojo.XtabTitlesCP.prototype.shouldClonedLastTitleCell=function(){return false;};mstrmojo.XtabBase=mstrmojo.declare(mstrmojo.Container,[mstrmojo._IsLockableXtab,mstrmojo._HasScrollbox,mstrmojo._ShowsStatus,mstrmojo._IsDocumentTemplate],{scriptClass:"mstrmojo.XtabBase",dataRenderMode:"vscroll",shouldClipLockableXtab:true,alwaysShowFirstBlockData:false,handleClicks:function handleClicks(){return true;},markupString:'<div id="{@id}" k="{@k}" class="mstrmojo-Xtab {@cssClass}" title="{@tooltip}" style="{@domNodeCssText}"><div style="display: none;{@msgNodeCssText}"><div class="text"><div class="warning-icon"></div><div>&nbsp;</div></div></div><div class="mstrmojo-Xtab-overlay"></div><div class="mstrmojo-Xtab-content {@cssDefault}" title="{@tooltip}" style="{@viewportCssText}" mstrAttach:click,selectstart><table cellspacing="0" cellpadding="0"><tr><td style="vertical-align:top;padding:0;"><div style="position: relative;"><div class="mstrmojo-progress" style="display:none"><div class="mstrmojo-progress-barbg"><div class="mstrmojo-progress-bar"></div></div><div class="mstrmojo-progress-text"></div></div><div id="{@id}_scrollbox" style="position:relative;{@scrollboxNodeCssText};{@scrollboxNodeOverflow}"></div></div></td></tr></table></div></div>',markupSlots:{overlayNode:function(){return this.domNode;},msgNode:function(){return this.domNode.firstChild;},maskNode:function(){return this.domNode.childNodes[1];},viewport:function(){return this.domNode.lastChild;},contentNode:function(){return this.domNode.lastChild.firstChild;},scrollboxNode:function(){return this.domNode.lastChild.firstChild.rows[0].cells[0].firstChild.lastChild;},tableContainerNode:function(){return this.domNode.lastChild.firstChild.rows[0].cells[0].firstChild;},_STATUS:function(){return this.domNode.lastChild.firstChild.rows[0].cells[0].firstChild.firstChild;},_STATUS_TXT:function(){return this.domNode.lastChild.firstChild.rows[0].cells[0].firstChild.firstChild.lastChild;},_STATUS_BAR:function(){return this.domNode.lastChild.firstChild.rows[0].cells[0].firstChild.firstChild.firstChild;},_TB_CELL:function(){return this.domNode.lastChild.firstChild.rows[0].cells[0];}},markupMethods:{onvisibleChange:function(){this.domNode.style.display=(this.visible)?"block":"none";}},zone:null,lockHeadersCase:LOCK_BOTH,interactiveCellsArray:null,titlesCP:null,chsCP:null,rhsCP:null,valuesCP:null,onDemandIF:true,numRowFixed:false,heightLimit:0,height:0,widthLimit:0,width:0,useTouchScrolling:false,scrollInterval:0,selections:null,dataBlocks:null,getCellUnitIndex:function getCellUnitIndex(cell){return(cell.o!==undefined)?cell.o:cell._ei;},getCellTitleId:function getCellTitleId(cell){var rtn="";if(cell.axis&&cell.ui!==undefined){rtn=cell.axis+"A"+(cell.ui+1);}else{if(cell.mix!==undefined){rtn="0A"+cell.mix;}}return rtn;},update:function update(node){this.set("gridData",node.data[0]||node.data);var defn=this.defn||node.defn;this.sid=this.gridData.sid;this.treeType=(defn&&defn.tt)||1;this.interactiveCellsArray=[];if(this._super){return this._super(node);}return true;},initCP:function initCP(gd,interactiveCellsArray,tp,base,lkpBase,ax,cp){var props={gridData:gd,type:tp,interactiveCellsArray:interactiveCellsArray,defn:this.defn};props.base=base||props.base;props.lookupBase=lkpBase||props.lookupBase;props.axis=ax||props.axis;if(!cp){if(tp===CP_TITLE){cp=new mstrmojo.XtabTitlesCP(props);}else{cp=new mstrmojo.XtabCP(props);}}else{mstrmojo.hash.copy(props,cp);}return cp;},preBuildRendering:function preBuildRendering(){var gd=this.gridData,height=this.height,width=this.width;this.lockHeadersCase=gd.lhv||LOCK_OFF;this.selections={};this.numRowFixed=!!(!height&&gd.rw&&gd.rw.row&&(gd.rw.row.bc<gd.rw.row.tc));this.rw=gd.rw;this._onDemandCP=null;if(width){this.widthLimit=parseInt(width,10);}if(height){this.heightLimit=parseInt(height,10);}return this._super();},renderEmptyGrid:function renderEmptyGrid(){var gd=this.gridData,msgNode=this.msgNode,msgNodeStyle=msgNode.style,viewport=this.viewport;msgNode.firstChild.childNodes[1].innerHTML=gd.eg;if(gd.eg!==""){msgNodeStyle.display="block";msgNodeStyle.overflow="hidden";msgNode.className="mstrmojo-message";viewport.style.display="none";}return true;},postBuildRendering:function postBuildRendering(){var gd=this.gridData,bInitZone=!!this.viewport&&gd,msgNode=this.msgNode,viewport=this.viewport,rtn;if(gd.eg===undefined){if(msgNode.style.display==="block"){msgNode.style.display="none";viewport.style.display="block";}}else{return this.renderEmptyGrid();}if(!this.interactiveCellsArray){this.interactiveCellsArray=[];}if(bInitZone){gd.ghs=gd.ghs||[];gd.gts=gd.gts||[];this._setupZone(gd);this._setupCP(gd);var _zone=this.zone;if(_zone.parent!==this){this.addChildren(_zone);}if(this.scrollboxNode){var h=this.heightLimit;this.scrollboxHeightFixed=!isNaN(h)&&(h>0);if(this.scrollboxHeightFixed){this.scrollboxHeight=h;}this.scrollboxLeft=this.scrollboxTop=0;this.connectScrollbox(this);}}this.renderChildren();if(this.controller&&this.controller.getScrollPosition){var pos=this.controller.getScrollPosition(this.gridData.datasetId+"."+this.gridData.k);if(pos){this.scrollTo(pos);}}rtn=this._super();if(this.numRowFixed){if(!this.height){this.heightLimit=this.zone.getPageHeight(0);this.height=this.heightLimit+"px";}else{this.heightLimit=parseInt(this.height,10);}}if(((bInitZone&&this.scrollboxNode&&gd.afc)||this.numRowFixed)||(!gd.afc&&this.scrollboxNodeCssText.indexOf("width")<0)&&this.scrollboxNode.scrollWidth>this.scrollboxNode.clientWidth){this.resizeScrollBox();}this.onGridWidthChanged(true);this._onContainerGrowShrink(this.widthLimit,this.heightLimit);if($D.isIE7&&!this.scrollboxHeightFixed&&this.scrollboxNode&&this.scrollboxNode.scrollWidth>this.scrollboxNode.offsetWidth){this.scrollboxNode.style.height=this.scrollboxNode.offsetHeight+17+"px";}if(this.lockHeadersCase&&this.initLock){this.initLock({top:this.scrollboxTop,left:this.scrollboxLeft});}if(this.configureActions){this.configureActions();}return rtn;},onclick:function onclick(evt){var $D=mstrmojo.dom,target=evt.getTarget(),clickedCell=target&&$D.findAncestorByName(target,"td",true,this.viewport);if(target.nodeName.toLowerCase()==="a"&&clickedCell.getAttribute("ei")){try{var att=this.interactiveCellsArray[parseInt(clickedCell.getAttribute("ei"),10)];if(att&&att.ts===mstrmojo.chart.model.enums.EnumDSSBaseFormType.DssBaseFormHTMLTag){target.href=mstrmojo.addCSRFTokenToURL(target.href);}}catch(er){}}if(clickedCell){var a=$D.findAncestorByName(target,"span",true,clickedCell);if(a&&!evt.shiftKey&&!evt.ctrlKey){this.defaultAction(clickedCell);}else{this.doSelection(evt.e,evt.hWin,clickedCell);}}if(this.isSelectingText){this.isSelectingText=false;}},ontouchend:function ontouchend(e,hWin){this.onclick(mstrmojo._HasMarkup.newDomEvent("click",hWin,e));},onselectstart:function onselectstart(){return false;},onscroll:function onscroll(){this._alignHeaders();if(this.controller&&this.controller.addScrollPosition){this.controller.addScrollPosition(this.gridData.datasetId+"."+this.gridData.k,this.scrollboxLeft,this.scrollboxTop);}},resizeScrollBox:function resizeScrollBox(){var sb=this.scrollboxNode,ss=sb&&sb.style,tc=this._TB_CELL;if(!ss||!tc){return ;}var height=this.heightLimit;if(!height){ss.height="auto";this.scrollboxHeightFixed=false;}else{if(height>0){ss.height=height+"px";this.scrollboxHeight=height;this.scrollboxHeightFixed=true;}}this._resizeScrollBoxWidth();},_onContainerGrowShrink:function _onContainerGrowShrink(widthLimit,heightLimit){var container=mstrmojo.findAncestor(this,"fixedSizeCanGrowShrink",null,mstrmojo.DocSection),_widthLimit=widthLimit||null,_heightLimit=heightLimit||null;if(_widthLimit||_heightLimit){if(container){container.fixedSizeCanGrowShrink(this,_heightLimit,_widthLimit);}}else{if(container){container.performCanGrowCanShrink([this],true);}}},_resizeScrollBoxWidth:function _resizeScrollBoxWidth(){var sb=this.scrollboxNode,ss=sb&&sb.style,tc=this._TB_CELL;if(this.useTouchScrolling||!ss||!tc){return ;}var width=this.widthLimit;if(!width){ss.width="auto";}var fnUpdatetWidth=function(){var newWidth=(mstrmojo.dom.isIE7?(tc.scrollWidth+1):(tc.scrollWidth+(sb.offsetWidth-sb.clientWidth)));if((newWidth&&(newWidth>0))&&(!width||(width&&(newWidth<width)))&&(sb.firstChild.firstChild.offsetWidth>=sb.clientWidth)){ss.width=newWidth+"px";}};if(mstrmojo.dom.isIE7){window.setTimeout(fnUpdatetWidth,1);}else{fnUpdatetWidth();}},onGridWidthChanged:function onGridWidthChanged(noScrollBoxChange){if(!noScrollBoxChange){this._resizeScrollBoxWidth();}var widthLimit=this.widthLimit;if(!widthLimit){this.width=UNSET;}this._onContainerGrowShrink(widthLimit,null);},getGridDimension:function getGridDimension(dimension){var DIM_HEIGHT=1,dim=dimension===DIM_HEIGHT?"Height":"Width",dimLC=dim.toLowerCase(),limit=this[dimLC+"Limit"];if(!limit&&(this[dimLC]===UNSET||this[dimLC]===0)){limit=this.viewport["offset"+dim];this[dimLC]=limit+"px";return limit;}return limit||parseInt(this[dimLC],10);},_alignHeaders:function _alignHeaders(bForceRepaint){var left=this.scrollboxLeft,top=this.scrollboxTop;if(this.lockHeadersCase&&this.alignLockNodes){this.alignLockNodes(left,top);}},defaultAction:function defaultAction(td,tCell){var cell=tCell||this.getCellForNode(td),isReselectingTD=td&&td.className.indexOf("sc_")>0;if(this.model&&this.model.data&&this.model.data.visName&&this.model.data.visName==="InteractiveGridAjaxVisualizationStyle"){isReselectingTD=this.isReselectedTD(cell);if(isReselectingTD&&this.hasSelectAll&&this.hasSelectAll(cell)){this.IGCurrentSelectedCell=null;}else{this.IGCurrentSelectedCell=cell;}}var action=this.model.getAction(this.getActionCells(cell),td,isReselectingTD),handler=action&&action.h;this._currentSelectedTD=td;if(handler&&this.controller[handler]){this.controller[handler](this,action.a);return true;}return false;},createZone:function createZone(cfg){var zcfg=cfg||{},zone=this._super&&this._super(zcfg);if(!zone){zone=new mstrmojo.XtabZone(zcfg);}return zone;},_setupZone:function _setupZone(gd){this.zones={};if(!this.zone){this.zone=this.createZone({renderMode:this.dataRenderMode,cssText:"z-index: 1",slot:"scrollboxNode"});}var zone=this.zone;this.zones.origin=zone;zone.rh=gd.rh;zone.autoFitWindow=!!gd.afw;if(!this.isVIXtab){zone.tableCssClass="r-cssDefault"+(this.k?"_"+this.k:"");}zone.numColumnCanMerge=gd.gts&&gd.gts.cws?(gd.gts.cws.length-1):0;var columnWidth=[],metricNameIndex=undefined,prevRow=null,needToCombine,columnHeaders;mstrmojo.array.forEach(gd.gts&&gd.gts.row,function(row){needToCombine=prevRow&&prevRow.id===row.id;if(needToCombine){columnWidth[columnWidth.length-1]+=row.fs&&row.fs.length||1;}else{if(row.otp===-1){metricNameIndex=0;mstrmojo.array.forEach(columnWidth,function(num){metricNameIndex+=num;});}columnWidth.push(row.fs&&row.fs.length||1);}prevRow=row;});zone.acws=columnWidth;zone.rowMerge=gd.gsi&&gd.gsi.prop&&gd.gsi.prop.rows&&gd.gsi.prop.rows.mg!=="0";columnHeaders=gd.ghs&&gd.ghs.chs;zone.headerOffset=columnHeaders&&(columnHeaders.show?(columnHeaders.items&&columnHeaders.items.length||1):0)-1;zone.mxPos=metricNameIndex;},getHACP:function getHACP(){return(this._super&&this._super())||new mstrmojo.XtabHACP();},_setupCP:function _setupCP(gd){var titlesCP=this.titlesCP=this.getTitleCP(gd),chsCP=this.chsCP=this.getColumnHeadersCP(gd),rhsCP=this.rhsCP=this.getRowHeadersCP(gd),valuesCP=this.valuesCP=this.getValuesCP(gd);titlesCP.forceAutoRowHeight=chsCP.forceAutoRowHeight=gd.rh;var vacp=new mstrmojo.XtabVACP();var hacpTop=this.getHACP();hacpTop.cps=[titlesCP,chsCP];vacp.cps=[hacpTop];var hacpBottom=this.getHACP();hacpBottom.cps=[rhsCP,valuesCP];vacp.cps.push(hacpBottom);var rows=gd.gmh&&gd.gmh.gmrh,block=gd.rw&&gd.rw.row;if(rows&&block){vacp.gsmh={};vacp.gemh={};vacp.gsmh[block.bb]=rows.gsmh;vacp.gemh[block.bb+block.bc-1]=rows.gemh;}this.zone.cp=vacp;},ongridDataChange:function ongridDataChange(){var m=this.model;if(m){m.set("data",this.gridData);if(!this.dataBlocks){this.dataBlocks=[];}this.dataBlocks[0]=this.gridData;}},gridPagesRendered:function gridPagesRendered(){if(this._super){this._super();}},getTitleCP:function getTitleCP(gd){return this.initCP(gd,this.interactiveCellsArray,CP_TITLE);},getColumnHeadersCP:function getColumnHeadersCP(gd){return this.initCP(gd,this.interactiveCellsArray,CP_COL_HEADERS,gd.ghs&&gd.ghs.chs,gd.gts&&gd.gts.col,COL_AXIS);},getRowHeadersCP:function getRowHeadersCP(gd){var rhsCP=this.initCP(gd,this.interactiveCellsArray,CP_ROW_HEADERS,gd.ghs&&gd.ghs.rhs,gd.gts&&gd.gts.row,ROW_AXIS);if(this.onDemandIF&&this.rw){if(!this._onDemandCP){addOnDemandCPs.call(this,this.rw&&this.rw.row);}this.rhsCPList=[rhsCP].concat(this._onDemandCP.rhs);return onDemandCPAgg(this.rhsCPList)||rhsCP;}return rhsCP;},getValuesCP:function getValuesCP(gd){var valuesCP=this.initCP(gd,this.interactiveCellsArray,CP_VALUES,gd.gvs,gd.gts&&gd.gts.col);if(this.onDemandIF&&this.rw){if(!this._onDemandCP){addOnDemandCPs.call(this,this.rw&&this.rw.row);}this.valuesCPList=[valuesCP].concat(this._onDemandCP.vls);return onDemandCPAgg(this.valuesCPList)||valuesCP;}return valuesCP;},createOnDemandCP:function createOnDemandCP(blockNum,rc,zone){var cp=new mstrmojo.XtabOnDemandCP();cp.dataSource=this;cp.blockNum=blockNum;cp.rc=rc;return cp;},dataDownloaded:function dataDownloaded(node,memo){var idx=memo.blockNum,rhsCP=this.rhsCPList[idx],valuesCP=this.valuesCPList[idx],gd=node.data,firstgd=this.gridData;gd._bidx=idx;this.dataBlocks[idx]=gd;if(!rhsCP||!valuesCP){return ;}this.initCP(gd,this.interactiveCellsArray,CP_ROW_HEADERS,gd.ghs&&gd.ghs.rhs,gd.gts&&gd.gts.row,ROW_AXIS,rhsCP);this.initCP(gd,this.interactiveCellsArray,CP_VALUES,gd.gvs,firstgd.gts&&firstgd.gts.col,null,valuesCP);rhsCP.initContent();valuesCP.initContent();this.numRowsDownloaded+=parseInt(rhsCP.rc,10);this.updateStatus(mstrmojo.desc(8301,"Retrieving Data ..."),this.numRowsDownloaded*100/this.numRowsToDownload);var zone=this.zone;if(zone){var cp=zone.cp;if(cp){var rows=gd.gmh&&gd.gmh.gmrh,block=gd.rw&&gd.rw.row;if(rows&&block){cp.gsmh[block.bb]=rows.gsmh;cp.gemh[block.bb+block.bc-1]=rows.gemh;}}zone.dataDownloaded();}},showDownloadStatus:function shwRndrSts(numRowsToDownload){if(!numRowsToDownload){return ;}if(this.showingStatus){this.numRowsToDownload+=numRowsToDownload;}else{this.numRowsToDownload=numRowsToDownload;this.numRowsDownloaded=0;}if(this.showStatus){this.showStatus(true,mstrmojo.desc(8301,"Retrieving Data ..."),this.numRowsDownloaded*100/this.numRowsToDownload);}},closeDownloadStatus:function closeSts(){this.numRowsToDownload=0;if(this.showStatus){this.showStatus(false);}},download:function download(blockNum,evt){var rw=this.gridData.rw,rwRow=rw.row,rwCol=rw.col,maxRows=rwRow.bc;this.rhsCPList[blockNum].isDownloading=this.valuesCPList[blockNum].isDownloading=true;if(maxRows){this.controller.onDownloadGridData(this,this.model.getDownloadAction(blockNum*maxRows+1,maxRows,rwCol.bb,rwCol.bc,this.id,{blockNum:blockNum},evt));}},unrender:function unrender(ignoreDom){this.width=this.widthLimit=this.height=this.heightLimit=0;this.disconnectScrollbox(this);this._super(ignoreDom);},getCellForNode:function getCellForNode(td){var idx=td&&parseInt(td.getAttribute("ei"),10);if(isNaN(idx)){return null;}return this.interactiveCellsArray[parseInt(idx,10)];},getActionCells:function getActionCells(cell){var cells=[],selections=this.selections;var titleId=cell.axis+"A"+(cell.ui+1),selTitle=selections[titleId],i;if(selTitle&&selTitle[cell.o]){for(i in selTitle){var sc=this.getCellForNode(selTitle[i][0]);cells.push(sc);}}else{cells.push(cell);}return cells;},setModel:function setModel(model){this.model=model;if(model.data){this.set("gridData",model.data);}},delegateGridAction:function delegateGridAction(actionFn,action){if(this._shouldResponseToAction(action)){actionFn(this.zone);}},_shouldResponseToAction:function _shouldResponseToAction(action){return action!=="refreshOnDataDownloaded";},getTargetZone:function getTargetZone(){return this.zone;},destroy:function destroy(){var model=this.model;if(this.controller&&this.controller.addScrollPosition){this.controller.addScrollPosition(this.gridData.datasetId+"."+this.gridData.k,this.scrollboxLeft,this.scrollboxTop);}if(model&&model.destroy){model.destroy();}this._super();}});mstrmojo.XtabBase.EnumLockedHeaders={OFF:LOCK_OFF,ROW:LOCK_ROW,COL:LOCK_COL,BOTH:LOCK_BOTH};}());