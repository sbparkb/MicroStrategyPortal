package com.groto.service;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.groto.cmm.util.CmmUtil;
import com.microstrategy.utils.StringUtils;
import com.microstrategy.web.objects.WebFolder;
import com.microstrategy.web.objects.WebObjectInfo;
import com.microstrategy.web.objects.WebObjectsException;
import com.mstr.business.model.FolderInfo;
import com.mstr.business.model.ReportDetailInfo;
import com.mstr.business.model.ReportInfo;

/**
 * Class Name : ReportServiceImpl Description : 레포트 서비스
 * 
 * Modification Information
 * 
 * Mod Date Modifier Description ----------- --------
 * --------------------------- 2012. 3. 9. jjpark Generation
 *
 * @author jjpark
 * @since 2012. 3. 9.
 * @version 1.0
 */

@Service
public class ReportServiceImpl extends AbstractReportService implements ReportService, Serializable {

	private static final long serialVersionUID = -7596982282357095690L;

	private static final Logger LOGGER = Logger.getLogger(ReportServiceImpl.class);

	public List<FolderInfo> getLeftMenu() throws Exception {
		return this.getFolderList(null);
	}

	/*
	 * 리포트 리스트 조회
	 * 
	 * @see mstr.business.service.ReportService#getReportList(java.lang.String)
	 */
	public List<ReportInfo> getReportList(String objectID) throws Exception {

		List<ReportInfo> orgReportList = this.getFolderObjectList(objectID);
		List<ReportInfo> newReportList = new ArrayList<ReportInfo>();
		List<String> folderNameList = new ArrayList<String>();
		ReportInfo newFolderInfo = null;
		boolean existNewFolderInfo = false;
		StringBuffer folderStr = new StringBuffer();

		for (ReportInfo reportInfo : orgReportList) {

			/*
			 * 3 : 리포트 55 : 다큐먼트
			 */
			if (reportInfo.getDisplayUnitType() != 3 && reportInfo.getDisplayUnitType() != 55) {

				existNewFolderInfo = true;

				if (reportInfo.getDepth() <= folderNameList.size()) {

					int removeCount = folderNameList.size() - reportInfo.getDepth() + 1;

					for (int i = 0; i < removeCount; i++) {
						folderNameList.remove(reportInfo.getDepth() - 1);
					}
				}

				folderNameList.add(reportInfo.getDisplayName());

			} else {

				if (existNewFolderInfo) {

					for (int i = 0; i < folderNameList.size(); i++) {

						if (folderStr.length() > 0) {
							folderStr.append('>');
						}
						folderStr.append(folderNameList.get(i));
					}

					newFolderInfo = InstanceCreation.cReportInfo();
					newFolderInfo.setDepth(0);
					newFolderInfo.setDisplayName(folderStr.toString());
					newFolderInfo.setDisplayUnitType(8);
					newReportList.add(newFolderInfo);
					existNewFolderInfo = false;
				}

				newReportList.add(reportInfo);
			}
		}
		return newReportList;
	}

	public ReportDetailInfo getDetailReportInfo(String objectID, int displayUnitType) throws Exception {

		ReportDetailInfo reportInfo = null;
		WebObjectInfo webObjectInfo = getOriginReportInfo(objectID, displayUnitType);
		WebFolder webFolder = null;
		StringBuffer strDisplayPath = new StringBuffer();

		if (webObjectInfo != null) {

			reportInfo = new ReportDetailInfo(webObjectInfo);
			webFolder = webObjectInfo.getParent();

			while (StringUtils.isNotEqual(webFolder.getID(), "D3C7D461F69C4610AA6BAA5EF51F4125")) { // 최상위 폴더 ID
				try {
					if (webFolder.isRoot())
						break;

					if (strDisplayPath.length() > 0) {
						strDisplayPath.append('>').append(strDisplayPath);
					}

					strDisplayPath.append(webFolder.getDisplayName()).append(strDisplayPath);
					webFolder = webFolder.getParent();
				} catch (UnsupportedOperationException e) {
					LOGGER.error(CmmUtil.exMessage(e));
					break;
				} catch (WebObjectsException e) {
					LOGGER.error(CmmUtil.exMessage(e));
					break;
				}
			}
			reportInfo.setDisplayPath(strDisplayPath.toString());
		}
		return reportInfo;
	}

	public List<ReportInfo> getSearchReportList(String searchText) throws Exception {
		return super.searchReportList(searchText);
	}

	public String reportExecution(String sessionID, String objectID, int displayUnitType) throws WebObjectsException {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
		String strReportPromptXML = super.createReportPromptXML(sessionID, objectID, displayUnitType, request);
		return strReportPromptXML;
	}	

}
