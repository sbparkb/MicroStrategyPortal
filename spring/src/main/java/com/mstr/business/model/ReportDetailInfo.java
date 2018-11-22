package com.mstr.business.model;

import java.io.Serializable;

import com.microstrategy.web.objects.WebObjectInfo;

public class ReportDetailInfo extends ReportInfo implements Serializable {

	private static final long serialVersionUID = -8254144680168512951L;

	private String displayPath;
	
	public ReportDetailInfo() {
	}

	public ReportDetailInfo(WebObjectInfo webObjectInfo) {
		if (webObjectInfo != null) {
			this.objectID = webObjectInfo.getID();
			this.displayName = webObjectInfo.getDisplayName();
			//this.description = webObjectInfo.getDescription();
		}
	}
	
	/**
	 * @return the displayPath
	 */
	public String getDisplayPath() {
		return displayPath;
	}
	
	/**
	 * @param displayPath the displayPath to set
	 */
	public void setDisplayPath(String displayPath) {
		this.displayPath = displayPath;
	}

}
