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

//
// db connect
//
$modulecontent = "Unable to get member trip information. memberid = $memberid.";
include 'mysqlconnect.php';

//---------------------------------------------------------------
// get member trip information
//---------------------------------------------------------------
$sql = "SELECT *  FROM triptbl WHERE memberid = '$memberid' AND currenttrip = 1";

//
// sql query
//
$function = "select";
include 'mysqlquery.php';

//
// get the trip information
//
$activetrip = mysqli_fetch_assoc($sql_result); 

// print_r($trips);

//
// close db connection
//
mysqli_close($dbConn);

//
// pass back info
//
exit(json_encode($activetrip));
?>
