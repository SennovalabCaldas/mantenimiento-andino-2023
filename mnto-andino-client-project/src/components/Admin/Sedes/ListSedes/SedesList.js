import React, { useEffect, useState } from "react";
import SedeForm from "../SedeForm/SedeForm";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Paper,
  TablePagination,
  TextField,
} from "@mui/material"; // Asegúrate de importar correctamente los componentes de Material-UI
import { useDispatch } from "react-redux";
import { deleteSede, getAllSedes } from "../../../../actions/sedesActions";

const SedeList = ({ sedes }) => {
  const dispatch = useDispatch();
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSede, setSelectedSede] = useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [filteredSedes, setFilteredSedes] = useState(sedes);
  const [searchTerm, setSearchTerm] = useState({
    name: "",
    department: "",
    municipality: "",
    contact: "",
  });

  useEffect(() => {
    filterSedes(searchTerm);
  }, [sedes]);

  // Función para abrir el modal de edición
  const handleOpenEditModal = (sede) => {
    setSelectedSede(sede);
    console.log(sede);
    setShowEditModal(true);
  };

  // Función para cerrar el modal de edición
  const handleCloseEditModal = () => {
    setSelectedSede(null);
    setShowEditModal(false);
  };

  const handleChangePage = (event, newPage) => {
    if (
      newPage >= 0 &&
      newPage < Math.ceil(filteredSedes.length / rowsPerPage)
    ) {
      setPage(newPage);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filterSedes = (updatedSearchTerm) => {
    const filteredSedes = sedes.filter((sede) => {
      const nameMatch = sede.nombre
        .toLowerCase()
        .includes(updatedSearchTerm.name.toLowerCase());
      const departmentMatch = sede.direccion.departamento
        .toLowerCase()
        .includes(updatedSearchTerm.department.toLowerCase());
      const municipalityMatch = sede.direccion.municipio
        .toLowerCase()
        .includes(updatedSearchTerm.municipality.toLowerCase());
      return nameMatch && departmentMatch && municipalityMatch;
    });
    if (page > 0) setPage(0);
    setFilteredSedes(filteredSedes);
  };

  const handleSearch = (event, field) => {
    const updatedSearchTerm = {
      ...searchTerm,
      [field]: event.target.value,
    };
    setSearchTerm(updatedSearchTerm);
    filterSedes(updatedSearchTerm);
    // Filtrar las sedes que coinciden con los términos de búsqueda
  };

  const handleCleanSearch = () => {
    setSearchTerm({
      name: "",
      department: "",
      municipality: "",
      contact: "",
    });
    setFilteredSedes(sedes);
  };

  // Eliminar sede
  const handleDeleteSede = async (sedeId) => {
    try {
      await dispatch(deleteSede(sedeId));
      await dispatch(getAllSedes());
      // Actualiza el estado de las sedes después de eliminar la sede
      const updatedSedes = sedes.filter((sede) => sede._id !== sedeId);
      console.log(updatedSedes);
    } catch (error) {
      console.error("Error al eliminar la sede:", error);
    }
  };

  const handleFormSubmit = (event) => {
    const newFilteredSedes = handleSearch(); // Filtrar las sedes según los términos de búsqueda
    setFilteredSedes(newFilteredSedes); // Actualizar el estado de sedes filtradas
  };
  return (
    <>
      <Paper sx={{ width: "100%", mb: 2, paddingTop: "20px" }}>
        <form className="input_group">
          <div style={{ marginBottom: "20px" }}>
            <TextField
              style={{ marginRight: "10px" }}
              className="search-field"
              label="Buscar por Nombre"
              value={searchTerm.name}
              onChange={(e) => handleSearch(e, "name")}
            />
            <TextField
              style={{ marginRight: "10px" }}
              className="search-field"
              label="Buscar por Departamento"
              value={searchTerm.department}
              onChange={(e) => handleSearch(e, "department")}
            />
            <TextField
              className="search-field"
              label="Buscar por Municipio"
              value={searchTerm.municipality}
              onChange={(e) => handleSearch(e, "municipality")}
            />
          </div>
        </form>
        <Table
          sx={{ minWidth: 650, paddingTop: "10px" }}
          aria-labelledby="tableTitle"
        >
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Departamento</TableCell>
              <TableCell>Dirección</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSedes
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((sede) => (
                <TableRow
                  key={sede._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {sede.nombre}
                  </TableCell>

                  <TableCell>
                    <p>
                      <strong>País:</strong> {sede.direccion.country}
                    </p>
                    <p>
                      <strong>Departamento:</strong>{" "}
                      {sede.direccion.departamento}
                    </p>
                    <p>
                      <strong>Municipio:</strong> {sede.direccion.municipio}
                    </p>
                  </TableCell>
                  <TableCell>
                    <p>
                      <strong>Tipo de calle:</strong>{" "}
                      {sede.direccion.selectedStreet}
                    </p>
                    <p>
                      <strong>Número:</strong> {sede.direccion.numero1}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleDeleteSede(sede._id)}>
                      <DeleteIcon /> {/* Icono de Eliminar */}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={filteredSedes.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Dialog open={showEditModal} onClose={handleCloseEditModal}>
        <DialogTitle>Editar Sede</DialogTitle>
        <DialogContent>
          <SedeForm sedeToEdit={selectedSede} onClose={handleCloseEditModal} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SedeList;
