import { useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => ({
  root: {
    padding: "25px 30px",
  },
  input: {
    margin: "20px 0",
  },
  text: {
    marginBottom: 20,
    fontSize: 22,
    fontWeight: "500",
    textAlign: "center",
  },
}));

const AdminLogin = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.admin);
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleLogin = () => {
    const { username, password } = state;
    if (
      username === "administrator" &&
      password === "@administratorpassword159"
    )
      dispatch({ type: "SET_AUTHENTICATION", payload: true });
    else alert("Incorrect Password");
  };

  if (isAuthenticated) return null;

  return (
    <Paper className={classes.root} elevation={7}>
      <Typography className={classes.text}>Administrator Login</Typography>
      <TextField
        onChange={handleChange}
        placeholder="Username"
        name="username"
        fullWidth
        className={classes.input}
      />
      <TextField
        onChange={handleChange}
        placeholder="Password"
        name="password"
        type="password"
        fullWidth
        className={classes.input}
      />
      <Button fullWidth onClick={handleLogin} className={classes.btn}>
        Login
      </Button>
    </Paper>
  );
};

export default connect(null, {})(AdminLogin);
