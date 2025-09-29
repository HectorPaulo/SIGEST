'use client'

import PrivateLayout from '@/components/private/PrivateLayout/PrivateLayout'
import GenericForm from '@/components/private/GenericForm/GenericForm'
import type { EntityConfig } from '@/types/generic'

interface FormPageProps<T> {
    config: EntityConfig<T>
    mode: 'create' | 'edit' | 'show'
    itemId?: string
    disableCustomTheme?: boolean
}

export default function FormPageLayout<T>({
    config,
    mode,
    itemId,
    disableCustomTheme
}: FormPageProps<T>) {
    return (
        <PrivateLayout disableCustomTheme={disableCustomTheme}>
            <GenericForm config={config} mode={mode} itemId={itemId} />
        </PrivateLayout>
    );
}