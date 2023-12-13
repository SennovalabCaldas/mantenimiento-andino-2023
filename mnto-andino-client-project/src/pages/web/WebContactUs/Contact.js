import React, { useEffect, useState } from "react";
import "./Contact.scss";
import { image } from "../../../assets";
import { Chip } from "@mui/material";
import { Mapa } from "../../../components/GeneralLayout";

export const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [contactType, setContactType] = useState("individual");
  const [selectedCountry, setSelectedCountry] = useState("");
  const countryOptions = [
    "Argentina",
    "Bolivia",
    "Brasil",
    "Chile",
    "Colombia",
    "Costa Rica",
    "Cuba",
    "Ecuador",
    "El Salvador",
    "Guatemala",
    "Haití",
    "Honduras",
    "México",
    "Nicaragua",
    "Panamá",
    "Paraguay",
    "Perú",
    "República Dominicana",
    "Uruguay",
    "Venezuela",
  ];
  const [chipData, setChipData] = React.useState([
    { key: 0, label: "Todos" },
    { key: 1, label: "Obra civil y mantenimiento" },
    { key: 2, label: "Construcción y adecuación" },
    { key: 3, label: "Suministro e instalación" },
    { key: 4, label: "Redes y refrigeración" },
  ]);
  const [selectedChips, setSelectedChips] = React.useState([]);
  const correos = [
    "mantenimientoandino@gmail.com",
    "gerenciamantenimientoandino@gmail.com",
  ];
  const handleChipClick = (chipKey) => {
    if (chipKey === 0) {
      setSelectedChips([0]);
    } else {
      setSelectedChips((chips) => {
        const index = chips.indexOf(chipKey);
        if (index === -1) {
          return [...chips, chipKey];
        } else {
          return chips.filter((chip) => chip !== chipKey);
        }
      });
    }
  };

  useEffect(() => {
    const toggleSwitch = document.querySelector(
      '.theme-switch input[type="checkbox"]'
    );

    const validate = () => {
      if (name.length < 3) {
        setError("Your name should be at least 3 characters long.");
        return false;
      }

      if (!(email.includes(".") && email.includes("@"))) {
        setError("Please enter a valid email address.");
        return false;
      }

      if (!emailIsValid(email)) {
        setError("Please enter a valid email address.");
        return false;
      }

      if (message.length < 15) {
        setError("Please write a longer message.");
        return false;
      }

      setError("");
      setSuccessMsg("Thank you! I will get back to you as soon as possible.");

      setTimeout(function () {
        setSuccessMsg("");
        document.getElementById("contact-form").reset();
      }, 6000);

      return true;
    };

    const emailIsValid = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };
  }, [name, email, message]);

  const validate = () => {
    if (name.length < 3) {
      setError("Your name should be at least 3 characters long.");
      return false;
    }

    if (!(email.includes(".") && email.includes("@"))) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (!emailIsValid(email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (message.length < 15) {
      setError("Please write a longer message.");
      return false;
    }

    setError("");
    setSuccessMsg("Thank you! I will get back to you as soon as possible.");

    setTimeout(function () {
      setSuccessMsg("");
      document.getElementById("contact-form").reset();
    }, 6000);

    return true;
  };

  const emailIsValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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

  const enviarCorreo = () => {
    if (!name || !email || !selectedCountry || selectedChips.length === 0) {
      // Show an error message if any required field is empty or no service is selected.
      alert(
        "Please fill in all required fields and select at least one service."
      );
      return;
    }

    const asunto = "Consulta sobre servicios de Mantenimiento Andino SAS.";
    const serviciosSeleccionados = selectedChips
      .filter((chipKey) => chipKey !== 0) // Filter out the "Todos" chip
      .map((chipKey) => chipData.find((data) => data.key === chipKey).label)
      .join(", ");
    const ubicacion = `Ubicación: ${selectedCountry}`;
    const tipoCliente = `Tipo de Cliente: ${contactType}`;
    const cuerpoMensaje =
      `Nombre: ${name}\n` +
      `Correo Electrónico: ${email}\n` +
      `${ubicacion}\n` +
      `${tipoCliente}\n` +
      `Servicios Seleccionados: ${serviciosSeleccionados}\n\n` +
      `Mensaje:\n${message}`;

    const correos = [
      "mantenimientoandino@gmail.com",
      "gerenciamantenimientoandino@gmail.com",
    ];
    const correoTo = `mailto:${correos.join(",")}?subject=${encodeURIComponent(
      asunto
    )}&body=${encodeURIComponent(cuerpoMensaje)}`;

    window.location.href = correoTo;
    setSuccessMsg("Thank you! I will get back to you as soon as possible.");

    setTimeout(() => {
      setSuccessMsg("");
      resetForm();
    }, 6000);
  };

  const handleChipDelete = (chipKey) => {
    const updatedChips = selectedChips.filter((key) => key !== chipKey);
    setSelectedChips(updatedChips);
  };

  return (
    <div className="contact-design">
      <div className="contact-container">
        <div className="right-col">
          <div className="form-contact-mnto">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                alignContent: "center",
                textAlign: "center",
              }}
            >
              <h1>Contactanos</h1>
              <img className="logo" src={image.logomn} />
            </div>

            <br />

            <form
              id="contact-form"
              method="post"
              onSubmit={(e) => {
                e.preventDefault();
                enviarCorreo();
              }}
              style={{
                marginLeft: "10px",
                backgroundColor: "rgb(124 160 161 / 28%)",
                borderRadius: "5px",
                padding: "25px",
                color: "rgba(0,0,0,.95)",
              }}
            >
              <label
                htmlFor="name"
                style={{
                  paddingBottom: "22px",
                }}
              >
                En <strong>Mantenimiento Andino</strong>, priorizamos la
                privacidad y seguridad de tu información. Envía el formulario
                con confianza sabiendo que tus datos están seguros con nosotros.
              </label>
              <div>
                <label htmlFor="name">Tipo de contacto:</label>
                <label className="input-radio">
                  <input
                    type="radio"
                    value="individual"
                    checked={contactType === "individual"}
                    onChange={() => setContactType("individual")}
                  />
                  Individual
                </label>
                <label className="input-radio">
                  <input
                    type="radio"
                    value="company"
                    checked={contactType === "company"}
                    onChange={() => setContactType("company")}
                  />
                  Compañía
                </label>
              </div>
              <br />
              <label htmlFor="name">Nombre completo</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Tu nombre completo"
                required
                onChange={(e) => setName(e.target.value)}
              />
              <br />

              <label htmlFor="email">Correo electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Tu email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />

              <label htmlFor="country">País</label>
              <select
                id="country"
                name="country"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                <option value="" disabled>
                  Selecciona un país
                </option>
                {countryOptions.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              <br />

              <label htmlFor="name">
                Selecciona los servicios que te interesan:
              </label>
              <br />
              {chipData.map((data) => {
                const isSelected = selectedChips.indexOf(data.key) !== -1;

                return (
                  <Chip
                    style={{
                      margin: "4px",
                      color: "black",
                      fontSize: "10px",
                      textTransform: "uppercase",
                    }}
                    key={data.key}
                    label={data.label}
                    onClick={() => handleChipClick(data.key)}
                    onDelete={
                      isSelected ? () => handleChipDelete(data.key) : undefined
                    }
                    color={isSelected ? "primary" : undefined}
                    variant={isSelected ? "outlined" : undefined}
                  />
                );
              })}
              <label htmlFor="message">Mensaje</label>
              <textarea
                rows="6"
                placeholder="Tu mensaje"
                id="message"
                name="message"
                required
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>

              <div id="error">{error}</div>
              <div id="success-msg">{successMsg}</div>

              <button type="submit" className="comic-button">
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="second-contact-container">
        <div className="left-col-2">
          <Mapa></Mapa>
        </div>
        <div className="right-col-2">
          <div className="item-profile-card">
            <figure className="snip1336">
              <img src={image.fondoSlide} alt="sample87" />
              <figcaption>
                <h2>
                  Albert Edisson Berrio Galeano
                  <br />
                  <span>CEO</span>
                </h2>
                <p>
                  <img
                    src={image.call}
                    style={{
                      width: "12px",
                      height: "12px",
                      marginRight: "5px",
                      color: "beige",
                    }}
                  />
                  310 383 3591 <br />
                  <img
                    src={image.email}
                    style={{
                      width: "12px",
                      height: "12px",
                      marginRight: "5px",
                      color: "beige",
                    }}
                  />
                  mantenimientoandino@gmail.com <br />
                  <img
                    src={image.location}
                    style={{
                      width: "12px",
                      height: "12px",
                      marginRight: "5px",
                      color: "beige",
                    }}
                  />
                  Calle 76A # 21-85, Manizales, Colombia
                </p>
                <div
                  style={{
                    display: "flex",
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <a
                    href={`https://api.whatsapp.com/send?phone=573103833591&text=Hola,%20estoy%20interesado%20en%20sus%20servicios.%20`}
                    className="follow"
                  >
                    <img
                      src={image.whatsApp}
                      style={{ width: "15px", height: "15px" }}
                    />
                  </a>
                  <a>
                    <img
                      src={image.email}
                      onClick={enviarCorreoContact}
                      style={{ width: "15px", height: "15px" }}
                    ></img>
                  </a>
                  <div className="qrCodeContact">
                    <img src={image.ceoCode} />
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
};
