<?php

include_once ('../class/class.Log.php');
include_once ('../class/class.ErrorLog.php');
include_once ('../class/class.AccessLog.php');

//
// post input
//
$memberid = "";
if( isset($_POST['memberid']) )
{
    $memberid = $_POST['memberid'];
}

$export = 0;
if( isset($_POST['export']) )
{
    $export = 1;
}

//
// get date time for this transaction
//
$datetime = date("Y-m-d H:i:s");

// print_r($_POST);
// die();

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
$modulecontent = "Unable to get member trip information. memberid = $memberid.";
include 'mysqlconnect.php';

//---------------------------------------------------------------
// get member trip information. If for export add vehicle info
//---------------------------------------------------------------
if ($export == 1)
{
	$sql = "SELECT *, 
	(SELECT CONCAT_WS(' ',make, model, year, platenbr) as rvname  
	FROM vehicletbl V
	WHERE memberid = $memberid and V.id = T.rv) as rvname, 
	(SELECT CONCAT_WS(' ',make, model, year, platenbr) as towvehiclename  
	FROM vehicletbl V
	WHERE memberid = $memberid and V.id = T.towvehicle) as towvehiclename 
	FROM triptbl T
	WHERE memberid = $memberid";
}
else
{
	$sql = "SELECT *  FROM triptbl WHERE memberid = '$memberid'";
}

//
// sql query
//
$function = "select";
include 'mysqlquery.php';

//
// get the trip information
// fill the array
//
$trips = array();
while($r = mysqli_fetch_assoc($sql_result)) 
{
	$var = explode("-",$r[startdate]);
	if (checkdate($var[1], $var[2], $var[0]))
	{
		$date = date("m/d/Y", strtotime($r[startdate]) );
	}
	else
	{
		$date = "";
	}
	$r[startdate] = $date;

	$var = explode("-",$r[enddate]);
	if (checkdate($var[1], $var[2], $var[0]))
	{
		$date = date("m/d/Y", strtotime($r[enddate]) );
	}
	else
	{
		$date = "";
	}
	$r[enddate] = $date;

    $trips[] = $r;
}

// print_r($trips);

//
// close db connection
//
mysqli_close($dbConn);

//
// pass back info
//
exit(json_encode($trips));
?>
