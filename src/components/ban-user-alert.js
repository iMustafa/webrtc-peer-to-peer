import { Fragment } from "react";
import { useSelector } from "react-redux";

const UserBannedAlert = () => {
  const { isBanned } = useSelector((state) => state.user);

  return isBanned ? (
    <div className="overlay">
      <h1>You got banned</h1>
    </div>
  ) : (
    <Fragment />
  );
};

export default UserBannedAlert;
