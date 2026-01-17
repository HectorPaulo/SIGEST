import * as React from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import dayjs from 'dayjs';
import { useRouter, useParams } from 'next/navigation';
import PageContainer from '../PageContainer/PageContainer';
import { useDialogs } from '@/hooks/useDialogs/useDialogs';
import useNotifications from '@/hooks/useNotifications/useNotifications';
import type { BaseEntity, EntityConfig, FormFieldConfig } from '@/types/generic';

interface GenericShowProps<T extends BaseEntity> {
    config: EntityConfig<T>;
}

export default function GenericShow<T extends BaseEntity>({ config }: GenericShowProps<T>) {
    const router = useRouter();
    const params = useParams();
    const itemId = params.itemId as string;
    const dialogs = useDialogs();
    const notifications = useNotifications();

    const [item, setItem] = React.useState<T | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState<Error | null>(null);

    const loadData = React.useCallback(async () => {
        setError(null);
        setIsLoading(true);

        try {
            const showData = await config.dataService.getOne(itemId);
            setItem(showData);
        } catch (showDataError) {
            setError(showDataError as Error);
        }
        setIsLoading(false);
    }, [itemId, config.dataService]);

    React.useEffect(() => {
        loadData();
    }, [loadData]);

    const handleEdit = React.useCallback(() => {
        router.push(`${config.basePath}/${itemId}/edit`);
    }, [router, itemId, config.basePath]);

    const handleDelete = React.useCallback(async () => {
        if (!item) {
            return;
        }

        const confirmed = await dialogs.confirm(
            `¿Desea eliminar este ${config.entityName.toLowerCase()}?`,
            {
                title: `¿Eliminar ${config.entityName.toLowerCase()}?`,
                severity: 'error',
                okText: 'Eliminar',
                cancelText: 'Cancelar',
            },
        );

        if (confirmed) {
            setIsLoading(true);
            try {
                await config.dataService.deleteOne(itemId);

                router.push(config.basePath);

                notifications.show(`${config.entityName} eliminado exitosamente.`, {
                    severity: 'success',
                    autoHideDuration: 3000,
                });
            } catch (deleteError) {
                notifications.show(
                    `Error al eliminar ${config.entityName.toLowerCase()}. Razón: ${(deleteError as Error).message}`,
                    {
                        severity: 'error',
                        autoHideDuration: 3000,
                    },
                );
            }
            setIsLoading(false);
        }
    }, [item, dialogs, itemId, router, notifications, config]);

    const handleBack = React.useCallback(() => {
        router.push(config.basePath);
    }, [router, config.basePath]);

    const formatFieldValue = React.useCallback((field: FormFieldConfig, value: unknown) => {
        console.log(`=== DEBUG: formatFieldValue ===`);
        console.log(`Campo: ${field.name} (${field.type})`);
        console.log(`Valor recibido:`, value);
        console.log(`Tipo de valor:`, typeof value);

        if (value == null || value === undefined) {
            console.log(`Valor es null/undefined, retornando '-'`);
            return '-';
        }

        // Manejo especial para objetos anidados (area y rol)
        if (field.name === 'area' || field.name === 'rol') {
            if (typeof value === 'object' && value !== null) {
                const result = (value as { nombre?: string }).nombre || '-';
                console.log(`Objeto anidado procesado: ${result}`);
                return result;
            }
            console.log(`Objeto anidado no válido, retornando '-'`);
            return '-';
        }

        let result: string;
        switch (field.type) {
            case 'date':
                result = dayjs(value as string).format('MMMM D, YYYY');
                break;
            case 'checkbox':
                result = value ? 'Sí' : 'No';
                break;
            case 'select':
                const option = field.options?.find(opt => opt.value === value);
                result = option ? option.label : String(value);
                break;
            case 'number':
                result = String(value);
                break;
            default:
                result = String(value);
        }

        console.log(`Resultado final: ${result}`);
        return result;
    }, []);

    const renderShow = React.useMemo(() => {
        if (isLoading) {
            return (
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        m: 1,
                    }}
                >
                    <CircularProgress />
                </Box>
            );
        }
        if (error) {
            return (
                <Box sx={{ flexGrow: 1 }}>
                    <Alert severity="error">{error.message}</Alert>
                </Box>
            );
        }

        return item ? (
            <Box sx={{ flexGrow: 1, width: '100%' }}>
                <Grid container spacing={2} sx={{ width: '100%' }}>
                    {(config.showFields || config.formFields).map((field) => (
                        <Grid
                            key={field.name}
                            size={field.gridSize || { xs: 12, sm: 6 }}
                        >
                            <Paper sx={{ px: 2, py: 1 }}>
                                <Typography variant="overline">{field.label}</Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    {formatFieldValue(field, (item as Record<string, unknown>)[field.name])}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
                <Divider sx={{ my: 3 }} />
                <Stack direction="row" spacing={2} justifyContent="space-between">
                    <Button
                        variant="contained"
                        startIcon={<ArrowBackIcon />}
                        onClick={handleBack}
                    >
                        Volver
                    </Button>
                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="contained"
                            startIcon={<EditIcon />}
                            onClick={handleEdit}
                        >
                            Editar
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            startIcon={<DeleteIcon />}
                            onClick={handleDelete}
                        >
                            Eliminar
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        ) : null;
    }, [
        isLoading,
        error,
        item,
        config.formFields,
        config.showFields,
        formatFieldValue,
        handleBack,
        handleEdit,
        handleDelete,
    ]);

    const pageTitle = `${config.entityName} ${itemId}`;

    return (
        <PageContainer
            title={pageTitle}
            breadcrumbs={[
                { title: config.entityNamePlural, path: config.basePath },
                { title: pageTitle },
            ]}
        >
            <Box sx={{ display: 'flex', flex: 1, width: '100%' }}>{renderShow}</Box>
        </PageContainer>
    );
}