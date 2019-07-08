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
$driversliscencenbr = $_POST['driversliscencenbr'];
$driversliscenceexpirationdate = $_POST['driversliscenceexpirationdate'];
$driversliscencestate = $_POST['driversliscencestate'];

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

//
// db connect
//
$modulecontent = "Unable to update membername for myrv member update memberid $memberid.";
include 'mysqlconnect.php';

//
// now encode string. Must be done  after mysql connect
//
$biography = mysqli_real_escape_string($dbConn, $biography);

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
		driversliscencenbr = '$driversliscencenbr',
		driversliscenceexpirationdate = '$driversliscenceexpirationdate',
		driversliscencestate = '$driversliscencestate',
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

//
// sql query
//
$function = "update";
include 'mysqlquery.php';

// 
// close db connection
// 
mysqli_close($dbConn);

//
// pass back info
//
exit($msgtext);
?>