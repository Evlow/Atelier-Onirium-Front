import VisibilityIcon from '@mui/icons-material/Visibility';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, Typography } from '@mui/material';

export default function NavBarAdmin() {
    const appBarItems = [
        { icon: VisibilityIcon, path: "/accueil" },
        { icon: LogoutIcon, path: "/deconnexion" }
    ];

    return (
        <Box 
            sx={{ 
                display: "flex", 
                alignItems: "center", 
                backgroundColor: '#e7e2e1', 
                height: "100px", 
                paddingX: 2 
            }}
        >
            <Typography variant='h2' fontFamily={"Love"}>
                L'Atelier d'Onirium
            </Typography>
            <Box 
                sx={{ 
                    display: "flex", 
                    justifyContent: "center", 
                    flexGrow:"1"
                }}
            >
                {appBarItems.map((item, index) => (
                    <Box key={index} marginLeft={3}>
                        <a href={item.path}>
                            <item.icon />
                        </a>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
