package kr.co.growtogether.esm;

import com.microstrategy.web.app.AbstractExternalSecurity;
import com.microstrategy.web.app.LoginForm;
import com.microstrategy.web.beans.RequestKeys;
import com.microstrategy.web.platform.ContainerServices;

public class CustomExternalSecurity extends AbstractExternalSecurity {

	@Override
	public int handlesAuthenticationRequest(RequestKeys reqKey, ContainerServices cs, int reason) {
		// Ŀ���� �α��� �������� �̵�
		System.out.println("���� ���� �� �̵�");
		return USE_MSTR_DEFAULT_LOGIN;
	}

	@Override
	public boolean processMSTRLoginForm(RequestKeys reqKey, ContainerServices cs, LoginForm form, int reason) {
		
		String loginName = form.getLoginName();
		String loginPwd = form.getPassword();
						
		System.out.println(loginName);
		System.out.println(loginPwd);
		System.out.println("Ŀ���� �α��� �׽�Ʈ");

		return super.processMSTRLoginForm(reqKey, cs, form, reason);
	}

}
