import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../lib/schemas/loginSchema";
import { useForm } from "react-hook-form";
import { useAccounts } from "../../lib/hooks/useAccounts";
import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { LockOpen } from "@mui/icons-material";
import TextInput from "../../app/shared/components/TextInput";
import Button from "@mui/material/Button";
import { Link, useLocation, useNavigate } from "react-router";

function LoginForm() {
    const navigate = useNavigate()
    const location = useLocation()
    const {loginUser} =useAccounts();
    const {control, handleSubmit,formState:{isValid,isSubmitting}} = useForm<loginSchema>({
        mode : 'onTouched',
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data:loginSchema) => {
        await loginUser.mutateAsync(data,{
          onSuccess: () => {
            navigate(location.state?.from || '/activities');
          }
        });
    }

  return (
  <Paper
  component='form'
  onSubmit={handleSubmit(onSubmit)}
  sx={{
    display:'flex',
    flexDirection:'column',
    p:3,
    gap:3,
    maxWidth:'md',
    mx:'auto',
    borderRadius:3
  }}
  >
    <Box display='flex' alignItems='center' justifyContent='center' gap={3} color='secondary.main'>
<LockOpen fontSize="large"/>
<Typography variant="h4">Sign in</Typography>
    </Box>
<TextInput label='Email' control={control} name='email'/>
<TextInput label='Password' control={control} name='password' type="password"/>
<Button type='submit' variant='contained' disabled={!isValid || isSubmitting} size='large'>
Login
</Button>
<Typography sx={{textAlign: 'center'}}>
  Don't have an account?
  <Typography sx={{ml:2}} component={Link} to='/register' color="primary">
    Sign up
  </Typography>
</Typography>
  </Paper>
  )
}

export default LoginForm


