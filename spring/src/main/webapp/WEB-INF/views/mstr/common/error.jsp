<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri = "http://java.sun.com/jsp/jstl/functions" prefix = "fn" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>
<%@ page isErrorPage="true" %>
<html>
<HEAD>
<meta http-equiv="X-UA-Compatible" content="IE=8"/>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /> 
<script type="text/javascript">
</script>
<style type="text/css">
body {
	width:100%;
	height:100%;
	color:#555; text-align:center;
	font:14px/1.5 "돋움",Dotum, sans-serif;
}
</style>
<TITLE>Error Page</TITLE>
</HEAD>
<body>
<h2>Error</h2>
<span>${fn:escapeXml(msg)</span>
<div style="margin-top: 20px; display: table; width: 100%; align: center;">
    <div style='float: center; display: table-cell; text-align: center; vertical-align: middle; cursor: pointer; width: 110px; height: 27px; background-repeat: no-repeat; background-position: center; background-image: url("<c:url value="/resources/images/gbi/btn_empty.png"/>");' onclick="history.back();">
        <div style="display: inline-block; line-height: 24px; font-size:12px; color:#555; font-weight: bold; text-align: center;">Back</div> 
    </div>
</div>
</body>
</html>