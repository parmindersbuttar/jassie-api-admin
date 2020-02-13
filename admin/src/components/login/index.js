import React, { useContext, useState } from 'react';
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Link,
    Grid,
    Box,
    Typography,
    Container
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './style';
import { LoginContext } from '../../contexts/LoginContext';
import Copyright from '../common/Copyright';

export default function SignIn() {
  const classes = useStyles();
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });  
  const loginStore = useContext(LoginContext);
  
  const handleChange = (e) => {
    const {name, value} = e.target;
    setUserData({
      ...userData,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    loginStore.login(userData);
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {loginStore.error && <Alert severity="error">{loginStore.error}</Alert>}
        
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={userData.email}
            onChange={handleChange}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={userData.password}
            onChange={handleChange}
          />
         
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loginStore.loading}
          >
            {loginStore.loading ? 'signing in...' : 'Sign In' }
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}