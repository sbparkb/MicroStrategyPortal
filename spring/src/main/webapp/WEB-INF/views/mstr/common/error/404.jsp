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
			<p class="tit">페이지를 <span>찾을 수 없습니다.</span></p>
			<p class="txt">방문하시려는 페이지의 주소를 잘못 입력하셨거나,<br/>페이지의 주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.<br/>입력하신 주소가 정확한지 다시 한 번 확인해 주시기 바랍니다.</p>
			<button class="btn-prev" onClick="javascript:fncMoveMain();">이전 페이지</button>
		</div>
	</div>
</div>
</body>
</html>
