package com.groto.web.login.vo;


import java.io.Serializable;
 
/**
 *  Class Name  :  SessionLoginVO
 *  Description :  로그인 세션 VO저장
 *
 *  Modification Information
 *
 *  Mod Date      Modifier Description
 *  -----------   -------- ---------------------------
 *  2014. 10. 28. jjangacejoy Generation
 *
 * @author : 장창용(jjangacejoy@netville.co.kr)
 * @date : 2014. 10. 28. 오후 1:50:03
 * @version : 1.0
 */ 

public class SessionLoginVO implements Serializable { // extends BaseForm

  private static final long serialVersionUID = 6888832121496709000L;

  public static final String SESSION_USER_NAME = "user"; // session name
  public static final String SESSION_KEY_LANGUAGE = "lang"; // 세션키 : 언어
  public static final String SESSION_KEY_TIMEZONE = "timezone"; // 세션키 : 타임존
  private String userId; // 사용자ID
 
  public String getUserId() {
    return userId;
  }

  public void setUserId(String userId) {
    this.userId = userId;
  }
 

}
