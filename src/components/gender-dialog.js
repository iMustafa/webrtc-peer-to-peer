import { connect, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import MaleIcon from "../images/male-icon.png";
import FemaleIcon from "../images/female-icon.png";
import clsx from "clsx";

const useStyles = makeStyles(() => ({
  root: {},
  btnsContainer: {
    marginTop: 40,
    marginBottom: 15,
    padding: 25,
  },
  btn: {
    width: "100%",
    boxShadow: "0 3px 6px rgba(0,0,0,0.5)",
    color: "#231f20",
    backgroundColor: "#f4f7f8",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 25,
  },
  avatar: {
    width: 30,
    height: 30,
    objectFit: "conver",
    marginRight: 15,
  },
}));

const GenderDialog = ({ showModal, setShowModal }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <Dialog
      open={showModal}
      onClose={() => {
        setShowModal(false);
      }}
    >
      <div className={clsx("dialog-body", classes.root)}>
        <p className="modal-title">Select Your Gender</p>
        <div className={classes.btnsContainer}>
          <Button
            className={classes.btn}
            onClick={() => {
              dispatch({ type: "CHANGE_GENDER", payload: "male" });
              setShowModal(false);
            }}
          >
            <img className={classes.avatar} src={MaleIcon} />
            <Typography>Male</Typography>
          </Button>
          <Button
            className={classes.btn}
            onClick={() => {
              dispatch({ type: "CHANGE_GENDER", payload: "female" });
              setShowModal(false);
            }}
          >
            <img className={classes.avatar} src={FemaleIcon} />
            <Typography>Female</Typography>
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default connect(null, {})(GenderDialog);
