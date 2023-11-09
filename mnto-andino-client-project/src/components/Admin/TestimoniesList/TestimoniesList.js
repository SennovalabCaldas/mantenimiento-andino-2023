import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  deleteTestimonie,
  getAllTestimonies,
  updateTestimonie,
} from "../../../actions/testimonieActions";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

import { NewTestimonyModal } from "./NewTestimonyModal";

export const TestimoniesList = () => {
  const [tabValue, setTabValue] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [testimonialsPerPage] = useState(5);
  const [activePage, setActivePage] = useState(1);
  const [inactivePage, setInactivePage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [testimonyToDelete, setTestimonyToDelete] = useState(null);
  const [currentTestimonies, setCurrentTestimonies] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTestimonies());
  }, [dispatch]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const saveTestimony = (newTestimony) => {
    console.log("Nuevo testimonio guardado:", newTestimony);
    dispatch(getAllTestimonies());
    closeModal();
  };

  const testimonies = useSelector((state) => state.testimonie.testimonies);
  const activeTestimonies = testimonies.filter((testimony) => testimony.active);
  const inactiveTestimonies = testimonies.filter(
    (testimony) => !testimony.active
  );
  const paginate = (pageNumber, tabValue) => {
    if (tabValue === 0) {
      setActivePage(pageNumber);
    } else {
      setInactivePage(pageNumber);
    }
  };

  const openDeleteDialog = (testimonyId) => {
    setTestimonyToDelete(testimonyId);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setTestimonyToDelete(null);
  };

  const confirmDelete = async () => {
    if (testimonyToDelete) {
      try {
        await dispatch(deleteTestimonie(testimonyToDelete));
        await dispatch(getAllTestimonies());
        closeDeleteDialog();
      } catch (error) {
        console.error("Error al eliminar el testimonio:", error);
      }
    }
  };

  const toggleTestimonio = async (testimonyId) => {
    try {
      console.log("testimonyId", testimonyId);
      const testimonio = testimonies.find(
        (testimony) => testimony._id === testimonyId
      );
      console.log("testimonio", testimonio);
      const updatedTestimonio = { ...testimonio, active: !testimonio.active };
      await dispatch(updateTestimonie(updatedTestimonio));
      await dispatch(getAllTestimonies());
    } catch (error) {
      console.error("Error al actualizar el testimonio:", error);
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={openModal}>
        Nuevo Testimonio
      </Button>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Activos" />
        <Tab label="Inactivos" />
      </Tabs>
      <TableContainer component={Box} p={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Cliente</TableCell>
              <TableCell>Comentario</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentTestimonies.map((testimony) => (
              <TableRow key={testimony.id}>
                <TableCell>{testimony.client}</TableCell>
                <TableCell>{testimony.comment}</TableCell>
                <TableCell>
                  <IconButton onClick={() => toggleTestimonio(testimony._id)}>
                    {testimony.active ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                  <IconButton onClick={() => openDeleteDialog(testimony._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {Array.from(
          {
            length: Math.ceil(
              (tabValue === 0 ? activeTestimonies : inactiveTestimonies)
                .length / testimonialsPerPage
            ),
          },
          (_, index) => (
            <Button
              key={index}
              onClick={() => paginate(index + 1, tabValue)}
              variant={
                (tabValue === 0 ? activePage : inactivePage) === index + 1
                  ? "contained"
                  : "outlined"
              }
              color="primary"
            >
              {index + 1}
            </Button>
          )
        )}
      </div>
      <Dialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro de que deseas eliminar este testimonio?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={confirmDelete} color="primary" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      <NewTestimonyModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={saveTestimony}
      />
    </div>
  );
};
