(function(){mstrmojo.requiresCls("mstrmojo.Box","mstrmojo._HasLayout","mstrmojo.css","mstrmojo.array");mstrmojo.vi.ui.PanelContents=mstrmojo.declare(mstrmojo.Box,[mstrmojo._HasLayout],{scriptClass:"mstrmojo.vi.ui.PanelContents",layoutConfig:{w:{containerNode:"100%"},xt:true},slot:"containerNode",init:function init(props){this._super(props);mstrmojo.css.addWidgetCssClass(this,"mstrmojo-VIPanelContents");},setDimensions:function setDimensions(h,w){this.set("width",w);(this.children||[]).forEach(function(child){var offsets=child.getLayoutOffsets&&child.getLayoutOffsets(),widthOffset=(offsets&&offsets.w)||0,childWidth=parseInt(w,10)-widthOffset+"px";if(child.setDimensions){child.setDimensions("auto",childWidth);}else{child.set("width",childWidth);}});}});}());