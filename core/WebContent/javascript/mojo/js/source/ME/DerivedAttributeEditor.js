(function(){mstrmojo.requiresCls("mstrmojo.array","mstrmojo.hash","mstrmojo.Editor","mstrmojo.ValidationTextBox","mstrmojo.ME.AttributeEditBox");mstrmojo.requiresDescs(2399,2400,11569,11617);var $DESC=mstrmojo.desc,$BTN=mstrmojo.Button.newWebButton;function _wait(btn,v){btn.set("enabled",!v);btn.set("iconClass",btn.iconClass.replace(/mstrmojo-InlineWaitIcon/,"")+" "+(v?"mstrmojo-InlineWaitIcon":""));}function _prepareDescFormCandidates(me){var cds={isComplete:true,items:[].concat(me.candidates.items)};cds.items.push({n:"This",did:"This",t:12});cds.items.push({n:"ID",did:"ID",attid:"This",attn:"This",fmdid:"ID",t:21});me.descCandidates=cds;}function _setupCandidatesCache(cds,tib){if(cds&&tib){tib.candidates=null;tib.set("candidates",cds);}}function _focusOnNameInputBox(me){if(me.oi&&me.oi.alias){return ;}me.tmr=window.setInterval(function(){if(me.visible&&me.domNode){window.clearInterval(me.tmr);delete me.tmr;me.nameEditBox.nameInput.inputNode.select();}},50);}mstrmojo.ME.DerivedAttributeEditor=mstrmojo.declare(mstrmojo.Editor,null,{scriptClass:"mstrmojo.ME.DerivedAttributeEditor",cssClass:"mstrmojo-DAEditor",zIndex:10,help:"derived_attribute_editor.htm",useKeyDelay:true,noCache:false,name:"New Attribute",init:function init(props){if(this._super){this._super(props);}_prepareDescFormCandidates(this);},getAttributeEditBox:function getAttrEditBox(){return this.attrEditBox;},getTokenInputBox:function getTokenInputBox(){return this.attrEditBox.inputBox;},onObjectInsert:function onObjectInsert(oi){this.getAttributeEditBox().onObjectInsert(oi);},onOpen:function onOpen(){var me=this,oi=this.oi,n=oi.alias||oi.n||"New Attribute",aeb=this.attrEditBox,tib=aeb.inputBox;_setupCandidatesCache(me.candidates,tib);tib.noCache=this.noCache;tib.useKeyDelay=this.useKeyDelay;this.set("title",$DESC(9559,"Formula Editor:")+" "+oi.n);this.set("name",n);this.set("nameLabel",oi&&oi.alias?$DESC(2326,"Display Name"):$DESC(11617,"Attribute Name"));if(oi&&oi.forms){aeb.set("attrid",oi.did);aeb.set("forms",oi.forms);aeb.selectFormTab(0);}aeb.set("cValid",oi&&oi.forms);_focusOnNameInputBox(this);},onClose:function onClose(){if(this._super){this._super();}this.clear();},handleValidation:function handleValidation(tks){this.attrEditBox.handleValidation(tks);},save:function save(){var editorId=this.parent.id,oi=this.oi,btn=this.buttonBar.saveBtn,aeb=this.attrEditBox,dsid=oi.dsid,daid=oi.did,params,saveCb=this.oncreate,updateCb=this.onupdate,nm=this.nameEditBox.nameInput.value,callback={success:function success(){_wait(btn,false);aeb.clear();var editor=mstrmojo.all[editorId];if(editor){editor.close();}}},savefn=function(forms){if(forms&&saveCb){var fms=[],i;for(i=0;i<forms.length;i++){fms.push({n:forms[i].n,formula:forms[i].tokenXML});}params={act:"addDAToDataset",dsid:dsid,name:nm,isTokenStream:true,forms:fms};saveCb(params,callback);}else{_wait(btn,false);}},updatefn=function(forms){if(forms&&updateCb){var toAdd=[],toDel=[],toUpdate=[],pfm,fm,i;for(i=0;i<forms.length;i++){pfm=forms[i];fm={n:pfm.n,formula:pfm.tokenXML};if(pfm.did){fm.did=pfm.did;toUpdate.push(fm);}else{toAdd.push(fm);}}for(i=0;aeb.delForms&&i<aeb.delForms.length;i++){pfm=aeb.delForms[i];toDel.push({n:pfm.n,did:pfm.did});}params={act:"updateDA",name:nm,dsid:dsid,attrId:daid,isTokenStream:true,add:toAdd,del:toDel,update:toUpdate};updateCb(params,callback);}else{_wait(btn,false);}};if(aeb.dirty||nm!==(oi.alias||oi.n)){_wait(btn,true);aeb.validateAllForms(!daid?savefn:updatefn);}else{callback.success();}},clear:function clear(){var aeb=this.attrEditBox;this.name=null;aeb.clear();},children:[{scriptClass:"mstrmojo.Box",alias:"nameEditBox",cssClass:"mstrmojo-ME-nameEditBox",cssDisplay:"inline-block",children:[{scriptClass:"mstrmojo.Label",cssClass:"mstrmojo-DA-nameLabel",bindings:{text:"this.parent.parent.nameLabel"}},{scriptClass:"mstrmojo.ValidationTextBox",alias:"nameInput",cssClass:"mstrmojo-ME-nameInput",size:20,tooltipOpenDelay:0,constraints:{trigger:mstrmojo.validation.TRIGGER.ALL,invalidCssClass:"mstrmojo-ME-invalidName"},prefocus:function(){if(this._super){this._super();}this.validate();},validate:function(v){v=v||this.value;var val=v&&!/[\[\]\"\\]/g.test(v);this.valid=null;this.set("valid",val);this.set("validationStatus",{code:val?0:1});return val;},showErrTooltip:function showTooltip(){var position=mstrmojo.dom.position(this.domNode),msg=mstrmojo.string.isEmpty(this.value)?mstrmojo.desc(9122,"Name cannot be empty"):mstrmojo.desc(11569,"Input contains invalid character");this.useRichTooltip=true;this.richTooltip={contentNodeCssClass:"me-tooltip-content left me-err",content:'<div class="content"><span>'+msg+"</span></div>",top:position.y-5,left:position.x+position.w+10};this.showTooltip();var me=this;window.setTimeout(function(){me.hideTooltip();},1500);},valid:true,onvalidChange:function(){if(this.valid){this.hideTooltip();}else{this.set("validationStatus",1);this.showErrTooltip();}mstrmojo.css.toggleClass(this.parent.domNode,"err",!this.valid);},bindings:{value:"this.parent.parent.name"}}]},{scriptClass:"mstrmojo.ME.AttributeEditBox",alias:"attrEditBox",browseItemVisible:false,cValid:false,ontabSwitch:function(e){var dae=this.parent;_setupCandidatesCache(e.nidx>0?dae.descCandidates:dae.candidates,this.inputBox);if(dae.parent&&dae.parent.onformsTabSwitch){dae.parent.onformsTabSwitch(e);}},ontokensModify:function(){this.set("cValid",this.inputBox.items.length>0);this.set("dirty",true);},isObjectVisible:function(item){var ide=mstrmojo.all.mstrDerivedAttrIDE;var allCandidates=ide.candidates.all;var idx=mstrmojo.array.find(allCandidates,"did",item.did);if(idx>-1){return ide.isObjectVisible(allCandidates[idx]);}return true;}},{scriptClass:"mstrmojo.HBox",alias:"buttonBar",slot:"buttonNode",cssClass:"mstrmojo-ME-buttonBox",cellCssClass:"subBox",children:[$BTN($DESC(2400,"Save"),function(){var dae=this.parent.parent;dae.save();},true,{alias:"saveBtn",bindings:{enabled:"!!(this.parent.parent.nameEditBox.nameInput.valid && this.parent.parent.attrEditBox.cValid)"}}),$BTN($DESC(2399,"Cancel"),function(){var dae=this.parent.parent,e=dae.parent;dae.clear();e.close();})]}]});}());