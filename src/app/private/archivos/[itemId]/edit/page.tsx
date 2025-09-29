'use client'

import GenericForm from '@/components/private/GenericForm/GenericForm'
import { archivoConfig } from '@/lib/config/entityConfigs'

type Props = {
    params: {
        itemId: string
    }
}

export default function EditArchivoPage({ params }: Props) {
    return <GenericForm config={archivoConfig} mode="edit" itemId={params.itemId} />
}