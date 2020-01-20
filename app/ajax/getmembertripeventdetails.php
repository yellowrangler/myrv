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
$modulecontent = "Unable to get member event trip entries. memberid = $memberid. tripid = $activetripid.";
include 'mysqlconnect.php';

//---------------------------------------------------------------
// get gas trip entries
//---------------------------------------------------------------
$sql = "SELECT * FROM eventtripentrytbl
WHERE tripid = $tripid AND memberid = $memberid
ORDER BY date $order, time $order";

// print $sql;

//
// sql query
//
$modulecontent = "Unable to get member event trip entries. memberid = $memberid. tripid = $activetripid.";
$function = "select";
include 'mysqlquery.php';

// 
// Get the results
// 
$detailEntrys = array();
while($r = mysqli_fetch_assoc($sql_result)) 
{
	if ( !is_null($r[date]) )
	{
		$time = strtotime($r[date]);
		$r[date] = date("m/d/Y", $time);
	}

	if ( !is_null($r[time]) )
	{
		$time = strtotime($r[time]);
		$r[time] = date("g:i A", $time);
	}
	
    $detailEntrys[] = $r;
}


//
// close db connection
//
mysqli_close($dbConn);

exit(json_encode($detailEntrys));
?>
