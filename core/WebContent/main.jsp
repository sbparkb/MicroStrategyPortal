<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>MAIN</title>
<script src="/custom/jquery.3.3.1.js"></script>
<script>
$( document ).ready(function() {	
	$('#leftMenu li').click(function(){
		var id = $(this).attr('id');
		alert(id);
	});
});
</script>
</head>
<body>
<div id="leftMenu">
<%=request.getAttribute("leftMenu")%>
</div>
</body>
</html>