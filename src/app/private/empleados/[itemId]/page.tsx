"use client";

import * as React from 'react';
import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { chartsCustomizations, datePickersCustomizations, treeViewCustomizations } from "@/utils/theme/customizations";
import SideMenu from '@/components/private/SideMenu/SideMenu';
import Header from '@/components/private/Header/Header';
import AppTheme from '@/utils/theme/AppTheme';
import { useTheme } from '@/utils/context/ThemeContext/ThemeContext';
import { empleadoConfig } from '@/lib/config/entityConfigs';
import GenericShow from '@/components/private/GenericShow/GenericShow';
import type { Empleado } from '@/types/empleado';

const PageContent = (props: {disableCustomTheme?: boolean}) => {
    const { theme } = useTheme();
    const xThemeComponents = {
        ...chartsCustomizations,
        ...datePickersCustomizations,
        ...treeViewCustomizations,
    }
    return <AppTheme {...props} themeComponents={xThemeComponents} mode={theme}>
        <CssBaseline enableColorScheme />
        <Box sx={{ display: 'flex' }}>

            <SideMenu />

            {/*Contenido principal*/}
            <Box
                component="main"
                sx={( theme) => ({
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
                        <div className='h-screen'>
                            <GenericShow<Empleado> config={empleadoConfig} />
                        </div>
                    </Box>
                </Stack>
            </Box>

        </Box>

    </AppTheme>;
}

const EmpleadoShowPage = () => {
    return (
        <PageContent />
    );
};

export default EmpleadoShowPage;