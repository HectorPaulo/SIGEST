'use client'

import GenericForm from '@/components/private/GenericForm/GenericForm'
import { archivoConfig } from '@/lib/config/entityConfigs'

type Props = {
    params: {
        itemId: string
    }
}

export default function ShowArchivoPage({ params }: Props) {
    return <GenericForm config={archivoConfig} mode="show" itemId={params.itemId} />
}