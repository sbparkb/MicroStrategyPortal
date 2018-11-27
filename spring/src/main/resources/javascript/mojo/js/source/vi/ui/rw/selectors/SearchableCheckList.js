(function(){mstrmojo.requiresCls("mstrmojo.vi.ui.rw.selectors.CheckList","mstrmojo.ui.SearchBox","mstrmojo.string","mstrmojo.css","mstrmojo.dom");var $STR=mstrmojo.string,$CSS=mstrmojo.css,$DOM=mstrmojo.dom,DELEMITER="\u001E";function getItemTextForFilter(item,filterExpression){var unfilteredText=item.n;if(!filterExpression){return unfilteredText;}var filterRegExp=new RegExp($STR.regEscape(filterExpression),"ig");if(filterRegExp.test(unfilteredText)){return unfilteredText.replace(filterRegExp,function(match){return DELEMITER+$STR.encodeHtmlString(match,true)+DELEMITER;});}return undefined;}function filterItems(filterPattern){var loopIndex=0,searchIndex=1;this.items.forEach(function(item,idx){var itemNode=this.getItemNode(idx);var filteredName=getItemTextForFilter(item,filterPattern),isFiltered=!filteredName||(filterPattern&&idx===this.allIdx);if(!isFiltered){var clonedItem=JSON.parse(JSON.stringify(item)),elementHost=document.createElement("div");clonedItem.n=filteredName;elementHost.innerHTML=this.itemRenderer.render(clonedItem,idx,this);var newItemElement=elementHost.firstChild;if(itemNode){itemNode=$DOM.replace(itemNode,newItemElement);searchIndex=idx+1;}else{var tempItemNode=this.getItemNode(searchIndex);itemNode=$DOM.replace(tempItemNode,newItemElement);item._renderIdx=loopIndex;item._positionIdx=searchIndex;searchIndex++;}}$CSS.toggleClass(itemNode,"excluded",isFiltered);loopIndex++;},this);}function getSearchWidth(){return this.orientation==="v"?this.width:"135px";}function getWidthUpdateFn(){return function(evt){if(this._super){this._super(evt);}var searchInput=this.searchInput;if(searchInput){searchInput.set("width",getSearchWidth.call(this));}};}mstrmojo.vi.ui.rw.selectors.SearchableCheckList=mstrmojo.declare(mstrmojo.vi.ui.rw.selectors.CheckList,null,{scriptClass:"mstrmojo.vi.ui.rw.selectors.SearchableCheckList",init:function init(props){this._super(props);$CSS.addWidgetCssClass(this,"searchable");},searchInput:null,_set_items:function _set_items(propName,propValue){this._super(propName,propValue);var searchInput=this.searchInput;if(searchInput){searchInput.set("visible",propValue>15);}},buildRendering:function buildRendering(){if(this.isHoriz&&this.itemWidthMode===0){this.renderOnScroll=false;}this._super();var searchInputNode=document.createElement("div"),placeholder=searchInputNode.appendChild(document.createElement("div")),scrollboxNode=this.scrollboxNode,items=this.items,id=this.id;searchInputNode.className="search";this.domNode.insertBefore(searchInputNode,scrollboxNode);var searchInput=this.searchInput;if(!searchInput){searchInput=this.searchInput=new mstrmojo.ui.SearchBox({width:getSearchWidth.call(this),searchTriggered:function(pattern){var me=mstrmojo.all[id];filterItems.call(me,pattern);me.updateScrollbars();}});this.addDisposable(searchInput);}searchInput.visible=items&&items.length>15;searchInput.placeholder=placeholder;searchInput.render();},onorientationChange:getWidthUpdateFn(),onwidthChange:getWidthUpdateFn(),updateScrollbars:function updateScrollbars(){var scrollboxNode=this.scrollboxNode;if(this.hasRendered&&this.orientation==="v"){scrollboxNode.style.height=this.getScrollboxHeight()+"px";}this._super();},getScrollboxHeight:function getScrollboxHeight(){var searchInput=this.searchInput,searchDimension=$DOM.position(searchInput.domNode);if(searchInput.visible){return parseInt(this.height,10)-searchDimension.h;}return parseInt(this.height,10);},unrender:function unrender(ignoreDom){var searchInput=this.searchInput;if(searchInput){searchInput.unrender(ignoreDom);}return this._super(ignoreDom);},getItemProps:function getItemProp(item,idx){var prop=this._super(item,idx);prop.html=$STR.encodeHtmlString(prop.n);while(prop.html.indexOf(DELEMITER)!==-1){prop.html=prop.html.replace(DELEMITER,"<em>").replace(DELEMITER,"</em>");}return prop;},getItemMarkup:function getItemMarkUp(item,idx){return this._super(item,idx).replace("@en@n","@html");},getItemNode:function getItemNode(idx){return this._getItemNode(idx);},onScrollEnd:function onScrollEnd(){var props={v:{dimension:"h",scroll:"scrollTop",scrollDimension:"scrollHeight"},h:{dimension:"w",scroll:"scrollLeft",scrollDimension:"scrollWidth"}},prop=props[this.isHoriz?"h":"v"];if(this.renderOnScroll){var node=this.scrollNode,max=(this.renderIndex+1)*this.renderBlockSize;if(max>=this.items.length){return ;}if(($DOM.position(node)[prop.dimension]+node[prop.scroll])>=node[prop.scrollDimension]){this.renderIndex++;var itemsMarkup=this._buildItemsMarkup(this.renderIndex*this.renderBlockSize,((this.renderIndex+1)*this.renderBlockSize)-1,this._markupPrefix&&this._markupPrefix(),this._markupSuffix&&this._markupSuffix(),this._itemPrefix&&this._itemPrefix(),this._itemSuffix&&this._itemSuffix()).join("");this.itemsContainerNode.innerHTML+=itemsMarkup;}}},renderOnScroll:true,renderIndex:0,renderBlockSize:150});}());