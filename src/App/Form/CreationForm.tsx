import { Typography, Grid, Paper, Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Creation } from "../../Models/Creations";
import { useAppDispatch } from "../Store/configureStore";
import agent from "../Api/agent";
import { LoadingButton } from "@mui/lab";
import { setCreation } from "../../Components/Creations/creationSlice";
import InputForm from "./InputForm";
import DropZoneInput from "./DropZoneForm";
import NavBarAdmin from "../../Admin/NavBarAdmin/NavBarAdmin";
import { validationSchema } from "./CreationValidation";
import { yupResolver } from "@hookform/resolvers/yup";

interface Props {
  creation?: Creation;
  cancelEdit: () => void;
}

export default function CreationForm({ creation, cancelEdit }: Props) {
  const [editMode, setEditMode] = useState<boolean>(false); // Initialiser editMode à false

  const {
    control,
    reset,
    handleSubmit,
    watch,
    formState: { isDirty, isSubmitting },
  } = useForm({
    mode: "all",
    resolver: yupResolver<any>(validationSchema),
  });

  const watchFile = watch("file", null);
  const dispatch = useAppDispatch();

  // Utilisation de useEffect pour réinitialiser le formulaire lorsque la création change
  useEffect(() => {
    if (creation && !watchFile && !isDirty) {
      reset(creation); // Remplir le formulaire avec les données de la création
      setEditMode(true); // Passer en mode édition si une création est présente
    } else if (!creation) {
      setEditMode(false); // Passer en mode création si aucune création n'est présente
    }

    return () => {
      if (watchFile) URL.revokeObjectURL(watchFile.preview); // Nettoyage des objets URL après la fin du composant
    };
  }, [creation, reset, watchFile, isDirty]);

  // Fonction pour soumettre le formulaire
  async function handleSubmitData(data: FieldValues) {
    try {
      let response: Creation;
      if (creation) {
        response = await agent.Admin.updateCreation(data); // Mise à jour si création existe
      } else {
        response = await agent.Admin.createCreation(data); // Création si aucune création
      }
      dispatch(setCreation(response)); // Mettre à jour le store Redux avec la création
      cancelEdit(); // Annuler l'édition après soumission
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {" "}
      <NavBarAdmin></NavBarAdmin>
      <Box component={Paper} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          {editMode ? "Modifier la création" : "Ajouter une création"}
        </Typography>

        {/* Formulaire */}
        <form onSubmit={handleSubmit(handleSubmitData)}>
          <Grid container spacing={3}>
            {/* Champ pour le nom de la création */}
            <Grid item xs={12}>
              <InputForm
                control={control}
                name="name"
                label="Nom de la création"
              />
            </Grid>

            {/* Champ pour la description */}
            <Grid item xs={12}>
              <InputForm
                multiline={true}
                rows={4}
                control={control}
                name="description"
                label="Description"
              />
            </Grid>

            {/* Zone de dépôt pour l'image */}
            <Grid item xs={12}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <DropZoneInput control={control} name="file" />
                {watchFile ? (
                  <img
                    src={watchFile.preview}
                    alt="Prévisualisation"
                    style={{ maxHeight: 200 }}
                  />
                ) : (
                  <img
                    src={creation?.pictureUrl}
                    alt={creation?.name}
                    style={{ maxHeight: 200 }}
                  />
                )}{" "}
              </Box>
            </Grid>
          </Grid>

          {/* Boutons pour soumettre ou annuler */}
          <Box display="flex" justifyContent="space-between" sx={{ mt: 3 }}>
            {/* Bouton pour annuler (optionnel) */}
            <Button onClick={cancelEdit} variant="contained" color="inherit">
              Annuler
            </Button>

            {/* Bouton pour soumettre */}
            <LoadingButton
              loading={isSubmitting}
              type="submit"
              variant="contained"
              color="success"
            >
              {editMode ? "Modifier la création" : "Ajouter la création"}
            </LoadingButton>
          </Box>
        </form>
      </Box>
    </>
  );
}
