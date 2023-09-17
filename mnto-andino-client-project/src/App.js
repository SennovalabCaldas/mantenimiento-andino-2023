import React, { Component, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppRouter } from "./router";
import { useDispatch, useSelector } from "react-redux";
import { authenticateUser } from "./actions/authActions";
import { Auth } from "./pages/admin";
import { Loading, WebMenu } from "./components/Shared";
import { LaMartina, MakinaAndina, MakinaAndinaMiami } from "./pages/web";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Ha ocurrido un error.</h1>;
    }

    return this.props.children;
  }
}

const App = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("access");
  const user = useSelector((state) => state.auth.user);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoggedIn = async () => {
      if (token && !isLoggedIn) {
        await dispatch(authenticateUser());
        setIsLoggedIn(true);
      }
      setIsLoading(false); // Ocultar componente de carga
    };
    handleLoggedIn();
  }, [dispatch, token, isLoggedIn, user]);

  console.log(isLoggedIn);
  return (
    <ErrorBoundary>
      <BrowserRouter>
        {isLoading ? (
          <Loading />
        ) : (
          <Routes>
            {isLoggedIn ? (
              <Route
                path="/*"
                element={<AppRouter isLoggedIn={isLoggedIn} />}
              />
            ) : (
              <Route path="/" element={<WebMenu />} />
            )}
            <Route path="/login" element={<Auth />} />
            <Route path="/makinandina" element={<MakinaAndina />} />
            <Route path="/makinandinamiami" element={<MakinaAndinaMiami />} />
            <Route path="/lamartina" element={<LaMartina />} />
          </Routes>
        )}
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
