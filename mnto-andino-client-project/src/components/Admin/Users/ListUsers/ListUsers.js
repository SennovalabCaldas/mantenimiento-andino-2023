import React, { useState, useEffect } from "react";
import {
  Input,
  Card,
  Grid,
  Button,
  Typography,
  Slide,
  Avatar,
  CardContent,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Loading, Pagination } from "../../../Shared";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../../../../actions/authActions";
import { getAllUsers, getUser } from "../../../../actions/userActions";
import { image } from "../../../../assets";
import { ENV } from "../../../../utils";
import { User } from "../../../../api";
import UserItem from "../UserItem/UserItem";
import useStyles from "./ListUsersStyles";

const userController = new User();

const ListUsers = ({ usersActive, reload, onReload }) => {
  const classes = useStyles();

  const users = useSelector((state) => state.user.allUsers);

  const selectedUser = useSelector((state) => state.user.user);
  const loggedInUser = useSelector((state) => state.auth.user);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showCard, setShowCard] = useState(false);
  const dispatch = useDispatch();
  const usersPerPage = 10;

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getMe());
        await dispatch(getAllUsers(usersActive));
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [usersActive, reload]);

  if (!users) return <Loading />;

  let filteredUsers = users.filter((user) => {
    const fullName = `${user.firstname} ${user.lastname}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  let filteredUsersToRender = [];
  if (usersActive) {
    filteredUsersToRender = filteredUsers.filter(
      (user) => user._id !== loggedInUser._id && user.active === true
    );
  } else {
    filteredUsersToRender = filteredUsers.filter(
      (user) => user._id !== loggedInUser._id && user.active === false
    );
  }

  const handleSelectedUser = async (userId) => {
    try {
      await dispatch(getUser(userId));
      setShowCard(true);
    } catch (error) {
      console.error(error);
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsersToRender.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div>
        <div>
          <Input
            disableUnderline
            startAdornment={<SearchIcon />}
            placeholder="Buscar usuarios"
            value={searchQuery}
            onChange={handleSearch}
            className={classes.input}
          />
          <Button
            className="show-card-btn"
            onClick={() => setShowCard((prevState) => !prevState)}
            style={{
              marginTop: "8px",
              backgroundColor: "#007bff", // Cambia el color de fondo según tus preferencias
              color: "white", // Cambia el color del texto según tus preferencias
              padding: "8px 16px", // Ajusta el espaciado interno
              borderRadius: "4px", // Aplica bordes redondeados si deseas
              border: "none", // Elimina el borde si lo prefieres
            }}
          >
            {showCard ? "Ocultar información" : "Ver información"}
          </Button>
        </div>

        <div>
          <div className={classes.usersList}>
            {currentUsers.map((user) => (
              <UserItem
                key={user._id}
                user={user}
                onReload={onReload}
                handleSelectedUser={() => handleSelectedUser(user._id)}
              />
            ))}
          </div>
        </div>
        {showCard && selectedUser && (
          <Slide direction="up" in={showCard} mountOnEnter unmountOnExit>
            <Card className={classes.userCard}>
              <Avatar
                src={
                  selectedUser.avatar
                    ? `${ENV.BASE_PATH}/${selectedUser.avatar}`
                    : image.logomn
                }
                alt="User Avatar"
                className={classes.avatar}
              />
              <CardContent>
                <Typography variant="h6" className={classes.cardTitle}>
                  <strong>
                    {`${selectedUser.firstname} ${selectedUser.lastname}`}
                  </strong>
                </Typography>
                <Typography
                  color="textSecondary"
                  className={classes.cardSubtitle}
                >
                  {selectedUser.email}
                </Typography>
                <Typography variant="body2" className={classes.cardText}>
                  <span className={classes.lightText}>{selectedUser.sede}</span>
                  <br />
                  <span className={classes.lightText}>{selectedUser.role}</span>
                </Typography>
              </CardContent>
            </Card>
          </Slide>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalUsers={filteredUsersToRender.length}
        usersPerPage={usersPerPage}
        paginate={paginate}
        size="small"
      />
    </>
  );
};

export default ListUsers;
