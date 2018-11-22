(function(){mstrmojo.requiresCls("mstrmojo.Obj","mstrmojo.css","mstrmojo.registry","mstrmojo.AjaxCall","mstrmojo.hash","mstrmojo.array","mstrmojo.Arr","mstrmojo.expr","mstrmojo.dom","mstrmojo.mstr.EnumDataType","mstrmojo.Label","mstrmojo.ListBase","mstrmojo._IsList","mstrmojo.WidgetDial","mstrmojo.Calendar","mstrmojo.DateTextBox","mstrmojo.mstr.EnumNodeDimty","mstrmojo.ValidationTextBox","mstrmojo.ui.CheckList","mstrmojo.ui._HasScroller","mstrmojo.ui.ColumnContainer","mstrmojo.elementHelper");var $CSS=mstrmojo.css,$REG=mstrmojo.registry,$HASH=mstrmojo.hash,$MSTR_DATATYPE=mstrmojo.mstr.EnumDataType,$ARR=mstrmojo.array,$ARR_MAP=$ARR.map,$ARR_WRAP=mstrmojo.Arr,$EXPR=mstrmojo.expr,$EXPRTYPE=$EXPR.ET,ET2TP=$EXPR.ET2TP,ET2TGT=$EXPR.ET2TGT,FN=$EXPR.FN,FN_MRP=$EXPR.FN_MRP,DTP=$EXPR.DTP,D2FD=$EXPR.DTP2FN_DTP,$META_TP=mstrmojo.meta.TP,$META_STP=mstrmojo.meta.STP,TP=$EXPR.TP,STP=$EXPR.STP,$EH=mstrmojo.elementHelper;var ET2STEPS={};ET2STEPS[$EXPRTYPE.AQ]={target:1,fm:1,fn:1,c0:1,c1:1};ET2STEPS[$EXPRTYPE.AL]={target:1,fm:1,fn:1,c0:1};ET2STEPS[$EXPRTYPE.AE]={target:1,fm:1,es:1};ET2STEPS[$EXPRTYPE.AC]={target:1,fm:1,fm2:1,fm3:1,fn:1,c0:1,c1:1};ET2STEPS[$EXPRTYPE.MQ]={target:1,fn:1,c0:1,c1:1,dmy:1};ET2STEPS[$EXPRTYPE.MC]=ET2STEPS[$EXPRTYPE.MQ];ET2STEPS["*"]={target:1};var ET2FNS={};ET2FNS[$EXPRTYPE.MQ]={key:"metricFns",def:$EXPR.METRIC_FNS};ET2FNS[$EXPRTYPE.MC]={key:"metricFns",def:$EXPR.METRIC_FNS};ET2FNS[$EXPRTYPE.AQ]={key:"formFns",def:$EXPR.FORM_FNS};ET2FNS[$EXPRTYPE.AL]={key:"formFns",def:$EXPR.FORM_FNS};ET2FNS[$EXPRTYPE.AC]={key:"formFns",def:$EXPR.FORM_FNS};ET2FNS[$EXPRTYPE.AE]={key:"elemFns",def:$EXPR.ELEM_FNS};var TIP_STAGE_1=mstrmojo.desc(14084,"Select a filter option or a qualification."),TIP_STAGE_2=mstrmojo.desc(14085,"Select one or more elements."),TIP_STAGE_3=mstrmojo.desc(14086,"Select an operator."),TIP_STAGE_4=mstrmojo.desc(14087,"Enter a value or select an attribute from the list."),TIP_STAGE_5=mstrmojo.desc(14088,"Select an attribute form. When done, click ## button.").replace("##",'"√"'),TIP_STAGE_6=mstrmojo.desc(14089,"Select a condition."),TIP_STAGE_7=mstrmojo.desc(14090,"Enter a value or select a metric from the list.");var FORM_SELECTION_NOT_AE=0,FORM_SELECTION_AE=1;var fnUpdateColumnContainer=mstrmojo.ui.ColumnContainer.prototype.updateColumnContainer;function updateOkBtn(me){var valid=true,model=me.model,i,count=model&&$EXPR.fnCstCount(model.fn,model.fnt);if(!model){return ;}switch(model.et){case $EXPRTYPE.AQ:case $EXPRTYPE.AL:case $EXPRTYPE.MQ:for(i=0;i<count;i++){valid=valid&&!me["invalid"+i];}break;}me.okBtn.set("visible",valid&&!!model.completed);}function walkChildPostCreateFn(){var p=this.parent,h=((p&&p.cssText)||"").match(/height:\s*(\d*)px/);this.cssText=h&&h[0];}var DUMMY_TP="dummy",ERROR_ITEM={did:"idErr",v:"idErr",n:mstrmojo.desc(7929,"Error loading data."),t:DUMMY_TP,css:"unselectable"},WAIT_ITEM={did:"idWait",v:"idWait",n:mstrmojo.desc(2901,"Loading..."),t:DUMMY_TP,css:"unselectable"},SELECT_ITEM={did:"idSelect",v:"idSelect",n:mstrmojo.desc(547,"Select"),t:DUMMY_TP,css:"unselectable"},QUALIFICATION_ITEM={did:"idWait",v:"idQualification",n:mstrmojo.desc(5225,"Qualification"),t:DUMMY_TP,css:"unselectable"},ATTRIBUTE_ITEM={did:"idAttribute",v:"idAttribute",n:mstrmojo.desc(518,"Attribute"),t:DUMMY_TP,css:"unselectable"},METRIC_ITEM={did:"idMetric",v:"idMetric",n:mstrmojo.desc(517,"Metric"),t:DUMMY_TP,css:"unselectable"};function onWalkChange(evt){if(this.updating){return ;}var ms=this.multiSelect,it=this.selectedItem,added=evt&&evt.added,removed=evt&&evt.removed;if(!ms&&added&&removed&&added[0]===removed[0]){return ;}if(it&&it[$META_TP]===DUMMY_TP){this.updating=true;if(ms){this.removeSelect([this.selectedIndex]);}else{var idx=removed&&Number(removed[0]);idx=(idx==null)?-1:idx;this.set("selectedIndex",idx);}this.updating=false;}else{var m=this.parent.parent.parent.model;if(ms){var its=this.items;m.edit(this.alias,{added:added&&$ARR.get(its,added),removed:removed&&$ARR.get(its,removed),itemIdField:this.itemIdField});}else{m.edit(this.alias,it);}}}mstrmojo.rw.ConditionList=mstrmojo.declare(mstrmojo.ListBase,[mstrmojo._IsList],{scriptClass:"mstrmojo.rw.ConditionList",allowUnlistedValues:true,itemIdField:"did",getItemProps:function getItemProps(item,idx){var isSelected=!!this.selectedIndices[idx],n=item.n,isGeo=false;if(item.t===12){var geofs=$ARR.filter(item.fs,function(f){return f.fgr>0;});if(geofs.length>0){isGeo=true;}}return $HASH.copy({cls:(isSelected?mstrmojo._IsList.SELECTED_CLS:"")+" "+(item.css||"")+" "+(item.t?("t"+item.t+((item.da||item.um)?"d":"")+(isGeo?"g":"")+(item.st?(" st"+item.st):"")):""),n:n||"&nbsp;"},this._super(item,idx));},onselectionChange:function onselectionChange(evt){this._super(evt);onWalkChange.call(this,evt);}});function replaceItem(w,item,arr){var its=w.items,idx=$ARR.indexOf(its,item);if((idx===0)&&(its.length===1)){arr=mstrmojo.Arr.makeObservable((arr&&arr.length)?arr.concat():[]);w.set("items",arr);}else{if(idx>-1){its.splice(idx,1);}if(arr&&arr.length){$ARR.insert(its,(idx>-1)?idx:its.length,arr);}w.refresh();}}function getChildJSON(ps){return mstrmojo.mixin(ps,{scriptClass:"mstrmojo.rw.ConditionList",cssClass:"mstrmojo-"+ps.alias,postCreate:walkChildPostCreateFn});}function widgetItemFn(item,idx,widget){var config=item.cfg;if(config){config.data=item;config.parent=widget;return $REG.ref(config);}config=new mstrmojo.Label({text:item.n||"&nbsp;",cssClass:"dial-item "+(item.t?("t"+item.t):"")});config.markupMethods.onselectedChange=function(){$CSS.toggleClass(this.domNode,["selected"],this.selected);};config.data=item;config.parent=widget;return config;}function fnItem(fn,fnt){var d=fnt+$EXPR.FN_SEP+fn;return(fn!=null)?{did:d,n:d}:null;}function initDmys(me){return me.targets?$ARR.filter(me.targets,function(item){return item[$META_TP]===$EXPR.TP.ATTR;}):[];}function updateList(w,show,items,sel){w.updating=true;if(show){if(items!=null){w.clearSelect();w.set("items",items);}var f=w.itemIdField,vWas=w.selectedItem;if((vWas&&vWas[f])!=(sel&&sel[f])){var idx=Math.max($ARR.indexOf($ARR_MAP((items||[]),function(item){return item[f];}),sel&&sel[f]),0);w.set("selectedIndex",idx);}}w.updating=false;}function updateListMultiData(w,items,sel,idxs){w.updating=true;w.clearSelect();$ARR.forEach(items,function(item){item.title=item.title||item.n||"";});if(items){w.set("items",items);}if(sel&&sel.length){w.setSelectedItems(sel);}else{if(idxs&&idxs.length){w.select(idxs);}}w.updating=false;}function updateListMulti(w,show,items,sel,idxs){if(show){updateListMultiData(w,items,sel,idxs);}}function shouldShowCst(w,idx){var m=w.model||{},fn=m.fn;return(fn!=null)&&((m.et===$EXPRTYPE.MQ)||(m.et===$EXPRTYPE.MC)||(m.et===$EXPRTYPE.AQ)||(m.et===$EXPRTYPE.AL)||(m.et===$EXPRTYPE.AC))&&($EXPR.fnCstCount(fn,m.fnt)>idx);}var isDATE={};isDATE[DTP.DATE]=1;isDATE[DTP.TIME]=1;isDATE[DTP.TIMESTAMP]=1;function isComparisonAllowed(model,ets){var etAllowed;if(ets){switch(ET2TGT[model.et]){case"a":etAllowed=ets[$EXPRTYPE.AC];break;case"m":etAllowed=ets[$EXPRTYPE.MC];break;default:etAllowed=false;break;}}else{etAllowed=true;}return etAllowed&&$EXPR.fn_AC_MC(model&&model.fn);}function okCstTypes(m){var tp=m&&ET2TP[m.et],dtp=m&&m.fm&&m.fm.dtp,stp=dtp&&$EXPR.DTP2PROMPT_STP[dtp],ok={};ok[tp]=true;if(stp){ok[stp]=true;}return ok;}function normalizeDataType(dataType){switch(dataType){case $MSTR_DATATYPE.DataTypeInteger:case $MSTR_DATATYPE.DataTypeUnsigned:case $MSTR_DATATYPE.DataTypeDecimal:case $MSTR_DATATYPE.DataTypeReal:case $MSTR_DATATYPE.DataTypeDouble:case $MSTR_DATATYPE.DataTypeFloat:return $MSTR_DATATYPE.DataTypeNumeric;default:return dataType;}}function updateCstList(p){var model=p.model,targetId=model&&model[ET2TGT[model.et]]&&model[ET2TGT[model.et]][p.columnWalk.target.itemIdField],targetForm=model&&model.fm,targetType=targetForm&&targetForm.dtp,fnc=isComparisonAllowed(model,p.ets);if(this.targetsLastMod&&this.targetsLastMod===p.targetsLastMod&&targetId&&targetId===this._lastTargetId&&this.lastFmDtp===targetType&&this.lastFnTp===fnc){return ;}if(!fnc){this.clearSelect();this.set("items",this.items.slice(0,this.preLen));}else{var ok=okCstTypes(model),baseItem=model[ET2TGT[model.et]],newHeader=model.a?[ATTRIBUTE_ITEM]:model.m?[METRIC_ITEM]:[],newItems=newHeader.concat($EXPR.getSortedObjectsByTypeGroup($ARR.filter(p.targets,function(item){return(item.t!==4||item.did!==baseItem.did)&&(ok[item[$META_TP]]||ok[item[$META_STP]]);}))),oldItems=this.items.slice(this.preLen);$ARR.forEach(oldItems.reverse(),function(oldItem){this.remove(oldItem);},this);this.add(newItems,-1);}this._lastTargetId=targetId;this.lastFnTp=fnc;this.lastFmDtp=targetType;this.targetsLastMod=p.targetsLastMod;}function updateCst(me,idx){me.updating=true;var conditionWalk=me.parent.parent.parent,show=shouldShowCst(conditionWalk,idx),i,len;if(show){var model=conditionWalk.model||{},cs=model.cs,c=cs&&cs[idx],v=c&&c.v,dtp;updateCstList.call(me,conditionWalk);switch(model.et){case $EXPRTYPE.MQ:case $EXPRTYPE.MC:dtp=(c&&c.dtp)||normalizeDataType(model.m.dt)||$EXPR.METRIC_DTP;break;case $EXPRTYPE.AQ:case $EXPRTYPE.AC:case $EXPRTYPE.AE:dtp=model.fm&&model.fm.dtp;break;case $EXPRTYPE.AL:dtp=model.fm&&model.fm.dtp;v=[];for(i=0,len=cs&&cs.length;i<len;i++){v.push(cs[i].v);}v=v.join(mstrConfig.listSep);break;}dtp=dtp||DTP.CHAR;var fn=model.fn,isLF=$EXPR.fn_List(fn,model.fnt),isD=isDATE[dtp],isC=isD&&!isLF;var cx=me.ctxtBuilder,iws=cx&&cx.itemWidgets,si=isD?(isC?me.calIndex:me.dtxtIndex):me.txtIndex,iw;for(i=0,len=me.preLen;i<len;i++){iw=iws[i];if(i==si){iw.set("dtp",dtp);iw.set("isList",isLF);iw.set("value",v);iw.set("visible",true);try{if(me.alias!=="c1"){iw.focus&&iw.focus();}}catch(x){}if(fn===1||fn===2){iw.constraints.min=0;}if(iw.clearValidation){iw.clearValidation();}}else{iw.set("visible",false);}if(isLF){iw.set("hint",mstrmojo.desc(8191,"value1## value2## ...## valueN").replace(/##/g,mstrConfig.listSep||";"));}else{iw.set("hint","");}}if(conditionWalk.hasPrompt&&me.selectedItem&&me.selectedItem.st===$EXPR.STP.PROMPT_STRING){conditionWalk.invalid0=false;}switch(model.et){case $EXPRTYPE.AQ:case $EXPRTYPE.AL:case $EXPRTYPE.MQ:if(c&&c.p){me.set("selectedItem",c.p);}else{me.set("selectedIndex",si);}break;case $EXPRTYPE.MC:case $EXPRTYPE.AC:me.set("selectedItem",model[ET2TGT[model.et]+(2+idx)]);break;}}me.updating=false;}function onCstChg(){var d=this.parent,w=d.parent.parent.parent,v=(this.isValid&&this.isValid())||(!this.isValid&&!mstrmojo.string.isEmpty(this.value)),m=w.model;w["invalid"+d.cstIndex]=!v;if(!this.updating&&v){this.updating=true;if(m){m.edit(d.alias,{v:this.value,dtp:this.dtp});}this.updating=false;}updateOkBtn(w);}function clearInvalid(){var d=this.parent,w=d.parent;w["invalid"+d.cstIndex]=false;}function setTip(tip){this.tip.set("text",tip);}function updateFormList(forms){var selectedItem=this.selectedItem;forms=$ARR.filter(forms,function(item){return(!item.icf);});if(selectedItem){var idx=$ARR.find(forms,this.itemIdField,selectedItem[this.itemIdField]);if(idx>-1){forms=forms.concat();forms.splice(idx,1);}}replaceItem(this,WAIT_ITEM,forms);var its=this.items,len=its.length;if(len===1){this.singleSelect(0);}this.parent.updateScrollbars();}function cstJson(props){var constantColumnItems=[{did:660,cfg:{scriptClass:"mstrmojo.ValidationTextBox",required:true,constraints:{trigger:mstrmojo.validation.TRIGGER.ONKEYUP|mstrmojo.validation.TRIGGER.VALUESET},onValid:onCstChg,onInvalid:onCstChg,onClearValidation:clearInvalid,size:6,visible:false}},{did:154,cfg:{scriptClass:"mstrmojo.Calendar",onvalueChange:onCstChg,visible:false}},{did:23,cfg:{scriptClass:"mstrmojo.DateTextBox",cssText:"margin-left:9px;",cssDisplay:"inline-block",required:true,constraints:{trigger:mstrmojo.validation.TRIGGER.ALL},onValid:onCstChg,onInvalid:onCstChg,onClearValidation:clearInvalid,calendarToBody:true,autoFormat:false,calConfig:{onmousedown:function(evt){mstrmojo.dom.stopPropogation(evt.hWin,evt.e);}},visible:false}}];return getChildJSON($HASH.copy(props,{scriptClass:"mstrmojo.WidgetDial",makeObservable:true,itemFunction:widgetItemFn,selectionPolicy:"reselect",items:constantColumnItems.concat(),txtIndex:0,calIndex:2,dtxtIndex:2,preLen:constantColumnItems.length,insertUnlistedValuesAt:-1,itemIdField:"did",update:function(){updateCst(this,this.cstIndex);this.parent.updateScrollbars();},postCreate:function(){this._super();this.parent.parent.parent.attachEventListener("updateTargets",this.id,function(){this.update();});},itemsEffect:undefined,onchange:onWalkChange}));}function fmJson(ps){return getChildJSON($HASH.copy(ps,{insertUnlistedValuesAt:-1,postCreate:function(){walkChildPostCreateFn.apply(this,[]);this.ajx=mstrmojo.insert({parent:this,scriptClass:"mstrmojo.AjaxCall",isTask:true,readCache:true,writeCache:true,params:{taskId:"getAttributeForms",attributeId:null,displayedForms:"0",styleName:"MojoAttributeStyle"},onsuccess:function(){var parent=this.parent,response=this.response;if((response&&response.did)!==parent.lastAttrId){return ;}updateFormList.call(this.parent,response.fms||[]);},onerr:function(){replaceItem(this.parent,WAIT_ITEM,[ERROR_ITEM]);}});},update:function(){var pstf=this.fmPost,p=this.parent.parent.parent,m=p.model,t=m&&m["a"+pstf],show=!!t,fms,fm,ajx,disableElementsBrowsing=p.disableElementsBrowsing,disEB=t&&disableElementsBrowsing&&disableElementsBrowsing(t);if(show){switch(m.et){case $EXPRTYPE.AQ:case $EXPRTYPE.AL:fm=m.fm;break;case $EXPRTYPE.AC:fm=m["fm"+pstf];break;case $EXPRTYPE.AE:fm=fnItem(m.fn,1);break;}if(this.lastAttrId!==t.did){this.lastAttrId=t.did;fms=[];if(this.isFirstFm){if(!disEB&&(!t.ilk&&(!p.ets||p.ets[$EXPRTYPE.AE]))){fms.push(SELECT_ITEM);var lookin=ET2FNS[$EXPRTYPE.AE],key=lookin&&lookin.key;fms=fms.concat((key&&p[key])||lookin.def||[]);}fms.push(QUALIFICATION_ITEM);}if(fm&&(m.et!==$EXPRTYPE.AE)){fms.push(fm);}ajx=this.ajx;ajx.params.attributeId=t.did;ajx.params.otp=t.t||12;fms.push(WAIT_ITEM);$ARR_WRAP.makeObservable(fms);}}if(disEB&&m.et===$EXPRTYPE.AE){fm=null;}updateList(this,show,fms,fm);if(show&&ajx){if(p.getAttributeForms){updateFormList.call(this,p.getAttributeForms(t.did)||[]);}else{if(t.fms){updateFormList.call(this,t.fms);}else{if(ajx){if(ajx._delayId){window.clearTimeout(ajx._delayId);delete ajx._delayId;}ajx._delayId=window.setTimeout(function(){delete ajx._delayId;ajx.send();},500);}}}}}}));}var TGT_PPT_STP=[$EXPR.STP.PROMPT,$EXPR.STP.PROMPT_OBJECTS,$EXPR.STP.PROMPT_ELEMENTS,$EXPR.STP.PROMPT_EXPRESSION,$EXPR.STP.PROMPT_EXPRESSION_DRAFT];function okTargetTps(exprTypes){if(exprTypes&&!$HASH.isEmpty(exprTypes)){var ok=$ARR.hash(TGT_PPT_STP);$HASH.forEach(exprTypes,function(allowed,et){if(allowed){ok[ET2TP[et]]=true;}});return ok;}return null;}mstrmojo.rw.ConditionWalkProvider=mstrmojo.declare(mstrmojo.Obj,null,{scriptClass:"mstrmojo.rw.ConditionWalkProvider",browseEs:function browseEs(me,ch,p){me.openPopup("eb",{zIndex:me.parent.zIndex+10,left:Math.round(p.x)+"px",top:Math.round(p.y)+"px"});var eb=me.eb.browser,m=me.model,aid=m&&m.a&&m.a.did;if(!aid){return ;}eb.set("attributeID",aid);eb.set("selectedItems",m.es?$HASH.clone(m.es):[]);eb.initBrowser();},browseObjs:function browseObjs(me,ch,p){me.openPopup("ob",{zIndex:me.parent.zIndex+10,left:Math.round(p.x)+"px",top:Math.round(p.y)+"px"});var ob=me.ob.browser;ob.target=ch;var tps;switch(ch.alias){case"dmy":tps=[$EXPR.TP.ATTR,$EXPR.TP.DIM];break;case"c0":case"c1":var model=me.model,expressionType=model&&model.et,fm=model&&model.fm,dtp=fm&&fm.dtp||(model.m?$EXPR.DTP.DECIMAL:$EXPR.DTP.UNKNOWN);tps=(expressionType===$EXPRTYPE.MQ||expressionType===$EXPRTYPE.MC)?[$EXPR.TP.METRIC,$EXPR.DTP2PROMPT_STP[dtp]]:[$EXPR.TP.ATTR,$EXPR.DTP2PROMPT_STP[dtp]];break;default:tps=okTargetTps(me.ets);tps=tps?$HASH.keyarray(tps,true):[$EXPR.TP.ATTR,$EXPR.TP.METRIC,$EXPR.STP.REPORT_GRID,$EXPR.STP.REPORT_GRAPH,$EXPR.STP.REPORT_ENGINE,$EXPR.STP.REPORT_TEXT,$EXPR.STP.REPORT_DATAMART,$EXPR.STP.REPORT_BASE,$EXPR.STP.REPORT_GRIDGRAPH,$EXPR.STP.REPORT_NONINTERACTIVE,$EXPR.STP.FILTER].concat(TGT_PPT_STP);}tps[tps.length]=$EXPR.TP.FOLDER;ob.browse({rootFolderType:model&&(model.et===$EXPRTYPE.MQ||model.et===$EXPRTYPE.MC)?5:26,folderLinksContextId:33,onSelectCB:[me,"onOBSelect"],browsableTypes:tps.join(",")});},getFm2NodeProps:function getFm2NodeProps(){return{alias:"fm2",children:[fmJson({alias:"fm2",fmPost:2})],updateColumnContainer:function updateColumnContainer(){var conditionWalk=this.parent.parent;this.fm2.update();setTip.call(conditionWalk,TIP_STAGE_5);fnUpdateColumnContainer.call(this);}};},getC0NodeProps:function getC0NodeProps(){var me=this;return{alias:"c0",children:[{scriptClass:"mstrmojo.Label",cssClass:"baseOn",text:mstrmojo.desc(527,"Value")},cstJson({alias:"c0",cstIndex:0}),{scriptClass:"mstrmojo.Label",alias:"btwn",cssClass:"btwn",text:mstrmojo.desc(308,"and"),visible:false},cstJson({alias:"c1",cstIndex:1,visible:false}),{alias:"browseLink",scriptClass:"mstrmojo.Label",cssClass:"mstrmojo-walkstep-browse",text:mstrmojo.desc(7926,"Browse..."),onclick:function(){this.parent.parent.parent.browse(this.parent.c0);},visible:false}],updateColumnContainer:function updateColumnContainer(){this.c0.update();var columnWalk=this.parent,conditionWalk=columnWalk.parent,model=columnWalk.parent.model,fn=model&&model.fn,showBtwn=fn===FN.BETWEEN||fn===FN.NOT_BETWEEN||fn===FN_MRP.BETWEEN||fn===FN_MRP.BETWEEN_DESCENDING,showFm2=fn===FN.EQUAL||fn===FN.NOT_EQUAL||fn===FN.GREATER||fn===FN.GREATER_EQUAL||fn===FN.LESS||fn===FN.LESS_EQUAL,idx=this.idx,next=this.next;this.browseLink.set("visible",conditionWalk.objectBrowsingEnabled&&isComparisonAllowed(model,conditionWalk.ets));this.btwn.set("visible",showBtwn);this.c1.set("visible",showBtwn);if(showBtwn){this.c1.update();}else{model.edit("c1",{v:null,dtp:null,skipET:true});}if(model.a2&&showFm2){if(!(next&&next.fm2)){columnWalk.insertAndRemoveTrailing(idx,me.getFm2NodeProps());}}else{columnWalk.removeTrailingContainer(idx);}setTip.call(conditionWalk,model.a?TIP_STAGE_4:model.m?TIP_STAGE_7:"");fnUpdateColumnContainer.call(this);}};},getFnNodeProps:function getFnNodeProps(){var me=this;return{alias:"fn",children:[{scriptClass:"mstrmojo.Label",cssClass:"baseOn",text:mstrmojo.desc(9579,"Condition")},fmJson({alias:"fn",allowUnlistedValues:false,update:function(){var conditionWalk=this.parent.parent.parent,m=conditionWalk.model||{},et=m.et,dtp,show=false,fns,sel;switch(et){case $EXPRTYPE.AE:show=!!m.a;break;case $EXPRTYPE.AQ:case $EXPRTYPE.AC:case $EXPRTYPE.AL:show=!!(m.fm&&m.fm.did);dtp=show?m.fm.dtp:null;break;case $EXPRTYPE.MQ:case $EXPRTYPE.MC:show=!!m.m;dtp=show?$EXPR.METRIC_DTP:null;break;}if(show){var fndtp=D2FD[dtp];if((this.lastEt!==et)||(this.lastFnDtp!==fndtp)){this.lastEt=et;this.lastFnDtp=fndtp;var lookin=et?ET2FNS[et]:null,k=lookin&&lookin.key;fns=(k&&conditionWalk[k])||lookin.def||[];if(typeof (fns)==="object"){fns=fns[fndtp]||fns["*"];}}sel=fnItem(m.fn,m.fnt||1);}updateList(this,show,fns,sel);this.parent.updateScrollbars();}})],updateColumnContainer:function updateColumnContainer(){this.fn.update();var columnWalk=this.parent,conditionWalk=columnWalk.parent,model=conditionWalk.model,fn=model&&model.fn,next=this.next,isFnNull=fn===FN.IS_NULL||fn===FN.IS_NOT_NULL;if(fn&&isFnNull){columnWalk.removeTrailingContainer(this.idx);}else{if(fn&&!(next&&next.c0)){columnWalk.insertAndRemoveTrailing(this.idx,me.getC0NodeProps());}}setTip.call(conditionWalk,model.a?TIP_STAGE_3:model.m?TIP_STAGE_6:"");next=this.next;if(next){next.updateColumnContainer();}}};},getEsNodeProps:function getEsNodeProps(){var children=[{scriptClass:"mstrmojo.ui.CheckList",alias:"es",itemIdField:"v",allowUnlistedValues:true,insertUnlistedValuesAt:0,selectionPolicy:"toggle",postCreate:function pces(){walkChildPostCreateFn.apply(this,[]);this.ajx=mstrmojo.insert({parent:this,scriptClass:"mstrmojo.AjaxCall",isTask:true,params:{taskId:"browseElements",attributeID:null,styleName:"MojoAttributeStyle",blockBegin:1,blockCount:mstrApp.elementsBlockCount||30},onsuccess:function(){var p=this.parent,rs=this.response;if((rs&&rs.did)!==p.lastAttrId){return ;}var its=(rs&&rs.es)?$ARR.filter(rs.es,function(el){return !$EH.isNullElem(el.v);}):[],sel=p.parent.parent.parent.model&&p.parent.parent.parent.model.es,findMissingItem=function(array,items){var lenA=array&&array.length||0,lenB=items&&items.length||0,rel=[],i,j;for(i=0;i<lenB;i++){for(j=0;j<lenA;j++){if(items[i].n===array[j].n){break;}}if(j===lenA){rel.push(items[i]);}}return rel;},adjustSelItems=function(oldSel,its,prop){var newsel=[],nit;$ARR.forEach(oldSel,function(sel){nit=$ARR.filterOne(its,function(ait){return sel[prop]&&ait[prop]&&sel[prop]===ait[prop];});if(nit){newsel.push(nit);}});return newsel.length===oldSel.length?newsel:oldSel;};sel=sel&&adjustSelItems(sel,its,"v");if(p.allowUnlistedValues){var dif=findMissingItem(its,sel);its=(p.insertUnlistedValuesAt===0)?dif.concat(its):its.concat(dif);}updateListMultiData(p,its,sel,null);p.parent.updateScrollbars();},onerr:function(){replaceItem(this.parent,WAIT_ITEM,[ERROR_ITEM]);}});},onselectionChange:function onselectionChange(evt){mstrmojo.ListBase.prototype.onselectionChange.call(this,evt);onWalkChange.call(this,evt);},update:function udes(){var conditionWalk=this.parent.parent.parent,model=conditionWalk.model,a=model&&model.a,show=!!a&&!a.ilk,es,sel,idxs,len,i,ajx;if(show){if(this.lastAttrId!==a.did){this.lastAttrId=a.did;es=model.es;len=es&&es.length;es=len?es.concat():[];es.push(WAIT_ITEM);if(len){idxs=[];for(i=1;i<=len;i++){idxs[i]=i;}}ajx=this.ajx;conditionWalk.updateBrowseElementsParams(ajx.params,a);}else{sel=model.es;}}updateListMulti(this,show,es,sel,idxs);if(show&&ajx){if(conditionWalk.getElements){var list=this;conditionWalk.getElements(a,{success:function(res){updateListMultiData(list,res.es||[],conditionWalk.model&&conditionWalk.model.es,null);list.parent.updateScrollbars();},failure:function(){replaceItem(list,WAIT_ITEM,[ERROR_ITEM]);}});}else{ajx.send();}}},setupScrollNodes:function setupScrollNodes(){this.scrollNode=null;}}];if(!mstrApp.isSingleTier){children.splice(0,0,{scriptClass:"mstrmojo.Label",cssClass:"mstrmojo-walkstep-browse",text:mstrmojo.desc(7928,"Browse elements..."),onclick:function onclick(){this.parent.parent.parent.browse(this.parent.es);}});}return{alias:"es",children:children,updateList:function(items){updateListMulti(this.es,true,items,this.parent.parent.model.es,null);this.updateScrollbars();},updateColumnContainer:function updateColumnContainer(){var conditionWalk=this.parent.parent;this.es.update();setTip.call(conditionWalk,TIP_STAGE_2);}};},getFmNodeProps:function getFmNodeProps(){var me=this;return{alias:"fm",children:[fmJson({alias:"fm",fmPost:"",filter:false,isFirstFm:true})],updateColumnContainer:function updateColumnContainer(){this.fm.update();var columnWalk=this.parent,conditionWalk=columnWalk.parent,model=conditionWalk.model,fm=model&&model.fm,idx=this.idx,a=model&&model.a,disableElementsBrowsing=conditionWalk.disableElementsBrowsing,disEB=a&&disableElementsBrowsing&&disableElementsBrowsing(a);var oldType=(model.etWas&&model.etWas===$EXPRTYPE.AE)?FORM_SELECTION_AE:FORM_SELECTION_NOT_AE,newType=FORM_SELECTION_NOT_AE;if(model.et===$EXPRTYPE.AE&&!disEB){newType=FORM_SELECTION_AE;}if(oldType!==newType||newType===FORM_SELECTION_NOT_AE){columnWalk.removeTrailingContainer(idx);if(newType===FORM_SELECTION_NOT_AE&&fm){columnWalk.addNextColumn(me.getFnNodeProps());}else{if(newType===FORM_SELECTION_AE){columnWalk.addNextColumn(me.getEsNodeProps());}}}setTip.call(conditionWalk,TIP_STAGE_1);fnUpdateColumnContainer.call(this);}};},getTargetNodeProps:function getTargetNodeProps(){var me=this;return{alias:"target",target:null,browseLink:null,children:[{scriptClass:"mstrmojo.Label",cssClass:"baseOn",text:mstrmojo.desc(11859,"Based On")},getChildJSON({alias:"target",insertUnlistedValuesAt:0,makeObservable:true,hideIfEmpty:true,postCreate:function(){this._super();this.parent.parent.parent.attachEventListener("updateTargets",this.id,function(){this.update();});},onObjBrowsed:function(item){if(item.st===STP.FILTER||item.t===TP.REPORT||item.t===TP.PROMPT){this.parent.parent.parent.onOK();}},update:function update(){var conditionWalk=this.parent.parent.parent,model=conditionWalk.model,targetsLastMod=conditionWalk.targetsLastMod,et=model&&model.et;if(this.lastModel!==model||this.targetsLastMod!==targetsLastMod){this.lastModel=model;this.targetsLastMod=targetsLastMod;var tgs=conditionWalk.targets,ets=conditionWalk.ets;if(ets&&tgs&&tgs.length){var ok=okTargetTps(conditionWalk.ets);tgs=$ARR.filter(tgs,function(item){return ok[item[$META_TP]];});}var t=model&&model[ET2TGT[et]];updateList(this,true,$EXPR.getSortedObjectsByTypeGroup(tgs),t);this.parent.updateScrollbars();}}}),{alias:"browseLink",scriptClass:"mstrmojo.Label",cssClass:"mstrmojo-walkstep-browse",text:mstrmojo.desc(7926,"Browse..."),onclick:function(){this.parent.parent.parent.browse(this.parent.target);}}],updateColumnContainer:function updateColumnContainer(){this.target.update();var columnWalk=this.parent,conditionWalk=columnWalk.parent,model=conditionWalk.model,et=model&&model.et,idx=this.idx,next=this.next;this.browseLink.set("visible",conditionWalk.objectBrowsingEnabled);if(et){switch(et){case $EXPRTYPE.AQ:case $EXPRTYPE.AL:case $EXPRTYPE.AC:case $EXPRTYPE.AE:if(model.a&&!(next&&next.fm)){this.parent.insertAndRemoveTrailing(idx,me.getFmNodeProps());}break;case $EXPRTYPE.MQ:case $EXPRTYPE.MC:if(model.m&&!(next&&next.fn)){this.parent.insertAndRemoveTrailing(idx,me.getFnNodeProps());}break;case $EXPRTYPE.R:case $EXPRTYPE.F:case $EXPRTYPE.XML:this.parent.removeTrailingContainer(idx);break;}}next=this.next;if(next){next.updateColumnContainer();}}};}});var CWP=mstrmojo.rw.ConditionWalkProvider;CWP.updateOkBtn=updateOkBtn;CWP.setTip=setTip;CWP.getChildJSON=getChildJSON;CWP.updateList=updateList;CWP.fmJson=fmJson;CWP.cstJson=cstJson;}());