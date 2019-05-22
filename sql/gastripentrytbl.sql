-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 21, 2019 at 11:12 PM
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
-- Table structure for table `gastripentrytbl`
--

CREATE TABLE `gastripentrytbl` (
  `id` bigint(20) UNSIGNED NOT NULL,
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
  `lastupdate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `gastripentrytbl`
--

INSERT INTO `gastripentrytbl` (`id`, `memberid`, `tripid`, `odometer`, `amount`, `gallons`, `costpergallon`, `miles`, `mpg`, `date`, `time`, `station`, `location`, `state`, `comments`, `nottankfilled`, `lastupdate`) VALUES
(1, 1, 5, '80088.7', '70.00', '27.039', '2.589', '0.0', '0.000', '2018-04-03', '10:23:00', 'Pilot', 'Clinton', 'NJ', NULL, 0, '2019-05-08 14:24:39'),
(2, 1, 5, '80307.1', '42.89', '17.803', '2.409', '218.4', '12.268', '2018-04-03', '22:25:00', 'Flying J', 'Winchester', 'VA', NULL, 0, '2019-05-08 14:26:27'),
(3, 1, 5, '80596.7', '60.10', '24.048', '2.499', '289.6', '12.043', '2018-04-04', '10:27:00', 'Flying J', 'Mc Airy', 'NC', NULL, 0, '2019-05-08 14:29:10'),
(4, 1, 5, '80884.1', '55.81', '23.070', '2.419', '287.4', '12.458', '2018-04-05', '10:31:00', 'Pilot', 'Kannapolis', 'NC', NULL, 0, '2019-05-08 14:33:23'),
(5, 1, 5, '81268.3', '79.73', '32.824', '2.429', '384.2', '11.705', '2018-04-09', '11:15:00', 'Pilot', 'Hardville', 'SC', NULL, 0, '2019-05-08 15:16:56'),
(6, 1, 5, '81605.5', '67.36', '27.506', '2.449', '337.2', '12.259', '2018-04-12', '11:56:00', 'Pilot', 'Coca', 'FL', NULL, 0, '2019-05-08 15:58:06'),
(7, 1, 5, '81803.1', '50.72', '18.792', '2.699', '197.6', '10.515', '2018-04-13', '11:58:00', 'Pilot', 'Unknown', 'FL', NULL, 0, '2019-05-08 16:01:22'),
(8, 1, 5, '82207.2', '50.00', '18.804', '2.659', '404.1', '0.000', '2018-04-17', '00:57:00', 'Shell', 'Unknown', 'FL', NULL, 1, '2019-05-08 17:05:04'),
(9, 1, 5, '82350.1', '65.02', '24.091', '2.699', '142.9', '12.752', '2018-04-17', '19:04:00', 'Speedway', 'Naples', 'FL', NULL, 0, '2019-05-20 23:29:09'),
(10, 1, 5, '82774.8', '89.63', '33.085', '2.709', '424.7', '12.837', '2018-04-25', '18:55:00', 'Flying J', 'San Antonio', 'TX', NULL, 0, '2019-05-21 22:57:56'),
(11, 1, 5, '83067.7', '67.24', '25.976', '2.589', '292.9', '11.276', '2018-04-25', '18:58:00', 'Pilot', 'Vienna', 'GA', NULL, 0, '2019-05-21 23:00:09'),
(12, 1, 5, '83359.8', '59.18', '23.780', '2.489', '292.1', '12.283', '2018-04-27', '19:00:00', 'Murphy USA', 'Oultewah', 'TN', NULL, 0, '2019-05-21 23:02:38'),
(13, 1, 5, '83933.1', '102.20', '40.060', '2.551', '573.3', '14.311', '2018-05-01', '19:03:00', 'Pilot', 'Conover', 'NC', NULL, 0, '2019-05-21 23:04:29'),
(14, 1, 5, '84261.2', '62.80', '24.256', '2.589', '328.1', '13.527', '2018-05-04', '19:04:00', 'Murphy', 'Tarboro', 'NC', NULL, 0, '2019-05-21 23:06:59'),
(15, 1, 5, '84662.0', '78.11', '28.941', '2.699', '400.8', '13.849', '2018-05-07', '19:07:00', 'Exon', 'Rehoboth', 'DE', NULL, 0, '2019-05-21 23:08:50'),
(16, 1, 5, '84990.9', '69.28', '24.575', '2.819', '328.9', '13.384', '2018-05-07', '19:09:00', 'TA', 'Plantsville', 'CT', NULL, 0, '2019-05-21 23:11:12');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `gastripentrytbl`
--
ALTER TABLE `gastripentrytbl`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `gastripentrytbl`
--
ALTER TABLE `gastripentrytbl`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
