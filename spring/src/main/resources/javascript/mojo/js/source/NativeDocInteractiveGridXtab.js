(function(){mstrmojo.requiresCls("mstrmojo.DocInteractiveGridXtab","mstrmojo._VisSelectionAndLinkDrillHelper","mstrmojo._CanSupportTransaction","mstrmojo._IsAndroidEditableXtab");mstrmojo.NativeDocInteractiveGridXtab=mstrmojo.declare(mstrmojo.DocInteractiveGridXtab,[mstrmojo._VisSelectionAndLinkDrillHelper],{scripClass:"NativeDocInteractiveGridXtab",render:function rnd(){mstrMobileTransport.beforeRenderStart();try{if(this._super){this._super();}}catch(e){throw e;}finally{mstrMobileTransport.onRenderComplete();}},handleAction:function handleAction(action,cell){var handler=action&&action.h;if(handler&&this[handler]){this[handler](action.a,cell);return true;}return false;},getModelK:function getModelK(){var k=this.k;return k;}});})();