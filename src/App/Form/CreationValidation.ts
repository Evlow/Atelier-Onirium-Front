import * as Yup from "yup";

// Définir un schéma de validation Yup
export const validationSchema = Yup.object({
  name: Yup.string()
    .required("Le nom est requis"), // Le nom est requis
  description: Yup.string()
    .required("La description est requise"), // Description obligatoire
  file: Yup.mixed()
    .required("Un fichier est requis") // Fichier requis
    });
