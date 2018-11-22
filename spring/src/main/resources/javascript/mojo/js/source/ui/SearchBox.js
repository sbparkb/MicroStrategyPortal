(function(){mstrmojo.requiresCls("mstrmojo.Widget","mstrmojo._HasLayout","mstrmojo.css","mstrmojo.string");var $CSS=mstrmojo.css,CLEAR_ICON_CSS_CLASS="clear";function triggerSearch(){this.searchTriggered(this.inputNode.value);}mstrmojo.ui.SearchBox=mstrmojo.declare(mstrmojo.Widget,[mstrmojo._HasLayout],{scriptClass:"mstrmojo.ui.SearchBox",markupString:'<div id={@id} class="mstrmojo-ui-SearchBox cf {@cssClass}" style="{@cssText}"><input class="mstrmojo-ui-sb-input" type="text" mstrAttach:keyup,blur/><div class="mstrmojo-ui-sb-btn" mstrAttach:click ></div></div>',markupSlots:{inputNode:function inputNode(){return this.domNode.firstChild;},searchNode:function searchNode(){return this.domNode.lastChild;}},markupMethods:{onvisibleChange:mstrmojo.Widget.visibleMarkupMethod},layoutConfig:{h:{inputNode:"20px",searchNode:"20px"},w:{inputNode:"100%",searchNode:"22px"},xt:true},getLayoutOffsets:function(){return{w:2,h:0};},searchNode:undefined,inputNode:undefined,searchDelay:-1,init:function init(props){this._super(props);var searchDelay=this.searchDelay;if(searchDelay===-1||isNaN(searchDelay)){this.searchDelay=parseInt(mstrApp.getSearchAutoCompleteDelay(),10);}},onclick:function onclick(evt){var targetNode=evt.getTarget();if(targetNode===this.searchNode){if(this._hasText){this.clearSearch();}else{triggerSearch.call(this);}}},onkeyup:function onkeyup(evt){var hWin=evt.hWin,e=evt.e||hWin.event;if(e.keyCode===27){this.clearSearch();return ;}var $this=this,oldText=this.text,inputText=this.text=this.inputNode.value,hasText=this._hasText=inputText.length>0;if(oldText!==inputText){$CSS.toggleClass(this.searchNode,[CLEAR_ICON_CSS_CLASS],hasText);window.clearTimeout(this._searchTimeoutId);this._searchTimeoutId=window.setTimeout(function(){triggerSearch.call($this);},this.searchDelay);}},unrender:function unrender(){this.text="";this._super();},clearSearch:function clearSearch(avoidTrigger){this.text=this.inputNode.value="";$CSS.removeClass(this.searchNode,[CLEAR_ICON_CSS_CLASS]);delete this._hasText;if(!avoidTrigger){triggerSearch.call(this);}this.postClearSearch();},isClear:function isSearchClear(){return !this.text||this.text.length===0;},postClearSearch:mstrmojo.emptyFn,searchTriggered:function searchTriggered(pattern){}});}());