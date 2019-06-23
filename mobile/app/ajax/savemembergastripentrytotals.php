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

$odometer = 0;
if (is_numeric($_POST['odometer']))
{
	$odometer = $_POST['odometer'];
}

// 
// calculated totals 
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
	if (is_numeric($_POST['gastotalsnottankfilled']))
	{
		$gastotalsnottankfilled = $_POST['gastotalsnottankfilled'];
	}
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

$avempg = 0;
if (is_numeric($_POST['avempg']))
{
	$avempg = $_POST['avempg'];
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
$modulecontent = "Unable to save member gas trip entry totals. memberid = $memberid. tripid = $tripid.";
include 'mysqlconnect.php';

// print_r($msgArray);
// exit(json_encode($msgArray));


// 
//  Update gas trip entry totals
// 
$sqlFunction == "update";
$sql = "UPDATE gastriptotalstbl 
	SET 
    odometer='$odometer',
	totalamount='$totalamount',
	totalgallons='$totalgallons',
    nottankfilled='$gastotalsnottankfilled',
    topoffgallons='$topoffgallons',
	avecostpergallon='$avecostpergallon',
	totalmiles='$totalmiles',
	avempg='$avempg',
	lastupdate='$enterdate' 
	WHERE memberid = $memberid AND tripid = $tripid";

// print $sql;

//
// sql query
//
$modulecontent = "Unable to update member trip gas total information for gas trip entry. memberid = $memberid. tripid = $tripid.";
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
$msgArray['errtext'] = '';
$msgArray['bodytext'] = "Successfully updated gas entry detail totals";

exit(json_encode($msgArray));
?>
