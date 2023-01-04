import * as React from "react";
import {
  CssBaseline,
  Box,
  Container,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  createTheme,
  ThemeProvider,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import Review from "../components/RegisterScreen/Review";
import AddressForm from "../components/RegisterScreen/AddressForm";

import { useDispatch } from "react-redux";
import { setAuthToken } from "../Redux_Store/Slices/authTokenSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { setUser } from "../Redux_Store/Slices/userSlice";

const steps = ["Fill in details", "Review your Details"];
const theme = createTheme();

export default function RegisterScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || "/";
  const [open, setOpen] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [userDetails, setUserDetails] = React.useState({
    name: "",
    email: "",
    city: "",
    region: "",
    country: "",
    zip: "",
    password: "",
  });

  React.useEffect(() => {
    return setLoading(false);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userDetails),
    };
    try {
      let res = await fetch(
        `${process.env.REACT_APP_BASE_URL}auth/register`,
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
      console.log(`Error in  : RegisterScreen`, e);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Sign up
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <>
            {activeStep === 0 ? (
              <AddressForm
                userDetails={userDetails}
                setUserDetails={setUserDetails}
              />
            ) : (
              <Review userDetails={userDetails} />
            )}

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {activeStep !== 0 && (
                <Button
                  onClick={() => setActiveStep(activeStep - 1)}
                  sx={{ mt: 3, ml: 1 }}
                >
                  Back
                </Button>
              )}
              {activeStep === steps.length - 1 ? (
                <Box sx={{ mt: 3 }}>
                  <Button
                    variant="contained"
                    disabled={loading}
                    onClick={handleSubmit}
                  >
                    Sign up
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
              ) : (
                <Button
                  variant="contained"
                  onClick={() => setActiveStep(activeStep + 1)}
                  type="button"
                  disabled={
                    userDetails.city &&
                    userDetails.country &&
                    userDetails.email &&
                    userDetails.name &&
                    userDetails.password &&
                    userDetails.region &&
                    userDetails.zip
                      ? false
                      : true
                  }
                  sx={{ mt: 3, ml: 1 }}
                >
                  Next
                </Button>
              )}
            </Box>
          </>
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
