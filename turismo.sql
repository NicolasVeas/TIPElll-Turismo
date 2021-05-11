-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-05-2021 a las 19:56:44
-- Versión del servidor: 10.4.18-MariaDB
-- Versión de PHP: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `turismo`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `atractivo_admin`
--

CREATE TABLE `atractivo_admin` (
  `id_atractivo` int(11) NOT NULL,
  `correo` varchar(30) DEFAULT NULL,
  `titulo` text NOT NULL,
  `descripcion` mediumtext NOT NULL,
  `geo_local` text NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `img` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `nombre_cat` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`nombre_cat`) VALUES
('Agencias y TTOO'),
('Alojamientos'),
('Otros'),
('Paseos Náuticos'),
('Servicios Gastronómicos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicio_admin`
--

CREATE TABLE `servicio_admin` (
  `id_servicio` int(11) NOT NULL,
  `correo` varchar(40) DEFAULT NULL,
  `titulo` text NOT NULL,
  `descripcion` mediumtext NOT NULL,
  `geo_local` text NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `img` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicio_emprendedor`
--

CREATE TABLE `servicio_emprendedor` (
  `id_emp` int(11) NOT NULL,
  `correo` varchar(30) DEFAULT NULL,
  `nombre_cat` varchar(30) DEFAULT NULL,
  `nombre_subcat` varchar(30) DEFAULT NULL,
  `titulo` text NOT NULL,
  `descripcion` mediumtext NOT NULL,
  `ubicacion` text NOT NULL,
  `contacto_tel` varchar(30) NOT NULL,
  `contacto_correo` varchar(30) NOT NULL,
  `redsocial` text NOT NULL,
  `sernatur` text DEFAULT NULL,
  `img` text DEFAULT NULL,
  `solicitud` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subcategoria`
--

CREATE TABLE `subcategoria` (
  `nombre_subcat` varchar(30) NOT NULL,
  `nombre_cat` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `correo` varchar(40) NOT NULL,
  `contrasena` varchar(20) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 0,
  `tipo` enum('admin','emprendedor') DEFAULT 'emprendedor'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`correo`, `contrasena`, `nombre`, `telefono`, `estado`, `tipo`) VALUES
('admin@admin.cl', '123', 'Nombre', '91234567', 1, 'admin'),
('emprendedor@emprendedor.cl', '123', 'Nombre', '91234567', 1, 'emprendedor');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `atractivo_admin`
--
ALTER TABLE `atractivo_admin`
  ADD PRIMARY KEY (`id_atractivo`),
  ADD KEY `correo` (`correo`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`nombre_cat`);

--
-- Indices de la tabla `servicio_admin`
--
ALTER TABLE `servicio_admin`
  ADD PRIMARY KEY (`id_servicio`),
  ADD KEY `correo` (`correo`);

--
-- Indices de la tabla `servicio_emprendedor`
--
ALTER TABLE `servicio_emprendedor`
  ADD PRIMARY KEY (`id_emp`),
  ADD KEY `correo` (`correo`),
  ADD KEY `nombre_cat` (`nombre_cat`),
  ADD KEY `nombre_subcat` (`nombre_subcat`);

--
-- Indices de la tabla `subcategoria`
--
ALTER TABLE `subcategoria`
  ADD PRIMARY KEY (`nombre_subcat`),
  ADD KEY `nombre_cat` (`nombre_cat`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `atractivo_admin`
--
ALTER TABLE `atractivo_admin`
  MODIFY `id_atractivo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `servicio_admin`
--
ALTER TABLE `servicio_admin`
  MODIFY `id_servicio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `servicio_emprendedor`
--
ALTER TABLE `servicio_emprendedor`
  MODIFY `id_emp` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `atractivo_admin`
--
ALTER TABLE `atractivo_admin`
  ADD CONSTRAINT `atractivo_admin_ibfk_1` FOREIGN KEY (`correo`) REFERENCES `usuario` (`correo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `servicio_admin`
--
ALTER TABLE `servicio_admin`
  ADD CONSTRAINT `servicio_admin_ibfk_1` FOREIGN KEY (`correo`) REFERENCES `usuario` (`correo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `servicio_emprendedor`
--
ALTER TABLE `servicio_emprendedor`
  ADD CONSTRAINT `servicio_emprendedor_ibfk_1` FOREIGN KEY (`correo`) REFERENCES `usuario` (`correo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `servicio_emprendedor_ibfk_2` FOREIGN KEY (`nombre_cat`) REFERENCES `categoria` (`nombre_cat`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `servicio_emprendedor_ibfk_3` FOREIGN KEY (`nombre_subcat`) REFERENCES `subcategoria` (`nombre_subcat`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `subcategoria`
--
ALTER TABLE `subcategoria`
  ADD CONSTRAINT `subcategoria_ibfk_1` FOREIGN KEY (`nombre_cat`) REFERENCES `categoria` (`nombre_cat`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
