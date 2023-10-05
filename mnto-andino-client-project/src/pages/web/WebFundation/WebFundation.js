import React, { useEffect } from "react";
import "./WebFundation.scss";

export const WebFundation = () => {
  useEffect(() => {
    const sinceData = document.getElementById("sinceData");
    const date = new Date();
    const year = date.getFullYear();
    sinceData.innerHTML = year;
  }, []);

  return (
    <div className="fundation-section">
      <article>
        <header
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1520808663317-647b476a81b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2073&q=80')`,
          }}
        >
          <div className="upper-header">
            <div className="mini-title">article</div>
            <div className="date-since">
              <p>
                <span className="date-value" id="sinceData"></span>
              </p>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                <path
                  className="d"
                  d="M15,0C6.75,0,0,6.75,0,15s6.75,15,15,15,15-6.75,15-15S23.25,0,15,0Zm7.35,16.65h-7.35c-.83,0-1.5-.67-1.5-1.5V7.8c0-.9,.6-1.5,1.5-1.5s1.5,.6,1.5,1.5v5.85h5.85c.9,0,1.5,.6,1.5,1.5s-.6,1.5-1.5,1.5Z"
                />
              </svg>
            </div>
          </div>
          <div className="lower-header">
            <div className="tags-container">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path
                  className="d"
                  d="M19.22,9.66L10.77,1.21c-.74-.74-1.86-1.21-2.97-1.21H1.67C.75,0,0,.75,0,1.67V7.8c0,1.11,.46,2.23,1.3,2.97l8.45,8.46c1,1,2.62,1,3.62,0l5.94-5.95c.93-.93,.93-2.6-.09-3.62ZM6.96,6.35c-.59,.59-1.56,.59-2.15,0-.59-.59-.59-1.56,0-2.15,.59-.59,1.56-.59,2.15,0,.59,.59,.59,1.56,0,2.15Z"
                />
              </svg>
              <span>Nature</span>
              <span>Animal</span>
            </div>
            <h1 className="title">Birds, Birds, Birds!</h1>
            <p className="subtitle">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              imperdiet ut quam sit amet vehicula.
            </p>
          </div>
        </header>
      </article>
    </div>
  );
};
