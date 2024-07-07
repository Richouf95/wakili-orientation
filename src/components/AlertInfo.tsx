import * as React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

export default function AlertInfo() {
  const [open, setOpen] = React.useState(true);

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
          Nous ajoutons constamment de nouvelles écoles. <br />
          Revenez bientôt pour des mises à jour !
        </Alert>
      </Collapse>
    </Box>
  );
}
