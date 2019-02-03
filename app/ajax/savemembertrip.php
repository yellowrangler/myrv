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

$startlocation = $_POST['startlocation'];

$enddate = "";
if (!empty($_POST['enddate'])) 
{
	$enddate = date("Y-m-d", strtotime($_POST['enddate']) );
}

if (is_numeric($_POST['startodometer']))
{
	$startodometer = $_POST['startodometer'];
}
else
{
	$startodometer = 0;
}

if (is_numeric($_POST['endodometer']))
{
	$endodometer = $_POST['endodometer'];
}
else
{
	$endodometer = 0;
}

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
	($memberid,'$tripname','$currenttrip',$startodometer,'$towvehicle','$rv',
		NULLIF('$startdate',''),'$startlocation',$endodometer,'$endlocation',NULLIF('$enddate',''),'$enterdate')";

	 $sqlFunction = "insert";
}
else
{
	// update existing trip

	$sql = "UPDATE triptbl SET 
	    memberid = $memberid,
	    tripname = '$tripname',
	    currenttrip = '$currenttrip',
	    startodometer = $startodometer,
	    towvehicle = '$towvehicle',
	    rv = '$rv',
	    startdate = NULLIF('$startdate',''),
	    startlocation = '$startlocation',
	    endodometer = $endodometer,
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

// 
// Now add initial gas trip totals
// 
$sql = "SELECT id 
FROM gastriptotalstbl 
WHERE memberid = $memberid AND tripid = $tripid 
ORDER BY id ASC LIMIT 1";

//
// sql query
//
$modulecontent = "Unable to get member trip gas total information. memberid = $memberid. tripid = $tripid.";
$function = 'select';
include 'mysqlquery.php';

// 
//  see if we get anything
// 
$count = mysqli_num_rows($sql_result);
if ($count == 0)
{
	$sql = "INSERT INTO gastriptotalstbl
		(memberid, tripid, odometer, totalamount, totalgallons, avecostpergallon, totalmiles, avempg, lastupdate) 
		VALUES 
		($memberid,$tripid,$startodometer,0,0,0,0,0,'$enterdate')";

		$sqlFunction = "insert";
}
else
{
	//
	// get the member trip gas totalsinformation
	//
	$r = mysqli_fetch_assoc($sql_result);
	$idtotals = $r['id'];

	//
	// update the member trip gas totals information
	//
	$sql = "UPDATE gastriptotalstbl 
		SET 
		memberid=$memberid,
		tripid=$tripid,
		odometer=$startodometer,
		totalamount=0,
		totalgallons=0,
		avecostpergallon=0,
		totalmiles=0,
		avempg=0,
		lastupdate='$enterdate' 
		WHERE id = $idtotals";

	$sqlFunction = "update";
}

//
// sql query
//
$modulecontent = "Unable to save member trip gas total information. memberid = $memberid. tripid = $tripid.";
$function = $sqlFunction;
include 'mysqlquery.php';

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
