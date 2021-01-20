import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

const useStyles = makeStyles(() => ({
  root: {
    color: "#FFF",
    marginTop: 15,
    fontSize: 16
  },
  circle: {
    width: 10,
    height: 10,
    backgroundColor: "#0F0",
    border: "1px solid #FFF",
    borderRadius: "50%",
    display: 'inline-block'
  },
}));

const UserCount = () => {
  const classes = useStyles();
  const [count, setCount] = useState();

  useEffect(() => {
    const getCount = async () => {
      try {
        const count = await axios.get("/api/count");
        setCount(count.data.count);
      } catch (e) {
        console.log(e);
      }
    };
    getCount();
  }, []);

  return (
    <Typography className={classes.root}>
      <span className={classes.circle} /> {count} Users have joined our platform
    </Typography>
  );
};

export default UserCount;
