(function(){mstrmojo.requiresCls("mstrmojo.qb.RootController","mstrmojo.warehouse.WHController");mstrmojo.qb.EmmaController=mstrmojo.declare(mstrmojo.qb.RootController,null,{commit:function commit(callback){var model=this.model,statement,automapCallback={success:function success(){model.buildRelations(callback);}};if(model.FFSQLMode){model.autoMapFFSQL(mstrApp.getRootController().rootView.getSQLStatement(),automapCallback);}else{model.autoMap(automapCallback);}}});}());