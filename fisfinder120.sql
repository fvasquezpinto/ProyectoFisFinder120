-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-11-2016 a las 02:39:35
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
('Maximilialo Rivera', '12345678-4', 'maximiliano.rivera@usm.cl', '1234', 1, 'General');

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
('123', '123', 'mi@on.sis', 'papas', '123123', '1'),
('Gabriel', 'Molina', 'g@m.b', '1234', '1234', '0'),
('4314212', '214214342', '123@miau.cl', '1231', '2131', '0'),
('121412', '3212', '123@miau2.cl', '12343', '213', '0'),
('123432', '321', '132@asd', '123', '1233', '4');

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
