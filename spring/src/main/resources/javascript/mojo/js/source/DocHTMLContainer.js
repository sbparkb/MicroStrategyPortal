(function(){mstrmojo.requiresCls("mstrmojo.Widget","mstrmojo._Formattable");mstrmojo.DocHTMLContainer=mstrmojo.declare(mstrmojo.Widget,[mstrmojo._Formattable],{scriptClass:"mstrmojo.DocHTMLContainer",scrolling:"auto",markupString:'<iframe id="{@id}" k="{@k}" class="mstrmojo-DocHTMLContainer" title="{@tooltip}" style="{@domNodeCssText}" src="{@v}" scrolling="{@scrolling}"></iframe>',formatHandlers:{domNode:["RW","B","F","background-color","text-align","white-space","fx"]},markupMethods:{onvisibleChange:mstrmojo.Widget.visibleMarkupMethod},update:function update(node){this.v=node.data.v;if(mstrApp&&mstrApp.isTouchApp()){this.scrolling="no";}if(this.thresholdId||node.data.tid){delete this.fmts;}this.thresholdId=node.data.tid;this.set("visible",!node.data.hidden);}});}());