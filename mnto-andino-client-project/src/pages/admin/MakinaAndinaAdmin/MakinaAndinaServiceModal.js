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


export const MakinaAndinaServiceModal = ({ open, onClose, foundationData }) => {
  const baseApi = ENV.BASE_PATH;
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <Typography variant="h5" component="h3">
          Detalles del servicio Makina Andina
        </Typography>
        <CardContent>
          <Typography variant="body2" component="p">
            {foundationData.serviceName}
          </Typography>
          <Typography variant="body2" component="p">
            {foundationData.description}
          </Typography>
          <Typography variant="body2" component="p">
            {foundationData.createdAt}
          </Typography>
        </CardContent>
        {foundationData && foundationData.photos.length > 0 ? (
          foundationData.photos.map((image, index) => (
            <Card key={index} style={{ margin: "10px 0" }}>
              <CardMedia
                component="img"
                alt={`Imagen ${index + 1}`}
                height="140"
                image={`${image}`} 
              />
            
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
