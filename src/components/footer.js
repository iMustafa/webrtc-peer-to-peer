import {Fragment} from "react";
import {makeStyles} from '@material-ui/core';
import {Link} from "react-router-dom"

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
          <Link className={classes.linkMajor} to="/">Home</Link>
          <Link className={classes.linkMajor} to="/about">About Us</Link>
          <Link className={classes.linkMajor} to="/guidelines">Guidelines</Link>
          <Link className={classes.linkMajor} to="/faq">FAQ</Link>
          <Link className={classes.linkMajor} to="/press">Press</Link>
        </div>
        <div className={classes.container}>
          <Link className={classes.linkMinor} style={{borderRight: '1px solid #FFF'}} to="/privacy">Privacy</Link>
          <Link className={classes.linkMinor} style={{borderRight: '1px solid #FFF'}} to="/terms">Terms</Link>
          <Link className={classes.linkMinor} to="/contact">Contacts</Link>
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