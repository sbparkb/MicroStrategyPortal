(function(){mstrmojo.requiresCls("mstrmojo.WidgetList","mstrmojo.dom","mstrmojo.TreeNodeSelector");var $DOM=mstrmojo.dom,NODE_STATE_CSS_MAP={0:"closed",1:"opened",2:"leaf"};mstrmojo.TreeNode=mstrmojo.declare(mstrmojo.WidgetList,null,{scriptClass:"mstrmojo.TreeNode",markupString:'<li id="{@id}" class="mstrmojo-TreeNode {@cssClass}" style="{@cssText}" mstrAttach:mousedown,mouseover><div class="mstrmojo-TreeNode-div"><img class="mstrmojo-TreeNode-state" src="../images/1ptrans.gif" /><span class="mstrmojo-TreeNode-text {@textCssClass}"></span></div><ul class="mstrmojo-TreeNode-itemsContainer">{@itemsHtml}</ul></li>',markupSlots:{stateNode:function(){return this.domNode.firstChild.firstChild;},textNode:function(){return this.domNode.firstChild.lastChild;},itemsContainerNode:function(){return this.domNode.lastChild;}},markupMethods:{ontextChange:function(){this.textNode.innerHTML=mstrmojo.string.encodeHtmlString(this.text);},onstateChange:function(){this.stateNode.className="mstrmojo-TreeNode-state "+(NODE_STATE_CSS_MAP[this.state]||"closed");this.itemsContainerNode.style.display=(this.state===1)?"block":"none";},onselectedChange:function(){var fn=this.selected?"addClass":"removeClass";mstrmojo.css[fn](this.domNode.firstChild,["selected"]);},ondropCuePosChange:mstrmojo.WidgetList.prototype.markupMethods.ondropCuePosChange},renderOnScroll:false,listSelector:mstrmojo.TreeNodeSelector,premousedown:function pmd(evt){var ret=this._super(evt),t=$DOM.eventTarget(evt.hWin,evt.e);if(t===this.stateNode){if(this.state!==2){this.set("state",this.state===1?0:1);}}return ret;},preclick:function(evt){mstrmojo.dom.stopPropogation(evt.hWin,evt.e);},prechange:function(evt){var ret=this._super(evt);if(ret!==false){var t=this.tree;if(t&&t.onnodechange){t.onnodechange(evt);}}return ret;}});}());