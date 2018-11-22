package com.mstr.business.comparator;

import java.util.Comparator;

import com.microstrategy.web.objects.WebDisplayUnitEntry;
import com.mstr.business.model.FolderInfo;

public class DisplayNameComparator implements Comparator<Object> {
	public int compare(Object o1, Object o2) {
		String s1 = "";
		String s2 = "";
		if(o1 instanceof WebDisplayUnitEntry && o2 instanceof WebDisplayUnitEntry) {
			s1 = ((WebDisplayUnitEntry)o1).getValue().getDisplayName();
			s2 = ((WebDisplayUnitEntry)o2).getValue().getDisplayName();	
		} else if(o1 instanceof FolderInfo && o2 instanceof FolderInfo) {
			s1 = ((FolderInfo)o1).getDisplayName();
			s2 = ((FolderInfo)o2).getDisplayName();
		}
		return s1.compareTo(s2);
	}
}