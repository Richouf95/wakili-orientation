import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface FormationProps {
  formation: string;
  setFormation: React.Dispatch<React.SetStateAction<string>>;
}

const FormationSelect: React.FC<FormationProps> = ({
  formation,
  setFormation,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    setFormation(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-autowidth-label">Formation</InputLabel>
      <Select
        labelId="demo-simple-select-autowidth-label"
        id="formation"
        value={formation}
        onChange={handleChange}
        label="Formation"
      >
        <MenuItem value={"Finance"}>Finance</MenuItem>
        <MenuItem value={"Commerce"}>Commerce</MenuItem>
        <MenuItem value={"Médecine"}>Médecine</MenuItem>
        <MenuItem value={"Droit"}>Droit</MenuItem>
        <MenuItem value={"Education"}>Education</MenuItem>
        <MenuItem value={"Logistique"}>Logistique</MenuItem>
        <MenuItem value={"Administration"}>Administration</MenuItem>
        <MenuItem value={"Informatique"}>Informatique</MenuItem>
      </Select>
    </FormControl>
  );
};

export default FormationSelect;
