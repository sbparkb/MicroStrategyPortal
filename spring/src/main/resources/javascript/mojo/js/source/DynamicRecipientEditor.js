(function(){mstrmojo.requiresCls("mstrmojo.hash","mstrmojo.expr","mstrmojo.string","mstrmojo.WaitIcon","mstrmojo.Pulldown","mstrmojo.Button","mstrmojo.ValidationTextBox","mstrmojo.array");mstrmojo.requiresDescs(9145,9147,9082,9083,7209,9094,4446,1226,7564,9084,6247,527,9085,5951,9086,2327,9087,9088,9089,9090,1157,118,2399,9091,9146,9092,9093,1442);var _H=mstrmojo.hash,_A=mstrmojo.array,_E=mstrmojo.expr,_S=mstrmojo.string,_B=mstrmojo.Button,_DS=mstrmojo.DynamicRecipientListDataService,_ONGRID=3,_INPAGEBY=4;var btnClr="#999",btnCls="mstrmojo-Editor-button";var getCategoryName=function(text,config){return _H.copy(config,{scriptClass:"mstrmojo.Label",text:text,cssClass:"drl-ctgry"});},getAttrFormListItems=function(attrs){var itms=[],idx=0;if(!attrs||attrs.length==0){itms=[{fid:-1,fn:_S.encodeHtmlString("<"+mstrmojo.desc(9145)+">")}];}else{for(var i=0;attrs&&i<attrs.length;i++){var attr=attrs[i],fl=attr.fms;for(var j=0;fl&&j<fl.length;j++){var f=fl[j],it={fid:attr.did+"_"+f.did,fn:attr.n+"("+f.n+")",attr_id:attr.did,attr_n:attr.n,form_id:f.did,form_n:f.n};itms.push(it);}}}return itms;},getPropsPulldown=function(propName,config,optional){var edtrStr="this.parent.parent.parent";return _H.copy(config,{scriptClass:"mstrmojo.Pulldown",propName:propName,optional:!!optional,bindings:{model:edtrStr+".model",_items:edtrStr+".attrList",enabled:"!"+edtrStr+".wait"},itemIdField:"fid",itemField:"fn",_set__items:function(n,v){var items=v?v.concat():getAttrFormListItems(),m=null,noForms=items&&items.length==1&&items[0].fid==-1;if(this.model&&this.propName&&this.model.dmf){m=this.model.dmf[this.propName];}if(this.optional&&v){items=mstrmojo.array.insert(items,0,[{fid:-1,fn:"--"+mstrmojo.desc(9147)+"--"}]);}this._items=items;this.set("items",items);this.set("value",noForms?-1:(m?m.attr_id+"_"+m.form_id:(this.optional?0:items[0].fid)));return true;},_set_value:function(n,v){this.value=v;var m=this.model,prn=this.propName,itms=this.items;if(m&&prn&&itms&&v){m.dmf=m.dmf||{};if(v.constructor===String){var va=v.split("_");m.dmf[prn]={attr_id:va[0],form_id:va[1]};}else{delete m.dmf[prn];}}return true;},itemName:function itemName(item,idx,w){return item[w.itemField];}});},makeHashable=function(jsonObj,properties){if(jsonObj===null){return ;}else{if(properties===undefined){_H.make(jsonObj,mstrmojo.Obj);}else{for(var i=0,len=properties.length;i<len;i++){var p=properties[i];if(p in jsonObj){_H.make(jsonObj[p],mstrmojo.Obj);}}}}};function updateButtonBar(w){var m=w.model,props=["n","cntn"],requiredProps=["phyaddr","uid","dev"],valid=true,txt="";if(m){_A.forEach(props,function(c){if(_S.isEmpty(m[c])){valid=false;}});_A.forEach(requiredProps,function(prop){if(!m.dmf||!m.dmf.hasOwnProperty(prop)){valid=false;return false;}});if(w.bbar){w.bbar.btnOk.set("enabled",valid);}}}mstrmojo.DynamicRecipientEditor=mstrmojo.declare(mstrmojo.Editor,null,{scriptClass:"mstrmojo.DynamicRecipientEditor",cssClass:"mstrmojo-DRLEditor",title:mstrmojo.desc(9082,"Create a New Dynamic Address List"),openEffect:mstrmojo.Editor.openEffect_fadeIn,closeEffect:mstrmojo.Editor.closeEffect_fadeOut,help:"Create_a_new_dynamic_recipient_list_dialog_box.htm",_set_model:function(n,v){this.set("attrList",null);this.set("statusText","");if(v&&v.cntid){this.set("wait",true);var me=this;_DS.browseAttributeForms({cntid:v.cntid},{success:function(res){me.set("attrList",getAttrFormListItems(res&&res.attrs));me.set("wait",false);},failure:function(res){res&&me.set("statusText",res.getResponseHeader("X-MSTR-TaskFailureMsg"));me.set("wait",false);}});}else{v={n:mstrmojo.desc(9083,"New Dynamic Address List")};}if(!v.attachEventListener){makeHashable(v);}this.model=v;return true;},onOpen:function(){updateButtonBar(this);},onOK:function(btn){var m=this.model,me=this;var params={did:m&&m.did,n:m&&m.n,drlXml:_DS.obj2Xml(m,"drl")},callbacks={success:function(res){btn.set("enabled",true);me.close();mstrmojo.all.prefDRL.refreshData();},failure:function(res){var ec=parseInt(res.getResponseHeader("X-MSTR-TaskErrorCode"),10)+4294967296;if(res){if(ec==2147894775){me.set("statusText",mstrmojo.desc(7209,"Name already exists."));}else{me.set("statusText",res.getResponseHeader("X-MSTR-TaskFailureMsg"));}}btn.set("enabled",true);}};_DS.saveDynamicRecipientList(params,callbacks);},children:[{scriptClass:"mstrmojo.Table",cssClass:"drl-content",layout:[{cells:[{cssText:"width:30%;height:40px"},{}]},{cells:[{cssText:"height:30px"},{}]},{cells:[{cssText:"height:30px"},{}]},{cells:[{cssText:"height:225px"},{}]},{cells:[{colSpan:2}]}],children:[getCategoryName(mstrmojo.desc(9094,"Dynamic Address List Name")+":",{slot:"0,0",cssText:"margin-top:10px"}),{scriptClass:"mstrmojo.ValidationTextBox",slot:"0,1",cssText:"margin-top:10px;width:300px",required:true,bindings:{value:"this.parent.parent.model.n"},dtp:mstrmojo.expr.DTP.CHAR,constraints:{trigger:mstrmojo.validation.TRIGGER.ALL},onValid:function(){var dre=this.parent.parent,m=dre.model;if(m){m.n=this.value;}updateButtonBar(dre);},onInvalid:function(){var dre=this.parent.parent,m=dre.model;if(m){delete m.n;}updateButtonBar(dre);}},getCategoryName(mstrmojo.desc(4446,"Project:"),{slot:"1,0"}),{scriptClass:"mstrmojo.Label",slot:"1,1",bindings:{text:function(){var m=this.parent.parent.model;if(m!=null&&m.pn!=null){return m.pn;}return mstrApp.projectName;}}},getCategoryName(mstrmojo.desc(1226,"Report:")+" ",{slot:"2,0"}),{scriptClass:"mstrmojo.HBox",slot:"2,1",children:[{scriptClass:"mstrmojo.Label",alias:"rptIcon"},{scriptClass:"mstrmojo.Label",bindings:{text:function(){return mstrmojo.string.htmlAngles(this.parent.parent.parent.model.cntn);}},ontextChange:function(){var icon=this.parent.rptIcon;if(icon&&icon.hasRendered){mstrmojo.css[this.text?"addClass":"removeClass"](icon.domNode,["mstrmojo-ListIcon","t3"]);}else{icon.set("cssClass",this.text?"mstrmojo-ListIcon t3":"");}}},{scriptClass:"mstrmojo.Button",text:mstrmojo.desc(7564,"Select..."),cssText:"text-decoration:underline;margin-left:20px",onclick:function(){var me=this.parent.parent.parent;me.openPopup("selectReportRef",{zIndex:me.zIndex+10,model:me.model});var ob=me.selectReportRef.browser;ob.browse({folderLinksContextId:14,onSelectCB:[me.selectReportRef,"onReportSelect"],browsableTypes:[_E.TP.FOLDER,_E.TP.REPORT].join(",")});}}]},getCategoryName(mstrmojo.desc(9084,"Subscription Mappings")+": ",{slot:"3,0"}),{scriptClass:"mstrmojo.Table",cssClass:"drl-subs",slot:"3,1",layout:[{cells:[{cssText:"width:40%",cssClass:"subs-title"},{cssClass:"subs-title"}]},{cells:[{colSpan:2,cssClass:"subs-bar"}]},{cells:[{},{}]},{cells:[{},{}]},{cells:[{},{}]},{cells:[{colSpan:2,cssClass:"subs-bar"}]},{cells:[{},{}]},{cells:[{},{}]},{cells:[{},{}]},{cells:[{},{}]}],children:[getCategoryName(mstrmojo.desc(6247,"Property"),{slot:"0,0",cssClass:"drl-title"}),getCategoryName(mstrmojo.desc(527,"Value"),{slot:"0,1",cssClass:"drl-title"}),getCategoryName(mstrmojo.desc(9085,"Required Property"),{slot:"1,0",cssClass:"drl-title"}),getCategoryName(mstrmojo.desc(5951,"Physical Address"),{slot:"2,0",cssClass:"drl-cat"}),getPropsPulldown("phyaddr",{slot:"2,1"}),getCategoryName(mstrmojo.desc(9086,"Linked User ID"),{slot:"3,0",cssClass:"drl-cat"}),getPropsPulldown("uid",{slot:"3,1"}),getCategoryName(mstrmojo.desc(2327,"Device"),{slot:"4,0",cssClass:"drl-cat"}),getPropsPulldown("dev",{slot:"4,1"}),getCategoryName(mstrmojo.desc(9087,"Optional Property"),{slot:"5,0",cssClass:"drl-title"}),getCategoryName(mstrmojo.desc(9088,"Recipient Name"),{slot:"6,0",cssClass:"drl-cat"}),getPropsPulldown("rn",{slot:"6,1"},true),getCategoryName(mstrmojo.desc(9089,"Notification Address"),{slot:"7,0",cssClass:"drl-cat"}),getPropsPulldown("na",{slot:"7,1"},true),getCategoryName(mstrmojo.desc(9090,"Notification Device"),{slot:"8,0",cssClass:"drl-cat"}),getPropsPulldown("nd",{slot:"8,1"},true),getCategoryName(mstrmojo.desc(1157,"Personalization"),{slot:"9,0",cssClass:"drl-cat"}),getPropsPulldown("pa",{slot:"9,1"},true)]},{scriptClass:"mstrmojo.Box",slot:"4,0",cssClass:"drl-status",bindings:{visible:"!!this.parent.parent.statusText"},children:[{scriptClass:"mstrmojo.Label",cssText:"margin:0px 10px;float:right",bindings:{text:"this.parent.parent.parent.statusText"}}]}]},{scriptClass:"mstrmojo.HBox",cssClass:"mstrmojo-Editor-buttonBar",slot:"buttonNode",alias:"bbar",children:[new _B.newInteractiveButton(mstrmojo.desc(118),function(){this.set("enabled",false);this.parent.parent.onOK(this);},btnClr,{alias:"btnOk",enabled:false,cssClass:btnCls}),new _B.newInteractiveButton(mstrmojo.desc(2399),function(){this.parent.parent.close();},btnClr,{alias:"btnCancel",cssClass:btnCls})]}],selectReportRef:{scriptClass:"mstrmojo.Editor",cssClass:"SREditor",cssText:"width:310px",title:mstrmojo.desc(9091,"Select Report"),help:"Select_report_dialog_box.htm",locksHover:true,bindings:{selectedReport:function(){var m=this.model;return{cntid:m.cntid,cntn:m.cntn,pn:m.pn,pid:m.pid};}},onReportSelect:function(item){this.set("selectedReport",{cntid:item.did,cntn:item.n,pn:mstrApp.projectName,pid:mstrApp.projectID});},contentType:_ONGRID,onOK:function(){var p=this.model,sr=this.selectedReport;if(p&&sr){if(p.cntid==sr.cntid){this.close();return ;}p.set("cntn",sr.cntn);_H.copy(sr,p);if(p.dmf){delete p.dmf;}}var me=this,drlEditor=this.opener;_DS.browseAttributeForms({cntid:sr.cntid,contentType:this.contentType},{success:function(res){me.close();if(res){drlEditor.set("attrList",getAttrFormListItems(res.attrs));}updateButtonBar(drlEditor);},failure:function(res){res&&me.set("statusText",res.getResponseHeader("X-MSTR-TaskFailureMsg"));updateButtonBar(drlEditor);}});},children:[{scriptClass:"mstrmojo.ObjectBrowser",alias:"browser",fishEyeVisible:false,closeable:false,closeOnSelect:false},{scriptClass:"mstrmojo.HBox",children:[getCategoryName(mstrmojo.desc(9146)+":"),{scriptClass:"mstrmojo.Pulldown",items:[{n:mstrmojo.desc(9092,"on the Grid"),dssid:_ONGRID},{n:mstrmojo.desc(9093,"in the Page By"),dssid:_INPAGEBY}],onvalueChange:function(){this.parent.parent.contentType=this.value;}}]},{scriptClass:"mstrmojo.HBox",cssClass:"mstrmojo-Editor-buttonBar",slot:"buttonNode",children:[new _B.newInteractiveButton(mstrmojo.desc(1442),function(){this.parent.parent.onOK();},btnClr,{alias:"btnOk",cssClass:btnCls}),new _B.newInteractiveButton(mstrmojo.desc(2399),function(){this.parent.parent.close();},btnClr,{alias:"btnCancel",cssClass:btnCls})]}]}});})();