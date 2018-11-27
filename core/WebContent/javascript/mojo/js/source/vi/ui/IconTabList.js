(function(){mstrmojo.requiresCls("mstrmojo.ui.List","mstrmojo.dom","mstrmojo.array","mstrmojo.hash");var $DOM=mstrmojo.dom,$ARR=mstrmojo.array,$HASH=mstrmojo.hash,tooltipLeftOffset=2;var itemMarkup;function getTabMap(tabNode){var map=[];$ARR.forEach(this.itemsContainerNode.childNodes,function(node,idx){if(node!==tabNode){var tabPosition=$DOM.position(node);map.push({i:idx,m:tabPosition.x+(tabPosition.w/2)});}});return map;}mstrmojo.vi.ui.IconTabList=mstrmojo.declare(mstrmojo.ui.List,null,{scriptClass:"mstrmojo.vi.ui.IconTabList",init:function init(props){this._super(props);mstrmojo.css.addWidgetCssClass(this,"mstrmojo-VIIconTabList");},markupMethods:{onvisibleChange:mstrmojo.Widget.visibleMarkupMethod},items:null,useRichTooltip:true,listHooks:{select:function(el){var itemNode=this.getItemNodeFromTarget(el);if(itemNode){var position=$DOM.position(itemNode.firstChild);this.set("richTooltip",$HASH.copy({top:position.y+position.h,left:position.x-tooltipLeftOffset},$HASH.clone(this.richTooltip)));}}},showTooltip:function showTooltip(evt,win){var target=evt.target||$DOM.eventTarget(evt.hWin,evt.e),item=this.getItemFromTarget(target);if(!item||item===this.getSelectedItems()[0]){return ;}if(item&&item.n){var position=$DOM.position(this.getItemNodeFromTarget(target).firstChild);this.richTooltip={posType:mstrmojo.tooltip.POS_TOPLEFT,cssClass:"vi-regular vi-tooltip-A",content:item.n,top:position.y+position.h+3,left:position.x-tooltipLeftOffset};this._super(evt,win);}},getItemMarkup:function getItemMarkup(item){if(!itemMarkup){itemMarkup=this._super(item).replace(">{@en@n}<","><div>{@en@n}</div><");}return itemMarkup;},getItemProps:function getItemProps(item,idx){var props=this._super(item,idx);props.addCls(item.cls);return props;},selectionAdded:function selectionAdded(evt){this.hideTooltip();this.tabSelected(this.items[evt.added[0]]);},tabSelected:function tabSelected(tabItem){},getTabIds:function getTabIds(){var selectedItem=this.getSelectedItems()[0];return this.items.map(function(item){return item.id+((item===selectedItem)?"*":"");}).join("|");},getDragTabInfo:function getDragTabInfo(node){var tab=$DOM.findAncestorByAttr(node,"idx",true,this.domNode),items=this.items,isSingle=items.length===1;if(tab){var idx=parseInt(tab.value,10);return{id:this.parent.id,node:tab.node,homeIdx:idx,idx:idx,item:items[tab.value],isSingleTab:isSingle,active:!isSingle,pos:null,panel:null};}return null;},enterDragMode:function enterDragMode(tabInfo,context){this.selectItems(tabInfo.item,true);var tabNode=tabInfo.node,listPosition=$DOM.position(this.domNode),nextSibling=tabNode.nextSibling,width=tabNode.offsetWidth,tabMap=getTabMap.call(this,tabNode);var offset=context.src.pos.x-$DOM.position(tabNode).x;if(offset<0||offset>width){offset=Math.round(width/2);}tabInfo.pos={offset:offset,map:tabMap,width:width,left:listPosition.x,max:listPosition.x+listPosition.w-width};tabNode.style.left=(tabNode.offsetLeft-1)+"px";if(nextSibling){nextSibling.style.marginLeft=width+"px";tabInfo.pos.idx=tabInfo.idx+1;}mstrmojo.css.addClass(this.domNode,"dnd");tabInfo.active=true;},dragTab:function dragTab(tabInfo,context){var tabPosition=tabInfo.pos,tabX=Math.max(Math.min(context.tgt.pos.x-tabPosition.offset,tabPosition.max),tabPosition.left),width=tabPosition.width;var isForward=context.getDirection("x"),tabMap=tabPosition.map,oldMarginTab,newMarginTab;tabInfo.node.style.left=tabX-tabPosition.left+"px";tabMap.sort(function(a,b){return isForward?a-b:b-a;});$ARR.forEach(tabMap,function(tab){if(!newMarginTab&&(isForward?tabX+width<tab.m:tabX<tab.m)){newMarginTab=tab;}if(tab.i===tabPosition.idx){oldMarginTab=tab;}});if(newMarginTab!==oldMarginTab){var tabNodes=this.itemsContainerNode.childNodes,newIdx=newMarginTab&&newMarginTab.i,oldIdx=oldMarginTab&&oldMarginTab.i;tabPosition.idx=undefined;if(oldMarginTab){tabNodes[oldIdx].style.marginLeft=0;}if(newMarginTab){tabNodes[newIdx].style.marginLeft=width+"px";tabPosition.idx=newIdx;}if(oldMarginTab&&newMarginTab){if(oldIdx<newIdx){oldMarginTab.m-=width;}else{newMarginTab.m+=width;}}else{if(oldMarginTab){oldMarginTab.m-=width;}else{newMarginTab.m+=width;}}}},exitDragMode:function exitDragMode(tabInfo){mstrmojo.css.removeClass(this.domNode,"dnd");$ARR.forEach(this.itemsContainerNode.childNodes,function(node){node.style.marginLeft=0;});tabInfo.active=false;delete tabInfo.pos;},removeTab:function removeTab(id){var items=[].concat(this.items),tabIdx=$ARR.find(items,"id",id),selectedItem=this.getSelectedItems()[0];if(selectedItem===items[tabIdx]){selectedItem=items[tabIdx+1]||items[0];}items.splice(tabIdx,1);this.set("items",items);this.selectItems(selectedItem,true);},pivotTab:function pivotTab(tabInfo){var items=[].concat(this.items),item=tabInfo.item,currentIdx=tabInfo.idx,targetIdx=tabInfo.pos.idx;if(targetIdx===undefined){targetIdx=items.length;}if(currentIdx<targetIdx){targetIdx--;}items.splice(currentIdx,1);items.splice(targetIdx,0,item);this.set("items",items);this.selectItems(item,true);},addTab:function addTab(item,tabIdx,isSelected){var items=[].concat(this.items),selectedItem=this.getSelectedItems()[0];if(isSelected||!selectedItem){selectedItem=item;}if($ARR.indexOf(items,item)===-1){tabIdx=isNaN(tabIdx)?items.length:tabIdx;items.splice(tabIdx,0,item);this.set("items",items);}this.selectItems(selectedItem,true);return{idx:tabIdx,node:this._getItemNode(tabIdx)};}});mstrmojo.vi.ui.IconTabList.TabInfoType=null;}());