-- Create the customer table
DROP TABLE IF EXISTS `customer`;

CREATE TABLE `customer` (
  `UserID` INT NOT NULL AUTO_INCREMENT,
  `Username` VARCHAR(255) NOT NULL,
  `FName` VARCHAR(255) NOT NULL,
  `LName` VARCHAR(255) NOT NULL,
  `Password` VARCHAR(255) NOT NULL,
  `AccountBal` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
  `DonationAmt` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
  `AddressLine` VARCHAR(255) NULL,
  `City` VARCHAR(255) NOT NULL,
  `Province` VARCHAR(2) NOT NULL,
  `PostalCode` VARCHAR(255) NULL,
  PRIMARY KEY (`UserID`)
  );
  
  -- Dump data into customer table
  LOCK TABLES `customer` WRITE;
  INSERT INTO `customer` VALUES (1, "anthonyjdam", "Anthony", "Dam", "hello", 1000.00, 0.00, "123 Anthony St NW", "Calgary", "AB", "T1T1T1"), (2, "jRaimuu", "Liam", "Sarjeant", "eco", 6969.00, 0.00, "123 Liam St NW", "Calgary", "AB", "A1B2C3"), (3, "mairakhan419", "Maira", "Khan", "archive", 696969.00, 0.00, "123 Maira St NW", "Calgary", "AB", "D4E5F6");
  UNLOCK TABLES;