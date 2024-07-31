import * as React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

export default function TransitionAlerts() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setOpen(true);
    }, 7000);
  }, []);

  return (
    <div className="flex justify-center md:justify-start">
      <div className="fixed z-10 bottom-12">
        <Box sx={{ maxWidth: "500px" }}>
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
              sx={{ mb: 2, background: "#EC8E50" }}
            >
              <div>
                <p className="text-center font-bold text-lg m-0">
                  Créez une présentation unique pour votre établissement
                </p>
                <p className="text-center">
                  Utilisez l'éditeur ci-dessous pour rédiger et personnaliser la
                  présentation de votre établissement selon vos besoins. <br />
                  Exprimez votre vision et faites ressortir ce qui rend votre
                  établissement exceptionnel !
                </p>
              </div>
            </Alert>
          </Collapse>
        </Box>
      </div>
    </div>
  );
}
