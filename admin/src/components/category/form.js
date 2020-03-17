import React,{ useState, useContext, useEffect } from 'react';
import {CategoryContext} from '../../contexts/CategoryContext';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import moment from 'moment'; 


const useStyles = makeStyles({
  dialog: {
    minWidth: 600
  }
});

export default function FormDialog(props) {
  // console.log(props)
  const category = useContext(CategoryContext);
  const classes = useStyles();
  
  const [categoryData, setCategoryData] = useState({
    name: '',
    description: ''
  })

  const { handleClose, open, selectedCategory } = props;
  // console.log(selectedCategory)

  useEffect(() => {
    if(selectedCategory) {
      setCategoryData({
        ...selectedCategory
      })
    }
  },[selectedCategory]);

  const handleChange = (e) => {
    const {value, name} = e.target
    setCategoryData({
      ...categoryData,
      [name]: value
    })
  }
  const addCtg = () => {   
    if(selectedCategory){
      const updateData = {
        "name" : categoryData.name,
        "description":categoryData.description
      }
      category.updateCategory(updateData, selectedCategory['id']);
      props.handleClose(false)
      // props.selectedCategory = null
    }else{
      category.addCategory(categoryData);
      props.handleClose(false)
    }
  };

  return (
    <div>
        
      <Dialog  open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle className={classes.dialog} id="form-dialog-title">Add Category</DialogTitle>
        <DialogContent>
         
          <TextField
            autoFocus
            value={categoryData.name}
            onChange={handleChange}
            margin="dense"
            id="name"
            name="name"
            label="Category Name"
            type="text"
            fullWidth
          />
          <TextField
            value={categoryData.description}
            onChange={handleChange}
            margin="dense"
            id="description"
            name="description"
            label="Category Description"
            multiline
            rows="2"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addCtg} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}