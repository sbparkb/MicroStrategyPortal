package com.groto.web.login.dao;


import java.sql.SQLException;

import org.apache.ibatis.session.SqlSession;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Repository;


/**
 *  Class Name  :  LoginEncDAO
 *  Description :  사용자 체크(암호화) DAO
 *
 *  Modification Information
 *
 *  Mod Date      Modifier Description
 *  -----------   -------- ---------------------------
 *  2016. 12. 13. bae      Generation
 *
 * @author : bae
 * @date :  2016. 12. 13.
 * @version : 
 */ 
 
@Repository
public class LoginEncDAO 
extends SqlSessionDaoSupport {
 
	private SqlSession sqlSessionEnc;
 
	/**
	 * @param bbsvo
	 * @return
	 *
	 */
	public String selectPasswd(String params) throws SQLException{
		
		this.setSqlSessionTemplate((SqlSessionTemplate) sqlSessionEnc);
		return (String)getSqlSession().selectOne("enc.selectPasswd", params);
	}

  public SqlSession getSqlSessionEnc() {
    return sqlSessionEnc;
  }

  public void setSqlSessionEnc(SqlSession sqlSessionEnc) {
    this.sqlSessionEnc = sqlSessionEnc;
  }

}