(function(){mstrmojo.gmaps.MapPropertiesHelper=mstrmojo.provide("mstrmojo.gmaps.MapPropertiesHelper",{getMatchingShape:function getMatchingShape(shapes,shapeId,geoRole){var i,shape,firstCustomShape,firstDefaultShape;if(!shapes){return null;}if(!!shapeId){for(i=0;i<shapes.length;i++){if(shapes[i].id==shapeId){shape=shapes[i];break;}}}else{if(!!geoRole){for(i=0;i<shapes.length;i++){if(!!shapes[i].custom&&shapes[i].custom==true&&shapes[i].roleId==geoRole){if(!firstCustomShape){firstCustomShape=shapes[i];}if(!!shapes[i]["default"]&&(shapes[i]["default"]+"").toLowerCase()==="true"){shape=shapes[i];break;}}else{if(!firstDefaultShape&&shapes[i].roleId==geoRole&&!!shapes[i]["default"]&&(shapes[i]["default"]+"").toLowerCase()==="true"){firstDefaultShape=shapes[i];}}}if(!shape){if(!!firstDefaultShape){shape=firstDefaultShape;}else{if(!!firstCustomShape){shape=firstCustomShape;}}}}}return shape;}});}());