(function(){mstrmojo.requiresCls("mstrmojo.AndOrNode","mstrmojo.fe._IsRelationTreeNode","mstrmojo.expr","mstrmojo.dom","mstrmojo.array","mstrmojo.css");var _E=mstrmojo.expr,_D=mstrmojo.dom,_A=mstrmojo.array,_C=mstrmojo.css,_createSetHtml=mstrmojo.fe._IsRelationTreeNode.createSetHtml;var _updateDifferentChildren=function(){var n="noRelationOperator",v=this[n],children=this.ctxtBuilder&&this.ctxtBuilder.itemWidgets||[],diffChildren=mstrmojo.array.filter(children,function(item){return item&&item[n]!==v&&item.data.et!==_E.ET.RLS;}),len=diffChildren.length;for(var i=0;i<len;i++){diffChildren[i].set(n,v);}};mstrmojo.fe.AndOrNode=mstrmojo.declare(mstrmojo.AndOrNode,[mstrmojo.fe._IsRelationTreeNode],{scriptClass:"mstrmojo.fe.AndOrNode",markupString:'<div id="{@id}" class="mstrmojo-andor mstrmojo-AndOrNode {@cssClass}"  style="position:relative;{@cssText}" mstrAttach:mousedown><div class="mstrmojo-onhoverparent mstrmojo-andor-prefix" mstrAttach:click><span class="mstrmojo-textset mstrmojo-andor-prefix-text"></span><span class="mstrmojo-onhover-in mstrmojo-andor-tools {@cssClass}">{@_prefixAndOrToolsMarkup}</span></div><div class="mstrmojo-andor-top"></div><div class="mstrmojo-andor-contentsWrapper" style="position:relative"><div class="mstrmojo-andor-contents" style="position:relative;{@itemsContainerCssText}">{@itemsHtml}</div><div class="mstrmojo-ListBase2-dropCue mstrmojo-AndOrNode-dropCue {@cssClass}"><div class="mstrmojo-ListBase2-dropCue-inner mstrmojo-AndOrNode-dropCue-inner"></div></div></div><div class="mstrmojo-andor-bottom"></div></div>',getPrefixAndOrToolsMarkup:function(){return(_createSetHtml+this._super());},markupSlots:mstrmojo.hash.copy({createSetNode:function(){return this.domNode.firstChild.childNodes[1].firstChild;}},mstrmojo.hash.copy(mstrmojo.AndOrNode.prototype.markupSlots)),markupMethods:mstrmojo.hash.copy({onnoRelationOperatorChange:function(){_C.toggleClass(this.prefixHoverNode,["noRelation"],this.noRelationOperator);}},mstrmojo.hash.copy(mstrmojo.AndOrNode.prototype.markupMethods)),removeSet:function removeSet(rq){var index=rq.childIndex(),d=rq.data,addNds=[d];if(index>=0){this.remove(index,true);if(d.nds&&d.nds.length>0){addNds=d.nds;if(d.not){addNds[0].not=true;}}else{delete d.dmy;delete d.relation;delete d.applySubExpr;delete d.relation;delete d.useSchema;delete d.dmt;}this.add(addNds,index);this.consolidate(false);}},createSet:function createSet(idxs,cfg){var toIn=this._ndsToMove(this,idxs);if(!toIn){return ;}this.remove(toIn.idxs,true);var rqNds=toIn.nds,rqNot;if(rqNds){if(rqNds.length>1){var bq={et:_E.ET.ANDOR,nds:rqNds};bq.fn=this.data.fn;rqNds=[bq];rqNot=bq.nds[0].not;}else{var rqNd=rqNds[0];if(rqNd&&rqNd.not&&rqNd.et===_E.ET.ANDOR){rqNot=rqNd.not;delete rqNd.not;}}}if(cfg&&cfg.rq){var rq;if(cfg.isMetric){rq=cfg.cq;mstrmojo.hash.copyProps(["applySubExpr","dmy","dmt","relation","useSchema"],cfg.rq,rq);}else{rq=cfg.rq;rq.nds=rqNds;if(rqNot){rq.not=rqNot;}}this.add([rq],toIn.idxs[0]);}this.consolidate(false);},preclick:function pc(evt){var p=null,t=_D.eventTarget(evt.hWin,evt.e),_result=this._super(evt);if(_D.contains(this.createSetNode,t,true)&&!this.noRelationOperator){p="createSetOpt";}evt.part=p||evt.part;return _result;},preadd:function pa(evt){if(this._super){this._super(evt);}this.updateRelationOperator();},preremove:function prm(evt){if(this._super){this._super(evt);}this.updateRelationOperator();},consolidate:function con(){this._super();this.updateRelationOperator();},postBuildRendering:function pstBR(){var _result=this._super();this.updateRelationOperator();return _result;},updateRelationOperator:function updateRelationOperator(){var children=this.ctxtBuilder&&this.ctxtBuilder.itemWidgets||[],hasRelationChild=!!_A.filterOne(children,function(widget){return widget&&(widget.data.et===_E.ET.RLS||(widget.data.et===_E.ET.ANDOR&&widget.noRelationOperator));}),p=this.parent;this.set("noRelationOperator",hasRelationChild);_updateDifferentChildren.call(this);if(p&&p.hasRendered&&p.updateRelationOperator){p.updateRelationOperator();}},onmouseover:function(){this.toggleGroupBorder(true);},onmouseout:function(){this.toggleGroupBorder(false);}});})();