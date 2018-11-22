package com.mstr.business.model;

import java.io.Serializable;

import com.microstrategy.web.objects.WebObjectInfo;

public class FolderInfo extends ObjectInfo implements Serializable {

	private static final long serialVersionUID = 8131943588976378721L;

	public FolderInfo() {
	}

	public FolderInfo(WebObjectInfo webObjectInfo) {
		if (webObjectInfo != null) {
			this.objectID = webObjectInfo.getID();
			this.displayName = webObjectInfo.getDisplayName();
			this.description = webObjectInfo.getDescription();
		}
	}

}
