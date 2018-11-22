package com.groto.tags;

import java.io.IOException;
import java.io.Serializable;

import javax.servlet.jsp.JspTagException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.BodyTagSupport;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.groto.cmm.util.CmmUtil;
import com.groto.cmm.util.SystemMessage;

/**
 * Class Name : ScriptTag Description : 공통 스크립트 구성 태그 
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

@Repository
public class PageVarTag extends BodyTagSupport implements Serializable {

	private static final long serialVersionUID = 3800946314907421924L;

	private transient final Logger logger = LoggerFactory.getLogger(getClass());

	/**
	 * 리포트 ObjectID(required)
	 */
	private String pagesGridRowsPerPage = "";
	
	private String pagesPageNo = "";
	
	private String pagesStartRow = "";
	
	private String searchGridRowsPerPage = "";
	
	private String searchPageNo = "";
	
	private String searchStartRow = "";
	
	private String totCnt = "";
	
	public String getPagesGridRowsPerPage() {
		return pagesGridRowsPerPage;
	}

	public void setPagesGridRowsPerPage(String pagesGridRowsPerPage) {
		this.pagesGridRowsPerPage = pagesGridRowsPerPage;
	}

	public String getPagesPageNo() {
		return pagesPageNo;
	}

	public void setPagesPageNo(String pagesPageNo) {
		this.pagesPageNo = pagesPageNo;
	}

	public String getPagesStartRow() {
		return pagesStartRow;
	}

	public void setPagesStartRow(String pagesStartRow) {
		this.pagesStartRow = pagesStartRow;
	}

	public String getSearchGridRowsPerPage() {
		return searchGridRowsPerPage;
	}

	public void setSearchGridRowsPerPage(String searchGridRowsPerPage) {
		this.searchGridRowsPerPage = searchGridRowsPerPage;
	}

	public String getSearchPageNo() {
		return searchPageNo;
	}

	public void setSearchPageNo(String searchPageNo) {
		this.searchPageNo = searchPageNo;
	}

	public String getSearchStartRow() {
		return searchStartRow;
	}

	public void setSearchStartRow(String searchStartRow) {
		this.searchStartRow = searchStartRow;
	}

	public String getTotCnt() {
		return totCnt;
	}

	public void setTotCnt(String totCnt) {
		this.totCnt = totCnt;
	}

	public int doStartTag() throws JspTagException {

		JspWriter writer = this.pageContext.getOut();
		StringBuffer script = new StringBuffer(1000);
		script.append("<script> var pagesGridRowsPerPage = '").append(this.pagesGridRowsPerPage)
		.append("'; var pagesPageNo = '").append(this.pagesPageNo)
		.append("'; var pagesStartRow = '").append(this.pagesStartRow)		
		.append("'; var searchGridRowsPerPage = '");
		
		if(this.pagesGridRowsPerPage == null || "".equals(this.pagesGridRowsPerPage)) {			
			script.append(this.searchGridRowsPerPage);
		}else {
			script.append(this.pagesGridRowsPerPage);
		}
		
		script.append("'; var searchPageNo = '").append(this.searchPageNo);
		
		if(this.pagesPageNo == null || "".equals(this.pagesPageNo)) {
			script.append(this.searchPageNo);
		}else {
			script.append(this.pagesPageNo);
		}		
		
		script.append("'; var searchStartRow = '");
		
		if(this.pagesStartRow == null || "".equals(this.pagesStartRow)) {
			script.append(this.searchStartRow);						
		}else {
			script.append(this.pagesStartRow);
		}				
		
		script.append("'; var totCnt = '").append(this.totCnt)
		.append("'; var PAGE_SIZE = '").append(SystemMessage.getMessage("DEFAULT.PAGE_SIZE")).append("';</script>");
		
		try {
			writer.print(script.toString());
		} catch (IOException e) {
			logger.error(CmmUtil.exMessage(e));
		}

		return EVAL_PAGE;
	}

}
