import React from "react";
import { ENV } from "../../../utils";
import "./Photos.scss";
import { ReactPhotoCollage } from "react-photo-collage";

export const Photos = ({ foundations, allies, clients }) => {
  const baseApi = ENV.BASE_PATH;
  console.log("baseApi =>", foundations);
  const imagesConfig = foundations.images
    ? foundations.images.map((image) => ({
        src: `${baseApi}/${image}`,
        width: "100%",
        height: "100%",
      }))
    : [];
    console.log("imagesConfig =>", imagesConfig);

  const setting = {
    width: "100%",
    height: ["200px", "300px"],
    layout: [1, 2],
    photos: imagesConfig,
  };
  console.log("foundations =>", foundations);

  console.log("allies =>", allies);
  return (
    <>
      <ReactPhotoCollage {...setting} />
      <div className="slider-photos">
        <div className="slide-track">
          {allies.map((ally, index) => (
            <div key={index} className="slide">
              <img
                src={`${baseApi}/${ally.avatar}`}
                height="100"
                width="250"
                style={{
                  marginTop: "10px",
                  marginBottom: "10px",
                  marginLeft: "10px",
                  marginRight: "10px",
                  border: "1px solid #ddd",
                  padding: "5px",
                  maxWidth: "150px",
                  maxHeight: "150px",
                }}
                alt=""
              />
            </div>
          ))}

          {clients.map((client, index) => (
            <div key={index} className="slide">
              <img
                src={`${baseApi}/${client.avatar}`}
                height="100"
                width="250"
                alt=""
                style={{
                  marginTop: "10px",
                  marginBottom: "10px",
                  marginLeft: "10px",
                  marginRight: "10px",
                  border: "1px solid #ddd",
                  padding: "5px",
                  maxWidth: "150px",
                  maxHeight: "150px",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
