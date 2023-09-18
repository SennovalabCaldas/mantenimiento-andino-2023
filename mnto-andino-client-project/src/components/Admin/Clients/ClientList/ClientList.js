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
import { AddressForm } from "../../../GeneralLayout";
import {
  createClient,
  deleteClient,
  getAllClients,
  updateClient,
} from "../../../../actions/clientActions";

export const ClientList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const baseUrl = "http://localhost:3100/";

  const [avatar, setAvatar] = useState(null);
  const [nameCategoryService, setNameCategoryService] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [direccion, setDireccion] = useState({});

  const [editingClient, setEditingClient] = useState({
    clientName: "",
    direccion: null,
    active: true,
    avatar: [],
    joinDate: null,
  });

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.client.clients);
  console.log(categories);

  useEffect(() => {
    dispatch(getAllClients());
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
      await dispatch(updateClient(id, { active: newActiveState }));
      await dispatch(getAllClients());
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateClient = async (clientId, updatedData) => {
    console.log("Datos del cliente a actualizar:", updatedData);
    try {
      await dispatch(updateClient(clientId, updatedData));
      await dispatch(getAllClients());
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteClient(id));
      await dispatch(getAllClients());
    } catch (error) {
      console.error("Error al eliminar la publicación:", error);
    }
  };


  return (
    <div>
      <h2>Clientes</h2>

      <h3>Lista de Categorías</h3>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Dirección</TableCell>
              <TableCell>Imagen</TableCell>
              <TableCell>Activa</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category._id}>
                <TableCell>{category.clientName}</TableCell>
                <TableCell>{category.direccion}</TableCell>
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
    </div>
  );
};
