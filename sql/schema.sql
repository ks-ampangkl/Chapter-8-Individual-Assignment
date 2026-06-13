-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.4.3 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for employee_directory
CREATE DATABASE IF NOT EXISTS `employee_directory` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `employee_directory`;

-- Dumping structure for table employee_directory.employees
CREATE TABLE IF NOT EXISTS `employees` (
  `empId` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `department` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `position` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hireDate` date NOT NULL,
  `salary` decimal(10,2) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`empId`),
  UNIQUE KEY `email` (`email`),
  CONSTRAINT `chk_salary` CHECK (((`salary` >= 1500.00) and (`salary` <= 50000.00)))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table employee_directory.employees: ~7 rows (approximately)
INSERT INTO `employees` (`empId`, `name`, `email`, `department`, `position`, `hireDate`, `salary`, `active`) VALUES
	('EMP001', 'Ahmad Zulkarnain bin Hassan', 'ahmad.zulkarnain@company.my', 'IT', 'Senior Software Engineer', '2021-03-15', 6500.00, 1),
	('EMP002', 'Nur Aisyah binti Abdullah', 'nur.aisyah@company.my', 'HR', 'HR Manager', '2020-08-01', 5800.00, 1),
	('EMP003', 'Muhammad Faris bin Razak', 'm.faris@company.my', 'IT', 'System Administrator', '2022-05-10', 4200.00, 1),
	('EMP004', 'Siti Khadijah binti Ibrahim', 'siti.khadijah@company.my', 'Finance', 'Financial Analyst', '2019-11-01', 4800.00, 1),
	('EMP005', 'Tan Wei Ming', 'tan.weiming@company.my', 'Marketing', 'Marketing Executive', '2023-01-15', 3500.00, 1),
	('EMP006', 'Arun Kumar a/l Subramaniam', 'arun.kumar@company.my', 'IT', 'Junior Developer', '2024-02-01', 2800.00, 1),
	('EMP007', 'Sarah Jane Lim', 'sarah.lim@company.my', 'HR', 'Recruitment Specialist', '2021-06-20', 3900.00, 0);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
