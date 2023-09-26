import React from "react";
import { ENV } from "../../../utils/constants";
import { Loading } from "../../../components/Shared/Loading/Loading";
import "./WebFundation.scss";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material";

export const WebFundation = ({ foundation }) => {
  console.log("foundation", foundation);
  const baseApi = ENV.BASE_PATH;

  if (foundation === undefined) {
    return <Loading />;
  }

  return (
    <>
    <div className="fundation-section">
        <Carousel autoPlay={true} interval={3000} showThumbs={true} thumbWidth={100}>
          {foundation.map((item) => (
            <Card className="foundation-card" key={item.id}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200"
                  image={`${baseApi}/${item.avatar}`}
                  alt={item.activityName}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.activityName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.createdAt}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
              </CardActions>
            </Card>
          ))}
        </Carousel>
      </div>
    </>
  );
};
