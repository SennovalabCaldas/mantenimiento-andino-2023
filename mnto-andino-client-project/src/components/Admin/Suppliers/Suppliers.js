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
  createSupplier,
  deleteSupplier,
  getAllSuppliers,
  updateSupplier,
} from "../../../actions/providerActions";
import { ENV } from "../../../utils";

export const Suppliers = () => {
  const baseApi = ENV.BASE_PATH;


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false); // Identificador para el diálogo de edición
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false); // Identificador para el diálogo de detalles

  const [avatar, setAvatar] = useState(null);
  const [national, setNational] = useState(true);
  const [supplierName, setSupplierName] = useState("");
  const [editSupplierName, setEditSupplierName] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [active, setActive] = useState(true);

  const [newSupplier, setNewSupplier] = useState({
    supplierName: "",
    active: true,
    national: true,
    avatar: [],
  });

  const [editingSupplier, setEditingSupplier] = useState({
    supplierName: "",
    active: false,
    national: true,
    avatar: [],
  });

  const handleOpenEditDialog = (supplier) => {
    setSelectedSupplier(supplier);
    setEditSupplierName(supplier.supplierName);
    setIsEditDialogOpen(true); // Abre el diálogo de edición
  };

  // Función para abrir el diálogo de detalles del proveedor
  const handleOpenDetailDialog = (supplier) => {
    setSelectedSupplier(supplier);
    setIsDetailDialogOpen(true); // Abre el diálogo de detalles
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
  };

  const handleCloseDetailDialog = () => {
    setIsDetailDialogOpen(false);
  };

  const dispatch = useDispatch();
  const suppliers = useSelector((state) => state.supplier.allSuppliers);

  useEffect(() => {
    dispatch(getAllSuppliers());
  }, [dispatch]);

  const handleToggleActive = (supplier) => {
    const updatedSupplier = { ...supplier, active: !supplier.active };
    const updatedSuppliers = suppliers.map((s) =>
      s._id === supplier._id ? updatedSupplier : s
    );
    setSelectedSupplier(updatedSupplier);
    dispatch(updateSupplier(supplier._id, { active: updatedSupplier.active }))
      .then(() => {
        // Después de actualizar en el servidor, puedes actualizar la lista
        dispatch(getAllSuppliers());
      })
      .catch((error) => {
        console.error("Error al actualizar el estado activo:", error);
      });
  };

  const handleToggleNational = (supplier) => {
    const updatedSupplier = { ...supplier, national: !supplier.national };
    const updatedSuppliers = suppliers.map((s) =>
      s._id === supplier._id ? updatedSupplier : s
    );
    setSelectedSupplier(updatedSupplier);
    dispatch(
      updateSupplier(supplier._id, { national: updatedSupplier.national })
    )
      .then(() => {
        // Después de actualizar en el servidor, puedes actualizar la lista
        dispatch(getAllSuppliers());
      })
      .catch((error) => {
        console.error("Error al actualizar el estado nacional:", error);
      });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const blob = new Blob([file], { type: file.type });
      setAvatar({
        blob,
        image: file,
      });
      const imageUrl = URL.createObjectURL(file);
      setAvatarPreview(imageUrl);
    }
  };

  const handleEdit = () => {
    if (selectedSupplier) {
      setSupplierName(selectedSupplier.supplierName);
      setIsEditDialogOpen(true);
      handleOpenEditDialog(selectedSupplier);
    }
  };
  const handleUpdateSupplier = async () => {
    // Obtén el ID del proveedor a actualizar
    const supplierId = selectedSupplier._id;
    const updatedData = {
      supplierName: supplierName, // Utiliza el nombre del estado para actualizar el nombre del proveedor
      active: selectedSupplier.active,
      national: selectedSupplier.national,
      avatar: avatar,
    };

    try {
      await dispatch(updateSupplier(supplierId, updatedData));
      await dispatch(getAllSuppliers());
      setIsEditDialogOpen(false); // Cierra el diálogo después de la actualización
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteSupplier(id));
      await dispatch(getAllSuppliers());
    } catch (error) {
      console.error("Error al eliminar la publicación:", error);
    }
  };

  const handleSave = async () => {
    const data = {
      ...newSupplier,
      supplierName: supplierName,
      active: editingSupplier.active,
      national: editingSupplier.national,
      avatar: avatar,
    };

    if (data._id) {
      await dispatch(updateSupplier(data._id, data));
    } else {
      await dispatch(createSupplier(data));
    }
    await dispatch(getAllSuppliers());
  };

  return (
    <div>
      <div>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h3">
              Ingresar un nuevo proveedor
            </Typography>
            <form encType="multipart/form-data">
              <div style={{ display: "flex", alignItems: "center" }}>
                <TextField
                  label="Nombre"
                  value={supplierName}
                  onChange={(e) => setSupplierName(e.target.value)}
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
                  Upload Image
                </Button>

                <Switch
                  checked={active}
                  onChange={() => setActive(!active)} // Invierte el valor cuando cambia
                  color="primary"
                  inputProps={{ "aria-label": "Proveedor activo" }}
                />
                <Typography>{active ? "Activo" : "Inactivo"}</Typography>
                <Switch
                  checked={national}
                  onChange={() => setNational(!national)} // Invierte el valor cuando cambia
                  color="primary"
                  inputProps={{ "aria-label": "Proveedor nacional" }}
                />
                <Typography>
                  {national ? "Nacional" : "Internacional"}
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
        {selectedSupplier && (
          <>
            <DialogTitle>Editar Proveedor</DialogTitle>
            <DialogContent>
              <TextField
                label="Nombre"
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
              />

              <Typography style={{ marginLeft: "10px" }}>
                Activa: {selectedSupplier.active ? "Sí" : "No"}
              </Typography>
              <Switch
                checked={selectedSupplier.active}
                onChange={() => handleToggleActive(selectedSupplier)}
                color="primary"
                inputProps={{ "aria-label": "Categoría activa" }}
              />
              <Typography style={{ marginLeft: "10px" }}>
                Nacional: {selectedSupplier.national ? "Sí" : "No"}
              </Typography>
              <Switch
                checked={selectedSupplier.national}
                onChange={() => handleToggleNational(selectedSupplier)}
                color="primary"
                inputProps={{ "aria-label": "Proveedor nacional" }}
              />
            </DialogContent>
            <DialogContent>
              <label htmlFor="imageUpload">
                <Typography>
                  Imagen:
                  {selectedSupplier.avatar && (
                    <img
                      src={
                        avatarPreview || `${baseApi}${selectedSupplier.avatar}`
                      } // Utiliza avatarPreview si está definido, de lo contrario, utiliza la URL existente
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

      <h3>Lista de Proveedores</h3>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Imagen</TableCell>
              <TableCell>Activo</TableCell>
              <TableCell>Nacional</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {suppliers.map((supplier) => (
              <TableRow key={supplier._id}>
                <TableCell>{supplier.supplierName}</TableCell>
                <TableCell>
                  {supplier.avatar && (
                    <img
                      src={`${baseApi}/${supplier.avatar}`}
                      alt="Imagen de previsualización"
                      style={{ maxWidth: "100%", maxHeight: "200px" }}
                      onClick={() => handleOpenDetailDialog(supplier)}
                    />
                  )}
                </TableCell>

                <TableCell>
                  <Switch
                    checked={supplier.active}
                    onChange={() => handleToggleActive(supplier)}
                    color="primary"
                    inputProps={{ "aria-label": "Proveedor activo" }}
                  />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={supplier.national}
                    onChange={() => handleToggleNational(supplier)}
                    color="secondary"
                    inputProps={{ "aria-label": "Proveedor nacional" }}
                  />
                </TableCell>
                <TableCell>
                  <Button onClick={handleEdit}>Editar</Button>
                  <Button onClick={() => handleDelete(supplier._id)}>
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
        {selectedSupplier && (
          <>
            <DialogTitle>Detalles del Proveedor</DialogTitle>
            <DialogContent>
              <Typography>Nombre: {selectedSupplier.supplierName}</Typography>
              <Typography>
                Activa: {selectedSupplier.active ? "Sí" : "No"}
              </Typography>
              <Typography>
                Imagen:{" "}
                {selectedSupplier.avatar && (
                  <img
                    src={`${baseApi}/${selectedSupplier.avatar}`}
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
