-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 24, 2023 at 05:15 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodemysql1`
--

-- --------------------------------------------------------

--
-- Table structure for table `edetails`
--

CREATE TABLE `edetails` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` int(20) NOT NULL,
  `address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `edetails`
--

INSERT INTO `edetails` (`id`, `name`, `email`, `phone`, `address`) VALUES
(298, 'aa', 'dd@', 121212, 'asasasa'),
(299, 'aa101', 'dd2@', 121212, 'asasasa'),
(304, 'dd102', 'dd3@', 212, 'ddddsg102'),
(305, 'saish', 'a22@', 31232, 'adadad'),
(306, 'saish2', 'a222@', 31232, 'adadad'),
(307, 'saish2', 'a12222@', 31232, 'adadad'),
(308, 'saish23', 's12222@', 31232, 'adadad'),
(309, '', 'abnnore@gmail.com', 0, ''),
(310, 'Abdu', 'abdu@gmail.com', 91, ' Mangoor');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `edetails`
--
ALTER TABLE `edetails`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `edetails`
--
ALTER TABLE `edetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=311;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
