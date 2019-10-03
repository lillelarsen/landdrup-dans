-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Vært: 127.0.0.1
-- Genereringstid: 21. 12 2018 kl. 10:59:21
-- Serverversion: 5.6.24
-- PHP-version: 5.6.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `landdrupdb`
--

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `age_group`
--

CREATE TABLE IF NOT EXISTS `age_group` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `age_group`
--

INSERT INTO `age_group` (`id`, `name`, `description`) VALUES
(1, '3-5 år', 'hep hey'),
(2, '6-8 år', 'Hej med jer'),
(3, '9-14 år', 'Hej med jer'),
(4, '15-18 år', 'Hej med jer'),
(5, 'voksne', 'Hej med jer');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `class`
--

CREATE TABLE IF NOT EXISTS `class` (
  `id` int(11) NOT NULL,
  `price` decimal(6,2) NOT NULL,
  `fk_styles` int(11) NOT NULL,
  `fk_age_group` int(11) NOT NULL,
  `fk_levels` int(11) NOT NULL,
  `fk_instructor` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `class`
--

INSERT INTO `class` (`id`, `price`, `fk_styles`, `fk_age_group`, `fk_levels`, `fk_instructor`) VALUES
(1, '3000.00', 3, 1, 2, 3),
(2, '1200.00', 1, 4, 1, 1);

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `class_user`
--

CREATE TABLE IF NOT EXISTS `class_user` (
  `id` int(11) NOT NULL,
  `class_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `class_user`
--

INSERT INTO `class_user` (`id`, `class_id`, `user_id`) VALUES
(1, 2, 1),
(9, 2, 1),
(10, 2, 1),
(11, 2, 1),
(12, 2, 1),
(13, 2, 1),
(15, 7, 1),
(16, 2, 8),
(17, 7, 8),
(19, 1, 24);

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `frontpage_content`
--

CREATE TABLE IF NOT EXISTS `frontpage_content` (
  `id` int(11) NOT NULL,
  `hero_image` varchar(28) NOT NULL,
  `text_1` text NOT NULL,
  `text_2` text NOT NULL,
  `text_3` text NOT NULL,
  `header_1` varchar(45) NOT NULL,
  `header_2` varchar(45) NOT NULL,
  `header_3` varchar(45) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `frontpage_content`
--

INSERT INTO `frontpage_content` (`id`, `hero_image`, `text_1`, `text_2`, `text_3`, `header_1`, `header_2`, `header_3`) VALUES
(1, 'dance.jpg', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic atque repellat minima. Hic neque, nulla beatae sint quae atque quaerat ipsam nostrum consectetur facere optio dignissimos tempore animi fugiat unde!', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic atque repellat minima. Hic neque, nulla beatae sint quae atque quaerat ipsam nostrum consectetur facere optio dignissimos tempore animi fugiat unde!', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic atque repellat minima. Hic neque, nulla beatae sint quae atque quaerat ipsam nostrum consectetur facere optio dignissimos tempore animi fugiat unde!', 'Den første kolonne på forside', 'Den anden kolonne på forside', 'Den tredjekolonne på forside');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `instructors`
--

CREATE TABLE IF NOT EXISTS `instructors` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `picture` varchar(15) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `instructors`
--

INSERT INTO `instructors` (`id`, `name`, `description`, `picture`) VALUES
(1, 'Lisa', 'Lisa er en tideligere DM mester i Latin', 'lisa.jpeg'),
(2, 'Lars', 'Lars er en af vores bedste Disco dansere!', 'lars.jpg'),
(3, 'Steffen', 'Steffen er en super øvet hip - hop danser', 'steffen.jpg'),
(4, 'Henrik', 'Henrik er har undervist breakdance i 8 år og er i topform', 'henrik.jpg'),
(5, 'Niels', 'Niels har været Europa mesterskaberne i Disco', 'niels.jpg'),
(6, 'Arne', 'Arne har 10 års erfaring i undervisning af funk! Du er i trykke hænder', 'arne.jpg'),
(7, 'Simon', 'Simon er en af vores yngre undervisere, men hvad han mangler i erfaring har han i råt talent', 'simon.jpg'),
(8, 'Majbrit', 'Majbrit er underviser i Jitterbug og Rock Rnd Roll', 'majbrit.jpg'),
(9, 'Mikkel', 'Mikkel underviser i standard dans', 'mikkel.jpg'),
(10, 'Elvis', 'Du har måske hørt om Elvis tror det er nok', 'elvis.jpg');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `levels`
--

CREATE TABLE IF NOT EXISTS `levels` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `levels`
--

INSERT INTO `levels` (`id`, `name`, `description`) VALUES
(1, 'begynder', 'Hej hej'),
(2, 'Øvet', 'hej hej'),
(3, 'elite', 'Hej med jer');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `roles`
--

CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(25) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Data dump for tabellen `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'Admin'),
(2, 'Instructor'),
(3, 'Customer');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `style`
--

CREATE TABLE IF NOT EXISTS `style` (
  `id` int(11) NOT NULL,
  `title` varchar(45) NOT NULL,
  `description` tinytext NOT NULL,
  `picture` varchar(45) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

--
-- Data dump for tabellen `style`
--

INSERT INTO `style` (`id`, `title`, `description`, `picture`) VALUES
(2, 'Break dance', 'Lorem ipsum dolor sit amet, mel postea feugiat omittam ei. An sea dicunt eloquentiam. Illum invidunt partiendo eam cu. Te nusquam pertinax sit. Omnes omittam eos cu.', 'cat.jpg'),
(3, 'Disco', 'Lorem ipsum dolor sit amet, mel postea feugiat omittam ei. An sea dicunt eloquentiam. Illum invidunt partiendo eam cu. Te nusquam pertinax sit. Omnes omittam eos cu.', 'cat.jpg'),
(4, 'Funk', 'Lorem ipsum dolor sit amet, mel postea feugiat omittam ei. An sea dicunt eloquentiam. Illum invidunt partiendo eam cu. Te nusquam pertinax sit. Omnes omittam eos cu.', 'cat.jpg'),
(5, 'House', 'Lorem ipsum dolor sit amet, mel postea feugiat omittam ei. An sea dicunt eloquentiam. Illum invidunt partiendo eam cu. Te nusquam pertinax sit. Omnes omittam eos cu.', 'cat.jpg'),
(6, 'Jitterbug /Rock''n Roll', 'Lorem ipsum dolor sit amet, mel postea feugiat omittam ei. An sea dicunt eloquentiam. Illum invidunt partiendo eam cu. Te nusquam pertinax sit. Omnes omittam eos cu.', 'cat.jpg'),
(7, 'Standrad', 'Lorem ipsum dolor sit amet, mel postea feugiat omittam ei. An sea dicunt eloquentiam. Illum invidunt partiendo eam cu. Te nusquam pertinax sit. Omnes omittam eos cu.', 'cat.jpg'),
(8, 'Latin-modedanse', 'Lorem ipsum dolor sit amet, mel postea feugiat omittam ei. An sea dicunt eloquentiam. Illum invidunt partiendo eam cu. Te nusquam pertinax sit. Omnes omittam eos cu.', 'cat.jpg'),
(9, 'Brugsdanse (Vild med dans)', 'Lorem ipsum dolor sit amet, mel postea feugiat omittam ei. An sea dicunt eloquentiam. Illum invidunt partiendo eam cu. Te nusquam pertinax sit. Omnes omittam eos cu.', 'cat.jpg');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

--
-- Data dump for tabellen `users`
--

INSERT INTO `users` (`id`, `email`, `password`) VALUES
(1, 'admin@admin.dk', 'admin'),
(23, 'instructor@instructor.dk', 'instructor'),
(24, 'test@test.dk', 'test');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `users_info`
--

CREATE TABLE IF NOT EXISTS `users_info` (
  `id` int(11) NOT NULL,
  `first_name` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `last_name` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `address` varchar(25) COLLATE utf8_bin DEFAULT NULL,
  `zip_code` int(4) DEFAULT NULL,
  `city` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `phone` int(8) DEFAULT NULL,
  `students` varchar(45) COLLATE utf8_bin NOT NULL,
  `fk_user` int(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Data dump for tabellen `users_info`
--

INSERT INTO `users_info` (`id`, `first_name`, `last_name`, `address`, `zip_code`, `city`, `phone`, `students`, `fk_user`) VALUES
(1, 'Hanne', 'Troelsen', 'Sognevej 24', 6540, 'Testby', 13541862, 'Mathias Troelsen', 1),
(6, 'hans', 'hansen', 'hansevej', 1234, 'hanseby', 12345678, 'Jens', 22),
(7, 'Henning', 'Hansen', 'Hønsevej', 1123, 'Hønseby', 45678932, 'Thomas', 24);

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `users_roles`
--

CREATE TABLE IF NOT EXISTS `users_roles` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `roles_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Data dump for tabellen `users_roles`
--

INSERT INTO `users_roles` (`id`, `user_id`, `roles_id`) VALUES
(1, 1, 1),
(5, 23, 2),
(6, 24, 3);

--
-- Begrænsninger for dumpede tabeller
--

--
-- Indeks for tabel `age_group`
--
ALTER TABLE `age_group`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `class_user`
--
ALTER TABLE `class_user`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `frontpage_content`
--
ALTER TABLE `frontpage_content`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `instructors`
--
ALTER TABLE `instructors`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `levels`
--
ALTER TABLE `levels`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `style`
--
ALTER TABLE `style`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `users_info`
--
ALTER TABLE `users_info`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `users_roles`
--
ALTER TABLE `users_roles`
  ADD PRIMARY KEY (`id`);

--
-- Brug ikke AUTO_INCREMENT for slettede tabeller
--

--
-- Tilføj AUTO_INCREMENT i tabel `age_group`
--
ALTER TABLE `age_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- Tilføj AUTO_INCREMENT i tabel `class`
--
ALTER TABLE `class`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- Tilføj AUTO_INCREMENT i tabel `class_user`
--
ALTER TABLE `class_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=20;
--
-- Tilføj AUTO_INCREMENT i tabel `frontpage_content`
--
ALTER TABLE `frontpage_content`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- Tilføj AUTO_INCREMENT i tabel `instructors`
--
ALTER TABLE `instructors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=16;
--
-- Tilføj AUTO_INCREMENT i tabel `levels`
--
ALTER TABLE `levels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- Tilføj AUTO_INCREMENT i tabel `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- Tilføj AUTO_INCREMENT i tabel `style`
--
ALTER TABLE `style`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=11;
--
-- Tilføj AUTO_INCREMENT i tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=25;
--
-- Tilføj AUTO_INCREMENT i tabel `users_info`
--
ALTER TABLE `users_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- Tilføj AUTO_INCREMENT i tabel `users_roles`
--
ALTER TABLE `users_roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
