(function(){mstrmojo.requiresCls("mstrmojo.Box","mstrmojo.dom","mstrmojo.architect.projectmanagement.PMIconView");var $A=mstrmojo.array,$DOM=mstrmojo.dom;function positionIcons(){if(!this.visible){return ;}var rowIndex=0,colIndex=0,h=0,w=0,bChecked=false,$this=this,hasRendered=$this.scrollbox.iconsbox.hasRendered;if(!hasRendered){return ;}$A.forEach(this.scrollbox.iconsbox.children,function(iconview){var style=iconview.domNode.style;if(!bChecked){if(!$this.boxh||$this.boxh<=5){h=$DOM.position(iconview.domNode).h+5;w=$DOM.position(iconview.domNode).w+10;if(h<80){h=80;}if(w<500){w=500;}$this.boxh=h;$this.boxw=w;}else{h=$this.boxh;w=$this.boxw;}bChecked=true;}iconview.setWidth(w);style.top=rowIndex*h+"px";style.left=colIndex++*w+"px";if(colIndex>=2){colIndex=0;rowIndex++;}});}function populateProjectList(){var ibox=this.scrollbox.iconsbox;if((ibox.children)&&(ibox.children.length>0)){ibox.children=[];ibox.render();}$A.forEach(this.info,function(project){var iconview=new mstrmojo.architect.projectmanagement.PMIconView(project);iconview.render();ibox.addChildren([iconview]);});positionIcons.call(this);}mstrmojo.architect.projectmanagement.ProjectManagerIcons=mstrmojo.declare(mstrmojo.Box,null,{scriptClass:"mstrmojo.architect.projectmanagement.ProjectManagerIcons",cssClass:"mstrmojo-ProjectManagerIcons",scrollbox:undefined,iconsbox:undefined,children:[{scriptClass:"mstrmojo.Box",cssClass:"mstrmojo-PM-ScrollBox",alias:"scrollbox",children:[{scriptClass:"mstrmojo.Box",cssClass:"mstrmojo-PM-IconsBox",alias:"iconsbox",children:[]}]}],info:undefined,oninfoChange:function oninfoChange(){if(!this.hasRendered){this.render();}populateProjectList.call(this);},onvisibleChange:function onvisibleChange(){positionIcons.call(this);},boxh:0,boxw:0});}());