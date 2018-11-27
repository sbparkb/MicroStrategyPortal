mstrSerializer.prototype=new Object;mstrSerializer.prototype.buffer="";mstrSerializer.prototype.needDelim=false;mstrSerializer.CH_ESCAPE="*";mstrSerializer.CH_DELIM=".";mstrSerializer.CH_BRA="-";mstrSerializer.CH_KET="_";mstrSerializer.CH_LESS="<";mstrSerializer.STR_NULL="*0";mstrSerializer.prototype.getState=function(){try{return this.buffer;}catch(err){microstrategy.errors.log(err);return false;}};mstrSerializer.prototype.addStr=function(value){try{if(this.needDelim){this.buffer+=mstrSerializer.CH_DELIM;}this.appendValue(value);this.needDelim=true;}catch(err){microstrategy.errors.log(err);return false;}};mstrSerializer.prototype.addInt=function(value){try{this.addStr(value+"");}catch(err){microstrategy.errors.log(err);return false;}};mstrSerializer.prototype.addBoolean=function(value){try{this.addStr(value?"1":"0");}catch(err){microstrategy.errors.log(err);return false;}};mstrSerializer.prototype.addValues=function(values){try{this.buffer+=mstrSerializer.CH_BRA;for(var i=0;i<values.length;i++){if(i>0){this.buffer+=mstrSerializer.CH_DELIM;}this.appendValue(values[i]);}this.buffer+=mstrSerializer.CH_KET;this.needDelim=false;}catch(err){microstrategy.errors.log(err);return false;}};mstrSerializer.prototype.appendValue=function(value){try{var regExp=new RegExp("[\\"+mstrSerializer.CH_ESCAPE+"\\"+mstrSerializer.CH_BRA+"\\"+mstrSerializer.CH_KET+"\\"+mstrSerializer.CH_DELIM+"\\"+mstrSerializer.CH_LESS+"]","g");var replacementText=mstrSerializer.CH_ESCAPE+"$&";value=String(value).replace(regExp,replacementText);this.buffer+=value;}catch(err){microstrategy.errors.log(err);return false;}};function mstrSerializer(){return this;}