import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAccounts } from "../../lib/hooks/useAccounts";
import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { LockOpen } from "@mui/icons-material";
import TextInput from "../../app/shared/components/TextInput";
import Button from "@mui/material/Button";
import { Link } from "react-router";
import { registerSchema } from "../../lib/schemas/registerSchema";

function RegisterForm() {
    const { registerUser } = useAccounts();
    const { control, handleSubmit, setError, formState: { isValid, isSubmitting } } = useForm<registerSchema>({
        mode: 'onTouched',
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: registerSchema) => {
        await registerUser.mutateAsync(data, {
            onError: (error) => {
                if (Array.isArray(error)) {
                    error.forEach((err: string) => {
                        if (err.includes('Email')) setError('email', { message: err });
                        else if (err.includes('Password')) setError('password', { message: err });
                    });
                }
            }
        });
    };

    return (
        <Paper
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                p: 3,
                gap: 3,
                maxWidth: 'md',
                mx: 'auto',
                borderRadius: 3
            }}
        >
            <Box display='flex' alignItems='center' justifyContent='center' gap={3} color='secondary.main'>
                <LockOpen fontSize="large" />
                <Typography variant="h4">Register</Typography>
            </Box>
            <TextInput label='Email' control={control} name='email' />
            <TextInput label='Display name' control={control} name='displayName' />
            <TextInput label='Password' control={control} name='password' type="password" />
            <Button type='submit' variant='contained' disabled={!isValid || isSubmitting} size='large'>
                Register
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
                Already have an account?
                <Typography sx={{ ml: 2 }} component={Link} to='/login' color="primary">
                    Sign in
                </Typography>
            </Typography>
        </Paper>
    );
}

export default RegisterForm;
