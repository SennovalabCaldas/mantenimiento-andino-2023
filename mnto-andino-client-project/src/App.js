import React, { Component, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppRouter } from "./router";
import { useDispatch, useSelector } from "react-redux";
import { authenticateUser } from "./actions/authActions";
import { Auth } from "./pages/admin";
import { Loading, WebMenu } from "./components/Shared";
import { LaMartina, MakinaAndina, MakinaAndinaMiami } from "./pages/web";
import { PrivacyPolicy } from "./components/Shared/Footer/PrivacyPolicy";
import { NotFound } from "./components/Shared/NotFound";

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
      return <NotFound />;
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

  console.log({ user, token });
  useEffect(() => {
    const handleLoggedIn = async () => {
      if (token && !isLoggedIn) {
        await dispatch(authenticateUser());
        setIsLoggedIn(true);
      }
      if (!token) {
        setIsLoggedIn(false);
      }
      setIsLoading(false); // Ocultar componente de carga
    };
    handleLoggedIn();
  }, [dispatch, token, isLoggedIn, user]);
  console.log("=>", isLoggedIn);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        {isLoading ? (
          <Loading />
        ) : (
          <Routes>
            {isLoggedIn ? (
              <>
              <Route path="*" element={<AppRouter isLoggedIn={isLoggedIn} />} />
              </>
            ) : (
              <Route path="/" element={<WebMenu />} />
            )}
            <Route path="/login" element={<Auth />} />
            <Route path="/makinandina" element={<MakinaAndina />} />
            <Route path="/makinandinamiami" element={<MakinaAndinaMiami />} />
            <Route path="/lamartina" element={<LaMartina />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        )}
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;