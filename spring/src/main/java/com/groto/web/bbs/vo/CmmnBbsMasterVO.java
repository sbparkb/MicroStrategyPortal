package com.groto.web.bbs.vo;

import java.util.ArrayList;

import com.groto.cmm.base.BbsBaseForm;

/**
 *  Class Name  :  CmmnBbsMasterVO
 *  Description :  게시판 마스터 VO클래스
 *
 *  Modification Information
 *
 *  Mod Date      Modifier Description
 *  -----------   -------- ---------------------------
 *  2015. 9. 15.  lastpice Generation
 *
 * @author : lastpice@separtners.co.kr
 * @date : 2015. 9. 15. 오전 10:05:14
 * @version : 
 */
 
public class CmmnBbsMasterVO extends BbsBaseForm{
	
 
	private static final long serialVersionUID = -7404905396648085104L;
	private String bbsId;
	private String bbsDesc;
	private String menuId;
	private String registId;
	private String registDate;
	private String updtId;
	private String updtDate;
	private int sortNo;
	private int levelNo;
	private String type;
	private String bbsName;
	private String useYn;
	private String upperBbsId;
	private String delYn;
	private String oldBbsId;
	private ArrayList<String> childBbsKeys;
	private String menuLang;
	private String bbsDivCode;
	
	private String addColumnUseYn;
	private String addColumn1UseYn;
	private String addColumn2UseYn;
	private String addColumn3UseYn;
	private String addColumnName;
	private String addColumn1Name;
	private String addColumn2Name;
	private String addColumn3Name;
	
	public String getBbsId() {
		return bbsId;
	}
	public void setBbsId(String bbsId) {
		this.bbsId = bbsId;
	}
	public String getBbsDesc() {
		return bbsDesc;
	}
	public void setBbsDesc(String bbsDesc) {
		this.bbsDesc = bbsDesc;
	}
	public String getMenuId() {
		return menuId;
	}
	public void setMenuId(String menuId) {
		this.menuId = menuId;
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
	public int getSortNo() {
		return sortNo;
	}
	public void setSortNo(int sortNo) {
		this.sortNo = sortNo;
	}
	public int getLevelNo() {
		return levelNo;
	}
	public void setLevelNo(int levelNo) {
		this.levelNo = levelNo;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	
	public String getBbsName() {
		return bbsName;
	}
	public void setBbsName(String bbsName) {
		this.bbsName = bbsName;
	}
	
	public String getUseYn() {
		return useYn;
	}
	public void setUseYn(String useYn) {
		this.useYn = useYn;
	}
	
	public String getUpperBbsId() {
		return upperBbsId;
	}
	public void setUpperBbsId(String upperBbsId) {
		this.upperBbsId = upperBbsId;
	}
	public String getDelYn() {
		return delYn;
	}
	public void setDelYn(String delYn) {
		this.delYn = delYn;
	}
	public String getMenuLang() {
		return menuLang;
	}
	public void setMenuLang(String menuLang) {
		this.menuLang = menuLang;
	}
	public String getOldBbsId() {
		return oldBbsId;
	}
	public void setOldBbsId(String oldBbsId) {
		this.oldBbsId = oldBbsId;
	}
	public ArrayList<String> getChildBbsKeys() {
		return childBbsKeys;
	}
	public void setChildBbsKeys(ArrayList<String> childBbsKeys) {
		this.childBbsKeys = childBbsKeys;
	}
	public String getAddColumnUseYn() {
		return addColumnUseYn;
	}
	public void setAddColumnUseYn(String addColumnUseYn) {
		this.addColumnUseYn = addColumnUseYn;
	}
	public String getAddColumn1UseYn() {
		return addColumn1UseYn;
	}
	public void setAddColumn1UseYn(String addColumn1UseYn) {
		this.addColumn1UseYn = addColumn1UseYn;
	}
	public String getAddColumn2UseYn() {
		return addColumn2UseYn;
	}
	public void setAddColumn2UseYn(String addColumn2UseYn) {
		this.addColumn2UseYn = addColumn2UseYn;
	}
	public String getAddColumn3UseYn() {
		return addColumn3UseYn;
	}
	public void setAddColumn3UseYn(String addColumn3UseYn) {
		this.addColumn3UseYn = addColumn3UseYn;
	}
	public String getAddColumnName() {
		return addColumnName;
	}
	public void setAddColumnName(String addColumnName) {
		this.addColumnName = addColumnName;
	}
	public String getAddColumn1Name() {
		return addColumn1Name;
	}
	public void setAddColumn1Name(String addColumn1Name) {
		this.addColumn1Name = addColumn1Name;
	}
	public String getAddColumn2Name() {
		return addColumn2Name;
	}
	public void setAddColumn2Name(String addColumn2Name) {
		this.addColumn2Name = addColumn2Name;
	}
	public String getAddColumn3Name() {
		return addColumn3Name;
	}
	public void setAddColumn3Name(String addColumn3Name) {
		this.addColumn3Name = addColumn3Name;
	}
	
	public String getBbsDivCode() {
		return bbsDivCode;
	}
	public void setBbsDivCode(String bbsDivCode) {
		this.bbsDivCode = bbsDivCode;
	}
	@Override
	public String toString() {
		return "CmmnBbsMasterVO [bbsId=" + bbsId + ", bbsDesc=" + bbsDesc + ", menuId=" + menuId + ", registId="
				+ registId + ", registDate=" + registDate + ", updtId=" + updtId + ", updtDate=" + updtDate
				+ ", sortNo=" + sortNo + ", levelNo=" + levelNo + ", type=" + type + ", bbsName=" + bbsName + ", useYn="
				+ useYn + ", upperBbsId=" + upperBbsId + ", delYn=" + delYn + ", oldBbsId=" + oldBbsId
				+ ", childBbsKeys=" + childBbsKeys + ", menuLang=" + menuLang + ", bbsDivCode=" + bbsDivCode
				+ ", addColumnUseYn=" + addColumnUseYn + ", addColumn1UseYn=" + addColumn1UseYn + ", addColumn2UseYn="
				+ addColumn2UseYn + ", addColumn3UseYn=" + addColumn3UseYn + ", addColumnName=" + addColumnName
				+ ", addColumn1Name=" + addColumn1Name + ", addColumn2Name=" + addColumn2Name + ", addColumn3Name="
				+ addColumn3Name + "]";
	}
	
}
