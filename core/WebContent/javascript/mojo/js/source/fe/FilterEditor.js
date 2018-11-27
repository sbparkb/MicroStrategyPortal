(function(){mstrmojo.requiresCls("mstrmojo.array","mstrmojo.css","mstrmojo.dom","mstrmojo.expr","mstrmojo.hash","mstrmojo.Box","mstrmojo.Button","mstrmojo.Dial","mstrmojo.Editor","mstrmojo.FilterExpr","mstrmojo.HBox","mstrmojo.Label","mstrmojo.Obj","mstrmojo.CheckBox","mstrmojo.warehouse.EnumObjectTypes","mstrmojo.fe.FilterExprTree","mstrmojo.fe.RelationFilterExprTree","mstrmojo.fe.CreateSetEditor","mstrmojo.fe.ConditionWalk","mstrmojo.ui.Pulldown","mstrmojo.ui.StatusButton");var _E=mstrmojo.expr,_ET=_E.ET,_BF=_E.BRANCH_FNS,Obj=mstrmojo.Obj,$D=mstrmojo.dom,$A=mstrmojo.array,$H=mstrmojo.hash,$CSS=mstrmojo.css,$ENUM_OT=mstrmojo.warehouse.EnumObjectTypes,$ENUM_OUTPUT_LEVEL={TEMPLATE:0,DATASET:1},_DMT=mstrmojo.mstr.EnumNodeDimty,VALID_DIMTY_TYPES=$A.hash([_DMT.NodeDimtyUnspecified,_DMT.NodeDimtyNone]),_HEIGHT=200,_CORNER=mstrmojo.ui.PopupConfig.ENUM_CORNERS;function toggleButtonStatus(status){$A.forEach(this.buttonBar.children[0].children,function(button){button.set("enabled",status);});}function destroyAvatar(){var avatar=this.avatar;if(avatar){avatar.parentNode.removeChild(avatar);delete this.avatar;$CSS.removeClass(avatar,[this.avatarCssClass]);}}mstrmojo.fe.FilterEditorBase=mstrmojo.declare(mstrmojo.Editor,null,{onSave:null,title:mstrmojo.desc(12032,"View Filter Editor"),help:"view_filter_editor_for_report_services_documents.htm",cssClass:"mstrmojo-charcoalboxe mstrmojo-FE",showLimits:true,objectBrowsingEnabled:false,children:null,init:function init(props){this.children=[{alias:"feContent",scriptClass:"mstrmojo.Box",cssClass:"mstrmojo-FE-content",postCreate:function(){this.children=[{scriptClass:"mstrmojo.Box",cssClass:"mstrmojo-FE-exprTool",children:[{scriptClass:"mstrmojo.ui.StatusButton",cssClass:"mstrmojo-FE-addCondition",postCreate:function postCreate(){this.editor=this.parent.parent.parent;this.statusList=this.editor.getAddConditionList();this.status=this.statusList[0];},onButtonClick:function(item){if(item){item.handler.apply(this.editor);}}}]},this.parent.getExpressionContainerCfg()];}},this.getConditionWalkConfig(),{alias:"buttonBar",scriptClass:"mstrmojo.HBox",cssClass:"mstrmojo-Editor-buttonBar",slot:"buttonNode",children:[{scriptClass:"mstrmojo.HBox",cssText:"float:right; border-collapse: separate",cellSpacing:3,children:[{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-WebButton hot",text:mstrmojo.desc(118,"Save"),onclick:function(){var editor=this.editor;_save(editor);editor.close();},bindings:{enabled:function(){return !this.editor.readOnly;},editor:"this.parent.parent.parent"}},{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-WebButton",text:mstrmojo.desc(221,"Cancel"),onclick:function(){this.editor.close();},bindings:{editor:"this.parent.parent.parent"}}]}]}];this._super(props);this.model=this.model||new Obj();},getExpressionContainerCfg:function(){var editor=this;return{alias:"feExpr",scriptClass:"mstrmojo.Box",cssClass:"mstrmojo-FE-expr-list",postCreate:function(){this.children=editor.getExpressionContentsConfig();},onRender:function(){$D.attachMarkupEvent(this.id,this.domNode,"mousedown");},onmousedown:function(evt){var el=$D.eventTarget(evt.hWin,evt.e);if(this.isBlankArea(el)){this.clearSelect();}},isBlankArea:function(el){return el===this.domNode;},clearSelect:function(){}};},getExpressionContentsConfig:function(){return[];},getConditionWalkConfig:function(){var editor=this;return{scriptClass:"mstrmojo.rw.ConditionWalk",width:"750px",objectBrowsingEnabled:false,dimtyTypes:VALID_DIMTY_TYPES,alias:"walk",visible:false,onOK:function onOK(){var cond=this.condition;editor.feContent.set("visible",true);this.set("visible",false);editor.onConditionEdit(cond,this.model.get());toggleButtonStatus.call(editor,true);},close:function close(){editor.feContent.set("visible",true);this.set("visible",false);var c=this.condition;if(c.isEmpty()){c.del();}toggleButtonStatus.call(editor,true);},targets:null,targetsLastMod:null,ets:null,condition:null,bindings:{disableElementsBrowsing:"this.parent.disableElementsBrowsing"}};},onConditionEdit:function(cond,newData){cond.tree.modifyConditionNode(cond,newData);},getAddConditionList:function getAddConditionList(){return[{n:mstrmojo.desc(1994,"Add Condition"),handler:function(){this.mainExpr.newCondition(null,true);}}];},andOrPopupRef:{scriptClass:"mstrmojo.Editor",cssClass:"mstrmojo-FE-andOrPopup mstrmojo-CGE-andOrPopup mstrmojo-ConditionWalk",contentNodeCssClass:"mstrmojo-balloon",slot:"containerNode",modal:false,autoClose:true,showTitle:false,draggable:false,openEffect:null,closeEffect:null,onOpen:function(){var w=this.condition,not=w&&w.data&&w.data.not,p=w&&w.parent,pd=p&&p.data,fn=(pd&&pd.fn)+(not?21:0);this.list.opening=true;this.list.set("selectedItem",isNaN(fn)?null:{did:fn});this.list.opening=false;},children:[{scriptClass:"mstrmojo.Dial",cssClass:"mstrmojo-CGE-andOrDial",alias:"list",itemMarkup:'<div class="dial-item {@css}">{@n}</div>',itemIdField:"did",items:[{did:19,n:_BF[19]},{did:20,n:_BF[20]},{did:19+21,n:_BF["19_21"]},{did:20+21,n:_BF["20_21"]}],onchange:function(){if(this.opening){return ;}var pop=this.parent,w=pop.condition,sel=this.selectedItem,did=sel&&sel.did,not=did>21?true:null,fn=did-(not?21:0);pop.close();var bq=w&&w.parent;if(bq&&bq.data&&bq.data.et===_ET.ANDOR){bq.edit(w,fn,not);}else{var d=w&&w.data;if(d&&(d.not!==not)){d.not=not;w.paint();}}}}]},createSetPopupRef:{scriptClass:"mstrmojo.fe.CreateSetEditor",contentNodeCssClass:"",cssClass:"CreateSet-Editor",title:mstrmojo.desc(12034,"Create a Set"),slot:"containerNode"},_set_busy:function(n,v){if(v){this.set("enabled",false);this.set("iconClass","mstrmojo-WaitIcon");}else{this.set("enabled",true);this.set("iconClass","");}},_set_model:function(n,v){var vWas=this.model,chg=vWas!==v;if(chg){this.model=v;this.modelLastSet=new Date();var fnWrap=function(expr){return _consolidateExpressions(_convertTreeToForest(expr));};v.exprForest=fnWrap(v.expr);v.limitExprForest=fnWrap(v.limitExpr);if(this.feContent&&this.feContent.feExpr.ve){this.feContent.feExpr.ve.nameFactory.clear();}}return chg;},onUpdateBrowseElementsParams:mstrmojo.emptyFn});mstrmojo.fe.ReportFilterEditor=mstrmojo.declare(mstrmojo.fe.FilterEditorBase,null,{getExpressionContainerCfg:function(){var cfg=this._super();return mstrmojo.mixin({clearSelect:function(){this.re.clearTreeSelect();}},cfg);},getExpressionContentsConfig:function(){return[{alias:"re",scriptClass:"mstrmojo.fe.ReportFilterExprTree",level:$ENUM_OUTPUT_LEVEL.DATASET,bindings:{items:"this.editor.model.exprForest || []"},postApplyProperties:function(){this.editor=this.parent.parent.parent;this.editor.set("mainExpr",this);}}];}});mstrmojo.fe.ReportFilterExprTree=mstrmojo.declare(mstrmojo.fe.FilterExprTree,null,{scriptClass:"mstrmojo.fe.ReportFilterExprTree",cssClass:"mstrmojo-expr mstrmojo-FE-datasetExpr",onNew:function(inf){inf.data.isNew=true;_openWalk(this.editor,inf.data,inf.widget.ctxtBuilder.itemWidgets[inf.index],"condition");},onnodeclick:function ndclk(evt){_openWalk(evt.editor||this.tree.editor,this.data,this,evt&&evt.part);},allowDrop:function allowDrop(ctxt){var s=ctxt&&ctxt.src,d=s&&s.data,et=d&&d.et,srcTree=s&&s.widget&&s.widget.tree;return et&&this!==srcTree;}});mstrmojo.fe.FilterEditor=mstrmojo.declare(mstrmojo.fe.FilterEditorBase,null,{getExpressionContainerCfg:function(){var cfg=this._super();return mstrmojo.mixin({isBlankArea:function(el){if(this._super(el)){return true;}return !$A.filterOne([this.ve,this.vle],function(child){if($D.contains(child.domNode,el,true)){return true;}});},clearSelect:function(){this.ve.clearTreeSelect();this.vle.clearTreeSelect();}},cfg);},getExpressionContentsConfig:function(){return[{scriptClass:"mstrmojo.Label",text:mstrmojo.desc(11746,"Dataset Level Conditions"),cssClass:"mstrmojo-FE-expr-header dl",bindings:{visible:"true || this.parent.parent.parent.showLimits"}},{alias:"ve",scriptClass:"mstrmojo.fe.RWViewFilterExprTree",level:$ENUM_OUTPUT_LEVEL.DATASET,bindings:{items:"this.editor.model.exprForest || []"},onBlankClick:function(evt){this.parent.clearSelect(evt);},supportRelation:true,postApplyProperties:function(){this.editor=this.parent.parent.parent;this.editor.set("mainExpr",this);}},{scriptClass:"mstrmojo.Label",text:mstrmojo.desc(11747,"Template Level Conditions"),cssClass:"mstrmojo-FE-expr-header tl",bindings:{visible:"this.parent.parent.parent.showLimits"}},{alias:"vle",scriptClass:"mstrmojo.fe.RWViewLimitExprTree",level:$ENUM_OUTPUT_LEVEL.TEMPLATE,bindings:{visible:"this.editor.showLimits",items:"this.editor.model.limitExprForest || []"},onBlankClick:function(evt){this.parent.clearSelect(evt);},postApplyProperties:function(){this.editor=this.parent.parent.parent;this.editor.set("limitExpr",this);}}];},getConditionWalkConfig:function(){var cfg=this._super();$H.copy({scriptClass:"mstrmojo.fe.ConditionWalk"},cfg);return cfg;},getAddConditionList:function getAddConditionList(){var list=this._super();list.push({n:mstrmojo.desc(12055,"Add Dynamic Condition"),handler:function(){this.mainExpr.newCondition({et:_ET.XML,idc:1,ph:{}},true);}});return list;},onConditionEdit:function(cond,newData){if(cond.tree.level===cond.level||cond.tree.level===undefined){this._super(cond,newData);}else{cond.parent.remove(cond.data);var targetTree=$ENUM_OUTPUT_LEVEL.TEMPLATE===cond.level?this.limitExpr:this.mainExpr;targetTree.addSingleCondition(newData);}}});mstrmojo.fe.RWViewFilterExprTree=mstrmojo.declare(mstrmojo.fe.RelationFilterExprTree,null,{scriptClass:"mstrmojo.fe.RWViewFilterExprTree",cssClass:"mstrmojo-expr mstrmojo-FE-datasetExpr",onNew:function(inf){inf.data.isNew=true;if(!inf.data.ph){_openWalk(this.editor,inf.data,inf.widget.ctxtBuilder.itemWidgets[inf.index],"condition");}},onnodeclick:function ndclk(evt){_openWalk(evt.editor||this.tree.editor,this.data,this,evt&&evt.part);},ondragend:function mainDragend(c){var t=c&&c.tgt,w=t&&t.widget;if(this.tree&&w&&w.tree&&w.tree!==this.tree){destroyAvatar.call(this);return ;}this._super(c);},getItemConfig:function(item,idx,widget){var config=this._super(item,idx,widget);return $H.copy({getConditionTextPostfix:function(){if(this.data.et!==_ET.MQ){return"";}return'<img class="mstrmojo-moveToViewLimit" src="../images/1ptrans.gif" title="'+mstrmojo.desc(4978,"Move to view limit")+'"onclick="var w = mstrmojo.all[\''+this.id+"']; w.tree.moveMQNodeToViewLimit(w); return false;\" />";}},config);},moveMQNodeToViewLimit:function(node){if(node.data.et!==_ET.MQ){return ;}var newData=$H.copy(node.data);node.parent.remove(node.data);var limitExpr=this.editor.limitExpr;limitExpr.addSingleCondition(newData);},allowDrop:function allowDrop(ctxt){var s=ctxt&&ctxt.src,d=s&&s.data,et=d&&d.et,tgtTree=this.tree,srcTree=s&&s.widget&&s.widget.tree;return et&&(this===tgtTree?(srcTree!==tgtTree):true);}});mstrmojo.fe.RWViewLimitExprTree=mstrmojo.declare(mstrmojo.fe.FilterExprTree,null,{scriptClass:"mstrmojo.fe.RWViewLimitExprTree",cssClass:"mstrmojo-expr mstrmojo-FE-limitExpr",validExprTypes:$A.hash([_ET.MQ]),onnodeclick:function ndclk(evt){_openWalk(this.tree.editor,this.data,this,evt&&evt.part);},onConditionEdit:function(condition,isNew){this._super(condition,isNew);condition.data.mdxUnitId=condition.data.m.did;_repositionLimitCondition(condition);},addSingleCondition:function(data){var newNode=this._super(data);_repositionLimitCondition(newNode);},allowDrop:function(ctxt){var s=ctxt&&ctxt.src,d=s&&s.data,et=d&&d.et,t=this.tree,srcTree=s&&s.widget&&s.widget.tree;if(t===srcTree){return this!==srcTree&&this.data&&(this===s.parent||this.data.mdxUnitId===d.mdxUnitId);}return et===_ET.MQ;},ondrop:function limitDrop(ctxt){var src=ctxt&&ctxt.src,wSrc=src&&src.widget;if(wSrc&&wSrc.tree!==this.tree){var d=src&&src.data;if(d&&d.index!==null){var cond=wSrc.ctxtBuilder.itemWidgets[d.index];cond.tree.moveMQNodeToViewLimit(cond);}src.data=null;}this._super(ctxt);},isEditable:function(item){return item.mdxUnitId&&this._super(item);},ondragend:function limitDragend(ctxt){var tgt=ctxt&&ctxt.tgt,wTgt=tgt&&tgt.widget;if(wTgt&&wTgt.tree!==this.tree){var d=ctxt.src&&ctxt.src.data;if(d&&(d.indices||(d.index!==null))){this.remove(d.indices||d.index);}destroyAvatar.call(this);}else{this._super(ctxt);}},moveMQNodeToViewFilter:function(node){var tgtExpr=this.editor.mainExpr;node.parent.remove(node.data);tgtExpr.addSingleCondition(node.data);},getItemConfig:function(item,idx,widget){item.mdxUnitId=_limitUnitId(item);var config=this._super(item,idx,widget);return $H.copy({cssClass:_isPerMetricLimitRoot(item,idx,widget)?"per-metric-limit":"",forbidRelation:true,getConditionTextPostfix:function(){if(this.data.et!==_ET.MQ){return"";}return'<img class="mstrmojo-moveToViewFilter" src="../images/1ptrans.gif" title="'+mstrmojo.desc(9746,"Move to view filter")+'"onclick="var w = mstrmojo.all[\''+this.id+"']; w.tree.moveMQNodeToViewFilter(w); return false;\" />";}},config);}});function _openWalk(editor,data,widget,type){var off=$D.delta(widget.domNode,editor.containerNode);off.y+=(type==="andor"?16:parseInt(widget.domNode.offsetHeight,10));var cfg={condition:widget,zIndex:editor.zIndex+10,left:off.x+"px",top:off.y+"px"},n;switch(type){case"andor":if(editor.skipAndOrPopup){return ;}n="andOrPopupRef";break;case"createSet":case"createSetOpt":var targets=editor.model.targets;n="createSetPopupRef";cfg.type=type;cfg.model={attrs:$A.filter(targets,function(item){return item.t===$ENUM_OT.ATTRIBUTE;}),metrics:$A.filter(targets,function(item){return item.t===$ENUM_OT.METRIC;})};if(type==="createSetOpt"){cfg.condition=widget.parent;cfg.model.childIdx=widget.childIndex();}break;case"condition":var newWalk=editor.walk,textNode=widget.textNode.cloneNode(true),conditionStringNode=newWalk.conditionNode.firstChild;$CSS.removeClass(textNode,"editable");$CSS.addClass(newWalk.conditionNode,"mstrmojo-ConditionNode");if(conditionStringNode.firstChild){conditionStringNode.removeChild(conditionStringNode.firstChild);}conditionStringNode.appendChild(textNode);newWalk.set("objectBrowsingEnabled",editor.objectBrowsingEnabled);newWalk.set("targets",editor.model.targets);newWalk.set("targetsLastMod",editor.modelLastSet);newWalk.set("ets",widget.tree.validExprTypes||editor.validExprTypes);newWalk.set("condition",widget);newWalk.set("model",$H.clone(data));newWalk.set("hasPrompt",editor.model.hasPrompt);newWalk.set("disableElementsBrowsing",editor.disableElementsBrowsing||newWalk.disableElementsBrowsing);newWalk.set("editor",editor);newWalk.set("inRelation",widget.inRelation);editor.feContent.set("visible",false);newWalk.set("visible",true);newWalk.columnWalk.target.updateScrollbars();toggleButtonStatus.call(editor,false);return ;}editor.openPopup(n,cfg);}function _save(editor){var m=editor.model;m.expr=_convertForestToTree(m.exprForest);m.limitExpr=_convertForestToTree(_formatLimitExprForestForSaving(m.limitExprForest));editor.onSave(m);}function _consolidateExpressions(exprArr){var ret=[];$A.forEach(exprArr,function(nd){if(!nd){return ;}if(nd.et===_ET.ANDOR){nd.nds=_consolidateExpressions(nd.nds);if(nd.nds.length===0){return ;}else{if(nd.nds.length===1){var child=nd.nds[0];if(nd.not){child.not=!child.not;}ret.push(child);return ;}}}ret.push(nd);});return ret;}function _convertTreeToForest(tree){return tree?[tree]:[];}function _convertForestToTree(forest){return forest&&forest.length===1?forest[0]:null;}function _formatLimitExprForestForSaving(forest){var nds=_consolidateExpressions(forest),newExpr;if(!nds[0]||nds[0].mdxUnitId){newExpr={et:_ET.ANDOR,fn:_E.FN.AND,nds:nds};}else{newExpr=nds[0];}return[newExpr];}function _isPerMetricLimitRoot(item,idx,widget){return(widget===widget.tree||widget.parent===widget.tree)&&!!item.mdxUnitId;}function _limitUnitId(nd){if(!("mdxUnitId" in nd)){var did;switch(nd.et){case _ET.MQ:did=nd.m.did||null;break;case _ET.ANDOR:$A.forEach(nd.nds,function(subNd){var subDid=_limitUnitId(subNd);if(did===undefined){did=subDid;}else{if(did!==subDid){did=null;return false;}}return true;});break;default:did=undefined;break;}nd.mdxUnitId=did;}return nd.mdxUnitId;}function _repositionLimitCondition(cond){var wExpr=cond.tree,wRoot=wExpr.ctxtBuilder.itemWidgets[0],wSrcParent=cond.parent,idx=$A.indexOf(wSrcParent.items,cond.data),data=wSrcParent.items[idx],unitId=data.mdxUnitId;if(wSrcParent===wExpr){return ;}if(wSrcParent.data.mdxUnitId===unitId){return ;}if(wRoot.data.mdxUnitId){var newRootData={et:_ET.ANDOR,fn:_E.FN.AND,nds:[wRoot.data,data]};wExpr.remove(0);wExpr.add([newRootData]);wExpr.ctxtBuilder.itemWidgets[0].ctxtBuilder.itemWidgets[0].remove(data);}else{var wDstParent=wRoot,dstParentIndex;$A.forEach(wRoot.data.nds,function(nd,i){if(nd.mdxUnitId===data.mdxUnitId&&wRoot.items[i]!==data){wDstParent=wRoot.ctxtBuilder.itemWidgets[i];dstParentIndex=i;return false;}});if(wDstParent===wSrcParent){return ;}if(wDstParent.data.et!==_ET.ANDOR){var group={et:_ET.ANDOR,fn:_E.FN.AND,nds:[wDstParent.data,data]};wRoot.add([group],dstParentIndex+1);wRoot.remove(wDstParent.data);}else{wDstParent.add([data]);}wSrcParent.remove(data);}}}());