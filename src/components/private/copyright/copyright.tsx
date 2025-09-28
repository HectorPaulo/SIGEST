/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export default function Copyright(props: any) {
    return (
        <Typography
            variant="body2"
            align="center"
            {...props}
            sx={[
                {
                    color: 'text.secondary',
                },
                ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
            ]}
        >
            {'Todos los derechos resevados © '}
            <Link color="inherit" href="https://mui.com/">
                Upn 201
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
