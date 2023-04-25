import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState(null);

  const disable = state.password !== state.confirm;
  const existingUser = async (userData) => {
    const response = await fetch(`/api/member/forgetpassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Reset password unsuccessful.");
    }

    return data;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await existingUser(state);
      setState({
        name: "",
        email: "",
        password: "",
        confirm: "",
      });
      navigate("/login");
    } catch (error) {
      setError(error.message);
      console.error(`Error: ${error.message}`);
    }
  };

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Container>
      <Box
        sx={{
          marginTop: "2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" align="center">
              Reset Password
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Name"
                name="name"
                value={state.name}
                onChange={handleChange}
                required
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Email"
                name="email"
                value={state.email}
                onChange={handleChange}
                required
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Password"
                name="password"
                value={state.password}
                onChange={handleChange}
                type="password"
                required
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Confirm"
                name="confirm"
                value={state.confirm}
                onChange={handleChange}
                type="password"
                required
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleSubmit}
              disabled={disable}
            >
              Reset Password
            </Button>
          </Grid>
          {error && (
            <Grid item xs={12}>
              <Typography color="error">{error}</Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default ForgetPassword;
