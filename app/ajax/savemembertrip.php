<?php

include_once ('../class/class.Log.php');
include_once ('../class/class.ErrorLog.php');
include_once ('../class/class.AccessLog.php');

//
// post input
//

$tripid = $_POST['tripid'];
$memberid = $_POST['memberid'];
$tripname = $_POST['tripname'];
$startdate = $_POST['startdate'];
$enddate = $_POST['enddate'];
$startodometer = $_POST['startodometer'];
$endodometer = $_POST['endodometer'];
$startlocation =  $_POST['startlocation'];
$endlocation = $_POST['endlocation'];
$startlatitude = $_POST['startlatitude'];
$endlatitude = $_POST['endlatitude'];
$startlongitude = $_POST['startlongitude'];
$endlongitude = $_POST['endlongitude']; 

$currenttrip = "";

if( isset($_POST['currenttrip']) )
{
     $currenttrip = 1;
}

//
// get date time for this transaction
//
$datetime = date("Y-m-d H:i:s");

// print_r($_POST);
// die();

// set variables
$enterdate = $datetime;
$msgtext = "ok";

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
	$log->writeLog("DB error: $dberr - Error mysql connect. Unable to save member trip information.");

	$rv = "";
	exit($rv);
}

if (!mysql_select_db($DBschema, $dbConn)) 
{
	$log = new ErrorLog("logs/");
	$dberr = mysql_error();
	$log->writeLog("DB error: $dberr - Error selecting db Unable to save member trip information.");

	$rv = "";
	exit($rv);
}

//---------------------------------------------------------------
// if current trip find if another exicts then change 
//---------------------------------------------------------------
if ($currenttrip == 1) {
	$sql = "UPDATE triptbl SET currenttrip = 0 WHERE memberid = $memberid";

	$sql_result = @mysql_query($sql, $dbConn);
	if (!$sql_result)
	{
	    $log = new ErrorLog("logs/");
	    $sqlerr = mysql_error();
	    $log->writeLog("SQL error: $sqlerr - Error doing select to db Unable to change all current trips for member: $memberid");
	    $log->writeLog("SQL: $sql");

	    $status = -100;
	    $msgtext = "System Error: $sqlerr";
	}

}

//---------------------------------------------------------------
// update an existing trip. Insert a new one
//---------------------------------------------------------------
$sqlFunction = "";
if ($tripid == "")
{
	// insert new trip

	$sql = "INSERT INTO triptbl(memberid, tripname, currenttrip, startodometer, startdate, startlocation, 
	startlatitude, startlongitude, endodometer, endlocation, endlatitude, endlongitude, enddate, lastupdate) 
	VALUES 
	($memberid,'$tripname','$currenttrip','$startodometer','$startdate','$startlocation','$startlatitude',
	 '$startlongitude','$endodometer','$endlocation','$endlatitude','$endlongitude','$enddate','$enterdate')";

	 $sqlFunction = "insert";
}
else
{
	// update existing trip

	$sql = "UPDATE triptbl SET 
	    memberid = $memberid,
	    tripname = '$tripname',
	    currenttrip = '$currenttrip',
	    startodometer = '$startodometer',
	    startdate = '$startdate',
	    startlocation = '$startlocation',
	    startlatitude = '$startlatitude',
	    startlongitude = '$startlongitude',
	    endodometer = '$endodometer',
	    endlocation = '$endlocation',
	    endlatitude = '$endlatitude',
	    endlongitude = '$endlongitude',
	    enddate = '$enddate',
	    lastupdate = '$enterdate' 
	WHERE memberid = $memberid AND id = $tripid";

	$sqlFunction = "update";
}

// print $sql;
// exit();

$sql_result = @mysql_query($sql, $dbConn);
if (!$sql_result)
{
    $log = new ErrorLog("logs/");
    $sqlerr = mysql_error();
    $log->writeLog("SQL error: $sqlerr - Error doing select to db Unable to save member $memberid trip information.");
    $log->writeLog("SQL: $sql");

    $status = -100;
    $msgtext = "System Error: $sqlerr";
}

//
// get id if insert
//
if ($sqlFunction == "insert")
{
	$tripid = mysql_insert_id();
}

// print "sqlFunction=$sqlFunction   :   tripid=$tripid";
// die();

//
// close db connection
//
mysql_close($dbConn);

//
// pass back info
//
$msg["msgtext"] = $msgtext;
$msg["tripid"] = $tripid;
$msg["tripname"] = $tripname;

exit(json_encode($msg));

?>
