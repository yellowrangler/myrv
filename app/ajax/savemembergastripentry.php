<?php
include_once ('../class/class.Log.php');
include_once ('../class/class.ErrorLog.php');
include_once ('../class/class.AccessLog.php');

//
// post input
//

// print_r($_POST);

$activetripid = $_POST['activetripid'];
$memberid = $_POST['memberid'];
$activetripname = $_POST['activetripname'];
$date = $_POST['date'];
$time = $_POST['time'];
$station = $_POST['station'];
$location = $_POST['location'];
$state = $_POST['state'];
$gastripentrytotalsid = $_POST['gastripentrytotalsid'];

$time = date('H:i:s', strtotime($time));
$date = date('Y-m-d', strtotime($date));

$nottankfilled = 0;
if( isset($_POST['nottankfilled']) )
{
     $nottankfilled = 1;
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

// 
// calculated totals to compare for our server side calculated totals
//
$totalamount = 0;
if (is_numeric($_POST['totalamount']))
{
	$totalamount = $_POST['totalamount'];
}

$topoffgallons = 0;
if (is_numeric($_POST['topoffgallons']))
{
    $topoffgallons = $_POST['topoffgallons'];
}

$gastotalsnottankfilled = 0;
if (isset($_POST['gastotalsnottankfilled']))
{
    $gastotalsnottankfilled = $_POST['gastotalsnottankfilled'];
}

$totalgallons = 0;
if (is_numeric($_POST['totalgallons']))
{
	$totalgallons = $_POST['totalgallons'];
}

$avecostpergallon = 0;
if (is_numeric($_POST['avecostpergallon']))
{
	$avecostpergallon = $_POST['avecostpergallon'];
}

$totalmiles = 0;
if (is_numeric($_POST['totalmiles']))
{
	$totalmiles = $_POST['totalmiles'];
}

$totalmpg = 0;
if (is_numeric($_POST['totalmpg']))
{
	$totalmpg = $_POST['totalmpg'];
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
$modulecontent = "Unable to save member gas trip entry. memberid = $memberid. tripid = $activetripid.";
include 'mysqlconnect.php';

// print_r($msgArray);
// exit(json_encode($msgArray));

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
	$activetripid,
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

// print_r($_POST);
// print("nottankfilled".$nottankfilled);

// print $sql;

//
// sql query
//
$modulecontent = "Unable to save member gas trip entry. memberid = $memberid. tripid = $activetripid.";
$function = "insert";
include 'mysqlquery.php';

//
// get id
//
$gastripentry = mysqli_insert_id($dbConn);

// 
// Now upsdate gas trip entry totals
// 
$sqlFunction == "update";
$sql = "UPDATE gastriptotalstbl 
	SET 
    odometer=$odometer,
	totalamount=$totalamount,
	totalgallons=$totalgallons,
    nottankfilled=$gastotalsnottankfilled,
    topoffgallons=$topoffgallons,
	avecostpergallon=$avecostpergallon,
	totalmiles=$totalmiles,
	avempg=$totalmpg,
	lastupdate='$enterdate' 
	WHERE id = $gastripentrytotalsid";

// print $sql;

//
// sql query
//
$modulecontent = "Unable to update member trip gas total information for gas trip entry. memberid = $memberid. tripid = $activetripid.";
$function = 'update';
include 'mysqlquery.php';

//
// close db connection
//
mysqli_close($dbConn);

//
// pass back info
//
$msgArray['msgtext'] = 'ok';
$msgArray['gastripentry'] = "$gastripentry";
$msgArray['bodytext'] = "Successfully updated gas entry details and totals";

exit(json_encode($msgArray));
?>
