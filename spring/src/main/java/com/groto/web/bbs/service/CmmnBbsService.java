package com.groto.web.bbs.service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.groto.cmm.exception.PermissionDeniedException;
import com.groto.cmm.exception.SystemException;
import com.groto.cmm.util.CmmCode;
import com.groto.cmm.util.CmmUtil;
import com.groto.session.MSTRSessionUserImpl;
import com.groto.web.bbs.dao.CmmnBbsDAO;
import com.groto.web.bbs.vo.CmmnBbsFileVO;
import com.groto.web.bbs.vo.CmmnBbsMasterVO;
import com.groto.web.bbs.vo.CmmnBbsReadHVO;
import com.groto.web.bbs.vo.CmmnBbsVO;
import com.groto.web.cmm.dao.CmmDAO;

/**
 *  Class Name  :  CmmnBbsService
 *  Description :  게시판 관련 서비스
 *
 *  Modification Information
 *
 *  Mod Date      Modifier Description
 *  -----------   -------- ---------------------------
 *  2014. 11. 4.  jjangacejoy Generation
 *
 * @author : 장창용(jjangacejoy@netville.co.kr)
 * @date : 2014. 10. 31. 오후 4:47:38
 * @version : 1.0
 */
 

@Service
@Transactional
public class CmmnBbsService {
	
  private transient final Logger logger = LoggerFactory.getLogger(getClass());
	
	@Autowired
	private CmmnBbsDAO cmmnDAO;
	
	@Autowired
	private CmmDAO commonDao;

	/**
	 * <pre>
	 * 게시판에 해당하는 새로운 게시글 등록 수행
	 * </pre>
	 *
	 * @param cmmnbbsvo				게시글 공통 VO 등록될 게시물의 데이터가 담겨 있음
	 * @param cmmnbbsfilevo			게시글에 첨부파일 정보를 담고 있음
	 * @return
	 * @throws Exception
	 * @throws SQLException
	 *
	 */
	public Map<String, Object> insert(CmmnBbsVO cmmnbbsvo, HttpServletRequest request)  {
		
		MSTRSessionUserImpl userInfo	= (MSTRSessionUserImpl)((HttpServletRequest)request).getSession().getAttribute(MSTRSessionUserImpl.ATTRIBUTE_NAME);
		Map<String, Object> params	= new HashMap<String, Object>();
		int bbSseqNo = 0;
		
		try {
			//공지 여부가 N인경우 데이트 값을 널처리
			if(cmmnbbsvo.getNoticeYn() != null && !"".equals(cmmnbbsvo.getNoticeYn()) && !"N".equals(cmmnbbsvo.getNoticeYn())){
			    cmmnbbsvo.setNoticeStrYmd(cmmnbbsvo.getNoticeStrYmd().replaceAll("\\/", ""));
          cmmnbbsvo.setNoticeEndYmd(cmmnbbsvo.getNoticeEndYmd().replaceAll("\\/", ""));
          cmmnbbsvo.setNoticeStrTime("0000");
          cmmnbbsvo.setNoticeEndTime("0000");
			}else{
				cmmnbbsvo.setNoticeYn("N");
			}
			
			bbSseqNo=commonDao.selectSeqVal(CmmCode.COMM_SEQ_ID_BBSCON.getKey());
			
			if(bbSseqNo>0){
				cmmnbbsvo.setDelYn("N");
				cmmnbbsvo.setNoticeYn(CmmUtil.nvl(cmmnbbsvo.getNoticeYn(), "N"));
				cmmnbbsvo.setBbsSeqNo(String.valueOf(bbSseqNo));
				cmmnbbsvo.setRegistId(userInfo.getUserId());

				String newTitle = cmmnbbsvo.getBbsSj().replaceAll("<", "&lt;").replaceAll(">", "&gt;");   
				cmmnbbsvo.setBbsSj(newTitle);
				/*게시판내용 저장*/
				cmmnDAO.insertCmmnBbs(cmmnbbsvo);	
			}
			params.put("params", cmmnbbsvo);
		} catch (SQLException e){
			logger.error("[ " + this.getClass().getName().replaceAll("[\r\n]","") + " , ERROR METHOD : " + e.getStackTrace()[1].getMethodName().replaceAll("[\r\n]","") + " ]");
			logger.error("ERROR MESSAGE : [ " + CmmUtil.exMessage(e) + " ]");
			throw new SystemException(e.getMessage());
		}
		return params;
	}
	
	
	/**
	 * <pre>
	 * 게시판에 해당하는 게시글 리스트를 가져온다.
	 * </pre>
	 *
	 * @param param				게시판에 해당하는 검색 조건 데이터를 담고 있음
	 * @return
	 *
	 */
	public Map<String, Object> selectListPageBbs(CmmnBbsVO param, HttpServletRequest request, String bbsId){
		
	  Map<String, Object> result = new HashMap<String, Object>();
		MSTRSessionUserImpl userInfo = (MSTRSessionUserImpl)((HttpServletRequest)request).getSession().getAttribute(MSTRSessionUserImpl.ATTRIBUTE_NAME);
		CmmnBbsMasterVO master = new CmmnBbsMasterVO();

		int totCnt = 0;
		param.setBbsReadUser(userInfo.getUserId());
		
		pageParam(param, bbsId);
		
		master.setBbsId(param.getBbsId());
		
		try{
		  List<CmmnBbsVO> list = cmmnDAO.selectListPageBbs(param);
			totCnt = cmmnDAO.selectCountBbs(param);
			master = cmmnDAO.selectBoardInfo(master);
		  result.put("list", list);
		}catch(SQLException e){
			logger.error("[ " + this.getClass().getName().replaceAll("[\r\n]","") + " , ERROR METHOD : " + e.getStackTrace()[1].getMethodName().replaceAll("[\r\n]","") + " ]");
			logger.error("ERROR MESSAGE : [ " + CmmUtil.exMessage(e) + " ]");
			throw new SystemException(e.getMessage());
		}
		result.put("totCnt", totCnt);
		result.put("board", master);
		result.put("params", param);
		return result;
	}
	
	private void pageParam(CmmnBbsVO param, String bbsId){
	  
	   if(bbsId == null || "".equals(bbsId)){
	      param.setBbsId("BBS00001");
	    }else{
	      param.setBbsId(bbsId);
	    }
	    
	    if(param != null && param.getSearchType() != null){
	      if("title".equals(param.getSearchType())){
	        param.setTitle(param.getSearchVal());
	      }else if("contents".equals(param.getSearchType())){
	        param.setBbsCn(param.getSearchVal());
	      }else if("registerId".equals(param.getSearchType())){
	        param.setRegistId(param.getSearchVal());
	      }else if("registerNm".equals(param.getSearchType())){
	        param.setRegistName(param.getSearchVal());
	      }
	    }
	}
	
	
	/**
	 * <pre>
	 * 게시판에 해당하는 게시글 리스트를 가져온다.
	 * </pre>
	 *
	 * @param param				게시판에 해당하는 검색 조건 데이터를 담고 있음
	 * @return
	 *
	 */
	public Map<String, Object> selectListTotSearchBbs(CmmnBbsVO param, HttpServletRequest request){
		
	  Map<String, Object> result 			= new HashMap<String, Object>();
		MSTRSessionUserImpl userInfo		= (MSTRSessionUserImpl)((HttpServletRequest)request).getSession().getAttribute(MSTRSessionUserImpl.ATTRIBUTE_NAME);
		List<CmmnBbsVO> list 				= new ArrayList<CmmnBbsVO>();
		int totCnt 							= 0;
		
		param.setBbsReadUser(userInfo.getUserId());
		
		if(param != null && param.getSearchType() != null){
		  
		  param.setTitle(param.getTotSearchVal());
      param.setBbsCn(param.getTotSearchVal());
      param.setRegistName(param.getTotSearchVal());
      
			if("title".equals(param.getSearchType())){
				param.setTitle(param.getSearchVal());
			}else if("contents".equals(param.getSearchType())){
				param.setBbsCn(param.getSearchVal());
			}else if("register".equals(param.getSearchType())){
				param.setRegistName(param.getSearchVal());
			}
		}
		
		try{
			list = cmmnDAO.selectListTotSearchBbs(param);
			totCnt = cmmnDAO.selectCountTotSearchBbs(param);
		}catch(SQLException e){
			logger.error("[ " + this.getClass().getName().replaceAll("[\r\n]","") + " , ERROR METHOD : " + e.getStackTrace()[1].getMethodName().replaceAll("[\r\n]","") + " ]");
			logger.error("ERROR MESSAGE : [ " + CmmUtil.exMessage(e) + " ]");
			throw new SystemException(e.getMessage());
		}
		
		result.put("list", list);
		result.put("totCnt", totCnt);
		result.put("params", param);
		return result;
	}
	
	/**
	 * <pre>
	 * 게시판 정보 조회
	 * </pre>
	 *
	 * @param param
	 * @return
	 *
	 */
  public CmmnBbsMasterVO selectBoardInfo(CmmnBbsVO param) {

    CmmnBbsMasterVO master = new CmmnBbsMasterVO();
    master.setBbsId(param.getBbsId());
    master = cmmnDAO.selectBoardInfo(master);
    return master;
  }
	
	/**
	 * <pre>
	 * 게시판에서 선택된 게시물에 대한 상세 정보를 조회한다.
	 * </pre>
	 *
	 * @param param				선택된 게시물에 시퀀스 넘버 및 리스트 조회 조건을 담고 있음
	 * @param request
	 * @return
	 *
	 */
	public Map<String, Object> selectCmmnBbs(CmmnBbsVO param, HttpServletRequest request){

	  MSTRSessionUserImpl userInfo		= (MSTRSessionUserImpl)((HttpServletRequest)request).getSession().getAttribute(MSTRSessionUserImpl.ATTRIBUTE_NAME);
		CmmnBbsReadHVO readHistory			= new CmmnBbsReadHVO();
		Map<String, Object> params			= new HashMap<String, Object>();
		CmmnBbsVO info						= null;
		CmmnBbsMasterVO master				= new CmmnBbsMasterVO();
		String userId						= userInfo.getUserId();
		try{
			master.setBbsId(param.getBbsId());
			param.setBbsReadUser(userId);
			param.setMasterDiv(CmmCode.ATCH_MST_DIV_ATCHGB01.getKey());
			info = cmmnDAO.selectCmmnBbsInfo(param);
			readHistory.setUserId(userId);
			readHistory.setBbsId(info.getBbsId());
			readHistory.setBbsSeqNo(info.getBbsSeqNo());
			readHistory.setRegistId(userId);
			
			master = cmmnDAO.selectBoardInfo(master);
		
			// 조회 이력이 있는지 검사해서 조회수 증가 여부를 결정
			int readCnt						= cmmnDAO.selectCountCmmnBbsReadHistory(readHistory);
			if(readCnt < 1){
				info.setReadCnt(String.valueOf(Integer.parseInt(info.getReadCnt()) + 1));
				info.setUpdtId(userId);
				cmmnDAO.updateCmmnBbsCnt(info);
				cmmnDAO.insertCmmnBbsReadHistory(readHistory);
			}
		}catch(SQLException e){
			logger.error("[ " + this.getClass().getName().replaceAll("[\r\n]","") + " , ERROR METHOD : " + e.getStackTrace()[1].getMethodName().replaceAll("[\r\n]","") + " ]");
			logger.error("ERROR MESSAGE : [ " + CmmUtil.exMessage(e) + " ]");
			throw new SystemException(e.getMessage());
		}
		params.put("board", master);
		params.put("params", param);
		params.put("bbsInfo", info);
		return params;
	}
	
	/**
	 * <pre>
	 * 해당 게시물 데이터 수정 수행
	 * </pre>
	 *
	 * @param cmmnbbsvo					수정될 게시글에 대한 데이터를 담고 있음
	 * @param cmmnbbsfilevo				새로 추가된 첨부파일에 대한 데이터를 담고 있음
	 * @param request
	 * @param attachFileIds				기존 첨부파일중 삭제되지 않은 첨부파일 정보
	 * @param originAttachFileIds		기존 첨부파일에 대한 정보
	 * @return
	 *
	 */
	@Transactional(rollbackFor = { Exception.class, SQLException.class }, propagation = Propagation.REQUIRED)
	public Map<String, Object> updateCmmnBbs(CmmnBbsVO cmmnbbsvo
			, HttpServletRequest request){
	  
		Map<String, Object> result = new HashMap<String, Object>();
		MSTRSessionUserImpl userInfo = (MSTRSessionUserImpl)((HttpServletRequest)request).getSession().getAttribute(MSTRSessionUserImpl.ATTRIBUTE_NAME);
		String userId	 = userInfo.getUserId();
		CmmnBbsMasterVO master = new CmmnBbsMasterVO();
		CmmnBbsVO original = new CmmnBbsVO();
		
		// History 작업용 
		Map<String, String> historyMap = new HashMap<String, String>();
		
		try {
			cmmnbbsvo.setBbsReadUser(userId);
			cmmnbbsvo.setMasterDiv(CmmCode.ATCH_MST_DIV_ATCHGB01.getKey());
			original					= cmmnDAO.selectCmmnBbsInfo(cmmnbbsvo);

			// 게시글이 없는 경우
			if(original == null){
				throw new SystemException("원본 게시글이 존재 하지 않습니다.");
			}
			// 권한 체크
			if(!original.getRegistId().equals(userId) && !CmmCode.ADMIN_USER_ID.getKey().equals(userInfo.getWebAdminGrp())){
				throw new PermissionDeniedException("게시글 수정 권한이 없습니다.");
			}
      
      historyMap.put("bbs_seq_no", original.getBbsSeqNo());
      historyMap.put("bbs_id",original.getBbsId());
      historyMap.put("updt_id",userId);

			// History 등록
      cmmnDAO.updateCmmnBbsInfoHistory(historyMap);
			master.setBbsId(cmmnbbsvo.getBbsId());
						
			dateNull(cmmnbbsvo); //공지 여부가 N인경우 데이트 값을 널처리
			cmmnbbsvo.setDelYn("N");
			cmmnbbsvo.setUpdtId(userId);
			
			/*게시판내용 저장*/
      String newTitle = cmmnbbsvo.getBbsSj().replaceAll("<", "&lt;").replaceAll(">", "&gt;");   
      cmmnbbsvo.setBbsSj(newTitle);
      
			cmmnDAO.updateCmmnBbsInfo(cmmnbbsvo);
			master							= cmmnDAO.selectBoardInfo(master);

		} catch (SQLException e) {
			logger.error("[ " + this.getClass().getName().replaceAll("[\r\n]","") + " , ERROR METHOD : " + e.getStackTrace()[1].getMethodName().replaceAll("[\r\n]","") + " ]");
			logger.error("ERROR MESSAGE : [ " + CmmUtil.exMessage(e) + " ]");
			result.put("result", "fail");			
		}
		result.put("params", cmmnbbsvo);
		result.put("board", master);
		return result;
	}
	
	private void dateNull(CmmnBbsVO cmmnbbsvo){
    if(cmmnbbsvo.getNoticeYn() != null && !"".equals(cmmnbbsvo.getNoticeYn())){
      if(!"N".equals(cmmnbbsvo.getNoticeYn())){
        cmmnbbsvo.setNoticeStrYmd(cmmnbbsvo.getNoticeStrYmd().replaceAll("\\/", ""));
        cmmnbbsvo.setNoticeEndYmd(cmmnbbsvo.getNoticeEndYmd().replaceAll("\\/", ""));
        cmmnbbsvo.setNoticeStrTime("0000");
        cmmnbbsvo.setNoticeEndTime("0000");
      }
    }else{
      cmmnbbsvo.setNoticeYn("N");
    }
	}
	
	/**
	 * <pre>
	 * 파일 다운로드 횟수 증가 수행
	 * </pre>
	 *
	 * @param request
	 * @param fileNm					다운로드 될 파일 이름
	 * @param atchFileSeqNo				다운로드 될 파일의 시퀀스 넘버
	 * @return
	 *
	 */
	public Map<String, Object> updateFileDownCnt(HttpServletRequest request, String fileNm, int atchFileSeqNo){
		Map<String, Object> result 					= new HashMap<String, Object>();
		MSTRSessionUserImpl userInfo	= (MSTRSessionUserImpl)((HttpServletRequest)request).getSession().getAttribute(MSTRSessionUserImpl.ATTRIBUTE_NAME);
		
		CmmnBbsFileVO param				= new CmmnBbsFileVO();
		String userId					= userInfo.getUserId();
		param.setUpdtId(userId);
		param.setAtchFileSeqNo(atchFileSeqNo);
		
		try{
			cmmnDAO.updateFileDownCnt(param);
		}catch(SQLException e){
			logger.error("[ " + this.getClass().getName().replaceAll("[\r\n]","") + " , ERROR METHOD : " + e.getStackTrace()[1].getMethodName().replaceAll("[\r\n]","") + " ]");
			logger.error("ERROR MESSAGE : [ " + CmmUtil.exMessage(e) + " ]");
			result.put("result", "fail");
			throw new SystemException(e.getMessage());
		}
		result.put("result", "success");
		return result;
	}
	
	/**
	 * <pre>
	 * 게시물 삭제 처리
	 * </pre>
	 *
	 * @param request
	 * @param param				삭제될 게시물 정보 VO
	 * @return
	 *
	 */
	public Map<String, Object> deleteCmmnBbsInfo(HttpServletRequest request, CmmnBbsVO param){

	  Map<String, Object> result 		= new HashMap<String, Object>();
		MSTRSessionUserImpl userInfo	= (MSTRSessionUserImpl)((HttpServletRequest)request).getSession().getAttribute(MSTRSessionUserImpl.ATTRIBUTE_NAME);
		// 파일 정보 삭제 처리
		CmmnBbsFileVO file = new CmmnBbsFileVO();
		CmmnBbsVO original = new CmmnBbsVO();
		String userId = userInfo.getUserId();
		file.setMasterId(String.valueOf(param.getBbsSeqNo()));
		file.setDelYn("Y");
		file.setUpdtId(userId);
		file.setMasterDiv(CmmCode.ATCH_MST_DIV_ATCHGB01.getKey());
		param.setUpdtId(userId);
		try{
			param.setBbsReadUser(userId);
			param.setMasterDiv(CmmCode.ATCH_MST_DIV_ATCHGB01.getKey());
			original					= cmmnDAO.selectCmmnBbsInfo(param);
			// 게시글이 없는 경우
			if(original == null){
				throw new SystemException("원본 게시글이 존재 하지 않습니다.");
			}
			// 권한 체크
			if(!original.getRegistId().equals(userId) && !CmmCode.ADMIN_USER_ID.getKey().equals(userInfo.getWebAdminGrp())){
				throw new PermissionDeniedException("게시글 수정 권한이 없습니다.");
			}
			
			cmmnDAO.deleteCmmnBbsInfo(param);
			cmmnDAO.deleteCmmnBbsFile(file);
		}catch(SQLException e){
			logger.error("[ " + this.getClass().getName().replaceAll("[\r\n]","") + " , ERROR METHOD : " + e.getStackTrace()[1].getMethodName().replaceAll("[\r\n]","") + " ]");
			logger.error("ERROR MESSAGE : [ " + CmmUtil.exMessage(e) + " ]");
			result.put("result", "fail");
			throw new SystemException(e.getMessage());
		}
		result.put("result", "success");
		return result;
	}
	
	/**
	 * <pre>
	 * 메인 페이지용 게시판 최신글 리스트 조회 및 댓글 조회
	 * </pre>
	 *
	 * @param param				게시판에 해당하는 검색 조건 데이터를 담고 있음
	 * @return
	 *
	 */
	public Map<String, Object> selectListBbsForMain(CmmnBbsVO param, HttpServletRequest request){

	  Map<String, Object> result 			= new HashMap<String, Object>();
		MSTRSessionUserImpl userInfo	= (MSTRSessionUserImpl)((HttpServletRequest)request).getSession().getAttribute(MSTRSessionUserImpl.ATTRIBUTE_NAME);
		List<CmmnBbsVO> list 				= new ArrayList<CmmnBbsVO>();	// 공지사랑 리스트
		
		try{
			// 메인페이지용 리스트 파라미터 셋팅
			param.setGridRowsPerPage(5);
			param.setPageNo(1);
			param.setBbsReadUser(userInfo.getUserId());
			
			// 메인페이지용 공지사항 리스트 조회 파라미터 셋팅
			param.setBbsId(CmmCode.BBS_ID_BBS00001.getKey());
			param.setMasterDiv(CmmCode.ATCH_MST_DIV_ATCHGB01.getKey());
			// 메인페이지용 공지사항 리스트 조회
			list = cmmnDAO.selectListBbsForMain(param);
		}catch(SQLException e){
			logger.error("[ " + this.getClass().getName().replaceAll("[\r\n]","") + " , ERROR METHOD : " + e.getStackTrace()[1].getMethodName().replaceAll("[\r\n]","") + " ]");
			logger.error("ERROR MESSAGE : [ " + CmmUtil.exMessage(e) + " ]");
			throw new SystemException(e.getMessage());
		}
		
		result.put("list", list);
		result.put("params", param);
		return result;
	}
	
	/**
	 * <pre>
	 * 공지사항 seq를 구한다.
	 * </pre>
	 * @param String userId
	 * @return True/False
	 *
	 */
	public String getNotiSeq() throws SQLException {
		return cmmnDAO.getNotiSeq();
	}
	
}
