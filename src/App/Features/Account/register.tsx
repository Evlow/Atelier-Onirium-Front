import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Paper } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import agent from "../../Api/agent";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
  const {
    setError,
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: "all",
  });
  function handleApiErrors(errors: any) {
    console.log(errors);
    if (errors) {
      errors.forEach((error: string) => {
        if (error.includes("Password")) {
          setError("password", { message: error });
        } else if (error.includes("Email")) {
          setError("email", { message: error });
        } else if (error.includes("Username")) {
          setError("username", { message: error });
        }
      });
    }
  }
  return (
    <Container
      component={Paper}
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 4,
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Inscription
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(async (data) => {
            try {
                await agent.Account.register(data); 
                navigate("/connexion");
            } catch (error) {
                handleApiErrors(error); 
            }
        })}
        sx={{ mt: 1 }}
      >
        <TextField
          margin="normal"
          fullWidth
          label="Nom d'utilisateur"
          autoFocus
          {...register("userName", {
            required: "Le nom d'utilisateur est requis",
          })}
          error={!!errors.username}
          helperText={errors?.userName?.message as string}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Email"
          autoFocus
          {...register("email", {
            required: "L'email est requis",
            pattern: {
              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "L'adresse mail n'est pas valide",
            },
          })}
          error={!!errors.email}
          helperText={errors?.email?.message as string}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Mot de passe"
          type="password"
          {...register("password", {
            required: "Le mot de passe est requis",
            pattern: {
              value:
                /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
              message: "Le mot de passe n'est pas assez complexe",
            },
          })}
          error={!!errors.password}
          helperText={errors?.password?.message as string}
        />
        <LoadingButton
          disabled={!isValid}
          loading={isSubmitting}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Inscription
        </LoadingButton>
      </Box>
    </Container>
  );
}
