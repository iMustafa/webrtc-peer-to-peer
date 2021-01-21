import { Fragment } from "react";
import { connect, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AdminLogin from "../../components/admin/login";
import AdminBar from "../../components/admin/app-bar";
import BannedUsers from "./banned-users";
import AdminMessages from "./contact";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const AdminPage = () => {
  const classes = useStyles();
  const { isAuthenticated, activePage } = useSelector((state) => state.admin);

  if (!isAuthenticated)
    return (
      <div className={classes.root}>
        <AdminLogin />
      </div>
    );

  return (
    <Fragment>
      <AdminBar />
      {activePage === "BANNED_USERS" ? <BannedUsers /> : <AdminMessages />}
    </Fragment>
  );
};

export default connect(null, {})(AdminPage);
