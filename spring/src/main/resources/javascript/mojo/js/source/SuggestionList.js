(function(){mstrmojo.requiresCls("mstrmojo.ListBase","mstrmojo._IsList");var $DOM=mstrmojo.dom,$ARR=mstrmojo.array,$HASH=mstrmojo.hash;var markup;mstrmojo.SuggestionList=mstrmojo.declare(mstrmojo.ListBase,[mstrmojo._IsList],{scriptClass:"mstrmojo.SuggestionList",itemField:"n",getItemMarkup:function(item,idx){if(!markup){var itemField=this.itemField;markup=this._super(item).replace(">{@en@n}<",' title="{@en@'+itemField+'}">{@en@'+itemField+"}<");}return markup;},getItemProps:function getItemProps(item,idx){var props=this._super(item,idx),itemField=this.itemField;props[itemField]=item[itemField];return props;},onclick:function onclick(evt){if(this.disableClick){return false;}var me=this,parent=this.parent,opener=parent.opener,isMetaKey=$DOM.isMetaKey(evt.hWin,evt.e);if(isMetaKey&&!this.multiSelect){this.multiSelect=opener.parent.defn.multi;if(this.multiSelect){$DOM.attachOneTimeEvent(document.documentElement,"keyup",function(){var indices=me.selectedIndices;if(opener){opener.suggestionShown=false;if(indices&&!$HASH.isEmpty(indices)){var items=[];$HASH.forEach(me.selectedIndices,function(v,k){items.push(me.items[k]);});opener.handleSuggestionItemSelect(items);}parent.close();}me.multiSelect=false;});}}this._super(evt);if(!this.multiSelect){opener.suggestionShown=false;var item=this.selectedItem;if(item){opener.handleSuggestionItemSelect(item);}parent.close();}},bindings:{itemField:"this.parent.opener.itemField",items:"this.parent.opener.suggestionItems",disableClick:"this.parent.opener.disableClick"}});}());