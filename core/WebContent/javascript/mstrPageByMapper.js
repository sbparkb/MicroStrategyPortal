mstrPageByMapperImplScript=true;mstrPageByMapperImpl.prototype=new Object();mstrPageByMapperImpl.prototype.getAreas=function(bone,map,dimensions){try{var areas=new Object();var count=0;var height=dimensions.height;var x=0,y=0,t=0,y2=0;var newX;var units=bone.units;if(units&&units.length>0){height=getObjHeight(units[0]);var length=units.length;var baseLeft=dimensions.left;var baseTop=dimensions.top;var childHeight=getObjHeight(units[0]);y=t=getObjSumTop(units[0])-baseTop-1;if(Math.floor(height/childHeight)>1){y2=getObjSumTop(units[0])+childHeight-baseTop+1;height=childHeight+3;}else{y2=t+height;}var firstUnitLeft=getObjSumLeft(units[0])-baseLeft;var firstUnitWidth=getObjWidth(units[0]);var mid=firstUnitLeft+(firstUnitWidth/2);areas[count++]=this.buildArea(units[0].getAttribute("id"),x,y,x+mid,y2,firstUnitLeft,t,height);x=mid;for(var i=1;i<length;i++){mid=getObjSumLeft(units[i])-baseLeft;x++;if(mid<x){areas[count++]=this.buildArea(units[i].getAttribute("id"),x,y,dimensions.width,y2,(getObjSumLeft(units[i-1])-baseLeft+getObjWidth(units[i-1])+3),t,height);y=y2+1;if(dimensions.height-getObjSumTop(units[i])+baseTop<2*childHeight){y2=dimensions.height-1;}else{y2=getObjSumTop(units[i])+childHeight-baseTop+1;}t=getObjSumTop(units[i])-baseTop-1;newX=(getObjWidth(units[i])/2);areas[count++]=this.buildArea(units[i].getAttribute("id"),0,y,newX,y2,1,t,height);x=newX;}else{newX=mid+(getObjWidth(units[i])/2);areas[count++]=this.buildArea(units[i].getAttribute("id"),x,y,newX,y2,mid-2,t,height);x=newX;}}var l=(length==1)?firstUnitLeft+firstUnitWidth:getObjSumLeft(units[units.length-1])-baseLeft+getObjWidth(units[units.length-1]);areas[count++]=this.buildArea(bone.id,x+1,y,dimensions.width,y2,l+3,t,height);}else{areas[count++]=this.buildArea(bone.id,x,y,dimensions.width,height,x,y,height);}areas.length=count;return areas;}catch(err){microstrategy.errors.log(err);return null;}};mstrPageByMapperImpl.prototype.buildArea=function(id,x,y,x2,y2,l,t,height){try{var a=new mstrAreaObjectImpl();a.coords=x+","+y+","+x2+","+y2;a.pointsTo=id;a.onmouseovercoords=l+","+t+","+height+","+microstrategy.DND_HILITE_WIDTH;return a;}catch(err){microstrategy.errors.log(err);return null;}};function mstrPageByMapperImpl(){return this;}