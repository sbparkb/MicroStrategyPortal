(function(){mstrmojo.requiresCls("mstrmojo.css");mstrmojo.android.selectors._SupportsHoriz=mstrmojo.provide("mstrmojo.android.selectors._SupportsHoriz",{_mixinName:"mstrmojo.android.selectors._SupportsHoriz",scrollerConfig:{bounces:false,showScrollbars:false},minItemHeight:25,getItemProps:function getItemProps(item,idx){var props=this._super(item,idx),h=this.height,itemCnt=this.items.length,lineHeight;props.tag="label";props.n=props.n||"&nbsp";if(this.isHoriz){if(h){lineHeight=h;}if(this.itemWidthMode===0){props.style+="width:"+Math.floor(100/itemCnt)+"%;";}}else{if(h){lineHeight=Math.round(parseInt(h,10)/itemCnt);lineHeight=Math.max(lineHeight,this.minItemHeight);lineHeight+="px";}}if(lineHeight){props.style+="line-height:"+lineHeight+";";}return props;},init:function init(props){this._super(props);if(this.isHoriz){this.cssDisplay="table";var cls=["horiz"];if(this.itemWidthMode===0){cls.push("fixedWidth");}mstrmojo.css.addWidgetCssClass(this,cls);}},updateScrollerConfig:function updateScrollerConfig(){var cfg=this._super(),scrollEl=this.itemsContainerNode,dimension="Height",axis="y",scroll="v",offset={};if(this.isHoriz){dimension="Width";axis="x";scroll="h";}cfg.scrollEl=scrollEl;var size=this[dimension.toLowerCase()];if(size){size=parseInt(size,10);var offsetEnd=Math.max(scrollEl["offset"+dimension]-size,0),enableDimensionScroll=cfg[scroll+"Scroll"]=(offsetEnd!==0);if(enableDimensionScroll){offset[axis]={start:0,end:offsetEnd};}}cfg.offset=offset;cfg.origin=cfg.origin||{x:0,y:0};return cfg;}});}());