/**
 * 
 */
	$(document).ready(function(){
		//한페이지 당 표시할 게시물 갯수
		var pageSize = pagesGridRowsPerPage;
		//현재 페이지 넘버
		var pageNo = pagesPageNo;
		//한 블록당 페이지 넘버 갯수
		var blockCount = PAGE_SIZE;
		var startIndex = pagesStartRow;
		var totSize = totCnt;		
		
		if(totSize == "" || totSize == 0){
			$("#pagingNav").hide();
		}else{
			$("#pagingNav").show();
		}
		
		pageSize = Number(pageSize);
		pageNo = Number(pageNo);
		startIndex = Number(startIndex);
		totSize = Number(totSize);
		
		var totPageCount = Math.ceil(totSize / pageSize);
		
		var totalBlockCount = Math.ceil(totSize/(pageSize*blockCount));
		
		var currBlock = Math.ceil(pageNo / blockCount);
		
		var startPage = (currBlock - 1) * blockCount + 1;
		var endPage = startPage + blockCount -1 ;
		
		if(endPage > totPageCount){
			endPage = totPageCount;
		}
		
		var totPage = 0;
		
		if(totSize >= pageSize){
			totPage = totSize / pageSize;
		}else{
			totPage = 1;
		}
		
		if(totSize % pageSize != 0){
			totPage += 1;
		}
		
		var pageHtml = "";
		pageHtml		+= "";
		if(currBlock > 1){
			pageHtml += "<a class='first' onclick='javascript:goPage(1)' >처음</a>&nbsp;";
			pageHtml += "<a href='#' class='prev' onclick='javascript:goPage(\""+((currBlock-2)*blockCount+1)+"\")'>이전</a>";
		}else{
			pageHtml += "<a class='first' onclick='javascript:goPage(1)' >처음</a>&nbsp;";
			pageHtml += "<a href='#' class='prev'>이전</a>";
		}
		
		for(var i=startPage; i <= endPage; i++){
			if(i == pageNo){
				pageHtml +="<strong>" + i +"</strong>";
			}else{
				pageHtml += "<a href='#' onclick='javascript:goPage(\""+i+"\")'>"+i+"</a>";
			}
		}
		
		if(currBlock < totalBlockCount){
			
			pageHtml += "<a href='#' class='next' onclick='javascript:goPage(\""+(currBlock*blockCount + 1)+"\")'>다음</a>&nbsp;";
			pageHtml += "<a href='#' class='last' onclick='javascript:goPage(\""+(totPageCount)+"\")'>마지막</a>";
			
		}else{
			pageHtml += "<a href='#' class='next nolink' ><span>NEXT</span></a>&nbsp;";
			pageHtml += "<a href='#' class='last' >마지막</a>";
		}
		pageHtml+="";
		$("#pagingNav").html(pageHtml);
		
	});

	function goPage(pageNo){
		
		$("#pageNo").val(pageNo);
		$("#searchForm").submit();
	}
