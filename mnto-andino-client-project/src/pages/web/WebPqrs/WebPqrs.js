import React, { useEffect, useRef, useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Card,
  CardContent,
  Checkbox,
} from "@mui/material";
import "./WebPqrs.scss"; // Importa el archivo SCSS
import ReactQuill from "react-quill";
import { BackToMntoAndino } from "../../../components/Client/BackToMntoAndino/BackToMntoAndino";
import { image } from "../../../assets";
import { Link } from "react-router-dom";
import DepartamentosApi from "../../../api/departamentos";
import Footer from "../../../components/Shared/Footer/Footer";

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

export const WebPqrs = () => {
  const api = new DepartamentosApi();
  const [departamentos, setDepartamentos] = useState([]);
  const [pqrsType, setPqrsType] = useState("");
  const [description, setDescription] = useState({ ops: "" });
  const [pqrsDescription, setPqrsDescription] = useState("");
  const [isCompany, setIsCompany] = useState(false);
  const [name, setName] = useState("");
  const [idType, setIdType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isInColombia, setIsInColombia] = useState(true);
  const [verificationDigit, setVerificationDigit] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("Colombia");

  const handlePqrsTypeChange = (event) => {
    setPqrsType(event.target.value);
  };

  const handleVerificationDigitChange = (event) => {
    setVerificationDigit(event.target.value);
  };

  const handleDescriptionChange = (content, delta, source, editor) => {
    setDescription(editor.getContents());
  };

  const handleCompanySwitchChange = (event) => {
    setIsCompany(event.target.checked);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleIdTypeChange = (event) => {
    setIdType(event.target.value);
  };

  const handleIdNumberChange = (event) => {
    setIdNumber(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const tipoPQRS = pqrsType;
    const descripcionPQRS = pqrsDescription;
    const esEmpresa = isCompany ? "Sí" : "No";
    const nombre = name;
    const tipoIdentificacion = idType;
    const numeroIdentificacion = idNumber;
    const correoElectronico = email;
    const estaEnColombia = isInColombia ? "Sí" : "No";
    const departamentoPais = isInColombia ? selectedCountry : selectedCountry;

    const cuerpoMensaje = `
      Tipo de PQRS: ${tipoPQRS}
      Descripción de PQRS: ${descripcionPQRS}
      ¿Es empresa?: ${esEmpresa}
      Nombre: ${nombre}
      Tipo de Identificación: ${tipoIdentificacion}
      Número de Identificación: ${numeroIdentificacion}
      Correo Electrónico: ${correoElectronico}
      ¿Está en Colombia?: ${estaEnColombia}
      Departamento/País: ${departamentoPais}
    `;

    const correos = [
      "mantenimientoandino@gmail.com",
      "gerenciamantenimientoandino@gmail.com",
      email, // Agrega también el correo del usuario que diligenció el formulario
    ];
    const asunto = "Nuevo PQRS - Mantenimiento Andino SAS";
    const correoTo = `mailto:${correos.join(",")}?subject=${encodeURIComponent(
      asunto
    )}&body=${encodeURIComponent(cuerpoMensaje)}`;

    window.location.href = correoTo;
  };

  const handleCancel = () => {
    setPqrsType("");
    setDescription("");
    setIsCompany(false);
    setName("");
    setIdType("");
    setIdNumber("");
    setEmail("");
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

  return (
    <>
      <div className="back-to-mnto">
        <BackToMntoAndino
          thumbnailSrc={image.logomnbg}
          fullSrc={image.logoSennovalabNoC}
        />
      </div>
      <div className="formContainer-pqrs">
        <div
          className="formContainer"
          style={{ marginTop: "120px", width: "70%" }}
        >
          <Card>
            <CardContent>
              <h1><strong>QUEREMOS ESCUCHARTE</strong></h1>
              <h3>
                Tu opinión y tus comentarios son muy importantes para nosotros.{" "}
                <br />
                Nos aseguraremos de revisar tus comentarios y darte respuesta
                tan pronto como nos sea posible.
              </h3>
              <br />
              <form onSubmit={handleSubmit}>
                <FormControl className="formControl" fullWidth>
                  <InputLabel id="pqrs-type-label">Tipo de PQRS</InputLabel>
                  <Select
                    labelId="pqrs-type-label"
                    id="pqrs-type"
                    value={pqrsType}
                    onChange={handlePqrsTypeChange}
                    label="Tipo de PQRS"
                    required
                  >
                    <MenuItem value="P">Petición</MenuItem>
                    <MenuItem value="Q">Queja</MenuItem>
                    <MenuItem value="R">Reclamo</MenuItem>
                    <MenuItem value="S">Sugerencia</MenuItem>
                  </Select>
                </FormControl>
                <FormControlLabel
                  control={
                    <Switch
                      checked={isCompany}
                      onChange={handleCompanySwitchChange}
                    />
                  }
                  label="¿Representa una empresa?"
                />
                <TextField
                  label="Nombre"
                  fullWidth
                  margin="normal"
                  value={name}
                  onChange={handleNameChange}
                  disabled={!isCompany}
                />
                <FormControl className="formControl" fullWidth>
                  <InputLabel id="id-type-label">
                    Tipo de Identificación
                  </InputLabel>
                  <Select
                    labelId="id-type-label"
                    id="id-type"
                    value={idType}
                    onChange={handleIdTypeChange}
                    label="Tipo de Identificación"
                    required
                    disabled={!isCompany}
                  >
                    <MenuItem value="CC">Cédula de Ciudadanía</MenuItem>
                    <MenuItem value="CE">Cédula Extranjera</MenuItem>
                    <MenuItem value="Pasaporte">Pasaporte</MenuItem>
                    <MenuItem value="NIT">NIT</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  label="Número de Identificación"
                  margin="normal"
                  value={idNumber}
                  onChange={handleIdNumberChange}
                  required
                  disabled={!isCompany}
                />

                {isCompany && idType === "NIT" && (
                  <TextField
                    label="Dígito de Verificación"
                    margin="normal"
                    value={verificationDigit}
                    onChange={handleVerificationDigitChange} // Agrega la función para manejar el cambio del dígito de verificación aquí
                    required
                    style={{ marginLeft: "16px" }} // Ajusta el espaciado entre los campos
                  />
                )}
                <br />
                <FormControlLabel
                  control={
                    <Switch
                      checked={isInColombia}
                      onChange={(event) =>
                        setIsInColombia(event.target.checked)
                      }
                    />
                  }
                  label={
                    isInColombia ? "Estoy en Colombia" : "No estoy en Colombia"
                  }
                />

                {isInColombia ? (
                  <Select
                    fullWidth
                    label="Selecciona el departamento"
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    style={{ marginTop: "10px", color: "black" }}
                  >
                    {departamentos.map((departamento) => (
                      <MenuItem key={departamento} value={departamento}>
                        {departamento}
                      </MenuItem>
                    ))}
                  </Select>
                ) : (
                  <Select
                    fullWidth
                    label="Selecciona el país"
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
                <TextField
                  label="Correo Electrónico"
                  fullWidth
                  margin="normal"
                  value={email}
                  onChange={handleEmailChange}
                  type="email"
                  required
                />
                <FormControl className="formControl" fullWidth>
                  <ReactQuill
                    value={description}
                    onChange={handleDescriptionChange}
                    modules={{
                      toolbar: [
                        [{ header: [1, 2, 3, false] }],
                        ["bold", "italic", "underline", "strike", "blockquote"],
                        [{ list: "ordered" }, { list: "bullet" }],
                        ["link", "image", "video"],
                        ["clean"],
                      ],
                    }}
                  />
                </FormControl>
                <FormControlLabel
                  className="formControlLabel"
                  required
                  control={<Checkbox />}
                  label={
                    <>
                      Autorizo el tratamiento de mis datos personales de acuerdo
                      con los términos establecidos en la{" "}
                      <Link to="/privacypolicy">POLÍTICA DE PRIVACIDAD</Link>
                    </>
                  }
                />
                <div className="form-group-buttons">
                  <button type="submit" className="comic-button">
                    Enviar PQRS
                  </button>
                  <button onClick={handleCancel} className="comic-button">
                    Cancelar
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};
