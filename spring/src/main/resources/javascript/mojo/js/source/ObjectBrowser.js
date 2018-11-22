(function(){mstrmojo.requiresCls("mstrmojo.Button","mstrmojo.hash","mstrmojo.func","mstrmojo.css","mstrmojo.HBox","mstrmojo.Box","mstrmojo.DropDownButton","mstrmojo.Popup","mstrmojo.WidgetTree","mstrmojo.ObjectBrowserDataProvider","mstrmojo.OBList","mstrmojo.FishEyeContainer","mstrmojo.SearchBox2","mstrmojo.Booklet","mstrmojo.IncFetch","mstrmojo.chart.model.enums.EnumDSSObjectType","mstrmojo.mstr.ui.IncFetchOBList");var $HASH=mstrmojo.hash,$FUNC=mstrmojo.func,MTP=mstrmojo.meta.TP,CG="5CECE58CC1D549F890EB61C4DB2156A3",ME="E0CCB9CF22104A489CBE78D974AFD19E",$DSSOBJ_TYPES=mstrmojo.chart.model.enums.EnumDSSObjectType,$ARR=mstrmojo.array,$DOM=mstrmojo.dom,defaultGetWidget=function(me,info,m){var sic=me.scrollableIncFetch,scn=sic?"mstrmojo.mstr.ui.IncFetchOBList":"mstrmojo.OBList",props={scriptClass:scn,items:info.items,multiSelect:m};if(sic){props.browseConfig={blockBegin:info.bb,blockCount:info.bc,totalSize:info.sz,folderLinksContextId:me.folderLinksContextId,rootFolderID:info.did,browsableTypes:me.browsableTypes,browsableViewMedias:me.browsableViewMedias,dataProvider:me.dataProvider};props.onwaitingChange=function(){if(me.booklet){me.booklet.set("waiting",this.waiting);}};}var w=mstrmojo.insert(props);w.render();return w;},getWidget=function(me,info,m){var h=mstrmojo.ObjectBrowser.widgetHandler||defaultGetWidget;return h(me,info,m);},refreshCB={success:function(res){var me=this.ob,items=res.items,cp=me.pageCache[me.currentPage],currPageW=cp._w;cp.items=items;currPageW.set("items",items);this.ob=null;this.item=null;window.clearTimeout(me._btm);me.booklet.set("waiting",false);if(me.scrollableIncFetch&&currPageW.scrollNode){currPageW.initScroll();currPageW.updateScrollbars();}},failure:function(res){window.alert(res.getResponseHeader("X-MSTR-TaskFailureMsg"));this.ob.booklet.set("waiting",false);}},getFromCache=function(me,item,reverse){var step=reverse?-1:1,len=me.pageCache.length,cp;for(cp=me.currentPage+step;cp<len&&cp>=0;cp+=step){var nextItem=me.pageCache[cp];if(nextItem._k===item.k){return{steps:cp-me.currentPage,cache:nextItem};}}return null;},cachePage=function(me,item,w,info){var dp=me.currentPage+1,l=me.pageCache.length,x;for(x=dp;x<l;x++){me.pageCache[x]._w.destroy();delete me.pageCache[x].items;}me.pageCache=me.pageCache.slice(0,dp);info._w=w;info._k=item.k;me.pageCache[dp]=info;me.cacheChange();},checkCanGoUp=function(info){var ha=mstrmojo.hash.walk("anc.items.0.items",info);this.set("canGoUp",!(!info.pf||!ha));},openPage=function(me,item,info,cached,steps){delete me._btm;var w;if(!cached){w=getWidget(me,info,me.multiSelect);w.attachEventListener("change",me.id,"navigate");if(me.useDblSelect||me.useBothSglDblSelect){w.attachEventListener("dblclick",me.id,"dblselect");}}else{w=info._w;}me.obList=w;me.booklet.turn(w,steps>0);window.setTimeout(function(){me.onBrowsing=false;},300);if(!cached){cachePage(me,item,w,info);}me.set("currentFolder",info);me.set("currentPage",me.currentPage+steps);me.updateUpButton(info);if(me.scrollableIncFetch&&w.scrollNode){w.initScroll();w.updateScrollbars();}},fetch=function(me,item,cb){var info=getFromCache(me,item,false);info=info||getFromCache(me,item,true);if(!info){window.clearTimeout(me._btm);me._btm=window.setTimeout(function(){me.booklet.set("waiting",true);},300);cb.ob=me;cb.item=item;me.getDataProvider().fetchFolderContents(me,item,cb);}else{openPage(me,item,info.cache,true,info.steps);}},refresh=function(me,blockBegin,searchPattern,recursive){fetch(me,{fid:me.pageCache[me.currentPage].did,blockBegin:blockBegin,searchPattern:searchPattern,recursive:recursive},refreshCB);},fetchFolderCB={success:function(res){var me=this.ob;if(me){window.clearTimeout(me._btm);if(!res.items){res.items=[{did:"empty",n:"("+mstrmojo.desc(2210)+")",t:"e"}];}var up=function updateFolderDisplayName(items){var length=items.length,i;for(i=0;i<length;i++){var item=items[i];if(item.did===CG||item.did===ME){item.n=(item.did===CG)?mstrmojo.desc(8112):mstrmojo.desc(9277);}if(item.items){up(item.items);}}};if(res.did===CG||res.did===ME){res.n=(res.did===CG)?mstrmojo.desc(8112):mstrmojo.desc(9277);if(res.anc&&res.anc.items){up(res.anc.items);}}if(res&&res.items&&me.browsableViewMedias){var bvms={};$ARR.forEach(me.browsableViewMedias.split(","),function(vm){bvms[parseInt(vm,10)]=true;});res.items=$ARR.filter(res.items,function(obj){return(obj.t!==$DSSOBJ_TYPES.DssTypeDocumentDefinition)||bvms[obj.dvm];});}if(res&&res.items&&mstrApp&&mstrApp.isSingleTier){res.items=$ARR.filter(res.items,function(obj){return(obj.st!==772);});}if(res.did&&this.item.k!==res.did){this.item.k=res.did;}openPage(me,this.item,res,false,1);this.ob=null;this.item=null;}},failure:function(res){this.ob.booklet.set("waiting",false);if(this.ob.onError){this.ob.onError(res);}else{if(res.getResponseHeader){mstrmojo.alert(res.getResponseHeader("X-MSTR-TaskFailureMsg"));}else{mstrmojo.alert(res.message);}}},complete:function(){if(this.ob){this.ob.onBrowsing=false;}}},clearCache=function(me){var l=me.pageCache.length,x;for(x=0;x<l;x++){me.pageCache[x]._w.destroy();}me.pageCache=[];me.currentPage=-1;me.cacheChange();},browseFolder=function(me,item,callback){var cb=me.onBrowseFolder;if(cb){cb[0][cb[1]](item);}if(item&&parseInt(item.acg,10)===33){return ;}var opener={};if(item){opener.k=item.did;opener.fid=item.did;}else{if(me.rootFolderID){opener.k=me.rootFolderID;opener.fid=me.rootFolderID;}else{if(me.rootFolderType){opener.k=me.rootFolderType;opener.fty=me.rootFolderType;}else{if(me.folderLinksContextId){opener.k=me.folderLinksContextId;}}}}fetch(me,opener,$FUNC.wrapMethods(callback,$HASH.copy(fetchFolderCB)));},procNavigationTree=function(me,tree,scts){if(!scts){return tree;}var shCmpPath=me.showCompletePath,n=tree[0],ndid,lastLeaf;while(n){var scIx;for(scIx=scts.length-1;scIx>=0;scIx--){if(n.did===scts[scIx].did){scts.splice(scIx,1);n._isSc=true;}}lastLeaf=n;n._open=true;n=n.items;n=n&&n[0];if(!n){lastLeaf.lastLeaf=true;}}if(!shCmpPath){n=tree[0];while(n){if(n._isSc){tree[0]=n;break;}n=n.items;n=n&&n[0];}}return tree.concat(scts);},updateNavigator=function(me,tree,shcts){me._naviInfo=procNavigationTree(me,tree,shcts);};mstrmojo.ObjectBrowser=mstrmojo.declare(mstrmojo.Box,null,{scriptClass:"mstrmojo.ObjectBrowser",rootFolderType:null,rootFolderID:null,sId:null,closeOnSelect:true,browsableTypes:null,browsableViewMedias:null,includeObjectDesc:false,closeable:true,fishEyeVisible:false,searchVisible:true,upButtonVisible:false,currentFolder:null,pageCache:[],currentPage:-1,blockCount:50,canGoUp:true,folderLinksContextId:null,minSearchLength:2,showCompletePath:true,multiSelect:false,onCloseCB:null,onSelectCB:null,onBrowseFolder:null,scrollableIncFetch:false,useBothSglDblSelect:false,displaySaveLabel:false,useOldSearch:false,getDataProvider:function(){if(!this.dataProvider){this.dataProvider=mstrmojo.insert({scriptClass:"mstrmojo.ObjectBrowserDataProvider"});}return this.dataProvider;},markupMethods:{onvisibleChange:function(){this.domNode.style.display=this.visible?"block":"none";}},children:[{scriptClass:"mstrmojo.HBox",alias:"titleBar",cssClass:"mstrmojo-OB-titleTable",children:[{alias:"saveLabel",scriptClass:"mstrmojo.Label",cssClass:"msrmojo-save-label",text:mstrmojo.desc(3178,"Save in:"),bindings:{visible:"this.parent.parent.displaySaveLabel"}},{alias:"title",scriptClass:"mstrmojo.DropDownButton",cssClass:"mstrmojo-FormatEditor-DropDownButton",cssText:"margin:0px;",popupRef:{scriptClass:"mstrmojo.Popup",contentNodeCssClass:"mstrmojo-OBNavigatorPopup",cssText:"position:relative;",slot:"popupNode",locksHover:true,onOpen:function(){var ob=this.opener.parent.parent,t=this.tree,its=ob._naviInfo,extraDDItems=this.parent.parent.parent.extraDDItems;if(t.items!==its){t._pup=this;this.ob=ob;if(extraDDItems){$ARR.forEach(extraDDItems,function(i){i.isExtra=true;});its=its.concat(extraDDItems);}t.set("items",its);}},children:[{alias:"tree",scriptClass:"mstrmojo.WidgetTree",itemIdField:"did",itemFunction:function(item,idx,w){var i=mstrmojo.WidgetTree.prototype.itemFunction(item,idx,w);if(item.isExtra){if(item.cssClass){i.cssClass=item.cssClass;}i.onmousedown=item.onmousedown||mstrmojo.emptyFn;return i;}if(item._open){i.state=1;}i._ll=!!item.lastLeaf;i._pup=w._pup;i.onmousedown=function(evt){var t=mstrmojo.dom.eventTarget(evt.hWin,evt.e),p=this._pup;if(t===this.domNode||t===this.textNode){if(!this._ll){browseFolder(p.ob,this.data);}p.close();}};i.markupMethods=$HASH.copy(i.markupMethods);i.markupMethods.onstateChange=function(){var s=this.data.items?this.state:0;this.stateNode.className="mstrmojo-TreeNode-state "+({0:"closed",1:"opened",2:"leaf"}[s]||"closed");this.itemsContainerNode.style.display=(s===1)?"block":"none";};i.useRichTooltip=true;var oldpbr=i.postBuildRendering;i.postBuildRendering=function(){if(oldpbr){oldpbr.call(i);}if(i.textNode.parentNode.clientWidth){i.textNode.style.width=(i.textNode.parentNode.clientWidth-20)+"px";}};i.premouseover=function(evt){if(this.useRichTooltip){var tn=this.textNode;if(tn.clientWidth<tn.scrollWidth){var position=$DOM.position(tn);this.richTooltip={areaId:this.id,cssClass:"vi-regular vi-tooltip-C",contentNodeCssClass:"regular-unitlist-tooltips",posType:mstrmojo.tooltip.POS_TOPLEFT,content:this.data[this.itemDisplayField],top:position.y-2,left:position.x+position.w+6};}else{this.richTooltip=null;}mstrmojo.dom.stopPropogation(evt.hWin,evt.e);}return true;};return i;}}]}},{alias:"upButton",scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-OBListItemIcon up",title:mstrmojo.desc(1152,"Up One Level"),onclick:function(){this.parent.parent.goUp();},bindings:{enabled:"this.parent.parent.canGoUp",visible:"this.parent.parent.upButtonVisible"}},{alias:"closebtn",scriptClass:"mstrmojo.Button",iconClass:"mstrmojo-OBCloseButton",title:mstrmojo.desc(2102,"Close"),bindings:{visible:"this.parent.parent.closeable"},onclick:function(){this.parent.parent.close();}}]},{alias:"fishEye",scriptClass:"mstrmojo.FishEyeContainer",cssText:"width:100%",bindings:{visible:"this.parent.fishEyeVisible"}},{alias:"searchUpBar",scriptClass:"mstrmojo.HBox",cssClass:"searchBox",children:[{alias:"obSearchBox",scriptClass:"mstrmojo.SearchBox2",cssClass:"mstrmojo-charcoalbox mstrmojo-dxsprite",cssText:"margin: 3px 0; ",contentWidget:mstrmojo.all.obList,taskId:"searchMetadata",searchIncFetch:true,enableMatchCase:false,forceResetCache:true,bindings:{minSearchLength:"this.parent.parent.minSearchLength",quickSearch:"this.parent.parent.quickSearch"},serverRequest:function(params,callback){this.parent.parent.getDataProvider().serverRequest(params,callback);},preFetch:function(){this.objectTypes=this.parent.parent.browsableTypes||this.objectTypes;this.parent.parent.booklet.set("waiting",true);},postFetch:function(){this.parent.parent.booklet.set("waiting",false);},onUpdateSearchParams:function onUpdateSearchParams(params){var ob=this.parent.parent,sid=ob.sId;if(sid){params.sessionState=sid;}if(ob.useOldSearch){params.quickSearch=0;params.nameWildcards=1;params.sortKey=6;}}}],bindings:{visible:"this.parent.searchVisible"}},{scriptClass:"mstrmojo.Booklet",cssClass:"mstrmojo-OB-booklet",alias:"booklet",hasAnimation:false,bindings:{scrollableIncFetch:"this.parent.scrollableIncFetch"}},{alias:"obIncFetch",scriptClass:"mstrmojo.IncFetch",height:"17px",cssText:"height:0px;overflow:hidden;",visible:false,np:0,cp:0,ds:{f:mstrmojo.desc(4046,"First"),p:mstrmojo.desc(1058,"Previous"),n:mstrmojo.desc(1059,"Next"),l:mstrmojo.desc(4049,"Last"),pgs:mstrmojo.desc(5972,"## of ### pages"),gt:mstrmojo.desc(5878,"Go to:"),v:mstrmojo.desc(6079,"This field should be # between ## and ###.")},onvisibleChange:function(evt){var h=parseInt(this.height,10),show=this.np>1,props={target:this.domNode,props:{height:{start:(show?0:h),stop:(show?h:0),suffix:"px"}},onEnd:function(){if(show){this.target.style.overflow="visible";}}},fx=new mstrmojo.fx.AnimateProp(props);this.domNode.style.overflow="hidden";mstrmojo.css.toggleClass(this.parent.domNode,"show-inc-fetch",this.visible);fx.play();},onifsChange:function(evt){var old_np=this.np;mstrmojo.hash.copy(evt.value,this);if(this.np>1){this.children=null;this.refresh();}if((old_np<=1&&this.np>1)||(old_np>1&&this.np<=1)||(old_np===0&&this.np>0)){this.set("visible",this.np>1);}this.cssText="";}}],destroy:function destroy(){clearCache(this);if(this._super){this._super();}},postBuildRendering:function(){if(this._super){this._super();}if(this.fishEye&&this.fishEyeVisible){this.fishEye.attachEventListener("selectedIndexChange",this.id,"onFishEyeChange");}var sb=this.searchUpBar;if(sb&&sb.obSearchBox&&this.searchVisible){this.obSearchBox=this.searchUpBar.obSearchBox;this.obSearchBox.attachEventListener("itemsChange",this.id,"onSearchItemsChange");var contentWidget=this.obSearchBox.contentWidget||this.obSearchBox;if(!this.scrollableIncFetch){contentWidget.attachEventListener("ifsChange",this.id,function(evt){if(!this.scrollableIncFetch){this.obIncFetch.set("ifs",evt.value);}});}}if(!this.scrollableIncFetch&&this.obIncFetch){var incFetch=this.obIncFetch;incFetch.attachEventListener("fetch",this.id,function(evt){incFetch.cp=evt.v;incFetch.children=null;incFetch.refresh();refresh(this,(evt.v-1)*this.blockCount+1,this.searchVisible?this.obSearchBox.inputNode.value:"",1);});}mstrmojo.css.addClass(this.domNode,"mstrmojo-ObjectBrowser");},onSearchItemsChange:function(evt){var items=evt.value,currPage=this.pageCache[this.currentPage]._w;if(!items||items.length===0){items=[{did:"empty",n:"("+mstrmojo.desc(2210,"")+")",t:"e"}];}else{if(this.browsableViewMedias){var bvms={};$ARR.forEach(this.browsableViewMedias.split(","),function(vm){bvms[parseInt(vm,10)]=true;});items=$ARR.filter(items,function(obj){return(obj.t!==$DSSOBJ_TYPES.DssTypeDocumentDefinition)||bvms[obj.dvm];});}}currPage.set("items",items);},navigate:function(evt){var src=evt.src,item=src.selectedItem,m=this.multiSelect,items=m&&src.getSelectedItems(),me=this,nAdded=evt.added&&evt.added.length,nRemoved=evt.removed&&evt.removed.length,singleSelecting=m?items.length===1&&(!nRemoved||nAdded):!!item;if(singleSelecting&&item.did==="empty"){return ;}if(singleSelecting&&parseInt(item[MTP],10)===8){if(!this.onBrowsing){this.onBrowsing=true;browseFolder(this,item);}}else{if((item&&(!this.useDblSelect||this.useBothSglDblSelect))||items){this.select(m?items:item);}}},browseFolder:function(did,n){browseFolder(this,{did:did,n:n});},onFishEyeChange:function(evt){this.goToPage(evt.value);},goToPage:function(index){if(index<this.pageCache.length&&index!==this.currentPage){var direction=index>this.currentPage,info=this.pageCache[index];this.set("currentPage",index);this.booklet.turn(info._w,direction);this.set("currentFolder",info);checkCanGoUp.call(this,info);}},oncurrentPageChange:function(evt){if(this.fishEye){this.fishEye.setSelectedIndex(evt.value);}var pageCache=this.pageCache[this.currentPage];this.titleBar.title.set("text",mstrmojo.string.encodeHtmlString(pageCache.n));if(this.searchVisible&&this.obSearchBox){this.obSearchBox.set("rootCacheItems",pageCache.items||[]);this.obSearchBox.set("totalSize",pageCache.sz);this.obSearchBox.set("rootID",pageCache.did);this.obSearchBox.clearSearch();}if(!this.scrollableIncFetch&&this.obIncFetch){this.obIncFetch.set("ifs",{np:Math.floor(pageCache.sz/pageCache.bc)+((pageCache.sz%pageCache.bc>0)?1:0),cp:Math.floor(pageCache.bb/pageCache.bc)+((pageCache.bb%pageCache.bc>0)?1:0)});}},cacheChange:function(){if(this.fishEye&&this.fishEyeVisible){this.fishEye.setItems(this.pageCache);}},browse:function(params,cb){$HASH.copy(params,this);if(this.searchVisible&&this.obSearchBox){this.obSearchBox.clear();}clearCache(this);browseFolder(this,undefined,cb);},close:function(){var ctx=this.ctx||this,cb=ctx.onCloseCB;if(cb){cb[0][cb[1]]();}ctx.set("visible",false);},select:function(item){var cb=this.onSelectCB;if(cb){cb[0][cb[1]](item);}if(this.closeOnSelect){this.close();}},dblselect:function dblselect(evt){var item=evt&&evt.src.selectedItem;if(!item||(item&&item.did==="empty")||item[MTP]===8){return ;}if(this.useBothSglDblSelect){var cb=this.onDblSelectCB;if(cb){cb[0][cb[1]](item);}if(this.closeOnSelect){this.close();}}else{this.select(item);}},goUp:function(){if(this.canGoUp){browseFolder(this,{did:this.currentFolder.pf});}},updateUpButton:function updateUpButton(info){checkCanGoUp.call(this,info);},oncurrentFolderChange:function(evt){var cf=evt.value;updateNavigator(this,cf.anc.items,cf.sc);},refreshContent:function(blockBegin){refresh(this,blockBegin);},onError:null,onheightChange:function(){var arr=["titleBar","fishEye","searchUpBar","obIncFetch"],h=0,i;for(i in arr){h+=parseInt(this[arr[i]].domNode.offsetHeight,10);}this.booklet.set("height",parseInt(this.height,10)-h+"px");}});}());