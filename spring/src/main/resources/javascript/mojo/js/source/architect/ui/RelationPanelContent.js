(function(){mstrmojo.requiresCls("mstrmojo.Container","mstrmojo.architect.ui.RelationLinker","mstrmojo.architect.ui.AttributesContainer","mstrmojo.architect.EnumDataChangeEvents","mstrmojo.architect.EnumDragActions","mstrmojo.warehouse._CanToggleAvatarClass","mstrmojo._HasLayout","mstrmojo.array","mstrmojo.hash");var $A=mstrmojo.array,$H=mstrmojo.hash,$ENUM_DRAG_ACTIONS=mstrmojo.architect.EnumDragActions;mstrmojo.architect.ui.RelationPanelContent=mstrmojo.declare(mstrmojo.Box,[mstrmojo.warehouse._CanToggleAvatarClass,mstrmojo._HasLayout],{scriptClass:"mstrmojo.architect.ui.RelationPanelContent",markupString:'<div id="{@id}" class="mstrmojo-ar-rp-content {@cssClass}" mstrAttach:click><div class="mstrmojo-ar-rpc-rel"></div></div>',markupSlots:{relationsNode:function relationsNode(){return this.domNode.firstChild;}},elemBox:undefined,init:function init(props){this._super(props);this.attributes={};},onclick:function onclick(evt){this.linker.handleClick(evt.e);},dropZone:true,allowDrop:function allowDrop(context){var dragAction=context.action;return(context.createRelations&&(dragAction===$ENUM_DRAG_ACTIONS.TABLE_VIEW_ATTR||dragAction===$ENUM_DRAG_ACTIONS.LINKER_ATTR));},ondrop:function ondrop(context){this.elemBox.handleDragDrop(context);},getAttributePositions:function getAttributePositions(){return this.elemBox.getAttributePositions();},storeAttributePositions:function storeAttributePositions(){var rootController=mstrApp.getRootController(),attributePositions=this.getAttributePositions(),dimensionid,rels=this.linker.relations||[],relation=rels?rels[0]:undefined;if(attributePositions){if(relation){dimensionid=relation.dimensionid;}rootController.updateRelationPositions(attributePositions,dimensionid);}},onRelationshipChange:function onRelationshipChange(evt){if(!this.hasRendered){return ;}var $this=this,relations=evt.relations,rootController=mstrApp.getRootController(),attributes={},isChecked,isVisible,isEnabled,storePositions=evt.storePositions,addRelationships=function addRelationships(attrInfo,relatedId,isParent){var attributeId=attrInfo.id,attributeObject=attributes[attributeId]=attributes[attributeId]||{n:attrInfo.n,attributeId:attributeId,tableId:attrInfo.tableId,parent:[],children:[]};if(relatedId!==""){attributeObject[isParent?"parent":"children"].push(relatedId);}},attributesContainer=this.elemBox,rootIds=[];if(relations&&relations[0]){isChecked=relations[0].isChecked;isVisible=relations[0].isVisible;isEnabled=relations[0].isEnabled;}if(evt.clear){attributesContainer.cleanUp();this.storeAttributePositions();}this.positions=evt.positions;$A.forEach(relations,function populateAttributes(relationObj){var parentId=relationObj.parentAttributeId,childId=relationObj.childAttributeId;addRelationships({id:parentId,n:relationObj.parentAttributeName||rootController.getHierarchyAttributeName(relationObj.dimensionid,parentId),tableId:relationObj.relationTableId},childId,false);if(childId!==""){addRelationships({id:childId,n:relationObj.childAttributeName||rootController.getHierarchyAttributeName(relationObj.dimensionid,childId),tableId:relationObj.relationTableId},parentId,true);}});$H.forEach($H.copy(attributes),function populateAttributes(attributeObject,attributeId){if(attributeObject.parent.length===0){rootIds.push(attributeId);}});attributesContainer.refreshLabels($H.copy({attributes:attributes,rootIds:rootIds,isChecked:isChecked,isVisible:isVisible,isEnabled:isEnabled,entryPoints:evt.entryPoints,attributeProperties:evt.attributeProperties},evt));this.linker.drawLinks(evt);if(storePositions){$this.storeAttributePositions();}},children:[{scriptClass:"mstrmojo.architect.ui.RelationLinker",alias:"linker",slot:"relationsNode"},{scriptClass:"mstrmojo.architect.ui.AttributesContainer",alias:"elemBox",slot:"relationsNode"}]});}());