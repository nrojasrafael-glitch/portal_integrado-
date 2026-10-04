-- Crear la base de datos del proyecto
CREATE DATABASE IF NOT EXISTS restauradores_memoria;
USE restauradores_memoria;

-- 1. Tabla de Usuarios
CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol ENUM('administrador', 'estudiante', 'visitante') DEFAULT 'visitante',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabla de Objetos del Museo Virtual (Modelos 3D)
CREATE TABLE objetos_museo (
    id_objeto INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descripcion TEXT,
    autor_estudiante VARCHAR(100),
    categoria VARCHAR(50),
    archivo_3d_url VARCHAR(255) NOT NULL, -- Ruta al archivo .glb / .gltf
    imagen_previa_url VARCHAR(255),
    fecha_creacion DATE,
    id_usuario_registro INT,
    FOREIGN KEY (id_usuario_registro) REFERENCES usuarios(id_usuario) ON DELETE SET NULL
);

-- 3. Tabla de Publicaciones / Noticias y Eventos
CREATE TABLE publicaciones (
    id_publicacion INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    contenido TEXT NOT NULL,
    categoria ENUM('Prensa', 'Salida Pedagógica', 'Evento', 'Reconocimiento') NOT NULL,
    imagen_url VARCHAR(255),
    fecha_publicacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_autor INT,
    FOREIGN KEY (id_autor) REFERENCES usuarios(id_usuario) ON DELETE SET NULL
);

-- Insertar datos de prueba iniciales
INSERT INTO usuarios (nombre, email, password, rol) 
VALUES ('Administrador Tom Adams', 'admin@tomadams.edu.co', 'hash_password_seguro', 'administrador');

INSERT INTO objetos_museo (titulo, descripcion, autor_estudiante, categoria, archivo_3d_url) 
VALUES ('Vasija de la Memoria', 'Objeto representativo creado mediante fotogrametría.', 'Grupo Restauradores', 'Cerámica', 'modelos/vasija.glb');

INSERT INTO publicaciones (titulo, contenido, categoria, imagen_url, id_autor) 
VALUES ('Nueva Exposición', 'Se lanza la nueva exposición sobre la historia de la cerámica local.', 'Prensa', 'imagenes/exposicion.jpg', 1);