<?php

include_once ('../class/class.Log.php');
include_once ('../class/class.ErrorLog.php');
include_once ('../class/class.AccessLog.php');

//
// post input
//
$memberid = $_POST['memberid'];
$membername = $_POST['membername'];
$gender = $_POST['gender'];
$address = $_POST['address'];
$city =  $_POST['city'];
$state = $_POST['state'];
$zipcode = $_POST['zipcode'];
$phonenumber = $_POST['phonenumber'];
$email = $_POST['email'];
$screenname = $_POST['screenname']; 
$password = $_POST['password'];
$vpassword = $_POST['vpassword'];
$biography = $_POST['biography'];

$membernameprofileind = 0;
$genderprofileind = 0;
$emailprofileind = 0; 
$addressprofileind = 0; 
$phonenumberprofileind = 0; 
$biographyprofileind = 0; 
$noemail = 0;
$favoriteteamid = 0;

if( isset($_POST['membernameprofileind']) )
{
     $membernameprofileind = 1;
}

if( isset($_POST['genderprofileind']) )
{
     $genderprofileind = 1;
}

if( isset($_POST['emailprofileind']) )
{
     $emailprofileind = 1;
}

if( isset($_POST['addressprofileind']) )
{
     $addressprofileind = 1;
}

if( isset($_POST['phonenumberprofileind']) )
{
     $phonenumberprofileind = 1;
}

if( isset($_POST['biographyprofileind']) )
{
     $biographyprofileind = 1;
}

if( isset($_POST['noemail']) )
{
     $noemail = 1;
}

//
//  set global values
//
$msgtext = "ok";

// print_r($_POST);
// die();

//
// get date time for this transaction
//
$datetime = date("Y-m-d H:i:s");

// create time stamp versions for insert to mysql
$lastupdateTS = date("Y-m-d H:i:s", strtotime($datetime));

// print_r($_POST);
// die();

//
// messaging
//
// $returnArrayLog = new AccessLog("logs/");
// $returnArrayLog->writeLog("Add member request started" );

//------------------------------------------------------
// get admin member info
//------------------------------------------------------
// open connection to host
$DBhost = "localhost";
$DBschema = "myrv";
$DBuser = "tarryc";
$DBpassword = "tarryc";

//
// connect to db
//
$dbConn = @mysql_connect($DBhost, $DBuser, $DBpassword);
if (!$dbConn) 
{
	$log = new ErrorLog("logs/");
	$dberr = mysql_error();
	$log->writeLog("DB error: $dberr - Error mysql connect. Unable to update membername for myrv member update membername $membername.");

	$rv = "";
	exit($rv);
}

if (!mysql_select_db($DBschema, $dbConn)) 
{
	$log = new ErrorLog("logs/");
	$dberr = mysql_error();
	$log->writeLog("DB error: $dberr - Error selecting db Unable to update membername for myrv member update membername $membername.");

	$rv = "";
	exit($rv);
}

//
// now encode string. Must be done  after mysql connect
//
$biography = mysql_real_escape_string($biography);

//---------------------------------------------------------------
// update membername 
//---------------------------------------------------------------
$sql = "UPDATE membertbl
	SET membername = '$membername', 
		screenname = '$screenname', 
		gender = '$gender', 
		email = '$email', 
		address = '$address',
		city = '$city', 
		state = '$state', 
		zipcode = '$zipcode', 
		phonenumber = '$phonenumber', 
		biography = '$biography',
		membernameprofileind = $membernameprofileind, 
		genderprofileind = $genderprofileind, 
		emailprofileind = $emailprofileind, 
	    addressprofileind = $addressprofileind, 
	    phonenumberprofileind = $phonenumberprofileind, 
	    biographyprofileind = $biographyprofileind,
		noemail = $noemail,
		password = '$password', 
		lastupdate = '$lastupdateTS'
	WHERE id = '$memberid'"; 

	// print($sql);

$sql_result = @mysql_query($sql, $dbConn);
if (!$sql_result)
{
	$log = new ErrorLog("logs/");
	$sqlerr = mysql_error();
	$log->writeLog("SQL error: $sqlerr - Error doing update to db Unable to update membername for myrv member update membername $membername.");
	$log->writeLog("SQL: $sql");

	$rc = -100;
	$msgtext = "System Error: $sqlerr. sql = $sql";

	exit($msgtext);
}

// 
// close db connection
// 
mysql_close($dbConn);

//
// pass back info
//

exit($msgtext);
?>
