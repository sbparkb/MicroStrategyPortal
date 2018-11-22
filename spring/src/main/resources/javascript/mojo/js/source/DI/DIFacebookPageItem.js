(function(){mstrmojo.requiresCls("mstrmojo.Container");mstrmojo.requiresDescs(14503);mstrmojo.DI.DIFacebookPageItem=mstrmojo.declare(mstrmojo.Container,null,{scriptClass:"mstrmojo.DI.DIFacebookPageItem",cssClass:"mstrmojo-di-fbpage-item",pg_id:null,picUrl:null,n:"",desc:"",likes:"",link:"",enabled:true,advancedProperties:null,markupString:'<div class={@cssClass} mstrAttach:click,mouseover,mouseout><div class="image" style="background-image:url({@picUrl});"></div><div><div class="name"><a href="{@link}" target="_blank" style="text-decoration: none;">{@n}</a><span class="desc">({@desc})</span></div><div class="info">{@likes} Likes</div><div class="info filter" style="color: #4099ff;">'+mstrmojo.desc(14503,"Filter post data by date...")+"</div></div></div>",markupSlots:{iconNode:function(){return this.domNode.firstChild;},nameNode:function(){return this.domNode.children[1].children[0];},likesNode:function(){return this.domNode.children[1].children[1];},advancedPropertiesNode:function(){return this.domNode.children[1].children[2];}},markupMethods:{onvisibleChange:function(){this.domNode.style.display=this.visible?"block":"none";}},onclick:function(evt){var target=evt.e.target||evt.e.srcElement;this.source.handleSelectionChange(this);if(target===this.advancedPropertiesNode){this.onadvancedSearchClick();}},postBuildRendering:function postBuildRendering(){if(this._super){this._super();}this.set("title",this.n);},setSelectedItem:function setSelectedItem(){mstrmojo.css.toggleClass(this.domNode,"selected",true);},setUnSelectedItem:function setUnSelectedItem(){mstrmojo.css.toggleClass(this.domNode,"selected",false);},onadvancedSearchClick:function onadvancedSearchClick(){var _that=this;var zIndex=mstrApp.getRootController().dialogController.getCurrentZIndex()+1;var d=new mstrmojo.Editor({cssClass:"mstrmojo-di-facebookAdvancedEditor",cssText:"background: white; width:475px;border: 10px solid rgba(0, 0, 0, 0.3); border-radius:5px; -moz-border-radius:5px;-webkit-border-radius:10px;",showTitle:true,title:mstrmojo.desc(3653,"Advanced Options"),zIndex:zIndex,onOpen:function(){var st=this.curtainNode.style;st.background="black";st.opacity=0.5;st.filter="alpha(opacity=50)";},children:[{scriptClass:"mstrmojo.DI.DIFacebookAdvancedEditor",alias:"editorContent",bindings:{advancedProperties:function(){return _that.advancedProperties||{};}}}],buttons:[{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-di-button mstrmojo-WebButton",text:mstrmojo.desc(1442,"OK"),onclick:function(){var p=this.parent.parent;if(p.editorContent.onOk){p.editorContent.onOk();_that.advancedProperties=p.editorContent.advancedProperties;}p.close();}},{scriptClass:"mstrmojo.Button",cssClass:"mstrmojo-di-button mstrmojo-WebButton",text:mstrmojo.desc(221,"Cancel"),onclick:function(){var p=this.parent.parent;p.close();if(p.onCancel){p.onCancel();}}}]});d.open();}});}());