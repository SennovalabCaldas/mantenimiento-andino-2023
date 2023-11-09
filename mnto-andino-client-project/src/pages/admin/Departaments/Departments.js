import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import DepartamentosApi from "../../../api/departamentos";
import { Delete as DeleteIcon } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import {
  createDepartment,
  deleteManyDepartments,
  getAllDepartments,
} from "../../../actions/departmentActions";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";

export const Departments = () => {
  const dispatch = useDispatch();

  const departmentsClients = useSelector(
    (state) => state.department.departments
  );

  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const departamentosActualizados = [];
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const api = new DepartamentosApi();
  const handleDepartmentSelect = (departmentId) => {
    if (selectedDepartments.includes(departmentId)) {
      setSelectedDepartments(
        selectedDepartments.filter((department) => department !== departmentId)
      );
    } else {
      setSelectedDepartments([...selectedDepartments, departmentId]);
    }

    console.log("Departamentos seleccionados:", selectedDepartments);

    // Verifica si algún departamento seleccionado ya existe en departmentsClients
    const duplicateDepartments = selectedDepartments.some(
      (selectedDepartment) =>
        departmentsClients.some(
          (clientDepartment) =>
            clientDepartment.departmentName === selectedDepartment
        )
    );

    if (duplicateDepartments) {
      // Configura el mensaje de error y abre el modal de error
      setErrorMessage(
        "Al menos un departamento seleccionado ya existe en la lista de departamentos del cliente."
      );
      setIsErrorModalOpen(true);
      return;
    }

    // Si no hay departamentos duplicados, continúa con la creación y actualización
    dispatch(createDepartment({ departmentNames: selectedDepartments }));
    dispatch(getAllDepartments());
  };

  const handleSelectAll = () => {
    setSelectedDepartments(departamentos);
  };

  const handleClearSelection = () => {
    setSelectedDepartments([]);
  };

  const saveDepartments = async () => {
    console.log("Departamentos seleccionados:", selectedDepartments);

    // Verifica si algún departamento seleccionado ya existe en departmentsClients
    const duplicateDepartments = selectedDepartments.some(
      (selectedDepartment) =>
        departmentsClients.some(
          (clientDepartment) =>
            clientDepartment.departmentName === selectedDepartment
        )
    );

    if (duplicateDepartments) {
      // Configura el mensaje de error y abre el modal de error
      setErrorMessage(
        "Al menos un departamento seleccionado ya existe en la lista de departamentos del cliente."
      );
      setIsErrorModalOpen(true);
      return;
    }

    // Si no hay departamentos duplicados, continúa con la creación y actualización
    await dispatch(createDepartment({ departmentNames: selectedDepartments }));
    await dispatch(getAllDepartments());
    setSelectedDepartments([]);

    const updatedDepartamentos = departamentos.filter(
      (department) => !selectedDepartments.includes(department)
    );

    setDepartamentos(updatedDepartamentos);
  };

  const itemsPerColumn = Math.ceil(departamentos.length / 2);
  const firstColumnDepartments = departamentos.slice(0, itemsPerColumn);
  const secondColumnDepartments = departamentos.slice(itemsPerColumn);




  useEffect(() => {
    const fetchData = async () => {
      try {
        const departamentos = await api.cargarDepartamentos();
        setDepartamentos(departamentos);
      } catch (error) {
        console.error("Error al obtener los departamentos:", error);
      }
    };
    fetchData();
  }, []);
  
  useEffect(() => {
    dispatch(getAllDepartments());
  }, [departamentos]); 
  const handleDeleteDepartment = async (departmentId) => {
    await dispatch(deleteManyDepartments([departmentId]));
    await dispatch(getAllDepartments());
  };

  return (
    <div
      style={{
        padding: "1rem",
      }}
    >
      <Grid item xs={12}>
        <Typography
          variant="h4"
          style={{
            marginBottom: "3rem",
          }}
        >
          Selecciona departamentos:
        </Typography>
      </Grid>
      <Grid
        container
        spacing={2}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "70%",
          }}
        >
          <Grid
            item
            xs={6}
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {firstColumnDepartments.map((department) => (
              <FormControlLabel
                key={department}
                control={
                  <Checkbox
                    checked={selectedDepartments.includes(department)}
                    onChange={() => handleDepartmentSelect(department)}
                  />
                }
                label={department}
              />
            ))}
          </Grid>
          <Grid
            item
            xs={6}
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {secondColumnDepartments.map((department) => (
              <FormControlLabel
                key={department}
                control={
                  <Checkbox
                    checked={selectedDepartments.includes(department)}
                    onChange={() => handleDepartmentSelect(department)}
                  />
                }
                label={department}
              />
            ))}
          </Grid>
        </div>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={saveDepartments}>
            Guardar
          </Button>
          <Button variant="contained" color="primary" onClick={handleSelectAll}>
            Seleccionar todos
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClearSelection}
          >
            Limpiar selección
          </Button>
        </Grid>
      </Grid>
      <Typography
        variant="h4"
        style={{
          marginBottom: "3rem",
        }}
      >
        Departamentos registrados:
      </Typography>
      <Table>
        <TableBody>
          {departmentsClients.map((department) => (
            <TableRow key={department._id}>
              <TableCell>{department.departmentName}</TableCell>
              <TableCell>
                <IconButton
                  aria-label="Eliminar"
                  onClick={() => handleDeleteDepartment(department._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal
        open={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "1rem",
            borderRadius: "0.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2
            style={{
              color: "red",
              fontWeight: "bold",
              fontSize: "1rem",
              fontFamily: "Roboto",
            }}
          >
            Error
          </h2>
          <p>{errorMessage}</p>
        </div>
      </Modal>
    </div>
  );
};
