import React, { useEffect, useState } from 'react';
import NavBar from '../Components/NavBar';
import Table from '../Components/Table';
import Filters from '../Components/Filters';
import rows from '../Data/JsonData';
import '../Styles/Dashboard.css';
import useGetEmployees from '../hooks/use-get-employee';

const Dashboard = () => {
  const [filterText, setFilterText] = useState('');

  const getEmployees = useGetEmployees();

  if (getEmployees.isLoading) {
    return <p>Loading...</p>;
  }
  if (getEmployees.isError) return <p>Error :(</p>;

  const data = getEmployees.data;
  console.log('Data: ', data);
  if (data == null) {
    return <p>No Data Found</p>;
  }

  //   useEffect(() => {
  //     const getData = async () => {
  //       try {
  //         const data = await fetch(
  //           'http://10.53.103.204:5000/getAllRegisteredEmployees'
  //         );
  //         console.log('test: ', data);
  //       } catch (e) {
  //         console.log('Error: ', e);
  //       }
  //     };

  //     getData();
  //   }, []);
  const filteredRows = rows.filter((row) => {
    return (
      row.name.toLowerCase().includes(filterText) ||
      row.email.toLowerCase().includes(filterText) ||
      row.currentLocation.toLowerCase().includes(filterText) ||
      row.preferredLocation.toLowerCase().includes(filterText) ||
      row.skills.some((val) => val.toLowerCase().includes(filterText))
    );
  });

  return (
    <div className="dashboard">
      <NavBar className="navBar" />
      <Filters className="filters" setFilterText={setFilterText} />
      <Table className="table" rows={filteredRows} />
    </div>
  );
};

export default Dashboard;
