package com.groto.web.cmm.vo;

/**
 * Class Name : UserVO Description : 포탈 사용자 정보 VO
 * 
 * Modification Information
 * 
 * Mod Date Modifier Description ----------- -------- --------------------------- 2015. 12. 14.
 * lastpice Generation
 * 
 * @author : lastpice@separtners.co.kr
 * @date : 2015. 12. 14. 오후 2:35:26
 * @version :
 */

public class UserVO { // extends BaseForm {

  /**
   * 
   */
  private static final long serialVersionUID = -9093296076220446451L;
  private String loginId;
  private String loginNm;

  private String compCd;
  private String loginPw;

  private String userGb;

  private String syEmail;

  public String getLoginId() {
    return loginId;
  }

  public void setLoginId(String loginId) {
    this.loginId = loginId;
  }

  public String getLoginNm() {
    return loginNm;
  }

  public void setLoginNm(String loginNm) {
    this.loginNm = loginNm;
  }

  public String getCompCd() {
    return compCd;
  }

  public void setCompCd(String compCd) {
    this.compCd = compCd;
  }

  public String getLoginPw() {
    return loginPw;
  }

  public void setLoginPw(String loginPw) {
    this.loginPw = loginPw;
  }

  public String getUserGb() {
    return userGb;
  }

  public void setUserGb(String userGb) {
    this.userGb = userGb;
  }

  public String getSyEmail() {
    return syEmail;
  }

  public void setSyEmail(String syEmail) {
    this.syEmail = syEmail;
  }


}
