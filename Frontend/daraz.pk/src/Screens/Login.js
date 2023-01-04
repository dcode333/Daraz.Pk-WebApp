import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { setAuthToken } from "../Redux_Store/Slices/authTokenSlice";
import { setUser } from "../Redux_Store/Slices/userSlice";

import {
  Alert,
  CircularProgress,
  Paper,
  Snackbar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";

const theme = createTheme();

export default function Login() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const redirectPath = location.state?.path || "/";
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    return setLoading(false);
  }, [redirectPath]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.get("email"),
        password: data.get("password"),
      }),
    };
    try {
      let res = await fetch(
        `${process.env.REACT_APP_BASE_URL}auth/login`,
        requestOptions
      );

      if (res.ok) {
        const token = await res.json();
        dispatch(setAuthToken(token.authToken));
        dispatch(setUser(token.user));
        setLoading(false);
        navigate(redirectPath, { replace: true });
      } else {
        setLoading(false);
        setOpen(true);
      }
    } catch (e) {
      console.log(`Error in  : LoginScreen`, e);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" mb={10}>
        <CssBaseline />
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              h: "100%",
            }}
          >
            <img
              src="https://logos-world.net/wp-content/uploads/2022/05/Daraz-Emblem.png"
              height={"100px"}
              width={"200px"}
              alt="logo"
            ></img>
            <form method="POST" action="/" onSubmit={handleSubmit}>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Box sx={{ mt: 3, mb: 2 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    disabled={loading}
                    type="submit"
                  >
                    Sign In
                    {loading && (
                      <CircularProgress
                        size={24}
                        sx={{
                          color: "orange",
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          marginTop: "-12px",
                          marginLeft: "-12px",
                        }}
                      />
                    )}
                  </Button>
                </Box>
                <Grid container>
                  <Grid item>
                    <Link onClick={() => navigate("/register")} variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </form>
          </Box>
        </Paper>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
        >
          <Alert onClose={() => setOpen(false)} severity="error">
            Invalid Credentials
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}
