/**
 * 
 */

function nullCheck(data) {
	if(data==null || typeof data== "unundefined" || data=="null"){
		return data="";
	}else{
		return data;
	}
}

function nullCheckZero(data) {
	if(data==null || typeof data== "unundefined" ){
		return data="0";
	}else{
		return data;
	}
}

/**
 * 날짜 체크
 *
 * @param	date
 * @return	boolean
 */
function isDate(date) {
	if (date == null || date.length != 8) {
		return	false;
	}

	if (!isNumber(date)) {
		return	false;
	}

	var year  = eval(date.substring(0, 4));
	var month = eval(date.substring(4, 6));
	var day   = eval(date.substring(6, 8));

	if (month > 12) {
		return	false;
	}

	var totalDays;

	switch (eval(month)){

	case 1 :
		totalDays = 31;
		break;
	case 2 :
		if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)){
			totalDays = 29;
		}
		else{
			totalDays = 28;			
			}
		break;
	case 3 :
		totalDays = 31;
		break;
	case 4 :
		totalDays = 30;
		break;
	case 5 :
		totalDays = 31;
		break;
	case 6 :
		totalDays = 30;
		break;
	case 7 :
		totalDays = 31;
		break;
	case 8 :
		totalDays = 31;
		break;
	case 9 :
		totalDays = 30;
		break;
	case 10 :
		totalDays = 31;
		break;
	case 11 :
		totalDays = 30;
		break;
	case 12 :
		totalDays = 31;
		break;
	}

	if (day > totalDays) {
		return	false;
	}

	return	true;
}

/**
 * 오직 숫자로만 이루어져 있는지 체크 한다.
 *
 * @param	num
 * @return	boolean
 */
function isNumber(num) {
	var re = /[0-9]*[0-9]$/;

	if (re.test(num)) {
		return	true;
	}

	return	false;
}


/**
 * Method :  radioboxcheck
 * Desc   : 라디오박스체크여부값
 * param : name : name명
 * return check값
 */
function radioboxcheck(name){
	var lang = document.getElementsByName(name);
	var result1;
	for(var i = 0;i<lang.length;i++){
	    if(lang[i].checked){    // radio 처리
	    	result1 = lang[i].value;
	    }
	}
	return result1;
}


/**
 * Method :  radioboxcheck
 * Desc   : 라디오박스체크여부값
 * param : name : name명
 * return check값
 */
function radioboxcheckval(name,val){
	var lang = document.getElementsByName(name);
	var result1;
	for(var i = 0;i<lang.length;i++){
	    if(lang[i].value==val){    // radio 처리
	    	lang[i].checked=true;
	    }
	}
}


//Method : cfCheckAll
//param :  전체체크박스명(상단의 전체체크) , 체크박스
//Desc   : 체크박스 모두  체크 & 모두 해제

function cfCheckBoxAll(obj , lst)
{ 
	if(lst) {
		if (lst.length) {
			for(var i=0; i < lst.length; i++) {
				if(obj.checked == true) { 
					lst[i].checked = true;
				} else {
					lst[i].checked = false;
				}
			}
		} else {
			if(obj.checked == true) {
				lst.checked = true;
			} else {
				lst.checked = false;
			}
		}
	}
}

String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/gi, "");
}


/**
* Method :  checkLengthByte
* Desc   : 길이체크 (onkeyup으로 체크 ex.checkLengthByte('intdDesc','150');)
* param : textId 체크할 ID 
* param : limit 제한
* message : alert메시지
* return 
*/

function checkLengthByte(textId, limit,message) {
	var str = $("#"+textId).val();
	var size = 0;
	for (var i=0; i<str.length; i++) {
		var ch = str.charAt(i);
		if(escape(ch).length > 4) {
			//size +=3;
			size +=1;
		} else {
			size +=1;
		}
	}
	
	$("#"+textId+"Byte").text(size);
	
	if (size > limit) {
		alert(message);
		$("#"+textId).val(dropOverStr(str, limit));
		checkLengthByte(textId, limit);
	}
}


/***
* <pre>
* 최대 입력가능 byte 초과시 초과한 문자열 자른 나머지 문자열 반환 (위 setMaxInputLimit() 함수에서 사용)
* </pre>
* 
* @param {String} 	targetStr 		대상 문자열
* @param {Number} 	maxSize 		최대 입력가능 Byte
* @param {Boolean} enterCountFlag 	줄바꿈을 문자열 size 계산 카운팅에 포함할지 여부(true:포함, false:포함안함) [선택사항(입력없을경우:true)]
* 
* @return {String} 초과한 문자열 자른 나머지 문자열
* 
*/
function dropOverStr(targetStr, maxSize, enterCountFlag) {
   var targetStrObj = new String(targetStr);
   var totalByteSize = 0;
   if(enterCountFlag == null || enterCountFlag == undefined){ 
   	enterCountFlag = true;
   }
   
   if(!enterCountFlag){ //줄바꿈을 문자열 size 계산 카운팅에 포함 안하는 경우
   	targetStrObj = targetStrObj.replace(/[\n\r]/g,""); //계산할 문자열에서 개행문자 제거
   }

   for (var i = 0; i < targetStrObj.length; i++) {
        if (escape(targetStrObj.charAt(i)).length > 4) {
       	 totalByteSize += 1; //1 문자당 한글 Byte 계산 기준 변경 (ANSI(2)->UTF-8(3))
        }else{
       	 totalByteSize++;
        }
 
        if(totalByteSize > maxSize) {
             targetStrObj = targetStrObj.substring(0,i);
             break;
        }
   }
   return targetStrObj;
}


//Method : cfChkEmail
//Desc   :이메일로직 체크함수

function cfChkEmail(email) {
	var invalidChars = "\"|&;<>!*\'\\"   ;
	for (var i = 0; i < invalidChars.length; i++) {
		if (email.indexOf(invalidChars.charAt ) != -1) {
			return false;
		}
	}
	if (email.indexOf("@")==-1){
		return false;
	}
	if (email.indexOf(" ") != -1){
		return false;
	}
	if (window.RegExp) {
		var reg1str = "(@.*@)|(\\.\\.)|(@\\.)|(\\.@)|(^\\.)";
		var reg2str = "^.+\\@(\\[?)[a-zA-Z0-9\\-\\.]+\\.([a-zA-Z]{2,3}|[0-9]{1,3})(\\]?)$";
		var reg1 = new RegExp (reg1str);
		var reg2 = new RegExp (reg2str);

		if (reg1.test(email) || !reg2.test(email)) {
			return false;
		}
	}
	return true;
}


/**
 * <pre>
 * INPUT BOX에 숫자만 입력되도록 제한함.
 * </pre> 
 * 
 * @param {String(id)} or {Object(DOM or jQuery)}	inputTarget			제한할 INPUT BOX(단, [input type="text"]만 가능)
 * @param {Boolean} 								submitValidFlag		submit시 검증할지 여부(true:검증함, false:검증안함) [선택사항(입력없을경우:false)]
 * 
 * ※ inputTarget에 placeholder와 유사한 효과를 IE를 위해 별도로 구현해두셨거나 
 * appendCipherComma()등을 적용하여 값을 변경한 적이 있는 경우 
 * submitValidFlag=true로 하여 submit 검증 로직을 적용하기 전에 
 * 반드시 inputTarget의 값을 체크해보시기 바랍니다!
 * 
 * @return {Object(jQuery)} inputTarget (Method Chaining 용도)
 */
function setOnlyNumericInput(inputTarget, submitValidFlag){
	var inputTargetJqObj = convertIntoJQueryObject(inputTarget);
    if(submitValidFlag == null || submitValidFlag == undefined){ 
    	submitValidFlag = false;
    }
	
	inputTargetJqObj.css('ime-mode', 'disabled'); //IE에서 한영 전환 차단 처리
	
	inputTargetJqObj.keydown(function(event){
 		if ((event.keyCode >= 48 && event.keyCode <= 57)){ //키보드 상단 숫자키
			if(event.shiftKey){ //SHIFT 키
				event.preventDefault();
			}
		}
	});
	
	//크롬에서 한글로 전환 후 하나 이상의 키를 동시에 누를 경우 한글이 입력되는것은 막을 수가 없기에 
	//입력된 값에 숫자가 아닌 값이 있을 경우 숫자 이외의 값은 제거한 값으로 변경하도록 추가 처리함.
    inputTargetJqObj.keyup(function(event){
        var value = inputTargetJqObj.val();
        if(isNaN(parseFloat(value)) || !isFinite(value)){ //숫자가 아닐때
           inputTargetJqObj.val(value.replace(/[^0-9]/g,''));
        }
    });
    
    //비 정상적인 접근 및 조작등으로 인해  submit할때  입력되있는 값에 숫자가 아닌 값이 있는 경우 값을 제거한다.
    if(submitValidFlag){
	    inputTargetJqObj.parents('form').submit(function(event) {
	    	var value = inputTargetJqObj.val();
	    	if(value.length > 0 && ( isNaN(parseFloat(value)) || !isFinite(value) ) ){ //입력되어져있는 값이 존재하면서 숫자가 아닐때
	    		inputTargetJqObj.focus(); //포커스 이동
	    		// 숫자만 입력이 가능합니다.\\r\\n해당 항목의 입력값은 제거 됩니다.
	    		alert(UTIL_MSG_001);
	    		inputTargetJqObj.val(''); //값 제거
	    	}
	    });
    }
    
	return inputTargetJqObj;
}


/**
 * <pre>
 * String(id속성값), DOM Object(document.getElementById)를 jQuery Object로 변환함.
 * (용도 : function의 param에 jQuery Object 이외의 값도 받아들일 수 있도록 하는데 사용)
 * </pre> 
 * 
 * @param {String(id)} or {Object(DOM)}	param	jQuery Object로 변환할 String(id속성값) 또는 DOM Object(예:document.getElementById)
 * 
 * @return {Object(jQuery)}
 */
function convertIntoJQueryObject(param){
	var jQueryObject = null;
	if ( typeof param == 'string' ) {
		var char = param.charAt(0);
		if(char=='#' || char=='.' || char=='['){
			jQueryObject = 	$(param);
		}else{
			jQueryObject = 	$('#'+param);
		}
	} else if ( param instanceof $) {
		jQueryObject =  param;
	} else if ( param != undefined  && param != null ){
		jQueryObject = $(param);
	}
	return jQueryObject;
}



/////////////////////////////////////////////////////////////////////////////////////////////
//Method : cfGetMonthInterval
//Desc   : 두 Time이 몇 개월 차이나는지 구함 time1이 time2보다 크면(미래면) minus(-)
/////////////////////////////////////////////////////////////////////////////////////////////
function cfGetMonthInterval(time1, time2)
{
//measureMonthInterval(time1,time2)
var date1 = cfToTimeObject(time1);
var date2 = cfToTimeObject(time2);
var years = date2.getFullYear() - date1.getFullYear();
var months = date2.getMonth() - date1.getMonth();
var days = date2.getDate() - date1.getDate();
return(years * 12 + months +(days >= 0 ? 0 : - 1));
}


/////////////////////////////////////////////////////////////////////////////////////////////
//Method : cfGetHourInterval
//Desc   : 두 Time이 몇 시간 차이나는지 구함 time1이 time2보다 크면(미래면) minus(-)
/////////////////////////////////////////////////////////////////////////////////////////////
function cfGetHourInterval(time1, time2)
{
	var date1 = cfToTimeObject(time1);
	var date2 = cfToTimeObject(time2);
	var hour = 1000 * 3600;
	//1시간
	return parseInt((date2 - date1)/hour, 10);
}

/////////////////////////////////////////////////////////////////////////////////////////////
//Method : cfGetMinInterval
//Desc   : 두 Time이 몇 시간 차이나는지 구함 time1이 time2보다 크면(미래면) minus(-)
/////////////////////////////////////////////////////////////////////////////////////////////
function cfGetMinInterval(time1, time2)
{
	var date1 = cfToTimeObject(time1);
	var date2 = cfToTimeObject(time2);
	var min = 1000;
	//1시간
	return parseInt((date2 - date1)/min, 10);
}

/////////////////////////////////////////////////////////////////////////////////////////////
//Method : cfToTimeObject
//Desc   : Time 스트링을 자바스크립트 Date 객체로 변환 parameter time: Time 형식의 String
/////////////////////////////////////////////////////////////////////////////////////////////
function cfToTimeObject(time)
{
	//parseTime(time)
	var year = time.substr(0, 4);
	var month = time.substr(4, 2) - 1;
	// 1월=0,12월=11
	var day = time.substr(6, 2);
	var hour = time.substr(8, 2);
	var min = time.substr(10, 2);
	return new Date(year, month, day, hour, min);
}


/////////////////////////////////////////////////////////////////////////////////////////////
//Method : vComma
//Desc   : 3자리 마다 콤마표시
/////////////////////////////////////////////////////////////////////////////////////////////
function setComma(str) { 
  var text = "" + str;
  var str    = "" + text.replace(/,/gi,''); // 콤마 제거 
  var regx    = new RegExp(/(-?\d+)(\d{3})/); 
  var bExists = text.indexOf(".",0); 
  var strArr  = text.split('.'); 
  while(regx.test(strArr[0])){ 
      strArr[0] = strArr[0].replace(regx,"$1,$2"); 
  } 
  if (bExists > -1) {
	  var retStr = strArr[0] + "." + strArr[1]; 
      return retStr;
  } else{
	  return strArr[0];
  }        
} 


/////////////////////////////////////////////////////////////////////////////////////////////
//Method : setDateReplace
//Desc   : 리플레쉬
/////////////////////////////////////////////////////////////////////////////////////////////
function setDateReplace(str,text) { 
var text = "" + str;
var strresult    = "" + text.replace(/\//gi,''); // 콤마 제거 
return strresult;
} 

/////////////////////////////////////////////////////////////////////////////////////////////
//Method : setDateReplace
//Desc   : 리플레쉬
/////////////////////////////////////////////////////////////////////////////////////////////
function setCommaReplace(str,text) { 
var text = "" + str;
var strresult    = "" + text.replace(/,/gi,''); // 콤마 제거 
return strresult;
} 

/////////////////////////////////////////////////////////////////////////////////////////////
//Method : setDateDiv
//Desc   : 날짜 구분자 삽입
/////////////////////////////////////////////////////////////////////////////////////////////
function setDateDiv(str,div) { 
	var strresult    = "";
	
	if(str != "" && str != null){
		if(str.length > 7){
			strresult = str.substring(0, 4) + div + str.substring(4, 6) + div + str.substring(6, 8);
		}else if(str.length < 8 && str.length > 5){
			strresult = str.substring(0, 4) + div + str.substring(4, 6);
		}else{
			strresult = str;
		}
	}
	return strresult;
} 

function fncTelPhonSub(str)
{
	var tempresult=new Array(); 
	//parseTime(time)
	if(str.length>0){
		if(str.length>8){
			if(str.length==12){
				tempresult[0]=str.substring(0, 4);
				tempresult[1]=str.substring(4, 8);
				tempresult[2]=str.substring(8, str.length);
			}else if(str.length==11){
				tempresult[0]=str.substring(0, 3);
				tempresult[1]=str.substring(3, 7);
				tempresult[2]=str.substring(7, str.length);
			}else if(str.length==10){
				tempresult[0]=str.substring(0, 2);
				tempresult[1]=str.substring(2, 6);
				tempresult[2]=str.substring(6, str.length);
			}else{
				tempresult[0]=str.substring(0, 1);
				tempresult[1]=str.substring(1, 5);
				tempresult[2]=str.substring(5, str.length);
			}
		}else if(str.length>4){
			if(str.length==8){
				tempresult[0]=str.substring(0, 4);
				tempresult[1]=str.substring(4, str.length);
			}else if(str.length==7){
				tempresult[0]=str.substring(0, 3);
				tempresult[1]=str.substring(3, str.length);
			}else if(str.length==6){
				tempresult[0]=str.substring(0, 2);
				tempresult[1]=str.substring(2, str.length);
			}else{
				tempresult[0]=str.substring(0, 1);
				tempresult[1]=str.substring(1, str.length);
			}
		}
		else{
			tempresult[0]=str.substring(0, str.length);
		}
	}
	return tempresult;
}

var cloneTrgIdx = {};
var cloneTrgIdx2 = {};
var addButtonTag;
/**
 * 입력폼 추가 함수
 * 입력 폼을 감싸는 상위 부모에 ID를 파라미터로 받는다.
 * ex)
 * <tr id="test">
 * 	<td>
 * 		<input type="text" />
 * 		<input type="button" value="더하기" onclick="javascript:fncIncreaseBar('tr area id') />
 * 	</td>
 * </tr>
 * @param id
 * @returns {Boolean}
 */
function fncIncreaseBar(id, date){
	if(id=="prtpaytd"){ 
		if($("#"+id).parent().children("[id^="+id.replace(new RegExp(/[0-9/_]+/g), "")+"]").length>2){
			return false;
		};
	}
	if(id == null || id == ""){
		return false;
	}
	if(cloneTrgIdx[id] == null || cloneTrgIdx[id] == undefined){
		cloneTrgIdx[id] = 0;
	}
	
	var locCloneTrg = $("#"+id).clone();
	var locCloneTrgParent = $("#"+id).parent();
	var locTrgId = id+"_"+cloneTrgIdx[id];
	var locButton = locCloneTrg.find(".btn_plus");
	var locButtonParent = locButton.parent();
	locCloneTrg.attr("id", locTrgId);
	locCloneTrg.attr("class", "added");
	locCloneTrg.find(".btn_plus").remove();
	locCloneTrg.find('input[type="text"]').each(function(){
		$(this).attr("id", $(this).attr("id")+cloneTrgIdx[id]);
	});
	if(locCloneTrg.find("select").length > 0){
		locCloneTrg.find("select").each(function(){
			$(this).attr("id",$(this).attr("id")+cloneTrgIdx[id]);
			$(this).val("");
		});
	}
	// Date Picker가 있는 경우 초기화
	locCloneTrg.find('input[type="text"]').each(function(){
		if(!$(this).hasClass("hasDatepicker")){
			$(this).val("");
		}		
	});
	
	locCloneTrg.find('input[type="hidden"]').each(function(){
		if(locCloneTrg.find("input[name=advrtsVrscSiteIddata]").length > 0 || locCloneTrg.find("input[name=comznIemCodeArr]").length > 0){
			$(this).val($(this).val());
		}else{
			$(this).val("");
		}

	});
	
		
	
	if(locCloneTrgParent.find(".added").length == 0){
		var addButtonTag = locCloneTrg.find(".button");
		
		locButtonParent.append("<a class='btn_minus red'  onclick='javascript:fncDecreaseBar(\""+locTrgId+"\", \""+id+"\")'><span>-</span></a>");
	}else{
		locCloneTrg.children(":last").find("a").remove();
		locButtonParent.append("<a class='btn_minus red' onclick='javascript:fncDecreaseBar(\""+locTrgId+"\", \""+id+"\")'><span>-</span></a>");
	}
	if(id.indexOf("comznNew_")>=0){
		locCloneTrgParent.children("[id^="+id+"]").last().after(locCloneTrg);
	}else{
		locCloneTrgParent.children("[id^="+id.replace(new RegExp(/[0-9/_]+/g), "")+"]").last().after(locCloneTrg);
	}
	cloneTrgIdx[id] ++;

	
	if(locCloneTrg.find("input[name=cntrnMapSeqNoArr]").length > 0){
		locCloneTrg.find("input[name=cntrnMapSeqNoArr]").val(0);
		locCloneTrg.find("input[name=cntrnMapSeqNoArr]").attr("value", 0);
	}
	if(locCloneTrg.find("input[name=mapngSeqNoArr]").length > 0){
		locCloneTrg.find("input[name=mapngSeqNoArr]").val("");
		locCloneTrg.find("input[name=mapngSeqNoArr]").attr("value", "");
	}
	/*광고 상태*/
	if(locCloneTrg.find("input[name=mapngSeqNoIdArr]").length > 0){
		locCloneTrg.find("input[name=mapngSeqNoIdArr]").val("");
		locCloneTrg.find("input[name=mapngSeqNoIdArr]").attr("value", "");
	}
	if(locCloneTrg.find("input[name=prtpayAmtSeq]").length > 0){
		locCloneTrg.find("input[name=prtpayAmtSeq]").each(function(){
			$(this).val(0);
			$(this).attr("value", 0);
		});
	}
	
	if(locCloneTrg.find("input[name=wphAmtSeqArr]").length > 0){
		locCloneTrg.find("input[name=wphAmtSeqArr]").val(0);
		locCloneTrg.find("input[name=wphAmtSeqArr]").attr("value", 0);
	}
	if(locCloneTrg.find("#comznNo").length > 0){
		var trindex=$('#comznTbody tr').length;
		locCloneTrg.find("#comznNo").text(trindex);
		locCloneTrg.find("#comznNo").attr("text", trindex);
		locCloneTrg.find("#carmoNmtxt").text('');
		locCloneTrg.find("#carmoNmtxt").attr("text", '');
		locCloneTrg.find("#carOrgNm").text('');
		locCloneTrg.find("#carOrgNm").attr("text", '');
		locCloneTrg.find("#pchsYmd").text('');
		locCloneTrg.find("#pchsYmd").attr("text", '');
	}
	if(locCloneTrg.find("input[name=prtpayAmtArrnum]").length > 0){//중도금
		
		var dateId = locCloneTrg.find("input[name~=prtdatename]").attr("id");
		var dateSelector = locCloneTrg.find("input[name~=prtdatename]").attr("id", id + dateId + locTrgId);
		dateSelector.val();
		dateSelector.removeClass('hasDatepicker');
		dateSelector.next().remove();
		dateSelector.datepicker({
      	  showOn: "button",
  			buttonImage: URL_IMG_SERVER+"jvpos/images/btn_diary.gif",
  			buttonImageOnly: true,
  			changeYear: true,
  			changeMonth: true,
  			dateFormat : "yy/mm/dd"});
		dateSelector.val(date);
		$('input[type="text"]').setMask(); //mask를 해주기위함.
		
		locCloneTrg.find("input[name=prtpayAmtArrnum]").each(function(){
			$(this).focusout(function(){
		  			fncnamdacaramt(this);
			}); 
		});
	}
	

	
	if(locCloneTrg.find("input[name~=feeAmt]").length > 0){//공헌 이익
		var dateId = locCloneTrg.find("input[name~=cntrbYmd]").attr("id");
		var dateSelector = locCloneTrg.find("input[name~=cntrbYmd]").attr("id", id + dateId + locTrgId);
		dateSelector.val();
		dateSelector.removeClass('hasDatepicker');
		dateSelector.next().remove();
		dateSelector.datepicker({
      	  showOn: "button",
  			buttonImage: URL_IMG_SERVER+"jvpos/images/btn_diary.gif",
  			buttonImageOnly: true,
  			changeYear: true,
  			changeMonth: true,
  			dateFormat : "yy/mm/dd"});
		dateSelector.val(date);
		$('input[type="text"]').setMask(); //mask를 해주기위함.
		
		locCloneTrg.find("input[name~=feeAmt]").each(function(){
			$(this).focusout(function(){
	  			/*남은매입가계산*/
				fncSumTotal();
			});
		});
	} 

	
	if(locCloneTrg.find("input[name~=wphAmtArrNum]").length > 0){//보증상품
		var dateId = locCloneTrg.find("input[name~=wphDate]").attr("id");
		var dateSelector = locCloneTrg.find("input[name~=wphDate]").attr("id", id + dateId + locTrgId);
		dateSelector.val();
		dateSelector.removeClass('hasDatepicker');
		dateSelector.next().remove();
		dateSelector.datepicker({
      	  showOn: "button",
  			buttonImage: URL_IMG_SERVER+"jvpos/images/btn_diary.gif",
  			buttonImageOnly: true,
  			changeYear: true,
  			changeMonth: true,
  			dateFormat : "yy/mm/dd"});
		dateSelector.val(date);
		$('input[type="text"]').setMask(); //mask를 해주기위함.
		locCloneTrg.find("input[name~=wphAmtArrNum]").each(function(){
			$(this).focusout(function(){
	  			/*남은매입가계산*/
				fncWphSumTotal();
			});
		});
	}  
	
	
	if(locCloneTrg.find("input[name~=comznAmtNum]").length > 0){
		locCloneTrg.find("input[name~=comznAmtNum]").each(function(){
			
			$(this).focusout(function(){
				$('input[type="text"]').setMask(); //mask를 해주기위함.
	  			/*남은매입가계산*/
				fncSumTotal();
			});
		});
	}
	
	if(locCloneTrg.find("input[name~=comznAmtOneNum]").length > 0){
		locCloneTrg.find("input[name~=comznAmtOneNum]").each(function(){
				$('input[type="text"]').setMask(); //mask를 해주기위함.

		});
	}
	if(locCloneTrg.find("input[name~=sitermb]").length > 0){
		locCloneTrg.find("input[name~=sitermb]").each(function(){
			$('input[type="text"]').setMask(); //mask를 해주기위함.
		}); 
	}
	 
}

function fncIncreaseBarForDept(id, type, isNew){
	if(id == null || id == ""){
		return false;
	}
	if(cloneTrgIdx[id] == null || cloneTrgIdx[id] == undefined){
		cloneTrgIdx[id] = 0;
	}
	
	var locCloneTrg = $("#"+id).clone();
	var locCloneTrgParent = $("#"+id).parent();
	var locTrgId = "";
	if(isNew != null && isNew != ""){
		locTrgId = id+"_"+isNew+"_"+cloneTrgIdx[id];
	}else{
		locTrgId = id+"_"+cloneTrgIdx[id];
	}
	var locButton = locCloneTrg.find(".btn_plus");
	var locButtonParent = locButton.parent();
	locCloneTrg.attr("id", locTrgId);
	locCloneTrg.attr("class", "added");
	locCloneTrg.find(".btn_plus").remove();
	locCloneTrg.find('input[type="text"]').each(function(){
		$(this).attr("id", $(this).attr("id")+cloneTrgIdx[id]);
	});
	if(locCloneTrg.find("select").length > 0){
		locCloneTrg.find("select").each(function(){
			$(this).attr("id",$(this).attr("id")+cloneTrgIdx[id]);
			$(this).val("");
		});
	}
	
	locCloneTrg.find('input[type="hidden"]').each(function(){
		$(this).val("");
	});
	locCloneTrg.find("input[type=hidden]").remove();
	locCloneTrg.find('span').before("<input type='hidden' name='orgntLevelOneIds' value=''/>");
	locCloneTrg.find('span').before("<input type='hidden' name='orgntLevelTwoIds' value=''/>");
	locCloneTrg.find('span').before("<input type='hidden' name='orgntLevelThrIds' value=''/>");
	
	locCloneTrg.find('span').each(function(){
		$(this).text("");
	});
	locCloneTrg.children(":last").find("a").remove();
	
	if(locCloneTrgParent.find(".added").length == 0){
		var addButtonTag = locCloneTrg.find(".button");
		locButtonParent.append("<a href='#;' onclick='javascript:fncOpenDeptPop(this, \""+type+"\")' class='btn_search'><span>search</span></a>");
		locButtonParent.append(" <a class='btn_minus red'  onclick='javascript:fncDecreaseBar(\""+locTrgId+"\", \""+id+"\")'><span>-</span></a>");
	}else{
		
		locButtonParent.append("<a href='#;' onclick='javascript:fncOpenDeptPop(this, \""+type+"\")' class='btn_search'><span>search</span></a>");
		locButtonParent.append(" <a class='btn_minus red' onclick='javascript:fncDecreaseBar(\""+locTrgId+"\", \""+id+"\")'><span>-</span></a>");
	}
	if(id.indexOf("comznNew_")>=0){
		locCloneTrgParent.children("[id^="+id+"]").last().after(locCloneTrg);
	}else{
		locCloneTrgParent.children("[id^="+id.replace(new RegExp(/[0-9/_]+/g), "")+"]").last().after(locCloneTrg);
	}
	cloneTrgIdx[id] ++;

	
	
	if(fncSelectBoxInit){
		fncSelectBoxInit();
	}
}

/**
 * 입력폼 추가 함수
 * 입력 폼을 감싸는 상위 부모에 ID를 파라미터로 받는다.
 *  - 이전비 일괄등록에서 사용
 * <tr id="test">
 * 	<td>
 * 		<input type="text" />
 * 		<input type="button" value="더하기" onclick="javascript:fncIncreaseBar('tr area id') />
 * 	</td>
 * </tr>
 * @param id
 * @returns {Boolean}
 */
function fncIncreaseBar2(id, date){
	
	if(id == null || id == ""){
		return false;
	}
	if(cloneTrgIdx2[id] == null || cloneTrgIdx2[id] == undefined){
		cloneTrgIdx2[id] = 0;
	}
	
	var trId = 0;
	var locCloneTrg = $("#"+id).clone();
	var locCloneTrgParent = $("#"+id).parent();
	var locTrgId = id+"_"+cloneTrgIdx2[id];
	var locButton = locCloneTrg.find(".btn_plus");
	var locButtonParent = locButton.parent();
	locCloneTrg.attr("id", locTrgId);
	locCloneTrg.attr("class", "added");
	locCloneTrg.find(".btn_plus").remove();
	// Date Picker가 있는 경우 초기화
	locCloneTrg.find('input[type="text"]').each(function(){
		
		$(this).val("");
		//금액 초기값 0셋팅
		if(locCloneTrg.find("input[name=relctRegistAmt]").length > 0){
			locCloneTrg.find("input[name=relctRegistAmt]").attr("value", "0");
		}
		if(locCloneTrg.find("input[name=feeAmt]").length > 0){
			locCloneTrg.find("input[name=feeAmt]").attr("value", "0");
		}
		if(locCloneTrg.find("input[name=relctVrscAmt]").length > 0){
			locCloneTrg.find("input[name=relctVrscAmt]").attr("value", "0");
		}
	});
	
	locCloneTrg.find('input[type="hidden"]').each(function(){
		$(this).val("");
	});
	
	/** td 영역 출력항목 clear **/
	locCloneTrg.find('td[id="pchsYmd"]').each(function(){
		locCloneTrg.find("td[id=pchsYmd]").text("");
	});
	locCloneTrg.find('td[id="carOrgNm"]').each(function(){
		locCloneTrg.find("td[id=carOrgNm]").text("");
	});
	locCloneTrg.find('td[id="carmoNmtxt"]').each(function(){
		locCloneTrg.find("td[id=carmoNmtxt]").text("");
	});
	locCloneTrg.find('td[id="pchsSaleGbNm"]').each(function(){
		locCloneTrg.find("td[id=pchsSaleGbNm]").text("");
	});
	
	if(locCloneTrg.find("#sDate5").length > 0){
		var dateId = locCloneTrg.find("#sDate5").attr("id");
		var dateSelector = locCloneTrg.find("#sDate5").attr("id", locTrgId);
		dateSelector.val();
		dateSelector.removeClass('hasDatepicker');
		dateSelector.next().remove();
		dateSelector.datepicker({
      	  showOn: "button",
  			buttonImage: URL_IMG_SERVER+"jvpos/images/btn_diary.gif",
  			buttonImageOnly: true,
  			changeYear: true,
  			changeMonth: true,
  			dateFormat : "yy/mm/dd"});
		dateSelector.val(date);
	}
	
	if( locCloneTrg.find("input[name~=relctEndDate]").length > 0){
		var dateId = locCloneTrg.find("input[name~=relctEndDate]").attr("id");
		var dateSelector = locCloneTrg.find("input[name~=relctEndDate]").attr("id", id + dateId + locTrgId);
		dateSelector.val();
		dateSelector.removeClass('hasDatepicker');
		dateSelector.next().remove();
		dateSelector.datepicker({
      	  showOn: "button",
  			buttonImage: URL_IMG_SERVER+"jvpos/images/btn_diary.gif",
  			buttonImageOnly: true,
  			changeYear: true,
  			changeMonth: true,
  			dateFormat : "yy/mm/dd"});
		dateSelector.val(date);
		$('input[type="text"]').setMask(); //mask를 해주기위함.
		//dateSelector.val(date);
	}
	

	if(locCloneTrgParent.find(".added").length == 0){
		var addButtonTag = locCloneTrg.find(".button");
		
		locButtonParent.append("<a class='btn_minus red'  onclick='javascript:fncDecreaseBar2(\""+locTrgId+"\", \""+id+"\")'><span>-</span></a>");
	}else{
		locCloneTrg.children(":last").find("a").remove();
		locButtonParent.append("<a class='btn_minus red' onclick='javascript:fncDecreaseBar2(\""+locTrgId+"\", \""+id+"\")'><span>-</span></a>");
	}
	
	if(locCloneTrg.find("#lineNo").length > 0){
		var trindex=$('#addLineAreaTbody tr').length;
		locCloneTrg.find("#lineNo").text(trindex+1);
		locCloneTrg.find("#lineNo").attr("text", trindex+1);
	}
	
	trId = cloneTrgIdx2[id];
	
	locCloneTrgParent.children("[id^="+id+"]").last().after(locCloneTrg);
	cloneTrgIdx2[id] ++;
	
	$('input[type="text"]').setMask(); //mask를 해주기위함.
	
	return trId;
}


/**
 * 추가된 폼 제거 함수
 * @param id	제거될 ROW의 아이디
 * @param orgId	인덱싱 될 ID값
 * @returns {Boolean}
 */
function fncDecreaseBar(id, orgId){
	if(id == null || id == ""){
		return false;
	}
	var target = $("#"+id);
	var parent = target.parent();
	var minusButton = parent.children(".added:last").find(".button");
	target.remove();
	if(id.indexOf("proftr")>=0){		
		fncSumTotal();
	}
	if(id.indexOf("prtpaytd")>=0){	
		/*남은매입가계산*/
		fncnamdacaramt();
	}

	if(target.find("input[name~=feeAmt]").length > 0){
		/*남은매입가계산*/
		fncSumTotal();
	}
}


/**
 * 추가된 폼 제거 함수
 * @param id	제거될 ROW의 아이디
 * @param orgId	인덱싱 될 ID값
 * @returns {Boolean}
 */
function fncDecreaseBar2(id, orgId){
	if(id == null || id == ""){
		return false;
	}
	var target = $("#"+id);
	cloneTrgIdx2[orgId]--;
	var parent = target.parent();
	var minusButton = parent.children(".added:last").find(".button");
	target.remove();
	
}

/**
 * 비밀번호 유효성 체크 숫자, 영 소문자 대문자, 특수문자만 포함 검사
 *
 * @param	pass
 * @return	boolean
 */
function isValidPassCheck(pass) {
	var re = /([a-zA-Z0-9].*[!,@,#,$,%,^,&,*,?,_,~])|([!,@,#,$,%,^,&,*,?,_,~].*[a-zA-Z0-9])/;
	if (re.test(pass)) {
		return	true;
	}

	return	false;
}


function maxLengthCheck(object){
	   if (object.value.length > object.maxLength){
	    object.value = object.value.slice(0, object.maxLength);
	   }    
}

/*조직도 호출*/
function fncOrgDataPopComm(orgnm) {
	var searchNm=null;
	
	if(orgnm=="<c:out value='${CodeCons.PCHEMP}'/>"){
		searchNm = $("#srchPchsEmplNm").val();
	}else if(orgnm=="<c:out value='${CodeCons.SELEMP}'/>"){
		searchNm = $("#srchSleEmplNm").val();	
	}else if(orgnm=="<c:out value='${CodeCons.DIMEMP}'/>"){
		searchNm = $("#srchDimEmplNm").val();
	}else if(orgnm=="<c:out value='${CodeCons.REQEMP}'/>"){
		searchNm = $("#srchReqEmplNm").val();
	}
	
	var params = {"orgNm"			: orgnm			// 조직 구분 파라미터
			, "searchUserNm"	: searchNm		// 사용자 이름 검색 파라미터
			};
	fcOpenPopupForPostWithParams(URL_WEB_SERVER+CMM_DEPT_USER_LIST, "dept", CMM_POPUP_WIDTH, CMM_POPUP_HEIGHT, params);
}

function fncCalcRate(first, second){
	if(first == 0){
		return 0;
	}else if(second == 0){
		return 100;
	}else{
		return ((first / second) * 100).toFixed(1);
	}
}


/**
 * 파일 확장자 유효성 체크
 * param1		: 파일명
 * param2		: 허용 파일 확장자 ( jpg|bmp|gif ) 구분자를 갖음
 */
var fileExtCheck	= function(fileName, allowedExt){
	if(fileName == null || fileName == ""){
		return;
	}
	
	var fileNameSplits			= fileName.split(".");
	var fileExt					= fileNameSplits[fileNameSplits.length - 1].toLowerCase();
	var splitAllowedExt			= allowedExt.split("|");
	
	for(var i = 0; i < splitAllowedExt.length; i++){
		if(fileExt == splitAllowedExt[i].toLowerCase()){
			return true;
		}
	}
	
	return false;
	
	
}