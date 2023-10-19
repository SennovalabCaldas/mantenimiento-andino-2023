import React, { useEffect, useState } from "react";
import "./WebContactUs.scss";
import { image } from "../../../assets";
import {
  Avatar,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  ListItem,
  MenuItem,
  Paper,
  Radio,
  Select,
  TextField,
} from "@mui/material";
import DepartamentosApi from "../../../api/departamentos";
import { Mapa } from "../../../components/GeneralLayout";

export const WebContactUs = () => {
  const api = new DepartamentosApi();
  const [selectedChips, setSelectedChips] = useState([]);
  const [chipData, setChipData] = React.useState([
    { key: 0, label: "Todos" },
    { key: 1, label: "Obra civil y mantenimiento" },
    { key: 2, label: "Construcción y adecuación" },
    { key: 3, label: "Suministro e instalación" },
    { key: 4, label: "Redes y refrigeración" },
  ]);

  const countryOptions = [
    { key: "ar", value: "Argentina", flag: "ar", text: "Argentina" },
    { key: "bo", value: "Bolivia", flag: "bo", text: "Bolivia" },
    { key: "br", value: "Brasil", flag: "br", text: "Brasil" },
    { key: "cl", value: "Chile", flag: "cl", text: "Chile" },
    { key: "co", value: "Colombia", flag: "co", text: "Colombia" },
    { key: "cr", value: "Costa Rica", flag: "cr", text: "Costa Rica" },
    { key: "cu", value: "Cuba", flag: "cu", text: "Cuba" },
    {
      key: "do",
      value: "República Dominicana",
      flag: "do",
      text: "República Dominicana",
    },
    { key: "ec", value: "Ecuador", flag: "ec", text: "Ecuador" },
    { key: "sv", value: "El Salvador", flag: "sv", text: "El Salvador" },
    { key: "us", value: "Estados Unidos", flag: "us", text: "Estados Unidos" },
    { key: "gt", value: "Guatemala", flag: "gt", text: "Guatemala" },
    { key: "ht", value: "Haití", flag: "ht", text: "Haití" },
    { key: "hn", value: "Honduras", flag: "hn", text: "Honduras" },
    { key: "mx", value: "México", flag: "mx", text: "México" },
    { key: "ni", value: "Nicaragua", flag: "ni", text: "Nicaragua" },
    { key: "pa", value: "Panamá", flag: "pa", text: "Panamá" },
    { key: "py", value: "Paraguay", flag: "py", text: "Paraguay" },
    { key: "pe", value: "Perú", flag: "pe", text: "Perú" },
    { key: "pr", value: "Puerto Rico", flag: "pr", text: "Puerto Rico" },
    { key: "uy", value: "Uruguay", flag: "uy", text: "Uruguay" },
    { key: "ve", value: "Venezuela", flag: "ve", text: "Venezuela" },
  ];

  const [departamentos, setDepartamentos] = useState([]);
  const [isColombia, setIsColombia] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isPersonaNatural, setIsPersonaNatural] = useState(true);
  const [nombre, setNombre] = useState("");
  const [nombreCompania, setNombreCompania] = useState("");
  const [correo, setCorreo] = useState("");

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  const handleChipClick = (chipKey) => {
    if (selectedChips.indexOf(chipKey) === -1) {
      setSelectedChips([...selectedChips, chipKey]);
    }
  };

  const handleChipDelete = (chipKey) => {
    const updatedChips = selectedChips.filter((key) => key !== chipKey);
    setSelectedChips(updatedChips);
  };


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

  console.log(departamentos);
  return (
    <div className="contact-section">
      <div className="item1">
        <article>
          <header
            style={{
              backgroundImage: `url(${image.authBg})`,
            }}
          >
            <div className="upper-header">
              <div className="mini-title">formulario de contacto</div>
            </div>
            <div className="form-contact-us">
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => setIsPersonaNatural(e.target.checked)}
                  />
                }
                label="¿Es persona natural?"
              />
              {isPersonaNatural ? (
                <div style={{ marginBottom: "10px" }}>
                  <TextField
                    fullWidth
                    id="standard-basic"
                    label="Nombre(s)"
                    variant="standard"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </div>
              ) : (
                <div style={{ marginBottom: "10px" }}>
                  <TextField
                    fullWidth
                    id="standard-basic"
                    label="Nombre de la Compañía"
                    variant="standard"
                    value={nombreCompania}
                    onChange={(e) => setNombreCompania(e.target.value)}
                  />
                </div>
              )}
              <TextField
                fullWidth
                id="standard-basic"
                label="Correo Electrónico"
                variant="standard"
                value={correo} // Asigna el estado 'correo' al valor del campo
                onChange={(e) => setCorreo(e.target.value)} // Maneja el cambio en el estado 'correo'
              />
              ¿Está en Colombia?
              <br />
              <FormControl component="fieldset">
                <FormControlLabel
                  control={
                    <Radio
                      checked={isColombia}
                      onChange={() => setIsColombia(true)}
                    />
                  }
                  label="Sí, estoy en Colombia"
                />
                <FormControlLabel
                  control={
                    <Radio
                      checked={!isColombia}
                      onChange={() => setIsColombia(false)}
                    />
                  }
                  label="No, no estoy en Colombia"
                />
              </FormControl>
              {isColombia ? (
                <Select
                  fullWidth
                  label="Departamento"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                >
                  {departamentos.map((departamento) => (
                    <MenuItem key={departamento} value={departamento}>
                      {departamento}{" "}
                    </MenuItem>
                  ))}
                </Select>
              ) : (
                <Select
                  fullWidth
                  label="País"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                >
                  {countryOptions.map((country) => (
                    <MenuItem key={country.key} value={country.value}>
                      {country.text}
                    </MenuItem>
                  ))}
                </Select>
              )}
              <br />
              <br />
              {chipData.map((data) => {
                const isSelected = selectedChips.indexOf(data.key) !== -1;

                return (
                  <Chip
                    key={data.key}
                    label={data.label}
                    onClick={() => handleChipClick(data.key)}
                    onDelete={
                      isSelected ? () => handleChipDelete(data.key) : undefined
                    }
                    color={isSelected ? "primary" : undefined}
                    variant={isSelected ? "outlined" : undefined}
                    style={{ margin: "4px" }}
                  />
                );
              })}
              <div style={{ marginBottom: "10px" }}>
                <TextField
                  multiline
                  fullWidth
                  id="standard-basic"
                  label="Mensaje"
                  variant="standard"
                />
              </div>
              <button className="comic-button">Enviar!</button>
            </div>
          </header>
        </article>
      </div>
      <div className="item2">
        <div className="information-item2">
          <div className="information-item2__title">
            <Mapa></Mapa>
          </div>
        </div>
      </div>
    </div>
  );
};
