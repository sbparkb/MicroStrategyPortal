(function(){mstrmojo.requiresCls("mstrmojo.DateTextBox");mstrmojo.DI.DIDateTextBox2=mstrmojo.declare(mstrmojo.DateTextBox,null,{scriptClass:"mstrmojo.DI.DIDateTextBox2",markupString:'<div id="{@id}" class="mstrmojo-DateTextBox {@cssClass}" style="{@cssText}"><input class="input" type="text" title="{@tooltip}"value="{@value}" size="{@size}" maxlength="{@maxLength}" index="{@tabIndex}" mstrAttach:focus,keyup,blur /><div class="icon" mstrAttach:click> </div><div class="mstrmojo-DateTextBox-popup"></div></div>',disabled:false,calendar:{scriptClass:"mstrmojo.Popup",cssClass:"mstrmojo-DateTextBox-calendar",locksHover:true,slot:"popupNode",onOpen:function(){var o=this.opener,z=o&&o.calendarZIndex,c=this.cal,cfg=o&&o.calConfig;if(z){this.domNode.style.zIndex=z;}for(var k in cfg){c.set(k,cfg[k]);}},children:[{scriptClass:"mstrmojo.Calendar",alias:"cal",duration:0,forceNonEmptySelection:true,bindings:{dtp:"this.parent.opener.dtp",value:"this.parent.opener.value",changeValueOnOK:function(){var dtp=this.parent.opener.dtp,cv=this.parent.opener.changeValueOnOK;return dtp===15||dtp===16||cv;}},onValueUpdate:function(evt){var op=this.parent&&this.parent.opener;if(op){var v=op.value,ls=window.mstrConfig&&window.mstrConfig.listSep||";";if(op.isList&&!_S.isEmpty(v)){op.set("value",op.value+ls+this.value);}else{op.set("value",this.value);}op.closePopup();}}}]},onclick:function(evt){if(this.disabled===true){return ;}if(this._super){this._super();}}});})();