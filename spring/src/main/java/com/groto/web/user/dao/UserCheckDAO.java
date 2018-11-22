package com.groto.web.user.dao;


import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Repository;

/**
 *  Class Name  :  UserCheckDAO
 *  Description :  유저관리 체크 DAO
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
public class UserCheckDAO extends SqlSessionDaoSupport {
 
	public int selectPwdHisCnt(String userId, String encPwd) throws SQLException{
		
		Map map = new HashMap();
		map.put("USER_ID", userId);
		map.put("PASSWORD", encPwd);
 		String rtn = getSqlSession().selectOne("user.selectPwdHisCnt", map).toString();
		return  Integer.parseInt(rtn);
	}
 
	
	public int insertUserPwdHis(String userId, String encPwd) throws SQLException{
		
		Map map = new HashMap();
		map.put("USER_ID", userId);
		map.put("PASSWORD", encPwd);
		return getSqlSession().insert("user.insertUserPwdHis", map);
 
	}
}
