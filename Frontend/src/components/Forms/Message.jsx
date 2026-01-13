import { Box, Typography } from '@mui/material';

export default function Message({ messageText, messageColor }) {
    return (
        <Box
            sx={{
                display: 'flex',
                minHeight: '40px',
                width: '100%',
                color: 'white',
                flexDirection: 'column',
                marginBottom: '20px',
                padding: '10px',
                backgroundColor: messageColor,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '4px',
            }}
        >
            <Typography variant="body2">
                {messageText}
            </Typography>
        </Box>
    );
}
