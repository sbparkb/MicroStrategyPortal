(function(){mstrmojo.requiresCls("mstrmojo.WidgetList");mstrmojo.requiresDescs(7091);var DESC=mstrmojo.desc;mstrmojo.ME.RepeatPulldownList=mstrmojo.declare(mstrmojo.WidgetList,null,{scriptClass:"mstrmojo.ME.RepeatPulldownList",cssClass:"mstrmojo-RepeatPulldownList",makeObservable:true,cValid:true,showDelete:true,pulldownItems:null,pulldowItemsFilter:function pulldowItemsFilter(item){return true;},onpulldownItemsChange:function onpulldownItemschange(evt){var items=evt.value,atts=[];mstrmojo.array.forEach(items,function getAtts(item,idx){if(this.pulldowItemsFilter(item)){atts.push(item);}},this);this.pulldownItems=atts;},popupCssClass:"",item2textCss:mstrmojo.emptyFn,validate:function validate(v){return mstrmojo.string.isEmpty(v)||mstrmojo.num.isNumeric(v);},getNewItem:function getNewItem(){return{n:"",did:-1};},itemFunction:function itemFunction(item,idx,w){return new mstrmojo.Box({cssClass:"mstrmjo-RepeatPulldownList-item",children:[{scriptClass:"mstrmojo.SearchableDropDownList",alias:"pulldown",cssClass:"combo mstrmojo-ME-Pulldown",popupCssClass:"mstrmojo-ME-Pulldown-Popup",placeholderText:DESC(12179,"Search for an #").replace("#",DESC(518,"Attribute").toLowerCase()),itemIdField:"did",searchEnabled:true,autofocus:false,selectedIndex:-1,defaultSelection:-1,clickInput2pop:true,popupCssClass:w.popupCssClass,item2textCss:w.item2textCss,valid:true,useRichTooltip:true,items:w.pulldownItems,onvalidChange:function onkeyup(evt){this.hideTooltip();w.set("cValid",this.valid);if(!this.valid){var node=this.domNode,position=mstrmojo.dom.position(node);this.richTooltip={contentNodeCssClass:"me-tooltip-content left me-err",content:'<div class="content"><span>'+DESC(11569,"Input contains invalid character")+"</span></div>",top:position.y-5,left:position.x+position.w+10};this.showTooltip();}else{this.richTooltip="";}mstrmojo.css.toggleClass(this.domNode,"err",!this.valid);},onkeyup:function onkeyup(evt){if(this.selectedIndex<0){this.selectedItem=null;}var v=this.getSearchPattern(),isValid=w.validate(v,this)||(this.selectedIndex>-1);this.set("valid",isValid);this.createNextInputParamWidget();},prevalueChange:function prevalueChange(){this.set("valid",true);var v=this.value,idx=-1;if(v!==null){idx=mstrmojo.array.find(this.items,this.itemIdField,v);}if(idx>-1){this.selectedItem=this.items[idx];this.selectedIndex=idx;this.createNextInputParamWidget();}},postCreate:function postCreate(){var oi=item;if(oi){if(oi.did){this.value=oi.did;}else{if(oi.v!==undefined){this.defaultText=oi.v;this.value=oi.v;}}}},createNextInputParamWidget:function createNextInputParamWidget(){if(w.itemIndex(item)!==w.items.length-1){return ;}w.items.add([w.getNewItem()]);this.parent.del.set("visible",true);},getTokens:function getTokens(){var $BKTS=mstrmojo.ME.MetricToken.brackets,itm=this.selectedItem,tks=[],t;if(itm){if(itm.did===this.value){t={v:$BKTS(itm.n)};if(itm.t===21){t.oi={did:itm.attid,n:itm.attn,t:12};t.exv=itm.fmdid;t.extp=8;t.v=$BKTS(itm.attn)+"@"+$BKTS(itm.fnm);}else{t.oi=itm;}tks.push(t);}}else{var v=this.getSearchPattern();if(v.length>0){t={v:v};tks.push(t);}}return tks;}},{scriptClass:"mstrmojo.Label",alias:"del",title:mstrmojo.desc(629,"Delete"),cssClass:"mstrmojo-RepeatPulldownList-del",cssDisplay:"inline-block",visible:(idx<w.items.length-1),onclick:function(){w.items.remove(idx,1);}}]});}});}());