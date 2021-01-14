import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import MaleIcon from "../images/male-icon.png";
import FemaleIcon from "../images/female-icon.png";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    alignItems: "center",
    marginBottom: 5
  },
  rootRight: {
    justifyContent: "flex-end",
  },
  avatar: {
    width: "40px",
    height: "40px",
    objectFit: "cover",
  },
  message: {
    margin: "0 0 0 15px",
    backgroundColor: "#FFF",
    width: "50%",
    padding: "5px 5px 5px 15px",
    borderRadius: "20px",
    boxShadow: "0 0 1px 1px rgba(0, 0, 0, 0.15)",
  },
  avatarRight: {
    order: 2,
  },
  blueMsg: {
    backgroundColor: "#3F7BFE !important",
    color: "#FFF",
    margin: "0 15px 0 0",
  },
}));

const Message = ({ message, userId }) => {
  const classes = useStyles();

  return (
    <div
      className={
        message.sentBy == userId
          ? classes.root
          : clsx(classes.root, classes.rootRight)
      }
    >
      <img
        src={MaleIcon}
        className={
          message.sentBy == userId
            ? classes.avatar
            : clsx(classes.avatar, classes.avatarRight)
        }
      />
      <p
        className={
          message.sentBy == userId
            ? classes.message
            : clsx(classes.message, classes.blueMsg)
        }
      >
        {message.message}
      </p>
    </div>
  );
};

export default Message;
