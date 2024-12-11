import { Typography, Grid, Paper, Box, Button } from "@mui/material";
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Creation } from "../../Models/Creations";
import { useAppDispatch } from "../Store/configureStore";
import agent from "../Api/agent";
import { LoadingButton } from "@mui/lab";
import { setCreation } from "../../Components/Creations/creationSlice";
import InputForm from "./InputForm";
import DropZoneInput from "./DropZoneForm";
import useCreations from "../Hook/useCreation";

interface Props {
  creation?: Creation;
  cancelEdit: () => void;
}

export default function CreationForm({ creation, cancelEdit }: Props) {
  const { control, reset, handleSubmit, watch, formState: {isDirty, isSubmitting} } = useForm({
      mode: 'all',
      // resolver: yupResolver<any>(validationSchema)
  });
  const watchFile = watch('file', null);
  const dispatch = useAppDispatch();

  useEffect(() => {
      if (creation && !watchFile  && !isDirty) reset(creation);
      return () => {
          if (watchFile) URL.revokeObjectURL(watchFile.preview);
      }
  }, [creation, reset, watchFile, isDirty]);

  async function handleSubmitData(data: FieldValues) {
      try {
          let response: Creation;
          if (creation) {
              response = await agent.Admin.updateCreation(data);
          } else {
              response = await agent.Admin.createCreation(data);
          }
          dispatch(setCreation(response));
          cancelEdit();
      } catch (error) {
          console.log(error)
      }
  }

  return (
    <Box component={Paper} sx={{ p: 4 }}>
      {/* Titre principal */}
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Ajouter une création
      </Typography>

      {/* Début du formulaire */}
      <form onSubmit={handleSubmit(handleSubmitData)}>
        <Grid container spacing={3}>
          {/* Champ pour le nom de la création */}
          <Grid item xs={12} sm={12}>
            <InputForm control={control} name="name" label="Nom de la création" />
          </Grid>

          {/* Champ pour la description */}
          <Grid item xs={12}>
            <InputForm multiline={true} rows={4} control={control} name="description" label="Description" />
          </Grid>

          {/* Zone de dépôt pour l'image */}
          <Grid item xs={12}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <DropZoneInput control={control} name="file" /> 
              {/* Affichage de la prévisualisation de l'image si un fichier est sélectionné */}
              {watchFile ? (
                <img src={watchFile.preview} alt="Prévisualisation" style={{ maxHeight: 200 }} />
              ) : (
                <span>Pas d'image choisie</span> // Message par défaut si aucune image n'est sélectionnée
              )}
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
          <LoadingButton loading={isSubmitting} type="submit" variant="contained" color="success">
            Ajouter la création
          </LoadingButton>
        </Box>
      </form>
    </Box>
  );
}
