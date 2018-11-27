(function(){mstrmojo.requiresCls("mstrmojo.vi.ui.rw.RichTooltipBox","mstrmojo._FormatDefinition","mstrmojo.css","mstrmojo.Label","mstrmojo.Button","mstrmojo.vi.ui._CanDropFromSchema","mstrmojo.vi.models.EnumDragSources","mstrmojo.vi.models.EnumFieldTypes","mstrmojo._FormatDefinition","mstrmojo.hash");var $CSS=mstrmojo.css,$HASH=mstrmojo.hash,$FD=mstrmojo._FormatDefinition,$STR=mstrmojo.string,$EDS=mstrmojo.vi.models.EnumDragSources,$ENUM_FIELD_TYPES=mstrmojo.vi.models.EnumFieldTypes;function revertText(oldText){this.boxContent.update({defn:this.defn,data:{v:oldText}});}function getDroppedItems(context){var data=context&&context.src&&context.src.data,datasets=this.model.datasets,srcDataset;if(!data||(data.src!==$EDS.DATASETS&&data.src!==$EDS.ALL_OBJECT_LIST)){return[];}srcDataset=datasets&&datasets[data.dsid];return(data.items||[]).filter(function(item){return !!item.n;}).map(function(item){var isUnique=true;$HASH.forEach(datasets,function(dataset){if(dataset.did!==data.dsid&&dataset.mx&&dataset.mx.some(function(metric){return metric.n===item.n;})){isUnique=false;}});return srcDataset&&!isUnique?"{["+srcDataset.name+"]:["+item.n+"]}":"{["+item.n+"]}";});}function isEmpty(){return !this.boxContent||$STR.isEmpty(this.boxContent.getRawText());}function toggleOverlay(){if(isEmpty.call(this)){this.showControlOverlay(this.getEditOverlayControls());}else{this.hideControlOverlay();}}function failCallBack(id,newText,oldText){if(newText!==oldText){revertText.call(mstrmojo.all[id],oldText);}}mstrmojo.vi.ui.rw.TextBox=mstrmojo.declare(mstrmojo.vi.ui.rw.RichTooltipBox,[mstrmojo.vi.ui._CanDropFromSchema],{scriptClass:"mstrmojo.vi.ui.rw.TextBox",isDynamicTooltip:true,tooltipTopOffset:35,init:function init(props){this._super(props);$CSS.addWidgetCssClass(this,"mstrmojo-VITextBox");},getDisplayName:function getDisplayName(){return this.defn.n||mstrmojo.desc(1013,"Text");},textEdited:function textEdited(newText,textChanged,oldText){if(textChanged){var id=this.id;this.model.editField(this,$ENUM_FIELD_TYPES.TEXT,{fail:function(){failCallBack(id,newText,oldText);}},newText,oldText,null);}},getFormats:function getFormats(){var result=$HASH.clone(this._super());if(result){delete result.fx;}return result;},dropFromAllObjectsHandler:function dropFromAllObjectsHandler(newText,textChanged,oldText,context){if(textChanged){var id=this.id;this.model.editField(this,$ENUM_FIELD_TYPES.TEXT,{fail:function(){failCallBack(id,newText,oldText);}},newText,oldText,{actions:context.actions,callback:context.callback});}},applyBoxSize:function applyBoxSize(height,width,top,left){this._super(height,width,top,left);var boxContent=this.boxContent,childFormats=boxContent&&boxContent.getFormats();if(childFormats){childFormats.height=height;childFormats.width=width;boxContent.refresh();}},createDeleteUpdate:function createDeleteUpdate(){return this.model.getRemoveFieldUpdate(this);},addFormatProps:function addFormatProps(action,skipPartialRetrieval){action=this._super(action,skipPartialRetrieval)||this.model.getUnitFormatAction(this,NaN,null,skipPartialRetrieval);var formatAction=action.format=$HASH.copy(action.format,{FormattingSize:{}});formatAction.FormattingSize.HeightMode=0;return action;},getBoxDimension:function getBoxDimension(orientation){var boxContent=this.boxContent,childFormats=boxContent&&boxContent.getFormats();return(orientation==="h")?{f:false,l:null}:{f:true,l:parseInt(childFormats.height||"40px",10)};},getAvatarCls:function getAvatarCls(){return this._super().concat(["textAvatar"]);},ondrop:function ondrop(context){this._super(context);var droppedItems=getDroppedItems.call(this,context);if(droppedItems.length){var text=this.boxContent.getRawText();if(text){droppedItems.unshift(text);}if(context.getCtxtDragData().src===$EDS.ALL_OBJECT_LIST){this.augmentDropContextForSchema(context,this.getDocModel());this.dropFromAllObjectsHandler(droppedItems.join(" "),true,text,context);}else{this.textEdited(droppedItems.join(" "),true,text);}}},allowDropFromDataset:function allowDropFromDataset(){return mstrApp.allowWebDashboardDesign();},getEditOverlayControls:function getOverlayControls(){return[{scriptClass:"mstrmojo.Widget",markupString:'<div class="init-img"></div>'},{scriptClass:"mstrmojo.Label",cssClass:"init-label",text:mstrmojo.desc(13034,"Type directly or drag objects here.")}];},switchToEditMode:function switchToEditMode(){if(this.ctrlOverlay.visible){this.hideControlOverlay();}if(!this.boxContent.isEditing){var rawTxt=this.boxContent.getRawText();if(rawTxt){this.boxContent.set("text",rawTxt);}}this.boxContent.set("isEditing",true);},updateToolbar:function updateToolbar(cfg){if(this.canShowDesignMenuItems()){var id=this.id,defaultValue=$FD.DefaultFormat.FormattingNumber,model=this.model;cfg.addPopupMenuItem(mstrmojo.desc(3573,"Number Format..."),id,function(){var nf=this.defn.numFmts||{},category=nf.cat,formatValue={category:category===undefined?mstrmojo._FormatDefinition.NumberFormatCategory.Automatic:category,decimalPlaces:nf.dp||2,thousandSeparator:nf.ts||parseInt(defaultValue.ThousandSeparator,10),currencySymbol:nf.cs||defaultValue.CurrencySymbol,currencyPosition:nf.cp||defaultValue.CurrencyPosition,format:nf.nfs||"",negativeNumbers:nf.nn||defaultValue.NegativeNumbers},myData=$HASH.clone(formatValue);return new mstrmojo.ui.menus.EditorConfig({data:myData,cssClass:"NumberFormat-MenuEditor",contents:[{scriptClass:"mstrmojo.vi.ui.NumberFormatter",formatValue:formatValue,myData:myData,oldData:$HASH.clone(formatValue)}],fnOk:function fnOk(data){model.execute({execute:function execute(){var update=model.getDataService().newUpdate(this),textBox=mstrmojo.all[id];update.addActions(Object.keys(defaultValue).map(function(key){var fmtObject={};fmtObject[key]=data[key.substr(0,1).toLowerCase()+key.substr(1)];return model.getUnitFormatAction(textBox,1,{FormattingNumber:fmtObject});}));update.addCallbacks({success:function success(res){model.partialUpdate(res.data,model.getTargetDefn(textBox.k),res.defn,[textBox.k]);model.selectVIUnit(id);}});update.addExtras({style:{params:{treesToRender:3}}});update.submit();}});}});});}return this._super(cfg);},isDragValid:function isDragValid(context){return this._super(context)&&!this.boxContent.isEditing;},postBuildRendering:function postBuildRendering(){this._super();this.ctrlOverlay.domNode.onclick=function onclick(){this.switchToEditMode();}.bind(this);this.addDragHandle();var boxContent=this.boxContent;this.toggleDragHandleVisibility(boxContent.hasActiveLink()&&boxContent.text);},postUpdateLayout:function postUpdateLayout(){var isNew=this.isNewUnitContainer;this._super();if(isNew&&isEmpty.call(this)){this.switchToEditMode();}},destroy:function destroy(skipCleanup){var overlayNode=this.ctrlOverlay.domNode;if(overlayNode){delete overlayNode.onclick;}this._super(skipCleanup);},shouldShowCustomizeContextMenu:function(){return !this.boxContent.isEditing;},updateOverlay:function updateOverlay(){toggleOverlay.call(this);var boxContent=this.boxContent;this.toggleDragHandleVisibility(boxContent.hasActiveLink()&&boxContent.text);}});mstrmojo.vi.ui.rw.TextBox.boxConfiguration={f:{h:150,v:42},o:"v"};}());