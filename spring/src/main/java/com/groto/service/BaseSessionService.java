package com.groto.service;

import org.springframework.stereotype.Service;

/**
 *  Class Name : BaseSessionService.java
 *  Description : 세션 서비스 인터페이스
 *  
 *  Modification Information
 * 
 *  Mod Date      Modifier Description
 *  -----------   -------- ---------------------------
 *  2012. 2. 25.  jjpark    Generation
 *
 *  @author jjpark
 *  @since 2012. 2. 25.
 *  @version 1.0
 */
@Service
public abstract interface BaseSessionService {

  public static final int MSTR_SVR_SESSION_NO_PWD = -1;
  public static final int MSTR_SVR_SESSION_FAIL = -2;
  public static final int MSTR_SVR_SESSION_C_FAIL = -3;

  public static final long ERR_CD_MSTR_LOGIN_FAIL = -2147216959;
  public static final long ERR_CD_PRJ_ACCESS_DENIED = -2147214578;
  public static final long ERR_CD_PT_ACCESS_DENIED = -2147214579;

  /**
   * 세션 생성
   * 
   * @return
   */
  public abstract int createServerSession() throws Exception;

  /**
   * 세션 삭제
   * 
   * @throws Exception
   */
  public abstract void closeServerSession() throws Exception;


//  public abstract int createDefaultServerSession() throws Exception;

}
