<?php

include_once ('class/class.Log.php');
include_once ('class/class.ErrorLog.php');
include_once ('class/class.AccessLog.php');

// if cross browser request options ignore
if($_SERVER['REQUEST_METHOD'] == "OPTIONS")
{
	exit();
}

//
// get date time for this transaction
//
$datetime = date("Y-m-d H:i:s");

// get post values & set values for query
$parms = json_decode(file_get_contents("php://input"), true);

// print_r($parms);

$email = $parms["email"];
$password = $parms["password"];
$token = $email;
$lastupdate = $datetime;
$rc = 1;
$msgtext = "";
$status = "registered";

//
// messaging
//
$returnArrayLog = new AccessLog("logs/");
// $returnArrayLog->writeLog("Client List request started" );

//------------------------------------------------------
// check if already exists
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
	$log->writeLog("DB error: $dberr - Error mysql connect. Unable to signip for recipe email $email.");

	$rv = "";
	exit($rv);
}

if (!mysql_select_db($DBschema, $dbConn))
{
	$log = new ErrorLog("logs/");
	$dberr = mysql_error();
	$log->writeLog("DB error: $dberr - Error selecting db Unable to signip for recipe email $email.");

	$rv = "";
	exit($rv);
}

//---------------------------------------------------------------
// see if email already exists
//---------------------------------------------------------------
$sql = "SELECT email FROM membertbl WHERE email = '$email'";
// print $sql;

$rc = 1;
$sql_result = @mysql_query($sql, $dbConn);
if (!$sql_result)
{
	$log = new ErrorLog("logs/");
	$sqlerr = mysql_error();
	$log->writeLog("SQL error: $sqlerr - Error doing select to db Unable to signip for recipe email $email.");
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
        $msgtext = "email already on file";
	}
	else
	{
        // Do Insert
    	$sql = "INSERT INTO  membertbl ( email,  password, token, status, lastupdate)
    		VALUES ('$email', '$password', '$token', '$status', '$lastupdate')";

    	$sql_result = @mysql_query($sql, $dbConn);
    	if (!$sql_result)
    	{
    	    $log = new ErrorLog("logs/");
    	    $sqlerr = mysql_error();
    	    $log->writeLog("SQL error: $sqlerr - Error doing insert to db to signip for recipe email $email.");
    	    $log->writeLog("SQL: $sql");

    	    $status = -100;
    	    $msgtext = "System Error: $sqlerr";
    	}

		$msgtext = "email added to register!";
	}
}

//
// close db connection
//
mysql_close($dbConn);

//
// pass back info
//
$msg["rc"] = $rc;
$msg["text"] = $msgtext;
$msg["token"] = $token;

exit(json_encode($msg));
?>
