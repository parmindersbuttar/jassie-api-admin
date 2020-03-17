import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import { CategoryContext } from "../../contexts/CategoryContext";
import CatrgoryForm from "./form";
import DeleteAlert from "./deleteCategory";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  button: {
    minWidth: 10,
    margin: "0px 5px"
  }
});

const CategoryPage = () => {
  const classes = useStyles();
  const category = useContext(CategoryContext);
  const [open, setOpen] = useState(false);
  const [selectedCategory, setCategory] = useState(null);
  const [delOpen, setDelOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  useEffect(() => {
    category.getCategory();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const editClickOpen = item => {
    setCategory(item);
    setOpen(true);
  };

  const handleClose = () => {
    setCategory(null);
    setDeleteId(null);
    setDelOpen(false);
    setOpen(false);
  };

  const deleteCategory = id => {
    setDeleteId(id);
    setDelOpen(true);
  };

  const rows = () => {
    if (category.data) {
      return (
        category.data &&
        category.data.map((row, index) => (
          <TableRow key={row.id}>
            <TableCell component="th" scope="row">
              {index + 1}
            </TableCell>
            <TableCell align="right">{row.name}</TableCell>
            <TableCell align="right">
              {moment(row.createdAt).format("MMM Do, YYYY")}
            </TableCell>
            <TableCell align="right">
              <Button
                className={classes.button}
                size="small"
                variant="outlined"
                color="primary"
                onClick={() => editClickOpen(row)}
              >
                <EditIcon />
              </Button>
              <Button
                className={classes.button}
                size="small"
                variant="outlined"
                color="secondary"
                onClick={() => deleteCategory(row.id)}
              >
                <DeleteIcon />
              </Button>
            </TableCell>
          </TableRow>
        ))
      );
    } else {
      return null;
    }
  };

  return (
    <TableContainer component={Paper}>
      <Button
        size="small"
        variant="contained"
        color="primary"
        startIcon={<AddCircleOutlineIcon />}
        onClick={handleClickOpen}
      >
        Add Category
      </Button>

      <CatrgoryForm
        open={open}
        handleClose={handleClose}
        selectedCategory={selectedCategory}
      />
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Sno.</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">HOD</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{rows()}</TableBody>
      </Table>
      <DeleteAlert
        open={delOpen}
        handleClose={handleClose}
        deleteId={deleteId}
      />
    </TableContainer>
  );
};

export default CategoryPage;
