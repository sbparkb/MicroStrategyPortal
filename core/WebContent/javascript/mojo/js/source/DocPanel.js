(function(){mstrmojo.requiresCls("mstrmojo.Container","mstrmojo._Formattable","mstrmojo._ContainsDocObjects","mstrmojo._HasBuilder","mstrmojo._SupportsEllipsisText","mstrmojo._HasEllipsis","mstrmojo.css","mstrmojo.array");var $CSS=mstrmojo.css,$A=mstrmojo.array;var ITEM_SPA=2;function passDirtyKeyToAncestorPanel(pnl,methodName,key){var p=pnl.parent.parent;if(p&&p instanceof mstrmojo.DocPanel){p[methodName+"DirtyKey"](key);}}function setDirtyChildrenOnDescendant(key,panel,allDirty){if(key===panel.k){mstrmojo.array.forEach(panel.children,function(child){if(child.setDirtyChildren){child.setDirtyChildren(allDirty);}});}}function isNonODFP(pnl){return pnl._isFP()&&!pnl.parent.defn.od;}mstrmojo.DocPanel=mstrmojo.declare(mstrmojo.Container,[mstrmojo._Formattable,mstrmojo._ContainsDocObjects,mstrmojo._HasBuilder,mstrmojo._SupportsEllipsisText,mstrmojo._HasEllipsis],{scriptClass:"mstrmojo.DocPanel",visible:false,selected:false,k:"",cssDisplay:"block",subPanelCssText:"height:100%;width:100%;position:absolute;",topStart:ITEM_SPA,contentWidth:0,markupString:'<div id="{@id}" k="{@k}" class="mstrmojo-DocPanel {@cssClass}" style="{@cssText}{@domNodeCssText}"><div class="mstrmojo-DocSubPanel-content" style="{@containerNodeCssText}{@subPanelCssText}"></div></div>',markupMethods:{onvisibleChange:function(){var domNodeStyle=this.domNode.style,isVisible=this.visible;if(isNonODFP(this)){domNodeStyle.visibility=(isVisible?"":"hidden");domNodeStyle.zIndex=(isVisible?10:1);}else{domNodeStyle.display=(isVisible?this.cssDisplay:"none");}}},markupSlots:{containerNode:function(){return this.domNode.firstChild;}},formatHandlers:{containerNode:["background-color","fx","overflow"]},title:"",init:function init(props){this._super(props);if(!this.title){this.title=this.node.defn.ttl||"";}if(this._isSearchBoxPanel()){this.isSbp=true;this.set("canApplySbp",false);}},childRenderCheck:function childRenderCheck(c){return(this._super(c)&&(this.selected||isNonODFP(this)));},postBuildRendering:function postBuildRendering(){if(!this.defn.l&&!this._forceRender){$CSS.addClass(this.domNode,"placeholder");}var _result=this._super();if(this.isSbp){var btn=this.addChildren({scriptClass:"mstrmojo.Button",cssClass:"sbp-apply",title:mstrmojo.desc(134,"Apply"),cssText:"top:"+((parseInt(this.parent.fmts.height,10)||0)-28)/2+"px",bindings:{enabled:"this.parent.canApplySbp&&this.parent.parent.applyEnabled"},onclick:function(){this.parent.parent.applyBufferedSlices();}});btn.render();}if(this._isFSP()){this.set("shouldEllipsize",true);}if(mstrApp.isOIVM&&mstrApp.isOIVM()&&mstrmojo.dom.isChrome){var of=this.containerNode.style.overflow;this.containerNode.style.overflow="hidden";var me=this;window.setTimeout(function(){if(me.containerNode&&me.containerNode.style&&me.containerNode.style.overflow){me.containerNode.style.overflow=of;}},2000);}return _result;},onselectedChange:function onselectedChange(evt){if(evt.value){this.renderChildren();}this.model&&this.model.raiseEvent({name:"panelSelected",panelId:this.id,panelVisible:!!evt.value});},updateForPU:function updateForPU(node){this.node=node;this.update(node);},refreshForPU:function refreshForPU(){this._isPartial=true;this.refresh();this._isPartial=false;},_isPartial:false,refresh:function refresh(){if(!this.hasRendered){return ;}this._inRendering=true;var c=[].concat(this.getPanelChildren()||[]),dataChildren=[].concat(this.getChildren(this._isPartial)),i;$A.removeItems(c,"k",dataChildren);$A.removeItems(dataChildren,"k",this.getPanelChildren());if(c.length!==0){$A.forEach(c,function(child){this.removeChildren(child);child.destroy();},this);}if(dataChildren.length!==0){$A.forEach(dataChildren,function(child){var node=child.id&&mstrmojo.all[child.id];var nodeDefn=node&&node.defn;if(nodeDefn){nodeDefn._isDeleted=true;}if(node&&node.destroy){node.destroy();}},this);this.addChildren(this.builder.build(dataChildren,this.model,this.buildConfig));}c=[].concat(this.getPanelChildren()||[]);for(i=c.length-1;i>=0;i--){c[i].refresh();}if(this._isFP()&&this.selected){this.refreshFP();}if(this._isFSP()){this.set("richTooltip",{content:this.containerNode.innerHTML,contentNodeCssClass:"sp-tooltip",left:-20,top:20,refNode:this.domNode});this.ellipsizeElements("div",this.containerNode,true);}this._inRendering=false;},setDirty:function setDirty(isDirty){this[(isDirty?"add":"remove")+"DirtyKey"](this.k);},addDirtyKey:function addDirtyKey(key){var d=this.defn,hash=d.dirtyKeys||{};hash[key]=true;d.dirtyKeys=hash;if(key===this.k){mstrmojo.array.forEach(this.children,function(child){if(child.setDirtyChildren){child.setDirtyChildren(true);}});}setDirtyChildrenOnDescendant(key,this,true);passDirtyKeyToAncestorPanel(this,"add",key);},removeDirtyKey:function removeDirtyKey(key){passDirtyKeyToAncestorPanel(this,"remove",key);setDirtyChildrenOnDescendant(key,this,false);if(key===this.k){mstrmojo.array.forEach(this.children,function(child){if(child.setDirtyChildren){child.setDirtyChildren(false);}});}var defn=this.defn,dk=defn.dirtyKeys;if(!dk){return ;}delete dk[key];if(!mstrmojo.hash.isEmpty(dk)){return ;}delete defn.dirtyKeys;},getPanelChildren:function getRealChildren(){return $A.filter(this.children||[],function(c){return c.scriptClass!=="mstrmojo.Button";});},preBuildRendering:function(){if(this._isFSP()){this.useRichTooltip=true;}if(this._super){this._super();}},renderChildren:function rnCh(){this._inRendering=true;var ch=this.children;if(ch&&(this._isFP()||this._isFSP())){$A.forEach(ch,function(c){c.getFormats();});}if(this.isSbp){$CSS.addClass(this.domNode,"mstrmojo-sbp");}if(this._isFP()){$CSS.addClass(this.parent.domNode,"fpgb");if(ch){var ocw=this.domNode.clientWidth-2*ITEM_SPA,i,len;this.topStart=ITEM_SPA+1;for(i=0,len=(ch&&ch.length)||0;i<len;i++){var cw=this.domNode.clientWidth-2*ITEM_SPA;this.contentWidth=(cw>0)?cw:0;if(cw!==ocw){this.topStart=ITEM_SPA+1;var j;for(j=0;j<i;j++){var oc=ch[j];oc.refresh();if(oc.getContainerHeight){this.topStart+=oc.getContainerHeight()+ITEM_SPA+1;}}}var c=ch[i];if(this.childRenderCheck(c)){c.render(null);if(c.getContainerHeight){this.topStart+=c.getContainerHeight()+ITEM_SPA+1;}}}}}else{this._super();}if(this._isFSP()){this.set("richTooltip",{content:this.containerNode.innerHTML,contentNodeCssClass:"sp-tooltip",left:-20,top:20,refNode:this.domNode});this.ellipsizeElements("div",this.containerNode,true);}this._inRendering=false;},refreshFP:function refreshFP(){if(!this.hasRendered){return ;}var ch=this.children,len=(ch&&ch.length)||0,i;this.topStart=ITEM_SPA+1;var cw=this.domNode.clientWidth-2*ITEM_SPA;this.contentWidth=(cw>0)?cw:0;for(i=0;i<len;i++){var c=ch[i];if(c.relocate){c.relocate(this.topStart,this.contentWidth);}if(c.updateContentHeight){c.updateContentHeight();}if(c.getContainerHeight){this.topStart+=c.getContainerHeight()+ITEM_SPA+1;}}},getChildren:function getChildren(isPartial){var ch=this.model.getChildren(this.node,isPartial);if(this._isFP()||this._isFSP()){var len=(ch&&ch.length)||0,i;for(i=0;i<len;i++){var c=ch[i];if(this._isFP()&&!c.defn.iifp){c.defn.iifp=true;}if(this._isFSP()&&!c.defn.iifs){c.defn.iifs=true;}}}ch=$A.filter(ch||[],function(child){if(typeof child.defn.ifw==="boolean"){return !child.defn.ifw;}return true;});return ch;},onchildRenderingChange:function chRnChg(child){this._super(child);if(this._isFSP()&&!this._inRendering){this.ellipsizeElements("div",this.containerNode,true);}},_isFP:function _isFP(){return !!this.parent.defn.ifp;},_isFSP:function _isFSP(){return !!this.parent.defn.ifsp;},_isSearchBoxPanel:function(){return false;},canApplySearchBoxPanel:function(){var ch=this.model.getChildren(this.node,false),i;for(i=0;i<ch.length;i++){var c=ch[i],sb=mstrmojo.all[c.id];if(sb&&sb.canApply&&!sb.canApply()){return false;}}return true;},doEllipsize:function(){if(this.shouldEllipsize){this.ellipsizeElements("div",this.containerNode,true);}if(this._super){this._super();}}});}());