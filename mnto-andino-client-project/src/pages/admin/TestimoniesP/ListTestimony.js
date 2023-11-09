import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import {
  getAllTestimonies,
  updateTestimonie,
} from "../../../actions/testimonieActions";

export const ListTestimony = ({
  testimonies,
  handleDelete,
}) => {
  const dispatch = useDispatch();
  const [testimoniesPerPage] = useState(5);
  const [activePage, setActivePage] = useState(1);

  const handlePageChange = (event, value) => {
    setActivePage(value);
  };

  async function handleToggleVisibility(testimonieId, testimonieData) {
    console.log("Testimonio a actualizar:", testimonieData);
    try {
      await dispatch(
        updateTestimonie(testimonieId, {
          ...testimonieData,
          active: !testimonieData.active,
        })
      );
      await dispatch(getAllTestimonies());
      console.log("Testimonio actualizado correctamente.");
    } catch (error) {
      console.error("Error al actualizar el testimonio:", error);
    }
  }

  const handleDeleteDialogOpen = (testimonyId) => {
    console.log("Testimonio a eliminar:", testimonyId);
    const testimonyToDelete = testimonies.find(
      (testimony) => testimony._id === testimonyId
    );
    handleDelete(testimonyToDelete);
  };

  return (
    <Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Cliente</TableCell>
              <TableCell>Comentario</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Evaluación</TableCell>
              <TableCell>Activo</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {testimonies
              .slice(
                (activePage - 1) * testimoniesPerPage,
                (activePage - 1) * testimoniesPerPage + testimoniesPerPage
              )
              .map((testimony) => (
                <TableRow key={testimony._id}>
                  <TableCell>{testimony.client}</TableCell>
                  <TableCell>{testimony.comment}</TableCell>
                  <TableCell>{testimony.role}</TableCell>
                  <TableCell>{testimony.evaluation}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="toggle-visibility"
                      onClick={() =>
                        handleToggleVisibility(testimony._id, testimony)
                      }
                    >
                      {testimony.active ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDeleteDialogOpen(testimony._id)}
                    >
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
          { length: Math.ceil(testimonies.length / testimoniesPerPage) },
          (_, index) => (
            <Button
              key={index}
              onClick={(e) => handlePageChange(e, index + 1)}
              variant={activePage === index + 1 ? "contained" : "outlined"}
              color="primary"
            >
              {index + 1}
            </Button>
          )
        )}
      </div>
    </Box>
  );
};
