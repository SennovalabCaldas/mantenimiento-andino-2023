import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import "./ModalForm.scss";
import {
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Select } from "@material-ui/core";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const productsNames = [
  "Conexiones hidráulicas",
  "Grafadora hidráulica",
  "Comprensores para refrigeración",
  "Mangueras hidráulicas",
  "Adaptadores hidráulicos",
  "Todo tipo de repuestos para línea de refrigeración",
  "Correas y bandas",
  "Línea de refrigeración",
  "Todo tipo de repuesto para línea de procesamiento y sistemas de ventilación, aires acondicionados",
];

function getStyles(product, productName, theme) {
  return {
    fontWeight:
      productName.indexOf(product) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ModalForm = ({ onClose }) => {
  const [productName, setProductName] = React.useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(true);

  const theme = useTheme();
  const [formData, setFormData] = useState({
    type: "",
    firstName: "",
    lastName: "",
    businessName: "",
    email: "",
    contactName: "",
    phone: "",
    comments: "",
    selectedProducts: [],
  });

  const handleSnackbarOpen = () => {
    console.log("Snackbar abierto");
    setSnackbarOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setProductName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    onClose();
    handleSnackbarOpen();

  };

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 224,
        width: 250,
      },
    },
  };

  return (
    <Modal open={true} onClose={onClose}>
      <Box className="modal-container">
        <h2>Formulario de Contacto</h2>
        <Snackbar
        className="ver-snackbar"
            open={snackbarOpen}
            autoHideDuration={2000}
            onClose={() => setSnackbarOpen(false)}
          >
            <MuiAlert
              elevation={6}
              variant="filled"
              onClose={() => setSnackbarOpen(false)}
              severity="success"
            >
              Formulario enviado exitosamente
            </MuiAlert>
          </Snackbar>
        <form onSubmit={handleSubmit}>
        
          <FormControl
            component="fieldset"
            className="radio-group-tipo-cliente"
            margin="normal"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <FormLabel component="legend">Tipo de Cliente</FormLabel>
            <RadioGroup
              aria-label="tipo-cliente"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              style={{ display: "flex", flexDirection: "row" }}
            >
              <FormControlLabel
                value="persona-natural"
                control={<Radio />}
                label="Persona Natural"
              />
              <FormControlLabel
                value="persona-juridica"
                control={<Radio />}
                label="Persona Jurídica"
              />
            </RadioGroup>
          </FormControl>

          {formData.type === "persona-natural" && (
            <div style={{ display: "flex", gap: "16px" }}>
              <TextField
                fullWidth
                id="firstName"
                name="firstName"
                label="Nombres"
                variant="outlined"
                margin="normal"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
              <TextField
                fullWidth
                id="lastName"
                name="lastName"
                label="Apellidos"
                variant="outlined"
                margin="normal"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
          )}
          {formData.type === "persona-juridica" && (
            <TextField
              fullWidth
              id="businessName"
              name="businessName"
              label="Razón Social"
              variant="outlined"
              margin="normal"
              value={formData.businessName}
              onChange={handleInputChange}
              required
            />
          )}
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Correo Electrónico"
            variant="outlined"
            margin="normal"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <TextField
            fullWidth
            id="contactName"
            name="contactName"
            label="Nombre del Contacto Directo"
            variant="outlined"
            margin="normal"
            value={formData.contactName}
            onChange={handleInputChange}
            required
          />
          <TextField
            fullWidth
            id="phone"
            name="phone"
            label="Número de Celular"
            variant="outlined"
            margin="normal"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-chip-label">
              Servicio a consultar
            </InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={productName}
              onChange={handleChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {productsNames.map((product) => (
                <MenuItem
                  key={product}
                  value={product}
                  style={getStyles(product, productName, theme)}
                >
                  {product}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextareaAutosize
            className="textarea"
            id="comments"
            name="comments"
            label="Comentarios"
            placeholder="Escribe tus comentarios aquí..."
            minRows={4}
            value={formData.comments}
            onChange={handleInputChange}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Enviar
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalForm;
