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

$startgasodometer = 0;
if (is_numeric($_POST['startgasodometer']))
{
	$startgasodometer = $_POST['startgasodometer'];
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
//  see if gas trip entry totals exists 
// 
$sql = "SELECT COUNT(*) AS total FROM gastriptotalstbl 
	WHERE memberid = $memberid AND tripid = $tripid";

// print $sql;

//
// sql query
//
$modulecontent = "Unable to SELECT member trip gas total information for gas trip entry. memberid = $memberid. tripid = $tripid.";
$function = 'select';
include 'mysqlquery.php';

// 
// Get the results
// 
$r = mysqli_fetch_assoc($sql_result);
$totalrecords = $r['total'];

if ($totalrecords == 0)
{
	// 
	//  insert gas trip entry totals
	// 
	$sqlFunction == "insert";
	$sql = "INSERT INTO gastriptotalstbl
		(
			memberid, 
			tripid, 
			odometer, 
			startgasodometer, 
			totalamount, 
			totalgallons, 
			avecostpergallon, 
			totalmiles, 
			avempg, 
			topoffgallons, 
			nottankfilled, 
			lastupdate
		) 
		VALUES 
		(
			$memberid,
			$tripid,
			'$odometer',
			'$startgasodometer',
			'$totalamount',
			'$totalgallons',
			'$avecostpergallon',
			'$totalmiles',
			'$avempg',
		    '$topoffgallons',
			'$gastotalsnottankfilled',
			'$enterdate'  
		)";
}
else
{
	// 
	//  Update gas trip entry totals
	// 
	$sqlFunction == "update";
	$sql = "UPDATE gastriptotalstbl 
		SET 
	    odometer='$odometer',
	    startgasodometer='$startgasodometer',
		totalamount='$totalamount',
		totalgallons='$totalgallons',
	    nottankfilled='$gastotalsnottankfilled',
	    topoffgallons='$topoffgallons',
		avecostpergallon='$avecostpergallon',
		totalmiles='$totalmiles',
		avempg='$avempg',
		lastupdate='$enterdate' 
		WHERE memberid = $memberid AND tripid = $tripid";
}

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
