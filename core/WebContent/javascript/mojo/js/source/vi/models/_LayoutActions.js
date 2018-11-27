(function(){mstrmojo.requiresCls("mstrmojo.DocDataService");var $MOJO=mstrmojo,$FUNC=$MOJO.func,$ARR=$MOJO.array,REQUEST_DEFN_DATA=$MOJO.DocDataService.REQUEST_DEFN_DATA,$ERR=$MOJO.mstr.EnumWebAPIErrorCodes;mstrmojo.vi.models._LayoutActions=mstrmojo.provide("mstrmojo.vi.models._LayoutActions",{_mixinName:"mstrmojo.vi.models._LayoutActions",addNewLayout:function addNewLayout(update,params,callback){var me=this,action={act:"addLayout",nodeKey:params.nodeKey,newPanelKey:params.newPanelKey,analysisSectionType:params.analysisSectionType,index:params.index,disablePU:true};update.add(action,$FUNC.wrapMethods({success:function(res){me.replaceLayout(action.nodeKey,res,true);me.mapLayKeys={newKey:action.nodeKey};}},callback),REQUEST_DEFN_DATA);},addExistingLayouts:function addExistingLayouts(update,params,callback){var me=this,undoErrors=[$ERR.E_UNUSED],action={act:"importDashboard",newPanelKey:params.newPanelKey,analysisSectionType:params.analysisSectionType,index:params.index,disablePU:true};update.extras.skipUICmdMgrOnFailure=undoErrors;update.extras.config={hideFailureErr:true};update.add(action,$FUNC.wrapMethods({success:function(res){if(me.resetKeySeed){me.resetKeySeed(res.keySeed);}me.updateLayouts(res);},failure:function(response,request){var fn=function(){me.controller.undo();};mstrmojo.error({longDesc:response.message},fn,{onClose:fn,title:"Error"});}},me.controller.getUpdateLayoutsCallback()),REQUEST_DEFN_DATA);},duplicateLayout:function(update,params,callback){var me=this,actions={act:"duplLayout",srcKey:params.srcKey,destKey:params.destKey,name:params.name,index:params.index,disablePU:true};update.add(actions,$FUNC.wrapMethods({success:function(res){me.replaceLayout(actions.destKey,res,true);me.mapLayKeys={oldKey:actions.srcKey,newKey:actions.destKey};var lyts=me.getLayoutDefn(actions.srcKey),newLyt=(res.defn&&res.defn.layouts||[]).filter(function(lyt){return lyt.k===actions.srcKey;})[0],i;for(i in lyts.units){var oldUnit=lyts.units[i],newUnit=newLyt&&newLyt.units[i];oldUnit.pnk=newUnit?newUnit.pnk:oldUnit.pnk;oldUnit.chdidx=newUnit?newUnit.chdidx:-1;}}},callback),REQUEST_DEFN_DATA);},moveLayout:function moveLayout(fromIdx,toIdx){var defnLayouts=this.defn.layouts,dataLayouts=this.data.layouts,layoutNodes=[defnLayouts,dataLayouts];layoutNodes.forEach(function(nodes){nodes.splice(toIdx,0,nodes.splice(fromIdx,1)[0]);});},getMoveLayoutAction:function getMoveLayoutAction(fromIdx,toIdx){return this.getDataService().getMoveNodeAction(this.data.layouts[fromIdx],this.defn.root.k,toIdx);},removeLayout:function removeLayout(key,callback,update){var model=this,defnLayouts=this.defn.layouts,dataLayouts=this.data.layouts,layoutIdx=$ARR.find(defnLayouts,"k",key);if(layoutIdx===-1){throw new Error("Layout with key "+key+" not found.");}update.add({act:"removeLayout",unitKey:key,isCurrent:key===model.currlaykey},$FUNC.wrapMethods({success:function(res){defnLayouts.splice(layoutIdx,1);dataLayouts.splice(layoutIdx,1);var targetLayoutOldData=dataLayouts[$ARR.find(dataLayouts,"k",res.currlaykey)];if(!targetLayoutOldData||!targetLayoutOldData.loaded){model.replaceLayout(res.currlaykey,res,true);}}},callback));},renameLayout:function renameLayout(key,title,oldTitle,callback){this.updateTitle(title,oldTitle,key,key,"title",callback);},updateLayouts:function updateLayouts(node){var me=this,isDefnChanged=false,origDefnLyts=(me.defn&&me.defn.layouts)||[],origDataLyts=(me.data&&me.data.layouts)||[],defnLayouts=(node.defn&&node.defn.layouts)||[],dataLayouts=(node.data&&node.data.layouts)||[],tmpDefnNodes=[],tmpDataNodes=[];defnLayouts.forEach(function(lyt){var idx=mstrmojo.array.find(origDefnLyts,"k",lyt.k);if(idx>=0&&!lyt.loaded){tmpDefnNodes.push(origDefnLyts[idx]);}else{tmpDefnNodes.push(lyt);}});dataLayouts.forEach(function(lyt){var idx=mstrmojo.array.find(origDataLyts,"k",lyt.k);if(idx>=0&&!lyt.loaded){tmpDataNodes.push(origDataLyts[idx]);}else{tmpDataNodes.push(lyt);}});if(me.defn){me.defn.layouts=tmpDefnNodes.length?tmpDefnNodes:origDefnLyts;}if(me.data){me.data.layouts=tmpDataNodes.length?tmpDataNodes:origDataLyts;}(dataLayouts||defnLayouts||[]).forEach(function(lyt){if(lyt.loaded){me.replaceLayout(lyt.k,node,true);isDefnChanged=true;}});if(!isDefnChanged){me.ondefnChange();}return defnLayouts.length!==0||dataLayouts.length!==0;}});}());