import { Typography, Grid, Box, Button } from "@mui/material";
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
  const [editMode, setEditMode] = useState<boolean>(false);

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

  useEffect(() => {
    if (creation && !watchFile && !isDirty) {
      reset(creation);
      setEditMode(true);
    } else if (!creation) {
      setEditMode(false);
    }

    return () => {
      if (watchFile) {
        URL.revokeObjectURL(watchFile.preview);
      }
    };
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
      console.log(error);
    }
  }

  return (
    <>
      <NavBarAdmin />
      <Box
        component="section"
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          marginTop: "30px",
          marginBottom: "30px",
          backgroundColor: "black", // Couleur de fond optionnelle
        }}
      >
        <Box
          sx={{
            width: { xs: "90%", sm: "60%", md: "50%" }, // Largeur responsive
            padding: 4, // Espacement intérieur
            backgroundColor: "#e7e2e1",
            boxShadow: 3, // Ombre pour l'effet de carte
            borderRadius: 2, // Coins arrondis
          }}
        >
          <Typography
            variant="h4"
            textAlign="center"
            mb={4} // Espacement bas
            sx={{
              fontFamily: "Lovers",
              color: "black",
              fontSize: { xs: "3rem", md: "5rem" },
            }}
          >
            {editMode ? "Modifier la création" : "Ajouter une création"}
          </Typography>

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
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ gap: 2 }} // Espacement entre DropZone et l'image
                >
                  <DropZoneInput control={control} name="file" />
                  {watchFile ? (
                    <img
                      src={URL.createObjectURL(watchFile)}
                      alt="Prévisualisation"
                      style={{ maxWidth: 300 }}
                    />
                  ) : (
                    creation?.pictureUrl && (
                      <img
                        src={creation.pictureUrl}
                        alt={creation.name}
                        style={{ maxWidth: 300 }}
                      />
                    )
                  )}
                </Box>
              </Grid>
            </Grid>

            {/* Boutons pour soumettre ou annuler */}
            <Box display="flex" justifyContent="space-between" sx={{ mt: 4 }}>
              <Button
                onClick={cancelEdit}
                variant="outlined"
                sx={{
                  backgroundColor: "#e7e2e1",
                  borderColor: "#640a02",
                  color: "#640a02",
                  fontFamily: "Alice",
                }}
              >
                Annuler
              </Button>

              <LoadingButton
                loading={isSubmitting}
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#640a02",
                  borderColor: "#e7e2e1",
                  color: "#e7e2e1",
                  fontFamily: "Alice",
                }}
              >
                {editMode ? "Modifier la création" : "Ajouter la création"}
              </LoadingButton>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
}
