<?php
include_once ('../class/class.Log.php');
include_once ('../class/class.ErrorLog.php');
include_once ('../class/class.AccessLog.php');

//
// post input
//
$memberid = $_POST['memberid'];
$tripid = $_POST['tripid'];
$id = 0;
if (isset($_POST['id']) )
{
	if (is_numeric($_POST['id']))
	{
		$id = $_POST['id'];
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
$modulecontent = "Unable to delete member event trip entry. memberid = $memberid. tripid = $activetripid.";
include 'mysqlconnect.php';

//---------------------------------------------------------------
// get event trip entry
//---------------------------------------------------------------
$sql = "DELETE FROM eventtripentrytbl 
WHERE tripid = $tripid AND memberid = $memberid AND id = $id";

// print $sql;

//
// sql query
//
$modulecontent = "Unable to delete member event trip entry. memberid = $memberid. tripid = $tripid id = $id.";
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
$msgArray['bodytext'] = "Successfully deleted event entry detail!";

exit(json_encode($msgArray));
?>
