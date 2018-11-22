package com.groto.cmm.util;

import java.text.NumberFormat;
import java.util.List;
import java.util.Locale;

import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;

import com.mstr.business.model.PromptAnswerJson;

/**
 * Class Name : CmmUtil Description : 공통 유틸
 * 
 * Modification Information
 * 
 * Mod Date Modifier Description ----------- -------- --------------------------- 2015. 9. 23.
 * lastpice Generation
 * 
 * @author lastpice
 * @since 2015. 9. 23. 오후 1:33:07
 * @version 1.0
 */

public class CmmUtil {

  final static Locale CURRENT_LOCALE = Locale.KOREA;
  final static NumberFormat NUMBER_FORMAT = NumberFormat.getNumberInstance(CURRENT_LOCALE);

  /**
   * String s에 있는 alphabet을 모두 소문자로 바꾸어 return
   * 
   * @param s source String
   */
  public static String toLowerCase(String s) {
    int i;
    int j;
    char c;
    label0: {
      i = s.length();
      for (j = 0; j < i; j++) {
        char c1 = s.charAt(j);
        c = Character.toLowerCase(c1);
        if (c1 != c)
          break label0;
      }

      return s;
    }
    char ac[] = new char[i];
    int k;
    for (k = 0; k < j; k++)
      ac[k] = s.charAt(k);

    ac[k++] = c;
    for (; k < i; k++)
      ac[k] = Character.toLowerCase(s.charAt(k));

    String s1 = new String(ac, 0, i);
    return s1;
  }

  /**
   * String s에 있는 alphabet을 모두 대문자로 바꾸어 return
   * 
   * @param s source String
   */
  public static String toUpperCase(String s) {
    int i;
    int j;
    char c;
    label0: {
      i = s.length();
      for (j = 0; j < i; j++) {
        char c1 = s.charAt(j);
        c = Character.toUpperCase(c1);
        if (c1 != c)
          break label0;
      }

      return s;
    }
    char ac[] = new char[i];
    int k;
    for (k = 0; k < j; k++)
      ac[k] = s.charAt(k);

    ac[k++] = c;
    for (; k < i; k++)
      ac[k] = Character.toUpperCase(s.charAt(k));

    return new String(ac, 0, i);
  }

  
  /**********************************************************************
   * 설 명 : limit 자리수 만큼 글자를 잘라준다.
   * @param str   대상문자열
   * @param limit 자를 자릿수
   * @return      잘라진 문자열
   * @exception         LException
   **********************************************************************/
  public static String shortCutString(String paramStr, Integer limit){
    
          String str = paramStr;
          
          if (str == null || limit < 4) {
              return str;
          }

          int len = str.length();
          int cnt = 0;
          int index = 0;

          while (index < len && cnt < limit) {
              if (str.charAt(index) < 256) { // 1바이트 문자라면...
                  cnt++; // 길이 1 증가
              } else { // 2바이트 문자라면...
                  cnt += 2; // 길이 2 증가
              }
              index++;
          }

          if (index < len) {
              str = str.substring(0, index) + "..";
          }
    
      return str;
  }


  /**********************************************************************
   * 설 명 : String을 String 대문자로 리턴한다.
   **********************************************************************/
  public String toUpper(String paramStr) {

    String str = paramStr;

    if (str == null || str.equals("")) {
      return str;
    } else {
      str = str.toUpperCase().trim();

      return str;
    }
  }
  
  /**
   * String이 null인 경우 리턴할 문자로 바꾸어 준다.
   * 
   * @param string
   * @param null
   *            인 경우 리턴할 문자
   * @return String
   */
  public static String nvl(String str, String str2) {
    if (str == null || str.equals("")) {
      return str2;
    }

    return str;
  }

  public static String nvl(String str) {
    if (str == null) {
      return "";
    }

    return str;
  }
  
  public static String exMessage(Exception e){
    if(e.getMessage() != null){      
      return e.getMessage().replaceAll("[\r\n]","");
    }
    return "";
  }
  
  /**
   * 프롬프트 ajax 호출에 대한 응답 데이터 페이징 처리
   * @param list
   * @param retList
   * @param page
   * @param defaultPageSize
   * @return
   */
  public static List<PromptAnswerJson> promptPaging(List<PromptAnswerJson> list, List<PromptAnswerJson> retList, int page, int defaultPageSize){
	  
	  if(page > 0) {
      	int size = list.size();
      	int totalPage = size/defaultPageSize;
      	int startNum = (page - 1) * defaultPageSize;
      	int endNum = page * defaultPageSize; 
      	if(endNum > size) endNum = size;
      	for (int i = startNum; i < endNum; i++) {
      		if(i == startNum) {
      			list.get(i).setTotalPage(totalPage+1);
      		}
				retList.add(list.get(i));
			}
      	return retList;
      }else{
      	return list;
      }
  }
  
  /**
   * 암호화된 정보 복호화
   * @param envPass
   * @param message
   * @return
   */
  public static String decEncData(String envPass, String message) {
	    
	  StandardPBEStringEncryptor standardPBEStringEncryptor = new StandardPBEStringEncryptor();  
	  standardPBEStringEncryptor.setAlgorithm("PBEWithMD5AndDES");    
	  standardPBEStringEncryptor.setPassword(envPass);  //시스템 환경변수 ENV_PASS
	  String decryptedPass = standardPBEStringEncryptor.decrypt(message);
	  return decryptedPass;
  }

}
