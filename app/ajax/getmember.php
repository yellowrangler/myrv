<?php

include_once ('../class/class.Log.php');
include_once ('../class/class.ErrorLog.php');
include_once ('../class/class.AccessLog.php');

//
// post input
//
$email = "";
$memberid = "";

if( isset($_POST['email']) )
{
     $email = $_POST['email'];
}

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
$mysqli = new mysqli($DBhost, $DBuser, $DBpassword, $DBschema);
if ($mysqli->connect_errno)
{
	$log = new ErrorLog("logs/");
	$dberr = mysqli_connect_error();
	$log->writeLog("DB error: $dberr - Error connect db Unable to get member information.");

	$rv = "";
	exit($rv);
}

//---------------------------------------------------------------
// get member information
//---------------------------------------------------------------
if ($memberid != "")
{
	$sql = "SELECT *  FROM membertbl WHERE id = '$memberid' AND status = 'active'";
}
else
{
	$sql = "SELECT *  FROM membertbl WHERE email = '$email'  AND status = 'active'";
}
// print $sql;

$result = $mysqli->query($sql);
if (!$result)
{
    $log = new ErrorLog("logs/");
    $sqlerr = $mysqli->errno();
    $log->writeLog("SQL error: $sqlerr - Error doing select to db Unable to get member $email information.");
    $log->writeLog("SQL: $sql");

    $status = -100;
    $msgtext = "System Error: $sqlerr";
}

//
// get the member information
//
$r = $result->fetch_assoc();
// $r = mysql_fetch_assoc($sql_result);
$member = $r;

//
// close db connection
//
$mysqli->close();

//
// pass back info
//
exit(json_encode($member));

?>
