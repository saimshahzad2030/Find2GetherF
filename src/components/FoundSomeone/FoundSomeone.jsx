import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik';
import { TextField, Button, CircularProgress } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import Backdrop from '@mui/material/Backdrop';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Import the Back icon


//table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



//date picker
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';




import style from './FoundSomeone.module.css'
import { FlashOnOutlined } from '@mui/icons-material';


export default function FindingSomeone() {
    const [btnDisabled, setBtnDisabled] = useState(true);
    //Form Data    
    const [nameOfMissingOne, setNameOfMissingOne] = useState('')
    const [fatherNameValue, setFatherNameValue] = useState('')
    const [contactValue, setContactValue] = useState('')
    const [ageValue, setAgeValue] = useState('')
    const [cityValue, setCityValue] = useState('')
    const [areaValue, setAreaValue] = useState('')
    const [mentalCondition, setMentalCondition] = useState('')
    const [dateValue, setDateValue] = useState('')
    const [selectedFile, setSelectedFile] = useState(null);
    // const [reportedBy,setReportedBy]=useState(null);
    const [loadingToken, setLoadingToken] = useState(false);
    const [caseSubmitted, setCaseSubmitted] = useState(false)


    const [errors, setErrors] = useState({


        area: '',
        contact: '',
        mentalCondition: '',
        date: '',
        file: ''
    });




    //buttons controls

    const [isImageValidated, setIsImageValidated] = useState(false)
    const [nextClicked, setNextClicked] = useState(false)
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    //table
    function createData(type, value) {
        return { type, value };
    }

    const rows = [
        createData('Name', nameOfMissingOne),
        createData('Father name', fatherNameValue),
        createData('Phone No', contactValue),
        createData('City', cityValue.value),
        createData('Adress', areaValue),
        createData('Age Group', ageValue),
        createData('Date on which found', dateValue === '' ? '' : `${dateValue.getDate()}-${dateValue.getMonth() + 1}-${dateValue.getFullYear()}`),
        createData('Mental Health', mentalCondition.value),


    ];
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
    const age = [
        { label: '1-10', value: '1-10' },
        { label: '10-20', value: '10-20' },
        { label: '20-30', value: '20-30' },
        { label: '30-40', value: '30-40' },
        { label: '40-50', value: '40-50' },
        { label: '50-60', value: '50-40' },
        { label: '60-70', value: '60-70' },
        { label: '70-80', value: '70-80' },
        { label: '>80', value: '>80' }
    ]


    const handleChangeName = (e) => {
        if (/^[A-Za-z]+$/.test(e.target.value) || e.target.value === '') {

            setNameOfMissingOne(e.target.value)
        }
    }
    const handleChangeContact = (e) => {
        if (/^[0-9]+$/.test(e.target.value)) {

            setContactValue(e.target.value)
        }
    }
    const handleChangeFatherName = (e) => {
        if (/^[A-Za-z]+$/.test(e.target.value) || e.target.value === '') {

            setFatherNameValue(e.target.value)
        }

    }



    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });
    useEffect(() => {
        if (selectedFile) {
            const formData2 = new FormData();
            formData2.append('image_file', selectedFile);
            setLoading(true)
            axios.post('http://localhost:8000/api/check-face', formData2, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                if (response.status === 200) {
                    setIsImageValidated(true);
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        file: ''
                    }));
                    setLoading(false)
                    setSuccess(true)
                    // console.log(response.data);
                }
                //  else {
                //     setIsImageValidated(false);
                //     setLoading(false)

                //     setErrors(prevErrors => ({
                //         ...prevErrors,
                //         file: response.data
                //     }));
                // }
            }).catch(error => {
                if (error.response) {
                    setIsImageValidated(false); setLoading(false)
                    console.error('Error:', error.response.data.message);
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        file: error.response.data.message
                    }));

                    setSuccess(true)
                }
            });
        }
        else {
            console.log(errors.file)
        }
        // alert("fileerrors: ",errors.file)
    }, [selectedFile]); // Only re-run the effect if selectedFile changes

    const handleFileChange = (event) => {
        setSuccess(false)
        const file = event.target.files[0]; // Get the first file from the event
        console.log(event.target.files)

        if (file) {

            // Proceed with handling the image file
            if (file.size < 5 * 1024 * 1024) {
                setSelectedFile(file);

            }
            else {
                setSelectedFile(null);
                setIsImageValidated(false)

                setErrors((prevErrors) => ({
                    ...prevErrors,
                    file: 'Image is too large please select a smaller image'
                }));
                console.log('Image is too large please select a smaller image')
            }


        }
        else { // Check if file exists and its size is less than or equal to 5 MB

            setSelectedFile(null)
            setIsImageValidated(false)
            setErrors((prevErrors) => ({
                ...prevErrors,
                file: 'Please enter an image'
            }));
            console.log('Please enter an image')
            alert('not a valid file')

        }
        // alert("fileerrors: ",errors.file)
    }



    const handleDateChange = (date) => {
        // setDateValue(`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`);
        setDateValue(date);
    };
    useEffect(
        () => {





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
            else if (contactValue && contactValue.length === 11) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    contact: ''
                }));

            }

            if (!ageValue) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    age: 'Required'
                }));
                setBtnDisabled(true)

            }

            else if (ageValue) {
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
            else if (cityValue) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    city: ''
                }));

            }
            if (!areaValue) {
                setBtnDisabled(true)
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    area: 'Required'
                }));
            }
            else if (areaValue) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    area: ''
                }));

            }
            if (!mentalCondition) {
                setBtnDisabled(true)
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    mentalCondition: 'Required'
                }));
            }
            else if (mentalCondition) {

                setErrors((prevErrors) => ({
                    ...prevErrors,
                    mentalCondition: ''
                }));
            }
            if (dateValue === '') {
                setBtnDisabled(true)
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    date: 'Required'
                }));
            }
            else if (dateValue !== '') {

                setErrors((prevErrors) => ({
                    ...prevErrors,
                    date: ''
                }));
            }

            if (isImageValidated === true && contactValue.length === 11 && ageValue !== '' && areaValue !== '' && mentalCondition !== '' && dateValue !== '' && cityValue !== '' && errors.file === '') {

                setBtnDisabled(false)
            }

        }
        , [nameOfMissingOne, loading, isImageValidated, fatherNameValue, contactValue, ageValue, cityValue, areaValue, mentalCondition, dateValue, selectedFile]

    )










    const [formData, setFormData] = useState({

    });
    const [caseClicked, setCaseClicked] = useState(false)
    const [caseSelected, setCaseSelected] = useState({})
    const [imageUrl, setimgeUrl] = useState('');
    const [aiApiFetched, setAiApiFetched] = useState(false);
    const [imageId, setImageId] = useState('');
    const [matchedArray, setMatchedArray] = useState([])
    const [arrayWithValues, setArrayWithValues] = useState([])
    const [noMatches, setNoMatches] = useState(false)


    const suspectRows = [
        createData('Id', caseSelected._id),
        createData('Name', caseSelected.name),
        createData('Father name', caseSelected.fName ? caseSelected.fName : 'not specified'),
        createData('Phone No', caseSelected.contact),
        createData('City', caseSelected.city),
        createData('Adress', caseSelected.address),
        createData('Age', caseSelected.age),
        createData('Date on which found', caseSelected.date),
        createData('Mental Health', caseSelected.mentalCondition),


    ];
    useEffect(() => {
        if (caseSubmitted !== false) {
            const formData3 = new FormData();
            formData3.append('image_url', imageUrl);
            formData3.append('imageId', imageId);

            axios.post('http://localhost:8000/api/upload-to-database', formData3).then(response => {
                setAiApiFetched(true)
                if (response.status === 200) {
                    console.log(response.data.message)
                    // setLoadingToken(false)
                    setMatchedArray(response.data.matched_images)
                }
                else if (response.status === 202) {
                    console.log(response.data.message)
                    // setLoadingToken(false)

                    setNoMatches(true)
                }




            }).catch(error => {

                console.error('Error:', error);


            });

        }
    }


        , [caseSubmitted])


    useEffect(() => {

        if (matchedArray.length > 0) {
            const url = 'http://localhost:3333/user/matchedCases';
            const queryParams = new URLSearchParams();
            matchedArray.forEach(matched => queryParams.append('imageId', matched[0]));
            queryParams.append('caseType', 'mis')
            const fullUrl = `${url}?${queryParams}`;
            axios.get(fullUrl).then(response => {


                console.log(response.data)
                setArrayWithValues(response.data)


            }).catch(error => {

                console.error('Error:', error);


            });








        }
        // console.log('matched values: ',arrayWithValues)
    },



        [matchedArray])

    // useEffect(()=>{console.log('matched array:',arrayWithValues)},[arrayWithValues])

    // console.log(arrayWithValues)
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
                                { display: nextClicked === true ? 'none' : '' }
                            }>Fill Out the form below</h1>

                        <div className={style.row}
                            style={
                                { display: nextClicked === true ? 'none' : '' }
                            }
                        >


                            <Field
                                className={style.field}
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

                                helperText={`Name of suspect (if any)`}

                            />

                            <Field

                                className={style.field}
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

                                onChange={handleChangeFatherName}
                                helperText={`Name of suspect's Father (if any)`}
                            />
                            <Field

                                className={style.field}
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
                                helperText={errors.contact && touched.contact ? errors.contact : `Enter Your contact no.`}

                            />

                        </div>
                        <div className={style.row}
                            style={
                                { display: nextClicked === true ? 'none' : '' }
                            }>

                            <Autocomplete

                                className={style.field}
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
                                    helperText={errors.city && touched.city ? errors.city : `city where suspect found?`}

                                />}
                                onChange={(e, value) => {

                                    setCityValue(value)
                                }
                                }
                            />
                            {/* <Field

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
helperText={errors.age && touched.age ? errors.age : `Specify Age Group?`}

/> */}
                            <Autocomplete

                                className={style.field}
                                disablePortal
                                id="combo-box-demo"
                                options={age}
                                sx={{ width: '30%' }}
                                renderInput={(params) => <Field
                                    as={TextField}
                                    {...params}
                                    name='age'
                                    label="Age"
                                    value={ageValue}
                                    error={errors.age && touched.age}
                                    helperText={errors.age && touched.age ? errors.age : `Specify Age Group?`}
                                />}
                                onChange={(e, value) => {

                                    setAgeValue(value.value)
                                }
                                }
                            />

                            <Field

                                className={style.field}
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

                                onChange={
                                    (e) => {
                                        setAreaValue(e.target.value)
                                    }
                                }
                                error={errors.area && touched.area}
                                helperText={errors.area && touched.area ? errors.area : `Enter Area where he/she is found`}

                            />

                        </div>
                        <div className={style.row}
                            style={
                                { display: nextClicked === true ? 'none' : '' }
                            }>
                            <Autocomplete

                                className={style.field}
                                disablePortal
                                id="combo-box-demo"
                                options={[
                                    { label: 'Stable', value: 'stable' }, { label: 'Unstable', value: 'unstable' }
                                ]}
                                sx={{ width: '30%' }}
                                renderInput={(params) => <Field
                                    as={TextField}
                                    {...params}
                                    name='mentalCondition'
                                    label="Mental Condition"
                                    value={mentalCondition}
                                    error={errors.mentalCondition && touched.mentalCondition}
                                    helperText={errors.mentalCondition && touched.mentalCondition ? errors.mentalCondition : `Specify Mental Condition`}

                                />}
                                onChange={(e, value) => {

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
                                        helperText={errors.date && touched.date ? errors.date : `Specify Date on which went missing?`}

                                    />
                                }
                            />

                        </div>
                        <div className={style.row} style={
                            { display: nextClicked === true ? 'none' : 'flex' }
                        }>
                            {/* <input type="file" onChange={handleFileChange} multiple  accept="image/*"/> */}

                            <label htmlFor="file-upload-button">
                                <Button
                                    variant="contained"
                                    startIcon={<CloudUploadIcon />}
                                    component="span" // Ensure the Button component behaves like a regular button
                                >
                                    Upload file
                                </Button>
                                <input
                                    id="file-upload-button"
                                    type="file"
                                    onChange={handleFileChange}
                                    // multiple // Allow selection of multiple files
                                    accept="image/*" // Only allow image files
                                    style={{ display: 'none' }} // Hide the input element
                                />
                            </label>
                            {/* <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload file
      <VisuallyHiddenInput type="file" />
    </Button> */}
                            {success ?
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', width: '10%', marginTop: '4px' }}>
                                    <CheckIcon size={20} sx={{ display: isImageValidated ? '' : 'none', color: 'green' }} />
                                    {/* <p style={{display:!displayIcon || !isUsernameUnique?'none':'',color:'green',}}>Unique</p>  */}
                                    <ClearIcon size={20} sx={{ display: isImageValidated ? 'none' : '', color: 'red' }} />
                                    {/* <p style={{display:!displayIcon || isUsernameUnique?'none':'',color:'red',}}>Already Taken</p> */}
                                </div> : <></>}
                            {loading && (
                                <CircularProgress
                                    size={20}
                                    sx={{
                                        marginLeft: '20px',
                                        color: 'green'
                                    }}
                                />
                            )}
                        </div>
                        <div className={style.lastRow} >


                            <Alert severity="warning" sx={{ display: loading === true || errors.file === '' ? 'none' : '' }}>{errors.file === '' ? '' : errors.file}</Alert>


                        </div>
                        <h1
                            style={
                                { display: nextClicked === true && loadingToken === false ? '' : 'none' }
                            }>Case 123</h1>



                        <div className={style.imagePreviewRow} style={{ display: nextClicked === true && loadingToken === false ? 'flex' : 'none' }}>
                            {selectedFile && (
                                <img
                                    src={URL.createObjectURL(selectedFile)} // Create object URL from selected file
                                    alt={`Preview`}
                                    style={{ maxWidth: '200px', maxHeight: 'auto', marginRight: '10px' }}
                                />
                            )}




                        </div>

                        <div className={style.tableRow}
                            style={{
                                display: nextClicked === true && loadingToken === false ? '' : 'none'
                            }}>
                            <TableContainer component={Paper} sx={{
                                width: '50%',
                                marginTop: '30px'
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
                                onClick={() => {
                                    setNextClicked(true);
                                    setFormData({
                                        name: nameOfMissingOne === '' ? 'not specified' : nameOfMissingOne,
                                        fName: fatherNameValue === '' ? 'not specified' : fatherNameValue,
                                        contact: contactValue,
                                        city: cityValue.value,
                                        address: areaValue,
                                        age: ageValue,
                                        date: dateValue,
                                        mentalCondition: mentalCondition.value,
                                        caseType: 'sus',
                                        reportedBy: JSON.parse(localStorage.getItem('username'))

                                        // reportedBy:
                                    })
                                }}
                                disabled={btnDisabled || !isImageValidated}

                                sx={{
                                    marginTop: '20px',
                                    marginBottom: ' 40px',
                                    marginLeft: '10px',
                                    fontWeight: 'bold',
                                    color: 'white',
                                    border: '2px rgb(0, 51, 102) solid',
                                    width: '100px',
                                    display: nextClicked === true ? 'none' : ''
                                }}
                            >
                                Next
                            </Button>

                            <Button variant="contained"
                                onClick={() => {
                                    setNextClicked(false);
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
                                    display: nextClicked === true && loadingToken === false ? '' : 'none'
                                }}
                            >
                                Go Back
                            </Button>
                            <Button variant="contained"
                                onClick={() => {
                                    const form = new FormData();
                                    form.append('image', selectedFile);
                                    Object.entries(formData).forEach(([key, value]) => {
                                        form.append(key, value);
                                    });
                                    setLoadingToken(true)
                                    axios.post('http://localhost:3333/user/Img', form, {
                                        headers: {
                                            'Content-Type': 'multipart/form-data'
                                        }
                                    }).then(response => {
                                        if (response.status === 200) {
                                            setImageId(response.data._id)
                                            setimgeUrl(response.data.imgUrl)
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
                                        console.log(imageId)
                                        console.log(imageUrl)
                                    })
                                        .catch(error => {
                                            if (error.response) {
                                                console.log(error)

                                            }
                                            console.error('Error:', error);
                                        })
                                    //  console.log(form)
                                    // Handle success
                                    //   console.log('image Url:',imageUrl);
                                    //   console.log('image Id:',imageId);
                                }
                                }




                                sx={{
                                    marginTop: '20px',
                                    marginBottom: ' 40px',
                                    marginLeft: '10px',
                                    fontWeight: 'bold',
                                    color: 'white',
                                    border: '2px rgb(0, 51, 102) solid',
                                    width: '200px',
                                    display: nextClicked === true && loadingToken === false ? '' : 'none'
                                }}
                            >
                                save and Upload
                            </Button>
                        </div>
                    </Form>
                </>
            )}
            </Formik>
            {loadingToken && aiApiFetched===false? <><Backdrop open={loadingToken} style={{ display: caseSubmitted && aiApiFetched === false ? '' : 'flex', flexDirection: 'column' }}>
                <CircularProgress sx={{ color: 'white' }} />
                <p style={{ fontSize: '20px', color: 'white' }}>Processing Image</p>
            </Backdrop></>
                : (
                    arrayWithValues && matchedArray.length !== 0 && arrayWithValues.length > 0 ?
                        (
                            <div className={style.mainCol} style={{ display: caseClicked ? 'none' : 'flex' }}>
                                <div className={style.child1}>
                                    <h1 >Matched Cases</h1>
                                </div>

                                {arrayWithValues && arrayWithValues.flat().map(suspect => (
                                    <div className={style.suspectCase} key={suspect._id} onClick={() => { console.log(suspect); setCaseClicked(true); setCaseSelected(suspect) }}>
                                        <div className={style.suspectChild1}>
                                            <img src={suspect.imgUrl} alt={123} />
                                        </div>
                                        <div className={style.suspectChild2}>
                                            <p className={style.suspectHeading}>{suspect.name}</p>
                                            <div className={style.detailsRow}>
                                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', fontFamily: 'calibri' }}>
                                                    <p className={style.suspectRowTitle}>Found from: </p>
                                                    <p className={style.suspectRowDefinition}> {suspect.address}, {suspect.city}</p>
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', fontFamily: 'calibri' }}>
                                                    <p className={style.suspectRowTitle}>Reported by: </p>
                                                    <p className={style.suspectRowDefinition}>{suspect.reportedBy}</p>
                                                </div>
                                            </div>
                                            <div className={style.detailsRow}>
                                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                    <p className={style.suspectRowTitle}>Age group:  </p>
                                                    <p className={style.suspectRowDefinition}> {suspect.age}</p>
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                    <p className={style.suspectRowTitle}>Mental Condition:</p>
                                                    <p className={style.suspectRowDefinition}>{suspect.mentalCondition}</p>
                                                </div>
                                            </div>
                                            <div className={style.detailsRow}>
                                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                    <p className={style.suspectRowTitle}>Contact#:  </p>
                                                    <p className={style.suspectRowDefinition}>{suspect.contact}</p>
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                    <p className={style.suspectRowTitle}>Dated:  </p>
                                                    <p className={style.suspectRowDefinition}>{suspect.date}</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                ))
                                }</div>) :
                        (
                          noMatches===true &&   <div className={style.noMatchFound} 
                             style={{display:noMatches===true?'flex':''}}>
                                <h1>No matches found for your image</h1>
                                <Button variant="contained"




                                    sx={{


                                        fontWeight: 'bold',
                                        color: 'white',
                                        border: '2px rgb(0, 51, 102) solid',
                                        width: '100px',
                                    }}
                                >
                                    Next
                                </Button>
                            </div>)
                )
            }
           <div className={style.clickedDiv}>
           <div className={style.backButton}
                onClick={() => {
                    setCaseClicked(false)
                }}
                style={{
                    display: caseClicked === true ? 'flex' : 'none'
                }}>
                <Avatar>
                    <ArrowBackIcon />
                </Avatar>

            </div><p style={{ display: caseClicked === true ? 'flex' : 'none', fontFamily: 'calibri', fontSize: '50px', fontWeight: 'bold' }}>Case Type: {caseSelected.caseType === 'sus' ? 'Suspect' : 'Missing'}</p>

            <div className={style.tableRow}
                style={{
                    display: caseClicked === true ? 'flex' : 'none'
                }}>
                <div className={style.clickedImageDiv}>
                    <img src={caseSelected.imgUrl} alt={123} />

                </div>
                <TableContainer component={Paper} sx={{
                    width: '50%',
                    marginTop: '30px'
                }}>
                    <Table sx={{ maxWidth: 650 }} aria-label="simple table">

                        <TableBody>
                            {suspectRows.map((row) => (
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
