(function(){mstrmojo.requiresCls("mstrmojo.registry","mstrmojo.iPhoneDoc","mstrmojo.iPhoneDocBuilder","mstrmojo.iPhoneDocDataService","mstrmojo.DocModel");function submitDataRequest(params){mstrApp.serverRequest(params);}function _cleanup(){var a=mstrmojo.all,i;for(i in a){if(a.hasOwnProperty(i)){mstrmojo.registry.remove(a[i]);}}}var docLayout="iRoot";var docProxy={data:null,controller:null,render:function(imgCache){var doc=new mstrmojo.iPhoneDoc({id:docLayout,placeholder:docLayout,controller:this.controller,renderMode:null});doc.builder=new mstrmojo.iPhoneDocBuilder({parent:doc});if(!this.error){var docModel=doc.model=new mstrmojo.DocModel(this.data);docModel.controller=this.controller;docModel.dataService=new mstrmojo.iPhoneDocDataService({rwb:docModel.bs,msgId:docModel.mid,imgCache:imgCache});doc.buildChildren();}doc.render();window.setTimeout(function(){var keys=[],urls=[],key,unc=imgCache.unCachedImg;if(unc){for(key in unc){if(unc.hasOwnProperty(key)){keys.push(key);urls.push(unc[key]);}}if(keys.length>0){submitDataRequest({cmd:"cim",imgs:urls.join(",,,"),imgKeys:keys.join(",,,")});}}},100);},destroy:function(){var w=mstrmojo.all[docLayout];if(w){var d=w.domNode,c=d.lastChild,length=d.childNodes.length,i;for(i=0;i<length;i++){d.removeChild(d.lastChild);}}_cleanup();},adjustSize:function(){var xt=mstrmojo.all[docLayout];xt&&xt.monitorWindow();}};function getDocProxy(controller,data){docProxy.controller=controller;docProxy.data=data;return docProxy;}mstrmojo.iPhoneDocController=mstrmojo.declare(null,null,{scriptClass:"mstrmojo.iPhoneDocController",init:function init(){},setData:function(data){this.data=data;},getProxy:function(data){return getDocProxy(this,data);},onDrill:function(view,params){submitDataRequest(params);},onLink:function(view,params){if(params.link){params.linkAnswers=link.toXml();delete params.link;}params.cmd="lnk";submitDataRequest(params);}});})();