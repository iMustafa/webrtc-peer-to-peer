import { Fragment } from "react";
import {makeStyles} from "@material-ui/core";
import {connect, useDispatch} from "react-redux";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ForumIcon from "@material-ui/icons/Forum";
import EmailIcon from "@material-ui/icons/Email";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from "clsx";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
}));

const AdminDrawer = ({ open, handleDrawerClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleNavigation = (route) => {
    dispatch({type: "ADMIN_NAVIGATION", payload: route})
  }

  return (
    <Fragment>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <List>
          <ListItem button onClick={() => {handleNavigation('BANNED_USERS')}}>
            <ListItemIcon>
              <PersonAddDisabledIcon />
            </ListItemIcon>
            <ListItemText primary="Banned Users" />
          </ListItem>
          <ListItem button onClick={() => {handleNavigation('MESSAGES')}}>
            <ListItemIcon>
              <ForumIcon />
            </ListItemIcon>
            <ListItemText primary="Messages" />
          </ListItem>
          <ListItem button onClick={() => {handleNavigation('EMAILS')}}>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText primary="Emails" />
          </ListItem>
        </List>
      </Drawer>
    </Fragment>
  );
};

export default connect(null, {})(AdminDrawer);
