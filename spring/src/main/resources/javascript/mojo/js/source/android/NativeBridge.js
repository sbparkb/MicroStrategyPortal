(function(){mstrmojo.android.NativeBridge=mstrmojo.declare(null,null,{scriptClass:"mstrmojo.android.NativeBridge",selectNavItem:function selectNavItem(params){var queryKey=params.queryKey,item={act:parseInt(queryKey.act,10),fromNav:queryKey.fromNav==="true",n:queryKey.n};mstrApp.rootController.jumpTo(item);},selectLastOpenedDoc:function selectLastOpenedDoc(params){var queryKey=params.queryKey,item={renderIdx:parseInt(queryKey.renderIdx,10),did:queryKey.did,n:queryKey.n,projectID:queryKey.projectID,st:parseInt(queryKey.st,10),ttl:queryKey.ttl,xId:queryKey.xId,hsc:queryKey.hsc==="true"};mstrApp.rootController.jumpTo(item);},goUp:function goUp(){mstrApp.closeAllDialogs();mstrApp.rootController.goUp();}});}());