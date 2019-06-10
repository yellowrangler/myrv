<?php
include_once ('../class/class.Log.php');
include_once ('../class/class.ErrorLog.php');
include_once ('../class/class.AccessLog.php');

// 
// This is a new take on building sql from post array
// 

//
// variables
//
$memberid = 0;
$tripid = 0;
$id = 0;
if (isset($_POST['id']) )
{
	if (is_numeric($_POST['id']))
	{
		$id = $_POST['id'];
	}
}

$overnightname = "";	


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
$modulecontent = "Unable to save member overnight trip entry. memberid = $memberid. tripid = $tripid.";
include 'mysqlconnect.php';

// print_r($_POST);

if ($id == 0)
{
	// 
	// INSERT
	// 
	$sqlFunction == "insert";

	$k = "";
	$v = "";		
	foreach($_POST as $key => $value)
	{
		switch ($key) {
			case 'tripname':
				continue 2;
				break;

			case 'overnightname':
				$overnightname = $value;
				break;		

			case 'datein':
			case 'dateout':
				$value = date('Y-m-d', strtotime($value));
				break;		

			case 'timein':
			case 'timeout':
				$value = date('H:i:s', strtotime($value));
				break;	
			
			default:
				break;
		}

		$k = $k.$key.",";
		$v = $v."'".$value."'".",";
	    
	    // print "key = $key, value = $value<br><br>";

	} // end of foreach

	$k = $k."lastupdate";
	$v = $v."'".$enterdate."'";

	$sql = "INSERT INTO overnightstaytbl(".$k.")VALUES(".$v.")";
}
else
{
	// 
	// Update
	// 
	$sqlFunction == "update";

	$l = "";		
	foreach($_POST as $key => $value)
	{
		switch ($key) {
			case 'tripname':
				continue 2;
				break;

			case 'overnightname':
				$overnightname = $value;
				break;	

			case 'tripid':
				$tripid = $value;
				break;

			case 'memberid':
				$memberid = $value;
				break;						

			case 'datein':
			case 'dateout':
				$value = date('Y-m-d', strtotime($value));
				break;		

			case 'timein':
			case 'timeout':
				$value = date('H:i:s', strtotime($value));
				break;	
			
			default:
				break;
		}

		$l = $l.$key."='".$value."',";
	    
	    // print "key = $key, value = $value<br><br>";

	} // end of foreach

	$l = $l."lastupdate='".$enterdate."'";

	$sql = "UPDATE overnightstaytbl SET ".$l." WHERE id = $id AND memberid = $memberid AND tripid = $tripid";
}
	
//
// sql query
//
$modulecontent = "Unable to save member overnight trip entry. func = $sqlFunction. memberid = $memberid. tripid = $tripid.";
include 'mysqlquery.php';

if ($sqlFunction == "insert")
{
	//
	// get id
	//
	$id = mysqli_insert_id($dbConn);

}

//
// close db connection
//
mysqli_close($dbConn);

//
// pass back info
//
$msgArray['msgtext'] = 'ok';
$msgArray['errtext'] = '';
$msgArray['id'] = "$id";
$msgArray['bodytext'] = "Successfully saved overnight entry for $overnightname";

exit(json_encode($msgArray));
?>
