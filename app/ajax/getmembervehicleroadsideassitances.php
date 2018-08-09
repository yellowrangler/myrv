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
$mysqli = new mysqli($DBhost, $DBuser, $DBpassword, $DBschema);
if ($mysqli->connect_errno)
{
	$log = new ErrorLog("logs/");
	$dberr = mysqli_connect_error();
	$log->writeLog("DB error: $dberr - Error connect db Unable to get member vehicle roadsideassitances information.");

	$rv = "";
	exit($rv);
}

//---------------------------------------------------------------
// get member vehicle roadsideassitances information
//---------------------------------------------------------------
$sql = "SELECT *  FROM vechileroadsideassistancetbl WHERE memberid = '$memberid'";
// print $sql;

$result = $mysqli->query($sql);
if (!$result) 
{
    $log = new ErrorLog("logs/");
    $sqlerr = $mysqli->errno();
    $log->writeLog("SQL error: $sqlerr - Error doing select to db Unable to get member $memberid vehicle roadsideassitances information.");
    $log->writeLog("SQL: $sql");

    $status = -100;
    $msgtext = "System Error: $sqlerr";
}

//
// get the vehicle information
// fill the array
//
$roadsideassistances = array();
while($r = $result->fetch_assoc()) 
{
    $roadsideassistances[] = $r;
}

// print_r($vehicles);

//
// close db connection
//
$mysqli->close();

//
// pass back info
//
exit(json_encode($roadsideassistances));

?>
