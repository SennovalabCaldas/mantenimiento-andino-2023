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
  TablePagination,
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
  const dispatch = useDispatch();
  const foundationNews = useSelector(
    (state) => state.foundation.allFoundations
  );
  const indexOfLastFoundationNew = (page + 1) * rowsPerPage;
  const indexOfFirstFoundationNew = indexOfLastFoundationNew - rowsPerPage;
  const currentFoundationNews = foundationNews.slice(
    indexOfFirstFoundationNew,
    indexOfLastFoundationNew
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Vuelve a la primera página al cambiar el número de filas por página
  };

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
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <TextField
                  label="Nombre"
                  value={activityName}
                  onChange={(e) => setActivityName(e.target.value)}
                />
                <label htmlFor="imageUpload" style={{ marginTop: "20px" }}>
                  <Typography>Imagen:</Typography>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    {avatarPreview ? (
                      <>
                        <img
                          src={avatarPreview}
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
                        <Typography variant="caption">
                          Haz clic en la imagen para cambiarla
                        </Typography>
                      </>
                    ) : (
                      <Button
                        variant="contained"
                        component="span"
                        color="primary"
                      >
                        Cargar Imagen
                      </Button>
                    )}
                  </div>
                </label>
                <input
                  type="file"
                  id="imageUpload"
                  style={{ display: "none" }}
                  onChange={handleAvatarChange}
                />
                <Switch
                  checked={active}
                  onChange={() => setActive(!active)}
                  color="primary"
                  inputProps={{ "aria-label": "Publicación visible" }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                  style={{ marginTop: "20px" }}
                >
                  Guardar
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
                label="Nombre"
                value={newFoundationNews.activityName}
                onChange={(e) =>
                  setNewFoundationNews({
                    ...newFoundationNews,
                    activityName: e.target.value,
                  })
                }
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
                <Button variant="contained" component="span" color="primary">
                  Subir Imagen
                </Button>
              </label>
              <input
                type="file"
                id="imageUpload"
                style={{ display: "none" }}
                onChange={handleAvatarChange}
              />
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
            {currentFoundationNews.map((foundationNew) => (
              <TableRow key={foundationNew._id}>
                <TableCell>{foundationNew.activityName}</TableCell>
                <TableCell>
                  <img
                    src={`${baseApi}/${foundationNew.avatar}`}
                    alt="Avatar"
                    width="50"
                    height="50"
                    onMouseEnter={() => setPreviewImage(foundationNew.avatar)}
                    onMouseLeave={() => setPreviewImage(null)}
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
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={foundationNews.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};
