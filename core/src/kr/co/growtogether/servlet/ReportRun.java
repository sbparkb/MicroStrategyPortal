package kr.co.growtogether.servlet;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class ReportRun
 */
@WebServlet("/reportRun")
public class ReportRun extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ReportRun() {
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
		
		String objectId = request.getParameter("id");
		String displayType = request.getParameter("type");
		String objectName = "";
		String evt = "";
		String src = "";

		if (displayType == "55") {
			objectName = "documentID";
			evt = "2048001";
			src = "mstrWeb.2048001";
		} else {
			objectName = "reportID";
			evt = "4001";
			src = "mstrWeb.4001";
		}
		
	    request.setAttribute("objectId", objectId);
	    request.setAttribute("objectName", objectName);
	    request.setAttribute("evt", evt);
	    request.setAttribute("src", src);
	    request.setAttribute("displayUnitType", displayType);
	      
	    RequestDispatcher dispatcher = getServletContext().getRequestDispatcher("/reportRun.jsp");
	    dispatcher.forward(request,response);
	}

}
