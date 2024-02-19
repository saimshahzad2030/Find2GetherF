import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik';
import { TextField, Button,CircularProgress } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';

import Backdrop from '@mui/material/Backdrop';
//table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



//date picker
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';




import style from './FindingSomeone.module.css'


export default function FindingSomeone() {
    const [btnDisabled, setBtnDisabled] = useState(true);
    //Form Data    
    const [nameOfMissingOne, setNameOfMissingOne] = useState('')
    const [fatherNameValue, setFatherNameValue] = useState('')
    const [contactValue, setContactValue] = useState('')
    const [ageValue, setAgeValue] = useState('')
    const [cityValue, setCityValue] = useState('')
const [areaValue,setAreaValue] = useState('')
const [mentalCondition,setMentalCondition] = useState('')
const [dateValue,setDateValue] = useState('')
const [selectedFile, setSelectedFile] = useState([]);
// const [reportedBy,setReportedBy]=useState(null);
const [loadingToken, setLoadingToken] = useState(false);
const [caseSubmitted,setCaseSubmitted]=useState(false)
 //buttons controls

 const [nextClicked,setNextClicked] = useState(false)

//table
function createData(type,value) {
    return { type,value };
  }
  
  const rows = [
    createData('Name', nameOfMissingOne),
    createData('Father name', fatherNameValue),
    createData('Phone No', contactValue),
    createData('City', cityValue.value),
    createData('Adress', areaValue),
    createData('Age', ageValue),
    createData('Missing Since', dateValue===''?'':`${dateValue.getDate()}-${dateValue.getMonth() + 1}-${dateValue.getFullYear()}`),
    createData('Mental Health', mentalCondition.value),

    
];

    const [errors, setErrors] = useState({

        nameOfMissingPerson: '',
        fatherName: '',
        city: '',
        age: '',
        area: '',
        contact: '',
        mentalCondition:'',
        date:'',
        file:''
    });
    const cities =
        [
          { label: 'Islamabad', value: 'Islamabad' },
          { label: 'Ahmed Nager', value: 'Ahmed Nager' },
          { label: 'Ahmadpur East', value: 'Ahmadpur East' },
          { label: 'Ali Khan', value: 'Ali Khan' },
          { label: 'Alipur', value: 'Alipur' },
          { label: 'Arifwala', value: 'Arifwala' },
          { label: 'Attock', value: 'Attock' },
          { label: 'Bhera', value: 'Bhera' },
          { label: 'Bhalwal', value: 'Bhalwal' },
          { label: 'Bahawalnagar', value: 'Bahawalnagar' },
          { label: 'Bahawalpur', value: 'Bahawalpur' },
          { label: 'Bhakkar', value: 'Bhakkar' },
          { label: 'Burewala', value: 'Burewala' },
          { label: 'Chillianwala', value: 'Chillianwala' },
          { label: 'Chakwal', value: 'Chakwal' },
          { label: 'Chichawatni', value: 'Chichawatni' },
          { label: 'Chiniot', value: 'Chiniot' },
          { label: 'Chishtian', value: 'Chishtian' },
          { label: 'Daska', value: 'Daska' },
          { label: 'Dera Ghazi', value: 'Dera Ghazi' },
          { label: 'Dhaular', value: 'Dhaular' },
          { label: 'Dina', value: 'Dina' },
          { label: 'Dinga', value: 'Dinga' },
          { label: 'Dipalpur', value: 'Dipalpur' },
          { label: 'Faisalabad', value: 'Faisalabad' },
          { label: 'Fateh Jhang', value: 'Fateh Jhang' },
          { label: 'Ghakhar Mandi', value: 'Ghakhar Mandi' },
          { label: 'Gojra', value: 'Gojra' },
          { label: 'Gujranwala', value: 'Gujranwala' },
          { label: 'Gujrat', value: 'Gujrat' },
          { label: 'Gujar Khan', value: 'Gujar Khan' },
          { label: 'Hafizabad', value: 'Hafizabad' },
          { label: 'Haroonabad', value: 'Haroonabad' },
          { label: 'Hasilpur', value: 'Hasilpur' },
          { label: 'Haveli', value: 'Haveli' },
          { label: 'Lakha', value: 'Lakha' },
          { label: 'Jalalpur', value: 'Jalalpur' },
          { label: 'Jattan', value: 'Jattan' },
          { label: 'Jampur', value: 'Jampur' },
          { label: 'Jaranwala', value: 'Jaranwala' },
          { label: 'Jhang', value: 'Jhang' },
          { label: 'Jhelum', value: 'Jhelum' },
          { label: 'Kalabagh', value: 'Kalabagh' },
          { label: 'Karor Lal', value: 'Karor Lal' },
          { label: 'Kasur', value: 'Kasur' },
          { label: 'Kamalia', value: 'Kamalia' },
          { label: 'Kamoke', value: 'Kamoke' },
          { label: 'Khanewal', value: 'Khanewal' },
          { label: 'Khanpur', value: 'Khanpur' },
          { label: 'Kharian', value: 'Kharian' },
          { label: 'Khushab', value: 'Khushab' },
          { label: 'Kot Adu', value: 'Kot Adu' },
          { label: 'Jauharabad', value: 'Jauharabad' },
          { label: 'Lahore', value: 'Lahore' },
          { label: 'Lalamusa', value: 'Lalamusa' },
          { label: 'Layyah', value: 'Layyah' },
          { label: 'Liaquat Pur', value: 'Liaquat Pur' },
          { label: 'Lodhran', value: 'Lodhran' },
          { label: 'Malakwal', value: 'Malakwal' },
          { label: 'Mamoori', value: 'Mamoori' },
          { label: 'Mailsi', value: 'Mailsi' },
          { label: 'Mandi Bahauddin', value: 'Mandi Bahauddin' },
          { label: 'mian Channu', value: 'mian Channu' },
          { label: 'Mianwali', value: 'Mianwali' },
          { label: 'Multan', value: 'Multan' },
          { label: 'Murree', value: 'Murree' },
          { label: 'Muridke', value: 'Muridke' },
          { label: 'Mianwali Bangla', value: 'Mianwali Bangla' },
          { label: 'Muzaffargarh', value: 'Muzaffargarh' },
          { label: 'Narowal', value: 'Narowal' },
          { label: 'Okara', value: 'Okara' },
          { label: 'Renala Khurd', value: 'Renala Khurd' },
          { label: 'Pakpattan', value: 'Pakpattan' },
          { label: 'Pattoki', value: 'Pattoki' },
          { label: 'Pir Mahal', value: 'Pir Mahal' },
          { label: 'Qaimpur', value: 'Qaimpur' },
          { label: 'Qila Didar', value: 'Qila Didar' },
          { label: 'Rabwah', value: 'Rabwah' },
          { label: 'Raiwind', value: 'Raiwind' },
          { label: 'Rajanpur', value: 'Rajanpur' },
          { label: 'Rahim Yar', value: 'Rahim Yar' },
          { label: 'Rawalpindi', value: 'Rawalpindi' },
          { label: 'Sadiqabad', value: 'Sadiqabad' },
          { label: 'Safdarabad', value: 'Safdarabad' },
          { label: 'Sahiwal', value: 'Sahiwal' },
          { label: 'Sangla Hill', value: 'Sangla Hill' },
          { label: 'Sarai Alamgir', value: 'Sarai Alamgir' },
          { label: 'Sargodha', value: 'Sargodha' },
          { label: 'Shakargarh', value: 'Shakargarh' },
          { label: 'Sheikhupura', value: 'Sheikhupura' },
          { label: 'Sialkot', value: 'Sialkot' },
          { label: 'Sohawa', value: 'Sohawa' },
          { label: 'Soianwala', value: 'Soianwala' },
          { label: 'Siranwali', value: 'Siranwali' },
          { label: 'Talagang', value: 'Talagang' },
          { label: 'Taxila', value: 'Taxila' },
          { label: 'Toba Tek', value: 'Toba Tek' },
          { label: 'Vehari', value: 'Vehari' },
          { label: 'Wah Cantonment', value: 'Wah Cantonment' },
          { label: 'Wazirabad', value: 'Wazirabad' }
        ]
          
      const handleChangeAge = (e)=>{
        if (/^[0-9]+$/.test(e.target.value) ) {

            setAgeValue(e.target.value)
        }
      }
    const handleChangeName = (e) => {
        if (/^[A-Za-z]+$/.test(e.target.value) || e.target.value === '') {

            setNameOfMissingOne(e.target.value)
        }
    }
    const handleChangeContact = (e) => {
        if (/^[0-9]+$/.test(e.target.value) ) {

            setContactValue(e.target.value)
        }
    }
    const handleChangeFatherName = (e) => {
        if (/^[A-Za-z]+$/.test(e.target.value) || e.target.value === '') {

            setFatherNameValue(e.target.value)
        }

    }
//file picker
const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the first file from the event
    // setSelectedFile(file); // Update selected file state with the new file
    if (file && file.size <= 5 * 1024 * 1024) { // Check if file exists and its size is less than or equal to 5 MB
        setSelectedFile(file); // Update selected file state with the new file
       
        setErrors((prevErrors) => ({
            ...prevErrors,
            file: ''
        }));
      } 
      
      else {
        // File is either missing or exceeds size limit, handle accordingly
        setErrors((prevErrors) => ({
            ...prevErrors,
            file: 'file size must be less than 5mb'
        }));
      }
    console.log(selectedFile)

    // Automatically trigger the upload
  
  };
  const handleRemove = (index) => {
    const newFiles = [...selectedFile];
    newFiles.splice(index, 1);
    setSelectedFile(newFiles);
  };


    //date picker

    
  const handleDateChange = (date) => {
   
    setDateValue(date);
 
  };
    useEffect(
        () => {

            if (nameOfMissingOne === '') {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    nameOfMissingPerson: 'Required'
                }));
                setBtnDisabled(true)

            }
            else if(nameOfMissingOne !== ''){
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    nameOfMissingPerson: ''
                }));
             

            }

            if (fatherNameValue === '') {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    fatherName: 'Required'
                }));
                setBtnDisabled(true)

            }
            else if(fatherNameValue !== ''){
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    fatherName: ''
                }));
                
            }

            if (contactValue === '') {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    contact: 'Required'
                }));
                setBtnDisabled(true)

            }
            else if (contactValue.length !== 11) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    contact: 'Enter valid Number'
                }));
                setBtnDisabled(true)

            }
              else if(contactValue && contactValue.length === 11){
                setErrors((prevErrors)=>({
                ...prevErrors,
                  contact : ''
                }));
                
              }
              if (!ageValue ) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    age: 'Required'
                }));
                setBtnDisabled(true)

            }
            
            else if (ageValue){
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    age: ''
                }));
               
            }
            if (!cityValue) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    city: 'Required'
                }));
                setBtnDisabled(true)

            }
            else if (cityValue){
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    city: ''
                }));
                
            }
            if(!areaValue){
                setBtnDisabled(true)
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    area: 'Required'
                }));
            }
            else if(areaValue){
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    area: ''
                }));
               
            }
            if(!mentalCondition){
                setBtnDisabled(true)
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    mentalCondition: 'Required'
                }));
            }
            else if(mentalCondition){
              
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    mentalCondition: ''
                }));
            }
             if(dateValue === ''){
                setBtnDisabled(true)
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    date: 'Required'
                }));
            }
            else if(dateValue !== ''){
                
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    date: ''
                }));
            }
            
            if(selectedFile.length === 0){
                setBtnDisabled(true)
                
            }
            else if(errors.file!==''){
                setBtnDisabled(true)
                
            }
             if(selectedFile.length !== 0 && nameOfMissingOne !== '' && fatherNameValue  !== '' && contactValue  !== '' && ageValue !== '' && areaValue !== '' && mentalCondition !== '' && dateValue !== '' && cityValue  !== ''  &&errors.file===''){
                
               setBtnDisabled(false) 
            }
            console.log(selectedFile); // Should output "object" or "file"

        }
        , [nameOfMissingOne,errors.file, fatherNameValue,contactValue,ageValue,cityValue,areaValue,mentalCondition,dateValue,selectedFile]

    )
            
    const [formData, setFormData] = useState({
        
      });










    return (
        <>
            <Formik
                initialValues={{
                    name: nameOfMissingOne
                }}
                onSubmit={(values, { resetForm }) => {
                    resetForm({
                        values: {
                            name: ''
                        },
                    })






                }}
            >{({ touched }) => (

                <>

                    <Form style={{ width: '100%' }}
                        className={style.form}>
                        <h1
                        style={
                            {display:nextClicked===true?'none':''}
                        }>Fill Out the form below</h1>

                        <div className={style.row}
                        style={
                            {display:nextClicked===true?'none':''}
                        }
                        >


                            <Field
                              className = {style.field}
                                name="nameOfMissingPerson"
                                as={TextField}

                                id='outlined-basic'
                                value={nameOfMissingOne}
                                label="Name"
                                variant="outlined"
                                sx={{
                                    width: '30%',
                                    marginLeft: '20px'
                                }}

                                onChange={
                                    handleChangeName
                                }
                                error={errors.nameOfMissingPerson && touched.nameOfMissingPerson}
                                helpertext={errors.nameOfMissingPerson && touched.nameOfMissingPerson ? errors.nameOfMissingPerson : `Enter Missing Person's name`}

                            />

                            <Field

className = {style.field}
                                name="fathername"
                                as={TextField}

                                id='outlined-basic'
                                value={fatherNameValue}
                                label="Fathername"
                                variant="outlined"
                                sx={{
                                    width: '30%',
                                    marginLeft: '20px'
                                }}

                                onChange ={handleChangeFatherName}
                                error={errors.fatherName && touched.fathername}
                                helpertext={errors.fatherName && touched.fathername ? errors.fatherName : `Enter missing person's Father name`}

                            />
                            <Field

className = {style.field}
                                name="contact"
                                as={TextField}

                                id='outlined-basic'
                                value={contactValue}
                                label="Contact"
                                variant="outlined"
                                sx={{
                                    width: '30%',
                                    marginLeft: '20px'
                                }}
                                inputProps={{ minLength: 11, maxLength: 11 }} // Set the maximum length here

                                onChange={
                                    handleChangeContact
                                }
                                error={errors.contact && touched.contact}
                                helpertext={errors.contact && touched.contact ? errors.contact : `Enter Guardian's contact no.`}

                            />

                        </div> 
                        <div className={style.row}
                        style={
                            {display:nextClicked===true?'none':''}
                        }>
                   
                            <Autocomplete
                            
                            className = {style.field}
                                disablePortal
                                id="combo-box-demo"
                                options={cities}
                                sx={{ width: '30%' }}
                                renderInput={(params) => <Field
                                    as={TextField}
                                    {...params}
                                    label="City"
                                    name='city'
                                    value={cityValue}
                                   
                                    error={errors.city && touched.city}
                                    helpertext={errors.city && touched.city ? errors.city : `Select City where he went missing?`}

                                />}
                                    onChange={( e,value) =>{
                                        
                                        setCityValue(value)
                                    }
                                    }
                            />
 <Field

className = {style.field}
name="age"
as={TextField}

id='outlined-basic'
value={ageValue}
label="Age"
variant="outlined"
sx={{
    width: '30%',
    marginLeft: '20px'
}}
inputProps={{ minLength: 1, maxLength: 2}} // Set the maximum length here

onChange={
    
   handleChangeAge
}
error={errors.age && touched.age}
helpertext={errors.age && touched.age ? errors.age : `Enter Age?`}

/>
                          

<Field

className = {style.field}
name="area"
as={TextField}

id='outlined-basic'
value={areaValue}
label="Area"
variant="outlined"
sx={{
    width: '30%',
    marginLeft: '20px'
}}

onChange ={
    (e)=>{
        setAreaValue(e.target.value)
    }
}
error={errors.area && touched.area}
helpertext={errors.area && touched.area ? errors.area : `Enter Area i.e L-22street 23... bp road`}

/>

                        </div>
<div className={style.row}
style={
    {display:nextClicked===true?'none':''}
}>
<Autocomplete

className = {style.field}
                                disablePortal
                                id="combo-box-demo"
                                options={[
                                    {label:'Stable',value:'stable'},{label:'Unstable',value:'unstable'}
                                ]}
                                sx={{ width: '30%' }}
                                renderInput={(params) => <Field
                                    as={TextField}
                                    {...params}
                                    name='mentalCondition'
                                    label="Mental Condition"
                                    value={ageValue}
                                    error={errors.mentalCondition && touched.mentalCondition}
                                    helpertext={errors.mentalCondition && touched.mentalCondition ? errors.mentalCondition : `Specify Mental Condition`}

                                />}
                                onChange={( e,value) =>{
                                        
                                    setMentalCondition(value)
                                }
                                }
                            />
       <DatePicker
       
          selected={dateValue}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          showPopperArrow={false} // Hide the arrow indicating the popper position
          sx={{
            width: '100%',
            marginLeft: '20px'
        }}
          customInput={
            <Field

            name="date"
as={TextField}
              
              id='outlined-basic'
              label="Date"
              variant="outlined"
              
              inputProps={{ readOnly: true }} // Disable typing
               error={errors.date && touched.date}
                helpertext={errors.date && touched.date ? errors.date : `Specify Date on which went missing?`}
                
            />
          }
        />

</div>
<div className={style.row}style={
    {display:nextClicked===true?'none':''}
}>
<input type="file" onChange={handleFileChange} multiple  accept="image/*"/>
<p style={{color:errors.file ===''?'green':'red'}}>{errors.file ===''?'':errors.file}</p>
</div>
 <h1
                        style={
                            {display:nextClicked===true && loadingToken===false?'':'none'}
                        }>Case 123</h1>
<div className={nextClicked === true?style.imageRow:style.row}>

       
          <div  className={style.imagePreviewRow}>
          {selectedFile[0] && (
        <img
          src={URL.createObjectURL(selectedFile)} // Create object URL from selected file
          alt={`Preview`}
          style={{ maxWidth: '200px', maxHeight: 'auto', marginRight: '10px' }}
        />
      )}
            <button onClick={() => handleRemove()
            
            }
            style={{display:nextClicked === true?'none':''}}
            >Remove</button>
          </div>
       
      
</div>

<div className={style.tableRow} 
style={{
    display:nextClicked === true && loadingToken ===false?'':'none'
}}>
<TableContainer component={Paper} sx={{
    width:'50%',
    marginTop:'30px'
}}>
      <Table sx={{ maxWidth: 650 }} aria-label="simple table">
        {/* <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell align="center">Value</TableCell>
            
          </TableRow>
        </TableHead> */}
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
</div>
                    <div className={style.buttonRow}>
                    <Button variant="contained"
onClick={()=>{
    setNextClicked(true);
    
    setFormData({name: nameOfMissingOne,
        fName: fatherNameValue,
        contact: contactValue,
        city: cityValue.value,
        address: areaValue,
        age: ageValue,
        date: dateValue,
        mentalCondition: mentalCondition.value,
        caseType: 'mis',
        // reportedBy: 
        reportedBy:JSON.parse(localStorage.getItem('username'))
    })
}}
                            disabled={btnDisabled}

                            sx={{
                                marginTop: '20px',
                                marginBottom: ' 40px',
                                marginLeft: '10px',
                                fontWeight: 'bold',
                                color: 'white',
                                border: '2px rgb(0, 51, 102) solid',
                                width: '100px',
                                display:nextClicked === true?'none':''
                            }}
                        >
                            Next
                        </Button>

                        <Button variant="contained"
onClick={()=>{
    setNextClicked(false);
    //!name || !reportedBy || !caseType || !fName || !contact || !city || !address || !age || !date || !mentalCondition) {

}}
                            disabled={btnDisabled}

                            sx={{
                                marginTop: '20px',
                                marginBottom: ' 40px',
                                marginLeft: '10px',
                                fontWeight: 'bold',
                                color: 'white',
                                border: '2px rgb(0, 51, 102) solid',
                                width: '150px',
                                display:nextClicked === true && caseSubmitted === false?'':'none'
                                
                            }}
                        >
                            Go Back
                        </Button>
                        <Button variant="contained"
onClick={()=>{
    const form = new FormData();
    form.append('image', selectedFile);
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });
          console.log('form: ',form)
          axios.post('http://localhost:3333/user/Img', form, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(response => {
            if(response.status!==401 ||response.status!==520  ||response.status!==400 ||response.status!==500 ){
             console.log(response.data)
            setLoadingToken(true)
            setFormData({})
            setAgeValue('');
            setAreaValue('');
            setCityValue('')
            setContactValue('')
            setDateValue('')
            setFatherNameValue('')
            setNameOfMissingOne('')
            setMentalCondition('')
            setSelectedFile('')
            setCaseSubmitted(true)
            }
          })
          .catch(error => {
            if(error.response){
             console.log(error)
           
            }
            console.error('Error:', error);
          })
         console.log(form)
          // Handle success
}}
                            

                            sx={{
                                marginTop: '20px',
                                marginBottom: ' 40px',
                                marginLeft: '10px',
                                fontWeight: 'bold',
                                color: 'white',
                                border: '2px rgb(0, 51, 102) solid',
                                width: '200px',
                                display:nextClicked === true && caseSubmitted === false?'':'none'
                                
                            }}
                        >
                            save and Upload
                        </Button>
                    </div>
                    </Form>
                </>
            )}

            </Formik>
            <Backdrop open={loadingToken} style={{ display:caseSubmitted?'':'flex', flexDirection:'column' }}>
        <CircularProgress sx={{color:'white'}}/>
        <p style={{fontSize:'20px',color:'white'}}>Matching image</p>
      </Backdrop>
        </>
    )
}
