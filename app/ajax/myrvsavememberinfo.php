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
// get data
//
$member = json_decode(file_get_contents("php://input"), true);

//
// get date time for this transaction
//
$datetime = date("Y-m-d H:i:s");


// set variables
$enterdate = $datetime;
$rc = "";

//
// messaging
//
$returnArrayLog = new AccessLog("logs/");

//------------------------------------------------------
// get admin user info
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
	$log->writeLog("DB error: $dberr - Error mysql connect. Unable to store member information.");

	$rv = "";
	exit($rv);
}

if (!mysql_select_db($DBschema, $dbConn))
{
	$log = new ErrorLog("logs/");
	$dberr = mysql_error();
	$log->writeLog("DB error: $dberr - Error selecting db Unable to store member information.");

	$rv = "";
	exit($rv);
}

//---------------------------------------------------------------
// look for member email. if find update else error
//---------------------------------------------------------------
$email = $member['email'];

//
// see if id exists
//
$sql = "SELECT *  FROM membertbl WHERE email = '$email'";

// print $sql;

$sql_result = @mysql_query($sql, $dbConn);
if (!$sql_result)
{
    $log = new ErrorLog("logs/");
    $sqlerr = mysql_error();
    $log->writeLog("SQL error: $sqlerr - Error doing select to db Unable to store member information.");
    $log->writeLog("SQL: $sql");

    $status = -100;
    $msgtext = "System Error: $sqlerr";
}

$count = 0;
$count = mysql_num_rows($sql_result);
if ($count > 0)
{
	$email = $member['email'];
	$password = $member['password'];
	$membername = $member['membername'];
	$screenname = $member['screenname'];
	$phone = $member['phone'];
	$address = $member['address'];
	$city = $member['city'];
	$state = $member['state'];
	$zipcode = $member['zipcode'];
	$avatar = $member['avatar'];
	$biography = $member['biography'];

	// Do update
	$sql = "UPDATE membertbl
		SET	email='$email', password='$password', membername='$membername',
			screenname='$screenname', phone='$phone', address='$address',
			city='$city', state='$state', zipcode='$zipcode',
			avatar='$avatar', biography='$biography'
		WHERE email = '$email'";

		$sql_result = @mysql_query($sql, $dbConn);
		if (!$sql_result)
		{
		    $log = new ErrorLog("logs/");
		    $sqlerr = mysql_error();
		    $log->writeLog("SQL error: $sqlerr - Error doing insert or update to db Unable to store member information.");
		    $log->writeLog("SQL: $sql");

		    $status = -100;
		    $msgtext = "System Error: $sqlerr";
		}
}
else
{
	$msgtext = "Member not registered!";

	$log = new ErrorLog("logs/");
    $log->writeLog("Logic Error: $msgtext - Error doing select to db Unable to store member information.");
    $log->writeLog("SQL: $sql");

    $status = -300;
}

// print $sql;

//
// close db connection
//
mysql_close($dbConn);

//
// Build message
//
$msgtext = "Update successfull";

//
// pass back info
//
$msg["rc"] = $rc;
$msg["text"] = $msgtext;

exit(json_encode($msg));
?>