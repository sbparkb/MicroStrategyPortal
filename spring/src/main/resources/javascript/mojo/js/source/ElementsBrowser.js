(function(){mstrmojo.requiresCls("mstrmojo.array","mstrmojo.hash","mstrmojo.Container","mstrmojo.Box","mstrmojo.List","mstrmojo.SearchBox2","mstrmojo.WaitIcon","mstrmojo.IncFetch");var _A=mstrmojo.array,_H=mstrmojo.hash;mstrmojo.ElementsBrowser=mstrmojo.declare(mstrmojo.Box,null,{scriptClass:"mstrmojo.ElementsBrowser",cssClass:"mstrmojo-ElementBrowser",rootCached:null,attributeID:null,onOK:null,onUpdateBrowseElementsParams:mstrmojo.emptyFn,init:function(props){this._super(props);this.rootCached={};},postBuildRendering:function(){if(this._super){this._super();}var incFetch=this.ebIncFetch,searchbox=this.ebSearchBox,list=this.ebList;incFetch.attachEventListener("fetch",searchbox.id,function(evt){incFetch.cp=evt.v;incFetch.children=null;incFetch.refresh();this.fetchPage(evt.v-1);});searchbox.attachEventListener("ifsChange",incFetch.id,function(evt){var old_np=this.np;_H.copy(evt.value,this);if(this.np>1){this.children=null;this.refresh();}if(old_np<=1&&this.np>1||old_np>1&&this.np<=1||old_np===0&&this.np>0){this.set("visible",this.np>1);}});searchbox.attachEventListener("itemsChange",list.id,function(evt){this.set("items",evt.value||[]);});},initBrowser:function(){var searchbox=this.ebSearchBox,attributeID=this.attributeID;searchbox.set("rootID",attributeID);searchbox.clear();searchbox.searchPattern="";if(attributeID&&!this.rootCached[attributeID]){searchbox.set("items",[]);searchbox.blockBegin=1;searchbox.fetch();this.rootCached[attributeID]=true;}else{if(attributeID){searchbox._notifyContentWidget(searchbox.searchCache[attributeID][attributeID]);this.ebList.updateSelections();}}},children:[{alias:"ebSearchBox",scriptClass:"mstrmojo.SearchBox2",cssClass:"mstrmojo-ElementsBrowser-SearchBox",taskId:"browseElements",quickSearch:true,getRootID:function(){this.rootID=this.parent.attributeID;},onUpdateSearchParams:function(params){this.parent.onUpdateBrowseElementsParams(params);}},{alias:"ebList",scriptClass:"mstrmojo.List",cssClass:"mstrmojo-ELementsBrowser-List",itemIdField:"v",allowUnlistedValues:false,itemMarkup:'<div class="mstrmojo-bullet"><div class="mstrmojo-ebIcons ae"><div class="mstrmojo-text">{@n}</div></div></div>',updateSelections:function(){var eb=this.parent,sel=eb.selectedItems;if(sel){this.initializing=true;this.clearSelect(false);this.setSelectedItems(sel,false);this.initializing=false;}},onitemsChange:function(){this.updateSelections();},onchange:function(evt){if(this.initializing){return ;}var its=this.items,eb=this.parent,sel=eb.selectedItems,it,idx;for(var i=0,r=evt.removed,rlen=r&&r.length;i<rlen;i++){it=its[r[i]];idx=_A.find(sel,this.itemIdField,it[this.itemIdField]);if(idx>-1){sel.splice(idx,1);}}for(var j=0,a=evt.added,alen=a&&a.length;j<alen;j++){it=_H.clone(its[a[j]]);sel.push(it);}},multiSelect:true,selectionPolicy:"toggle"},{alias:"ebIncFetch",scriptClass:"mstrmojo.IncFetch",cssClass:"mstrmojo-ElementsBrowser-IncFetch",height:"20px",np:0,cp:0,ds:{f:mstrmojo.desc(4046,"First"),p:mstrmojo.desc(1058,"Previous"),n:mstrmojo.desc(1059,"Next"),l:mstrmojo.desc(4049,"Last"),pgs:mstrmojo.desc(5972,"## of ### pages"),gt:mstrmojo.desc(5878,"Go to:"),v:mstrmojo.desc(6079,"This field should be # between ## and ###.")},onvisibleChange:function(evt){this.domNode.style.display=evt.value?"block":"none";}}]});})();