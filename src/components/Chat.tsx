import { useState } from "react";
import { Box, TextField, Button, Typography, colors } from "@mui/material";
import { runChat } from "@/services/gemini";
import { useTheme } from "@mui/system";
import { IMessage, IMessagePart } from "@/interfaces/IMessage";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const theme = useTheme();

  const handleNewMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = async () => {
    let messagesHistory = [...messages];
    setIsSending(true);
    const userMessage: IMessage = {
      role: "user",
      parts: [{ text: newMessage }],
    };
    const responseText = await runChat(newMessage, messages);
    console.log(responseText);
    const botMessage: IMessage = {
      role: "model",
      parts: [{ text: responseText }],
    };
    setMessages([...messagesHistory, userMessage, botMessage]);
    setNewMessage("");
    setIsSending(false);
  };

  return (
    <Box>
      <Box>
        {messages.map((message, index) => (
          <Typography key={index} style={{ color: theme.palette.text.primary }}>
            <span>{message.role === "user" ? "Você" : "Nexus"}</span>:{" "}
            {message.parts.map((part: IMessagePart) => part.text).join(" ")}
          </Typography>
        ))}
      </Box>
      <Box>
        <TextField variant="outlined" fullWidth value={newMessage} onChange={handleNewMessageChange} />
        <Button variant="contained" color="primary" onClick={handleSendMessage} disabled={isSending}>
          Enviar
        </Button>
      </Box>
    </Box>
  );
};

export default Chat;
