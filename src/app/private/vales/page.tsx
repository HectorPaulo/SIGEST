'use client'

import PrivateLayout from '@/components/private/PrivateLayout/PrivateLayout'
import GenericList from '@/components/private/GenericList/GenericList'
import { valeConfig } from '@/lib/config/entityConfigs'

interface ValesPageProps {
    disableCustomTheme?: boolean;
}

export default function ValesPage(props: ValesPageProps) {
    return (
        <PrivateLayout disableCustomTheme={props.disableCustomTheme}>
            <GenericList config={valeConfig} />
        </PrivateLayout>
    );
}
