<?php

include_once ('../class/class.Log.php');
include_once ('../class/class.ErrorLog.php');
include_once ('../class/class.AccessLog.php');

//
// post input
//
$tripid = $_POST['tripid'];
$memberid = $_POST['memberid'];
$tripname = $_POST['tripname'];
$towvehicle = $_POST['towvehicle'];
$rv = $_POST['rv'];

$startdate = "";
if (!empty($_POST['startdate'])) 
{
	$startdate = date("Y-m-d", strtotime($_POST['startdate']) );
}

$enddate = "";
if (!empty($_POST['enddate'])) 
{
	$enddate = date("Y-m-d", strtotime($_POST['enddate']) );
}

$startodometer = $_POST['startodometer'];
$endodometer = $_POST['endodometer'];
$startlocation =  $_POST['startlocation'];
$endlocation = $_POST['endlocation'];

$currenttrip = "";

if( isset($_POST['currenttrip']) )
{
     $currenttrip = 1;
}

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
$modulecontent = "Unable to save member trip information. memberid = $memberid. tripid = $tripid.";
include 'mysqlconnect.php';

//---------------------------------------------------------------
// if current trip find if another exicts then change 
//---------------------------------------------------------------
if ($currenttrip == 1) {
	$sql = "UPDATE triptbl SET currenttrip = 0 WHERE memberid = $memberid";

	//
	// sql query
	//
	$modulecontent = "Unable to update member trips to 0. memberid = $memberid. tripid = $tripid.";
	$function = "update";
	include 'mysqlquery.php';
}


//---------------------------------------------------------------
// update an existing trip. Insert a new one
//---------------------------------------------------------------
$sqlFunction = "";
if ($tripid == "")
{
	// insert new trip

	$sql = "INSERT INTO triptbl(memberid, tripname, currenttrip, startodometer, towvehicle, rv, startdate, startlocation, 
	endodometer, endlocation, enddate, lastupdate) 
	VALUES 
	($memberid,'$tripname','$currenttrip','$startodometer','$towvehicle','$rv',
		NULLIF('$startdate',''),'$startlocation','$endodometer','$endlocation',NULLIF('$enddate',''),'$enterdate')";

	 $sqlFunction = "insert";
}
else
{
	// update existing trip

	$sql = "UPDATE triptbl SET 
	    memberid = $memberid,
	    tripname = '$tripname',
	    currenttrip = '$currenttrip',
	    startodometer = '$startodometer',
	    towvehicle = '$towvehicle',
	    rv = '$rv',
	    startdate = NULLIF('$startdate',''),
	    startlocation = '$startlocation',
	    endodometer = '$endodometer',
	    endlocation = '$endlocation',
	    enddate = NULLIF('$enddate',''),
	    lastupdate = '$enterdate' 
	WHERE memberid = $memberid AND id = $tripid";

	$sqlFunction = "update";
}

// print $sql;
// exit();

//
// sql query
//
$modulecontent = "Unable to save member trip information. memberid = $memberid. tripid = $tripid.";
$function = $sqlFunction;
include 'mysqlquery.php';

//
// get id if insert
//
if ($sqlFunction == "insert")
{
	$tripid = mysqli_insert_id($dbConn);
}

// print "sqlFunction=$sqlFunction   :   tripid=$tripid";
// die();

//
// close db connection
//
mysqli_close($dbConn);

//
// pass back info
//
$msg["msgtext"] = $msgtext;
$msg["tripid"] = $tripid;
$msg["tripname"] = $tripname;

exit(json_encode($msg));
?>
