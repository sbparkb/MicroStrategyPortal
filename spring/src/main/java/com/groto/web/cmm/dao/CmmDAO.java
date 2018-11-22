package com.groto.web.cmm.dao;

import java.util.HashMap;
import java.util.Map;

import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Repository;

import com.groto.cmm.util.StringUtil;
import com.groto.web.bbs.vo.CmmnBbsFileVO;
 

/**
 *  Class Name  :  CmmDAO
 *  Description :  게시판 공통 DAO
 *
 *  Modification Information
 *
 *  Mod Date      Modifier Description
 *  -----------   -------- ---------------------------
 *  2015. 9. 14.  lastpice Generation
 *
 * @author : lastpice@separtners.co.kr
 * @date : 2015. 9. 14. 오후 12:58:44
 * @version : 
 */ 


@Repository
public class CmmDAO extends SqlSessionDaoSupport{
	
	/**
	 * <pre>
	 * 시퀀스 테이블에서 해당 key의 시퀀스 Value조회
	 * </pre>
	 *
	 * @param seqId
	 * @return
	 *
	 */
	public int selectSeqVal(String seqId){
		Map<String, String> param			= new HashMap<String, String>();
		param.put("seqId", seqId);
 
		int seqid = 1;
		if ("BBSCONSQ".equals(seqId)) {
		  seqid = getSqlSession().selectOne("cmm.selectBbsSeqId", param);
		} else if ("ATTCHSEQ".equals(seqId)) {
      seqid = getSqlSession().selectOne("cmm.selectAttachSeqId", param);
    } else {
		  seqid = getSqlSession().selectOne("cmm.selectSeqId", param);
		}
		return seqid;
	}
	
 
	
	/**
	 * <pre>
	 * 첨부파일 정보데이터 적재
	 * </pre>
	 *
	 * @param param
	 * @return
	 *
	 */
	public int insertAttachFileInfo(CmmnBbsFileVO param){
		return getSqlSession().insert("cmm.insertAttachFileInfo", param);
	}
	
	
	/**
	 * <pre>
	 * 첨부파일 정보 조회
	 * </pre>
	 *
	 * @param param
	 * @return
	 *
	 */
	public CmmnBbsFileVO selectAttachFileInfo(CmmnBbsFileVO param){
		return getSqlSession().selectOne("cmm.selectAttachFileInfo", param);
	}
	
	/**
	 * <pre>
	 * 첨부파일 삭제 처리 (DEL_YN = 'Y')
	 * </pre>
	 *
	 * @param param
	 * @return
	 *
	 */
	public int deleteAttachFileInfo(CmmnBbsFileVO param){
		return getSqlSession().update("cmm.deleteAttachFileInfo", param);
	}

	/**
	 * 레포트 사용 여부 조회
	 * @param reportId
	 * @return
	 */
	public Map<String, String> selectRptUseYn(String reportId){		
		Map<String, String> user =  getSqlSession().selectOne("cmm.selectRptUseYn", reportId);		
		return user;
	}
}
