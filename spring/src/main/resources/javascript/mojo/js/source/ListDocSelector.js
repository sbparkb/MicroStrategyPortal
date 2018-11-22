(function(){mstrmojo.requiresCls("mstrmojo.hash","mstrmojo.array","mstrmojo.elementHelper","mstrmojo.DocSelector","mstrmojo.ui.MultiSelectPulldown");var $HASH=mstrmojo.hash,$ELEM_HELPER=mstrmojo.elementHelper,$ARR=mstrmojo.array,STYLES=mstrmojo.DocSelector.STYLES;var NO_SEL_AS_EMPTY=0,NO_SEL_AS_UNSET=1,NO_SEL_AS_ALL=2,STYLE_CHECKBOX=4,MAX_INLIST_COUNT=1000;function isSelectContinuous(indices){var min=null,max=null,cnt=0,k,v;for(k in indices){v=Number(k);cnt++;min=(min===null||min>v)?v:min;max=(max===null||max<v)?v:max;}return cnt===0||max-min===cnt-1;}mstrmojo.ListDocSelector=mstrmojo.declare(mstrmojo.DocSelector,null,{scriptClass:"mstrmojo.ListDocSelector",formatHandlers:{domNode:["F","text-align","vertical-align","line-height","z-index","top","left"],contentNode:["height","width","B","P","fx","background-color"],item:["color","font","text-decoration","text-align","line-height"]},_ieformatHandlers:{domNode:["F","text-align","vertical-align","line-height","z-index","top","left"],contentNode:["width","B","P","height"],filterNode:["height","width","B","P","fx","background-color"],item:["color","font","text-decoration","text-align","line-height"]},_buildEvent:function _buildEvent(rEvt,widget){var node=this.node,defn=this.defn,elements=node.data.elms,elementIDs=[],multiSelect=widget.multiSelect,indices=widget.selectedIndices,allIdx=widget.allIdx,isAll=!!indices[allIdx],i,allValue,elementIdDisplayText=[],inc=this.include;if(!multiSelect){var selectedItem=elements[widget.selectedIndex],selectedValue=selectedItem.v;elementIDs=[selectedValue];elementIdDisplayText=[selectedValue+";"+selectedItem.n];}else{if(isAll){allValue=elements[allIdx].v;elementIDs=[allValue];elementIdDisplayText=[allValue];}else{if(indices[allIdx]){indices[allIdx]=false;}var keyArr=$HASH.keyarray(indices,true).sort($ARR.numSorter),sortedIndices={};for(i in keyArr){sortedIndices[keyArr[i]]=indices[keyArr[i]];}indices=sortedIndices;$HASH.forEach(indices,function(item,idx){if(item){elementIDs.push(elements[idx].v);elementIdDisplayText.push(elements[idx].v+";"+elements[idx].n);}});}}this.defn.set("cek",elementIDs);if(elementIDs.length>0||!defn.nsb||defn.nsb===NO_SEL_AS_EMPTY){if(inc&&parseInt(this.style,10)===STYLE_CHECKBOX&&elements&&elements.length>MAX_INLIST_COUNT&&elementIDs.length>elements.length/2&&!this.isRecursiveAttributeSelector()){rEvt.include=false;rEvt.forceBuffer=true;rEvt.requireToggle=true;var excludeIDs=[],excludeDisplayText=[];$ARR.forEach(elements,function(item,idx){if(idx!==allIdx&&!indices[idx]){excludeIDs.push(item.v);excludeDisplayText.push(item.v+";"+item.n);}});rEvt.eid=((parseInt(rEvt.type,10)===1)?excludeDisplayText:excludeIDs).join($ELEM_HELPER.ELEM_SEPARATOR);}else{rEvt.eid=((parseInt(rEvt.type,10)===1)?elementIdDisplayText:elementIDs).join($ELEM_HELPER.ELEM_SEPARATOR);}}else{if(defn.nsb===NO_SEL_AS_UNSET||!defn.showall){rEvt.unset=true;}else{if(defn.nsb===NO_SEL_AS_ALL){rEvt.eid=$ELEM_HELPER.ELEM_ALL_ID;}}}var pos=mstrmojo.dom.position(widget.domNode,true);if(pos){rEvt.left=pos.x;rEvt.top=pos.y;}if(isAll&&this.multi&&inc){$ARR.forEach(elements,function(elem){var v=elem.v;if(elementIDs[0]!==v){elementIDs.push(v);}});}if(defn.sec){allValue=allValue||$ELEM_HELPER.ELEM_ALL_ID;var tc=$ARR.filter(elements,function(el){return el.v!==allValue;}).length,sc=$ARR.indexOf(elementIDs,allValue)>=0||!defn.multi?tc:elementIDs.length;if(defn.style!==mstrmojo.DocSelector.STYLES.SCROLLER){this.parent.set("count",$ELEM_HELPER.buildElemsCountStrByNum(sc,tc));}}},getCekEvtListener:function getCekEvtListener(selectorContainer,selectorCtrl){var style=selectorContainer.defn.style;if(style===STYLES.PULLDOWN||style===STYLES.SCROLLER){return function(evt){var elements=selectorCtrl.items,indices={};if(!selectorCtrl.multiSelect){var index=selectorCtrl.selectedIndex=$ARR.find(elements,"v",evt.value[0]);if(index>-1){indices[index]=true;}}else{var allIdx=selectorCtrl.allIdx;if(allIdx>-1&&$ARR.indexOf(evt.value,elements[allIdx].v)>-1){for(var i=0;i<elements.length;i++){indices[i]=true;}}else{$ARR.forEach(evt.value,function(v){var idx=$ARR.find(elements,"v",v);if(idx>-1){indices[idx]=true;}});}}selectorContainer.selIdx=selectorCtrl.selectedIndices=indices;selectorContainer.handleActionInSyncPhase(function(){selectorCtrl.refresh();});};}return this._super(selectorContainer,selectorCtrl);},preBuildRendering:function preBuildRendering(){var style=this.node.defn.style,formatHandlers=$HASH.clone(this.formatHandlers),contentNodeHandler=formatHandlers.contentNode;if(contentNodeHandler){if((style===STYLES.RADIO||style===STYLES.CHECKBOX)&&formatHandlers.filterNode){contentNodeHandler.push("fx");contentNodeHandler.push("background-color");delete formatHandlers.filterNode;}if(style===STYLES.LIST){delete contentNodeHandler.height;}}this.formatHandlers=formatHandlers;return this._super();},getWidgetClass:function getWidgetClass(selectorContainer,selectorStyle,isHoriz){if(selectorStyle===STYLES.PULLDOWN){return selectorContainer.multi?"ui.MultiSelectPulldown":"ui.Pulldown";}return this._super(selectorContainer,selectorStyle,isHoriz);},getWidgetConfig:function getWidgetConfig(selectorContainer,selectorStyle,defn,elements){var fmts=selectorContainer.getFormats(),cfg=this._super(selectorContainer,selectorStyle,defn,elements);if(selectorStyle===STYLES.SCROLLER){selectorContainer.extCls="extSlider";if(mstrApp&&mstrApp.isVI){cfg.isHoriz=true;}$HASH.copyProps(["height","width"],fmts,cfg);}if(selectorStyle===STYLES.PULLDOWN&&!defn.multi){cfg.isHostedWithin=false;cfg.onitemSelected=cfg.onchange;cfg.allowHTML=false;}return cfg;},updateWidget:function updateWidget(selectorContainer){var selectorWidget=this._super(selectorContainer),selIdx=selectorContainer.selIdx;var items=selectorWidget.items=selectorContainer.node.data.elms;selectorWidget.selectedIndices=selIdx;if(!selectorWidget.multiSelect&&items&&items.length){var indices=$HASH.keyarray(selIdx);if(indices.length===1){selectorWidget.selectedIndex=Number(indices[0]);}else{selectorWidget.selectedIndices={};selectorWidget.selectedIndex=-1;}}return selectorWidget;},isSelectAll:function isSelectAll(){var elements=this.node.data.elms,widget=this.children&&this.children[0],indices=widget.selectedIndices,allIdx=widget.allIdx,isAll=!!indices[allIdx],allValue=(elements[allIdx]&&elements[allIdx].v)||$ELEM_HELPER.ELEM_ALL_ID;if(this.include){return isAll||$ARR.filter(elements,function(el){return el.v!==allValue;}).length===$HASH.keyarray(indices).length;}else{return $HASH.isEmpty(indices);}},destroy:function destroy(){var data=this.node.data;this._super();if(data.del){$ARR.insert(data.elms,data.del.idx,data.del.elem);delete data.del;}},isValidSelection:function isValidSel(){var node=this.node,data=node.data,defn=node.defn,ces=data.ces,model=this.model;if(!defn.multi&&ces&&ces.length>1&&!this.allowsTogglingMultiSelect()){return false;}if(defn.style===mstrmojo.DocSelector.STYLES.SCROLLER&&!isSelectContinuous(this.selIdx)){return false;}if(model.isSelWarnFlagOn(this.k)&&ces&&ces.length===0&&data.elms.length>0){return this.children[0].noneIdx&&this.children[0].noneIdx>-1;}return true;}});}());