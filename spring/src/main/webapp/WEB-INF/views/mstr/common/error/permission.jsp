<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page session="true" %>
<%@page import="java.util.Locale"%>
<html lang="ko-KR">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
<jsp:include page="/WEB-INF/views/mstr/common/err_common.jsp" />
	<script src="${fn:escapeXml(pageContext.request.contextPath)}/resource/pmd/common/error/error.js"></script>	
</head>
<body>
<div id="wrapper">
	<div id="error-container">
		<div class="er-wrap">
			<img src="<spring:message code='URL.IMG.SERVER'/>images/ico_error.png" alt="" />
			<p class="tit"><span>이 페이지에</span> 접근 권한이 없습니다.</p>
			<p class="txt">권한에 관련된 궁금하신 사항은 담당자에게 문의해 주시면 <br> 빠른시간내에 처리해 드리겠습니다.</p>
			<button class="btn-prev" onClick="javascript:fncMoveMain();">이전 페이지</button>
		</div>
	</div>
</div>
</body>
</html>
