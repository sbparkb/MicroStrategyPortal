package com.groto.cmm.util;

/**
 *  Class Name  :  CmmCode
 *  Description :  게시판 공통 코드 
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
 
public enum CmmCode {

  // 공통 코드 대분류

  COMM_SEQ_ID_ATTCH("ATTCHSEQ", "첨부파일 시퀀스 아이디")
  , COMM_SEQ_ID_BBSCON("BBSCONSQ", "게시글 시퀀스 아이디")
  , ADMIN_USER_ID("WEB_ADMIN", "BI 포탈 관리자 그룹")  
  , BBS_ID_BBS00001("BBS00001", "공지사항")  
  , ATCH_MST_DIV_ATCHGB01("ATCHGB01", "게시판")  
  ;

  CmmCode(String attributeKey, String attributeName) {
    this.attributeKey = attributeKey;
    this.attributeName = attributeName;
  }

  private final String attributeKey;

  private final String attributeName;

  public String getKey() {
    return attributeKey;
  }

  /**
   * @return
   */
  public String getName() {
    return attributeName;
  }

  @Override
  public String toString() {
    return String.format("Path Key:%s, Path Variable:%s", getKey(), getName());
  }
}
