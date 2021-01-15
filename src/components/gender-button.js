import { Fragment, useState } from "react";
import { connect, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MaleIcon from "../images/male-icon.png";
import FemaleIcon from "../images/female-icon.png";
import GenderDialog from "./gender-dialog";

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "#FFF",
    display: 'flex',
    "&:hover": {
      backgroundColor: "#FFF !important",
    },
  },
  text: {},
  avatar: {
    width: 30,
    height: 30,
    objectFit: "cover",
    margin: "0 10px",
  },
}));

const GenderButton = () => {
  const classes = useStyles();
  const gender = useSelector((state) => state.user.gender);
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  return (
    <Fragment>
      <Button className={classes.root} onClick={handleModalOpen}>
        <Typography className={classes.text}>I AM:</Typography>
        <img
          src={gender == "male" ? MaleIcon : FemaleIcon}
          className={classes.avatar}
        />
        <Typography className={classes.text}>{gender.toUpperCase()}</Typography>
      </Button>
      <GenderDialog showModal={showModal} setShowModal={setShowModal} />
    </Fragment>
  );
};

export default connect(null, {})(GenderButton);
