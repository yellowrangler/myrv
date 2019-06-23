<?php

include_once ('../class/class.Log.php');
include_once ('../class/class.ErrorLog.php');
include_once ('../class/class.AccessLog.php');

//
// post input
//
$memberid = $_POST['memberid'];
$insuranceid = $_POST['insuranceid'];
$insurancename = $_POST['insurancename'];

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

//
// db connect
//
$modulecontent = "Unable to delete member vehicle information. memberid = $memberid. insuranceid = $insuranceid";
include 'mysqlconnect.php';

//---------------------------------------------------------------
// delete the waypoint 
//---------------------------------------------------------------
$sql = "DELETE FROM vechileinsurancetbl  
WHERE memberid = $memberid AND id = $insuranceid";

//
// sql query
//
$function = "delete";
include 'mysqlquery.php';

//
// close db connection
//
mysqli_close($dbConn);

//
// pass back info
//
$msg["msgtext"] = $msgtext;
$msg["insuranceid"] = $insuranceid;
$msg["insurancename"] = $insurancename;

exit(json_encode($msg));
?>
