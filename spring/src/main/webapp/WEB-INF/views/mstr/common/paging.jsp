<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="sep"  uri="/sepMstrTL.tld"%>
<sep:paging pagesGridRowsPerPage="${params.gridRowsPerPage}" pagesPageNo="${params.pageNo}" pagesStartRow="${params.startRow}" searchGridRowsPerPage="${searchVO.gridRowsPerPage}" searchPageNo="${searchVO.pageNo}" searchStartRow="${searchVO.startRow}" totCnt="${totCnt}"/>
<script src="${fn:escapeXml(pageContext.request.contextPath)}/resource/pmd/common/paging.js"></script>
<p class="pageNum" id="pagingNav"></p>
