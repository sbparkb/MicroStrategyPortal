mstrMenuTabsImpl.prototype=new mstrBoneImpl();mstrMenuTabsImpl.prototype.MIN_SUPPORTED_WIDTH=200;mstrMenuTabsImpl.prototype.onload=function(){try{mstrBoneImpl.prototype.onload.call(this);var b=microstrategy.bone(this.id),i,that=this;this.tabs=microstrategy.findChildrenWithAtt(this.elem,"div","ty","tab");this.content=microstrategy.findChildrenWithAtt(this.elem,"div","ty","content")[0];this.extraOptions=microstrategy.findChildrenWithAtt(this.elem,"div","ty","extraOpt")[0];this.togglers=microstrategy.findChildrenWithAtt(this.elem,"span","ty","toggler");for(i=0,len=this.tabs.length;i<len;i++){this.tabs[i].onclick=function(e){b.onclick(e);};this.tabs[i].setAttribute("o",i);}for(i=0,len=this.togglers.length;i<len;i++){this.togglers[i].onclick=function(e){b.onclick(e);};}this.togglers=microstrategy.findChildrenWithAtt(this.elem,"span","ty","toggler");this.btnToggler=document.getElementById("menuToggler");if(this.btnToggler){this.btnToggler.onclick=function(e){b.toggleSidebar();};}this.updateCreateButton("mscld-create");this.leftBar=document.getElementById("td_mstrWeb_dockLeft");this.leftTB=document.getElementById("leftToolbar");this.leftTBBone=microstrategy.bones.leftToolbar;this.stats=document.getElementById("dhtml_statistics");this.visible=microstrategy.getCookieSetting("lTbar")===undefined?true:microstrategy.getCookieSetting("lTbar")=="1";}catch(err){microstrategy.errors.log(err);return false;}};mstrMenuTabsImpl.prototype.onpostload=function(){try{this.resize();}catch(err){microstrategy.errors.log(err);return false;}};mstrMenuTabsImpl.prototype.onwinresize=function(){try{this.resize();}catch(err){microstrategy.errors.log(err);return false;}};mstrMenuTabsImpl.prototype.resize=function(){try{var leftTB=this.leftTB,leftTBBone=this.leftTBBone,bm=mstr.utils.BoxModel,node=this.content,menuToggler=this.btnToggler,quickLaunch=this.quickLaunch,extraOptions=this.extraOptions;if(node){window.setTimeout(function(){if(extraOptions){extraOptions.style.display="block";}var extraOptionsHeight=(extraOptions&&extraOptions.clientHeight)||0;node.style.height=Math.max(leftTB.clientHeight-node.offsetTop-extraOptionsHeight,0)+"px";if(mstr.utils.ISIE7){node.style.minHeight=node.style.height;}var ftBone=microstrategy.bones.tree_ftb_FolderTreeView;if(ftBone){ftBone.resize();}var folderBone=microstrategy.bones.folderAllModes;if(folderBone){folderBone.onwinresize();}leftTBBone.adjustDragHandles(leftTB.clientHeight,microstrategy.getCookieSetting("ltW")||leftTB.clientWidth);},400);}}catch(err){microstrategy.errors.log(err);return false;}};mstrMenuTabsImpl.prototype.onclick=function(e){try{if(!e){e=window.event;}var src=getEventTarget(e),target,css=src.className,CSS_CLASS_COLLAPSED=" collapsed";if(src.getAttribute("ty")==="toggler"){target=document.getElementById(src.getAttribute("target"));src.className=css.replace(CSS_CLASS_COLLAPSED,"");if(target&&target.style){if(target.style.height==="0px"){target.style.height=src.getAttribute("ht")==="auto"?"auto":(getObjHeight(target.firstChild)+"px");}else{target.style.height="0px";src.className+=CSS_CLASS_COLLAPSED;}}}}catch(err){microstrategy.errors.log(err);return false;}};mstrMenuTabsImpl.prototype.ondocumentclick=function(e){e=e||window.event;var target=getEventTarget(e);onDocumentClick(e);};mstrMenuTabsImpl.prototype.toggleSidebar=function(){try{this.visible=!this.visible;this.resizeSidebar();}catch(err){microstrategy.errors.log(err);return false;}};mstrMenuTabsImpl.prototype.resizeSidebar=function(width){var show=this.visible,css=this.elem.className,CSS_CLASS_COLLAPSED=" collapsed";this.elem.className=css.replace(CSS_CLASS_COLLAPSED,"");width=(width&&(width+"px"));var leftBar=this.leftBar,leftTB=this.leftTB,stats=this.stats,newWidth;if(!show){this.elem.className+=CSS_CLASS_COLLAPSED;if(leftBar){this.leftBarWidth=width||leftBar.style.width;newWidth=leftTB.style.width=leftBar.style.width="34px";}var recentsPopup=document.getElementById("mstrRecentsPopup");toggleRecentsPopup(true,recentsPopup);}else{newWidth=leftTB.style.width=leftBar.style.width=Math.max(parseInt(width||this.leftBarWidth||0,10),this.MIN_SUPPORTED_WIDTH)+"px";}if(stats){stats.style.marginLeft=newWidth||"0";}microstrategy.updateCookieSetting("ltW",parseInt(newWidth,10));microstrategy.updateCookieSetting("lTbar",show?"1":"0");this.resize();};mstrMenuTabsImpl.prototype.updateCreateButton=function(buttonId){function showCreateMenu(){var $M=mstrmojo,createButtton=$M.all[buttonId];if(!createButtton){createButtton=$M.insert({id:buttonId,scriptClass:"mstrmojo.mstr.ui.CreateButton",placeholder:buttonId});createButtton.render();}}if(typeof mstrmojo=="undefined"||!mstrmojo.mstr.ui.CreateButton){microstrategy.jsLoader.get("mojo-starburst.js",true,showCreateMenu,false);}else{showCreateMenu();}};mstrMenuTabsImpl.prototype.updateCssClass=function(element,className,add){element.className=element.className.replace(className,"")+(add?" "+className:"");};function mstrMenuTabsImpl(id){this.inherits=mstrBoneImpl;this.inherits(id);delete this.inherits;return this;}