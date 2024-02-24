import React from 'react';
import "../Styles/Filters.css";
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Filters = () => {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    };
  
    return (
        <div className="filterContainer">
            <div className='headerContainer'>
                <p className='headerTitle'>Your talent search simplified !</p>
                <p className='headerSubTitle'>Dream, Create, Collaborate, Your next project Awaits !</p>
            </div>
            <div className='fliters'>
                <SearchIcon className="icon"/>
                {/* ------------Search bar----------------- */}
                <TextField className="searchField" id="standard-basic" label="Search name, skills or any keyword ..." variant="standard" />
                <div className='vl'></div>
                <LocationOnIcon className="icon"/>
                {/* ---------Dropdown------------ */}
                <FormControl className='locationDropdown' variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
                    <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={age}
                    onChange={handleChange}
                    label="Age"
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                {/* ------------- Find Employees Button -------------------- */}
                <button className='findEmployees'>Find Employees</button>
            </div>
        </div>
    );
};

export default Filters;