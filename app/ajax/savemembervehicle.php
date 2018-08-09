<?php

include_once ('../class/class.Log.php');
include_once ('../class/class.ErrorLog.php');
include_once ('../class/class.AccessLog.php');

//
// post input
//
$vehicleid = $_POST['vehicleid'];
$memberid = $_POST['memberid'];
$vehicletype = $_POST['vehicletype'];
$make = $_POST['make'];
$model = $_POST['model'];
$color = $_POST['color'];
$year = $_POST['year'];
$platenbr = $_POST['platenbr'];
$platestate = $_POST['platestate'];
$VIN = $_POST['VIN'];
$tirenumber = $_POST['tirenumber'];
$tiresize = $_POST['tiresize'];
$vehiclelength = $_POST['vehiclelength'];
$comments = $_POST['comments'];
$status = $_POST['status'];

$vehiclename = "$vehicletype $make $model $color $year $platenbr";

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
	$log->writeLog("DB error: $dberr - Error connect db Unable to save member vehicle information.");

	$rv = "";
	exit($rv);
}

//---------------------------------------------------------------
// update an existing vehicle. Insert a new one
//---------------------------------------------------------------
$sqlFunction = "";
if ($vehicleid == "")
{
	// insert new vehicle

	$sql = "INSERT INTO vehicletbl(memberid,
		vehicletype,make,model,color,year,platenbr,platestate,VIN,
		tirenumber,tiresize,vehiclelength,comments,status,lastupdate) 
	VALUES 
	($memberid,'$vehicletype','$make','$model','$color','$year','
		$platenbr','$platestate','$VIN','$tirenumber','$tiresize',
		'$vehiclelength',$comments','$status','$enterdate')";

	 $sqlFunction = "insert";
}
else
{
	// update existing trip

	$sql = "UPDATE vehicletbl SET 
	    memberid = '$memberid',
		vehicletype = '$vehicletype',
		make = '$make',
		model = '$model',
		color = '$color',
		year = '$year',
		platenbr = '$platenbr',
		platestate = '$platestate',
		VIN = '$VIN',
		tirenumber = '$tirenumber',
		tiresize = '$tiresize',
		vehiclelength = '$vehiclelength',
		comments = '$comments',
		status = '$status',
	    lastupdate = '$enterdate'
	WHERE memberid = '$memberid' AND id = '$vehicleid'";

	$sqlFunction = "update";
}

// print $sql;
// exit();

$result = $mysqli->query($sql);
if (!$result) 
{
    $log = new ErrorLog("logs/");
	$sqlerr = $mysqli->errno();
    $log->writeLog("SQL error: $sqlerr - Error doing select to db Unable to save member $memberid vehicle information.");
    $log->writeLog("SQL: $sql");

    $status = -100;
    $msgtext = "System Error: $sqlerr";
}

//
// get id if insert
//
if ($sqlFunction == "insert")
{
	$vehicleid = $mysqli->insert_id;
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
$msg["vehicleid"] = $vehicleid;
$msg["vehiclename"] = $vehiclename;

exit(json_encode($msg));

?>
