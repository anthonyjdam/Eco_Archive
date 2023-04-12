SET foreign_key_checks = 0;
-- Create the customer table
DROP TABLE IF EXISTS `customer`;
DROP TABLE IF EXISTS `employee`;

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




  CREATE TABLE `employee` (
  `Username` varchar(255) NOT NULL,
  `LName` varchar(255) NOT NULL,
  `FName` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  PRIMARY KEY (`Username`)
  );

  -- Dump data into employee table
  LOCK TABLES `employee` WRITE;
  INSERT INTO `employee` VALUES 
  ("mairakhan419", "Khan", "Mirah", "cheeto"), 
  ("anthonyjdam", "Dam", "Anthony", "password"), 
  ("jRaimuu", "Sarjeant", "Liam", "someReallyLongPassword"), 
  ("Casper", "Phan", "Tom", "54321"), 
  ("Ghost", "Phantano", "Tommy", "12345"),
  ("Specter", "Prankster", "Tina", "67890"),
  ("Phantasma", "Perry", "Johnny", "54321"),
  ("Polterguy", "Poltergeist", "Samantha", "24680");
  UNLOCK TABLES;





-- Create the admin table

DROP TABLE IF EXISTS `administrator`;

CREATE TABLE `administrator` (
  `Username` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `BranchName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Username`),
  KEY `BranchName_idx` (`BranchName`) /*!80000 INVISIBLE */,
  CONSTRAINT `fk_AdminAccess` FOREIGN KEY (`BranchName`) REFERENCES `inventory` (`BranchName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Dump data for the admin table
LOCK TABLES `administrator` WRITE;
INSERT INTO `administrator` (`Username`, `Password`, `BranchName`) VALUES ('admin', 'admin', 'University'), ('janedoe', 'doejane', 'Sage Hill');
UNLOCK TABLES;



-- Create the recycling_depot table

DROP TABLE IF EXISTS `recycling_depot`;

CREATE TABLE `recycling_depot` (
  `BranchName` varchar(255) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `Location` varchar(255) NOT NULL,
  PRIMARY KEY (`BranchName`),
  KEY `fk_AdminManager_idx` (`Username`),
  CONSTRAINT `fk_AdminManager` FOREIGN KEY (`Username`) REFERENCES `administrator` (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dump data into the recycling_depot table
LOCK TABLES `recycling_depot` WRITE;
INSERT INTO `recycling_depot` (`BranchName`, `Username`, `Location`) VALUES ('University', 'admin', '2500 University Dr NW, Calgary, AB T2N 1N4'), ('Sage Hill', 'janedoe', '70 Sage Hill Plaza NW, Calgary, AB T3R 0S4');
UNLOCK TABLES;



-- Create the inventory table

DROP TABLE IF EXISTS `inventory`;

CREATE TABLE `inventory` (
  `BranchName` varchar(255) NOT NULL,
  `LifetimePaper` int NOT NULL DEFAULT '0',
  `LifetimeGlass` int NOT NULL DEFAULT '0',
  `LifetimeMetal` int NOT NULL DEFAULT '0',
  `LifetimePlastic` int NOT NULL DEFAULT '0',
  `ConcurrentPaper` int NOT NULL DEFAULT '0',
  `ConcurrentGlass` int NOT NULL DEFAULT '0',
  `ConcurrentMetal` int NOT NULL DEFAULT '0',
  `ConcurrentPlastic` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`BranchName`),
  CONSTRAINT `fk_InventoryDepot` FOREIGN KEY (`BranchName`) REFERENCES `recycling_depot` (`BranchName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dump data into the inventory table
LOCK TABLES `inventory` WRITE;
INSERT INTO `inventory` VALUES ('University', '1000', '1000', '1000', '1000', '500', '500', '500', '500'), ('Sage Hill', '0', '0', '0', '0', '0', '0', '0', '0');
UNLOCK TABLES;



-- Create the shipment_facility table

DROP TABLE IF EXISTS `shipment_facility`;

CREATE TABLE `shipment_facility` (
  `FacilityName` varchar(255) NOT NULL,
  `Location` varchar(255) NOT NULL,
  PRIMARY KEY (`FacilityName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dump data into the shipment_facility table
LOCK TABLES `shipment_facility` WRITE;
INSERT INTO `shipment_facility` (`FacilityName`, `Location`) VALUES ('EasyShip', 'Calgary'), ('NotEasyShip', 'Edmonton');
UNLOCK TABLES;



-- Create the ngo table

DROP TABLE IF EXISTS `ngo`;

CREATE TABLE `ngo` (
  `NGOName` varchar(255) NOT NULL,
  `AmountRaised` decimal(15,2) NOT NULL DEFAULT '0.00',
  `Username` varchar(255) NOT NULL,
  PRIMARY KEY (`NGOName`),
  KEY `fk_AdminNGO` (`Username`),
  CONSTRAINT `fk_AdminNGO` FOREIGN KEY (`Username`) REFERENCES `administrator` (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dump data into the ngo table
LOCK TABLES `ngo` WRITE;
INSERT INTO `ngo` VALUES ('Doctors Without Borders', '1111.11', 'admin'), ('Immune Deficiency Foundation', '9999.99','admin');
UNLOCK TABLES;



-- Create the donates table

DROP TABLE IF EXISTS `donates`;

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

DROP TABLE IF EXISTS `recyclable`;

CREATE TABLE `recyclable` (
  `RecyclableName` varchar(255) NOT NULL,
  `MaterialType` varchar(255) NOT NULL,
  `MaterialRate` decimal(15,2) NOT NULL,
  `Username` varchar(255) NOT NULL,
  PRIMARY KEY (`RecyclableName`),
  KEY `fk_AdminRecyclable` (`Username`),
  CONSTRAINT `fk_AdminRecyclable` FOREIGN KEY (`Username`) REFERENCES `administrator` (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dump data into the recyclable table
LOCK TABLES `recyclable` WRITE;
INSERT INTO `recyclable` (`RecyclableName`, `MaterialType`, `MaterialRate`, `Username`) VALUES ('Beer bottles', 'Glass', '0.75', 'janedoe');
INSERT INTO `recyclable` (`RecyclableName`, `MaterialType`, `MaterialRate`, `Username`) VALUES ('Aluminium soda cans', 'Metal', '0.40', 'admin');
INSERT INTO `recyclable` (`RecyclableName`, `MaterialType`, `MaterialRate`, `Username`) VALUES ('2L Milk cartons', 'Paper', '0.25', 'admin');
INSERT INTO `recyclable` (`RecyclableName`, `MaterialType`, `MaterialRate`, `Username`) VALUES ('4L Milk jugs', 'Plastic', '0.45', 'janedoe');
INSERT INTO `recyclable` (`RecyclableName`, `MaterialType`, `MaterialRate`, `Username`) VALUES ('Wine bottles', 'Glass', '1.15', 'admin');
INSERT INTO `recyclable` (`RecyclableName`, `MaterialType`, `MaterialRate`, `Username`) VALUES ('Plastic water bottles', 'Plastic', '0.20', 'admin');
UNLOCK TABLES;


-- Create the accepts table

DROP TABLE IF EXISTS `accepts`;

CREATE TABLE `accepts` (
  `BranchName` varchar(255) NOT NULL,
  `RecyclableName` varchar(255) NOT NULL,
  PRIMARY KEY (`BranchName`,`RecyclableName`),
  KEY `fk_AcceptedRecyclable_idx` (`RecyclableName`),
  CONSTRAINT `fk_AcceptedRecyclable` FOREIGN KEY (`RecyclableName`) REFERENCES `recyclable` (`RecyclableName`),
  CONSTRAINT `fk_BranchAccepts` FOREIGN KEY (`BranchName`) REFERENCES `inventory` (`BranchName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dump data into the accepts table
LOCK TABLES `accepts` WRITE;
INSERT INTO `accepts` (`BranchName`,`RecyclableName`) VALUES ('Sage Hill','2L Milk cartons');
INSERT INTO `accepts` (`BranchName`,`RecyclableName`) VALUES ('Sage Hill', '4L Milk jugs');
INSERT INTO `accepts` (`BranchName`,`RecyclableName`) VALUES ('Sage Hill', 'Aluminium soda cans');
INSERT INTO `accepts` (`BranchName`,`RecyclableName`) VALUES ('Sage Hill', 'Beer bottles');
INSERT INTO `accepts` (`BranchName`,`RecyclableName`) VALUES ('Sage Hill', 'Plastic water bottles');
INSERT INTO `accepts` (`BranchName`,`RecyclableName`) VALUES ('University','2L Milk cartons');
INSERT INTO `accepts` (`BranchName`,`RecyclableName`) VALUES ('University', '4L Milk jugs');
INSERT INTO `accepts` (`BranchName`,`RecyclableName`) VALUES ('University', 'Aluminium soda cans');
INSERT INTO `accepts` (`BranchName`,`RecyclableName`) VALUES ('University', 'Beer bottles');
INSERT INTO `accepts` (`BranchName`,`RecyclableName`) VALUES ('University', 'Plastic water bottles');
INSERT INTO `accepts` (`BranchName`,`RecyclableName`) VALUES ('University', 'Wine bottles');
UNLOCK TABLES;


-- Create the employee_workstation table

DROP TABLE IF EXISTS `employee_workstation`;

CREATE TABLE `employee_workstation` (
  `BranchName` varchar(255) NOT NULL,
  `WorkstationID` int NOT NULL,
  `Username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`BranchName`,`WorkstationID`),
  CONSTRAINT `fk_BranchWorkstation` FOREIGN KEY (`BranchName`) REFERENCES `recycling_depot` (`BranchName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;




-- Create the transaction table

DROP TABLE IF EXISTS `transaction`;

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

DROP TABLE IF EXISTS `ship`;

CREATE TABLE `ship` (
  `FacilityName` varchar(255) NOT NULL,
  `BranchName` varchar(255) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `ShipmentDate` datetime NOT NULL,
  PRIMARY KEY (`FacilityName`,`BranchName`,`Username`),
  KEY `fk_InventoryShip_idx` (`BranchName`),
  KEY `fk_AdminShip` (`Username`),
  CONSTRAINT `fk_AdminShip` FOREIGN KEY (`Username`) REFERENCES `administrator` (`Username`),
  CONSTRAINT `fk_FacilityShip` FOREIGN KEY (`FacilityName`) REFERENCES `shipment_facility` (`FacilityName`),
  CONSTRAINT `fk_InventoryShip` FOREIGN KEY (`BranchName`) REFERENCES `inventory` (`BranchName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;





SET foreign_key_checks = 1;

