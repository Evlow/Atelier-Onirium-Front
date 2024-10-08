import { Backdrop, Box, CircularProgress, Typography } from '@mui/material';

interface Props {
    message?: string;
}

export default function LoadingComponent({ message }: Props) {
    return (
        <Backdrop open={true} style={{ zIndex: 9999 }}>
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress size={100} sx={{ color: ' #640a02' }}/>
                {message && (
                    <Typography variant='h5' sx={{ justifyContent: 'center', position: 'fixed', top: "60%", marginLeft: '20px', color:"white", fontFamily:"alice"}}>
                        {message}
                    </Typography>
                )}
            </Box>
        </Backdrop>
    );
}
