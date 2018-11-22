(function(){mstrmojo.requiresCls("mstrmojo.VBox","mstrmojo.Label","mstrmojo.Box","mstrmojo.QB.DBRoleSetting","mstrmojo.QB.DBRoleSettingPulldown","mstrmojo.QB.DBRoleSettingCheckbox");mstrmojo.requiresDescs(7820,8512);function trim(str){if(!str){return"";}return str.replace(/^\s\s*/,"").replace(/\s\s*$/,"");}function getDBType(list,type){var p=list.scrollbox.tbl.contents;switch(type){case list.SupportedDBTypes.SupportedDBTypesUndefined:if(!p.dsnlist.selectedItem){return list.DatabaseTypes.DatabaseTypeReserved;}switch(p.dsnlist.selectedItem.des){case"MicroStrategy ODBC Driver for SQL Server Wire Protocol":case"SQL Server":return list.DatabaseTypes.DatabaseTypeSQLServer;case"MicroStrategy ODBC Driver for DB2 Wire Protocol":case"DB2 Wire":case"DB2 iSeries":case"DB2 z/OS":return list.DatabaseTypes.DatabaseTypeDB2;case"MicroStrategy ODBC Driver for Greenplum Wire Protocol":return list.DatabaseTypes.DatabaseTypePostgreSQL;case"MicroStrategy ODBC Driver for Informix Wire Protocol":case"Informix Wire":case"Informix XPS":case"MicroStrategy ODBC Driver for Informix XPS":return list.DatabaseTypes.DatabaseTypeInformix;case"MicroStrategy ODBC Driver for MySQL Wire Protocol":case"MySQL":case"MySQL ODBC 5.1 Driver":case"MySQL ODBC 3.51 Driver":return list.DatabaseTypes.DatabaseTypeMySQL;case"MicroStrategy ODBC Driver for Oracle Wire Protocol":case"Oracle":case"Microsoft ODBC for Oracle":case"iAnywhere Solutions 11 - Oracle":return list.DatabaseTypes.DatabaseTypeOracle;case"MicroStrategy ODBC Driver for PostgreSQL Wire Protocol":case"Postgre SQL":return list.DatabaseTypes.DatabaseTypePostgreSQL;case"MicroStrategy ODBC Driver for Sybase ASE Wire Protocol":case"Sybase ASE":case"Sybase IQ":case"Sybase IQ 12.7 ODBC":case"Sybase IQ 15.x ODBC":case"Adaptive Server IQ":case"Sybase IQ 12.7 ODBC Driver":case"Sybase IQ 15.x ODBC Driver":return list.DatabaseTypes.DatabaseTypeSybase;case"SQL Anywhere 11":case"Adaptive Server Anywhere 9.0":return list.DatabaseTypes.DatabaseTypeSybaseSQLAny;case"nCluster ANSI":case"nCluster":return list.DatabaseTypes.DatabaseTypeAster;case"HPODBC":case"HP ODBC 2.0":return list.DatabaseTypes.DatabaseTypeNeoview;case"NetezzaSQL":return list.DatabaseTypes.DatabaseTypeNetezza;case"Red Brick 6.3 Driver":case"Red Brick (32) Driver":case"Red Brick (64) Driver":return list.DatabaseTypes.DatabaseTypeRedBrick;case"TERADATA_SERVER":case"Teradata":case"Teradata Driver":return list.DatabaseTypes.DatabaseTypeTeradata;case"MicroStrategy ODBC Driver for Text":case"Microsoft Text Driver (*.txt; *.csv)":return list.DatabaseTypes.DatabaseTypeGeneric;case"Vertica driver":case"Vertica ODBC Driver 3.5":case"Vertica ODBC Driver 4.0":return list.DatabaseTypes.DatabaseTypeVertica;case"Microsoft Access Driver (*.mdb)":case"Driver do Microsoft Access (*.mdb)":case"Microsoft Access-Treiber (*.mdb)":return list.DatabaseTypes.DatabaseTypeAccess;case"Microsoft Excel Driver (*.xls)":case"Microsoft Excel-Treiber (*.xls)":case"Driver do Microsoft Excel(*.xls)":return list.DatabaseTypes.DatabaseTypeExcel;case"OpenAccess for Salesforce":case"MicroStrategy OpenAccess for Salesforce (Workstation)":return list.DatabaseTypes.DatabaseTypeOpenAccess;case"Hive ODBC Driver":case"Hive Driver v1":return list.DatabaseTypes.DatabaseTypeHive;case"ParAccel":return list.DatabaseTypes.DatabaseTypeParAccel;case"MicroStrategy ODBC Driver for Salesforce":return list.DtabaseTypes.DatabaseTypeSalesforce;case"Microsoft Access Driver":return list.SupportedDBTypes.SupportedDBTypesAccess;default:return list.DatabaseTypes.DatabaseTypeGeneric;}case list.SupportedDBTypes.SupportedDBTypesDB2Wire:case list.SupportedDBTypes.SupportedDBTypesDB2iSeries:case list.SupportedDBTypes.SupportedDBTypesDB2ZOS:return list.DatabaseTypes.DatabaseTypeDB2;case list.SupportedDBTypes.SupportedDBTypesInformixWire:case list.SupportedDBTypes.SupportedDBTypesInformixXPS:return list.DatabaseTypes.DatabaseTypeInformix;case list.SupportedDBTypes.SupportedDBTypesPostgreSQL:return list.DatabaseTypes.DatabaseTypePostgreSQL;case list.SupportedDBTypes.SupportedDBTypesSybaseASE:case list.SupportedDBTypes.SupportedDBTypesSybaseIQ:return list.DatabaseTypes.DatabaseTypeSybase;case list.SupportedDBTypes.SupportedDBTypesOracle:return list.DatabaseTypes.DatabaseTypeOracle;case list.SupportedDBTypes.SupportedDBTypesSQLServer:return list.DatabaseTypes.DatabaseTypeSQLServer;case list.SupportedDBTypes.SupportedDBTypesTeradata:return list.DatabaseTypes.DatabaseTypeTeradata;case list.SupportedDBTypes.SupportedDBTypesMySQL:return list.DatabaseTypes.DatabaseTypeMySQL;case list.SupportedDBTypes.SupportedDBTypesGreenPlum:return list.DatabaseTypes.DatabaseTypePostgreSQL;case list.SupportedDBTypes.SupportedDBTypesNetezza:return list.DatabaseTypes.DatabaseTypeNetezza;case list.SupportedDBTypes.SupportedDBTypesWebServices:return list.DatabaseTypes.DatabaseTypeXQuery;case list.SupportedDBTypes.SupportedDBTypesHive:return list.DatabaseTypes.DatabaseTypeHive;case list.SupportedDBTypes.SupportedDBTypesSalesforce:return list.DatabaseTypes.DatabaseTypeSalesForce;case list.SupportedDBTypes.SupportedDBTypesAccess:return list.SupportedDBTypes.SupportedDBTypesAccess;default:return type;}}function checkEmptyText(caption,txt){if(txt==""){return"";}else{return caption+txt+";";}}function generateConnStr(list){var c=list.scrollbox.tbl.contents;var connstr;switch(list.type){case list.SupportedDBTypes.SupportedDBTypesUndefined:if(c.dsnlist.selectedItem){return checkEmptyText("DSN=",c.dsnlist.selectedItem.n);}else{return"";}break;case list.SupportedDBTypes.SupportedDBTypesSalesForce:connstr="DRIVER={MicroStrategy ODBC Driver for Salesforce};";if(c.children[0].children[0].children[1].value!=""){connstr=connstr+"HOST={"+c.children[0].children[0].children[1].value+"};";}connstr=connstr+"CO(AuditColumns=AuditOnly;MapSystemColumnNames=0;CustomSuffix=Include);SCL=0;TM=1;";return connstr;break;case list.SupportedDBTypes.SupportedDBTypesDB2Wire:connstr="DRIVER={MicroStrategy ODBC Driver for DB2 Wire Protocol};";connstr=connstr+checkEmptyText("IpAddress=",c.children[0].text);connstr=connstr+checkEmptyText("TcpPort=",c.children[1].text);connstr=connstr+checkEmptyText("Database=",c.children[2].text);return connstr;case list.SupportedDBTypes.SupportedDBTypesDB2iSeries:connstr="DRIVER={MicroStrategy ODBC Driver for DB2 Wire Protocol};";connstr=connstr+checkEmptyText("IpAddress=",c.children[0].text);connstr=connstr+checkEmptyText("Collection=",c.children[1].text);connstr=connstr+checkEmptyText("Location=",c.children[2].text);connstr=connstr+checkEmptyText("DefaultIsolationLevel=",c.children[3].selectedItem.v);connstr=connstr+checkEmptyText("PackageOwner=",c.children[4].text);connstr=connstr+checkEmptyText("TcpPort=",c.children[5].text);return connstr;case list.SupportedDBTypes.SupportedDBTypesDB2ZOS:connstr="DRIVER={MicroStrategy ODBC Driver for DB2 Wire Protocol};";connstr=connstr+checkEmptyText("IpAddress=",c.children[0].text);connstr=connstr+checkEmptyText("Collection=",c.children[1].text);connstr=connstr+checkEmptyText("Location=",c.children[2].text);connstr=connstr+checkEmptyText("PackageCollection=",c.children[3].text);connstr=connstr+checkEmptyText("PackageOwner=",c.children[4].text);connstr=connstr+checkEmptyText("TcpPort=",c.children[5].text);return connstr;case list.SupportedDBTypes.SupportedDBTypesInformixWire:connstr="DRIVER={MicroStrategy ODBC Driver for Informix Wire Protocol};";connstr=connstr+checkEmptyText("ServerName=",c.children[0].text);connstr=connstr+checkEmptyText("HostName=",c.children[1].text);connstr=connstr+checkEmptyText("PortNumber=",c.children[2].text);connstr=connstr+checkEmptyText("Database=",c.children[3].text);return connstr;case list.SupportedDBTypes.SupportedDBTypesInformixXPS:connstr="DRIVER={MicroStrategy ODBC Driver for Informix XPS};";connstr=connstr+checkEmptyText("Database=",c.children[0].text);connstr=connstr+checkEmptyText("ServerName=",c.children[1].text);connstr=connstr+checkEmptyText("HostName=",c.children[2].text);connstr=connstr+checkEmptyText("Service=",c.children[3].text);connstr=connstr+checkEmptyText("Protocol=",c.children[4].selectedItem.v);return connstr;case list.SupportedDBTypes.SupportedDBTypesPostgreSQL:connstr="DRIVER={MicroStrategy ODBC Driver for PostgreSQL Wire Protocol};";connstr=connstr+checkEmptyText("HostName=",c.children[0].text);connstr=connstr+checkEmptyText("PortNumber=",c.children[1].text);connstr=connstr+checkEmptyText("Database=",c.children[2].text);return connstr;case list.SupportedDBTypes.SupportedDBTypesSybaseASE:var conn=new String(c.children[0].text);conn=conn.replace(",","%%%");connstr="DRIVER={MicroStrategy ODBC Driver for Sybase ASE Wire Protocol};";connstr=connstr+checkEmptyText("NetworkAddress=",conn);connstr=connstr+checkEmptyText("Database=",c.children[1].text);return connstr;case list.SupportedDBTypes.SupportedDBTypesSybaseIQ:var dbms=list.dbmslist.selectedItem;switch(dbms.db_ver){case list.DatabaseVersions.DatabaseVersionDBSybaseIQ127:connstr="DRIVER={Adaptive Server IQ};";break;default:connstr="DRIVER={Sybase IQ};";connstr=connstr+"DriverUnicodeType=1;";break;}connstr=connstr+checkEmptyText("EngineName=",c.children[0].text);connstr=connstr+checkEmptyText("DatabaseName=",c.children[3].text);var commLinks=checkEmptyText("host=",c.children[1].text);commLinks=commLinks+checkEmptyText("port=",c.children[2].text);connstr=connstr+"CommLinks=tcpip("+commLinks+");";return connstr;case list.SupportedDBTypes.SupportedDBTypesOracle:connstr="DRIVER={MicroStrategy ODBC Driver for Oracle Wire Protocol};";var sn="";if(c.RB0.checked){svr=c.children[1].text;if(mstrmojo.array.indexOf(svr,",")===-1){connstr=connstr+checkEmptyText("HostName=",c.children[1].text);connstr=connstr+checkEmptyText("PortNumber=",c.children[2].text);}else{ar=svr.split(",");svr=ar[0];prt=ar[1];connstr=connstr+checkEmptyText("HostName=",svr);connstr=connstr+checkEmptyText("PortNumber=",prt);}connstr=connstr+checkEmptyText("SID=",c.children[3].text);sn=c.children[4].text;sn=sn.replace(",","%%%");connstr=connstr+checkEmptyText("ServiceName=",sn);connstr=connstr+checkEmptyText("AlternateServers=",c.children[5].text);}else{if(c.RB1.checked){connstr=connstr+checkEmptyText("ServerName=",c.children[7].text);connstr=connstr+checkEmptyText("TNSNamesFile=",c.children[8].text);}}connstr=connstr+"EnableNCharSupport=1;";return connstr;case list.SupportedDBTypes.SupportedDBTypesSQLServer:var mdl=mstrmojo.all.QBuilderModel;var svr,prt;var ar=new Array();if(mstrmojo.array.indexOf(mdl.drivers,"MicroStrategy ODBC Driver for SQL Server Wire Protocol")>=0){connstr="DRIVER={MicroStrategy ODBC Driver for SQL Server Wire Protocol};";}else{connstr="DRIVER={SQL Server};";}svr=c.children[0].text;if(mstrmojo.array.indexOf(svr,",")===-1){connstr=connstr+checkEmptyText("Server=",c.children[0].text);}else{ar=svr.split(",");svr=ar[0];prt=ar[1];connstr=connstr+checkEmptyText("Server=",svr);connstr=connstr+checkEmptyText("Port=",prt);}connstr=connstr+checkEmptyText("Database=",c.children[1].text);if(c.children[2]){connstr=connstr+checkEmptyText("UseWindowsAuthenticationForLogin=",c.children[2].checked);}else{connstr=connstr+"UseWindowsAuthenticationForLogin=False";}return connstr;case list.SupportedDBTypes.SupportedDBTypesTeradata:connstr="DRIVER={Teradata};";connstr=connstr+checkEmptyText("DBCName=",c.children[0].text);connstr=connstr+checkEmptyText("Database=",c.children[1].text);connstr=connstr+checkEmptyText("UseIntegratedSecurity=",c.children[2].checked);var s=c.children[3].selectedItem.v;if(s=="&nbsp;"){s="";}connstr=connstr+checkEmptyText("Authentication Mechanism=",s);connstr=connstr+checkEmptyText("Authentication Mechanism Data=",c.children[4].text);return connstr;case list.SupportedDBTypes.SupportedDBTypesMySQL:case list.SupportedDBTypes.SupportedDBTypesInfoBright:connstr="DRIVER={MicroStrategy ODBC Driver for MySQL Wire Protocol};";connstr=connstr+checkEmptyText("HostName=",c.children[0].text);connstr=connstr+checkEmptyText("PortNumber=",c.children[1].text);connstr=connstr+checkEmptyText("Database=",c.children[2].text);return connstr;case list.SupportedDBTypes.SupportedDBTypesGreenPlum:connstr="DRIVER={MicroStrategy ODBC Driver for Greenplum Wire Protocol};";connstr=connstr+checkEmptyText("HostName=",c.children[0].text);connstr=connstr+"PortNumber=5432;";connstr=connstr+checkEmptyText("Database=",c.children[1].text);connstr=connstr+checkEmptyText("AlternateServers=",c.children[2].text);return connstr;case list.SupportedDBTypes.SupportedDBTypesNetezza:connstr="DRIVER={NetezzaSQL};";connstr=connstr+checkEmptyText("servername=",c.children[0].text);connstr=connstr+checkEmptyText("port=",c.children[1].text);connstr=connstr+checkEmptyText("database=",c.children[2].text);return connstr;case list.SupportedDBTypes.SupportedDBTypesWebServices:if(c.children[0].selectedItem.v==="XQuery"){connstr="XQUERY;";}else{connstr="XQUERY;Salesforce";}return connstr;case list.SupportedDBTypes.SupportedDBTypesAccess:connstr="Driver={Microsoft Access Driver};";connstr=connstr+checkEmptyText("DBQ=",c.children[0].text);return connstr;case list.SupportedDBTypes.SupportedDBTypesHive:var mdl=mstrmojo.all.QBuilderModel;var dbms=list.dbmslist.selectedItem;if(dbms.db_ver===list.DatabaseVersions.DatabaseVersionDBHiveThrift){connstr="DRIVER={Hive ODBC Driver};";connstr=connstr+checkEmptyText("SERVER=",c.children[0].text);connstr=connstr+checkEmptyText("PORT=",c.children[1].text);connstr=connstr+checkEmptyText("DATABASE=",c.children[2].text);return connstr;}else{if(mstrmojo.array.indexOf(mdl.drivers,"Hive Driver v1")>=0){connstr="DRIVER={Hive Driver v1};";}else{if(mstrmojo.array.indexOf(mdl.drivers,"Cloudera ODBC Driver for Apache Hive")>=0){connstr="DRIVER={Cloudera ODBC Driver for Apache Hive};";}else{if(mstrmojo.array.indexOf(mdl.drivers,"Hive Driver")>=0){connstr="DRIVER={Hive Driver};";}else{connstr="DRIVER={Hive ODBC Driver};";}}}connstr=connstr+checkEmptyText("HOST=",c.children[0].text);connstr=connstr+checkEmptyText("PORT=",c.children[1].text);connstr=connstr+checkEmptyText("DATABASE=",c.children[2].text);return connstr;}}}function applyContents(l,suppdb){if(l.info.connstr){var c=l.scrollbox.tbl.contents;var conn=l.info.connstr;conn=conn.split(";")[0];var conntype=(conn.split("=")[0]).toUpperCase();switch(conntype){case"DSN":conn=conn.substring(conntype.length+1,conn.length);c.dsnlist.set("selectedID",conn);break;case"XQUERY":break;default:conn=l.info.connstr;conn=conn.replace("CommLinks=tcpip(","");conn=conn.replace(")","");var items=conn.split(";");var id=mstrmojo.array.indexOf;var index=id(items,"");while(index>-1){items.splice(index,1);index=id(items,"");}var driver=(items[0].split("=")[1]);driver=driver.replace("{","");driver=driver.replace("}","");switch(driver){case"MicroStrategy ODBC Driver for Salesforce":var item=items[1].split("=");c.children[0].set("text",item[1]);break;break;case"MicroStrategy ODBC Driver for DB2 Wire Protocol":switch(suppdb){case l.SupportedDBTypes.SupportedDBTypesDB2Wire:for(var i=1;i<items.length;i++){var item=items[i].split("=");switch(item[0]){case"IpAddress":c.children[0].set("text",item[1]);break;case"TcpPort":c.children[1].set("text",item[1]);break;case"Database":c.children[2].set("text",item[1]);break;}}break;case l.SupportedDBTypes.SupportedDBTypesDB2iSeries:for(var i=1;i<items.length;i++){var item=items[i].split("=");switch(item[0]){case"IpAddress":c.children[0].set("text",item[1]);break;case"Collection":c.children[1].set("text",item[1]);break;case"Location":c.children[2].set("text",item[1]);break;case"DefaultIsolationLevel":c.children[3].set("selectedID",item[1]);break;case"PackageOwner":c.children[4].set("text",item[1]);break;case"TcpPort":c.children[5].set("text",item[1]);break;}}break;case l.SupportedDBTypes.SupportedDBTypesDB2ZOS:for(var i=1;i<items.length;i++){var item=items[i].split("=");switch(item[0]){case"IpAddress":c.children[0].set("text",item[1]);break;case"Collection":c.children[1].set("text",item[1]);break;case"Location":c.children[2].set("text",item[1]);break;case"PackageCollection":c.children[3].set("text",item[1]);break;case"PackageOwner":c.children[4].set("text",item[1]);break;case"TcpPort":c.children[5].set("text",item[1]);break;}}break;}break;case"MicroStrategy ODBC Driver for Informix Wire Protocol":for(var i=1;i<items.length;i++){var item=items[i].split("=");switch(item[0]){case"ServerName":c.children[0].set("text",item[1]);break;case"HostName":c.children[1].set("text",item[1]);break;case"PortNumber":c.children[2].set("text",item[1]);break;case"Database":c.children[3].set("text",item[1]);break;}}break;case"MicroStrategy ODBC Driver for Informix XPS":for(var i=1;i<items.length;i++){var item=items[i].split("=");switch(item[0]){case"Database":c.children[0].set("text",item[1]);break;case"ServerName":c.children[1].set("text",item[1]);break;case"HostName":c.children[2].set("text",item[1]);break;case"Service":c.children[3].set("text",item[1]);break;case"Protocol":c.children[4].set("selectedID",item[1]);break;}}break;case"MicroStrategy ODBC Driver for PostgreSQL Wire Protocol":for(var i=1;i<items.length;i++){var item=items[i].split("=");switch(item[0]){case"HostName":c.children[0].set("text",item[1]);break;case"PortNumber":c.children[1].set("text",item[1]);break;case"Database":c.children[2].set("text",item[1]);break;}}break;case"MicroStrategy ODBC Driver for Sybase ASE Wire Protocol":for(var i=1;i<items.length;i++){var item=items[i].split("=");switch(item[0]){case"NetworkAddress":c.children[0].set("text",item[1]);break;case"Database":c.children[1].set("text",item[1]);break;}}break;case"Adaptive Server IQ":case"Sybase IQ":for(var i=1;i<items.length;i++){var item=items[i].split("=");switch(item[0]){case"EngineName":c.children[0].set("text",item[1]);break;case"host":c.children[1].set("text",item[1]);break;case"port":c.children[2].set("text",item[1]);break;case"DatabaseName":c.children[3].set("text",item[1]);break;}}break;case"MicroStrategy ODBC Driver for Oracle Wire Protocol":var rb0=false;var rb1=false;for(var i=1;i<items.length;i++){var item=items[i].split("=");switch(item[0]){case"HostName":c.children[1].set("text",item[1]);rb0=true;break;case"PortNumber":c.children[2].set("text",item[1]);rb0=true;break;case"SID":c.children[3].set("text",item[1]);rb0=true;break;case"ServiceName":c.children[4].set("text",item[1]);rb0=true;break;case"AlternateServers":c.children[5].set("text",item[1]);rb0=true;break;case"ServerName":c.children[7].set("text",item[1]);rb1=true;break;case"TNSNamesFile":c.children[8].set("text",item[1]);rb1=true;break;}}if(rb0){c.RB0.set("checked",true);}if(rb1){c.RB1.set("checked",true);}break;case"MicroStrategy ODBC Driver for SQL Server Wire Protocol":case"SQL Server":for(var i=1;i<items.length;i++){var item=items[i].split("=");switch(item[0]){case"Server":c.children[0].set("text",item[1]);break;case"Port":c.children[0].set("text",c.children[0].text+","+item[1]);break;case"Address":c.children[0].set("text",item[1]);break;case"Database":c.children[1].set("text",item[1]);break;case"UseWindowsAuthenticationForLogin":if(item[1]=="true"){c.children[2].set("checked",true);}break;}}break;case"Teradata":for(var i=1;i<items.length;i++){var item=items[i].split("=");switch(item[0]){case"DBCName":c.children[0].set("text",item[1]);break;case"Database":c.children[1].set("text",item[1]);break;case"UseIntegratedSecurity":if(item[1]=="true"){c.children[2].set("checked",true);}break;case"Authentication Mechanism":c.children[3].set("selectedID",item[1]);break;case"Authentication Mechanism Data":c.children[4].set("text",item[1]);break;}}break;case"InfoBright":case"MicroStrategy ODBC Driver for MySQL Wire Protocol":for(var i=1;i<items.length;i++){var item=items[i].split("=");switch(item[0]){case"HostName":c.children[0].set("text",item[1]);break;case"PortNumber":c.children[1].set("text",item[1]);break;case"Database":c.children[2].set("text",item[1]);break;}}break;case"MicroStrategy ODBC Driver for Greenplum Wire Protocol":for(var i=1;i<items.length;i++){var item=items[i].split("=");switch(item[0]){case"HostName":c.children[0].set("text",item[1]);break;case"Database":c.children[1].set("text",item[1]);break;case"AlternateServers":c.children[2].set("text",item[1]);break;}}break;case"NetezzaSQL":for(var i=1;i<items.length;i++){var item=items[i].split("=");switch(item[0]){case"servername":c.children[0].set("text",item[1]);break;case"port":c.children[1].set("text",item[1]);break;case"database":c.children[2].set("text",item[1]);break;}}break;case"Microsoft Access Driver":for(var i=1;i<items.length;i++){var item=items[i].split("=");var tmp=item[1];tmp=tmp.replace(/\\\\/g,"\\");switch(item[0]){case"DBQ":c.children[0].set("text",tmp);break;}}break;case"Hive Driver v1":case"Hive ODBC Driver":for(var i=1;i<items.length;i++){var item=items[i].split("=");switch(item[0]){case"HOST":c.children[0].set("text",item[1]);break;case"PORT":c.children[1].set("text",item[1]);break;case"DATABASE":c.children[2].set("text",item[1]);break;}}break;}break;}}}function findIndex(l){if(l.info.connstr){var conn=l.info.connstr;conn=conn.split(";")[0];var conntype=(conn.split("=")[0]).toUpperCase();conn=conn.substring(conntype.length+1,conn.length);switch(conntype){case"DSN":return l.SupportedDBTypes.SupportedDBTypesUndefined;case"XQUERY":return l.SupportedDBTypes.SupportedDBTypesWebServices;case"DRIVER":conn=conn.replace("{","");conn=conn.replace("}","");switch(conn){case"MicroStrategy ODBC Driver for DB2 Wire Protocol":switch(l.info.dbms){case"68CD44318CF911D5804400C04F780688":case"68CD44358CF911D5804400C04F780688":case"6BBD10E2D0794AF7B7ED1E2AA06F6460":case"6BBD10E3D0794AF7B7ED1E2AA06F6460":case"080A7832229F4E92B01316C2250115FE":return l.SupportedDBTypes.SupportedDBTypesDB2iSeries;case"1D076B3E099F11D4800100C04F780688":case"68CD443B8CF911D5804400C04F780688":case"38F387A18191493D8CBF8861BCAF7D41":return l.SupportedDBTypes.SupportedDBTypesDB2ZOS;default:return l.SupportedDBTypes.SupportedDBTypesDB2Wire;}case"MicroStrategy ODBC Driver for Salesforce":return l.SupportedDBTypes.SupportedDBTypesSalesForce;case"MicroStrategy ODBC Driver for Informix Wire Protocol":return l.SupportedDBTypes.SupportedDBTypesInformixWire;case"MicroStrategy ODBC Driver for Informix XPS":return l.SupportedDBTypes.SupportedDBTypesInformixXPS;case"MicroStrategy ODBC Driver for PostgreSQL Wire Protocol":return l.SupportedDBTypes.SupportedDBTypesPostgreSQL;case"MicroStrategy ODBC Driver for Sybase ASE Wire Protocol":return l.SupportedDBTypes.SupportedDBTypesSybaseASE;case"MicroStrategy ODBC Driver for Oracle Wire Protocol":return l.SupportedDBTypes.SupportedDBTypesOracle;case"SQL Server":case"MicroStrategy ODBC Driver for SQL Server Wire Protocol":return l.SupportedDBTypes.SupportedDBTypesSQLServer;case"MicroStrategy ODBC Driver for MySQL Wire Protocol":return l.SupportedDBTypes.SupportedDBTypesMySQL;case"InfoBright":return l.SupportedDBTypesSupportedDBTypesInfoBright;case"Teradata":return l.SupportedDBTypes.SupportedDBTypesTeradata;case"Sybase IQ 12.7 ODBC":case"Sybase IQ 15.x ODBC":case"Sybase IQ":case"Adaptive Server IQ":return l.SupportedDBTypes.SupportedDBTypesSybaseIQ;case"MicroStrategy ODBC Driver for Greenplum Wire Protocol":return l.SupportedDBTypes.SupportedDBTypesGreenPlum;case"NetezzaSQL":return l.SupportedDBTypes.SupportedDBTypesNetezza;case"Hive Driver v1":case"Hive ODBC Driver":return l.SupportedDBTypes.SupportedDBTypesHive;case"Microsoft Access Driver":return l.SupportedDBTypes.SupportedDBTypesAccess;default:return l.SupportedDBTypes.SupportedDBTypesUndefined;}default:return l.SupportedDBTypes.SupportedDBTypesUndefined;}}else{return l.SupportedDBTypes.SupportedDBTypesUndefined;}}function addControlInternal(ty,str,i,dv,pv){var t;switch(ty){case"text":t=new mstrmojo.QB.DBRoleSetting({caption:str,alias:"dbp"+i});if(dv){t.tbl.children[1].value=dv;}break;case"number":t=new mstrmojo.QB.DBRoleSetting({caption:str,isNumeric:true,alias:"dbp"+i});break;case"list":var itf="v";if(pv[0].n){itf="n";for(var pvi=0;pvi<pv.length;pvi++){pv[pvi].n=mstrmojo.desc(pv[pvi].mojoIDS,pv[pvi].n);}}t=new mstrmojo.QB.DBRoleSettingPulldown({caption:str,alias:"dbp"+i,itemIdField:"v",itemField:itf,alias:"dbp"+i});t.render();t.set("items",pv);t.set("selectedID",pv[0].v);break;case"boolean":t=new mstrmojo.QB.DBRoleSettingCheckbox({caption:str});break;}return t;}function addControl(item,c){if(item.DBP){var dbp=item.DBP;if(dbp.length){for(var i=0;i<dbp.length;i++){var d=dbp[i];var str=mstrmojo.desc(d.mojoIDS,d.n);var t=addControlInternal(d.t,str,i,d.defaultValue,d.PV);c.addChildren([t]);}}else{var d=dbp;var str=mstrmojo.desc(d.mojoIDS,d.n);var t=addControlInternal(d.t,str,0,d.defaultValue,d.PV);c.addChildren([t]);}}}function getItemById(items,id){var item;for(var cn=0;cn<items.length;cn++){item=items[cn];if(item.id==id){return item;}}}function buildContents(list,index){var mdl=mstrmojo.all.QBuilderModel;var c=list.scrollbox.tbl.contents;var l=list.selectlist;if(!c){return ;}if((mdl.isCloud)&&(index==0)){var item=getItemById(l.items,1);}else{var item=getItemById(l.items,index);}if(!item){return ;}l.set("selectedID",item.id);list.type=item.id;if(item.id==list.SupportedDBTypes.SupportedDBTypesUndefined){if(c.children){c.removeChildren(null,true);}var s=new mstrmojo.QB.DBRoleSettingPulldown({caption:"dsn:",alias:"dsnlist",itemIdField:"n",onChange:function(evt){if(list.onDSNChange){list.onDSNChange(getDBType(list,0));}}});s.set("items",mdl.dsns);c.addChildren([s]);}else{if(c.children){c.removeChildren(null,true);}if(item.DBPS){var dbps=item.DBPS;for(idbps=0;idbps<dbps.length;idbps++){var d=dbps[idbps];var str=mstrmojo.desc(d.mojoIDS,d.n);var r=new mstrmojo.RadioButton({label:str,alias:"RB"+idbps,index:idbps,count:dbps.length,cssText:"padding-top: 15px;font-weight:900;",cssDisplay:"block",onclick:function(){if(this.isChecked()){for(j=0;j<this.count;j++){this.parent["RB"+j].set("checked",false);}this.set("checked",true);}}});c.addChildren([r]);addControl(d,c);}}else{addControl(item,c);}}}function addContents(dsnc){var mdl=mstrmojo.all.QBuilderModel;dsnc.selectlist.set("items",mdl.suppdbs);}function RestrictDBType(w,dbtype){var mdl=mstrmojo.all.QBuilderModel;var alldbms=mdl.dbms;var dbmslist=w.dbmslist;var sdb=w.SupportedDBTypes;dbmslist.set("items",null);if(dbtype==sdb.SupportedDBTypesUndefined){var mdbms=new Array();for(var i=0,j=0;i<alldbms.length;i++){if(alldbms[i].did!="F10446E31B03410E912FB029F19B3799"){mdbms[j]=alldbms[i];j++;}}dbmslist.set("items",mdbms);if(mdbms.length>0){dbmslist.set("selectedID",mdbms[0].did);}else{dbmslist.set("selectedID",null);}}else{var dbmsbytype=new Array();var index=0;var dbv=w.DatabaseVersions;for(var i=0;i<alldbms.length;i++){var dbms=alldbms[i];switch(dbtype){case sdb.SupportedDBTypesSalesForce:switch(dbms.db_ver){case dbv.DatabaseVersionDBSalesForce:dbmsbytype[index++]=dbms;}break;case sdb.SupportedDBTypesDB2iSeries:switch(dbms.db_ver){case dbv.DatabaseVersionDBIBMDB2400V5R1:case dbv.DatabaseVersionDBIBMDB2400V5R2:case dbv.DatabaseVersionDBIBMDB2400V5R4:case dbv.DatabaseVersionDBIBMDB2400V6R1:case 134:dbmsbytype[index++]=dbms;}break;case sdb.SupportedDBTypesDB2Wire:switch(dbms.db_ver){case dbv.DatabaseVersionDBIBMUDB7:case dbv.DatabaseVersionDBIBMUDB8:case dbv.DatabaseVersionDBIBMUDB91:case dbv.DatabaseVersionDBIBMUDB95:case dbv.DatabaseVersionDBIBMUDB97:dbmsbytype[index++]=dbms;}break;case sdb.SupportedDBTypesDB2ZOS:switch(dbms.db_ver){case dbv.DatabaseVersionDBIBMDB2OS3907:case dbv.DatabaseVersionDBIBMDB2OS3908:case dbv.DatabaseVersionDBIBMUDB91zOS:dbmsbytype[index++]=dbms;}break;case sdb.SupportedDBTypesPostgreSQL:switch(dbms.db_ver){case dbv.DatabaseVersionDBPostgreSQL81:case dbv.DatabaseVersionDBPostgreSQL82:case dbv.DatabaseVersionDBPostgreSQL83:case dbv.DatabaseVersionDBPostgreSQL84:dbmsbytype[index++]=dbms;}break;case sdb.SupportedDBTypesGreenPlum:switch(dbms.db_ver){case dbv.DatabaseVersionDBGreenplum3x:case 141:dbmsbytype[index++]=dbms;}break;case sdb.SupportedDBTypesInfoBright:switch(dbms.db_ver){case dbv.DatabaseVersionDBInfobright33:case dbv.DatabaseVersionDBInfobright40:dbmsbytype[index++]=dbms;}break;case sdb.SupportedDBTypesMySQL:switch(dbms.db_ver){case dbv.DatabaseVersionDBMySQL50:case dbv.DatabaseVersionDBMySQL51:dbmsbytype[index++]=dbms;}break;case sdb.SupportedDBTypesSybaseASE:switch(dbms.db_ver){case dbv.DatabaseVersionDBSybaseASE15:case dbv.DatabaseVersionDBSybaseAdaptive115:case dbv.DatabaseVersionDBSybaseAdaptive12:case dbv.DatabaseVersionDBSybaseAdaptive125:dbmsbytype[index++]=dbms;}break;case sdb.SupportedDBTypesSybaseIQ:switch(dbms.db_ver){case dbv.DatabaseVersionDBSybaseIQ112:case dbv.DatabaseVersionDBSybaseIQ12:case dbv.DatabaseVersionDBSybaseIQ127:case dbv.DatabaseVersionDBSybaseIQ15:case dbv.DatabaseVersionDBSybaseIQ151:case dbv.DatabaseVersionDBSybaseIQ152:dbmsbytype[index++]=dbms;}break;case sdb.SupportedDBTypesInformixWire:switch(dbms.db_ver){case dbv.DatabaseVersionDBInformix10:case dbv.DatabaseVersionDBInformixIDS10:case dbv.DatabaseVersionDBInformixIDS11:case dbv.DatabaseVersionDBInformixIDS115:case dbv.DatabaseVersionDBInformixIDS93:case dbv.DatabaseVersionDBInformixIDS94:case dbv.DatabaseVersionDBInformixODS724UC1:case dbv.DatabaseVersionDBInformixODS731:case dbv.DatabaseVersionDBInformixUDO92:dbmsbytype[index++]=dbms;}break;case sdb.SupportedDBTypesInformixXPS:switch(dbms.db_ver){case dbv.DatabaseVersionDBInformixXPS82:case dbv.DatabaseVersionDBInformixXPS83:dbmsbytype[index++]=dbms;}break;case sdb.SupportedDBTypesSQLServer:switch(dbms.db_ver){case dbv.DatabaseVersionDBSQLServer2000:case dbv.DatabaseVersionDBSQLServer2005:case dbv.DatabaseVersionDBSQLServer2008:case dbv.DatabaseVersionDBSQLServer65:case dbv.DatabaseVersionDBSQLServer70:dbmsbytype[index++]=dbms;}break;case sdb.SupportedDBTypesWebServices:switch(dbms.db_ver){case dbv.DatabaseVersionDBXQuery:dbmsbytype[index++]=dbms;}break;case sdb.SupportedDBTypesTeradata:switch(dbms.db_ver){case dbv.DatabaseVersionDBTeradataV2R1:case dbv.DatabaseVersionDBTeradataV2R20002:case dbv.DatabaseVersionDBTeradataV2R21:case dbv.DatabaseVersionDBTeradatav2R3:case dbv.DatabaseVersionDBTeradataNTV2R2:case dbv.DatabaseVersionDBTeradataNTV2R3:case dbv.DatabaseVersionDBTeradataV2R4:case dbv.DatabaseVersionDBTeradataV2R41:case dbv.DatabaseVersionDBTeradataV2R5:case dbv.DatabaseVersionDBTeradataV2R51:case dbv.DatabaseVersionDBTeradataV2R6:case dbv.DatabaseVersionDBTeradataV2R61:case dbv.DatabaseVersionDBTeradataV2R62:case dbv.DatabaseVersionDBTeradata12:case dbv.DatabaseVersionDBTeradata120:case dbv.DatabaseVersionDBTeradata13:dbmsbytype[index++]=dbms;}break;case sdb.SupportedDBTypesHive:switch(dbms.db_ver){case dbv.DatabaseVersionDBHive05:case dbv.DatabaseVersionDBHive06:case dbv.DatabaseVersionDBHive07:dbmsbytype[index++]=dbms;break;case dbv.DatabaseVersionDBHiveThrift:if(!(w.selectlist.selectedID===0)){dbmsbytype[index++]=dbms;break;}}break;case sdb.SupportedDBTypesAccess:switch(dbms.db_ver){case dbv.DatabaseVersionDBAccess20:case dbv.DatabaseVersionDBAccess70:case dbv.DatabaseVersionDBAccess2000:case dbv.DatabaseVersionDBAccess2002:case dbv.DatabaseVersionDBAccess2003:case dbv.DatabaseVersionDBAccess2007:dbmsbytype[index++]=dbms;break;}break;default:if(dbms.db_type==w.supportedToType(dbtype)){dbmsbytype[index++]=dbms;}break;}}dbmslist.set("items",dbmsbytype);if(dbmsbytype.length>0){dbmslist.set("selectedID",dbmsbytype[0].did);}else{dbmslist.set("selectedID",null);}}}mstrmojo.QB.DBRoleDSNConnection=mstrmojo.declare(mstrmojo.Box,null,{scriptClass:"mstrmojo.QB.DBRoleDSNConnection",postBuildRendering:function(){if(this._super){this._super();}addContents(this);},info:null,oninfoChange:function(evt){var suppdb=findIndex(this);buildContents(this,suppdb);applyContents(this,suppdb);},onDSNChange:null,onConnectionChange:null,DSNless:true,children:[{scriptClass:"mstrmojo.QB.DBRoleSettingPulldown",alias:"selectlist",itemIdField:"id",caption:mstrmojo.desc(7820,"select:"),cellLayout:[{cssText:"width: 20%;"},{cssText:"width:345px;"}],onChange:function(evt){dsnless=this.parent.DSNless;if(!dsnless){buildContents(this.parent,evt.value);if(this.parent.onConnectionChange){this.parent.onConnectionChange(this.parent.type);}}else{buildContents(this.parent,this.selectedItem.id);RestrictDBType(this.parent,this.selectedItem.id);}}},{scriptClass:"mstrmojo.QB.DBRoleSettingPulldown",alias:"dbmslist",itemIdField:"did",caption:mstrmojo.desc(8512,"dbms:")},{scriptClass:"mstrmojo.Box",alias:"scrollbox",cssText:"margin:5px 0px;width:407px;border:1px solid #bbbbbb;background-color:#FFFFFF;overflow-y:auto;overflow-x:hidden;max-height:160px;",children:[{scriptClass:"mstrmojo.Table",rows:1,cols:2,alias:"tbl",cssText:"width:410px;background-color:#FFFFFF;padding-left:15px;",children:[{scriptClass:"mstrmojo.VBox",alias:"contents",cssText:"width:100%;",slot:"0,1"}]}]}],type:0,supportedToType:function(supptype){return getDBType(this,supptype);},connstr:function(){return generateConnStr(this);},dbtype:function(){return getDBType(this,this.type);},DatabaseVersions:{DatabaseVersionDatabaseVersionDefault:-1,DatabaseVersionDatabaseVersionReserved:0,DatabaseVersionDBTandemMPD45:1,DatabaseVersionDBTandemMX1:2,DatabaseVersionDBTandemMPD42:3,DatabaseVersionDBTeradataV2R1:4,DatabaseVersionDBTeradataV2R20002:5,DatabaseVersionDBTeradataV2R21:6,DatabaseVersionDBTeradatav2R3:7,DatabaseVersionDBOracle733:8,DatabaseVersionDBOracle8003:9,DatabaseVersionDBSQLServer65:10,DatabaseVersionDBSQLServer70:11,DatabaseVersionDBAccess20:12,DatabaseVersionDBAccess70:13,DatabaseVersionDBSybaseAdaptive115:14,DatabaseVersionDBSybaseSQL112:15,DatabaseVersionDBSybaseIQ112:16,DatabaseVersionDBIBMDB2OS39041:17,DatabaseVersionDBIBMDB2OS39050:18,DatabaseVersionDBIBMUDBSMP50:19,DatabaseVersionDBIBMUDBEEE50:20,DatabaseVersionDBIBMDB2PE12:21,DatabaseVersionDBIBMDB2CS212:22,DatabaseVersionDBIBMDB2400V3R7:23,DatabaseVersionDBIBMDB2400V4R1:24,DatabaseVersionDBIBMDB2400V4R2:25,DatabaseVersionDBInformixODS724UC1:26,DatabaseVersionDBInformixXPS82:27,DatabaseVersionDBAdabaseD6112:28,DatabaseVersionDBRedBrick5007:29,DatabaseVersionDBRedBrick5012:30,DatabaseVersionDBRedBrick5105:31,DatabaseVersionDBTeradataNTV2R2:32,DatabaseVersionDBTeradataNTV2R3:33,DatabaseVersionDBOracle8i:34,DatabaseVersionDBSybaseIQ12:35,DatabaseVersionDBIBMUDB52:36,DatabaseVersionDBIBMDB2400V4R3:37,DatabaseVersionDBInformixODS731:38,DatabaseVersionDBInformixUDO92:39,DatabaseVersionDBInformixXPS83:40,DatabaseVersionDBIBMUDB61:41,DatabaseVersionDBOracle805:42,DatabaseVersionDBOracle8iR2:43,DatabaseVersionDBIBMUDB7:44,DatabaseVersionDBIBMDB2OS39062:45,DatabaseVersionDBIBMDB2OS3907:46,DatabaseVersionDBIBMDB2400V4R4:47,DatabaseVersionDBIBMDB2400V4R5:48,DatabaseVersionDBRedBrick6:49,DatabaseVersionDBTeradataV2R4:50,DatabaseVersionDBSybaseAdaptive12:51,DatabaseVersionDBSQLServer2000:52,DatabaseVersionDBAccess2000:53,DatabaseVersionDBInformix10:54,DatabaseVersionDBOracle8iR3:55,DatabaseVersionDBOracle9i:56,DatabaseVersionRedBrick61:57,DatabaseVersionDBIBMUDB8:58,DatabaseVersionDBOracle8iR2SE:59,DatabaseVersionDBTeradataV2R41:61,DatabaseVersionDBAccess2002:62,DatabaseVersionDBIBMDB2400V5R1:63,DatabaseVersionDBSybaseAdaptive125:64,DatabaseVersionDBRedBrick62:65,DatabaseVersionDBIBMDB2400V5R2:66,DatabaseVersionDBTeradataV2R5:67,DatabaseVersionMDXSAPBW30:68,DatabaseVersionDBOracle10g:69,DatabaseVersionDBTeradataV2R51:70,DatabaseVersionDBInformixIDS93:71,DatabaseVersionDBInformixIDS94:72,DatabaseVersionDBRedBrick63:73,DatabaseVersionDBIBMDB2OS3908:74,DatabaseVersionDBNetezza22:75,DatabaseVersionDBExcel2003:76,DatabaseVersionDBNetezza25:77,DatabaseVersionMDXEssbaseHyperion:78,DatabaseVersionMDXMicrosoftAS2005:79,DatabaseVersionDBMySQL50:80,DatabaseVersionDBPostgreSQL81:81,DatabaseVersionDBInformixIDS10:82,DatabaseVersionDBInformixIDS11:82,DatabaseVersionDBOracle10gR2:83,DatabaseVersionDBTeradataV2R6:84,DatabaseVersionDBTeradataV2R61:85,DatabaseVersionDBSybaseASE15:86,DatabaseVersionDBSQLServer2005:87,DatabaseVersionMDXMicrosoftAS2000:88,DatabaseVersionDBIBMDB2400V5R4:89,DatabaseVersionDBNetezza3:90,DatabaseVersionDBNetezza30:90,DatabaseVersionDBSybaseIQ127:91,DatabaseVersionDBIBMUDB91:92,DatabaseVersionDBTeradataV2R62:93,DatabaseVersionDBPostgreSQL82:94,DatabaseVersionDBPostgreSQL83:94,DatabaseVersionDBHPNeoview22:95,DatabaseVersionDBHPNeoview20:95,DatabaseVersionDBOracle11g:96,DatabaseVersionDBNetezza4:97,DatabaseVersionDBNetezza40:97,DatabaseVersionMDXEssbaseHyperion9:98,DatabaseVersionDBGreenplum3x:99,DatabaseVersionDBHPNeoview23:100,DatabaseVersionDBIBMUDB95:101,DatabaseVersionDBTeradata12:102,DatabaseVersionDBTeradata120:102,DatabaseVersionDBIBMUDB91zOS:103,DatabaseVersionDBAccess2007:104,DatabaseVersionDBIBMDB2400V6R1:105,DatabaseVersionDBMetamatrix55:106,DatabaseVersionDBDATAllegro3x:107,DatabaseVersionDBComposite450:108,DatabaseVersionDBAccess2003:109,DatabaseVersionDBSQLServer2008:110,DatabaseVersionDBMySQL51:111,DatabaseVersionMDXMicrosoftAS2008:112,DatabaseVersionDBAsternCluster30:113,DatabaseVersionDBVertica25:114,DatabaseVersionMDXEssbaseHyperion9x:115,DatabaseVersionDBOpenAccess14:116,DatabaseVersionDBSybaseSQLAny11:117,DatabaseVersionDBNetezza46:118,DatabaseVersionDBTeradata13:119,DatabaseVersionDBSybaseIQ15:120,DatabaseVersionDBSybaseIQ151:121,DatabaseVersionDBHPNeoview24:122,DatabaseVersionDBIBMUDB97:123,DatabaseVersionDBNetezza50:124,DatabaseVersionDBVertica30:125,DatabaseVersionMDXSAPBW7x:126,DatabaseVersionDBOracle11gR2:127,DatabaseVersionDBInformixIDS115:128,DatabaseVersionDBPostgreSQL84:129,DatabaseVersionDBSQLServer2008NativeClient:130,DatabaseVersionDBInfobright33:136,DatabaseVersionDBSybaseIQ152:139,DatabaseVersionDBHive05:138,DatabaseVersionDBXQuery:142,DatabaseVersionParAccel:151,DatabaseVersionDBHive06:152,DatabaseVersionDBHive07:153,DatabaseVersionDBSalesForce:154,DatabaseVersionDBHiveThrift:156,DatabaseVersionDBInfobright40:160},DatabaseTypes:{DatabaseTypeReserved:0,DatabaseTypeAccess:100,DatabaseTypeOracle:200,DatabaseTypeSQLServer:300,DatabaseTypeInformix:400,DatabaseTypeSybase:500,DatabaseTypeRedBrick:600,DatabaseTypeDB2:700,DatabaseTypeTandem:800,DatabaseTypeTeradata:900,DatabaseTypeUnknown:1000,DatabaseTypeGeneric:1100,DatabaseTypeSAP:1200,DatabaseTypeNetezza:1300,DatabaseTypeExcel:1400,DatabaseTypeMicrosoftAS:1500,DatabaseTypeEssBase:1600,DatabaseTypeMySQL:1700,DatabaseTypePostgreSQL:1800,DatabaseTypeNeoview:1900,DatabaseTypeMetamatrix:2000,DatabaseTypeDATAllegro:2100,DatabaseTypeComposite:2200,DatabaseTypeAster:2300,DatabaseTypeVertica:2400,DatabaseTypeOpenAccess:2500,DatabaseTypeSybaseSQLAny:2600,DatabaseTypeParAccel:2800,DatabaseTypeXQuery:3000,DatabaseTypeHive:3100,DatabaseTypeSand:3200,DatabaseTypeSalesFoce:3300,DatabaseTypeHiveThrift:3400,DatabaseTypeVectorWise:3500,DatabaseTypeEnterpriseDB:3600,DatabaseTypeEXASolution:3800,DatabaseTypeInformatica:3900,DatabaseTypeHana:4000},SupportedDBTypes:{SupportedDBTypesUndefined:0,SupportedDBTypesDB2Wire:1,SupportedDBTypesDB2iSeries:2,SupportedDBTypesDB2ZOS:3,SupportedDBTypesInformixWire:4,SupportedDBTypesInformixXPS:5,SupportedDBTypesPostgreSQL:6,SupportedDBTypesSybaseASE:7,SupportedDBTypesSybaseIQ:8,SupportedDBTypesOracle:9,SupportedDBTypesSQLServer:10,SupportedDBTypesTeradata:11,SupportedDBTypesMySQL:12,SupportedDBTypesGreenPlum:13,SupportedDBTypesNetezza:14,SupportedDBTypesWebServices:15,SupportedDBTypesHive:16,SupportedDBTypesInfoBright:17,SupportedDBTypesSalesForce:18,SupportedDBTypesAccess:19}});})();