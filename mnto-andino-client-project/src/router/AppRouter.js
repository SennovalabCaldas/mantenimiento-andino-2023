import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import { AdminLayout } from "../layouts";
import { Auth, News, Services } from "../pages/admin";
import { Users, Sedes, Home, Clients } from "../pages/admin";
import { EmployeeHome, EmployeeServices } from "../pages/employee";
import { Providers } from "../pages/admin/Providers";
import { EmployeeNews } from "../pages/employee/EmployeeNews";
import Reports from "../pages/admin/Reports/Reports";
import { WebMenu } from "../components/WebMenu";

export const AppRouter = () => {
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAdmin = user && user.role === "admin";
  const isEmployee = user && user.role === "user";
  const [activeSection, setActiveSection] = useState("");

  console.log(isAuthenticated);
  console.log(isAdmin);

  const loadLayout = (Layout, Page) => {
    return (
      <Layout>
        <Page />
      </Layout>
    );
  };

  return (
    <Routes>
      {!isAuthenticated ? (
        <>
          <Route path="/" element={<WebMenu />} />
          <Route path="/login" element={<Auth />} />
        </>
      ) : (
        <>
          {isAdmin && (
            <>
              <Route index element={<Home />} />
              <Route path="/admin" element={<WebMenu />} />
              <Route
                path="admin/home"
                element={loadLayout(AdminLayout, Home)}
              />
              <Route
                path="admin/users"
                element={loadLayout(AdminLayout, Users)}
              />
              <Route
                path="admin/sedes"
                element={loadLayout(AdminLayout, Sedes)}
              />
              <Route
                path="admin/services"
                element={loadLayout(AdminLayout, Services)}
              />
              <Route
                path="admin/clients"
                element={loadLayout(AdminLayout, Clients)}
              />
              <Route
                path="admin/news"
                element={loadLayout(AdminLayout, News)}
              />
              <Route
                path="admin/providers"
                element={loadLayout(AdminLayout, Providers)}
              />
              <Route
                path="admin/reports"
                element={loadLayout(AdminLayout, Reports)}
              />
            </>
          )}
          {isEmployee && (
            <Route
              path="/employee"
              element={
                <AdminLayout
                  activeSection={activeSection}
                  setActiveSection={setActiveSection}
                />
              }
            >
              <Route path="/" element={<EmployeeHome />} />
              <Route path="/home" element={<EmployeeHome />} />
              <Route path="/services" element={<EmployeeServices />} />
              <Route path="/news" element={<EmployeeNews />} />
            </Route>
          )}
        </>
      )}
    </Routes>
  );
};
