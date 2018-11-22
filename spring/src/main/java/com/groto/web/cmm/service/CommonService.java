package com.groto.web.cmm.service;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.groto.web.bbs.vo.CmmnBbsFileVO;
import com.groto.web.cmm.dao.CmmDAO;
 
/**
 *  Class Name  :  CommonService
 *  Description :  첨부화일 업무 수행 서비스
 *
 *  Modification Information
 *
 *  Mod Date      Modifier Description
 *  -----------   -------- ---------------------------
 *  2015. 9. 16.  lastpice Generation
 *
 * @author : lastpice@separtners.co.kr
 * @date : 2015. 9. 16. 오후 2:38:17
 * @version : 
 */ 
@Service
public class CommonService {
	
	@Autowired
	private CmmDAO cmmDAO;
	
	/**
	 * <pre>
	 * 파일 정보 조회
	 * </pre>
	 *
	 * @param request
	 * @param response
	 * @param params
	 * @return
	 *
	 */
	public CmmnBbsFileVO selectAttachFileInfo(
	    HttpServletRequest request
	    , HttpServletResponse response
	    , CmmnBbsFileVO params
	    ){
		return cmmDAO.selectAttachFileInfo(params);
	}
	
	/**
	 * 레포트 사용 여부 조회
	 * @param reportId
	 * @return
	 */
	public Map<String,String> selectRptUseYn(String reportId) {
		return cmmDAO.selectRptUseYn(reportId);
	}
	
}//end of class