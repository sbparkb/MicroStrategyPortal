(function(){mstrmojo.requiresCls("mstrmojo.Container","mstrmojo._HasEditableText","mstrmojo.array","mstrmojo.css","mstrmojo.dom","mstrmojo.hash");var $CSS=mstrmojo.css,$DOM=mstrmojo.dom,$H=mstrmojo.hash,$WIDGET=mstrmojo.Widget;mstrmojo.architect.ui.LayerLabel=mstrmojo.declare(mstrmojo.Container,[mstrmojo._HasEditableText],{scriptClass:"mstrmojo.architect.ui.LayerLabel",markupString:'<div id="{@id}" class="mstrmojo-ar-LayerLabel {@cssClass}" mstrAttach:click,dblclick><div class="mstrmojo-ar-ll-n">{@text}</div><span class="mstrmojo-ar-ll-icn del"></span></div>',markupSlots:{containerNode:function containerNode(){return this.domNode;},textNode:function textNode(){return this.domNode.firstChild;},deleteNode:function deleteNode(){return this.domNode.lastChild;}},markupMethods:{onvisibleChange:$WIDGET.visibleMarkupMethod,onheightChange:$WIDGET.heightMarkupMethod,onwidthChange:$WIDGET.widthMarkupMethod},text:"",editableSlot:"textNode",editOnClick:false,onselectedChange:function onselectedChange(){$CSS.toggleClass(this.domNode,"selected",this.selected);},onclick:function onclick(evt){var layerId=this.layerId,target=evt.target||$DOM.eventTarget(evt.hWin,evt.e);if(target===this.deleteNode){this.parent.closeLayer(layerId);}else{if(this.isEditing!==true){this.parent.onclick($H.copy(evt,{labelWidget:this}));}}evt.cancel();},ondblclick:function ondblclick(evt){var target=evt.target||$DOM.eventTarget(evt.hWin,evt.e);if(target===this.textNode){this.set("isEditing",true);}evt.cancel();},onTextEditComplete:function onTextEditComplete(textChanged,originalText){if(textChanged){var isValid=mstrApp.getRootController().renameLayer(this.layerId,this.text);if(isValid!==true){this.set("text",originalText);this.set("title",originalText);this.set("isEditing",true);}else{this.parent.onTabRenamed(this.layerId,this.text);}}}});}());