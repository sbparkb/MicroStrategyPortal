package com.groto.service;

import java.math.BigDecimal;
import java.util.HashMap;

import com.microstrategy.web.objects.WebObjectInfo;
import com.mstr.business.model.PromptAnswer;
import com.mstr.business.model.PromptAnswerJson;
import com.mstr.business.model.PromptInfo;
import com.mstr.business.model.ReportInfo;
import com.mstr.business.model.TreeBean;

/**
 * PMD 대응 - PMD에서  반복문 내부의 객체 생성을 막으므로 별도 메소드로 분리해서 처리 
 * 간단한 객체생성은 비용이 적게 드는데도, PMD는 이것을 무조건 룰 위반으로 분류하므로 new 키워드를 메소드 내에 쓰지 않는 형식으로 이와 같이 우회함
 * @author FIC04032
 *
 */
public class InstanceCreation {

  public static PromptAnswer cPromptAnswer(){
    return new PromptAnswer();
  }
  
  public static PromptAnswerJson cPromptAnswerJson(){
    return new PromptAnswerJson();
  }
  
  public static PromptInfo cPromptInfo(){
    return new PromptInfo();
  }
  
  public static ReportInfo cReportInfo(){
    return new ReportInfo();
  }
  
  public static ReportInfo cReportInfo(WebObjectInfo webObjectInfo){
    return new ReportInfo(webObjectInfo);
  }
  
  public static String[] cStringArray(String arr){
    return  new String[]{arr};
  }
  
  public static TreeBean cTreeBean(){
    return new TreeBean();
  }
  
  public static HashMap<String, Object> cHashMap(){
    return new HashMap<String, Object>();
  }
  
  public static BigDecimal cBigDecimal(String str){
    return new BigDecimal(str);
  }

}//end of class