import React, { useState } from "react";
import { Tab } from "semantic-ui-react";
import { image } from "../../../assets/";
import { RegisterForm, LoginForm } from "../../../components/Admin/Auth";
import "./Auth.scss";
import { BackToMntoAndino } from "../../../components/Client/BackToMntoAndino/BackToMntoAndino";

export const Auth = () => {
  /* Para que cuando el usuario se registre pase a login */
  const [activeIndex, setActiveIndex] = useState(0);
  const openLogin = () => {
    setActiveIndex(0);
      
  };

  const handleRegisterClick = () => {
    setActiveIndex(1);
  };

  const panels = [
    {
      menuItem: "Ingresar",
      render: () => {
        return (
          <Tab.Pane>
            <LoginForm onRegisterClick={handleRegisterClick} />
          </Tab.Pane>
        );
      },
    },
    {
      menuItem: "Registrarse",
      render: () => {
        return (
          <Tab.Pane>
            <RegisterForm openLogin={openLogin} />
          </Tab.Pane>
        );
      },
    },
  ];

  return (
    <div className="auth">
      <div className="back-to-mnto">
        <BackToMntoAndino
          thumbnailSrc={image.logomn} // Ruta de la miniatura de la imagen
          fullSrc={image.logoSennovalabNoC} // Ruta de la imagen completa
        />
      </div>
      <img src={image.logomn} alt="" className="logo" />
      <div className="auth__form auth-form__tab">
        <Tab
          panes={panels}
          activeIndex={activeIndex}
          onTabChange={(_, data) => setActiveIndex(data.activeIndex)}
        />
      </div>
    </div>
  );
};
