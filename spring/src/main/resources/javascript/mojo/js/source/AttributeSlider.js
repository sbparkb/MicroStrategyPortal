(function(){mstrmojo.requiresCls("mstrmojo.Slider","mstrmojo.css","mstrmojo.hash");var $D=mstrmojo.dom,$CSS=mstrmojo.css,$HASH=mstrmojo.hash,PADDING_SIZE=9,$PX="px";mstrmojo.AttributeSlider=mstrmojo.declare(mstrmojo.Slider,null,{scriptClass:"mstrmojo.AttributeSlider",thumbWidth:7,synchronizeSlider:function synchronizeSlider(){if(this.isHoriz){var orientationCfg=this.orCfg,dimension=orientationCfg.lenCssP,dimensionValue=this[dimension],dimensionLength=parseInt(dimensionValue,10),hasRendered=this.hasRendered;var effectiveLength=this._effLen=isNaN(dimensionLength)?0:(dimensionLength-this._exRoom-(2*PADDING_SIZE));if(dimensionValue){var backgroundCss={};backgroundCss[dimension]=Math.max(parseInt(dimensionValue,10)-(2*this.cssBkBW),0)-(2*PADDING_SIZE)+$PX;var sdcCss={};sdcCss[dimension]=effectiveLength+$PX;sdcCss[orientationCfg.posCssP]=Math.round(this._exRoom/2)+PADDING_SIZE+$PX;sdcCss[orientationCfg.opPosCssP]="0"+$PX;if(hasRendered){$HASH.copy(backgroundCss,this.bgNode.style);$HASH.copy(sdcCss,this.sdcNode.style);}else{this.bkCssText=$CSS.getCssTextFromObj(backgroundCss);this.sdcCssText=$CSS.getCssTextFromObj(sdcCss);}}var idx=this.selectedIndices;if(!$HASH.isEmpty(idx)){this.min=this.items.length-1;this.max=0;var i;for(i in idx){if(idx[i]){this.min=Math.min(this.min,i);this.max=Math.max(this.max,i);}}}var helper=this.typeHelper;this.unit=helper.getUnit();if(hasRendered){helper.updateThumb();}else{helper.preUpdateThumb();}}else{this._super();}},postBuildRendering:function postBuildRendering(){this._super();$CSS.addClass(this.containerNode,["attslider"]);$CSS.addClass(this.frontNode,["attslider"]);$CSS.addClass(this.thumbNode,["attslider"]);$CSS.addClass(this.endNode,["attslider"]);$CSS.addClass(this.bgNode,["attslider"]);}});}());