function removeParameterFromURL(sURL,sParameter){var iInitialPos=-1;var iFinalPos=-1;var sTempUpperURL=sURL.toUpperCase();var sTempURL=sURL;var sSearch=sParameter.toUpperCase()+"=";var sLeadChar="";iInitialPos=sTempUpperURL.indexOf(sSearch);if(iInitialPos>-1){sLeadChar=sTempUpperURL.substr(iInitialPos-1,1);if((sLeadChar!="&")&&(sLeadChar!="?")){iInitialPos=sTempUpperURL.indexOf(sSearch,iInitialPos+1);}if(iInitialPos>-1){iFinalPos=sTempURL.indexOf("&",iInitialPos);if(iFinalPos==-1){sLeadChar=sTempURL.substr(iInitialPos-1,1);if(sLeadChar=="&"){iInitialPos--;}sTempURL=sTempURL.substr(0,iInitialPos);}else{sTempURL=sTempURL.substr(0,iInitialPos-1)+sTempURL.substr(iFinalPos);}}}return sTempURL;}function replaceURLParameter(sURL,sFieldToChange,sValueToChange){var jumpLink="";if(sURL.indexOf("#")>-1){jumpLink=sURL.substr(sURL.indexOf("#"));sURL=sURL.substr(0,sURL.indexOf("#"));}sURL=removeParameterFromURL(sURL,sFieldToChange);if(sURL.length>0){if(sURL.substr(-1)=="?"){sURL+=sFieldToChange+"="+sValueToChange;}else{sURL+="&"+sFieldToChange+"="+sValueToChange;}}else{sURL+=sFieldToChange+"="+sValueToChange;}return sURL+jumpLink;}function getURLParameter(sURL,sParameter){var iInitialPos=-1;var iFinalPos=-1;var sTempUpperURL=sURL.toUpperCase();var sValue="";var sSearch=sParameter.toUpperCase()+"=";iInitialPos=sTempUpperURL.indexOf(sSearch);if(iInitialPos>-1){iInitialPos+=sSearch.length;iFinalPos=sURL.indexOf("&",iInitialPos);if(iFinalPos==-1){sValue=sURL.substr(iInitialPos);}else{sValue=sURL.substr(iInitialPos,iFinalPos-iInitialPos);}}return sValue;}