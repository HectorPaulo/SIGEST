import * as React from 'react';
import { useRouter } from 'next/navigation';
import useNotifications from '@/hooks/useNotifications/useNotifications';
import PageContainer from '@/components/private/PageContainer/PageContainer';
import GenericForm, { GenericFormState } from '@/components/private/GenericForm/GenericForm';
import type { BaseEntity, EntityConfig, EntityInsert } from '@/types/generic';

interface GenericCreateProps<T extends BaseEntity> {
    config: EntityConfig<T>;
}

export default function GenericCreate<T extends BaseEntity>({ config }: GenericCreateProps<T>) {
    const router = useRouter();
    const notifications = useNotifications();

    const [formState, setFormState] = React.useState<GenericFormState<T>>(() => ({
        values: config.defaultValues || {},
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
        setFormValues(config.defaultValues || {});
        setFormErrors({});
    }, [setFormValues, setFormErrors, config.defaultValues]);

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
            await config.dataService.createOne(formValues as EntityInsert<T>);
            notifications.show(`${config.entityName} creado exitosamente.`, {
                severity: 'success',
                autoHideDuration: 3000,
            });
            router.push(config.basePath);
        } catch (createError) {
            notifications.show(
                `Error al crear ${config.entityName.toLowerCase()}. Razón: ${(createError as Error).message}`,
                {
                    severity: 'error',
                    autoHideDuration: 3000,
                },
            );
            throw createError;
        }
    }, [formValues, router, notifications, setFormErrors, config]);

    return (
        <PageContainer
            title={`Crear ${config.entityName}`}
            breadcrumbs={[
                { title: config.entityNamePlural, path: config.basePath },
                { title: 'Nuevo' },
            ]}
        >
            <GenericForm
                formState={formState}
                formFields={config.formFields}
                onFieldChange={handleFormFieldChange}
                onSubmit={handleFormSubmit}
                onReset={handleFormReset}
                submitButtonLabel="Crear"
                backButtonPath={config.basePath}
            />
        </PageContainer>
    );
}