(function(){mstrmojo.requiresCls("mstrmojo.Box","mstrmojo.qb.FFsqlInput");var $ARR=mstrmojo.array,$HASH=mstrmojo.hash;function getFormatSpace(len,isNewLine){var result=isNewLine?"\n":"",i;for(i=0;i<len;++i){result+=" ";}return result;}mstrmojo.qb.FFsqlEditor=mstrmojo.declare(mstrmojo.Box,null,{scriptClass:"mstrmojo.qb.FFsqlEditor",cssClass:"mstrmojo-qb-ffsqlview",children:[{scriptClass:"mstrmojo.Box",alias:"passlabel",cssClass:"mstrmojo-qb-ffsqlview-passlabel"},{scriptClass:"mstrmojo.qb.FFsqlInput",alias:"ffsql",cssClass:"mstrmojo-qb-ffsqlview-editnode",id:"FFsql",txt:"",dropZone:true,onwidthChange:function onwidthChange(){if(this.hasRendered){this.parent.updatepasses();}},onheightChange:function onheightChange(){if(this.hasRendered){this.parent.updatepasses();}},updateSQL:function updateSQL(evt){if(!this.candidates){this.set("candidates",{items:this.sqlTokens.concat(mstrApp.getRootController().getSuggestionItems(true)),isComplete:true});}this.clearTokens();this.txt=evt.value;this.clipboardNode.value=evt.keepFormat?this.txt:this.formatSQL(this.txt);this.handlepaste();if(evt.value===""){this.parent.updatepasses();}this.oriSQL=this.getSQLstmt();},formatSQL:function formatSQL(sqlStr){var sqlArr,flag=false,fromFormat=getFormatSpace(2,false),groupbyFormat=getFormatSpace(1,false),whereFormat="\n",commaFormat=getFormatSpace(9,true),joinFormat=getFormatSpace(10,true),isInList=false;sqlArr=sqlStr.replace(/,/g," ,").replace(/;/g," ;").replace(/\n/g," ").replace(/ +/g," ").split(" ");$ARR.forEach(sqlArr,function(token,i){switch(token){case"from":case"having":sqlArr[i]="\n"+sqlArr[i]+fromFormat;break;case"group":if(sqlArr[i+1]==="by"){sqlArr[i]="\n"+sqlArr[i]+groupbyFormat;}break;case"where":sqlArr[i]=whereFormat+sqlArr[i];break;case"join":case"outer":if(flag){break;}case"full":case"left":case"right":sqlArr[i]=joinFormat+sqlArr[i];flag=true;break;case",":if(!isInList){sqlArr[i]=sqlArr[i]+commaFormat;}break;case"on":sqlArr[i]=joinFormat+sqlArr[i];flag=false;break;case";":sqlArr[i]=sqlArr[i]+"\n";break;case"in":isInList=true;break;default:if(isInList&&token.length>=1&&token[token.length-1]===")"){isInList=false;}break;}});return sqlArr.join(" ").replace(/ ,/g,",");}}],onwidthChange:function onwidthChange(evt){var ffsql=this.ffsql,node=ffsql.domNode,width;width=Math.max(parseInt(evt.value,10)-10,0)+"px";ffsql.set("width",width);if(node){node.style.width=width;}},updatepasses:function updatepasses(){var yCoordinates,ffsql=this.ffsql,btns=[],config={scriptClass:"mstrmojo.Button"},editorHeight=this.domNode.clientHeight,passlabel=this.passlabel;yCoordinates=ffsql.getPassLabelYCoords();$ARR.forEach(yCoordinates,function(yCoord,index){if(yCoord>=0&&yCoord<=editorHeight){btns.push($HASH.copy(config,{cssText:["top:",yCoord,"px;"].join(""),cssClass:(ffsql.pnum===index?"error":"")}));}});passlabel.removeChildren(null,true);passlabel.addChildren(btns,0,true);}});}());