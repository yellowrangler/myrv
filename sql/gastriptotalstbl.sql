-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 21, 2019 at 11:13 PM
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
-- Database: `myrv`
--

-- --------------------------------------------------------

--
-- Table structure for table `gastriptotalstbl`
--

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
  `topoffgallons` decimal(18,3) DEFAULT NULL,
  `nottankfilled` int(11) DEFAULT NULL,
  `lastupdate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `gastriptotalstbl`
--

INSERT INTO `gastriptotalstbl` (`id`, `memberid`, `tripid`, `odometer`, `totalamount`, `totalgallons`, `avecostpergallon`, `totalmiles`, `avempg`, `topoffgallons`, `nottankfilled`, `lastupdate`) VALUES
(1, 1, 3, '100000.0', '0.00', '0.000', '0.000', '0.0', '0.000', '0.000', NULL, '2019-02-03 18:40:02'),
(2, 1, 4, '100000.0', '0.00', '0.000', '0.000', '0.0', '0.000', '0.000', NULL, '2019-02-03 17:38:53'),
(3, 1, 5, '84990.9', '1070.07', '414.650', '2.581', '4902.2', '12.647', '27.039', 0, '2019-05-21 23:11:12');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `gastriptotalstbl`
--
ALTER TABLE `gastriptotalstbl`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `gastriptotalstbl`
--
ALTER TABLE `gastriptotalstbl`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
