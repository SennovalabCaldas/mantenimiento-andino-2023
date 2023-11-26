// app.js
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const sedeRoutes = require("./routes/sede");
const addressRoutes = require("./routes/address");
const categoryRoutes = require("./routes/category");
const postRoutes = require("./routes/post");
const categoryServiceRoutes = require("./routes/categoryService");
const serviceRoutes = require("./routes/service");
const clientRoutes = require("./routes/client");
const supplierRoutes = require("./routes/supplier");
const alliesRoutes = require("./routes/ally");
const certificationsRoutes = require("./routes/certification");
const projectRoutes = require("./routes/project");
const foundationRoutes = require("./routes/foundation");
const makinaAndinaRoutes = require("./routes/makinaAndina");
const makinaAndinaMiamiRoutes = require("./routes/makinaAndinaMiami");
const glampingRoutes = require("./routes/glamping");
const testimonieRoutes = require("./routes/testimonie");
const departmentsRoutes = require("./routes/department");
const profileRoutes = require("./routes/profile");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("uploads"));
app.use("/uploads", express.static("uploads"));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization, Accept" );
  next();
});

app.use(`/api/v1/auth`, authRoutes);
app.use(`/api/v1/admin/users`, userRoutes);
app.use(`/api/v1/admin/addresses`, addressRoutes);
app.use(`/api/v1/admin/sedes`, sedeRoutes);
app.use(`/api/v1/admin/categories`, categoryRoutes);
app.use(`/api/v1/admin/posts`, postRoutes);
app.use(`/api/v1/admin/category-services`, categoryServiceRoutes);
app.use(`/api/v1/admin/services`, serviceRoutes);
app.use(`/api/v1/admin/clients`, clientRoutes);
app.use(`/api/v1/admin/suppliers`, supplierRoutes);
app.use(`/api/v1/admin/allies`, alliesRoutes);
app.use(`/api/v1/admin/certifications`, certificationsRoutes);
app.use(`/api/v1/admin/projects`, projectRoutes);
app.use(`/api/v1/admin/foundations`, foundationRoutes);
app.use(`/api/v1/admin/makinandina`, makinaAndinaRoutes);
app.use(`/api/v1/admin/makinandinamiami`, makinaAndinaMiamiRoutes);
app.use(`/api/v1/admin/glamping`, glampingRoutes);
app.use(`/api/v1/admin/testimonies`, testimonieRoutes);
app.use(`/api/v1/admin/departments`, departmentsRoutes);
app.use(`/api/v1/admin/profiles`, profileRoutes);

module.exports = { app };
