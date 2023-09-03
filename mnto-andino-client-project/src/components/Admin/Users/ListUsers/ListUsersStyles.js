import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  listUsersContent: {
    padding: theme.spacing(2),
  },
  usersPageSearch: {
    marginBottom: theme.spacing(2),
  },
  input: {
    width: "100%",
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.primary.main}`,
  },
  showCardButton: {
    marginTop: theme.spacing(2),
  },
  usersList: {
    maxHeight: "400px",
    overflowY: "auto",
  },
  userCard: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    marginBottom: theme.spacing(1),
    maxWidth: "600px", // Cambia este valor al ancho deseado
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    marginBottom: theme.spacing(1), // Reduce the space between avatar and info
  },
  actionButtons: {
    display: "flex",
    justifyContent: "space-between",
    "& button": {
      padding: "0",
      minWidth: "auto",
    },
  },
  customGrid: {
    flexBasis: "70%", // Adjust the width as needed
    flexGrow: 0,
    maxWidth: "70%", // Adjust the width as needed
  },

  // Responsive styles
  [theme.breakpoints.down("sm")]: {
    usersList: {
      maxHeight: "none",
      overflowY: "visible",
    },
    userCard: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "flex-start",
      textAlign: "left",
      marginBottom: theme.spacing(1), // Adjust responsive space
    },
    avatar: {
      marginRight: theme.spacing(2),
      width: theme.spacing(10),
      height: theme.spacing(10),
      marginBottom: 0, // Remove margin in responsive
    },
    actionButtons: {
      flexDirection: "column", // Stack buttons in responsive
      "& button": {
        width: "100%",
        marginBottom: theme.spacing(1),
      },
    },
  },
  [theme.breakpoints.up("md")]: {
    userCard: {
      maxWidth: "800px", // Cambia este valor al ancho deseado en pantallas medianas o grandes
    },
  },
}));

export default useStyles;
