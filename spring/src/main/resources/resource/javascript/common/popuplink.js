
//Method : cfOpenRemote
//Desc   : 해당 URL 위치에 새로운 창을 연다. 

function cfOpenRemote(URL){
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

	var farwindow=window.open(urlstring,winname,'top=100,left=100,width='+xpos+',height='+ypos+',scrollbars=yes,resizable=1');

}


//Method : cfOpenRemoteWithSize
//Desc   : 해당 URL 위치에 X,Y 크기로 새로운 창을 연다. 

function cfOpenRemoteWithSize(URL, xpospar, ypospar){

	var urlstring = URL;
	var winname = "_blank";
	var xpos=xpospar;
	var ypos=ypospar;

	var screenX = 0;
	var screenY = 0;

	try{
		screenX = top.window.screen.width;
		screenY = top.window.screen.height;
	}catch(e){
		screenX = window.screen.width;
		screenY = window.screen.height;
	}

	var farwindow=window.open(urlstring, winname,'top=100,left=100,width='+xpos+',height='+ypos+',scrollbars=yes,resizable=1');


}


//Method : cfOpenRemoteWithSize
//Desc   : 해당 URL 위치에 X,Y 크기로 새로운 창 스크롤 없이 을 연다.

function cfOpenRemoteWithSizeNoScroll(URL, xpospar, ypospar){
	var urlstring = URL;
	var winname = "_blank";
	var xpos=xpospar;
	var ypos=ypospar;

	var screenX = 0;
	var screenY = 0;

	try{
		screenX = top.window.screen.width;
		screenY = top.window.screen.height;
	}catch(e){
		screenX = window.screen.width;
		screenY = window.screen.height;
	}

	var farwindow=window.open(urlstring,winname,'top=100,left=100,width='+xpos+',height='+ypos+',scrollbars=no,resizable=1');

}


//Method : cfOpenRemoteWithSizeLocNoScroll
//Desc   : 해당 URL 위치에 X,Y 크기로 새로운 창을 top, left 위치에 스크롤 없이 을 연다. (Xecure사용여부)useXecure : true , false

function cfOpenRemoteWithSizeLocNoScroll(URL, xpospar, ypospar, topLoc, leftLoc){
	var urlstring = URL;
	var winname = "_blank";
	var xpos=xpospar;
	var ypos=ypospar;
	var toppos=topLoc;
	var lefpos=leftLoc;

	var screenX = 0;
	var screenY = 0;

	try{
		screenX = top.window.screen.width;
		screenY = top.window.screen.height;
	}catch(e){
		screenX = window.screen.width;
		screenY = window.screen.height;
	}

	
	var	farwindow=window.open(urlstring,winname,'top='+toppos+',left='+lefpos+',width='+xpos+',height='+ypos+',scrollbars=no,resizable=1');
}

/**
 * 포스트 방식으로 팝업을 생성 고정 타겟 사용( Post 파라미터 없음 )
 * @param url
 * @param URL
 * @param varwinname
 */
function fcOpenPopupForPost(url, width, height){
		var form = $("<form></form>");
		form.attr("action", url);
		form.attr("method", "post");
		form.attr("target", "popup");
		$("body").append(form);
//		result=popSessionCheck();
//		if(!result){
//			location.href =URL_WEB_SERVER+"/login/login.do";
//		}else{
			window.open("", "popup", "width="+width+", height="+height+", scrollbars=no ,resizeable=no, left=400, top=100");
			form.submit();
//		}
}

/**
 * 포스트 방식으로 팝업을 생성 사용자 지정 타겟 사용( Post 파라미터 없음 )
 * @param url
 * @param name
 * @param width
 * @param height
 */
function fcOpenPopupForPostDynamicName(url, name, width, height){
	var form = $("<form></form>");
	form.attr("action", url);
	form.attr("method", "post");
	form.attr("target", name);
	$("body").append(form);
//	result=popSessionCheck();
//	if(!result){
//		location.href =URL_WEB_SERVER+"/login/login.do";
//	}else{
		window.open("", name, "width="+width+", height="+height+", resizeable=no, left=400, top=100");
		form.submit();
//	}
}

/**
 * 포스트 방식으로 팝업을 생성 사용자 지정 타겟 사용 및 top, left값 사용자 입력( Post 파라미터 없음 )
 * @param url
 * @param name
 * @param width
 * @param height
 */
function fcOpenPopupForPostDynamicName(url, name, width, height, top, left){
	var form = $("<form></form>");
	form.attr("action", url);
	form.attr("method", "post");
	form.attr("target", name);
	$("body").append(form);
//	result=popSessionCheck();
//	if(!result){
//		location.href =URL_WEB_SERVER+"/login/login.do";
//	}else{
		window.open("", name, "width="+width+", height="+height+", resizeable=no, left="+left+", top="+top);
		form.submit();
//	}
}

/**
 * 포스트 방식으로 팝업 생성 및 객체형 파마리터 사용
 * params = { 'aaa':aaa, 'bbb':bbb }
 * @param url
 * @param name
 * @param width
 * @param height
 */
function fcOpenPopupForPostWithParams(url, name, width, height, params){
	var form = $("<form></form>");
	form.attr("action", url);
	form.attr("method", "post");
	form.attr("target", name);
	
	if(params){
		for(var i in params){
			form.append("<input type='hidden' name='"+i+"' value='"+params[i]+"' />");
		}
	}
	var result=popSessionCheck();
	if(!result){
		location.href =URL_WEB_SERVER+"/login/login.do";
	}else{
		$("body").append(form);
		var popup=window.open("", name, "width="+width+", height="+height+" ,resizeable=no, left="+(($(window).width() - width) / 2)+", top="+(($(window).height() - height) / 2) + ",status=no, location=no, scrollbars=1");
		form.submit();
//		popup.focus();
	}
}



//Method : cfOpenRemoteWithSizeWinnameForm
//Desc   : 해당 URL 위치에 X,Y 크기로 새로운 창을 연다.(Full Pop - win name을 넘길수 있다. (Xecure사용여부)useXecure : true , false

function fcOpenPopupForPostWithFullParams(url, name, width, height, params){
	var h=0;
	var w=0;
	var Browser = new Object(); 
	Browser.isIE = (navigator.userAgent.toLowerCase().indexOf("msie")!=-1);
	Browser.isIE_SV1 = (navigator.userAgent.toLowerCase().indexOf("sv1")!=-1);
	Browser.isIE_SV2 = (navigator.userAgent.toLowerCase().indexOf("sv2")!=-1);
	Browser.isIE_7 = (navigator.userAgent.toLowerCase().indexOf("msie 7")!=-1);
	Browser.isIE_8 = (navigator.userAgent.toLowerCase().indexOf("msie 8")!=-1);
	Browser.isIE_9 = (navigator.userAgent.toLowerCase().indexOf("msie 9")!=-1);
	Browser.ischrome = (navigator.userAgent.toLowerCase().indexOf("chrome")!=-1);
	Browser.isFirefox = (navigator.userAgent.toLowerCase().indexOf("firefox")!=-1);
	Browser.isSafari =(navigator.userAgent.toLowerCase().indexOf("safari")!=-1);
	Browser.isOpera =(navigator.userAgent.toLowerCase().indexOf("opera")!=-1);
	Browser.isNetscape =(navigator.userAgent.toLowerCase().indexOf("netscape")!=-1);


   if (Browser.isIE_SV1) { h = 50; } 
   else if(Browser.isIE_7) { h = 50; }
   else if(Browser.isIE_8) { h = 50; }
   else if(Browser.isIE_9) { h = 50; }
   else if(Browser.isEtc) { h = 50; } 
   else if(Browser.ischrome) { h = 70; } 
   else if(Browser.isFirefox) { h = 50; } 
   else if(Browser.isSafari) { h = 120; } 
   else if(Browser.isNetscape) { h = 50; }
   else if(Browser.isOpera) { h = 50; }  
   
      
   if (Browser.isIE_SV1) { w = 10; } 
   else if(Browser.isIE_7) { w = 10; }
   else if(Browser.isIE_8) { w = 10; }
   else if(Browser.isIE_9) { w = 10; }
   else if(Browser.isEtc) { w = 10; } 
   else if(Browser.ischrome) { w = 20; } 
   else if(Browser.isFirefox) { w = 10; } 
   else if(Browser.isSafari) { w = 10; } 
   else if(Browser.isNetscape) { w = 10; }
   else if(Browser.isOpera) { w = 10; }  
	var screenX = 0;
	var screenY = 0;

	try{
		screenX = screen.availWidth-w;
		screenY = screen.availHeight-h;
	}catch(e){
		screenX = screen.availWidth-w;
		screenY = screen.availHeight-h;
	}
	var form = $("<form></form>");
	form.attr("action", url);
	form.attr("method", "post");
	form.attr("target", name);
	
	if(params){
		for(var i in params){
			form.append("<input type='hidden' name='"+i+"' value='"+params[i]+"' />");
		}
	}
	
	$("body").append(form);
//	result=popSessionCheck();
//	if(!result){
//		location.href =URL_WEB_SERVER+"/login/login.do";
//	}else{
		var popup=window.open("", name, "width="+screenX+", height="+screenY+" ,resizeable=0, left=0, top=0");
		form.submit();
		popup.focus();
//	}
}

//Method : cfOpenRemoteWithSizeWinname
//Desc   : 해당 URL 위치에 X,Y 크기로 새로운 창을 연다. - win name을 넘길수 있다. (Xecure사용여부)useXecure : true , false

function cfOpenRemoteWithSizeWinname(URL, varwinname, xpospar, ypospar){
	var urlstring = URL;
	var winname = varwinname;
	var xpos=xpospar;
	var ypos=ypospar;

	var screenX = 0;
	var screenY = 0;

	try{
		screenX = top.window.screen.width;
		screenY = top.window.screen.height;
	}catch(e){
		screenX = window.screen.width;
		screenY = window.screen.height;
	}

	var farwindow=window.open(urlstring,winname,'top=100,left=100,width='+xpos+',height='+ypos+',resizable=1');

}



//Method : cfOpenRemoteWithSizeWinnameNoScroll
//Desc   : 해당 URL 위치에 X,Y 크기로 새로운 창을 연다. - win name을 넘길수 있다. (Xecure사용여부)useXecure : true , false

function cfOpenRemoteWithSizeWinnameNoScroll(URL, varwinname, xpospar, ypospar){
	var urlstring = URL;
	var winname = varwinname;
	var xpos=xpospar;
	var ypos=ypospar;

	var screenX = 0;
	var screenY = 0;

	try{
		screenX = top.window.screen.width;
		screenY = top.window.screen.height;
	}catch(e){
		screenX = window.screen.width;
		screenY = window.screen.height;
	}

	
	var farwindow=window.open(urlstring,winname,'top=100,left=100,width='+xpos+',height='+ypos+',scrollbars=no,resizable=0');

}


//Method : cfOpenCalendarPopUp
//Desc   : 달력 Popup용 메소드

function cfOpenCalendarPopUp(NameOfTxt){

	var winname = "CalendarPopUp";
	var URL = "/sys/jsp/calendar.jsp";
	var urlstring = URL + "?nameOfTxt=" + NameOfTxt;
	var varLeft = varLeft;
	var varTop = varTop;

//	위치를 지정한다.
	var varTop  = eval(window.screenTop + window.event.clientY);
	var varLeft = eval(window.screenLeft + window.event.clientX);
	var left = window.event.clientX;

//	팝업위치가 오른쪽으로 너무많이 치우치지 X
	if(left > 570) {
		varLeft = varLeft - 240;
	}
	var farwindow=window.open(urlstring,winname,"toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=no,resizable=yes,width=230,height=197, left=" + varLeft +", top=" + varTop +"");

	farwindow.focus();
}


//Method : cfOpenCalendarYearMonPopUp
//Desc   : 달력 Popup용 메소드

function cfOpenCalendarYearMonPopUp(NameOfTxt){

	var winname = "CalendarYearMonPopUp";
	var URL = "/sys/jsp/calendarYearMon.jsp";
	var urlstring = URL + "?nameOfTxt=" + NameOfTxt;
	var varLeft = varLeft;
	var varTop = varTop;

//	위치를 지정한다.
	var varTop  = eval(window.screenTop + window.event.clientY);
	var varLeft = eval(window.screenLeft + window.event.clientX);
	var left = window.event.clientX;

//	팝업위치가 오른쪽으로 너무많이 치우치지 X
	if(left > 570) {
		varLeft = varLeft - 240;
	}
	var farwindow=window.open(urlstring,winname,"toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=no,resizable=yes,width=230,height=197, left=" + varLeft +", top=" + varTop +"");

	farwindow.focus();
}
//////////////////////////////////////
// Method : openAjax
// Desc   : Ajax 동적 웹페이지 요청
//////////////////////////////////////
function openAjax (url, params) {
    var oReq = new ActiveXObject("Microsoft.XMLHTTP");
    oReq.open("GET", url, false);
    oReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; enctype=multipart/form-data; charset=UTF-8');

    oReq.send(params.replace(/\+/g, '%2B'));
    var data = oReq.responseText;
    delete oReq;

    if (data.indexOf('Exception') > -1) {
    	// 서버 처리중 오류가 발생하였습니다.
    	alert(POPUP_LINK_MSG_001);
    }
    return data;
}


//////////////////////////////////////////////////////////
// Method : cfOpenRemoteOption
// Desc   : 해당 URL 위치에 새로운 창을 연다. 
// Option : scrollYn := 1 (Yes), 0 (No) , resizeYn := 1 (Yes), 0 (No)
//////////////////////////////////////////////////////////
function cfOpenRemoteOption( URL, varwinname, xpospar, ypospar, scrollYn, resizeYn ) {
    var urlstring   = URL;
    var winname     = varwinname;
    var xpos        = xpospar;
    var ypos        = ypospar;

    var scroll      = scrollYn;
    var resize      = resizeYn;

    var screenX     = 0;
    var screenY     = 0;

    try {
        screenX = top.window.screen.width;
        screenY = top.window.screen.height;
    } catch( e ) {
        screenX = window.screen.width;
        screenY = window.screen.height;
    }
    
    var winPosLeft = (screenX - xpos ) / 2;
    var winPosTop = (screenY - ypos) / 2;

    var farwindow = window.open( urlstring, winname, 'toolbar=0,location=0,directories=0,status=0,menubar=0,top='+winPosTop+',left='+winPosLeft+',width='+xpos+',height='+ypos+',scrollbars='+scroll+',resizable='+resize+'');

    farwindow.focus();
}



//팝업창을 화면 가운데 띄운다.
//상품 서비스 소개 페이지를 위해
//url : url
//popupname : 팝업 윈도우명
//x : width
//y : height
//scroll : 화면 scroll 여부( 'yes','no' )
//resize : 화면 resize 여부( 'yes','no' )
function popUp(url, popupname,x,y,scroll,resize)
{
 window.open(url,popupname,"toolbar=no,width="+x+",height="+y+ ",top="+ (screen.availheight- y )/2+",left="+(screen.availwidth- x)/2 +",directories=no,status=no,scrollbars="+scroll+",resizable="+resize+",menubar=no");
}



function setWindowResize(popup) {
	 var thisX = parseInt(document.getElementById(popup).scrollWidth,10);
	 var thisY = parseInt(document.getElementById(popup).scrollHeight,10);
	 
	 var maxThisX = screen.width - 50;
	 var maxThisY = screen.height - 50;
	 var marginY = 0;
	 // 브라우저별 높이 조절. (표준 창 하에서 조절해 주십시오.)
	 if (navigator.userAgent.indexOf("MSIE 6") > 0) {
		 marginY = 45;        // IE 6.x
	 }
	 else if(navigator.userAgent.indexOf("MSIE 7") > 0) {
		 marginY = 75;    // IE 7.x
	 }
	 else if(navigator.userAgent.indexOf("MSIE 9") > 0) {
		 marginY = 80;    // IE 9.x
	 }
	 else if(navigator.userAgent.indexOf("Firefox") > 0) {
		 marginY = 80;   // FF     => 원래는 50 이었는데 해보니 안돼서 임의로 변경해보았다 ㅡㅡ;;
	 }
	 else if(navigator.userAgent.indexOf("Opera") > 0) {
		 marginY = 30;     // Opera
	 }
	 else if(navigator.userAgent.indexOf("Chrome") > 0) {
		 marginY = 70;     // Chrome
	 }
	 else if(navigator.userAgent.indexOf("Netscape") > 0) {
		 marginY = -2;  // Netscape
	 }

	 if (thisX > maxThisX) {
	  window.document.body.scroll = "yes";
	  thisX = maxThisX;
	 }
	 if (thisY > maxThisY - marginY) {
	  window.document.body.scroll = "yes";
	  thisX += 19;
	  thisY = maxThisY - marginY;
	 }

	 var windowX = (screen.width - (thisX+10))/2;
	 var windowY = (screen.height - (thisY+marginY))/2 - 20;
	}


