<?php

include_once ('../class/class.Log.php');
include_once ('../class/class.ErrorLog.php');
include_once ('../class/class.AccessLog.php');

//
// post input
//
$insuranceid = $_POST['insuranceid'];
$memberid = $_POST['memberid'];
$insurancename = $_POST['insurancename'];
$polcynumber = $_POST['polcynumber'];
$policyholder = $_POST['policyholder'];
$policytype = $_POST['policytype'];
$effectivedate = $_POST['effectivedate'];
$agentname = $_POST['agentname'];
$agentphonenbr = $_POST['agentphonenbr'];
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
	$log->writeLog("DB error: $dberr - Error connect db Unable to save member vehicle insurance information.");

	$rv = "";
	exit($rv);
}

//---------------------------------------------------------------
// update an existing vehicle. Insert a new one
//---------------------------------------------------------------
$sqlFunction = "";
if ($insuranceid == "")
{
	// insert new vehicle

	$sql = "INSERT INTO vechileinsurancetbl(memberid,
		insurancename,polcynumber,policyholder,policytype,effectivedate,
		agentname,agentphonenbr,websiteurl,comments,status,lastupdate) 
	VALUES 
	($memberid,'$insurancename','$polcynumber','$policyholder','$policytype',
		'$effectivedate','$agentname','$agentphonenbr','$websiteurl','$comments',
		'$status','$enterdate')";

	 $sqlFunction = "insert";
}
else
{
	// update existing trip

	$sql = "UPDATE vechileinsurancetbl SET 
	    memberid = '$memberid',
		insurancename = '$insurancename',
		polcynumber = '$polcynumber',
		policyholder = '$policyholder',
		policytype = '$policytype',
		effectivedate = '$effectivedate',
		agentname = '$agentname',
		agentphonenbr = '$agentphonenbr',
		websiteurl = '$websiteurl',
		comments = '$comments',
		status = '$status',
	    lastupdate = '$enterdate'
	WHERE memberid = '$memberid' AND id = '$insuranceid'";

	$sqlFunction = "update";
}

// print $sql;
// exit();

$result = $mysqli->query($sql);
if (!$result) 
{
    $log = new ErrorLog("logs/");
	$sqlerr = $mysqli->errno();
    $log->writeLog("SQL error: $sqlerr - Error doing select to db Unable to save member $memberid vehicle insurance information.");
    $log->writeLog("SQL: $sql");

    $status = -100;
    $msgtext = "System Error: $sqlerr";
}

//
// get id if insert
//
if ($sqlFunction == "insert")
{
	$insuranceid = $mysqli->insert_id;
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
$msg["insuranceid"] = $insuranceid;
$msg["insurancename"] = $insurancename;

exit(json_encode($msg));

?>
