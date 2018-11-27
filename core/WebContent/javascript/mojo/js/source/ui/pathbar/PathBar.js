(function(){mstrmojo.requiresCls("mstrmojo.Container","mstrmojo._HasLayout","mstrmojo.DynamicClassFactory","mstrmojo.ListBase","mstrmojo._IsList","mstrmojo.array","mstrmojo.ui.pathbar.PathStarBurst","mstrmojo.ui.pathbar.PathNavigation","mstrmojo.ui.pathbar.PathAncestors","mstrmojo.ui.pathbar.PathExtraLinks","mstrmojo.ui.pathbar.PathHamburger","mstrmojo.ui.pathbar._PreAppExit","mstrmojo.mstr.search.SearchButton","mstrmojo.mstr.ui.CreateButton"," mstrmojo.ui._HasListTooltip");mstrmojo.ui.pathbar.List=mstrmojo.DynamicClassFactory.newComponent(mstrmojo.ListBase,[mstrmojo._IsList,mstrmojo.ui.pathbar._PreAppExit,mstrmojo.ui._HasListTooltip]);function isPathBarHidden(){var hidePathBar=false,hiddenSections=mstrApp.getPersistParams().hiddensections;if(hiddenSections){hidePathBar=mstrmojo.array.indexOf(hiddenSections.split(","),"path")>=0;}return hidePathBar;}function isEmptyObject(obj){var name;for(name in obj){return false;}return true;}function removeSeperatorsFromToolbarModel(tbModel){var items=tbModel&&tbModel.items,len=items&&items.length,i;for(i=len-1;i>=0;i--){if(isEmptyObject(items[i])){items.splice(i,1);}i--;}}mstrmojo.ui.pathbar.PathBar=mstrmojo.declare(mstrmojo.Container,[mstrmojo._HasLayout],{scriptClass:"mstrmojo.ui.pathbar.PathBar",markupString:'<div id="{@id}" class="mojoPath {@cssClass}" style="{@cssText}"><div id="mojoPath-starburst" class="mojoPath-starburst"></div><div id="mojoPath-navigation" class="mojoPath-navigation"></div><div id="mojoPath-path" class="mojoPath-path"></div><div id="mojoPath-toolbar" class="mojoPath-toolbar"></div><div id="mojoPath-create" class="mojoPath-create"></div><div id="mojoPath-search" class="mojoPath-search"></div><div id="mojoPath-extraLinks" class="mojoPath-extraLinks"></div></div>',markupSlots:{starburstNode:function(){return this.domNode.firstChild;},navigationNode:function(){return this.domNode.childNodes[1];},pathNode:function(){return this.domNode.childNodes[2];},toolbarNode:function(){return this.domNode.childNodes[3];},createNode:function(){return this.domNode.childNodes[4];},searchNode:function(){return this.domNode.childNodes[5];},extraLinksNode:function(){return this.domNode.lastChild;}},layoutConfig:{h:{starburstNode:"auto",navigationNode:"auto",pathNode:"auto",toolbarNode:"auto",createNode:"auto",searchNode:"auto",extraLinksNode:"auto"},w:{starburstNode:"auto",navigationNode:"auto",pathNode:"100%",toolbarNode:"auto",createNode:"auto",searchNode:"50px",extraLinksNode:"auto"}},getLayoutOffsets:function getLayoutOffsets(){return{h:2,w:0};},init:function init(props){if(isPathBarHidden()){this.visible=false;return ;}var tempArray=[];this._super(props);var mPathInfo=this.pathInfo,sbInfo=mPathInfo.sb,nbInfo=mPathInfo.nb,ptInfo=mPathInfo.pt,elInfo=mPathInfo.el,tbModel=mPathInfo.tbModelData&&mPathInfo.tbModelData.n;removeSeperatorsFromToolbarModel(tbModel);if(sbInfo&&sbInfo.length>0){tempArray.push({scriptClass:"mstrmojo.ui.pathbar.PathStarBurst",slot:"starburstNode",items:sbInfo});}if(nbInfo&&nbInfo.length>0){tempArray.push({scriptClass:"mstrmojo.ui.pathbar.PathNavigation",slot:"navigationNode",items:nbInfo});mstrApp.prevPageHref=nbInfo[1]&&nbInfo[1].href;}if(ptInfo&&ptInfo.length>0){tempArray.push({scriptClass:"mstrmojo.ui.pathbar.PathAncestors",slot:"pathNode",items:ptInfo,delimiter:mPathInfo.dlmt});}if(elInfo&&elInfo.length>0){tempArray.push({scriptClass:"mstrmojo.ui.pathbar.PathExtraLinks",alias:"pathExtraLinks",slot:"extraLinksNode",items:elInfo});}if(mstrmojo.resolveFeature("object-search")){tempArray.push({scriptClass:"mstrmojo.mstr.search.SearchButton",slot:"searchNode",searchProps:mstrConfig.searchProps});}if(tbModel&&tbModel.items&&tbModel.items.length>0){tempArray.push({scriptClass:"mstrmojo.ui.pathbar.PathHamburger",slot:"toolbarNode",items:tbModel.items});}if(this.showCreateButton){if(mstrmojo.resolveFeature("create-objects")||(mstrmojo.resolveFeature("dhtml")&&mstrmojo.resolveFeature("create-analysis"))){tempArray.push({scriptClass:"mstrmojo.mstr.ui.CreateButton",slot:"createNode",useConfigClickHandler:false,alignMenuToRight:true});}}this.addChildren(tempArray);}});}());