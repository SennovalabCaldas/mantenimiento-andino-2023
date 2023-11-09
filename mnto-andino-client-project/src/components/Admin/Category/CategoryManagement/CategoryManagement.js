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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { updatePostState } from "../../../../actions/postActions";

export const CategoryManagement = (news) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [newCategory, setNewCategory] = useState({
    nombre: "",
    active: false,
  });
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
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
      if (!updatedData.active) {
        const noticiasRelacionadas = news.news.filter((noticia) =>
          noticia.categorias.includes(categoryId)
        );

        if (noticiasRelacionadas.length > 0) {
          console.log(
            "Esta categoría tiene noticias relacionadas. No se puede desactivar."
          );
          return;
        }
      }
      await dispatch(updateCategory(categoryId, updatedData));
      const updatedCategories = categories.map((category) =>
        category._id === categoryId
          ? { ...category, active: updatedData.active }
          : category
      );
      dispatch({ type: "SET_ALL_CATEGORIES", payload: updatedCategories });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCategory = (categoryId) => {
    setCategoryToDelete(categoryId);
    setConfirmationDialogOpen(true);
  };

  const handleConfirmationDialogClose = (confirmed) => {
    setConfirmationDialogOpen(false);
    if (confirmed) {
      try {
        dispatch(deleteCategory(categoryToDelete));
        setCategoryToDelete(null);
        dispatch(getAllCategories());
      } catch (error) {
        console.error(error);
      }
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
      <Dialog
        open={confirmationDialogOpen}
        onClose={() => handleConfirmationDialogClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirmación</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro de que deseas eliminar esta categoría?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleConfirmationDialogClose(false)}
            color="primary"
          >
            Cancelar
          </Button>
          <Button
            onClick={() => handleConfirmationDialogClose(true)}
            color="primary"
            autoFocus
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
