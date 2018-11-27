package kr.co.growtogether;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.co.growtogether.service.LoginService;

/**
 * Servlet implementation class LoginPrc
 */
@WebServlet(name = "loginPrc", urlPatterns = { "/loginPrc" })
public class LoginPrc extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public LoginPrc() {
        super();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String userId = request.getParameter("userId");
		String passWd = request.getParameter("passWd");
		String serverName = request.getParameter("serverName");
		String projectName = request.getParameter("projectName");
		
		LoginService loginService = new LoginService();
		String sessionId = loginService.getServerSession(request, response, serverName, projectName, userId, passWd);
		
		request.getSession().invalidate();		
		request.getSession().setAttribute("usrSmgr", sessionId);
		
		Cookie cookie = new Cookie("mstrSmgr", sessionId);
		cookie.setPath("/");
		cookie.setMaxAge(-1);
		response.addCookie(cookie);
	}

}
