'use client'

import GenericForm from '@/components/private/GenericForm/GenericForm'
import { userConfig } from '@/lib/config/entityConfigs'

type Props = {
    params: {
        itemId: string
    }
}

export default function ShowUsuarioPage({ params }: Props) {
    return <GenericForm config={userConfig} mode="show" itemId={params.itemId} />
}