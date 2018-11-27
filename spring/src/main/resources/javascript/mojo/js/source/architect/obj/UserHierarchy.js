(function(){mstrmojo.requiresCls("mstrmojo.Obj","mstrmojo.warehouse.EnumObjectTypes");var $M=mstrmojo,$A=$M.array,$H=mstrmojo.hash,$WRAP=$M.func.wrapMethods,$ENUM_OT=mstrmojo.warehouse.EnumObjectTypes,ENUM_OT_RELATIONSHIP=$ENUM_OT.RELATIONSHIP,ENUM_OT_DIMENSION=$ENUM_OT.DIMENSION,DEFAULT_USERHIERARCHY_NAME=mstrmojo.desc(12245,"New user hierarchy"),Enum_SM_CreateObject=1,Enum_SM_DeleteObject=2,Enum_SM_RenameObject=3,Enum_SM_AddUserHierarchyEntryPoint=37,Enum_SM_DeleteUserHierarchyEntryPoint=38,Enum_SM_AddUserHierarchyAttribute=39,Enum_SM_DeleteUserHierarchyAttribute=40,Enum_SM_UpdateHierarchyAttributeLocation=44,Enum_SM_UpdateHierarchyAttributeLock=49,Enum_SM_UpdateHierarchyAttributeFilters=50,Enum_SM_UpdateHierarchySubtype=52,Enum_SM_GetUserHierarchyEntryPoints=1003,DRILL_HIERARCHY=2,BROWSE_HIERARCHY=4;function processAttributes(attributes,manipulationType,callback){var $this=this,info="";$A.forEach(attributes,function(att){info+=att.atid+";";return true;});$this.model.submitRequest($WRAP({success:function success(){}},callback),{manipulationtype:manipulationType,dimensionid:$this.did,info:info},"schemaManipulation");}mstrmojo.architect.obj.UserHierarchy=mstrmojo.declare(mstrmojo.Obj,null,{scriptClass:"mstrmojo.architect.obj.UserHierarchy",model:undefined,did:"",n:"",loaded:false,relations:[],entryPoints:[],attributes:[],attributeProperties:[],tp:ENUM_OT_DIMENSION,useForDrill:true,init:function init(props){var $this=this;this._super(props);if(props.isNew){if($this.n===""){$this.n=mstrApp.rootController.findNextName(DEFAULT_USERHIERARCHY_NAME,$H.valarray(this.model.userHierarchies),"n");}if(mstrApp.getRootController().validateName(ENUM_OT_DIMENSION,$this.n,"")){$this.model.submitRequest($WRAP({success:function(res){var objectInfo=res.mi["in"].oi;if(objectInfo instanceof Array&&objectInfo.length){objectInfo=objectInfo[0];}$this.did=objectInfo.did;$this.n=objectInfo.n;$this.attributes=[];res.userHierarchy=objectInfo;}},$this.callback),{manipulationtype:Enum_SM_CreateObject,objecttype:ENUM_OT_DIMENSION,objectname:$this.n},"schemaManipulation");}}},attributePositions:undefined,rename:function rename(newName,callback){var $this=this;if(mstrApp.getRootController().validateName(ENUM_OT_DIMENSION,newName,this.n)){$this.model.submitRequest($WRAP({success:function(){$this.n=newName;}},callback),{manipulationtype:Enum_SM_RenameObject,objecttype:ENUM_OT_DIMENSION,objectid:this.did,objectname:newName},"schemaManipulation");}else{callback.failure();}},remove:function remove(callback){var $this=this;$this.model.submitRequest($WRAP({success:function(res){res.did=$this.did;}},callback),{manipulationtype:Enum_SM_DeleteObject,objecttype:ENUM_OT_DIMENSION,objectid:$this.did},"schemaManipulation");},load:function load(callback){var $this=this,model=this.model;$this.loaded=false;$this.relations=[];$this.entryPoints=[];$this.attributePositions={};$this.attributeProperties=[];$this.attributes=[];var cbEP={success:function success(res){$this.entryPoints=res.entryPoints;res.relations=$this.relations;res.attributePositions=$this.attributePositions;res.attributeProperties=$this.attributeProperties;$this.loaded=true;}};var cbAtt={success:function success(res){var relationship,attributeID;$A.forEach(res.attributes,function(att){$this.attributes[att.atid]=att;});$H.forEach(res.relations,function(relation){relationship=new mstrmojo.architect.obj.Relationship({isNew:false,isSysDimension:false,parentAttributeId:relation.parentAttributeId,parentAttributeName:relation.parentAttributeName,childAttributeId:relation.childAttributeId,childAttributeName:relation.childAttributeName,relationType:0,dimensionid:$this.did,model:model});$H.copy({isVisible:function isVisible(data,item){return model.handleVisibleAction(data,item);},isChecked:function isChecked(data,item){return model.handleCheckAction(data,item);},isEnabled:function isEnabled(data,item){return model.handleEnabledAction(data,item);},tp:$ENUM_OT.RELATIONSHIP},relationship);$this.relations.push(relationship);});$A.forEach(res.attributeProperties,function(attribute){attributeID=attribute.did;$this.attributeProperties[attributeID]={lockLimit:attribute.ll,lockType:attribute.lt,filters:attribute.filters};if(attribute.l!=="-1px"){$this.attributePositions[attributeID]={x:attribute.l,y:attribute.t};}});$this.model.submitRequest($WRAP(cbEP,callback),{manipulationtype:Enum_SM_GetUserHierarchyEntryPoints,dimensionid:$this.did},"schemaManipulation");}};model.submitRequest(cbAtt,{dimensionid:$this.did},"getHierarchyInfo");},setAttributeLockProperty:function setAttributeLockProperty(attributeID,lockStatus,lockLimit,callback){var $this=this,properties=$this.attributeProperties[attributeID],cb={success:function(){properties.lockLimit=lockLimit;properties.lockType=lockStatus;if(callback&&callback.success){callback.success();}}};$this.model.submitRequest(cb,{manipulationtype:Enum_SM_UpdateHierarchyAttributeLock,dimensionid:$this.did,objectid:attributeID,ll:lockLimit,lt:lockStatus},"schemaManipulation");},addAttribute:function addAttribute(attributeID,attributeName,callback){var hierarchy=this,attsToAdd=[],att={atid:attributeID,n:attributeName},cbAtt={success:function success(){hierarchy.attributes[attributeID]=att;hierarchy.attributeProperties[attributeID]={lockLimit:0,lockType:1,filters:[]};hierarchy.entryPoints.push({atid:attributeID});if(callback&&callback.success){callback.success();}}},attribute=hierarchy.attributes[attributeID];if(!attribute){attsToAdd.push(att);processAttributes.call(hierarchy,attsToAdd,Enum_SM_AddUserHierarchyAttribute,cbAtt);}else{if(callback&&callback.success){callback.success();}}},removeAttributes:function removeAttributes(attributes,callback){var $this=this,cb={success:function success(){$this.loaded=false;if(callback&&callback.success){$A.forEach(attributes,function(att){delete $this.attributePositions[att.atid];delete $this.attributes[att.atid];delete $this.attributeProperties[att.atid];return true;});callback.success();}}};processAttributes.call(this,attributes,Enum_SM_DeleteUserHierarchyAttribute,cb);},addEntryPoints:function addEntryPoints(attributes,callback){var userHierarchy=this;processAttributes.call(this,attributes,Enum_SM_AddUserHierarchyEntryPoint,$WRAP({success:function success(){userHierarchy.entryPoints.push(attributes[0]);}},callback));},getAttributeFilters:function getAttributeFilters(attributeID){return this.attributeProperties[attributeID].filters;},setAttributeFilters:function setAttributeFilters(attributeID,filters,callback){var $this=this,info="",cb={success:function(){var filterArray=[];$A.forEach(filters,function(filter){filterArray.push({did:filter.did});return true;});$this.attributeProperties[attributeID].filters=filterArray;if(callback&&callback.success){callback.success();}}};$A.forEach(filters,function(filter){info+=filter.did+";";return true;});$this.model.submitRequest(cb,{manipulationtype:Enum_SM_UpdateHierarchyAttributeFilters,dimensionid:$this.did,objectid:attributeID,info:info},"schemaManipulation");},removeEntryPoints:function removeEntryPoints(attributes,callback){var entryPoints=this.entryPoints,indx;processAttributes.call(this,attributes,Enum_SM_DeleteUserHierarchyEntryPoint,$WRAP({success:function success(){indx=$A.find(entryPoints,"atid",attributes[0].atid);if(indx>-1){$A.removeIndices(entryPoints,indx,1);}}},callback));},addRelation:function addRelation(parentAttributeId,childAttributeId,callback){var model=this.model,hierarchy=this,relationship,cbAddRelationship=$WRAP({success:function(){hierarchy.relations.push(relationship);}},callback);relationship=new mstrmojo.architect.obj.Relationship({isNew:true,parentAttributeId:parentAttributeId,childAttributeId:childAttributeId,relationType:0,relationTableId:"",dimensionid:hierarchy.did,model:hierarchy.model,callback:cbAddRelationship,isVisible:function isVisible(data,item){return model.handleVisibleAction(data,item);},isChecked:function isChecked(data,item){return model.handleCheckAction(data,item);},isEnabled:function isEnabled(data,item){return model.handleEnabledAction(data,item);},tp:ENUM_OT_RELATIONSHIP});},removeRelation:function removeRelation(parentAttributeId,childAttributeId,callback){var $this=this,relationship=null,cbRemoveRelationship=$WRAP({success:function(){var lIndex=0,relations=$this.relations;$A.forEach(relations,function(relation){if(relation.parentAttributeId===relationship.parentAttributeId&&relation.childAttributeId===relationship.childAttributeId){relations.splice(lIndex,1);return false;}lIndex++;return true;});}},callback);$A.forEach(this.relations,function(relation){if(relation.parentAttributeId===parentAttributeId&&relation.childAttributeId===childAttributeId){relationship=relation;return false;}return true;});if(relationship){relationship.remove(cbRemoveRelationship);}},getRelation:function getRelation(parentAttributeId,childAttributeId){var relation=null;$A.forEach(this.relations,function(relationship){if(relationship.parentAttributeId===parentAttributeId&&relationship.childAttributeId===childAttributeId){relation=relationship;return false;}return true;});return relation;},getRelations:function getRelations(callback){var hierarchy=this;hierarchy.load({success:function success(){callback.success(hierarchy.relations);}});},updateAttributePositions:function updateAttributePositions(positions,callback){var $this=this,keys=Object.keys(positions),pos={},att,index=0;$H.forEach(positions,function(position){if(position){att=$this.attributes[keys[index]];if(att){pos[att.atid]=position;}}index++;return true;});if(Object.keys(pos).length===0){return ;}this.model.submitRequest($WRAP({success:function success(){$this.attributePositions=pos;}},callback),{manipulationtype:Enum_SM_UpdateHierarchyAttributeLocation,objectid:$this.did,info:JSON.stringify(pos)},"schemaManipulation");},updateHiearchySubtype:function updateHiearchySubtype(userDrillHierarchy,callback){var $this=this;this.model.submitRequest($WRAP({success:function success(){$this.useForDrill=userDrillHierarchy;}},callback),{manipulationtype:Enum_SM_UpdateHierarchySubtype,objectid:$this.did,subtype:(userDrillHierarchy===true)?DRILL_HIERARCHY:BROWSE_HIERARCHY},"schemaManipulation");}});}());