(function(){mstrmojo.requiresCls("mstrmojo.android.ui.ActionBar","mstrmojo.android.large.ui.NavTabs");function toggleNavTabs(visible){var prop="visible";this.tabs.set(prop,visible);this.title.set(prop,!visible);}mstrmojo.android.large.ui.ActionBar=mstrmojo.declare(mstrmojo.android.ui.ActionBar,null,{scriptClass:"mstrmojo.android.medium.ui.ActionBar",addChildren:function addChildren(children,idx,silent){children.push({scriptClass:"mstrmojo.android.large.ui.NavTabs",slot:"containerNode",alias:"tabs",cssClass:"mstrmojo-ActionBar-Nav",visible:false});this._super(children,idx,silent);this.tabs.attachEventListener("selectionChange",this.id,function(evt){var added=evt.added;if(!added){return ;}this.controller.jumpTo(evt.src.items[added[0]]);});},updateTitle:function updateTitle(title){toggleNavTabs.call(this,false);this._super(title);},setNavigation:function setNavigation(items,selectedIdx){toggleNavTabs.call(this,true);var tabs=this.tabs,idxs={};idxs[selectedIdx]=true;tabs.items=items;tabs.selectedIndex=selectedIdx;tabs.selectedIndices=idxs;tabs.refresh();},restoreNavigation:function restoreNavigation(){toggleNavTabs.call(this,true);},getNavList:function getNavList(){return this.tabs;}});mstrmojo.android.ui.ActionBar.adjustLayoutConfig({160:56,213:75,240:84,320:112},true);}());