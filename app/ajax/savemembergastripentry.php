<?php
include_once ('../class/class.Log.php');
include_once ('../class/class.ErrorLog.php');
include_once ('../class/class.AccessLog.php');

//
// functions
//
function calculateGasTotals($dbGasTotals,$inGas,$inGasTotals) {

	$epsilon = 0.00001;

	$retmsgArray = array();

	$retmsgArray['dbgtext'] = "Calculate message start \n\n\n";
	$retmsgArray['msgtext'] = "ok";
	
    //----------------------------------------------------------- 
    //  calculate and compare total miles
    //----------------------------------------------------------- 
    $milesTotalGiven = number_format($inGasTotals['totalmiles'], 2);
    $milesTotalCalculated = number_format($inGas['miles'] + $dbGasTotals['totalmiles'], 2);

    if (round($milesTotalGiven,2) == round($milesTotalCalculated,2))
    {
    	$retmsgArray['dbgtext'] = $retmsgArray['dbgtext'] . "Total Miles equal\n\n";
    }
    else
	{
    	$retmsgArray['dbgtext'] = $retmsgArray['dbgtext'] . "Total Miles NOT equal. Given = $milesTotalGiven Calc = $milesTotalCalculated\n\n";
    	$retmsgArray['msgtext'] = "error";
    }

    //----------------------------------------------------------- 
    //  calculate and compare cost of gas
    //----------------------------------------------------------- 
    $amtGasTotalGiven = number_format($inGasTotals['totalamount'], 3);
    $amtGasTotalCalculated = number_format($inGas['amount'] + $dbGasTotals['totalamount'], 3);

    if (round($amtGasTotalGiven,3) == round($amtGasTotalCalculated,3))
    {
    	$retmsgArray['dbgtext'] = $retmsgArray['dbgtext'] . "Total Amount equal\n\n";
    }
    else
	{
    	$retmsgArray['dbgtext'] = $retmsgArray['dbgtext'] . "Total Amount NOT equal. Given = $amtGasTotalGiven Calc = $amtGasTotalCalculated\n ingas amount = " . $inGas['amount'] . " db gas totals = " . $dbGasTotals['totalamount'] . "\n\n";
    	$retmsgArray['msgtext'] = "error";
    }

    //----------------------------------------------------------- 
    //  calculate and compare total gallons
    //----------------------------------------------------------- 
    $gallonsTotalGiven = number_format($inGasTotals['totalgallons'], 3);
	$gallonsTotalCalculated = number_format($inGas['gallons'] + $dbGasTotals['totalgallons'], 3);
 
    if (round($gallonsTotalGiven,3) == round($gallonsTotalCalculated,3))
    {
    	$retmsgArray['dbgtext'] = $retmsgArray['dbgtext'] . "Total Gallons equal\n\n";
    }
    else
	{
    	$retmsgArray['dbgtext'] = $retmsgArray['dbgtext'] . "Total Gallons NOT equal. Given = $gallonsTotalGiven Calc = $gallonsTotalCalculated\n\n";
    	$retmsgArray['msgtext'] = "error";
    }

	//----------------------------------------------------------- 
    //  calculate and compare cost per gallon 
    //----------------------------------------------------------- 
    $amtGasCpgTotalGiven = number_format($inGasTotals['avecostpergallon'], 3);

    if (round($gallonsTotalCalculated, 3) == 0.000)
    {
    	$amtGasCpgTotalCalculated = number_format(0,3);
    }
    else
    {
		$amtGasCpgTotalCalculated = number_format($amtGasTotalCalculated / $gallonsTotalCalculated,3);
    }


    if (round($amtGasCpgTotalGiven,3) == number_format($amtGasCpgTotalCalculated, 3))
    {
    	$retmsgArray['dbgtext'] = $retmsgArray['dbgtext'] . "Total Ave CPG equal\n\n";
    }
    else
	{
    	$retmsgArray['dbgtext'] = $retmsgArray['dbgtext'] . "Total Ave CPG NOT equal. Given = $amtGasCpgTotalGiven Calc = $amtGasCpgTotalCalculated\n amtGasTotalCalculated = $amtGasTotalCalculated gallonsTotalCalculated = $gallonsTotalCalculated\n\n";
    	$retmsgArray['msgtext'] = "error";
    }

    //----------------------------------------------------------- 
    //  calculate and compare mpg
    //----------------------------------------------------------- 
	$amtGasMpgTotalGiven = number_format($inGasTotals['totalmpg'],3);
	if (round($amtGasTotalCalculated,0) == 0.000)
    {
    	$amtGasMpgTotalCalculated = number_format(0, 3);
    }
    else
    {
		$amtGasMpgTotalCalculated = number_format($milesTotalCalculated / $amtGasTotalCalculated,3);
    }

    if (round($amtGasMpgTotalGiven,3) == round($amtGasMpgTotalCalculated,3))
    {
    	$retmsgArray['dbgtext'] = $retmsgArray['dbgtext'] . "Total MPG equal\n\n";
    }
    else
	{
    	$retmsgArray['dbgtext'] = $retmsgArray['dbgtext'] . "Total MPG NOT equal. Given = $amtGasMpgTotalGiven Calc = $amtGasMpgTotalCalculated\n\n";
    	$retmsgArray['msgtext'] = "error";
    }

    $retmsgArray['dbgtext'] = $retmsgArray['dbgtext'] . "Calculate message end \n\n\n";

    return $retmsgArray;
}

//
// post input
//
$activetripid = $_POST['activetripid'];
$memberid = $_POST['memberid'];
$activetripname = $_POST['activetripname'];
$date = $_POST['date'];
$time = $_POST['time'];
$station = $_POST['station'];
$location = $_POST['location'];
$state = $_POST['state'];

$time = date('H:i:s', strtotime($time));
$date = date('Y-m-d', strtotime($date));

$nottankfilled = 0;
if( isset($_POST['nottankfilled']) )
{
     $nottankfilled = 1;
}

$originaltotalmiles = 0;
if (is_numeric($_POST['originaltotalmiles']))
{
	$originaltotalmiles = $_POST['originaltotalmiles'];
}

$odometer = 0;
if (is_numeric($_POST['odometer']))
{
	$odometer = $_POST['odometer'];
}

$amount = 0;
if (is_numeric($_POST['amount']))
{
	$amount = $_POST['amount'];
}

$gallons = 0;
if (is_numeric($_POST['gallons']))
{
	$gallons = $_POST['gallons'];
}

$costpergallon = 0;
if (is_numeric($_POST['costpergallon']))
{
	$costpergallon = $_POST['costpergallon'];
}

$miles = 0;
if (is_numeric($_POST['miles']))
{
	$miles = $_POST['miles'];
}

$mpg = 0;
if (is_numeric($_POST['mpg']))
{
	$mpg = $_POST['mpg'];
}

// 
// calculated totals to compare for our server side calculated totals
//
$totalamount = 0;
if (is_numeric($_POST['totalamount']))
{
	$totalamount = $_POST['totalamount'];
}

$totalgallons = 0;
if (is_numeric($_POST['totalgallons']))
{
	$totalgallons = $_POST['totalgallons'];
}

$avecostpergallon = 0;
if (is_numeric($_POST['avecostpergallon']))
{
	$avecostpergallon = $_POST['avecostpergallon'];
}

$totalmiles = 0;
if (is_numeric($_POST['totalmiles']))
{
	$totalmiles = $_POST['totalmiles'];
}

$totalmpg = 0;
if (is_numeric($_POST['totalmpg']))
{
	$totalmpg = $_POST['totalmpg'];
}

//
// get date time for this transaction
//
$datetime = date("Y-m-d H:i:s");

$inputGasData = array();
$inputGasData['amount'] = $amount;
$inputGasData['gallons'] = $gallons;
$inputGasData['costpergallon'] = $costpergallon;
$inputGasData['miles'] = $miles;
$inputGasData['mpg'] = $mpg;


$inputGasTotalsData = array();
$inputGasTotalsData['totalamount'] = $totalamount;
$inputGasTotalsData['totalgallons'] = $totalgallons;
$inputGasTotalsData['avecostpergallon'] = $avecostpergallon;
$inputGasTotalsData['totalmiles'] = $totalmiles;
$inputGasTotalsData['totalmpg'] = $totalmpg;

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
$modulecontent = "Unable to save member gas trip entry. memberid = $memberid. tripid = $activetripid.";
include 'mysqlconnect.php';

//---------------------------------------------------------------
// get previous totals for server side calculation 
//---------------------------------------------------------------

// Now get gas trip totals
 
$sql = "SELECT * 
FROM gastriptotalstbl 
WHERE memberid = $memberid AND tripid = $activetripid 
ORDER BY id DESC LIMIT 1";

//
// sql query
//
$modulecontent = "Unable to get member trip gas total information. memberid = $memberid. tripid = $activetripid.";
$function = 'select';
include 'mysqlquery.php';

// 
// Get the results
// 
$dbMemGasTotals = mysqli_fetch_assoc($sql_result);

//
//  save gas trip entry totals id
//
$gastripentrytotalsid = $dbMemGasTotals['id'];

//
// Calculate and compare
//
$retmsgArray = calculateGasTotals($dbMemGasTotals,$inputGasData,$inputGasTotalsData);

$validationMsg = $retmsgArray['dbgtext'];

// print_r($msgArray);
// exit(json_encode($msgArray));

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
	$activetripid,
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

// print_r($_POST);
// print("nottankfilled".$nottankfilled);

// print $sql;

//
// sql query
//
$modulecontent = "Unable to save member gas trip entry. memberid = $memberid. tripid = $activetripid.";
$function = "insert";
include 'mysqlquery.php';

//
// get id
//
$gastripentry = mysqli_insert_id($dbConn);

// 
// Now upsdate gas trip entry totals
// 
$sqlFunction == "update";
$sql = "UPDATE gastriptotalstbl 
	SET 
	totalamount=$totalamount,
	totalgallons=$totalgallons,
	avecostpergallon=$avecostpergallon,
	totalmiles=$totalmiles,
	avempg=$totalmpg,
	lastupdate='$enterdate' 
	WHERE id = $gastripentrytotalsid";

// print $sql;

//
// sql query
//
$modulecontent = "Unable to update member trip gas total information for gas trip entry. memberid = $memberid. tripid = $activetripid.";
$function = 'update';
include 'mysqlquery.php';

//
// close db connection
//
mysqli_close($dbConn);

//
// pass back info
//
$msgArray['msgtext'] = 'ok';
$msgArray['dbgtext'] = $retmsgArray['dbgtext'];
$msgArray['bodytext'] = "Successfully updated gas entry details and totals";

exit(json_encode($msgArray));
?>
