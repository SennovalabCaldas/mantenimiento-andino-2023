import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "../../../../actions/categoryActions";
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
  TablePagination,
} from "@material-ui/core";
import { updatePostState } from "../../../../actions/postActions";

export const CategoryManagement = (news) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [newCategory, setNewCategory] = useState({
    nombre: "",
    active: false,
  });

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.allCategories);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const handleCreateCategory = async () => {
    try {
      await dispatch(createCategory(newCategory));
      setNewCategory({
        nombre: "",
        active: false,
      });
      await dispatch(getAllCategories());
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateCategory = async (categoryId, updatedData) => {
      
    try {
      // Si la categoría se está activando y existen noticias relacionadas
      if (!updatedData.active) {
          
        // Lógica para verificar si existen noticias relacionadas con esta categoría
        const noticiasRelacionadas = news.news.filter((noticia) => {
          noticia.categorias.includes(categoryId);
            
        });
        if (noticiasRelacionadas.length > 0) {
            
          // Llama al dispatch para actualizar el estado de las noticias relacionadas
          for (const noticia of noticiasRelacionadas) {
            await dispatch(updatePostState(noticia._id, false));
          }
        }
      }

      // Llama al dispatch para actualizar el estado de la categoría
      await dispatch(updateCategory(categoryId, updatedData));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await dispatch(deleteCategory(categoryId));
      await dispatch(getAllCategories());
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <h2>Listado de Categorías</h2>

      <div>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h3">
              Crear Nueva Categoría
            </Typography>
            <form encType="multipart/form-data">
              <div style={{ display: "flex", alignItems: "center" }}>
                <TextField
                  label="Nombre"
                  value={newCategory.nombre}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, nombre: e.target.value })
                  }
                />
                <Switch
                  checked={newCategory.active}
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      active: e.target.checked,
                    })
                  }
                  color="primary"
                  inputProps={{ "aria-label": "Categoría activa" }}
                />
                <Typography>
                  {newCategory.active
                    ? "Categoría activa"
                    : "Categoría inactiva"}
                </Typography>
                <Button
                  onClick={handleCreateCategory}
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

      <h3>Lista de Categorías</h3>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Activa</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((category) => (
                <TableRow key={category._id}>
                  <TableCell>{category.nombre}</TableCell>
                  <TableCell>
                    <Switch
                      checked={category.active}
                      onChange={() =>
                        handleUpdateCategory(category._id, {
                          active: !category.active,
                        })
                      }
                      color="primary"
                      inputProps={{ "aria-label": "Categoría activa" }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleDeleteCategory(category._id)}>
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={categories.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};
