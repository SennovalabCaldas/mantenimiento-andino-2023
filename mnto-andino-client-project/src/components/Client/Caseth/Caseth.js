import React from "react";
import "./Caseth.scss";

export const Caseth = () => {
  return (
    <div>
      <div client-content>
        <div class="client-card">
          <div class="ups">
            <div class="screw1">+</div>
            <div class="screw2">+</div>
          </div>
          <div class="card1">
            <div class="line1"></div>
            <div class="line2"></div>
            <div class="yl">
              <div class="roll">
                <div class="s_wheel"></div>
                <div class="tape"></div>
                <div class="e_wheel"></div>
              </div>
              <p class="num">90</p>
            </div>
            <div class="or">
              <p class="time">2×30min</p>
            </div>
          </div>
          <div class="card2_main">
            <div class="card2">
              <div class="c1"></div>
              <div class="t1"></div>
              <div class="screw5">+</div>
              <div class="t2"></div>
              <div class="c2"></div>
            </div>
          </div>
          <div class="downs">
            <div class="screw3">+</div>
            <div class="screw4">+</div>
          </div>
        </div>
      </div>
    </div>
  );
};
