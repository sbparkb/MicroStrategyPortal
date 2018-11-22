package com.mstr.business.model;

import java.io.Serializable;

public class PromptAnswerJson implements Serializable {

	private static final long serialVersionUID = -5470149475210748519L;
	
	private int totalPage;

	private String objectID;

	private String displayName;

	private String parentName;

	private int displayUnitType;

	public String getObjectID() {
		return objectID;
	}

	public void setObjectID(String objectID) {
		this.objectID = objectID;
	}

	public String getDisplayName() {
		return displayName;
	}

	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}

	public String getParentName() {
		return parentName;
	}

	public void setParentName(String parentName) {
		this.parentName = parentName;
	}

	public int getDisplayUnitType() {
		return displayUnitType;
	}

	public void setDisplayUnitType(int displayUnitType) {
		this.displayUnitType = displayUnitType;
	}

	public int getTotalPage() {
		return totalPage;
	}

	public void setTotalPage(int totalPage) {
		this.totalPage = totalPage;
	}
	
}
