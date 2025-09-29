'use client'

import PrivateLayout from '@/components/private/PrivateLayout/PrivateLayout'
import GenericList from '@/components/private/GenericList/GenericList'
import { funcionConfig } from '@/lib/config/entityConfigs'

interface FuncionesPageProps {
    disableCustomTheme?: boolean;
}

export default function FuncionesPage(props: FuncionesPageProps) {
    return (
        <PrivateLayout disableCustomTheme={props.disableCustomTheme}>
            <GenericList config={funcionConfig} />
        </PrivateLayout>
    );
}
