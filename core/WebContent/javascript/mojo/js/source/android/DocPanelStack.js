(function(){mstrmojo.requiresCls("mstrmojo.Container","mstrmojo._Formattable","mstrmojo._IsPanelStack","mstrmojo._IsSelectorTarget","mstrmojo._HasBuilder","mstrmojo._HasTouchScroller","mstrmojo._TouchGestures","mstrmojo.TouchScroller","mstrmojo.css");var $CSS=mstrmojo.css,$DOM=mstrmojo.dom,$M=Math,SWITCH_DURATION=700;function clearAnimationTimeout(){var handle=this._animHandle;if(handle){window.clearTimeout(handle);delete this._animHandle;}}function clearAnimationFlag(){delete this._animHandle;this._isAnimating=false;}function applyTransform(duration,value,force,simulateEvt){var lastValue=this._translateX;if(force||value!==lastValue){this._translateX=value;clearAnimationTimeout.call(this);if(duration){this._isAnimating=true;}var nodeStyle=this.containerNode.style;nodeStyle[$DOM.CSS3_TRANSITION_DURATION]=duration+"ms";nodeStyle[$DOM.CSS3_TRANSFORM]=$DOM.createTranslateString(-value);if(simulateEvt){var id=this.id;this._animHandle=window.setTimeout(function(){var w=mstrmojo.all[id];if(mstrmojo.all[id]._isAnimating){clearAnimationFlag.call(w);}},duration*3);}if(this._scroller){this._scroller.raiseEvent({name:"transformAnim",x:value,y:0});}}}function renderSelector(){if(!this.defn.dk){return ;}var panels=this.children,i=0,cnt=panels.length,selectedIdx=this.selectedIdx,btnMarkup=[];for(i=0;i<cnt;i++){btnMarkup.push('<div idx="'+i+'" class="');if(i===selectedIdx){btnMarkup.push("on");}btnMarkup.push('"><div></div></div>');}var selectorBtnsNode=this.selectorBtns,dpi=mstrMobileApp.getDeviceDPI();var tabWidths={160:26,213:26,240:38,320:57},btnWidth=tabWidths[dpi]||(tabWidths[160]*dpi/160);selectorBtnsNode.style.width=(cnt*btnWidth)+"px";selectorBtnsNode.innerHTML=btnMarkup.join("");this.selector.style.display="block";}mstrmojo.android.DocPanelStack=mstrmojo.declare(mstrmojo.Container,[mstrmojo._Formattable,mstrmojo._IsSelectorTarget,mstrmojo._HasBuilder,mstrmojo._HasTouchScroller,mstrmojo._IsPanelStack,mstrmojo._TouchGestures],{scriptClass:"mstrmojo.android.DocPanelStack",btnMarkup:"",markupString:'<div id="{@id}" title="{@tooltip}" class="mstrmojo-DocPanelStack {@cssClass}" style="{@domNodeCssText}"><div></div><div class="mstrmojo-PanelSelector"><div class="mstrmojo-SelectorBtns"></div></div></div>',markupSlots:{containerNode:function(){return this.domNode.firstChild;},selector:function(){return this.domNode.lastChild;},selectorBtns:function(){return this.domNode.lastChild.firstChild;}},formatHandlers:{domNode:["RW","B"]},scrollerConfig:{bounces:false,showScrollbars:false,vScroll:false,hScroll:true},addChildren:function addChildren(panels,idx,silent){this._super(panels,idx,silent);var containerNodeStyle=this.containerNode.style,formats=this.getFormats(),width=this._pnlWidth=parseInt(formats.width,10),height=parseInt(formats.height,10),selectedIdx=this.selectedIdx;var newPosition=this.selectedIdx*width;containerNodeStyle.width=(width*panels.length)+"px";if(!$DOM.isWinPhone){applyTransform.call(this,0,newPosition);}else{containerNodeStyle.msTransform=newPosition;}var i=0,cnt=panels.length;for(i=0;i<cnt;i++){var panel=panels[i];panel.visible=true;panel.selected=(i===selectedIdx);panel.updatePanelDimensions(i*width,height,width);}renderSelector.call(this);this.updateScroller();return true;},postBuildRendering:function postBuildRendering(){this._super();renderSelector.call(this);var id=this.id;mstrmojo.dom.attachEvent(this.containerNode,$DOM.CSS3_TRANSITION_END,function(evt){var widget=mstrmojo.all[id];if(evt.target!==widget.containerNode){return true;}clearAnimationTimeout.call(widget);evt.stopPropagation();clearAnimationFlag.call(widget);return false;});return true;},setInfoWindowDimensions:function setInfoWindowDimensions(d){var parent=this.parent;if(parent.scriptClass==="mstrmojo.DocPortlet"){parent.setInfoWindowDimensions(d);}var h=d.h,w=d.w,domNodeStyle=this.domNode.style,panels=this.children,len=panels.length,px="px",i;domNodeStyle.height=h+px;domNodeStyle.width=w+px;this.containerNode.style.width=(w*len)+px;this._pnlWidth=w;this._translateX=(this.selectedIdx||0)*w;for(i=0;i<len;i++){panels[i].updatePanelDimensions(i*w,h,w,true);}this.updateScroller();},getTitle:function getTitle(){return this.title;},initScroller:function initScroller(scroller){scroller.attachEventListener("scrollDone",this.id,function(evt){this._translateX=evt.x;});},updateScrollerConfig:function updateScrollerConfig(){var children=this.children,length=children&&children.length,cfg=this._super();cfg.noVScroll=true;if(length){var position=this._translateX||0,width=this._pnlWidth,offset;offset={start:$M.max(position-width,0),end:$M.min(position+width,length*width-width)};mstrmojo.hash.copy({scrollEl:this.containerNode,offset:{x:offset,scrollPast:false},origin:{x:position,y:0}},cfg);}return cfg;},onselectedIdxChange:function onselectedIdxChange(evt){var selector=this.selectorBtns,buttons=selector&&selector.childNodes;if(buttons){$CSS.addClass(buttons[evt.value],"on");$CSS.removeClass(buttons[evt.valueWas],"on");}},onselectedKeyChange:function onselKeyChg(evt){this._super(evt);var width=this._pnlWidth,position=this.selectedIdx*width;if($DOM.isWinPhone){var containerNode=this.containerNode;containerNode.style.position="relative";(new mstrmojo.fx.AnimateProp({props:{left:{isStyle:true,start:position,stop:this.prevSelectIdx*width,suffix:"px",ease:mstrmojo.ease.linear}},duration:0,target:containerNode})).play();}else{applyTransform.call(this,0,position);}this.updateScroller(true);},touchBegin:function touchBegin(touch){if(this._isAnimating){touch.stop();return false;}if(!this.defn.sw&&!$DOM.contains(this.selector,touch.target,true,this.domNode)){return false;}return this._super(touch);},touchTap:function touchTap(touch){var target=touch.target,domNode=this.domNode;if($DOM.contains(this.selector,target,true,domNode)){var selectorBtnsNode=this.selectorBtns,panelIdx=-1;if($DOM.contains(selectorBtnsNode,target,true,domNode)){panelIdx=$DOM.findAncestorByAttr(target,"idx",true,selectorBtnsNode).value;}else{panelIdx=this.selectedIdx+((touch.clientX-domNode.offsetLeft<(this._pnlWidth/2))?-1:1);}if(panelIdx>-1){var panel=this.children[panelIdx];if(panel){this.selectPanel(panel.k);}}}else{var ctrl=this.controller;if(ctrl&&ctrl.viewTap){ctrl.viewTap();}}},touchSwipeBegin:function touchSwipeBegin(touch){if(this.defn.sw||$DOM.contains(this.selector,touch.target,true,this.domNode)){return this._super(touch);}return this.bubbleTouchEvent(touch);},touchSwipeEnd:function touchSwipeEnd(touch){touch.evt.handled=true;mstrmojo.TouchScroller.ScrollIndicators.hideAll();var x=this._translateX||0,width=this._pnlWidth,offset=this._scroller.offset.x,position=$M.max($M.min(x-touch.delta.x,offset.end),offset.start),delta=x-position,absDelta=$M.abs(delta),duration=SWITCH_DURATION,isRevertAction=(absDelta<width*0.2);if(isRevertAction){position=x;duration*=absDelta/width;}else{position=x+((delta<0)?width:-width);duration*=(width-absDelta)/width;}applyTransform.call(this,$M.round(duration),position,true,isRevertAction);this.selectPanel(this.children[position/width].k,true);}});}());