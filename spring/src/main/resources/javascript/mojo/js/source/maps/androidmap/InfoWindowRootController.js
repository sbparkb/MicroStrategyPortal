(function(){mstrmojo.requiresCls("mstrmojo.Obj","mstrmojo.maps.androidmap.DocInfoWindowController");function startController(params){}mstrmojo.maps.androidmap.InfoWindowRootController=mstrmojo.declare(mstrmojo.Obj,null,{scriptClass:"mstrmojo.maps.androidmap.InfoWindowRootController",start:function start(params){this.spawn(new mstrmojo.maps.androidmap.DocInfoWindowController(params),params);},spawn:function spawn(controller,startParams){this.nextController=controller;controller.prevController=this;controller.start(startParams);},destroy:function destroy(){this.nextController.destroy();this._super();}});})();