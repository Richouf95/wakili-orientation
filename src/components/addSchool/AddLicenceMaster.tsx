"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function AddLicenceMaster() {
  const [nombreFormation, setNombreFormation] = useState<String[]>([]);

  return (
    <div className="my-10 bg-[#4f585786] p-5 rounded-xl ">
      <Box sx={{ width: 1 }}>
        <TextField
          fullWidth
          label="Arreté d'autorisation"
          id="nomEtablissement"
          // onChange={(e) => setNomEtablissement(e.target.value)}
        />
      </Box>
      {nombreFormation.map((i, index) => {
        return (
          <div className="flex justify-end" key={index}>
            <Box sx={{ width: 700, my: 2 }}>
              <TextField
                fullWidth
                label="Nom de la formation"
                id="nomEtablissement"
                // onChange={(e) => setNomEtablissement(e.target.value)}
              />
            </Box>            
          </div>

        );
      })}
      <div className="text-center">
        <button
          onClick={() => {
            let nb = [...nombreFormation];
            nb.push("hehe");
            setNombreFormation(nb);
          }}
          className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-5 rounded-full md:w-3/5 mt-5"
        >
          Ajouter une formation
        </button>
      </div>
    </div>
  );
}

export default AddLicenceMaster;
