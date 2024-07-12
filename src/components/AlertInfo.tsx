import * as React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

interface AlertInfoProps {
  searchEvent: boolean
}

const AlertInfo: React.FC<AlertInfoProps> = ({searchEvent}) => {
  const [open, setOpen] = React.useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [middleWayScroll, setMiddleWayScroll] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    setScrollPosition(scrollPercent);

    if (scrollPercent >= 50) {
      setMiddleWayScroll(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (middleWayScroll && searchEvent) {
      setOpen(true)
    }
  }, [middleWayScroll, searchEvent])

  return (
    <Box
      sx={{ width: "95%", margin: "auto", padding: "10px", opacity: "100%" }}
    >
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2, bgcolor: "#F97316", textAlign: "center" }}
          className="text-lg text-white"
          severity="info"
        >
          Merci de visiter notre plateforme.<br />
          Nous ajoutons continuellement de nouvelles écoles. <br />
          Revenez bientôt pour des mises à jour !
        </Alert>
      </Collapse>
    </Box>
  );
}

export default AlertInfo;
