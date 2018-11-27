(function(){mstrmojo.requiresCls("mstrmojo.ListBase","mstrmojo._IsList","mstrmojo._HasOwnAvatar","mstrmojo.warehouse._CanToggleAvatarClass","mstrmojo.architect.EnumDragActions","mstrmojo.architect.EnumDataChangeEvents","mstrmojo.array","mstrmojo.css","mstrmojo.Button");var $A=mstrmojo.array,$CSS=mstrmojo.css,$DOM=mstrmojo.dom,$ENUM_DRAG_ACTIONS=mstrmojo.architect.EnumDragActions,$ENUM_DATA_CHANGE_EVENTS=mstrmojo.architect.EnumDataChangeEvents;function onElementRename(evt){var items=this.items,idx=$A.find(items,"attributeId",evt.did);if(idx>-1){var item=items[idx];item.n=evt.value;this._getItemNode(idx).outerHTML=this.itemRenderer.render(item,idx,this);}}mstrmojo.architect.ui.ElementList=mstrmojo.declare(mstrmojo.ListBase,[mstrmojo._IsList,mstrmojo._HasOwnAvatar,mstrmojo.warehouse._CanToggleAvatarClass],{scriptClass:"mstrmojo.architect.ui.ElementList",cssClass:"mstrmojo-ar-rpc-elementlist",draggable:true,dropZone:false,itemIcnCss:"",getItemMarkup:function getItemMarkup(){return'<div class="item {@cls}" idx="{@idx}" style="{@style}"><span class="item-icn {@itemIcnCss}"></span><span>{@n}</span></div>';},getItemProps:function getItemProps(item,idx){var superItemProps=this._super(item,idx);if(superItemProps!==undefined){superItemProps.itemIcnCss=(item.tp!==undefined)?("t"+item.tp):"";}return superItemProps;},init:function init(props){this._super(props);this.attributes={};var evtConfig={},containerConfig=evtConfig[this.id]={};containerConfig[$ENUM_DATA_CHANGE_EVENTS.RENAME]=onElementRename;mstrApp.getRootController().attachDataChangeListeners(evtConfig);},isDragValid:function isDragValid(){return true;},createAvatar:function createAvatar(sourceNode){var div=document.createElement("div");var item=$DOM.findAncestorByAttr(sourceNode,"idx",true,this.domNode);if(item&&item.node){div.appendChild(item.node.cloneNode(true));div.appendChild(document.createElement("div"));}div.className=this.domNode.className;return div;},getDragData:function getDragData(context){var item=$DOM.findAncestorByAttr(context.src.node,"idx",true,this.domNode);context.createRelations=true;return item&&this.items[item.value];},getDragAction:function getDragAction(){return $ENUM_DRAG_ACTIONS.LINKER_ATTR;},toggleAvatarClass:function toggleAvatarClass(cls,isAdd){$CSS.toggleClass(this.avatar,cls,isAdd);},setElementsList:function setElementsList(elements){var list=this;list.set("items",[]);list.set("items",elements);}});}());