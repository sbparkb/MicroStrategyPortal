(function(){mstrmojo.requiresCls("mstrmojo.Base","mstrmojo.chart.enums.EnumNumberCategory");var $C=mstrmojo.chart,$CHART_ENUMS=$C.enums,$NC=$CHART_ENUMS.EnumNumberCategory;mstrmojo.chart.ChartAdvFormat=mstrmojo.declare(mstrmojo.Base,null,{scriptClass:"mstrmojo.chart.ChartAdvFormat",mFormatType:$NC.General,mDigits:0,mGrouping:3,mCurrency:"$",mPosCurr:0,mNegFormat:3,mCustomFormat:"General",init:function init(props){var $Hash=mstrmojo.hash;if(props&&props.ChartAdvFormat){var fmt=props.ChartAdvFormat;$Hash.copy(fmt,this);this.mCurrency=this.mCurrency||"$";this.mCustomFormat=this.mCustomFormat||"General";}},reset:function reset(format){var $Hash=mstrmojo.hash;$Hash.copy(format,this);},restore:function restore(){this.mFormatType=$NC.General;this.mDigits=0;this.mGrouping=3;this.mCurrency="$";this.mPosCurr=0;this.mNegFormat=3;this.mCustomFormat="General";}});mstrmojo.chart.dNF=new $C.ChartAdvFormat();mstrmojo.chart.dNF.isDefault=true;}());