import React, { useState, useEffect } from "react";
import axios_instance from "./Axios";
import { Box, Typography, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, useParams } from "react-router-dom";
import Message from "./Forms/Message";

const Delete = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [myData, setMyData] = useState(null);

    const [message, setMessage] = useState("");

    // console.log("My Data:", myData);

    const getData = async () => {
        try {
            const res = await axios_instance.get(`footballclubs/${id}/`);
            setMyData(res.data);
        } catch (error) {
            console.log("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const deleteRecord = async (event) => {
        try {
            event.preventDefault();
            await axios_instance.delete(`footballclubs/${id}/`);
            setMessage(<Message messageText="Club Deleted successfully!" messageColor="green" />);
            setTimeout(() => navigate('/'), 2000);
        } catch (error) {
            console.log("Error deleting Record:", error);
        }
    };

    if (!myData) return <p>Loading...</p>;
    
    return (
        <div>
            <form onSubmit={deleteRecord}>  
                <Box className="topbar">
                    <DeleteIcon className="topbar-icon" />
                    <Typography variant="h6" className="topbar-text">
                        Are you sure you want to delete <b>{myData.name}</b>?
                    </Typography>
                </Box>

                <Box className="TextBox" sx={{ marginTop: "20px", width: "60%", marginLeft: "20%", padding: "20px", borderRadius: "10px", backgroundColor: "#f1c4c4", textAlign: "center" }}>
                    <Typography variant="body1" sx={{ marginTop: "20px" }}>
                        This action cannot be undone. Please confirm if you want to proceed with deleting the club <b><strong>{myData.name}</strong></b> from the database. This will permanently remove all data associated with <b>{myData.name}</b>.
                    </Typography>
                </Box>

                <Box sx={{ marginTop: "30px", width: "50%", alignContent: "center", marginLeft: "25%" }}>
                    <Button
                        variant="contained"
                        color="error"
                        fullWidth
                        type="submit"
                    >
                        DELETE
                    </Button>
                </Box>
            </form>
        </div>
    );
};

export default Delete;