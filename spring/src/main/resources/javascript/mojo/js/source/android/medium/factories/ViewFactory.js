(function(){mstrmojo.requiresCls("mstrmojo.android.factories.ViewFactory","mstrmojo.android.medium.ui.ActionBar","mstrmojo.android.medium.ui.ResultSetView","mstrmojo.android.medium.ui.nativebar.ResultSetView","mstrmojo.android.medium.ui.HomeScreenView","mstrmojo.android.medium.ui.TransactionView","mstrmojo.android.medium.ui.TxEditDoc","mstrmojo.android.medium.ui.TxTypeList","mstrmojo.android.medium.ui.CalendarDialog");mstrmojo.android.medium.factories.ViewFactory=mstrmojo.declare(mstrmojo.android.factories.ViewFactory,null,{scriptClass:"mstrmojo.android.medium.factories.ViewFactory",newActionBarView:function newActionBarView(params){return new mstrmojo.android.medium.ui.ActionBar(params);},newResultSetView:function newResultSetView(params){return mstrApp.isActionBarNative()?new mstrmojo.android.medium.ui.nativebar.ResultSetView(params):new mstrmojo.android.medium.ui.ResultSetView(params);},newHomeScreenView:function newHomeScreenView(params){return new mstrmojo.android.medium.ui.HomeScreenView(params);},newTransactionsView:function newTransactionsView(params){return new mstrmojo.android.medium.ui.TransactionView(params);},newTransactionsEditDocView:function newTransactionsEditDocView(params){return new mstrmojo.android.medium.ui.TxEditDoc(params);},newTransactionsTypeListView:function newTransactionsTypeListView(params){return new mstrmojo.android.medium.ui.TxTypeList(params);},newCalendarDialogView:function newCalendarDialogView(params){return new mstrmojo.android.medium.ui.CalendarDialog(params);}});}());