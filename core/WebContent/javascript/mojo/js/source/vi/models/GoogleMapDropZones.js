(function(){mstrmojo.requiresCls("mstrmojo.vi.models.MapDropZones","mstrmojo.vi.viz.EnumDSSDropZones","mstrmojo.models.datasets.DataInterface","mstrmojo.vi.viz.MapHelper","mstrmojo.vi.util.TemplateUtils","mstrmojo.vi.viz.GoogleMapHelper");var $EDZ=mstrmojo.vi.viz.EnumDSSDropZones,$DI=mstrmojo.models.datasets.DataInterface,$TEMPLATE_UTILS=mstrmojo.vi.util.TemplateUtils,$MH=mstrmojo.vi.viz.MapHelper;function getLongLatForms(fs){var latForm=null,longForm=null;(fs||[]).forEach(function(f){if($MH.isLatitude(f.fnm,f.fgr)&&f.obf){latForm=f;}if($MH.isLongitude(f.fnm,f.fgr)&&f.obf){longForm=f;}});return{latForm:latForm,longForm:longForm};}function getAddGeoFormAction(dsid,attr,latForm,longForm){var actions=[],currentGeoItem=this.getHost().getDropZoneItems($EDZ.GeoAttribute)[0],currentLatItem=this.getHost().getDropZoneItems($EDZ.Latitude)[0],currentLongItem=this.getHost().getDropZoneItems($EDZ.Longitude)[0],attrId=attr.did||attr.id,toClear=!(currentGeoItem&&currentGeoItem.id===attrId),addForm=function(form){actions.push({act:"addForm",unitId:attrId,attFormId:form.fid,unitPos:1});},clearZone=function(zoneId,me){var zone=me.getZoneModelByZoneId(zoneId);if(zone&&zone.items.length){var act=me.getRemoveDropZoneUnitAction(zone,zone.items[0]);if(act){actions.push(act);}}};if(toClear){clearZone($EDZ.GeoAttribute,this);actions=actions.concat(this.getAddDropZoneUnitsActions({id:$EDZ.GeoAttribute},[{did:attrId,t:12}],0,{datasetId:dsid}));}if(latForm||(toClear&&currentLatItem&&currentLatItem.t===21)){clearZone($EDZ.Latitude,this);}if(latForm){addForm(latForm);actions=actions.concat(this.getAddDropZoneUnitsActions({id:$EDZ.Latitude},[{did:latForm.fid,t:21}],0,{datasetId:dsid}));}if(longForm||(toClear&&currentLongItem&&currentLongItem.t===21)){clearZone($EDZ.Longitude,this);}if(longForm){addForm(longForm);actions=actions.concat(this.getAddDropZoneUnitsActions({id:$EDZ.Longitude},[{did:longForm.fid,t:21}],0,{datasetId:dsid}));}return actions;}mstrmojo.vi.models.GoogleMapDropZones=mstrmojo.declare(mstrmojo.vi.models.MapDropZones,null,{scriptClass:"mstrmojo.vi.models.GoogleMapDropZones",zonesCfg:mstrmojo.vi.viz.GoogleMapHelper.zonesCfg,getAvatarIconClass:function getAvatarIconClass(){return"viGoogleMap";},getSelectGeoFormMenu:function getSelectGeoFormMenu(itemContext){var srcItem=itemContext.item,zone=itemContext.zone,me=this,attrItem=null,zid=zone.id,fs,geoForms,isLatDZ=(zid===$EDZ.Latitude),isLongDZ=(zid===$EDZ.Longitude);if((isLatDZ||isLongDZ)&&srcItem){if(this.isAttribute(srcItem)){attrItem=srcItem;fs=attrItem.fs;}else{if(srcItem.t===21){attrItem=this.getHost().getDropZoneItems($EDZ.GeoAttribute)[0];fs=$DI.getFormsByAttrId(attrItem.id,this.docModel.datasets);}}fs=fs.filter(function(f){return !!f.obf;});if(attrItem){geoForms=getLongLatForms(fs);if(fs.length>1&&((!geoForms.latForm&&isLatDZ)||(!geoForms.longForm&&isLongDZ))){var menuCfg=new mstrmojo.ui.menus.MenuConfig(),getChangeFn=function(f,selectedFid){return function(){var latForm=isLatDZ?f:null,longForm=isLongDZ?f:null;if(selectedFid!==f.fid){me.submitDropZoneUpdates([me.getUpdateTemplateAction(getAddGeoFormAction.call(me,me.getHostModel().datasetId,attrItem,latForm,longForm))],me.getHost().model.docModel.controller._getXtabCallback(me.getHost()));}};};if(this.isAttribute(srcItem)){fs.forEach(function(f){menuCfg.addMenuItem(f.fnm,"",getChangeFn(f));},this);}else{if(srcItem.t===21){fs.forEach(function(f){menuCfg.addMenuItem(f.fnm,f.fid===srcItem.did?"on":"",getChangeFn(f,srcItem.did));},this);}}return menuCfg;}}}return null;},getDropActions:function getDropActions(zone,dropInfo,dsid){var items=dropInfo.allowedItems,firstItem=items[0],zid=zone.id,actions=[],geoForms=getLongLatForms(firstItem.fs),latForm=geoForms.latForm,longForm=geoForms.longForm,isMultiForms=!!(firstItem&&firstItem.fs&&firstItem.fs.length>1)&&latForm&&longForm;if(isMultiForms&&((zid===$EDZ.Latitude&&latForm)||(zid===$EDZ.Longitude&&longForm))){actions=getAddGeoFormAction.call(this,dsid,firstItem,latForm,longForm);}return actions.length>0?this.getUpdateTemplateAction(actions):this._super(zone,dropInfo,dsid);},getZone:function getZone(n,id,src,disabled,extraParas){var srcItem=src[0],attrItem=null,fs,geoForms,getForm=function(fs,fid){var r=null;fs.forEach(function(f){if(f.fid===fid){r=f;return false;}});return r;};if((id===$EDZ.Latitude||id===$EDZ.Longitude)&&srcItem){if(this.isAttribute(srcItem)){attrItem=srcItem;}else{if(srcItem.t===21){attrItem=this.getHost().getDropZoneItems($EDZ.GeoAttribute)[0];attrItem=$TEMPLATE_UTILS.findUnitsById(this.getHostModel().gsi,attrItem.id)[0];}}if(attrItem){fs=$DI.getFormsByAttrId(attrItem.id||attrItem.did,this.docModel.datasets);geoForms=getLongLatForms(fs);if(fs.length>1&&((!geoForms.latForm&&id===$EDZ.Latitude)||(!geoForms.longForm&&id===$EDZ.Longitude))){if(this.isAttribute(srcItem)){return mstrmojo.vi.models.DropZonesModel.prototype.getZone.call(this,n,id,[{did:srcItem.id,t:12,n:srcItem.n,geoWarning:"geo-warning"}],disabled,extraParas);}else{if(srcItem.t===21){var f=getForm(fs,srcItem.id);return mstrmojo.vi.models.DropZonesModel.prototype.getZone.call(this,n,id,[{did:srcItem.id,t:21,n:attrItem.n+"@"+f.fnm,attn:attrItem.n,fnm:f.fnm}],disabled,extraParas);}}}}}return this._super(n,id,src,disabled,extraParas);}});}());