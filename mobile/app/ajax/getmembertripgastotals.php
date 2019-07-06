<?php

include_once ('../class/class.Log.php');
include_once ('../class/class.ErrorLog.php');
include_once ('../class/class.AccessLog.php');

//
// post input
//
if (isset($_POST["tripid"]))
{
  $tripid = $_POST["tripid"];
}
else
{
  if (isset($_GET["tripid"]))
  {
    $tripid = $_GET["tripid"];
  }
  else
  {
    $msg = $msg . "No tripid passed - terminated";
    exit($msg);

  }
}

if (isset($_POST["memberid"]))
{
  $memberid = $_POST["memberid"];
}
else
{
  if (isset($_GET["memberid"]))
  {
    $memberid = $_GET["memberid"];
  }
  else
  {
    $msg = $msg . "No memberid passed - terminated";
    exit($msg);

  }
}

//
// get date time for this transaction
//
$datetime = date("Y-m-d H:i:s");

// print_r($_POST);
// die();

// set variables
$enterdate = $datetime;
$msgtext = "ok";

//
// messaging
//
$returnArrayLog = new AccessLog("logs/");
// $returnArrayLog->writeLog("Member List request started" );

//
// db connect
//
$modulecontent = "Unable to get member trip capture gas totals information. memberid = $memberid. tripid = $tripid.";
include 'mysqlconnect.php';

// 
// Now get gas trip totals
// 
$sql = "SELECT id as gastripentrytotalsid, memberid, tripid, odometer, startgasodometer, totalamount, totalgallons, avecostpergallon, totalmiles, avempg, topoffgallons, nottankfilled, lastupdate 
	FROM gastriptotalstbl 
	WHERE memberid = $memberid AND tripid = $tripid";

//
// sql query
//
$modulecontent = "Unable to get member trip gas total information. memberid = $memberid. tripid = $tripid.";
$function = 'select';
include 'mysqlquery.php';

// 
// Get the results
// 
$membertripgastotals = mysqli_fetch_assoc($sql_result);

//
// close db connection
//
mysqli_close($dbConn);

//
// pass back info
//
exit(json_encode($membertripgastotals));
?>