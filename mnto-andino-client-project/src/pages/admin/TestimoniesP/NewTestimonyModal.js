import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {
  createTestimonie,
  getAllTestimonies,
  updateTestimonie,
} from "../../../actions/testimonieActions";
import { Skeleton, Slider, Switch, Typography } from "@mui/material";
import { useDispatch } from "react-redux";

export const NewTestimonyModal = ({ isOpen, onClose, onSave }) => {
  const dispatch = useDispatch();
  const [client, setClient] = useState("");
  const [comment, setComment] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [active, setActive] = useState(true);
  const [role, setRole] = useState("Cliente");
  const [evaluation, setEvaluation] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [newTestimonie, setNewTestimonie] = useState({
    client: "",
    comment: "",
    role: "",
    evaluation: 0,
    active: undefined,
    avatar: [],
  });

  useEffect(() => {
    if (!isOpen) {
      setClient("");
      setComment("");
      setAvatar(null);
      setAvatarPreview("");
      setActive(true);
      setRole("");
      setEvaluation(5);
      setIsLoading(false);
    }
  }, [isOpen]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const blob = new Blob([file], { type: file.type });
      setAvatar({
        blob,
        image: file,
      });
      console.log("Avatar:", avatar);
      const imageUrl = URL.createObjectURL(file);
      setAvatarPreview(imageUrl);
    }
  };
  const handleSave = async () => {
    setIsLoading(true); // Mostrar skeleton mientras se procesa el testimonio
    const data = {
      ...newTestimonie,
      client: client,
      active: active,
      comment: comment,
      role: role,
      evaluation: evaluation,
      avatar: avatar,
    };

    try {
      await dispatch(createTestimonie(data));
      console.log("Testimonio creado exitosamente.");
    } catch (error) {
      console.error("Error al crear el testimonio:", error);
    }

    setIsLoading(false); // Ocultar skeleton después de procesar el testimonio
    onSave();
    dispatch(getAllTestimonies());
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <TextField
          fullWidth
          label="Cliente"
          value={client}
          onChange={(e) => setClient(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Rol/Cargo del Cliente"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          margin="normal"
        />
        <Slider
          label="Evaluación"
          value={evaluation}
          onChange={(e) => setEvaluation(e.target.value)}
          min={1}
          max={5}
          step={1}
          valueLabelDisplay="auto"
        />
        <input
          type="file"
          id="imageUpload"
          style={{ display: "none" }}
          onChange={handleAvatarChange}
        />
        <Button
          onClick={() => document.getElementById("imageUpload").click()}
          variant="contained"
          color="primary"
        >
          Subir Imagen
        </Button>
        {avatarPreview && (
          <img
            src={avatarPreview}
            alt="Vista previa de la imagen"
            style={{
              maxWidth: "100px",
              maxHeight: "100px",
              marginLeft: "10px",
            }}
          />
        )}
        <Switch
          checked={active}
          onChange={(e) => setActive(e.target.checked)}
          color="primary"
          inputProps={{ "aria-label": "Testimonio visible" }}
        />
        <Typography>
          {active ? "Testimonio visible" : "Testimonio no visible"}
        </Typography>
        <TextField
          fullWidth
          label="Comentario"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          margin="normal"
        />
        {isLoading ? (
          <Skeleton
            animation="wave"
            height={20}
            width="80%"
            style={{ marginBottom: 10 }}
          />
        ) : null}
        <Button variant="contained" onClick={handleSave}>
          Guardar Testimonio
        </Button>
      </Box>
    </Modal>
  );
};
