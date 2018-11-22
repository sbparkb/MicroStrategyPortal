package com.groto.web.login.dao;


import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Repository;


/**
 *  Class Name  :  LoginCheckDAO
 *  Description :  사용자 체크 DAO
 *
 *  Modification Information
 *
 *  Mod Date      Modifier Description
 *  -----------   -------- ---------------------------
 *  2015. 11. 10. lastpice Generation
 *
 * @author : lastpice@separtners.co.kr
 * @date : 2015. 11. 10. 오후 3:25:36
 * @version : 
 */ 
 

@Repository
public class LoginCheckDAO extends SqlSessionDaoSupport {


  public Map selectLoginCheck(Map<String, Object> params) throws SQLException {

    return (Map) getSqlSession().selectOne("loginCheck.selectLogin", params);
  }


  // login error count +1 update 
  public int updateLoginErrorCnt(Map<String, Object> params) throws SQLException {

    int rtn = getSqlSession().update("loginCheck.updateLoginErrorCnt", params);

    return rtn;
  }

  /**
   * ERP 오류 상태 확인
   * @param compCd
   * @return
   * @throws SQLException
   */
  public String selectErpTrouYn(String compCd) throws SQLException {
    String rtn = getSqlSession().selectOne("loginCheck.selectErpTrouYn", compCd).toString();
    return rtn;
  }
  
  public int selectExcelAuthCnt(String mstrGroups) throws SQLException {

    String[] mstrGroup = mstrGroups.split("[|]");
    HashMap<String, Object> hm = new HashMap<String, Object>();
    hm.put("mstrGroup", mstrGroup);

    String rtn = getSqlSession().selectOne("excel.selectExcelAuthCnt", hm).toString();
    return Integer.parseInt(rtn);
  }


  public List selectExcelAuthList(String mstrGroups) throws SQLException {

    String[] mstrGroup = mstrGroups.split("[|]");
    HashMap<String, Object> hm = new HashMap<String, Object>();
    hm.put("mstrGroup", mstrGroup);

    List rtn = getSqlSession().selectList("excel.selectExcelAuthList", hm);
    return rtn;
  }

 
  public Map selectIdCheck(Map<String, Object> params) throws SQLException {

    // this.setSqlSessionTemplate((SqlSessionTemplate) sqlSession);
    return (Map) getSqlSession().selectOne("loginCheck.selectIdCheck", params);
  }
  
  public Map selectIdDwCheck(Map<String, Object> params) throws SQLException {

    // this.setSqlSessionTemplate((SqlSessionTemplate) sqlSession);
    return (Map) getSqlSession().selectOne("loginCheck.selectIdDwCheck", params);
  }
  
  public Map selectDwUser(Map<String, Object> params) throws SQLException {
    return (Map) getSqlSession().selectOne("loginCheck.selectDwUser", params);
  }
  
  public int selectTestCnt(String userId) throws SQLException {
    String rtn = getSqlSession().selectOne("login.selectTestCnt", userId).toString();
    return Integer.parseInt(rtn);
  }

  public int insertErpToDwUser(Map params) throws SQLException {
    int rtn = getSqlSession().insert("loginCheck.insertErpToDwUser", params);
    return rtn;
  }

  public int updateErpToDwUser(Map params) throws SQLException {

    int rtn = getSqlSession().update("loginCheck.updateErpToDwUser", params);

    return rtn;
  }
  
  public int insertErpUser(Map params) throws SQLException {

    int rtn = getSqlSession().insert("loginCheck.insertErpUser", params);
    return rtn;
  }

  public int updateErpUser(Map params) throws SQLException {
    int rtn = getSqlSession().update("loginCheck.updateErpUser", params);
    return rtn;
  }
  
  // pwd 암호화
  public String selectEncPasswd(String pwd) throws SQLException {
    String rtn = getSqlSession().selectOne("loginCheck.selectEncPasswd", pwd).toString();
    return rtn;
  }
  
  
  public int updateUserErrInit(Map params) throws SQLException {
    int rtn = getSqlSession().update("loginCheck.updateUserErrInit", params);
    return rtn;
  }
  
  
  public int updateLastLoginDate(Map<String, Object> params) throws SQLException {

    int rtn = getSqlSession().update("loginCheck.updateLastLoginDate", params);

    return rtn;
  }
  
}
