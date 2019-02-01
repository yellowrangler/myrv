<?php

include_once ('../class/class.Log.php');
include_once ('../class/class.ErrorLog.php');
include_once ('../class/class.AccessLog.php');

//
// post input
//
$roadsideassistanceid = $_POST['roadsideassistanceid'];
$memberid = $_POST['memberid'];
$roadsideassistancename = $_POST['roadsideassistancename'];
$polcynumber = $_POST['polcynumber'];
$policyholder = $_POST['policyholder'];
$policytype = $_POST['policytype'];
$expirationdate = $_POST['expirationdate'];
$emergencyphonenbr = $_POST['emergencyphonenbr'];
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
$modulecontent = "Unable to save member vehicle roadsideassitance information. memberid = $memberid. roadsideassistanceid = $roadsideassistanceid.";
include 'mysqlconnect.php';

//---------------------------------------------------------------
// update an existing roadsideassistance. Insert a new one
//---------------------------------------------------------------
$sqlFunction = "";
if ($roadsideassistanceid == "")
{
	// insert new vehicle

	$sql = "INSERT INTO vechileroadsideassistancetbl(memberid,
		roadsideassistancename,polcynumber,policyholder,
		expirationdate,emergencyphonenbr,websiteurl,comments,
		status,lastupdate) 
	VALUES 
	($memberid,'$roadsideassistancename','$polcynumber','$policyholder',
	'$expirationdate','$emergencyphonenbr','$websiteurl',
	'$comments','$status','$enterdate')";

	 $sqlFunction = "insert";
}
else
{
	// update existing trip

	$sql = "UPDATE vechileroadsideassistancetbl SET 
	    memberid = '$memberid',
		roadsideassistancename = '$roadsideassistancename',
		polcynumber = '$polcynumber',
		policyholder = '$policyholder',
		expirationdate = '$expirationdate',
		emergencyphonenbr = '$emergencyphonenbr',
		websiteurl = '$websiteurl',
		comments = '$comments',
		status = '$status',
	    lastupdate = '$enterdate'
	WHERE memberid = '$memberid' AND id = '$roadsideassistanceid'";

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
	$roadsideassistanceid = mysqli_insert_id($dbConn);
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
$msg["roadsideassistanceid"] = $roadsideassistanceid;
$msg["roadsideassistancename"] = $roadsideassistancename;

exit(json_encode($msg));
?>
