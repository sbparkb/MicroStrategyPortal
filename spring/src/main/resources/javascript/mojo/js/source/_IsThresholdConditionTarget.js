(function(){var THRESHOLD_ACTION_DISABLE=1,THRESHOLD_ACTION_HIDE=2,THRESHOLD_ACTION_REQUIRE=4;mstrmojo._IsThresholdConditionTarget=mstrmojo.provide("mstrmojo._IsThresholdConditionTarget",{_mixinName:"mstrmojo._IsThresholdConditionTarget",update:function update(node){var tta=node.data.tta;var disableThresholdAction=(tta&THRESHOLD_ACTION_DISABLE)>0,hideThresholdAction=(tta&THRESHOLD_ACTION_HIDE)>0;if(disableThresholdAction&&this.preservedEnabled===undefined){this.preservedEnabled=!!this.enabled;}if(hideThresholdAction&&this.preservedVisible===undefined){this.preservedVisible=!!this.visible;}this.set("enabled",disableThresholdAction?false:this.preservedEnabled!==undefined?this.preservedEnabled:this.enabled);this.set("visible",hideThresholdAction?false:this.preservedVisible!==undefined?this.preservedVisible:this.visible);this.set("required",(tta&THRESHOLD_ACTION_REQUIRE)>0);if(this._super){this._super(node);}}});}());