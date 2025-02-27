import React, { useState, useEffect } from "react";
import { collection, addDoc, onSnapshot, orderBy, query } from "firebase/firestore";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { AppBar, Toolbar, Typography, Box, Button, Avatar, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChatWindow from "./components/ChatWindow";
import Login from "./components/Login";
import { db, auth } from "./firebaseConfig";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
    const unsubscribeMessages = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubscribeAuth();
      unsubscribeMessages();
    };
  }, []);

  const handleSendMessage = async (text) => {
    if (!text.trim() || !user) return;

    const userMessage = {
      text,
      sender: user.displayName,
      senderPhoto: user.photoURL,
      timestamp: new Date(),
    };

    await addDoc(collection(db, "messages"), userMessage);

    // Simple chatbot response logic
    const botResponses = {
      hello: "Hi there! How can I help?",
      help: "Sure! What do you need help with?",
      time: `The current time is ${new Date().toLocaleTimeString()}`,
      default: "I'm just a simple bot. Try asking something else!",
    };

    const lowerText = text.toLowerCase();
    const botReply = botResponses[lowerText] || botResponses.default;

    const botMessage = {
      text: botReply,
      sender: "ChatBot",
      senderPhoto: "",
      timestamp: new Date(),
    };
    

    //  delay in chatbot response
    setTimeout(async () => {
      await addDoc(collection(db, "messages"), botMessage);
    }, 1000); 
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  if (!user) return <Login onLogin={setUser} />;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", backgroundColor: "#121212" }}>
      {/* Nav  */}

      <AppBar position="sticky" sx={{ backgroundColor: "#1f1f1f", paddingX: 2 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>


          {/* App Title & Menu Button */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              sx={{ display: { xs: "block", md: "none" }, color: "white" }}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ fontSize: { xs: "1rem", md: "1.5rem" }, ml: { xs: 1, md: 2 } }}>
              My Chat App
            </Typography>
          </Box>

           {/* User Info & Logout */}

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar src={user.photoURL} sx={{ width: { xs: 30, md: 40 }, height: { xs: 30, md: 40 } }} />
            <Typography sx={{ fontSize: { xs: "0.9rem", md: "1rem" }, display: { xs: menuOpen ? "block" : "none", md: "block" } }}>
              {user.displayName}
            </Typography>
            <Button
              variant="contained"
              onClick={handleLogout}
              sx={{
                bgcolor: "red",
                fontSize: { xs: "0.7rem", md: "0.9rem" },
                padding: { xs: "4px 8px", md: "6px 16px" },
                display: { xs: menuOpen ? "block" : "none", md: "block" },
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Chat window */}
      <ChatWindow messages={messages} onSendMessage={handleSendMessage} user={user} />
    </Box>
  );
};

export default App;
