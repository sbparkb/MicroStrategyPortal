(function(){mstrmojo.requiresCls("mstrmojo.NativeMobileXtab","mstrmojo.array","mstrmojo.hash");function removeStyleSheet(){var xtabStyleSheet=this.xtabStyleSheet,parentNode=xtabStyleSheet&&xtabStyleSheet.parentNode;if(parentNode){parentNode.removeChild(xtabStyleSheet);delete this.xtabStyleSheet;}}mstrmojo.NativeAndroidXtab=mstrmojo.declare(mstrmojo.NativeMobileXtab,null,{scriptClass:"mstrmojo.NativeAndroidXtab",scrollerFriction:0.0015,preBuildRendering:function preBuildRendering(){removeStyleSheet.call(this);this.updateXtabStyles(this.model.data.cssString);this._super();},onwidthChange:function onwidthChange(){if(this.gridData.afw){var sbn=this.scrollboxNode,width=this.width;if(sbn){sbn.style.width=width;}else{this.scrollboxNodeCssText="width: "+width;}}if(this._super){this._super();}},updateXtabStyles:function updateXtabStyles(css){if(!this.xtabStyleSheet){this.xtabStyleSheet=document.getElementsByTagName("head")[0].appendChild(document.createElement("style"));}this.xtabStyleSheet.appendChild(document.createTextNode(css));},unrender:function unrender(ignoreDom){this._super(ignoreDom);removeStyleSheet.call(this);},getMaskNode:function getMaskNode(){var div=document.createElement("div");div.appendChild(this.xtabStyleSheet.cloneNode(true));div.appendChild(this.domNode.cloneNode(true));return div;},updateActionMenu:function updateActionMenu(cell,actions){this._selectionActions=actions;return true;},setModel:function setModel(model){this._super(model);this.controller.getPageByTree(false);},deselectCell:function deselectCell(){this._super();delete this._selectionActions;}});}());