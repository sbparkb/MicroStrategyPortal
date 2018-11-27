(function(){mstrmojo.requiresCls("mstrmojo.Container","mstrmojo._HasLayout","mstrmojo.vi._MonitorsAppState","mstrmojo.EditableLabel","mstrmojo.vi.ui.toolbars.TitleToolbar");var $DOM=mstrmojo.dom;mstrmojo.vi.ui.TitleBar=mstrmojo.declare(mstrmojo.Container,[mstrmojo._HasLayout,mstrmojo.vi._MonitorsAppState],{scriptClass:"mstrmojo.vi.ui.TitleBar",markupString:'<div id="{@id}" class="mstrmojo-VITitleBar {@cssClass}" style="{@cssText}" mstrAttach:contextmenu,click><div class="left-toolbar"></div><div class="title-text"></div><div class="right-toolbar"></div></div>',markupSlots:{leftToolNode:function(){return this.domNode.firstChild;},textNode:function(){return this.domNode.childNodes[1];},rightToolNode:function(){return this.domNode.lastChild;},containerNode:function(){return this.domNode;}},markupMethods:{ontitleChange:function(){this.lblTitle.set("text",this.title||" ");},ontoolbarCfgChange:function(){var cfg=this.toolbarCfg;if(!cfg){return ;}this.tbToolbar.set("toolbarCfg",cfg);this.doLayout();},onvisibleChange:mstrmojo.Widget.visibleMarkupMethod},layoutConfig:{w:{leftToolNode:"auto",textNode:"100%",rightToolNode:"auto"},h:{leftToolNode:"100%",textNode:"100%",rightToolNode:"100%"},xt:true},lblTitle:null,tbToolbar:null,editTitleOnClick:false,editTitleOnDoubleClick:true,title:"",close:mstrmojo.emptyFn,toolbarCfg:null,titleEdited:mstrmojo.emptyFn,useRichTooltip:true,init:function init(props){this._super(props);this.addChildren([].concat(this.getLeftToolbarChildren()).concat(this.getTitleChildren()).concat(this.getRightToolbarChildren()));},shouldShowTooltip:function shouldShowTooltip(evt,win){var target=evt.target||$DOM.eventTarget(evt.hWin,evt.e);return target===this.textNode.firstChild&&(target.scrollWidth>target.clientWidth);},getTooltipContent:function getTooltipContent(evt){var target=evt.target||$DOM.eventTarget(evt.hWin,evt.e),content=target.innerHTML;return content;},showTooltip:function showTooltip(evt,win){if(this.shouldShowTooltip(evt,win)){this._super(evt,win);}},updateTooltipConfig:function updateTooltipConfig(evt){var target=evt.target||$DOM.eventTarget(evt.hWin,evt.e),position=$DOM.position(target);this.richTooltip={posType:mstrmojo.tooltip.POS_TOPLEFT,content:this.getTooltipContent(evt),top:position.y+position.h+3,left:position.x+4,cssClass:"vi-regular vi-tooltip-A"};},getLabelNode:function getLabelNode(){return this.lblTitle.domNode;},getMenuConfig:function getMenuConfig(){var cfg=this.toolbarCfg;if(cfg){if(cfg.hasMenuItems()){return cfg;}}return null;},setToolbarVisibility:function setToolbarVisibility(isVisible){this.tbToolbar.set("visible",isVisible);},editTitle:function editTitle(){this.lblTitle.set("isEditing",true);},onAppStateChange:function onAppStateChange(evt){var lblTitle=this.lblTitle,isPresentationMode=evt.value===mstrmojo.vi.VisualInsightApp.APP_STATES.PRESENTATION,wasPresentationMode=evt.valueWas===mstrmojo.vi.VisualInsightApp.APP_STATES.PRESENTATION;if(isPresentationMode&&this._confgTitleEditable===undefined){this._confgTitleEditable=this.editTitleOnClick||this.editTitleOnDoubleClick;}lblTitle.set("isEditing",false);if(isPresentationMode||wasPresentationMode){lblTitle.set("editOnDoubleClick",!isPresentationMode&&this._confgTitleEditable);}},getLeftToolbarChildren:function getLeftToolbarChildren(){},getTitleChildren:function getTitleChildren(){return[{scriptClass:"mstrmojo.EditableLabel",slot:"textNode",alias:"lblTitle",bindings:{editOnClick:"this.parent.editTitleOnClick",editOnDoubleClick:"this.parent.editTitleOnDoubleClick",selectable:"this.isEditing"},onTextEditComplete:function(textChanged,oldText){this.parent.titleEdited(this.text,textChanged,oldText);},getLayoutOffsets:function getLayoutOffsets(){return{h:2,w:2};}}];},getRightToolbarChildren:function getRightToolbarChildren(){return[{scriptClass:"mstrmojo.vi.ui.toolbars.TitleToolbar",slot:"rightToolNode",alias:"tbToolbar",visible:true,useRichTooltip:true}];}});}());