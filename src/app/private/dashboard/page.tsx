"use client";

import * as React from 'react';
import type { } from '@mui/x-date-pickers/themeAugmentation';
import type { } from '@mui/x-charts/themeAugmentation';
import type { } from '@mui/x-data-grid-pro/themeAugmentation';
import type { } from '@mui/x-tree-view/themeAugmentation';
import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { chartsCustomizations, datePickersCustomizations, treeViewCustomizations } from "@/utils/theme/customizations";
import AppNavbar from '@/components/private/AppNavbar/AppNavbar';
import MainGrid from '@/components/private/MainGrid/MainGrid';
import SideMenu from '@/components/private/SideMenu/SideMenu';
import Header from '@/components/private/Header/Header';
import AppTheme from '@/utils/theme/AppTheme';
import { useTheme } from '@/utils/context/ThemeContext/ThemeContext';

function PageContent(props: { disableCustomTheme?: boolean }) {
    const { theme } = useTheme();
    const xThemeComponents = {
        ...chartsCustomizations,
        // ...dataGridCustomizations,
        ...datePickersCustomizations,
        ...treeViewCustomizations,
    };

    return (
        <AppTheme {...props} themeComponents={xThemeComponents} mode={theme}>
            <CssBaseline enableColorScheme />
            <Box sx={{ display: 'flex' }}>
                <SideMenu />
                <AppNavbar />
                {/*Contenido Principal*/}
                <Box
                    component="main"
                    sx={(theme) => ({
                        flexGrow: 1,
                        backgroundColor: theme.vars
                            ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                            : alpha(theme.palette.background.default, 1),
                        overflow: 'auto',
                    })}
                >
                    <Stack
                        spacing={2}
                        sx={{
                            alignItems: 'center',
                            mx: 3,
                            pb: 5,
                            mt: { xs: 8, md: 0 },
                        }}
                    >
                        <Header />
                        <MainGrid />
                    </Stack>
                </Box>
            </Box>
        </AppTheme>
    );
};

const Dashboard = () => {
    return (
        <PageContent></PageContent>
    );
};

export default Dashboard;