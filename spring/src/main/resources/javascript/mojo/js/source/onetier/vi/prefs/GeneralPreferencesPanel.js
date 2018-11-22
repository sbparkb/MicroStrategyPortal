(function(){mstrmojo.requiresCls("mstrmojo.onetier.vi.prefs.PreferencesEditorPanel","mstrmojo.Label","mstrmojo.Button");mstrmojo.requiresDescs(8892,13111,13691,13692,13693,13694,13695,14010,14548);var FIRST_COL_WIDTH=150,$PX="px";var LOCALE_OPTIONS=[{n:mstrmojo.desc(959,"Default"),v:-1},{n:mstrmojo.desc(2816,"Chinese (Simplified)"),v:2052},{n:mstrmojo.desc(2903,"Chinese (Traditional)"),v:1028},{n:mstrmojo.desc(4998,"Danish"),v:1030},{n:mstrmojo.desc(4737,"Dutch (Netherlands)"),v:1043},{n:mstrmojo.desc(949,"German"),v:1031},{n:mstrmojo.desc(950,"English (US)"),v:1033},{n:mstrmojo.desc(2295,"English (UK)"),v:2057},{n:mstrmojo.desc(952,"French"),v:1036},{n:mstrmojo.desc(4738,"French (Switzerland)"),v:4108},{n:mstrmojo.desc(6114,"French (Belgium)"),v:2060},{n:mstrmojo.desc(4739,"German (Switzerland)"),v:2055},{n:mstrmojo.desc(953,"Italian"),v:1040},{n:mstrmojo.desc(4740,"Italian (Switzerland)"),v:2064},{n:mstrmojo.desc(954,"Japanese"),v:1041},{n:mstrmojo.desc(955,"Korean"),v:1042},{n:mstrmojo.desc(1035,"Portugese (Brasil)"),v:1046},{n:mstrmojo.desc(1375,"Spanish"),v:3082},{n:mstrmojo.desc(956,"Swedish"),v:1053}];mstrmojo.onetier.vi.prefs.GeneralPreferencesPanel=mstrmojo.declare(mstrmojo.onetier.vi.prefs.PreferencesEditorPanel,null,{scriptClass:"mstrmojo.onetier.vi.prefs.GeneralPreferencesPanel",cssClass:"ot-general-prefs",layoutConfig:{w:{containerNode:"100%"},xt:true},init:function init(props){this._super(props);var viewFactory=this.viewFactory,model=this.model,prefGroup=this.prefGroup,savedGeneralPreferences=model.getPreferences(prefGroup),findLocale=function findLocale(value){return Math.max(LOCALE_OPTIONS.map(function(item){return item.v;}).indexOf(value),0);},savePreferenceDelta=function savePreferenceDelta(propName,propValue){savedGeneralPreferences[propName]=propValue;model.addPreferenceToDelta(prefGroup,savedGeneralPreferences);};this.addChildren([this.getLabelAndPulldownWithMsg(mstrmojo.desc(13111,"Language"),LOCALE_OPTIONS,mstrApp.isPrefLangChanged,function(newValue){savePreferenceDelta("lang",newValue);this.parent.getMessage().set("text",mstrmojo.desc(14548,"Changes will be applied after Desktop is restarted."));mstrApp.isPrefLangChanged=true;},findLocale(savedGeneralPreferences.lang)),this.getLabelAndPulldownWithMsg(mstrmojo.desc(13691,"Number and Date Format"),LOCALE_OPTIONS,mstrApp.isPrefNdfChanged,function(newValue){savePreferenceDelta("ndf",newValue);this.parent.getMessage().set("text",mstrmojo.desc(14548,"Changes will be applied after Desktop is restarted."));mstrApp.isPrefNdfChanged=true;},findLocale(savedGeneralPreferences.ndf)),viewFactory.getLabelAndControl(mstrmojo.desc(13692,"Updates"),mstrmojo.Button.newWebButton(mstrmojo.desc(13693,"Check for Updates Now"),function(){model.checkForDesktopUpdates();}),FIRST_COL_WIDTH+$PX,"100%",false),viewFactory.getLabelAndControl(" ",{scriptClass:"mstrmojo.Label",text:mstrmojo.desc(13694,"Last Check ##.").replace("##",savedGeneralPreferences.lastUpdate)},FIRST_COL_WIDTH+$PX,"100%",false,{cssClass:"ot-prefs-tip"}),viewFactory.getLabelAndControl(" ",viewFactory.getCheckboxAndLabel(!!savedGeneralPreferences.autoUpd,mstrmojo.desc(13695,"Check for updates automatically"),function(newValue){savePreferenceDelta("autoUpd",newValue);}),FIRST_COL_WIDTH+$PX,"100%",false),{scriptClass:"mstrmojo.Widget",markupString:'<div class="ot-prefs-divider"></div>'},viewFactory.getLabelAndControl(mstrmojo.desc(8892,"Network"),mstrmojo.Button.newWebButton(mstrmojo.desc(14010,"Change Proxy Settings..."),function(){model.showProxyEditor();}),FIRST_COL_WIDTH+$PX,"100%",false)]);}});}());