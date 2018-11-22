package com.groto.cmm.util;

import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Locale;
import java.util.SimpleTimeZone;
import java.util.TimeZone;

/**
 *  Class Name  :  DateUtil
 *  Description :  날짜 유팅 
 *
 *  Modification Information
 *
 *  Mod Date      Modifier Description
 *  -----------   -------- ---------------------------
 *  2015. 9. 23.  lastpice Generation
 *
 *  @author lastpice
 *  @since  2015. 9. 23. 오후 1:33:07
 *  @version 1.0
 */

public class DateUtil {
    
	private final static int RAWOFFSET = 9 * 60 * 60 * 1000;
    private static final Locale DEFAULT_LOCALE = Locale.KOREA;
    
	/**
	 * 1일의 밀리세컨드.
	 */
	final static long DAY_SECOND = 1000 * 60 * 60 * 24;
	
    /**
     * 현재 년월일시분초를 "yyyyMMddHHmmss"의 time format으로 구함
     * 
     * @return 현재 년월일시분초
     */
    public static String getTime() {
        return getTime("yyyyMMddHHmmss");
    }
    /**
     * 현재 년월일을 "yyyyMMdd"의 time format으로 구함
     * 
     * @return 현재 년월일
     */
    public static String getDate() {
        return getTime("yyyyMMdd");
    }
    
    
    /**
     * 현재 년월일시분초를 "yyyyMMdd24HHmmss"의 time format으로 구함
     * 
     * @return 현재 년월일시분초
     */
    public static String get24TimeMin(final long min) {
        return getTime("yyyyMMddHHmmss",min);
    }
    public static String getTime(final String format,final long min) {
        return getTime(format, TimeZone.getDefault(),min);
    }
    
    /**	
	 * 설명 :10분후 데이터 추출 
	 * getTimeMinute
	 * @param format
	 * @param timezone
	 * @return
	 * String
**/
public static String getTime(final String format, final TimeZone timezone,final long min) {
    Calendar cal = Calendar.getInstance();
    Calendar mycal = Calendar.getInstance();
    cal.setTimeInMillis(mycal.getTimeInMillis() + min);
    SimpleDateFormat sdf = new SimpleDateFormat(format, Locale.KOREAN);
    sdf.setTimeZone(timezone);
    return sdf.format(cal.getTime());
}
    /**
     * 현재 년월일시간을 주어진 time format으로 구함
     * 
     * @param format time format
     * @return 주어진 time format의 현재 년월일
     */
    public static String getTime(String format) {
        Calendar cal = Calendar.getInstance();
        SimpleDateFormat sdf = new SimpleDateFormat(format, DEFAULT_LOCALE);
        return sdf.format(cal.getTime());
    }

    /**
     * 오늘 날짜에 특정 일을 더하거나 뺀 결과를 yyyyMMdd 형식으로 반환한다.
     * 
     * @param days 더하거나 뺄 일 수. 오늘보다 과거로 가려면 음수 값을 넣는다.
     * @return String
     */
    public static String getDate(int days) {
        return getDate(days, "yyyyMMdd");
    }

    /**
     * 오늘 날짜에 특정 일을 더하거나 뺀 결과를 지정한 형식으로 반환한다.
     * 
     * @param days 더하거나 뺄 일 수. 오늘보다 과거로 가려면 음수 값을 넣는다.
     * @param format 날짜 문자열 형식
     * @return String
     */
    public static String getDate(int days, String format) {
        GregorianCalendar gc = new GregorianCalendar();
        SimpleTimeZone kstZone = new SimpleTimeZone(9 * 60 * 60 * 1000, "Asia/Seoul");
        gc.setTimeZone(kstZone);
        SimpleDateFormat sdf = new SimpleDateFormat(format, Locale.KOREAN);
        gc.add(Calendar.DATE, days);

        return sdf.format(gc.getTime());
    }
    
    
    /**
     * from date에서 field 의 offset 만큼 떨어진 to date를 리턴한다.
     * 
     * @param from date. 'YYYYMMDD' 형식이다.
     * @param field.
     * @param offset.
     * @return to date. 'YYYYMMDD' 형식이다.
     * @exception java.text.ParseException
     */
    public static String addDays(String fromDt, int field, int offset)
            throws java.text.ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd", Locale.KOREA);
        Date fromDate = sdf.parse(fromDt);
        Calendar cal = Calendar.getInstance();
        cal.setTime(fromDate);
        cal.add(field, offset);

        Date toDate = cal.getTime();

        return sdf.format(toDate);
    }
    
    public static String addMonths(String fromDt, int field, int offset)
            throws java.text.ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMM", Locale.KOREA);
        Date fromDate = sdf.parse(fromDt);
        Calendar cal = Calendar.getInstance();
        cal.setTime(fromDate);
        cal.add(field, offset);

        Date toDate = cal.getTime();

        return sdf.format(toDate);
    }    
    
    /**
     * from date 부터 offset일수 만큼 더한 일자를 리턴한다.
     * 
     * @param fromdate. 'YYYYMMDD' 형식이다.
     * @param offset.
     * @return to date. 'YYYYMMDD' 형식이다.
     * @exception java.text.ParseException
     */
    public static String addDay(String fromDt, int offset)
            throws java.text.ParseException {
        return addDays(fromDt, Calendar.DATE, offset);
    }
    
    public static String addMonth(String fromDt, int offset)
            throws java.text.ParseException {
        return addMonths(fromDt, Calendar.MONTH, offset);
    }    
    
    /**
     * 현재 년월일시간 +2일을 주어진 time format으로 구함
     * 
     * @param format time format
     * @param time
     * @return 주어진 time format의 현재 년월일 +2일
     */
    public static String getRollTime(String format, int time) {
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.HOUR, time);
        SimpleDateFormat sdf = new SimpleDateFormat(format, DEFAULT_LOCALE);
        return sdf.format(cal.getTime());
    }
    
    public static java.sql.Date rollDays(java.util.Date paramDate, int paramInt) {
      GregorianCalendar localGregorianCalendar = new GregorianCalendar();
      localGregorianCalendar.setTime(paramDate);
      localGregorianCalendar.add(5, paramInt);
      return new java.sql.Date(localGregorianCalendar.getTime().getTime());
    }
    
    /**
     * 이번주의 특정요일 날짜 구하기
     * 
     * <pre>
     * 해당 주는 일요일부터 시작함
     * </pre>
     * 
     * @param format
     * @return
     */
    public static String getDayDate(String format, int day) {
    	
    	/*
    	 * day - 요일
    	 * 1 : 일요일
    	 * 2 : 월요일
    	 * 3 : 화요일
    	 * 4 : 수요일
    	 * 5 : 목요일
    	 * 6 : 금요일
    	 * 7 : 토요일
    	 */
        
    	Calendar cal = Calendar.getInstance();
        cal.add(Calendar.DATE, -1 * (cal.get(Calendar.DAY_OF_WEEK) - day ));

        SimpleDateFormat sdf = new SimpleDateFormat(format, DEFAULT_LOCALE);
        return sdf.format(cal.getTime());
    }    
    
    /**
     * 날짜를 특정 형식으로 변경
     * 
     * @param format
     * @param cal
     * @return
     */
    public static String getDateFormat(String format, Calendar cal) {
        SimpleDateFormat sdf = new SimpleDateFormat(format, DEFAULT_LOCALE);
        return sdf.format(cal.getTime());
    }
    
    /**
     * YY.MM.DD 형식으로 변경
     * 
     * <pre>
     * DB에 저장된 8자리 날짜정보(ex. 20140301)를 
     * 화면 표시용 YY/MM/DD 형식으로 변경함
     * </pre>
     * 
     * @param ymd
     * @return
     */
    public static String getDisplayDateFormat(String ymd) {
    	
    	String returnVal = "";
    	
    	if( !org.apache.commons.lang.StringUtils.isEmpty( ymd )&& ymd.length() >= 8 ){
    		returnVal = ymd.substring(0,4) + "/" + ymd.substring(4,6) + "/" + ymd.substring(6,8);
    	}
    	
    	return returnVal;
    }
    
    /**
     * 현재 월의 첫번째 날짜를 구해서 parameter format형식으로 리턴한다.
     * @param format
     * @return
     */
    public static String getFirstDayofThisMonth(String format){
    	SimpleDateFormat sdf = new SimpleDateFormat(format, Locale.KOREAN);
    	Calendar c = Calendar.getInstance();
    	c.set(c.get(Calendar.YEAR), c.get(Calendar.MONTH), 1);
    	
    	return sdf.format(c.getTime());
    }
    
    /**
     * 현재 월의 마지막 날짜를 구해서 parameter format형식으로 리턴한다.
     * @param format
     * @return
     */
    public static String getLastDayofThisMonth(String format){
    	SimpleDateFormat sdf = new SimpleDateFormat(format, Locale.KOREAN);
    	Calendar c = Calendar.getInstance();
    	c.set(c.get(Calendar.YEAR), c.get(Calendar.MONTH)+1, 0);
    	
    	return sdf.format(c.getTime());
    }
    
    /**
     * 파라미터로 받은 월의 마지막 일을 구한다. 월은 -1한 값이 아닌 5월의 마지막 월을 구하기 위해서는 5를 넘겨준다.
     * 
     * @param format
     * @param month
     * @return
     */
    public static String getLastDayofMonth(String format, String month){
    	SimpleDateFormat sdf = new SimpleDateFormat(format, Locale.KOREAN);
    	Calendar c = Calendar.getInstance();
    	c.set(c.get(Calendar.YEAR), Integer.valueOf(month), 0);
    	
    	return sdf.format(c.getTime()).substring(6, 8);
    }
    
    public static int getCurrentQuarter() {
        Calendar cal = Calendar.getInstance();
        int currentMonth = cal.get(Calendar.MONTH) + 1;
        int quarter = (int) Math.ceil( currentMonth / 3.0 );
        return quarter;
    }

    public static java.sql.Date rollMonths(java.util.Date startDate, int months) {
        GregorianCalendar gc = new GregorianCalendar();
        gc.setTime(startDate);
        gc.add(Calendar.MONTH, months);
        return new java.sql.Date(gc.getTime().getTime());
    }
    
    public static String formatDate(Date date, String format) {
        SimpleDateFormat sdf = new SimpleDateFormat(format, Locale.KOREAN);
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        return sdf.format(cal.getTime());
    }
    
    public static Date stringToDate(String dateString, String format) {
        SimpleDateFormat sdf = new SimpleDateFormat(format, Locale.KOREAN);
        ParsePosition pos = new ParsePosition(0);
        return sdf.parse(dateString, pos);
    }
    
    public static int monthDiff(Date startDate, Date endDate) {
        Calendar startCalendar = new GregorianCalendar();
        startCalendar.setTime(startDate);
        Calendar endCalendar = new GregorianCalendar();
        endCalendar.setTime(endDate);
        int diffYear = endCalendar.get(Calendar.YEAR) - startCalendar.get(Calendar.YEAR);
        int diffMonth = diffYear * 12 + endCalendar.get(Calendar.MONTH) - startCalendar.get(Calendar.MONTH);
        return diffMonth;
    }
    
    
    /**	
 	 * <pre>
 	 * TODO 주석 필수
 	 * </pre>
	 * 설명 : 날짜 넣으면 그날로 반환해줌.
	 * strSenderDateFormat
	 * @param userTimezone
	 * @param language
	 * @return
	 * String
**/
//public static String strSenderDateFormat(String dateStr, String language) throws Exception {
//		Timestamp date=convertToTimestamp(dateStr);
//		String userTimezone= "+08:00";
//    	final Locale locale = LanguageUtil.getLanguageLocale(language);
//    	String strFormat = CodeConstant.DATE_FORMAT_CHANA;
//        if (locale.equals(Locale.KOREAN)) {
//            strFormat = CodeConstant.DATE_FORMAT_KOREAN;
//            userTimezone="+09:00";
//        }
//        DateFormat sdf = new SimpleDateFormat(strFormat, locale);
//    	TimeZone tz = TimeZone.getTimeZone("GMT"+userTimezone); 
//		sdf.setTimeZone(tz);
//    	return sdf.format(date);
// }





// 밀리세컨드 를 반환하는 함수

public static long getTimeInMillis() {
    GregorianCalendar gc = new GregorianCalendar();
    SimpleTimeZone kstZone = new SimpleTimeZone(9 * 60 * 60 * 1000, "Asia/Seoul");
    gc.setTimeZone(kstZone);
    return gc.getTimeInMillis();
}

/**
 * 특수문자 처리 함
 * @param
 * @return boolean
 * @exception SQLException if a database error occurs.
 */
 public static String getLang(String lang){
 	String result="";
	//if((CodeConstant.LANGUAGE_KO).equals(lang)){
 	if("ko".equals(lang)){
		result="K";
	}else{
		result="C";
	}
    return result;
}
    
 
 /**
	 * format을 받아 알맞은 형태로 년월일시를 반환한다.
	 * 
	 * @param format
	 * @param field
	 * @param offset
	 * @return String 데이트 포맷에 따른 년월일시
	 */
	public static String getFormatDate(String format, int field, int offset) {
	
		SimpleTimeZone stz = new SimpleTimeZone(RAWOFFSET, "KST");
		Calendar rightNow = Calendar.getInstance(stz);
	
		if (offset != 0) {
			rightNow.add(field, offset);
		}
	
		Date rightDate = rightNow.getTime();
		SimpleDateFormat sdf = new SimpleDateFormat(format, Locale.KOREAN);
		sdf.setTimeZone(stz);
	
		return sdf.format(rightDate);
	}

	/**
	 * 현재 년을 yyyy 포맷으로 리턴한다
	 * 
	 * @return String yyyy 포맷의 년
	 */
	public static String getYear() {
		return getFormatDate("yyyy", 0, 0);
	}

	/**
	 * 현재 년월을 yyyyMM 포맷으로 리턴한다
	 * 
	 * @return String yyyy\MM 포맷의 년월
	 */
	public static String getYyyyMm() {
		return getFormatDate("yyyyMM", 0, 0);
	}
	
	/**
	 * 일 수를 구한다.
	 * 
	 * @param From
	 *            일. 형식은 'YYYYMMDD'이다.
	 * @param To
	 *            일. 형식은 'YYYYMMDD'이다.
	 * @return 일 수.
	 * @exception java.text.ParseException
	 */
	public static int getDayBetween(String fromDt, String toDt)
			throws java.text.ParseException {

		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd", Locale.KOREA);

		Date d1 = sdf.parse(fromDt);
		Date d2 = sdf.parse(toDt);

		long from = d1.getTime();
		long to = d2.getTime();

		long times = to - from;

		int days = (int) (times / DAY_SECOND);

		return days;
	}
	
	
	/**
	 * 월 수를 구한다.
	 * 
	 * @param From
	 *            월. 형식은 'YYYYMM'이다.
	 * @param To
	 *            월. 형식은 'YYYYMM'이다.
	 * @return 월 수.
	 * @exception java.text.ParseException
	 */
	public static int getMonthsBetween(String fromDt, String toDt)
			throws java.text.ParseException {

		int strtYear 	= Integer.parseInt(fromDt.substring(0,4));
		int strtMonth 	= Integer.parseInt(fromDt.substring(4,6));

		int endYear 	= Integer.parseInt(toDt.substring(0,4));
		int endMonth 	= Integer.parseInt(toDt.substring(4,6));

		int month = (endYear - strtYear)* 12 + (endMonth - strtMonth);

		return month;
	}
	
	
}
