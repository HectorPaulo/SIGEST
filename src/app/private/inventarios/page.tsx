'use client'

import PrivateLayout from '@/components/private/PrivateLayout/PrivateLayout'
import GenericList from '@/components/private/GenericList/GenericList'
import { inventarioConfig } from '@/lib/config/entityConfigs'

interface InventariosPageProps {
    disableCustomTheme?: boolean;
}

export default function InventariosPage(props: InventariosPageProps) {
    return (
        <PrivateLayout disableCustomTheme={props.disableCustomTheme}>
            <GenericList config={inventarioConfig} />
        </PrivateLayout>
    );
}
