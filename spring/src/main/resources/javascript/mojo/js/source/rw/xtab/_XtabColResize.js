(function(){mstrmojo.requiresCls("mstrmojo.array","mstrmojo.hash","mstrmojo.dom","mstrmojo.num","mstrmojo._HasOwnAvatar","mstrmojo.XtabBase","mstrmojo.models.template.DataInterface");var $A=mstrmojo.array,$DOM=mstrmojo.dom,$N=mstrmojo.num,$CFG=mstrConfig,$PX="px",CLASS_XTAB_RESIZE="xrsz",HANDLE_WIDTH_BUFFER=3,ENUM_LOCKED_HEADERS=mstrmojo.XtabBase.EnumLockedHeaders,LOCK_ROW=ENUM_LOCKED_HEADERS.ROW,LOCK_BOTH=ENUM_LOCKED_HEADERS.BOTH;function getTemplateUnits(){var gridTitlesData=this.gridData.gts;return gridTitlesData.row.concat(gridTitlesData.col);}function getIndexBasedWidthModel(){var gridData=this.gridData,lockedHeaderCase=this.lockHeadersCase,gridTitlesData=gridData.gts,gridHeaders=gridData.ghs,rhs=gridHeaders.rhs||[],chs=gridHeaders.chs||[],rowHeaderWidths=rhs.cws||[],topWidths=(gridTitlesData.cws||[]).concat(chs.cws||[]),gvs=gridData.gvs||[],bottomWidths=rowHeaderWidths.concat(gvs.cws||[]),rowNodes=this.zone.domNode.getElementsByTagName("tr"),lastRow=rowNodes&&rowNodes[rowNodes.length-1],isColumnNoWidth=false;if(lastRow){var cell=lastRow.getElementsByTagName("td")[0];gridData.xrh=(cell&&cell.offsetHeight)||0;}isColumnNoWidth=$A.some(rowHeaderWidths,function(rowHeaderWidth){return rowHeaderWidth.w==="";});if(gridData.afw||gridData.afc||isColumnNoWidth){var resizeHandlesMap=this.rszmap;if(resizeHandlesMap.length){var prevLeft={left:0};$A.forEach(resizeHandlesMap,function(leftPosObj,idx){if(topWidths[idx]){topWidths[idx].w=bottomWidths[idx].w=(leftPosObj.left-prevLeft.left)+$PX;}prevLeft=leftPosObj;});}else{var expectedColumns=Math.max(topWidths.length,bottomWidths.length);$A.forEach(rowNodes,function(trNode){var columnNodes=trNode.childNodes;if(columnNodes.length===expectedColumns){$A.forEach(trNode.getElementsByTagName("td"),function(tdNode,i){if(topWidths[i]){topWidths[i].w=$DOM.position(tdNode).w+$PX;}if(bottomWidths[i]){bottomWidths[i].w=$DOM.position(tdNode).w+$PX;}});return false;}});}}else{if(lockedHeaderCase===LOCK_ROW||lockedHeaderCase===LOCK_BOTH){var rowCount=rowHeaderWidths.length;bottomWidths[rowCount].clr=topWidths[rowCount].clr=true;}}if(bottomWidths.length!==topWidths.length){var templateUnits=getTemplateUnits.call(this);$A.forEach(templateUnits,function(templateUnit,idx){var forms=templateUnit.fs,formCount=(forms&&forms.length)||0;if(formCount>1){var currentWidth=topWidths[idx],formIdx;for(formIdx=0;formIdx<formCount-1;formIdx++){topWidths.splice(idx+formIdx+1,0,currentWidth);}}});if(bottomWidths.length>topWidths.length){topWidths.push(bottomWidths[bottomWidths.length-1]);}}return{top:topWidths,bottom:bottomWidths};}function createResizeHandles(){var resizeHandleMap=this.rszmap=[],leftPos=0,offsetLeft=0,indexBasedWidthModel=this.gridData.twm=getIndexBasedWidthModel.call(this),colWidths=indexBasedWidthModel.bottom,templateInterface=new mstrmojo.models.template.DataInterface(this.gridData),resizeColumnCount=templateInterface.getColumnHeaderData().length;$A.forEach(colWidths,function(colWidth,index){if(index>=resizeColumnCount){return false;}var width=parseInt(colWidth.w,10);offsetLeft=colWidth.clr?0:offsetLeft;leftPos+=width;offsetLeft+=width;if(($DOM.isChrome||$DOM.isSafari)&&index===resizeColumnCount-1){leftPos=leftPos-1;offsetLeft=offsetLeft-1;}resizeHandleMap.push({left:leftPos,offsetLeft:offsetLeft});});$A.forEach(resizeHandleMap,function(resizeColInfo,idx){var nextLeftObj=resizeHandleMap[idx+1],nextLeft=(nextLeftObj&&nextLeftObj.left),nextWidth=(nextLeft-resizeColInfo.left),handleNodes=[this.zone.domNode],clonedColGrid=this.getColClonedZone&&this.getColClonedZone();if(clonedColGrid){handleNodes.push(clonedColGrid);}if(!nextLeftObj||(nextWidth>(HANDLE_WIDTH_BUFFER*2))){$A.forEach(handleNodes,function addHandle(parentNode){var div=document.createElement("div"),divNodeStyle=div.style,me=this;div.setAttribute("idx",String(idx));div.className=CLASS_XTAB_RESIZE+((idx>0&&resizeHandleMap[idx-1].skipped)?" zero":"");divNodeStyle.left=isNaN(resizeColInfo.offsetLeft)?"":((resizeColInfo.offsetLeft-HANDLE_WIDTH_BUFFER)+$PX);parentNode.appendChild(div);div.ondblclick=function(evt){me.onHandleDblClick(evt);};},this);}else{resizeColInfo.skipped=true;}},this);}mstrmojo.rw.xtab._XtabColResize=mstrmojo.provide("mstrmojo.rw.xtab._XtabColResize",{_mixinName:"mstrmojo.rw.xtab._XtabColResize",rszmap:undefined,preWidth:0,onRender:function onRender(){if(this._super){this._super();}if(this.gridData.eg!==undefined){return ;}var $this=this;window.setTimeout(function(){if(!$this.hasRendered){return ;}createResizeHandles.call($this);$this.raiseEvent({name:"xtabColsMeasured"});},0);$DOM.attachMarkupEvent(this.id,this.domNode,"mousedown");},unrender:function unrender(ignoreDom){$DOM.detachEvent(this.domNode,"mousedown",mstrmojo.emptyFn);if(this.scrollboxNode&&this.scrollboxNode.style&&this.scrollboxNode.style.width){var width=this.scrollboxNode.style.width;this.preWidth=width.indexOf("px")>0?parseInt(width,10):0;}this._super(ignoreDom);},gridPagesRendered:function gridPagesRendered(){if(this._super){this._super();}},isColResizeNode:function isColResizeNode(node){return(node.className||"").indexOf(CLASS_XTAB_RESIZE)>=0;},isDragValid:function isDragValid(context){return this.isColResizeNode(context.src.node)||(this._super&&this._super(context))||false;},ondragstart:function ondragstart(context){if(this.isColResizeNode(context.src.node)){var domNodePosition=$DOM.position(this.domNode),sourceData=$DOM.findAncestorByAttr(context.src.node,"idx",true,this.domNode),index=sourceData&&parseInt(sourceData.value,10),resizeHandleMap=this.rszmap,originalWidth=resizeHandleMap[index].left-(index>0?resizeHandleMap[index-1].left:0),previousHandlerPosition=Math.max(domNodePosition.x,(context.src.pos.x-originalWidth)),templateInterface=new mstrmojo.models.template.DataInterface(this.gridData);this.rszData={idx:index,originalWidth:originalWidth,min:previousHandlerPosition,max:domNodePosition.x+domNodePosition.w,colName:templateInterface.getColumnHeaderData()[index].n};}if(this._super){this._super(context);}this.ignoreHover=true;},ondragmove:function ondragmove(context){if(this.rszData){var resizeDragData=this.rszData,sourcePos=context.src.pos,newWidth=Math.max((resizeDragData.originalWidth+(context.tgt.pos.x-sourcePos.x)),0);this.avatar.firstChild.innerHTML=resizeDragData.colName+" "+(($N.UNIT.PX==$CFG.units)?newWidth:parseFloat($N.convertUnits($N.UNIT.PX,$CFG.units,newWidth)).toFixed(2))+" "+$CFG.unitsLabel;}this._super(context);},ondragend:function ondragend(context){if(this.rszData){var gridData=this.gridData,index=this.rszData.idx,columnsData=(new mstrmojo.models.template.DataInterface(gridData)).getColumnHeaderData(),selectedHeader=columnsData[index],forms=selectedHeader.fs,formIndex=selectedHeader.fix||1;if(forms&&forms.length>0){formIndex=index-$A.find(columnsData,"id",selectedHeader.id)+1;}var selectedHeaderId=selectedHeader.oid||selectedHeader.id;this.changeColumnWidth(selectedHeaderId,selectedHeader.otp,Math.max((parseInt(getIndexBasedWidthModel.call(this).bottom[index].w,10)+(context.tgt.pos.x-context.src.pos.x)),0),formIndex,(selectedHeaderId===""&&selectedHeader.axis===2));delete this.rszData;}this._super(context);this.ignoreHover=false;},createAvatar:function createAvatar(sourceNode){var div=document.createElement("div"),divStyle=div.style,sourcePos=$DOM.position(sourceNode),domPos=$DOM.position(this.domNode);if(this.isColResizeNode(sourceNode)){this.avatarCssClass=CLASS_XTAB_RESIZE;divStyle.top=domPos.y+$PX;divStyle.left=sourcePos.x+$PX;divStyle.height=domPos.h+$PX;var tooltipCtrNode=document.createElement("div");tooltipCtrNode.className=CLASS_XTAB_RESIZE+"-ttp";var anchorNode=document.createElement("div");anchorNode.className=CLASS_XTAB_RESIZE+"-anchr";div.appendChild(tooltipCtrNode);div.appendChild(anchorNode);}else{delete this.avatarCssClass;}return div;},positionAvatar:function positionAvatar(pos,context){if(this.rszData){var avatar=this.avatar,avatarStyle=avatar.style,resizeDragData=this.rszData;if(!this.avatar||!this.rszData){return ;}avatarStyle.left=Math.min(Math.max(pos.x,resizeDragData.min),resizeDragData.max)+"px";}else{this._super(pos,context);}},preBuildRendering:function preBuildRendering(){if(!this.widthLimit&&this.preWidth){this.widthLimit=this.preWidth;}this._super();if(this.scrollboxNodeCssText.indexOf("width")===-1&&this.preWidth>0){this.scrollboxNodeCssText+="width:"+this.preWidth+"px;";}},onHandleDblClick:mstrmojo.emptyFn});}());