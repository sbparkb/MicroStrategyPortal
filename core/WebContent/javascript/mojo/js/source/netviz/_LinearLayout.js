(function(){mstrmojo.requiresCls("mstrmojo.array","mstrmojo.VisEnum");var $ARR=mstrmojo.array,$VIS_ENUM=mstrmojo.VisEnum,LAYOUT_NAME=$VIS_ENUM.NETWORK_LAYOUT.LINEAR;mstrmojo.netviz._LinearLayout=mstrmojo.provide("mstrmojo.netviz._LinearLayout",{_mixinName:"mstrmojo.netviz._LinearLayout",init:function(e){if(this._super){this._super(e);}if(this.layouts===undefined){this.layouts={};}this.layouts[LAYOUT_NAME]=layout;}});function layout(abstractedModel,stage,sceneDimension){var sortedNodes=abstractedModel.nodes,len=sortedNodes.length,totalLength=sceneDimension.dimension,padding=Math.max(10,(180-totalLength)/len)/2,viewHeight=stage.height,last=-1*padding,middle=viewHeight/2;stage.currentLayout=LAYOUT_NAME;$ARR.forEach(abstractedModel.nodes,function(node){if(node.isExcluded){return ;}var sprite=node.sprite,p=sprite.getGeometry(),pr=p.s;p.x=last+pr+padding;p.y=middle;sprite.setGeometry(p);last+=2*(pr+padding);});$ARR.forEach(abstractedModel.edges,function(edge){var from=edge.from.sprite,to=edge.to.sprite,fg=from.getGeometry(),tg=to.getGeometry(),ftx=tg.x-fg.x,fty=tg.y-fg.y,mx=(fg.x+tg.x)/2,my=(fg.y+tg.y)/2;edge=edge.sprite;var g={x:mx-fty*0.5,y:my+ftx*0.5};edge.setGeometry(g);});}}());