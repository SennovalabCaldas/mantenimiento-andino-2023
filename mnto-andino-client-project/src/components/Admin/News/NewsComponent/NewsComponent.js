import React, { useEffect, useState } from "react";
import "buffer";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Importa los estilos CSS para el editor
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputLabel,
  Select,
  FormControl,
  MenuItem,
  Chip,
  Box,
  TablePagination,
  Switch,
  FormControlLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../../../actions/categoryActions";
import {
  createPost,
  deletePost,
  getAllPosts,
  updatePost,
  updatePostState,
} from "../../../../actions/postActions";
import "./NewsComponent.scss";
const NewsComponent = () => {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.post.allPosts);
  const categoriesState = useSelector((state) => state.category.allCategories);
  const creator = useSelector((state) => state.auth.user);
  const [avatar, setAvatar] = useState(null);
  // Para paginación
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [pageData, setPageData] = useState([]);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const chipColors = [
    "#fce4ec",
    "#e8f5e9",
    "#fff9c4",
    "#bbdefb",
    "#ffcdd2",
    "#c8e6c9",
  ];
  const [openDialog, setOpenDialog] = useState(false);
  const [nombreCompleto, setNombreCompleto] = useState("");

  // Constante para texto enriquecido
  const [descripcion, setDescripcion] = useState("");

  // Obtener los nombres de las categorías
  const categoriesMap = {};
  categoriesState.forEach((categoria) => {
    categoriesMap[categoria._id] = categoria.nombre;
  });
  const [editingNews, setEditingNews] = useState({
    titulo: "",
    subtitulo: "",
    descripcion: "",
    creador: "",
    active: false,
    fecha_creacion: new Date().toISOString(),
    avatar: [],
    categorias: [], // Asegurarse de que categorias sea un array vacío
  });

  const actualizarEstadoMostrarNoticias = async () => {
    try {
      // Lógica para obtener categorías inactivas
      const categoriasInactivas = categoriesState.filter(
        (categoria) => !categoria.active
      );

      const noticiasActualizar = [];

      for (const categoria of categoriasInactivas) {
        for (const noticia of news) {
          if (noticia.categorias.includes(categoria._id)) {
            // Actualiza el estado "active" si la noticia pertenece solo a esta categoría
            if (noticia.categorias.length === 1) {
              noticiasActualizar.push({
                id: noticia._id,
                active: false,
              });
            }
          }
        }
      }
      // Actualiza el estado "active" en las noticias correspondientes
      for (const noticiaData of noticiasActualizar) {
        await dispatch(updatePost(noticiaData));
      }

      // Actualiza el estado de las noticias después de la actualización
      await dispatch(getAllPosts());
    } catch (error) {
      console.error("Error al actualizar estado de active de noticias:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllCategories());
        await dispatch(getAllPosts());

        // Llama a la función para actualizar el estado de "active" de las noticias
        await actualizarEstadoMostrarNoticias();
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };
    fetchData();
  }, []);

  // Actualizar pageData cuando el estado "news" cambie
  useEffect(() => {
    setPageData(news);
  }, [news]);
  // Obtener nombre y apellidos de la persona autenticada
  useEffect(() => {
    if (creator && creator.firstname && creator.lastname) {
      setNombreCompleto(creator.firstname + " " + creator.lastname);
    }
  }, [creator]);

  const handleChangePage = (event, newPage) => {
    if (newPage >= 0 && newPage < Math.ceil(news.length / rowsPerPage)) {
      setPage(newPage);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Eliminar categorías
  const handleCategoryDelete = (categoryName) => () => {
    setEditingNews((prevData) => ({
      ...prevData,
      categorias: prevData.categorias.filter(
        (categorias) => categorias !== categoryName
      ),
    }));
  };

  const handleDescripcionChange = (value) => {
    setDescripcion(value);
  };

  const handleCategoryChange = (event) => {
    // event.target.value será el arreglo de identificadores de categoría seleccionados
    const selectedCategoryIds = event.target.value;
    setEditingNews((prevData) => ({
      ...prevData,
      // Convertir las categorías en objectId
      categorias: selectedCategoryIds.map((id) => String(id)),
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
      
    if (file) {
      /* Convertir a blob */
      const blob = new Blob([file], { type: file.type });
      setAvatar({
        blob,
        image: file,
      });
      // Crear la URL de la imagen para previsualización
      const imageUrl = URL.createObjectURL(file);
      setAvatarPreview(imageUrl);
    }
  };

  const handleCreate = () => {
    setEditingNews({
      titulo: "",
      subtitulo: "",
      descripcion: "",
      creador: "",
      active: false,
      fecha_creacion: new Date().toISOString(),
      avatar, // Inicializa avatar como un array vacío
      categorias: [],
    });
    setOpenDialog(true);
  };

  const handleDelete = async (postId) => {
    try {
      await dispatch(deletePost(postId));
      await dispatch(getAllPosts());
      // Actualiza el estado de las noticias después de eliminar una noticia
      const updateNews = news.filter((item) => item.id !== postId);

      // Verificar si la página actual es mayor o igual a la cantidad de páginas disponibles
      const totalPages = Math.ceil(updateNews.length / rowsPerPage);
      if (page >= totalPages) {
        setPage(Math.max(totalPages - 1, 0)); // Establecer la página actual al último índice o a 0 si no hay páginas disponibles
      }
    } catch (error) {
      console.error("Error al eliminar la publicación:", error);
    }
  };

  const handleSave = async (data) => {
    setOpenDialog(false);
    data.descripcion = descripcion;
    data.fecha_creacion = new Date(data.fecha_creacion);
    data.creador = nombreCompleto;
    data.active = editingNews.active;
    data.categorias = editingNews.categorias;
    data.avatar = avatar;
    if (data._id) {
      await dispatch(updatePost(data._id, data));
    } else {
        
      await dispatch(createPost(data));
    }
    await dispatch(getAllPosts());
    await dispatch(getAllCategories());
  };

  const handleToggleShow = async (postId, updateData) => {
      
    try {
      // Actualiza el estado "active" de la noticia en la página actual
      const updatedPageData = pageData.map((item) =>
        item._id === postId ? { ...item, active: updateData.active } : item
      );
      setPageData(updatedPageData);
        
      await dispatch(updatePost(postId, { active: updateData.active }));
    } catch (error) {
      console.error("Error toggling news item:", error);
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleCreate}>
        Crear Noticia
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Publicar</TableCell>
              <TableCell>Categoría</TableCell>
              <TableCell>Título</TableCell>
              <TableCell>Subtítulo</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Fecha de Publicación</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pageData &&
              pageData
                .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                .map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>
                      <Switch
                        checked={item.active}
                        onChange={() =>
                          handleToggleShow(item._id, {
                            active: !item.active,
                          })
                        }
                        color="primary"
                        inputProps={{ "aria-label": "Post activa" }}
                      />
                    </TableCell>
                    <TableCell>
                      {item.categorias.map((categoriaId, index) => (
                        <Chip
                          key={categoriaId}
                          label={categoriesMap[categoriaId]}
                          style={{
                            backgroundColor:
                              chipColors[index % chipColors.length],
                            marginRight: 5,
                          }}
                        />
                      ))}
                    </TableCell>
                    <TableCell>{item.titulo}</TableCell>
                    <TableCell>{item.subtitulo}</TableCell>
                    <TableCell>{item.descripcion}</TableCell>
                    <TableCell>{item.fecha_creacion}</TableCell>
                    <TableCell>
                     
                      <Button onClick={() => handleDelete(item._id)}>
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={news ? news.length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {editingNews ? "Editar Noticia" : "Crear Noticia"}
        </DialogTitle>
        <DialogContent sx={{ display: "grid", gap: "16px" }}>
          <FormControl fullWidth>
            <InputLabel>Categorías</InputLabel>
            <Select
              multiple
              value={editingNews?.categorias || []}
              onChange={handleCategoryChange}
              renderValue={(selected) => (
                <>
                  {selected.map((value, index) => {
                    const categorias = categoriesState.find(
                      (cat) => cat._id === value
                    );
                    return (
                      <Chip
                        key={categorias._id}
                        label={categorias.nombre}
                        onDelete={() => handleCategoryDelete(categorias.nombre)}
                        style={{
                          backgroundColor:
                            chipColors[index % chipColors.length],
                          marginRight: 5,
                        }}
                      />
                    );
                  })}
                </>
              )}
            >
              {categoriesState
                .filter((categorias) => categorias.active) // Filtrar categorías activas
                .map((categorias) => (
                  <MenuItem key={categorias._id} value={categorias._id}>
                    {categorias.nombre}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <TextField
            label="Título"
            value={editingNews?.titulo || ""}
            onChange={(e) =>
              setEditingNews((prevData) => ({
                ...prevData,
                titulo: e.target.value,
              }))
            }
            fullWidth
          />
          <TextField
            label="Subtítulo"
            value={editingNews?.subtitulo || ""}
            onChange={(e) =>
              setEditingNews((prevData) => ({
                ...prevData,
                subtitulo: e.target.value,
              }))
            }
            fullWidth
          />
          <Box sx={{ marginBottom: "16px" }}>
            <ReactQuill
              value={descripcion}
              onChange={handleDescripcionChange}
              placeholder="Escribe aquí la descripción..."
            />
          </Box>
          <TextField
            label="Fecha de Creación"
            value={editingNews?.fecha_creacion || ""}
            onChange={(e) =>
              setEditingNews((prevData) => ({
                ...prevData,
                fecha_creacion: e.target.value,
              }))
            }
            disabled
          />
          <Box>
            <FormControlLabel
              control={
                <Switch
                  checked={editingNews.active || false}
                  onChange={(e) =>
                    setEditingNews((prevData) => ({
                      ...prevData,
                      active: e.target.checked,
                    }))
                  }
                  color="primary"
                />
              }
              label="Mostrar"
            />
          </Box>

          <Box>
            <InputLabel>Imagen grande</InputLabel>
            <input type="file" onChange={handleAvatarChange} />
          </Box>
          {avatarPreview && (
            <Box>
              <img
                src={avatarPreview}
                alt="Imagen de previsualización"
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button onClick={() => handleSave(editingNews)}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NewsComponent;
