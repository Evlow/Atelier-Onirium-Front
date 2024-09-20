import NavBar from "../../Components/NavBar/navbar";
import Footer from "../../Components/Footer/footer";
import { useState } from "react";
import ContactInputForm from "../../Components/Formulaires/contactInputForm";
import emailjs from "emailjs-com";
import "./contact.css";
import contactImage from "../../Assets/contact.jpg";

export default function Contact() {
  const [userEmail, setEmail] = useState("");
  const [userFirstName, setFirstName] = useState("");
  const [userLastName, setLastName] = useState("");
  const [userMessage, setMessage] = useState("");
  const [userPhone, setPhone] = useState("");

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
        setPhone("");
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
  const changePhone = (value: string) => {
    setPhone(value);
  };
  const changeMessage = (value: string) => {
    setMessage(value);
  };

  return (
    <div>
      <NavBar />
      <h2 className="h2-contact">Contact</h2>

      <article className="contact-image-form">
        <div className="contact-image">
          <img src={contactImage} alt="Photo de contact" />
        </div>
        <form onSubmit={submitForm}>
          <div className="contact-form-container">
            <article className="article-contact">
              <p>
                Besoin d'un devis pour votre projet ? <br></br>Des informations
                complémentaires ?<br></br> Rien de plus simple, remplissez ce
                formulaire :
              </p>
            </article>
            <div className="contact-form-row">
              <ContactInputForm
                type="text"
                value={userFirstName}
                onChange={changeFirstName}
                placeholder="Prénom"
              />
              <ContactInputForm
                type="text"
                value={userLastName}
                onChange={changeLastName}
                placeholder="Nom"
              />
            </div>
            <div className="contact-form-row">
              <ContactInputForm
                type="text"
                value={userPhone}
                onChange={changePhone}
                placeholder="Téléphone"
              />
              <ContactInputForm
                type="email"
                value={userEmail}
                onChange={changeEmail}
                placeholder="E-mail"
              />
            </div>
            <div className="contact-form-area">
              <ContactInputForm
                type="area"
                value={userMessage}
                onChange={changeMessage}
                placeholder="Message"
              />
            </div>
            <button className="contact-button-form" type="submit">
              Envoyer
            </button>
          </div>
        </form>
      </article>
      <Footer />
    </div>
  );
}
