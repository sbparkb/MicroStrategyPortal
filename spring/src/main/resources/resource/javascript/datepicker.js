/**
 * 검색용 년월일  산정시 
 * (영업개시년도부터 ~ 현재년도 + 2년)
 */ 
$(document).ready( function(){	
	$( "#sDate, #sDate1, #sDate2, #sDate3, #sDate4, #sDate5, #sDate6, #sDate7, #sDate8, #sDate9, #sDate10, #sDate11, #sDate12, #sDate13, #sDate14, #sDate15, #sDate16,#insrncEndYmdDate" ).datepicker({
		showOn: "button",
		buttonImage: URL_IMG_SERVER + "images/icon_calendar.png",
		buttonImageOnly: true,
		changeYear: true,
		changeMonth: true,
		dateFormat : "yy-mm-dd",
		
		//minDate: '-20y', 	// 현재날짜로부터 20년이전까지 년을 표시한다.
	    yearRange: '1940:c+50', // 년도 선택 셀렉트박스를 현재 년도에서 이전, 이후로 얼마의 범위를 표시할것인가.		
		
	    monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
	    monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
	    dayNames: ['일','월','화','수','목','금','토'],
	    dayNamesShort: ['일','월','화','수','목','금','토'],
	    dayNamesMin: ['일','월','화','수','목','금','토'],
	});
	
	$( "#brthDy" ).datepicker({
		showOn: "button",
		buttonImage: URL_IMG_SERVER + "images/icon_calendar.png",
		buttonImageOnly: true,
		changeYear: true,
		changeMonth: true,
		dateFormat : "yy-mm-dd",
		
		//minDate: '-20y', 	// 현재날짜로부터 20년이전까지 년을 표시한다.
	    yearRange: '1970:c+1', // 년도 선택 셀렉트박스를 현재 년도에서 이전, 이후로 얼마의 범위를 표시할것인가.		
		
	    monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
	    monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
	    dayNames: ['일','월','화','수','목','금','토'],
	    dayNamesShort: ['일','월','화','수','목','금','토'],
	    dayNamesMin: ['일','월','화','수','목','금','토'],
	});
	
	$( "#sDate" ).datepicker({
		dateFormat : "yy-mm-dd"
	});
	
	
	$( "#checkedDate" ).datepicker({
		showOn: "button",
		buttonImage: URL_IMG_SERVER + "images/icon_calendar.png",
		buttonImageOnly: true,
		changeYear: true,
		changeMonth: true,
		dateFormat : "yy-mm-dd",
		
		//minDate: '-20y', 	// 현재날짜로부터 20년이전까지 년을 표시한다.
	    yearRange: '2013:c+5', // 년도 선택 셀렉트박스를 현재 년도에서 이전, 이후로 얼마의 범위를 표시할것인가.		
		
	    monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
	    monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
	    dayNames: ['일','월','화','수','목','금','토'],
	    dayNamesShort: ['일','월','화','수','목','금','토'],
	    dayNamesMin: ['일','월','화','수','목','금','토'],
	    onSelect: function (dateText, inst) {  
	    	if($("input:checkbox[id='check001']").is(":checked") == true){
				var dataClick="";
				var boxcnt=$("input[name~='comznDate']").length;
				if(boxcnt!=1){
					dataClick=document.getElementsByName('comznDate')[0].value;
					for(var i=1; i<boxcnt; i++){
						document.getElementsByName('comznDate')[i].value=dataClick;
					}
				}
			}
		}
	});
	
	//이전비 일괄등록 일자
	$( "#relctEndDate" ).datepicker({
		showOn: "button",
		buttonImage: URL_IMG_SERVER + "images/icon_calendar.png",
		buttonImageOnly: true,
		changeYear: true,
		changeMonth: true,
		dateFormat : "yy-mm-dd",
		
		//minDate: '-20y', 	// 현재날짜로부터 20년이전까지 년을 표시한다.
	    yearRange: '2013:c+5', // 년도 선택 셀렉트박스를 현재 년도에서 이전, 이후로 얼마의 범위를 표시할것인가.		
		
	    monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
	    monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
	    dayNames: ['일','월','화','수','목','금','토'],
	    dayNamesShort: ['일','월','화','수','목','금','토'],
	    dayNamesMin: ['일','월','화','수','목','금','토'],
	    onSelect: function (dateText, inst) {  
	    	
	    	if($("input:checkbox[id='check001']").is(":checked") == true){
	    		var dataClick="";
				var boxcnt=$("input[name~='relctEndDate']").length;
				if(boxcnt!=1){
					dataClick=document.getElementsByName('relctEndDate')[0].value;
					for(var i=1; i<boxcnt; i++){
						document.getElementsByName('relctEndDate')[i].value=dataClick;
					}
				}
				/*var trCnt = $("tr[id^='addLineArea']").length;
				if(trCnt > 0){
					
					 $("tr[id^='addLineArea']").find("#relctEndDate").val( $("#relctEndDate").val() );
				}*/
			}
	    	
		}
	});
	
});

/**
 * 중고차용 년월일  산정시 
 * (과거 부터 ~ 현재 년도까지)
 */
$(document).ready( function(){			
	$( "#oldSDate1, #oldSDate2, #oldSDate4" ).datepicker({
		showOn: "button",
		buttonImage: URL_IMG_SERVER + "images/icon_calendar.png",
		buttonImageOnly: true,
		changeYear: true,
		changeMonth: true,
		dateFormat : "yy-mm-dd",
		
		//minDate: '-20y', 	// 현재날짜로부터 20년이전까지 년을 표시한다.
	    yearRange: '1970:c', // 년도 선택 셀렉트박스를 현재 년도에서 이전, 이후로 얼마의 범위를 표시할것인가.		
	    
	    monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
	    monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
	    dayNames: ['일','월','화','수','목','금','토'],
	    dayNamesShort: ['일','월','화','수','목','금','토'],
	    dayNamesMin: ['일','월','화','수','목','금','토']
	});
	
	$( "#sDate" ).datepicker({
		dateFormat : "yy-mm-dd"
	});
	
});

$(document).ready( function(){			
	$( "#startDate" ).datepicker({
		showOn: "button",
		buttonImage: URL_IMG_SERVER + "images/icon_calendar.png",
		buttonImageOnly: true,
		changeYear: true,
		changeMonth: true,
		dateFormat : "yy-mm-dd",
		
		//minDate: '-20y', 	// 현재날짜로부터 20년이전까지 년을 표시한다.
	    yearRange: '2013:c+5', // 년도 선택 셀렉트박스를 현재 년도에서 이전, 이후로 얼마의 범위를 표시할것인가.	
	    
		monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
	    monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
	    dayNames: ['일','월','화','수','목','금','토'],
	    dayNamesShort: ['일','월','화','수','목','금','토'],
	    dayNamesMin: ['일','월','화','수','목','금','토']
	});
	
	$( "#sData" ).datepicker({
		dateFormat : "yy-mm-dd"
	});
	
});


$(document).ready( function(){			
	$( "#endDate" ).datepicker({
		showOn: "button",
		buttonImage: URL_IMG_SERVER + "images/icon_calendar.png",
		buttonImageOnly: true,
		changeYear: true,
		changeMonth: true,
		dateFormat : "yy-mm-dd",
		
		//minDate: '-20y', 	// 현재날짜로부터 20년이전까지 년을 표시한다.
	    yearRange: '2013:c+5', // 년도 선택 셀렉트박스를 현재 년도에서 이전, 이후로 얼마의 범위를 표시할것인가.	
	    
		monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
	    monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
	    dayNames: ['일','월','화','수','목','금','토'],
	    dayNamesShort: ['일','월','화','수','목','금','토'],
	    dayNamesMin: ['일','월','화','수','목','금','토']
	});
	
	$( "#eData" ).datepicker({
		dateFormat : "yy-mm-dd"
	});
	
});

/*
 * 년월선택
 * */
$(document).ready( function(){		 
	$( "#startYm, #endYm" ).datepicker({
		showOn: "button",
		buttonImage: URL_IMG_SERVER + "images/icon_calendar.png",
		buttonImageOnly: true,
		changeMonth: true,
		changeYear: true,
		dateFormat : "yy/mm",
		//minDate: '-20y', 	// 현재날짜로부터 20년이전까지 년을 표시한다.
	    yearRange: '2013:c+3', // 년도 선택 셀렉트박스를 현재 년도에서 이전, 이후로 얼마의 범위를 표시할것인가.		
	    monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
	    monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
	    showButtonPanel: true,
	    //showOtherMonths: true,
	    showMonthAfterYear : true, 
	    selectOtherMonths: true,
	    closeText : "닫기",
	    onClose : function (dateText, inst) {
	    	$('#ui-datepicker-div').removeClass('hide-calendar');
		      var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
		      var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
		      $(this).datepicker( "option", "defaultDate", new Date(year, month, 1) );
		      $(this).datepicker('setDate', new Date(year, month, 1));
		  },
		beforeShow : function () {
			 $('#ui-datepicker-div').addClass('hide-calendar');
		      var selectDate = $("#startYm,#endYm").val().split("-");
		      var year = Number(selectDate[0]);
		      var month = Number(selectDate[1]) - 1;
		      $(this).datepicker( "option", "defaultDate", new Date(year, month, 1) );
		  }
		
		});
	
	$( "#startCurDate, #endCurDate" ).datepicker({
		showOn: "button",
		buttonImage: URL_IMG_SERVER + "images/icon_calendar.png",
		buttonImageOnly: true,
		changeMonth: true,
		changeYear: true,
		dateFormat : "yy/mm",
		//minDate: '-20y', 	// 현재날짜로부터 20년이전까지 년을 표시한다.
	    yearRange: '1970:c', // 년도 선택 셀렉트박스를 현재 년도에서 이전, 이후로 얼마의 범위를 표시할것인가.		
	    monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
	    monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
	    showButtonPanel: true,
	    //showOtherMonths: true,
	    showMonthAfterYear : true, 
	    selectOtherMonths: true,
	    closeText : "닫기",
	    onClose : function (dateText, inst) {
	    	$('#ui-datepicker-div').removeClass('hide-calendar');
		      var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
		      var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
		      $(this).datepicker( "option", "defaultDate", new Date(year, month, 1) );
		      $(this).datepicker('setDate', new Date(year, month, 1));
		  },
		beforeShow : function () {
			 $('#ui-datepicker-div').addClass('hide-calendar');
		      var selectDate = $("#startCurDate,#endCurDate").val().split("-");
		      var year = Number(selectDate[0]);
		      var month = Number(selectDate[1]) - 1;
		      $(this).datepicker( "option", "defaultDate", new Date(year, month, 1) );
		  }
		
		});
	//과거 월년선택
	$( "#oldSDate,#oldSDate3" ).datepicker({
		showOn: "button",
		buttonImage: URL_IMG_SERVER + "images/icon_calendar.png",
		buttonImageOnly: true,
		changeMonth: true,
		changeYear: true,
		dateFormat : "yy/mm",
		//minDate: '-20y', 	// 현재날짜로부터 20년이전까지 년을 표시한다.
	    yearRange: '1970:c+1', // 년도 선택 셀렉트박스를 현재 년도에서 이전, 이후로 얼마의 범위를 표시할것인가.		
	    monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
	    monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
	    showButtonPanel: true,
	    //showOtherMonths: true,
	    selectOtherMonths: true,
	    showMonthAfterYear : true, 
	    closeText : "닫기",
	    onClose : function (dateText, inst) {
	    	 $('#ui-datepicker-div').removeClass('hide-calendar');
		      var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
		      var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
		      $(this).datepicker( "option", "defaultDate", new Date(year, month, 1) );
		      $(this).datepicker('setDate', new Date(year, month, 1));
		      if($("#oldSDate").length>0){
		    	  $("#oldSDate3").datepicker('setDate', new Date(year, month, 1));
		      }
		  },
		beforeShow : function () {
			 $('#ui-datepicker-div').addClass('hide-calendar');
		      var selectDate = $("#oldSDate").val().split("-");
		      var year = Number(selectDate[0]);
		      var month = Number(selectDate[1]) - 1;
		      $(this).datepicker( "option", "defaultDate", new Date(year, month, 1) );
		}
	});
});	
/*
 * 연도선택
 */
$(document).ready( function(){		
	$( "#srchYear" ).datepicker({
		showOn: "button",
		buttonImage: URL_IMG_SERVER + "images/icon_calendar.png",
		buttonImageOnly: true,
		changeYear: true,
		changeMonth: true,
		dateFormat : "yy",
		//minDate: '-20y', 	// 현재날짜로부터 20년이전까지 년을 표시한다.
	    yearRange: '2013:c+3', // 년도 선택 셀렉트박스를 현재 년도에서 이전, 이후로 얼마의 범위를 표시할것인가.		
	    showButtonPanel: true,
	    showOtherMonths: true,
	    selectOtherMonths: true,
	    closeText : "닫기",
	    onClose : function (dateText, inst) {
	    	$('#ui-datepicker-div').removeClass('hide-calendar');
		      var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
		      var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
		      $(this).datepicker( "option", "defaultDate", new Date(year, month, 1) );
		      $(this).datepicker('setDate', new Date(year, month, 1));
		  },
		beforeShow : function () {
			 $('#ui-datepicker-div').addClass('hide-calendar');
		      var selectDate = $("#srchYear").val().split("-");
		      var year = Number(selectDate[0]);
		      var month = Number(selectDate[1]) - 1;
		      $(this).datepicker( "option", "defaultDate", new Date(year, month, 1) );
		  }
		
	});
	
	$( "#srchOldYear" ).datepicker({
		showOn: "button",
		buttonImage: URL_IMG_SERVER + "images/icon_calendar.png",
		buttonImageOnly: true,
		changeYear: true,
		changeMonth: true,
		dateFormat : "yy",
		//minDate: '-20y', 	// 현재날짜로부터 20년이전까지 년을 표시한다.
		yearRange: '1970:c', // 년도 선택 셀렉트박스를 현재 년도에서 이전, 이후로 얼마의 범위를 표시할것인가.		
	    showButtonPanel: true,
	    showOtherMonths: true,
	    selectOtherMonths: true,
	    closeText : "닫기",
	    onClose : function (dateText, inst) {
	    	$('#ui-datepicker-div').removeClass('hide-calendar');
		      var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
		      var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
		      $(this).datepicker( "option", "defaultDate", new Date(year, month, 1) );
		      $(this).datepicker('setDate', new Date(year, month, 1));
		  },
		beforeShow : function () {
			 $('#ui-datepicker-div').addClass('hide-calendar');
		      var selectDate = $("#srchOldYear").val().split("-");
		      var year = Number(selectDate[0]);
		      var month = Number(selectDate[1]) - 1;
		      $(this).datepicker( "option", "defaultDate", new Date(year, month, 1) );
		  }
		
	});
});



