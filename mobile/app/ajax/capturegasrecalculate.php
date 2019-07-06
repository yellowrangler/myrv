<?php

include_once ('../class/class.Log.php');
include_once ('../class/class.ErrorLog.php');
include_once ('../class/class.AccessLog.php');


//
// get or post variables
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

// 
// set global variables
// 
$enterdate = $datetime;
$msgtext = "";
$dbgtext = "";
$errtext = "";
$msgArray = array();

$detailEntrys = array();

$totalsEntry = array();
$totalsEntry[memberid] = $memberid;
$totalsEntry[tripid] = $tripid;
$totalsEntry[odometer] = 0;
$totalsEntry[startgasodometer] = 0;
$totalsEntry[totalamount] = 0;
$totalsEntry[totalgallons] = 0;
$totalsEntry[avecostpergallon] = 0;
$totalsEntry[totalmiles] = 0;
$totalsEntry[avempg] = 0;
$totalsEntry[topoffgallons] = 0;
$totalsEntry[nottankfilled] = 0;
$totalsEntry[lastupdate] = "";

$msgtext = $msgtext . "<br> Start Gas Capture Member Trip recalculate for tripid = $tripid and memberid = $memberid <br>";


// 
//  functions
// 
function CalculateMilage($idx, &$detailEntrys, &$totalsEntry)
{  
    //
    // Detail
    //     
    if ($detailEntrys[$idx][odometer] == "")
        die("No detail odometer");

    if ($idx == 0)
    {
        $prevOdometer = $detailEntrys[$idx][odometer];
        $totalsEntry[startgasodometer] = $detailEntrys[$idx][odometer];
    }
    else
    {
        $prevOdometer = $detailEntrys[$idx - 1][odometer];
    }

    $detailEntrys[$idx][miles] = $detailEntrys[$idx][odometer] - $prevOdometer;
    $detailEntrys[$idx][miles] = round($detailEntrys[$idx][miles], 1);

    if ($detailEntrys[$idx][miles] < 0)
        die("Negative miles");

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

    if ($detailEntrys[$idx][amount] < 0)
        die("Negative detail amount");

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

    if ($detailEntrys[$idx][gallons] < 0)
        die("Negative detail gallons");
    
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

    if ($detailEntrys[$idx][costpergallon] < 0)
        die("Negative detail costpergallon");

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
    if ($detailEntrys[$idx][mpg] < 0)
        die("Negative detail mpg");
    
    //
    // Totals
    // 

    // 
    // if we had initial fill with no miles remove that gal amount for totals calc
    // 
    if ($idx == 0)
    {
        $totalsEntry[topoffgallons] = $detailEntrys[$idx][gallons];
        $adjustedTotalGallons = $totalsEntry[topoffgallons];

        $totalsEntry[topoffgallons] = round($totalsEntry[topoffgallons], 3);
    }
    else
    {
        $adjustedTotalGallons = $totalsEntry[totalgallons] - $totalsEntry[topoffgallons];
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
$returnArrayLog->writeLog("Member List request started" );

//
// db connect
//
$modulecontent = "Unable to recalculate member trip capture gas information. memberid = $memberid. tripid = $tripid.";
include 'mysqlconnect.php';

// 
// Now get trip capture gas details information and recalculate trip totals
// 
$sql = "SELECT * FROM gastripentrytbl
WHERE tripid = $tripid AND memberid = $memberid
ORDER BY odometer";
// ORDER BY date, time";

//
// sql query
//
$modulecontent = "Unable to get member trip gas capture detail information - recaclculate. memberid = $memberid. tripid = $tripid.";
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
    CalculateMilage($idx, $detailEntrys, $totalsEntry);

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

// print "<br> detail entrys <br>"."</pre>";
// echo "<pre>".print_r($detailEntrys, true)."</pre>";

$startgasodometer = 0;
$counter = 0;
for ($idx = 0; $idx < sizeof($detailEntrys); $idx++) 
{
    $counter++;

    if ($idx == 0) 
    {
        $startgasodometer = $detailEntrys[$idx][odometer];
    }

    $detailEntrysid = $detailEntrys[$idx][id];
    $detailEntrysmemberid = $detailEntrys[$idx][memberid];
    $detailEntrystripid = $detailEntrys[$idx][tripid];
    $detailEntrysodometer = $detailEntrys[$idx][odometer];
    $detailEntrysamount = $detailEntrys[$idx][amount];
    $detailEntrysgallons = $detailEntrys[$idx][gallons];
    $detailEntryscostpergallon = $detailEntrys[$idx][costpergallon];
    $detailEntrysmiles = $detailEntrys[$idx][miles];
    $detailEntrysmpg = $detailEntrys[$idx][mpg];
    $detailEntrysdate = $detailEntrys[$idx][date];
    $detailEntrystime = $detailEntrys[$idx][time];
    $detailEntrysstation = $detailEntrys[$idx][station];
    $detailEntryslocation = $detailEntrys[$idx][location];
    $detailEntrysstate = $detailEntrys[$idx][state];
    $detailEntryscomments = $detailEntrys[$idx][comments];
    $detailEntrysnottankfilled = $detailEntrys[$idx][nottankfilled];

    $sql = "UPDATE gastripentrytbl 
        SET 
        memberid = '$detailEntrysmemberid',
        tripid = '$detailEntrystripid', 
        odometer = '$detailEntrysodometer',
        amount = '$detailEntrysamount',
        gallons = '$detailEntrysgallons',
        costpergallon = '$detailEntryscostpergallon',  
        miles = '$detailEntrysmiles',
        mpg = '$detailEntrysmpg',
        date = '$detailEntrysdate',
        time = '$detailEntrystime',
        station = '$detailEntrysstation',
        location = '$detailEntryslocation',
        state = '$detailEntrysstate',
        comments ='$detailEntryscomments',
        nottankfilled = '$detailEntrysnottankfilled',
        lastupdate='$enterdate' 
        WHERE id = $detailEntrysid AND memberid = $detailEntrysmemberid AND tripid = $detailEntrystripid";

        //
        // sql query
        //
        $modulecontent = "Unable to update member trip gas capture details records - recaclculate. memberid = $memberid. tripid = $tripid. detailsid = $detailEntrysid";
        $function = 'update';
        include 'mysqlquery.php';  

        // print "<br> detail sql updates <br>"."</pre>";
        // echo "<pre>".print_r($sql, true)."</pre>";
}

$dbgtext = "$counter detail records.";

// 
//  see if gas trip entry totals exists 
// 
$sql = "SELECT COUNT(*) AS total FROM gastriptotalstbl 
    WHERE memberid = $memberid AND tripid = $tripid";

//
// sql query
//
$modulecontent = "Unable to SELECT member trip gas total information for gas trip entry - recaclculate. memberid = $memberid. tripid = $tripid.";
$function = 'select';
include 'mysqlquery.php';

// 
// Get the results
// 
$r = mysqli_fetch_assoc($sql_result);
$totalrecords = $r['total'];

//
// sql query
//
$totalsEntrymemberid = $totalsEntry[memberid];
$totalsEntrytripid = $totalsEntry[tripid];
$totalsEntryodometer = $totalsEntry[odometer];
$totalsEntrystartgasodometer = $startgasodometer;
$totalsEntrytotalamount = $totalsEntry[totalamount];
$totalsEntrytotalgallons = $totalsEntry[totalgallons];
$totalsEntryavecostpergallon = $totalsEntry[avecostpergallon];
$totalsEntrytotalmiles = $totalsEntry[totalmiles];
$totalsEntryavempg = $totalsEntry[avempg];
$totalsEntrytopoffgallons = $totalsEntry[topoffgallons];
$totalsEntrynottankfilled = $totalsEntry[nottankfilled];

if ($totalrecords == 0)
{
    // 
    //  insert gas trip entry totals
    // 
    $sqlFunction == "insert";
    $sql = "INSERT INTO gastriptotalstbl
        (
            memberid, 
            tripid, 
            odometer, 
            startgasodometer, 
            totalamount, 
            totalgallons, 
            avecostpergallon, 
            totalmiles, 
            avempg, 
            topoffgallons, 
            nottankfilled, 
            lastupdate
        ) 
        VALUES 
        (
            '$totalsEntrymemberid', 
            '$totalsEntrytripid', 
            '$totalsEntryodometer', 
            '$totalsEntrystartgasodometer', 
            '$totalsEntrytotalamount', 
            '$totalsEntrytotalgallons', 
            '$totalsEntryavecostpergallon', 
            '$totalsEntrytotalmiles', 
            '$totalsEntryavempg', 
            '$totalsEntrytopoffgallons', 
            '$totalsEntrynottankfilled',
            '$enterdate' 
        )";
}
else
{
    // 
    //  Update gas trip entry totals
    // 
    $sqlFunction == "update";
    
    $sql = "UPDATE  gastriptotalstbl  
    SET memberid = $totalsEntrymemberid, 
    tripid = $totalsEntrytripid, 
    odometer = '$totalsEntryodometer', 
    startgasodometer = '$totalsEntrystartgasodometer', 
    totalamount = '$totalsEntrytotalamount', 
    totalgallons = '$totalsEntrytotalgallons', 
    avecostpergallon = '$totalsEntryavecostpergallon', 
    totalmiles = '$totalsEntrytotalmiles', 
    avempg = '$totalsEntryavempg', 
    topoffgallons = '$totalsEntrytopoffgallons', 
    nottankfilled = '$totalsEntrynottankfilled', 
    lastupdate = '$enterdate' 
    WHERE tripid = $tripid AND memberid = $memberid";
}

// print "<pre><br> total entry updates <br>"."</pre>";
// print "<pre><br> $sql <br></pre>";

//
// sql query
//
$modulecontent = "Unable to update member trip gas capture totals record - recaclculate. memberid = $memberid. tripid = $tripid.";
include 'mysqlquery.php';

//
// close db connection
//
mysqli_close($dbConn);

//
// pass back info
//
$msgtext = $msgtext . "<br> Finished Gas Capture Member Trip recalculate for tripid = $tripid and memberid = $memberid <br>";
$msgArray['msgtext'] = $msgtext;
$msgArray['errtext'] = $errtext;
$msgArray['dbgtext'] = $dbgtext;
$msgArray['detailid'] = "$detailid";
$msgArray['bodytext'] = "Successfully recalculated gas entry details and totals";

exit(json_encode($msgArray));
?>
