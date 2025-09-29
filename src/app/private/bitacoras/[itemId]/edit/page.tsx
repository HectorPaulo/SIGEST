'use client'

import GenericForm from '@/components/private/GenericForm/GenericForm'
import { bitacoraConfig } from '@/lib/config/entityConfigs'

type Props = {
    params: {
        itemId: string
    }
}

export default function EditBitacoraPage({ params }: Props) {
    return <GenericForm config={bitacoraConfig} mode="edit" itemId={params.itemId} />
}