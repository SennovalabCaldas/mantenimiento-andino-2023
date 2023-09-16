import React, { useEffect, useState } from "react";
import "./WebServices.scss";
import "./demo.scss";
import { image } from "../../../assets";
import SliderMenuServices from "./SliderMenuServices";

const WebServices = () => {
  const [menuItems] = useState([
    { text: "OBRA CIVIL Y MANTENIMIENTO" },
    { text: "CONSTRUCCIÓN Y ADECUACIÓN" },
    { text: "SUMINISTRO E INSTALACIÓN" },
    { text: "REDES DE FRIO Y REFRIGERACIÓN" },
  ]);

  useEffect(() => {
    const initialCategoryIndex = menuItems.findIndex(
      (item) => item.text === "OBRA CIVIL Y MANTENIMIENTO"
    );
    setSelectedCategory(initialCategoryIndex);
  }, []);

  const handleCategoryClick = (index) => {
    setSelectedCategory(index);
  };
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    [].slice
      .call(document.querySelectorAll('a[href="#"'))
      .forEach(function (el) {
        el.addEventListener("click", function (ev) {
          ev.preventDefault();
        });
      });
  }, []);

  return (
    <div className="service-page">
      <h2>Servicios</h2>
      <SliderMenuServices
        menuItems={menuItems}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      ></SliderMenuServices>
      <div className="content-service">
        {menuItems.map((category, index) => (
          <div key={index}>
            <h2
              className={index === selectedCategory ? "selected" : "hidden"}
              onClick={() => setSelectedCategory(index)}
            ></h2>
            <div
              className={`grid ${
                index === selectedCategory ? "visible" : "hidden"
              }`}
            >
              {/* Aquí coloca las figuras correspondientes a la categoría */}
              {index === selectedCategory && (
                <>
                  {category.text === "CONSTRUCCIÓN Y ADECUACIÓN" && (
                    <>
                      <figure class="effect-hera">
                        <img src={image.s0} alt="img17" />
                        <figcaption>
                          <h2>
                            CONSTRUCCIÓN Y ADECUACIÓN<span></span>
                          </h2>
                          <p>
                            <a href="#">
                              <i class="fa fa-fw fa-file-pdf-o"></i>
                            </a>
                            <a href="#">
                              <i class="fa fa-fw fa-file-image-o"></i>
                            </a>
                            <a href="#">
                              <i class="fa fa-fw fa-file-archive-o"></i>
                            </a>
                            <a href="#">
                              <i class="fa fa-fw fa-file-code-o"></i>
                            </a>
                          </p>
                        </figcaption>
                      </figure>
                      <figure class="effect-hera">
                        <img src={image.s1} alt="img25" />
                        <figcaption>
                          <h2>
                            CONSTRUCCIÓN Y ADECUACIÓN<span></span>
                          </h2>
                          <p>
                            <a href="#">
                              <i class="fa fa-fw fa-file-pdf-o"></i>
                            </a>
                            <a href="#">
                              <i class="fa fa-fw fa-file-image-o"></i>
                            </a>
                            <a href="#">
                              <i class="fa fa-fw fa-file-archive-o"></i>
                            </a>
                            <a href="#">
                              <i class="fa fa-fw fa-file-code-o"></i>
                            </a>
                          </p>
                        </figcaption>
                      </figure>
                    </>
                  )}

                  {category.text === "SUMINISTRO E INSTALACIÓN" && (
                    <>
                      <div class="grid">
                        <figure class="effect-apollo">
                          <img src={image.s5} alt="img18" />
                          <figcaption>
                            <h2>
                              Strong <span>Apollo</span>
                            </h2>
                            <p>Apollo's last game of pool was so strange.</p>
                            <a href="#">View more</a>
                          </figcaption>
                        </figure>
                        <figure class="effect-apollo">
                          <img src={image.s6} alt="img22" />
                          <figcaption>
                            <h2>
                              Strong <span>Apollo</span>
                            </h2>
                            <p>Apollo's last game of pool was so strange.</p>
                            <a href="#">View more</a>
                          </figcaption>
                        </figure>
                        <figure class="effect-ming">
                          <img src={image.logo} alt="img09" />
                          <figcaption>
                            <h2>
                              SUMINISTRO E INSTALACIÓN<span></span>
                            </h2>
                            <p>
                              Ming sits in the corner the whole day. She's into
                              crochet.
                            </p>
                            <a href="#">View more</a>
                          </figcaption>
                        </figure>
                        <figure class="effect-ming">
                          <img src={image.logo} alt="img08" />
                          <figcaption>
                            <h2>
                              SUMINISTRO E INSTALACIÓN<span></span>
                            </h2>
                            <p>
                              Ming sits in the corner the whole day. She's into
                              crochet.
                            </p>
                            <a href="#">View more</a>
                          </figcaption>
                        </figure>
                      </div>
                    </>
                  )}

                  {category.text === "REDES DE FRIO Y REFRIGERACIÓN" && (
                    <>
                      <div class="grid">
                        <figure class="effect-moses">
                          <img src={image.s7} alt="img24" />
                          <figcaption>
                            <h2>
                              REDES DE FRIO Y REFRIGERACIÓN<span></span>
                            </h2>
                            <p>Moses loves to run after butterflies.</p>
                            <a href="#">View more</a>
                          </figcaption>
                        </figure>
                        <figure class="effect-moses">
                          <img src={image.s8} alt="img20" />
                          <figcaption>
                            <h2>
                              REDES DE FRIO Y REFRIGERACIÓN<span></span>
                            </h2>
                            <p>Moses loves to run after butterflies.</p>
                            <a href="#">View more</a>
                          </figcaption>
                        </figure>
                      </div>
                    </>
                  )}

                  {category.text === "OBRA CIVIL Y MANTENIMIENTO" && (
                    <>
                      <div class="grid">
                        <figure class="effect-duke">
                          <img src={image.logo} alt="img27" />
                          <figcaption>
                            <h2>
                              OBRA CIVIL Y MANTENIMIENTO<span></span>
                            </h2>
                            <p>
                              Duke is very bored. When he looks at the sky, he
                              feels to run.
                            </p>
                            <a href="#">View more</a>
                          </figcaption>
                        </figure>
                        <figure class="effect-duke">
                          <img src={image.logo} alt="img17" />
                          <figcaption>
                            <h2>
                              OBRA CIVIL Y MANTENIMIENTO<span></span>
                            </h2>
                            <p>
                              Duke is very bored. When he looks at the sky, he
                              feels to run.
                            </p>
                            <a href="#">View more</a>
                          </figcaption>
                        </figure>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WebServices;
