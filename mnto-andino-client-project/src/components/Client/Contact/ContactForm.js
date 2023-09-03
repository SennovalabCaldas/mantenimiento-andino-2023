import React, { useState } from "react";
import { TextField, Button, Container, Grid } from "@mui/material";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    nombreEmpresa: "",
    tamañoEmpresa: "",
    correo: "",
    asunto: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes manejar el envío del formulario a través de una API o lógica adicional
    console.log("Datos del formulario:", formData);
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nombre"
              fullWidth
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Apellidos"
              fullWidth
              name="apellidos"
              value={formData.apellidos}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Nombre de la empresa"
              fullWidth
              name="nombreEmpresa"
              value={formData.nombreEmpresa}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Tamaño de la empresa"
              fullWidth
              name="tamañoEmpresa"
              value={formData.tamañoEmpresa}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Correo electrónico"
              fullWidth
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Asunto"
              fullWidth
              name="asunto"
              value={formData.asunto}
              onChange={handleChange}
              required
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Enviar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ContactForm;
