menuScript=true;var oSubCTimer=null;var oSubPkrTimer=null;var bIsOverContext=false;var bDisplayLeft=false;var sQuote="\\'";var sQuoteSimple="'";var sQuoteDouble='"';var aOndemandMenuItems=null;var aMenuItems=null;var aMenuItemsName;var sDrillContextMenuExtraArg1;var currentPicker=null;var specialMenuLayers=null;mstrMenuObj.prototype=new Object();function mstrMenuObj(id){}mstrMenuObj.adjustMenuPositionForClient=function(x,y,menu,parentLeft){if(menu.getAttribute("origHeight")){menu.style.height=menu.getAttribute("origHeight")+"px";}if(menu.getAttribute("origWidth")){menu.style.width=menu.getAttribute("origWidth")+"px";}var isCxt=menu.getAttribute("ty")=="cxt";var w=getObjWidth(isCxt?menu.firstChild:menu);if(w+x<getClientWidth()+getDocumentScrollLeft()){if(bDisplayLeft&&parentLeft){x=parentLeft-w+2;}else{bDisplayLeft=false;}}else{bDisplayLeft=true;if(parentLeft){x=parentLeft-w+2;}else{x=x-w+10;}}var ch=getClientHeight();var h=getObjHeight(isCxt?menu.firstChild:menu);var sc=getDocumentScrollTop();var d=(y+h)-(sc+ch);if(h>ch){y=sc+1;if(d>0){if(!menu.getAttribute("origHeight")){menu.setAttribute("origHeight",h);}if(!menu.getAttribute("origWidth")){menu.setAttribute("origWidth",w);}if(!isCxt){menu.style.height=Math.min(h,ch)+"px";menu.style.width=Math.min(w,w+menu.offsetWidth-menu.clientWidth)+"px";menu.style.overflowY="auto";}}}else{if(d>0){y=sc+ch-h-2;}}if(isCxt){menu.style.height=Math.min(h,ch)+"px";menu.style.width=Math.min(w,w+menu.offsetWidth-menu.clientWidth)+"px";if(menu.offsetHeight<h){if(bIsIE7){menu.style.overflow="auto";}else{menu.style.overflowY="auto";}}}moveObjTo(menu,x,y);};function displayContextMenu(oTarget,e,moveMenu){var sMenu=oTarget.getAttribute("CX");if(sMenu.length==0){return true;}var menuDefTarget=findTarget(oTarget,"CXID");var aMenuElementsName=menuDefTarget.getAttribute("CXID");var aMenuElements=microstrategy.getContextMenuManager(aMenuElementsName).menu_items;if(!aMenuElements||aMenuElements.length==0){return false;}var sDrillExtraArgument1=oTarget.getAttribute("D1");var types=oTarget.getAttribute("cxty");if(typeof (microstrategy)!="undefined"){microstrategy.updateActiveCXProps(oTarget,e);}hideContextMenus();getMouse(e);aMenuItems=aMenuElements;aMenuItemsName=aMenuElementsName;sDrillContextMenuExtraArg1=sDrillExtraArgument1;var avMenu=eval(sMenu);buildContextMenu(avMenu,1,eval(types),oTarget,false,null);if(hasMenuItem(avMenu,eval(types))){var menuX,menuY;if(moveMenu){var tID=oTarget.id;var menuX=getObjSumLeftScrolled(tID)+3;var menuY=getObjSumTopScrolled(tID)+getObjHeight(tID)+4;oTarget.onmouseout=function(){OutContext();};}else{menuX=lMouseX-microstrategy.CURSOR_OFFSET;menuY=lMouseY-microstrategy.CURSOR_OFFSET;}positionContextMenu(menuX,menuY,aMenuItemsName+"1");if(bIsIE4){togglePulldowns(getObj(aMenuItemsName+"1"),false);}document.getElementById(aMenuItemsName+"1").style.visibility="visible";microstrategy.setContextMenuStatus(true);}return false;}function isMenuShown(menuItem,selectedTypes){var supportedTypes=menuItem[5];var showJS=menuItem[6];var displayMenuItem=true;var __result=true;if(supportedTypes&&supportedTypes.length>0&&selectedTypes&&selectedTypes.length>0){var supportedTypesArray=eval(supportedTypes);__result=false;for(var j=0;j<selectedTypes.length;j++){for(var i=0;i<supportedTypesArray.length;i++){if(selectedTypes[j]==supportedTypesArray[i]){__result=true;break;}}if(__result){break;}}}if(showJS&&showJS.length>0&&__result==true){if(showJS=="$check-subMenu-existence$"){var subs=eval(menuItem[4]);var n=subs.length;if(n>0){for(var i=0;i<n;i++){var sub=aMenuItems[subs[i]];if(sub){__result=isMenuShown(sub,selectedTypes);if(__result){break;}}}}else{__result=false;}}else{__result=eval(showJS)?true:false;}}return __result;}function getPicker(pkrId){var pkrs=document.getElementsByName(pkrId);var pkr=null;var children=document.body.childNodes;for(var i=0;i<children.length;i++){if(children[i].id==pkrId){pkr=children[i];break;}}if(pkrs){if(!pkr){while(pkrs.length>1){pkrs[0].parentNode.removeChild(pkrs[0]);}pkr=document.body.appendChild(pkrs[0]);}}return pkr;}function showPicker(show,pkrId,posX,posY,iMenu){var pkr=getPicker(pkrId);if(pkr){if(show){currentPicker=pkr;var sMenu=aMenuItemsName+iMenu;var menuObj=getElementById(sMenu);if(menuObj){pkr.style.zIndex=menuObj.style.zIndex+100;}pkr.style.visibility="hidden";pkr.style.display="block";mstrMenuObj.adjustMenuPositionForClient(posX,posY,pkr);if(bDisplayLeft){pkr.style.left=parseInt(pkr.style.left,10)-getObjWidth(menuObj)+"px";}pkr.style.visibility="visible";}else{pkr.style.display="none";currentPicker=null;}}}function buildContextMenuRows(avItems,iMenu,types,oTarget,loadOndemandMenuItems,modelID){var sContent="";var lRowCount=0;var sRowID="";var sSubCommand="";var sOnClickLink="";var hasMenuItem=false;var enabled=true;if(!oTarget){oTarget=microstrategy.activeCXMenu;}var aMenuItemsLocal=null;if(loadOndemandMenuItems){aMenuItemsLocal=aOndemandMenuItems;lRowCount=getNumTagsInDiv(aMenuItemsName+iMenu,"tr");}else{aMenuItemsLocal=aMenuItems;}for(var iIndex=0;iIndex<avItems.length;iIndex++){if(aMenuItemsLocal[avItems[iIndex]][3]!=2){if(isMenuShown(aMenuItemsLocal[avItems[iIndex]],types)){hasMenuItem=true;var menuClass="menu-item";var menuClassWithSeparator="menu-item-with-separator";var separatorClass="menu-item-separator";enabled=true;var enableJS=aMenuItemsLocal[avItems[iIndex]][7];if(enableJS&&enableJS.length>0){enabled=eval(enableJS);}if(!enabled||aMenuItemsLocal[avItems[iIndex]][8]==1){menuClass="menu-item-disabled";menuClassWithSeparator="menu-item-disabled-with-separator";}sRowID="cm"+iMenu+"r"+lRowCount;sContent+='<TR ID="'+sRowID+'" HEIGHT="18" AC="true" ';var cmd=aMenuItemsLocal[avItems[iIndex]][1];if(menuClass=="menu-item"){cmd=replacePlaceholders(cmd,oTarget);if(aMenuItemsLocal[avItems[iIndex]][3]==1){var typesString=convertArrayToString(types);if(aMenuItemsLocal[avItems[iIndex]][10]!=null){var ondemandModelId=aMenuItemsLocal[avItems[iIndex]][10];var ondemandDynamicMenuKey=aMenuItemsLocal[avItems[iIndex]][11];var ondemandViewId=aMenuItemsLocal[avItems[iIndex]][12];sSubCommand="buildSubMenu("+aMenuItemsLocal[avItems[iIndex]][4]+", "+(iMenu+1)+", getObjSumTop("+sQuote+sRowID+sQuote+"), ["+typesString+"], "+loadOndemandMenuItems+", "+sQuote+ondemandModelId+sQuote+", "+sQuote+ondemandDynamicMenuKey+sQuote+", "+sQuote+ondemandViewId+sQuote+" );";}else{sSubCommand="buildSubMenu("+aMenuItemsLocal[avItems[iIndex]][4]+", "+(iMenu+1)+", getObjSumTopScrolled("+sQuote+sRowID+sQuote+"), ["+typesString+"], "+loadOndemandMenuItems+");";}sContent+="onMouseOver=\"clearTimeout(oSubCTimer); delaySubCMenus('"+sSubCommand+"'); menuOn(this);\" ";sContent+='onMouseOut="menuOff(this);" LI="sub" ';}else{if(aMenuItemsLocal[avItems[iIndex]][3]==3){sSubCommand="hideContextSubMenus("+iMenu+"); showPicker(true,"+sQuote+aMenuItemsLocal[avItems[iIndex]][4]+sQuote+",getObjWidth("+sQuote+sRowID+sQuote+") + getObjSumLeft("+sQuote+sRowID+sQuote+"), getObjSumTop("+sQuote+sRowID+sQuote+"),"+iMenu+");";sContent+="onMouseOver=\"clearTimeout(oSubCTimer); delaySubCMenus('"+sSubCommand+"'); menuOn(this);\"";sContent+='onMouseOut="menuOff(this);"';var pkr=getPicker(aMenuItemsLocal[avItems[iIndex]][4]);if(pkr){pkr.onmouseover=new Function("clearTimeout(oSubPkrTimer);");pkr.onmouseout=new Function("OutContext();");pkr.onmousedown=new Function("e","if (!e) {e=window.event;} eval("+cmd+");OutContext();");}}else{sContent+='onMouseOver="clearTimeout(oSubCTimer); menuOn(this);';sContent+=" hideContextSubMenus("+iMenu+");";sContent+='" onMouseOut="menuOff(this);" ';sOnClickLink=cmd;if(sOnClickLink.indexOf("DCM")!=-1){if(sDrillContextMenuExtraArg1==null){sOnClickLink=sOnClickLink.substr(0,sOnClickLink.indexOf(")"))+",'')";}else{sOnClickLink=sOnClickLink.substr(0,sOnClickLink.indexOf(")"))+",'"+sDrillContextMenuExtraArg1+"')";}}sContent+="onClick=\"menuClick(this, '"+aMenuItemsName+iMenu+'\');" LI="'+sOnClickLink+';" ';}}if(bIsW3C){sContent+='STYLE="cursor: pointer;"';}else{sContent+='STYLE="cursor: hand;"';}}var isNextMenuOptionASeparator=isNextMenuSeparator(aMenuItemsLocal,avItems,iIndex,types);sContent+=">\n";sContent+='<TD WIDTH="12" ALIGN="MIDDLE" CLASS="mstrContextMenuLeft"';if(isNextMenuOptionASeparator){sContent+=" class="+separatorClass+" ";}sContent+=">";switch(aMenuItemsLocal[avItems[iIndex]][2]){case 0:sContent+='<IMG SRC="'+microstrategy.FOLDER_IMAGES+'1ptrans.gif" WIDTH="12" HEIGHT="1" HSPACE="0" VSPACE="0" ALT="" BORDER="0" ALIGN="ABSMIDDLE" />';break;case 1:var showCheck=true;var checkJS=aMenuItemsLocal[avItems[iIndex]][9];if(checkJS&&checkJS.length>0){showCheck=eval(checkJS);}if(showCheck){sContent+='<IMG SRC="'+microstrategy.FOLDER_IMAGES+'MenuCheck.gif" WIDTH="12" HEIGHT="9" HSPACE="0" VSPACE="0" ALT="" BORDER="0" ALIGN="ABSMIDDLE" />';}break;case 2:sContent+='<IMG SRC="'+microstrategy.FOLDER_IMAGES+'CMenuRemove.gif" WIDTH="11" HEIGHT="11" HSPACE="0" VSPACE="0" ALT="" BORDER="0" ALIGN="ABSMIDDLE" /><IMG SRC="'+microstrategy.FOLDER_IMAGES+'1ptrans.gif" WIDTH="1" HEIGHT="1" HSPACE="0" VSPACE="0" ALT="" BORDER="0" ALIGN="ABSMIDDLE" />';break;case 3:sContent+='<IMG SRC="'+microstrategy.FOLDER_IMAGES+'CMenuSubtotal.gif" WIDTH="12" HEIGHT="12" HSPACE="0" VSPACE="0" ALT="" BORDER="0" ALIGN="ABSMIDDLE" />';break;case 4:sContent+='<IMG SRC="'+microstrategy.FOLDER_IMAGES+'arrow_DrillUp.gif" WIDTH="9" HEIGHT="9" HSPACE="0" VSPACE="0" ALT="" BORDER="0" ALIGN="ABSMIDDLE" />';break;case 5:sContent+='<IMG SRC="'+microstrategy.FOLDER_IMAGES+'arrow_DrillDown.gif" WIDTH="9" HEIGHT="9" HSPACE="0" VSPACE="0" ALT="" BORDER="0" ALIGN="ABSMIDDLE" />';break;case 6:sContent+='<IMG SRC="'+microstrategy.FOLDER_IMAGES+'arrow_DrillTemplate.gif" WIDTH="9" HEIGHT="9" HSPACE="0" VSPACE="0" ALT="" BORDER="0" ALIGN="ABSMIDDLE" />';break;case 7:sContent+='<IMG SRC="'+microstrategy.FOLDER_IMAGES+'drill.png" WIDTH="16" HEIGHT="16" HSPACE="0" VSPACE="0" ALT="" BORDER="0" ALIGN="ABSMIDDLE" />';break;case 8:sContent+='<IMG SRC="'+microstrategy.FOLDER_IMAGES+'treeLoading.gif" WIDTH="12" HEIGHT="12" HSPACE="0" VSPACE="0" ALT="" BORDER="0" ALIGN="ABSMIDDLE" />';break;}sContent+="</TD>";sContent+='<TD WIDTH="1"';if(isNextMenuOptionASeparator){sContent+=" class="+separatorClass+" ";}sContent+='><IMG SRC="'+microstrategy.FOLDER_IMAGES+'1ptrans.gif" HEIGHT="1" WIDTH="1" ALT="" BORDER="0"></TD>';sContent+='<TD ALIGN="LEFT" NOWRAP="1" ';if(isNextMenuOptionASeparator){sContent+=" class="+menuClassWithSeparator+" ";}else{sContent+=" class="+menuClass+" ";}sContent+=">"+aMenuItemsLocal[avItems[iIndex]][0]+"&nbsp;&nbsp;<BR/></TD>";sContent+='<TD WIDTH="12" ALIGN="RIGHT" NOWRAP="1" ';if(isNextMenuOptionASeparator){sContent+=" class="+separatorClass+" ";}sContent+=">";if(aMenuItemsLocal[avItems[iIndex]][3]==1||aMenuItemsLocal[avItems[iIndex]][3]==3){var expandImage=enabled?"MenuExpand.gif":"MenuExpand_off.gif";sContent+='<IMG SRC="'+microstrategy.FOLDER_IMAGES+expandImage+'" WIDTH="8" HEIGHT="9" ALT="" BORDER="0" /><IMG SRC="'+microstrategy.FOLDER_IMAGES+'1ptrans.gif" WIDTH="2" HEIGHT="1" ALT="0" BORDER="0" />';}else{sContent+='<IMG SRC="'+microstrategy.FOLDER_IMAGES+'1ptrans.gif" WIDTH="12" HEIGHT="1" ALT="0" BORDER="0" />';}sContent+="</TD></TR>\n";lRowCount++;}}}return sContent;}function replacePlaceholders(str,oTarget){var matched=false;var tempStr=str;if(tempStr.indexOf("%40")>-1){tempStr=unescape(tempStr);}if(tempStr.indexOf("@")>-1){tempStr=tempStr.replace(/@[^@]+@/g,function(token){matched=true;var attName=token.substring(1,token.length-1);if(attName.indexOf("__bone__")>-1){attName=attName.replace("__bone__","microstrategy.findBone(microstrategy.activeCXMenu)");return eval(attName);}else{return oTarget.getAttribute(attName)||"";}});}if(matched){return tempStr;}else{return str;}}function isNextMenuSeparator(aMenuItemsLocal,avItems,iIndex,types){for(var i=iIndex+1;i<avItems.length;i++){if(isMenuShown(aMenuItemsLocal[avItems[i]],types)){return(aMenuItemsLocal[avItems[i]][3]==2);}}return false;}function getMenuDiv(sName){var oDiv=getObj(sName);if(!oDiv){oDiv=document.createElement("DIV");oDiv.setAttribute("id",sName);oDiv.setAttribute(microstrategy.HTMLATTR_OBJTYPE,microstrategy.OBJTYPE_CONTEXT_MENU);oDiv.onmouseover=OverContext;oDiv.onmouseout=OutContext;oDiv.style.visibility="hidden";oDiv.style.position="absolute";oDiv.style.backgroundColor="#FFFFFF";oDiv.style.border="1px #ddd solid";oDiv.style.top="-999px";document.body.appendChild(oDiv);}return oDiv;}function buildContextMenu(avItems,iMenu,types,oTarget,loadOndemandMenuItems,modelID){var sContent="";sContent='<TABLE BORDER="0" CELLSPACING="0" CLASS="mstrContextMenuRight">\n';sContent+=buildContextMenuRows(avItems,iMenu,types,oTarget,loadOndemandMenuItems,modelID);sContent+="</TABLE>";var oMenu=getMenuDiv(aMenuItemsName+iMenu);oMenu.innerHTML=sContent;}function hasMenuItem(avItems,types){for(var iIndex=0;iIndex<avItems.length;iIndex++){if(aMenuItems[avItems[iIndex]][3]!=2){if(isMenuShown(aMenuItems[avItems[iIndex]],types)){return true;}}}return false;}function upClick(e){if(bIsW3C&&!e){return false;}var bButton=(bIsIE4)?(event.button==2||event.button==3):(e.button==3);if(bButton){var oTarget=getEventTarget(e);oTarget=findTarget(oTarget,"CX");if(oTarget){document.onmouseup=null;return false;}}}function OverContext(){bIsOverContext=true;}function OutContext(){clearTimeout(oSubCTimer);bIsOverContext=false;}function hideContextMenus(){if(typeof (aMenuItemsName)=="undefined"){return ;}if(!bIsOverContext){hideContextSubMenus(1);var oMenu=getObj(aMenuItemsName+"1");if(oMenu){oMenu.style.visibility="hidden";oMenu.style.top="-999px";microstrategy.setContextMenuStatus(false);oMenu.innerHTML="";}if(bIsIE4){togglePulldowns(oMenu,true);}}}function hideContextSubMenus(level){var i=1;for(var i=4;i>level;i--){var oMenu=getObj(aMenuItemsName+i);if(oMenu){oMenu.style.visibility="hidden";oMenu.innerHTML="";if(bIsIE4){togglePulldowns(oMenu,true);}}}if(currentPicker!=null){currentPicker.style.display="none";currentPicker=null;}}function buildSubMenu(avItems,iMenu,lMenuTop,types,loadOndemandMenuItems,ondemandModelId,ondemandDynamicMenuKey,ondemandViewId){var sMenu=aMenuItemsName+iMenu;var oMenu=getMenuDiv(sMenu);oMenu.modelID=ondemandModelId;if(bIsIE4){oMenu.style.height="auto";oMenu.style.width="auto";oMenu.style.overflowY="visible";}oMenu.style.zIndex=1000;buildContextMenu(avItems,iMenu,types,null,loadOndemandMenuItems,ondemandModelId);addOndemandSubMenuItems(ondemandModelId,ondemandDynamicMenuKey,ondemandViewId,iMenu);if(oMenu.childNodes.length==0){return ;}var parentLeft=getObjLeft(aMenuItemsName+(iMenu-1));var parentWidth=getObjWidth(aMenuItemsName+(iMenu-1));positionContextMenu(parentLeft+parentWidth-2,lMenuTop,sMenu,parentLeft);if(bIsIE4){togglePulldowns(getObj(aMenuItemsName+iMenu),false);}hideContextSubMenus(iMenu);document.getElementById(aMenuItemsName+iMenu).style.visibility="visible";}function delaySubCMenus(sExecuteText){clearTimeout(oSubCTimer);if(sExecuteText.length>0){if(bIsInPortal&&mstr.utils.ISFF3){eval(sExecuteText);}else{oSubCTimer=window.setTimeout(sExecuteText,250);}}}function positionContextMenu(lXPos,lYPos,sMenu,parentLeft){if(bIsIE4){var oMenu=sMenu;if(typeof (oMenu)=="string"){oMenu=document.getElementById(sMenu);}if(oMenu){oMenu.style.height="auto";oMenu.style.width="auto";oMenu.style.overflowY="visible";}}var oMenu=getObj(sMenu);oMenu.style.zIndex=1000;mstrMenuObj.adjustMenuPositionForClient(lXPos,lYPos,oMenu,parentLeft);}function generateLink(link){link+="&innerWidth="+getClientWidth()+"&innerHeight="+getClientHeight();return link;}function submitCM(link,isIframe,target){if(isIframe){link=link+"&iframe=true";}var keepSubmitting=true;if(microstrategy&&microstrategy.eventManager){keepSubmitting=microstrategy.eventManager.notifyOrphanBones("onmenusubmitform");}if(keepSubmitting){var oNewForm=createDynamicForm(link);if(isIframe){oNewForm.target="frameManager";}if(target!=null){oNewForm.target=target;}}submitForm(oNewForm);}dropDownMenusScript=true;var oTimer=null;var bIsOver=false;var oSubTimer=null;var bMenuOpen=false;var bCompleted=false;var asBranch=new Array();var nBranchElements=0;var bClickStyle=false;function activateHeader(iMenu,sSelectedCSS,sUnselectedCSS){for(var j=0;j<iMainMenus;j++){var oMenu=getObj("menuHeader"+j);if(oMenu){var disabled=oMenu.getAttribute("E")=="0";if(!disabled){if(j==iMenu){oMenu.className=sSelectedCSS;}else{oMenu.className=sUnselectedCSS;}}}}}function fixMenus(aUpdateMenu){var menu;for(i=0;i<aUpdateMenu.length;i++){menu=getObj(aUpdateMenu[i][1]);if(menu){menu.setAttribute(aUpdateMenu[i][2],aUpdateMenu[i][3]);}}menu=menu=getObj("mb"+aUpdateMenu[0][0]);if(menu){menu.setAttribute("C","0");}}function updateCheckedAndEnabledOptions(menuName){var menu=getObj(menuName);var TABLEs=menu.getElementsByTagName("TABLE");TABLEs[0].className="menu-block";var TRs=TABLEs[0].getElementsByTagName("TR");var menuUpdated=false;var newValue;var wasChecked;var wasEnabled;var wasShown;var baseBone;for(i=0;i<TRs.length;i++){baseBone=TRs[i].getAttribute("BB");wasChecked=TRs[i].getAttribute("H");wasEnabled=TRs[i].getAttribute("E");wasShown=(TRs[i].style.display!="none");if(baseBone&&baseBone.length>0&&!(microstrategy&&microstrategy.bone(baseBone))){continue;}var auxStr=TRs[i].getAttribute("DS");if(auxStr&&auxStr.length>0){newValue=eval(auxStr);if(newValue!=wasShown){menuUpdated=true;if(newValue){TRs[i].style.display="";}else{TRs[i].style.display="none";continue;}}}var auxStr=TRs[i].getAttribute("DC");if(auxStr&&auxStr.length>0){newValue=eval(auxStr)?"1":"0";if(newValue!=wasChecked){TRs[i].setAttribute("H",newValue);menuUpdated=true;}}auxStr=TRs[i].getAttribute("DE");if(auxStr&&auxStr.length>0){newValue=eval(auxStr)?"1":"0";if(newValue!=wasEnabled){TRs[i].setAttribute("E",newValue);menuUpdated=true;}}}if(menuUpdated){menu.setAttribute("C","0");}}function completeMenu(menuName){var oTD;var enabled;var menu=getObj(menuName);var TABLEs=menu.getElementsByTagName("TABLE");TABLEs[0].className="menu-block";var TDs=TABLEs[0].getElementsByTagName("TD");for(i=0;i<TDs.length;i++){if(TDs[i].id=="blank"){TDs[i].width="1";TDs[i].innerHTML='<IMG SRC="'+microstrategy.FOLDER_IMAGES+'1ptrans.gif" WIDTH="1" HEIGTH="1">';}else{if(TDs[i].id=="mnI"){TDs[i].align="middle";if(TDs[i].parentNode.getAttribute("E")=="1"){TDs[i].className="menu-item-image";}else{TDs[i].className="menu-item-image-disabled";}if(TDs[i].parentNode.getAttribute("H")=="1"){TDs[i].innerHTML='<IMG SRC="'+microstrategy.FOLDER_IMAGES+'MenuCheck.gif" style="width:12px;height:9px;">';}else{TDs[i].innerHTML='<IMG SRC="'+microstrategy.FOLDER_IMAGES+'1ptrans.gif">';}}else{if(TDs[i].id=="mnT"||TDs[i].id=="mnS"){TDs[i].noWrap=true;enabled=(TDs[i].parentNode.getAttribute("E")=="1");if(enabled){TDs[i].className="menu-item";}else{TDs[i].className="menu-item-disabled";}if(TDs[i].parentNode.getAttribute("AS")=="1"){if(enabled){TDs[i].className="menu-top-separator";}else{TDs[i].className="menu-top-separator-disabled";}}}else{if(TDs[i].id=="mnE"){TDs[i].width="12";TDs[i].align="right";enabled=(TDs[i].parentNode.getAttribute("E")=="1");if(TDs[i].parentNode.getAttribute("AS")=="1"){if(enabled){TDs[i].className="menu-top-separator";}else{TDs[i].className="menu-top-separator-disabled";}}if(TDs[i].parentNode.getAttribute("SB")=="1"){if(enabled){TDs[i].innerHTML='<IMG SRC="'+microstrategy.FOLDER_IMAGES+'MenuExpand.gif" WIDTH="8" HEIGTH="9">';}else{TDs[i].innerHTML='<IMG SRC="'+microstrategy.FOLDER_IMAGES+'MenuExpand_off.gif" WIDTH="8" HEIGTH="9">';}}else{TDs[i].innerHTML='<IMG SRC="'+microstrategy.FOLDER_IMAGES+'1ptrans.gif" WIDTH="12" HEIGTH="10">';}}}}}}menu.setAttribute("C","1");bCompleted=true;}function ShowLayer(iMenu,menuTarget){if(oTimer){clearTimeout(oTimer);}HideAllLayers();if(isNaN(iMenu)){if(specialMenuLayers==null){specialMenuLayers=[];}specialMenuLayers.push(iMenu);}var obj=getObj("mb"+iMenu);if(obj.getAttribute("C")!="1"){completeMenu("mb"+iMenu);}var objID=(menuTarget)?menuTarget:("menuHeader"+iMenu);var lY=getObjSumTop(objID)+getObjHeight(objID);var lX=getObjSumLeftScrolled(objID);var oMenu=getObj("mb"+iMenu);oMenu.style.zIndex=1000;positionContextMenu(lX,lY,oMenu);if(bIsIE4){togglePulldowns(oMenu,false);}asBranch[0]="mb"+iMenu;nBranchElements=1;oMenu.style.visibility="visible";bMenuOpen=true;}function hidePopupMenus(force){hideContextMenus();if(force||(bClickStyle&&bMenuOpen)){UnselectAllLayers();}}function UnselectAllLayers(){if(!bIsOver&&typeof (iMainMenus)!="undefined"){HideAllLayers();var menuHeader;for(var j=0;j<iMainMenus;j++){menuHeader=getObj("menuHeader"+j);if(menuHeader){if(menuHeader.getAttribute("E")=="0"){menuHeader.className=mstrMenuDisabledClass;}else{menuHeader.className=mstrMenuEnabledClass;}}}bMenuOpen=false;}}function HideAllLayers(){nBranchElements=0;if(!bIsOver&&typeof (iSubMenus)!="undefined"){for(var i=0;i<iSubMenus;i++){var sm=document.getElementById("mb"+i);if(sm){sm.style.visibility="hidden";}}if(specialMenuLayers!=null){for(var i=0;i<=specialMenuLayers.length;i++){document.getElementById("mb"+specialMenuLayers[i]).style.visibility="hidden";}specialMenuLayers=null;}if(bIsIE4){togglePulldowns(null,true);}}bMenuOpen=false;}function OverLayer(){if(oTimer){clearTimeout(oTimer);}bIsOver=true;}function OutLayer(){if(oTimer){clearTimeout(oTimer);}bIsOver=false;if(!bClickStyle){oTimer=setTimeout("UnselectAllLayers()",300);}}function hideSubMenu(sSubBlock,sParentBlock,sParentOption){var deleteElements=false;var nElements=0;for(i=0;i<nBranchElements;i++){if(deleteElements){var branchElement=document.getElementById(asBranch[i]);if(branchElement){if(bIsIE4){togglePulldowns(branchElement,true);}branchElement.style.visibility="hidden";}asBranch[i]=0;}if(asBranch[i]==sParentBlock){deleteElements=true;nElements=i+1;}}nBranchElements=nElements+1;asBranch[nBranchElements-1]=sSubBlock;}function menuOn(oMenu){if(oMenu.className!="menuDisabled"){oMenu.className="menu-row-selected";}}function menuOff(oMenu){if(oMenu.className!="menuDisabled"){oMenu.className="menu-row";}}function menuClick(oMenuItem,sMenu){var oMenu=typeof (sMenu)=="string"?document.getElementById(sMenu):sMenu;if(oMenu.modelID){var model=mstr.$obj(oMenu.modelID);if(model){var state=model.get("readyState");if(state&&state===mstr.Enum.Widget.READYSTATE.WAITING){return ;}}}if(oMenuItem.className!="menuDisabled"){if(oMenuItem.getAttribute("AC")=="true"){var sLink=oMenuItem.getAttribute("LI");if(sLink.length>0){bIsOverContext=false;oMenu.style.visibility="hidden";hideContextMenus();window.mstrSubmitLink=true;eval(sLink);}}else{bIsOverContext=false;oMenu.style.visibility="hidden";HideAllLayers();hideContextMenus();}}}function onCl(tdMenu){onMv(tdMenu);ShowLayer(tdMenu.getAttribute("ndx"));}function onMv(tdMenu){var disabled=tdMenu.getAttribute("E")=="0";var index=tdMenu.getAttribute("ndx");updateCheckedAndEnabledOptions("mb"+index);if(getObj("mb"+index).getAttribute("C")!="1"){completeMenu("mb"+index);}if(!disabled){if(bMenuOpen){activateHeader(index,"menu-header-selected","menu-header");ShowLayer(index);}else{activateHeader(index,"menu-header-selected","menu-header");}}}function onMo(tdMenu){var disabled=tdMenu.getAttribute("E")=="0";if(!disabled){if(!bMenuOpen){tdMenu.className="menu-header";}else{OutLayer("menu-header","menu-header-disabled");}}}function convertArrayToString(arrayObj){var value="";if(arrayObj){for(var i=0;i<arrayObj.length;i++){if(arrayObj[i]){value=value+sQuote+arrayObj[i]+sQuote+", ";}else{value=value+"null, ";}}value=value.substr(0,value.length-2);}return value;}function buildWidgetSubMenu(id,replaceAll,scope,command){completeMenu(id);if(!command){command="currentControl";}var oMenu=getObj(id);var tBody=oMenu.getElementsByTagName("tbody")[0];var tr=tBody.firstChild;var trId=tr.getAttribute("id");trId=trId.substr(0,trId.length-1);var widgets=microstrategy.getViewerBone().widgets;var needDivider=false;if(widgets){if(tBody.hasChildNodes()){for(var i=tBody.childNodes.length-1;i>=0;i--){if(replaceAll||tBody.childNodes[i].getAttribute("dyn_menu")){tBody.removeChild(tBody.childNodes[i]);}}}needDivider=!replaceAll&&tBody.hasChildNodes();var firstOptionAdded=false;for(var i=0;i<widgets.length;i++){var w=widgets[i];if(!scope||scope==w.scope){var wId=tr.getAttribute("id");var wTr=tr.cloneNode(true);wTr.setAttribute("id",trId+i);wTr.setAttribute("dyn_menu",true);wTr.className="ctrl"+w.tbClass;if(!firstOptionAdded&&needDivider){wTr.setAttribute("AS",1);firstOptionAdded=true;}var widgetData=microstrategy.SUBOBJTYPE_DOC_WIDGET+"|"+w.fqcn+";"+w.rslPath+";"+w.title+";"+w.previewImage+";"+w.isApp+";"+w.scope+";"+w.defaultDHTMLStyle;var js="microstrategy.bone('rwb_viewer').commands.exec('"+command+"', '"+widgetData+"');";if(command=="currentControl"){js+="microstrategy.eventManager.notifyOrphanBones('requestCurrentControlChange', '"+widgetData+"');";}wTr.setAttribute("JS",js);wTr.childNodes[2].innerHTML=w.title;tBody.appendChild(wTr);}}completeMenu(id);}}function addOndemandSubMenuItems(ondemandModelId,dynamicMenuKey,ondemandViewId,iMenu){if(ondemandModelId){var model=mstr.$obj(ondemandModelId);if(!model){return ;}var view=mstr.$obj(ondemandViewId);if(dynamicMenuKey){model.setCurrentDynamicMenuKey(dynamicMenuKey);}var gridKey="";if(microstrategy.EXECUTION_SCOPE==microstrategy.REPORT_EXECUTION){gridKey="Report";}else{var rwbBone=microstrategy.findBone(microstrategy.activeCXMenu);gridKey=rwbBone.objId;}model.setGridKey(gridKey);view.setMenuLevel(iMenu);view.setModel(model);model.execPopulate();}}function addDynamicMenus(iMenu,aMenuItems,avItems){setOndemandMenuItems(aMenuItems);var sContent=buildContextMenuRows(avItems,iMenu,null,null,true,null);var oMenu=getMenuDiv(aMenuItemsName+iMenu);if(sContent==""){if(oMenu.childNodes[0].rows&&oMenu.childNodes[0].rows.length==0){hideContextSubMenus(iMenu-1);}}else{addToExistingDivTable(oMenu,sContent);mstrMenuObj.adjustMenuPositionForClient(parseInt(oMenu.style.left,10),parseInt(oMenu.style.top,10),oMenu);}}function addToExistingDivTable(existingDiv,tableInnerHTML){var tmpDiv=document.createElement("div");tmpDiv.innerHTML="<TABLE>"+tableInnerHTML+"</TABLE>\n";var tempTable=tmpDiv.childNodes[0];var origTable=existingDiv.childNodes[0];if(origTable!=null&&(origTable.tBodies==null||origTable.tBodies.length==0)){origTable.appendChild(document.createElement("tbody"));}while(tempTable.rows.length>0&&(origTable!=undefined)){origTable.tBodies[0].appendChild(tempTable.rows[0]);}}function getNumTagsInDiv(divID,tag){var oMenu=getObj(divID);var trs=oMenu.getElementsByTagName(tag);if(trs!=null){return trs.length;}else{return 0;}}function setOndemandMenuItems(menuItems){aOndemandMenuItems=menuItems;}function removeProcessingMenuItem(iMenu){var oMenu=getMenuDiv(aMenuItemsName+iMenu);var rows=oMenu.getElementsByTagName("tr");if(rows!=null){var i=0;while(i<rows.length){if(rows[i]!=null&&"processing"==rows[i].getAttribute("id")){rows[i].parentNode.removeChild(rows[i]);}i++;}}}function addProcessingMenuItem(iMenu){var processingMsg=microstrategy.descriptors.getDescriptor("2901");var content="";var menuClass="menu-item";content+='<TR ID="processing" name="processing" HEIGHT="18" AC="true" ';content+='onMouseOver="clearTimeout(oSubCTimer); menuOn(this);';content+=" hideContextSubMenus("+iMenu+");";content+='" onMouseOut="menuOff(this);" ';if(bIsW3C){content+='STYLE="cursor: pointer;"';}else{content+='STYLE="cursor: hand;"';}content+=">\n";content+='<TD WIDTH="12" ALIGN="MIDDLE" CLASS="mstrContextMenuLeft">';content+='<IMG SRC="'+microstrategy.FOLDER_IMAGES+'treeLoading.gif" WIDTH="12" HEIGHT="12" HSPACE="0" VSPACE="0" ALT="" BORDER="0" ALIGN="ABSMIDDLE" />';content+="</TD>";content+='<TD WIDTH="1"><IMG SRC="'+microstrategy.FOLDER_IMAGES+'1ptrans.gif" HEIGHT="1" WIDTH="1" ALT="" BORDER="0"></TD>';content+='<TD ALIGN="LEFT" NOWRAP="1" ';content+=" class="+menuClass+" ";content+=">"+processingMsg+"&nbsp;&nbsp;<BR/></TD>";content+='<TD WIDTH="12" ALIGN="RIGHT" NOWRAP="1" ';content+=">";content+='<IMG SRC="'+microstrategy.FOLDER_IMAGES+'1ptrans.gif" WIDTH="12" HEIGHT="1" ALT="0" BORDER="0" />';content+="</TD>";content+="</TR>";var oMenu=getMenuDiv(aMenuItemsName+iMenu);addToExistingDivTable(oMenu,content);}