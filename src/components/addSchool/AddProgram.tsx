import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import AddBTS from "./AddBTS";
import AddLicenceMaster from "./AddLicenceMaster";

function AddProgram() {
  const [btsOrLicencMaster, setBtsOrLicencMaster] = useState("");

  const [nombreLot, setNombreLot] = useState<String[]>([]);

  const handleChange = (event: SelectChangeEvent) => {
    setBtsOrLicencMaster(event.target.value);
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4 text-center">
        Ajouter un Licence Master
      </h3>
      <div className="text-center">
        <button
          onClick={() => {
            let nb = [...nombreLot];
            nb.push("hehe");
            setNombreLot(nb);
          }}
          className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-5 rounded-full md:w-3/5 my-5"
        >
          Ajouter un groupe
        </button>
      </div>
      {nombreLot.map((i, index) => {
        return <AddLicenceMaster key={index}/>;
      })}
    </div>
  );
}

export default AddProgram;
