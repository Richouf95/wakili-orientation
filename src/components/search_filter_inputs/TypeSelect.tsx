import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface TypeEtablissementProps {
  typeEtablissement: string;
  setTypeEtablissement: (value: string) => void;
}

const TypeEtablissementSelect: React.FC<TypeEtablissementProps> = ({
  typeEtablissement,
  setTypeEtablissement,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    setTypeEtablissement(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-autowidth-label">
        Type d'établissement
      </InputLabel>
      <Select
        labelId="demo-simple-select-autowidth-label"
        id="type"
        value={typeEtablissement}
        onChange={handleChange}
        label="Type d'établissement"
      >
        <MenuItem value={"Public"}>Public</MenuItem>
        <MenuItem value={"Privé"}>Privé</MenuItem>
      </Select>
    </FormControl>
  );
};

export default TypeEtablissementSelect;
