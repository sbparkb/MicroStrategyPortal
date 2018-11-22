package com.groto.web.bbs.dao;


import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Repository;

import com.groto.web.bbs.vo.CmmnBbsFileVO;
import com.groto.web.bbs.vo.CmmnBbsMasterVO;
import com.groto.web.bbs.vo.CmmnBbsReadHVO;
import com.groto.web.bbs.vo.CmmnBbsVO;

/**
 *  Class Name  :  CmmnBbsDAO
 *  Description :  게시판DAO
 *
 *  Modification Information
 *
 *  Mod Date      Modifier Description
 *  -----------   -------- ---------------------------
 *  2014. 11. 4.  jjangacejoy Generation
 *
 * @author : 장창용(jjangacejoy@netville.co.kr)
 * @date : 2014. 11. 4. 오후 5:31:05
 * @version : 1.0
 */
 
@Repository
public class CmmnBbsDAO extends SqlSessionDaoSupport{

  /**
   * <pre>
   * 게시판 마스터 단일 정보 조회
   * </pre>
   *
   * @param param
   * @return
   *
   */
  public CmmnBbsMasterVO selectBoardInfo(CmmnBbsMasterVO param){
    return getSqlSession().selectOne("bbs.selectBoardInfo", param);
  }
  
  
	/**
	 * <pre>
	 * 게시글 등록
	 * </pre>
	 *
	 * @param bbsvo
	 * @return
	 *
	 */
	public int insertCmmnBbs(CmmnBbsVO bbsvo) throws SQLException{
		 return (Integer)getSqlSession().insert("bbs.insertCmmnBbs", bbsvo);
	}
	
	/**
	 * <pre>
	 * 게시글 히스토리 등록
	 * </pre>
	 *
	 * @param bbsvo
	 * @return
	 *
	 */
	public int insertCmmnBbsHis(CmmnBbsVO bbsvo) throws SQLException{
		 return (Integer)getSqlSession().insert("bbs.insertCmmnBbsHis", bbsvo);
	}

	/**
	 * <pre>
	 * 게시글 첨부 파일 정보 조회
	 * </pre>
	 *
	 * @param bbsfilevo
	 * @return
	 *
	 */
	public int insertCmmnBbsFile(CmmnBbsFileVO bbsfilevo) throws SQLException{
		 return (Integer)getSqlSession().insert("bbs.insertCmmnBbsFile", bbsfilevo);
	}
	
	/**
	 * <pre>
	 * BBS_ID에 해당하는 게시물 페이지 리스트를 가져온다.
	 * </pre>
	 *
	 * @param param
	 * @return
	 *
	 */
	public List<CmmnBbsVO> selectListPageBbs(CmmnBbsVO param) throws SQLException{
		return getSqlSession().selectList("bbs.selectListPageBbs", param);
	}
	
	/**
	 * <pre>
	 * BBS_ID에 해당하는 전체 게시물 갯수를 가져온다.
	 * </pre>
	 *
	 * @param param
	 * @return
	 *
	 */
	public int selectCountBbs(CmmnBbsVO param) throws SQLException{
		return (Integer) getSqlSession().selectOne("bbs.selectCountBbs", param);
	}
	
	
	/**
	 * <pre>
	 * 해당 게시물의 데이터를 조회한다.
	 * </pre>
	 *
	 * @param param
	 * @return
	 *
	 */
	public CmmnBbsVO selectCmmnBbsInfo(CmmnBbsVO param) throws SQLException{
		return getSqlSession().selectOne("bbs.selectBbsInfoWithFile", param);
	}
	
	
  /**
   * <pre>
   * 게시물 수정 전 히스토리로 이동
   * </pre>
   *
   * @param param
   * @return
   * @author Kimkichan (175575)
	 * 
   */
  public void updateCmmnBbsInfoHistory(Map<String, String> param) throws SQLException{
    getSqlSession().update("bbs.updateCmmnBbsHistory", param);
  }  
	/**
	 * <pre>
	 * 공통 게시물 정보 수정
	 * </pre>
	 *
	 * @param param
	 * @return
	 *
	 */
	public void updateCmmnBbsInfo(CmmnBbsVO param) throws SQLException{
		getSqlSession().update("bbs.updateCmmnBbs", param);
	}
	
	
	/**
	 * <pre>
	 * 공통 게시물 첨부파일 정보 변경
	 * </pre>
	 *
	 * @param param
	 *
	 */
	public void updateCmmnBbsFileInfo(CmmnBbsFileVO param) throws SQLException{
		getSqlSession().update("bbs.updateCmmnBbsAtchFile", param);
	}
	
	
	/**
	 * <pre>
	 * 첨부파일 정보 삭제 처리 DEL_YN => Y
	 * </pre>
	 *
	 * @param param
	 *
	 */
	public void deleteCmmnBbsFile(CmmnBbsFileVO param) throws SQLException{
		getSqlSession().update("bbs.deleteCmmnBbsAtchFile", param);
	}
	
	
	/**
	 * <pre>
	 * 게시물 삭제 처리
	 * </pre>
	 *
	 * @param param
	 *
	 */
	public void deleteCmmnBbsInfo(CmmnBbsVO param) throws SQLException{
	 getSqlSession().update("bbs.deleteCmmnBbsInfo", param);
	}
	
	/**
	 * <pre>
	 * 게시물 조회 이력 적재
	 * </pre>
	 *
	 * @param param
	 *
	 */
	public void insertCmmnBbsReadHistory(CmmnBbsReadHVO param) throws SQLException{
		getSqlSession().insert("bbs.insertCmmnBbsReadHistory", param);
	}
	
	
	/**
	 * <pre>
	 * 게시물 조회 이력 카운트
	 * </pre>
	 *
	 * @param param
	 * @return
	 *
	 */
	public int selectCountCmmnBbsReadHistory(CmmnBbsReadHVO param) throws SQLException{
		return getSqlSession().selectOne("bbs.selectCountCmmnBbsReadHistory", param);
	}
	
	/**
	 * <pre>
	 * 게시물 조회수, 댓글수 카운트 수정
	 * </pre>
	 *
	 * @param param
	 *
	 */
	public void updateCmmnBbsCnt(CmmnBbsVO param) throws SQLException{
		getSqlSession().update("bbs.updateCmmnBbsCnt", param);
	}
	
	/**
	 * <pre>
	 * 파일 다운로드 카운트 수정
	 * </pre>
	 *
	 * @param param
	 *
	 */
	public void updateFileDownCnt(CmmnBbsFileVO param) throws SQLException{
		getSqlSession().update("bbs.updateFileDownCnt", param);
	}
	
	/**
	 * <pre>
	 * 첨부파일 정보 조회
	 * </pre>
	 *
	 * @param param
	 * @return
	 * @throws SQLException
	 *
	 */
	public CmmnBbsFileVO selectFileInfo(CmmnBbsFileVO param) throws SQLException {
		return getSqlSession().selectOne("bbs.selectFileInfo", param);
	}
	
	/**
	 * <pre>
	 * 메인페이지용 공지사항 조회
	 * </pre>
	 *
	 *
	 */
	public List<CmmnBbsVO> selectListPageBbsMain(CmmnBbsVO param) throws SQLException{
		return getSqlSession().selectList("bbs.selectListPageBbsMain", param);
	}
	
	
	/**
	 * <pre>
	 * 메인에서 게시글 전체 검색시 사용
	 * </pre>
	 *
	 * @param param
	 * @return
	 * @throws SQLException
	 *
	 */
	public List<CmmnBbsVO> selectListTotSearchBbs(CmmnBbsVO param) throws SQLException{
		return getSqlSession().selectList("bbs.selectListTotSearchBbs", param);
	}
	
	/**
	 * <pre>
	 * 메인에서 게시글 전체 검색시 조회된 모든 게시글 갯수 조회
	 * </pre>
	 *
	 * @param param
	 * @return
	 * @throws SQLException
	 *
	 */
	public int selectCountTotSearchBbs(CmmnBbsVO param) throws SQLException{
		return getSqlSession().selectOne("bbs.selectCountTotSearchBbs", param);
	}
	
	/**
	 * <pre>
	 * 메인 페이지 게시글 리스트 조회
	 * </pre>
	 *
	 * @param param
	 * @return
	 * @throws SQLException
	 *
	 */
	public List<CmmnBbsVO> selectListBbsForMain(CmmnBbsVO param) throws SQLException{
		return getSqlSession().selectList("bbs.selectListBbsForMain", param);
	}
	
	
	/**
	 * <pre>
	 * 마스터에 첨부된 파일 리스트 조회
	 * </pre>
	 *
	 * @param param
	 * @return
	 *
	 */
	public List<CmmnBbsFileVO> selectFileList(CmmnBbsFileVO param){
		return getSqlSession().selectList("bbs.selectFileList", param);
	}
	
	/**
	 * <pre>
	 * 공지사항 seq를 구한다.
	 * </pre>
	 *
	 * @param param
	 * @return
	 *
	 */
	public String getNotiSeq(){
		String rtn = getSqlSession().selectOne("bbs.selectPopupNotiNo");
		return rtn;
	}
}
