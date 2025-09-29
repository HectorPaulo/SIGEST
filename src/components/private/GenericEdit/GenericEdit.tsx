import * as React from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter, useParams } from 'next/navigation';
import useNotifications from '@/hooks/useNotifications/useNotifications';
import PageContainer from '@/components/private/PageContainer/PageContainer';
import GenericForm, { GenericFormState } from '@/components/private/GenericForm/GenericForm';
import type { BaseEntity, EntityConfig, EntityInsert } from '@/types/generic';

interface GenericEditFormProps<T extends BaseEntity> {
    initialValues: Partial<EntityInsert<T>>;
    config: EntityConfig<T>;
    onSubmit: (formValues: Partial<EntityInsert<T>>) => Promise<void>;
}

function GenericEditForm<T extends BaseEntity>({
    initialValues,
    config,
    onSubmit,
}: GenericEditFormProps<T>) {
    const params = useParams();
    const router = useRouter();
    const notifications = useNotifications();

    const itemId = params.itemId as string;

    const [formState, setFormState] = React.useState<GenericFormState<T>>(() => ({
        values: initialValues,
        errors: {},
    }));
    const formValues = formState.values;
    const formErrors = formState.errors;

    const setFormValues = React.useCallback(
        (newFormValues: Partial<EntityInsert<T>>) => {
            setFormState((previousState) => ({
                ...previousState,
                values: newFormValues,
            }));
        },
        [],
    );

    const setFormErrors = React.useCallback(
        (newFormErrors: Partial<Record<string, string>>) => {
            setFormState((previousState) => ({
                ...previousState,
                errors: newFormErrors,
            }));
        },
        [],
    );

    const handleFormFieldChange = React.useCallback(
        (name: string, value: unknown) => {
            const validateField = (values: Partial<EntityInsert<T>>) => {
                const { issues } = config.dataService.validate(values as Partial<T>);
                setFormErrors({
                    ...formErrors,
                    [name]: issues?.find((issue) => issue.path?.[0] === name)?.message,
                });
            };

            const newFormValues = { ...formValues, [name]: value };
            setFormValues(newFormValues);
            validateField(newFormValues);
        },
        [formValues, formErrors, setFormErrors, setFormValues, config.dataService],
    );

    const handleFormReset = React.useCallback(() => {
        setFormValues(initialValues);
        setFormErrors({});
    }, [initialValues, setFormValues, setFormErrors]);

    const handleFormSubmit = React.useCallback(async () => {
        const { issues } = config.dataService.validate(formValues as Partial<T>);
        if (issues && issues.length > 0) {
            setFormErrors(
                Object.fromEntries(issues.map((issue) => [issue.path?.[0], issue.message])),
            );
            return;
        }
        setFormErrors({});

        try {
            await onSubmit(formValues);
            notifications.show(`${config.entityName} editado exitosamente.`, {
                severity: 'success',
                autoHideDuration: 3000,
            });

            router.push(config.basePath);
        } catch (editError) {
            notifications.show(
                `Error al editar ${config.entityName.toLowerCase()}. Razón: ${(editError as Error).message}`,
                {
                    severity: 'error',
                    autoHideDuration: 3000,
                },
            );
            throw editError;
        }
    }, [formValues, router, notifications, onSubmit, setFormErrors, config]);

    return (
        <GenericForm
            formState={formState}
            formFields={config.formFields}
            onFieldChange={handleFormFieldChange}
            onSubmit={handleFormSubmit}
            onReset={handleFormReset}
            submitButtonLabel="Guardar"
            backButtonPath={`${config.basePath}/${itemId}`}
        />
    );
}

interface GenericEditProps<T extends BaseEntity> {
    config: EntityConfig<T>;
}

export default function GenericEdit<T extends BaseEntity>({ config }: GenericEditProps<T>) {
    const params = useParams();
    const itemId = params.itemId as string;

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

    const handleSubmit = React.useCallback(
        async (formValues: Partial<EntityInsert<T>>) => {
            const updatedData = await config.dataService.updateOne(itemId, formValues);
            setItem(updatedData);
        },
        [itemId, config.dataService],
    );

    const renderEdit = React.useMemo(() => {
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
            <GenericEditForm initialValues={item} config={config} onSubmit={handleSubmit} />
        ) : null;
    }, [isLoading, error, item, handleSubmit, config]);

    return (
        <PageContainer
            title={`Editar ${config.entityName} ${itemId}`}
            breadcrumbs={[
                { title: config.entityNamePlural, path: config.basePath },
                { title: `${config.entityName} ${itemId}`, path: `${config.basePath}/${itemId}` },
                { title: 'Editar' },
            ]}
        >
            <Box sx={{ display: 'flex', flex: 1 }}>{renderEdit}</Box>
        </PageContainer>
    );
}