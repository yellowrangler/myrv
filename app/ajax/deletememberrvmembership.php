<?php

include_once ('../class/class.Log.php');
include_once ('../class/class.ErrorLog.php');
include_once ('../class/class.AccessLog.php');

//
// post input
//
$memberid = $_POST['memberid'];
$id = $_POST['id'];
$rvmembershipname = $_POST['rvmembershipname'];

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
$modulecontent = "Unable to delete member rv membership information. memberid = $memberid. id = $id";
include 'mysqlconnect.php';

//---------------------------------------------------------------
// delete the roadsideassistanceid 
//---------------------------------------------------------------
$sql = "DELETE FROM rvmembershiptbl  
WHERE memberid = $memberid AND id = $id";

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
$msg["id"] = $id;
$msg["rvmembershipname"] = $rvmembershipname;

exit(json_encode($msg));
?>
