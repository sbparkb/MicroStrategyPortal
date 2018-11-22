(function(){mstrmojo.requiresCls("mstrmojo.Container","mstrmojo._Formattable","mstrmojo.MetricSlider","mstrmojo.MetricQualification","mstrmojo.SearchBoxSelector","mstrmojo.TextBoxSelector","mstrmojo.css","mstrmojo.dom","mstrmojo.hash","mstrmojo.array","mstrmojo.hash","mstrmojo.func","mstrmojo.mstr.EnumDataType","mstrmojo._IsSelectorTarget","mstrmojo.elementHelper","mstrmojo.MetricSelectorUtility","mstrmojo.mstr.EnumDSSXMLBaseFormType");mstrmojo.requiresDescs(4729,4730,4732,4733,4734,4735,5225,5443,6738,8967,12297);var $ARR=mstrmojo.array,$HASH=mstrmojo.hash,$DOM=mstrmojo.dom,$EXPR=mstrmojo.expr,$BFTP=$EXPR.BFTP,STYLE_PULLDOWN=0,STYLE_SLIDER=1,STYLE_LIST=2,STYLE_RADIO=3,STYLE_CHECKBOX=4,STYLE_BUTTON=5,STYLE_LINK=6,STYLE_METRIC_SLIDER=7,STYLE_METRIC_QUALIFICATION=8,STYLE_SEARCH_BOX=9,STYLE_TEXT_BOX=10,STYLE_ATTR_QUALIFICATION=11,$DT=mstrmojo.mstr.EnumDataType,$ELEMENT_HELPER=mstrmojo.elementHelper,ELEM_ALL_ID=$ELEMENT_HELPER.ELEM_ALL_ID,$WRAP=mstrmojo.func.wrapMethods,FORM_TYPE_HTML_TAG=mstrmojo.mstr.EnumDSSXMLBaseFormType.DssXmlBaseFormHTMLTag,TP_FILTER=1,TP_METRIC=4,TP_ATTRIBUTE=12,TP_CONSOLIDATION=47,STP_RECURSIVE_ATTRIBUTE=3076,STP_DERIVED_ATTRIBUTE=3077,STP_CUSTOM_GROUP=257;mstrmojo.DocSelectorEvtType=null;var widgetMap={};widgetMap[STYLE_METRIC_SLIDER]="MetricSlider";widgetMap[STYLE_METRIC_QUALIFICATION]="MetricQualification";widgetMap[STYLE_SEARCH_BOX]="SearchBoxSelector";widgetMap[STYLE_TEXT_BOX]="TextBoxSelector";var ST_UC_ON_DS=2;var getEvent=function getEvent(){var defaultEvent={type:parseInt(this.type,10),src:this.k,ck:this.ck,ctlKey:this.ckey,tks:this.tks,include:this.include,isUConDS:!!this.defn.dsTks};if(this.style===STYLE_METRIC_QUALIFICATION||this.style===STYLE_METRIC_SLIDER){mstrmojo.hash.copy(defaultEvent,{srcid:this.srcid,srct:this.type,f:this.f,ft:this.ft,qt:this.qt,unset:!!this.unset,cs:this.cs});}return defaultEvent;},_fetchAllElems=function _fetchAllElems(){var defn=this.node.defn,data=this.node.data;var taskParams={taskId:"browseElements",styleName:"MojoAttributeStyle",attributeID:defn.srcid||"",dataSourcesXML:defn.dsrc||"",browseFlags:1};var me=this,callbacks={success:function(res){me.bGetElems=true;me.set("wait",false);if(res&&res.es){data.elms=(defn.srcid)?$ELEMENT_HELPER.buildElemsTerseID(res.es,defn.srcid,true):res.es;var parent=me.parent,grandParent=parent&&parent.parent;if(defn.sec&&data.ces&&data.elms&&data.elms.length>0&&parent){parent.set("count",$ELEMENT_HELPER.buildElemsCountStr(data.ces,data.elms));}if(me.hasRendered){me.refresh();if(me.isInFilterPanel()){if(parent&&parent.defn.ttl){parent.updateContentHeight();}if(grandParent&&grandParent.refreshFP){grandParent.refreshFP();}}}}},failure:function(res){mstrmojo.alert(res.getResponseHeader("X-MSTR-TaskFailureMsg"));}};this.set("wait",true);mstrmojo.xhr.request("POST",mstrConfig.taskURL,callbacks,taskParams,false,null,true);},_isDocSelectorAdaptor={getWidgetClass:function getWidgetClass(selectorContainer,selectorStyle,isHoriz){var scriptClass=widgetMap[selectorStyle];if(scriptClass&&scriptClass.constructor===Array){scriptClass=scriptClass[isHoriz?0:1];}return scriptClass;},getWidgetConfig:function getWidgetConfig(selectorContainer,selectorStyle,defn,elements){var isHoriz=selectorStyle===2?false:defn.horiz,fmts=selectorContainer.getFormats(),height=fmts&&fmts.height,cfg={scriptClass:this.getWidgetClass(selectorContainer,selectorStyle,isHoriz),docSelector:selectorContainer,enabled:this.enabled,multiSelect:defn.multi,isHoriz:isHoriz,include:defn.include,itemWidthMode:defn.iwm,allIdx:$ARR.find(elements,"v",mstrmojo.elementHelper.ELEM_ALL_ID),noneIdx:defn.include?-1:$ARR.find(elements,"v",mstrmojo.elementHelper.ELEM_ALL_ID),renderAllItems:!height,onchange:function onchange(){if(!selectorContainer._inSyncPhase){selectorContainer.selectorControlChange(this);}}};if(cfg.noneIdx!==-1){cfg.allIdx=-1;}if(fmts&&selectorStyle===mstrmojo.DocSelector.STYLES.PULLDOWN){if(fmts.color){cfg.itemCssText="color: "+fmts.color+";";}if(fmts.font){cfg.itemCssText=(cfg.itemCssText||" ")+"font:"+fmts.font;}if(mstrApp.isExpress){cfg.cssTextClass="express";}}return cfg;},newSelectorWidget:function newSelectorWidget(selectorContainer){var selectorStyle=selectorContainer.style,node=selectorContainer.node,defn=node.defn,data=node.data,elements=data.elms||[],selectorCtrl,cfg=this.getWidgetConfig(selectorContainer,selectorStyle,defn,elements),scriptClass=cfg.scriptClass;if(!scriptClass){selectorCtrl=new mstrmojo.Label({cssClass:"unsupported",text:"This selector is not supported."});}else{delete cfg.scriptClass;var Clazz=$HASH.walk(scriptClass,mstrmojo);selectorCtrl=new Clazz(cfg);}return selectorCtrl;},getCekEvtListener:function getCekEvtListener(selectorContainer,selectorCtrl){return function(evt){var indices=[],elements=this.node.data.elms;$ARR.forEach(evt.value,function(v){var idx=$ARR.find(elements,"v",v);if(idx>-1){indices.push(idx);}});this.handleActionInSyncPhase(function(){if(selectorCtrl&&selectorCtrl.select){selectorCtrl.select(indices);}});};},newAndInitWidget:function newAndInitWidget(selectorContainer){var selectorWidget,cekEvtListener=selectorContainer._cekEvtListener,node=selectorContainer.node,defn=node.defn,cekContextId=selectorContainer.id,fnCEK;if(cekEvtListener){defn.detachEventListener(cekEvtListener);delete selectorContainer._cekEvtListener;}selectorWidget=this.newSelectorWidget(selectorContainer);if(selectorWidget){fnCEK=this.getCekEvtListener(selectorContainer,selectorWidget);}cekContextId=fnCEK.cekContextId||cekContextId;fnCEK=fnCEK.cekEvtListener||fnCEK;if(fnCEK){selectorContainer._cekEvtListener=defn.attachEventListener("cekChange",cekContextId,fnCEK);}selectorContainer.addChildren(selectorWidget);return selectorWidget;},updateWidget:function updateWidget(selectorContainer){var children=selectorContainer.children,selectorWidget=children&&children[0];if(!selectorWidget){selectorWidget=this.newAndInitWidget(selectorContainer);}else{selectorWidget.set("enabled",this.enabled);}return selectorWidget;}};function checkStyle(styles){return styles.some(function(style){return this.style===style;},this);}function getMetricUnit(){var selector=this;return selector.model.getDatasetUnits(["mx"],function(unit){return unit.did===selector.defn.srcid;})[0]||{};}mstrmojo.DocSelector=mstrmojo.declare(mstrmojo.Container,[mstrmojo._Formattable,mstrmojo._IsSelectorTarget,_isDocSelectorAdaptor],{scriptClass:"mstrmojo.DocSelector",markupString:'<div id="{@id}" k="{@k}" class="mstrmojo-DocSelector {@cssClass} {@extCls}" nm="{@n}" title="{@tooltip}" style="{@domNodeCssText}"><div class="filter" style="{@filterNodeCssText}"></div><div class="wait" style="display:none;z-index:100;position:absolute;top:0;left:0;width:100%;height:100%"></div><div class="content" style="{@contentNodeCssText}"></div></div>',markupSlots:{filterNode:function(){return this.domNode.firstChild;},contentNode:function(){return this.domNode.lastChild;},dimNode:function(){return this.domNode.lastChild;},containerNode:function(){return this.domNode.lastChild;},scrollboxNode:function(){return this.domNode.lastChild;},wIconNode:function(){return this.domNode.childNodes[1];}},markupMethods:{onvisibleChange:mstrmojo.Widget.visibleMarkupMethod,onheightChange:mstrmojo.Widget.heightMarkupMethod,onwidthChange:mstrmojo.Widget.widthMarkupMethod,onenableChange:mstrmojo.Widget.enabledMarkupMethod,onincludeChange:function(){mstrmojo.css.toggleClass(this.domNode,"strikeout",!this.include);},onwaitChange:function(){mstrmojo.css.toggleClass(this.domNode,"wait",!!this.wait);this.wIconNode.style.display=((this.wait)?"block":"none");}},_ieformatHandlers:{domNode:["F","text-align","vertical-align","line-height","z-index","top","left"],contentNode:["width","B","P"],filterNode:["height","width","B","P","fx","background-color"],item:["color","font","text-decoration","text-align","line-height"]},formatHandlers:{domNode:["F","text-align","vertical-align","line-height","z-index","top","left"],contentNode:["height","width","B","P","fx","background-color"],item:["color","font","text-decoration","text-align","line-height"]},ckey:null,ck:null,tks:null,style:0,selIdx:null,extCls:"",min:-1,max:-1,bGetElems:false,n:"",_inSyncPhase:false,init:function init(props){this._super(props);if(mstrmojo.dom.isIE){this.formatHandlers=this._ieformatHandlers;}this.n=props.node.defn.n;},_fetchOnInit4UCOnDS:function _fetchOnInt(elements){if(!this.bGetElems&&parseInt(this.node.defn.subTp,10)===ST_UC_ON_DS){_fetchAllElems.apply(this);elements=this.node.data.elms;}return elements;},initControlInfo:function initControlInfo(){var node=this.node,data=node.data,defn=node.defn,elements=data.elms,currentSelections=data.ces;var defnProps=["include","ckey","ck","tks","style","multi","showall"];elements=this._fetchOnInit4UCOnDS(elements,data);this.type=defn.ct;var fmts=defn.fmts;if(fmts){var w=fmts.width;if(!w||parseInt(w,10)<=0){fmts.width="95px";}}$HASH.copyProps(defnProps,defn,this);var selectedIndices=this.selIdx={},multi=defn.multi;if((this.include||defn.style===STYLE_SLIDER)&&multi&&$ARR.find(currentSelections,"v",mstrmojo.elementHelper.ELEM_ALL_ID)>-1){currentSelections=elements;}if(currentSelections){var selElements={};$ARR.forEach(currentSelections,function(ele){selElements[ele.v]=true;});$ARR.forEach(elements,function(el,idx){if(selElements[el.v]){selectedIndices[idx]=true;}});}if(defn.min>=0){this.min=defn.min;}if(defn.max>=0){this.max=defn.max;}},resetFormatHandlers:function resetFormatHandlers(){this.formatHandlers={contentNode:["RW"]};},_getSelectionCount:function getSelectionCount(widget){return $HASH.keyarray(widget.selectedIndices).length;},canApply:function canApply(widget){var defn=this.defn,multi=defn.multi,min=this.min,max=multi?this.max:1,ct=this._getSelectionCount(widget||this.content);return(min>=0&&max>=0&&min>max)||((min<0||min<=ct)&&(max<0||max>=ct));},_buildEvent:mstrmojo.emptyFn,selectorControlChange:function selectorControlChange(widget){var rEvt=getEvent.call(this),filterPanel=this.isInFilterPanel()&&this.getFilterPanel(),controlAutoSubmit=(filterPanel&&filterPanel.defn.cas);this._buildEvent(rEvt,widget);if(!this.canApply(widget)){var sbp=this.getPanelContainer();if(this.isInSearchBoxPanel(sbp)){sbp.set("canApplySbp",false);}if(controlAutoSubmit){this.set("err",true);mstrmojo.alert(mstrmojo.desc(12297,"One or more selectors are incorrectly set. Please review the selector(s) and try again."));}if(filterPanel){filterPanel.set("applyEnabled",false);}return ;}if(controlAutoSubmit){this.set("err",false);}if(mstrApp.isExpress&&this.node.defn.style===STYLE_PULLDOWN){this.handleExpressPulldown();}if(rEvt.requireToggle){this.deferredEvt=rEvt;this.set("include",false);this.deferredEvt=undefined;}else{this.slice(rEvt);}},showInfoWin:function showInfoWin(anchor){var defn=this.node&&this.node.defn,ifwtg=defn&&defn.ifw,m=this.model,ifws=[].concat(m.getTargetInfoWin(ifwtg)).concat(m.getTargetInfoWin(this.tks));if(ifws&&ifws.length){var horiz=this.defn.horiz,actualAnchor=anchor||this.contentNode,aPos=$DOM.position(actualAnchor),sPos=$DOM.position(this.contentNode),position=(horiz||parseInt(this.defn.style,10)===STYLE_SLIDER)?null:{x:sPos.x,y:aPos.y,w:sPos.w,h:aPos.h},i;for(i=0;i<ifws.length;i++){m.showInfoWin(ifws[i],actualAnchor,horiz?"v":"h",false,$HASH.copy(position));}}},unrender:function unrender(ignoreDom){delete this.formatHandlers;this._super(ignoreDom);},postBuildRendering:function postBuildRendering(){var style=this.node.defn.style,filterNodeStyle=this.filterNode.style,contentNode=this.contentNode,defn=this.node.defn;if(this.isInFilterPanel()&&!this.isHorizFP()){this.domNode.style.width=this.contentNode.style.width="100%";if(this.formatHandlers.filterNode){this.filterNode.style.width=this.contentNode.style.width="100%";}this.set("visible",parseInt(defn.ds,10)===0);}this.handleActionInSyncPhase(this._super,this);if(mstrApp.isExpress&&style===STYLE_PULLDOWN){this.handleExpressPulldown();}if(this.isInFilterPanel()&&this.parent.adjustFP){this.parent.adjustFP();}if(this.formatHandlers.filterNode){var f=this.getFormats();if(!f.width){filterNodeStyle.width=contentNode.clientWidth+"px";}if(!f.height){filterNodeStyle.height=contentNode.clientHeight+"px";}}else{filterNodeStyle.display="none";}this.model.attachEventListener("CGBMapChange",this.id,"onCGBMapChange");if($DOM.isAndroid&&style===STYLE_SLIDER){contentNode.style.overflow="visible";}return true;},updateHeight:function updateHeight(){this.contentNode.style.height=this.filterNode.style.height=this.content.getClientHeight()+"px";var parent=this.parent;if(parent&&(parent.defn.ttl!==undefined)&&parent.updateContentHeight){parent.updateContentHeight();}},handleExpressPulldown:function handleExpressPulldown(){var zoomFactor=this.model.getZoomFactor();if(zoomFactor!==1){var pulldownText=this.contentNode.firstChild.firstChild;var textHeight=parseInt(window.getComputedStyle(pulldownText).height);var newHeight=textHeight*zoomFactor+"px";pulldownText.style.height=newHeight;pulldownText.style.lineHeight=newHeight;}var node=document.createElement("DIV");node.setAttribute("class","mstrmojo-ui-Pulldown-arrow");node.setAttribute("src","#");this.contentNode.firstChild.appendChild(node);},handleActionInSyncPhase:function syncAction(actionFn,context){var oldSyncState=this._inSyncPhase;this._inSyncPhase=true;try{if(context){actionFn.call(context);}else{actionFn();}}catch(e){throw ("There was an error handling the selector action in sync phase.");}this._inSyncPhase=oldSyncState;},onCGBMapChange:function onCGBMapChange(evt){var cgbMap=evt.cgbMap;if(!cgbMap){return ;}var tks=this.tks;$HASH.forEach(this.defn.cgb,function(key){var targetKey=cgbMap[key];if(targetKey&&tks.indexOf(targetKey)<0){tks+="\u001E"+targetKey;}});this.tks=tks;},update:function update(node){this._super(node);this.node=node;var defn=this.node.defn,style=defn.style,elements=this.node.data.elms,parent=this.parent,isScroller=(style===STYLE_SLIDER),isSearchBox=(style===STYLE_SEARCH_BOX),tempHTMLNode,tagNode;if(defn.srct===TP_ATTRIBUTE&&defn.srcid&&this.model.getBrowseFormTypes&&this.model.getBrowseFormTypes(defn.srcid).indexOf(FORM_TYPE_HTML_TAG)>-1){tempHTMLNode=window.document.createElement("span");$ARR.forEach(elements,function(element){tempHTMLNode.innerHTML=element.n;tagNode=tempHTMLNode.firstChild;element.n=tagNode&&(tagNode.text||tagNode.alt)||element.n||"";});tagNode=null;tempHTMLNode=null;}if(isScroller&&defn.multi){var allIdx=$ARR.find(elements,"v",mstrmojo.elementHelper.ELEM_ALL_ID);if(allIdx>-1){this.node.data.del={idx:allIdx,elem:elements[allIdx]};$ARR.removeIndices(elements,allIdx,1);}}if(defn.sec){var ces=[].concat(node.data.ces||[]);if(parent&&(parent.count!==null&&parent.count!==undefined)){if(isScroller){parent.set("count","");}else{if((ces&&elements&&elements.length)||defn.sos){if(!defn.include){var cesAll=$ARR.find(ces,"v",mstrmojo.elementHelper.ELEM_ALL_ID);if(cesAll>=0){$ARR.removeIndices(ces,cesAll,1);}}var he={};$ARR.forEach(elements,function(e){he[e.v]=true;});ces=$ARR.filter(ces,function(e){return he[e.v];});var countCES=ces,countElements;if(!isSearchBox){if(!defn.multi){countCES=elements;}countElements=elements;}parent.set("count",$ELEMENT_HELPER.buildElemsCountStr(countCES,countElements));}}}}if(this.content){this.content.allIdx=$ARR.find(this.node.data.elms,"v",ELEM_ALL_ID);}this.initControlInfo();var widget=this.content=this.updateWidget(this);if(!widget){this.set("visible",false);}this.clearCache();},refresh:function refresh(){var parent=this.parent,defn=this.node&&this.node.defn;if(parent&&parent.generateToolbar){parent.set((this.isInFilterPanel()?"baseTitle":"title"),defn.ttl);parent.generateToolbar();}this._super();},onincludeChange:function onincludeChange(evt){var defn=this.node.defn,include=evt.value,fps=this.parent.parent.parent,update=fps.model.getDataService().newUpdate(fps);defn.include=this.include=include;if(fps._bufferedSlices){fps.applyBufferedSlices(true,update);}if(this.style!==STYLE_METRIC_SLIDER&&this.style!==STYLE_ATTR_QUALIFICATION){var rEvt=getEvent.call(this);rEvt.ckey=this.ckey;rEvt.changeInclude=true;if(defn.srct===TP_ATTRIBUTE){var me=this,m=this.model,k=this.node.k,ds=m.getDataService(),sliceCallback=m.getSliceCallback(rEvt),actions=[ds.getSelectorShowAllAction({ck:defn.ck,ckey:defn.ckey,type:defn.type,showAll:include}),ds.getSelectorIncludeAction({ck:defn.ck,ckey:defn.ckey,type:defn.type,include:include})],callback=$WRAP(sliceCallback,{success:function(res){me.set("wait",false);m.partialUpdate(res.data,m.getTargetDefn(k));if(!me.isInFilterPanel()){me.parent.selectVIUnit(me,true);}}});this.showall=this.defn.showall=evt.value;var deferredEvt=this.deferredEvt;if(!!deferredEvt){m.sliceDeferred(update,deferredEvt);}actions=!!deferredEvt?actions.concat(update.actions):(update.actions||[]).concat(actions);this.set("wait",true);m.controller.cmdMgr.execute({execute:function(){this.submit(actions,callback);},urInfo:{extraPuKeys:defn.ck.split("\u001E").slice(1),treesToRender:3}});}else{this.slice(rEvt);}}},getSelectorStyleList:function getSelectorStyleList(){var styles=[],srcType=this.defn.srct,sreSubType=this.defn.srcst;if(srcType===TP_FILTER||srcType===TP_ATTRIBUTE||srcType===TP_CONSOLIDATION){var isNotInFilterPanel=!this.isInFilterPanel();if(sreSubType===STP_RECURSIVE_ATTRIBUTE){return[];}styles=[{n:mstrmojo.desc(4733,"Check Boxes"),v:STYLE_CHECKBOX},{n:mstrmojo.desc(4730,"Slider"),v:STYLE_SLIDER}];if(srcType===TP_ATTRIBUTE){styles.push({n:mstrmojo.desc(8967,"Search Box"),v:STYLE_SEARCH_BOX});}if(isNotInFilterPanel){styles=styles.concat([{n:mstrmojo.desc(4735,"Link Bar"),v:STYLE_LINK},{n:mstrmojo.desc(4734,"Button Bar"),v:STYLE_BUTTON}]);}styles=styles.concat([{n:mstrmojo.desc(4732,"Radio Buttons"),v:STYLE_RADIO},{n:mstrmojo.desc(4729,"Drop-down"),v:STYLE_PULLDOWN}]);if(isNotInFilterPanel){styles=styles.concat([{n:mstrmojo.desc(6738,"List Box"),v:STYLE_LIST}]);}var attrUnit=mstrmojo.vi.ui.DatasetUnitMenuUtils.getUnitFromDataset(this.model.datasets,this.defn.srcid,12),idf=attrUnit&&$ARR.filterOne(attrUnit.fs,function(f){return f.idf;});if(idf&&(idf.bftp===$BFTP.DATE||idf.bftp===$BFTP.DATETIME)&&(attrUnit&&!attrUnit.de)){styles.push({n:mstrmojo.desc(5443,"Calendar"),v:STYLE_ATTR_QUALIFICATION});}}else{if(srcType===TP_METRIC){styles=[{n:mstrmojo.desc(4730,"Slider"),v:STYLE_METRIC_SLIDER},{n:mstrmojo.desc(5225,"Qualification"),v:STYLE_METRIC_QUALIFICATION}];}}return styles;},supportsInclude:function isIncludeSupported(){var defn=this.defn;return((defn.srct===TP_ATTRIBUTE&&!this.hasDE)||(defn.srct===TP_METRIC&&defn.style===STYLE_METRIC_SLIDER))&&!this.isSolrSelector();},isSolrSelector:function isMetricSelector(){return this.model.isFromSolrCube(this.defn.srcid);},isMetricSelector:function isMetricSelector(){return this.defn.srct===TP_METRIC;},isRankMetricSelector:function isRankMetricSelector(){var func=getMetricUnit.call(this).f;return func&&typeof func==="string"&&func.search(/rank/i)===0;},isNumericMetricSelector:function isNumericMetricSelector(){var dt=getMetricUnit.call(this).dt;return !dt||dt===$DT.DataTypeDouble||dt===$DT.DataTypeInteger||dt===$DT.DataTypeCellFormatData;},isAttributeSelector:function isAttributeSelector(){return this.defn.srct===TP_ATTRIBUTE;},isDerivedAttributeSelector:function isDerivedAttributeSelector(){return this.defn.srct===TP_ATTRIBUTE&&this.defn.srcst===STP_DERIVED_ATTRIBUTE;},isAttrQualSelector:function isAttrQualSelector(){return this.defn.srct===TP_ATTRIBUTE&&this.defn.style===STYLE_ATTR_QUALIFICATION;},isRecursiveAttributeSelector:function isRecursiveAttributeSelector(){return this.defn&&this.defn.srct===12&&this.defn.srcst===3076;},allowsOrientationChange:function allowsOrientationChange(){return !this.isAttrQualSelector()&&!checkStyle.call(this,[STYLE_SEARCH_BOX,STYLE_LIST,STYLE_PULLDOWN,STYLE_SLIDER,STYLE_METRIC_SLIDER,STYLE_METRIC_QUALIFICATION]);},isSearchBox:function isSearchBox(){return checkStyle.call(this,[STYLE_SEARCH_BOX]);},isAttrElemListSelector:function isAttrElemListSelector(){return this.defn.srct===TP_ATTRIBUTE&&this.defn.style!==STYLE_ATTR_QUALIFICATION;},slice:function slice(rEvt){var m=this.model;if(m.closeSelWarnFlag){m.closeSelWarnFlag(this.k);}if(this.isInFilterPanel()){var fp=this.getFilterPanel();if(fp&&!fp.defn.cas){fp.bufferSlice(rEvt);return ;}}var sbp=this.getPanelContainer();if(this.isInSearchBoxPanel(sbp)){sbp.parent.bufferSlice(rEvt);sbp.set("canApplySbp",sbp.canApplySearchBoxPanel());return ;}m.slice(rEvt);},isInFilterPanel:function isInFilterPanel(){var parent=this.parent;return(parent&&parent.isInFilterPanel&&parent.isInFilterPanel())||false;},isHorizFP:function isHorizFP(){var parent=this.parent;return(parent&&parent.isHorizFP&&parent.isHorizFP())||false;},getFilterPanel:function getFilterPanel(){var parent=this.parent;return(parent&&parent.getFilterPanel&&parent.getFilterPanel())||null;},isInSearchBoxPanel:function(panel){var p=panel||this.getPanelContainer();return p&&(p.isSbp||(p._isSearchBoxPanel&&p._isSearchBoxPanel()));},getPanelContainer:function(){var en=mstrmojo.EnumRWUnitType,p;for(p=this.parent;p&&p.defn;p=p.parent){if(parseInt(p.defn.t,10)===en.PANEL){return p;}}return null;},clearSelector:function clearSelector(applyNow){var evt=getEvent.call(this),elementIDs=[ELEM_ALL_ID],elements=this.node.data.elms||[],elementSeparator="\u001E",style=this.style,include=this.defn.include,selectAll=this.isSelectAll&&this.isSelectAll();if(style===STYLE_SEARCH_BOX){evt.eid=elementIDs.join(elementSeparator);this.defn.set("cek",[]);}else{if(style===STYLE_METRIC_SLIDER||style===STYLE_METRIC_QUALIFICATION){evt.cs="";evt.ckey=this.ckey;evt.unset=true;this.node.defn.set("cek",{cs:null,qua:this.qua,include:include,f:null,ft:null});}else{if(style===STYLE_ATTR_QUALIFICATION){evt.unset=true;evt.ckey=this.ckey;var cs=[{v:""},{v:""}];this.node.defn.set("cek",{cs:cs});}else{evt.eid=elementIDs.join(elementSeparator);if((include||style===STYLE_SLIDER)&&this.multi){$ARR.forEach(elements,function(elem){var v=elem.v;if(elementIDs[0]!==v){elementIDs.push(v);}});}this.node.defn.set("cek",(include||style===STYLE_SLIDER)?elementIDs:[]);}}}if(this.defn.sec&&style!==STYLE_SLIDER){this.parent.set("count",style===STYLE_SEARCH_BOX?"":$ELEMENT_HELPER.buildElemsCountStr(elementIDs,elements));}evt[applyNow?"forceApply":"forceBuffer"]=true;if(selectAll){evt.ignoreTargetData=true;}this.slice(evt);},allowsTogglingMultiSelect:function allowsTogglingMultiSelect(){return checkStyle.call(this,[STYLE_PULLDOWN,STYLE_BUTTON,STYLE_LINK,STYLE_SEARCH_BOX,STYLE_SLIDER,STYLE_LIST]);},allowsSameSizeItems:function allowsSameSizeItems(){return checkStyle.call(this,[STYLE_CHECKBOX,STYLE_RADIO,STYLE_BUTTON,STYLE_LINK]);},supportsSetTarget:function supportsSetTarget(){var definition=this.defn;return this.isAttrElemListSelector()||(definition.srct===TP_CONSOLIDATION||definition.srcst===STP_CUSTOM_GROUP);},supportSelectionColor:function supportSelectionColor(){return checkStyle.call(this,[STYLE_LIST,STYLE_LINK]);}});mstrmojo.DocSelector.UC_ON_DS=ST_UC_ON_DS;mstrmojo.DocSelector.STYLES={PULLDOWN:STYLE_PULLDOWN,SCROLLER:STYLE_SLIDER,LIST:STYLE_LIST,RADIO:STYLE_RADIO,CHECKBOX:STYLE_CHECKBOX,BUTTON:STYLE_BUTTON,LINK:STYLE_LINK,METRIC_SLIDER:STYLE_METRIC_SLIDER,METRIC_QUAL:STYLE_METRIC_QUALIFICATION,SEARCH_BOX:STYLE_SEARCH_BOX,TEXT_BOX:STYLE_TEXT_BOX,ATTR_QUAL:STYLE_ATTR_QUALIFICATION};}());