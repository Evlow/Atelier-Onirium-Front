import Footer from "../../Components/Footer/footer";
import NavBar from "../../Components/NavBar/navbar";
import "./privatePolicy.css";

export default function PrivatePolicy() {
  return (
    <div>
      <NavBar></NavBar>
      <h2 className="h2-private">Contactez-moi</h2>

      <section className="section-private">
        <h3 className="h3-private">QUI SUIS-JE ?</h3>
        <p>
          Marion DUIZABO responsable du site www.latelierdonirium.fr où cette
          politique de confidentialité s'applique.
        </p>

        <h3 className="h3-private">RESPECT DE LA VIE PRIVÉE</h3>
        <p>
          La présente politique de confidentialité a pour but de vous exposer dont la manière sont collectés et traités vos renseignements
          personnels, doivent être considérés comme renseignements personnels
          tous les renseignements susceptibles de vous identifier. Il s'agit
          notamment de votre prénom et nom, de votre âge, de votre adresse
          postale, de votre adresse courriel de votre localisation en encore de
          votre adresse IP. « Renseignements personnels » est également utilisé
          comme synonyme de données personnelles au sens du Règlement européen
          2016/679 ; Quels sont vos droits concernant ces renseignements ; Qui
          est responsable du traitement des renseignements personnels collectés
          et traités ; A qui ces renseignements sont transmis ; Eventuellement,
          la politique du site en matière de fichiers témoins (« cookies »).
          Cette politique de confidentialité complète les Conditions Générales
          de Vente que vous pouvez consulter ICI
        </p>
      </section>
      <Footer></Footer>
    </div>
  );
}
