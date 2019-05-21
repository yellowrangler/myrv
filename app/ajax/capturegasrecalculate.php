<?php

include_once ('../class/class.Log.php');
include_once ('../class/class.ErrorLog.php');
include_once ('../class/class.AccessLog.php');

//
// post input
//
// $tripid = $_POST['tripid'];
// $memberid = $_POST['memberid'];

$tripid = 5;
$memberid = 1;

//
// get date time for this transaction
//
$datetime = date("Y-m-d H:i:s");

// print_r($_POST);
// die();

// 
// set global variables
// 
$enterdate = $datetime;
$msgtext = "ok";

$firstTime = 1;
$detailEntrys = array();

$totalsEntry = array();
$totalsEntry[memberid] = $memberid;
$totalsEntry[tripid] = $tripid;
$totalsEntry[odometer] = 0;
$totalsEntry[totalamount] = 0;
$totalsEntry[totalgallons] = 0;
$totalsEntry[totalmiles] = 0;
$totalsEntry[avempg] = 0;
$totalsEntry[topoffgallons] = 0;
$totalsEntry[nottankfilled] = 0;
$totalsEntry[lastupdate] = "";

$tripStartOdometer = 0;

// 
//  functions
// 
function CalculateMilage($tripStartOdometer, $idx, &$detailEntrys, &$totalsEntry)
{  
    //
    // Detail
    //     
    if ($detailEntrys[$idx][odometer] == "")
        die("No detail odometer");

    if ($idx == 0)
    {
        $prevOdometer = $tripStartOdometer;
    }
    else
    {
        $prevOdometer = $detailEntrys[$idx - 1][odometer];
    }

    $detailEntrys[$idx][miles] = $detailEntrys[$idx][odometer] - $prevOdometer;
    $detailEntrys[$idx][miles] = round($detailEntrys[$idx][miles], 1);

    //
    // Totals
    //
       
    $totalsEntry[totalmiles] = $totalsEntry[totalmiles] + $detailEntrys[$idx][miles];
    $totalsEntry[totalmiles] = round($totalsEntry[totalmiles], 1);
}

function calculateAmount($idx, &$detailEntrys, &$totalsEntry) 
{
    //
    // Detail
    // 
    if ($detailEntrys[$idx][amount] == "")
        die("No detail amount");
     
    $detailEntrys[$idx][amount] = round($detailEntrys[$idx][amount], 2);

    //
    // Totals
    //
    $totalsEntry[totalamount] = $totalsEntry[totalamount] + $detailEntrys[$idx][amount];
    $totalsEntry[totalamount] = round($totalsEntry[totalamount], 2);

}

function calculateGallons($idx, &$detailEntrys, &$totalsEntry) 
{
    //
    // Detail
    // 
    if ($detailEntrys[$idx][gallons] == "")
        die("No detail gallons");

    $detailEntrys[$idx][gallons] = round($detailEntrys[$idx][gallons], 3); 
    
    //
    // Totals
    //    
    $totalsEntry[totalgallons] = $totalsEntry[totalgallons] + $detailEntrys[$idx][gallons];
    $totalsEntry[totalgallons] = round($totalsEntry[totalgallons], 3);
}

function calculateCPG($idx, &$detailEntrys, &$totalsEntry) 
{
    //
    // Detail
    // 
    $detailEntrys[$idx][costpergallon] = $detailEntrys[$idx][amount] / $detailEntrys[$idx][gallons];
    $detailEntrys[$idx][costpergallon] = round($detailEntrys[$idx][costpergallon], 3);

    //
    // Totals
    //  
    if ($totalsEntry[totalgallons] == 0)
    {
        $totalsEntry[avecostpergallon] = 0;
    }
    else
    {
        $totalsEntry[avecostpergallon] = $totalsEntry[totalamount] / $totalsEntry[totalgallons];
    }

    $totalsEntry[avecostpergallon] = round($totalsEntry[avecostpergallon], 3);
}

function calculateMPG($idx, &$detailEntrys, &$totalsEntry) 
{
    // 
    // if tank not filled no mpg
    //
    if ($detailEntrys[$idx][nottankfilled] == 1)
    {
        $detailEntrys[$idx][mpg] = 0.000;
        // $totalsEntry[avempg] = $scope.current.original.gastotals.avempg; - dont change this keep previous value
        $totalsEntry[nottankfilled] = 1;

        return;
    }

    // 
    //  we must provide for a tank not full
    // 
    $adjustedDetailMiles = 0;
    $adjustedDetailGallons = 0;
    if ($totalsEntry[nottankfilled] == 1)
    {
        $adjustedDetailMiles = $detailEntrys[$idx][miles];
        $adjustedDetailGallons = $detailEntrys[$idx][gallons];
        
        // 
        // we must now gather miles and gallons to provide true mpg
        // 
        for ($i = ($idx - 1); $detailEntrys[$i][nottankfilled] == 1; $i--)
        {
            $adjustedDetailMiles = $adjustedDetailMiles + $detailEntrys[$i][miles];
            $adjustedDetailGallons = $adjustedDetailGallons + $detailEntrys[$i][gallons];
        }

        $totalsEntry[nottankfilled] = 0;
    }
    else
    {
        $adjustedDetailMiles = $detailEntrys[$idx][miles];
        $adjustedDetailGallons = $detailEntrys[$idx][gallons];
    }

    // print "<br> detail entrys adjustedDetailMiles = $adjustedDetailMiles<br>"."</pre>";
    // print "<br> detail entrys adjustedDetailGallons = $adjustedDetailGallons<br>"."</pre>";

    //
    // Detail
    // 
    if ($adjustedDetailGallons == 0)
    {
        $detailEntrys[$idx][mpg] = 0;
    }
    else
    {
        $detailEntrys[$idx][mpg] = $adjustedDetailMiles / $adjustedDetailGallons;
    }

    $detailEntrys[$idx][mpg] = round($detailEntrys[$idx][mpg], 3);
    

    //
    // Totals
    // 

    // 
    // if we had initial fill with no miles remove that gal amount for totals calc
    // 
    if ($totalsEntry[totalmiles] > 0)
    {
        $adjustedTotalGallons = $totalsEntry[totalgallons] - $totalsEntry[topoffgallons];
    }
    else
    {
        $totalsEntry[topoffgallons] = $totalsEntry[totalgallons];
        $adjustedTotalGallons = $totalsEntry[topoffgallons];

        $totalsEntry[topoffgallons] = round($totalsEntry[topoffgallons], 3);
    }

    if ($totalsEntry[totalgallons] == 0)
    {
        $totalsEntry[avempg] = 0;
    }
    else
    {
        if ($totalsEntry[totalmiles] == 0)
        {
            $totalsEntry[avempg] = 0;
        }
        else
        {
            $totalsEntry[avempg] = $totalsEntry[totalmiles] / $adjustedTotalGallons;
        }
    }

    $totalsEntry[avempg] =  round($totalsEntry[avempg], 3);
}

// 
//  end of functions
// 

//
// messaging
//
$returnArrayLog = new AccessLog("logs/");
// $returnArrayLog->writeLog("Member List request started" );

//
// db connect
//
$modulecontent = "Unable to recalculate member trip capture gas information. memberid = $memberid. tripid = $tripid.";
include 'mysqlconnect.php';

// 
// Now get trip information
// 
$sql = "SELECT * FROM triptbl
WHERE id = $tripid AND memberid = $memberid";

//
// sql query
//
$modulecontent = "Unable to get member trip information. memberid = $memberid. tripid = $tripid.";
$function = 'select';
include 'mysqlquery.php';

// 
// Get the results and set starting odometer
// 
$trip = mysqli_fetch_assoc($sql_result);

$tripStartOdometer = $trip[startodometer];

// 
// Now get trip capture gas details information and recalculate trip totals
// 
$sql = "SELECT * FROM gastripentrytbl
WHERE tripid = $tripid AND memberid = $memberid
ORDER BY date, time";

//
// sql query
//
$modulecontent = "Unable to get member trip gas capture detail information. memberid = $memberid. tripid = $tripid.";
$function = 'select';
include 'mysqlquery.php';

// 
// Get the results
// 
while($r = mysqli_fetch_assoc($sql_result)) 
{
    $detailEntrys[] = $r;
}

// 
//  loop through array
// 
for ($idx = 0; $idx < sizeof($detailEntrys); $idx++) 
{
    // 
    //  calculate detail & total milage 
    // 
    CalculateMilage($tripStartOdometer, $idx, $detailEntrys, $totalsEntry);

    // 
    //  calculate detail & total amount 
    // 
    calculateAmount($idx, $detailEntrys, $totalsEntry);


    // 
    //  calculate detail & total gallons 
    // 
    calculateGallons($idx, $detailEntrys, $totalsEntry);


    // 
    //  calculate detail & total cpg 
    // 
    calculateCPG($idx, $detailEntrys, $totalsEntry);


    // 
    //  calculate detail & total mpg 
    // 
    calculateMPG($idx, $detailEntrys, $totalsEntry);

    // 
    // Fill in totals odometer with detail odometer
    // 
    $totalsEntry[odometer] = $detailEntrys[$idx][odometer];
    $totalsEntry[odometer] = round($totalsEntry[odometer], 1);
}

print "<br> detail entrys <br>"."</pre>";
echo "<pre>".print_r($detailEntrys, true)."</pre>";
print "<br> total entrys <br>";
echo "<pre>".print_r($totalsEntry, true)."</pre>";

// 
// Now truncare the trip capture gas detail totals record as we will rebuild it
// 
// $sql = "DELETE FROM gastriptotalstbl
// WHERE tripid = $tripid AND memberid = $memberid";

//
// sql query
//
// $modulecontent = "Unable to delete member trip gas capture totals record. memberid = $memberid. tripid = $tripid.";
// $function = 'delete';
// include 'mysqlquery.php';

//
// close db connection
//
mysqli_close($dbConn);

//
// pass back info
//
exit();
?>