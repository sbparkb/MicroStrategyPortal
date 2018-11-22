(function(){mstrmojo.requiresCls("mstrmojo.Container","mstrmojo._HasLayout","mstrmojo.ui.menus._HasMenuPopup","mstrmojo.vi._MonitorsAppState","mstrmojo.vi.ui.tabs.Tab","mstrmojo.dom","mstrmojo.css");var $DOM=mstrmojo.dom,$ARR=mstrmojo.array,$CSS=mstrmojo.css,CSS_ANIMATE="animate",ADD_BUTTON_WIDTH="31px";function getTransitionEndEvtName(){var modernizr=window.Modernizr,transitionProp="transition";if(modernizr.testProp(transitionProp)){return $DOM.transEndEvtNames[modernizr.prefixed(transitionProp)];}return null;}function getPopupHandler(isOpen){return function(){this.menuNode.style.display=isOpen?"block":"none";};}function getWidthDelta(tabContainer){return Math.min(tabContainer.offsetWidth-tabContainer.firstChild.offsetWidth,0);}function getPositionProp(tabstrip){return tabstrip.isAlignRight?"right":"left";}function getTablePosition(tabTable,tabstrip){return parseInt(tabTable.style[getPositionProp(tabstrip)],10)||0;}function setButtonDisplay(){var tabContainer=this.tabContainerNode,showDown=false,showUp=false;if(getWidthDelta(tabContainer)<0){var tabContainerPos=$DOM.position(tabContainer),tabTablePos=$DOM.position(tabContainer.firstChild);showDown=(tabTablePos.x<tabContainerPos.x);showUp=(tabTablePos.x+tabTablePos.w>tabContainerPos.x+tabContainerPos.w+0.1);}this.downBtnNode.style.display=showDown?"block":"none";this.upBtnNode.style.display=showUp?"block":"none";}function filterArray(arr,fn){arr=(arr||[]);if(!arr.filter){return $ARR.filter(arr,fn);}return arr.filter(fn);}function mapArray(arr,fn){arr=(arr||[]);if(!arr.map){return $ARR.map(arr,fn);}return arr.map(fn);}function positionTabTable(alignToSelected,animate){if(this.isStatic){return ;}var tabContainer=this.tabContainerNode,selectedTab=filterArray(this.children,function(tab){return tab.isSelected;})[0],selectedTabDomNode=selectedTab&&selectedTab.domNode;if(!tabContainer||!selectedTabDomNode){return ;}var tabContainerPosition=$DOM.position(tabContainer),tabTable=tabContainer.firstChild,widthDelta=getWidthDelta(tabContainer),currentTablePosition=getTablePosition(tabTable,this),newTablePosition=Math.max(currentTablePosition,widthDelta);if(alignToSelected){if(widthDelta<0){var selectedTabPosition=$DOM.position(selectedTabDomNode),leftEdgeDelta=selectedTabPosition.x-tabContainerPosition.x,rightEdgeDelta=selectedTabPosition.x+selectedTabPosition.w-(tabContainerPosition.x+tabContainerPosition.w),isAlignRight=this.isAlignRight,fnUpdateNewPos=function(delta){newTablePosition=isAlignRight?newTablePosition+delta:newTablePosition-delta;};if(leftEdgeDelta<0){fnUpdateNewPos(leftEdgeDelta);}else{if(rightEdgeDelta>0){fnUpdateNewPos(rightEdgeDelta);}}}}if(newTablePosition!==currentTablePosition){var transEndEvt=getTransitionEndEvtName();if(animate&&transEndEvt){$CSS.addClass(tabTable,CSS_ANIMATE);$DOM.attachOneTimeEvent(tabTable,transEndEvt,function(){$CSS.removeClass(tabTable,CSS_ANIMATE);});}tabTable.style[getPositionProp(this)]=Math.max(widthDelta,Math.min(newTablePosition,0))+"px";}setButtonDisplay.call(this);}function isTab(child){return child.hasOwnProperty("index");}function updateTabProperties(){var children=this.children,total=0;(children||[]).every(function(child,idx){if(!isTab(child)){return false;}total++;child.index=idx;return true;});(children||[]).every(function(child){if(!isTab(child)){return false;}child.total=total;return true;});}function showTabMenu(menuCfg,menuBtn){var enumCorners=menuCfg.ENUM_CORNERS,alignment=[enumCorners.TOP_RIGHT,enumCorners.BOTTOM_RIGHT],tabStrip=this.parent;if(tabStrip.position!=="bottom"){alignment.reverse();}menuCfg.setAlignment(alignment[0],alignment[1]);var stripPosition=$DOM.position(tabStrip.domNode),menuBtnPosition=$DOM.position(menuBtn),menuNode=tabStrip.menuNode;var menuNodeStyle=menuNode.style;menuNodeStyle.top=(menuBtnPosition.y-stripPosition.y)+"px";menuNodeStyle.left=(menuBtnPosition.x-stripPosition.x)+"px";menuCfg.addPopupHandlers(tabStrip.id,getPopupHandler(true),getPopupHandler(false));menuCfg.hostId=tabStrip.id;menuCfg.hostElement=menuNode;menuCfg.isHostedWithin=false;tabStrip.openPopup(menuCfg.newInstance());}function raiseTabsChangeEvent(tabStrip){tabStrip.raiseEvent({name:"TabsChange"});}mstrmojo.vi.ui.tabs.TabStrip=mstrmojo.declare(mstrmojo.Container,[mstrmojo._HasLayout,mstrmojo.ui.menus._HasMenuPopup,mstrmojo.vi._MonitorsAppState],{scriptClass:"mstrmojo.vi.ui.tabs.TabStrip",markupString:'<div id="{@id}" class="mstrmojo-VITabStrip {@cssClass}" style="{@cssText}" ><div class="mstrmojo-VITabStrip-tabs"><div style="display:table"><div style="display:table-row"></div></div></div><div class="mstrmojo-VITabStrip-addBtn" mstrAttach:click><div></div></div><div class="mstrmojo-VITabStrip-downBtn" mstrAttach:click,mousedown><div></div></div><div class="mstrmojo-VITabStrip-upBtn" mstrAttach:click,mousedown><div></div></div><div class="mstrmojo-VITabStrip-menuHost"></div><div class="mstrmojo-VIDND-mask"></div></div>',markupSlots:{tabContainerNode:function(){return this.domNode.firstChild;},containerNode:function(){return this.domNode.firstChild.firstChild.firstChild;},addBtnNode:function(){return this.domNode.childNodes[1];},addBtnImgNode:function(){return this.domNode.childNodes[1].firstChild;},downBtnNode:function(){return this.domNode.childNodes[2];},upBtnNode:function(){return this.domNode.childNodes[3];},menuNode:function(){return this.domNode.childNodes[4];},maskNode:function(){return this.domNode.lastChild;}},isStatic:false,isAlignRight:true,tabContainerNode:null,downBtnNode:null,upBtnNode:null,menuNode:null,position:"bottom",layoutConfig:{w:{tabContainerNode:"100%",addBtnNode:ADD_BUTTON_WIDTH},xt:true},onAppStateChange:function onAppStateChange(evt){var presentationMode=mstrmojo.vi.VisualInsightApp.APP_STATES.PRESENTATION;if(evt.value===presentationMode||evt.valueWas===presentationMode){this.layoutConfig.w.addBtnNode=mstrApp.appState===presentationMode?"0px":ADD_BUTTON_WIDTH;this.doLayout();}},setStatic:function setStatic(isStatic,animate){this.isStatic=isStatic;if(!isStatic){positionTabTable.call(this,true,animate);}},setTabs:function setTabs(tabObjects,selectedKey){this.removeChildren();var $this=this,total=tabObjects.length;this.addChildren(mapArray(tabObjects,function(currentTab,idx){var tabKey=currentTab.k;return $this.getTabCfg(tabObjects,currentTab,{scriptClass:"mstrmojo.vi.ui.tabs.Tab",index:idx,total:total,draggable:!!total,dropZone:!!total,k:tabKey,isSelected:tabKey===selectedKey,showTabMenu:showTabMenu,tabMoved:function(isLeft){var tabIndex=this.index;this.parent.moveTab(tabIndex,tabIndex+(isLeft?-1:1),tabIndex);}});}));positionTabTable.call(this,true);raiseTabsChangeEvent(this);},getTabs:function getTabs(){return filterArray(this.children,isTab);},getTabCfg:function getTabCfg(allTabObjects,currentTabObject,cfg){return cfg;},deleteTab:function deleteTab(idx){var id=this.id,targetChild=this.children[idx],transEndEvt=getTransitionEndEvtName(),fnDelete=function(){var strip=mstrmojo.all[id];strip.removeChildren(targetChild);targetChild.destroy();updateTabProperties.call(strip);setButtonDisplay.call(strip);raiseTabsChangeEvent(strip);};if(transEndEvt){var tab=targetChild.domNode.firstChild,tabStyle=tab.style;tabStyle.width=tab.offsetWidth+"px";window.setTimeout(function(){$CSS.addClass(tab,CSS_ANIMATE);$DOM.attachOneTimeEvent(tab,transEndEvt,fnDelete);tabStyle.width=0;},0);}else{fnDelete();}},buildRendering:function bldRnd(){this._super();$CSS.toggleClass(this.domNode,"alignLeft",!this.isAlignRight);},postBuildRendering:function postBuildRendering(){var rtn=this._super();positionTabTable.call(this,true);return rtn;},doLayout:function doLayout(){this._super();positionTabTable.call(this);},setSelectedTab:function setSelectedTab(selectedKey){(this.children||[]).forEach(function(tab){tab.set("isSelected",tab.k===selectedKey);});raiseTabsChangeEvent(this);},getSelectedTab:function getSelectedTab(){var selTab=null,ch=this.children||[],i;for(i=0;i<ch.length;i++){if(ch[i].isSelected){selTab=ch[i];break;}}return selTab;},onclick:function onclick(evt){if(evt.getTarget()===this.addBtnImgNode){this.addTab();}},addTab:mstrmojo.emptyFn,onmousedown:function onmousedown(evt){var target=evt.getTarget().parentNode,isDownBtn=(target===this.downBtnNode);if(isDownBtn||target===this.upBtnNode){var tabContainer=this.tabContainerNode,tabTable=tabContainer.firstChild,minimumPosition=getWidthDelta(tabContainer),currentPosition=getTablePosition(tabTable,this),incrementValue=this.isAlignRight?(isDownBtn?-10:10):(isDownBtn?10:-10),id=this.id,me=this,h;if(mstrApp.setInteractive){mstrApp.setInteractive(false);}$CSS.addClass(target,"active");var fnScrollDone=function(){window.clearInterval(h);$CSS.removeClass(target,"active");setButtonDisplay.call(mstrmojo.all[id]);if(mstrApp.setInteractive){mstrApp.setInteractive(true);}};$DOM.attachOneTimeEvent(document.body,"mouseup",fnScrollDone);h=window.setInterval(function(){currentPosition=Math.min(Math.max(minimumPosition,currentPosition+incrementValue),0);tabTable.style[getPositionProp(me)]=currentPosition+"px";if(currentPosition===minimumPosition||currentPosition===0){fnScrollDone();}},33);}},moveTab:function moveTab(fromIdx,toIdx,startIdx,silent){var children=this.children,childToMove=children.splice(fromIdx,1)[0];children.splice(toIdx,0,childToMove);updateTabProperties.call(this);var containerNode=this.containerNode,containerChildren=containerNode.childNodes,nodeToMove=containerNode.removeChild(containerChildren[fromIdx]),insertBeforeChild=containerChildren[toIdx];if(insertBeforeChild){containerNode.insertBefore(nodeToMove,insertBeforeChild);}else{containerNode.appendChild(nodeToMove);}if(childToMove.isSelected){positionTabTable.call(this,true,true);}if(!silent&&startIdx!==undefined&&startIdx!==toIdx){this.commitTabMove(startIdx,toIdx);raiseTabsChangeEvent(this);}},commitTabMove:function commitTabMove(fromIdx,toIdx){throw new Error(this.scriptClass+" must implement commitTabMove.");}});}());