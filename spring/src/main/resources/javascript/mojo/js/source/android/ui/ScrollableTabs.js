(function(){mstrmojo.requiresCls("mstrmojo.ListBase","mstrmojo._TouchGestures","mstrmojo.android._IsList","mstrmojo.array","mstrmojo.css");var $ARR=mstrmojo.array,$CSS=mstrmojo.css,$MATH=Math,cssFixed="fixed";function positionTabs(selectedIdx,offset){var domNode=this.domNode,width=domNode.clientWidth,map=this._itemSizeMap,preIdx=selectedIdx-1,postIdx=selectedIdx+1;offset=offset||0;$ARR.forEach(this.itemsContainerNode.childNodes,function(node,idx){var left=0;if(idx===selectedIdx){left=(width/2)-(map[idx]/2);}else{if(idx===postIdx){left=width-map[idx];}else{if(idx!==preIdx){left=-(width/2);if(idx>postIdx){left=width+(-1*left);}}}}var leftPosition=$MATH.round(left+offset/2)+"px";if(node.style.left!==leftPosition){node.style.left=leftPosition;}node.style.left=(left+offset/2)+"px";});}mstrmojo.android.ui.ScrollableTabs=mstrmojo.declare(mstrmojo.ListBase,[mstrmojo._TouchGestures,mstrmojo.android._IsList],{scriptClass:"mstrmojo.android.ui.ScrollableTabs",multiSelect:false,init:function init(props){this._super(props);mstrmojo.css.addWidgetCssClass(this,"mstrmojo-ScrollableTabs");},setCurrentTab:function setCurrentTab(idx){this.clearSelect();this.singleSelect(idx,true);this.itemRenderer.select(this._getItemNode(idx),this.items[idx],idx,this);positionTabs.call(this,idx);},tabSelected:mstrmojo.emptyFn,postitemsChange:function postitemsChange(){var itemSizeMap=this._itemSizeMap=[],items=this.items,domNode=this.domNode;if(items&&items.length){$ARR.forEach(this.itemsContainerNode.childNodes,function(node,idx){itemSizeMap[idx]=node.offsetWidth;});}else{this.set("visible",false);}$CSS.addClass(domNode,cssFixed);positionTabs.call(this,$MATH.max(this.selectedIndex||0,0));window.setTimeout(function(){$CSS.removeClass(domNode,cssFixed);},0);},postselectionChange:function postselectionChange(evt){var added=evt.added;if(added){this.tabSelected(this.items[added[0]]);}},enterScroll:function enterScroll(){$CSS.addClass(this.domNode,cssFixed);},scroll:function scroll(delta){positionTabs.call(this,this.selectedIndex,delta);},exitScroll:function exitScroll(idx){$CSS.removeClass(this.domNode,cssFixed);this.setCurrentTab(idx);}});}());