import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { groupedFormations } from "@/data/listeFromation";
import ListSubheader from "@mui/material/ListSubheader";

interface FormationProps {
  formation: string;
  setFormation: (value: string) => void;
}

const FormationSelect: React.FC<FormationProps> = ({
  formation,
  setFormation,
}) => {
  const [listCategory, setListCategory] = React.useState<any>([]);

  const getAllDomaines = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/domaine/all-domaine`);

    if (response.ok) {
      const result = await response.json();
      setListCategory(result)
    }
  }

  React.useEffect(() => {
    getAllDomaines();
    // let catList: string[] = [];
    // Object.keys(groupedFormations).forEach((category) => {
    //   catList.push(category);
    // });
    // setListCategory(catList);
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
        {listCategory && listCategory.map((i: any, index: number) => {
          return (
            <MenuItem key={`formationCategori${index}`} value={i}>
              <span className="text-wrap">{i.name}</span>
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default FormationSelect;
