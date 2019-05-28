<?php
include_once ('../class/class.Log.php');
include_once ('../class/class.ErrorLog.php');
include_once ('../class/class.AccessLog.php');

//
// post input
//

// print_r($_POST);

$tripid = $_POST['tripid'];
$memberid = $_POST['memberid'];
$date = $_POST['date'];
$time = $_POST['time'];
$station = $_POST['station'];
$location = $_POST['location'];
$state = $_POST['state'];

$time = date('H:i:s', strtotime($time));
$date = date('Y-m-d', strtotime($date));

$detailid = 0;
if (isset($_POST['detailid']) )
{
	if (is_numeric($_POST['detailid']))
	{
		$detailid = $_POST['detailid'];
	}
}

// print "detailid = $detailid";
// die();

$nottankfilled = 0;
if (isset($_POST['nottankfilled']))
{
	if (is_numeric($_POST['nottankfilled']))
	{
		$nottankfilled = $_POST['nottankfilled'];
	}
}

$originaltotalmiles = 0;
if (is_numeric($_POST['originaltotalmiles']))
{
	$originaltotalmiles = $_POST['originaltotalmiles'];
}

$odometer = 0;
if (is_numeric($_POST['odometer']))
{
	$odometer = $_POST['odometer'];
}

$amount = 0;
if (is_numeric($_POST['amount']))
{
	$amount = $_POST['amount'];
}

$gallons = 0;
if (is_numeric($_POST['gallons']))
{
	$gallons = $_POST['gallons'];
}

$costpergallon = 0;
if (is_numeric($_POST['costpergallon']))
{
	$costpergallon = $_POST['costpergallon'];
}

$miles = 0;
if (is_numeric($_POST['miles']))
{
	$miles = $_POST['miles'];
}

$mpg = 0;
if (is_numeric($_POST['mpg']))
{
	$mpg = $_POST['mpg'];
}

// print_r($_POST);
// exit();

//
// get date time for this transaction
//
$datetime = date("Y-m-d H:i:s");

// set variables
$enterdate = $datetime;
$msgtext = "ok";
$msgArray = array();

//
// messaging
//
$returnArrayLog = new AccessLog("logs/");
// $returnArrayLog->writeLog("Member List request started" );

//
// db connect
//
$modulecontent = "Unable to save member gas trip entry. memberid = $memberid. tripid = $tripid.";
include 'mysqlconnect.php';

// print_r($msgArray);
// exit(json_encode($msgArray));

if ($detailid == 0)
{
	$sqlFunction == "insert";

	//---------------------------------------------------------------
	// save gas trip entry
	//---------------------------------------------------------------
	$sql = "INSERT INTO gastripentrytbl( 
		memberid, 
		tripid, 
		odometer, 
		amount, 
		gallons, 
		costpergallon, 
		miles, 
		mpg, 
		date, 
		time, 
		station, 
		location, 
		state, 
		nottankfilled, 
		lastupdate) 
	VALUES (
		$memberid,
		$tripid,
		'$odometer', 
		'$amount', 
		'$gallons', 
		'$costpergallon', 
		'$miles', 
		'$mpg', 
		'$date', 
		'$time', 
		'$station', 
		'$location', 
		'$state', 
		'$nottankfilled',
		'$enterdate')";

}
else
{
	$sqlFunction == "update";

	$sql = "UPDATE gastripentrytbl 
		SET 
		memberid = '$memberid',
		tripid = '$tripid', 
		odometer = '$odometer',
		amount = '$amount',
		gallons = '$gallons',
		costpergallon = '$costpergallon',  
		miles = '$miles',
		mpg = '$mpg',
		date = '$date',
		time = '$time',
		station = '$station',
		location = '$location',
		state = '$state',
		nottankfilled = '$nottankfilled',
		lastupdate='$enterdate' 
		WHERE id = $detailid AND memberid = $memberid AND tripid = $tripid";

}

// print_r($_POST);
// print("nottankfilled".$nottankfilled);

// print $sql;

//
// sql query
//
$modulecontent = "Unable to save member gas trip entry. memberid = $memberid. tripid = $tripid.";
include 'mysqlquery.php';

if ($sqlFunction == "insert")
{
	//
	// get id
	//
	$detailid = mysqli_insert_id($dbConn);

}

//
// close db connection
//
mysqli_close($dbConn);

//
// pass back info
//
$msgArray['msgtext'] = 'ok';
$msgArray['errtext'] = '';
$msgArray['detailid'] = "$detailid";
$msgArray['bodytext'] = "Successfully updated gas entry details";

exit(json_encode($msgArray));
?>
