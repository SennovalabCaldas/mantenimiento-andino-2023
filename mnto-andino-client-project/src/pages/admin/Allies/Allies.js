import React, { useState, useEffect } from "react";
import { Tabs, Tab, Paper, Typography, Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { getAllClients } from "../../../actions/clientActions";
import { Suppliers } from "../../../components/Admin/Suppliers";
import { Allies } from "../../../components/Admin/Allies";

export const Allies = () => {

  return (
    <div>
      <h2>Aliados</h2>
      <Allies />
    </div>
  );
};
