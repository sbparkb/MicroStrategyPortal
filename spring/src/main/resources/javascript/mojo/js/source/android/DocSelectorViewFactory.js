(function(){mstrmojo.requiresCls("mstrmojo.DocSelectorViewFactory","mstrmojo.android.DropDownList","mstrmojo.android.selectors.CheckList","mstrmojo.android.selectors.ListBox","mstrmojo.android.selectors.LinkBar","mstrmojo.android.selectors.ButtonBar","mstrmojo.android.selectors.Slider","mstrmojo.array");var $STYLES=mstrmojo.DocSelector.STYLES;var widgetMap={};widgetMap[$STYLES.RADIO]="CheckList";widgetMap[$STYLES.CHECKBOX]="CheckList";widgetMap[$STYLES.LIST]="ListBox";widgetMap[$STYLES.LINK]="LinkBar";widgetMap[$STYLES.BUTTON]="ButtonBar";widgetMap[$STYLES.SCROLLER]="Slider";widgetMap["9"]="LinkBar";var isSelectorSupported=function isSelectorSupported(selectorContainer){var defn=selectorContainer.node.defn;if(defn.ct==="3"){var targetKey=selectorContainer.tks;if(targetKey&&selectorContainer.defn.dk){selectorContainer.model.getLayoutUnitDefn(targetKey).dk=true;return false;}}return true;};var attachTargetListeners=function attachTargetListeners(selectorContainer){if(selectorContainer.defn.ct==="3"&&this.isSelectorSupported(selectorContainer)){if(!selectorContainer._panelEvtListener){var panelStack=selectorContainer.model.getUnitInstance(selectorContainer.tks,1);if(panelStack){selectorContainer._panelEvtListener=panelStack.attachEventListener("panelSelected",selectorContainer.id,function(evt){this._inSyncPhase=true;this.content.singleSelectByField(evt.key,"v");this._inSyncPhase=false;});}}}};var newPulldown=function newPulldown(selectorContainer){return new mstrmojo.android.DropDownList({postvalueChange:function(){if(!selectorContainer._inSyncPhase){selectorContainer.selectorControlChange(this);}}});};mstrmojo.android.DocSelectorViewFactory=mstrmojo.declare(mstrmojo.DocSelectorViewFactory,null,{scriptClass:"mstrmojo.android.DocSelectorViewFactory",getDocSelectorClass:function getDocSelectorClass(model,node,config,buildConfig){var cls=this._super(model,node,config,buildConfig);return mstrmojo.DynamicClassFactory.newComponent(cls,{_mixinName:"_androidDocSelector",updateWidget:function updateWidget(selectorContainer){if(!isSelectorSupported(selectorContainer)){return null;}return this._super(selectorContainer);},postBuildRendering:function postBuildRendering(){attachTargetListeners(this);},newPulldown:newPulldown,getWidgetClass:function getWidgetClass(selectorContainer,selectorStyle,isHoriz){var widgetClass=widgetMap[selectorStyle];return(widgetClass&&"android.selectors."+widgetClass)||this._super(selectorContainer,selectorStyle,isHoriz);}},null);}});}());