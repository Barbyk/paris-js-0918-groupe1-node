-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Client :  localhost:3306
-- Généré le :  Ven 07 Décembre 2018 à 17:11
-- Version du serveur :  5.7.24-0ubuntu0.18.04.1
-- Version de PHP :  7.2.10-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `maraudons`
--
CREATE DATABASE IF NOT EXISTS `maraudons` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `maraudons`;

-- --------------------------------------------------------

--
-- Structure de la table `actions`
--

DROP TABLE IF EXISTS `actions`;
CREATE TABLE `actions` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `definition` varchar(500) DEFAULT NULL,
  `icon` varchar(45) DEFAULT NULL,
  `is_active` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `actions`
--

INSERT INTO `actions` (`id`, `name`, `definition`, `icon`, `is_active`) VALUES
(1, 'Maraudes mobiles', 'Une maraude consiste à aller dans la rue (à pied ou en voiture) à la rencontre de personnes sans abri, pour leur apporter de l’aide matérielle et/ou simplement être là et partager un moment. Les interventions se font de jour comme de nuit, en équipe de 3-5 bénévoles suivant les structures.\r\n', '', 1),
(2, 'Tables solidaires', 'Se réunir autour de tables servis dans la rue pour offrir réconfort et soutien aux personnes qui n’ont pas de toit, les sortir de l’isolement en partageant avec eux de vrais moments d’échange et leur distribuer des produits de première nécessité (nourriture, vêtements et produits d’hygiène).', '', 1),
(3, 'Colis alimentaires', 'Confections et livraisons de colis alimentaires dans les hôtels sociaux afin de permettre aux personnes en difficultés de se nourrir avec des produits de qualité, ainsi que de disposer de plus d’argent pour les autres dépenses de la vie quotidienne, qu’elles ne peuvent pas toujours assumer. \r\n', '', 1),
(4, 'Visites aux isolés', 'Organisation de goûters, d’après-midi récréatives dans les Ehpad, de spectacles pour les enfants malades… tant d’occasions pour apporter présences amicales, écoute et réconfort aux personnes isolées de toutes âges.', '', 1),
(5, 'Accompagnement administratif', 'Ces associations permettent aux nécessiteux d’identifier les droits mobilisables et de bénéficier d’un accompagnement adapté pour s’en saisir. De nombreux sans-abri ne jouissent pas de leurs droits. \r\n', '', 1),
(6, 'Culture et loisirs', 'Mise en place d’activités culturelles, de loisirs, physiques et sportives à destinations d’enfants et/ou d’adultes permettant d’échapper au phénomène d’isolement et de repli en recréant du lien, des échanges et de la convivialité entre tous.', '', 1),
(7, 'Soutien scolaire', 'Donner leur chance aux enfants et aux jeunes issues de milieux défavorisés, qui ne peuvent trouver de l’aide dans leur environnement proche (faute de moyens financiers, de disponibilité ou de capacité) et ainsi de contribuer à la lutte contre l’échec scolaire.', '', 1),
(8, 'Actions à l’étranger', 'Constructions d’infrastructures (écoles, puits, forages, plantations, etc.), mise en place d’AGR (Activités génératrices de revenus), envoi de matériels (scolaire, vêtements, etc.) sont tant d’actions possibles envers les zones de tensions et de famine causées par la sécheresse ou la guerre. ', '', 1),
(9, 'Aide aux migrants', 'Mise en œuvre d’actions d’aides spécifiques envers les migrants, fuyant guerres et misères, en situation de transit en Banlieue ou en situation très précaire à Porte de la chapelle (Paris).', '', 1);

-- --------------------------------------------------------

--
-- Structure de la table `associations_has_actions`
--

DROP TABLE IF EXISTS `associations_has_actions`;
CREATE TABLE `associations_has_actions` (
  `assoprofil_id` int(11) NOT NULL,
  `actions_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `associations_has_actions`
--

INSERT INTO `associations_has_actions` (`assoprofil_id`, `actions_id`) VALUES
(2, 1),
(3, 5);

-- --------------------------------------------------------

--
-- Structure de la table `assoprofil`
--

DROP TABLE IF EXISTS `assoprofil`;
CREATE TABLE `assoprofil` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `description` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `logo` varchar(45) DEFAULT NULL,
  `social_network_url_1` varchar(45) DEFAULT NULL,
  `social_network_url_2` varchar(45) DEFAULT NULL,
  `social_network_url_3` varchar(45) DEFAULT NULL,
  `phone_number` varchar(45) DEFAULT NULL,
  `web_site` varchar(45) DEFAULT NULL,
  `mail` varchar(45) DEFAULT NULL,
  `is_visible` tinyint(4) DEFAULT NULL,
  `departements_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `assoprofil`
--

INSERT INTO `assoprofil` (`id`, `name`, `description`, `address`, `logo`, `social_network_url_1`, `social_network_url_2`, `social_network_url_3`, `phone_number`, `web_site`, `mail`, `is_visible`, `departements_id`) VALUES
(1, 'Association Mantes Solidarité', 'Asso', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1),
(2, 'Au cœur de la fraternité', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1),
(3, 'Au cœur de la précarité', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1),
(4, 'Banlieue plus', '', 'PARIS', '', '', '', '', '01.02.03.04.05', 'http://emmaus.fr', 'mail@mail.fr', 1, 6),
(5, 'Don\'heures', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1),
(6, 'Frères et sœurs de cœurs', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1),
(7, 'Humanity First', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1),
(8, 'Humans United', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1),
(9, 'Maraude du cœur 94', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1),
(10, 'Resto du cœur Mantes', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1),
(11, 'Tcheck moi ca ', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1),
(12, 'Un pas vers demain ', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1),
(13, 'Un seul et même corps', 'Une association solidaire', 'Orly', NULL, '', NULL, NULL, '', '', '', 1, 7),
(14, 'United', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `departements`
--

DROP TABLE IF EXISTS `departements`;
CREATE TABLE `departements` (
  `id` int(11) NOT NULL,
  `num_departement` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `departements`
--

INSERT INTO `departements` (`id`, `num_departement`) VALUES
(1, 75),
(2, 77),
(3, 78),
(4, 91),
(5, 92),
(6, 93),
(7, 94),
(8, 95);

-- --------------------------------------------------------

--
-- Structure de la table `events`
--

DROP TABLE IF EXISTS `events`;
CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `title` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `begin_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `begin_hour` datetime DEFAULT NULL,
  `end_hour` datetime DEFAULT NULL,
  `is_visible` tinyint(4) DEFAULT NULL,
  `users_id` int(11) NOT NULL,
  `locations_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `events`
--

INSERT INTO `events` (`id`, `title`, `description`, `begin_date`, `end_date`, `begin_hour`, `end_hour`, `is_visible`, `users_id`, `locations_id`) VALUES
(1, 'Maraudes d\'Emmaus', 'Organisé par Emmaus', NULL, NULL, NULL, NULL, 1, 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `locations`
--

DROP TABLE IF EXISTS `locations`;
CREATE TABLE `locations` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `longitude` varchar(45) DEFAULT NULL,
  `latitude` varchar(45) DEFAULT NULL,
  `img_url` varchar(45) DEFAULT NULL,
  `departements_id` int(11) NOT NULL,
  `is_active` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `locations`
--

INSERT INTO `locations` (`id`, `name`, `longitude`, `latitude`, `img_url`, `departements_id`, `is_active`) VALUES
(1, 'Châtelet - Rue du Louvre - Rue de Rivoli - Cité des Arts (Pont Marie)', NULL, NULL, 'http://', 1, 0),
(2, 'Gare de l\'Est - Poissonnière - Cadet', NULL, NULL, 'http://', 1, 1),
(3, 'Gare de Lyon-Austerlitz-Bercy - Bastille - Nation - Porte de Vincennes', NULL, NULL, 'http', 1, 1),
(4, 'Gare du Nord - Boulevard Barbès - ', NULL, NULL, 'http://', 1, 1),
(5, 'Gare Montparnasse - Invalide', NULL, NULL, NULL, 1, 1),
(6, 'Gare Saint-Lazare - Madeleine - Opéra', NULL, NULL, NULL, 1, 1),
(7, 'Grands boulevard - Strasbourg Saint-Denis ', NULL, NULL, NULL, 1, 1),
(8, 'République - Oberkampf ', NULL, NULL, NULL, 1, 1),
(9, 'Porte-avenue-place Clichy - Porte de Saint-Ouen', NULL, NULL, NULL, 1, 1),
(10, 'Porte de la chapelle - Porte d\'Aubervilliers - Porte de Clignancourt ', NULL, NULL, NULL, 1, 1),
(11, 'Porte de la Villette - Stalingrad - Buttes-Chaumont ', NULL, NULL, NULL, 1, 1),
(12, 'Porte-place d\'Italie - Porte d\'Ivry', NULL, NULL, NULL, 1, 1),
(13, 'Mantes-la-Jolie (Collégiale)', NULL, NULL, NULL, 8, 1),
(14, 'Saint-Denis (La Plaine) ', NULL, NULL, NULL, 6, 1);

-- --------------------------------------------------------

--
-- Structure de la table `news`
--

DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `img_url` varchar(45) DEFAULT NULL,
  `text` varchar(45) DEFAULT NULL,
  `title` varchar(45) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `Is_active` tinyint(4) DEFAULT NULL,
  `users_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `news`
--

INSERT INTO `news` (`id`, `img_url`, `text`, `title`, `date`, `Is_active`, `users_id`) VALUES
(1, 'http', 'Organisé par Emmaus', 'Evenement exceptionnelle', '2018-12-28 00:00:00', 1, 1),
(2, 'http', 'Organisé par le Secours populaire', 'Autre évenement exceptionnelle', '2018-12-20 00:00:00', 1, 1),
(3, NULL, NULL, NULL, NULL, 0, 1);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(45) NOT NULL,
  `role` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `creation_date` datetime DEFAULT NULL,
  `last_update_date` datetime DEFAULT NULL,
  `is_active` tinyint(4) DEFAULT NULL,
  `assoprofil_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`id`, `username`, `role`, `password`, `creation_date`, `last_update_date`, `is_active`, `assoprofil_id`) VALUES
(1, 'admin', 'admin', '$2b$10$SrMgUKxTUvDyopXs77o5Eu3TxfEj.CXxz3V5A1gLAx5SGTQeZVuzi', NULL, NULL, NULL, 1);

--
-- Index pour les tables exportées
--

--
-- Index pour la table `actions`
--
ALTER TABLE `actions`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `associations_has_actions`
--
ALTER TABLE `associations_has_actions`
  ADD PRIMARY KEY (`assoprofil_id`,`actions_id`),
  ADD KEY `fk_Associations_has_Actions_Actions1_idx` (`actions_id`),
  ADD KEY `fk_Associations_has_Actions_Associations1_idx` (`assoprofil_id`);

--
-- Index pour la table `assoprofil`
--
ALTER TABLE `assoprofil`
  ADD PRIMARY KEY (`id`,`departements_id`),
  ADD KEY `fk_Associations_Departement1_idx` (`departements_id`);

--
-- Index pour la table `departements`
--
ALTER TABLE `departements`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`,`users_id`,`locations_id`),
  ADD KEY `fk_Events_Users1_idx` (`users_id`),
  ADD KEY `fk_Events_Lieux1_idx` (`locations_id`);

--
-- Index pour la table `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`id`,`departements_id`),
  ADD KEY `fk_Lieux_Departement1_idx` (`departements_id`);

--
-- Index pour la table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`,`users_id`),
  ADD KEY `fk_News_Users1_idx` (`users_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`,`assoprofil_id`),
  ADD KEY `fk_users_assoprofil1_idx` (`assoprofil_id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `actions`
--
ALTER TABLE `actions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT pour la table `assoprofil`
--
ALTER TABLE `assoprofil`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;
--
-- AUTO_INCREMENT pour la table `departements`
--
ALTER TABLE `departements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT pour la table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT pour la table `locations`
--
ALTER TABLE `locations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT pour la table `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `associations_has_actions`
--
ALTER TABLE `associations_has_actions`
  ADD CONSTRAINT `fk_Associations_has_Actions_Actions1` FOREIGN KEY (`actions_id`) REFERENCES `actions` (`id`),
  ADD CONSTRAINT `fk_Associations_has_Actions_Associations1` FOREIGN KEY (`assoprofil_id`) REFERENCES `assoprofil` (`id`);

--
-- Contraintes pour la table `assoprofil`
--
ALTER TABLE `assoprofil`
  ADD CONSTRAINT `fk_Associations_Departement1` FOREIGN KEY (`departements_id`) REFERENCES `departements` (`id`);

--
-- Contraintes pour la table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `fk_Events_Lieux1` FOREIGN KEY (`locations_id`) REFERENCES `locations` (`id`),
  ADD CONSTRAINT `fk_Events_Users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `locations`
--
ALTER TABLE `locations`
  ADD CONSTRAINT `fk_Lieux_Departement1` FOREIGN KEY (`departements_id`) REFERENCES `departements` (`id`);

--
-- Contraintes pour la table `news`
--
ALTER TABLE `news`
  ADD CONSTRAINT `fk_News_Users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_users_assoprofil1` FOREIGN KEY (`assoprofil_id`) REFERENCES `assoprofil` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
