(function(){mstrmojo.requiresCls("mstrmojo.ui.PopupList","mstrmojo.css","mstrmojo.array","mstrmojo.Button");var $A=mstrmojo.array,$DOM=mstrmojo.dom,STR_DELETE_LAYER_CONFIRM="Are you sure you want to delete layer '##'?",STR_ADD=mstrmojo.desc(11386,"Add Layer");mstrmojo.architect.ui.LayerList=mstrmojo.declare(mstrmojo.ui.PopupList,null,{scriptClass:"mstrmojo.architect.ui.LayerList",markupString:'<div id="{@id}" class="mstrmojo-ListBase mstrmojo-ar-UnitList mstrmojo-ar-LayerList" style="{@cssText}" mstrAttach:click,dblclick,mouseover,mouseout><div class="{@icnCss}" style="{@icnCssText}">{@itemsHtml}</div><div class="mstrmojoj-ar-ul-add">'+STR_ADD+"</div></div>",selectionPolicy:"reselect",multiSelect:true,getItemMarkup:function getItemMarkup(item,idx){return'<div class="item {@cls}" idx="{@idx}" style="{@style}"><span>{@n}</span><span del="{@idx}" class="mstrmojo-ar-ulist-icn-del"></span></div>';},markupSlots:{itemsContainerNode:function itemsContainerNode(){return this.domNode.firstChild;},addNode:function itemsContainerNode(){return this.domNode.lastChild;},scrollboxNode:function scrollboxNode(){return this.domNode;}},onclick:function onclick(evt){var target=evt.target||$DOM.eventTarget(evt.hWin,evt.e),item=$DOM.findAncestorByAttr(target,"del",true,this.domNode),idx=item&&parseInt(item.value,10),layerItem=this.items[idx];if(target===this.addNode){mstrApp.getRootController().addLayer(undefined,true,"");}else{if(idx!==null&&!isNaN(idx)){mstrmojo.confirm(STR_DELETE_LAYER_CONFIRM.replace("##",layerItem.n),{confirmBtn:{fn:function(){mstrApp.getRootController().deleteLayer(layerItem.did);}}});}else{this._super(evt);}}},_set_selected:function _set_selected(propName,propValue){this.selected=propValue;if(propValue!==null){this.singleSelect($A.find(this.items,"did",propValue));return true;}return false;},onheightChange:function onheightChange(){if(this.hasRendered){this.domNode.style.height=this.height;this.itemsContainerNode.style.height=(parseInt(this.height,10)-this.addNode.clientHeight)+"px";}}});}());