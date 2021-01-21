import { Fragment, useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import ReportIssueModal from "./report-issue-modal";

const useStyles = makeStyles(() => ({
  root: {
    position: "absolute",
    top: 0,
    left: 10,
  },
}));

const ReportIssueButton = () => {
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  return (
    <Fragment>
      <Button onClick={handleClick} className={classes.root}>
        Report Issue
      </Button>
      <ReportIssueModal showModal={showModal} setShowModal={setShowModal} />
    </Fragment>
  );
};

export default ReportIssueButton;
