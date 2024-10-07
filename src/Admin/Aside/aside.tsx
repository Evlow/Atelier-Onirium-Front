import { Box } from "@mui/material";

export default function Aside() {
  const asideItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
    },
    {
      title: "Créations",
      path: "/creations",
    },
    {
      title: "Corbeille",
      path: "/corbeille",
    },
  ];

  return (
    <Box component="aside" sx={{ width: '250px', padding: '16px', backgroundColor: 'lightgray', position: 'fixed', left: 0, height: '100vh' }}>
      {asideItems.map((item) => (
        <Box key={item.title} sx={{ marginBottom: '8px' }}>
          <a href={item.path} style={{ textDecoration: 'none', color: 'black' }}>
            {item.title}
          </a>
        </Box>
      ))}
    </Box>
  );
}
