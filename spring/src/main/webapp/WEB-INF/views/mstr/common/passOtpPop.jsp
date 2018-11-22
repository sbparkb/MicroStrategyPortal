<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.util.*" %>
<%@ page import="com.mstr.business.model.*" %>
<%@ page import="com.groto.cmm.util.StringUtil" %>
<%@ taglib prefix="sep" uri="/sepMstrTL.tld"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<%
String contextRoot = request.getContextPath();
String contextDoc = contextRoot + "/resource";
 
 
%>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<meta http-equiv="Pragma" content="no-cache"/>
<meta http-equiv="Cache-Control" content="No-Cache"/>
<meta charset="utf-8">
<meta http-equiv="imagetoolbar" content="no">
<meta name='viewport' content='width=device-width, initial-scale=1'>
<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
<!--[if lt IE 9]>
	<script src="<%=contextDoc %>/javascript/html5shiv.js"></script>
<![endif]-->
<script type="text/javascript" src="<%=contextDoc %>/javascript/jquery.min.js"></script>
	<script type="text/javascript" src="<%=contextDoc %>/javascript/jquery-ui.js"></script>
<script src="<%=contextDoc %>/javascript/jquery-ui-1.9.2.custom.min.js"></script>
<title><spring:message code='BROWSER.TITLE' /></title>
<style>
html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, font, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center,
dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td {margin:0; border:0; padding:0;}
body { font-family:'Malgun Gothic','돋움',Dotum; line-height:18px; font-size:13px; color:#333; word-break:break-all; }
ol, ul { list-style:none; }
button { }
.hidden, legend, caption { width:0; height:0; line-height:0; font-size:0px; float:left; position:absolute; visibility:hidden; overflow:hidden; display:none; }
p { }
strong{ font-weight:bold; }
address { font-style:normal; }
img { vertical-align:middle; }

html, body { height:100%; min-height:100%; }

#wrap { height:auto; position:relative; *zoom:1; }
#wrap:after { content:""; display:block; clear:both; }
#passchg-wrap { position:absolute; margin: 0px 100px;  top:0; width:362px; background:#fff; }

 
#chg-form { width:354px; margin:70px auto; }
.login-box {  }
.login-box input { border:0; margin:2px 0; }
.login-box input[type="text"] { width:286px; height:50px; padding-left:68px; background:url(<%=contextDoc%>/images/login/login_idbg.png) left top no-repeat; }
.login-box input[type="password"] { width:286px; height:50px; padding-left:68px; background:url(<%=contextDoc%>/images/login/login_pwbg.png) left top no-repeat; }
.login-box input[type="submit"] { margin-top:10px; cursor:pointer; width:354px; height:60px; font-size:0; background:url(<%=contextDoc%>/images/login/btn_login.png) left top no-repeat; }
.login-box .btn-pwreset { text-align:right; margin-top:8px; }

.login-txt { position:absolute; left:34px; bottom:24px; }
.login-txt p { font-size:11px; color:#a0a0a0; line-height:24px; }
	.login-box .btn-otp { width:100px; height:50px; line-height:30px; color:#fff; border:0; font-size:12px; cursor:pointer; background:#0977c9; -webkit-border-radius:6px; -moz-border-radius:6px; border-radius:6px; }

	.login-box .btn-area { position:absolute; left:31px;  /* top:380px; */ bottom:10px; margin:0 auto; }
	.login-box .btn-area .btn-complete { width:134px; height:40px; line-height:30px; color:#fff; border:0; font-size:12px; cursor:pointer; background:#3b3b3b; -webkit-border-radius:6px; -moz-border-radius:6px; border-radius:6px; }
	.login-box .btn-area .btn-cancel { width:134px; height:40px; line-height:30px; color:#fff; border:0; font-size:12px; cursor:pointer; background:#3b3b3b; -webkit-border-radius:6px; -moz-border-radius:6px; border-radius:6px; }
#copy { width:100%; position:absolute; left:0; top:32px; text-align:center; color:#6a6a6a; }
#copy .copyright { margin-top:4px; font-size:11px; color:#999; }
#copy .copyright span { color:#e2231a; }
	
</style>
<style type="text/css">
html {
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
<script type="text/javascript">
 
	function fncCallSms(){
		var userid			= $("#userid").val();
		
		if(userid == null || userid == ""){
			alert("유저 아이디를 입력해 주세요.");
			$("#userid").focus();
			return false;
		}
		
		$("#portalId").val(userid);
		
		var ajaxInfo		= {
				"url"		: "<spring:message code='URL.WEB.SERVER' />/login/passSendOtpSms.do"
				, "dataType": "json"
				, "data"	: {
					"portalId" : $("#portalId").val()
				}
		}
		

		$.ajax(ajaxInfo).done(function(data){
			if(data.result == "success"){
			    $("#callSms").val(data.result);
			    alert('발송했습니다.');
			    return false;
			}else{
				alert(data.message);
				return false;
			}
		});
		
		
		return false;
		
	}
 

	function fncNowPassChk	(){
	    
	    
		var userid			= $("#userid").val();
		if(userid == null || userid == ""){
			alert("유저 아이디를 입력해 주세요.");
			$("#userid").focus();
			return false;
		}
		
		var checkNo			= $("#checkNo").val();
		if(checkNo == null || checkNo == ""){
			alert("인증번호를 입력해 주세요.");
			$("#checkNo").focus();
			return  false;
		}
	 
		var callSms			= $("#callSms").val();
		if(callSms == null || callSms == ""){
			alert("인증번호 발송 후 확인해 주세요.");
			return  false;
		}
		
		var cssModForm  = document.forms.cssModForm;
		cssModForm.action= "<spring:message code='URL.WEB.SERVER' />/login/passOtpCheck.do";
		cssModForm.submit();
 
	}
	 
</script>
</head>
<body>
<!-- login page 에서  --> 
<div id="wrap">
	<div id="passchg-wrap">
	
		<div id="chg-form">
		<div id="copy">
			<p> 인증 후 비밀번호를 변경하십시오.(제한시간:3분)</p>
		</div>	
			<div class="login-box">
				<form id="cssModForm" name="cssModForm" method="post" >
					<dl>
						<dt>유저 아이디</dt>
						<dd><input type="text" name="userid" id="userid" value="${(not empty portalId ? portalId : param.portalId)  }"
							 style="width:180px;"/>&nbsp;<button id="okay" class="btn-otp"  onclick="return fncCallSms();">인증번호 발송</button></dd>
	
						<dt>인증번호</dt>
						<dd><input type="password" name="checkNo" id="checkNo" value="" /></dd>
					</dl>
					<input type="hidden" name="portalId" id="portalId" value="${(not empty portalId ? portalId : param.portalId)  }"/>
					<input type="hidden" name="callSms"  id="callSms"  value=""/>
				</form>
				<div class="btn-area" >
					<button id="okay"   class="btn-complete"  onclick="fncNowPassChk();">확인</button>
					<button id="cancle" class="btn-cancel"  onclick="window.close();window.parent.parent.dialogClose();">취소</button>
			     </div>
			</div>
		</div>
 
	</div>
	
</div>
</body>
</html>