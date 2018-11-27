(function(){mstrmojo.requiresCls("mstrmojo.array","mstrmojo.hash");var $ARR=mstrmojo.array,$HASH=mstrmojo.hash;function verifyArray(items){if(items!==null){return(items.constructor!==Array)?[items]:items;}return null;}function addSelections(me,idxs,positions){if(!idxs){return null;}var added=[],sel=me.selectedIndices,allIdx=me.allIdx,noneIdx=me.noneIdx;if(me.multiSelect&&(noneIdx>-1)&&($ARR.indexOf(idxs,noneIdx)>-1)){return added;}var i,len,items=me.items,idf=me.itemIdField,selectedItems=me.selectedItems,item;if(me.multiSelect&&(allIdx>-1)&&($ARR.indexOf(idxs,me.allIdx)>-1)){for(i=0,len=items.length;i<len;i++){if(!sel[i]){added.push(i);sel[i]=true;me.selectedIndex=i;me.selectedItem=items[i];}}}else{for(i=0,len=idxs.length;i<len;i++){var idx=idxs[i];if(!sel[idx]){sel[idx]=true;if(positions){added.push({idx:idx,positions:positions});}else{added.push(idx);}me.selectedIndex=idx;item=me.selectedItem=items[idx];if(selectedItems){selectedItems[item[idf]]=item;}}}}return added;}function removeAll(me,position){var rmv=[],sel=me.selectedIndices,selectedItems=me.selectedItems,i;for(i in sel){delete sel[i];if(position){rmv.push({idx:parseInt(i,10),positions:position});}else{rmv.push(parseInt(i,10));}}me.selectedIndex=-1;me.selectedItem=null;if(selectedItems){me.selectedItems={};}return rmv;}function remove(me,idxs,positions){if(!idxs){return null;}var removed=[],sel=me.selectedIndices,arrIdx=$ARR.indexOf,allIdx=me.allIdx,noneIdx=me.noneIdx,idf=me.itemIdField,selectedItems=me.selectedItems;if(me.multiSelect&&(((allIdx>-1)&&(arrIdx(idxs,allIdx)>-1))||((noneIdx>-1)&&(arrIdx(idxs,noneIdx)>-1)))){return removeAll(me);}if(idxs.length>0&&sel[allIdx]){if(arrIdx(idxs,allIdx)<0){idxs.push(allIdx);}}var len=idxs.length,i;for(i=0;i<len;i++){var idx=idxs[i];if(sel[idx]){delete sel[idx];if(positions){removed.push({idx:idx,positions:positions});}else{removed.push(idx);}if(selectedItems){delete selectedItems[me.items[idx][idf]];}if(me.selectedIndex===idx){me.selectedIndex=-1;me.selectedItem=null;}}}return removed;}function raiseListEvent(added,removed,idxs,bSuppressEvt){if(bSuppressEvt){return ;}if(this.raiseEvent){if((added&&added.length)||(removed&&removed.length)){try{this.raiseEvent({name:"selectionChange",added:added,removed:removed});}catch(ex){remove(this,added);addSelections(this,removed);throw ex;}}}}function indexOf(item){var idf=this.itemIdField,items=this.items;if(typeof item==="object"&&idf){return $ARR.find(items,idf,item[idf]);}return $ARR.indexOf(items,item);}mstrmojo._ListSelections={multiSelect:false,allIdx:-1,noneIdx:-1,itemIdField:"",items:null,selectedIndices:null,selectedIndex:-1,selectedIndices_bindEvents:"selectionChange",selectedIndex_bindEvents:"selectionChange",selectedItem:null,selectedItem_bindEvts:"selectionChange",allowUnlistedValues:true,selectedItems:null,supportsIncFetch:false,init:function(props){this._super(props);if(this.supportsIncFetch&&this.itemIdField){this.selectedItems={};}if(!this.items){this.items=[];}if(!this.selectedIndices){this.selectedIndices={};if(this.selectedIndex>-1){this._set_selectedIndex("selectedIndex",this.selectedIndex,true);}else{if(this.selectedItem){this._set_selectedItem("selectedItem",this.selectedItem,true);}}}},addItems:function addItems(newItems){newItems=verifyArray(newItems);if(!newItems){return ;}var items=this.items,start=this.items.length,selectedItems=this.selectedItems,newSelected=[],end;items=this.items=items.concat(newItems);end=items.length;if(selectedItems){var idf=this.itemIdField,i,item;for(i=start;i<items.length;i++){item=items[i];if(selectedItems[item[idf]]){newSelected.push(i);}}}if(newSelected&&newSelected.length){addSelections(this,newSelected);}if(end>start){var itemsContainerNode=this.itemsContainerNode;if(itemsContainerNode){itemsContainerNode.innerHTML+=this._buildItemsMarkup(start,end-1).join("");}}},addSelectedItems:function addSelectedItems(newSelections){this.selectItems(newSelections,false);},setSelectedItems:function setSelectedItems(newSelections){this.selectItems(newSelections,true);},selectItems:function selectItems(newSelections,clearPrevSelections){newSelections=verifyArray(newSelections);if(!newSelections){return ;}if(clearPrevSelections&&this.selectedItems){this.selectedItems={};}var selectedItems=this.selectedItems,idf=this.itemIdField,addedItems=[],addedIdx=this.items.length,newSelectedIndices=[],allowUnlistedValues=this.allowUnlistedValues,item,idx,i;for(i=0;i<newSelections.length;i++){item=newSelections[i];idx=indexOf.call(this,item);if(idx<0){if(selectedItems===null){if(allowUnlistedValues){addedItems.push(item);idx=addedIdx++;newSelectedIndices.push(idx);}}else{selectedItems[item[idf]]=item;}}else{newSelectedIndices.push(idx);}}if(addedItems.length>0){this.addItems(addedItems);}if(newSelectedIndices.length>0){if(clearPrevSelections){this.select(newSelectedIndices);}else{this.addSelect(newSelectedIndices);}}},unselectItems:function unselectItems(items){items=verifyArray(items);if(!items){return ;}var selectedItems=this.selectedItems,unselectedIndices=[],idf=this.itemIdField,item,idx,i;if(selectedItems===null){return ;}for(i=0;i<items.length;i++){item=items[i];if(selectedItems){delete selectedItems[item[idf]];}idx=indexOf.call(this,item);if(idx<0){unselectedIndices.push(idx);}}if(unselectedIndices.length>0){this.removeSelect(unselectedIndices);}},getSelectedItems:function getSelectedItems(){if(this.selectedItems){return $HASH.valarray(this.selectedItems);}return $ARR.get(this.items,$HASH.keyarray(this.selectedIndices,true));},singleSelect:function(idx,suppressEvt,position){if(idx!==-1){this.select([idx],suppressEvt,position);}},singleSelectByField:function singleSelectByField(value,fieldName,suppressEvt){this.singleSelect($ARR.find(this.items,fieldName,value),suppressEvt);},toggleSelect:function toggleSelect(idx){var add,rmv;if(this.selectedIndices[idx]){rmv=remove(this,[idx]);}else{add=addSelections(this,[idx]);}raiseListEvent.call(this,add,rmv,[idx]);},select:function(idxs,bSuppressEvt,position){idxs=verifyArray(idxs);if(!idxs){return ;}var rmv=removeAll(this,position),add=addSelections(this,idxs,position),i;if(this.selectionPolicy!=="reselect"){for(i=rmv.length-1;i>=0;i--){var ind=$ARR.indexOf(add,rmv[i]);if(ind>-1){rmv.splice(i,1);add.splice(ind,1);}}}raiseListEvent.call(this,add,rmv,idxs,bSuppressEvt);},rangeSelect:function rangeSelect(idx,bSuppressEvt){var currentIdx=this.selectedIndex,startIdx=currentIdx,allIdx=this.allIdx,idxs=[],i;if(idx===allIdx||this.selectedIndices[allIdx]){idxs.push(allIdx);}else{if(startIdx===-1&&this.selectedIndices){for(i in this.selectedIndices){startIdx=parseInt(i,10);break;}}startIdx=startIdx===-1?0:startIdx;if(startIdx>idx){startIdx=idx;idx=currentIdx;}for(i=startIdx;i<=idx;i++){idxs.push(i);}}this.select(idxs,bSuppressEvt);this.selectedIndex=currentIdx;},clearSelect:function(bSuppressEvt){raiseListEvent.call(this,null,removeAll(this),[],bSuppressEvt);if(!bSuppressEvt){this.raiseEvent({name:"clearSelection"});}},addSelect:function(idxs,bSuppressEvt,positions){idxs=verifyArray(idxs);if(!idxs){return ;}var ret=addSelections(this,idxs,positions),rmv=null,noneIdx=this.noneIdx;if(this.multiSelect&&(noneIdx>-1&&$ARR.indexOf(idxs,noneIdx)>-1)){rmv=remove(this,idxs);}raiseListEvent.call(this,ret,rmv,idxs,bSuppressEvt);},removeSelect:function(idxs,bSuppressEvt,positions){idxs=verifyArray(idxs);if(!idxs){return ;}raiseListEvent.call(this,null,remove(this,idxs,positions),idxs,bSuppressEvt);},_set_selectedIndices:function _set_selectedIndices(n,v,bSuppressEvt){if(this.selectedItems){this.selectedItems={};}var sel=this.selectedIndices;if(sel===v){return false;}if(!sel){sel={};this.selectedIndices=sel;}if(!v){v={};}var sidx=this.selectedIndex,rmv=[],idx;for(idx in sel){if(!v[idx]){idx=parseInt(idx,10);delete sel[idx];rmv.push(idx);if(sidx===idx){this.selectedIndex=-1;this.selectedItem=null;}}}var add=[],itms=this.items,idf=this.itemIdField,item;for(idx in v){if(!sel[idx]){idx=parseInt(idx,10);sel[idx]=true;add.push(idx);this.selectedIndex=idx;item=this.selectedItem=itms[idx];if(this.selectedItems){this.selectedItems[item[idf]]=item;}}}if(bSuppressEvt!==true){var idxs=[];for(idx in v){if(sel[idx]){idx=parseInt(idx,10);idxs.push(idx);}}raiseListEvent.call(this,add,rmv,idxs);}return(add.length||rmv.length);},_set_selectedIndex:function _set_selectedIndex(n,v,bSuppressEvt){var idxs={};if(v>-1){idxs[v]=true;}return this._set_selectedIndices("selectedIndices",idxs,bSuppressEvt);},_set_selectedItem:function _set_selectedItem(n,v,bSuppressEvt){var idx=indexOf.call(this,v);if((idx<0)&&(v!==null&&v!==undefined)&&this.allowUnlistedValues&&this.items){this.set("items",this.items.concat(v));idx=this.items.length-1;}return this._set_selectedIndex("selectedIndex",idx,bSuppressEvt);},_addSelections:function(idxs){return addSelections(this,idxs);},_removeAll:function(){return removeAll(this);}};}());