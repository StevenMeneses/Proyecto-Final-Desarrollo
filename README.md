# 🛍️ Joyería Online - E-commerce  

Este proyecto consiste en el desarrollo de una **plataforma de comercio electrónico de joyería**, con funcionalidades de catálogo, carrito de compras, gestión de pedidos y administración de usuarios.  

---

## 🚀 Tecnologías utilizadas  

### Backend  
- **Spring Boot** (Java) – Framework principal para la lógica de negocio y APIs REST.  
- **IntelliJ IDEA** – IDE de desarrollo.  
- **MySQL** – Base de datos relacional para almacenamiento de información.  

### Frontend  
- **Vite + React** – Framework moderno para el desarrollo de la interfaz de usuario.  
- **CSS/Tailwind** – Estilos y diseño responsivo.  

### Despliegue (sugerido)  
- **AWS EC2** – Servidor de aplicación.  
- **AWS RDS** – Base de datos en la nube.  
- **AWS S3** – Almacenamiento de imágenes de productos.  

---

## 👥 Roles del sistema  

### Cliente  
- Registrarse e iniciar sesión.  
- Visualizar catálogo de productos.  
- Agregar productos al carrito.  
- Realizar pedidos y dar seguimiento a su estado.  
- Ver y editar su información personal.  
- Eliminar su cuenta.  

### Vendedor  
- Visualizar y editar productos.  
- Actualizar estado de pedidos.  
- Consultar pedidos por cliente (DNI o código de venta).  
- Consultar boletas/facturas.  

### Administrador  
- Gestionar clientes (visualizar, editar, eliminar, buscar por DNI).  
- Gestionar productos (visualizar, agregar, modificar, eliminar, buscar por código).  
- Visualizar ventas realizadas y acceder a boletas/facturas.  
- Gestionar personal de ventas (visualizar, agregar, modificar, eliminar, búsqueda por código de vendedor).  

---

## 📂 Arquitectura  

El proyecto sigue el **patrón de diseño MVC (Modelo - Vista - Controlador)**:  
- **Modelo**: Entidades como Producto, Pedido, Venta, Usuario, etc.  
- **Vista**: Interfaz desarrollada con React + Vite.  
- **Controlador**: Endpoints REST con Spring Boot.  

---

## 🗄️ Base de datos  

Se implementó en **MySQL**, con tablas principales como:  
- `Usuario`, `Rol`  
- `Producto`, `CategoriaProducto`, `Material`, `Coleccion`  
- `Pedido`, `DetallePedido`, `EstadoPedido`  
- `Venta`, `Boleta`, `Factura`  

---

## 📦 Instalación y ejecución  

### Backend (Spring Boot)  
```bash
# Clonar repositorio
git clone https://github.com/nayy123/JoyeriaMarly-App.git

# Entrar al proyecto backend
cd backend

# Compilar y ejecutar
./mvnw spring-boot:run
```

### Frontend (React + Vite)
```bash
# Entrar al proyecto frontend
cd Joyeria_Marly_Frontend

# Instalar dependencias
npm install

# Ejecutar en entorno local
npm run dev
```

### Base de datos (MySQL)
- Crear una base de datos llamada joyeriaBD.
- Ejecutar el script SQL de creación de tablas (disponible en /db).
- Configurar credenciales en application.properties de Spring Boot.

```bash
spring.datasource.url=jdbc:mysql://localhost:3306/joyeriaBD
spring.datasource.username=root
spring.datasource.password=tu_password
spring.jpa.hibernate.ddl-auto=update
```
