import React from "react";
import "./footer.css";
import { NavLink } from "react-router-dom";

interface FooterLink {
  title: string;
  path: string;
}

const footerLinks: FooterLink[] = [
  { title: "Me contacter", path: "/me-contacter" },
  { title: "Politique de confidentialité", path: "politique-de-confidentialite" },
  { title: "CGU", path: "/cgu" },
  { title: "Livraison", path: "/delivery" },
];

export default function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-column">
          <h2 className="h2-footer">L'Atelier d'Onirium</h2>
          <ul className="social-network-footer">
            <li className="social-network-facebook">
              <a href="https://www.facebook.com/latelierdonirium">
                <img
                  src={process.env.PUBLIC_URL + "/Images/facebook.svg"}
                  alt="Facebook"
                />
              </a>
            </li>
            <li className="social-network-instagram">
              <a href="https://www.instagram.com/latelierdonirium?igsh=MWF3Z2dyNzR5N2l0Yw==">
                <img
                  src={process.env.PUBLIC_URL + "/Images/instagram.svg"}
                  alt="Instagram"
                />
              </a>
            </li>
            <li className="social-network-tiktok">
              <a href="https://www.tiktok.com/@latelierdonirium?_t=8pf3S8fZJab&_r=1">
                <img
                  src={process.env.PUBLIC_URL + "/Images/tiktok.svg"}
                  alt="TikTok"
                />
              </a>
            </li>
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
