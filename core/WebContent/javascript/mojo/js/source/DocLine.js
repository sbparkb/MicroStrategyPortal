(function(){mstrmojo.requiresCls("mstrmojo.Widget","mstrmojo._Formattable");mstrmojo.DocLine=mstrmojo.declare(mstrmojo.Widget,[mstrmojo._Formattable],{scriptClass:"mstrmojo.DocLine",markupString:'<div id="{@id}" k="{@k}" class="mstrmojo-DocLine" title="{@tooltip}" style="{@domNodeCssText}"></div>',formatHandlers:{domNode:["RW","border-top","border-left","fx"]},markupMethods:{onvisibleChange:mstrmojo.Widget.visibleMarkupMethod},update:function update(node){if(this.thresholdId||node.data.tid){delete this.fmts;}this.thresholdId=node.data.tid;this.set("visible",!node.data.hidden);if(this._super){this._super(node);}},getFormats:function getFormats(){var fmts=this._super();if(fmts&&parseInt(fmts.height,10)===0){fmts.height="1px";}return fmts;}});}());