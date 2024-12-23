import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Grid, Typography, Button, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import { Creation } from '../../Models/Creations';

interface CreationFormData {
  name: string;
  description: string;
  mainImage: File | null;
  additionalImages?: File[];
}

interface Props {
  creation?: Creation;
  cancelEdit: () => void;
  isSubmitting: boolean;
}

const CreationForm = ({ creation, cancelEdit, isSubmitting }: Props) => {
  const [formData, setFormData] = useState<CreationFormData>({
    name: '',
    description: '',
    mainImage: null,
    additionalImages: [],
  });

  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    if (creation) {
      setFormData({
        name: creation.name,
        description: creation.description,
        mainImage: null, // En mode édition, on laisse l'image principale vide
        additionalImages: [],
      });
      setEditMode(true);
    } else {
      setEditMode(false);
    }
  }, [creation]);

  // Fonction de gestion du téléchargement de l'image principale
  const { getRootProps: getMainImageRootProps, getInputProps: getMainImageInputProps } = useDropzone({
    onDrop: (acceptedFiles) => handleMainImageUpload(acceptedFiles),
  });

  // Fonction de gestion du téléchargement des images supplémentaires
  const { getRootProps: getAdditionalImagesRootProps, getInputProps: getAdditionalImagesInputProps } = useDropzone({
    onDrop: (acceptedFiles) => handleAdditionalImagesUpload(acceptedFiles),
  });

  // Fonction pour ajouter l'image principale au formulaire
  const handleMainImageUpload = (files: File[]) => {
    if (files.length === 1) {
      setFormData((prev) => ({
        ...prev,
        mainImage: files[0],
      }));
    }
  };

  // Fonction pour ajouter des images supplémentaires
  const handleAdditionalImagesUpload = (files: File[]) => {
    setFormData((prev) => ({
      ...prev,
      additionalImages: [...prev.additionalImages!, ...files],
    }));
  };

  // Fonction pour supprimer l'image principale
  const handleMainImageDelete = () => {
    setFormData((prev) => ({
      ...prev,
      mainImage: null, // Supprimer l'image principale
    }));
  };

  // Fonction pour supprimer une image supplémentaire
  const handleAdditionalImageDelete = (index: number) => {
    setFormData((prev) => {
      const updatedImages = [...prev.additionalImages!];
      updatedImages.splice(index, 1); // Supprimer l'image à l'index spécifié
      return {
        ...prev,
        additionalImages: updatedImages,
      };
    });
  };

  // Fonction pour gérer la mise à jour des autres champs du formulaire
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fonction pour soumettre le formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Crée un objet FormData pour envoyer les fichiers
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);

    // Ajout de l'image principale (si elle est présente)
    if (formData.mainImage) {
      formDataToSend.append('mainImage', formData.mainImage);
    } else if (creation && creation.pictureUrl) {
      // Si pas de nouvelle image, on envoie l'URL existante
      formDataToSend.append('mainImageUrl', creation.pictureUrl);
    }

    // Ajout des images supplémentaires (si présentes)
    formData.additionalImages!.forEach((file) => {
      formDataToSend.append('additionalImages', file);
    });

    if (editMode && creation) {
      formDataToSend.append('id', String(creation.id));
    }
    
    try {
      let response;
      if (editMode && creation) {
        response = await axios.put(
          `http://localhost:5000/api/Creation/UpdateCreation/${creation.id}`,
          formDataToSend,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        console.log('Mise à jour réussie', response.data);
      } else {
        response = await axios.post(
          'http://localhost:5000/api/Creation/CreateCreation',
          formDataToSend,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        console.log('Création réussie', response.data);
      }
    } catch (error) {
      console.error('Erreur lors de la création ou mise à jour', error);
    }
  };

  return (
    <Box
      component="section"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        marginTop: '30px',
        marginBottom: '30px',
        backgroundColor: 'black',
      }}
    >
      <Box
        sx={{
          width: { xs: '90%', sm: '60%', md: '50%' },
          padding: 4,
          backgroundColor: '#e7e2e1',
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          mb={4}
          sx={{
            fontFamily: 'Lovers',
            color: 'black',
            fontSize: { xs: '3rem', md: '5rem' },
          }}
        >
          {editMode ? 'Modifier la création' : 'Ajouter une création'}
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Champ pour le nom de la création */}
            <Grid item xs={12}>
              <TextField
                label="Nom de la création"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>

            {/* Champ pour la description */}
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={4}
                required
              />
            </Grid>

            {/* Zone de dépôt pour l'image principale
            <Grid item xs={12}>
              <Box
                {...getMainImageRootProps()}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                sx={{ gap: 2, border: '2px dashed #640a02', padding: 2, cursor: 'pointer' }}
              >
                <input {...getMainImageInputProps()} />
                <CloudUploadIcon fontSize="large" />
                <Typography variant="body2">
                  Glissez et déposez l'image principale ici, ou cliquez pour sélectionner
                </Typography>
              </Box>
            </Grid> */}

            {/* Prévisualisation de l'image principale */}
            {formData.mainImage || creation?.pictureUrl ? (
              <Grid item xs={12}>
                <Box sx={{ position: 'relative' }}>
                  <img
                    src={formData.mainImage ? URL.createObjectURL(formData.mainImage) : creation?.pictureUrl || undefined}
                    alt="Main Preview"
                    style={{ maxWidth: 300, marginTop: '10px' }}
                  />
                <Button
                        sx={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          backgroundColor: 'rgba(255, 0, 0, 0.6)',
                          color: 'white',
                        }}
                        onClick={() => handleAdditionalImageDelete(1)}
                      >
                        Supprimer
                      </Button>
                </Box>
              </Grid>
            ) : null}

            {/* Zone de dépôt pour les images supplémentaires */}
            <Grid item xs={12}>
              <Box
                {...getAdditionalImagesRootProps()}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                sx={{ gap: 2, border: '2px dashed #640a02', padding: 2, cursor: 'pointer' }}
              >
                <input {...getAdditionalImagesInputProps()} />
                <CloudUploadIcon fontSize="large" />
                <Typography variant="body2">
                  Glissez et déposez des images supplémentaires ici, ou cliquez pour sélectionner
                </Typography>
              </Box>
            </Grid>

            {/* Prévisualisation des images supplémentaires */}
            {formData.additionalImages!.length > 0 && (
              <Grid item xs={12}>
                <Box display="flex" gap={2}>
                  {formData.additionalImages!.map((file, index) => (
                    <Box key={index} sx={{ position: 'relative' }}>
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Additional ${index}`}
                        style={{ maxWidth: 200, marginTop: '10px' }}
                      />
                      <Button
                        sx={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          backgroundColor: 'rgba(255, 0, 0, 0.6)',
                          color: 'white',
                        }}
                        onClick={() => handleAdditionalImageDelete(index)}
                      >
                        Supprimer
                      </Button>
                    </Box>
                  ))}
                </Box>
              </Grid>
            )}

            {/* Boutons pour soumettre ou annuler */}
            <Grid item xs={12} textAlign="center">
              <LoadingButton
                type="submit"
                loading={isSubmitting}
                variant="contained"
                color="primary"
                sx={{ marginRight: 2 }}
              >
                {editMode ? 'Mettre à jour' : 'Ajouter'}
              </LoadingButton>
              <Button variant="outlined" onClick={cancelEdit}>Annuler</Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default CreationForm;
