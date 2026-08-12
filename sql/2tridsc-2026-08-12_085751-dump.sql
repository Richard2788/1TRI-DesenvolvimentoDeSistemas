-- MySQL dump 10.13  Distrib 8.0.34, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: 2tridsc
-- ------------------------------------------------------
-- Server version	8.0.34-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `cpf` char(14) NOT NULL,
  `email` varchar(50) NOT NULL,
  `celular` char(14) NOT NULL,
  `senha` varchar(512) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cpf` (`cpf`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` (`id`, `nome`, `cpf`, `email`, `celular`, `senha`) VALUES (1,'Richard','148.211.069-57','bellusci.richard@escola.pr.gov.br','(42)99931-8655','sábadoanimadodograu123'),(2,'Mariana Silva','452.189.302-12','mariana.silva@escola.pr.gov.br','(41)99876-5432','senhaForte123!'),(3,'Lucas Almeida','289.411.765-89','lucas.almeida@escola.pr.gov.br','(43)99123-4567','Lucas2026_x'),(4,'Beatriz Santos','712.304.598-44','beatriz.santos@escola.pr.gov.br','(42)98877-6655','Bia@Secure99'),(5,'Gabriel Costa','103.542.899-21','gabriel.costa@escola.pr.gov.br','(44)99765-1122','gabs_pass_01'),(6,'Amanda Oliveira','365.812.407-33','amanda.oliveira@escola.pr.gov.br','(45)99144-8899','Mandy#2026!'),(7,'Thiago Pereira','824.195.630-76','thiago.pereira@escola.pr.gov.br','(41)98433-2211','thiago_p_998'),(8,'Larissa Rodrigues','501.277.643-05','larissa.rodrigues@escola.pr.gov.br','(46)99911-5544','Lari@Pr2026'),(9,'Felipe Martins','639.408.115-92','felipe.martins@escola.pr.gov.br','(42)99822-3344','PipeMartins#1'),(10,'Camila Souza','198.533.720-68','camila.souza@escola.pr.gov.br','(43)99155-7788','CamiSouza_26'),(11,'Rodrigo Lima','942.610.357-11','rodrigo.lima@escola.pr.gov.br','(44)98844-3322','Rod_Lima_!@#'),(12,'Juliana Ribeiro','257.894.130-80','juliana.ribeiro@escola.pr.gov.br','(45)99711-6677','JuRibeiro$2026');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database '2tridsc'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-12  8:57:52
