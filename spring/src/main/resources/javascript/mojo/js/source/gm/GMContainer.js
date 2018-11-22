(function(){mstrmojo.requiresCls("mstrmojo.dom","mstrmojo.hash","mstrmojo.array","mstrmojo.VisEnum","mstrmojo.VisUtility","mstrmojo.WidgetMatrix","mstrmojo.gm.GMEnums","mstrmojo.util.ui._HostsSplitter","mstrmojo.util.ui._LassoSelector");var $M=Math,$C=mstrmojo.chart,$VISUTILS=mstrmojo.VisUtility,BORDER_W=1,$H=mstrmojo.hash,$A=mstrmojo.array,SPLITTER_BORDER_W=2,CTRL_TYPE=mstrmojo.VisEnum.ControlType,DOCK_POSITION=mstrmojo.gm.EnumDockPosition,METRIC_TID="-1";function createSplitter(dockPosition,splitterType,splitterId){var div=document.createElement("div"),isVertical=dockPosition===DOCK_POSITION.LEFT||dockPosition===DOCK_POSITION.RIGHT,cssClass=isVertical?"gm-resizer-v":"gm-resizer-h";div.setAttribute("class",cssClass);div.setAttribute("type",CTRL_TYPE.SPLITTER);div.setAttribute("dockPosition",dockPosition);div.setAttribute("splitterType",splitterType);div.setAttribute("splitterId",splitterId);div.setAttribute("draggable","false");return div;}function positionSplitter(handle,dockPosition,panelWidth,panelHeight){if(!handle){return ;}var width,height,left,top,handleStyle=handle.style,isDockTop=dockPosition===DOCK_POSITION.TOP,isDockBottom=dockPosition===DOCK_POSITION.BOTTOM,isDockLeft=dockPosition===DOCK_POSITION.LEFT,isDockRight=dockPosition===DOCK_POSITION.RIGHT;if(isDockTop||isDockBottom){width=panelWidth;height=BORDER_W;left=0;top=-SPLITTER_BORDER_W;if(isDockBottom){top+=panelHeight;}else{top-=BORDER_W;}}else{if(isDockLeft||isDockRight){width=BORDER_W;height=panelHeight;top=0;left=-SPLITTER_BORDER_W;if(isDockRight){left+=panelWidth;}else{top-=BORDER_W;}}}handleStyle.left=left+"px";handleStyle.top=top+"px";handleStyle.width=width+"px";handleStyle.height=height+"px";}function getSVGNodeInChart(chartDiv){return chartDiv?chartDiv.firstChild:null;}function getGroupsInChart(chartDiv){return chartDiv?chartDiv.firstChild.childNodes:[];}function elementsIdMatched(unitId,arr,id,model,hasLinkAttr,normalizedIdCache){var i,n=arr.length,nId1,innerId,nId2=normalizedIdCache[id];if(!nId2){nId2=model.getNormalizedFormElementId(id);normalizedIdCache[id]=nId2;}for(i=0;i<n;i++){innerId=arr[i].id;if(innerId===id){return true;}nId1=normalizedIdCache[innerId];if(!nId1){nId1=model.getNormalizedFormElementId(innerId);normalizedIdCache[innerId]=nId1;}if(hasLinkAttr&&unitId!==METRIC_TID){if(model.compareNormalizedElementsId(nId1,nId2)){return true;}}else{if(nId1===nId2){return true;}}}return false;}function matchSelectionData(identity,selectionData,model,hasLinkAttr,normalizedIdCache){var i,n,j,m,item,unit,validValues,info=identity.getSelectedObjectInfo(true),innerMatched,unitId,unitIdsObj={},index,ruleLen=selectionData.length,rule,ruleMatched,hasAttrMatched,attrMatched;n=info.length;for(i=0;i<n;i++){unitId=String(info[i].tid);if(hasLinkAttr&&unitId!==METRIC_TID){unitIdsObj[i]=[unitId].concat(model.getLinkedAttributes(unitId)||[]);}else{unitIdsObj[i]=[unitId];}}for(index=0;index<ruleLen;index++){rule=selectionData[index];ruleMatched=true;hasAttrMatched=false;for(unit in rule){if(rule.hasOwnProperty(unit)){validValues=rule[unit];innerMatched=true;attrMatched=false;for(i=0;i<n;i++){item=unitIdsObj[i];for(j=0,m=item.length;j<m;j++){if(item[j]===unit){attrMatched=true;if(!elementsIdMatched(unit,validValues,info[i].eid,model,hasLinkAttr,normalizedIdCache)){innerMatched=false;}else{hasAttrMatched=true;}break;}}if(attrMatched){break;}}if(!innerMatched){ruleMatched=false;break;}}}if(ruleMatched&&hasAttrMatched){return true;}}return false;}function extractSelectionInfo(shape){var i,item,rtn={},identity=shape.identity,info=identity.getSelectedObjectInfo(false),n=info.length;for(i=0;i<n;i++){item=info[i];if(rtn[item.tid]===undefined){rtn[item.tid]=[{id:item.eid,n:item.v}];}else{if(item.tid===-1){rtn[item.tid].push({id:item.eid,n:item.v});}else{rtn[item.tid][0].n+=(":"+item.v);}}}return rtn;}mstrmojo.gm.GMContainer=mstrmojo.declare(mstrmojo.WidgetMatrix,[mstrmojo.util.ui._HostsSplitter,mstrmojo.util.ui._LassoSelector],{scriptClass:"mstrmojo.gm.GMContainer",enableLassoSelect:false,useAsSelectorOrBrushes:false,shouldDrawShapeFlag:true,rowSplitterEnabled:true,colSplitterEnabled:true,useDropDownBtn:false,useOwnSplitter:true,minChartHeight:20,minChartWidth:20,init:function init(props){this.hSplitters=[];this.vSplitters=[];if(this._super){this._super(props);}this.API.lassoSelected=undefined;this.API.lassoSelecting=undefined;},postBuildRendering:function(){if(this._super){this._super();}var domNode=this.domNode,domCanvas=this.domCanvas,styles=this.styles,spConfig=this.splitterConfig;if(styles){$VISUTILS.applyStyles2DomNode(domNode,styles);}if(spConfig){var div=createSplitter(spConfig.dockPosition,spConfig.splitterType,spConfig.splitterId);domNode.appendChild(div);this.registerSplitter(div);positionSplitter(div,spConfig.dockPosition,this.width,this.height);this.splitter=div;}if(this.enableLassoSelect){this.registerLassoSelector(domCanvas,[CTRL_TYPE.SPLITTER],this.useDropDownBtn);}},getSplitterInfo:function getSplitterInfo(splitter){if(!splitter){return{};}var isInChart=splitter.getAttribute("isInChart")==="yes",rtn={};if(isInChart===true){var index=parseInt(splitter.getAttribute("id"),10),isRowIndex=splitter.getAttribute("isRowIndex")==="yes",func=isRowIndex?this.API.getRowSpan:this.API.getColSpan,startIndex=func(index,this.depth)[0];rtn.min=isRowIndex?(this.getRowPosition(startIndex)+this.minChartHeight):(this.getColPosition(startIndex)+this.minChartWidth);rtn.index=index;rtn.isRowIndex=isRowIndex;rtn.isInChart=true;}else{var dockPosition=this.splitterConfig.dockPosition,isDockLeft=dockPosition===DOCK_POSITION.LEFT,isDockRight=dockPosition===DOCK_POSITION.RIGHT,isDockTop=dockPosition===DOCK_POSITION.TOP,isDockBottom=dockPosition===DOCK_POSITION.BOTTOM,config=this.splitterConfig;if(isDockLeft){rtn.max=$M.max(this.width-this.minChartWidth,0);}else{if(isDockRight){rtn.min=this.minChartWidth;}else{if(isDockTop){rtn.max=$M.max(this.height-this.minChartHeight,0);}else{if(isDockBottom){rtn.min=this.minChartHeight;}}}}if(config){rtn.dock=config.dockPosition;rtn.type=config.splitterType;rtn.id=config.splitterId;}}return rtn;},splitterMoved:function(position,info){if(position===0){return ;}if(info.isInChart){var index=info.index,isRowIndex=info.isRowIndex,manager=this.manager;if(isRowIndex){manager.resizeRow(this,index,position);manager.doUpdateInChartSplitters(true,false);}else{manager.resizeCol(this,index,position);manager.doUpdateInChartSplitters(false,true);}}else{this.manager.raiseEvent({name:"splitterMoved",position:position,info:info});positionSplitter(this.splitter,this.splitterConfig.dockPosition,this.width,this.height);}},enableSplitter:function(flag){var splitter=this.splitter;if(splitter){splitter.style.display=flag?"block":"none";}},clearCharts:function(){this.hSplitters=[];this.vSplitters=[];if(this._super){this._super();}},resize:function(dx,dy){if(this._super){this._super(dx,dy);}if(this.splitterConfig){positionSplitter(this.splitter,this.splitterConfig.dockPosition,this.width,this.height);}},resizeAbs:function(w,h){if(this._super){this._super(w,h);}if(this.splitterConfig){positionSplitter(this.splitter,this.splitterConfig.dockPosition,w,h);}},updateCharts:function(){if(this._super){this._super();}this.doUpdateInChartSplitters(true,true);},doUpdateChartsGlobally:function(){if(this._super){this._super();}},enableRowSplitter:function(flag){if(flag!==this.rowSplitterEnabled){this.rowSplitterEnabled=flag;this.doUpdateInChartSplitters(true,false);}},enableColSplitter:function(flag){if(flag!==this.colSplitterEnabled){this.colSplitterEnabled=flag;this.doUpdateInChartSplitters(false,true);}},createRowSplitter:function createRowSplitter(rowIdx){var div=document.createElement("div");div.setAttribute("class","gm-resizer-h");div.setAttribute("type",CTRL_TYPE.SPLITTER);div.setAttribute("isInChart","yes");div.setAttribute("isRowIndex","yes");div.setAttribute("draggable","false");div.setAttribute("id",String(rowIdx));return div;},createColSplitter:function createColSplitter(colIdx){var div=document.createElement("div");div.setAttribute("class","gm-resizer-v");div.setAttribute("type",CTRL_TYPE.SPLITTER);div.setAttribute("isInChart","yes");div.setAttribute("isRowIndex","no");div.setAttribute("draggable","false");div.setAttribute("id",String(colIdx));return div;},positionRowSplitter:function positionRowSplitter(div,x1,x2,y){var width=x2-x1,top=y-SPLITTER_BORDER_W-BORDER_W;div.style.cssText="width:"+width+"px; height:"+BORDER_W+"px; left:"+x1+"px; top:"+top+"px; display:block";},positionColSplitter:function positionColSplitter(div,y1,y2,x){var height=y2-y1,left=x-SPLITTER_BORDER_W-BORDER_W;div.style.cssText="width:"+BORDER_W+"px; height:"+height+"px; left:"+left+"px; top:"+y1+"px; display:block";},doUpdateInChartSplitters:function(doRow,doCol){if(!this.useOwnSplitter){return ;}this.calculateBBox();var i,x,y,div,flag,domCanvas=this.domCanvas,nRows=this.nRows,nCols=this.nCols,hs=this.hSplitters,vs=this.vSplitters,wAccArr=this.wAccArr,hAccArr=this.hAccArr,rowIndex=this.doRowIntersectionCheck(),colIndex=this.doColIntersectionCheck(),rowStart=rowIndex.start,rowEnd=rowIndex.end,colStart=colIndex.start,colEnd=colIndex.end;if(doRow){flag=this.rowSplitterEnabled;for(i=0;i<nRows;i++){div=vs[i];if(i>=rowStart&&i<=rowEnd&&i!==nRows-1&&this.getActiveFlag(i+1,colStart)===true){y=hAccArr[i];if(div===undefined){div=this.createRowSplitter(i);domCanvas.appendChild(div);this.registerSplitter(div);vs[i]=div;}this.positionRowSplitter(div,$M.max(this._x1,0),$M.min(this._x2,this.canvasW),y);div.style.display=flag?"block":"none";}else{if(div){div.style.display="none";}}}}if(doCol){flag=this.colSplitterEnabled;for(i=0;i<nCols;i++){div=hs[i];if(i>=colStart&&i<=colEnd&&i!==nCols-1&&this.getActiveFlag(rowStart,i+1)===true){x=wAccArr[i];if(div===undefined){div=this.createColSplitter(i);domCanvas.appendChild(div);this.registerSplitter(div);hs[i]=div;}this.positionColSplitter(div,$M.max(this._y1,0),$M.min(this._y2,this.canvasH),x);div.style.display=flag?"block":"none";}else{if(div){div.style.display="none";}}}}},filterShapes:function(selected,r,c,selectionData){var model=this.APIOwner.model,normalizedIdCache=this.APIOwner.normalizedIdCache,hasLinkAttr=!!model.docModel.als,chart=this.getChart(r,c);if(!chart){this.doUpdateCharts(r,r,c,c,false);chart=this.getChart(r,c);}var i,j,n,g,groupElem,shape,groups=getGroupsInChart(chart)||[],groupCount=groups.length;for(i=0;i<groupCount;i++){g=groups[i];if(!g){continue;}groupElem=g.childNodes;n=groupElem.length;for(j=0;j<n;j++){shape=groupElem[j];if(shape.getAttribute("type")==="shape"){if(matchSelectionData(shape.identity,selectionData,model,hasLinkAttr,normalizedIdCache)){selected.push(shape);}}}}},efficientFilterShapes:function(highLightIndex,r,c,selectionData){var model=this.APIOwner.model,normalizedIdCache=this.APIOwner.normalizedIdCache,hasLinkAttr=!!model.docModel.als,chart=this.getChart(r,c),identity,gc,gId,sId,sliceId,isHighlighted;if(!chart){this.doUpdateCharts(r,r,c,c,false);chart=this.getChart(r,c);}var i,j,n,g,groupElem,shape,groups=getGroupsInChart(chart)||[],groupCount=groups.length;for(i=0;i<groupCount;i++){g=groups[i];if(!g){continue;}groupElem=g.childNodes;n=groupElem.length;for(j=0;j<n;j++){shape=groupElem[j];if(shape.getAttribute("type")==="shape"){identity=shape.identity;if(identity.isPie){gc=identity.sPieDP.graphCell;gId=gc.gID;sId=gc.sID;sliceId=identity.sliceIdx;isHighlighted=highLightIndex[gId]&&highLightIndex[gId][sId]&&highLightIndex[gId][sId][sliceId];if(isHighlighted===undefined){if(highLightIndex[gId]===undefined){highLightIndex[gId]={};}if(highLightIndex[gId][sId]===undefined){highLightIndex[gId][sId]={};}highLightIndex[gId][sId][sliceId]=matchSelectionData(identity,selectionData,model,hasLinkAttr,normalizedIdCache);}}else{gc=identity.gc;gId=gc.gID;sId=gc.sID;isHighlighted=highLightIndex[gId]&&highLightIndex[gId][sId];if(isHighlighted===undefined){if(highLightIndex[gId]===undefined){highLightIndex[gId]={};}highLightIndex[gId][sId]=matchSelectionData(identity,selectionData,model,hasLinkAttr,normalizedIdCache);}}}}}},selectHighLightShapes:function(highLightIndex,r,c,selected){var chart=this.getChart(r,c),identity,gc,gId,sId,sliceId;if(!chart){this.doUpdateCharts(r,r,c,c,false);chart=this.getChart(r,c);}var i,j,n,g,groupElem,shape,groups=getGroupsInChart(chart)||[],groupCount=groups.length;for(i=0;i<groupCount;i++){g=groups[i];if(!g){continue;}groupElem=g.childNodes;n=groupElem.length;for(j=0;j<n;j++){shape=groupElem[j];if(shape.getAttribute("type")==="shape"){identity=shape.identity;if(identity.isPie){gc=identity.sPieDP.graphCell;sliceId=identity.sliceIdx;}else{gc=identity.gc;}gId=gc.gID;sId=gc.sID;if(highLightIndex[gId]===undefined){continue;}if(identity.isPie){if(highLightIndex[gId][sId]===undefined){continue;}if(highLightIndex[gId][sId][sliceId]){selected.push(shape);}}else{if(highLightIndex[gId][sId]){selected.push(shape);}}}}}},getSelectionHash:function(candidate){var attIds=$H.keyarray(candidate).sort(),hashes=[],attValIds,me=this.APIOwner;$A.forEach(attIds,function(attId){attValIds=[];$A.forEach(candidate[attId],function(attVal){attValIds.push(me.model.getNormalizedFormElementId(attVal.id));},me);hashes.push(attId+"-"+attValIds.sort().join("@"));},me);return hashes.join("#");},constructShapeMap:function(shapeMap,r,c){var chart=this.getChart(r,c);if(!chart){this.doUpdateCharts(r,r,c,c,false);chart=this.getChart(r,c);}var i,j,n,g,groupElem,shape,key,mapObj,groups=getGroupsInChart(chart)||[],groupCount=groups.length;for(i=0;i<groupCount;i++){g=groups[i];if(!g){continue;}groupElem=g.childNodes;n=groupElem.length;for(j=0;j<n;j++){shape=groupElem[j];if(shape.getAttribute("type")==="shape"){key=extractSelectionInfo.call(this,shape);key=this.getSelectionHash(key);mapObj=shapeMap[key];if(mapObj===undefined){shapeMap[key]=[];shapeMap[key].push(shape);}else{mapObj.push(shape);}}}}},intersectionCheckOnChart:function(selected,i,j,x1,x2,y1,y2){var chart=this.getChart(i,j),svg=getSVGNodeInChart(chart);if(!chart||!svg){return ;}var k,n,m,shape,ox,oy,r,g,cx=chart.offsetLeft,cy=chart.offsetTop,cw=chart.offsetWidth,ch=chart.offsetHeight,groups=getGroupsInChart(chart),groupCount=groups.length,tagName,isSelected;x1=Math.max(x1-cx,0);x2=Math.min(x2-cx,cw);y1=Math.max(y1-cy,0);y2=Math.min(y2-cy,ch);var PI=$C.ChartConstants.kPI,containPoint=function(x1,x2,y1,y2,ox,oy){return ox>=x1&&ox<=x2&&oy>=y1&&oy<=y2;},lengthSquared=function(ax,ay,bx,by){return(bx-ax)*(bx-ax)+(by-ay)*(by-ay);},isInRange=function(x,x1,x2){return x>=x1&&x<=x2;},isInArc=function(rad,radStart,radEnd){while(rad<radEnd){rad+=PI*2;}while(rad>radEnd){rad-=PI*2;}return !radStart||!radEnd||rad>=radStart;},isSegSegIntersect=function(seg1,seg2){var vect1x=seg1.x2-seg1.x1,vect1y=seg1.y2-seg1.y1,vect2x=seg2.x2-seg2.x1,vect2y=seg2.y2-seg2.y1,cp=function(v1x,v1y,v2x,v2y){return v1x*v2y-v1y*v2x;};return cp(vect1x,vect1y,seg2.x1-seg1.x1,seg2.y1-seg1.y1)*cp(vect1x,vect1y,seg2.x2-seg1.x1,seg2.y2-seg1.y1)<=0&&cp(vect2x,vect2y,seg1.x1-seg2.x1,seg1.y1-seg2.y1)*cp(vect2x,vect2y,seg1.x2-seg2.x1,seg1.y2-seg2.y1)<=0;},isSegRectIntersect=function(x1,y1,x2,y2,seg){return isSegSegIntersect({x1:x1,y1:y1,x2:x1,y2:y2},seg)||isSegSegIntersect({x1:x1,y1:y1,x2:x2,y2:y1},seg)||isSegSegIntersect({x1:x2,y1:y1,x2:x2,y2:y2},seg)||isSegSegIntersect({x1:x1,y1:y2,x2:x2,y2:y2},seg);},isArcRectIntersect=function(x1,y1,x2,y2,ox,oy,r,radStart,radEnd){var isRectEdgeIntersectArc=function(d,isEdgeVertical){var pRad,px,py;if(Math.abs(d)>r){return false;}if(isEdgeVertical){pRad=Math.acos(d/r);py=oy+r*Math.sin(pRad);return isInRange(py,y1,y2)&&isInArc(pRad,radStart,radEnd)||isInRange(2*oy-py,y1,y2)&&isInArc(-pRad,radStart,radEnd);}else{pRad=Math.asin(d/r);px=ox+r*Math.cos(pRad);return isInRange(px,x1,x2)&&isInArc(pRad,radStart,radEnd)||isInRange(2*ox-px,x1,x2)&&isInArc(PI-pRad,radStart,radEnd);}};return isRectEdgeIntersectArc(x1-ox,true)||isRectEdgeIntersectArc(y1-oy,false)||isRectEdgeIntersectArc(x2-ox,true)||isRectEdgeIntersectArc(y2-oy,false);};for(m=0;m<groupCount;m++){g=groups[m];if(!g){continue;}n=g.childNodes.length;for(k=0;k<n;k++){shape=g.childNodes[k];if(shape.getAttribute("type")==="shape"){tagName=shape.tagName;isSelected=false;if(tagName==="rect"){var x=parseInt(shape.getAttribute("x"),10),y=parseInt(shape.getAttribute("y"),10),w=parseInt(shape.getAttribute("width"),10),h=parseInt(shape.getAttribute("height"),10);isSelected=Math.max(x,0)<=x2&&Math.min(x+w,cw)>=x1&&Math.max(y,0)<=y2&&Math.min(y+h,ch)>=y1;}else{if(tagName==="circle"){ox=parseInt(shape.getAttribute("cx"),10);oy=parseInt(shape.getAttribute("cy"),10);r=parseInt(shape.getAttribute("r"),10);isSelected=lengthSquared(ox,oy,x1,y1)<r*r||lengthSquared(ox,oy,x1,y2)<r*r||lengthSquared(ox,oy,x2,y1)<r*r||lengthSquared(ox,oy,x2,y2)<r*r||containPoint(x1-r,x2+r,y1,y2,ox,oy)||containPoint(x1,x2,y1-r,y2+r,ox,oy);}else{if(tagName==="path"){ox=shape.sX;oy=shape.sY;r=shape.sR||shape.sOutR;if(!!r){var rIn=shape.sInR||0,radStart=shape.sRadStart,radEnd=shape.sRadEnd,isSector=!!shape.sRadStart,isRadiusIntersected=isSector&&(isSegRectIntersect(x1,y1,x2,y2,{x1:ox+Math.cos(radStart)*rIn,y1:oy+Math.sin(radStart)*rIn,x2:ox+Math.cos(radStart)*r,y2:oy+Math.sin(radStart)*r})||isSegRectIntersect(x1,y1,x2,y2,{x1:ox+Math.cos(radEnd)*rIn,y1:oy+Math.sin(radEnd)*rIn,x2:ox+Math.cos(radEnd)*r,y2:oy+Math.sin(radEnd)*r}));isSelected=isRadiusIntersected||isArcRectIntersect(x1,y1,x2,y2,ox,oy,rIn,radStart,radEnd)||isArcRectIntersect(x1,y1,x2,y2,ox,oy,r,radStart,radEnd)||containPoint(x1,x2,y1,y2,ox+Math.cos(radStart)*rIn,oy+Math.sin(radStart)*rIn)||isInRange(lengthSquared(x1,y1,ox,oy),rIn*rIn,r*r)&&isInArc(Math.atan((y1-oy)/(x1-ox))+(x1>ox?0:PI),radStart,radEnd);}}else{if(tagName==="polyline"||tagName==="polygon"){var points=shape.pointList||[],pointCnt=points.length,p1,p2;if(pointCnt>0){isSelected=containPoint(x1,x2,y1,y2,points[0].x,points[0].y);for(i=1;i<pointCnt&&!isSelected;i++){p1=points[i-1];p2=points[i];isSelected=isSegRectIntersect(x1,y1,x2,y2,{x1:p1.x,y1:p1.y,x2:p2.x,y2:p2.y});}if(tagName==="polygon"&&!isSelected){isSelected=(new $C.Point2D({x:x1,y:y1})).IsInPolygon(points)||isSegRectIntersect(x1,y1,x2,y2,{x1:p2.x,y1:p2.y,x2:points[0].x,y2:points[0].y});}}}}}}if(isSelected){selected.push(shape);}}}}},lassoSelecting:function(){var func=this.API.lassoSelecting;if(func){func.call(this.APIOwner);}},lassoSelected:function(info){if(!info||info.left===undefined||info.top===undefined||info.width===undefined||info.height===undefined){return ;}var i,j,rowRange,colRange,rowStart,rowEnd,colStart,colEnd,selectedCharts=[],selectedShapes=[],func=this.API.lassoSelected,x1=info.left,y1=info.top,x2=x1+info.width,y2=y1+info.height;rowRange=this.doRowIntersectionCheck(y1,y2);colRange=this.doColIntersectionCheck(x1,x2);rowStart=rowRange.start;rowEnd=rowRange.end;colStart=colRange.start;colEnd=colRange.end;for(i=rowStart;i<=rowEnd;i++){for(j=colStart;j<=colEnd;j++){selectedCharts.push({row:i,col:j});this.intersectionCheckOnChart(selectedShapes,i,j,x1,x2,y1,y2);}}info.selectedCharts=selectedCharts;info.selectedShapes=selectedShapes;if(func){func.call(this.APIOwner,info);}},lassoSelectorResized:function(info){this.lassoSelected(info);}});}());