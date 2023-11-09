import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { ENV } from "../../../utils";

const FoundationModal = ({ open, onClose, foundationData }) => {
  const baseApi = ENV.BASE_PATH;
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <Typography variant="h5" component="h3">
          Detalles de la fundación
        </Typography>
        {foundationData && foundationData.images.length > 0 ? (
          foundationData.images.map((image, index) => (
            <Card key={index} style={{ margin: "10px 0" }}>
              <CardMedia
                component="img"
                alt={`Imagen ${index + 1}`}
                height="140"
                image={`${baseApi}/${image}`} // Reemplaza baseApi con la ruta correcta si es necesario
              />
              <CardContent>
                <Typography variant="body2" component="p">
                  {foundationData.createdAt}
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="body2" component="p">
            No hay imágenes disponibles para esta fundación.
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FoundationModal;
