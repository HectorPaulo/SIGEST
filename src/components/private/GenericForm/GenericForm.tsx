import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent, SelectProps } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';
import dayjs, { Dayjs } from 'dayjs';
import type { BaseEntity, FormFieldConfig, EntityInsert } from '@/types/generic';

export interface GenericFormState<T extends BaseEntity> {
    values: Partial<EntityInsert<T>>;
    errors: Partial<Record<string, string>>;
}

export type FormFieldValue = string | string[] | number | boolean | File | null;

export interface GenericFormProps<T extends BaseEntity> {
    formState: GenericFormState<T>;
    formFields: FormFieldConfig[];
    onFieldChange: (name: string, value: FormFieldValue) => void;
    onSubmit: (formValues: Partial<EntityInsert<T>>) => Promise<void>;
    onReset?: (formValues: Partial<EntityInsert<T>>) => void;
    submitButtonLabel: string;
    backButtonPath?: string;
}

export default function GenericForm<T extends BaseEntity>(props: GenericFormProps<T>) {
    const {
        formState,
        formFields,
        onFieldChange,
        onSubmit,
        onReset,
        submitButtonLabel,
        backButtonPath,
    } = props;

    const formValues = formState.values;
    const formErrors = formState.errors;

    const router = useRouter();

    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleSubmit = React.useCallback(
        async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            setIsSubmitting(true);
            try {
                await onSubmit(formValues);
            } finally {
                setIsSubmitting(false);
            }
        },
        [formValues, onSubmit],
    );

    const handleTextFieldChange = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            onFieldChange(event.target.name, event.target.value);
        },
        [onFieldChange],
    );

    const handleNumberFieldChange = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            onFieldChange(event.target.name, Number(event.target.value));
        },
        [onFieldChange],
    );

    const handleCheckboxFieldChange = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
            onFieldChange(event.target.name, checked);
        },
        [onFieldChange],
    );

    const handleDateFieldChange = React.useCallback(
        (fieldName: string) => (value: Dayjs | null) => {
            if (value?.isValid()) {
                onFieldChange(fieldName, value.toISOString());
            } else if (formValues[fieldName as keyof EntityInsert<T>]) {
                onFieldChange(fieldName, null);
            }
        },
        [formValues, onFieldChange],
    );

    const handleSelectFieldChange = React.useCallback(
        (event: SelectChangeEvent) => {
            onFieldChange(event.target.name, event.target.value);
        },
        [onFieldChange],
    );

    const handleReset = React.useCallback(() => {
        if (onReset) {
            onReset(formValues);
        }
    }, [formValues, onReset]);

    const handleBack = React.useCallback(() => {
        router.push(backButtonPath ?? '/');
    }, [router, backButtonPath]);

    const renderField = React.useCallback((field: FormFieldConfig) => {
        const fieldValue = formValues[field.name as keyof EntityInsert<T>];
        const fieldError = formErrors[field.name];

        switch (field.type) {
            case 'text':
                return (
                    <TextField
                        value={fieldValue ?? ''}
                        onChange={handleTextFieldChange}
                        name={field.name}
                        label={field.label}
                        required={field.required}
                        error={!!fieldError}
                        helperText={fieldError ?? ' '}
                        fullWidth
                    />
                );

            case 'textarea':
                return (
                    <TextField
                        value={fieldValue ?? ''}
                        onChange={handleTextFieldChange}
                        name={field.name}
                        label={field.label}
                        required={field.required}
                        error={!!fieldError}
                        helperText={fieldError ?? ' '}
                        multiline
                        rows={1}
                        fullWidth
                    />
                );

            case 'number':
                return (
                    <TextField
                        type="number"
                        value={fieldValue ?? ''}
                        onChange={handleNumberFieldChange}
                        name={field.name}
                        label={field.label}
                        required={field.required}
                        error={!!fieldError}
                        helperText={fieldError ?? ' '}
                        fullWidth
                    />
                );

            case 'date':
                return (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            value={fieldValue ? dayjs(fieldValue as string) : null}
                            onChange={handleDateFieldChange(field.name)}
                            label={field.label}
                            slotProps={{
                                textField: {
                                    error: !!fieldError,
                                    helperText: fieldError ?? ' ',
                                    fullWidth: true,
                                    required: field.required,
                                },
                            }}
                        />
                    </LocalizationProvider>
                );

            case 'select':
                return (
                    <FormControl error={!!fieldError} fullWidth required={field.required}>
                        <InputLabel>{field.label}</InputLabel>
                        <Select
                            value={fieldValue ?? ''}
                            onChange={handleSelectFieldChange as SelectProps['onChange']}
                            name={field.name}
                            label={field.label}
                            defaultValue=""
                            fullWidth
                        >
                            {field.options?.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{fieldError ?? ' '}</FormHelperText>
                    </FormControl>
                );

            case 'checkbox':
                return (
                    <FormControl>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    size="large"
                                    checked={!!fieldValue}
                                    onChange={handleCheckboxFieldChange}
                                    name={field.name}
                                />
                            }
                            label={field.label}
                        />
                        <FormHelperText error={!!fieldError}>
                            {fieldError ?? ' '}
                        </FormHelperText>
                    </FormControl>
                );

            default:
                return null;
        }
    }, [formValues, formErrors, handleTextFieldChange, handleNumberFieldChange, handleCheckboxFieldChange, handleDateFieldChange, handleSelectFieldChange]);

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
            onReset={handleReset}
            sx={{ width: '100%' }}
        >
            <FormGroup>
                <Grid container spacing={2} sx={{ mb: 2, width: '100%' }}>
                    {formFields.map((field) => (
                        <Grid
                            key={field.name}
                            size={field.gridSize || { xs: 12 }}
                            sx={{ display: 'flex' }}
                        >
                            {renderField(field)}
                        </Grid>
                    ))}
                </Grid>
            </FormGroup>
            <Stack direction="row" spacing={2} justifyContent="space-between">
                <Button
                    variant="contained"
                    startIcon={<ArrowBackIcon />}
                    onClick={handleBack}
                >
                    Volver
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={isSubmitting}
                >
                    {submitButtonLabel}
                </Button>
            </Stack>
        </Box>
    );
}