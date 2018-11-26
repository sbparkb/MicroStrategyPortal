/**
 * 
 */
function reportSearch(){
		var searchText			= $("#searchText").val();
		if(searchText == "" || searchText.length < 2){
			alert("검색어를 2자이상 입력 하세요.");
			return false;
		}
		
	    var msg = ftn_CreateTab("searchreport", "리포트 검색");
	    
		var form		= $("<form></form>");
		form.attr("action", URL_WEB_SERVER + "/service/searchReportList.do");
		form.attr("method", "post");
		form.attr("target", "searchreport");
		form.append("<input type='hidden' name='searchText' value='"+searchText+"' />");
		$("body").append(form);
		form.submit();
	}

	// 레포츠 검색에서 left menu search 후 click 처리 
	function ftn_linkReportSearch(selObj){
	    
 		  $( "#menu" ).accordion();
		  var ullDoms = $("#menu").find(".submenu");
		  ullDoms.each(function(idx, data){
			  if($(this).css("display") == 'block'){
				  $(this).css("display", "none");
			  } 
		});
		  var dlDoms			= $("#menu").find("li");
		  var res = selObj.split("|"); 
		  
		  dlDoms.each(function(idx, data){
			  for(var i = 0; i < res.length; i++){
				  if(this.id == res[i]){
					  this.click();
					  break;
				  }
			  }			
		});
	}
 
	 
	function setHeight() {
		
		if(mainYn == 'Y'){
			var windowHeight = $(window).innerHeight() - 54;
			$('#container-wrap').css('min-height', windowHeight);
			$('#sidemenu').css('min-height', windowHeight);
		}else{
			var windowHeight = $(window).innerHeight() - 88;
			$('#container-wrap').css('min-height', windowHeight);
			$('#sidemenu').css('min-height', windowHeight + 34);			
		}
	}
	 	 
	// 대시보드 클릭시 처리
	function ftn_link (id,type,subType)
	{	
		var form = $("<form></form>");
		form.attr("action", URL_WEB_SERVER + "/service/mstrView.do");
		form.attr("method", "post");
		form.append("<input type='hidden' name='objectID' value='"+id+"' />");
		form.append("<input type='hidden' name='displayUnitType' value='"+type+"' />");
		form.append("<input type='hidden' name='subType' value='"+subType+"' />");
		$("body").append(form);
		form.submit();
	}
		 
	function fncPopNotice_tab(){
	    // tab으로 공지사항 열기
	    ftn_linkReport_notice();	
	}
	
	function fncPopNotice(){
		 var form = $("<form></form>");
		 var url = URL_WEB_SERVER + "/service/bbs/bbsList.do";
		 window.open("" ,"popNotice", "toolbar=no, width=1024, height=768, directories=no, status=no, location=no,    scrollbars=yes, resizable=yes"); 
		 form.attr("action", url);
		 form.append("<input type='hidden' name='bbsId' value='"+bbsId+"' />");
		 form.attr("method", "post");
		 form.attr("target", "popNotice");
		 $("body").append(form);
		 form.submit();		
	}
	 
	//엑셀 업로드 
	function fncPopUpload(){
	    
		if(isExcelAuth == 'false'){
			alert('권한이 없습니다.');
	    	return
		}else{
			 var form = $("<form></form>");
			 var url = URL_WEB_SERVER + "/upload/excelList.do";
			 window.open("" ,"popUpload", "toolbar=no, width=1024, height=490, directories=no, status=no, scrollbars=yes, resizable=yes"); 			 
			 form.attr("action", url);
			 form.append("<input type='hidden' name='bbsId' value='"+bbsId+"' />");
			 form.attr("method", "post");
			 form.attr("target", "popUpload");
			 $("body").append(form);
			 form.submit();
		}
	}
	
	//공지사항 리스트 페이지 이동
	var fncMoveNotice	= function(){
		var form		= $("<form></form>");
		form.attr("action", URL_WEB_SERVER + "/service/bbs/bbsList.do");
		form.append("<input type='hidden' name='bbsId' value='"+bbsId+"' />")
		form.attr("method", "post");
		$("body").append(form);
		form.submit();
	}
	 
	//비정형 분석
	var fncCallAnalysysPop	= function(){
	 
	    var msg = ftn_CreateTab("dynamicReport", "비정형 분석", "width:98%;height:98%;margin-top:20px;margin-left:15px;");  //margin-right:15px;margin-bottom:20px;
	
	    if(msg != "" ) {
	    	alert(msg);
	    	return;
	    }
	 
		var form		= $("<form></form>");
		form.attr("action", URL_WEB_SERVER + "/servlet/mstrWeb?evt=3005&src=mstrWeb.3005&reportDesignMode=1&reportID=05B202B9999F4C1AB960DA6208CADF3D");
		form.append("<input type='hidden' name='usrSmgr' id='usrSmgr' value='"+sessionid+"' />");
		form.append("<input type='hidden' name='hiddenSections' id='hiddenSections' value='path,header' />");
		form.attr("method", "post");
		form.attr("target", "dynamicReport");
		$("body").append(form);
		form.submit();
	}
	
	var fncCallAnalysysPop3			= function(){
		var form		= $("<form></form>");
		window.open("" ,"CallAnalysysPop", "toolbar=no, width=1290, height=797, directories=no, status=no,    scrollbars=yes, resizable=yes");
		form.attr("action", URL_WEB_SERVER + "/servlet/mstrWeb?evt=3005&src=mstrWeb.3005&reportDesignMode=1&reportID=05B202B9999F4C1AB960DA6208CADF3D");
		form.append("<input type='hidden' name='usrSmgr' id='usrSmgr' value='"+sessionid+"' />");
		form.attr("method", "post");
		form.attr("target", "CallAnalysysPop");
		$("body").append(form);
		form.submit();
	}
	
	var fncCallAnalysysPop2			= function(){
		var form		= $("<form></form>");
		window.open("" ,"CallAnalysysPop", "toolbar=no, width=1290, height=797, directories=no, status=no,    scrollbars=yes, resizable=yes");
		form.attr("action", URL_WEB_SERVER + "/servlet/mstrWeb?evt=3011&src=mstrWeb.3011");
		form.append("<input type='hidden' name='usrSmgr' id='usrSmgr' value='"+sessionid+"' />");
		form.attr("method", "post");
		form.attr("target", "CallAnalysysPop");
		$("body").append(form);
		form.submit();
	}
	//마이 페이지 
	var fncCallMyreportPop			= function(){
		var form		= $("<form></form>");
		window.open("/service/blank.do" ,"CallMyreportPop", "toolbar=no, width=1290, height=797, directories=no, status=no,    scrollbars=yes, resizable=yes");
		form.attr("action", URL_MSTR_SERVER + "/servlet/mstrWeb?evt=3003&src=mstrWeb.3003");
		form.append("<input type='hidden' name='usrSmgr' id='usrSmgr' value='"+sessionid+"' />");
		form.attr("method", "post");
		form.attr("target", "CallMyreportPop");
		$("body").append(form);
		form.submit();
	}
	//대시보드 분석
	var fncMovDashBoard			= function(){
		var form		= $("<form></form>");
		window.open("/service/blank.do" ,"fncMovDashBoard", "toolbar=no, width=1290, height=797, directories=no, status=no, scrollbars=yes, resizable=yes");
		form.attr("action", URL_MSTR_SERVER + "/servlet/mstrWeb?evt=3187&src=mstrWeb.3187");		
		form.append("<input type='hidden' name='usrSmgr' id='usrSmgr' value='"+sessionid+"' />");
		form.attr("method", "post");
		form.attr("target", "fncMovDashBoard");
		$("body").append(form);
		form.submit();
	}
	
    
    var iframe = $('<iframe frameborder="0" marginwidth="0" marginheight="0" allowfullscreen></iframe>');
    var _dialog = $("<div></div>").append(iframe).appendTo("body").dialog({
        autoOpen: false,
        modal: true,
        resizable: false,
        width: "auto",
        height: "auto",
        close: function () {
            iframe.attr("src", "");
        }
    });
	
	//비밀번호 변경 팝업 호출
	var fncCallPassModPop		= function(){
		var params= {}
		
        iframe.attr({
            width: 560,
            height: 460,
            src: URL_WEB_SERVER + "/service/usr/passModPop.do"
        });
		_dialog.dialog("option", "title", "비밀번호 변경").dialog("open");
	}
	
	function dialogClose() {  //called from inside iframe, but with the parent's scope (see below)
		_dialog.dialog("close");
		return false;
	}