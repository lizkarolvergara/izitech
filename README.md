# Proyecto IziTech - Tienda de Tecnología Online

## Descripción del Proyecto
Este proyecto fue desarrollado como parte del curso **Análisis y Desarrollo de Sistemas Orientados a Objetos** de la carrera de **Desarrollo de Software**. IziTech es una tienda en línea de productos tecnológicos avanzados, como laptops, smartphones y accesorios. 

El sistema permite a los usuarios navegar por los productos disponibles, realizar compras en línea, y a la empresa gestionar los productos y las ventas a través de un panel de administración.

## Autores
- **Liz Karol Vergara**
- **Rodrigo Santos Toribio**

## Requerimientos Funcionales
1. Registro de usuarios y autenticación.
2. Navegación de productos.
3. Carrito de compras.
4. Proceso de compra.
5. Métodos de pago.
6. Generación de comprobantes de pago.
7. Panel de administración para la empresa.

## Tecnologías Utilizadas
- **Frontend**: React.js
- **Backend**: Node.js
- **Base de datos**: SQLite

## Estructura del Proyecto
- **Backend**: Se encuentra en la carpeta `backend`, que incluye:
  - Base de datos SQLite.
  - Configuración y conexión del servidor.
- **Frontend**: Los componentes de la aplicación están organizados en la carpeta `src/components`.

## Instalación
### Dependencias

#### Dentro de la carpeta `backend`:
```bash
npm install express sqlite3 cors body-parser
npm install jspdf jspdf-autotable
```

#### Dentro de la carpeta `src`:
```bash
npm install axios
```

### Ejecución
1. Abre dos terminales.
2. En la primera terminal, navega a la carpeta `backend` y ejecuta:
   ```bash
   node server.js
   ```
3. En la segunda terminal, en la carpeta raíz del proyecto, ejecuta:
   ```bash
   npm run dev
   ```
   Esto abrirá la aplicación en el navegador usando un servidor local.

### Acceso al Panel de Administración
- **Correo**: `admin@admin.com`
- **Contraseña**: `admin`

## Funcionalidades Principales
- Registro de usuarios y acceso autenticado.
- Navegación y búsqueda de productos tecnológicos.
- Gestión de un carrito de compras.
- Generación de comprobantes de pago en PDF.
- Panel de administración para gestionar productos y órdenes.

## Diagrama entidad-relación:

![image](https://github.com/user-attachments/assets/bafdd179-950f-4456-a593-45971ddbcb16)

Gracias por visitar nuestro proyecto.
