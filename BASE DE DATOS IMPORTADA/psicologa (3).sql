-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-11-2024 a las 20:30:22
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `psicologa`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historia_clinica`
--

CREATE TABLE `historia_clinica` (
  `id_hc` int(11) NOT NULL,
  `id_paciente` int(11) NOT NULL,
  `fecha_registro` date NOT NULL,
  `descripcion` varchar(300) NOT NULL,
  `tratamiento` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `historia_clinica`
--

INSERT INTO `historia_clinica` (`id_hc`, `id_paciente`, `fecha_registro`, `descripcion`, `tratamiento`) VALUES
(1, 1, '2024-11-06', 'Le gusta tomar', 'Alcoholico'),
(2, 2, '2024-11-07', 'problemas con las mujeres', 'Psicologico'),
(3, 3, '2024-11-07', 'Problemas con la comida', 'Dieta'),
(4, 4, '2024-11-07', 'Vino amanecido', 'No duerme');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pacientes`
--

CREATE TABLE `pacientes` (
  `Id_pacientes` int(11) NOT NULL,
  `nombre_paciente` varchar(70) NOT NULL,
  `apellido_paciente` varchar(70) NOT NULL,
  `fecha_nac` date NOT NULL,
  `telefono` int(70) NOT NULL,
  `domicilio` varchar(100) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `imagen` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pacientes`
--

INSERT INTO `pacientes` (`Id_pacientes`, `nombre_paciente`, `apellido_paciente`, `fecha_nac`, `telefono`, `domicilio`, `usuario_id`, `imagen`) VALUES
(1, 'Carlos', 'Acuña', '1981-10-09', 42120555, 'Los Nogales', 1, '1730837184385.jpg'),
(2, 'Dario', 'Diaz', '2015-10-14', 1145658899, 'Turdera 2020', 1, ''),
(3, 'Luis', 'Trech', '1981-10-09', 1154568988, 'La Querencia 2225', 3, ''),
(4, 'Dario', 'Galan', '2015-10-14', 1145658899, 'Turdera 3030', 1, ''),
(15, 'Luis', 'Trech', '1981-10-09', 1154568988, 'La Querencia 2225', 6, ''),
(16, 'Ulises', 'Galan', '1981-10-09', 4545658, 'San Joaquin', 6, '1730488969451.jfif');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id_rol` int(11) NOT NULL,
  `nombre_rol` varchar(70) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id_rol`, `nombre_rol`) VALUES
(1, 'Administrador'),
(2, 'Paciente'),
(3, 'Prueba 2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol_por_usuario`
--

CREATE TABLE `rol_por_usuario` (
  `id_usuarios` int(11) NOT NULL,
  `id_rol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rol_por_usuario`
--

INSERT INTO `rol_por_usuario` (`id_usuarios`, `id_rol`) VALUES
(1, 2),
(3, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_sesion`
--

CREATE TABLE `tipo_sesion` (
  `id_tipo_sesion` int(11) NOT NULL,
  `nombre_sesion` varchar(70) NOT NULL,
  `precio_sesion` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_sesion`
--

INSERT INTO `tipo_sesion` (`id_tipo_sesion`, `nombre_sesion`, `precio_sesion`) VALUES
(1, 'Presencial', 10000.00),
(2, 'Telefonica', 9000.00),
(3, 'En linea', 8000.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuarios` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contraseña` varchar(70) NOT NULL,
  `fecha_baja` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuarios`, `email`, `contraseña`, `fecha_baja`) VALUES
(1, 'luis@gmail.com', '$2b$08$8CM9xme9GqwlStNPiFWHeOLTcrIKVKOqG1AMg2VJL/7ekv3pfjVHW', NULL),
(3, 'tanke2@gmail.com', '$2b$08$qMMVwKc9HWUNTch353uA4unM/yUvG6h7BolKFQHiRZlDOE.IItosS', NULL),
(4, 'rilas@gmail.com', '123456', NULL),
(5, 'miguel@gmail.com', '123456', NULL),
(6, 'robertosediño@gmail.com', '1234', NULL),
(7, 'batata@gmail.com', '123456', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `historia_clinica`
--
ALTER TABLE `historia_clinica`
  ADD PRIMARY KEY (`id_hc`),
  ADD KEY `id_paciente` (`id_paciente`);

--
-- Indices de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`Id_pacientes`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `rol_por_usuario`
--
ALTER TABLE `rol_por_usuario`
  ADD KEY `id_usuarios` (`id_usuarios`),
  ADD KEY `id_rol` (`id_rol`);

--
-- Indices de la tabla `tipo_sesion`
--
ALTER TABLE `tipo_sesion`
  ADD PRIMARY KEY (`id_tipo_sesion`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuarios`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `historia_clinica`
--
ALTER TABLE `historia_clinica`
  MODIFY `id_hc` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `Id_pacientes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tipo_sesion`
--
ALTER TABLE `tipo_sesion`
  MODIFY `id_tipo_sesion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuarios` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `historia_clinica`
--
ALTER TABLE `historia_clinica`
  ADD CONSTRAINT `historia_clinica_ibfk_1` FOREIGN KEY (`id_paciente`) REFERENCES `pacientes` (`Id_pacientes`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD CONSTRAINT `pacientes_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id_usuarios`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `rol_por_usuario`
--
ALTER TABLE `rol_por_usuario`
  ADD CONSTRAINT `rol_por_usuario_ibfk_1` FOREIGN KEY (`id_usuarios`) REFERENCES `usuarios` (`id_usuarios`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `rol_por_usuario_ibfk_2` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
