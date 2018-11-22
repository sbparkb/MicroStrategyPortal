package com.groto.web.login.service;

import java.sql.SQLException;
import java.sql.SQLTimeoutException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import com.groto.cmm.util.CmmUtil;
import com.groto.session.MSTRSessionUserImpl;
import com.groto.web.login.dao.LoginCheckDAO;
import com.groto.web.login.dao.LoginErpCheckDAO;

/**
 * Class Name : LoginCheckService Description : 로그인 체크 서비스
 * 
 * Modification Information
 * 
 * Mod Date Modifier Description ----------- --------
 * --------------------------- 2016. 12. 21. bae Generation
 * 
 * @author : bae
 * @date : 2016. 12. 21.
 * @version : 1.0
 */

@Service
@Transactional
public class LoginCheckService {

	private transient final Logger logger = LoggerFactory.getLogger(getClass());

	@Autowired
	private LoginCheckDAO checkDAO;

	@Autowired
	private LoginErpCheckDAO erpDAO;

	@Resource(name = "txManager2")
	private DataSourceTransactionManager txManager2;

	@Resource(name = "txManager")
	private DataSourceTransactionManager txManager;

	public void selectTimeoutCheck(int timeOutSec) throws SQLException, SQLTimeoutException {
		erpDAO.selectTimeoutCheck(timeOutSec);
	}

	public String selectEncPasswd(MSTRSessionUserImpl userInfo) throws SQLException {

		return checkDAO.selectEncPasswd(userInfo.getMstrUserPW());
	}

	public String selectEncPasswd(String nowPass) throws SQLException {

		return checkDAO.selectEncPasswd(nowPass);
	}

	public Map<String, Object> selectLoginCheck(MSTRSessionUserImpl userInfo) throws SQLException {

		Map<String, Object> params = new HashMap<String, Object>();

		params.put("USER_ID", userInfo.getMstrUserID());
		String passwd = userInfo.getMstrUserPW();
		params.put("COMP_CD", "01");

		return checkDAO.selectLoginCheck(params);
	}

	/**
	 * <pre>
	 * 엑셀업로드 권한이 있나 체크한다.
	 * </pre>
	 * 
	 * @param String groupIds
	 * @return True/False
	 * 
	 */
	public Boolean isExcelAuth(String mstrGroups) throws SQLException {

		int cnt = 0;
		cnt = checkDAO.selectExcelAuthCnt(mstrGroups);
		Boolean rtn = false;

		if (cnt > 0)
			rtn = true;

		return rtn;
	}

	public int updateLoginErrorCnt(String userId) throws SQLException {

		Map<String, Object> params = new HashMap<String, Object>();

		params.put("USER_ID", userId);
		params.put("COMP_CD", "01");

		return checkDAO.updateLoginErrorCnt(params);
	}

	public Boolean isErpTrou() throws SQLException {

		String compCd = "01";
		String check = checkDAO.selectErpTrouYn(compCd);

		Boolean rtn = true;
		if ("N".equals(check))
			rtn = false;
		return rtn;
	}

	public Boolean isTestAuth(String userId) throws SQLException {

		int cnt = 0;
		cnt = checkDAO.selectTestCnt(userId);
		Boolean rtn = false;

		if (cnt > 0)
			rtn = true;
		return rtn;
	}

	/**
	 * <pre>
	 * 엑셀업로드 권한List.
	 * </pre>
	 * 
	 * @param String mstrGroups
	 * @return List
	 * 
	 */
	public List selectExcelAuthList(String mstrGroups) throws SQLException {
		return checkDAO.selectExcelAuthList(mstrGroups);
	}

	public Map<String, Object> selectErpUser(MSTRSessionUserImpl userInfo) throws SQLException {

		Map<String, Object> params = new HashMap<String, Object>();
		params.put("USER_ID", userInfo.getMstrUserID());
		params.put("COMP_CD", "01");
		return erpDAO.selectErpUser(params);
	}

	public Map<String, Object> selectDwUser(String userId) throws SQLException {

		Map<String, Object> params = new HashMap<String, Object>();
		params.put("USR_ID", userId);
		params.put("COMP_CD", "01");

		return checkDAO.selectDwUser(params);
	}

	public Map<String, Object> selectDwUser(String userId, String pwd) throws SQLException {

		Map<String, Object> params = new HashMap<String, Object>();

		params.put("USR_ID", userId);
		params.put("COMP_CD", "01");
		params.put("PWD", pwd);

		return checkDAO.selectDwUser(params);
	}

	public Map<String, Object> selectDwUser(MSTRSessionUserImpl userInfo) throws SQLException {

		Map<String, Object> params = new HashMap<String, Object>();

		params.put("USR_ID", userInfo.getMstrUserID());
		String passwd = userInfo.getMstrUserPW();
		params.put("PWD", passwd);
		params.put("COMP_CD", "01");

		return checkDAO.selectDwUser(params);
	}

	public Map<String, Object> selectIdCheck(String userId) throws SQLException {

		Map<String, Object> params = new HashMap<String, Object>();

		params.put("USER_ID", userId);
		params.put("COMP_CD", "01");

		return checkDAO.selectIdCheck(params);
	}

	public Map<String, Object> selectIdDwCheck(String userId) throws SQLException {

		Map<String, Object> params = new HashMap<String, Object>();

		params.put("USR_ID", userId);
		params.put("COMP_CD", "01");

		return checkDAO.selectIdDwCheck(params);
	}

	public int insertErpUser(Map params) throws SQLException {
		return checkDAO.insertErpUser(params);
	}

	public int updateErpUser(Map params) throws SQLException {
		return checkDAO.updateErpUser(params);
	}

	public int insertErpToDwUser(Map params) throws SQLException {
		return checkDAO.insertErpToDwUser(params);
	}

	public int updateErpToDwUser(Map params) throws SQLException {
		return checkDAO.updateErpToDwUser(params);
	}

	public Map callSms(String userId, String otpText, String telNo) throws SQLException {

		Map<String, Object> params = new HashMap<String, Object>();

		params.put("PI_USERID", userId);
		params.put("PI_CONTENT", "인증번호[" + otpText + "]");
		params.put("PI_RECIPIENT_NUM", telNo);
		params.put("PO_RETURN_CODE", "");
		params.put("PO_RETURN_DATA", "");

		Map<String, Object> rtn = erpDAO.callSms(params);

		// OTP 암호화 로직
		Map<String, Object> encParams = new HashMap<String, Object>();
		encParams.put("EncOtp", otpText);
		String encrtn = erpDAO.selectEncOtp(encParams);

		rtn.put("EncOtp", encrtn);
		return rtn;
	}

	public Map callSms(String userId) throws SQLException {
		String otpText = selectOtpText();
		String telNo = selectMoblNo(userId);

		if ("".equals(telNo)) {
			return null;
		}
		return callSms(userId, otpText, telNo);
	}

	public String selectOtpText() throws SQLException {
		String rtn = erpDAO.selectOtpText();
		return rtn;
	}

	public String selectMoblNo(String userId) throws SQLException {

		Map<String, Object> params = new HashMap<String, Object>();

		params.put("USER_ID", userId);
		params.put("COMP_CD", "01");

		String rtn = erpDAO.selectMoblNo(params);
		return rtn;
	}

	public int insertSmsOtp(String userId, String otpText) throws SQLException {

		Map<String, Object> params = new HashMap<String, Object>();

		params.put("USR_ID", userId);
		params.put("SMS_OTP", otpText);
		params.put("COMP_CD", "01");

		return erpDAO.insertSmsOtp(params);
	}

	public int updateUserErrInit(String userId) throws SQLException {

		Map<String, Object> params = new HashMap<String, Object>();

		params.put("USR_ID", userId);
		params.put("COMP_CD", "01");

		return checkDAO.updateUserErrInit(params);
	}

	public int updateUserToErp(String userId, String pwd, String encPasswd) throws SQLException {

		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);

		TransactionStatus status = txManager2.getTransaction(def);
		int rtn = 0;
		try {

			Map<String, Object> params = new HashMap<String, Object>();

			params.put("USR_ID", userId);
			params.put("PWD", pwd);
			params.put("COMP_CD", "01");
			params.put("ENC_PWD", encPasswd);

			rtn = erpDAO.updateUserToErp(params);
			rtn = erpDAO.insertUserToErpHis(params);

			txManager2.commit(status);

		} catch (SQLException e) {
			txManager2.rollback(status);
			logger.error("[ " + this.getClass().getName().replaceAll("[\r\n]", "") + " , ERROR METHOD : "
					+ e.getStackTrace()[1].getMethodName().replaceAll("[\r\n]", "") + " ]");
			logger.error("ERROR MESSAGE : [ " + CmmUtil.exMessage(e) + " ]");
			throw e;
		}

		return rtn;
	}

	public List selectErpPwdHis(String userId, String pwd) throws SQLException {

		Map<String, Object> params = new HashMap<String, Object>();

		params.put("USR_ID", userId);
		params.put("COMP_CD", "01");

		return erpDAO.selectErpPwdHis(params);
	}

	public int isOldErpPwdHis(String userId, String encPasswd) throws SQLException {

		int rtn = 0;

		List oldHis = selectErpPwdHis(userId, encPasswd);

		for (int i = 0; i < oldHis.size(); i++) {
			Map map = (Map) oldHis.get(i);
			if (encPasswd.equals(map.get("PWD"))) {
				rtn = 1;
			}
		}

		return rtn;
	}

	/**
	 * 20180327 OTP DB 미저장 개선으로 인한 미사용 메소드
	 */
	public Map selectCheckSms(String userId, String smsData) throws SQLException {

		Map<String, Object> params = new HashMap<String, Object>();

		params.put("USER_ID", userId);
		params.put("COMP_CD", "01");
		params.put("SMS_DATA", smsData);

		return erpDAO.selectCheckSms(params);
	}

	/**
	 * 20180327 OTP DB 미저장 개선으로 인한 SESSION에 보관하고 있는 암호화 된 OTP 인자 추가
	 */
	public Map selectCheckSms(String userId, String smsData, String encOtp) throws SQLException {

		Map<String, Object> params = new HashMap<String, Object>();
		params.put("USER_ID", userId);
		params.put("COMP_CD", "01");
		params.put("SMS_DATA", smsData);
		params.put("ENC_OTP", encOtp);
		return erpDAO.selectCheckSmsEnc(params);
	}

	public int updateUserToDwAndBi(String userId, String pwd, String encPasswd) throws SQLException {

		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);

		TransactionStatus status = txManager.getTransaction(def);
		int rtn = 0;
		try {

			Map<String, Object> params = new HashMap<String, Object>();
			params.put("USR_ID", userId);
			params.put("PWD", encPasswd);
			params.put("COMP_CD", "01");
			params.put("LGIN_ERR_CNT", "0");

			rtn = checkDAO.updateErpToDwUser(params);
			rtn = checkDAO.updateErpUser(params);

			txManager.commit(status);

		} catch (SQLException e) {
			txManager.rollback(status);
			throw e;
		}

		return rtn;
	}

	public int updateLastLoginDate(String usrId) throws SQLException {

		Map<String, Object> params = new HashMap<String, Object>();

		params.put("USR_ID", usrId);
		params.put("COMP_CD", "01");

		return checkDAO.updateLastLoginDate(params);
	}

}// end of class