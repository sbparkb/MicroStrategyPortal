(function(){mstrmojo.requiresCls("mstrmojo.ui.menus.MenuPopup","mstrmojo.Button","mstrmojo.dom");mstrmojo.requiresDescs(1442,2140);var $DOM=mstrmojo.dom,$ARR=mstrmojo.array;function getButtonReference(isOk,config){var captionId=2140,captionText="Cancel",path="this.parent.popupConfig."+(isOk?"ok":"cancel"),btnTxt=config&&config[(isOk?"ok":"cancel")+"BtnText"];if(isOk){captionId=1442;captionText="Ok";}return mstrmojo.Button.newWebButton(btnTxt||mstrmojo.desc(captionId,captionText),function(evt){var editor=this.parent,popupConfig=editor.popupConfig;editor.closeAllMenus();popupConfig["fn"+captionText](popupConfig.data,editor);$DOM.stopPropogation(evt.hWin,evt.e);},isOk,{slot:"btnNode",bindings:{enabled:path+"Enabled",visible:path+"Visible"},cssDisplay:"inline-block"});}mstrmojo.ui.menus.MenuEditor=mstrmojo.declare(mstrmojo.ui.menus.MenuPopup,null,{scriptClass:"mstrmojo.ui.menus.MenuEditor",markupString:'<div id="{@id}" class="mstrmojo-ui-MenuEditor {@cssClass}" style="{@cssText}" mstrAttach:mouseover,mouseout,click><div class="me-content"></div><div class="me-buttons"></div><div class="me-bottom"></div></div>',markupSlots:{containerNode:function containerNode(){return this.domNode.firstChild;},btnNode:function btnNode(){return this.domNode.children[1];},bottomNode:function btnNode(){return this.domNode.children[2];}},popupConfig:null,init:function init(props){this._super(props);var config=this.popupConfig,bottomNode=config.bottomNode;this.data=config.data||{};if(config.onOpen){this.onOpen=config.onOpen;}this.addChildren([getButtonReference(true,config),getButtonReference(false)]);if(bottomNode){bottomNode.slot="bottomNode";this.addChildren(bottomNode);}},onOpen:function onOpen(){$ARR.forEach(this.children,function(child){if(child.scriptClass==="mstrmojo.ui.ScrollableContainer"&&child.onOpen){child.onOpen();}});}});}());