import React from "react";
import { ENV } from "../../../utils";
import "./Photos.scss";

export const Photos = ({ foundations }) => {
  const baseApi = ENV.BASE_PATH;
  console.log("foundations =>", foundations);
  return (
    <>
      {foundations.map((foundation) => (
        <div className="gallery-photos-fundations">
          {foundation.images.map((image) => (
            <img src={`${baseApi}/${image}`} />
          ))}
        </div>
      ))}
    </>
  );
};
