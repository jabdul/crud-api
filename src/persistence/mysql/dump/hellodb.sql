-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema hellodb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema hellodb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `hellodb` DEFAULT CHARACTER SET utf8 ;
USE `hellodb` ;

-- -----------------------------------------------------
-- Table `hellodb`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hellodb`.`users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `uuid` VARCHAR(128) NOT NULL,
  `firstname` VARCHAR(64) NOT NULL,
  `lastname` VARCHAR(64) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
