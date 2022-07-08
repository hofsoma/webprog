-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 08, 2022 at 01:54 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `07_orai`
--

-- --------------------------------------------------------

--
-- Table structure for table `emberek`
--

CREATE TABLE `emberek` (
  `id` int(11) NOT NULL,
  `nev` varchar(100) NOT NULL,
  `kor` int(11) NOT NULL,
  `hallgato` tinyint(1) NOT NULL,
  `dolgozik` tinyint(1) NOT NULL,
  `nem` varchar(1) NOT NULL,
  `szin` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `emberek`
--

INSERT INTO `emberek` (`id`, `nev`, `kor`, `hallgato`, `dolgozik`, `nem`, `szin`) VALUES
(12, 'ErnÅ‘', 30, 0, 1, 'N', 'cyan');

-- --------------------------------------------------------

--
-- Table structure for table `szinek`
--

CREATE TABLE `szinek` (
  `id` int(11) NOT NULL,
  `szin` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `szinek`
--

INSERT INTO `szinek` (`id`, `szin`) VALUES
(1, 'blue'),
(2, 'red'),
(4, 'orange'),
(5, 'grey'),
(6, 'purple'),
(7, 'pink'),
(8, 'black'),
(9, 'cyan');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `emberek`
--
ALTER TABLE `emberek`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `szinek`
--
ALTER TABLE `szinek`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `emberek`
--
ALTER TABLE `emberek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `szinek`
--
ALTER TABLE `szinek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
