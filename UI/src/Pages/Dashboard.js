import React, { useEffect, useState } from 'react';
import NavBar from '../Components/NavBar';
import Table from '../Components/Table';
import Filters from '../Components/Filters';
import rows from '../Data/JsonData';
import '../Styles/Dashboard.css';
import useGetEmployees from '../hooks/use-get-employee';

const Dashboard = () => {
  const [filterText, setFilterText] = useState('');
  const [employeeData, setEmployeeData] = useState();
  const [filteredData, setFilteredData] = useState();

  const getEmployees = useGetEmployees();
  useEffect(() => {
    getEmployees.refetch().then((res) => {
      const filteredRows = res.data.filter((row) => {
        return (
          row.name.toLowerCase().includes(filterText) ||
          row.email.toLowerCase().includes(filterText) ||
          row.currentLocation.toLowerCase().includes(filterText) ||
          row.preferredLocation.toLowerCase().includes(filterText) ||
          row.skills.some((val) => val.toLowerCase().includes(filterText))
        );
      });
      setEmployeeData(filteredRows);
      setFilteredData(filteredRows);
    });
  }, []);

  useEffect(() => {
    const filteredRows = employeeData?.filter((row) => {
      return (
        row.name.toLowerCase().includes(filterText) ||
        row.email.toLowerCase().includes(filterText) ||
        row.location.toLowerCase().includes(filterText) ||
        row.preferred_location.toLowerCase().includes(filterText) ||
        row.key_skills.toLowerCase().includes(filterText)
      );
    });
    setFilteredData(filteredRows);
  }, [filterText]);

  return (
    <div className="dashboard">
      <NavBar className="navBar" />
      <Filters className="filters" setFilterText={setFilterText} />
      {filteredData && <Table className="table" rows={filteredData} />}
      {getEmployees.isLoading && <p>Loading...</p>}
      {getEmployees.isError && <p>Error</p>}
    </div>
  );
};

export default Dashboard;
