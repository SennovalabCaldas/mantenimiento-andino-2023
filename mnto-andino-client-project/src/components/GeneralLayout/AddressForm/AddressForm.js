import React, { useState, useEffect } from "react";
import { Dropdown, Input, Button } from "semantic-ui-react";
import DepartamentosApi from "../../../api/departamentos";
import "./AddressForm.scss";
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

const streetTypeOptions = [
  {
    key: "autopista",
    text: "Autopista",
    value: "autopista",
  },
  {
    key: "avenida",
    text: "Avenida",
    value: "avenida",
  },
  {
    key: "avenida-calle",
    text: "Avenida Calle",
    value: "avenida-calle",
  },
  {
    key: "avenida-carrera",
    text: "Avenida Carrera",
    value: "avenida-carrera",
  },
  {
    key: "avenida-circunvalar",
    text: "Avenida Circunvalar",
    value: "avenida-circunvalar",
  },
  {
    key: "calle",
    text: "Calle",
    value: "calle",
  },
  {
    key: "carrera",
    text: "Carrera",
    value: "carrera",
  },
  {
    key: "circunvalar",
    text: "Circunvalar",
    value: "circunvalar",
  },
  {
    key: "diagonal",
    text: "Diagonal",
    value: "diagonal",
  },

  {
    key: "transversal",
    text: "Transversal",
    value: "transversal",
  },
  {
    key: "kilometro",
    text: "Kilometro",
    value: "kilometro",
  },
];

export const AddressForm = ({ onSelectedData, addressData, clearForm }) => {
  const api = new DepartamentosApi();
  const [selectedCountry, setSelectedCountry] = useState(
    addressData.country || ""
  );
  const [selectedDepartamento, setSelectedDepartamento] = useState(
    addressData.departamento || ""
  );
  const [selectedMunicipio, setSelectedMunicipio] = useState(
    addressData.municipio || ""
  );
  const [selectedStreet, setSelectedStreet] = useState(
    addressData.selectedStreet || ""
  );
  const [numero1, setNumero1] = useState(addressData.numero1 || "");

  const [departamentos, setDepartamentos] = useState([]);
  const [municipios, setMunicipios] = useState([]);

  // *************************Traerme los departamentos
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

  // *************************Traerme los municipios
  useEffect(() => {
    const fetchMunicipios = async () => {
      if (selectedDepartamento) {
        try {
          const municipios = await api.cargarMunicipios(selectedDepartamento);
          setMunicipios(municipios);
        } catch (error) {
          console.error("Error al obtener los municipios:", error);
        }
      } else {
        setMunicipios([]);
      }
    };
    fetchMunicipios();
  }, [selectedDepartamento]);

  // useEffect para limpiar los campos después de crear una nueva sede
  useEffect(() => {
    if (clearForm) {
      setSelectedCountry("");
      setSelectedDepartamento("");
      setSelectedMunicipio("");
      setSelectedStreet("");
      setNumero1("");
    }
  }, [clearForm]);

  // useEffect para inicializar los campos con la información de la sede a editar
  useEffect(() => {
    setSelectedCountry(addressData.country || "");
    setSelectedDepartamento(addressData.departamento || "");
    setSelectedMunicipio(addressData.municipio || "");
    setSelectedStreet(addressData.selectedStreet || "");
    setNumero1(addressData.numero1 || "");
  }, [addressData]);
  // Agrega aquí los estados y efectos necesarios para el resto de los campos de dirección

  const handleCountryChange = (event, { value }) => {
    setSelectedCountry(value);
    setSelectedDepartamento("");
    setSelectedMunicipio("");
    // Agrega aquí la lógica para el resto de los campos de dirección
  };
  // Agrega aquí el código JSX para el formulario de dirección, incluyendo los campos y sus respectivos componentes
  const handleDepartamentoChange = (event, { value }) => {
    setSelectedDepartamento(value);
    setSelectedMunicipio("");

    onSelectedData({
      country: selectedCountry,
      departamento: value,
      municipio: "",
    });
  };

  const handleMunicipioChange = (event, { value }) => {
    setSelectedMunicipio(value);
    onSelectedData({
      country: selectedCountry,
      departamento: selectedDepartamento,
      municipio: value,
    });
  };

  const handleStreetChange = (event, { value }) => {
    setSelectedStreet(value);
    onSelectedData({
      country: selectedCountry,
      departamento: selectedDepartamento,
      municipio: selectedMunicipio,
      selectedStreet: value,
    });
  };

  const handleNumero1Change = (event) => {
    setNumero1(event.target.value);
    onSelectedData({
      country: selectedCountry,
      departamento: selectedDepartamento,
      municipio: selectedMunicipio,
      selectedStreet: selectedStreet,
      numero1: event.target.value,
    });
  };

  const handleFormSubmit = () => {
    const data = {
      country: selectedCountry,
      departamento: selectedDepartamento,
      municipio: selectedMunicipio,
      selectedStreet: selectedStreet,
      numero1: numero1,
      // Agrega aquí los demás campos de dirección
    };
    onSelectedData(data);
      
  };

  return (
    <>
      <div
        className={`address-form-hidde ${
          selectedCountry === "Colombia" ? "address-form" : ""
        }`}
      >
        <Dropdown
          className="dropdown-address"
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
            <div className="address-form">
              <Dropdown
                clearable
                className="dropdown-address"
                placeholder="Departamento"
                fluid
                search
                selection
                options={departamentos.map((departamento) => ({
                  key: departamento,
                  value: departamento,
                  text: departamento,
                }))}
                value={selectedDepartamento} // Asegúrate de que selectedDepartamento esté vinculado al Dropdown de departamento
                onChange={handleDepartamentoChange}
                
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
                value={selectedMunicipio} // Asegúrate de que selectedMunicipio esté vinculado al Dropdown de municipio
                onChange={handleMunicipioChange}
                
              />
              <Dropdown
                clearable
                fluid
                search
                selection
                options={streetTypeOptions}
                placeholder="Tipo de calle"
                onChange={handleStreetChange}
                value={selectedStreet}
                
              />
              <Input
                icon="map signs"
                iconPosition="left"
                placeholder="N°"
                onChange={handleNumero1Change}
                value={numero1}
                
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};
