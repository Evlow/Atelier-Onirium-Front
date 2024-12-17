import { UploadFile } from "@mui/icons-material";
import { FormControl, FormHelperText, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { useController, UseControllerProps } from "react-hook-form";
import { useDropzone } from "react-dropzone";

interface Props extends UseControllerProps {}

export default function DropZoneInput(props: Props) {
  const { fieldState, field } = useController({ ...props, defaultValue: null });
  const [fileError, setFileError] = useState<string | null>(null);

  const maxFileSize = 10 * 1024 * 1024; // Limite de taille : 10 Mo

  const handleFile = useCallback(
    (file: File) => {
      if (file.size > maxFileSize) {
        setFileError("La taille maximale autorisée est de 10 Mo.");
        return;
      }
      const previewFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      field.onChange(previewFile);
      setFileError(null); // Réinitialiser les erreurs si le fichier est valide
    },
    [field, maxFileSize]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        handleFile(acceptedFiles[0]);
      }
    },
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  return (
    <div {...getRootProps()}>
      <FormControl
        error={!!fieldState.error || !!fileError}
        style={{
          display: "flex",
          border: "dashed 3px #640a02",
          borderRadius: "5px",
          padding: "20px",
          alignItems: "center",
          justifyContent: "center",
          height: 200,
        
        }}
      >
        <input {...getInputProps()} type="file" onChange={handleFileSelect} />
        <UploadFile sx={{ fontSize: "50px", color: "black" }} />
        <Typography variant="body1" textAlign="center" color= "black" >
         Wesh la Gueuse, glisse ou sélectionne une image
        </Typography>
        <FormHelperText>
          {fileError || fieldState.error?.message}
        </FormHelperText>
      </FormControl>
    </div>
  );
}
