import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import "./style.css";
import "./WebContactUs.scss";
import {
  FormControl,
  FormControlLabel,
  Input,
  Checkbox,
  Button,
} from "@mui/material";
import ReactQuill from "react-quill";

const WebContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    allowContact: false,
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleQuillChange = (value) => {
    setFormData({
      ...formData,
      message: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar el formulario
    console.log("Formulario enviado:", formData);
  };
  const mapStyles = {
    width: "100%",
    height: "300px", // Ajusta la altura según tus necesidades
  };

  return (
    <div className="page-contactus">
      <div className="modal-form">
        <div className="form">
          <h2>Contáctanos</h2>
          <p>
            Si tienes alguna duda, comentario o sugerencia, por favor escríbenos
            y te responderemos lo antes posible.
          </p>
          <FormControl fullWidth>
            <Input
              id="name"
              className="input-color"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nombre completo"
            />
          </FormControl>

          <FormControl fullWidth>
            <Input
              id="email"
              name="email"
              className="input-color"
              value={formData.email}
              onChange={handleChange}
              placeholder="Correo electrónico"
            />
          </FormControl>

          <FormControl>
            <ReactQuill
              value={formData.message}
              onChange={handleQuillChange}
              modules={{
                toolbar: [
                  [{ header: "1" }, { header: "2" }, { font: [] }],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["bold", "italic", "underline"],
                  [{ align: [] }],
                  ["link"],
                ],
              }}
            />
          </FormControl>

          <FormControlLabel
            control={
              <Checkbox
                id="allowContact"
                name="allowContact"
                checked={formData.allowContact}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    allowContact: e.target.checked,
                  })
                }
              />
            }
            label="Permitir contacto en el futuro"
          />

      
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Enviar
          </Button>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6442.795795864825!2d-75.48228882331243!3d5.046675538557649!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e47659d953d7ce9%3A0xeed0362e0d17fdec!2sCl.%2076a%20%2321-85%2C%20Manizales%2C%20Caldas!5e1!3m2!1ses!2sco!4v1695784235797!5m2!1ses!2sco"
          width="90%"
          height="200"
          allowfullscreen
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default WebContactUs;
