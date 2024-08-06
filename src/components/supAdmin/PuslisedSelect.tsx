import React from 'react';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface PuslisedSelectProps {
  publishedStatus: boolean;
  setPublishedStatus: (value: boolean) => void;
}

const PuslishedSelect: React.FC<PuslisedSelectProps> = ({
  publishedStatus,
  setPublishedStatus,
}) => {

  const handleChange = (event: SelectChangeEvent) => {
    setPublishedStatus(JSON.parse(event.target.value));
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="published-select-label">{`Publié ( true / false )`}</InputLabel>
      <Select
        labelId="published-select-label"
        id="published-select"
        value={JSON.stringify(publishedStatus)}
        onChange={handleChange}
        label={`Publié ( true / false )`}
      >
        <MenuItem value={"true"}>True</MenuItem>
        <MenuItem value={"false"}>False</MenuItem>
      </Select>
    </FormControl>
  );
}

export default PuslishedSelect;
