import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Link, useLocation } from 'react-router-dom';


export default function Menu() {
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    const location = useLocation();
    const path = location.pathname;
    console.log(path);

    return (
        <>
            <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader"  sx={{display: 'flex', justifyContent: 'center'}}>
                <StarBorder sx={{display: 'flex', marginTop: 'auto', marginBottom: 'auto', justifyContent: 'center'}}/>
                Football Clubs ⚽
                </ListSubheader>
            }
            >
            <ListItemButton onClick={handleClick} component={Link} to="/" selected={path === '/'}>
                <ListItemIcon>
                <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="All Clubs" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                
                <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                    <DashboardCustomizeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Real Madrid" />
                </ListItemButton>
                
                <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                    <DashboardCustomizeIcon />
                    </ListItemIcon>
                    <ListItemText primary="FC Barcelona" />
                </ListItemButton>
                
                <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                    <DashboardCustomizeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Manchester United" />
                </ListItemButton>
                
                <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                    <DashboardCustomizeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Liverpool" />
                </ListItemButton>
                
                <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                    <DashboardCustomizeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Bayern Munich" />
                </ListItemButton>

                </List>
            </Collapse>
            </List>


            
        <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
            <ListSubheader component="div" id="nested-list-subheader">
            Creating Records ➕
            </ListSubheader>
        }
        >
        <ListItemButton component={Link} to="/create" selected={path === '/create'}>
            <ListItemIcon>
            <AddBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Create Clubs" />
        </ListItemButton>
        
        </List>


        </>
    );
}
