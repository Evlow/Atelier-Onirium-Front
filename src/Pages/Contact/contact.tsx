import React, { useState } from "react";
import NavBar from "../../Components/NavBar/navbar";
import Footer from "../../Components/Footer/footer";
import { TextField, Button, Typography, Grid, Container, Box } from "@mui/material";
import emailjs from "emailjs-com";
import contactImage from "../../Assets/contact.jpg";

export default function Contact() {
  const [userEmail, setEmail] = useState("");
  const [userFirstName, setFirstName] = useState("");
  const [userLastName, setLastName] = useState("");
  const [userMessage, setMessage] = useState("");
  const [userPhone, setPhone] = useState("");

  const submitForm = (e: any) => {
    e.preventDefault();
    alert("😀 Merci pour votre message, il sera traité au plus vite 😀");

    const templateId = "template_oltfym4";
    const serviceId = "service_vz72zyt";
    const publicKey = "_nibA5A1dNcgUaToq";

    const templateParams = {
      from_userFirstName: userFirstName,
      from_userLastName: userLastName,
      from_email: userEmail,
      to_name: "L'Atelier d'Onirium",
      message: userMessage,
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log("Email sent successfully", response);
        setFirstName("");
        setEmail("");
        setPhone("");
        setMessage("");
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  return (
    <div>
      <NavBar />
      <Container maxWidth="md">
        <Typography variant="h2" align="center" gutterBottom>
          Contact
        </Typography>

        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <img
              src={contactImage}
              alt="Contact"
              style={{ width: "100%", borderRadius: "8px" }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="body1" paragraph>
              Besoin d'un devis pour votre projet ? Des informations
              complémentaires ? Rien de plus simple, remplissez ce formulaire :
            </Typography>

            <form onSubmit={submitForm}>
              <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                  label="Prénom"
                  value={userFirstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  fullWidth
                  required
                />
                <TextField
                  label="Nom"
                  value={userLastName}
                  onChange={(e) => setLastName(e.target.value)}
                  fullWidth
                  required
                />
                <TextField
                  label="Téléphone"
                  value={userPhone}
                  onChange={(e) => setPhone(e.target.value)}
                  fullWidth
                  required
                />
                <TextField
                  label="E-mail"
                  type="email"
                  value={userEmail}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  required
                />
                <TextField
                  label="Message"
                  value={userMessage}
                  onChange={(e) => setMessage(e.target.value)}
                  multiline
                  rows={4}
                  fullWidth
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Envoyer
                </Button>
              </Box>
            </form>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
}
