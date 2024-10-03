import { Creation } from "../../Models/Creations";

// Définition de l'interface Props
interface Props {
  // Instance de  (creation)
  creation: Creation;
}

const CardCreation: React.FC<Props> = ({ creation }) => {
  return (
    <div className="card-container">
      <div className="card-creations">
        <img
          src={creation.pictureUrl}
          alt={creation.name}
          className="creation-image"
        />
        <p>{creation.name}</p>
      </div>
    </div>
  );
};

export default CardCreation;
