DROP DATABASE IF EXISTS informationEMDB;

CREATE DATABASE informationEMDB;

USE informationEMDB;

CREATE TABLE department (
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(45) NULL,
PRIMARY KEY(id)
);

CREATE TABLE role (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(45) NOT NULL,
salary DECIMAL(10,3) NOT NULL,
department_id INT NULL,
PRIMARY KEY (id)
);

CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(45) NULL,
last_name VARCHAR(30)  NULL,
role_id INT NOT NULL,
manager_id INT,
PRIMARY KEY (id)
);