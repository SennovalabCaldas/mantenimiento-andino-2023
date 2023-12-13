import React, { Component, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppRouter } from "./router";
import { useDispatch, useSelector } from "react-redux";
import { authenticateUser } from "./actions/authActions";
import { Auth } from "./pages/admin";
import { Loading, WebMenu } from "./components/Shared";
import {
  LaMartina,
  MakinaAndina,
  MakinaAndinaMiami,
  WebSedes,
} from "./pages/web";
import { PrivacyPolicy } from "./components/Shared/Footer/PrivacyPolicy";
import { NotFound } from "./components/Shared/NotFound";
import { WebPqrs } from "./pages/web/WebPqrs/WebPqrs";
import { VerifyToken } from "./components";

const App = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("access");
  const user = useSelector((state) => state.auth.user);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  console.log({ user, token });
  useEffect(() => {
   
    if (token) {
      dispatch(authenticateUser(token));
    }
    setIsLoading(false);
  }, [token]);

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    }
  }
  , [user]);

  
  console.log("=>", isLoggedIn);

  return (
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
          <Route path="/sedes" element={<WebSedes />} />
          <Route path="/pqrs" element={<WebPqrs />} />
          <Route path="/verify-auth/:token" element={<VerifyToken />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default App;
