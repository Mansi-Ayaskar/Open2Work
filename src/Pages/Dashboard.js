import React, { useState } from 'react';
import NavBar from "../Components/NavBar";
import Table from "../Components/Table";
import Filters from "../Components/Filters";
import rows from "../Data/JsonData";
import "../Styles/Dashboard.css";

const Dashboard = () => {
    function createData(id, name, email, currentLocation, preferredLocation, yoe, skills) {
        return { id, name, email, currentLocation, preferredLocation, yoe, skills };
    }
    
    const [filterText, setFilterText] = useState('');

    const filteredRows = rows.filter(row => {
        return row.name.toLowerCase().includes(filterText)
            || row.email.toLowerCase().includes(filterText) 
            || row.currentLocation.toLowerCase().includes(filterText)
            || row.preferredLocation.toLowerCase().includes(filterText)
            || row.skills.some(val => val.toLowerCase().includes(filterText));
    });

    return (
        <div className="dashboard">
            <NavBar className="navBar"/>
            <Filters className="filters" setFilterText={setFilterText}  />
            <Table className="table" rows={filteredRows} />
        </div>
    );
};

export default Dashboard;