import React, { useEffect } from "react";
import "./CubeWithImages.scss";

export const CubeWithImages = () => {
  useEffect(() => {
    const cube = document.getElementById("animatedCube");
    const optionsContainer = document.getElementById("options");
    const option1 = document.getElementById("option1");
    const option2 = document.getElementById("option2");
    const option3 = document.getElementById("option3");
    let animationPaused = false;

    /*  Función que detiene y reactiva el movimiento del cubo */
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

    /* Función para páginas */
    option1.addEventListener("click", () => {
      console.log("Di clic en la opción 1");
      window.location.href = "../pages/services.html";
    });
    option2.addEventListener("click", () => {
      console.log("Di clic en la opción 2");
      window.location.href = "../pages/newsletter.html";
    });
    option3.addEventListener("click", () => {
      console.log("Di clic en la opción 3");
      window.location.href = "../pages/contact.html";
    });
  }, []);

  return (
    <div class="loader">
      <div class="cube" id="animatedCube">
        <div class="front"></div>
        <div class="back"></div>
        <div class="top"></div>
        <div class="bottom"></div>
        <div class="left"></div>
        <div class="right"></div>
      </div>
      <div class="options" id="options">
        <div class="option" id="option1">
          Opción 1
        </div>
        <div class="option" id="option2">
          Opción 2
        </div>
        <div class="option" id="option3">
          Opción 3
        </div>
      </div>
    </div>
  );
};
