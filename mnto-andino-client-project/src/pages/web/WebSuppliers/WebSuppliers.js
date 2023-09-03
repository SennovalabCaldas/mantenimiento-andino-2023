import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from "@material-ui/core";
import {
  MoreVert as MoreVertIcon,
  AddShoppingCart as AddShoppingCartIcon,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    maxWidth: 300,
    margin: theme.spacing(2),
    boxShadow: theme.shadows[3],
    transition: "box-shadow 0.3s ease-in-out",
    "&:hover": {
      boxShadow: theme.shadows[8],
    },
  },
  media: {
    height: 200,
  },
  iconButtonContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing(2),
  },
}));
const WebSuppliers = () => {
  const classes = useStyles();
  return (
    <div>
      <h1>Proveedores</h1>
    </div>
  );
};

export default WebSuppliers;
