import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";

import {
  createAlly,
  deleteAlly,
  getAllAllies,
  updateAlly,
} from "../../../actions/allyActions";
import { ENV } from "../../../utils";

export const Allies = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const baseApi = ENV.BASE_PATH;
  const [previewImage, setPreviewImage] = useState(null);

  const [selectedAlly, setSelectedAlly] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false); // Identificador para el diálogo de edición
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false); // Identificador para el diálogo de detalles

  const [avatar, setAvatar] = useState(null);
  const [national, setNational] = useState(true);
  const [active, setActive] = useState(true);
  const [allyName, setAllyName] = useState("");
  const [editSupplierName, setEditAllyName] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(null);
  const alliesState = useSelector((state) => state.ally.allAllies);
  console.log(alliesState);

  const [newAlly, setNewAlly] = useState({
    allyName: "",
    active: undefined,
    national: undefined, // Configúralo como indefinido
    avatar: [],
  });

  const [editingAlly, setEditingSupplier] = useState({
    allyName: "",
    active: active,
    national: national,
    avatar: [],
  });

  const handleOpenEditDialog = (ally) => {
    setSelectedAlly(ally);
    setEditAllyName(ally.allyName);
    setIsEditDialogOpen(true); // Abre el diálogo de edición
  };

  // Función para abrir el diálogo de detalles del proveedor
  const handleOpenDetailDialog = (ally) => {
    setSelectedAlly(ally);
    setIsDetailDialogOpen(true); // Abre el diálogo de detalles
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
  };

  const handleCloseDetailDialog = () => {
    setIsDetailDialogOpen(false);
  };

  const dispatch = useDispatch();
  const allies = useSelector((state) => state.ally.allAllies);

  useEffect(() => {
    dispatch(getAllAllies());
  }, [dispatch]);

  const handleToggleActive = (ally) => {
    // Actualiza el estado local
    const updatedAlly = { ...ally, active: !ally.active };
    const updatedAllys = allies.map((s) =>
      s._id === ally._id ? updatedAlly : s
    );
    setSelectedAlly(updatedAlly);
    // Envía una solicitud al servidor para actualizar el estado en la base de datos
    dispatch(updateAlly(ally._id, { active: updatedAlly.active }));
    dispatch(getAllAllies()); // Actualiza la lista de proveedores después de la actualización
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const blob = new Blob([file], { type: file.type });
      setAvatar({
        blob,
        image: file,
      });
      console.log("Avatar:", avatar);
      const imageUrl = URL.createObjectURL(file);
      setAvatarPreview(imageUrl);
    }
  };
  const handleEdit = () => {
    if (selectedAlly) {
      setAllyName(selectedAlly.allyName);
      setIsEditDialogOpen(true);
      handleOpenEditDialog(selectedAlly);
    }
  };
  const handleUpdateSupplier = async () => {
    // Obtén el ID del proveedor a actualizar
    const allyId = selectedAlly._id;
    const updatedData = {
      allyName: allyName, // Utiliza el nombre del estado para actualizar el nombre del proveedor
      active: selectedAlly.active,
      national: selectedAlly.national,
      avatar: avatar,
    };

    try {
      await dispatch(updateAlly(allyId, updatedData));
      await dispatch(getAllAllies());
      setIsEditDialogOpen(false); // Cierra el diálogo después de la actualización
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteAlly(id));
      await dispatch(getAllAllies());
    } catch (error) {
      console.error("Error al eliminar el aliado:", error);
    }
  };

  const handleSave = async () => {
    const data = {
      ...newAlly,
      allyName: allyName,
      active: active,
      national: national,
      avatar: avatar,
    };

    if (data._id) {
      await dispatch(updateAlly(data._id, data));
    } else {
      await dispatch(createAlly(data));
    }
    await dispatch(getAllAllies());
  };

  return (
    <div>
      <h2>Aliados</h2>
      <div>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h3">
              Crear Aliado
            </Typography>
            <form encType="multipart/form-data">
              <div style={{ display: "flex", alignItems: "center" }}>
                <TextField
                  label="Nombre"
                  value={allyName}
                  onChange={(e) => setAllyName(e.target.value)}
                />
                <input
                  type="file"
                  id="imageUpload"
                  style={{ display: "none" }}
                  onChange={handleAvatarChange}
                />
                {/* Button to trigger file input */}
                <Button
                  onClick={() => document.getElementById("imageUpload").click()}
                  variant="contained"
                  color="primary"
                >
                  Subir Imagen
                </Button>
                {avatarPreview && (
                  <img
                    src={avatarPreview}
                    alt="Vista previa de la imagen"
                    style={{
                      maxWidth: "100px",
                      maxHeight: "100px",
                      marginLeft: "10px",
                    }}
                  />
                )}
                <Switch
                  checked={newAlly.active}
                  onChange={(e) =>
                    setNewAlly({
                      ...newAlly,
                      active: e.target.checked,
                    })
                  }
                  color="primary"
                  inputProps={{ "aria-label": "Aliado activo" }}
                />
                <Typography>
                  {newAlly.active ? "Aliado activo" : "Aliado inactivo"}
                </Typography>
                <Switch
                  checked={newAlly.national}
                  onChange={(e) =>
                    setNewAlly({
                      ...newAlly,
                      national: e.target.checked,
                    })
                  }
                  color="primary"
                  inputProps={{ "aria-label": "Aliado nacional" }}
                />
                <Typography>
                  {newAlly.national
                    ? "Aliado nacional"
                    : "Aliado internacional"}
                </Typography>
                <Button
                  onClick={handleSave}
                  variant="contained"
                  color="primary"
                >
                  Crear
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      {/* Diálogo para editar el proveedor */}
      <Dialog open={isEditDialogOpen} onClose={handleCloseEditDialog} fullWidth>
        {selectedAlly && (
          <>
            <DialogTitle>Editar Aliado</DialogTitle>
            <DialogContent>
              <TextField
                label="Nombre"
                value={allyName}
                onChange={(e) => setAllyName(e.target.value)}
              />

              <Typography style={{ marginLeft: "10px" }}>
                Activa: {selectedAlly.active ? "Sí" : "No"}
              </Typography>
              <Switch
                checked={selectedAlly.active}
                onChange={() => handleToggleActive(selectedAlly)}
                color="primary"
                inputProps={{ "aria-label": "Aliado activa" }}
              />
            </DialogContent>
            <DialogContent>
              <label htmlFor="imageUpload">
                <Typography>
                  Imagen:
                  {selectedAlly.avatar && (
                    <img
                      src={avatarPreview || `${baseApi}${selectedAlly.avatar}`} // Utiliza avatarPreview si está definido, de lo contrario, utiliza la URL existente
                      alt="Imagen de previsualización"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "200px",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        document.getElementById("imageUpload").click()
                      }
                    />
                  )}
                </Typography>
              </label>
              <input
                type="file"
                id="imageUpload"
                style={{ display: "none" }}
                onChange={handleAvatarChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseEditDialog} color="primary">
                Cancelar
              </Button>
              <Button onClick={handleUpdateSupplier} color="primary">
                Guardar
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      <h3>Lista de Aliados</h3>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Imagen</TableCell>
              <TableCell>Activa</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allies.map((ally) => (
              <TableRow key={ally._id}>
                <TableCell>{ally.allyName}</TableCell>
                <TableCell>
                  <img
                    src={`${baseApi}/${ally.avatar}`}
                    alt="Avatar"
                    width="50"
                    height="50"
                    onMouseEnter={() => setPreviewImage(ally.avatar)} // Mostrar la previsualización al pasar el ratón
                    onMouseLeave={() => setPreviewImage(null)} // Ocultar la previsualización al salir del ratón
                  />
                  {previewImage === ally.avatar && (
                    <div className="image-preview">
                      <img
                        src={`${baseApi}/${ally.avatar}`}
                        alt="Avatar Preview"
                        width="150"
                        height="150"
                      />
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <Switch
                    checked={ally.active}
                    onChange={() => handleToggleActive(ally)}
                    color="primary"
                    inputProps={{ "aria-label": "Aliado activa" }}
                  />
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleDelete(ally._id)}>
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={isDetailDialogOpen}
        onClose={handleCloseDetailDialog}
        fullWidth
      >
        {selectedAlly && (
          <>
            <DialogTitle>Detalles del Aliado</DialogTitle>
            <DialogContent>
              <Typography>Nombre: {selectedAlly.allyName}</Typography>
              <Typography>
                Activa: {selectedAlly.active ? "Sí" : "No"}
              </Typography>
              <Typography>
                Imagen:{" "}
                {selectedAlly.avatar && (
                  <img
                    src={`${baseApi}${selectedAlly.avatar}`}
                    alt="Imagen de previsualización"
                    style={{ maxWidth: "100%", maxHeight: "200px" }}
                  />
                )}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDetailDialog} color="primary">
                Cerrar
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
      {/* <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={categories.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </div>
  );
};
