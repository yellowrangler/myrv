DROP TABLE IF EXISTS `gastripentrytbl`;

CREATE TABLE `gastripentrytbl` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `memberid` bigint(20) UNSIGNED DEFAULT NULL,
  `tripid` bigint(20) UNSIGNED DEFAULT NULL,
  `odometer` decimal(18,1) DEFAULT NULL,
  `amount` decimal(18,2) DEFAULT NULL,
  `gallons` decimal(18,3) DEFAULT NULL,
  `costpergallon` decimal(18,3) DEFAULT NULL,
  `miles` decimal(18,1) DEFAULT NULL,
  `mpg` decimal(18,3) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL,
  `station` varchar(1000) DEFAULT NULL,
  `location` varchar(1000) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `comments` varchar(1000) DEFAULT NULL,
  `nottankfilled` int(11) DEFAULT NULL,
  `lastupdate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `gastriptotalstbl`;
CREATE TABLE `gastriptotalstbl` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `memberid` bigint(20) UNSIGNED DEFAULT NULL,
  `tripid` bigint(20) UNSIGNED DEFAULT NULL,
  `odometer` decimal(18,1) DEFAULT NULL,
  `totalamount` decimal(18,2) DEFAULT NULL,
  `totalgallons` decimal(18,3) DEFAULT NULL,
  `avecostpergallon` decimal(18,3) DEFAULT NULL,
  `totalmiles` decimal(18,1) DEFAULT NULL,
  `avempg` decimal(18,3) DEFAULT NULL,
  `lastupdate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
);

--
-- Dumping data for table `gastriptotalstbl`
--

INSERT INTO `gastriptotalstbl` (`id`, `memberid`, `tripid`, `odometer`, `totalamount`, `totalgallons`, `avecostpergallon`, `totalmiles`, `avempg`, `lastupdate`) VALUES
(1, 1, 3, '100000.0', '0.00', '0.000', '0.000', '0.0', '0.000', '2019-02-03 18:40:02'),
(2, 1, 4, '100000.0', '0.00', '0.000', '0.000', '0.0', '0.000', '2019-02-03 17:38:53'),
(3, 1, 5, '80088.7', '0.00', '0.000', '0.000', '0.0', '0.000', '2019-04-05 15:21:59');


DROP TABLE IF EXISTS `triptbl`;
CREATE TABLE `triptbl` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `memberid` bigint(20) DEFAULT NULL,
  `tripname` varchar(256) DEFAULT NULL,
  `currenttrip` varchar(2) DEFAULT NULL,
  `towvehicle` bigint(20) DEFAULT NULL,
  `rv` bigint(20) DEFAULT NULL,
  `startodometer` decimal(18,1) DEFAULT NULL,
  `startdate` date DEFAULT NULL,
  `startlocation` varchar(256) DEFAULT NULL,
  `endodometer` decimal(18,1) DEFAULT NULL,
  `enddate` date DEFAULT NULL,
  `endlocation` varchar(1000) NOT NULL,
  `lastupdate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
);




LOCK TABLES `triptbl` WRITE;
/*!40000 ALTER TABLE `triptbl` DISABLE KEYS */;
INSERT INTO `triptbl` (`id`, `memberid`, `tripname`, `currenttrip`, `towvehicle`, `rv`, `startodometer`, `startdate`, `startlocation`, `endodometer`, `enddate`, `endlocation`, `lastupdate`) VALUES (1,1,'Spring 2018','0',1,4,NULL,'2018-08-18','Manchester',NULL,NULL,'','2019-02-01 17:21:25');
INSERT INTO `triptbl` (`id`, `memberid`, `tripname`, `currenttrip`, `towvehicle`, `rv`, `startodometer`, `startdate`, `startlocation`, `endodometer`, `enddate`, `endlocation`, `lastupdate`) VALUES (2,1,'Winter 2019','1',1,4,NULL,'2019-02-04','Orleans MA',NULL,NULL,'','2019-02-01 17:21:42');
/*!40000 ALTER TABLE `triptbl` ENABLE KEYS */;
UNLOCK TABLES;
