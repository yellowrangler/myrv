-- MySQL dump 10.16  Distrib 10.2.17-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: myrv
-- ------------------------------------------------------
-- Server version	10.2.17-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `membertbl`
--

DROP TABLE IF EXISTS `membertbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `membertbl` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `membername` varchar(100) DEFAULT NULL,
  `screenname` varchar(100) DEFAULT NULL,
  `phonenumber` varchar(100) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `zipcode` varchar(100) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `gender` varchar(100) DEFAULT NULL,
  `token` varchar(100) DEFAULT NULL,
  `role` varchar(100) DEFAULT NULL,
  `biography` varchar(10000) DEFAULT NULL,
  `membernameprofileind` int(11) DEFAULT NULL,
  `genderprofileind` int(11) DEFAULT NULL,
  `emailprofileind` int(11) DEFAULT NULL,
  `addressprofileind` int(11) DEFAULT NULL,
  `phonenumberprofileind` int(11) DEFAULT NULL,
  `noemail` int(11) DEFAULT NULL,
  `biographyprofileind` int(11) DEFAULT NULL,
  `lastupdate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `membertbl`
--

LOCK TABLES `membertbl` WRITE;
/*!40000 ALTER TABLE `membertbl` DISABLE KEYS */;
INSERT INTO `membertbl` (`id`, `email`, `password`, `status`, `membername`, `screenname`, `phonenumber`, `address`, `city`, `state`, `zipcode`, `avatar`, `gender`, `token`, `role`, `biography`, `membernameprofileind`, `genderprofileind`, `emailprofileind`, `addressprofileind`, `phonenumberprofileind`, `noemail`, `biographyprofileind`, `lastupdate`) VALUES (1,'tarrant.cutler@gmail.com','tarryc','active','Tarrant Cutler','AirDreamer','978-473-4868','68 Barley Neck Rd','Orleans','MA','02643','airstream.png','Male',NULL,'admin','Da man!',1,1,1,1,1,0,1,'2018-08-07 15:02:55');
/*!40000 ALTER TABLE `membertbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `triptbl`
--

DROP TABLE IF EXISTS `triptbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `triptbl` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `memberid` bigint(20) DEFAULT NULL,
  `tripname` varchar(256) DEFAULT NULL,
  `currenttrip` varchar(2) DEFAULT NULL,
  `towvehicle` bigint(20) DEFAULT NULL,
  `rv` bigint(20) DEFAULT NULL,
  `startodometer` varchar(200) DEFAULT NULL,
  `startdate` date DEFAULT NULL,
  `startlocation` varchar(256) DEFAULT NULL,
  `endodometer` varchar(200) DEFAULT NULL,
  `enddate` date DEFAULT NULL,
  `endlocation` varchar(1000) NOT NULL,
  `lastupdate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `triptbl`
--

LOCK TABLES `triptbl` WRITE;
/*!40000 ALTER TABLE `triptbl` DISABLE KEYS */;
INSERT INTO `triptbl` (`id`, `memberid`, `tripname`, `currenttrip`, `towvehicle`, `rv`, `startodometer`, `startdate`, `startlocation`, `endodometer`, `enddate`, `endlocation`, `lastupdate`) VALUES (1,1,'Spring 2018','0',1,4,'','2018-08-18','Manchester','',NULL,'','2019-02-01 17:21:25');
INSERT INTO `triptbl` (`id`, `memberid`, `tripname`, `currenttrip`, `towvehicle`, `rv`, `startodometer`, `startdate`, `startlocation`, `endodometer`, `enddate`, `endlocation`, `lastupdate`) VALUES (2,1,'Winter 2019','1',1,4,'','2019-02-04','Orleans MA','',NULL,'','2019-02-01 17:21:42');
/*!40000 ALTER TABLE `triptbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vechileinsurancetbl`
--

DROP TABLE IF EXISTS `vechileinsurancetbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vechileinsurancetbl` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `memberid` bigint(20) unsigned DEFAULT NULL,
  `insurancename` varchar(256) DEFAULT NULL,
  `polcynumber` varchar(256) DEFAULT NULL,
  `policyholder` varchar(256) DEFAULT NULL,
  `policytype` varchar(256) DEFAULT NULL,
  `effectivedate` varchar(256) DEFAULT NULL,
  `agentname` varchar(256) DEFAULT NULL,
  `agentphonenbr` varchar(256) DEFAULT NULL,
  `websiteurl` varchar(256) DEFAULT NULL,
  `comments` varchar(1000) DEFAULT NULL,
  `status` varchar(256) DEFAULT NULL,
  `lastupdate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vechileinsurancetbl`
--

LOCK TABLES `vechileinsurancetbl` WRITE;
/*!40000 ALTER TABLE `vechileinsurancetbl` DISABLE KEYS */;
INSERT INTO `vechileinsurancetbl` (`id`, `memberid`, `insurancename`, `polcynumber`, `policyholder`, `policytype`, `effectivedate`, `agentname`, `agentphonenbr`, `websiteurl`, `comments`, `status`, `lastupdate`) VALUES (1,1,'MapFre','FXC087','Tarrant Cutler','Auto & RV','06/15/2018','THOMAS GREGORY ASSOC.INS.BRK,INC.','(781) 435-6080','https://www.mapfreinsurance.com/en/','yowsa','active','2019-02-01 16:51:04');
/*!40000 ALTER TABLE `vechileinsurancetbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vechileroadsideassistancetbl`
--

DROP TABLE IF EXISTS `vechileroadsideassistancetbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vechileroadsideassistancetbl` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `memberid` bigint(20) unsigned DEFAULT NULL,
  `roadsideassistancename` varchar(256) DEFAULT NULL,
  `polcynumber` varchar(256) DEFAULT NULL,
  `policyholder` varchar(256) DEFAULT NULL,
  `expirationdate` varchar(256) DEFAULT NULL,
  `emergencyphonenbr` varchar(256) DEFAULT NULL,
  `websiteurl` varchar(256) DEFAULT NULL,
  `comments` varchar(1000) DEFAULT NULL,
  `status` varchar(256) DEFAULT NULL,
  `lastupdate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vechileroadsideassistancetbl`
--

LOCK TABLES `vechileroadsideassistancetbl` WRITE;
/*!40000 ALTER TABLE `vechileroadsideassistancetbl` DISABLE KEYS */;
INSERT INTO `vechileroadsideassistancetbl` (`id`, `memberid`, `roadsideassistancename`, `polcynumber`, `policyholder`, `expirationdate`, `emergencyphonenbr`, `websiteurl`, `comments`, `status`, `lastupdate`) VALUES (1,1,'Good Sams','FXC087','Tarrant Cutler','03/19/2019','1-800-601-2850','','Used it once','active','2019-02-01 16:51:24');
/*!40000 ALTER TABLE `vechileroadsideassistancetbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicletbl`
--

DROP TABLE IF EXISTS `vehicletbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vehicletbl` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `memberid` bigint(20) unsigned DEFAULT NULL,
  `vehicletype` varchar(256) DEFAULT NULL,
  `make` varchar(256) DEFAULT NULL,
  `model` varchar(256) DEFAULT NULL,
  `color` varchar(256) DEFAULT NULL,
  `year` varchar(256) DEFAULT NULL,
  `platenbr` varchar(256) DEFAULT NULL,
  `platestate` varchar(256) DEFAULT NULL,
  `VIN` varchar(256) DEFAULT NULL,
  `tirenumber` varchar(256) DEFAULT NULL,
  `tiresize` varchar(256) DEFAULT NULL,
  `vehiclelength` varchar(250) DEFAULT NULL,
  `vechileinsuranceid` bigint(20) DEFAULT NULL,
  `comments` varchar(1000) DEFAULT NULL,
  `status` varchar(256) DEFAULT NULL,
  `lastupdate` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicletbl`
--

LOCK TABLES `vehicletbl` WRITE;
/*!40000 ALTER TABLE `vehicletbl` DISABLE KEYS */;
INSERT INTO `vehicletbl` (`id`, `memberid`, `vehicletype`, `make`, `model`, `color`, `year`, `platenbr`, `platestate`, `VIN`, `tirenumber`, `tiresize`, `vehiclelength`, `vechileinsuranceid`, `comments`, `status`, `lastupdate`) VALUES (1,1,'Tow Vehicle','Ford','F150','Blue','2014','5469','MA','99999999','4','R16','',NULL,'','active','2019-02-01');
INSERT INTO `vehicletbl` (`id`, `memberid`, `vehicletype`, `make`, `model`, `color`, `year`, `platenbr`, `platestate`, `VIN`, `tirenumber`, `tiresize`, `vehiclelength`, `vechileinsuranceid`, `comments`, `status`, `lastupdate`) VALUES (3,1,'Tow Vehicle','Mercedese','C30000','Black','1997','','','','','','',NULL,'Tammys car','active','2018-08-09');
INSERT INTO `vehicletbl` (`id`, `memberid`, `vehicletype`, `make`, `model`, `color`, `year`, `platenbr`, `platestate`, `VIN`, `tirenumber`, `tiresize`, `vehiclelength`, `vechileinsuranceid`, `comments`, `status`, `lastupdate`) VALUES (4,1,'RV','Airstream','Globetrotter','Silver','2019','CA3532G','MA','1STTNYL23KJ547448','4','15','27',NULL,'Ready to pick up at Colonial Airstream in NJ','active','2019-02-01');
/*!40000 ALTER TABLE `vehicletbl` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-02-01 16:34:45
