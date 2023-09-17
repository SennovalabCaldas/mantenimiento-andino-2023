import React from "react";
import { Icon } from "semantic-ui-react";
import Logout from "../../Admin/AdminLayout/ProfileMenu/ProfileMenu";

const TopBar = ({ setMenuVisible, menuVisible }) => {
  return (
    <div className="topbar-header">
      <div className="logo-container">
        <Icon
          name={menuVisible ? "outdent" : "indent"}
          className="menu-toggle-navbar"
          onClick={() => setMenuVisible(!menuVisible)}
        />
      </div>
      <Logout />
    </div>
  );
};

export default TopBar;
