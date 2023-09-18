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
  TablePagination,
  InputLabel,
} from "@material-ui/core";
import {
  createCategoryService,
  deleteCategoryService,
  getAllCategoriesService,
  updateCategoryService,
} from "../../../../actions/categoryServiceActions";
import { Box } from "@mui/material";

export const CategoryManagement = (news) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const baseUrl = "http://localhost:3100/";

  const [avatar, setAvatar] = useState(null);
  const [nameCategoryService, setNameCategoryService] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(null);
 

  const [newCategory, setNewCategory] = useState({
    nameCategoryService: "",
    active: true,
    avatar: [],
  });

  const [editingCategory, setEditingCategory] = useState({
    nameCategoryService: "",
    active: false,
    avatar: [],
  });

  const dispatch = useDispatch();
  const categories = useSelector(
    (state) => state.categoryService.allCategoriesService
  );
  console.log(categories);

  useEffect(() => {
    dispatch(getAllCategoriesService());
  }, [dispatch]);

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

  const handleEdit = async (id) => {
    console.log("Editando categoría:", id);
    const categoryToEdit = categories.find((item) => item._id === id);
    const newActiveState = !categoryToEdit.active;
    try {
      await dispatch(updateCategoryService(id, { active: newActiveState }));
      await dispatch(getAllCategoriesService());
    } catch (error) {
      console.error(error);
    }
  };


  const handleUpdateCategory = async (categoryId, updatedData) => {
    console.log("Datos de la categoría a actualizar:", updatedData);
    try {
      await dispatch(updateCategoryService(categoryId, updatedData));
      await dispatch(getAllCategoriesService());
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteCategoryService(id));
      await dispatch(getAllCategoriesService());
    } catch (error) {
      console.error("Error al eliminar la publicación:", error);
    }
  };

  const handleSave = async () => {
    const data = {
      ...newCategory,
      nameCategoryService: nameCategoryService,
      active: editingCategory.active,
      avatar: avatar,
    };
    console.log("Guardando datos de la categoría:", data);

    if (data._id) {
      console.log("Updating clients", data._id);
      console.log(data._id);
      await dispatch(updateCategoryService(data._id, data));
    } else {
      console.log("Saving new client data", data);
      await dispatch(createCategoryService(data));
    }
    await dispatch(getAllCategoriesService());
  };

  return (
    <div>
      <h2>Categorías de servicios</h2>

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
                  value={nameCategoryService}
                  onChange={(e) => setNameCategoryService(e.target.value)}
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

      <h3>Lista de Categorías</h3>
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
            {categories.map((category) => (
              <TableRow key={category._id}>
                <TableCell>{category.nameCategoryService}</TableCell>
                <TableCell>
                  {category.avatar && (
                    <img
                      src={`${baseUrl}${category.avatar}`}
                      alt="Imagen de previsualización"
                      style={{ maxWidth: "100%", maxHeight: "200px" }}
                    />
                  )}
                </TableCell>

                <TableCell>
                  <Switch
                    checked={category.active}
                    onChange={() =>
                      handleEdit(category._id, {
                        active: !category.active,
                      })
                    }
                    color="primary"
                    inputProps={{ "aria-label": "Categoría activa" }}
                  />
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleDelete(category._id)}>
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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