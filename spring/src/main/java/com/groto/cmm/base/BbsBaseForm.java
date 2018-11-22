package com.groto.cmm.base;

import com.groto.cmm.util.SystemMessage;

/**
 *  Class Name  :  BbsBaseForm
 *  Description :  게시판 기본 Form
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

public abstract class BbsBaseForm implements java.io.Serializable {
  private static final long serialVersionUID = -844423650730056375L;
  // public abstract String toString();

  private int gridRowsPerPage = Integer.parseInt(SystemMessage.getMessage("DEFAULT.PAGE_LINE"));
  private int gridCurrentPage;
  private String sortingNumber = "";

  int pageNo;
  int pageSize = Integer.parseInt(SystemMessage.getMessage("DEFAULT.PAGE_LINE"));
  int startRow;

  private String userId = "";
  private String orgntId = "";
  private String lang = "";

  private String searchType;
  private String searchVal;

  private String redirectUrl;

  public BbsBaseForm() {
    this.pageNo = 1;
    this.pageSize = Integer.parseInt(SystemMessage.getMessage("DEFAULT.PAGE_LINE"));
  }

  public int getGridRowsPerPage() {
    return gridRowsPerPage;
  }

  public void setGridRowsPerPage(int gridRowsPerPage) {
    this.gridRowsPerPage = gridRowsPerPage;
  }

  public int getGridCurrentPage() {
    return gridCurrentPage;
  }

  public void setGridCurrentPage(int gridCurrentPage) {
    this.gridCurrentPage = gridCurrentPage;
  }

  public String getUserId() {
    return userId;
  }

  public void setUserId(String userId) {
    this.userId = userId;
  }

  public String getLang() {
    return lang;
  }

  public void setLang(String lang) {
    this.lang = lang;
  }

  public String getOrgntId() {
    return orgntId;
  }

  public void setOrgntId(String orgntId) {
    this.orgntId = orgntId;
  }

  public String getSortingNumber() {
    return sortingNumber;
  }

  public void setSortingNumber(String sortingNumber) {
    this.sortingNumber = sortingNumber;
  }

  public int getPageNo() {
    return pageNo;
  }

  public void setPageNo(int pageNo) {
    if (pageNo <= 0) {
      this.pageNo = 1;
    }

    // if(pageNo > totalCnt){
    // pageNo = ((int)Math.floor(totalCnt / pageSize)) + 1;
    // }
    this.startRow = (pageNo - 1) * gridRowsPerPage;
    this.pageNo = pageNo;
  }

  public int getPageSize() {
    return pageSize;
  }

  public void setPageSize(int pageSize) {
    this.pageSize = pageSize;
  }

  public int getStartRow() {
    return startRow;
  }

  public void setStartRow(int startRow) {
    this.startRow = startRow;
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

  public String getRedirectUrl() {
    return redirectUrl;
  }

  public void setRedirectUrl(String redirectUrl) {
    this.redirectUrl = redirectUrl;
  }

}
