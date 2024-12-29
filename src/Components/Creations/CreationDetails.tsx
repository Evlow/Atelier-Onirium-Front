import { Link, useParams } from "react-router-dom";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import NavBar from "../NavBar/navbar";
import Footer from "../Footer/footer";
import { creationSelectors } from "../../App/Api/agent";
import NotFound from "../../App/Errors/notFound";
import { useAppDispatch, useAppSelector } from "../../App/Store/configureStore";
import { fetchCreationAsync } from "./creationSlice";

export default function CreationDetails() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const creation = useAppSelector((state) =>
    creationSelectors.selectById(state, +id!)
  );
  const [mainImage, setMainImage] = useState<string>("");

  useEffect(() => {
    dispatch(fetchCreationAsync(+id!));
  }, [dispatch, id]);

  useEffect(() => {
    if (creation?.pictureUrls?.length > 0) {
      setMainImage(creation.pictureUrls[0]); // Set the first image as the main image by default
    }
  }, [creation]);

  if (!creation) {
    return <NotFound />;
  }

  return (
    <>
      <NavBar />
      <Box
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // Change flex direction based on screen size
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        {/* Image Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column", // Show the main image above the others on small screens
            gap: 3,
            width: { xs: "100%", md: "600px" }, // Adjust width for different screen sizes
            marginBottom: { xs: 4, md: 0 }, // Add margin bottom for small screens to separate from text
          }}
        >
          {/* Main Image */}
          <Box
            component="img"
            src={mainImage}
            alt={creation.name}
            sx={{
              width: "100%",
              height: { xs: "300px", md: "600px" }, // Adjust image height for different screen sizes
              objectFit: "cover",
              borderRadius: 2,
            }}
          />

          {/* Additional Images (non-main images) */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              marginTop: 2,
              overflowX: "auto", // Allow horizontal scrolling on small screens for additional images
            }}
          >
            {creation.pictureUrls?.map((url, index) => (
              <Box
                key={index}
                component="img"
                src={url}
                alt={`Additional image ${index + 1}`}
                sx={{
                  width: { xs: "80px", sm: "100px", md: "200px" }, 
                  height: { xs: "80px", sm: "100px", md: "200px" }, 
                  objectFit: "cover",
                  borderRadius: 2,
                  cursor: "pointer", // Change cursor on hover to indicate clickability
                }}
                onClick={() => setMainImage(url)} // Change the main image on click
              />
            ))}
          </Box>
        </Box>

        {/* Text Section */}
        <Box
          sx={{
            flex: 1,
            paddingLeft: { xs: 0, md: 4 }, // Adjust padding for small screens
            textAlign: "justify",
          }}
        >
          <Typography
            variant="h2"
            fontSize={{ xs: "3rem", md: "6rem" }} // Adjust title font size for smaller screens
            gutterBottom
            sx={{ marginBottom: 2 }}
          >
            {creation.name}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              whiteSpace: "pre-wrap", // Handle line breaks in description
              lineHeight: 1.8,
              width: "95%",
            }}
          >
            {creation.description}
          </Typography>

          {/* Button Section (Centered below the description) */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "30px",
            }}
          >
            <Button
              component={Link}
              to="/me-contacter"
              sx={{
                width: { xs: "100%", sm: "20%" }, // Button size: 100% on mobile (xs), 20% on larger screens (sm, md)
                backgroundColor: "#E7E2E1",
                color: "black",
                fontFamily: "Alice",
                fontSize: "1.2rem",
                textTransform: "none",
                display: "flex",
                alignItems: "center",
                padding: { xs: "10px", sm: "5px" }, // Increase padding on mobile for a larger button
              }}
            >
              Me contacter{" "}
              <span style={{ color: "#640a02", marginLeft: "5px" }}>&gt;</span>
            </Button>
          </Box>
        </Box>
      </Box>

      <Footer />
    </>
  );
}
