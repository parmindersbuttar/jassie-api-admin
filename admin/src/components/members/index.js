import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {MembersContext} from '../../contexts/MembersContext';
import moment from 'moment'; 
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const MembersPage = () => {
  const classes = useStyles();
  const members = useContext(MembersContext);
  useEffect(() => {
    members.getUsers();
  },[]);
  const rows = () => {
    if (members.data){
      return members.data && members.data.map(row => (
          <TableRow key={row.email}>
            <TableCell component="th" scope="row">
              {row.email}
            </TableCell>
            <TableCell align="right">{row.name}</TableCell>
            <TableCell align="right">{moment(row.createdAt).format("MMM Do, YYYY")}</TableCell>
            <TableCell align="right">action</TableCell>
          </TableRow>
        ))
    } else {
      return null;
    }
  }
 

  
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense23 table">
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Created At</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { rows() }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MembersPage;