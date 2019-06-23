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
$vehicletype = "";
if( isset($_POST['vehicletype']) )
{
     $vehicletype = $_POST['vehicletype'];
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
$modulecontent = "Unable to get member vehicles information. memberid = $memberid. vehicletype = $vehicletype.";
include 'mysqlconnect.php';

//---------------------------------------------------------------
// get member vehicles information
//---------------------------------------------------------------
if ($vehicletype == 'all')
{
    $sql = "SELECT *  FROM vehicletbl 
    WHERE memberid = '$memberid'";
}
else if ($vehicletype == 'towvehicle')
{
    $sql = "SELECT *  FROM vehicletbl 
    WHERE memberid = '$memberid' AND vehicletype = 'Tow Vehicle'";
}
else if ($vehicletype == 'rv')
{
    $sql = "SELECT *  FROM vehicletbl 
    WHERE memberid = '$memberid' AND vehicletype = 'RV'"; 
}
// print $sql;

//
// sql query
//
$function = "select";
include 'mysqlquery.php';

//
// get the vehicle information
// fill the array
//
$vehicles = array();
while($r = mysqli_fetch_assoc($sql_result)) 
{
    $vehicles[] = $r;
}

// print_r($vehicles);

//
// close db connection
//
mysqli_close($dbConn);

//
// pass back info
//
exit(json_encode($vehicles));
?>
