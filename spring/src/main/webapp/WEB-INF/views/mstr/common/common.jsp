<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="spring"    uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form"      uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt"       uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn"        uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="web" uri="/webUtilTL.tld" %>
<%
	response.setHeader("P3P", "CP='CAO PSA CONi OTR OUR DEM ONL'");
	String contextRoot = request.getContextPath();
	String contextDoc = contextRoot + "/resource";

	request.setAttribute("isBiWeb", "Y");
%>
<head>
<meta charset="utf-8">
<meta http-equiv="imagetoolbar" content="no">
<meta name='viewport' content='width=device-width, initial-scale=1'>
<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">

<title><spring:message code='BROWSER.TITLE' /></title>

<!--[if lt IE 9]>
	<script src="<%=contextDoc %>/javascript/html5shiv.js"></script>
<![endif]-->
<link href="<%=contextDoc %>/css/common.css" rel="stylesheet" type="text/css">
<link href="<%=contextDoc %>/css/sumoselect.css" rel="stylesheet" type="text/css">
<link href="<%=contextDoc %>/css/jquery-ui.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" type="text/css" href="<%=contextDoc %>/css/main.css" />
<link rel="stylesheet" type="text/css" href="<%=contextDoc %>/css/upload/uploadfile.css" />

<script>
var URL_WEB_SERVER			= "<spring:message code='URL.WEB.SERVER' />";
var URL_IMG_SERVER 			= 	"<spring:message code='URL.IMG.SERVER'/>";
var FILE_UPLOAD_URL 		= 	"<spring:message code='FILE.UPLOAD.URL' />";
var FILE_MAX_SIZE 			= 	Number("<spring:message code='FILE.MAX.SIZE' />");
var FILE_INIT_NAME 			= 	"<spring:message code='FILE.INIT.NAME' />";
var FILE_ALLOWED_TYPE 		= 	"<spring:message code='ALLOW.FILE.EXTENSION' />";
//쿠키에 id를 저장.
function setCookie(name, value, expiredays) {
 // alert("cookie Save!!");
  var today = new Date();
  today.setDate(today.getDate() + expiredays);
  document.cookie = name + "=" + escape(value) + "; path=/; expires="
          + today.toGMTString() + ";";
  
}

function getCookie(name){
	var cook = document.cookie + ";";
	var idx = cook.indexOf(name, 0);
	var val = "";
	if (idx != -1) {
	    cook = cook.substring(idx, cook.length);
	    begin = cook.indexOf("=", 0) + 1;
	    end = cook.indexOf(";", begin);
	    val = unescape(cook.substring(begin, end));
	}
  return val;
}
</script>
<script type="text/javascript" src="<%=contextDoc %>/javascript/jquery.min.js"></script>
<script type="text/javascript" src="<%=contextDoc %>/javascript/jquery-ui.js"></script>
<script type="text/javascript" src="<%=contextDoc %>/javascript/jquery.sumoselect.js"></script>
<script type="text/javascript" src="<%=contextDoc %>/javascript/common.js"></script>
<script type="text/javascript" src="<%=contextDoc %>/javascript/multimenu.js"></script>
<script src="<%=contextDoc %>/javascript/jquery-ui-1.9.2.custom.min.js"></script>
<script src="<%=contextDoc %>/javascript/multiselect/multiple-select.js"></script>
<script type="text/javascript" src="<spring:message code="URL.IMG.SERVER"/>javascript/jquery.meio.mask.js"></script>
<script type="text/javascript" src="<spring:message code="URL.IMG.SERVER"/>javascript/jquery.validate.js"></script>
<script type="text/javascript" src="<spring:message code="URL.IMG.SERVER"/>javascript/jquery.selectbox-0.2.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/javascript/mstr/core.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/javascript/microstrategy.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/javascript/DHTML.js"></script>
<script src="<%=contextDoc %>/javascript/json2.js"></script>
<script src="<%=contextDoc %>/javascript/html2canvas.js"></script>
<script type="text/javascript" src="<%=contextDoc %>/javascript/html2canvas.svg.js"></script>
<script src="<%=contextDoc %>/javascript/common/ajaxcommon.js"></script>
<script src="<%=contextDoc %>/javascript/common/popuplink.js"></script>
<script src="<%=contextDoc %>/javascript/common/util.js"></script>
<script type="text/javascript" src="<spring:message code="URL.IMG.SERVER"/>editor/js/HuskyEZCreator.js"></script>
<script type="text/javascript" src="<spring:message code="URL.IMG.SERVER"/>javascript/jquery.form.js"></script>
<script src="<%=contextDoc %>/javascript/jquery.uploadfile.js"></script>
<script>
	var lnbHtml				= "";
	 
	
	var noFabric = true;
	//AJAX Deferred 사용하여 AJAX 호출
	function callAjax(ajaxInfo){
		var dfd = $.Deferred();
		$.ajax(ajaxInfo).done(function(data){
			dfd.resolve(data);
		}).error(function(xhr, status, error){
			dfd.reject(xhr);
			fncfail(xhr);
		});
		
		return dfd.promise();
	}
	
	var fncfail=function(xhr) {
	
		if(opener){
			window.close();
			if(xhr.status==404){
				opener.location.href ="<spring:message code="URL.WEB.SERVER"/>/error/404.do";
			}else if(xhr.status==500){
				opener.location.href ="<spring:message code="URL.WEB.SERVER"/>/error/500.do";
			}else{
				opener.location.href ="<spring:message code="URL.WEB.SERVER"/>/error/exception.do";
			}
		}else{
			if(xhr.status==404){
				top.location.href ="<spring:message code="URL.WEB.SERVER"/>/error/404.do";
			}else if(xhr.status==500){
				top.location.href ="<spring:message code="URL.WEB.SERVER"/>/error/500.do";
			}else{
				top.location.href ="<spring:message code="URL.WEB.SERVER"/>/error/exception.do";
			}
			
		}
	};
	
	$(document).ready(function(){
		
		
		if("${message}" != null && "${message}" != ""){
			alert("${message}");
		}
 
	});  //$(document).ready
	
 
/*
	//페이지 리다이렉스 처리(디폴트웹 이동시)
	var fncPageRedirect				= function(url){
		$("#sitemap").html("");
		var form					= $("<form></form>");
		form.attr("method", "post");
		form.attr("action", "<spring:message code='URL.WEB.SERVER' />/redirect.do");
		form.append("<input type='hidden' name='url' value='"+url+"' />");
		
		$("body").append(form);
		
		form.submit();
	}
*/
</script>
</head>