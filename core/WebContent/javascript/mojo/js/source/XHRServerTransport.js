(function(){var xhrPool={};var CLASS_NAME="XHRServerTransport";mstrmojo.XHRServerTransport={serverRequest:function serverRequest(id,requestId,request){var proxy=mstrmojo.all[id],xhr=xhrPool[requestId]=new mstrmojo.SimpleXHR();$MAPF(true,CLASS_NAME,"transportRequest");if(request.params&&!request.params.sessionState&&mstrConfig&&mstrConfig.isAddSessionState&&mstrApp&&mstrApp.sessionState){request.params.sessionState=mstrApp.sessionState;}xhr.request(request.config.method||"POST",request.taskURL||mstrConfig.taskURL,{success:function(res){if(res.mstrerr){res.code=res.mstrerr.code;res.message=res.mstrerr.message;}proxy.response(requestId,true,res);},failure:function(res){proxy.response(requestId,false,{code:res.getResponseHeader("X-MSTR-TaskErrorCode"),message:res.getResponseHeader("X-MSTR-TaskFailureMsg")});},complete:function(){delete xhrPool[requestId];},textResponse:request.callback.textResponse},request.params);},cancelRequest:function cancelRequest(requestId){var xhr=xhrPool[requestId],didCancel=false;if(xhr){didCancel=xhr.cancel();delete xhrPool[requestId];}$MAPF(false,CLASS_NAME,"transportRequest");return didCancel;}};}());