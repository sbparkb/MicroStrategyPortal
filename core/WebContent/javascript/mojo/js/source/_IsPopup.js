(function(){mstrmojo.requiresCls("mstrmojo.ui.PopupConfig","mstrmojo.array","mstrmojo.hash","mstrmojo.css","mstrmojo.dom");function toggleLockInfoWinForScroll(owner,lock){if(!mstrmojo.DocInfoWindow){return ;}var w=owner;while(w){if(w instanceof mstrmojo.DocInfoWindow){w[lock?"registerScrollLock":"releaseScrollLock"](this);break;}w=w.parent;}}var $ARR=mstrmojo.array,$DOM=mstrmojo.dom,$HASH=mstrmojo.hash,$CSS=mstrmojo.css,$PX="px";var isDebugging=false;function toggleLockInfoWin(owner,lock){if(!mstrmojo.DocInfoWindow){return ;}var w=owner;while(w){if(w instanceof mstrmojo.DocInfoWindow){w[lock?"registerLock":"releaseLock"](this);this.lockIW=lock?w:null;break;}w=w.parent;}}var $ENUM_CORNERS=mstrmojo.ui.PopupConfig.ENUM_CORNERS,ENUM_CORNER_TOP_LEFT=$ENUM_CORNERS.TOP_LEFT,ENUM_CORNER_TOP_RIGHT=$ENUM_CORNERS.TOP_RIGHT,ENUM_CORNER_BOTTOM_RIGHT=$ENUM_CORNERS.BOTTOM_RIGHT,ENUM_CORNER_BOTTOM_LEFT=$ENUM_CORNERS.BOTTOM_LEFT;function isCornerLeft(corner){return(corner===ENUM_CORNER_BOTTOM_LEFT||corner===ENUM_CORNER_TOP_LEFT);}function isCornerRight(corner){return(corner===ENUM_CORNER_TOP_RIGHT||corner===ENUM_CORNER_BOTTOM_RIGHT);}function isCornerBottom(corner){return(corner===ENUM_CORNER_BOTTOM_RIGHT||corner===ENUM_CORNER_BOTTOM_LEFT);}function isCornerTop(corner){return(corner===ENUM_CORNER_TOP_RIGHT||corner===ENUM_CORNER_TOP_LEFT);}function calculateOverflowDirections(cfg,bodyPos,hostElemPos,menuPos){var hostX=hostElemPos.x,hostY=hostElemPos.y,hostWidth=hostElemPos.w||0,hostHeight=hostElemPos.h||0,menuWidth=menuPos.w,menuHeight=menuPos.h,corners=cfg.alignment,popupCorner=corners.popup,hostCorner=corners.host,isHostAlignedRight=isCornerRight(hostCorner),isHostAlignedBottom=isCornerBottom(hostCorner),hasOverflowedRight=false,hasOverflowedBottom=false,hasOverflowedLeft=false,hasOverflowedTop=false;if(isCornerLeft(popupCorner)){var menuRightPos=hostX+menuWidth+(isHostAlignedRight?hostWidth:0);hasOverflowedRight=bodyPos.w<menuRightPos;}if(isCornerTop(popupCorner)){var menuBottomPos=hostY+menuHeight+(isHostAlignedBottom?hostHeight:0);hasOverflowedBottom=bodyPos.h<menuBottomPos;}if(isCornerRight(popupCorner)){var menuLeftPos=hostX-menuWidth+(isHostAlignedRight?hostWidth:0);hasOverflowedLeft=menuLeftPos<0;}if(isCornerBottom(popupCorner)){var menuTopPos=hostY-menuHeight+(isHostAlignedBottom?hostHeight:0);hasOverflowedTop=menuTopPos<0;}return{top:hasOverflowedTop,bottom:hasOverflowedBottom,left:hasOverflowedLeft,right:hasOverflowedRight};}function callPopupHandlers(isOpen){var popupConfig=this.popupConfig;if(popupConfig){$HASH.forEach(popupConfig.popupHandlers,function(h,id){var fn=h[isOpen?"open":"close"];if(fn){fn.call(mstrmojo.all[id]||fn,!!isOpen);}});}}function setHostProxyVisibility(show){var cfg=this.popupConfig;if(cfg&&!cfg.isHostedWithin){var hostProxy=this.hostProxy;if(hostProxy){hostProxy.style.display=show?"":"none";}}}function isValidPosValue(v){return v!==undefined&&v!==null&&!isNaN(v);}mstrmojo._IsPopup={visible:false,lockIWForScroll:false,disposable:true,opener:null,onOpen:mstrmojo.emptyFn,onClose:mstrmojo.emptyFn,popupConfig:null,hostProxy:undefined,open:function open(opener,config){callPopupHandlers.call(this,true);if(this.updatePopupConfig){this.updatePopupConfig(config,opener);}else{$HASH.forEach(config,function(v,k){this.set(k,v);},this);}var positionCSS="popup-mid-render";this.set("opener",opener);if(!this.hasRendered){var currentVisible=this.visible;this.visible=false;this.render();$CSS.addClass(this.domNode,positionCSS);this.set("visible",currentVisible);}if(this.nudge){this.domNode.style.top="-10000px";}setHostProxyVisibility.call(this,true);this.set("visible",true);if(this.lockIWForScroll){toggleLockInfoWinForScroll.call(this,this.opener,true);}if(config&&config.lockIW){toggleLockInfoWin.call(this,config.lockIW,true);}if(this.nudge){this.nudge();}this.adjustCornersForPopupOverflow();this.onOpen();$CSS.removeClass(this.domNode,positionCSS);},adjustCornersForPopupOverflow:function adjustCornersForPopupOverflow(){var cfg=this.popupConfig;if(!cfg){return false;}var includeScroll=(cfg.includeScroll!==undefined)?cfg.includeScroll:true;var popupAnchorPos=cfg.position||$DOM.position(cfg.anchorElement||cfg.hostElement,includeScroll);if(!cfg.isHostedWithin){var oldHostProxy=this.hostProxy,hostProxyElement=this.hostProxy=document.createElement("div");document.body.appendChild(hostProxyElement);hostProxyElement.appendChild(this.domNode);if(oldHostProxy){oldHostProxy.parentNode.removeChild(oldHostProxy);}var divStyle=hostProxyElement.style,POS_TO_STYLE_ATTR_MAP={x:"left",y:"top",w:"width"};hostProxyElement.className=cfg.hostProxyCssClass;divStyle.position="absolute";divStyle.background="none";divStyle.height="0";$ARR.forEach(["x","y","w"],function(posProp){var popupAnchorProp=popupAnchorPos[posProp];if(isValidPosValue(popupAnchorProp)){divStyle[POS_TO_STYLE_ATTR_MAP[posProp]]=popupAnchorProp+$PX;}});}var cornersEnum=cfg.ENUM_CORNERS,BOTTOM_LEFT=cornersEnum.BOTTOM_LEFT,BOTTOM_RIGHT=cornersEnum.BOTTOM_RIGHT,TOP_RIGHT=cornersEnum.TOP_RIGHT,TOP_LEFT=cornersEnum.TOP_LEFT;var overflowDirections=calculateOverflowDirections(cfg,$DOM.position(document.body),popupAnchorPos,$DOM.position(this.domNode)),hasOverflowedRight=overflowDirections.right,hasOverflowedBottom=overflowDirections.bottom,hasOverflowedLeft=overflowDirections.left,hasOverflowedTop=overflowDirections.top,corners=cfg.alignment,originalPopupCorner=corners.popup,originalHostCorner=corners.host,popupCorner=originalPopupCorner,hostCorner=originalHostCorner;if(hasOverflowedRight||hasOverflowedLeft){if(isCornerLeft(hostCorner)){hostCorner=isCornerTop(hostCorner)?TOP_RIGHT:BOTTOM_RIGHT;}else{if(isCornerRight(hostCorner)){hostCorner=isCornerTop(hostCorner)?TOP_LEFT:BOTTOM_LEFT;}}if(hasOverflowedRight&&isCornerLeft(popupCorner)){popupCorner=isCornerTop(popupCorner)?TOP_RIGHT:BOTTOM_RIGHT;}else{if(hasOverflowedLeft&&isCornerRight(popupCorner)){popupCorner=isCornerTop(popupCorner)?TOP_LEFT:BOTTOM_LEFT;}}}if(hasOverflowedBottom||hasOverflowedTop){if(isCornerLeft(hostCorner)){hostCorner=isCornerTop(hostCorner)?BOTTOM_LEFT:TOP_LEFT;}else{if(isCornerRight(hostCorner)){hostCorner=isCornerTop(hostCorner)?BOTTOM_RIGHT:TOP_RIGHT;}}if(hasOverflowedBottom&&isCornerTop(popupCorner)){popupCorner=isCornerLeft(popupCorner)?BOTTOM_LEFT:BOTTOM_RIGHT;}else{if(hasOverflowedTop&&isCornerBottom(popupCorner)){popupCorner=isCornerLeft(popupCorner)?TOP_LEFT:TOP_RIGHT;}}}if(hasOverflowedTop||hasOverflowedRight||hasOverflowedBottom||hasOverflowedLeft){if(isDebugging){console.log("Overflow directions: "+JSON.stringify(overflowDirections));}this._orgalgn={host:originalHostCorner,popup:originalPopupCorner};cfg.setAlignment(hostCorner,popupCorner);}if(!cfg.isHostedWithin){if(isValidPosValue(popupAnchorPos.y)&&isValidPosValue(popupAnchorPos.h)){this.hostProxy.style.top=(popupAnchorPos.y+(isCornerBottom(popupCorner)?(cfg.alignWithAnchor===true?popupAnchorPos.h:0):(cfg.alignWithAnchor===true?0:popupAnchorPos.h)))+$PX;}}var isHostBottom=isCornerBottom(hostCorner),isHostRight=isCornerRight(hostCorner),isPopupBottom=isCornerBottom(popupCorner),isPopupRight=isCornerRight(popupCorner),auto="auto",p100="100%",p0="0";var top=auto,right=auto,bottom=auto,left=auto;if(isPopupBottom){bottom=isHostBottom?p0:p100;}else{top=isHostBottom?p100:p0;}if(isPopupRight){right=isHostRight?p0:p100;}else{left=isHostRight?p100:p0;}var domNodeStyle=this.domNode.style;domNodeStyle.top=top;domNodeStyle.right=right;domNodeStyle.bottom=bottom;domNodeStyle.left=left;return true;},close:function close(config){if(this.onClose){this.onClose(config);}setHostProxyVisibility.call(this,false);if(this.lockIWForScroll){toggleLockInfoWinForScroll.call(this,this.opener,false);}this.set("visible",false);this.set("opener",null);if(this.lockIW){toggleLockInfoWin.call(this,this.lockIW,false);}callPopupHandlers.call(this,false);var originalAlignment=this._orgalgn;if(originalAlignment){this.popupConfig.setAlignment(originalAlignment.host,originalAlignment.popup);}},buildRendering:function buildRendering(){var res=this._super();if(res){if(!this.parent&&!this.domNode.parentElement){document.body.appendChild(this.domNode);}}return res;},unrender:function unrender(ignoreDom){if(this.popupConfig&&!this.popupConfig.isHostedWithin&&this.hostProxy){document.body.removeChild(this.hostProxy);delete this.hostProxy;}this._super(ignoreDom);}};}());