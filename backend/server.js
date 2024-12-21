const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/laptops", express.static(path.join(__dirname, "images/laptops")));
app.use("/smartphones", express.static(path.join(__dirname, "images/smartphones")));
app.use("/accesorios", express.static(path.join(__dirname, "images/accesorios")));

// Conexión a SQLite
const db = new sqlite3.Database("./database.sqlite", (err) => {
  if (err) {
    console.error("Error al conectar con SQLite:", err.message);
  } else {
    console.log("Conexión establecida con la base de datos SQLite.");
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});



/* RUTA PARA BUSCAR PRODUCTO POR ID */
app.get("/producto/:id", (req, res) => {
  const { id } = req.params;

  const query = `
    SELECT 
      p.idProducto, 
      p.nombre AS nombreProducto, 
      p.descripcion, 
      p.precio, 
      p.stock, 
      p.imagen, 
      c.nombre AS nombreCategoria
    FROM PRODUCTO p
    JOIN CATEGORIA c ON p.idCategoria = c.idCategoria
    WHERE p.idProducto = ?`;

  db.get(query, [id], (err, row) => {
    if (err) {
      console.error("Error al obtener el producto:", err.message);
      res.status(500).json({ error: "Error al obtener el producto" });
    } else if (!row) {
      res.status(404).json({ error: "Producto no encontrado" });
    } else {
      res.json(row);
    }
  });
});



//LIZ 

// Ruta para confirmar compra
// Ruta para confirmar compra
// Ruta para confirmar compra
// RUTA PARA CONFIRMAR COMPRA
app.post("/confirmar-compra", (req, res) => {
  const { idUsuario, direccion, nombre, telefono, referencia, productos } = req.body;

  // Validación inicial de datos
  if (!idUsuario || !direccion || !nombre || !telefono || !productos || productos.length === 0) {
    return res.status(400).json({ error: "Todos los campos son obligatorios, incluyendo productos." });
  }

  // Verificar si hay suficiente stock de todos los productos antes de comenzar la transacción
  const verificarStock = (producto, callback) => {
    const { idProducto, cantidad } = producto;
    const queryStock = `SELECT stock FROM PRODUCTO WHERE idProducto = ?`;

    db.get(queryStock, [idProducto], (err, row) => {
      if (err) {
        console.error("Error al verificar el stock:", err.message);
        return callback(err);
      }
      if (!row || row.stock < cantidad) {
        return callback(new Error(`No hay suficiente stock para el producto ${idProducto}. Stock disponible: ${row ? row.stock : 0}`));
      }
      callback(null);
    });
  };

  // Verificar el stock de todos los productos
  let stockError = false;
  let errorMessage = "";

  for (const producto of productos) {
    verificarStock(producto, (err) => {
      if (err) {
        stockError = true;
        errorMessage = err.message;
        return; // Salir del ciclo si hay error de stock
      }
    });

    if (stockError) {
      return res.status(400).json({ error: errorMessage });
    }
  }

  // Si no hay errores de stock, continuar con la compra
  const total = productos.reduce((sum, prod) => {
    if (!prod.idProducto || !prod.cantidad || !prod.precio_unitario) {
      console.error("Producto inválido detectado:", prod);
      return NaN; // Marcar error si falta algún campo
    }
    return sum + prod.cantidad * prod.precio_unitario;
  }, 0);

  if (isNaN(total)) {
    return res.status(400).json({ error: "Datos de productos incompletos o inválidos." });
  }

  // Iniciar transacción
  db.serialize(() => {
    db.run("BEGIN TRANSACTION");

    // Insertar en la tabla CARRITO
    const queryCarrito = `INSERT INTO CARRITO (idUsuario, fecha_creacion, estado) VALUES (?, datetime('now'), 'activo')`;

    db.run(queryCarrito, [idUsuario], function (err) {
      if (err) {
        console.error("Error al insertar en CARRITO:", err.message);
        db.run("ROLLBACK");
        return res.status(500).json({ error: "Error al crear el carrito." });
      }

      const idCarrito = this.lastID;

      // Insertar productos en DETALLE_CARRITO
      const queryDetalleCarrito = `INSERT INTO DETALLE_CARRITO (idCarrito, idProducto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)`;
      const stmt = db.prepare(queryDetalleCarrito);
      let detalleError = false;

      for (const producto of productos) {
        const { idProducto, cantidad, precio_unitario } = producto;

        stmt.run(idCarrito, idProducto, cantidad, precio_unitario, (err) => {
          if (err) {
            console.error("Error al insertar en DETALLE_CARRITO:", err.message);
            detalleError = true;
          }
        });

        if (detalleError) break; // Detener si hay errores
      }

      stmt.finalize((err) => {
        if (err || detalleError) {
          console.error("Error al finalizar la inserción en DETALLE_CARRITO:", err?.message);
          db.run("ROLLBACK");
          return res.status(500).json({ error: "Error al agregar productos al carrito." });
        }

        // Actualizar el stock de los productos comprados
        const queryActualizarStock = `UPDATE PRODUCTO SET stock = stock - ? WHERE idProducto = ?`;
        const stmtActualizarStock = db.prepare(queryActualizarStock);
        let stockError = false;

        productos.forEach((producto) => {
          const { idProducto, cantidad } = producto;

          stmtActualizarStock.run(cantidad, idProducto, (err) => {
            if (err) {
              console.error("Error al actualizar stock:", err.message);
              stockError = true;
            }
          });

          if (stockError) return;
        });

        stmtActualizarStock.finalize((err) => {
          if (err || stockError) {
            console.error("Error al finalizar la actualización de stock:", err?.message);
            db.run("ROLLBACK");
            return res.status(500).json({ error: "Error al actualizar el stock de los productos." });
          }

          // Insertar en ORDEN_VENTA
          const queryOrdenVenta = `INSERT INTO ORDEN_VENTA (idUsuario, fecha, total, estado) VALUES (?, datetime('now'), ?, 'pendiente')`;
          db.run(queryOrdenVenta, [idUsuario, total], function (err) {
            if (err) {
              console.error("Error al insertar en ORDEN_VENTA:", err.message);
              db.run("ROLLBACK");
              return res.status(500).json({ error: "Error al crear la orden de venta." });
            }

            const idOrdenVenta = this.lastID;

            // Insertar en FACTURACION
            const queryFacturacion = `INSERT INTO FACTURACION (idOrdenVenta, nombreFacturacion, direccion, referencia, telefono) VALUES (?, ?, ?, ?, ?)`;
            db.run(queryFacturacion, [idOrdenVenta, nombre, direccion, referencia, telefono], (err) => {
              if (err) {
                console.error("Error al insertar en FACTURACION:", err.message);
                db.run("ROLLBACK");
                return res.status(500).json({ error: "Error al guardar los datos de facturación." });
              }

              // Insertar en PAGO
              const queryPago = `INSERT INTO PAGO (idOrdenVenta) VALUES (?)`;
              db.run(queryPago, [idOrdenVenta], function (err) {
                if (err) {
                  console.error("Error al insertar en PAGO:", err.message);
                  db.run("ROLLBACK");
                  return res.status(500).json({ error: "Error al registrar el pago." });
                }

                const idPago = this.lastID;

                // Confirmar transacción
                db.run("COMMIT", (err) => {
                  if (err) {
                    console.error("Error al confirmar la transacción:", err.message);
                    return res.status(500).json({ error: "Error al confirmar la compra." });
                  }

                  res.status(201).json({
                    message: "Compra confirmada exitosamente.",
                    idCarrito,
                    idOrdenVenta,
                    idPago,
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});






//PAGOOOOOOOOOO
app.put("/actualizar-pago", (req, res) => {
  const { metodo_pago, tipo_documento, numero_documento } = req.body;

  // Validación inicial de datos
  if (!metodo_pago || !tipo_documento || !numero_documento) {
    return res.status(400).json({
      error: "Todos los campos (metodo_pago, tipo_documento, numero_documento) son obligatorios."
    });
  }

  // Consulta para actualizar el último idPago
  const queryActualizarPago = `
    UPDATE PAGO
    SET metodo_pago = ?, tipo_documento = ?, numero_documento = ?
    WHERE idPago = (SELECT MAX(idPago) FROM PAGO)
  `;

  // Ejecutar la consulta
  db.run(queryActualizarPago, [metodo_pago, tipo_documento, numero_documento], function (err) {
    if (err) {
      console.error("Error al actualizar el pago:", err.message);
      return res.status(500).json({ error: "Error al actualizar los datos del pago." });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "No se encontró un pago para actualizar." });
    }

    res.status(200).json({
      message: "Datos del pago actualizados exitosamente.",
      cambios: this.changes,
    });
  });
});






// LISTA DE USUARIOS EN EL PANEL DEL ADMIN ----LIZ

// Ruta para obtener la lista de clientes
// Ruta para obtener la lista de clientes, excluyendo los admins
app.get("/admin/clientes", (req, res) => {
  const query = `
    SELECT idUsuario, nombres, apellidos, correo, tipoDocumento, numeroDocumento, celular 
    FROM usuario
    WHERE rol != 'admin' 
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error("Error al obtener la lista de clientes:", err.message);
      res.status(500).json({ error: "Error al obtener la lista de clientes." });
    } else {
      res.json(rows);
    }
  });
});

/* RUTA PARA LISTAR PRODUCTOS */
app.get("/admin/productos", (req, res) => {
  const query = `
    SELECT 
      idProducto, 
      codigo, 
      nombre, 
      descripcion, 
      precio AS precioVenta, 
      stock, 
      idCategoria, 
      idMarca, 
      imagen
    FROM PRODUCTO
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error("Error al obtener productos:", err.message);
      res.status(500).json({ error: "Error al obtener productos." });
    } else {
      res.json(rows);
    }
  });
});

// Ruta para registrar un usuario
app.post("/registrate", (req, res) => {
  const { correo, nombre, apellido, documento, nrodoc, celular, contrasena } =
    req.body;

  if (!correo || !nombre || !apellido || !documento || !nrodoc || !contrasena) {
    return res
      .status(400)
      .json({ error: "Todos los campos son obligatorios." });
  }

  const query = `
    INSERT INTO usuario (correo, nombres, apellidos, tipoDocumento, numeroDocumento, celular, contrasena)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [
    correo,
    nombre,
    apellido,
    documento,
    nrodoc,
    celular,
    contrasena,
  ];

  db.run(query, params, function (err) {
    if (err) {
      console.error("Error al insertar en la base de datos:", err.message);
      return res.status(500).json({ error: "Error al registrar el usuario." });
    }
    res
      .status(201)
      .json({ message: "Usuario registrado exitosamente.", id: this.lastID });
  });
});

// Ruta para iniciar sesión
app.post("/iniciar-sesion", (req, res) => {
  const { correo, contrasena } = req.body;

  if (!correo || !contrasena) {
    return res
      .status(400)
      .json({ error: "Correo y contraseña son obligatorios." });
  }

  const query = `
    SELECT * FROM usuario WHERE correo = ? AND contrasena = ?
  `;
  const params = [correo, contrasena];

  db.get(query, params, (err, row) => {
    if (err) {
      console.error("Error al consultar la base de datos:", err.message);
      return res
        .status(500)
        .json({ error: "Error al consultar la base de datos." });
    }

    if (row) {
      res.status(200).json({
        message: "Inicio de sesión exitoso.",
        usuario: row, /* {
          nombre: row.nombres,
          correo: row.correo,
          id: row.id,
        }, */
      });
    } else {
      res.status(401).json({ error: "Correo o contraseña incorrectos." });
    }
  });
});

// Ruta para obtener productos de la categoría "smartphones"
app.get("/productos/smartphones", (req, res) => {
  const query = `
    SELECT p.idProducto, p.nombre, p.descripcion, p.precio, p.stock, p.imagen, c.nombre AS categoria
    FROM PRODUCTO p
    JOIN CATEGORIA c ON p.idCategoria = c.idCategoria
    WHERE c.nombre = 'Smartphones'
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error("Error al consultar productos:", err.message);
      res.status(500).json({ error: "Error al obtener productos." });
    } else {
      res.json(rows);
    }
  });
});


/* OBTENER LOS PRODUCTOS QUE SEAN LAPTOPS  */
app.get("/productos/laptops", (req, res) => {
  const query = `
    SELECT 
      P.idProducto,
      P.nombre AS nombreProducto,
      P.descripcion,
      P.precio,
      P.stock,
      P.imagen
    FROM PRODUCTO P
    JOIN CATEGORIA C ON P.idCategoria = C.idCategoria
    WHERE C.nombre = 'Laptops'
    ORDER BY P.nombre;
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error("Error al obtener productos de Laptops:", err.message);
      res.status(500).json({ error: "Error al obtener productos de Laptops." });
    } else {
      res.json(rows);
    }
  });
});


// Ruta para obtener productos de la categoría "accesorios"
app.get("/productos/accesorios", (req, res) => {
  const query = `
    SELECT p.idProducto, p.nombre, p.descripcion, p.precio, p.stock, p.imagen, c.nombre AS categoria
    FROM PRODUCTO p
    JOIN CATEGORIA c ON p.idCategoria = c.idCategoria
    WHERE c.nombre = 'Accesorios'
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error("Error al consultar accesorios:", err.message);
      res.status(500).json({ error: "Error al obtener accesorios." });
    } else {
      res.json(rows);
    }
  });
});


/* AUMENTADO POR RODRIGO 9-12 */
// Ruta para registrar un ingreso (producto existente o nuevo)
app.post("/admin/ingreso", (req, res) => {
  const { codigo, nombre, descripcion, precioCompra, cantidad, idCategoria, idMarca, imagen, precioVenta } = req.body;

  if (!codigo || !precioCompra || !cantidad) {
    return res.status(400).json({ error: "Código, precio de compra y cantidad son obligatorios." });
  }

  const fechaIngreso = new Date().toISOString();

  // Verificar si el producto ya existe por su código
  const queryProducto = `
    SELECT idProducto, stock, precio FROM PRODUCTO WHERE codigo = ?
  `;

  db.get(queryProducto, [codigo], (err, producto) => {
    if (err) {
      console.error("Error al consultar el producto:", err.message);
      return res.status(500).json({ error: "Error al consultar el producto." });
    }

    if (producto) {
      // Producto existe, sumar al stock actual y registrar ingreso
      const nuevoStock = producto.stock + parseInt(cantidad); // Aseguramos sumar como número

      let queryUpdateProducto = `
        UPDATE PRODUCTO
        SET stock = ?
      `;
      const params = [nuevoStock];

      // Si se proporciona un nuevo precio de venta, actualizarlo
      if (precioVenta) {
        queryUpdateProducto += `, precio = ?`;
        params.push(precioVenta);
      }

      queryUpdateProducto += ` WHERE idProducto = ?`;
      params.push(producto.idProducto);

      db.run(queryUpdateProducto, params, function (err) {
        if (err) {
          console.error("Error al actualizar el producto:", err.message);
          return res.status(500).json({ error: "Error al actualizar el producto." });
        }

        const queryIngreso = `
          INSERT INTO ingresos (idProducto, cantidad, precioCompra, fechaIngreso)
          VALUES (?, ?, ?, ?)
        `;

        db.run(queryIngreso, [producto.idProducto, cantidad, precioCompra, fechaIngreso], function (err) {
          if (err) {
            console.error("Error al registrar el ingreso:", err.message);
            return res.status(500).json({ error: "Error al registrar el ingreso." });
          }
          res.status(201).json({ message: "Ingreso registrado exitosamente." });
        });
      });
    } else {
      // Producto no existe, crearlo y registrar ingreso
      const queryInsertProducto = `
        INSERT INTO PRODUCTO (codigo, nombre, descripcion, precio, stock, idCategoria, idMarca, imagen)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;

      db.run(
        queryInsertProducto,
        [codigo, nombre, descripcion, precioVenta || 0, cantidad, idCategoria, idMarca, imagen],
        function (err) {
          if (err) {
            console.error("Error al registrar el producto:", err.message);
            return res.status(500).json({ error: "Error al registrar el producto." });
          }

          const idProducto = this.lastID;

          const queryIngreso = `
            INSERT INTO ingresos (idProducto, cantidad, precioCompra, fechaIngreso)
            VALUES (?, ?, ?, ?)
          `;

          db.run(queryIngreso, [idProducto, cantidad, precioCompra, fechaIngreso], function (err) {
            if (err) {
              console.error("Error al registrar el ingreso:", err.message);
              return res.status(500).json({ error: "Error al registrar el ingreso." });
            }
            res.status(201).json({ message: "Producto e ingreso registrados exitosamente." });
          });
        }
      );
    }
  });
});


//AGREGADO PARA EL PANEL DEL ADMIN!!!!
//PARA FACTURACION

// Ruta para obtener datos de la tabla "facturacion"
app.get("/facturacion", (req, res) => {
  const query = `
    SELECT idFacturacion, idOrdenVenta, nombreFacturacion, direccion, referencia, telefono
    FROM FACTURACION
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error("Error al obtener datos de facturación:", err.message);
      res.status(500).json({ error: "Error al obtener datos de facturación." });
    } else {
      res.json(rows);
    }
  });
});


// Ruta para obtener todos los carritos
app.get("/carritos", (req, res) => {
  const query = `
    SELECT idCarrito, idUsuario, fecha_creacion, estado
    FROM CARRITO
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error("Error al obtener los carritos:", err.message);
      res.status(500).json({ error: "Error al obtener los carritos." });
    } else {
      res.json(rows);
    }
  });
});

// Ruta para obtener los detalles de un carrito por ID
app.get("/carritos/:id/detalles", (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT idDetalleCarrito, idCarrito, idProducto, cantidad, precio_unitario
    FROM DETALLE_CARRITO
    WHERE idCarrito = ?
  `;

  db.all(query, [id], (err, rows) => {
    if (err) {
      console.error("Error al obtener los detalles del carrito:", err.message);
      res.status(500).json({ error: "Error al obtener los detalles del carrito." });
    } else {
      res.json(rows);
    }
  });
});

// Ruta para obtener todos los pagos
app.get("/pagos", (req, res) => {
  const query = `
    SELECT idPago, idOrdenVenta, metodo_pago, tipo_documento, numero_documento
    FROM PAGO
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error("Error al obtener los pagos:", err.message);
      res.status(500).json({ error: "Error al obtener los pagos." });
    } else {
      res.json(rows);
    }
  });
});

