<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page session="true" %>
<%@page import="java.util.Locale"%>
<html lang="ko-KR">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
<jsp:include page="/WEB-INF/views/mstr/common/err_common.jsp" />
	<title><spring:message code="SITE.BROWSER.TITLE"/></title>
	<script src="${fn:escapeXml(pageContext.request.contextPath)}/resource/pmd/common/error/error.js"></script>	
</head>
<body>
<div id="wrapper">
	<div id="error-container">
		<div class="er-wrap">
			<img src="<spring:message code='URL.WEB.SERVER' />images/ico_error.png" alt="" />
			<p class="tit"><span>페이지를 실행중 오류</span>가 발생 했습니다.</p>
			<p class="txt">죄송합니다.<br> 
          	시스템 운용 중 뜻하지 않은 오류가 발생되었습니다.<br> 
          	담당자에게 문의를 주시면 빠른시간내에 처리해 드리겠습니다.</p>
			<button class="btn-prev" onClick="javascript:fncMoveMain();">이전 페이지</button>
		</div>
	</div>
</div>
</body>
</html>
