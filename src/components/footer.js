import {Fragment} from "react";
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  blueFooter: {
    backgroundColor: "#0087E7",
    padding: '35px 0'
  },
  container: {
    display: "flex",
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkMajor: {
    color: "#FFF",
    fontSize: 18,
    padding: '0 25px',
    textDecoration: 'none'
  },
  linkMinor: {
    color: "#FFF",
    fontSize: 14,
    padding: '0 15px',
    textDecoration: 'none'
  },
  blackFooter: {
    backgroundColor: "#121212",
    display: "flex",
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    padding: '5px 0',
    display: 'block',
    color: "#FFF"
  }
}))

const Footer = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <div className={classes.blueFooter}>
        <div className={classes.container} style={{marginBottom: 15}}>
          <a className={classes.linkMajor} href="#">Home</a>
          <a className={classes.linkMajor} href="#">About Us</a>
          <a className={classes.linkMajor} href="#">Guidelines</a>
          <a className={classes.linkMajor} href="#">FAQ</a>
          <a className={classes.linkMajor} href="#">Press</a>
        </div>
        <div className={classes.container}>
        <a className={classes.linkMinor} style={{borderRight: '1px solid #FFF'}} href="#">Privacy</a>
          <a className={classes.linkMinor} style={{borderRight: '1px solid #FFF'}} href="#">Terms</a>
          <a className={classes.linkMinor} href="#">Contacts</a>
        </div>
      </div>
      <div className={classes.blackFooter}>
        <span className={classes.text}>CAMSURF</span>
        <span className={classes.text}>Copyright © 2021 Camsurf</span>
      </div>
    </Fragment>
  )
}

export default Footer