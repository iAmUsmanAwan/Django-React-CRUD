import React, { useEffect, useMemo, useState } from "react";
import { Box, Typography, Stack, Chip, IconButton  } from "@mui/material";
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import { MaterialReactTable } from 'material-react-table';
import axios_instance from './Axios'; // make sure this is your axios instance
import {Link} from 'react-router-dom';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import DeleteIcon from '@mui/icons-material/Delete';

const Home = () => {
    // ✅ Define state for data
    const [myData, setMyData] = useState([]);

    // ✅ Fetch data
    const getData = async () => {
        try {
            const res = await axios_instance.get('footballclubs/'); // adjust endpoint as needed
            setMyData(res.data); // set state with fetched data
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    // ✅ Define columns
    const columns = useMemo(
        () => [
        { accessorKey: 'name', header: 'Name' },
        { accessorKey: 'city', header: 'City' },
        { accessorKey: 'attendants', header: 'Attendants' },
        { accessorKey: 'league_details.name', header: 'League' },
        { accessorKey: 'country_details.name', header: 'Country' },
        {
            accessorKey: 'characteristics_names',
            header: 'Characteristics',
            Cell: ({ cell }) => (
                <Stack direction="row" spacing={1} flexWrap="wrap">
                    {cell.getValue()?.map((charName, index) => (
                        <Chip 
                            key={index} 
                            label={charName} 
                            size="small" 
                            color="primary"
                        />
                    ))}
                </Stack>
            )
        }

        ],
        []
    );

    return (
        <div>
        <Box className="topbar">
            <CalendarViewMonthIcon className="topbar-icon" />
            <Typography variant="h6" className="topbar-text">
            View all Clubs
            </Typography>
        </Box>

        <MaterialReactTable
            columns={columns}
            data={myData || []} // use state
            initialState={{ showColumnFilters: true }}
            enableRowActions
            renderRowActions={({row})=>(
                <Box
                    sx={{ display: 'flex', gap: '8px', flexWrap: 'nowrap' }}>
                    <IconButton
                        color="primary"
                        component={Link}
                        to={`/edit/${row.original.id}`}
                        >
                        <EditDocumentIcon />
                    </IconButton>

                <IconButton
                        color="error"
                        component={Link}
                        to={`/delete/${row.original.id}`}
                        >
                        <DeleteIcon />
                    </IconButton>

                </Box>
            )
        }
        />
        </div>
    );
};

export default Home;
