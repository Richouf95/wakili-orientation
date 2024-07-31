import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CloseIcon from "@mui/icons-material/Close";
import ContactForm from "./ContactForm";
import Typography from "@mui/material/Typography";

const MobilContactUs = () => {
  const [openDrawer, setOpenDrawer] = React.useState<boolean>(false);

  const toggleDrawer =
    (x: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setOpenDrawer(x);
    };

  return (
    <>
      <div>
        <button
          onClick={toggleDrawer(true)}
          className="flex justify-center items-center bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-5 rounded-full"
        >
          <svg
            viewBox="-2.4 -2.4 28.80 28.80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            transform="matrix(-1, 0, 0, 1, 0, 0)rotate(0)"
            stroke="#bb2525"
            width={30}
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="#CCCCCC"
              strokeWidth="0.192"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
              <rect
                x="3"
                y="5"
                width="18"
                height="14"
                rx="2"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
              ></rect>{" "}
            </g>
          </svg>
          Nous contacter
        </button>
        <Drawer
          anchor="bottom"
          open={openDrawer}
          onClose={toggleDrawer(false)}
          sx={{
            width: "auto",
            backgroundColor: "rgba(0, 0, 0, .5)",
            "& > *": {
              backgroundColor: "none",
              borderRadius: "20px 20px 0 0",
            },
          }}
        >
          <Box
            sx={{
              width: "auto",
              maxHeight: "80vh",
              overflowY: "auto",
              border: "10px solid white",
            }}
            // onClick={toggleDrawer(true)}
            // onKeyDown={toggleDrawer(false)}
            className="px-5 py-5"
          >
            <Typography id="modal-modal-title" variant="h4" component="h2" className="text-center">
              Contactez-nous
            </Typography>
            <ContactForm />
          </Box>
        </Drawer>
      </div>
    </>
  );
};

export default MobilContactUs;
