package com.groto.web.login.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.SQLTimeoutException;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.groto.cmm.base.SqlSessionDaoSupportERP;

/**
 * Class Name : LoginErpCheckDAO Description : ERP 사용자 체크 DAO
 *
 * Modification Information
 *
 * Mod Date Modifier Description ----------- --------
 * --------------------------- 2015. 11. 10. lastpice Generation
 *
 * @author : lastpice@separtners.co.kr
 * @date : 2015. 11. 10. 오후 3:25:36
 * @version :
 */

@Repository
public class LoginErpCheckDAO extends SqlSessionDaoSupportERP {

	@Autowired
	private DataSource dataSource2;

	public void selectTimeoutCheck(int timeOutSec) throws SQLTimeoutException, SQLException {

		Connection conn = null; 
		PreparedStatement ps = null;
		
		try {
			conn = dataSource2.getConnection();		
			ps = conn.prepareStatement("SELECT 1 FROM DUAL");		
			ps.setQueryTimeout(timeOutSec);
			ps.executeQuery();
			
		}catch(SQLTimeoutException e) {
			throw e;
		}catch(SQLException e) {		
			throw e;
		}
		finally {
			if(ps != null) {
				ps.close();	
			}
			if(conn != null) {
				conn.close();	
			}			
		}
	}

	public Map selectErpUser(Map<String, Object> params) {

		// this.setSqlSessionTemplate((SqlSessionTemplate) sqlSession);
		return (Map) getSqlSession().selectOne("erp.selectErpUser", params);
	}

	public Map callSms(Map<String, Object> params) {

		// this.setSqlSessionTemplate((SqlSessionTemplate) sqlSession);
		int ret = getSqlSession().selectOne("erp.callSms", params);
		logger.error(String.valueOf(ret));
		return params;
	}

	public String selectOtpText() {

		// this.setSqlSessionTemplate((SqlSessionTemplate) sqlSession);
		return (String) getSqlSession().selectOne("erp.selectOtpText");
	}

	public String selectMoblNo(Map<String, Object> params) {

		// this.setSqlSessionTemplate((SqlSessionTemplate) sqlSession);
		return (String) getSqlSession().selectOne("erp.selectMoblNo", params);
	}

	public int insertSmsOtp(Map<String, Object> params) {

		int rtn = getSqlSession().insert("erp.insertSmsOtp", params);
		// System.out.println("rtn :" + rtn);
		return rtn;
	}

	public int insertUserToErpHis(Map<String, Object> params) throws SQLException {

		int rtn = getSqlSession().insert("erp.insertUserToErpHis", params);
		// System.out.println("rtn :" + rtn);
		return rtn;
	}

	public int updateUserToErp(Map<String, Object> params) throws SQLException {

		int rtn = getSqlSession().update("erp.updateUserToErp", params);
		// System.out.println("rtn :" + rtn);
		return rtn;
	}

	public List selectErpPwdHis(Map<String, Object> params) {
		List rtn = getSqlSession().selectList("erp.selectErpPwdHis", params);
		return rtn;
	}

	public Map selectCheckSms(Map<String, Object> params) {

		// this.setSqlSessionTemplate((SqlSessionTemplate) sqlSession);
		return (Map) getSqlSession().selectOne("erp.selectCheckSms", params);
	}

	public Map selectCheckSmsEnc(Map<String, Object> params) {

		// this.setSqlSessionTemplate((SqlSessionTemplate) sqlSession);
		return (Map) getSqlSession().selectOne("erp.selectCheckSmsEnc", params);
	}

	public String selectEncOtp(Map<String, Object> params) {
		return getSqlSession().selectOne("erp.selectEncryptionOtp", params);
	}

}
