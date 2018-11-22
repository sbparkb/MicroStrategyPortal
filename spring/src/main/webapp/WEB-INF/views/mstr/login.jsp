<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="spring"    uri="http://www.springframework.org/tags" %>
<%
	response.setHeader("P3P", "CP='CAO PSA CONi OTR OUR DEM ONL'");
	String contextRoot = request.getContextPath();
	String contextDoc = contextRoot + "/resource";

	request.setAttribute("isBiWeb", "Y");
%>
 
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8" />
<link rel="shortcut icon" href="/favicon/favicon.ico">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<link rel="stylesheet" type="text/css" href="../df/css/styles.css" />
<title><spring:message code='BROWSER.TITLE' /></title>


<style type="text/css">
img { outline: none; }
.idpwBtn { outline: none; }
.ui-button{ outline: none; }
.dimdBg { display:none; position:absolute; top:0; left:0; width:100%; background:url(<%=contextDoc %>/images/login/layer_ppbg.png) left top repeat; z-index:900; }
#layer-pw { display:none; position:absolute; z-index:900; }
#layer-pw .alert-pw { position:relative; width:300px; height:216px; background:#fff; }
#layer-pw .alert-pw h4 { font-size:20px; line-height:24px; padding:12px 20px; color:#282828; border-bottom:2px solid #282828; }
#layer-pw .alert-pw p { padding:46px 20px; border-bottom:1px solid #efefef; }
#layer-pw .alert-pw a#btn-complete { display:block; width:80px; height:30px; line-height:30px; margin:12px auto 0; color:#fff; background:#282828; text-align:center; text-decoration:none; }
#layer-pw .alert-pw a#btn-close { position:absolute; right:16px; top:16px; display:block; width:17px; height:17px; background:url(<%=contextDoc %>/images/login/btn_close.png) left top no-repeat; }
</style>


<link rel="stylesheet" type="text/css" href="<%=contextDoc %>/css/jquery-ui.css" />

<script type="text/javascript" src="<%=contextDoc %>/javascript/jquery.min.js"></script>
<script type="text/javascript" src="<%=contextDoc %>/javascript/jquery-ui.js"></script>
<script src="<%=contextDoc %>/javascript/jquery-ui-1.9.2.custom.min.js"></script>

<script  type="text/javascript" >
	
	$(document).ready(function(){
	 
	    var left_pos = ( $(window).scrollLeft() + ($(window).width() - $("#layer-pw").width()) / 2 );
	    var top_pos = ( $(window).scrollTop() + ($(window).height() - $("#layer-pw").height()) / 2 );
	
	
	    var curMgnb = false;
	    $("#userID").focus();
	 
		// frame check
		if ( self != top ) {
			//alert('iframe');
			window.top.location.replace(window.location);
		}
	
		$("#passwd").bind("keyup", function(e) {
			if(e.keyCode == 13) {
				//Enter Key
				goLogin();
				return false;
			}
		});
		
		$(window).resize(function(){
	//		$("#vi-wrap").height($(window).height());
	//		$("#login-wrap").height($(window).height());
			$(".dimdBg").height($(document).height());
		});
		
		$(".layer-close").click(function(){
			if(curMgnb == true){
				$(".dimdBg").stop().fadeOut(250);
				$("#layer-pw").stop().fadeOut(250);
				curMgnb = false;
			}
		});
	 
		$(window).trigger("resize");
		
		if("${params.result}" != ""){
	 
			if("${params.result}" == "1"){
	 
				popBox();
		 
			}else{
	 
				//cfOpen("<spring:message code='URL.WEB.SERVER' />/login/passModPop.do?portalId=${params.portalId}");
			}
			
		}	
		
		function popBox() {
		    if(curMgnb == false){
			 
				$(".dimdBg").stop().fadeIn(250);
				$("#layer-pw").stop().fadeIn(250);
				$("#layer-pw").css({"left":left_pos, "top":top_pos});
				curMgnb = true;
			}
		}
	});
	  
	
	function goLogin() {
	
		var loginForm  = document.forms.loginForm;
		if(loginForm.userID.value == ""){
			alert("아이디를 입력 하세요!!");
			return false;
		}
	
		loginForm.action= "./loginPrc.do";
		loginForm.submit();
	}
	
	
	/**
	* 포스트 방식으로 팝업 생성 및 객체형 파마리터 사용
	* params = { 'aaa':aaa, 'bbb':bbb }
	* @param url
	* @param name
	* @param width
	* @param height
	*/
	function fcOpenPopup(url, name, width, height, params){
		var form = $("<form></form>");
		form.attr("action", url);
		form.attr("method", "post");
		form.attr("target", name);
		
		if(params){
			for(i in params){
				form.append("<input type='hidden' name='"+i+"' value='"+params[i]+"' />");
			}
		}
		$("body").append(form);
		var popup=window.open("", name, "width="+width+", height="+height+" ,resizeable=no, left="+(($(window).width() - width) / 2)+", top="+(($(window).height() - height) / 2) + ",status=no, location=no, scrollbars=1");
		form.submit();
	}
	
	function cfOpen(URL){
		var urlstring = URL;
		var winname = "_blank";
		var xpos=750;
		var ypos=500;
	
		var screenX = 0;
		var screenY = 0;
	
		try{
			screenX = top.window.screen.width;
			screenY = top.window.screen.height;
		}catch(e){
			screenX = window.screen.width;
			screenY = window.screen.height;
		}
	
		farwindow=window.open(urlstring,winname,'top=100,left=100,width=560,height=460,scrollbars=no,resizable=no');
	}

	var _dialog;
	//비밀번호 변경 팝업 호출
	var fncCallPassModPop		= function(){

	    var iframe = $('<iframe frameborder="0" marginwidth="0" marginheight="0" allowfullscreen></iframe>');
	    _dialog =  $("<div></div>").append(iframe).appendTo("body").dialog({
		    autoOpen: false,
		    modal: true,
		    resizable: false,
		    width: "auto",
		    height: "auto",
		    close: function () {
		        iframe.attr("src", "");
		    }
		});
		
		iframe.attr({
		    width: 560,
		    height: 300,
		    src: "/login/passOtpPop.do?portalId="+$('#userID').val()
		});
		
		_dialog.dialog("option", "title", "비밀번호 초기화").dialog("open");
	}
	
	function dialogClose() {  //called from inside iframe, but with the parent's scope (see below)
		_dialog.dialog("close");
		return false;
	}
</script>
</head>

<body class="bg_login">

	<h1><img src="../df/images/login_logo.png" alt="" style="display:none;"></h1>
	
	<form name="loginForm" id="loginForm" method="post" >
	<div class="login_wrap">
		<p class="tl"><span></span><img src="../df/images/login_tl.png" alt=""></p>
			<div class="login">
				<input type="text" id="userID" class="id" placeholder="userid"  name="mstrUserID" >
				<input type="password" id="passwd"  class="pass" placeholder="password" name="mstrUserPW"  >
				<input type="button" id="" value="LOGIN" class="loginBtn" onClick="goLogin();" style="cursor:pointer">
				<div class="idpw_box" style="display:block">
					<p>Forgot ID / Password?</p><a href="javascript:fncCallPassModPop();" class="idpwBtn">Init Password</a>
				</div>	
		</div>
	</div>
	</form>
	
 	<!-- 비밀번호 알림 -->
	<div class="dimdBg"></div>
	<div id="layer-pw">
		<div class="alert-pw">
			<h4>알림</h4>
			<p>${params.message}</p> 
			<a href="javascript:" class="layer-close" id="btn-complete">확인</a>
			<a href="javascript:" class="layer-close" id="btn-close"></a>
		</div>
	</div>
	
</body>
</html>
