package kr.co.growtogether;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.microstrategy.web.objects.WebFolder;
import com.microstrategy.web.objects.WebIServerSession;
import com.microstrategy.web.objects.WebObjectInfo;
import com.microstrategy.web.objects.WebObjectSource;
import com.microstrategy.web.objects.WebObjectsException;
import com.microstrategy.webapi.EnumDSSXMLObjectTypes;

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
		WebIServerSession serverSession = loginService.getServerSession(request, response, serverName, projectName, userId, passWd);
		String sessionId = serverSession.saveState();
		
		request.getSession().invalidate();		
		request.getSession().setAttribute("usrSmgr", sessionId);
		
		String rootFolderId = "5B68C5AE433C728679340A91DC8F809C";
		
	    WebObjectSource wos = serverSession.getFactory().getObjectSource();
	    try {
			WebObjectInfo objInfo = wos.getObject(rootFolderId, EnumDSSXMLObjectTypes.DssXmlTypeFolder, true);
			
			int objTypes[] =
		        {EnumDSSXMLObjectTypes.DssXmlTypeReportDefinition, EnumDSSXMLObjectTypes.DssXmlTypeDocumentDefinition,
		          EnumDSSXMLObjectTypes.DssXmlTypeShortcut, EnumDSSXMLObjectTypes.DssXmlTypeFolder};
		      WebFolder folder = (WebFolder) objInfo;
		      WebFolder subFolders = folder.findTypedObjects(objTypes);
		      
		      StringBuffer leftStr = new StringBuffer();
		  	
		      int size = subFolders.size();
		      for (int i = 0; i < size; i++) {
		    	  WebObjectInfo woInfo = subFolders.get(i);
		    	  if (woInfo.getType() == EnumDSSXMLObjectTypes.DssXmlTypeFolder) {  
		    		 leftStr.append("<li id='").append(woInfo.getID())
		    		 .append("'>").append(woInfo.getDisplayName()).append("</li>"); 
		    	  }
		      }
		      
		      request.setAttribute("leftMenu", leftStr);
		      
		      RequestDispatcher dispatcher = getServletContext().getRequestDispatcher("/main.jsp");
		      dispatcher.forward(request,response);
		      
		} catch (WebObjectsException e) {
			e.printStackTrace();
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
		}
			
	}

}
