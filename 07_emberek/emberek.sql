-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 06, 2021 at 04:33 PM
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
-- Database: `07_hf_redo`
--

-- --------------------------------------------------------

--
-- Table structure for table `emberek`
--

CREATE TABLE `emberek` (
  `id` int(11) NOT NULL,
  `nev` varchar(50) NOT NULL,
  `szul_ido` date NOT NULL,
  `foglalkozas` varchar(100) NOT NULL,
  `havi_fizu` int(11) NOT NULL,
  `szemelyi_szam` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `emberek`
--

INSERT INTO `emberek` (`id`, `nev`, `szul_ido`, `foglalkozas`, `havi_fizu`, `szemelyi_szam`) VALUES
(118, 'Wanda', '1989-06-08', '', 0, 'de van'),
(119, 'Soma', '2002-01-23', 'tanulÃ³', 0, '112233ee');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `emberek`
--
ALTER TABLE `emberek`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `emberek`
--
ALTER TABLE `emberek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=121;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
