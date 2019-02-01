<?php

include_once ('../class/class.Log.php');
include_once ('../class/class.ErrorLog.php');
include_once ('../class/class.AccessLog.php');

//
// post input
//
$memberid = $_POST['memberid'];
$roadsideassistanceid = $_POST['roadsideassistanceid'];
$roadsideassistancename = $_POST['roadsideassistancename'];

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
$modulecontent = "Unable to delete member vehicle information. memberid = $memberid. roadsideassistanceid = $roadsideassistanceid";
include 'mysqlconnect.php';

//---------------------------------------------------------------
// delete the roadsideassistence 
//---------------------------------------------------------------
$sql = "DELETE FROM vechileroadsideassistancetbl  
WHERE memberid = $memberid AND id = $roadsideassistanceid";

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
$msg["roadsideassistanceid"] = $roadsideassistanceid;
$msg["roadsideassistancename"] = $roadsideassistancename;

exit(json_encode($msg));
?>
