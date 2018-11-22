(function(){mstrmojo.requiresCls("mstrmojo.dom","mstrmojo.TouchScroller");var $D=mstrmojo.dom,$M=Math;function constrainPoint(value,offset){return(offset)?$M.max($M.min($M.round(value),offset.end),offset.start):value;}mstrmojo._NeedSyncScroller=mstrmojo.provide("mstrmojo._NeedSyncScroller",{init:function init(props){if(this._super){this._super(props);}if(!this.lisenters){this.lisenters=[];}},initScroller:function initScroller(scroller){if(this._super){this._super(scroller);}this._scrollMovedListener=this._scroller.attachEventListener("scrollMoved",this.id,function(evt){this.onScrollMoved(evt);});this._scrollDoneListener=this._scroller.attachEventListener("scrollDone",this.id,function(evt){this.onScrollDone(evt);});},onScrollMoved:function onScrollMoved(evt){if(this._super){this._super(evt);}this.syncScroller(evt,true);},onScrollDone:function onScrollDone(evt){if(this._super){this._super(evt);}this.syncScroller(evt,false);},syncScroller:function sScroller(evt,showScrollBar){if(!evt||evt.x==undefined||evt.y==undefined){return ;}var lisenters=this.lisenters,lisCount=this.lisenters.length;for(var i=0;i<lisCount;i++){var scroller=lisenters[i]._scroller,offset=scroller.offset;scroller.origin={x:scroller.hScroll?evt.x:0,y:scroller.vScroll?evt.y:0};$D.translate(scroller.scrollEl,-scroller.origin.x,-scroller.origin.y,0,scroller.transform,scroller.useTranslate3d);scroller.toggleScrollBars(showScrollBar);mstrmojo.hash.forEach(scroller._scrollBarEls,function(bar,axis){var isX=(axis==="x"),position=evt[axis],length=bar.length,ratio=bar.ratio,viewportSize=bar.viewportSize,minScale=6/length,minPosition=bar["base"+((isX)?"Left":"Top")],maxPosition=minPosition+viewportSize-length,newPosition=$M.round(minPosition+(ratio*position));if(newPosition<minPosition){newPosition=minPosition-position;length+=position;}else{if(newPosition>maxPosition){var delta=(position-scroller.offset[axis].end)*ratio;newPosition=$M.min(maxPosition+delta,viewportSize+minPosition-6)-1;length-=delta;}}var v=0,translate=[v,v,v],scale=[1,1,1],idx=(isX)?0:1;translate[idx]=(newPosition-minPosition);scale[idx]=$M.min($M.max(length/bar.length,minScale),1);$D.translate(bar,translate[0],translate[1],translate[2]," scale3d("+scale.join(",")+")");});}},addSyncScroller:function addSyncScroller(l){this.lisenters.push(l);},destroy:function destroy(){this.lisenters=null;if(this._scrollDoneListener){this._scroller.detachEventListener(this._scrollDoneListener);delete this._scrollDoneListener;}if(this._scrollMovedListener){this._scroller.detachEventListener(this._scrollMovedListener);delete this._scrollMovedListener;}this._super();}});}());