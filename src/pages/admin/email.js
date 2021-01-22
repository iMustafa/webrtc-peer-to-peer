import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    width: 900,
    margin: "0 auto",
  },
}));

const AdminEmails = () => {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const $messages = await axios.get("/api/emails");
        setMessages($messages.data);
      } catch (e) {}
    };
    getMessages();
  }, []);

  const handleDelete = async ({ _id }) => {
    try {
      await axios.delete(`/api/emails/${_id}`);
      setRefresh(refresh + 1);
    } catch (e) {}
  };

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {messages.map((message) => (
              <TableRow key={message.id}>
                <TableCell component="th" scope="row">
                  {message.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {message.email}
                </TableCell>
                <TableCell component="th" scope="row">
                  {message.subject}
                </TableCell>
                <TableCell component="th" scope="row">
                  {message.body}
                </TableCell>
                <TableCell align="left">{message.body}</TableCell>
                <TableCell align="left">
                  {moment(message.createdAt).format("DD MM YYYY")}
                </TableCell>
                <TableCell align="left">
                  <IconButton
                    onClick={() => {
                      handleDelete(message);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </main>
  );
};

export default AdminEmails;
