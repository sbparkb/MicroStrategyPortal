(function(){mstrmojo.requiresCls("mstrmojo.Widget");var $CSS=mstrmojo.css,SELECTED_CLASS="selected";mstrmojo.ButtonSwitch=mstrmojo.declare(mstrmojo.Widget,null,{scriptClass:"mstrmojo.ButtonSwitch",markupString:'<div id="{@id}" class="mstrmojo-ButtonSwitch {@cssClass}" style="{@cssText}" mstrAttach:click><div class="left selected" > {@label1} </div><div class="right"> {@label2} </div></div>',markupSlots:{left:function(){return this.domNode.children[0];},right:function(){return this.domNode.children[1];}},switchFn:mstrmojo.emptyFn,onselectedChange:function(){var i;for(i=0;i<2;i++){$CSS.toggleClass(this.domNode.children[i],SELECTED_CLASS,this.selected===i);}this.switchFn();},onclick:function onclick(evt){this.set("selected",(evt.getTarget()===this.left)?0:1);}});}());