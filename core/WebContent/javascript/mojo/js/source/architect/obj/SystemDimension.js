(function(){mstrmojo.requiresCls("mstrmojo.Obj","mstrmojo.warehouse.EnumObjectTypes");var $A=mstrmojo.array,$H=mstrmojo.hash,$M=mstrmojo,$WRAP=$M.func.wrapMethods,$ENUM_OT=mstrmojo.warehouse.EnumObjectTypes,Enum_SM_UpdateHierarchyAttributeLocation=44,ENum_SM_EditJointChildRelationship=21,Enum_SM_RemoveJointAttributeRelation=1022,STR_NO_REL_TABLE=mstrmojo.desc(11435,"there are no tables that can relate these 2 attributes");mstrmojo.architect.obj.SystemDimension=mstrmojo.declare(mstrmojo.Obj,null,{scriptClass:"mstrmojo.architect.obj.SystemDimension",relationsLoaded:false,init:function init(props){this.model=props.mdl;},reset:function reset(){this.relations=[];this.relationsLoaded=false;},attributePositions:undefined,jointChildren:[],load:function load(callback){var $this=this;if(this.relationsLoaded){callback.success(this.relations);return ;}var model=this.model,relationship,tableId,attributeID;$this.relations=[];$this.attributePositions={};model.submitRequest({success:function success(res){$H.forEach(res.relations,function(relation){tableId=relation.relationTableId||"";relationship=new mstrmojo.architect.obj.Relationship({isNew:false,isSysDimension:true,parentAttributeId:relation.parentAttributeId,parentAttributeName:relation.parentAttributeName,childAttributeId:relation.childAttributeId,childAttributeName:relation.childAttributeName,relationType:relation.relationType,relationTableId:tableId,relationTableName:tableId===""?"":model.getTable(tableId).name,isJointChildren:(relation.joinChildren>2),jointIndex:relation.childrenIndex,model:model});$H.copy({isVisible:function isVisible(data,item){return model.handleVisibleAction(data,item);},isChecked:function isChecked(data,item){return model.handleCheckAction(data,item);},isEnabled:function isEnabled(data,item){return model.handleEnabledAction(data,item);},tp:$ENUM_OT.RELATIONSHIP},relationship);$this.relations.push(relationship);});$this.relationsLoaded=true;$A.forEach(res.attributeProperties,function(attribute){attributeID=attribute.did;$this.attributePositions[attributeID]={x:attribute.l,y:attribute.t};});callback.success($this);}},{},"getHierarchyInfo");},relations:[],getRelatedRelations:function removeRelation(parentAttributeId){var layer=this,relatedRelations=[],relations=layer.relations;$A.forEach(relations,function(relation){if(relation.isJointChildren&&relation.parentAttributeId===parentAttributeId){relatedRelations.push(relation);}return true;});return relatedRelations;},getRelation:function getRelation(parentAttributeId,childAttributeId){var relation=null;$A.forEach(this.relations,function(relationship){if(relationship.parentAttributeId===parentAttributeId&&relationship.childAttributeId===childAttributeId){relation=relationship;return false;}return true;});return relation;},addRelation:function addRelation(parentAttributeId,childAttributeId,callback){var $this=this,model=this.model,relationship,cbAddRelationship=$WRAP({success:function(){$this.relations.push(relationship);}},callback);mstrApp.getRootController().searchTables.call(this,parentAttributeId,childAttributeId,{success:function success(res){if(res.ts.length>0){var did=res.ts[0].did;relationship=new mstrmojo.architect.obj.Relationship({isNew:true,isSysDimension:true,parentAttributeId:parentAttributeId,childAttributeId:childAttributeId,relationType:1,relationTableId:did,model:model,callback:cbAddRelationship,relationTables:res.ts,isJointChildren:false});}else{mstrmojo.alert(STR_NO_REL_TABLE);}}});},addJointRelation:function addJointRelation(relation,secondChildAttributeID,callback){var $this=this,relationship=this.getRelation(relation.parentAttributeId,relation.childAttributeId),cbAddRelationship=$WRAP({success:function(){$this.relations.push(relationship);}},callback);if(relationship){relationship.addJointChildren(relation.parentAttributeId,relation.childAttributeId,secondChildAttributeID,relation.relationshipType,relation.relationTableId,cbAddRelationship);}},removeRelation:function removeRelation(parentAttributeId,childAttributeId,callback){var $this=this,jointChildId,relations=$this.relations,relationship=this.getRelation(parentAttributeId,childAttributeId),cbRemoveRelationship=$WRAP({success:function(){var lIndex=0,relations=$this.relations;$A.forEach(relations,function(relation){if(relation.parentAttributeId===relationship.parentAttributeId&&relation.childAttributeId===relationship.childAttributeId){relations.splice(lIndex,1);return false;}lIndex++;return true;});}},callback),cbRemoveJoinRelationship=$WRAP({success:function(){var lIndex=0;$A.forEach(relations,function(relation){if(relation.parentAttributeId===relationship.parentAttributeId&&relation.childAttributeId===relationship.childAttributeId){relations.splice(lIndex,1);return false;}lIndex++;return true;});lIndex=0;$A.forEach(relations,function(relation){if(relation.parentAttributeId===relationship.parentAttributeId&&relation.childAttributeId===jointChildId){relations.splice(lIndex,1);return false;}lIndex++;return true;});}},callback);if(relationship){if(relationship.isJointChildren){$A.forEach(relations,function(relation){if(relation.isJointChildren&&relation.parentAttributeId===relationship.parentAttributeId&&relation.childAttributeId!==relationship.childAttributeId){jointChildId=relation.childAttributeId;return false;}return true;});this.model.submitRequest(cbRemoveJoinRelationship,{manipulationtype:Enum_SM_RemoveJointAttributeRelation,objectid:relationship.parentAttributeId,objectid2:relationship.childAttributeId,objectid3:jointChildId,dimensionid:this.dimensionid},"schemaManipulation");}else{relationship.remove(cbRemoveRelationship);}}},updateRelation:function updateRelation(parentAttributeId,childAttributeId,relationTableId,relationshipType,callback){var relationship=this.getRelation(parentAttributeId,childAttributeId),sysDim=this,jointChildren=[],relatedRelations;if(relationship){if(relationship.isJointChildren){relatedRelations=sysDim.getRelatedRelations(parentAttributeId);$A.forEach(relatedRelations,function(relation){jointChildren.push(relation.childAttributeId);return true;});sysDim.model.submitRequest($WRAP({success:function success(){$A.forEach(relatedRelations,function(relation){relation.relationType=relationshipType;relation.relationTableId=relationTableId;return true;});}},callback),{manipulationtype:ENum_SM_EditJointChildRelationship,objectid:parentAttributeId,ert:relationshipType,gdid:relationTableId,attributeids:jointChildren.join(";")},"schemaManipulation");}else{relationship.updateRelation(parentAttributeId,childAttributeId,relationshipType,relationTableId,callback);}}},getTablesForRelationship:function getTablesForRelationship(attId1,attId2){var relation=this.getRelation(attId1,attId2);return relation.relationTables;},loadTablesForRelationship:function loadTablesForRelationship(relationship,callback){var $this=this,attId1=relationship.parentAttributeId,attId2=relationship.childAttributeId;mstrApp.getRootController().searchTables.call(this,attId1,attId2,$WRAP({success:function success(res){$this.getRelation(attId1,attId2).relationTables=res.ts;}},callback));},getRelations:function getRelations(callback){var sysDym=this;this.load({success:function success(){callback.success(sysDym.relations);}});},updateAttributePositions:function updateAttributePositions(positions,callback){var $this=this;this.model.submitRequest($WRAP({success:function success(){$this.attributePositions=positions;}},callback),{manipulationtype:Enum_SM_UpdateHierarchyAttributeLocation,objectid:"",info:JSON.stringify(positions)},"schemaManipulation");}});}());