(function(){mstrmojo.requiresCls("mstrmojo.android.SimpleList","mstrmojo.android._HasLingeringListSelections");var itemMarkup=[],$DOM=mstrmojo.dom,$STR=mstrmojo.string;mstrmojo.android.ui.FolderView=mstrmojo.declare(mstrmojo.android.SimpleList,[mstrmojo.android._HasLingeringListSelections],{scriptClass:"mstrmojo.android.ui.FolderView",allowTouchBubble:false,useSelectScroll:true,highlightOnSelect:true,hasEvenRows:true,listHooks:{select:function(el){el.style[$DOM.CSS3_TRANSITION_DURATION]=0;},unselect:function(el){el.style[$DOM.CSS3_TRANSITION_DURATION]="300ms";}},getItemMarkup:function(item){var desc=item.desc,isc=item.isc,markupType=((desc)?1:0)+((isc)?2:0);if(!itemMarkup[markupType]){var im="<h3>{@n}</h3>";if(desc){im+="<h4>{@desc}</h4>";}im+="<div><div><div></div></div></div>";itemMarkup[markupType]=this._super(item).replace("{@en@n}",im);}return itemMarkup[markupType];},getItemProps:function getItemProps(item,idx){var props=this._super(item,idx),desc=item.desc||"",cached=this.controller.isItemCached(item),disabled=!(cached||this.controller.isItemAvail(item,true));props.addCls("ty"+(item.st||2048));if(props.n){props.n=$STR.htmlAngles(props.n);}if(desc){props.desc=$STR.htmlAngles(desc);props.addCls("desc");}if(cached&&item.st!==2048){props.addCls("cached");}else{if(item.isc){props.addCls("isc");}}if(item.unread){props.addCls("new");}if(disabled){props.addCls("disabled");}return props;},canItemLinger:function canItemLinger(item){return this.controller.canItemLinger(item);},buildRendering:function buildRendering(){var rtn=this._super();var clearDiv=document.createElement("div");clearDiv.className="clear-me";this.itemsContainerNode.appendChild(clearDiv);return rtn;},preselectionChange:function preselectionChange(evt){var added=evt.added,removed=evt.removed;if(added){var item=this.items[added[0]];if(!this.controller.isItemAvail(item)){if(removed&&removed.length){this.select(removed,true);}return false;}}return true;},touchSelectBegin:function touchSelectBegin(touch){var idx=this.getItemIdxTouch(touch);if(idx>-1){var ctrl=this.controller;if(!ctrl.itemLongPressed||!ctrl.itemLongPressed(this.items[idx])){this._super(touch);}else{return false;}}return true;}});}());