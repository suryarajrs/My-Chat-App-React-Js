import React from "react";
import { Button, Box, Typography, Paper } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebaseConfig";
import GoogleIcon from "@mui/icons-material/Google";

const Login = ({ onLogin }) => {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      onLogin(result.user);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #1e3c72, #2a5298)",
      }}
    >
      <Paper
        elevation={10}
        sx={{
          padding: 4,
          textAlign: "center",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          borderRadius: "15px",
          color: "white",
        }}
      >
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Welcome to My Chat App
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Sign in to start messaging
        </Typography>
        <Button
          variant="contained"
          startIcon={<GoogleIcon />}
          onClick={handleLogin}
          sx={{
            mt: 2,
            backgroundColor: "#fff",
            color: "#333",
            "&:hover": { backgroundColor: "#ddd" },
          }}
        >
          Sign in with Google
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;
