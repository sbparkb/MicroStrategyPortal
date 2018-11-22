package com.groto.web.bbs.vo;


import java.util.List;

import com.groto.cmm.base.BbsBaseForm;
 
/**
 *  Class Name  :  CmmnBbsVO
 *  Description :   게시글 관리 공통 모델
 *
 *  Modification Information
 *
 *  Mod Date      Modifier Description
 *  -----------   -------- ---------------------------
 *  2015. 10. 7.  lastpice Generation
 *
 * @author : lastpice@separtners.co.kr
 * @date : 2015. 10. 7. 오후 2:00:21
 * @version : 
 */ 


public class CmmnBbsVO extends BbsBaseForm {

    private static final long serialVersionUID = 6888832121496709000L;
    
    private String title;
    private String editdata;
    private String noticeYn;
    private String atchFileYn="N";
    private String userId;
    private String bbsSeqNo;
    private String bbsId;
    
    private String bbsSj;
    private String bbsCn;
    private String delYn;
    private int readngCnt;
    private int cometCnt;
    private String registId;
    private String registDate;
    private String updtId;
    private String updtDate;
    private int no;
    private String registName;
    private String updtName;
    private String lang;
    private Integer listCnt;
    
    private String searchType;
    private String searchVal;
    
    private String noticeStrYmd;
    private String noticeStrTime;
    private String noticeEndYmd;
    private String noticeEndTime;
    
    private String readCnt;
    
    
    private int isNew; // 읽지않은 게시물이거나 등록한지 하루가 경과되지 않은 게시글
    
    private String bbsReadUser;
    
    private String totSearchVal;
    
    private String bbsName;
    
    private String bbsDivCode;
    private String bbsDivCodeName;
    
    
    private List<CmmnBbsFileVO> files;
    
    private String isNotice;
    
    private String masterDiv;


	public String getTitle() {
		return title;
	}


	public void setTitle(String title) {
		this.title = title;
	}


	public String getEditdata() {
		return editdata;
	}


	public void setEditdata(String editdata) {
		this.editdata = editdata;
	}


	public String getAtchFileYn() {
		return atchFileYn;
	}


	public void setAtchFileYn(String atchFileYn) {
		this.atchFileYn = atchFileYn;
	}


	public String getUserId() {
		return userId;
	}


	public void setUserId(String userId) {
		this.userId = userId;
	}


	public String getBbsSeqNo() {
		return bbsSeqNo;
	}


	public void setBbsSeqNo(String bbsSeqNo) {
		this.bbsSeqNo = bbsSeqNo;
	}


	public String getBbsId() {
		return bbsId;
	}


	public void setBbsId(String bbsId) {
		this.bbsId = bbsId;
	}


	public String getBbsSj() {
		return bbsSj;
	}


	public void setBbsSj(String bbsSj) {
		this.bbsSj = bbsSj;
	}


	public String getBbsCn() {
		return bbsCn;
	}


	public void setBbsCn(String bbsCn) {
		this.bbsCn = bbsCn;
	}


	public String getDelYn() {
		return delYn;
	}


	public void setDelYn(String delYn) {
		this.delYn = delYn;
	}


	public int getReadngCnt() {
		return readngCnt;
	}


	public void setReadngCnt(int readngCnt) {
		this.readngCnt = readngCnt;
	}


	public int getCometCnt() {
		return cometCnt;
	}


	public void setCometCnt(int cometCnt) {
		this.cometCnt = cometCnt;
	}


	public String getRegistId() {
		return registId;
	}


	public void setRegistId(String registId) {
		this.registId = registId;
	}


	public String getRegistDate() {
		return registDate;
	}


	public void setRegistDate(String registDate) {
		this.registDate = registDate;
	}


	public String getUpdtId() {
		return updtId;
	}


	public void setUpdtId(String updtId) {
		this.updtId = updtId;
	}


	public String getUpdtDate() {
		return updtDate;
	}


	public void setUpdtDate(String updtDate) {
		this.updtDate = updtDate;
	}


	public int getNo() {
		return no;
	}


	public void setNo(int no) {
		this.no = no;
	}


	public String getRegistName() {
		return registName;
	}


	public void setRegistName(String registName) {
		this.registName = registName;
	}


	public String getUpdtName() {
		return updtName;
	}


	public void setUpdtName(String updtName) {
		this.updtName = updtName;
	}


	public String getLang() {
		return lang;
	}


	public void setLang(String lang) {
		this.lang = lang;
	}


	public Integer getListCnt() {
		return listCnt;
	}


	public void setListCnt(Integer listCnt) {
		this.listCnt = listCnt;
	}


	public String getSearchType() {
		return searchType;
	}


	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}


	public String getSearchVal() {
		return searchVal;
	}


	public void setSearchVal(String searchVal) {
		this.searchVal = searchVal;
	}


	public String getNoticeStrYmd() {
		return noticeStrYmd;
	}


	public void setNoticeStrYmd(String noticeStrYmd) {
		this.noticeStrYmd = noticeStrYmd;
	}


	public String getNoticeStrTime() {
		return noticeStrTime;
	}


	public void setNoticeStrTime(String noticeStrTime) {
		this.noticeStrTime = noticeStrTime;
	}


	public String getNoticeEndYmd() {
		return noticeEndYmd;
	}


	public void setNoticeEndYmd(String noticeEndYmd) {
		this.noticeEndYmd = noticeEndYmd;
	}


	public String getNoticeEndTime() {
		return noticeEndTime;
	}


	public void setNoticeEndTime(String noticeEndTime) {
		this.noticeEndTime = noticeEndTime;
	}


	public int getIsNew() {
		return isNew;
	}


	public void setIsNew(int isNew) {
		this.isNew = isNew;
	}


	public String getBbsReadUser() {
		return bbsReadUser;
	}


	public void setBbsReadUser(String bbsReadUser) {
		this.bbsReadUser = bbsReadUser;
	}


	public List<CmmnBbsFileVO> getFiles() {
		return files;
	}


	public void setFiles(List<CmmnBbsFileVO> files) {
		this.files = files;
	}


	public String getReadCnt() {
		return readCnt;
	}


	public void setReadCnt(String readCnt) {
		this.readCnt = readCnt;
	}


	public String getTotSearchVal() {
		return totSearchVal;
	}


	public void setTotSearchVal(String totSearchVal) {
		this.totSearchVal = totSearchVal;
	}


	public String getBbsName() {
		return bbsName;
	}


	public void setBbsName(String bbsName) {
		this.bbsName = bbsName;
	}


	public String getBbsDivCode() {
		return bbsDivCode;
	}


	public void setBbsDivCode(String bbsDivCode) {
		this.bbsDivCode = bbsDivCode;
	}


	@Override
	public String toString() {
		return "CmmnBbsVO [title=" + title + ", editdata=" + editdata
				+ ", noticeYn=" + noticeYn + ", atchFileYn=" + atchFileYn
				+ ", userId=" + userId + ", bbsSeqNo=" + bbsSeqNo + ", bbsId="
				+ bbsId + ", bbsSj=" + bbsSj + ", bbsCn=" + bbsCn + ", delYn="
				+ delYn + ", readngCnt=" + readngCnt + ", cometCnt=" + cometCnt
				+ ", registId=" + registId + ", registDate=" + registDate
				+ ", updtId=" + updtId + ", updtDate=" + updtDate + ", no="
				+ no + ", registName=" + registName + ", updtName=" + updtName
				+ ", lang=" + lang + ", listCnt=" + listCnt + ", searchType="
				+ searchType + ", searchVal=" + searchVal + ", noticeStrYmd="
				+ noticeStrYmd + ", noticeStrTime=" + noticeStrTime
				+ ", noticeEndYmd=" + noticeEndYmd + ", noticeEndTime="
				+ noticeEndTime + ", readCnt=" + readCnt + ", isNew=" + isNew
				+ ", bbsReadUser=" + bbsReadUser + ", totSearchVal="
				+ totSearchVal + ", bbsName=" + bbsName + ", bbsDivCode="
				+ bbsDivCode + ", files=" + files + "]";
	}


	public String getNoticeYn() {
		return noticeYn;
	}


	public void setNoticeYn(String noticeYn) {
		this.noticeYn = noticeYn;
	}


	public String getIsNotice() {
		return isNotice;
	}


	public void setIsNotice(String isNotice) {
		this.isNotice = isNotice;
	}


	public String getMasterDiv() {
		return masterDiv;
	}


	public void setMasterDiv(String masterDiv) {
		this.masterDiv = masterDiv;
	}


	public String getBbsDivCodeName() {
		return bbsDivCodeName;
	}


	public void setBbsDivCodeName(String bbsDivCodeName) {
		this.bbsDivCodeName = bbsDivCodeName;
	}



}
