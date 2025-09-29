"use client";

import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { GetAllUsers } from '@/lib/Controllers/UsersController';
import { GetAllAreas } from '@/lib/Controllers/AreaController';
import { GetAllInventario } from '@/lib/Controllers/InventarioController';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const userColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'username', headerName: 'Usuario', width: 130 },
    { field: 'name', headerName: 'Nombre', width: 130 },
    { field: 'apellidoPat', headerName: 'Apellido Pat.', width: 130 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'funcion', headerName: 'Función', width: 130 },
];

const areaColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'nombre', headerName: 'Nombre', width: 200 },
    { field: 'descripcion', headerName: 'Descripción', width: 300 },
];

const inventarioColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'clave', headerName: 'Clave', width: 120 },
    { field: 'nombre', headerName: 'Nombre', width: 150 },
    { field: 'tipo', headerName: 'Tipo', width: 120 },
    { field: 'existencias', headerName: 'Existencias', width: 120, type: 'number' },
    { field: 'marca', headerName: 'Marca', width: 120 },
];

export default function CustomizedDataGrid() {
    const [tabValue, setTabValue] = React.useState(0);
    const [users, setUsers] = React.useState([]);
    const [areas, setAreas] = React.useState([]);
    const [inventario, setInventario] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const [usersResponse, areasResponse, inventarioResponse] = await Promise.all([
                    GetAllUsers(),
                    GetAllAreas(),
                    GetAllInventario(),
                ]);

                setUsers(usersResponse?.data || []);
                setAreas(areasResponse?.data || []);
                setInventario(inventarioResponse?.data || []);
                setError(null);
            } catch (err: unknown) {
                const error = err as { response?: { data?: { message?: string } }; message?: string };
                setError(error?.response?.data?.message || error?.message || 'Error al cargar datos');
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    if (error) {
        return (
            <Box sx={{ p: 2, color: 'error.main' }}>
                <Typography variant="body2">Error: {error}</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleTabChange} aria-label="data tabs">
                    <Tab label={`Usuarios (${users.length})`} />
                    <Tab label={`Áreas (${areas.length})`} />
                    <Tab label={`Inventario (${inventario.length})`} />
                </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
                <DataGrid
                    rows={users}
                    columns={userColumns}
                    loading={loading}
                    getRowClassName={(params) =>
                        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                    }
                    initialState={{
                        pagination: { paginationModel: { pageSize: 10 } },
                    }}
                    pageSizeOptions={[5, 10, 20]}
                    disableColumnResize
                    density="compact"
                    checkboxSelection
                    sx={{ height: 400 }}
                />
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
                <DataGrid
                    rows={areas}
                    columns={areaColumns}
                    loading={loading}
                    getRowClassName={(params) =>
                        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                    }
                    initialState={{
                        pagination: { paginationModel: { pageSize: 10 } },
                    }}
                    pageSizeOptions={[5, 10, 20]}
                    disableColumnResize
                    density="compact"
                    checkboxSelection
                    sx={{ height: 400 }}
                />
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
                <DataGrid
                    rows={inventario}
                    columns={inventarioColumns}
                    loading={loading}
                    getRowClassName={(params) =>
                        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                    }
                    initialState={{
                        pagination: { paginationModel: { pageSize: 10 } },
                    }}
                    pageSizeOptions={[5, 10, 20]}
                    disableColumnResize
                    density="compact"
                    checkboxSelection
                    sx={{ height: 400 }}
                />
            </TabPanel>
        </Box>
    );
}