(function(){mstrmojo.requiresCls("mstrmojo.Base");mstrmojo.chart.common.DSSTimeUtil=mstrmojo.declare(mstrmojo.Base,null,{scriptClass:"mstrmojo.chart.common.DSSTimeUtil",DaysInMonth:[31,28,31,30,31,30,31,31,30,31,30,31],DaysBeforeMonth:[0,31,59,90,120,151,181,212,243,273,304,334],DateAbove1970:[1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1971,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1997,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1973,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1971,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1997,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1973,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1971,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1997,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1973,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1971,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1997,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1973,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1971,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1997,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1973,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981,1971,1972,1973,1974,1997,1976,1977,1978,1973,1980,1981,1971,1977,2012,1974,1997,1981,1988,1978,1973,1974,1992,1971,1977,1978,1996,1997,1981]});}());