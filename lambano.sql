-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.1.21-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             9.3.0.4984
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping database structure for lambano
CREATE DATABASE IF NOT EXISTS `lambano` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `lambano`;


-- Dumping structure for table lambano.company
CREATE TABLE IF NOT EXISTS `company` (
  `company_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_name` varchar(50) NOT NULL DEFAULT '',
  `address` text NOT NULL,
  `company_no` varchar(50) NOT NULL DEFAULT '',
  `address2` text NOT NULL,
  `tier` varchar(50) NOT NULL DEFAULT '',
  `city` varchar(50) NOT NULL DEFAULT '',
  `postcode` varchar(50) NOT NULL DEFAULT '',
  `fname` varchar(50) NOT NULL DEFAULT '',
  `lname` varchar(50) NOT NULL DEFAULT '',
  `email` varchar(50) NOT NULL DEFAULT '',
  `phone` varchar(50) NOT NULL DEFAULT '',
  `location_no` int(11) NOT NULL DEFAULT '0',
  `company_tier` int(11) NOT NULL DEFAULT '200',
  PRIMARY KEY (`company_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Dumping data for table lambano.company: ~2 rows (approximately)
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` (`company_id`, `company_name`, `address`, `company_no`, `address2`, `tier`, `city`, `postcode`, `fname`, `lname`, `email`, `phone`, `location_no`, `company_tier`) VALUES
	(2, 'Superior LLC', '5th Floor Purshottam Place, Westlands Road, Next to CFC Bank Chiromo, Westlands PO Box 46728 00100, Nairobi, Kenya', '1', 'P.O', '2', 'Na', '20117', 'Chris', 'Kipruto', 'chrisadriane.ca@gmail.com', '0728318609', 3, 100),
	(3, 'Dura', 'P.O BOX 10100-0011', '4', 'P.O BX', '78', 'Naks', '5363', 'John', 'Doe', 'techflay@gmail.com', '073486348', 8, 200);
/*!40000 ALTER TABLE `company` ENABLE KEYS */;


-- Dumping structure for table lambano.users
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL DEFAULT '0',
  `email` varchar(50) NOT NULL DEFAULT '',
  `fname` varchar(50) NOT NULL DEFAULT '',
  `lname` varchar(50) NOT NULL DEFAULT '',
  `password` varchar(50) NOT NULL DEFAULT '',
  `access_code` varchar(50) NOT NULL DEFAULT '',
  `signup_code` varchar(50) NOT NULL DEFAULT '',
  `role` char(50) NOT NULL DEFAULT '',
  `postcode` varchar(50) NOT NULL DEFAULT '',
  `address1` text NOT NULL,
  `address2` text NOT NULL,
  `city` varchar(50) NOT NULL DEFAULT '',
  `location` varchar(50) NOT NULL DEFAULT '',
  `phone` varchar(50) NOT NULL DEFAULT '',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `authorized_login` enum('Y','N') NOT NULL DEFAULT 'N',
  `creater_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- Dumping data for table lambano.users: ~9 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`user_id`, `company_id`, `email`, `fname`, `lname`, `password`, `access_code`, `signup_code`, `role`, `postcode`, `address1`, `address2`, `city`, `location`, `phone`, `update_time`, `authorized_login`, `creater_id`, `created_at`) VALUES
	(1, 3, 'chrisadriane.ce@gmail.com', 'Chris', 'Adriane', '123', '9wq3m9', '', '1', '', '', '', '', 'Nairobi', '+23484934030', '2019-07-30 12:35:13', 'Y', 0, '2019-07-30 05:58:39'),
	(2, 2, 'mary@gmail.com', 'Mary', 'Ann', '', '', '', '5', '', 'P.O BOX 45', 'P.O BOX 56', 'Mumbai', 'Kuala Lumpur', '+16423723299', '2019-07-30 10:44:12', 'Y', 0, '2019-07-30 05:58:39'),
	(3, 2, 'doe@mailer.com', 'Jane', 'Doe', '', '', '', '3', '', 'P.O BOX 45', 'P.O BOX 56', 'Mumbai', 'Harare', '+36453272788', '2019-07-30 10:44:12', 'Y', 0, '2019-07-30 05:58:39'),
	(4, 3, 'loc@gmail.com', 'Locsan', 'Lynoj', '', '', '', '6', '', 'P.O BOX 45', 'P.O BOX 56', 'Mumbai', 'New Delhi', '+32342942923', '2019-07-30 10:44:12', 'Y', 0, '2019-07-30 05:58:39'),
	(5, 2, 'pat@sunday.com', 'Patrick', 'Namesis', '', '', '', '2', '', 'P.O BOX 45', 'P.O BOX 56', 'Mumbai', 'Tripoli', '+38463745376', '2019-07-30 10:44:12', 'Y', 0, '2019-07-30 05:58:39'),
	(6, 2, 'pack@hotmail.com', 'Pack', 'Jensen', '', '', '', '6', '', 'P.O BOX 45', 'P.O BOX 56', 'Mumbai', 'Cape Town', '+2584545745', '2019-07-30 10:44:12', 'Y', 0, '2019-07-30 05:58:39'),
	(7, 3, 'mike@gmail.com', 'Mike', 'Ross', '', '', 'a8k0nkbeiy7', '4', '', 'P.O BOX 3436 - 00364, Kampala', '', 'Kamapala', 'Kampala', '+2362347263', '2019-07-30 10:44:12', 'Y', 0, '2019-07-30 05:58:39'),
	(8, 2, 'techflay@gmail.com', 'Chris', 'Kip', '', '', 'lyljurox3uo', '1', '', 'P.O BOX 3436 - 00364, Kampala', '', 'Nai', 'Nai', '0728318609', '2019-07-30 10:44:12', 'Y', 1, '2019-07-30 06:15:46'),
	(12, 2, 'chrisadriane.ca@gmail.com', 'Chris', 'Kipruto', 'chowder', 'tpc2hs', 'logs6pbynvn', '1', '', 'P.O BOX 3436 - 00364, Kampala', '', 'Kampala', 'Kampala', '0728318609', '2019-07-30 12:37:48', 'Y', 1, '2019-07-30 10:30:46'),
	(13, 3, 'techflay@gmail.com', 'Michael', 'Jake', '', '', 'ye1qmfhh1s', '6', '', 'P.O BOX 3436 - 00364, Kampala', 'P.O BOX 123 - 0754', 'Kampala', 'Naks', '0728318609', '2019-07-30 12:39:14', 'N', 12, '2019-07-30 12:39:14');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
