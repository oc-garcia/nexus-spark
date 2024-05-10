import { useState } from "react";
import { Box, TextField, Button, Typography, colors, Skeleton, Divider } from "@mui/material";
import { runChat } from "@/services/gemini";
import { useTheme } from "@mui/system";
import { IMessage, IMessagePart } from "@/interfaces/IMessage";
import SendIcon from "@mui/icons-material/Send";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { keyframes } from "@emotion/react";
import { v4 as uuidv4 } from "uuid";

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
    const botMessage: IMessage = {
      role: "model",
      parts: [{ text: responseText }],
    };
    setMessages([...messagesHistory, userMessage, botMessage]);
    setNewMessage("");
    setIsSending(false);
  };

  const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

  return (
    <Box sx={{ flex: 1 }}>
      <Box>
        {messages.map((message, index) => (
          <>
            <Typography
              key={uuidv4()}
              style={{ color: message.role === "model" ? theme.palette.text.primary : theme.palette.text.secondary }}>
              <span>{message.role === "user" ? "Você" : "Nexus"}</span>:{" "}
              {message.parts.map((part: IMessagePart) => part.text).join(" ")}
            </Typography>
            {message.role === "model" && index !== messages.length - 1 ? (
              <Divider sx={{ margin: "1rem 0 1rem 0" }} />
            ) : null}
          </>
        ))}
        {isSending && (
          <>
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          </>
        )}
      </Box>
      <Box sx={{ display: "flex", marginTop: "1rem" }}>
        <TextField
          sx={{ borderRadius: "0 16px 16px 0" }}
          variant="outlined"
          fullWidth
          value={newMessage}
          onChange={handleNewMessageChange}
        />
        <Button
          sx={{ borderRadius: "0 16px 16px 0" }}
          variant="contained"
          color="primary"
          onClick={handleSendMessage}
          disabled={isSending}
          endIcon={isSending ? <AutorenewIcon sx={{ animation: `${spin} 2s linear infinite` }} /> : <SendIcon />}>
          Enviar
        </Button>
      </Box>
    </Box>
  );
};

export default Chat;
