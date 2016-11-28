-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-11-2016 a las 01:40:45
-- Versión del servidor: 5.7.9
-- Versión de PHP: 5.6.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `fisfinder120`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administrador`
--

DROP TABLE IF EXISTS `administrador`;
CREATE TABLE IF NOT EXISTS `administrador` (
  `Nombre` varchar(30) NOT NULL,
  `Rut` varchar(11) NOT NULL,
  `Email` varchar(40) NOT NULL,
  `Password` varchar(20) NOT NULL,
  `SuperAdmin` tinyint(1) NOT NULL,
  `Seccion` varchar(30) NOT NULL,
  PRIMARY KEY (`Email`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `administrador`
--

INSERT INTO `administrador` (`Nombre`, `Rut`, `Email`, `Password`, `SuperAdmin`, `Seccion`) VALUES
('Maximilialo Rivera', '12345678-4', 'maximiliano.rivera@usm.cl', '1234', 1, 'General'),
('Profesor2', '1236985214', 'proferos2@usm.cl', '1234', 0, 'Fis120'),
('Profesor1', '121234568', 'profesor1@usm.cl', '1234', 0, 'Fis110'),
('Profero3', '1234567899', 'profesor3@usm.cl', '1234', 0, 'Fis120');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contenido`
--

DROP TABLE IF EXISTS `contenido`;
CREATE TABLE IF NOT EXISTS `contenido` (
  `#Contenido` int(11) NOT NULL,
  `Titulo` varchar(30) NOT NULL,
  `URL` int(80) NOT NULL,
  `Posicion` int(11) NOT NULL,
  `Tipo` tinyint(1) NOT NULL,
  PRIMARY KEY (`#Contenido`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiante`
--

DROP TABLE IF EXISTS `estudiante`;
CREATE TABLE IF NOT EXISTS `estudiante` (
  `Nombre` varchar(30) NOT NULL,
  `Rut` varchar(11) NOT NULL,
  `Email` varchar(40) NOT NULL,
  `Password` varchar(20) NOT NULL,
  `Rol` varchar(11) NOT NULL,
  `Tipo` char(1) NOT NULL DEFAULT '4',
  PRIMARY KEY (`Email`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `estudiante`
--

INSERT INTO `estudiante` (`Nombre`, `Rut`, `Email`, `Password`, `Rol`, `Tipo`) VALUES
('Michel', '194567894', 'michel.concha.14@sansano.usm.cl', 'hamster', '2014735292', '2'),
('Francisco', '191339932', 'francisco.vasquez.14@sansano.usm.cl', '1234', '2014735685', '3'),
('Andrea', '191376048', 'erika.riveros.14@sansano.usm.cl', 'Ferrari2018', '2014045336', '0'),
('Jorge', '191254896', 'jorge.aliste.14@sansano.usm.cl', 'potopoto', '2014735384', '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `feedback`
--

DROP TABLE IF EXISTS `feedback`;
CREATE TABLE IF NOT EXISTS `feedback` (
  `rownum` int(11) NOT NULL AUTO_INCREMENT,
  `Mensaje` varchar(500) NOT NULL,
  `Tipo` varchar(1) NOT NULL,
  `Revisado` varchar(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`rownum`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `feedback`
--

INSERT INTO `feedback` (`rownum`, `Mensaje`, `Tipo`, `Revisado`) VALUES
(1, 'asdasdasasd', '0', '0'),
(2, 'aasdasdasdasd', '0', '0'),
(3, 'wadasdasdsad', '0', '0'),
(4, 'auauauau', '0', '0'),
(5, 'Feedback 1', '0', '0'),
(6, 'Feedback Jorge', '1', '0'),
(7, 'Feedback Andrea', '0', '0'),
(8, 'Feedback4', '1', '0'),
(9, 'Feedback martes', '1', '0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modulo`
--

DROP TABLE IF EXISTS `modulo`;
CREATE TABLE IF NOT EXISTS `modulo` (
  `Tipo` int(1) NOT NULL,
  `FechaModificacion` date NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pregunta`
--

DROP TABLE IF EXISTS `pregunta`;
CREATE TABLE IF NOT EXISTS `pregunta` (
  `Test?` tinyint(1) NOT NULL,
  `#Pregunta` int(11) NOT NULL,
  `Alternativa1` char(1) NOT NULL,
  `Alternativa2` char(1) NOT NULL,
  `Alternativa3` char(1) NOT NULL,
  PRIMARY KEY (`#Pregunta`),
  KEY `Test?` (`Test?`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuesta`
--

DROP TABLE IF EXISTS `respuesta`;
CREATE TABLE IF NOT EXISTS `respuesta` (
  `Test?` tinyint(1) NOT NULL,
  `#Pregunta` int(11) NOT NULL,
  `RutEstudiante` varchar(11) NOT NULL,
  `Respuesta` char(1) NOT NULL,
  PRIMARY KEY (`RutEstudiante`),
  UNIQUE KEY `RutEstudiante` (`RutEstudiante`),
  KEY `Test?` (`Test?`),
  KEY `#Pregunta` (`#Pregunta`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
