import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface NiveauProps {
  niveauEtude: string;
  setNiveauEtude: (value: string) => void;
}

const NiveauSelect: React.FC<NiveauProps> = ({
  niveauEtude,
  setNiveauEtude,
}) => {
  
  const handleChange = (event: SelectChangeEvent) => {
    setNiveauEtude(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-autowidth-label">Niveau</InputLabel>
      <Select
        labelId="demo-simple-select-autowidth-label"
        id="type"
        value={niveauEtude}
        onChange={handleChange}
        label="Niveau"
      >
        <MenuItem value={"École primaire"}>École primaire</MenuItem>
        <MenuItem value={"Collège"}>Collège</MenuItem>
        <MenuItem value={"Lycée"}>Lycée</MenuItem>
        <MenuItem value={"Supérieur"}>Supérieur</MenuItem>
        <MenuItem value={"Centre de formation"}>Centre de formation</MenuItem>
      </Select>
    </FormControl>
  );
};

export default NiveauSelect;
