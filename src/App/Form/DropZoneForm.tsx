import { UploadFile } from "@mui/icons-material";
import { FormControl, FormHelperText, Typography, Box, IconButton } from "@mui/material";
import { useCallback, useState } from "react";
import { useController, UseControllerProps } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import CloseIcon from "@mui/icons-material/Close";

interface Props extends UseControllerProps {
  multiple?: boolean; // Permettre plusieurs fichiers
  label?: string; // Texte personnalisé pour chaque Drop Zone
  acceptedFileTypes?: string[]; // Types de fichiers autorisés (par exemple : ["image/jpeg", "image/png"])
  maxFiles?: number; // Limiter le nombre de fichiers (si multiple = true)
}

export default function DropZoneInput({
  multiple = false,
  label,
  acceptedFileTypes = ["image/jpeg", "image/png"], // Types autorisés par défaut
  maxFiles = 5, // Nombre max de fichiers par défaut
  ...props
}: Props) {
  const { fieldState, field } = useController({ ...props, defaultValue: multiple ? [] : null });
  const [fileError, setFileError] = useState<string | null>(null);

  const maxFileSize = 10 * 1024 * 1024; // Limite de taille : 10 Mo

  const handleFiles = useCallback(
    (files: File[]) => {
      // Validation des fichiers
      const validFiles = files.filter(
        (file) =>
          file.size <= maxFileSize &&
          (acceptedFileTypes.includes(file.type) || acceptedFileTypes.length === 0)
      );

      if (validFiles.length !== files.length) {
        setFileError("Certains fichiers ne sont pas valides (taille ou type incorrect).");
        return;
      }

      const previews = validFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      );

      // Mise à jour des fichiers dans le champ contrôlé
      if (multiple) {
        if ((field.value || []).length + previews.length > maxFiles) {
          setFileError(`Vous pouvez télécharger jusqu'à ${maxFiles} fichiers.`);
          return;
        }
        field.onChange([...(field.value || []), ...previews]);
      } else {
        field.onChange(previews[0]);
      }
      setFileError(null); // Réinitialiser les erreurs si le fichier est valide
    },
    [field, maxFileSize, acceptedFileTypes, multiple, maxFiles]
  );

  const removeFile = useCallback(
    (index: number) => {
      if (multiple) {
        const newFiles = [...field.value];
        URL.revokeObjectURL(newFiles[index].preview);
        newFiles.splice(index, 1);
        field.onChange(newFiles);
      } else {
        URL.revokeObjectURL(field.value.preview);
        field.onChange(null);
      }
    },
    [field, multiple]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFiles,
    multiple,
  });

  return (
    <>
      <div {...getRootProps()}>
        <FormControl
          error={!!fieldState.error || !!fileError}
          style={{
            display: "flex",
            border: isDragActive ? "dashed 3px #28a745" : "dashed 3px #640a02",
            borderRadius: "5px",
            padding: "20px",
            alignItems: "center",
            justifyContent: "center",
            width: "300px", // Largeur carrée
            height: "100px", // Hauteur carrée
            marginBottom: "20px",
            backgroundColor: isDragActive ? "#e9f7ef" : "transparent",
          }}
        >
          <input {...getInputProps()} />
          <UploadFile sx={{ fontSize: "50px", color: isDragActive ? "#28a745" : "black" }} />
          <Typography variant="body1" textAlign="center" color="black">
            {label || "Glissez ou sélectionnez des fichiers"}
          </Typography>
          <FormHelperText>
            {fileError || fieldState.error?.message}
          </FormHelperText>
        </FormControl>
      </div>

      {/* Affichage des prévisualisations pour plusieurs fichiers */}
      {multiple && Array.isArray(field.value) && field.value.length > 0 && (
        <Box mt={2} display="flex" flexWrap="wrap">
          {field.value.map((file: any, index: number) => (
            <Box
              key={file.preview}
              textAlign="center"
              mb={2}
              position="relative"
              width="100px" // Largeur carrée
              height="100px" // Hauteur carrée
              m={1}
            >
              <img
                src={file.preview}
                alt={`Prévisualisation ${index + 1}`}
                style={{
                  maxWidth: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "5px",
                }}
              />
              <IconButton
                aria-label="delete"
                onClick={() => removeFile(index)}
                sx={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                  backgroundColor: "#fff",
                  borderRadius: "50%",
                  boxShadow: 3,
                }}
              >
                <CloseIcon sx={{ color: "#640a02" }} />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}

      {/* Prévisualisation pour un seul fichier */}
      {!multiple && field.value && (
        <Box textAlign="center" mt={2}>
          <img
            src={field.value.preview}
            alt="Prévisualisation"
            style={{width:'300px',
              objectFit: "cover",
              borderRadius: "5px",
            }}
          />
          <IconButton aria-label="delete" onClick={() => removeFile(0)}>
            <CloseIcon />
          </IconButton>
        </Box>
      )}
    </>
  );
}
