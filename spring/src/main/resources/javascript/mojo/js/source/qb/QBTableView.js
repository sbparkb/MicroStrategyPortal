(function(){mstrmojo.requiresCls("mstrmojo.css","mstrmojo.dom","mstrmojo.hash","mstrmojo.Box","mstrmojo.qb.FilterValueEditor","mstrmojo.qb.QBTableLinker","mstrmojo.qb.ConditionEditor","mstrmojo.qb.DBTable","mstrmojo.ui.menus.Menu","mstrmojo.qb.DBTableRowMenu");mstrmojo.requiresDescs(221,520,521,522,523,524,525,526,612,629,686,687,688,696,746,1442,2122,2123,2125,2127,2131,2151,2219,2220,2784,2785,2786,4449,5893,8571,9126,9127,9128,9129,9640,9641,9913,9938,9939,9940,9941,12736,12928);var $D=mstrmojo.dom,$ARR=mstrmojo.array,DRAG_ACTION_ADD_TABLE="addTable",_DEFAULT_HEIGHT="264px",_ROW_HEIGHT=22;var _IMGS=[0,"tick",16,"mix"];var _menuItems=[{did:"Delete",n:mstrmojo.desc(629,"Delete")},{did:-1,n:"-"},{did:"0",n:mstrmojo.desc(9640,"Inner Join")},{did:"1",n:mstrmojo.desc(9940,"Left Outer Join")},{did:"2",n:mstrmojo.desc(9941,"Right Outer Join")},{did:"3",n:mstrmojo.desc(9641,"Outer Join")},{did:-1,n:"-"},{did:"More Options",n:mstrmojo.desc(9126,"More Options")}];var _joinItems=[{did:"0",n:mstrmojo.desc(9640,"Inner Join")},{did:"1",n:mstrmojo.desc(9940,"Left Outer Join")},{did:"2",n:mstrmojo.desc(9941,"Right Outer Join")},{did:"3",n:mstrmojo.desc(9641,"Outer Join")}];var _joinOperators=[{n:"=",dssid:"0"},{n:">",dssid:"1"},{n:">=",dssid:"2"},{n:"<",dssid:"3"},{n:"<=",dssid:"4"},{n:"<>",dssid:"5"}];var _filters=[{did:"-2",n:mstrmojo.desc(4449,"Expression")},{did:-1,n:"-"},{did:2219,n:mstrmojo.desc(2219,"In list")},{did:2220,n:mstrmojo.desc(2220,"Not in list")},{did:-1,n:"-"},{did:520,n:mstrmojo.desc(520,"Exactly")},{did:612,n:mstrmojo.desc(612,"Not Exactly")},{did:-1,n:"-"},{did:521,n:mstrmojo.desc(521,"Greater than")},{did:523,n:mstrmojo.desc(523,"Less than")},{did:522,n:mstrmojo.desc(522,"Greater than equal")},{did:524,n:mstrmojo.desc(524,"Less than equal")},{did:-1,n:"-"},{did:"-5",n:mstrmojo.desc(9939,"Strings"),fns:[{did:525,n:mstrmojo.desc(525,"Like")},{did:526,n:mstrmojo.desc(526,"Not like")},{did:686,n:mstrmojo.desc(686,"Contains")},{did:2784,n:mstrmojo.desc(2784,"Does not contain")},{did:687,n:mstrmojo.desc(687,"Begins with")},{did:2785,n:mstrmojo.desc(2785,"Does not begin with")},{did:688,n:mstrmojo.desc(688,"Ends with")},{did:2786,n:mstrmojo.desc(2786,"Does not end with")}]},{did:-1,n:"-"},{did:"Between",n:mstrmojo.desc(696,"Between")},{did:"Not between",n:mstrmojo.desc(746,"Not between")}];var _fctItems=[{did:"0",n:mstrmojo.desc(4449,"Expression")},{did:"1",n:mstrmojo.desc(9913,"Aggregation Function"),fns:[{did:"-6",n:mstrmojo.desc(2131,"Sum"),idx:1},{did:"-6",n:mstrmojo.desc(2122,"Average"),idx:2},{did:"-6",n:mstrmojo.desc(2127,"Minimum"),idx:3},{did:"-6",n:mstrmojo.desc(2125,"Maximum"),idx:4},{did:"-6",n:mstrmojo.desc(2123,"Count"),idx:5},{did:"-6",n:mstrmojo.desc(9938,"Count Distinct"),idx:6}]},{did:"2",n:mstrmojo.desc(2151,"Filter"),fns:_filters}];function _getTableHeight(cnt){return _ROW_HEIGHT*(cnt?(cnt+2):1);}function _addTableColumns(wgt){var qdl=mstrmojo.all.QBuilderModel,tIndex,selRows=[],row;if(!wgt.srcData){tIndex=qdl.gettIndex(wgt.id);for(var i=1,len=wgt.Rows.children.length;i<len;i++){row=wgt.Rows.children[i];if(row.visible){selRows.push(row);}}}else{selRows.push(wgt);tIndex=qdl.gettIndex(wgt.parent.parent.id);}qdl.addSelectedColumns(selRows,tIndex,null,{success:function(){var i=0,len=selRows.length,w;for(i;i<len;i++){w=selRows[i];w.updateState(1);w.count++;}}});}var ENUM_EXPRESSION_TYPE_NEW_COLUMN=0,ENUM_EXPRESSION_TYPE_NEW_FILTER=1,ENUM_EXPRESSION_TYPE_EXISTING_COLUMN=3;function _openMoreMenu(evt,domSrc,obj){var id="mstr-qb-table-moreCM",e=mstrmojo.all[id];if(!e){e=new mstrmojo.MenuButton({id:id,cmCssClass:"mstrmojo-CXM",alias:"fctmenu",itemChildrenField:"fns",itemIdField:"did",itemField:"n",iconClass:"mstrmojo-qb-ListIcon div",cm:_fctItems,domSrc:domSrc,obj:obj,dynamicUpdate:true,getMenuPosition:function getMenuPosition(){var pos=mstrmojo.dom.position(this.domSrc,true);return{x:Math.round(pos.x),y:Math.round(pos.y+pos.h)};},executeCommand:function(item){var w=this.obj,qdl=mstrmojo.all.QBuilderModel,tbl=w.parent.parent,tIndex=qdl.gettIndex(w.srcID);switch(item.did){case"0":mstrApp.getRootController().openExpressionEditor({type:ENUM_EXPRESSION_TYPE_NEW_COLUMN,w:w,tkn:w.expr});break;case"-2":mstrApp.getRootController().openExpressionEditor({n:mstrmojo.desc(5893,"New Condition"),w:w,tkn:w.expr,callbacks:{success:function succ(res){var mi=res.mi;mstrApp.getRootController().addNewFilter({et:"*",expr:mi.items,n:res.expr,sqltp:mi.exp.sqltp});}}});break;case"-6":var scl=qdl.selectedClns,cIndex=scl.length,selRows=new Array(),rows=w.parent.children,sIndex=tbl.selectedIndex;selRows.push(w);var cb={success:function(){var i=0,len=selRows.length,w;for(i;i<len;i++){w=selRows[i];if(w.state==0||w.state==2){w.state++;w.images[1]=w.img[w.state];w.render();}w.count++;}},failure:function(){}};qdl.addSelectedColumns(selRows,tIndex,item.idx,cb);break;default:var column=this.obj,datatype=column.dt.tp,DATE_TIME_TYPE={14:true,15:true,16:true},IS_BIGDECIMAL={30:true},fve,fveid,paraNum;switch(item.did){case"Between":case"Not between":paraNum=2;break;default:paraNum=1;}fveid="mstr-qb-fve";fve=mstrmojo.all[fveid]||(new mstrmojo.qb.FilterValueEditor({id:fveid}));fve.n=item.n;fve.operatorID=item.did;fve.column=column.oriexpr;fve.isDateTime=DATE_TIME_TYPE[datatype];fve.isBigDecimal=IS_BIGDECIMAL[datatype];fve.paraNum=paraNum;fve.open();}}});e.render();}else{e.set("domSrc",domSrc);e.set("obj",obj);}e.showContextMenu();e.onContextMenuClose=function(){domSrc.style.visibility="inherit";};}function _openRMCContextMenu(opener,info){var callback={success:function(){var menuHelper,cfg;menuHelper=opener.menuHelper;if(!menuHelper){menuHelper=opener.menuHelper=new mstrmojo.qb.DBTableRowMenu();}menuHelper.tableRow=opener;cfg=menuHelper.getMenuConfig();cfg.hostId=opener.id;cfg.hostElement=opener.domNode;if(info.position){cfg.position=info.position;}cfg.isHostedWithin=false;opener.openPopup(new mstrmojo.ui.menus.Menu({popupConfig:cfg}));}},controller=mstrApp.getRootController();if(controller.getFunctionList()){callback.success();return ;}controller.model.getFunctions(false,{success:function success(){callback.success();}},{showWait:true});}function _handleClickOnJoin(e,linker,srcw){var qdl=mstrmojo.all.QBuilderModel,pos=$D.position(srcw.domNode),x=e.clientX,y=e.clientY,link=qdl.getTouchValue(x-pos.x,y-pos.y),scrollPos=$D.position(srcw.domNode,true);if(link){qdl.selLink=link;linker.drawMarker();_openJoinMenu.call(this,e,link,linker,{x:x+(scrollPos.x-pos.x),y:y+(scrollPos.y-pos.y)});}else{qdl.selLink=null;linker.clearHighLightCanvas();}}var JOIN_MENU_BUTTON={};function _openJoinMenu(evt,obj,linker,pos){var curZIndex=mstrApp.diCurrentZIndex,popupZIndex=curZIndex>999?curZIndex+1:999,me=this,key=me.joinMenuOption.mappingKey,menuItems=me.joinMenuOption.menuItems,e=JOIN_MENU_BUTTON[key];if(!e){e=JOIN_MENU_BUTTON[key]=new mstrmojo.MenuButton({cmCssClass:"mstrmojo-CXM",cm:menuItems,zIndex:popupZIndex,itemChildrenField:"fns",itemIdField:"did",itemField:"n",dynamicUpdate:true,obj:obj,pos:pos,linker:linker,getMenuPosition:function getMenuPosition(){return this.pos;},queryChecked:function(item){switch(item.did){case"Delete":case -1:case"More Options":return false;default:var qdl=mstrmojo.all.QBuilderModel;var jid=qdl.selLink[0];return(qdl.joinsInfo[jid].jt==item.did);}},executeCommand:function(item){var linker=this.linker;var qdl=mstrmojo.all.QBuilderModel;var link=this.obj,did=item.did;switch(did){case"Delete":var cb={success:function(){qdl.selLink=null;linker.drawLinks();},failure:function(){}};qdl.removeLink(link[1],link[0],cb);break;case"0":case"1":case"2":case"3":qdl.editJoin({joinID:link[0],linkID:link[1],type:did});break;case"More Options":_openJoinOptions.call(me,evt,link,linker);break;default:break;}}});}else{e.set("pos",pos);e.set("obj",obj);e.set("linker",linker);}e.showContextMenu();}var JOIN_OPTION_EDITOR={};function _openJoinOptions(evt,link,linker,pos){var joinItems=this.joinMenuOption.joinItems,key=this.joinMenuOption.mappingKey,e=JOIN_OPTION_EDITOR[key],joinOperators=this.joinMenuOption.joinOperators;if(!e){e=JOIN_OPTION_EDITOR[key]=new mstrmojo.Editor({slink:link,linker:linker,title:mstrmojo.desc(9127,"Join Options"),help:(mstrApp.helpTopics&&mstrApp.helpTopics.tableJoin)||"join_options_dialog_box.htm",zIndex:100,cssText:"width:350px;",children:[{scriptClass:"mstrmojo.Label",cssText:"font-weight:bold; width:100%; padding: 5px;",text:mstrmojo.desc(9128,"Join")},{scriptClass:"mstrmojo.RadioList",alias:"radiolist",cssText:"padding-left:25px;",itemCssClass:"mstrmojo-QB-radiolist-item",items:joinItems},{scriptClass:"mstrmojo.Label",cssText:"font-weight:bold; width:100%; padding-left: 5px;",text:mstrmojo.desc(9129,"Join Operator")},{scriptClass:"mstrmojo.Label",cssText:"padding-left:100px;",bindings:{text:"this.parent.srcText"}},{scriptClass:"mstrmojo.HBox",alias:"jop",cssText:"position:relative;left:100px;",children:[{scriptClass:"mstrmojo.Pulldown",items:joinOperators,popupToBody:true}]},{scriptClass:"mstrmojo.Label",cssText:"padding-left:100px;",bindings:{text:"this.parent.tgtText"}},{scriptClass:"mstrmojo.HBox",cssClass:"mstrmojo-Editor-buttonBox",slot:"buttonNode",children:[{scriptClass:"mstrmojo.HTMLButton",cssClass:"mstrmojo-Editor-button",cssText:"float:right;",text:mstrmojo.desc(1442,"OK"),onclick:function(evt){var e=this.parent.parent;var qdl=mstrmojo.all.QBuilderModel,jt=e.radiolist.selectedItem.did,linkid=e.slink[1],jid=e.slink[0],selectedOperator=e.jop.children[0].selectedItem,expr=qdl.brackets(e.srcText)+selectedOperator.n+qdl.brackets(e.tgtText);qdl.editJoin({joinID:jid,linkID:linkid,type:jt,exp:expr,op:selectedOperator.dssid});if(e.onOK){e.onOK();}e.close();}},{scriptClass:"mstrmojo.HTMLButton",cssClass:"mstrmojo-Editor-button",text:mstrmojo.desc(221,"Cancel"),onclick:function(evt){var e=this.parent.parent;if(e.onCancel){e.onCancel();}e.close();}}]}]});}else{e.set("slink",link);e.set("linker",linker);}var qdl=mstrmojo.all.QBuilderModel,jinfo=qdl.joinsInfo[link[0]].links[link[1]],srcText=jinfo.srcw.oriexpr,tgtText=jinfo.tgtw.oriexpr;e.set("srcText",srcText);e.set("tgtText",tgtText);e.radiolist.set("selectedIndex",parseInt(qdl.joinsInfo[link[0]].jt));e.jop.children[0].set("value",jinfo.op||"0");e.open();}function _constructAvatarDBTable(widget,h,x,y,tbn){var qdl=mstrmojo.all.QBuilderModel;var DBTable=new mstrmojo.qb.DBTable({scriptClass:"mstrmojo.qb.DBTable",cssText:"opacity:0.3;filter:alpha(opacity=30);left:0px;top:0px;width:180px;height:"+h+"px;",title:tbn,visible:false,noCheckBox:true});DBTable.container=widget.parent;DBTable.selectedIndex=new Array();var tIndex=qdl.gettIndex(DBTable.id);widget.addChildren([DBTable]);DBTable.maxHeight=DBTable.editorNode.clientHeight;DBTable.maxWidth=Math.max(DBTable.Rows.domNode.clientWidth,DBTable.titlebarNode.clientWidth);if(DBTable.maxHeight>parseInt(_DEFAULT_HEIGHT)){DBTable.set("height",_DEFAULT_HEIGHT);}var vl=x+"px",vt=y+"px",vr=x+DBTable.editorNode.clientWidth,vb=y+DBTable.editorNode.clientHeight,st=DBTable.editorNode.style;st.left=vl;st.top=vt;st.width=DBTable.titlebarNode.clientWidth+"px";DBTable.left=vl;DBTable.top=vt;return DBTable;}function getNewTablePos(tableIds){var rightmostTable,curRightBoundary,maxRightBoundary=0,left,top=20,table;$ARR.forEach(tableIds,function(tableId){table=mstrmojo.all[tableId];curRightBoundary=parseInt(table.left)+parseInt(table.editorNode.style.width);if(curRightBoundary>maxRightBoundary){maxRightBoundary=curRightBoundary;rightmostTable=table;}});left=Math.ceil(maxRightBoundary/200)*200+20;return{left:left,top:top};}function _constructDBTable(clns,table){var h=table.h,w=table.w,x=table.x,y=table.y,tbn=table.tbn,tid=table.did,dbtbn=table.dbtbn,namespace=table.ns,readOnly=table.readOnly,qdl=mstrmojo.all.QBuilderModel,tablePos;var maxh=_getTableHeight(clns.length);tablePos=getNewTablePos(qdl.dbtables);x=tablePos.left;y=tablePos.top;var DBTable=new mstrmojo.qb.DBTable({scriptClass:"mstrmojo.qb.DBTable",cssText:"position:absolute;left:0px;top:0px;width:"+(w?w:180)+"px;height:"+maxh+"px;",left:x+"px",top:y+"px",readOnly:readOnly,title:tbn,visible:true,readOnly:readOnly,noCheckBox:true,onClose:function(){var me=this;var cb={success:function(){me.parent.parent.linker.drawLinks();},failure:function(){}};qdl.removeTable(this,cb);},onRender:function(){if(readOnly&&this.closeNode){this.closeNode.title=mstrmojo.desc(12928,"Cannot delete this table since it is being used by the dashboard");mstrmojo.css.addClass(this.closeNode,"readonly");}}});qdl.upttIndex(tbn,dbtbn,DBTable.id,true,tid,namespace);qdl.raiseEvent({name:"refreshTables",items:qdl.dbtables.slice(0)});if(tid){qdl.uiids[tid]=DBTable.id;}DBTable.model=qdl;DBTable.container=this.parent;DBTable.selectedIndex=new Array();var tIndex=qdl.gettIndex(DBTable.id);var row,rname,imgs,i,len=clns.length;if(len){DBTable.addRow(('* <span class = "all"> '+mstrmojo.desc(12736,"Add all columns")+"</span>"),0,["0","0"],"");row=DBTable.Rows.children[0];row.draggable=false;row.dropZone=false;row.allowDrop=false;row.rIndex=-1;row.table=DBTable;row.ondblclick=function(evt){if(mstrmojo.dom.eventTarget(evt.hWin,evt.e).className.indexOf("add")<0){_addTableColumns(DBTable);}};row.oncontextmenu=function oncontextmenu(evt){$D.preventDefault(window,evt.e);};}for(i=0;i<len;i++){rname=clns[i].cln;imgs=clns[i].state?["0",_IMGS[clns[i].state]]:["0","0"];DBTable.addRow(clns[i].cln,0,imgs,"");DBTable.selectedIndex[i]=false;row=DBTable.Rows.children[i+1];row.cssClass=(i%2)?"odd":"even";row.srcTable=tbn;row.srcID=DBTable.id;row.srcData=clns[i];row.oriexpr=clns[i].exp?clns[i].exp:(tbn+"."+clns[i].cln);row.expr=[{isNew:true,v:qdl.brackets(row.oriexpr),oi:{tIndex:tIndex,rIndex:i+1,t:"26",n:row.oriexpr}}];row.img=_IMGS;row.enableExpr=!clns[i].hideExpr;row.state=!clns[i].state?0:clns[i].state;qdl.tables[DBTable.id].rows[row.id]=row;row.rIndex=i;row.count=!clns[i].count?0:clns[i].count;row.dt=clns[i].dt;row.updateState=function(newstate){if(this.count<=0){this.state=this.state&2;}this.state=this.state|newstate;var imgKey=(this.state&1)+(this.state&2);this.images[1]=this.img[imgKey];this.render();};row.ondblclick=function(evt){if(mstrmojo.dom.eventTarget(evt.hWin,evt.e).className.indexOf("add")<0){_addTableColumns(this);}};row.oncontextmenu=function oncontextmenu(evt){$D.preventDefault(window,evt.e);_openRMCContextMenu(this,{position:$D.getMousePosition(evt.e,window)});};if(tid){qdl.uiids[tid+clns[i].did]=row.id;}}this.addChildren([DBTable]);DBTable.maxHeight=maxh;var longestText=DBTable.Rows.domNode.clientWidth;mstrmojo.array.forEach(DBTable.Rows.domNode.children,function(child){longestText=Math.max(longestText,child.firstChild.children[1].clientWidth+30);});DBTable.maxWidth=Math.max(longestText,DBTable.titlebarNode.clientWidth);if(h<maxh){DBTable.set("height",h+"px");}var vl=x+"px",vt=y+"px",vr=x+DBTable.editorNode.clientWidth,vb=y+DBTable.editorNode.clientHeight+10,st=DBTable.editorNode.style,ts=this.parent,cvs_st=this.domNode.style,linker=ts.linker;DBTable.titlebarNode.style.width=parseInt(st.width,10)-56+"px";DBTable.titleNode.style.width=DBTable.titlebarNode.style.width;h=parseInt(ts.domNode.clientHeight);w=parseInt(ts.domNode.clientWidth);if(w<vr&&ts.maxWidth<vr){ts.maxWidth=vr;ts.canvasbox.set("width",ts.maxWidth+"px");ts.linker.set("width",ts.maxWidth+"px");qdl.linkerNeedRender=true;}if(h<vb&&ts.maxHeight<vb){ts.maxHeight=vb;ts.canvasbox.set("height",ts.maxHeight+"px");ts.linker.set("height",ts.maxHeight+"px");qdl.linkerNeedRender=true;}ts.domNode.style["overflow-x"]=(ts.maxWidth>w)?"auto":"hidden";ts.domNode.style["overflow-y"]=(ts.maxHeight>h)?"auto":"hidden";return DBTable;}mstrmojo.qb.QBTableView=mstrmojo.declare(mstrmojo.Box,null,{scriptClass:"mstrmojo.qb.QBTableView",joinMenuOption:{menuItems:_menuItems,joinItems:_joinItems,mappingKey:"database",joinOperators:_joinOperators},markupMethods:{onvisibleChange:function(){this.domNode.style.display=this.visible?"block":"none";}},init:function init(props){this._super(props);var evtConfig={},linkConfig=evtConfig[this.id]={},me=this;linkConfig.joinChanged=linkConfig.JoinsLoaded=linkConfig.JoinsAdded=function refreshLinks(){me.scrollBox.linker.drawLinks();};linkConfig.BindingTableLoaded=function displayBindingTable(evt){me.scrollBox.canvasbox.displayBindingTable(evt);};linkConfig.refreshTables=me.onTableRefresh;mstrApp.getRootController().attachDataChangeListeners(evtConfig);},onTableRefresh:function onTableRefresh(evt){var hasTable=evt.items.length>0;var scrollBox=this.scrollBox;mstrmojo.css.toggleClass(scrollBox.hintbox.domNode,["off"],hasTable);mstrmojo.css.toggleClass(scrollBox.domNode,["active"],hasTable);if(!hasTable){mstrApp.getRootController().toggleDataPreview(false);}},children:[{scriptClass:"mstrmojo.Box",alias:"scrollBox",cssClass:"mstrmojo-qb-tableview-box",maxWidth:0,maxHeight:0,markupString:'<div id="{@id}" class="mstrmojo-Box {@cssClass}" style="{@cssText}" mstrAttach:mouseover,mouseout></div>',onmouseover:function(){var height=parseInt(this.domNode.clientHeight),width=parseInt(this.domNode.clientWidth),style=this.domNode.style;if(width<this.maxWidth){style.overflowX="auto";}else{style.overflowX="hidden";this.domNode.scrollLeft=0;}if(height<this.maxHeight){style.overflowY="auto";}else{style.overflowY="hidden";this.domNode.scrollTop=0;}},onmouseout:function(){this.domNode.style.overflow="hidden";},children:[{scriptClass:"mstrmojo.Box",alias:"hintbox",markupString:'<div class="mstrmojo-qb-EmptyHint">{@emptyHint}</div>',cssDisplay:"",emptyHint:mstrmojo.desc(13246,"Drag and Drop table(s) from any database connections")},{scriptClass:"mstrmojo.qb.QBTableLinker",alias:"linker",cssClass:"mstrmojo-qb-tableview-linker",dropZone:true,allowDrop:function allowDrop(context){return(context.action===DRAG_ACTION_ADD_TABLE);},ondrop:function ondrop(context){this.parent.canvasbox.ondrop(context);mstrmojo.css.removeClass(this.domNode,"dragging");},ondragenter:function ondragenter(context){this.parent.canvasbox.ondragenter(context);mstrmojo.css.addClass(this.parent.domNode,"dragging");},ondragleave:function ondragenter(context){this.parent.canvasbox.ondragleave(context);mstrmojo.css.removeClass(this.domNode,"dragging");},onclick:function onclick(e){var me=this.parent.parent;_handleClickOnJoin.call(me,e.e,this,this);}},{scriptClass:"mstrmojo.Box",markupString:'<div id="{@id}" class="mstrmojo-Box {@cssClass}" style="{@cssText}" mstrAttach:click,dblclick,mousemove> </div>',cssClass:"mstrmojo-qb-tableview-canvas",alias:"canvasbox",dropZone:true,allowDrop:function allowDrop(context){return(context.action===DRAG_ACTION_ADD_TABLE);},onclick:function onclick(e){var me=this.parent.parent;_handleClickOnJoin.call(me,e.e,this.parent.linker,this);},displayBindingTable:function(evt){var tables=evt.value,left=0,_padding=20,top=20,height=0,width=0,pos,t,prev=0;for(var i=0,len=tables.length;i<len;i++){t=tables[i];pos=t.pos;if(pos){top=pos.t;left=pos.l;height=pos.h;width=pos.w;}else{height=_getTableHeight(t.cs.length);left+=prev+_padding;}t.h=height;t.w=width;t.x=left;t.y=top;var DBTable=_constructDBTable.call(this,t.cs,t);prev=DBTable.editorNode.clientWidth;}},updateTableName:function(e){var tid=e.tid;if(tid&&mstrmojo.all[tid]){var mdl=mstrmojo.all.QBuilderModel,DBTable=mstrmojo.all[tid],rows=DBTable.Rows.children,row,alias=e.value;mstrmojo.array.forEach(rows,function(row,index){if(index>0){row.oriexpr=alias+"."+row.srcData.cln;row.expr[0].v=mdl.brackets(row.oriexpr);row.expr[0].n=row.oriexpr;mdl.tables[tid].rows[row.id]=row;}});}},postCreate:function(){var mdl=mstrmojo.all.QBuilderModel;if(!mdl){return ;}mdl.attachEventListener("TableAdded",this.id,"drawTable");mdl.attachEventListener("TableNameChanged",this.id,"updateTableName");},ondrop:function ondrop(context){var dragEvent=context.action,contextSrc=context.src;if(contextSrc&&contextSrc.data){var dragData=contextSrc.data;if(dragEvent===DRAG_ACTION_ADD_TABLE){var currentPosition=context.tgt.pos,basePosition=mstrmojo.dom.position(context.tgt.node),x=currentPosition.x-basePosition.x;y=currentPosition.y-basePosition.y;var dataHelper=contextSrc.widget.dataHelper,index=0;mstrmojo.array.forEach(dragData,function(tableObj){dataHelper.fetch(tableObj,{success:function success(res){tableObj.x=x+index*15;tableObj.y=y+index*15;index++;mstrApp.getRootController().addTable(tableObj,res.items);}});});}}mstrmojo.css.removeClass(this.parent.domNode,"dragging");},getAvatarIconClass:function getAvatarIconClass(context){return"enabled";},ondragenter:function ondragenter(context){var srcWidget=context.src.widget;if(srcWidget&&srcWidget.toggleAvatarClass&&this.allowDrop(context)){srcWidget.toggleAvatarClass(this.getAvatarIconClass(context),true);}mstrmojo.css.addClass(this.parent.domNode,"dragging");},ondragleave:function ondragleave(context){var srcWidget=context.src.widget;if(srcWidget&&srcWidget.toggleAvatarClass&&this.allowDrop(context)){srcWidget.toggleAvatarClass(this.getAvatarIconClass(context),false);}mstrmojo.css.removeClass(this.parent.domNode,"dragging");},drawTable:function(evt){var data=evt.data,table=evt.table,h=_getTableHeight(data.length);h=(h>parseInt(_DEFAULT_HEIGHT,10))?parseInt(_DEFAULT_HEIGHT,10):h;table.h=h;table.w=null;_constructDBTable.call(this,data,table);}}]}],onheightChange:function(e){var h=parseInt(e.value)-3;this.scrollBox.set("height",h+"px");var cvb=this.scrollBox.canvasbox;if((!cvb.height)||(cvb.domNode&&h>cvb.domNode.clientHeight)){cvb.set("height",h+"px");this.scrollBox.linker.set("height",h);}if(this.scrollBox.domNode){this.scrollBox.hintbox.domNode.style.lineHeight=h+100+"px";this.scrollBox.domNode.style.height=this.scrollBox.height;if(parseInt(this.scrollBox.height)<this.scrollBox.maxHeight){this.scrollBox.linker.set("height",parseInt(this.scrollBox.maxHeight));this.scrollBox.linker.render();this.scrollBox.linker.drawLinks();this.scrollBox.canvasbox.domNode.style.height=parseInt(this.scrollBox.maxHeight)+"px";}else{this.scrollBox.linker.set("height",h);this.scrollBox.linker.render();this.scrollBox.linker.drawLinks();cvb.domNode.style.height=h+"px";cvb.height=cvb.domNode.style.height;}}},onwidthChange:function(e){var w=parseInt(e.value)-2;this.scrollBox.set("width",w+"px");var cvb=this.scrollBox.canvasbox;if((!cvb.width)||(cvb.domNode&&w>cvb.domNode.clientWidth)){cvb.set("width",w+"px");this.scrollBox.linker.set("width",w);}if(this.scrollBox.domNode){this.scrollBox.domNode.style.width=this.scrollBox.width;if(parseInt(this.scrollBox.width)<this.scrollBox.maxWidth){this.scrollBox.linker.set("width",parseInt(this.scrollBox.maxWidth));this.scrollBox.linker.render();this.scrollBox.linker.drawLinks();this.scrollBox.canvasbox.domNode.style.width=parseInt(this.scrollBox.maxWidth)+"px";}else{this.scrollBox.linker.set("width",w);this.scrollBox.linker.render();this.scrollBox.linker.drawLinks();cvb.domNode.style.width=w+"px";cvb.width=cvb.domNode.style.width;}}}});})();