import React from "react";
import "./footer.css";
import { NavLink } from "react-router-dom";

interface FooterLink {
  title: string;
  path: string;
}

const footerLinks = [
  { title: "Me contacter", path: "/me-contacter" },
  { title: "Politique de confidentialité", path: "/politique-de-confidentialite" },
  { title: "CGV", path: "/CGV" },
  { title: "Livraison", path: "/delivery" },
];

const socialLinks = [
  {
    name: "facebook",
    url: "https://www.facebook.com/latelierdonirium",
    icon: process.env.PUBLIC_URL + "/Images/facebook.svg",
  },
  {
    name: "instagram",
    url: "https://www.instagram.com/latelierdonirium?igsh=MWF3Z2dyNzR5N2l0Yw==",
    icon: process.env.PUBLIC_URL + "/Images/instagram.svg",
  },
  {
    name: "tikTok",
    url: "https://www.tiktok.com/@latelierdonirium?_t=8pf3S8fZJab&_r=1",
    icon: process.env.PUBLIC_URL + "/Images/tiktok.svg",
  },
];

export default function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-column">
          <h2 className="h2-footer">L'Atelier d'Onirium</h2>
          <ul className="social-network-footer">
            {socialLinks.map((link) => (
              <li key={link.name} className={`social-network-${link.name}`}>
                <a href={link.url}>
                  <img src={link.icon} alt={link.name} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-column">
          <ul>
            {footerLinks.map((item) => (
              <li key={item.path}>
                <NavLink to={item.path}>{item.title}</NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
