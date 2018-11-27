(function(){mstrmojo.requiresClsP("mstrmojo","Box","HBox","VBox","css","dom","string","array","hash");mstrmojo.requiresCls("mstrmojo.ui.ScrollableList","mstrmojo._HasOwnAvatar","mstrmojo.vi.ui._IsDropTarget","mstrmojo.mstr.ElementsDataHelper","mstrmojo.ui._IsIncFetchList","mstrmojo.Label","mstrmojo.SearchWidget");mstrmojo.requiresDescs(513,514,1763,12200);var $ARR=mstrmojo.array,$CSS=mstrmojo.css,$DESC=mstrmojo.desc,$STR=mstrmojo.string,$H=mstrmojo.hash,DROP_AREA="dragIn",DELEMITER="\u001E",KEY_DELAY=200;function clearInputTextTimer(){var timerHandle=this._timerHandle;if(timerHandle){window.clearTimeout(timerHandle);delete this._timerHandle;}}mstrmojo.vi.ui.editors.DerivedElementPanel=mstrmojo.declare(mstrmojo.Box,null,{scriptClass:"mstrmojo.vi.ui.editors.DerivedElementPanel",cssClass:"mstrmojo-DerivedElementPanel",isNew:true,excludeList:null,children:[{scriptClass:"mstrmojo.VBox",children:[{scriptClass:"mstrmojo.HBox",cssClass:"title-area",children:[{scriptClass:"mstrmojo.Label",text:$DESC(513,"Available"),cssClass:"available-label"},{scriptClass:"mstrmojo.Box",cssClass:"search-box",children:[{scriptClass:"mstrmojo.SearchWidget",alias:"search",quickSearch:true,onsearch:function onsearch(pattern){var w=this.parent.parent.parent.parent,me=this;if(this._timerHandle){clearInputTextTimer.call(this);}this._timerHandle=window.setTimeout(function(){w.availableElems().startBrowsing(w.parent.browseConfig,pattern);delete me._timerHandle;},KEY_DELAY);},onclear:function onclear(){var w=this.parent.parent.parent.parent;clearInputTextTimer.call(this);w.availableElems().startBrowsing(w.parent.browseConfig);}}]},{scriptClass:"mstrmojo.Label",cssClass:"selected-label",text:$DESC(514,"Selected")},{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-WebHoverButton clear-btn",text:$DESC(1763,"Clear All"),onclick:function(){var w=this.parent.parent.parent,selectedItems=w.selectedElems().items;if(selectedItems.length>0){w.updateExcludeList(selectedItems,false);w.selectedElems().set("items",[]);w.availableElems().refresh();w.enableSaveBtn();}}}]},{scriptClass:"mstrmojo.HBox",cssClass:"cart-table",children:[{scriptClass:"mstrmojo.vi.ui.editors.AvailableElements",alias:"availableElems"},{scriptClass:"mstrmojo.vi.ui.editors.SelectedElements",alias:"selectedElems",items:[]}]},{scriptClass:"mstrmojo.Widget",markupString:"<div class='separator'></div>"},{scriptClass:"mstrmojo.HBox",cssClass:"apply",children:[{scriptClass:"mstrmojo.Widget",markupString:'<div class="apply-text">'+$DESC(12200,"Drag and drop elements to create group. Click # button to apply.").replace("#",'"&#10003;"')+"</div>"},{scriptClass:"mstrmojo.Button",slot:"buttonNode",cssClass:"mstrmojo-Button okBtn",enabled:false,onclick:function(){var w=this.parent.parent.parent;if(w.parent.commitEdit(w.selectedElems().items,w.isNew)){this.set("enabled",false);w.set("visible",false);w.parent.toggleEdit(false);}}},{scriptClass:"mstrmojo.Button",slot:"buttonNode",cssClass:"mstrmojo-Button cancelBtn",onclick:function(){var w=this.parent.parent.parent;w.set("visible",false);w.parent.initExcludeList();w.parent.toggleEdit(false);}}]}]}],_set_visible:function _set_visible(n,v){this[n]=v;if(v===true){if(this.hasRendered){this.searchField().reset();}this.availableElems().startBrowsing(this.parent.browseConfig);this.enableCancelBtn();}},updateExcludeList:function updateExcludeList(items,isAdd){var me=this;if(isAdd){$ARR.forEach(items,function(item){me.excludeList[item.v]=true;});}else{$ARR.forEach(items,function(item){delete me.excludeList[item.v];});}},enableSaveBtn:function(){this.children[0].children[3].children[1].set("enabled",this.selectedElems().items.length>0);},enableCancelBtn:function(){this.children[0].children[3].children[2].set("enabled",true);},availableElems:function availableElems(){return this.children[0].children[1].availableElems;},selectedElems:function selectedElems(){return this.children[0].children[1].selectedElems;},searchField:function searchField(){return this.children[0].children[0].children[1].search;}});function isOnItem(context){return context.src.node&&context.src.node.className.indexOf("item")>=0;}function isEventOnItem(evt){var target=evt.getTarget();return target&&(target.className.indexOf("item")>=0||(target.parentNode&&target.parentNode.className.indexOf("item")>=0));}mstrmojo.vi.ui.editors.SelectedElements=mstrmojo.declare(mstrmojo.ui.ScrollableList,[mstrmojo.vi.ui._HasUnitListAvatar,mstrmojo.vi.ui._IsDropTarget],{scriptClass:"mstrmojo.vi.ui.editors.SelectedElements",cssClass:"mstrmojo-SelectedElements",restrictedToAxis:"",avatarCssClass:"element-DE-drag-avatar",multiSelect:true,useListModKeys:true,cachedItems:null,getSelectedItems:function getSelectedItems(){var me=this,items=this.items,item=null,r=[];$H.forEach(this.selectedIndices,function(v,k){item=$H.copy(items[k]);if(v&&item){item.itemNode=me._getItemNode(k);if(item.itemNode.style.display!=="none"){r.push(item);}}});return r;},init:function init(props){this._super(props);this.dePanel=this.parent.parent.parent;},getItemDisplayName:function getItemDisplayName(item){return item.n||mstrmojo.desc(14561,"(null)");},getItemProps:function getItemProps(item,idx){var props=this._super(item,idx);props.cls="mstrmojo-VIGroupDEElement";return props;},selectDragNode:function selectDragNode(context){this._super(context);var data=context.src.data;data.items=mstrmojo.all[data.srcId].getSelectedItems();},processDragStart:function processDragStart(context){if(isOnItem(context)){var dragItemsIndices=context.src.data.items.map(function(item){return item._renderIdx;}).reverse(),me=this;this.cachedItems=this.items.slice(0)||[];$ARR.forEach(dragItemsIndices,function(index){me.items.splice(index,1);});this.clearSelect();this.refresh();}},isDragValid:function isDragValid(context){return isOnItem(context)||this._super(context)||false;},ondragstart:function ondragstart(context){this.selectDragNode(context);this._super(context);this.processDragStart(context);},ondragenter:function ondragenter(context){if(isOnItem(context)){$CSS.addClass(this.domNode,DROP_AREA);}if(this._super){this._super(context);}},ondragleave:function ondragleave(context){if(isOnItem(context)){$CSS.removeClass(this.domNode,DROP_AREA);}if(this._super){this._super(context);}},ondragend:function ondragend(context){var data=context.src.data;this._super(context);if(!data.isDropSuccess&&data.srcId===this.id){if(this.cachedItems){this.items=this.cachedItems;}this.refresh();}},ondrop:function ondrop(context){$CSS.removeClass(this.domNode,DROP_AREA);var data=context.src.data,dragItems=data.items,me=this,w=this.parent.parent.parent;if(data.srcId===this.id){this.items=this.cachedItems;}else{var dePanel=this.dePanel,avail=dePanel.availableElems();if(avail._scroll){avail._scroll();}$ARR.forEach(dragItems,function(item){me.items.push({n:item.n,v:item.v});});dePanel.updateExcludeList(dragItems,true);}this.refresh();w.enableSaveBtn();data.isDropSuccess=true;},allowDrop:function allowDrop(context){var data=context.src.data;return data&&data.items&&data.items.length>0;},positionAvatar:function positionAvatar(pos,context){if(!this.avatar){return ;}var avatar=this.avatar;pos.y=pos.y-avatar.offsetHeight-13;this._super(pos,context);},ondblclick:function ondblclick(evt){var available=this.dePanel.availableElems();if(isEventOnItem(evt)){this.items.splice(this.selectedIndex,1);this.dePanel.updateExcludeList([this.selectedItem],false);this.refresh();available.refresh();this.dePanel.enableSaveBtn();}}});mstrmojo.vi.ui.editors.AvailableElements=mstrmojo.declare(mstrmojo.vi.ui.editors.SelectedElements,[mstrmojo.ui._IsIncFetchList],{scriptClass:"mstrmojo.vi.ui.editors.AvailableElements",cssClass:"mstrmojo-AvailableElements",init:function init(props){this._super(props);this.ifDataHelper=new mstrmojo.mstr.ElementsDataHelper({browseConfig:{styleName:"MojoAttributeStyle",blockCount:mstrApp.elementsBlockCount||30,useBrowseForm:1}});},getItemProps:function getItemProps(item,idx){var props=this._super(item,idx),pattern=this.ifDataHelper&&this.ifDataHelper.browseConfig&&this.ifDataHelper.browseConfig.searchPattern,filterRegExp;props.style="display:"+(this.dePanel.excludeList[item.v]?"none":"block");props.html=props.n;if(pattern){filterRegExp=new RegExp($STR.regEscape(pattern),"ig");if(filterRegExp.test(props.html)){props.html=props.html.replace(filterRegExp,function(match){return DELEMITER+match+DELEMITER;});}}props.html=$STR.encodeHtmlString(props.html);if(pattern){while(props.html.indexOf(DELEMITER)!==-1){props.html=props.html.replace(DELEMITER,"<em>").replace(DELEMITER,"</em>");}}return props;},getItemMarkup:function getItemMarkup(item,idx){return this._super(item,idx).replace("@en@n","@html");},selectedElems:function selectedElems(){return this.parent.selectedElems.items;},processDragStart:function processDragStart(context){var dragItems=context.src.data.items;$ARR.forEach(dragItems,function(item){if(!isNaN(item._renderIdx)){item.itemNode.style.display="none";}});this.clearSelect();},ondrop:function ondrop(context){$CSS.removeClass(this.domNode,DROP_AREA);var data=context.src.data,dragItems=data.items,w=this.dePanel;if(data.srcId!==this.id){w.updateExcludeList(dragItems,false);}this.refresh();w.enableSaveBtn();data.isDropSuccess=true;},startBrowsing:function startBrowsing(browseConfig,pattern){if(this.ifDataHelper&&this.ifDataHelper.browseConfig){$H.copy(browseConfig,this.ifDataHelper.browseConfig);if(pattern){this.ifDataHelper.browseConfig.searchPattern=pattern;}else{delete this.ifDataHelper.browseConfig.searchPattern;}this.ifDataHelper.set("blockBegin",1);this.ifDataHelper.set("items",null);}var me=this,setItems=function(res){me.inWaitPos=0;me.set("items",res.items);me.initScroll();if(!res.items||res.items.length===0){me.itemsContainerNode.innerHTML="<div class='mstrmojo-VIGroupDENoResults'>"+res.message+"</div>";}},callback={success:function(res){if(!res.message){res.message=mstrmojo.desc(13779,"No elements match your search");}setItems(res);if(res.items&&me._scroll){me._scroll();}},failure:function(res){setItems(res);}};this.ifDataHelper.getItems(1,callback);},preNext:function prevNext(){if(!this.inWaitPos&&this.items&&this.items.length){this.itemsContainerNode.innerHTML+="<div class='item mstrmojo-VIGroupDEElement'>Wait...</div>";this.inWaitPos=this.items.length;}},onisFetchingChange:function onisFetchingChange(evt){if(!evt.value&&this.supportsIncFetch&&this._scroll){this._scroll();}},postNext:function postNext(){if(this.inWaitPos>0){this.itemsContainerNode.removeChild(this.itemsContainerNode.childNodes[this.inWaitPos]);this.inWaitPos=0;this.updateScrollbars();}},ondblclick:function ondblclick(evt){var selected=this.dePanel.selectedElems(),selItem=this.selectedItem;if(isEventOnItem(evt)&&selItem&&selItem.v){selected.items.push({n:selItem.n,v:selItem.v});this.dePanel.updateExcludeList([selItem],true);selected.refresh();this.itemsContainerNode.childNodes[selItem._renderIdx].style.display="none";if(this._scroll){this._scroll();}this.dePanel.enableSaveBtn();}}});}());