<?php

include_once ('../class/class.Log.php');
include_once ('../class/class.ErrorLog.php');
include_once ('../class/class.AccessLog.php');
// get date time for this transaction
$datetime = date("Y-m-d H:i:s");

// print_r($_POST);

$email = $_POST["email"];
$password = $_POST["password"];
$rc = 1;
$msgtext = "";
$token = "";

//
// messaging
//
$returnArrayLog = new AccessLog("logs/");
// $returnArrayLog->writeLog("Client List request started" );

//------------------------------------------------------
// connect to db
//------------------------------------------------------
// open connection to host
$DBhost = "localhost";
$DBschema = "myrv";
$DBuser = "tarryc";
$DBpassword = "tarryc";

//
// connect to db
//
$dbConn = @mysql_connect($DBhost, $DBuser, $DBpassword);
if (!$dbConn)
{
	$log = new ErrorLog("logs/");
	$dberr = mysql_error();
	$log->writeLog("DB error: $dberr - Error mysql connect. Unable to signin for myrv email $email.");

	$rv = "";
	exit($rv);
}

if (!mysql_select_db($DBschema, $dbConn))
{
	$log = new ErrorLog("logs/");
	$dberr = mysql_error();
	$log->writeLog("DB error: $dberr - Error selecting db Unable to signin for myrv email $email.");

	$rv = "";
	exit($rv);
}

//---------------------------------------------------------------
// Try to login
//---------------------------------------------------------------
$sql = "SELECT id AS memberid,screenname,membername,avatar,password,role,status 
FROM membertbl  
WHERE email = '$email' AND password ='$password' AND status = 'active'";
// print $sql;
// exit();

$rc = 1;
$sql_result = @mysql_query($sql, $dbConn);
if (!$sql_result)
{
	$log = new ErrorLog("logs/");
	$sqlerr = mysql_error();
	$log->writeLog("SQL error: $sqlerr - Error doing select to db Unable to signin for myrv email $email.");
	$log->writeLog("SQL: $sql");

	$rc = -100;
	$msgtext = "System Error: $sqlerr";
}

//
// check if we got any rows
//
if ($rc == 1)
{
	$count = mysql_num_rows($sql_result);
	if ($count == 1)
	{
		$row = mysql_fetch_assoc($sql_result);
		$tblpassword = $row['password'];
		$tblmemberid = $row['memberid'];
		$tblscreenname = $row['screenname'];
		$tblmembername = $row['membername'];
		$tblavatar = $row['avatar'];
		$tblrole = $row['role'];

		$msgtext = "Hi $tblmembername, You are now logged in to MY RV!";
    }
    else 
    { 
        $msgtext = "Unable to Log you in!";
    }
}

//
// close db connection
//
mysql_close($dbConn);

//
// pass back info
//
//
// pass back info
//
$msg["memberid"] = sprintf("%u", $tblmemberid); 
$msg["screenname"] = $tblscreenname;
$msg["email"] = $tblemail;
$msg["avatar"] = $tblavatar;
$msg["role"] = $tblrole;
$msg["membername"] = $tblmembername;
$msg["rc"] = $rc;
$msg["text"] = $msgtext;


exit(json_encode($msg));
?>
