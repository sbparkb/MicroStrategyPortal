(function(){mstrmojo.requiresCls("mstrmojo.android.nativedialog.Dialog");mstrmojo.android.nativedialog.DatePickerDialog=mstrmojo.declare(mstrmojo.android.nativedialog.Dialog,null,{scriptClass:"mstrmojo.android.nativedialog.DatePickerDialog",type:7,populateConfig:function populateConfig(){this._super();var date=this.children[0].dtValue.date;this.config.year=date.year;this.config.month=date.month;this.config.day=date.day;}});}());