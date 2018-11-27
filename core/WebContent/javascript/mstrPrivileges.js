mstrPrivilegesImplScript=true;mstrPrivilegesImpl.prototype=new Object();mstrPrivilegesImpl.prototype.id=null;mstrPrivilegesImpl.prototype.parentBone=null;mstrPrivilegesImpl.prototype.requirements=new Array();mstrPrivilegesImpl.prototype.dependencies=new Array();function mstrPrivilegesImpl(id,parentBone){this.init(id,parentBone);return this;}mstrPrivilegesImpl.prototype.init=function(id,parentBone){try{this.id=id;this.parentBone=parentBone;this.initDependencies();this.initRequirements();}catch(err){microstrategy.errors.log(err);return false;}};mstrPrivilegesImpl.prototype.syncDependencies=function(){try{if(this.parentBone&&this.parentBone.getPrivilegeRow){var row=this.parentBone.getPrivilegeRow(this.id);var checkBox=row.getElementsByTagName("input")[0];if(checkBox&&checkBox.checked){for(var i=0;i<this.requirements.length;i++){var requirement=this.requirements[i];var depRow=this.parentBone.getPrivilegeRow(requirement);if(depRow){var depCheckBox=depRow.getElementsByTagName("input")[0];if(depCheckBox&&!depCheckBox.checked){depCheckBox.checked=true;depCheckBox.onclick();}}}}else{for(var i=0;i<this.dependencies.length;i++){var dependency=this.dependencies[i];var depRow=this.parentBone.getPrivilegeRow(dependency);if(depRow){var depCheckBox=depRow.getElementsByTagName("input")[0];if(depCheckBox&&depCheckBox.checked){depCheckBox.checked=false;depCheckBox.onclick();}}}}}}catch(err){microstrategy.errors.log(err);return false;}};mstrPrivilegesImpl.prototype.isServerLevel=function(){try{var serverLevelPrivileges="2,7,50,53,57,58,121,145,146,147,148,150,151,152,153,154,155,174";return(serverLevelPrivileges.contains(this.id,","));}catch(err){microstrategy.errors.log(err);return false;}};mstrPrivilegesImpl.prototype.initDependencies=function(){try{this.dependencies=new Array();switch(parseInt(this.id)){case 1:this.dependencies.push(24,29,46,204,208,223,258);break;case 2:this.dependencies.push(50);break;case 3:this.dependencies.push(122,135,223,258);break;case 4:this.dependencies.push(41);break;case 5:this.dependencies.push(202);break;case 38:this.dependencies.push(25,39);break;case 42:case 19:this.dependencies.push(36);break;case 73:case 57:this.dependencies.push(258);break;case 137:this.dependencies.push(138);break;case 164:this.dependencies.push(223,258);break;case 193:this.dependencies.push(194);case 194:this.dependencies.push(195,215);break;case 196:this.dependencies.push(49,116,119,129,180,186,197,250);break;case 219:this.dependencies.push(63,67,68,71,74,75,127,130,134,160,161,162,163,164,205,208,211,213,220,223,258);break;case 223:this.dependencies.push(224);break;case 232:case 241:case 255:case 256:this.dependencies.push(258);break;}}catch(err){microstrategy.errors.log(err);return false;}};mstrPrivilegesImpl.prototype.initRequirements=function(){try{this.requirements=new Array();switch(parseInt(this.id)){case 208:this.requirements.push(219);case 29:case 24:case 46:case 204:this.requirements.push(1);break;case 39:case 25:this.requirements.push(38);break;case 50:this.requirements.push(2);break;case 41:this.requirements.push(4);break;case 36:this.requirements.push(19,42);break;case 122:case 135:this.requirements.push(3);break;case 197:case 49:case 119:case 116:case 129:case 186:case 180:this.requirements.push(196);break;case 195:case 215:this.requirements.push(194);case 194:this.requirements.push(193);break;case 138:this.requirements.push(137);break;case 202:this.requirements.push(5);break;case 63:case 67:case 68:case 71:case 74:case 75:case 127:case 130:case 134:case 160:case 161:case 162:case 163:case 164:case 205:case 211:case 213:case 220:this.requirements.push(219);break;case 223:this.requirements.push(1,3,164,219);break;case 224:this.requirements.push(223);break;case 258:this.requirements.push(1,3,57,73,164,219,232,241,255,256);break;}}catch(err){microstrategy.errors.log(err);return false;}};