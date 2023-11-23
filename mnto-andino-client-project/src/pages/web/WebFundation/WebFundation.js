import React, { useState } from "react";
import {
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Divider,
} from "@mui/material";
import { image } from "../../../assets";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./WebFundation.scss";
import { ENV } from "../../../utils/constants";
import PaginationGallery from "./PaginationGallery";

export const WebFundation = ({ profiles, foundations }) => {
  console.log("profiles", foundations);
  const baseApi = ENV.BASE_PATH;
  const images = [
    image.profile1,
    image.profile2,
    image.profile3,
    image.profile4,
  ];

  const [currentPage, setCurrentPage] = useState(1);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,

    autoplaySpeed: 2000,
  };

  const allFoundationImages = foundations.reduce(
    (accumulator, foundation) => [...accumulator, ...foundation.images],
    []
  );


  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  return (
    <>
      <div className="text-container-fundation" data-order="1">
        <div className="container-foundation-profiles">
          <h2>HAZ PARTE DE NUESTRA</h2>
          <h1>FAMILIA Mantenimiento andino</h1>
        </div>
        <div className="decoration-line-tres"></div>
      </div>

      <div className="slider-container-fundation">
        <Slider {...sliderSettings}>
          {profiles.map((profile, index) => (
            <div
              style={{
                paddingLeft: "7px",
              }}
            >
              <Card
                variant="outlined"
                key={index}
                style={{
                  padding: "20px",
                  maxWidth: "365px",
                  margin: "auto",
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  flexWrap: "wrap",
                }}
              >
                <CardContent
                  style={{
                    backgroundImage: `url(${getRandomImage()})`,
                    backgroundSize: "cover",
                    backdropFilter: " drop-shadow(4px 4px 10px blue)",
                    backgroundSize: "cover",
                    backgroundColor: "#000000db",
                    opacity: "0.8",
                    color: "#ffffff",
                    borderRadius: "5px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "rgb(0 0 0 / 94%)",
                      padding: "15px",
                      margin: "15px",
                      borderRadius: "5px",
                    }}
                  >
                    <Typography gutterBottom>
                      <h2
                        style={{
                          color: "#ffffff",
                          fontWeight: "bold",
                          fontSize: "14px",
                          textTransform: "uppercase",
                          textAlign: "center",
                          paddingTop: "15px",
                        }}
                      >
                        {profile.profileName}
                      </h2>
                    </Typography>
                    <div className="decoration-line-cuatro"></div>
                    <div
                      style={{
                        color: "#ffffff",
                        fontWeight: "bold",
                        fontSize: "12px",
                        textAlign: "start",
                      }}
                    >
                      <h2
                        style={{
                          color: "#ffffff",
                        }}
                      >
                        <span>REQUISITOS:</span>
                        <ul
                          style={{
                            fontSize: "12px",
                            color: "#ffffff",
                            listStyle: "none",
                          }}
                        >
                          <li>{profile.feature1}</li>
                          <li>{profile.feature2}</li>
                          <li>{profile.feature3}</li>
                          <li>{profile.feature4}</li>
                          <li>
                            Contratación directa con la empresa con prestaciones
                            de ley
                          </li>
                        </ul>
                      </h2>
                      <Divider style={{ margin: "10px 0" }} />
                      <h2>
                        <span
                          style={{
                            color: "#ffffff",
                            textTransform: "uppercase",
                            textAlign: "center",
                            fontSize: "12px",
                          }}
                        >
                          Para más información sobre la vacante y los perfiles
                          requeridos, por favor contacta a:
                        </span>
                        <ul
                          style={{
                            textAlign: "start",
                            fontSize: "11px",
                            listStyle: "none",
                            color: "#ffffff",
                          }}
                        >
                          <li>Celular: (+57) {profile.contact_telephone}</li>
                          <li>Correo: {profile.email}</li>
                          <li>WhatsApp: (+57) {profile.contact_whatsApp}</li>
                        </ul>
                      </h2>
                      <Divider style={{ margin: "10px 0", color: "white" }} />
                    </div>
                    <Grid container justifyContent="center">
                      <button className="comic-button-profile">
                        <span>Preguntar por más información</span>
                      </button>
                    </Grid>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </Slider>
      </div>

      <div className="gallery-photos-fundations">
        <PaginationGallery images={allFoundationImages} itemsPerPage={15} />
      </div>
    </>
  );
};
