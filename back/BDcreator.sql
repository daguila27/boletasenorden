-- MySQL Script generated by MySQL Workbench
-- Sat Jun 20 19:44:14 2020
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mydb` ;

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;

USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Usuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Usuario` ;


CREATE TABLE IF NOT EXISTS `mydb`.`Usuario` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NULL,
  `nombre` VARCHAR(45) NULL,
  `apellido` VARCHAR(45) NULL,
  `pass` VARCHAR(45) NULL,
  `disable` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`idUsuario`))
ENGINE = InnoDB;



-- -----------------------------------------------------
-- Table `mydb`.`Empresa`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Empresa` ;


CREATE TABLE IF NOT EXISTS `mydb`.`Empresa` (
  `idEmpresa` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  `fecha_registro` VARCHAR(45) NULL,
  `Empresacol` VARCHAR(45) NULL,
  `moneda` VARCHAR(5) NULL,
  `logo` VARCHAR(200) NULL,
  `disabled` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`idEmpresa`))
ENGINE = InnoDB;



-- -----------------------------------------------------
-- Table `mydb`.`Categoria`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Categoria` ;


CREATE TABLE IF NOT EXISTS `mydb`.`Categoria` (
  `idCategoria` INT NOT NULL AUTO_INCREMENT,
  `idEmpresa` INT NOT NULL,
  `nombre` VARCHAR(45) NULL,
  `disabled` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`idCategoria`),
  CONSTRAINT `idforeing_empresa`
    FOREIGN KEY (`idEmpresa`)
    REFERENCES `mydb`.`Empresa` (`idEmpresa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


CREATE INDEX `idforeing_empresa_idx` ON `mydb`.`Categoria` (`idEmpresa` ASC) ;



-- -----------------------------------------------------
-- Table `mydb`.`Gasto`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Gasto` ;


CREATE TABLE IF NOT EXISTS `mydb`.`Gasto` (
  `idGasto` INT NOT NULL AUTO_INCREMENT,
  `idUsuario` INT NULL,
  `idCategoria` INT NULL,
  `disabled` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`idGasto`),
  CONSTRAINT `idforeing_usuario`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `mydb`.`Usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `idforeing_categoria`
    FOREIGN KEY (`idCategoria`)
    REFERENCES `mydb`.`Categoria` (`idCategoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


CREATE INDEX `idforeing_usuario_idx` ON `mydb`.`Gasto` (`idUsuario` ASC) ;


CREATE INDEX `idforeing_categoria_idx` ON `mydb`.`Gasto` (`idCategoria` ASC) ;



-- -----------------------------------------------------
-- Table `mydb`.`Rol`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Rol` ;


CREATE TABLE IF NOT EXISTS `mydb`.`Rol` (
  `idRol` INT NOT NULL AUTO_INCREMENT,
  `idEmpresa` INT NOT NULL,
  `nombre` VARCHAR(45) NULL,
  `disabled` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`idRol`),
  CONSTRAINT `idforeing_empresarol`
    FOREIGN KEY (`idEmpresa`)
    REFERENCES `mydb`.`Empresa` (`idEmpresa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


CREATE INDEX `idforeing_empresa_idx` ON `mydb`.`Rol` (`idEmpresa` ASC);



-- -----------------------------------------------------
-- Table `mydb`.`UsuarioRol`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`UsuarioRol` ;


CREATE TABLE IF NOT EXISTS `mydb`.`UsuarioRol` (
  `idUsuario` INT NOT NULL,
  `idRol` INT NOT NULL,
  `disabled` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`idUsuario`, `idRol`),
  CONSTRAINT `idforeing_usuariorol`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `mydb`.`Usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `idforeing_rolusuario`
    FOREIGN KEY (`idRol`)
    REFERENCES `mydb`.`Rol` (`idRol`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


CREATE INDEX `idforeing_rol_idx` ON `mydb`.`UsuarioRol` (`idRol` ASC) ;



-- -----------------------------------------------------
-- Table `mydb`.`CategoriaPermitida`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`CategoriaPermitida` ;


CREATE TABLE IF NOT EXISTS `mydb`.`CategoriaPermitida` (
  `idCategoria` INT NOT NULL,
  `idRol` INT NOT NULL,
  `disabled` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`idCategoria`, `idRol`),
  CONSTRAINT `idforeing_categoriarol`
    FOREIGN KEY (`idCategoria`)
    REFERENCES `mydb`.`Categoria` (`idCategoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `idforeing_rolcategoria`
    FOREIGN KEY (`idRol`)
    REFERENCES `mydb`.`Rol` (`idRol`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


CREATE INDEX `idforeing_rol_idx` ON `mydb`.`CategoriaPermitida` (`idRol` ASC) ;



-- -----------------------------------------------------
-- Table `mydb`.`DetalleGasto`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`DetalleGasto` ;


CREATE TABLE IF NOT EXISTS `mydb`.`DetalleGasto` (
  `idDetalleGasto` INT NOT NULL,
  `idGasto` INT NULL,
  `detalle` VARCHAR(200) NOT NULL,
  `valor` INT NOT NULL DEFAULT 0,
  `imagen` VARCHAR(100) NOT NULL,
  `fecha` DATETIME NOT NULL,
  `disabled` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`idDetalleGasto`),
  CONSTRAINT `idforeing_detallegasto`
    FOREIGN KEY (`idGasto`)
    REFERENCES `mydb`.`Gasto` (`idGasto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


CREATE INDEX `idforeing_gasto_idx` ON `mydb`.`DetalleGasto` (`idGasto` ASC) ;



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;