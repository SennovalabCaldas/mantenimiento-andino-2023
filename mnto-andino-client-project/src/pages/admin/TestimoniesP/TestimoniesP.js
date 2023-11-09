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
import { List } from "semantic-ui-react";
import { ListTestimony } from "./ListTestimony";

export const TestimoniesP = () => {
  const dispatch = useDispatch();
  const testimonies = useSelector((state) => state.testimonie.testimonies);
  const activeTestimonies = testimonies.filter((testimony) => testimony.active);
  const inactiveTestimonies = testimonies.filter(
    (testimony) => !testimony.active
  );

  const [tabValue, setTabValue] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [testimonyToDelete, setTestimonyToDelete] = useState(null);

  useEffect(() => {
    dispatch(getAllTestimonies());
  }, [dispatch]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const confirmDelete = async () => {
    try {
      await dispatch(deleteTestimonie(testimonyToDelete));
      await dispatch(getAllTestimonies());
      closeDeleteDialog();
    } catch (error) {
      console.error("Error al eliminar el testimonio:", error);
    }
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setTestimonyToDelete(null);
  };

  const handleToggleActive = async (testimony) => {
    const updatedTestimony = {
      ...testimony,
      active: !testimony.active,
    };

    try {
      await dispatch(updateTestimonie(updatedTestimony));
      await dispatch(getAllTestimonies());
    } catch (error) {
      console.error("Error al actualizar el testimonio:", error);
    }
  };

  const handleToggleInactive = async (testimony) => {
    const updatedTestimony = {
      ...testimony,
      active: !testimony.active,
    };

    try {
      await dispatch(updateTestimonie(updatedTestimony));
      await dispatch(getAllTestimonies());
    } catch (error) {
      console.error("Error al actualizar el testimonio:", error);
    }
  };

  const handleDelete = (testimonyId) => {
    console.log("Testimonio a eliminar:", testimonyId._id);
    setTestimonyToDelete(testimonyId._id);
    setDeleteDialogOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsModalOpen(true)}
      >
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
      <ListTestimony
        testimonies={tabValue === 0 ? activeTestimonies : inactiveTestimonies}
        handleToggleActive={handleToggleActive}
        handleToggleInactive={handleToggleInactive}
        handleDelete={handleDelete}
      />

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
        onSave={confirmDelete}
      />
    </div>
  );
};
