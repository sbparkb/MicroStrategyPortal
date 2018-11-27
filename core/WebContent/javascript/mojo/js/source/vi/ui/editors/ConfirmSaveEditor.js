(function(){mstrmojo.requiresCls("mstrmojo.Editor");mstrmojo.vi.ui.editors.ConfirmSaveEditor=mstrmojo.declare(mstrmojo.Editor,null,{scriptClass:"mstrmojo.vi.ui.editors.ConfirmSaveEditor",cssClass:"mstrmojo-ConfirmSave-Editor",title:mstrmojo.desc(11812,"Notification"),help:null,children:[{scriptClass:"mstrmojo.HBox",cssClass:"mstrmojo-Warning-Box",children:[{scriptClass:"mstrmojo.Box",cssClass:"icon"},{scriptClass:"mstrmojo.Label",text:mstrmojo.desc(12854,"Do you want to save your dashboard before continuing?"),cssClass:"message"}]},{scriptClass:"mstrmojo.HBox",slot:"buttonNode",cssClass:"mstrmojo-Editor-buttonBar",children:[{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-WebButton nosave",text:mstrmojo.desc(11814,"Don't Save"),onclick:function(){this.editor.onDonotSave();},bindings:{editor:"this.parent.parent"}},{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-WebButton hot",text:mstrmojo.desc(118,"Save"),onclick:function(){this.editor.onSave();},bindings:{editor:"this.parent.parent"}},{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-WebButton",text:mstrmojo.desc(221,"Cancel"),onclick:function(){this.editor.onCancel();},bindings:{editor:"this.parent.parent"}}]}],onSave:mstrmojo.emptyFn,onDonotSave:mstrmojo.emptyFn,onCancel:mstrmojo.emptyFn});}());