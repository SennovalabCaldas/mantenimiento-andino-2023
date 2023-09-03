import React, { useEffect, useState } from "react";
import { Dropdown, Segment, Input } from "semantic-ui-react";
import DepartamentosApi from "../../../api/departamentos";

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

const stateOptions = [
  { key: "al", value: "al", flag: "al", text: "Alabama" },
  { key: "ak", value: "ak", text: "Alaska" },
  { key: "az", value: "az", flag: "az", text: "Arizona" },
  { key: "ar", value: "ar", flag: "ar", text: "Arkansas" },
  { key: "ca", value: "ca", text: "California" },
  { key: "co", value: "co", flag: "co", text: "Colorado" },
  { key: "ct", value: "ct", text: "Connecticut" },
  { key: "de", value: "de", flag: "de", text: "Delaware" },
  { key: "fl", value: "fl", text: "Florida" },
  { key: "ga", value: "ga", flag: "ga", text: "Georgia" },
  // Resto de la lista de estados...
];

 const DepartmentsForm = ({ onSubmit}) => {
  const [departamentos, setDepartamentos] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedDepartamento, setSelectedDepartamento] = useState("");
  const [selectedMunicipio, setSelectedMunicipio] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [estado, setEstado] = useState("");
  const [showInput, setShowInput] = useState(false);

  const api = new DepartamentosApi();

  const handleCountryChange = (event, { value }) => {
    setSelectedCountry(value);
    setSelectedDepartamento("");
    setSelectedMunicipio("");

    if (!value || value === "Colombia" || value === "Estados Unidos") {
      setShowInput(false);
    } else {
      setShowInput(true);
    }
  };

  const handleDepartamentoChange = (event, { value }) => {
    setSelectedDepartamento(value);
    setSelectedMunicipio("");
  };

  // Función para enviar los valores de DepartmentsForm a SedeG
  const handleMunicipioChange = (event, { value }) => {
    setSelectedMunicipio(value);
    onSubmit({
      country: selectedCountry,
      departamento: selectedDepartamento,
      municipio: value,
      state: selectedState,
    });
  };

  const handleStateChange = (event, { value }) => {
    setSelectedState(value);
    onSubmit({
      country: selectedCountry,
      departamento: selectedDepartamento,
      municipio: selectedMunicipio,
      state: value,
    });
  };

  const handleEstadoChange = (event, { value }) => {
    setEstado(value);
  };
  return (
    <>
      <Segment style={{ display: "flex", alignItems: "center" }}>
        <Dropdown
          clearable
          fluid
          search
          selection
          options={countryOptions}
          value={selectedCountry}
          placeholder="Selecciona un país"
          onChange={handleCountryChange}
        />
        {selectedCountry === "Colombia" && (
          <>
            <Dropdown
              clearable
              placeholder="Departamento"
              fluid
              search
              selection
              options={departamentos.map((departamento) => ({
                key: departamento,
                value: departamento,
                text: departamento,
              }))}
              value={selectedDepartamento}
              onChange={handleDepartamentoChange}
              style={{ marginLeft: "10px" }}
            />
            <Dropdown
              clearable
              placeholder="Municipio"
              fluid
              search
              selection
              options={municipios.map((municipio) => ({
                key: municipio,
                value: municipio,
                text: municipio,
              }))}
              value={selectedMunicipio}
              onChange={handleMunicipioChange}
              style={{ marginLeft: "10px" }}
            />
          </>
        )}
        {selectedCountry === "Estados Unidos" && (
          <Dropdown
            clearable
            fluid
            search
            selection
            options={stateOptions}
            placeholder="Select Statr"
            onChange={handleStateChange}
            style={{ marginLeft: "10px" }}
          />
        )}
        {showInput && (
          <Input
            icon="globe"
            onChange={handleEstadoChange}
            iconPosition="left"
            placeholder="Search users..."
            style={{ marginLeft: "10px" }}
          />
        )}
      </Segment>
    </>
  );
};

export default DepartmentsForm;