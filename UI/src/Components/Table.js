import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import '../Styles/Table.css';

const columns = [
  { id: 'name', label: 'Name'},
  { id: 'email', label: 'Email'},
  {
    id: 'currentLocation',
    label: 'Current Location',
    align: 'center',
  },
  {
    id: 'preferredLocation',
    label: 'Preferred Location',
    align: 'center',
  },
  {
    id: 'yoe',
    label: 'YOE',
    align: 'center',
  },
  {
    id: 'skills',
    label: 'Skills',
    align: 'center',
  },
];

function createData(name, email, currentLocation, preferredLocation, yoe, skills) {
  return { name, email, currentLocation, preferredLocation, yoe, skills };
}

const rows = [
  createData('XYZ', 'XYZ@persistent.com', 'Pune','Pune', 10, 'Html, css, js, react'),
  createData('XYZ', 'XYZ@persistent.com','Pune', 'Pune', 10, 'Html, css, js, react'),
  createData('XYZ', 'XYZ@persistent.com','Pune', 'Pune', 10, 'Html, css, js, react'),
  createData('XYZ', 'XYZ@persistent.com','Pune', 'Pune', 10, 'Html, css, js, react'),
  createData('XYZ', 'XYZ@persistent.com', 'Pune','Pune', 10, 'Html, css, js, react'),
  createData('XYZ', 'XYZ@persistent.com', 'Pune','Pune', 10, 'Html, css, js, react'),
  createData('XYZ', 'XYZ@persistent.com','Pune', 'Pune', 10, 'Html, css, js, react'),
  createData('XYZ', 'XYZ@persistent.com','Pune', 'Pune', 10, 'Html, css, js, react'),
  createData('XYZ', 'XYZ@persistent.com', 'Pune','Pune', 10, 'Html, css, js, react'),
  createData('XYZ', 'XYZ@persistent.com', 'Pune','Pune', 10, 'Html, css, js, react'),
  createData('XYZ', 'XYZ@persistent.com', 'Pune','Pune', 10, 'Html, css, js, react'),
  createData('XYZ', 'XYZ@persistent.com', 'Pune','Pune', 10, 'Html, css, js, react'),
  createData('XYZ', 'XYZ@persistent.com', 'Pune','Pune', 10, 'Html, css, js, react'),
  createData('XYZ', 'XYZ@persistent.com', 'Pune','Pune', 10, 'Html, css, js, react'),
  createData('XYZ', 'XYZ@persistent.com', 'Pune', 'Pune', 10, 'Html, css, js, react'),
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor:'#EDF2F7',
      fontWeight: 'bold'
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <>
    <Paper className='tablePaperContainer'>
      <TableContainer sx={{ maxHeight: 375 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead className='tableHead'>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <StyledTableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </StyledTableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </>
  );
}