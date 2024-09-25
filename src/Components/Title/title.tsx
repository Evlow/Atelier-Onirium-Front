import { NavLink } from "react-router-dom";
import "./title.css";
const icon = [
  {
    title: " Mon panier",
    path: "",
    icon: process.env.PUBLIC_URL + "/Images/panier.webp",
  },
  {
    title: "Mon profil",
    path: "",
    icon: process.env.PUBLIC_URL + "/Images/profil.webp",
  },
];

export default function Title() {
  return (
    <>
      <div className="title">
        <div>
          <h1>L'Atelier d'Onirium</h1>
        </div>
        <ul className="icon-compte">
          {icon.map((item) => (
            <li key={item.path}>
              <NavLink to={item.path}>
                {item.icon && (
                  <img src={item.icon} alt={item.title} className="icon" />
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <hr></hr>

    </>
    
  );
}
