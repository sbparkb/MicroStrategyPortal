<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>MAIN</title>
<script src="/custom/jquery.3.3.1.js"></script>
<script>
	$(document).ready(function() {
		//$('#mstrForm').submit();
	}); //ready
</script>
</head>
<body>
<form action="/servlet/mstrWeb" id="mstrForm" name="mstrForm" method="post" accept-charset="utf-8">
	<input type='hidden' name='usrSmgr' id='usrSmgr' value='${usrSmgr}'/>
	<input type='hidden' name='Server' value='${serverName}'/>
	<input type='hidden' name='Project' value='${projectName}'/>
	<input type='hidden' name='Port' value='0'/>
	<input type='hidden' name='evt' value='${evt}'/>
	<input type='hidden' name='src' value='${src}'/>
	<input type='hidden' name='${objectName}' value='${objectId}'/> 
	<c:choose>
 		<c:when test="${displayUnitType eq '55'}">
 			<input type="hidden" name="currentViewMedia" value="1" />
			<input type="hidden" name="visMode" value="1" />
			<input type='hidden' name='hiddenSections' value='dockTop,dockLeft,path,header,footer,toolbar' />
 		</c:when>
 		<c:otherwise>
 			<input type="hidden" name="reportViewMode" value="1" />
			<input type='hidden' name='hiddenSections' value='dockTop,dockLeft,path,header,footer,toolbar' />
 		</c:otherwise>
 	</c:choose>
 	<input type="submit" value="RUN"> 		
</form>
</body>
</html>