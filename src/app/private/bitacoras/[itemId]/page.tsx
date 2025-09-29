'use client'

import GenericForm from '@/components/private/GenericForm/GenericForm'
import { bitacoraConfig } from '@/lib/config/entityConfigs'

type Props = {
    params: {
        itemId: string
    }
}

export default function ShowBitacoraPage({ params }: Props) {
    return <GenericForm config={bitacoraConfig} mode="show" itemId={params.itemId} />
}