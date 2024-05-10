import { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { runChat } from "@/services/gemini";
import { useTheme } from "@mui/system";

interface Message {
  user: string;
  text: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const theme = useTheme();

  const handleNewMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = async () => {
    setMessages([...messages, { user: "Você", text: newMessage }]);
    const response = await runChat(newMessage);
    setMessages([...messages, { user: "Você", text: newMessage }, { user: "Chatbot", text: response }]);
    setNewMessage("");
  };

  return (
    <Box>
      <Box>
        {messages.map((message, index) => (
          <Typography key={index} style={{ color: theme.palette.text.primary }}>
            <span>{message.user}</span>: {message.text}
          </Typography>
        ))}
      </Box>
      <Box>
        <TextField variant="outlined" fullWidth value={newMessage} onChange={handleNewMessageChange} />
        <Button variant="contained" color="primary" onClick={handleSendMessage}>
          Enviar
        </Button>
      </Box>
    </Box>
  );
};

export default Chat;
