(function(){mstrmojo.requiresCls("mstrmojo.vi.models.editors.BaseEditorModel","mstrmojo.ui.editors.controls.CharacterGroup","mstrmojo.ui.editors.controls.ContainerGroup","mstrmojo.ui.editors.controls.XtabResizeGroup","mstrmojo.ui.editors.CharacterToolbarPopup","mstrmojo.Label","mstrmojo.hash","mstrmojo.array","mstrmojo.models.FormatModel","mstrmojo.models.template.DataInterface");var TARGET_COL=2,TARGET_ROW=3,TARGET_VALUES=4,TARGET_GENERAL=5;var $CONTAINER_FLAGS=mstrmojo.ui.editors.controls.ContainerGroup.CTRL_FLAGS,$ENUM_FORMAT_PROPERTIES=mstrmojo.models.FormatModel.ENUM_PROPERTY_NAMES,$GET_FORMAT_OBJ=mstrmojo.models.FormatModel.getFormatUpdate,$HASH=mstrmojo.hash,$ARR=mstrmojo.array;var targetFormatMap={};targetFormatMap[TARGET_COL]="ch";targetFormatMap[TARGET_ROW]="rh";targetFormatMap[TARGET_VALUES]="va";var cellAlignValueMap={left:2,center:3,right:4,justify:6};function getGridCellFormats(){var gridData=this.getHost().gridData,gridStructureInfo=gridData&&gridData.gsi;return(gridStructureInfo&&gridStructureInfo.fmts)||{};}function showBanding(){var xtab=this.getHost(),show=xtab.gridInfo&&xtab.gridInfo.prop&&xtab.gridInfo.prop.sb,fnChange=function(show){xtab.showBanding(show);};return this.getCheckboxAndLabel(!!show,mstrmojo.desc(13578,"Show banding"),fnChange);}function getCellVerticalAlign(formats,fnChange){return this.getLabelAndControl(mstrmojo.desc(3435,"Alignment"),this.getButtonBar([{n:mstrmojo.desc(7575,"Top"),v:1,css:"top"},{n:mstrmojo.desc(8631,"Middle"),v:2,css:"middle"},{n:mstrmojo.desc(7576,"Bottom"),v:3,css:"bottom"}],formats[$ENUM_FORMAT_PROPERTIES.VERTICAL_ALIGN]-1,function(newItem,oldItem){fnChange(newItem.v,oldItem.v);},{cssClass:"cellAlign"}));}function getCellTextAlign(formats,fnChange){return this.getTextAlign($HASH.keyarray(cellAlignValueMap).filter(function(a){return formats[$ENUM_FORMAT_PROPERTIES.TEXT_ALIGN]===cellAlignValueMap[a];})[0],fnChange,cellAlignValueMap);}function getTargetFormats(targetValue){return getGridCellFormats.call(this)[targetFormatMap[targetValue]];}function getTargetFormatHandler(targetValue){var xtab=this.getHost();return function(property,newValue){xtab.formatGridZone(targetFormatMap[targetValue],$GET_FORMAT_OBJ(property,newValue));};}function getGridCellControls(dynamicCtrlGroup,targetValue){var formats=getTargetFormats.call(this,targetValue),fnChangeProperty=getTargetFormatHandler.call(this,targetValue),fnGetChangePropFn=function(property){return function(newValue){fnChangeProperty(property,newValue);};};this.replaceChildControls(dynamicCtrlGroup,[this.getEditorGroup([this.getCharacterGroup(fnChangeProperty,formats),this.getContainerGroup(formats,fnChangeProperty,$CONTAINER_FLAGS.FILL_COLOR),this.getContainerGroup(formats,fnChangeProperty,$CONTAINER_FLAGS.BORDER,{borderTitle:mstrmojo.desc(12130,"Horizontal Lines"),targetBorder:"bottom"}),this.getContainerGroup(formats,fnChangeProperty,$CONTAINER_FLAGS.BORDER,{borderTitle:mstrmojo.desc(12131,"Vertical Lines"),targetBorder:"right"}),getCellVerticalAlign.call(this,formats,fnGetChangePropFn($ENUM_FORMAT_PROPERTIES.VERTICAL_ALIGN)),getCellTextAlign.call(this,formats,fnGetChangePropFn($ENUM_FORMAT_PROPERTIES.TEXT_ALIGN)),this.getWrapText(!!formats[$ENUM_FORMAT_PROPERTIES.TEXT_WRAP],fnGetChangePropFn($ENUM_FORMAT_PROPERTIES.TEXT_WRAP))])]);}function getGeneralControls(dynamicCtrlGroup){var xtab=this.getHost(),gridData=xtab.gridData,xtabInterface=new mstrmojo.models.template.DataInterface(gridData);var resizeGroup=new mstrmojo.ui.editors.controls.XtabResizeGroup({});resizeGroup.setFormatSource(xtab);xtab.attachEventListener("xtabColsMeasured",resizeGroup.id,function(){resizeGroup.setFormatSource(xtab);});var padding=xtabInterface.getAggregatePadding(),paddingSize=5,paddingIdx=0,paddingValues=[paddingSize,paddingSize],max=paddingSize,enablePadding=false;if(padding){paddingValues=[padding.h,padding.v].sort(function(a,b){return a-b;});max=paddingValues[1];paddingIdx=Math.max(Math.min(Math.round((max-paddingSize)/paddingSize),2),0);enablePadding=true;}var ctrlPadding=this.getLabelAndControl(mstrmojo.desc(13579,"Padding:"),this.getButtonBar([{n:mstrmojo.desc(12141,"S"),v:paddingSize,css:"small"},{n:mstrmojo.desc(12142,"M"),v:paddingSize*2,css:"medium"},{n:mstrmojo.desc(12140,"L"),v:paddingSize*3,css:"large"}],paddingIdx,function(newValue){xtab.formatPadding(newValue.v,newValue.v*(paddingValues[0]/max));},{cssClass:"cellPadding",showIcon:false}));ctrlPadding.set("enabled",enablePadding);var me=this,fnChangeAllGridFontsProperty=function(property,newValue){xtab.batchFormatGridZones([TARGET_COL,TARGET_ROW,TARGET_VALUES].map(function(targetValue){return targetFormatMap[targetValue];}),$ARR.isArray(newValue)?newValue.map(function(value){return $GET_FORMAT_OBJ(property,value);}):[TARGET_COL,TARGET_ROW,TARGET_VALUES].map(function(){return $GET_FORMAT_OBJ(property,newValue);}));},fnGetAllGridFontsFormat=function(){var format=null;[TARGET_COL,TARGET_ROW,TARGET_VALUES].forEach(function(targetValue){var f=getGridCellFormats.call(me)[targetFormatMap[targetValue]],enFontSize=$ENUM_FORMAT_PROPERTIES.FONT_SIZE,enFontFamily=$ENUM_FORMAT_PROPERTIES.FONT_FAMILY,enFontColor=$ENUM_FORMAT_PROPERTIES.COLOR;if(Object.keys(f).length===0){return ;}if(!format){format=$HASH.copy(f);format[enFontSize]=$ARR.ensureArray(format[enFontSize]);}else{format[enFontSize].push(f[enFontSize]);if(format[enFontFamily]!==f[enFontFamily]){format[enFontFamily]=-1;}if(format[enFontColor]!==f[enFontColor]){delete format[enFontColor];}}});return format;};this.replaceChildControls(dynamicCtrlGroup,[this.getEditorGroup([]),this.getEditorGroup([this.getGroupTitle(mstrmojo.desc(14006,"All Grid Fonts")),this.getCharacterGroup(fnChangeAllGridFontsProperty,fnGetAllGridFontsFormat(),23)]),this.getEditorGroup([showBanding.call(this)]),this.getEditorGroup([this.getGroupTitle(mstrmojo.desc(12129,"Grid Size")),ctrlPadding,resizeGroup]),this.getEditorGroup([this.getMoreOptionsEditorLink(gridData&&gridData.gsi&&gridData.gsi.prop,true,gridData&&gridData.lhv)])]);}mstrmojo.vi.models.editors.XtabEditorModel=mstrmojo.declare(mstrmojo.vi.models.editors.BaseEditorModel,null,{scriptClass:"mstrmojo.vi.models.editors.XtabEditorModel",help:"dashboard_editor_grid_properties_html5.htm",getInitialTarget:function getInitialTarget(){return TARGET_GENERAL;},getTargetPulldownItems:function getTargetPulldownItems(dynamicCtrlGroup){var xtab=this.getHost(),gridInfo=xtab.gridInfo,pulldownItems=this._super(dynamicCtrlGroup);if(gridInfo&&(gridInfo.rows.length||gridInfo.cols.length)){var formats=xtab.getFormats(),selectionHandler=getGridCellControls.bind(this,dynamicCtrlGroup);pulldownItems.unshift({n:mstrmojo.desc(6560,"General Settings"),v:TARGET_GENERAL,h:getGeneralControls.bind(this,dynamicCtrlGroup)});if(formats){var gridFormats=getGridCellFormats.call(this);if(gridFormats){if(gridFormats.ch){pulldownItems.push({n:mstrmojo.desc(12132,"Column Headers"),v:TARGET_COL,h:selectionHandler});}if(gridFormats.rh){pulldownItems.push({n:mstrmojo.desc(12133,"Row Headers"),v:TARGET_ROW,h:selectionHandler});}if(gridFormats.va){pulldownItems.push({n:mstrmojo.desc(12134,"Values"),v:TARGET_VALUES,h:selectionHandler});}}}}return pulldownItems;},getFormattingToolbar:function getFormattingToolbar(fmtTarget,anchorEl,props){var formats=getTargetFormats.call(this,fmtTarget);if(formats){var toolbar=new mstrmojo.ui.editors.CharacterToolbarPopup($HASH.copy({onGroupValueChange:getTargetFormatHandler.call(this,fmtTarget),textAlignValueMap:cellAlignValueMap,anchorElement:anchorEl},props));toolbar.setFormatSource(formats);return toolbar;}return this._super(fmtTarget,anchorEl,props);}});mstrmojo.vi.models.editors.XtabEditorModel.ENUM_EDITOR_TARGETS={GENERAL:TARGET_GENERAL,COLUMNS:TARGET_COL,ROWS:TARGET_ROW,VALUES:TARGET_VALUES};}());