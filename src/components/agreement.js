import { useSelector, useDispatch, connect } from "react-redux";
import { makeStyles } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 15,
    borderRadius: 12,
  },
  checkbox: {
    color: "#FFF",
    fontSize: 16,
  },
}));

const Agreement = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { agreement } = useSelector((state) => state.user);

  const handleChange = (e) => {
    const { checked } = e.target;
    dispatch({ type: "SET_AGREEMENT", payload: checked });
  };

  return (
    <div className={clsx(classes.root, 'agreement')}>
      <FormControlLabel
        className={classes.checkbox}
        control={
          <Checkbox
            checked={agreement}
            onChange={handleChange}
            name="agreement"
            color="primary"
          />
        }
        label="I have read and accept the"
      />
      <a href="#" className={classes.checkbox}>
        User Tems
      </a>
    </div>
  );
};

export default connect(null, {})(Agreement);
