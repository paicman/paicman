import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  AppBar,
  Toolbar,
  styled,
  keyframes,
} from "@mui/material";
import ChatBox from "./ChatBox";

interface DesktopIcon {
  id: string;
  name: string;
  iconUrl: string;
}

// Keyframes for icon click animation
const clickAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(0.95); }
  100% { transform: scale(1); }
`;

// Styled components
const DesktopContainer = styled(Box)({
  height: "100vh",
  width: "100%",
  position: "relative",
  overflow: "hidden",
  backgroundImage: `url('https://i.pinimg.com/originals/45/d0/79/45d0790c293e5dba3077f4ad0c4826c6.gif')`, // Replace with actual background when available
  backgroundSize: "cover",
  backgroundPosition: "center",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    pointerEvents: "none",
  },
});

const IconPaper = styled(Paper)(({ selected }: { selected?: boolean }) => ({
  width: "80px",
  backgroundColor: selected ? "rgba(0, 0, 128, 0.3)" : "transparent",
  boxShadow: "none",
  cursor: "pointer",
  transition: "background-color 0.1s",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  "&:active": {
    animation: `${clickAnimation} 0.2s ease`,
  },
}));

const IconImage = styled("img")({
  width: "32px",
  height: "32px",
  imageRendering: "pixelated",
  filter: "drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.5))",
});

const Window = styled(Paper)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "384px",
  height: "256px",
  borderRadius: 0,
  border: "2px solid #c0c0c0",
  animation: "windowOpen 0.2s ease-out",
  "@keyframes windowOpen": {
    from: {
      transform: "translate(-50%, -50%) scale(0.95)",
      opacity: 0,
    },
    to: {
      transform: "translate(-50%, -50%) scale(1)",
      opacity: 1,
    },
  },
});

const WindowTitle = styled(Box)({
  backgroundColor: "#000080",
  padding: "4px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  cursor: "default",
});

const TaskBar = styled(AppBar)({
  top: "auto",
  bottom: 0,
  backgroundColor: "#c0c0c0",
  borderTop: "2px solid #ffffff",
});

const StartButton = styled("button")({
  padding: "2px 16px",
  backgroundColor: "#c0c0c0",
  border: "2px solid #ffffff",
  borderRight: "2px solid #808080",
  borderBottom: "2px solid #808080",
  fontSize: "14px",
  fontFamily: 'W95FA, "Microsoft Sans Serif", Arial, sans-serif',
  fontWeight: "bold",
  cursor: "pointer",
  "&:active": {
    border: "2px solid #808080",
    borderRight: "2px solid #ffffff",
    borderBottom: "2px solid #ffffff",
  },
});

const Windows95Desktop = () => {
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [openChat, setOpenChat] = useState(false);

  const [time] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );

  const desktopIcons: DesktopIcon[] = [
    {
      id: "computer",
      name: "My Computer",
      iconUrl: "/api/placeholder/32/32",
    },
    {
      id: "dex",
      name: "Dex Screener",
      iconUrl: "/api/placeholder/32/32",
    },
    {
      id: "pacman-ai",
      name: "Pacman",
      iconUrl: "/api/placeholder/32/32",
    },
  ];

  const handleIconClick = (id: string) => {
    setSelectedIcon(id);
  };

  const handleIconDoubleClick = (id: string) => {
    setActiveWindow(id);
    setSelectedIcon(null);
    if (id === "pacman-ai") {
      setOpenChat(true);
    } else {
      setOpenChat(false); // Close ChatBox when opening other apps
    }
  };

  const handleCloseWindow = () => {
    setActiveWindow(null);
    setOpenChat(false); // Close ChatBox when closing the window
  };

  return (
    <DesktopContainer>
      {/* Desktop Icons */}
      <Box sx={{ p: 2, display: "grid", gridTemplateColumns: "1fr", gap: 3 }}>
        {desktopIcons.map((icon) => (
          <IconPaper
            key={icon.id}
            selected={selectedIcon === icon.id}
            onClick={() => handleIconClick(icon.id)}
            onDoubleClick={() => handleIconDoubleClick(icon.id)}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 1,
                gap: 1,
              }}
            >
              <IconImage src={icon.iconUrl} alt={icon.name} />
              <Typography
                variant='caption'
                sx={{
                  color: "white",
                  textAlign: "center",
                  textShadow: "1px 1px 1px rgba(0, 0, 0, 0.5)",
                  fontFamily:
                    'W95FA, "Microsoft Sans Serif", Arial, sans-serif',
                  fontSize: "11px",
                  userSelect: "none",
                }}
              >
                {icon.name}
              </Typography>
            </Box>
          </IconPaper>
        ))}
      </Box>
      {activeWindow && activeWindow === "pacman-ai" && (
        <ChatBox open={openChat} onClose={() => setOpenChat(false)} />
      )}
      {activeWindow && activeWindow !== "pacman-ai" && (
        <Window>
          <WindowTitle>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconImage
                src={
                  desktopIcons.find((icon) => icon.id === activeWindow)?.iconUrl
                }
                alt=''
                style={{ width: "16px", height: "16px" }}
              />
              <Typography
                variant='caption'
                sx={{
                  color: "white",
                  fontFamily:
                    'W95FA, "Microsoft Sans Serif", Arial, sans-serif',
                  fontSize: "11px",
                }}
              >
                {desktopIcons.find((icon) => icon.id === activeWindow)?.name}
              </Typography>
            </Box>
            <IconButton
              size='small'
              onClick={handleCloseWindow}
              sx={{
                color: "black",
                backgroundColor: "#c0c0c0",
                borderRadius: 0,
                p: 0.5,
                minWidth: "20px",
                minHeight: "20px",
                border: "1px solid #ffffff",
                borderRight: "1px solid #808080",
                borderBottom: "1px solid #808080",
                "&:active": {
                  border: "1px solid #808080",
                  borderRight: "1px solid #ffffff",
                  borderBottom: "1px solid #ffffff",
                },
              }}
            >
              ×
            </IconButton>
          </WindowTitle>
          <Box
            sx={{
              p: 2,
              bgcolor: "#fff",
              height: "calc(100% - 32px)",
              overflow: "auto",
            }}
          >
            <Typography
              sx={{
                fontFamily: 'W95FA, "Microsoft Sans Serif", Arial, sans-serif',
              }}
            >
              Content for {activeWindow}
            </Typography>
          </Box>
        </Window>
      )}

      {/* Taskbar */}
      <TaskBar position='fixed' elevation={0}>
        <Toolbar variant='dense' sx={{ minHeight: 32 }}>
          <StartButton>Start</StartButton>
          <Typography
            variant='caption'
            sx={{
              ml: "auto",
              fontFamily: 'W95FA, "Microsoft Sans Serif", Arial, sans-serif',
              fontSize: "11px",
            }}
          >
            {time}
          </Typography>
        </Toolbar>
      </TaskBar>
    </DesktopContainer>
  );
};

export default Windows95Desktop;
