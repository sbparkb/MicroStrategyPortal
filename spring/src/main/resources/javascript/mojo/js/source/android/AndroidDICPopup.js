(function(){mstrmojo.requiresCls("mstrmojo.android.Dialog","mstrmojo.Button");mstrmojo.android.AndroidDICPopup=mstrmojo.declare(mstrmojo.android.Dialog,null,{scriptClass:"mstrmojo.AndroidDICPopup",cssClass:"mstrmojo-AndroidDICPopup",autoClose:false,fadeOnClose:false,init:function init(props){this._super(props);this.addChildren([this.widget]);},close:function close(){this.set("visible",false);if(this.widget.hasRendered){this.widget.unrender();}this.removeChildren(this.widget);this._super();},onpopupResized:function onpopupResized(e){if(this.widget.onpopupResized){this.widget.onpopupResized(e);}},onkeyup:function onkeyup(evt){var hWin=evt.hWin,e=evt.e||hWin.event;if(this.widget.applyOnEnter&&e.keyCode===13){this.onApply();}else{if(e.keyCode===27){this.onCancel();}}},onApply:function(){return this.widget.applyChanges();},onCancel:function(){this.widget.cancelChanges();},enableApply:mstrmojo.emptyFn});}());