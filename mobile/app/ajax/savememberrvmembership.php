<?php

include_once ('../class/class.Log.php');
include_once ('../class/class.ErrorLog.php');
include_once ('../class/class.AccessLog.php');

//
// post input
//
$id = $_POST['id'];
$memberid = $_POST['memberid'];
$rvmembershipname = $_POST['rvmembershipname'];
$rvmembername = $_POST['rvmembername'];
$rvmembershipid = $_POST['rvmembershipid'];
$expirationdate = $_POST['expirationdate'];
$cost = $_POST['cost'];
$phonenumber = $_POST['phonenumber'];
$websiteurl = $_POST['websiteurl'];
$comments = $_POST['comments'];
$status = $_POST['status'];

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
$modulecontent = "Unable to save member rv membership information. memberid = $memberid. roadsideassistanceid = $roadsideassistanceid.";
include 'mysqlconnect.php';

//---------------------------------------------------------------
// update an existing roadsideassistance. Insert a new one
//---------------------------------------------------------------
$sqlFunction = "";
if ($id == "")
{
	// insert new vehicle

	$sql = "INSERT INTO rvmembershiptbl(
		memberid,
		rvmembershipname,
		rvmembershipid,
		rvmembername,
		expirationdate,
		cost,
		phonenumber,
		websiteurl,
		comments,
		status,
		lastupdate) 
	VALUES 
	($memberid,
	'$rvmembershipname',
	'$rvmembershipid',
	'$rvmembername',
	'$expirationdate',
	'$cost',
	'$phonenumber',
	'$websiteurl',
	'$comments',
	'$status',
	'$enterdate')";

	 $sqlFunction = "insert";
}
else
{
	// update existing trip

	$sql = "UPDATE rvmembershiptbl SET 
	    memberid = '$memberid',
		rvmembershipname = '$rvmembershipname',
		rvmembershipid = '$rvmembershipid',
		rvmembername = '$rvmembername',
		expirationdate = '$expirationdate',
		cost = '$cost',
		phonenumber = '$phonenumber',
		websiteurl = '$websiteurl',
		comments = '$comments',
		status = '$status',
	    lastupdate = '$enterdate'
	WHERE memberid = '$memberid' AND id = '$id'";

	$sqlFunction = "update";
}

// print $sql;
// exit();

//
// sql query
//
$function = $sqlFunction;
include 'mysqlquery.php';

//
// get id if insert
//
if ($sqlFunction == "insert")
{
	$id = mysqli_insert_id($dbConn);
}

// print "sqlFunction=$sqlFunction   :   vehicleid=$vehicleid";
// die();

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
