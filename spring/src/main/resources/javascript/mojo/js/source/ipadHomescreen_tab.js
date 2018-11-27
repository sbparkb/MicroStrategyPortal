(function(){mstrmojo.requiresCls("mstrmojo.hash","mstrmojo.mobileConfigUtil","mstrmojo.expr","mstrmojo.validation","mstrmojo.Widget","mstrmojo.ColorPicker","mstrmojo.css");var util=mstrmojo.mobileConfigUtil,_H=mstrmojo.hash,isIOS="mstrmojo.all.ipadHomescreen_tab.model.data.dt == 2 || mstrmojo.all.iphoneHomescreen_tab.model.data.dt == 1";isAndroid="mstrmojo.all.ipadHomescreen_tab.model.data.dt == 3 || mstrmojo.all.iphoneHomescreen_tab.model.data.dt == 4";var iconURLs={};iconURLs[util.ACT_RUNREPORT]="../images/icon_report.gif";iconURLs[util.ACT_BROWSEFOLDER]="../images/icon_folder.gif";iconURLs[util.ACT_SHAREDLIBRARY]="../javascript/mojo/css/images/shared_library.png";var iosActionItems=[{v:util.ACT_RUNREPORT,n:mstrmojo.desc(7812)},{v:util.ACT_BROWSEFOLDER,n:mstrmojo.desc(7813)},{v:util.ACT_SHAREDLIBRARY,n:mstrmojo.desc(7816)}],androidActionItems=[{v:util.ACT_RUNREPORT,n:mstrmojo.desc(7812)},{v:util.ACT_BROWSEFOLDER,n:mstrmojo.desc(7813)},{v:util.ACT_SHAREDLIBRARY,n:mstrmojo.desc(7816)}],preCacheActionItems=[{v:util.ACT_RUNREPORT,n:mstrmojo.desc(7812)},{v:util.ACT_BROWSEFOLDER,n:mstrmojo.desc(7813)}];mstrmojo.ipadHomescreen_tab=mstrmojo.insert({id:"ipadHomescreen_tab",scriptClass:"mstrmojo.VBox",n:mstrmojo.desc(7769),model:null});var ipadHomescreen_tab=mstrmojo.ipadHomescreen_tab;function _createHSTypeRadioButton(v,text,slot){return{scriptClass:"mstrmojo.RadioButton",name:"ipadHomescreen",label:text,cssText:"margin: 5px 10px 5px 0",cssDisplay:"block",value:v,bindings:{checked:"mstrmojo.all.ipadHomescreen_tab.model.data.hsc.tp === this.value"},onclick:function(){ipadHomescreen_tab.model.data.hsc.set("tp",v);},slot:slot};}function _createValidationTextBox(prop){return _H.copy(prop,{scriptClass:"mstrmojo.ValidationTextBox",dtp:mstrmojo.expr.DTP.VARCHAR,constraints:{trigger:mstrmojo.validation.TRIGGER.ALL},required:true,readOnly:true,onenabledChange:function(){this.required=this.enabled;this.validate();if(!this.required){this.onValid();}},onValid:function(){if(ipadHomescreen_tab.model){ipadHomescreen_tab.model.validate();}},onInvalid:function(){if(ipadHomescreen_tab){ipadHomescreen_tab.model.set("validFlag",false);}}});}function _createEnableViewCheckBox(name,prop,slot,visibleOnDevice){var resultCB={scriptClass:"mstrmojo.CheckBox",name:"enables",label:name,cssText:"margin-left:10px;",bindings:{checked:"mstrmojo.all.ipadHomescreen_tab.model.data.hsc.cst.fmt.vw."+prop},onclick:function(){ipadHomescreen_tab.model.data.hsc.cst.fmt.vw[prop]=this.checked;},slot:slot};if(visibleOnDevice===util.DEVICE_IOS){resultCB.bindings.visible=isIOS;}else{if(visibleOnDevice===util.DEVICE_ANDROID){resultCB.bindings.visible=isAndroid;}}return resultCB;}var ipadGeneralSettings=mstrmojo.insert({id:"ipadGeneralSettings",scriptClass:"mstrmojo.FieldSet",cssClass:"homescreen-fieldset",cssText:"height:150px;width:450px",legend:mstrmojo.desc(295),children:[{scriptClass:"mstrmojo.Table",cssText:"margin-left: 20px;",cellSpacing:8,rows:2,cols:1,children:[_createEnableViewCheckBox(mstrmojo.desc(9015),"rpt","0,0",util.DEVICE_IOS),_createEnableViewCheckBox(mstrmojo.desc(9756),"rpt","0,0",util.DEVICE_ANDROID),{scriptClass:"mstrmojo.FieldSet",cssClass:"mstrmojo-FieldSet-noborder",cssText:"margin-left:22px",legend:mstrmojo.desc(9016),children:[{scriptClass:"mstrmojo.Table",rows:2,cols:1,children:[_createEnableViewCheckBox(mstrmojo.desc(7831),"stg","0,0"),_createEnableViewCheckBox(mstrmojo.desc(1143),"hlp","1,0")]}],slot:"1,0"}]}]});function createItemList(props){return{id:props.id,scriptClass:"mstrmojo.WidgetList",alias:"itemList",cssClass:"ipadItemList",cssText:"width:250px",makeObservable:true,renderOnScroll:false,bindings:{items:props.itemsBinding},itemFunction:function(btn,idx,widget){var act=btn.act||btn;var item=new mstrmojo.Widget({markupString:"<div class='ipadItem'><img class='ipadItemIcon' src='{@icon}'><div class='ipadItemText'>{@text}</div></div>",markupSlots:{iconNode:function(){return this.domNode.firstChild;},textNode:function(){return this.domNode.lastChild;}},markupMethods:{oniconChange:function(){this.iconNode.src=this.icon;},ontextChange:function(){this.textNode.innerHTML=this.text;var pNode1=this.domNode.parentNode;if(pNode1&&pNode1.parentNode&&pNode1.parentNode.children){var carray=pNode1.parentNode.children;var maxWidth=carray[0].lastChild.lastChild.clientWidth;var i=1;while(carray[i]){var cw=carray[i].lastChild.lastChild.clientWidth;if(cw>maxWidth){maxWidth=cw;}i++;}var newWidth=maxWidth+30+10;var pNode2=pNode1.parentNode;var parentWidth=pNode2.parentNode&&pNode2.parentNode.clientWidth;pNode2.style.width=newWidth>parentWidth?newWidth+"px":parentWidth+"px";}},onselectedChange:function(){mstrmojo.css.toggleClass(this.domNode,["selected"],this.selected);},ontitleChange:function(){this.textNode.title=this.title;}},postBuildRendering:function(){var pNode=this.domNode.parentNode.parentNode;var parentWidth=pNode.parentNode.clientWidth;if(parentWidth){var newWidth=this.textNode.clientWidth+30+10;if(pNode.maxWidth==undefined||newWidth>pNode.maxWidth){pNode.maxWidth=newWidth;}pNode.style.width=pNode.maxWidth>parentWidth?pNode.maxWidth+"px":parentWidth+"px";}},update:function(){var cap;switch(act.tp){case util.ACT_BROWSEFOLDER:cap=act.fd&&act.fd.oi&&act.fd.oi.n;break;case util.ACT_RUNREPORT:cap=act.rs&&act.rs.oi&&act.rs.oi.n;break;case util.ACT_SHAREDLIBRARY:cap=mstrmojo.desc(7832);break;}this.set("icon",iconURLs[act.tp]);this.set("text",cap||"");this.set("title",cap||"");if(btn.cap){btn.cap.txt=cap;}}});item.update();act.attachEventListener("tpChange",item.id,"update");act.attachEventListener("rsChange",item.id,"update");act.attachEventListener("fdChange",item.id,"update");if(!act.rs){act.set("rs",new mstrmojo.Obj());}act.rs.attachEventListener("oiChange",item.id,"update");if(!act.fd){act.set("fd",new mstrmojo.Obj());}act.fd.attachEventListener("oiChange",item.id,"update");return item;}};}function createItemListPreview(props){var listTitle=props.listTitle,defaultButtonType=props.defaultButtonType,itmList=props.itemList,itemListId=itmList.id;return{cssClass:"homescreen-leftPanel",cssText:"height:400px;width:auto;",scriptClass:"mstrmojo.Table",cols:1,rows:3,children:[{scriptClass:"mstrmojo.Label",text:listTitle,cssText:"height:20px;font-size:14px;width:260px;white-space:nowrap;",slot:"0,0"},_H.copy({slot:"2,0"},itmList),{scriptClass:"mstrmojo.Button",text:"+",title:mstrmojo.desc(7822),cssClass:"ipadItemList-add",onclick:function(){var itemList=mstrmojo.all[itemListId];if(defaultButtonType==util.DEFAULT_IPAD_HOMESCREEN_BUTTON){if(ipadHomescreen_tab.model.defaultButton===undefined){var me=this;ipadHomescreen_tab.model.getDefaultConfig(util.DEFAULT_IPAD_HOMESCREEN_BUTTON,function(response){ipadHomescreen_tab.model.defaultButton=response;me.onclick();});}else{var idx=itemList.add([util.makeButtonHashable(_H.clone(ipadHomescreen_tab.model.defaultButton))]);itemList.set("selectedIndex",idx);}}else{if(defaultButtonType==util.DEFAULT_IPAD_PRECACHE_BUTTON){var idx=itemList.add([new mstrmojo.Obj({tp:util.ACT_RUNREPORT,rs:new mstrmojo.Obj({pcc:true})})]);itemList.set("selectedIndex",idx);}}},slot:"1,0"},{scriptClass:"mstrmojo.Button",text:"x",title:mstrmojo.desc(7823),cssClass:"ipadItemList-remove",bindings:{enabled:"this.parent.itemList.selectedIndex > -1"},onclick:function(){var itemList=this.parent.itemList,idx=itemList.selectedIndex;if(itemList.selectedItem){itemList.remove(itemList.selectedItem);}if(idx===itemList.items.length){idx--;}itemList.set("selectedIndex",idx);},slot:"1,0"},{scriptClass:"mstrmojo.Button",cssClass:"ipadItemList-movedown",title:mstrmojo.desc(139),bindings:{enabled:"this.parent.itemList.selectedIndex > -1 && this.parent.itemList.selectedIndex < this.parent.itemList.items.length-1"},onclick:function(){var itemList=this.parent.itemList,selectedIndex=itemList.selectedIndex;if(selectedIndex>-1&&selectedIndex<itemList.items.length-1){var item=itemList.selectedItem;itemList.remove(item);itemList.add([item],selectedIndex+1);itemList.set("selectedIndex",selectedIndex+1);}},slot:"1,0"},{scriptClass:"mstrmojo.Button",cssClass:"ipadItemList-moveup",title:mstrmojo.desc(138),bindings:{enabled:"this.parent.itemList.selectedIndex > 0"},onclick:function(){var itemList=this.parent.itemList,selectedIndex=itemList.selectedIndex;if(selectedIndex>0&&selectedIndex<itemList.items.length){var item=itemList.selectedItem;itemList.remove(item);itemList.add([item],selectedIndex-1);itemList.set("selectedIndex",selectedIndex-1);}},slot:"1,0"},{scriptClass:"mstrmojo.Label",cssText:"clear:both",slot:"1,0"}]};}function createActionSettingPanel(props){var forcePreCache=props.forcePreCache;return{scriptClass:"mstrmojo.FieldSet",cssClass:"homescreen-fieldset",cssText:"height:230px; width: 465px",legend:mstrmojo.desc(4878),children:[{scriptClass:"mstrmojo.VBox",cssText:"margin: 15px 0 0 15px",bindings:{action:props.actionBinding,visible:"!!this.action"},children:[{scriptClass:"mstrmojo.HBox",children:[{scriptClass:"mstrmojo.Label",text:mstrmojo.desc(762)+":"},{scriptClass:"mstrmojo.SelectBox",size:1,bindings:{isIOS:isIOS,items:props.actionItemsBinding,selectedItem:"{v:this.parent.parent.action.tp}"},onchange:function(){var actionModel=this.parent.parent.action,tp;if(actionModel){tp=this.selectedItem.v;actionModel.set("tp",tp);}}}]},{scriptClass:"mstrmojo.FieldSet",cssText:"width:430px;height:160px;margin-top:10px",alias:"stack",children:[{v:util.ACT_RUNREPORT,n:mstrmojo.desc(7812),layout:[{cells:[{},{},{}]},{cells:[{colSpan:3}]},{cells:[{colSpan:3}]},{cells:[{},{},{}]},{cells:[{},{},{}]},{cells:[{},{},{}]}],scriptClass:"mstrmojo.Table",bindings:{act:"this.parent.parent.action",visible:"this.act && this.act.tp === this.v "},onvisibleChange:function(){if(this.visible){if(!this.act.rs){this.act.set("rs",new mstrmojo.Obj());}if(forcePreCache){this.act.rs.set("pcc",true);}}},children:[{scriptClass:"mstrmojo.Label",text:mstrmojo.desc(3319),cssText:"width: 40px",slot:"0,0"},_createValidationTextBox({cssText:"margin-left:5px;width:300px;",bindings:{enabled:"this.parent.visible",value:"this.parent.act.rs.oi.pt"},slot:"0,1"}),util.createObjBrowserDropdown({browsableTypes:"3,8,55",targetType:"rs",bindings:{target:"this.parent.act"},slot:"0,2"}),{scriptClass:"mstrmojo.CheckBox",label:mstrmojo.desc(8487),bindings:{checked:"this.parent.act.rs.pcc",enabled:forcePreCache?"false":"this.parent.act.rs != null"},onclick:function(){this.parent.act.rs.set("pcc",this.checked);this.parent.act.rs.set("pcf",undefined);},slot:"1,0"},{scriptClass:"mstrmojo.CheckBox",alias:"el",label:mstrmojo.desc(12422),bindings:{enabled:"this.parent.act.rs && this.parent.act.rs.pcc",checked:"this.parent.act.rs.el"},onclick:function(){this.parent.act.rs.set("el",this.checked);},slot:"2,0"},{scriptClass:"mstrmojo.Label",text:mstrmojo.desc(8488),cssText:"margin: 2px 0 2px 5px",slot:"3,1"},{scriptClass:"mstrmojo.TextBox",cssText:"margin-left:5px;width:300px;",readOnly:true,bindings:{enabled:"this.parent.act.rs != null && this.parent.act.rs.pcc",value:"this.parent.act.rs.pcf.oi.pt"},slot:"4,1"},util.createObjBrowserDropdown({targetType:"pcf",bindings:{enabled:"this.parent.act.rs != null && this.parent.act.rs.pcc",target:"this.parent.act.rs",isIOS:isIOS,browsableTypes:"this.isIOS ? '8,17153':'8'"},slot:"4,2"}),{scriptClass:"mstrmojo.DropDownButton",cssClass:"mstrmojo-IphoneSettingAction-DropDownButton",selectedObjNum:0,text:mstrmojo.desc(12423),bindings:{visible:isIOS,folder:"this.parent.act.rs.pcf",enabled:"this.parent.act.rs && this.parent.act.rs.pcc && this.folder && !(this.folder.oi.t==67)",lwr:"this.parent.act.rs.lwr",target:function(){return this.parent.act.rs;}},onlwrChange:function(){if(!!this.lwr){this.selectedObjNum=this.lwr.ois.length;this.parent.act.rs.lwr=this.lwr;this.set("text",mstrmojo.desc(12423)+", "+this.selectedObjNum+" "+mstrmojo.desc(12424)+".");}},mode:2,popupRef:util.getLightWeightReconcilePopup(),togglePopup:function togglePopup(){var p=this._lastOpened;if(p&&p.visible&&this.enabled){this.closePopup();}else{if(this.enabled){this.openPopup("popupRef",this.popupOpenConfig);}}},slot:"5,1"}]},{v:util.ACT_BROWSEFOLDER,n:mstrmojo.desc(7813),scriptClass:"mstrmojo.Table",layout:[{cells:[{},{},{}]},{cells:[{colSpan:3}]},{cells:[{colSpan:3}]},{cells:[{colSpan:3}]}],bindings:{act:"this.parent.parent.action",visible:"this.act && this.act.tp == this.v"},onvisibleChange:function(){if(this.visible){if(!this.act.fd){this.act.set("fd",new mstrmojo.Obj());}if(forcePreCache){this.act.fd.set("pcc",true);}}},children:[{scriptClass:"mstrmojo.Label",text:mstrmojo.desc(7818),cssText:"width: 40px",slot:"0,0"},_createValidationTextBox({cssText:"margin-left:5px;width:300px;",bindings:{enabled:"this.parent.visible",value:"this.parent.act.fd.oi.pt"},slot:"0,1"}),util.createObjBrowserDropdown({targetType:"fd",bindings:{target:"this.parent.act",isIOS:isIOS,browsableTypes:"this.isIOS ? '8,17153':'8'"},slot:"0,2",allowCheckSubscription:true}),{scriptClass:"mstrmojo.CheckBox",label:mstrmojo.desc(8333),bindings:{enabled:"this.parent.act.fd != null && !(this.parent.act.fd.oi.t==67)",checked:"!(this.parent.act.fd.oi.t==67) && this.parent.act.fd.csp"},onclick:function(){this.parent.act.fd.csp=this.checked;},slot:"1,0"},{scriptClass:"mstrmojo.CheckBox",label:mstrmojo.desc(8485),bindings:{enabled:forcePreCache?"false":"this.parent.act.fd != null",checked:"this.parent.act.fd.pcc"},onclick:function(){this.parent.act.fd.set("pcc",this.checked);},slot:"2,0"},{scriptClass:"mstrmojo.DropDownButton",cssClass:"mstrmojo-IphoneSettingAction-DropDownButton",selectedObjNum:0,text:mstrmojo.desc(12423),bindings:{visible:isIOS,folder:"this.parent.act.fd",enabled:"this.folder && this.folder.oi && this.folder.pcc && !(this.folder.oi.t==67)",lwr:"this.folder.lwr",target:function(){return this.parent.act.fd;}},onlwrChange:function(){if(!!this.lwr){this.selectedObjNum=this.lwr.ois.length;this.folder.lwr=this.lwr;this.set("text",mstrmojo.desc(12423)+", "+this.selectedObjNum+" "+mstrmojo.desc(12424)+".");}},mode:2,popupRef:util.getLightWeightReconcilePopup(),togglePopup:function togglePopup(){var p=this._lastOpened;if(p&&p.visible&&this.enabled){this.closePopup();}else{if(this.enabled){this.openPopup("popupRef",this.popupOpenConfig);}}},slot:"3,0"}]},{v:util.ACT_SHAREDLIBRARY,n:mstrmojo.desc(7816),scriptClass:"mstrmojo.Label"}]}]}]};}function createCustomHomescreen(){var ipadItemList=createItemList({id:"ipadItemList",itemsBinding:"mstrmojo.all.ipadHomescreen_tab.model.data.hsc.cst.btns"}),ipadPreview=createItemListPreview({listTitle:mstrmojo.desc(7891),defaultButtonType:util.DEFAULT_IPAD_HOMESCREEN_BUTTON,itemList:ipadItemList}),ipadItemSettings=createActionSettingPanel({actionBinding:"mstrmojo.all.ipadItemList.selectedItem.act",actionItemsBinding:function(){return this.isIOS?iosActionItems:androidActionItems;}});return{id:"customIpadHomescreen",scriptClass:"mstrmojo.HBox",cssClass:"homescreen-custom",cssText:"width:auto",bindings:{visible:"mstrmojo.all.ipadHomescreen_tab.model.data.hsc.tp === mstrmojo.mobileConfigUtil.HOMESCREEN_CUSTOM"},children:[ipadPreview,{scriptClass:"mstrmojo.VBox",children:[ipadGeneralSettings,ipadItemSettings]}]};}ipadHomescreen_tab.createPreCacheHomescreen=function(itemListId,homescreenBinding){var preCacheItemList=createItemList({id:itemListId,itemsBinding:"this.parent.parent.homescreen.model.data.hsc.rs.sobs"}),preCacheItemListPreview=createItemListPreview({listTitle:mstrmojo.desc(8628),defaultButtonType:util.DEFAULT_IPAD_PRECACHE_BUTTON,itemList:preCacheItemList}),preCacheItemSettings=createActionSettingPanel({actionBinding:"mstrmojo.all."+itemListId+".selectedItem",actionItemsBinding:function(){return preCacheActionItems;},forcePreCache:true});return{scriptClass:"mstrmojo.HBox",cssClass:"homescreen-custom",cssText:"width:auto",bindings:{homescreen:homescreenBinding,visible:"this.homescreen.model.data.hsc.tp === mstrmojo.mobileConfigUtil.HOMESCREEN_RD"},children:[preCacheItemListPreview,preCacheItemSettings]};};ipadHomescreen_tab.createProgressBarHomescreen=function(homescreenBinding){return{scriptClass:"mstrmojo.Table",cssText:"width:auto;margin-left:25px",bindings:{homescreen:homescreenBinding,visible:"this.homescreen.model.data.hsc.tp === mstrmojo.mobileConfigUtil.HOMESCREEN_RD && ("+isIOS+")"},layout:[{cells:[{colSpan:2}]},{cells:[{cssText:"width:90px"},{}]}],children:[{scriptClass:"mstrmojo.CheckBox",label:mstrmojo.desc(9066),bindings:{checked:"this.parent.homescreen.model.data.hsc.rs.pb.iv"},onclick:function(){if(this.parent.homescreen.model.data.hsc.rs.pb){this.parent.homescreen.model.data.hsc.rs.pb.set("iv",this.checked);}},slot:"0,0"},{scriptClass:"mstrmojo.Label",cssText:"margin-left:30px",text:mstrmojo.desc(2060),slot:"1,0"},_H.copy({slot:"1,1"},mstrmojo.ColorPicker.createDropDown({showUserPalette:false,useAnimate:false,showNoColor:false,bindings:{enabled:"this.parent.homescreen.model.data.hsc.rs.pb.iv",fillColor:function(){return mstrmojo.color.decodeColor(this.parent.homescreen.model.data.hsc.rs.pb.clr);}},onfillColorChange:function(evt){if(this.fillColor){this.parent.homescreen.model.data.hsc.rs.pb.clr=mstrmojo.color.encodeColor(this.fillColor);}}}))]};};var homescreenTypeSelector=mstrmojo.insert({scriptClass:"mstrmojo.Table",layout:[{cells:[{colSpan:3}]},{cells:[{},{},{}]},{cells:[{colSpan:3}]},{cells:[{colSpan:3}]},{cells:[{},{},{}]},{cells:[{colSpan:3}]},{cells:[{},{},{}]},{cells:[{colSpan:3}]},{cells:[{colSpan:3}]},{cells:[{colSpan:3}]},{cells:[{colSpan:3}]}],children:[{scriptClass:"mstrmojo.RadioButton",name:"ipadHomescreen",label:mstrmojo.desc(7797),cssText:"margin: 5px 10px 5px 0",cssDisplay:"block",value:util.HOMESCREEN_DEFAULT,bindings:{checked:"mstrmojo.all.ipadHomescreen_tab.model.data.hsc.tp === this.value"},onclick:function(){ipadHomescreen_tab.model.data.hsc.set("tp",v);},slot:"0,0",getDefaultHomeScreen:function(){var hsc=ipadHomescreen_tab.model.data.hsc,configType=(mstrApp.device==util.DEVICE_IPAD)?util.DEFAULT_IPAD_CUSTOM_HOMESCREEN:util.DEFAULT_TABLET_UNIVERSAL_CUSTOM_HOMESCREEN;ipadHomescreen_tab.model.getDefaultConfig(configType,function(response){util.makeCSTHomescreenHashable({cst:response});hsc.set("tp",util.HOMESCREEN_DEFAULT);hsc.set("cst",response);});},onclick:function(){this.getDefaultHomeScreen();}},_createHSTypeRadioButton(util.HOMESCREEN_FOLDER,mstrmojo.desc(7798),"1,0"),_createValidationTextBox({cssText:"margin-left:5px;width:300px;",bindings:{enabled:"mstrmojo.all.ipadHomescreen_tab.model.data.hsc.tp === mstrmojo.mobileConfigUtil.HOMESCREEN_FOLDER",value:"mstrmojo.all.ipadHomescreen_tab.model.data.hsc.fd.oi.pt"},slot:"1,1"}),util.createObjBrowserDropdown({targetType:"fd",bindings:{target:"mstrmojo.all.ipadHomescreen_tab.model.data.hsc",enabled:"mstrmojo.all.ipadHomescreen_tab.model.data.hsc.tp === mstrmojo.mobileConfigUtil.HOMESCREEN_FOLDER",isIOS:isIOS,browsableTypes:"this.isIOS ? '8,17153':'8'"},slot:"1,2",allowCheckSubscription:true}),{scriptClass:"mstrmojo.CheckBox",label:mstrmojo.desc(8333),cssText:"margin-left: 16px",bindings:{folder:"mstrmojo.all.ipadHomescreen_tab.model.data.hsc.fd",enabled:"this.folder != null && mstrmojo.all.ipadHomescreen_tab.model.data.hsc.tp === mstrmojo.mobileConfigUtil.HOMESCREEN_FOLDER && !(this.folder.oi.t==67)",checked:"!(this.folder.oi.t==67) && this.folder.csp"},onclick:function(){if(this.folder!=null){this.folder.csp=this.checked;}},slot:"2,0"},{scriptClass:"mstrmojo.CheckBox",label:mstrmojo.desc(8485),cssText:"margin-left: 16px",bindings:{folder:"mstrmojo.all.ipadHomescreen_tab.model.data.hsc.fd",enabled:"this.folder != null && mstrmojo.all.ipadHomescreen_tab.model.data.hsc.tp === mstrmojo.mobileConfigUtil.HOMESCREEN_FOLDER",checked:"this.folder.pcc"},onclick:function(){if(this.folder!=null){this.folder.set("pcc",this.checked);}},slot:"3,0"},{scriptClass:"mstrmojo.DropDownButton",cssClass:"mstrmojo-IphoneSettingAction-DropDownButton",cssText:"margin-left: 21px",selectedObjNum:0,text:mstrmojo.desc(12423),bindings:{visible:isIOS,folder:"mstrmojo.all.ipadHomescreen_tab.model.data.hsc.fd",enabled:"this.folder && this.folder.oi && this.folder.pcc && !(this.folder.oi.t==67)",lwr:"this.folder.lwr",target:function(){return this.folder;}},onlwrChange:function(){if(!!this.lwr){this.selectedObjNum=this.lwr.ois.length;this.folder.lwr=this.lwr;this.set("text",mstrmojo.desc(12423)+", "+this.selectedObjNum+" "+mstrmojo.desc(12424)+".");}},mode:2,popupRef:util.getLightWeightReconcilePopup(),togglePopup:function togglePopup(){var p=this._lastOpened;if(p&&p.visible&&this.enabled){this.closePopup();}else{if(this.enabled){this.openPopup("popupRef",this.popupOpenConfig);}}},slot:"4,0"},{scriptClass:"mstrmojo.RadioButton",name:"ipadHomescreen_X",label:mstrmojo.desc(7800),cssDisplay:"block",bindings:{checked:function(){var tp=mstrmojo.all.ipadHomescreen_tab.model.data.hsc.tp;return tp===util.HOMESCREEN_RD||tp===util.HOMESCREEN_CUSTOM;}},onclick:function(){this.parent.rsHSTRadio.onclick();},slot:"5,0"},{scriptClass:"mstrmojo.RadioButton",name:"ipadHomescreen",alias:"rsHSTRadio",label:mstrmojo.desc(7799),cssText:"margin: 5px 10px 5px 20px",cssDisplay:"block",value:util.HOMESCREEN_RD,bindings:{visible:function(){var tp=mstrmojo.all.ipadHomescreen_tab.model.data.hsc.tp;return tp==util.HOMESCREEN_RD||tp==util.HOMESCREEN_CUSTOM;},checked:"mstrmojo.all.ipadHomescreen_tab.model.data.hsc.tp === this.value"},oncheckedChange:function(){if(this.checked!==undefined){var hsc=ipadHomescreen_tab.model.data.hsc;if(this.checked){if(!hsc.rs){hsc.set("rs",new mstrmojo.Obj({sobs:[],pb:new mstrmojo.Obj({iv:false,clr:14540253,pos:1,opa:1})}));}}}},onclick:function(){var hsc=ipadHomescreen_tab.model.data.hsc;hsc.set("tp",util.HOMESCREEN_RD);},slot:"6,0"},_createValidationTextBox({cssText:"margin-left:5px;width:300px;",bindings:{visible:function(){var tp=mstrmojo.all.ipadHomescreen_tab.model.data.hsc.tp;return tp==util.HOMESCREEN_RD||tp==util.HOMESCREEN_CUSTOM;},enabled:"mstrmojo.all.ipadHomescreen_tab.model.data.hsc.tp === mstrmojo.mobileConfigUtil.HOMESCREEN_RD",value:"mstrmojo.all.ipadHomescreen_tab.model.data.hsc.rs.oi.pt"},slot:"6,1"}),util.createObjBrowserDropdown({browsableTypes:"3,8,55",targetType:"rs",bindings:{visible:function(){var tp=mstrmojo.all.ipadHomescreen_tab.model.data.hsc.tp;return tp==util.HOMESCREEN_RD||tp==util.HOMESCREEN_CUSTOM;},target:"mstrmojo.all.ipadHomescreen_tab.model.data.hsc",enabled:"mstrmojo.all.ipadHomescreen_tab.model.data.hsc.tp === mstrmojo.mobileConfigUtil.HOMESCREEN_RD"},slot:"6,2"}),_H.copy({slot:"7,0"},ipadHomescreen_tab.createPreCacheHomescreen("ipadPreCacheItemList","mstrmojo.all.ipadHomescreen_tab")),_H.copy({slot:"8,0"},ipadHomescreen_tab.createProgressBarHomescreen("mstrmojo.all.ipadHomescreen_tab")),{scriptClass:"mstrmojo.RadioButton",alias:"customHSTRadio",name:"ipadHomescreen",label:mstrmojo.desc(8629),cssText:"margin: 5px 10px 5px 20px",cssDisplay:"block",value:util.HOMESCREEN_CUSTOM,bindings:{visible:function(){var tp=mstrmojo.all.ipadHomescreen_tab.model.data.hsc.tp;return tp==util.HOMESCREEN_RD||tp==util.HOMESCREEN_CUSTOM;},checked:"mstrmojo.all.ipadHomescreen_tab.model.data.hsc.tp === this.value"},onclick:function(){var hsc=ipadHomescreen_tab.model.data.hsc;if(hsc.cst===undefined){ipadHomescreen_tab.model.getDefaultConfig(util.DEFAULT_IPAD_CUSTOM_HOMESCREEN,function(response){util.makeCSTHomescreenHashable({cst:response});hsc.set("cst",response);hsc.set("tp",util.HOMESCREEN_CUSTOM);});}else{hsc.set("tp",util.HOMESCREEN_CUSTOM);}},slot:"9,0"},_H.copy({slot:"10,0"},createCustomHomescreen())]});ipadHomescreen_tab.addChildren(homescreenTypeSelector);})();