import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import axios from "axios";

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
    margin: '0 auto'
  },
}));

const BannedUsers = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const getUsers = async () => {
      const u = await axios.get("/api/users");
      setUsers(u.data);
    };
    getUsers();
  }, [refresh]);

  const handleClick = async (user) => {
    try {
      const { _id } = user;
      const update = await axios.post(`/api/users/${_id}`, {});
      setRefresh(refresh + 1);
    } catch (e) {
      alert("ERROR OCCURED, PLEASE TRY AGAIN.");
    }
  };

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User IP</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell component="th" scope="row">
                  {user.ipAddress}
                </TableCell>
                <TableCell align="left">
                  {user.isBanned ? "Banned" : "Live"}
                </TableCell>
                <TableCell align="left">
                  <Button
                    onClick={() => {
                      handleClick(user);
                    }}
                  >
                    Lift Ban
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </main>
  );
};

export default BannedUsers;
