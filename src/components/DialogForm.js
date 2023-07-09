import { useState } from 'react';
import { Avatar, Button, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container } from '@mui/material';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Taskify
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function SignIn({handleForm}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        variant='filled'
        color='info'
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email"
        name="email"
        autoComplete="email"
        autoFocus
      />
      <TextField
        variant='filled'
        color='info'
        margin="normal"
        required
        fullWidth
        name="password"
        label="Contraseña"
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <FormControlLabel
        control={
          <Checkbox
            value="remember"
            color="default"
            size='small'
          />
        }
        label={
          <Typography variant='subtitle2'>
            Recordarme
          </Typography>
        }
      />
      <Button
        className='btn-login'
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Log in
      </Button>
      <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2" color='#F1EFEF' underline='hover'>
          ¿Olvidó su contraseña?
          </Link>
        </Grid>
        <Grid item>
          <Link href="#" variant="body2" color='#F1EFEF' underline='hover' onClick={handleForm}>
            {"¿No tienes cuenta? ¡Regístrate!"}
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}

function SignUp({handleForm}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container columnSpacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            variant='filled'
            color='info'
            margin="normal"
            autoComplete="given-name"
            name="firstName"
            required
            fullWidth
            id="firstName"
            label="Nombre"
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant='filled'
            color='info'
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Apellido"
            name="lastName"
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant='filled'
            color='info'
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant='filled'
            color='info'
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="new-password"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                value="allowExtraEmails"
                color="default"
                size='small'
              />
            }
            label={
              <Typography variant='subtitle2'>
                Quiero recibir promociones de marketing y actualizaciones por correo electrónico.
              </Typography>
            }
          />
        </Grid>
      </Grid>
      <Button
        className='btn-login'
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Regístrate
      </Button>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link href="#" variant="body2" color='#F1EFEF' underline='hover' onClick={handleForm}>
          ¿Ya tienes cuenta? ¡Inicia sesión!
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}

export default function DialogModal() {
  const [isSignIn, setIsSignIn] = useState(true)

  const handleForm = () => {
    setIsSignIn(!isSignIn);
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar
          src='img/logocircular.png'
          sx={{ m: 1, bgcolor: 'transparent', width: '70px', height: '70px' }}
        >
        </Avatar>
        {
          isSignIn
            ? <SignIn handleForm={handleForm} />
            : <SignUp handleForm={handleForm} />
        }
      </Box>
      <Copyright sx={{ mt: 6, mb: 2 }} />
    </Container>
  );
}
