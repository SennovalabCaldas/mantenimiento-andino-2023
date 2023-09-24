import React, { useEffect, useState } from "react";
import {
  createFoundationNews,
  deleteFoundationNew,
  getFoundationNew,
  getAllFoundationsNews,
  updateFoundationNews,
} from "../../../actions/foundationNewsActions";
import { useDispatch } from "react-redux";
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { ENV } from "../../../utils";

export const FoundationNews = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const baseApi = ENV.BASE_PATH;
  const [previewImage, setPreviewImage] = useState(null);

  // Estados para la edición de aliados
  const [editAvatar, setEditAvatar] = useState(null);
  const [editAvatarPreview, setEditAvatarPreview] = useState(null);
  const [selectedFoundationNew, setSelectedFoundationNew] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false); // Identificador para el diálogo de edición
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false); // Identificador para el diálogo de detalles

  const [avatar, setAvatar] = useState(null);
  const [active, setActive] = useState(true);
  const [activityName, setActivityName] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(null);

  const [newFoundationNews, setNewFoundationNews] = useState({
    activityName: "",
    active: true,
    avatar: [],
    createdAt: new Date().toISOString(),
  });

  const [editingFoundationNews, setEditingFoundationNews] = useState({
    activityName: "",
    active: true,
    avatar: [],
    createdAt: new Date().toISOString(),
  });

  const handleOpenEditDialog = (foundationNew) => {
    setSelectedFoundationNew(foundationNew);
    setEditingFoundationNews({
      activityName: foundationNew.activityName,
      active: foundationNew.active,
      avatar: null,
      createdAt: new Date().toISOString(),
    });
    setIsEditDialogOpen(true);
  };

  // Función para abrir el diálogo de detalles del proveedor
  const handleOpenDetailDialog = (foundationNew) => {
    setSelectedFoundationNew(foundationNew);
    setIsDetailDialogOpen(true); // Abre el diálogo de detalles
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
  };

  const handleCloseDetailDialog = () => {
    setIsDetailDialogOpen(false);
  };

  const dispatch = useDispatch();
  const fundationNews = useSelector((state) => state.foundation.allFoundations);
  console.log("Noticias de la fundación:", fundationNews);
  useEffect(() => {
    dispatch(getAllFoundationsNews());
  }, [dispatch]);

  const handleEdit = () => {
    if (selectedFoundationNew) {
      setActivityName(selectedFoundationNew.activityName);
      setIsEditDialogOpen(true);
      handleOpenEditDialog(selectedFoundationNew);
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteFoundationNew(id));
      await dispatch(getAllFoundationsNews());
    } catch (error) {
      console.error("Error al eliminar el aliado:", error);
    }
  };

  const handleUpdateActive = async (id, active) => {
    try {
      await dispatch(updateFoundationNews(id, { active }));
      await dispatch(getAllFoundationsNews());
    } catch (error) {
      console.error("Error al actualizar el aliado:", error);
    }
  };

  const handleToggleActive = async (foundationNew) => {
    try {
      await dispatch(
        updateFoundationNews(foundationNew._id, {
          active: !foundationNew.active,
        })
      );
      await dispatch(getAllFoundationsNews());
    } catch (error) {
      console.error("Error al actualizar el aliado:", error);
    }
  };

  const handleSave = async () => {
    const data = {
      ...newFoundationNews,
      activityName: activityName,
      active: active,
      avatar: avatar,
      createdAt: new Date().toISOString(),
    };

    if (data._id) {
      await dispatch(updateFoundationNews(data._id, data));
    } else {
      await dispatch(createFoundationNews(data));
    }
    await dispatch(getAllFoundationsNews());
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
      setEditAvatarPreview(imageUrl); 
    }
  };
  

  const handleUpdateFoundationNew = async () => {
    const data = {
      ...editingFoundationNews,
      activityName: activityName,
      active: selectedFoundationNew.active,
      createdAt: new Date().toISOString(),
    };
    if (avatar && avatar.image) {
      data.avatar = avatar.image; // Agrega el avatar solo si se selecciona una nueva imagen
    } else {
      delete data.avatar; // Elimina el campo "avatar" si no se selecciona una nueva imagen
    }

    if (selectedFoundationNew._id) {
      await dispatch(updateFoundationNews(selectedFoundationNew._id, data));
    } else {
      await dispatch(createFoundationNews(data));
    }
    await dispatch(getAllFoundationsNews());
    handleCloseEditDialog();
  };

  return (
    <div>
      <div>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h3">
              Publicar noticia de la fundación
            </Typography>
            <form encType="multipart/form-data">
              <div style={{ display: "flex", alignItems: "center" }}>
                <TextField
                  label="Nombre"
                  value={newFoundationNews.activityName} // Utiliza newFoundationNews.activityName
                  onChange={(e) =>
                    setNewFoundationNews({
                      ...newFoundationNews,
                      activityName: e.target.value,
                    })
                  }
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
                  checked={newFoundationNews.active}
                  onChange={(e) =>
                    setNewFoundationNews({
                      ...newFoundationNews,
                      active: e.target.checked,
                    })
                  }
                  color="primary"
                  inputProps={{ "aria-label": "Publicación visible" }}
                />
                <Typography>
                  {newFoundationNews.active
                    ? "Publicación visible"
                    : "Publicación oculta"}
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
      <Dialog open={isEditDialogOpen} onClose={handleCloseEditDialog} fullWidth>
        {selectedFoundationNew && (
          <>
            <DialogTitle>Editar publicación de la fundación</DialogTitle>
            <DialogContent>
              <TextField
                label="Publicación"
                value={activityName}
                onChange={(e) => setActivityName(e.target.value)}
              />

              <Typography style={{ marginLeft: "10px" }}>
                Activa: {selectedFoundationNew.active ? "Sí" : "No"}
              </Typography>
              <Switch
                checked={selectedFoundationNew.active}
                onChange={() => handleToggleActive(selectedFoundationNew)}
                color="primary"
                inputProps={{ "aria-label": "Publicación visible" }}
              />
            </DialogContent>
            <DialogContent>
              <label htmlFor="imageUpload">
                <Typography>
                  Imagen:
                  {selectedFoundationNew.avatar && (
                    <img
                      src={
                        editAvatarPreview || // Utiliza editAvatarPreview en lugar de avatarPreview
                        `${baseApi}${selectedFoundationNew.avatar}`
                      }
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
              <Button onClick={handleUpdateFoundationNew} color="primary">
                Guardar
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
      <h3>Noticias de la fundación</h3>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Titulo publicación</TableCell>
              <TableCell>Imagen</TableCell>
              <TableCell>Activa</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fundationNews.map((foundationNew) => (
              <TableRow key={foundationNew._id}>
                <TableCell>{foundationNew.activityName}</TableCell>
                <TableCell>
                  <img
                    src={`${baseApi}/${foundationNew.avatar}`}
                    alt="Avatar"
                    width="50"
                    height="50"
                    onMouseEnter={() => setPreviewImage(foundationNew.avatar)} // Mostrar la previsualización al pasar el ratón
                    onMouseLeave={() => setPreviewImage(null)} // Ocultar la previsualización al salir del ratón
                  />
                  {previewImage === foundationNew.avatar && (
                    <div className="image-preview">
                      <img
                        src={`${baseApi}/${foundationNew.avatar}`}
                        alt="Avatar Preview"
                        width="150"
                        height="150"
                      />
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <Switch
                    checked={foundationNew.active}
                    onChange={(e) =>
                      handleUpdateActive(foundationNew._id, e.target.checked)
                    }
                    color="primary"
                    inputProps={{ "aria-label": "Publicación visible" }}
                  />
                  <Typography>
                    {foundationNew.active
                      ? "Publicación visible"
                      : "Publicación oculta"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleOpenEditDialog(foundationNew)}>
                    Editar
                  </Button>

                  <Button onClick={() => handleDelete(foundationNew._id)}>
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
        {selectedFoundationNew && (
          <>
            <DialogTitle>Detalles de la publicación</DialogTitle>
            <DialogContent>
              <Typography>
                Nombre: {selectedFoundationNew.activityName}
              </Typography>
              <Typography>
                Visible: {selectedFoundationNew.active ? "Sí" : "No"}
              </Typography>
              <Typography>
                Imagen:{" "}
                {selectedFoundationNew.avatar && (
                  <img
                    src={`${baseApi}${selectedFoundationNew.avatar}`}
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
