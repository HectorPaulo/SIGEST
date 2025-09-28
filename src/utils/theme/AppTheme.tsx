// import * as React from 'react';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import type { ThemeOptions } from '@mui/material/styles';
// import {inputsCustomizations} from "@/utils/theme/customizations/inputs";
// import {dataDisplayCustomizations} from "@/utils/theme/customizations/dataDisplay";
// import {feedbackCustomizations} from "@/utils/theme/customizations/feedback";
// import {navigationCustomizations} from "@/utils/theme/customizations/navigation";
// import {surfacesCustomizations} from "@/utils/theme/customizations/surfaces";
// import {colorSchemes, shadows, shape, typography} from "@/utils/theme/ThemePrimitives";
//
// interface AppThemeProps {
//     children: React.ReactNode;
//     /**
//      * This is for the docs site. You can ignore it or remove it.
//      */
//     disableCustomTheme?: boolean;
//     themeComponents?: ThemeOptions['components'];
//     mode?: 'light' | 'dark';
// }
//
// export default function AppTheme(props: AppThemeProps) {
//     const { children, disableCustomTheme, themeComponents, mode = 'light' } = props;
//     const theme = React.useMemo(() => {
//         return disableCustomTheme
//             ? {}
//             : createTheme({
//                 // For more details about CSS variables configuration, see https://mui.com/material-ui/customization/css-theme-variables/configuration/
//                 cssVariables: {
//                     colorSchemeSelector: 'data-mui-color-scheme',
//                     cssVarPrefix: 'template',
//                 },
//                 colorSchemes, // Recently added in v6 for building light & dark mode app, see https://mui.com/material-ui/customization/palette/#color-schemes
//                 typography,
//                 shadows,
//                 shape,
//                 components: {
//                     ...inputsCustomizations,
//                     ...dataDisplayCustomizations,
//                     ...feedbackCustomizations,
//                     ...navigationCustomizations,
//                     ...surfacesCustomizations,
//                     ...themeComponents,
//                 },
//                 palette: {
//                     mode,
//                 },
//             });
//     }, [disableCustomTheme, themeComponents, mode]);
//     if (disableCustomTheme) {
//         return <React.Fragment>{children}</React.Fragment>;
//     }
//     return (
//         <ThemeProvider theme={theme} disableTransitionOnChange>
//             {children}
//         </ThemeProvider>
//     );
// }


import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';
import { inputsCustomizations } from './customizations/inputs';
import { dataDisplayCustomizations } from './customizations/dataDisplay';
import { feedbackCustomizations } from './customizations/feedback';
import { navigationCustomizations } from './customizations/navigation';
import { surfacesCustomizations } from './customizations/surfaces';
import {colorSchemes, shadows, shape, typography} from "@/utils/theme/ThemePrimitives";

interface AppThemeProps {
    children: React.ReactNode;
    /**
     * This is for the docs site. You can ignore it or remove it.
     */
    disableCustomTheme?: boolean;
    themeComponents?: ThemeOptions['components'];
}

export default function AppTheme(props: AppThemeProps) {
    const { children, disableCustomTheme, themeComponents } = props;
    const theme = React.useMemo(() => {
        return disableCustomTheme
            ? {}
            : createTheme({
                // For more details about CSS variables configuration, see https://mui.com/material-ui/customization/css-theme-variables/configuration/
                cssVariables: {
                    colorSchemeSelector: 'data-mui-color-scheme',
                    cssVarPrefix: 'template',
                },
                colorSchemes, // Recently added in v6 for building light & dark mode app, see https://mui.com/material-ui/customization/palette/#color-schemes
                typography,
                shadows,
                shape,
                components: {
                    ...inputsCustomizations,
                    ...dataDisplayCustomizations,
                    ...feedbackCustomizations,
                    ...navigationCustomizations,
                    ...surfacesCustomizations,
                    ...themeComponents,
                },
            });
    }, [disableCustomTheme, themeComponents]);
    if (disableCustomTheme) {
        return <React.Fragment>{children}</React.Fragment>;
    }
    return (
        <ThemeProvider theme={theme} disableTransitionOnChange>
            {children}
        </ThemeProvider>
    );
}
