import React from "react";
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

export const WebFundation = ({ profiles }) => {
  const images = [
    image.profile1,
    image.profile2,
    image.profile3,
    image.profile4,
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  return (
    <>
      <div className="text-container-fundation" data-order="1">
        <h3>
          <strong>
            <em> Haz parte de este gran equipo</em>
          </strong>
        </h3>
        <h2>
          <span
            style={{
              color: "#000000",
              fontWeight: "bold",
              fontSize: "20px",
              textTransform: "uppercase",
              letterSpacing: "2px",
              textAlign: "center",
            }}
          >
            MANTENIMIENTO ANDINO
          </span>
        </h2>
        <br />
      </div>

      <div className="slider-container-fundation">
        <Slider
          {...sliderSettings}
       
        >
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
                  maxWidth: "345px",
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
                      backgroundColor: "#000000b5",
                      padding: "10px",
                      margin: "10px",
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
                        }}
                      >
                        {profile.profileName}
                      </h2>
                    </Typography>
                    <Divider style={{ margin: "10px 0" }} />
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
                        <strong>REQUISITOS:</strong>
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
                        <strong
                          style={{
                            fontWeight: "bold",
                            color: "#ffffff",
                          }}
                        >
                          Para más información sobre la vacante y los perfiles
                          requeridos, por favor contacta a:
                        </strong>
                        <ul
                          style={{
                            textAlign: "start",
                            fontSize: "11px",
                            listStyle: "none",
                            color: "#ffffff",
                          }}
                        >
                          <li>
                            Celular: (+57) {profile.contact_telephone}
                          </li>
                          <li>Correo: {profile.email}</li>
                          <li>WhatsApp: (+57) {profile.contact_whatsApp}</li>
                        </ul>
                      </h2>
                      <Divider style={{ margin: "10px 0" }} />
                    </div>
                    <Grid container justifyContent="center">
                      <Button variant="contained" color="primary">
                        Envía tu hoja de vida
                      </Button>
                    </Grid>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};
