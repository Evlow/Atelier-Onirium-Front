export interface Creation {
  id: number;
  name: string;
  category: number;
  description: string;
  
  // URL de l'image principale
  pictureUrl: string;  
  
  // Liste d'URLs des images supplémentaires
  pictureUrls: string[];  
  
  // PublicId de l'image principale (pour la suppression ou gestion dans Cloudinary)
  picturePublicId?: string;

  // Liste de PublicIds pour les images supplémentaires
  picturePublicIds?: string[];
  
  // Ces champs sont potentiellement utilisés pour la gestion des fichiers dans le formulaire
  mainImage?: File | null;
  additionalImages?: File[] | null;
}
