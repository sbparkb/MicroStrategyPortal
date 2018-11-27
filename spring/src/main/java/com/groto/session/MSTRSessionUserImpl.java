package com.groto.session;

import java.io.Serializable;

/**
 * Class Name : MSTRSessionUserImpl Description : MSTR 세션 유저
 *
 * Modification Information
 *
 * Mod Date Modifier Description ----------- --------
 * --------------------------- 2015. 9. 23. lastpice Generation
 *
 * @author lastpice
 * @since 2015. 9. 23. 오후 1:33:07
 * @version 1.0
 */

public class MSTRSessionUserImpl implements MSTRSessionUser, Serializable {

	private static final long serialVersionUID = 2994940876335363962L;

	private String mstrUserID;

	private String mstrUserPW;

	private String mstrSessionState;

	private String mstrServerName;

	private String mstrProjectName;

	private String gnbMenuId;

	private String portalId;

	private String userId;

	private String userName;

	private String mstrGroupId;

	private String webAdminGrp;

	private transient boolean isExcelAuth;

	private String notiSeq; // 공지사항 팝업 seq

	public boolean isExcelAuth() {
		return isExcelAuth;
	}

	public void setExcelAuth(boolean isExcelAuth) {
		this.isExcelAuth = isExcelAuth;
	}

	/**
	 * @return the mstrUserID
	 */
	public String getMstrUserID() {
		return mstrUserID;
	}

	/**
	 * @param mstrUserID the mstrUserID to set
	 */
	public void setMstrUserID(String mstrUserID) {
		this.mstrUserID = mstrUserID;
	}

	/**
	 * @return the mstrUserPW
	 */
	public String getMstrUserPW() {
		return mstrUserPW;
	}

	/**
	 * @param mstrUserPW the mstrUserPW to set
	 */
	public void setMstrUserPW(String mstrUserPW) {
		this.mstrUserPW = mstrUserPW;
	}

	/**
	 * @return the mstrSessionState
	 */
	public String getMstrSessionState() {
		return mstrSessionState;
	}

	/**
	 * @param mstrSessionState the mstrSessionState to set
	 */
	public void setMstrSessionState(String mstrSessionState) {
		this.mstrSessionState = mstrSessionState;
	}

	public String getMstrServerName() {
		return mstrServerName;
	}

	public void setMstrServerName(String mstrServerName) {
		this.mstrServerName = mstrServerName;
	}

	public String getMstrProjectName() {
		return mstrProjectName;
	}

	public void setMstrProjectName(String mstrProjectName) {
		this.mstrProjectName = mstrProjectName;
	}

	public String getGnbMenuId() {
		return gnbMenuId;
	}

	public void setGnbMenuId(String gnbMenuId) {
		this.gnbMenuId = gnbMenuId;
	}

	public String getPortalId() {
		return portalId;
	}

	public void setPortalId(String portalId) {
		this.portalId = portalId;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getMstrGroupId() {
		return mstrGroupId;
	}

	public void setMstrGroupId(String mstrGroupId) {
		this.mstrGroupId = mstrGroupId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getWebAdminGrp() {
		return webAdminGrp;
	}

	public void setWebAdminGrp(String webAdminGrp) {
		this.webAdminGrp = webAdminGrp;
	}

	public String getNotiSeq() {
		return notiSeq;
	}

	public void setNotiSeq(String notiSeq) {
		this.notiSeq = notiSeq;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Override
	public String toString() {
		return "MSTRSessionUserImpl [mstrUserID=" + mstrUserID + ", mstrUserPW=" + mstrUserPW + ", mstrSessionState="
				+ mstrSessionState + ", mstrServerName=" + mstrServerName + ", mstrProjectName=" + mstrProjectName
				+ ", gnbMenuId=" + gnbMenuId + ", portalId=" + portalId + ", userId=" + userId + ", userName="
				+ userName + ", mstrGroupId=" + mstrGroupId + ", webAdminGrp=" + webAdminGrp + ", notiSeq=" + notiSeq
				+ "]";
	}

}