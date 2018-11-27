(function(){mstrmojo.requiresCls("mstrmojo.dom","mstrmojo.Widget","mstrmojo.util.ui._HostsSplitter","mstrmojo.util.ui._LassoSelector");var $M=Math,$D=mstrmojo.dom,$CSS=mstrmojo.css,WIN_BUFFER_SIZE=1,BORDER_W=1,SPLITTER_BORDER_W=2,MIN_CHART_H=20,MIN_CHART_W=20,DOCK_POSITION={TOP:1,RIGHT:2,BOTTOM:3,LEFT:4},RESIZE_MODE={NORMAL:0,PERCENTILE:1};function doHitTest(arr,value){if(value===undefined||isNaN(value)){console.log("Invalid input to function doHitTest.");}value=value||0;var m,p,q,n=arr.length;if(n<1||value<=arr[0]){return 0;}if(value>arr[n-1]){return n-1;}p=0;q=n-1;while(q-p>1){m=p+((q-p)>>1);if(arr[m]===value){return m;}if(arr[m]<value){p=m;}else{if(arr[m]>value){q=m;}}}return q;}function createRowSplitter(rowIdx){var div=document.createElement("div");div.setAttribute("class","gm-resizer-h");div.setAttribute("type","splitter");div.setAttribute("isInChart","yes");div.setAttribute("isRowIndex","yes");div.setAttribute("draggable","false");div.setAttribute("id",String(rowIdx));return div;}function createColSplitter(colIdx){var div=document.createElement("div");div.setAttribute("class","gm-resizer-v");div.setAttribute("type","splitter");div.setAttribute("isInChart","yes");div.setAttribute("isRowIndex","no");div.setAttribute("draggable","false");div.setAttribute("id",String(colIdx));return div;}function positionRowSplitter(div,x1,x2,y){var width=x2-x1,top=y-SPLITTER_BORDER_W-BORDER_W;div.style.cssText="width:"+width+"px; height:"+BORDER_W+"px; left:"+x1+"px; top:"+top+"px; display:block";}function positionColSplitter(div,y1,y2,x){var height=y2-y1,left=x-SPLITTER_BORDER_W-BORDER_W;div.style.cssText="width:"+BORDER_W+"px; height:"+height+"px; left:"+left+"px; top:"+y1+"px; display:block";}function createSplitter(dockPosition,splitterType,splitterId){var div=document.createElement("div"),isVertical=dockPosition===DOCK_POSITION.LEFT||dockPosition===DOCK_POSITION.RIGHT,cssClass=isVertical?"gm-resizer-v":"gm-resizer-h";div.setAttribute("class",cssClass);div.setAttribute("type","splitter");div.setAttribute("dockPosition",dockPosition);div.setAttribute("splitterType",splitterType);div.setAttribute("splitterId",splitterId);div.setAttribute("draggable","false");return div;}function positionSplitter(handle,dockPosition,panelWidth,panelHeight){if(!handle){return ;}var width,height,left,top,handleStyle=handle.style,isDockTop=dockPosition===DOCK_POSITION.TOP,isDockBottom=dockPosition===DOCK_POSITION.BOTTOM,isDockLeft=dockPosition===DOCK_POSITION.LEFT,isDockRight=dockPosition===DOCK_POSITION.RIGHT;if(isDockTop||isDockBottom){width=panelWidth;height=BORDER_W;left=0;top=-SPLITTER_BORDER_W;if(isDockBottom){top+=panelHeight;}else{top-=BORDER_W;}}else{if(isDockLeft||isDockRight){width=BORDER_W;height=panelHeight;top=0;left=-SPLITTER_BORDER_W;if(isDockRight){left+=panelWidth;}else{top-=BORDER_W;}}}handleStyle.left=left+"px";handleStyle.top=top+"px";handleStyle.width=width+"px";handleStyle.height=height+"px";}function containPoint(x1,x2,y1,y2,ox,oy){return(ox>=x1&&ox<=x2&&oy>=y1&&oy<=y2);}mstrmojo.WidgetMatrixViewer=mstrmojo.declare(mstrmojo.Widget,[mstrmojo.util.ui._HostsSplitter,mstrmojo.util.ui._LassoSelector],{scriptClass:"mstrmojo.WidgetMatrixViewer",left:0,top:0,width:100,height:100,phCss:"",nRows:1,nCols:1,chartW:100,chartH:100,fixWidth:false,fixHeight:false,depth:undefined,enableLassoSelect:false,origin:undefined,offset:undefined,hArr:undefined,hAccArr:undefined,wArr:undefined,wAccArr:undefined,domHSBar:undefined,domVSBar:undefined,domHSBarBody:undefined,domVSBarBody:undefined,hSplitters:undefined,vSplitters:undefined,chartsPool:undefined,activeCharts:undefined,activeFlags:undefined,API:undefined,APIOwner:undefined,markupString:'<div class="{@cssClass}" style="position:absolute; left:{@left}px; top:{@top}px; width:{@width}px; height:{@height}px;"><div style="position:absolute; left:0px; bottom:0px; width:100%; height:100%; overflow:hidden"><div class="canvas" style="position:absolute; width:{@canvasW}px; height:{@canvasH}px"></div></div><span style="visibility:hidden"></span></div>',markupSlots:{domContainer:function(){return this.domNode.firstChild;},domCanvas:function(){return this.domNode.firstChild.firstChild;},domSpan:function(){return this.domNode.lastChild;}},init:function init(props){this.origin={x:0,y:0};this.offset={x:{s:0,e:0},y:{s:0,e:0}};this.hSplitters=[];this.vSplitters=[];this.chartsPool=[];this.activeCharts=[];this.activeFlags=[];this.API={handleDroppedChart:undefined,getChartWidth:undefined,getChartHeight:undefined,createUnitChart:undefined,updateUnitChart:undefined,getRowSpan:function(i,depth){return[i,i];},getColSpan:function(i,depth){return[i,i];},lassoSelected:undefined};var ph=props.placeholder;if(ph!==undefined){this.cssClass=ph.getAttribute("class");if(!this.cssClass){this.cssClass="";}if(props.hasOwnProperty("width")===false){props.width=ph.clientWidth;}if(props.hasOwnProperty("height")===false){props.height=ph.clientHeight;}if(props.hasOwnProperty("left")===false){props.left=ph.offsetLeft;}if(props.hasOwnProperty("top")===false){props.top=ph.offsetTop;}}if(this._super){this._super(props);}},preBuildRendering:function(){this.resetGrid();},postBuildRendering:function(){if(this._super){this._super();}var spConfig=this.splitterConfig;if(spConfig){var div=createSplitter(spConfig.dockPosition,spConfig.splitterType,spConfig.splitterId);this.domNode.appendChild(div);this.registerSplitter(div);positionSplitter(div,spConfig.dockPosition,this.width,this.height);this.splitter=div;}var span=this.domSpan,style;span.setAttribute("class",this.phCss);style=$CSS.getComputedStyle(span);this.borderL=parseInt(style.borderLeftWidth,10)||0;this.borderR=parseInt(style.borderRightWidth,10)||0;this.borderT=parseInt(style.borderTopWidth,10)||0;this.borderB=parseInt(style.borderBottomWidth,10)||0;this.borderH=this.borderL+this.borderR;this.borderV=this.borderT+this.borderB;if(this.enableLassoSelect){this.registerLassoSelector(this.domCanvas,["splitter"]);}},getSplitterInfo:function getSplitterInfo(splitter){if(!splitter){return{};}var isInChart=splitter.getAttribute("isInChart")==="yes",rtn={};if(isInChart===true){var index=parseInt(splitter.getAttribute("id"),10),isRowIndex=splitter.getAttribute("isRowIndex")==="yes",func=isRowIndex?this.API.getRowSpan:this.API.getColSpan,startIndex=func(index,this.depth)[0];rtn.min=isRowIndex?(this.getRowPosition(startIndex)+MIN_CHART_H):(this.getColPosition(startIndex)+MIN_CHART_W);rtn.index=index;rtn.isRowIndex=isRowIndex;rtn.isInChart=true;}else{var dockPosition=this.splitterConfig.dockPosition,isDockLeft=dockPosition===DOCK_POSITION.LEFT,isDockRight=dockPosition===DOCK_POSITION.RIGHT,isDockTop=dockPosition===DOCK_POSITION.TOP,isDockBottom=dockPosition===DOCK_POSITION.BOTTOM,config=this.splitterConfig;if(isDockLeft){rtn.max=$M.max(this.width-MIN_CHART_W,0);}else{if(isDockRight){rtn.min=MIN_CHART_W;}else{if(isDockTop){rtn.max=$M.max(this.height-MIN_CHART_H,0);}else{if(isDockBottom){rtn.min=MIN_CHART_H;}}}}if(config){rtn.dock=config.dockPosition;rtn.type=config.splitterType;rtn.id=config.splitterId;}}return rtn;},splitterMoved:function(position,info){if(position===0){return ;}if(info.isInChart){var index=info.index,isRowIndex=info.isRowIndex,manager=this.manager;if(isRowIndex){manager.resizeRow(this,index,position);}else{manager.resizeCol(this,index,position);}manager.drawCharts();}else{this.manager.raiseEvent({name:"splitterMoved",position:position,info:info});positionSplitter(this.splitter,this.splitterConfig.dockPosition,this.width,this.height);}},enableSplitter:function(flag){var splitter=this.splitter;splitter.style.display=flag?"block":"none";},clearCharts:function(){this.hSplitters=[];this.vSplitters=[];this.chartsPool=[];this.activeCharts=[];this.activeFlags=[];if(this.domCanvas){this.domCanvas.innerHTML="";}},getChart:function(i,j){var pool=this.chartsPool;if(pool[i]===undefined){return undefined;}return pool[i][j];},addChart:function(i,j,node){var pool=this.chartsPool;if(pool[i]===undefined){pool[i]=[];}pool[i][j]=node;},getActiveFlag:function(i,j){var matrix=this.activeFlags;if(matrix[i]===undefined||matrix[i][j]===undefined){return false;}return matrix[i][j];},setActiveFlag:function(i,j,flag){var matrix=this.activeFlags;if(matrix[i]===undefined){matrix[i]=[];}matrix[i][j]=flag;},resize:function(dx,dy){this.width+=dx;this.height+=dy;this.offset.x.e=$M.max(this.domCanvas.clientWidth-this.width,0);this.offset.y.e=$M.max(this.domCanvas.clientHeight-this.height,0);this.domNode.style.width=this.width+"px";this.domNode.style.height=this.height+"px";if(this.fixHeight&&this.nRows===1){this.chartH+=dy;}if(this.fixWidth&&this.nCols===1){this.chartW+=dx;}if(this.splitterConfig){positionSplitter(this.splitter,this.splitterConfig.dockPosition,this.width,this.height);}},resizeAbs:function(w,h){var deltaW=w-this.width,deltaH=h-this.height;this.width=w;this.height=h;this.offset.x.e=$M.max(this.domCanvas.clientWidth-w,0);this.offset.y.e=$M.max(this.domCanvas.clientHeight-h,0);this.domNode.style.width=w+"px";this.domNode.style.height=h+"px";if(this.splitterConfig){positionSplitter(this.splitter,this.splitterConfig.dockPosition,w,h);}if(this.fixHeight&&this.nRows===1){this.resizeRow([0],[deltaH]);this.doUpdateChartsGlobally();this.chartH=h;}if(this.fixWidth&&this.nCols===1){this.resizeCol([0],[deltaW]);this.doUpdateChartsGlobally();this.chartW=w;}},setRowHeight:function(i,h){this.hArr[i]=h;return this.updateAccHeight(i,i);},setColWidth:function(j,w){this.wArr[j]=w;return this.updateAccWidth(j,j);},resizeRow:function(rows,deltas){var i,j,dy,deltaInTotal=0;for(i=0;i<rows.length;i+=1){j=rows[i];dy=deltas[i];deltaInTotal+=this.setRowHeight(j,this.getRowHeight(j)+dy);}if(deltaInTotal!==0){this.updateCanvas(0,deltaInTotal);}},resizeCol:function(cols,deltas){var i,j,dx,deltaInTotal=0;for(i=0;i<cols.length;i+=1){j=cols[i];dx=deltas[i];deltaInTotal+=this.setColWidth(j,this.getColWidth(j)+dx);}if(deltaInTotal!==0){this.updateCanvas(deltaInTotal,0);}},highlightRows:function(rowStart,rowEnd,flag){var i,idx,span,node,activeCharts=this.activeCharts,n=activeCharts.length;for(i=0;i<n;i+=1){node=activeCharts[i];idx=parseInt(node.getAttribute("row"),10);span=parseInt(node.getAttribute("rowSpan"),10);if(idx>=rowStart&&(idx+span-1)<=rowEnd){if(flag){$CSS.addClass(node,"highlight");}else{$CSS.removeClass(node,"highlight");}}}},highlightCols:function(colStart,colEnd,flag){var i,idx,span,node,activeCharts=this.activeCharts,n=activeCharts.length;for(i=0;i<n;i+=1){node=activeCharts[i];idx=parseInt(node.getAttribute("col"),10);span=parseInt(node.getAttribute("colSpan"),10);if(idx>=colStart&&(idx+span-1)<=colEnd){if(flag){$CSS.addClass(node,"highlight");}else{$CSS.removeClass(node,"highlight");}}}},scrollTo:function(x,y,updateSB){var hsbar,vsbar,org=this.origin;if(x===undefined){x=org.x;}if(y===undefined){y=org.y;}if(x===org.x&&y===org.y){return ;}org.x=x;org.y=y;this.domCanvas.style[$D.CSS3_TRANSFORM]=$D.createTranslateString(-x,-y,0);if(updateSB===true){hsbar=this.domHSBar;vsbar=this.domVSBar;if(hsbar){hsbar.scrollLeft=x;}if(vsbar){vsbar.scrollTop=y;}}},adjustOriginIfNeeded:function(){var toX,toY,origin=this.origin,offset=this.offset,orgX=origin.x,orgY=origin.y,offsetX=offset.x,offsetY=offset.y;if(orgX<offsetX.s||orgX>offsetX.e){toX=offsetX.s;}if(orgY<offsetY.s||orgY>offsetY.e){toY=offsetY.s;}this.scrollTo(toX,toY,true);},createMiniChart:function(w,h,t,l,row,col,nr,nc){var lr=row,lc=col;if(this.depth){if(this.depthOnRow){lr=this.depth;}else{lc=this.depth;}}w-=this.borderH;h-=this.borderV;if(this.API.createUnitChart!==undefined){if(this.APIOwner){return this.API.createUnitChart.call(this.APIOwner,w,h,t,l,lr,lc,nr,nc,this.phCss);}return this.API.createUnitChart(w,h,t,l,lr,lc,nr,nc,this.phCss);}return this.createMiniPH(w,h,t,l,lr,lc,nr,nc,this.phCss);},createMiniPH:function(w,h,t,l,row,col,nr,nc,phCss){var div=document.createElement("div");div.setAttribute("row",row);div.setAttribute("col",col);div.setAttribute("class",phCss);div.setAttribute("rowSpan",nr);div.setAttribute("colSpan",nc);div.style.width=w+"px";div.style.height=h+"px";div.style.top=t+"px";div.style.left=l+"px";return div;},updateMiniChart:function(div,w,h,t,l){if(w){w-=this.borderH;}if(h){h-=this.borderV;}if(this.API.updateUnitChart!==undefined){if(this.APIOwner){this.API.updateUnitChart.call(this.APIOwner,div,w,h,t,l);}else{this.API.updateUnitChart(div,w,h,t,l);}}else{if(w){div.style.width=w+"px";}if(h){div.style.height=h+"px";}if(t){div.style.top=t+"px";}if(l){div.style.left=l+"px";}}},shiftCharts:function(dx,dy){if(dx===0&&dy===0){return ;}var i,node,charts=this.activeCharts,len=charts.length;for(i=0;i<len;i+=1){node=charts[i];if(dx!==0){node.style.left=node.offsetLeft+dx+"px";}if(dy!==0){node.style.top=node.offsetTop+dy+"px";}}},updateCanvas:function(deltaX,deltaY,updateOrgX,updateOrgY){var dom=this.domCanvas,w=dom.offsetWidth,h=dom.offsetHeight,nw=w+deltaX,nh=h+deltaY,hsbar=this.domHSBarBody,vsbar=this.domVSBarBody,offset=this.offset,origin=this.origin,orgX=origin.x,orgY=origin.y,xEnd=offset.x.e,yEnd=offset.y.e,xTouchEnd=orgX===xEnd,yTouchEnd=orgY===yEnd,xTouchStart=orgX===0,yTouchStart=orgY===0,updateWidth=function(){if(deltaX===0){return ;}if(hsbar){hsbar.style.width=nw-BORDER_W+"px";}dom.style.width=nw+"px";offset.x.e=$M.max(xEnd+deltaX,0);},updateHeight=function(){if(deltaY===0){return ;}if(vsbar){vsbar.style.height=nh-BORDER_W+"px";}dom.style.height=nh+"px";offset.y.e=$M.max(yEnd+deltaY,0);},updateOriginIfNeeded=function(){if(updateOrgX===true){orgX+=deltaX;}if(updateOrgY===true){orgY+=deltaY;}if((orgX>offset.x.e)||(!xTouchStart&&xTouchEnd&&orgX<offset.x.e)){orgX=offset.x.e;}if((orgY>offset.y.e)||(!yTouchStart&&yTouchEnd&&orgY<offset.x.e)){orgY=offset.y.e;}};this.canvasW=nw;this.canvasH=nh;updateWidth();updateHeight();updateOriginIfNeeded();this.scrollTo(orgX,orgY,true);},calculateBBox:function(){var x0=this.origin.x,y0=this.origin.y,w=this.width,h=this.height;this._x1=x0-w*WIN_BUFFER_SIZE;this._x2=x0+w*(WIN_BUFFER_SIZE+1);this._y1=y0-h*WIN_BUFFER_SIZE;this._y2=y0+h*(WIN_BUFFER_SIZE+1);},calculateMatrixBBox:function(){var i,r,c,rsp,csp,node,list=this.activeCharts,n=list.length;this._minRow=this.nRows;this._maxRow=-1;this._minCol=this.nCols;this._maxCol=-1;for(i=0;i<n;i+=1){node=list[i];r=parseInt(node.getAttribute("row"),10);c=parseInt(node.getAttribute("col"),10);rsp=this.API.getRowSpan(r,this.depth);csp=this.API.getColSpan(c,this.depth);this._minRow=$M.min(this._minRow,rsp[0]);this._maxRow=$M.max(this._maxRow,rsp[1]);this._minCol=$M.min(this._minCol,csp[0]);this._maxCol=$M.max(this._maxCol,csp[1]);}},isRowInSight:function(r){this.calculateMatrixBBox();return r>=this._minRow&&r<=this._maxRow;},isColInSight:function(c){this.calculateMatrixBBox();return c>=this._minCol&&c<=this._maxCol;},detachDomCanvas:function(){this.domContainer.removeChild(this.domCanvas);},setupDomCanvas:function(){this.domContainer.appendChild(this.domCanvas);},handleDroppedChart:function(){this.calculateBBox();var i,w,h,l,t,row,col,node,domCanvas=this.domCanvas,activeCharts=this.activeCharts,n=activeCharts.length,toDelete=[];for(i=n-1;i>=0;i-=1){node=activeCharts[i];row=parseInt(node.getAttribute("row"),10);col=parseInt(node.getAttribute("col"),10);w=node.offsetWidth;h=node.offsetHeight;l=node.offsetLeft;t=node.offsetTop;if(t+h<this._y1||t>this._y2||l+w<this._x1||l>this._x2){if(this.API.handleDroppedChart){if(this.APIOwner){this.API.handleDroppedChart.call(this.APIOwner,this.domCanvas,node);}else{this.API.handleDroppedChart(this.domCanvas,node);}}else{this.domCanvas.removeChild(node);activeCharts.splice(i,1);this.setActiveFlag(row,col,false);}}}},initAccHeight:function(){var i,nr=this.nRows,heightCache=this.manager.heightCache,accHeight=this.hAccArr,prevHeight=accHeight[nr-1];accHeight[0]=heightCache[0];for(i=1;i<nr;i++){accHeight[i]=accHeight[i-1]+heightCache[i];}this.updateCanvas(0,accHeight[nr-1]-prevHeight);},initAccWidth:function(){var i,nc=this.nCols,widthCache=this.manager.widthCache,accWidth=this.wAccArr,prevWidth=accWidth[nc-1];accWidth[0]=widthCache[0];for(i=1;i<nc;i++){accWidth[i]=accWidth[i-1]+widthCache[i];}this.updateCanvas(accWidth[nc-1]-prevWidth,0);},resetHGrid:function(){var m=this.nCols,w=this.chartW,cvs=this.domCanvas,cvsWidth=w*m,initArrays=function(arr,accArr,len,dim,fix){var i;if(fix){for(i=0;i<len;i+=1){arr[i]=dim;}}accArr[0]=dim;for(i=1;i<len;i+=1){accArr[i]=accArr[i-1]+dim;}};this.canvasW=cvsWidth;this.offset.x.e=$M.max(this.canvasW-this.width,0);if(!this.wArr){this.wArr=[];}if(!this.wAccArr){this.wAccArr=[];}this.wArr.length=0;this.wArr.length=m;this.wAccArr.length=0;this.wAccArr.length=m;initArrays(this.wArr,this.wAccArr,m,w,this.fixWidth);if(cvs){cvs.style.width=cvsWidth+"px";}},resetVGrid:function(){var n=this.nRows,h=this.chartH,cvs=this.domCanvas,cvsHeight=h*n,initArrays=function(arr,accArr,len,dim,fix){var i;if(fix){for(i=0;i<len;i+=1){arr[i]=dim;}}accArr[0]=dim;for(i=1;i<len;i+=1){accArr[i]=accArr[i-1]+dim;}};this.canvasH=cvsHeight;this.offset.y.e=$M.max(this.canvasH-this.height,0);if(!this.hArr){this.hArr=[];}if(!this.hAccArr){this.hAccArr=[];}this.hArr.length=0;this.hArr.length=n;this.hAccArr.length=0;this.hAccArr.length=n;initArrays(this.hArr,this.hAccArr,n,h,this.fixHeight);if(cvs){cvs.style.height=cvsHeight+"px";}},resetGrid:function(){this.resetHGrid();this.resetVGrid();this.clearActiveCharts();},updateGrid:function(){this.calculateBBox();if(this.activeCharts.length===0){var rowIndex=this.doRowIntersectionCheck(),colIndex=this.doColIntersectionCheck();this.doUpdateGridXIYI(rowIndex.start,colIndex.start);}else{this.calculateMatrixBBox();var r1=this._minRow,r2=this._maxRow,c1=this._minCol,c2=this._maxCol;this.doUpdateGridXIYI({rowStart:r2+1,colStart:c1});this.doUpdateGridXIYD({rowStart:r2,colStart:c2+1});this.doUpdateGridXDYD({rowStart:r1-1,colStart:c2});this.doUpdateGridXDYI({rowStart:r1,colStart:c1-1});}},updateCharts:function(){this.handleDroppedChart();var rowIndex=this.doRowIntersectionCheck(),colIndex=this.doColIntersectionCheck();this.doUpdateCharts(rowIndex.start,rowIndex.end,colIndex.start,colIndex.end);this.doUpdateInChartSplitters();},updateVLayout:function(canvasHeight,originY){this.origin.y=originY;this.domCanvas.style.height=canvasHeight+"px";this.domCanvas.style[$D.CSS3_TRANSFORM]=$D.createTranslateString(0,-originY,0);},updateHLayout:function(canvasWidth,originX){this.origin.x=originX;this.domCanvas.style.width=canvasWidth+"px";this.domCanvas.style[$D.CSS3_TRANSFORM]=$D.createTranslateString(-originX,0,0);},doUpdateCharts:function(startingRowIdx,endingRowIdx,startingColIdx,endingColIdx,skipEmptySlots){var r,c,rsp,csp,rowS,colS,nr,nc,x,y,wd,ht,div;if(skipEmptySlots===undefined){skipEmptySlots=false;}for(r=startingRowIdx;r<=endingRowIdx;r+=1){rsp=this.API.getRowSpan(r,this.depth);rowS=rsp[0];nr=rsp[1]-rsp[0]+1;y=this.getRowPosition(rowS);ht=this.getRowHeight(rsp);for(c=startingColIdx;c<=endingColIdx;c+=1){csp=this.API.getColSpan(c,this.depth);colS=csp[0];nc=csp[1]-csp[0]+1;x=this.getColPosition(colS);wd=this.getColWidth(csp);div=this.getChart(rowS,colS);if(!div&&!skipEmptySlots){div=this.createMiniChart(wd,ht,y,x,rowS,colS,nr,nc);this.addChart(rowS,colS,div);}if(div){this.updateMiniChart(div,wd,ht,y,x);if(this.getActiveFlag(rowS,colS)===false){this.domCanvas.appendChild(div);this.activeCharts.push(div);this.setActiveFlag(rowS,colS,true);}}c+=csp[1]-c;}r+=rsp[1]-r;}},doUpdateChartsGlobally:function(){var nr=this.nRows,nc=this.nCols;this.doUpdateCharts(0,nr-1,0,nc-1,true);},updateActiveCharts:function(){var i,div,width,height,top,left,row,col,rowSpan,colSpan,activeCharts=this.activeCharts,n=activeCharts.length;for(i=0;i<n;i++){div=activeCharts[i];row=parseInt(div.getAttribute("row"),10);col=parseInt(div.getAttribute("col"),10);rowSpan=this.API.getRowSpan(row,this.depth);colSpan=this.API.getColSpan(col,this.depth);top=this.getRowPosition(row);left=this.getColPosition(col);height=this.getRowHeight(rowSpan);width=this.getColWidth(colSpan);this.updateMiniChart(div,width,height,top,left);}},clearActiveCharts:function(){var i,div,row,col,canvas=this.domCanvas,charts=this.activeCharts,n=charts.length;for(i=0;i<n;i++){div=charts[i];row=parseInt(div.getAttribute("row"),10);col=parseInt(div.getAttribute("col"),10);this.setActiveFlag(row,col,false);canvas.removeChild(div);}charts.length=0;},doUpdateGridXIYI:function(section){var i,j,n=this.nRows,m=this.nCols,hArr=this.hArr,wArr=this.wArr,rowStart=section.rowStart||0,colStart=section.colStart||0,rowEnd=section.rowEnd||n-1,colEnd=section.colEnd||m-1;if(rowStart>rowEnd||colStart>colEnd){return ;}var xCurr=this.getColPosition(colStart),yCurr=this.getRowPosition(rowStart),updated=false;for(i=rowStart;i<=rowEnd;i+=1){if(yCurr>this._y2){break;}if(hArr[i]===undefined){hArr[i]=this.getMiniChartHeight(i,colStart);updated=true;}yCurr+=hArr[i];}rowEnd=i-1;for(j=colStart;j<=colEnd;j+=1){if(xCurr>this._x2){break;}if(wArr[j]===undefined){wArr[j]=this.getMiniChartWidth(rowStart,j);updated=true;}xCurr+=wArr[j];}colEnd=j-1;if(updated===true){var deltaX=this.updateAccWidth(colStart,colEnd),deltaY=this.updateAccHeight(rowStart,rowEnd);if(deltaX!==0||deltaY!==0){this.updateCanvas(deltaX,deltaY);}}},doUpdateGridXDYD:function(section){var i,j,n=this.nRows,m=this.nCols,hArr=this.hArr,wArr=this.wArr,rowStart=section.rowStart||n-1,colStart=section.colStart||m-1,rowEnd=section.rowEnd||0,colEnd=section.colEnd||0;if(rowStart<rowEnd||colStart<colEnd){return ;}var xStart=this.getColPosition(colStart+1),yStart=this.getRowPosition(rowStart+1),xCurr=xStart,yCurr=yStart,updated=false;for(i=rowStart;i>=rowEnd;i-=1){if(yCurr<this._y1){break;}if(hArr[i]===undefined){hArr[i]=this.getMiniChartHeight(i,colStart);updated=true;}yCurr-=hArr[i];}rowEnd=i+1;for(j=colStart;j>=colEnd;j-=1){if(xCurr<this._x1){break;}if(wArr[j]===undefined){wArr[j]=this.getMiniChartWidth(rowStart,j);updated=true;}xCurr-=wArr[j];}colEnd=j+1;if(updated===true){var deltaX=this.updateAccWidth(colEnd,colStart),deltaY=this.updateAccHeight(rowEnd,rowStart);if(deltaX!==0||deltaY!==0){this.updateCanvas(deltaX,deltaY,true,true);this.shiftCharts(deltaX,deltaY);}}},doUpdateGridXIYD:function(section){var i,j,n=this.nRows,m=this.nCols,hArr=this.hArr,wArr=this.wArr,rowStart=section.rowStart||n-1,colStart=section.colStart||0,rowEnd=section.rowEnd||0,colEnd=section.colEnd||m-1;if(rowStart<rowEnd||colStart>colEnd){return ;}var xCurr=this.getColPosition(colStart),yCurr=this.getRowPosition(rowStart+1),updated=false;for(i=rowStart;i>=rowEnd;i-=1){if(yCurr<this._y1){break;}if(hArr[i]===undefined){hArr[i]=this.getMiniChartHeight(i,colStart);updated=true;}yCurr-=hArr[i];}rowEnd=i+1;for(j=colStart;j<=colEnd;j+=1){if(xCurr>this._x2){break;}if(wArr[j]===undefined){wArr[j]=this.getMiniChartWidth(i,j);updated=true;}xCurr+=wArr[j];}colEnd=j-1;if(updated===true){var deltaX=this.updateAccWidth(colStart,colEnd),deltaY=this.updateAccHeight(rowEnd,rowStart);if(deltaX!==0||deltaY!==0){this.updateCanvas(deltaX,deltaY,false,true);this.shiftCharts(0,deltaY);}}},doUpdateGridXDYI:function(section){var i,j,n=this.nRows,m=this.nCols,hArr=this.hArr,wArr=this.wArr,rowStart=section.rowStart||0,colStart=section.colStart||m-1,rowEnd=section.rowEnd||n-1,colEnd=section.colEnd||0;if(rowStart>rowEnd||colStart<colEnd){return ;}var xCurr=this.getColPosition(colStart+1),yCurr=this.getRowPosition(rowStart),updated=false;for(i=rowStart;i<=rowEnd;i+=1){if(yCurr>this._y2){break;}if(hArr[i]===undefined){hArr[i]=this.getMiniChartHeight(i,colStart);updated=true;}yCurr+=hArr[i];}rowEnd=i-1;for(j=colStart;j>=colEnd;j-=1){if(xCurr<this._x1){break;}if(wArr[j]===undefined){wArr[j]=this.getMiniChartWidth(i,j);updated=true;}xCurr-=wArr[j];}colEnd=j+1;if(updated===true){var deltaX=this.updateAccWidth(colEnd,colStart),deltaY=this.updateAccHeight(rowStart,rowEnd);if(deltaX!==0||deltaY!==0){this.updateCanvas(deltaX,deltaY,true,false);this.shiftCharts(deltaX,0);}}},doUpdateInChartSplitters:function(){this.calculateBBox();var i,x,y,div,nRows=this.nRows,nCols=this.nCols,hs=this.hSplitters,vs=this.vSplitters,rowIndex=this.doRowIntersectionCheck(),colIndex=this.doColIntersectionCheck(),rowStart=rowIndex.start,rowEnd=rowIndex.end,colStart=colIndex.start,colEnd=colIndex.end;for(i=0;i<nRows;i++){div=vs[i];if(i>=rowStart&&i<=rowEnd&&i!==this.nRows-1&&this.getActiveFlag(i+1,colStart)===true){y=this.hAccArr[i];if(div===undefined){div=createRowSplitter(i);this.domCanvas.appendChild(div);this.registerSplitter(div);vs[i]=div;}positionRowSplitter(div,$M.max(this._x1,0),$M.min(this._x2,this.canvasW),y);}else{if(div){div.style.display="none";}}}for(i=0;i<nCols;i++){div=hs[i];if(i>=colStart&&i<=colEnd&&i!==this.nCols-1&&this.getActiveFlag(rowStart,i+1)===true){x=this.wAccArr[i];if(div===undefined){div=createColSplitter(i);this.domCanvas.appendChild(div);this.registerSplitter(div);hs[i]=div;}positionColSplitter(div,$M.max(this._y1,0),$M.min(this._y2,this.canvasH),x);}else{if(div){div.style.display="none";}}}},updateAccWidth:function(startingColIdx,endingColIdx){var j,m=this.nCols,deltaX=0,wArr=this.wArr,wAccArr=this.wAccArr;for(j=startingColIdx;j<=endingColIdx;j+=1){deltaX+=wArr[j]-this.getColWidth(j)-deltaX;wAccArr[j]+=deltaX;}if(deltaX!==0){for(j=endingColIdx+1;j<m;j+=1){wAccArr[j]+=deltaX;}}return deltaX;},updateAccHeight:function(startingRowIdx,endingRowIdx){var i,n=this.nRows,deltaY=0,hArr=this.hArr,hAccArr=this.hAccArr;for(i=startingRowIdx;i<=endingRowIdx;i+=1){deltaY+=hArr[i]-this.getRowHeight(i)-deltaY;hAccArr[i]+=deltaY;}if(deltaY!==0){for(i=endingRowIdx+1;i<n;i+=1){hAccArr[i]+=deltaY;}}return deltaY;},getMiniChartWidth:function(rowIdx,colIdx){if(this.API.getChartWidth){return Math.floor(this.API.getChartWidth(rowIdx,colIdx)*this.manager.chartWidthScale);}if(this.manager.API.getChartWidth){return Math.floor(this.manager.API.getChartWidth(rowIdx,colIdx)*this.manager.chartWidthScale);}return this.getColWidth(colIdx);},getMiniChartHeight:function(rowIdx,colIdx){if(this.API.getChartHeight){return Math.floor(this.API.getChartHeight(rowIdx,colIdx)*this.manager.chartHeightScale);}if(this.manager.API.getChartHeight){return Math.floor(this.manager.API.getChartHeight(rowIdx,colIdx)*this.manager.chartHeightScale);}return this.getRowHeight(rowIdx);},getRowHeight:function(rowIdx){var startIdx,endIdx,arr=this.hAccArr;if(rowIdx instanceof Array){startIdx=rowIdx[0]-1;endIdx=rowIdx[1];}else{startIdx=rowIdx-1;endIdx=rowIdx;}return arr[endIdx]-((startIdx===-1)?0:arr[startIdx]);},getColWidth:function(colIdx){var startIdx,endIdx,arr=this.wAccArr;if(colIdx instanceof Array){startIdx=colIdx[0]-1;endIdx=colIdx[1];}else{startIdx=colIdx-1;endIdx=colIdx;}return arr[endIdx]-((startIdx===-1)?0:arr[startIdx]);},getRowPosition:function(rowIdx){if(rowIdx===0){return 0;}return this.hAccArr[rowIdx-1];},getColPosition:function(colIdx){if(colIdx===0){return 0;}return this.wAccArr[colIdx-1];},doRowIntersectionCheck:function(){return{start:doHitTest(this.hAccArr,this._y1),end:doHitTest(this.hAccArr,this._y2)};},doColIntersectionCheck:function(){return{start:doHitTest(this.wAccArr,this._x1),end:doHitTest(this.wAccArr,this._x2)};},intersectionCheckOnChart:function(selected,i,j,x1,x2,y1,y2){var chart=this.getChart(i,j);if(!chart||!chart.firstChild){return ;}var k,n,m,shape,x,y,w,h,ox,oy,g,cx=chart.offsetLeft,cy=chart.offsetTop,cw=chart.offsetWidth,ch=chart.offsetHeight,groups=chart.firstChild.childNodes,groupCount=groups.length;x1=Math.max(x1-cx,0);x2=Math.min(x2-cx,cw);y1=Math.max(y1-cy,0);y2=Math.min(y2-cy,ch);for(m=0;m<groupCount;m++){g=groups[m];if(!g){continue;}n=g.childNodes.length;for(k=0;k<n;k++){shape=g.childNodes[k];if(shape.getAttribute("type")==="shape"){var tagName=shape.tagName;if(tagName==="rect"){x=parseInt(shape.getAttribute("x"),10);y=parseInt(shape.getAttribute("y"),10);w=parseInt(shape.getAttribute("width"),10);h=parseInt(shape.getAttribute("height"),10);if(containPoint(x1,x2,y1,y2,x+(w>>1),y+(h>>1))){selected.push(shape);}}else{if(tagName==="circle"){ox=parseInt(shape.getAttribute("cx"),10);oy=parseInt(shape.getAttribute("cy"),10);if(containPoint(x1,x2,y1,y2,ox,oy)){selected.push(shape);}}else{if(tagName==="path"){ox=shape.sGeoCenterX;oy=shape.sGeoCenterY;if(containPoint(x1,x2,y1,y2,ox,oy)){selected.push(shape);}}}}}}}},lassoSelected:function(info){if(!info||info.left===undefined||info.top===undefined||info.width===undefined||info.height===undefined){return ;}var i,j,rowStart,rowEnd,colStart,colEnd,selectedCharts=[],selectedShapes=[],func=this.API.lassoSelected,x1=info.left,y1=info.top,x2=x1+info.width,y2=y1+info.height;rowStart=doHitTest(this.hAccArr,y1);rowEnd=doHitTest(this.hAccArr,y2);colStart=doHitTest(this.wAccArr,x1);colEnd=doHitTest(this.wAccArr,x2);for(i=rowStart;i<=rowEnd;i++){for(j=colStart;j<=colEnd;j++){selectedCharts.push({row:i,col:j});this.intersectionCheckOnChart(selectedShapes,i,j,x1,x2,y1,y2);}}info.selectedCharts=selectedCharts;info.selectedShapes=selectedShapes;if(func){func.call(this.APIOwner,info);}},lassoSelectorResized:function(info){this.lassoSelected(info);}});mstrmojo.WidgetMatrixViewerManager=mstrmojo.declare(mstrmojo.Obj,null,{scriptClass:"mstrmojo.WidgetMatrixViewerManager",resizeMode:RESIZE_MODE.PERCENTILE,chartHeightScale:1,chartWidthScale:1,rowHighlighted:-1,colHighlighted:-1,isAsynchronous:false,hSlaves:[],vSlaves:[],yAxis:undefined,xAxis:undefined,master:undefined,hArr:[],wArr:[],hAccArr:[],wAccArr:[],widthCache:[],heightCache:[],API:{getChartWidth:undefined,getChartHeight:undefined},performAction:function(func){var i,n=this.hSlaves.length;for(i=0;i<n;i+=1){this.hSlaves[i][func]();}n=this.vSlaves.length;for(i=0;i<n;i+=1){this.vSlaves[i][func]();}if(this.master){this.master[func]();}},setDimension:function(nRows,nCols,chartWidth,chartHeight){var i;this.nRows=nRows;this.nCols=nCols;this.chartW=chartWidth;this.chartH=chartHeight;for(i=0;i<nRows;i+=1){this.heightCache[i]=chartHeight;}for(i=0;i<nCols;i+=1){this.widthCache[i]=chartWidth;}},binding:function(){var i,n,node,me=this,master=this.master,API=this.API;if(master===undefined){return ;}if(!API.getChartWidth){API.getChartWidth=function(rowIdx,colIdx){var k,start,end,sum=0,widthCache=me.widthCache;if(colIdx instanceof Array){start=colIdx[0];end=colIdx[1];}else{start=colIdx;end=colIdx+1;}for(k=start;k<end;k++){sum+=widthCache[k];}return sum;};}if(!API.getChartHeight){API.getChartHeight=function(rowIdx,colIdx){var k,start,end,sum=0,heightCache=me.heightCache;if(rowIdx instanceof Array){start=rowIdx[0];end=rowIdx[1];}else{start=rowIdx;end=rowIdx+1;}for(k=start;k<end;k++){sum+=heightCache[k];}return sum;};}n=this.hSlaves.length;for(i=0;i<n;i+=1){node=this.hSlaves[i];node.wArr=master.wArr;node.wAccArr=master.wAccArr;node.offset.x=master.offset.x;node.API.getChartWidth=API.getChartWidth;node.API.getChartHeight=API.getChartHeight;}n=this.vSlaves.length;for(i=0;i<n;i+=1){node=this.vSlaves[i];node.hArr=master.hArr;node.hAccArr=master.hAccArr;node.offset.y=master.offset.y;node.API.getChartWidth=API.getChartWidth;node.API.getChartHeight=API.getChartHeight;}this.master.API.getChartWidth=API.getChartWidth;this.master.API.getChartHeight=API.getChartHeight;},drawCharts:function(){if(this.master===undefined){return ;}this.master.updateGrid();this.updateHSlaves();this.updateVSlaves();this.master.updateCharts();},redrawCharts:function(){this.clearCharts();this.drawCharts();},resetGrid:function(){this.performAction("resetGrid");},resetHGrid:function(){if(this.master){this.master.resetHGrid();}},resetVGrid:function(){if(this.master){this.master.resetVGrid();}},clearCharts:function(){this.performAction("clearCharts");},dismissLassoSelector:function(){this.performAction("dismissLassoSelector");},updateXYAxis:function(){var xAxis=this.xAxis,yAxis=this.yAxis;if(xAxis){xAxis.clearCharts();xAxis.updateCharts();}if(yAxis){yAxis.clearCharts();yAxis.updateCharts();}},scrollTo:function(x,y){if(this.master===undefined){return ;}this.master.scrollTo(x,y);this.translateHSlaves(x);this.translateVSlaves(y);},feedChartWidthInfo:function(widthCache){if(this.master===undefined){return ;}this.resetHGrid();var i,value,nc=this.nCols,target=this.widthCache,widthArr=this.master.wArr;target.length=0;target.length=nc;for(i=0;i<nc;i++){value=widthCache[i];if(value){target[i]=value;widthArr[i]=value;}else{target[i]=this.chartW;}}this.master.initAccWidth();},feedChartHeightInfo:function(heightCache){if(this.master===undefined){return ;}this.resetVGrid();var i,value,nr=this.nRows,target=this.heightCache,heightArr=this.master.hArr;target.length=0;target.length=nr;for(i=0;i<nr;i++){value=heightCache[i];if(value){target[i]=value;heightArr[i]=value;}else{target[i]=this.chartH;}}this.master.initAccHeight();},resizeRow:function(source,idx,dim){if(this.master===undefined){return ;}var i,n=source.nRows,sp=source.API.getRowSpan(idx,source.depth),rows=[],deltas=[];if(this.resizeMode===1){var percent=dim/(source.getRowHeight(sp));this.chartHeightScale*=(1+percent);for(i=0;i<n;i+=1){if(source.hArr[i]!==undefined){rows.push(i);deltas.push(source.getMiniChartHeight(i,0)-source.getRowHeight(i));}}}else{var cnt=sp[1]-sp[0]+1,unit=$M.floor(dim/cnt);for(i=sp[0];i<=sp[1];i+=1){rows.push(i);deltas.push(i===sp[1]?(dim-unit*(cnt-1)):unit);}}this.master.resizeRow(rows,deltas);this.master.adjustOriginIfNeeded();this.raiseEvent({name:"MiniChartResized",chartHeightScale:this.chartHeightScale});this.master.doUpdateChartsGlobally();},resizeCol:function(source,idx,dim){if(this.master===undefined){return ;}var i,n=source.nCols,sp=source.API.getColSpan(idx,source.depth),cols=[],deltas=[],percent,cnt,unit;if(this.resizeMode===1){percent=dim/(source.getColWidth(sp));this.chartWidthScale*=(1+percent);for(i=0;i<n;i+=1){if(source.wArr[i]!==undefined){cols.push(i);deltas.push(source.getMiniChartWidth(0,i)-source.getColWidth(i));}}}else{cnt=sp[1]-sp[0]+1;unit=$M.floor(dim/cnt);for(i=sp[0];i<=sp[1];i+=1){cols.push(i);deltas.push(i===sp[1]?(dim-unit*(cnt-1)):unit);}}this.master.resizeCol(cols,deltas);this.master.adjustOriginIfNeeded();this.raiseEvent({name:"MiniChartResized",chartWidthScale:this.chartWidthScale});this.master.doUpdateChartsGlobally();},highlightRows:function(rowStart,rowEnd,depth,flag){if(flag===undefined){flag=true;}var i,n=this.vSlaves.length;for(i=depth;i<n;i+=1){this.vSlaves[i].highlightRows(rowStart,rowEnd,flag);}if(this.master!==undefined){this.master.highlightRows(rowStart,rowEnd,flag);}},highlightCols:function(colStart,colEnd,depth,flag){if(flag===undefined){flag=true;}var i,n=this.hSlaves.length;for(i=depth;i<n;i+=1){this.hSlaves[i].highlightCols(colStart,colEnd,flag);}if(this.master!==undefined){this.master.highlightCols(colStart,colEnd,flag);}},resize:function(dx,dy){var i,n;if(dx===undefined){dx=0;}if(dy===undefined){dy=0;}if(dx!==0){n=this.hSlaves.length;for(i=0;i<n;i+=1){this.hSlaves[i].resize(dx,0);}}if(dy!==0){n=this.vSlaves.length;for(i=0;i<n;i+=1){this.vSlaves[i].resize(0,dy);}}if(dx!==0||dy!==0){this.master.resize(dx,dy);}},updateHSlaves:function(){if(this.master===undefined){return ;}var i,n=this.hSlaves.length,w=this.master.domCanvas.offsetWidth,org=this.master.origin;for(i=0;i<n;i+=1){var node=this.hSlaves[i];node.updateHLayout(w,org.x);node.updateActiveCharts();node.updateCharts();}},updateVSlaves:function(){if(this.master===undefined){return ;}var i,n=this.vSlaves.length,h=this.master.domCanvas.offsetHeight,org=this.master.origin;for(i=0;i<n;i+=1){var node=this.vSlaves[i];node.updateVLayout(h,org.y);node.updateActiveCharts();node.updateCharts();}},translateHSlaves:function(x){var i,n=this.hSlaves.length;for(i=0;i<n;i+=1){this.hSlaves[i].scrollTo(x,undefined);}},translateVSlaves:function(y){var i,n=this.vSlaves.length;for(i=0;i<n;i+=1){this.vSlaves[i].scrollTo(undefined,y);}},queryRowHeight:function(i){var me=this,master=this.master,updateRowHeight=function(i,h){if(master.isRowInSight(i)){me.resizeRow(me.master,i,h);me.doUpdateChartsGlobally();}};},queryColWidth:function(i){var me=this,master=this.master,updateColWidth=function(i,w){if(master.isColInSight(i)){me.resizeCol(me.master,i,w);me.doUpdateChartsGlobally();}};},queryMiniChart:function(i,j){var master=this.master,updateMiniChart=function(i,j){if(master.isRowInSight(i)&&master.isColInSight(j)){master.doUpdateCharts(i,i,j,j);}};},queryYAxis:function(i){var yAxis=this.yAxis,updateYAxis=function(i){yAxis.doUpdateCharts(i,i,0,0);};},queryXAxis:function(j){var xAxis=this.xAxis,updateXAxis=function(j){xAxis.doUpdateCharts(0,0,j,j);};},queryRowHeader:function(i,depth){var rh=this.vSlaves[depth],updateRowHeader=function(i){rh.doUpdateCharts(i,i,0,0);};},queryColHeader:function(j,depth){var ch=this.hSlaves[depth],updateColHeader=function(j){ch.doUpdateCharts(0,0,j,j);};},queryRowSpan:function(i){var me=this,master=this.master,vs=this.vSlaves,n=vs.length,updateRowSpan=function(i){var k;for(k=0;k<n-1;k+=1){vs[k].doUpdateCharts(i,i,0,0);}};},queryColSpan:function(j){var hs=this.hSlaves,n=hs.length,updateColSpan=function(){var k;for(k=0;k<n-1;k+=1){hs[k].doUpdateCharts(0,0,j,j);}};}});}());