// const mongoose = require("mongoose");
// const { app } = require("./app");
// const https = require("https");
// const fs = require("fs");

// require("dotenv").config();
// const {
//   DB_HOST,
//   DB_USER,
//   DB_PASSWORD,
//   DB_NAME,
//   API_VERSION,
//   IP_SERVER,
// } = require("./constants");

// let PORT = process.env.NODE_ENV === "production" ? 3000 : 3500;
// let uri =
//   process.env.NODE_ENV === "production"
//     ? `mongodb://${DB_USER}:${DB_PASSWORD}@72.167.135.41:27017/mnto-andino-db`
//     : `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;

// console.log("uri :>> ", uri);

// mongoose
//   .connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     dbName: "mnto-andino-db",
//   })
//   .then(() => {
//     console.log("Conexión a la base de datos exitosa");
//     if (process.env.NODE_ENV === "production") {
//       https
//         .createServer(
//           {
//             cert: fs.readFileSync('./certs/cert.crt'),
//             key: fs.readFileSync('./certs/cert.key'),
//           },
//           app
//         )
//         .listen(PORT, function () {
//           console.log(`https://${IP_SERVER}:${PORT}/api/${API_VERSION}`);
//         });
//     } else {
//       app.listen(PORT, () => {
//         console.log("######################");
//         console.log("###### API REST ######");
//         console.log("######################");
//         console.log(`http://${IP_SERVER}:${PORT}/api/${API_VERSION}`);
//       });
//     }
//   })
//   .catch((error) => {
//     console.error("Error conectando a la base de datos:", error);
//   });
const mongoose = require("mongoose");
const { app } = require("./app");
const https = require("https");
const http = require("http");
const fs = require("fs");

require("dotenv").config();
const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  API_VERSION,
  IP_SERVER,
} = require("./constants");

let PORT_HTTP = 3500; // Puerto para HTTP en desarrollo y producción
let PORT_HTTPS = 3000; // Puerto para HTTPS en producción

let uri =
  process.env.NODE_ENV === "production"
    ? `mongodb://${DB_USER}:${DB_PASSWORD}@72.167.135.41:27017/mnto-andino-db`
    : `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;

console.log("uri :>> ", uri);

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "mnto-andino-db",
  })
  .then(() => {
    console.log("Conexión a la base de datos exitosa");
    if (process.env.NODE_ENV === "production") {
      // Servidor HTTPS
      https
        .createServer(
          {
            cert: fs.readFileSync('./certs/cert.crt'),
            key: fs.readFileSync('./certs/cert.key'),
          },
          app
        )
        .listen(PORT_HTTPS, function () {
          console.log(`https://${IP_SERVER}:${PORT_HTTPS}/api/${API_VERSION}`);
        });

      // Redirigir HTTP a HTTPS
      http.createServer((req, res) => {
        res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
        res.end();
      }).listen(PORT_HTTP);

      console.log(`http://${IP_SERVER}:${PORT_HTTP}/api/${API_VERSION} será redirigido a HTTPS`);
    } else {
      // Servidor HTTP en desarrollo
      app.listen(PORT_HTTP, () => {
        console.log("######################");
        console.log("###### API REST ######");
        console.log("######################");
        console.log(`http://${IP_SERVER}:${PORT_HTTP}/api/${API_VERSION}`);
      });
    }
  })
  .catch((error) => {
    console.error("Error conectando a la base de datos:", error);
  });