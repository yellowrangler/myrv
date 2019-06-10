<?php
include_once ('../class/class.Log.php');
include_once ('../class/class.ErrorLog.php');
include_once ('../class/class.AccessLog.php');

// 
// initialize variables
// 
$id = 0;
$tripid = 0;
$memberid = 0;
$typestay = "NULL";       
$overnightname = "NULL";
$city = "NULL";
$state = "NULL";
$zipcode = "NULL"; 
$phonenumber = "NULL"; 
$cost = "NULL"; 
$otherfees = "NULL"; 
$paymentinterval = "NULL"; 
$websiteurl = "NULL"; 
$email = "NULL";
$contact = "NULL"; 
$restrictions = "NULL"; 
$rating = "NULL"; 
$comments = "NULL"; 
$electric = "NULL"; 
$water = "NULL";
$sewer = "NULL";
$dumpsite = "NULL"; 
$showers = "NULL";
$bathrooms = "NULL";
$laundry = "NULL"; 
$food = "NULL"; 
$shopping = "NULL";
$firepit = "NULL";
$fires = "NULL"; 
$wifi = "NULL"; 
$propane = "NULL";
$pets = "NULL"; 
$lastupdate = "NULL";

$datein = "NULL";
$timein = "NULL";
$dateout = "NULL";
$timeout = "NULL";

//
// post input
//

// print_r($_POST);

foreach($_POST as $key => $value)
{
    if (strstr($key, 'item'))
    {
        $x = str_replace('item','',$key);
        inserttag($value, $x);
    }
}

$tripid = $_POST['tripid'];
$memberid = $_POST['memberid'];
$typestay = $_POST['typestay'];       
$overnightname = $_POST['overnightname']; 
$city = $_POST['city']; 
$state = $_POST['state']; 
$zipcode = $_POST['zipcode']; 
$phonenumber = $_POST['phonenumber']; 
$cost = $_POST['cost']; 
$otherfees = $_POST['otherfees']; 
$paymentinterval = $_POST['paymentinterval']; 
$websiteurl = $_POST['websiteurl']; 
$email = $_POST['email']; 
$contact = $_POST['contact']; 
$restrictions = $_POST['restrictions']; 
$rating = $_POST['rating']; 
$comments = $_POST['comments']; 
$electric = $_POST['electric']; 
$water = $_POST['water']; 
$sewer = $_POST['sewer'];
$dumpsite = $_POST['dumpsite']; 
$showers = $_POST['showers'];
$bathrooms = $_POST['bathrooms']; 
$laundry = $_POST['laundry']; 
$food = $_POST['food']; 
$shopping = $_POST['shopping'];
$firepit = $_POST['firepit'];
$fires = $_POST['fires']; 
$wifi = $_POST['wifi']; 
$propane = $_POST['propane']; 
$pets = $_POST['pets']; 
$lastupdate = 

// $datein = date('Y-m-d', strtotime($datein));
// $timein = date('H:i:s', strtotime($timein));
// $dateout = date('Y-m-d', strtotime($dateout));
// $timeout = date('H:i:s', strtotime($timeout));

$errmsg = "";

if (isset($_POST['id']))
{
	if (is_numeric($_POST['id']))
	{
		$id = $_POST['id'];
	}
}

if (isset($_POST['tripid']))
{
	if (is_numeric($_POST['tripid']))
	{
		$tripid = $_POST['tripid'];
	}
	else
	{
		$errmsg = $errmsg . "Tripid has not been passed! <br><br>";
	}
}
else
{
	$errmsg = $errmsg . "Tripid has not been passed! <br><br>";
}

if (isset($_POST['memberid']))
{
	if (is_numeric($_POST['memberid']))
	{
		$memberid = $_POST['memberid'];
	}
	else
	{
		$errmsg = $errmsg . "Memberid has not been passed! <br><br>";
	}
}
else
{
	$errmsg = $errmsg . "Memberid has not been passed! <br><br>";
}

if (isset($_POST['datein']) )
{
	$datein = date('Y-m-d', strtotime($datein));
}

if (isset($_POST['timein']) )
{
	$timein = date('H:i:s', strtotime($timein));
}

if (isset($_POST['dateout']) )
{
	$dateout = date('Y-m-d', strtotime($dateout));
}

if (isset($_POST['timeout']) )
{
	$timeout = date('H:i:s', strtotime($timeout));
}


// 
// if error pass back error message
//
if ($errmsg != "")
{
	$msgArray['msgtext'] = 'error';
	$msgArray['errtext'] = $errmsg;
	$msgArray['detailid'] = "$detailid";
	$msgArray['bodytext'] = "Error updating overnight entry details";

	exit(json_encode($msgArray));
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
$modulecontent = "Unable to save member overnight trip entry. memberid = $memberid. tripid = $tripid.";
include 'mysqlconnect.php';

// print_r($msgArray);
// exit(json_encode($msgArray));

if ($detailid == 0)
{
	$sqlFunction == "insert";

	//---------------------------------------------------------------
	// save gas trip entry
	//---------------------------------------------------------------
	$sql = "INSERT INTO gastripentrytbl( 
		memberid, 
		tripid, 
		odometer, 
		amount, 
		gallons, 
		costpergallon, 
		miles, 
		mpg, 
		date, 
		time, 
		station, 
		location, 
		state, 
		nottankfilled, 
		lastupdate) 
	VALUES (
		$memberid,
		$tripid,
		'$odometer', 
		'$amount', 
		'$gallons', 
		'$costpergallon', 
		'$miles', 
		'$mpg', 
		'$date', 
		'$time', 
		'$station', 
		'$location', 
		'$state', 
		'$nottankfilled',
		'$enterdate')";

}
else
{
	$sqlFunction == "update";

	$sql = "UPDATE gastripentrytbl 
		SET 
		memberid = '$memberid',
		tripid = '$tripid', 
		odometer = '$odometer',
		amount = '$amount',
		gallons = '$gallons',
		costpergallon = '$costpergallon',  
		miles = '$miles',
		mpg = '$mpg',
		date = '$date',
		time = '$time',
		station = '$station',
		location = '$location',
		state = '$state',
		nottankfilled = '$nottankfilled',
		lastupdate='$enterdate' 
		WHERE id = $detailid AND memberid = $memberid AND tripid = $tripid";

}

// print_r($_POST);
// print("nottankfilled".$nottankfilled);

// print $sql;

//
// sql query
//
$modulecontent = "Unable to save member overnight trip entry. memberid = $memberid. tripid = $tripid.";
include 'mysqlquery.php';

if ($sqlFunction == "insert")
{
	//
	// get id
	//
	$detailid = mysqli_insert_id($dbConn);

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
$msgArray['detailid'] = "$detailid";
$msgArray['bodytext'] = "Successfully updated overnight entry details";

exit(json_encode($msgArray));
?>
