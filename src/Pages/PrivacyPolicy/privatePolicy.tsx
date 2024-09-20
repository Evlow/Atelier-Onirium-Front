import Banners from "../../Components/Banners/banners";
import Footer from "../../Components/Footer/footer";
import NavBar from "../../Components/NavBar/navbar";
import imgBanners from "../../Assets/coffre.webp";

import "./privatePolicy.css";

export default function PrivatePolicy() {
  return (
    <div>
      <NavBar></NavBar>
      <Banners
        positionText="center"
        imgBanner={imgBanners}
        textBanner="Politique de confidentialité"
      />
      <section className="section-private">
        <h3 className="h3-private">Qui suis-je ?</h3>
        <p>
          Marion DUIZABO responsable du site www.latelierdonirium.fr où cette
          politique de confidentialité s'applique.
        </p>
        <h3 className="h3-private">Respect de la vie privée</h3>
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
        <h3 className="h3-private"> Collecte des renseignements personnels</h3>
        <p>
          Les renseignements personnels suivants seront collectés :
          <ul className="ul-private">
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
          Les renseignements personnels recueillis sont obtenus par les méthodes
          décrites dans les sections « Formulaires et modes de collecte » et les
          suivantes.
        </p>
        <h3 className="h3-private">
          Formulaires et mode de collecte des données
        </h3>
        <p>
          Vos renseignements personnels sont collectés par les méthodes
          suivantes :
        </p>
        <ul className="ul-private">
          <li>Formulaire d'inscription au site internet</li>
          <li>Formulaire de commande</li>
          <li>Formulaire de contact</li>
          <li>Suivis de commande</li>
          <li>Gestion du site internet</li>
          <li>Informations et offres promotionnelles</li>
          <li>Statistiques</li>
        </ul>
        <h3 className="h3-private">Partage des renseignements personnels</h3>
        <p>
          Les renseignements personnels collectés par le site ne sont transmis à
          aucun tiers et ne sont traités que par l'atelier d'Onirium
        </p>
        <h3 className="h3-private">Hébergement du site internet</h3>
        <p>
          Le site www.latelierdonirium.fr est hébergé par 1 & 1 IONOS, dont le
          siège est situé à l'adresse ci-dessous :
          <ul>
            <li>7 Place de la Gare </li>
            <li>5720 SARREGUEMINES</li>
          </ul>
        </p>
        <h3 className="h3-private">
          Responsables des traitements renseignements personnels
        </h3>
        <p>
          La responsable du traitement des renseignements personnels est :
          Marion DUIZABO. <br /> Elle peut être contactée de la manière suivante
          : contact@latelierdonirium.fr
        </p>
        <p>
          La responsable du traitement des renseignements personnels s'engage à
          protéger les renseignements personnels collectés, à ne pas les
          transmettre à des tiers sans que vous n'en ayez été informé.e et à
          respecter les finalités pour lesquelles ces renseignements ont été
          collectés.
        </p>
        <p>
          Dans le cas où l'intégrité, la confidentialité ou la sécurité de vos
          renseignements personnels est compromise, la responsable du traitement
          s'engage à vous en informer par tout moyen.
        </p>
        <h3 className="h3-private">Droit d'opposition et de retrait</h3>
        <p>
          Vous avez le droit de vous opposer au traitement de vos renseignements
          personnels par le site (droit d'opposition). <br />
          Vous avez également le droit de demande à ce que vos renseignements
          personnels ne figurent plus, par exemple, dans une liste de diffusion
          (droit de retrait).
        </p>
        <p>
          L'utilisateur doit faire une demande par mail via
          contact@latelierdonirium.fr
        </p>
        <h3 className="h3-private">
          Droit d'accès, de rectification et de suppression
        </h3>
        <p>
          Vous pouvez consulter, mettre à jour, modifier ou demander la
          suppression de vos renseignements personnels en envoyant un email à
          contact@latelierdonirium.fr <br />
          Si vous souhaitez supprimer votre espace personnel, vous pouvez le
          faire en envoyant une demande par email à contact@latelierdonirium.fr
        </p>
        <h3 className="h3-private">
          Principes fondamentaux du Règlement Européen 2016/679 sur la
          Protection des Données
        </h3>
        <p>
          Conformément aux dispositions de l'article 5 du Règlement Européen
          (UE) 2016/679, la collecte et le traitement de vos renseignements
          personnels respectent les principes suivants :
        </p>
        <p>
          L'entreprise s'engage à respecter les dispositions législatives
          mentionnées ci-dessus ainsi que le Règlement Général sur la Protection
          des Données (RGPD), Règlement (UE) 2016/679 du Parlement européen et
          du Conseil du 27 avril 2016, relatif à la protection des personnes
          physiques à l’égard du traitement des données à caractère personnel et
          à la libre circulation de ces données, et abrogeant la directive
          95/46/CE.
        </p>
        <ul className="ul-private">
          <li>
            <strong>Licéité, loyauté et transparence :</strong> Vos
            renseignements personnels sont collectés et traités uniquement avec
            votre consentement. Chaque collecte est clairement indiquée, en
            expliquant pourquoi vos données sont recueillies.
          </li>
          <li>
            <strong>Finalités limitées :</strong>Les renseignements personnels
            sont collectés et traités pour des objectifs spécifiques, tels que
            décrits dans cette politique de confidentialité.
          </li>
          <li>
            <strong> Minimisation :</strong>Seules les données nécessaires pour
            atteindre les objectifs sont collectées.
          </li>
          <li>
            <strong>Conservation limitée :</strong>Les données sont conservées
            pour une durée limitée, dont vous êtes informé.
          </li>
          <li>
            <strong>Intégrité et confidentialité : </strong>Nous nous engageons
            à garantir l'intégrité et la confidentialité de vos renseignements
            personnels.
          </li>
        </ul>
        <p>
          Conformément à l'article 6 du Règlement Européen (UE) 2016/679, la
          collecte et le traitement des renseignements personnels sont légaux
          uniquement si l'une des conditions suivantes est remplie :
        </p>
        <ul className="ul-private">
          <li>Vous avez donné votre consentement.</li>
          <li>Le traitement est nécessaire pour l'exécution d'un contrat.</li>
          <li>Le traitement est requis par la loi.</li>
          <li>
            Le traitement est nécessaire pour protéger vos intérêts vitaux ou
            ceux d'une autre personne.
          </li>
          <li>
            Le traitement est nécessaire pour l'exécution d'une mission
            d'intérêt public ou relevant de l'exercice de l'autorité publique.
          </li>
          <li>
            Le traitement est nécessaire aux intérêts légitimes poursuivis par
            nous ou un tiers.
          </li>
        </ul>
        <p>
          Droits supplémentaires en vertu du Règlement Européen (UE) 2016/679
        </p>
        <ul className="ul-private">
          <li>
            <strong>Droit à la portabilité :</strong> Vous pouvez demander la
            portabilité de vos données vers un autre site.
            <br /> Faites la demande par mail à l'adresse suivante :
            contact@latelierdonirium.fr
          </li>
          <li>
            <strong>
              Droit de ne pas faire l'objet d'une décision automatisée :
            </strong>
            Vous avez le droit de ne pas être soumis à une décision basée
            exclusivement sur un traitement automatisé qui a des effets
            juridiques ou significatifs sur vous.
          </li>
          <li>
            <strong>Droit de saisir l'autorité compétente :</strong> Si vous
            êtes insatisfait de la réponse à votre demande ou si vous pensez que
            vos droits ont été violés, vous pouvez saisir l'autorité compétente.
          </li>
        </ul>
        <h3 className="h3-private">
          Droits additionnels en vertu du réglement européen 2016/679
        </h3>
        <p>
          Conformément à la réglementation européenne concernant le traitement
          des renseignements personnels vous possédez également les droits
          ci-après énumérés.
        </p>
        <p>
          Afin que la responsable du traitement des renseignements fasse droit à
          votre demande, vous êtes tenus de lui communiquer vos prénom et nom
          ainsi que votre adresse email, et si cela est pertinent, votre numéro
          de compte ou d'espace personnel ou d'abonné.
        </p>
        <p>
          Le responsable du traitement des renseignements personnels est tenu de
          vous répondre dans un délai de trente jours maximum.
        </p>
        <p>
          Vous avez le droit de demander la portabilité de vos renseignements
          personnels, détenus par le site, vers en autre site, en envoyant une
          demande par mail via contact@latelierdonirium.fr
        </p>
        <p>
          Conformément aux dispositions du règlement européen 2019/679, vous
          avez le droit de ne pas faire l'objet d'une décision fondée
          exclusivement sur un procédé automatisé si la décision produit des
          effets juridiques vous concernant ou affecte de manière significative
          de façon similaire.
        </p>
        <p>
          Dans le cas où le responsable du traitement des renseignements
          personnels décide de ne pas répondre à votre demande et que vous
          souhaitez contester cette décision ou, si vous pensez qu'il est porté
          atteinte à l'un de vos droits énumérés ci-dessus, vous êtes en droit
          de saisir toute cour compétente
        </p>
        <h3 className="h3-private">Sécurité</h3>
        <p>
          Les informations personnelles qui sont collectés sont conservées dans
          un environnement sécurisé.
          <br />
          Pour assurer la sécurité de vos informations personnelles, nous avons
          recours aux mesures suivantes :
        </p>
        <ul className="ul-private">
          <li>Protocole SSL (Secure Sockets Layer)</li>
          <li>Sauvegarde automatique</li>
          <li>Identifiant / mot de passe</li>
        </ul>
        <p>
          Nous nous engageons à maintenir un haut degré de confidentialité en
          intégrant les dernières innovations technologiques permettant
          d'assurer la confidentialité de vos transactions. <br />
          Toutefois, comme aucun mécanisme n'offre une sécurité maximale, une
          part de risque est toujours présente lorsqu'on utilise internet pour
          transmettre des informations personnelles.
        </p>
        <h3 className="h3-private">
          Renseignements personnels des mineurs en vertu du réglement 2016/679{" "}
        </h3>
        <p>
          Conformément aux dispositions de l'article 8 du règlement 2016/679,
          seuls les mineurs âgés de 15 ans ou plus peuvent consentir au
          traitement de leurs renseignements personnels.
        </p>
        <p>
          Si vous êtes un mineur de moins de 15 ans, l'accord d'un représentant
          légal sera requis afin que des renseignements personnels puissent être
          collectés et traités.
        </p>
        <p>
          L'entreprise se réserve le droit de vérifier par tout moyen que vous
          êtes agé de plus de 15 ans, ou que vous avez obtenu l'accord d'un
          représentant légal avant de naviguer sur le site.
        </p>
        <h3 className="h3-private">
          Conditions de modification de la politique de confidentialité
        </h3>
        <p>
          La présente politique de confidentialité peut être consultée à tout
          moment à l'adresse ci-après indiquée :
          https://latelierdonirium.fr/politique-de-confidentialite
        </p>
        <p>
          L'entreprise se réserve le droit de la modifier afin de garantir sa
          conformité avec le droit en vigueur. Par conséquent, vous êtes invité
          (e) à venir consulter régulièrement cette politique de confidentialité
          afin de vous tenir informé (e) des derniers changements qui lui seront
          apportés.
        </p>
        <h3 className="h3-private">Législation</h3>
        <p>
          L'entreprise s'engage à respecter les dispositions législatives
          énonces ci-dessus et le Réglement Général sur la protection des
          données, Règlement (UE) 2016/679 du Parlement européen et du Conseil
          du 27 Avril 2016 relatif à la protection des personnes physiques à
          l'égard du traitement des données à caractère personnel et à la libre
          circulation de ces données et abrogeant la directive 95/46ECE
          (règlement général sur la protection des données) 2016/279
        </p>
      </section>
      <Footer></Footer>
    </div>
  );
}
