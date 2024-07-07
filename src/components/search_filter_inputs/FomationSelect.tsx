import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { groupedFormations } from "@/data/listeFromation";
import ListSubheader from "@mui/material/ListSubheader";

interface FormationProps {
  formation: string;
  setFormation: React.Dispatch<React.SetStateAction<string>>;
}

const FormationSelect: React.FC<FormationProps> = ({
  formation,
  setFormation,
}) => {
  const [listCategory, setListCategory] = React.useState<string[]>([]);

  React.useEffect(() => {
    let catList: string[] = [];
    Object.keys(groupedFormations).forEach((category) => {
      catList.push(category);
    });
    setListCategory(catList);
  }, []);

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
        {listCategory.map((i, index) => {
          return (
            <MenuItem key={`formationCategori${index}`} value={i}>
              {i}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default FormationSelect;
