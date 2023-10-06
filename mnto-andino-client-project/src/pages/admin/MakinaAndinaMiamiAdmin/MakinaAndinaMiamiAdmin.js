import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { MakinaAndinaMiami } from "../../../components";
import { getServicesMiami } from "../../../actions/makinaAndinaMiamiActions";

export const MakinaAndinaMiamiAdmin = () => {
  const dispatch = useDispatch();

  const makinaAndinaMiamiServices = useSelector(
    (state) => state.makinaAndinaMiami.makinaAndinaMiamiServices
  );
  console.log(makinaAndinaMiamiServices);
  useEffect(() => {
    dispatch(getServicesMiami());
  }, [dispatch]);

  return (
    <div>
      <h2>Makina Andina Miami</h2>
      <div className="users-page">
        <MakinaAndinaMiami />
      </div>
    </div>
  );
};
