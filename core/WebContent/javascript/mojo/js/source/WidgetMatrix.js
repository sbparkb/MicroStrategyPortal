(function(){mstrmojo.requiresCls("mstrmojo.dom","mstrmojo.Widget");var $M=Math,$D=mstrmojo.dom,$CSS=mstrmojo.css,BORDER_W=1,WIN_BUFFER_SIZE=0;function doHitTest(arr,value){if(isNaN(arr[0])){console.log("Invalid input to function doHitTest.");return 0;}if(isNaN(value)){console.log("Invalid input to function doHitTest.");}value=value||0;var m,p,q,n=arr.length;if(n<1||value<=arr[0]){return 0;}if(value>arr[n-1]){return n-1;}p=0;q=n-1;while(q-p>1){m=p+((q-p)>>1);if(arr[m]===value){return m;}if(arr[m]<value){p=m;}else{if(arr[m]>value){q=m;}}}return q;}function string2int(str){var floatNum=parseFloat(str);if(isNaN(floatNum)){floatNum=0;}return Math.floor(floatNum+0.5);}function getChartVisibleRegion(winBBox,chartBBox){var x1=winBBox.x,y1=winBBox.y,x2=x1+winBBox.w,y2=y1+winBBox.h,cx1=chartBBox.x,cy1=chartBBox.y,cx2=cx1+chartBBox.w,cy2=cy1+chartBBox.h;if(x1>=cx2||y1>=cy2||x2<=cx1||y2<=cy1){return{flag:0};}if(x1<=cx1&&y1<=cy1&&x2>=cx2&&y2>=cy2){return{flag:2};}var x=Math.max(x1-cx1,0),y=Math.max(y1-cy1,0),width=Math.min(x2-cx1,chartBBox.w)-x,height=Math.min(y2-cy1,chartBBox.h)-y;return{flag:1,x:x,y:y,width:width,height:height};}function searchForId(arr,id){var i,n=arr.length;for(i=0;i<n;i++){if(arr[i].id===id){return i;}}return -1;}mstrmojo.WidgetMatrix=mstrmojo.declare(mstrmojo.Widget,null,{scriptClass:"mstrmojo.WidgetMatrix",left:0,top:0,width:100,height:100,phCss:"",nRows:1,nCols:1,chartW:100,chartH:100,fixWidth:false,fixHeight:false,depth:undefined,origin:undefined,offset:undefined,hArr:undefined,hAccArr:undefined,wArr:undefined,wAccArr:undefined,domHSBar:undefined,domVSBar:undefined,domHSBarBody:undefined,domVSBarBody:undefined,chartsPool:undefined,activeCharts:undefined,activeFlags:undefined,API:undefined,APIOwner:undefined,contentSummary:undefined,markupString:'<div class="{@cssClass}" style="position:absolute; left:{@left}px; top:{@top}px; width:{@width}px; height:{@height}px;"><div style="position:absolute; left:0px; bottom:0px; width:100%; height:100%; overflow:hidden"><div class="canvas" style="position:absolute; width:{@canvasW}px; height:{@canvasH}px"></div></div><span style="visibility:hidden"></span></div>',markupSlots:{domContainer:function(){return this.domNode.firstChild;},domCanvas:function(){return this.domNode.firstChild.firstChild;},domSpan:function(){return this.domNode.lastChild;}},init:function init(props){this.origin={x:0,y:0};this.offset={x:{s:0,e:0},y:{s:0,e:0}};this.hArr=[];this.hAccArr=[];this.wArr=[];this.wAccArr=[];this.chartsPool=[];this.activeCharts=[];this.activeFlags=[];this.contentSummary=null;this.canvasScrolled=props&&props.canvasScrolled;this.API={handleDroppedChart:undefined,getChartWidth:undefined,getChartHeight:undefined,createUnitChart:undefined,updateUnitChart:undefined,getRowSpan:function(i){return[i,i];},getColSpan:function(i){return[i,i];}};var ph=props.placeholder;if(ph!==undefined){this.cssClass=ph.getAttribute("class");if(!this.cssClass){this.cssClass="";}if(props.hasOwnProperty("width")===false){props.width=string2int(ph.style.width);}if(props.hasOwnProperty("height")===false){props.height=string2int(ph.style.height);}if(props.hasOwnProperty("left")===false){props.left=string2int(ph.style.left);}if(props.hasOwnProperty("top")===false){props.top=string2int(ph.style.top);}}if(this._super){this._super(props);}},preBuildRendering:function(){this.resetGrid();},postBuildRendering:function(){if(this._super){this._super();}var span=this.domSpan,style;span.setAttribute("class",this.phCss);style=$CSS.getComputedStyle(span);this.borderL=string2int(style.borderLeftWidth);this.borderR=string2int(style.borderRightWidth);this.borderT=string2int(style.borderTopWidth);this.borderB=string2int(style.borderBottomWidth);this.borderH=this.borderL+this.borderR;this.borderV=this.borderT+this.borderB;},highlightText:function(flag){if(flag){$CSS.addClass(this.domNode,"highlight-label");}else{$CSS.removeClass(this.domNode,"highlight-label");}},clearCharts:function(){this.chartsPool=[];this.activeCharts=[];this.activeFlags=[];if(this.domCanvas){this.domCanvas.innerHTML="";}},getChart:function(i,j){var pool=this.chartsPool;return pool[i]&&pool[i][j];},addChart:function(i,j,node){var pool=this.chartsPool;pool[i]=pool[i]||[];pool[i][j]=node;},getActiveFlag:function(i,j){var matrix=this.activeFlags;return !!(matrix[i]&&matrix[i][j]);},setActiveFlag:function(i,j,flag){var matrix=this.activeFlags;matrix[i]=matrix[i]||[];matrix[i][j]=flag;},filterChartsByRow:function(data,depth){var i,start,end,prop,values,isCounting=false,nRows=this.nRows,summary=this.contentSummary,unit=summary.unit,elements=summary.elements,rtn=[];for(prop in data){if(data.hasOwnProperty(prop)){values=data[prop];if(prop===unit){for(i=0;i<nRows;i++){if(searchForId(values,elements[i])!==-1){if(isCounting){end++;}else{start=end=i;isCounting=true;}}else{if(isCounting){rtn.push({start:start,end:end,depth:depth,byRow:true,att:unit,elements:values});isCounting=false;}}}if(isCounting){rtn.push({start:start,end:end,depth:depth,byRow:true,att:unit,elements:values});}return rtn;}return null;}}return null;},filterChartsByCol:function(data,depth){var i,start,end,isCounting=false,nCols=this.nCols,prop,values,summary=this.contentSummary,unit=summary.unit,elements=summary.elements,rtn=[];for(prop in data){if(data.hasOwnProperty(prop)){values=data[prop];if(prop===unit){for(i=0;i<nCols;i++){if(searchForId(values,elements[i])!==-1){if(isCounting){end++;}else{start=end=i;isCounting=true;}}else{if(isCounting){rtn.push({start:start,end:end,depth:depth,byRow:false});isCounting=false;}}}if(isCounting){rtn.push({start:start,end:end,depth:depth,byRow:false});}return rtn;}return null;}}return null;},filterRelevantDimension:function(indices,rule){var summary=this.contentSummary,unit=summary.unit;if(!rule.hasOwnProperty(unit)){return indices;}var i,row,rtn=[],n=indices.length,choices=rule[unit],elements=summary.elements;for(i=0;i<n;i++){row=indices[i];if(searchForId(choices,elements[row])!==-1){rtn.push(row);}}return rtn;},filterRelevantRows:function(indices,rule){return this.filterRelevantDimension(indices,rule);},filterRelevantCols:function(indices,rule){return this.filterRelevantDimension(indices,rule);},resize:function(dx,dy){this.width+=dx;this.height+=dy;this.offset.x.e=$M.max(this.domCanvas.clientWidth-this.width,0);this.offset.y.e=$M.max(this.domCanvas.clientHeight-this.height,0);this.domNode.style.width=this.width+"px";this.domNode.style.height=this.height+"px";if(this.fixHeight&&this.nRows===1){this.chartH+=dy;}if(this.fixWidth&&this.nCols===1){this.chartW+=dx;}},resizeAbs:function(w,h){var deltaW=w-this.width,deltaH=h-this.height;this.width=w;this.height=h;this.offset.x.e=$M.max(this.domCanvas.clientWidth-w,0);this.offset.y.e=$M.max(this.domCanvas.clientHeight-h,0);this.domNode.style.width=w+"px";this.domNode.style.height=h+"px";if(this.fixHeight&&this.nRows===1){this.resizeRow([0],[deltaH]);this.doUpdateChartsGlobally();this.chartH=h;}if(this.fixWidth&&this.nCols===1){this.resizeCol([0],[deltaW]);this.doUpdateChartsGlobally();this.chartW=w;}},setRowHeight:function(i,h){this.hArr[i]=h;return this.updateAccHeight(i,i);},setColWidth:function(j,w){this.wArr[j]=w;return this.updateAccWidth(j,j);},resizeRow:function(rows,deltas,nRows){var i,j,dy;for(i=0;i<rows.length;i+=1){j=rows[i];dy=deltas[i];this.setRowHeight(j,this.getRowHeight(j)+dy);}if(deltas[0]!==0){this.updateCanvas(0,deltas[0]*nRows);}},resizeCol:function(cols,deltas,nCols){var i,j,dx;for(i=0;i<cols.length;i+=1){j=cols[i];dx=deltas[i];this.setColWidth(j,this.getColWidth(j)+dx);}if(deltas[0]!==0){this.updateCanvas(deltas[0]*nCols,0);}},toggleClsByRows:function(rowStart,rowEnd,flag,cls){var i,j,chart,nCols=this.nCols;for(i=rowStart;i<=rowEnd;i++){for(j=0;j<nCols;j++){chart=this.getChart(i,j);if(chart){if(flag){$CSS.addClass(chart,cls);}else{$CSS.removeClass(chart,cls);}}}}},toggleClsByCols:function(colStart,colEnd,flag,cls){var i,j,chart,nRows=this.nRows;for(j=colStart;j<=colEnd;j++){for(i=0;i<nRows;i++){chart=this.getChart(i,j);if(chart){if(flag){$CSS.addClass(chart,cls);}else{$CSS.removeClass(chart,cls);}}}}},scrollTo:function(x,y,updateSB){var hsbar,vsbar,org=this.origin;if(x===undefined){x=org.x;}if(y===undefined){y=org.y;}if(x===org.x&&y===org.y){return ;}org.x=x;org.y=y;if(!this.canvasScrolled){this.domCanvas.style[$D.CSS3_TRANSFORM]=$D.createTranslateString(-x,-y,0);}if(updateSB){hsbar=this.domHSBar;vsbar=this.domVSBar;if(hsbar){hsbar.scrollLeft=x;}if(vsbar){vsbar.scrollTop=y;}}},adjustOriginIfNeeded:function(){var toX,toY,origin=this.origin,offset=this.offset,orgX=origin.x,orgY=origin.y,offsetX=offset.x,offsetY=offset.y;if(orgX<offsetX.s||orgX>offsetX.e){toX=offsetX.s;}if(orgY<offsetY.s||orgY>offsetY.e){toY=offsetY.s;}this.scrollTo(toX,toY,true);},createMiniChart:function(w,h,t,l,row,col,nr,nc,subRegion){var lr=row,lc=col;if(this.depth){if(this.depthOnRow){lr=this.depth;}else{lc=this.depth;}}w-=this.borderH;h-=this.borderV;if(this.API.createUnitChart!==undefined){if(this.APIOwner){return this.API.createUnitChart.call(this.APIOwner,w,h,t,l,lr,lc,nr,nc,this.phCss,this.isPrimary,subRegion);}return this.API.createUnitChart(w,h,t,l,lr,lc,nr,nc,this.phCss,this.isPrimary,subRegion);}return this.createMiniPH(w,h,t,l,lr,lc,nr,nc,this.phCss);},createMiniPH:function(w,h,t,l,row,col,nr,nc,phCss){var div=document.createElement("div");div.setAttribute("row",row);div.setAttribute("col",col);div.setAttribute("class",phCss);div.setAttribute("rowSpan",nr);div.setAttribute("colSpan",nc);div.style.width=w+"px";div.style.height=h+"px";div.style.top=t+"px";div.style.left=l+"px";return div;},updateMiniChart:function(div,w,h,t,l,subRegion){if(w){w-=this.borderH;}if(h){h-=this.borderV;}if(this.API.updateUnitChart!==undefined){if(this.APIOwner){this.API.updateUnitChart.call(this.APIOwner,div,w,h,t,l,this.isPrimary,subRegion);}else{this.API.updateUnitChart(div,w,h,t,l,this.isPrimary,subRegion);}}else{if(w){div.style.width=w+"px";}if(h){div.style.height=h+"px";}if(t){div.style.top=t+"px";}if(l){div.style.left=l+"px";}}},shiftCharts:function(dx,dy){if(dx===0&&dy===0){return ;}var i,node,charts=this.activeCharts,len=charts.length;for(i=0;i<len;i+=1){node=charts[i];if(dx!==0){node.style.left=node.offsetLeft+dx+"px";}if(dy!==0){node.style.top=node.offsetTop+dy+"px";}}},updateCanvas:function(deltaX,deltaY,updateOrgX,updateOrgY){var dom=this.domCanvas,w=dom.offsetWidth,h=dom.offsetHeight,nw=w+deltaX,nh=h+deltaY,hsbar=this.domHSBarBody,vsbar=this.domVSBarBody,offset=this.offset,origin=this.origin,orgX=origin.x,orgY=origin.y,xEnd=offset.x.e,yEnd=offset.y.e,xTouchEnd=orgX===xEnd,yTouchEnd=orgY===yEnd,xTouchStart=orgX===0,yTouchStart=orgY===0,updateWidth=function(){if(deltaX===0){return ;}if(hsbar){hsbar.style.width=nw-BORDER_W+"px";}dom.style.width=nw+"px";offset.x.e=$M.max(xEnd+deltaX,0);},updateHeight=function(){if(deltaY===0){return ;}if(vsbar){vsbar.style.height=nh-BORDER_W+"px";}dom.style.height=nh+"px";offset.y.e=$M.max(yEnd+deltaY,0);},updateOriginIfNeeded=function(){if(updateOrgX===true){orgX+=deltaX;}if(updateOrgY===true){orgY+=deltaY;}if((orgX>offset.x.e)){orgX=offset.x.e;}if((orgY>offset.y.e)){orgY=offset.y.e;}};this.canvasW=nw;this.canvasH=nh;updateWidth();updateHeight();updateOriginIfNeeded();this.scrollTo(orgX,orgY,true);},calculateBBox:function(){var x0=this.origin.x,y0=this.origin.y,w=this.width,h=this.height;this._x1=x0-w*WIN_BUFFER_SIZE;this._x2=x0+w*(WIN_BUFFER_SIZE+1);this._y1=y0-h*WIN_BUFFER_SIZE;this._y2=y0+h*(WIN_BUFFER_SIZE+1);},calculateMatrixBBox:function(){var i,r,c,rsp,csp,node,list=this.activeCharts,n=list.length;this._minRow=this.nRows;this._maxRow=-1;this._minCol=this.nCols;this._maxCol=-1;for(i=0;i<n;i+=1){node=list[i];r=parseInt(node.getAttribute("row"),10);c=parseInt(node.getAttribute("col"),10);rsp=this.API.getRowSpan(r,this.depth);csp=this.API.getColSpan(c,this.depth);this._minRow=$M.min(this._minRow,rsp[0]);this._maxRow=$M.max(this._maxRow,rsp[1]);this._minCol=$M.min(this._minCol,csp[0]);this._maxCol=$M.max(this._maxCol,csp[1]);}},isRowInSight:function(r){this.calculateMatrixBBox();return r>=this._minRow&&r<=this._maxRow;},isColInSight:function(c){this.calculateMatrixBBox();return c>=this._minCol&&c<=this._maxCol;},detachDomCanvas:function(){this.domContainer.removeChild(this.domCanvas);},setupDomCanvas:function(){this.domContainer.appendChild(this.domCanvas);},handleDroppedChart:function(){this.calculateBBox();var i,w,h,l,t,row,col,node,activeCharts=this.activeCharts,n=activeCharts.length;for(i=n-1;i>=0;i-=1){node=activeCharts[i];row=parseInt(node.getAttribute("row"),10);col=parseInt(node.getAttribute("col"),10);w=this.getColWidth(col);h=this.getRowHeight(row);l=this.getColPosition(col);t=this.getRowPosition(row);if(t+h<this._y1||t>this._y2||l+w<this._x1||l>this._x2){if(this.API.handleDroppedChart){if(this.APIOwner){this.API.handleDroppedChart.call(this.APIOwner,this.domCanvas,node);}else{this.API.handleDroppedChart(this.domCanvas,node);}}else{this.domCanvas.removeChild(node);activeCharts.splice(i,1);this.setActiveFlag(row,col,false);}}}},initAccHeight:function(){var i,nr=this.nRows,heightCache=this.manager.heightCache,accHeight=this.hAccArr,prevHeight=accHeight[nr-1];accHeight[0]=heightCache[0];for(i=1;i<nr;i++){accHeight[i]=accHeight[i-1]+heightCache[i];}this.updateCanvas(0,accHeight[nr-1]-prevHeight);},initAccWidth:function(){var i,nc=this.nCols,widthCache=this.manager.widthCache,accWidth=this.wAccArr,prevWidth=accWidth[nc-1];accWidth[0]=widthCache[0];for(i=1;i<nc;i++){accWidth[i]=accWidth[i-1]+widthCache[i];}this.updateCanvas(accWidth[nc-1]-prevWidth,0);},resetHGrid:function(){var m=this.nCols,w=this.chartW,cvs=this.domCanvas,cvsWidth=w*m,initArrays=function(arr,accArr,len,dim,fix){var i;if(fix){for(i=0;i<len;i+=1){arr[i]=dim;}}accArr[0]=dim;for(i=1;i<len;i+=1){accArr[i]=accArr[i-1]+dim;}};this.canvasW=cvsWidth;this.offset.x.e=$M.max(this.canvasW-this.width,0);if(!this.wArr){this.wArr=[];}if(!this.wAccArr){this.wAccArr=[];}this.wArr.length=0;this.wArr.length=m;this.wAccArr.length=0;this.wAccArr.length=m;initArrays(this.wArr,this.wAccArr,m,w,this.fixWidth);if(cvs){cvs.style.width=cvsWidth+"px";}},resetVGrid:function(){var n=this.nRows,h=this.chartH,cvs=this.domCanvas,cvsHeight=h*n,initArrays=function(arr,accArr,len,dim,fix){var i;if(fix){for(i=0;i<len;i+=1){arr[i]=dim;}}accArr[0]=dim;for(i=1;i<len;i+=1){accArr[i]=accArr[i-1]+dim;}};this.canvasH=cvsHeight;this.offset.y.e=$M.max(this.canvasH-this.height,0);if(!this.hArr){this.hArr=[];}if(!this.hAccArr){this.hAccArr=[];}this.hArr.length=0;this.hArr.length=n;this.hAccArr.length=0;this.hAccArr.length=n;initArrays(this.hArr,this.hAccArr,n,h,this.fixHeight);if(cvs){cvs.style.height=cvsHeight+"px";}},resetGrid:function(){this.resetHGrid();this.resetVGrid();this.clearActiveCharts();},updateGrid:function(){this.calculateBBox();if(this.activeCharts.length===0){var rowIndex=this.doRowIntersectionCheck(),colIndex=this.doColIntersectionCheck();this.doUpdateGridXIYI(rowIndex.start,colIndex.start);}else{this.calculateMatrixBBox();var r1=this._minRow,r2=this._maxRow,c1=this._minCol,c2=this._maxCol;this.doUpdateGridXIYI({rowStart:r2+1,colStart:c1});this.doUpdateGridXIYD({rowStart:r2,colStart:c2+1});this.doUpdateGridXDYD({rowStart:r1-1,colStart:c2});this.doUpdateGridXDYI({rowStart:r1,colStart:c1-1});}},updateCharts:function(){if(!this.shouldDrawShapeFlag){return ;}this.handleDroppedChart();var rowIndex=this.doRowIntersectionCheck(),colIndex=this.doColIntersectionCheck();this.doUpdateCharts(rowIndex.start,rowIndex.end,colIndex.start,colIndex.end);},updateVLayout:function(canvasHeight,originY){this.origin.y=originY;this.domCanvas.style.height=canvasHeight+"px";this.domCanvas.style[$D.CSS3_TRANSFORM]=$D.createTranslateString(0,-originY,0);},updateHLayout:function(canvasWidth,originX){this.origin.x=originX;this.domCanvas.style.width=canvasWidth+"px";this.domCanvas.style[$D.CSS3_TRANSFORM]=$D.createTranslateString(-originX,0,0);},doUpdateCharts:function(startingRowIdx,endingRowIdx,startingColIdx,endingColIdx,skipEmptySlots){var r,c,rsp,csp,rowS,colS,nr,nc,x,y,wd,ht,div,subRegion,origin=this.origin,winBBox={x:origin.x,y:origin.y,w:this.width,h:this.height},chartBBox={};if(skipEmptySlots===undefined){skipEmptySlots=false;}for(r=startingRowIdx;r<=endingRowIdx;r+=1){rsp=this.API.getRowSpan(r,this.depth);rowS=rsp[0];nr=rsp[1]-rsp[0]+1;y=this.getRowPosition(rowS);ht=this.getRowHeight(rsp);if(ht<=0){continue;}chartBBox.y=y;chartBBox.h=ht-this.borderV;for(c=startingColIdx;c<=endingColIdx;c+=1){csp=this.API.getColSpan(c,this.depth);colS=csp[0];nc=csp[1]-csp[0]+1;x=this.getColPosition(colS);wd=this.getColWidth(csp);chartBBox.x=x;chartBBox.w=wd-this.borderH;subRegion=getChartVisibleRegion(winBBox,chartBBox);if(subRegion.flag!==0){div=this.getChart(rowS,colS);if(!div&&!skipEmptySlots){div=this.createMiniChart(wd,ht,y,x,rowS,colS,nr,nc,subRegion);this.addChart(rowS,colS,div);}else{if(div){this.updateMiniChart(div,wd,ht,y,x,subRegion);}}if(div){if(this.getActiveFlag(rowS,colS)===false){this.domCanvas.appendChild(div);this.activeCharts.push(div);this.setActiveFlag(rowS,colS,true);}}}c+=csp[1]-c;}r+=rsp[1]-r;}},doUpdateChartsGlobally:function(){if(!this.shouldDrawShapeFlag){return ;}this.handleDroppedChart();var rowIndex=this.doRowIntersectionCheck(),colIndex=this.doColIntersectionCheck();this.doUpdateCharts(rowIndex.start,rowIndex.end,colIndex.start,colIndex.end);},updateActiveCharts:function(){var i,div,width,height,top,left,row,col,rowSpan,colSpan,activeCharts=this.activeCharts,n=activeCharts.length,origin=this.origin,subRegion,winBBox={x:origin.x,y:origin.y,w:this.width,h:this.height},chartBBox={};for(i=0;i<n;i++){div=activeCharts[i];row=parseInt(div.getAttribute("row"),10);col=parseInt(div.getAttribute("col"),10);rowSpan=this.API.getRowSpan(row,this.depth);colSpan=this.API.getColSpan(col,this.depth);top=this.getRowPosition(row);left=this.getColPosition(col);height=this.getRowHeight(rowSpan);width=this.getColWidth(colSpan);chartBBox.y=top;chartBBox.x=left;chartBBox.h=height-this.borderV;chartBBox.w=width-this.borderH;subRegion=getChartVisibleRegion(winBBox,chartBBox);this.updateMiniChart(div,width,height,top,left,subRegion);}},clearActiveCharts:function(){var i,div,row,col,canvas=this.domCanvas,charts=this.activeCharts,n=charts.length;for(i=0;i<n;i++){div=charts[i];row=parseInt(div.getAttribute("row"),10);col=parseInt(div.getAttribute("col"),10);this.setActiveFlag(row,col,false);canvas.removeChild(div);}charts.length=0;},doUpdateGridXIYI:function(section){var i,j,n=this.nRows,m=this.nCols,hArr=this.hArr,wArr=this.wArr,rowStart=section.rowStart||0,colStart=section.colStart||0,rowEnd=section.rowEnd||n-1,colEnd=section.colEnd||m-1;if(rowStart>rowEnd||colStart>colEnd){return ;}var xCurr=this.getColPosition(colStart),yCurr=this.getRowPosition(rowStart),updated=false;for(i=rowStart;i<=rowEnd;i+=1){if(yCurr>this._y2){break;}if(hArr[i]===undefined){hArr[i]=this.getMiniChartHeight(i,colStart);updated=true;}yCurr+=hArr[i];}rowEnd=i-1;for(j=colStart;j<=colEnd;j+=1){if(xCurr>this._x2){break;}if(wArr[j]===undefined){wArr[j]=this.getMiniChartWidth(rowStart,j);updated=true;}xCurr+=wArr[j];}colEnd=j-1;if(updated===true){var deltaX=this.updateAccWidth(colStart,colEnd),deltaY=this.updateAccHeight(rowStart,rowEnd);if(deltaX!==0||deltaY!==0){this.updateCanvas(deltaX,deltaY,false,false);}}},doUpdateGridXDYD:function(section){var i,j,n=this.nRows,m=this.nCols,hArr=this.hArr,wArr=this.wArr,rowStart=section.rowStart||n-1,colStart=section.colStart||m-1,rowEnd=section.rowEnd||0,colEnd=section.colEnd||0;if(rowStart<rowEnd||colStart<colEnd){return ;}var xStart=this.getColPosition(colStart+1),yStart=this.getRowPosition(rowStart+1),xCurr=xStart,yCurr=yStart,updated=false;for(i=rowStart;i>=rowEnd;i-=1){if(yCurr<this._y1){break;}if(hArr[i]===undefined){hArr[i]=this.getMiniChartHeight(i,colStart);updated=true;}yCurr-=hArr[i];}rowEnd=i+1;for(j=colStart;j>=colEnd;j-=1){if(xCurr<this._x1){break;}if(wArr[j]===undefined){wArr[j]=this.getMiniChartWidth(rowStart,j);updated=true;}xCurr-=wArr[j];}colEnd=j+1;if(updated===true){var deltaX=this.updateAccWidth(colEnd,colStart),deltaY=this.updateAccHeight(rowEnd,rowStart);if(deltaX!==0||deltaY!==0){this.updateCanvas(deltaX,deltaY,true,true);this.shiftCharts(deltaX,deltaY);}}},doUpdateGridXIYD:function(section){var i,j,n=this.nRows,m=this.nCols,hArr=this.hArr,wArr=this.wArr,rowStart=section.rowStart||n-1,colStart=section.colStart||0,rowEnd=section.rowEnd||0,colEnd=section.colEnd||m-1;if(rowStart<rowEnd||colStart>colEnd){return ;}var xCurr=this.getColPosition(colStart),yCurr=this.getRowPosition(rowStart+1),updated=false;for(i=rowStart;i>=rowEnd;i-=1){if(yCurr<this._y1){break;}if(hArr[i]===undefined){hArr[i]=this.getMiniChartHeight(i,colStart);updated=true;}yCurr-=hArr[i];}rowEnd=i+1;for(j=colStart;j<=colEnd;j+=1){if(xCurr>this._x2){break;}if(wArr[j]===undefined){wArr[j]=this.getMiniChartWidth(i,j);updated=true;}xCurr+=wArr[j];}colEnd=j-1;if(updated===true){var deltaX=this.updateAccWidth(colStart,colEnd),deltaY=this.updateAccHeight(rowEnd,rowStart);if(deltaX!==0||deltaY!==0){this.updateCanvas(deltaX,deltaY,false,true);this.shiftCharts(0,deltaY);}}},doUpdateGridXDYI:function(section){var i,j,n=this.nRows,m=this.nCols,hArr=this.hArr,wArr=this.wArr,rowStart=section.rowStart||0,colStart=section.colStart||m-1,rowEnd=section.rowEnd||n-1,colEnd=section.colEnd||0;if(rowStart>rowEnd||colStart<colEnd){return ;}var xCurr=this.getColPosition(colStart+1),yCurr=this.getRowPosition(rowStart),updated=false;for(i=rowStart;i<=rowEnd;i+=1){if(yCurr>this._y2){break;}if(hArr[i]===undefined){hArr[i]=this.getMiniChartHeight(i,colStart);updated=true;}yCurr+=hArr[i];}rowEnd=i-1;for(j=colStart;j>=colEnd;j-=1){if(xCurr<this._x1){break;}if(wArr[j]===undefined){wArr[j]=this.getMiniChartWidth(i,j);updated=true;}xCurr-=wArr[j];}colEnd=j+1;if(updated===true){var deltaX=this.updateAccWidth(colEnd,colStart),deltaY=this.updateAccHeight(rowStart,rowEnd);if(deltaX!==0||deltaY!==0){this.updateCanvas(deltaX,deltaY,true,false);this.shiftCharts(deltaX,0);}}},updateAccWidth:function(startingColIdx,endingColIdx){var j,m=this.nCols,deltaX=0,wArr=this.wArr,wAccArr=this.wAccArr;for(j=startingColIdx;j<=endingColIdx;j+=1){deltaX+=wArr[j]-this.getColWidth(j)-deltaX;wAccArr[j]+=deltaX;}if(deltaX!==0){for(j=endingColIdx+1;j<m;j+=1){wAccArr[j]+=deltaX;}}return deltaX;},updateAccHeight:function(startingRowIdx,endingRowIdx){var i,n=this.nRows,deltaY=0,hArr=this.hArr,hAccArr=this.hAccArr;for(i=startingRowIdx;i<=endingRowIdx;i+=1){deltaY+=hArr[i]-this.getRowHeight(i)-deltaY;hAccArr[i]+=deltaY;}if(deltaY!==0){for(i=endingRowIdx+1;i<n;i+=1){hAccArr[i]+=deltaY;}}return deltaY;},getMiniChartWidth:function(rowIdx,colIdx){if(this.API.getChartWidth){return Math.floor(this.API.getChartWidth(rowIdx,colIdx)*this.manager.widthScale);}if(this.manager.API.getChartWidth){return Math.floor(this.manager.API.getChartWidth(rowIdx,colIdx)*this.manager.widthScale);}return this.getColWidth(colIdx);},getMiniChartHeight:function(rowIdx,colIdx){if(this.API.getChartHeight){return Math.floor(this.API.getChartHeight(rowIdx,colIdx)*this.manager.heightScale);}if(this.manager.API.getChartHeight){return Math.floor(this.manager.API.getChartHeight(rowIdx,colIdx)*this.manager.heightScale);}return this.getRowHeight(rowIdx);},getRowHeight:function(rowIdx){var startIdx,endIdx,arr=this.hAccArr;if(rowIdx instanceof Array){startIdx=rowIdx[0]-1;endIdx=rowIdx[1];}else{startIdx=rowIdx-1;endIdx=rowIdx;}return arr[endIdx]-((startIdx===-1)?0:arr[startIdx]);},getColWidth:function(colIdx){var startIdx,endIdx,arr=this.wAccArr;if(colIdx instanceof Array){startIdx=colIdx[0]-1;endIdx=colIdx[1];}else{startIdx=colIdx-1;endIdx=colIdx;}return arr[endIdx]-((startIdx===-1)?0:arr[startIdx]);},getRowPosition:function(rowIdx){if(rowIdx===0){return 0;}return this.hAccArr[rowIdx-1];},getColPosition:function(colIdx){if(colIdx===0){return 0;}return this.wAccArr[colIdx-1];},doRowIntersectionCheck:function(y1,y2,addOffset){addOffset=addOffset||false;if(y1===undefined){y1=this._y1;}else{if(addOffset){y1+=this.origin.y;}}if(y2===undefined){y2=this._y2;}else{if(addOffset){y2+=this.origin.y;}}return{start:doHitTest(this.hAccArr,y1),end:doHitTest(this.hAccArr,y2)};},doColIntersectionCheck:function(x1,x2,addOffset){addOffset=addOffset||false;if(x1===undefined){x1=this._x1;}else{if(addOffset){x1+=this.origin.x;}}if(x2===undefined){x2=this._x2;}else{if(addOffset){x2+=this.origin.x;}}return{start:doHitTest(this.wAccArr,x1),end:doHitTest(this.wAccArr,x2)};},getChartBBox:function(row,col,minusOffset){var x,y,origin=this.origin,box={};x=this.getColPosition(col);y=this.getRowPosition(row);if(minusOffset){x-=origin.x;y-=origin.y;}box.left=x;box.top=y;box.width=this.getColWidth(col);box.height=this.getRowHeight(row);return box;},filterRowsByType:function(rowStart,rowEnd,type){var i,j,chart,chartType,nCols=this.nCols,ret=[];for(i=rowStart;i<=rowEnd;i++){for(j=0;j<nCols;j++){chart=this.getChart(i,j);if(chart&&chart.getAttribute){chartType=chart.getAttribute("type");if(chartType===type){ret.push(chart);}}}}return ret;},filterColsByType:function(colStart,colEnd,type){var i,j,chart,chartType,nRows=this.nRows,ret=[];for(j=colStart;j<=colEnd;j++){for(i=0;i<nRows;i++){chart=this.getChart(i,j);if(chart&&chart.getAttribute){chartType=chart.getAttribute("type");if(chartType===type){ret.push(chart);}}}}return ret;}});}());