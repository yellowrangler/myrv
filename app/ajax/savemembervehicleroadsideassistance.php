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
	$log->writeLog("DB error: $dberr - Error connect db Unable to save member vehicle roadsideassitance information.");

	$rv = "";
	exit($rv);
}

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

$result = $mysqli->query($sql);
if (!$result) 
{
    $log = new ErrorLog("logs/");
	$sqlerr = $mysqli->errno();
    $log->writeLog("SQL error: $sqlerr - Error doing select to db Unable to save member $memberid vehicle roadsideassitance information.");
    $log->writeLog("SQL: $sql");

    $status = -100;
    $msgtext = "System Error: $sqlerr";
}

//
// get id if insert
//
if ($sqlFunction == "insert")
{
	$roadsideassistanceid = $mysqli->insert_id;
}

// print "sqlFunction=$sqlFunction   :   vehicleid=$vehicleid";
// die();

//
// close db connection
//
$mysqli->close();

//
// pass back info
//
$msg["msgtext"] = $msgtext;
$msg["roadsideassistanceid"] = $roadsideassistanceid;
$msg["roadsideassistancename"] = $roadsideassistancename;

exit(json_encode($msg));

?>
