-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-07-2025 a las 15:53:33
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
(4, 4, '2024-11-07', 'Vino amanecido', 'No duerme'),
(5, 26, '2025-05-01', 'Sabe nadar, de nada', 'le tiene miedo'),
(11, 25, '2025-04-28', 'Le duele el cuello, mucho mucho', 'Siente dolor de cabeza'),
(20, 19, '2025-05-30', 'Mira mucha tv Siempre', 'Apagar la tv futbol'),
(22, 30, '2025-05-06', 'le duele la pancita', 'Tafirol'),
(23, 20, '2025-05-18', 'Le gusta tomar', 'Cerrar el kiosco'),
(25, 24, '2025-05-29', 'Sigue con tos', 'Catarro no sirve');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes_inicio`
--

CREATE TABLE `imagenes_inicio` (
  `id_imagen` int(11) NOT NULL,
  `nombre_img` varchar(255) NOT NULL,
  `tipo` enum('principal','frase') DEFAULT 'principal',
  `frase` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `imagenes_inicio`
--

INSERT INTO `imagenes_inicio` (`id_imagen`, `nombre_img`, `tipo`, `frase`) VALUES
(30, '1750280221871-hero.jfif', 'principal', NULL),
(31, '', 'frase', '\"La curiosa paradoja es que cuando me acepto a mí mismo, puedo cambiar.\" - Carl Rogers. '),
(32, '', 'frase', '\"El mayor error que puedes cometer en la vida es tener miedo de cometer errores.\" - Elbert Hubbard. ');

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
(1, 'Damian', 'Acuña', '1981-10-09', 42120555, 'Los Nogales', 1, '1730837184385.jpg'),
(2, 'Dario', 'Diaz', '2015-10-14', 1145658899, 'Turdera 2020', 1, '1744322248148.jpg'),
(3, 'Martin', 'Julio', '1981-10-09', 1154568988, 'La Querencia 2225', 3, ''),
(4, 'Sebastian', 'Galan', '2015-10-14', 1145658899, 'Turdera 3030', 1, ''),
(15, 'Luis', 'Trech', '1981-10-09', 1154568988, 'La Querencia 2225', 6, ''),
(16, 'Ulises', 'Galan', '1981-10-09', 4545658, 'San Joaquin', 6, '1730488969451.jfif'),
(18, 'Claudio', 'Ferrante', '2024-10-16', 41233333, 'querenci 2233', 15, ''),
(19, 'Veronica', 'Castro', '1999-10-16', 41233333, 'querenci 2233', 16, '1749668366334.jpg'),
(20, 'Roberto', 'Lopez', '2024-11-12', 23131231, 'Los nogales 222', 17, '1731457371412.webp'),
(21, 'Roman', 'Juan Roman', '2024-09-10', 2147483647, 'San Joaquin 202', 18, '1748458653999.jpg'),
(22, 'Daniela', 'Mercuri', '1988-06-05', 1169395753, 'Donato Alvarez 225', 19, '1744140515237.jpg'),
(23, 'Analia', 'Lugones', '1965-10-04', 45456688, 'Bolivar 4534', 20, '1744324154438.jpg'),
(24, 'Nilda', 'Meza', '1956-04-12', 42120254, 'calle 899 nro2122', 21, ''),
(25, 'Giselle', 'Trech', '1979-04-30', 1154256658, 'Chile nro2122', 22, ''),
(26, 'Ruperto', 'Juarez', '1944-06-05', 42120555, 'esteban Cabral 1212', 24, '1748549810634.jpg'),
(27, 'Ricardo', 'Centurio', '2001-02-01', 42120555, 'Donato Alvarez 2222', 25, '1745517462283.jpg'),
(28, 'Marcial', 'Barrios', '1988-05-04', 45658899, 'La Querencia 2355', 26, ''),
(29, 'luis', 'trech', '1988-06-05', 1145658899, 'Donato Alvarez 2222', 27, ''),
(30, 'Fernando', 'Gago', '1980-05-04', 42120555, 'Brandsen 805', 28, '1750279884740.jfif'),
(31, 'Nancy', 'Vera', '1980-12-01', 1131148114, 'Donato alvarez 1156', 29, '1749668518575.jpg'),
(32, 'Nancy', 'Vera', '1980-01-13', 42120555, 'Donato Alvarez', 30, '1747754473259.jpg'),
(33, 'Diego Armando', 'Maradona', '1967-10-30', 1156558975, 'Fiorito 222', 31, '1751493546112.png');

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
(11, 'Cliente2');

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
(3, 2),
(24, 1),
(25, 2),
(26, 2),
(6, 2),
(27, 2),
(16, 2),
(18, 1),
(28, 2),
(17, 2),
(29, 1),
(30, 2),
(31, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios`
--

CREATE TABLE `servicios` (
  `id_servicio` int(11) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `descripcion` text NOT NULL,
  `imagen` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `servicios`
--

INSERT INTO `servicios` (`id_servicio`, `titulo`, `descripcion`, `imagen`) VALUES
(1, 'niños', 'mayores', '1751321812019.jfif'),
(2, 'mis 1er año', 'caminan  mmm', '1751322047977.jpg'),
(4, 'Atencion a Mayores', 'Abuelitos', '1751467760526.jfif');

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
  `contrasena` varchar(70) NOT NULL,
  `fecha_baja` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuarios`, `email`, `contrasena`, `fecha_baja`) VALUES
(1, 'luis2245@gmail.com', '$2b$08$g9wIc6qfFiXCRFGGk.I8K.37lxz/JcVz4EhGP1bIezGe9T76JUxfu', '2025-04-24'),
(3, 'lopez3432@gmail.com', '$2b$08$q9f8Jn8wuhlcc4Jgu52Wj.7a3sT4PmE/IHB.TNOylS6BjOX/onYle', '2025-05-21'),
(4, 'rilas@gmail.com', '123456', NULL),
(5, 'miguel@gmail.com', '123456', NULL),
(6, 'robertosedino@gmail.com', '1234', '2025-05-20'),
(7, 'batata@gmail.com', '123456', NULL),
(9, 'usuario3@ejemplo.com', '$2b$08$qd96QmvGQFp9/Fuz.8WAb.qIImzdXQ4gUmnqJ9jEuCFOdkmdSRHZG', NULL),
(10, 'lezcano@gmail.com', '$2a$08$3Sum.mkxC5Z0fhrHegfwPOvQZRRc1zf/xnBs41y/pCJw4RCf7cmdO', NULL),
(11, 'lezcano3@gmail.com', '$2a$08$1RVSQrm5/NxxPWqfuux.9OfZNR8q0.mmDDZQ9glENsHfD2A05e.fK', NULL),
(12, 'emil44@gmail.com', '$2a$08$aKFj/yM3Yifngvdp2jvvcuS62PMwUeeuYV0HtxGrfn.EgXLfW99E2', NULL),
(13, 'pestaas@gmail.com', '$2a$08$5Xe1O/HjkVxToG78Ay3ZaeRiRQw6I6O8QMKsWV.pVIIcGUVycm5We', NULL),
(14, 'potros@gmail.com', '$2a$08$d9YYtSx1L6IgeCkaGil8ceYCIVOcTiRBgJTzpQ9RePn64aXfyoYki', NULL),
(15, 'claudito22@gmail.com', '$2a$08$G/T8uXPjyIB6X4U5DxguF.ATRVb0uEfajJljDfHC4YPNJby.7YcZC', '2025-04-24'),
(16, 'claudito22@gmail.com', '$2a$08$QED6NJXHtKMZqrAWMzm0..8eEaqGbzjr37qW58dzramEOEEM./Zne', NULL),
(17, 'Roberto@gmail.com', '$2a$08$jadXuoH1yosgCtaKdHTH.OJrE38qX7DI7Zgx92IdoT15suEwO4pja', NULL),
(18, 'luistrech8@gmail.com', '$2a$08$ASjHottCIURumGUfjgvGwuGdt4supxjNwh9i1ApsE1ix30nhjuxd2', NULL),
(19, 'danielamercuri@gmail.com', '$2a$08$OgWzFU1ZeTuu4bXFIzpHNOEYoprJRXE0Mul4XXAlq1IpInj9lUFuy', NULL),
(20, 'analialugones@gmail.com', '$2a$08$YsqqIzVd7ulRzCkfZC8tW.xg/Zyc5zxUMg0CS0ofDvmQgUfGT6RRe', NULL),
(21, 'lamechi@gmail.com', '$2a$08$epnPzfnHgsw.OOfQfjC1xOdBYAItzr/McgvMeXHgpFUQNNo7LEqI.', NULL),
(22, 'danielatrech@gmail.com', '$2a$08$udW43crAiGHooSdBh4yZvOQ.drmjAOnXdoNbT2evusXwcvAUemYQK', NULL),
(23, 'Pedro@gmail.com', '$2a$08$WmEgHJB3JAdF7y1qbdcUweObKjhei.URj6KlV2zMAQG37UhGAKiQK', NULL),
(24, 'Pedro2@gmail.com', '$2a$08$da6mj9QSBWqdtmbUH4LniOft6CY6xRT082duss7jXllINRkegG9.u', NULL),
(25, 'riky@gmail.com', '$2a$08$wXJzBPWXo3k8tt9U06Au7OxD3O2msFXzNmx1Hj/VN.rcdbOsdu74G', NULL),
(26, 'Marcial@gmail.com', '$2a$08$5okl8duUfOhkGql3GJPjp.vITV8XUedRPVWwO6ZEXhVKC96Zo7sBi', NULL),
(27, 'luistrech9@gmail.com', '$2a$08$OqIjlvp77y9aCKXBDbyLiuJTTuw.bZSWeRgF1T/GU0gPcgeE0QqH6', '2025-04-24'),
(28, 'gago@gmail.com', '$2a$08$WUt41BF0hQUjfKx/wvkENOaKU1AFi5iXVZp09x5.3IeX5BK80fxAG', NULL),
(29, 'nancyvera@gmail.com', '$2a$08$/ISQYqofsOJMyOvzIikV6uhSde7Z94R6C6XFW5txQiNyUEAUwBw2S', NULL),
(30, 'nancyvera2@gmail.com', '$2a$08$bLUkhyhKXfWvBuF3GRwwxuFOTjY6xrPj0tKXosteJ6c7zgKOZ4fkm', NULL),
(31, 'diegomaradona@gmail.com', '$2a$08$izIfR2I3EpJxMp0cmf7/.uUu9nRk3IkoNQ0.SvIVEJ9FPg1.chhya', NULL);

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
-- Indices de la tabla `imagenes_inicio`
--
ALTER TABLE `imagenes_inicio`
  ADD PRIMARY KEY (`id_imagen`);

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
-- Indices de la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD PRIMARY KEY (`id_servicio`);

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
  MODIFY `id_hc` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `imagenes_inicio`
--
ALTER TABLE `imagenes_inicio`
  MODIFY `id_imagen` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `Id_pacientes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `servicios`
--
ALTER TABLE `servicios`
  MODIFY `id_servicio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tipo_sesion`
--
ALTER TABLE `tipo_sesion`
  MODIFY `id_tipo_sesion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuarios` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

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
