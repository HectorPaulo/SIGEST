'use client'

import PrivateLayout from '@/components/private/PrivateLayout/PrivateLayout'
import GenericList from '@/components/private/GenericList/GenericList'
import { empleadoConfig } from '@/lib/config/entityConfigs'

interface EmpleadosPageProps {
    disableCustomTheme?: boolean;
}

export default function EmpleadosPage(props: EmpleadosPageProps) {
    return (
        <PrivateLayout disableCustomTheme={props.disableCustomTheme}>
            <GenericList config={empleadoConfig} />
        </PrivateLayout>
    );
}
