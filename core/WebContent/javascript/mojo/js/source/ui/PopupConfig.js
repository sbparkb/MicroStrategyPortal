(function(){mstrmojo.requiresCls("mstrmojo.Obj");var CONFIG_ENUM_CORNERS={TOP_LEFT:1,TOP_RIGHT:2,BOTTOM_RIGHT:3,BOTTOM_LEFT:4};mstrmojo.ui.PopupConfig=mstrmojo.declare(mstrmojo.Obj,null,{scriptClass:"mstrmojo.ui.PopupConfig",ENUM_CORNERS:CONFIG_ENUM_CORNERS,isHostedWithin:true,position:null,hostProxyCssClass:"",hostId:"",hostElement:null,anchorElement:null,popupHandlers:null,alignment:null,alignWithAnchor:false,useTooltip:false,init:function init(props){this.clear();this._super(props);},setAlignment:function setAlignment(hostCorner,popupCorner){this.alignment={host:hostCorner,popup:popupCorner};},addPopupHandlers:function addPopupHandlers(scopeId,fnOpen,fnClose){this.popupHandlers[scopeId]={open:fnOpen,close:fnClose};},clear:function clear(){this.popupHandlers={};var corners=this.ENUM_CORNERS;this.alignment={host:corners.BOTTOM_LEFT,popup:corners.TOP_LEFT};}});mstrmojo.ui.PopupConfig.ENUM_CORNERS=CONFIG_ENUM_CORNERS;}());