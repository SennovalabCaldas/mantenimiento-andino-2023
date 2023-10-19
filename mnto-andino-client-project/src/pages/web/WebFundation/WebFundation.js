import React, { useEffect } from "react";
import "./WebFundation.scss";
import {
  ButtonBase,
  Grid,
  ImageList,
  ImageListItem,
  Paper,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { image } from "../../../assets";
const imagesScroll = [
  {
    img: image.project1,
    title: "Breakfast",
    rows: 2,
    cols: 2,
  },
  {
    img: image.project2,
    title: "Burger",
  },
  {
    img: image.project3,
    title: "Camera",
  },
  {
    img: image.project4,
    title: "Coffee",
    cols: 2,
  },
  {
    img: image.project5,
    title: "Hats",
    cols: 2,
  },
  {
    img: image.project6,
    title: "Honey",
    author: "@arwinneil",
    rows: 2,
    cols: 2,
  },
  {
    img: image.project7,
    title: "Basketball",
  },
  {
    img: image.project8,
    title: "Fern",
  },
  {
    img: image.project9,
    title: "Mushrooms",
    rows: 2,
    cols: 2,
  },
  {
    img: image.project10,
    title: "Tomato basil",
  },
  {
    img: image.project11,
    title: "Sea star",
  },
  {
    img: image.project12,
    title: "Bike",
    cols: 2,
  },
  {
    img: image.project13,
    title: "Coffee",
    cols: 2,
  },
  {
    img: image.project14,
    title: "Hats",
    cols: 2,
  },
  {
    img: image.project15,
    title: "Breakfast",
    rows: 2,
    cols: 2,
  },
  {
    img: image.project16,
    title: "Burger",
  },
  {
    img: image.project17,
    title: "Camera",
  },
  {
    img: image.project18,
    title: "Coffee",
    cols: 2,
  },
];


export const WebFundation = () => {
 
  return (
    <div className="fundation-section">
      <Grid container spacing={2}>
        

      </Grid>
    </div>
  );
};
