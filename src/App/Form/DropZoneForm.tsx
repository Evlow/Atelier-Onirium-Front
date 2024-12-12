import { UploadFile } from "@mui/icons-material";
import { FormControl, FormHelperText, Typography } from "@mui/material";
import { useCallback } from "react";
import { useController, UseControllerProps } from "react-hook-form";
import { useDropzone } from "react-dropzone";

// Définir le type pour les fichiers acceptés
interface Props extends UseControllerProps {}

export default function DropZoneInput(props: Props) {
  const { fieldState, field } = useController({ ...props, defaultValue: null });


  const dzStyles = {
    display: "flex",
    border: "dashed 3px #eee",
    borderColor: "#eee",
    borderRadius: "5px",
    paddingTop: "30px",
    alignItems: "center",
    height: 200,
    width: 500,
  };

  const dzActive = {
    borderColor: "green",
  };

  // Utiliser useCallback pour accepter des fichiers avec un type explicite
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles[0] = Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]),
      });
      field.onChange(acceptedFiles[0]);
    },
    [field]
  );

  // Utiliser useDropzone avec le type explicite pour acceptedFiles
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <div {...getRootProps()}>
      <FormControl
        error={!!fieldState.error}
        style={isDragActive ? { ...dzStyles, ...dzActive } : dzStyles}
      >
        <input
          {...getInputProps()}
          type="file"
          onChange={(e) => {
          }}
        />
        <UploadFile sx={{ fontSize: "100px" }} />
        <Typography variant="body1" textAlign="center">
          Hey la Gueuse,glisse ton image ici ! ou Clique ! Fais comme tu veux
          mais mets-moi une jolie image !
        </Typography>
        <FormHelperText>{fieldState.error?.message}</FormHelperText>
      </FormControl>
    </div>
  );
}
