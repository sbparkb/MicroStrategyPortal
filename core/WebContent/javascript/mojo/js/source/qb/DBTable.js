(function(){mstrmojo.requiresCls("mstrmojo.Editor","mstrmojo.Label","mstrmojo.array","mstrmojo.qb.DBTableRow");mstrmojo.requiresDescs(629,12912,12913,12914,10);var _S=mstrmojo.string,_D=mstrmojo.dom,_C=mstrmojo.css,$ARR=mstrmojo.array;function setPosition(w,vl,vt){var st=w.editorNode.style;vl=(vl<0)?0:vl+"px";vt=(vt<0)?0:vt+"px";st.left=vl;w.set("left",vl);w.left=vl;st.top=vt;w.set("top",vt);w.top=vt;}function _updateRows(w){var rows=w.children[0].children;$ARR.forEach(rows,function(rowitem,idx){if(w.selectedIndex[idx]){_C.addClass(rowitem.domNode,["selected"]);}else{_C.removeClass(rowitem.domNode,["selected"]);}});}function updateTableContainerWidth(ts,qdl){ts.canvasbox.domNode.style.width=ts.maxWidth+"px";ts.canvasbox.width=ts.maxWidth+"px";ts.linker.width=ts.maxWidth;qdl.linkerNeedRender=true;ts.linker.drawLinks();}function updateTableContainerHeight(ts,qdl,delayDrawLinks){ts.canvasbox.domNode.style.height=ts.maxHeight+"px";ts.canvasbox.height=ts.maxHeight+"px";ts.linker.height=ts.maxHeight;qdl.linkerNeedRender=true;if(!delayDrawLinks){ts.linker.drawLinks();}}function getTableHeight(dbTable,rowNum){var ROW_HEIGHT=22;rowNum=rowNum?rowNum+2:1;if(dbTable.searchBox.visible){rowNum++;}return ROW_HEIGHT*rowNum;}function checkTableContainer(dbTable,qdl){var st=dbTable.editorNode.style,top=parseInt(st.top),height=parseInt(st.height),ts=dbTable.container,h,needDrawLinks=false;if(top+height>ts.maxHeight){ts.maxHeight=top+height+10;h=parseInt(ts.domNode.clientHeight);if(ts.maxHeight>h){updateTableContainerHeight(ts,qdl,true);needDrawLinks=true;}else{ts.domNode.scrollTop=0;}}return needDrawLinks;}function adjustDBRowsWidth(width){var rows=this.Rows.children;$ARR.forEach(rows,function(rowitem){rowitem.domNode.firstChild.childNodes[1].style.width=(width-20)+"px";});}mstrmojo.qb.DBTable=mstrmojo.declare(mstrmojo.Editor,null,{scriptClass:"mstrmojo.qb.DBTable",title:"",left:"",top:"",minWidth:80,maxWidth:250,maxHeight:300,minHeight:20,model:null,prevPos:{},container:null,selectedIndex:[],draggable:true,noCheckBox:true,topAnchor:function ta(){return(this.titlebarNode)?parseInt(this.top,10)+(this.titlebarNode.clientHeight/2)+"px":"0px";},leftAnchor:function la(){return this.left;},rightAnchor:function ra(){return(this.editorNode)?parseInt(this.left,10)+this.editorNode.clientWidth+"px":"0px";},modal:false,zIndex:7,markupString:'<div id="{@id}" class="mstrmojo-Editor-wrapper"><div class="mstrmojo-Editor mstrmojo-qb-DBTable {@cssClass}" style="z-index:{@zIndex};{@cssText}" mstrAttach:mousedown,mouseup,click><div class = "mstrmojo-qb-DBTable-header" style="position:absolute;"><table cellspacing="0" cellpadding="0" class="mstrmojo-qb-DBTable-titlebar"><tr><td><input id="{@id}check" type="checkbox" mstrAttach:click></td><td><div class="mstrmojo-qb-DBTable-titleIcon"></div></td><td class="mstrmojo-Editor-titleCell"><div id="{@id}title" class="mstrmojo-qb-DBTable-title"  mstrAttach:dblclick></div></td><td><div class="mstrmojo-qb-DBTable-searchIcon" title="'+mstrmojo.desc(10,"Search")+'"></div></td><td><div class="mstrmojo-qb-DBTable-close" title="'+mstrmojo.desc(629,"Delete")+'"></div></td><td><div style="display:none;"></div></td></tr></table></div><div class="mstrmojo-Editor-titleSpacer"></div>{@titlebarHTML}<div class="mstrmojo-qb-DBTable-searchBox"></div><div class="mstrmojo-Editor-content" style="padding:0px;" mstrAttach:scroll,mouseover,mouseout></div><div class="mstrmojo-qb-table-resize-handle north" id="{@id}north" ></div><div class="mstrmojo-qb-table-resize-handle east" id="{@id}east"></div><div class="mstrmojo-qb-table-resize-handle south" id="{@id}south"></div><div class="mstrmojo-qb-table-resize-handle west" id="{@id}west"></div></div></div>',titleMarkupString:"",children:[{scriptClass:"mstrmojo.Box",alias:"Rows",cssText:"width:100%; background-color:white; border-top: 1px solid #C6C6C6; height:100%;white-space: nowrap;"},{scriptClass:"mstrmojo.TextBox",slot:"searchBoxNode",alias:"searchBox",visible:false,cssClass:"mstrmojo-qb-DBTable-searchInput",onvisibleChange:function onvisibleChange(evt){var dbTable=this.parent,editorNodeStyle,SEARCHBOX_HEIGHT=22,deltaHeight=this.visible?SEARCHBOX_HEIGHT:-SEARCHBOX_HEIGHT,needDrawLinks,qdl=mstrmojo.all.QBuilderModel,me=this;editorNodeStyle=dbTable.editorNode.style;editorNodeStyle.height=parseInt(editorNodeStyle.height)+deltaHeight+"px";dbTable.maxHeight+=deltaHeight;if(this.visible){this.set("width",parseInt(editorNodeStyle.width)-48+"px");window.setTimeout(function(){me.focus();},0);}needDrawLinks=checkTableContainer(dbTable,qdl);if(mstrApp.getRootController().hasTableJoin(dbTable.id)||needDrawLinks){window.setTimeout(function(){dbTable.container.linker.drawLinks();},0);}},onvalueChange:function onvalueChange(){var dbTable=this.parent,i,tableRows=dbTable.Rows.children,row,keyword=this.inputNode.value.toLowerCase(),matchedRowNum=0,tableHeight,isVisible,DEFAULT_HEIGHT=264,isChanged=false,needDrawLinks,qdl=mstrmojo.all.QBuilderModel;for(i=1;i<tableRows.length;i++){row=tableRows[i];if(row.text.toLowerCase().indexOf(keyword)>=0){matchedRowNum++;isVisible=true;}else{isVisible=false;}if(row.visible!==isVisible){row.set("visible",isVisible);isChanged=true;}if(isChanged&&isVisible){row.set("cssClass",(matchedRowNum-1)%2?"odd":"even");}}if(!isChanged){return ;}tableRows[0].set("visible",matchedRowNum>0);tableHeight=getTableHeight(dbTable,matchedRowNum);dbTable.maxHeight=tableHeight;dbTable.set("height",(tableHeight>DEFAULT_HEIGHT)?DEFAULT_HEIGHT:tableHeight);needDrawLinks=checkTableContainer(dbTable,qdl);if(isChanged||needDrawLinks){dbTable.container.linker.drawLinks();}}}],markupSlots:{editorNode:function(){return this.domNode.firstChild;},titlebarNode:function(){return this.showTitle?this.domNode.firstChild.firstChild.firstChild:null;},checkBoxNode:function(){return this.showTitle?this.domNode.firstChild.firstChild.firstChild.rows[0].cells[0].firstChild:null;},titleIconNode:function(){return this.showTitle?this.domNode.firstChild.firstChild.firstChild.rows[0].cells[1].firstChild:null;},titleNode:function(){return this.showTitle?this.domNode.firstChild.firstChild.firstChild.rows[0].cells[2].firstChild:null;},helpNode:function(){return this.showTitle?this.domNode.firstChild.firstChild.firstChild.rows[0].cells[5].firstChild:null;},searchIconNode:function(){return this.showTitle?this.domNode.firstChild.firstChild.firstChild.rows[0].cells[3].firstChild:null;},closeNode:function(){return this.showTitle?this.domNode.firstChild.firstChild.firstChild.rows[0].cells[4].firstChild:null;},searchBoxNode:function(){return this.domNode.firstChild.childNodes[2];},containerNode:function(){return this.domNode.firstChild.childNodes[3];},buttonNode:function(){return this.domNode.firstChild.childNodes[4];},curtainNode:function(){return this.domNode.lastChild;},leftanchor:function(){return this.left;}},onscroll:function(){this.parent.parent.linker.drawLinks();},premousedown:function premousedown(evt){var target=mstrmojo.dom.eventTarget(evt.hWin,evt.e),isVisible;if(target===this.closeNode){if(!this.readOnly){this.close();}}else{if(target===this.searchIconNode){isVisible=this.searchBox.visible;this.searchBox.set("visible",!isVisible);}}},onmousedown:function(evt){this.editorNode.style.zIndex=8;},onmouseup:function(evt){this.editorNode.style.zIndex=7;},toggleSelect:function(idx){var add,rmv;if(this.selectedIndex[idx]){this.selectedIndex[idx]=false;}else{this.selectedIndex[idx]=true;}_updateRows(this);},rangeSelect:function(idx){},singleSelect:function(idx){var i,len;for(i=0,len=this.selectedIndex.length;i<len;i++){this.selectedIndex[i]=false;}this.selectedIndex[idx]=true;_updateRows(this);},clearSelect:function(){var i,len;for(i=0,len=this.selectedIndex.length;i<len;i++){this.selectedIndex[i]=false;}_updateRows(this);},onmouseover:function(evt){var height=parseInt(this.editorNode.style.height);this.containerNode.style.overflowY=(height>=this.minHeight&&height<this.maxHeight)?"auto":"hidden";this.containerNode.style.overflowX="hidden";},onmouseout:function onmouseout(){this.containerNode.style.overflow="hidden";},touchBegin:function touchBegin(touch){var s=this.editorNode.style;this._tl=parseInt(s.left);this._tt=parseInt(s.top);},touchSwipeMove:function touchSwipeBegin(touch){var qdl=mstrmojo.all.QBuilderModel,ts=this.container,tbl=qdl.tables[this.id];setPosition(this,touch.delta.x+this._tl,touch.delta.y+this._tt);if(tbl&&tbl.njoins>0){ts.linker.drawLinks();}},addRow:function AddRow(txt,level,icons,rid){var table=this.children[0];var row={scriptClass:"mstrmojo.qb.DBTableRow",images:icons,indent:level,text:txt};table.addChildren([row]);},onclick:function(evt){var hWin=evt.hWin,e=evt.e||hWin.event,tgt=e.target||e.srcElement,el=document.elementFromPoint(e.clientX,e.clientY),id=tgt&&tgt.id;if(id.replace(this.id,"")=="check"){if(this.onCheck){this.onCheck(tgt.checked);}}var w=_D.findWidget(el);if(!w||!w.srcData){this.clearSelect();return ;}var idx=w.rIndex,c=_D.ctrlKey(hWin,e),s=_D.shiftKey(hWin,e);if(c||s){_D.clearBrowserHighlights(hWin);}if(c){this.toggleSelect(idx);}else{this.singleSelect(idx);}},ondblclick:function(evt){var hWin=evt.hWin,e=evt.e||hWin.event,tgt=e.target||e.srcElement,id=tgt&&tgt.id;if(id.replace(this.id,"")=="title"){var off=_D.delta(this.titleNode,this.titlebarNode);var title=this.title,width=this.titleNode.clientWidth-6;this.openPopup("inlineTextRef",{left:off.x+"px",top:(_D.isIE?0:-1)+"px",txtConfig:{cssClass:"mstrmojo-qb-tablealias-edit",width:width+"px",value:_S.decodeHtmlString(title)||"",onEnter:function(){var v=_S.trim(this.value);this.parent.close({enter:true});if(v){var dbt=this.parent.parent;if(_S.encodeHtmlString(v)!==dbt.title){var m=dbt.model;if(m&&m.tbns){var msg="";if(v.match(/[~#'"?;:[\]]/)){msg=mstrmojo.desc(12912,"A table alias cannot contain the following characters: ~#'\"?;:/[]");mstrmojo.alert(msg);return ;}if(!v.match(/^[a-zA-Z]/)){v=v.replace(/^\S/,"L");msg=mstrmojo.desc(12913,"Table alias starting with non alphabetic character will be replaced by the character L.");}var encodedTitle=_S.encodeHtmlString(v);if(m.tbns[v]&&(encodedTitle!==dbt.title)){msg+=mstrmojo.desc(12914,"'##' has been used as the alias of another table. Please give a new name.").replace("##",encodedTitle);mstrmojo.alert(msg);return ;}if(msg){mstrmojo.alert(msg);}}var old=_S.decodeHtmlString(dbt.title);if(m&&m.renameTable){m.renameTable(dbt.id,old,v);}dbt.set("title",_S.encodeHtmlString(v));if(dbt.onHeaderChange){dbt.onHeaderChange(old,v);}}}},onCancel:function(){this.set("value",this.parent.title);}}});}},onCheck:function(checked){},postBuildRendering:function postBuildRendering(){if(this._super){this._super();}if(this.noCheckBox){this.checkBoxNode.style.display="none";}},getDragData:function getDragData(ctxt){var s=ctxt.src,n=s.node,id=n.id;if(id){switch(id.replace(this.id,"")){case"north":case"east":case"south":case"west":return{dir:id.replace(this.id,""),startX:s.pos.x,startY:s.pos.y};break;default:break;}}else{if(this._super){return this.dropZone&&this._super(ctxt);}}return null;},isDragValid:function isDragValid(context){return true;},ondragstart:function ondragstart(ctxt){var s=ctxt.src,d=s&&s.data,dir=d&&d.dir;if(dir){this.prevPos={x:s.pos.x,y:s.pos.y};return true;}else{if(this._super){return this._super(ctxt);}}},ondragmove:function ondragmove(ctxt){var s=ctxt.src,d=s&&s.data,dir=d&&d.dir,top,height,left,width,ts,qdl,tgt,dx,dy,st,h,w,e,vl,vt,offset,i,len;ts=this.container;qdl=mstrmojo.all.QBuilderModel;if(dir){switch(dir){case"north":case"south":tgt=ctxt.tgt;dy=tgt.pos.y-this.prevPos.y;dy=(dir==="north")?dy:-dy;this.prevPos=tgt.pos;st=this.editorNode.style;if(parseInt(st.height)-dy>=this.minHeight&&parseInt(st.height)-dy<=this.maxHeight){top=parseInt(st.top);if(dir==="north"){top+=dy;if(top<0){top=0;}st.top=top+"px";this.top=st.top;}height=parseInt(st.height)-dy;st.height=height+"px";this.containerNode.style.height=height-this.titlebarNode.clientHeight-1-(this.searchBox.visible?this.searchBoxNode.clientHeight:0)+"px";if(top+height>ts.maxHeight){ts.maxHeight=top+height+10;h=parseInt(ts.domNode.clientHeight);if(ts.maxHeight>h){updateTableContainerHeight(ts,qdl);}else{ts.domNode.scrollTop=0;}}}break;case"east":case"west":tgt=ctxt.tgt;offset=this.noCheckBox?57:77;dx=tgt.pos.x-this.prevPos.x;dx=(dir==="east")?dx:-dx;this.prevPos=tgt.pos;st=this.editorNode.style;if(parseInt(st.width)+dx>=this.minWidth&&parseInt(st.width)+dx<=this.maxWidth){left=parseInt(st.left);if(dir==="west"){left-=dx;if(left<0){left=0;}st.left=left+"px";this.left=st.left;}width=parseInt(st.width)+dx;st.width=width+"px";this.titleNode.style.width=width-offset+"px";this.titlebarNode.style.width=width+"px";if(this.searchBox.visible){this.searchBox.set("width",width-48+"px");}if(left+width>ts.maxWidth){ts.maxWidth=left+width+10;w=parseInt(ts.domNode.clientWidth);if(ts.maxWidth>w){updateTableContainerWidth(ts,qdl);}else{ts.domNode.scrollLeft=0;}}adjustDBRowsWidth.call(this,width);}break;}ts.linker.drawLinks();}else{h=parseInt(ts.domNode.clientHeight);w=parseInt(ts.domNode.clientWidth);e=ctxt.tgt.pos;s=ctxt.src.pos;dx=e.x-s.x;dy=e.y-s.y;st=this.getMovingTarget().style;vl=this._leftPos+dx;vt=this._topPos+dy;vl=(vl<0)?0:vl;vt=(vt<0)?0:vt;var mw=true,mh=true,tbls=ts.canvasbox.children;for(i=0,len=tbls.length;i<len;i++){if(!tbls[i].visible){continue;}if(this.id!=tbls[i].id&&vl+this.editorNode.clientWidth<parseInt(tbls[i].left)+tbls[i].editorNode.clientWidth){mw=false;break;}}if(mw){ts.maxWidth=vl+this.editorNode.clientWidth;if(ts.maxWidth>w){updateTableContainerWidth(ts,qdl);}}for(i=0,len=tbls.length;i<len;i++){if(!tbls[i].visible){continue;}if(this.id!=tbls[i].id&&vt+this.editorNode.clientHeight<parseInt(tbls[i].top)+tbls[i].editorNode.clientHeight){mh=false;break;}}if(mh){ts.maxHeight=vt+this.editorNode.clientHeight+10;if(ts.maxHeight>h){updateTableContainerHeight(ts,qdl);}}st.left=vl+"px";st.top=vt+"px";this.top=vt+"px";this.left=vl+"px";var tbl=qdl.tables[this.id];if(tbl&&tbl.njoins>0){ts.linker.drawLinks();}if(ts.maxWidth<=w){ts.domNode.scrollLeft=0;}if(ts.maxHeight<=h){ts.domNode.scrollTop=0;}}},inlineTextRef:{scriptClass:"mstrmojo.Popup",locksHover:true,slot:"containerNode",children:[{scriptClass:"mstrmojo.TextBox",alias:"txt",onEsc:function(){if(this.onCancel){this.onCancel();}this.parent.close({cancel:true});}}],onOpen:function(){var t=this.txt,c=this.txtConfig;if(c){for(var k in c){t.set(k,c[k]);}}t.domNode.style.width=t.width;t.focus();},onClose:function(dbt){if(!dbt||(!dbt.cancel&&!dbt.enter)){this.txt.onEnter();}}},_set_height:function(n,value){var searchBoxHeight=this.searchBox.visible?this.searchBoxNode.clientHeight:0;if(this.editorNode&&parseInt(value)>this.titlebarNode.clientHeight+searchBoxHeight){var st=this.editorNode.style;st.height=parseInt(value)+"px";this.containerNode.style.height=parseInt(st.height)-this.titlebarNode.clientHeight-1-searchBoxHeight+"px";}},useRichTooltip:true,showTooltip:function showTooltip(evt,win){var $DOM=mstrmojo.dom;var target=evt.target||$DOM.eventTarget(evt.hWin,evt.e);if(target.className&&((target.className==="mstrmojo-qb-DBTable-title")||(target.className==="mstrmojo-qb-DBTable-titleIcon"))){target=target.parentNode.parentNode.parentNode.children[0].children[2].children[0];var position=$DOM.position(target);this.set("richTooltip",{posType:mstrmojo.tooltip.POS_TOPLEFT,cssClass:"vi-regular vi-tooltip-A",content:target.textContent,top:position.y+position.h+5,left:position.x});mstrmojo._HasTooltip.showTooltip.call(this,evt,win);}}});})();