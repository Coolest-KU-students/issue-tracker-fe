import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import PeopleIcon from "@material-ui/icons/People";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import ListAltRoundedIcon from "@material-ui/icons/ListAltRounded";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";

export default function NavigationButtons() {
  return (
    <div>
      <ListSubheader inset>Navigation</ListSubheader>
      <ListItem button>
        <ListItemIcon>
          <HomeWorkIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <ListAltRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Issue List" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItem>
    
      <ListItem button>
        <ListItemIcon>
          <LibraryAddCheckIcon />
        </ListItemIcon>
        <ListItemText primary="Step Register" />
      </ListItem>
      <ListItem component={Link} to='/logout' button>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText   primary="Log Out">
        </ListItemText>
      </ListItem>
    </div>
  );
}
