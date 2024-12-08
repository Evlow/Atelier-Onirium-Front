import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Paper } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch } from "../../Store/configureStore";
import { signInUser } from "./accountSlice";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../../../Components/NavBar/navbar";
import Footer from '../../../Components/Footer/footer';

export default function Login() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors, isValid },
    } = useForm({
        mode: "all",
    });

    async function submitForm(data: FieldValues) {
      try {
        await dispatch(signInUser(data));
        navigate(location.state?.from ||"/dashboard");
      } catch (error) {
        console.log(error);
      }
    }

    return (
    <div>   <NavBar></NavBar>

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
                Connexion
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit(submitForm)}
                noValidate
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
                    error={!!errors.userName}
                    helperText={errors?.userName?.message as string}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Mot de passe"
                    type="password"
                    {...register("password", {
                        required: "Le mot de passe est requis",
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
                    Connexion
                </LoadingButton>
            </Box>
        </Container>
        <Footer></Footer>
        </div>
    );
}