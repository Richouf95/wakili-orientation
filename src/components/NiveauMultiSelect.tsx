import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(service: string, niveaux: readonly string[], theme: Theme) {
  return {
    fontWeight:
      niveaux.indexOf(service) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface NiveauMultiSelectProps {
  niveaux: string[];
  setNiveaux: (value: string[]) => void;
}

const NiveauMultiSelect: React.FC<NiveauMultiSelectProps> = ({
  niveaux,
  setNiveaux
}) => {
  const theme = useTheme();

  const services = [
    "École primaire",
    "Collège",
    "Lycée",
    "Supérieur",
    "Centre de formation"
  ];

  const handleChange = (event: SelectChangeEvent<typeof niveaux>) => {
    const {
      target: { value },
    } = event;
    setNiveaux(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <Box sx={{ width: 1 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-multiple-chip-label">Niveau</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={niveaux}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Niveauw" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {services.map((service) => (
            <MenuItem
              key={service}
              value={service}
              style={getStyles(service, niveaux, theme)}
            >
              {service}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default NiveauMultiSelect;