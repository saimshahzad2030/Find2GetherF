import React, { useEffect, useState } from 'react'
import style from './Cases.module.css'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import { Flex } from 'antd';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Import the Back icon


//pagination
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


//table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
export default function Cases() {
    const [suspectClicked,setSuspectClicked] = useState(true)
    const [missingClicked,setMissingClicked] = useState(false)
    const [caseClicked,setCaseClicked] = useState(false)
    const [caseSelected,setCaseSelected] = useState({})
    const [missingCaseSelected,setMissingCaseSelected] = useState({})

//pagination
const [page, setPage] = React.useState(1);
//   const handleChangePage = ;
// console.log(page)
     const [value, setValue] = React.useState(0);
    //  {
    //     "_id": "65d25d2861abfb9b96c1a466",
    //     "name": "sdasd",
    //     "fName": "dasdsa",
    //     "contact": "212312312312",
    //     "city": "sdasdasdsad",
    //     "address": "sdasdsadasd",
    //     "age": "dsadasd",
    //     "reportedBy": "dsadasd",
    //     "caseType": "mis",
    //     "date": "dsadsad",
    //     "mentalCondition": "dsadsad",
    //     "imgUrl": "https://firebasestorage.googleapis.com/v0/b/find2gether-5c895.appspot.com/o/images%2Fmis-sdasddsadsad?alt=media",
    //     "__v": 0
    //   }
const [suspects,setSuspects]=useState([])
const [suspectGroups, setSuspectGroups] = useState([]);
const [missings,setMissings]=useState([])
const [missingGroups, setMissingGroups] = useState([]);
useEffect(()=>{
    axios.get('http://localhost:3333/user/allSuspects')
        .then(response => {
          if(response.status!==401 ||response.status!==520 ){
            console.log(response.status)
            // console.log(response.data)
            setSuspects(response.data)
            
              }
        })
        .catch(error => {
          if(error.response){
                      console.error('Error:', error);
                      
              
          }
        })
// console.log('suspect group: ',suspectGroups)
axios.get('http://localhost:3333/user/allMissings')
        .then(response => {
          if(response.status!==401 ||response.status!==520 ){
            console.log(response.status)
            // console.log(response.data)
            setMissings(response.data)
            
              }
        })
        .catch(error => {
          if(error.response){
                      console.error('Error:', error);
                      
              
          }
        })
// console.log('suspect group: ',suspectGroups)


}

,[])
useEffect(()=>{
    console.log('suspects: ',suspects)
    console.log('suspectGroups: ',suspectGroups)
    setSuspectGroups(chunkArray(suspects, 5))
},[suspects])
useEffect(()=>{
    console.log('suspects: ',suspects)
    console.log('suspectGroups: ',suspectGroups)
    setMissingGroups(chunkArray(missings, 5))
},[missings])
const suspectRows = [
    createData('Id', caseSelected._id),
    createData('Name', caseSelected.name),
    createData('Father name', caseSelected.fName?caseSelected.fName:'not specified'),
    createData('Phone No', caseSelected.contact),
    createData('City', caseSelected.city),
    createData('Adress', caseSelected.address),
    createData('Age', caseSelected.age),
    createData('Date on which found', caseSelected.date),
    createData('Mental Health', caseSelected.mentalCondition),

    
];
    // const suspects = [{
    //     id:1,name:'Alice Khan',ageGroup:'10-20',contact:'0321-3232343',mentalCondition:'stable',reportedBy:'mr Khan',
    //     dated:'12-12-12',foundFrom:'abdullah masjid, lahore',caseNo:'sus-1',imageUrl:process.env.PUBLIC_URL + '/Assets/carrousel/1.jpg'
    // },
    // {
    //     id:2,name:'Alice Khan',ageGroup:'10-20',contact:'0321-3232343',mentalCondition:'stable',reportedBy:'mr Khan',
    //     dated:'12-12-12',foundFrom:'abdullah masjid, lahore',caseNo:'sus-2',imageUrl:process.env.PUBLIC_URL + '/Assets/carrousel/1.jpg'
    // },
    // {
    //     id:3,name:'Alice Khan',ageGroup:'10-20',contact:'0321-3232343',mentalCondition:'stable',reportedBy:'mr Khan',
    //     dated:'12-12-12',foundFrom:'abdullah masjid, lahore',caseNo:'sus-3',imageUrl:process.env.PUBLIC_URL + '/Assets/carrousel/1.jpg'
    // },
    // {
    //     id:4,name:'Alice Khan',ageGroup:'10-20',contact:'0321-3232343',mentalCondition:'stable',reportedBy:'mr Khan',
    //     dated:'12-12-12',foundFrom:'abdullah masjid, lahore',caseNo:'sus-4',imageUrl:process.env.PUBLIC_URL + '/Assets/carrousel/3.jpg'
    // },
    // {
    //     id:5,name:'Alice Khan',ageGroup:'10-20',contact:'0321-3232343',mentalCondition:'stable',reportedBy:'mr Khan',
    //     dated:'12-12-12',foundFrom:'abdullah masjid, lahore',caseNo:'sus-5',imageUrl:process.env.PUBLIC_URL + '/Assets/carrousel/1.jpg'
    // },
    // {
    //     id:6,name:'Alice Khan',ageGroup:'10-20',contact:'0321-3232343',mentalCondition:'stable',reportedBy:'mr Khan',
    //     dated:'12-12-12',foundFrom:'abdullah masjid, lahore',caseNo:'sus-6',imageUrl:process.env.PUBLIC_URL + '/Assets/carrousel/2.jpg'
    // },
    // {
    //     id:7,name:'Alice Khan',ageGroup:'10-20',contact:'0321-3232343',mentalCondition:'stable',reportedBy:'mr Khan',
    //     dated:'12-12-12',foundFrom:'abdullah masjid, lahore',caseNo:'sus-7',imageUrl:process.env.PUBLIC_URL + '/Assets/carrousel/1.jpg'
    // },
    // {
    //     id:8,name:'Alice Khan',ageGroup:'10-20',contact:'0321-3232343',mentalCondition:'stable',reportedBy:'mr Khan',
    //     dated:'12-12-12',foundFrom:'abdullah masjid, lahore',caseNo:'sus-8',imageUrl:process.env.PUBLIC_URL + '/Assets/carrousel/3.jpg'
    // },
    // {
    //     id:9,name:'Alice Khan',ageGroup:'10-20',contact:'0321-3232343',mentalCondition:'stable',reportedBy:'mr Khan',
    //     dated:'12-12-12',foundFrom:'abdullah masjid, lahore',caseNo:'sus-9',imageUrl:process.env.PUBLIC_URL + '/Assets/carrousel/1.jpg'
    // },
    // {
    //     id:10,name:'Alice Khan',ageGroup:'10-20',contact:'0321-3232343',mentalCondition:'stable',reportedBy:'mr Khan',
    //     dated:'12-12-12',foundFrom:'abdullah masjid, lahore',caseNo:'sus-10',imageUrl:process.env.PUBLIC_URL + '/Assets/carrousel/1.jpg'
    // },
    // {
    //     id:11,name:'Alice Khan',ageGroup:'10-20',contact:'0321-3232343',mentalCondition:'stable',reportedBy:'mr Khan',
    //     dated:'12-12-12',foundFrom:'abdullah masjid, lahore',caseNo:'sus-11',imageUrl:process.env.PUBLIC_URL + '/Assets/carrousel/1.jpg'
    // },
    // {
    //     id:12,name:'Alice Khan',ageGroup:'10-20',contact:'0321-3232343',mentalCondition:'stable',reportedBy:'mr Khan',
    //     dated:'12-12-12',foundFrom:'abdullah masjid, lahore',caseNo:'sus-12',imageUrl:process.env.PUBLIC_URL + '/Assets/carrousel/2.jpg'
    // },
    // {
    //     id:13,name:'Alice Khan',ageGroup:'10-20',contact:'0321-3232343',mentalCondition:'stable',reportedBy:'mr Khan',
    //     dated:'12-12-12',foundFrom:'abdullah masjid, lahore',caseNo:'sus-13',imageUrl:process.env.PUBLIC_URL + '/Assets/carrousel/3.jpg'
    // },
    // {
    //     id:14,name:'Alice Khan',ageGroup:'10-20',contact:'0321-3232343',mentalCondition:'stable',reportedBy:'mr Khan',
    //     dated:'12-12-12',foundFrom:'abdullah masjid, lahore',caseNo:'sus-14',imageUrl:process.env.PUBLIC_URL + '/Assets/carrousel/1.jpg'
    // },
    // {
    //     id:15,name:'Alice Khan',ageGroup:'10-20',contact:'0321-3232343',mentalCondition:'stable',reportedBy:'mr Khan',
    //     dated:'12-12-12',foundFrom:'abdullah masjid, lahore',caseNo:'sus-15',imageUrl:process.env.PUBLIC_URL + '/Assets/carrousel/2.jpg'
    // }]


// Function to chunk array into groups of 5
function chunkArray(arr, size) {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
}
// const suspectGroups = chunkArray(suspects, 5);





    // const missingCases = [{
    //     id:1,name:'Alice Khan',age:'10',contact:'0321-3232343',mentalCondition:'stable',fatherName:'abdullah',
    //     missingSince:'12-12-12',area:'abdullah chowkk',city:'Khi',reportedBy:'dasdsadsa',caseNo:'mis-1',imageUrl:process.env.PUBLIC_URL + '/Assets/carrousel/1.jpg'

    // },
    // {
    //     id:2,name:'Alice Khan',age:'10',contact:'0321-3232343',mentalCondition:'stable',fatherName:'abdullah',
    //     missingSince:'12-12-12',area:'abdullah chowkk',city:'Khi',reportedBy:'dasdsadsa',caseNo:'mis-2',imageUrl:process.env.PUBLIC_URL + '/Assets/carrousel/2.jpg'

    // },
    // {
    //     id:3,name:'Alice Khan',age:'10',contact:'0321-3232343',mentalCondition:'stable',fatherName:'abdullah',
    //     missingSince:'12-12-12',area:'abdullah chowkk',city:'Khi',reportedBy:'dasdsadsa',caseNo:'mis-3',imageUrl:process.env.PUBLIC_URL + '/Assets/carrousel/3.jpg'

    // },{
    //     id:1,name:'Alice Khan',age:'10',contact:'0321-3232343',mentalCondition:'stable',fatherName:'abdullah',
    //     missingSince:'12-12-12',area:'abdullah chowkk',city:'Khi',reportedBy:'dasdsadsa',caseNo:'mis-4',imageUrl:process.env.PUBLIC_URL + '/Assets/carrousel/2.jpg'
    // },
    // {
    //     id:2,name:'Alice Khan',age:'10',contact:'0321-3232343',mentalCondition:'stable',fatherName:'abdullah',
    //     missingSince:'12-12-12',area:'abdullah chowkk',city:'Khi',reportedBy:'dasdsadsa',caseNo:'mis-6',imageUrl:process.env.PUBLIC_URL + '/Assets/carrousel/2.jpg'
    // },
    // {
    //     id:3,name:'Alice Khan',age:'10',contact:'0321-3232343',mentalCondition:'stable',fatherName:'abdullah',
    //     missingSince:'12-12-12',area:'abdullah chowkk',city:'Khi',reportedBy:'dasdsadsa',caseNo:'mis-7',imageUrl:process.env.PUBLIC_URL + '/Assets/carrousel/1.jpg'
    // },{
    //     id:1,name:'Alice Khan',age:'10',contact:'0321-3232343',mentalCondition:'stable',fatherName:'abdullah',
    //     missingSince:'12-12-12',area:'abdullah chowkk',city:'Khi',reportedBy:'dasdsadsa',caseNo:'mis-8',imageUrl:process.env.PUBLIC_URL + '/Assets/carrousel/3.jpg'
    // },
    // {
    //     id:2,name:'Alice Khan',age:'10',contact:'0321-3232343',mentalCondition:'stable',fatherName:'abdullah',
    //     missingSince:'12-12-12',area:'abdullah chowkk',city:'Khi',reportedBy:'dasdsadsa',caseNo:'mis-9',imageUrl:process.env.PUBLIC_URL + '/Assets/carrousel/1.jpg'
    // },
    // {
    //     id:3,name:'Alice Khan',age:'10',contact:'0321-3232343',mentalCondition:'stable',fatherName:'abdullah',
    //     missingSince:'12-12-12',area:'abdullah chowkk',city:'Khi',reportedBy:'dasdsadsa',caseNo:'mis-10',imageUrl:process.env.PUBLIC_URL + '/Assets/carrousel/2.jpg'
    // }]
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
//   const missingGroups = chunkArray(missingCases, 5);



//table
function createData(type,value) {
    return { type,value };
  }
  
  

const missingCaseRows = [
    createData('Id', caseSelected._id),
    createData('Name', caseSelected.name),
    createData('Father name', caseSelected.fName),
    createData('Phone No', caseSelected.contact),
    createData('City', caseSelected.city),
    createData('Adress', caseSelected.area),
    createData('Age', caseSelected.age),
    createData('Date on which found', caseSelected.date),
    createData('Mental Health', caseSelected.mentalCondition),

    
];
  return (
    <>
    {(suspects && missings && missingGroups && suspectGroups) && <div className={style.mainCol} style={{display:caseClicked?'none':'flex'}}>
        <div className={style.child1}>
            <h1 >All Cases</h1>
        </div>
        <div className={style.child2}>
        <Box sx={{ width: '100%',display:'flex', flexDirection:'column', alignItems:'center'}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Suspects Cases" {...a11yProps(0)} onClick={()=>{setPage(1);setSuspectClicked(true);setMissingClicked(false)}} />
          <Tab label="Missing ones" {...a11yProps(1)}  onClick={()=>{setPage(1);setSuspectClicked(false);setMissingClicked(true)}} />
          </Tabs>
      </Box>
      

    </Box>
    {suspectClicked?
    (<>
   

 {suspectGroups[page - 1] && suspectGroups[page-1].map(suspect=>(
        <div className={style.suspectCase} key={suspect.suspect_id} onClick={()=>{console.log(suspect); setCaseClicked(true);setCaseSelected(suspect)}}>
        <div className={style.suspectChild1}>
            <img src={suspect.imgUrl} alt={123} />
        </div>
        <div className={style.suspectChild2}>
            <p className={style.suspectHeading}>{suspect.name}</p>
            <div className={style.detailsRow}>
                <div style={{display:'flex',flexDirection:'row',alignItems:'center',fontFamily:'calibri'}}>
                    <p className={style.suspectRowTitle}>Found from: </p>
                    <p className={style.suspectRowDefinition}> {suspect.address}, {suspect.city}</p> 
                </div>
                <div style={{display:'flex',flexDirection:'row',alignItems:'center',fontFamily:'calibri'}}>  
                    <p className={style.suspectRowTitle}>Reported by: </p>
                    <p className={style.suspectRowDefinition}>{suspect.reportedBy}</p>
                </div>
             </div>
             <div className={style.detailsRow}>
                <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                    <p className={style.suspectRowTitle}>Age group:  </p>
                    <p className={style.suspectRowDefinition}> {suspect.age}</p> 
                </div>
                <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>  
                    <p className={style.suspectRowTitle}>Mental Condition:</p>
                    <p className={style.suspectRowDefinition}>{suspect.mentalCondition}</p>
                </div>
             </div>
             <div className={style.detailsRow}>
                <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <p className={style.suspectRowTitle}>Contact#:  </p>
                    <p className={style.suspectRowDefinition}>{suspect.contact}</p> 
                </div>
                <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>  
                <p className={style.suspectRowTitle}>Dated:  </p>
                    <p className={style.suspectRowDefinition}>{suspect.date}</p> 
                </div>
             </div>
        </div>
       
    </div>
    ))
}
    <div className={style.pageDiv}>
     <Stack spacing={2} sx={{display:suspectClicked?'':'none', marginTop:'20px',marginBottom:'20px'}}>
      {/* <Typography>Page: {page}</Typography> */}
      <Pagination count={suspectGroups.length} page={page} onChange={(event, value) => {
    setPage(value);
    console.log('value: ',value)
  }} />
    </Stack>
     </div>
    
    </>
    ):
    (<>
     {missingGroups[page-1] && (missingGroups[page-1].map(missing=>(
        
        <div className={style.suspectCase} key={missing.caseNo} onClick={()=>{ setCaseClicked(true);setCaseSelected(missing)}}>
        <div className={style.suspectChild1}>
            <img src={missing.imgUrl} alt={missing.caseNo} />
        </div>
        <div className={style.suspectChild2}>
            <p className={style.suspectHeading}>{missing.name}</p>
            <div className={style.detailsRow}>
            <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>  
                    <p className={style.suspectRowTitle}>Father name: </p>
                    <p className={style.suspectRowDefinition}>{missing.fName}</p>
                </div>
                <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                    <p className={style.suspectRowTitle}>Missed from: </p>
                    <p className={style.suspectRowDefinition}> {missing.address}, {missing.city}</p> 
                </div>
                
             </div>
             <div className={style.detailsRow}>
                <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                    <p className={style.suspectRowTitle}>Age:  </p>
                    <p className={style.suspectRowDefinition}> {missing.age}</p> 
                </div>
                <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>  
                    <p className={style.suspectRowTitle}>Mental Condition:</p>
                    <p className={style.suspectRowDefinition}>{missing.mentalCondition}</p>
                </div>
             </div>
             <div className={style.detailsRow}>
                <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <p className={style.suspectRowTitle}>Contact#:  </p>
                    <p className={style.suspectRowDefinition}> {missing.contact}</p> 
                </div>
                <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>  
                <p className={style.suspectRowTitle}>Reported by:  </p>
                    <p className={style.suspectRowDefinition}> {missing.reportedBy}</p> 
                </div>
             </div>
             <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>  
                    <p className={style.suspectRowTitle}>Missing since: </p>
                    <p className={style.suspectRowDefinition}>{missing.date}</p>
                </div>
                
                
             
        </div>
       
    </div>
        )))}
      <div className={style.pageDiv}>
     <Stack spacing={2} sx={{display:missingClicked?'':'none', marginTop:'20px',marginBottom:'20px'}}>
      {/* <Typography>Page: {page}</Typography> */}
      <Pagination count={missingGroups.length} page={page} onChange={(event, value) => {
    setPage(value);
    
  }} />
    </Stack>
     </div>
    </>)}
   
        </div>
    </div>}
   <div className={style.clickedCaseSection} 
     style={{
         display:caseClicked === true?'flex':'none',marginBottom:'30px'
     }}>
     
        <div className={style.backButton} 
        onClick={()=>{
            setCaseClicked(false)
        }}
    style={{
         display:caseClicked === true?'flex':'none'
     }}>
        <Avatar>
  <ArrowBackIcon />
</Avatar>

        </div><p style={{display:caseClicked === true?'flex':'none',fontFamily:'calibri', fontSize:'50px',fontWeight:'bold'}}>Case Type: {caseSelected.caseType==='sus'?'Suspect':'Missing'}</p>
      
   <div className={style.tableRow} 
     style={{
         display:caseClicked === true?'flex':'none'
     }}>
         <div className={style.clickedImageDiv}>
    <img src={caseSelected.imgUrl} alt={123} />
       
    </div>
     <TableContainer component={Paper} sx={{
         width:'50%',
         marginTop:'30px'
     }}>
           <Table sx={{ maxWidth: 650 }} aria-label="simple table">
            
             <TableBody>
               { suspectRows.map((row) => (
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
     </div>
     
   </div>
     </>

  )
}
