// ListMenu.js
import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { size, map } from "lodash";
import { MenuItem } from "../MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { getAllMenus } from "../../../../actions/menuActions";
import { getMe } from "../../../../actions/authActions";
import { Loading } from "../../../Shared";

export function ListMenu(props) {
  const { menuActive, reload, onReload } = props;
  const dispatch = useDispatch();
  const menus = useSelector((state) => state.menu.allMenus);
  console.log(menus);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getMe());
        await dispatch(getAllMenus(menuActive));
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [menuActive, reload]);

  if (!menus) return <Loading />;

  if (size(menus) === 0) {
    return "No hay ningún menú";
  }

  return map(menus, (menu) => (
    <MenuItem key={menu._id} menu={menu} onReload={onReload} />
  ));
}
