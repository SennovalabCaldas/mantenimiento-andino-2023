const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { API_VERSION } = require("./constants");
const https = require("https");
const fs = require("fs");
const app = express();

/* Cargar rutas */
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const sedeRoutes = require("./routes/sede");
const addressRoutes = require("./routes/address");
const categoryRoutes = require("./routes/category");
const postRoutes = require("./routes/post");
const serviceRoutes = require("./routes/service");
const clientRoutes = require("./routes/client");

// Configure Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure static folder
app.use(express.static("uploads"));
app.use("/uploads", express.static("uploads"));

// Configurar encabezados CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // Cambia esto a tu URL de la aplicación cliente
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  ); // Agrega los métodos permitidos
  next();
});

app.use(`/api/${API_VERSION}/auth`, authRoutes);
app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}/addresses`, addressRoutes);
app.use(`/api/${API_VERSION}/sedes`, sedeRoutes);
app.use(`/api/${API_VERSION}/admin/posts`, postRoutes);
app.use(`/api/${API_VERSION}/admin/categories`, categoryRoutes);
app.use(`/api/${API_VERSION}/admin/services`, serviceRoutes);
app.use(`/api/${API_VERSION}/admin/clients`, clientRoutes);


// Obtener la ruta absoluta de la carpeta actual
const currentFolder = __dirname;
// Validar existencia de archivos key y cert
const keyPath = `../../../home/mntoandino/ssl/keys/99ac9_7e515_50f723af66f148b2e2702d04606367b8.key`;
const certPath = `../../../home/mntoandino/ssl/certs/mantenimientoandino_co_99ac9_7e515_1725333050_fce0bdb052c6f002fe715187c3422759.crt`;
if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
  console.log("Archivos de clave y certificado encontrados.");
  // Crear servidor HTTPS solo si los archivos existen
  const httpsOptions = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath),
  };
  const httpsServer = https.createServer(httpsOptions, app);

  const PORT = process.env.PORT || 8080;
  httpsServer.listen(PORT, () => {
    console.log(`${currentFolder}`);
    console.log(`${currentFolder}/../ssl/certs/`);
    console.log("######################");
    console.log("###### API REST ######");
    console.log("######################");
    console.log(`https://localhost:${PORT}/api/${API_VERSION}`);
  });
} else {
  console.log(`${currentFolder}`);
    console.log(`${currentFolder}/../ssl/certs/`);
  console.error("No se encontraron archivos de clave y certificado.");
  console.error("No se puede iniciar el servidor HTTPS.");
}

module.exports = app;
