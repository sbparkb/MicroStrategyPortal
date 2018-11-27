(function(){mstrmojo.requiresCls("mstrmojo.array","mstrmojo.Container","mstrmojo._HasLayout","mstrmojo.ui._HasScroller","mstrmojo.vi.ui.PanelContents");mstrmojo.vi.ui.BoxPanel=mstrmojo.declare(mstrmojo.Container,[mstrmojo._HasLayout,mstrmojo.ui._HasScroller],{scriptClass:"mstrmojo.vi.ui.BoxPanel",markupString:'<div id="{@id}" class="mstrmojo-VIBoxPanel {@cssClass}" style="{@cssText}"><div class="mstrmojo-VIBoxPanel-control"></div><div class="mstrmojo-VIBoxPanel-content"></div><div class="mstrmojo-VIBoxPanel-mask"></div></div>',markupSlots:{controlNode:function(){return this.domNode.firstChild;},containerNode:function(){return this.domNode.childNodes[1];},maskNode:function(){return this.domNode.lastChild;}},markupMethods:{onvisibleChange:mstrmojo.Widget.visibleMarkupMethod},layoutConfig:{h:{controlNode:"auto",containerNode:"100%"},w:{controlNode:"100%",containerNode:"100%"},xt:true},controlNode:null,containerNode:null,maskNode:null,parent:null,slot:"containerNode",children:[{scriptClass:"mstrmojo.vi.ui.PanelContents",slot:"containerNode",alias:"contents"}],_set_children:function _set_children(n,v,silent){var children=this.children;if(v!==children&&children){v=v.concat(children.filter(function(child){return child.slot==="controlNode";}));}return this._super(n,v,silent);},doLayout:function doLayout(){if(!this.visible){return ;}this._super();},addPopupHandlers:function addPopupHandlers(config,fnOpen,fnClose){config.addPopupHandlers(this.id,fnOpen,fnClose);},setOpenStatus:function setOpenStatus(isOpen,skipServerRequest,update,skipReLayout){if(!isOpen){this.parent.removePanel(this,update,skipServerRequest,skipReLayout);mstrApp.rootCtrl.generateToolbar();}},updateToolbar:function updateToolbar(cfg){cfg.hostId=this.id;cfg.isHostedWithin=false;return cfg;},addRenameTargetMenuItem:function addRenameTargetMenuItem(cfg){cfg.addMenuItem(mstrmojo.desc(1388,"Rename"),"rnm",function(){this.toolbar.lblTitle.set("isEditing",true);}.bind(this));},addHelpTopicMenuItem:function addHelpTopicMenuItem(cfg,text,topic){if(topic){cfg.addMenuItem(text,"help",function(){mstrApp.showHelpTopic(topic);});}},addCloseMenuItem:function addCloseMenuItem(cfg,model){cfg.addMenuItem(mstrmojo.desc(2177,"Close"),"",function(){var update=model.getDataService().newUpdateWithoutCmd();this.setOpenStatus(false,false,update);update.submit();}.bind(this));},getOpenStatus:function getOpenStatus(){return true;},setupScrollNodes:function setupScrollNodes(){this.scrollNode=this.containerNode;}});mstrmojo.vi.ui.BoxPanel.PANEL_TYPES={DROP_ZONES:"vi_drz",PROPS:"vi_prp",FILTERS:"vi_flt"};}());