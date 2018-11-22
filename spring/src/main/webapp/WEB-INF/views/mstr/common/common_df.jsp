<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="spring"    uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form"      uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn"        uri = "http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="web"       uri="/webUtilTL.tld"%>
<%@ taglib prefix="sep"       uri="/sepMstrTL.tld"%>
<un:useConstants var="CmmCode" className="com.groto.cmm.util.CmmCode" scope="request"/>
<head>
<meta charset="utf-8">
<meta http-equiv="imagetoolbar" content="no">
<meta name='viewport' content='width=device-width, initial-scale=1'>
<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
<sep:script message="${message}"/>
<title><spring:message code='BROWSER.TITLE' /></title>
<script type="text/javascript" src="${fn:escapeXml(pageContext.request.contextPath)}/resource/javascript/jquery.min.js"></script>
<script type="text/javascript" src="${fn:escapeXml(pageContext.request.contextPath)}/resource/javascript/jquery-ui.js"></script>
<script type="text/javascript" src="${fn:escapeXml(pageContext.request.contextPath)}/resource/javascript/jquery.sumoselect.js"></script>
<script type="text/javascript" src="${fn:escapeXml(pageContext.request.contextPath)}/resource/javascript/common.js"></script>
<script src="${fn:escapeXml(pageContext.request.contextPath)}/resource/javascript/jquery-ui-1.9.2.custom.min.js"></script>
<script src="${fn:escapeXml(pageContext.request.contextPath)}/resource/javascript/multiselect/multiple-select.js"></script>

<script type="text/javascript" src="${fn:escapeXml(pageContext.request.contextPath)}/javascript/mstr/core.js"></script>
<script type="text/javascript" src="${fn:escapeXml(pageContext.request.contextPath)}/javascript/microstrategy.js"></script>
<script type="text/javascript" src="${fn:escapeXml(pageContext.request.contextPath)}/javascript/DHTML.js"></script>

<script src="${fn:escapeXml(pageContext.request.contextPath)}/resource/javascript/json2.js"></script>

<script src="${fn:escapeXml(pageContext.request.contextPath)}/resource/javascript/common/ajaxcommon.js"></script>
<script src="${fn:escapeXml(pageContext.request.contextPath)}/resource/javascript/common/popuplink.js"></script>

<link href="${fn:escapeXml(pageContext.request.contextPath)}/resource/css/sumoselect.css" rel="stylesheet" type="text/css">
<link href="${fn:escapeXml(pageContext.request.contextPath)}/resource/css/jquery-ui.css" rel="stylesheet" type="text/css">

<link rel="stylesheet" type="text/css" href="${fn:escapeXml(pageContext.request.contextPath)}/resource/css/upload/uploadfile.css" />
<link rel="stylesheet" type="text/css" href="${fn:escapeXml(pageContext.request.contextPath)}/resource/css/main.css" />

<script src="${fn:escapeXml(pageContext.request.contextPath)}/resource/pmd/common/common_df.js"></script> 
</head>