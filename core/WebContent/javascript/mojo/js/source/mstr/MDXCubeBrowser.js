(function(){mstrmojo.requiresCls("mstrmojo.Editor","mstrmojo.ui.Pulldown");var BROWSE_LEVEL={DATA_SOURCES:0,CATALOGS:1,CUBES:2};function setBrowseLevel(items,level){return mstrmojo.array.map(items,function(item){item.lv=level;return item;});}mstrmojo.mstr.MDXCubeBrowser=mstrmojo.declare(mstrmojo.Editor,null,{title:mstrmojo.desc(4380,"Select MDX Cube"),help:"Select_MDX_Cube_dialog_box.htm",items:null,selectedItem:null,loadMDXData:function(params){params=params||{};var item=params.item||{};mstrmojo.xhr.request("GET",mstrConfig.taskURL,{success:function(res){params.success(res);},failure:function(res){mstrmojo.alert(res);}},{taskId:"browseMDX",level:item.lv||BROWSE_LEVEL.DATA_SOURCES,unitId:item.did||"",roleId:item.roleId||""});},init:function init(props){this._super(props);mstrmojo.css.addWidgetCssClass(this,"mstrmojo-MDXCubeBrowser");},children:[{scriptClass:"mstrmojo.ui.Pulldown",cssClass:"mstrmojo-MDXCubeBrowser-sources",alias:"mdxPulldown",selectedIndex:0,makeObservable:true,items:[{n:mstrmojo.desc(4381,"Data Sources"),did:"",lv:BROWSE_LEVEL.DATA_SOURCES}],getPopupListConfig:function(){var me=this;var cfg=mstrmojo.ui.Pulldown.prototype.getPopupListConfig();cfg.postclick=function(){me.handleSelection();};return cfg;},handleSelection:function(){var me=this,editor=me.parent;me.set("items",this.items.slice(0,this.selectedIndex+1));me.set("selectedIndex",this.items.length-1);var item=this.selectedItem||this.items[this.selectedIndex];editor.set("items",item.items);editor.set("selectedItem",null);},addItem:function(item){item.cls="lv-"+item.lv;this.set("items",this.items.concat(item));this.set("selectedIndex",this.items.length-1);}},{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-OBListItemIcon up mstrmojo-MDXCubeBrowser-sources-btn",bindings:{enabled:function(){return this.parent.mdxPulldown.selectedIndex>0;}},onenabledChange:function(){mstrmojo.css.toggleClass(this.domNode,"disabled",!this.enabled);},onclick:function(){var pulldown=this.parent.mdxPulldown;pulldown.set("selectedIndex",pulldown.selectedIndex-1);pulldown.handleSelection();}},{scriptClass:"mstrmojo.ui.List",cssClass:"mstrmojo-MDXCubeBrowser-cubes",alias:"cubeList",bindings:{items:function(){return this.setCssClass(this.parent.items);}},setCssClass:function(items){var me=this;return mstrmojo.array.map(items,function(itm){itm.cls=me.getItemCssClass(itm);return itm;});},selectionAdded:function(evt){if(!evt.isReselect){var me=this,editor=me.parent,item=me.items[evt.added];if(item.lv===BROWSE_LEVEL.CUBES+1){editor.set("selectedItem",item);return ;}var mdxPulldown=this.parent.mdxPulldown;editor.loadMDXData({item:item,success:function(res){var items=res.items;if(item.lv==BROWSE_LEVEL.CATALOGS){mstrmojo.array.map(items,function(it){it.roleId=item.did;return it;});}editor.set("items",setBrowseLevel(items,item.lv+1));item.items=items;mdxPulldown.addItem(item);}});}},getItemMarkup:function getItemMarkup(item,idx){return'<{@tag} class="item" idx="{@idx}" style="{@style}" title="{@title}"><span class="{@cls}"></span>{@en@n}</{@tag}>';},getItemCssClass:function(item){return"mstrIcon-lv mstrIcon-lv-"+{"1048583":"fDataSource","1048584":"fCatalog","1048585":"qc"}[item.dt];}},{scriptClass:"mstrmojo.Label",bindings:{text:function(){return mstrmojo.desc(2107,"## items found").replace("##",(this.parent.items&&this.parent.items.length)||0);}}},{scriptClass:"mstrmojo.HBox",alias:"btnHBox",slot:"buttonNode",cssClass:"mstrmojo-Editor-buttonBar",children:[mstrmojo.Button.newWebButton(mstrmojo.desc(547,"Select"),function onclick(){var editor=this.parent.parent;editor.close();editor.onOK(editor.selectedItem);},true,{bindings:{enabled:function(){return this.parent.parent.selectedItem.lv===3;}}}),mstrmojo.Button.newWebButton(mstrmojo.desc(221,"Cancel"),function onclick(){this.parent.parent.close();})]}],postBuildRendering:function(){var me=this;this._super();var mdxPulldown=this.mdxPulldown;this.loadMDXData({success:function(res){me.set("items",setBrowseLevel(res.items,BROWSE_LEVEL.CATALOGS));mdxPulldown.items[0].items=me.items;}});}});}());