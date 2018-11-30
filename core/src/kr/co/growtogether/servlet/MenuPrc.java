package kr.co.growtogether.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.microstrategy.web.objects.WebFolder;
import com.microstrategy.web.objects.WebObjectInfo;
import com.microstrategy.web.objects.WebObjectSource;
import com.microstrategy.web.objects.WebObjectsException;
import com.microstrategy.webapi.EnumDSSXMLObjectTypes;

/**
 * Servlet implementation class MenuPrc
 */
@WebServlet("/menuPrc")
public class MenuPrc extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public MenuPrc() {
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

		WebObjectSource wos = (WebObjectSource)request.getSession().getAttribute("webObject");

		String objId = request.getParameter("objId");

		if(wos != null) {
			try {
				WebObjectInfo objInfo = wos.getObject(objId, EnumDSSXMLObjectTypes.DssXmlTypeFolder, true);

				int objTypes[] =
					{EnumDSSXMLObjectTypes.DssXmlTypeReportDefinition, EnumDSSXMLObjectTypes.DssXmlTypeDocumentDefinition,
							EnumDSSXMLObjectTypes.DssXmlTypeShortcut, EnumDSSXMLObjectTypes.DssXmlTypeFolder};
				WebFolder folder = (WebFolder) objInfo;
				WebFolder subFolders = folder.findTypedObjects(objTypes);

				int size = subFolders.size();
				
				JSONArray jsonList = new JSONArray();
				for (int i = 0; i < size; i++) {
					WebObjectInfo woInfo = subFolders.get(i);
					JSONObject json = new JSONObject();
					json.put("id", woInfo.getID());
					json.put("disp", woInfo.getDisplayName());
					json.put("type", woInfo.getType());
					jsonList.put(json);
				}														
				
				response.getWriter().println(jsonList);
			} catch (WebObjectsException e) {
				e.printStackTrace();
			} catch (IllegalArgumentException e) {
				e.printStackTrace();
			} catch (JSONException e) {
				e.printStackTrace();
			}

		}
	}

}
