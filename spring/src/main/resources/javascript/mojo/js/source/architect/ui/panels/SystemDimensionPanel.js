(function(){mstrmojo.requiresCls("mstrmojo.architect.ui.RelationPanelContent","mstrmojo.architect.ui.RelationPanel");var CSS_PREFIX="mstrmojo-ar-",CSS_PREFIX_TB_BTN="tbbtn",STR_AUTO_ARRANGE=mstrmojo.desc(12238,"Auto arrange");mstrmojo.architect.ui.panels.SystemDimensionPanel=mstrmojo.declare(mstrmojo.architect.ui.RelationPanel,null,{scriptClass:"mstrmojo.architect.ui.panels.SystemDimensionPanel",cssClass:"SystemDimensionPanel",title:mstrmojo.desc(788,"System Hierarchy"),init:function init(props){var $this=this;this._super(props);$this.addNewTitleButton({title:STR_AUTO_ARRANGE,alias:"autoArrange",cssClass:CSS_PREFIX+CSS_PREFIX_TB_BTN+" autoarrange",onclick:function(){var rootController=mstrApp.getRootController();rootController.autoArray();}});},unrender:function unrender(ignoreDom){mstrApp.getRootController().updateRelationPositions(this.content.getAttributePositions());this._super(ignoreDom);}});}());