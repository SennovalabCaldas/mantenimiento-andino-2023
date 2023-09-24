import React, { useState } from "react";
import {
  TextField,
  Switch,
  Card,
  CardContent,
  Typography,
  FormControlLabel,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Chip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  createClient,
  deleteClient,
  getAllClients,
  updateClient,
} from "../../../../actions/clientActions";
import axios from "axios";

export const ClientForm = () => {
  const dispatch = useDispatch();

  const clients = useSelector((state) => state.client.allClients);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);

  const [clientName, setClientName] = useState("");
  const [active, setActive] = useState(true);
  const [national, setNational] = useState(true);
  const [avatar, setAvatar] = useState(null);
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const [openDialog, setOpenDialog] = useState(false);
  const [newClient, setNewClient] = useState({
    clientName: "",
    active: false,
    national: false,
    avatar: [],
    joinDate: currentDate,
  });
  const chipColors = [
    "#fce4ec",
    "#e8f5e9",
    "#fff9c4",
    "#bbdefb",
    "#ffcdd2",
    "#c8e6c9",
  ];
  const [editingClientId, setEditingClientId] = useState(null);

  const handleCreate = () => {
    setNewClient({
      clientName: "",
      active: false,
      national: false,
      avatar: [],
      joinDate: currentDate,
    });
    setOpenDialog(true);
  };

  const handleChange = (event) => {
    setSelectedOptions(event.target.value);
  };
  const handleRemoveChip = (departamentoToRemove) => {
    // Crea una nueva matriz sin el departamento que se va a eliminar
    const updatedSelectedOptions = selectedOptions.filter(
      (departamento) => departamento !== departamentoToRemove
    );

    // Actualiza el estado con la nueva matriz de departamentos seleccionados
    setSelectedOptions(updatedSelectedOptions);
  };

  const handleSubmit = () => {
    console.log("Opciones seleccionadas:", selectedOptions);
  };

  const handleEdit = (id) => {
    const clientToEdit = clients.find((item) => item._id === id);
    if (clientToEdit) {
      setEditingClientId(id);
      setClientName(clientToEdit.clientName);
      setActive(clientToEdit.active);
      setNational(clientToEdit.national);
      // Otros campos que desees editar
      setOpenDialog(true);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await dispatch(deleteClient(postId));
      await dispatch(getAllClients());
      // Cerrar el diálogo de edición o creación después de eliminar
      setOpenDialog(false);
    } catch (error) {
      console.error("Error al eliminar el cliente:", error);
    }
  };

  const handleSave = async () => {
    const data = {
      clientName: clientName,
      active: active,
      national: national,
      avatar: avatar,
      joinDate: currentDate,
    };

    if (editingClientId) {
      // Si se está editando, actualiza el cliente existente
      await dispatch(updateClient(editingClientId, data));
    } else {
      // Si no se está editando, crea un nuevo cliente
      await dispatch(createClient(data));
    }

    // Cierra el diálogo después de guardar
    setOpenDialog(false);
    // Limpia los campos del formulario
    setClientName("");
    setActive(true);
    setNational(true);
    setAvatar(null);
    setEditingClientId(null);

    // Actualiza la lista de clientes
    await dispatch(getAllClients());
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const blob = new Blob([file], { type: file.type });
      setAvatar({
        blob,
        image: file,
      });
    }
  };

  const cargarDepartamentos = async () => {
    try {
      const response = await axios.get(
        "https://www.datos.gov.co/resource/xdk5-pm3f.json"
      );
      const departamentos = response.data.map(
        (departamento) => departamento.departamento
      );
      const departamentosUnicos = [...new Set(departamentos)];
      setDepartamentos(departamentosUnicos);
    } catch (error) {
      console.error("Error al cargar los departamentos:", error);
    }
  };

  cargarDepartamentos();

  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant="h5">Formulario de Cliente</Typography>
          <form onSubmit={(e) => e.preventDefault()}>
            <TextField
              label="Nombre del Cliente"
              variant="outlined"
              fullWidth
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={national}
                  onChange={() => setNational(!national)}
                  color="primary"
                />
              }
              label="Cliente Nacional"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={active}
                  onChange={() => setActive(!active)}
                  color="primary"
                />
              }
              label="Cliente Activo"
            />
         <FormControl>
              <InputLabel id="multiple-select-label">
                Departamentos donde atiendes el cliente
              </InputLabel>
              <div>
                {selectedOptions.map((departamento) => (
                  <Chip
                    key={departamento}
                    label={departamento}
                    onDelete={() => handleRemoveChip(departamento)}
                    color="primary"
                  />
                ))}
              </div>
              <Select
                labelId="multiple-select-label"
                id="multiple-select"
                multiple
                value={selectedOptions}
                onChange={handleChange}
                style={{ display: selectedOptions.length === 0 ? "block" : "none",  minWidth: "300px" }}
              >
                {departamentos.map((departamento) => (
                  <MenuItem key={departamento} value={departamento}>
                    {departamento}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <input
              accept="image/*"
              type="file"
              id="image-input"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <label htmlFor="image-input">
              <Button
                variant="contained"
                component="span"
                color="primary"
                fullWidth
              >
                Cargar Imagen
              </Button>
            </label>
            {avatar && (
              <div>
                <img
                  src={URL.createObjectURL(avatar.image)}
                  alt="Vista Previa"
                  style={{ maxWidth: "100%" }}
                />
              </div>
            )}
            <Button onClick={handleSave} variant="contained" color="primary">
              Guardar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
