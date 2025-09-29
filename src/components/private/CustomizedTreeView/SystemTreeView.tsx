import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { TreeViewBaseItem } from '@mui/x-tree-view/models';
import { GetAllAreas } from '@/lib/Controllers/AreaController';
import { GetAllEmpleados } from '@/lib/Controllers/EmpleadosController';
import { GetAllRoles } from '@/lib/Controllers/RolController';

interface Area {
    id: number;
    nombre: string;
    descripcion?: string;
}

interface Empleado {
    id: number;
    nombre: string;
    apellidos: string;
    area_id?: number;
}

interface Rol {
    id: number;
    nombre: string;
    descripcion?: string;
}

export default function SystemTreeView() {
    const [treeData, setTreeData] = React.useState<TreeViewBaseItem[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const [areasResponse, empleadosResponse, rolesResponse] = await Promise.all([
                    GetAllAreas(),
                    GetAllEmpleados(),
                    GetAllRoles(),
                ]);

                const areas: Area[] = areasResponse?.data || [];
                const empleados: Empleado[] = empleadosResponse?.data || [];
                const roles: Rol[] = rolesResponse?.data || [];

                // Crear la estructura del árbol
                const treeStructure: TreeViewBaseItem[] = [
                    {
                        id: 'system',
                        label: `Sistema SIGEST (${areas.length + empleados.length + roles.length} elementos)`,
                        children: [
                            {
                                id: 'areas',
                                label: `Áreas (${areas.length})`,
                                children: areas.map(area => {
                                    const empleadosEnArea = empleados.filter(emp => emp.area_id === area.id);
                                    return {
                                        id: `area-${area.id}`,
                                        label: `${area.nombre} (${empleadosEnArea.length} empleados)`,
                                        children: empleadosEnArea.length > 0 ? empleadosEnArea.map(empleado => ({
                                            id: `empleado-${empleado.id}`,
                                            label: `${empleado.nombre} ${empleado.apellidos}`,
                                        })) : undefined,
                                    };
                                }),
                            },
                            {
                                id: 'roles',
                                label: `Roles del Sistema (${roles.length})`,
                                children: roles.map(rol => ({
                                    id: `rol-${rol.id}`,
                                    label: rol.nombre,
                                })),
                            },
                            {
                                id: 'empleados-sin-area',
                                label: `Empleados sin Área (${empleados.filter(emp => !emp.area_id).length})`,
                                children: empleados
                                    .filter(emp => !emp.area_id)
                                    .map(empleado => ({
                                        id: `empleado-libre-${empleado.id}`,
                                        label: `${empleado.nombre} ${empleado.apellidos}`,
                                    })),
                            },
                        ],
                    },
                ];

                setTreeData(treeStructure);
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

    if (loading) {
        return (
            <Card variant="outlined" sx={{ height: 'fit-content' }}>
                <CardContent>
                    <Typography component="h2" variant="subtitle2" gutterBottom>
                        Estructura del Sistema
                    </Typography>
                    <Typography variant="body2">Cargando...</Typography>
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card variant="outlined" sx={{ height: 'fit-content' }}>
                <CardContent>
                    <Typography component="h2" variant="subtitle2" gutterBottom>
                        Estructura del Sistema
                    </Typography>
                    <Typography variant="body2" color="error">
                        Error: {error}
                    </Typography>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card variant="outlined" sx={{ height: 'fit-content' }}>
            <CardContent>
                <Typography component="h2" variant="subtitle2" gutterBottom>
                    Estructura del Sistema
                </Typography>
                <Box sx={{ minHeight: 200, minWidth: 200 }}>
                    <RichTreeView
                        items={treeData}
                        defaultExpandedItems={['system', 'areas', 'roles']}
                        sx={{
                            height: 'fit-content',
                            flexGrow: 1,
                            maxWidth: 300,
                            '& .MuiTreeItem-content': {
                                '&:hover': {
                                    backgroundColor: 'action.hover',
                                },
                                '&.Mui-selected': {
                                    backgroundColor: 'primary.main',
                                    color: 'primary.contrastText',
                                    '&:hover': {
                                        backgroundColor: 'primary.dark',
                                    },
                                },
                            },
                        }}
                    />
                </Box>
            </CardContent>
        </Card>
    );
}