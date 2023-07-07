

SET foreign_key_checks = 0;
-- Create the customer table
DROP TABLE IF EXISTS `customer`;

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


DROP TABLE IF EXISTS `employee`;


 CREATE TABLE `employee` (
  `Username` varchar(255) NOT NULL,
  `LName` varchar(255) NOT NULL,
  `FName` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `BranchName` varchar(255) NOT NULL,

  PRIMARY KEY (`Username`),
  CONSTRAINT `fk_EmployeeBranch` FOREIGN KEY (`BranchName`) REFERENCES `recycling_depot` (`BranchName`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

  -- Dump data into employee table
  LOCK TABLES `employee` WRITE;
  INSERT INTO `employee` VALUES 
  ("mairakhan419", "Khan", "Mirah", "cheeto", "Sage Hill"), 
  ("anthonyjdam", "Dam", "Anthony", "password", "University"), 
  ("jRaimuu", "Sarjeant", "Liam", "someReallyLongPassword", "Sage Hill"), 
  ("Casper", "Phan", "Tom", "54321", "University"), 
  ("Ghost", "Phantano", "Tommy", "12345", "University");
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
  `TotalConcurrentMaterials` int GENERATED ALWAYS AS ((((`ConcurrentPaper` + `ConcurrentGlass`) + `ConcurrentMetal`) + `ConcurrentPlastic`)) VIRTUAL,
  PRIMARY KEY (`BranchName`),
  CONSTRAINT `fk_InventoryDepot` FOREIGN KEY (`BranchName`) REFERENCES `recycling_depot` (`BranchName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dump data into the inventory table
LOCK TABLES `inventory` WRITE;
INSERT INTO `inventory` (`BranchName`, `LifetimePaper`, `LifetimeGlass`, `LifetimeMetal`, `LifetimePlastic`, `ConcurrentPaper`, `ConcurrentGlass`, `ConcurrentMetal`, `ConcurrentPlastic`) VALUES ('University', '1000', '1000', '1000', '1000', '280', '430', '540', '292'), ('Sage Hill', '0', '0', '0', '0', '0', '0', '0', '0');
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
  `DonationDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Username`,`NGOName`,`DonationDate`),
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
INSERT INTO `recyclable` (`RecyclableName`, `MaterialType`, `MaterialRate`, `Username`) VALUES ('Aluminium soda cans', 'Metal', '0.30', 'admin');
INSERT INTO `recyclable` (`RecyclableName`, `MaterialType`, `MaterialRate`, `Username`) VALUES ('2L Milk cartons', 'Paper', '0.25', 'admin');
INSERT INTO `recyclable` (`RecyclableName`, `MaterialType`, `MaterialRate`, `Username`) VALUES ('4L Milk jugs', 'Plastic', '0.20', 'janedoe');
INSERT INTO `recyclable` (`RecyclableName`, `MaterialType`, `MaterialRate`, `Username`) VALUES ('Wine bottles', 'Glass', '0.75', 'admin');
INSERT INTO `recyclable` (`RecyclableName`, `MaterialType`, `MaterialRate`, `Username`) VALUES ('Plastic water bottles', 'Plastic', '0.20', 'admin');
INSERT INTO `eco_archive`.`recyclable` (`RecyclableName`, `MaterialType`, `MaterialRate`, `Username`) VALUES ('PLACEHOLDER', 'PLACEHOLDER', '0', 'admin');
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
  `Username` varchar(255) NOT NULL,
  PRIMARY KEY (`BranchName`,`Username`),
  KEY `fk_BranchName_idx` (`BranchName`),
  KEY `fk_Username_idx` (`Username`),  
  CONSTRAINT `fk_BranchWorkstation` FOREIGN KEY (`BranchName`) REFERENCES `recycling_depot` (`BranchName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Create the Order table
DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
  `OrderNumber` varchar(25) NOT NULL,
  PRIMARY KEY (`OrderNumber`),
  UNIQUE KEY `OrderNumber_UNIQUE` (`OrderNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `orders` WRITE;
INSERT INTO `orders` (`OrderNumber`) 
VALUES 
(LPAD(1, 8, '0')),
(LPAD(3, 8, '0')),
(LPAD(4, 8, '0')),
(LPAD(2, 8, '0')),
(LPAD(5, 8, '0')),
(LPAD(6, 8, '0')),
(LPAD(7, 8, '0')),
(LPAD(8, 8, '0')),
(LPAD(9, 8, '0')),
(LPAD(10, 8, '0')),
(LPAD(11, 8, '0')),
(LPAD(12, 8, '0')),
(LPAD(13, 8, '0')),
(LPAD(14, 8, '0')),
(LPAD(15, 8, '0')),
(LPAD(16, 8, '0')),
(LPAD(17, 8, '0')),
(LPAD(18, 8, '0')),
(LPAD(19, 8, '0')),
(LPAD(20, 8, '0')),
(LPAD(21, 8, '0')),
(LPAD(22, 8, '0')),
(LPAD(23, 8, '0')),
(LPAD(24, 8, '0')),
(LPAD(25, 8, '0')),
(LPAD(26, 8, '0')),
(LPAD(27, 8, '0')),
(LPAD(28, 8, '0')),
(LPAD(29, 8, '0')),
(LPAD(30, 8, '0'));
UNLOCK TABLES;


-- Create the transaction table

DROP TABLE IF EXISTS `transaction`;

CREATE TABLE `transaction` (
  `Username` varchar(255) NOT NULL,
  `BranchName` varchar(255) NOT NULL,
  `RecyclableName` varchar(255) NOT NULL,
  `AmountOfMaterialsGiven` int DEFAULT NULL,
  `DateTime` datetime NOT NULL,
  `ServiceType` varchar(255) NOT NULL,
  `AmountEarned` decimal(15,2) DEFAULT NULL,
  `Status` varchar(255) DEFAULT 'PENDING', 
  PRIMARY KEY (`Username`,`BranchName`,`RecyclableName`,`DateTime`),
  KEY `fk_RecyclableTransaction_idx` (`RecyclableName`),
  KEY `fk_BranchTransaction_idx` (`BranchName`),
  CONSTRAINT `fk_BranchTransaction` FOREIGN KEY (`BranchName`) REFERENCES `recycling_depot` (`BranchName`),
  CONSTRAINT `fk_CustomerTransaction` FOREIGN KEY (`Username`) REFERENCES `customer` (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `transaction` WRITE;
INSERT INTO `transaction` (`Username`, `BranchName`, `RecyclableName`, `AmountOfMaterialsGiven`, `DateTime`, `ServiceType`, `AmountEarned`, `Status`) 
VALUES 
  ('jRaimuu', 'University', 'Beer bottles', '50', '2023-07-01 13:00:00', 'pickup', '30.00', 'COMPLETE'),
  ('anthonyjdam', 'University', 'Beer bottles', '70', '2023-07-01 09:00:00', 'pickup', '25.00', 'COMPLETE'),
  ('mairakhan419', 'University', 'Beer bottles', '90', '2023-07-02 16:00:00', 'pickup', '15.00', 'COMPLETE'),
  ('anthonyjdam', 'University', 'Beer bottles', '100', '2023-07-03 14:00:00', 'pickup', '20.00', 'COMPLETE'),
  ('jRaimuu', 'University', 'Beer bottles', '120', '2023-07-04 11:00:00', 'pickup', '35.00', 'COMPLETE'),
  ('anthonyjdam', 'University', 'Aluminium soda cans', '60', '2023-07-04 12:00:00', 'pickup', '40.00', 'COMPLETE'),
  ('anthonyjdam', 'University', 'Aluminium soda cans', '80', '2023-07-05 10:00:00', 'pickup', '12.50', 'COMPLETE'),
  ('jRaimuu', 'University', 'Aluminium soda cans', '140', '2023-07-05 15:00:00', 'pickup', '30.00', 'COMPLETE'),
  ('mairakhan419', 'University', 'Aluminium soda cans', '110', '2023-07-06 13:30:00', 'pickup', '37.50', 'COMPLETE'),
  ('jRaimuu', 'University', 'Aluminium soda cans', '100', '2023-07-07 17:00:00', 'pickup', '20.00', 'COMPLETE'),
  ('anthonyjdam', 'University', 'Aluminium soda cans', '50', '2023-07-07 10:30:00', 'pickup', '25.00', 'COMPLETE'),
  ('jRaimuu', 'University', '2L Milk cartons', '120', '2023-07-08 11:30:00', 'pickup', '30.00', 'COMPLETE'),
  ('anthonyjdam', 'University', '2L Milk cartons', '70', '2023-07-08 14:30:00', 'pickup', '15.00', 'COMPLETE'),
  ('anthonyjdam', 'University', '2L Milk cartons', '80', '2023-07-09 16:30:00', 'pickup', '17.50', 'COMPLETE'),
  ('mairakhan419', 'Sage Hill', '2L Milk cartons', '130', '2023-07-09 12:30:00', 'pickup', '40.00', 'COMPLETE'),
  ('jRaimuu', 'Sage Hill', 'Plastic bottles', '90', '2023-07-10 12:30:00', 'pickup', '20.00', 'COMPLETE'),
  ('anthonyjdam', 'Sage Hill', 'Plastic bottles', '120', '2023-07-11 12:30:00', 'pickup', '80.00', 'COMPLETE'),
  ('anthonyjdam', 'University', 'Plastic bottles', '90', '2023-07-10 13:30:00', 'pickup', '12.50', 'COMPLETE'),
  ('mairakhan419', 'University', 'Plastic bottles', '100', '2023-07-11 15:30:00', 'pickup', '30.00', 'COMPLETE');
  -- ('mairakhan419', 'University', 'Beer bottles', '5600', '2023-07-12 15:30:00', 'pickup', '560.00', 'COMPLETE'),
  -- ('mairakhan419', 'University', 'Plastic bottles', '4900', '2023-07-13 15:30:00', 'pickup', '490.00', 'COMPLETE'),
  -- ('mairakhan419', 'University', 'Aluminium soda cans', '5600', '2023-07-14 15:30:00', 'pickup', '560.00', 'COMPLETE'),
  -- ('mairakhan419', 'University', '2L Milk cartons', '4850', '2023-07-15 15:30:00', 'pickup', '480.50', 'COMPLETE');


-- INSERT INTO `transaction` (`Username`, `BranchName`, `RecyclableName`, `AmountOfMaterialsGiven`, `DateTime`, `ServiceType`, `AmountEarned`, `Status`) VALUES ('jRaimuu', 'University', 'Beer bottles', '20', '2023-06-30 13:00:00', 'pickup', '3.00', 'COMPLETE');
-- INSERT INTO `transaction` (`Username`, `BranchName`, `RecyclableName`, `AmountOfMaterialsGiven`, `DateTime`, `ServiceType`, `AmountEarned`, `Status`) VALUES ('jRaimuu', 'University', 'Beer bottles', '50', '2023-06-29 13:00:00', 'pickup', '37.50', 'COMPLETE');
-- INSERT INTO `transaction` (`Username`, `BranchName`, `RecyclableName`, `AmountOfMaterialsGiven`, `DateTime`, `ServiceType`, `AmountEarned`, `Status`) VALUES ('anthony', 'University', 'Beer bottles', '50', '2023-06-30 13:00:00', 'pickup', '37.50', 'COMPLETE');

-- CREATE TABLE `ship` (
--   `FacilityName` varchar(255) NOT NULL,
--   `BranchName` varchar(255) NOT NULL,
--   `Username` varchar(255) NOT NULL,
--   `ShipmentDate` datetime NOT NULL,
--   PRIMARY KEY (`FacilityName`,`BranchName`,`Username`),
--   KEY `fk_InventoryShip_idx` (`BranchName`),
--   KEY `fk_AdminShip` (`Username`),
--   CONSTRAINT `fk_AdminShip` FOREIGN KEY (`Username`) REFERENCES `administrator` (`Username`),
--   CONSTRAINT `fk_FacilityShip` FOREIGN KEY (`FacilityName`) REFERENCES `shipment_facility` (`FacilityName`),
--   CONSTRAINT `fk_InventoryShip` FOREIGN KEY (`BranchName`) REFERENCES `inventory` (`BranchName`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

UNLOCK TABLES;

-- Create the ship table

DROP TABLE IF EXISTS `ship`;

CREATE TABLE `ship` (
  `OrderNum` varchar(25) NOT NULL,
  `FacilityName` varchar(100) NOT NULL,
  `BranchName` varchar(255) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `ShipmentDate` date NOT NULL,
  `TotalConcurrentMaterials` int NOT NULL,
  PRIMARY KEY (`FacilityName`,`BranchName`,`OrderNum`,`Username`),
  UNIQUE KEY `OrderNum_UNIQUE` (`OrderNum`),
  KEY `fk_InventoryShip_idx` (`BranchName`),
  KEY `fk_AdminShip` (`Username`),
  KEY `sk_OrderShip_idx` (`OrderNum`),
  CONSTRAINT `fk_FacilityShip` FOREIGN KEY (`FacilityName`) REFERENCES `shipment_facility` (`FacilityName`),
  CONSTRAINT `fk_InventoryShip` FOREIGN KEY (`BranchName`) REFERENCES `inventory` (`BranchName`),
  CONSTRAINT `fk_OrderShip` FOREIGN KEY (`OrderNum`) REFERENCES `orders` (`OrderNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `ship` WRITE;
INSERT INTO ship (OrderNum, FacilityName, BranchName, Username, ShipmentDate, TotalConcurrentMaterials)
VALUES 
  (LPAD('3', 8, '0'), 'EasyShip', 'University', 'admin', '2023-07-02', '2867'),
  (LPAD('4', 8, '0'), 'EasyShip', 'University', 'admin', '2023-06-15', '4076'),
  (LPAD('5', 8, '0'), 'EasyShip', 'University', 'admin', '2023-06-01', '2355'),
  (LPAD('6', 8, '0'), 'EasyShip', 'University', 'admin', '2023-08-19', '1687'),
  (LPAD('7', 8, '0'), 'EasyShip', 'University', 'admin', '2023-05-02', '3265'),
  (LPAD('8', 8, '0'), 'EasyShip', 'University', 'admin', '2023-04-08', '4589'),
  (LPAD('9', 8, '0'), 'EasyShip', 'University', 'admin', '2023-04-09', '1422'),
  (LPAD('10', 8, '0'), 'EasyShip', 'University', 'admin', '2023-04-10', '2134'),
  (LPAD('11', 8, '0'), 'EasyShip', 'University', 'admin', '2023-04-11', '3987'),
  (LPAD('12', 8, '0'), 'EasyShip', 'University', 'admin', '2023-04-12', '2598'),
  (LPAD('13', 8, '0'), 'EasyShip', 'University', 'admin', '2023-04-13', '3276'),
  (LPAD('14', 8, '0'), 'EasyShip', 'University', 'admin', '2023-04-14', '4563'),
  (LPAD('15', 8, '0'), 'EasyShip', 'University', 'admin', '2023-04-15', '2890'),
  (LPAD('16', 8, '0'), 'EasyShip', 'University', 'admin', '2023-04-16', '1765'),
  (LPAD('17', 8, '0'), 'EasyShip', 'University', 'admin', '2023-04-17', '3941'),
  (LPAD('18', 8, '0'), 'EasyShip', 'University', 'admin', '2023-04-18', '2754'),
  (LPAD('19', 8, '0'), 'EasyShip', 'University', 'admin', '2023-04-19', '3098'),
  (LPAD('20', 8, '0'), 'EasyShip', 'University', 'admin', '2023-04-20', '4219'),
  (LPAD('21', 8, '0'), 'EasyShip', 'University', 'admin', '2023-04-21', '3385'),
  (LPAD('22', 8, '0'), 'EasyShip', 'University', 'admin', '2023-04-22', '3975'),
  (LPAD('23', 8, '0'), 'EasyShip', 'University', 'admin', '2023-04-23', '2234'),
  (LPAD('24', 8, '0'), 'EasyShip', 'University', 'admin', '2023-04-24', '3428'),
  (LPAD('25', 8, '0'), 'EasyShip', 'University', 'admin', '2023-04-25', '4087'),
  (LPAD('26', 8, '0'), 'EasyShip', 'University', 'admin', '2023-04-26', '2763'),
  (LPAD('27', 8, '0'), 'EasyShip', 'University', 'admin', '2023-04-27', '3215'),
  (LPAD('28', 8, '0'), 'EasyShip', 'University', 'admin', '2023-04-28', '3809'),
  (LPAD('29', 8, '0'), 'EasyShip', 'University', 'admin', '2023-04-29', '1948'),
  (LPAD('30', 8, '0'), 'EasyShip', 'University', 'admin', '2023-04-30', '3021');


UNLOCK TABLES;






SET foreign_key_checks = 1;
