(function(){mstrmojo.requiresCls("mstrmojo.android.nativedialog.ListDialog");var $CHOICE_MODES=mstrmojo.android.nativedialog.ListDialog.CHOICE_MODES;mstrmojo.android.nativedialog.TwoLevelPageByDialog=mstrmojo.declare(mstrmojo.android.nativedialog.ListDialog,null,{scriptClass:"mstrmojo.android.nativedialog.TwoLevelPageByDialog",type:2,choiceMode:$CHOICE_MODES.NONE,update:function update(newItems){this.config.items=newItems;mstrMobileApp.updateDialog(JSON.stringify(this.config));},getItem:function getItem(idx1,idx2){return this.config.items[idx1].items[idx2];}});}());