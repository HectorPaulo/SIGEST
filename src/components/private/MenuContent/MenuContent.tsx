import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SupervisedUserCircleRoundedIcon from '@mui/icons-material/SupervisedUserCircleRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';

const mainListItems = [
    { text: 'Inicio', icon: <HomeRoundedIcon /> },
    { text: 'Bitácora', icon: <FolderOpenIcon /> },
    { text: 'Empleados', icon: <AssignmentIndIcon /> },
    { text: 'Areas', icon: <ApartmentRoundedIcon /> },
    { text: 'Inventario', icon: <Inventory2RoundedIcon /> },
    { text: 'Vales', icon: <ReceiptLongRoundedIcon /> },
    { text: 'Usuarios', icon: <SupervisedUserCircleRoundedIcon /> },
];

const secondaryListItems = [
    { text: 'Preferencais', icon: <SettingsRoundedIcon /> },
    { text: 'A cerca', icon: <InfoRoundedIcon /> },
    { text: 'Manual de usuario', icon: <HelpRoundedIcon /> },
];

export default function MenuContent() {
    return (
        <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
            <List dense>
                {mainListItems.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton selected={index === 0}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <List dense>
                {secondaryListItems.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Stack>
    );
}
