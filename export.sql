-- Adminer 4.8.1 MySQL 8.3.0 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `collection`;
CREATE TABLE `collection` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `number_tomes` int NOT NULL,
  `author` text NOT NULL,
  `price` int NOT NULL,
  `rating` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `collection` (`id`, `name`, `number_tomes`, `author`, `price`, `rating`) VALUES
(2,	'something',	2,	'moi',	10,	3),
(3,	'another one',	52,	'not me',	55,	4),
(4,	'idk',	52,	'nasas',	33,	1);

-- 2024-03-21 12:20:22