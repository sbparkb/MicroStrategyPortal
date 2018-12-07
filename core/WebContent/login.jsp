<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.microstrategy.web.objects.*"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Custom Login Page</title>
</head>
<body>
	<h1>Custom Login</h1>
	<form id="login" action="/servlet/mstrWeb?evt=3054" method="post">		
		<label for="Uid">User name:</label> 
			<input value="" type="text" class="txt" name="Uid" id="Uid" />
		<label for="Pwd">Password:</label> 
			<input type="password" class="txt" name="Pwd" id="Pwd" /> 
			<input value="1" type="hidden" name="ConnMode" id="ConnMode" /> 
			<input value="Login" type="submit" class="btn" name="3054" id="3054" />
		<input type='hidden' name='loginPage'value='loginpage'> 
		<input type="hidden" name="Server" id="Server" value="JUNE-PC"/>
		<input type="hidden" name="Project" id="Project" value="MicroStrategy Tutorial"/> 			
	</form>
</body>
</html>