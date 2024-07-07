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

function getStyles(service: string, servicesParaScolaire: readonly string[], theme: Theme) {
  return {
    fontWeight:
      servicesParaScolaire.indexOf(service) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface ServicesParaScolaireSelectProps {
  servicesParaScolaire: string[];
  setServicesParaScolaire: (value: string[]) => void;
}

const ServicesParaScolaireSelect: React.FC<ServicesParaScolaireSelectProps> = ({
  servicesParaScolaire,
  setServicesParaScolaire
}) => {
  const theme = useTheme();

  const services = [
    "Cantine",
    "Transport",
    "Infirmerie",
    "Bibliothèque",
    "Technologies",
  ];

  const handleChange = (event: SelectChangeEvent<typeof servicesParaScolaire>) => {
    const {
      target: { value },
    } = event;
    setServicesParaScolaire(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <Box sx={{ width: 1 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-multiple-chip-label">Services</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={servicesParaScolaire}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Services" />}
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
              style={getStyles(service, servicesParaScolaire, theme)}
            >
              {service}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default ServicesParaScolaireSelect;