package com.groto.service;

import java.util.List;

import com.mstr.business.model.FolderInfo;
import com.mstr.business.model.ReportDetailInfo;
import com.mstr.business.model.ReportInfo;


/**
 *  Class Name : ReportService.java
 *  Description : 리포트 서비스 인터페이스
 *  
 *  Modification Information
 * 
 *  Mod Date      Modifier Description
 *  -----------   -------- ---------------------------
 *  2012. 2.28.   jjpark   Generation
 *
 *  @author jjpark
 *  @since 2012. 2. 28.
 *  @version 1.0
 */
public interface ReportService{

	/**
	 * 프로젝트 ID 조회
	 * @return
	 * @throws Exception
	 */
	public String getProjectID() throws Exception;
	
	/**
	 * 공유리포트 ID 조회
	 * @return
	 * @throws Exception
	 */
	public String getSharedReportsFolderID() throws Exception;
	
	/**
	 * LEFT 메뉴 조회
	 * @return
	 * @throws Exception
	 */
	public List<FolderInfo> getLeftMenu() throws Exception;
	
	/**
	 * 리포트 목록 조회
	 * @param objectID
	 * @return
	 * @throws Exception
	 */
	public List<ReportInfo> getReportList(String objectID) throws Exception;
	
	/**
	 * 리포트 상세 정보 조회
	 * @param objectID
	 * @return
	 * @throws Exception
	 */
	public ReportDetailInfo getDetailReportInfo(String objectID, int displayUnitType) throws Exception;
	
	/**
	 * 리포트 검색
	 * @param searchText
	 * @return
	 * @throws Exception
	 */
	public List<ReportInfo> getSearchReportList(String searchText) throws Exception;
	
	/**
	 * 프롬프트 XML 조회
	 * @param objectID
	 * @return
	 * @throws Exception
	 */
	public String reportExecution(String sessionID, String objectID, int displayUnitType ) throws Exception;
	
}
