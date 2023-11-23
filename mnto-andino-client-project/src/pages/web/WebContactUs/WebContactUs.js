import React, { useEffect, useState } from "react";
import "./WebContactUs.scss";
import { image } from "../../../assets";
import {
  Avatar,
  Button,
  Checkbox,
  Chip,
  Fade,
  FormControl,
  FormControlLabel,
  ListItem,
  MenuItem,
  Modal,
  Paper,
  Backdrop,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import DepartamentosApi from "../../../api/departamentos";
import { Mapa } from "../../../components/GeneralLayout";
import { Contact } from "./Contact";

export const WebContactUs = () => {
  const api = new DepartamentosApi();
  const [selectedChips, setSelectedChips] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
  const [apellido, setApellido] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [nombreCompania, setNombreCompania] = useState("No aplica");
  const [correo, setCorreo] = useState("");
  const [correoError, setCorreoError] = useState(false);

  const handlePersonaTipoChange = (event) => {
    setIsPersonaNatural(event.target.checked);
    setNombre(event.target.checked ? "" : "No aplica");
    setNombreCompania(event.target.checked ? "No aplica" : "");
  };

  const descargarPortafolio = () => {
    const rutaArchivoPDF =
      "https://mantenimientoandino.co:3000/uploads/pdfs/portafolio.pdf";
    console.log(rutaArchivoPDF);
    const link = document.createElement("a");
    link.href = rutaArchivoPDF;
    link.download = "portafolio.pdf";
    link.target = "_blank";
    link.click();
    handleCloseModal();
  };

  const enviarCorreo = () => {
    if (
      !nombre ||
      !correo ||
      (isColombia && !selectedCountry) ||
      (!isColombia && !selectedCountry) ||
      selectedChips.length === 0
    ) {
      // Muestra un mensaje de error si algún campo obligatorio está vacío o no se ha seleccionado ningún servicio.
      alert(
        "Por favor, complete todos los campos obligatorios y seleccione al menos un servicio."
      );
      return;
    }

    const correos = [
      "mantenimientoandino@gmail.com",
      "gerenciamantenimientoandino@gmail.com",
    ];
    const asunto = "Consulta sobre servicios de Mantenimiento Andino SAS.";
    const serviciosSeleccionados = selectedChips
      .filter((chipKey) => chipKey !== 0) // Filtra el chip "Todos"
      .map((chipKey) => chipData.find((data) => data.key === chipKey).label)
      .join(", ");
    const ubicacion = isColombia
      ? "Colombia - " + selectedCountry
      : "Fuera de Colombia - " + selectedCountry;
    const tipoCliente = isPersonaNatural ? "Persona Natural" : "Empresa";
    const cuerpoMensaje =
      `Nombre: ${nombre} ${apellido}\n` +
      `Tipo de Cliente: ${tipoCliente}\n` +
      `Nombre de la Compañía: ${nombreCompania}\n` +
      `Quiero recibir información al correo electrónico: ${correo}\n` +
      `Ubicación: ${ubicacion}\n` +
      `Servicios Seleccionados: ${serviciosSeleccionados}\n` + // Agrega los servicios seleccionados
      `\n\nAsunto: ${asunto}\n` + // Agrega el asunto del formulario
      `\n${mensaje}\n` +
      `\nEspero su información. Gracias!`;

    const correoTo = `mailto:${correos.join(",")}?subject=${encodeURIComponent(
      asunto
    )}&body=${encodeURIComponent(cuerpoMensaje)}`;

    window.location.href = correoTo;
  };

  const handleCorreoChange = (e) => {
    const correoValue = e.target.value;
    setCorreo(correoValue);
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const esCorreoValido = correoRegex.test(correoValue);
    setCorreoError(!esCorreoValido);
  };

  const enviarCorreoContact = () => {
    const correos = [
      "mantenimientoandino@gmail.com",
      "gerenciamantenimientoandino@gmail.com",
    ];
    const asunto = "Consulta sobre servicios de Mantenimiento Andino SAS.";
    const cuerpoMensaje = `Hola, estoy interesado en sus servicios.`;
    const correoTo = `mailto:${correos.join(",")}?subject=${encodeURIComponent(
      asunto
    )}&body=${encodeURIComponent(cuerpoMensaje)}`;
    window.location.href = correoTo;
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
    // <div className="web-contactus">
    //   <div className="contact-section">
    //     <div className="item1">
    //       <article>
    //         <header>
    //           <div className="upper-header">
    //             <div className="mini-title">CONTÁCTANOS</div>
    //           </div>
    //           <div className="form-contact-us">
    //             <FormControlLabel
    //               control={
    //                 <Switch
    //                   checked={isPersonaNatural}
    //                   onChange={handlePersonaTipoChange}
    //                   color="primary"
    //                 />
    //               }
    //               label={isPersonaNatural ? "Soy persona natural" : "Empresa"}
    //             />
    //             {isPersonaNatural ? (
    //               <div style={{ marginBottom: "10px", marginLeft: "10px" }}>
    //                 <TextField
    //                   id="standard-basic"
    //                   label="Nombre(s)"
    //                   variant="standard"
    //                   value={nombre}
    //                   onChange={(e) => setNombre(e.target.value)}
    //                 />
    //                 <TextField
    //                   id="standard-basic"
    //                   label="Apellido(s)"
    //                   variant="standard"
    //                   value={apellido}
    //                   onChange={(e) => setApellido(e.target.value)}
    //                 />
    //               </div>
    //             ) : (
    //               <div style={{ marginBottom: "10px" }}>
    //                 <TextField
    //                   fullWidth
    //                   id="standard-basic"
    //                   label="Nombre de la Compañía"
    //                   variant="standard"
    //                   value={nombreCompania}
    //                   onChange={(e) => setNombreCompania(e.target.value)}
    //                 />
    //               </div>
    //             )}
    //             <div style={{ marginTop: "10px" }}>
    //               <TextField
    //                 fullWidth
    //                 id="standard-basic"
    //                 label="Correo Electrónico"
    //                 variant="standard"
    //                 value={correo}
    //                 onChange={handleCorreoChange}
    //                 error={correoError}
    //                 helperText={
    //                   correoError ? "Correo electrónico inválido" : ""
    //                 }
    //               />
    //             </div>
    //             <div style={{ marginTop: "10px" }}>
    //               <FormControlLabel
    //                 control={
    //                   <Switch
    //                     checked={isColombia}
    //                     onChange={() => setIsColombia(!isColombia)}
    //                     color="primary"
    //                   />
    //                 }
    //                 label={
    //                   isColombia
    //                     ? "Estoy en Colombia"
    //                     : "Estoy fuera de Colombia"
    //                 }
    //               />
    //               {isColombia ? (
    //                 <Select
    //                   fullWidth
    //                   label="Selecciona el departamento"
    //                   value={selectedCountry}
    //                   onChange={(e) => setSelectedCountry(e.target.value)}
    //                   style={{ marginTop: "10px", color: "black" }}
    //                 >
    //                   {departamentos.map((departamento) => (
    //                     <MenuItem key={departamento} value={departamento}>
    //                       {departamento}
    //                     </MenuItem>
    //                   ))}
    //                 </Select>
    //               ) : (
    //                 <Select
    //                   fullWidth
    //                   label="Selecciona el país"
    //                   value={selectedCountry}
    //                   onChange={(e) => setSelectedCountry(e.target.value)}
    //                 >
    //                   {countryOptions.map((country) => (
    //                     <MenuItem key={country.key} value={country.value}>
    //                       {country.text}
    //                     </MenuItem>
    //                   ))}
    //                 </Select>
    //               )}
    //             </div>
    //             <br />
    //             <span>
    //               <strong>Selecciona los servicios que te interesan:</strong>
    //             </span>
    //             <br />
    //             {chipData.map((data) => {
    //               const isSelected = selectedChips.indexOf(data.key) !== -1;

    //               return (
    //                 <Chip
    //                   style={{
    //                     margin: "4px",
    //                     background:
    //                       "linear-gradient(rgba(235, 239, 241, 0.48), rgba(103, 187, 227, 0.48))",
    //                     color: "black",
    //                     fontSize: "12px",
    //                   }}
    //                   key={data.key}
    //                   label={data.label}
    //                   onClick={() => handleChipClick(data.key)}
    //                   onDelete={
    //                     isSelected
    //                       ? () => handleChipDelete(data.key)
    //                       : undefined
    //                   }
    //                   color={isSelected ? "primary" : undefined}
    //                   variant={isSelected ? "outlined" : undefined}
    //                 />
    //               );
    //             })}
    //             <div style={{ marginBottom: "15px", marginTop: "10px" }}>
    //               <TextField
    //                 multiline
    //                 fullWidth
    //                 rows={4}
    //                 id="standard-basic"
    //                 label="Déjanos tu mensaje, nosotros te contactaremos."
    //                 value={mensaje}
    //                 variant="standard"
    //                 onChange={(e) => setMensaje(e.target.value)}
    //               />
    //             </div>
    //             <br />
    //             <h3>
    //               En <strong>Mantenimiento Andino</strong>, priorizamos la
    //               privacidad y seguridad de tu información. Envía el formulario
    //               con confianza sabiendo que tus datos están seguros con
    //               nosotros.
    //             </h3>
    //             <div className="buttons-sections">
    //               <button className="comic-button" onClick={enviarCorreo}>
    //                 Enviar
    //               </button>
    //               <button className="comic-button" onClick={handleOpenModal}>
    //                 Solicitar portafolio
    //               </button>
    //             </div>
    //           </div>
    //         </header>
    //       </article>
    //     </div>
    //     <div className="item2">
    //       <div className="information-item2">
    //         <div className="information-item2__title">
    //           <Mapa></Mapa>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="item-profile-card">
    //     <figure className="snip1336">
    //       <img src={image.fondoSlide} alt="sample87" />
    //       <figcaption>
    //         <h2>
    //           Albert Edisson Berrio Galeano
    //           <br />
    //           <span>CEO</span>
    //         </h2>
    //         <p>
    //           <img
    //             src={image.call}
    //             style={{
    //               width: "12px",
    //               height: "12px",
    //               marginRight: "5px",
    //               color: "beige",
    //             }}
    //           />
    //           310 383 3591 <br />
    //           <img
    //             src={image.email}
    //             style={{
    //               width: "12px",
    //               height: "12px",
    //               marginRight: "5px",
    //               color: "beige",
    //             }}
    //           />
    //           mantenimientoandino@gmail.com <br />
    //           <img
    //             src={image.location}
    //             style={{
    //               width: "12px",
    //               height: "12px",
    //               marginRight: "5px",
    //               color: "beige",
    //             }}
    //           />
    //           Calle 76A # 21-85, Manizales, Colombia
    //         </p>
    //         <div
    //           style={{
    //             display: "flex",
    //             alignContent: "center",
    //             alignItems: "center",
    //             justifyContent: "center",
    //           }}
    //         >
    //           <a
    //             href={`https://api.whatsapp.com/send?phone=573103833591&text=Hola,%20estoy%20interesado%20en%20sus%20servicios.%20`}
    //             className="follow"
    //           >
    //             <img
    //               src={image.whatsApp}
    //               style={{ width: "15px", height: "15px" }}
    //             />
    //           </a>
    //           <a>
    //             <img
    //               src={image.email}
    //               onClick={enviarCorreoContact}
    //               style={{ width: "15px", height: "15px" }}
    //             ></img>
    //           </a>
    //           <div className="qrCodeContact">
    //             <img src={image.ceoCode} />
    //           </div>
    //         </div>
    //       </figcaption>
    //     </figure>
    //     <figure className="snip1336 hover">
    //       <img src={image.fondoSlide} alt="sample74" />
    //       <figcaption>
    //         <h2>
    //           Vanessa Londoño Villada
    //           <br />
    //           <span>GERENTE ADMINISTRATIVA</span>
    //         </h2>
    //         <p>
    //           <img
    //             src={image.call}
    //             style={{
    //               width: "12px",
    //               height: "12px",
    //               marginRight: "5px",
    //               color: "beige",
    //             }}
    //           />
    //           300 842 6136 <br />
    //           <img
    //             src={image.email}
    //             style={{
    //               width: "12px",
    //               height: "12px",
    //               marginRight: "5px",
    //               color: "beige",
    //             }}
    //           />
    //           gerenciamantenimientoandino@gmail.com <br />
    //           <img
    //             src={image.location}
    //             style={{
    //               width: "12px",
    //               height: "12px",
    //               marginRight: "5px",
    //               color: "beige",
    //             }}
    //           />
    //           Calle 76A # 21-85, Manizales, Colombia
    //         </p>
    //         <div
    //           style={{
    //             display: "flex",
    //             placeContent: "center",
    //             alignItems: "flex-end",
    //             justifyContent: "center",
    //             alignContent: "center",
    //             flexWrap: "wrap",
    //             flexDirection: "row",
    //           }}
    //         >
    //           <a
    //             href={`https://api.whatsapp.com/send?phone=573008426136&text=Hola,%20estoy%20interesado%20en%20sus%20servicios.%20`}
    //             className="follow"
    //           >
    //             <img
    //               src={image.whatsApp}
    //               style={{ width: "15px", height: "15px" }}
    //             />
    //           </a>
    //           <a>
    //             <img
    //               src={image.email}
    //               onClick={enviarCorreoContact}
    //               style={{ width: "15px", height: "15px" }}
    //             ></img>
    //           </a>
    //           <div className="qrCodeContact">
    //             <img src={image.gerenteCode} />
    //           </div>
    //         </div>
    //       </figcaption>
    //     </figure>
    //   </div>
    //   <Modal
    //     aria-labelledby="transition-modal-title"
    //     aria-describedby="transition-modal-description"
    //     className="modal"
    //     open={isModalOpen}
    //     onClose={handleCloseModal}
    //     closeAfterTransition
    //   >
    //     <Fade in={isModalOpen}>
    //       <div className="paper-modal-download">
    //         <h2 id="transition-modal-title">¿Desea descargar el portafolio?</h2>
    //         <p id="transition-modal-description">
    //           Haga clic en "Descargar" para iniciar la descarga del portafolio.
    //         </p>
    //         <div className="modal-buttons">
    //           <button className="comic-button" onClick={handleCloseModal}>
    //             Cancelar
    //           </button>
    //           <button className="comic-button" onClick={descargarPortafolio}>
    //             Descargar
    //           </button>
    //         </div>
    //       </div>
    //     </Fade>
    //   </Modal>
    // </div>
    <Contact></Contact>
    
  );
};
