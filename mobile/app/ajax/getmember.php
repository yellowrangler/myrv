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

//
// db connect
//
$modulecontent = "Unable to get member information. memberid = $memberid. email = $email";
include 'mysqlconnect.php';

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

//
// sql query
//
$function = "select";
include 'mysqlquery.php';

//
// get the member information
//
$r = mysqli_fetch_assoc($sql_result);
$member = $r;

//
// close db connection
//
mysqli_close($dbConn);

//
// pass back info
//
exit(json_encode($member));
?>
