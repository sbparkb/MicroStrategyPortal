(function(){mstrmojo.requiresCls("mstrmojo.Container");mstrmojo.requiresCls("mstrmojo.Widget");mstrmojo.requiresDescs(2131,2122,2127,2125,2123,9938,2219,2220,520,612,521,523,522,524,525,526,686,2784,687,2785,688,2786,696,746,7555,13083,13084,4561,12939,12940,7227,13387,12078,12736);function _makeTable(txt,ind,img,s,h,w,menus){var sh=h?"height:"+h+"px;":"";var sw=w?"width:"+w+"px;":"",curImg=img[1],textStyle="";var item='<div class="mstrmojo-qb-DBTableRow-bullet" style="'+sh+sw+'">';if(curImg==="tick"||curImg==="mix"){textStyle='style="font-weight: bold;"';curImg=(curImg==="tick")?0:16;}item+='<div class="icon t'+curImg+'"></div>';item+='<div class="text" '+textStyle+">"+txt+"</div>";if(menus&&menus.length){for(var i=0;i<menus.length;i++){item+='<div class="cxtmenu '+menus[i].n+'"></div>';}}item+="</div></div>";return item;}var _D=mstrmojo.dom,_doc=mstrmojo.global.document,$ARR=mstrmojo.array,$DESC=mstrmojo.desc;var _av,_avin,_avs;var _pos;function _updateAvatar(pos,allowDrop,html){if(html!=null){_avin.innerHTML=html;}_avs.left=pos.x+"px";_avs.top=pos.y+"px";}function _showAvatar(html,pos){if(!_av){_av=_doc.createElement("div");_avs=_av.style;_avs.position="absolute";_avs["z-index"]=9999;_av.className="mstrmojo-qb-TableRow-avatar";_av.innerHTML="<div></div>";_avin=_av.firstChild;_doc.body.appendChild(_av);}_updateAvatar(pos,true,html);_avs.display="block";}function _hideAvatar(){if(_av){_avs.display="none";}}function _isOver(w,x,y){if(!w.domNode){return false;}var pos=_D.position(w.domNode,true);return((pos.y<=y)&&(pos.x<=x)&&(pos.x+pos.w>=x)&&(pos.y+pos.h>=y));}function _findTouchDroppable(t,x,y){var el=document.elementFromPoint(x,y);var w=_D.findWidget(el);while(w){if(w.dropZone){if(w.allowDrop&&w.allowDrop(t)){return w;}}w=w.parent;}return null;}mstrmojo.qb.DBTableRow=mstrmojo.declare(mstrmojo.Container,[mstrmojo._HasPopup],{scriptClass:"mstrmojo.qb.DBTableRow",indent:0,text:"",checkBox:false,draggable:true,ownAvatar:true,dropZone:true,cxtmenus:null,allowDrop:function allowDrop(ctxt){return true;},ondrop:function ondrop(c){var srcw=c.src.widget,tgtw=c.tgt.widget,qdl=mstrmojo.all.QBuilderModel;if(srcw.domNode.className.indexOf("mstrmojo-qb-DBTableRow")<0){return ;}if(srcw.srcID==tgtw.srcID){return ;}if(qdl.joinsInfo[srcw.srcID+tgtw.srcID]){qdl.addLink(srcw,tgtw,srcw.srcID+tgtw.srcID);}else{if(qdl.joinsInfo[tgtw.srcID+srcw.srcID]){qdl.addLink(tgtw,srcw,tgtw.srcID+srcw.srcID);}else{qdl.addJoin(srcw,tgtw,0,null);}}},_leftPos:0,_topPos:0,movable:false,dropTarget:null,markupString:'<div id="{@id}" class="mstrmojo-qb-DBTableRow {@cssClass}" style="{@cssText}" mstrAttach:click,dblclick,contextmenu></div>',markupMethods:{ontextChange:function(){this.domNode.innerHTML=_makeTable(this.text,this.indent,this.images,this.selected,null,null,this.cxtmenus);},onvisibleChange:mstrmojo.Widget.visibleMarkupMethod,oncssClassChange:function oncssClassChange(){this.domNode.className="mstrmojo-qb-DBTableRow "+(this.cssClass||"");}},getDragData:function(c){var d={};if(this.domNode){d.html=_makeTable(this.text,this.indent,this.images,this.selected,this.domNode.offsetHeight,this.domNode.offsetWidth);d.n=this.text;}return d;},isDragValid:function isDragValid(context){return _D.contains(this.domNode,context.src.node,true,document.body);},ondragstart:function(c){if(_D.isWK){document.onselectstart=function(e){e.preventDefault();return false;};}this.domNode.style.cssText="opacity:0.3; filter: alpha(opacity=30);";_pos=_D.position(this.domNode);_showAvatar(_makeTable(this.text,this.indent,this.images,this.selected,this.domNode.offsetHeight,this.domNode.offsetWidth),_pos);},ondragmove:function(c){var e=c.tgt.pos;_updateAvatar({x:e.x+5,y:e.y+5},true,_makeTable(this.text,this.indent,this.images,this.selected,this.domNode.offsetHeight,this.domNode.offsetWidth));},ondragend:function(){if(_D.isWK){document.onselectstart=function(){return true;};}if(this.domNode){this.domNode.style.cssText="opacity:1; filter: alpha(opacity=100);";}_hideAvatar();},onclick:function(evt){var hWin=evt.hWin,e=evt.e||hWin.event,tgt=e.target||e.srcElement;if(tgt.type==="checkbox"){if(this.onCheck){this.onCheck(tgt.checked);}}},postBuildRendering:function(){this.set("richTooltip",{cssClass:"vi-regular vi-tooltip-D",refNode:this.domNode,posType:mstrmojo.tooltip.POS_TOPRIGHT,content:this.rIndex>=0?this.text:mstrmojo.desc(12736,"Add all columns")});if(!this._ontooltipover){var id=this.id;this._ontooltipover=function(e){var me=mstrmojo.all[id];me.showTooltip(e,self);};this._ontooltipout=function(e){var me=mstrmojo.all[id];me.hideTooltip(e,self);};}mstrmojo.dom.attachEvent(this.domNode,"mouseover",this._ontooltipover);mstrmojo.dom.attachEvent(this.domNode,"mouseout",this._ontooltipout);return this._super();}});var AGGR_FUNC_ITEMS=[{n:$DESC(2131,"Sum"),idx:1},{n:$DESC(2122,"Average"),idx:2},{n:$DESC(2127,"Minimum"),idx:3},{n:$DESC(2125,"Maximum"),idx:4},{n:$DESC(2123,"Count"),idx:5},{n:$DESC(9938,"Count Distinct"),idx:6}];var FILTER_TYPES={SEPARATOR:-1,IN_LIST:0,NOT_IN_LIST:1,EXACTLY:2,NOT_EXACTLY:3,GREATER_THAN:4,LESS_THAN:5,GREATER_THAN_EQ:6,LESS_THAN_EQ:7,LIKE:8,NOT_LIKE:9,CONTAIN:10,NOT_CONTAIN:11,BEGIN_WITH:12,NOT_BEGIN_WITH:13,END_WITH:14,NOT_END_WITH:15,BETWEEN:16,NOT_BETWEEN:17},FILTER_ITEMS={0:{did:2219,n:$DESC(2219,"In list")},1:{did:2220,n:$DESC(2220,"Not in list")},2:{did:520,n:$DESC(520,"Exactly")},3:{did:612,n:$DESC(612,"Not Exactly")},4:{did:521,n:$DESC(521,"Greater than")},5:{did:523,n:$DESC(523,"Less than")},6:{did:522,n:$DESC(522,"Greater than equal")},7:{did:524,n:$DESC(524,"Less than equal")},8:{did:525,n:$DESC(525,"Like")},9:{did:526,n:$DESC(526,"Not like")},10:{did:686,n:$DESC(686,"Contains")},11:{did:2784,n:$DESC(2784,"Does not contain")},12:{did:687,n:$DESC(687,"Begins with")},13:{did:2785,n:$DESC(2785,"Does not begin with")},14:{did:688,n:$DESC(688,"Ends with")},15:{did:2786,n:$DESC(2786,"Does not end with")},16:{did:"Between",n:$DESC(696,"Between")},17:{did:"Not between",n:$DESC(746,"Not between")}};var FILTER_MENU_ITEMS_COMMON=[FILTER_TYPES.IN_LIST,FILTER_TYPES.NOT_IN_LIST,FILTER_TYPES.SEPARATOR,FILTER_TYPES.EXACTLY,FILTER_TYPES.NOT_EXACTLY,FILTER_TYPES.SEPARATOR,FILTER_TYPES.GREATER_THAN,FILTER_TYPES.LESS_THAN,FILTER_TYPES.SEPARATOR,FILTER_TYPES.LIKE,FILTER_TYPES.NOT_LIKE],FILTER_MENU_ITEMS_BASIC=[FILTER_TYPES.IN_LIST,FILTER_TYPES.NOT_IN_LIST,FILTER_TYPES.SEPARATOR,FILTER_TYPES.EXACTLY,FILTER_TYPES.NOT_EXACTLY],FILTER_MENU_ITEMS_NUMERIC=[FILTER_TYPES.GREATER_THAN,FILTER_TYPES.LESS_THAN,FILTER_TYPES.SEPARATOR,FILTER_TYPES.GREATER_THAN_EQ,FILTER_TYPES.LESS_THAN_EQ,FILTER_TYPES.SEPARATOR,FILTER_TYPES.BETWEEN,FILTER_TYPES.NOT_BETWEEN],FILTER_MENU_ITEMS_STRING=[FILTER_TYPES.LIKE,FILTER_TYPES.NOT_LIKE,FILTER_TYPES.SEPARATOR,FILTER_TYPES.CONTAIN,FILTER_TYPES.NOT_CONTAIN,FILTER_TYPES.SEPARATOR,FILTER_TYPES.BEGIN_WITH,FILTER_TYPES.NOT_BEGIN_WITH,FILTER_TYPES.SEPARATOR,FILTER_TYPES.END_WITH,FILTER_TYPES.NOT_END_WITH];mstrmojo.qb.DBTableRowMenu=mstrmojo.declare(mstrmojo.Obj,null,{scriptClass:"mstrmojo.qb.DBTableRowMenu",menuCssClass:"mstrmojo-qb-DBTableRowMenu",menuCfg:null,tableRow:null,handleAddColumn:function handleAddColumn(item){var tableRow=this.tableRow,selRows=[tableRow],tIndex,rootController=mstrApp.getRootController(),callback;tIndex=rootController.gettIndex(tableRow.parent.parent.id);callback={success:function(){tableRow.updateState(1);tableRow.count++;}};rootController.addSelectedColumns(selRows,tIndex,null,callback);return true;},handleAddExpression:function handleAddExpression(item){var column=this.tableRow,ENUM_EXPRESSION_TYPE_NEW_COLUMN=0;mstrApp.getRootController().openExpressionEditor({type:ENUM_EXPRESSION_TYPE_NEW_COLUMN,w:column,tkn:column.expr});return true;},handleAddAggrColumn:function handleAddAggrColumn(item){var ctxt=item.ctxt,tableRow=this.tableRow,aggrFuncIdx=ctxt.aggrFuncIdx,selRows=[tableRow],tIndex,rootController=mstrApp.getRootController(),callback;tIndex=rootController.gettIndex(tableRow.srcID);callback={success:function(){if(tableRow.state==0||tableRow.state==2){tableRow.state++;tableRow.images[1]=tableRow.img[tableRow.state];tableRow.render();}tableRow.count++;}};rootController.addSelectedColumns(selRows,tIndex,aggrFuncIdx,callback);return true;},handleAddFuncExpr:function handleAddFuncExpr(item){var funcItem=item.ctxt,column=this.tableRow;mstrApp.getRootController().openExpressionEditor({type:0,selFuncItem:funcItem,w:column});},getSubMenuConfigComFuncs:function getSubMenuConfigComFuncs(ctxt){var cfg=new mstrmojo.ui.menus.MenuConfig(),addAggrColumnFunc,me=this;addAggrColumnFunc=function(item){me.handleAddAggrColumn(item);};$ARR.forEach(AGGR_FUNC_ITEMS,function(item){if(item.idx==6&&mstrApp.getRootController()&&mstrApp.getRootController().isBDE&&mstrApp.getRootController().isBDE==true){cfg.addDisabledMenuItem(item.n,"");}else{cfg.addMenuItem(item.n,"",addAggrColumnFunc,{aggrFuncIdx:item.idx});}});return cfg;},getSubMenuConfigFuncs:function getSubMenuConfigFuncs(ctxt){var cfg=new mstrmojo.ui.menus.MenuConfig(),id=this.id,addExprFunc,me=this,funcList,depth;addExprFunc=function(item){me.handleAddFuncExpr(item);};if(!ctxt){funcList=mstrApp.getRootController().getFunctionList();depth=1;}else{funcList=ctxt.funcList;depth=ctxt.depth;}$ARR.forEach(funcList,function(item){if(item.fns&&item.fns.length){cfg.addSubMenuItem(item.n,"depth"+depth.toString(),id,this.getSubMenuConfigFuncs,{funcList:item.fns,depth:depth+1});}else{cfg.addMenuItem(item.n,"",addExprFunc,item);}},this);return cfg;},handleAddFilter:function handleAddFilter(item){var ctxt=item.ctxt,column=this.tableRow,opID=ctxt.opID,datatype=column.dt.tp,DATE_TIME_TYPE={14:true,15:true,16:true},IS_BIGDECIMAL={30:true},STRING_TYPE={8:true,9:true,10:true,17:true,18:true,33:true},fve,fveid,paraNum;mstrApp.getRootController().openConditionDialog();switch(opID){case FILTER_ITEMS[FILTER_TYPES.BETWEEN].did:case FILTER_ITEMS[FILTER_TYPES.NOT_BETWEEN].did:paraNum=2;break;default:paraNum=1;}fveid="mstr-qb-fve";fve=mstrmojo.all[fveid]||(new mstrmojo.qb.FilterValueEditor({id:fveid,zIndex:1000}));fve.n=item.n;fve.operatorID=opID;fve.column=column.oriexpr;fve.isDateTime=!!DATE_TIME_TYPE[datatype];fve.isBigDecimal=!!IS_BIGDECIMAL[datatype];fve.isString=!!STRING_TYPE[datatype];fve.paraNum=paraNum;fve.open();},getSubMenuConfigClauses:function getSubMenuConfigClauses(type,ctxt){var cfg=new mstrmojo.ui.menus.MenuConfig(),addFilterFunc,me=this,item,menuItems;addFilterFunc=function(item){me.handleAddFilter(item);};switch(type){case"common":menuItems=FILTER_MENU_ITEMS_COMMON;break;case"basic":menuItems=FILTER_MENU_ITEMS_BASIC;break;case"numeric":menuItems=FILTER_MENU_ITEMS_NUMERIC;break;case"string":menuItems=FILTER_MENU_ITEMS_STRING;break;}$ARR.forEach(menuItems,function(menuItem){if(menuItem===FILTER_TYPES.SEPARATOR){cfg.addSeparator();}else{item=FILTER_ITEMS[menuItem];cfg.addMenuItem(item.n,"",addFilterFunc,{opID:item.did});}});return cfg;},getSubMenuConfigComClauses:function getSubMenuConfigComClauses(ctxt){return this.getSubMenuConfigClauses("common",ctxt);},getSubMenuConfigAllClauses:function getSubMenuConfigAllClauses(ctxt){var cfg=new mstrmojo.ui.menus.MenuConfig(),id=this.id;cfg.addSubMenuItem($DESC(7227,"Basic"),"",id,this.getSubMenuConfigAllClausesBasic,ctxt);cfg.addSubMenuItem($DESC(13387,"Comparison"),"",id,this.getSubMenuConfigAllClausesNumeric,ctxt);cfg.addSubMenuItem($DESC(12078,"Pattern"),"",id,this.getSubMenuConfigAllClausesString,ctxt);return cfg;},getSubMenuConfigAllClausesBasic:function getSubMenuConfigAllClausesBasic(ctxt){return this.getSubMenuConfigClauses("basic",ctxt);},getSubMenuConfigAllClausesNumeric:function getSubMenuConfigAllClausesNumeric(ctxt){return this.getSubMenuConfigClauses("numeric",ctxt);},getSubMenuConfigAllClausesString:function getSubMenuConfigAllClausesString(ctxt){return this.getSubMenuConfigClauses("string",ctxt);},getMenuConfig:function(){var cfg=this.menuCfg,id=this.id,addColumnFunc,editColumnFunc,me=this;if(!cfg){cfg=this.menuCfg=new mstrmojo.ui.menus.MenuConfig({menuCssClass:this.menuCssClass});}else{cfg.clear();}addColumnFunc=function(item){me.handleAddColumn(item);};editColumnFunc=function(item){me.handleAddExpression(item);};cfg.addMenuItem($DESC(7555,"Add Column"),"",addColumnFunc);if(me.tableRow.enableExpr){cfg.addMenuItem($DESC(13083,"Edit Column"),"",editColumnFunc);}cfg.addSeparator();cfg.addSubMenuItem($DESC(13084,"Basic Functions"),"",id,this.getSubMenuConfigComFuncs);cfg.addSubMenuItem($DESC(4561,"All Functions"),"",id,this.getSubMenuConfigFuncs);cfg.addSeparator();cfg.addSubMenuItem($DESC(12939,"Basic Filters"),"",id,this.getSubMenuConfigComClauses);cfg.addSubMenuItem($DESC(12940,"All Filters"),"",id,this.getSubMenuConfigAllClauses);return cfg;}});})();