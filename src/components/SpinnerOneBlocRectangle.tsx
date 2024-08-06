import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

function SpinnerOneBlocRectangle() {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Skeleton
        sx={{ bgcolor: "#303134", width: 1, height: 200 }}
        variant="rectangular"
      />
    </Box>
  );
}

export default SpinnerOneBlocRectangle;
