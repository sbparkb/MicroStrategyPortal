(function(){mstrmojo.requiresCls("mstrmojo.dom","mstrmojo.css","mstrmojo.Widget");var _D=mstrmojo.dom;mstrmojo.InlineEditBox=mstrmojo.declare(mstrmojo.Widget,null,{scriptClass:"mstrmojo.InlineEditBox",text:null,editMode:false,allowEdit:true,okSave:false,emptyHint:"Enter your text here.",markupString:'<div id="{@id}" class="mstrmojo-InlineEditBox {@cssClass}" style="{@cssText}" mstrAttach:click><div class="mstrmojo-InlineEditBox-text"></div><div class="mstrmojo-InlineEditBox-edit"><input type="text" class="mstrmojo-InlineEditBox-input" mstrAttach:keyup/><img class="mstrmojo-InlineEditBox-ok" src="../images/1ptrans.gif" title="Save"/><img class="mstrmojo-InlineEditBox-cancel" src="../images/1ptrans.gif" title="Cancel"/></div></div>',markupSlots:{textNode:function(){return this.domNode.firstChild;},editNode:function(){return this.domNode.lastChild;},inputNode:function(){return this.domNode.lastChild.firstChild;},okNode:function(){return this.domNode.lastChild.childNodes[1];},cancelNode:function(){return this.domNode.lastChild.lastChild;}},markupMethods:{ontextChange:function(){this.textNode.innerHTML=mstrmojo.string.encodeHtmlString(this.text||this.emptyHint||"");},oneditModeChange:function(){var em=this.editMode,dn=this.domNode,tn=this.textNode,en=this.editNode;mstrmojo.css.toggleClass(dn,["edit"],em);if(em){tn.style.display="none";en.style.display="block";tn=this.inputNode;var tns=tn.style;tn.value=this.text||"";tns.width=(dn.clientWidth-(this.okSave?(this.okNode.offsetWidth+this.cancelNode.offsetWidth):0))+"px";tns.height=dn.clientHeight+"px";tn.focus();if(tn.createTextRange){var tr=tn.createTextRange(),len=tn.value.length;tr.move("character",len);tr.select();}}else{tn.style.display="block";en.style.display="none";}},onokSaveChange:function(){var s=this.okSave?"inline":"none";this.okNode.style.display=s;this.cancelNode.style.display=s;},onallowEditChange:function(){mstrmojo.css.toggleClass(this.domNode,["disable"],!this.allowEdit);}},onvisibleChange:function onvisibleChange(){if(this.domNode){this.domNode.style.display=(this.visible?"block":"none");}},preclick:function(evt){var e=evt.e,t=_D.eventTarget(evt.hWin,e);if(t===this.okNode){this.save();}else{if(t===this.cancelNode){this.cancel();}else{if(this.editMode!==this.allowEdit){this.set("editMode",this.allowEdit);}}}},prekeyup:function(evt){var e=evt.e,k=e.keyCode||e.charCode;if(k===mstrmojo.Enum_Keys.ENTER){this.save();}else{if(k===mstrmojo.Enum_Keys.ESCAPE){this.cancel();}}},_attachEvents:function(){var me=this;if(this.editMode){if(!this._save_handler){this._save_handler=function(){var t=_D.eventTarget(self,arguments[0]);if(!_D.contains(me.domNode,t,true,document.body)){me.save();}};}_D.attachEvent(document.body,"mousedown",this._save_handler);}else{if(this._save_handler){_D.detachEvent(document.body,"mousedown",this._save_handler);}}},postBuildRendering:function(){if(this._super){this._super();}this._em_sub=this.attachEventListener("editModeChange",this.id,"_attachEvents");},destroy:function(){this.detachEventListener(this._em_sub);if(this._super){this._super();}},save:function(){this.set("text",this.inputNode.value);this.set("editMode",false);if(this.onSave){this.onSave();}},cancel:function(){this.set("editMode",false);if(this.onCancel){this.onCancel();}}});}());