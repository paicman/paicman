import React, { FC, useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import typingGif from "../../assets/pacman.gif";

interface ChatBoxProps {
  open: boolean;
  onClose: () => void;
}

interface MessageHistory {
  sender: string;
  message: string | null;
}

const ChatBox: FC<ChatBoxProps> = ({ open, onClose }) => {
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<MessageHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [currentText, setCurrentText] = useState(""); // Text currently being typed
  const [currentIndex, setCurrentIndex] = useState(0); // Current character index for typing animation
  const [typingText, setTypingText] = useState(""); // Text to type (AI message)
  const typingDelay = 50; // Typing speed (adjust as needed)

  // Handle typing animation
  useEffect(() => {
    if (currentIndex < typingText.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + typingText[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, typingDelay);

      return () => clearTimeout(timeout);
    } else if (typingText.length > 0) {
      // Add the completed AI message to the chat history
      setChatHistory((prev) => [
        ...prev,
        { sender: "ai", message: typingText },
      ]);
      setCurrentText(""); // Clear current text
      setTypingText(""); // Clear typing text
      setCurrentIndex(0); // Reset index
    }
  }, [currentIndex, typingText]);

  // Function to handle message submission
  const handleMessageSubmit = async (message: string) => {
    if (message.trim()) {
      setThinking(true);

      // Add user's message to chat history
      setChatHistory((prev) => [...prev, { sender: "user", message }]);

      // Clear input field
      setUserMessage("");

      setLoading(true); // Set loading to true

      try {
        const response = await fetch("/api/ask-paicman", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userMessage: message }),
        });

        const data = await response.json();
        const aiMessage = data.reply;

        // Start typing animation for AI's message
        setTypingText(aiMessage);
      } catch (error) {
        console.error("Error sending message to AIfrica:", error);
      } finally {
        setLoading(false); // Set loading to false
        setThinking(false);
      }
    }
  };

  useEffect(() => {
    // Initial AI message
    setChatHistory((prev) => [
      ...prev,
      { sender: "ai", message: "How can I help you today?" },
    ]);
  }, []);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='sm'
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: "#c0c0c0",
          border: "2px solid #808080",
          boxShadow: "none",
          borderRadius: "4px",
          padding: "8px",
          fontFamily: 'W95FA, "Microsoft Sans Serif", Arial, sans-serif',
        },
      }}
    >
      {/* Title Bar */}
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#000080",
          color: "white",
          padding: "4px 8px",
          fontSize: "14px",
          fontWeight: "bold",
          textTransform: "uppercase",
          borderBottom: "2px solid #808080",
        }}
      >
        AIfrica Chat
        <Button
          onClick={onClose}
          sx={{
            color: "white",
            minWidth: "24px",
            height: "24px",
            fontSize: "12px",
            backgroundColor: "#800000",
            border: "1px solid #ffffff",
            "&:hover": {
              backgroundColor: "#990000",
            },
          }}
        >
          X
        </Button>
      </DialogTitle>

      {/* Chat Content */}
      <DialogContent
        sx={{
          padding: "8px",
          backgroundColor: "#c0c0c0",
          border: "2px inset #ffffff",
          fontFamily: 'W95FA, "Microsoft Sans Serif", Arial, sans-serif',
        }}
      >
        {/* Chat messages */}
        <Box
          sx={{
            height: "300px",
            overflowY: "auto",
            backgroundColor: "#ffffff",
            border: "2px inset #808080",
            padding: "8px",
            marginBottom: "8px",
            fontSize: "12px",
            color: "#000000",
          }}
        >
          {chatHistory.map((chat, index) => (
            <Box key={index} sx={{ marginBottom: "8px" }}>
              <Typography
                variant='body2'
                color={chat.sender === "user" ? "black" : "#000080"}
                sx={{
                  fontWeight: chat.sender === "ai" ? "bold" : "normal",
                }}
              >
                <strong>{chat.sender === "user" ? "You" : "AIfrica"}:</strong>{" "}
                {chat.message}
              </Typography>
            </Box>
          ))}
          {/* AI's typing animation */}
          {currentText && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <Typography variant='body2' color='#000080'>
                <strong>AIfrica:</strong> {currentText}
              </Typography>
              <img
                src={typingGif}
                alt='Typing...'
                style={{
                  width: "24px",
                  height: "24px",
                  marginLeft: "8px",
                }}
              />
            </Box>
          )}
          {thinking && !currentText && (
            <Box sx={{ marginBottom: "8px" }}>
              <Typography variant='body2' color='#000080'>
                <strong>AIfrica:</strong> Thinking...
              </Typography>
            </Box>
          )}
        </Box>

        {/* Input Field and Send Button */}
        <Box sx={{ display: "flex", gap: "4px" }}>
          <TextField
            fullWidth
            placeholder='Type your message here...'
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            variant='outlined'
            InputProps={{
              sx: {
                fontSize: "12px",
                backgroundColor: "#ffffff",
                border: "2px inset #808080",
              },
            }}
            disabled={loading}
          />
          <Button
            variant='contained'
            onClick={() => handleMessageSubmit(userMessage)}
            disabled={loading || !userMessage.trim()}
            sx={{
              backgroundColor: "#c0c0c0",
              border: "2px outset #ffffff",
              color: "#000000",
              fontSize: "12px",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#b0b0b0",
              },
            }}
          >
            {loading ? "Sending..." : "Send"}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ChatBox;
