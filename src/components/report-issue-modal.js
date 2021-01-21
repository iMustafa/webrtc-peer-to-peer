import { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import axios from "axios";

const useStyles = makeStyles(() => ({
  root: {},
  container: {
    marginTop: 40,
    marginBottom: 15,
    padding: 25,
  },
  input: {},
  textarea: {
    margin: "65px 0",
  },
  btnContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {},
}));

const ReportIssueModal = ({ showModal, setShowModal }) => {
  const classes = useStyles();
  const [state, setState] = useState({ email: "", body: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSend = async () => {
    try {
      const { email, body } = state;
      if (email && body) {
        const m = await axios.post("/api/messages", { email, body });
        setShowModal(false);
      }
    } catch (e) {}
  };

  return (
    <Dialog
      open={showModal}
      onClose={() => {
        setShowModal(false);
      }}
    >
      <div className={clsx("dialog-body", classes.root)}>
        <p className="modal-title">Report Issues or Bugs</p>
        <div className={classes.container}>
          <TextField
            placeholder="Your Email"
            type="email"
            fullWidth
            onChange={handleChange}
            name="email"
            value={state.email}
            className={classes.input}
          />
          <TextField
            placeholder="Your Message"
            fullWidth
            multiline
            onChange={handleChange}
            name="body"
            value={state.body}
            className={classes.textarea}
          />
          <div className={classes.btnContainer}>
            <Button className={classes.btn} onClick={handleSend}>
              Send
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ReportIssueModal;
