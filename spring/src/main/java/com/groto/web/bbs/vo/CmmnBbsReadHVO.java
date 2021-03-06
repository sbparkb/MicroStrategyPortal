package com.groto.web.bbs.vo;

import java.io.Serializable;
import java.util.Date;


/**
 *  Class Name  :  CmmnBbsReadHVO
 *  Description :  게시글 조회 히스토리 모델
 *
 *  Modification Information
 *
 *  Mod Date      Modifier Description
 *  -----------   -------- ---------------------------
 *  2015. 1. 23.  rnd      Generation
 *
 * @author : rnd@netville.co.kr
 * @date : 2015. 1. 23. 오후 2:37:13
 * @version : 1.0
 */ 

public class CmmnBbsReadHVO implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -7411703618001114872L;
	/**
	 * This field was generated by Apache iBATIS ibator. This field corresponds to the database column JVPOSAPP.TBL_CMMNBBSREAD_H.BBS_ID
	 * @ibatorgenerated  Wed Nov 05 19:32:56 KST 2014
	 */
	private String bbsId;
	/**
	 * This field was generated by Apache iBATIS ibator. This field corresponds to the database column JVPOSAPP.TBL_CMMNBBSREAD_H.BBS_SEQ_NO
	 * @ibatorgenerated  Wed Nov 05 19:32:56 KST 2014
	 */
	private String bbsSeqNo;
	/**
	 * This field was generated by Apache iBATIS ibator. This field corresponds to the database column JVPOSAPP.TBL_CMMNBBSREAD_H.USER_ID
	 * @ibatorgenerated  Wed Nov 05 19:32:56 KST 2014
	 */
	private String userId;
	/**
	 * This field was generated by Apache iBATIS ibator. This field corresponds to the database column JVPOSAPP.TBL_CMMNBBSREAD_H.READNG_DATE
	 * @ibatorgenerated  Wed Nov 05 19:32:56 KST 2014
	 */
	private String readngDate;
	/**
	 * This field was generated by Apache iBATIS ibator. This field corresponds to the database column JVPOSAPP.TBL_CMMNBBSREAD_H.REGIST_ID
	 * @ibatorgenerated  Wed Nov 05 19:32:56 KST 2014
	 */
	private String registId;
	/**
	 * This field was generated by Apache iBATIS ibator. This field corresponds to the database column JVPOSAPP.TBL_CMMNBBSREAD_H.REGIST_DATE
	 * @ibatorgenerated  Wed Nov 05 19:32:56 KST 2014
	 */
	private Date registDate;
	/**
	 * This method was generated by Apache iBATIS ibator. This method returns the value of the database column JVPOSAPP.TBL_CMMNBBSREAD_H.BBS_ID
	 * @return  the value of JVPOSAPP.TBL_CMMNBBSREAD_H.BBS_ID
	 * @ibatorgenerated  Wed Nov 05 19:32:56 KST 2014
	 */
	public String getBbsId() {
		return bbsId;
	}

	/**
	 * This method was generated by Apache iBATIS ibator. This method sets the value of the database column JVPOSAPP.TBL_CMMNBBSREAD_H.BBS_ID
	 * @param bbsId  the value for JVPOSAPP.TBL_CMMNBBSREAD_H.BBS_ID
	 * @ibatorgenerated  Wed Nov 05 19:32:56 KST 2014
	 */
	public void setBbsId(String bbsId) {
		this.bbsId = bbsId;
	}

	/**
	 * This method was generated by Apache iBATIS ibator. This method returns the value of the database column JVPOSAPP.TBL_CMMNBBSREAD_H.BBS_SEQ_NO
	 * @return  the value of JVPOSAPP.TBL_CMMNBBSREAD_H.BBS_SEQ_NO
	 * @ibatorgenerated  Wed Nov 05 19:32:56 KST 2014
	 */
	public String getBbsSeqNo() {
		return bbsSeqNo;
	}

	/**
	 * This method was generated by Apache iBATIS ibator. This method sets the value of the database column JVPOSAPP.TBL_CMMNBBSREAD_H.BBS_SEQ_NO
	 * @param bbsSeqNo  the value for JVPOSAPP.TBL_CMMNBBSREAD_H.BBS_SEQ_NO
	 * @ibatorgenerated  Wed Nov 05 19:32:56 KST 2014
	 */
	public void setBbsSeqNo(String bbsSeqNo) {
		this.bbsSeqNo = bbsSeqNo;
	}

	/**
	 * This method was generated by Apache iBATIS ibator. This method returns the value of the database column JVPOSAPP.TBL_CMMNBBSREAD_H.USER_ID
	 * @return  the value of JVPOSAPP.TBL_CMMNBBSREAD_H.USER_ID
	 * @ibatorgenerated  Wed Nov 05 19:32:56 KST 2014
	 */
	public String getUserId() {
		return userId;
	}

	/**
	 * This method was generated by Apache iBATIS ibator. This method sets the value of the database column JVPOSAPP.TBL_CMMNBBSREAD_H.USER_ID
	 * @param userId  the value for JVPOSAPP.TBL_CMMNBBSREAD_H.USER_ID
	 * @ibatorgenerated  Wed Nov 05 19:32:56 KST 2014
	 */
	public void setUserId(String userId) {
		this.userId = userId;
	}
	/**
	 * This method was generated by Apache iBATIS ibator. This method returns the value of the database column JVPOSAPP.TBL_CMMNBBSREAD_H.READNG_DATE
	 * @return  the value of JVPOSAPP.TBL_CMMNBBSREAD_H.READNG_DATE
	 * @ibatorgenerated  Wed Nov 05 19:32:56 KST 2014
	 */
	public String getReadngDate() {
		return readngDate;
	}

	/**
	 * This method was generated by Apache iBATIS ibator. This method sets the value of the database column JVPOSAPP.TBL_CMMNBBSREAD_H.READNG_DATE
	 * @param readngDate  the value for JVPOSAPP.TBL_CMMNBBSREAD_H.READNG_DATE
	 * @ibatorgenerated  Wed Nov 05 19:32:56 KST 2014
	 */
	public void setReadngDate(String readngDate) {
		this.readngDate = readngDate;
	}

	/**
	 * This method was generated by Apache iBATIS ibator. This method returns the value of the database column JVPOSAPP.TBL_CMMNBBSREAD_H.REGIST_ID
	 * @return  the value of JVPOSAPP.TBL_CMMNBBSREAD_H.REGIST_ID
	 * @ibatorgenerated  Wed Nov 05 19:32:56 KST 2014
	 */
	public String getRegistId() {
		return registId;
	}

	/**
	 * This method was generated by Apache iBATIS ibator. This method sets the value of the database column JVPOSAPP.TBL_CMMNBBSREAD_H.REGIST_ID
	 * @param registId  the value for JVPOSAPP.TBL_CMMNBBSREAD_H.REGIST_ID
	 * @ibatorgenerated  Wed Nov 05 19:32:56 KST 2014
	 */
	public void setRegistId(String registId) {
		this.registId = registId;
	}

	/**
	 * This method was generated by Apache iBATIS ibator. This method returns the value of the database column JVPOSAPP.TBL_CMMNBBSREAD_H.REGIST_DATE
	 * @return  the value of JVPOSAPP.TBL_CMMNBBSREAD_H.REGIST_DATE
	 * @ibatorgenerated  Wed Nov 05 19:32:56 KST 2014
	 */
	public Date getRegistDate() {
		return registDate;
	}

	/**
	 * This method was generated by Apache iBATIS ibator. This method sets the value of the database column JVPOSAPP.TBL_CMMNBBSREAD_H.REGIST_DATE
	 * @param registDate  the value for JVPOSAPP.TBL_CMMNBBSREAD_H.REGIST_DATE
	 * @ibatorgenerated  Wed Nov 05 19:32:56 KST 2014
	 */
	public void setRegistDate(Date registDate) {
		this.registDate = registDate;
	}

	@Override
	public String toString() {
		return "CmmnBbsReadHVO [bbsId=" + bbsId + ", bbsSeqNo=" + bbsSeqNo
				+ ", userId=" + userId + ", readngDate=" + readngDate
				+ ", registId=" + registId + ", registDate=" + registDate + "]";
	}
	
	
}
