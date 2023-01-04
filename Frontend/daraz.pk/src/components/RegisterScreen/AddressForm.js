import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function AddressForm({ userDetails, setUserDetails }) {
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Fill Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required={true}
            id="name"
            name="name"
            label="Name"
            value={userDetails.name}
            onInput={handleChange}
            fullWidth
            autoFocus
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            value={userDetails.email}
            onInput={handleChange}
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            value={userDetails.city}
            onInput={handleChange}
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="region"
            name="region"
            value={userDetails.region}
            onInput={handleChange}
            label="State/Province/Region"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            value={userDetails.zip}
            onInput={handleChange}
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            value={userDetails.country}
            onInput={handleChange}
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="password"
            name="password"
            value={userDetails.password}
            onInput={handleChange}
            label="Password"
            fullWidth
            type={"password"}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color="secondary" name="saveAddress" value="yes" />
            }
            label="Use this address for Delivery"
          />
          <Grid item>
            <Link onClick={() => navigate("/login")} variant="body2">
              {"Already have an account? Sign In"}
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
