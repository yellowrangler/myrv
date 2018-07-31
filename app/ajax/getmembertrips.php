<?php

include_once ('../class/class.Log.php');
include_once ('../class/class.ErrorLog.php');
include_once ('../class/class.AccessLog.php');

//
// post input
//
$memberid = "";
if( isset($_POST['memberid']) )
{
     $memberid = $_POST['memberid'];
}

//
// get date time for this transaction
//
$datetime = date("Y-m-d H:i:s");

// print_r($_POST);
// die();

// set variables
$enterdate = $datetime;

//
// messaging
//
$returnArrayLog = new AccessLog("logs/");
// $returnArrayLog->writeLog("Member List request started" );

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
	$log->writeLog("DB error: $dberr - Error mysql connect. Unable to get member trip information.");

	$rv = "";
	exit($rv);
}

if (!mysql_select_db($DBschema, $dbConn)) 
{
	$log = new ErrorLog("logs/");
	$dberr = mysql_error();
	$log->writeLog("DB error: $dberr - Error selecting db Unable to get member trip information.");

	$rv = "";
	exit($rv);
}

//---------------------------------------------------------------
// get member trip information
//---------------------------------------------------------------
$sql = "SELECT *  FROM triptbl WHERE memberid = '$memberid'";

// print $sql;

$sql_result = @mysql_query($sql, $dbConn);
if (!$sql_result)
{
    $log = new ErrorLog("logs/");
    $sqlerr = mysql_error();
    $log->writeLog("SQL error: $sqlerr - Error doing select to db Unable to get member $memberid information.");
    $log->writeLog("SQL: $sql");

    $status = -100;
    $msgtext = "System Error: $sqlerr";
}

//
// get the trip information
// fill the array
//
$trips = array();
while($r = mysql_fetch_assoc($sql_result)) {
	$var = explode("-",$r[startdate]);
	if (checkdate($var[1], $var[2], $var[0]))
	{
		$date = date("m/d/Y", strtotime($r[startdate]) );
	}
	else
	{
		$date = "";
	}
	$r[startdate] = $date;

	$var = explode("-",$r[enddate]);
	if (checkdate($var[1], $var[2], $var[0]))
	{
		$date = date("m/d/Y", strtotime($r[enddate]) );
	}
	else
	{
		$date = "";
	}
	$r[enddate] = $date;

    $trips[] = $r;
}

// print_r($trips);

//
// close db connection
//
mysql_close($dbConn);

//
// pass back info
//
exit(json_encode($trips));

?>
