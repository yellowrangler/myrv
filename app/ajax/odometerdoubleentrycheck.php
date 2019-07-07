<?php
include_once ('../class/class.Log.php');
include_once ('../class/class.ErrorLog.php');
include_once ('../class/class.AccessLog.php');


$errmsg = "";
$debug = "";

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
    $errmsg = $errmsg . "No tripid passed - terminated";
    exit($errmsg);
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
    $errmsg = $errmsg . "No memberid passed - terminated";
    exit($errmsg);

  }
}

if (isset($_POST["target"]))
{
  $target = $_POST["target"];
}
else
{
  if (isset($_GET["target"]))
  {
    $target = $_GET["target"];
  }
  else
  {
    $errmsg = $errmsg . "No target passed - terminated";
    exit($errmsg);

  }
}

if (isset($_POST["odometer"]))
{
  $odometer = $_POST["odometer"];
}
else
{
  if (isset($_GET["odometer"]))
  {
    $odometer = $_GET["odometer"];
  }
  else
  {
    $errmsg = $errmsg . "No odometer passed - terminated";
    exit($errmsg);

  }
}

// 
//  Set table name
// 
$table = "";
switch ($target) {
    case 'gasdetails':
        $table = "gastripentrytbl";
        break;

    case 'gastotals':
        $table = "gastriptotalstbl";
        break;

    case 'fooddetails':
        $table = "foodtripentrytbl";
        break;

    case 'overnightdetails':
        $table = "foodtripentrytbl";
        break;   

    case 'eventdetails':
        $table = "serviceentrytbl";
        break;
        
    case 'eventdetails':
        $table = "serviceentrytbl";
        break;             

    case 'trips':
        $table = "triptbl";
        break;
    default:
       die("target not passed - $target");    
}
 
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

//
// db connect
//
$modulecontent = "Unable to check for duplicate odometer entry. memberid = $memberid. tripid = $tripid. Target = $target. Odometer = $odometer";
include 'mysqlconnect.php';

// 
//  see if gas trip entry totals exists 
// 
$sql = "SELECT COUNT(*) AS total FROM $table 
	WHERE memberid = $memberid 
	AND tripid = $tripid 
	AND odometer = '$odometer'";

//
// sql query
//
$modulecontent = "Unable to select count check for duplicate odometer entry. memberid = $memberid. tripid = $tripid. Target = $target. Odometer = $odometer";
$sqlFunction == "select";
include 'mysqlquery.php';

// 
// Get the results
// 
$r = mysqli_fetch_assoc($sql_result);
$recordcount = $r['total'];

$rvalue = "ok";
if ($recordcount > 0)
{
	$rvalue = "dupe";
}

//
// close db connection
//
mysqli_close($dbConn);

//
// pass back info
//
$msgArray['msgtext'] = $rvalue;
$msgArray['errtext'] = $errmsg;
$msgArray['count'] = "$recordcount";
$msgArray['debug'] = "$debug";
$msgArray['bodytext'] = "Successfully checked for odometer - $odometer";

exit(json_encode($msgArray));
?>
