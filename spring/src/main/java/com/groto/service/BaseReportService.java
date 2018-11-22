package com.groto.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;

import com.microstrategy.web.objects.WebObjectInfo;
import com.mstr.business.model.FolderInfo;
import com.mstr.business.model.ReportInfo;

/**
 *  Class Name : BaseReportService.java
 *  Description : 리포트 서비스 인터페이스(전체)
 *  
 *  Modification Information
 * 
 *  Mod Date      Modifier Description
 *  -----------   -------- ---------------------------
 *  2012. 2. 25.	jjpark		Generation
 *
 *  @author jjpark
 *  @since 2012. 2. 25.
 *  @version 1.0
 */
@Service
public abstract interface BaseReportService {

	
	//=========================================================================
	// PROJECT
	//=========================================================================
	
	/**
	 * 프로젝트ID 조회
	 * 
	 * @return
	 */
	public abstract String getProjectID() throws Exception;
	
	/**
	 * 공유리포트ID 조회
	 * @return
	 */
	public abstract String getSharedReportsFolderID() throws Exception;
	
	
	//=========================================================================
	// FOLDER
	//=========================================================================
	
	/**
	 * 공유리포트 루트폴더 여부
	 * 
	 * @param objectID - Folder ObjectID
	 * @return
	 */
	public abstract boolean isPublicReportsFolder(String objectID) throws Exception;
	
	/**
	 * 폴더 목록 조회
	 *   - 해당 폴더 하위 최상위 폴더 목록만 조회
	 *   
	 * @param objectID - Folder ObjectID
	 * @return
	 */
	public abstract List<FolderInfo> getFolderList(String objectID) throws Exception;
	
	
	//=========================================================================
	// REPORT
	//=========================================================================

	/**
	 * 리포트 정보 조회
	 * @param objectID
	 * @return
	 */
	public abstract ReportInfo getSimpleReportInfo(String objectID, int displayUnitType) throws Exception;
	
	/**
	 * 리포트 정보 조회(Origin)
	 * @param objectID
	 * @return
	 */
	public abstract WebObjectInfo getOriginReportInfo(String objectID, int displayUnitType) throws Exception;
	
	/**
	 * 폴더 하위 객체목록 조회
	 *   - 해당 폴더 하위의 폴더 및 리포트 목록 전체를 조회
	 *   
	 * @param objectID - Folder ObjectID
	 * @return
	 */
	public abstract List<ReportInfo> getFolderObjectList(String objectID) throws Exception;
	
	/**
	 * 리포트 조회
	 *   - 리포트명 or 리포트 설명 중 해당 단어가 있는 리포트 목록 조회
	 *   
	 * @param searchText - 검색어
	 * @return
	 */
	public abstract List<ReportInfo> searchReportList(String searchText) throws Exception;
	
	/**
	 * 프롬프트 XML 생성
	 * 
	 * @param objectID - Report ObjectID
	 * @param request - HttpServletRequest
	 * @return
	 */
	public abstract String createReportPromptXML(String sessionID, String objectID, int displayUnitType, HttpServletRequest request) throws Exception;

}
