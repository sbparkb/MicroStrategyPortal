(function(){mstrmojo.requiresCls("mstrmojo.android.controllers.ViewController","mstrmojo.date","mstrmojo.locales","mstrmojo.hash");mstrmojo.requiresDescs(8391,8392);function getCachedTime(item){var subtype=item.st;if(subtype===2048||subtype==="Project"){return undefined;}var ct=mstrMobileApp.getCachedTime(item.sub_id||item.did,(item.sub_id)?-1:subtype,item.projectID||item.pid||""),dtString;if(ct>0){var $date=mstrmojo.date,$l=mstrmojo.locales.datetime,dateInfo=$date.getDateJson(new Date(parseInt(ct,10)));dtString=$date.formatDateInfo(dateInfo,$l.DATEOUTPUTFORMAT)+" "+$date.formatTimeInfo(dateInfo,$l.TIMEOUTPUTFORMAT);}return mstrmojo.desc(8391,"Cached On:")+" "+(dtString||mstrmojo.desc(8392,"Not available"));}function updateView(params){var item=params.item;if(item){params=mstrmojo.hash.copy(params,{desc:item.desc||"",ttl:item.n||item.ttl||"",cached:getCachedTime(item),did:item.did,st:item.st});}this.view.updateView(params);}mstrmojo.android.controllers.PropertiesController=mstrmojo.declare(mstrmojo.android.controllers.ViewController,null,{scriptClass:"mstrmojo.android.controllers.PropertiesController",doNotRefresh:true,start:function start(params){this._super(params);var view=this.view=mstrApp.viewFactory.newView("Properties",{controller:this});this.rootCtrl.updateProperties(view,"Properties");updateView.call(this,params);},updateItemProperties:function updateItemProperties(defaultMsg,item,ctrlId,isAvail){updateView.call(this,{defaultMsg:defaultMsg,item:item,ctrlId:ctrlId,avail:isAvail});},extractView:function extractView(){var view=this.view;view.parent.removeChildren(view);view.unrender();return view;},afterViewVisible:function afterViewVisible(){this.view.afterViewVisible();this._super();},restoreView:function restoreView(view){view.unrender();this.rootCtrl.updateProperties(view);},makeCurrent:function makeCurrent(isBack){this._super(isBack);this.rootCtrl.updateProperties(this.view,"Properties");},goUp:function goUp(){if(!this._super()){this.rootCtrl.goBack();}return true;}});}());