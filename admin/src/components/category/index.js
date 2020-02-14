import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {CategoryContext} from '../../contexts/CategoryContext';
import moment from 'moment'; 
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const CategoryPage = () => {
  const classes = useStyles();
  const category = useContext(CategoryContext);
  console.log(category)
  useEffect(() => {
    category.getCtg();
  },[]);

  const rows = () => {
    if (category.data){
      return category.data && category.data.map(row => (
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
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Sno.</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">HOD</TableCell>
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

export default CategoryPage;