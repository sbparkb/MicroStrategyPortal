(function(){mstrmojo.requiresCls("mstrmojo.string","mstrmojo.expr");var $STR=mstrmojo.string,$EXP=mstrmojo.expr,$XPT=$EXP.ET;mstrmojo.fe.FilterUtils=mstrmojo.provide("mstrmojo.fe.FilterUtils",{getExprXml:function(expr){var root="<exp>",end="</exp>",props={a:true,a2:true,a3:true,agg:true,cc:true,ce:true,cgp:true,cs:true,conid:true,desc:true,did:true,attId:true,dmt:true,dmy:true,dtp:true,es:true,et:true,expr:true,f:true,flat:true,flt:true,fm:true,fm2:true,fm3:true,fn:true,fnt:true,fres:true,gb:true,isp:true,items:true,m:true,m2:true,m3:true,n:true,nds:true,not:true,pf:true,p:true,r:true,rps:true,st:true,t:true,utgt:true,utp:true,uts:true,v:true,xml:true,relation:true,applySubExpr:true,useSchema:true,guide:true,rsTp:true,joTp:true,paTp:true,erTp:true,exp:true,joAttrs:true,ph:true,idx:true,idc:true,idcsi:true,ucfg:true},config={getArrItemName:function(n){return n.substr(0,n.length-1);},isSerializable:function(nodeName,jsons,index){if(nodeName==="xml"){var ndXML=jsons[index].xml;return{att:'hasXML = "-1"',child:ndXML};}else{if(mstrmojo.array.indexOf(["header_format","grid_format","child_header_format","child_grid_format"],nodeName)>-1){var format=jsons[index][nodeName];if(!format){return{};}var xml="<"+nodeName+">";for(var prs in format){xml+="<prs n='"+prs+"'>";var prsv=format[prs];for(var pr in prsv){var prv=prsv[pr];xml+="<pr n='"+pr+"' v='"+(prv==="pru"?"":prv)+"'";xml+=prv==="pru"?' pru="1"':"";xml+="/>";}xml+="</prs>";}xml+="</"+nodeName+">";return{child:xml};}else{if(nodeName==="cs"){var nd=jsons[index],cs=jsons[index][nodeName];if(nd&&nd.fnt&&nd.fnt==$EXP.FNT.PER&&cs){if(cs[0]){cs[0].v+="%";}if(cs[1]){cs[1].v+="%";}}return true;}}}return(props[nodeName])?true:false;},skipNull:true},rootNode=expr;if(!rootNode||rootNode.et!=$XPT.ANDOR){rootNode={et:$XPT.ANDOR,fn:$EXP.FN.AND,nds:rootNode?[rootNode]:[]};}var ndXml=$STR.json2xml("nd",[{},rootNode],config);return root+ndXml+end;}});}());