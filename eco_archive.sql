-- Create the customer table
SET foreign_key_checks = 0;
DROP TABLE IF EXISTS `customer`;
SET foreign_key_checks = 1;

CREATE TABLE `customer` (
  `Username` varchar(255) NOT NULL,
  `FName` varchar(255) NOT NULL,
  `LName` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `AccountBal` decimal(15,2) NOT NULL DEFAULT '0.00',
  `DonationAmt` decimal(15,2) NOT NULL DEFAULT '0.00',
  `AddressLine` varchar(255) NOT NULL,
  `City` varchar(255) NOT NULL,
  `Province` varchar(2) NOT NULL,
  `PostalCode` varchar(255) NOT NULL,
  PRIMARY KEY (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
  
  -- Dump data into customer table
  LOCK TABLES `customer` WRITE;
  INSERT INTO `customer` VALUES ("anthonyjdam", "Anthony", "Dam", "hello", 1000.00, 0.00, "123 Anthony St NW", "Calgary", "AB", "T1T1T1"), ("jRaimuu", "Liam", "Sarjeant", "eco", 6969.00, 0.00, "123 Liam St NW", "Calgary", "AB", "A1B2C3"), ("mairakhan419", "Maira", "Khan", "archive", 696969.00, 0.00, "123 Maira St NW", "Calgary", "AB", "D4E5F6");
  UNLOCK TABLES;



-- Create the admin table
SET foreign_key_checks = 0;
DROP TABLE IF EXISTS `administrator`;
SET foreign_key_checks = 1;

CREATE TABLE `administrator` (
  `AdminUsername` varchar(255) NOT NULL,
  `AdminPassword` varchar(255) NOT NULL,
  `BranchName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`AdminUsername`),
  KEY `BranchName_idx` (`BranchName`) /*!80000 INVISIBLE */,
  CONSTRAINT `fk_AdminAccess` FOREIGN KEY (`BranchName`) REFERENCES `inventory` (`BranchName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



-- Create the recycling_depot table
SET foreign_key_checks = 0;
DROP TABLE IF EXISTS `recycling_depot`;
SET foreign_key_checks = 1;

CREATE TABLE `recycling_depot` (
  `BranchName` varchar(255) NOT NULL,
  `AdminUsername` varchar(255) NOT NULL,
  `Location` varchar(255) NOT NULL,
  PRIMARY KEY (`BranchName`),
  KEY `fk_AdminManager_idx` (`AdminUsername`),
  CONSTRAINT `fk_AdminManager` FOREIGN KEY (`AdminUsername`) REFERENCES `administrator` (`AdminUsername`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



-- Create the shipment_facility table
SET foreign_key_checks = 0;
DROP TABLE IF EXISTS `shipment_facility`;
SET foreign_key_checks = 1;

CREATE TABLE `shipment_facility` (
  `FacilityName` varchar(255) NOT NULL,
  `Location` varchar(255) NOT NULL,
  PRIMARY KEY (`FacilityName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



-- Create the ngo table
SET foreign_key_checks = 0;
DROP TABLE IF EXISTS `ngo`;
SET foreign_key_checks = 1;

CREATE TABLE `ngo` (
  `NGOName` varchar(255) NOT NULL,
  `AmountRaised` decimal(15,2) NOT NULL DEFAULT '0.00',
  `AdminUsername` varchar(255) NOT NULL,
  PRIMARY KEY (`NGOName`),
  KEY `fk_AdminNGO` (`AdminUsername`),
  CONSTRAINT `fk_AdminNGO` FOREIGN KEY (`AdminUsername`) REFERENCES `administrator` (`AdminUsername`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



-- Create the donates table
SET foreign_key_checks = 0;
DROP TABLE IF EXISTS `donates`;
SET foreign_key_checks = 1;

CREATE TABLE `donates` (
  `Username` varchar(255) NOT NULL,
  `NGOName` varchar(255) NOT NULL,
  `DonationAmount` decimal(15,2) NOT NULL,
  PRIMARY KEY (`Username`,`NGOName`),
  KEY `fk_DonationNGO_idx` (`NGOName`),
  CONSTRAINT `fk_CustomerDonate` FOREIGN KEY (`Username`) REFERENCES `customer` (`Username`),
  CONSTRAINT `fk_DonationNGO` FOREIGN KEY (`NGOName`) REFERENCES `ngo` (`NGOName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



-- Create the recyclable table
SET foreign_key_checks = 0;
DROP TABLE IF EXISTS `recyclable`;
SET foreign_key_checks = 1;

CREATE TABLE `recyclable` (
  `RecyclableName` varchar(255) NOT NULL,
  `MaterialType` varchar(255) NOT NULL,
  `MaterialRate` decimal(15,2) NOT NULL,
  `AdminUsername` varchar(255) NOT NULL,
  PRIMARY KEY (`RecyclableName`),
  KEY `fk_AdminRecyclable` (`AdminUsername`),
  CONSTRAINT `fk_AdminRecyclable` FOREIGN KEY (`AdminUsername`) REFERENCES `administrator` (`AdminUsername`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



-- Create the accepts table
SET foreign_key_checks = 0;
DROP TABLE IF EXISTS `accepts`;
SET foreign_key_checks = 1;

CREATE TABLE `accepts` (
  `BranchName` varchar(255) NOT NULL,
  `RecyclableName` varchar(255) NOT NULL,
  PRIMARY KEY (`BranchName`,`RecyclableName`),
  KEY `fk_AcceptedRecyclable_idx` (`RecyclableName`),
  CONSTRAINT `fk_AcceptedRecyclable` FOREIGN KEY (`RecyclableName`) REFERENCES `recyclable` (`RecyclableName`),
  CONSTRAINT `fk_BranchAccepts` FOREIGN KEY (`BranchName`) REFERENCES `inventory` (`BranchName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



-- Create the employee_workstation table
SET foreign_key_checks = 0;
DROP TABLE IF EXISTS `employee_workstation`;
SET foreign_key_checks = 1;

CREATE TABLE `employee_workstation` (
  `BranchName` varchar(255) NOT NULL,
  `WorkstationID` int NOT NULL,
  `Username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`BranchName`,`WorkstationID`),
  CONSTRAINT `fk_BranchWorkstation` FOREIGN KEY (`BranchName`) REFERENCES `recycling_depot` (`BranchName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



-- Create the inventory table
SET foreign_key_checks = 0;
DROP TABLE IF EXISTS `inventory`;
SET foreign_key_checks = 1;

CREATE TABLE `inventory` (
  `BranchName` varchar(255) NOT NULL,
  `LifetimePaper` int NOT NULL DEFAULT '0',
  `LifetimeGlass` int NOT NULL DEFAULT '0',
  `LifetimeMetal` int NOT NULL DEFAULT '0',
  `ConcurrentPaper` int NOT NULL DEFAULT '0',
  `ConcurrentGlass` int NOT NULL DEFAULT '0',
  `ConcurrentMetal` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`BranchName`),
  CONSTRAINT `fk_InventoryDepot` FOREIGN KEY (`BranchName`) REFERENCES `recycling_depot` (`BranchName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



-- Create the transaction table
SET foreign_key_checks = 0;
DROP TABLE IF EXISTS `transaction`;
SET foreign_key_checks = 1;

CREATE TABLE `transaction` (
  `Username` varchar(255) NOT NULL,
  `BranchName` varchar(255) NOT NULL,
  `RecyclableName` varchar(255) NOT NULL,
  `AmountOfMaterialsGiven` int DEFAULT NULL,
  `DateTime` datetime DEFAULT NULL,
  PRIMARY KEY (`Username`,`BranchName`,`RecyclableName`),
  KEY `fk_RecyclableTransaction_idx` (`RecyclableName`),
  KEY `fk_WorkstationTransaction_idx` (`BranchName`),
  CONSTRAINT `fk_CustomerTransaction` FOREIGN KEY (`Username`) REFERENCES `customer` (`Username`),
  CONSTRAINT `fk_RecyclableTransaction` FOREIGN KEY (`RecyclableName`) REFERENCES `recyclable` (`RecyclableName`),
  CONSTRAINT `fk_WorkstationTransaction` FOREIGN KEY (`BranchName`) REFERENCES `employee_workstation` (`BranchName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



-- Create the ship table
SET foreign_key_checks = 0;
DROP TABLE IF EXISTS `ship`;
SET foreign_key_checks = 1;

CREATE TABLE `ship` (
  `FacilityName` varchar(255) NOT NULL,
  `BranchName` varchar(255) NOT NULL,
  `AdminUsername` varchar(255) NOT NULL,
  `ShipmentDate` datetime NOT NULL,
  PRIMARY KEY (`FacilityName`,`BranchName`,`AdminUsername`),
  KEY `fk_InventoryShip_idx` (`BranchName`),
  KEY `fk_AdminShip` (`AdminUsername`),
  CONSTRAINT `fk_AdminShip` FOREIGN KEY (`AdminUsername`) REFERENCES `administrator` (`AdminUsername`),
  CONSTRAINT `fk_FacilityShip` FOREIGN KEY (`FacilityName`) REFERENCES `shipment_facility` (`FacilityName`),
  CONSTRAINT `fk_InventoryShip` FOREIGN KEY (`BranchName`) REFERENCES `inventory` (`BranchName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;