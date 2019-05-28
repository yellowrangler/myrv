<?php
include_once ('../class/class.Log.php');
include_once ('../class/class.ErrorLog.php');
include_once ('../class/class.AccessLog.php');

//
// post input
//
$memberid = $_POST['memberid'];
$tripid = $_POST['tripid'];
$detailid = 0;
if (isset($_POST['detailid']) )
{
	if (is_numeric($_POST['detailid']))
	{
		$detailid = $_POST['detailid'];
	}
}

// print_r($_POST);
// exit();

//
// get date time for this transaction
//
$datetime = date("Y-m-d H:i:s");

// set variables
$enterdate = $datetime;

//
// messaging
//
$returnArrayLog = new AccessLog("logs/");
// $returnArrayLog->writeLog("Member List request started" );

//
// db connect
//
$modulecontent = "Unable to delete member gas trip entry. memberid = $memberid. tripid = $activetripid.";
include 'mysqlconnect.php';

//---------------------------------------------------------------
// get gas trip entry
//---------------------------------------------------------------
$sql = "DELETE FROM gastripentrytbl 
WHERE tripid = $tripid AND memberid = $memberid AND id = $detailid";

// print $sql;

//
// sql query
//
$modulecontent = "Unable to delete member gas trip entry. memberid = $memberid. tripid = $tripid detailid = $detailid.";
$function = "delete";
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
$msgArray['bodytext'] = "Successfully deleted gas entry detail!";

exit(json_encode($msgArray));
?>
