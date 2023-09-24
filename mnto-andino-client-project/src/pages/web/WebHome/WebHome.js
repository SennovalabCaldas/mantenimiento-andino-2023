import React, { useEffect } from "react";
import "./WebHome.scss";
import { useSelector } from "react-redux";
export const WebHome = () => {
  const news = useSelector((state) => state.post.allPosts);
  console.log(news);
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
    <div>
      {news.map((post) => (
        <div className="demo-cont">
          <div className="fnc-slider example-slider">
            <div className="fnc-slider__slides">
              <div className="fnc-slide m--blend-green m--active-slide">
                <div className="fnc-slide__inner">
                  <div className="fnc-slide__mask">
                    <div className="fnc-slide__mask-inner"></div>
                  </div>
                  <div className="fnc-slide__content">
                    <h2 className="fnc-slide__heading">
                      <div className="fnc-slide__heading-line">
                        <span> {post.titulo}</span>
                      </div>
                      <div className="fnc-slide__heading-line">
                        <span> {post.subtitulo}</span>
                      </div>
                    </h2>
                    <button type="button" className="fnc-slide__action-btn">
                      Credits
                      <span data-text="Credits">Credits</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <nav className="fnc-nav">
              <div className="fnc-nav__bgs">
                <div className="fnc-nav__bg m--navbg-green m--active-nav-bg"></div>
                <div className="fnc-nav__bg m--navbg-dark"></div>
                <div className="fnc-nav__bg m--navbg-red"></div>
                <div className="fnc-nav__bg m--navbg-blue"></div>
              </div>
              <div className="fnc-nav__controls">
                <button className="fnc-nav__control">
                  {post.titulo}
                  <span className="fnc-nav__control-progress"></span>
                </button>
              </div>
            </nav>
          </div>
        </div>
      ))}
    </div>
  );
};
