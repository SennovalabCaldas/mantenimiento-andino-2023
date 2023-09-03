import React from "react";
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  Box,
} from "@mui/material";
import "./WebContactUs.scss";

const WebContactUs = () => {
  return (
    <>
      <Card className="card">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Contactanos
          </Typography>
          <TextField className="textField" label="Nombre" fullWidth />
          <TextField className="textField" label="Celular" fullWidth />
          <TextField className="textField" label="Correo" fullWidth />
          <TextField
            className="textField"
            label="Asunto"
            fullWidth
            multiline
            rows={4}
          />
          <Box display="flex" justifyContent="flex-end">
            <Button variant="contained" color="primary">
              Enviar
            </Button>
          </Box>
        </CardContent>
      </Card>
      <div className="loader-contact"></div>
    </>
  );
};

export default WebContactUs;
