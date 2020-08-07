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
import CustomDropdown from "../../CustomDropdown/CustomDropdown.js";
import Button from "../../CustomButtons/Button";

import styles from "../../../assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);
import { store, history } from '../../../store';

export default function HeaderLinks(props) {
  const classes = useStyles();

  const navigateToRegister = () => {
    history.push('/register');
}

const navigatetoLogin = () => {
  history.push('/login')
}

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="Provider"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={Apps}
          dropdownList={[
            <Link to="/provider/register" className={classes.dropdownLink}>
              Provider Register
            </Link>,
            <Link to="/provider/login" className={classes.dropdownLink}>
            Provider Login
          </Link>,
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          color="transparent"
          target="_blank"
          className={classes.navLink}
          onClick={navigatetoLogin}
        >
         <b>Login</b>
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          color="info"
          target="_blank"
          className={classes.navLink}
          onClick={navigateToRegister}
        >
          Register
        </Button>
      </ListItem>
  
    </List>
  );
}
