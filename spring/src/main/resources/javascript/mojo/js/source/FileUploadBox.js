(function(){mstrmojo.requiresCls("mstrmojo.Widget");mstrmojo.FileUploadBox=mstrmojo.declare(mstrmojo.Widget,null,{scriptClass:"mstrmojo.FileUploadBox",value:"",params:null,action:"taskProc",uploadTaskId:"uploadFile",browseLabel:"Browse...",fileFieldName:"myfile",multiple:"",status:"init",jsonp:"parent.mstrmojo.all.{@id}.uploadCallback(@R@)",enabled:true,markupString:'<div id={@id} class="mstrmojo-FileUploadBox {@cssClass}" style="{@cssText}"><form class="mstrmojo-FileUploadBox-form" target="{@id}_iframe" enctype="multipart/form-data" method="post" action="{@action}"><input class="mstrmojo-FileUploadBox-input" readonly="readonly" type="text" size="30"/><div class="mstrmojo-FileUploadBox-buttonDiv"><div class="mstrmojo-FileUploadBox-button">{@browseLabel}</div><input class="mstrmojo-FileUploadBox-file" type="file" {@multiple} size="30" style="font-size:4em;" name="{@fileFieldName}" onchange="mstrmojo.all.{@id}.synValue();"/></div><div style="display:none;"></div></form><iframe id="{@id}_iframe" + name="{@id}_iframe" style="display:none;" src="about:blank"></iframe></div>',markupSlots:{formNode:function(){return this.domNode.firstChild;},inputNode:function(){return this.domNode.firstChild.firstChild;},buttonNode:function(){return this.domNode.firstChild.childNodes[1].firstChild;},fileNode:function(){return this.domNode.firstChild.childNodes[1].lastChild;},paramsNode:function(){return this.domNode.firstChild.lastChild;}},markupMethods:{onenabledChange:function(){mstrmojo.css.toggleClass(this.domNode,"disabled",!this.enabled);this.fileNode.style.display=this.enabled?"block":"none";},onvisibleChange:mstrmojo.Widget.visibleMarkupMethod,onstatusChange:function(){if(this.status==="init"){this.inputNode.value="";this.fileNode.value="";this.paramsNode.innerHTML="";}},onvalueChange:function(){this.inputNode.value=this.value;}},uploadCallback:function(d){var success=(d.status==200);this.set("status",success?"successful":"failed");if(success&&this.onSuccess){this.onSuccess(d);}if(!success&&this.onFailed){this.onFailed(d);}},synValue:function(){var v=this.fileNode.value,a=v.split(/[\/\\]/);v=a[a.length-1];this.set("value",v);},submit:function(ps,callbacks){var r=true;if(this.onsubmit){r=this.onsubmit();}if(r){ps=ps||{};ps.fileFieldName=this.fileFieldName;ps.taskEnv="jsonp2";ps.taskId=this.uploadTaskId;ps.jsonp=this.jsonp.replace("{@id}",this.id);var h=[],p;for(p in ps){h.push('<input type="hidden" name="'+p+'" value="'+mstrmojo.string.encodeHtmlString(ps[p])+'"/>');}if(this.params){ps=this.params;for(p in ps){h.push('<input type="hidden" name="'+p+'" value="'+mstrmojo.string.encodeHtmlString(ps[p])+'"/>');}}this.paramsNode.innerHTML=h.join("");if(callbacks){this.onSuccess=callbacks.success;this.onFailed=callbacks.failure;}this.formNode.submit();this.set("status","loading");}},reset:function(){this.set("status","init");}});})();