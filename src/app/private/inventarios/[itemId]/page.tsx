'use client'

import GenericForm from '@/components/private/GenericForm/GenericForm'
import { inventarioConfig } from '@/lib/config/entityConfigs'

type Props = {
    params: {
        itemId: string
    }
}

export default function ShowInventarioPage({ params }: Props) {
    return <GenericForm config={inventarioConfig} mode="show" itemId={params.itemId} />
}