import Footer from "../../Components/Footer/footer";
import NavBar from "../../Components/NavBar/navbar";
import "./privatePolicy.css";

export default function PrivatePolicy() {
  return (
    <div>
      <NavBar></NavBar>
      <h2 className="h2-private">Politique de confidentialité</h2>

      <section className="section-private">
        <h3 className="h3-private">QUI SUIS-JE ?</h3>
        <p>
          Marion DUIZABO responsable du site www.latelierdonirium.fr où cette
          politique de confidentialité s'applique.
        </p>

        <h3 className="h3-private">RESPECT DE LA VIE PRIVÉE</h3>
        <p>
          La présente politique de confidentialité a pour but de vous exposer
          dont la manière sont collectés et traités.
        </p>
        <p>
          Par « renseignements personnels », nous entendons toute information
          permettant de vous identifier, cela inclut, entre autres, votre
          prénom, nom, âge, adresse postale, adresse e-mail, votre localisation,
          ainsi que votre adresse IP.
          <br />« Renseignements personnels » est également utilisé comme
          synonyme de données personnelles au sens du Règlement européen
          2016/679.
        </p>
        <p>
          Vous trouverez dans « Règlement européen 2016/679 » des informations
          sur vos droits relatifs à ces données, l'identité du responsable du
          traitement des renseignements collectés, les destinataires éventuels
          de ces informations, ainsi que la politique du site en matière de
          cookies.
        </p>
        <p>
          Cette politique de confidentialité complète les Conditions Générales
          de Vente que vous pouvez consulter ici.
        </p>
        <h3 className="h3-private">COLLECTE DES RENSEIGNEMENTS PERSONNELS</h3>
        <p>
          Les renseignements personnels suivants seront collectés :
          <ul>
            <li>Nom</li>
            <li>Prénom</li>
            <li>Adresse postale</li>
            <li>Code postal</li>
            <li>Adresse électronique</li>
            <li>Numéro de téléphone</li>
            <li>Numéro de carte de crédit</li>
            <li>Genre</li>
          </ul>
        </p>
        <p>
          Les renseignements personnels recueillis sont obtenus par
          les méthodes décrites dans les sections « Formulaires et modes de
          collecte » et les suivantes.
        </p>
        <h3 className="h3-private">FORMULAIRES ET MODE DE COLLECTE</h3>
<p>Vos renseignements personnels sont collectés par les méthodes suivantes : </p>
<ul><li>Formulaire d'inscription au site internet</li>
<li>Formulaire de commande</li>
<li>Formulaire de contact</li>
<li>Suivis de commande</li>
<li>Gestion du site internet</li>
<li>Informations et offres promotionnelles</li>
<li>Statistiques</li>
</ul>
<h3 className="h3-private">PARTAGE DES RENSEIGNEMENTS PERSONNELS</h3>
 <p>Les renseignements personnels collectés par le site ne sont transmis à aucun tiers et ne sont traités que par l'atelier d'Onirium</p>
 <h3 className="h3-private">HÉBERGEMENT DU SITE INTERNET</h3>
    <p>Le site  www.latelierdonirium.fr est hébergé par 1 & 1 IONOS, dont le siège est situé à l'adresse ci-dessous :
7 Place de la Gare 
<br />
5720 SARREGUEMINES
</p>
      
      </section>
      <Footer></Footer>
    </div>
  );
}
