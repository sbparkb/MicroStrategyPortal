(function(){mstrmojo.requiresCls("mstrmojo.Obj","mstrmojo.hash","mstrmojo.dom","mstrmojo.array");var $M=Math,$HS=mstrmojo.publisher.hasSubs,$HASH=mstrmojo.hash,$FOREACH=$HASH.forEach,$D=mstrmojo.dom;var VELOCITY_THRESHOLD=0.15;var INC_EDGE_START=1,INC_EDGE_END=2;var indicators={y:{edge:["top","bottom"],size:0},x:{edge:["left","right"],size:0},clsName:"mstrmojo-touch-scroll-indicator",init:function init(){var vertical=this.y,horizontal=this.x;if(!vertical.i){var vIndicator=vertical.i=document.createElement("div");vIndicator.className=this.clsName;var hIndicator=horizontal.i=vIndicator.cloneNode(false);document.body.appendChild(vIndicator);document.body.appendChild(hIndicator);}},setGradient:function setGradient(indicator,scrollerAtMax,delta,containerMaxSize){var indicatorEl=indicator.i,edge=indicator.edge[scrollerAtMax?1:0];var gradientSize=$M.min($M.round($M.min($M.abs(delta)/200,1)*100),containerMaxSize/2),start="left top",end="left bottom";if(scrollerAtMax){end=start;if(edge==="bottom"){start="left bottom";}else{start="right top";}}else{if(edge==="left"){end="right top";}}if(gradientSize!==indicator.size){indicatorEl.style.background="-webkit-gradient(linear, "+start+", "+end+", from(rgba(39, 104, 162, .4)), to(rgba(39, 104, 162, 0)), color-stop("+(gradientSize/100)+", rgba(39, 104, 162, 0)))";indicator.size=gradientSize;}},scrollAxis:function scroll(axis,touchPosition,constrainedPosition,widgetPosition,outOfBounds){var delta=touchPosition-constrainedPosition,isOutOfBounds=outOfBounds[axis]=(delta!==0);if(!isOutOfBounds){this.hide(axis);return ;}var indicator=this[axis],indicatorEl=indicator.i,indicatorStyle=indicatorEl.style,isVertical=(axis==="y"),scrollerAtMax=(delta>0),clsName=this.clsName+" "+indicator.edge[scrollerAtMax?1:0];if(!indicator.size||indicatorEl.className!==clsName){indicatorEl.className=clsName;var px="px",borderWidth=3,top=widgetPosition.y,left=widgetPosition.x,height=100,width=widgetPosition.w;if(isVertical){if(scrollerAtMax){top+=widgetPosition.h-height-borderWidth;}}else{width=height;height=widgetPosition.h;if(scrollerAtMax){left+=widgetPosition.w-width-borderWidth;}}indicatorStyle.top=top+px;indicatorStyle.left=left+px;indicatorStyle.width=width+px;indicatorStyle.height=height+px;indicatorStyle.display="block";}this.setGradient(indicator,scrollerAtMax,delta,isVertical?widgetPosition.h:widgetPosition.w);},scroll:function scroll(scroller,position,constrainedX,constrainedY,scrollEl){var x=position.x,y=position.y;if(x!==constrainedX||y!==constrainedY){this.init();var widgetPosition=this._widgetPosition;if(!widgetPosition){var el=scroller.indicatorEl||scrollEl;widgetPosition=mstrmojo.dom.position(el.parentNode);}var outOfBounds=scroller._outOfBounds||{};this.scrollAxis("y",y,constrainedY,widgetPosition,outOfBounds);this.scrollAxis("x",x,constrainedX,widgetPosition,outOfBounds);this._widgetPosition=widgetPosition;scroller._outOfBounds=outOfBounds;}else{this.hideAll();delete scroller._outOfBounds;}},hide:function hide(axis){var a=this[axis];if(a.size!==undefined){a.i.style.display="none";a.i.className=this.clsName;a.size=0;}},hideAll:function hideAll(){this.hide("y");this.hide("x");delete this._widgetPosition;}};function constrainPoint(value,offset){return offset?$M.max($M.min($M.round(value),offset.end),offset.start):value;}function raiseScrollerEvent(scroller,evtName,evtObj){evtObj.name=evtName;evtObj.id=scroller.identifier;scroller.raiseEvent(evtObj);}function stopDecelOnScrollDone(){var evtName="scrollDone",origin=this.origin;if($HS(this.id,evtName)&&origin){raiseScrollerEvent(this,evtName,{x:origin.x,y:origin.y});}this.stopDeceleration();}function applyPosition(scroller,position,duration){var scrollEl=scroller.scrollEl;if(!scrollEl){stopDecelOnScrollDone.call(scroller);return ;}var positions={x:position.x||0,y:position.y||0};$FOREACH(scroller._scrollBarEls,function(bar,axis){var isX=(axis==="x"),position=positions[axis],length=bar.length,ratio=bar.ratio,viewportSize=bar.viewportSize,minScale=6/length,minPosition=bar["base"+(isX?"Left":"Top")],maxPosition=minPosition+viewportSize-length,newPosition=$M.round(minPosition+(ratio*position));if(newPosition<minPosition){newPosition=minPosition-position;length+=position;}else{if(newPosition>maxPosition){var delta=(position-scroller.offset[axis].end)*ratio;newPosition=$M.min(maxPosition+delta,viewportSize+minPosition-6)-1;length-=delta;}}var v=0,translate=[v,v,v],scale=[1,1,1],idx=isX?0:1;translate[idx]=(newPosition-minPosition);scale[idx]=$M.min($M.max(length/bar.length,minScale),1);$D.translate(bar,translate[0],translate[1],translate[2]," scale3d("+scale.join(",")+")");});if(duration){duration+="ms";}if(scroller._isHosted){var parentNode=scrollEl.parentNode;parentNode.scrollTop=positions.y;parentNode.scrollLeft=positions.x;}else{scrollEl.style[$D.CSS3_TRANSITION_DURATION]=duration||"0";$D.translate(scrollEl,-positions.x,-positions.y,0,scroller.transform,scroller.useTranslate3d);}if($HS(scroller.id,"scrollMoved")){raiseScrollerEvent(scroller,"scrollMoved",{x:position.x,y:position.y});}}function fnGetTime(finalVelocity,initialVelocity,friction){return $M.ceil(1+$M.log(finalVelocity/$M.abs(initialVelocity))/$M.log(1-friction));}function fnGetPosition(position,directionMultiplier,initialVelocity,timeInterval,friction){return position+(directionMultiplier*(initialVelocity*(1-$M.pow(1-friction,timeInterval))/friction));}function calculateAxisPosition(scroller,position,axis,direction,velocity,delta,totalTime){var offset=scroller.offset[axis];if(!offset){return position;}var outOfBounds=scroller._outOfBounds,isAxisOutOfBounds=outOfBounds&&outOfBounds[axis],incFetch=offset.incFetch,friction=scroller.friction,start=offset.start,end=offset.end,limit=direction?end:start;velocity=$M.abs(velocity);if(isAxisOutOfBounds){direction=(position<start);limit=direction?start:end;}var directionMultiplier=direction?1:-1;if(isAxisOutOfBounds&&(direction||!incFetch)){var finalVelocity=VELOCITY_THRESHOLD*3,a=1/(1-friction),initialVelocity=finalVelocity/$M.pow((1-friction),($M.log(1-$M.abs(position-limit)*(1-a)/finalVelocity)/$M.log(a))-1);var calculatedPosition=$M.round(fnGetPosition(position,directionMultiplier,initialVelocity,delta,friction));if(direction?(calculatedPosition>=limit):(calculatedPosition<=limit)){stopDecelOnScrollDone.call(scroller);return limit;}return calculatedPosition;}var pageSize=offset.pageSize,supportedEdges=offset.supportedEdges;var newPosition=fnGetPosition(position,directionMultiplier,velocity,delta,friction),bStart=(newPosition<=start),bEnd=(newPosition>=end);if(bStart||bEnd){if(incFetch&&((bStart&&((supportedEdges&INC_EDGE_START)>0))||(bEnd&&((supportedEdges&INC_EDGE_END)>0)))){if(newPosition-end>=pageSize){newPosition=end+pageSize;limit=newPosition;}if(!scroller.STATUS_INC_FETCH){scroller.STATUS_INC_FETCH=true;raiseScrollerEvent(scroller,"incFetch",{edge:bEnd?INC_EDGE_END:INC_EDGE_START});}}else{if(scroller.bounces){var bounceFriction=friction*2,bVelocity=scroller.bounceVelocity,bTime=scroller.bounceTime,bDistance=scroller.bounceDistance;if(!scroller.hasBounced){bVelocity[axis]=$M.abs(VELOCITY_THRESHOLD/$M.pow(1-friction,totalTime-delta-1));bTime[axis]=fnGetTime(VELOCITY_THRESHOLD,bVelocity[axis],bounceFriction);bDistance[axis]=$M.abs(fnGetPosition(newPosition,directionMultiplier,bVelocity[axis],bTime[axis],bounceFriction)-newPosition);scroller.raiseEvent({name:"bounceOut",id:scroller.identifier,axis:axis,direction:direction,value:$M.round(newPosition)});scroller.hasBounced=true;}var bounceLimit=Math.floor(bDistance[axis]/2);var bouncePosition=fnGetPosition(limit,directionMultiplier,bVelocity[axis],delta,bounceFriction),travelDistance=$M.abs(bouncePosition-limit);if($M.abs(travelDistance)<bounceLimit){return bouncePosition;}if($M.abs(travelDistance)>=bDistance[axis]){stopDecelOnScrollDone.call(scroller);return limit;}var limitDistance=bounceLimit-(travelDistance-bounceLimit);return $M.round(limit-(direction?-limitDistance:limitDistance));}newPosition=limit;}}return $M.round(newPosition);}function detachHostedScrollListener(el){var scrollListener=this._scrollListener;if(scrollListener){if(!el||el!==scrollListener.el){$D.detachEvent(scrollListener.el,"scroll",scrollListener.fn);delete this._scrollListener;return true;}return false;}return true;}mstrmojo.TouchScroller=mstrmojo.declare(mstrmojo.Obj,null,{scriptClass:"mstrmojo.TouchScroller",scrollEl:null,identifier:"",hScroll:false,vScroll:false,offset:null,origin:null,transform:"",friction:0.0015,frameRate:60,bounces:true,hasBounced:false,bounceDistance:{},bounceTime:{},bounceVelocity:{},showScrollbars:false,showIndicators:true,useTranslate3d:true,STATUS_INC_FETCH:false,init:function init(props){this._super(props);indicators.init();},initScroller:function initScroller(props){$HASH.copy(props,this);var scrollEl=this.scrollEl;if(scrollEl){var isHosted=this._isHosted=false;if(isHosted){var parentNode=scrollEl.parentNode;if(detachHostedScrollListener.call(this,parentNode)){parentNode.style.overflow="auto";var id=this.id,listener=this._scrollListener={el:parentNode,fn:function(evt){var origin=mstrmojo.all[id].origin,target=evt.target;origin.x=target.scrollLeft;origin.y=target.scrollTop;}};$D.attachEvent(parentNode,"scroll",listener.fn);}this.showScrollbars=false;}}},canScroll:function canScroll(){return this.vScroll||this.hScroll;},updateScrollBars:function updateScrollBars(viewportCoords,scrollBarContainerElement){var scrollEl=this.scrollEl;if(!this.showScrollbars||!scrollEl){return ;}var bars=this._scrollBarEls;if(!bars){var me=this;bars=this._scrollBarEls={x:"hScroll",y:"vScroll"};$FOREACH(bars,function(scroll,axis){if(me[scroll]){var bar=document.createElement("div");bar.className="mstrmojo-touch-scrollBar "+axis+"Axis";(scrollBarContainerElement||scrollEl.parentNode).appendChild(bar);bars[axis]=bar;}else{delete bars[axis];}});}if(!viewportCoords){var parentNode=this.scrollEl.parentNode;viewportCoords={top:0,right:parentNode.clientWidth,bottom:parentNode.clientHeight,left:0};}var offset=9,scrollBarCoords={x:{left:viewportCoords.left,top:viewportCoords.bottom-offset,x:viewportCoords.right-viewportCoords.left,d:"Width"},y:{left:viewportCoords.right-offset,top:viewportCoords.top,x:viewportCoords.bottom-viewportCoords.top,d:"Height"}};$FOREACH(bars,function(bar,axis){var barStyle=bar.style,coords=scrollBarCoords[axis],dimension=coords.d,parentNode=bar.parentNode,x=coords.x;var left=coords.left,top=coords.top,ratio=x/scrollEl["offset"+dimension],length=Math.min(Math.round(x*ratio),x);bar.baseLeft=left;bar.baseTop=top;bar.ratio=ratio;bar.viewportSize=x;bar.length=length;barStyle.left=left+"px";barStyle.top=top+"px";barStyle[dimension.toLowerCase()]=length+"px";});},toggleScrollBars:function toggleScrollBars(visible){$FOREACH(this._scrollBarEls,function(bar){bar.style.opacity=visible?1:0;});},scrollTo:function(x,y,duration){if(!this.canScroll()&&!(x===0&&y===0)){applyPosition(this,{x:0,y:0});return ;}var offset=this.offset,origin=this.origin,position={x:(this.hScroll)?constrainPoint(x,offset.x):0,y:(this.vScroll)?constrainPoint(y,offset.y):0};applyPosition(this,position,duration);origin.x=position.x;origin.y=position.y;},scrollToEnd:function(x,y,duration){var origin=this.origin,offset=this.offset,result={x:0,y:0};if(origin&&offset){mstrmojo.array.forEach([x,y],function(scroll,idx){var axis=idx?"y":"x",axisOffset=offset[axis];result[axis]=scroll?(axisOffset&&axisOffset.end)||0:origin[axis];});}this.scrollTo(result.x,result.y,duration);},scroll:function scroll(touch){if(this._isHosted){return ;}var offset=this.offset,scrollEl=this.scrollEl,touchDelta=touch.delta,touchDeltaX=touchDelta.x,touchDeltaY=touchDelta.y;if(!scrollEl){return ;}if(!offset&&this.showIndicators){indicators.scroll(this,{x:(this.noHScroll)?0:-touchDeltaX,y:(this.noVScroll)?0:-touchDeltaY},0,0,scrollEl);return ;}var origin=this.origin,position={x:(this.hScroll)?$M.round(origin.x-touchDeltaX):0,y:(this.vScroll)?$M.round(origin.y-touchDeltaY):0},constrainedX=constrainPoint(position.x,offset.x),constrainedY=constrainPoint(position.y,offset.y);if(!offset.scrollPast){if(this.showIndicators){indicators.scroll(this,position,constrainedX,constrainedY,scrollEl);}position.x=constrainedX;position.y=constrainedY;}else{var isXAxisOutOfBounds=(constrainedX!==position.x),isYAxisOutOfBounds=(constrainedY!==position.y),isOutOfBounds=(isXAxisOutOfBounds||isYAxisOutOfBounds),outOfBounds=this._outOfBounds,evtName="";if(outOfBounds){if(isXAxisOutOfBounds!==(outOfBounds.x===true)||isYAxisOutOfBounds!==(outOfBounds.y===true)){evtName="scrollIn";}}else{if(isOutOfBounds){evtName="scrollOut";}}if(evtName){if($HS(this.id,evtName)){var direction=touch.direction;raiseScrollerEvent(this,evtName,{x:{position:position.x,direction:direction.x},y:{position:position.y,direction:direction.y}});}if(isOutOfBounds){this._outOfBounds={x:isXAxisOutOfBounds,y:isYAxisOutOfBounds};}else{delete this._outOfBounds;}}}applyPosition(this,position);},scrollEnd:function scrollEnd(touch){indicators.hideAll();if(!this.canScroll()||this._isHosted){return ;}var id=this.id,friction=this.friction,a=1/(1-friction),initialPosition=this.origin,initialVelocity=touch.velocity,direction=touch.direction,startTime=new Date(),outOfBounds=this._outOfBounds,offset=this.offset,canScrollAxis={x:this.hScroll,y:this.vScroll},velocity={},position={},directionMultiplier={},totalTime={},totalDistance={},finalVelocity={},start={},end={},limit={},initializeVars=function(axis){finalVelocity[axis]=VELOCITY_THRESHOLD;var axisOffset=offset[axis],axisIsOutOfBounds=(outOfBounds&&outOfBounds[axis]),indicatorVisible=(axisIsOutOfBounds&&(!axisOffset||!offset.scrollPast));position[axis]=(canScrollAxis[axis]&&!indicatorVisible)?initialPosition[axis]-touch.delta[axis]:initialPosition[axis];if(axisOffset){start[axis]=axisOffset.start;end[axis]=axisOffset.end;if(axisIsOutOfBounds){if(!indicatorVisible){direction[axis]=(position[axis]<start[axis]);limit[axis]=(direction[axis])?start[axis]:end[axis];if(direction[axis]||!axisOffset.incFetch){finalVelocity[axis]=VELOCITY_THRESHOLD*3;initialVelocity[axis]=finalVelocity[axis]/$M.pow((1-friction),($M.log(1-$M.abs(position[axis]-limit[axis])*(1-a)/finalVelocity[axis])/$M.log(a))-1);}}else{position[axis]=constrainPoint(initialPosition[axis]-touch.delta[axis],axisOffset);}}}velocity[axis]=(canScrollAxis[axis]&&!indicatorVisible)?$M.abs(initialVelocity[axis]):0;directionMultiplier[axis]=(direction[axis]||false)?1:-1;totalTime[axis]=fnGetTime(finalVelocity[axis],velocity[axis],friction);totalDistance[axis]=fnGetPosition(position[axis],directionMultiplier[axis],velocity[axis],totalTime[axis],friction);};initializeVars("x");initializeVars("y");initialPosition.x=position.x;initialPosition.y=position.y;var decelerateX=(velocity.x>0),decelerateY=(velocity.y>0);if(!offset.scrollPast&&!decelerateX&&!decelerateY){stopDecelOnScrollDone.call(this);var axis,offsetObj,bStart,bEnd,supportedEdges;for(axis in offset){offsetObj=offset[axis];supportedEdges=offsetObj.supportedEdges;bStart=((offsetObj.start===position[axis])&&((supportedEdges&INC_EDGE_START)>0));bEnd=((offsetObj.end===position[axis])&&((supportedEdges&INC_EDGE_END)>0));if(offsetObj.incFetch&&(bStart||bEnd)){this.STATUS_INC_FETCH=true;raiseScrollerEvent(this,"incFetch",{edge:bEnd?INC_EDGE_END:INC_EDGE_START});}}return ;}this.hasBounced=false;this.bounceDistance={};this.bounceTime={};this.bounceVelocity={};this.decelerating=true;var expectedInterval=Math.round(1000/this.frameRate),prevTime=startTime,actualInterval,axisIterator={x:decelerateX,y:decelerateY};this.decelerationTimer=window.setTimeout(function(){var scroller=mstrmojo.all[id],origin=scroller.origin,curTime=new Date(),delta=(curTime-startTime),axis;if(scroller._halt){stopDecelOnScrollDone.call(scroller);return ;}actualInterval=curTime-prevTime;prevTime=curTime;if(actualInterval>(expectedInterval+5)){expectedInterval=expectedInterval+$M.round((actualInterval-expectedInterval)/2);}for(axis in axisIterator){if(axisIterator[axis]){var newPosition=calculateAxisPosition(scroller,position[axis],axis,direction[axis],velocity[axis],delta,totalTime[axis]);if(!isNaN(newPosition)){origin[axis]=newPosition;}}}applyPosition(scroller,origin);var stopDecel=(delta>totalTime.x&&delta>totalTime.y);if(!stopDecel&&!scroller.bounces){stopDecel=true;mstrmojo.hash.forEach(offset,function(axis,key){var v=origin[key];if(v!==axis.end&&v!==axis.start){stopDecel=false;return false;}});}if(stopDecel){stopDecelOnScrollDone.call(scroller);}else{if(scroller.decelerating){scroller.decelerationTimer=window.setTimeout(arguments.callee,expectedInterval);}}},expectedInterval);},stopDeceleration:function stopDeceleration(){var isDecelerating=!!this.decelerating;if(isDecelerating){if(this.decelerationTimer){window.clearTimeout(this.decelerationTimer);delete this.decelerationTimer;}delete this.decelerating;this.toggleScrollBars(false);}delete this._outOfBounds;delete this.hasBounced;delete this.bounceDistance;delete this.bounceTime;delete this.bounceVelocity;delete this._halt;return isDecelerating;},haltScroller:function haltScroller(){this._halt=!!this.decelerating;},unrender:function unrender(){delete this.scrollEl;},destroy:function destroy(){this.stopDeceleration();detachHostedScrollListener.call(this);this._super();}});mstrmojo.TouchScroller.getScrollPositionTotals=function getScrollPositionTotals(widget){var parent=widget.parent,scroller=widget._scroller,origin=mstrmojo.hash.copy((scroller&&scroller.origin)||{x:0,y:0});if(parent){var parentOrigin=mstrmojo.TouchScroller.getScrollPositionTotals(parent);origin.x+=parentOrigin.x;origin.y+=parentOrigin.y;}return origin;};mstrmojo.TouchScroller.ScrollIndicators=indicators;mstrmojo.TouchScroller.EnumIncFetchEdges={start:INC_EDGE_START,end:INC_EDGE_END};}());