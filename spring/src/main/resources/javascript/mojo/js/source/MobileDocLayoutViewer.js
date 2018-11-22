(function(){mstrmojo.requiresCls("mstrmojo.DocLayoutViewer","mstrmojo._Formattable","mstrmojo._TouchGestures","mstrmojo._HasTouchScroller","mstrmojo.dom");function checkLinks(checkAll){var links,newLinks=this._newLinks,allLinks=mstrmojo.hash.copy(newLinks,this._allLinks),links=checkAll?allLinks:newLinks;this._newLinks={};if(mstrMobileApp.isOnline()){return ;}var controller=this.controller,i,lnk,linkRequests=[],cacheableLinks=[],req;for(i in links){lnk=links[i];req=controller.getLinkRequest(lnk);if(req){linkRequests.push(req);cacheableLinks.push(lnk);}}var count=linkRequests.length;if(count){var fnSuccess=function(res){for(i=0;i<count;i++){lnk=cacheableLinks[i];lnk.src.setLinkEnabled(res[i]);}};if(mstrApp.isHosted()){}else{this.model.getDataService().checkCachedLinkTargets(linkRequests,{success:fnSuccess,failure:mstrmojo.emptyFn});}}}function applyChildDimensions(){var ch=this.children,i,len;for(i=0,len=(ch&&ch.length)||0;i<len;i++){var child=ch[i],slot=child.slot;if(slot){this.setSlotDimensions(slot,child.height,child.width);}}}mstrmojo.MobileDocLayoutViewer=mstrmojo.declare(mstrmojo.DocLayoutViewer,[mstrmojo._TouchGestures,mstrmojo._HasTouchScroller],{scriptClass:"mstrmojo.MobileDocLayoutViewer",layoutConfig:{h:{groupBy:"0",fixedHeaderNode:"auto",layout:"100%",fixedFooterNode:"auto",incFetchNode:"0"},w:{layout:"100%"}},formatHandlers:{domNode:["background-color"]},scrollerConfig:{vScroll:false,hScroll:false,bounces:false,showScrollbars:false},usesTouches:true,init:function init(params){this._super(params);this._newLinks={};this._allLinks={};},postBuildRendering:function postBuildRendering(){this._super();if(this.fixedFooterNode.clientHeight>0){applyChildDimensions.call(this);}},preBuildRendering:function preBuildRendering(){this._super();this._scrollCssText="overflow:"+((!mstrmojo.dom.isWinPhone)?"hidden":"auto");var id=this.id,updateScroller=this.updateScroller;if(!this.afterScrollSubscr){this.afterScrollSubscr=this.docLayout.attachEventListener("afterScroll",id,function(){this.updateScroller();checkLinks.call(this);});this.model.attachEventListener("partialUpdate",id,updateScroller);}},mapID:null,setMapID:function setMapID(id){this.mapID=id;},beforeViewHidden:function beforeViewHidden(isBack){if(!this.mapID){return ;}var c=mstrmojo.all[this.mapID];if(c&&c.beforeViewHidden){c.beforeViewHidden(isBack);}this.mapID=null;},updateScrollerConfig:function updateScrollerConfig(){var cfg=this.scrollerConfig,layoutNode=this.docLayout.containerNode;if(layoutNode){var docLayout=this.docLayout,xOffset={start:0,end:Math.max(docLayout.getWidth()-this.scrollboxWidth,0)},yOffset={start:0,end:Math.max(docLayout.getHeight()-this.scrollboxHeight,0)},vScroll=(yOffset.start!==yOffset.end),hScroll=(xOffset.start!==xOffset.end),offset;if(vScroll||hScroll){offset={x:xOffset,y:yOffset};}else{cfg.origin={x:0,y:0};}mstrmojo.hash.copy({scrollEl:this.scrollboxNode.firstChild,offset:offset,vScroll:vScroll,hScroll:hScroll,showScrollbars:false},cfg);if(!cfg.origin){cfg.origin=this._origin={x:0,y:0};}docLayout.scrollBuffer=parseInt(mstrApp.rootView.getContentDimensions().h,10);}return this._super();},initScroller:function initScroller(scroller){this._super(scroller);scroller.attachEventListener("scrollDone",this.id,function(evt){this._origin={x:evt.x,y:evt.y};this.notifyScrollListeners(evt);});},touchBegin:function touchBegin(touch){var p=this.parent;if(p&&p.isAnimating&&p.isAnimating()){touch.stop();return false;}return this._super(touch);},shouldTouchBubble:function shouldTouchBubble(touch){if(mstrmojo.dom.contains(this.scrollboxNode,touch.target,true,this.domNode)){return this._super(touch);}return true;},touchSwipeBegin:function touchSwipeBegin(touch){if(this.shouldTouchBubble(touch)){var parent=this.parent,parentCanScroll=parent.canScroll&&parent.canScroll(touch);if(parentCanScroll){this._parentScrolling=true;parent.beginScroll(touch);}return parentCanScroll;}this._super(touch);},touchSwipeMove:function touchSwipeMode(touch){if(this._parentScrolling){this.parent.scroll(touch);return ;}this._super(touch);},touchSwipeEnd:function touchSwipeEnd(touch){touch.evt.handled=true;if(this._parentScrolling){delete this._parentScrolling;this.parent.endScroll(touch);return ;}this._super(touch);},touchTap:function touchTap(){var ctrl=this.controller;if(ctrl&&ctrl.viewTap){ctrl.viewTap();}},renderChildren:function rnCh(){this._super();this.updateScroller();},unrender:function unrender(){delete this.scrollerConfig.origin;var scroller=this._scroller;if(scroller){delete scroller.origin;}if(this.subscr){mstrmojo.publisher.unsubscribe(this.subscr);delete this.subscr;}if(this.afterScrollSubscr){mstrmojo.publisher.unsubscribe(this.afterScrollSubscr);delete this.afterScrollSubscr;}this._super();},addLinkInfo:function addLinkInfo(id,linkInfo){this._newLinks[id]=linkInfo;},onRender:function onRender(){this._super();if(!this.subscr){var publisher=mstrmojo.publisher;this.subscr=publisher.subscribe(publisher.NO_SRC,publisher.CONNECTIVITY_CHANGED_EVENT,function(isOnline){if(isOnline){var links=this._allLinks,i,widget;for(i in links){widget=links[i].src;if(!widget.linkEnabled){widget.setLinkEnabled(true);}}}else{checkLinks.call(this,true);}},this.id);}if((mstrApp.useBinaryFormat||mstrApp.isHosted())&&!mstrMobileApp.isOnline()){var me=this;window.setTimeout(function(){checkLinks.call(me);},100);}},setSlotDimensions:function setSlotDimensions(slot,h,w){if(slot==="layout"){var winHeight=parseInt(this.height,10),headerHeight=this.fixedHeaderNode.clientHeight,footerHeight=this.fixedFooterNode.clientHeight,height=parseInt(h,10),actHeight=winHeight-headerHeight-footerHeight;if(headerHeight+footerHeight>=winHeight){h=0;}else{if(height!=actHeight){h=actHeight+"px";}}}this._super(slot,h,w);},getCaptureDimensions:function getCaptureDimensions(){return this.docLayout.getCaptureDimensions();}});}());