(function(){mstrmojo.requiresCls("mstrmojo.MenuButton","mstrmojo.dom","mstrmojo.css");var $C=mstrmojo.css,$D=mstrmojo.dom;mstrmojo.warehouse.MenuButton=mstrmojo.declare(mstrmojo.MenuButton,null,{scriptClass:"mstrmojo.warehouse.MenuButton",cssClass:"mstrmojo-Editor-button function",cssText:"position:absolute;z-index:35; height:15px; width:12px; left:370px;visibility:hidden; border:0px solid; background-color:transparent",iconClass:"mstrmojo-ArchitectListIcon div",itemIdField:"did",itemField:"n",text:"",alias:"cxtmenu",data:null,itemChildrenField:"fns",searchItemAdded:true,dynamicUpdate:true,cachedrow:null,onContextMenuClose:function onContextMenuClose(){if(this.onexec){this._subMenu.set("visible",true);this.onexec=false;}},onRender:function onRender(){var me=this,domNode=this.domNode,handler=function(toggle){if(me.cachedrow){$C.toggleClass(me.cachedrow.domNode,"architect-highlight",true);}};$D.attachEvent(domNode,"mousemove",function(){handler(true);});$D.attachEvent(domNode,"mouseout",function(){handler(false);});}});}());