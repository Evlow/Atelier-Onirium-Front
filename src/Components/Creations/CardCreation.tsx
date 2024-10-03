import { Creation } from "../../Models/Creations";


// Définition de l'interface Props
interface Props {
 // Instance de la recette (Recipe)
  creation: Creation; 
}

const CardCreation: React.FC<Props> = ({ creation }) => {
  return (
    <a href={`/creation/${creation.Id}`} className='card-container'> 
        <div className="card-recipes"> 
          <img
            // src={creation.pictureUrl} 
            alt={creation.Name} 
            className="recipe-image" 
          />
          <p>{creation.Description}</p>
        </div>
      </a>
  );
};

export default CardCreation;