import React, { useState } from "react";
import { Box, TextField, Button, Typography, colors, Skeleton, Divider, Snackbar, Alert } from "@mui/material";
import { runChat } from "@/services/gemini";
import { useTheme } from "@mui/system";
import { IMessage, IMessagePart } from "@/interfaces/IMessage";
import SendIcon from "@mui/icons-material/Send";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { keyframes } from "@emotion/react";
import { v4 as uuidv4 } from "uuid";
import { systemDirective } from "@/utils/geminiDirectives";
import { User } from "firebase/auth";

interface ChatProps {
  user: User | null;
}

const Chat: React.FC<ChatProps> = ({ user }) => {
  const [messages, setMessages] = useState<IMessage[]>([...systemDirective]);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
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
    if (responseText === "error") {
      setMessages([...systemDirective]);
      setNewMessage("");
      setIsSending(false);
      setOpenSnackbar(true);
      return;
    }
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

  const handleCloseSnackbar = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ flex: 1 }}>
      <Box>
        {messages.slice(2).map((message, index) => (
          <React.Fragment key={uuidv4()}>
            <Typography
              style={{ color: message.role === "model" ? theme.palette.text.primary : theme.palette.text.secondary }}>
              <span>{message.role === "user" ? "Você" : "Nexus"}</span>:{" "}
              {message.parts.map((part: IMessagePart) => part.text).join(" ")}
            </Typography>
            {message.role === "model" && index !== messages.slice(2).length - 1 ? (
              <Divider sx={{ margin: "1rem 0 1rem 0" }} />
            ) : null}
          </React.Fragment>
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
          color={theme.palette.mode === "dark" ? "primary" : "secondary"}
          disabled={isSending}
          autoComplete="off"
          onChange={handleNewMessageChange}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSendMessage();
              event.preventDefault();
            }
          }}
        />
        <Button
          sx={{ borderRadius: "0 16px 16px 0" }}
          variant="contained"
          color={theme.palette.mode === "dark" ? "primary" : "secondary"}
          onClick={handleSendMessage}
          disabled={isSending}
          endIcon={isSending ? <AutorenewIcon sx={{ animation: `${spin} 2s linear infinite` }} /> : <SendIcon />}>
          Enviar
        </Button>
      </Box>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: "100%" }}>
          Ocorreu um erro. O chat foi reiniciado.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Chat;
