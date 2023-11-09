import React, { useState } from "react";
import axios from "axios";

export const FoundationNews = () => {
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");

  const handleImageChange = (event) => {
    const selectedImages = event.target.files;
    setImages(selectedImages);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleImageUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("description", description);
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
      const response = await axios.post("/api/upload-images", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Imágenes subidas con éxito:", response.data);
    } catch (error) {
      console.error("Error al subir imágenes:", error);
    }
  };

  return (
    <div>
      <h2>Subir Imágenes</h2>
      <div>
        <input type="file" multiple onChange={handleImageChange} />
        <br />
        <input
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={handleDescriptionChange}
        />
        <br />
        <button onClick={handleImageUpload}>Subir Imágenes</button>
      </div>
    </div>
  );
};