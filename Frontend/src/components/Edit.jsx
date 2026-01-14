import React, { useState, useEffect } from "react";
import axios_instance from "./Axios";
import { Box, Typography } from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import TextForm from "./Forms/TextForm";
import MultiSelectForm from "./Forms/MultiSelectForm";
import SelectForm from "./Forms/SelectForm";
import DescriptionForm from "./Forms/DescriptionForm";
import Button from '@mui/material/Button';
import { useFormik } from "formik";
import * as Yup from 'yup';
import Message from "./Forms/Message";
import { useNavigate, useParams } from "react-router-dom";


const Edit = () => {

    const myParameter = useParams();
    const myId = myParameter.id;
    // console.log("myId:", myId);
    
    /* ===============================
    STATE: Dropdown data from API
    =============================== */
    const [myData, setMyData] = useState({
            name: '',
            city: '',
            attendants: 0,       
            league: '',
            country: '',
            characteristics:[],
            description: '',
    });
    const [country, setCountry] = useState([]);
    const [league, setLeague] = useState([]);
    const [characteristics, setCharacteristics] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    /* ===============================
            Fetch dropdown data on load
       =============================== */
    
    const getData = async () => {
        try {
            // 1️⃣ fetch dropdowns
            const [countriesRes, leaguesRes, characteristicsRes] = await Promise.all([
                axios_instance.get('countries/'),
                axios_instance.get('leagues/'),
                axios_instance.get('characteristics/'),
            ]);

            setCountry(countriesRes.data);
            setLeague(leaguesRes.data);
            setCharacteristics(characteristicsRes.data);

            // 2️⃣ fetch club data
            const res = await axios_instance.get(`footballclubs/${myId}/`);

            // map names to ids for multi-select
            const characteristicsIds = res.data.characteristics_names?.map(name => {
                const option = characteristicsRes.data.find(opt => opt.name === name);
                return option?.id;
            }).filter(Boolean);

            // ✅ Set Formik values directly
            formik.setValues({
                name: res.data.name || '',
                city: res.data.city || '',
                attendants: res.data.attendants || 0,
                league: res.data.league || '',
                country: res.data.country || '',
                characteristics: characteristicsIds || [],
                description: res.data.description || '',
            });

        } catch (error) {
            console.log("Error fetching data:", error);
        }
    };

    
    // console.log("myData:", myData);

    useEffect(() => {
        getData();
    }, []);

    const validationSchema = Yup.object().shape({
        
        name: Yup
            .string('Name must be a string')
            .required('Name is required')
        ,
        
        attendants: Yup.number('Attendants must be a number').required('Attendants is required').positive('Attendants must be positive'),
        
        city: Yup.string('City must be a string').required('City is required'),
        
        league: Yup
            .number()
            .typeError("League is required")
            .required("League is required"),
        
        country: Yup
            .number()
            .typeError("Country is required")
            .required("Country is required"),
        
        characteristics: Yup.array().min(1, 'At least one characteristic is required'),
        
        description: Yup.string('Description must be a string').required('Description is required'),
    });

    /* ===============================
            Formik Form Handling
       =============================== */
    
    const formik = useFormik({
        initialValues: {
            name: '',
            city: '',
            attendants: 0,
            league: '',
            country: '',
            characteristics: [],
            description: '',
        },
        enableReinitialize: true,  // ✅ allow reinitialization when myData changes

        validationSchema,

        onSubmit: async (values, { setTouched }) => {
            setTouched({
                name: true,
                city: true,
                attendants: true,
                league: true,
                country: true,
                characteristics: true,
                description: true,
            });

            if (Object.keys(formik.errors).length > 0) {
                return;
            }

            const payload = {
                ...values,
                league: values.league !== '' ? Number(values.league) : null,
                country: values.country !== '' ? Number(values.country) : null,
                attendants: values.attendants !== ''
                    ? Number(values.attendants)
                    : null,
            };

            try {
                await axios_instance.put(`footballclubs/${myId}/`, payload);
                setMessage(<Message messageText="Club Updated successfully!" messageColor="green" />);
                setTimeout(() => navigate('/'), 2000);
            } catch (error) {
                console.error("Error updating form:", error);
                setMessage(<Message messageText="Error updating club. Please try again." messageColor="red" />);
            }

            console.log("Payload ready:", payload);
            
        }

    });

    // 🔕 Commented noisy debug log (enable only when needed)
    // console.log("formik values", formik.values);

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>

                {/* ===== Page Header ===== */}
                <Box className="topbar">
                    <AddBoxIcon className="topbar-icon" />
                    <Typography variant="h6" className="topbar-text">
                        Edit the Club
                    </Typography>
                </Box>

                {/* <Message messageText="Please fill in all the required fields" messageColor="green" /> */}

                {message}

                {/* ===== Main Form Box ===== */}
                <Box className="form-box">

                    {/* ---- Column 1 ---- */}
                    <Box className="form-area">
                        <TextForm
                            label="Club Name"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />

                        <TextForm
                            label="City"
                            name="city"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}

                            error={formik.touched.city && Boolean(formik.errors.city)}
                            helperText={formik.touched.city && formik.errors.city}
                        />

                        <TextForm
                            label="Attendants"
                            name="attendants"
                            value={formik.values.attendants}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}

                            error={formik.touched.attendants && Boolean(formik.errors.attendants)}
                            helperText={formik.touched.attendants && formik.errors.attendants}
                        />
                    </Box>

                    {/* ---- Column 2 ---- */}
                    <Box className="form-area">
                        <SelectForm
                            label="League"
                            options={league}
                            name="league"
                            value={formik.values.league}
                            onChange={(e) => {
                                formik.setFieldValue("league", e.target.value);
                                formik.setFieldTouched("league", true, true);
                            }}
                            onBlur={formik.handleBlur}
                            error={Boolean(formik.touched.league && formik.errors.league)}
                            helperText={formik.touched.league && formik.errors.league}
                        />

                        <SelectForm
                            label="Country"
                            options={country}
                            name="country"
                            value={formik.values.country}
                            onChange={(e) => {
                                formik.setFieldValue("country", e.target.value);
                                formik.setFieldTouched("country", true);
                            }}
                            onBlur={formik.handleBlur}

                            error={Boolean(formik.touched.country && formik.errors.country)}
                            helperText={formik.touched.country && formik.errors.country}
                        />

                        <MultiSelectForm
                            label="Characteristics"
                            options={characteristics}
                            name="characteristics"
                            value={formik.values.characteristics || []}
                            onChange={(field, value) =>
                                formik.setFieldValue(field, value)
                            }
                            onBlur={formik.handleBlur}
                            error={formik.touched.characteristics && Boolean(formik.errors.characteristics)}
                            helperText={formik.touched.characteristics && formik.errors.characteristics}
                        />
                    </Box>

                    {/* ---- Column 3 ---- */}
                    <Box className="form-area">
                        <DescriptionForm
                            label="Description"
                            rows={9}
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />

                        <Button
                            variant="contained"
                            fullWidth
                            type="submit"
                        >
                            Submit the data
                        </Button>
                    </Box>

                </Box>
            </form>
        </div>
    );
};

export default Edit;
