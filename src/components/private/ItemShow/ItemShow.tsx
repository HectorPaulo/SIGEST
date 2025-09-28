"use client";

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
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import {
    deleteOne as deleteEmployee,
    getOne as getEmployee,
    type Employee,
} from '../data/item';
import PageContainer from "../PageContainer/PageContainer";
import { useDialogs } from "@/hooks/useDialogs/useDialogs";
import useNotifications from "@/hooks/useNotifications/useNotifications";

export default function ItemShow() {
    const router = useRouter();
    const params = useParams();
    const itemId = params.itemId as string;
    const dialogs = useDialogs();
    const notifications = useNotifications();

    const [item, setItem] = React.useState<Employee | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState<Error | null>(null);

    const loadData = React.useCallback(async () => {
        setError(null);
        setIsLoading(true);

        try {
            const showData = await getEmployee(Number(itemId));

            setItem(showData);
        } catch (showDataError) {
            setError(showDataError as Error);
        }
        setIsLoading(false);
    }, [itemId]);

    React.useEffect(() => {
        loadData();
    }, [loadData]);

    const handleEmployeeEdit = React.useCallback(() => {
        router.push(`/employees/${itemId}/edit`);
    }, [router, itemId]);

    const handleEmployeeDelete = React.useCallback(async () => {
        if (!item) {
            return;
        }

        const confirmed = await dialogs.confirm(
            `Do you wish to delete ${item.name}?`,
            {
                title: `Delete employee?`,
                severity: 'error',
                okText: 'Delete',
                cancelText: 'Cancel',
            },
        );

        if (confirmed) {
            setIsLoading(true);
            try {
                await deleteEmployee(Number(itemId));

                router.push('/employees');

                notifications.show('Employee deleted successfully.', {
                    severity: 'success',
                    autoHideDuration: 3000,
                });
            } catch (deleteError) {
                notifications.show(
                    `Failed to delete employee. Reason:' ${(deleteError as Error).message}`,
                    {
                        severity: 'error',
                        autoHideDuration: 3000,
                    },
                );
            }
            setIsLoading(false);
        }
    }, [item, dialogs, itemId, router, notifications]);

    const handleBack = React.useCallback(() => {
        router.push('/employees');
    }, [router]);

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
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Paper sx={{ px: 2, py: 1 }}>
                            <Typography variant="overline">Name</Typography>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                {item.name}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Paper sx={{ px: 2, py: 1 }}>
                            <Typography variant="overline">Age</Typography>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                {item.age}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Paper sx={{ px: 2, py: 1 }}>
                            <Typography variant="overline">Join date</Typography>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                {dayjs(item.joinDate).format('MMMM D, YYYY')}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Paper sx={{ px: 2, py: 1 }}>
                            <Typography variant="overline">Department</Typography>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                {item.role}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Paper sx={{ px: 2, py: 1 }}>
                            <Typography variant="overline">Full-time</Typography>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                {item.isFullTime ? 'Yes' : 'No'}
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
                <Divider sx={{ my: 3 }} />
                <Stack direction="row" spacing={2} justifyContent="space-between">
                    <Button
                        variant="contained"
                        startIcon={<ArrowBackIcon />}
                        onClick={handleBack}
                    >
                        Back
                    </Button>
                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="contained"
                            startIcon={<EditIcon />}
                            onClick={handleEmployeeEdit}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            startIcon={<DeleteIcon />}
                            onClick={handleEmployeeDelete}
                        >
                            Delete
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        ) : null;
    }, [
        isLoading,
        error,
        item,
        handleBack,
        handleEmployeeEdit,
        handleEmployeeDelete,
    ]);

    const pageTitle = `Employee ${itemId}`;

    return (
        <PageContainer
            title={pageTitle}
            breadcrumbs={[
                { title: 'Employees', path: '/employees' },
                { title: pageTitle },
            ]}
        >
            <Box sx={{ display: 'flex', flex: 1, width: '100%' }}>{renderShow}</Box>
        </PageContainer>
    );
}
