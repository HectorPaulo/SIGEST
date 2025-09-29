'use client'

import PrivateLayout from '@/components/private/PrivateLayout/PrivateLayout'
import GenericList from '@/components/private/GenericList/GenericList'
import { userConfig } from '@/lib/config/entityConfigs'

interface UsuariosPageProps {
    disableCustomTheme?: boolean;
}

export default function UsuariosPage(props: UsuariosPageProps) {
    return (
        <PrivateLayout disableCustomTheme={props.disableCustomTheme}>
            <GenericList config={userConfig} />
        </PrivateLayout>
    );
}
