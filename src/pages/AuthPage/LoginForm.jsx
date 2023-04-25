import { useState } from "react";
import { getMember } from "../../utilities/members-service";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";

export default function LoginForm({ setUser }) {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loginTry, setLoginTry] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/member/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginTry),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Network error");
      }
      localStorage.setItem("token", JSON.stringify(data.token));
      const decoded = getMember();
      const Name = JSON.parse(window.atob(data.token.split(".")[1]));
      console.log(Name.member.name);
      console.log(Name.member.email);
      setUser(decoded);
      if (Name.member.role === "admin") {
        navigate("/productpage");
      } else {
        navigate("/");
      }

      console.log(decoded);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (e) => {
    setLoginTry({
      ...loginTry,
      [e.target.name]: e.target.value,
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
              Login
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Email"
                name="email"
                value={loginTry.email}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Password"
                name="password"
                value={loginTry.password}
                onChange={handleChange}
                type="password"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleLogin}
            >
              Login
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="outlined"
              component={Link}
              to="/forgetpassword"
            >
              Forget Password
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
}
