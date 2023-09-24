import React from "react";
import { Carousel } from "react-responsive-carousel";
import { image } from "../../../assets";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Importa los estilos del carrusel

const images = [
  image.ani,
  image.carulla,
  image.carulla,
  image.ara,
  image.ani,
  image.ani,
  // Agrega aquí más nombres de archivo de imágenes según sea necesario
];

export const CardClient = () => {
  const imageStyle = {
    maxWidth: "150px", // Ajusta el ancho máximo de las imágenes según tus necesidades
    maxHeight: "100px", // Ajusta la altura máxima de las imágenes según tus necesidades
  };

  return (
    <div className="division">
      <Carousel
        showArrows={false}
        showStatus={false}
        showThumbs={true} // Oculta las miniaturas
        infiniteLoop={true} // Reproduce en bucle
        autoPlay={true} // Reproducción automática
        interval={3000} // Intervalo de reproducción automática en milisegundos
        stopOnHover={false} // Detiene la reproducción automática al pasar el mouse
        emulateTouch={true} // Habilita el desplazamiento táctil en dispositivos móviles
        useKeyboardArrows={true} // Permite la navegación con las flechas del teclado
        swipeable={true} // Permite el desplazamiento táctil
      >
        {images.map((img, index) => (
          <div key={index}>
            <img src={img} alt={`Imagen ${index + 1}`} style={imageStyle} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};
