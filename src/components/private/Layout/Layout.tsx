"use client";

                                import React, { ReactNode, useRef, useState, useCallback } from "react";
                                import { useTheme } from "@mui/material/styles";
                                import useMediaQuery from "@mui/material/useMediaQuery";
                                import Box from "@mui/material/Box";
                                import Toolbar from "@mui/material/Toolbar";
                                import ProtectedRoute from "@/utils/ProtectedRoutes/ProtectedRoutes";
                                import { ThemeProvider } from "@/utils/context/ThemeContext/ThemeContext";
import UpnIcon from "@/components/private/UpnIcon/UpnIcon";
import {Sidebar} from "@/components/private/Sidebar/Sidebar";
import Header from "@/components/private/Header/Header";

                                interface DashboardLayoutProps {
                                  children: ReactNode;
                                }

                                const Layout: React.FC<DashboardLayoutProps> = ({ children }) => {
                                  const theme = useTheme();
                                  const layoutRef = useRef<HTMLDivElement>(null);

                                  const [isDesktopNavigationExpanded, setIsDesktopNavigationExpanded] = useState(true);
                                  const [isMobileNavigationExpanded, setIsMobileNavigationExpanded] = useState(false);

                                  const isOverMdViewport = useMediaQuery(theme.breakpoints.up("md"));
                                  const isNavigationExpanded = isOverMdViewport
                                    ? isDesktopNavigationExpanded
                                    : isMobileNavigationExpanded;

                                  const setIsNavigationExpanded = useCallback(
                                    (newExpanded: boolean) => {
                                      if (isOverMdViewport) {
                                        setIsDesktopNavigationExpanded(newExpanded);
                                      } else {
                                        setIsMobileNavigationExpanded(newExpanded);
                                      }
                                    },
                                    [isOverMdViewport]
                                  );

                                  const handleToggleHeaderMenu = useCallback(
                                    (isExpanded: boolean) => {
                                      setIsNavigationExpanded(isExpanded);
                                    },
                                    [setIsNavigationExpanded]
                                  );

                                  return (
                                    <ThemeProvider>
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
                                          <Header
                                            logo={<UpnIcon />}
                                            title=""
                                            menuOpen={isNavigationExpanded}
                                            onToggleMenu={handleToggleHeaderMenu}
                                          />
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