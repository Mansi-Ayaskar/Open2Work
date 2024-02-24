import React from 'react';
import NavBar from "../Components/NavBar";
import Table from "../Components/Table";
import Filters from "../Components/Filters";
import "../Styles/Dashboard.css";

const Dashboard = () => {
    return (
        <div className="dashboard">
            <NavBar className="navBar"/>
            <Filters className="filters"/>
            <Table className="table"/>
        </div>
    );
};

export default Dashboard;