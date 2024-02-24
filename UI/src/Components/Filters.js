import React, { useState } from 'react';
import '../Styles/Filters.css';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Filters = (props) => {
  const [age, setAge] = useState('');
  const [filterText, setFilterText] = useState('');

  const handleChangeText = (event) => {
    const val = event.target.value.toLowerCase();
    setFilterText(val);
    props.setFilterText(val);
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div className="filterContainer">
      <div className="fliters">
        <SearchIcon className="icon" />
        {/* ------------Search bar----------------- */}
        <TextField
          className="searchField"
          label="Search key skills"
          variant="standard"
          onChange={handleChangeText}
          //   sx={{
          //     '& .MuiInputLabel-root': { fontSize: '14px' }, // Change label font size
          //     '& .MuiInputBase-root': { height: '25px' } // Change input height
          //   }}
        />
        <div className="vl"></div>
        <LocationOnIcon className="icon" />
        {/* ---------Dropdown------------ */}
        <FormControl
          className="locationDropdown"
          variant="standard"
          sx={{ minWidth: 120 }}
        >
          <InputLabel id="demo-simple-select-standard-label">
            Location
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={age}
            onChange={handleChange}
            label="Location"
            // sx={{
            //   '& .MuiInputLabel-root': { fontSize: '14px' }, // Change label font size
            //   '& .MuiFormControl-root': { height: '25px' }, // Change select height
            //   '& .MuiSelect-select': { fontSize: '16px' } // Change menu item font size (optional)
            // }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={'Pune'}>Pune</MenuItem>
            <MenuItem value={'Mumbai'}>Mumbai</MenuItem>
            <MenuItem value={'Kochi'}>Kochi</MenuItem>
          </Select>
        </FormControl>
        {/* ------------- Find Employees Button -------------------- */}
        <button className="findEmployees">Find Employees</button>
      </div>
    </div>
  );
};

export default Filters;
