import React, { useState, useEffect } from "react";
import { Segment, Dropdown, Input, Button } from "semantic-ui-react";
import GoogleMap from "simple-react-google-maps";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./AddressForm.form";
import "./AddressForm.scss";
import DepartamentosApi from "../../../api/departamentos";

const addressComplementOptions = [
  {
    key: "edificio",
    text: "Edificio",
    value: "edificio",
  },
  {
    key: "torre",
    text: "Torre",
    value: "torre",
  },
  {
    key: "local",
    text: "Local",
    value: "local",
  },
  {
    key: "casa",
    text: "Casa",
    value: "casa",
  },
  {
    key: "oficina",
    text: "Oficina",
    value: "oficina",
  },
  {
    key: "bloque",
    text: "Bloque",
    value: "bloque",
  },
  {
    key: "lote",
    text: "Lote",
    value: "lote",
  },
  {
    key: "bodega",
    text: "Bodega",
    value: "bodega",
  },
  {
    key: "manzana",
    text: "Manzana",
    value: "manzana",
  },
  {
    key: "via",
    text: "Vía",
    value: "via",
  },
  {
    key: "troncal",
    text: "Troncal",
    value: "troncal",
  },
];

const zoneOptions = [
  {
    key: "norte",
    text: "Norte",
    value: "norte",
  },
  {
    key: "sur",
    text: "Sur",
    value: "sur",
  },
  {
    key: "este",
    text: "Este",
    value: "este",
  },
  {
    key: "oeste",
    text: "Oeste",
    value: "oeste",
  },
  {
    key: "centro",
    text: "Centro",
    value: "centro",
  },
  {
    key: "noreste",
    text: "Noreste",
    value: "noreste",
  },
  {
    key: "noroccidente",
    text: "Noroccidente",
    value: "noroccidente",
  },
  // Agrega más opciones de zona según sea necesario
];

const letterOptions = [
  {
    key: "a",
    value: "a",
    text: "A",
  },
  {
    key: "b",
    value: "b",
    text: "B",
  },
  {
    key: "c",
    value: "c",
    text: "C",
  },
  {
    key: "d",
    value: "d",
    text: "D",
  },
  {
    key: "e",
    value: "e",
    text: "E",
  },
  {
    key: "f",
    value: "f",
    text: "F",
  },
  {
    key: "g",
    value: "g",
    text: "G",
  },
  {
    key: "h",
    value: "h",
    text: "H",
  },
  {
    key: "i",
    value: "i",
    text: "I",
  },
  {
    key: "j",
    value: "j",
    text: "J",
  },
  {
    key: "k",
    value: "k",
    text: "K",
  },
  {
    key: "l",
    value: "l",
    text: "L",
  },
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
export const AddressForm = ({ onSelectedData, addressData }) => {
  console.log("OnselectedData desde AddressForm", onSelectedData());
  const [showFields, setShowFields] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [resultingString, setResultingString] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(addressData.country || "");
  const [selectedDepartamento, setSelectedDepartamento] = useState(
    addressData.departamento || ""
  );
  const [selectedMunicipio, setSelectedMunicipio] = useState(
    addressData.municipio || ""
  );
  const [selectedStreet, setSelectedStreet] = useState(
    addressData.selectedStreet || ""
  );
  const [selectedLetter1, setSelectedLetter1] = useState(
    addressData.selectedLetter1 || ""
  );
  const [numero1, setNumero1] = useState(addressData.numero1 || "");
  const [selectedLetter2, setSelectedLetter2] = useState(
    addressData.selectedLetter2 || ""
  );
  const [numero2, setNumero2] = useState(addressData.numero2 || "");
  const [selectedLetter3, setSelectedLetter3] = useState(
    addressData.selectedLetter3 || ""
  );
  const [numero3, setNumero3] = useState(addressData.numero3 || "");
  const [selectedComplement, setSelectedComplement] = useState(
    addressData.selectedComplement || ""
  );
  const [selectedZone, setSelectedZone] = useState(addressData.selectedZone || "");
  const [barrio, setBarrio] = useState(addressData.barrio || "");

  const [departamentos, setDepartamentos] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [nombreEdificio, setNombreEdificio] = useState("");
  const [caracteristicasAdicionales, setCaracteristicasAdicionales] =
    useState("");
  const [numeroLocal, setNumeroLocal] = useState("");

  const [showMap, setShowMap] = useState(false);
  const [addressValues, setAddressValues] = useState({
    latitude: null,
    longitude: null,
  });

  const api = new DepartamentosApi();

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

  const handleCountryChange = (event, { value }) => {
    setSelectedCountry(value);
    setSelectedDepartamento("");
    setSelectedMunicipio("");
    setShowFields(value === "Colombia");
    setShowInput(value !== "Colombia" && value !== "Estados Unidos");

    const data = {
      country: value,
      departamento: "",
      municipio: "",
      state: "",
      selectedStreet,
      selectedLetter1,
      numero1,
      selectedLetter2,
      numero2,
      selectedLetter3,
      numero3,
      selectedComplement,
      selectedZone,
      barrio,
    };
    onSelectedData(data);
  };

  const handleDepartamentoChange = (event, { value }) => {
    setSelectedDepartamento(value);
    setSelectedMunicipio("");

    setShowFields(selectedCountry === "Colombia");
    setShowInput(
      selectedCountry !== "Colombia" && selectedCountry !== "Estados Unidos"
    );

    onSelectedData({
      country: selectedCountry,
      departamento: value,
      municipio: "",
      state: "",
      selectedStreet,
      selectedLetter1,
      numero1,
      selectedLetter2,
      numero2,
      selectedLetter3,
      numero3,
      selectedComplement,
      selectedZone,
      barrio,
    });
  };

  const handleMunicipioChange = (event, { value }) => {
    setSelectedMunicipio(value);
    onSelectedData({
      country: selectedCountry,
      departamento: selectedDepartamento,
      municipio: value,
      state: "",
      selectedStreet,
      selectedLetter1,
      numero1,
      selectedLetter2,
      numero2,
      selectedLetter3,
      numero3,
      selectedComplement,
      selectedZone,
      barrio,
    });
  };

  const handleStateChange = (event, { value }) => {
    setSelectedState(value);
    const data = {
      country: selectedCountry,
      departamento: selectedDepartamento,
      municipio: selectedMunicipio,
      state: value,
    };
    onSelectedData(data);
  };

  const updateResultingString = () => {
    const updatedResultingString = `${(selectedStreet || "")
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
      .join(" ")} ${numero1 || ""}${(selectedLetter1 || "").toUpperCase()} ${(
      selectedZone || ""
    )
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
      .join("")} #${numero2 || ""}${(selectedLetter2 || "").toUpperCase()}-${
      numero3 || ""
    }${(selectedLetter3 || "").toUpperCase()}. ${(barrio || "")
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
      .join(
        " "
      )} ${selectedMunicipio}, ${selectedDepartamento}, ${selectedCountry}`;
    setResultingString(updatedResultingString);
  };

  const handleComplementChange = (event, { value }) => {
    setSelectedComplement(value);
    setIsEditing(true);
    updateResultingString();
  };
  const handleLetter1Change = (event, { value }) => {
    setSelectedLetter1(value);
    setIsEditing(true);
  };
  const handleLetter2Change = (event, { value }) => {
    setSelectedLetter2(value);
    setIsEditing(true);
  };
  const handleLetter3Change = (event, { value }) => {
    setSelectedLetter3(value);
    setIsEditing(true);
  };

  const handleZoneChange = (event, { value }) => {
    setSelectedZone(value);
    setIsEditing(true);
    handleFormSubmit();
  };
  const handleNumero1Change = (event) => {
    setNumero1(event.target.value);
    setIsEditing(true);
    handleFormSubmit();
    updateResultingString();
    onSelectedData({
      country: selectedCountry,
      departamento: selectedDepartamento,
      municipio: selectedMunicipio,
      selectedStreet, // Actualizar el valor del tipo de calle
      selectedLetter1,
      numero1: numero1,
      selectedLetter2,
      numero2,
      selectedLetter3,
      numero3,
      selectedComplement,
      selectedZone,
      barrio,
    });
  };
  const handleNumero2Change = (event) => {
    setNumero2(event.target.value);
    setIsEditing(true);
    handleFormSubmit();
  };
  const handleNumero3Change = (event) => {
    setNumero3(event.target.value);
    setIsEditing(true);
    handleFormSubmit();
  };
  const handleBarrioChange = (event) => {
    setBarrio(event.target.value);
    setIsEditing(true);
    handleFormSubmit();
  };
  const handleNombreEdificioChange = (event) => {
    setNombreEdificio(event.target.value);
    setIsEditing(true);
    handleFormSubmit();
  };
  const handleCaracteristicasAdicionalesChange = (event) => {
    setCaracteristicasAdicionales(event.target.value);
    setIsEditing(true);
    handleFormSubmit();
  };
  const handleNumeroLocalChange = (event) => {
    setNumeroLocal(event.target.value);
    setIsEditing(true);
    handleFormSubmit();
  };

  const handleStreetChange = (event, { value }) => {
    setSelectedStreet(value);
    setIsEditing(true);
    handleFormSubmit();
    updateResultingString();
    onSelectedData({
      country: selectedCountry,
      departamento: selectedDepartamento,
      municipio: selectedMunicipio,
      selectedStreet: value, // Actualizar el valor del tipo de calle
      selectedLetter1,
      numero1,
      selectedLetter2,
      numero2,
      selectedLetter3,
      numero3,
      selectedComplement,
      selectedZone,
      barrio,
    });
  };

  const handleMostrarMapaClick = async () => {
    try {
      const updatedResultingString = `${(selectedStreet || "")
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
        .join(" ")} ${numero1 || ""}${(selectedLetter1 || "").toUpperCase()} ${(
        selectedZone || ""
      )
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
        .join("")} #${numero2 || ""}${(selectedLetter2 || "").toUpperCase()}-${
        numero3 || ""
      }${(selectedLetter3 || "").toUpperCase()}. ${(barrio || "")
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
        .join(
          " "
        )} ${selectedMunicipio}, ${selectedDepartamento}, ${selectedCountry}`;

      const coordinates = await api.fetchCoordinates(updatedResultingString);
      if (coordinates) {
        setAddressValues({
          ...addressValues,
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
        });
        setShowMap(true);
      }
    } catch (error) {
      console.error("Error al obtener las coordenadas:", error);
    }
  };

  const CustomGoogleMap = () => {
    const markerOptions = {
      draggable: true,
      animation: "bounce",
      markerSize: "large",
      label: resultingString, // Aquí usamos directamente la variable resultingString
    };

    return (
      <GoogleMap
        apiKey={"AIzaSyBU_4Kck6p2b4Iri-bVSGznJqAWUHWWzUU"} // Recuerda reemplazar esto con tu propia API Key
        style={{ height: "300px", width: "650px" }}
        zoom={50}
        center={{ lat: addressValues.latitude, lng: addressValues.longitude }}
        markerOptions={markerOptions}
      />
    );
  };

  const handleFormSubmit = () => {
    const data = {
      selectedCountry,
      selectedDepartamento,
      selectedMunicipio,
      selectedStreet,
      selectedLetter1,
      numero1,
      selectedLetter2,
      numero2,
      selectedLetter3,
      numero3,
      selectedComplement,
      selectedZone,
      barrio,
    };
    onSelectedData(data);
    console.log("Valores del DepartmentsForm y AddressForm ", data);
  };

  return (
    <>
      <Dropdown
        clearable
        fluid
        search
        selection
        options={countryOptions}
        value={selectedCountry} // Asegúrate de que selectedCountry esté vinculado al Dropdown de país
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
            value={selectedDepartamento} // Asegúrate de que selectedDepartamento esté vinculado al Dropdown de departamento
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
            value={selectedMunicipio} // Asegúrate de que selectedMunicipio esté vinculado al Dropdown de municipio
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
          onChange={handleStateChange}
          iconPosition="left"
          placeholder="Search users..."
          style={{ marginLeft: "10px" }}
        />
      )}
      {showFields && (
        <>
          <Dropdown
            clearable
            fluid
            search
            selection
            options={streetTypeOptions}
            placeholder="Tipo de calle"
            onChange={handleStreetChange}
            value={selectedStreet}
            style={{ width: "180px", marginLeft: "5px" }}
          />
          <Dropdown
            clearable
            fluid
            search
            selection
            options={zoneOptions}
            placeholder="Zona"
            onChange={handleZoneChange}
            value={selectedZone}
            style={{ width: "120px", marginLeft: "5px" }}
          />

          <Input
            icon="map signs"
            iconPosition="left"
            placeholder="N°"
            onChange={handleNumero1Change}
            value={numero1}
            style={{ width: "70px", marginLeft: "5px" }}
          />
          <Dropdown
            clearable
            fluid
            search
            selection
            options={letterOptions}
            placeholder="Letra"
            onChange={handleLetter1Change}
            value={selectedLetter1}
            style={{ width: "70px", marginLeft: "5px" }}
          />
          <span style={{ margin: "0 5px" }}>#</span>
          <Input
            icon="map signs"
            iconPosition="left"
            placeholder="N°"
            onChange={handleNumero2Change}
            style={{ width: "70px", marginLeft: "5px" }}
          />
          <Dropdown
            clearable
            fluid
            search
            selection
            options={letterOptions}
            placeholder="Letra"
            onChange={handleLetter2Change}
            value={selectedLetter2}
            style={{ width: "70px", marginLeft: "5px" }}
          />
          <span style={{ margin: "0 5px" }}>-</span>
          <Input
            icon="map signs"
            iconPosition="left"
            placeholder="N°"
            onChange={handleNumero3Change}
            style={{ width: "70px", marginLeft: "5px" }}
          />
          <Dropdown
            clearable
            fluid
            search
            selection
            options={letterOptions}
            placeholder="Letra"
            onChange={handleLetter3Change}
            value={selectedLetter3}
            style={{ width: "70px", marginLeft: "5px" }}
          />
          <Input
            icon="map signs"
            iconPosition="left"
            placeholder="Barrio"
            onChange={handleBarrioChange}
            style={{ marginLeft: "5px" }}
          />

          <Dropdown
            clearable
            fluid
            search
            selection
            options={addressComplementOptions}
            placeholder="Complemento"
            onChange={handleComplementChange}
            value={selectedComplement}
            style={{ width: "160px", marginLeft: "5px" }}
          />
          {selectedComplement === "edificio" && (
            <Input
              icon="map signs"
              iconPosition="left"
              placeholder="Nombre edificio"
              onChange={handleNombreEdificioChange}
              style={{ flex: 1, marginLeft: "5px" }}
            />
          )}
          {selectedComplement === "torre" && (
            <Input
              icon="map signs"
              iconPosition="left"
              placeholder="Nombre edificio"
              onChange={handleNombreEdificioChange}
              style={{ flex: 1, marginLeft: "5px" }}
            />
          )}
          {selectedComplement === "casa" && (
            <Input
              icon="map signs"
              iconPosition="left"
              placeholder="Características adicionales"
              onChange={handleCaracteristicasAdicionalesChange}
              style={{ flex: 1, marginLeft: "5px" }}
            />
          )}
          {selectedComplement === "lote" && (
            <Input
              icon="map signs"
              iconPosition="left"
              placeholder="Características adicionales"
              onChange={handleCaracteristicasAdicionalesChange}
              style={{ flex: 1, marginLeft: "5px" }}
            />
          )}
          {selectedComplement === "via" && (
            <Input
              icon="map signs"
              iconPosition="left"
              placeholder="Características adicionales"
              onChange={handleCaracteristicasAdicionalesChange}
              style={{ flex: 1, marginLeft: "5px" }}
            />
          )}
          {selectedComplement === "troncal" && (
            <Input
              icon="map signs"
              iconPosition="left"
              placeholder="Características adicionales"
              onChange={handleCaracteristicasAdicionalesChange}
              style={{ flex: 1, marginLeft: "5px" }}
            />
          )}
          {selectedComplement === "local" && (
            <>
              <Input
                icon="map signs"
                iconPosition="left"
                placeholder="Nombre del edificio"
                onChange={handleNombreEdificioChange}
                style={{ flex: 1, marginLeft: "5px" }}
              />
              <Input
                icon="map signs"
                iconPosition="left"
                placeholder="N° local"
                onChange={handleNumeroLocalChange}
                style={{ flex: 1, marginLeft: "5px" }}
              />
            </>
          )}
          <Button onClick={handleMostrarMapaClick}>Ver en google maps</Button>
          <Button onClick={handleFormSubmit}>Guardar dirección</Button>
          {showMap && <CustomGoogleMap />}
          <span style={{ marginTop: "10px" }}>
            {isEditing ? resultingString : ""}
          </span>
        </>
      )}
    </>
  );
};
