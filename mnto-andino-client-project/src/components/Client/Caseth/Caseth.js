import React from "react";
import "./Caseth.scss";

export const Caseth = () => {
  return (
    <div>
      <div client-content>
        <div className="client-card">
          <div className="ups">
            <div className="screw1">+</div>
            <div className="screw2">+</div>
          </div>
          <div className="card1">
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="yl">
              <div className="roll">
                <div className="s_wheel"></div>
                <div className="tape"></div>
                <div className="e_wheel"></div>
              </div>
              <p className="num">90</p>
            </div>
            <div className="or">
              <p className="time">MANTENIMIENTO ANDINO 2×30min</p>
            </div>
          </div>
          <div className="card2_main">
            <div className="card2">
              <div className="c1"></div>
              <div className="t1"></div>
              <div className="screw5">+</div>
              <div className="t2"></div>
              <div className="c2"></div>
            </div>
          </div>
          <div className="downs">
            <div className="screw3">+</div>
            <div className="screw4">+</div>
          </div>
        </div>
      </div>
    </div>
  );
};
