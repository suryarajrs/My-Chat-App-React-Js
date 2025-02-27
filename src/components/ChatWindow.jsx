    // src/components/ChatWindow.jsx
    import React, { useState, useRef, useEffect } from "react";
    import { Box, TextField, Button, Avatar, Typography } from "@mui/material";
    import SendIcon from "@mui/icons-material/Send";
    import { styled } from "@mui/system";

    const ChatContainer = styled(Box)({
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    overflowY: "auto",
    padding: "20px",
    background: "linear-gradient(135deg, #1e1e1e, #292929)",
    scrollbarWidth: "thin",
    scrollbarColor: "#555 #292929",
    "&::-webkit-scrollbar": {
        width: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#555",
        borderRadius: "4px",
    },
    });

    const MessageWrapper = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "15px",
    });

    const MessageBubble = styled(Box)(({ isSender }) => ({
    maxWidth: "65%",
    padding: "12px 15px",
    borderRadius: "18px",
    color: isSender ? "white" : "black",
    background: isSender ? "#007AFF" : "#EAEAEA",
    alignSelf: isSender ? "flex-end" : "flex-start",
    position: "relative",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
    wordBreak: "break-word",
    }));

    const MessageTimestamp = styled(Typography)({
    fontSize: "12px",
    opacity: 0.7,
    marginTop: "4px",
    textAlign: "right",
    });

    const ChatWindow = ({ messages, onSendMessage, user }) => {
    const [text, setText] = useState("");
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendClick = () => {
        if (text.trim()) {
        onSendMessage(text);
        setText("");
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <ChatContainer>
            {messages.map((msg) => {
            const isSender = msg.sender === user.displayName;
            return (
                <MessageWrapper key={msg.id} sx={{ flexDirection: isSender ? "row-reverse" : "row" }}>
                <Avatar src={msg.senderPhoto} />
                <Box>
                    <Typography variant="subtitle2" sx={{ color: "#bbb", fontSize: "14px", marginBottom: "3px" }}>
                    {msg.sender}
                    </Typography>
                    <MessageBubble isSender={isSender}>
                    <Typography variant="body1">{msg.text}</Typography>
                    <MessageTimestamp>
                        {msg.timestamp?.toDate ? msg.timestamp.toDate().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) 
                        : new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </MessageTimestamp>
                    </MessageBubble>
                </Box>
                </MessageWrapper>
            );
            })}
            <div ref={chatEndRef} />
        </ChatContainer>

        {/* Input Field */}
        <Box sx={{ display: "flex", padding: 2, backgroundColor: "#1f1f1f", borderRadius: "10px" }}>
            <TextField
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            sx={{ input: { color: "white" }, bgcolor: "#2c2c2c", borderRadius: "10px" }}
            />
            <Button onClick={handleSendClick} variant="contained" sx={{ ml: 1, bgcolor: "#007AFF" }}>
            <SendIcon />
            </Button>
        </Box>
        </Box>
    );
    };

    export default ChatWindow;
