import React from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function NavBarAdmin() {
    const navigate = useNavigate();

    const handleLogout = () => {
        delete localStorage["accessToken"];
        localStorage.clear();
        navigate("/connexion");
    };

    const appBarItems = [
        { icon: VisibilityIcon, path: "/accueil" },
        { icon: LogoutIcon, path: "/deconnexion", onClick: handleLogout }
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
            <Typography variant='h1' fontSize="4rem" color="black" textAlign="center"
>                L'Atelier d'Onirium
            </Typography>
            <Box 
                sx={{ 
                    display: "flex", 
                    justifyContent: "right", 
                    padding:"10px",
                    flexGrow: 1,
                }}
            >
                {appBarItems.map((item, index) => (
                    <Box key={index} marginLeft={4}>
                        <a 
                            href={item.path} 
                            onClick={item.onClick ? (e) => { e.preventDefault(); item.onClick(); } : undefined}
                        >
                            <item.icon />
                        </a>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
