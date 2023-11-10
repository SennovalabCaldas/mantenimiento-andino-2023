import { Grid } from "@mui/material";
import React, { useState } from "react";
import "./MakinaAndinaMiami.scss";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import ModalForm from "../ModalForm/ModalForm";

export const ProductListMakinaAndinaMiami = ({
  products_makina_andina_miami,
}) => {
  const [searchTerm, setSearchTerm] = useState(""); // Estado local para el término de búsqueda
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProducts = products_makina_andina_miami.filter((product) =>
    product.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/573103833591", "_blank");
  };

  const handleEmailClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="productlist-makina-andina">
      <div className="productlist-search">
        <input
          type="text"
          placeholder="Buscar producto por nombre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid
            key={product.id}
            item
            xs={12}
            sm={6}
            md={3}
            className="product-item"
          >
            <img src={product.photos[0]} alt={product.serviceName} />
            {/* <div
              className={`status-avatar ${
                product.status ? "available" : "unavailable"
              }`}
            >
              {product.status ? "Disponible" : "No Disponible"}
            </div> */}
            <h1>{product.serviceName}</h1>
            {product.status && (
              <>
                <div className="contact-buttons">
                  <div
                    className="whatsapp-button"
                    onClick={handleWhatsAppClick}
                  >
                    <WhatsAppIcon />
                  </div>
                  <div className="email-button" onClick={handleEmailClick}>
                    <EmailIcon />
                  </div>
                </div>
              </>
            )}
          </Grid>
        ))}
      </Grid>
      {isModalOpen && (
        <ModalForm
          onClose={() => setIsModalOpen(false)}
          products={products_makina_andina_miami}
        />
      )}
    </div>
  );
};
