import NavBar from "../../Components/NavBar/navbar";
import Footer from "../../Components/Footer/footer";
import { useState } from "react";
import ContactInputForm from "../../Components/Formulaires/contactInputForm";
import emailjs from "emailjs-com"; 

export default function Contact() {
  const [userEmail, setEmail] = useState("");
  const [userFirstName, setFirstName] = useState("");
  const [userLastName, setLastName] = useState("");
  const [userMessage, setMessage] = useState("");

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
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
        setMessage("");
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  const changeFirstName = (value: string) => {
    setFirstName(value);
  };

  const changeLastName = (value: string) => {
    setLastName(value);
  };

  const changeEmail = (value: string) => {
    setEmail(value);
  };

  const changeMessage = (value: string) => {
    setMessage(value);
  };

  return (
    <div>
      <NavBar />
      <form onSubmit={submitForm}>
        <div className="contact-form-container">
          <div className="contact-form-input">
            <ContactInputForm
              type="text"
              value={userFirstName}
              label="*Prénom"
              onChange={changeFirstName}
            />
            <ContactInputForm
              type="text"
              value={userLastName}
              label="Nom"
              onChange={changeLastName}
            />
          </div>
          <div className="contact-form-input">
            <ContactInputForm
              type="email"
              value={userEmail}
              label="*Email"
              onChange={changeEmail}
            />
          </div>
          <div className="contact-form-input-message">
            <ContactInputForm
              type="area"
              value={userMessage}
              label="*Message"
              onChange={changeMessage}
            />
          </div>
        </div>
        <button name="button" className="contact-button-form" type="submit">
          Envoyer
        </button>
      </form>
      <Footer />
    </div>
  );
}
