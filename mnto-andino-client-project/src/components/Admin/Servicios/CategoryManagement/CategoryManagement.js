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
import { ENV } from "../../../../utils";

export const CategoryManagement = ({ categories }) => {
  console.log(categories);
  // const categories = useSelector(
  //   (state) => state.categoryService.allCategoriesService
  // );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const baseApi = ENV.BASE_PATH;

  const [avatar, setAvatar] = useState(null);
  const [nameCategoryService, setNameCategoryService] = useState("");
  const [descriptionCategoryService, setDescriptionCategoryService] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(null);

  const [newCategory, setNewCategory] = useState({
    nameCategoryService: "",
    descriptionCategoryService: "",
    active: true,
    avatar: [],
  });

  const [editingCategory, setEditingCategory] = useState({
    nameCategoryService: "",
    descriptionCategoryService: "",
    active: false,
    avatar: [],
  });

  const dispatch = useDispatch();

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
      descriptionCategoryService: descriptionCategoryService,
      active: editingCategory.active,
      avatar: avatar,
    };

    if (data._id) {
      await dispatch(updateCategoryService(data._id, data));
    } else {
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
                <TextField
                  label="Descripción"
                  value={descriptionCategoryService}
                  onChange={(e) => setDescriptionCategoryService(e.target.value)}
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
                    src={`${baseApi}/${category.avatar}`}
                      alt={`${baseApi}/${category.avatar}`}
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
