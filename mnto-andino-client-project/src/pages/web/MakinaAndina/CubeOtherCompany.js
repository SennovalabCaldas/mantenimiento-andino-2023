import React, { useEffect, useState } from "react";
import "./CubeOtherCompany.scss";
import { Link } from "react-router-dom";
import { image } from "../../../assets";

export const CubeOtherCompany = () => {
  useEffect(() => {
    const cube = document.getElementById("animatedCube");
    const optionsContainer = document.getElementById("options");
    const option1 = document.getElementById("option1");
    const option2 = document.getElementById("option2");
    const option3 = document.getElementById("option3");
    let animationPaused = false;
    // Verificar si los elementos existen antes de agregar eventos
    if (cube && optionsContainer && option1 && option2 && option3) {
      cube.addEventListener("click", () => {
        console.log("Di clic en el cubo");
        if (!animationPaused) {
          console.log("Animación pausada");
          cube.style.animationPlayState = "paused";
          optionsContainer.style.display = "block";
          animationPaused = true;
          setTimeout(() => {
            cube.style.animationPlayState = "running";
            optionsContainer.style.display = "none";
            animationPaused = false;
          }, 5000);
        }
      });
      option1.addEventListener("click", () => {
        window.location.href = "/makinandinamiami"; // Esto redireccionará a la página de inicio de sesión
      });

      option2.addEventListener("click", () => {
        window.location.href = "/makinandina"; // Esto redireccionará a la página de inicio de sesión
      });

      option3.addEventListener("click", () => {
        window.location.href = "/"; // Esto redireccionará a la página de inicio de sesión
      });
    }
  }, []);

  return (
    <div className="cubeContainer">
      <div className="cube" id="animatedCube">
        <div
          className="front"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={image.logo4}
            alt="Imagen 1"
            style={{ width: "80%", height: "80%" }}
          />
        </div>
        <div
          className="back"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={image.logo3}
            alt="Imagen 1"
            style={{ width: "80%", height: "80%" }}
          />
        </div>
        <div
          className="top"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={image.logo3}
            alt="Imagen 1"
            style={{ width: "80%", height: "80%" }}
          />
        </div>
        <div
          className="bottom"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={image.logo2}
            alt="Imagen 1"
            style={{ width: "80%", height: "80%" }}
          />
        </div>
        <div
          className="left"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={image.logo2}
            alt="Imagen 1"
            style={{ width: "80%", height: "80%" }}
          />
        </div>
        <div
          className="right"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <img
            src={image.logomn}
            alt="Imagen 1"
            style={{ width: "80%", height: "80%" }}
          />
        </div>
      </div>

      <div className="options" id="options">
        <div className="option" id="option1">
          <button className="btn">
            <span className="btn-text-one">Makina Andina Miami</span>
          </button>{" "}
        </div>
        <div className="option" id="option2">
          <button className="btn">
            <span className="btn-text-one">Makina Andina</span>
          </button>{" "}
        </div>
        <div className="option" id="option3">
          <button className="btn">
            <span className="btn-text-one">Mantenimiento Andino</span>
          </button>
        </div>
      </div>
    </div>
  );
};
