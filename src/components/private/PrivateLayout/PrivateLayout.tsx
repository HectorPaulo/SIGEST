"use client";

import * as React from 'react';
import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { chartsCustomizations, datePickersCustomizations, treeViewCustomizations } from "@/utils/theme/customizations";
import AppNavbar from '@/components/private/AppNavbar/AppNavbar';
import SideMenu from '@/components/private/SideMenu/SideMenu';
import Header from '@/components/private/Header/Header';
import AppTheme from '@/utils/theme/AppTheme';
import Copyright from "@/components/private/copyright/copyright";

interface PrivateLayoutProps {
    children: React.ReactNode;
    disableCustomTheme?: boolean;
}

const PageContent = ({ children, disableCustomTheme }: PrivateLayoutProps) => {
    const xThemeComponents = {
        ...chartsCustomizations,
        ...datePickersCustomizations,
        ...treeViewCustomizations,
    }

    return (
        <AppTheme disableCustomTheme={disableCustomTheme} themeComponents={xThemeComponents}>
            <CssBaseline enableColorScheme />
            <Box sx={{ display: 'flex' }}>
                <SideMenu />
                <AppNavbar />
                {/*Contenido principal*/}
                <Box
                    component="main"
                    sx={(theme) => ({
                        flexGrow: 1,
                        backgroundColor: theme.vars
                            ? `rgba(${theme.vars.palette.background.defaultChannel} /1)`
                            : alpha(theme.palette.background.default, 1),
                        overflow: 'auto',
                    })}
                >
                    <Stack spacing={2}
                        sx={{
                            alignItems: 'center',
                            mx: 3,
                            pb: 5,
                            mt: { xs: 8, md: 0 },
                        }}>
                        <Header />
                        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
                            {children}
                            <Copyright sx={{ my: 4 }} />
                        </Box>
                    </Stack>
                </Box>
            </Box>
        </AppTheme>
    )
}

export default function PrivateLayout({ children, disableCustomTheme }: PrivateLayoutProps) {
    return (
        <PageContent disableCustomTheme={disableCustomTheme}>
            {children}
        </PageContent>
    );
}