import { Box } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Aside() {
  const asideItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <DashboardIcon />,
    },
    {
      title: "Créations",
      path: "/creations",
      icon: <CreateIcon />,
    },
    {
      title: "Corbeille",
      path: "/corbeille",
      icon: <DeleteIcon />,
    },
  ];

  return (
    <Box component="aside" sx={{ width: '200px', padding: '8px', backgroundColor: '#e7e2e1', position: 'fixed', left: 0, height: '100vh' }}>
      {asideItems.map((item) => (
        <Box key={item.title} sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          marginBottom: '20px', 
          border: "2px solid #640a02", 
          borderRadius: "20px", 
          height: "85px", 
          padding: '10px' 
        }}>
          <a href={item.path} style={{ textDecoration: 'none', color: 'black', textAlign: 'center' }}>
            {item.title}
          </a>
          <a href={item.path} style={{ textDecoration: 'none', color: 'inherit' }}>
            {item.icon} 
          </a>
        </Box>
      ))}
    </Box>
  );
}
