-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 19, 2019 at 10:28 AM
-- Server version: 5.7.24-0ubuntu0.16.04.1
-- PHP Version: 7.0.32-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `maraudons`
--
CREATE DATABASE IF NOT EXISTS `maraudons` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `maraudons`;

-- --------------------------------------------------------

--
-- Table structure for table `actions`
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
-- Dumping data for table `actions`
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
-- Table structure for table `associations_has_actions`
--

DROP TABLE IF EXISTS `associations_has_actions`;
CREATE TABLE `associations_has_actions` (
  `assoprofil_id` int(11) NOT NULL,
  `actions_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `associations_has_actions`
--

INSERT INTO `associations_has_actions` (`assoprofil_id`, `actions_id`) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(8, 1),
(9, 1),
(11, 1),
(12, 1),
(13, 1),
(14, 1),
(1, 2),
(2, 2),
(3, 2),
(6, 2),
(8, 2),
(12, 2),
(13, 2),
(14, 2),
(16, 2),
(2, 3),
(3, 3),
(5, 3),
(8, 3),
(10, 3),
(14, 3),
(14, 4),
(4, 5),
(10, 5),
(14, 5),
(2, 6),
(10, 6),
(14, 6),
(17, 6),
(2, 7),
(4, 7),
(1, 8),
(12, 8),
(16, 8),
(1, 9),
(2, 9),
(3, 9),
(14, 9),
(16, 9);

-- --------------------------------------------------------

--
-- Table structure for table `assoprofil`
--

DROP TABLE IF EXISTS `assoprofil`;
CREATE TABLE `assoprofil` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `description` varchar(10000) DEFAULT NULL,
  `address` varchar(450) DEFAULT NULL,
  `logo` varchar(200) DEFAULT NULL,
  `social_network_url_1` varchar(450) DEFAULT NULL,
  `social_network_url_2` varchar(450) DEFAULT NULL,
  `social_network_url_3` varchar(450) DEFAULT NULL,
  `phone_number` varchar(45) DEFAULT NULL,
  `web_site` varchar(450) DEFAULT NULL,
  `mail` varchar(45) DEFAULT NULL,
  `is_visible` tinyint(4) DEFAULT NULL,
  `departements_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `assoprofil`
--

INSERT INTO `assoprofil` (`id`, `name`, `description`, `address`, `logo`, `social_network_url_1`, `social_network_url_2`, `social_network_url_3`, `phone_number`, `web_site`, `mail`, `is_visible`, `departements_id`) VALUES
(1, 'Association Mantes Solidarité', 'L\'association Mantes Solidarité, basée à Mantes-la-Jolie 78200 fut fondée officiellement en 2010. ', 'Mantes-la-Jolie', 'https://res.cloudinary.com/dna4dgicb/image/upload/v1546615216/mmy52airkeezvdthwvcw.png', '', ' https://www.facebook.com/Associationmantessolidarite/', '', '06 65 39 44 91', 'https://associationmantessolidarite.fr/', 'contact@associationmantessolidarite.fr', 1, 3),
(2, 'Au cœur de la fraternité', 'Groupement de personnes Soucieux d’AIDER au développement économique et social des personnes en grandes difficultés.', 'Mantes-la-Jolie', 'https://res.cloudinary.com/dna4dgicb/image/upload/v1546615233/fkea7nkc2wawrlks4zjd.png', '', 'https://b-m.facebook.com/Au-Coeur-De-La-Fraternit%C3%A9-2019270414968076/', '', '06 24 69 53 14', 'http://www.au-coeur-de-la-fraternite.fr/', 'contact@au-coeur-de-la-fraternite.fr', 1, 3),
(3, 'Au cœur de la précarité', 'En 2009, 4 jeunes homme de 20 ans environ, soucieux de venir en aide aux plus démunis se sont donnés rendez-vous près d\'une gare populaire. Il ne savait pas comment s\'y prendre, ni par où commencer, mais ils étaient sûr d\'une chose : ils se sont réunis pour tendre la main aux sans-abris....', '62 avenue Jean Jaures 93450 L\'île-Saint-Denis', 'https://res.cloudinary.com/dna4dgicb/image/upload/v1546615249/wkyj4qzxmhp7wuyh5kgh.png', 'https://twitter.com/ACDLP_', 'https://www.facebook.com/aucoeurdelaprecarite/?_rdc=1&_rdr', NULL, '07 68 10 40 78', 'http://www.aucoeurdelaprecarite.com/', 'contact@aucoeurdelaprecarite.com', 1, 6),
(4, 'Banlieue plus (Pôle Maraude)', 'Banlieue + est une association qui est née à la suite de plusieurs constats :\nUne augmentation de discrimination à l’égard des gens qui habite la banlieue .\nUne stigmatisation quasi automatique de cette population de la part de nombreux politiques ainsi que de la plupart des médias.\nDes dysfonctionnements qui ont poussé Nadir KAHIA président de l’association à créer une force positive et créative dans le but de réfléchir et de proposer des actions concrètes.\n', '31 Rue du 8 Mai 1945, 92230 Gennevilliers', 'http://res.cloudinary.com/dna4dgicb/image/upload/v1547473284/lctpltgknl3ce8a9gvqm.jpg', 'https://twitter.com/banlieue_plus?lang=fr', 'https://www.facebook.com/banlieue.plus/', '', '06 27 80 25 28', 'http://www.banlieueplus.fr/category/maraudes-solidaires/', 'contact@banlieueplus.fr', 1, 5),
(5, 'Don\'heures', 'Nous sommes l\'association DON\'HEURES basée à Sevran - 93270.\nNos objectifs sont l\'entraide et le partage, mais pas que... \nN\'hésitez pas à nous Contacter', 'Sevran', 'http://res.cloudinary.com/dna4dgicb/image/upload/v1547473545/zfzkyjsgks4nuybmckdh.jpg', NULL, 'https://www.facebook.com/asso.donheures/', NULL, '06 86 52 43 25', 'https://donnerenligne.fr/don-heures/faire-un-don?fbclid=IwAR3aLnGmNrfKkNPOI3HL8KGTuB6M6gxJHl3tfgvWSsYM20ffOXUsKEb4Nt4', 'asso.donheures@gmail.com', 1, 6),
(6, 'Frères et sœurs de cœurs', 'L’association « FS2COEUR » est une association qui  a pour mission de venir en aide aux plus démunis. \n\nNovembre 2014, trois amies de cœur forment le projet de venir en aide aux plus démunis, qu’elles croisent dans les rues de Nanterre et qu’elles ne peuvent plus enjamber dans l’indifférence.  \n\nFrères et Sœurs de Cœur c’est aussi  5 000 rires, pleurs et sourires comptabilisés', 'Nanterre', 'http://res.cloudinary.com/dna4dgicb/image/upload/v1547202759/uceppftasbuuapgq5iat.jpg', NULL, 'https://www.facebook.com/fs2coeur', 'https://www.instagram.com/freresetsoeursdecoeur/?fbclid=IwAR3V33qO3W_62x7R0-0hLoGgm7Mg5lyuxR_PEFGTrZK6MsjOiHTzoAmRYoE', '07 56 80 56 29 ', 'http://freresetsoeursdecoeur.com', 'freresetsoeursdecoeur@gmail.com', 1, 5),
(7, 'Humanity First', '', '', '', '', '', NULL, '06 29 44 12 85', '', '', 0, 1),
(8, 'Humans United', 'Association Humanitaire œuvrant pour lutter contre l’exclusion sociale de personnes en situation de précarité, Sans distinction aucune, \nA travers des maraudes solidaires, d’actions sociales, et campagnes de sensibilisation.', 'Houilles', 'https://res.cloudinary.com/dna4dgicb/image/upload/v1547474777/giatwdqv2kymopq1cvvj.jpg', 'https://twitter.com/thehumansunited?lang=fr', 'https://www.facebook.com/AssoHumansUnited/', NULL, '06 66 19 36 34', 'https://www.donnerenligne.fr/humans-united/faire-un-don', 'asso.humansunited@gmail.com', 1, 3),
(9, 'Maraude du cœur 94', 'Née d une initiative citoyenne  en 2014, notre association à pour principale activité la distribution de repas, d\'hygiène et vêtements auprès des SDF et des personnes en très  grande précarité. ', 'Val-de-Marne', 'http://res.cloudinary.com/dna4dgicb/image/upload/v1547475064/azcjnzookmvxhs3jjs9y.jpg', NULL, 'https://www.facebook.com/groups/788932587852359/', NULL, NULL, NULL, 'maraudeducoeur94@gmail.com ', 1, 7),
(10, 'Resto du cœur Yvelines', 'Le contexte économique, l’actualité toujours plus préoccupante, nous laisse à penser que nous serons encore sollicités de manière très soutenue dans les mois à venir. Plus que jamais, nous devrons être capables d’accueillir plus souvent, plus longtemps. Nous devrons mettre en œuvre nos compétences en matière de soutien et d’accompagnement pour aider les personnes qui vivent dans des conditions de plus en plus précaires. ', '10, rue du Président Kennedy 78340 Les Clayes sous Bois', 'http://res.cloudinary.com/dna4dgicb/image/upload/v1547475138/nzk1p2tcdj0ospfaf2t2.jpg', NULL, '', NULL, '01 30 80 90 95', 'http://ad78.restosducoeur.org/', 'ad78.siege@restosducoeur.org', 1, 3),
(11, 'Tcheck moi-ça ', 'Tchek Moi Ca est une association crée afin de permettre aux personnes les plus démunies de pouvoir vivre le plus paisiblement possible', 'Arcueil ', 'http://res.cloudinary.com/dna4dgicb/image/upload/v1547475803/ik03rwsjz6m7dl3r7qcx.jpg', NULL, 'https://www.facebook.com/Pimpmylife1/', NULL, '01 30 98 09 27', NULL, NULL, 1, 1),
(12, 'Un pas vers demain ', 'Réalisation d\'œuvres à vocation sociale et assistance aux personnes démunies afin de lutter contre la précarité.', 'Massy', 'http://res.cloudinary.com/dna4dgicb/image/upload/v1547476016/obucfnkuldxntdkllqtl.jpg', NULL, 'https://www.facebook.com/unpasversdemain/', NULL, '06 43 78 35 98 ', NULL, 'communication.upvd@gmail.com', 1, 4),
(13, 'Un seul et même corps', 'Un seul et même corps est une association humanitaire ayant pour but de venir en aide aux démunis, elle tente de répondre à certains besoins vitaux des êtres humains tels que la faim, l\'hygiène et l\'accès à l\'eau ; l\'association accorde une place très importante à l\'écoute, il est nécessaire d\'établir un lien et de prêter une oreille attentive à chaque personne que nous rencontrons, le but étant de permettre à chacun de vivre dans de meilleurs conditions ; nous apportons notre aide à tous sans distinction', 'Orly', 'http://res.cloudinary.com/dna4dgicb/image/upload/v1547476154/jccq2vailhqwbw1htzqm.jpg', '', 'https://www.facebook.com/pages/category/Nonprofit-Organization/Un-seul-et-m%C3%AAme-corps-461813664008063/', NULL, '06 95 05 75 94', '', '', 1, 7),
(14, 'United', 'Notre projet d\'association : agir pour une société inclusive et favoriser le "vivre ensemble", afin que chacun se sente à sa place et y joue un rôle. Pour le réaliser, nos actions se déclinent en 3 axes : l\'aide aux démunis, la réinsertion sociale et la sensibilisation.', 'Cergy', 'http://res.cloudinary.com/dna4dgicb/image/upload/v1547476360/fyq8b5x37kl7by3ihdwb.jpg', NULL, 'https://www.facebook.com/asso.united/?__tn__=%2CdkC-R-R&eid=ARDIk9sz29_EU7KbBBH1FyiY6HJN1fYTPNWsfuIu-EyuDC2B10rIrMm37uCz6s4kZnuNbsp8BxBpdxvI&hc_ref=ARTMDR5UfPbpCKulIbJ03J5CCHhRZYqO1CHYwZU2kBmuAyB-h_mG5iK0gLcEpCiNX1I', 'https://www.instagram.com/asso.united/?fbclid=IwAR1PCZVeOeO0_bVHMISZLG2nxmj1r20MTMC77sO0XQYc4P9jZr79Mhn4HD0', '06 51 92 08 79', 'https://www.asso-united.fr/', 'contact@asso-united.fr', 1, 8),
(15, 'Le temps d\'une Aumône', 'Le Temps D’une Aumône est une association humanitaire ayant pour but de venir en aide aux plus démunis.', 'Mantes-la-Jolie', NULL, NULL, 'https://www.facebook.com/LeTempsDuneAumone/', 'https://www.instagram.com/letempsduneaumone/', '0761811289', 'paypal.me/ltdacharity', 'ltdacharity@gmail.com', 0, 3),
(16, 'Le temps d\'une Aumône', 'Le Temps D’une Aumône est une association humanitaire ayant pour but de venir en aide aux plus démunis.', 'Mantes-la-Jolie', 'https://res.cloudinary.com/dna4dgicb/image/upload/v1547824730/lrgxwvvhpklzs9yekyi5.jpg', NULL, 'https://www.facebook.com/LeTempsDuneAumone/', 'https://www.instagram.com/letempsduneaumone/', '0761811289', 'paypal.me/ltdacharity', 'ltdacharity@gmail.com', 1, 3),
(17, 'Association Mantes Espoir', 'Aidez-nous à les aider !', 'Mantes-la-Jolie', 'https://res.cloudinary.com/dna4dgicb/image/upload/v1547827490/h4gyvgztpx3zwhybbxev.jpg', NULL, 'https://www.facebook.com/pages/category/Community/Association-Mantes-Espoir-341714766205490/', NULL, '0614914630', NULL, 'mantesespoir@gmail.com', 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `departements`
--

DROP TABLE IF EXISTS `departements`;
CREATE TABLE `departements` (
  `id` int(11) NOT NULL,
  `num_departement` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `departements`
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
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `title` varchar(450) DEFAULT NULL,
  `description` varchar(450) DEFAULT NULL,
  `begin_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `begin_hour` datetime DEFAULT NULL,
  `end_hour` datetime DEFAULT NULL,
  `is_active` tinyint(4) DEFAULT NULL,
  `users_id` int(11) NOT NULL,
  `locations_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `title`, `description`, `begin_date`, `end_date`, `begin_hour`, `end_hour`, `is_active`, `users_id`, `locations_id`) VALUES
(1, '[AMS] Distribution', 'Distribution d\'une vingtaine de repas aux sans-abris de Mantes-la-Jolie', '2019-01-11 19:30:00', '2019-01-11 21:00:00', NULL, NULL, 1, 1, 13),
(2, '[AMS2] [Test] Distribution parallèle', 'Distribution d\'une vingtaine de repas aux sans-abris de Mantes-la-Jolie', '2019-01-11 17:00:00', '2019-01-11 21:30:00', NULL, NULL, 1, 1, 13),
(3, '[AMS3] Distribution collégiale', 'Distribution d\'une vingtaine de repas aux sans-abris de Mantes-la-Jolie', '2019-01-11 18:30:00', '2019-01-11 20:45:00', NULL, NULL, 1, 1, 13);

-- --------------------------------------------------------

--
-- Table structure for table `locations`
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
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`id`, `name`, `longitude`, `latitude`, `img_url`, `departements_id`, `is_active`) VALUES
(1, 'Châtelet - Rue du Louvre - Rue de Rivoli - Cité des Arts (Pont Marie)', NULL, NULL, 'http://', 1, 1),
(2, 'Gare de l\'Est - Poissonnière - Cadet', NULL, NULL, 'http://', 3, 1),
(3, 'Gare de Lyon-Austerlitz-Bercy - Bastille - Nation - Porte de Vincennes', NULL, NULL, 'http', 3, 1),
(4, 'Gare du Nord - Boulevard Barbès - ', NULL, NULL, 'http://', 2, 1),
(5, 'Gare Montparnasse - Invalide', NULL, NULL, NULL, 4, 1),
(6, 'Gare Saint-Lazare - Madeleine - Opéra', NULL, NULL, NULL, 1, 1),
(7, 'Grands boulevard - Strasbourg Saint-Denis ', NULL, NULL, NULL, 1, 1),
(8, 'République - Oberkampf ', NULL, NULL, NULL, 3, 1),
(9, 'Porte-avenue-place Clichy - Porte de Saint-Ouen', NULL, NULL, NULL, 5, 1),
(10, 'Porte de la chapelle - Porte d\'Aubervilliers - Porte de Clignancourt ', NULL, NULL, NULL, 2, 1),
(11, 'Porte de la Villette - Stalingrad - Buttes-Chaumont ', NULL, NULL, NULL, 3, 1),
(12, 'Porte-place d\'Italie - Porte d\'Ivry', NULL, NULL, NULL, 4, 1),
(13, 'Collégiale de Mantes-la-Jolie', NULL, NULL, NULL, 6, 1),
(14, 'Saint-Denis (La Plaine) ', NULL, NULL, NULL, 6, 0),
(15, 'Test - Je ne sais pas', NULL, NULL, NULL, 6, 0),
(16, 'Test', NULL, NULL, 'http', 6, 0);

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `img_url` varchar(200) DEFAULT NULL,
  `text` varchar(450) DEFAULT NULL,
  `title` varchar(450) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `is_active` tinyint(4) DEFAULT NULL,
  `users_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`id`, `img_url`, `text`, `title`, `date`, `is_active`, `users_id`) VALUES
(1, 'https://res.cloudinary.com/dna4dgicb/image/upload/v1547198314/z4ix9eko9hodqpa6gc7v.jpg', ' Bientôt le lancement de la plateforme. Suivez-nous sur nos réseaux...', 'Ouverture prochaine !', '2019-01-01 00:00:00', 1, 1),
(2, NULL, NULL, NULL, NULL, 0, 1),
(3, 'https://www.mjcmontchat.org/wp-content/uploads/2018/02/B%C3%A9n%C3%A9volat-727x284.png', 'Trouvez une association près de chez vous', 'Devenez bénévoles', '2019-01-11 00:00:00', 1, 1),
(4, 'https://res.cloudinary.com/dna4dgicb/image/upload/v1547199713/eeitiuslowdyxphpqvdm.png', 'L\'Association Unité du Monde recrute !', 'Unité du monde recrute', '2018-11-30 00:00:00', 0, 1),
(5, 'https://res.cloudinary.com/dna4dgicb/image/upload/v1547558425/rv3g8ct6htxpqvdm4prl.png', 'Unité du monde recrute des bénévoles !', 'Unité du monde recrute des bénévoles', '2019-01-18 00:00:00', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
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
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `role`, `password`, `creation_date`, `last_update_date`, `is_active`, `assoprofil_id`) VALUES
(1, 'admin', 'admin', '$2b$10$SrMgUKxTUvDyopXs77o5Eu3TxfEj.CXxz3V5A1gLAx5SGTQeZVuzi', NULL, NULL, NULL, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `actions`
--
ALTER TABLE `actions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `associations_has_actions`
--
ALTER TABLE `associations_has_actions`
  ADD PRIMARY KEY (`assoprofil_id`,`actions_id`),
  ADD KEY `fk_Associations_has_Actions_Actions1_idx` (`actions_id`),
  ADD KEY `fk_Associations_has_Actions_Associations1_idx` (`assoprofil_id`);

--
-- Indexes for table `assoprofil`
--
ALTER TABLE `assoprofil`
  ADD PRIMARY KEY (`id`,`departements_id`),
  ADD KEY `fk_Associations_Departement1_idx` (`departements_id`);

--
-- Indexes for table `departements`
--
ALTER TABLE `departements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`,`users_id`,`locations_id`),
  ADD KEY `fk_Events_Users1_idx` (`users_id`),
  ADD KEY `fk_Events_Lieux1_idx` (`locations_id`);

--
-- Indexes for table `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`id`,`departements_id`),
  ADD KEY `fk_Lieux_Departement1_idx` (`departements_id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`,`users_id`),
  ADD KEY `fk_News_Users1_idx` (`users_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`,`assoprofil_id`),
  ADD KEY `fk_users_assoprofil1_idx` (`assoprofil_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `actions`
--
ALTER TABLE `actions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `assoprofil`
--
ALTER TABLE `assoprofil`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `departements`
--
ALTER TABLE `departements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;
--
-- AUTO_INCREMENT for table `locations`
--
ALTER TABLE `locations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `associations_has_actions`
--
ALTER TABLE `associations_has_actions`
  ADD CONSTRAINT `fk_Associations_has_Actions_Actions1` FOREIGN KEY (`actions_id`) REFERENCES `actions` (`id`),
  ADD CONSTRAINT `fk_Associations_has_Actions_Associations1` FOREIGN KEY (`assoprofil_id`) REFERENCES `assoprofil` (`id`);

--
-- Constraints for table `assoprofil`
--
ALTER TABLE `assoprofil`
  ADD CONSTRAINT `fk_Associations_Departement1` FOREIGN KEY (`departements_id`) REFERENCES `departements` (`id`);

--
-- Constraints for table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `fk_Events_Lieux1` FOREIGN KEY (`locations_id`) REFERENCES `locations` (`id`),
  ADD CONSTRAINT `fk_Events_Users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `locations`
--
ALTER TABLE `locations`
  ADD CONSTRAINT `fk_Lieux_Departement1` FOREIGN KEY (`departements_id`) REFERENCES `departements` (`id`);

--
-- Constraints for table `news`
--
ALTER TABLE `news`
  ADD CONSTRAINT `fk_News_Users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_users_assoprofil1` FOREIGN KEY (`assoprofil_id`) REFERENCES `assoprofil` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
