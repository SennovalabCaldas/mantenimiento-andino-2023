import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import { AdminLayout } from "../layouts";
import {
  Auth,
  Foundation,
  MakinaAndinaAdmin,
  News,
  Services,
  TestimoniesP,
} from "../pages/admin";
import { Users, Sedes, Home, Clients } from "../pages/admin";
import { Providers } from "../pages/admin/Providers";
import { WebMenu } from "../components/WebMenu";
import { Projects } from "../pages/admin/Projects/Projects";
import {
  LaMartina,
  MakinaAndina,
  MakinaAndinaMiami,
  WebSedes,
} from "../pages/web";
import { Allies } from "../components/Admin/Allies";
import { Certification } from "../pages/admin/Certification";
import { MakinaAndinaMiamiAdmin } from "../pages/admin/MakinaAndinaMiamiAdmin";
import { Glamping } from "../pages/admin/Glamping";
import { PrivacyPolicy } from "../components/Shared/Footer/PrivacyPolicy";
import { NotFound, VerifyToken } from "../components";
import { WebPqrs } from "../pages/web/WebPqrs/WebPqrs";
import { Departments } from "../pages/admin/Departaments/Departments";

export const AppRouter = () => {
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAdmin = user && user.role === "admin";

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
          <Route path="/makinandina" element={<MakinaAndina />} />
          <Route path="/makinandinamiami" element={<MakinaAndinaMiami />} />
          <Route path="/lamartina" element={<LaMartina />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/sedes" element={<WebSedes />} />
          <Route path="/pqrs" element={<WebPqrs />} />
          {/* <Route path="/verify-auth/:token" element={<VerifyToken />} /> */}
          <Route path="*" element={<NotFound />} />
        </>
      ) : (
        <>
          {isAdmin && (
            <>
              <Route path="*" element={loadLayout(AdminLayout, Home)} />
              <Route
                path="/admin/dashboard"
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
                path="admin/projects"
                element={loadLayout(AdminLayout, Projects)}
              />
              <Route
                path="admin/certifications"
                element={loadLayout(AdminLayout, Certification)}
              />
              <Route
                path="admin/clients"
                element={loadLayout(AdminLayout, Clients)}
              />
              <Route
                path="admin/departments-clients"
                element={loadLayout(AdminLayout, Departments)}
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
                path="admin/foundation"
                element={loadLayout(AdminLayout, Foundation)}
              />
              <Route
                path="admin/testimonies"
                element={loadLayout(AdminLayout, TestimoniesP)}
              />
              <Route
                path="admin/allies"
                element={loadLayout(AdminLayout, Allies)}
              />
              <Route
                path="admin/makinandina"
                element={loadLayout(AdminLayout, MakinaAndinaAdmin)}
              />
              <Route
                path="admin/makinandinamiami"
                element={loadLayout(AdminLayout, MakinaAndinaMiamiAdmin)}
              />
              <Route
                path="admin/glamping"
                element={loadLayout(AdminLayout, Glamping)}
              />
            </>
          )}
        </>
      )}
    </Routes>
  );
};
