(function(){mstrmojo.requiresCls("mstrmojo.dom","mstrmojo.css","mstrmojo.fx","mstrmojo.xhr","mstrmojo.CheckBox","mstrmojo.TextBox","mstrmojo.Label","mstrmojo.Popup","mstrmojo._HasSuggestion","mstrmojo.SuggestionList");mstrmojo.requiresDescs(10,517,518,2105,2106,2528);var $C=mstrmojo.css,$D=mstrmojo.dom,$S=mstrmojo.string;var DURATION=300;var SUPPORTED_SUBTYPE="3072,1024,1027,1028,47,257,3585,3586,3587";var SUPPORTED_TYPE="12, 4, 47, 1, 14";var ITEMS={12:{n:mstrmojo.desc(518,"Attribute"),t:12,st:"3072"},4:{n:mstrmojo.desc(517,"Metric"),t:4,st:"1024,1027,1028"},47:{n:mstrmojo.desc(2106,"Consolidation"),t:47},1:{n:mstrmojo.desc(2105,"Custom Group"),t:1,st:"257",st_icon:257},14:{n:mstrmojo.desc(2528,"Hierarchy"),t:14,st:"3585,3586,3587"}};var buildObjectTypes=function(ots){return mstrmojo.array.map(ots,function(t){return ITEMS[t].st||ITEMS[t].t;}).join(",");};mstrmojo.RQSBSuggestionList=mstrmojo.declare(mstrmojo.SuggestionList,null,{getItemMarkup:function(item,idx){return this.parent.opener.itemRenderer(item,idx,this);},getItemProps:function getItemProps(item,idx){return{};}});function slideProp(w,target,prop,start,stop,onEnd,ease,extraProps){var props={duration:(w&&w.duration)||DURATION,target:target,onEnd:function(){if(onEnd){onEnd();}},props:{}};props.props[prop]={ease:ease,start:parseInt(start,10),stop:parseInt(stop,10),suffix:"px"};props=mstrmojo.hash.copy(extraProps,props);var fx=(w&&w.fx)||new mstrmojo.fx.AnimateProp(props);if(w){w.fx=w.fx||fx;}mstrmojo.hash.copy(props,fx);fx.play();}var pathParser=function(pathXmlString){var parser,xmlDoc;if(window.DOMParser){parser=new window.DOMParser();xmlDoc=parser.parseFromString(pathXmlString,"text/xml");}else{xmlDoc=new ActiveXObject("Microsoft.XMLDOM");xmlDoc.async="false";xmlDoc.loadXML(pathXmlString);}var pathNode=xmlDoc.getElementsByTagName("path")[0],childNodes=pathNode.childNodes,path="";if(childNodes){var i,len;for(i=0,len=childNodes.length;i<len;i++){var vNode=childNodes[i].childNodes&&childNodes[i].childNodes[0];if(vNode){path+=$S.escape4HTMLText(vNode.nodeValue)+(i<len-1?"> ":"");}}}return path;};var _allIndices={};mstrmojo.ReportQuickSearchBox=mstrmojo.declare(mstrmojo.TextBox,[mstrmojo._HasSuggestion,mstrmojo._HasChildren],{markupString:'<div id={@id} class="mstrmojo-SearchBox2-Wrapper {@cssClass}" style="display:inline-block; Xoverflow:hidden;{@cssText};"><div class="mstrmojo-SearchBox2" mstrAttach:click ><span class="mstrmojo-SearchBox2-search {@shortCssClass}" id="{@id}sbSearch"></span><span class="mstrmojo-SearchBox2-down" id="{@id}sbDown" style="{@cssTextShowOptions}"></span><input class="mstrmojo-SearchBox2-input" type="text" autocomplete="off" id="{@id}sbInput" style="width:{@width};" mstrAttach:focus,keydown,keyup,blur,paste,cut /><span class="mstrmojo-SearchBox2-right" style="width:{@rWidth};"><span class="mstrmojo-SearchBox2-clear" id="{@id}sbClear" ></span><span class="mstrmojo-SearchBox2-spinner" id="{@id}sbSpinner"></span></span></div></div>',markupSlots:{inputNode:function(){return this.domNode.firstChild.firstChild.nextSibling.nextSibling;},searchNode:function(){return this.domNode.firstChild.firstChild;},downNode:function(){return this.domNode.firstChild.firstChild.nextSibling;},spinnerNode:function(){return this.domNode.firstChild.lastChild.lastChild;},clearNode:function(){return this.domNode.firstChild.lastChild.firstChild;},containerNode:function(){return this.domNode;}},cssDisplay:"inline-block",suggestionListClass:"mstrmojo.RQSBSuggestionList",init:function init(props){this._super(props);this.markupMethods=mstrmojo.hash.copy({onwidthChange:mstrmojo.emptyFn},mstrmojo.hash.copy(this.markupMethods));this.supportedObjectTypes=(mstrApp.gridSearchObjectTypes||SUPPORTED_TYPE).replace(/\s/g,"").split(",");this.objectType=buildObjectTypes(this.supportedObjectTypes);for(var i=0;i<this.supportedObjectTypes.length;i++){_allIndices[i]=true;}},preBuildRendering:function(){if(this._super){this._super();}this.cssTextShowMC=this.enableMatchCase?"":"display: none;";this.cssTextShowOptions=this.enableOptions?"":"display: none;";this.shortCssClass=this.enableOptions?"":"short";this.markupMethods=mstrmojo.hash.copy({oncssClassChange:function(){}},mstrmojo.hash.copy(this.markupMethods));var me=this;this.suggestionPopup.cssClass="mstrmojo-ReportQuickSearch-Suggest";this.suggestionPopup._set_opener=function(n,v){this.opener=v;if(v===null){return false;}return true;};var createScrollButton=function scrollBtn(props){return({scriptClass:"mstrmojo.Label",markupString:'<div id="{@id}" class="mstrmojo-Label scroller {@cssClass}" style="{@cssText}" mstrAttach:mouseover,mouseout></div>',alias:props.alias,text:props.label,cssClass:props.css,step:props.step,scrollable:true,slot:"editorNode",onmouseover:function(){var w=this,pop=this.parent,scrollNode=pop.containerNode,list=pop.list,step=w.step,alias=w.alias,isFB=alias==="down";this.tmr=window.setInterval(function(){w.parent.opener.hidePath();me.blockBegin=(me._last_hit&&me._last_hit.items||me.suggestionItems||[]).length+1;var hasMore=(me.blockBegin<me.sz);var itemHeight=20,mh=5*itemHeight,sh=10*itemHeight,rh=me.suggestionItems.length*itemHeight-scrollNode.scrollTop-sh,margin=3;if(!isFB||isFB&&me.spinnerStatus==false){var old=scrollNode.scrollTop;scrollNode.scrollTop+=step;if(old==scrollNode.scrollTop){w.parent.down.set("scrollable",hasMore||rh>margin);return ;}}else{return ;}w.parent.up.set("scrollable",scrollNode.scrollTop>0);w.parent.down.set("scrollable",hasMore||rh>margin);if(isFB&&me.spinnerStatus==false){var start=rh<mh;if(start&&hasMore){me._last_hit=null;me._request_pattern=null;me.onvalueChange();}}},100);},onmouseout:function(){if(this.tmr){clearInterval(this.tmr);}},bindings:{visible:function(){return this.parent.opener.suggestionItems.length>me.viewableCount;},infLoading:function(){return this.parent.opener.spinnerStatus;}},onscrollableChange:function(evt){if(this.domNode){this.domNode.className=this.domNode.className.replace(/ disabled/g,"")+(this.scrollable?"":" disabled");}},oninfLoadingChange:function(evt){if(this.domNode&&this.alias=="down"){this.domNode.className=this.domNode.className.replace(/ loading/g,"")+(this.infLoading?" loading":"");}},postBuildRendering:function(){if(this._super){this._super();}var up=this.parent.up,scrollNode=this.parent.containerNode;window.setTimeout(function(){up.set("scrollable",scrollNode.scrollTop>0);},200);}});};this.suggestionPopup.children.push(createScrollButton({alias:"up",label:"",css:"up",step:-20}),createScrollButton({alias:"down",label:"",css:"down",step:20}));},quicksearch:false,searchDelay:300,enableMatchCase:false,enableOptions:false,targetWidget:null,targetPlaceHolder:null,suggestCount:1000,REQUEST_THRESHOLD:1000,blockCount:20,viewableCount:10,showScrollArrow:true,matchCase:false,hasUserInput:false,value:"",emptyText:mstrmojo.desc(10,"search"),width:"35px",maxWidth:"130px",expanded:false,onfocus:function(){if(!this.hasUserInput&&!this.expanded){if(this.fx&&this.fx.isPlaying){this.fx.cancel();}slideProp(this,this.inputNode,"width",parseInt(this.width,10),parseInt(this.maxWidth,10));this.expanded=true;}},blur:function(evt){if(!this.hasUserInput){var start=parseInt(this.inputNode.value==this.emptyText?this.width:this.maxWidth,10);slideProp(this,this.inputNode,"width",start,parseInt(this.width,10));this.expanded=false;}},onclick:function(evt){var hWin=evt.hWin,e=evt.e||hWin.event,tgt=e.target||e.srcElement,id=tgt&&tgt.id;switch(id.replace(this.id,"")){default:if(this.enableOptions){this.optionsVisible=!this.optionsVisible;if(this.oldObjectType!=this.objectType){var v=this.value;this.value=null;this.set("value",v);}this.oldObjectType=this.objectType;}$D.preventDefault(hWin,e);$D.stopPropogation(hWin,e);break;case"sbDown":if(this.enableOptions){this.openPopup("optionsPopupRef",this.getSuggestionPos());}break;case"sbSearch":if($S.trim(this.value).length>0){this._last_hit=null;this._request_pattern=null;this.hideSuggestion();this.showSuggestion(this.value);}break;case"sbClear":this.clearSearch();break;}},clearSearch:function(noBlur){this.inputNode.value="";this.value="";this.hasUserInput=false;this.clearStatus=false;this.blockBegin=1;this.hideSuggestion();if(!noBlur){this.blur();try{if(this.inputNode&&this.inputNode.offsetParent){this.inputNode.blur();}}catch(e){}}$C.removeClass(this.clearNode,["show"]);},clearStatus:false,onclearStatusChange:function(evt){if(this.clearNode){$C.toggleClass(this.clearNode,["show"],evt.value);}},spinnerStatus:false,onspinnerStatusChange:function(evt){if(this.spinnerNode){$C.toggleClass(this.spinnerNode,["show"],evt.value);}},onvalueChange:function prevalueChange(evt){this.append=true;if(evt){var pop=this.suggestionPopup,scrollNode=pop&&pop.containerNode;if(scrollNode){scrollNode.scrollTop=0;}this.append=false;this.blockBegin=1;}this.hasUserInput=$S.trim(this.value).length>0;this.set("clearStatus",this.value.length>0);if($S.trim(this.value).length==0){this.hideSuggestion();}else{if(this.tmr2){clearTimeout(this.tmr2);}var me=this;this.tmr2=window.setTimeout(function(){me.showSuggestion(me.value);},this.searchDelay);}},onArrowUp:function onArrowUp(evt){this.preHighlight();},onArrowDown:function onArrowDown(evt){this.nextHighlight();},onkeydown:function(evt){var hWin=evt.hWin,e=evt.e||hWin.event;if(e.keyCode==13){$D.preventDefault(hWin,e);$D.stopPropogation(hWin,e);}},onEnter:function onEnter(evt){this.onSuggestionItemSelect(this.getSelected());this.hideSuggestion();var hWin=evt.hWin,e=evt.e||hWin.event;$D.preventDefault(hWin,e);$D.stopPropogation(hWin,e);},onEsc:function(){this.hideSuggestion();},optionsPopupRef:{scriptClass:"mstrmojo.Editor",alias:"optionsPopup",showTitle:false,popupToBody:true,modal:false,autoClose:true,onOpen:function(){if(this.opener){this.matchCase.set("visible",this.opener.enableMatchCase);var items=mstrmojo.array.map(this.opener.supportedObjectTypes,function(t){return ITEMS[t];});this.objectsList.set("items",items);this.objectsList.set("selectedIndices",_allIndices);}},children:[{scriptClass:"mstrmojo.CheckBox",alias:"matchCase",label:mstrmojo.desc(1049,"Match case"),onclick:function(evt){this.parent.opener.set("matchCase",this.checked);},visible:false},{scriptClass:"mstrmojo.List",cssClass:"mstrmojo-ReportQuickSearch-objects-list",alias:"objectsList",multiSelect:true,selectionPolicy:"toggle",itemMarkupFunction:function(item,idx){return'<div class="item"><div><span class="mstrmojo-ListIcon  t'+item.t+(item.st_icon?" st"+item.st_icon:"")+'"></span>'+item.n+"</div></div>";},onchange:function(){if(!this.domNode){return ;}var ot=[],si=mstrmojo.hash.isEmpty(this.selectedIndices)?_allIndices:this.selectedIndices;for(var i in si){var itm=this.items[i],st=itm.st;if(st){ot=ot.concat(st.split(","));}else{ot.push(itm.t);}}this.parent.opener.objectType=ot.toString();}}]},path:"",pathPopupRef:mstrmojo.insert({scriptClass:"mstrmojo.Popup",cssClass:"mstrmojo-ReportQuickSearch-pathPopup",alias:"pathPopup",autoCloses:true,curtainNode:document.documentElement,closeOnClick:true,onOpen:function(){this.opener.set("path",'<div class="mstrmojo-ReportQuickSearch-pathLoading"></div>');},markupMethods:{onvisibleChange:function(){this.domNode.style.display=(this.visible)?this.cssDisplay:"none";},onleftChange:function(){this.domNode.style.left=(this.left!=null)?this.left:"";},ontopChange:function(){if(!this.domNode||!this.visible){return ;}if(this.top&&this.domNode.style.top){var t1=parseInt(this.domNode.style.top,10)||0,t2=parseInt(this.top)||0,fx=this.opener&&this.opener.fx;if(fx&&fx.isPlaying){fx.cancel();}slideProp(this,this.domNode,"top",t1,t2);}else{this.domNode.style.top=this.top!=null?this.top:"";}}},children:[{scriptClass:"mstrmojo.Container",alias:"pathContainer",markupString:'<div class="mstrmojo-ReportQuickSearch-pathContainer"><div class="mstrmojo-ReportQuickSearch-pathContent"></div><div class="mstrmojo-ReportQuickSearch-pathTip"></div></div>',markupSlots:{containerNode:function(){return this.domNode;},pathNode:function(){return this.domNode.firstChild;}},bindings:{path:function(){return this.parent.opener.path;}},onpathChange:function(evt){if(this.pathNode){this.pathNode.innerHTML=this.path;}var p=this.parent,opener=p.opener;if(!opener){return ;}window.setTimeout(function(){var pos=opener.getPathPos();p.set("left",pos.left);p.set("top",pos.top);},0);}}]}),getPathPos:function(){var pos={left:"-1000px",top:"-1000px"};if(this.suggestionShown){var suggestionPopup=this.suggestionPopup,suggestionNode=suggestionPopup.editorNode,suggestionList=suggestionPopup.list,el=suggestionList.itemsContainerNode.childNodes[suggestionList.selectedIndex],pathPopup=this.pathPopupRef,pathNode=pathPopup.pathContainer.domNode.firstChild;$C.toggleClass(pathPopup.domNode,"right",false);pos=$D.position(el,true);pos.x=pos.x==0?parseInt(suggestionNode.style.left,10):pos.x;pos.y=pos.y==0?parseInt(suggestionNode.style.top+32,10):pos.y;pos.w=pos.w==0?parseInt(suggestionNode.offsetWidth,10):pos.w;var h=pathNode.scrollHeight,w=(pathNode.scrollWidth+3)||245,cw=document.body.clientWidth,sl=document.body.scrollLeft,adjustment=20,l=pos.x+pos.w;if(l+w>cw){l=pos.x-w-adjustment;$C.toggleClass(pathPopup.domNode,"right",true);}pos.left=l+"px";pos.top=pos.y+pos.h/2-h/2+"px";}return pos;},hidePath:function(el){this.pathPopupRef.close();},showPath:function(el){var me=this;if(this.pathTmr){window.clearTimeout(this.pathTmr);}this.pathTmr=window.setTimeout(function(){me.openPopup("pathPopupRef");var ttl=el.ttl||el.getAttribute("ttl");if(ttl){me.set("path",ttl||" ");return ;}var selectedItem=me.suggestionPopup.list.selectedItem||me.suggestionPopup.list.items[el.getAttribute("idx")],did=selectedItem.did,t=selectedItem.t,desc=selectedItem.desc;mstrmojo.xhr.request("POST",mstrConfig.taskURL,{success:function(res){var ttl=pathParser(res.toString())||"N/A";ttl+=(desc?"<br/><br/>"+$S.escape4HTMLText(desc.substring(0,120)):"");el.ttl=ttl;if(me.suggestionPopup.visible){me.set("path",el.ttl);}}},{taskId:"getObjectDetails",objectID:did,objectType:t},undefined);},this.searchDelay);},getCandidatesThroughTaskCall:function getCandidatesThroughTaskCall(params,callbacks){this.set("spinnerStatus",true);var me=this,taskParams={taskId:"searchMetadata",styleName:"MojoFolderStyle",searchPattern:(this.searchPattern||params.pattern),nameWildcards:this.quicksearch?16:1,blockBegin:this.blockBegin||1,blockCount:this.blockCount||params.blockCount,maxObjects:mstrApp.maxSearchResults,recursive:1,objectType:this.objectType||this.supportedObjectTypes.join(",")||SUPPORTED_SUBTYPE,XincludeAncestorInfo:true,includeObjectDesc:true,quicksearch:this.quicksearch,sortKey:this.quicksearch?-1:6};callbacks=mstrmojo.hash.copy(callbacks,{complete:function(){me.set("spinnerStatus",false);}});mstrmojo.xhr.request("POST",mstrConfig.taskURL,callbacks,taskParams,undefined);},getSuggestion:function(t){var lh=this._last_hit,len=0,fcs=[];if(len<this.blockCount){this._request_pattern=null;this.requestCandidates(t);}return fcs;},filterCandidates:function filterCandidates(its,t,max){return its||[];max=max||this.suggestCount;t=$S.regEscape(t);t=t.replace(/^"(.*)"$/,"$1");var tps=this.objectType,itf=this.itemField,f=function(it){return(new RegExp(t,"i")).test(it[itf])&&(new RegExp("(^"+it.t+",?)|(,?"+it.t+")").test(tps));},fcs=mstrmojo.array.filter(its,f,{max:max});return fcs;},updateSuggestion:function updateSuggestion(its){if(this.suggestionShown){its=this.append?(this.suggestionItems||[]).concat(its):its;this.set("suggestionItems",its);}else{this.set("suggestionItems",its);this.openPopup("suggestionPopup",this.getSuggestionPos());this.suggestionShown=true;}if(its.length==0){this.hideSuggestion();}},onSuggestionItemSelect:function onSuggestionItemSelect(it){if(!it||it.tp==-99){return false;}if(this.itemSelectCallback){var data=this.suggestionPopup.list.selectedItem;var map={n:"ds",did:"oid",st:"ost",t:"oty",acg:"acg",isc:"isc"};atts="";for(var i in map){if(map[i]&&data[i]){atts+=map[i]+'="'+data[i]+'" ';}}var tmp=this.tmpNode||document.createElement("span");tmp.innerHTML="<span "+atts+" ></span>";this.itemSelectCallback(tmp.firstChild);}this.searchBoxPopup.modal&&this.searchBoxPopup.close();},renderLayeredIcon:function(item){var t=item.t,st=item.st,tCssClass=" t"+t,stCssClass=st?" st"+st:"",iscCssClass=item.isc?'class="sc"':"";var icon={4:"m",12:"a",1:"cg",47:"co",14:"hi"}[t];var el='<span class="mstrIcon-lv layered mstrIcon-lv-'+icon+'" style="vertical-align:middle;"><span '+iscCssClass+"></span></span>";return el;},itemRenderer:function(data,idx,w){var path="",anc=data.anc,items=anc&&anc.items||[];for(var i=0,len=items.length;i<len;i++){path+=items[i].n+((len>1)&&(i<len-2)?" > ":"");}return'<div class="mstrmojo-List-item" idx="'+idx+'"  onmouseover="mstrmojo.all[\''+this.id+"'].suggestionPopup.list.singleSelect("+idx+" ); mstrmojo.all['"+this.id+'\'].showPath(this);"><div class="mstrmojo-List-text">'+this.renderLayeredIcon(data)+data[w.itemField]+"</div></div>";},getSearchPattern:function getSearchPattern(){return this.value;},getSuggestionPos:function getSuggestionPos(){var p=$D.position(this.domNode,true);this._sugPos={left:Math.round(p.x)+"px",top:Math.round(p.y+p.h-1)+"px",zIndex:108};return this._sugPos;},openPlaceholderPopup:function(pos){var p=this.searchBoxPopup;if(p&&!p.hasRendered){p=mstrmojo.insert(p);p.render();this.searchBoxPopup=p;document.body.appendChild(p.domNode);}var popWidth=p.domNode.offsetWidth,left=pos.left-popWidth/2,top=pos.top-p.domNode.offsetHeight+2,pageWidth=getClientWidth()+document.documentElement.scrollLeft;left=pageWidth-left>=popWidth?left:left-(popWidth-(pageWidth-left));left=Math.max(1,left);right=pageWidth-pos.left-20;right=Math.max(right-popWidth/2,0);if(right<popWidth/2){p.set("right",right+"px");p.set("left","auto");}else{p.set("left",left+"px");p.set("right","auto");}p.set("top",top+"px");},searchBoxPopup:{scriptClass:"mstrmojo.Container",markupString:'<div id={@id} class="mstrReportQuickSearchBoxPopup {@cssClass}" mstrAttach:mouseover><div class="mstrIcon-btn mstrIcon-btnClose"></div><div class="dummy-searchbox" ty="qs"></div></div>',markupSlots:{closeNode:function(){return this.domNode.firstChild;},placeholderNode:function(){return this.domNode.lastChild;}},markupMethods:{onleftChange:function(){if(this.left&&this.domNode){this.domNode.style.left=this.left;}},onrightChange:function(){if(this.right&&this.domNode){this.domNode.style.right=this.right;}},ontopChange:function(){if(this.top&&this.domNode){this.domNode.style.top=this.top;}},oncssTextChange:function(){this.domNode.style.cssText=this.cssText||"";}},modal:false,top:"-10000px",reset:function(){if(this.placeholderNode.firstChild){this.placeholderNode.removeChild(this.placeholderNode.firstChild);}},close:function(){this.onClose();},onClose:function(){this.modal=false;this.set("top","-10000px");this.reset();},onPlaceholder:function(evt){var sb=mstrmojo.all.ReportQuickSearchBox;if($D.isIE){sb.render();}this.set("modal",true);this.placeholderNode.appendChild(sb.domNode);sb.set("visible",false);window.setTimeout(function(){sb.set("visible",true);sb.clearSearch();sb.inputNode.focus();},20);},postBuildRendering:function(){var me=this;$D.attachEvent(this.closeNode,"click",function(){me.onClose();});$D.attachEvent(this.placeholderNode,"click",function(){me.onPlaceholder();});}}});})();