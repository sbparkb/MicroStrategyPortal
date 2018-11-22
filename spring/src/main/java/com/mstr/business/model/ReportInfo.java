package com.mstr.business.model;

import java.io.Serializable;

import com.microstrategy.web.objects.SimpleList;
import com.microstrategy.web.objects.WebObjectInfo;

public class ReportInfo extends ObjectInfo implements Serializable {

	private static final long serialVersionUID = 1369943858380912021L;

	private int depth;

	  private int displayUnitType;
	  private SimpleList ancestors;
    private String description;
    private String owner;
    private String modificationTime;
    private int subType;
    private String objPath;
    private String displayPathName;

    public ReportInfo() {}
    
    public ReportInfo(WebObjectInfo webObjectInfo) {
		if (webObjectInfo != null) {
      this.objectID = webObjectInfo.getID();
      this.displayName = webObjectInfo.getDisplayName();
      this.description = webObjectInfo.getDescription();
      this.displayUnitType = webObjectInfo.getDisplayUnitType();
      this.ancestors = webObjectInfo.getAncestors();
      this.description = webObjectInfo.getDescription();
      this.owner = webObjectInfo.getAbbreviation();
      this.modificationTime = webObjectInfo.getModificationTime();
      this.subType = webObjectInfo.getSubType();
		}
	}
	
	public ReportInfo(WebObjectInfo webObjectInfo, int depth) {
		if (webObjectInfo != null) {
			this.depth = depth;
			this.objectID = webObjectInfo.getID();
			this.displayName = webObjectInfo.getDisplayName();
			this.description = webObjectInfo.getDescription();
			this.displayUnitType = webObjectInfo.getDisplayUnitType();
			this.ancestors = webObjectInfo.getAncestors();
			this.description = webObjectInfo.getDescription();
			this.owner = webObjectInfo.getAbbreviation();
			this.modificationTime = webObjectInfo.getModificationTime();
			this.subType = webObjectInfo.getSubType();
		}
	}

	public String getDisplayPathName() {
		return displayPathName;
	}

	public void setDisplayPathName(String displayPathName) {
		this.displayPathName = displayPathName;
	}

	public String getObjPath() {
		return objPath;
	}

	public void setObjPath(String objPath) {
		this.objPath = objPath;
	}

	/**
	 * @return the displayUnitType
	 */
	public int getDisplayUnitType() {
		return displayUnitType;
	}

	/**
	 * @param displayUnitType
	 *        the displayUnitType to set
	 */
	public void setDisplayUnitType(int displayUnitType) {
		this.displayUnitType = displayUnitType;
	}

	/**
	 * @return the depth
	 */
	public int getDepth() {
		return depth;
	}

	/**
	 * @param depth
	 *        the depth to set
	 */
	public void setDepth(int depth) {
		this.depth = depth;
	}

	public SimpleList getAncestors() {
		return ancestors;
	}

	public void setAncestors(SimpleList ancestors) {
		this.ancestors = ancestors;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getOwner() {
		return owner;
	}

	public void setOwner(String owner) {
		this.owner = owner;
	}

	public String getModificationTime() {
		return modificationTime;
	}

	public void setModificationTime(String modificationTime) {
		this.modificationTime = modificationTime;
	}

	public int getSubType() {
		return subType;
	}

	public void setSubType(int subType) {
		this.subType = subType;
	}

}
