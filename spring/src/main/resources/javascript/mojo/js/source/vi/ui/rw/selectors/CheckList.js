(function(){mstrmojo.requiresCls("mstrmojo.ui.CheckList","mstrmojo.css");var CSS_ONLY="only";var baseItemMarkup;var onlyItemMarkup;mstrmojo.vi.ui.rw.selectors.CheckList=mstrmojo.declare(mstrmojo.ui.CheckList,null,{scriptClass:"mstrmojo.vi.ui.rw.selectors.CheckList",isShowOnly:true,init:function init(props){this._super(props);mstrmojo.css.addWidgetCssClass(this,"mstrmojo-vi-sel-CheckList");},getItemMarkup:function getItemMarkup(item,idx){if(!baseItemMarkup){baseItemMarkup=this._super(item).replace("<span>{@en@n}</span>",'<span class="icon"></span><span class="text">{@en@n}</span>');onlyItemMarkup=this._super(item).replace("<span>{@en@n}</span>",'<span class="icon"></span><span class="'+CSS_ONLY+'">'+mstrmojo.desc(11573,"only")+'</span><span class="text">{@en@n}</span>');}if(this.isShowOnly&&(!this.multiSelect||(idx!==this.allIdx&&idx!==this.noneIdx))){return onlyItemMarkup;}return baseItemMarkup;},getItemProps:function getItemProps(item,idx){var props=this._super(item,idx);if(((this.isHoriz&&(this.orientation!=="v"))||(!this.isHoriz&&this.orientation==="h"))&&this.itemWidthMode===0){var itemCnt=this.items.length,width=100/itemCnt;if(idx===itemCnt-1){width=100-((itemCnt-1)*width);}props.addStyle("width:"+width+"%");}return props;},onclick:function onclick(evt){var target=evt.getTarget(),item=this.getItemFromTarget(target);if(target.className===CSS_ONLY){if(item){this.docSelector.handleActionInSyncPhase(function(){this.clearSelect();},this);this.select([item._renderIdx]);}}else{if(item){this.doItemSelect(item,evt||{});}}}});}());