/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";
import AuthenticatedService from 'views/Components/Sections/AuthenticatedService.js';
import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  const isUserLoggedIn = AuthenticatedService.isUserLoggedIn();
  
  const handleLogout = () => {
    AuthenticatedService.logout();
    window.location.reload() // temp solution to user API call bug
  };

  return (
    <List className={classes.list}>
       

      <ListItem className={classes.listItem}>
        <Link to="/" >
          <Button 
            color="Black"
            target="_blank">
            Home
          </Button>
        </Link>
      </ListItem>

      <ListItem className={classes.listItem}>
        <Link to="/commonPlots" >
          <Button 
            color="Black"
            target="_blank">
            Spotify Visuals 
          </Button>
        </Link>
      </ListItem>
      {isUserLoggedIn && 
      <ListItem className={classes.listItem}>
        <Link to="/userVisuals" >
          <Button 
            color="Black"
            target="_blank">
            User Data Visuals 
          </Button>
        </Link>
      </ListItem>}

      {!isUserLoggedIn && 
      <ListItem className={classes.listItem}>
        <Link to="/login-page" >
          <Button 
            color="Black"
            target="_blank">
            Login 
          </Button>
        </Link>
      </ListItem>}

      {isUserLoggedIn && 
      <ListItem className={classes.listItem}>
        <Link to="/logout" >
          <Button 
            color="Black"
            target="_blank"
            onClick={handleLogout}>
            Logout 
          </Button>
        </Link>
      </ListItem>}
{/* 
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="Login/Logout"
          buttonProps={{
            color: "Black"
          }}
          buttonIcon={Apps}
          dropdownList={[
            <Link to="/login-page">
              <Button 
                color="Black"
                target="_blank">
                Login
              </Button>
            </Link>,
            <Link to="/logout">
              <Button 
                color="Black"
                target="_blank">
                Logout
              </Button>
          </Link>
          ]}
        />
      </ListItem>  */}
    
    </List>
  );
}
