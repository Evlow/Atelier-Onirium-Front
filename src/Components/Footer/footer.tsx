import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <footer>
      <div className="footer-left">
        <div className="footer-atelier-onirium">
          <p>L'Atelier d'Onirium</p>
        </div>
        <ul className="social-network-footer">
        <li className="social-network-facebook"> <a href="#">  <img src={process.env.PUBLIC_URL + '/Images/facebook.svg'} height="30px" width="30px" /></a></li>
        <li className="social-network-instagram"> <a href="#">  <img src={process.env.PUBLIC_URL + '/Images/instagram.svg'} height="30px" width="30px" /></a></li>
        <li className="social-network-tiktok"> <a href="#">  <img src={process.env.PUBLIC_URL + '/Images/tiktok.svg'} height="30px" width="30px" /></a></li>

        </ul>
        </div>
    </footer>
  );
}
