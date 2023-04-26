import { useState } from "react";
import { useNavigate } from "react-router-dom";
// CSS -----------------------------------------
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function SignUpForm() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState(null);

  const disable = state.password !== state.confirm;

  const newMember = async (memberData) => {
    const response = await fetch(`/api/member/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(memberData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "member registration failed");
    }

    return data;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await newMember(state);
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
    <Container maxWidth="sm" sx={{ marginTop: "2rem" }}>
      <Typography variant="h4" align="center" gutterBottom>
        New member
      </Typography>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              type="text"
              name="name"
              value={state.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              name="email"
              value={state.email}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={state.password}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              name="confirm"
              value={state.confirm}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              disabled={disable}
            >
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </form>
      {error ? (
        <Typography variant="subtitle1" color="error" align="center">
          {error}
        </Typography>
      ) : null}
    </Container>
  );
}
