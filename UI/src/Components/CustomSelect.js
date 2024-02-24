import { Select, MenuItem } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import '../Styles/CustomSelect.css';

const CustomSelect = ({ label, name, value, onChange, items, isMulti }) => {
  return (
    <FormControl variant="standard" className="customSelect">
      <InputLabel id="demo-simple-select-standard-label">{label}</InputLabel>
      <Select name={name} value={value} onChange={onChange} multiple={isMulti}>
        {items.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
