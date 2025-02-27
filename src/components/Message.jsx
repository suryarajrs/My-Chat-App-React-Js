import React from "react";
import { Box, Typography } from "@mui/material";

const Message = ({ text, sender, timestamp }) => {
  const isUser = sender === "You";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginY: 1,
      }}
    >
      <Box
        sx={{
          maxWidth: "65%",
          padding: 2,
          borderRadius: 2,
          bgcolor: isUser ? "#007AFF" : "#444",
          color: "white",
          boxShadow: 2,
          position: "relative",
        }}
      >
        <Typography>{text}</Typography>
        <Typography variant="caption" sx={{ position: "absolute", bottom: -20, right: 5, color: "#bbb" }}>
          {timestamp}
        </Typography>
      </Box>
    </Box>
  );
};

export default Message;
