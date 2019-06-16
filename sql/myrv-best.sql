-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 02, 2019 at 04:41 PM
-- Server version: 10.2.17-MariaDB
-- PHP Version: 7.2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: myrv
--

-- --------------------------------------------------------

--
-- Table structure for table gastripentrytbl
--

DROP TABLE IF EXISTS gastripentrytbl;
CREATE TABLE gastripentrytbl (
  id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  memberid bigint(20) UNSIGNED DEFAULT NULL,
  tripid bigint(20) UNSIGNED DEFAULT NULL,
  odometer decimal(18,1) DEFAULT NULL,
  amount decimal(18,2) DEFAULT NULL,
  gallons decimal(18,3) DEFAULT NULL,
  costpergallon decimal(18,3) DEFAULT NULL,
  miles decimal(18,1) DEFAULT NULL,
  mpg decimal(18,3) DEFAULT NULL,
  date date DEFAULT NULL,
  time time DEFAULT NULL,
  station varchar(1000) DEFAULT NULL,
  location varchar(1000) DEFAULT NULL,
  state varchar(100) DEFAULT NULL,
  comments varchar(1000) DEFAULT NULL,
  nottankfilled int(11) DEFAULT NULL,
  lastupdate datetime DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table gastripentrytbl
--
INSERT INTO gastripentrytbl (id, memberid, tripid, odometer, amount, gallons, costpergallon, miles, mpg, date, time, station, location, state, comments, nottankfilled, lastupdate) VALUES
(1, 1, 5, '80088.7', '70.00', '27.039', '2.589', '0.0', '0.000', '2018-04-03', '10:23:00', 'Pilot', 'Clinton', 'NJ', NULL, 0, '2019-05-08 14:24:39'),
(2, 1, 5, '80307.1', '42.89', '17.803', '2.409', '218.4', '12.268', '2019-04-03', '22:25:00', 'Flying J', 'Winchester', 'VA', NULL, 0, '2019-05-08 14:26:27'),
(3, 1, 5, '80596.7', '60.10', '24.048', '2.499', '289.6', '12.043', '2018-04-04', '10:27:00', 'Flying J', 'Mc Airy', 'NC', NULL, 0, '2019-05-08 14:29:10'),
(4, 1, 5, '80884.1', '55.81', '23.070', '2.419', '287.4', '12.458', '2018-04-05', '10:31:00', 'Pilot', 'Kannapolis', 'NC', NULL, 0, '2019-05-08 14:33:23'),
(5, 1, 5, '81268.3', '79.73', '32.824', '2.429', '384.2', '11.705', '2018-04-09', '11:15:00', 'Pilot', 'Hardville', 'SC', NULL, 0, '2019-05-08 15:16:56'),
(6, 1, 5, '81605.5', '67.36', '27.506', '2.449', '337.2', '12.259', '2018-04-12', '11:56:00', 'Pilot', 'Coca', 'FL', NULL, 0, '2019-05-08 15:58:06'),
(7, 1, 5, '81803.1', '50.72', '18.792', '2.699', '197.6', '10.515', '2018-04-13', '11:58:00', 'Pilot', 'Unknown', 'FL', NULL, 0, '2019-05-08 16:01:22');


INSERT INTO gastripentrytbl (id, memberid, tripid, odometer, amount, gallons, costpergallon, miles, mpg, date, time, station, location, state, comments, nottankfilled, lastupdate) VALUES
(1, 1, 5, '80088.7', '70.00', '27.039', '2.589', '0.0', '0.000', '2018-04-03', '00:36:00', 'Pilot', 'Clinton', 'NJ', NULL, 0, '2019-05-02 16:39:58');

-- --------------------------------------------------------

--
-- Table structure for table gastriptotalstbl
--

DROP TABLE IF EXISTS gastriptotalstbl;
CREATE TABLE gastriptotalstbl (
  id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  memberid bigint(20) UNSIGNED DEFAULT NULL,
  tripid bigint(20) UNSIGNED DEFAULT NULL,
  odometer decimal(18,1) DEFAULT NULL,
  totalamount decimal(18,2) DEFAULT NULL,
  totalgallons decimal(18,3) DEFAULT NULL,
  avecostpergallon decimal(18,3) DEFAULT NULL,
  totalmiles decimal(18,1) DEFAULT NULL,
  avempg decimal(18,3) DEFAULT NULL,
  topoffgallons decimal(18,3) DEFAULT NULL,  
  nottankfilled int(11) DEFAULT NULL,
  lastupdate datetime DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table gastriptotalstbl
--
INSERT INTO gastriptotalstbl (id, memberid, tripid, odometer, totalamount, totalgallons, avecostpergallon, totalmiles, avempg, topoffgallons, nottankfilled, lastupdate) VALUES
(1, 1, 3, '100000.0', '0.00', '0.000', '0.000', '0.0', '0.0', '0.000', NULL, '2019-02-03 18:40:02'),
(2, 1, 4, '100000.0', '0.00', '0.000', '0.000', '0.0', '0.0', '0.000', NULL, '2019-02-03 17:38:53'),
(3, 1, 5, '81803.1', '426.61', '171.082', '2.494', '1714.4', '11.9', '27.039', 0, '2019-05-08 16:01:22');

INSERT INTO gastriptotalstbl (id, memberid, tripid, odometer, totalamount, totalgallons, avecostpergallon, totalmiles, avempg, topoffgallons, lastupdate) VALUES
(1, 1, 3, '100000.0', '0.00', '0.000', '0.000', '0.0', '0.0', '0.0', '2019-02-03 18:40:02'),
(2, 1, 4, '100000.0', '0.00', '0.000', '0.000', '0.0', '0.0', '0.0', '2019-02-03 17:38:53'),
(3, 1, 5, '80088.7', '0.00', '0.000', '0.000', '0.0', '0.0', '0.000', '2019-05-02 16:39:58');

-- --------------------------------------------------------

--
-- Table structure for table membertbl
--

DROP TABLE IF EXISTS membertbl;
CREATE TABLE membertbl (
  id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  email varchar(100) DEFAULT NULL,
  password varchar(100) DEFAULT NULL,
  status varchar(100) DEFAULT NULL,
  membername varchar(100) DEFAULT NULL,
  screenname varchar(100) DEFAULT NULL,
  phonenumber varchar(100) DEFAULT NULL,
  address varchar(100) DEFAULT NULL,
  city varchar(100) DEFAULT NULL,
  state varchar(100) DEFAULT NULL,
  zipcode varchar(100) DEFAULT NULL,
  avatar varchar(255) DEFAULT NULL,
  gender varchar(100) DEFAULT NULL,
  token varchar(100) DEFAULT NULL,
  role varchar(100) DEFAULT NULL,
  biography varchar(10000) DEFAULT NULL,
  membernameprofileind int(11) DEFAULT NULL,
  genderprofileind int(11) DEFAULT NULL,
  emailprofileind int(11) DEFAULT NULL,
  addressprofileind int(11) DEFAULT NULL,
  phonenumberprofileind int(11) DEFAULT NULL,
  noemail int(11) DEFAULT NULL,
  biographyprofileind int(11) DEFAULT NULL,
  lastupdate datetime DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table membertbl
--

INSERT INTO membertbl (id, email, password, status, membername, screenname, phonenumber, address, city, state, zipcode, avatar, gender, token, role, biography, membernameprofileind, genderprofileind, emailprofileind, addressprofileind, phonenumberprofileind, noemail, biographyprofileind, lastupdate) VALUES
(1, 'tarrant.cutler@gmail.com', 'tarryc', 'active', 'Tarrant Cutler', 'AirDreamer', '978-473-4868', '68 Barley Neck Rd', 'Orleans', 'MA', '02643', 'airstream.png', 'Male', NULL, 'admin', 'Da man!', 1, 1, 1, 1, 1, 0, 1, '2018-08-07 15:02:55');

-- --------------------------------------------------------

--
-- Table structure for table triptbl
--

DROP TABLE IF EXISTS triptbl;
CREATE TABLE triptbl (
  id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  memberid bigint(20) DEFAULT NULL,
  tripname varchar(256) DEFAULT NULL,
  currenttrip varchar(2) DEFAULT NULL,
  towvehicle bigint(20) DEFAULT NULL,
  rv bigint(20) DEFAULT NULL,
  startodometer decimal(18,1) DEFAULT NULL,
  startdate date DEFAULT NULL,
  startlocation varchar(256) DEFAULT NULL,
  endodometer decimal(18,1) DEFAULT NULL,
  enddate date DEFAULT NULL,
  endlocation varchar(1000) NOT NULL,
  lastupdate datetime DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table triptbl
--

INSERT INTO triptbl (id, memberid, tripname, currenttrip, towvehicle, rv, startodometer, startdate, startlocation, endodometer, enddate, endlocation, lastupdate) VALUES
(3, 1, 'Winter 2019', '0', 1, 4, '100000.0', '2019-02-04', 'Orleans', '0.0', NULL, '', '2019-02-03 18:40:02'),
(4, 1, 'Trip 2', '0', 1, 4, '100000.0', '2019-02-03', '', '0.0', NULL, '', '2019-02-03 17:38:53'),
(5, 1, 'Auto Log Southern Trip 2018', '1', 1, 4, '80088.7', '2018-04-03', 'Manchester', '0.0', NULL, 'Southern USA', '2019-05-02 16:35:40');

-- --------------------------------------------------------

--
-- Table structure for table vechileinsurancetbl
--

DROP TABLE IF EXISTS vechileinsurancetbl;
CREATE TABLE vechileinsurancetbl (
  id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  memberid bigint(20) UNSIGNED DEFAULT NULL,
  insurancename varchar(256) DEFAULT NULL,
  polcynumber varchar(256) DEFAULT NULL,
  policyholder varchar(256) DEFAULT NULL,
  policytype varchar(256) DEFAULT NULL,
  effectivedate varchar(256) DEFAULT NULL,
  agentname varchar(256) DEFAULT NULL,
  agentphonenbr varchar(256) DEFAULT NULL,
  websiteurl varchar(256) DEFAULT NULL,
  comments varchar(1000) DEFAULT NULL,
  status varchar(256) DEFAULT NULL,
  lastupdate datetime DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table vechileinsurancetbl
--

INSERT INTO vechileinsurancetbl (id, memberid, insurancename, polcynumber, policyholder, policytype, effectivedate, agentname, agentphonenbr, websiteurl, comments, status, lastupdate) VALUES
(1, 1, 'MapFre', 'FXC087', 'Tarrant Cutler', 'Auto & RV', '06/15/2018', 'THOMAS GREGORY ASSOC.INS.BRK,INC.', '(781) 435-6080', 'https://www.mapfreinsurance.com/en/', 'yowsa', 'active', '2019-02-01 16:51:04');

-- --------------------------------------------------------

--
-- Table structure for table vechileroadsideassistancetbl
--

DROP TABLE IF EXISTS vechileroadsideassistancetbl;
CREATE TABLE vechileroadsideassistancetbl (
  id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  memberid bigint(20) UNSIGNED DEFAULT NULL,
  roadsideassistancename varchar(256) DEFAULT NULL,
  polcynumber varchar(256) DEFAULT NULL,
  policyholder varchar(256) DEFAULT NULL,
  expirationdate varchar(256) DEFAULT NULL,
  emergencyphonenbr varchar(256) DEFAULT NULL,
  businessphonenbr varchar(256) DEFAULT NULL,
  websiteurl varchar(256) DEFAULT NULL,
  cost varchar(100)DEFAULT NULL,
  costinterval varchar(100) DEFAULT NULL,
  email varchar(256) DEFAULT NULL,
  comments varchar(1000) DEFAULT NULL,
  status varchar(256) DEFAULT NULL,
  lastupdate datetime DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table vechileroadsideassistancetbl
--

INSERT INTO vechileroadsideassistancetbl (id, memberid, roadsideassistancename, polcynumber, policyholder, expirationdate, emergencyphonenbr, websiteurl, comments, status, lastupdate) VALUES
(1, 1, 'Good Sams', 'FXC087', 'Tarrant Cutler', '03/19/2019', '1-800-601-2850', '', 'Used it once', 'active', '2019-02-01 16:51:24');

-- --------------------------------------------------------

--
-- Table structure for table vehicletbl
--

DROP TABLE IF EXISTS vehicletbl;
CREATE TABLE vehicletbl (
  id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  memberid bigint(20) UNSIGNED DEFAULT NULL,
  vehicletype varchar(256) DEFAULT NULL,
  make varchar(256) DEFAULT NULL,
  model varchar(256) DEFAULT NULL,
  color varchar(256) DEFAULT NULL,
  year varchar(256) DEFAULT NULL,
  platenbr varchar(256) DEFAULT NULL,
  platestate varchar(256) DEFAULT NULL,
  VIN varchar(256) DEFAULT NULL,
  tirenumber varchar(256) DEFAULT NULL,
  tiresize varchar(256) DEFAULT NULL,
  vehiclelength varchar(250) DEFAULT NULL,
  vechileinsuranceid bigint(20) DEFAULT NULL,
  comments varchar(1000) DEFAULT NULL,
  status varchar(256) DEFAULT NULL,
  lastupdate date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table vehicletbl
--

INSERT INTO vehicletbl (id, memberid, vehicletype, make, model, color, year, platenbr, platestate, VIN, tirenumber, tiresize, vehiclelength, vechileinsuranceid, comments, status, lastupdate) VALUES
(1, 1, 'Tow Vehicle', 'Ford', 'F150', 'Blue', '2014', '5469', 'MA', '99999999', '4', 'R16', '', NULL, '', 'active', '2019-02-01'),
(3, 1, 'Tow Vehicle', 'Mercedese', 'C30000', 'Black', '1997', '', '', '', '', '', '', NULL, 'Tammys car', 'active', '2018-08-09'),
(4, 1, 'RV', 'Airstream', 'Globetrotter', 'Silver', '2019', 'CA3532G', 'MA', '1STTNYL23KJ547448', '4', '15', '27', NULL, 'Ready to pick up at Colonial Airstream in NJ', 'active', '2019-02-01');

--
-- Indexes for dumped tables
--

--
-- Indexes for table gastripentrytbl
--
ALTER TABLE gastripentrytbl
  ADD PRIMARY KEY (id);

--
-- Indexes for table gastriptotalstbl
--
ALTER TABLE gastriptotalstbl
  ADD PRIMARY KEY (id);

--
-- Indexes for table membertbl
--
ALTER TABLE membertbl
  ADD PRIMARY KEY (id);

--
-- Indexes for table triptbl
--
ALTER TABLE triptbl
  ADD PRIMARY KEY (id);

--
-- Indexes for table vechileinsurancetbl
--
ALTER TABLE vechileinsurancetbl
  ADD PRIMARY KEY (id);

--
-- Indexes for table vechileroadsideassistancetbl
--
ALTER TABLE vechileroadsideassistancetbl
  ADD PRIMARY KEY (id);

--
-- Indexes for table vehicletbl
--
ALTER TABLE vehicletbl
  ADD PRIMARY KEY (id);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table gastripentrytbl
--
ALTER TABLE gastripentrytbl
  MODIFY id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table gastriptotalstbl
--
ALTER TABLE gastriptotalstbl
  MODIFY id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table membertbl
--
ALTER TABLE membertbl
  MODIFY id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table triptbl
--
ALTER TABLE triptbl
  MODIFY id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table vechileinsurancetbl
--
ALTER TABLE vechileinsurancetbl
  MODIFY id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table vechileroadsideassistancetbl
--
ALTER TABLE vechileroadsideassistancetbl
  MODIFY id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table vehicletbl
--
ALTER TABLE vehicletbl
  MODIFY id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;


--
-- Table structure for table OvernightStayTbl
--

DROP TABLE IF EXISTS overnightstaytbl;
CREATE TABLE overnightstaytbl (
  id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  memberid bigint(20) DEFAULT NULL,
  tripid bigint(20) DEFAULT NULL,
  typestay varchar(256) DEFAULT NULL,
  overnightname varchar(1000) DEFAULT NULL,
  odometer varchar(100) DEFAULT NULL,
  address varchar(256) DEFAULT NULL,
  city varchar(256) DEFAULT NULL,
  state varchar(256) DEFAULT NULL,
  zipcode varchar(100) DEFAULT NULL,
  phonenumber varchar(1000) DEFAULT NULL,
  cost varchar(100) DEFAULT NULL,
  otherfees varchar(1000) DEFAULT NULL,
  paymentinterval varchar(100) DEFAULT NULL,
  datein date DEFAULT NULL,
  timein time DEFAULT NULL,
  dateout date DEFAULT NULL,
  timeout time DEFAULT NULL,
  websiteurl varchar(1000) DEFAULT NULL,
  email varchar(1000) DEFAULT NULL,
  contact varchar(1000) DEFAULT NULL,
  restrictions varchar(1000) DEFAULT NULL,
  rating int(11) DEFAULT NULL,
  comments varchar(1000) DEFAULT NULL,
  electric int(11) DEFAULT NULL,
  water int(11) DEFAULT NULL,
  sewer int(11) DEFAULT NULL,
  dumpsite int(11) DEFAULT NULL,
  showers int(11) DEFAULT NULL,
  bathrooms int(11) DEFAULT NULL,
  laundry int(11) DEFAULT NULL,
  food int(11) DEFAULT NULL,
  shopping int(11) DEFAULT NULL,
  firepit int(11) DEFAULT NULL,
  fires int(11) DEFAULT NULL,
  wifi int(11) DEFAULT NULL,
  propane int(11) DEFAULT NULL,
  pets int(11) DEFAULT NULL,
  lastupdate datetime DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

typestay = walmart/truckstop/rvparkcity/rvparkcounty/rvparkstate/rvparknational/membership/rvparkindipendent/boondock/friendly make this a service
interval - pernight/peryear/permonth  - amke this a service


--
-- Table structure for table rvmembershiptbl
--

DROP TABLE IF EXISTS rvmembershiptbl;
CREATE TABLE rvmembershiptbl (
  id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  memberid bigint(20) DEFAULT NULL,
  rvmembershipname varchar(1000) DEFAULT NULL,
  rvmembershipid varchar(1000) DEFAULT NULL,
  rvmembername varchar(1000) DEFAULT NULL,
  startdate date DEFAULT NULL,
  expirationdate varchar(100) DEFAULT NULL,
  city varchar(256) DEFAULT NULL,
  state varchar(256) DEFAULT NULL,
  zipcode varchar(100) DEFAULT NULL,
  phonenumber varchar(1000)DEFAULT NULL,
  cost varchar(100)DEFAULT NULL,
  costinterval varchar(100) DEFAULT NULL,
  websiteurl varchar(1000) DEFAULT NULL,
  email varchar(1000) DEFAULT NULL,
  contact varchar(1000) DEFAULT NULL,
  restrictions varchar(1000) DEFAULT NULL,
  rating int(11) DEFAULT NULL,
  comments varchar(1000) DEFAULT NULL,
  status varchar(256) DEFAULT NULL,
  lastupdate datetime DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


ParkClubMembershipTbl
id
memberid
name
membershipid
startdare
expires
city
state
zipcode
phonenumber
membercost
interval - peryear/permonth
websiteurl
email
contact
restrictions
rating 1-10
remarks

DROP TABLE IF EXISTS eventtripentrytbl;
CREATE TABLE eventtripentrytbl (
  id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  memberid bigint(20) DEFAULT NULL,
  tripid bigint(20) DEFAULT NULL,
  event varchar(256) DEFAULT NULL,
  venue varchar(256) DEFAULT NULL,
  address varchar(256) DEFAULT NULL,
  city varchar(256) DEFAULT NULL,
  state varchar(256) DEFAULT NULL,
  zipcode varchar(100) DEFAULT NULL,
  cost varchar(100) DEFAULT NULL,
  otherfees varchar(1000) DEFAULT NULL,
  date date DEFAULT NULL,
  time time DEFAULT NULL,
  odometer varchar(100) DEFAULT NULL,
  websiteurl varchar(1000) DEFAULT NULL,
  email varchar(1000) DEFAULT NULL,
  phonenumber varchar(1000)DEFAULT NULL,
  contact varchar(1000) DEFAULT NULL,
  rating int(11) DEFAULT NULL,
  comments varchar(1000) DEFAULT NULL,
  lastupdate datetime DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS foodtripentrytbl;
CREATE TABLE foodtripentrytbl (
  id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  memberid bigint(20) DEFAULT NULL,
  tripid bigint(20) DEFAULT NULL,
  restaurant varchar(256) DEFAULT NULL,
  venue varchar(256) DEFAULT NULL,
  address varchar(256) DEFAULT NULL,
  city varchar(256) DEFAULT NULL,
  state varchar(256) DEFAULT NULL,
  zipcode varchar(100) DEFAULT NULL,
  cost varchar(100) DEFAULT NULL,
  otherfees varchar(1000) DEFAULT NULL,
  date date DEFAULT NULL,
  time time DEFAULT NULL,
  odometer varchar(100) DEFAULT NULL,
  websiteurl varchar(1000) DEFAULT NULL,
  email varchar(1000) DEFAULT NULL,
  phonenumber varchar(1000)DEFAULT NULL,
  contact varchar(1000) DEFAULT NULL,
  rating int(11) DEFAULT NULL,
  comments varchar(1000) DEFAULT NULL,
  lastupdate datetime DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS serviceentrytbl;
CREATE TABLE serviceentrytbl (
  id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  memberid bigint(20) DEFAULT NULL,
  tripid bigint(20) DEFAULT NULL,
  serviceplace varchar(256) DEFAULT NULL,
  servicetype varchar(256) DEFAULT NULL, - scheduled, unscheduled
  vehicleid bigint(20) UNSIGNED DEFAULT NULL,
  servicedone varchar(1000) NOT NULL,
  cost varchar(100) DEFAULT NULL,
  odometer varchar(100) DEFAULT NULL,
  date date DEFAULT NULL,
  time time DEFAULT NULL,  
  address varchar(256) DEFAULT NULL,
  city varchar(256) DEFAULT NULL,
  state varchar(256) DEFAULT NULL,
  zipcode varchar(100) DEFAULT NULL,
  otherfees varchar(1000) DEFAULT NULL,
  websiteurl varchar(1000) DEFAULT NULL,
  email varchar(1000) DEFAULT NULL,
  phonenumber varchar(1000)DEFAULT NULL,
  contact varchar(1000) DEFAULT NULL,
  rating int(11) DEFAULT NULL,
  comments varchar(1000) NOT NULL,
  lastupdate datetime DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS friendtripentrytbl;
CREATE TABLE friendtripentrytbl (
  id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  memberid bigint(20) DEFAULT NULL,
  tripid bigint(20) DEFAULT NULL,
  friend varchar(256) DEFAULT NULL,
  comments varchar(1000) DEFAULT NULL,
  date date DEFAULT NULL,
  time time DEFAULT NULL,
  odometer varchar(100) DEFAULT NULL,
  address varchar(256) DEFAULT NULL,
  city varchar(256) DEFAULT NULL,
  state varchar(256) DEFAULT NULL,
  zipcode varchar(100) DEFAULT NULL,
  email varchar(1000) DEFAULT NULL,
  phonenumber varchar(1000) DEFAULT NULL,
  lastupdate datetime DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
