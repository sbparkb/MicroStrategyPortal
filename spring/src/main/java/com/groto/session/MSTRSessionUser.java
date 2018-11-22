package com.groto.session;

/**
 *  Class Name  :  MSTRSessionUser
 *  Description :  MSTR 세션 유저 
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

public abstract interface MSTRSessionUser {

	public static final String ATTRIBUTE_NAME = "MSTRSessionUser";
	
	public abstract String getMstrUserID();
	
	public abstract void setMstrUserID(String mstrUserID);
	
	public abstract String getMstrUserPW();
	
	public abstract void setMstrUserPW(String mstrUserPW);
	
	public String getMstrServerName();

	public void setMstrServerName(String mstrServerName);

	public String getMstrProjectName();

	public void setMstrProjectName(String mstrProjectName);
	
	public String getNotiSeq();
	
	public void setNotiSeq(String notiSeq);
	
	public boolean isExcelAuth();
	
	public void setExcelAuth(boolean isExcelAuth);
	
  public abstract String getMstrSessionState();
  
  public abstract void setMstrSessionState(String mstrSessionState);
	
}
