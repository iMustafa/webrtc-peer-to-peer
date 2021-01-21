import { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
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
import AdminLogin from "../components/admin/login";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  root: {
    width: 900,
    margin: "50px auto 0 auto",
    minHeight: "100vh",
  },
});

const AdminPage = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const { isAuthenticated } = useSelector((state) => state.admin);

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

  if (!isAuthenticated)
    return (
      <div className={classes.root}>
        <AdminLogin />
      </div>
    );

  return (
    <div className={classes.root}>
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
    </div>
  );
};

export default connect(null, {})(AdminPage);
