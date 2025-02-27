import React, { useState } from "react";
import { Box, TextField, IconButton, Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const MessageInput = ({ onSendMessage }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSendMessage(text);
    setText("");
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        alignItems: "center",
        padding: 1,
        position: "sticky",
        bottom: 0,
        width: "100%",
        borderTop: "1px solid #444",
        bgcolor: "#222",
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        sx={{ input: { color: "white" }, bgcolor: "#333", borderRadius: 1 }}
      />
      <IconButton color="primary" type="submit">
        <SendIcon />
      </IconButton>
    </Paper>
  );
};

export default MessageInput;
