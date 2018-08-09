-- MySQL dump 10.15  Distrib 10.0.28-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: localhost
-- ------------------------------------------------------
-- Server version	10.0.28-MariaDB

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
  `startlatitude` varchar(256) DEFAULT NULL,
  `startlongitude` varchar(256) DEFAULT NULL,
  `endodometer` varchar(200) DEFAULT NULL,
  `endlocation` varchar(256) DEFAULT NULL,
  `endlatitude` varchar(256) DEFAULT NULL,
  `endlongitude` varchar(256) DEFAULT NULL,
  `enddate` date DEFAULT NULL,
  `lastupdate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `triptbl`
--

LOCK TABLES `triptbl` WRITE;
/*!40000 ALTER TABLE `triptbl` DISABLE KEYS */;
INSERT INTO `triptbl` (`id`, `memberid`, `tripname`, `currenttrip`, `towvehicle`, `rv`, `startodometer`, `startdate`, `startlocation`, `startlatitude`, `startlongitude`, `endodometer`, `endlocation`, `endlatitude`, `endlongitude`, `enddate`, `lastupdate`) VALUES (1,1,'Spring 2018','1',NULL,NULL,'','2018-08-18','manchester','','','','Manchester, MA','','','2018-09-12','2018-08-07 14:57:34');
INSERT INTO `triptbl` (`id`, `memberid`, `tripname`, `currenttrip`, `towvehicle`, `rv`, `startodometer`, `startdate`, `startlocation`, `startlatitude`, `startlongitude`, `endodometer`, `endlocation`, `endlatitude`, `endlongitude`, `enddate`, `lastupdate`) VALUES (2,1,'new trip','0',NULL,NULL,'','2016-07-01','manchester','','','','','','','2016-07-18','2018-07-31 18:50:22');
INSERT INTO `triptbl` (`id`, `memberid`, `tripname`, `currenttrip`, `towvehicle`, `rv`, `startodometer`, `startdate`, `startlocation`, `startlatitude`, `startlongitude`, `endodometer`, `endlocation`, `endlatitude`, `endlongitude`, `enddate`, `lastupdate`) VALUES (3,1,'new trip not so','0',NULL,NULL,'','2018-07-01','','','','','','','','2018-07-31','2018-07-31 18:50:59');
INSERT INTO `triptbl` (`id`, `memberid`, `tripname`, `currenttrip`, `towvehicle`, `rv`, `startodometer`, `startdate`, `startlocation`, `startlatitude`, `startlongitude`, `endodometer`, `endlocation`, `endlatitude`, `endlongitude`, `enddate`, `lastupdate`) VALUES (4,1,'new trip not so 2','0',NULL,NULL,'','2018-07-01','','','','','','','','2018-07-03','2018-07-31 18:52:29');
INSERT INTO `triptbl` (`id`, `memberid`, `tripname`, `currenttrip`, `towvehicle`, `rv`, `startodometer`, `startdate`, `startlocation`, `startlatitude`, `startlongitude`, `endodometer`, `endlocation`, `endlatitude`, `endlongitude`, `enddate`, `lastupdate`) VALUES (5,1,'Very long label to see what it looks like on list on left','0',NULL,NULL,'6000000','2018-08-01','manchester','','','','Brookline, MA','','','2018-08-27','2018-08-06 18:22:26');
INSERT INTO `triptbl` (`id`, `memberid`, `tripname`, `currenttrip`, `towvehicle`, `rv`, `startodometer`, `startdate`, `startlocation`, `startlatitude`, `startlongitude`, `endodometer`, `endlocation`, `endlatitude`, `endlongitude`, `enddate`, `lastupdate`) VALUES (6,1,'Trip number 30','0',NULL,NULL,'','2018-08-13','Camden ME','','','','Austin TX','','','2018-08-27','2018-08-07 14:52:53');
/*!40000 ALTER TABLE `triptbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tripwaypointstbl`
--

DROP TABLE IF EXISTS `tripwaypointstbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tripwaypointstbl` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `memberid` bigint(20) unsigned DEFAULT NULL,
  `tripid` bigint(20) unsigned DEFAULT NULL,
  `sequencenumber` bigint(20) unsigned DEFAULT NULL,
  `waypointname` varchar(256) DEFAULT NULL,
  `waypointlocation` varchar(1000) DEFAULT NULL,
  `type` varchar(256) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `estimatedmiles` varchar(100) DEFAULT NULL,
  `latitude` varchar(256) DEFAULT NULL,
  `longitude` varchar(256) DEFAULT NULL,
  `waypointdate` date DEFAULT NULL,
  `duration` varchar(256) DEFAULT NULL,
  `comments` varchar(1000) DEFAULT NULL,
  `lastupdate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tripwaypointstbl`
--

LOCK TABLES `tripwaypointstbl` WRITE;
/*!40000 ALTER TABLE `tripwaypointstbl` DISABLE KEYS */;
INSERT INTO `tripwaypointstbl` (`id`, `memberid`, `tripid`, `sequencenumber`, `waypointname`, `waypointlocation`, `type`, `address`, `city`, `state`, `estimatedmiles`, `latitude`, `longitude`, `waypointdate`, `duration`, `comments`, `lastupdate`) VALUES (1,1,1,1,'Harrisburg PA','','','','manchester','MA','','','','0000-00-00','2 days','update','2018-08-06 23:59:36');
INSERT INTO `tripwaypointstbl` (`id`, `memberid`, `tripid`, `sequencenumber`, `waypointname`, `waypointlocation`, `type`, `address`, `city`, `state`, `estimatedmiles`, `latitude`, `longitude`, `waypointdate`, `duration`, `comments`, `lastupdate`) VALUES (2,1,3,1,'new trip not so 1',NULL,'','','','','','','','0000-00-00','','','2018-07-31 18:53:12');
INSERT INTO `tripwaypointstbl` (`id`, `memberid`, `tripid`, `sequencenumber`, `waypointname`, `waypointlocation`, `type`, `address`, `city`, `state`, `estimatedmiles`, `latitude`, `longitude`, `waypointdate`, `duration`, `comments`, `lastupdate`) VALUES (3,1,2,1,'new trip 1',NULL,'','','','','','','','0000-00-00','','','2018-07-31 18:54:26');
INSERT INTO `tripwaypointstbl` (`id`, `memberid`, `tripid`, `sequencenumber`, `waypointname`, `waypointlocation`, `type`, `address`, `city`, `state`, `estimatedmiles`, `latitude`, `longitude`, `waypointdate`, `duration`, `comments`, `lastupdate`) VALUES (4,1,1,2,'Walmart PA','','','','','','500','','','2018-08-13','1 day','Great place park in back','2018-08-07 14:59:14');
/*!40000 ALTER TABLE `tripwaypointstbl` ENABLE KEYS */;
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
  `comments` varchar(1000) DEFAULT NULL,
  `status` varchar(256) DEFAULT NULL,
  `lastupdate` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicletbl`
--

LOCK TABLES `vehicletbl` WRITE;
/*!40000 ALTER TABLE `vehicletbl` DISABLE KEYS */;
INSERT INTO `vehicletbl` (`id`, `memberid`, `vehicletype`, `make`, `model`, `color`, `year`, `platenbr`, `platestate`, `VIN`, `tirenumber`, `tiresize`, `vehiclelength`, `comments`, `status`, `lastupdate`) VALUES (1,1,'Truck','Ford','F150','Blue','2014','5469','MA','99999999','4','R16','','','active','2018-08-09');
INSERT INTO `vehicletbl` (`id`, `memberid`, `vehicletype`, `make`, `model`, `color`, `year`, `platenbr`, `platestate`, `VIN`, `tirenumber`, `tiresize`, `vehiclelength`, `comments`, `status`, `lastupdate`) VALUES (2,1,'RV','Airstream','Flying Cloud','Silver','2015','		','','999999999','2','R15','20 feet','','active','2018-08-09');
INSERT INTO `vehicletbl` (`id`, `memberid`, `vehicletype`, `make`, `model`, `color`, `year`, `platenbr`, `platestate`, `VIN`, `tirenumber`, `tiresize`, `vehiclelength`, `comments`, `status`, `lastupdate`) VALUES (3,1,'Truck','Mercedese','C30000','Black','1997','','','','','','','Tammys car','active','2018-08-09');
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

-- Dump completed on 2018-08-09 10:12:29
