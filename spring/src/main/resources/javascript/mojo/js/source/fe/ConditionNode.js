(function(){mstrmojo.requiresCls("mstrmojo.ConditionNode","mstrmojo.fe._IsRelationTreeNode","mstrmojo.dom","mstrmojo.css");var _D=mstrmojo.dom,_C=mstrmojo.css,_createSetHtml=mstrmojo.fe._IsRelationTreeNode.createSetHtml;mstrmojo.fe.ConditionNode=mstrmojo.declare(mstrmojo.ConditionNode,[mstrmojo.fe._IsRelationTreeNode],{scriptClass:"mstrmojo.fe.ConditionNode",emptyText:mstrmojo.desc(5893,"New Condition"),markupString:'<div id="{@id}" class="mstrmojo-cond mstrmojo-ConditionNode {@cssClass}" mstrAttach:mousedown><div class="mstrmojo-onhoverparent mstrmojo-cond-prefix {@cssClass}"><span class="mstrmojo-textset mstrmojo-cond-prefix-text" mstrAttach:click></span><span class="mstrmojo-onhover-in mstrmojo-andor-tools {@cssClass}">{@_prefixAndOrToolsMarkup}</span></div><div class="mstrmojo-onhoverparent mstrmojo-cond-contents {@cssClass}"><span class="mstrmojo-textset mstrmojo-cond-text {@cssClass}" mstrAttach:click></span><span class="mstrmojo-cond-text-postfix {@cssClass}"></span><span class="mstrmojo-rel mstrmojo-cond-popupNode {@cssClass}"></span><span class="mstrmojo-onhover-bl mstrmojo-abs mstrmojo-topright mstrmojo-cond-tools {@cssClass}"><img class="mstrmojo-del" src="../images/1ptrans.gif" tooltip="'+mstrmojo.desc(7931,"Delete condition")+'" onclick="mstrmojo.all[\'{@id}\'].del()" /></span><span class="mstrmojo-add-cond" mstrAttach:click>'+mstrmojo.desc(1994,"Add Condition")+"</span>"+_createSetHtml+"</div></div>",getPrefixAndOrToolsMarkup:function(){return(_createSetHtml+this._super());},markupSlots:{prefixHoverNode:function(){return this.domNode.firstChild;},prefixNode:function(){return this.domNode.firstChild.firstChild;},prefixAndOrToolsNode:function(){return this.domNode.firstChild.childNodes[1];},condNode:function(){return this.domNode.childNodes[1];},textNode:function(){return this.domNode.childNodes[1].firstChild;},textPostfixNode:function(){return this.domNode.childNodes[1].childNodes[1];},popupNode:function(){return this.domNode.childNodes[1].childNodes[2];},createSetNode:function(){return this.domNode.childNodes[1].lastChild;},createSetOptNode:function(){return this.domNode.firstChild.childNodes[1].firstChild;},addConditionNode:function(){return this.domNode.childNodes[1].childNodes[4];}},markupMethods:mstrmojo.hash.copy({onnoRelationOperatorChange:function(){_C.toggleClass(this.prefixHoverNode,["noRelation"],this.noRelationOperator);},onnoRelationChange:function(){_C.toggleClass(this.condNode,["noRelation"],this.noRelation);},onnoCreateSetChange:function(){_C.toggleClass(this.condNode,["noRelation"],this.noCreateSet);}},mstrmojo.hash.copy(mstrmojo.ConditionNode.prototype.markupMethods)),init:function(props){if(this._super){this._super(props);}var et=this.data&&this.data.et;if(et){this.set("noCreateSet",et===10||et===12);}},preclick:function pc(evt){var p=null,t=_D.eventTarget(evt.hWin,evt.e),_result=this._super(evt);if(_D.contains(this.createSetOptNode,t,true)&&!this.noRelationOperator&&!this.noRelation){p="createSetOpt";}else{if(_D.contains(this.createSetNode,t,true)&&!this.noRelation){p="createSet";}else{if(_D.contains(this.addConditionNode,t,true)){p="addCondition";}}}evt.part=p||evt.part;return _result;},onmouseover:function(){this.toggleGroupBorder(true);},onmouseout:function(){this.toggleGroupBorder(false);}});})();