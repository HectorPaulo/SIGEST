'use client'

import PrivateLayout from '@/components/private/PrivateLayout/PrivateLayout'
import GenericList from '@/components/private/GenericList/GenericList'
import { rolConfig } from '@/lib/config/entityConfigs'

interface RolesPageProps {
    disableCustomTheme?: boolean;
}

export default function RolesPage(props: RolesPageProps) {
    return (
        <PrivateLayout disableCustomTheme={props.disableCustomTheme}>
            <GenericList config={rolConfig} />
        </PrivateLayout>
    );
}
