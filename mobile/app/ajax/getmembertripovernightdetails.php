<?php
include_once ('../class/class.Log.php');
include_once ('../class/class.ErrorLog.php');
include_once ('../class/class.AccessLog.php');

//
// post input
//
$memberid = $_POST['memberid'];
$tripid = $_POST['tripid'];
$order = $_POST['order'];

if ($order == "")
{
	$order = "DESC";
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
$modulecontent = "Unable to get member event overnight entries. memberid = $memberid. tripid = $activetripid.";
include 'mysqlconnect.php';

//---------------------------------------------------------------
// get gas overnight entries
//---------------------------------------------------------------
$sql = "SELECT * FROM overnightstaytbl
WHERE tripid = $tripid AND memberid = $memberid
ORDER BY datein $order, timein $order";

// print $sql;

//
// sql query
//
$modulecontent = "Unable to get member event overnight entries. memberid = $memberid. tripid = $activetripid.";
$function = "select";
include 'mysqlquery.php';

// 
// Get the results
// 
$detailEntrys = array();
while($r = mysqli_fetch_assoc($sql_result)) 
{
	if ( !is_null($r[datein]) )
	{
		$time = strtotime($r[datein]);
		$r[datein] = date("m/d/Y", $time);
	}

	if ( !is_null($r[dateout]) )
	{
		$time = strtotime($r[dateout]);
		$r[dateout] = date("m/d/Y", $time);
	}

    $detailEntrys[] = $r;
}


//
// close db connection
//
mysqli_close($dbConn);

exit(json_encode($detailEntrys));
?>