'use client'

import GenericForm from '@/components/private/GenericForm/GenericForm'
import { valeConfig } from '@/lib/config/entityConfigs'

type Props = {
    params: {
        itemId: string
    }
}

export default function EditValePage({ params }: Props) {
    return <GenericForm config={valeConfig} mode="edit" itemId={params.itemId} />
}