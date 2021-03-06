<?php

include_once ('../class/class.Log.php');
include_once ('../class/class.ErrorLog.php');
include_once ('../class/class.AccessLog.php');
// get date time for this transaction
$datetime = date("Y-m-d H:i:s");

// print_r($_POST);

$email = $_POST["email"];
$password = $_POST["password"];
$rc = 1;
$msgtext = "";
$token = "";

//
// messaging
//
$returnArrayLog = new AccessLog("logs/");
// $returnArrayLog->writeLog("Client List request started" );

//
// db connect
//
$modulecontent = "Unable to login for myrv membername $email.";
include 'mysqlconnect.php';

//---------------------------------------------------------------
// Try to login
//---------------------------------------------------------------
$sql = "SELECT id AS memberid, email, screenname, membername, avatar, password, role, status 
FROM membertbl  
WHERE email = '$email' AND password ='$password' AND status = 'active'";
// print $sql;
// exit();

$rc = 1;

//
// sql query
//
$function = "select";
include 'mysqlquery.php';

$count = mysqli_num_rows($sql_result);
if ($count == 1)
{
	$row = mysqli_fetch_assoc($sql_result);
	$tblpassword = $row['password'];
	$tblmemberid = $row['memberid'];
	$tblscreenname = $row['screenname'];
	$tblmembername = $row['membername'];
	$tblavatar = $row['avatar'];
	$tblrole = $row['role'];
	$tblemail = $row['email'];;

	$msgtext = "Hi $tblmembername, You are now logged in to MY RV!";
}
else 
{ 
    $msgtext = "Unable to Log you in!";
    $rc = 0;
}


//
// close db connection
//
mysqli_close($dbConn);

//
// pass back info
//
$msg["memberid"] = sprintf("%u", $tblmemberid); 
$msg["screenname"] = $tblscreenname;
$msg["email"] = $tblemail;
$msg["avatar"] = $tblavatar;
$msg["role"] = $tblrole;
$msg["membername"] = $tblmembername;
$msg["rc"] = $rc;
$msg["text"] = $msgtext;


exit(json_encode($msg));
?>
