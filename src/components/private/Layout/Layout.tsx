"use client";

import React, { ReactNode, useRef } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import ProtectedRoute from "@/utils/ProtectedRoutes/ProtectedRoutes";
import { ThemeProvider } from "@/utils/context/ThemeContext/ThemeContext";
import { Sidebar } from "@/components/private/Sidebar/Sidebar";
import Header from "@/components/private/Header/Header";
import AuthInitializer from "@/components/auth/AuthInitializer/AuthInitializer";

interface DashboardLayoutProps {
  children: ReactNode;
}

const Layout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const layoutRef = useRef<HTMLDivElement>(null);

  return (
    <ThemeProvider>
      <AuthInitializer />
      <ProtectedRoute>
        <Box
          ref={layoutRef}
          sx={{
            position: "relative",
            display: "flex",
            overflow: "hidden",
            minHeight: "100vh",
            width: "100%",
          }}
        >
          <Header />
          <Sidebar
          // expanded={isNavigationExpanded}
          // setExpanded={setIsNavigationExpanded}
          // container={layoutRef.current ?? undefined}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              minWidth: 0,
            }}
          >
            <Toolbar sx={{ displayPrint: "none" }} />
            <Box
              component="main"
              sx={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                overflow: "auto",
              }}
            >
              {children}
            </Box>
          </Box>
        </Box>
      </ProtectedRoute>
    </ThemeProvider>
  );
};

export default Layout;