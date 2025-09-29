'use client'

import PrivateLayout from '@/components/private/PrivateLayout/PrivateLayout'
import GenericList from '@/components/private/GenericList/GenericList'
import { areaConfig } from '@/lib/config/entityConfigs'

interface AreasPageProps {
    disableCustomTheme?: boolean;
}

export default function AreasPage(props: AreasPageProps) {
    return (
        <PrivateLayout disableCustomTheme={props.disableCustomTheme}>
            <GenericList config={areaConfig} />
        </PrivateLayout>
    );
}
