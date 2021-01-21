import { makeStyles } from "@material-ui/core";
import { useSelector, connect } from "react-redux";
import clsx from "clsx";

const emojies = [
  "🙂",
  "😃",
  "😀",
  "🙃",
  "😛",
  "😎",
  "🧐",
  "😔",
  "👌",
  "👍",
  "👍",
  "❤️",
];

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "#FFF",
    width: 150,
    display: "flex",
    flexWrap: "wrap",
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    position: "absolute",
    bottom: 42,
    right: -5,
    paddingTop: 5,
  },
  btn: {
    padding: 3,
    flex: "1 0 21%",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    display: "inline-block",
    marginBottom: 5,
  },
}));

const EmojiPicker = ({ onEmojiClick }) => {
  const classes = useStyles();
  const { isShowingEmojiPicker } = useSelector((state) => state.user);

  if (!isShowingEmojiPicker) return null;

  return (
    <div className={classes.root}>
      {emojies.map((e, i) => (
        <span
          className={classes.btn}
          key={i}
          onClick={() => {
            onEmojiClick(e);
          }}
        >
          {e}
        </span>
      ))}
    </div>
  );
};

export default connect(null, {})(EmojiPicker);
