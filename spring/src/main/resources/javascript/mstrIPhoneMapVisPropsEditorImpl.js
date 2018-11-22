mstrIPhoneMapVisPropsEditorImplScript=true;mstrIPhoneMapVisPropsEditorImpl.prototype=new mstrBoneImpl();mstrIPhoneMapVisPropsEditorImpl.prototype.onload=function(){try{if(!this.isValidGrid){return ;}this.TRDisplay=mstr.utils.ISDXIE?"block":"table-row";for(var e in this.keys){this.initBone();this.updateForms("gr",e);this.updateAttribute("af",e);this.updateAttrForms("af",e);this.updateDisplayPulldown(e);this.updateIcon("mstyl",e);this.updateIcon("dms",e);this.updateDisplayAffinityPulldown(e);this.updateDisplayInfoPulldown(e);this.updateDisplayMarkCheckbox("af",e);this.updateMarkers("mtp",e);this.updateLookupAttForms("af",e);}this.updateDataSetRadio();var spanTab=microstrategy.findChildrenWithAtt(this.elem,"span","ty","tab1");if(spanTab&&spanTab.length>0){for(var i=0;i<spanTab.length;i++){if(spanTab[i].className=="mstrTabSetTabSelected"){this.setCurrentTab(spanTab[i]);break;}}}else{this.setCurrentTab();}}catch(err){microstrategy.errors.log(err);}};mstrIPhoneMapVisPropsEditorImpl.prototype.updateAttribute=function(propName,key){var show=microstrategy.findChildWithAtt(parentDiv,"select","id",propName);if(!show){return ;}var parentDiv=microstrategy.findChildWithAtt(this.elem,"div","key",key),attrTR=microstrategy.findChildWithAtt(parentDiv,"tr","id","attr").style,showMarker=microstrategy.findChildWithAtt(parentDiv,"input","id","mtp"+key);if(showMarker==null){return ;}if(show.value=="1"){attrTR.display=this.TRDisplay;}else{attrTR.display="none";}};mstrIPhoneMapVisPropsEditorImpl.prototype.updateIcon=function(selectedStyle,key){var parentDiv=microstrategy.findChildWithAtt(this.elem,"div","key",key),sty=microstrategy.findChildWithAtt(parentDiv,"select","id",selectedStyle);var icon=selectedStyle=="mstyl"?microstrategy.findChildWithAtt(parentDiv,"img","id","style-icon"):microstrategy.findChildWithAtt(parentDiv,"img","id","density-icon");if(sty&&icon){icon.src=selectedStyle=="mstyl"?sty.value:this.densityMap[sty.value];}};mstrIPhoneMapVisPropsEditorImpl.prototype.updateForms=function(propName,key){var parentDiv=(microstrategy.findChildWithAtt(this.elem,"div","key",key)),latTR=microstrategy.findChildWithAtt(parentDiv,"tr","id","lat").style,longTR=microstrategy.findChildWithAtt(parentDiv,"tr","id","long").style,pointTR=microstrategy.findChildWithAtt(parentDiv,"tr","id","point").style,show=microstrategy.findChildWithAtt(parentDiv,"select","id",propName);if(show.value=="1"){latTR.display="none";longTR.display="none";pointTR.display=this.TRDisplay;}else{latTR.display=this.TRDisplay;longTR.display=this.TRDisplay;pointTR.display="none";}};mstrIPhoneMapVisPropsEditorImpl.prototype.updateAttrForms=function(propName,key){var parentDiv=(microstrategy.findChildWithAtt(this.elem,"div","key",key)),attForm=microstrategy.findChildWithAtt(parentDiv,"select","id","af"),visProps;if(this.visProps){if(this.visProps.pgk==key||key==-1){visProps=this.visProps;}else{if(this.visProps.sgProps){visProps=this.visProps.sgProps[key];}}}var isSel=function(curElem,propName,defaultVal){return(!visProps||!visProps[propName])?index==defaultVal:visProps[propName]==curElem;};if(!attForm){return ;}var attformTR=microstrategy.findChildWithAtt(parentDiv,"tr","id","attform").style,attrTR=microstrategy.findChildWithAtt(parentDiv,"tr","id","attr").style,attTR=microstrategy.findChildWithAtt(parentDiv,"tr","id","att").style;var lat=microstrategy.findChildWithAtt(parentDiv,"select","id","flat"),lng=microstrategy.findChildWithAtt(parentDiv,"select","id","flong"),point=microstrategy.findChildWithAtt(parentDiv,"select","id","fpt");if(attForm.value=="1"){var attPulldown=microstrategy.findChildWithAtt(parentDiv,"select","id","ga");if(!attPulldown){return ;}var attForms=this.attForms[key][attPulldown[attPulldown.selectedIndex].value];if(attForms){var satf=microstrategy.findChildWithAtt(parentDiv,"select","id","satf");var index=0;for(var i=lat.options.length-1;i>=0;i--){lat.options[i]=null;lng.options[i]=null;point.options[i]=null;satf.options[i]=null;}for(var e in attForms){lat.options[index]=new Option(attForms[e],e,null,isSel(e,"flat",0));lng.options[index]=new Option(attForms[e],e,null,isSel(e,"flong",1));point.options[index]=new Option(attForms[e],e,null,isSel(e,"fpt",0));satf.options[index]=new Option(attForms[e],e,null,isSel(e,"satf",0));index++;}}attformTR.display="";attrTR.display="";attTR.display="none";}else{var atts=this.att[key];if(atts){var index=0;for(var i=lat.options.length-1;i>=0;i--){lat.options[i]=null;lng.options[i]=null;point.options[i]=null;}for(var e in atts){lat.options[index]=new Option(atts[e],e,null,isSel(e,"flat",0));lng.options[index]=new Option(atts[e],e,null,isSel(e,"flong",1));point.options[index]=new Option(atts[e],e,null,isSel(e,"fpt",0));index++;}}attTR.display="";attformTR.display="none";attrTR.display="none";}};mstrIPhoneMapVisPropsEditorImpl.prototype.updateMarkers=function(propName,key){var parentDiv=(microstrategy.findChildWithAtt(this.elem,"div","key",key)),show=microstrategy.findChildrenWithAtt(parentDiv,"input","id","mtp"+key);if(show==null||show[0]==null||show[1]==null||show[2]==null){return ;}if(!show[0].checked&&!show[1].checked&&!show[2].checked&&!show[3].checked){if(show[1].getAttribute("checked")){show[1].checked=true;}else{if(show[2].getAttribute("checked")){show[2].checked=true;}else{if(show[3].getAttribute("checked")){show[3].checked=true;}else{show[0].checked=true;}}}}var checkedOpt=show[3].checked?show[3]:show[2].checked?show[2]:show[1].checked?show[1]:show[0],markPD=microstrategy.findChildWithAtt(parentDiv,"div","id","markerPulldown").style,densityPD=microstrategy.findChildWithAtt(parentDiv,"div","id","densityPulldown").style,pathColorPickPD=microstrategy.findChildWithAtt(parentDiv,"div","id","pathColorPicker").style,maxBSTB=microstrategy.findChildWithAtt(parentDiv,"tr","id","maxBubbleSizeTextbox").style,dms=document.getElementById("dms").style,mstyl=document.getElementById("mstyl").style,mSizeStyle=microstrategy.findChildWithAtt(parentDiv,"tr","id","mapSizingStyle").style,atCB=microstrategy.findChildWithAtt(parentDiv,"tr","id","applyThreadCheckBox").style;mcCB=microstrategy.findChildWithAtt(parentDiv,"tr","id","applyMarkerClustering").style;aft=microstrategy.findChildWithAtt(parentDiv,"table","id","affinity-table");if(checkedOpt.value=="2"){maxBSTB.display=this.TRDisplay;mSizeStyle.display=this.TRDisplay;atCB.display=this.TRDisplay;mcCB.display=this.TRDisplay;markPD.visibility="hidden";densityPD.visibility="hidden";pathColorPickPD.visibility="hidden";if(mstr.utils.ISIE4){dms.visibility="hidden";mstyl.visibility="hidden";}if(aft){aft.style.display="table";}}else{if(checkedOpt.value=="1"){markPD.visibility="visible";maxBSTB.display="none";mSizeStyle.display="none";densityPD.visibility="hidden";pathColorPickPD.visibility="hidden";if(mstr.utils.ISIE4){mstyl.visibility="visible";dms.visibility="hidden";}atCB.display=this.TRDisplay;mcCB.display=this.TRDisplay;if(aft){aft.style.display="table";}}else{if(checkedOpt.value=="4"){markPD.visibility="hidden";maxBSTB.display="none";mSizeStyle.display="none";densityPD.visibility="visible";pathColorPickPD.visibility="hidden";if(mstr.utils.ISIE4){mstyl.visibility="hidden";dms.visibility="visible";}atCB.display="none";mcCB.display="none";if(aft){aft.style.display="none";}}else{if(checkedOpt.value=="5"){markPD.visibility="hidden";maxBSTB.display="none";mSizeStyle.display="none";densityPD.visibility="hidden";pathColorPickPD.visibility="visible";if(mstr.utils.ISIE4){mstyl.visibility="hidden";dms.visibility="hidden";}atCB.display="none";mcCB.display="none";if(aft){aft.style.display="none";}}}}}this.updateForms("gr",key);this.updateAttrForms("af",key);};mstrIPhoneMapVisPropsEditorImpl.prototype.updateDisplayPulldown=function(key){var parentDiv=(microstrategy.findChildWithAtt(this.elem,"div","key",key)),display=microstrategy.findChildWithAtt(parentDiv,"input","id","dl");if(display==null){return ;}var disSel=microstrategy.findChildWithAtt(parentDiv,"tr","id","disSelect");if(display.checked){disSel.style.display=this.TRDisplay;}else{disSel.style.display="none";}};mstrIPhoneMapVisPropsEditorImpl.prototype.updateDisplayInfoPulldown=function(){var display=document.getElementById("dil");if(display==null){return ;}if(display.checked){document.getElementById("disSelectL").style.display=this.TRDisplay;}else{document.getElementById("disSelectL").style.display="none";}};mstrIPhoneMapVisPropsEditorImpl.prototype.getSdpString=function(){var sdpHash={};var sdpSelects=microstrategy.findChildrenWithAtt(this.elem,"select","sdp","2");if(sdpSelects){for(var j=0;j<sdpSelects.length;j++){var option=sdpSelects[j];if(option.selectedIndex!="0"){sdpHash[option.value]=null;break;}}}var tabContainers=microstrategy.findChildrenWithAtt(this.elem,"span","ty","tab1");if(tabContainers){var tempSdp="";for(var i=1;i<tabContainers.length;i++){if(tabContainers[i].style.display!="none"){sdpHash[tabContainers[i].getAttribute("key")]=null;}}}var temp="";for(var k in sdpHash){temp+=k+",";}temp=temp.substring(0,temp.length-1);return temp;};mstrIPhoneMapVisPropsEditorImpl.prototype.getMTPForPrimaryString=function(isESRI){var inputs=microstrategy.findChildrenWithAtt(this.elem,"input","visprop","1");var value="";if(isESRI){value="-1";var showMarkers=microstrategy.findChildWithAtt(this.elem,"input","id","sm");var showAreas=microstrategy.findChildWithAtt(this.elem,"input","id","sa");if(showMarkers.checked){for(var i=0;i<inputs.length;i++){var input=inputs[i];if(input.id.indexOf("mtp")>-1){input.id=input.id.substring(0,(input.id.indexOf("mtp")+3));if(input.checked){value=input.value;break;}}}}else{if(showAreas.checked){value="3";}}}else{for(var i=0;i<inputs.length;i++){var input=inputs[i];if(input.id.indexOf("mtp")>-1){input.id=input.id.substring(0,(input.id.indexOf("mtp")+3));value=input.checked?input.value:value;}}}return value;};mstrIPhoneMapVisPropsEditorImpl.prototype.restoreMTPForPrimaryString=function(key){var inputs=microstrategy.findChildrenWithAtt(this.elem,"input","visprop","1");for(var i=0;i<inputs.length;i++){var input=inputs[i];if(input.id.indexOf("mtp")>-1){input.id=input.id+key;}}};mstrIPhoneMapVisPropsEditorImpl.prototype.getPCPValue=function(isPrimaryGrid,key){var parentDiv=(microstrategy.findChildWithAtt(this.elem,"div","key",key)),input=isPrimaryGrid=="true"?microstrategy.findChildWithAtt(parentDiv,"input","id","pcp"):microstrategy.findChildWithAtt(parentDiv,"input","id","pcp"+key);return input.value.substring(1);};mstrIPhoneMapVisPropsEditorImpl.prototype.updateDisplayMarkCheckbox=function(selectedAttributeOrForm,key){var parentDiv=(microstrategy.findChildWithAtt(this.elem,"div","key",key)),show=microstrategy.findChildWithAtt(parentDiv,"select","id",selectedAttributeOrForm);if(!show){return ;}var dm=microstrategy.findChildWithAtt(parentDiv,"tr","id","dm").style;var dmaf=microstrategy.findChildWithAtt(parentDiv,"tr","id","dmaf").style;if(show.value=="0"){dm.display=this.TRDisplay;dmaf.display="none";}else{dm.display="none";dmaf.display=this.TRDisplay;}};mstrIPhoneMapVisPropsEditorImpl.prototype.updateLookupAttForms=function(selectedAttributeOrForm,key){var parentDiv=(microstrategy.findChildWithAtt(this.elem,"div","key",key)),show=microstrategy.findChildWithAtt(parentDiv,"select","id",selectedAttributeOrForm),slaPulldown=microstrategy.findChildWithAtt(parentDiv,"tr","id","lookupAttrSelect");if(!show){return ;}if(slaPulldown){var attr=slaPulldown.style;if(show.value=="0"){attr.display=this.TRDisplay;}else{attr.display="none";}}};mstrIPhoneMapVisPropsEditorImpl.prototype.updateDisplayAffinityPulldown=function(key){var parentDiv=(microstrategy.findChildWithAtt(this.elem,"div","key",key)),display=microstrategy.findChildWithAtt(parentDiv,"input","id","da");if(display==null){return ;}var sdp=microstrategy.findChildWithAtt(parentDiv,"tr","id","disAffSelect");var sdpSelectBox=microstrategy.findChildWithAtt(parentDiv,"select","id","ag");sdp.style.display=display.checked?this.TRDisplay:"none";microstrategy.findChildWithAtt(parentDiv,"tr","id","disAffSelectAL").style.display=display.checked?this.TRDisplay:"none";microstrategy.findChildWithAtt(parentDiv,"tr","id","disMaxLineThickness").style.display=display.checked?this.TRDisplay:"none";microstrategy.findChildWithAtt(parentDiv,"select","id","latt").disabled=display.checked?false:true;if(!display.checked){sdpSelectBox.selectedIndex=0;}};mstrIPhoneMapVisPropsEditorImpl.prototype.getGridsXml=function(){var selects=microstrategy.findChildrenWithAtt(this.elem,"select","visprop","0");var inputs=microstrategy.findChildrenWithAtt(this.elem,"input","visprop","0");inputs=inputs.concat(selects);var tabContainers=microstrategy.findChildrenWithAtt(this.elem,"span","ty","tab1");if(tabContainers.length>0){if(tabContainers.length==1){return"";}var gridXml="<sgProps>";for(var k=1;k<tabContainers.length;k++){if(tabContainers[k].style.display!="none"){var gridKey=tabContainers[k].getAttribute("key");gridXml+='<g k="'+gridKey+'">';var inputs=microstrategy.findChildrenWithAtt(this.elem,"input","groupKey",gridKey);var selects=microstrategy.findChildrenWithAtt(this.elem,"select","groupKey",gridKey);inputs=inputs.concat(selects);var gridsPropsXml=this.getGridsPropsXml(inputs);if(gridsPropsXml==-1){return gridsPropsXml;}gridXml+=gridsPropsXml;gridXml+="</g>";}}gridXml+="</sgProps>";return gridXml;}else{return"";}};mstrIPhoneMapVisPropsEditorImpl.prototype.getGridsPropsXml=function(gridInputs){var gridXml="";if(gridInputs){for(var i=0;i<gridInputs.length;i++){var input=gridInputs[i];var value="";var isValidAttribute=input.getAttribute("isvalid");if(isValidAttribute){var isValid=eval(isValidAttribute);if(isValid!=true){alert(isValid);return -1;}}switch(input.type){case"text":value=(input.getAttribute("getvalue"))?eval(input.getAttribute("getvalue")):input.value;break;case"checkbox":value=input.checked?input.value:"0";break;case"hidden":value=(input.getAttribute("getvalue"))?eval(input.getAttribute("getvalue")):input.value;break;case"radio":value=input.checked?input.value:null;break;case"select-one":for(var j=0;j<input.length;j++){var option=input[j];if(option.selected==true){value=option.value;if(value.length==0&&input.getAttribute("allowEmpty")=="false"){value=null;}break;}}break;default:alert("input type not supported");}if(value){var tempInputId=input.id;if(input.id.indexOf("mtp")>-1||input.id.indexOf("pcp")>-1){tempInputId=(input.id.indexOf("mtp")>-1)?input.id.substring(0,(input.id.indexOf("mtp")+3)):input.id.substring(0,(input.id.indexOf("pcp")+3));}gridXml+="<"+tempInputId+' value="'+value+'" />';}}}return gridXml;};mstrIPhoneMapVisPropsEditorImpl.prototype.setCurrentTab=function(tabSelected){try{if(tabSelected){this.currentTab=tabSelected.getAttribute("curtab");}var tabContainers=microstrategy.findChildrenWithAtt(this.elem,"span","ty","tab1");var divContainers=microstrategy.findChildrenWithAtt(this.elem,"div","id","gridDiv");if(tabContainers&&tabContainers.length>0){for(var i=0;i<tabContainers.length;i++){if(tabContainers[i].getAttribute("curtab")==this.currentTab&&divContainers[i].getAttribute("name")==tabContainers[i].firstChild.data){divContainers[i].style.display="block";tabContainers[i].className="mstrTabSetTabSelected";tabContainers[i].style.display="";}else{tabContainers[i].className="mstrTabSetTab";divContainers[i].style.display="none";}}}else{divContainers[0].style.display="block";}}catch(err){microstrategy.errors.log(err);}};mstrIPhoneMapVisPropsEditorImpl.prototype.delCurrentTab=function(spanSelected){var tabSelected=spanSelected.parentNode;var tabContainers=microstrategy.findChildrenWithAtt(this.elem,"span","ty","tab1");if(!tabContainers||tabContainers.length==0){return ;}if(tabSelected.getAttribute("key")==tabContainers[0].getAttribute("key")){return ;}for(var i=1;i<tabContainers.length;i++){if(tabContainers[i].getAttribute("key")==tabSelected.getAttribute("key")&&tabContainers[i].className=="mstrTabSetTabSelected"){tabContainers[i].className="mstrTabSetTab";var divContainers=microstrategy.findChildrenWithAtt(this.elem,"div","id","gridDiv");divContainers[i].style.display="none";tabContainers[i].style.display="none";divContainers[0].style.display="block";tabContainers[0].className="mstrTabSetTabSelected";break;}}this.updateTabStripDisplay();};mstrIPhoneMapVisPropsEditorImpl.prototype.closeMapElemPopup=function(){var mapElemDiv=getElementById("evodiv");mapElemDiv.style.display="none";};mstrIPhoneMapVisPropsEditorImpl.prototype.updateDataSetRadio=function(){var dsRadio=document.getElementsByName("dataSet"),tabContainers=microstrategy.findChildrenWithAtt(this.elem,"span","ty","tab1");if(!dsRadio||!tabContainers||tabContainers.length==0||dsRadio.length==0){return 0;}var dsShow=dsRadio.length;for(var i=0;i<dsRadio.length;i++){for(var j=0;j<tabContainers.length;j++){if((dsRadio[i].value==tabContainers[j].getAttribute("key"))&&tabContainers[j].style.display!="none"){dsRadio[i].parentNode.style.display="none";dsShow--;break;}else{if((dsRadio[i].value==tabContainers[j].getAttribute("key"))&&tabContainers[j].style.display=="none"){dsRadio[i].parentNode.style.display="";break;}}}}return dsShow;};mstrIPhoneMapVisPropsEditorImpl.prototype.showDSPopup=function(){var parentDiv=microstrategy.findChildrenWithAtt(this.elem,"div","id","ppdiv");var dsCount=this.updateDataSetRadio();if(dsCount<=0){alert(microstrategy.descriptors.getDescriptor(9934));}else{if(parentDiv){for(var i=0;i<parentDiv.length;i++){parentDiv[i].style.display="block";}}}};mstrIPhoneMapVisPropsEditorImpl.prototype.showMEVOPopup=function(){var mapElemDiv=microstrategy.findChildWithAtt(this.elem,"div","id","evodiv"),contract=microstrategy.findChildWithAtt(this.elem,"img","id","contract"),expand=microstrategy.findChildWithAtt(this.elem,"img","id","expand");contract.style.display=mapElemDiv.style.display=="none"?"inline":"none";expand.style.display=mapElemDiv.style.display=="none"?"none":"inline";mapElemDiv.style.display=mapElemDiv.style.display=="none"?"block":"none";};mstrIPhoneMapVisPropsEditorImpl.prototype.validateDataType=function(formName,key,propName1,propName2){var parentDiv=(microstrategy.findChildWithAtt(this.elem,"div","key",key)),dataType=microstrategy.findChildWithAtt(parentDiv,"select","id",formName);if(dataType!=null&&dataType.value=="1"){return true;}return this.validateLatLong(parentDiv,key,propName1,propName2);};mstrIPhoneMapVisPropsEditorImpl.prototype.validateLatLong=function(parentDiv,key,propName1,propName2){var lat=microstrategy.findChildWithAtt(parentDiv,"select","id",propName1),lng=microstrategy.findChildWithAtt(parentDiv,"select","id",propName2);if((lat!=null)&&(lng!=null)&&(lat.value==lng.value)){this.restoreMTPForPrimaryString(key);return microstrategy.descriptors.getDescriptor("7670");}else{return true;}};mstrIPhoneMapVisPropsEditorImpl.prototype.updateTabStripDisplay=function(){if(mstr.utils.ISIE7){var tabStrip=document.getElementById("visTabStrip");if(tabStrip){tabStrip.style.paddingBottom=(tabStrip.scrollWidth>tabStrip.clientWidth)?"17px":0;}}};mstrIPhoneMapVisPropsEditorImpl.prototype.okDSChanges=function(){var show=document.getElementsByName("dataSet");if(show==null){return ;}for(var i=0;i<show.length;i++){if(show[i].checked){var selectedTab=show[i].value;var tabContainers=microstrategy.findChildrenWithAtt(this.elem,"span","ty","tab1");if(tabContainers){for(var i=0;i<tabContainers.length;i++){if(selectedTab==tabContainers[i].getAttribute("key")){this.setCurrentTab(tabContainers[i]);break;}}}break;}}this.updateTabStripDisplay();this.closeDSPopup();};mstrIPhoneMapVisPropsEditorImpl.prototype.closeDSPopup=function(){var dsTable=document.getElementById("ppdiv");if(dsTable){dsTable.style.display="none";}};mstrIPhoneMapVisPropsEditorImpl.prototype.validateSecondaryDataProvider=function(sdpName,key){var parentDiv=(microstrategy.findChildWithAtt(this.elem,"div","key",key)),show=microstrategy.findChildWithAtt(parentDiv,"input","id","mtp"+key);if(show==null||show.value=="4"){return true;}var sdp=microstrategy.findChildWithAtt(parentDiv,"select","id",sdpName);var daCheckbox=microstrategy.findChildWithAtt(parentDiv,"input","id","da");if(!sdp||!daCheckbox||!daCheckbox.checked){return true;}if(sdp.selectedIndex==0){return microstrategy.descriptors.getDescriptor("8328");}else{return true;}};mstrIPhoneMapVisPropsEditorImpl.prototype.validateMaxBubbleSize=function(){var mbs=getElementById("mbs");if(!mbs){return ;}if(!(/^[-+]?[0-9]+$/.test(mbs.value))){return microstrategy.descriptors.getDescriptor("8326");}if(mbs.value<=6){return microstrategy.descriptors.getDescriptor("8327").replace("##","7");}return true;};function mstrIPhoneMapVisPropsEditorImpl(id){this.inherits=mstrBoneImpl;this.inherits(id);this.id=id;this.inherits=null;this.path="microstrategy.bone('"+id+"')";return this;}