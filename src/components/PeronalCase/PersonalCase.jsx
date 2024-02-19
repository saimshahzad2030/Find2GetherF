import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import style from './PersonalCase.module.css'
import TableRow from '@mui/material/TableRow';
import { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import axios from 'axios';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
export default function PersonalCase() {

  const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

    function createData(type,value) {
        return { type,value };
      }
//   const rows = [
//     createData('Id', JSON.parse(localStorage.getItem('clicked case'))._id),
//     createData('Name', JSON.parse(localStorage.getItem('clicked case')).name),
//     createData('Father name', JSON.parse(localStorage.getItem('clicked case')).fName),
//     createData('Phone No', JSON.parse(localStorage.getItem('clicked case')).contact),
//     createData('City', JSON.parse(localStorage.getItem('clicked case')).city),
//     createData('Adress', JSON.parse(localStorage.getItem('clicked case')).address),
//     createData('Age', JSON.parse(localStorage.getItem('clicked case')).age),
//     createData('Missing Since', JSON.parse(localStorage.getItem('clicked case')).date),
//     createData('Mental Health', JSON.parse(localStorage.getItem('clicked case')).mentalCondition),

    
// ];
const [caseData, setCaseData] = React.useState(null);

const [rows, setRows] = React.useState([]);
useEffect(() => {
    // Fetch case data from local storage on component mount
    const clickedCase = JSON.parse(localStorage.getItem('clicked case'));
    const newRows = [
      createData('Id', clickedCase._id),
      createData('Name', clickedCase.name),
      createData('Father name', clickedCase.fName),
      createData('Phone No', clickedCase.contact),
      createData('City', clickedCase.city),
      createData('Adress', clickedCase.address),
      createData('Age', clickedCase.age),
      createData('Missing Since', clickedCase.date),
      createData('Mental Health', clickedCase.mentalCondition)
  ];

  // Update the rows state
  setRows(newRows);
    setCaseData(clickedCase);
}, [caseData]);

return (
    caseData && (
        <div className={style.tableRow}>
            <h1>Case-Type: {caseData.caseType === 'sus' ? 'Suspect' : 'Missing'}</h1>
            <div className={style.imagePreviewRow}>
                <img
                    src={caseData.imgUrl}
                    alt="Preview"
                    style={{ maxWidth: '200px', maxHeight: 'auto', marginRight: '10px' }}
                />
            </div>
            <TableContainer component={Paper} style={{ width: '50%', marginTop: '30px' }}>
                <Table style={{ maxWidth: 650 }} aria-label="simple table">
                    <TableBody>
                    {rows.map((row) => (
            <TableRow
              key={row.type}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.type}
              </TableCell>
              <TableCell align="center">{row.value}</TableCell>
              
            </TableRow>
          ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button
                variant="outlined"
                sx={{ fontWeight: 'bold', color: 'red', border: '2px red solid', width: '140px', marginTop: '25px', marginBottom: '20px' }}
                onClick={() => {
                    // localStorage.removeItem('clicked case');
                    setOpen(true)
                    console.log(caseData._id)
                }}
            >
                Delete Case
            </Button>
            <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You are taking responsibility to delte the case uploaded fromyour side
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" sx={{ fontWeight: 'bold', color: 'blue', border: '2px rgb(0,51,140) solid', width: '140px', marginTop: '25px', marginBottom: '20px' }}
               >Cancel</Button>
          <Button onClick={()=>{
           
            console.log("Case ID to be sent:", rows[0].value); // Log the caseId before making the request
            const postData = {
              caseId: rows[0].value
             
            }
            axios.post('http://localhost:3333/user/deleteCase',   postData, {
              headers: {
                  'Content-Type': 'application/json'
              }
          }).then(response => {
            if(response.status!==401 ||response.status!==520 ){
             console.log(response.data)
            console.log(caseData)
            }
          })
          .catch(error => {
            if(error.response){
             console.log(error)
            //  console.log(caseData._Id)
            //  console.log(rows[0].value)

            }
            console.error('Error:', error);
          }
          )
          setOpen(false);
          }} variant="outlined" sx={{ fontWeight: 'bold', color: 'red', border: '2px red solid', width: '140px', marginTop: '25px', marginBottom: '20px' }}
                autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
        </div>
    )
);
}