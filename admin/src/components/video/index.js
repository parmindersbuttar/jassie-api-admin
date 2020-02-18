import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {VideoContext} from '../../contexts/VideoContext';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import moment from 'moment'; 
import VideoForm from './videoForm';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    button:{
      minWidth: 10,
    },
    button1:{
        minWidth: 10,
        margin:'0 10px 0px 0px'
    }
  });

const VideosPage = () => {
  const classes = useStyles();
  const video = useContext(VideoContext); 
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    video.getVideo();
  },[]);

  const rows = () => {
    if (video.data){
      return video.data && video.data.map((row,index) => (
          <TableRow key={row.id}>
            <TableCell component="th" scope="row">
              {index+1}
            </TableCell>
            <TableCell align="right">{row.name}</TableCell>
            <TableCell align="right">{row.filename}</TableCell>
            <TableCell align="right">{moment(row.updatedAt).format("MMM Do, YYYY")}</TableCell>
            <TableCell align="right">
              <Button className={classes.button1} size="small" variant="outlined" color="primary" >
                <EditIcon />
              </Button>
              <Button className={classes.button} size="small" variant="outlined" color="secondary">
                <DeleteIcon />
              </Button>
            </TableCell>
          </TableRow>
        ))
    } else {
      return null;
    }
  }

  return (
    <TableContainer component={Paper}>
        <Button size="small" variant="contained" color="primary" startIcon={<AddCircleOutlineIcon />} onClick={handleClickOpen}>
          Add Video
        </Button>
    <Table className={classes.table} size="small" >
        <TableHead>
        <TableRow>
            <TableCell>Sno.</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Filename</TableCell>
            <TableCell align="right">Last Updated</TableCell>
            <TableCell align="right">Action</TableCell>
        </TableRow>
        </TableHead>
        <TableBody>
            {rows()}
        </TableBody>
    </Table>
    <VideoForm open={open} handleClose={handleClose} />
    </TableContainer>
  );
}

export default VideosPage;