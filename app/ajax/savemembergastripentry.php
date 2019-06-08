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
$errmsg = "";

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
$number = floatval(str_replace(',', '', $_POST['originaltotalmiles']));
if (is_numeric($number))
{
	$originaltotalmiles = $number;
}
else
{
	$errmsg = $errmsg . "originaltotalmiles not a number! value=$number <br><br>";
}

$odometer = 0;
$number = floatval(str_replace(',', '', $_POST['odometer']));
if (is_numeric($number))
{
	$odometer = $number;
}
else
{
	$errmsg = $errmsg . "odometer not a number!  value=$number <br><br>";
}

$amount = 0;
$number = floatval(str_replace(',', '', $_POST['amount']));
if (is_numeric($number))
{
	$amount = $number;
}
else
{
	$errmsg = $errmsg . "amount not a number!  value=$number <br><br>";
}

$gallons = 0;
$number = floatval(str_replace(',', '', $_POST['gallons']));
if (is_numeric($number))
{
	$gallons = $number;
}
else
{
	$errmsg = $errmsg . "gallons not a number!  value=$number <br><br>";
}

$costpergallon = 0;
$number = floatval(str_replace(',', '', $_POST['costpergallon']));
if (is_numeric($number))
{
	$costpergallon = $number;
}
else
{
	$errmsg = $errmsg . "costpergallon not a number!  value=$number <br><br>";
}

$miles = 0;
$number = floatval(str_replace(',', '', $_POST['miles']));
if (is_numeric($number))
{
	$miles = $number;
}
else
{
	$errmsg = $errmsg . "miles not a number!  value=$number <br><br>";
}

$mpg = 0;
$number = floatval(str_replace(',', '', $_POST['mpg']));
if (is_numeric($number))
{
	$mpg = $number;
}
else
{
	$errmsg = $errmsg . "mpg not a number!  value=$number <br><br>";
}

// 
// if error pass back error message
//
if ($errmsg != "")
{
	$msgArray['msgtext'] = 'error';
	$msgArray['errtext'] = $errmsg;
	$msgArray['detailid'] = "$detailid";
	$msgArray['bodytext'] = "Error updating gas entry details";

	exit(json_encode($msgArray));
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
