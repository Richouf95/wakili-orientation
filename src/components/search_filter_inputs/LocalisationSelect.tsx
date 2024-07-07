import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";


interface LocalisationProps {
  localisation: string;
  setLocalisation: (value: string) => void;
}

const LocalisationSelect: React.FC<LocalisationProps> = ({
  localisation,
  setLocalisation
}) => {

  const handleChange = (event: SelectChangeEvent) => {
    setLocalisation(event.target.value);
  };

  return (
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-autowidth-label">
           Localisation
        </InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="localisation"
          value={localisation}
          onChange={handleChange}
          label="Type d'École Localisation"
        >
          <MenuItem value={"Agadez"}>Agadez</MenuItem>
                  <MenuItem value={"Diffa"}>Diffa</MenuItem>
                  <MenuItem value={"Dosso"}>Dosso</MenuItem>
                  <MenuItem value={"Maradi"}>Maradi</MenuItem>
                  <MenuItem value={"Niamey"}>Niamey</MenuItem>
                  <MenuItem value={"Tahoua"}>Tahoua</MenuItem>
                  <MenuItem value={"Tillaberi"}>Tillaberi</MenuItem>
                  <MenuItem value={"Zinder"}>Zinder</MenuItem>
        </Select>
      </FormControl>
  );
}

export default LocalisationSelect;