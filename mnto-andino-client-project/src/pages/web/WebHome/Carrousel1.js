import React from "react";
import "./Carrousel.scss";
import { image } from "../../../assets";
import { Grid } from "@mui/material";
// console.clear();

const slides = [
  {
    _id: "1",
    titulo: "ACTUALIDAD",
    subtitulo: "Mantenimiento Andino",
    image: image.post3,
    fecha_creacion:  new Date("2023-09-03"),
  },
  {
    _id: "2",
    titulo: "TE INTERESARÍA",
    subtitulo: "TRABAJAR CON NOSOTROS",
    descripcion: "Conoce los perfiles que buscamos",
    image: image.service1,
    fecha_creacion:  new Date("2023-09-26"),
  },
  {
    _id: "3",
    titulo: "Visita nuestras",
    subtitulo: "redes sociales",
    descripcion: "Ver más",
    image: image.post3,
    fecha_creacion:  new Date("2023-10-03"),
  },
  {
    _id: "4",
    titulo: "Conoce",
    subtitulo: "nuestros servicios",
    descripcion: "Ver más",
    image: image.img1services,
    fecha_creacion:  new Date("2023-10-03"),
  },
  {
    _id: "5",
    titulo: "Qué hacemos",
    subtitulo: "desde la fundación",
    descripcion: "Conoce nuestras actividades recientes",
    fecha_creacion:  new Date("2023-10-03"),
    image:
      "https://images.unsplash.com/photo-1579130781921-76e18892b57b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
  },
];

function useTilt(active) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!ref.current || !active) {
      return;
    }

    const state = {
      rect: undefined,
      mouseX: undefined,
      mouseY: undefined,
    };

    let el = ref.current;

    const handleMouseMove = (e) => {
      if (!el) {
        return;
      }
      if (!state.rect) {
        state.rect = el.getBoundingClientRect();
      }
      state.mouseX = e.clientX;
      state.mouseY = e.clientY;
      const px = (state.mouseX - state.rect.left) / state.rect.width;
      const py = (state.mouseY - state.rect.top) / state.rect.height;

      el.style.setProperty("--px", px);
      el.style.setProperty("--py", py);
    };

    el.addEventListener("mousemove", handleMouseMove);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
    };
  }, [active]);

  return ref;
}
const initialState = {
  slideIndex: 0,
};

const slidesReducer = (state, event) => {
  if (event.type === "NEXT") {
    return {
      ...state,
      slideIndex: (state.slideIndex + 1) % slides.length,
    };
  }
  if (event.type === "PREV") {
    return {
      ...state,
      slideIndex:
        state.slideIndex === 0 ? slides.length - 1 : state.slideIndex - 1,
    };
  }
  return state;
};


function Slide({ slide, offset }) {
  const active = offset === 0 ? true : null;
  const ref = useTilt(active);

  return (
    <div
      ref={ref}
      className="slide"
      data-active={active}
      style={{
        "--offset": offset,
        "--dir": offset === 0 ? 0 : offset > 0 ? 1 : -1,
      }}
    >
      <div
        className="slideBackground"
        style={{
          backgroundImage: `url('${slide.image}')`,
          borderRadius: "10px",
        }}
      />

      <div
        className="slideContent"
        style={{
          borderRadius: "10px",
          margin: "10px",
          padding: "20px",
          background: "rgba(255, 255, 255, 0.8)",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <div className="item-img-slideContentInner">
              <div className="imagen-video-overlay">
                <img
                  src={image.logomn}
                  alt="Logo de la Empresa"
                  className="logo-superpuesto"
                />
              </div>
            </div>
          </Grid>
          <Grid item xs={9}>
            <div className="item-slideContentInner">
              <h2 className="slideTitle">{slide.titulo}</h2>
              <h3 className="slideSubtitle">{slide.subtitulo}</h3>
              <p className="slideDescription">{slide.descripcion}</p>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export const Carrousel = ({ posts }) => {
  const combinedSlides = [...slides, ...posts];
  console.log("combined=>", combinedSlides);

  const sortedSlides = combinedSlides
    .sort((a, b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion))
    .slice(0, 6);
console.log('sorted',sortedSlides);
  const [state, dispatch] = React.useReducer(slidesReducer, initialState);

  return (
    <div className="slides">
      <button onClick={() => dispatch({ type: "PREV" })}>‹</button>

      {sortedSlides.map((slide, i) => {
        let offset = sortedSlides.length + (state.slideIndex - i);
        return <Slide slide={slide} offset={offset} key={i} />;
      })}

      <button onClick={() => dispatch({ type: "NEXT" })}>›</button>
    </div>
  );
};
