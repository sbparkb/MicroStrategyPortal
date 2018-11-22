<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ page import="javax.servlet.http.HttpSession" %>
<%@ page import="java.util.Locale" %>

<%@ page import="com.mstr.business.model.*" %>
<%@ page import="com.groto.cmm.util.SystemMessage" %>
<%@ page import="com.groto.cmm.util.StringUtil" %>
<%@ page import="java.util.*" %>
 
<%@ page import="com.groto.cmm.util.CmmUtil"%>
<%@ page import="com.microstrategy.webapi.EnumDSSXMLObjectTypes"%>
<%@ page import="com.groto.session.MSTRSessionUserImpl"%>
<%@ taglib prefix="sep" uri="/sepMstrTL.tld"%>
<%
	response.setHeader("P3P","CP='CAO PSA CONi OTR OUR DEM ONL'");

	String contextRoot = request.getContextPath();
	String contextDoc = contextRoot + "/resource";
	Locale locale	= (Locale) request.getAttribute("locale");
	
	String maxTabCnt = SystemMessage.getMessage("mstr.config.maxTabCnt");
	
 
	String reportId 			= "";
	String viewType				= "";
	String subsidiaryType		= "";

	
	String context 				= request.getContextPath();
	
	
	String objectID				= StringUtil.escapeHtmlString( (String) request.getParameter( "objectID" ) );
	String subType				= StringUtil.escapeHtmlString( (String) request.getParameter( "subType" ) );
	String isShortcut			= StringUtil.escapeHtmlString( (String) request.getParameter( "isShortcut" ) );
	String sessionid			= (String) request.getSession().getAttribute( "usrSmgr" );
	int displayUnitType			= 0;
	try{
		if("true".equals(isShortcut)){
			objectID				= StringUtil.escapeHtmlString( (String) request.getParameter( "targetId" ));
			subType					= StringUtil.escapeHtmlString( (String) request.getParameter( "targetsubType" ));
			displayUnitType			= Integer.parseInt((String) request.getParameter( "targetType" ));
		}else{
			displayUnitType			= Integer.parseInt((String) request.getParameter( "displayUnitType" ));
		}
 
		
	}catch(Exception e){
		e.printStackTrace();
	}
	
	String txtCheckAll		= "CheckAll";
	String txtUncheckAll	= "UncheckAll";
	String txtNoneSelected = "Select options";
	String txtSearch		= "search";
	String txtSelected     = "# selected";
	
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" type="text/css" href="../df/css/styles.css" />
<jsp:include page="/WEB-INF/views/mstr/common/common_df.jsp" />
<link rel="shortcut icon" href="/favicon/favicon.ico"/>

<script type="text/javascript" src="../df/js/jquery-1.11.3.min.js"></script>
<script type="text/javascript" src="../df/js/common.js"></script>
<script src="<%=contextDoc %>/javascript/tabFrame_df.js"></script>

<script type="text/javascript" src="../df/js/jquery-1.7.2.js"></script>
<script type="text/javascript" src="../df/js/jquery-ui.min.js"></script>
<script type="text/javascript" src="../df/js/jquery.easing.1.3.js"></script>
<script type="text/javascript" src="../df/js/jquery.mousewheel.min.js"></script>

<script type="text/javascript">
 
//리포트 클릭시 처리
function ftn_linkReport2 (id,type,subType, isShortcut, targetId, targetType, targetsubType, name, execType)
{	
	if(name == "")  {
	    name = "Start Page";
	}
	var msg = ftn_CreateTab(id, name);
	
	if(msg != "" ) {
		alert(msg);
		return;
	}
	
	$('div.lnb li li a.on').removeClass('on');
	$('div.lnb li li[id='+id+'] a').addClass('on');
	
	var onMenu = $('div.lnb li li a.on');
	var onMenuTxt = onMenu.text();	
	
	var parentMenu = onMenu.parent().parent().parent().children('a');
	var parentMenuTxt = parentMenu.text();
	
	var path = parentMenuTxt + ' > ' + onMenuTxt;

	var form		= $("<form name='tab" +id+ "' method='post'></form>");
	form.attr("action", "<spring:message code='URL.WEB.SERVER' />/service/reportDetail_df.do");
	form.attr("method", "post");
	form.attr("target", ""+id);
	form.append("<input type='hidden' name='objectID' value='"+id+"' />");
	form.append("<input type='hidden' name='displayUnitType' value='"+type+"' />");
	form.append("<input type='hidden' name='subType' value='"+subType+"' />");
	form.append("<input type='hidden' name='isShortcut' value='"+isShortcut+"' />");
	form.append("<input type='hidden' name='targetId' value='"+targetId+"' />");
	form.append("<input type='hidden' name='targetType' value='"+targetType+"' />");
	form.append("<input type='hidden' name='targetsubType' value='"+targetsubType+"' />");
	form.append("<input type='hidden' name='execType' value='"+execType+"' />");
	form.append("<input type='hidden' name='path' value='"+path+"' />");
	$("body").append(form);
	form.submit();
	$('form[name=tab'+ id+']').remove();
// 	location.href  = "<spring:message code='URL.WEB.SERVER' />/service/mstrView.do?objectID="+id+"&displayUnitType="+type+"&subType="+subType;
}

// 공지사항용 탭
function ftn_linkReport_notice ()
{
	var id = "notice";
	var name = "공지사항";
	var msg = ftn_CreateTab(id, name);
	
	if(msg != "" ) {
		alert(msg);
		return;
	}
	
	var form		= $("<form name='tab" +id+ "'></form>");
		form.attr("action", "<spring:message code='URL.WEB.SERVER' />/service/bbs/bbsList.do");
		form.attr("method", "post");
		form.attr("target", ""+id);
		form.append("<input type='hidden' name='objectID' value='"+id+"' />");
		form.append("<input type='hidden' name='bbsId' value='${CmmCode.BBS_ID_BBS00001.key}' />")

		$("body").append(form);
		form.submit();
		$('form[name=tab'+ id+']').remove();

}
 
function ftn_CreateTab(sId, title, addStyle) {
		/**
		 * 탭 실행 
		 * body 프레임의 탭이 활성화되어 있는지 체크한다.
		 * tab 개수가 0개이면, tab 영역을 display 하고 첫번째 탭을 추가한다.
		 */				
		//var title = leftMenu.text();
		
		var rtnMsg = "";
		var hint = title; 
		if(title.length > 11){
			title = title.substring(0,11)+'..';
		}
		//var sId = leftMenu.attr('id');
		//var execUrl = "execute.do?sId="+sId;				
		//var cls = leftMenu.attr('data-type');
 
		
		var varHtml1;				
		//varHtml1 = '<li class="mouse_on" id="'+sId+'" name="'+sId+'" onClick="toggleTab(this)"><a class="tab">'; 	
		//varHtml1 += title+'</a> <span class="tab_close" onClick="closeTab(this);"><a href="#">닫기</a></span> ';
		
		////varHtml1 += '<div class="tap_menu hide"><h2>탭메뉴</h2><dl><dd><a id="closeOther" href="javascript:closeOther();">다른 탭 닫기</a></dd><dd class="border_none"><a id="closeAll" href="javascript:closeAll();">모든 탭 닫기</a></dd></dl></div>';
		
		//varHtml1 += '</li>';
				
		varHtml1 = '<li id="'+sId+'" name="'+sId+'"><span class="on"><a href="#" onClick="toggleTab(this)">'; 
		varHtml1 += title+'</a></span><a href="#" class="btnClose" onClick="closeTab(this);"></a></li>';
		

		
		var style2= "border:0;";
		var varHtml2 = "";		
		
		if( addStyle != null && addStyle != "") {
		    style2= style2 + addStyle;
		} else {
		    style2= style2 + "width:100%;height:100%;";
		}
		var scroll = 'scrolling="no"';
		if(title == "공지사항"){
		    scroll = 'scrolling="yes"';
		}
		varHtml2 = '<iframe name="'+sId+'" id="'+sId+'" frameBorder="0px; " '+ scroll+'  style="' +style2+ '" >';  //min-height:775px;
		varHtml2 += '</iframe>';
		
		var maxLen = Number('<%=maxTabCnt%>'); //탭 최대 실행개수

		$('#backImg').css('display', 'none');
		$('#contentwrap').css('display', 'block');
		
		/***상단 탭 버튼 ***/
		var tab =  document;
		var strip =  $('#tabstrip',tab);			
		
		var redupCnt = $('#tabstrip li[id="'+sId+'"]',tab).length; //중복카운트
		
		//alert(redupCnt);
		
		var curLen = $('#tabstrip li',tab).length;
		if((curLen-redupCnt) > (maxLen-1)){
			rtnMsg = '최대 탭의 개수는 ' + maxLen + '개 입니다.';
			return rtnMsg; 
		}	
				
 		// 전체 tab disable
		$('#tabstrip li span',tab).removeClass('on');
		
		if(redupCnt > 0){					
			$('#tabstrip li[id="'+sId+'"] span',tab).addClass('on');
 			
			$('#tabstrip li[id="'+sId+'"] a.btnClose',tab).show();	
			$('#tabstrip li[id="'+sId+'"]',tab).removeClass('hide');
			
			var tabCnt = $('#tabstrip li:not(.hide)',tab).size();
			if(tabCnt > 8){						
				var lastId = $('#tabstrip li:not(.hide)',tab).last().attr('id'); 
				if(lastId == sId){
					$('#tabstrip li:not(.hide)',tab).first().addClass('hide');
				}else{
					$('#tabstrip li:not(.hide)',tab).last().addClass('hide');

				}						
			}
			$('iframe', "#mainFrame").hide();	
			$('iframe[name=' +sId+ ']', "#mainFrame").show();
			rtnMsg = '이미 열려있는 레포트가 있습니다.';
			if(title == "공지사항"){
				rtnMsg = '이미 열려있습니다.';  
			}
			
		}else{					
			strip.append(varHtml1);		
 
			//탭 5개 초과시 숨김 
			var tabCnt = $('#tabstrip li',tab).size();
			if(tabCnt > 8){
				var hideTab = tabCnt - 8; 
				$('#tabstrip li:lt('+hideTab+')',tab).addClass('hide');
			}	
			
			$('iframe', "#mainFrame").hide();	
			$("#mainFrame").append(varHtml2);
		}
 
		return rtnMsg;
}

//현재 탭 종료 - 자식 창에서 탭 종료할 때 사용
function exitTab(){
	closeTab($('#tabstrip li .on'));	
}
 
</script>


<style>
	.tabwrap li.hide {display:none;}
</style>
</head>

<body>
    <div class="ui_wrap" >
 
 
		<jsp:include page="/WEB-INF/views/mstr/common/leftMenu_df.jsp"/>
    
       <div class="containerwrap close">
       
     
       <div id="backImg"  style="background:#D3D1D2;height:100%">
       		<p align="left"><img src='../df/images/back02.png' /></p>
       </div>
       
         <!--- 닫힐때 open 적용/ 열릴때 close 적용 --->
   		<p class="arrow_l"><a href="#" onclick="aopen();"></a></p>
			
			<!------- //content start  ------->
			<div class="contentwrap"  id="contentwrap" style="display:none;">
				 
				<!-- tab//  -->
				<div class="tabwrap" style="border-bottom:1px solid #CFCFCF;">
					<ul id="tabstrip"> 					
					</ul>				
					<p class="rightBtn"><a href="#" onclick="prev();"><img src="../df/images/ico_arrow_prev.png" alt=""></a><a href="#" onclick="next();"><img src="../df/images/ico_arrow_next.png" alt=""></a></p>	
				</div>
				<!-- //tab  -->
 
 		<div id="mainFrame" style="background:#fff;height:99%;">   <!-- overflow: hidden; margin-top:34px;-->   
		</div>	
 
				 
			</div>
			<!------- content end//  ------->
			
        </div>
        <!------------------------- //contents  --------------------------->
	</div>


</body>
</html>
