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
      <DialogTitle>
        Contenido de la fundación - {foundationData ? foundationData._id : ""}
      </DialogTitle>
      <DialogContent>
        <Typography variant="h5" component="h3">
          Imágenes y Videos
        </Typography>
        {foundationData && foundationData.media ? (
          foundationData.media.length > 0 ? (
            foundationData.media.map((media, index) => (
              <Card key={index} style={{ margin: "10px 0" }}>
                {media.type === "image" ? (
                  <CardMedia
                    component="img"
                    alt={`Imagen ${index + 1}`}
                    height="140"
                    image={`${baseApi}/${media.file.filename}`}
                  />
                ) : (
                  <CardMedia
                    component="video"
                    alt={`Video ${index + 1}`}
                    height="140"
                    controls
                  >
                    <source
                      src={`${baseApi}/${media.file.filename}`}
                      type="video/mp4"
                    />
                    Tu navegador no soporta el tag de video.
                  </CardMedia>
                )}
                <CardContent>
                  <Typography variant="body2" component="p">
                    {foundationData.createdAt}
                  </Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography variant="body2" component="p">
              No hay imágenes ni videos disponibles para esta fundación.
            </Typography>
          )
        ) : (
          <Typography variant="body2" component="p">
            No hay datos disponibles para esta fundación.
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FoundationModal;
