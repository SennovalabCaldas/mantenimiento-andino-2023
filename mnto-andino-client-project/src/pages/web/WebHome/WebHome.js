import React from "react";
import { Carrousel } from "./Carrousel";
import "./WebHome.scss";

export const WebHome = ({ posts }) => {
  console.log("posts =>", posts);
  return (
    <div className="webhome-style">
      <Carrousel posts={posts} />
    </div>
  );
};
