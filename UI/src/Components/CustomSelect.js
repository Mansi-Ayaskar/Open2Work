import { Select, MenuItem, OutlinedInput } from '@mui/material';

const CustomSelect = ({ name, value, onChange, items, isMulti }) => {
  return (
    <Select
      input={<OutlinedInput label="Multiple Select" />}
      name={name}
      value={value}
      onChange={onChange}
      multiple={isMulti}
    >
      {items.map((item) => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))}
    </Select>
  );
};

export default CustomSelect;
