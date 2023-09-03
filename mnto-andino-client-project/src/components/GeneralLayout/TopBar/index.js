import React from "react";
import { Icon } from "semantic-ui-react";
import Logout from "../../Admin/AdminLayout/ProfileMenu/ProfileMenu";
import '../../../scss/_header.scss'
const TopBar = ({setMenuVisible, menuVisible}) => {
  return (
    <div className="topbar">
      <div className="logo-container">
        <Icon
          name={menuVisible ? "outdent" : "indent"}
          className="menu-toggle"
          onClick={()=>setMenuVisible(!menuVisible)}
        />
      </div>

      <Logout />
    </div>
  );
};

export default TopBar;
