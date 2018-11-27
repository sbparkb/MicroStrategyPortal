(function(){mstrmojo.requiresCls("mstrmojo.color","mstrmojo.css","mstrmojo.hash");var $CLR=mstrmojo.color,$CSS=mstrmojo.css,$HASH=mstrmojo.hash;function getRGB(value){value=getColorValue(value);if(isNaN(value)){value=0;}value%=16777216;return{b:value%(1<<8),g:(value%(1<<16))>>8,r:(value%(1<<24))>>16};}function getCSSColorString(value,alpha,options){value=getColorValue(value);options=$HASH.copy(options,{retainGradientObject:false});if(isGradientColor(value)){var strC1=getCSSColorString(value.c1,alpha),strC2=getCSSColorString(value.c2,alpha);if(options.retainGradientObject){return{c1:strC1,c2:strC2,or:value.or};}return $CSS.buildGradient(value.or,strC1,strC2).v;}if(typeof alpha==="number"){var rgb=getRGB(value);if(isNaN(value)){alpha=0;}return"rgba("+rgb.r+" ,"+rgb.g+" ,"+rgb.b+" ,"+alpha+" )";}else{if(isNaN(value)){value=0;}return"#"+(16777216+value%16777216).toString(16).substring(1,7);}}function getColorValue(cssString){var c1=cssString.c1,c2=cssString.c2;if(isGradientColor(cssString)){return{c1:getColorValue(c1),c2:getColorValue(c2),or:cssString.or};}if(typeof cssString==="number"){return cssString;}if(typeof cssString!=="string"){return NaN;}if(cssString[0]!=="#"){return parseInt(cssString,10);}if(cssString.length===4){cssString=cssString[0]+cssString[1]+cssString[1]+cssString[2]+cssString[2]+cssString[3]+cssString[3];}return parseInt(cssString.substring(1,7),16);}function mix(color,background){var cv=color.value,co=color.opacity;if(isGradientColor(cv)){return["c1","c2"].reduce(function(mixedColor,key,idx){var rv=mix({value:cv[key],opacity:co},background);mixedColor.value[key]=rv.value;if(idx===0){mixedColor.opacity=rv.opacity;}return mixedColor;},{value:{or:cv.or}});}if(cv==="transparent"){color.value=background.value;}var c1=$CLR.hex2rgb(getCSSColorString(color.value)),c2=$CLR.hex2rgb(getCSSColorString(background.value)),alpha1=color.opacity,alpha2=background.opacity,alpha3=1-alpha1,c,alpha;alpha=alpha1+alpha2*alpha3;c=c1.map(function(v,i){return(v*alpha1+c2[i]*alpha2*alpha3)/alpha;});return{value:"#"+$CLR.rgb2hex.apply(undefined,c),opacity:alpha};}function isGradientColor(clr){return clr&&["c1","c2","or"].every(function(key){return clr.hasOwnProperty(key);});}mstrmojo.util.color=mstrmojo.provide("mstrmojo.util.color",{getCSSColorString:getCSSColorString,getColorValue:getColorValue,mix:mix,isGradientColor:isGradientColor,getRGB:getRGB,createCanvasFillPattern:function(color,ctx,x0,y0,x1,y1){var cv=color.value,co=color.opacity,pattern;if(isGradientColor(cv)){pattern=ctx.createLinearGradient(x0,y0,x1,y1);pattern.addColorStop(0,getCSSColorString(cv.c1,co));pattern.addColorStop(1,getCSSColorString(cv.c2,co));}else{pattern=getCSSColorString(cv,co);}return pattern;}});})();