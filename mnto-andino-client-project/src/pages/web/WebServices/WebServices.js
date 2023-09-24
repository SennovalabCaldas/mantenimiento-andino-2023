import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { image } from "../../../assets";
import "./WebServices.scss";
import { useRef, useState } from "react";

export const WebServices = () => {
  const [rating, setRating] = useState(0);
  const videoRef = useRef(null); // Crea una referencia al elemento de video

  const handleVideoEnded = () => {
    // Esta función se llama cuando el video finaliza
    videoRef.current.currentTime = 0; // Reinicia el tiempo de reproducción a 0
    videoRef.current.play(); // Vuelve a reproducir el video automáticamente
  };

  return (
    <>
      <div className="content-webservices">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="titlepage">
                <h2>
                  <strong className="black"> Servicios </strong> 
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="wrapper">
          <div className="card">
            <div className="poster">
              <video
                ref={videoRef}
                src={image.video2}
                alt="Location Unknown"
                controls
                autoPlay
                muted // Agrega el atributo muted
                width="100%"
                height="auto"
                onEnded={handleVideoEnded}
              />
            </div>
            <div className="details">
              <h1>Location Unknown</h1>
              <h2>2021 • PG • 1hr 38min</h2>

              <div className="rating">
                {/* Renderiza 5 estrellas y marca las seleccionadas según el estado de 'rating' */}
                {[1, 2, 3, 4, 5].map((star) => (
                  <FontAwesomeIcon
                    key={star}
                    icon={star <= rating ? solidStar : regularStar}
                    onClick={() => setRating(star)} // Actualiza la calificación al hacer clic
                  />
                ))}
                <span>{rating}/5</span>
              </div>
              <div className="tags">
                <span className="tag">Italian</span>
                <span className="tag">Drama</span>
                <span className="tag">Indie</span>
              </div>
              {/* <p className="desc">
                Marco, a disillusioned backpacker in his late 20s, embarks on a
                solitary journey in search for meaning.
              </p> */}
              <div className="cast">
                <h3>Cast</h3>
                <ul>
                  <li>
                    <img
                      src="https://shashanktrivedi.com/wp-content/uploads/2023/09/cast-11.jpg"
                      alt="Marco Andrews"
                      title="Marco Andrews"
                    />
                  </li>
                  <li>
                    <img
                      src="https://shashanktrivedi.com/wp-content/uploads/2023/09/cast-12.jpg"
                      alt="Rebecca Floyd"
                      title="Rebecca Floyd"
                    />
                  </li>
                  <li>
                    <img
                      src="https://shashanktrivedi.com/wp-content/uploads/2023/09/cast-13.jpg"
                      alt="Antonio Herrera"
                      title="Antonio Herrera"
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="poster">
              <img src={image.fondo5} alt="Location Unknown" />
            </div>
            <div className="details">
              <h1>Air</h1>
              <h2>2020 • PG • 24min</h2>
              <div className="rating">
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={farStar} />
                <span>4.2/5</span>
              </div>
              <div className="tags">
                <span className="tag">Romance</span>
                <span className="tag">Comedy</span>
                <span className="tag">Short</span>
              </div>
              <p className="desc">
                Lily, the travel writer, and Nathan, the book editor, goes on a
                plane together to the alps.
              </p>
              <div className="cast">
                <h3>Cast</h3>
                <ul>
                  <li>
                    <img
                      src="https://shashanktrivedi.com/wp-content/uploads/2023/09/cast-21.jpg"
                      alt="Angelina Whyte"
                      title="Angelina Whyte"
                    />
                  </li>
                  <li>
                    <img
                      src="https://shashanktrivedi.com/wp-content/uploads/2023/09/cast-22.jpg"
                      alt="Ivan Benson"
                      title="Ivan Benson"
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="poster">
              <img src={image.fondo3} alt="Location Unknown" />
            </div>
            <div className="details">
              <h1>End Credits</h1>
              <h2>2021 • R • 1hr 41min</h2>
              <div className="rating">
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={farStar} />
                <span>4.2/5</span>
              </div>
              <div className="tags">
                <span className="tag yellow">Teen</span>
                <span className="tag">Comedy</span>
                <span className="tag blue">Drama</span>
              </div>
              <p className="desc">
                Alex and his best friend goes on a road trip whilst experiencing
                friendship, self-discovery, and the bittersweet transition to
                adulthood.
              </p>
              <div className="cast">
                <h3>Cast</h3>
                <ul>
                  <li>
                    <img
                      src="https://shashanktrivedi.com/wp-content/uploads/2023/09/cast-21.jpg"
                      alt="Jessica Enduro"
                      title="Jessica Enduro"
                    />
                  </li>
                  <li>
                    <img
                      src="https://shashanktrivedi.com/wp-content/uploads/2023/09/cast-11.jpg"
                      alt="Charles Garcia"
                      title="Charles Garcia"
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
