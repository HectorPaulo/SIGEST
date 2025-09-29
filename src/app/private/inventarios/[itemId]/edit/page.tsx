'use client'

import GenericForm from '@/components/private/GenericForm/GenericForm'
import { inventarioConfig } from '@/lib/config/entityConfigs'

type Props = {
    params: {
        itemId: string
    }
}

export default function EditInventarioPage({ params }: Props) {
    return <GenericForm config={inventarioConfig} mode="edit" itemId={params.itemId} />
}