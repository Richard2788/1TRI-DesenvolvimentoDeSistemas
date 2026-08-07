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
  UNIQUE KEY `nome` (`nome`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` (`id`, `nome`, `cpf`, `email`, `celular`, `senha`) VALUES (1,'Richard','148.211.069-57','bellusci.richard@escola.pr.gov.br','(42)99931-8654','sábadoanimadodograu123'),(2,'Ana Silva','123.456.789-01','ana.silva@email.com','(11)98765-4321','6a992d5529f459a44fee58c733255e86a4bc2251a3782b604e6c0f865f013444'),(3,'Bruno Santos','234.567.890-12','bruno.santos@email.com','(21)98765-4321','8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92'),(4,'Carlos Oliveira','345.678.901-23','carlos.oliveira@email.com','(31)98765-4321','4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2'),(5,'Daniela Souza','456.789.012-34','daniela.souza@email.com','(41)98765-4321','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'),(6,'Eduardo Lima','567.890.123-45','eduardo.lima@email.com','(51)98765-4321','0131366370891d211def25b09705de7f13437500d112d8a5712c77d4410e5270'),(7,'Fernanda Costa','678.890.123-56','fernanda.costa@email.com','(61)98765-4321','c775e7b757ede630cd0aa1113bd102661ab38829ca52a6422ab782862f268646'),(8,'Gabriel Almeida','789.012.345-67','gabriel.almeida@email.com','(71)98765-4321','1995245c3b0183114400e9ec49b1ff148202534570ff2272e9d249d32d677a28'),(9,'Helena Ribeiro','890.123.456-78','helena.ribeiro@email.com','(81)98765-4321','81b75345167f6a01490289f6655c6543df5e975c5e888636fb4890b05b8cf4f4'),(10,'Igor Carvalho','901.234.567-89','igor.carvalho@email.com','(91)98765-4321','6c1a8e1e7f09c629f12d5b6ee0895393d25f771032dfa7c8ba360a0f443b74f3'),(11,'Julia Martins','012.345.678-90','julia.martins@email.com','(19)98765-4321','4c2598379ba5f111f67f2b1d318e8df5e8e8b628ec2ec45c1106fc32dfc11b81');
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

-- Dump completed on 2026-08-07 11:24:34
