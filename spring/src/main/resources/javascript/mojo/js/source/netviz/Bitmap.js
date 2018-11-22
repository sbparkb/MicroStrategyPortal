(function(){mstrmojo.requiresCls("mstrmojo.Base");var DEBUG=false;mstrmojo.netviz.Bitmap=mstrmojo.declare(mstrmojo.Base,null,{scriptClass:"mstrmojo.netviz.Bitmap",init:function(props){if(this._super){this._super();}var scale=props.scale||1,left=props.left,top=props.top,right=props.right,bottom=props.bottom;if(scale>1){left/=scale;top/=scale;right/=scale;bottom/=scale;}this._colCnt=Math.ceil(right)-Math.floor(left)+1;this._rowCnt=Math.ceil(bottom)-Math.floor(top)+1;this._scale=scale;this._bits=[];},testZeros:function(box){var b=boundsCheck.call(this,box),left=b.left,top=b.top,right=b.right,bottom=b.bottom,bits=this._bits,colCnt=this._colCnt,row,col,val;for(row=top;row<=bottom;row+=1){for(col=left;col<=right;col+=1){val=bits[row*colCnt+col];if(val&&overlap(val,box)){return false;}}}return true;},set:function(box){var b=boundsCheck.call(this,box),left=b.left,top=b.top,right=b.right,bottom=b.bottom,bits=this._bits,colCnt=this._colCnt,row,col,idx;for(row=top;row<=bottom;row+=1){for(col=left;col<=right;col+=1){idx=row*colCnt+col;if(!bits[idx]){bits[idx]=box;}}}}});function overlap(a,b){if(a.left>b.right||b.left>a.right){return false;}if(a.top>b.bottom||b.top>a.bottom){return false;}return true;}function boundsCheck(box){var left=box.left,top=box.top,right=box.right,bottom=box.bottom,colCnt=this._colCnt,rowCnt=this._rowCnt,scale=this._scale;if(scale>1){left/=scale;top/=scale;right/=scale;bottom/=scale;}left=Math.floor(left);right=Math.ceil(right);top=Math.floor(top);bottom=Math.ceil(bottom);if(right>=colCnt){right=colCnt-1;}if(left<0){left=0;}if(left>right){left=right;}if(bottom>=rowCnt){bottom=rowCnt-1;}if(top<0){top=0;}if(top>bottom){top=bottom;}return{top:top,left:left,bottom:bottom,right:right};}if(DEBUG){(function(){function box(left,top,right,bottom){return{left:left,top:top,right:right,bottom:bottom};}var bitmap=new mstrmojo.netviz.Bitmap({left:0,top:0,right:100,bottom:100});console.assert(bitmap.testZeros(box(10,15,50,20)));bitmap.set(box(10,25,50,50));console.assert(bitmap._bits.reduce(function(v){return v+1;},0)===41*26);console.assert(bitmap.testZeros(box(10,15,50,20)));console.assert(!bitmap.testZeros(box(10,15,50,25)));console.assert(!bitmap.testZeros(box(0,0,100,100)));console.assert(bitmap.testZeros(box(75,70,100,75)));console.assert(bitmap.testZeros(box(-1,-1,-1,-1)));console.assert(bitmap.testZeros(box(-1,100,1000,1000)));console.assert(!bitmap.testZeros(box(50,50,50,50)));}());}}());