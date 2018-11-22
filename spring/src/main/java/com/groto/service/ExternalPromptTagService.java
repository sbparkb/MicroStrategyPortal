package com.groto.service;

import java.util.List;

import com.mstr.business.model.CustomAnswer;
import com.mstr.business.model.PromptInfo;


/**
 *  Class Name : ExternalPromptTagService.java
 *  Description : 프롬프트 태그 서비스 인터페이스(외부)
 *  
 *  Modification Information
 * 
 *  Mod Date      Modifier Description
 *  -----------   -------- ---------------------------
 *  2012. 3. 9.	  jjpark	 Generation
 *
 *  @author jjpark
 *  @since 2012. 3. 9.
 *  @version 1.0
 */
public abstract interface ExternalPromptTagService {

	/**
	 * Table Layout
	 * @return
	 * @throws Exception
	 */
	public String getTableLayout() throws Exception;
	
	
	/**
	 * Display Style 별 태그 생성
	 * @param promptInfo
	 * @return
	 * @throws Exception
	 */
	/* public String getPromptTagByDisplayStyle(PromptInfo promptInfo) throws Exception; */
	
	/**
	 * Display Style 별 태그 생성
	 * @param promptInfo
	 * @return
	 * @throws Exception
	 */
	public String getPromptTagByDisplayStyle(PromptInfo promptInfo, String objectId, String locale) throws Exception;

	
  /**
   * Display Style 별 태그 생성
   * @param promptInfo
   * @return
   * @throws Exception
   */
  public String getPromptTagByDisplayStyle(PromptInfo promptInfo, String objectId, String locale, String nextMean, String prevMean);	
	
	/**
	 * 프롬프트 에러 태그 생성
	 * @param errorMessage
	 * @param validateScriptName
	 * @return
	 * @throws Exception
	 */
	public String getPromptExceptionTag(String errorMessage, String validateScriptName);

	/**
	 * 사용자 정의 응답
	 * @return
	 * @throws Exception
	 */
	public List<CustomAnswer> getCustomAnswerForTree() throws Exception;
	
}
