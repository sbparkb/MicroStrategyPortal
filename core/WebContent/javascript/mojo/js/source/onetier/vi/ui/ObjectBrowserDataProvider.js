(function(){mstrmojo.requiresCls("mstrmojo.ObjectBrowserDataProvider","mstrmojo.onetier.vi.prefs.DesktopConnectivityProxyBase","mstrmojo.func");var $ERROR=mstrmojo.onetier.vi.prefs.handleErrorMessage,$FUNC=mstrmojo.func;mstrmojo.onetier.vi.ui.ObjectBrowserDataProvider=mstrmojo.declare(mstrmojo.ObjectBrowserDataProvider,null,{scriptClass:"mstrmojo.onetier.vi.ui.ObjectBrowserDataProvider",connectivityProxy:undefined,onSessionExpired:function(res,preRequest){var dp=this;mstrmojo.onetier.vi.ui.LoginToProjectBox.openDialog({label:"",validateConnectedServer:true,docModel:mstrApp.rootCtrl.docCtrl.model},null,{success:function(response){dp.sessionState=response.sessionState;dp.connectionId=response.connectionId;dp.serverRequest(preRequest.params,preRequest.callback,preRequest.config);}});$ERROR(res);},serverRequest:function(params,callback,showWait){if(this.connectionId){params.connectionId=this.connectionId;}if(this.sessionState){params.sessionState=this.sessionState;}var me=this;this.connectivityProxy.sendWebServerRequest(params,$FUNC.override({failure:function(res,request){if(mstrApp.isSessionExpiredError(res.taskErrorCode)&&me.onSessionExpired){me.onSessionExpired(res,request);}else{this._super(res);}}},callback),{silent:!showWait});},loadObjects:function loadObjects(objs,callback,showWait){this.serverRequest({taskId:"loadObjects",objs:objs},callback,showWait);},newFolder:function(fid,n,d,cb){cb=$FUNC.override({failure:function(res){$ERROR(res);this._super();}},cb);this._super(fid,n,d,cb);}});}());