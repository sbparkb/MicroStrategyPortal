package com.groto.web.bbs.vo;


import java.util.ArrayList;
import java.util.Arrays;

import org.springframework.web.multipart.MultipartFile;

import com.groto.cmm.base.BbsBaseForm;

/**
 *  Class Name  :  CmmnBbsFileVO
 *  Description :  게시물 첨부파일 공통 
 *
 *  Modification Information
 *
 *  Mod Date      Modifier Description
 *  -----------   -------- ---------------------------
 *  2015. 9. 23.  lastpice Generation
 *
 * @author : rnd@netville.co.kr
 * @date : 2014. 7. 2. 오후 2:56:12
 * @version :1.0
 */
 
public class CmmnBbsFileVO extends BbsBaseForm {

    private static final long serialVersionUID = 6888832121496709000L;
    private String[] fileNamedata;
    private String[] dsplyName;
    private String[] fileExt;
    private String[] tempPath;
    private String[] filesizedata;
    
    /*디비에 저장할 데이터*/
    private String onefileNamedata;
    private String onedsplyName;
    private String onefileExt;
    private String onetempPath;
    private String onefilesizedata;
    private String onefileUrl;
    private String onefilePhysiclPath;
    private Integer atchFileSeqNo;
    private String delYn;
    private String registId;
    private String registDate;
    private String updtId;
    private String updtDate;
    private String dwldCnt;
    private String masterId;
    private String masterDiv;
    
    private String dsplyNm;
    private String atchFileNm;
    private String atchFileUrl;
    private String atchFileSize;
    private String atchFilePhysiclPath;
    private String atchFileExt;
    
    private ArrayList<String> atchFileIds; 
    
    private String imageDelYn;
    
    /**
     * 첨부 파일
     */
    protected MultipartFile upload;
    
    
    private String userId;
    
	public String getOnefileNamedata() {
		return onefileNamedata;
	}
	public void setOnefileNamedata(String onefileNamedata) {
		this.onefileNamedata = onefileNamedata;
	}
	public String getOnedsplyName() {
		return onedsplyName;
	}
	public void setOnedsplyName(String onedsplyName) {
		this.onedsplyName = onedsplyName;
	}
	public String getOnefileExt() {
		return onefileExt;
	}
	public void setOnefileExt(String onefileExt) {
		this.onefileExt = onefileExt;
	}
	public String getOnetempPath() {
		return onetempPath;
	}
	public void setOnetempPath(String onetempPath) {
		this.onetempPath = onetempPath;
	}
	public String getOnefilesizedata() {
		return onefilesizedata;
	}
	public void setOnefilesizedata(String onefilesizedata) {
		this.onefilesizedata = onefilesizedata;
	}
	public String[] getFileNamedata() {
	  String [] arrfileNamedata = Arrays.copyOf(fileNamedata, fileNamedata.length);
		return arrfileNamedata;
	}
	public void setFileNamedata(String[] fileNamedata) {
    if (fileNamedata == null) {
      this.fileNamedata = null;
    } else {
      this.fileNamedata = new String[fileNamedata.length];
      System.arraycopy(fileNamedata, 0, this.fileNamedata, 0, fileNamedata.length);
    }
	}
	public String[] getDsplyName() {
	  String [] arrDsplyName = Arrays.copyOf(dsplyName, dsplyName.length);
		return arrDsplyName;
	}
	public void setDsplyName(String[] dsplyName) {
    if (dsplyName == null) {
      this.dsplyName = null;
    } else {
      this.dsplyName = new String[dsplyName.length];
      System.arraycopy(dsplyName, 0, this.dsplyName, 0, dsplyName.length);
    }
	}
	public String[] getFileExt() {
	  String [] arrFileExt = Arrays.copyOf(fileExt, fileExt.length);
		return arrFileExt;
	}
	public void setFileExt(String[] fileExt) {
    if (fileExt == null) {
      this.fileExt = null;
    } else {
      this.fileExt = new String[fileExt.length];
      System.arraycopy(fileExt, 0, this.fileExt, 0, fileExt.length);
    }
	}
	public String[] getTempPath() {
	  String [] arrTempPath = Arrays.copyOf(tempPath, tempPath.length);
		return arrTempPath;
	}
	public void setTempPath(String[] tempPath) {
    if (tempPath == null) {
      this.tempPath = null;
    } else {
      this.tempPath = new String[tempPath.length];
      System.arraycopy(tempPath, 0, this.tempPath, 0, tempPath.length);
    }
	}
	public String[] getFilesizedata() {
	  String [] arrFilesizedata = Arrays.copyOf(filesizedata, filesizedata.length);
		return arrFilesizedata;
	}
  public void setFilesizedata(String[] filesizedata) {
    if (filesizedata == null) {
      this.filesizedata = null;
    } else {
      this.filesizedata = new String[filesizedata.length];
      System.arraycopy(filesizedata, 0, this.filesizedata, 0, filesizedata.length);
    }
  }
	public String getOnefileUrl() {
		return onefileUrl;
	}
	public void setOnefileUrl(String onefileUrl) {
		this.onefileUrl = onefileUrl;
	}
	public String getOnefilePhysiclPath() {
		return onefilePhysiclPath;
	}
	public void setOnefilePhysiclPath(String onefilePhysiclPath) {
		this.onefilePhysiclPath = onefilePhysiclPath;
	}
	public Integer getAtchFileSeqNo() {
		return atchFileSeqNo;
	}
	public void setAtchFileSeqNo(Integer atchFileSeqNo) {
		this.atchFileSeqNo = atchFileSeqNo;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getDelYn() {
		return delYn;
	}
	public void setDelYn(String delYn) {
		this.delYn = delYn;
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
	public String getDwldCnt() {
		return dwldCnt;
	}
	public void setDwldCnt(String dwldCnt) {
		this.dwldCnt = dwldCnt;
	}
	public String getDsplyNm() {
		return dsplyNm;
	}
	public void setDsplyNm(String dsplyNm) {
		this.dsplyNm = dsplyNm;
	}
	public String getAtchFileNm() {
		return atchFileNm;
	}
	public void setAtchFileNm(String atchFileNm) {
		this.atchFileNm = atchFileNm;
	}
	public String getAtchFileUrl() {
		return atchFileUrl;
	}
	public void setAtchFileUrl(String atchFileUrl) {
		this.atchFileUrl = atchFileUrl;
	}
	public String getAtchFilePhysiclPath() {
		return atchFilePhysiclPath;
	}
	public void setAtchFilePhysiclPath(String atchFilePhysiclPath) {
		this.atchFilePhysiclPath = atchFilePhysiclPath;
	}
	public String getAtchFileSize() {
		return atchFileSize;
	}
	public void setAtchFileSize(String atchFileSize) {
		this.atchFileSize = atchFileSize;
	}
	public ArrayList<String> getAtchFileIds() {
		return atchFileIds;
	}
	public void setAtchFileIds(ArrayList<String> atchFileIds) {
		this.atchFileIds = atchFileIds;
	}
	
	public MultipartFile getUpload() {
		return upload;
	}
	public void setUpload(MultipartFile upload) {
		this.upload = upload;
	}
	
	public String getAtchFileExt() {
		return atchFileExt;
	}
	public void setAtchFileExt(String atchFileExt) {
		this.atchFileExt = atchFileExt;
	}
	
	
	public String getImageDelYn() {
		return imageDelYn;
	}
	public void setImageDelYn(String imageDelYn) {
		this.imageDelYn = imageDelYn;
	}
	public String getMasterId() {
		return masterId;
	}
	public void setMasterId(String masterId) {
		this.masterId = masterId;
	}
	public String getMasterDiv() {
		return masterDiv;
	}
	public void setMasterDiv(String masterDiv) {
		this.masterDiv = masterDiv;
	}
	@Override
	public String toString() {
		return "CmmnBbsFileVO [fileNamedata=" + Arrays.toString(fileNamedata)
				+ ", dsplyName=" + Arrays.toString(dsplyName) + ", fileExt="
				+ Arrays.toString(fileExt) + ", tempPath="
				+ Arrays.toString(tempPath) + ", filesizedata="
				+ Arrays.toString(filesizedata) + ", onefileNamedata="
				+ onefileNamedata + ", onedsplyName=" + onedsplyName
				+ ", onefileExt=" + onefileExt + ", onetempPath=" + onetempPath
				+ ", onefilesizedata=" + onefilesizedata + ", onefileUrl="
				+ onefileUrl + ", onefilePhysiclPath=" + onefilePhysiclPath
				+ ", atchFileSeqNo=" + atchFileSeqNo + ", delYn=" + delYn
				+ ", registId=" + registId + ", registDate=" + registDate
				+ ", updtId=" + updtId + ", updtDate=" + updtDate
				+ ", dwldCnt=" + dwldCnt + ", masterId=" + masterId
				+ ", masterDiv=" + masterDiv + ", dsplyNm=" + dsplyNm
				+ ", atchFileNm=" + atchFileNm + ", atchFileUrl=" + atchFileUrl
				+ ", atchFileSize=" + atchFileSize + ", atchFilePhysiclPath="
				+ atchFilePhysiclPath + ", atchFileExt=" + atchFileExt
				+ ", atchFileIds=" + atchFileIds + ", imageDelYn=" + imageDelYn
				+ ", upload=" + upload + ", userId=" + userId + "]";
	}

}
